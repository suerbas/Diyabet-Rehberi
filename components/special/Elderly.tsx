import React, { useState } from 'react';
import { UserCheck, Check, ShieldAlert, ListChecks } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from '../shared/ui';

const profiles = [
  { id: 'saglikli', label: 'Sağlıklı yaşlı', desc: 'Az sayıda kronik hastalık, bilişsel ve işlevsel durum korunmuş; yaşam beklentisi > 15 yıl', a1c: '< %7,0-7,5', fpg: '80-130', ppg: '< 160-180', bp: '120-130/70-80 (≥ 80 yaş: sistolik 130-140)', tone: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
  { id: 'orta', label: 'Orta düzey kırılgan', desc: '≥ 3 kronik hastalık, ≥ 2 enstrümantal günlük yaşam aktivitesinde kısıtlılık veya hafif-orta bilişsel bozukluk', a1c: '< %7,5-8,0', fpg: '90-150', ppg: '< 180', bp: 'Sistolik 130-140', tone: 'border-amber-300 bg-amber-50 text-amber-900' },
  { id: 'ileri', label: 'İleri kırılgan / bakıma muhtaç', desc: 'Bakımevi, son dönem kronik hastalık, orta-ağır bilişsel bozukluk veya ≥ 2 temel günlük yaşam aktivitesinde bağımlılık', a1c: '< %8,0-8,5 (semptom önleme)', fpg: '100-180', ppg: '< 200', bp: 'Sistolik 140-150', tone: 'border-rose-300 bg-rose-50 text-rose-900' },
] as const;

const midItems = [
  '3 veya daha fazla kronik hastalık (KAH, KY, KBH, KOAH, artrit, inme, depresyon…)',
  '2 veya daha fazla enstrümantal GYA kısıtlılığı (alışveriş, ilaç yönetimi, para, telefon)',
  'Hafif-orta bilişsel bozukluk',
];
const severeItems = [
  'Bakımevinde yaşıyor veya son dönem kronik hastalık (evre 3-4 KY, diyalize giren KBH, metastatik kanser…)',
  'Orta-ağır bilişsel bozukluk (demans)',
  '2 veya daha fazla temel GYA’da bağımlılık (yıkanma, giyinme, beslenme, tuvalet)',
];

const CheckRow: React.FC<{ on: boolean; onClick: () => void; children: React.ReactNode }> = ({ on, onClick, children }) => (
  <button onClick={onClick} aria-pressed={on}
    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left text-sm transition-colors ${on ? 'border-primary bg-sky-50' : 'border-slate-200 hover:bg-slate-50'}`}>
    <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>{on && <Check size={14} />}</span>
    <span className="text-slate-700">{children}</span>
  </button>
);

const TargetSelector: React.FC = () => {
  const [mid, setMid] = useState<boolean[]>(midItems.map(() => false));
  const [sev, setSev] = useState<boolean[]>(severeItems.map(() => false));
  const flip = (arr: boolean[], set: (v: boolean[]) => void, i: number) => set(arr.map((x, j) => (j === i ? !x : x)));
  const p = sev.some(Boolean) ? profiles[2] : mid.some(Boolean) ? profiles[1] : profiles[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><ListChecks size={20} className="text-primary" /> Yaşlı hastada hedef belirleyici</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Hastaya uyan durumları işaretleyin; en ağır grup belirleyicidir.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wide text-amber-700">Orta düzey kırılganlık</div>
          {midItems.map((t, i) => <CheckRow key={t} on={mid[i]} onClick={() => flip(mid, setMid, i)}>{t}</CheckRow>)}
        </div>
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wide text-rose-700">İleri kırılganlık</div>
          {severeItems.map((t, i) => <CheckRow key={t} on={sev[i]} onClick={() => flip(sev, setSev, i)}>{t}</CheckRow>)}
        </div>
      </div>
      <div className={`mt-5 border rounded-xl p-4 ${p.tone}`} aria-live="polite">
        <div className="font-bold text-lg">{p.label}</div>
        <p className="text-sm mt-1">{p.desc}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center">
          {[['HbA1c', p.a1c], ['Açlık PG', p.fpg], ['Tokluk 2. sa', p.ppg], ['Kan basıncı', p.bp]].map(([l, v]) => (
            <div key={l} className="bg-white/70 rounded-lg p-2">
              <div className="text-[11px] opacity-80">{l}</div>
              <div className="font-bold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Elderly: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<UserCheck size={20} />} sub="Yaşlıda hedef, yaşa değil sağlık durumuna göre belirlenir.">Bireyselleştirilmiş hedefler</SectionTitle>
      <DataTable
        head={['Profil', 'HbA1c', 'Açlık / öğün öncesi', 'Tokluk 2. saat']}
        rows={profiles.map(p => [p.label, p.a1c, `${p.fpg} mg/dL`, `${p.ppg} mg/dL`])}
      />
      <p className="text-xs text-slate-500 mt-2">CGM kullanan kırılgan / yüksek riskli yaşlıda: 70-180 mg/dL aralığında TIR &gt; %50, TBR (&lt; 70) &lt; %1, TAR (&gt; 250) &lt; %10.</p>
    </div>

    <TargetSelector />

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Hipoglisemiden kaçınma" tone="red">
        <p className="flex gap-2 mb-2"><ShieldAlert size={16} className="shrink-0 mt-0.5 text-rose-600" /><span>Sessiz hipoglisemi aritmi, düşme ve demans ilerlemesini hızlandırır.</span></p>
        <Bullets items={[
          'Sülfonilürelerden kaçınılır; kullanılıyorsa kesilir',
          'HbA1c’nin hedefin çok altında olması (ör. %6,3) aşırı tedavi uyarısıdır',
          'Bakıcıya hipoglisemi belirtileri, 15-15 kuralı ve glukagon kullanımı öğretilir',
        ]} />
      </Card>
      <Card title="Tedaviyi basitleştirme (de-intensifikasyon)" tone="sky">
        <Bullets items={[
          'Karmaşık bazal-bolus yerine günde tek doz sabah bazal insülin veya DPP-4 inhibitörü',
          'Akşam bazal insülinde gece hipoglisemisi varsa doz azaltılır veya sabaha kaydırılır',
          'Metformin ve diğer ilaçlarda eGFR’ye göre doz ayarı',
          'Polifarmasi her vizitte gözden geçirilir',
        ]} />
      </Card>
    </div>

    <div className="grid sm:grid-cols-3 gap-3">
      <Card title="Yıllık geriatrik değerlendirme">Polifarmasi, düşme riski, sarkopeni, üriner inkontinans ve malnütrisyon.</Card>
      <Card title="Bilişsel tarama">≥ 65 yaşta yılda bir bellek ve yürütücü işlev taraması; bozukluk varsa rejim sadeleştirilir.</Card>
      <Card title="Beslenme">Bakımevi sakinlerinde aşırı kısıtlayıcı diyabet diyeti uygulanmaz; malnütrisyon riski hiperglisemiden önemlidir.</Card>
    </div>
  </div>
);

export default Elderly;
