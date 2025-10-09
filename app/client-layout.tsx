"use client"

import { useState } from "react"
import Loading from "./loading"
import CustomCursor from "./_components/custom-cursor"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    // Start fade out of loading screen
    setIsLoading(false)
    // Show content after a brief delay for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  // ScrollSmoother removed - using native scroll for better sticky navbar support

  return (
    <>
      {/* Custom Cursor - Available on all pages */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && (
        <div
          className={`fixed inset-0 z-[10000] transition-opacity duration-500 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <Loading onComplete={handleLoadingComplete} />
        </div>
      )}

      {/* Main Content - No wrapper here, it's in page.tsx */}
      <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  )
}
