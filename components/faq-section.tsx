"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus, Star, Users, Award, Calendar, MapPin, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const faqItemsRef = useRef<HTMLDivElement[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What makes Hotelna different from other luxury hotels?",
      answer:
        "Hotelna combines timeless elegance with modern sophistication. Our curated experiences, personalized service, and attention to detail create unforgettable moments. Each suite is uniquely designed, and our concierge team ensures every guest receives exceptional, tailored service that exceeds expectations.",
      icon: Star,
    },
    {
      question: "What amenities and services do you offer?",
      answer:
        "We offer world-class amenities including a full-service spa, fine dining restaurants, fitness center, rooftop infinity pool, business center, and 24/7 concierge service. Additional services include private airport transfers, bespoke tour arrangements, and exclusive event planning.",
      icon: Award,
    },
    {
      question: "How do I make a reservation?",
      answer:
        "Reservations can be made through our sophisticated booking system on our website, by calling our dedicated reservations team, or through your preferred luxury travel advisor. We recommend booking well in advance, especially during peak seasons, to ensure availability of your preferred suite type.",
      icon: Calendar,
    },
    {
      question: "Do you accommodate special dietary requirements?",
      answer:
        "Absolutely! Our award-winning executive chefs are masters in creating exceptional culinary experiences for various dietary needs including vegetarian, vegan, gluten-free, kosher, halal, and specific allergy requirements. Please inform us of any dietary restrictions when making your reservation.",
      icon: Users,
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We offer flexible cancellation policies designed with our guests' needs in mind. Standard reservations can be cancelled up to 48 hours before arrival without penalty. Premium suites and special packages may have different terms, which will be clearly outlined during the booking process.",
      icon: Phone,
    },
    {
      question: "Do you offer event and wedding services?",
      answer:
        "Yes, Hotelna is the perfect venue for intimate weddings, corporate retreats, and milestone celebrations. Our dedicated events team specializes in creating bespoke experiences, from venue selection and floral arrangements to gourmet catering and world-class entertainment.",
      icon: MapPin,
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // FAQ items staggered animation
      faqItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              delay: 0.15 * index,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      faqItemsRef.current[index] = el
    }
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="min-h-screen w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background"
      style={{
        containerType: 'size',
        containerName: 'faq-section',
        fontFamily: 'Dubai, sans-serif',
        fontSynthesis: 'none',
      }}
    >
      {/* Professional background elements */}


      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block">
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r text-white leading-tight"
              style={{
                fontFamily: 'Dubai, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(213, 177, 95, 0.3)',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto mt-6 sm:mt-8 leading-relaxed px-4 sm:px-0">
            Everything you need to know about your luxury experience at Hotelna.
            Our commitment to excellence extends to every detail of your stay.
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-5xl mx-auto" ref={containerRef}>
          <div className="grid gap-4 sm:gap-6">
          {faqs.map((faq, index) => {
            const IconComponent = faq.icon
            return (
              <motion.div
                key={index}
                ref={(el) => addToRefs(el, index)}
                className="group relative bg-gradient-to-br rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
                onClick={() => toggleItem(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleItem(index)
                  }
                }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 8px 40px rgba(213, 177, 95, 0.25)'
                }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-4 sm:gap-6">
                    <div className="flex items-start gap-5 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>

                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{
                        rotate: openItems.includes(index) ? 180 : 0,
                        scale: openItems.includes(index) ? 1.1 : 1,
                        backgroundColor: openItems.includes(index) ? 'rgba(213, 177, 95, 0.2)' : 'rgba(213, 177, 95, 0.1)'
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300"
                    >
                      {openItems.includes(index) ? (
                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      )}
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {openItems.includes(index) && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          opacity: { duration: 0.3 }
                        }}
                      >
                        <div className="pl-16 sm:pl-20 pr-4">
                          <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4 sm:mb-6"></div>
                          <p className="text-foreground/80 leading-relaxed text-base sm:text-lg font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
          </div>

          {/* Professional CTA Section */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-yellow-400/10 border border-primary/30 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-yellow-400 flex items-center justify-center">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-semibold text-foreground">Still have questions?</p>
                <p className="text-xs sm:text-sm text-foreground/60">Our concierge team is available 24/7 to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
