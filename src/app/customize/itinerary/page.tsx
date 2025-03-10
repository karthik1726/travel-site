"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ItineraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get destination from URL or default to "London"
  const destination = searchParams.get("destination") || "London";
  const [selectedDays, setSelectedDays] = useState("10-12 Days");

  const durations = [
    { label: "6-9 Days", image: "/images/moon1.avif" },
    { label: "10-12 Days", image: "/images/moon2.avif" },
    { label: "13-15 Days", image: "/images/moon3.avif" },
    { label: "15-20 Days", image: "/images/moon4.avif" },
  ];

  const handleNext = () => {
    router.push(`/customize/itinerary/companion?destination=${destination}&days=${selectedDays}`);
  };

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
        className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg relative z-10"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          NOW PLANNING YOUR HOLIDAY TO <span className="font-bold">{destination}</span>
        </h2>
        <div className="border-t-4 border-yellow-500 w-20 mx-auto mb-6"></div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-6">
          What's the duration of your holiday?
        </h3>

        {/* Grid of options */}
        <div className="grid grid-cols-2 gap-4">
          {durations.map((duration) => (
            <button
              key={duration.label}
              onClick={() => setSelectedDays(duration.label)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition duration-300 border w-full h-32
                ${
                  selectedDays === duration.label
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
            >
              <img src={duration.image} alt={duration.label} className="w-16 h-16 mb-2 object-contain" />
              <span className="text-gray-700 font-medium">{duration.label}</span>

              {selectedDays === duration.label && (
                <span className="text-xs text-white bg-green-400 px-2 py-1 rounded-full mt-2">
                  OUR PICK
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}
