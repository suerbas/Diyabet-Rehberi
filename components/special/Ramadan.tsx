import React, { useState } from 'react';
import { Moon, AlertOctagon, Calculator } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from '../shared/ui';

const round = (n: number) => Math.round(n);

const InsulinCalc: React.FC = () => {
  const [basal, setBasal] = useState('');
  const [sahur, setSahur] = useState('');
  const b = parseNum(basal);
  const s = parseNum(sahur);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Calculator size={20} className="text-primary" /> Ramazan insülin doz ayarı</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Ramazan öncesi kullanılan dozları girin.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <NumField label="Günlük bazal insülin" value={basal} onChange={setBasal} placeholder="örn. 30" suffix="Ü" />
        <NumField label="Sahura denk gelen hızlı analog dozu" value={sahur} onChange={setSahur} placeholder="örn. 8" suffix="Ü" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-5" aria-live="polite">
        <div className="border border-violet-200 bg-violet-50 rounded-xl p-4">
          <div className="text-xs text-violet-700">Bazal insülin → iftarda, %15-30 azaltılmış</div>
          <div className="text-2xl font-bold text-violet-900 mt-1">{b !== null && b > 0 ? `${round(b * 0.7)}-${round(b * 0.85)} Ü` : '—'}</div>
        </div>
        <div className="border border-sky-200 bg-sky-50 rounded-xl p-4">
          <div className="text-xs text-sky-700">Sahur hızlı analog, %25-50 azaltılmış</div>
          <div className="text-2xl font-bold text-sky-900 mt-1">{s !== null && s > 0 ? `${round(s * 0.5)}-${round(s * 0.75)} Ü` : '—'}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">İftar öğün dozu genellikle olağan akşam dozu gibi sürdürülür. Hipoglisemi riski yüksekse aralığın düşük ucu seçilir; ilk günlerde sık glukoz ölçümüyle titre edilir.</p>
    </div>
  );
};

const Ramadan: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Moon size={20} />} sub="Ramazandan 6-8 hafta önce IDF-DAR risk skoru hesaplanır ve tedavi planı yapılır.">Ramazan öncesi risk değerlendirmesi</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 text-center">
          <div className="text-xs text-emerald-700">Düşük risk</div>
          <div className="text-2xl font-bold text-emerald-900">≤ 3 puan</div>
          <div className="text-xs text-emerald-800 mt-1">Oruç tutabilir; eğitim ve doz ayarı</div>
        </div>
        <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 text-center">
          <div className="text-xs text-amber-700">Orta risk</div>
          <div className="text-2xl font-bold text-amber-900">3,5-6 puan</div>
          <div className="text-xs text-amber-800 mt-1">Dikkatli izlemle tutabilir; sık glukoz ölçümü</div>
        </div>
        <div className="border border-rose-200 bg-rose-50 rounded-xl p-4 text-center">
          <div className="text-xs text-rose-700">Yüksek risk</div>
          <div className="text-2xl font-bold text-rose-900">&gt; 6 puan</div>
          <div className="text-xs text-rose-800 mt-1">Oruç tutması önerilmez</div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Oruç tutması önerilmeyenler" tone="red">
        <Bullets items={[
          'Tip 1 diyabet',
          'Son 3 ayda ağır hipoglisemi veya DKA / HHD öyküsü',
          'Evre 4-5 kronik böbrek hastalığı',
          'Gebeler',
        ]} />
      </Card>
      <Card title="Orucu hemen bozma kriterleri" tone="amber">
        <p className="flex gap-2 mb-2"><AlertOctagon size={16} className="shrink-0 mt-0.5 text-amber-600" /><span>Aşağıdakilerden biri varsa oruç derhal sonlandırılır:</span></p>
        <Bullets items={[
          <>Kan şekeri <strong>&lt; 70 mg/dL</strong></>,
          <>Kan şekeri <strong>&gt; 300 mg/dL</strong></>,
          'Hipoglisemi belirtileri, akut hastalık veya dehidratasyon',
        ]} />
        <p className="mt-2 text-xs">Parmak ucu glukoz ölçümü orucu bozmaz; gün içinde özellikle öğleden sonra ölçüm önerilir.</p>
      </Card>
    </div>

    <div>
      <SectionTitle sub="Tedavi iftar ve sahura göre yeniden düzenlenir.">İlaç ayarları</SectionTitle>
      <DataTable
        head={['İlaç', 'Ramazanda yaklaşım']}
        rows={[
          ['Metformin', 'Doz değişmez; iftar ve sahura bölünür'],
          ['DPP-4 inhibitörleri', 'Doz değişmez; iftarda alınabilir'],
          ['SGLT2 inhibitörleri', 'Doz değişmez; iftarda alınır, iftar-sahur arası bol sıvı şartıyla'],
          ['Sülfonilüreler', 'Doz azaltılır, iftara alınır; hipoglisemi riski yüksek'],
          ['Bazal insülin', 'İftarda verilir, doz %15-30 azaltılır'],
          ['Sahur hızlı analog', 'Doz %25-50 azaltılır'],
        ]}
      />
    </div>

    <InsulinCalc />
  </div>
);

export default Ramadan;
