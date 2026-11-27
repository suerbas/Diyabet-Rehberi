import React, { useState } from 'react';
import { FlaskConical, Calculator } from 'lucide-react';
import { SectionTitle, DataTable, Card, Bullets, NumField, parseNum } from './ui';

const LiverFib4: React.FC = () => {
  const [age, setAge] = useState('');
  const [ast, setAst] = useState('');
  const [alt, setAlt] = useState('');
  const [plt, setPlt] = useState('');

  const a = parseNum(age), s = parseNum(ast), l = parseNum(alt), p = parseNum(plt);
  // Platelets accepted as ×10³/µL; values like 142000 are converted
  const pltK = p !== null ? (p > 2000 ? p / 1000 : p) : null;
  const fib4 = a && s && l && pltK ? (a * s) / (pltK * Math.sqrt(l)) : null;
  const lowCut = a !== null && a >= 65 ? 2.0 : 1.3;

  let result: { label: string; tone: string; action: string } | null = null;
  if (fib4 !== null && isFinite(fib4)) {
    if (fib4 < lowCut) result = { label: 'Düşük risk', tone: 'border-emerald-200 bg-emerald-50 text-emerald-900', action: 'Yaşam tarzı ve kilo kaybı; FIB-4’ü 1-2 yılda bir tekrarla.' };
    else if (fib4 <= 2.67) result = { label: 'Belirsiz / orta risk', tone: 'border-amber-200 bg-amber-50 text-amber-900', action: 'Vibrasyon kontrollü elastografi (FibroScan) veya ELF testi ile ikinci basamak değerlendirme.' };
    else result = { label: 'Yüksek ileri fibroz riski', tone: 'border-rose-200 bg-rose-50 text-rose-900', action: 'Hepatoloji/gastroenteroloji sevki. GLP-1 RA, tirzepatid veya pioglitazon değerlendirilir; viral, otoimmün ve kalıtsal nedenler dışlanır.' };
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <SectionTitle icon={<FlaskConical size={20} />} sub="TEMD 2026: Tip 2 diyabette rutin karaciğer fibroz taramasında FIB-4 kullanılır.">MASLD ve FIB-4 skoru</SectionTitle>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-4"><Calculator size={20} className="text-primary" /> FIB-4 hesaplayıcı</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NumField label="Yaş" value={age} onChange={setAge} placeholder="örn. 61" suffix="yıl" />
            <NumField label="AST" value={ast} onChange={setAst} placeholder="örn. 54" suffix="U/L" />
            <NumField label="ALT" value={alt} onChange={setAlt} placeholder="örn. 48" suffix="U/L" />
            <NumField label="Trombosit" value={plt} onChange={setPlt} placeholder="örn. 142" suffix="×10³/µL" />
          </div>
          <p className="text-xs text-slate-500 mt-2">FIB-4 = (Yaş × AST) / (Trombosit × √ALT). Trombosit 142000 gibi girilirse otomatik çevrilir.</p>
          <div className="mt-5" aria-live="polite">
            {result && fib4 !== null ? (
              <div className={`border rounded-xl p-4 ${result.tone}`}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold">{fib4.toLocaleString('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                  <span className="font-bold">{result.label}</span>
                </div>
                <p className="text-sm mt-1">{result.action}</p>
                {a !== null && a < 35 && <p className="text-xs mt-2 opacity-80">35 yaş altında FIB-4 güvenilirliği düşüktür.</p>}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Dört değeri girin. Düşük risk eşiği &lt; 65 yaşta 1,30, ≥ 65 yaşta 2,0’dır.</p>
            )}
          </div>
        </div>
      </div>

      <DataTable
        head={['FIB-4', 'İleri fibroz riski', 'Yaklaşım']}
        rows={[
          ['< 1,30 (≥ 65 yaşta < 2,0)', 'Düşük', 'Yaşam tarzı + kilo kaybı; 1-2 yılda bir tekrar'],
          ['1,30-2,67', 'Belirsiz / orta', 'Elastografi (VCTE) veya ELF'],
          ['> 2,67', 'Yüksek', 'Hepatoloji sevki; MASH tedavisi'],
        ]}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Tedavi">
          <Bullets items={[
            '%7-10+ kilo kaybı steatohepatit gerilemesi sağlar.',
            'GLP-1 RA veya tirzepatid: kilo kaybı ve MASH yararı.',
            'Pioglitazon: MASH’ta etkili; kalp yetersizliğinde kullanılmaz.',
            'Alkolden kaçınılır; metabolik risk faktörleri (lipid, KB) tedavi edilir.',
          ]} />
        </Card>
        <Card title="Metabolik sendrom ile birliktelik" tone="sky">
          <Bullets items={[
            'Santral obezite, aterojenik dislipidemi (yüksek TG, düşük HDL), HT',
            'OSAS: horlama, tanıklı apne, gündüz uykululuk sorgulanır; endikasyonda CPAP',
            'PKOS, hiperürisemi/gut',
          ]} />
        </Card>
      </div>
    </div>
  );
};

export default LiverFib4;
