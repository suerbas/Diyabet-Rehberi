import React, { useState } from 'react';
import { Pill, ShieldCheck, Syringe, Zap, AlertCircle, Weight, Flame, ChevronDown, ChevronUp, Check, Ban, Sparkles } from 'lucide-react';

type Effect = 'iyi' | 'notr' | 'kotu';

interface DrugClass {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  mechanism: string;
  hba1c: string;
  hypo: { text: string; effect: Effect };
  weight: { text: string; effect: Effect };
  renal: string;
  agents: { name: string; brands: string; dose: string }[];
  pros: string[];
  cautions: { term: string; explanation: string }[];
  contraindications: string[];
  note2026?: string;
}

const drugData: DrugClass[] = [
  {
    title: 'Metformin (Biguanid)',
    icon: <Pill size={22} />,
    iconBg: 'bg-blue-100 text-blue-700',
    mechanism: 'Hepatik glukoneogenezi baskılar, insülin direncini azaltır.',
    hba1c: '%1,0-1,5',
    hypo: { text: 'Yok (monoterapide)', effect: 'iyi' },
    weight: { text: 'Nötr / hafif kayıp', effect: 'iyi' },
    renal: 'eGFR ≥ 45 tam doz (45-59 dikkat) · 30-44 yeni başlanmaz, kullanıyorsa doz %50 azaltılır · < 30 kontrendike',
    agents: [
      { name: 'Metformin HCl', brands: 'Glucophage, Glifor, Matofin, Diaformin', dose: 'Günde 1 kez 500 mg ile başla, tedricen artır; 500-2500 mg/gün, 2-3 doza bölünmüş' },
      { name: 'Metformin uzun salınımlı', brands: 'Glifor SR, Matofin XR, Diaformin XR', dose: '500-2000 mg/gün, günde 1-2 kez, tercihen akşam' },
    ],
    pros: ['Hipoglisemi yapmaz', 'Uzun dönem güvenlik verisi', 'Ekonomik'],
    cautions: [
      { term: 'GİS yan etkileri', explanation: 'Yavaş titrasyon ve tok karnına alım ile azalır; XR formu daha iyi tolere edilir.' },
      { term: 'B12 eksikliği', explanation: 'Uzun süreli kullanımda yıllık B12 bakılır; nöropati ve anemiyi taklit edebilir.' },
      { term: 'Geçici kesme', explanation: 'İyotlu kontrast (eGFR < 60), ağır hipoksi, sepsis, dehidratasyon ve majör cerrahi öncesi.' },
    ],
    contraindications: ['eGFR < 30', 'Ağır karaciğer / solunum yetmezliği', 'Alkolizm'],
  },
  {
    title: 'SGLT2 İnhibitörleri',
    icon: <ShieldCheck size={22} />,
    iconBg: 'bg-emerald-100 text-emerald-700',
    mechanism: 'Proksimal tübülde glukoz geri emilimini bloke eder; natriürez ve tübüloglomerüler geri bildirim ile kardiyorenal koruma.',
    hba1c: '%0,7-1,2',
    hypo: { text: 'Düşük (SU/insülinsiz)', effect: 'iyi' },
    weight: { text: '~2-3 kg kayıp', effect: 'iyi' },
    renal: 'Organ koruma için başlama sınırı: empagliflozin eGFR ≥ 20, dapagliflozin ≥ 25 · eGFR < 45’te glisemik etki azalır',
    agents: [
      { name: 'Dapagliflozin', brands: 'Forziga, Daplig, Jaglif', dose: '5-10 mg günde 1 kez, yemekten bağımsız' },
      { name: 'Empagliflozin', brands: 'Jardiance, Gliflomed', dose: '10 mg (25 mg’a çıkılabilir) günde 1 kez' },
    ],
    pros: ['KY ve KBH’de organ koruma (HbA1c’den bağımsız)', 'Kan basıncını düşürür', 'Kilo kaybı'],
    cautions: [
      { term: 'Öglisemik DKA', explanation: 'Glukoz < 250 mg/dL iken ketoasidoz. Kusma/karın ağrısında kan ketonu bakılır.' },
      { term: 'Hasta günü kuralı', explanation: 'Akut hastalık, açlık, kusma ve elektif cerrahi öncesi 3 gün (ertugliflozin 4 gün) kesilir.' },
      { term: 'Genital mikoz', explanation: 'Glikozüriye bağlı; hijyen eğitimi ile önlenir.' },
      { term: 'Başlangıç eGFR düşüşü', explanation: 'İlk 2-4 haftada %10-20 düşüş fizyolojiktir, kesme nedeni değildir.' },
      { term: 'Fournier gangreni', explanation: 'Perineal ağrı, eritem ve ateşte acil değerlendirme.' },
    ],
    contraindications: ['Tekrarlayan öglisemik DKA öyküsü', 'Tip 1 DM (ruhsat dışı)'],
    note2026: 'Ameliyat öncesi kesme süresi: 3 gün (ertugliflozin 4 gün).',
  },
  {
    title: 'GLP-1 Reseptör Agonistleri',
    icon: <Syringe size={22} />,
    iconBg: 'bg-violet-100 text-violet-700',
    mechanism: 'Glukoza bağımlı insülin salgısını artırır, glukagonu baskılar, mide boşalmasını yavaşlatır, tokluk sağlar.',
    hba1c: '%1,0-1,8',
    hypo: { text: 'Düşük (SU/insülinsiz)', effect: 'iyi' },
    weight: { text: '%5-15 kayıp', effect: 'iyi' },
    renal: 'eGFR ≥ 15’te doz ayarı gerekmez · < 15’te mümkünse kullanılmaz',
    agents: [
      { name: 'Semaglutid SC', brands: 'Ozempic', dose: 'Haftada 1: 0,25 mg ile başla → idame 0,5-1 mg' },
      { name: 'Semaglutid oral', brands: 'Rybelsus', dose: 'Sabah aç karnına az su ile: 3 mg, 1 ay sonra 7 mg, gerekirse 14 mg' },
      { name: 'Dulaglutid', brands: 'Trulicity', dose: 'Haftada 1: 0,75 → 1,5 mg' },
      { name: 'Liraglutid', brands: 'Victoza', dose: 'Günde 1: 0,6 mg ile başla → idame 1,2-1,8 mg' },
    ],
    pros: ['ASKVH’de MACE azalması', 'Güçlü HbA1c ve kilo etkisi', 'KBH progresyonunda azalma (semaglutid)'],
    cautions: [
      { term: 'GİS yan etkileri', explanation: 'Bulantı/kusma; yavaş titrasyonla azalır. Dehidratasyon akut böbrek hasarı yapabilir.' },
      { term: 'Retinopati', explanation: 'Hızlı HbA1c düşüşünde mevcut retinopati geçici kötüleşebilir; başlamadan önce güncel göz dibi.' },
      { term: 'Perioperatif', explanation: 'Haftalık ajanlarda aspirasyon riski açısından ameliyattan 1 hafta önce değerlendir.' },
      { term: 'Pankreatit / safra taşı', explanation: 'Şiddetli kalıcı karın ağrısında ilaç kesilir.' },
    ],
    contraindications: ['Kişisel/ailevi medüller tiroid karsinomu', 'MEN-2', 'Pankreatit öyküsü (dikkat)'],
    note2026: 'NAION uyarısı: ani, ağrısız, tek taraflı görme kaybında acil göz muayenesi.',
  },
  {
    title: 'Tirzepatid (Dual GIP/GLP-1 Agonisti)',
    icon: <Sparkles size={22} />,
    iconBg: 'bg-fuchsia-100 text-fuchsia-700',
    mechanism: 'GIP ve GLP-1 reseptörlerinde çift inkretin agonizması.',
    hba1c: '%1,8-2,4',
    hypo: { text: 'Düşük (SU/insülinsiz)', effect: 'iyi' },
    weight: { text: '%15-20+ kayıp', effect: 'iyi' },
    renal: 'eGFR ≥ 15’te doz ayarı gerekmez · < 15’te mümkünse kullanılmaz; dehidratasyondan kaçın',
    agents: [
      { name: 'Tirzepatid', brands: 'Mounjaro', dose: 'Haftada 1: 2,5 mg × 4 hafta → idame 5 mg; 4 haftada bir 2,5 mg artırılabilir (maks. 15 mg)' },
    ],
    pros: ['En güçlü HbA1c ve kilo etkisi', 'MASH ve kardiyometabolik yarar', 'Remisyon potansiyeli'],
    cautions: [
      { term: 'GİS yan etkileri', explanation: 'Yavaş titrasyon gerekir.' },
      { term: 'Oral kontraseptif', explanation: 'Emilimi azalabilir; başlangıç ve doz artışında 4 hafta ek bariyer yöntemi.' },
    ],
    contraindications: ['Kişisel/ailevi medüller tiroid karsinomu', 'MEN-2'],
  },
  {
    title: 'DPP-4 İnhibitörleri',
    icon: <Zap size={22} />,
    iconBg: 'bg-orange-100 text-orange-700',
    mechanism: 'Endojen inkretinlerin yıkımını engeller.',
    hba1c: '%0,5-0,8',
    hypo: { text: 'Yok (monoterapide)', effect: 'iyi' },
    weight: { text: 'Nötr', effect: 'notr' },
    renal: 'Linagliptin doz ayarsız; sitagliptin, vildagliptin ve saksagliptin eGFR’ye göre azaltılır',
    agents: [
      { name: 'Sitagliptin', brands: 'Januvia, Xelevia', dose: '100 mg günde 1 kez (eGFR 30-44: 50 mg; < 30: 25 mg)' },
      { name: 'Vildagliptin', brands: 'Galvus, Vildabet', dose: '50 mg günde 1-2 kez (eGFR < 50: 1x50 mg)' },
      { name: 'Linagliptin', brands: 'Trajenta', dose: '5 mg günde 1 kez (tüm eGFR’lerde)' },
    ],
    pros: ['Çok iyi tolere edilir', 'Yaşlıda tedavi basitleştirmede tercih', 'Tek doz, oral'],
    cautions: [
      { term: 'Sınırlı etki', explanation: 'HbA1c düşüşü diğer sınıflardan azdır.' },
      { term: 'Saksagliptin', explanation: 'KY hastaneye yatış riski; kalp yetersizliğinde kullanılmaz.' },
      { term: 'GLP-1 RA ile birlikte', explanation: 'Aynı yolak; ek yarar sağlamaz, birlikte kullanılmaz.' },
    ],
    contraindications: ['Pankreatit öyküsü (dikkat)'],
  },
  {
    title: 'Sülfonilüreler',
    icon: <AlertCircle size={22} />,
    iconBg: 'bg-slate-200 text-slate-700',
    mechanism: 'Beta hücresinde K-ATP kanalını bloke ederek glukozdan bağımsız insülin salgılatır.',
    hba1c: '%1,0-2,0',
    hypo: { text: 'Yüksek', effect: 'kotu' },
    weight: { text: 'Artış', effect: 'kotu' },
    renal: 'eGFR 30-60’ta gliklazid dozu %50 azaltılır · < 30’da kullanılmaz',
    agents: [
      { name: 'Gliklazid MR', brands: 'Diamicron MR, Betanorm MR', dose: '30-120 mg günde 1 kez, kahvaltıda' },
      { name: 'Glimepirid', brands: 'Amaryl, Glimax', dose: '1 mg ile başla; 1-8 mg günde 1 kez, kahvaltıda' },
    ],
    pros: ['Hızlı ve güçlü etki', 'Düşük maliyet'],
    cautions: [
      { term: 'Hipoglisemi', explanation: 'Yaşlıda sessiz hipoglisemi aritmi ve düşme yapar; yaşlıda kaçınılır.' },
      { term: 'Ramazan', explanation: 'Oruçta doz azaltılır; hipoglisemi eğitimi şart.' },
    ],
    contraindications: ['Kırılgan yaşlı / tekrarlayan hipoglisemi', 'Gebelik', 'LADA (erken insülin ihtiyacı)'],
  },
  {
    title: 'Pioglitazon (TZD)',
    icon: <Weight size={22} />,
    iconBg: 'bg-amber-100 text-amber-700',
    mechanism: 'PPAR-γ aktivasyonu ile kas ve yağ dokusunda insülin duyarlılığını artırır.',
    hba1c: '%0,5-1,4',
    hypo: { text: 'Yok', effect: 'iyi' },
    weight: { text: 'Artış + ödem', effect: 'kotu' },
    renal: 'Genellikle doz ayarı gerekmez; eGFR < 30’da sıvı retansiyonu nedeniyle dikkatle, gerekirse düşük doz',
    agents: [{ name: 'Pioglitazon', brands: 'Actos, Dropia, Pioforce', dose: '15-45 mg günde 1 kez, yemekten bağımsız' }],
    pros: ['MASH’ta etkili', 'Güçlü insülin duyarlılaştırıcı', 'Ucuz, hipoglisemisiz'],
    cautions: [
      { term: 'Ödem ve KY', explanation: 'Sıvı retansiyonu kalp yetersizliğini ağırlaştırır.' },
      { term: 'Kırık riski', explanation: 'Özellikle postmenopozal kadınlarda; osteoporozda kaçınılır.' },
    ],
    contraindications: ['Kalp yetersizliği', 'Aktif karaciğer hastalığı (ALT > 2,5x)', 'Mesane kanseri öyküsü'],
  },
];

