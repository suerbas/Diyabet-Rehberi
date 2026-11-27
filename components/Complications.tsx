import { PageHeader, TabBar, useTabParam } from './shared/ui';
import React, { useState } from 'react';
import { ClipboardCheck, Siren, HeartPulse, Droplets, Footprints, FlaskConical, Info } from 'lucide-react';
import ScreeningSchedule from './complications/ScreeningSchedule';
import AcuteComplications from './complications/AcuteComplications';
import Cardiovascular from './complications/Cardiovascular';
import KidneyEye from './complications/KidneyEye';
import NeuropathyFoot from './complications/NeuropathyFoot';
import LiverFib4 from './complications/LiverFib4';

const tabs = [
  { id: 'tarama', label: 'Tarama Takvimi', icon: <ClipboardCheck size={18} />, intro: 'Her vizit kontrol listesi, yıllık tarama takvimi ve erişkin aşıları.' },
  { id: 'akut', label: 'Akut', icon: <Siren size={18} />, intro: 'Hipoglisemi düzeyleri ve 15-15 kuralı, DKA/HHD ayrımı ve hasta günü kuralları.' },
  { id: 'kv', label: 'Kardiyovasküler', icon: <HeartPulse size={18} />, intro: 'Risk kategorisine göre LDL hedefi, statin yoğunluğu, hipertansiyon ve antiagregan.' },
  { id: 'bobrek-goz', label: 'Böbrek & Göz', icon: <Droplets size={18} />, intro: 'DKBH’de 4 sütunlu nefroproteksiyon, retinopati evreleri ve NAION farkındalığı.' },
  { id: 'ayak', label: 'Nöropati & Ayak', icon: <Footprints size={18} />, intro: 'Ipswich dokunma testi, ağrılı ve otonom nöropati, diyabetik ayak ülseri ve bakım kuralları.' },
  { id: 'karaciger', label: 'Karaciğer', icon: <FlaskConical size={18} />, intro: 'FIB-4 hesaplayıcı ile MASLD’de ileri fibroz riski ve yönlendirme.' },
] as const;

type TabId = typeof tabs[number]['id'];

const Complications: React.FC = () => {
  const [active, setActive] = useState<TabId>('tarama');
  useTabParam(tabs, setActive, 'complications-tabs');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="complications" className="pt-10 md:pt-12 pb-16">
      <div className="container mx-auto px-4">
        <PageHeader no="04" title="Komplikasyon Tarama ve Yönetimi">
          Erken tarama ve çok yönlü risk kontrolü (glisemi, KB, lipid, böbrek, karaciğer) komplikasyonları önlemenin temelidir.
        </PageHeader>

        <TabBar tabs={tabs} active={active} onSelect={setActive} anchorId="complications-tabs" label="Komplikasyon bölümleri" />

        <p id="complications-tabs" className="text-center text-sm text-slate-500 max-w-2xl mx-auto mb-8">{current.intro}</p>

        <div role="tabpanel">
          {active === 'tarama' && <ScreeningSchedule />}
          {active === 'akut' && <AcuteComplications />}
          {active === 'kv' && <Cardiovascular />}
          {active === 'bobrek-goz' && <KidneyEye />}
          {active === 'ayak' && <NeuropathyFoot />}
          {active === 'karaciger' && <LiverFib4 />}
        </div>

        <div className="max-w-4xl mx-auto mt-14 flex gap-3 bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>
            Bu bölüm birinci basamak hekimleri için karar destek amaçlıdır ve TEMD Diabetes Mellitus Kılavuzu 2026 özetine dayanır. Eşik ve dozlar kılavuzun tam metniyle birlikte değerlendirilmelidir; nihai karar hastaya özgü klinik değerlendirmeye aittir.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Complications;
