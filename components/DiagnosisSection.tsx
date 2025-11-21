import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Scale, Dna, ChevronDown } from 'lucide-react';

const diagnosticData = [
  { label: 'Normal', a1c: '< %5.7', fpg: '< 100 mg/dL', ogtt: '< 140 mg/dL', color: 'bg-green-100 text-green-800 border-green-200' },
  { label: 'Prediyabet', a1c: '%5.7 - 6.4', fpg: '100 - 125 mg/dL', ogtt: '140 - 199 mg/dL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { label: 'Diyabet', a1c: '≥ %6.5', fpg: '≥ 126 mg/dL', ogtt: '≥ 200 mg/dL', color: 'bg-red-100 text-red-800 border-red-200' },
];

const riskFactors = [
  { 
    id: 'inactivity', 
    title: 'Fiziksel inaktivite', 
    desc: 'Kas aktivitesinin azalması, glukozun hücre içine alımını yavaşlatır ve insülin direncine zemin hazırlar.' 
  },
  { 
    id: 'ht', 
    title: 'Hipertansiyon (≥140/90)', 
    desc: 'Yüksek tansiyon ve insülin direnci genellikle "Metabolik Sendrom" çatısı altında birlikte seyreder ve damar yapısını bozar.' 
  },
  { 
    id: 'lipid', 
    title: 'HDL < 35 veya TG > 250', 
    desc: 'Kan yağlarındaki dengesizlik (Dislipidemi), serbest yağ asitlerinin dokularda birikerek insülin işlevini bozmasına neden olur.' 
  },
  { 
    id: 'gdm', 
    title: 'Gestasyonel Diyabet Öyküsü', 
    desc: 'Gebelikte çıkan şeker, pankreas rezervlerinin sınırda olduğunu gösterir; ileride Tip 2 diyabet riskini %50 artırır.' 
  },
  { 
    id: 'pkos', 
    title: 'PKOS (Polikistik Over)', 
    desc: 'Hormonal düzensizlikler ve artan androjen seviyeleri, insülin direncini tetikleyen önemli bir faktördür.' 
  },
  { 
    id: 'ir', 
    title: 'İnsülin Direnci Bulguları', 
    desc: 'Boyun veya koltuk altında koyulaşma (Akantozis Nigrikans), insülin seviyelerinin kronik olarak yüksek olduğunun klinik işaretidir.' 
  }
];

const DiagnosisSection: React.FC = () => {
  const [activeRisk, setActiveRisk] = useState<string | null>(null);

  return (
    <section id="risk" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Erken Tanı Hayat Kurtarır</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Tanı Kriterleri ve Risk Faktörleri</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            Semptomsuz seyredebilen Tip 2 Diyabet için risk gruplarının düzenli taranması esastır.
          </p>
        </div>

        {/* Diagnosis Table */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {diagnosticData.map((item, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border-2 ${item.color} transition-transform hover:-translate-y-1`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                {idx === 0 && <CheckCircle2 size={24} />}
                {idx === 1 && <AlertTriangle size={24} />}
                {idx === 2 && <AlertTriangle size={24} />}
                {item.label}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-current/20 pb-2">
                  <span className="font-medium">HbA1c</span>
                  <span className="font-bold">{item.a1c}</span>
                </div>
                <div className="flex justify-between border-b border-current/20 pb-2">
                  <span className="font-medium">Açlık Şekeri (APG)</span>
                  <span className="font-bold">{item.fpg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">OGTT (2. Saat)</span>
                  <span className="font-bold">{item.ogtt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINDRISK Teaser & Risk Factors */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Kimler Taranmalı?</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 h-fit">
                  <Scale size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">BKİ ≥ 25 kg/m² Olanlar</h4>
                  <p className="text-sm text-slate-600 mt-1">Fazla kilolu veya obez bireylerde 35 yaşından itibaren, risk faktörü varsa daha erken yaşta tarama yapılmalıdır.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600 h-fit">
                  <Dna size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Genetik ve Aile Öyküsü</h4>
                  <p className="text-sm text-slate-600 mt-1">Birinci derece akrabasında diyabet olanlar yüksek risk grubundadır.</p>
                </div>
              </div>
              
              {/* Interactive Risk Factors */}
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-primary">Diğer Önemli Risk Faktörleri</h4>
                  <span className="text-[10px] uppercase tracking-wider bg-white px-2 py-1 rounded text-primary/70 border border-primary/10 shadow-sm">
                    Detay İçin Tıkla
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {riskFactors.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveRisk(activeRisk === item.id ? null : item.id)}
                      className={`text-left p-3 rounded-lg transition-all duration-300 border group relative overflow-hidden ${
                        activeRisk === item.id 
                          ? 'bg-white border-primary/40 shadow-md ring-1 ring-primary/10 z-10' 
                          : 'bg-white/50 border-transparent hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeRisk === item.id ? 'bg-primary scale-125' : 'bg-slate-400 group-hover:bg-primary/50'
                          }`}></div>
                          <span className={`text-sm font-medium transition-colors ${
                            activeRisk === item.id ? 'text-primary' : 'text-slate-700'
                          }`}>
                            {item.title}
                          </span>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${
                          activeRisk === item.id ? 'rotate-180 text-primary' : ''
                        }`} />
                      </div>
                      
                      <div className={`grid transition-all duration-300 ease-in-out ${
                        activeRisk === item.id ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-xs text-slate-600 leading-relaxed pl-4 border-l-2 border-primary/20">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">FINDRISK Anketi</h3>
            <p className="text-slate-300 mb-6 relative z-10">
              Tip 2 diyabet açısından gelecek 10 yıl içindeki riskinizi belirlemek için kullanılan bilimsel bir skorlama sistemidir.
            </p>
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Skor &lt; 7</span>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded">Düşük Risk</span>
                </div>
                <p className="text-xs text-slate-300">10 yıllık risk: %1 (1/100)</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Skor 15-20</span>
                  <span className="bg-orange-500 text-xs px-2 py-1 rounded">Yüksek Risk</span>
                </div>
                <p className="text-xs text-slate-300">10 yıllık risk: %33 (1/3)</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg border border-red-500/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Skor &gt; 20</span>
                  <span className="bg-red-500 text-xs px-2 py-1 rounded">Çok Yüksek</span>
                </div>
                <p className="text-xs text-slate-300">10 yıllık risk: %50 (1/2)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;