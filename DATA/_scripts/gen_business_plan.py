# gen_business_plan.py — genera src/lib/businessStudyPlan.ts desde el xlsx parseado
# (DATA/BUSINESS/_scrape/plan_pulso_v2.json). Calendario canónico = formato A días 1-4
# + formato B días 5-96 (v2). No inventa: lecturas/acciones salen tal cual del Excel;
# los links son búsquedas reales de YouTube (libro + autor) y el canal del recurso.
import json, re, unicodedata

d = json.load(open('DATA/BUSINESS/_scrape/plan_pulso_v2.json', encoding='utf-8'))
cal = d['Calendario']

MES = {'ene':1,'feb':2,'mar':3,'abr':4,'may':5,'jun':6,'jul':7,'ago':8,'sep':9,'oct':10,'nov':11,'dic':12,
       'jan':1,'apr':4,'aug':8,'dec':12}
def iso(f):
    m = re.match(r'(\d{1,2})-([a-z]+)-(\d{2})', f.strip().lower())
    if not m: return None
    dd, mes, yy = int(m.group(1)), MES.get(m.group(2)[:3]), 2000+int(m.group(3))
    return f'{yy}-{mes:02d}-{dd:02d}' if mes else None

# título→n de los 28 libros (keywords únicos, en minúscula)
LIBROS = [
 (1,'obesity code'),(2,'outlive'),(3,'ozempic'),(4,'in defense of food'),(5,'hormone cure'),
 (6,'estrogen matters'),(8,'why we sleep'),(9,'circadian code'),(10,'feeling good'),
 (11,'lost connections'),(12,'how emotions are made'),(13,'adhd 2.0'),(14,'driven to distraction'),
 (15,'smart but scattered'),(16,'come as you are'),(17,'mating in captivity'),(18,'attached'),
 (19,'sex-starved'),(20,'$100m offers'),(21,'$100m leads'),(22,'$100m money models'),
 (23,'influence'),(24,'dotcom secrets'),(25,'expert secrets'),(26,'storybrand'),
 (27,'breakthrough advertising'),(28,'ultralearning'),
]
AUTOR = {1:'Jason Fung',2:'Peter Attia',3:'Alexandra Sowa',4:'Michael Pollan',5:'Sara Gottfried',
 6:'Avrum Bluming',8:'Matthew Walker',9:'Satchin Panda',10:'David Burns',11:'Johann Hari',
 12:'Lisa Feldman Barrett',13:'Hallowell Ratey',14:'Hallowell Ratey',15:'Dawson Guare',
 16:'Emily Nagoski',17:'Esther Perel',18:'Levine Heller',19:'Weiner Davis',20:'Alex Hormozi',
 21:'Alex Hormozi',22:'Alex Hormozi',23:'Robert Cialdini',24:'Russell Brunson',25:'Russell Brunson',
 26:'Donald Miller',27:'Eugene Schwartz',28:'Scott Young'}
TITULO = {n:t for n,t in LIBROS}

def libro_de(lectura):
    low = lectura.lower()
    for n, kw in LIBROS:
        if kw in low: return n
    return None

def yt(q):
    return 'https://www.youtube.com/results?search_query=' + re.sub(r'\s+','+', q.strip())

dias = []
for r in cal:
    if r[0].strip().isdigit():           # formato A (días 1-4 originales)
        dnum = int(r[0])
        if dnum > 4: continue            # 5-6 originales quedan sustituidos por v2
        fecha, wd, mat, lect, acc, mn = r[1], r[2], r[3], r[4], r[5], r[6]
    elif len(r) > 6 and r[1].strip().isdigit():  # formato B (v2, días 5-96)
        dnum = int(r[1])
        fecha, wd, mat, lect, acc, mn = r[2], r[3], r[4], r[5], r[6], '120'
    else:
        continue
    f = iso(fecha)
    if not f: continue
    n = libro_de(lect)
    rec = {
        'd': dnum, 'fecha': f, 'wd': wd.strip(), 'materia': mat.strip(),
        'lectura': lect.strip(), 'accion': (acc or '').strip(),
        'min': int(re.sub(r'\D','', mn) or 0) if str(mn).strip() else (0 if mat.strip()=='DESCANSO' else 120),
        'libroN': n,
        'yt': yt(f'{TITULO[n]} {AUTOR[n]} resumen español') if n else None,
    }
    dias.append(rec)

