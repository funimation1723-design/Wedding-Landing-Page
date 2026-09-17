import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Send,
  Sparkles,
  Music2,
  CheckCircle2,
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
  PartyPopper
} from 'lucide-react';
import { WeddingConfig, RSVPData, ScheduleEvent, LoveMilestone } from '../types';

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
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 120,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // Target date: October 24, 2026
    const targetDate = new Date('2026-10-24T13:00:00');

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

  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    attending: 'yes' as 'yes' | 'no',
    guestCount: 1,
    dietary: 'None',
    message: '',
  });

  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Wishes Wall
  const [wishes, setWishes] = useState<RSVPData[]>([
    {
      id: '1',
      name: 'Julian & Claire Montgomery',
      attending: 'yes',
      guestCount: 2,
      dietary: 'Vegetarian',
      message: 'May your love blossom as beautifully as cherry blossoms in springtime! Cannot wait to celebrate with you both.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'Aunt Vivienne & Uncle Marcus',
      attending: 'yes',
      guestCount: 2,
      dietary: 'None',
      message: 'So overjoyed for this next chapter. You two are truly made for each other. Sending all our heartfelt blessings!',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      name: 'Sophia Chen',
      attending: 'yes',
      guestCount: 1,
      dietary: 'Gluten-Free',
      message: 'The most romantic couple! Counting down the days until the magical Kyoto ceremony.',
      timestamp: '2 days ago',
    },
  ]);

  const [wishLikes, setWishLikes] = useState<{ [id: string]: number }>({
    '1': 14,
    '2': 21,
    '3': 9,
  });

  const handleLikeWish = (id: string) => {
    setWishLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    onShowerPetals();
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    const newWish: RSVPData = {
      id: Date.now().toString(),
      name: rsvpForm.name,
      attending: rsvpForm.attending,
      guestCount: rsvpForm.guestCount,
      dietary: rsvpForm.dietary,
      message: rsvpForm.message || 'Sending our deepest love and warmest wishes on your wedding day!',
      timestamp: 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setRsvpSubmitted(true);
    onShowerPetals();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${config.brideName} & ${config.groomName}'s Wedding`);
    const details = encodeURIComponent(
      `Join us in celebrating the holy matrimony of ${config.brideName} & ${config.groomName} at ${config.venueName}.`
    );
    const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}`);
    // 2026-10-24 13:00 to 22:00 UTC
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261024T130000Z/20261024T220000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  // Schedule Timeline
  const schedule: ScheduleEvent[] = [
    {
      time: '1:00 PM',
      title: 'The Holy Matrimony',
      subtitle: 'Sacred Vows & Exchange of Rings',
      description: 'Under the arched cherry blossom canopy, witness the sacred promise and binding of two souls.',
      iconName: 'church',
      location: 'The Glass Pavilion Chapel',
    },
    {
      time: '3:30 PM',
      title: 'Sakura Garden Cocktails',
      subtitle: 'Artisanal Canapés & Rosé Toast',
      description: 'Mingle amidst blooming cherry blossom trees with live acoustic string quartet and hors d’oeuvres.',
      iconName: 'wine',
      location: 'The Japanese Zen Courtyard',
    },
    {
      time: '5:30 PM',
      title: 'The Grand Floral Banquet',
      subtitle: 'Four-Course Culinary Journey & Speeches',
      description: 'An evening of gourmet cuisine, heartfelt family toasts, and the romantic first dance.',
      iconName: 'utensils',
      location: 'The Grand Ballroom & Conservatory',
    },
    {
      time: '8:30 PM',
      title: 'Starlight Soirée & Send-Off',
      subtitle: 'Champagne, Dancing & Golden Sparklers',
      description: 'Dance beneath hanging crystal chandeliers followed by a starlit lantern send-off.',
      iconName: 'sparkles',
      location: 'The Lakeside Veranda',
    },
  ];

  // Love Story Milestones
  const milestones: LoveMilestone[] = [
    {
      year: 'April 2021',
      title: 'First Met Under the Blossoms',
      description: 'A serendipitous collision in Kyoto during peak sakura blossom season, over a shared favorite book.',
      image: '🌸',
      tag: 'The Beginning',
    },
    {
      year: 'Autumn 2023',
      title: 'Adventures Across Continents',
      description: 'From midnight walks along the Seine to hiking mountain ridges in Hokkaido, discovering life is sweetest together.',
      image: '✈️',
      tag: 'The Journey',
    },
    {
      year: 'Spring 2025',
      title: 'The Starlit Proposal',
      description: 'Surrounded by floating candlelit paper lanterns beneath the weeping cherry blossoms, she said forever.',
      image: '💍',
      tag: 'She Said Yes',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* SECTION 1: COUPLE PRESENTATION & SACRED QUOTE */}
      <section className="text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-pink-100/80 border border-pink-200">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-pink-300" />
        </div>

        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3 px-2">
          <p className="font-script text-xl xs:text-2xl sm:text-3xl text-pink-700 leading-relaxed">
            &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
          </p>
          <p className="text-[10px] sm:text-xs font-serif-luxury uppercase tracking-widest text-stone-500">
            &mdash; Maya Angelou
          </p>
        </div>

        {/* Couple Portraits / Monogram Wreath - Always Side-by-Side */}
        <div className="relative py-4 sm:py-8 w-full max-w-2xl mx-auto flex flex-row items-start sm:items-center justify-center gap-2 xs:gap-4 sm:gap-8 md:gap-12">
          {/* Bride Profile Card */}
          <div className="flex-1 max-w-[155px] xs:max-w-[190px] sm:max-w-[240px] flex flex-col items-center text-center group">
            <div className="relative w-24 h-24 xs:w-30 xs:h-30 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1 xs:p-1.5 sm:p-2 bg-gradient-to-tr from-pink-200 via-white to-amber-100 shadow-lg sm:shadow-xl border border-pink-200 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-[#fdf2f4] flex flex-col items-center justify-center text-pink-800 p-1 xs:p-2 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl mb-0.5">👰🏻‍♀️</span>
                <span className="font-serif-luxury font-semibold text-[10px] xs:text-xs sm:text-sm">The Bride</span>
                <span className="text-[8px] xs:text-[9px] sm:text-xs font-sans-clean text-stone-500 leading-tight line-clamp-2">
                  Daughter of Mr. &amp; Mrs. Vance
                </span>
              </div>
            </div>
            <h3 className="mt-2 sm:mt-3 text-sm xs:text-base sm:text-xl md:text-2xl font-serif-luxury font-bold text-stone-800 leading-tight">
              {config.brideName}
            </h3>
          </div>

          {/* Center Golden Amperage */}
          <div className="flex flex-col items-center justify-center shrink-0 pt-7 xs:pt-9 sm:pt-0 px-0.5 xs:px-1">
            <span className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-pink-500 my-auto">&amp;</span>
            <div className="w-5 xs:w-8 sm:w-12 h-px bg-pink-300 mt-0.5 sm:mt-2" />
          </div>

          {/* Groom Profile Card */}
          <div className="flex-1 max-w-[155px] xs:max-w-[190px] sm:max-w-[240px] flex flex-col items-center text-center group">
            <div className="relative w-24 h-24 xs:w-30 xs:h-30 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1 xs:p-1.5 sm:p-2 bg-gradient-to-tr from-amber-100 via-white to-pink-200 shadow-lg sm:shadow-xl border border-pink-200 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-[#fdf2f4] flex flex-col items-center justify-center text-pink-800 p-1 xs:p-2 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl mb-0.5">🤵🏻</span>
                <span className="font-serif-luxury font-semibold text-[10px] xs:text-xs sm:text-sm">The Groom</span>
                <span className="text-[8px] xs:text-[9px] sm:text-xs font-sans-clean text-stone-500 leading-tight line-clamp-2">
                  Son of Mr. &amp; Mrs. Sterling
                </span>
              </div>
            </div>
            <h3 className="mt-2 sm:mt-3 text-sm xs:text-base sm:text-xl md:text-2xl font-serif-luxury font-bold text-stone-800 leading-tight">
              {config.groomName}
            </h3>
          </div>
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="max-w-xl mx-auto p-4 xs:p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-200/80 shadow-xl shadow-pink-100/50">
          <p className="text-[10px] xs:text-xs font-roman uppercase tracking-[0.25em] text-pink-800 mb-4 sm:mb-6">
            Counting Down To Forever
          </p>

          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-pink-50/70 border border-pink-100">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-pink-900">
                {timeLeft.days}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-stone-500 mt-0.5">
                Days
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-pink-50/70 border border-pink-100">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-pink-900">
                {timeLeft.hours}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-stone-500 mt-0.5">
                Hours
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-pink-50/70 border border-pink-100">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-pink-900">
                {timeLeft.minutes}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-stone-500 mt-0.5">
                Mins
              </span>
            </div>

            <div className="flex flex-col items-center p-2 xs:p-3 rounded-xl bg-pink-50/70 border border-pink-100">
              <span className="text-lg xs:text-2xl sm:text-4xl font-serif-luxury font-bold text-pink-900">
                {timeLeft.seconds}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-roman tracking-wider uppercase text-stone-500 mt-0.5">
                Secs
              </span>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-pink-700 text-white hover:bg-pink-800 text-[11px] sm:text-xs font-serif-luxury tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
            >
              <Calendar className="w-3.5 h-3.5" />
              Add To Calendar
            </button>
            <button
              onClick={onShowerPetals}
              className="inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-pink-100 text-pink-800 hover:bg-pink-200 border border-pink-200 text-[11px] sm:text-xs font-serif-luxury tracking-wider uppercase transition-all active:scale-95 touch-manipulation"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              Shower Petals
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: EVENT SCHEDULE & CEREMONY */}
      <section id="schedule" className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-pink-600">
            Order of Events
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            The Wedding Day Itinerary
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
          <p className="text-sm font-sans-clean text-stone-600 max-w-lg mx-auto">
            Saturday, October 24, 2026 &bull; Formal Attire requested
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical floral vine connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-200 -translate-x-1/2" />

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
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-pink-400 shadow-md flex items-center justify-center text-pink-600 z-10">
                    {item.iconName === 'church' && <Church className="w-4 h-4" />}
                    {item.iconName === 'wine' && <Wine className="w-4 h-4" />}
                    {item.iconName === 'utensils' && <UtensilsCrossed className="w-4 h-4" />}
                    {item.iconName === 'sparkles' && <PartyPopper className="w-4 h-4" />}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-pink-200/80 shadow-md hover:shadow-lg transition-all ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-1 rounded-full bg-pink-100/90 text-pink-800 text-xs font-serif-luxury font-semibold mb-2`}
                    >
                      {item.time}
                    </div>
                    <h3 className="text-xl font-serif-luxury font-bold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-xs font-serif-luxury italic text-pink-700 mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm font-sans-clean text-stone-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div
                      className={`flex items-center gap-1.5 text-xs text-stone-500 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-pink-500" />
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
      <section id="venue" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#fff7f8] via-white to-[#fff0f4] border border-pink-200/90 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-pink-600">
            The Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            {config.venueName}
          </h2>
          <p className="text-xs font-sans-clean text-stone-500">
            {config.venueAddress}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual Venue Presentation Card */}
          <div className="relative rounded-2xl overflow-hidden border border-pink-200 shadow-md group">
            {/* Elegant botanical illustration banner */}
            <div className="h-64 sm:h-72 w-full bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-100 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-500">
                🏯
              </span>
              <p className="font-serif-luxury font-bold text-xl text-stone-800">
                The Botanical Glasshouse Pavilion
              </p>
              <p className="text-xs font-sans-clean text-stone-600 mt-1 max-w-xs">
                Nestled amidst historic bamboo groves and thousand-year-old sakura blossoms in the eastern hills of Kyoto.
              </p>
              <div className="mt-4 px-3 py-1 rounded-full bg-white/80 border border-pink-200 text-xs text-pink-800 font-serif-luxury">
                Heated Glass Pavilion &bull; Valet Available
              </div>
            </div>
          </div>

          {/* Venue Information & Directions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Address &amp; Landmarks
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    108 Blossom Valley Road, Higashiyama Ward, Kyoto 605-0001, Japan
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-100 flex items-start gap-3">
                <Clock className="w-5 h-5 text-pink-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Guest Arrival &amp; Seating
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    Doors open at 12:15 PM. We kindly ask guests to take their seats by 12:45 PM before the bridal procession begins.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-100 flex items-start gap-3">
                <Users className="w-5 h-5 text-pink-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-bold text-stone-900">
                    Complimentary Shuttle Service
                  </h4>
                  <p className="text-xs font-sans-clean text-stone-600 mt-0.5">
                    Private shuttles will run between Kyoto Station Central Gate and the venue every 20 minutes from 11:30 AM to 11:00 PM.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-700 hover:bg-pink-800 text-white text-xs font-serif-luxury uppercase tracking-wider transition-all shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open In Google Maps
              </a>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-stone-700 border border-pink-200 text-xs font-serif-luxury uppercase tracking-wider transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-500" />
                {copiedLink ? 'Link Copied!' : 'Share Invitation'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LOVE STORY / MILESTONES */}
      <section id="story" className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-pink-600">
            Our Chapters
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            How Two Hearts Met
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-pink-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{m.image}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-[11px] font-serif-luxury tracking-wider font-semibold">
                    {m.year}
                  </span>
                </div>
                <span className="text-[10px] font-roman uppercase tracking-widest text-stone-400">
                  {m.tag}
                </span>
                <h4 className="text-lg font-serif-luxury font-bold text-stone-900 mt-1 mb-2">
                  {m.title}
                </h4>
                <p className="text-xs font-sans-clean text-stone-600 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100 flex items-center gap-1.5 text-pink-400 text-xs">
                <Heart className="w-3.5 h-3.5 fill-pink-200" />
                <span className="font-serif-luxury italic">Chapter {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: DRESS CODE & PALETTE */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-pink-200 shadow-lg text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100/90 text-pink-800 text-xs font-serif-luxury tracking-widest uppercase">
          <Palette className="w-3.5 h-3.5 text-pink-600" />
          Dress Code Guide
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
          Sakura Romantic &bull; Black Tie Optional
        </h3>

        <p className="text-xs sm:text-sm font-sans-clean text-stone-600 max-w-xl mx-auto leading-relaxed">
          We invite you to celebrate with us in hues of soft sakura pinks, champagne rose, warm ivory, and soft sage. Gentlemen in formal suits or tuxedos; ladies in midi or floor-length gowns.
        </p>

        {/* Color Palette Swatches */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#fbcfe8] border-2 border-white shadow-md" />
            <span className="text-[11px] font-serif-luxury text-stone-600 mt-1.5">Sakura Blush</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#f472b6] border-2 border-white shadow-md" />
            <span className="text-[11px] font-serif-luxury text-stone-600 mt-1.5">Rose Quartz</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#fff0f5] border-2 border-pink-200 shadow-md" />
            <span className="text-[11px] font-serif-luxury text-stone-600 mt-1.5">Pearl White</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#f5d77f] border-2 border-white shadow-md" />
            <span className="text-[11px] font-serif-luxury text-stone-600 mt-1.5">Champagne Gold</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#d1e7dd] border-2 border-white shadow-md" />
            <span className="text-[11px] font-serif-luxury text-stone-600 mt-1.5">Soft Sage</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE RSVP & LIVE BLESSINGS WALL */}
      <section id="rsvp" className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-roman uppercase tracking-[0.25em] text-pink-600">
            Be Our Guest
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            RSVP &amp; Send Your Blessings
          </h2>
          <p className="text-xs font-sans-clean text-stone-500">
            Kindly respond by September 15, 2026 to help us finalize arrangements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* RSVP FORM (Left column) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-pink-200/90 shadow-xl">
            {rsvpSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif-luxury font-bold text-stone-900">
                  Thank You, {rsvpForm.name}!
                </h3>
                <p className="text-sm font-sans-clean text-stone-600 max-w-sm mx-auto">
                  {rsvpForm.attending === 'yes'
                    ? 'Your confirmation and warm blessings have been received. We cannot wait to celebrate together!'
                    : 'We will deeply miss you, but thank you for your kind wishes and heartfelt blessing.'}
                </p>
                <button
                  type="button"
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-serif-luxury tracking-wider uppercase transition-colors"
                >
                  Edit Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Full Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Lord &amp; Lady Montgomery"
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400/50 bg-[#fffbfc] text-sm text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1.5">
                    Will You Be Attending? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: 'yes' })}
                      className={`p-3 rounded-xl border text-xs font-serif-luxury font-semibold transition-all ${
                        rsvpForm.attending === 'yes'
                          ? 'bg-pink-700 text-white border-pink-700 shadow-md'
                          : 'bg-white text-stone-700 border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attending: 'no' })}
                      className={`p-3 rounded-xl border text-xs font-serif-luxury font-semibold transition-all ${
                        rsvpForm.attending === 'no'
                          ? 'bg-pink-700 text-white border-pink-700 shadow-md'
                          : 'bg-white text-stone-700 border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {rsvpForm.attending === 'yes' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1.5">
                        Number of Guests
                      </label>
                      <select
                        value={rsvpForm.guestCount}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guestCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-[#fffbfc] text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1.5">
                        Dietary Preference
                      </label>
                      <select
                        value={rsvpForm.dietary}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-[#fffbfc] text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                      >
                        <option value="None">Standard Menu</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Halal">Halal</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1.5">
                    Blessing &amp; Message for the Couple
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Write a sweet congratulatory note to be displayed on our wishes wall..."
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400/50 bg-[#fffbfc] text-sm text-stone-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white text-xs font-serif-luxury uppercase tracking-widest font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit RSVP &amp; Post Blessing
                </button>
              </form>
            )}
          </div>

          {/* LIVE WISHES / GUESTBOOK WALL (Right column) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-serif-luxury font-bold text-xl text-stone-900 flex items-center gap-2">
                <span>Guest Wishes &amp; Blessings</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-sans-clean font-semibold">
                  {wishes.length}
                </span>
              </h3>
              <span className="text-xs font-serif-luxury text-stone-500">Live Guestbook</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl bg-white border border-pink-200/80 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-serif-luxury font-bold text-stone-800">
                        {w.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                        <span>{w.timestamp}</span>
                        {w.attending === 'yes' && (
                          <span className="text-pink-600">&bull; Attending</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLikeWish(w.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 text-xs transition-colors"
                      title="Send love"
                    >
                      <Heart className="w-3 h-3 fill-pink-500" />
                      <span className="text-[11px] font-sans-clean font-medium">
                        {wishLikes[w.id] || 0}
                      </span>
                    </button>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm font-sans-clean text-stone-600 leading-relaxed italic">
                    &ldquo;{w.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WISHING WELL & REGISTRY */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-pink-50 via-white to-pink-50 border border-pink-200/90 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
          <Gift className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-serif-luxury font-bold text-stone-900">
          The Wishing Well
        </h3>
        <p className="text-xs sm:text-sm font-sans-clean text-stone-600 leading-relaxed">
          Your presence at our wedding is the greatest gift of all. However, should you wish to honour us with a gift, a wishing well will be placed at the reception to help us build our new home and embark on our dream honeymoon.
        </p>
        <div className="pt-2 text-xs font-serif-luxury italic text-stone-400">
          With all our love and gratitude, {config.brideName} &amp; {config.groomName}
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <footer className="pt-12 border-t border-pink-200/60 text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onReplayEnvelope}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-stone-700 text-xs font-serif-luxury uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
            Fold Back Letter &bull; Replay Opening
          </button>
        </div>

        <p className="text-xs font-serif-luxury text-stone-400 tracking-wider">
          Crafted with love &bull; Pink &amp; White Sakura Wedding Invitation
        </p>
      </footer>
    </div>
  );
};
