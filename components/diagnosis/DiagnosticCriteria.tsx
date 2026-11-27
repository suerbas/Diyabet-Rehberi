import React, { useState } from 'react';
import { Stethoscope, FlaskConical, AlertTriangle, Check, RotateCcw } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from '../shared/ui';

type Verdict = { title: string; detail: string[]; tone: string };

function interpret(v: {
  apg: number | null; ogtt1: number | null; ogtt2: number | null; a1c: number | null; rpg: number | null;
  symptoms: boolean; a1cUnreliable: boolean;
}): Verdict | null {
  const { apg, ogtt1, ogtt2, rpg, symptoms, a1cUnreliable } = v;
  const a1c = a1cUnreliable ? null : v.a1c;
  const anyInput = [apg, ogtt1, ogtt2, v.a1c, rpg].some(x => x !== null);
  if (!anyInput) return null;

  const notes: string[] = [];
  if (a1cUnreliable && v.a1c !== null) notes.push('HbA1c güvenilir olmadığı için değerlendirmeye alınmadı; plazma glukozu esas alındı.');

  if (symptoms && rpg !== null && rpg >= 200) {
    return {
      title: 'Diabetes mellitus',
      detail: ['Klasik semptomlar (poliüri, polidipsi, açıklanamayan kilo kaybı) + rastgele PG ≥ 200 mg/dL tek başına tanı koydurur; doğrulama gerekmez.', ...notes],
      tone: 'border-rose-300 bg-rose-50 text-rose-900',
    };
  }

  const hits: string[] = [];
  if (apg !== null && apg >= 126) hits.push(`APG ${apg} ≥ 126`);
  if (ogtt2 !== null && ogtt2 >= 200) hits.push(`OGTT 2. saat ${ogtt2} ≥ 200`);
  if (ogtt1 !== null && ogtt1 >= 209) hits.push(`OGTT 1. saat ${ogtt1} ≥ 209`);
  if (a1c !== null && a1c >= 6.5) hits.push(`HbA1c %${String(a1c).replace('.', ',')} ≥ %6,5`);

  if (hits.length >= 2) {
    return {
      title: 'Diabetes mellitus',
      detail: [`Aynı örnekte iki farklı test tanı eşiğinde: ${hits.join(' · ')}. Tanı kesinleşir.`, ...notes],
      tone: 'border-rose-300 bg-rose-50 text-rose-900',
    };
  }
  if (hits.length === 1) {
    return {
      title: 'Diyabet ile uyumlu — doğrulama gerekli',
      detail: [`${hits[0]}. Semptom yoksa tanı, ayrı bir günde aynı testin tekrarı (veya aynı örnekte ikinci bir test) ile doğrulanmalıdır.`, ...notes],
      tone: 'border-orange-300 bg-orange-50 text-orange-900',
    };
  }

  const bag = apg !== null && apg >= 100 && apg <= 125;
  const bgt = ogtt2 !== null && ogtt2 >= 140 && ogtt2 <= 199;
  const a1cRisk = a1c !== null && a1c >= 5.7 && a1c < 6.5;
  const ara = ogtt1 !== null && ogtt1 >= 155 && ogtt1 < 209;

  const labels: string[] = [];
  if (bag && bgt) labels.push('Kombine prediyabet (BAG + BGT)');
  else if (bag) labels.push(ogtt2 === null ? 'Bozulmuş açlık glukozu (BAG)' : 'İzole BAG');
  else if (bgt) labels.push(apg === null ? 'Bozulmuş glukoz toleransı (BGT)' : 'İzole BGT');
  if (ara) labels.push('Ara hiperglisemi (1. saat ≥ 155)');
  if (a1cRisk) labels.push('Yüksek risk HbA1c (%5,7-6,4)');

  if (labels.length > 0) {
    const detail = ['Prediyabet / yüksek riskli glukoz düzeyi. Yoğun yaşam tarzı programı ve yıllık izlem; uygun hastada metformin (Prediyabet sekmesi).'];
    if (bag && ogtt2 === null) detail.push('BAG’de 75 g OGTT ile BGT ve gizli diyabet araştırılması önerilir.');
    if (rpg !== null && rpg >= 200 && !symptoms) detail.push('Semptomsuz rastgele PG ≥ 200 tek başına tanı koydurmaz ama diyabet şüphesini artırır; OGTT önerilir.');
    return { title: labels.join(' · '), detail: [...detail, ...notes], tone: 'border-amber-300 bg-amber-50 text-amber-900' };
  }

  if (rpg !== null && rpg >= 200 && !symptoms) {
    return {
      title: 'Ek değerlendirme gerekli',
      detail: ['Semptomsuz rastgele PG ≥ 200 mg/dL tek başına tanı koydurmaz, ancak diyabet açısından şüphelidir. APG, HbA1c veya 75 g OGTT ile değerlendirin.', ...notes],
      tone: 'border-orange-300 bg-orange-50 text-orange-900',
    };
  }
  return { title: 'Normal glukoz metabolizması', detail: ['Girilen değerler tanı ve prediyabet eşiklerinin altında.', ...notes], tone: 'border-emerald-300 bg-emerald-50 text-emerald-900' };
}

