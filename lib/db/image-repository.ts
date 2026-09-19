// ===============================================================================
// JaaGee Scientific - Product Image Repository (Admin Write Operations)
// File: C:\xampp\htdocs\jaagee\lib\db\image-repository.ts
// ===============================================================================
// All functions must only be called from Server Actions or Route Handlers.
// Storage uploads use the service-role admin client (bypasses Storage RLS).
// Database writes use the session-aware client (respects RLS).
//
// Storage structure:
//   Bucket:  product-images
//   Path:    {product-slug}/{uuid}.{ext}
//   Access:  Public read (via Supabase CDN), authenticated upload/delete
// ===============================================================================

import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

// ── Constants ──────────────────────────────────────────────────────────────────

const STORAGE_BUCKET = 'product-images'
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

// ── Types ──────────────────────────────────────────────────────────────────────

export type ProductImageRow = {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  is_primary: boolean
  display_order: number
  created_at: string
}

export type ImageActionResult =
  | { ok: true }
  | { ok: false; error: string }

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Derive the Supabase Storage object path from a public CDN URL.
 * Returns null for local/seed image URLs (no storage object exists for them).
 *
 * Supabase public URL format:
 *   {SUPABASE_URL}/storage/v1/object/public/{bucket}/{path}
 */
function getStoragePath(imageUrl: string): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null
  const prefix = `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/`
  if (imageUrl.startsWith(prefix)) {
    return imageUrl.slice(prefix.length)
  }
  return null // local/seed image — skip storage deletion
}

// ── READ ──────────────────────────────────────────────────────────────────────

/**
 * Fetch all product_images rows for a product, ordered by display_order ascending.
 * Uses the session client — the "Public product_images read access" policy
 * allows this for any caller; admin policy allows writes.
 */
export async function adminGetProductImages(
  supabase: SupabaseClient,
  productId: string
): Promise<ProductImageRow[]> {
  const { data, error } = await supabase
    .from('product_images')
    .select('id, product_id, image_url, alt_text, is_primary, display_order, created_at')
    .eq('product_id', productId)
    .order('display_order', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

// ── UPLOAD ────────────────────────────────────────────────────────────────────

/**
 * Validate, upload a product image to Supabase Storage, and insert a
 * product_images row.
 *
 * - Validation is enforced server-side (MIME type + file size).
 * - Storage upload uses the service-role admin client (bypasses bucket RLS).
 * - DB insert uses the authenticated session client (RLS allows admin writes).
 * - The first image uploaded for a product is automatically set as primary.
 * - If the DB insert fails after a successful storage upload, the storage
 *   object is removed (best-effort cleanup).
 */
export async function adminUploadProductImage(
  supabase: SupabaseClient,
  productId: string,
  productSlug: string,
  file: File,
  altText: string
): Promise<ImageActionResult> {
  // ── Server-side validation ────────────────────────────────────────────────

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      ok: false,
      error: `Unsupported file type: "${file.type}". Allowed formats: JPEG, PNG, WebP, GIF.`,
    }
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1)
    return {
      ok: false,
      error: `File too large: ${sizeMB} MB. Maximum allowed size is 5 MB.`,
    }
  }
  if (file.size === 0) {
    return { ok: false, error: 'File is empty.' }
  }

  // ── Derive extension and build storage path ───────────────────────────────

  const rawExt = file.name.split('.').pop()?.toLowerCase()
  const ext = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(rawExt ?? '')
    ? rawExt
    : 'jpg'
  const storagePath = `${productSlug}/${crypto.randomUUID()}.${ext}`

  // ── Upload to Supabase Storage (service-role) ─────────────────────────────

  const adminClient = createSupabaseAdminClient()
  const buffer = await file.arrayBuffer()

  const { error: storageError } = await adminClient.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (storageError) {
    return {
      ok: false,
      error: `Storage upload failed: ${storageError.message}`,
    }
  }

  // ── Get public CDN URL ────────────────────────────────────────────────────

  const {
    data: { publicUrl },
  } = adminClient.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath)

  // ── Determine display_order; auto-promote as primary if first image ────────

  const { data: existing } = await supabase
    .from('product_images')
    .select('display_order')
    .eq('product_id', productId)
    .order('display_order', { ascending: false })
    .limit(1)

  const nextOrder = (existing?.[0]?.display_order ?? -1) + 1
  const isFirst = nextOrder === 0 // auto-primary if no other images exist

  // ── Insert product_images row (session client, RLS enforced) ──────────────

  const { error: dbError } = await supabase.from('product_images').insert({
    product_id: productId,
    image_url: publicUrl,
    alt_text: altText.trim() || null,
    is_primary: isFirst,
    display_order: nextOrder,
  })

  if (dbError) {
    // Best-effort cleanup: remove storage object if DB insert fails
    await adminClient.storage.from(STORAGE_BUCKET).remove([storagePath])
    return {
      ok: false,
      error: `Database insert failed: ${dbError.message}`,
    }
  }

  return { ok: true }
}

