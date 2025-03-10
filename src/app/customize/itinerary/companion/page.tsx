"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CompanionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get values from query params
  const destination = searchParams.get("destination") || "London";
  const days = searchParams.get("days") || "6-9 Days";
  const [selectedCompanion, setSelectedCompanion] = useState(searchParams.get("companion") || "Couple");

  const companions = [
    { label: "Couple", img: "/images/couple.png" },
    { label: "Family", img: "/images/family.png" },
    { label: "Friends", img: "/images/friends.png" },
    { label: "Solo", img: "/images/solo.png" },
  ];

  // Update URL when the companion changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("destination", destination);
    params.set("days", days);
    params.set("companion", selectedCompanion);

    router.replace(`/customize/itinerary/companion?${params.toString()}`);
  }, [selectedCompanion]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 relative"
      style={{ backgroundImage: "url('/images/bgimage.jpg')" }}
    >
      {/* Optional: Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg relative z-10"
      >
        {/* Top Section */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{destination}</span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{days}</span>
          <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{selectedCompanion}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6">
          <motion.div
            className="absolute h-2 bg-yellow-500 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-6">
          Who is travelling with you?
        </h3>

        {/* Grid of Companion Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companions.map((companion) => (
            <button
              key={companion.label}
              onClick={() => setSelectedCompanion(companion.label)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition duration-300 border 
                ${selectedCompanion === companion.label ? "border-green-500 bg-green-100" : "border-gray-300 bg-white hover:bg-gray-100"}`}
            >
              <Image src={companion.img} alt={companion.label} width={60} height={60} />
              <span className="text-gray-700 font-medium mt-2">{companion.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push(`/customize/itinerary?destination=${destination}&days=${days}`)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>

          <button
            onClick={() => router.push(`/customize/itinerary/rooms?destination=${destination}&days=${days}&companion=${selectedCompanion}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}
