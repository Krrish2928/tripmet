import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/formatters';

interface SearchPanelProps {
  className?: string;
  compact?: boolean;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ className, compact = false }) => {
  const navigate = useNavigate();
  const { searchCriteria, setSearchCriteria } = useApp();

  const [destination, setDestination] = useState(searchCriteria.destination || '');
  const [checkIn, setCheckIn] = useState(searchCriteria.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchCriteria.checkOut || '');
  const [guests, setGuests] = useState(searchCriteria.guests || 2);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Suggestions based on input or popular destinations
  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(destination.toLowerCase()) ||
    d.country.toLowerCase().includes(destination.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchCriteria({
      destination: destination.trim(),
      checkIn,
      checkOut,
      guests
    });

    const params = new URLSearchParams();
    if (destination.trim()) params.set('destination', destination.trim());
    if (guests) params.set('guests', guests.toString());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);

    navigate(`/explore?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl md:rounded-full p-2.5 sm:p-3 shadow-xl border border-[#E8E8E2] text-left transition-all",
        compact ? "shadow-md" : "shadow-2xl shadow-[#1D2925]/8",
        className
      )}
    >
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-[#E8E8E2]">
        {/* Destination Field with Autocomplete */}
        <div className="relative w-full md:flex-[1.4] px-4 py-2 sm:py-2.5" ref={dropdownRef}>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707873] mb-0.5">
            Where to?
          </label>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#1F6B57] shrink-0" />
            <input
              type="text"
              placeholder="e.g. Bali, Kyoto, Paris, Manali..."
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full bg-transparent text-sm font-semibold text-[#1D2925] placeholder:text-[#A0A7A3] focus:outline-none truncate"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-xl border border-[#E8E8E2] py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-1.5 text-[11px] font-bold text-[#707873] uppercase tracking-wider bg-[#FAF9F6]">
                Popular Destinations
              </div>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDestination(d.name);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#E8F1EC] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-medium text-[#1D2925] group-hover:text-[#1F6B57]">
                        {d.name}
                      </div>
                      <div className="text-xs text-[#707873]">{d.country}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A0A7A3] group-hover:text-[#1F6B57] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-[#707873]">
                  No direct match. Press search to look across all stays!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Check-In */}
        <div className="w-full md:flex-1 px-4 py-2 sm:py-2.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707873] mb-0.5">
            Check-In
          </label>
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#1F6B57] shrink-0" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#1D2925] focus:outline-none"
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="w-full md:flex-1 px-4 py-2 sm:py-2.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707873] mb-0.5">
            Check-Out
          </label>
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#1F6B57] shrink-0" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#1D2925] focus:outline-none"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="w-full md:flex-[0.8] px-4 py-2 sm:py-2.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707873] mb-0.5">
            Guests
          </label>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#1F6B57] shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-[#1D2925] focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={6}>6+ Guests</option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <div className="w-full md:w-auto p-1.5 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl md:rounded-full bg-[#1F6B57] hover:bg-[#185343] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#1F6B57]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

