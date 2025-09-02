import type { Metadata } from 'next/types'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Bloop Global Website',
  description: 'Your website partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
