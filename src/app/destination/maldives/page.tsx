"use client";

import { useState } from "react";
import {Card} from "../../../../components/ui/card";
import {Button} from "../../../../components/ui/button";
import Checkbox from "../../../../components/ui/checkbox";
import { TripType } from "../../types";

const trips: TripType[] = [
  {
    name: "Cocogiri Island Resort",
    description: "5-star all-inclusive stay with water villas.",
    priceRange: "Below ₹150k",
    rating: 5,
    image: "https://th.bing.com/th/id/OIP.lZxq8dcEenL3oNjncsSb2gHaE6?rs=1&pid=ImgDetMain",
  },
  {
    name: "Medhufushi Island Resort",
    description: "Perfect for couples, private beach resort.",
    priceRange: "Below ₹100k",
    rating: 4,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/37/0a/a0/medhufushi-island-resort.jpg?w=900&h=-1&s=1",
  },
  {
    name: "Makunudu Island Resort",
    description: "Enjoy water sports and island hopping.",
    priceRange: "Above ₹200k",
    rating: 5,
    image: "https://www.simplymaldivesholidays.co.uk/wp-content/uploads/2013/09/82062276.jpg",
  },
  {
    name: "Dhigufaru Island Resort",
    description: "Affordable stay with scenic views.",
    priceRange: "Below ₹200k",
    rating: 3,
    image: "https://th.bing.com/th/id/OIP.BL4McW4S_eyZwjkQ4oiRNgHaFj?rs=1&pid=ImgDetMain",
  },
];

type FiltersType = {
  price: string[];
  rating: number[];
};

export default function MaldivesListing() {
  const [filters, setFilters] = useState<FiltersType>({ price: [], rating: [] });

  const handleCheckboxChange = (type: keyof FiltersType, value: string | number) => {
    setFilters((prev) => {
      const updatedArray = prev[type].includes(value as never)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value as never];

      return { ...prev, [type]: updatedArray };
    });
  };

  const filteredTrips = trips.filter(
    (trip) =>
      (filters.price.length === 0 || filters.price.includes(trip.priceRange ?? "")) &&
      (filters.rating.length === 0 || filters.rating.includes(trip.rating ?? 0))
  );

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-6">
      {/* Filters Section */}
      <aside className="col-span-3 border p-4 rounded-lg bg-white">
        <h2 className="text-lg font-semibold">Filters</h2>

        {/* Price Filter */}
        <fieldset className="mt-4">
          <legend className="font-medium">Price</legend>
          {["Below ₹100k", "Below ₹150k", "Below ₹200k", "Above ₹200k"].map((price) => (
            <label key={price} className="flex items-center gap-2 mt-2 cursor-pointer">
              <Checkbox
                checked={filters.price.includes(price)}
                onClick={() => handleCheckboxChange("price", price)}
              />
              {price}
            </label>
          ))}
        </fieldset>

        {/* Rating Filter */}
        <fieldset className="mt-4">
          <legend className="font-medium">Star Rating</legend>
          {[3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center gap-2 mt-2 cursor-pointer">
              <Checkbox
                checked={filters.rating.includes(rating)}
                onClick={() => handleCheckboxChange("rating", rating)}
              />
              {rating} Star
            </label>
          ))}
        </fieldset>
      </aside>

      {/* Trips Section */}
      <section className="col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <Card key={index} className="p-4 shadow-lg rounded-lg">
              <img src={trip.image ?? "/fallback-image.jpg"} alt={trip.name ?? "Trip"} className="rounded-lg w-full h-48 object-cover" />
              <h3 className="mt-4 font-semibold">{trip.name ?? "Unknown Trip"}</h3>
              <p className="text-gray-600">{trip.description ?? "No description available"}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">{trip.priceRange ?? "N/A"}/couple</span>
                <Button className="bg-green-500 text-white px-4 py-2 rounded-lg">View Details</Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No trips available.</p>
        )}
      </section>
    </div>
  );
}
