"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../../components/ui/input";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const destinations = ["Maldives", "Egypt", "Bali", "Dubai", "Japan", "Australia", "Thailand"];


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    
      <nav className=" bg-black text-white p-5 flex justify-between items-center">
      <div className="flex items-center space-x-4 relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold hover:text-gray-300 transition">
        Travel Explorer
      </Link>
      {/* Search Bar (Properly Sized) */}
      
      </div>

      {/* Navigation Links */}
      <div className=" flex space-x-4  ">
        <Link href="/" className="hover:text-gray-300 transition">Home</Link>
        <Link href="/customize" className="hover:text-gray-300 transition">Customize</Link>
        <Link href="/get-in-touch" className="hover:text-gray-300 transition">Contact</Link>
      </div>
      
    </nav>
    
  );
}
