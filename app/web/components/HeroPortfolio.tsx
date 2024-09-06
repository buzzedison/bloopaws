"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const HeroPortfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const portfolioItems = [
    { id: 1, title: "Edlizer Beauty", imgUrl: "/images/portfolio/edlizer.png", link: "/project1" },
    { id: 2, title: "Blessed Home & Creche", imgUrl: "/images/portfolio/creche.png", link: "/project2" },
    { id: 3, title: "De Namud", imgUrl: "/images/portfolio/dena.png", link: "/project3" },
    { id: 4, title: "Special Homes Ltd", imgUrl: "/images/portfolio/edlizer.png", link: "/project1" },
    { id: 5, title: "Toot", imgUrl: "/images/portfolio/toot.png", link: "/project2" },
    { id: 6, title: "Taskwit", imgUrl: "/images/portfolio/taskwit.png", link: "/project3" },
  ];

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen bg-red-700 text-white overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
      >
        &#8592;
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
      >
        &#8594;
      </button>

      {/* Portfolio Items */}
      <div
        className="flex space-x-4 items-center justify-start w-full h-full overflow-x-scroll snap-x snap-mandatory no-scrollbar"
        ref={scrollRef}
      >
        {portfolioItems.map((item, index) => (
          <Link href={item.link} key={item.id}>
            <motion.div
              className="relative min-w-[300px] h-[450px] overflow-hidden cursor-pointer group snap-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.1, rotateY: 15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={item.imgUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-out"
              />
              {/* Title Overlay */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              >
                <h2 className="text-3xl font-bold">{item.title}</h2>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroPortfolio;
