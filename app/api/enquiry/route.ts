// ===============================================================================
// JaaGee Scientific - Public Enquiry Endpoint (/api/enquiry)
// File: C:\xampp\htdocs\jaagee\app\api\enquiry\route.ts
// ===============================================================================
// Handles validated public enquiry submissions and persists to Supabase.
// Zero service-role key exposure; adheres to INSERT-only public RLS permissions.
// ===============================================================================

import { NextResponse } from 'next/server'
import { EnquirySchema } from '@/lib/validation/enquiry'
import { createEnquiry } from '@/lib/db/enquiry-repository'

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON request payload.' },
        { status: 400 }
      )
    }

    // 1. Zod Validation (trims inputs, enforces required fields and bounds)
    const result = EnquirySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: 'Please correct the errors in the form.',
        },
        { status: 400 }
      )
    }

    const data = result.data

    // 2. Honeypot check (silently drop spam bots)
    if (data.website_hp && data.website_hp.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Enquiry received.' },
        { status: 200 }
      )
    }

    // 3. Extract request telemetry (IP and User-Agent)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')

    // 4. Persist to Supabase via repository
    const insertResult = await createEnquiry(data, {
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (!insertResult.ok) {
      return NextResponse.json(
        { success: false, message: insertResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your enquiry has been received by JaaGee Scientific.',
    })
  } catch (error) {
    console.error('Enquiry API Error:', error)
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Public users must not be able to read existing enquiries
  return NextResponse.json(
    { message: 'Method Not Allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  )
}
