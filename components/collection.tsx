"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Bed, Utensils, Wifi, Sparkles } from "lucide-react"

const galleryData = {
  rooms: {
    title: "Luxury Rooms",
    icon: Bed,
    images: [
      {
        url: "/luxury-hotel-room-with-king-bed-elegant-lighting.jpg",
        title: "Deluxe Suite",
        description: "Spacious suite with panoramic city views",
      },
      {
        url: "/modern-hotel-bedroom-with-marble-bathroom.jpg",
        title: "Executive Room",
        description: "Contemporary design with premium amenities",
      },
      {
        url: "/presidential-hotel-suite-with-living-area.jpg",
        title: "Presidential Suite",
        description: "Ultimate luxury with private terrace",
      },
    ],
  },
  dining: {
    title: "Fine Dining",
    icon: Utensils,
    images: [
      {
        url: "/elegant-restaurant-interior-with-chandeliers.jpg",
        title: "Main Restaurant",
        description: "Michelin-starred culinary experience",
      },
      {
        url: "/rooftop-bar-skyline.png",
        title: "Sky Lounge",
        description: "Signature cocktails with breathtaking views",
      },
      {
        url: "/gourmet-plated-dish-fine-dining.jpg",
        title: "Culinary Excellence",
        description: "Artfully crafted seasonal menu",
      },
    ],
  },
  amenities: {
    title: "Amenities",
    icon: Sparkles,
    images: [
      {
        url: "/luxury-hotel-spa-with-pool.jpg",
        title: "Wellness Spa",
        description: "Rejuvenating treatments and thermal pools",
      },
      {
        url: "/modern-hotel-gym-fitness-center.jpg",
        title: "Fitness Center",
        description: "State-of-the-art equipment and personal training",
      },
      {
        url: "/hotel-infinity-pool-sunset.jpg",
        title: "Infinity Pool",
        description: "Stunning rooftop pool with panoramic views",
      },
    ],
  },
  services: {
    title: "Services",
    icon: Wifi,
    images: [
      {
        url: "/luxury-hotel-concierge-desk.jpg",
        title: "24/7 Concierge",
        description: "Personalized service at your fingertips",
      },
      {
        url: "/hotel-business-center-meeting-room.jpg",
        title: "Business Center",
        description: "Fully equipped meeting and event spaces",
      },
      {
        url: "/valet-parking-luxury-hotel-entrance.jpg",
        title: "Valet Service",
        description: "Seamless arrival and departure experience",
      },
    ],
  },
}

export function Collections() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section id="collection" className="mb-24">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-[540px]">

          <div
            className="paneflow-text paneflow-item-collection-title"
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
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Dubai',
                fontWeight: 'bold',
                fontStyle: 'normal',
                textDecoration: 'none',
                lineHeight: '1',
                padding: '0cqw 0cqw',
                borderRadius: '0',
              }}
            >
              <div className="paneflow-text-content">
                Collection
              </div>
            </div>
          </div>
          <p className="mt-5 relative z-10 text-center text-lg text-zinc-500">
            Experience Unparalleled Luxury
          </p>
        </div>

        <div className="relative my-16">
          {/* Blurred content */}
          <div className="blur-sm pointer-events-none">
          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0 mb-8">
              {Object.entries(galleryData).map(([key, data]) => {
                const Icon = data.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    onClick={() => setSelectedImage(0)}
                    className="flex items-center gap-2 bg-card border border-border hover:border-[#d5b15f] data-[state=active]:border-[#d5b15f] data-[state=active]:bg-card data-[state=active]:text-[#d5b15f] transition-all duration-300 py-4 px-6 rounded"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{data.title}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {Object.entries(galleryData).map(([key, data]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Main Image */}
                  <Card className="overflow-hidden border-[#d5b15f]/20 bg-card">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={data.images[selectedImage].url || "/placeholder.svg"}
                        alt={data.images[selectedImage].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-serif mb-2 text-[#d5b15f]">{data.images[selectedImage].title}</h3>
                        <p className="text-sm text-gray-200">{data.images[selectedImage].description}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {data.images.map((image, index) => (
                      <Card
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                          selectedImage === index
                            ? "border-[#d5b15f] shadow-lg shadow-[#d5b15f]/20"
                            : "border-border hover:border-[#d5b15f]/50"
                        } bg-card`}
                      >
                        <div className="flex gap-4 p-4">
                          <div className="relative w-32 h-24 flex-shrink-0">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4
                              className={`font-medium mb-1 ${
                                selectedImage === index ? "text-[#d5b15f]" : "text-foreground"
                              }`}
                            >
                              {image.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Overlay with "To be launched soon" message */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              To be launched soon
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#d5b15f]/60 via-[#d5b15f] to-[#d5b15f]/60 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

        {/* Decorative Element */}
        <div className="mt-16 text-center">
          <div className="inline-block w-24 h-px bg-gradient-to-r from-transparent via-[#d5b15f] to-transparent" />
        </div>
      </div>
    </section>
  )
}
