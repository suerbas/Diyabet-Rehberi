import React from 'react';
import { Ban, Moon, Car, GraduationCap, Smile } from 'lucide-react';
import { SectionTitle, Card, Bullets } from '../shared/ui';

const DailyLife: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <SectionTitle icon={<Ban size={20} />}>Tütün</SectionTitle>
        <Card tone="red">
          <Bullets items={[
            'Bırakmak en etkili makro- ve mikrovasküler korumadır',
            'Her vizitte sorgulanır ve kısa danışmanlık verilir',
            'Gerekirse farmakoterapi ve sigara bırakma polikliniğine yönlendirme',
            'Bırakma sonrası kilo artışı beklenebilir; bırakmanın yararı bunu fazlasıyla karşılar',
          ]} />
        </Card>
      </div>
      <div>
        <SectionTitle icon={<Moon size={20} />}>Uyku</SectionTitle>
        <Card tone="sky">
          <Bullets items={[
            'Günde 7-8 saat kaliteli uyku',
            <>Tip 2 DM’de uyku apnesi (OSAS) sıklığı <strong>%50’nin üzerinde</strong></>,
            'Horlama, tanıklı apne, gündüz uykululuk ve sabah baş ağrısı sorgulanır',
            'Şüphede uyku kliniğine yönlendirme; CPAP insülin direncini azaltır',
          ]} />
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<Car size={20} />} sub="İnsülin veya sülfonilüre kullanan hastalara mutlaka anlatılmalı.">Araç kullanma güvenliği</SectionTitle>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Yola çıkmadan önce" tone="amber">Glukoz ölçülür. <strong>PG &lt; 90 mg/dL</strong> ise 15-20 g karbonhidrat alınmadan yola çıkılmaz.</Card>
        <Card title="Sürüş sırasında hipoglisemi" tone="amber">Araç güvenli yere çekilir, kontak kapatılır, 15 g glukoz alınır. PG &gt; 90 olduktan <strong>45 dakika sonra</strong> sürüşe devam edilir.</Card>
        <Card title="Araçta bulunmalı" tone="amber">Glukoz tableti veya meyve suyu ve glukoz ölçüm cihazı, ulaşılabilir yerde.</Card>
      </div>
      <p className="text-xs text-slate-500 mt-2">Ticari sürücülük, pilotluk, yüksekte çalışma ve ağır makine kullanımında hipoglisemi öyküsü, görme ve nöropati ayrıca değerlendirilir.</p>
    </div>

    <div>
      <SectionTitle icon={<GraduationCap size={20} />} sub="Yapılandırılmış diyabet öz-yönetim eğitimi (DSMES) dört kritik zamanda verilir.">Diyabet eğitimi</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ['1. Tanı anı', 'Temel bilgi, glukoz izlemi ve acil durum farkındalığı.'],
          ['2. Yıllık', 'Hedeflerin güncellenmesi; beceri ve beslenme tazeleme.'],
          ['3. Yeni sorun', 'Komplikasyon, psikososyal yük, finansal veya sosyal engel.'],
          ['4. Bakım geçişi', 'Tedavi değişimi, gebelik, hastane taburculuğu, yaşlanma.'],
        ].map(([t, d]) => (
          <div key={t} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="font-bold text-primary">{t}</div>
            <p className="text-sm text-slate-600 mt-1">{d}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Ağız ve diş sağlığı">
        <p className="flex gap-2"><Smile size={16} className="shrink-0 mt-0.5 text-primary" /><span>Periodontitis ile diyabet iki yönlü ilişkilidir; tedavisi HbA1c’yi %0,3-0,4 düşürür. Günde 2 kez florürlü macunla fırçalama, yılda 1-2 diş hekimi kontrolü.</span></p>
      </Card>
      <Card title="Hasta ve ailesine her vizitte">
        <Bullets items={[
          'Hipoglisemi belirtileri ve 15-15 kuralı',
          'Glukoz ölçüm zamanları ve kayıt',
          'Hasta günü kuralları (Özel Durumlar sayfası)',
          'Günlük ayak muayenesi',
        ]} />
      </Card>
    </div>
  </div>
);

export default DailyLife;
