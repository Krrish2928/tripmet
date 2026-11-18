import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../utils/formatters';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  wrapperClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  className,
  wrapperClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-[#EFEFEA]", wrapperClassName)}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#E8E8E2] animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F3F3EE] text-[#707873] p-4 text-center">
          <ImageOff className="w-8 h-8 mb-2 opacity-50 stroke-1" />
          <span className="text-xs font-medium uppercase tracking-wider">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

