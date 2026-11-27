import React, { useMemo, useState } from 'react';
import { HeartPulse, Heart, Droplets, FlaskConical, Scale, ShieldAlert, Wallet, Syringe, Check, Ban, ThumbsUp, Star, AlertTriangle } from 'lucide-react';

type Level = 'oncelikli' | 'uygun' | 'kacin';

interface Condition {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}

interface Rule {
  drug: string;
  level: Level;
  reason: string;
}

const conditions: Condition[] = [
  { id: 'askvh', label: 'ASKVH / yüksek KV risk', hint: 'Koroner, serebrovasküler, periferik arter hastalığı veya hedef organ hasarı', icon: <HeartPulse size={18} /> },
  { id: 'ky', label: 'Kalp yetersizliği', hint: 'HFrEF, HFmrEF veya HFpEF', icon: <Heart size={18} /> },
  { id: 'kbh', label: 'Kronik böbrek hastalığı', hint: 'eGFR < 60 veya AKO ≥ 30 mg/g (3 ayda ≥2 ölçüm)', icon: <Droplets size={18} /> },
  { id: 'albuminuri', label: 'Albüminüri (AKO ≥ 30 mg/g)', hint: 'Maksimum tolere ACE-İ/ARB altında kalıcı', icon: <Droplets size={18} /> },
  { id: 'masld', label: 'MASLD / yüksek FIB-4', hint: 'Steatotik karaciğer; FIB-4 ≥ 1,3', icon: <FlaskConical size={18} /> },
  { id: 'obezite', label: 'Obezite (BKİ ≥ 30)', hint: 'Kilo kaybı öncelikli hedef', icon: <Scale size={18} /> },
  { id: 'hipo', label: 'Hipoglisemi riski / kırılgan yaşlı', hint: 'İleri yaş, düşme, kognitif bozukluk, yalnız yaşama', icon: <ShieldAlert size={18} /> },
  { id: 'maliyet', label: 'Maliyet / erişim belirleyici', hint: 'Rapor veya ödeme koşulları kısıtlı', icon: <Wallet size={18} /> },
];

const drugNames: Record<string, string> = {
  metformin: 'Metformin',
  sglt2: 'SGLT2 İnhibitörü',
  glp1: 'GLP-1 RA',
  tirzepatid: 'Tirzepatid (GIP/GLP-1)',
  dpp4: 'DPP-4 İnhibitörü',
  su: 'Sülfonilüre',
  tzd: 'Pioglitazon',
  insulin: 'Bazal İnsülin',
  rasb: 'ACE-İ veya ARB (maks. doz)',
  finerenon: 'Finerenon',
};

const levelRank: Record<Level, number> = { kacin: 3, oncelikli: 2, uygun: 1 };

