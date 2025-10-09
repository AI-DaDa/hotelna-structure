
"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { branding } from "@/lib/branding"

// Utility function to wrap values
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

// Hotel industry partners and luxury brands
const partnerLogos1 = [
  { id: 1, name: "Marriott", logo: "M" },
  { id: 2, name: "Hilton", logo: "H" },
  { id: 3, name: "Hyatt", logo: "HY" },
  { id: 4, name: "Ritz Carlton", logo: "RC" },
  { id: 5, name: "Four Seasons", logo: "4S" },
]

const partnerLogos2 = [
  { id: 6, name: "InterContinental", logo: "IC" },
  { id: 7, name: "St. Regis", logo: "SR" },
  { id: 8, name: "W Hotels", logo: "W" },
  { id: 9, name: "Edition", logo: "ED" },
  { id: 10, name: "Luxury Collection", logo: "LC" },
]

interface ParallaxLogosProps {
  logos: Array<{ id: number; name: string; logo: string }>
  baseVelocity?: number
}

const ParallaxLogos: React.FC<ParallaxLogosProps> = ({
  logos,
  baseVelocity = 100
}) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`)
  const directionFactor = useRef<number>(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        style={{ x }}
      >
        {[...Array(4)].flatMap((_, i) =>
          logos.map((partner, index) => (
            <motion.div
              key={`${i}-${index}`}
              className="flex-shrink-0 group"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Luxury brand logo placeholder */}
                <div className="w-32 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-all duration-300">
                  <span className="text-primary font-bold text-xl group-hover:text-white transition-colors duration-300">
                    {partner.logo}
                  </span>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}

export function LogoCarousel() {

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* FAQ-Style Title */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <div className="inline-block">
          <h2 className={`${branding.typography.display.lg} font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent leading-tight`}>
            Our Trusted Partners
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <p className={`${branding.text.body('xl')} text-foreground/60 max-w-3xl mx-auto mt-6 sm:mt-8 leading-relaxed px-4 sm:px-0`}>
          Collaborating with luxury hospitality leaders and premium brands worldwide to deliver exceptional experiences.
        </p>
      </div>

      {/* Parallax Logo Animation */}
      <div className="relative">
        {/* First row - moving right */}
        <ParallaxLogos baseVelocity={2.5} logos={partnerLogos1} />

        {/* Second row - moving left */}
        <ParallaxLogos baseVelocity={-2.5} logos={partnerLogos2} />
      </div>

      {/* Professional note */}
      <div className="text-center mt-12 sm:mt-16">
        <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Logo</span>
          </div>
          <div className="text-left">
            <p className="text-base sm:text-lg font-semibold text-foreground">Luxury Network</p>
            <p className="text-xs sm:text-sm text-foreground/60">Connected to the world&apos;s finest hospitality brands</p>
          </div>
        </div>
      </div>
    </section>
  )
}
