"use client";
import { useEffect, useState } from "react";
import { fetchBanners, fetchDestinations } from "../../utils/api";
import Image from "next/image";
import Carousel from "../../components/Carousel";
import Destinations from "../../components/Destinations";

export default function HomePage() {
  const [banners, setBanners] = useState<{ img: string; alt: string }[]>([]);
  const [destinations, setDestinations] = useState<{ img: string; title: string; handle: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const bannerData = await fetchBanners();
        const destinationData = await fetchDestinations();
        setBanners(Array.isArray(bannerData) ? bannerData : []);
        setDestinations(Array.isArray(destinationData) ? destinationData : []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="self-auto">
      {/* Banners Row (Above "Popular Destinations" Heading) */}
      {/* Carousel Banner Section */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
        <Carousel/>
      </div>
      <section className="relative ">
      <br />
      <center><p className="text-xl font-semibold ">Popular Destinations</p></center>
      </section>
      <br />
      {/* Destinations Grid */}
      <section className="">
      {destinations.length > 0 ? (
        <Destinations destinations={destinations} />
      ) : (
        <p className="text-gray-500">❌ No destinations available</p>
      )}
      </section>
      
    </main>
  );
}
