import React, { useState } from 'react';
import { ClipboardList, Users, TrendingDown, Search, Info } from 'lucide-react';
import DiagnosticCriteria from './diagnosis/DiagnosticCriteria';
import Screening from './diagnosis/Screening';
import Prediabetes from './diagnosis/Prediabetes';
import DifferentialDx from './diagnosis/DifferentialDx';

const tabs = [
  { id: 'tani', label: 'Tanı Kriterleri', icon: <ClipboardList size={18} />, intro: 'Tanı eşikleri (1. saat OGTT dahil), sonuç yorumlayıcı, HbA1c’nin güvenilmez olduğu durumlar ve OGTT protokolü.' },
  { id: 'tarama', label: 'Tarama & FINDRISK', icon: <Users size={18} />, intro: 'Kimlerin, ne sıklıkla taranacağı, risk faktörleri ve 10 yıllık risk için FINDRISK.' },
  { id: 'prediyabet', label: 'Prediyabet', icon: <TrendingDown size={18} />, intro: 'Tip 2 diyabeti önleme: yaşam tarzı hedefleri, metformin endikasyonları ve izlem.' },
  { id: 'ayirici', label: 'Ayırıcı Tanı', icon: <Search size={18} />, intro: 'Tip 1, LADA, Tip 2 ve MODY ayrımı; C-peptid, atipik formlar ve Tip 1 evreleri.' },
] as const;

type TabId = typeof tabs[number]['id'];

const DiagnosisSection: React.FC = () => {
  const [active, setActive] = useState<TabId>('tani');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="risk" className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Tanı Kriterleri ve Risk Taraması</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Türkiye’de erişkin diyabet prevalansı %13,7 (TURDEP-II) ve diyabetlilerin yaklaşık %45’i hastalığının farkında değil. Asemptomatik bireylerin düzenli taranması esastır.
          </p>
        </div>

        <div className="sticky top-[68px] z-30 -mx-4 px-4 py-3 bg-slate-50/95 backdrop-blur mb-6">
          <div role="tablist" className="flex gap-2 overflow-x-auto hide-scrollbar max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
            {tabs.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => {
                  setActive(t.id);
                  const top = document.getElementById('diagnosis-tabs')?.getBoundingClientRect().top;
                  if (top !== undefined && top < 0) window.scrollBy({ top: top - 80, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === t.id ? 'bg-primary text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        <p id="diagnosis-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8">{current.intro}</p>

        <div role="tabpanel">
          {active === 'tani' && <DiagnosticCriteria />}
          {active === 'tarama' && <Screening />}
          {active === 'prediyabet' && <Prediabetes />}
          {active === 'ayirici' && <DifferentialDx />}
        </div>

        <div className="max-w-4xl mx-auto mt-14 flex gap-3 bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>
            Bu bölüm birinci basamak hekimleri için karar destek amaçlıdır ve TEMD Diabetes Mellitus Kılavuzu 2026 özetine dayanır. Tanı yorumlayıcı klinik değerlendirmenin yerini tutmaz; eşikler kılavuzun tam metniyle birlikte değerlendirilmelidir.
          </span>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;
