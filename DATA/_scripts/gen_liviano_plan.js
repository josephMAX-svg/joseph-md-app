// gen_liviano_plan.js — GENERA el motor día-a-día de LIVIANO Academia (90 días L-V):
//
//   src/lib/livianoStudyPlan.ts               (LIV_DIAS · LIV_META · LIV_FRANJAS · colores)
//   src/lib/livianoCasos.ts                   (LIV_CASOS · LIV_RUBRICA · LIV_DRILLS · LIV_ANKI_CARDS · decks)
//   DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv   (CSV importable en Anki: deck APEX::LIVIANO::<modulo>)
//
// Fuente ÚNICA: DATA/BUSINESS/liviano_curriculum.json (módulos → temas → estudio/aplicación/fuente/min,
// tarjetas Anki de MECANISMO por tema, drills de cifras ancla, 16 casos únicos + rúbrica).
// NO editar los .ts generados a mano: editar el JSON y regenerar.
//
// Reglas de calendario (idénticas a remap_inicio.js / gen_aurum_plan.js):
//  · INICIO = argv[2] (YYYY-MM-DD; default = inicioDefault del JSON = lun 2026-11-02 desde v6.06 —v6.05: lun 2026-10-26 · hasta v6.03: lun 2026-09-07, v5.6—; el pipeline pasa siempre la fecha:
//    v5.20 = v6.00 = mié 2026-10-07 → 90 días hasta el vie 12-feb-2027 · v6.01 = lun 2026-10-12 → mié 17-feb-2027 · v6.02 = lun 2026-10-19 → mié 24-feb-2027 · v6.03 = mié 2026-10-21 → vie 26-feb-2027 · v6.05 = lun 2026-10-26 → mié 3-mar-2027 · v6.06 = lun 2026-11-02 → mié 10-mar-2027).
//  · 90 días HÁBILES L-V consecutivos; salta SÁB/DOM y los feriados fijos del JSON (25-dic · 31-dic · 1-ene).
//  · Los 16 CASOS caen en VIERNES reales (invariante que antes garantizaba liviano_reslot_viernes.js).
//    Si hay más viernes que casos (v5.20: 17 viernes), los casos van en los PRIMEROS viernes con ≥2 días de contenido delante y el
//    viernes sobrante es el ÚLTIMO (vie 12-feb, contenido) → caso 16 = vie 5-feb, antes del capstone (jue 11-feb). Hasta v5.19 se
//    saltaban los PRIMEROS viernes (semana parcial de arranque).
//  · pretest:true en cada LUNES con semana previa (pre-test ciego 5Q sobre D-7, dentro de los 25' de estudio).
//  · drill:true en los temas marcados en el JSON (drill de cifras ancla ciego cada ~20 días).
//  · casoId en las filas de viernes; el detalle clínico + rúbrica vive en livianoCasos.ts.
//
// Formato de fila (remap_inicio.js bloque 7 lo parsea con regex "fecha":"YYYY-MM-DD","wd":"..."):
//   {"d":..,"fecha":"..","wd":"..","modulo":..,"tema":..,"estudio":..,"aplicacion":..,"fuente":..,"min":..,
//    "casoId"?:n,"pretest"?:true,"drill"?:true}
// LIV_META mantiene EXACTAMENTE  inicio: 'YYYY-MM-DD', fin: 'YYYY-MM-DD', totalDias: 90  (regex del remap).
//
// v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): 90 hábiles lun 12-oct → mié 17-feb-2027 (+3 hábiles; el fin se AMPLÍA, nada se recorta).
//    Con D1 en lunes hay EXACTAMENTE 16 viernes → los 16 casos van uno por viernes (vie 16-oct … caso 16 = vie 12-feb, D87) y ningún viernes
//    sobra; el caso 16 sigue ANTES del capstone (D89 mar 16-feb) y la revisión trimestral II + cierre es el D90 mié 17-feb. Revisión
//    trimestral I = D46 lun 14-dic. Módulo 7 (Acceso en Perú) = D39 + D41-D44 (jue 3 → jue 10-dic) con el caso 8 el D40 vie 4-dic y el caso 9
//    el D45 vie 11-dic → src/lib/empresaData.ts (planDia / planDias / fechaPlan) re-sincronizado a mano con estas filas.
// v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): 90 hábiles lun 19-oct → mié 24-feb-2027 (+5 hábiles; el fin se AMPLÍA, nada se recorta).
//    Siguen saliendo EXACTAMENTE 16 viernes (9 hasta el vie 18-dic + 7 desde el vie 8-ene; los vie 25-dic y 1-ene son SKIP) → un caso por viernes;
//    D1-D49 conservan su D# (una semana después); el caso 10 pasa del D50 vie 18-dic (v6.01) al D57 vie 8-ene y la síntesis M3 + drill del D57 al
//    D56 jue 7-ene (drills D37 · D56 · D75 · D88 = mar 8-dic · jue 7-ene · mié 3-feb · lun 22-feb). Caso 16 = D87 vie 19-feb, capstone D89 mar
//    23-feb, revisión trimestral I D46 lun 21-dic · II D90 mié 24-feb. Módulo 7 = D39 + D41-D44 (jue 10 → jue 17-dic), caso 8 D40 vie 11-dic,
//    caso 9 D45 vie 18-dic → src/lib/empresaData.ts re-sincronizado (fechas, revisiones D46/D90 y planDias de la síntesis M3: [56, 66]).
// v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20-oct sin estudio): 90 hábiles mié 21-oct → VIE 26-FEB-2027 (+2 hábiles; el fin se
//    AMPLÍA, nada se recorta: mismo contenido en el mismo orden, mismos 16 casos, 18 pre-tests y 4 drills). Con D1 en miércoles hay 17 viernes →
//    los 16 casos van en los PRIMEROS viernes con ≥2 días de contenido delante (regla v5.20) y el viernes que sobra es el ÚLTIMO (vie 26-feb =
//    D90, REVISIÓN TRIMESTRAL II + cierre). Los D# vuelven al patrón de v6.00 = v5.20 (D1 también en miércoles): caso 1 = D3 vie 23-oct … caso 8
//    D38 vie 11-dic · caso 9 D43 vie 18-dic · caso 10 D55 vie 8-ene · caso 15 D80 vie 12-feb · caso 16 (integral) D85 vie 19-feb, ANTES del repaso
//    integral D88 mié 24-feb y del capstone D89 jue 25-feb. Drills D37 · D57 · D76 · D88 = jue 10-dic · mar 12-ene · lun 8-feb · mié 24-feb.
//    Módulo 7 (Acceso en Perú) = D40-D42 + D44-D45 (mar 15 → mar 22-dic) con el caso 9 el D43 vie 18-dic en medio; revisión trimestral I = D46 mié
//    23-dic. Síntesis M1 D20 · M2 D39 · M3 D57 (+ drill) · M4 D67 · M6 D76 (+ drill) · M5 D87 → src/lib/empresaData.ts re-sincronizado a mano.
//    CSV Anki: importar el D16 mié 11-nov-2026 (10 tarjetas de MECANISMO del módulo 1).
// v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; no se estudió del lun 19 al dom 25-oct; orden de Joseph «todo inicia el lunes 26 … no quites
//    temas, solamente corre lo que está faltando»): 90 hábiles lun 26-oct → MIÉ 3-MAR-2027 (+3 hábiles sobre v6.03 = +5 sobre v6.02; el fin se AMPLÍA,
//    nada se recorta: mismo contenido en el mismo orden, mismos 16 casos, 18 pre-tests y 4 drills). Con D1 en lunes vuelve a haber EXACTAMENTE 16
//    viernes (8 hasta el vie 18-dic + 8 desde el vie 8-ene; los vie 25-dic y 1-ene son SKIP) → un caso por viernes y ningún viernes sobra: caso 1 =
//    D5 vie 30-oct … caso 8 D40 vie 18-dic · caso 9 D52 vie 8-ene (el 1.er viernes tras los feriados) · caso 10 D57 vie 15-ene … caso 15 D82 vie
//    19-feb · caso 16 (integral) D87 vie 26-feb, ANTES del repaso integral D88 lun 1-mar y del capstone D89 mar 2-mar; revisión trimestral II + cierre
//    D90 mié 3-mar. Módulo 7 (Acceso en Perú) = D39 + D41-D44 (jue 17 → jue 24-dic) con el caso 8 el D40 vie 18-dic en medio; revisión trimestral
//    I = D45 lun 28-dic (v6.03: D46). Drills D37 · D56 · D75 · D88 = mar 15-dic · jue 14-ene · mié 10-feb · lun 1-mar. Síntesis M1 D19 · M2 D38 ·
//    M3 D56 (+ drill) · M4 D66 · M6 D75 (+ drill) · M5 D86 → src/lib/empresaData.ts re-sincronizado a mano. CSV Anki: importar el D16 lun 16-nov-2026
//    (10 tarjetas de MECANISMO del módulo 1).
// v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; la semana del lun 26-oct tampoco se estudió; orden de Joseph «reestructura todo a partir del
//    2 de noviembre … corre nada más, corre también las fechas límite … para no perder materias, tan solamente corre»): 90 hábiles lun 2-nov →
//    MIÉ 10-MAR-2027 (+5 hábiles sobre v6.05, una semana exacta; el fin se AMPLÍA, nada se recorta: mismo contenido en el mismo orden, mismos 16
//    casos, 18 pre-tests y 4 drills; antes de los PROTEGIDOS vie 12 → lun 15-mar, así que no hace falta saltarlos). Con D1 en lunes hay EXACTAMENTE
//    16 viernes (7 hasta el vie 18-dic + 9 desde el vie 8-ene; los vie 25-dic y 1-ene son SKIP) → un caso por viernes: caso 1 = D5 vie 6-nov …
//    caso 7 D35 vie 18-dic · caso 8 D47 vie 8-ene (el 1.er viernes tras los feriados; v6.05: D40 vie 18-dic) · caso 9 (acceso) D52 vie 15-ene …
//    caso 15 D82 vie 26-feb · caso 16 (integral) D87 vie 5-mar, ANTES del repaso integral D88 lun 8-mar y del capstone D89 mar 9-mar; revisión
//    trimestral II + cierre D90 mié 10-mar (semana del ENCAPS: LIVIANO 17:15 en F2; el jue 11-mar, D-2, ya no hay LIVIANO). Módulo 7 (Acceso en
//    Perú) = D39-D43 SEGUIDOS (jue 24-dic → lun 4-ene: registro jue 24 · condición lun 28 · precio mar 29 · magistral mié 30-dic · cadena de frío
//    lun 4-ene; sin caso en medio); revisión trimestral I = D44 mar 5-ene (v6.05: D45 lun 28-dic). Drills D37 · D56 · D75 · D88 = mar 22-dic · jue
//    21-ene · mié 17-feb · lun 8-mar. Síntesis M1 D19 · M2 D38 · M3 D56 (+ drill) · M4 D66 · M6 D75 (+ drill) · M5 D86 → src/lib/empresaData.ts
//    re-sincronizado a mano. CSV Anki: importar el D16 lun 23-nov-2026 (10 tarjetas de MECANISMO del módulo 1).
// Determinista (sin Date.now()/Math.random). Regenerar:  node DATA/_scripts/gen_liviano_plan.js 2026-11-02   (v6.06; v6.05: 2026-10-26 · v6.03: 2026-10-21 · v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07; v5.6: 2026-09-07)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CUR_PATH = path.join(ROOT, 'DATA', 'BUSINESS', 'liviano_curriculum.json');
const OUT_PLAN = path.join(ROOT, 'src', 'lib', 'livianoStudyPlan.ts');
const OUT_CASOS = path.join(ROOT, 'src', 'lib', 'livianoCasos.ts');
const OUT_CSV = path.join(ROOT, 'DATA', 'BUSINESS', 'ANKI_COLA', 'LIVIANO_mecanismo.csv');

