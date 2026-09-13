#!/usr/bin/env node
/**
 * gen_derma_ciclo2.js — GENERA src/lib/dermaCiclo2.ts: CICLO 2 de Dermatología (30 sesiones, d74-d103), 12-sep-2026.
 *
 * Cierra el vacío nº8 de gaps_v3b_derma: "el plan termina en d70 y nada existe después". Qué programa:
 *   · los 36 casos restantes de la permutación DERMA_CASO_ORDEN (posiciones 164-199) a 3/sesión en las 12 primeras
 *     sesiones (d74-d85) → la primera pasada de los 200 termina en d85 (mismo orden aleatorio fijo, 0 casos repetidos);
 *   · desde d86: SEGUNDA PASADA FSRS = solo casos y preguntas fallados del ledger (0 casos nuevos);
 *   · review: Pictorial 3e (relevo, 363Q) alternando con Barnhill restante (403Q), QOTW/CORE restantes en los 3 checkpoints;
 *   · 1 módulo G+ (DERMA_GAP_MODULOS de dermaData.ts: G+1…G+9) por semana en el slot de lectura de 10′, en la
 *     primera sesión Derma de cada semana (9 semanas);
 *   · 10Q ProMIR-Derma en d ≡ 0 mod 3 (10 slots = los 10 capítulos, uno cada uno, por peso MIR);
 *   · 3 checkpoints: cp1 (d85, fin de la primera pasada) · cp2 (d94, re-drill + drill HDPH) · repaso2 (d103, mapa final + drill).
 *
 * Calendario: días-Derma = paridad de días hábiles desde el ancla 2026-06-10 (researchData.ts#diaEstudioTipo, la misma
 * función de remap_inicio.js), L-V, salta 25-dic/31-dic/1-ene. Verifica 0 solapes con researchDailyPlan.ts y
 * researchDailyPlan2027.ts antes de escribir.
 *
 * Uso:
 *   node DATA/_scripts/gen_derma_ciclo2.js                 # arranca en el primer día-Derma posterior a DERMA_DAILY_META.fin
 *   node DATA/_scripts/gen_derma_ciclo2.js 2027-04-09      # primer día-Derma >= fecha (corrimientos: correr DESPUÉS de remap_inicio.js)
 *
 * Formato de fila: `{ d, fecha: 'YYYY-MM-DD', ... }` dentro de `DERMA_DIAS_CICLO2: DiaDermaCiclo2[] = [` … `];`
 * (30 campos `fecha:`; compatible con replaceFechas/countFechas de remap_inicio.js si algún día se añade un bloque 5b).
 * Anti-alucinación: todas las URLs proceden de dermaDailyPlan.ts / dermaData.ts (ya verificadas); nada nuevo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const argv = process.argv.slice(2);
const FECHA_ARG = argv.find((a) => /^20\d\d-\d\d-\d\d$/.test(a)) || null;
const HOY = new Date().toISOString().slice(0, 10);
const N = 30;

// ─── Calendario (idéntico a remap_inicio.js, UTC) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const wdOf = (s) => WD[fromISO(s).getUTCDay()];
const SKIP_FIJOS = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
function tipoDia(s) {
  const d = fromISO(s), dow = d.getUTCDay();
  if (dow === 0 || dow === 6) return 'descanso';
  let cnt = 0; const cur = fromISO('2026-06-10');
  while (cur < d) { const wd = cur.getUTCDay(); if (wd !== 0 && wd !== 6) cnt++; cur.setUTCDate(cur.getUTCDate() + 1); }
  return cnt % 2 === 0 ? 'research' : 'derma';
}
function slots(start, n) {
  const o = []; let c = start;
  while (o.length < n) { if (tipoDia(c) === 'derma' && !SKIP_FIJOS.has(c)) o.push(c); c = addDays(c, 1); }
  return o;
}
/** Lunes ISO de la semana de una fecha (clave de "1 G+ por semana"). */
function lunesDe(s) { const d = fromISO(s); const dow = d.getUTCDay(); const back = dow === 0 ? 6 : dow - 1; d.setUTCDate(d.getUTCDate() - back); return iso(d); }
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

