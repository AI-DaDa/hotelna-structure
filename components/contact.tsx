import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { branding } from "@/lib/branding"

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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Anti-spam honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [formTimestamp, setFormTimestamp] = useState<number>(0)

  useEffect(() => {
    setMounted(true)

    // Set form timestamp when component mounts
    setFormTimestamp(Date.now())

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    // Client-side validation
    if (formData.name.trim().length < 2) {
      setSubmitStatus('error')
      setSubmitMessage('Please enter a valid name (at least 2 characters).')
      setIsSubmitting(false)
      return
    }

    if (formData.subject.trim().length < 5) {
      setSubmitStatus('error')
      setSubmitMessage('Please enter a more descriptive subject (at least 5 characters).')
      setIsSubmitting(false)
      return
    }

    if (formData.message.trim().length < 10) {
      setSubmitStatus('error')
      setSubmitMessage('Please enter a more detailed message (at least 10 characters).')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: formTimestamp
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: ''
        })
        setFormTimestamp(Date.now()) // Reset timestamp
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Failed to send message. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
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
                  className={`${branding.typography.display.lg} font-bold text-foreground leading-tight mb-4 sm:mb-6`}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Contact
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-primary mx-auto rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                ></motion.div>
              </div>
              <motion.p
                className={`${branding.text.body('xl')} text-foreground/60 max-w-3xl mx-auto mt-6 sm:mt-8 leading-relaxed px-4 sm:px-0`}
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
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-foreground mb-6"
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
                    <h4 className="text-foreground font-semibold">New York</h4>
                    <span className="text-xs text-foreground/60">EST</span>
                  </div>
                  <p className="text-primary font-mono text-lg">{mounted ? formatTime(currentTime.newYork) : '--:--:-- --'}</p>
                  <p className="text-foreground/60 text-sm mt-1">9:00 AM - 6:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-foreground font-semibold">London</h4>
                      <span className="text-xs text-foreground/60">GMT</span>
                    </div>
                    <p className="text-primary font-mono text-lg">{mounted ? formatTime(currentTime.london) : '--:--:-- --'}</p>
                    <p className="text-foreground/60 text-sm mt-1">9:00 AM - 5:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-foreground font-semibold">Dubai</h4>
                      <span className="text-xs text-foreground/60">GST</span>
                    </div>
                    <p className="text-primary font-mono text-lg">{mounted ? formatTime(currentTime.dubai) : '--:--:-- --'}</p>
                    <p className="text-foreground/60 text-sm mt-1">8:00 AM - 4:00 PM</p>
                  </motion.div>
                  <motion.div
                    className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-foreground font-semibold">Tokyo</h4>
                      <span className="text-xs text-foreground/60">JST</span>
                    </div>
                    <p className="text-primary font-mono text-lg">{mounted ? formatTime(currentTime.tokyo) : '--:--:-- --'}</p>
                    <p className="text-foreground/60 text-sm mt-1">9:00 AM - 6:00 PM</p>
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
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-foreground mb-6"
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
                    className="w-5 h-5 bg-primary rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-foreground/80 text-sm">Email</p>
                    <p className="text-foreground font-medium">sk@hotelna.co.uk</p>
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
                    className="w-5 h-5 bg-primary rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.5, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-foreground/80 text-sm">Website</p>
                    <p className="text-foreground font-medium">hotelna.co.uk</p>
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
                    className="w-5 h-5 bg-primary rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.6, type: "spring" }}
                  ></motion.div>
                  <div>
                    <p className="text-foreground/80 text-sm">Consultancy</p>
                    <p className="text-foreground font-medium">Hotelna Hospitality Consultancy</p>
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
              <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>
              <motion.h3
                className="text-2xl font-bold text-foreground mb-6"
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
                onSubmit={handleSubmit}
              >
                {/* Honeypot field - hidden from users but visible to bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    className={`w-full px-4 py-3 bg-background/10 dark:bg-white/10 border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      formData.name.length > 0 && formData.name.length < 2
                        ? 'border-red-400/50'
                        : 'border-border'
                    }`}
                    placeholder="Your Name"
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${
                      formData.name.length > 0 && formData.name.length < 2
                        ? 'text-red-400'
                        : 'text-foreground/60'
                    }`}>
                      {formData.name.length > 0 && formData.name.length < 2 ? 'At least 2 characters required' : ''}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {formData.name.length}/100
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background/10 dark:bg-white/10 border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Your Email"
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    maxLength={200}
                    className={`w-full px-4 py-3 bg-background/10 dark:bg-white/10 border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      formData.subject.length > 0 && formData.subject.length < 5
                        ? 'border-red-400/50'
                        : 'border-border'
                    }`}
                    placeholder="Message Subject"
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${
                      formData.subject.length > 0 && formData.subject.length < 5
                        ? 'text-red-400'
                        : 'text-foreground/60'
                    }`}>
                      {formData.subject.length > 0 && formData.subject.length < 5 ? 'At least 5 characters required' : ''}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {formData.subject.length}/200
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={2000}
                    className={`w-full px-4 py-3 bg-background/10 dark:bg-white/10 border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none ${
                      formData.message.length > 0 && formData.message.length < 10
                        ? 'border-red-400/50'
                        : 'border-border'
                    }`}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${
                      formData.message.length > 0 && formData.message.length < 10
                        ? 'text-red-400'
                        : 'text-foreground/60'
                    }`}>
                      {formData.message.length > 0 && formData.message.length < 10 ? 'At least 10 characters required' : ''}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {formData.message.length}/2000
                    </span>
                  </div>
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  whileHover={isSubmitting ? {} : { scale: 1.05, backgroundColor: "#c4a24f" }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting && (
                    <motion.div
                      className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`p-4 rounded-xl ${
                      submitStatus === 'success'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                  >
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}
                </motion.form>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
