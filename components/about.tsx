'use client'

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { branding } from "@/lib/branding";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);



export function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (!mounted) return

    const currentParagraph = paragraphRef.current
    const currentSection = sectionRef.current

    if (currentParagraph && currentSection) {
      // Split the text into characters
      const splitText = new SplitText(currentParagraph, {
        type: "lines, words, chars"
      })

      // Theme-responsive colors
      const isDark = theme === 'dark'
      const dimColor = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
      const brightColor = isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"

      // Set initial state - all characters dim
      gsap.set(splitText.words, {
        color: dimColor
      })

      // Create timeline optimized for smooth scrolling with stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentSection,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.1,
          markers: false,
          refreshPriority: -1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      })

      // Add stagger animation to timeline
      tl.to(splitText.words, {
        color: brightColor,
        stagger: {
          each: 0.01,
          ease: "power2.out"
        },
        ease: "none",
        duration: 1
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === currentSection) {
          trigger.kill()
        }
      })
    }
  }, [mounted, theme])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center py-24"
    >
      <div className="max-w-full mx-auto text-center w-full">
        <div
          className="paneflow-text paneflow-item-about-title mb-12"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="paneflow-text-container"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              textAlign: 'center',
              fontFamily: 'Dubai',
              fontWeight: 'bold',
              fontStyle: 'normal',
              textDecoration: 'none',
              lineHeight: '1',
              padding: '0',
              borderRadius: '0',
            }}
          >
            <div className={`paneflow-text-content text-foreground ${branding.typography.display.xl}`}>
              Our Story
            </div>
          </div>
        </div>

        <p
          ref={paragraphRef}
          className="w-full mx-auto px-4 text-foreground"
          style={{
            fontSize: 'clamp(1rem, 3vw, 2.5rem)',
            textAlign: 'center',
            fontFamily: 'Dubai',
            fontWeight: 'bold',
            fontStyle: 'normal',
            textDecoration: 'none',
            lineHeight: '1.4',
            padding: '0',
            borderRadius: '0',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
Hotelna – A Hub for Hospitality



Hotelna is a bespoke hub created for hoteliers, investors, and guests within the world of luxury hospitality. Founded by Solomon Khaddour, and built on over two decades of leadership in London&apos;s most prestigious five-star hotels, Hotelna brings together consultancy expertise with an innovative guest review and booking platform.



At its core, Hotelna is about trust, credibility, and excellence. Hotels benefit from tailored strategic support, while guests enjoy verified reviews and the ability to book directly with some of the world&apos;s finest properties. Unlike open platforms, only genuine hotel guests can share their experience — ensuring reviews are seamless, authentic, and reliable.



Hotelna is where hoteliers, operators, and travellers connect to shape the future of true luxury hospitality.
        </p>
      </div>
    </section>
  )
}
