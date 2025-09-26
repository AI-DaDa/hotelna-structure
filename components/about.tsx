'use client'

import { useRef, useEffect } from "react"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);



export function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentParagraph = paragraphRef.current
    const currentSection = sectionRef.current

    if (currentParagraph && currentSection) {
      // Split the text into characters
      const splitText = new SplitText(currentParagraph, {
        type: "lines, words, chars"
      })

      // Set initial state - all characters dim
      gsap.set(splitText.chars, {
        color: "rgba(20, 20, 20, 0.3)"
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
      tl.to(splitText.chars, {
        color: "rgba(255, 255, 255, 1)",
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center  py-24"
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
              color: 'rgba(255, 255, 255, 1)',
              fontFamily: 'Roboto Flex',
              fontWeight: 'bold',
              fontStyle: 'normal',
              textDecoration: 'none',
              lineHeight: '1',
              padding: '0',
              borderRadius: '0',
            }}
          >
            <div className="paneflow-text-content">
              Our Story
            </div>
          </div>
        </div>

        <p
          ref={paragraphRef}
          className="w-full mx-auto px-4"
          style={{
            fontSize: 'clamp(1rem, 3vw, 2.5rem)',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Roboto Flex',
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
The Story Behind Hotelna

The idea for Hotelna was born out of a very real — and very disappointing — travel experience. My wife Louise, our two children Olivia and William, and I were on a European road trip and like so many travellers, we booked our overnight stays based on glossy photos and glowing reviews on popular booking platforms.

The reality? Shockingly different.

We arrived to find dirty toilets, shabby furniture, and locations that felt far less appealing (and far less safe) than promised. The charm portrayed online was nowhere to be found — replaced instead by a sense of frustration and wasted money.

That&apos;s when I knew something had to change.

At Hotelna, we feature hotels that have been personally visited and honestly reviewed by hospitality professionals — not anonymous users or marketing teams. Each property is assessed for cleanliness, comfort, service quality, and location authenticity. The goal is simple: to give travellers the truth before they book, so that expectations match reality.

Because in travel — and in life — there&apos;s nothing more valuable than trust.
        </p>
      </div>
    </section>
  )
}
