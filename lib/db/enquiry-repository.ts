// ===============================================================================
// JaaGee Scientific - Public Enquiry Repository
// File: C:\xampp\htdocs\jaagee\lib\db\enquiry-repository.ts
// ===============================================================================
// Handles insertion of public contact enquiries into the Supabase database.
//
// Security & Architecture:
//   - Uses ONLY the public anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY).
//   - NEVER uses or references the service-role key.
//   - Executes .insert([...]) without chaining .select() because public users have
//     INSERT-only RLS permissions (PostgreSQL RETURNING requires SELECT permission).
//   - All database errors are logged server-side and mapped to user-safe messages.
// ===============================================================================

import { createClient } from '@supabase/supabase-js'
import type { EnquiryInput } from '@/lib/validation/enquiry'

export type CreateEnquiryMetadata = {
  ip_address?: string | null
  user_agent?: string | null
}

export type CreateEnquiryResult =
  | { ok: true }
  | { ok: false; error: string }

function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Missing Supabase public configuration (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY).')
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Inserts a validated public enquiry into the enquiries table.
 * Adheres strictly to the INSERT-only RLS policy (no SELECT / RETURNING).
 */
export async function createEnquiry(
  data: EnquiryInput,
  metadata?: CreateEnquiryMetadata
): Promise<CreateEnquiryResult> {
  try {
    const supabase = getPublicSupabaseClient()

    const { error } = await supabase.from('enquiries').insert([
      {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone ? data.phone : null,
        product_requirement: data.product_requirement,
        message: data.message,
        status: 'new',
        ip_address: metadata?.ip_address || null,
        user_agent: metadata?.user_agent || null,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Supabase enquiry insert failed:', error)
      return {
        ok: false,
        error: 'Unable to submit enquiry at this moment. Please try again later.',
      }
    }

    return { ok: true }
  } catch (err) {
    console.error('Unexpected error in createEnquiry:', err)
    return {
      ok: false,
      error: 'An unexpected error occurred while processing your request.',
    }
  }
}
