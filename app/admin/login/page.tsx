// ===============================================================================
// JaaGee Scientific - Admin Login Page (/admin/login)
// File: C:\xampp\htdocs\jaagee\app\admin\login\page.tsx
// ===============================================================================
// Public page — no auth required, no admin layout wrapper.
// Uses a Server Action to call signInWithPassword(); no client-side JS auth.
// Public signup is intentionally disabled.
// ===============================================================================

import React from 'react'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Admin Login | JaaGee Scientific',
  description: 'Restricted administrative access.',
  robots: 'noindex, nofollow',
}

// ── Server Action ─────────────────────────────────────────────────────────────
async function signIn(formData: FormData) {
  'use server'

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/admin/login?error=missing_fields')
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/admin/login?error=invalid_credentials')
  }

  // signInWithPassword succeeded — middleware will verify admin role on next request
  redirect('/admin/dashboard')
}

// ── Error message map ─────────────────────────────────────────────────────────
function errorMessage(code: string | null): string | null {
  if (!code) return null
  const map: Record<string, string> = {
    invalid_credentials: 'Invalid email or password.',
    unauthorized: 'Your account does not have administrator access.',
    missing_fields: 'Email and password are required.',
  }
  return map[code] ?? 'An error occurred. Please try again.'
}

// ── Page Component ────────────────────────────────────────────────────────────
interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams
  const errMsg = errorMessage(params.error ?? null)

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold font-mono text-white tracking-tight">
            JAAGEE<span className="text-[#0EA5E9]">.</span>
          </span>
          <p className="mt-1 text-xs font-mono text-[#64748B] uppercase tracking-widest">
            CMS Admin Access
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 shadow-2xl">
          <h1 className="text-sm font-semibold text-[#E2E8F0] mb-5">
            Sign in to continue
          </h1>

          {/* Error banner */}
          {errMsg && (
            <div className="mb-4 px-3 py-2.5 bg-[#7F1D1D]/40 border border-[#EF4444]/40 rounded text-[#FCA5A5] text-xs font-mono">
              {errMsg}
            </div>
          )}

          <form action={signIn} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-[#0F172A] border border-[#334155] rounded px-3 py-2 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/30 transition font-mono"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-[#0F172A] border border-[#334155] rounded px-3 py-2 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/30 transition font-mono"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-mono font-semibold py-2.5 rounded transition-colors mt-1"
            >
              Sign In →
            </button>
          </form>
        </div>

        {/* Robots notice — no signup link intentionally */}
        <p className="mt-4 text-center text-[10px] text-[#334155] font-mono">
          Restricted access. Authorised personnel only.
        </p>
      </div>
    </div>
  )
}
