# -*- coding: utf-8 -*-
# gen_business_plan.py — genera src/lib/businessStudyPlan.ts (plan "Estudio Pulso").
#
#   v3 L (5-sep-2026, Palmerton cero puntos ciegos · vacío 6):
#     python DATA/_scripts/gen_business_plan.py [YYYY-MM-DD]        (default 2026-09-07 = D1 v5.6)
#     Fuente: DATA/BUSINESS/plan_pulso_v3_L.json — 84 filas de trabajo en formato "L"
#     (20-25 min/día en huecos, L-J) + OUTPUT el viernes. Se colocan en días HÁBILES L-V
#     saltando sáb/dom y los feriados fijos (25-dic, 31-dic, 1-ene); sáb/dom y feriados se
#     emiten como filas DESCANSO (misma forma de fila que reconstruye remap_inicio.js).
#     Links: audiolibro verificado de la Biblioteca del Fundador (bibliotecaNiveles.ts) o
#     búsqueda real de YouTube (libro + autor). No inventa lecturas: salen tal cual del JSON.
#
#   v2 legado (xlsx):
#     python DATA/_scripts/gen_business_plan.py --v2
#     Lee DATA/BUSINESS/_scrape/plan_pulso_v2.json (dump del xlsx, intacto) y emite el
#     calendario original de 96 días (formato A días 1-4 + formato B días 5-96).
#
# FORMATO DE FILA (no cambiar sin leer DATA/_scripts/remap_inicio.js, bloque 6 "Business"):
#   {d:N,fecha:"YYYY-MM-DD",wd:"Lun",materia:"…",lectura:"…",accion:"…",min:N,libroN:N|null,yt:"…"|null[,modo:"…"]}
#   · sin llaves dentro de los strings (remap parte las filas por '},{')
#   · las filas DESCANSO se detectan por materia:"DESCANSO" (remap las descarta y las regenera)
#   · la línea META debe casar con: inicio: 'YYYY-MM-DD', fin: '…', totalDias: N, // …
#   · `modo` es OPCIONAL (remap regenera los DESCANSO sin ese campo).
import json, re, sys, io, datetime as dt
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'src' / 'lib' / 'businessStudyPlan.ts'
WD = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']  # weekday(): 0 = lunes
SKIP_FIJOS = {'2026-12-25', '2026-12-31', '2027-01-01'}  # v5.4+: feriados libres en todos los planes

def ts_str(s): return json.dumps(s, ensure_ascii=False)

def yt_search(q):
    return 'https://www.youtube.com/results?search_query=' + re.sub(r'\s+', '+', q.strip())

# ─── audiolibros verificados de la Biblioteca del Fundador (n → url) ───
def audio_por_n():
    src = (ROOT / 'src' / 'lib' / 'bibliotecaNiveles.ts').read_text(encoding='utf-8')
    out = {}
    for m in re.finditer(r"\{ n: (\d+), titulo: '((?:[^'\\]|\\.)*)'.*?\}", src):
        n = int(m.group(1)); body = m.group(0)
        yt = re.search(r"audioYoutube: '([^']*)'", body)
        sp = re.search(r"audioSpotify: '([^']*)'", body)
        out[n] = (yt.group(1) if yt else None) or (sp.group(1) if sp else None)
    return out

def fila(d, fecha, wd, materia, lectura, accion, mn, libroN, yt, modo=None):
    r = '{d:%d,fecha:%s,wd:%s,materia:%s,lectura:%s,accion:%s,min:%d,libroN:%s,yt:%s' % (
        d, ts_str(fecha), ts_str(wd), ts_str(materia), ts_str(lectura), ts_str(accion), mn,
        'null' if libroN is None else libroN, 'null' if yt is None else ts_str(yt))
    if modo: r += ',modo:%s' % ts_str(modo)
    return r + '}'

for k in ('lectura', 'accion'):
    pass

