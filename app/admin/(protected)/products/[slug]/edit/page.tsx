// ===============================================================================
// JaaGee Scientific - Admin Edit Product (/admin/products/[slug]/edit)
// File: C:\xampp\htdocs\jaagee\app\admin\(protected)\products\[slug]\edit\page.tsx
// ===============================================================================
// Server Component with Server Actions:
//   1. updateProduct      — full form save
//   2. quickStatusChange  — one-click status change
//   3. uploadImage        — upload image to Supabase Storage + insert DB row
//   4. deleteImage        — delete image from Storage + DB
//   5. setPrimaryImage    — promote image to primary
//   6. moveImageUp        — decrease display_order (swap with prev)
//   7. moveImageDown      — increase display_order (swap with next)
// Auth enforced server-side on every action. No client components.
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getProductBySlug,
  getBrands,
  getCategories,
  getIndustries,
  getProducts,
} from '@/lib/db/repository'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { adminUpdateProduct, adminSetProductStatus } from '@/lib/db/admin-repository'
import {
  adminGetProductImages,
  adminUploadProductImage,
  adminDeleteProductImage,
  adminSetPrimaryImage,
  adminMoveImage,
  type ProductImageRow,
} from '@/lib/db/image-repository'
import { ProductFormSchema } from '@/lib/validation/product'
import { specificationsToRaw, listToRaw } from '@/lib/validation/product'
import { ProductFormFields } from '@/components/admin/product-form-fields'

// ── Metadata (dynamic) ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Edit ${slug} | Admin CMS | JaaGee Scientific`,
    robots: 'noindex, nofollow',
  }
}

// ── Auth helper (shared by all image actions) ─────────────────────────────────

async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: isAdmin } = await supabase.rpc('is_admin', { user_id: user.id })
  if (!isAdmin) redirect('/admin/login?error=unauthorized')
  return supabase
}

// ── Server Action: full product update ────────────────────────────────────────

async function updateProduct(originalSlug: string, formData: FormData) {
  'use server'

  const supabase = await requireAdmin()

  const raw = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    sku: formData.get('sku'),
    brand_slug: formData.get('brand_slug'),
    category_slug: formData.get('category_slug'),
    industry_slugs_raw: formData.getAll('industry_slugs').join(','),
    short_description: formData.get('short_description'),
    full_description: formData.get('full_description'),
    specifications_raw: formData.get('specifications_raw'),
    features_raw: formData.get('features_raw'),
    applications_raw: formData.get('applications_raw'),
    status: formData.get('status'),
    verification_status: formData.get('verification_status'),
    is_featured: formData.get('is_featured'),
    replacement_product_slug: formData.get('replacement_product_slug'),
  }

  const parsed = ProductFormSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors).flat()[0]
    redirect(
      `/admin/products/${originalSlug}/edit?error=${encodeURIComponent(
        firstError ?? 'Validation failed'
      )}`
    )
  }

  const result = await adminUpdateProduct(supabase, originalSlug, parsed.data)

  if (!result.ok) {
    redirect(
      `/admin/products/${originalSlug}/edit?error=${encodeURIComponent(result.error)}`
    )
  }

  redirect(`/admin/products/${result.slug}/edit?success=saved`)
}

// ── Server Action: quick status change ────────────────────────────────────────

async function quickStatusChange(formData: FormData) {
  'use server'

  const supabase = await requireAdmin()

  const slug = formData.get('slug') as string
  const newStatus = formData.get('new_status') as
    | 'draft'
    | 'published'
    | 'archived'
    | 'discontinued'

  if (!slug || !newStatus) redirect('/admin/products')

  await adminSetProductStatus(supabase, slug, newStatus)
  redirect(`/admin/products/${slug}/edit?success=status_changed`)
}

// ── Server Action: upload image ───────────────────────────────────────────────

async function uploadImage(
  productId: string,
  productSlug: string,
  formData: FormData
) {
  'use server'

  const supabase = await requireAdmin()

  const file = formData.get('image_file') as File | null
  if (!file || file.size === 0) {
    redirect(
      `/admin/products/${productSlug}/edit?error=${encodeURIComponent(
        'No file selected.'
      )}`
    )
  }

  const altText = (formData.get('alt_text') as string | null) ?? ''

  const result = await adminUploadProductImage(
    supabase,
    productId,
    productSlug,
    file,
    altText
  )

  if (!result.ok) {
    redirect(
      `/admin/products/${productSlug}/edit?error=${encodeURIComponent(
        result.error
      )}`
    )
  }

  redirect(`/admin/products/${productSlug}/edit?success=image_uploaded`)
}