const CUR = JSON.parse(fs.readFileSync(CUR_PATH, 'utf8'));
const START = process.argv[2] || CUR.inicioDefault;
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);
const TOTAL = CUR.totalDias || 90;
const SKIP = new Set(CUR.skipFijos || []);

// ─── calendario (UTC, sin DST) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = (s) => fromISO(s).getUTCDay();
const wdOf = (s) => WD[dow(s)];
const isWeekend = (s) => { const w = dow(s); return w === 0 || w === 6; };
function calNoWeekend(start, n) { const o = []; let c = start; while (o.length < n) { if (!isWeekend(c) && !SKIP.has(c)) o.push(c); c = addDays(c, 1); } return o; }

const fechas = calNoWeekend(START, TOTAL);

// ─── aplanar contenido (no-viernes) en el orden del JSON ───
const contenido = [];
for (const m of CUR.modulos) {
  for (const t of m.temas) contenido.push({ modulo: m.id, slug: m.slug, ...t });
}
const casos = CUR.casos.slice().sort((a, b) => a.id - b.id);
const viernes = fechas.filter((f) => dow(f) === 5);
if (viernes.length < casos.length) throw new Error(`viernes disponibles ${viernes.length} < casos ${casos.length}`);
// v5.20 (6-oct-2026): los casos van en los PRIMEROS viernes que tengan ≥2 días de contenido delante (antes: se saltaban los
// primeros viernes sobrantes). Con D1 en miércoles hay 17 viernes y el salto del primero mandaba el CASO 16 (integral) al
// vie 12-feb, DESPUÉS del capstone y de la revisión trimestral II; así el viernes que sobra es el ÚLTIMO (contenido) y el
// caso 16 queda el vie 5-feb, antes del capstone, como en v5.19.
const viernesOk = viernes.filter((f) => fechas.indexOf(f) >= 2);
const viernesUsables = viernesOk.length >= casos.length ? viernesOk : viernes;
const viernesConCaso = new Set(viernesUsables.slice(0, casos.length));
const viernesSinCaso = viernes.filter((f) => !viernesConCaso.has(f));
const skipFirst = viernesSinCaso.length;
const esperadoContenido = TOTAL - casos.length;
if (contenido.length !== esperadoContenido) throw new Error(`contenido ${contenido.length} ≠ ${esperadoContenido} (= ${TOTAL} − ${casos.length} casos)`);

