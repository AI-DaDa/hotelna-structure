"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/dist/ScrollSmoother"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Loading from "./loading"
import CustomCursor from "./_components/custom-cursor"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const pathname = usePathname()

  const handleLoadingComplete = () => {
    // Start fade out of loading screen
    setIsLoading(false)
    // Show content after a brief delay for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  useGSAP(
    () => {
      if (showContent) {
        ScrollSmoother.create({
          smooth: 2,
          effects: true,
        })
      }
    },
    {
      dependencies: [pathname, showContent],
      revertOnUpdate: true,
    }
  )

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

      {/* Main Content with ScrollSmoother */}
      <div id="smooth-wrapper">
        <div
          id="smooth-content"
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  )
}
