import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JaaGee Scientific | Precision Analytical Instruments',
  description: 'JaaGee Scientific supplies, commissions and supports analytical equipment for laboratories across West Africa since 1987.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#080F17',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-[#FAF9F6]`}>
      <body className="antialiased font-sans text-[#0F172A] bg-[#FAF9F6] selection:bg-[#0284C7]/20 selection:text-[#0284C7]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

