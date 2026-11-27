import { PageHeader, TabBar, useTabParam } from './shared/ui';
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
  useTabParam(tabs, setActive, 'diagnosis-tabs');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="risk" className="pt-10 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader no="01" title="Tanı Kriterleri ve Risk Taraması">
          Türkiye’de erişkin diyabet prevalansı %13,7 (TURDEP-II) ve diyabetlilerin yaklaşık %45’i hastalığının farkında değil. Asemptomatik bireylerin düzenli taranması esastır.
        </PageHeader>

        <TabBar tabs={tabs} active={active} onSelect={setActive} anchorId="diagnosis-tabs" label="Tanı ve risk bölümleri" />

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
