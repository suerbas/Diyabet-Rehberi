import React from 'react';
import { ArrowRight, ArrowUpRight, TrendingUp, Users, AlertCircle, ClipboardList, Salad, Pill, HeartPulse, ShieldPlus, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const prevalenceData = [
  { name: 'TURDEP-I (1997)', value: 7.2, source: 'Ulusal tarama' },
  { name: 'TURDEP-II (2010)', value: 13.7, source: 'Ulusal tarama' },
  { name: 'IDF Atlası (2024)', value: 16.5, source: 'Model tahmini' },
];

const fmtPct = (v: number) => `%${String(v).replace('.', ',')}`;

// Two-line axis label ("TURDEP-II" / "(2010)") so all three fit on a 360px screen
const AxisTick: React.FC<{ x?: number; y?: number; payload?: { value: string } }> = ({ x = 0, y = 0, payload }) => {
  const [head, tail] = (payload?.value ?? '').split(' (');
  return (
    <text x={x} y={y + 14} textAnchor="middle" fill="#0a0a0a" fontSize={11} fontFamily="Space Mono, monospace">
      <tspan x={x}>{head}</tspan>
      {tail && <tspan x={x} dy={14}>({tail}</tspan>}
    </text>
  );
};

const sections = [
  { no: '01', path: '/risk-tani', title: 'Risk & Tanı', icon: <ClipboardList size={22} />, text: 'Tanı eşikleri ve yorumlayıcı, tarama, FINDRISK, prediyabet, ayırıcı tanı.' },
  { no: '02', path: '/yasam-tarzi', title: 'Yaşam Tarzı', icon: <Salad size={22} />, text: 'Beslenme, egzersiz, kilo yönetimi ve günlük yaşam.' },
  { no: '03', path: '/tedavi', title: 'Tedavi', icon: <Pill size={22} />, text: 'Komorbiditeye göre ilaç seçimi, ilaç sınıfları, eGFR’ye göre doz, insülin.' },
  { no: '04', path: '/komplikasyonlar', title: 'Komplikasyonlar', icon: <HeartPulse size={22} />, text: 'Tarama takvimi, akut tablolar, KV risk, böbrek, göz, ayak, karaciğer.' },
  { no: '05', path: '/ozel-durumlar', title: 'Özel Durumlar', icon: <ShieldPlus size={22} />, text: 'Gebelik, yaşlı, Ramazan, hasta günü ve cerrahi, steroid, çocuk ve genç.' },
  { no: '06', path: '/vaka-testleri', title: 'Vaka Testleri', icon: <BookOpen size={22} />, text: '26 klinik vaka; her açıklama ilgili rehber bölümüne bağlanır.' },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <section id="intro" className="relative overflow-hidden pt-10 md:pt-14 pb-14">
        {/* glucose-ring motif, decorative */}
        <svg className="hero-hex pointer-events-none absolute -right-24 -top-10 w-[420px] h-[420px] hidden md:block" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 4 L90 27 V73 L50 96 L10 73 V27 Z" fill="none" stroke="#0a0a0a" strokeWidth="0.6" strokeDasharray="2 2" />
        </svg>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 lg:items-stretch">
            {/* Both columns share one height on desktop: the chart card stretches to the text column */}
            <div className="flex flex-col gap-7 lg:justify-between">
              <span className="inline-block text-xs font-bold uppercase tracking-wider bg-yellow-300 border-2 border-black px-2 py-1">
                TEMD 2026 ile güncellendi
              </span>

              <h1 className="text-[42px] leading-[0.95] sm:text-6xl lg:text-7xl font-extrabold text-slate-900">
                Tip 2 Diyabet <br />
                <span className="hl">Yönetim Rehberi</span>
              </h1>

              <p className="text-lg text-slate-700 max-w-xl">
                Birinci basamak hekimleri için tanı, tedavi, yaşam tarzı değişiklikleri ve komplikasyon yönetimi kılavuzu.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                  <Users className="shrink-0" />
                  <div>
                    <h3 className="text-slate-900 font-bold">Avrupa’da birinci</h3>
                    <p className="text-slate-600 text-sm">IDF 2024 tahminine göre %16,5 prevalans ve 9,6 milyon erişkin diyabetli ile IDF Avrupa bölgesinde en yüksek sıklık.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                  <AlertCircle className="text-rose-600 shrink-0" />
                  <div>
                    <h3 className="text-slate-900 font-bold">Farkındalık düşük</h3>
                    <p className="text-slate-600 text-sm">Diyabetlilerin yaklaşık %45’i hastalığının farkında değil; asemptomatik tarama esastır.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/risk-tani')}
                  className="bg-primary text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  Risk Değerlendirmesi Yapın
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/vaka-testleri')}
                  className="bg-white text-slate-900 border border-slate-300 px-7 py-4 rounded-xl font-semibold transition-colors shadow-sm"
                >
                  Vaka Testleri
                </button>
              </div>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:h-full">
              <div className="mb-5">
                <h3 className="text-slate-900 text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="shrink-0" />
                  Türkiye’de erişkin diyabet sıklığı
                </h3>
                <p className="text-slate-600 text-sm">TURDEP çalışmaları ve IDF Diyabet Atlası</p>
              </div>
              <div className="h-64 lg:h-auto lg:flex-1 lg:min-h-[18rem] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prevalenceData} margin={{ top: 24, right: 4, left: -16, bottom: 14 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d4d0c4" vertical={false} />
                    <XAxis dataKey="name" stroke="#0a0a0a" strokeWidth={2} tick={<AxisTick />} tickLine={false} interval={0} />
                    <YAxis stroke="#0a0a0a" tick={{ fontSize: 11, fill: '#0a0a0a' }} tickFormatter={v => `%${v}`} domain={[0, 20]} tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(v: number, _n, item) => [fmtPct(v), item.payload.source]}
                      contentStyle={{ backgroundColor: '#fff', border: '3px solid #0a0a0a', borderRadius: 0, color: '#0a0a0a', boxShadow: '4px 4px 0 #0a0a0a' }}
                      cursor={{ fill: 'rgba(10,10,10,0.05)' }}
                    />
                    <Bar dataKey="value" stroke="#0a0a0a" strokeWidth={3} maxBarSize={88} animationDuration={900} animationEasing="ease-out">
                      {prevalenceData.map((d, i) => (
                        <Cell key={d.name} fill={i === 2 ? '#ff5a47' : '#ffe500'} />
                      ))}
                      <LabelList dataKey="value" position="top" formatter={(v: number) => fmtPct(v)} style={{ fill: '#0a0a0a', fontSize: 13, fontWeight: 800 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-1 text-xs text-slate-600">
                <p>1997-2010 arasında ulusal taramalarda %90 artış gözlendi.</p>
                <p>
                  <span className="inline-block w-2.5 h-2.5 bg-[#ff5a47] border border-black mr-1 align-middle" />
                  2024 değeri yeni bir ulusal tarama değil, IDF Diyabet Atlası 11. baskı (2025) model tahminidir (20-79 yaş, yaş standardize).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20" aria-labelledby="sections-title">
        <div className="flex items-end justify-between gap-4 mb-8 border-b-[3px] border-black pb-4">
          <h2 id="sections-title" className="text-3xl md:text-5xl font-bold text-slate-900">Rehberin bölümleri</h2>
          <span className="font-mono text-sm text-slate-700 hidden sm:block">6 bölüm</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map(s => (
            <Link key={s.path} to={s.path}
              className="section-card group bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-4 min-h-[190px]">
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm font-bold">{s.no}</span>
                <span className="w-11 h-11 flex items-center justify-center border-2 border-black bg-yellow-300 transition-transform duration-200 group-hover:-rotate-6">{s.icon}</span>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between gap-2">
                  {s.title}
                  <ArrowUpRight size={22} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                <p className="text-sm text-slate-700 mt-1">{s.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
