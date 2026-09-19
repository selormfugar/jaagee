// ===============================================================================
// JaaGee Scientific - Industries Portal (/industries)
// File: C:\xampp\htdocs\jaagee\app\industries\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getIndustries, getProducts } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Industry Applications | JaaGee Scientific',
  description: 'Targeted analytical instrumentation for Agriculture & Feed, Grain Milling, Food Safety, Dairy, Beverages, Environmental, and Energy testing.'
}

export default async function IndustriesPage() {
  const industries = await getIndustries()
  const allProducts = await getProducts({ status: 'published' })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <Header />

      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
            INDUSTRIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
            Supporting key industries across West Africa.
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed">
            Analytical instrumentation and technical support configured for agricultural feed, grain milling, food processing, dairy, and industrial facilities.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const indProducts = allProducts.filter((p) => p.industry_slugs.includes(ind.slug))

            return (
              <article
                key={ind.slug}
                className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm hover:shadow-md hover:border-[#0284C7] transition subtle-hover-scale flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-1 rounded">
                      SECTOR 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      {indProducts.length} Model{indProducts.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-sans text-[#0F172A] group-hover:text-[#0284C7] transition">
                    <Link href={`/industries/${ind.slug}`}>{ind.name}</Link>
                  </h2>

                  <p className="text-xs text-[#475569] mt-3 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-mono font-semibold text-[#0F172A] group-hover:text-[#0284C7]">
                  <span>Explore Sector Solutions</span>
                  <span>↗</span>
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
