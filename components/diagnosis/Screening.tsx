import React, { useState } from 'react';
import { Users, Scale, Baby, HeartPulse, School, ChevronDown, ListChecks } from 'lucide-react';
import { SectionTitle } from '../shared/ui';
import Findrisk from './Findrisk';

const whoToScreen = [
  { icon: <Users size={22} />, color: 'bg-sky-100 text-sky-700', title: '35 yaş ve üzeri herkes', text: 'Risk faktörü olmasa bile 35 yaşından itibaren 3 yılda bir APG.' },
  { icon: <Scale size={22} />, color: 'bg-blue-100 text-blue-700', title: 'BKİ ≥ 25 + ek risk faktörü', text: 'Yaştan bağımsız, yılda bir tarama (risk faktörleri aşağıda).' },
  { icon: <Baby size={22} />, color: 'bg-pink-100 text-pink-700', title: 'Gestasyonel diyabet öyküsü', text: 'Doğumdan 4-12 hafta sonra 75 g OGTT; normalse ömür boyu en az 3 yılda bir.' },
  { icon: <HeartPulse size={22} />, color: 'bg-rose-100 text-rose-700', title: 'ASKVH ve HIV', text: 'Aterosklerotik KV hastalığı olanlar ve antiretroviral tedavi başlanan HIV hastaları.' },
  { icon: <School size={22} />, color: 'bg-emerald-100 text-emerald-700', title: 'Çocuk ve ergen', text: 'BKİ > 85. persentil ve ≥ 1 ek risk faktörü: 10 yaş veya puberte başlangıcından itibaren 2 yılda bir.' },
];

const riskFactors = [
  { id: 'aile', title: '1. derece akrabada diyabet', desc: 'Anne, baba veya kardeşte Tip 2 diyabet riski belirgin artırır.' },
  { id: 'inaktivite', title: 'Fiziksel inaktivite', desc: 'Kas aktivitesinin azalması glukozun hücre içine alımını yavaşlatır ve insülin direncine zemin hazırlar.' },
  { id: 'ht', title: 'Hipertansiyon (KB ≥ 140/90) veya antihipertansif tedavi', desc: 'Hipertansiyon ve insülin direnci metabolik sendrom çatısı altında birlikte seyreder.' },
  { id: 'lipid', title: 'HDL < 35 ve/veya TG ≥ 250 mg/dL', desc: 'Aterojenik dislipidemi, serbest yağ asitlerinin dokularda birikerek insülin işlevini bozmasıyla ilişkilidir.' },
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
                </span>
                <span className="block text-sm text-slate-600 mt-0.5">{w.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* On large screens the box is pinned to the FINDRISK card's height; opened items scroll inside it */}
        <div className="relative">
          <div className="lg:absolute lg:inset-0 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="mb-4 border-b-2 border-black pb-3">
              <h3 className="text-xl font-bold flex items-center gap-2"><ListChecks /> Risk faktörleri</h3>
              <p className="text-slate-600 text-xs mt-1">Detay için tıklayın</p>
            </div>
            <div className="flex-1 min-h-0 grid sm:grid-cols-2 lg:auto-rows-fr border-2 border-black bg-black gap-[2px]">
              {riskFactors.map(item => {
                const on = active === item.id;
                return (
                  <button key={item.id} onClick={() => setActive(on ? null : item.id)} aria-expanded={on}
                    className={`min-h-[52px] text-left px-3 py-2 flex flex-col justify-center ${on ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-100'}`}>
                    <span className="flex items-center justify-between gap-2 w-full">
                      <span className="flex items-center gap-2.5">
                        <span className={`w-3 h-3 shrink-0 border-2 border-black ${on ? 'bg-black' : 'bg-white'}`} />
                        <span className="text-sm font-semibold text-slate-900 leading-snug">{item.title}</span>
                      </span>
                      <ChevronDown size={16} className={`shrink-0 transition-transform ${on ? 'rotate-180' : ''}`} />
                    </span>
                    {on && <span className="lg:hidden block text-[13px] text-slate-900 leading-relaxed mt-1.5 pl-5">{item.desc}</span>}
                  </button>
                );
              })}
            </div>
            {/* Large screens: the opened item's detail shows in a fixed-height panel so the box never grows */}
            <div className="hidden lg:block mt-4 border-2 border-black p-3 h-[92px] overflow-y-auto" aria-live="polite">
              {active
                ? <p className="text-sm text-slate-900 leading-relaxed"><strong>{riskFactors.find(r => r.id === active)!.title}:</strong> {riskFactors.find(r => r.id === active)!.desc}</p>
                : <p className="text-sm text-slate-600">Ayrıntısını görmek için bir risk faktörü seçin. BKİ ≥ 25 kg/m² ile birlikte bunlardan biri varsa yaştan bağımsız olarak yılda bir tarama yapılır.</p>}
            </div>
          </div>
        </div>
        <Findrisk />
      </div>
    </div>
  );
};

export default Screening;
