// ===============================================================================
// JaaGee Scientific - Production Robots.txt Generator
// File: C:\xampp\htdocs\jaagee\app\robots.ts
// ===============================================================================

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaagee.org'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
