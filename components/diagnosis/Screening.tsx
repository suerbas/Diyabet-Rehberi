import React, { useState } from 'react';
import { Users, Scale, Baby, HeartPulse, School, ChevronDown } from 'lucide-react';
import { SectionTitle } from '../shared/ui';
import Findrisk from './Findrisk';

const whoToScreen = [
  { icon: <Users size={22} />, color: 'bg-sky-100 text-sky-700', title: '35 yaş ve üzeri herkes', badge: 'Yeni', text: 'Risk faktörü olmasa bile 35 yaşından itibaren 3 yılda bir APG.' },
  { icon: <Scale size={22} />, color: 'bg-blue-100 text-blue-700', title: 'BKİ ≥ 25 + ek risk faktörü', text: 'Yaştan bağımsız, yılda bir tarama (risk faktörleri aşağıda).' },
  { icon: <Baby size={22} />, color: 'bg-pink-100 text-pink-700', title: 'Gestasyonel diyabet öyküsü', text: 'Doğumdan 4-12 hafta sonra 75 g OGTT; normalse ömür boyu en az 3 yılda bir.' },
  { icon: <HeartPulse size={22} />, color: 'bg-rose-100 text-rose-700', title: 'ASKVH ve HIV', text: 'Aterosklerotik KV hastalığı olanlar ve antiretroviral tedavi başlanan HIV hastaları.' },
  { icon: <School size={22} />, color: 'bg-emerald-100 text-emerald-700', title: 'Çocuk ve ergen', text: 'BKİ > 85. persentil ve ≥ 1 ek risk faktörü: 10 yaş veya puberte başlangıcından itibaren 2 yılda bir.' },
];

const riskFactors = [
  { id: 'aile', title: '1. derece akrabada diyabet', desc: 'Anne, baba veya kardeşte Tip 2 diyabet riski belirgin artırır.' },
  { id: 'inaktivite', title: 'Fiziksel inaktivite', desc: 'Kas aktivitesinin azalması glukozun hücre içine alımını yavaşlatır ve insülin direncine zemin hazırlar.' },
  { id: 'ht', title: 'Hipertansiyon veya antihipertansif tedavi', desc: 'Hipertansiyon ve insülin direnci metabolik sendrom çatısı altında birlikte seyreder.' },
  { id: 'lipid', title: 'HDL < 35 ve/veya TG > 250 mg/dL', desc: 'Aterojenik dislipidemi, serbest yağ asitlerinin dokularda birikerek insülin işlevini bozmasıyla ilişkilidir.' },
  { id: 'pkos', title: 'PKOS', desc: 'Hiperandrojenemi ve ovulatuar disfonksiyon insülin direnciyle yakından ilişkilidir.' },
  { id: 'ir', title: 'İnsülin direnci bulguları', desc: 'Akantozis nigrikans, ciddi obezite; MASLD ve OSAS da eşlik eden durumlardır.' },
  { id: 'prediyabet', title: 'Önceden prediyabet', desc: 'BAG, BGT veya HbA1c %5,7-6,4 saptananlar yılda bir izlenir.' },
  { id: 'ilac', title: 'Diyabetojenik ilaçlar', desc: 'Glukokortikoidler, atipik antipsikotikler, kalsinörin inhibitörleri, immün kontrol noktası inhibitörleri.' },
];

const Screening: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <SectionTitle sub="Asemptomatik erişkin ve çocuklarda tarama endikasyonları.">Kimler taranmalı?</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {whoToScreen.map(w => (
            <div key={w.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex gap-3">
              <span className={`p-2.5 rounded-lg h-fit ${w.color}`}>{w.icon}</span>
              <span>
                <span className="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                  {w.title}
                  {w.badge && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">{w.badge}</span>}
                </span>
                <span className="block text-sm text-slate-600 mt-0.5">{w.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-primary text-lg">Risk faktörleri</h4>
            <span className="text-[10px] uppercase tracking-wider bg-white px-2 py-1 rounded text-primary/70 border border-primary/10">Detay için tıklayın</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {riskFactors.map(item => {
              const on = active === item.id;
              return (
                <button key={item.id} onClick={() => setActive(on ? null : item.id)} aria-expanded={on}
                  className={`text-left p-3 rounded-lg transition-all border ${on ? 'bg-white border-primary/40 shadow-md' : 'bg-white/60 border-transparent hover:bg-white hover:shadow-sm'}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${on ? 'bg-primary' : 'bg-slate-400'}`} />
                      <span className={`text-sm font-medium ${on ? 'text-primary' : 'text-slate-700'}`}>{item.title}</span>
                    </span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${on ? 'rotate-180 text-primary' : ''}`} />
                  </span>
                  {on && <span className="block text-xs text-slate-600 leading-relaxed mt-2 pl-4 border-l-2 border-primary/20">{item.desc}</span>}
                </button>
              );
            })}
          </div>
        </div>
        <Findrisk />
      </div>
    </div>
  );
};

export default Screening;
