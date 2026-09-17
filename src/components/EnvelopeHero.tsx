import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Heart, Sparkles, ChevronDown, Feather } from 'lucide-react';
import { WeddingConfig } from '../types';

interface EnvelopeHeroProps {
  isOpen: boolean;
  onOpen: () => void;
  config: WeddingConfig;
  onScrollToDetails: () => void;
}

export const EnvelopeHero: React.FC<EnvelopeHeroProps> = ({
  isOpen,
  onOpen,
  config,
  onScrollToDetails,
}) => {
  const [isHoveringRibbon, setIsHoveringRibbon] = useState(false);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 400
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 640;
  const isShortScreen = windowHeight < 720;

  // Stately luxury easing curve for royal stationery motion
  const smoothLuxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Mathematical sizing to guarantee the card is 100% visible, never cut off
  const cardHeight = Math.min(
    isShortScreen ? Math.round(windowHeight * 0.65) : isSmallScreen ? 480 : 530,
    windowHeight - 130
  );

  // Bottom envelope letter box height anchored at the screen bottom
  const envelopeHeight = isShortScreen ? 200 : isSmallScreen ? 230 : 260;
  const cardBottomOffset = isShortScreen ? 12 : 16;

  // Target top position of card when open (comfortably placed below top header)
  const targetTop = isShortScreen ? 60 : Math.max(Math.round(windowHeight * 0.1), 75);

  // Position of card inside bottom letterbox before sliding up
  const originalCardTop = windowHeight - cardBottomOffset - cardHeight;

  // Distance to slide upward out of the bottom letter box
  const slideUpDistance = Math.max(originalCardTop - targetTop, 130);

  // Handle upward swipe gesture to pull card out from bottom letter box
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isOpen && (info.offset.y < -25 || info.velocity.y < -60)) {
      onOpen();
    }
  };

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <section
      className={`relative w-full flex flex-col items-center select-none transition-all duration-700 ${
        isOpen
          ? 'min-h-[100dvh] pt-4 sm:pt-6 pb-20 justify-between overflow-x-hidden'
          : 'h-[100dvh] pt-4 sm:pt-6 justify-between overflow-hidden'
      }`}
    >
      {/* 1. TOP WELCOME GREETING HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: smoothLuxuryEase }}
        className="text-center z-10 max-w-sm sm:max-w-md mx-auto px-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/90 text-pink-900 text-[10px] xs:text-xs font-serif-luxury tracking-widest uppercase shadow-xs">
          <Sparkles className="w-3 h-3 text-pink-500" />
          The Wedding Invitation
          <Sparkles className="w-3 h-3 text-pink-500" />
        </span>

        <h1 className="mt-1 text-2xl xs:text-3xl sm:text-4xl font-script text-pink-950 tracking-wide drop-shadow-xs leading-tight">
          {config.brideName} &amp; {config.groomName}
        </h1>

        <p className="text-[10px] xs:text-xs sm:text-sm font-serif-luxury italic text-stone-700 tracking-wider">
          Request the honour of your presence to celebrate their union
        </p>
      </motion.div>

      {/* 2. THE GRAND BOTTOM LETTER BOX & SLIDING INVITATION CARD */}
      {/* Anchored at the full bottom of the screen - no small floating box in center */}
      <div 
        onClick={handleEnvelopeClick}
        className={`absolute inset-x-0 bottom-0 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex items-end justify-center perspective-[1400px] z-20 ${
          !isOpen ? 'cursor-pointer' : ''
        }`}
        style={{ height: `${envelopeHeight}px` }}
      >
        {/* Soft Golden/Rose Aura glow when card slides out */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: smoothLuxuryEase }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none -z-1"
            >
              <div className="w-[150%] h-[180%] rounded-full bg-gradient-to-r from-amber-200/35 via-pink-200/45 to-amber-100/35 blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* A. ENVELOPE BACK SLEEVE: Extends full bottom, rounded top corners */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f7] via-[#fde9ed] to-[#fce2e7] rounded-t-[28px] sm:rounded-t-[36px] shadow-2xl border-t border-x border-pink-200/90 overflow-hidden z-0">
          <div className="absolute inset-0 opacity-20 paper-texture" />
          <div className="absolute inset-x-3 top-3 bottom-0 rounded-t-2xl border-t border-x border-dashed border-pink-300/40 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_12px_24px_rgba(0,0,0,0.03)] pointer-events-none" />
        </div>

        {/* B. THE INVITATION CARD: Tucked 100% inside bottom box when closed; slides smoothly UP into full clear view when opened */}
        <motion.div
          drag={!isOpen ? 'y' : false}
          dragConstraints={{ top: -400, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={
            isOpen
              ? {
                  y: -slideUpDistance, // Slides up out of the bottom box directly into golden reading view
                  opacity: 1,
                  boxShadow: '0 25px 60px -12px rgba(244, 114, 182, 0.35), 0 0 30px rgba(212, 175, 55, 0.22)',
                }
              : {
                  y: 0, // 100% tucked inside the bottom letter box
                  opacity: 0.98,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                }
          }
          transition={{
            duration: 2.2, // Stately, slow, royal slide
            ease: smoothLuxuryEase,
            delay: isOpen ? 0.35 : 0,
          }}
          style={{
            height: `${cardHeight}px`,
            bottom: `${cardBottomOffset}px`,
            transformOrigin: 'center bottom',
          }}
          className="absolute inset-x-3 xs:inset-x-5 sm:inset-x-8 md:inset-x-12 max-w-[480px] mx-auto bg-white rounded-2xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-between text-center border border-amber-200/90 shadow-lg z-10 overflow-hidden"
        >
          {/* Top Silk Ribbon Pull Tab */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
            <div className="w-12 h-4.5 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 rounded-b-md border-x border-b border-pink-400/60 shadow-xs flex items-center justify-center">
              <span className="text-[8px] font-roman uppercase tracking-widest text-pink-900 font-semibold">
                Invitation
              </span>
            </div>
          </div>

          {/* Gold Foil Delicate Double-Lined Inner Frame */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl border border-amber-300/60 pointer-events-none p-1.5 flex flex-col justify-between">
            <div className="flex justify-between text-amber-500/70 text-[9px] sm:text-xs">
              <span>&#10050;</span>
              <span>&#10050;</span>
            </div>
            <div className="flex justify-between text-amber-500/70 text-[9px] sm:text-xs">
              <span>&#10050;</span>
              <span>&#10050;</span>
            </div>
          </div>

          {/* Monogram Crest with Laurel Leaves */}
          <div className="relative mt-1">
            <div className={`${isShortScreen ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full bg-gradient-to-tr from-pink-50 via-white to-pink-100 border border-amber-300/80 flex items-center justify-center shadow-xs`}>
              <span className={`font-serif-luxury font-bold ${isShortScreen ? 'text-base' : 'text-lg sm:text-xl'} gold-gradient-text tracking-tight`}>
                {config.brideName.charAt(0)} &amp; {config.groomName.charAt(0)}
              </span>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-pink-400">
              <Heart className="w-3 h-3 fill-pink-300 text-pink-400" />
            </span>
          </div>

          {/* Full Card Wedding Details Typography */}
          <div className={`space-y-1 my-auto max-w-xs ${isShortScreen ? 'py-0' : 'py-1'}`}>
            <p className="text-[9px] sm:text-[10px] font-roman tracking-[0.22em] uppercase text-stone-500">
              Together with their families
            </p>

            <h2 className={`${isShortScreen ? 'text-lg xs:text-xl' : 'text-xl xs:text-2xl sm:text-3xl'} font-serif-luxury font-semibold text-[#5a2e38] tracking-wide leading-tight`}>
              {config.brideName}
            </h2>

            <p className={`${isShortScreen ? 'text-lg' : 'text-xl xs:text-2xl'} font-script text-pink-600 leading-none my-0.5`}>
              &amp;
            </p>

            <h2 className={`${isShortScreen ? 'text-lg xs:text-xl' : 'text-xl xs:text-2xl sm:text-3xl'} font-serif-luxury font-semibold text-[#5a2e38] tracking-wide leading-tight`}>
              {config.groomName}
            </h2>

            <p className="text-[9px] xs:text-[10px] sm:text-[11px] font-serif-luxury italic text-stone-600">
              Request the honour of your presence to celebrate their union
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-1" />

            <p className={`${isShortScreen ? 'text-xs' : 'text-xs xs:text-sm sm:text-base'} font-sans-clean font-semibold text-stone-800 tracking-wide`}>
              {config.date}
            </p>

            <p className="text-[10px] xs:text-[11px] font-sans-clean text-stone-600">
              Ceremony at {config.ceremonyTime} &bull; Reception at {config.receptionTime}
            </p>

            <p className="text-[10px] xs:text-[11px] font-serif-luxury text-pink-900 font-medium pt-0.5">
              {config.venueName}
            </p>

            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-serif-luxury italic text-stone-500">
              {config.venueAddress}
            </p>
          </div>

          {/* Bottom Card Action / View Details Button */}
          <div className="w-full pt-1.5 border-t border-amber-200/50">
            {isOpen ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onScrollToDetails();
                }}
                className="group inline-flex items-center justify-center gap-1.5 w-full py-1.5 sm:py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[10px] xs:text-xs font-serif-luxury tracking-widest uppercase text-pink-900 transition-colors border border-pink-200/80 shadow-xs cursor-pointer"
              >
                <span>View Full Itinerary &amp; RSVP</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-pink-600" />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1 text-[9px] xs:text-[10px] font-serif-luxury tracking-wider text-stone-400">
                <span>Formal Invitation Inside</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* C. ENVELOPE FRONT POCKET: Anchored at full bottom (covers lower 78% of envelope) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-b from-[#fff6f8] via-[#fdecee] to-[#fcdde2] rounded-t-2xl sm:rounded-t-[30px] border-t border-x border-pink-200/90 shadow-md z-20 pointer-events-none overflow-hidden"
        >
          {/* Subtle decorative V-cut dip at the top mouth of the pocket */}
          <div 
            className="absolute inset-x-0 top-0 h-9 bg-gradient-to-b from-pink-100/60 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 10%, 50% 100%, 0 10%)',
            }}
          />
          {/* Pocket top edge trim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200" />
          
          {/* Subtle envelope texture */}
          <div className="absolute inset-0 opacity-15 paper-texture" />
          
          {/* Delicate bottom gold watermark */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center opacity-35">
            <span className="text-[9px] font-roman tracking-[0.3em] uppercase text-pink-900">
              Kyoto &bull; MMXXVI
            </span>
          </div>
        </div>

        {/* D. ENVELOPE TOP FLAP: Folds upward when unsealed */}
        <motion.div
          animate={
            isOpen
              ? {
                  rotateX: 175,
                  opacity: 0.2,
                  zIndex: 5,
                }
              : {
                  rotateX: 0,
                  opacity: 1,
                  zIndex: 25,
                }
          }
          transition={{ duration: 1.8, ease: smoothLuxuryEase }}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-0 left-0 right-0 h-[48%] overflow-hidden pointer-events-none"
        >
          <div
            className="w-full h-full bg-gradient-to-b from-[#ffedf1] to-[#ffe2e8] shadow-xs border-b border-pink-200/70"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* E. LUXURY SATIN RIBBON SASH & WAX SEAL MEDALLION */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 1.2, ease: smoothLuxuryEase },
              }}
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            >
              {/* Horizontal Satin Ribbon Belly-Band across full width of letter box */}
              <motion.div
                exit={{
                  scaleX: 0,
                  opacity: 0,
                  transition: { duration: 1.1, ease: smoothLuxuryEase },
                }}
                animate={isHoveringRibbon ? { scaleY: 1.06 } : { scaleY: 1 }}
                className="absolute w-full h-11 xs:h-12 sm:h-13 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 shadow-md border-y border-pink-400/60 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0.5 h-0.5 bg-white/70" />
                <div className="absolute inset-x-0 bottom-0.5 h-0.5 bg-white/40" />
                <div className="absolute inset-0 shimmer-effect opacity-30 pointer-events-none" />
              </motion.div>

              {/* Vertical Satin Ribbon Band */}
              <motion.div
                exit={{
                  scaleY: 0,
                  opacity: 0,
                  transition: { duration: 1.1, ease: smoothLuxuryEase },
                }}
                animate={isHoveringRibbon ? { scaleX: 1.06 } : { scaleX: 1 }}
                className="absolute h-full w-10 xs:w-11 sm:w-12 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-300 shadow-md border-x border-pink-400/60 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0.5 w-0.5 bg-white/70" />
                <div className="absolute inset-y-0 right-0.5 w-0.5 bg-white/40" />
                <div className="absolute inset-0 shimmer-effect opacity-30 pointer-events-none" />
              </motion.div>

              {/* CENTER WAX SEAL & AUTHENTIC FLAT RIBBON BOW */}
              <motion.button
                id="open-wedding-card-ribbon"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                onMouseEnter={() => setIsHoveringRibbon(true)}
                onMouseLeave={() => setIsHoveringRibbon(false)}
                exit={{
                  scale: 0.85,
                  opacity: 0,
                  transition: { duration: 0.9, ease: smoothLuxuryEase },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative group pointer-events-auto cursor-pointer flex flex-col items-center justify-center focus:outline-none touch-manipulation"
                aria-label="Open wedding invitation"
              >
                {/* Soft ambient aura */}
                <div className="absolute -inset-3 rounded-full bg-pink-400/25 blur-md group-hover:bg-pink-400/40 transition-all duration-500" />

                {/* Flat Horizontal Ribbon Bow Loops */}
                <div className="absolute inset-x-[-28px] h-6 flex items-center justify-between pointer-events-none">
                  <div className="w-9 sm:w-11 h-4.5 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 border border-pink-400/80 shadow-xs transform -rotate-6" />
                  <div className="w-9 sm:w-11 h-4.5 rounded-full bg-gradient-to-l from-rose-300 to-pink-300 border border-pink-400/80 shadow-xs transform rotate-6" />
                </div>

                {/* Stamped Wax Seal Medallion */}
                <div className="relative w-16 h-16 xs:w-17 xs:h-17 sm:w-19 sm:h-19 rounded-full bg-gradient-to-br from-[#dfa349] via-[#c68c34] to-[#8d5b12] p-1 shadow-xl border-2 border-amber-200/90 flex items-center justify-center z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4993d] to-[#9a641a] flex flex-col items-center justify-center shadow-inner text-amber-100">
                    <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 mb-0.5" />
                    <span className="font-serif-luxury font-bold text-[10px] sm:text-xs tracking-wider text-amber-100 uppercase">
                      Open
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-script text-amber-200">
                      Invitation
                    </span>
                  </div>
                </div>

                {/* Flowing Ribbon Tails below */}
                <div className="absolute -bottom-5 sm:-bottom-6 flex items-center gap-1 pointer-events-none">
                  <div className="w-3.5 sm:w-4 h-6 sm:h-7 bg-rose-300 border-x border-b border-pink-400 -rotate-15 transform -translate-x-1 shadow-xs" />
                  <div className="w-3.5 sm:w-4 h-6 sm:h-7 bg-rose-300 border-x border-b border-pink-400 rotate-15 transform translate-x-1 shadow-xs" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. ELEGANT SCROLL PROMPT ONCE CARD HAS SLID UP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.8, duration: 1.0, ease: smoothLuxuryEase }}
            className="relative mt-auto mb-2 flex flex-col items-center text-center z-30 cursor-pointer touch-manipulation"
            onClick={onScrollToDetails}
          >
            <span className="text-[10px] sm:text-xs font-serif-luxury tracking-[0.2em] uppercase text-pink-900 font-semibold mb-1.5 drop-shadow-xs">
              Scroll Down To View All Details
            </span>
            <div className="w-6 sm:w-7 h-9 sm:h-10 rounded-full border-2 border-pink-400/80 flex items-start justify-center p-1 bg-white/80 backdrop-blur-md shadow-xs">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-2 rounded-full bg-pink-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
