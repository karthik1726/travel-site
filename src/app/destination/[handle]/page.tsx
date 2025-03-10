"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Trip {
  id?: number;
  name: string;
  price: string;
  duration: string;
  amenities?: string[]; // ✅ Made optional to avoid undefined issues
  image?: string;
}

export default function DestinationPage() {
  const params = useParams();
  const handle = Array.isArray(params?.handle) ? params.handle[0] : params?.handle;
  const normalizedHandle: string | undefined = handle ? handle.toLowerCase() : undefined;
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      if (!normalizedHandle) return;

      setLoading(true);
      try {
        const response = await fetch(`https://json-data-1wm2.onrender.com/destination/${normalizedHandle}`);
        if (!response.ok) throw new Error(`Failed to fetch trips: ${response.status}`);

        const data = await response.json();
        console.log("✅ API Response:", data);

        setTrips(Array.isArray(data?.trips) ? data.trips : []);
      } catch (error) {
        console.error("❌ Error fetching trips:", error);
        setTrips([]);
      }
      setLoading(false);
    }

    fetchTrips();
  }, [normalizedHandle]);

  if (!normalizedHandle) {
    return <p className="text-red-500 text-center mt-6">❌ Error: Destination not found.</p>;
  }

  // ✅ Store local images as fallback options
  const tripImages: Record<string, string[]> = {
    bhutan: ["/images/bhutan1.jpeg", "/images/bhutan2.jpg"],
    egypt: ["/images/egypt2.avif", "/images/egypt1.avif"],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Trips to {normalizedHandle.charAt(0).toUpperCase() + normalizedHandle.slice(1)}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-600 animate-pulse">⏳ Loading trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">⚠️ No trips available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => {
            // ✅ Use API image if available
            const apiImage = trip.image || "";

            // ✅ Alternate fallback images if API image is missing
            const mappedImages = tripImages[normalizedHandle] || [];
            const fallbackImage = mappedImages.length > 0 ? mappedImages[index % mappedImages.length] : "/images/default-placeholder.jpg";

            // ✅ Final Image Selection
            const tripImage = apiImage || fallbackImage;

            return (
              <div key={`trip-${normalizedHandle}-${index}`} className="border p-4 rounded-lg shadow-md bg-white">
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={tripImage}
                    width={200}
                    height={250}
                    alt={trip.name || "Destination image"}
                    className="w-full h-full object-cover rounded-lg"
                    priority={index === 0}
                    unoptimized={tripImage.endsWith(".avif")} // ✅ Fix for .avif images
                  />
                </div>

                {/* ✅ Ensure trip name is displayed */}
                <h2 className="text-xl font-semibold text-gray-800 mt-4">{trip.name}</h2>

                <p className="text-gray-600 font-semibold">💰 Price: ${trip.price}</p>
                <p className="text-gray-600">🗓 Duration: {trip.duration} days</p>

                {/* ✅ Handle missing amenities gracefully */}
                <p className="text-gray-600">
                  🏨 {trip.amenities && trip.amenities.length > 0 ? trip.amenities.join(", ") : "No amenities listed"}
                </p>

                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Fixed "Talk to an Expert" Button */}
      <div className="fixed bottom-4 right-4">
        <a
          href="/get-in-touch"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Talk to an Expert
        </a>
      </div>
    </div>
  );
}
