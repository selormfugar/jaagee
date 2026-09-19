// ===============================================================================
// JaaGee Scientific - Hero Auto-Rotating Carousel Component
// File: C:\xampp\htdocs\jaagee\components\home\hero-carousel.tsx
// Features: Auto-play (5s), pause on hover, slide 1 is an official partner alert,
// subsequent slides showcase top analytical equipment with real photos & specs.
// ===============================================================================

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductImageFallback } from '@/components/ui/product-image-fallback'

interface EquipmentSlide {
  type: 'alert' | 'product'
  title: string
  subtitle: string
  brand: string
  country: string
  badgeText: string
  description?: string
  specs?: Array<{ label: string; value: string }>
  imageUrl?: string
  productSlug?: string
  ctaText: string
  ctaHref: string
}

const SLIDES: EquipmentSlide[] = [
  // ── SLIDE 1: OFFICIAL ALERT / PARTNER ADVISORY ─────────────────────────────
  {
    type: 'alert',
    badgeText: 'OFFICIAL NOTIFICATION · REGIONAL AGENCY',
    title: 'Accredited Sole Agent & Technical Service Center',
    subtitle: 'Direct Factory Support Across Nigeria & West Africa',
    brand: 'JAAGEE NIGERIA LTD',
    country: 'NIGERIA / EST. 1987',
    description:
      'JaaGee is the officially appointed sole agent and factory distributor for OPSIS LiquidLINE, ANKOM Technology, PERTEN Instruments, NEOGEN, CHOPIN Technologies, and DDS Calorimeters. All instruments are supplied with manufacturer calibration certificates, direct factory warranty, and local engineer commissioning.',
    specs: [
      { label: 'Agency Status', value: 'Exclusive Sole Agent' },
      { label: 'Field Engineers', value: 'Factory Certified' },
      { label: 'Parts & Consumables', value: 'In-Country Inventory' },
      { label: 'Dispatch Network', value: 'All 36 States & Regional' }
    ],
    ctaText: 'Verify Manufacturer Partnerships ↗',
    ctaHref: '/brands'
  },
  // ── SLIDE 2: OPSIS KjelROC ANALYZER ─────────────────────────────────────────
  {
    type: 'product',
    badgeText: 'FEATURED INSTRUMENT',
    title: 'KjelROC Automated Analyzer',
    subtitle: 'Nitrogen, Protein & Kjeldahl Distillation',
    brand: 'OPSIS LiquidLINE',
    country: 'SWEDEN',
    imageUrl: '/images/products/opsis-ANALYZER.jpg',
    productSlug: 'kjelroc-analyzer',
    specs: [
      { label: 'Method', value: 'Official Kjeldahl (AOAC, ISO 20483)' },
      { label: 'Analysis Time', value: '3.5 to 4.5 minutes / sample' },
      { label: 'Burette Accuracy', value: '< 0.1% RSD precision titration' },
      { label: 'Safety', value: 'Active steam generator & door sensors' }
    ],
    ctaText: 'View Technical Specifications ↗',
    ctaHref: '/products/kjelroc-analyzer'
  },
  // ── SLIDE 3: PERTEN IN-LINE NIR SENSOR ──────────────────────────────────────
  {
    type: 'product',
    badgeText: 'NEAR-INFRARED SPECTROSCOPY',
    title: 'DA 7300 In-Line Process NIR',
    subtitle: 'Continuous Flour, Grain & Feed Monitoring',
    brand: 'PERTEN Instruments',
    country: 'SWEDEN',
    imageUrl: '/images/products/in-line-nir-sensor-da-7300-DA-7300-1.jpg',
    productSlug: 'in-line-nir-sensor-da-7300',
    specs: [
      { label: 'Technology', value: 'High-speed Diode Array (DA)' },
      { label: 'Parameters', value: 'Moisture, Protein, Ash, Fat, Fiber' },
      { label: 'Measurement Speed', value: 'Real-time continuous flow' },
      { label: 'Interface', value: 'Industry 4.0 / SCADA integration' }
    ],
    ctaText: 'View Technical Specifications ↗',
    ctaHref: '/products/in-line-nir-sensor-da-7300'
  },
  // ── SLIDE 4: OPSIS SoxROC EXTRACTION SYSTEM ─────────────────────────────────
  {
    type: 'product',
    badgeText: 'SOLVENT EXTRACTION',
    title: 'SoxROC Automated Extraction Unit',
    subtitle: 'High-Throughput Fat & Solvent Recovery',
    brand: 'OPSIS LiquidLINE',
    country: 'SWEDEN',
    imageUrl: '/images/products/opsis-SoxROC_Front_open_140916-3937.jpg',
    productSlug: 'soxroc-extraction-unit',
    specs: [
      { label: 'Positions', value: '6 extraction positions simultaneous' },
      { label: 'Solvent Recovery', value: '> 90% closed-loop recovery' },
      { label: 'Compliance', value: 'ISO 1443, AOAC 920.39, EPA 3541' },
      { label: 'Speed', value: 'Up to 5x faster than classical Soxhlet' }
    ],
    ctaText: 'View Technical Specifications ↗',
    ctaHref: '/products/soxroc-extraction-unit'
  },
  // ── SLIDE 5: ANKOM FIBER & DIGESTIBILITY ────────────────────────────────────
  {
    type: 'product',
    badgeText: 'FILTER BAG TECHNOLOGY',
    title: 'Delta Automated Fiber Analyzer',
    subtitle: 'Crude Fiber, ADF & NDF Determination',
    brand: 'ANKOM Technology',
    country: 'USA',
    specs: [
      { label: 'Technology', value: 'Patented Filter Bag System (FBT)' },
      { label: 'Sample Capacity', value: 'Up to 24 samples per batch' },
      { label: 'Operator Time', value: '< 15 minutes technician handling' },
      { label: 'Standards', value: 'AOAC 973.18, AOCS Ba 6a-05' }
    ],
    ctaText: 'Explore Fiber Systems ↗',
    ctaHref: '/products?category=fiber-analysis'
  }
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto advance every 5.5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 5500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused])

  const slide = SLIDES[current]

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-2xl overflow-hidden border border-[#2D3748] shadow-2xl bg-[#0F172A] transition-all"
    >
      {/* ── TOP STATUS / HEADER BAR ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E293B] bg-[#0B0F17]/90 text-xs">
        <div className="flex items-center space-x-2">
          {slide.type === 'alert' ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
          ) : (
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
            </span>
          )}
          <span
            className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
              slide.type === 'alert' ? 'text-amber-400' : 'text-[#38BDF8]'
            }`}
          >
            {slide.badgeText}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
            {slide.country}
          </span>
          <span className="text-xs font-mono font-bold text-white bg-[#1E293B] px-2 py-0.5 rounded">
            0{current + 1} / 0{SLIDES.length}
          </span>
        </div>
      </div>

      {/* ── SLIDE CONTENT AREA ────────────────────────────────────────────── */}
      <div className="min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
        {slide.type === 'alert' ? (
          /* ── ALERT SLIDE (Slide 1) ── */
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B]/40 relative overflow-hidden">
            {/* Ambient blueprint watermarking */}
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
              <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#38BDF8">
                <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="30" strokeWidth="1" />
                <circle cx="50" cy="50" r="15" strokeWidth="1.5" />
                <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.8" />
                <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" />
              </svg>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-semibold px-3 py-1 rounded-full mb-3">
                <span>⚠</span>
                <span>FACTORY ACCREDITED REPRESENTATIVE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {slide.title}
              </h3>
              <p className="text-xs font-mono text-[#38BDF8] mt-1 mb-4">
                {slide.brand} · {slide.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6">
                {slide.description}
              </p>

              {/* 4 Technical Guarantee Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {slide.specs?.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#1E293B]/70 border border-[#334155]/60 rounded-lg px-3 py-2 flex flex-col justify-center"
                  >
                    <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <Link
                href={slide.ctaHref}
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition shadow-md flex items-center gap-2"
              >
                <span>{slide.ctaText}</span>
              </Link>
              <span className="text-[10px] font-mono text-[#64748B]">
                PAUSE ON HOVER · AUTO-ADVANCING
              </span>
            </div>
          </div>
        ) : (
          /* ── PRODUCT SLIDES (Slides 2, 3, 4, 5) ── */
          <div className="flex-1 flex flex-col justify-between">
            {/* Photography Canvas */}
            <div className="relative w-full h-64 sm:h-72 bg-[#0B0F17]/50 flex items-center justify-center p-4">
              {slide.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              ) : (
                <ProductImageFallback
                  name={slide.title}
                  brand={slide.brand}
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Product Meta & Specs */}
            <div className="p-6 bg-[#0B0F17]/90 border-t border-[#1E293B]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest block">
                    {slide.brand}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">{slide.subtitle}</p>
                </div>
                <Link
                  href={slide.ctaHref}
                  className="shrink-0 bg-[#0284C7] hover:bg-[#0369A1] text-white px-3.5 py-1.5 rounded text-xs font-semibold transition flex items-center gap-1 self-center whitespace-nowrap"
                >
                  <span>Specs</span>
                  <span className="text-[#38BDF8]">↗</span>
                </Link>
              </div>

              {/* Specification mini-grid */}
              {slide.specs && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#1E293B]/70">
                  {slide.specs.slice(0, 2).map((s) => (
                    <div key={s.label} className="text-left">
                      <span className="text-[9px] font-mono text-[#64748B] uppercase block truncate">
                        {s.label}
                      </span>
                      <span className="text-[11px] font-mono text-[#E2E8F0] font-semibold block truncate">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── CAROUSEL CONTROLS FOOTER ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#1E293B] bg-[#080C14]">
        {/* Previous Button */}
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="text-[#94A3B8] hover:text-white text-xs font-mono px-2 py-1 rounded hover:bg-[#1E293B] transition flex items-center gap-1"
          aria-label="Previous Slide"
        >
          <span>←</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Indicator Buttons */}
        <div className="flex items-center space-x-1.5">
          {SLIDES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === current
                  ? idx === 0
                    ? 'w-7 bg-amber-400'
                    : 'w-7 bg-[#0284C7]'
                  : 'w-2 bg-[#334155] hover:bg-[#64748B]'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              title={`${idx === 0 ? 'Alert' : s.title}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="text-[#94A3B8] hover:text-white text-xs font-mono px-2 py-1 rounded hover:bg-[#1E293B] transition flex items-center gap-1"
          aria-label="Next Slide"
        >
          <span className="hidden sm:inline">Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
