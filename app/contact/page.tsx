// ===============================================================================
// JaaGee Scientific - Contact & Enquiry Page (/contact)
// File: C:\xampp\htdocs\jaagee\app\contact\page.tsx
// ===============================================================================

'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm() {
  const searchParams = useSearchParams()
  const initialRequirement = searchParams.get('requirement') || ''

  const [status, setStatus] = useState<SubmissionState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const isSubmitting = status === 'submitting'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setStatus('submitting')
    setErrorMsg('')
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name')?.toString() || '',
      company: formData.get('company')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      product_requirement: formData.get('product_requirement')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      website_hp: formData.get('website_hp')?.toString() || '', // Honeypot
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setStatus('error')
        if (data.errors) {
          setFieldErrors(data.errors)
        }
        setErrorMsg(data.message || 'Submission failed. Please check input fields.')
        return
      }

      setStatus('success')
    } catch (err) {
      console.error('Contact Form Submission Error:', err)
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-bold text-[#0F172A]">Enquiry Received</h3>
        <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
          Thank you. Your request has been validated and logged into JaaGee Scientific&apos;s technical enquiry database. Our technical team will review your requirements and respond promptly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setErrorMsg('')
            setFieldErrors({})
          }}
          className="inline-block text-xs font-mono font-semibold uppercase text-[#0284C7] underline pt-4 cursor-pointer"
        >
          Submit Another Requirement →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-4">
        Submit Technical Request
      </h3>

      {errorMsg && (
        <div className="p-4 bg-[#FEE2E2] text-[#991B1B] text-xs rounded-lg font-medium">
          {errorMsg}
        </div>
      )}

      {/* Honeypot field (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <input name="website_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
            YOUR NAME <span className="text-[#DC2626]">*</span>
          </label>
          <input
            required
            name="name"
            placeholder="Dr. / Mr. / Ms. Full Name"
            disabled={isSubmitting}
            className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
          />
          {fieldErrors.name && (
            <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
            COMPANY / ORGANISATION <span className="text-[#DC2626]">*</span>
          </label>
          <input
            required
            name="company"
            placeholder="Company or Research Lab Name"
            disabled={isSubmitting}
            className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
          />
          {fieldErrors.company && (
            <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.company[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
            EMAIL ADDRESS <span className="text-[#DC2626]">*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="name@company.com"
            disabled={isSubmitting}
            className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
          />
          {fieldErrors.email && (
            <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
            PHONE NUMBER
          </label>
          <input
            name="phone"
            placeholder="+234..."
            disabled={isSubmitting}
            className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
          />
          {fieldErrors.phone && (
            <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.phone[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
          PRODUCT OR MEASUREMENT REQUIREMENT <span className="text-[#DC2626]">*</span>
        </label>
        <input
          required
          name="product_requirement"
          defaultValue={initialRequirement}
          placeholder="e.g. Kjelroc Analyzer, NIR Grain Unit, Fiber Analysis..."
          disabled={isSubmitting}
          className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
        />
        {fieldErrors.product_requirement && (
          <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.product_requirement[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono font-bold text-[#475569] mb-1">
          MESSAGE DETAILS <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Describe your sample throughput, analysis goals, or technical enquiry..."
          disabled={isSubmitting}
          className="w-full bg-[#FAF9F6] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-60"
        />
        {fieldErrors.message && (
          <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-lg text-xs font-mono uppercase tracking-wider transition shadow-md cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Validating & Submitting...' : 'Send Technical Enquiry ↗'}
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <Header />

      {/* CONTACT HEADER (Light Canvas #FAF9F6) */}
      <section className="bg-[#FAF9F6] py-12 sm:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#475569] font-medium block mb-1.5">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
            Tell us what you need to measure.
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#475569] leading-relaxed">
            Our team is ready to help you find the right analytical solution, configure specifications, or arrange technical support for your laboratory.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A]">JaaGee Nigeria Limited</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Analytical & testing equipment for industry, agriculture, and quality control since 1987.
              </p>

              <div className="space-y-4 pt-6 border-t border-[#F1F5F9] text-xs text-[#334155]">
                <div>
                  <span className="block font-mono text-[#94A3B8] uppercase text-[10px]">Headquarters</span>
                  <span className="font-semibold text-sm">Lagos & Regional Support Offices, Nigeria</span>
                </div>
                <div>
                  <span className="block font-mono text-[#94A3B8] uppercase text-[10px]">Direct Technical Inbox</span>
                  <span className="font-semibold text-sm text-[#0284C7]">Verified official inbox route</span>
                </div>
                <div>
                  <span className="block font-mono text-[#94A3B8] uppercase text-[10px]">Representation</span>
                  <span className="font-medium">Sole Agent for ANKOM, OPSIS, CHOPIN, PERTEN, NEOGEN, DDS</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E2E8F0] space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#475569] uppercase">Method Guidance</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If you are unsure which instrument model fits your sample throughput or ISO method requirements, specify your target sample type (e.g., wheat, animal feed, milk, flour) in the message body.
              </p>
            </div>
          </div>

          {/* Right Column: Form Wrapped in Suspense */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <Suspense fallback={<div className="p-8 text-center text-xs text-[#64748B]">Loading enquiry form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
