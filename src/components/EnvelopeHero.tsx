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
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed-header"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.9, ease: smoothLuxuryEase }}
            className="text-center z-10 max-w-sm sm:max-w-md mx-auto px-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF9F5]/95 backdrop-blur-md border border-[#E8C0D0] text-[#8F6875] text-[10px] xs:text-xs font-serif-luxury tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3 h-3 text-[#A87888]" />
              The Sacred Nikah Ceremony
              <Sparkles className="w-3 h-3 text-[#A87888]" />
            </span>

            <h1 className="mt-1 text-2xl xs:text-3xl sm:text-4xl font-serif-luxury font-light text-[#8F6875] tracking-wide drop-shadow-xs leading-tight">
              Save The Date
            </h1>

            <p className="text-[10px] xs:text-xs sm:text-sm font-serif-luxury italic text-[#A87888] tracking-wider">
              Tap the ribbon wax seal below to open the invitation
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="opened-header"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1.2, ease: smoothLuxuryEase }}
            className="text-center z-10 max-w-sm sm:max-w-md mx-auto px-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF9F5]/95 backdrop-blur-md border border-[#E8C0D0] text-[#8F6875] text-[10px] xs:text-xs font-serif-luxury tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3 h-3 text-[#A87888]" />
              The Nikah Invitation
              <Sparkles className="w-3 h-3 text-[#A87888]" />
            </span>

            <h1 className="mt-1 text-2xl xs:text-3xl sm:text-4xl font-script text-[#8F6875] tracking-wide drop-shadow-xs leading-tight">
              {config.brideName} &amp; {config.groomName}
            </h1>

            <p className="text-[10px] xs:text-xs sm:text-sm font-serif-luxury italic text-[#A87888] tracking-wider">
              Saturday, 17th October &bull; 3:00 PM &bull; Domeera Marquee
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE GRAND BOTTOM LETTER BOX & SLIDING INVITATION CARD */}
      {/* Anchored at the full bottom of the screen - no small floating box in center */}
      <div 
        onClick={handleEnvelopeClick}
        className={`absolute inset-x-0 bottom-0 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex items-end justify-center perspective-[1400px] z-20 ${
          !isOpen ? 'cursor-pointer' : ''
        }`}
        style={{ height: `${envelopeHeight}px` }}
      >
        {/* Soft Blush & Champagne Aura glow when card slides out */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: smoothLuxuryEase }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none -z-1"
            >
              <div className="w-[150%] h-[180%] rounded-full bg-gradient-to-r from-[#EFD4E4]/45 via-[#F8EEF2]/60 to-[#E8C0D0]/45 blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* A. ENVELOPE BACK SLEEVE: Extends full bottom, rounded top corners */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8EEF2] via-[#EFD4E4] to-[#E0CADF] rounded-t-[28px] sm:rounded-t-[36px] shadow-2xl border-t border-x border-[#D8BFA5] overflow-hidden z-0">
          <div className="absolute inset-0 opacity-25 paper-texture" />
          <div className="absolute inset-x-3 top-3 bottom-0 rounded-t-2xl border-t border-x border-dashed border-[#D8BFA5]/60 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_12px_24px_rgba(143,104,117,0.06)] pointer-events-none" />
        </div>

        {/* B. THE INVITATION CARD: Fully HIDDEN inside bottom letter box when closed; slides smoothly UP into full view when opened */}
        <motion.div
          drag={isOpen ? false : 'y'}
          dragConstraints={{ top: -400, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={
            isOpen
              ? {
                  y: -slideUpDistance, // Slides up out of the bottom box directly into golden reading view
                  opacity: 1,
                  scale: 1,
                  boxShadow: '0 25px 60px -12px rgba(143, 104, 117, 0.28), 0 0 30px rgba(232, 192, 208, 0.35)',
                }
              : {
                  y: 50, // 100% tucked inside the bottom letter box
                  opacity: 0, // Fully concealed when closed: no names or text peek out!
                  scale: 0.96,
                  boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
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
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
          className="absolute inset-x-3 xs:inset-x-5 sm:inset-x-8 md:inset-x-12 max-w-[480px] mx-auto bg-gradient-to-b from-[#FFF9F5] via-[#FFF9F5] to-[#F8EEF2] rounded-2xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-between text-center border-2 border-[#D8BFA5] shadow-2xl z-10 overflow-hidden"
        >
          {/* Top Silk Ribbon Pull Tab in Powder Pink */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
            <div className="w-18 h-5 bg-gradient-to-r from-[#E0CADF] via-[#F8EEF2] to-[#E0CADF] rounded-b-md border-x border-b border-[#D8BFA5] shadow-xs flex items-center justify-center">
              <span className="text-[8px] font-roman uppercase tracking-widest text-[#8F6875] font-bold">
                Royal Invitation
              </span>
            </div>
          </div>

          {/* Luxury Double-Lined Soft Champagne Inner Frame with Rose Mauve Filigree */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl border border-dashed border-[#D8BFA5]/70 pointer-events-none p-1 flex flex-col justify-between">
            {/* Top Corners */}
            <div className="flex justify-between items-center text-[#A87888] text-[10px] sm:text-xs">
              <span>❧</span>
              <div className="w-8 sm:w-16 h-px bg-[#D8BFA5]/50" />
              <span>❧</span>
            </div>
            {/* Bottom Corners */}
            <div className="flex justify-between items-center text-[#A87888] text-[10px] sm:text-xs">
              <span className="transform rotate-180">❧</span>
              <div className="w-8 sm:w-16 h-px bg-[#D8BFA5]/50" />
              <span className="transform rotate-180">❧</span>
            </div>
          </div>

          {/* Embossed Monogram Crest with Rose Mauve & Champagne */}
          <div className="relative mt-2">
            <div className={`${isShortScreen ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full bg-gradient-to-tr from-[#F8EEF2] via-white to-[#EFD4E4] border-2 border-[#D8BFA5] flex items-center justify-center shadow-md`}>
              <span className={`font-serif-luxury font-bold ${isShortScreen ? 'text-base' : 'text-lg sm:text-xl'} gold-gradient-text tracking-tight`}>
                {config.brideName.charAt(0)} &amp; {config.groomName.charAt(0)}
              </span>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[#A87888]">
              <Heart className="w-3.5 h-3.5 fill-[#E8C0D0] text-[#A87888] drop-shadow-xs" />
            </span>
          </div>

          {/* Full Card Wedding Details Typography */}
          <div className={`space-y-1.5 my-auto max-w-xs ${isShortScreen ? 'py-0' : 'py-1'}`}>
            <p className="text-[9px] sm:text-[10px] font-roman tracking-[0.25em] uppercase text-[#A87888] font-medium">
              &bull; Together with their families &bull;
            </p>

            <h2 className={`${isShortScreen ? 'text-lg xs:text-xl' : 'text-xl xs:text-2xl sm:text-3xl'} font-serif-luxury font-bold text-[#8F6875] tracking-wide leading-tight drop-shadow-xs`}>
              {config.brideName}
            </h2>

            <p className={`${isShortScreen ? 'text-lg' : 'text-xl xs:text-2xl'} font-script text-[#A87888] leading-none my-0.5`}>
              &amp;
            </p>

            <h2 className={`${isShortScreen ? 'text-lg xs:text-xl' : 'text-xl xs:text-2xl sm:text-3xl'} font-serif-luxury font-bold text-[#8F6875] tracking-wide leading-tight drop-shadow-xs`}>
              {config.groomName}
            </h2>

            {/* Antique Flourish Divider */}
            <div className="flex items-center justify-center gap-1.5 text-[#A87888] text-[10px] my-1">
              <span className="w-6 h-px bg-[#D8BFA5]/60" />
              <span>❧ ❦ ❧</span>
              <span className="w-6 h-px bg-[#D8BFA5]/60" />
            </div>

            <p className="text-[9px] xs:text-[10px] sm:text-[11px] font-serif-luxury italic text-[#8F6875]/90 leading-tight">
              Request the honour of your presence to celebrate their union
            </p>

            <div className="py-1 px-3 rounded-lg bg-[#F8EEF2] border border-[#E8C0D0] inline-block my-1">
              <p className={`${isShortScreen ? 'text-xs' : 'text-xs xs:text-sm'} font-sans-clean font-bold text-[#8F6875] tracking-wide`}>
                17-Oct &bull; {config.date}
              </p>
              <p className="text-[9px] xs:text-[10px] font-sans-clean font-semibold text-[#A87888]">
                Nikah Ceremony at {config.ceremonyTime}
              </p>
            </div>

            <p className="text-[10px] xs:text-[11px] font-serif-luxury text-[#8F6875] font-bold pt-0.5">
              {config.venueName}
            </p>

            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-serif-luxury italic text-[#8F6875]/80 leading-tight">
              {config.venueAddress}
            </p>

            {/* Dress code reminder pill */}
            <div className="mt-1 pt-1 border-t border-[#E8C0D0]/50 flex items-center justify-center gap-1 text-[8px] xs:text-[9px] font-serif-luxury text-[#8F6875]">
              <span className="font-semibold uppercase tracking-wider text-[#A87888]">Dress Theme:</span>
              <span>White &amp; Beige</span>
            </div>
          </div>

          {/* Bottom Card Action / View Details Button */}
          <div className="w-full pt-1.5 border-t border-[#E8C0D0]/60">
            {isOpen ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onScrollToDetails();
                }}
                className="group inline-flex items-center justify-center gap-2 w-full py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#F8EEF2] via-[#FFF9F5] to-[#F8EEF2] hover:from-[#E8C0D0] hover:to-[#E8C0D0] text-[10px] xs:text-xs font-serif-luxury tracking-widest uppercase text-[#8F6875] transition-all border border-[#D8BFA5] shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>View Nikah Itinerary &amp; Details</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#A87888]" />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1 text-[9px] xs:text-[10px] font-serif-luxury tracking-wider text-[#A87888]">
                <span>Formal Invitation Sealed Inside</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* C. ENVELOPE FRONT POCKET: Anchored at full bottom (covers lower 78% of envelope) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-b from-[#FFF9F5] via-[#F8EEF2] to-[#EFD4E4] rounded-t-2xl sm:rounded-t-[30px] border-t border-x border-[#D8BFA5] shadow-md z-20 pointer-events-none overflow-hidden"
        >
          {/* Subtle decorative V-cut dip at the top mouth of the pocket */}
          <div 
            className="absolute inset-x-0 top-0 h-9 bg-gradient-to-b from-[#EFD4E4]/60 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 10%, 50% 100%, 0 10%)',
            }}
          />
          {/* Pocket top edge trim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#D8BFA5] via-[#E8C0D0] to-[#D8BFA5]" />
          
          {/* Subtle envelope texture */}
          <div className="absolute inset-0 opacity-20 paper-texture" />
          
          {/* Delicate bottom watermark */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center opacity-55">
            <span className="text-[9px] font-roman tracking-[0.3em] uppercase text-[#8F6875]">
              Islamabad &bull; 17th October 2026
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
            className="w-full h-full bg-gradient-to-b from-[#F8EEF2] to-[#E0CADF] shadow-xs border-b border-[#D8BFA5]/70"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* E. LUXURY SATIN RIBBON SASH & WAX SEAL MEDALLION (#E8C0D0 Powder Pink Satin) */}
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
                className="absolute w-full h-11 xs:h-12 sm:h-13 bg-gradient-to-r from-[#E0CADF] via-[#E8C0D0] to-[#E0CADF] shadow-md border-y border-[#D8BFA5]/70 flex items-center justify-center overflow-hidden"
              >
                {/* Translucent satin highlights */}
                <div className="absolute inset-x-0 top-0.5 h-0.5 bg-white/75" />
                <div className="absolute inset-x-0 bottom-0.5 h-0.5 bg-[#FFF9F5]/45" />
                <div className="absolute inset-0 shimmer-effect opacity-35 pointer-events-none" />
              </motion.div>

              {/* Vertical Satin Ribbon Band */}
              <motion.div
                exit={{
                  scaleY: 0,
                  opacity: 0,
                  transition: { duration: 1.1, ease: smoothLuxuryEase },
                }}
                animate={isHoveringRibbon ? { scaleX: 1.06 } : { scaleX: 1 }}
                className="absolute h-full w-10 xs:w-11 sm:w-12 bg-gradient-to-b from-[#E0CADF] via-[#E8C0D0] to-[#E0CADF] shadow-md border-x border-[#D8BFA5]/70 flex items-center justify-center overflow-hidden"
              >
                {/* Translucent satin highlights */}
                <div className="absolute inset-y-0 left-0.5 w-0.5 bg-white/75" />
                <div className="absolute inset-y-0 right-0.5 w-0.5 bg-[#FFF9F5]/45" />
                <div className="absolute inset-0 shimmer-effect opacity-35 pointer-events-none" />
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
                {/* Soft powder pink ambient aura */}
                <div className="absolute -inset-3 rounded-full bg-[#E8C0D0]/40 blur-md group-hover:bg-[#E8C0D0]/65 transition-all duration-500" />

                {/* Flat Horizontal Ribbon Bow Loops in Powder Pink & Ivory */}
                <div className="absolute inset-x-[-28px] h-6 flex items-center justify-between pointer-events-none">
                  <div className="w-9 sm:w-11 h-4.5 rounded-full bg-gradient-to-r from-[#F8EEF2] to-[#E8C0D0] border border-[#D8BFA5] shadow-xs transform -rotate-6" />
                  <div className="w-9 sm:w-11 h-4.5 rounded-full bg-gradient-to-l from-[#F8EEF2] to-[#E8C0D0] border border-[#D8BFA5] shadow-xs transform rotate-6" />
                </div>

                {/* Stamped Wax Seal Medallion in Rose Mauve & Champagne Gold */}
                <div className="relative w-16 h-16 xs:w-17 xs:h-17 sm:w-19 sm:h-19 rounded-full bg-gradient-to-br from-[#D8BFA5] via-[#A87888] to-[#8F6875] p-1 shadow-xl border-2 border-[#FFF9F5]/90 flex items-center justify-center z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#A87888] to-[#8F6875] flex flex-col items-center justify-center shadow-inner text-[#FFF9F5]">
                    <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF9F5] mb-0.5" />
                    <span className="font-serif-luxury font-bold text-[10px] sm:text-xs tracking-wider text-[#FFF9F5] uppercase">
                      Open
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-script text-[#F8EEF2]">
                      Invitation
                    </span>
                  </div>
                </div>

                {/* Flowing Ribbon Tails below in Powder Pink */}
                <div className="absolute -bottom-5 sm:-bottom-6 flex items-center gap-1 pointer-events-none">
                  <div className="w-3.5 sm:w-4 h-6 sm:h-7 bg-[#E8C0D0] border-x border-b border-[#D8BFA5] -rotate-15 transform -translate-x-1 shadow-xs" />
                  <div className="w-3.5 sm:w-4 h-6 sm:h-7 bg-[#E8C0D0] border-x border-b border-[#D8BFA5] rotate-15 transform translate-x-1 shadow-xs" />
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
            <span className="text-[10px] sm:text-xs font-serif-luxury tracking-[0.2em] uppercase text-[#8F6875] font-semibold mb-1.5 drop-shadow-xs">
              Scroll Down To View All Details
            </span>
            <div className="w-6 sm:w-7 h-9 sm:h-10 rounded-full border-2 border-[#D8BFA5] flex items-start justify-center p-1 bg-[#FFF9F5]/90 backdrop-blur-md shadow-xs">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-2 rounded-full bg-[#A87888]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
