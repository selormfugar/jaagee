// ===============================================================================
// JaaGee Scientific - About Page (/about)
// Brand Language: QUIET. ELEGANT. COMFORTABLE. PROFESSIONAL. TRUSTWORTHY.
// File: C:\xampp\htdocs\jaagee\app\about\page.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'About Us | JaaGee Scientific',
  description: 'Since 1987, JaaGee Scientific has supplied analytical instrumentation, installation, and technical support to laboratories across West Africa.'
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col selection:bg-[#0284C7]/20 selection:text-[#0284C7]">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO SECTION (Light Canvas #FAF9F6)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#E2E8F0] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block">
                ABOUT JAAGEE SCIENTIFIC
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-bold tracking-tight text-[#0F172A] leading-[1.14]">
                Trusted analytical instrumentation{' '}
                <span className="text-[#0284C7]">since 1987.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
                JaaGee Scientific is a leading supplier of analytical instruments and laboratory equipment, serving research, quality control and industrial laboratories across West Africa.
              </p>

              <div className="pt-2">
                <a
                  href="#history"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1.5"
                >
                  <span>Our History</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            {/* Right Photography: Lab Scientist */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[8px] overflow-hidden border border-[#E2E8F0] bg-white shadow-xs aspect-4/3 sm:aspect-16/11">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Scientist conducting precision measurement in modern analytical laboratory"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E2E8F0] rounded-[6px] px-3 py-1.5 shadow-2xs pointer-events-none hidden sm:block">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#475569] font-bold">
                    BETTER DATA. BETTER DECISIONS.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. OUR STORY & EVIDENCE SECTION
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="history" className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Story Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block">
                OUR STORY
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
                Engineering confidence in every measurement.
              </h2>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Founded in 1987, JaaGee Scientific began with a simple purpose: to provide reliable analytical instrumentation and technical support to laboratories in Nigeria and across West Africa.
              </p>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Today, we represent a select range of international manufacturers, supporting our clients with the right equipment, application guidance and ongoing service.
              </p>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1.5"
                >
                  <span>Our Products</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Right Stats & Evidence Column */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF9F6] rounded-[8px] border border-[#E2E8F0] p-6 shadow-2xs">
                <span className="text-3xl font-mono font-bold text-[#0F172A] block">1987</span>
                <h4 className="text-xs font-bold text-[#0284C7] mt-1.5">Company Foundation</h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Over 39 years of laboratory engineering and technical support.
                </p>
              </div>

              <div className="bg-[#FAF9F6] rounded-[8px] border border-[#E2E8F0] p-6 shadow-2xs">
                <span className="text-3xl font-mono font-bold text-[#0F172A] block">6</span>
                <h4 className="text-xs font-bold text-[#0284C7] mt-1.5">Global Partners</h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Exclusive and direct partnerships with leading manufacturers.
                </p>
              </div>

              <div className="bg-[#FAF9F6] rounded-[8px] border border-[#E2E8F0] p-6 shadow-2xs">
                <span className="text-2xl font-mono font-bold text-[#0F172A] block">ISO-Aligned</span>
                <h4 className="text-xs font-bold text-[#0284C7] mt-1.5">Technical Standards</h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Factory calibration and quality assurance aligned to international norms.
                </p>
              </div>

              <div className="bg-[#FAF9F6] rounded-[8px] border border-[#E2E8F0] p-6 shadow-2xs">
                <span className="text-2xl font-mono font-bold text-[#0F172A] block">West Africa</span>
                <h4 className="text-xs font-bold text-[#0284C7] mt-1.5">Regional Reach</h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Service and support across Nigeria and neighboring regional markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. OUR VALUES (Monoline Icon Cards)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAF9F6] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
              OUR VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Principles that guide how we work.
            </h2>
            <p className="text-sm text-[#475569] mt-2 leading-relaxed">
              Our long-standing relationships with our partners, clients and team are built on a foundation of technical expertise, reliability and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Technical Expertise',
                desc: 'Deep product knowledge and hands-on application support.',
                icon: (
                  <svg className="w-6 h-6 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="3" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="21" y2="12" />
                  </svg>
                )
              },
              {
                title: 'Reliability',
                desc: 'Dependable equipment, certified service and sound technical advice.',
                icon: (
                  <svg className="w-6 h-6 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                )
              },
              {
                title: 'Partnership',
                desc: 'Long-term relationships with global manufacturers and local laboratory clients.',
                icon: (
                  <svg className="w-6 h-6 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                )
              },
              {
                title: 'Integrity',
                desc: 'Honest advice, factual specifications and transparent business practices.',
                icon: (
                  <svg className="w-6 h-6 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )
              }
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-[8px] border border-[#E2E8F0] p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">{v.icon}</div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. OUR JOURNEY (Dark Band #080F17)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080F17] text-white py-20 border-b border-[#151C28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Headline */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-semibold block">
                OUR JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                From 1987 to today.
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Nearly four decades of supporting laboratories and industries across West Africa.
              </p>
              <div className="pt-2">
                <Link
                  href="/services"
                  className="text-xs font-semibold text-[#38BDF8] hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span>Our Services</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Right Timeline Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { year: '1987', title: 'JaaGee Founded', desc: 'Incorporated in Nigeria to provide analytical testing equipment.' },
                { year: '1990s', title: 'Brand Expansion', desc: 'Established partnerships with leading European and American manufacturers.' },
                { year: '2000s', title: 'Regional Footprint', desc: 'Expanded delivery and field engineering across West Africa.' },
                { year: '2010s', title: 'Technical Service', desc: 'Strengthened in-country calibration and spare parts infrastructure.' },
                { year: '2020s', title: 'Application Focus', desc: 'Enhanced ISO protocol support for food safety and agri-feed testing.' },
                { year: 'Today', title: 'Modern Laboratories', desc: 'Supplying next-generation automated instrumentation to industry.' }
              ].map((item) => (
                <div
                  key={item.year}
                  className="bg-[#151C28] border border-[#1E293B] rounded-[8px] p-5 space-y-2"
                >
                  <span className="text-xs font-mono font-bold text-[#38BDF8] block">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. OUR MISSION & QUOTE
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Mission text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block">
                OUR MISSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight leading-tight">
                To support scientific progress through reliable instrumentation.
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                We help our clients achieve accurate results, improve efficiency and maintain the highest standards in their work — with the right equipment, expert guidance and dependable support.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] hover:text-[#0369A1] transition inline-flex items-center gap-1.5"
                >
                  <span>Get in Touch</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Quote Card */}
            <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-[8px] p-8 shadow-2xs space-y-4">
              <span className="text-3xl font-serif text-[#0284C7] block leading-none">&ldquo;</span>
              <p className="text-base sm:text-lg font-medium text-[#0F172A] italic leading-snug">
                The right instrument in the right hands makes all the difference.
              </p>
              <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                — JaaGee Scientific
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. BOTTOM CTA BAND
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080F17] text-white py-16 sm:py-20 border-b border-[#151C28] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-semibold block">
                LET&apos;S WORK TOGETHER
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
