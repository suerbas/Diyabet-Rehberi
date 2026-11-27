import React, { useState } from 'react';
import { HeartPulse, Gauge, Pill, Check } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from '../shared/ui';

type Risk = 'cokYuksek' | 'yuksek' | 'orta';

const riskInfo: Record<Risk, { label: string; ldl: number; nonHdl: number; halve: boolean; tone: string }> = {
  cokYuksek: { label: 'Çok yüksek risk', ldl: 55, nonHdl: 85, halve: true, tone: 'bg-rose-600' },
  yuksek: { label: 'Yüksek risk', ldl: 70, nonHdl: 100, halve: true, tone: 'bg-orange-500' },
  orta: { label: 'Orta risk', ldl: 100, nonHdl: 130, halve: false, tone: 'bg-amber-500' },
};

const veryHighCriteria = [
  { id: 'askvh', label: 'ASKVH (koroner, serebrovasküler, periferik arter)' },
  { id: 'organ', label: 'Hedef organ hasarı: mikroalbüminüri (AKO ≥ 30), retinopati veya nöropati' },
  { id: 'kbh4', label: 'Evre 4 KBH (eGFR < 30)' },
  { id: 'rf3', label: '≥ 3 majör KV risk faktörü (yaş, HT, dislipidemi, sigara, obezite)' },
];
const highCriteria = [
  { id: 'sure10', label: 'Hedef organ hasarı yok, diyabet süresi ≥ 10 yıl' },
  { id: 'rf12', label: 'İlave bir risk faktörü' },
  { id: 'kbh3', label: 'Evre 3 KBH (eGFR 30-59)' },
  { id: 'tekrf', label: 'Belirgin tek risk faktörü: TK > 310, LDL-K > 190 mg/dL veya KB ≥ 180/110' },
];

