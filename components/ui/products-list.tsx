'use client'

// ===============================================================================
// JaaGee Scientific - Products List Client Component
// Row-based list layout with sidebar filtering + variant grouping + pagination
// ===============================================================================

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductImageFallback } from '@/components/ui/product-image-fallback'
import type { ProductSeed, BrandSeed, CategorySeed, IndustrySeed } from '@/lib/db/data/seed-data'

interface Props {
  products: ProductSeed[]
  brands: BrandSeed[]
  categories: CategorySeed[]
  industries: IndustrySeed[]
  selectedBrand: string
  selectedCategory: string
  selectedIndustry: string
  query: string
}

const PAGE_SIZE = 15

// Group products by brand+prefix for variant collapsing
function groupProducts(products: ProductSeed[]) {
  const grouped: Array<{ key: string; primary: ProductSeed; variants: ProductSeed[] }> = []
  const seen = new Set<string>()

  for (const product of products) {
    if (seen.has(product.id)) continue

    // Find variants: same brand, name starts with same first word token (e.g. "CAL3K", "ANKOM")
    const firstToken = product.name.split(/[\s\-–]/)[0].toUpperCase()
    const siblings = products.filter(
      (p) =>
        p.id !== product.id &&
        p.brand_slug === product.brand_slug &&
        p.name.toUpperCase().startsWith(firstToken) &&
        firstToken.length >= 4 // avoid single-word collisions
    )

    // Only collapse if we have actual sibling variants
    if (siblings.length >= 1) {
      for (const s of siblings) seen.add(s.id)
      seen.add(product.id)
      grouped.push({ key: product.id, primary: product, variants: siblings })
    } else {
      seen.add(product.id)
      grouped.push({ key: product.id, primary: product, variants: [] })
    }
  }

  return grouped
}

// Count products per filter option
function countBy(products: ProductSeed[], field: keyof ProductSeed, value: string) {
  return products.filter((p) => p[field] === value).length
}

function countByIndustry(products: ProductSeed[], slug: string) {
  return products.filter((p) => (p.industry_slugs as string[]).includes(slug)).length
}

