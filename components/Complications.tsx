import React, { useState } from 'react';
import { Eye, Brain, Heart, Activity } from 'lucide-react';

const Complications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'micro' | 'macro'>('macro');

  return (
    <section id="complications" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Komplikasyon Yönetimi</h2>
          <p className="text-slate-600 mt-4">Diyabet "Kardiyovasküler Risk Eşdeğeri" olarak kabul edilir. Erken tarama esastır.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('macro')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'macro' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              Makrovasküler
            </button>
            <button
              onClick={() => setActiveTab('micro')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'micro' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              Mikrovasküler
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm min-h-[400px]">
            {activeTab === 'macro' ? (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-blue-700">
                    <Heart className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Kalp & Damar</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Tip 2 diyabetlilerde koroner arter hastalığı ve inme riski 2-4 kat artar. Ölümlerin %60-75'i KVH kaynaklıdır.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Korunma Hedefleri</h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• LDL &lt; 70 mg/dL (Yüksek riskte &lt; 55)</li>
                      <li>• Tansiyon &lt; 140/90 (Genç/Riskli &lt; 130/80)</li>
                      <li>• Sigara: Tamamen bırakılmalı</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-800">Sessiz İskemi</h4>
                    <p className="text-sm text-slate-500 mt-1">Otonom nöropati nedeniyle göğüs ağrısı olmayabilir. Nefes darlığı ve yorgunluk anjina eşdeğeri olabilir.</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-800">Periferik Arter</h4>
                    <p className="text-sm text-slate-500 mt-1">Yürürken bacak ağrısı (kladikasyo). Nabız muayenesi şarttır.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg h-fit text-purple-600"><Eye size={24}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800">Retinopati</h4>
                      <p className="text-sm text-slate-600">Tanı anında ve sonrasında yılda bir göz dibi muayenesi.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg h-fit text-orange-600"><Activity size={24}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800">Nefropati</h4>
                      <p className="text-sm text-slate-600">Yılda bir idrar albümin/kreatinin oranı ve eGFR takibi. ACEİ/ARB kullanımı nefroprotektiftir.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg h-fit text-teal-600"><Brain size={24}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800">Nöropati</h4>
                      <p className="text-sm text-slate-600">Yılda bir monofilament testi. Ayak bakımı eğitimi ile amputasyon %50 önlenebilir.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Diyabetik Ayak: 3'lü Mekanizma</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="bg-white p-3 rounded shadow-sm">
                      <span className="font-bold text-red-500">1. Nöropati:</span> Duyu kaybı (ağrıyı hissetmez).
                    </li>
                    <li className="bg-white p-3 rounded shadow-sm">
                      <span className="font-bold text-red-500">2. İskemi:</span> Kanlanma bozukluğu, iyileşme gecikir.
                    </li>
                    <li className="bg-white p-3 rounded shadow-sm">
                      <span className="font-bold text-red-500">3. Enfeksiyon:</span> Derin doku hasarı ve osteomiyelit riski.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Complications;