// ─── construir las filas ───
const rows = [];
let ci = 0, ki = 0;
const drillsPorD = [];      // [{d, modulo, titulo, qs}]
const casosPorD = {};       // casoId → {d, fecha}
for (let idx = 0; idx < fechas.length; idx++) {
  const fecha = fechas[idx];
  const wd = wdOf(fecha);
  const d = idx + 1;
  if (viernesConCaso.has(fecha)) {
    const c = casos[ki++];
    casosPorD[c.id] = { d, fecha };
    rows.push({
      d, fecha, wd, modulo: c.modulo,
      tema: `VIERNES CASO ${c.id}/${casos.length} · ${c.titulo}`,
      estudio: `Repaso Anki de la semana + montar el caso: ${c.paciente}`,
      aplicacion: `Role-play 20 min: ${c.consigna} → puntúa la rúbrica 0-2 × 4 (mecanismo · metáfora · people-first · plan)`,
      fuente: c.fuente, min: 45, casoId: c.id,
    });
  } else {
    const t = contenido[ci++];
    if (!t) throw new Error('sin contenido para ' + fecha);
    const row = {
      d, fecha, wd, modulo: t.modulo, tema: t.tema, estudio: t.estudio, aplicacion: t.aplicacion,
      fuente: t.fuente || CUR.modulos.find((m) => m.id === t.modulo && m.slug === t.slug).fuente, min: t.min || 45,
    };
    if (wd === 'Lun' && idx > 0) row.pretest = true;
    if (t.drill) { row.drill = true; drillsPorD.push({ d, fecha, modulo: t.modulo, titulo: t.tema, qs: t.drillQs || [] }); }
    rows.push(row);
    t._d = d; t._fecha = fecha; // para las tarjetas Anki
  }
}
if (ci !== contenido.length || ki !== casos.length) throw new Error(`sobran filas: contenido ${contenido.length - ci}, casos ${casos.length - ki}`);
if (rows.length !== TOTAL) throw new Error('rows ' + rows.length);

