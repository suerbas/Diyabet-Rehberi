import React from 'react';
import { ArrowRight, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const prevalenceData = [
  { name: 'TURDEP-I (1997)', value: 7.8 },
  { name: 'TURDEP-II (2010)', value: 13.7 },
  { name: '2024 (Tahmini)', value: 16.5 },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="intro" className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Güncel Verilerle (2025)
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Tip 2 Diyabet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Yönetim Rehberi
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Birinci basamak hekimleri ve hastalar için kapsamlı; tanı, tedavi, yaşam tarzı değişiklikleri ve komplikasyon yönetimi kılavuzu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                <Users className="text-blue-400 shrink-0" />
                <div>
                  <h3 className="text-white font-bold">Avrupa'da Birinci</h3>
                  <p className="text-slate-400 text-sm">Türkiye, %13.7+ prevalans ile Avrupa'da diyabet sıklığında lider konumdadır.</p>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                <AlertCircle className="text-rose-400 shrink-0" />
                <div>
                  <h3 className="text-white font-bold">Farkındalık Düşük</h3>
                  <p className="text-slate-400 text-sm">Toplumdaki her 2 diyabetliden 1'i henüz tanı almamış durumdadır.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
              <button 
                onClick={() => navigate('/risk-tani')} 
                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Risk Değerlendirmesi Yapın
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/vaka-testleri')} 
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Vaka Testleri
              </button>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl animate-in zoom-in duration-1000">
            <div className="mb-6">
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                Türkiye'de Diyabet Artışı (%)
              </h3>
              <p className="text-slate-400 text-sm">TURDEP Çalışmaları Verileri</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prevalenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                  <YAxis stroke="#94a3b8" unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {prevalenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#f43f5e' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Not: 1997-2010 arasında %90'lık bir artış gözlenmiştir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;