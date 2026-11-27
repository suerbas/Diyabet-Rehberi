import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

type Status = 'ok' | 'dikkat' | 'hayir';

interface Row {
  drug: string;
  group: string;
  eval: (egfr: number) => { status: Status; text: string };
}

const rows: Row[] = [
  {
    drug: 'Metformin', group: 'Oral',
    eval: e => e >= 45 ? { status: 'ok', text: 'Tam doz; eGFR 45-59 ise 3-6 ayda bir eGFR izle.' }
      : e >= 30 ? { status: 'dikkat', text: 'Yeni başlanmaz; kullanıyorsa maks. 1000 mg/gün.' }
      : { status: 'hayir', text: 'Kontrendike, kesilir.' },
  },
  {
    drug: 'SGLT2-İ (dapa/empagliflozin)', group: 'Oral',
    eval: e => e >= 45 ? { status: 'ok', text: 'Tam doz; glisemik etki ve organ koruma.' }
      : e >= 20 ? { status: 'dikkat', text: 'Organ koruma için başlanır/sürdürülür; glisemik etki zayıf, ek ajan gerekebilir.' }
      : { status: 'dikkat', text: 'Yeni başlanmaz; kullanıyorsa diyalize dek sürdürülebilir, diyalizde kesilir.' },
  },
  {
    drug: 'GLP-1 RA', group: 'Enjektabl',
    eval: e => e >= 15 ? { status: 'ok', text: 'Doz ayarı gerekmez. Kusma/dehidratasyonda AKI riskine dikkat.' }
      : { status: 'dikkat', text: 'Son dönemde deneyim sınırlı; nefroloji ile birlikte karar.' },
  },
  {
    drug: 'Tirzepatid', group: 'Enjektabl',
    eval: e => e >= 15 ? { status: 'ok', text: 'Doz ayarı gerekmez; dehidratasyondan kaçın.' }
      : { status: 'dikkat', text: 'Son dönemde deneyim sınırlı.' },
  },
  {
    drug: 'Sitagliptin', group: 'Oral',
    eval: e => e >= 45 ? { status: 'ok', text: '100 mg/gün.' }
      : e >= 30 ? { status: 'dikkat', text: '50 mg/gün.' }
      : { status: 'dikkat', text: '25 mg/gün.' },
  },
  {
    drug: 'Vildagliptin', group: 'Oral',
    eval: e => e >= 50 ? { status: 'ok', text: '2x50 mg/gün.' }
      : { status: 'dikkat', text: '1x50 mg/gün.' },
  },
  {
    drug: 'Linagliptin', group: 'Oral',
    eval: () => ({ status: 'ok', text: '5 mg/gün; tüm eGFR düzeylerinde doz ayarsız.' }),
  },
  {
    drug: 'Gliklazid MR', group: 'Oral',
    eval: e => e >= 60 ? { status: 'ok', text: 'Kullanılabilir; hipoglisemi eğitimi.' }
      : e >= 30 ? { status: 'dikkat', text: 'Düşük dozla başla; hipoglisemi riski artar.' }
      : { status: 'hayir', text: 'Kaçınılır; uzamış hipoglisemi riski.' },
  },
  {
    drug: 'Glimepirid', group: 'Oral',
    eval: e => e >= 60 ? { status: 'ok', text: 'Kullanılabilir; hipoglisemi eğitimi.' }
      : e >= 30 ? { status: 'dikkat', text: '1 mg ile başla; gliklazid MR tercih edilir.' }
      : { status: 'hayir', text: 'Kaçınılır.' },
  },
  {
    drug: 'Pioglitazon', group: 'Oral',
    eval: () => ({ status: 'ok', text: 'Doz ayarı gerekmez; sıvı retansiyonu ve ödem izlenir.' }),
  },
  {
    drug: 'Repaglinid', group: 'Oral',
    eval: e => e >= 30 ? { status: 'ok', text: 'Kullanılabilir.' } : { status: 'dikkat', text: 'KBH’de kullanılabilir; düşük dozla başla.' },
  },
  {
    drug: 'Akarboz', group: 'Oral',
    eval: e => e >= 30 ? { status: 'ok', text: 'Kullanılabilir; GİS gaz şikâyeti.' } : { status: 'hayir', text: 'Önerilmez.' },
  },
  {
    drug: 'İnsülin', group: 'Enjektabl',
    eval: e => e >= 45 ? { status: 'ok', text: 'İhtiyaca göre doz.' }
      : e >= 30 ? { status: 'dikkat', text: 'Renal insülin yıkımı azalır; hipoglisemi riski artar, yakın izlem.' }
      : { status: 'dikkat', text: 'Doz %25-50 azaltılabilir; yakın izlem.' },
  },
  {
    drug: 'Finerenon (AKO ≥ 30 ise)', group: 'Böbrek koruma',
    eval: e => e >= 60 ? { status: 'ok', text: '20 mg/gün (K⁺ ≤ 4,8). 4. haftada K⁺/eGFR; K⁺ > 5,5 ise kes.' }
      : e >= 25 ? { status: 'ok', text: '10 mg/gün (K⁺ ≤ 4,8). 4. haftada K⁺/eGFR; K⁺ > 5,5 ise kes.' }
      : { status: 'hayir', text: 'eGFR < 25’te başlanmaz.' },
  },
];