// ─── verificaciones duras ───
for (const r of rows) {
  if (isWeekend(r.fecha)) throw new Error('fin de semana: ' + r.fecha);
  if (SKIP.has(r.fecha)) throw new Error('feriado: ' + r.fecha);
  if (r.casoId && r.wd !== 'Vie') throw new Error('caso fuera de viernes: D' + r.d);
  if (r.pretest && r.wd !== 'Lun') throw new Error('pretest fuera de lunes: D' + r.d);
}
const finISO = rows[rows.length - 1].fecha;

// ─── colores por módulo ───
const colores = {};
for (const m of CUR.modulos) colores[m.id] = m.color;

// ─── tarjetas Anki (deck APEX::LIVIANO::<slug>) ───
const deckRoot = CUR.ankiDeckRoot || 'APEX::LIVIANO';
const decks = {};
for (const m of CUR.modulos) decks[m.id] = `${deckRoot}::${m.slug}`;
const cards = [];
for (const t of contenido) {
  for (const c of t.anki || []) cards.push({ d: t._d, fecha: t._fecha, modulo: t.modulo, deck: decks[t.modulo], q: c.q, a: c.a });
}
// ~10 tarjetas/semana: informe por semana del plan (5 filas hábiles = 1 semana)
const semanaDe = (d) => Math.ceil(d / 5);
const cardsPorSemana = {};
for (const c of cards) cardsPorSemana[semanaDe(c.d)] = (cardsPorSemana[semanaDe(c.d)] || 0) + 1;

