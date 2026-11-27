import React from 'react';
import { ClipboardCheck, Eye, Droplets, Footprints, HeartPulse, Syringe, Brain } from 'lucide-react';
import { SectionTitle, DataTable, Card } from './ui';

const visitChecklist = [
  { icon: <HeartPulse size={18} />, title: 'Glisemi ve hipoglisemi', text: 'HbA1c, ev ölçümleri, son 3 aydaki hipoglisemiler, araç kullanım güvenliği.' },
  { icon: <Droplets size={18} />, title: 'Kardiyorenal ve hepatik', text: 'KB (< 130/80), LDL-K, eGFR, spot idrar AKO, FIB-4; organ koruyucu ilaç uyumu.' },
  { icon: <Footprints size={18} />, title: 'Ayak, göz, nöropati', text: 'Ayak muayenesi (monofilaman / Ipswich), yıllık göz dibi sevki, nöropatik yakınma sorgusu.' },
  { icon: <Syringe size={18} />, title: 'Enjeksiyon ve aşılar', text: 'Lipohipertrofi ve 4 mm iğne kontrolü; influenza, pnömokok, hepatit B; psikososyal destek.' },
];

const ScreeningSchedule: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<ClipboardCheck size={20} />} sub="Aile hekimliği polikliniğinde her diyabet vizitinde gözden geçirilecek 4 başlık.">Her vizit kontrol listesi</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-3">
        {visitChecklist.map(v => (
          <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex gap-3">
            <span className="p-2 rounded-lg bg-sky-100 text-sky-700 h-fit">{v.icon}</span>
            <span>
              <span className="block font-bold text-slate-900">{v.title}</span>
              <span className="block text-sm text-slate-600 mt-0.5">{v.text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <SectionTitle sub="Standart diyabet bakımında değerlendirme sıklığı.">Tarama ve izlem takvimi</SectionTitle>
      <DataTable
        head={['Değerlendirme', 'İlk vizit', '3-6 ayda bir', 'Yıllık']}
        rows={[
          ['HbA1c ve glukoz kayıtları', 'Evet', '3 ay (hedefteyse 6 ay)', 'Evet'],
          ['KB, kilo, BKİ, bel çevresi', 'Evet', 'Her vizitte', 'Evet'],
          ['eGFR (CKD-EPI) ve spot idrar AKO', 'Evet', 'KBH varsa 3-6 ay', 'Evet (Tip 1: 5. yıldan sonra)'],
          ['Lipid profili, AST/ALT, FIB-4', 'Evet', 'Lipid tedavisi değişince 4-12 hafta', 'Evet'],
          ['Ayak muayenesi', 'Evet', 'Her vizitte bakı', '10 g monofilaman + Ipswich'],
          ['Göz dibi (dilatasyonlu)', 'Tip 2: tanıda', '—', 'Normal ise 1-2 yılda bir'],
          ['B12 (metformin kullananda)', '—', '—', 'Evet'],
          ['Depresyon (PHQ-9), diyabet distresi', 'Evet', 'Tedavi değişikliğinde', 'Evet'],
        ]}
      />
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Göz muayenesi zamanlaması" tone="sky">
        <p className="flex gap-2"><Eye size={16} className="shrink-0 mt-0.5 text-sky-700" /><span><strong>Tip 2:</strong> tanıda; normalse 1-2 yılda bir. <strong>Tip 1:</strong> tanıdan 5 yıl içinde, sonra yıllık. <strong>Gebelik:</strong> gebelik öncesi, her trimester ve postpartum 1 yıl.</span></p>
      </Card>
      <Card title="Böbrek taraması" tone="sky">
        <p className="flex gap-2"><Droplets size={16} className="shrink-0 mt-0.5 text-sky-700" /><span>Tip 2’de tanıdan, Tip 1’de 5. yıldan itibaren yılda bir AKO + eGFR. Egzersiz, ateş, İYE, belirgin hiperglisemi geçici albüminüri yapar.</span></p>
      </Card>
      <Card title="Psikososyal ve kognitif" tone="sky">
        <p className="flex gap-2"><Brain size={16} className="shrink-0 mt-0.5 text-sky-700" /><span>Depresyon diyabette 2 kat sık; yıllık PHQ-9. ≥ 65 yaşta yıllık kognitif tarama. Tip 1’de insülin atlama (diabulimia) sorgulanır.</span></p>
      </Card>
    </div>

    <div>
      <SectionTitle sub="Tüm diyabetlilere önerilen erişkin aşıları.">Bağışıklama</SectionTitle>
      <DataTable
        head={['Aşı', 'Öneri']}
        rows={[
          ['İnfluenza', 'Her yıl sonbaharda tek doz'],
          ['Pnömokok', 'PCV20 tek doz veya PCV15 ardından PPSV23'],
          ['Hepatit B', '19-59 yaş seronegatif tüm diyabetlilere 3 doz'],
          ['Tdap / Td', '10 yılda bir'],
          ['Zona (RZV)', '≥ 50 yaş'],
          ['RSV', '≥ 60 yaş'],
        ]}
      />
    </div>
  </div>
);

export default ScreeningSchedule;
