// ===============================================================================
// JaaGee Scientific - Admin New Product (/admin/products/new)
// File: C:\xampp\htdocs\jaagee\app\admin\(protected)\products\new\page.tsx
// ===============================================================================
// Server Component with a Server Action for creation.
// Validates via Zod, writes via admin-repository, enforces admin auth.
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getBrands, getCategories, getIndustries, getProducts } from '@/lib/db/repository'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { adminCreateProduct } from '@/lib/db/admin-repository'
import { ProductFormSchema } from '@/lib/validation/product'
import { ProductFormFields } from '@/components/admin/product-form-fields'

export const metadata: Metadata = {
  title: 'New Product | Admin CMS | JaaGee Scientific',
  robots: 'noindex, nofollow',
}

// ── Server Action ─────────────────────────────────────────────────────────────
async function createProduct(formData: FormData) {
  'use server'

  const supabase = await createSupabaseServerClient()

  // Belt-and-braces auth check (proxy already verified, but we re-confirm)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: isAdmin } = await supabase.rpc('is_admin', { user_id: user.id })
  if (!isAdmin) redirect('/admin/login?error=unauthorized')

  // Parse form data
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

  // Zod validation
  const parsed = ProductFormSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors).flat()[0]
    redirect(`/admin/products/new?error=${encodeURIComponent(firstError ?? 'Validation failed')}`)
  }

  const result = await adminCreateProduct(supabase, parsed.data)

  if (!result.ok) {
    redirect(`/admin/products/new?error=${encodeURIComponent(result.error)}`)
  }

  redirect(`/admin/products/${result.slug}/edit?success=created`)
}

// ── Page ──────────────────────────────────────────────────────────────────────
interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function NewProductPage({ searchParams }: Props) {
  const params = await searchParams
  const errorMsg = params.error ? decodeURIComponent(params.error) : null

  const [brands, categories, industries, allProducts] = await Promise.all([
    getBrands(),
    getCategories(),
    getIndustries(),
    getProducts({ status: 'all', verificationStatus: 'all' }),
  ])

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
            New Product
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            All fields validate server-side before write.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="text-xs text-[#64748B] hover:text-white font-mono"
        >
          ← Products
        </Link>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="mb-5 px-4 py-3 bg-[#7F1D1D]/40 border border-[#EF4444]/40 rounded text-[#FCA5A5] text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form action={createProduct} className="space-y-0">
        <ProductFormFields
          brands={brands}
          categories={categories}
          industries={industries}
          allProducts={allProducts}
          mode="create"
        />
        <div className="flex gap-3 pt-6 border-t border-[#334155] mt-6">
          <button
            type="submit"
            className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-mono font-semibold px-6 py-2.5 rounded transition"
          >
            Create Product
          </button>
          <Link
            href="/admin/products"
            className="bg-[#334155] hover:bg-[#475569] text-white text-sm font-mono px-6 py-2.5 rounded transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}
