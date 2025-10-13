"use client"

import { branding } from '@/lib/branding'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Quote() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

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

  if (!mounted) {
    return null
  }

  return (
    <section className="w-full pb-24 px-4 bg-background">
      <motion.div
        className="mx-auto max-w-4xl rounded-[40px] border border-white/20 p-2 shadow-sm"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="relative mx-auto h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] max-w-full overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
          initial={{ opacity: 0, rotateX: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut", type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02, rotateY: 2, transition: { duration: 0.3 } }}
        >
          {/* Decorative glow - top left */}
          <motion.div
            className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          ></motion.div>
          {/* Hotelna patterns background for dark theme only */}
          {theme === 'dark' && (
            <div
              className="absolute inset-0 z-0 opacity-100"
              style={{
                backgroundImage: "url('/logo/bg-pattern-dark.svg')",
                backgroundSize: "700px auto",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
                transform: "",
                transformOrigin: "center",
              }}
            />
          )}

          {/* Glass effect overlay for light theme */}
          {theme === 'light' && (
            <>
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
                }}
              />
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.15), transparent 50%)',
                }}
              />
            </>
          )}

          {/* Subtle radial glow overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: theme === 'light'
                ? "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 255, 255, 0.22), transparent 10%)"
                : "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 64, 23, 0.1), transparent 70%)",
            }}
          />


          <div className="relative z-20 flex items-center justify-center h-full">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`${branding.typography.heading.h3} font-bold text-foreground mb-3 sm:mb-4 md:mb-5 leading-tight max-w-6xl mx-auto`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                My approach is grounded, strategic, and personalised — built on a proven track record of turning vision into measurable success. True Hospitality is not just about service, it&apos;s about creating moments that guests carry with them long after they&apos;ve checked out.
              </motion.h2>
              <motion.p
                className={`${branding.typography.body.base} text-foreground max-w-xl mx-auto`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              >
                - Solomon Khaddour, Founder & CEO of Hotelna
              </motion.p>
            </div>
                 {/* <a href="/docs/get-started">
                  <div className="group border-border bg-secondary/70 flex h-[64px] cursor-pointer items-center gap-2 rounded-full border p-[11px]">
                    <div className="border-border bg-primary flex h-[43px] items-center justify-center rounded-full border">
                      <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-globe animate-spin"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                          <path d="M2 12h20"></path>
                        </svg>
                        Get started
                      </p>
                    </div>
                    <div className="border-border flex size-[26px] items-center justify-center rounded-full border-2 transition-all ease-in-out group-hover:ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right transition-all ease-in-out group-hover:rotate-45"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a> */}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
