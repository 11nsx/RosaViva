import React from 'react';

interface PinkRibbonIconProps {
  className?: string;
  size?: number;
}

export const PinkRibbonIcon: React.FC<PinkRibbonIconProps> = ({
  className = 'w-6 h-6',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Símbolo do Laço Rosa - Outubro Rosa"
      role="img"
    >
      <defs>
        <linearGradient id="ribbonGrad" x1="12" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" />
          <stop offset="0.5" stopColor="#EC4899" />
          <stop offset="1" stopColor="#BE185D" />
        </linearGradient>
        <filter id="ribbonShadow" x1="0" y1="0" width="48" height="52" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#9D174D" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#ribbonShadow)">
        {/* Right Ribbon Leg */}
        <path
          d="M24 16C28 20 33 27 34 38C34 40 31 41 29 39C27 36 24 30 22 25"
          stroke="url(#ribbonGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Main Ribbon Loop and Left Leg */}
        <path
          d="M19 39C17 41 14 40 14 38C15 27 20 20 24 16C27 12 28 8 24 6C20 4 17 8 20 13C22 17 26 21 29 25"
          stroke="url(#ribbonGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
