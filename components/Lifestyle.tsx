import { PageHeader, TabBar, useTabParam } from './shared/ui';
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
  useTabParam(tabs, setActive, 'lifestyle-tabs');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="lifestyle" className="pt-10 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader no="02" title="İlk Reçete: Yaşam Tarzı">
          Beslenme, fiziksel aktivite ve kilo yönetimi her basamakta tedavinin temelidir; ilaç tedavisi bunların yerine geçmez.
        </PageHeader>

        <TabBar tabs={tabs} active={active} onSelect={setActive} anchorId="lifestyle-tabs" label="Yaşam tarzı bölümleri" />

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
