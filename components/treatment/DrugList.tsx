import React, { useMemo, useState } from 'react';
import { Search, Droplets, Info, X } from 'lucide-react';
import { drugGroups, DrugMeta } from './drugListMeta';
import { titckBrands, titckListDate } from './drugListBrands';
import { fold } from '../search/searchIndex';

const totalPackages = Object.values(titckBrands).reduce((n, g) => n + g.packages, 0);
const totalBrands = Object.values(titckBrands).reduce((n, g) => n + g.brands.length, 0);

// A brand's strengths written compactly: "500 · 850 · 1000 mg"
const fmtStrengths = (s: string[]) => {
  if (s.length === 0) return '';
  const units = new Set(s.map(x => x.replace(/^[\d.,/]+\s*/, '')));
  if (units.size === 1) {
    const unit = [...units][0];
    return s.map(x => x.replace(/\s*[^\d.,/].*$/, '')).join(' · ') + (unit ? ` ${unit}` : '');
  }
  return s.join(' · ');
};

const DrugItem: React.FC<{ m: DrugMeta; q: string }> = ({ m, q }) => {
  const data = titckBrands[m.key];
  if (!data) return null;
  return (
    <article className="bg-white border-2 border-black rounded-none p-4 md:p-5 flex flex-col gap-3">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-lg font-bold text-slate-900">{m.label}</h4>
        <span className="font-mono text-xs text-slate-700">{data.brands.length} marka · {data.packages} ambalaj</span>
      </header>

      <p className="text-sm text-slate-900"><span className="font-mono text-xs font-bold uppercase mr-2">Doz</span>{m.dose}</p>
      {m.note && <p className="text-sm text-slate-700">{m.note}</p>}
      {m.renal && (
        <p className="text-sm text-slate-800 flex gap-2">
          <Droplets size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <span><span className="sr-only">Böbrek: </span>{m.renal}</span>
        </p>
      )}

      <ul className="border-t-2 border-black pt-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1 text-sm" aria-label={`${m.label} ticari adları`}>
        {data.brands.map(b => {
          const hit = q !== '' && fold(b.n).includes(q);
          return (
            <li key={b.n} className={hit ? 'bg-yellow-300 -mx-1 px-1' : ''}>
              <span className="font-semibold text-slate-900">{b.n}</span>
              {b.s.length > 0 && <span className="text-slate-700"> {fmtStrengths(b.s)}</span>}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

const DrugList: React.FC = () => {
  const [query, setQuery] = useState('');
  const q = fold(query).trim();

  const groups = useMemo(() => {
    if (!q) return drugGroups;
    return drugGroups
      .map(g => ({
        ...g,
        items: g.items.filter(m =>
          fold(m.label).includes(q) || fold(g.title).includes(q) ||
          (titckBrands[m.key]?.brands ?? []).some(b => fold(b.n).includes(q))),
      }))
      .filter(g => g.items.length > 0);
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-yellow-300 border-[3px] border-black p-4 md:p-5 grid md:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="text-sm text-slate-900 space-y-1">
          <p className="font-bold">TİTCK Ruhsatlı Beşeri Tıbbi Ürünler Listesi · {titckListDate}</p>
          <p>ATC A10 grubunda ruhsatı askıda olmayan {totalPackages} ambalaj, {totalBrands} marka. Dozlar TEMD 2026 Tablo 7.1-7.10 ve Bölüm 8’den, böbrek sınırları Bölüm 7.8’den alınmıştır.</p>
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Etken madde veya ticari ad ara</span>
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ara: Glifor, sitagliptin…"
            className="w-full bg-white pl-10 pr-10 py-2 text-sm font-sans focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Aramayı temizle"
              className="absolute right-0 top-0 h-full w-11 flex items-center justify-center">
              <X size={18} />
            </button>
          )}
        </label>
      </div>

      <p className="text-xs text-slate-700 flex gap-2">
        <Info size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
        <span>Ruhsatlı olmak ürünün piyasada bulunduğu anlamına gelmez. Liste haftalık yenilenir; güncel durum ve geri ödeme için TİTCK ve SGK listelerine bakın. Dozlar erişkin tip 2 diyabet içindir ve hastaya göre bireyselleştirilir.</span>
      </p>

      <div aria-live="polite" className="sr-only">{q ? `${groups.reduce((n, g) => n + g.items.length, 0)} etken madde bulundu` : ''}</div>

      {groups.length === 0 && (
        <p className="text-sm text-slate-800 border-2 border-black bg-white p-4">“{query}” için sonuç yok. Etken madde ya da ticari adın ilk harflerini deneyin.</p>
      )}

      {groups.map(g => (
        <section key={g.id} aria-labelledby={`grup-${g.id}`} className="space-y-4">
          <h3 id={`grup-${g.id}`} className="text-xl md:text-2xl font-bold text-slate-900 border-b-[3px] border-black pb-2">{g.title}</h3>
          <div className="grid gap-4">
            {g.items.map(m => <DrugItem key={m.key} m={m} q={q} />)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DrugList;
