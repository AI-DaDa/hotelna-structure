import { Marquee } from "@/components/magicui/marquee"
import Image from "next/image"
import { branding } from "@/lib/branding"

const testimonials = [
  {
    name: "Arjun Mehta",
    username: "@arjdev",
    body: "Hotelna saved my family vacation! The hotel matched exactly what was shown - clean, safe, and beautiful.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sara Lin",
    username: "@sara.codes",
    body: "Finally, honest hotel reviews! No more nasty surprises. Hotelna's professional reviews are spot-on.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Devon Carter",
    username: "@devninja",
    body: "Booked a business trip through Hotelna. The hotel quality was exactly as described - professional and reliable.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Priya Shah",
    username: "@priyacodes",
    body: "Trust is everything when traveling. Hotelna's verified reviews gave me confidence in my booking choice.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Leo Martin",
    username: "@leobuilds",
    body: "No more fake reviews or misleading photos. Hotelna shows you exactly what you're getting. Game changer.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Chloe Winters",
    username: "@chloewinters",
    body: "Hotelna helped me find genuine boutique hotels that weren't overhyped. Authentic travel experiences.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Ayaan Malik",
    username: "@ayaan_dev",
    body: "As a frequent traveler, Hotelna's honest assessments save me time and money. Essential for booking.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Monica Reeves",
    username: "@monicareeves",
    body: "Professional hospitality reviews made all the difference. The hotel exceeded expectations thanks to Hotelna.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "James Roy",
    username: "@jamesrdev",
    body: "Hotelna's transparency is refreshing. Real reviews from real professionals - exactly what travelers need.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>

      <div className={`${branding.text.body('base')} text-foreground/90 leading-relaxed`}>{body}</div>

      <div className="mt-5 flex items-center gap-2">
        <Image src={img || "/placeholder.svg"} alt={name} height={40} width={40} className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-foreground">{name}</div>
          <div className="leading-5 tracking-tight text-foreground/60">{username}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mb-24 bg-background py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-[540px]">

          <div
            className="paneflow-text paneflow-item-testimonials-title"
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
                whiteSpace: 'nowrap',
                fontSize: '9cqw',
                textAlign: 'center',
                fontFamily: 'Dubai',
                fontWeight: 'bold',
                fontStyle: 'normal',
                textDecoration: 'none',
                lineHeight: '1',
                padding: '0cqw 0cqw',
                borderRadius: '0',
              }}
            >
              <div className={`paneflow-text-content text-foreground ${branding.typography.display.md}`}>

              </div>
            </div>
          </div>
          <p className={`mt-5 relative z-10 text-center ${branding.text.muted('lg')}`}>
            From intuitive design to powerful features, our app has become an essential tool for users around the world.
          </p>
        </div>

        <div className="relative my-16">
          {/* Blurred testimonials content */}
          <div className="flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] blur-sm">
            <div>
              <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>

            <div className="hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {secondColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>

            <div className="hidden lg:block">
              <Marquee pauseOnHover vertical className="[--duration:30s]">
                {thirdColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>
          </div>

          {/* Overlay with "To be launched soon" message */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="text-center">
              <h3 className={`${branding.typography.heading.h2} font-bold text-foreground mb-4`}>
                To be launched soon
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="-mt-8 flex justify-center opacity-50 pointer-events-none">
          <button className="group relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 active:scale-95">
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
            Share your experience
          </button>
        </div>
      </div>
    </section>
  )
}
