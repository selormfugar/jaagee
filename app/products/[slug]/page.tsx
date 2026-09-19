// ===============================================================================
// JaaGee Scientific - Product Detail Page (/products/[slug])
// File: C:\xampp\htdocs\jaagee\app\products\[slug]\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getProductBySlug, getProducts, getBrandBySlug } from '@/lib/db/repository'
import { ProductImageFallback } from '@/components/ui/product-image-fallback'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Product Not Found | JaaGee Scientific' }
  }
  return {
    title: `${product.name} | JaaGee Scientific Catalogue`,
    description: product.short_description
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const brand = await getBrandBySlug(product.brand_slug)
  const replacementProduct = product.replacement_product_slug
    ? await getProductBySlug(product.replacement_product_slug)
    : null

  const relatedProducts = (await getProducts({ brandSlug: product.brand_slug, status: 'published' }))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  const isDiscontinued = product.status === 'discontinued'

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <Header />

      {/* BREADCRUMB */}
      <div className="bg-[#FAF9F6] border-b border-[#E2E8F0] text-xs font-mono py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-[#64748B]">
          <Link href="/" className="hover:text-[#0284C7]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0284C7]">Catalogue</Link>
          <span>/</span>
          <Link href={`/brands/${product.brand_slug}`} className="hover:text-[#0284C7]">{brand?.name || product.brand_slug.toUpperCase()}</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* DISCONTINUED NOTICE BANNER */}
      {isDiscontinued && (
        <section className="bg-[#FEF2F2] border-b border-[#FECACA] py-5 text-[#991B1B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-4">
            <svg className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold text-sm">Discontinued Instrument Notice</h3>
              <p className="text-xs text-[#7F1D1D] mt-1 leading-relaxed">
                The {product.name} has been discontinued by {brand?.name || 'the manufacturer'} and is no longer produced.
                {replacementProduct && (
                  <>
                    {' '}This model has been officially superseded by the{' '}
                    <Link href={`/products/${replacementProduct.slug}`} className="font-bold underline hover:text-[#991B1B]">
                      {replacementProduct.name} ↗
                    </Link>.
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MAIN SPECIFICATION SHEET SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="bg-white rounded-[8px] border border-[#E2E8F0] shadow-xs overflow-hidden p-6 sm:p-10 space-y-10">
          {/* Top Grid: Image + Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Product Photography Canvas */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full h-72 sm:h-96 bg-[#FFFFFF] rounded-[8px] border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-6 group shadow-2xs">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-102 transition-transform duration-300"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <ProductImageFallback
                    name={product.name}
                    category={product.category_slug}
                    brand={brand?.name}
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Information & Dual CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block">
                  {brand?.name || product.brand_slug.toUpperCase()} · {product.category_slug.replace(/-/g, ' ')}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
                  {product.name}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {product.short_description || product.full_description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {!isDiscontinued ? (
                  <Link
                    href={`/contact?requirement=${encodeURIComponent(product.name)}`}
                    className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition shadow-xs inline-flex items-center gap-2"
                  >
                    <span>Enquire Now</span>
                    <span className="text-sm">→</span>
                  </Link>
                ) : replacementProduct ? (
                  <Link
                    href={`/products/${replacementProduct.slug}`}
                    className="bg-[#080F17] hover:bg-[#151C28] text-white px-6 py-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2"
                  >
                    <span>View Replacement Model ({replacementProduct.name})</span>
                    <span className="text-sm">→</span>
                  </Link>
                ) : null}

                <Link
                  href={`/contact?requirement=${encodeURIComponent(`Specification PDF: ${product.name}`)}`}
                  className="text-xs font-semibold text-[#475569] hover:text-[#0284C7] transition inline-flex items-center gap-1.5 py-3"
                >
                  <span>Download Specification (PDF)</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Key Features Checklist */}
              {product.features && product.features.length > 0 && (
                <div className="pt-6 border-t border-[#E2E8F0] space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#475569] font-medium">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#475569]">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#0284C7] font-bold text-sm shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="pt-8 border-t border-[#E2E8F0] space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#475569] font-medium">
              Technical Specifications
            </h3>
            {product.specifications && product.specifications.length > 0 ? (
              <div className="border border-[#E2E8F0] rounded-[6px] overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-[#E2E8F0] bg-white">
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}>
                        <td className="py-3 px-5 font-mono font-medium text-[#475569] w-1/3 sm:w-1/4">
                          {spec.label}
                        </td>
                        <td className="py-3 px-5 text-[#0F172A] font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-[#94A3B8]">Specification parameters available upon enquiry.</p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-[#0F172A] mb-8 font-sans">
              More Instruments from {brand?.name || 'this Manufacturer'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/products/${rel.slug}`}
                  className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:shadow-md hover:border-[#0284C7] transition block group"
                >
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold uppercase">{brand?.name}</span>
                  <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition mt-1">{rel.name}</h4>
                  <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">{rel.short_description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
