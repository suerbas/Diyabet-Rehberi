import React from 'react';
import { Candy, Timer, Car, Siren, Thermometer, AlertTriangle } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from '../shared/ui';

const levels = [
  { level: 'Düzey 1', range: '54-69 mg/dL', tone: 'bg-amber-50 border-amber-200', head: 'text-amber-800', text: 'Uyarı eşiği. Hızlı etkili karbonhidrat ile hasta kendisi tedavi eder.' },
  { level: 'Düzey 2', range: '< 54 mg/dL', tone: 'bg-orange-50 border-orange-200', head: 'text-orange-800', text: 'Klinik olarak anlamlı; nöroglikopenik belirtiler başlar. Tedavi + neden araştırması.' },
  { level: 'Düzey 3', range: 'Ağır atak', tone: 'bg-rose-50 border-rose-200', head: 'text-rose-800', text: 'Bilinç değişikliği, başkasının yardımı gerekir. 1 mg İM/nazal glukagon veya İV dekstroz.' },
];

const AcuteComplications: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-12">
    {/* Hypoglycemia */}
    <div>
      <SectionTitle icon={<Candy size={20} />} sub="Sınıflama, 15-15 kuralı ve hipoglisemiye duyarsızlık.">Hipoglisemi</SectionTitle>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {levels.map(l => (
          <div key={l.level} className={`border rounded-xl p-4 ${l.tone}`}>
            <div className={`font-bold ${l.head}`}>{l.level} <span className="font-semibold text-slate-700">· {l.range}</span></div>
            <p className="text-sm text-slate-700 mt-1">{l.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 font-bold text-lg mb-3"><Timer size={20} className="text-sky-300" /> 15-15 kuralı</div>
        <ol className="grid sm:grid-cols-3 gap-3 text-sm">
          <li className="bg-white/10 rounded-xl p-3"><strong className="block text-sky-200">1. 15 g glukoz</strong>3-4 küp şeker veya 150 mL meyve suyu.</li>
          <li className="bg-white/10 rounded-xl p-3"><strong className="block text-sky-200">2. 15 dk bekle</strong>Glukozu tekrar ölç; &lt; 70 mg/dL ise tekrarla.</li>
          <li className="bg-white/10 rounded-xl p-3"><strong className="block text-sky-200">3. Düzelince</strong>Kompleks karbonhidratlı öğün/ara öğün tüket.</li>
        </ol>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Tetikleyiciler">
          <Bullets items={[
            'Öğün atlama veya geç kalma',
            'Planlanmamış egzersiz (24 saate kadar risk)',
            'Aç karnına alkol (24 saate kadar gecikmiş hipoglisemi)',
            'Böbrek / karaciğer yetmezliği',
            'Doz hatası; lipohipertrofiden sağlam dokuya geçiş',
          ]} />
        </Card>
        <Card title="Hipoglisemiye duyarsızlık (HAAF)" tone="amber">
          <p>Tekrarlayan hipoglisemiler otonom uyarı belirtilerini ortadan kaldırır. Hedefler <strong>2-3 hafta gevşetilerek</strong> (CGM’de TBR &lt; %1) belirtiler geri kazanılır. Sülfonilüre varsa kesilir.</p>
        </Card>
        <Card title="Araç kullanımı" tone="sky">
          <p className="flex gap-2"><Car size={16} className="shrink-0 mt-0.5" /><span>İnsülin/SU kullananlar sürüş öncesi ölçer; <strong>&lt; 90 mg/dL</strong> ise 15-20 g KH almadan yola çıkmaz. Yolda belirti olursa araç kenara çekilir, glukoz alınır; PG &gt; 90 olduktan <strong>45 dk sonra</strong> devam edilir.</span></p>
        </Card>
      </div>
    </div>

    {/* DKA / HHS */}
    <div>
      <SectionTitle icon={<Siren size={20} />} sub="Birinci basamakta amaç tanıyı düşünmek, ilk sıvıyı başlatmak ve acil sevktir.">Hiperglisemik aciller: DKA ve HHD</SectionTitle>
      <DataTable
        head={['', 'Diyabetik ketoasidoz (DKA)', 'Hiperozmolar hiperglisemik durum (HHD)']}
        rows={[
          ['Glukoz', '> 250 mg/dL (SGLT2-İ ile öglisemik olabilir)', '> 600 mg/dL'],
          ['pH / HCO₃', 'pH < 7,30; HCO₃ < 18; anyon açığı > 12', 'pH > 7,30; HCO₃ > 18'],
          ['Ozmolalite', 'Değişken', '> 320 mOsm/kg (2×Na + glukoz/18)'],
          ['Gelişim', '< 24 saatte, hızlı', 'Günler-haftalar içinde, sinsi'],
          ['Klinik', 'Bulantı, kusma, karın ağrısı, Kussmaul solunumu, aseton kokusu', 'Ağır dehidratasyon, letarji, stupor, fokal nörolojik bulgu'],
          ['İlk saat sıvı', '1000 mL %0,9 NaCl', '1000-1500 mL %0,9 NaCl'],
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card title="Acil sevk öncesi" tone="red">
          <Bullets items={[
            'Damar yolu, %0,9 NaCl başlat; kan glukozu, keton, elektrolitler, kan gazı',
            'K⁺ < 3,3 mEq/L iken insülin verilmez (aritmi riski)',
            'Tetikleyiciyi sorgula: enfeksiyon, insülin atlama, MI, inme, pankreatit, SGLT2-İ',
            'HHD’de mortalite DKA’dan yüksektir; yaşlıda bilinç değişikliğinde mutlaka düşün',
          ]} />
        </Card>
        <Card title="Öglisemik DKA (SGLT2-İ)" tone="amber">
          <p className="flex gap-2"><AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" /><span>Glukoz 180-250 mg/dL olsa bile kusma, karın ağrısı ve halsizlikte <strong>kan ketonu</strong> bakılır. SGLT2-İ derhal kesilir; düşük karbonhidratlı diyet ve akut hastalık risk artırır.</span></p>
        </Card>
      </div>
    </div>

    {/* Sick day */}
    <div>
      <SectionTitle icon={<Thermometer size={20} />} sub="Ateş, enfeksiyon, kusma ve ishal günlerinde hastaya verilecek talimatlar.">Hasta günü kuralları</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card title="İnsülin kesilmez">Stres hormonları ihtiyacı artırır; iştahsızlıkta bile bazal insülin sürer.</Card>
        <Card title="Keton bak">Glukoz &gt; 250 mg/dL veya bulantı/kusma/karın ağrısında 3-4 saatte bir.</Card>
        <Card title="Geçici kes">SGLT2-İ, metformin, diüretik ve ACE-İ/ARB; dehidratasyon düzelince yeniden başla.</Card>
        <Card title="Acile başvur" tone="red">Kalıcı kusma, keton pozitifliği, hızlı solunum veya bilinç değişikliği.</Card>
      </div>
    </div>
  </div>
);

export default AcuteComplications;
