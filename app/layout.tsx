import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '600', '700', '800'], display: 'swap' })
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['300', '400', '500'], display: 'swap' })

export const metadata: Metadata = { title: 'FORMA — Digital Experience Studio', description: 'We give shape to ideas that have never existed before.' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${syne.variable} ${dm.variable}`}><body><CustomCursor /><SmoothScroll>{children}</SmoothScroll></body></html>
}
