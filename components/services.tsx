// Updated to sync dependencies - v1.0.3 - Unified branding system
"use client"

import { branding } from '@/lib/branding'
import { useEffect, useState } from 'react'

export default function Services() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark"
      setTheme(currentTheme)
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark"
      setTheme(currentTheme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const textColorClass = theme === "light" ? "text-slate-200" : "text-slate-200"

  return (
    <section id="services" className={`${branding.components.section} bg-background`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className={branding.spacing.container}>
        {/* Section Badge */}
        <div className="text-center mb-6">
          <span className={branding.components.badge}>
            SOLOMON KHADDOUR
          </span>
        </div>

        {/* Section Title */}
        <h2 className={`${branding.typography.heading.h1} font-bold text-center mb-6 tracking-tight text-foreground`}>
          <span className="text-primary">Hospitality</span> Consultant
        </h2>

        <div className="max-w-5xl mx-auto mb-16 space-y-6">
          <p className={`${branding.text.body('xl')} ${textColorClass}`}>
            With over two decades of leadership in the luxury hospitality sector, I am proud to launch my bespoke hospitality Hub consultancy, offering expert guidance to hoteliers, developers, investors, and operators across the UK and the World.
          </p>

          <p className={`${branding.text.body('lg')} ${textColorClass}`}>
            My career has been built within some of the capital&rsquo;s most prestigious five-star properties, including The Capital Hotel in Knightsbridge and the award-winning 11 Cadogan Gardens in Chelsea. I bring first-hand experience in operational transformation, strategic repositioning, revenue growth, and Michelin-level F&B development.
          </p>

          <p className={`${branding.text.body('lg')} ${textColorClass}`}>
            Swiss-educated at the renowned Les Roches Marbella, I combine a deep understanding of international hospitality standards with a distinctly London-centric commercial acumen. From overseeing major refurbishments and openings to securing top industry accolades and driving profitability, I offer tailored solutions that balance guest experience with bottom-line results.
          </p>

          <p className={`${branding.text.body('lg')} ${textColorClass}`}>
            Whether supporting independent boutique hotels or luxury branded properties, my consultancy focuses on:
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 max-w-6xl mx-auto">
          {/* Operational Audits */}
          <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-7 h-7 text-primary relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
            </div>

            <h3 className={`${branding.typography.heading.h4} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}>
              Operational Audits & Efficiency Improvements
            </h3>
            <p className={branding.text.muted()}>
              Comprehensive analysis of your operations to identify optimization opportunities and enhance service delivery.
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* F&B Strategy */}
          <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-7 h-7 text-primary relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                </svg>
              </div>
            </div>

            <h3 className={`${branding.typography.heading.h4} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}>
              F&B Strategy & Concept Development
            </h3>
            <p className={branding.text.muted()}>
              Creating exceptional dining experiences from Michelin-level concepts to profitable operations.
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Brand Positioning */}
          <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-7 h-7 text-primary relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
            </div>

            <h3 className={`${branding.typography.heading.h4} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}>
              Brand Positioning & Market Competitiveness
            </h3>
            <p className={branding.text.muted()}>
              Strategic positioning to differentiate your property in the luxury hospitality market.
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Pre-Opening Planning */}
          <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-7 h-7 text-primary relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
            </div>

            <h3 className={`${branding.typography.heading.h4} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}>
              Pre-Opening Planning & Team Development
            </h3>
            <p className={branding.text.muted()}>
              Expert guidance from concept to launch, building high-performing teams for success.
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Revenue Management */}
          <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-7 h-7 text-primary relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
            </div>

            <h3 className={`${branding.typography.heading.h4} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}>
              Revenue Management & Profitability Optimisation
            </h3>
            <p className={branding.text.muted()}>
              Data-driven strategies to maximize revenue while maintaining exceptional guest satisfaction.
            </p>

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="flex justify-center mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <a
              href="#contact"
              className="relative inline-flex items-center px-8 py-4 text-base font-semibold text-background bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200 group-hover:scale-105"
            >
              Get Started
              <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div> */}

        {/* Decorative Element */}
        <div className="text-center">
          <div className="inline-block w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </section>
  )
}

