// ===============================================================================
// JaaGee Scientific - Technical Schematic Fallback (Light-Theme)
// File: C:\xampp\htdocs\jaagee\components\ui\product-image-fallback.tsx
// ===============================================================================

import React from 'react'

interface FallbackProps {
  name: string
  category?: string
  brand?: string
  className?: string
}

type SilhouetteVariant = 'benchtop-unit' | 'extraction-vessel' | 'calorimeter' | 'analyzer-sensor'

// Map category slugs → silhouette variant
const CATEGORY_VARIANT_MAP: Record<string, SilhouetteVariant> = {
  'protein-nitrogen-kjeldahl': 'benchtop-unit',
  'sample-preparation':        'benchtop-unit',
  'equipment':                 'benchtop-unit',
  'analytical-equipment':      'benchtop-unit',
  'fat-extraction':            'extraction-vessel',
  'fiber-analysis':            'extraction-vessel',
  'consumables':               'extraction-vessel',
  'nir-spectroscopy':          'analyzer-sensor',
  'rheology-dough-testing':    'analyzer-sensor',
  'food-safety-diagnostics':   'analyzer-sensor',
  'reagents':                  'analyzer-sensor',
  'reagent':                   'analyzer-sensor',
  'bomb-calorimetry':          'calorimeter',
  'furniture':                 'benchtop-unit',
}

function getVariant(category?: string): SilhouetteVariant {
  if (!category) return 'benchtop-unit'
  // category prop may be a display name or slug — try both forms
  const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-').replace(/[()]/g, '')
  return CATEGORY_VARIANT_MAP[slug] || CATEGORY_VARIANT_MAP[category] || 'benchtop-unit'
}

// ── SVG silhouettes ────────────────────────────────────────────────────────────

function BenchtopUnit() {
  return (
    <g>
      {/* Main body */}
      <rect x="18" y="28" width="64" height="44" rx="2" fill="none" stroke="#0b0f17" strokeWidth="1.2" />
      {/* Control panel face */}
      <rect x="22" y="32" width="56" height="20" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      {/* Display screen */}
      <rect x="26" y="35" width="22" height="12" rx="1" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="0" />
      {/* Knob 1 */}
      <circle cx="58" cy="38" r="3.5" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      <circle cx="58" cy="38" r="1" fill="#0b0f17" />
      {/* Knob 2 */}
      <circle cx="68" cy="38" r="3.5" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      <circle cx="68" cy="38" r="1" fill="#0b0f17" />
      {/* Port row */}
      <rect x="24" y="56" width="5" height="4" rx="0.5" fill="none" stroke="#0b0f17" strokeWidth="0.7" />
      <rect x="32" y="56" width="5" height="4" rx="0.5" fill="none" stroke="#0b0f17" strokeWidth="0.7" />
      {/* Base feet */}
      <rect x="24" y="72" width="10" height="3" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      <rect x="66" y="72" width="10" height="3" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      {/* Dimension line — horizontal */}
      <line x1="14" y1="50" x2="86" y2="50" stroke="#0284c7" strokeWidth="0.5" strokeDasharray="3,2" />
      <line x1="14" y1="48" x2="14" y2="52" stroke="#0284c7" strokeWidth="0.5" />
      <line x1="86" y1="48" x2="86" y2="52" stroke="#0284c7" strokeWidth="0.5" />
    </g>
  )
}

function ExtractionVessel() {
  return (
    <g>
      {/* Flask body */}
      <path d="M38,62 Q28,72 28,78 Q28,86 50,86 Q72,86 72,78 Q72,72 62,62 L62,28 L38,28 Z"
            fill="none" stroke="#0b0f17" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Flask neck */}
      <rect x="38" y="22" width="24" height="8" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      {/* Cap */}
      <rect x="36" y="18" width="28" height="6" rx="2" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      {/* Liquid level line */}
      <path d="M30,76 Q50,70 70,76" fill="none" stroke="#0284c7" strokeWidth="0.7" strokeDasharray="2,2" />
      {/* Bubbles */}
      <circle cx="44" cy="73" r="1.5" fill="none" stroke="#0284c7" strokeWidth="0.5" />
      <circle cx="52" cy="69" r="2" fill="none" stroke="#0284c7" strokeWidth="0.5" />
      <circle cx="59" cy="74" r="1" fill="none" stroke="#0284c7" strokeWidth="0.5" />
      {/* Dimension line — vertical */}
      <line x1="78" y1="18" x2="78" y2="86" stroke="#0284c7" strokeWidth="0.5" strokeDasharray="3,2" />
      <line x1="76" y1="18" x2="80" y2="18" stroke="#0284c7" strokeWidth="0.5" />
      <line x1="76" y1="86" x2="80" y2="86" stroke="#0284c7" strokeWidth="0.5" />
    </g>
  )
}

