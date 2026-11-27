import React, { useState } from 'react';
import { Baby, FlaskConical, Pill, RotateCcw, CalendarCheck } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from './ui';

type Verdict = { title: string; detail: string; tone: string };
const tones = {
  red: 'border-rose-300 bg-rose-50 text-rose-900',
  amber: 'border-amber-300 bg-amber-50 text-amber-900',
  green: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  sky: 'border-sky-300 bg-sky-50 text-sky-900',
};

function oneStep(apg: number | null, h1: number | null, h2: number | null): Verdict | null {
  if (apg === null && h1 === null && h2 === null) return null;
  if ((apg !== null && apg >= 126) || (h2 !== null && h2 >= 200)) {
    return { title: 'Aşikâr diyabet şüphesi', detail: 'APG ≥ 126 veya 2. saat ≥ 200 mg/dL gebelikte aşikâr (pregestasyonel) diyabeti düşündürür. İnsülin ve perinatoloji/endokrinoloji ile ortak izlem planlanır.', tone: tones.red };
  }
  const hits: string[] = [];
  if (apg !== null && apg >= 92) hits.push(`açlık ${apg} ≥ 92`);
  if (h1 !== null && h1 >= 180) hits.push(`1. saat ${h1} ≥ 180`);
  if (h2 !== null && h2 >= 153) hits.push(`2. saat ${h2} ≥ 153`);
  if (hits.length > 0) {
    return { title: 'Gestasyonel diyabet (IADPSG)', detail: `${hits.join(' · ')}. Tek değerin eşik üstünde olması tanı koydurur. Tıbbi beslenme tedavisi + aktivite; 1-2 haftada hedefe ulaşılamazsa insülin.`, tone: tones.amber };
  }
  const missing = [apg, h1, h2].some(x => x === null);
  return {
    title: missing ? 'Girilen değerler eşik altında' : 'GDM yok',
    detail: missing ? 'Tanı için açlık, 1. ve 2. saat değerlerinin üçü de gereklidir.' : 'Tüm değerler IADPSG eşiklerinin altında.',
    tone: missing ? tones.sky : tones.green,
  };
}

function twoStep(g50: number | null, f: number | null, h1: number | null, h2: number | null, h3: number | null): Verdict | null {
  if (g50 === null) return null;
  if (g50 < 140) return { title: '50 g tarama negatif', detail: '1. saat < 140 mg/dL: GDM taraması negatif (daha duyarlı eşik olarak 130 kullanılabilir).', tone: tones.green };
  const vals = [f, h1, h2, h3];
  if (vals.every(v => v === null)) return { title: '50 g tarama pozitif', detail: '1. saat ≥ 140 mg/dL: 100 g OGTT yapılmalı. Değerleri aşağıya girin.', tone: tones.sky };
  const hits: string[] = [];
  if (f !== null && f >= 95) hits.push(`açlık ${f} ≥ 95`);
  if (h1 !== null && h1 >= 180) hits.push(`1. saat ${h1} ≥ 180`);
  if (h2 !== null && h2 >= 155) hits.push(`2. saat ${h2} ≥ 155`);
  if (h3 !== null && h3 >= 140) hits.push(`3. saat ${h3} ≥ 140`);
  if (hits.length >= 2) return { title: 'Gestasyonel diyabet (Carpenter-Coustan)', detail: `${hits.join(' · ')}. En az iki değer eşik üstünde.`, tone: tones.amber };
  if (hits.length === 1) return { title: 'Tek değer yüksek — GDM tanısı konmaz', detail: `${hits[0]}. Tanı için ≥ 2 değer gerekir; beslenme önerileri verilip glukoz izlemi düşünülebilir.`, tone: tones.sky };
  return { title: 'GDM yok', detail: '100 g OGTT değerlerinin hiçbiri eşik üstünde değil.', tone: tones.green };
}