const effectColor: Record<Effect, string> = {
  iyi: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  notr: 'text-slate-700 bg-slate-50 border-slate-200',
  kotu: 'text-rose-700 bg-rose-50 border-rose-200',
};

const DrugCard: React.FC<{ d: DrugClass }> = ({ d }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl bg-white transition-shadow ${open ? 'shadow-md border-slate-300' : 'shadow-sm border-slate-200'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full p-5 text-left" aria-expanded={open}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg shrink-0 ${d.iconBg}`}>{d.icon}</div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 flex flex-wrap items-center gap-2">
                {d.title}
                {d.note2026 && <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">2026 notu</span>}
              </h4>
              <p className="text-sm text-slate-500 mt-0.5">{d.mechanism}</p>
            </div>
          </div>
          {open ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-md border border-sky-200 bg-sky-50 text-sky-800"><strong>HbA1c ↓</strong> {d.hba1c}</span>
          <span className={`px-2 py-1 rounded-md border ${effectColor[d.hypo.effect]}`}><strong>Hipoglisemi:</strong> {d.hypo.text}</span>
          <span className={`px-2 py-1 rounded-md border ${effectColor[d.weight.effect]}`}><strong>Kilo:</strong> {d.weight.text}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-5 space-y-5">
          {d.note2026 && (
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
              <Flame size={18} className="shrink-0 mt-0.5" />
              <span><strong>TEMD 2026:</strong> {d.note2026}</span>
            </div>
          )}

          <div>
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Etken madde · doz (TR)</h5>
            <div className="grid gap-2">
              {d.agents.map(a => (
                <div key={a.name} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm flex flex-col md:flex-row md:justify-between gap-1">
                  <span><strong className="text-slate-900">{a.name}</strong> <span className="text-slate-500 text-xs">({a.brands})</span></span>
                  <span className="text-sky-800 text-xs md:text-right md:max-w-[55%]">{a.dose}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm bg-slate-50 border border-slate-100 rounded-lg p-3">
            <strong className="text-slate-800">Böbrek:</strong> <span className="text-slate-700">{d.renal}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-emerald-50/60 p-4 rounded-lg border border-emerald-100">
              <h5 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2"><Check size={16} /> Avantajlar</h5>
              <ul className="text-sm text-slate-700 space-y-1.5">
                {d.pros.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
            <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-100">
              <h5 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2"><AlertCircle size={16} /> Dikkat</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {d.cautions.map(c => (
                  <li key={c.term}><strong>{c.term}:</strong> {c.explanation}</li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50/60 p-4 rounded-lg border border-rose-100">
              <h5 className="text-sm font-bold text-rose-800 mb-2 flex items-center gap-2"><Ban size={16} /> Kontrendikasyon</h5>
              <ul className="text-sm text-slate-700 space-y-1.5">
                {d.contraindications.map(c => <li key={c}>• {c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DrugClasses: React.FC = () => (
  <div className="max-w-4xl mx-auto">
    <p className="text-sm text-slate-600 mb-6">
      Kartın üst kısmında HbA1c, hipoglisemi ve kilo etkisi özetlenir; doz, böbrek sınırı ve kontrendikasyonlar için karta tıklayın.
    </p>
    <div className="space-y-4">
      {drugData.map(d => <DrugCard key={d.title} d={d} />)}
    </div>
  </div>
);

export default DrugClasses;