# ═══════════════════════════════ v3 L ═══════════════════════════════
def gen_v3(start_iso):
    if not re.match(r'^20\d\d-\d\d-\d\d$', start_iso): raise SystemExit('START inválido (YYYY-MM-DD): ' + start_iso)
    plan = json.loads((ROOT / 'DATA' / 'BUSINESS' / 'plan_pulso_v3_L.json').read_text(encoding='utf-8'))
    work = plan['dias']
    for r in work:
        for k in ('lectura', 'accion'):
            if '{' in r[k] or '}' in r[k]: raise SystemExit('llaves dentro de un string (rompe remap_inicio.js): ' + r[k])
    assert len(work) == 84, 'v3 L espera 84 filas de trabajo (remap_inicio.js las exige), hay %d' % len(work)
    audio = audio_por_n()
    lect = [r for r in work if r['modo'] != 'OUTPUT']
    outs = [r for r in work if r['modo'] == 'OUTPUT']
    MIN = {'L': 25, 'CRITICA': 25, 'OUTPUT': 40}

    rows, d = [], 1
    cur = dt.date.fromisoformat(start_iso)
    DESC_FINDE = 'DÍA LIBRE TOTAL (fin de semana). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.'
    while lect or outs:
        iso = cur.isoformat(); wd = WD[cur.weekday()]
        if cur.weekday() >= 5:
            rows.append(fila(d, iso, wd, 'DESCANSO', DESC_FINDE, '', 0, None, None, 'DESCANSO'))
        elif iso in SKIP_FIJOS:
            rows.append(fila(d, iso, wd, 'DESCANSO', 'FERIADO (%s): día libre. Sin lectura ni output.' % iso, '', 0, None, None, 'DESCANSO'))
        else:
            # viernes → OUTPUT (si quedan); L-J → lectura (si quedan); si una cola se agota, sigue la otra
            if cur.weekday() == 4 and outs: r = outs.pop(0)
            elif lect: r = lect.pop(0)
            else: r = outs.pop(0)
            n = r.get('libroN')
            yt = None
            if n is not None:
                yt = audio.get(n) or yt_search('%s %s resumen español' % (r.get('libro', ''), r.get('autor', '')))
            rows.append(fila(d, iso, wd, r['materia'], r['lectura'], r['accion'], MIN[r['modo']], n, yt, r['modo']))
        d += 1; cur += dt.timedelta(days=1)
    total = len(rows); fin = rows[-1].split('fecha:"')[1].split('"')[0]
    n_work = sum(1 for x in rows if 'materia:"DESCANSO"' not in x)
    assert n_work == 84
    meta_comment = 'generado START=%s · SÁB y DOM LIBRES + feriados fijos fuera · 84 trabajo + %d descansos' % (start_iso, total - 84)
    ts = '''/**
 * businessStudyPlan.ts — Plan "Estudio Pulso" v3 L (%d filas = 84 de trabajo + %d DESCANSO sáb/dom/feriados).
 * GENERADO por DATA/_scripts/gen_business_plan.py desde DATA/BUSINESS/plan_pulso_v3_L.json — NO editar a mano.
 * Regenerar: python DATA/_scripts/gen_business_plan.py YYYY-MM-DD (re-fechado en corrimientos: remap_inicio.js, bloque Business).
 *
 * Formato L (5-sep-2026, Palmerton cero puntos ciegos): SIN franja en el horario v5.6. 20-25 min/día de
 * audiolibro/lectura en los huecos (L-J) + 1 OUTPUT pequeño el viernes (25-40 min). Solo lo que no cubren
 * AURUM (marketing/ventas) ni LIVIANO_ACADEMIA (obesidad/GLP-1): BIOLOGIA · SUEÑO · MENTAL · FOCO · PAREJA
 * + OUTPUT; PESO = Biblioteca del Fundador nivel 3-4 (Hungry Brain, Burn, Outlive) y PESO/HORMONAL en modo
 * CRITICA ("lectura crítica: contrastar con la Academia / CURVA_ACADEMIA"). Tracker semanal = Metricas_v2.
 * Links = audiolibro verificado de bibliotecaNiveles.ts o búsqueda real de YouTube (libro + autor).
 */
export type BizModo = 'L' | 'CRITICA' | 'OUTPUT' | 'DESCANSO';
export interface DiaBiz {
  d: number; fecha: string; wd: string; materia: string;
  lectura: string; accion: string; min: number;
  libroN: number | null; yt: string | null;
  modo?: BizModo; // L = lectura en huecos · CRITICA = contrastar con la Academia · OUTPUT = viernes · (ausente en DESCANSO regenerados por remap)
}

export const BIZ_META = {
  inicio: '%s', fin: '%s', totalDias: %d, // %s
  bloque: 'Formato L · 20-25 min/día en huecos (audiolibro/lectura, L-J) + 1 output el viernes · sin franja en el horario v5.6',
  minLectura: 25, minOutput: 40,
};

/** Micro-estructura del formato L (no es un bloque del Calendar: son tus huecos). */
export const BIZ_FRANJAS = [
  { hora: '0–2 min', fase: 'OBJETIVO: leer la lectura de hoy y la acción; abrir el audiolibro o el libro', tipo: 'prep' },
  { hora: '2–20 min', fase: 'ESCUCHAR / LEER en el hueco (coche, cola, gimnasio, comida) — un solo tramo del libro', tipo: 'read' },
  { hora: '20–25 min', fase: 'CERRAR: nota de 3 líneas en Obsidian o 1 tarjeta de mecanismo (¿por qué?), no datos sueltos', tipo: 'anki' },
  { hora: 'viernes 25–40 min', fase: 'OUTPUT: 1 entregable pequeño y TERMINADO (1 página, guion, tabla, tarjetas) + fila del tracker semanal', tipo: 'apply' },
];

/** Tracker semanal (hoja Metricas_v2 del xlsx original) — se llena el viernes junto al OUTPUT. */
export const BIZ_TRACKER = [
  { metrica: 'Sueño 7-8 h', meta: '≥ 6/7 días' },
  { metrica: 'Ejercicio (fuerza 2x + zona 2)', meta: '≥ 5/7 días' },
  { metrica: 'Comida real (Pollan)', meta: '≥ 6/7 días' },
  { metrica: 'Score biológico semanal', meta: '≥ 85%%' },
  { metrica: 'Lecturas L completadas', meta: '≥ 4/4' },
  { metrica: 'Output semanal terminado', meta: '1' },
  { metrica: 'Regla', meta: '< 80%% dos semanas seguidas → ajustar el plan (Metricas_v2)' },
];

export const BIZ_DIAS: DiaBiz[] = [%s];

export function bizDiaDe(fechaISO: string): DiaBiz | undefined { return BIZ_DIAS.find(x => x.fecha === fechaISO); }
export function bizPrevio(d: DiaBiz): DiaBiz | undefined { return BIZ_DIAS.find(x => x.d === d.d - 1); }
export function biz7d(fromD: number): DiaBiz[] { return BIZ_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
/** Modo efectivo de un día (los DESCANSO regenerados por remap no traen `modo`). */
export function bizModo(x: DiaBiz): BizModo { return x.modo || (x.materia === 'DESCANSO' ? 'DESCANSO' : x.materia === 'OUTPUT' ? 'OUTPUT' : 'L'); }

/** color por materia (paleta Pulso: oro + acentos) */
export const BIZ_MATERIA_COLOR: Record<string, string> = {
  MARKETING: '#D9BE8A', BIOLOGIA: '#3FB984', META: '#7BB1FF', PESO: '#3FB984',
  HORMONAL: '#E8A0BF', 'SUEÑO': '#8FB6E8', MENTAL: '#A78BFA', FOCO: '#F5A623',
  PAREJA: '#E5708A', SINTESIS: '#D9BE8A', OUTPUT: '#D9BE8A', DESCANSO: '#8F9097',
};
export const bizColor = (m: string) => BIZ_MATERIA_COLOR[m] || '#D9BE8A';
''' % (total, total - 84, start_iso, fin, total, meta_comment, ','.join(rows))
    OUT.write_text(ts, encoding='utf-8')
    mats = {}
    for r in work: mats[r['materia']] = mats.get(r['materia'], 0) + 1
    vie_out = sum(1 for x in rows if 'wd:"Vie"' in x and 'materia:"OUTPUT"' in x)
    print('OK v3 L → %s' % OUT.relative_to(ROOT))
    print('  inicio %s · fin %s · total %d filas · 84 trabajo · %d descansos (finde + feriados)' % (start_iso, fin, total, total - 84))
    print('  outputs en viernes: %d/%d · materias: %s' % (vie_out, len(outs) + vie_out, mats))