const GdmInterpreter: React.FC = () => {
  const [mode, setMode] = useState<'one' | 'two'>('one');
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState('');
  const [g50, setG50] = useState(''); const [f, setF] = useState(''); const [x1, setX1] = useState(''); const [x2, setX2] = useState(''); const [x3, setX3] = useState('');
  const reset = () => { [setA, setB, setC, setG50, setF, setX1, setX2, setX3].forEach(s => s('')); };
  const v = mode === 'one'
    ? oneStep(parseNum(a), parseNum(b), parseNum(c))
    : twoStep(parseNum(g50), parseNum(f), parseNum(x1), parseNum(x2), parseNum(x3));
  const g50n = parseNum(g50);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><FlaskConical size={20} className="text-primary" /> GDM OGTT yorumlayıcı</h4>
          <p className="text-sm text-slate-500 mt-1">24-28. gebelik haftası taraması.</p>
        </div>
        <button onClick={reset} className="text-xs text-slate-500 flex items-center gap-1 shrink-0"><RotateCcw size={14} /> Temizle</button>
      </div>
      <div className="inline-flex bg-slate-100 rounded-lg p-1 mb-4" role="group">
        <button onClick={() => setMode('one')} aria-pressed={mode === 'one'} className={`px-3 py-1.5 rounded-md text-sm font-semibold ${mode === 'one' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Tek aşamalı 75 g</button>
        <button onClick={() => setMode('two')} aria-pressed={mode === 'two'} className={`px-3 py-1.5 rounded-md text-sm font-semibold ${mode === 'two' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>İki aşamalı 50 g → 100 g</button>
      </div>
      {mode === 'one' ? (
        <div className="grid sm:grid-cols-3 gap-4">
          <NumField label="Açlık" value={a} onChange={setA} placeholder="örn. 98" suffix="mg/dL" />
          <NumField label="1. saat" value={b} onChange={setB} placeholder="örn. 188" suffix="mg/dL" />
          <NumField label="2. saat" value={c} onChange={setC} placeholder="örn. 162" suffix="mg/dL" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <NumField label="50 g tarama, 1. saat (tok)" value={g50} onChange={setG50} placeholder="örn. 152" suffix="mg/dL" />
          </div>
          {g50n !== null && g50n >= 140 && (
            <div className="grid sm:grid-cols-4 gap-4">
              <NumField label="100 g açlık" value={f} onChange={setF} suffix="mg/dL" />
              <NumField label="1. saat" value={x1} onChange={setX1} suffix="mg/dL" />
              <NumField label="2. saat" value={x2} onChange={setX2} suffix="mg/dL" />
              <NumField label="3. saat" value={x3} onChange={setX3} suffix="mg/dL" />
            </div>
          )}
        </div>
      )}
      <div className="mt-5" aria-live="polite">
        {v ? (
          <div className={`border rounded-xl p-4 ${v.tone}`}>
            <div className="font-bold text-lg">{v.title}</div>
            <p className="mt-1 text-sm">{v.detail}</p>
          </div>
        ) : <p className="text-sm text-slate-500">Değerleri girin.</p>}
      </div>
    </div>
  );
};

const Pregnancy: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Baby size={20} />} sub="Gebelik öncesi risk taşıyanlara ilk vizitte aşikâr diyabet taraması; tüm gebelere 24-28. haftada OGTT.">Tarama ve tanı ölçütleri</SectionTitle>
      <DataTable
        head={['Strateji', 'Açlık', '1. saat', '2. saat', '3. saat / not']}
        rows={[
          ['İlk vizit — aşikâr DM', '≥ 126', '—', 'Rastgele ≥ 200', 'HbA1c ≥ %6,5'],
          ['Tek aşamalı 75 g OGTT (IADPSG)', '≥ 92', '≥ 180', '≥ 153', 'Tek değer yeterli'],
          ['İki aşamalı: 50 g tarama (tok)', '—', '≥ 140 (≥ 130)', '—', 'Pozitifse 100 g OGTT'],
          ['İki aşamalı: 100 g OGTT (C&C)', '≥ 95', '≥ 180', '≥ 155', '≥ 140 · en az 2 değer'],
        ]}
      />
      <p className="text-xs text-slate-500 mt-2">Tüm değerler mg/dL plazma glukozudur.</p>
    </div>

    <GdmInterpreter />

    <div>
      <SectionTitle sub="GDM ve pregestasyonel diyabet için ortak hedefler.">Glisemik ve kan basıncı hedefleri</SectionTitle>
      <div className="grid sm:grid-cols-4 gap-3">
        {[['Açlık / öğün öncesi', '70-95'], ['Tokluk 1. saat', '< 140'], ['Tokluk 2. saat', '< 120'], ['HbA1c', '< %6,0-6,5']].map(([l, v]) => (
          <div key={l} className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-center">
            <div className="text-xs text-pink-700">{l}</div>
            <div className="text-xl font-bold text-pink-900 mt-1">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <DataTable
          head={['Grup', 'CGM aralığı', 'TIR', 'TBR', 'TAR']}
          rows={[
            ['Gebelik — Tip 1 DM', '63-140 mg/dL', '> %70', '< %4 (< 63)', '< %25 (> 140)'],
            ['Gebelik — Tip 2 / GDM', '63-140 mg/dL', '> %90', '< %4 (< 63)', '< %10 (> 140)'],
          ]}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">KB hedefi 110-135 / 80-85 mmHg. HbA1c &lt; %6,0 ancak hipoglisemi olmadan hedeflenir.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Gebelik öncesi hazırlık" tone="sky">
        <Bullets items={[
          'Kontrolsüz glisemide etkili kontrasepsiyon; gebelik planlı olmalı',
          <>Malformasyon riskini azaltmak için <strong>HbA1c &lt; %6,5</strong></>,
          <>Gebelikten en az 1-3 ay önce <strong>folik asit 400-800 mcg/gün</strong></>,
          'Gebelik öncesi veya 1. trimesterde göz muayenesi; her trimester ve postpartum 1 yıl izlem',
        ]} />
      </Card>
      <Card title="Gebelik öncesi kesilecek ilaçlar" tone="red">
        <Bullets items={[
          'ACE-İ, ARB, spironolakton',
          'Statinler',
          'SGLT2-İ, GLP-1 RA, tirzepatid ve sülfonilüreler',
        ]} />
        <p className="mt-2 text-xs">Güvenli antihipertansifler: metildopa, labetalol, uzun etkili nifedipin.</p>
      </Card>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <SectionTitle icon={<Pill size={20} />}>Tedavi</SectionTitle>
        <Card>
          <Bullets items={[
            'İlk basamak tıbbi beslenme tedavisi ve günlük aktivite',
            <>Hedefe ulaşılamazsa <strong>insülin</strong> altın standarttır: detemir, glargin (bazal); aspart, lispro (prandiyal)</>,
            'Açlık yüksekse bazal, tokluk yüksekse öğün öncesi hızlı analog',
            'Oral antidiyabetikler ilk seçenek değildir',
            <>Tip 1 veya Tip 2 DM’li gebede preeklampsi profilaksisi: 12-16. haftadan itibaren <strong>aspirin 100-150 mg/gün</strong></>,
          ]} />
        </Card>
      </div>
      <div>
        <SectionTitle icon={<CalendarCheck size={20} />}>Doğum sonrası</SectionTitle>
        <Card tone="green">
          <Bullets items={[
            'Doğumdan hemen sonra insülin ihtiyacı yaklaşık %50 düşer; dozlar hemen azaltılır',
            'GDM’de insülin genellikle doğumla kesilir',
            <><strong>4-12. haftada 75 g OGTT</strong> ile yeniden sınıflama</>,
            'GDM öyküsü olanlarda ömür boyu, 1-3 yılda bir diyabet taraması; prediyabette metformin düşünülür',
            'Emzirme teşvik edilir',
          ]} />
        </Card>
      </div>
    </div>
  </div>
);

export default Pregnancy;
