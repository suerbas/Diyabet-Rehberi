import React from 'react';
import { Droplets, Eye, AlertTriangle, Send } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from './ui';

const pillars = [
  { n: 1, title: 'RAS blokajı', text: 'Maksimum tolere dozda ACE-İ veya ARB (ikisi birlikte verilmez).' },
  { n: 2, title: 'SGLT2-İ', text: 'eGFR ≥ 20 ise başlanır; diyalize dek sürdürülebilir.' },
  { n: 3, title: 'Finerenon', text: 'RAS blokajına rağmen AKO ≥ 30 ve K⁺ ≤ 4,8 ise; eGFR ≥ 60: 20 mg, 25-59: 10 mg.' },
  { n: 4, title: 'GLP-1 RA', text: 'Glisemi için ek ajan; KBH progresyonu ve KV olaylarda azalma.' },
];

const KidneyEye: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-12">
    {/* Kidney */}
    <div>
      <SectionTitle icon={<Droplets size={20} />} sub="Tanı: 3-6 ay içinde ≥ 2 ölçümde AKO ≥ 30 mg/g veya eGFR < 60 mL/dk/1,73 m².">Diyabetik böbrek hastalığı (DKBH)</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {pillars.map(p => (
          <div key={p.n} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">{p.n}</span>
              <span className="font-bold text-slate-900">{p.title}</span>
            </div>
            <p className="text-sm text-slate-600">{p.text}</p>
          </div>
        ))}
      </div>
      <DataTable
        head={['Kategori', 'Değer', 'Klinik yaklaşım']}
        rows={[
          ['A1 / G1-G2', 'AKO < 30 mg/g · eGFR ≥ 60', 'Yıllık tarama, risk faktörü kontrolü'],
          ['A2', 'AKO 30-300 mg/g', 'ACE-İ/ARB başla; SGLT2-İ; 6 ayda bir kontrol'],
          ['A3 / G3a-G3b', 'AKO > 300 · eGFR 30-59', 'SGLT2-İ + finerenon; 3-6 ayda bir izlem, ilaç doz ayarları'],
          ['G4 / G5', 'eGFR < 30', 'Nefroloji izlemi, renal replasman hazırlığı'],
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card title="Finerenon izlemi" tone="sky">
          <Bullets items={['Başlamadan K⁺ ≤ 4,8 mEq/L olmalı.', '4. haftada K⁺ ve eGFR kontrolü.', 'K⁺ > 5,5 mEq/L ise ilaç kesilir.']} />
        </Card>
        <Card title="Nefroloji sevki" tone="red">
          <p className="flex gap-2"><Send size={16} className="shrink-0 mt-0.5 text-rose-600" /><span>eGFR &lt; 30, hızlı progresyon (yılda &gt; 5 mL/dk düşüş), açıklanamayan aktif idrar sedimenti veya hematüri, dirençli HT ya da hiperkalemi.</span></p>
        </Card>
      </div>
      <p className="mt-3 text-xs text-slate-500">İlaç bazında eGFR doz ayarları Tedavi sayfasındaki “eGFR &amp; Doz” sekmesindedir.</p>
    </div>

    {/* Eye */}
    <div>
      <SectionTitle icon={<Eye size={20} />} sub="Fundus bulgusuna göre izlem aralığı ve göz hekimi müdahalesi.">Diyabetik retinopati</SectionTitle>
      <DataTable
        head={['Evre', 'Fundus bulguları', 'İzlem / tedavi']}
        rows={[
          ['Retinopati yok', '—', 'Tip 2: 1-2 yılda bir; Tip 1: yıllık'],
          ['Hafif-orta NPDR', 'Mikroanevrizma, noktasal hemoraji, sert eksüda', 'Glisemi, KB, lipid kontrolü; 6-12 ayda bir'],
          ['Ağır NPDR', '4 kadranda hemoraji, ≥ 2 kadranda venöz boncuklanma, IRMA', '3-4 ayda bir göz takibi'],
          ['Proliferatif DR', 'Neovaskülarizasyon, vitreus hemorajisi', 'Panretinal lazer veya intravitreal anti-VEGF'],
          ['Diyabetik makula ödemi', 'Fovea merkezinde retinal kalınlaşma', 'İntravitreal anti-VEGF ilk seçenek'],
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card title="TEMD 2026: NAION farkındalığı" tone="amber">
          <p className="flex gap-2"><AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" /><span>GLP-1 RA kullanan hastada <strong>ani, ağrısız, tek taraflı görme kaybı</strong> veya görme alanı defekti → acil göz muayenesi (non-arteritik anterior iskemik optik nöropati).</span></p>
        </Card>
        <Card title="Erken kötüleşme" tone="amber">
          <p>HbA1c’nin çok hızlı düşürülmesi (insülin veya GLP-1 RA başlangıcı, gebelik) mevcut retinopatiyi geçici artırabilir. Yoğun tedaviden önce <strong>güncel göz dibi</strong> sağlanmalıdır.</p>
        </Card>
      </div>
      <p className="mt-3 text-xs text-slate-500">Proliferatif retinopati veya vitreus hemorajisinde ağır egzersiz ve ağırlık kaldırma önerilmez.</p>
    </div>
  </div>
);

export default KidneyEye;