const Toggle: React.FC<{ on: boolean; onClick: () => void; label: string; hint: string }> = ({ on, onClick, label, hint }) => (
  <button onClick={onClick} aria-pressed={on}
    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${on ? 'border-primary bg-sky-50' : 'border-slate-200 hover:bg-slate-50'}`}>
    <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>{on && <Check size={14} />}</span>
    <span><span className="block text-sm font-semibold text-slate-800">{label}</span><span className="block text-xs text-slate-500">{hint}</span></span>
  </button>
);

const Interpreter: React.FC = () => {
  const [apg, setApg] = useState('');
  const [o1, setO1] = useState('');
  const [o2, setO2] = useState('');
  const [a1c, setA1c] = useState('');
  const [rpg, setRpg] = useState('');
  const [symptoms, setSymptoms] = useState(false);
  const [unreliable, setUnreliable] = useState(false);

  const verdict = interpret({
    apg: parseNum(apg), ogtt1: parseNum(o1), ogtt2: parseNum(o2), a1c: parseNum(a1c), rpg: parseNum(rpg),
    symptoms, a1cUnreliable: unreliable,
  });
  const reset = () => { setApg(''); setO1(''); setO2(''); setA1c(''); setRpg(''); setSymptoms(false); setUnreliable(false); };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Stethoscope size={20} className="text-primary" /> Tanı yorumlayıcı</h4>
          <p className="text-sm text-slate-500 mt-1">Elinizdeki sonuçları girin; boş bırakılan testler değerlendirilmez.</p>
        </div>
        <button onClick={reset} className="text-xs text-slate-500 flex items-center gap-1 shrink-0"><RotateCcw size={14} /> Temizle</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <NumField label="APG" value={apg} onChange={setApg} placeholder="örn. 112" suffix="mg/dL" />
        <NumField label="OGTT 1. saat" value={o1} onChange={setO1} placeholder="örn. 190" suffix="mg/dL" />
        <NumField label="OGTT 2. saat" value={o2} onChange={setO2} placeholder="örn. 150" suffix="mg/dL" />
        <NumField label="HbA1c" value={a1c} onChange={setA1c} placeholder="örn. 6,1" suffix="%" />
        <NumField label="Rastgele PG" value={rpg} onChange={setRpg} placeholder="örn. 230" suffix="mg/dL" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <Toggle on={symptoms} onClick={() => setSymptoms(s => !s)} label="Klasik hiperglisemi semptomları var" hint="Poliüri, polidipsi, açıklanamayan kilo kaybı" />
        <Toggle on={unreliable} onClick={() => setUnreliable(s => !s)} label="HbA1c güvenilir değil" hint="Hemoglobinopati, hemoliz, gebelik, diyaliz, transfüzyon, EPO/demir" />
      </div>
      <div className="mt-5" aria-live="polite">
        {verdict ? (
          <div className={`border rounded-xl p-4 ${verdict.tone}`}>
            <div className="font-bold text-lg">{verdict.title}</div>
            <ul className="mt-1 space-y-1 text-sm">{verdict.detail.map(d => <li key={d}>{d}</li>)}</ul>
          </div>
        ) : (
          <p className="text-sm text-slate-500">En az bir değer girin.</p>
        )}
      </div>
    </div>
  );
};

const DiagnosticCriteria: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle sub="TEMD 2026: 75 g OGTT 1. saat plazma glukozu tanı ölçütlerine eklendi (IDF 2024).">Tanı ölçütleri</SectionTitle>
      <DataTable
        head={['Ölçüm', 'Diyabet', 'İzole BAG', 'İzole BGT', 'Yüksek risk']}
        rows={[
          ['APG (≥ 8 saat açlık)', '≥ 126 mg/dL', '100-125 mg/dL', '< 100 mg/dL', '—'],
          ['75 g OGTT 2. saat', '≥ 200 mg/dL', '< 140 mg/dL', '140-199 mg/dL', '—'],
          [<span key="o1">75 g OGTT 1. saat <span className="ml-1 text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Yeni</span></span>, '≥ 209 mg/dL', '—', '—', '≥ 155 mg/dL (ara hiperglisemi)'],
          ['Rastgele PG + semptom', '≥ 200 mg/dL', '—', '—', '—'],
          ['HbA1c (standardize)', '≥ %6,5 (48 mmol/mol)', '—', '—', '%5,7-6,4 (39-47 mmol/mol)'],
        ]}
      />
      <p className="text-xs text-slate-500 mt-2">Semptom yoksa tanı, ayrı bir günde tekrar testle veya aynı örnekte iki farklı testin eşik üstünde olmasıyla doğrulanır.</p>
    </div>

    <Interpreter />

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="HbA1c yerine plazma glukozu gereken durumlar" tone="amber">
        <p className="flex gap-2 mb-2"><AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" /><span>Bu durumlarda HbA1c yanlış düşük veya yüksek çıkabilir:</span></p>
        <Bullets items={[
          'Hemoglobinopatiler: orak hücre, talasemi varyantları',
          'Eritrosit yıkımı: hemolitik anemi, G6PD eksikliği, hipersplenizm',
          'Gebelik (2. ve 3. trimester) ve postpartum dönem',
          'Hemodiyaliz, yakın zamanda transfüzyon, EPO veya demir tedavisi',
        ]} />
      </Card>
      <Card title="Standart 75 g OGTT protokolü" tone="sky">
        <p className="flex gap-2 mb-2"><FlaskConical size={16} className="shrink-0 mt-0.5 text-sky-700" /><span>Doğru sonuç için hazırlık:</span></p>
        <Bullets items={[
          'Test öncesi en az 3 gün ≥ 150 g/gün karbonhidrat',
          '8-12 saat açlık sonrası sabah 08:00-09:00 arası',
          '75 g anhidröz glukoz 250-300 mL suda 5 dakikada içilir',
          'Açlık, 1. ve 2. saatte örnek; NaF-oksalat tüpte plazma hemen ayrılır',
        ]} />
      </Card>
    </div>
  </div>
);

export default DiagnosticCriteria;
