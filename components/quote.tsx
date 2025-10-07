"use client"

import { branding } from '@/lib/branding'

export function Quote() {
  return (
    <section className="w-full pb-24 px-4">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-white/20 p-2 shadow-sm">
        <div className="relative mx-auto h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] max-w-full overflow-hidden rounded-[38px] border border-white/20 bg-primary p-2 shadow-sm">
          {/* Hotelna patterns background at 45 degrees */}
          <div
            className="absolute inset-0 z-0 opacity-35"
            style={{
              backgroundImage: "url('/images/Hotelna-Patterns.jpg')",
              backgroundSize: "700px auto",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
              transform: "",
              transformOrigin: "center",
            }}
          />
          {/* Subtle radial glow overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 64, 23, 0.1), transparent 70%)",
            }}
          />


          <div className="relative z-20 flex items-center justify-center h-full">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h2 className={`${branding.typography.heading.h3} font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-tight max-w-6xl mx-auto`}>
                My approach is grounded, strategic, and personalised — built on a proven track record of turning vision into measurable success. True Hospitality is not just about service, it&apos;s about creating moments that guests carry with them long after they&apos;ve checked out.
              </h2>
              <p className={`${branding.typography.body.base} text-white max-w-xl mx-auto`}>
                - Solomon Khaddour, Founder & CEO of Hotelna
              </p>
            </div>
                 {/* <a href="/docs/get-started">
                  <div className="group border-border bg-secondary/70 flex h-[64px] cursor-pointer items-center gap-2 rounded-full border p-[11px]">
                    <div className="border-border bg-primary flex h-[43px] items-center justify-center rounded-full border">
                      <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-globe animate-spin"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                          <path d="M2 12h20"></path>
                        </svg>
                        Get started
                      </p>
                    </div>
                    <div className="border-border flex size-[26px] items-center justify-center rounded-full border-2 transition-all ease-in-out group-hover:ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right transition-all ease-in-out group-hover:rotate-45"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}
