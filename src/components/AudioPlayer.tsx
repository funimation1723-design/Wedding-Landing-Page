import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  // Romantic Canon-inspired chime arpeggio notes (Frequencies in Hz)
  // D4, F#4, A4, D5, A4, C#5, E5, B4, D5, F#5, F#4, A4, C#5, G4, B4, D5, D4, F#4, A4, G4, B4, D5, A4, C#5, E5
  const chords = [
    // D Major
    [293.66, 369.99, 440.0, 587.33],
    // A Major
    [220.0, 277.18, 329.63, 440.0],
    // B Minor
    [246.94, 293.66, 369.99, 493.88],
    // F# Minor
    [185.0, 220.0, 277.18, 369.99],
    // G Major
    [196.0, 246.94, 293.66, 392.0],
    // D Major
    [293.66, 369.99, 440.0, 587.33],
    // G Major
    [196.0, 246.94, 293.66, 392.0],
    // A Major
    [220.0, 277.18, 330.0, 440.0],
  ];

  const playChimeNote = useCallback((ctx: AudioContext, freq: number, time: number, duration = 2.4) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft bell / harp tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Subtle warm harmonics
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);

      // Gentle pluck envelope
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Audio context cleanup safe
    }
  }, []);

  const scheduleNotes = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const chordIndex = Math.floor(stepRef.current / 4) % chords.length;
    const noteIndex = stepRef.current % 4;
    const chord = chords[chordIndex];
    const freq = chord[noteIndex];

    const now = ctx.currentTime;
    playChimeNote(ctx, freq, now, 2.2);

    // Play soft bass tone on chord root
    if (noteIndex === 0) {
      playChimeNote(ctx, chord[0] / 2, now, 3.2);
    }

    stepRef.current++;
    timerRef.current = window.setTimeout(scheduleNotes, 520);
  }, [chords, playChimeNote]);

  const startMusic = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      stepRef.current = 0;
      setIsPlaying(true);
      scheduleNotes();
    } catch (e) {
      console.warn('Audio play restricted by browser policy:', e);
    }
  }, [scheduleNotes]);

  const stopMusic = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startMusic();
    }
  }, [autoPlayTrigger, isPlaying, startMusic]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <button
        id="wedding-music-toggle"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute romantic wedding music' : 'Play romantic wedding music'}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-lg shadow-pink-200/30 text-[#831843] hover:bg-pink-50 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-pink-400" />
          )}
        </span>

        <span className="text-xs font-serif-luxury font-medium tracking-wide text-pink-900 hidden sm:inline">
          {isPlaying ? 'Melody Playing' : 'Play Music'}
        </span>

        {/* Dancing audio wave indicator */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 px-0.5">
            <span className="w-0.5 bg-pink-500 rounded-full animate-[bounce_1s_infinite_100ms] h-2"></span>
            <span className="w-0.5 bg-pink-600 rounded-full animate-[bounce_1s_infinite_300ms] h-3.5"></span>
            <span className="w-0.5 bg-pink-400 rounded-full animate-[bounce_1s_infinite_200ms] h-2.5"></span>
            <span className="w-0.5 bg-pink-500 rounded-full animate-[bounce_1s_infinite_400ms] h-3"></span>
          </div>
        )}
      </button>
    </div>
  );
};
