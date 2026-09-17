import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SakuraCanvas, SakuraCanvasHandle } from './components/SakuraCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { EnvelopeHero } from './components/EnvelopeHero';
import { InvitationContent } from './components/InvitationContent';
import { FloatingNavbar } from './components/FloatingNavbar';
import { CustomizerModal } from './components/CustomizerModal';
import { ScreenBorderFrame } from './components/ScreenBorderFrame';
import { WeddingConfig } from './types';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [audioTrigger, setAudioTrigger] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const sakuraRef = useRef<SakuraCanvasHandle | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // Strictly prevent scrolling before the user opens the card
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const [weddingConfig, setWeddingConfig] = useState<WeddingConfig>({
    brideName: 'Elena Rose Vance',
    groomName: 'Alexander James Sterling',
    date: 'Saturday, 17th October 2026',
    ceremonyTime: '3:00 PM',
    receptionTime: '5:30 PM',
    venueName: 'Domeera Marquee',
    venueAddress: 'Service Road, Main Gulberg Expy, Koral Town, Islamabad, 46000',
    googleMapsUrl: 'https://maps.app.goo.gl/y4cpY2b7ivEbnSxv6',
    storyQuote: 'Two souls with but a single thought, two hearts that beat as one.',
    dressCodeGirls: 'Girls: White, Off White & Beige',
    dressCodeBoys: 'Boys: White Shalwar Kameez & Brown Waistcoat',
  });

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setAudioTrigger(true);

    // Trigger gentle romantic blossom flutter
    if (sakuraRef.current) {
      sakuraRef.current.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60);
    }
  };

  const handleScrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  const handleShowerPetals = () => {
    if (sakuraRef.current) {
      sakuraRef.current.burst(
        Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
        window.innerHeight * 0.3,
        60
      );
    }
  };

  return (
    <main
      className={`relative w-full text-[#3d2f24] selection:bg-[#eadecc] selection:text-[#36271a] font-sans-clean ${
        isOpen ? 'min-h-[100dvh] overflow-x-hidden' : 'h-[100dvh] overflow-hidden'
      }`}
    >
      {/* LUXURY WHITE & BEIGE MARQUEE FLORAL WALLPAPER WITH WARM BLUR */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* High-resolution romantic white floral canopy backdrop */}
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=85"
          alt="White and Warm Beige Wedding Decor Canopy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 filter blur-[6px] brightness-[0.98] transition-transform duration-1000 ease-out"
        />

        {/* Soft frosted glass warm white and beige overlay for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/90 via-[#f4eee6]/80 to-[#faf7f2]/95 backdrop-blur-[6px]" />

        {/* Subtle radial glow centering warm golden light on the stationery card */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.85)_0%,_rgba(248,243,235,0.65)_60%,_rgba(230,220,205,0.4)_100%)]" />
      </div>

      {/* Floating Canvas Falling Sakura Petals drifting over the blurred tree wallpaper */}
      <SakuraCanvas ref={sakuraRef} density={35} interactive={true} />

      {/* Screen Left and Right Border Frame with Ornate Gold Corners & Transitions */}
      <ScreenBorderFrame isOpen={isOpen} />

      {/* Floating Audio Player for Romantic Melody */}
      <AudioPlayer autoPlayTrigger={audioTrigger} />

      {/* Top Floating Navbar (Active once envelope is unwrapped) */}
      {isOpen && (
        <FloatingNavbar
          onReplay={handleReplay}
          onShowerPetals={handleShowerPetals}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      )}

      {/* Hero Letter / Envelope Opening with Slow Wrapping Unwrap & Upward Sliding Card */}
      <EnvelopeHero
        isOpen={isOpen}
        onOpen={handleOpenEnvelope}
        config={weddingConfig}
        onScrollToDetails={handleScrollToDetails}
      />

      {/* Smoothly Unfolded Wedding Details (ONLY rendered and scrollable once envelope is opened) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="relative z-20"
          >
            <InvitationContent
              config={weddingConfig}
              onReplayEnvelope={handleReplay}
              onShowerPetals={handleShowerPetals}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Couple Info Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={weddingConfig}
        onSave={(newConfig) => setWeddingConfig(newConfig)}
      />
    </main>
  );
}
