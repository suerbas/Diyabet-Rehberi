import React from 'react';
import { Baby, UserCheck } from 'lucide-react';

const SpecialGroups: React.FC = () => {
  return (
    <section id="special" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Özel Gruplar</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Elderly */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-amber-200 rounded-full text-amber-800">
                <UserCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">Yaşlı Hastalar</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-amber-800 mb-2">Temel Sorun: Hipoglisemi</h4>
                <p className="text-sm text-slate-600">Yaşlılarda hipoglisemi farkındalığı azalır ve sonuçları (düşme, kırık, aritmi) daha ağırdır. Sülfonilüre kullanımından kaçınılmalıdır.</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-amber-800 mb-2">Esnek Hedefler</h4>
                <p className="text-sm text-slate-600">
                  Kırılgan, yaşam beklentisi sınırlı yaşlılarda HbA1c hedefi <strong>%8 - 8.5</strong> olarak esnetilebilir. Amaç semptomsuz yaşam kalitesidir.
                </p>
              </div>

              <ul className="list-disc list-inside text-sm text-amber-900/80 space-y-1 ml-2">
                <li>Böbrek fonksiyonları (eGFR) sık izlenmeli.</li>
                <li>Malnütrisyon ve sarkopeni (kas kaybı) riski.</li>
                <li>Polifarmasiye dikkat.</li>
              </ul>
            </div>
          </div>

          {/* Pregnancy */}
          <div className="bg-pink-50 rounded-2xl p-8 border border-pink-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pink-200 rounded-full text-pink-800">
                <Baby size={32} />
              </div>
              <h3 className="text-2xl font-bold text-pink-900">Gebelik ve Diyabet (GDM)</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-pink-800 mb-2">Tarama</h4>
                <p className="text-sm text-slate-600">
                  Tüm gebelere <strong>24-28. haftada</strong> OGTT yapılmalıdır. Riskli gebelere ilk trimesterde tarama önerilir.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-pink-800 mb-2">Sıkı Hedefler</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-sm mt-2">
                  <div className="bg-pink-50 p-2 rounded border border-pink-100">
                    <span className="block text-xs text-pink-600">Açlık</span>
                    <strong>≤ 95</strong>
                  </div>
                  <div className="bg-pink-50 p-2 rounded border border-pink-100">
                    <span className="block text-xs text-pink-600">1. Saat</span>
                    <strong>≤ 140</strong>
                  </div>
                  <div className="bg-pink-50 p-2 rounded border border-pink-100">
                    <span className="block text-xs text-pink-600">2. Saat</span>
                    <strong>≤ 120</strong>
                  </div>
                </div>
              </div>

              <p className="text-sm text-pink-900/80 italic ml-2">
                * Tedavide ilk seçenek yaşam tarzı değişikliğidir. Yetmezse <strong>İnsülin</strong> kullanılır (Oral antidiyabetikler gebelikte önerilmez).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialGroups;