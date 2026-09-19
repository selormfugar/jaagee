// ===============================================================================
// JaaGee Scientific - Brands Portal (/brands)
// File: C:\xampp\htdocs\jaagee\app\brands\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getBrands, getProducts } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Technology Partners & Brands | JaaGee Scientific',
  description: 'JaaGee acts as sole agent and partner for world-class international manufacturers: ANKOM, OPSIS, CHOPIN, PERTEN, NEOGEN, and DDS Calorimeters.'
}

export default async function BrandsPage() {
  const brands = await getBrands()
  const allProducts = await getProducts({ status: 'published' })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <Header />

      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
            OUR BRANDS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
            World-class manufacturers. One trusted partner.
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed">
            We work with established international manufacturers to bring you reliable, accurate and durable analytical solutions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => {
            const brandProducts = allProducts.filter((p) => p.brand_slug === brand.slug)

            return (
              <article
                key={brand.slug}
                className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm hover:shadow-md hover:border-[#0284C7] transition subtle-hover-scale flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-3 py-1 rounded">
                      {brand.country}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      {brandProducts.length} Verified Model{brandProducts.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold font-sans text-[#0F172A] group-hover:text-[#0284C7] transition">
                    <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
                  </h2>

                  <p className="text-xs text-[#475569] mt-3 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="text-xs font-mono font-semibold text-[#0F172A] group-hover:text-[#0284C7] flex items-center gap-1"
                  >
                    View Equipment Line <span>↗</span>
                  </Link>
                  <a
                    href={brand.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#94A3B8] hover:text-[#475569] transition"
                  >
                    Global Site ↗
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
