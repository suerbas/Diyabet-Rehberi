import React, { useState } from 'react';
import { Calculator, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

type Gender = 'female' | 'male';

interface Question {
  id: number;
  text: string;
  options: { label: string; points: number }[];
}

const bands = [
  { max: 6, level: 'Düşük risk', risk: '%1 (100 kişide 1)', color: 'text-green-400', bg: 'bg-green-500/20 border-green-500', action: 'Sağlıklı yaşam tarzının sürdürülmesi. 35 yaşından itibaren 3 yılda bir APG.' },
  { max: 11, level: 'Hafif risk', risk: '%4 (25 kişide 1)', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500', action: 'Kilo kontrolü ve düzenli fiziksel aktivite önerilir.' },
  { max: 14, level: 'Orta risk', risk: '%17 (6 kişide 1)', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500', action: 'Yaşam tarzı danışmanlığı ve APG kontrolü.' },
  { max: 20, level: 'Yüksek risk', risk: '%33 (3 kişide 1)', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500', action: 'Yoğun yaşam tarzı programı + APG / HbA1c, gerekirse 75 g OGTT. Prediyabet saptanırsa metformin değerlendirilir.' },
  { max: Infinity, level: 'Çok yüksek risk', risk: '%50 (2 kişide 1)', color: 'text-rose-500', bg: 'bg-rose-600/20 border-rose-600', action: 'Gecikmeden glisemik değerlendirme (APG, HbA1c, 75 g OGTT) ve prediyabet/diyabet yönetimi.' },
];

const resultFor = (score: number) => bands.find(b => score <= b.max)!;

const Findrisk: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [gender, setGender] = useState<Gender>('female');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions: Question[] = [
    { id: 1, text: 'Yaş', options: [{ label: '45 yaş altı', points: 0 }, { label: '45-54 yaş', points: 2 }, { label: '55-64 yaş', points: 3 }, { label: '64 yaş üstü', points: 4 }] },
    { id: 2, text: 'Vücut kitle indeksi (BKİ)', options: [{ label: '< 25 kg/m²', points: 0 }, { label: '25-30 kg/m²', points: 1 }, { label: '> 30 kg/m²', points: 3 }] },
    {
      id: 3, text: 'Bel çevresi',
      options: gender === 'male'
        ? [{ label: '< 94 cm', points: 0 }, { label: '94-102 cm', points: 3 }, { label: '> 102 cm', points: 4 }]
        : [{ label: '< 80 cm', points: 0 }, { label: '80-88 cm', points: 3 }, { label: '> 88 cm', points: 4 }],
    },
    { id: 4, text: 'Günde en az 30 dk fiziksel aktivite', options: [{ label: 'Evet', points: 0 }, { label: 'Hayır', points: 2 }] },
    { id: 5, text: 'Sebze-meyve tüketimi', options: [{ label: 'Her gün', points: 0 }, { label: 'Her gün değil', points: 1 }] },
    { id: 6, text: 'Antihipertansif ilaç kullanımı', options: [{ label: 'Hayır', points: 0 }, { label: 'Evet', points: 2 }] },
    { id: 7, text: 'Daha önce yüksek kan şekeri (check-up, hastalık, gebelik)', options: [{ label: 'Hayır', points: 0 }, { label: 'Evet', points: 5 }] },
    { id: 8, text: 'Ailede diyabet', options: [{ label: 'Yok', points: 0 }, { label: '2. derece (büyükanne/baba, teyze, amca, dayı, hala, kuzen)', points: 3 }, { label: '1. derece (anne, baba, kardeş, çocuk)', points: 5 }] },
  ];

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const score = Object.values(answers).reduce<number>((a, b) => a + (b as number), 0);
  const res = resultFor(score);

  const switchGender = (g: Gender) => {
    setGender(g);
    setAnswers(prev => { const next = { ...prev }; delete next[3]; return next; });
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl relative flex flex-col h-full min-h-[550px] shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-16 -mt-16 pointer-events-none" />
      <div className="relative z-10 mb-6 border-b border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2"><Calculator className="text-blue-400" /> FINDRISK</h3>
          <p className="text-slate-400 text-xs mt-1">10 yıllık Tip 2 diyabet riski</p>
        </div>
        {step > 0 && <button onClick={() => { setStep(0); setAnswers({}); }} className="text-xs text-slate-400 hover:text-white underline">Çıkış</button>}
      </div>

      {step === 0 && (
        <div className="relative z-10 flex flex-col h-full justify-center">
          <p className="text-slate-300 mb-6 text-center leading-relaxed text-sm">8 soruluk Finlandiya Diyabet Risk Skoru, önümüzdeki 10 yılda Tip 2 diyabet gelişme olasılığını tahmin eder. FINDRISK ≥ 15 yüksek risk grubudur.</p>
          <div className="grid grid-cols-2 gap-3 mb-8 text-center">
            {bands.map((b, i) => (
              <div key={b.level} className={`bg-slate-800/50 p-3 rounded-lg border border-slate-700 ${i === 4 ? 'col-span-2' : ''}`}>
                <span className="block text-xs text-slate-400 mb-1">{b.level}</span>
                <span className={`font-bold text-sm ${b.color}`}>{i === 0 ? '< 7' : i === 4 ? '> 20' : `${bands[i - 1].max + 1}-${b.max}`} puan</span>
                <span className="block text-[11px] text-slate-500 mt-1">{b.risk}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
            Hesaplamaya başla <ArrowRight size={20} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4 flex justify-center">
            <div className="bg-slate-800 p-1 rounded-lg inline-flex">
              <button onClick={() => switchGender('female')} className={`px-4 py-1.5 rounded text-sm ${gender === 'female' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}>Kadın</button>
              <button onClick={() => switchGender('male')} className={`px-4 py-1.5 rounded text-sm ${gender === 'male' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Erkek</button>
            </div>
          </div>
          <div className="flex-grow space-y-6 pb-4">
            {questions.map(q => (
              <div key={q.id} className="space-y-2">
                <p className="font-semibold text-sm text-blue-200">{q.id}. {q.text}</p>
                <div className="grid gap-2">
                  {q.options.map(opt => {
                    const on = answers[q.id] === opt.points;
                    return (
                      <button key={opt.label} onClick={() => setAnswers(p => ({ ...p, [q.id]: opt.points }))} aria-pressed={on}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm border transition-all ${on ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
                        <span className="flex justify-between items-center gap-2">
                          <span>{opt.label}</span>
                          <span className="flex items-center gap-2 text-xs text-slate-400">{opt.points} p{on && <CheckCircle2 size={16} className="text-blue-400" />}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button onClick={() => setStep(2)} disabled={!allAnswered}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${allAnswered ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
              <Calculator size={20} /> Sonucu gör
            </button>
            {!allAnswered && <p className="text-center text-xs text-slate-500 mt-2">Tüm soruları yanıtlayın ({Object.keys(answers).length}/8).</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 relative">
            <span className={`text-4xl font-extrabold ${res.color}`}>{score}</span>
            <span className="absolute -bottom-2 bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">Puan</span>
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${res.color}`}>{res.level}</h3>
          <div className={`p-4 rounded-xl border ${res.bg} mb-6 w-full`}>
            <p className="text-sm font-medium text-white mb-1">10 yıllık Tip 2 diyabet riski</p>
            <p className={`text-2xl font-bold ${res.color}`}>{res.risk}</p>
          </div>
          <p className="text-slate-300 text-sm mb-8 px-4"><strong>Önerilen yaklaşım:</strong> {res.action}</p>
          <button onClick={() => { setAnswers({}); setStep(1); }} className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2">
            <RefreshCw size={18} /> Tekrar hesapla
          </button>
        </div>
      )}
    </div>
  );
};

export default Findrisk;