dias.sort(key=lambda x: x['d'])
seen = set(); clean = []
for x in dias:
    if x['d'] in seen: continue
    seen.add(x['d']); clean.append(x)
assert clean[0]['d'] == 1 and clean[-1]['d'] == 96 and len(clean) == 96, f"calendario incompleto: {len(clean)}"

def ts_str(s): return json.dumps(s, ensure_ascii=False)
rows = []
for x in clean:
    rows.append('{d:%d,fecha:%s,wd:%s,materia:%s,lectura:%s,accion:%s,min:%d,libroN:%s,yt:%s}' % (
        x['d'], ts_str(x['fecha']), ts_str(x['wd']), ts_str(x['materia']), ts_str(x['lectura']),
        ts_str(x['accion']), x['min'],
        'null' if x['libroN'] is None else x['libroN'],
        'null' if x['yt'] is None else ts_str(x['yt'])))

out = '''/**
 * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (96 días · 28-may → 31-ago-2026).
 * GENERADO por DATA/_scripts/gen_business_plan.py desde plan_estudio_pulso_v2_mejorado.xlsx
 * (calendario v2: días 1-4 originales + 5-96 modificados). NO editar a mano.
 *
 * Bloque diario de 2h (hoja Técnicas — minuto a minuto, Make It Stick + Deep Work):
 * prep 5min → lectura activa 50min → descanso real 10min → aplicación/output 45min →
 * Anki + Feynman 10min. Links = búsquedas reales de YouTube (libro + autor).
 */
export interface DiaBiz {
  d: number; fecha: string; wd: string; materia: string;
  lectura: string; accion: string; min: number;
  libroN: number | null; yt: string | null;
}

export const BIZ_META = {
  inicio: '2026-05-28', fin: '2026-08-31', totalDias: 96,
  bloque: '2h/día · prep → lectura activa → descanso → aplicación → Anki/Feynman',
};

export const BIZ_FRANJAS = [
  { hora: '0–5 min', fase: 'PREPARACIÓN: cerrar todo, modo avión, agua, lápiz + Obsidian + libro', tipo: 'prep' },
  { hora: '5–55 min', fase: 'SESIÓN 1 · LECTURA ACTIVA: highlighter + notas en tus palabras (Cornell)', tipo: 'read' },
  { hora: '55–65 min', fase: 'DESCANSO REAL: caminar 5 min, agua, sin celular (modo difuso · Oakley)', tipo: 'rest' },
  { hora: '65–110 min', fase: 'SESIÓN 2 · APLICACIÓN: producir el output operativo del día (protocolo/copy)', tipo: 'apply' },
  { hora: '110–120 min', fase: 'CIERRE: 3-5 cards Anki + auto-explicación oral (Feynman)', tipo: 'anki' },
];

export const BIZ_DIAS: DiaBiz[] = [%s];

export function bizDiaDe(fechaISO: string): DiaBiz | undefined { return BIZ_DIAS.find(x => x.fecha === fechaISO); }
export function bizPrevio(d: DiaBiz): DiaBiz | undefined { return BIZ_DIAS.find(x => x.d === d.d - 1); }
export function biz7d(fromD: number): DiaBiz[] { return BIZ_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }

/** color por materia (paleta Pulso: oro + acentos) */
export const BIZ_MATERIA_COLOR: Record<string, string> = {
  MARKETING: '#D9BE8A', BIOLOGIA: '#3FB984', META: '#7BB1FF', PESO: '#3FB984',
  HORMONAL: '#E8A0BF', 'SUEÑO': '#8FB6E8', MENTAL: '#A78BFA', FOCO: '#F5A623',
  PAREJA: '#E5708A', SINTESIS: '#D9BE8A', DESCANSO: '#8F9097',
};
export const bizColor = (m: string) => BIZ_MATERIA_COLOR[m] || '#D9BE8A';
''' % (','.join(rows))

open('src/lib/businessStudyPlan.ts', 'w', encoding='utf-8').write(out)
mats = {}
for x in clean: mats[x['materia']] = mats.get(x['materia'], 0) + 1
print('OK 96 dias ·', len([x for x in clean if x['libroN']]), 'con libro ·', mats)
