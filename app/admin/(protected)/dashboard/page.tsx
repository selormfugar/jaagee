// ===============================================================================
// JaaGee Scientific - Admin CMS Management Dashboard
// File: C:\xampp\htdocs\jaagee\app\admin\(protected)\dashboard\page.tsx
// ===============================================================================
// Protected by proxy.ts (admin session required).
// The admin header and logout are handled by the parent layout.
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProducts, getBrands, getCategories } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Admin Dashboard | JaaGee Scientific',
  description: 'Editorial CMS dashboard for managing publication status, verification status, and customer enquiries.',
  robots: 'noindex, nofollow',
}

export default async function AdminDashboardPage() {
  // Fetch all products (including draft, unverified, and discontinued items)
  const [allProducts, brands, categories] = await Promise.all([
    getProducts({ status: 'all', verificationStatus: 'all' }),
    getBrands(),
    getCategories(),
  ])

  const publishedCount = allProducts.filter(
    (p) => p.status === 'published' && p.verification_status === 'verified'
  ).length
  const draftCount = allProducts.filter((p) => p.status === 'draft').length
  const unverifiedCount = allProducts.filter(
    (p) => p.verification_status === 'unverified'
  ).length
  const discontinuedCount = allProducts.filter(
    (p) => p.status === 'discontinued'
  ).length

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* ── STATS OVERVIEW ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-5">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">
            Published &amp; Verified
          </span>
          <div className="text-3xl font-extrabold text-[#4ADE80] mt-1">
            {publishedCount}
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Live on public catalogue
          </span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-5">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">
            Draft Records
          </span>
          <div className="text-3xl font-extrabold text-[#FACC15] mt-1">
            {draftCount}
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Hidden from public
          </span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-5">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">
            Needs Verification
          </span>
          <div className="text-3xl font-extrabold text-[#FB923C] mt-1">
            {unverifiedCount}
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Title / spec review required
          </span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-5">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">
            Discontinued
          </span>
          <div className="text-3xl font-extrabold text-[#F87171] mt-1">
            {discontinuedCount}
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Linked to replacement models
          </span>
        </div>
      </div>

      {/* ── CMS MODULES ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Products module */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Products
            </h2>
            <span className="text-xs text-[#64748B] font-mono">
              {allProducts.length} records
            </span>
          </div>
          <p className="text-xs text-[#64748B] mb-4">
            Search, filter, create, and edit instruments. Set publication status, verification, featured flag, and discontinued replacement.
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin/products"
              className="bg-[#334155] hover:bg-[#475569] text-white text-xs font-mono px-4 py-2 rounded transition"
            >
              Manage Products →
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-mono px-4 py-2 rounded transition"
            >
              + New Product
            </Link>
          </div>
        </div>

        {/* Reference data summary */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6">
          <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-3">
            Reference Data
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Brands and categories are managed directly in Supabase. Image upload (Phase 19) will add Storage support.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#0F172A] rounded p-3">
              <div className="text-[#94A3B8] uppercase text-[10px]">Brands</div>
              <div className="text-white text-xl font-bold mt-0.5">{brands.length}</div>
            </div>
            <div className="bg-[#0F172A] rounded p-3">
              <div className="text-[#94A3B8] uppercase text-[10px]">Categories</div>
              <div className="text-white text-xl font-bold mt-0.5">{categories.length}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
