import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Scale, Dna, ChevronDown, Calculator, RefreshCw, ArrowRight } from 'lucide-react';

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

// FINDRISK Logic Types
type Gender = 'female' | 'male';

interface FindriskQuestion {
  id: number;
  text: string;
  options: { label: string; points: number; genderSpecific?: Gender }[];
}

const DiagnosisSection: React.FC = () => {
  const [activeRisk, setActiveRisk] = useState<string | null>(null);
  
  // FINDRISK State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: Intro, 1: Questions, 2: Result
  const [gender, setGender] = useState<Gender>('female');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (questionId: number, points: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: points }));
  };

  const calculateScore = () => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    setTotalScore(score);
    setQuizStep(2);
  };

  const resetQuiz = () => {
    setAnswers({});
    setTotalScore(0);
    setQuizStep(1);
  };

  const getRiskResult = (score: number) => {
    if (score < 7) return { level: 'Düşük Risk', risk: '%1', color: 'text-green-400', bg: 'bg-green-500/20 border-green-500' };
    if (score < 12) return { level: 'Hafif Risk', risk: '%4', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500' };
    if (score < 15) return { level: 'Orta Risk', risk: '%17', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500' };
    if (score < 21) return { level: 'Yüksek Risk', risk: '%33', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500' };
    return { level: 'Çok Yüksek Risk', risk: '%50', color: 'text-rose-500', bg: 'bg-rose-600/20 border-rose-600' };
  };

  const findriskQuestions: FindriskQuestion[] = [
    {
      id: 1,
      text: "Yaşınız?",
      options: [
        { label: "45 yaş altı", points: 0 },
        { label: "45-54 yaş", points: 2 },
        { label: "55-64 yaş", points: 3 },
        { label: "64 yaş üstü", points: 4 }
      ]
    },
    {
      id: 2,
      text: "Vücut Kitle İndeksiniz (BKİ)?",
      options: [
        { label: "25 kg/m²'den düşük (Normal)", points: 0 },
        { label: "25-30 kg/m² arası (Fazla Kilolu)", points: 1 },
        { label: "30 kg/m²'den yüksek (Obez)", points: 3 }
      ]
    },
    {
      id: 3,
      text: "Bel Çevreniz?",
      options: gender === 'male' ? [
        { label: "94 cm'den az", points: 0 },
        { label: "94 - 102 cm arası", points: 3 },
        { label: "102 cm'den fazla", points: 4 }
      ] : [
        { label: "80 cm'den az", points: 0 },
        { label: "80 - 88 cm arası", points: 3 },
        { label: "88 cm'den fazla", points: 4 }
      ]
    },
    {
      id: 4,
      text: "Günde en az 30 dk fiziksel aktivite yapıyor musunuz?",
      options: [
        { label: "Evet", points: 0 },
        { label: "Hayır", points: 2 }
      ]
    },
    {
      id: 5,
      text: "Ne sıklıkla sebze, meyve tüketiyorsunuz?",
      options: [
        { label: "Her gün", points: 0 },
        { label: "Her gün değil", points: 1 }
      ]
    },
    {
      id: 6,
      text: "Yüksek tansiyon ilacı kullanıyor musunuz?",
      options: [
        { label: "Hayır", points: 0 },
        { label: "Evet", points: 2 }
      ]
    },
    {
      id: 7,
      text: "Kan şekeriniz hiç yüksek bulundu mu?",
      options: [
        { label: "Hayır", points: 0 },
        { label: "Evet (Gebelik, hastalık vb.)", points: 5 }
      ]
    },
    {
      id: 8,
      text: "Ailenizde diyabet hastası var mı?",
      options: [
        { label: "Yok", points: 0 },
        { label: "Evet (Büyükanne, büyükbaba, teyze, dayı, kuzen)", points: 3 },
        { label: "Evet (Anne, baba, kardeş veya çocuk)", points: 5 }
      ]
    }
  ];

  const allAnswered = findriskQuestions.every(q => answers[q.id] !== undefined);

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

        {/* FINDRISK & Risk Factors */}
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

          {/* Interactive FINDRISK Component */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl relative flex flex-col h-full min-h-[550px] shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-16 -mt-16 pointer-events-none"></div>
            
            {/* Header */}
            <div className="relative z-10 mb-6 border-b border-slate-700 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="text-blue-400" /> FINDRISK
                </h3>
                <p className="text-slate-400 text-xs mt-1">10 Yıllık Tip 2 Diyabet Riski Hesaplama</p>
              </div>
              {quizStep > 0 && (
                <button 
                  onClick={() => { setQuizStep(0); setAnswers({}); }}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Çıkış
                </button>
              )}
            </div>

            {/* Step 0: Intro */}
            {quizStep === 0 && (
              <div className="relative z-10 flex flex-col h-full justify-center animate-in fade-in duration-300">
                <p className="text-slate-300 mb-6 text-center leading-relaxed text-sm">
                  FINDRISK (Finlandiya Diyabet Risk Skoru), gelecek 10 yıl içinde Tip 2 Diyabet geliştirme riskinizi belirler.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-green-500/20 flex flex-col items-center text-center transition-colors hover:bg-slate-800">
                    <span className="text-xs text-slate-400 mb-1">Düşük Risk</span>
                    <span className="text-green-400 font-bold text-sm">&lt; 7 Puan</span>
                    <span className="text-[10px] text-slate-500 mt-1">%1 Olasılık</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-yellow-500/20 flex flex-col items-center text-center transition-colors hover:bg-slate-800">
                    <span className="text-xs text-slate-400 mb-1">Hafif/Orta</span>
                    <span className="text-yellow-400 font-bold text-sm">7-14 Puan</span>
                    <span className="text-[10px] text-slate-500 mt-1">%4-%17 Olasılık</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-orange-500/20 flex flex-col items-center text-center transition-colors hover:bg-slate-800">
                    <span className="text-xs text-slate-400 mb-1">Yüksek</span>
                    <span className="text-orange-400 font-bold text-sm">15-20 Puan</span>
                    <span className="text-[10px] text-slate-500 mt-1">%33 Olasılık</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-red-500/20 flex flex-col items-center text-center transition-colors hover:bg-slate-800">
                    <span className="text-xs text-slate-400 mb-1">Çok Yüksek</span>
                    <span className="text-rose-500 font-bold text-sm">&gt; 20 Puan</span>
                    <span className="text-[10px] text-slate-500 mt-1">%50 Olasılık</span>
                  </div>
                </div>

                <button 
                  onClick={() => setQuizStep(1)}
                  className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Hesaplamaya Başla <ArrowRight size={20} />
                </button>
              </div>
            )}

            {/* Step 1: Questions */}
            {quizStep === 1 && (
              <div className="relative z-10 flex flex-col h-full animate-in slide-in-from-right-8 duration-300">
                <div className="mb-4 flex justify-center">
                  <div className="bg-slate-800 p-1 rounded-lg inline-flex">
                    <button 
                      onClick={() => { setGender('female'); setAnswers(prev => ({...prev, 3: undefined})); }}
                      className={`px-4 py-1.5 rounded text-sm transition-all ${gender === 'female' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Kadın
                    </button>
                    <button 
                      onClick={() => { setGender('male'); setAnswers(prev => ({...prev, 3: undefined})); }}
                      className={`px-4 py-1.5 rounded text-sm transition-all ${gender === 'male' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Erkek
                    </button>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6 custom-scrollbar pb-4">
                  {findriskQuestions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <p className="font-semibold text-sm text-blue-200">{q.id}. {q.text}</p>
                      <div className="grid gap-2">
                        {q.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(q.id, opt.points)}
                            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all border ${
                              answers[q.id] === opt.points 
                                ? 'bg-blue-500/20 border-blue-500 text-white' 
                                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{opt.label}</span>
                              {answers[q.id] === opt.points && <CheckCircle2 size={16} className="text-blue-400" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <button 
                    onClick={calculateScore}
                    disabled={!allAnswered}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      allAnswered 
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Calculator size={20} /> Sonucu Gör
                  </button>
                  {!allAnswered && (
                    <p className="text-center text-xs text-slate-500 mt-2">Lütfen tüm soruları yanıtlayınız.</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Result */}
            {quizStep === 2 && (
              <div className="relative z-10 flex flex-col h-full justify-center items-center text-center animate-in zoom-in duration-300">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 relative">
                  <span className={`text-4xl font-extrabold ${getRiskResult(totalScore).color}`}>{totalScore}</span>
                  <span className="absolute -bottom-2 bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">Puan</span>
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  <span className={getRiskResult(totalScore).color}>{getRiskResult(totalScore).level}</span>
                </h3>
                
                <div className={`p-4 rounded-xl border ${getRiskResult(totalScore).bg} mb-6 w-full`}>
                  <p className="text-sm font-medium text-white mb-1">10 Yıllık Diyabet Riski</p>
                  <p className={`text-2xl font-bold ${getRiskResult(totalScore).color}`}>{getRiskResult(totalScore).risk}</p>
                </div>

                <p className="text-slate-400 text-sm mb-8 px-4">
                  {totalScore >= 21 
                    ? "Risk seviyeniz çok yüksek. Diyabet hastası olma ihtimaliniz %50. Vakit kaybetmeden dahiliye/endokrinoloji uzmanına başvurunuz."
                    : totalScore >= 15 
                      ? "Yüksek risk grubundasınız. En kısa sürede AKŞ ve HbA1c testlerinizi yaptırmanız ve yaşam tarzınızı değiştirmeniz önerilir."
                      : totalScore >= 12 
                        ? "Orta düzeyde riskiniz var. Beslenme alışkanlıklarınızı gözden geçirmeli ve hareketinizi artırmalısınız."
                        : totalScore >= 7
                          ? "Risk seviyeniz hafif yüksek. Gelecekte diyabet hastası olmamak için önlem almaya şimdiden başlamalısınız."
                          : "Risk seviyeniz şu an için düşük. Sağlıklı yaşam alışkanlıklarınızı korumaya devam edin."}
                </p>

                <button 
                  onClick={resetQuiz}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
                >
                  <RefreshCw size={18} /> Tekrar Hesapla
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;
