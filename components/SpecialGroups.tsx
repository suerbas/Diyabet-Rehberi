import { PageHeader, TabBar, useTabParam } from './shared/ui';
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
  useTabParam(tabs, setActive, 'special-tabs');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="special" className="pt-10 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader no="05" title="Özel Durumlar">
          Gebelik, yaşlılık, oruç, akut hastalık, cerrahi ve steroid tedavisi gibi durumlarda hedefler ve tedavi değişir.
        </PageHeader>

        <TabBar tabs={tabs} active={active} onSelect={setActive} anchorId="special-tabs" label="Özel durum bölümleri" />

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
