"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomizePage() {
  const router = useRouter();
  const destinations = [
    "Maldives",
    "Egypt",
    "Bhutan",
    "Bali",
    "Dubai",
    "Japan",
    "Australia",
    "Thailand",
    "Singapore",
    "Europe",
    "Abu Dhabi",
  ];

  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const filteredDestinations = destinations.filter((dest) =>
    dest.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelection = (destination: string) => {
    if (!destination.trim()) return;

    setSelectedDestination(destination);

    const directDestinations = ["Maldives", "Bhutan", "Egypt"];

    if (directDestinations.includes(destination)) {
      router.push(`/destination/${destination.toLowerCase()}`);
    } else {
      router.push(`/customize/itinerary?destination=${encodeURIComponent(destination)}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="absolute inset-0 bg-[url('/world-map.svg')] bg-cover bg-center opacity-15 z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
        >
          What’s <span className="text-green-500 italic">your pick</span> for your next vacation?
        </motion.h2>

        <div className="relative w-full">
          
          
          <input
            type="text"
            placeholder=" Enter your destination"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 text-lg font-medium text-gray-700 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 space-y-4"
        >
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => (
              <motion.li
                key={dest}
                className={`p-4 cursor-pointer text-xl font-medium text-gray-700 border border-transparent hover:bg-green-50 transition-all rounded-lg ${
                  selectedDestination === dest ? "border-green-500 bg-green-100 text-green-700" : ""
                }`}
                onClick={() => handleSelection(dest)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                {dest}
              </motion.li>
            ))
          ) : search.trim() !== "" ? (
            <motion.li
              className="p-4 cursor-pointer text-xl font-medium text-gray-700 bg-gray-100 rounded-lg"
              onClick={() => handleSelection(search)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {search}, {"Country"}
            </motion.li>
          ) : (
            <li className="p-4 text-gray-400 text-lg text-center">No destinations found</li>
          )}
        </motion.ul>
      </div>
    </div>
  );
}
