"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface VideoScrollTriggerProps {
  videoSrc: string
  className?: string
  containerClassName?: string
  startTrigger?: string
  endTrigger?: string
}

export default function VideoScrollTrigger({
  videoSrc,
  className = "w-full h-full object-cover",
  containerClassName = "relative w-full h-[300vh]", // Tall container for scroll
  startTrigger = "top top",
  endTrigger = "bottom bottom"
}: VideoScrollTriggerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const video = videoRef.current
    const container = containerRef.current

    if (!video || !container) return

    // Function to handle once events
    const once = (el: HTMLElement | Document, event: string, fn: EventListener) => {
      const onceFn = (e: Event) => {
        el.removeEventListener(event, onceFn)
        fn.call(el, e)
      }
      el.addEventListener(event, onceFn)
      return onceFn
    }

    // iOS activation - make sure video works on mobile
    const activateVideo = () => {
      video.play()
      video.pause()
    }

    once(document.documentElement, "touchstart", activateVideo)

    // Handle video metadata loaded
    const handleLoadedMetadata = () => {
      setIsLoaded(true)

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: startTrigger,
          end: endTrigger,
          scrub: 1, // Smooth scrubbing
          onUpdate: (self) => {
            // Optional: Add progress callback
            console.log("Scroll progress:", self.progress)
          }
        }
      })

      // Animate video currentTime based on scroll
      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration || 1,
          ease: "none" // Linear progression
        }
      )
    }

    // Add event listener for metadata
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    // Preload video with blob for better performance
    const preloadVideo = async () => {
      try {
        const response = await fetch(videoSrc)
        const blob = await response.blob()
        const blobURL = URL.createObjectURL(blob)

        const currentTime = video.currentTime
        video.src = blobURL
        video.currentTime = currentTime + 0.01
      } catch (error) {
        console.error("Error preloading video:", error)
      }
    }    // Preload after a short delay
    const preloadTimeout = setTimeout(preloadVideo, 1000)

    // Cleanup function
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      clearTimeout(preloadTimeout)
    }
  }, [videoSrc, startTrigger, endTrigger])

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      id="video-container"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className={className}
          muted
          playsInline
          preload="metadata"
          onLoadStart={() => console.log("Video loading started")}
          onCanPlay={() => console.log("Video can play")}
          onError={(e) => {
            console.error("Video error - likely missing video file:", e);
            setIsLoaded(true); // Hide loading state even on error
          }}
        />

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
            <div className="text-white text-lg font-medium">Loading video...</div>
          </div>
        )}

        {/* Progress indicator (optional) */}
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
          Scroll to control video
        </div>
      </div>
    </div>
  )
}
