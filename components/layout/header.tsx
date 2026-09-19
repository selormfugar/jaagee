// ===============================================================================
// JaaGee Scientific - Refined Header Component with Product Search
// File: C:\xampp\htdocs\jaagee\components\layout\header.tsx
// ===============================================================================

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Brands', href: '/brands' },
    { label: 'Industries', href: '/industries' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (headerSearch.trim()) {
      router.push(`/products?q=${encodeURIComponent(headerSearch.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/98 backdrop-blur-md text-[#0F172A] border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* WORDMARK & SUB-TAGLINE */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="group flex flex-col justify-center">
            <span className="text-2xl font-bold tracking-tight text-[#0F172A] leading-none group-hover:text-[#0284C7] transition-colors">
              JaaGee
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#475569] font-semibold mt-1">
              SCIENTIFIC
            </span>
          </Link>
          <div className="hidden xl:block h-7 w-px bg-[#E2E8F0]" />
          <span className="hidden xl:block text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] leading-tight max-w-[130px]">
            ANALYTICAL INSTRUMENTS. REAL RESULTS.
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 whitespace-nowrap text-sm ${
                  isActive
                    ? 'text-[#0F172A] font-semibold border-b-2 border-[#0284C7]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* DESKTOP SEARCH & CTA */}
        <div className="hidden sm:flex items-center space-x-3 xl:space-x-4">
          {/* PRODUCT SEARCH INPUT */}
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products…"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="bg-[#FAF9F6] border border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] text-xs rounded-full pl-8 pr-3 py-1.5 w-36 md:w-44 lg:w-48 xl:w-56 focus:w-60 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all"
            />
            <svg
              className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          <Link
            href="/contact"
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 xl:px-5 py-2 rounded-[6px] text-xs font-semibold tracking-wide transition shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Request Quote</span>
            <span className="text-sm">→</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#475569] hover:text-[#0F172A] p-2"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E2E8F0] px-6 py-6 space-y-5 shadow-lg">
          {/* MOBILE PRODUCT SEARCH */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products, brands…"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#0284C7]"
            />
            <svg
              className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#0F172A] hover:text-[#0284C7] py-2 border-b border-[#E2E8F0]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-[#0284C7] text-white py-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider"
          >
            Request Quote →
          </Link>
        </div>
      )}
    </header>
  )
}