// ── Product Row Component ──────────────────────────────────────────────────────
function ProductRow({
  product,
  brands,
  categories,
}: {
  product: ProductSeed
  brands: BrandSeed[]
  categories: CategorySeed[]
}) {
  const brandObj = brands.find((b) => b.slug === product.brand_slug)
  const categoryObj = categories.find((c) => c.slug === product.category_slug)
  const firstSpec = product.specifications?.[0]

  return (
    <div className="flex items-center gap-5 py-4 group">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-[90px] h-[90px] bg-[#f8f7f4] border border-[#e2e8f0] rounded-lg overflow-hidden flex items-center justify-center">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="90px"
          />
        ) : (
          <ProductImageFallback
            name={product.name}
            category={product.category_slug}
            brand={brandObj?.name}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-[#0b0f17] group-hover:text-[#0284c7] transition leading-snug">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-xs text-[#6b7280] mt-0.5 mb-1">
          {brandObj?.name || product.brand_slug.toUpperCase()}
        </p>

        {/* One-line monospace meta */}
        <p className="text-[10px] font-mono text-[#94a3b8] tracking-wide">
          {[
            brandObj?.name || product.brand_slug.toUpperCase(),
            categoryObj?.name,
            firstSpec ? `${firstSpec.value}` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <p className="text-xs text-[#6b7280] mt-1.5 line-clamp-1 leading-relaxed">
          {product.short_description}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-block mt-1.5 text-[11px] font-mono font-semibold text-[#0284c7] hover:underline"
        >
          Specifications ↗
        </Link>
      </div>

      {/* Enquire link */}
      <div className="shrink-0 hidden sm:block">
        <Link
          href={`/contact?requirement=${encodeURIComponent(product.name)}`}
          className="text-[11px] font-semibold text-[#0284c7] hover:underline whitespace-nowrap"
        >
          Enquire →
        </Link>
      </div>
    </div>
  )
}

// ── Grouped Row Component ──────────────────────────────────────────────────────
function GroupedRow({
  group,
  brands,
  categories,
}: {
  group: { key: string; primary: ProductSeed; variants: ProductSeed[] }
  brands: BrandSeed[]
  categories: CategorySeed[]
}) {
  const [expanded, setExpanded] = useState(false)
  const { primary, variants } = group

  return (
    <div>
      <ProductRow product={primary} brands={brands} categories={categories} />
      {variants.length > 0 && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-[110px] mb-2 text-[11px] font-mono text-[#0284c7] hover:underline flex items-center gap-1"
            aria-expanded={expanded}
          >
            <span>{expanded ? '▲' : '▼'}</span>
            {expanded ? 'Collapse' : `Expand ${variants.length} model${variants.length > 1 ? 's' : ''}`}
          </button>
          {expanded && (
            <div className="ml-6 pl-4 border-l-2 border-[#e2e8f0] space-y-0">
              {variants.map((v) => (
                <div key={v.id} className="border-b border-[#f1f5f9] last:border-0">
                  <ProductRow product={v} brands={brands} categories={categories} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Sidebar Filter Section ─────────────────────────────────────────────────────
function FilterSection({
  title,
  items,
  selectedValue,
  baseUrl,
  paramName,
  query,
  selectedBrand,
  selectedCategory,
  selectedIndustry,
}: {
  title: string
  items: Array<{ slug: string; name: string; count: number }>
  selectedValue: string
  baseUrl: string
  paramName: string
  query: string
  selectedBrand: string
  selectedCategory: string
  selectedIndustry: string
}) {
  const [open, setOpen] = useState(true)

  function buildUrl(slug: string) {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (paramName !== 'brand' && selectedBrand) params.set('brand', selectedBrand)
    if (paramName !== 'category' && selectedCategory) params.set('category', selectedCategory)
    if (paramName !== 'industry' && selectedIndustry) params.set('industry', selectedIndustry)
    if (slug) params.set(paramName, slug)
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div className="border-b border-[#e2e8f0] pb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2 text-[11px] font-mono font-bold text-[#0b0f17] uppercase tracking-wider"
      >
        <span>{title}</span>
        <span className="text-[#94a3b8]">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          {/* All option */}
          <Link
            href={buildUrl('')}
            className={`flex items-center justify-between py-1 px-2 rounded text-xs transition ${
              !selectedValue
                ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                : 'text-[#334155] hover:bg-[#f1f5f9]'
            }`}
          >
            <span>All</span>
            <span className={`text-[10px] font-mono ${!selectedValue ? 'text-[#0284c7]' : 'text-[#94a3b8]'}`}>
              {items.reduce((s, i) => s + i.count, 0)}
            </span>
          </Link>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={buildUrl(item.slug)}
              className={`flex items-center justify-between py-1 px-2 rounded text-xs transition ${
                selectedValue === item.slug
                  ? 'bg-[#0284c7]/10 text-[#0284c7] font-semibold'
                  : 'text-[#334155] hover:bg-[#f1f5f9]'
              }`}
            >
              <span className="truncate pr-2">{item.name}</span>
              <span className={`text-[10px] font-mono shrink-0 ${selectedValue === item.slug ? 'text-[#0284c7]' : 'text-[#94a3b8]'}`}>
                {item.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function ProductsList({
  products,
  brands,
  categories,
  industries,
  selectedBrand,
  selectedCategory,
  selectedIndustry,
  query,
}: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const resultsContainerRef = useRef<HTMLDivElement>(null)

  // Reset page to 1 when any filter or query changes
  useEffect(() => {
    setPage(1)
  }, [selectedBrand, selectedCategory, selectedIndustry, query])

  const grouped = useMemo(() => groupProducts(products), [products])
  const totalPages = Math.max(1, Math.ceil(grouped.length / pageSize))

  // Ensure current page does not exceed totalPages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const visibleGroups = grouped.slice((page - 1) * pageSize, page * pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    if (resultsContainerRef.current) {
      const topOffset = resultsContainerRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  // Build sidebar data with counts
  const brandItems = brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    count: products.filter((p) => p.brand_slug === b.slug).length,
  })).filter((b) => b.count > 0)

  const categoryItems = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    count: products.filter((p) => p.category_slug === c.slug).length,
  })).filter((c) => c.count > 0)

  const industryItems = industries.map((i) => ({
    slug: i.slug,
    name: i.name,
    count: products.filter((p) => (p.industry_slugs as string[]).includes(i.slug)).length,
  })).filter((i) => i.count > 0)

  const hasActiveFilter = selectedBrand || selectedCategory || selectedIndustry || query

  const filterSectionProps = { query, selectedBrand, selectedCategory, selectedIndustry, baseUrl: '/products' }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 items-start">

        {/* ── LEFT SIDEBAR ───────────────────────────────────────────── */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-mono font-bold text-[#0b0f17] uppercase tracking-wider">
                Filter
              </h2>
              {hasActiveFilter && (
                <Link
                  href="/products"
                  className="text-[10px] font-mono text-[#0284c7] hover:underline"
                >
                  Clear all
                </Link>
              )}
            </div>

            {/* Search (mobile fallback inside sidebar on desktop) */}
            <form method="GET" action="/products" className="pb-4 border-b border-[#e2e8f0]">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search instruments…"
                className="w-full bg-[#f8f7f4] border border-[#e2e8f0] rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />
              {selectedBrand && <input type="hidden" name="brand" value={selectedBrand} />}
              {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
              {selectedIndustry && <input type="hidden" name="industry" value={selectedIndustry} />}
            </form>

            <FilterSection
              title="Brand"
              items={brandItems}
              selectedValue={selectedBrand}
              paramName="brand"
              {...filterSectionProps}
            />
            <FilterSection
              title="Category"
              items={categoryItems}
              selectedValue={selectedCategory}
              paramName="category"
              {...filterSectionProps}
            />
            <FilterSection
              title="Industry"
              items={industryItems}
              selectedValue={selectedIndustry}
              paramName="industry"
              {...filterSectionProps}
            />
          </div>
        </aside>

        {/* ── RESULTS COLUMN ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Top bar — results count + sort + per-page */}
          <div ref={resultsContainerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#e2e8f0]">
            <div>
              <p className="text-sm font-semibold text-[#0b0f17]">
                <span className="font-mono text-[#0284c7]">{products.length}</span> Instruments
                {hasActiveFilter && (
                  <span className="text-xs text-[#6b7280] font-normal ml-2">(filtered)</span>
                )}
              </p>
              {grouped.length > 0 && (
                <p className="text-xs font-mono text-[#64748B] mt-0.5">
                  Showing {Math.min((page - 1) * pageSize + 1, grouped.length)}–{Math.min(page * pageSize, grouped.length)} of {grouped.length} equipment entries
                  {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Page size buttons */}
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <span className="font-mono text-[11px] hidden sm:inline">Per page:</span>
                {[8, 16, 24].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setPageSize(size)
                      setPage(1)
                    }}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono transition ${
                      pageSize === size
                        ? 'bg-[#0284c7] text-white font-bold'
                        : 'bg-white border border-[#e2e8f0] text-[#475569] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Mobile search */}
              <form method="GET" action="/products" className="flex gap-2 lg:hidden">
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search…"
                  className="w-28 bg-white border border-[#e2e8f0] rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
                {selectedBrand && <input type="hidden" name="brand" value={selectedBrand} />}
                {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
                {selectedIndustry && <input type="hidden" name="industry" value={selectedIndustry} />}
                <button type="submit" className="bg-[#0284c7] text-white px-2.5 py-1 rounded text-xs font-semibold">
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Mobile brand pills */}
          <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
            <Link
              href={`/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}&industry=${encodeURIComponent(selectedIndustry)}`}
              className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition ${!selectedBrand ? 'bg-[#0284c7] text-white' : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'}`}
            >
              All
            </Link>
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/products?brand=${b.slug}&q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}&industry=${encodeURIComponent(selectedIndustry)}`}
                className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition ${selectedBrand === b.slug ? 'bg-[#0284c7] text-white' : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'}`}
              >
                {b.name}
              </Link>
            ))}
          </div>

          {/* Results list */}
          {products.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-[#e2e8f0] space-y-3">
              <h3 className="text-lg font-bold text-[#0b0f17]">No instruments match selected filters</h3>
              <p className="text-xs text-[#6b7280]">Try searching for broad terms such as Kjeldahl, NIR, or Fiber analysis.</p>
              <Link href="/products" className="inline-block pt-2 text-xs font-mono font-bold text-[#0284c7] underline uppercase">
                Reset Filters →
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e8f0] rounded-xl divide-y divide-[#f1f5f9]">
              {visibleGroups.map((group) => (
                <div key={group.key} className="px-5">
                  <GroupedRow group={group} brands={brands} categories={categories} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#e2e8f0]">
              <span className="text-xs font-mono text-[#64748B]">
                Page {page} of {totalPages} ({grouped.length} total entries)
              </span>

              <div className="flex items-center gap-1">
                {/* First Button */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className="px-2.5 py-1.5 rounded text-xs font-mono border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f1f5f9] disabled:opacity-30 disabled:hover:bg-white transition"
                  aria-label="First Page"
                >
                  « First
                </button>

                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f1f5f9] disabled:opacity-30 disabled:hover:bg-white transition"
                  aria-label="Previous Page"
                >
                  ← Prev
                </button>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => handlePageChange(n)}
                    className={`w-8 h-8 rounded text-xs font-mono transition ${
                      n === page
                        ? 'bg-[#0284c7] text-white font-bold shadow-xs'
                        : 'bg-white border border-[#e2e8f0] text-[#334155] hover:bg-[#f1f5f9]'
                    }`}
                    aria-label={`Page ${n}`}
                    aria-current={n === page ? 'page' : undefined}
                  >
                    {n}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f1f5f9] disabled:opacity-30 disabled:hover:bg-white transition"
                  aria-label="Next Page"
                >
                  Next →
                </button>

                {/* Last Button */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page === totalPages}
                  className="px-2.5 py-1.5 rounded text-xs font-mono border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f1f5f9] disabled:opacity-30 disabled:hover:bg-white transition"
                  aria-label="Last Page"
                >
                  Last »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