// ─── salida 1: livianoStudyPlan.ts ───
const modulosResumen = CUR.modulos.map((m) => `${m.id} ${rows.filter((r) => r.modulo === m.id && !r.casoId).length}`).join(' · ');
const planTS = `/**
 * livianoStudyPlan.ts — Plan DÍA A DÍA "LIVIANO Academia" (${TOTAL} días L-V, medicina de la
 * obesidad). GENERADO por DATA/_scripts/gen_liviano_plan.js desde DATA/BUSINESS/liviano_curriculum.json
 * (${CUR.version}). NO editar a mano — editar el JSON y regenerar:
 *     node DATA/_scripts/gen_liviano_plan.js ${START}
 *
 * Bloque diario de 45 min (17:15–18:00 L-V): 25' estudio del módulo (tarjetas de MECANISMO,
 * estilo Palmerton) + 20' APLICACIÓN = explicárselo a un paciente (metáforas: termostato,
 * ruido de comida, ladrillo, GPS). Cada VIERNES real: 1 caso del banco LIV_CASOS (casoId) con
 * rúbrica 0-2 × 4. Cada LUNES (desde la semana 2): pre-test ciego 5Q sobre D-7 (pretest:true).
 * Drill de cifras ancla ciego cada ~20 días (drill:true). Módulos (días de contenido):
 * ${modulosResumen}. Sin sesión: fines de semana + ${[...SKIP].join(' / ')}.
 * Inicio ${rows[0].fecha} → fin ${finISO}. Casos en viernes: ${casos.length}/${casos.length}.
 */
export interface DiaLiviano {
  d: number; fecha: string; wd: string; modulo: string;
  tema: string; estudio: string; aplicacion: string; fuente: string; min: number;
  /** viernes: id del caso clínico en LIV_CASOS (livianoCasos.ts) */
  casoId?: number;
  /** lunes: pre-test ciego de 5 preguntas sobre la semana anterior (dentro de los 25' de estudio) */
  pretest?: boolean;
  /** drill de cifras ancla en ciego (LIV_DRILLS por d) */
  drill?: boolean;
}

export const LIV_META = {
  inicio: '${rows[0].fecha}', fin: '${finISO}', totalDias: ${TOTAL},
  franja: '${CUR.franja}',
  casos: ${casos.length}, pretests: ${rows.filter((r) => r.pretest).length}, drills: ${drillsPorD.length},
  metaCiegoPct: ${CUR.metaCiegoPct || 80}, generadoDesde: 'DATA/BUSINESS/liviano_curriculum.json',
};

export const LIV_FRANJAS = [
  { hora: '17:15–17:40', fase: 'ESTUDIO · 25 min: mecanismo del día (Palmerton — tarjetas de ¿por qué?, no datos sueltos). Lunes: los primeros 5-7 min son el pre-test ciego 5Q', tipo: 'estudio' },
  { hora: '17:40–18:00', fase: 'APLICACIÓN · 20 min: explicárselo al paciente — metáfora en voz alta / role-play / caso (viernes: rúbrica 0-2 × 4)', tipo: 'aplicacion' },
];

export const LIV_DIAS: DiaLiviano[] = ${JSON.stringify(rows)};

export function livDiaDe(fechaISO: string): DiaLiviano | undefined { return LIV_DIAS.find(x => x.fecha === fechaISO); }
/** Los próximos N días del plan a partir de un día d (exclusivo). */
export function livProximos(fromD: number, n = 5): DiaLiviano[] { return LIV_DIAS.filter(x => x.d > fromD && x.d <= fromD + n); }
/** Las 5 filas anteriores a d (la "semana D-7" del pre-test del lunes). */
export function livSemanaPrevia(d: number): DiaLiviano[] { return LIV_DIAS.filter(x => x.d >= d - 5 && x.d < d); }

/** color por módulo (paleta LIVIANO: salvia + acentos del design system) — viene del JSON */
export const LIV_MODULO_COLOR: Record<string, string> = ${JSON.stringify(colores, null, 2).replace(/"([^"]+)":/g, "'$1':").replace(/"/g, "'")};
export const livColor = (m: string) => LIV_MODULO_COLOR[m] || '#9DB07F';
`;
fs.writeFileSync(OUT_PLAN, planTS, 'utf8');

