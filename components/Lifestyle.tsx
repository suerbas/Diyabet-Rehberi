import React, { useState } from 'react';
import { Utensils, Activity, Scale, Sun, Info } from 'lucide-react';
import Nutrition from './lifestyle/Nutrition';
import Exercise from './lifestyle/Exercise';
import WeightManagement from './lifestyle/WeightManagement';
import DailyLife from './lifestyle/DailyLife';

const tabs = [
  { id: 'beslenme', label: 'Beslenme', icon: <Utensils size={18} />, intro: 'Makro besin hedefleri, porsiyon için el modeli, karbonhidrat kalitesi ve alkol.' },
  { id: 'egzersiz', label: 'Egzersiz', icon: <Activity size={18} />, intro: 'Aktivite reçetesi, egzersiz öncesi glukoz kontrolü, hedef nabız ve kontrendikasyonlar.' },
  { id: 'kilo', label: 'Kilo Yönetimi', icon: <Scale size={18} />, intro: 'Kilo kaybı eşikleri, BKİ ve hedef hesaplayıcı, anti-obezite ilaçlar, metabolik cerrahi ve remisyon.' },
  { id: 'gunluk', label: 'Günlük Yaşam', icon: <Sun size={18} />, intro: 'Tütün, uyku, araç kullanma, diyabet eğitimi ve ağız-diş sağlığı.' },
] as const;

type TabId = typeof tabs[number]['id'];

const Lifestyle: React.FC = () => {
  const [active, setActive] = useState<TabId>('beslenme');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="lifestyle" className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">İlk Reçete: Yaşam Tarzı</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Beslenme, fiziksel aktivite ve kilo yönetimi her basamakta tedavinin temelidir; ilaç tedavisi bunların yerine geçmez.
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
                  const top = document.getElementById('lifestyle-tabs')?.getBoundingClientRect().top;
                  if (top !== undefined && top < 0) window.scrollBy({ top: top - 80, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === t.id ? 'bg-primary text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        <p id="lifestyle-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8">{current.intro}</p>

        <div role="tabpanel">
          {active === 'beslenme' && <Nutrition />}
          {active === 'egzersiz' && <Exercise />}
          {active === 'kilo' && <WeightManagement />}
          {active === 'gunluk' && <DailyLife />}
        </div>

        <div className="max-w-4xl mx-auto mt-14 flex gap-3 bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>
            Bu bölüm birinci basamak hekimleri için karar destek amaçlıdır ve TEMD Diabetes Mellitus Kılavuzu 2026 özetine dayanır. Öneriler hastanın komorbiditeleri ve tercihleri doğrultusunda bireyselleştirilmelidir.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
