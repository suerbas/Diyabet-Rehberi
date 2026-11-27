import React from 'react';

/*
 * Mark: the pyranose ring of glucose, drawn as a hexagon whose upper-right
 * vertex is the ring oxygen (red node), as in a Haworth projection.
 * The ring is left open where the oxygen sits so the node reads as part of it.
 */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} className={`logo-mark ${className}`} aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="37" height="37" fill="#ffe500" stroke="#0a0a0a" strokeWidth="3" />
    <g className="logo-ring">
      <path className="logo-hex" d="M26.6 12.4 L20 8.6 L10.6 14 V26 L20 31.4 L29.4 26 V18.4"
        fill="none" stroke="#0a0a0a" strokeWidth="3.4" strokeLinejoin="miter" strokeLinecap="square" />
      <circle cx="29.4" cy="14" r="3.3" fill="#ff5a47" stroke="#0a0a0a" strokeWidth="2.2" />
    </g>
  </svg>
);

const Logo: React.FC<{ inverted?: boolean }> = ({ inverted = false }) => (
  <span className="logo flex items-center gap-2.5">
    <LogoMark />
    <span className="flex flex-col leading-none">
      <span className={`logo-word text-[19px] font-black tracking-[-0.03em] ${inverted ? 'text-white' : 'text-slate-900'}`}>Diyabet</span>
      <span className={`logo-sub text-[10px] tracking-[0.28em] mt-1 ${inverted ? 'text-slate-300' : 'text-slate-700'}`}>REHBERİ · TEMD 26</span>
    </span>
  </span>
);

export default Logo;
