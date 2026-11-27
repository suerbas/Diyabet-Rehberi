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
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="complications" className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Komplikasyon Tarama ve Yönetimi</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Erken tarama ve çok yönlü risk kontrolü (glisemi, KB, lipid, böbrek, karaciğer) komplikasyonları önlemenin temelidir.
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
                  const top = document.getElementById('complications-tabs')?.getBoundingClientRect().top;
                  if (top !== undefined && top < 0) window.scrollBy({ top: top - 80, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === t.id ? 'bg-primary text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

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