// ── Server Action: delete image ───────────────────────────────────────────────

async function deleteImage(productSlug: string, formData: FormData) {
  'use server'

  const supabase = await requireAdmin()

  const imageId = formData.get('image_id') as string | null
  if (!imageId) redirect(`/admin/products/${productSlug}/edit`)

  const result = await adminDeleteProductImage(supabase, imageId)

  if (!result.ok) {
    redirect(
      `/admin/products/${productSlug}/edit?error=${encodeURIComponent(
        result.error
      )}`
    )
  }

  redirect(`/admin/products/${productSlug}/edit?success=image_deleted`)
}

// ── Server Action: set primary image ──────────────────────────────────────────

async function setPrimaryImage(
  productSlug: string,
  productId: string,
  formData: FormData
) {
  'use server'

  const supabase = await requireAdmin()

  const imageId = formData.get('image_id') as string | null
  if (!imageId) redirect(`/admin/products/${productSlug}/edit`)

  const result = await adminSetPrimaryImage(supabase, imageId, productId)

  if (!result.ok) {
    redirect(
      `/admin/products/${productSlug}/edit?error=${encodeURIComponent(
        result.error
      )}`
    )
  }

  redirect(`/admin/products/${productSlug}/edit?success=primary_set`)
}

// ── Server Action: move image up ──────────────────────────────────────────────

async function moveImageUp(
  productSlug: string,
  productId: string,
  formData: FormData
) {
  'use server'

  const supabase = await requireAdmin()

  const imageId = formData.get('image_id') as string | null
  if (!imageId) redirect(`/admin/products/${productSlug}/edit`)

  await adminMoveImage(supabase, imageId, productId, 'up')
  redirect(`/admin/products/${productSlug}/edit?success=image_moved`)
}

// ── Server Action: move image down ────────────────────────────────────────────

async function moveImageDown(
  productSlug: string,
  productId: string,
  formData: FormData
) {
  'use server'

  const supabase = await requireAdmin()

  const imageId = formData.get('image_id') as string | null
  if (!imageId) redirect(`/admin/products/${productSlug}/edit`)

  await adminMoveImage(supabase, imageId, productId, 'down')
  redirect(`/admin/products/${productSlug}/edit?success=image_moved`)
}

// ── Styling tokens (shared with product-form-fields) ──────────────────────────

const inputCls =
  'w-full bg-[#0F172A] border border-[#334155] rounded px-3 py-2 text-sm text-white ' +
  'placeholder-[#475569] focus:outline-none focus:border-[#0EA5E9] focus:ring-1 ' +
  'focus:ring-[#0EA5E9]/20 transition font-mono'

const labelCls = 'block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase'

// ── UUID guard: only show image panel when product ID is a real Supabase UUID ─

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// ── Image Manager Panel ───────────────────────────────────────────────────────

