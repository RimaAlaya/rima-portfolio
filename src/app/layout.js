import { Inter } from 'next/font/google'
import './globals.css' // <-- THIS IS THE CRITICAL LINE THAT WAS MISSING

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rima Alaya - AI Engineer Portfolio',
  description: 'AI Engineer | MLOps Enthusiast | Problem Solver',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}