import { Space_Grotesk, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GODS DeFi',
  description: 'Advanced DeFi Platform with MEV Protection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <div className="fixed inset-0 bg-gradient-radial from-gods-dark to-black -z-10" />
          <div className="fixed inset-0 bg-[url('/stars.png')] opacity-30 -z-10" />
          {children}
        </Providers>
      </body>
    </html>
  )
}
