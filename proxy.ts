// ===============================================================================
// JaaGee Scientific - Next.js 16 Proxy (Admin Auth Gate)
// File: C:\xampp\htdocs\jaagee\proxy.ts
// ===============================================================================
// Runs before every matched request.  Responsibilities:
//   1. Refresh the Supabase session cookie so it stays valid.
//   2. Redirect unauthenticated users to /admin/login.
//   3. Redirect authenticated non-admin users to /admin/login?error=unauthorized.
// Authorization is enforced HERE, not only in UI components.
// Note: In Next.js 16, proxy.ts replaces middleware.ts. The exported function
// must be named `proxy` (or the default export).
// ===============================================================================

import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // Pass the login page through unconditionally — never intercept it,
  // otherwise a redirect loop occurs for unauthenticated users.
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  // Build a Supabase client that can refresh session cookies in the response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT add any logic between createServerClient and
  // getUser(). A missing await is the single most common source of
  // auth bugs with @supabase/ssr.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ── 1. Unauthenticated users ──────────────────────────────────────────────
  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.search = ''
    return NextResponse.redirect(loginUrl)
  }

  // ── 2. Authenticated — verify admin role via is_admin() RPC ───────────────
  // This calls the SECURITY DEFINER function defined in schema.sql.
  // The user's JWT is attached automatically by the session-aware client.
  const { data: isAdmin, error } = await supabase.rpc('is_admin', {
    user_id: user.id,
  })

  if (error || !isAdmin) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.search = '?error=unauthorized'
    return NextResponse.redirect(loginUrl)
  }

  // ── 3. Confirmed admin — pass through with refreshed cookies ─────────────
  return supabaseResponse
}

export const config = {
  // Match all /admin/* paths. The proxy function itself guards /admin/login
  // with an early return to avoid redirect loops.
  // Next.js route matchers do not support PCRE lookaheads.
  matcher: ['/admin/:path*'],
}
