import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/privyProvider'

export const metadata: Metadata = {
  title: 'animagic.ai',
  description: 'Created with Love'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers></body>
    </html>
  )
}
