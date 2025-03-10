"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBanners } from "../utils/api";

const Carousel = () => {
  const [banners, setBanners] = useState<{ img: string; alt: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const getBanners = async () => {
      try {
        const data = await fetchBanners();
        if (Array.isArray(data)) setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    getBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (banners.length ? (prevIndex + 1) % banners.length : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return <p className="text-center">❌ No banners available</p>;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={banners[currentIndex].img}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full"
        >
          <Image
            src={banners[currentIndex].img}
            alt={banners[currentIndex].alt}
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
       {/* Search Bar */}
       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="px-5 py-3 w-3/4 md:w-1/2 lg:w-1/3 text-lg font-medium text-gray-900 rounded-full shadow-xl
            bg-white border-2 border-transparent transition-all focus:border-transparent
            focus:ring-4 focus:ring-[#ff6b35] hover:ring-[#ff9f1c]"
            onClick={() => router.push("/customize")}
            readOnly
          />
        </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full z-10"
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full z-10"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
