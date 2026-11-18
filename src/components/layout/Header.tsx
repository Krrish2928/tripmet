import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Heart, Calendar, Menu, X, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/formatters';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { savedItems, resetDemoData } = useApp();
  const navigate = useNavigate();

  const savedCount = savedItems.length;

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Destinations', path: '/explore?tab=destinations', icon: Sparkles },
    { name: 'Trip Planner', path: '/planner', icon: Calendar },
    {
      name: 'Saved',
      path: '/saved',
      icon: Heart,
      badge: savedCount > 0 ? savedCount : null
    },
  ];

  const handleResetData = () => {
    if (window.confirm("Reset all trips, saved wishlist items, and notes back to demo defaults?")) {
      resetDemoData();
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E8E2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1F6B57] flex items-center justify-center text-white shadow-md shadow-[#1F6B57]/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1D2925]">
                TripMate
              </span>
              <span className="hidden sm:block text-[11px] uppercase tracking-widest text-[#707873] font-medium -mt-1">
                Travel Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                      isActive
                        ? "text-[#1F6B57] bg-[#E8F1EC] font-semibold"
                        : "text-[#707873] hover:text-[#1D2925] hover:bg-[#F0EFEB]"
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.badge !== null && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#1F6B57] text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleResetData}
              title="Reset Demo Data"
              className="p-2 text-[#707873] hover:text-[#1D2925] hover:bg-[#E8E8E2]/60 rounded-full transition-colors text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-xs">Reset Demo</span>
            </button>

            <Link
              to="/planner"
              className="px-5 py-2.5 rounded-full bg-[#1F6B57] text-white text-sm font-medium hover:bg-[#185343] transition-all shadow-md shadow-[#1F6B57]/20 active:scale-95"
            >
              Plan a Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/saved"
              className="relative p-2 text-[#1D2925] hover:bg-[#E8E8E2]/60 rounded-full"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1F6B57] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1D2925] hover:bg-[#E8E8E2]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E8E2] bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActive
                      ? "bg-[#E8F1EC] text-[#1F6B57] font-semibold"
                      : "text-[#1D2925] hover:bg-[#F0EFEB]"
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#1F6B57]" />
                  <span>{link.name}</span>
                </div>
                {link.badge !== null && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#1F6B57] text-white">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-4 border-t border-[#E8E8E2] space-y-2">
            <Link
              to="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 rounded-xl bg-[#1F6B57] text-white text-center font-medium shadow-md shadow-[#1F6B57]/20"
            >
              Plan a Trip
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleResetData();
              }}
              className="w-full py-2.5 rounded-xl border border-[#E8E8E2] text-xs font-medium text-[#707873] hover:text-[#1D2925] flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

