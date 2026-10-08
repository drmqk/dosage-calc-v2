import React from 'react';

interface AppIconProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AppIcon: React.FC<AppIconProps> = ({
  className = '',
  size = 40,
  showText = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        {/* Main Background Gradient matching the icon */}
        <linearGradient id="iconBgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00c8ce" />
          <stop offset="50%" stopColor="#00a8aa" />
          <stop offset="100%" stopColor="#00898b" />
        </linearGradient>

        {/* Syringe Liquid Gradient */}
        <linearGradient id="syringeFluid" x1="250" y1="180" x2="290" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Pill Blue Half Gradient */}
        <linearGradient id="pillBlue" x1="180" y1="200" x2="250" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Pill Shadow */}
        <filter id="pillShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="#00474b" floodOpacity="0.4" />
        </filter>
        <filter id="syringeShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#00474b" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Rounded Squircle Background */}
      <rect width="512" height="512" rx="128" fill="url(#iconBgGrad)" />

      {/* Subtle Inner Highlight */}
      <rect
        x="6"
        y="6"
        width="500"
        height="500"
        rx="122"
        stroke="#ffffff"
        strokeWidth="3"
        strokeOpacity="0.25"
        fill="none"
      />

      {/* ================= GAUGE & TIMER ================= */}
      {/* Outer Gauge Arc */}
      <path
        d="M 174 300 A 115 115 0 1 1 338 300"
        fill="none"
        stroke="#ffffff"
        strokeWidth="11"
        strokeLinecap="round"
        strokeOpacity="0.95"
      />

      {/* Gauge Outer Ticks */}
      <g stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeOpacity="0.8">
        <line x1="158" y1="280" x2="168" y2="276" />
        <line x1="149" y1="248" x2="160" y2="246" />
        <line x1="148" y1="215" x2="159" y2="216" />
        <line x1="154" y1="183" x2="165" y2="187" />
        <line x1="168" y1="153" x2="177" y2="160" />
        <line x1="189" y1="128" x2="197" y2="137" />
        <line x1="215" y1="110" x2="221" y2="120" />
        <line x1="245" y1="100" x2="247" y2="111" />
        <line x1="275" y1="100" x2="273" y2="111" />
        <line x1="305" y1="110" x2="299" y2="120" />
        <line x1="331" y1="128" x2="323" y2="137" />
        <line x1="352" y1="153" x2="343" y2="160" />
        <line x1="366" y1="183" x2="355" y2="187" />
        <line x1="372" y1="215" x2="361" y2="216" />
        <line x1="371" y1="248" x2="360" y2="246" />
        <line x1="362" y1="280" x2="352" y2="276" />
      </g>

      {/* Inner Directional Curved Arrow (Clockwise Speed / Timing) */}
      <path
        d="M 174 236 A 88 88 0 0 1 256 148 L 256 160 L 274 148 L 256 136 L 256 148"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ================= 3D PILL / CAPSULE ================= */}
      <g transform="translate(225, 235) rotate(-38)" filter="url(#pillShadow)">
        {/* Pill Border / Silhouette */}
        <rect
          x="-55"
          y="-28"
          width="110"
          height="56"
          rx="28"
          fill="#1d4ed8"
          stroke="#ffffff"
          strokeWidth="6"
        />

        {/* Pill Left Half: White with gloss */}
        <path
          d="M -27 -28 A 28 28 0 0 0 -27 28 L 0 28 L 0 -28 Z"
          fill="#ffffff"
        />

        {/* Pill Right Half: Blue gradient */}
        <path
          d="M 0 -28 L 27 -28 A 28 28 0 0 1 27 28 L 0 28 Z"
          fill="url(#pillBlue)"
        />

        {/* Pill Central Dividing Groove */}
        <line x1="0" y1="-28" x2="0" y2="28" stroke="#ffffff" strokeWidth="3" />

        {/* Pill Gloss Highlight */}
        <ellipse cx="-20" cy="-12" rx="15" ry="6" fill="#ffffff" fillOpacity="0.7" transform="rotate(-5)" />
      </g>

      {/* ================= SYRINGE ================= */}
      <g filter="url(#syringeShadow)">
        {/* Needle Top */}
        <line x1="288" y1="108" x2="288" y2="166" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" />

        {/* Needle Hub */}
        <path d="M 283 166 L 293 166 L 291 178 L 285 178 Z" fill="#ffffff" />

        {/* Barrel Outline */}
        <rect
          x="268"
          y="178"
          width="40"
          height="95"
          rx="6"
          fill="#ffffff"
          fillOpacity="0.9"
          stroke="#ffffff"
          strokeWidth="6"
        />

        {/* Barrel Fluid (Cyan/Blue liquid) */}
        <rect x="272" y="196" width="32" height="73" rx="3" fill="url(#syringeFluid)" />

        {/* Measurement Graduations on Barrel */}
        <line x1="272" y1="205" x2="286" y2="205" stroke="#ffffff" strokeWidth="3.5" />
        <line x1="272" y1="216" x2="282" y2="216" stroke="#ffffff" strokeWidth="2.5" />
        <line x1="272" y1="227" x2="286" y2="227" stroke="#ffffff" strokeWidth="3.5" />
        <line x1="272" y1="238" x2="282" y2="238" stroke="#ffffff" strokeWidth="2.5" />
        <line x1="272" y1="249" x2="286" y2="249" stroke="#ffffff" strokeWidth="3.5" />
        <line x1="272" y1="260" x2="282" y2="260" stroke="#ffffff" strokeWidth="2.5" />

        {/* Syringe Plunger Neck & Flange */}
        <rect x="258" y="273" width="60" height="8" rx="3" fill="#ffffff" />
        <rect x="283" y="281" width="10" height="24" fill="#ffffff" />
        <rect x="268" y="305" width="40" height="8" rx="3" fill="#ffffff" />
      </g>

      {/* ================= TYPOGRAPHY ================= */}
      {/* DOSAGE CALC in matching bold white geometric sans */}
      <text
        x="256"
        y="368"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="3"
      >
        DOSAGE
      </text>
      <text
        x="256"
        y="420"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="3"
      >
        CALC
      </text>
    </svg>
  );
};