// ─── salida 2: livianoCasos.ts ───
const casosOut = casos.map((c) => ({
  id: c.id, d: casosPorD[c.id].d, fecha: casosPorD[c.id].fecha, semana: c.semana, bloque: c.bloque, modulo: c.modulo,
  titulo: c.titulo, paciente: c.paciente, datos: c.datos, redFlags: c.redFlags, consigna: c.consigna,
  decisiones: c.decisiones, cierre: c.cierre, pistas: c.pistas, fuente: c.fuente,
}));
const j = (v) => JSON.stringify(v, null, 2);
const casosTS = `/**
 * livianoCasos.ts — Banco de CASOS de viernes, rúbrica, drills de cifras ancla y tarjetas Anki de
 * MECANISMO de LIVIANO Academia. GENERADO por DATA/_scripts/gen_liviano_plan.js desde
 * DATA/BUSINESS/liviano_curriculum.json (${CUR.version}). NO editar a mano — editar el JSON y regenerar.
 *
 * · LIV_CASOS: ${casos.length} casos ÚNICOS con progresión por competencia (sem 1-4 mecanismo sin culpa ·
 *   5-8 elegir fármaco y titular · 9-12 EA/estancamiento/proteína · 13-15 límite de competencia y
 *   derivación · 16 integral con cierre de programa). Cada caso: datos clínicos, red flags, 3 decisiones
 *   esperadas, frase de cierre, pistas por ítem de la rúbrica. Cifras clínicas solo si están en las
 *   fuentes de LIVIANO_ACADEMIA.md; lo demás lleva "A VERIFICAR".
 * · LIV_RUBRICA: 4 ítems 0-2 (mecanismo · metáfora · people-first/sin estigma · plan pactado y medible).
 * · LIV_DRILLS: drills ciegos de cifras ancla (por d del plan).
 * · LIV_ANKI_CARDS: ${cards.length} tarjetas de mecanismo generadas del campo "estudio" (~10/semana);
 *   deck APEX::LIVIANO::<modulo>. CSV importable: DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv.
 * Los campos d/fecha se recalculan en cada regeneración (mismo calendario que LIV_DIAS).
 */
export interface LivRubricaItem { id: string; item: string; desc: string; n0: string; n1: string; n2: string; }
export interface LivCaso {
  id: number; d: number; fecha: string; semana: number; bloque: string; modulo: string;
  titulo: string; paciente: string; datos: string[]; redFlags: string[]; consigna: string;
  decisiones: string[]; cierre: string; pistas: Record<string, string>; fuente: string;
}
export interface LivDrillQ { q: string; a: string; }
export interface LivDrill { d: number; fecha: string; modulo: string; titulo: string; qs: LivDrillQ[]; }
export interface LivAnkiCard { d: number; fecha: string; modulo: string; deck: string; q: string; a: string; }

export const LIV_RUBRICA: LivRubricaItem[] = ${j(CUR.rubrica)};
/** meta por caso (sobre 8) y media del bloque (%) — Palmerton: mastery ≥ 80 % */
export const LIV_META_RUBRICA = ${j(CUR.metaRubrica)};
export const LIV_META_CIEGO_PCT = ${CUR.metaCiegoPct || 80};

export const LIV_CASOS: LivCaso[] = ${j(casosOut)};

export const LIV_DRILLS: LivDrill[] = ${j(drillsPorD)};

/** Deck raíz + sub-deck por módulo (convención APEX::<sección>::<slug>, ver ankiLinks.ts / SYNC_ANKI). */
export const LIV_ANKI_DECK_ROOT = '${deckRoot}';
export const LIV_ANKI_DECK: Record<string, string> = ${j(decks)};
export const livAnkiDeck = (modulo: string) => LIV_ANKI_DECK[modulo] || LIV_ANKI_DECK_ROOT;

export const LIV_ANKI_CARDS: LivAnkiCard[] = ${JSON.stringify(cards)};

export function livCasoDe(casoId: number): LivCaso | undefined { return LIV_CASOS.find(c => c.id === casoId); }
export function livCasoDeDia(d: number): LivCaso | undefined { return LIV_CASOS.find(c => c.d === d); }
export function livDrillDe(d: number): LivDrill | undefined { return LIV_DRILLS.find(x => x.d === d); }
export function livCardsDeDia(d: number): LivAnkiCard[] { return LIV_ANKI_CARDS.filter(c => c.d === d); }
/** Tarjetas de las 5 filas previas a d (la semana D-7). */
export function livCardsSemanaPrevia(d: number): LivAnkiCard[] { return LIV_ANKI_CARDS.filter(c => c.d >= d - 5 && c.d < d); }
/**
 * Pre-test ciego del lunes: 5 tarjetas de la semana anterior, repartidas por día de forma
 * determinista (misma selección en cada render). Si hay < 5, devuelve las que haya.
 */
export function livPretest(d: number, n = 5): LivAnkiCard[] {
  const pool = livCardsSemanaPrevia(d);
  if (pool.length <= n) return pool;
  const out: LivAnkiCard[] = [];
  const paso = pool.length / n;
  for (let i = 0; i < n; i++) out.push(pool[Math.floor(i * paso)]);
  return out;
}
`;
fs.writeFileSync(OUT_CASOS, casosTS, 'utf8');

