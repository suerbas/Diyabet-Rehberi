import React, { useState } from 'react';
import { Calculator, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, Ruler, Timer, Layers, Thermometer } from 'lucide-react';

const num = (s: string): number | null => {
  if (s.trim() === '') return null;
  const n = parseFloat(s.replace(',', '.'));
  return isNaN(n) ? null : n;
};

const fmt = (n: number, d = 0) => n.toLocaleString('tr-TR', { maximumFractionDigits: d, minimumFractionDigits: 0 });

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; suffix?: string }> = ({ label, value, onChange, placeholder, suffix }) => (
  <label className="block">
    <span className="text-sm font-semibold text-slate-800">{label}</span>
    <div className="mt-1 flex items-center rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-primary bg-white">
      <input type="text" inputMode="decimal" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" />
      {suffix && <span className="px-3 text-xs text-slate-500 whitespace-nowrap">{suffix}</span>}
    </div>
  </label>
);

const steps = [
  { n: 1, title: 'Başlangıç', text: 'HbA1c ≥ %9 veya APG ≥ 250-300 mg/dL ya da katabolik tablo: 10 Ü veya 0,1-0,2 Ü/kg bazal insülin (akşam veya yatarken). Metformin sürdürülür.' },
  { n: 2, title: 'Titrasyon', text: '3 günlük APG ortalamasına göre 3 günde bir ayarla. Hedef APG 80-130 mg/dL. Hipoglisemide %10-20 azalt.' },
  { n: 3, title: 'Bazal-Plus', text: 'Bazal > 0,5 Ü/kg ve HbA1c hâlâ yüksekse: GLP-1 RA ekle veya en büyük öğüne 4 Ü hızlı analog.' },
  { n: 4, title: 'Bazal-Bolus', text: 'Tip 1 DM ve ileri Tip 2 DM: ~%50 bazal + ~%50 bolus (3 öğüne bölünür).' },
];

const BasalCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');
  const [apg, setApg] = useState('');
  const [hypo, setHypo] = useState(false);
  const [bedtimeDrop, setBedtimeDrop] = useState(false);

  const w = num(weight);
  const d = num(dose);
  const a = num(apg);

  let start: string | null = null;
  if (w && (d === null || d === 0)) {
    start = `Başlangıç dozu: 10 Ü veya ${fmt(w * 0.1)}-${fmt(w * 0.2)} Ü/gün (0,1-0,2 Ü/kg).`;
  }

  let advice: { title: string; detail: string; tone: string } | null = null;
  if (d !== null && d > 0 && (a !== null || hypo)) {
    if (hypo || (a !== null && a < 80)) {
      const lo = Math.max(2, Math.round(d * 0.1));
      const hi = Math.max(4, Math.round(d * 0.2));
      advice = { title: `Azalt: ${fmt(lo)}-${fmt(hi)} Ü (%10-20) → yeni doz ${fmt(d - hi)}-${fmt(d - lo)} Ü`, detail: 'Tek bir hipoglisemide bile (< 70 mg/dL) neden araştırılır: öğün atlama, egzersiz, alkol, böbrek fonksiyonu, enjeksiyon yeri.', tone: 'border-rose-200 bg-rose-50 text-rose-900' };
    } else if (a !== null && a > 180) {
      advice = { title: `+4 Ü artır → yeni doz ${fmt(d + 4)} Ü`, detail: 'Gece hipoglisemisi olmadığından emin olun.', tone: 'border-amber-200 bg-amber-50 text-amber-900' };
    } else if (a !== null && a >= 130) {
      advice = { title: `+2 Ü artır → yeni doz ${fmt(d + 2)} Ü`, detail: '3 günde bir kademeli titre edilir.', tone: 'border-amber-200 bg-amber-50 text-amber-900' };
    } else if (a !== null) {
      advice = { title: 'Hedefte: mevcut dozu koru', detail: 'HbA1c yüksekse öğün sonrası glukoz (2. saat) değerlendirilir.', tone: 'border-emerald-200 bg-emerald-50 text-emerald-900' };
    }
  }

  const perKg = w && d ? d / w : null;
  const overBasal = (perKg !== null && perKg > 0.5) || bedtimeDrop;

  // Do not suggest further basal increases once over-basalization is suspected
  if (overBasal && advice && a !== null && a >= 130 && !hypo) {
    advice = {
      title: 'Bazalı artırma — prandiyal kontrole geç',
      detail: `APG ${fmt(a)} mg/dL hedefin üstünde, ancak bazal doz sınırda. Dozu koruyup GLP-1 RA, SGLT2-İ veya en büyük öğüne 4 Ü hızlı analog ekleyin.`,
      tone: 'border-orange-200 bg-orange-50 text-orange-900',
    };
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-1"><Calculator size={20} className="text-primary" /> Bazal insülin titrasyon hesaplayıcı</h4>
      <p className="text-sm text-slate-500 mb-5">Ardışık 3 günün açlık glukoz ortalamasını girin. Henüz insülin yoksa mevcut dozu boş bırakın.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Vücut ağırlığı" value={weight} onChange={setWeight} placeholder="örn. 82" suffix="kg" />
        <Field label="Mevcut bazal doz" value={dose} onChange={setDose} placeholder="örn. 18" suffix="Ü/gün" />
        <Field label="3 günlük APG ort." value={apg} onChange={setApg} placeholder="örn. 165" suffix="mg/dL" />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={hypo} onChange={e => setHypo(e.target.checked)} className="w-4 h-4 accent-rose-500" />
          Son 3 günde hipoglisemi (&lt; 70 mg/dL) oldu
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={bedtimeDrop} onChange={e => setBedtimeDrop(e.target.checked)} className="w-4 h-4 accent-amber-500" />
          Yatma → sabah glukoz farkı ≥ 50 mg/dL
        </label>
      </div>

      <div className="mt-5 space-y-3" aria-live="polite">
        {start && <div className="border border-sky-200 bg-sky-50 text-sky-900 rounded-xl p-4 text-sm font-semibold">{start}</div>}
        {advice && (
          <div className={`border rounded-xl p-4 ${advice.tone}`}>
            <div className="font-bold">{advice.title}</div>
            <div className="text-sm mt-1">{advice.detail}</div>
          </div>
        )}
        {perKg !== null && (
          <div className="text-sm text-slate-600">Bazal doz: <strong>{fmt(perKg, 2)} Ü/kg/gün</strong></div>
        )}
        {overBasal && (
          <div className="border border-orange-300 bg-orange-50 text-orange-900 rounded-xl p-4 text-sm flex gap-3">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <span>
              <strong>Aşırı bazalizasyon şüphesi.</strong> Bazal &gt; 0,5 Ü/kg/gün, yatma-sabah farkı ≥ 50 mg/dL veya açlık normalken tokluk &gt; 180 mg/dL ise bazalı artırmaya devam etmeyin; GLP-1 RA, SGLT2-İ veya prandiyal bolus ekleyin.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const BolusCalculator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tdd, setTdd] = useState('');
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('120');
  const [carbs, setCarbs] = useState('');
  const [analog, setAnalog] = useState(true);

  const t = num(tdd);
  const icr = t ? 500 / t : null;
  const isf = t ? (analog ? 1800 : 1500) / t : null;
  const cur = num(current);
  const tgt = num(target);
  const kh = num(carbs);
  const correction = isf && cur !== null && tgt !== null ? Math.max(0, (cur - tgt) / isf) : null;
  const meal = icr && kh !== null ? kh / icr : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="w-full flex items-center justify-between p-6 text-left">
        <span>
          <span className="font-bold text-lg text-slate-900 block">Bolus hesaplama (KH oranı ve düzeltme)</span>
          <span className="text-sm text-slate-500">Bazal-bolus kullanan hastalar için · 500 ve 1800 kuralı</span>
        </span>
        {open ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Toplam günlük insülin (TİD)" value={tdd} onChange={setTdd} placeholder="örn. 50" suffix="Ü/gün" />
            <div>
              <span className="text-sm font-semibold text-slate-800">Hızlı insülin tipi</span>
              <div className="mt-1 flex rounded-lg border border-slate-300 overflow-hidden text-sm">
                <button onClick={() => setAnalog(true)} className={`flex-1 py-2 ${analog ? 'bg-primary text-white' : 'bg-white text-slate-700'}`}>Analog (1800)</button>
                <button onClick={() => setAnalog(false)} className={`flex-1 py-2 ${!analog ? 'bg-primary text-white' : 'bg-white text-slate-700'}`}>Regüler (1500)</button>
              </div>
            </div>
          </div>
          {icr && isf && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4"><strong>KH/İnsülin oranı:</strong> 1 Ü ≈ {fmt(icr, 1)} g KH</div>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4"><strong>Duyarlılık faktörü:</strong> 1 Ü ≈ {fmt(isf, 0)} mg/dL düşüş</div>
            </div>
          )}
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            <Field label="Öğündeki KH" value={carbs} onChange={setCarbs} placeholder="örn. 60" suffix="g" />
            <Field label="Mevcut glukoz" value={current} onChange={setCurrent} placeholder="örn. 210" suffix="mg/dL" />
            <Field label="Hedef glukoz" value={target} onChange={setTarget} suffix="mg/dL" />
          </div>
          {(meal !== null || correction !== null) && (
            <div className="mt-4 bg-slate-900 text-white rounded-xl p-4 text-sm space-y-1">
              {meal !== null && <div>Öğün dozu: {fmt(meal, 1)} Ü</div>}
              {correction !== null && <div>Düzeltme dozu: {fmt(correction, 1)} Ü</div>}
              {meal !== null && correction !== null && <div className="font-bold text-base pt-1">Toplam: ~{fmt(Math.round((meal + correction) * 2) / 2, 1)} Ü</div>}
              <div className="text-slate-400 text-xs pt-1">Son 3-4 saatte yapılmış bolus varsa aktif insülin (IOB) düşülmelidir.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const insulinTypes = [
  { type: 'Ultra hızlı / hızlı analog', brands: 'Fiasp, Humalog (lispro), NovoRapid (aspart), Apidra (glulisin)', onset: '5-30 dk', peak: '30-90 dk', duration: '3-5 sa' },
  { type: 'Kısa etkili (regüler)', brands: 'Actrapid, Humulin R', onset: '30-60 dk', peak: '2-4 sa', duration: '5-8 sa' },
  { type: 'Orta etkili (NPH)', brands: 'Insulatard, Humulin N', onset: '1-2 sa', peak: '4-10 sa', duration: '14-18 sa' },
  { type: 'Uzun / çok uzun analog', brands: 'Lantus, Toujeo (glargin U100/U300), Levemir (detemir), Tresiba (degludek)', onset: '30 dk-4 sa', peak: 'Piksiz', duration: '20-42 sa' },
  { type: 'Hazır karışım', brands: 'Humalog Mix 25/50, NovoMix 30, Ryzodeg', onset: '15-30 dk', peak: 'Çift fazlı', duration: '14-24 sa' },
];

const technique = [
  { icon: <Ruler size={18} />, title: 'İğne ucu', text: 'Erişkin ve çocukta 4 mm kalem iğnesi, 90° yeterli.' },
  { icon: <Timer size={18} />, title: 'Emilim hızı', text: 'Karın > kol > uyluk > kalça.' },
  { icon: <Layers size={18} />, title: 'Lipohipertrofi', text: 'Aynı noktaya enjeksiyon emilimi %25-40 bozar; her vizitte bakın, 1 cm arayla rotasyon.' },
  { icon: <Thermometer size={18} />, title: 'Saklama', text: 'Yedekler 2-8 °C; açılan kalem oda ısısında 28 gün.' },
];

const InsulinModule: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    {/* Steps */}
    <div>
      <h3 className="font-bold text-xl text-slate-900 mb-4">Başlama ve yoğunlaştırma basamakları</h3>
      <div className="grid md:grid-cols-4 gap-3">
        {steps.map((s, i) => (
          <div key={s.n} className="relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">{s.n}</span>
              <span className="font-bold text-slate-900">{s.title}</span>
            </div>
            <p className="text-sm text-slate-600">{s.text}</p>
            {i < steps.length - 1 && <ArrowRight size={18} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 bg-slate-50 rounded-full" />}
          </div>
        ))}
      </div>
    </div>

    <BasalCalculator />
    <BolusCalculator />

    {/* Types */}
    <div>
      <h3 className="font-bold text-xl text-slate-900 mb-4">İnsülin preparatları</h3>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              <th className="p-3 font-semibold">Tip</th>
              <th className="p-3 font-semibold">Preparatlar</th>
              <th className="p-3 font-semibold whitespace-nowrap">Başlangıç</th>
              <th className="p-3 font-semibold">Pik</th>
              <th className="p-3 font-semibold">Süre</th>
            </tr>
          </thead>
          <tbody>
            {insulinTypes.map(r => (
              <tr key={r.type} className="border-t border-slate-100">
                <td className="p-3 font-semibold text-slate-900">{r.type}</td>
                <td className="p-3 text-slate-600">{r.brands}</td>
                <td className="p-3 whitespace-nowrap">{r.onset}</td>
                <td className="p-3 whitespace-nowrap">{r.peak}</td>
                <td className="p-3 whitespace-nowrap">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Technique */}
    <div>
      <h3 className="font-bold text-xl text-slate-900 mb-4">Enjeksiyon tekniği</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {technique.map(t => (
          <div key={t.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary mb-2">{t.icon}<span className="font-bold text-slate-900">{t.title}</span></div>
            <p className="text-sm text-slate-600">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default InsulinModule;
