import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Calendar,
  Compass,
  Trash2,
  ArrowRight,
  Sparkles,
  MapPin,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { destinations } from '../data/destinations';
import { stays } from '../data/stays';
import { StayCard } from '../components/travel/StayCard';
import { DestinationCard } from '../components/travel/DestinationCard';
import { StayDetailModal } from '../components/travel/StayDetailModal';
import { Stay } from '../types';
import { formatDate } from '../utils/formatters';

export const SavedPage: React.FC = () => {
  const { savedItems, removeSaved, trips, setActiveTripId } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'destinations' | 'stays' | 'trips'>('all');
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  // Look up saved destinations
  const savedDestinations = destinations.filter((d) =>
    savedItems.some((item) => item.id === d.id && item.type === 'destination')
  );

  // Look up saved stays
  const savedStays = stays.filter((s) =>
    savedItems.some((item) => item.id === s.id && item.type === 'stay')
  );

  const totalCount = savedDestinations.length + savedStays.length + trips.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Segmented Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#1F6B57] mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#1F6B57]" />
            <span>Personal Wishlist</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
            Your Saved Places
          </h1>
          <p className="text-sm text-[#707873] mt-1">
            Revisit bookmarked villas, destination guides, and active trip drafts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-full bg-[#E8E8E2]/60 border border-[#E8E8E2] self-start sm:self-auto">
          {(['all', 'destinations', 'stays', 'trips'] as const).map((tab) => {
            const labels = {
              all: `All (${savedDestinations.length + savedStays.length + trips.length})`,
              destinations: `Destinations (${savedDestinations.length})`,
              stays: `Stays (${savedStays.length})`,
              trips: `Trips (${trips.length})`
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-[#1F6B57] shadow-xs'
                    : 'text-[#707873] hover:text-[#1D2925]'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      {totalCount === 0 ? (
        /* Empty State */
        <div className="text-center py-24 bg-white rounded-3xl border border-[#E8E8E2] p-8 space-y-4">
          <Heart className="w-16 h-16 text-[#1F6B57]/30 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#1D2925]">
            Your next favorite place starts here
          </h3>
          <p className="text-sm text-[#707873] max-w-md mx-auto leading-relaxed">
            You haven't saved any destinations or stays yet. Browse our curated collection and click the heart icon on any stay to bookmark it!
          </p>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F6B57] text-white text-xs font-semibold shadow-md shadow-[#1F6B57]/20 hover:bg-[#185343]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Stays & Places</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* TRIPS SECTION */}
          {(activeTab === 'all' || activeTab === 'trips') && trips.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2925] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1F6B57]" />
                  <span>Trip Drafts ({trips.length})</span>
                </h2>
                <Link to="/planner" className="text-xs font-semibold text-[#1F6B57] hover:underline">
                  Open Planner
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-3xl border border-[#E8E8E2] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#DDA66A]">
                        {trip.destinationName}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1D2925]">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-[#707873]">
                        {formatDate(trip.startDate)} – {formatDate(trip.endDate)} • {trip.guests} Guests
                      </p>
                      <div className="inline-block px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E8E8E2] text-xs font-medium text-[#1D2925] mt-2">
                        {trip.activities.length} Activities Planned
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E8E8E2] flex items-center justify-between">
                      <Link
                        to="/planner"
                        onClick={() => setActiveTripId(trip.id)}
                        className="text-xs font-bold text-[#1F6B57] hover:underline flex items-center gap-1"
                      >
                        <span>Continue planning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAYS SECTION */}
          {(activeTab === 'all' || activeTab === 'stays') && savedStays.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2925] flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#1F6B57]" />
                  <span>Saved Stays ({savedStays.length})</span>
                </h2>
                <Link to="/explore" className="text-xs font-semibold text-[#1F6B57] hover:underline">
                  Browse more stays
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedStays.map((stay) => (
                  <StayCard
                    key={stay.id}
                    stay={stay}
                    onSelectStay={(s) => setSelectedStay(s)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* DESTINATIONS SECTION */}
          {(activeTab === 'all' || activeTab === 'destinations') && savedDestinations.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2925] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1F6B57]" />
                  <span>Saved Destinations ({savedDestinations.length})</span>
                </h2>
                <Link to="/explore?tab=destinations" className="text-xs font-semibold text-[#1F6B57] hover:underline">
                  Browse all guides
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stay Detail Modal */}
      <StayDetailModal
        stay={selectedStay}
        isOpen={Boolean(selectedStay)}
        onClose={() => setSelectedStay(null)}
      />
    </div>
  );
};

