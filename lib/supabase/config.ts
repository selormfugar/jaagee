// ===============================================================================
// JaaGee Scientific - Supabase Configuration & Mode Detector
// File: C:\xampp\htdocs\jaagee\lib\supabase\config.ts
// ===============================================================================

export interface SupabaseEnv {
  url: string | undefined
  anonKey: string | undefined
  serviceRoleKey: string | undefined
  isProduction: boolean
  hasCredentials: boolean
}

export function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const isProduction = process.env.NODE_ENV === 'production'
  const isStrictMode = process.env.SUPABASE_STRICT_MODE === 'true'
  const hasCredentials = Boolean(url && anonKey)

  // Enforce strict failure when explicit production strict mode is configured
  if (isProduction && isStrictMode && !hasCredentials) {
    throw new Error(
      'CRITICAL PRODUCTION ERROR: Missing Supabase credentials (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY). ' +
      'Production strict mode requires a configured Supabase environment.'
    )
  }

  return {
    url,
    anonKey,
    serviceRoleKey,
    isProduction,
    hasCredentials
  }
}
