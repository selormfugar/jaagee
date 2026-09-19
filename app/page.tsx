// ===============================================================================
// JaaGee Scientific - Homepage
// Brand Language: QUIET. ELEGANT. COMFORTABLE. PROFESSIONAL. TRUSTWORTHY.
// File: C:\xampp\htdocs\jaagee\app\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getFeaturedProducts, getBrands, getIndustries, getServices } from '@/lib/db/repository'
import { ProductImageFallback } from '@/components/ui/product-image-fallback'

export const metadata: Metadata = {
  title: 'JaaGee Scientific | Analytical Instruments for Laboratories',
  description: 'JaaGee Scientific supplies, commissions and supports analytical equipment for laboratories across West Africa since 1987.'
}

// 4 Featured brands with factual, calm summaries
const FEATURED_BRAND_SLUGS = ['opsis', 'ankom', 'perten', 'neogen']

const BRAND_SUMMARIES: Record<string, { summary: string; focus: string }> = {
  opsis: {
    summary: 'Automated wet chemistry, Kjeldahl nitrogen, protein and solvent extraction systems.',
    focus: 'Sweden · Wet Chemistry'
  },
  ankom: {
    summary: 'Patented Filter Bag technology for dietary fiber, crude fat and in-vitro digestion.',
    focus: 'USA · Fiber & Fat'
  },
  perten: {
    summary: 'Diode-array NIR spectroscopy and rheological testing for grain and flour milling.',
    focus: 'Sweden · NIR & Rheology'
  },
  neogen: {
    summary: 'Rapid lateral-flow diagnostic test kits and readers for mycotoxins and food safety.',
    focus: 'USA · Food Safety'
  }
}

