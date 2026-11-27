import React, { useState } from 'react';
import { Footprints, Hand, Siren, Flame, ShieldCheck, RotateCcw } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets } from './ui';

const toes = [
  { id: 'r1', side: 'Sağ', toe: '1. parmak' },
  { id: 'r3', side: 'Sağ', toe: '3. parmak' },
  { id: 'r5', side: 'Sağ', toe: '5. parmak' },
  { id: 'l1', side: 'Sol', toe: '1. parmak' },
  { id: 'l3', side: 'Sol', toe: '3. parmak' },
  { id: 'l5', side: 'Sol', toe: '5. parmak' },
];

type Answer = 'hissetti' | 'hissetmedi';

const IpswichTest: React.FC = () => {
  const [ans, setAns] = useState<Record<string, Answer>>({});
  const done = Object.keys(ans).length;
  const missed = Object.values(ans).filter(a => a === 'hissetmedi').length;
  const complete = done === toes.length;
  const lossOfSensation = missed >= 2;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Hand size={20} className="text-primary" /> Ipswich dokunma testi</h4>
          <p className="text-sm text-slate-500 mt-1">Hasta gözleri kapalı. İşaret parmağı ucuyla her parmağın pulpasına 1-2 saniye hafifçe dokunun (bastırmayın, vurmayın). Hastanın yanıtını işaretleyin.</p>
        </div>
        {done > 0 && (
          <button onClick={() => setAns({})} className="text-xs text-slate-500 flex items-center gap-1 shrink-0"><RotateCcw size={14} /> Sıfırla</button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {['Sağ', 'Sol'].map(side => (
          <div key={side}>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">{side} ayak</div>
            <div className="space-y-2">
              {toes.filter(t => t.side === side).map(t => (
                <div key={t.id} className="flex items-center justify-between gap-2 border border-slate-200 rounded-xl p-2 pl-3">
                  <span className="text-sm font-semibold text-slate-800">{t.toe}</span>
                  <div className="flex gap-1">
                    {(['hissetti', 'hissetmedi'] as Answer[]).map(a => {
                      const on = ans[t.id] === a;
                      const color = a === 'hissetti' ? 'bg-emerald-600 border-emerald-600' : 'bg-rose-600 border-rose-600';
                      return (
                        <button key={a} aria-pressed={on} onClick={() => setAns(p => ({ ...p, [t.id]: a }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${on ? `${color} text-white` : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                          {a === 'hissetti' ? 'Hissetti' : 'Hissetmedi'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5" aria-live="polite">
        {lossOfSensation ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-900 p-4">
            <div className="font-bold">Koruyucu duyu kaybı ({missed}/6 dokunuş hissedilmedi)</div>
            <p className="text-sm mt-1">Yüksek ayak ülseri riski. Deformite veya PAH da varsa 1-3 ayda bir ayak kontrolü, özel tabanlık/ayakkabı ve ayak bakımı eğitimi.</p>
          </div>
        ) : complete ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 p-4">
            <div className="font-bold">Normal ({missed}/6 hissedilmedi)</div>
            <p className="text-sm mt-1">Koruyucu duyu korunmuş. Yıllık tarama ve günlük ayak bakımı eğitimi.</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">{done}/6 dokunuş değerlendirildi. 6 dokunuştan ≥ 2’sinin hissedilmemesi koruyucu duyu kaybını gösterir.</p>
        )}
      </div>
    </div>
  );
};

const NeuropathyFoot: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-12">
    <div>
      <SectionTitle icon={<Footprints size={20} />} sub="Ekipman gerektirmeyen ve 10 g monofilaman ile uyumlu, TEMD 2026’da eklenen tarama testi.">Nöropati taraması</SectionTitle>
      <IpswichTest />
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <Card title="10 g monofilaman">Plantar noktalara, monofilaman C şeklinde bükülene dek dik bastırılır.</Card>
        <Card title="128 Hz diyapazon">Titreştirilip başparmak dorsumuna konur; vibrasyon duyusu sorgulanır.</Card>
        <Card title="Aşil refleksi">Hafif dorsifleksiyondaki tendona vurulur; plantar fleksiyon izlenir.</Card>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Ağrılı nöropati tedavisi">
        <Bullets items={[
          <><strong>Gabapentinoid:</strong> pregabalin 150-600 mg/gün veya gabapentin 900-3600 mg/gün</>,
          <><strong>SNRI:</strong> duloksetin 60-120 mg/gün veya venlafaksin</>,
          <><strong>Topikal:</strong> %8 kapsaisin bant veya %5 lidokain (lokalize ağrı)</>,
          'Opioidler rutin tedavide önerilmez. B12 eksikliği dışlanmalı.',
        ]} />
      </Card>
      <Card title="Otonom nöropati">
        <Bullets items={[
          <><strong>Kardiyak:</strong> istirahat taşikardisi, egzersiz intoleransı, sessiz iskemi</>,
          <><strong>Ortostatik hipotansiyon:</strong> 3 dk içinde SKB ≥ 20 / DKB ≥ 10 mmHg düşüş; diüretik, alfa-bloker, TSA gözden geçirilir</>,
          <><strong>Gastroparezi:</strong> erken doyma, kusma, açıklanamayan postprandiyal hipoglisemi; az ve sık öğün</>,
          <><strong>Mesane / erektil disfonksiyon:</strong> rezidüel idrar; PDE-5 inhibitörü (nitrat yoksa)</>,
        ]} />
      </Card>
    </div>

    <div>
      <SectionTitle icon={<Flame size={20} />} sub="Ülser derinliği ve enfeksiyon şiddetine göre yaklaşım.">Diyabetik ayak ülseri</SectionTitle>
      <DataTable
        head={['Wagner', 'Lezyon', 'Temel yaklaşım']}
        rows={[
          ['Evre 0', 'Açık ülser yok; yüksek riskli ayak (nasır, çekiç parmak, Charcot)', 'Podolojik bakım, koruyucu ayakkabı'],
          ['Evre 1', 'Yüzeyel, tam kat cilt ülseri', 'Yükten kurtarma, debridman, nemli pansuman'],
          ['Evre 2', 'Tendon, kapsül veya kemiğe uzanan derin ülser', 'Cerrahi debridman, total temas alçısı'],
          ['Evre 3', 'Apse, osteomiyelit, septik artrit', 'Yatış, drenaj, İV antibiyotik'],
          ['Evre 4-5', 'Parmak/ön ayak veya tüm ayak gangreni', 'Revaskülarizasyon, amputasyon düzeyi'],
        ]}
      />
      <div className="mt-4">
        <DataTable
          head={['Enfeksiyon', 'Bulgular', 'Tedavi']}
          rows={[
            ['Hafif', 'Yüzeyel; eritem < 2 cm; sistemik bulgu yok', 'Ayaktan oral antibiyotik 1-2 hafta + yara bakımı'],
            ['Orta', 'Eritem > 2 cm veya derin doku/kemik tutulumu', 'Kültür, cerrahi debridman, oral/parenteral antibiyotik'],
            ['Ağır', 'Ateş, taşikardi, hipotansiyon, lökositoz', 'Acil yatış, İV geniş spektrum, cerrahi konsültasyon'],
          ]}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card title="Acil sevk" tone="red">
          <p className="flex gap-2"><Siren size={16} className="shrink-0 mt-0.5 text-rose-600" /><span>Derin ülser, pürülan akıntı, selülit, kritik iskemi veya Charcot şüphesi.</span></p>
        </Card>
        <Card title="Akut Charcot şüphesi" tone="amber">
          <p>Nöropatili hastada tek taraflı <strong>sıcak (&gt; 2 °C fark), şiş, kızarık</strong> ayak. Selülit, DVT, gut ve osteomiyelitten ayırt edilir. Yük verme hemen durdurulur; erken dönemde grafi normal olabilir, MRG altın standarttır.</p>
        </Card>
      </div>
    </div>

    <div>
      <SectionTitle icon={<ShieldCheck size={20} />} sub="Hastaya ve yakınına verilecek günlük ayak bakımı eğitimi.">Ayak bakımı kuralları</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Her gün bak">Taban, parmak araları ve topuk; gerekirse ayna veya yakın desteği.</Card>
        <Card title="Yıka ve kurula">Ilık su (&lt; 37 °C); parmak araları nazikçe kurulanır.</Card>
        <Card title="Nemlendir">Taban ve topuğa krem; parmak aralarına sürülmez.</Card>
        <Card title="Ayakkabı ve çorap">Geniş burunlu, dikişsiz, yumuşak içli; pamuklu, sıkmayan çorap. Yalınayak yürünmez.</Card>
        <Card title="Yasaklar" tone="red">Nasır bandı/ilacı, sıcak su torbası, kesici aletle kendi kendine müdahale.</Card>
        <Card title="Takip sıklığı">Duyu kaybı + deformite/PAH varsa 1-3 ayda bir; risk yoksa yıllık.</Card>
      </div>
    </div>
  </div>
);

export default NeuropathyFoot;
