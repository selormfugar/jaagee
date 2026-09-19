// ===============================================================================
// JaaGee Scientific - Supabase Server Client (SSR / Cookie-based)
// File: C:\xampp\htdocs\jaagee\lib\supabase\server.ts
// ===============================================================================
// Uses @supabase/ssr to create a Supabase client that reads and writes session
// cookies via the Next.js cookies() API.  Call this ONLY inside:
//   - Server Components
//   - Server Actions
//   - Route Handlers
// Never import in Client Components or browser-side code.
// ===============================================================================

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll called from a Server Component where cookies are read-only.
            // The middleware handles session refresh so this is safe to ignore.
          }
        },
      },
    }
  )
}
