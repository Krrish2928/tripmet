import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Globe, Share2, Compass as CompassIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D2925] text-white pt-16 pb-12 border-t border-[#2D3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2D3A36]">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F6B57] flex items-center justify-center text-white">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                TripMate
              </span>
            </Link>
            <p className="text-sm text-[#A0A7A3] leading-relaxed">
              Find your place. Plan your escape. Curated boutique stays, destination discovery, and intuitive day-by-day itineraries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-full bg-[#263531] text-[#A0A7A3] hover:text-white transition-colors cursor-pointer" aria-label="Social Link">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-full bg-[#263531] text-[#A0A7A3] hover:text-white transition-colors cursor-pointer" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA66A] mb-4">
              Explore Stays
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A0A7A3]">
              <li><Link to="/explore?destination=Bali" className="hover:text-white transition-colors">Bali Villas & Resorts</Link></li>
              <li><Link to="/explore?destination=Kyoto" className="hover:text-white transition-colors">Kyoto Traditional Machiya</Link></li>
              <li><Link to="/explore?destination=Paris" className="hover:text-white transition-colors">Parisian Boutique Hotels</Link></li>
              <li><Link to="/explore?destination=Manali" className="hover:text-white transition-colors">Himalayan Alpine Lodges</Link></li>
              <li><Link to="/explore?destination=Jaipur" className="hover:text-white transition-colors">Jaipur Heritage Haveli</Link></li>
              <li><Link to="/explore?destination=Amalfi" className="hover:text-white transition-colors">Amalfi Coast Cliffside Suites</Link></li>
            </ul>
          </div>

          {/* Planning Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA66A] mb-4">
              Planning Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A0A7A3]">
              <li><Link to="/planner" className="hover:text-white transition-colors">Interactive Day Planner</Link></li>
              <li><Link to="/saved" className="hover:text-white transition-colors">Saved Wishlist & Stays</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">Filtered Stay Search</Link></li>
              <li><Link to="/destination/bali" className="hover:text-white transition-colors">Destination Guides</Link></li>
              <li><span className="text-xs text-[#707873] flex items-center gap-1.5 pt-2"><Sparkles className="w-3.5 h-3.5 text-[#DDA66A]" /> Instant offline LocalStorage</span></li>
            </ul>
          </div>

          {/* About / Demo Notice Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA66A] mb-4">
              Demo Platform
            </h4>
            <p className="text-xs text-[#A0A7A3] leading-relaxed mb-4">
              TripMate is a frontend exploration and portfolio concept. All property listings, availability markers, reviews, and pricing are simulated for demonstration purposes.
            </p>
            <div className="p-3 rounded-xl bg-[#263531] border border-[#2D3A36] text-[11px] text-[#A0A7A3]">
              No live bookings or financial transactions take place. Experience the seamless UX and plan freely.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#707873] gap-4">
          <p>© {new Date().getFullYear()} TripMate. Crafted with care for modern travelers.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A0A7A3] cursor-pointer">Privacy Policy (Demo)</span>
            <span className="hover:text-[#A0A7A3] cursor-pointer">Terms of Service (Demo)</span>
            <span className="hover:text-[#A0A7A3] cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
