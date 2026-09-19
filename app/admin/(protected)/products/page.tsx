// ===============================================================================
// JaaGee Scientific - Admin Products List (/admin/products)
// File: C:\xampp\htdocs\jaagee\app\admin\(protected)\products\page.tsx
// ===============================================================================
// Server Component with URL-searchParam-driven filter/search.
// Reads all products via the existing repository (status: 'all').
// Links to edit and create pages.
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProducts, getBrands, getCategories } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Products | Admin CMS | JaaGee Scientific',
  robots: 'noindex, nofollow',
}

// ── Status badge helper ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'published'
      ? 'bg-[#166534] text-[#86EFAC]'
      : status === 'discontinued'
      ? 'bg-[#991B1B] text-[#FCA5A5]'
      : status === 'archived'
      ? 'bg-[#1E3A5F] text-[#93C5FD]'
      : 'bg-[#854D0E] text-[#FEF08A]'
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${cls}`}>
      {status}
    </span>
  )
}

function VerificationBadge({ status }: { status: string }) {
  const cls =
    status === 'verified'
      ? 'bg-[#065F46] text-[#6EE7B7]'
      : 'bg-[#9A3412] text-[#FFEDD5]'
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${cls}`}>
      {status}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
interface Props {
  searchParams: Promise<{
    q?: string
    brand?: string
    category?: string
    status?: string
    verification?: string
  }>
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const q = params.q?.trim() ?? ''
  const brandFilter = params.brand ?? ''
  const categoryFilter = params.category ?? ''
  const statusFilter = params.status ?? 'all'
  const verificationFilter = params.verification ?? 'all'

  const [allProducts, brands, categories] = await Promise.all([
    getProducts({
      status: 'all',
      verificationStatus: 'all',
    }),
    getBrands(),
    getCategories(),
  ])

  // Apply filters in-memory (repository already returns all records for admin)
  let filtered = allProducts

  if (q) {
    const lower = q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.slug.toLowerCase().includes(lower) ||
        p.brand_slug.toLowerCase().includes(lower) ||
        p.short_description?.toLowerCase().includes(lower)
    )
  }
  if (brandFilter) filtered = filtered.filter((p) => p.brand_slug === brandFilter)
  if (categoryFilter) filtered = filtered.filter((p) => p.category_slug === categoryFilter)
  if (statusFilter !== 'all') filtered = filtered.filter((p) => p.status === statusFilter)
  if (verificationFilter !== 'all')
    filtered = filtered.filter((p) => p.verification_status === verificationFilter)

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
            Product Catalogue
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            {filtered.length} of {allProducts.length} records
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold px-4 py-2 rounded transition"
        >
          + New Product
        </Link>
      </div>

      {/* ── FILTER BAR ──────────────────────────────────────────────── */}
      <form method="GET" className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, slug, brand…"
          className="bg-[#1E293B] border border-[#334155] rounded px-3 py-1.5 text-xs text-white placeholder-[#475569] font-mono focus:outline-none focus:border-[#0EA5E9] w-56"
        />

        {/* Brand */}
        <select
          name="brand"
          defaultValue={brandFilter}
          className="bg-[#1E293B] border border-[#334155] rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          name="category"
          defaultValue={categoryFilter}
          className="bg-[#1E293B] border border-[#334155] rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          name="status"
          defaultValue={statusFilter}
          className="bg-[#1E293B] border border-[#334155] rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
          <option value="discontinued">Discontinued</option>
        </select>

        {/* Verification */}
        <select
          name="verification"
          defaultValue={verificationFilter}
          className="bg-[#1E293B] border border-[#334155] rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="all">All Verification</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>

        <button
          type="submit"
          className="bg-[#334155] hover:bg-[#475569] text-white text-xs font-mono px-3 py-1.5 rounded transition"
        >
          Apply
        </button>
        <Link
          href="/admin/products"
          className="bg-transparent border border-[#334155] hover:border-[#475569] text-[#94A3B8] text-xs font-mono px-3 py-1.5 rounded transition"
        >
          Clear
        </Link>
      </form>

      {/* ── TABLE ───────────────────────────────────────────────────── */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-lg overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-[#64748B] text-sm font-mono">
            No products match the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F172A] border-b border-[#334155] text-[#94A3B8] font-mono uppercase">
                <tr>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {filtered.map((p) => {
                  const brandObj = brands.find((b) => b.slug === p.brand_slug)
                  return (
                    <tr key={p.slug} className="hover:bg-[#334155]/40 transition">
                      <td className="py-3 px-4 font-semibold text-white max-w-xs">
                        <span className="block truncate">{p.name}</span>
                        {p.replacement_product_slug && (
                          <span className="text-[#F87171] text-[10px] font-mono">
                            → {p.replacement_product_slug}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#CBD5E1] font-mono">
                        {brandObj?.name ?? p.brand_slug.toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-[#94A3B8] font-mono text-[11px]">
                        {p.slug}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="py-3 px-4">
                        <VerificationBadge status={p.verification_status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/products/${p.slug}/edit`}
                            className="text-[#38BDF8] hover:underline font-mono"
                          >
                            Edit
                          </Link>
                          {p.status === 'published' && (
                            <Link
                              href={`/products/${p.slug}`}
                              target="_blank"
                              className="text-[#94A3B8] hover:text-white"
                            >
                              View ↗
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── BACK LINK ───────────────────────────────────────────────── */}
      <div className="mt-6">
        <Link href="/admin/dashboard" className="text-[#64748B] hover:text-white text-xs font-mono">
          ← Dashboard
        </Link>
      </div>
    </main>
  )
}
