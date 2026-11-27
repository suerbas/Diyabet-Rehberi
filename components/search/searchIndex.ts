// Site search index. Each entry points to a page, optionally a tab (?sekme=) and a heading
// inside that tab (?odak=) that is scrolled to and highlighted. Keywords cover the words a
// primary-care physician is likely to type: synonyms, lay terms, drug and brand names.

import { drugGroups } from '../treatment/drugListMeta';
import { titckBrands } from '../treatment/drugListBrands';

export interface SearchEntry {
  title: string;
  section: string;   // page name shown in the breadcrumb
  tabLabel?: string; // tab name shown in the breadcrumb
  path: string;
  tab?: string;
  focus?: string;    // text of the heading to land on
  keywords: string[];
}

const R = { section: 'Risk & Tanı', path: '/risk-tani' };
const Y = { section: 'Yaşam Tarzı', path: '/yasam-tarzi' };
const T = { section: 'Tedavi', path: '/tedavi' };
const K = { section: 'Komplikasyonlar', path: '/komplikasyonlar' };
const O = { section: 'Özel Durumlar', path: '/ozel-durumlar' };

export const searchIndex: SearchEntry[] = [
  // Risk & Tanı
  { ...R, tab: 'tani', tabLabel: 'Tanı Kriterleri', focus: 'Tanı ölçütleri', title: 'Diyabet tanı ölçütleri',
    keywords: ['tanı kriterleri', 'diyabet tanısı nasıl konur', 'açlık kan şekeri', 'açlık glukozu', 'APG 126', 'HbA1c 6,5', 'OGTT 2. saat 200', 'rastgele glukoz', 'tokluk şekeri', 'şeker hastalığı tanısı'] },
  { ...R, tab: 'tani', tabLabel: 'Tanı Kriterleri', focus: 'Tanı ölçütleri', title: 'OGTT 1. saat ölçütü (IDF 2024)',
    keywords: ['1. saat', 'birinci saat', '209', '155', 'ara hiperglisemi', '1 saatlik OGTT', 'IDF 2024'] },
  { ...R, tab: 'tani', tabLabel: 'Tanı Kriterleri', focus: 'Tanı yorumlayıcı', title: 'Tanı yorumlayıcı',
    keywords: ['sonuç yorumlama', 'tahlil yorumla', 'değerleri gir', 'hesaplayıcı', 'prediyabet mi diyabet mi'] },
  { ...R, tab: 'tani', tabLabel: 'Tanı Kriterleri', focus: 'HbA1c yerine plazma glukozu', title: 'HbA1c’nin güvenilmez olduğu durumlar',
    keywords: ['hba1c güvenilmez', 'anemi', 'demir eksikliği', 'hemoglobinopati', 'transfüzyon', 'gebelikte hba1c', 'diyaliz'] },
  { ...R, tab: 'tani', tabLabel: 'Tanı Kriterleri', focus: 'Standart 75 g OGTT', title: '75 g OGTT nasıl yapılır',
    keywords: ['ogtt protokolü', 'yükleme testi', 'şeker yükleme', 'ogtt hazırlık', 'glukoz tolerans testi'] },
  { ...R, tab: 'tarama', tabLabel: 'Tarama & FINDRISK', focus: 'Kimler taranmalı', title: 'Kimler taranmalı?',
    keywords: ['tarama', 'tarama sıklığı', 'kaç yılda bir', '35 yaş', 'asemptomatik', 'check-up', 'gestasyonel öykü', 'HIV'] },
  { ...R, tab: 'tarama', tabLabel: 'Tarama & FINDRISK', focus: 'Risk faktörleri', title: 'Diyabet risk faktörleri',
    keywords: ['risk faktörü', 'aile öyküsü', 'PKOS', 'polikistik over', 'akantozis', 'insülin direnci', 'diyabetojenik ilaç', 'HDL', 'trigliserid'] },
  { ...R, tab: 'tarama', tabLabel: 'Tarama & FINDRISK', focus: 'FINDRISK', title: 'FINDRISK risk hesaplayıcı',
    keywords: ['findrisk', 'risk skoru', 'risk hesapla', '10 yıllık risk', 'anket', 'diyabet riski'] },
  { ...R, tab: 'prediyabet', tabLabel: 'Prediyabet', title: 'Prediyabet yönetimi',
    keywords: ['prediyabet', 'gizli şeker', 'BAG', 'BGT', 'bozulmuş açlık glukozu', 'bozulmuş glukoz toleransı', 'diyabeti önleme', 'insülin direnci'] },
  { ...R, tab: 'prediyabet', tabLabel: 'Prediyabet', focus: 'Metformin kimlere', title: 'Prediyabette metformin kimlere?',
    keywords: ['prediyabet metformin', 'önleyici metformin'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'Diyabet tipleri', title: 'Diyabet tipleri',
    keywords: ['tip 1', 'tip 2', 'sınıflama', 'diyabet türleri', 'gestasyonel', 'özel tipler'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'Tip 1, LADA', title: 'Tip 1, LADA ve Tip 2 ayrımı',
    keywords: ['LADA', 'erişkinde tip 1', 'otoimmün diyabet', 'anti-GAD', 'otoantikor', 'zayıf diyabetli'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'C-peptid', title: 'C-peptid eşikleri',
    keywords: ['c peptid', 'c-peptit', 'insülin rezervi', 'insülin salgısı'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'MODY', title: 'MODY şüphesi ve genetik test',
    keywords: ['mody', 'monogenik diyabet', 'genetik test', 'gençte diyabet ailesel'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'Tip 1 diyabet evreleri', title: 'Tip 1 diyabet evreleri',
    keywords: ['evre', 'presemptomatik tip 1', 'otoantikor pozitif'] },
  { ...R, tab: 'ayirici', tabLabel: 'Ayırıcı Tanı', focus: 'Atipik ve sekonder', title: 'Atipik ve sekonder diyabet',
    keywords: ['sekonder diyabet', 'pankreatik diyabet', 'pankreatit', 'ketozise eğilimli', 'atipik'] },

  // Yaşam Tarzı
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Makro besin', title: 'Beslenme ve makro besin dağılımı',
    keywords: ['diyet', 'beslenme', 'ne yemeli', 'karbonhidrat oranı', 'protein', 'yağ', 'kalori', 'tuz', 'diyabet diyeti'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'el modeli', title: 'Porsiyon kontrolü: el modeli',
    keywords: ['porsiyon', 'el modeli', 'ne kadar yemeli', 'tabak', 'avuç'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Karbonhidrat kalitesi', title: 'Karbonhidrat kalitesi',
    keywords: ['glisemik indeks', 'lif', 'posa', 'tam tahıl', 'ekmek', 'pirinç', 'meyve', 'karbonhidrat sayımı'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Alkol', title: 'Alkol', keywords: ['alkol', 'içki', 'bira', 'şarap'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Tatlandırıcılar', title: 'Tatlandırıcılar', keywords: ['tatlandırıcı', 'şeker yerine', 'diyet ürün', 'yapay tatlandırıcı'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Metformin ve B12', title: 'Metformin ve B12 eksikliği', keywords: ['b12', 'vitamin b12', 'metformin yan etkisi', 'nöropati b12'] },
  { ...Y, tab: 'beslenme', tabLabel: 'Beslenme', focus: 'Takviyeler', title: 'Takviyeler', keywords: ['vitamin', 'takviye', 'bitkisel', 'supplement', 'd vitamini'] },
  { ...Y, tab: 'egzersiz', tabLabel: 'Egzersiz', focus: 'Fiziksel aktivite reçetesi', title: 'Fiziksel aktivite reçetesi',
    keywords: ['egzersiz', 'spor', 'yürüyüş', 'haftada 150 dakika', 'aerobik', 'direnç egzersizi', 'hareket'] },
  { ...Y, tab: 'egzersiz', tabLabel: 'Egzersiz', focus: 'Ağır egzersizin yasak', title: 'Ağır egzersizin yasak olduğu durumlar',
    keywords: ['egzersiz kontrendikasyon', 'egzersiz yasak', 'retinopati egzersiz', 'ketoz egzersiz'] },
  { ...Y, tab: 'egzersiz', tabLabel: 'Egzersiz', focus: 'Güvenlik ipuçları', title: 'Egzersizde hipoglisemi güvenliği',
    keywords: ['egzersiz öncesi şeker', 'egzersizde hipoglisemi', 'spor öncesi karbonhidrat'] },
  { ...Y, tab: 'kilo', tabLabel: 'Kilo Yönetimi', focus: 'Kilo kaybı eşikleri', title: 'Kilo kaybı hedefleri ve basamaklar',
    keywords: ['kilo verme', 'zayıflama', 'obezite', 'BKİ hesapla', 'vücut kitle indeksi', 'bariatrik', 'metabolik cerrahi', 'mide ameliyatı', 'remisyon'] },
  { ...Y, tab: 'kilo', tabLabel: 'Kilo Yönetimi', focus: 'İlaç tedavisi', title: 'Obezite ilaçları',
    keywords: ['zayıflama iğnesi', 'semaglutid', 'tirzepatid', 'liraglutid', 'orlistat', 'wegovy', 'mounjaro', 'saxenda', 'kilo ilacı'] },
  { ...Y, tab: 'gunluk', tabLabel: 'Günlük Yaşam', focus: 'Araç kullanma', title: 'Araç kullanma güvenliği',
    keywords: ['araba', 'araç kullanma', 'ehliyet', 'sürüş', 'şoför', 'direksiyon'] },
  { ...Y, tab: 'gunluk', tabLabel: 'Günlük Yaşam', focus: 'Diyabet eğitimi', title: 'Diyabet eğitimi', keywords: ['hasta eğitimi', 'öz yönetim', 'eğitim hemşiresi'] },
  { ...Y, tab: 'gunluk', tabLabel: 'Günlük Yaşam', focus: 'Ağız ve diş', title: 'Ağız ve diş sağlığı', keywords: ['diş', 'diş eti', 'periodontit', 'ağız sağlığı'] },

  // Tedavi
  { ...T, tab: 'secici', tabLabel: 'Tedavi Seçici', title: 'Tedavi seçici: hangi ilaç?',
    keywords: ['hangi ilaç', 'ilaç seçimi', 'tedavi algoritması', 'komorbidite', 'ilk ilaç', 'ikinci ilaç', 'ASKVH ilaç', 'kalp yetersizliği ilaç', 'böbrek hastası ilaç', 'tedavi başlama'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'Metformin', title: 'Metformin',
    keywords: ['metformin', 'biguanid', 'glifor', 'glukofaj', 'matofin', 'metformin doz', 'laktik asidoz'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'SGLT2', title: 'SGLT2 inhibitörleri',
    keywords: ['sglt2', 'gliflozin', 'dapagliflozin', 'empagliflozin', 'forziga', 'jardiance', 'genital enfeksiyon', 'idrarla şeker atan'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'GLP-1', title: 'GLP-1 reseptör agonistleri',
    keywords: ['glp-1', 'glp1', 'semaglutid', 'dulaglutid', 'liraglutid', 'ozempic', 'trulicity', 'victoza', 'rybelsus', 'oral semaglutid', 'iğne'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'Tirzepatid', title: 'Tirzepatid (GIP/GLP-1)', keywords: ['tirzepatid', 'mounjaro', 'gip', 'dual agonist'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'DPP-4', title: 'DPP-4 inhibitörleri',
    keywords: ['dpp-4', 'dpp4', 'gliptin', 'sitagliptin', 'vildagliptin', 'linagliptin', 'januvia', 'galvus', 'trajenta'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'Sülfonilüre', title: 'Sülfonilüreler',
    keywords: ['sülfonilüre', 'gliklazid', 'glimepirid', 'diamicron', 'amaryl', 'hipoglisemi ilaç'] },
  { ...T, tab: 'ilaclar', tabLabel: 'İlaç Sınıfları', focus: 'Pioglitazon', title: 'Pioglitazon (TZD)', keywords: ['pioglitazon', 'glitazon', 'tzd', 'ödem', 'sıvı retansiyonu'] },
  { ...T, tab: 'egfr', tabLabel: 'eGFR & Doz', title: 'eGFR’ye göre ilaç dozu',
    keywords: ['böbrek yetmezliği doz', 'renal doz', 'eGFR', 'kreatinin', 'doz ayarı', 'KBH doz', 'GFR hesapla', 'kontrendikasyon'] },
  { ...T, tab: 'insulin', tabLabel: 'İnsülin', focus: 'Başlama ve yoğunlaştırma', title: 'İnsülin başlama ve titrasyon',
    keywords: ['insülin başlama', 'bazal insülin', 'NPH', 'glarjin', 'titrasyon', 'doz artırma', 'insülin hesaplama', 'bazal bolus', 'insüline geçiş'] },
  { ...T, tab: 'insulin', tabLabel: 'İnsülin', focus: 'İnsülin preparatları', title: 'İnsülin preparatları',
    keywords: ['insülin çeşitleri', 'hızlı etkili', 'uzun etkili', 'karışım insülin', 'premiks', 'lantus', 'novorapid', 'humalog', 'tresiba'] },
  { ...T, tab: 'insulin', tabLabel: 'İnsülin', focus: 'Enjeksiyon tekniği', title: 'İnsülin enjeksiyon tekniği',
    keywords: ['iğne yapma', 'enjeksiyon yeri', 'lipohipertrofi', 'insülin kalemi', 'iğne ucu', 'insülin saklama'] },

  // Komplikasyonlar
  { ...K, tab: 'tarama', tabLabel: 'Tarama Takvimi', focus: 'Her vizit', title: 'Her vizit kontrol listesi', keywords: ['vizit', 'kontrol listesi', 'muayene', 'poliklinik'] },
  { ...K, tab: 'tarama', tabLabel: 'Tarama Takvimi', focus: 'Tarama ve izlem takvimi', title: 'Tarama ve izlem takvimi',
    keywords: ['takip', 'kaç ayda bir', 'yıllık tetkik', 'hba1c kaç ayda', 'izlem', 'kontrol sıklığı', 'lipid kontrolü'] },
  { ...K, tab: 'tarama', tabLabel: 'Tarama Takvimi', focus: 'Bağışıklama', title: 'Aşılar', keywords: ['aşı', 'grip aşısı', 'influenza', 'pnömokok', 'hepatit B', 'zona', 'covid aşısı'] },
  { ...K, tab: 'akut', tabLabel: 'Akut', focus: 'Hipoglisemi', title: 'Hipoglisemi yönetimi',
    keywords: ['hipoglisemi', 'şeker düşmesi', 'düşük şeker', '15-15 kuralı', 'glukagon', 'bayılma', 'hipoglisemi tedavisi'] },
  { ...K, tab: 'akut', tabLabel: 'Akut', focus: 'Hiperglisemik aciller', title: 'DKA ve HHD',
    keywords: ['ketoasidoz', 'DKA', 'HHD', 'HHS', 'hiperozmolar', 'ketoz', 'şeker çok yüksek', 'acil sevk'] },
  { ...K, tab: 'akut', tabLabel: 'Akut', focus: 'Öglisemik DKA', title: 'Öglisemik DKA (SGLT2-İ)', keywords: ['öglisemik', 'normal şekerle ketoasidoz', 'sglt2 ketoasidoz'] },
  { ...K, tab: 'kv', tabLabel: 'Kardiyovasküler', focus: 'KV risk kategorisi', title: 'KV risk ve LDL hedefi',
    keywords: ['kolesterol', 'LDL', 'LDL hedefi', 'statin', 'lipid', 'kardiyovasküler risk', 'atorvastatin', 'rosuvastatin', 'ezetimib'] },
  { ...K, tab: 'kv', tabLabel: 'Kardiyovasküler', focus: 'Hipertansiyon', title: 'Hipertansiyon ve KB hedefi',
    keywords: ['tansiyon', 'kan basıncı', 'hipertansiyon', 'KB hedefi', 'ACE inhibitörü', 'ARB', '130/80', '120-130', '140/90', 'THU 2025'] },
  { ...K, tab: 'kv', tabLabel: 'Kardiyovasküler', focus: 'Kalp yetersizliği', title: 'Kalp yetersizliği',
    keywords: ['kalp yetersizliği', 'kalp', 'HFrEF', 'HFpEF', 'efor dispnesi', 'ödem'] },
  { ...K, tab: 'kv', tabLabel: 'Kardiyovasküler', focus: 'Antiagregan', title: 'Aspirin ve antiagregan', keywords: ['aspirin', 'antiagregan', 'klopidogrel', 'primer koruma'] },
  { ...K, tab: 'bobrek-goz', tabLabel: 'Böbrek & Göz', focus: 'Diyabetik böbrek', title: 'Diyabetik böbrek hastalığı',
    keywords: ['nefropati', 'böbrek', 'albüminüri', 'mikroalbüminüri', 'AKO', 'idrarda protein', 'finerenon', 'nefroloji sevki'] },
  { ...K, tab: 'bobrek-goz', tabLabel: 'Böbrek & Göz', focus: 'Diyabetik retinopati', title: 'Diyabetik retinopati',
    keywords: ['göz', 'göz dibi', 'retinopati', 'görme', 'NAION', 'göz muayenesi', 'makula ödemi'] },
  { ...K, tab: 'ayak', tabLabel: 'Nöropati & Ayak', focus: 'Nöropati taraması', title: 'Nöropati taraması',
    keywords: ['nöropati', 'monofilaman', 'uyuşma', 'karıncalanma', 'his kaybı', 'diyapazon', 'aşil refleksi'] },
  { ...K, tab: 'ayak', tabLabel: 'Nöropati & Ayak', focus: 'Ağrılı nöropati', title: 'Ağrılı nöropati tedavisi',
    keywords: ['ağrılı nöropati', 'yanma', 'pregabalin', 'gabapentin', 'duloksetin', 'ayak ağrısı'] },
  { ...K, tab: 'ayak', tabLabel: 'Nöropati & Ayak', focus: 'Diyabetik ayak ülseri', title: 'Diyabetik ayak ülseri',
    keywords: ['ayak yarası', 'yara', 'ülser', 'kangren', 'charcot', 'enfeksiyon', 'amputasyon'] },
  { ...K, tab: 'ayak', tabLabel: 'Nöropati & Ayak', focus: 'Ayak bakımı', title: 'Ayak bakımı kuralları', keywords: ['ayak bakımı', 'tırnak kesme', 'ayakkabı', 'çorap', 'nasır'] },
  { ...K, tab: 'karaciger', tabLabel: 'Karaciğer', focus: 'MASLD', title: 'MASLD ve FIB-4',
    keywords: ['yağlı karaciğer', 'karaciğer yağlanması', 'MASLD', 'NAFLD', 'MASH', 'fibrozis', 'FIB-4 hesapla', 'ALT yüksek'] },

  // Özel Durumlar
  { ...O, tab: 'gebelik', tabLabel: 'Gebelik', focus: 'Tarama ve tanı', title: 'Gestasyonel diyabet tarama ve tanı',
    keywords: ['gebelik', 'hamilelik', 'gestasyonel diyabet', 'GDM', 'gebelik şekeri', '24-28 hafta', 'gebelikte ogtt', 'şeker yükleme gebelik'] },
  { ...O, tab: 'gebelik', tabLabel: 'Gebelik', focus: 'Glisemik ve kan basıncı hedefleri', title: 'Gebelikte glisemik hedefler', keywords: ['gebelikte hedef', 'gebelikte kan şekeri', 'gebelikte tansiyon'] },
  { ...O, tab: 'gebelik', tabLabel: 'Gebelik', focus: 'Gebelik öncesi hazırlık', title: 'Gebelik öncesi hazırlık',
    keywords: ['gebelik planlama', 'folik asit', 'gebelikte kesilecek ilaç', 'prekonsepsiyonel'] },
  { ...O, tab: 'yasli', tabLabel: 'Yaşlı', title: 'Yaşlı diyabetli',
    keywords: ['yaşlı', 'geriatri', 'kırılgan', 'demans', 'hedef gevşetme', 'de-intensifikasyon', 'tedaviyi azaltma', 'huzurevi'] },
  { ...O, tab: 'ramazan', tabLabel: 'Ramazan', title: 'Ramazan ve oruç',
    keywords: ['ramazan', 'oruç', 'iftar', 'sahur', 'oruçta ilaç', 'oruç tutabilir mi', 'orucu bozma'] },
  { ...O, tab: 'hasta-gunu', tabLabel: 'Hasta Günü & Cerrahi', focus: 'Hasta günü kuralları', title: 'Hasta günü kuralları',
    keywords: ['hasta günü', 'ateş', 'ishal', 'kusma', 'SADMANS', 'ilaç kesme', 'gribal enfeksiyon'] },
  { ...O, tab: 'hasta-gunu', tabLabel: 'Hasta Günü & Cerrahi', focus: 'Perioperatif', title: 'Ameliyat öncesi ve sonrası',
    keywords: ['ameliyat', 'cerrahi', 'operasyon', 'perioperatif', 'açlık', 'anestezi', 'sglt2 ameliyat öncesi kesme'] },
  { ...O, tab: 'steroid', tabLabel: 'Steroid & Diğer', focus: 'Glukokortikoid', title: 'Steroid ilişkili hiperglisemi',
    keywords: ['steroid', 'kortizon', 'prednizolon', 'deksametazon', 'metilprednizolon', 'steroid diyabeti', 'NPH steroid'] },
  { ...O, tab: 'steroid', tabLabel: 'Steroid & Diğer', focus: 'Doğuya uçuş', title: 'Seyahat ve saat farkı',
    keywords: ['seyahat', 'uçak', 'uçuş', 'saat farkı', 'yolculuk', 'tatil', 'hac', 'umre'] },
  { ...O, tab: 'steroid', tabLabel: 'Steroid & Diğer', focus: 'Transplantasyon', title: 'Transplantasyon, kistik fibrozis, kanser',
    keywords: ['transplantasyon', 'PTDM', 'kistik fibrozis', 'CFRD', 'kanser', 'immünoterapi'] },
  { ...O, tab: 'cocuk', tabLabel: 'Çocuk & Genç', title: 'Çocuk ve ergende diyabet',
    keywords: ['çocuk', 'ergen', 'adolesan', 'pediatrik', 'okul', 'çocukta tip 1', 'aynı gün sevk', 'çocuk obezite'] },

  // Genel
  { section: 'Vaka Testleri', path: '/vaka-testleri', title: 'Vaka testleri',
    keywords: ['test', 'quiz', 'soru', 'vaka', 'sınav', 'kendini dene', 'olgu'] },
  { section: 'Genel Bakış', path: '/', focus: 'Türkiye’de erişkin diyabet sıklığı', title: 'Türkiye’de diyabet sıklığı',
    keywords: ['prevalans', 'sıklık', 'TURDEP', 'IDF', 'istatistik', 'kaç kişi', 'Türkiye'] },
];

// İlaç Listesi tab: one overview entry, then one entry per active substance whose keywords are
// its Turkish brand names from the TİTCK list, so typing a brand lands on the right card.
const L = { ...T, tab: 'liste', tabLabel: 'İlaç Listesi' };
const drugListEntries: SearchEntry[] = [
  { ...L, title: 'Türkiye’de ruhsatlı antidiyabetikler (TİTCK)',
    keywords: ['ilaç listesi', 'ticari ad', 'marka', 'TİTCK', 'ruhsatlı', 'eşdeğer', 'muadil', 'jenerik', 'kutu', 'piyasa'] },
  ...drugGroups.flatMap(g => g.items
    .filter(m => titckBrands[m.key])
    .map(m => ({
      ...L,
      focus: m.label,
      title: `${m.label}: ticari adlar ve doz`,
      keywords: [m.label, ...titckBrands[m.key].brands.map(b => b.n)],
    }))),
];

// Turkish-aware folding: case, dotted/dotless i and diacritics are ignored ("insulin" finds "İnsülin")
export const fold = (s: string) =>
  s.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`]/g, '');

const prepared = [...searchIndex, ...drugListEntries].map(e => ({
  e,
  title: fold(e.title),
  crumbs: fold(`${e.section} ${e.tabLabel ?? ''}`),
  keys: e.keywords.map(fold),
}));

// A query word matches at the start of a word ("insul" finds "insülin başlama", "tansiyon" does not hit "retansiyonu")
const words = (field: string) => field.split(/[\s\-\/(),.:;+]+/).filter(Boolean);
const has = (field: string, w: string) => words(field).some(t => t.startsWith(w));

export interface SearchHit { entry: SearchEntry; matched?: string }

export function search(query: string, limit = 8): SearchHit[] {
  const q = fold(query).trim();
  if (!q) return [];
  const qWords = words(q);
  const scored: { hit: SearchHit; score: number; i: number }[] = [];
  prepared.forEach((p, i) => {
    // every typed word has to appear somewhere in the entry
    if (!qWords.every(w => has(p.title, w) || has(p.crumbs, w) || p.keys.some(k => has(k, w)))) return;
    let best = 0;
    let matched: string | undefined;
    const keyAt = (pred: (k: string) => boolean) => p.keys.findIndex(pred);
    const exact = keyAt(k => k === q), prefix = keyAt(k => k.startsWith(q)), word = keyAt(k => has(k, q));
    if (exact >= 0) { best = 95; matched = p.e.keywords[exact]; }
    else if (prefix >= 0) { best = 70; matched = p.e.keywords[prefix]; }
    else if (word >= 0) { best = 50; matched = p.e.keywords[word]; }
    if (p.title.startsWith(q)) best = Math.max(best, 85);
    else if (has(p.title, q)) best = Math.max(best, 65);
    if (has(p.crumbs, q)) best = Math.max(best, 40);
    const score = best + qWords.filter(w => has(p.title, w)).length * 5;
    scored.push({ hit: { entry: p.e, matched: has(p.title, q) ? undefined : matched }, score, i });
  });
  return scored.sort((a, b) => b.score - a.score || a.i - b.i).slice(0, limit).map(s => s.hit);
}

export const popular = ['Tanı ölçütleri', 'İnsülin başlama', 'Metformin', 'Hipoglisemi', 'eGFR doz', 'Ramazan'];
