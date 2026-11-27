import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SectionTitle: React.FC<{ icon?: React.ReactNode; children: React.ReactNode; sub?: string }> = ({ icon, children, sub }) => (
  <div className="mb-4">
    <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
      {icon && <span className="text-primary">{icon}</span>}
      {children}
    </h3>
    {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
  </div>
);

export const Card: React.FC<{ title?: string; tone?: 'plain' | 'red' | 'amber' | 'green' | 'sky'; children: React.ReactNode; className?: string }> = ({ title, tone = 'plain', children, className = '' }) => {
  const tones = {
    plain: 'bg-white border-slate-200',
    red: 'bg-rose-50 border-rose-200',
    amber: 'bg-amber-50 border-amber-200',
    green: 'bg-emerald-50 border-emerald-200',
    sky: 'bg-sky-50 border-sky-200',
  };
  return (
    <div className={`border rounded-xl p-5 shadow-sm ${tones[tone]} ${className}`}>
      {title && <h4 className="font-bold text-slate-900 mb-2">{title}</h4>}
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
};

export const Bullets: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const DataTable: React.FC<{ head: string[]; rows: React.ReactNode[][]; firstColBold?: boolean }> = ({ head, rows, firstColBold = true }) => (
  <>
  {head.length >= 4 && <ScrollHint />}
  <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-600 text-left">
        <tr>{head.map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-slate-100 align-top">
            {r.map((c, j) => (
              <td key={j} className={`p-3 ${j === 0 && firstColBold ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
);

export const NumField: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; suffix?: string }> = ({ label, value, onChange, placeholder, suffix }) => (
  <label className="block">
    <span className="text-sm font-semibold text-slate-800">{label}</span>
    <div className="mt-1 flex items-center rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-primary bg-white">
      <input type="text" inputMode="decimal" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" />
      {suffix && <span className="px-3 text-xs text-slate-500 whitespace-nowrap">{suffix}</span>}
    </div>
  </label>
);

export const parseNum = (s: string): number | null => {
  if (s.trim() === '') return null;
  const n = parseFloat(s.replace(',', '.'));
  return isNaN(n) ? null : n;
};

/* Editorial page header: oversized outlined section number + title, left aligned */
export const PageHeader: React.FC<{ no: string; title: string; icon?: React.ReactNode; children?: React.ReactNode }> = ({ no, title, icon, children }) => (
  <header className="page-header mb-8 md:mb-10 pb-6 border-b-[3px] border-black grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-2 md:items-end">
    <div className="num-outline font-mono font-bold leading-none text-[64px] md:text-[120px] select-none" aria-hidden="true">{no}</div>
    <div>
      <div className="flex items-center gap-3 mb-3">
        {icon && <span className="w-9 h-9 flex items-center justify-center bg-white border-2 border-black">{icon}</span>}
        <span className="inline-block text-xs font-bold uppercase tracking-wider bg-yellow-300 border-2 border-black px-2 py-1">TEMD 2026 ile güncellendi</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.05]">{title}</h2>
      {children && <p className="text-slate-700 mt-3 max-w-3xl md:text-lg">{children}</p>}
    </div>
  </header>
);

/* Section tab bar: 2-column grid on phones (every tab visible), sticky single row from md up */
export function TabBar<T extends string>({ tabs, active, onSelect, anchorId, label }: {
  tabs: readonly { id: T; label: string; icon: React.ReactNode }[];
  active: T;
  onSelect: (id: T) => void;
  anchorId: string;
  label: string;
}) {
  return (
    <div className="tabbar md:sticky md:top-[66px] z-30 -mx-4 px-4 py-3 mb-6">
      <div role="tablist" aria-label={label} className="grid grid-cols-2 md:flex max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => {
              onSelect(t.id);
              const top = document.getElementById(anchorId)?.getBoundingClientRect().top;
              if (top !== undefined && top < 0) window.scrollBy({ top: top - 160, behavior: 'smooth' });
            }}
            className={`tab-btn md:flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-[13px] leading-tight text-center font-semibold transition-colors [&:last-child:nth-child(odd)]:col-span-2 ${active === t.id ? 'bg-primary text-white' : 'text-slate-800 hover:bg-yellow-100'}`}
          >
            <span className="shrink-0">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Wide tables: hint on phones that the table scrolls sideways */
export const ScrollHint: React.FC = () => (
  <p className="md:hidden font-mono text-[11px] text-slate-700 mb-2" aria-hidden="true">← Tabloyu yana kaydırın →</p>
);

/* Deep link to a tab: /tedavi?sekme=insulin (used by site search). Without a heading to
   focus on (?odak=), the page scrolls to the tab bar. */
export function useTabParam<T extends string>(tabs: readonly { id: T }[], setActive: (id: T) => void, anchorId: string) {
  const [params] = useSearchParams();
  useEffect(() => {
    const want = params.get('sekme');
    if (!want || !tabs.some(t => t.id === want)) return;
    setActive(want as T);
    if (params.get('odak')) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 170, behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
}
