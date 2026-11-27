import React from 'react';
import { School, Siren, Search, Ruler } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from '../shared/ui';

const Pediatric: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <Card tone="red" title="Çocukta Tip 1 diyabet şüphesi = aynı gün sevk">
      <p className="flex gap-2"><Siren size={16} className="shrink-0 mt-0.5 text-rose-600" />
        <span>Poliüri, polidipsi, gece altını ıslatma, kilo kaybı veya halsizliği olan çocukta parmak ucu glukozu bakılır. Hiperglisemi saptanırsa ek test beklemeden aynı gün çocuk endokrinoloji / acile yönlendirilir; DKA hızla gelişebilir.</span>
      </p>
    </Card>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <SectionTitle sub="Çoğu çocuk ve genç için.">Glisemik hedefler</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {[['HbA1c', '< %7,0'], ['Açlık / öğün öncesi', '70-130 mg/dL'], ['CGM TIR (70-180)', '> %70'], ['TBR (< 70)', '< %4']].map(([l, v]) => (
            <div key={l} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">{l}</div>
              <div className="text-xl font-bold text-slate-900 mt-1">{v}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">Küçük çocuklarda ve hipoglisemi farkındalığı azalmışsa hedefler esnetilir.</p>
      </div>
      <div>
        <SectionTitle icon={<Search size={20} />}>Tip 2 diyabet taraması</SectionTitle>
        <Card tone="sky">
          <Bullets items={[
            <><strong>Kimler:</strong> BKİ &gt; 85. persentil ve ≥ 1 ek risk faktörü (ailede T2DM, GDM’li anne, akantozis nigrikans, PKOS, HT, dislipidemi)</>,
            <><strong>Ne zaman:</strong> 10 yaşında veya puberte başladıysa daha erken</>,
            <><strong>Sıklık:</strong> 2 yılda bir (APG, HbA1c veya OGTT)</>,
          ]} />
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle sub="Pediatrik Tip 2 diyabette başlangıç tedavisi; izlem çocuk endokrinolojisi ile birlikte.">Tip 2 diyabette ilk tedavi</SectionTitle>
      <DataTable
        head={['Başvuru durumu', 'İlk seçenek', 'İzlem']}
        rows={[
          ['HbA1c < %8,5, metabolik stabil', 'Yaşam tarzı + metformin', 'Hedefe ulaşılamazsa GLP-1 RA veya insülin eklenir'],
          ['HbA1c ≥ %8,5 veya PG ≥ 250 (ketoz yok)', 'Bazal insülin + metformin', 'Glisemi düzelince insülin azaltılabilir'],
          ['DKA / HHD', 'Acil sıvı + İV insülin; asidoz düzelince SC insülin + metformin', 'Gebelik potansiyeli olan adölesanda teratojenite uyarısı'],
        ]}
      />
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Büyüme ve gelişme">
        <p className="flex gap-2"><Ruler size={16} className="shrink-0 mt-0.5 text-primary" /><span>Her vizitte boy, kilo, BKİ persentili ve Tanner evresi kaydedilir.</span></p>
      </Card>
      <Card title="Komplikasyon taraması">Tip 1’de puberte başlangıcı veya ≥ 10-11 yaşta (2-5 yıl diyabet süresi sonrası) göz muayenesi ve AKO / eGFR. Tip 2’de tanıda başlanır.</Card>
      <Card title="Okul ve geçiş">
        <p className="flex gap-2"><School size={16} className="shrink-0 mt-0.5 text-primary" /><span>Okul yönetim planı: hipoglisemi kiti, glukagon, egzersiz öncesi karbonhidrat. 18 yaş civarı planlı erişkin kliniğine devir.</span></p>
      </Card>
    </div>
  </div>
);

export default Pediatric;
