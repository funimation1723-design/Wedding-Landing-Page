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
    <nav className="fixed top-2.5 xs:top-3 sm:top-4 inset-x-0 mx-auto w-[94%] max-w-2xl z-40 bg-[#FFF9F5]/90 backdrop-blur-md rounded-full border border-[#E8C0D0] shadow-lg shadow-[#8F6875]/10 px-3 xs:px-4 py-1.5 sm:py-2 flex items-center justify-between transition-all duration-300">
      {/* Brand Monogram */}
      <button
        onClick={onReplay}
        className="flex items-center gap-1.5 text-xs font-serif-luxury font-bold text-[#8F6875] hover:text-[#A87888] transition-colors shrink-0"
        title="Replay Envelope Opening"
      >
        <span className="w-6 h-6 rounded-full bg-[#F8EEF2] border border-[#D8BFA5] flex items-center justify-center text-[#A87888]">
          <Heart className="w-3 h-3 fill-[#E8C0D0] text-[#A87888]" />
        </span>
        <span className="tracking-widest hidden sm:inline">WEDDING</span>
      </button>

      {/* Nav Jump Links */}
      <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-3.5 text-[10px] xs:text-[11px] sm:text-xs font-serif-luxury tracking-wider text-[#8F6875] font-medium">
        <button
          onClick={() => scrollTo('schedule')}
          className="hover:text-[#A87888] transition-colors px-1.5 xs:px-2 py-1 rounded-md hover:bg-[#F8EEF2]"
        >
          Schedule
        </button>
        <button
          onClick={() => scrollTo('attire')}
          className="hover:text-[#A87888] transition-colors px-1.5 xs:px-2 py-1 rounded-md hover:bg-[#F8EEF2]"
        >
          Attire
        </button>
        <button
          onClick={() => scrollTo('venue')}
          className="hover:text-[#A87888] transition-colors px-1.5 xs:px-2 py-1 rounded-md hover:bg-[#F8EEF2]"
        >
          Venue
        </button>
        <button
          onClick={() => scrollTo('wishing-well')}
          className="hover:text-[#8F6875] transition-colors px-2 xs:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#E8C0D0] text-[#8F6875] border border-[#D8BFA5] font-semibold hover:bg-[#E0CADF]"
        >
          Wishing Well
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onShowerPetals}
          className="p-1.5 rounded-full hover:bg-[#F8EEF2] text-[#A87888] transition-colors touch-manipulation"
          title="Shower Petals"
          aria-label="Shower Petals"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={onReplay}
          className="p-1.5 rounded-full hover:bg-[#F8EEF2] text-[#8F6875] transition-colors touch-manipulation"
          title="Fold letter back & replay"
          aria-label="Fold letter back and replay"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </nav>
  );
};
