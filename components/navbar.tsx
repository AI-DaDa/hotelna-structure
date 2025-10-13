"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarProps {
  isScrolled: boolean
}

export function Navbar({ isScrolled }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
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

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 120 // Account for sticky header height + margin
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      scrollToSection(elementId)
    }, 100)
  }

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          backgroundColor: theme === "light" ? "rgba(47, 71, 99, 0.95)" : "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            className={`z-50 flex items-center justify-center gap-2 transition-all duration-300`}
            href="#"
            target="#"
            rel="noopener noreferrer"
          >
            <Image
              src={theme === "dark" ? "/logo/Dark-Icon.svg" : "/logo/Light-Icon.svg"}
              alt="Logo"
              width={32}
              height={32}
              className="text-foreground rounded-full size-8 w-8"
            />
            <Image
              src={theme === "dark" ? "/logo/Logo-W.svg" : "/logo/Logo-W.svg"}
              alt="Logo"
              width={128}
              height={32}
              className={`text-foreground h-8 z-200 transition-all duration-300 ${
                isScrolled ? "w-0 opacity-0" : "w-32 opacity-100"
              }`}
            />
          </a>
        </div>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("Home")
            }}
          >
            <span className="relative z-20">Home</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("collection")
            }}
          >
            <span className="relative z-20">Collection</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("reviews")
            }}
          >
            <span className="relative z-20">Hotel Reviews</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("services")
            }}
          >
            <span className="relative z-20">Consultancy</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
          >
            <span className="relative z-20">Contact us</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3"
        style={{
          backgroundColor: theme === "light" ? "rgba(47, 71, 99, 0.95)" : "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            className="flex items-center justify-center gap-2"
            href="#"
            target="#home"
            rel="noopener noreferrer"
          >
            <Image
              src={theme === "dark" ? "/logo/Dark-icon.svg" : "/logo/Light-icon.svg"}
              alt="Logo"
              width={32}
              height={32}
              className="text-foreground rounded-full size-8 w-8"
            />
            <Image
              src={theme === "dark" ? "/logo/Logo-W.svg" : "/logo/Logo-B.svg"}
              alt="Logo"
              width={128}
              height={32}
              className={`text-foreground h-8 z-200 transition-all duration-300 ${
                isScrolled ? "w-0 opacity-0" : "w-32 opacity-100"
              }`}
            />
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-background/50 backdrop-blur-sm md:hidden">
          <div
            className="absolute top-20 left-4 right-4 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6"
            style={{
              backgroundColor: theme === "light" ? "rgba(47, 71, 99, 0.98)" : "rgba(0, 0, 0, 0.95)",
            }}
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("collection")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Collection
              </button>
              <button
                onClick={() => handleMobileNavClick("")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Services
              </button>
              <button
                onClick={() => handleMobileNavClick("reviews")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
               Hotel Reviews
              </button>
              <button
                onClick={() => handleMobileNavClick("services")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Consultancy
              </button>
              <button
                onClick={() => handleMobileNavClick("contact")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Contact Hotelna
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
