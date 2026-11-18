import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Search,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { stays } from '../data/stays';
import { destinations } from '../data/destinations';
import { Stay, StayPropertyType } from '../types';
import { StayCard } from '../components/travel/StayCard';
import { DestinationCard } from '../components/travel/DestinationCard';
import { StayDetailModal } from '../components/travel/StayDetailModal';
import { formatCurrency } from '../utils/formatters';

const ALL_AMENITIES = [
  "Wi-Fi",
  "Pool",
  "Private Pool",
  "Breakfast",
  "Air conditioning",
  "Spa",
  "Kitchen",
  "Sea View",
  "Mountain View",
  "Free parking"
];

const PROPERTY_TYPES: { label: string; value: StayPropertyType }[] = [
  { label: "Villas", value: "villa" },
  { label: "Resorts", value: "resort" },
  { label: "Hotels", value: "hotel" },
  { label: "Guesthouses & Machiya", value: "guesthouse" },
  { label: "Apartments", value: "apartment" }
];

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view: 'stays' or 'destinations'
  const activeTab = searchParams.get('tab') === 'destinations' ? 'destinations' : 'stays';

  // Filters state
  const destinationParam = searchParams.get('destination') || '';
  const typeParam = searchParams.get('type') || '';
  const guestsParam = searchParams.get('guests') ? Number(searchParams.get('guests')) : 1;

  const [searchQuery, setSearchQuery] = useState(destinationParam);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(typeParam ? [typeParam] : []);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState<boolean>(false);
  const [guestCapacity, setGuestCapacity] = useState<number>(guestsParam || 1);
  const [sortBy, setSortBy] = useState<string>('recommended');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    if (destinationParam) setSearchQuery(destinationParam);
    if (typeParam && !selectedTypes.includes(typeParam)) setSelectedTypes([typeParam]);
  }, [destinationParam, typeParam]);

  // Handle active filter tags
  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setMaxPrice(30000);
    setMinRating(0);
    setSelectedAmenities([]);
    setFreeCancellationOnly(false);
    setGuestCapacity(1);
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filtered Stays calculation
  const filteredStays = useMemo(() => {
    let result = stays.filter((stay) => {
      // Destination or query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = stay.name.toLowerCase().includes(q);
        const matchesDest = stay.destinationName.toLowerCase().includes(q);
        const matchesCountry = stay.country.toLowerCase().includes(q);
        if (!matchesName && !matchesDest && !matchesCountry) return false;
      }

      // Property type
      if (selectedTypes.length > 0 && !selectedTypes.includes(stay.propertyType)) {
        return false;
      }

      // Max price
      if (stay.pricePerNight > maxPrice) {
        return false;
      }

      // Rating
      if (minRating > 0 && stay.rating < minRating) {
        return false;
      }

      // Guest capacity
      if (stay.guestCapacity < guestCapacity) {
        return false;
      }

      // Free cancellation
      if (freeCancellationOnly && !stay.freeCancellation) {
        return false;
      }

      // Amenities (must have ALL selected)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          stay.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [
    searchQuery,
    selectedTypes,
    maxPrice,
    minRating,
    selectedAmenities,
    freeCancellationOnly,
    guestCapacity,
    sortBy
  ]);

  // Filtered Destinations for tab=destinations
  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return destinations;
    const q = searchQuery.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    selectedTypes.length +
    (maxPrice < 30000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedAmenities.length +
    (freeCancellationOnly ? 1 : 0) +
    (guestCapacity > 1 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D2925]">
              Explore Places & Stays
            </h1>
            <p className="text-sm text-[#707873] mt-1">
              Filter sample boutique properties across hand-picked destinations worldwide.
            </p>
          </div>

          {/* Segmented View Switcher */}
          <div className="inline-flex p-1 rounded-full bg-[#E8E8E2]/60 border border-[#E8E8E2] self-start sm:self-auto">
            <button
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.delete('tab');
                setSearchParams(p);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'stays'
                  ? 'bg-white text-[#1F6B57] shadow-xs'
                  : 'text-[#707873] hover:text-[#1D2925]'
              }`}
            >
              Stays & Hotels ({stays.length})
            </button>
            <button
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.set('tab', 'destinations');
                setSearchParams(p);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'destinations'
                  ? 'bg-white text-[#1F6B57] shadow-xs'
                  : 'text-[#707873] hover:text-[#1D2925]'
              }`}
            >
              Destinations ({destinations.length})
            </button>
          </div>
        </div>

        {/* Global Search Strip */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#E8E8E2] shadow-xs">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Search className="w-5 h-5 text-[#1F6B57] shrink-0" />
            <input
              type="text"
              placeholder="Search by destination (e.g. Bali, Kyoto, Paris) or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm font-medium text-[#1D2925] placeholder:text-[#A0A7A3] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#707873] hover:bg-[#F3F3EE]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E8E8E2] text-xs font-semibold text-[#1D2925]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#1F6B57]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#1F6B57] text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[#707873] font-medium">Applied Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                "{searchQuery}"
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedTypes.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium capitalize">
                {t}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleToggleType(t)} />
              </span>
            ))}
            {maxPrice < 30000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                Under {formatCurrency(maxPrice)}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMaxPrice(30000)} />
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                ★ {minRating}+
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}
            {selectedAmenities.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                {a}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleToggleAmenity(a)} />
              </span>
            ))}
            {freeCancellationOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                Free Cancellation
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFreeCancellationOnly(false)} />
              </span>
            )}
            {guestCapacity > 1 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-medium">
                {guestCapacity}+ Guests
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setGuestCapacity(1)} />
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-[#B54747] hover:underline font-semibold ml-2 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Layout Area */}
      {activeTab === 'destinations' ? (
        /* DESTINATIONS GRID VIEW */
        <div className="space-y-6">
          <div className="text-sm text-[#707873]">
            Showing <strong>{filteredDestinations.length}</strong> destination guides
          </div>
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E8E2] p-8 space-y-4">
              <Sparkles className="w-12 h-12 text-[#1F6B57] mx-auto opacity-40" />
              <h3 className="font-serif text-2xl font-bold text-[#1D2925]">No destinations found</h3>
              <p className="text-sm text-[#707873] max-w-md mx-auto">
                No destination matching "{searchQuery}". Try exploring Bali, Kyoto, Paris, Manali, Jaipur, or Amalfi Coast!
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2.5 rounded-full bg-[#1F6B57] text-white text-xs font-semibold"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      ) : (
        /* STAYS VIEW WITH SIDEBAR FILTERS */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-3xl border border-[#E8E8E2] space-y-6 shadow-xs sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E2]">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#1D2925]">
                <SlidersHorizontal className="w-4 h-4 text-[#1F6B57]" />
                <span>Filters</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#B54747] hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block">
                Max Price per Night
              </label>
              <div className="flex items-center justify-between text-sm font-bold text-[#1D2925]">
                <span>₹2,000</span>
                <span className="text-[#1F6B57]">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1F6B57] cursor-pointer"
              />
            </div>

            {/* Property Types */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block">
                Property Type
              </label>
              <div className="space-y-2">
                {PROPERTY_TYPES.map((pt) => {
                  const isChecked = selectedTypes.includes(pt.value);
                  return (
                    <label
                      key={pt.value}
                      className="flex items-center gap-2.5 text-xs text-[#1D2925] cursor-pointer hover:text-[#1F6B57]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleType(pt.value)}
                        className="rounded border-[#E8E8E2] text-[#1F6B57] focus:ring-[#1F6B57]"
                      />
                      <span>{pt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block">
                Minimum Rating
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    type="button"
                    onClick={() => setMinRating(ratingVal)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      minRating === ratingVal
                        ? 'bg-[#1F6B57] text-white border-[#1F6B57]'
                        : 'bg-[#FAF9F6] border-[#E8E8E2] text-[#1D2925] hover:border-[#1F6B57]'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : `★ ${ratingVal}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Capacity */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block">
                Min Guests Capacity
              </label>
              <select
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-xl border border-[#E8E8E2] bg-[#FAF9F6] font-medium"
              >
                <option value={1}>1+ Guests</option>
                <option value={2}>2+ Guests</option>
                <option value={4}>4+ Guests</option>
                <option value={6}>6+ Guests</option>
              </select>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block">
                Amenities
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ALL_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className="flex items-center gap-2.5 text-xs text-[#1D2925] cursor-pointer hover:text-[#1F6B57]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleAmenity(amenity)}
                        className="rounded border-[#E8E8E2] text-[#1F6B57] focus:ring-[#1F6B57]"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Free Cancellation Toggle */}
            <div className="pt-2 border-t border-[#E8E8E2]">
              <label className="flex items-center justify-between text-xs font-medium text-[#1D2925] cursor-pointer">
                <span>Free cancellation only</span>
                <input
                  type="checkbox"
                  checked={freeCancellationOnly}
                  onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                  className="rounded border-[#E8E8E2] text-[#1F6B57] focus:ring-[#1F6B57]"
                />
              </label>
            </div>
          </aside>

          {/* STAYS RESULTS CONTAINER */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting bar & count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E2]">
              <div className="text-xs sm:text-sm text-[#707873]">
                Found <strong className="text-[#1D2925]">{filteredStays.length}</strong> boutique stays
                {searchQuery && <span> in <strong className="text-[#1F6B57]">"{searchQuery}"</strong></span>}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-[#707873] font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-[#1D2925] bg-[#FAF9F6] border border-[#E8E8E2] rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Stays Grid */}
            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((stay) => (
                  <StayCard
                    key={stay.id}
                    stay={stay}
                    onSelectStay={(s) => setSelectedStay(s)}
                  />
                ))}
              </div>
            ) : (
              /* EMPTY FILTER STATE */
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E8E2] p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center mx-auto">
                  <Filter className="w-7 h-7 stroke-1" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1D2925]">
                  No matching demo stays
                </h3>
                <p className="text-sm text-[#707873] max-w-md mx-auto leading-relaxed">
                  We couldn't find any properties matching your current filter combination. Try loosening price limits or clearing specific amenities.
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-full bg-[#1F6B57] text-white text-xs font-semibold shadow-md shadow-[#1F6B57]/20 hover:bg-[#185343] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto p-6 lg:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E2]">
            <h3 className="font-serif text-xl font-bold text-[#1D2925]">Filters</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2 rounded-full text-[#707873] hover:bg-[#F3F3EE]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-6 space-y-6 flex-1">
            {/* Price */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-2">
                Max Price per Night: {formatCurrency(maxPrice)}
              </label>
              <input
                type="range"
                min="4000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1F6B57]"
              />
            </div>

            {/* Property Types */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROPERTY_TYPES.map((pt) => {
                  const isChecked = selectedTypes.includes(pt.value);
                  return (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => handleToggleType(pt.value)}
                      className={`p-2.5 text-xs font-medium rounded-xl border text-left flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#E8F1EC] border-[#1F6B57] text-[#1F6B57]'
                          : 'bg-[#FAF9F6] border-[#E8E8E2] text-[#1D2925]'
                      }`}
                    >
                      <span>{pt.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#707873] block mb-2">
                Minimum Rating
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    type="button"
                    onClick={() => setMinRating(ratingVal)}
                    className={`py-2 text-xs font-semibold rounded-xl border ${
                      minRating === ratingVal
                        ? 'bg-[#1F6B57] text-white border-[#1F6B57]'
                        : 'bg-[#FAF9F6] border-[#E8E8E2] text-[#1D2925]'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : `★ ${ratingVal}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Free cancellation */}
            <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E8E8E2]">
              <label className="flex items-center justify-between text-xs font-medium text-[#1D2925]">
                <span>Free cancellation only</span>
                <input
                  type="checkbox"
                  checked={freeCancellationOnly}
                  onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                  className="rounded border-[#E8E8E2] text-[#1F6B57]"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E8E2] flex gap-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-3 text-xs font-semibold text-[#707873] border border-[#E8E8E2] rounded-xl"
            >
              Reset
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-[2] py-3 text-xs font-semibold text-white bg-[#1F6B57] rounded-xl shadow-md"
            >
              Show {filteredStays.length} Stays
            </button>
          </div>
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

