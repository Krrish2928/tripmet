import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Heart,
  Calendar,
  Compass,
  ArrowLeft,
  Sparkles,
  Check,
  Sun,
  PlusCircle,
  Eye
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { stays } from '../data/stays';
import { useApp } from '../context/AppContext';
import { StayCard } from '../components/travel/StayCard';
import { StayDetailModal } from '../components/travel/StayDetailModal';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Stay } from '../types';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave, activeTrip, addActivityToTrip, showToast } = useApp();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <Compass className="w-16 h-16 text-[#1F6B57] mx-auto opacity-50" />
        <h1 className="font-serif text-3xl font-bold text-[#1D2925]">
          Destination Not Found
        </h1>
        <p className="text-sm text-[#707873]">
          The destination you're looking for does not exist in our curated collection.
        </p>
        <Link
          to="/explore?tab=destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F6B57] text-white text-sm font-semibold shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Destinations</span>
        </Link>
      </div>
    );
  }

  const saved = isSaved(destination.id);

  // Stays for this destination
  const destinationStays = stays.filter((s) => s.destinationId === destination.id);

  const handleAddDestinationToTrip = () => {
    if (!activeTrip) {
      showToast("Create a trip first in Trip Planner!", 'info');
      navigate('/planner');
      return;
    }

    addActivityToTrip(activeTrip.id, {
      title: `Explore ${destination.name}`,
      description: `Arrive and begin discovering key highlights in ${destination.name}: ${destination.highlights[0]}`,
      category: 'sightseeing',
      dayNumber: 1,
      time: '10:00 AM',
      estimatedCost: 1500,
      image: destination.heroImage
    });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-end pb-12 pt-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover brightness-[0.75]"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D2925] via-black/30 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4 text-white">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/explore?tab=destinations" className="hover:underline">Destinations</Link>
            <span>/</span>
            <span className="text-[#DDA66A]">{destination.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2 border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#DDA66A]" />
                <span>{destination.country} • {destination.region}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
                {destination.name}
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSave(destination.id, 'destination', destination.name)}
                className={`px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-md transition-all active:scale-95 cursor-pointer ${
                  saved
                    ? 'bg-[#1F6B57] text-white'
                    : 'bg-white/90 text-[#1D2925] hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                <span>{saved ? "Saved in Wishlist" : "Save Destination"}</span>
              </button>

              <button
                onClick={handleAddDestinationToTrip}
                className="px-6 py-3 rounded-full bg-[#DDA66A] hover:bg-[#C99559] text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add to Trip Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Editorial Story & Highlights */}
          <div className="lg:col-span-2 space-y-10">
            {/* Editorial Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D2925]">
                About {destination.name}
              </h2>
              <p className="text-base sm:text-lg text-[#1D2925] leading-relaxed font-light">
                {destination.description}
              </p>
            </div>

            {/* Best For Tags & Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E2]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1D2925] mb-3">
                  Best Suited For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] text-xs font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#1D2925] mb-3">
                  Experience Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E8E2] text-xs font-medium text-[#707873]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated Highlights List */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1D2925]">
                Must-Experience Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E8E8E2]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1D2925]">{highlight}</h4>
                      <p className="text-xs text-[#707873] mt-0.5">Top-recommended local landmark</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1D2925]">
                Destination Gallery
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {destination.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${destination.name} ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Key Travel Info & Popular Neighborhoods */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Best Time to Visit Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E8E2] space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E8E8E2] flex items-center justify-center text-[#DDA66A]">
                  <Sun className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#707873]">
                    Seasonal Insight
                  </h4>
                  <span className="text-sm font-bold text-[#1D2925]">Best Time to Visit</span>
                </div>
              </div>
              <p className="text-xs text-[#707873] leading-relaxed">
                {destination.bestTimeToVisit}
              </p>
            </div>

            {/* Popular Neighborhoods */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E8E2] space-y-4 shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#1D2925]">
                Popular Neighborhoods
              </h4>
              <ul className="space-y-2">
                {destination.popularAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 border-b border-[#FAF9F6] last:border-0"
                  >
                    <span className="font-medium text-[#1D2925]">{area}</span>
                    <span className="text-[#707873] text-[11px]">Popular area</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Link to Planner */}
            <div className="p-6 rounded-3xl bg-[#1F6B57] text-white space-y-4 shadow-md">
              <Sparkles className="w-6 h-6 text-[#DDA66A]" />
              <h4 className="font-serif text-lg font-bold">
                Planning a trip to {destination.name}?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Jump right into the Planner to schedule daily beach visits, temple tours, and restaurant bookings.
              </p>
              <Link
                to="/planner"
                className="block w-full text-center py-2.5 rounded-full bg-white text-[#1F6B57] text-xs font-bold hover:bg-[#FAF9F6] transition-colors"
              >
                Open Itinerary Planner
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured Stays in this destination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D2925]">
              Featured Stays in {destination.name}
            </h2>
            <p className="text-xs text-[#707873] mt-1">
              Sample handpicked villas, boutique hotels, and guesthouses.
            </p>
          </div>
          <Link
            to={`/explore?destination=${encodeURIComponent(destination.name)}`}
            className="text-xs font-bold text-[#1F6B57] hover:underline"
          >
            View all ({destinationStays.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationStays.map((stay) => (
            <StayCard
              key={stay.id}
              stay={stay}
              onSelectStay={(s) => setSelectedStay(s)}
            />
          ))}
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

