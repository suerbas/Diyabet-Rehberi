import React from 'react';

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
