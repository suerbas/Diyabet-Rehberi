import { PageHeader, TabBar, useTabParam } from './shared/ui';
import React, { useState } from 'react';
import { Route as RouteIcon, Pill, Droplets, Syringe, Info, ListChecks } from 'lucide-react';
import TherapySelector from './treatment/TherapySelector';
import DrugClasses from './treatment/DrugClasses';
import RenalDoseCheck from './treatment/RenalDoseCheck';
import InsulinModule from './treatment/InsulinModule';
import DrugList from './treatment/DrugList';

const tabs = [
  { id: 'secici', label: 'Tedavi Seçici', icon: <RouteIcon size={18} />, intro: 'Komorbiditeleri işaretleyin; organ koruyucu yaklaşıma göre öncelikli ilaç sınıfları ve kaçınılması gerekenler gerekçeleriyle listelenir.' },
  { id: 'ilaclar', label: 'İlaç Sınıfları', icon: <Pill size={18} />, intro: 'Her sınıfın HbA1c etkisi, hipoglisemi ve kilo profili, böbrek sınırı, kontrendikasyonları ve 2026 güvenlik notları.' },
  { id: 'egfr', label: 'eGFR & Doz', icon: <Droplets size={18} />, intro: 'eGFR’yi seçin; her antidiyabetik için kullanım durumu ve doz ayarı anında güncellenir.' },
  { id: 'liste', label: 'İlaç Listesi', icon: <ListChecks size={18} />, intro: 'Türkiye’de ruhsatlı tüm antidiyabetikler (TİTCK): etken madde, ticari adlar ve güçler; TEMD 2026’ya göre doz, böbrek sınırı ve kısa not.' },
  { id: 'insulin', label: 'İnsülin', icon: <Syringe size={18} />, intro: 'Başlama ve yoğunlaştırma basamakları, bazal titrasyon ve bolus hesaplayıcıları, preparatlar ve enjeksiyon tekniği.' },
] as const;

type TabId = typeof tabs[number]['id'];

const Treatment: React.FC = () => {
  const [active, setActive] = useState<TabId>('secici');
  useTabParam(tabs, setActive, 'treatment-tabs');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="treatment" className="pt-10 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader no="03" title="Tedavi Algoritması ve İlaç Rehberi">
          Metformin temel taştır; ASKVH, kalp yetersizliği, KBH ve MASLD varlığında kanıtlanmış organ koruyucu ajanlar HbA1c’den bağımsız olarak gecikmeden eklenir.
        </PageHeader>

        <TabBar tabs={tabs} active={active} onSelect={setActive} anchorId="treatment-tabs" label="Tedavi bölümleri" />

        <p id="treatment-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8 scroll-mt-32">{current.intro}</p>

        <div role="tabpanel">
          {active === 'secici' && <TherapySelector />}
          {active === 'ilaclar' && <DrugClasses />}
          {active === 'egfr' && <RenalDoseCheck />}
          {active === 'liste' && <DrugList />}
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
