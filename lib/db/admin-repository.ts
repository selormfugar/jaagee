// ===============================================================================
// JaaGee Scientific - Admin Data Repository (Write Operations)
// File: C:\xampp\htdocs\jaagee\lib\db\admin-repository.ts
// ===============================================================================
// All write operations require an authenticated Supabase client created via
// createSupabaseServerClient() (SSR / cookie-based).  These functions must only
// be called from Server Actions or Route Handlers — never from client components.
//
// Authorization is enforced at the proxy layer (proxy.ts) and as a belt-and-
// braces check inside each action.  RLS on the Supabase side further enforces
// that only admin-role users can write.
// ===============================================================================

import type { SupabaseClient } from '@supabase/supabase-js'
import {
  parseSpecificationsRaw,
  parseListRaw,
  parseIndustrySlugsRaw,
  type ProductFormInput,
} from '@/lib/validation/product'

// ── Types returned to the UI ──────────────────────────────────────────────────

export type AdminActionResult =
  | { ok: true; slug: string }
  | { ok: false; error: string }

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Resolve brand UUID from slug */
async function resolveBrandId(
  supabase: SupabaseClient,
  brandSlug: string
): Promise<string | null> {
  const { data } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', brandSlug)
    .maybeSingle()
  return data?.id ?? null
}

/** Resolve category UUID from slug */
async function resolveCategoryId(
  supabase: SupabaseClient,
  categorySlug: string
): Promise<string | null> {
  const { data } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .maybeSingle()
  return data?.id ?? null
}

/** Resolve product UUID from slug (for replacement_product_id) */
async function resolveProductId(
  supabase: SupabaseClient,
  productSlug: string
): Promise<string | null> {
  if (!productSlug) return null
  const { data } = await supabase
    .from('products')
    .select('id')
    .eq('slug', productSlug)
    .maybeSingle()
  return data?.id ?? null
}

/** Resolve industry UUIDs from slugs */
async function resolveIndustryIds(
  supabase: SupabaseClient,
  slugs: string[]
): Promise<string[]> {
  if (!slugs.length) return []
  const { data } = await supabase
    .from('industries')
    .select('id, slug')
    .in('slug', slugs)
  return (data ?? []).map((r) => r.id)
}

/** Upsert product_industries junction rows */
async function syncProductIndustries(
  supabase: SupabaseClient,
  productId: string,
  industryIds: string[]
): Promise<void> {
  // Delete existing
  await supabase
    .from('product_industries')
    .delete()
    .eq('product_id', productId)

  if (!industryIds.length) return

  // Insert new
  await supabase.from('product_industries').insert(
    industryIds.map((industry_id) => ({ product_id: productId, industry_id }))
  )
}

// ── Build product DB row from validated form data ─────────────────────────────

async function buildProductRow(
  supabase: SupabaseClient,
  data: ProductFormInput
) {
  const [brandId, categoryId, replacementId] = await Promise.all([
    resolveBrandId(supabase, data.brand_slug),
    resolveCategoryId(supabase, data.category_slug),
    data.replacement_product_slug
      ? resolveProductId(supabase, data.replacement_product_slug)
      : Promise.resolve(null),
  ])

  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    sku: data.sku?.trim() || null,
    brand_id: brandId,
    category_id: categoryId,
    short_description: data.short_description?.trim() || null,
    full_description: data.full_description?.trim() || null,
    specifications: parseSpecificationsRaw(data.specifications_raw),
    features: parseListRaw(data.features_raw),
    applications: parseListRaw(data.applications_raw),
    status: data.status,
    verification_status: data.verification_status,
    is_featured: data.is_featured === 'on',
    replacement_product_id: replacementId,
    updated_at: new Date().toISOString(),
  }
}

// ── CREATE ────────────────────────────────────────────────────────────────────

export async function adminCreateProduct(
  supabase: SupabaseClient,
  data: ProductFormInput
): Promise<AdminActionResult> {
  try {
    const row = await buildProductRow(supabase, data)

    const { data: inserted, error } = await supabase
      .from('products')
      .insert({ ...row, created_at: new Date().toISOString() })
      .select('id, slug')
      .single()

    if (error) {
      if (error.code === '23505') {
        return { ok: false, error: `A product with slug "${data.slug}" already exists.` }
      }
      return { ok: false, error: error.message }
    }

    const industryIds = await resolveIndustryIds(
      supabase,
      parseIndustrySlugsRaw(data.industry_slugs_raw)
    )
    await syncProductIndustries(supabase, inserted.id, industryIds)

    return { ok: true, slug: inserted.slug }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

// ── UPDATE ────────────────────────────────────────────────────────────────────

export async function adminUpdateProduct(
  supabase: SupabaseClient,
  originalSlug: string,
  data: ProductFormInput
): Promise<AdminActionResult> {
  try {
    // Resolve the product UUID first
    const { data: existing, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .eq('slug', originalSlug)
      .maybeSingle()

    if (fetchError || !existing) {
      return { ok: false, error: `Product "${originalSlug}" not found.` }
    }

    const productId = existing.id
    const row = await buildProductRow(supabase, data)

    const { error } = await supabase
      .from('products')
      .update(row)
      .eq('id', productId)

    if (error) {
      if (error.code === '23505') {
        return { ok: false, error: `Slug "${data.slug}" is already used by another product.` }
      }
      return { ok: false, error: error.message }
    }

    const industryIds = await resolveIndustryIds(
      supabase,
      parseIndustrySlugsRaw(data.industry_slugs_raw)
    )
    await syncProductIndustries(supabase, productId, industryIds)

    return { ok: true, slug: data.slug }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

// ── STATUS CHANGE (quick archive/discontinue/publish) ─────────────────────────

export async function adminSetProductStatus(
  supabase: SupabaseClient,
  productSlug: string,
  status: 'draft' | 'published' | 'archived' | 'discontinued'
): Promise<AdminActionResult> {
  try {
    const { data: updated, error } = await supabase
      .from('products')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('slug', productSlug)
      .select('slug')
      .single()

    if (error) return { ok: false, error: error.message }
    return { ok: true, slug: updated.slug }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}