# ═══════════════════════════════ v2 legado (xlsx) ═══════════════════════════════
def gen_v2():
    d = json.load(open(ROOT / 'DATA/BUSINESS/_scrape/plan_pulso_v2.json', encoding='utf-8'))
    cal = d['Calendario']
    MES = {'ene':1,'feb':2,'mar':3,'abr':4,'may':5,'jun':6,'jul':7,'ago':8,'sep':9,'oct':10,'nov':11,'dic':12,
           'jan':1,'apr':4,'aug':8,'dec':12}
    def iso(f):
        m = re.match(r'(\d{1,2})-([a-z]+)-(\d{2})', f.strip().lower())
        if not m: return None
        dd, mes, yy = int(m.group(1)), MES.get(m.group(2)[:3]), 2000+int(m.group(3))
        return f'{yy}-{mes:02d}-{dd:02d}' if mes else None
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
    dias = []
    for r in cal:
        if r[0].strip().isdigit():
            dnum = int(r[0])
            if dnum > 4: continue
            fecha, wd, mat, lect, acc, mn = r[1], r[2], r[3], r[4], r[5], r[6]
        elif len(r) > 6 and r[1].strip().isdigit():
            dnum = int(r[1])
            fecha, wd, mat, lect, acc, mn = r[2], r[3], r[4], r[5], r[6], '120'
        else:
            continue
        f = iso(fecha)
        if not f: continue
        n = libro_de(lect)
        dias.append({'d': dnum, 'fecha': f, 'wd': wd.strip(), 'materia': mat.strip(), 'lectura': lect.strip(),
                     'accion': (acc or '').strip(),
                     'min': int(re.sub(r'\D','', mn) or 0) if str(mn).strip() else (0 if mat.strip()=='DESCANSO' else 120),
                     'libroN': n, 'yt': yt_search(f'{TITULO[n]} {AUTOR[n]} resumen español') if n else None})
    dias.sort(key=lambda x: x['d'])
    seen = set(); clean = []
    for x in dias:
        if x['d'] in seen: continue
        seen.add(x['d']); clean.append(x)
    assert clean[0]['d'] == 1 and clean[-1]['d'] == 96 and len(clean) == 96, f"calendario incompleto: {len(clean)}"
    rows = [fila(x['d'], x['fecha'], x['wd'], x['materia'], x['lectura'], x['accion'], x['min'], x['libroN'], x['yt']) for x in clean]
    ts = '''/**
 * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (96 días · 28-may → 31-ago-2026) — LEGADO v2 (xlsx).
 * GENERADO por DATA/_scripts/gen_business_plan.py --v2 desde plan_estudio_pulso_v2_mejorado.xlsx. NO editar a mano.
 */
export type BizModo = 'L' | 'CRITICA' | 'OUTPUT' | 'DESCANSO';
export interface DiaBiz {
  d: number; fecha: string; wd: string; materia: string;
  lectura: string; accion: string; min: number;
  libroN: number | null; yt: string | null; modo?: BizModo;
}
export const BIZ_META = {
  inicio: '2026-05-28', fin: '2026-08-31', totalDias: 96, // legado v2 · bloque 2h/día
  bloque: '2h/día · prep → lectura activa → descanso → aplicación → Anki/Feynman',
  minLectura: 120, minOutput: 120,
};
export const BIZ_FRANJAS = [
  { hora: '0–5 min', fase: 'PREPARACIÓN: cerrar todo, modo avión, agua, lápiz + Obsidian + libro', tipo: 'prep' },
  { hora: '5–55 min', fase: 'SESIÓN 1 · LECTURA ACTIVA: highlighter + notas en tus palabras (Cornell)', tipo: 'read' },
  { hora: '55–65 min', fase: 'DESCANSO REAL: caminar 5 min, agua, sin celular (modo difuso · Oakley)', tipo: 'rest' },
  { hora: '65–110 min', fase: 'SESIÓN 2 · APLICACIÓN: producir el output operativo del día (protocolo/copy)', tipo: 'apply' },
  { hora: '110–120 min', fase: 'CIERRE: 3-5 cards Anki + auto-explicación oral (Feynman)', tipo: 'anki' },
];
export const BIZ_TRACKER: { metrica: string; meta: string }[] = [];
export const BIZ_DIAS: DiaBiz[] = [%s];
export function bizDiaDe(fechaISO: string): DiaBiz | undefined { return BIZ_DIAS.find(x => x.fecha === fechaISO); }
export function bizPrevio(d: DiaBiz): DiaBiz | undefined { return BIZ_DIAS.find(x => x.d === d.d - 1); }
export function biz7d(fromD: number): DiaBiz[] { return BIZ_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
export function bizModo(x: DiaBiz): BizModo { return x.modo || (x.materia === 'DESCANSO' ? 'DESCANSO' : x.materia === 'OUTPUT' ? 'OUTPUT' : 'L'); }
export const BIZ_MATERIA_COLOR: Record<string, string> = {
  MARKETING: '#D9BE8A', BIOLOGIA: '#3FB984', META: '#7BB1FF', PESO: '#3FB984',
  HORMONAL: '#E8A0BF', 'SUEÑO': '#8FB6E8', MENTAL: '#A78BFA', FOCO: '#F5A623',
  PAREJA: '#E5708A', SINTESIS: '#D9BE8A', OUTPUT: '#D9BE8A', DESCANSO: '#8F9097',
};
export const bizColor = (m: string) => BIZ_MATERIA_COLOR[m] || '#D9BE8A';
''' % (','.join(rows))
    OUT.write_text(ts, encoding='utf-8')
    print('OK v2 legado: 96 días')

if __name__ == '__main__':
    args = [a for a in sys.argv[1:]]
    if '--v2' in args: gen_v2()
    else: gen_v3(next((a for a in args if re.match(r'^20\d\d-\d\d-\d\d$', a)), '2026-09-07'))
