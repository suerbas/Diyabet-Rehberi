import React, { useState } from 'react';
import { Route as RouteIcon, Pill, Droplets, Syringe, Info } from 'lucide-react';
import TherapySelector from './treatment/TherapySelector';
import DrugClasses from './treatment/DrugClasses';
import RenalDoseCheck from './treatment/RenalDoseCheck';
import InsulinModule from './treatment/InsulinModule';

const tabs = [
  { id: 'secici', label: 'Tedavi Seçici', icon: <RouteIcon size={18} />, intro: 'Komorbiditeleri işaretleyin; organ koruyucu yaklaşıma göre öncelikli ilaç sınıfları ve kaçınılması gerekenler gerekçeleriyle listelenir.' },
  { id: 'ilaclar', label: 'İlaç Sınıfları', icon: <Pill size={18} />, intro: 'Her sınıfın HbA1c etkisi, hipoglisemi ve kilo profili, böbrek sınırı, kontrendikasyonları ve 2026 güvenlik notları.' },
  { id: 'egfr', label: 'eGFR & Doz', icon: <Droplets size={18} />, intro: 'eGFR’yi seçin; her antidiyabetik için kullanım durumu ve doz ayarı anında güncellenir.' },
  { id: 'insulin', label: 'İnsülin', icon: <Syringe size={18} />, intro: 'Başlama ve yoğunlaştırma basamakları, bazal titrasyon ve bolus hesaplayıcıları, preparatlar ve enjeksiyon tekniği.' },
] as const;

type TabId = typeof tabs[number]['id'];

const Treatment: React.FC = () => {
  const [active, setActive] = useState<TabId>('secici');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="treatment" className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Tedavi Algoritması ve İlaç Rehberi</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Metformin temel taştır; ASKVH, kalp yetersizliği, KBH ve MASLD varlığında kanıtlanmış organ koruyucu ajanlar HbA1c’den bağımsız olarak gecikmeden eklenir.
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
                  const top = document.getElementById('treatment-tabs')?.getBoundingClientRect().top;
                  if (top !== undefined && top < 0) window.scrollBy({ top: top - 80, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === t.id ? 'bg-primary text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        <p id="treatment-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8 scroll-mt-32">{current.intro}</p>

        <div role="tabpanel">
          {active === 'secici' && <TherapySelector />}
          {active === 'ilaclar' && <DrugClasses />}
          {active === 'egfr' && <RenalDoseCheck />}
          {active === 'insulin' && <InsulinModule />}
        </div>

        <div className="max-w-4xl mx-auto mt-14 flex gap-3 bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>
            Bu bölüm birinci basamak hekimleri için karar destek amaçlıdır ve TEMD Diabetes Mellitus Kılavuzu 2026 özetine dayanır. Doz ve endikasyonlar ruhsat bilgisi ve kılavuzun tam metniyle birlikte değerlendirilmelidir; nihai karar hastaya özgü klinik değerlendirmeye aittir.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Treatment;