const LdlTargetTool: React.FC = () => {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [ldlText, setLdlText] = useState('');
  const toggle = (id: string) => setSel(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const risk: Risk = veryHighCriteria.some(c => sel.has(c.id)) ? 'cokYuksek' : highCriteria.some(c => sel.has(c.id)) ? 'yuksek' : 'orta';
  const info = riskInfo[risk];
  const ldl = parseNum(ldlText);

  let needed: string | null = null;
  if (ldl !== null && ldl > 0) {
    const target = info.halve ? Math.min(info.ldl, ldl * 0.5) : info.ldl;
    const pct = Math.max(0, Math.round((1 - target / ldl) * 100));
    needed = pct === 0
      ? 'LDL-K hedefte; mevcut tedaviyi sürdür.'
      : `Hedef LDL-K ≤ ${Math.round(target)} mg/dL → yaklaşık %${pct} düşüş gerekir. ${pct >= 50 ? 'Yüksek yoğunluklu statin; yetmezse ezetimib, ardından PCSK9 inhibitörü.' : pct >= 30 ? 'En az orta yoğunluklu statin.' : 'Orta yoğunluklu statin genellikle yeterli.'}`;
  }

  const Check2: React.FC<{ id: string; label: string }> = ({ id, label }) => {
    const on = sel.has(id);
    return (
      <button onClick={() => toggle(id)} aria-pressed={on} className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left text-sm transition-colors ${on ? 'border-primary bg-sky-50' : 'border-slate-200 hover:bg-slate-50'}`}>
        <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>{on && <Check size={14} />}</span>
        <span className="text-slate-800">{label}</span>
      </button>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-rose-700 mb-2">Çok yüksek risk kriterleri</div>
          <div className="space-y-2">{veryHighCriteria.map(c => <Check2 key={c.id} {...c} />)}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-orange-700 mb-2">Yüksek risk kriterleri</div>
          <div className="space-y-2">{highCriteria.map(c => <Check2 key={c.id} {...c} />)}</div>
        </div>
        <p className="text-xs text-slate-500">Hiçbiri yoksa orta risk: genç (Tip 1 &lt; 35, Tip 2 &lt; 50 yaş), süre &lt; 10 yıl, ek risk faktörü yok. Çok yüksek riskte maksimum statine rağmen tekrarlayan ASKVH veya polivasküler tutulum varsa LDL-K hedefi &lt; 40 mg/dL’dir.</p>
      </div>
      <div>
        <div className={`rounded-2xl text-white p-5 ${info.tone}`}>
          <div className="text-sm opacity-90">Risk kategorisi</div>
          <div className="text-2xl font-bold">{info.label}</div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/20 rounded-lg p-3"><div className="opacity-90">LDL-K hedefi</div><div className="text-xl font-bold">&lt; {info.ldl} mg/dL</div>{info.halve && <div className="text-xs">ve ≥ %50 azalma</div>}</div>
            <div className="bg-white/20 rounded-lg p-3"><div className="opacity-90">Non-HDL-K hedefi</div><div className="text-xl font-bold">&lt; {info.nonHdl} mg/dL</div></div>
          </div>
        </div>
        <div className="mt-4">
          <NumField label="Mevcut LDL-K (isteğe bağlı)" value={ldlText} onChange={setLdlText} placeholder="örn. 130" suffix="mg/dL" />
          {needed && <p className="mt-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3" aria-live="polite">{needed}</p>}
        </div>
      </div>
    </div>
  );
};

const Cardiovascular: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-12">
    <div>
      <SectionTitle icon={<HeartPulse size={20} />} sub="Kriterleri işaretleyin; risk kategorisi ve LDL-K hedefi hesaplanır.">KV risk kategorisi ve LDL hedefi</SectionTitle>
      <LdlTargetTool />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <Card title="Yüksek yoğunluklu statin (≥ %50 ↓)">Atorvastatin 40-80 mg · Rosuvastatin 20-40 mg</Card>
        <Card title="Orta yoğunluklu statin (%30-49 ↓)">Atorvastatin 10-20 mg · Rosuvastatin 5-10 mg · Simvastatin 20-40 mg</Card>
        <Card title="İzlem ve intolerans">4-12 haftada lipid kontrolü. Kas yakınmasında ara ver, statin değiştir veya gün aşırı dozla. ALT &gt; 3× ÜSN kalıcıysa azalt/kes. Gebelikte kesilir.</Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<Gauge size={20} />} sub="TEMD 2026 · Türk Hipertansiyon Uzlaşı Raporu 2025: yaşa ve kırılganlığa göre ilaç eşiği ve hedef.">Hipertansiyon</SectionTitle>
      <DataTable
        head={['Hasta grubu', 'İlaç eşiği', 'KB hedefi', 'Not']}
        rows={[
          ['18-79 yaş', '≥ 140/90 mmHg', '120-130 / 70-80 mmHg', 'Komorbiditeden bağımsız (DM, KAH, KBH, KY)'],
          ['≥ 80 yaş, dinç', 'Sistolik ≥ 140', 'Sistolik 130-140', '80 yaş öncesi başlanan ve tolere edilen tedavi yalnızca yaş nedeniyle azaltılmaz'],
          ['Kırılgan (yaştan bağımsız)', 'Sistolik ≥ 160', 'Sistolik 140-150', 'Organ hipoperfüzyonu, ortostatik hipotansiyon ve düşme izlenir'],
          ['Gebelik', '≥ 140/90 mmHg', '110-135 / 80-85 mmHg', 'Metildopa, labetalol, nifedipin; ACE-İ/ARB kontrendike'],
        ]}
      />
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <Card title="1. KB 130-139 / 80-89">3 ay yaşam tarzı değişikliği. Sürerse ve yüksek riskliyse (&gt; 40 yaş, &gt; 10 yıl DM, komplikasyon, sigara, obezite) monoterapi, tercihen ACE-İ veya ARB.</Card>
        <Card title="2. KB ≥ 140/90">Beklemeden yaşam tarzı + kombinasyon: ACE-İ veya ARB + tiyazid veya KKB. ACE-İ ile ARB birlikte kullanılmaz.</Card>
        <Card title="3. Dirençli HT">Üçlü tedaviye rağmen hedefe ulaşılamazsa MRA (örn. spironolakton) eklenir; K⁺ ve eGFR izlenir.</Card>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Antiagregan" tone="sky">
        <Bullets items={[
          <><strong>Sekonder koruma:</strong> ASKVH olan tüm diyabetlilerde aspirin 75-100 mg/gün; intoleransta klopidogrel 75 mg.</>,
          <><strong>Primer koruma:</strong> ≥ 50 yaş, yüksek KV riskli ve kanama riski düşük seçilmiş hastalarda düşünülebilir.</>,
          'Yüksek GİS veya intrakraniyal kanama riskinde kaçınılır.',
        ]} />
      </Card>
      <Card title="Trigliserid" tone="sky">
        <Bullets items={[
          'Hedef açlık TG < 150 mg/dL.',
          <><strong>&gt; 500-1000 mg/dL:</strong> pankreatit riski; öncelikli tedavi (glisemik kontrol + fibrat veya omega-3/ikosapent etil).</>,
          'Sekonder nedenler: kontrolsüz diyabet, alkol, hipotiroidi, östrojen, tiyazid/beta-bloker.',
        ]} />
      </Card>
      <Card title="Kalp yetersizliği" tone="plain">
        <Bullets items={[
          <><strong>HFrEF:</strong> SGLT2-İ + ARNI/ACE-İ/ARB + beta-bloker + MRA.</>,
          <><strong>HFpEF:</strong> SGLT2-İ; obezitede GLP-1 RA veya tirzepatid.</>,
          'Pioglitazon ve saksagliptinden kaçınılır.',
        ]} />
      </Card>
      <Card title="Sessiz iskemi ve periferik arter" tone="plain">
        <Bullets items={[
          'Otonom nöropatide göğüs ağrısı olmayabilir; efor dispnesi ve yorgunluk anjina eşdeğeri olabilir.',
          'Yürürken bacak ağrısı (kladikasyo) sorgulanır; ayak nabızları her yıl palpe edilir.',
          <span className="flex gap-1"><Pill size={14} className="mt-0.5 shrink-0" />Tütün bırakma her vizitte önerilir; en etkili KV koruma.</span>,
        ]} />
      </Card>
    </div>
  </div>
);

export default Cardiovascular;
