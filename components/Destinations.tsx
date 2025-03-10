"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
interface Destination {
  img: string;
  title: string;
  handle: string;
}

export default function Destinations({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();

  return (
    <main>
    <div className="fixed "></div>
    <div className="grid grid-flow-col grid-rows-1 gap-6">
      {destinations.map((dest) => (
        <div key={dest.handle} className="rounded-lg overflow-hidden shadow-lg bg-white">
          <Image src={dest.img} alt={dest.title} width={300} height={200} className="w-full h-auto object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold">{dest.title}</h3>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => router.push(`/destination/${dest.handle}`)}
            >
              Explore
            </button>
          </div>
        </div>
      ))}
    </div>
    
    </main>
  );
}
