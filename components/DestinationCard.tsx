"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface DestinationProps {
  img: string;
  title: string;
  handle: string;
}

export default function DestinationCard({ img, title, handle }: DestinationProps) {
  const router = useRouter();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={img && img.trim() !== "" ? img : "/images/fallback.jpg"}
        alt={title}
        width={400}
        height={250}
        className="w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={() => router.push(`/destination/${handle}`)}
        >
          Explore
        </button>
      </div>
    </div>
  );
}