// ─── Leer el ciclo 1 (dermaDailyPlan.ts) ───
const planTs = fs.readFileSync(path.join(ROOT, 'src/lib/dermaDailyPlan.ts'), 'utf8');
const metaM = planTs.match(/export const DERMA_DAILY_META = \{[\s\S]*?inicio: '(20\d\d-\d\d-\d\d)', fin: '(20\d\d-\d\d-\d\d)', totalDias: (\d+)/);
if (!metaM) throw new Error('dermaDailyPlan.ts: no encuentro DERMA_DAILY_META (inicio/fin/totalDias)');
const FIN_C1 = metaM[2]; const D_OFFSET = Number(metaM[3]);
const permM = planTs.match(/DERMA_CASO_ORDEN: number\[\] = \[([\s\S]*?)\];/);
const PERM = permM[1].split(',').map((x) => x.trim()).filter(Boolean).map(Number);
if (PERM.length !== 200 || new Set(PERM).size !== 200) throw new Error('DERMA_CASO_ORDEN inválida');
const ppM = planTs.match(/primeraPasada: (\d+)/); const PRIMERA = Number(ppM[1]);
const RESTANTES = PERM.slice(PRIMERA);
const blkI = planTs.indexOf('DERMA_DIAS: DiaDerma[] = ['); const blkJ = planTs.indexOf('];', blkI);
const FECHAS_C1 = [...planTs.slice(blkI, blkJ).matchAll(/fecha:\s*'(20\d\d-\d\d-\d\d)'/g)].map((m) => m[1]);
if (FECHAS_C1.length !== D_OFFSET) throw new Error(`ciclo 1: ${FECHAS_C1.length} fechas ≠ totalDias ${D_OFFSET}`);
// usados por el ciclo 1 (para verificar que los 36 restantes no se repiten)
const CASOS_C1 = [...planTs.slice(blkI, blkJ).matchAll(/casoIds: \[([^\]]*)\]/g)].flatMap((m) => m[1].split(',').map((x) => Number(x.trim())).filter(Boolean));
if (CASOS_C1.length !== PRIMERA) throw new Error(`ciclo 1 consume ${CASOS_C1.length} casos ≠ primeraPasada ${PRIMERA}`);
if (CASOS_C1.some((id) => RESTANTES.includes(id))) throw new Error('un caso restante ya está en el ciclo 1');

// ─── Research: todas las fechas de ambos ciclos (0 solapes) ───
const RES = new Set();
for (const f of ['src/lib/researchDailyPlan.ts', 'src/lib/researchDailyPlan2027.ts']) {
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of t.matchAll(/fecha:\s*'(20\d\d-\d\d-\d\d)'/g)) RES.add(m[1]);
}

// ─── Fechas del ciclo 2 ───
const START = FECHA_ARG || addDays(FIN_C1, 1);
const FECHAS = slots(START, N);
for (const f of FECHAS) {
  if (tipoDia(f) !== 'derma') throw new Error('no es día Derma: ' + f);
  if (SKIP_FIJOS.has(f)) throw new Error('feriado: ' + f);
  if (RES.has(f)) throw new Error('SOLAPE con Research: ' + f);
  if (FECHAS_C1.includes(f)) throw new Error('solape con el ciclo 1: ' + f);
}
if (FECHAS[0] <= FIN_C1) throw new Error(`el ciclo 2 (${FECHAS[0]}) no puede empezar antes del fin del ciclo 1 (${FIN_C1})`);

// ─── G+ (dermaData.ts) ───
const dataTs = fs.readFileSync(path.join(ROOT, 'src/lib/dermaData.ts'), 'utf8');
const GPLUS = [...dataTs.matchAll(/\{ id: '(G\+\d)', titulo: '((?:[^'\\]|\\.)*)'/g)].map((m) => ({ id: m[1], titulo: m[2].replace(/\\'/g, "'") }));
if (GPLUS.length !== 9) throw new Error('dermaData.ts: esperaba 9 módulos G+, hay ' + GPLUS.length);
const GPLUS_BKEY = { 'G+1': 'B', 'G+2': 'B', 'G+3': 'B', 'G+4': 'B', 'G+5': 'B', 'G+6': 'F', 'G+7': 'D', 'G+8': 'B', 'G+9': 'X' };