function Calorimeter() {
  return (
    <g>
      {/* Outer vessel */}
      <circle cx="50" cy="55" r="32" fill="none" stroke="#0b0f17" strokeWidth="1.2" />
      {/* Inner bomb */}
      <circle cx="50" cy="55" r="20" fill="none" stroke="#0b0f17" strokeWidth="0.9" />
      {/* Core sample chamber */}
      <circle cx="50" cy="55" r="9" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2,2" />
      {/* Center point */}
      <circle cx="50" cy="55" r="2" fill="#0b0f17" />
      {/* Temperature probe */}
      <line x1="50" y1="23" x2="50" y2="16" stroke="#0b0f17" strokeWidth="1" />
      <rect x="47" y="13" width="6" height="5" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      {/* Annotation ticks */}
      <line x1="18" y1="55" x2="22" y2="55" stroke="#0284c7" strokeWidth="0.5" />
      <line x1="78" y1="55" x2="82" y2="55" stroke="#0284c7" strokeWidth="0.5" />
      {/* Dimension arc (dashed) */}
      <path d="M 50 87 A 32 32 0 0 0 82 55" fill="none" stroke="#0284c7" strokeWidth="0.5" strokeDasharray="3,2" />
    </g>
  )
}

function AnalyzerSensor() {
  return (
    <g>
      {/* Main flat body */}
      <rect x="12" y="34" width="76" height="42" rx="3" fill="none" stroke="#0b0f17" strokeWidth="1.2" />
      {/* Screen / display area */}
      <rect x="16" y="38" width="40" height="24" rx="1.5" fill="none" stroke="#0284c7" strokeWidth="0.8" />
      {/* Screen scan lines */}
      <line x1="18" y1="44" x2="54" y2="44" stroke="#0284c7" strokeWidth="0.4" strokeDasharray="2,2" />
      <line x1="18" y1="50" x2="54" y2="50" stroke="#0284c7" strokeWidth="0.4" strokeDasharray="2,2" />
      <line x1="18" y1="56" x2="54" y2="56" stroke="#0284c7" strokeWidth="0.4" strokeDasharray="2,2" />
      {/* Sensor port right side */}
      <rect x="62" y="42" width="18" height="14" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.8" />
      <circle cx="71" cy="49" r="4" fill="none" stroke="#0b0f17" strokeWidth="0.7" />
      <circle cx="71" cy="49" r="1.5" fill="#0b0f17" />
      {/* Control buttons row */}
      <rect x="16" y="67" width="6" height="4" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.6" />
      <rect x="25" y="67" width="6" height="4" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.6" />
      <rect x="34" y="67" width="6" height="4" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.6" />
      {/* Connector port */}
      <rect x="70" y="67" width="10" height="4" rx="1" fill="none" stroke="#0b0f17" strokeWidth="0.6" />
      {/* Dimension line — horizontal */}
      <line x1="12" y1="82" x2="88" y2="82" stroke="#0284c7" strokeWidth="0.5" strokeDasharray="3,2" />
      <line x1="12" y1="80" x2="12" y2="84" stroke="#0284c7" strokeWidth="0.5" />
      <line x1="88" y1="80" x2="88" y2="84" stroke="#0284c7" strokeWidth="0.5" />
    </g>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function ProductImageFallback({ name, category, brand, className = '' }: FallbackProps) {
  const variant = getVariant(category)

  return (
    <div
      className={`relative flex flex-col justify-between bg-[#f0efe9] border border-[#c8c4bc] rounded select-none overflow-hidden ${className}`}
      role="img"
      aria-label={`Technical schematic for ${name}`}
    >
      {/* Header stamp */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0b0f17]">
          {brand || 'JAA-GEE SCIENTIFIC'}
        </span>
        <span className="text-[8px] font-mono text-[#6b7280] uppercase tracking-wider">
          TECHNICAL DRAWING
        </span>
      </div>

      {/* SVG Silhouette Canvas */}
      <div className="relative flex-1 flex items-center justify-center px-2 min-h-[80px]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {variant === 'benchtop-unit'    && <BenchtopUnit />}
          {variant === 'extraction-vessel' && <ExtractionVessel />}
          {variant === 'calorimeter'       && <Calorimeter />}
          {variant === 'analyzer-sensor'   && <AnalyzerSensor />}
        </svg>
      </div>

      {/* Footer stamp */}
      <div className="relative z-10 flex items-end justify-between px-4 pb-3 pt-1 border-t border-[#c8c4bc]">
        <div>
          <p className="text-[9px] font-mono text-[#0b0f17] font-semibold leading-tight line-clamp-1">
            {name}
          </p>
          <p className="text-[8px] font-mono text-[#6b7280] leading-tight">
            {category || 'Analytical Equipment'}
          </p>
        </div>
        <span className="text-[8px] font-mono text-[#0284c7] bg-white border border-[#c8c4bc] px-1.5 py-0.5 rounded shrink-0">
          rev.02
        </span>
      </div>
    </div>
  )
}
