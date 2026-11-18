import React, { useState } from 'react';
import {
  Heart,
  X,
  MapPin,
  Users,
  Check,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Share2
} from 'lucide-react';
import { Stay } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { formatCurrency } from '../../utils/formatters';

interface StayDetailModalProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StayDetailModal: React.FC<StayDetailModalProps> = ({ stay, isOpen, onClose }) => {
  const { isSaved, toggleSave, trips, activeTrip, addActivityToTrip, showToast } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(activeTrip ? activeTrip.id : '');
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddToTripDropdown, setShowAddToTripDropdown] = useState(false);

  if (!isOpen || !stay) return null;

  const saved = isSaved(stay.id);

  const handleAddToTrip = () => {
    const targetTrip = trips.find((t) => t.id === selectedTripId) || activeTrip;
    if (!targetTrip) {
      showToast("Create a trip in Planner first!", 'info');
      return;
    }

    addActivityToTrip(targetTrip.id, {
      title: `Stay: ${stay.name}`,
      description: `Check-in at ${stay.name}. ${stay.roomSummary}`,
      category: 'stay',
      dayNumber: selectedDay,
      time: '02:00 PM',
      estimatedCost: stay.pricePerNight,
      image: stay.images[0]
    });

    setShowAddToTripDropdown(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Stay link copied to clipboard!", 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1D2925]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8E8E2] overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col">
        {/* Header Action Bar */}
        <div className="px-6 py-4 border-b border-[#E8E8E2] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#707873]">
            <span>{stay.propertyType}</span>
            <span>•</span>
            <span className="text-[#1F6B57]">{stay.destinationName}, {stay.country}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[#707873] hover:text-[#1D2925] hover:bg-[#E8E8E2]/60 transition-colors"
              title="Share Stay"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSave(stay.id, 'stay', stay.name)}
              className="p-2 rounded-full text-[#707873] hover:text-[#1F6B57] hover:bg-[#E8E8E2]/60 transition-colors"
              title={saved ? "Remove from saved" : "Save Stay"}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-[#1F6B57] text-[#1F6B57]" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#707873] hover:text-[#1D2925] hover:bg-[#E8E8E2]/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Gallery Showcase */}
          <div>
            <div
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/5 cursor-pointer group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <ImageWithFallback
                src={stay.images[activeImageIndex]}
                alt={stay.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs backdrop-blur-md">
                Click to expand photos ({activeImageIndex + 1}/{stay.images.length})
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {stay.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#1F6B57] scale-102' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Rating value={stay.rating} reviews={stay.reviewCount} size="md" />
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8F1EC] text-[#1F6B57] font-semibold">
                    Guest Favorite
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D2925]">
                  {stay.name}
                </h1>
                <p className="flex items-center gap-1.5 text-xs text-[#707873] mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1F6B57]" />
                  <span>{stay.address}</span>
                </p>
              </div>

              {/* Room & Capacity highlight */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E8E2] flex items-center justify-between text-xs text-[#1D2925]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1F6B57]" />
                  <span>Accommodates up to <strong>{stay.guestCapacity} guests</strong></span>
                </div>
                <div>{stay.freeCancellation ? "✓ Free cancellation available" : "Standard cancellation"}</div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1D2925] mb-2">About this stay</h3>
                <p className="text-sm text-[#707873] leading-relaxed">
                  {stay.description}
                </p>
                <p className="text-xs text-[#707873] mt-2 italic bg-[#F8F8F5] p-3 rounded-xl border border-[#EFEFEA]">
                  <strong>Room configuration:</strong> {stay.roomSummary}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1D2925] mb-3">Amenities & comforts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {stay.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E8E8E2] text-xs font-medium text-[#1D2925]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#1F6B57]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {stay.reviews && stay.reviews.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1D2925] mb-3">Guest Reviews</h3>
                  <div className="space-y-3">
                    {stay.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl border border-[#E8E8E2] bg-white">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-[#1D2925]">{rev.author}</span>
                          <span className="text-xs text-[#A0A7A3]">{rev.date}</span>
                        </div>
                        <Rating value={rev.rating} showReviews={false} size="sm" />
                        <p className="text-xs text-[#707873] mt-2 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Booking Preview Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-[#FAF9F6] border border-[#E8E8E2] rounded-3xl p-6 shadow-sm space-y-5">
                <div>
                  <span className="text-2xl font-bold text-[#1D2925]">
                    {formatCurrency(stay.pricePerNight)}
                  </span>
                  <span className="text-xs text-[#707873]"> / night</span>
                  <div className="text-[11px] text-[#A0A7A3] mt-0.5">Includes sample demo taxes & fees</div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setShowAddToTripDropdown(!showAddToTripDropdown)}
                    className="w-full py-3.5 rounded-full bg-[#1F6B57] hover:bg-[#185343] text-white text-sm font-semibold shadow-md shadow-[#1F6B57]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add to Itinerary</span>
                  </button>

                  {/* Add To Trip Dropdown Drawer */}
                  {showAddToTripDropdown && (
                    <div className="p-4 bg-white rounded-2xl border border-[#E8E8E2] shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-xs font-bold text-[#1D2925]">Select Trip & Day:</div>
                      <div>
                        <label className="text-[10px] text-[#707873] block mb-1">Trip</label>
                        <select
                          value={selectedTripId}
                          onChange={(e) => setSelectedTripId(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-[#E8E8E2] bg-[#FAF9F6]"
                        >
                          {trips.map((t) => (
                            <option key={t.id} value={t.id}>{t.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-[#707873] block mb-1">Assign to Day</label>
                        <select
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(Number(e.target.value))}
                          className="w-full text-xs p-2 rounded-lg border border-[#E8E8E2] bg-[#FAF9F6]"
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                            <option key={d} value={d}>Day {d}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={handleAddToTrip}
                        className="w-full py-2 bg-[#DDA66A] text-white rounded-xl text-xs font-semibold hover:bg-[#C99559] transition-colors"
                      >
                        Confirm Itinerary Entry
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => toggleSave(stay.id, 'stay', stay.name)}
                    className="w-full py-3 rounded-full border border-[#E8E8E2] bg-white hover:bg-[#F3F3EE] text-xs font-semibold text-[#1D2925] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-[#1F6B57] text-[#1F6B57]' : ''}`} />
                    <span>{saved ? "Saved in Wishlist" : "Save for Later"}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[#E8E8E2] text-center">
                  <span className="text-[11px] text-[#707873] block leading-tight">
                    ⚡ Demo sample property. No actual charge will be made.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm font-medium">{stay.name} — Photo {activeImageIndex + 1} of {stay.images.length}</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={stay.images[activeImageIndex]}
              alt=""
              className="max-h-[80vh] max-w-full object-contain rounded-xl"
            />
            {activeImageIndex > 0 && (
              <button
                onClick={() => setActiveImageIndex((i) => i - 1)}
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {activeImageIndex < stay.images.length - 1 && (
              <button
                onClick={() => setActiveImageIndex((i) => i + 1)}
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {stay.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                  activeImageIndex === idx ? 'border-white' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

