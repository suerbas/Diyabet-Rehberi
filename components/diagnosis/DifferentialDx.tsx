import React from 'react';
import { Dna, Search, TestTube } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from '../shared/ui';

const DifferentialDx: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle sub="Etiyolojik sınıflama (4 ana grup).">Diyabet tipleri</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card title="1. Tip 1 diyabet">Otoimmün (Tip 1A) veya idiyopatik mutlak insülin eksikliği.</Card>
        <Card title="2. Tip 2 diyabet">İnsülin direnci zemininde ilerleyici beta hücre disfonksiyonu.</Card>
        <Card title="3. Gestasyonel DM">Gebeliğin 2. veya 3. trimesterinde saptanan hiperglisemi.</Card>
        <Card title="4. Özel tipler">MODY, pankreatoprivik (Tip 3c), endokrinopatiler, ilaca bağlı diyabet.</Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<Search size={20} />} sub="Erişkinde Tip 2 sanılan her diyabet Tip 2 değildir.">Tip 1, LADA ve Tip 2 karşılaştırması</SectionTitle>
      <DataTable
        head={['Özellik', 'Tip 1', 'LADA', 'Tip 2']}
        rows={[
          ['Başlangıç yaşı', 'Çocukluk / genç erişkin (her yaş)', 'Genellikle > 30 yaş', 'Genellikle > 35-40 (gençlerde artıyor)'],
          ['Vücut ağırlığı', 'Zayıf veya normal', 'Normal veya hafif fazla kilolu', 'Çoğunlukla fazla kilolu / obez'],
          ['Adacık otoantikorları', 'Sıklıkla (+): GAD, IA2, ZnT8, IAA', '(+), özellikle Anti-GAD65', 'Negatif'],
          ['C-peptid / insülin ihtiyacı', 'Düşük-yok; tanıda insülin', 'Başlangıçta korunmuş; ~6 ay içinde insülin', 'Normal-yüksek; uzun süre insülinsiz'],
        ]}
      />
      <p className="text-xs text-slate-500 mt-2">LADA’da sülfonilüreden kaçınılır; erken insülin gereksinimi beklenir.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="C-peptid eşikleri" tone="sky">
        <p className="flex gap-2 mb-2"><TestTube size={16} className="shrink-0 mt-0.5 text-sky-700" /><span>Eşzamanlı plazma glukozu &gt; 80 mg/dL iken bakılır.</span></p>
        <Bullets items={[
          <><strong>&lt; 0,2 nmol/L (0,6 ng/mL):</strong> ağır insülin eksikliği; bazal-bolus gerekir</>,
          <><strong>0,2-0,6 nmol/L:</strong> ara düzey; LADA veya uzun süreli Tip 2</>,
          <><strong>&gt; 0,6 nmol/L:</strong> korunmuş rezerv; Tip 2 veya MODY lehine</>,
        ]} />
      </Card>
      <Card title="MODY şüphesi — genetik test kriterleri" tone="sky">
        <p className="flex gap-2 mb-2"><Dna size={16} className="shrink-0 mt-0.5 text-sky-700" /><span>Aşağıdakiler birlikteyse genetik değerlendirme:</span></p>
        <Bullets items={[
          '25 yaşından önce tanı, ketoasidoz öyküsü yok',
          'Ardışık ≥ 3 kuşakta otozomal dominant aile öyküsü',
          'Adacık antikorları negatif, yıllar sonra bile saptanabilir C-peptid',
          'Obezite / belirgin insülin direnci olmadan insülin ihtiyacının olmaması',
        ]} />
      </Card>
    </div>

    <div>
      <SectionTitle sub="Klinik ipuçları ve tedavi farkları.">Atipik ve sekonder diyabet formları</SectionTitle>
      <DataTable
        head={['Form', 'İpuçları', 'Tedavi özelliği']}
        rows={[
          ['GCK-MODY (MODY 2)', 'Doğumdan itibaren hafif, stabil APG (100-125); HbA1c %5,6-7,6; OGTT’de artış < 54 mg/dL', 'Gebelik dışında ilaç gerekmez'],
          ['HNF1A / HNF4A-MODY', '< 25 yaş, 3 kuşak öykü, glikozüri (HNF1A), makrozomi öyküsü (HNF4A)', 'Düşük doz sülfonilüreye çok duyarlı'],
          ['Pankreatoprivik (Tip 3c)', 'Kronik pankreatit, kistik fibroz, pankreas rezeksiyonu; ekzokrin yetmezlik', 'İnsülin + pankreatik enzim replasmanı'],
          ['İlaca bağlı', 'Glukokortikoid, atipik antipsikotik, kalsinörin inhibitörü, immün kontrol noktası inhibitörü', 'Postprandiyal hiperglisemi baskın; NPH veya bazal-bolus'],
        ]}
      />
    </div>

    <div>
      <SectionTitle sub="Otoimmünite saptanan bireylerde evreleme.">Tip 1 diyabet evreleri</SectionTitle>
      <DataTable
        head={['Evre', 'Otoantikor', 'Glisemi', 'Klinik']}
        rows={[
          ['Evre 1', '≥ 2 adacık otoantikoru', 'Normoglisemi', 'Asemptomatik; 6-12 ayda bir HbA1c/OGTT'],
          ['Evre 2', '≥ 2 adacık otoantikoru', 'Disglisemi (BAG/BGT/HbA1c %5,7-6,4)', 'Asemptomatik; teplizumab değerlendirilebilir'],
          ['Evre 3', '(+) veya (−)', 'Diyabet eşikleri', 'Poliüri, polidipsi, kilo kaybı veya DKA; insülin'],
        ]}
      />
    </div>
  </div>
);

export default DifferentialDx;