// ─── ProMIR: d ≡ 0 mod 3 → capítulos por peso (uno cada uno) ───
const CAPS_POR_PESO = [4, 2, 3, 1, 5, 8, 6, 7, 9, 10];
// ─── Dermoscopedia (pares) — mismas páginas que dermaDailyPlan.ts (verificadas 5-sep) ───
const DSP_KEYS = ['red', 'glob', 'streaks', 'veil', 'vasos', 'neg', 'dots', 'struct', 'chaos', 'twoStep', 'three', 'seven', 'menzies', 'abcd', 'pattern'];

// ─── Construcción de las 30 sesiones ───
const CP = { 12: 'cp1', 21: 'cp2', 30: 'repaso2' }; // k 1-based
const rows = []; let gI = 0; let semanaVista = new Set(); let altBank = 0; let promirI = 0; let dspI = 0; let pos = 0;
for (let k = 1; k <= N; k++) {
  const d = D_OFFSET + k; const fecha = FECHAS[k - 1];
  const cp = CP[k] || null;
  const conCasos = k <= 12;
  const casos = conCasos ? RESTANTES.slice(pos, pos + 3) : []; if (conCasos) pos += 3;
  const lunes = lunesDe(fecha);
  let gplus = null;
  if (!semanaVista.has(lunes) && gI < GPLUS.length && !cp) { gplus = GPLUS[gI++]; }
  semanaVista.add(lunes);
  const tipo = cp ? 'checkpoint' : conCasos ? 'casos' : 'fsrs';
  const bKey = cp ? 'H' : gplus ? GPLUS_BKEY[gplus.id] : 'Z';
  const tier = cp || gplus ? 'ALTA' : 'MED';
  const bloque = cp ? 'Ciclo 2 · checkpoint' : gplus ? `Ciclo 2 · ${gplus.id} enriquecimiento` : conCasos ? 'Ciclo 2 · casos restantes (primera pasada)' : 'Ciclo 2 · segunda pasada FSRS';
  // review
  let qb;
  if (cp === 'cp1' || cp === 'repaso2') qb = 'rQOTW2';
  else if (cp === 'cp2') qb = 'rCORE2';
  else { qb = altBank % 2 === 0 ? 'rPIC3b' : 'rBARN2'; altBank++; }
  const promir = d % 3 === 0 ? CAPS_POR_PESO[promirI++] : null;
  const dermImg = d % 2 === 1 ? 'DSA2' : `DSP2.${DSP_KEYS[dspI++ % DSP_KEYS.length]}`;
  // textos
  let sub, access, extra, morf, sitio, ddx, atlas;
  if (cp === 'cp1') {
    sub = 'CICLO 2 · Checkpoint 1: fin de la PRIMERA PASADA de los 200 casos → mapa de fallos por módulo CORE (ledger) y por bloque A-X; qué re-drillear en la segunda pasada';
    access = 'CASO_DD2'; extra = "{ t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE2 }"; morf = 'Mapa de fallos'; sitio = 'Difuso';
    ddx = ['% fallo por área del ledger tras 200 casos: Med (110) · Path (30) · Peds (30) · Surg (30)', 'Tipo de error dominante (CCSN/CONCEPTO/MORFOLOGIA/DDX) → cura de DERMA_CURA_LINK', 'Cursor de cada banco (dermaBancoCursores): qué queda de Pictorial 3e / Barnhill'];
    atlas = 'IMG_LIB2';
  } else if (cp === 'cp2') {
    sub = 'CICLO 2 · Checkpoint 2: re-drill de fallos etiquetados + pares del DD Challenge de las 2 áreas flojas + drill oclusión vascular 90 s (cronometrado)';
    access = 'CASO_DD2'; extra = "{ t: 'Guidebook to Dermatologic Diagnosis (repaso)', url: book(2960) }"; morf = 'Mapa de fallos'; sitio = 'Difuso';
    ddx = ['Pares del DD Challenge de las 2 áreas con mayor % fallo (dermaAreasFlojas)', 'Re-drill FSRS de los casos fallados (dermaCasosParaSegundaPasada)', 'Drill HDPH cronometrado: signos → dosis → intervalos → ceguera → oftalmología'];
    atlas = 'DN_QUIZ2';
  } else if (cp === 'repaso2') {
    sub = 'CICLO 2 · REPASO FINAL: mapa final de debilidades (export JSON → _registro_derma.json) + drill HDPH 90 s + plan de la fase práctica 2027 (dermatoscopio, Nítida, fellowship)';
    access = 'CASO_DD2'; extra = "{ t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE2 }"; morf = 'Repaso'; sitio = 'Difuso';
    ddx = ['Mapa final por módulo CORE y por bloque A-X (dermaLedgerExportJSON)', 'Drill HDPH 90 s final: recitar sin mirar', 'Siguiente: fase práctica (RUTA_FELLOWSHIP_ESTETICO.md · NITIDA_PROTOCOLOS.md)'];
    atlas = 'DN_QUIZ2';
  } else if (conCasos) {
    sub = `CICLO 2 · Casos ${pos - 2}-${pos} de los 36 restantes (3 casos ciegos, primera pasada) + review${gplus ? ` + lectura G+: ${gplus.titulo}` : ''}`;
    access = 'CASO2'; morf = gplus ? undefined : 'Interleaving'; sitio = gplus ? undefined : 'Difuso';
    extra = gplus ? `{ t: ${q(gplus.id + ' · ' + gplus.titulo)}, url: gplusUrl(${q(gplus.id)}) }` : "{ t: 'Si fallas el caso, lee aquí 10′: Fitzpatrick\\'s Color Atlas 9e (sección del diagnóstico)', url: book(3309) }";
    ddx = ['3 casos ciegos: ① 8 ejes ② diferencial de 3 ③ viñeta ④ discusión → tarjetas de MECANISMO', 'Los ~10Q son la variable de ajuste (retoma en el Q# del cursor)', 'Cura pendiente del ledger (CCSN → DD Challenge) ANTES del primer caso si la hay'];
    atlas = gplus ? `gplusUrl(${q(gplus.id)})` : 'IMG_LIB2';
  } else {
    sub = `CICLO 2 · Segunda pasada FSRS: SOLO casos y preguntas fallados del ledger, por módulo CORE más flojo (0 casos nuevos)${gplus ? ` + lectura G+: ${gplus.titulo}` : ''}`;
    access = 'CASO_FALLOS2'; morf = gplus ? undefined : 'Repaso'; sitio = gplus ? undefined : 'Difuso';
    extra = gplus ? `{ t: ${q(gplus.id + ' · ' + gplus.titulo)}, url: gplusUrl(${q(gplus.id)}) }` : 'null';
    ddx = ['SOLO fallos del ledger (dermaCasosParaSegundaPasada) — un caso resuelto con "Lo sabía" sale de la lista', 'Re-describir los 8 ejes antes de reabrir la discusión', 'Review del banco rotante retomando en su Q# (dermaBancoCursor)'];
    atlas = gplus ? `gplusUrl(${q(gplus.id)})` : 'IMG_LIB2';
  }
  const fields = [
    `d: ${d}`, `fecha: '${fecha}'`, `ciclo: 2`, `tipo: '${tipo}'`, `bloque: ${q(bloque)}`, `bKey: '${bKey}'`, `tier: '${tier}'`,
    `sub: ${q(sub)}`, `referente: null`,
    `access: ${access}`, `qbankly: ${qb}`, `promir: ${promir ? `PMD2(${promir})` : 'null'}`, `extra: ${extra}`,
    `casoIds: [${casos.join(', ')}]`,
  ];
  if (morf) fields.push(`morfologia: ${q(morf)}`);
  if (sitio) fields.push(`sitio: ${q(sitio)}`);
  fields.push(`ddx: [${ddx.map(q).join(', ')}]`, `atlasUrl: ${atlas}`, `dermatoscopiaImg: ${dermImg}`);
  if (gplus) fields.push(`gplus: '${gplus.id}'`);
  if (cp) fields.push(`checkpoint: '${cp}'`);
  if (cp === 'cp2' || cp === 'repaso2') fields.push('drillHDPH: true');
  rows.push({ d, fecha, k, txt: `  { ${fields.join(', ')} },`, gplus: gplus && gplus.id, cp, casos, qb, promir });
}
if (pos !== RESTANTES.length) throw new Error(`casos restantes: consumidos ${pos} ≠ ${RESTANTES.length}`);
if (gI !== 9) throw new Error('no se colocaron los 9 G+ (semanas insuficientes): ' + gI);
if (promirI !== 10) console.warn('⚠ ProMIR ciclo 2: ' + promirI + ' slots (esperaba 10)');

