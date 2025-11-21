import React from 'react';
import { Utensils, Activity, Ban, Footprints, Hand } from 'lucide-react';

const Lifestyle: React.FC = () => {
  return (
    <section id="lifestyle" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">İlk Reçete: Yaşam Tarzı</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            Diyabet yönetiminin %50'si yaşam tarzı değişikliğidir. İlaçlardan önce davranış değişikliği gelir.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Nutrition */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
              <Utensils size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Tıbbi Beslenme</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                <span><strong>Akdeniz Diyeti:</strong> Zeytinyağı, sebze, baklagil ağırlıklı beslenme KVH riskini %30 azaltır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                <span><strong>Porsiyon Kontrolü:</strong> "Avuç İçi" modeli ile protein, sebze ve karbonhidrat dengesi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                <span><strong>Glisemik İndeks:</strong> Lifli, az işlenmiş karbonhidratlar tercih edilmeli.</span>
              </li>
            </ul>
          </div>

          {/* Activity */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Activity size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Fiziksel Aktivite</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span><strong>150 dk/hafta:</strong> Orta şiddette aerobik egzersiz (yürüyüş, yüzme).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span><strong>Direnç Egzersizi:</strong> Haftada 2 gün kas kütlesini korumak için ağırlık/bant egzersizi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                <span><strong>Aktif Mola:</strong> Masa başı çalışanlar her 30 dk'da bir ayağa kalkmalı.</span>
              </li>
            </ul>
          </div>

          {/* Habits */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-6">
              <Ban size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Alışkanlıklar & Kilo</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                <span><strong>Sigarayı Bırakma:</strong> En kritik müdahaledir. KVH riskini dramatik şekilde düşürür.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                <span><strong>%5-10 Kilo Kaybı:</strong> HbA1c'yi iyileştirir, ilaç ihtiyacını azaltır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                <span><strong>Uyku Düzeni:</strong> 7-8 saat kaliteli uyku insülin direncini kırmak için önemlidir.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Practical Tips Box */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 bg-white/10 p-4 rounded-full">
            <Hand size={48} className="text-blue-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Porsiyon Kontrolü: El Modeli</h3>
            <p className="text-slate-300 mb-4">
              Hastalarınıza karmaşık kalori hesapları yerine ellerini kullanmalarını öğretin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <span className="block font-bold text-blue-300 mb-1">Avuç İçi</span>
                Protein
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <span className="block font-bold text-blue-300 mb-1">Yumruk</span>
                Sebze
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <span className="block font-bold text-blue-300 mb-1">Avuç Dolusu</span>
                Karbonhidrat
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <span className="block font-bold text-blue-300 mb-1">Başparmak</span>
                Yağ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;