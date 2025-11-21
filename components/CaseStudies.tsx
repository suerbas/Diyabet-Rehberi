import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const cases: CaseStudy[] = [
  {
    id: 1,
    title: "Vaka 1: Yeni Tanı & Yüksek HbA1c",
    description: "52 yaşında erkek hasta, sedanter yaşam tarzı var. Rutin kontrolde AKŞ: 145 mg/dL, HbA1c: %7.8 saptanıyor. Başka ek hastalığı yok.",
    question: "Bu aşamada ilk tedavi yaklaşımı ne olmalıdır?",
    options: [
      "Sadece yaşam tarzı değişikliği ile 3 ay izlem",
      "Metformin + Yaşam Tarzı Değişikliği",
      "İnsülin tedavisi başlanması",
      "Sülfonilüre (Gliklazid) başlanması"
    ],
    correctAnswer: 1,
    explanation: "Tanı anında HbA1c hedeften yüksekse (>%7) beklemeden Metformin ve yaşam tarzı değişikliği birlikte başlanmalıdır. Sadece yaşam tarzı değişikliği genellikle yetersiz kalır."
  },
  {
    id: 2,
    title: "Vaka 2: Kardiyovasküler Risk",
    description: "60 yaşında kadın hasta, Tip 2 DM tanısı mevcut. 3 ay önce MI (kalp krizi) geçirmiş. Metformin alıyor, HbA1c: %7.5.",
    question: "Tedaviye eklenmesi gereken öncelikli ajan hangisidir?",
    options: [
      "Sülfonilüre (Glimepirid)",
      "DPP-4 İnhibitörü (Sitagliptin)",
      "SGLT-2 İnhibitörü veya GLP-1 Agonisti",
      "Bazal İnsülin"
    ],
    correctAnswer: 2,
    explanation: "Aterosklerotik Kardiyovasküler Hastalığı (ASCVD) olan hastalarda, HbA1c hedefinden bağımsız olarak kardiyoprotektif etkisi kanıtlanmış SGLT-2 inhibitörü veya GLP-1 agonisti başlanmalıdır."
  },
  {
    id: 3,
    title: "Vaka 3: Yaşlı & Kırılgan Hasta",
    description: "78 yaşında hasta, yalnız yaşıyor, hafif demansı var. HbA1c: %7.2. Gliklazid 60mg kullanıyor. Ara sıra baş dönmesi ve terleme atakları tarifliyor.",
    question: "Bu hastada tedavi yönetimi nasıl değiştirilmelidir?",
    options: [
      "Doz artırılmalı, hedef HbA1c <%6.5 olmalı",
      "Tedaviye dokunulmamalı",
      "Gliklazid kesilmeli, hipoglisemi riski düşük bir ajan (örn. DPP-4) geçilmeli",
      "İnsülin tedavisine geçilmeli"
    ],
    correctAnswer: 2,
    explanation: "Yaşlı ve kırılgan hastalarda en büyük risk hipoglisemidir. Sülfonilüreler (Gliklazid vb.) hipoglisemi riski taşır. Bu hastada ilaç değiştirilmeli ve HbA1c hedefi daha esnek (%7.5-8.0) tutulmalıdır."
  },
  {
    id: 4,
    title: "Vaka 4: Gebelik ve Diyabet Taraması",
    description: "26 yaşında, 26 haftalık gebe. Risk faktörü yok. Gebelik öncesi diyabeti yoktu.",
    question: "Bu gebede diyabet taraması nasıl yapılmalıdır?",
    options: [
      "Açlık kan şekerine bakmak yeterlidir",
      "HbA1c bakılmalıdır",
      "24-28. haftalar arasında OGTT (Şeker Yükleme) yapılmalıdır",
      "Tarama yapmaya gerek yoktur"
    ],
    correctAnswer: 2,
    explanation: "Tüm gebelere 24-28. haftalar arasında gestasyonel diyabet taraması için OGTT (75g tek aşamalı veya 50g+100g iki aşamalı) önerilmektedir."
  },
  {
    id: 5,
    title: "Vaka 5: Diyabetik Ayak Riski",
    description: "15 yıldır diyabeti olan hasta. Ayaklarında gece artan yanma ve karıncalanma tarifliyor. Muayenede nasırları var.",
    question: "Poliklinikte uygulanması gereken en basit ve etkili tarama testi nedir?",
    options: [
      "Ayak MR görüntüleme",
      "EMG",
      "10g Monofilament Testi",
      "Ayak bileği grafisi"
    ],
    correctAnswer: 2,
    explanation: "10g Monofilament testi, diyabetik hastalarda koruyucu duyu kaybını (nöropatiyi) tespit etmek için kullanılan en pratik ve standart tarama yöntemidir."
  },
  {
    id: 6,
    title: "Vaka 6: Nefropati Taraması",
    description: "Tip 2 DM hastası yıllık kontrollerine geliyor. Kreatinin normal (0.9 mg/dL).",
    question: "Erken evre böbrek hasarını (nefropati) saptamak için hangi test istenmelidir?",
    options: [
      "24 saatlik idrarda protein",
      "Spot idrarda Albümin/Kreatinin Oranı",
      "Böbrek Ultrasonu",
      "Sadece serum kreatinin takibi yeterlidir"
    ],
    correctAnswer: 1,
    explanation: "Spot idrarda Albümin/Kreatinin oranı, diyabetik nefropatinin en erken bulgusu olan mikroalbüminüriyi saptamak için altın standart tarama testidir."
  },
  {
    id: 7,
    title: "Vaka 7: Obezite ve Diyabet",
    description: "BKİ: 36 kg/m² (Obez) olan Tip 2 DM hastası. Metformin kullanıyor ancak HbA1c %8. Kilo vermek istiyor.",
    question: "Hem kan şekerini düzenlemek hem de kilo kaybı sağlamak için en uygun ek tedavi nedir?",
    options: [
      "İnsülin",
      "Sülfonilüre",
      "GLP-1 Reseptör Agonisti",
      "Pioglitazon"
    ],
    correctAnswer: 2,
    explanation: "GLP-1 Reseptör Agonistleri (Semaglutid, Liraglutid vb.) güçlü iştah baskılayıcı etkileriyle hem belirgin kilo kaybı sağlar hem de glisemik kontrolü iyileştirir."
  },
  {
    id: 8,
    title: "Vaka 8: Nöropatik Ağrı",
    description: "Diyabetik nöropatisi olan hasta, ayaklarındaki yanıcı ağrıdan uyuyamadığını söylüyor.",
    question: "Ağrı yönetimi için ilk basamakta hangi ilaç grubu tercih edilebilir?",
    options: [
      "Parasetamol",
      "NSAİİ (İbuprofen, Diklofenak)",
      "Pregabalin veya Duloksetin",
      "Kortikosteroid"
    ],
    correctAnswer: 2,
    explanation: "Diyabetik nöropatik ağrının tedavisinde Pregabalin (antikonvülzan) veya Duloksetin (SNRI) gibi ajanlar ilk basamakta tercih edilir. Klasik ağrı kesiciler genellikle etkisizdir."
  },
  {
    id: 9,
    title: "Vaka 9: Egzersiz Önerisi",
    description: "Sedanter yaşayan Tip 2 DM hastası egzersize başlamak istiyor.",
    question: "En uygun egzersiz reçetesi hangisidir?",
    options: [
      "Sadece hafta sonları yoğun koşu",
      "Haftada en az 150 dk orta şiddetli aerobik + 2 gün direnç egzersizi",
      "Günde 100 mekik",
      "Sadece yürüyüş yeterlidir, başka egzersize gerek yok"
    ],
    correctAnswer: 1,
    explanation: "Kılavuzlar, haftada en az 150 dakika orta şiddetli aerobik egzersiz (yürüyüş, yüzme vb.) ve buna ek olarak haftada 2-3 gün kas güçlendirici direnç egzersizleri önermektedir."
  },
  {
    id: 10,
    title: "Vaka 10: Lipid Yönetimi",
    description: "55 yaşında diyabetik erkek hasta. Sigara içiyor. LDL Kolesterolü 130 mg/dL.",
    question: "Bu hastada birincil koruma amaçlı yaklaşım ne olmalıdır?",
    options: [
      "Sadece diyet ile takip",
      "Orta/Yüksek doz Statin tedavisi başlanmalı",
      "Aspirin başlanmalı",
      "Balık yağı takviyesi"
    ],
    correctAnswer: 1,
    explanation: "40-75 yaş arası diyabetik hastalarda LDL > 70 mg/dL ise veya ek risk faktörleri (sigara, yaş) varsa kardiyovasküler koruma için Statin tedavisi başlanmalıdır."
  }
];

