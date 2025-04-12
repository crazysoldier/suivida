import type React from "react"
import "./globals.css"
import { Cormorant_Garamond, Cormorant } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
})

const cormorantDisplay = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant-display",
})

export const metadata = {
  title: "Suivida",
  description: "Where life quietly continues",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cormorantDisplay.variable} font-serif`}>{children}</body>
    </html>
  )
}


import './globals.css'