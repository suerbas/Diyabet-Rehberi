import React, { useState } from 'react';
import { Activity, HeartPulse, ShieldAlert, Check } from 'lucide-react';
import { SectionTitle, Card, Bullets, NumField, parseNum } from '../shared/ui';

type Ketone = 'bilinmiyor' | 'negatif' | 'pozitif';
type Advice = { title: string; text: string[]; tone: string };

function exerciseAdvice(pg: number | null, hypoRisk: boolean, ketone: Ketone): Advice | null {
  if (pg === null) return null;
  if (pg < 70) {
    return { title: 'Egzersize başlanmaz — hipoglisemi', text: ['15 g hızlı etkili karbonhidrat alınır, 15 dakika sonra tekrar ölçülür (15-15 kuralı).', 'Glukoz normale döndükten ve bir ara öğün alındıktan sonra egzersiz planlanır.'], tone: 'border-rose-300 bg-rose-50 text-rose-900' };
  }
  if (pg < 100 && hypoRisk) {
    return { title: 'Önce karbonhidrat al', text: ['Başlamadan 15-30 g hızlı etkili karbonhidrat alınır.', 'Planlı egzersizde öncesindeki bolus veya bazal doz azaltılabilir.', 'Geç hipoglisemi riski: yatmadan önce ara öğün ve glukoz ölçümü.'], tone: 'border-amber-300 bg-amber-50 text-amber-900' };
  }
  if (pg <= 250) {
    const text = ['Çoğu egzersiz türü için güvenli başlangıç aralığı. Su tüketimi sürdürülür.'];
    if (hypoRisk) text.push('İnsülin / SU kullanıyor: egzersiz sırasında ve sonrasında hipoglisemi belirtilerine dikkat; yanında hızlı karbonhidrat bulunsun.');
    return { title: 'Egzersiz yapılabilir', text, tone: 'border-emerald-300 bg-emerald-50 text-emerald-900' };
  }
  if (ketone === 'pozitif') {
    return { title: 'Egzersiz yapılmaz', text: ['PG > 250 mg/dL ve keton pozitif: egzersiz hiperglisemi ve ketozu ağırlaştırır.', 'Sıvı ve düzeltme insülini ile tedavi; keton negatifleşene kadar ertelenir.'], tone: 'border-rose-300 bg-rose-50 text-rose-900' };
  }
  if (ketone === 'negatif') {
    return { title: 'Hafif-orta egzersiz yapılabilir', text: ['Keton negatif: hafif-orta egzersiz yapılabilir, bol su içilir.', 'Ağır egzersiz hiperglisemiyi daha da yükseltebilir; kaçınılır.'], tone: 'border-sky-300 bg-sky-50 text-sky-900' };
  }
  return { title: 'Önce keton bakılmalı', text: ['PG > 250 mg/dL: başlamadan kan veya idrar ketonu bakılır. Sonucu aşağıdan seçin.'], tone: 'border-orange-300 bg-orange-50 text-orange-900' };
}

