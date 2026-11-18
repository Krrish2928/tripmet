import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: "dest-bali",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    shortDescription: "Sun-drenched beaches, emerald rice terraces, and tranquil sacred temples.",
    description: "Bali is Indonesia's crown jewel, offering a harmonious blend of spiritual heritage, world-class surf breaks, lush rainforest canopies, and vibrant beach clubs. Whether exploring Ubud's serene yoga havens or Uluwatu's dramatic coastal cliffs, Bali captivates every traveler.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Beaches", "Wellness", "Culture", "Surfing"],
    bestFor: ["Couples", "Solo Travelers", "Wellness Seekers"],
    bestTimeToVisit: "April to October (Dry Season with cool coastal breezes)",
    highlights: ["Tegallalang Rice Terraces", "Uluwatu Cliff Temple", "Seminyak Beach Sunsets", "Mount Batur Sunrise Trek"],
    popularAreas: ["Ubud", "Canggu", "Seminyak", "Uluwatu", "Nusa Penida"],
    featuredStayIds: ["stay-bali-1", "stay-bali-2", "stay-bali-3"]
  },
  {
    id: "dest-kyoto",
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    shortDescription: "Ancient wooden temples, sublime Zen rock gardens, and lantern-lit geisha alleys.",
    description: "Kyoto served as Japan's imperial capital for over a millennium. Today it preserves timeless traditions with thousand-year-old shrines, quiet matcha teahouses, and serene bamboo groves that contrast gently with refined culinary craftsmanship.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["History", "Gardens", "Tea Culture", "Architecture"],
    bestFor: ["Culture Lovers", "Photographers", "Architecture Enthusiasts"],
    bestTimeToVisit: "March to May (Cherry Blossoms) or October to November (Autumn foliage)",
    highlights: ["Fushimi Inari-taisha Torii Gates", "Arashiyama Bamboo Grove", "Kinkaku-ji Golden Pavilion", "Gion Historic District"],
    popularAreas: ["Gion", "Arashiyama", "Higashiyama", "Downtown Kyoto"],
    featuredStayIds: ["stay-kyoto-1", "stay-kyoto-2"]
  },
  {
    id: "dest-paris",
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Western Europe",
    shortDescription: "Iconic boulevards, world-class art museums, sidewalk bistros, and romantic river walks.",
    description: "The City of Light remains one of the world's most enduring destinations for art, fashion, gastronomy, and culture. Stroll along the Seine, admire centuries of masterpieces in the Louvre and Musée d'Orsay, and linger over warm café au lait in Saint-Germain.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520939817895-060bdef4ad1b?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Romance", "Museums", "Dining", "Fashion"],
    bestFor: ["Couples", "Art Lovers", "Foodies"],
    bestTimeToVisit: "June to August (Warm outdoors) or September to October (Crisp autumn days)",
    highlights: ["Eiffel Tower & Champ de Mars", "Musée du Louvre", "Montmartre & Sacré-Cœur", "Seine River Sunset Cruises"],
    popularAreas: ["Le Marais", "Saint-Germain-des-Prés", "Montmartre", "Latin Quarter"],
    featuredStayIds: ["stay-paris-1", "stay-paris-2"]
  },
  {
    id: "dest-manali",
    slug: "manali",
    name: "Manali",
    country: "India",
    region: "Himachal Pradesh",
    shortDescription: "Pine-clad alpine valleys, snow-capped Himalayan peaks, and refreshing mountain streams.",
    description: "Perched high in the Beas River Valley, Manali offers a gateway to Himalayan adventure and tranquil mountain solitudes. From charming Old Manali wooden cafes to the high mountain pass of Rohtang, it is a haven for wanderers and nature lovers.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Mountains", "Adventure", "Nature", "Hiking"],
    bestFor: ["Nature Seekers", "Trekkers", "Budget Travelers"],
    bestTimeToVisit: "March to June for pleasant weather; December to February for snow",
    highlights: ["Solang Valley Adventure Sports", "Rohtang Pass", "Old Manali Cafes", "Hadimba Temple Forest"],
    popularAreas: ["Old Manali", "Vashisht", "Naggar", "Aleo"],
    featuredStayIds: ["stay-manali-1", "stay-manali-2"]
  },
  {
    id: "dest-jaipur",
    slug: "jaipur",
    name: "Jaipur",
    country: "India",
    region: "Rajasthan",
    shortDescription: "The Pink City of majestic royal forts, pink sandstone palaces, and lively gemstone bazaars.",
    description: "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is a living tapestry of royal grandeur. Elaborate palaces like Hawa Mahal and the sprawling hilltop Amer Fort rise alongside vibrant artisan bazaars brimming with textiles and silver jewelry.",
    heroImage: "https://images.unsplash.com/photo-1603262110263-fb010d6e59d4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603262110263-fb010d6e59d4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Royal Heritage", "Architecture", "Shopping", "Food"],
    bestFor: ["History Buffs", "Textile & Craft Lovers", "Families"],
    bestTimeToVisit: "October to March (Pleasant dry winter months)",
    highlights: ["Amer Fort Sunset", "Hawa Mahal (Palace of Winds)", "City Palace", "Johari Bazaar Crafts"],
    popularAreas: ["Old Walled City", "Civil Lines", "C-Scheme", "Amer"],
    featuredStayIds: ["stay-jaipur-1", "stay-jaipur-2"]
  },
  {
    id: "dest-amalfi",
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Campania",
    shortDescription: "Dramatic pastel cliffs dropping into turquoise Mediterranean waters and fragrant lemon groves.",
    description: "Stretching along the southern edge of Italy's Sorrentine Peninsula, the Amalfi Coast is renowned for its sheer cliffs, picturesque pastel villages clinging to steep rockfaces, and sparkling Mediterranean vistas lined with fragrant lemon orchards.",
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["Coastline", "Scenic Views", "Luxury", "Wine & Dine"],
    bestFor: ["Honeymooners", "Scenic Roadtrips", "Luxury Seekers"],
    bestTimeToVisit: "May to September for warm sea swimming and vibrant coastal life",
    highlights: ["Positano Cliffside Walk", "Path of the Gods Hiking Trail", "Ravello Gardens & Villa Cimbrone", "Capri Day Cruises"],
    popularAreas: ["Positano", "Amalfi Town", "Ravello", "Praiano"],
    featuredStayIds: ["stay-amalfi-1", "stay-amalfi-2"]
  }
];

