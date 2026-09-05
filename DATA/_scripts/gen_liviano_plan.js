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
//  · INICIO = argv[2] (YYYY-MM-DD; default = inicioDefault del JSON = lun 2026-09-07, v5.6).
//  · 90 días HÁBILES L-V consecutivos; salta SÁB/DOM y los feriados fijos del JSON (25-dic · 31-dic · 1-ene).
//  · Los 16 CASOS caen en VIERNES reales (invariante que antes garantizaba liviano_reslot_viernes.js).
//    Si hay más viernes que casos, se saltan los PRIMEROS viernes (semana parcial de arranque).
//  · pretest:true en cada LUNES con semana previa (pre-test ciego 5Q sobre D-7, dentro de los 25' de estudio).
//  · drill:true en los temas marcados en el JSON (drill de cifras ancla ciego cada ~20 días).
//  · casoId en las filas de viernes; el detalle clínico + rúbrica vive en livianoCasos.ts.
//
// Formato de fila (remap_inicio.js bloque 7 lo parsea con regex "fecha":"YYYY-MM-DD","wd":"..."):
//   {"d":..,"fecha":"..","wd":"..","modulo":..,"tema":..,"estudio":..,"aplicacion":..,"fuente":..,"min":..,
//    "casoId"?:n,"pretest"?:true,"drill"?:true}
// LIV_META mantiene EXACTAMENTE  inicio: 'YYYY-MM-DD', fin: 'YYYY-MM-DD', totalDias: 90  (regex del remap).
//
// Determinista (sin Date.now()/Math.random). Regenerar:  node DATA/_scripts/gen_liviano_plan.js 2026-09-07
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
const skipFirst = Math.max(0, viernes.length - casos.length);
if (viernes.length < casos.length) throw new Error(`viernes disponibles ${viernes.length} < casos ${casos.length}`);
const viernesConCaso = new Set(viernes.slice(skipFirst));
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
console.log(`  casos en viernes: ${rows.filter((r) => r.casoId && r.wd === 'Vie').length}/${casos.length} · viernes sin caso: ${skipFirst} (${viernes.slice(0, skipFirst).join(', ') || '—'})`);
console.log(`  pre-tests (lunes): ${rows.filter((r) => r.pretest).length} · drills: ${drillsPorD.map((x) => 'D' + x.d).join(', ')} · revisión trimestral: ${rows.filter((r) => /REVISIÓN TRIMESTRAL/.test(r.tema)).map((r) => 'D' + r.d + ' ' + r.fecha).join(', ')}`);
console.log(`  filas por módulo (incl. casos): ${Object.entries(porModulo).map(([k, v]) => k + ' ' + v).join(' · ')}`);
console.log(`  síntesis→protocolo: ${rows.filter((r) => /Síntesis módulo|Capstone/.test(r.tema)).map((r) => 'D' + r.d).join(', ')}`);
console.log(`  Anki: ${cards.length} tarjetas · por semana: ${Object.entries(cardsPorSemana).map(([k, v]) => 'S' + k + ':' + v).join(' ')}`);
console.log(`  escritos: ${path.relative(ROOT, OUT_PLAN)} · ${path.relative(ROOT, OUT_CASOS)} · ${path.relative(ROOT, OUT_CSV)}`);