// ─── Escribir dermaCiclo2.ts ───
const gplusMap = rows.filter((r) => r.gplus).map((r) => `'${r.gplus}': ${r.d}`).join(', ');
const TS = `/**
 * dermaCiclo2.ts — CICLO 2 de Dermatología · d${D_OFFSET + 1}-d${D_OFFSET + N} (${N} sesiones · ${FECHAS[0]} → ${FECHAS[N - 1]}).
 * GENERADO por DATA/_scripts/gen_derma_ciclo2.js (${HOY}) — NO editar a mano:
 *   \`node DATA/_scripts/gen_derma_ciclo2.js [YYYY-MM-DD]\` (sin fecha: primer día-Derma tras DERMA_DAILY_META.fin).
 *
 * Qué es: la continuación del PLAN ÉLITE tras el cierre del ciclo 1 (d${D_OFFSET}, ${FIN_C1}), en la MISMA franja
 * 13:30-14:15 interdiaria con Research (paridad researchData.ts#diaEstudioTipo; verificado 0 solapes con
 * researchDailyPlan.ts y researchDailyPlan2027.ts al generar) y con la MISMA clave de progreso 'derma' (numeración continua).
 *   · d${D_OFFSET + 1}-d${D_OFFSET + 12}: los ${RESTANTES.length} casos restantes de DERMA_CASO_ORDEN (posiciones ${PRIMERA}-199) a 3/sesión → primera pasada de los 200 completa.
 *   · d${D_OFFSET + 13}+: SEGUNDA PASADA FSRS — solo fallos del ledger (dermaCasosParaSegundaPasada), 0 casos nuevos.
 *   · review: Pictorial 3e (relevo) ⇄ Barnhill restante; QOTW/CORE restantes en los checkpoints; cursor "retoma en Q#" (dermaBancoCursor).
 *   · 1 módulo G+ (DERMA_GAP_MODULOS, dermaData.ts) por semana en el slot de lectura: ${rows.filter((r) => r.gplus).map((r) => `${r.gplus} d${r.d}`).join(' · ')}.
 *   · 10Q ProMIR-Derma en d ≡ 0 mod 3 (10 slots = 10 capítulos por peso MIR, uno cada uno).
 *   · checkpoints: ${rows.filter((r) => r.cp).map((r) => `${r.cp} d${r.d} (${r.fecha})`).join(' · ')}.
 * Las filas usan la MISMA forma DiaDerma (+ ciclo/tipo/gplus) para que DermaTodayPlan las pinte sin cambios de tipo.
 */
import {
  DERMA_DIAS, DERMA_DAILY_META, DERMA_CASO_META, PROMIR_DERMA_CAPS, book, cases, qa, pm, LANGE_CASES_URL,
  type DiaDerma, type MatLink, type DermaCheckpointKey,
} from './dermaDailyPlan';
import { DERMA_GAP_MODULOS, type DermaGapModulo } from './dermaData';

export type DermaCiclo2Tipo = 'casos' | 'fsrs' | 'checkpoint';
export interface DiaDermaCiclo2 extends DiaDerma {
  ciclo: 2;
  tipo: DermaCiclo2Tipo;   // 'casos' = 3 casos nuevos · 'fsrs' = solo fallos del ledger · 'checkpoint'
  gplus?: string;          // id del módulo G+ (DERMA_GAP_MODULOS) que ocupa el slot de lectura esa semana
}

export const DERMA_CICLO2_META = {
  inicio: '${FECHAS[0]}', fin: '${FECHAS[N - 1]}', totalDias: ${N}, // ciclo 2 · D${D_OFFSET + 1}=${wdOf(FECHAS[0])} ${FECHAS[0]} · alterna con Research · sáb+dom libres · generado ${HOY}
  ciclo: 2 as const,
  dOffset: ${D_OFFSET},
  casosRestantes: ${RESTANTES.length}, sesionesConCasos: 12, casosPorSesion: 3,
  bloque: '13:30–14:15 (45 min · franja boards del Calendar, alterna con Research — interdiario)',
  nota: 'CICLO 2: 36 casos restantes a 3/sesión (d${D_OFFSET + 1}-d${D_OFFSET + 12}) → después solo segunda pasada FSRS de fallos; review Pictorial 3e ⇄ Barnhill retomando en el Q# del cursor; 1 módulo G+ por semana en el slot de lectura; 10Q ProMIR en d ≡ 0 mod 3.',
};

// ── links (mismos ids reales que dermaDailyPlan.ts) ──
const MH2 = 'https://dermatology.mhmedical.com';
const DN2 = 'https://dermnetnz.org';
const IMG_LIB2 = \`\${DN2}/image-library\`;
const DN_QUIZ2 = \`\${DN2}/cme/dermoscopy-quizzes\`;
const ABD_GUIDE2 = 'https://dlpgnf31z4a6s.cloudfront.net/media/252836/core-study-guide-012021.pdf';
const rPIC3b: MatLink = { t: 'Pictorial Review 3e · ~10Q (de 363) — retoma en el Q# del cursor', url: qa(2948) };
const rBARN2: MatLink = { t: "Barnhill's Challenge · ~10Q dermpath (de 403) — retoma en el Q# del cursor", url: qa(2865) };
const rCORE2: MatLink = { t: 'CORE Exam Bank · las ~10Q que quedan (de 104)', url: qa(3479) };
const rQOTW2: MatLink = { t: 'Question of the Week · las que quedan del archivo (50Q)', url: qa(3562) };
export const rLANGE2: MatLink = { t: 'LANGE Clinical Dermatology Cases · si sobra tiempo (48Q)', url: LANGE_CASES_URL };
const CASO2: MatLink = { t: 'Cases for Board Review · 3 casos CIEGOS (los restantes de la permutación fija)', url: cases(1546) };
const CASO_DD2: MatLink = { t: 'Differential Diagnosis Challenge · pares de diferencial (100 sets)', url: cases(1616) };
const CASO_FALLOS2: MatLink = { t: 'Board Review · SOLO casos fallados del ledger (segunda pasada FSRS)', url: cases(1546) };
const DSA2 = book(2929); // Dermoscopy: Illustrated Self-Assessment 2e (impares)
const DS2 = 'https://dermoscopedia.org';
const DSP2 = {
  red: \`\${DS2}/Pigment_network\`, glob: \`\${DS2}/Globules\`, streaks: \`\${DS2}/Streaks\`, veil: \`\${DS2}/Blue-white_veil\`,
  vasos: \`\${DS2}/Vascular_structures\`, neg: \`\${DS2}/Negative_network\`, dots: \`\${DS2}/Dots\`, struct: \`\${DS2}/Structureless_areas\`,
  chaos: \`\${DS2}/Chaos_and_clues\`, twoStep: \`\${DS2}/Two-step_algorithm\`, three: \`\${DS2}/Three_point_checklist\`,
  seven: \`\${DS2}/Seven_Point_Checklist\`, menzies: \`\${DS2}/Menzies_Method\`, abcd: \`\${DS2}/ABCD_rule\`, pattern: \`\${DS2}/Pattern_analysis\`,
} as const;
const PMD2 = (n: number): MatLink => { const c = PROMIR_DERMA_CAPS[n - 1]; return { t: \`ProMIR Derma · cap \${c.n} \${c.t} · TEST 10Q (peso MIR \${c.peso} %)\`, url: pm(c.capId) }; };
/** URL del módulo G+ (dermaData.ts); si el id no existe, home de la biblioteca AccessDerma. */
const gplusUrl = (id: string): string => DERMA_GAP_MODULOS.find((g) => g.id === id)?.url || \`\${MH2}/books.aspx?view=library\`;
void MH2;

export const DERMA_DIAS_CICLO2: DiaDermaCiclo2[] = [
${rows.map((r) => r.txt).join('\n')}
];

// ── helpers ──
/** Módulo G+ de la sesión (slot de lectura de la primera sesión Derma de cada semana). */
export function dermaGplusDe(dia: Pick<DiaDermaCiclo2, 'gplus'> | DiaDerma): DermaGapModulo | undefined {
  const id = (dia as DiaDermaCiclo2).gplus; return id ? DERMA_GAP_MODULOS.find((g) => g.id === id) : undefined;
}
/** G+ id → d del ciclo 2. */
export const DERMA_CICLO2_GPLUS_DIAS: Record<string, number> = { ${gplusMap} };
/** Checkpoints del ciclo 2 por clave. */
export const DERMA_CICLO2_CHECKPOINTS: Partial<Record<DermaCheckpointKey, number>> = { ${rows.filter((r) => r.cp).map((r) => `${r.cp}: ${r.d}`).join(', ')} };
export const DERMA_CICLO2_DRILL_DIAS: number[] = DERMA_DIAS_CICLO2.filter((x) => !!x.drillHDPH).map((x) => x.d);
export const DERMA_CICLO2_PROMIR_DIAS: number[] = DERMA_DIAS_CICLO2.filter((x) => !!x.promir).map((x) => x.d);
/** Los dos ciclos en una sola lista (numeración continua d1-d${D_OFFSET + N}; clave de progreso 'derma'). */
export const DERMA_DIAS_TODOS: DiaDerma[] = [...DERMA_DIAS, ...DERMA_DIAS_CICLO2];
export const DERMA_TOTAL_DIAS_TODOS = DERMA_DAILY_META.totalDias + DERMA_CICLO2_META.totalDias;
/** Ciclo al que pertenece un d (1 | 2 | undefined si fuera de rango). */
export function dermaCicloDe(d: number): 1 | 2 | undefined {
  if (d >= 1 && d <= DERMA_DAILY_META.totalDias) return 1;
  if (d > DERMA_CICLO2_META.dOffset && d <= DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias) return 2;
  return undefined;
}
/** Fila por d en cualquiera de los dos ciclos. */
export function dermaDiaPorD(d: number): DiaDerma | undefined {
  return DERMA_DIAS.find((x) => x.d === d) || DERMA_DIAS_CICLO2.find((x) => x.d === d);
}
/** dermaDiaDe con FALLBACK al ciclo 2: la fila cuya fecha es fechaISO, buscando primero en el ciclo 1. */
export function dermaDiaDeConCiclo2(fechaISO: string): DiaDerma | undefined {
  return DERMA_DIAS.find((x) => x.fecha === fechaISO) || DERMA_DIAS_CICLO2.find((x) => x.fecha === fechaISO);
}
/** Ventana de 7 sesiones a partir de fromD, cruzando ciclos. */
export function dermaVentana7Todos(fromD: number): DiaDerma[] { return DERMA_DIAS_TODOS.filter((x) => x.d >= fromD && x.d < fromD + 7); }
/** Nº de casos nuevos de una sesión del ciclo 2 (3 en d${D_OFFSET + 1}-d${D_OFFSET + 12}, 0 después). */
export const dermaCasosPorSesionCiclo2 = (d: number): number => d > DERMA_CICLO2_META.dOffset && d <= DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.sesionesConCasos ? DERMA_CICLO2_META.casosPorSesion : 0;
void DERMA_CASO_META;
`;
const outPath = path.join(ROOT, 'src/lib/dermaCiclo2.ts');
fs.writeFileSync(outPath, TS, 'utf8');

// ─── Resumen ───
console.log(`dermaCiclo2.ts ✓ d${D_OFFSET + 1}→d${D_OFFSET + N} · ${FECHAS[0]} (${wdOf(FECHAS[0])}) → ${FECHAS[N - 1]} (${wdOf(FECHAS[N - 1])}) · ${RESTANTES.length} casos restantes en 12 sesiones · 0 solapes con Research (${RES.size} fechas comprobadas)`);
console.log('G+ por semana: ' + rows.filter((r) => r.gplus).map((r) => `${r.gplus}→d${r.d} ${r.fecha}`).join(' · '));
console.log('checkpoints: ' + rows.filter((r) => r.cp).map((r) => `${r.cp}→d${r.d} ${r.fecha}`).join(' · '));
console.log('review: ' + ['rPIC3b', 'rBARN2', 'rQOTW2', 'rCORE2'].map((b) => `${b}×${rows.filter((r) => r.qb === b).length}`).join(' · ') + ' · ProMIR slots: ' + rows.filter((r) => r.promir).map((r) => `d${r.d}:cap${r.promir}`).join(' '));
