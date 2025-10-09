"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { branding } from "@/lib/branding"
import { useTheme } from "next-themes"

export function StickyFooter() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
        setMounted(true)

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Listen for theme changes on the document element
  useEffect(() => {
    if (!mounted) return

    const observer = new MutationObserver(() => {
      // Force re-render when class changes
      setMounted(prev => prev)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [mounted])

  // Use resolvedTheme for more reliable theme detection
  // If theme is undefined, check document class or default to 'dark'
  const currentTheme = mounted
    ? (resolvedTheme || theme || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'))
    : 'dark'

  const patternImage = currentTheme === 'dark'
    ? '/logo/Logo-B.svg'
    : '/logo/Logo-W.svg'

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-80 flex justify-center items-center bg-primary"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12">
            <motion.div
              className={`flex flex-row space-x-12 sm:space-x-16 md:space-x-24 ${branding.text.body('lg')} text-primary-foreground`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ul className="space-y-2">
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Home
                </li>
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Our Story
                </li>
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Services
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Facebook
                </li>
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Instagram
                </li>
                <li className="hover:opacity-80 cursor-pointer transition-opacity">
                  Twitter
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-20 translate-y-1/3 select-none"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={patternImage}
                alt="Hotelna Logo"
                className="sm:w-[600px] sm:h-[192px] w-[250px] h-[80px] object-contain"
                key={currentTheme}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