// ── DELETE ────────────────────────────────────────────────────────────────────

/**
 * Delete a product image:
 *  1. Fetches the row to determine storage path and primary status.
 *  2. Removes the storage object (if it is a managed Supabase Storage image).
 *  3. Deletes the product_images row.
 *  4. If the deleted image was primary, auto-promotes the next remaining image.
 *
 * Storage deletion errors are non-fatal (the DB row is still removed).
 */
export async function adminDeleteProductImage(
  supabase: SupabaseClient,
  imageId: string
): Promise<ImageActionResult> {
  // Fetch image metadata before deletion
  const { data: image, error: fetchError } = await supabase
    .from('product_images')
    .select('id, product_id, image_url, is_primary, display_order')
    .eq('id', imageId)
    .maybeSingle()

  if (fetchError || !image) {
    return { ok: false, error: 'Image record not found.' }
  }

  // Remove from Supabase Storage if this is a managed image
  const storagePath = getStoragePath(image.image_url)
  if (storagePath) {
    const adminClient = createSupabaseAdminClient()
    // Non-fatal: if storage removal fails, we still delete the DB row
    await adminClient.storage.from(STORAGE_BUCKET).remove([storagePath])
  }

  // Delete the product_images row
  const { error: deleteError } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId)

  if (deleteError) {
    return { ok: false, error: deleteError.message }
  }

  // If the deleted image was primary, auto-promote the next remaining image
  if (image.is_primary) {
    const { data: next } = await supabase
      .from('product_images')
      .select('id')
      .eq('product_id', image.product_id)
      .order('display_order', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (next) {
      await supabase
        .from('product_images')
        .update({ is_primary: true })
        .eq('id', next.id)
    }
  }

  return { ok: true }
}

// ── SET PRIMARY ───────────────────────────────────────────────────────────────

/**
 * Set a specific image as primary. Clears is_primary on all other images for
 * the same product before setting the target.
 */
export async function adminSetPrimaryImage(
  supabase: SupabaseClient,
  imageId: string,
  productId: string
): Promise<ImageActionResult> {
  // Clear is_primary on all images for this product
  const { error: clearError } = await supabase
    .from('product_images')
    .update({ is_primary: false })
    .eq('product_id', productId)

  if (clearError) return { ok: false, error: clearError.message }

  // Set primary on target
  const { error: setError } = await supabase
    .from('product_images')
    .update({ is_primary: true })
    .eq('id', imageId)

  if (setError) return { ok: false, error: setError.message }

  return { ok: true }
}

// ── REORDER ───────────────────────────────────────────────────────────────────

/**
 * Move an image up or down in display_order by swapping with its adjacent
 * neighbour. Silently succeeds if the image is already at the boundary.
 */
export async function adminMoveImage(
  supabase: SupabaseClient,
  imageId: string,
  productId: string,
  direction: 'up' | 'down'
): Promise<ImageActionResult> {
  const { data: images, error } = await supabase
    .from('product_images')
    .select('id, display_order')
    .eq('product_id', productId)
    .order('display_order', { ascending: true })

  if (error || !images) return { ok: false, error: 'Could not fetch images.' }

  const idx = images.findIndex((img) => img.id === imageId)
  if (idx === -1) return { ok: false, error: 'Image not found in product.' }

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1

  // Already at boundary — treat as success (no-op)
  if (swapIdx < 0 || swapIdx >= images.length) return { ok: true }

  const current = images[idx]
  const sibling = images[swapIdx]

  // Swap display_order values between the two rows
  const [r1, r2] = await Promise.all([
    supabase
      .from('product_images')
      .update({ display_order: sibling.display_order })
      .eq('id', current.id),
    supabase
      .from('product_images')
      .update({ display_order: current.display_order })
      .eq('id', sibling.id),
  ])

  if (r1.error || r2.error) {
    return { ok: false, error: 'Failed to reorder images.' }
  }

  return { ok: true }
}
