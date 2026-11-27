import React from 'react';

// Diagnostic thresholds already stated on the Risk & Tanı page
const items = [
  'APG ≥ 126 mg/dL',
  'HbA1c ≥ %6,5',
  '75 g OGTT 2. saat ≥ 200 mg/dL',
  'OGTT 1. saat ≥ 209 mg/dL (IDF 2024)',
  'FINDRISK ≥ 15 yüksek risk',
  'KB hedefi 120-130 / 70-80 mmHg',
];

// Scrolling band shown at the top of every page, right under the fixed navigation
const Ticker: React.FC = () => (
  <div className="ticker bg-black text-yellow-300 border-b-[3px] border-black overflow-hidden" role="region" aria-label="Temel tanı eşikleri">
    <ul className="ticker-track flex w-max">
      {[0, 1].map(copy => (
        <li key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
          {items.map(t => (
            <span key={t} className="font-mono text-sm py-2.5 px-6 whitespace-nowrap flex items-center gap-6">
              {t}<span className="text-[#ff5a47]" aria-hidden="true">■</span>
            </span>
          ))}
        </li>
      ))}
    </ul>
  </div>
);

export default Ticker;
