// ===============================================================================
// JaaGee Scientific - Product Form Validation Schema (Zod)
// File: C:\xampp\htdocs\jaagee\lib\validation\product.ts
// ===============================================================================
// Used by admin Server Actions for both create and edit operations.
// All validation is server-side — no client-side form library required.
// ===============================================================================

import { z } from 'zod'

// Spec row: { label, value }
const SpecificationSchema = z.object({
  label: z.string().min(1, 'Specification label is required').max(200),
  value: z.string().min(1, 'Specification value is required').max(500),
})

export const ProductFormSchema = z.object({
  // ── Core identity ─────────────────────────────────────────────────────────
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(200, 'Product name must be under 200 characters'),

  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(120, 'Slug must be under 120 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),

  sku: z.string().max(80).optional().or(z.literal('')),

  // ── Classification ────────────────────────────────────────────────────────
  brand_slug: z.string().min(1, 'Brand is required'),
  category_slug: z.string().min(1, 'Category is required'),

  // industry_slugs comes as comma-separated string from <select multiple>
  industry_slugs_raw: z.string().optional().or(z.literal('')),

  // ── Descriptions ─────────────────────────────────────────────────────────
  short_description: z
    .string()
    .max(500, 'Short description must be under 500 characters')
    .optional()
    .or(z.literal('')),

  full_description: z
    .string()
    .max(5000, 'Full description must be under 5000 characters')
    .optional()
    .or(z.literal('')),

  // ── Structured data — newline-separated plain text ────────────────────────
  // specs stored as JSON in DB; form submits as "Label: Value" per line
  specifications_raw: z.string().optional().or(z.literal('')),
  features_raw: z.string().optional().or(z.literal('')),
  applications_raw: z.string().optional().or(z.literal('')),

  // ── Status ────────────────────────────────────────────────────────────────
  status: z.enum(['draft', 'published', 'archived', 'discontinued']),
  verification_status: z.enum(['unverified', 'verified']),

  // ── Flags ─────────────────────────────────────────────────────────────────
  is_featured: z.string().optional(), // checkbox returns 'on' or undefined

  // ── Discontinued replacement ───────────────────────────────────────────────
  replacement_product_slug: z.string().max(120).optional().or(z.literal('')),
})

export type ProductFormInput = z.infer<typeof ProductFormSchema>

// ── Parsers for structured fields ────────────────────────────────────────────

/** "Label: Value\nLabel2: Value2" → [{label, value}] */
export function parseSpecificationsRaw(
  raw: string | undefined | null
): Array<{ label: string; value: string }> {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) return { label: line, value: '' }
      return {
        label: line.slice(0, colonIdx).trim(),
        value: line.slice(colonIdx + 1).trim(),
      }
    })
    .filter((s) => s.label)
}

/** "Item 1\nItem 2" → ['Item 1', 'Item 2'] */
export function parseListRaw(raw: string | undefined | null): string[] {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

/** "slug1,slug2" → ['slug1', 'slug2'] */
export function parseIndustrySlugsRaw(raw: string | undefined | null): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** [{label,value}] → "Label: Value\nLabel2: Value2" */
export function specificationsToRaw(
  specs: Array<{ label: string; value: string }> | undefined | null
): string {
  if (!specs?.length) return ''
  return specs.map((s) => `${s.label}: ${s.value}`).join('\n')
}

/** string[] → "Item 1\nItem 2" */
export function listToRaw(items: string[] | undefined | null): string {
  if (!items?.length) return ''
  return items.join('\n')
}
