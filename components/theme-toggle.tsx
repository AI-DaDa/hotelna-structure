"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Get initial theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const root = document.documentElement

    if (savedTheme) {
      setTheme(savedTheme)
      root.classList.remove("light", "dark")
      root.classList.add(savedTheme)
    } else {
      // Default to dark theme
      setTheme("dark")
      root.classList.remove("light")
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(newTheme)
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-primary/30 transition-all duration-300 hover:bg-primary/20 hover:border-primary/60"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleTheme()
      }}
      className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-primary/30 transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:scale-110 active:scale-95 cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-primary transition-transform duration-300 rotate-0 hover:rotate-180 pointer-events-none" />
      ) : (
        <Moon className="w-5 h-5 text-primary transition-transform duration-300 rotate-0 hover:-rotate-12 pointer-events-none" />
      )}
    </button>
  )
}
