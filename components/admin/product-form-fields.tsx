// ===============================================================================
// JaaGee Scientific - Shared Admin Product Form Fields
// File: C:\xampp\htdocs\jaagee\components\admin\product-form-fields.tsx
// ===============================================================================
// Pure Server Component — renders all product form inputs.
// Used by both /admin/products/new and /admin/products/[slug]/edit.
// Multi-select for industries; textarea for specs/features/applications.
// ===============================================================================

import React from 'react'
import type { BrandSeed, CategorySeed, IndustrySeed, ProductSeed } from '@/lib/db/data/seed-data'

interface FormDefaults {
  name?: string
  slug?: string
  sku?: string
  brand_slug?: string
  category_slug?: string
  industry_slugs?: string[]
  short_description?: string
  full_description?: string
  specifications_raw?: string
  features_raw?: string
  applications_raw?: string
  status?: string
  verification_status?: string
  is_featured?: boolean
  replacement_product_slug?: string
}

interface Props {
  brands: BrandSeed[]
  categories: CategorySeed[]
  industries: IndustrySeed[]
  allProducts: ProductSeed[]
  defaults?: FormDefaults
  mode: 'create' | 'edit'
  currentSlug?: string
}

// ── Input styling tokens ──────────────────────────────────────────────────────
const inputCls =
  'w-full bg-[#0F172A] border border-[#334155] rounded px-3 py-2 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/20 transition font-mono'

const labelCls = 'block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase'

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-[#475569] font-mono">{hint}</p>}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ProductFormFields({
  brands,
  categories,
  industries,
  allProducts,
  defaults = {},
  mode,
  currentSlug,
}: Props) {
  const d = defaults

  // Products available as replacement targets (exclude self in edit mode)
  const replacementCandidates = allProducts.filter(
    (p) => mode === 'create' || p.slug !== currentSlug
  )

  return (
    <div className="space-y-6">
      {/* ── SECTION: Identity ──────────────────────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-2">
          Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Instrument Name *">
            <input
              name="name"
              type="text"
              required
              defaultValue={d.name ?? ''}
              placeholder="e.g. OPSIS Kjeltec 8200"
              className={inputCls}
            />
          </Field>

          <Field
            label="Slug *"
            hint={
              mode === 'edit'
                ? 'Changing the slug will update the public URL and break existing links.'
                : 'Auto-generated from name. Use lowercase-hyphenated.'
            }
          >
            <input
              name="slug"
              type="text"
              required
              defaultValue={d.slug ?? ''}
              placeholder="e.g. opsis-kjeltec-8200"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="SKU / Model Code" hint="Internal reference code (optional)">
          <input
            name="sku"
            type="text"
            defaultValue={d.sku ?? ''}
            placeholder="e.g. KT-8200"
            className={inputCls}
          />
        </Field>
      </section>

      {/* ── SECTION: Classification ────────────────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-2">
          Classification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Brand *">
            <select
              name="brand_slug"
              required
              defaultValue={d.brand_slug ?? ''}
              className={inputCls}
            >
              <option value="">— Select brand —</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Category *">
            <select
              name="category_slug"
              required
              defaultValue={d.category_slug ?? ''}
              className={inputCls}
            >
              <option value="">— Select category —</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Industries"
          hint="Hold Ctrl / Cmd to select multiple industries."
        >
          <select
            name="industry_slugs"
            multiple
            defaultValue={d.industry_slugs ?? []}
            className={`${inputCls} min-h-[120px]`}
          >
            {industries.map((i) => (
              <option key={i.slug} value={i.slug}>
                {i.name}
              </option>
            ))}
          </select>
        </Field>
      </section>

      {/* ── SECTION: Descriptions ─────────────────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-2">
          Descriptions
        </h2>

        <Field
          label="Short Description"
          hint="Appears in catalogue card and product header. Max 500 characters."
        >
          <textarea
            name="short_description"
            rows={2}
            defaultValue={d.short_description ?? ''}
            maxLength={500}
            className={inputCls}
          />
        </Field>

        <Field
          label="Full Description"
          hint="Detailed product overview. Shown on product detail page. Max 5000 characters."
        >
          <textarea
            name="full_description"
            rows={5}
            defaultValue={d.full_description ?? ''}
            maxLength={5000}
            className={inputCls}
          />
        </Field>
      </section>

      {/* ── SECTION: Technical Data ────────────────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-2">
          Technical Data
        </h2>

        <Field
          label="Specifications"
          hint={'One per line, format: "Parameter: Value" — e.g. "Measurement Range: 0–100%"'}
        >
          <textarea
            name="specifications_raw"
            rows={8}
            defaultValue={d.specifications_raw ?? ''}
            placeholder={'Measurement Range: 0–100%\nAccuracy: ±0.1%\nSample Capacity: 12'}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>

        <Field
          label="Key Features"
          hint="One feature per line."
        >
          <textarea
            name="features_raw"
            rows={5}
            defaultValue={d.features_raw ?? ''}
            placeholder={'Fully automated sample preparation\nISO 20483 compliant\nTouch-screen interface'}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>

        <Field
          label="Key Applications"
          hint="One application per line."
        >
          <textarea
            name="applications_raw"
            rows={5}
            defaultValue={d.applications_raw ?? ''}
            placeholder={'Grain protein analysis\nFeed quality control\nSoil nitrogen testing'}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </section>

      {/* ── SECTION: Status & Publication ─────────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-2">
          Publication Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Publication Status *">
            <select
              name="status"
              required
              defaultValue={d.status ?? 'draft'}
              className={inputCls}
            >
              <option value="draft">Draft — hidden from public</option>
              <option value="published">Published — live on catalogue</option>
              <option value="archived">Archived — hidden, retained in DB</option>
              <option value="discontinued">Discontinued — public with replacement notice</option>
            </select>
          </Field>

          <Field label="Verification Status *">
            <select
              name="verification_status"
              required
              defaultValue={d.verification_status ?? 'unverified'}
              className={inputCls}
            >
              <option value="unverified">Unverified — needs spec review</option>
              <option value="verified">Verified — specs confirmed accurate</option>
            </select>
          </Field>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="is_featured"
            name="is_featured"
            type="checkbox"
            defaultChecked={d.is_featured ?? false}
            value="on"
            className="h-4 w-4 accent-[#0EA5E9]"
          />
          <label htmlFor="is_featured" className="text-xs font-mono text-[#CBD5E1]">
            Featured product (appears in homepage showcase)
          </label>
        </div>
      </section>

      {/* ── SECTION: Discontinued Replacement ────────────────────────── */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-lg p-5">
        <h2 className="text-xs font-mono text-[#0EA5E9] uppercase tracking-widest mb-4">
          Discontinued Replacement
        </h2>
        <Field
          label="Replacement Product"
          hint='Set only if this product is Discontinued. The replacement will be linked on the public detail page.'
        >
          <select
            name="replacement_product_slug"
            defaultValue={d.replacement_product_slug ?? ''}
            className={inputCls}
          >
            <option value="">— None —</option>
            {replacementCandidates.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} ({p.slug})
              </option>
            ))}
          </select>
        </Field>
      </section>
    </div>
  )
}
