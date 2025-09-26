"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Temporarily disable ScrollSmoother to fix sticky navbar issues
  // useEffect(() => {
  //   let smoother: ScrollSmoother

  //   // Initialize smooth scrolling with settings that preserve sticky elements
  //   const initSmoothScroll = () => {
  //     smoother = ScrollSmoother.create({
  //       wrapper: "#smooth-wrapper",
  //       content: "#smooth-content",
  //       smooth: 1.5,
  //       effects: true,
  //       smoothTouch: 0.1,
  //       // Preserve sticky elements by not transforming them
  //       ignoreMobileResize: true,
  //       normalizeScroll: false,
  //     })
  //   }

  //   // Wait for DOM to be ready
  //   const timer = setTimeout(initSmoothScroll, 100)

  //   return () => {
  //     clearTimeout(timer)
  //     if (smoother) {
  //       smoother.kill()
  //     }
  //   }
  // }, [])

  // Return children without wrapper divs to avoid conflicts
  return <>{children}</>
}

export function useScrollToSection() {
  const scrollToSection = (sectionId: string, offset: number = 80) => {
    const section = document.getElementById(sectionId)
    if (section) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: section,
          offsetY: offset
        },
        ease: "power2.inOut"
      })
    }
  }

  return scrollToSection
}
