"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RoomsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get user selections from query params
  const destination = searchParams.get("destination") || "Unknown";
  const days = searchParams.get("days") || "N/A";
  const companion = searchParams.get("companion") || "N/A";

  const [selectedRoom, setSelectedRoom] = useState("Standard Room");

  // Room options
  const rooms = [
    { label: "Standard Room", img: "/images/basic.jpeg", description: "Cozy and comfortable", price: "Affordable", tags: ["Basic", "Good View"] },
    { label: "Deluxe Room", img: "/images/luxury-room.jpg", description: "Spacious with premium amenities", price: "Moderate", tags: ["Luxury", "Balcony"] },
    { label: "Suite", img: "/images/vip-rooms.jpg", description: "Top-tier experience", price: "Expensive", tags: ["Premium", "VIP"] },
    { label: "Family Room", img: "/images/spacious4.jpg", description: "Perfect for groups", price: "Budget-Friendly", tags: ["Spacious", "Kid-Friendly"] },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 pb-24"
    style={{ backgroundImage: "url('/images/bgimage.jpg')" }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg"
      >
        {/* Trip Summary */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{destination}</span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{days} Days</span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{companion}</span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{selectedRoom}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6">
          <motion.div
            className="absolute h-2 bg-yellow-500 rounded-full"
            initial={{ width: "50%" }}
            animate={{ width: "66%" }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Room Options */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select your room type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <motion.button
              key={room.label}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedRoom(room.label)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition duration-300 border 
                ${
                  selectedRoom === room.label
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
            >
              <Image src={room.img} alt={room.label} width={80} height={60} />
              <span className="text-gray-700 font-medium mt-2">{room.label}</span>
              <span className="text-gray-500 text-sm">{room.description}</span>
              <span className="text-red-500 text-xs">{room.price}</span>
              <div className="flex space-x-2 mt-1">
                {room.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-gray-200 rounded-md">{tag}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {/* Back Button */}
          <button
            onClick={() =>
              router.push(`/customize/itinerary/companion?destination=${destination}&days=${days}&companion=${companion}`)
            }
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition"
          >
            Back
          </button>

          {/* Next Button */}
          <button
            onClick={() =>
              router.push(`/customize/itinerary/success?destination=${destination}&days=${days}&companion=${companion}&room=${selectedRoom}`)
            }
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}