function ImageManager({
  images,
  isConnected,
  productName,
  uploadAction,
  deleteAction,
  setPrimaryAction,
  moveUpAction,
  moveDownAction,
}: {
  images: ProductImageRow[]
  isConnected: boolean
  productName: string
  uploadAction: (formData: FormData) => Promise<void>
  deleteAction: (formData: FormData) => Promise<void>
  setPrimaryAction: (formData: FormData) => Promise<void>
  moveUpAction: (formData: FormData) => Promise<void>
  moveDownAction: (formData: FormData) => Promise<void>
}) {
  const btnBase =
    'px-2 py-1 rounded text-[10px] font-mono font-bold uppercase border transition'

  return (
    <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
      <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest">
        Product Images
      </h2>

      {/* ── Not connected to Supabase ─────────────────────────────────────── */}
      {!isConnected && (
        <p className="text-xs text-[#475569] font-mono">
          Image management requires an active Supabase connection. Save the
          product via Supabase to enable uploads.
        </p>
      )}

      {/* ── Image grid ────────────────────────────────────────────────────── */}
      {isConnected && (
        <>
          {images.length === 0 ? (
            <p className="text-xs text-[#475569] font-mono">
              No images uploaded. Use the form below to add the first image.
            </p>
          ) : (
            <div className="space-y-2">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="flex items-center gap-3 bg-[#0F172A] rounded-lg p-3 border border-[#1E293B]"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded border border-[#334155] overflow-hidden bg-[#1E293B] shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt={img.alt_text ?? ''}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {img.is_primary && (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#0C4A6E] text-[#38BDF8] rounded">
                          Primary
                        </span>
                      )}
                      <span className="text-[10px] text-[#475569] font-mono">
                        #{img.display_order + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] font-mono truncate">
                      {img.alt_text || '(no alt text)'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    {/* Set as Primary */}
                    {!img.is_primary && (
                      <form action={setPrimaryAction}>
                        <input type="hidden" name="image_id" value={img.id} />
                        <button
                          type="submit"
                          title="Set as primary image"
                          className={`${btnBase} border-[#334155] text-[#94A3B8] hover:border-[#0EA5E9] hover:text-[#38BDF8]`}
                        >
                          ★ Primary
                        </button>
                      </form>
                    )}

                    {/* Move Up */}
                    {idx > 0 && (
                      <form action={moveUpAction}>
                        <input type="hidden" name="image_id" value={img.id} />
                        <button
                          type="submit"
                          title="Move up"
                          className={`${btnBase} border-[#334155] text-[#64748B] hover:border-[#334155] hover:text-white`}
                        >
                          ↑
                        </button>
                      </form>
                    )}

                    {/* Move Down */}
                    {idx < images.length - 1 && (
                      <form action={moveDownAction}>
                        <input type="hidden" name="image_id" value={img.id} />
                        <button
                          type="submit"
                          title="Move down"
                          className={`${btnBase} border-[#334155] text-[#64748B] hover:border-[#334155] hover:text-white`}
                        >
                          ↓
                        </button>
                      </form>
                    )}

                    {/* Delete */}
                    <form action={deleteAction}>
                      <input type="hidden" name="image_id" value={img.id} />
                      <button
                        type="submit"
                        title="Delete this image"
                        className={`${btnBase} border-[#7F1D1D]/60 text-[#F87171] hover:border-[#EF4444] hover:bg-[#7F1D1D]/20`}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Upload form ──────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-[#334155]">
            <h3 className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-3">
              Upload New Image
            </h3>
            <form
              action={uploadAction}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Image File *</label>
                  <input
                    name="image_file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    required
                    className={`${inputCls} file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-mono file:font-bold file:uppercase file:bg-[#334155] file:text-[#94A3B8] hover:file:bg-[#475569]`}
                  />
                  <p className="mt-1 text-[11px] text-[#475569] font-mono">
                    JPEG, PNG, WebP, or GIF. Max 5 MB.
                  </p>
                </div>

                <div>
                  <label className={labelCls}>Alt Text</label>
                  <input
                    name="alt_text"
                    type="text"
                    defaultValue={productName}
                    placeholder={productName}
                    className={inputCls}
                  />
                  <p className="mt-1 text-[11px] text-[#475569] font-mono">
                    Describe the image for accessibility and SEO.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold px-5 py-2 rounded transition"
              >
                Upload Image
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ error?: string; success?: string }>
}

export default async function EditProductPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams

  // ── Feedback banners ──────────────────────────────────────────────────────
  const errorMsg = sp.error ? decodeURIComponent(sp.error) : null
  const successMsg = sp.success
    ? sp.success === 'created'
      ? 'Product created successfully.'
      : sp.success === 'status_changed'
      ? 'Status updated.'
      : sp.success === 'image_uploaded'
      ? 'Image uploaded successfully.'
      : sp.success === 'image_deleted'
      ? 'Image deleted.'
      : sp.success === 'primary_set'
      ? 'Primary image updated.'
      : sp.success === 'image_moved'
      ? 'Image order updated.'
      : 'Changes saved.'
    : null

  // ── Fetch data ────────────────────────────────────────────────────────────
  const [product, brands, categories, industries, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getBrands(),
    getCategories(),
    getIndustries(),
    getProducts({ status: 'all', verificationStatus: 'all' }),
  ])

  if (!product) notFound()

  // Fetch images using the session client (product_images is publicly readable;
  // admin write RLS is also satisfied since the session client carries auth cookies).
  const isConnected = UUID_RE.test(product.id ?? '')
  let images: ProductImageRow[] = []
  if (isConnected) {
    const supabase = await createSupabaseServerClient()
    try {
      images = await adminGetProductImages(supabase, product.id)
    } catch {
      // Non-fatal — the page renders without images if the query fails
    }
  }

  // ── Bind server actions ───────────────────────────────────────────────────
  const updateAction = updateProduct.bind(null, slug)
  const uploadAction = uploadImage.bind(null, product.id, product.slug)
  const deleteAction = deleteImage.bind(null, slug)
  const setPrimaryAction = setPrimaryImage.bind(null, slug, product.id)
  const moveUpAction = moveImageUp.bind(null, slug, product.id)
  const moveDownAction = moveImageDown.bind(null, slug, product.id)

  // ── Form defaults ─────────────────────────────────────────────────────────
  const defaults = {
    name: product.name,
    slug: product.slug,
    sku: '',
    brand_slug: product.brand_slug,
    category_slug: product.category_slug,
    industry_slugs: product.industry_slugs,
    short_description: product.short_description,
    full_description: product.full_description,
    specifications_raw: specificationsToRaw(product.specifications),
    features_raw: listToRaw(product.features),
    applications_raw: listToRaw(product.applications),
    status: product.status,
    verification_status: product.verification_status,
    is_featured: product.is_featured,
    replacement_product_slug: product.replacement_product_slug ?? '',
  }

  const STATUS_OPTIONS = ['draft', 'published', 'archived', 'discontinued'] as const
  const otherStatuses = STATUS_OPTIONS.filter((s) => s !== product.status)

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
            Edit Product
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5 font-mono">{product.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          {product.status === 'published' && (
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="text-xs text-[#38BDF8] hover:underline font-mono"
            >
              View Live ↗
            </Link>
          )}
          <Link
            href="/admin/products"
            className="text-xs text-[#64748B] hover:text-white font-mono"
          >
            ← Products
          </Link>
        </div>
      </div>

      {/* ── FEEDBACK BANNERS ─────────────────────────────────────────────── */}
      {successMsg && (
        <div className="mb-5 px-4 py-3 bg-[#14532D]/50 border border-[#4ADE80]/40 rounded text-[#86EFAC] text-xs font-mono">
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-5 px-4 py-3 bg-[#7F1D1D]/40 border border-[#EF4444]/40 rounded text-[#FCA5A5] text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* ── QUICK STATUS BAR ─────────────────────────────────────────────── */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-4 mb-6 flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-[#94A3B8] uppercase">
          Current status:
        </span>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
            product.status === 'published'
              ? 'bg-[#166534] text-[#86EFAC]'
              : product.status === 'discontinued'
              ? 'bg-[#991B1B] text-[#FCA5A5]'
              : product.status === 'archived'
              ? 'bg-[#1E3A5F] text-[#93C5FD]'
              : 'bg-[#854D0E] text-[#FEF08A]'
          }`}
        >
          {product.status}
        </span>
        <span className="text-[#475569] text-xs">→ change to:</span>
        {otherStatuses.map((s) => (
          <form key={s} action={quickStatusChange}>
            <input type="hidden" name="slug" value={product.slug} />
            <input type="hidden" name="new_status" value={s} />
            <button
              type="submit"
              className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase border border-[#334155] text-[#94A3B8] hover:border-[#0EA5E9] hover:text-[#38BDF8] transition"
            >
              {s}
            </button>
          </form>
        ))}
      </div>

      {/* ── EDIT FORM ────────────────────────────────────────────────────── */}
      <form action={updateAction} className="space-y-0">
        <ProductFormFields
          brands={brands}
          categories={categories}
          industries={industries}
          allProducts={allProducts}
          defaults={defaults}
          mode="edit"
          currentSlug={slug}
        />
        <div className="flex gap-3 pt-6 border-t border-[#334155] mt-6">
          <button
            type="submit"
            className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-mono font-semibold px-6 py-2.5 rounded transition"
          >
            Save Changes
          </button>
          <Link
            href="/admin/products"
            className="bg-[#334155] hover:bg-[#475569] text-white text-sm font-mono px-6 py-2.5 rounded transition"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* ── IMAGE MANAGER ────────────────────────────────────────────────── */}
      <div className="mt-8">
        <ImageManager
          images={images}
          isConnected={isConnected}
          productName={product.name}
          uploadAction={uploadAction}
          deleteAction={deleteAction}
          setPrimaryAction={setPrimaryAction}
          moveUpAction={moveUpAction}
          moveDownAction={moveDownAction}
        />
      </div>
    </main>
  )
}
