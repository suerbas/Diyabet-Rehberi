"""Build components/treatment/drugListBrands.ts from the TİTCK licensed products list.

Usage: python -I gen.py <titck.xlsx> <out.ts> <list-date>
Keeps ATC A10* rows whose suspension column is 0, drops sweeteners (A10X),
groups packages into brand + strengths under a canonical ingredient key.
"""
import sys, re, json, collections, openpyxl

src, out, list_date = sys.argv[1], sys.argv[2], sys.argv[3]

def low(s):
    return s.replace('İ', 'i').replace('I', 'i').lower()

def key_for(atc, ingr):
    a = atc.upper().replace(' ', '')
    i = low(ingr)
    if a.startswith('A10X'):
        return None
    simple = {
        'A10BA02': 'metformin', 'A10BK01': 'dapagliflozin', 'A10BK03': 'empagliflozin',
        'A10BJ01': 'eksenatid', 'A10BJ02': 'liraglutid', 'A10BJ05': 'dulaglutid', 'A10BJ06': 'semaglutid',
        'A10BX16': 'tirzepatid', 'A10BH01': 'sitagliptin', 'A10BH02': 'vildagliptin', 'A10BH03': 'saksagliptin',
        'A10BH05': 'linagliptin', 'A10BB09': 'gliklazid', 'A10BB12': 'glimepirid', 'A10BB07': 'glipizid',
        'A10BB01': 'glibenklamid', 'A10BB04': 'glibornurid', 'A10BB02': 'klorpropamid', 'A10BX02': 'repaglinid',
        'A10BG03': 'pioglitazon', 'A10BF01': 'akarboz', 'A10BF02': 'miglitol', 'A10BF03': 'vogliboz',
        'A10BD05': 'pioglitazon+metformin', 'A10BD07': 'sitagliptin+metformin', 'A10BD08': 'vildagliptin+metformin',
        'A10BD11': 'linagliptin+metformin', 'A10BD14': 'repaglinid+metformin', 'A10BD15': 'dapagliflozin+metformin',
        'A10BD19': 'empagliflozin+linagliptin', 'A10BD20': 'empagliflozin+metformin',
        'A10AB01': 'insan-regular', 'A10AB05': 'aspart', 'A10AB06': 'glulisin', 'A10AC01': 'nph',
        'A10AD01': 'insan-karisim', 'A10AD30': 'insan-karisim', 'A10AD05': 'aspart-karisim',
        'A10AD06': 'degludek-aspart', 'A10AE05': 'detemir', 'A10AE06': 'degludek',
        'A10AE54': 'glarjin-liksisenatid', 'A10AE56': 'degludek-liraglutid',
    }
    if a in simple:
        k = simple[a]
        if k == 'pioglitazon+metformin' and 'lipoik' in i:
            return 'pioglitazon+metformin+ala'
        return k
    if a == 'A10AB04':
        return 'lispro'
    if a == 'A10AD04':
        return 'lispro-karisim' if 'protamin' in i else 'lispro'
    if a == 'A10AE04':
        return 'glarjin'
    if a == 'A10BX03':
        return 'nateglinid+ala' if 'lipoik' in i else 'nateglinid'
    if a == 'A10BD02':
        return 'gliklazid+metformin' if 'gliklazid' in i else 'glibenklamid+metformin'
    if a in ('A10BD', 'A10B'):
        if 'miglitol' in i: return 'miglitol+metformin'
        if 'nateglinid' in i: return 'nateglinid+metformin'
        if 'lipoik' in i: return 'pioglitazon+ala'
        if 'linagliptin' in i: return 'linagliptin+metformin'
    return 'DIGER:' + a + ':' + ingr

DEVICE = r'\b(PENFILL|FLEXPEN|KWIKPEN|SOLOSTAR|FLEXTOUCH|OPTIPEN|KARTUŞ|KARTUS|DRAJE)\b'
FORM = (r'\b(FILM|FİLM|TABLET|TB|KAPSUL|KAPSÜL|ENJ\w*|SC|SUBKUTAN|FLAKON|EFERVESAN|UZATILMIŞ|DEĞİŞTİRİLMİŞ|'
        r'MODİFİYE|KONTROLLÜ|KULLANIMA|ÇİĞNEME|ÇENTİKLİ|ORAL|İNFÜZYON)\b')

