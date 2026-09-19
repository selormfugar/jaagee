// ===============================================================================
// JaaGee Scientific - Services Page (/services)
// File: C:\xampp\htdocs\jaagee\app\services\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getServices } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Laboratory Services & Technical Support | JaaGee Scientific',
  description: 'Technical services including equipment supply, uncrating, physical installation, method development, calibration setup, and preventive maintenance.'
}

// Extract the first sentence from a description, adding one short new detail
// rather than restating the summary line that already precedes it.
function firstSentence(text: string): string {
  const end = text.indexOf('. ')
  if (end === -1) return text
  return text.slice(0, end + 1)
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B0F17]">
      <Header />

      {/* SERVICES HEADER (Light Canvas #FAF9F6) */}
      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
            OUR SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
            More than equipment. We provide support.
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed">
            We supply, commission and support analytical equipment for laboratories and industrial applications across West Africa.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {services.map((service, idx) => (
            <article
              key={service.slug}
              className="bg-white rounded-xl border border-[#E2E8F0] p-8 sm:p-10 shadow-sm hover:border-[#0284C7] transition flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="flex items-start gap-8">
                <span className="text-3xl font-mono font-extrabold text-[#0284C7] shrink-0">
                  0{idx + 1}
                </span>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#0B0F17] font-sans">
                    {service.title}
                  </h2>
                  {/* Caps monospace subheading carries the core description */}
                  <p className="text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider">
                    {service.summary}
                  </p>
                  {/* One sentence — adds a new detail, doesn't restate the summary */}
                  <p className="text-sm text-[#6b7280] leading-relaxed max-w-3xl pt-1">
                    {firstSentence(service.description)}
                  </p>
                </div>
              </div>

              <Link
                href={`/contact?requirement=${encodeURIComponent(service.title)}`}
                className="shrink-0 bg-[#0B0F17] hover:bg-[#1E293B] text-white px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-wider transition text-center shadow-sm"
              >
                Enquire About Service ↗
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
