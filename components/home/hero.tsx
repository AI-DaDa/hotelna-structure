"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Hero() {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },

        modules: [Navigation, Pagination, Autoplay, Scrollbar],
      });
    }
  }, [mounted]);

  if (!mounted) {
    return null
  }
  return (
    <>
            <section className="relative overflow-hidden min-h-screen flex flex-col pb-20">
        {/* Full screen carousel */}
        <div className="swiper-container absolute inset-0 z-0 ">
          <div className="swiper-wrapper">
            <div className="swiper-slide relative">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Hotel Management"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                {/* <h3 className="text-5xl font-bold text-white mb-6">Hotel Management</h3>
                <p className="text-gray-200 text-xl max-w-3xl">Streamline your hotel operations with our comprehensive management system</p> */}
              </div>
            </div>
            <div className="swiper-slide relative">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Room Booking"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                {/* <h3 className="text-5xl font-bold text-white mb-6">Room Booking</h3>
                <p className="text-gray-200 text-xl max-w-3xl">Easy-to-use booking system for guests and staff</p> */}
              </div>
            </div>
            <div className="swiper-slide relative">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                  alt="Analytics Dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              {/* <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h3 className="text-5xl font-bold text-white mb-6">Analytics Dashboard</h3>
                <p className="text-gray-200 text-xl max-w-3xl">Get insights into your hotel performance with detailed analytics</p>
              </div> */}
            </div>
          </div>
          {/* Add Pagination */}
          <div className="swiper-pagination !bottom-28 !z-20" style={{
            '--swiper-pagination-bullet-horizontal-gap': '12px'
          } as React.CSSProperties}></div>

          {/* Add Navigation */}
          <div className="swiper-button-prev !text-[#d5b15f] !z-20 !left-8"></div>
          <div className="swiper-button-next !text-[#d5b15f] !z-20 !right-8"></div>

          {/* Add Scrollbar at the bottom */}
          <div className="swiper-scrollbar !bg-white/20 !bottom-20 !z-20">
            <div className="swiper-scrollbar-drag !bg-[#d5b15f]"></div>
          </div>
        </div>

        {/* Overlay content */}
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-30 flex-1 flex flex-col">
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h1 id="main-title" className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
                Your <strong>Hospitality</strong>
                 <em className="italic text-[#d5b15f]">Hub</em>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-white/90 drop-shadow-lg"
            >
              Bespoke, visionary hospitality built with global expertise. Plan, design, and elevate your next hotel with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Get started button */}
              <div className="flex items-center justify-center">
                <a href="#features">
                  <div className="group cursor-pointer border border-[#d5b15f]/30 bg-black/20 backdrop-blur-sm gap-2 h-[60px] flex items-center p-[10px] rounded-full hover:bg-[#d5b15f]/20 transition-all">
                    <div className="border border-[#d5b15f] bg-[#d5b15f] h-[40px] rounded-full flex items-center justify-center text-black">
                      <p className="font-medium tracking-tight mr-3 ml-3 flex items-center gap-2 justify-center text-base">
                        Get started
                      </p>
                    </div>
                    <div className="text-[#d5b15f] group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-[#d5b15f]/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right group-hover:rotate-180 ease-in-out transition-all"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Social Proof Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-auto pb-8"
          >

          </motion.div>
        </div>
      </section>
    </>
  )
}
