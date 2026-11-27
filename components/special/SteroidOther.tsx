import React, { useState } from 'react';
import { Syringe, Plane, HeartPulse, Calculator } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from './ui';

const steroids = [
  { id: 'pred', label: 'Prednizolon', factor: 1 },
  { id: 'mp', label: 'Metilprednizolon', factor: 1.25 },
  { id: 'hc', label: 'Hidrokortizon', factor: 0.25 },
  { id: 'dex', label: 'Deksametazon', factor: 6.67 },
] as const;
type SteroidId = typeof steroids[number]['id'];

const fmt = (n: number, d = 1) => n.toFixed(d).replace('.', ',');

const NphCalc: React.FC = () => {
  const [type, setType] = useState<SteroidId>('pred');
  const [dose, setDose] = useState('');
  const [kg, setKg] = useState('');
  const s = steroids.find(x => x.id === type)!;
  const d = parseNum(dose);
  const w = parseNum(kg);
  const eq = d !== null && d > 0 ? d * s.factor : null;
  const perKg = eq !== null ? Math.min(0.4, Math.max(0.1, (eq / 10) * 0.1)) : null;
  const units = perKg !== null && w !== null && w > 0 ? Math.round(perKg * w) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Calculator size={20} className="text-primary" /> Sabah tek doz steroidde NPH başlangıç dozu</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Her 10 mg prednizolon eşdeğeri için 0,1 Ü/kg; en az 0,1, en fazla 0,4 Ü/kg. NPH, steroid ile birlikte sabah yapılır.</p>
      <div className="flex flex-wrap gap-2 mb-4" role="group">
        {steroids.map(x => (
          <button key={x.id} onClick={() => setType(x.id)} aria-pressed={type === x.id}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${type === x.id ? 'bg-primary text-white border-primary' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{x.label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <NumField label={`${s.label} günlük dozu`} value={dose} onChange={setDose} placeholder="örn. 40" suffix="mg" />
        <NumField label="Vücut ağırlığı" value={kg} onChange={setKg} placeholder="örn. 80" suffix="kg" />
      </div>
      <div className="mt-5" aria-live="polite">
        {type === 'dex' ? (
          <div className="border border-amber-300 bg-amber-50 text-amber-900 rounded-xl p-4 text-sm">
            <div className="font-bold text-lg">Bazal-bolus rejimi önerilir</div>
            Deksametazon uzun etkilidir ve 24 saat hiperglisemi yapar; sabah tek NPH yetersiz kalır.{eq !== null && ` (≈ ${fmt(eq, 0)} mg prednizolon eşdeğeri)`}
          </div>
        ) : eq !== null ? (
          <div className="border border-sky-300 bg-sky-50 text-sky-900 rounded-xl p-4">
            <div className="text-sm">Prednizolon eşdeğeri ≈ {fmt(eq, 0)} mg → {fmt(perKg!, 2)} Ü/kg</div>
            <div className="text-2xl font-bold mt-1">{units !== null ? `Sabah ${units} Ü NPH` : 'Ağırlığı girin'}</div>
            {eq < 10 && <p className="text-xs mt-1">Düşük doz steroidde önce glukoz izlenir; hiperglisemi varsa en düşük doz (0,1 Ü/kg) ile başlanır.</p>}
          </div>
        ) : <p className="text-sm text-slate-500">Steroid dozunu girin.</p>}
      </div>
      <p className="text-xs text-slate-500 mt-3">Önceden insülin kullanan hastada mevcut doza eklenir. Steroid azaltıldığı gün NPH dozu da orantılı azaltılır.</p>
    </div>
  );
};

const SteroidOther: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Syringe size={20} />} sub="Glukokortikoidler öğleden sonra ve akşam belirgin postprandiyal hiperglisemi yapar; açlık glukozu normal olabilir.">Glukokortikoid ilişkili hiperglisemi</SectionTitle>
      <DataTable
        head={['Steroid rejimi', 'Hiperglisemi zamanı', 'İnsülin stratejisi']}
        rows={[
          ['Sabah tek doz prednizolon / metilprednizolon', 'Öğleden sonra ve akşam pik; gece-sabah normale dönebilir', 'Sabah steroidle birlikte 0,1-0,4 Ü/kg NPH'],
          ['Günde çok doz veya deksametazon', '24 saat kesintisiz', 'Bazal-bolus (glargin + öğün öncesi hızlı analog)'],
          ['Pulse yüksek doz İV metilprednizolon', 'İnfüzyondan saatler sonra şiddetli', 'İV insülin veya yüksek doz bazal-bolus'],
          ['Doz azaltma dönemi', 'Direnç hızla çözülür; ağır hipoglisemi riski', 'Steroid azaltıldığı gün insülin orantılı azaltılır'],
        ]}
      />
      <p className="text-xs text-slate-500 mt-2">Steroid alan hastada tarama için açlık yerine öğleden sonra / akşam yemeği sonrası glukoz ölçülmelidir.</p>
    </div>

    <NphCalc />

    <div>
      <SectionTitle icon={<HeartPulse size={20} />}>Diğer özel diyabet durumları</SectionTitle>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Transplantasyon sonrası (PTDM)">
          <Bullets items={[
            'Tanı stres hiperglisemisi geçtikten sonra (≥ 45 gün), stabil immünsüpresyonda',
            'Erken dönemde HbA1c güvenilmez; 75 g OGTT tercih edilir',
            'Takrolimus, sirolimus ve yüksek doz steroid diyabetojeniktir',
            'Erken dönemde insülin; stabil böbrek naklinde metformin, DPP-4İ, SGLT2-İ, GLP-1 RA',
          ]} />
        </Card>
        <Card title="Kistik fibrozis (CFRD)">
          <Bullets items={[
            '10 yaşından itibaren her yıl, stabil dönemde 75 g OGTT',
            'HbA1c tarama testi olarak kullanılmaz',
            'Tek onaylı tedavi insülindir',
            'Kalori kısıtlanmaz: normalin %120-150’si, yüksek protein',
          ]} />
        </Card>
        <Card title="Kanser tedavisi" tone="amber">
          <Bullets items={[
            <><strong>İmmün kontrol noktası inhibitörü</strong> (nivolumab, pembrolizumab): ani DKA ile başlayan kalıcı insülin bağımlı diyabet; steroid yararsız</>,
            <><strong>PI3K / mTOR inhibitörleri</strong>: başlangıçta haftalık APG; metformin, SGLT2-İ veya insülin</>,
            <><strong>Androjen deprivasyonu</strong>: yıllık diyabet taraması</>,
          ]} />
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<Plane size={20} />}>Seyahat</SectionTitle>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Doğuya uçuş (gün kısalır)" tone="sky">Bazal insülin birikmesini önlemek için doz azaltılır veya zamanlaması öne alınır.</Card>
        <Card title="Batıya uçuş (gün uzar)" tone="sky">Ek glukoz ölçümü; gerekirse ek ara öğün veya ek bazal / prandiyal doz.</Card>
        <Card title="Seyahat çantası" tone="green">İnsülin kabin bagajında. Reçete / rapor, yedek insülin ve kalem ucu, glukometre, hızlı karbonhidrat, glukagon.</Card>
      </div>
    </div>
  </div>
);

export default SteroidOther;