def brand_of(name):
    n = name.upper().replace('İ', 'I')
    n = re.split(r'[,(]', n)[0]
    n = re.split(r'\s(?=%?\s*\d)', n)[0]
    n = re.split(FORM.replace('İ', 'I'), n)[0]
    n = re.sub(DEVICE, '', n)
    n = re.sub(r'[^A-Z0-9ÇĞÖŞÜ \-]', '', n)
    n = re.sub(r'\s+', ' ', n).strip(' -')
    return n

KEEP_UPPER = {'SR', 'XR', 'MR', 'HM', 'NPH', 'AS', 'ALA', 'XL'}

def display(b):
    parts = re.split(r'([\s\-]+)', b)
    outp = []
    for p in parts:
        if not p.strip() or p.strip('-') == '':
            outp.append(p); continue
        m = re.match(r'^([A-Z]+)(\d*)$', p)
        if p in KEEP_UPPER:
            outp.append(p)
        elif m:
            outp.append(m.group(1)[0] + m.group(1)[1:].lower() + m.group(2))
        else:
            outp.append(p.capitalize())
    return ''.join(outp)

CHAIN = re.compile(r'(\d+(?:[.,]\d+)?(?:\s*(?:MG)?\s*/\s*\d+(?:[.,]\d+)?)+)\s*MG(?![A-Z/])')
NUM = r'(\d+(?:[.,]\d+)?)'
STR = re.compile(NUM + r'\s*(MG/ML|IU/ML|U/ML|Ü/ML|ÜNITE/ML|MG|µG|ΜG|MCG)' +
                 r'(?:\s*/\s*' + NUM + r'\s*(ML|µL|ΜL))?')

def strength_of(name):
    n = name.upper().replace('İ', 'I')
    m = CHAIN.search(n)
    if m:
        parts = re.split(r'\s*(?:MG)?\s*/\s*', m.group(1))
        return '/'.join(x.strip().replace('.', ',') for x in parts) + ' mg'
    m = STR.search(n)
    if not m:
        return ''
    a, u, vol, vu = m.groups()
    a = a.replace('.', ',')
    u = {'ΜG': 'µg', 'µG': 'µg', 'MCG': 'µg', 'IU/ML': 'IU/mL', 'U/ML': 'U/mL', 'Ü/ML': 'U/mL',
         'ÜNITE/ML': 'U/mL', 'MG/ML': 'mg/mL', 'MG': 'mg'}[u]
    # keep the volume only for oral solutions (e.g. 500 mg/5 mL), not for pen doses (0,5 mL, µL)
    if vol and vu == 'ML' and float(vol.replace(',', '.')) >= 1:
        return f"{a} {u}/{vol.replace('.', ',')} mL"
    return f'{a} {u}'

def skey(s):
    nums = re.findall(r'\d+(?:,\d+)?', s)
    return [float(x.replace(',', '.')) for x in nums] or [0]

wb = openpyxl.load_workbook(src, read_only=True)
ws = wb.worksheets[0]
groups = collections.defaultdict(lambda: collections.defaultdict(set))
counts = collections.Counter()
for i, r in enumerate(ws.iter_rows(values_only=True)):
    if i < 2:
        continue
    atc = str(r[4] or '').strip().replace('\xa0', '')
    if not atc.upper().startswith('A10'):
        continue
    if r[11] not in (0, '0'):
        continue
    k = key_for(atc, str(r[3] or ''))
    if k is None:
        continue
    b = brand_of(str(r[2]))
    groups[k][b].add(strength_of(str(r[2])))
    counts[k] += 1

unknown = [k for k in groups if k.startswith('DIGER')]
if unknown:
    print('UNMAPPED', unknown, file=sys.stderr)

data = {}
for k, brands in groups.items():
    items = []
    for b, st in sorted(brands.items(), key=lambda x: display(x[0])):
        st = sorted({s for s in st if s}, key=skey)
        items.append({'n': display(b), 's': st})
    data[k] = {'packages': counts[k], 'brands': items}

with open(out, 'w', encoding='utf-8', newline='\n') as f:
    f.write('// Otomatik üretildi: TİTCK Ruhsatlı Beşeri Tıbbi Ürünler Listesi, ' + list_date + '.\n')
    f.write('// ATC A10 (tatlandırıcılar hariç), ruhsatı askıda olmayan ürünler. Elle düzenlemeyin.\n\n')
    f.write("export const titckListDate = '" + list_date + "';\n\n")
    f.write('export interface TitckBrand { n: string; s: string[] }\n')
    f.write('export const titckBrands: Record<string, { packages: number; brands: TitckBrand[] }> = ')
    f.write(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True))
    f.write(';\n')
print(len(data), 'groups,', sum(counts.values()), 'packages')
