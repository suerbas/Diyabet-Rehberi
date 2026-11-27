import React from 'react';
import { Footprints, Pill, CalendarCheck } from 'lucide-react';
import { SectionTitle, Card, Bullets } from '../shared/ui';

const Prediabetes: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div className="grid sm:grid-cols-3 gap-3">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
        <div className="text-4xl font-bold text-primary">%28,7</div>
        <div className="text-sm text-slate-600 mt-1">TURDEP-II’de izole veya kombine prediyabet</div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
        <div className="text-4xl font-bold text-emerald-600">%58</div>
        <div className="text-sm text-slate-600 mt-1">Yaşam tarzı değişikliği ile diyabete ilerleme riskinde azalma</div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
        <div className="text-4xl font-bold text-violet-600">%31</div>
        <div className="text-sm text-slate-600 mt-1">Metformin ile risk azalması</div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <SectionTitle icon={<Footprints size={20} />}>Yaşam tarzı programı</SectionTitle>
        <Card tone="green">
          <Bullets items={[
            <><strong>Kilo kaybı:</strong> ilk 6 ayda başlangıç kilosunun ≥ %7’si</>,
            <><strong>Fiziksel aktivite:</strong> haftada ≥ 150 dk tempolu yürüyüş + direnç egzersizi</>,
            <><strong>Beslenme:</strong> Akdeniz/DASH tipi; doymuş yağ &lt; %7, posa ≥ 14 g/1000 kkal, şekerli içecekler kesilir</>,
            <><strong>FINDRISK ≥ 15:</strong> yapılandırılmış, yoğun danışmanlık programı</>,
          ]} />
        </Card>
      </div>
      <div>
        <SectionTitle icon={<Pill size={20} />}>Metformin kimlere?</SectionTitle>
        <Card tone="sky">
          <Bullets items={[
            'Kombine prediyabet (BAG + BGT birlikte)',
            '< 60 yaş ve BKİ ≥ 35 kg/m²',
            'Gestasyonel diyabet öyküsü olan kadınlar',
            'Yaşam tarzı değişikliğine rağmen HbA1c’nin yükselmeye devam etmesi',
          ]} />
          <p className="mt-3 text-xs text-slate-500">Uzun süreli kullanımda yıllık B12 izlenir.</p>
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<CalendarCheck size={20} />}>İzlem</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card title="Yılda bir">APG ve/veya HbA1c ile diyabete ilerleme taraması.</Card>
        <Card title="KV risk faktörleri">KB, lipid profili, sigara ve kilo her vizitte değerlendirilir; prediyabet de KV riski artırır.</Card>
        <Card title="Gebelik planlayanlar">GDM öyküsü veya prediyabet varsa gebelik öncesi glisemik değerlendirme.</Card>
      </div>
    </div>
  </div>
);

export default Prediabetes;
