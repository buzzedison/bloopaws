'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const portfolioItems = [
  { id: 1, title: "Edlizer Beauty", description: "E-commerce beauty store", imgUrl: "/images/portfolio/edlizer.png", link: "/project1", website: "https://edlizerbeauty.com" },
  { id: 2, title: "Blessed Home & Creche", description: "Childcare service website", imgUrl: "/images/portfolio/creche.png", link: "/project2", website: "https://blessedhomeandcreche.com" },
  { id: 3, title: "De Namud", description: "Fashion brand website", imgUrl: "/images/portfolio/dena.png", link: "/project3", website: "https://denamud.com" },
  { id: 4, title: "Special Homes Ltd", description: "Real estate company website", imgUrl: "/images/portfolio/special.png", link: "/project4", website: "https://specialhomesltd.com" },
  { id: 5, title: "Toot", description: "Creative Agency", imgUrl: "/images/portfolio/toot.png", link: "/project5", website: "https://toot.com" },
  { id: 6, title: "Taskwit", description: "Training and Course Platform", imgUrl: "/images/portfolio/taskwit.png", link: "/project6", website: "https://taskwit.co" },
  { id: 7, title: "Tutu's Cupcakes", description: "Bakery website", imgUrl: "/images/portfolio/tutus_cupcakes.png", link: "/project7", website: "https://tutuscupcakes.com" },
  { id: 8, title: "Mr Fish Processing", description: "Seafood processing company", imgUrl: "/images/portfolio/mrfish.png", link: "/project8", website: "https://mrfishprocessing.com" },
  { id: 9, title: "OBP Women's Hospital", description: "Healthcare provider website", imgUrl: "/images/portfolio/OBP Women's Hospital.png", link: "/project9", website: "https://obpwomenshospital.com" },
  { id: 10, title: "James and Sandra", description: "Wedding website", imgUrl: "/images/portfolio/james.png", link: "/project10", website: "https://jamesandsandra.com" },
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const maxIndex = Math.max(0, portfolioItems.length - (isMobile ? 1 : 3))

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const autoSlide = () => {
    if (currentIndex < maxIndex) {
      nextSlide()
    } else {
      setCurrentIndex(0)
      setDirection(1)
    }
  }

  useEffect(() => {
    const interval = setInterval(autoSlide, 10000)
    return () => clearInterval(interval)
  }, [currentIndex, maxIndex])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-800 to-red-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center mix-blend-overlay" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 py-16">
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
            Check out our <span className="text-yellow-300">recent work</span>
          </span>
        </motion.h1>
        <motion.div 
          className="w-full max-w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="flex overflow-hidden space-x-0 md:space-x-6">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {portfolioItems.slice(currentIndex, currentIndex + (isMobile ? 1 : 3)).map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 100 : -100
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -100 : 100
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full md:w-1/3 flex-shrink-0"
                  >
                    <Card className="overflow-hidden bg-white/10 hover:bg-white/20 transition-colors duration-300 h-full shadow-lg">
                      <CardContent className="p-0 h-full">
                        <div className="relative aspect-[3/4] overflow-hidden group h-full">
                          <Image
                            src={item.imgUrl}
                            alt={item.title}
                            fill 
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 md:bg-transparent">
                            <h2 className="text-xl md:text-2xl text-white font-semibold mb-2 md:mb-3">{item.title}</h2>
                            <p className="text-sm md:text-base text-red-200 mb-3 md:mb-5">{item.description}</p>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                              <Link prefetch={false} href={item.link} className="text-sm md:text-base bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full transition-colors duration-300 text-center">
                                View Project
                              </Link>
                              <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center">
                                Visit Website <ExternalLink className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <Button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="pointer-events-auto"
                variant="ghost"
                size="icon"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </Button>
              <Button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className="pointer-events-auto"
                variant="ghost"
                size="icon"
                aria-label="Next projects"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="mt-8 md:mt-12 w-full max-w-7xl bg-white/10 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div
            className="h-2 bg-white transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
          />
        </motion.div>
      </div>
    </div>
  )
}