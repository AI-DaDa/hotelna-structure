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
      gsap.set(splitText.words, {
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
      tl.to(splitText.words, {
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
              fontFamily: 'Dubai',
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



Hotelna is a bespoke hub created for hoteliers, investors, and guests within the world of luxury hospitality. Founded by Solomon Khaddour, and built on over two decades of leadership in London’s most prestigious five-star hotels, Hotelna brings together consultancy expertise with an innovative guest review and booking platform.



At its core, Hotelna is about trust, credibility, and excellence. Hotels benefit from tailored strategic support, while guests enjoy verified reviews and the ability to book directly with some of the world’s finest properties. Unlike open platforms, only genuine hotel guests can share their experience — ensuring reviews are seamless, authentic, and reliable.



Hotelna is where hoteliers, operators, and travellers connect to shape the future of true luxury hospitality.
        </p>
      </div>
    </section>
  )
}
