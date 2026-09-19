// ===============================================================================
// JaaGee Scientific - Catalogue Page (/products)
// File: C:\xampp\htdocs\jaagee\app\products\page.tsx
// ===============================================================================

import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getProducts, getBrands, getCategories, getIndustries } from '@/lib/db/repository'
import { ProductsList } from '@/components/ui/products-list'

export const metadata: Metadata = {
  title: 'Analytical Equipment Catalogue | JaaGee Scientific',
  description: 'Browse verified instruments for Kjeldahl protein, NIR spectroscopy, fat extraction, fiber analysis, rheology, and bomb calorimetry.'
}

interface PageProps {
  searchParams: Promise<{
    q?: string
    brand?: string
    category?: string
    industry?: string
  }>
}

export default async function ProductsCataloguePage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q || ''
  const selectedBrand = params.brand || ''
  const selectedCategory = params.category || ''
  const selectedIndustry = params.industry || ''

  const [products, brands, categories, industries] = await Promise.all([
    getProducts({
      search: query,
      brandSlug: selectedBrand,
      categorySlug: selectedCategory,
      industrySlug: selectedIndustry,
      status: 'published',
      verificationStatus: 'verified'
    }),
    getBrands(),
    getCategories(),
    getIndustries()
  ])

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B0F17]">
      <Header />

      {/* CATALOGUE HEADER BANNER (Light Canvas #FAF9F6) */}
      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                PRECISION INSTRUMENTATION
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                Product Catalogue
              </h1>
              <p className="text-sm text-[#475569] mt-2 max-w-xl leading-relaxed">
                Find the right instrument for your application. Grounded in authentic manufacturer specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROW-BASED LIST WITH SIDEBAR — client component */}
      <ProductsList
        products={products}
        brands={brands}
        categories={categories}
        industries={industries}
        selectedBrand={selectedBrand}
        selectedCategory={selectedCategory}
        selectedIndustry={selectedIndustry}
        query={query}
      />

      <Footer />
    </div>
  )
}
