import React from 'react';
import { Heart, Sparkles, RotateCcw, Calendar, MapPin, MessageSquareHeart } from 'lucide-react';

interface FloatingNavbarProps {
  onReplay: () => void;
  onShowerPetals: () => void;
  onOpenCustomizer: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  onReplay,
  onShowerPetals,
  onOpenCustomizer,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-2.5 xs:top-3 sm:top-4 inset-x-0 mx-auto w-[94%] max-w-2xl z-40 bg-white/85 backdrop-blur-md rounded-full border border-pink-200/90 shadow-lg shadow-pink-200/20 px-3 xs:px-4 py-1.5 sm:py-2 flex items-center justify-between transition-all duration-300">
      {/* Brand Monogram */}
      <button
        onClick={onReplay}
        className="flex items-center gap-1.5 text-xs font-serif-luxury font-bold text-pink-900 hover:text-pink-600 transition-colors shrink-0"
        title="Replay Envelope Opening"
      >
        <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
          <Heart className="w-3 h-3 fill-pink-500" />
        </span>
        <span className="tracking-widest hidden sm:inline">WEDDING</span>
      </button>

      {/* Nav Jump Links */}
      <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-4 text-[10px] xs:text-[11px] sm:text-xs font-serif-luxury tracking-wider text-stone-700 font-medium">
        <button
          onClick={() => scrollTo('schedule')}
          className="hover:text-pink-600 transition-colors px-1.5 xs:px-2 py-1 rounded-md hover:bg-pink-50"
        >
          Schedule
        </button>
        <button
          onClick={() => scrollTo('venue')}
          className="hover:text-pink-600 transition-colors px-1.5 xs:px-2 py-1 rounded-md hover:bg-pink-50"
        >
          Venue
        </button>
        <button
          onClick={() => scrollTo('story')}
          className="hover:text-pink-600 transition-colors px-2 py-1 rounded-md hover:bg-pink-50 hidden md:inline-block"
        >
          Our Story
        </button>
        <button
          onClick={() => scrollTo('rsvp')}
          className="hover:text-pink-600 transition-colors px-2 xs:px-2.5 py-0.5 sm:py-1 rounded-full bg-pink-100/90 text-pink-800 font-semibold hover:bg-pink-200"
        >
          RSVP
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onShowerPetals}
          className="p-1.5 rounded-full hover:bg-pink-100 text-pink-600 transition-colors touch-manipulation"
          title="Shower Sakura Petals"
          aria-label="Shower Sakura Petals"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={onReplay}
          className="p-1.5 rounded-full hover:bg-pink-100 text-stone-600 transition-colors touch-manipulation"
          title="Fold letter back & replay"
          aria-label="Fold letter back and replay"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </nav>
  );
};
