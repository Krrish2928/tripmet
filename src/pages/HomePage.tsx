import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Heart,
  MapPin,
  Sparkles,
  Search,
  Quote
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { stays } from '../data/stays';
import { collections, sampleTestimonials } from '../data/otherData';
import { SearchPanel } from '../components/travel/SearchPanel';
import { DestinationCard } from '../components/travel/DestinationCard';
import { StayCard } from '../components/travel/StayCard';
import { StayDetailModal } from '../components/travel/StayDetailModal';
import { Stay } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  const featuredStays = stays.filter((s) => s.featured).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
            alt="Scenic mountain landscape"
            className="w-full h-full object-cover brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[#FAF9F6]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium border border-white/20 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA66A]" />
            <span>Discover boutique retreats and plan your next journey</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md leading-[1.12]">
            Find your place.<br />
            <span className="italic font-normal text-[#E8F1EC]">Plan your escape.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed font-normal drop-shadow-sm">
            Discover stays worth traveling for and bring every part of your trip together — from curated local destinations to effortless day-by-day itineraries.
          </p>

          {/* Prominent Search Panel */}
          <div className="pt-4 max-w-4xl mx-auto">
            <SearchPanel />
          </div>

          {/* Quick Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-white/90">
            <span className="font-semibold text-white">Popular right now:</span>
            {["Bali Villas", "Kyoto Machiya", "Paris Stays", "Himalayan Cabins"].map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/explore?destination=${encodeURIComponent(term.split(' ')[0])}`)}
                className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md hover:bg-white/30 transition-colors border border-white/10"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#1F6B57] mb-1">
              Curated Escapes
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              Popular Destinations
            </h2>
            <p className="text-sm text-[#707873] mt-1">
              Immerse yourself in legendary cultural capitals and peaceful natural sanctuaries.
            </p>
          </div>
          <Link
            to="/explore?tab=destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F6B57] hover:text-[#185343] group"
          >
            <span>View all destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Curated Travel Collections */}
      <section className="bg-[#E8F1EC]/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#1F6B57] mb-1">
              Themed Wanderlust
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              Curated Travel Collections
            </h2>
            <p className="text-sm text-[#707873] mt-1">
              Hand-picked property types tailored to your preferred travel style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                onClick={() => {
                  if (col.filterType) {
                    navigate(`/explore?type=${col.filterType}`);
                  } else {
                    navigate('/explore');
                  }
                }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#DDA66A] mb-1">
                    {col.tag}
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-1 leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Boutique Stays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#1F6B57] mb-1">
              Featured Stays
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              Places to Stay Worth Traveling For
            </h2>
            <p className="text-sm text-[#707873] mt-1">
              Sample handpicked private villas, boutique heritage townhouses, and scenic cliff hotels.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F6B57] hover:text-[#185343] group"
          >
            <span>Browse all stays</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStays.map((stay) => (
            <StayCard
              key={stay.id}
              stay={stay}
              onSelectStay={(s) => setSelectedStay(s)}
            />
          ))}
        </div>
      </section>

      {/* How TripMate Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E8E8E2] p-8 sm:p-14 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase font-bold tracking-wider text-[#1F6B57] mb-1">
              Simple & Intuitive
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              How TripMate Works
            </h2>
            <p className="text-sm text-[#707873] mt-2">
              Transform overwhelming travel tabs and chaotic notes into a clean, peaceful planning sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
            {/* Step 1 */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-xs">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1D2925]">Discover Destinations</h3>
              <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
                Explore editorial destination guides, local neighborhood highlights, and curated stay collections tailored to your aesthetic.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-xs">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1D2925]">Save Stays & Escapes</h3>
              <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
                Bookmark memorable villas, traditional machiyas, and alpine retreats into your persistent wishlist with a single click.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-xs">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1D2925]">Build Your Itinerary</h3>
              <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
                Organize activities, dining spots, and check-ins day by day in the interactive Planner. Everything stays saved in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs uppercase font-bold tracking-wider text-[#DDA66A] mb-1">
            Traveler Voices
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1D2925]">
            Loved by Mindful Wanderers
          </h2>
          <p className="text-xs text-[#707873] mt-1 italic">
            Illustrative demo feedback from fictional passionate travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sampleTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-[#E8E8E2] p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#1F6B57]/40" />
                <p className="text-sm text-[#1D2925] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#E8E8E2] mt-6">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-[#1D2925]">{t.author}</div>
                  <div className="text-xs text-[#707873]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1F6B57] text-white p-10 sm:p-16 text-center space-y-6 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <h2 className="relative z-10 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Ready to craft your next unforgettable trip?
          </h2>
          <p className="relative z-10 max-w-xl mx-auto text-sm sm:text-base text-white/90">
            Start assembling your dream itinerary today with curated stays, activities, and local guides right at your fingertips.
          </p>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="px-7 py-3.5 rounded-full bg-white text-[#1F6B57] text-sm font-bold hover:bg-[#FAF9F6] shadow-lg transition-all active:scale-95"
            >
              Explore All Stays
            </Link>
            <Link
              to="/planner"
              className="px-7 py-3.5 rounded-full bg-[#185343] text-white text-sm font-semibold hover:bg-[#123e32] border border-white/20 transition-all active:scale-95"
            >
              Open Trip Planner
            </Link>
          </div>
        </div>
      </section>

      {/* Stay Detail Modal */}
      <StayDetailModal
        stay={selectedStay}
        isOpen={Boolean(selectedStay)}
        onClose={() => setSelectedStay(null)}
      />
    </div>
  );
};