function buildRules(sel: Set<string>, hba1c: number | null, katabolik: boolean): { rules: Rule[]; notes: string[] } {
  const r: Rule[] = [];
  const notes: string[] = [];
  const any = sel.size > 0;

  r.push({ drug: 'metformin', level: 'uygun', reason: 'Kontrendikasyon yoksa temel tedavi; eGFR < 30’da kesilir, 30-44’te maks. 1000 mg.' });

  if (sel.has('askvh')) {
    r.push({ drug: 'glp1', level: 'oncelikli', reason: 'ASKVH: KV yararı kanıtlı GLP-1 RA, HbA1c’den bağımsız eklenir.' });
    r.push({ drug: 'sglt2', level: 'oncelikli', reason: 'ASKVH: KV yararı kanıtlı SGLT2-İ, HbA1c’den bağımsız eklenir.' });
    notes.push('ASKVH: LDL-K < 55 mg/dL (yüksek yoğunluklu statin ± ezetimib), KB < 130/80, sekonder korumada aspirin 75-100 mg.');
  }
  if (sel.has('ky')) {
    r.push({ drug: 'sglt2', level: 'oncelikli', reason: 'Kalp yetersizliği: düşük ve korunmuş EF’de SGLT2-İ zorunlu tercih.' });
    r.push({ drug: 'tzd', level: 'kacin', reason: 'Kalp yetersizliği: sıvı retansiyonu ile KY’yi ağırlaştırır.' });
    r.push({ drug: 'dpp4', level: 'uygun', reason: 'KY’de saksagliptinden kaçın; sitagliptin/linagliptin nötr.' });
    notes.push('HFpEF + obezitede GLP-1 RA veya tirzepatid semptom ve kilo açısından yararlı.');
  }
  if (sel.has('kbh')) {
    r.push({ drug: 'sglt2', level: 'oncelikli', reason: 'KBH: eGFR ≥ 20 ise başlanır; glisemik etki düşse de organ koruma sürer.' });
    r.push({ drug: 'glp1', level: 'oncelikli', reason: 'KBH: ek böbrek ve KV koruma; glisemi için tercih edilen ek ajan.' });
    r.push({ drug: 'su', level: 'kacin', reason: 'KBH: klerens azalır, uzamış hipoglisemi riski (glimepirid özellikle).' });
    notes.push('eGFR’ye göre doz ayarı için “eGFR & Doz” sekmesine bakın. İlk 2-4 haftada %10-20 eGFR düşüşü SGLT2-İ ile fizyolojiktir.');
  }
  if (sel.has('albuminuri')) {
    r.push({ drug: 'rasb', level: 'oncelikli', reason: 'Albüminüri: maksimum tolere dozda ACE-İ veya ARB (ikisi birlikte verilmez).' });
    r.push({ drug: 'sglt2', level: 'oncelikli', reason: 'Albüminüri: nefroproteksiyonun 2. sütunu.' });
    r.push({ drug: 'finerenon', level: 'uygun', reason: 'RAS blokajına rağmen AKO ≥ 30 ve K⁺ ≤ 4,8 ise eklenir; 4. haftada K⁺/eGFR kontrolü.' });
  }
  if (sel.has('masld')) {
    r.push({ drug: 'glp1', level: 'oncelikli', reason: 'MASLD/MASH: kilo kaybı ve steatohepatit gerilemesi.' });
    r.push({ drug: 'tirzepatid', level: 'oncelikli', reason: 'MASLD/MASH: en güçlü kilo kaybı; MASH yararı.' });
    if (!sel.has('ky')) r.push({ drug: 'tzd', level: 'uygun', reason: 'MASH’ta etkili; KY yoksa düşünülebilir (kilo artışı, ödem, kırık riski).' });
    notes.push('FIB-4 < 1,3: 1-2 yılda bir tekrar · 1,3-2,67: elastografi · > 2,67: hepatoloji sevki.');
  }
  if (sel.has('obezite')) {
    r.push({ drug: 'tirzepatid', level: 'oncelikli', reason: 'Obezite: %15-20 kilo kaybı potansiyeli.' });
    r.push({ drug: 'glp1', level: 'oncelikli', reason: 'Obezite: semaglutid ile %10-15 kilo kaybı.' });
    r.push({ drug: 'sglt2', level: 'uygun', reason: 'Hafif kilo kaybı (~2-3 kg).' });
    r.push({ drug: 'su', level: 'kacin', reason: 'Obezite: kilo artışı yapar.' });
    if (!sel.has('masld')) r.push({ drug: 'tzd', level: 'kacin', reason: 'Obezite: kilo artışı ve sıvı retansiyonu.' });
    notes.push('≥ %15 kilo kaybı remisyon sağlayabilir; BKİ ≥ 35 ve kontrolsüz DM’de metabolik cerrahi değerlendirilir.');
  }
  if (sel.has('hipo')) {
    r.push({ drug: 'su', level: 'kacin', reason: 'Hipoglisemi riski: düşme, aritmi ve demans progresyonu ile ilişkili.' });
    r.push({ drug: 'dpp4', level: 'oncelikli', reason: 'Hipoglisemi yapmaz, iyi tolere edilir; yaşlıda basitleştirmede tercih.' });
    r.push({ drug: 'sglt2', level: 'uygun', reason: 'Hipoglisemi riski düşük; dehidratasyona dikkat.' });
    notes.push('Kırılgan yaşlıda HbA1c hedefi < %8,0 (ileri kırılganlıkta < %8,5). Karmaşık rejimler sabah tek doz bazal veya DPP-4İ ile basitleştirilir.');
  }
  if (sel.has('maliyet')) {
    if (!sel.has('hipo') && !sel.has('kbh') && !sel.has('obezite')) {
      r.push({ drug: 'su', level: 'uygun', reason: 'Maliyet: gliklazid MR tercih edilir; hipoglisemi eğitimi şart.' });
    }
    if (!sel.has('ky') && !sel.has('obezite')) {
      r.push({ drug: 'tzd', level: 'uygun', reason: 'Maliyet: ucuz ve hipoglisemi yapmaz; KY ve kırık riskine dikkat.' });
    }
  }
  if (!any) {
    r.push({ drug: 'dpp4', level: 'uygun', reason: 'Komorbidite yok: kilo nötr, hipoglisemisiz ek seçenek.' });
    r.push({ drug: 'sglt2', level: 'uygun', reason: 'Komorbidite yok: kilo ve KB yararı olan ek seçenek.' });
    r.push({ drug: 'glp1', level: 'uygun', reason: 'Komorbidite yok: güçlü HbA1c ve kilo etkisi.' });
    r.push({ drug: 'su', level: 'uygun', reason: 'Komorbidite yok: düşük maliyetli; hipoglisemi ve kilo artışına dikkat.' });
  }

  if (sel.has('obezite') || sel.has('masld')) {
    notes.push('GLP-1 RA ve tirzepatid alternatiftir, birlikte kullanılmaz; DPP-4İ de bunlarla kombine edilmez.');
  }

  const insulinNeeded = katabolik || (hba1c !== null && hba1c >= 9);
  if (insulinNeeded) {
    r.push({
      drug: 'insulin',
      level: 'oncelikli',
      reason: katabolik
        ? 'Semptomatik/katabolik hiperglisemi (kilo kaybı, poliüri, ketozis): glukoz toksisitesini kırmak için bazal insülin.'
        : 'HbA1c ≥ %9 (veya APG ≥ 250-300): 10 Ü veya 0,1-0,2 Ü/kg bazal insülin düşünülür.',
    });
    if (katabolik) notes.push('Katabolik tabloda LADA için Anti-GAD ve C-peptid istenir. Antikor negatif ve C-peptid yüksekse 8-12 hafta sonra insülin azaltılıp GLP-1 RA/SGLT2-İ’ye geçilebilir.');
  }

  return { rules: r, notes };
}

