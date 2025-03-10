"use client";

import Image from "next/image";

interface BannerProps {
  banners: { img: string; alt: string }[];
}

export default function BannerGrid({ banners }: BannerProps) {
  return (
    <main>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 mt-6">
      {banners.length > 0 ? (
        banners.map((b, index) => (
          <div key={b.img ?? index} className="w-48 h-48 overflow-hidden rounded-lg shadow-lg">
            <Image 
              src={b.img} 
              alt={b.alt} 
              width={193} 
              height={192} 
             
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No banners available</p>
      )}
    </div>
    </main>
  );
}
