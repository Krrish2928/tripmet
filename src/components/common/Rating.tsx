import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/formatters';

interface RatingProps {
  value: number;
  reviews?: number;
  showReviews?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  reviews,
  showReviews = true,
  size = 'md',
  className
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold'
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-[#DDA66A]">
        <Star className={cn(iconSizes[size], "fill-[#DDA66A] stroke-[#DDA66A]")} />
      </div>
      <span className={cn("font-medium text-[#1D2925]", textSizes[size])}>
        {value.toFixed(1)}
      </span>
      {showReviews && reviews !== undefined && (
        <span className={cn("text-[#707873]", textSizes[size])}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

