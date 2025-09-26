import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Contact() {
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [currentTime, setCurrentTime] = useState({
    newYork: new Date(),
    london: new Date(),
    dubai: new Date(),
    tokyo: new Date()
  })

  useEffect(() => {
    setMounted(true)

    // Setup ScrollTrigger for contact section
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => setShowContent(true),
        onEnterBack: () => setShowContent(true),
      })
    }, sectionRef)

    const updateTime = () => {
      const now = new Date()
      setCurrentTime({
        newYork: new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"})),
        london: new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"})),
        dubai: new Date(now.toLocaleString("en-US", {timeZone: "Asia/Dubai"})),
        tokyo: new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}))
      })
    }

    // Update time immediately
    updateTime()

    // Then update every second
    const timer = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timer)
      ctx.revert()
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden pb-120 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
              <div className="inline-block">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white leading-tight"
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Contact
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-[#d5b15f] mx-auto rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                ></motion.div>
              </div>
              <motion.p
                className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mt-6 sm:mt-8 leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                Have questions or need assistance? We&apos;re here to help.
              </motion.p>
        </motion.div>

        {/* Main Content - Flex Layout */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {/* Left Container - Contact Details & World Clocks */}
          <div className="lg:w-1/2 space-y-8">
            {/* Contact Information */}


              {/* World Clocks */}
              <motion.div
                className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                initial={{ opacity: 0, x: -100, rotateY: -15, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, rotateY: 2, transition: { duration: 0.3 } }}
              >
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#d5b15f]/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Working Hours
              </motion.h3>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">New York</h4>
                    <span className="text-xs text-white/60">EST</span>
                  </div>
                  <p className="text-[#d5b15f] font-mono text-lg">{mounted ? formatTime(currentTime.newYork) : '--:--:-- --'}</p>
                  <p className="text-white/60 text-sm mt-1">9:00 AM - 6:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">London</h4>
                      <span className="text-xs text-white/60">GMT</span>
                    </div>
                    <p className="text-[#d5b15f] font-mono text-lg">{mounted ? formatTime(currentTime.london) : '--:--:-- --'}</p>
                    <p className="text-white/60 text-sm mt-1">9:00 AM - 5:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">Dubai</h4>
                      <span className="text-xs text-white/60">GST</span>
                    </div>
                    <p className="text-[#d5b15f] font-mono text-lg">{mounted ? formatTime(currentTime.dubai) : '--:--:-- --'}</p>
                    <p className="text-white/60 text-sm mt-1">8:00 AM - 4:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">Tokyo</h4>
                      <span className="text-xs text-white/60">JST</span>
                    </div>
                    <p className="text-[#d5b15f] font-mono text-lg">{mounted ? formatTime(currentTime.tokyo) : '--:--:-- --'}</p>
                    <p className="text-white/60 text-sm mt-1">9:00 AM - 6:00 PM</p>
                  </motion.div>
                </motion.div>
            </motion.div>

              {/* Contact Information */}
              <motion.div
                className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                initial={{ opacity: 0, x: -100, rotateY: -15, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, rotateY: 2, transition: { duration: 0.3 } }}
              >
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#d5b15f]/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Get in Touch
              </motion.h3>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-5 h-5 bg-[#d5b15f] rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-white/80 text-sm">Email</p>
                    <p className="text-white font-medium">hello@hotelna.com</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-5 h-5 bg-[#d5b15f] rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.5, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-white/80 text-sm">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-5 h-5 bg-[#d5b15f] rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.6, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-white/80 text-sm">Address</p>
                    <p className="text-white font-medium">123 Hotel Street, City, Country</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

            {/* Right Container - Contact Form */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 100, rotateY: 15, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut", type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] h-full"
                whileHover={{ scale: 1.02, rotateY: -2, transition: { duration: 0.3 } }}
              >
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#d5b15f]/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                Send us a Message
              </motion.h3>
              <motion.form
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d5b15f] focus:border-transparent transition-all duration-200"
                    placeholder="Your Name"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d5b15f] focus:border-transparent transition-all duration-200"
                    placeholder="Your Email"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d5b15f] focus:border-transparent transition-all duration-200"
                    placeholder="Message Subject"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d5b15f] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Your Message"
                    rows={6}
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#d5b15f] text-black font-semibold rounded-xl shadow-md hover:bg-[#c4a24f] transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#c4a24f" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
