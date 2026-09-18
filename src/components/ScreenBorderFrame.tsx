import React from 'react';
import { motion } from 'motion/react';

interface ScreenBorderFrameProps {
  isOpen: boolean;
}

export const ScreenBorderFrame: React.FC<ScreenBorderFrameProps> = ({ isOpen }) => {
  const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* ================= LEFT SIDE BORDER FRAME ================= */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: smoothEase }}
        className="absolute left-0 top-0 bottom-0 w-6 xs:w-8 sm:w-12 md:w-16 flex items-center justify-start pointer-events-none"
      >
        {/* Outer Champagne Metallic Line */}
        <div className="absolute left-1 xs:left-2 sm:left-3 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#D8BFA5] to-transparent shadow-[0_0_8px_rgba(216,191,165,0.45)]" />

        {/* Inner Dashed Powder Pink / Dusty Rose Hairline */}
        <div className="absolute left-2.5 xs:left-4 sm:left-6 top-8 bottom-8 w-[1px] border-l border-dashed border-[#E8C0D0]/85" />

        {/* Vertical Botanical Garland running along left edge */}
        <div className="absolute left-1.5 xs:left-2.5 sm:left-4.5 inset-y-0 flex flex-col justify-around py-16 opacity-80">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`left-vine-${i}`}
              animate={{
                rotate: [0, 4, 0, -4, 0],
                opacity: isOpen ? [0.65, 1, 0.65] : 0.75,
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-[10px] xs:text-xs sm:text-sm select-none filter drop-shadow-[0_1px_3px_rgba(143,104,117,0.3)]"
            >
              {i % 2 === 0 ? '🌸' : '✨'}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ================= RIGHT SIDE BORDER FRAME ================= */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: smoothEase }}
        className="absolute right-0 top-0 bottom-0 w-6 xs:w-8 sm:w-12 md:w-16 flex items-center justify-end pointer-events-none"
      >
        {/* Outer Champagne Metallic Line */}
        <div className="absolute right-1 xs:right-2 sm:right-3 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#D8BFA5] to-transparent shadow-[0_0_8px_rgba(216,191,165,0.45)]" />

        {/* Inner Dashed Powder Pink / Dusty Rose Hairline */}
        <div className="absolute right-2.5 xs:right-4 sm:right-6 top-8 bottom-8 w-[1px] border-r border-dashed border-[#E8C0D0]/85" />

        {/* Vertical Botanical Garland running along right edge */}
        <div className="absolute right-1.5 xs:right-2.5 sm:right-4.5 inset-y-0 flex flex-col justify-around py-16 opacity-80">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`right-vine-${i}`}
              animate={{
                rotate: [0, -4, 0, 4, 0],
                opacity: isOpen ? [0.65, 1, 0.65] : 0.75,
              }}
              transition={{
                duration: 6.5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-[10px] xs:text-xs sm:text-sm select-none filter drop-shadow-[0_1px_3px_rgba(143,104,117,0.3)]"
            >
              {i % 2 === 0 ? '🌸' : '✨'}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ================= CORNER 1: TOP-LEFT CORNER ORNAMENT ================= */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
        className="absolute top-1.5 xs:top-2 sm:top-3 left-1.5 xs:left-2 sm:left-3 pointer-events-none"
      >
        <svg
          className="w-10 h-10 xs:w-14 xs:h-14 sm:w-20 sm:h-20 text-[#D8BFA5] drop-shadow-[0_2px_4px_rgba(143,104,117,0.2)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Corner Curves */}
          <path
            d="M 5 95 L 5 25 C 5 14 14 5 25 5 L 95 5"
            stroke="url(#champagneGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Inner Accent Line */}
          <path
            d="M 12 85 L 12 30 C 12 20 20 12 30 12 L 85 12"
            stroke="url(#roseGoldGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          {/* Corner Flourish Curl */}
          <path
            d="M 5 5 Q 35 35 60 15 Q 40 40 15 60 Q 35 35 5 5"
            fill="url(#champagneGrad)"
            opacity="0.85"
          />
          {/* Central Warm Ivory Pearl Center Node */}
          <circle cx="20" cy="20" r="4.5" fill="#FFF9F5" stroke="#D8BFA5" strokeWidth="1.8" />
        </svg>
      </motion.div>

      {/* ================= CORNER 2: TOP-RIGHT CORNER ORNAMENT ================= */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
        className="absolute top-1.5 xs:top-2 sm:top-3 right-1.5 xs:right-2 sm:right-3 pointer-events-none transform -scale-x-100"
      >
        <svg
          className="w-10 h-10 xs:w-14 xs:h-14 sm:w-20 sm:h-20 text-[#D8BFA5] drop-shadow-[0_2px_4px_rgba(143,104,117,0.2)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 5 95 L 5 25 C 5 14 14 5 25 5 L 95 5"
            stroke="url(#champagneGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 85 L 12 30 C 12 20 20 12 30 12 L 85 12"
            stroke="url(#roseGoldGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 5 5 Q 35 35 60 15 Q 40 40 15 60 Q 35 35 5 5"
            fill="url(#champagneGrad)"
            opacity="0.85"
          />
          <circle cx="20" cy="20" r="4.5" fill="#FFF9F5" stroke="#D8BFA5" strokeWidth="1.8" />
        </svg>
      </motion.div>

      {/* ================= CORNER 3: BOTTOM-LEFT CORNER ORNAMENT ================= */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: smoothEase }}
        className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3 left-1.5 xs:left-2 sm:left-3 pointer-events-none transform -scale-y-100"
      >
        <svg
          className="w-10 h-10 xs:w-14 xs:h-14 sm:w-20 sm:h-20 text-[#D8BFA5] drop-shadow-[0_2px_4px_rgba(143,104,117,0.2)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 5 95 L 5 25 C 5 14 14 5 25 5 L 95 5"
            stroke="url(#champagneGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 85 L 12 30 C 12 20 20 12 30 12 L 85 12"
            stroke="url(#roseGoldGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 5 5 Q 35 35 60 15 Q 40 40 15 60 Q 35 35 5 5"
            fill="url(#champagneGrad)"
            opacity="0.85"
          />
          <circle cx="20" cy="20" r="4.5" fill="#FFF9F5" stroke="#D8BFA5" strokeWidth="1.8" />
        </svg>
      </motion.div>

      {/* ================= CORNER 4: BOTTOM-RIGHT CORNER ORNAMENT ================= */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: smoothEase }}
        className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3 right-1.5 xs:right-2 sm:right-3 pointer-events-none transform -scale-x-100 -scale-y-100"
      >
        <svg
          className="w-10 h-10 xs:w-14 xs:h-14 sm:w-20 sm:h-20 text-[#D8BFA5] drop-shadow-[0_2px_4px_rgba(143,104,117,0.2)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 5 95 L 5 25 C 5 14 14 5 25 5 L 95 5"
            stroke="url(#champagneGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 85 L 12 30 C 12 20 20 12 30 12 L 85 12"
            stroke="url(#roseGoldGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 5 5 Q 35 35 60 15 Q 40 40 15 60 Q 35 35 5 5"
            fill="url(#champagneGrad)"
            opacity="0.85"
          />
          <circle cx="20" cy="20" r="4.5" fill="#FFF9F5" stroke="#D8BFA5" strokeWidth="1.8" />
        </svg>
      </motion.div>

      {/* Shared SVG Gradients */}
      <svg className="w-0 h-0 absolute">
        <defs>
          <linearGradient id="champagneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="50%" stopColor="#D8BFA5" />
            <stop offset="100%" stopColor="#A87888" />
          </linearGradient>
          <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="50%" stopColor="#E8C0D0" />
            <stop offset="100%" stopColor="#8F6875" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
