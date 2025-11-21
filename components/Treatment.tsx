import React, { useState } from 'react';
import { HeartPulse, Weight, ChevronDown, ChevronUp, AlertCircle, Check, Pill, Zap, ShieldCheck, Syringe, Info } from 'lucide-react';

interface SideEffect {
  term: string;
  explanation: string;
}

interface DrugClassProps {
  title: string;
  icon: React.ReactNode;
  mechanism: string;
  agents: { name: string; brands: string; dose: string }[];
  pros: string[];
  cons: SideEffect[];
  color: string;
  iconColor: string;
}

const drugData: DrugClassProps[] = [
  {
    title: 'Biguanidler (Metformin)',
    icon: <Pill size={24} />,
    mechanism: 'Karaciğerden glukoz çıkışını azaltır, insülin direncini kırar.',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600',
    agents: [
      { name: 'Metformin HCl', brands: 'Glucophage, Glifor, Matofin, Diaformin', dose: 'Başlangıç: 500mg akşam tok. Hedef: 2000mg/gün (2x1000mg veya 1x2000mg XR)' }
    ],
    pros: ['Kilo nötr veya hafif kayıp', 'Hipoglisemi yapmaz', 'Kanıtlanmış uzun vadeli güvenlik', 'Ekonomik'],
    cons: [
      { term: 'GİS yan etkileri', explanation: 'Bulantı, ishal, metalik tat. Genellikle doza bağlıdır ve zamanla azalır. Tok karna alınması önerilir.' },
      { term: 'B12 eksikliği riski', explanation: 'İleumdan B12 emilimini bozar. Uzun süreli kullanımda (>5 yıl) seviyeler kontrol edilmelidir.' },
      { term: 'Laktik asidoz', explanation: 'Çok nadirdir. Dokuların oksijenlenmesinin bozulduğu durumlarda (sepsis, ağır kalp/solunum yetmezliği) risk artar.' },
      { term: 'eGFR < 30 kontrendike', explanation: 'Böbreklerden atıldığı için birikim riski vardır. eGFR 30-45 arası doz yarıya düşürülmelidir.' }
    ]
  },
  {
    title: 'SGLT-2 İnhibitörleri',
    icon: <ShieldCheck size={24} />,
    mechanism: 'Böbreklerden glukoz geri emilimini engelleyerek idrarla şeker atılımı (glikozüri) sağlar.',
    color: 'bg-green-50 border-green-100',
    iconColor: 'text-green-600',
    agents: [
      { name: 'Dapagliflozin', brands: 'Forziga', dose: '10 mg günde 1 kez (günün herhangi bir saatinde)' },
      { name: 'Empagliflozin', brands: 'Jardiance', dose: '10 mg veya 25 mg günde 1 kez' }
    ],
    pros: ['Kalp yetersizliği ve böbrek koruyucu (Öncelikli Tercih)', 'Kilo kaybı sağlar (~2-3 kg)', 'Tansiyonu düşürür', 'Hipoglisemi yapmaz'],
    cons: [
      { term: 'Genital mantar enfeksiyonları', explanation: 'İdrardaki yoğun şeker, mantar üremesi için ortam hazırlar. Hijyen eğitimi önemlidir.' },
      { term: 'İdrar yolu enfeksiyonu', explanation: 'Glikozüri bakteriyel çoğalma riskini artırabilir.' },
      { term: 'Öglisemik DKA', explanation: 'Kan şekeri çok yüksek olmadan gelişen ketoasidoz tablosudur. İnsülin yetersizliğinde veya cerrahi stres durumunda dikkat.' },
      { term: 'Dehidratasyon riski', explanation: 'Osmotik diürez (su atılımı) nedeniyle oluşur. Yaşlılarda ve diüretik kullananlarda hipotansiyona dikkat.' }
    ]
  },
  {
    title: 'GLP-1 Reseptör Agonistleri',
    icon: <Syringe size={24} />,
    mechanism: 'İnsülin salgısını artırır, glukagonu baskılar, mide boşalmasını yavaşlatır, beyinde tokluk merkezini uyarır.',
    color: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-600',
    agents: [
      { name: 'Semaglutide', brands: 'Ozempic', dose: 'Haftada 1 enjeksiyon (0.25mg ile başla -> 4 hafta sonra 0.5mg -> 1mg)' },
      { name: 'Dulaglutide', brands: 'Trulicity', dose: 'Haftada 1 enjeksiyon (0.75mg -> 1.5mg -> 3mg/4.5mg)' },
      { name: 'Liraglutide', brands: 'Victoza, Saxenda', dose: 'Günde 1 enjeksiyon (0.6mg -> 1.2mg -> 1.8mg)' }
    ],
    pros: ['Güçlü kilo kaybı', 'Güçlü HbA1c düşüşü', 'Aterosklerotik KV hastalık koruması', 'Beta hücre fonksiyonunu korur'],
    cons: [
      { term: 'GİS yan etkileri', explanation: 'Mide boşalmasının yavaşlamasına bağlı bulantı ve kusma. Doz titrasyonu ile zamanla azalır.' },
      { term: 'Enjeksiyon yeri reaksiyonları', explanation: 'Uygulama bölgesinde kızarıklık veya kaşıntı.' },
      { term: 'Pankreatit riski', explanation: 'Nadir görülür. Şiddetli ve geçmeyen karın ağrısı durumunda ilaç kesilmelidir.' },
      { term: 'Safra taşı hastalığı', explanation: 'Hızlı kilo kaybına bağlı safra kesesi taşı oluşumu tetiklenebilir.' }
    ]
  },
  {
    title: 'DPP-4 İnhibitörleri',
    icon: <Zap size={24} />,
    mechanism: 'İnkretin hormonlarının (GLP-1) yıkımını önleyerek vücudun kendi insülin salgısını fizyolojik olarak artırır.',
    color: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-600',
    agents: [
      { name: 'Sitagliptin', brands: 'Januvia', dose: '100 mg günde 1 kez' },
      { name: 'Vildagliptin', brands: 'Galvus', dose: '50 mg sabah-akşam (Günde 2 kez)' },
      { name: 'Linagliptin', brands: 'Trajenta', dose: '5 mg günde 1 kez (Böbrek yetmezliğinde doz ayarı gerekmez)' }
    ],
    pros: ['Kilo nötr', 'Yan etki profili çok düşüktür (iyi tolere edilir)', 'Hipoglisemi yapmaz'],
    cons: [
      { term: 'Orta düzey etki', explanation: 'HbA1c düşürme gücü diğer ajanlara göre daha sınırlıdır (%0.5-0.8).' },
      { term: 'Pankreatit (nadir)', explanation: 'Çok nadir akut pankreatit vakaları bildirilmiştir.' },
      { term: 'Eklem ağrısı', explanation: 'Nadir durumlarda şiddetli eklem ağrısı yapabilir.' }
    ]
  },
  {
    title: 'Sülfonilüreler',
    icon: <AlertCircle size={24} />,
    mechanism: 'Pankreas beta hücrelerini sürekli uyararak glukozdan bağımsız insülin salgılatır (İnsülin Sekretagogu).',
    color: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-600',
    agents: [
      { name: 'Gliklazid MR', brands: 'Diamicron, Betanorm', dose: '30-120 mg sabah kahvaltıdan önce (genellikle 60mg)' },
      { name: 'Glimepirid', brands: 'Amaryl, Glimax', dose: '1-4 mg günde 1 kez' }
    ],
    pros: ['Hızlı ve güçlü etki', 'Düşük maliyet', 'Erişim kolaylığı'],
    cons: [
      { term: 'Hipoglisemi riski', explanation: 'İnsülin salgısı glukoz düzeyinden bağımsız arttığı için kan şekeri düşüklüğü riski yüksektir. Yaşlılarda dikkat.' },
      { term: 'Kilo alımı', explanation: 'Anabolik hormon olan insülinin artışına bağlı olarak iştah artışı ve yağ depolanması.' },
      { term: 'Beta hücre tükenmesi', explanation: 'Uzun vadede pankreas rezervini daha hızlı tüketebilir.' }
    ]
  },
  {
    title: 'Tiazolidindionlar (TZD)',
    icon: <Weight size={24} />,
    mechanism: 'PPAR-gama reseptörleri üzerinden periferik dokularda (kas ve yağ) insülin duyarlılığını artırır.',
    color: 'bg-yellow-50 border-yellow-100',
    iconColor: 'text-yellow-600',
    agents: [
      { name: 'Pioglitazon', brands: 'Glitazone, Dropia', dose: '15-30 mg günde 1 kez' }
    ],
    pros: ['Güçlü insülin direnci kırıcı', 'Hipoglisemi yapmaz', 'NASH (Karaciğer yağlanması) tedavisinde etkilidir'],
    cons: [
      { term: 'Ödem ve sıvı tutulumu', explanation: 'Böbrekten sodyum geri emilimini artırır.' },
      { term: 'Kalp Yetersizliği riski', explanation: 'Sıvı yükünü artırdığı için kalp yetersizliğini alevlendirebilir. KKY hastasında kontrendikedir.' },
      { term: 'Kilo alımı', explanation: 'Sıvı tutulumu ve yağ dokusu dağılım değişikliğine bağlıdır.' },
      { term: 'Kırık riski', explanation: 'Özellikle menopoz sonrası kadınlarda kemik mineral yoğunluğunu azaltabilir.' }
    ]
  }
];

