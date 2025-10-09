"use client"
import { useState } from "react"
import Hero from "@/components/home/hero"
import { Navbar } from "@/components/navbar"

import { TestimonialsSection } from "@/components/testimonials"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { StickyFooter } from "@/components/sticky-footer"
import { LogoCarousel } from "@/components/logo-carsoule"
import { Quote } from "@/components/quote"
import { Collections } from "@/components/collection"
import Services from "@/components/services"

import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Use GSAP ScrollTrigger with proper scroller for ScrollSmoother
  useGSAP(() => {
    // Wait for ScrollSmoother to be ready
    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const shouldBeScrolled = scrollY > 50

      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled)
      }
    }

    // Create ScrollTrigger that works with ScrollSmoother
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrollDistance = self.scroll()
        const shouldBeScrolled = scrollDistance > 50
        setIsScrolled(shouldBeScrolled)
      },
    })

    // Also add a backup native scroll listener in case ScrollSmoother isn't active
    window.addEventListener('scroll', checkScroll)

    // Check immediately
    checkScroll()

    return () => {
      trigger.kill()
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <>
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="fixed inset-0 z-0 dark:opacity-100 opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />
      <div
        className="fixed inset-0 z-0 light:opacity-100 dark:opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(47, 71, 99, 0.08), transparent 60%), #FFFFFF",
        }}
      />

      {/* Navbar Component */}
      <Navbar isScrolled={isScrolled} />

      {/* Hero Section */}
      <div id="Home" className="relative z-10 bg-background">
        <Hero />
      </div>

      {/* About/Collection Section */}
      <div id="about">
        <About />
      </div>

      <div id="collection">
        <Collections />
      </div>

      {/* Testimonials Section */}
      <div id="reviews">
        <TestimonialsSection />
      </div>

      {/* Services Section */}
      <div id="services">
        <Services />
      </div>

      <div id="quote">
        <Quote />
      </div>

      <div id="partners">
        <LogoCarousel />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </>
  )
}
