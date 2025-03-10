// Types for banner data from API
export interface Banner {
    img: string;
    alt: string;
  }
  
  export interface BannerResponse {
    banners: Banner[];
  }
  
  // Types for destination data from API
  export interface Destination {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    handle: string;
    totalUsers?: number; // Optional field if present in some destinations
  }
  export type TripType = {
    
    name: string;
    description: string;
    priceRange?: string;
    rating: number;
    image?: string; // Add if the API includes images
  };
  