const CaseStudies: React.FC = () => {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const nextCase = () => {
    if (currentCase < cases.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentCase(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const activeCase = cases[currentCase];

  return (
    <section id="cases" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Vaka Testleri</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Öğrendiklerinizi pekiştirmek için klinik senaryolarla kendinizi test edin.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2">
              <div 
                className="bg-indigo-500 h-2 transition-all duration-300"
                style={{ width: `${((currentCase + 1) / cases.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
                  Soru {currentCase + 1} / {cases.length}
                </span>
                <span className="text-slate-400 text-sm font-medium">{activeCase.title}</span>
              </div>

              <div className="mb-8">
                <p className="text-slate-700 text-lg font-medium leading-relaxed mb-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  {activeCase.description}
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeCase.question}
                </h3>
              </div>

              <div className="space-y-3">
                {activeCase.options.map((option, idx) => {
                  let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ";
                  
                  if (showResult) {
                    if (idx === activeCase.correctAnswer) {
                      optionClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (idx === selectedOption) {
                      optionClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      optionClass += "border-slate-100 text-slate-400 opacity-50";
                    }
                  } else {
                    optionClass += "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={showResult}
                      className={optionClass}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 
                        ${showResult && idx === activeCase.correctAnswer ? 'border-green-600 bg-green-600 text-white' : 
                          showResult && idx === selectedOption ? 'border-red-500 text-red-500' : 'border-slate-300'}`}>
                        {showResult && idx === activeCase.correctAnswer && <CheckCircle size={14} />}
                        {showResult && idx === selectedOption && idx !== activeCase.correctAnswer && <XCircle size={14} />}
                      </div>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {showResult && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`p-5 rounded-xl mb-6 ${selectedOption === activeCase.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-50 text-red-900'}`}>
                    <div className="font-bold mb-2 flex items-center gap-2 text-lg">
                      {selectedOption === activeCase.correctAnswer ? (
                        <><CheckCircle className="text-green-600" /> Doğru Cevap!</>
                      ) : (
                        <><XCircle className="text-red-600" /> Yanlış Cevap</>
                      )}
                    </div>
                    
                    <div className="font-semibold mt-3 mb-1 opacity-80">Açıklama:</div>
                    <p className="text-sm leading-relaxed">
                      {activeCase.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    {currentCase < cases.length - 1 ? (
                      <button 
                        onClick={nextCase}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200"
                      >
                        Sonraki Soru <ArrowRight size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={resetQuiz}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
                      >
                        Testi Başa Sar <RefreshCw size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;