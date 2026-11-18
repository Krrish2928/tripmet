import { Collection, Activity } from '../types';

export const collections: Collection[] = [
  {
    id: "col-1",
    title: "Beach & Coastal Escapes",
    subtitle: "Sun-soaked villas and sea-view hideaways across tropical coasts.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    filterType: "villa",
    tag: "Beaches"
  },
  {
    id: "col-2",
    title: "Mountain & Alpine Lodges",
    subtitle: "Cozy cedar chalets, crackling fireplaces, and dramatic mountain peaks.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    filterType: "resort",
    tag: "Mountains"
  },
  {
    id: "col-3",
    title: "Historic & Cultural Gems",
    subtitle: "Century-old Japanese machiyas, French boutique hotels, and royal havelis.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    filterType: "guesthouse",
    tag: "Culture"
  },
  {
    id: "col-4",
    title: "Secluded Private Villas",
    subtitle: "Infinity pools and dedicated chefs for private gatherings.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    filterType: "villa",
    tag: "Luxury"
  }
];

export const sampleActivities: Activity[] = [
  {
    id: "act-1",
    title: "Arrival & Check-in at The Palm House",
    description: "Settle into the villa, unpack, and enjoy fresh coconut welcome drinks by the pool.",
    category: "stay",
    dayNumber: 1,
    time: "02:00 PM",
    estimatedCost: 0,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-2",
    title: "Echo Beach Sunset & Seaside Dinner",
    description: "Catch world-class surfers and dine at a beachfront seafood barbecue under fairy lights.",
    category: "food",
    dayNumber: 1,
    time: "05:30 PM",
    estimatedCost: 2200,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-3",
    title: "Tegallalang Rice Terraces Walking Tour",
    description: "Morning guided walk along the ancient UNESCO subak irrigation waterways and lush rice terraces.",
    category: "sightseeing",
    dayNumber: 2,
    time: "08:30 AM",
    estimatedCost: 1500,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-4",
    title: "Traditional Balinese Herbal Spa Treatment",
    description: "A two-hour relaxing body scrub with fragrant spices and organic floral bath.",
    category: "relaxation",
    dayNumber: 2,
    time: "03:00 PM",
    estimatedCost: 3500,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-5",
    title: "Uluwatu Temple Cliff Walk & Kecak Fire Dance",
    description: "Perched 70 meters above sea cliff waves; experience the rhythmic hypnotic chanting performance at sunset.",
    category: "nature",
    dayNumber: 3,
    time: "04:45 PM",
    estimatedCost: 1800,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-6",
    title: "Private Sunset Catamaran Cruise",
    description: "Sail along the dramatic southern coastline with tropical refreshments and dolphin spotting.",
    category: "relaxation",
    dayNumber: 3,
    time: "05:15 PM",
    estimatedCost: 5500,
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-7",
    title: "Organic Farm Brunch & Artisan Coffee Tasting",
    description: "Savor freshly picked tropical fruit bowls and single-origin Kintamani pour-over coffee.",
    category: "food",
    dayNumber: 4,
    time: "10:00 AM",
    estimatedCost: 1200,
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "act-8",
    title: "Airport Transfer & Souvenir Market",
    description: "Pick up hand-woven rattan baskets and handcrafted Balinese ceramics on the way to Ngurah Rai Airport.",
    category: "transport",
    dayNumber: 4,
    time: "02:00 PM",
    estimatedCost: 1000
  }
];

export const sampleTestimonials = [
  {
    id: "t-1",
    author: "Ananya Mehta",
    role: "Travel Blogger & Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "TripMate made planning our anniversary trip across Kyoto and Bali completely effortless. The design is gorgeous and finding unique machiyas was an absolute joy.",
    rating: 5
  },
  {
    id: "t-2",
    author: "Liam O'Connor",
    role: "Outdoor Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "Being able to assemble my day-by-day mountain hikes in Manali and save stays without being overwhelmed by ad banners felt like a breath of fresh air.",
    rating: 5
  },
  {
    id: "t-3",
    author: "Camille Dupont",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    quote: "The visual curation and editorial feel rival high-end travel magazines. Truly the benchmark for what modern trip planning software should look like.",
    rating: 5
  }
];

