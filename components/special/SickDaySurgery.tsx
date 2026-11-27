import React from 'react';
import { Thermometer, Siren, Scissors, ClipboardCheck } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from './ui';

const sadmans = [
  ['S', 'Sülfonilüreler', 'Hipoglisemi'],
  ['A', 'ACE inhibitörleri', 'Akut böbrek hasarı'],
  ['D', 'Diüretikler', 'Dehidratasyon, AKH'],
  ['M', 'Metformin', 'Laktik asidoz'],
  ['A', 'ARB', 'Akut böbrek hasarı'],
  ['N', 'NSAİİ', 'Akut böbrek hasarı'],
  ['S', 'SGLT2 inhibitörleri', 'Öglisemik DKA'],
];

const SickDaySurgery: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Thermometer size={20} />} sub="Ateş, enfeksiyon, kusma veya ishal günlerinde hastaya verilecek kurallar.">Hasta günü kuralları</SectionTitle>
      <div className="grid md:grid-cols-2 gap-4">
        <Card tone="sky" title="Temel kurallar">
          <Bullets items={[
            <><strong>İnsülin asla kesilmez:</strong> stres hormonları ihtiyacı artırır; iştahsızlıkta bile bazal sürer</>,
            'Glukoz 3-4 saatte bir ölçülür',
            <>Glukoz &gt; 250 mg/dL veya bulantı / kusma / karın ağrısında <strong>3-4 saatte bir keton</strong> bakılır</>,
            'Şekersiz sıvılarla hidrasyon; oral alım azsa küçük porsiyon şekerli sıvılar',
          ]} />
        </Card>
        <Card tone="red" title="Acil servise başvuru">
          <p className="flex gap-2 mb-2"><Siren size={16} className="shrink-0 mt-0.5 text-rose-600" /><span>Aşağıdakilerden biri varsa:</span></p>
          <Bullets items={[
            'Sürekli kusma, sıvı tutamama',
            'Kan / idrar ketonu pozitif',
            'Hızlı, derin solunum veya karın ağrısı',
            'Bilinç değişikliği',
          ]} />
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle sub="Dehidratasyon yapan akut hastalıkta geçici olarak kesilir; normal yeme-içmeye dönüldükten 24-48 saat sonra yeniden başlanır.">SADMANS — geçici kesilecek ilaçlar</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {sadmans.map(([l, n, r], i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-primary">{l}</div>
            <div className="text-xs font-semibold text-slate-800 mt-1">{n}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{r}</div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <SectionTitle icon={<Scissors size={20} />} sub="Elektif cerrahi ve girişimler öncesi ilaç düzenlemesi.">Perioperatif yönetim</SectionTitle>
      <DataTable
        head={['İlaç', 'Ameliyat öncesi', 'Ameliyat günü / sonrası']}
        rows={[
          ['SGLT2 inhibitörleri', '3 gün önce kesilir (ertugliflozin 4 gün)', 'Öglisemik DKA riski nedeniyle verilmez; oral alım düzelince başlanır'],
          ['Metformin', 'Ameliyat sabahı alınmaz; eGFR < 60 veya iyotlu kontrastta 48 saat ara', 'Renal fonksiyon ve oral alım normale dönünce başlanır'],
          ['Haftalık GLP-1 RA', '1 hafta önce aspirasyon riski açısından değerlendirilir', 'Gecikmiş mide boşalmasına dikkat'],
          ['Bazal insülin', 'Kesilmez; ameliyat sabahı / önceki akşam dozu %20-25 azaltılır', 'Tip 1 DM’de bazal asla tamamen kesilmez'],
          ['Prandiyal insülin, sülfonilüre', 'Aç kalınan sabah atlanır', 'Gerekirse GİK veya İV insülin infüzyonu'],
        ]}
      />
      <p className="text-xs text-slate-500 mt-2">Hastanede hedef PG 140-180 mg/dL. Tek başına kayan ölçek (sliding scale) insülin önerilmez; oral alan hastada bazal-bolus + düzeltme, aç hastada bazal + düzeltme.</p>
    </div>

    <div>
      <SectionTitle icon={<ClipboardCheck size={20} />}>Taburculuk sonrası birinci basamak</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card title="İlaç uzlaşması">Yatış öncesi ilaçlar ile hastanede başlanan / değiştirilenler karşılaştırılır; mükerrer veya eksik ilaç önlenir.</Card>
        <Card title="İnsülin eğitimi">Yeni insülin başlananlarda doz hazırlama, uygulama ve hipoglisemi tedavisi teyit edilir.</Card>
        <Card title="Erken kontrol">Genellikle 1 ay içinde; yeni insülin veya ağır olay sonrası daha erken.</Card>
      </div>
    </div>
  </div>
);

export default SickDaySurgery;
