import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { search, fold, popular, SearchEntry } from './searchIndex';

const sectionNo: Record<string, string> = {
  'Genel Bakış': '00', 'Risk & Tanı': '01', 'Yaşam Tarzı': '02', 'Tedavi': '03',
  'Komplikasyonlar': '04', 'Özel Durumlar': '05', 'Vaka Testleri': '06',
};

// Marks the part of the title that matches the query (comparison is Turkish-folded)
const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const q = fold(query).trim();
  if (!q) return <>{text}</>;
  let folded = '';
  const map: number[] = [];
  Array.from(text).forEach((ch: string, i: number) => { const f = fold(ch); for (let k = 0; k < f.length; k++) map.push(i); folded += f; });
  const at = folded.indexOf(q);
  if (at < 0) return <>{text}</>;
  const chars: string[] = Array.from(text);
  const start = map[at];
  const end = map[at + q.length - 1] + 1;
  return <>{chars.slice(0, start).join('')}<mark className="bg-yellow-300 text-black px-0.5">{chars.slice(start, end).join('')}</mark>{chars.slice(end).join('')}</>;
};

const toUrl = (e: SearchEntry) => {
  const p = new URLSearchParams();
  if (e.tab) p.set('sekme', e.tab);
  if (e.focus) p.set('odak', e.focus);
  p.set('t', Date.now().toString(36)); // re-triggers the landing even for the same target
  return `${e.path}?${p.toString()}`;
};

