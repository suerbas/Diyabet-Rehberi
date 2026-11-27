import React, { useState } from 'react';
import { Scale, Pill, Scissors, Target } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from '../shared/ui';

const fmt = (n: number, d = 1) => n.toFixed(d).replace('.', ',');

function bmiClass(b: number) {
  if (b < 18.5) return { label: 'Zayıf', tone: 'text-sky-700' };
  if (b < 25) return { label: 'Normal', tone: 'text-emerald-700' };
  if (b < 30) return { label: 'Fazla kilolu', tone: 'text-amber-700' };
  if (b < 35) return { label: 'Obez (sınıf 1)', tone: 'text-orange-700' };
  if (b < 40) return { label: 'Obez (sınıf 2)', tone: 'text-rose-700' };
  return { label: 'Obez (sınıf 3)', tone: 'text-rose-800' };
}

function surgeryNote(b: number): string | null {
  if (b >= 40) return 'BKİ ≥ 40: glisemik kontrolden bağımsız metabolik cerrahi adayı (18-65 yaş).';
  if (b >= 35) return 'BKİ 35-39,9: yoğun medikal tedaviye rağmen kontrolsüz Tip 2 DM varsa metabolik cerrahi adayı.';
  if (b >= 30) return 'BKİ 30-34,9: seçilmiş, tedaviye dirençli Tip 2 DM ve ek komorbiditede cerrahi değerlendirilebilir.';
  return null;
}

const goals = [
  { pct: 5, gain: 'HbA1c %0,6-1,0 düşüş, KB ve HDL düzelmesi' },
  { pct: 7, gain: 'Prediyabette diyabete ilerlemenin önlenmesi (6 ayda hedef)' },
  { pct: 10, gain: 'MASH gerilemesi, uyku apnesi ve KV risk azalması' },
  { pct: 15, gain: 'Tip 2 diyabet remisyonu olasılığı' },
];

const WeightCalc: React.FC = () => {
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  const w = parseNum(kg);
  const h = parseNum(cm);
  const bmi = w !== null && h !== null && w > 0 && h > 50 ? w / ((h / 100) ** 2) : null;
  const cls = bmi !== null ? bmiClass(bmi) : null;
  const surg = bmi !== null ? surgeryNote(bmi) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Target size={20} className="text-primary" /> BKİ ve kilo kaybı hedefleri</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Hastaya kilogram olarak somut hedef verin.</p>
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <NumField label="Ağırlık" value={kg} onChange={setKg} placeholder="örn. 96" suffix="kg" />
        <NumField label="Boy" value={cm} onChange={setCm} placeholder="örn. 170" suffix="cm" />
        <div className="border border-slate-200 rounded-xl p-3 text-center" aria-live="polite">
          <div className="text-xs text-slate-500">BKİ</div>
          <div className="text-2xl font-bold text-slate-900">{bmi !== null ? fmt(bmi) : '—'}</div>
          {cls && <div className={`text-xs font-semibold ${cls.tone}`}>{cls.label}</div>}
        </div>
      </div>
      {w !== null && w > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th className="py-2 pr-3">Hedef</th><th className="py-2 pr-3">Verilecek kilo</th><th className="py-2 pr-3">Hedef ağırlık</th><th className="py-2">Beklenen kazanım</th></tr></thead>
            <tbody>
              {goals.map(g => (
                <tr key={g.pct} className="border-t border-slate-100">
                  <td className="py-2 pr-3 font-semibold text-slate-900">%{g.pct}</td>
                  <td className="py-2 pr-3">{fmt(w * g.pct / 100)} kg</td>
                  <td className="py-2 pr-3">{fmt(w * (1 - g.pct / 100))} kg</td>
                  <td className="py-2 text-slate-600">{g.gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {surg && <p className="mt-4 text-sm bg-violet-50 border border-violet-200 text-violet-900 rounded-lg p-3">{surg}</p>}
      <p className="text-xs text-slate-500 mt-3">Günlük 500-750 kkal enerji açığı haftada yaklaşık 0,5-0,75 kg kayıp sağlar.</p>
    </div>
  );
};

const WeightManagement: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Scale size={20} />} sub="Kilo kaybı arttıkça metabolik kazanç artar.">Kilo kaybı eşikleri ve tedavi basamakları</SectionTitle>
      <DataTable
        head={['Kilo kaybı', 'Klinik kazanım', 'Yaklaşım']}
        rows={[
          ['%3-5', 'Trigliserid ve açlık glukozunda iyileşme', 'Yaşam tarzı (500-750 kkal/gün enerji açığı)'],
          ['%5-10', 'HbA1c %0,6-1,0 düşüş; KB ve HDL düzelmesi', 'Yaşam tarzı + kilo verdiren antidiyabetikler (GLP-1 RA, SGLT2-İ)'],
          ['%10-15', 'MASH gerilemesi, uyku apnesi ve KV risk azalması', 'Yüksek etkili inkretinler (semaglutid 2,4 mg, tirzepatid)'],
          ['≥ %15', 'Tip 2 diyabet remisyonu', 'Tirzepatid veya metabolik / bariatrik cerrahi'],
        ]}
      />
    </div>

    <WeightCalc />

    <div>
      <SectionTitle icon={<Pill size={20} />} sub="Diyabetli bireylerde kullanılan anti-obezite ilaçları.">İlaç tedavisi</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card title="Orlistat 3×120 mg">Pankreatik lipaz inhibisyonu; yağda eriyen vitamin desteği gerekir.</Card>
        <Card title="Liraglutid 3,0 mg/gün">16. haftada ≥ %5 kilo kaybı yoksa kesilir.</Card>
        <Card title="Semaglutid 2,4 mg/hafta">Ortalama %10-15 kilo kaybı; SELECT çalışmasında KV koruma.</Card>
        <Card title="Tirzepatid 5-15 mg/hafta">GIP/GLP-1 çift agonist; %15-21 kilo kaybı.</Card>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <SectionTitle icon={<Scissors size={20} />}>Metabolik cerrahi</SectionTitle>
        <Card tone="sky">
          <Bullets items={[
            <><strong>Adaylık (18-65 yaş):</strong> BKİ ≥ 40; BKİ 35-39,9 + kontrolsüz T2DM; BKİ 30-34,9 + seçilmiş dirençli T2DM</>,
            <><strong>Kontrendikasyon:</strong> Tip 1 DM, aktif madde bağımlılığı, tedavi edilmemiş psikoz</>,
            <><strong>Ömür boyu:</strong> multivitamin, B12, demir, kalsiyum sitrat, D vitamini</>,
            'Geç dumping: reaktif (hiperinsülinemik) hipoglisemi sorgulanır',
            'Cerrahiden sonra en az 12-18 ay gebelik ertelenir',
          ]} />
        </Card>
      </div>
      <div>
        <SectionTitle>Remisyon</SectionTitle>
        <Card tone="green">
          <p>Tüm glukoz düşürücü ilaçlar kesildikten <strong>en az 3 ay sonra HbA1c &lt; %6,5</strong>.</p>
          <p className="mt-2">Remisyondaki hasta “iyileşmiş” sayılmaz: yılda en az bir HbA1c ve komplikasyon taramaları (göz, böbrek, ayak) sürdürülür.</p>
        </Card>
      </div>
    </div>
  </div>
);

export default WeightManagement;
