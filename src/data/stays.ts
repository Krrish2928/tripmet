import { Stay } from '../types';

export const stays: Stay[] = [
  {
    id: "stay-bali-1",
    slug: "the-palm-house-bali",
    name: "The Palm House Retreat",
    destinationId: "dest-bali",
    destinationName: "Bali",
    country: "Indonesia",
    propertyType: "villa",
    description: "An architecturally stunning private sanctuary amidst Canggu's serene rice paddies, complete with an Olympic-size infinity pool, open-concept bamboo pavilion, and dedicated private chef.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 14500,
    currency: "INR",
    rating: 4.95,
    reviewCount: 128,
    amenities: ["Wi-Fi", "Private Pool", "Breakfast", "Air conditioning", "Spa", "Free parking"],
    guestCapacity: 6,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Echo Beach Road, Canggu, Bali 80361",
    roomSummary: "3 King Bedrooms with ensuite tropical open-air stone bathrooms, terrace, and private infinity pool.",
    reviews: [
      {
        id: "rev-b1-1",
        author: "Priya S.",
        date: "October 2026",
        rating: 5,
        comment: "Waking up to the palm breeze and having fresh tropical breakfast served poolside was sublime. True five-star tranquility."
      },
      {
        id: "rev-b1-2",
        author: "Marcus Vance",
        date: "September 2026",
        rating: 5,
        comment: "The architecture is even more stunning than photos can capture. Perfect Canggu location just minutes from surf."
      }
    ]
  },
  {
    id: "stay-bali-2",
    slug: "ubud-garden-retreat",
    name: "Ubud Garden Rainforest Sanctuary",
    destinationId: "dest-bali",
    destinationName: "Bali",
    country: "Indonesia",
    propertyType: "resort",
    description: "Immerse yourself in jungle mist and cascading river sounds. Featuring treehouse suites, organic farm-to-table dining, and complimentary sunrise yoga sessions.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 9800,
    currency: "INR",
    rating: 4.88,
    reviewCount: 94,
    amenities: ["Wi-Fi", "Pool", "Breakfast", "Spa", "Yoga Deck", "Air conditioning"],
    guestCapacity: 2,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Jl. Raya Sayan, Ubud, Gianyar, Bali 80571",
    roomSummary: "Riverview Suite with teakwood balcony, outdoor soaking tub, and valley views.",
    reviews: [
      {
        id: "rev-b2-1",
        author: "Elena Rostova",
        date: "August 2026",
        rating: 5,
        comment: "The sounds of the Ayung river and jungle birds made this the most restorative stay of my life."
      }
    ]
  },
  {
    id: "stay-bali-3",
    slug: "uluwatu-cliff-suites",
    name: "Uluwatu Sunset Ocean Suites",
    destinationId: "dest-bali",
    destinationName: "Bali",
    country: "Indonesia",
    propertyType: "hotel",
    description: "Perched high on dramatic limestone cliffs overlooking the azure Indian Ocean. World-class sunset views, infinity edge cocktail bar, and private funicular access to the beach.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 16200,
    currency: "INR",
    rating: 4.92,
    reviewCount: 76,
    amenities: ["Wi-Fi", "Pool", "Breakfast", "Air conditioning", "Bar", "Spa"],
    guestCapacity: 3,
    freeCancellation: false,
    featured: false,
    sampleListing: true,
    address: "Jl. Pantai Suluban, Pecatu, Uluwatu, Bali 80361",
    roomSummary: "Oceanfront Deluxe with panorama floor-to-ceiling glass and private plunge pool.",
    reviews: []
  },
  {
    id: "stay-kyoto-1",
    slug: "kyoto-lantern-machiya",
    name: "Kyoto Lantern Traditional Machiya",
    destinationId: "dest-kyoto",
    destinationName: "Kyoto",
    country: "Japan",
    propertyType: "guesthouse",
    description: "A restored 110-year-old traditional wooden machiya townhouse featuring fragrant tatami mats, cedar wood ofuro bath, and a private enclosed stone Zen garden.",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 12400,
    currency: "INR",
    rating: 4.96,
    reviewCount: 112,
    amenities: ["Wi-Fi", "Japanese Tea Set", "Air conditioning", "Zen Garden", "Hinoki Wood Bath"],
    guestCapacity: 4,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Miyagawacho, Higashiyama-ku, Kyoto 605-0801",
    roomSummary: "Full historic 2-story machiya townhouse with 2 tatami rooms, futon bedding, kitchen, and courtyard.",
    reviews: [
      {
        id: "rev-k1-1",
        author: "Kenji Sato",
        date: "November 2026",
        rating: 5,
        comment: "An authentic, deeply atmospheric Kyoto experience. Walking to Gion teahouses at dusk was magical."
      }
    ]
  },
  {
    id: "stay-kyoto-2",
    slug: "kamogawa-botanical-hotel",
    name: "Kamogawa Riverside Modern Hotel",
    destinationId: "dest-kyoto",
    destinationName: "Kyoto",
    country: "Japan",
    propertyType: "hotel",
    description: "Minimalist Scandinavian-Japanese aesthetic overlooking the gentle Kamo River. Locally roasted pour-over coffee bar, complimentary bicycle rental, and serene light-filled lounge.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 10900,
    currency: "INR",
    rating: 4.82,
    reviewCount: 88,
    amenities: ["Wi-Fi", "Breakfast", "Bicycle Rental", "Air conditioning", "Work Desk"],
    guestCapacity: 2,
    freeCancellation: true,
    featured: false,
    sampleListing: true,
    address: "Kawabata-dori, Nakagyo-ku, Kyoto 604-0924",
    roomSummary: "Riverside King with custom white-oak woodwork and panoramic balcony.",
    reviews: []
  },
  {
    id: "stay-paris-1",
    slug: "riverstone-boutique-hotel",
    name: "Riverstone Boutique Hotel Saint-Germain",
    destinationId: "dest-paris",
    destinationName: "Paris",
    country: "France",
    propertyType: "hotel",
    description: "Quintessential Parisian elegance nestled in a Haussmannian jewel steps from the Luxembourg Gardens. French wrought-iron balconies, chevron oak parquetry, and curated vintage art.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 18500,
    currency: "INR",
    rating: 4.89,
    reviewCount: 165,
    amenities: ["Wi-Fi", "Breakfast", "Air conditioning", "Elevator", "Concierge", "Espresso Bar"],
    guestCapacity: 2,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Rue de Seine, 6th Arrondissement, 75006 Paris",
    roomSummary: "Classic Parisian Deluxe Room with balcony overlooking classic zinc rooftops.",
    reviews: [
      {
        id: "rev-p1-1",
        author: "Sophie Laurent",
        date: "September 2026",
        rating: 5,
        comment: "Fresh croissants delivered to the room every morning, steps away from our favorite cafes on Boulevard Saint-Germain."
      }
    ]
  },
  {
    id: "stay-paris-2",
    slug: "le-marais-loft-apartment",
    name: "Le Marais Designer Studio Loft",
    destinationId: "dest-paris",
    destinationName: "Paris",
    country: "France",
    propertyType: "apartment",
    description: "Exposed 17th-century wooden beams meet modern minimalist furnishings in the trendiest art district of Paris. Walkable to boutique bakeries, art galleries, and Place des Vosges.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 13900,
    currency: "INR",
    rating: 4.85,
    reviewCount: 73,
    amenities: ["Wi-Fi", "Kitchen", "Washing Machine", "Air conditioning", "Espresso Maker"],
    guestCapacity: 3,
    freeCancellation: false,
    featured: false,
    sampleListing: true,
    address: "Rue des Rosiers, 4th Arrondissement, 75004 Paris",
    roomSummary: "Entire loft apartment with mezzanine sleeping area and custom stainless steel kitchen.",
    reviews: []
  },
  {
    id: "stay-manali-1",
    slug: "pine-and-peak-lodge",
    name: "Pine & Peak Alpine Mountain Lodge",
    destinationId: "dest-manali",
    destinationName: "Manali",
    country: "India",
    propertyType: "resort",
    description: "Surrounded by towering deodar forests with unobstructed snow-capped Himalayan vistas. Cosy stone fireplaces, cedarwood paneling, heated down duvets, and stargazing telescope deck.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 7200,
    currency: "INR",
    rating: 4.91,
    reviewCount: 140,
    amenities: ["Wi-Fi", "Fireplace", "Breakfast", "Mountain View", "Heating", "Free parking"],
    guestCapacity: 4,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Upper Log Huts Road, Old Manali, HP 175131",
    roomSummary: "Duplex Cedar Chalet with wood-burning fireplace and panoramic valley balcony.",
    reviews: [
      {
        id: "rev-m1-1",
        author: "Aman Chopra",
        date: "October 2026",
        rating: 5,
        comment: "Sitting by the stone fireplace sipping hot spiced cider while snow fell outside was unforgettable."
      }
    ]
  },
  {
    id: "stay-manali-2",
    slug: "solang-valley-wood-cabin",
    name: "Solang Valley Riverside Wood Cabin",
    destinationId: "dest-manali",
    destinationName: "Manali",
    country: "India",
    propertyType: "guesthouse",
    description: "Rustic yet comfortable riverside wooden retreat. Ideal for travelers looking for peaceful apple orchard walks, fresh trout barbeque, and direct trail access.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 4800,
    currency: "INR",
    rating: 4.79,
    reviewCount: 62,
    amenities: ["Wi-Fi", "Breakfast", "Heating", "Free parking", "Garden"],
    guestCapacity: 3,
    freeCancellation: true,
    featured: false,
    sampleListing: true,
    address: "Palchan, Near Solang Valley, Manali, HP 175103",
    roomSummary: "Private log cabin cottage in an organic apple orchard.",
    reviews: []
  },
  {
    id: "stay-jaipur-1",
    slug: "the-pink-courtyard-haveli",
    name: "The Pink Courtyard Heritage Haveli",
    destinationId: "dest-jaipur",
    destinationName: "Jaipur",
    country: "India",
    propertyType: "hotel",
    description: "A meticulously restored 19th-century royal Rajput haveli. Intricate jharokha marble balconies, hand-painted frescoes, a courtyard fountain pool, and classical sitar evenings under the stars.",
    images: [
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603262110263-fb010d6e59d4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 8500,
    currency: "INR",
    rating: 4.94,
    reviewCount: 184,
    amenities: ["Wi-Fi", "Pool", "Breakfast", "Air conditioning", "Spa", "Heritage Dining"],
    guestCapacity: 3,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Fateh Tiba, Moti Doongri Road, Jaipur, Rajasthan 302004",
    roomSummary: "Royal Heritage Suite with antique four-poster brass bed and traditional fresco walls.",
    reviews: [
      {
        id: "rev-j1-1",
        author: "Devika Roy",
        date: "November 2026",
        rating: 5,
        comment: "The hospitality was unmatched. Dining in the candlelit courtyard with live flute performance was royalty reborn."
      }
    ]
  },
  {
    id: "stay-jaipur-2",
    slug: "amer-fort-royal-villa",
    name: "Amer Fort Royal Hills Villa",
    destinationId: "dest-jaipur",
    destinationName: "Jaipur",
    country: "India",
    propertyType: "villa",
    description: "Set against the rugged Aravalli hills overlooking the ancient ramparts of Amer Fort. Private plunge pool, sandstone terrace, and curated royal Rajasthani banquet service.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 13500,
    currency: "INR",
    rating: 4.88,
    reviewCount: 47,
    amenities: ["Wi-Fi", "Private Pool", "Breakfast", "Air conditioning", "Free parking", "Mountain View"],
    guestCapacity: 6,
    freeCancellation: false,
    featured: false,
    sampleListing: true,
    address: "Kukas Valley, Amer, Jaipur 302028",
    roomSummary: "3-Bedroom private villa with rooftop plunge pool overlooking Amer ramparts.",
    reviews: []
  },
  {
    id: "stay-amalfi-1",
    slug: "amalfi-vista-rooms",
    name: "Amalfi Vista Cliffside Rooms & Suites",
    destinationId: "dest-amalfi",
    destinationName: "Amalfi Coast",
    country: "Italy",
    propertyType: "hotel",
    description: "Carved into the sheer rocks of Positano, featuring bougainvillea-draped private sun terraces, panoramic vistas of the sparkling Tyrrhenian Sea, and chilled limoncello upon arrival.",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 24500,
    currency: "INR",
    rating: 4.97,
    reviewCount: 156,
    amenities: ["Wi-Fi", "Sea View", "Breakfast", "Air conditioning", "Terrace", "Bar"],
    guestCapacity: 2,
    freeCancellation: true,
    featured: true,
    sampleListing: true,
    address: "Via Cristoforo Colombo, 84017 Positano, Salerno, Italy",
    roomSummary: "Panoramic Sea View Deluxe Room with private sunbeds and cliff balcony.",
    reviews: [
      {
        id: "rev-a1-1",
        author: "Julian Reynolds",
        date: "July 2026",
        rating: 5,
        comment: "Unreal view! Having breakfast on our private terrace overlooking Positano bay was a once-in-a-lifetime experience."
      }
    ]
  },
  {
    id: "stay-amalfi-2",
    slug: "ravello-lemon-grove-villa",
    name: "Ravello Lemon Grove Mediterranean Villa",
    destinationId: "dest-amalfi",
    destinationName: "Amalfi Coast",
    country: "Italy",
    propertyType: "villa",
    description: "Tranquil villa perched above the clouds in Ravello. Scented by centuries-old organic lemon groves with private pool, stone wood-fired pizza oven, and 180-degree ocean views.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 28000,
    currency: "INR",
    rating: 4.93,
    reviewCount: 39,
    amenities: ["Wi-Fi", "Private Pool", "Kitchen", "Free parking", "Sea View", "Air conditioning"],
    guestCapacity: 8,
    freeCancellation: false,
    featured: false,
    sampleListing: true,
    address: "Via San Francesco, 84010 Ravello, Salerno, Italy",
    roomSummary: "4-Bedroom luxury Mediterranean villa with private lemon orchard grounds.",
    reviews: []
  },
  {
    id: "stay-amalfi-3",
    slug: "positano-harbor-apartment",
    name: "Positano Harbor Cozy Flat",
    destinationId: "dest-amalfi",
    destinationName: "Amalfi Coast",
    country: "Italy",
    propertyType: "apartment",
    description: "A bright seaside apartment steps from Spiaggia Grande beach. Whitewashed walls, ceramic Vietri floor tiles, and instant access to Positano ferry docks and seafood trattorias.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
    ],
    pricePerNight: 16800,
    currency: "INR",
    rating: 4.81,
    reviewCount: 51,
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Beach Access"],
    guestCapacity: 4,
    freeCancellation: true,
    featured: false,
    sampleListing: true,
    address: "Piazza dei Mulini, 84017 Positano, Italy",
    roomSummary: "2-Bedroom seaside flat with direct beach walkway.",
    reviews: []
  }
];