export const SiteSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const hits = useMemo(() => search(query, 8), [query]);

  const openSearch = () => { triggerRef.current = document.activeElement as HTMLElement; setOpen(true); };
  const close = () => { setOpen(false); setQuery(''); setCursor(0); triggerRef.current?.focus?.(); };

  // Ctrl/Cmd + K or "/" opens the search from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName);
      if ((e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => { setCursor(0); }, [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const go = (e: SearchEntry) => { setOpen(false); setQuery(''); navigate(toUrl(e)); };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown' && hits.length) { e.preventDefault(); setCursor(c => (c + 1) % hits.length); }
    else if (e.key === 'ArrowUp' && hits.length) { e.preventDefault(); setCursor(c => (c - 1 + hits.length) % hits.length); }
    else if (e.key === 'Enter' && hits[cursor]) { e.preventDefault(); go(hits[cursor].entry); }
  };

  return (
    <>
      {/* Trigger: looks like a field on wide screens, a square button elsewhere */}
      <button type="button" onClick={openSearch} aria-label="Sitede ara" aria-keyshortcuts="Control+K"
        className="search-trigger hidden 2xl:flex items-center gap-2 h-11 w-56 px-3 border-2 border-black bg-white text-left text-sm text-slate-700 hover:bg-yellow-100">
        <Search size={18} className="shrink-0 text-black" />
        <span className="flex-1 truncate">Ara: insülin, oruç…</span>
        <kbd className="font-mono text-[10px] border-2 border-black px-1 text-black">Ctrl K</kbd>
      </button>
      <button type="button" onClick={openSearch} aria-label="Sitede ara" aria-keyshortcuts="Control+K"
        className="2xl:hidden w-11 h-11 flex items-center justify-center border-2 border-black bg-white hover:bg-yellow-100">
        <Search size={20} />
      </button>

      {open && (
        <div className="search-overlay fixed inset-0 z-[60] bg-black/60 flex items-start justify-center px-3 pt-[8vh] md:pt-[12vh]"
          onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
          <div role="dialog" aria-modal="true" aria-label="Site içi arama"
            className="search-panel w-full max-w-2xl bg-white border-[3px] border-black shadow-sm flex flex-col max-h-[80vh]">
            <div className="flex items-center gap-3 px-4 border-b-[3px] border-black bg-yellow-300">
              <Search size={22} className="shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded={hits.length > 0}
                aria-controls="search-results"
                aria-activedescendant={hits[cursor] ? `search-opt-${cursor}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Ne arıyorsunuz? örn. insülin başlama, oruç, eGFR"
                className="search-input flex-1 min-w-0 h-16 bg-transparent text-base md:text-lg font-semibold text-black placeholder:text-black/60 focus:outline-none"
              />
              <button type="button" onClick={close} className="font-mono text-xs border-2 border-black bg-white px-2 h-8 min-h-0 shrink-0">Esc</button>
            </div>

            <div className="overflow-y-auto">
              {query.trim() === '' && (
                <div className="p-4">
                  <p className="font-mono text-xs text-slate-700 mb-3">SIK ARANANLAR</p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map(p => (
                      <button key={p} type="button" onClick={() => { setQuery(p); inputRef.current?.focus(); }}
                        className="border-2 border-black px-3 py-1.5 text-sm bg-white hover:bg-yellow-100">{p}</button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 mt-4">İlaç adı (ör. <em>empagliflozin</em>), tetkik (<em>FIB-4</em>), durum (<em>gebelik</em>) ya da soru (<em>oruç tutabilir mi</em>) yazabilirsiniz.</p>
                </div>
              )}

              {query.trim() !== '' && hits.length === 0 && (
                <div className="p-4 text-sm text-slate-800" role="status">
                  “{query}” için sonuç yok. Daha kısa ya da farklı bir kelime deneyin, örneğin <button type="button" className="underline font-semibold min-h-0" onClick={() => setQuery('insülin')}>insülin</button> veya <button type="button" className="underline font-semibold min-h-0" onClick={() => setQuery('tarama')}>tarama</button>.
                </div>
              )}

              {hits.length > 0 && (
                <ul id="search-results" role="listbox" aria-label="Öneriler" ref={listRef}>
                  {hits.map((h, i) => (
                    <li key={h.entry.title} id={`search-opt-${i}`} data-i={i} role="option" aria-selected={i === cursor}
                      onMouseMove={() => setCursor(i)} onClick={() => go(h.entry)}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b-2 border-black last:border-b-0 ${i === cursor ? 'bg-yellow-300' : 'bg-white'}`}>
                      <span className="font-mono text-xs font-bold w-6 shrink-0">{sectionNo[h.entry.section] ?? ''}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-slate-900"><Highlight text={h.entry.title} query={query} /></span>
                        <span className="block text-xs text-slate-700 truncate">
                          {h.entry.section}{h.entry.tabLabel && ` › ${h.entry.tabLabel}`}
                          {h.matched && <> · <span className="font-mono">“{h.matched}”</span></>}
                        </span>
                      </span>
                      {i === cursor ? <CornerDownLeft size={18} className="shrink-0" /> : <ArrowRight size={18} className="shrink-0" />}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden md:flex gap-4 px-4 py-2 border-t-[3px] border-black font-mono text-[11px] text-slate-700">
              <span>↑ ↓ gez</span><span>Enter aç</span><span>Esc kapat</span><span className="ml-auto">Ctrl K ile her yerden açılır</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// After a search result is opened: wait for the heading to render, scroll to it and flash its card
export const SearchLanding: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const target = new URLSearchParams(location.search).get('odak');
    if (!target) return;
    const want = fold(target);
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      const el = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main h4'))
        .find(h => h.offsetParent && fold(h.textContent ?? '').includes(want));
      if (!el) { if (tries++ < 20) timer = window.setTimeout(attempt, 100); return; }
      const offset = window.matchMedia('(min-width: 768px)').matches ? 175 : 90;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      const box = (el.closest('[class*="rounded"]') as HTMLElement | null) ?? el;
      box.classList.add('in');
      box.classList.remove('search-hit');
      void box.offsetWidth;
      box.classList.add('search-hit');
      window.setTimeout(() => box.classList.remove('search-hit'), 2600);
    };
    timer = window.setTimeout(attempt, 120);
    return () => window.clearTimeout(timer);
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};
