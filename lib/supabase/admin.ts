// ===============================================================================
// JaaGee Scientific - Supabase Admin Client (Service Role)
// File: C:\xampp\htdocs\jaagee\lib\supabase\admin.ts
// ===============================================================================
// Creates a Supabase client authenticated with the service role key.
// The service role key bypasses Row Level Security and is used ONLY for
// server-side storage operations (uploading and deleting files from
// Supabase Storage).
//
// CRITICAL SECURITY RULES:
//   - NEVER import this file from a Client Component or browser-side code.
//   - NEVER expose SUPABASE_SERVICE_ROLE_KEY to the client bundle.
//   - ONLY call this from Server Actions or Route Handlers.
//
// Required environment variable:
//   SUPABASE_SERVICE_ROLE_KEY  — found in Supabase Dashboard →
//                                Project Settings → API → service_role key
// ===============================================================================

import { createClient } from '@supabase/supabase-js'

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is not configured. Check .env.local.'
    )
  }

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not configured. ' +
      'Set it in .env.local — find it in Supabase Dashboard → ' +
      'Project Settings → API → service_role key. ' +
      'This key is required for server-side image storage operations.'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      // Service-role client must never persist a user session
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
