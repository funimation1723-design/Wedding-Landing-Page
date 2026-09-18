import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Music2,
  Copy,
  ExternalLink,
  Gift,
  Share2,
  RotateCcw,
  Palette,
  Users,
  Wine,
  Church,
  UtensilsCrossed,
  PartyPopper,
} from 'lucide-react';
import { WeddingConfig, ScheduleEvent } from '../types';

interface InvitationContentProps {
  config: WeddingConfig;
  onReplayEnvelope: () => void;
  onShowerPetals: () => void;
  onOpenCustomizer?: () => void;
}

export const InvitationContent: React.FC<InvitationContentProps> = ({
  config,
  onReplayEnvelope,
  onShowerPetals,
}) => {
  // Venue Image Card Parallax & Blur on Scroll
  const venueImageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: venueScrollProgress } = useScroll({
    target: venueImageContainerRef,
    offset: ['start end', 'end start'],
  });

  const venueParallaxY = useTransform(venueScrollProgress, [0, 1], ['-16%', '16%']);
  const venueParallaxScale = useTransform(venueScrollProgress, [0, 0.5, 1], [1.18, 1.06, 1.18]);
  const venueBlur = useTransform(
    venueScrollProgress,
    [0, 0.35, 0.7, 1],
    ['blur(0px)', 'blur(0px)', 'blur(2.5px)', 'blur(5px)']
  );

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: October 17, 2026 at 3:00 PM (15:00 PKT)
    const targetDate = new Date('2026-10-17T15:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${config.venueName}, ${config.venueAddress}`);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${config.brideName} & ${config.groomName}'s Wedding`);
    const details = encodeURIComponent(
      `Join us in celebrating the wedding ceremony of ${config.brideName} & ${config.groomName} at ${config.venueName}. Attire: White & Beige.`
    );
    const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}`);
    // 2026-10-17 15:00 PKT (10:00 UTC) to 19:00 UTC
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261017T100000Z/20261017T170000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  // Schedule Timeline
  const schedule: ScheduleEvent[] = [
    {
      time: '3:00 PM',
      title: 'Guest Arrival & Welcome',
      subtitle: 'Traditional Refreshments & Hospitality',
      description: 'Warm reception of beloved family and guests at Domeera Marquee with chilled beverages and soothing acoustic melodies.',
      iconName: 'wine',
      location: 'Reception Foyer & Veranda',
    },
    {
      time: '3:45 PM',
      title: 'Baraat Arrival & Grand Reception',
      subtitle: 'Welcoming the Groom & Family',
      description: 'Joyous arrival of the groom and family welcomed with fragrant rose and jasmine petal showers.',
      iconName: 'sparkles',
      location: 'Grand Marquee Entrance',
    },
    {
      time: '4:30 PM',
      title: 'The Wedding Ceremony & Nikah',
      subtitle: 'Sacred Covenant & Exchange of Vows',
      description: 'In the presence of cherished elders and dear loved ones, solemnizing the holy union of two hearts.',
      iconName: 'church',
      location: 'Main Floral Stage',
    },
    {
      time: '5:15 PM',
      title: 'Royal Banquet & Dinner Feast',
      subtitle: 'Traditional Gourmet Buffet & Delicacies',
      description: 'An opulent culinary banquet featuring traditional Mughlai specialties, live bread stations, and artisanal desserts.',
      iconName: 'utensils',
      location: 'The Grand Dining Hall',
    },
    {
      time: '6:30 PM',
      title: 'Rukhsati & Farewell Blessings',
      subtitle: 'Heartfelt Prayers & Send-Off',
      description: 'Prayers of prosperity and love as the newlyweds embark on their blessed journey together.',
      iconName: 'heart',
      location: 'Marquee Portico',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* SECTION 1: COUPLE PRESENTATION & SACRED QUOTE */}
      <section className="text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-[#f4ede2] border border-[#ded2be]">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 fill-amber-300" />
        </div>

        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3 px-2">
          <p className="font-script text-xl xs:text-2xl sm:text-3xl text-[#57412f] leading-relaxed">
            &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
          </p>
          <p className="text-[10px] sm:text-xs font-serif-luxury uppercase tracking-widest text-[#7b6552]">
            &mdash; Maya Angelou
          </p>
        </div>

        {/* Couple Portraits / Monogram Wreath - Always Side-by-Side */}
        <div className="relative py-4 sm:py-8 w-full max-w-2xl mx-auto flex flex-row items-start sm:items-center justify-center gap-2 xs:gap-4 sm:gap-8 md:gap-12">
          {/* Bride Profile Card */}
          <div className="flex-1 max-w-[155px] xs:max-w-[190px] sm:max-w-[240px] flex flex-col items-center text-center group">
            <div className="relative w-24 h-24 xs:w-30 xs:h-30 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1 xs:p-1.5 sm:p-2 bg-gradient-to-tr from-[#ece1d0] via-white to-[#f5ebdb] shadow-lg sm:shadow-xl border border-[#d8c8b0] overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-[#faf7f2] flex flex-col items-center justify-center text-[#4a392b] p-1 xs:p-2 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl mb-0.5">👰🏻‍♀️</span>
                <span className="font-serif-luxury font-semibold text-[10px] xs:text-xs sm:text-sm">The Bride</span>
                <span className="text-[8px] xs:text-[9px] sm:text-xs font-sans-clean text-[#7a6654] leading-tight line-clamp-2">
                  Daughter of Mr. &amp; Mrs. Vance
                </span>
              </div>
            </div>
            <h3 className="mt-2 sm:mt-3 text-sm xs:text-base sm:text-xl md:text-2xl font-serif-luxury font-bold text-stone-900 leading-tight">
              {config.brideName}
            </h3>
          </div>

          {/* Center Golden Amperage */}
          <div className="flex flex-col items-center justify-center shrink-0 pt-7 xs:pt-9 sm:pt-0 px-0.5 xs:px-1">
            <span className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-amber-700 my-auto">&amp;</span>
            <div className="w-5 xs:w-8 sm:w-12 h-px bg-[#cbb99f] mt-0.5 sm:mt-2" />
          </div>

          {/* Groom Profile Card */}
          <div className="flex-1 max-w-[155px] xs:max-w-[190px] sm:max-w-[240px] flex flex-col items-center text-center group">
            <div className="relative w-24 h-24 xs:w-30 xs:h-30 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1 xs:p-1.5 sm:p-2 bg-gradient-to-tr from-[#f5ebdb] via-white to-[#ece1d0] shadow-lg sm:shadow-xl border border-[#d8c8b0] overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-[#faf7f2] flex flex-col items-center justify-center text-[#4a392b] p-1 xs:p-2 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl mb-0.5">🤵🏻</span>
                <span className="font-serif-luxury font-semibold text-[10px] xs:text-xs sm:text-sm">The Groom</span>
                <span className="text-[8px] xs:text-[9px] sm:text-xs font-sans-clean text-[#7a6654] leading-tight line-clamp-2">
                  Son of Mr. &amp; Mrs. Sterling
                </span>
              </div>
            </div>
            <h3 className="mt-2 sm:mt-3 text-sm xs:text-base sm:text-xl md:text-2xl font-serif-luxury font-bold text-stone-900 leading-tight">
              {config.groomName}
            </h3>
          </div>
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="max-w-xl mx-auto p-4 xs:p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-[#dfd2be] shadow-xl shadow-[#ede3d5]/50">
          <p className="text-[10px] xs:text-xs font-roman uppercase tracking-[0.25em] text-[#5e4937] mb-4 sm:mb-6 font-semibold">
            Counting Down To 17-Oct &bull; 3:00 PM
          </p>

          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-[#faf6ee] border border-[#e8ddcb]">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-[#3d2e21]">
                {timeLeft.days}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-[#735e4d] mt-0.5">
                Days
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-[#faf6ee] border border-[#e8ddcb]">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-[#3d2e21]">
                {timeLeft.hours}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-[#735e4d] mt-0.5">
                Hours
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-[#faf6ee] border border-[#e8ddcb]">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-[#3d2e21]">
                {timeLeft.minutes}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-[#735e4d] mt-0.5">
                Mins
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-[#faf6ee] border border-[#e8ddcb]">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-[#3d2e21]">
                {timeLeft.seconds}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-[#735e4d] mt-0.5">
                Secs
              </span>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-[#6e533c] text-white hover:bg-[#5b432e] text-[11px] sm:text-xs font-serif-luxury tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 touch-manipulation cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Add To Calendar
            </button>
            <button
              onClick={onShowerPetals}
              className="inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-[#f5ece0] text-[#554130] hover:bg-[#ece0cf] border border-[#d8c8b0] text-[11px] sm:text-xs font-serif-luxury tracking-wider uppercase transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Shower Petals
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: EVENT SCHEDULE & CEREMONY */}
      <section id="schedule" className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-[#7a644f] font-semibold">
            Order of Events
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            The Wedding Day Itinerary
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#bfa88b] to-transparent mx-auto" />
          <p className="text-sm font-sans-clean text-stone-600 max-w-lg mx-auto">
            Saturday, 17-Oct 2026 &bull; Timing: 3:00 PM &bull; Domeera Marquee, Islamabad
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical champagne connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#dfd2be] via-[#cbb99e] to-[#dfd2be] -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {schedule.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-10 pl-14 sm:pl-0`}
                >
                  {/* Center Node Badge */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-amber-400 shadow-md flex items-center justify-center text-amber-700 z-10">
                    {item.iconName === 'church' && <Church className="w-4 h-4" />}
                    {item.iconName === 'wine' && <Wine className="w-4 h-4" />}
                    {item.iconName === 'utensils' && <UtensilsCrossed className="w-4 h-4" />}
                    {item.iconName === 'sparkles' && <PartyPopper className="w-4 h-4" />}
                    {item.iconName === 'heart' && <Heart className="w-4 h-4 fill-amber-300" />}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#e2d5c3] shadow-md hover:shadow-lg transition-all ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <div
                      className="inline-block px-3 py-1 rounded-full bg-[#f6efe4] text-[#594432] text-xs font-serif-luxury font-semibold mb-2 border border-[#e2d6c4]"
                    >
                      {item.time}
                    </div>
                    <h3 className="text-xl font-serif-luxury font-bold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-xs font-serif-luxury italic text-[#82644b] mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm font-sans-clean text-stone-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div
                      className={`flex items-center gap-1.5 text-xs text-[#735e4d] ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: VENUE & LOCATION */}
      <section id="venue" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#faf7f2] via-white to-[#f5eee2] border border-[#ded2be] shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-[#7a644f] font-semibold">
            The Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            {config.venueName}
          </h2>
          <p className="text-xs sm:text-sm font-sans-clean text-[#695543]">
            {config.venueAddress}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual Venue Presentation Card with Scroll Parallax & Blur */}
          <div
            ref={venueImageContainerRef}
            className="relative h-80 sm:h-96 md:h-[430px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d8c8b0] shadow-xl group flex flex-col justify-end p-4 sm:p-6"
          >
            {/* Parallax Image Background */}
            <motion.div
              style={{
                y: venueParallaxY,
                scale: venueParallaxScale,
                filter: venueBlur,
              }}
              className="absolute -top-[20%] -bottom-[20%] inset-x-0 w-full h-[140%] will-change-transform"
            >
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmqDt1EwGvvB_llydSxx_2_8GX1WeAEidm2bRD8NcSPPo5LsNriE6KQ_tu3JGwAsFNAm7fepNfCJiOtxNxxdfdEtW3ZjkCFgJj8DnBQtF6VfNU0dr1GHyyK1EQE6L0SXDasVriafJ2UvnCB=s680-w680-h510-rw"
                alt="Domeera Marquee Islamabad Wedding Venue"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Ambient luxury lighting gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

            {/* Spacious Bottom Frosted Caption */}
            <div className="relative z-10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white space-y-1 shadow-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <h3 className="font-serif-luxury font-bold text-lg sm:text-xl text-white tracking-wide">
                  Domeera Marquee
                </h3>
                <span className="text-[11px] sm:text-xs text-amber-200/90 font-serif-luxury">
                  &bull; Islamabad
                </span>
              </div>
              <p className="text-xs font-sans-clean text-stone-200 leading-relaxed">
                Main Gulberg Expressway &bull; Air Conditioned &bull; Valet Parking
              </p>
            </div>
          </div>

          {/* Venue Information & Directions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#e8ddcb] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Address &amp; Landmarks
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    Service Road, Main Gulberg Expy, Koral Town, Islamabad, 46000
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#e8ddcb] flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Guest Arrival &amp; Event Timing
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    Doors open at 2:30 PM. Formal proceedings commence promptly at 3:00 PM on Saturday, 17-Oct.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#e8ddcb] flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Parking &amp; Navigation
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    Complimentary valet parking provided upon entry. Direct and easy access from Main Gulberg Expressway.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6e533c] hover:bg-[#5b432e] text-white text-xs font-serif-luxury uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open In Google Maps
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#faf5ed] text-[#4d3928] border border-[#d5c5ad] text-xs font-serif-luxury uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
              >
                <Copy className="w-3.5 h-3.5 text-amber-700" />
                {copiedAddress ? 'Address Copied!' : 'Copy Address'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#faf5ed] text-[#4d3928] border border-[#d5c5ad] text-xs font-serif-luxury uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-700" />
                {copiedLink ? 'Link Copied!' : 'Share Invitation'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THEMED DRESSING (Attire Guide) */}
      <section id="attire" className="p-8 sm:p-12 rounded-3xl bg-white border border-[#dfd2be] shadow-lg text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5ece0] text-[#55402f] border border-[#dfd3c0] text-xs font-serif-luxury tracking-widest uppercase">
          <Palette className="w-3.5 h-3.5 text-amber-700" />
          Themed Dressing
        </div>

        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
            White &amp; Beige Theme Attire
          </h3>
          <p className="text-xs sm:text-sm font-sans-clean text-stone-600 max-w-xl mx-auto leading-relaxed">
            To create an aesthetically cohesive and elegant setting for our celebrations, we kindly request our valued guests to join us dressed in our chosen theme.
          </p>
        </div>

        {/* Two Attire Cards: Girls & Boys */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {/* Girls Attire Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#fdfcf9] via-white to-[#fbf8f2] border-2 border-[#dfd2be] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#faf5ee] border border-[#e4d7c5] text-[#543f2e] text-[10px] font-serif-luxury uppercase tracking-widest font-semibold">
                Girls &amp; Ladies
              </span>
              <span className="text-2xl">👰🏻‍♀️</span>
            </div>

            <h4 className="text-xl font-serif-luxury font-bold text-[#2d221a] mb-1">
              White, Off White &amp; Beige
            </h4>
            <p className="text-xs font-sans-clean text-[#6c5949] leading-relaxed mb-4">
              Formal wear in shades of pure white, soft ivory, off-white, and warm beige. Suitable attire includes formal lehengas, ghararas, sarees, embroidered suits, or maxi gowns.
            </p>

            {/* Color Swatches */}
            <div className="pt-3 border-t border-[#ede3d4]">
              <span className="text-[10px] font-roman uppercase tracking-wider text-[#8b7664] block mb-2 font-semibold">
                Recommended Palette:
              </span>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#ffffff] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">White</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#faf6f0] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Off-White</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#f4ece0] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Ivory</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#e6dac8] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Beige</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#d8c5aa] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Champagne</span>
                </div>
              </div>
            </div>
          </div>

          {/* Boys Attire Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#fdfcf9] via-white to-[#fbf8f2] border-2 border-[#dfd2be] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#faf5ee] border border-[#e4d7c5] text-[#543f2e] text-[10px] font-serif-luxury uppercase tracking-widest font-semibold">
                Boys &amp; Gentlemen
              </span>
              <span className="text-2xl">🤵🏻</span>
            </div>

            <h4 className="text-xl font-serif-luxury font-bold text-[#2d221a] mb-1">
              White Shalwar Kameez &amp; Brown Waistcoat
            </h4>
            <p className="text-xs font-sans-clean text-[#6c5949] leading-relaxed mb-4">
              Traditional crisp white Shalwar Kameez or Kurta Pajama paired with a tailored brown, mocha, or camel waistcoat. Formal leather footwear or Peshawari chappal.
            </p>

            {/* Color Swatches */}
            <div className="pt-3 border-t border-[#ede3d4]">
              <span className="text-[10px] font-roman uppercase tracking-wider text-[#8b7664] block mb-2 font-semibold">
                Recommended Palette:
              </span>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#ffffff] border-2 border-[#d8c8b0] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">White</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#8c5e39] border-2 border-[#ffffff] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Camel</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#654326] border-2 border-[#ffffff] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Walnut</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#4a2e19] border-2 border-[#ffffff] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Mocha</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#c2964e] border-2 border-[#ffffff] shadow-2xs" />
                  <span className="text-[9px] font-sans-clean text-stone-600 mt-1">Brass Gold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WISHING WELL & REGISTRY */}
      <section id="wishing-well" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#FFF9F5] via-[#F8EEF2] to-[#FFF9F5] border border-[#E8C0D0] text-center max-w-2xl mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#F8EEF2] text-[#A87888] flex items-center justify-center mx-auto border border-[#E8C0D0]">
          <Gift className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-serif-luxury font-bold text-[#8F6875]">
          The Wishing Well
        </h3>
        <p className="text-xs sm:text-sm font-sans-clean text-[#8F6875]/85 leading-relaxed">
          Your warm presence and heartfelt prayers on our wedding day are the greatest gift of all. Should you wish to bless us with a token of love, a wishing well will be placed at the reception to help us build our new home together.
        </p>
        <div className="pt-2 text-xs font-serif-luxury italic text-[#A87888]">
          With all our love and gratitude, {config.brideName} &amp; {config.groomName}
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <footer className="pt-12 border-t border-[#E8C0D0]/70 text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReplayEnvelope}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF9F5] hover:bg-[#F8EEF2] border border-[#D8BFA5] text-[#8F6875] text-xs font-serif-luxury uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#A87888]" />
            Fold Back Letter &bull; Replay Opening
          </button>
        </div>

        <p className="text-xs font-serif-luxury text-[#8F6875]/70 tracking-wider">
          Crafted with love &bull; White &amp; Beige Wedding Celebration &bull; Islamabad 2026
        </p>
      </footer>
    </div>
  );
};
