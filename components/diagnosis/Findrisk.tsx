import React, { useState } from 'react';
import { Calculator, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

type Gender = 'female' | 'male';

interface Question {
  id: number;
  text: string;
  options: { label: string; points: number }[];
}

const bands = [
  { max: 6, level: 'Düşük risk', risk: '%1 (100 kişide 1)', swatch: 'bg-green-400', action: 'Sağlıklı yaşam tarzının sürdürülmesi. 35 yaşından itibaren 3 yılda bir APG.' },
  { max: 11, level: 'Hafif risk', risk: '%4 (25 kişide 1)', swatch: 'bg-yellow-300', action: 'Kilo kontrolü ve düzenli fiziksel aktivite önerilir.' },
  { max: 14, level: 'Orta risk', risk: '%17 (6 kişide 1)', swatch: 'bg-orange-400', action: 'Yaşam tarzı danışmanlığı ve APG kontrolü.' },
  { max: 20, level: 'Yüksek risk', risk: '%33 (3 kişide 1)', swatch: 'bg-red-500', action: 'Yoğun yaşam tarzı programı + APG / HbA1c, gerekirse 75 g OGTT. Prediyabet saptanırsa metformin değerlendirilir.' },
  { max: Infinity, level: 'Çok yüksek risk', risk: '%50 (2 kişide 1)', swatch: 'bg-rose-700 text-white', action: 'Gecikmeden glisemik değerlendirme (APG, HbA1c, 75 g OGTT) ve prediyabet/diyabet yönetimi.' },
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

  const range = (i: number) => (i === 0 ? '< 7' : i === 4 ? '> 20' : `${bands[i - 1].max + 1}-${bands[i].max}`);

  return (
    <div className="bg-white text-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="mb-4 border-b-2 border-black pb-3 flex justify-between items-center gap-2">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2"><Calculator /> FINDRISK</h3>
          <p className="text-slate-600 text-xs mt-1">10 yıllık Tip 2 diyabet riski</p>
        </div>
        {step > 0 && <button onClick={() => { setStep(0); setAnswers({}); }} className="text-sm px-3 underline">Çıkış</button>}
      </div>

      {step === 0 && (
        <div className="flex flex-col">
          <p className="text-slate-700 mb-4 text-sm">8 soruluk Finlandiya Diyabet Risk Skoru, önümüzdeki 10 yılda Tip 2 diyabet gelişme olasılığını tahmin eder. FINDRISK ≥ 15 yüksek risk grubudur.</p>
          <table className="w-full text-sm mb-5 border-2 border-black">
            <thead><tr><th className="text-left p-2">Puan</th><th className="text-left p-2">Risk</th><th className="text-left p-2">10 yılda</th></tr></thead>
            <tbody>
              {bands.map((b, i) => (
                <tr key={b.level} className="border-t-2 border-black">
                  <td className="p-2 font-bold whitespace-nowrap"><span className={`inline-block w-3 h-3 mr-2 align-middle border-2 border-black ${b.swatch}`} />{range(i)}</td>
                  <td className="p-2">{b.level}</td>
                  <td className="p-2">{b.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setStep(1)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2">
            Hesaplamaya başla <ArrowRight size={20} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex border-2 border-black" role="group" aria-label="Cinsiyet">
              <button onClick={() => switchGender('female')} aria-pressed={gender === 'female'} className={`px-5 text-sm ${gender === 'female' ? 'bg-black text-white' : 'bg-white'}`}>Kadın</button>
              <button onClick={() => switchGender('male')} aria-pressed={gender === 'male'} className={`px-5 text-sm border-l-2 border-black ${gender === 'male' ? 'bg-black text-white' : 'bg-white'}`}>Erkek</button>
            </div>
          </div>
          <div className="space-y-5 pb-2">
            {questions.map(q => (
              <div key={q.id} className="space-y-2">
                <p className="font-bold text-sm">{q.id}. {q.text}</p>
                <div className="grid gap-2">
                  {q.options.map(opt => {
                    const on = answers[q.id] === opt.points;
                    return (
                      <button key={opt.label} onClick={() => setAnswers(p => ({ ...p, [q.id]: opt.points }))} aria-pressed={on}
                        className={`text-left px-3 py-2 text-sm border-2 border-black ${on ? 'bg-yellow-300 font-semibold' : 'bg-white hover:bg-slate-100'}`}>
                        <span className="flex justify-between items-center gap-2">
                          <span>{opt.label}</span>
                          <span className="flex items-center gap-2 text-xs">{opt.points} p{on && <CheckCircle2 size={16} />}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t-2 border-black">
            <button onClick={() => setStep(2)} disabled={!allAnswered}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${allAnswered ? 'bg-primary text-white shadow-sm' : 'bg-slate-200 text-slate-600 cursor-not-allowed'}`}>
              <Calculator size={20} /> Sonucu gör
            </button>
            {!allAnswered && <p className="text-center text-xs text-slate-600 mt-2">Tüm soruları yanıtlayın ({Object.keys(answers).length}/8).</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center text-center" aria-live="polite">
          <div className={`w-24 h-24 border-4 border-black flex flex-col items-center justify-center mb-4 ${res.swatch}`}>
            <span className="text-4xl font-extrabold">{score}</span>
            <span className="text-xs font-bold">PUAN</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{res.level}</h3>
          <div className="p-3 border-2 border-black mb-4 w-full">
            <p className="text-sm mb-1">10 yıllık Tip 2 diyabet riski</p>
            <p className="text-2xl font-bold">{res.risk}</p>
          </div>
          <p className="text-slate-700 text-sm mb-5"><strong>Önerilen yaklaşım:</strong> {res.action}</p>
          <button onClick={() => { setAnswers({}); setStep(1); }} className="bg-white border-2 border-black px-6 py-2 rounded-xl font-semibold shadow-sm flex items-center gap-2">
            <RefreshCw size={18} /> Tekrar hesapla
          </button>
        </div>
      )}
    </div>
  );
};

export default Findrisk;
