import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-[#E8F1EC] text-[#1F6B57] flex items-center justify-center mx-auto shadow-sm">
        <Compass className="w-8 h-8 stroke-[2.2]" />
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1D2925]">
        Off the Beaten Path
      </h1>
      <p className="text-sm text-[#707873] leading-relaxed">
        We couldn't find the page or travel route you were searching for. Let's get you back to familiar territory.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F6B57] text-white text-xs font-semibold shadow-md hover:bg-[#185343] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

