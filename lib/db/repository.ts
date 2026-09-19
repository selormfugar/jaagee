// ===============================================================================
// JaaGee Scientific - Data Access Layer (Repository Pattern)
// File: C:\xampp\htdocs\jaagee\lib\db\repository.ts
// ===============================================================================

import { getSupabaseEnv } from '../supabase/config'
import {
  SEED_BRANDS,
  SEED_CATEGORIES,
  SEED_INDUSTRIES,
  SEED_SERVICES,
  SEED_PRODUCTS,
  BrandSeed,
  CategorySeed,
  IndustrySeed,
  ProductSeed,
  ServiceSeed
} from './data/seed-data'

export type ProductFilterOptions = {
  search?: string
  brandSlug?: string
  categorySlug?: string
  industrySlug?: string
  status?: 'published' | 'draft' | 'archived' | 'discontinued' | 'all'
  verificationStatus?: 'verified' | 'unverified' | 'all'
}

// -------------------------------------------------------------------------------
// BRANDS
// -------------------------------------------------------------------------------
export async function getBrands(): Promise<BrandSeed[]> {
  const env = getSupabaseEnv()

  // In local dev without credentials, use verified seed package
  if (!env.hasCredentials) {
    return SEED_BRANDS
  }

  // Supabase implementation placeholder (ready for live project connection)
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(env.url!, env.anonKey!)
    const { data, error } = await supabase.from('brands').select('*').order('name')
    if (error || !data || data.length === 0) return SEED_BRANDS
    return data as BrandSeed[]
  } catch (err) {
    if (env.isProduction) throw err
    return SEED_BRANDS
  }
}

export async function getBrandBySlug(slug: string): Promise<BrandSeed | null> {
  const brands = await getBrands()
  return brands.find((b) => b.slug === slug) || null
}

// -------------------------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------------------------
export async function getCategories(): Promise<CategorySeed[]> {
  const env = getSupabaseEnv()
  if (!env.hasCredentials) return SEED_CATEGORIES

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(env.url!, env.anonKey!)
    const { data, error } = await supabase.from('categories').select('*').order('name')
    if (error || !data || data.length === 0) return SEED_CATEGORIES
    return data as CategorySeed[]
  } catch (err) {
    if (env.isProduction) throw err
    return SEED_CATEGORIES
  }
}

// -------------------------------------------------------------------------------
// INDUSTRIES
// -------------------------------------------------------------------------------
export async function getIndustries(): Promise<IndustrySeed[]> {
  const env = getSupabaseEnv()
  if (!env.hasCredentials) return SEED_INDUSTRIES

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(env.url!, env.anonKey!)
    const { data, error } = await supabase.from('industries').select('*').order('name')
    if (error || !data || data.length === 0) return SEED_INDUSTRIES
    return data as IndustrySeed[]
  } catch (err) {
    if (env.isProduction) throw err
    return SEED_INDUSTRIES
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustrySeed | null> {
  const list = await getIndustries()
  return list.find((i) => i.slug === slug) || null
}

// -------------------------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------------------------
export async function getServices(): Promise<ServiceSeed[]> {
  const env = getSupabaseEnv()
  if (!env.hasCredentials) return SEED_SERVICES

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(env.url!, env.anonKey!)
    const { data, error } = await supabase.from('services').select('*').order('display_order')
    if (error || !data || data.length === 0) return SEED_SERVICES
    return data as ServiceSeed[]
  } catch (err) {
    if (env.isProduction) throw err
    return SEED_SERVICES
  }
}

// Helper to map Supabase database product record to canonical ProductSeed interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseProduct(row: any): ProductSeed {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand_slug: row.brand?.slug || '',
    category_slug: row.category?.slug || '',
    industry_slugs: Array.isArray(row.product_industries)
      ? row.product_industries
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((pi: any) => pi.industry?.slug)
          .filter(Boolean)
      : [],
    short_description: row.short_description || '',
    full_description: row.full_description || '',
    specifications: Array.isArray(row.specifications) ? row.specifications : [],
    features: Array.isArray(row.features) ? row.features : [],
    applications: Array.isArray(row.applications) ? row.applications : [],
    status: row.status,
    verification_status: row.verification_status,
    is_featured: Boolean(row.is_featured),
    image_url:
      // Prefer the explicitly marked primary image; fall back to first in result set
      (row.product_images as Array<{ image_url: string; is_primary: boolean }> | null)
        ?.find((i) => i.is_primary)?.image_url ||
      (row.product_images as Array<{ image_url: string }> | null)?.[0]?.image_url ||
      undefined,
    replacement_product_slug: row.replacement_product?.slug || undefined
  }
}

