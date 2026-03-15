import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { AnalyticsDeferred } from '@/components/analytics'
import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const _oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' })

export const metadata: Metadata = {
  title: 'W-BIKE SERVICE | Especialista em MTB, Suspensões e Manutenção',
  description:
    'Oficina especializada em mountain bike, revisão de suspensões, manutenção geral e preparação de bikes para trilha. Atendimento profissional e peças de qualidade.',
}

export const viewport: Viewport = {
  themeColor: '#050507',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_inter.variable} ${_oswald.variable} font-sans antialiased`}>
        {children}
        <AnalyticsDeferred />
      </body>
    </html>
  )
}
