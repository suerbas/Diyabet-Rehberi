import React, { useState } from 'react';
import { Baby, UserCheck, Moon, Thermometer, Syringe, School, Info } from 'lucide-react';
import Pregnancy from './special/Pregnancy';
import Elderly from './special/Elderly';
import Ramadan from './special/Ramadan';
import SickDaySurgery from './special/SickDaySurgery';
import SteroidOther from './special/SteroidOther';
import Pediatric from './special/Pediatric';

const tabs = [
  { id: 'gebelik', label: 'Gebelik', icon: <Baby size={18} />, intro: 'GDM taraması ve OGTT yorumlayıcı, gebelik hedefleri, gebelik öncesi hazırlık, tedavi ve doğum sonu izlem.' },
  { id: 'yasli', label: 'Yaşlı', icon: <UserCheck size={18} />, intro: 'Sağlık durumuna göre hedef belirleme, hipoglisemiden kaçınma ve tedaviyi basitleştirme.' },
  { id: 'ramazan', label: 'Ramazan', icon: <Moon size={18} />, intro: 'IDF-DAR risk grupları, oruç tutmaması gerekenler, ilaç ve insülin doz ayarı.' },
  { id: 'hasta-gunu', label: 'Hasta Günü & Cerrahi', icon: <Thermometer size={18} />, intro: 'Akut hastalık kuralları, SADMANS, perioperatif ilaç düzenlemesi ve taburculuk sonrası izlem.' },
  { id: 'steroid', label: 'Steroid & Diğer', icon: <Syringe size={18} />, intro: 'Steroid hiperglisemisi ve NPH dozu, transplantasyon, kistik fibrozis, kanser tedavisi ve seyahat.' },
  { id: 'cocuk', label: 'Çocuk & Genç', icon: <School size={18} />, intro: 'Pediatrik hedefler, Tip 2 taraması ve ilk tedavi, büyüme takibi ve okul planı.' },
] as const;

type TabId = typeof tabs[number]['id'];

const SpecialGroups: React.FC = () => {
  const [active, setActive] = useState<TabId>('gebelik');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="special" className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Özel Durumlar</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Gebelik, yaşlılık, oruç, akut hastalık, cerrahi ve steroid tedavisi gibi durumlarda hedefler ve tedavi değişir.
          </p>
        </div>

        <div className="sticky top-[68px] z-30 -mx-4 px-4 py-3 bg-slate-50/95 backdrop-blur mb-6">
          <div role="tablist" className="flex gap-2 overflow-x-auto hide-scrollbar max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
            {tabs.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => {
                  setActive(t.id);
                  const top = document.getElementById('special-tabs')?.getBoundingClientRect().top;
                  if (top !== undefined && top < 0) window.scrollBy({ top: top - 80, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === t.id ? 'bg-primary text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        <p id="special-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8">{current.intro}</p>

        <div role="tabpanel">
          {active === 'gebelik' && <Pregnancy />}
          {active === 'yasli' && <Elderly />}
          {active === 'ramazan' && <Ramadan />}
          {active === 'hasta-gunu' && <SickDaySurgery />}
          {active === 'steroid' && <SteroidOther />}
          {active === 'cocuk' && <Pediatric />}
        </div>

        <div className="max-w-4xl mx-auto mt-14 flex gap-3 bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>
            Bu bölüm birinci basamak hekimleri için karar destek amaçlıdır ve TEMD Diabetes Mellitus Kılavuzu 2026 özetine dayanır. Hesaplayıcılar başlangıç önerisi verir; doz kararı hastanın klinik durumuna göre hekim tarafından verilmelidir.
          </span>
        </div>
      </div>
    </section>
  );
};

export default SpecialGroups;
