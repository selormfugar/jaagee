// ===============================================================================
// JaaGee Scientific - Refined Footer Component
// File: C:\xampp\htdocs\jaagee\components\layout\footer.tsx
// ===============================================================================

import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#080F17] text-[#94A3B8] border-t border-[#151C28] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#151C28]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-bold tracking-tight text-white block">
                JaaGee
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#94A3B8] block mt-0.5">
                SCIENTIFIC
              </span>
            </Link>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Since 1987, JaaGee has supplied analytical instrumentation, installation, application guidance, and technical maintenance to laboratories across West Africa.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] bg-[#151C28] px-3 py-1 rounded-[4px] border border-[#1E293B]">
                EST. 1987 · NIGERIA
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider font-semibold">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link href="/brands" className="hover:text-white transition">Brands</Link></li>
              <li><Link href="/industries" className="hover:text-white transition">Industries</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Manufacturers Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider font-semibold">Manufacturers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/brands/opsis" className="hover:text-white transition">OPSIS / LiquidLINE</Link></li>
              <li><Link href="/brands/ankom" className="hover:text-white transition">ANKOM Technology</Link></li>
              <li><Link href="/brands/perten" className="hover:text-white transition">PERTEN Instruments</Link></li>
              <li><Link href="/brands/neogen" className="hover:text-white transition">NEOGEN</Link></li>
              <li><Link href="/brands/chopin" className="hover:text-white transition">CHOPIN</Link></li>
              <li><Link href="/brands/dds" className="hover:text-white transition">DDS Calorimeters</Link></li>
            </ul>
          </div>

          {/* Contact / Quick Info Column */}
          <div className="md:col-span-3 space-y-3 bg-[#151C28] p-6 rounded-[8px] border border-[#1E293B]">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider font-semibold">Get in Touch</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Tell us what you need to measure. Our application specialists assist with instrument selection and technical support.
            </p>
            <div className="pt-1 text-xs text-[#E2E8F0] space-y-1">
              <p className="text-[#38BDF8] font-mono">info@jaagee.com</p>
              <p className="text-[#94A3B8]">Lagos, Nigeria</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 w-full text-center bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition mt-2"
            >
              <span>Request Quote</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]">
          <span>© 2026 JaaGee Scientific. All rights reserved.</span>
          <div className="flex items-center gap-6 mt-3 sm:mt-0 font-mono text-[11px]">
            <Link href="/about" className="hover:text-white transition">Privacy</Link>
            <span className="text-[#334155]">·</span>
            <Link href="/about" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