const DrugClassCard: React.FC<DrugClassProps> = ({ title, icon, mechanism, agents, pros, cons, color, iconColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md ring-1 ring-opacity-50' : 'shadow-sm'} ${color} mb-4 bg-white`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${iconColor} bg-opacity-10 bg-current`}>
            {icon}
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-800">{title}</h4>
            <p className="text-sm text-slate-500 hidden sm:block">{mechanism}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-white">
          <p className="text-sm text-slate-600 mb-4 sm:hidden italic">{mechanism}</p>
          
          <div className="mb-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Etken Maddeler ve Ticari İsimler (TR)</h5>
            <div className="grid gap-3">
              {agents.map((agent, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{agent.name}</span>
                      <span className="text-slate-500 ml-1 text-xs block md:inline md:ml-2">({agent.brands})</span>
                    </div>
                    <div className="text-blue-700 font-medium bg-blue-50 px-2 py-1 rounded text-xs w-fit md:w-auto md:text-right">
                      {agent.dose}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
              <h5 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
                <Check size={16} /> Avantajlar
              </h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
              <h5 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Dikkat / Yan Etkiler
              </h5>
              <ul className="text-sm text-slate-700 space-y-3">
                {cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 group relative cursor-help">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                    <span className="border-b border-dotted border-red-400/50">{con.term}</span>
                    <Info size={14} className="text-red-400 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Tooltip */}
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                      <div className="font-semibold mb-1 text-red-200">{con.term}</div>
                      {con.explanation}
                      <div className="absolute left-4 top-full w-2 h-2 bg-slate-800 transform rotate-45"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Treatment: React.FC = () => {
  return (
    <section id="treatment" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Tedavi Algoritması ve İlaç Rehberi</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Kişiselleştirilmiş tedavi esastır. Metformin temel taştır; ek hastalıklar (Kalp, Böbrek) ikinci ilacın seçimini belirler.
          </p>
        </div>

        {/* Algorithm Visualization */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-center mb-8 text-slate-800">Birinci Basamak Yaklaşımı</h3>
            
            {/* Step 1 */}
            <div className="bg-white border-l-4 border-blue-500 shadow-sm rounded-r-xl p-6 mb-8 relative">
              <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div className="ml-4">
                <h4 className="font-bold text-lg text-slate-900">Tanı Anı: Metformin + Yaşam Tarzı</h4>
                <p className="text-slate-600 text-sm mt-1">
                  HbA1c hedeften yüksekse hemen başla. Kontrendikasyon (eGFR &lt; 30) yoksa ilk tercihtir.
                </p>
              </div>
            </div>

            {/* Step 2 Split */}
            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute left-1/2 -top-8 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 border-l border-dashed border-slate-300"></div>

              {/* High Risk Path */}
              <div className="relative">
                <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full ring-4 ring-white md:block hidden"></div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <HeartPulse size={24} />
                    </div>
                    <h4 className="font-bold text-red-900">Yüksek Risk Grubu</h4>
                  </div>
                  <p className="text-xs text-red-800 mb-4 font-medium uppercase tracking-wide">
                    ASCVD, Kalp Yetersizliği veya KBH Varsa:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                      <div className="font-bold text-slate-800 flex justify-between items-center">
                        SGLT-2 İnhibitörleri
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase font-bold">Öncelikli</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">KY ve KBH progresyonunu azaltır, mortaliteyi düşürür.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                      <div className="font-bold text-slate-800">GLP-1 Agonistleri</div>
                      <p className="text-xs text-slate-500 mt-1">Ateroskleroz baskınsa güçlü seçenek. Kilo kaybı sağlar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Path */}
              <div className="relative">
                <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white md:block hidden"></div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Weight size={24} />
                    </div>
                    <h4 className="font-bold text-blue-900">Komorbidite Yoksa</h4>
                  </div>
                  <p className="text-xs text-blue-800 mb-4 font-medium uppercase tracking-wide">
                    Öncelik: Hipoglisemi Riski, Kilo, Maliyet
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                      <div className="font-bold text-slate-800">DPP-4 İnhibitörleri</div>
                      <p className="text-xs text-slate-500 mt-1">Kilo nötr, yan etki az, yaşlıda güvenli.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                      <div className="font-bold text-slate-800">Sülfonilüreler</div>
                      <p className="text-xs text-slate-500 mt-1">Maliyet öncelikliyse. Hipoglisemiye dikkat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Drug List */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h3 className="text-2xl font-bold text-slate-900">Farmakolojik Tedavi Rehberi</h3>
          </div>
          
          <div className="space-y-4">
            {drugData.map((drug, index) => (
              <DrugClassCard key={index} {...drug} />
            ))}
          </div>

          {/* Insulin Note */}
          <div className="mt-10 bg-slate-900 text-white p-8 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10"></div>
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-3">İnsülin Ne Zaman Başlanmalı?</h4>
              <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                Tanı anında <strong>HbA1c &gt; %9-10</strong> ise veya semptomatik hiperglisemi (poliüri, polidipsi, istemsiz kilo kaybı) mevcutsa,
                oral tedaviyle vakit kaybetmeden insülin (veya kombinasyon) tedavisine başlanmalıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatment;