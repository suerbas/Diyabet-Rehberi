import React from 'react';
import { ArrowRight, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useNavigate } from 'react-router-dom';

const prevalenceData = [
  { name: 'TURDEP-I (1997)', value: 7.2, source: 'Ulusal tarama' },
  { name: 'TURDEP-II (2010)', value: 13.7, source: 'Ulusal tarama' },
  { name: 'IDF Atlası (2024)', value: 16.5, source: 'Model tahmini' },
];

const fmtPct = (v: number) => `%${String(v).replace('.', ',')}`;

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="intro" className="pt-32 pb-20 min-h-screen flex items-center bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full">
              TEMD 2026 ile güncellendi
            </span>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Tip 2 Diyabet <br />
              <span className="text-primary">Yönetim Rehberi</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl">
              Birinci basamak hekimleri için tanı, tedavi, yaşam tarzı değişiklikleri ve komplikasyon yönetimi kılavuzu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <Users className="text-primary shrink-0" />
                <div>
                  <h3 className="text-slate-900 font-bold">Avrupa’da birinci</h3>
                  <p className="text-slate-600 text-sm">IDF 2024 tahminine göre %16,5 prevalans ve 9,6 milyon erişkin diyabetli ile IDF Avrupa bölgesinde en yüksek sıklık.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <AlertCircle className="text-rose-500 shrink-0" />
                <div>
                  <h3 className="text-slate-900 font-bold">Farkındalık düşük</h3>
                  <p className="text-slate-600 text-sm">Diyabetlilerin yaklaşık %45’i hastalığının farkında değil; asemptomatik tarama esastır.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/risk-tani')}
                className="bg-primary hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                Risk Değerlendirmesi Yapın
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate('/vaka-testleri')}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Vaka Testleri
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-slate-900 text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-primary" />
                Türkiye’de erişkin diyabet sıklığı
              </h3>
              <p className="text-slate-500 text-sm">TURDEP çalışmaları ve IDF Diyabet Atlası</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prevalenceData} margin={{ top: 24, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} />
                  <YAxis stroke="#64748b" tickFormatter={v => `%${v}`} domain={[0, 20]} tickLine={false} />
                  <Tooltip
                    formatter={(v: number, _n, item) => [fmtPct(v), item.payload.source]}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                    cursor={{ fill: 'rgba(14,165,233,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} isAnimationActive={false}>
                    {prevalenceData.map((d, i) => (
                      <Cell key={d.name} fill={i === 2 ? '#94a3b8' : '#0ea5e9'} />
                    ))}
                    <LabelList dataKey="value" position="top" formatter={(v: number) => fmtPct(v)} style={{ fill: '#0f172a', fontSize: 13, fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <p>1997-2010 arasında ulusal taramalarda %90 artış gözlendi.</p>
              <p>
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-400 mr-1 align-middle" />
                2024 değeri yeni bir ulusal tarama değil, IDF Diyabet Atlası 11. baskı (2025) model tahminidir (20-79 yaş, yaş standardize).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
