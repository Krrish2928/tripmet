import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { Stay } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { formatCurrency, cn } from '../../utils/formatters';

interface StayCardProps {
  stay: Stay;
  onSelectStay?: (stay: Stay) => void;
  className?: string;
}

export const StayCard: React.FC<StayCardProps> = ({ stay, onSelectStay, className }) => {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(stay.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(stay.id, 'stay', stay.name);
  };

  const propertyTypeBadge = {
    villa: "Villa",
    resort: "Resort",
    hotel: "Hotel",
    guesthouse: "Heritage / Machiya",
    apartment: "Apartment"
  }[stay.propertyType] || stay.propertyType;

  return (
    <div
      onClick={() => onSelectStay && onSelectStay(stay)}
      className={cn(
        "group bg-white rounded-2xl border border-[#E8E8E2] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer",
        className
      )}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ImageWithFallback
          src={stay.images[0]}
          alt={stay.name}
          className="group-hover:scale-105 transition-transform duration-500"
          wrapperClassName="w-full h-full"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#1D2925] shadow-sm">
          {propertyTypeBadge}
        </div>

        {/* Save Wishlist Button */}
        <button
          onClick={handleSaveClick}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90",
            saved
              ? "bg-[#1F6B57] text-white"
              : "bg-white/90 backdrop-blur-md text-[#1D2925] hover:text-[#1F6B57] hover:bg-white"
          )}
        >
          <Heart className={cn("w-4 h-4", saved && "fill-current stroke-current")} />
        </button>

        {/* Bottom Destination Tag */}
        <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-medium drop-shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#DDA66A]" />
          <span>{stay.destinationName}, {stay.country}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-[#1D2925] group-hover:text-[#1F6B57] transition-colors line-clamp-1">
              {stay.name}
            </h3>
            <Rating value={stay.rating} reviews={stay.reviewCount} size="sm" />
          </div>

          <p className="text-xs text-[#707873] line-clamp-2 leading-relaxed mb-3">
            {stay.description}
          </p>

          {/* Amenities preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-[#F4F4F0] text-[11px] font-medium text-[#707873]"
              >
                {amenity}
              </span>
            ))}
            {stay.amenities.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-[#A0A7A3]">
                +{stay.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-[#E8E8E2] flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-[#1D2925]">
              {formatCurrency(stay.pricePerNight)}
            </span>
            <span className="text-xs text-[#707873]"> / night</span>
            <div className="text-[10px] text-[#A0A7A3]">Sample illustrative rate</div>
          </div>

          <span className="text-xs font-semibold text-[#1F6B57] group-hover:underline flex items-center gap-1">
            <span>View stay</span>
            <Sparkles className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