const levelStyle: Record<Level, { box: string; badge: string; label: string; icon: React.ReactNode }> = {
  oncelikli: { box: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-600 text-white', label: 'Öncelikli', icon: <Star size={14} /> },
  uygun: { box: 'border-sky-200 bg-sky-50', badge: 'bg-sky-600 text-white', label: 'Uygun', icon: <ThumbsUp size={14} /> },
  kacin: { box: 'border-rose-200 bg-rose-50', badge: 'bg-rose-600 text-white', label: 'Kaçın', icon: <Ban size={14} /> },
};

const TherapySelector: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hba1cText, setHba1cText] = useState('');
  const [katabolik, setKatabolik] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        if (id === 'albuminuri') next.add('kbh');
      }
      return next;
    });
  };

  const hba1c = hba1cText.trim() === '' ? null : parseFloat(hba1cText.replace(',', '.'));
  const validHba1c = hba1c !== null && !isNaN(hba1c) ? hba1c : null;

  const { merged, notes } = useMemo(() => {
    const { rules, notes } = buildRules(selected, validHba1c, katabolik);
    const map = new Map<string, { level: Level; reasons: string[] }>();
    for (const rule of rules) {
      const cur = map.get(rule.drug);
      if (!cur) map.set(rule.drug, { level: rule.level, reasons: [rule.reason] });
      else {
        if (levelRank[rule.level] > levelRank[cur.level]) cur.level = rule.level;
        cur.reasons.push(rule.reason);
      }
    }
    // A "kaçın" verdict keeps only its own reasons so the card is not contradictory
    const rulesByDrug = (drug: string, lvl: Level) => rules.filter(x => x.drug === drug && x.level === lvl).map(x => x.reason);
    const out = Array.from(map.entries()).map(([drug, v]) => ({
      drug,
      level: v.level,
      reasons: v.level === 'kacin' ? rulesByDrug(drug, 'kacin') : v.reasons,
    }));
    out.sort((a, b) => {
      const order: Record<Level, number> = { oncelikli: 0, uygun: 1, kacin: 2 };
      return order[a.level] - order[b.level];
    });
    return { merged: out, notes };
  }, [selected, validHba1c, katabolik]);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
          <h3 className="font-bold text-lg text-slate-900 mb-1">Hastanın durumu</h3>
          <p className="text-sm text-slate-500 mb-5">Uyan tüm durumları işaretleyin. Hiçbiri seçilmezse komorbiditesiz yaklaşım gösterilir.</p>

          <div className="space-y-2">
            {conditions.map(c => {
              const on = selected.has(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  aria-pressed={on}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${on ? 'border-primary bg-sky-50' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>
                    {on && <Check size={14} />}
                  </span>
                  <span className={`mt-0.5 shrink-0 ${on ? 'text-primary' : 'text-slate-400'}`}>{c.icon}</span>
                  <span>
                    <span className="block font-semibold text-sm text-slate-800">{c.label}</span>
                    <span className="block text-xs text-slate-500">{c.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Güncel HbA1c (%)</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="örn. 8,4"
                value={hba1cText}
                onChange={e => setHba1cText(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <button
              onClick={() => setKatabolik(k => !k)}
              aria-pressed={katabolik}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${katabolik ? 'border-amber-400 bg-amber-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${katabolik ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 bg-white'}`}>
                {katabolik && <Check size={14} />}
              </span>
              <span>
                <span className="block font-semibold text-sm text-slate-800">Semptomatik / katabolik tablo</span>
                <span className="block text-xs text-slate-500">İstemsiz kilo kaybı, poliüri-polidipsi, ketozis</span>
              </span>
            </button>
            {(selected.size > 0 || hba1cText || katabolik) && (
              <button onClick={() => { setSelected(new Set()); setHba1cText(''); setKatabolik(false); }} className="text-xs text-slate-500 underline">
                Seçimleri temizle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Önerilen yaklaşım</h3>
          <span className="text-xs text-slate-500">{selected.size === 0 ? 'Komorbidite yok' : `${selected.size} durum seçili`}</span>
        </div>

        <div className="space-y-3">
          {merged.map(item => {
            const s = levelStyle[item.level];
            return (
              <div key={item.drug} className={`border rounded-xl p-4 ${s.box}`}>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    {item.drug === 'insulin' && <Syringe size={16} className="text-slate-600" />}
                    {drugNames[item.drug]}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex items-center gap-1 ${s.badge}`}>
                    {s.icon}{s.label}
                  </span>
                </div>
                <ul className="space-y-1">
                  {Array.from(new Set(item.reasons)).map((reason, i) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {validHba1c !== null && validHba1c < 9 && !katabolik && (
          <p className="mt-4 text-sm text-slate-600">
            HbA1c %{validHba1c.toString().replace('.', ',')}: genel hedef &lt; %7,0. Tedavi yanıtı 3-6 ayda bir değerlendirilir; hedefe ulaşılmazsa basamak artırılır.
          </p>
        )}

        {notes.length > 0 && (
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500" /> Eşlik eden öneriler</h4>
            <ul className="space-y-2">
              {notes.map((n, i) => (
                <li key={i} className="text-sm text-slate-700 flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapySelector;