const gCategory = (e: number) =>
  e >= 90 ? { code: 'G1', label: 'Normal / yüksek' }
  : e >= 60 ? { code: 'G2', label: 'Hafif azalmış' }
  : e >= 45 ? { code: 'G3a', label: 'Hafif-orta azalmış' }
  : e >= 30 ? { code: 'G3b', label: 'Orta-ağır azalmış' }
  : e >= 15 ? { code: 'G4', label: 'Ağır azalmış' }
  : { code: 'G5', label: 'Böbrek yetmezliği' };

const aCategory = (ako: number) =>
  ako < 30 ? { code: 'A1', label: '< 30 mg/g (normal-hafif)' }
  : ako <= 300 ? { code: 'A2', label: '30-300 mg/g (orta artış)' }
  : { code: 'A3', label: '> 300 mg/g (ciddi artış)' };

const statusStyle: Record<Status, { cls: string; icon: React.ReactNode; label: string }> = {
  ok: { cls: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: <CheckCircle2 size={18} className="text-emerald-600" />, label: 'Uygun' },
  dikkat: { cls: 'bg-amber-50 border-amber-200 text-amber-900', icon: <AlertTriangle size={18} className="text-amber-500" />, label: 'Doz ayarı / dikkat' },
  hayir: { cls: 'bg-rose-50 border-rose-200 text-rose-800', icon: <XCircle size={18} className="text-rose-600" />, label: 'Kullanma' },
};

const RenalDoseCheck: React.FC = () => {
  const [egfr, setEgfr] = useState(50);
  const [akoText, setAkoText] = useState('');
  const ako = akoText.trim() === '' ? null : parseFloat(akoText.replace(',', '.'));
  const g = gCategory(egfr);
  const a = ako !== null && !isNaN(ako) ? aCategory(ako) : null;

  const followUp = egfr < 30
    ? 'Nefroloji sevki (eGFR < 30). 3 ayda bir eGFR/AKO, doz ayarları ve renal replasman hazırlığı.'
    : (egfr < 60 || (a && a.code !== 'A1'))
      ? '3-6 ayda bir eGFR ve AKO. ACE-İ/ARB maks. tolere doz; SGLT2-İ; AKO ≥ 30 sürüyorsa finerenon. Hızlı progresyon veya atipik hematüride nefroloji sevki.'
      : 'Yılda bir eGFR ve spot idrar AKO; risk faktörü kontrolü.';

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <label htmlFor="egfr" className="text-sm font-semibold text-slate-800 flex justify-between">
              <span>eGFR (mL/dk/1,73 m²)</span>
              <span className="text-primary text-lg font-bold">{egfr}</span>
            </label>
            <input id="egfr" type="range" min={5} max={120} value={egfr} onChange={e => setEgfr(Number(e.target.value))} className="w-full mt-2 accent-sky-500" />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>5</span><span>15</span><span>30</span><span>45</span><span>60</span><span>90</span><span>120</span>
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Spot idrar AKO (mg/g) — isteğe bağlı</span>
            <input type="text" inputMode="decimal" placeholder="örn. 45" value={akoText} onChange={e => setAkoText(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-semibold">{g.code} · {g.label}</span>
          {a && <span className="px-3 py-1 rounded-full bg-slate-700 text-white font-semibold">{a.code} · {a.label}</span>}
        </div>
        <p className="mt-3 text-sm text-slate-700"><strong>İzlem:</strong> {followUp}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {rows.map(r => {
          const res = r.eval(egfr);
          const s = statusStyle[res.status];
          return (
            <div key={r.drug} className={`border rounded-xl p-4 ${s.cls}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-slate-900 flex items-center gap-2">{s.icon}{r.drug}</span>
                <span className="text-[10px] uppercase tracking-wide font-bold opacity-80">{s.label}</span>
              </div>
              <p className="text-sm">{res.text}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500">ACE-İ ve ARB birlikte kullanılmaz. eGFR CKD-EPI ile hesaplanmalı; akut böbrek hasarında değerler güvenilir değildir.</p>
    </div>
  );
};

export default RenalDoseCheck;
