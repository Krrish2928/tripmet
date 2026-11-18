# TripMate — Travel Discovery & Trip Planning Web App

> **"Find your place. Plan your escape."**

TripMate is a frontend web application that blends editorial-grade travel discovery with an interactive day-by-day itinerary planner and persistent wishlist.

---

## ✨ Features & Pages

1. **Homepage (`/`)**:
   - Hero section with warm typography and responsive search panel (destination autocomplete, check-in/out dates, guest selector).
   - Popular Destinations grid with badges and direct links.
   - Curated collections (Beach Escapes, Mountain Lodges, Historic Gems, Private Villas).
   - Featured boutique stays with pricing and ratings.
   - Three-step "How TripMate Works" workflow and illustrative traveler testimonials.

2. **Explore & Search Results (`/explore`)**:
   - Live multi-criteria client-side filtering:
     - Search by destination or property name.
     - Price range slider (up to ₹30,000/night).
     - Property type (Villas, Resorts, Hotels, Guesthouses/Machiyas, Apartments).
     - Guest rating threshold (`★ 4.5+`, `★ 4.8+`, `★ 4.9+`).
     - Amenities (Private pool, Wi-Fi, Breakfast, Spa, Sea view, Mountain view, etc.).
     - Free cancellation toggle.
   - Multi-option sorting (Recommended, Price low/high, Highest rated, Most reviewed).
   - Active removable filter chips & clear-all button.
   - Responsive mobile filter drawer with instant item count.
   - Segmented toggle to switch between **Stays** and **Destination Guides**.

3. **Destination Detail (`/destination/:slug`)**:
   - Large hero banner, breadcrumbs, seasonal travel insights ("Best time to visit"), and key neighborhood highlights.
   - Curated highlights checklist and photo gallery grid.
   - Stays available in that specific destination.
   - Direct "Save Destination" and "Add to Trip Itinerary" action buttons.

4. **Interactive Stay Modal & Gallery Lightbox**:
   - Detailed property information, room configurations, capacity, and amenities list.
   - Photo carousel and full-screen image lightbox with previous/next controls.
   - "Add to Itinerary" dropdown with trip & day assignment.
   - Wishlist toggle.

5. **Trip Planner & Itinerary Builder (`/planner`)**:
   - Interactive day-by-day schedule with sample 4-day Bali escape.
   - Create new custom trips with customizable dates and travelers.
   - Add, edit, and delete activities with category tags, custom times, and estimated costs.
   - Move activities between different days with a single click.
   - Running budget calculator and trip notes editor.
   - Fully persistent via browser `localStorage` (`tripmate:trips:v1`).
   - One-click demo data reset button.

6. **Saved Wishlist (`/saved`)**:
   - Unified overview of all saved destinations, stays, and trip drafts.
   - Segmented tabs (All, Destinations, Stays, Trips) with live badges.
   - Immediate unsave/removal actions that sync globally across the app.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State & Storage**: React Context + Browser `localStorage` (defensive parsing and fallback defaults)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