export default async function HomePage() {
  const [featuredProducts, brands, industries, services] = await Promise.all([
    getFeaturedProducts(),
    getBrands(),
    getIndustries(),
    getServices()
  ])

  const featuredBrands = brands.filter((b) => FEATURED_BRAND_SLUGS.includes(b.slug))
  const partnerStripBrands = brands.filter((b) => !FEATURED_BRAND_SLUGS.includes(b.slug))

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col selection:bg-[#0284C7]/20 selection:text-[#0284C7]">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. QUIET HERO SECTION (Light Canvas #FAF9F6)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium">
                  PRECISION INSTRUMENTATION
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#0F172A] leading-[1.12]">
                Analytical instruments for laboratories that demand{' '}
                <span className="text-[#0284C7]">reliable results.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
                JaaGee Scientific supplies, commissions and supports analytical equipment for the agri-food, feed, grain and dairy industries across West Africa.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/products"
                  className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition shadow-xs inline-flex items-center gap-2"
                >
                  <span>Explore Products</span>
                  <span className="text-sm">→</span>
                </Link>
                <Link
                  href="/brands"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] hover:text-[#0284C7] transition inline-flex items-center gap-1.5 py-3"
                >
                  <span>Our Brands</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Right Photography Column: hero-1.jpg */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[8px] overflow-hidden border border-[#E2E8F0] bg-white shadow-sm aspect-4/3 sm:aspect-16/11">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Scientist operating precision analytical equipment in a modern laboratory"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Technical Eyebrow Overlay */}
                <div className="absolute top-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E2E8F0] rounded-[6px] px-3.5 py-2 text-left shadow-xs pointer-events-none hidden sm:block">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0284C7] font-semibold block">
                    OPSIS LIQUIDLINE
                  </span>
                  <span className="text-xs font-bold text-[#0F172A] block font-mono mt-0.5">
                    KjelROC Analyzer
                  </span>
                  <span className="text-[10px] font-mono text-[#475569] block">
                    Automated Kjeldahl Protein & Nitrogen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. DARK ACCENT / PARTNER BREAK BAND (#080F17)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080F17] text-white py-16 sm:py-20 border-b border-[#151C28] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-semibold block">
                TRUSTED PARTNERS. LASTING SUPPORT.
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Precision Engineering for Analytical Excellence
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl">
                Field-proven instrumentation trusted by research laboratories and industrial testing facilities across West Africa.
              </p>
              <div className="pt-2">
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white transition tracking-wide"
                >
                  <span>Learn more about our brands</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-56 sm:h-64 rounded-[8px] overflow-hidden border border-[#151C28]">
              <Image
                src="/images/products/opsis-SoxROC_Front_open_140916-3937.jpg"
                alt="Automated extraction and distillation laboratory systems"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080F17]/85 via-[#080F17]/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. SHOP BY CATEGORY (Circular Image Masks)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                SHOP BY CATEGORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Find the right solution for your application.
              </h2>
              <p className="text-sm text-[#475569] mt-2 max-w-2xl leading-relaxed">
                From sample preparation to final analysis, we offer a complete range of laboratory and process instrumentation.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1 shrink-0"
            >
              <span>View all products</span>
              <span className="text-sm">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Category 1: Equipment */}
            <Link
              href="/products"
              className="bg-white rounded-[8px] border border-[#E2E8F0] p-8 text-center flex flex-col items-center hover:border-[#0284C7] transition subtle-hover-scale group shadow-xs"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border border-[#E2E8F0] bg-[#FAF9F6] relative mb-6 shrink-0 group-hover:border-[#0284C7] transition">
                <Image
                  src="/images/products/opsis-ANALYZER.jpg"
                  alt="Laboratory Equipment"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition mb-2">
                Equipment
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                Analytical instruments and laboratory systems.
              </p>
              <span className="text-xs font-semibold text-[#0284C7] mt-auto inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Browse Equipment <span>→</span>
              </span>
            </Link>

            {/* Category 2: Consumables */}
            <Link
              href="/products?q=consumable"
              className="bg-white rounded-[8px] border border-[#E2E8F0] p-8 text-center flex flex-col items-center hover:border-[#0284C7] transition subtle-hover-scale group shadow-xs"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border border-[#E2E8F0] bg-[#FAF9F6] relative mb-6 shrink-0 group-hover:border-[#0284C7] transition">
                <Image
                  src="/images/categories/consumables.jpg"
                  alt="Laboratory Consumables"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition mb-2">
                Consumables
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                Sample preparation, analysis and testing supplies.
              </p>
              <span className="text-xs font-semibold text-[#0284C7] mt-auto inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Browse Consumables <span>→</span>
              </span>
            </Link>

            {/* Category 3: Diagnostic Reagents */}
            <Link
              href="/products?category=food-safety-diagnostics"
              className="bg-white rounded-[8px] border border-[#E2E8F0] p-8 text-center flex flex-col items-center hover:border-[#0284C7] transition subtle-hover-scale group shadow-xs"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border border-[#E2E8F0] bg-[#FAF9F6] relative mb-6 shrink-0 group-hover:border-[#0284C7] transition">
                <Image
                  src="/images/categories/reagents.jpg"
                  alt="Diagnostic Reagents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition mb-2">
                Diagnostic Reagents
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                Test kits and laboratory reagents.
              </p>
              <span className="text-xs font-semibold text-[#0284C7] mt-auto inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Browse Reagents <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. OUR BRANDS (Restrained Manufacturer Cards)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                OUR BRANDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                World-class manufacturers. One trusted partner.
              </h2>
              <p className="text-sm text-[#475569] mt-2 max-w-2xl leading-relaxed">
                We work with established international manufacturers to bring you reliable, accurate and durable analytical solutions.
              </p>
            </div>
            <Link
              href="/brands"
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore all brands</span>
              <span className="text-sm">→</span>
            </Link>
          </div>

          {/* 4 Main Brand Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand) => {
              const summary = BRAND_SUMMARIES[brand.slug]
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="bg-[#FAF9F6] rounded-[8px] border border-[#E2E8F0] p-6 hover:border-[#0284C7] transition subtle-hover-scale flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold font-mono tracking-wide text-[#0F172A] group-hover:text-[#0284C7] transition">
                        {brand.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase text-[#94A3B8]">
                        {brand.country}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {summary?.summary || brand.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0284C7] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View range</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Partner Brand Strip */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center sm:justify-between gap-6 text-center">
            <span className="text-xs font-mono uppercase text-[#94A3B8] tracking-widest w-full sm:w-auto">
              Additional Direct Partnerships:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold font-mono text-[#475569]">
              {partnerStripBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="hover:text-[#0284C7] transition"
                >
                  {brand.name}
                </Link>
              ))}
              <span className="hover:text-[#0284C7] transition">LIQUIDLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. FEATURED PRODUCTS ("Selected instruments from our catalogue.")
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                FEATURED PRODUCTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Selected instruments from our catalogue.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1 shrink-0"
            >
              <span>View all products</span>
              <span className="text-sm">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, idx) => {
              const brandObj = brands.find((b) => b.slug === product.brand_slug)
              return (
                <div
                  key={product.slug}
                  className="bg-white rounded-[8px] border border-[#E2E8F0] overflow-hidden hover:border-[#0284C7] transition subtle-hover-scale flex flex-col group shadow-xs"
                >
                  {/* Photo area */}
                  <div className="relative w-full h-52 bg-[#FFFFFF] border-b border-[#E2E8F0] p-4 flex items-center justify-center">
                    {idx === 0 && (
                      <span className="absolute top-3 left-3 bg-[#080F17] text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-[3px] tracking-wider z-10">
                        FEATURED
                      </span>
                    )}
                    {product.image_url ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    ) : (
                      <ProductImageFallback
                        name={product.name}
                        brand={brandObj?.name}
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  {/* Information block */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block mb-1">
                        {brandObj?.name || product.brand_slug.toUpperCase()}
                      </span>
                      <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0284C7] transition leading-snug">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed">
                        {product.short_description || product.full_description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-[#0F172A] font-semibold hover:text-[#0284C7] transition inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Specifications</span>
                        <span>→</span>
                      </Link>
                      <Link
                        href={`/contact?requirement=${encodeURIComponent(product.name)}`}
                        className="text-[#0284C7] font-semibold hover:underline text-[11px]"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. INDUSTRIES ("Supporting key industries across West Africa.")
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                INDUSTRIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Supporting key industries across West Africa.
              </h2>
            </div>
            <Link
              href="/industries"
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1 shrink-0"
            >
              <span>View all industries</span>
              <span className="text-sm">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Agri-Feed', slug: 'agri-feed', image: '/images/industries/agri-feed.jpg' },
              { name: 'Grain Milling', slug: 'grain-milling', image: '/images/industries/grain-milling.jpg' },
              { name: 'Food Processing', slug: 'food-processing', image: '/images/industries/food-processing.jpg' },
              { name: 'Dairy', slug: 'dairy', image: '/images/industries/dairy.jpg' },
              { name: 'Beverages', slug: 'beverages', image: '/images/products/opsis-OpsisDistillationUnit180206-3856_s.jpg' },
              { name: 'Energy', slug: 'energy', image: '/images/products/opsis-HYDROC.jpg' },
            ].map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="relative h-44 rounded-[8px] overflow-hidden border border-[#E2E8F0] group shadow-2xs block"
              >
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080F17]/90 via-[#080F17]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition inline-flex items-center gap-1">
                    <span>{ind.name}</span>
                    <span className="text-xs">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. SERVICES & STORY SPLIT (Quiet, Trustworthy)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Services */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                  OUR SERVICES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  More than equipment. We provide support.
                </h2>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  {
                    num: '01',
                    title: 'Equipment Supply',
                    desc: 'Quality instruments from trusted international manufacturers.'
                  },
                  {
                    num: '02',
                    title: 'Commissioning',
                    desc: 'Correct installation and performance verification by trained engineers.'
                  },
                  {
                    num: '03',
                    title: 'Application Guidance',
                    desc: 'Expert advice for your specific analytical and ISO protocol requirements.'
                  },
                  {
                    num: '04',
                    title: 'Maintenance',
                    desc: 'Ongoing preventive service, calibration, and genuine spare parts support.'
                  }
                ].map((item) => (
                  <div
                    key={item.num}
                    className="bg-white rounded-[8px] border border-[#E2E8F0] p-4 sm:p-5 flex items-start gap-4 shadow-2xs"
                  >
                    <span className="text-lg font-mono font-bold text-[#0284C7] shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/services"
                  className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1"
                >
                  <span>Explore all services</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Our Story & Evidence */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
                  OUR STORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  Since 1987
                </h2>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  For over 39 years, JaaGee Scientific has been supplying analytical instrumentation and technical support to laboratories across West Africa.
                </p>
              </div>

              {/* 4 Trust Metrics (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-[8px] border border-[#E2E8F0] p-5 shadow-2xs">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] block">
                    1987
                  </span>
                  <h4 className="text-xs font-bold text-[#0284C7] mt-1">Company Foundation</h4>
                  <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                    Over 39 years of continuous laboratory support in West Africa.
                  </p>
                </div>

                <div className="bg-white rounded-[8px] border border-[#E2E8F0] p-5 shadow-2xs">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] block">
                    6
                  </span>
                  <h4 className="text-xs font-bold text-[#0284C7] mt-1">Direct Brand Partnerships</h4>
                  <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                    Exclusive and direct relationships with leading global manufacturers.
                  </p>
                </div>

                <div className="bg-white rounded-[8px] border border-[#E2E8F0] p-5 shadow-2xs">
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#0F172A] block">
                    ISO-Aligned
                  </span>
                  <h4 className="text-xs font-bold text-[#0284C7] mt-1">Technical Standards</h4>
                  <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                    Instruments calibrated to international standards (AOAC, ISO, AOCS).
                  </p>
                </div>

                <div className="bg-white rounded-[8px] border border-[#E2E8F0] p-5 shadow-2xs">
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#0F172A] block">
                    West Africa
                  </span>
                  <h4 className="text-xs font-bold text-[#0284C7] mt-1">Regional Reach</h4>
                  <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                    Active service network supporting labs in Nigeria and neighboring markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          8. BOTTOM CALLOUT / GET IN TOUCH ("Tell us what you need to measure.")
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080F17] text-white py-16 sm:py-20 border-b border-[#151C28] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-semibold block">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Tell us what you need to measure.
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Our team is ready to help you find the right solution for your laboratory or industrial application.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="bg-white hover:bg-[#FAF9F6] text-[#080F17] px-6 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition shadow-sm inline-flex items-center gap-2"
              >
                <span>Request Quote</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
