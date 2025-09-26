import type React from "react"
import type { Metadata } from "next"
import { Roboto_Flex } from "next/font/google"
import { Roboto_Mono } from "next/font/google"
import ClientLayout from "./client-layout"

import "./globals.css"
import "./swiper-custom.css"

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
  font-family: ${robotoFlex.style.fontFamily};
  --font-sans: ${robotoFlex.variable};
  --font-mono: ${robotoMono.variable};
}
        `}</style>
      </head>
      <body className={`dark ${robotoFlex.variable} ${robotoMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
