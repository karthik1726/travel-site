"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extracting query params dynamically
  const destination = searchParams.get("destination") || "Unknown Destination";
  const duration = searchParams.get("days") || "Varied Days";
  const companion = searchParams.get("companion") || "Solo";
  const room = searchParams.get("room") || "1 Room";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 relative"
      style={{ backgroundImage: "url('/images/bgimage.jpg')" }}
    >
      {/* Optional: Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg text-center relative z-10"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <Image src="/images/success.png" alt="Success" width={80} height={80} />
        </div>

        {/* Confirmation Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Congratulations! 🎉</h2>
        <p className="text-gray-600">Your custom itinerary has been successfully created.</p>

        {/* Summary Details (Dynamic) */}
        <div className="mt-4 space-y-2 text-gray-700">
          <p><strong>Destination:</strong> {destination}</p>
          <p><strong>Duration:</strong> {duration} Days</p>
          <p><strong>Companion:</strong> {companion}</p>
          <p><strong>Room:</strong> {room}</p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 space-x-4">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/get-in-touch")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </div>
  );
}