const ExerciseCheck: React.FC = () => {
  const [pg, setPg] = useState('');
  const [hypoRisk, setHypoRisk] = useState(true);
  const [ketone, setKetone] = useState<Ketone>('bilinmiyor');
  const v = parseNum(pg);
  const advice = exerciseAdvice(v, hypoRisk, ketone);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><ShieldAlert size={20} className="text-primary" /> Egzersiz öncesi glukoz kontrolü</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Egzersizden hemen önce ölçülen değere göre öneri.</p>
      <div className="grid sm:grid-cols-2 gap-4 items-end">
        <NumField label="Egzersiz öncesi PG" value={pg} onChange={setPg} placeholder="örn. 85" suffix="mg/dL" />
        <button onClick={() => setHypoRisk(h => !h)} aria-pressed={hypoRisk}
          className={`flex items-center gap-3 p-2.5 rounded-xl border text-left text-sm ${hypoRisk ? 'border-primary bg-sky-50' : 'border-slate-200'}`}>
          <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${hypoRisk ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>{hypoRisk && <Check size={14} />}</span>
          <span className="font-semibold text-slate-800">İnsülin veya sülfonilüre kullanıyor</span>
        </button>
      </div>
      {v !== null && v > 250 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700">Keton:</span>
          {(['bilinmiyor', 'negatif', 'pozitif'] as Ketone[]).map(k => (
            <button key={k} onClick={() => setKetone(k)} aria-pressed={ketone === k}
              className={`px-3 py-1.5 rounded-lg border capitalize ${ketone === k ? 'bg-primary text-white border-primary' : 'border-slate-200 text-slate-600'}`}>{k}</button>
          ))}
        </div>
      )}
      <div className="mt-5" aria-live="polite">
        {advice ? (
          <div className={`border rounded-xl p-4 ${advice.tone}`}>
            <div className="font-bold text-lg">{advice.title}</div>
            <ul className="mt-1 space-y-1 text-sm">{advice.text.map(t => <li key={t}>{t}</li>)}</ul>
          </div>
        ) : <p className="text-sm text-slate-500">Glukoz değerini girin.</p>}
      </div>
    </div>
  );
};

const HeartRate: React.FC = () => {
  const [age, setAge] = useState('');
  const a = parseNum(age);
  const max = a !== null && a > 0 && a < 120 ? 220 - a : null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><HeartPulse size={20} className="text-primary" /> Orta şiddet hedef nabız</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Maksimal kalp hızının (220 − yaş) %50-70’i.</p>
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <NumField label="Yaş" value={age} onChange={setAge} placeholder="örn. 55" suffix="yıl" />
        <div className="border border-sky-200 bg-sky-50 rounded-xl p-4 text-center" aria-live="polite">
          <div className="text-xs text-sky-700">Hedef nabız aralığı</div>
          <div className="text-2xl font-bold text-sky-900">{max !== null ? `${Math.round(max * 0.5)}-${Math.round(max * 0.7)} /dk` : '—'}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">Beta bloker kullananlarda ve otonom nöropatide nabız yanıtı körelir; “konuşabilir ama şarkı söyleyemez” düzeyi pratik ölçüttür.</p>
    </div>
  );
};

const Exercise: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div>
      <SectionTitle icon={<Activity size={20} />} sub="Hastaya yazılı “egzersiz reçetesi” verilmesi önerilir.">Fiziksel aktivite reçetesi</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-3">
        <Card title="Aerobik" tone="sky">Haftada en az <strong>150 dk</strong> orta şiddette (tempolu yürüyüş, yüzme, bisiklet), en az <strong>3 güne</strong> yayılmış.</Card>
        <Card title="Direnç ve esneklik" tone="sky">Haftada <strong>2-3 gün</strong>, ardışık olmayan günlerde büyük kas gruplarına direnç egzersizi.</Card>
        <Card title="Oturma süresi" tone="sky">Uzun oturma <strong>her 30 dakikada</strong> bir kısa yürüyüş veya hafif hareketle bölünür.</Card>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <ExerciseCheck />
      <HeartRate />
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Ağır egzersizin yasak olduğu durumlar" tone="red">
        <Bullets items={[
          'Proliferatif retinopati veya vitreus hemorajisi (ağır kaldırma, ıkınma, baş aşağı pozisyon)',
          'Aktif diyabetik ayak ülseri: yalnızca yük taşımayan egzersiz (kol egzersizleri, oturarak); ülser kapanana kadar havuz yok',
          'PG > 250 mg/dL ve keton pozitif',
        ]} />
      </Card>
      <Card title="Güvenlik ipuçları" tone="green">
        <Bullets items={[
          'Nöropatide uygun ayakkabı ve egzersiz sonrası ayak kontrolü',
          'Otonom nöropati veya bilinen KAH’ta yoğun programdan önce kardiyak değerlendirme',
          'Ağırlık taşıyıcı egzersiz kemik sağlığını da korur',
        ]} />
      </Card>
    </div>
  </div>
);

export default Exercise;
