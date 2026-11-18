import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ArrowRight } from 'lucide-react';
import { Destination } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { cn } from '../../utils/formatters';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, className }) => {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(destination.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(destination.id, 'destination', destination.name);
  };

  return (
    <Link
      to={`/destination/${destination.slug}`}
      className={cn(
        "group relative block rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-[#1D2925]",
        className
      )}
    >
      {/* Background Image */}
      <div className="aspect-[3/4] w-full overflow-hidden">
        <ImageWithFallback
          src={destination.heroImage}
          alt={destination.name}
          className="group-hover:scale-105 transition-transform duration-700"
          wrapperClassName="w-full h-full"
        />
      </div>

      {/* Atmospheric Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity" />

      {/* Top Controls: Region and Save */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20">
          {destination.country}
        </span>

        <button
          onClick={handleSaveClick}
          aria-label={saved ? "Remove from wishlist" : "Save destination"}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90",
            saved
              ? "bg-[#1F6B57] text-white"
              : "bg-white/80 backdrop-blur-md text-[#1D2925] hover:bg-white"
          )}
        >
          <Heart className={cn("w-4 h-4", saved && "fill-current stroke-current")} />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
        <h3 className="font-serif text-2xl font-bold tracking-tight mb-1 group-hover:text-[#DDA66A] transition-colors">
          {destination.name}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-3">
          {destination.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {destination.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[10px] font-medium text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#DDA66A] group-hover:translate-x-1 transition-transform">
          <span>Explore destination guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};