// -------------------------------------------------------------------------------
// PRODUCTS (PUBLICATION RULES ENFORCED)
// -------------------------------------------------------------------------------
export async function getProducts(options: ProductFilterOptions = {}): Promise<ProductSeed[]> {
  const env = getSupabaseEnv()

  const {
    search = '',
    brandSlug = '',
    categorySlug = '',
    industrySlug = '',
    status = 'published', // DEFAULT: Only published products shown on public site
    verificationStatus = 'verified' // DEFAULT: Only verified content shown on public site
  } = options

  let list: ProductSeed[] = SEED_PRODUCTS

  // Query live Supabase database when configured
  if (env.hasCredentials) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(env.url!, env.anonKey!)

      let query = supabase.from('products').select(`
        id,
        slug,
        name,
        short_description,
        full_description,
        specifications,
        features,
        applications,
        status,
        verification_status,
        is_featured,
        replacement_product:products!replacement_product_id(slug),
        brand:brands(slug, name),
        category:categories(slug, name),
        product_industries(industry:industries(slug)),
        product_images(image_url, is_primary)
      `)

      if (status !== 'all') {
        query = query.eq('status', status)
      }
      if (verificationStatus !== 'all') {
        query = query.eq('verification_status', verificationStatus)
      }

      const { data, error } = await query

      if (!error && data && data.length > 0) {
        list = data.map(mapSupabaseProduct)
      }
    } catch (err) {
      if (env.isProduction && process.env.SUPABASE_STRICT_MODE === 'true') throw err
      list = SEED_PRODUCTS
    }
  }

  // Filter by status (unless 'all' requested for admin area)
  if (status !== 'all') {
    list = list.filter((p) => p.status === status)
  }

  // Filter by verification status (unless 'all' requested for admin area)
  if (verificationStatus !== 'all') {
    list = list.filter((p) => p.verification_status === verificationStatus)
  }

  // Filter by Brand
  if (brandSlug) {
    list = list.filter((p) => p.brand_slug === brandSlug)
  }

  // Filter by Category
  if (categorySlug) {
    list = list.filter((p) => p.category_slug === categorySlug)
  }

  // Filter by Industry
  if (industrySlug) {
    list = list.filter((p) => p.industry_slugs.includes(industrySlug))
  }

  // Search query (matches title, description, brand, applications)
  if (search.trim()) {
    const q = search.toLowerCase()
    list = list.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q)
      const matchDesc = p.short_description.toLowerCase().includes(q) || p.full_description.toLowerCase().includes(q)
      const matchBrand = p.brand_slug.toLowerCase().includes(q)
      const matchApps = (p.applications || []).some((a) => a.toLowerCase().includes(q))
      return matchName || matchDesc || matchBrand || matchApps
    })
  }

  return list
}

export async function getProductBySlug(slug: string): Promise<ProductSeed | null> {
  const env = getSupabaseEnv()

  if (env.hasCredentials) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(env.url!, env.anonKey!)

      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          slug,
          name,
          short_description,
          full_description,
          specifications,
          features,
          applications,
          status,
          verification_status,
          is_featured,
          replacement_product_id,
          brand:brands(slug, name),
          category:categories(slug, name),
          product_industries(industry:industries(slug)),
          product_images(image_url, is_primary)
        `)
        .eq('slug', slug)
        .maybeSingle()

      if (!error && data) {
        const product = mapSupabaseProduct(data)

        // Resolve replacement product slug if id exists
        if (data.replacement_product_id && !product.replacement_product_slug) {
          const { data: repData } = await supabase
            .from('products')
            .select('slug')
            .eq('id', data.replacement_product_id)
            .maybeSingle()
          if (repData) {
            product.replacement_product_slug = repData.slug
          }
        }

        return product
      }
    } catch (err) {
      if (env.isProduction && process.env.SUPABASE_STRICT_MODE === 'true') throw err
    }
  }

  // Fallback to seed dataset
  const product = SEED_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return null
  return product
}

export async function getFeaturedProducts(): Promise<ProductSeed[]> {
  const list = await getProducts({ status: 'published', verificationStatus: 'verified' })
  return list.filter((p) => p.is_featured)
}
