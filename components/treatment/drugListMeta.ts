// Clinical notes for the TİTCK drug list. Doses follow TEMD 2026 Tablo 7.1-7.10 and Bölüm 8;
// eGFR limits follow Bölüm 7.8. Keys match the groups in drugListBrands.ts (generated).

export interface DrugMeta {
  key: string;
  label: string;
  dose: string;
  note?: string;
  renal?: string;
}

export interface DrugGroup {
  id: string;
  title: string;
  items: DrugMeta[];
}

const COMBO_DOSE = 'Ayrı ayrı titre edilmiş dozlara eşdeğer güç seçilir; günde 1-2 kez yemekle (XR/SR formlar günde 1 kez, akşam).';
const NOT_IN_TEMD = 'TEMD tablolarında dozu verilmez; ürünün kısa ürün bilgisine (KÜB) bakın.';

export const drugGroups: DrugGroup[] = [
  {
    id: 'biguanid', title: 'Biguanid',
    items: [
      { key: 'metformin', label: 'Metformin', dose: '500 mg/gün ile başla, tedricen artır → 500-2500 mg/gün, 2-3 doz. Uzun salınımlı: 500-2000 mg/gün, tercihen akşam.', note: 'Hipoglisemi yapmaz. GİS yan etkiler yavaş titrasyonla azalır; uzun kullanımda B12 izlenir.', renal: 'eGFR 30-44: yeni başlanmaz, kullanıyorsa doz %50 azaltılır · < 30: kontrendike' },
    ],
  },
  {
    id: 'sglt2', title: 'SGLT2 inhibitörleri',
    items: [
      { key: 'dapagliflozin', label: 'Dapagliflozin', dose: '5-10 mg/gün, günün herhangi bir saatinde tek doz.', note: 'KY, KBH ve ASKVH’de organ koruma. Öglisemik DKA ve genital mikoz riski; cerrahiden 3 gün önce kesilir.', renal: 'KBH/KY için eGFR < 25’te başlanmaz; eGFR < 45’te glisemik etki azalır' },
      { key: 'empagliflozin', label: 'Empagliflozin', dose: '10 mg/gün, gerekirse 25 mg/gün; tek doz.', note: 'KY ve KBH’de organ koruma; öglisemik DKA uyarısı dapagliflozinle aynıdır.', renal: 'eGFR 45-60’ta glisemik amaçla yeni başlanmaz (kullanıyorsa 10 mg) · KY için eGFR < 20’de başlanmaz' },
    ],
  },
  {
    id: 'glp1', title: 'GLP-1 reseptör agonistleri',
    items: [
      { key: 'semaglutid', label: 'Semaglutid', dose: 'Ozempic: haftada 1 SC, 0,25 mg ile başla → idame 0,5-1 mg. Rybelsus: sabah aç karnına az suyla 3 mg, 1 ay sonra 7 mg, gerekirse 14 mg.', note: 'Wegovy ve Poviztra (2,4 mg’a kadar) obezite endikasyonludur. TEMD 2026 tablosu oral formu ülkemizde yok diye gösterir; TİTCK listesinde ruhsatlıdır.', renal: 'eGFR < 15’te mümkünse kullanılmaz' },
      { key: 'dulaglutid', label: 'Dulaglutid', dose: 'Haftada 1 SC: 0,75 mg → 1,5 mg.', renal: 'eGFR < 15’te mümkünse kullanılmaz' },
      { key: 'liraglutid', label: 'Liraglutid', dose: 'Victoza: günde 1 SC, 0,6 mg ile başla → idame 1,2-1,8 mg.', note: 'Saxenda (3 mg’a kadar) obezite endikasyonludur.', renal: 'eGFR < 15’te kullanılmaz' },
      { key: 'eksenatid', label: 'Eksenatid', dose: 'Günde 2 kez SC, sabah ve akşam yemekten 0-60 dk önce: 5 µg ile başla → 10 µg.', renal: 'eGFR < 30’da kullanılmaz; 30-50’de doz artışında dikkat' },
    ],
  },
  {
    id: 'gipglp1', title: 'Dual GIP/GLP-1 agonisti',
    items: [
      { key: 'tirzepatid', label: 'Tirzepatid', dose: 'Haftada 1 SC: 2,5 mg × 4 hafta → 5 mg; 4 haftada bir 2,5 mg artırılabilir (maks. 15 mg).', note: 'En güçlü HbA1c ve kilo etkisi; diyabetten bağımsız obezite endikasyonu da vardır.', renal: 'eGFR < 15’te mümkünse kullanılmaz' },
    ],
  },
  {
    id: 'dpp4', title: 'DPP-4 inhibitörleri',
    items: [
      { key: 'sitagliptin', label: 'Sitagliptin', dose: '100 mg/gün, yemekten bağımsız.', renal: 'eGFR 30-44: 50 mg · < 30: mümkünse kullanılmaz, gerekirse 25 mg' },
      { key: 'vildagliptin', label: 'Vildagliptin', dose: '50 mg günde 1-2 kez.', renal: 'eGFR < 50: günde 1 × 50 mg · < 15: tercihen kullanılmaz' },
      { key: 'linagliptin', label: 'Linagliptin', dose: '5 mg/gün.', renal: 'Doz ayarı gerekmez' },
      { key: 'saksagliptin', label: 'Saksagliptin', dose: '5 mg/gün.', note: 'Kalp yetersizliğinde kullanılmaz (hastaneye yatış riskinde artış).', renal: 'eGFR 15-45: 2,5 mg · < 15: kontrendike' },
    ],
  },
  {
    id: 'su', title: 'Sülfonilüreler',
    items: [
      { key: 'gliklazid', label: 'Gliklazid', dose: 'MR: 30-120 mg/gün, kahvaltıda tek doz. Standart 80 mg tablet: 80-240 mg/gün, 1-2 doz.', note: 'Sınıf içinde hipoglisemi riski en düşük seçeneklerden biridir.', renal: 'eGFR 30-60: doz %50 azaltılır · < 30: tercihen kullanılmaz' },
      { key: 'glimepirid', label: 'Glimepirid', dose: '1 mg ile başla → 1-8 mg/gün, kahvaltıda tek doz.', renal: 'eGFR < 30: kullanılmaz' },
      { key: 'glipizid', label: 'Glipizid', dose: 'Kontrollü salınımlı: 5-10 mg/gün, kahvaltıda tek doz.', renal: 'eGFR 30-60: doz %50 azaltılır · < 30: tercihen kullanılmaz' },
      { key: 'glibenklamid', label: 'Glibenklamid', dose: '2,5-10 mg/gün, 1-2 doz, kahvaltıda (gerekirse akşam).', note: 'Uzamış hipoglisemi riski yüksektir; yaşlıda kaçınılır.', renal: 'eGFR 30-60: mümkünse kullanılmaz, gerekirse doz %50 · < 30: kontrendike' },
      { key: 'glibornurid', label: 'Glibornurid', dose: '12,5-75 mg/gün, 1-2 doz, kahvaltıda.' },
      { key: 'klorpropamid', label: 'Klorpropamid', dose: NOT_IN_TEMD, note: 'Eski kuşak, çok uzun etkili; uzamış hipoglisemi riski nedeniyle güncel tedavide yeri yoktur.' },
    ],
  },
  {
    id: 'glinid', title: 'Glinidler',
    items: [
      { key: 'repaglinid', label: 'Repaglinid', dose: '1,5-6 mg/gün, günde 3 kez yemekten hemen önce.', renal: 'eGFR < 30: tercihen kullanılmaz' },
      { key: 'nateglinid', label: 'Nateglinid', dose: '180-360 mg/gün, günde 3 kez yemekten hemen önce.', renal: 'eGFR 15-30: doz %50 azaltılır · < 15: kontrendike' },
    ],
  },
  {
    id: 'tzd', title: 'Tiazolidindion',
    items: [
      { key: 'pioglitazon', label: 'Pioglitazon', dose: '15-45 mg/gün, tek doz, yemekten bağımsız.', note: 'MASH’ta yararlı. Kalp yetersizliği ve mesane kanseri öyküsünde kullanılmaz; ödem, kilo artışı ve kırık riski.', renal: 'eGFR < 30: sıvı retansiyonu nedeniyle dikkatle' },
    ],
  },
  {
    id: 'agi', title: 'Alfa glukozidaz inhibitörleri',
    items: [
      { key: 'akarboz', label: 'Akarboz', dose: '150-300 mg/gün, günde 3 kez, yemeğin ilk lokmasıyla çiğneyerek.', note: 'Hipoglisemi olursa sakkaroz değil glukoz verilir.', renal: 'eGFR < 25: kontrendike' },
      { key: 'miglitol', label: 'Miglitol', dose: '150-300 mg/gün, günde 3 kez, yemeğin başında.' },
      { key: 'vogliboz', label: 'Vogliboz', dose: NOT_IN_TEMD },
    ],
  },
  {
    id: 'kombi', title: 'Sabit doz kombinasyonları (oral)',
    items: [
      { key: 'sitagliptin+metformin', label: 'Sitagliptin + metformin', dose: COMBO_DOSE, renal: 'Metformin ve sitagliptin sınırları birlikte geçerlidir' },
      { key: 'vildagliptin+metformin', label: 'Vildagliptin + metformin', dose: COMBO_DOSE },
      { key: 'linagliptin+metformin', label: 'Linagliptin + metformin', dose: COMBO_DOSE },
      { key: 'dapagliflozin+metformin', label: 'Dapagliflozin + metformin', dose: COMBO_DOSE },
      { key: 'empagliflozin+metformin', label: 'Empagliflozin + metformin', dose: COMBO_DOSE },
      { key: 'empagliflozin+linagliptin', label: 'Empagliflozin + linagliptin', dose: 'Günde 1 kez, sabah; 10/5 mg ile başla.' },
      { key: 'pioglitazon+metformin', label: 'Pioglitazon + metformin', dose: COMBO_DOSE },
      { key: 'gliklazid+metformin', label: 'Gliklazid + metformin', dose: COMBO_DOSE, note: 'Sülfonilüre içerir: hipoglisemi eğitimi gerekir.' },
      { key: 'glibenklamid+metformin', label: 'Glibenklamid + metformin', dose: COMBO_DOSE, note: 'Glibenklamid içerir: uzamış hipoglisemi riski, yaşlıda kaçınılır.' },
      { key: 'repaglinid+metformin', label: 'Repaglinid + metformin', dose: 'Günde 2-3 kez, yemekten hemen önce.' },
      { key: 'nateglinid+metformin', label: 'Nateglinid + metformin', dose: 'Tedavi paketi: nateglinid yemekten önce günde 3 kez, metformin yemekle.' },
      { key: 'miglitol+metformin', label: 'Miglitol + metformin', dose: 'Yemeğin başında; bileşen dozlarını aşmayın.' },
      { key: 'pioglitazon+ala', label: 'Pioglitazon + alfa lipoik asit', dose: NOT_IN_TEMD, note: 'Alfa lipoik asit içerir; bu kombinasyon kılavuzda yer almaz.' },
      { key: 'pioglitazon+metformin+ala', label: 'Pioglitazon + metformin + alfa lipoik asit', dose: NOT_IN_TEMD, note: 'Alfa lipoik asit içerir; bu kombinasyon kılavuzda yer almaz.' },
      { key: 'nateglinid+ala', label: 'Nateglinid + alfa lipoik asit', dose: NOT_IN_TEMD, note: 'Alfa lipoik asit içerir; bu kombinasyon kılavuzda yer almaz.' },
    ],
  },
  {
    id: 'insulin-prandiyal', title: 'İnsülin: prandiyal (bolus)',
    items: [
      { key: 'lispro', label: 'İnsülin lispro', dose: 'Öğünden 0-15 dk önce SC. Bazal-plus’ta en büyük öğüne 4 Ü (veya bazalin %10’u) ile başlanır.', note: '200 U/mL kalem yüksek doz gerektirenler içindir.', renal: 'eGFR < 30’da hipoglisemi riski nedeniyle doz azaltılır' },
      { key: 'aspart', label: 'İnsülin aspart', dose: 'Öğünden 0-15 dk önce SC; başlangıç lispro ile aynı.', note: 'Fiasp daha hızlı etkili formdur; öğün başında verilir.' },
      { key: 'glulisin', label: 'İnsülin glulisin', dose: 'Öğünden 0-15 dk önce SC; başlangıç lispro ile aynı.' },
      { key: 'insan-regular', label: 'Regüler (kristalize) insan insülini', dose: 'Öğünden yaklaşık 30 dk önce SC. DKA’da iv infüzyon 0,10 IU/kg/sa.' },
    ],
  },
  {
    id: 'insulin-bazal', title: 'İnsülin: bazal',
    items: [
      { key: 'glarjin', label: 'İnsülin glarjin', dose: 'Günde 1 kez aynı saatte: 10 Ü veya 0,1-0,2 Ü/kg; 3 günde bir APG’ye göre titre edilir (hedef 80-130 mg/dL).', note: 'Toujeo 300 U/mL; Basaglar, Glarin ve Basalog One biyobenzerdir.', renal: 'eGFR < 30’da doz azaltılır' },
      { key: 'degludek', label: 'İnsülin degludek', dose: 'Günde 1 kez, saati esnek; başlangıç ve titrasyon glarjinle aynı.' },
      { key: 'detemir', label: 'İnsülin detemir', dose: 'Günde 1-2 kez; başlangıç glarjinle aynı.' },
      { key: 'nph', label: 'NPH insan insülini', dose: 'Yatarken tek doz ya da günde 2 kez.', note: 'Gece hipoglisemisi riski bazal analoglardan yüksektir.' },
    ],
  },
  {
    id: 'insulin-karisim', title: 'İnsülin: hazır karışım ve bazal + GLP-1',
    items: [
      { key: 'lispro-karisim', label: 'Lispro karışımı (Mix25 / Mix50)', dose: 'Günde 1-3 kez, öğünden hemen önce. Doz bölünmesi için İnsülin sekmesine bakın.' },
      { key: 'aspart-karisim', label: 'Aspart karışımı (NovoMix)', dose: 'Günde 1-3 kez, öğünden hemen önce.' },
      { key: 'insan-karisim', label: 'İnsan insülini karışımı (regüler + NPH)', dose: 'Günde 2 kez, kahvaltı ve akşam yemeğinden 30 dk önce.' },
      { key: 'degludek-aspart', label: 'Degludek + aspart', dose: 'Günde 1-2 kez, ana öğün(ler)le.' },
      { key: 'glarjin-liksisenatid', label: 'Glarjin + liksisenatid', dose: 'Günde 1 kez, öğünden önceki 1 saat içinde SC; doz bazal ihtiyaca göre.' },
      { key: 'degludek-liraglutid', label: 'Degludek + liraglutid', dose: 'Günde 1 kez SC, yemekten bağımsız; doz bazal ihtiyaca göre.' },
    ],
  },
];
