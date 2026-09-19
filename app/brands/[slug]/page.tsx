// ===============================================================================
// JaaGee Scientific - Brand Detail Page (/brands/[slug])
// File: C:\xampp\htdocs\jaagee\app\brands\[slug]\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getBrandBySlug, getProducts } from '@/lib/db/repository'
import { ProductImageFallback } from '@/components/ui/product-image-fallback'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)
  if (!brand) return { title: 'Brand Not Found | JaaGee Scientific' }
  return {
    title: `${brand.name} Analytical Instruments | JaaGee Scientific`,
    description: brand.description
  }
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  const products = await getProducts({ brandSlug: brand.slug, status: 'published' })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <Header />

      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-1 rounded-[4px] font-semibold">
              {brand.country}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">Direct Partnership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
            {brand.name}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed">
            {brand.description}
          </p>
          <div className="mt-4">
            <a
              href={brand.website_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1"
            >
              <span>Visit manufacturer official site</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xl font-bold text-[#0F172A] mb-8 font-sans">
          Available {brand.name} Instruments ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-[#E2E8F0] text-center text-sm text-[#64748B]">
            No published instruments currently listed for {brand.name}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <article
                key={product.slug}
                className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-md hover:border-[#0284C7] transition subtle-hover-scale flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full h-52 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <ProductImageFallback
                        name={product.name}
                        brand={brand.name}
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
                      {product.short_description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-mono font-semibold text-[#0F172A] hover:text-[#0284C7]"
                  >
                    View Specs ↗
                  </Link>
                  <Link
                    href={`/contact?requirement=${encodeURIComponent(product.name)}`}
                    className="text-xs font-semibold text-[#0284C7] hover:underline"
                  >
                    Quote →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
