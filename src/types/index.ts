export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  region?: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  tags: string[];
  bestFor: string[];
  bestTimeToVisit: string;
  highlights: string[];
  popularAreas: string[];
  featuredStayIds: string[];
};

export type StayPropertyType = "hotel" | "resort" | "villa" | "guesthouse" | "apartment";

export type Stay = {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  destinationName: string;
  country: string;
  propertyType: StayPropertyType;
  description: string;
  images: string[];
  pricePerNight: number;
  currency: "INR";
  rating: number;
  reviewCount: number;
  amenities: string[];
  guestCapacity: number;
  freeCancellation: boolean;
  featured?: boolean;
  sampleListing: true;
  address: string;
  roomSummary: string;
  reviews?: {
    id: string;
    author: string;
    date: string;
    rating: number;
    comment: string;
  }[];
};

export type ActivityCategory = "food" | "sightseeing" | "nature" | "relaxation" | "transport" | "stay" | "other";

export type Activity = {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  dayNumber: number;
  time?: string;
  estimatedCost?: number;
  image?: string;
};

export type Trip = {
  id: string;
  title: string;
  destinationId?: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  guests: number;
  notes: string;
  activities: Activity[];
  updatedAt: string;
};

export type SavedItem = {
  id: string;
  type: "destination" | "stay";
  savedAt: string;
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  filterType?: StayPropertyType;
  tag?: string;
};

export type SearchCriteria = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

