import React from 'react';
import { Utensils, Hand, Wine, Fish } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from '../shared/ui';

const Nutrition: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Utensils size={20} />} sub="Akdeniz veya DASH tipi beslenme; tek bir “diyabet diyeti” yoktur, hastanın alışkanlıklarına göre bireyselleştirilir.">Makro besin dağılımı</SectionTitle>
      <DataTable
        head={['Besin öğesi', 'Günlük enerjinin', 'Pratik hedef']}
        rows={[
          ['Karbonhidrat', '%45-60', 'En az 130 g/gün; tam tahıl, baklagil, sebze ağırlıklı'],
          ['Yağ', '%20-35', 'Doymuş yağ < %7, trans yağ sıfır, kolesterol < 200 mg/gün'],
          ['Protein', '%15-20', '0,8-1,0 g/kg/gün; diyabetik böbrek hastalığında 0,8 g/kg'],
          ['İlave şeker', '< %5', 'Şekerli içecekler tamamen kesilir'],
        ]}
      />
    </div>

    <div className="grid sm:grid-cols-4 gap-3">
      {[['Tuz', '< 5 g/gün'], ['Posa', '25-35 g/gün'], ['Yağlı balık', '≥ 2 porsiyon/hafta'], ['1 KH değişimi', '15 g karbonhidrat']].map(([l, v]) => (
        <div key={l} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-xs text-slate-500">{l}</div>
          <div className="text-lg font-bold text-slate-900 mt-1">{v}</div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="shrink-0 w-14 h-14 bg-yellow-300 border-2 border-black flex items-center justify-center"><Hand size={30} /></div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-1">Porsiyon kontrolü: el modeli</h3>
        <p className="text-slate-700 text-sm mb-3">Kalori hesabı yerine hastaya kendi elini ölçü olarak kullanmayı öğretin.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-black text-sm">
          {[['Avuç içi', 'Protein'], ['İki avuç / yumruk', 'Sebze'], ['Bir avuç', 'Karbonhidrat'], ['Başparmak', 'Yağ']].map(([a, b], i) => (
            <div key={a} className={`p-2 text-center border-black ${i % 2 ? 'border-l-2' : ''} ${i > 1 ? 'border-t-2 md:border-t-0' : ''} ${i === 2 ? 'md:border-l-2' : ''}`}>
              <span className="block font-bold">{a}</span><span className="text-slate-700">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Karbonhidrat kalitesi" tone="green">
        <p className="flex gap-2 mb-2"><Fish size={16} className="shrink-0 mt-0.5 text-emerald-700" /><span>Ne kadar değil, hangi karbonhidrat:</span></p>
        <Bullets items={[
          'Düşük glisemik indeksli, az işlenmiş gıdalar tokluk piklerini azaltır',
          'Posa 14 g / 1000 kkal: çözünür ve çözünmez lif birlikte',
          'Beyaz ekmek, pirinç ve meyve suyu yerine tam tahıl, bulgur, bütün meyve',
          'İnsülin kullananlarda öğün KH miktarı tutarlı olmalı veya KH sayımı öğretilmeli',
        ]} />
      </Card>
      <Card title="Alkol" tone="amber">
        <p className="flex gap-2 mb-2"><Wine size={16} className="shrink-0 mt-0.5 text-amber-600" /><span>Kullanıyorsa sınırlar:</span></p>
        <Bullets items={[
          <>Kadında <strong>≤ 1</strong>, erkekte <strong>≤ 2</strong> standart kadeh/gün</>,
          'Aç karnına içilmez; mutlaka karbonhidratlı yiyecekle',
          <>Karaciğerde glukoz yapımını baskılar: <strong>24 saate kadar gecikmiş hipoglisemi</strong> (insülin / SU alanlarda)</>,
          'Yatmadan önce glukoz ölçümü önerilir',
        ]} />
      </Card>
    </div>

    <div className="grid sm:grid-cols-3 gap-3">
      <Card title="Takviyeler">Eksiklik kanıtlanmadıkça rutin antioksidan, krom veya vitamin takviyesi önerilmez.</Card>
      <Card title="Metformin ve B12">Uzun süreli metformin kullananlarda yılda bir B12 bakılır.</Card>
      <Card title="Tatlandırıcılar">Şekerli ürünlerin yerine geçiş için ölçülü kullanılabilir; uzun vadede su tercih edilir.</Card>
    </div>
  </div>
);

export default Nutrition;
