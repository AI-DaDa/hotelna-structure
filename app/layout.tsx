import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"

import "./globals.css"
import "./swiper-custom.css"
import "../public/font/style.css"

export const metadata: Metadata = {
  title: "Hotelna - Hospitality Consultancy",
  description: "Hotelna - Hospitality Consultancy by Solomon Khaddour. A boutique Consultancy specializing in elevating hospitality experiences through innovative solutions and expert guidance.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: 'Dubai', sans-serif;
  --font-sans: 'Dubai', sans-serif;
  --font-heading: 'Dubai', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
        `}</style>
      </head>
      <body className="dark">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