// ─── salida 3: CSV Anki (tab-separado, cabeceras de importación de Anki) ───
fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
const clean = (s) => String(s).replace(/[\t\r\n]+/g, ' ').trim();
const csvLines = [
  '#separator:tab',
  '#html:false',
  '#deck column:3',
  '#tags column:4',
  '#columns:Front\tBack\tDeck\tTags',
];
for (const c of cards) {
  const slug = c.deck.split('::').pop();
  csvLines.push([clean(c.q), clean(c.a), c.deck, `liviano::${slug} d${String(c.d).padStart(2, '0')} mecanismo`].join('\t'));
}
fs.writeFileSync(OUT_CSV, csvLines.join('\n') + '\n', 'utf8');

// ─── informe ───
const porModulo = {};
for (const r of rows) porModulo[r.modulo] = (porModulo[r.modulo] || 0) + 1;
console.log(`LIVIANO gen ✓ ${rows.length} filas · ${rows[0].fecha} (${rows[0].wd}) → ${finISO} (${rows[rows.length - 1].wd})`);
console.log(`  casos en viernes: ${rows.filter((r) => r.casoId && r.wd === 'Vie').length}/${casos.length} · viernes sin caso: ${skipFirst} (${viernesSinCaso.join(', ') || '—'})`);
console.log(`  pre-tests (lunes): ${rows.filter((r) => r.pretest).length} · drills: ${drillsPorD.map((x) => 'D' + x.d).join(', ')} · revisión trimestral: ${rows.filter((r) => /REVISIÓN TRIMESTRAL/.test(r.tema)).map((r) => 'D' + r.d + ' ' + r.fecha).join(', ')}`);
console.log(`  filas por módulo (incl. casos): ${Object.entries(porModulo).map(([k, v]) => k + ' ' + v).join(' · ')}`);
console.log(`  síntesis→protocolo: ${rows.filter((r) => /Síntesis módulo|Capstone/.test(r.tema)).map((r) => 'D' + r.d).join(', ')}`);
console.log(`  Anki: ${cards.length} tarjetas · por semana: ${Object.entries(cardsPorSemana).map(([k, v]) => 'S' + k + ':' + v).join(' ')}`);
console.log(`  escritos: ${path.relative(ROOT, OUT_PLAN)} · ${path.relative(ROOT, OUT_CASOS)} · ${path.relative(ROOT, OUT_CSV)}`);
