// ===============================================================================
// JaaGee Scientific - Admin Protected Layout
// File: C:\xampp\htdocs\jaagee\app\admin\(protected)\layout.tsx
// ===============================================================================
// Wraps all pages under /admin/(protected)/*.
// Middleware has already confirmed the user is an authenticated admin before
// this layout renders.  We re-fetch the user here for display purposes only.
// Contains the logout Server Action.
// ===============================================================================

import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// ── Logout Server Action ──────────────────────────────────────────────────────
async function signOut() {
  'use server'
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Belt-and-braces guard: middleware should have already redirected,
  // but defend in case this layout is somehow reached without a session.
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* ── ADMIN HEADER ──────────────────────────────────────────────── */}
      <header className="bg-[#1E293B] border-b border-[#334155] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold font-mono text-white">
            JAAGEE<span className="text-[#0EA5E9]">.</span>
          </span>
          <span className="text-xs font-mono bg-[#0EA5E9]/20 text-[#38BDF8] px-2 py-0.5 rounded border border-[#0EA5E9]/30 uppercase">
            CMS Admin Control
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          {/* Authenticated user email */}
          <span className="text-[#94A3B8] font-mono hidden sm:block">
            {user.email}
          </span>

          <Link
            href="/"
            className="bg-[#334155] hover:bg-[#475569] text-white px-3 py-1.5 rounded transition text-xs"
          >
            View Public Site ↗
          </Link>

          {/* Logout — Server Action via form */}
          <form action={signOut}>
            <button
              type="submit"
              className="bg-[#7F1D1D]/60 hover:bg-[#991B1B]/80 border border-[#EF4444]/30 text-[#FCA5A5] px-3 py-1.5 rounded transition text-xs font-mono"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* ── PAGE CONTENT ──────────────────────────────────────────────── */}
      {children}
    </div>
  )
}
