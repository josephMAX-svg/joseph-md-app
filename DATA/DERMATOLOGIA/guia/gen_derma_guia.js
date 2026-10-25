/**
 * gen_derma_guia.js — genera src/lib/dermaGuiaDatos.ts (DATOS de la guía Derma «qué · cuánto · cómo»; la LÓGICA y la regla para el resto
 * de sesiones viven en src/lib/dermaGuia.ts).
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js           → escribe src/lib/dermaGuiaDatos.ts (aborta si un bloque no cuadra)
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js --check   → regenera en memoria, compara y valida la guía (plan A y plan B) de TODAS las
 *                                                             sesiones Derma (ciclo 1 + ciclo 2; 45′ y la variante 30′ del SERUMS)
 * Entradas (nada a mano en el .ts):
 *   · guia_catalogo_derma.js (decisiones curadas d1-d5 + temas/asignación del Pictorial Review 4e)
 *   · DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json (listado REAL de los 200 casos, 18-oct) · accessderma_clinica_tocs.json +
 *     accessderma_estetica_tocs.json (índices de los libros) · DATA/USMLE/qbankly_bb_step1_videos.tsv (B&B Dermatology con duración) ·
 *     DATA/USMLE/qbankly_uworld_step1_filtros.tsv (Systems de Dermatology con nº de preguntas) · DATA/MIR/guia_lectura_semana1-2.json
 *     (E2: lectura medida del cap. 1 ProMIR de Dermatología + test del d3) · src/lib/dermaDailyPlan.ts (filas reales: casoIds, fechas)
 *     · src/lib/usmleStep1Daily.ts (fechas de D5/D15 = cambios de velocidad de vídeo, regla E1)
 * Bitácora
 *  · v6.02c (18-oct-2026, E3): nuevo. No cambia fechas, D#, casoIds ni bancos del plan: solo describe cada sesión de 45′.
 *  · v6.02c F2 (18-oct-2026, hallazgos E6): DERMA_CME_DESPLAZADO (d12 lee el capítulo de su átomo — S23 del Color Atlas 9e, título del
 *    índice accessderma_estructura.json — y su módulo CME pasa a d42) · DERMNET_DERMOSCOPY (respaldo de Dermoscopedia) · --check valida
 *    además: (1) ningún paso de uWorld del PLAN B pide más Unused de las que quedan en su System (reparto en orden de fecha, peor caso =
 *    todas las sesiones por plan B) → al agotarse, relleno ProMIR con nº de preguntas; (2) el TEST ProMIR de las sesiones PMD tiene el mismo
 *    nº de preguntas y minutos en plan A y plan B.
 *  · v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; d1 Derma mar 27-oct): sin cambios de lógica; fechas de dermaDailyPlan (d1-d5 mar 27-oct → vie
 *    6-nov) y velocidad de vídeo de usmleStep1Daily (D5 vie 30-oct · D15 vie 13-nov), ya regenerados.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS, cargarUsmleDaily } = require('../../_scripts/usmle/cargar_ts');
const CAT = require('./guia_catalogo_derma');

const CHECK = process.argv.includes('--check');
const OUT = path.join(ROOT, 'src', 'lib', 'dermaGuiaDatos.ts');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/dermaGuiaDatos.ts'); process.exit(1); };
const rd = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const tsv = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));

const cache = new Map();
const DD = cargarModuloTS(path.join('src', 'lib', 'dermaDailyPlan.ts'), cache);
const ANKI = cargarModuloTS(path.join('src', 'lib', 'ankiLinks.ts'), cache);
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), cache);
const U = cargarUsmleDaily();

// ── fuentes ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const CASES = rd('DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json');
if (CASES.total !== 200) aborta('accessderma_cases1546.json no tiene 200 casos');
const areaDe = (pos) => (pos <= 30 ? 'Dermatopathology' : pos <= 140 ? 'Medical Dermatology' : pos <= 170 ? 'Pediatric Dermatology' : 'Surgical Dermatology');
CASES.casos.forEach((c) => { if (c.area !== areaDe(c.pos)) aborta(`caso pos ${c.pos}: área ${c.area} ≠ rango esperado ${areaDe(c.pos)}`); });
const CORE = { Dermatopathology: 'Path', 'Medical Dermatology': 'Med', 'Pediatric Dermatology': 'Peds', 'Surgical Dermatology': 'Surg' };
for (let p = 1; p <= 200; p++) if (DD.dermaCasoArea(p) !== CORE[areaDe(p)]) aborta(`dermaCasoArea(${p}) = ${DD.dermaCasoArea(p)} ≠ listado real (${CORE[areaDe(p)]}) → corrige dermaDailyPlan.dermaCasoArea`);
const casoUrl = (g) => `https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=${g}&gbosContainerID=310&viewByNumber=false&groupid=1546`;

const TOCS = rd('DATA/DERMATOLOGIA/_scrape/accessderma_clinica_tocs.json').libros;
const TOCE = rd('DATA/DERMATOLOGIA/_scrape/accessderma_estetica_tocs.json').libros;
function cap(bookid, sid) {
  const L = TOCS[bookid] || TOCE[bookid];
  if (!L) aborta(`libro ${bookid} sin índice`);
  const all = [...(L.front || []), ...((L.parts || []).flatMap((p) => p.chapters))];
  const c = all.find((x) => String(x.sid) === String(sid));
  if (!c) aborta(`libro ${bookid}: sectionid ${sid} no está en el índice`);
  return { t: c.t, url: `https://dermatology.mhmedical.com/content.aspx?bookid=${bookid}&sectionid=${sid}` };
}

const BB = new Map();
for (const [cs, id, nombre, s] of tsv('DATA/USMLE/qbankly_bb_step1_videos.tsv')) BB.set(Number(id), { ruta: cs, nombre, s: Number(s) });
const BB_IDS = [69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 251, 281];
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const UW = new Map();
for (const [t, id, nombre, q] of tsv('DATA/USMLE/qbankly_uworld_step1_filtros.tsv')) if (t === 'Y' && /^Dermatology/.test(nombre)) UW.set(Number(id), { nombre, q: Number(q) });
if (UW.size !== 6) aborta(`uWorld: esperaba 6 Systems de Dermatology, hay ${UW.size}`);

// velocidad de vídeo (regla E1 del Step 1): S1 = hasta el D5 · S2-S3 = hasta el D15 · desde el D16
const fechaD = (d) => (U.DIAS.find((x) => x.d === d) || {}).fecha;
const VEL = { s1Hasta: fechaD(5), s23Hasta: fechaD(15) };
if (!VEL.s1Hasta || !VEL.s23Hasta) aborta('no encuentro D5/D15 en usmleStep1Daily');
const vel = (fecha) => (fecha <= VEL.s1Hasta ? { v: 1, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' } : fecha <= VEL.s23Hasta ? { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN' } : { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)' });

const E2 = rd('DATA/MIR/guia_lectura_semana1-2.json');
const E2D = (d) => E2.derma.find((x) => x.d === d) || aborta(`E2 sin derma d${d}`);

// ── contexto del catálogo ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const temaN = new Map(CAT.PICTORIAL_TEMAS.map((x) => [x.t, x.n]));
const usado = new Map();
for (const [d, lista] of Object.entries(CAT.PICTORIAL_ASIGNACION)) {
  const fila = DD.DERMA_DIAS.find((x) => x.d === Number(d));
  if (!fila) aborta(`Pictorial d${d}: no existe la sesión`);
  if (!fila.qbankly || !fila.qbankly.url.startsWith(DD.qa(3626))) aborta(`Pictorial d${d}: la fila no usa el Pictorial Review 4e`);
  if (fila.promir) aborta(`Pictorial d${d}: es sesión ProMIR (el slot es el test del capítulo)`);
  for (const [t, n] of lista) { if (!temaN.has(t)) aborta(`tema Pictorial desconocido «${t}»`); usado.set(t, (usado.get(t) || 0) + n); }
}
for (const [t, n] of usado) if (n > temaN.get(t)) aborta(`Pictorial «${t}»: asignadas ${n} > ${temaN.get(t)} disponibles`);

const C = {
  dia: (d) => DD.DERMA_DIAS.find((x) => x.d === d),
  deck: (b) => ANKI.dermaAnkiDeck(b),
  caso: (pos) => { const c = CASES.casos[pos - 1]; return { titulo: `${c.area}. Case ${c.numero}`, url: casoUrl(c.gbosID), area: CORE[c.area] }; },
  cap,
  bb: (id) => { const v = BB.get(id); if (!v) aborta(`B&B ${id} no está en el catálogo`); return { nombre: v.nombre, dur: mmss(v.s), s: v.s, ruta: v.ruta }; },
  bbMin: (id, fecha) => { const v = BB.get(id); const k = vel(fecha); return { min: Math.round((v.s / 60 / k.v) * k.f), txt: k.txt }; },
  uw: (id) => UW.get(id) || aborta(`uWorld ${id}`),
  temaN: (t) => temaN.get(t),
  pictorialDe: (d) => CAT.PICTORIAL_ASIGNACION[d] || aborta(`d${d} sin tema Pictorial`),
  pmd1Lectura: (d) => { const p = E2D(d).lectura10.planB; if (!p) aborta(`E2 d${d} sin plan B`); return { secciones: p.t.split('→ ')[1] || p.t, min: p.min, palabras: p.palabras, figs: p.figs }; },
  pmd1Test: (d) => { const t = E2D(d).testProMIR; if (!t) aborta(`E2 d${d} sin test ProMIR`); return { nQ: t.nQ, ids: t.preguntas.map((x) => x.promir), citadas: t.citadasProMIR, como: t.como.replace(/ · registro en la app.*$/, '') }; },
  url: { pictorial: DD.qa(3626), casos: DD.cases(1546), pmd1: DD.pm(DD.PM_CAP.c1) },
};

// ── v6.02c F2 (E6): lectura del ÁTOMO en vez del módulo CME (d12) → el módulo pasa a la sesión destino ──────────────────────────
const ESTR = rd('DATA/DERMATOLOGIA/_scrape/accessderma_estructura.json');
const CA_TOC = new Map((ESTR.fitzpatrickColorAtlas9e_TOC.secciones || []).map((x) => [String(x.sid), x.t]));
const CME_DESPLAZADO = {};
for (const [d, v] of Object.entries(CAT.CME_DESPLAZADO || {})) {
  const fila = C.dia(Number(d)); const dst = C.dia(v.destino);
  if (!fila || !dst) aborta(`CME_DESPLAZADO d${d} → d${v.destino}: sesión inexistente`);
  if (!fila.extra) aborta(`CME_DESPLAZADO d${d}: la fila no tiene lectura del átomo (extra)`);
  const m = /bookid=3309&sectionid=(\d+)/.exec(fila.extra.url); if (!m) aborta(`CME_DESPLAZADO d${d}: la lectura del átomo no es del Color Atlas 9e`);
  const t = CA_TOC.get(m[1]); if (!t) aborta(`CME_DESPLAZADO d${d}: sectionid ${m[1]} no está en el índice del Color Atlas 9e`);
  if (!(fila.dermatoscopiaModulo || DD.dermatoscopiaModuloDe(fila.d))) aborta(`CME_DESPLAZADO d${d}: no tiene módulo CME que desplazar`);
  if (!DD.dermatoscopiaModuloDe(dst.d) || DD.dermatoscopiaModuloDe(dst.d).n <= 18) aborta(`CME_DESPLAZADO destino d${dst.d}: no es una sesión de repaso del micro-track`);
  CME_DESPLAZADO[d] = { destino: v.destino, libro: ESTR.fitzpatrickColorAtlas9e_TOC.bookTitle || "Fitzpatrick's Color Atlas and Synopsis of Clinical Dermatology, 9e", capitulo: t, url: fila.extra.url, foco: v.foco, motivo: v.motivo };
}

// ── sesiones curadas ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
const CUR = CAT.curadas(C);
const curada = {};
for (const [d, par] of Object.entries(CUR)) {
  const fila = C.dia(Number(d));
  for (const k of ['planA', 'planB']) {
    const g = par[k];
    const ceros = g.pasos.filter((p) => p.min === 0);
    if (ceros.length > 1) aborta(`d${d} ${k}: más de un paso de relleno (min 0)`);
    if (ceros.length === 1) { const resto = g.totalMin - g.pasos.reduce((s, p) => s + p.min, 0); if (resto < 3) aborta(`d${d} ${k}: el relleno queda en ${resto}′`); ceros[0].min = resto; }
    const e = G.validarGuia(g); if (e.length) aborta(`d${d} ${k}: ${e.join(' · ')}`);
  }
  curada[d] = { d: Number(d), fecha: fila.fecha, casoIds: fila.casoIds, planA: par.planA, planB: par.planB };
}

// ── emisión ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const J1 = (o) => JSON.stringify(o, null, 1);
const bbDerm = {}; for (const id of BB_IDS) { const v = BB.get(id); bbDerm[id] = { nombre: v.nombre, s: v.s, ruta: v.ruta }; }
const uwDerm = {}; for (const [id, v] of UW) uwDerm[id] = v;
const t3 = E2D(3).testProMIR;
const meta = {
  version: 'v6.02c', generado: '2026-10-18',
  fuente: 'gen_derma_guia.js + guia_catalogo_derma.js · AccessDerma (listado de casos + índices, 18-oct) · Qbankly (B&B + uWorld, 18-oct) · E2 (ProMIR Derma cap. 1)',
  curadas: Object.keys(curada).map(Number),
  velocidad: { ...VEL, regla: 'hasta s1Hasta 1,0× (×1,2 pausas) · hasta s23Hasta 1,25× (×1,15) · después 1,5× (×1,15) — la misma regla que el Step 1 (E1)' },
  pictorial: { total: CAT.PICTORIAL_TEMAS.reduce((s, x) => s + x.n, 0), asignadas: [...usado.values()].reduce((a, b) => a + b, 0) },
  casosOrden: CASES.orden,
};
const out = `/**
 * dermaGuiaDatos.ts — DATOS de la guía Derma «qué · cuánto · cómo» (la lógica y la regla del resto de sesiones: src/lib/dermaGuia.ts).
 * GENERADO por DATA/DERMATOLOGIA/guia/gen_derma_guia.js (decisiones: guia_catalogo_derma.js) — NO editar a mano:
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js           (escribe) · --check (compara + valida todas las sesiones, plan A y B)
 * Fuentes verificadas el 18-oct-2026: listado REAL de «Dermatology Cases for Board Review» (Dermatopathology 1-30 · Medical 31-140 ·
 * Pediatric 141-170 · Surgical 171-200; URL directa por gbosID) · índices de Fitzpatrick 9e, Guidebook, Taylor & Kelly 3e, Dermoscopy
 * Self-Assessment 2e y Dermatologic Surgery · «Create Custom Quiz» del Pictorial Review 4e (34 temas, 381 preguntas) · B&B Step 1 ›
 * Dermatology (duraciones reales) · uWorld Step 1 › Systems de Dermatology (nº reales) · ProMIR Dermatología cap. 1 (medición E2).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): DERMA_CME_DESPLAZADO (d12 lee el capítulo de su átomo; su módulo CME pasa a d42) · DERMNET_DERMOSCOPY
 * (respaldo de Dermoscopedia) · los curados d2/d4 llevan ese respaldo · la lógica (reparto de uWorld del plan B y test PMD común) en dermaGuia.ts.
 */
import type { GuiaBloque } from './guia';

export interface DermaGuiaCurada { d: number; fecha: string; casoIds: number[]; planA: GuiaBloque; planB: GuiaBloque }

export const DERMA_GUIA_DATOS_META = ${J1(meta)};

/** gbosID de cada caso (índice = posición 1-200 − 1) → https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=… */
export const DERMA_CASO_GBOS: number[] = ${JSON.stringify(CASES.casos.map((c) => c.gbosID))};

/** Pictorial Review 4e · «Create Custom Quiz»: tema exacto → nº de preguntas disponibles. */
export const PICTORIAL_TEMAS: Array<{ t: string; n: number }> = ${JSON.stringify(CAT.PICTORIAL_TEMAS)};
/** Tema(s) del Pictorial por sesión (ciclo 1; solo sesiones Pictorial sin test ProMIR) — sin repetir preguntas. */
export const PICTORIAL_ASIGNACION: Record<number, Array<[string, number]>> = ${JSON.stringify(CAT.PICTORIAL_ASIGNACION)};

/** B&B Step 1 · vídeos de Dermatology (+ Fungal Skin Infections y Scleroderma) con duración real (s). */
export const BB_DERM: Record<number, { nombre: string; s: number; ruta: string }> = ${JSON.stringify(bbDerm)};
/** uWorld Step 1 · Test Composer · Systems de Dermatology (nº reales de preguntas). */
export const UW_DERM: Record<number, { nombre: string; q: number }> = ${JSON.stringify(uwDerm)};
/** Cambios de velocidad de vídeo (fechas de D5 y D15 del Step 1). */
export const DERMA_VELOCIDAD = ${JSON.stringify(VEL)};

/** ProMIR Dermatología cap. 1: test del d3 (preguntas MIR citadas en el capítulo, más recientes primero; E2). */
export const DERMA_TEST_PROMIR_D3 = ${JSON.stringify({ nQ: t3.nQ, citadas: t3.citadasProMIR, preguntas: t3.preguntas.map((x) => ({ id: x.promir, url: x.url, seccion: x.seccion })) })};

/** v6.02c F2 (E6): sesiones cuya lectura de 10′ (plan A) es la del ÁTOMO (fila del plan; título del índice) y no el módulo del micro-track de
 *  dermatoscopia, que pasa a la sesión «destino» (repaso del micro-track) — nada se recorta. */
export const DERMA_CME_DESPLAZADO: Record<number, { destino: number; libro: string; capitulo: string; url: string; foco: string; motivo: string }> = ${J1(CME_DESPLAZADO)};
/** Respaldo de Dermoscopedia (falla por HTTPS desde algunas redes): DermNet «Dermoscopy (Dermatoscopy)» (curl 200, 18-oct-2026). */
export const DERMNET_DERMOSCOPY = ${JSON.stringify(CAT.DERMNET_DERMOSCOPY)};

/** Sesiones CURADAS (d1-d5): plan A (AccessDerma) y plan B (acceso remoto caducado), 13:30–14:15. */
export const DERMA_GUIA_CURADA: Record<number, DermaGuiaCurada> = ${J1(curada)};
`;

// ── validación de TODAS las sesiones con la lógica real (dermaGuia.ts) ───────────────────────────────────────────────────────────────
function validarTodo(tsDatos) {
  const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
  const abs = path.join(ROOT, 'src', 'lib', 'dermaGuiaDatos.ts');
  const c2 = new Map(); const mod = { exports: {} }; c2.set(abs, mod);
  new Function('exports', 'module', 'require', ts.transpileModule(tsDatos, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText)(mod.exports, mod, () => ({}));
  const DG = cargarModuloTS(path.join('src', 'lib', 'dermaGuia.ts'), c2);
  const D2 = cargarModuloTS(path.join('src', 'lib', 'dermaCiclo2.ts'), c2);
  const GG = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), c2);
  const errores = []; let n = 0;
  for (const dia of D2.DERMA_DIAS_TODOS) {
    for (const opts of [{}, { ini: '12:00', minutos: 30 }]) {
      const par = DG.dermaGuiaPar(dia, opts);
      for (const k of ['planA', 'planB']) {
        const e = GG.validarGuia(par[k]); n++;
        if (e.length) errores.push(`d${dia.d} ${dia.fecha} ${k} ${opts.minutos || 45}′: ${e.join(' · ')}`);
      }
    }
  }
  // v6.02c F2 (E6): (1) reparto de uWorld sin pasarse del stock · (2) test ProMIR PMD idéntico en plan A y plan B
  const F6 = cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'), c2);
  const quedan = new Map(Object.entries(uwDerm).map(([id, x]) => [Number(id), x.q]));
  const uwRe = /uWorld Step 1 · System «([^»]+)» · Unused · (\d+)Q/;
  let agotadas = 0; const pmd = [];
  for (const dia of [...D2.DERMA_DIAS_TODOS].sort((a, b) => (a.fecha < b.fecha ? -1 : 1))) {
    const min = F6.faseV6(dia.fecha) === 'F4' ? 30 : 45;
    const par = DG.dermaGuiaPar(dia, min === 30 ? { minutos: 30 } : {});
    for (const p of par.planB.pasos) {
      const r = uwRe.exec(p.que); if (!r) continue;
      const id = Number(Object.entries(uwDerm).find(([, x]) => x.nombre === r[1])?.[0]); const q = quedan.get(id) ?? 0; const k = Number(r[2]);
      if (k > q) errores.push(`d${dia.d} ${dia.fecha} plan B: uWorld «${r[1]}» pide ${k}Q y solo quedan ${q} (stock ${uwDerm[id] ? uwDerm[id].q : '?'})`);
      quedan.set(id, q - k);
    }
    if (par.planB.pasos.some((p) => /relleno: uWorld «/.test(p.que))) agotadas++;
    if (dia.promir) {
      const tA = par.planA.pasos.find((p) => /ProMIR Dermatología › cap\. \d+ .*· TEST \d+Q/.test(p.que));
      const tB = par.planB.pasos.find((p) => /ProMIR Dermatología › cap\. \d+ .*· TEST \d+Q/.test(p.que));
      if (tA && tB) { const qa = /TEST (\d+)Q/.exec(tA.que)[1], qb = /TEST (\d+)Q/.exec(tB.que)[1]; if (qa !== qb || tA.min !== tB.min) errores.push(`d${dia.d} ${dia.fecha}: test ProMIR plan A ${qa}Q/${tA.min}′ ≠ plan B ${qb}Q/${tB.min}′`); else pmd.push(`d${dia.d} ${qa}Q`); }
    }
  }
  const resumen = { agotadas, quedan: Object.fromEntries([...quedan].map(([id, q]) => [uwDerm[id].nombre.replace(/^Dermatology \(|\)$/g, ''), q])), pmd: pmd.length };
  return { errores, n, resumen };
}
const v = validarTodo(out);
if (v.errores.length) { console.error(v.errores.slice(0, 40).join('\n')); aborta(`${v.errores.length} bloque(s) no cuadran`); }
const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
if (CHECK) {
  if (actual !== out) { console.error('✗ src/lib/dermaGuiaDatos.ts NO está al día → node DATA/DERMATOLOGIA/guia/gen_derma_guia.js'); process.exit(1); }
  console.log(`✓ dermaGuiaDatos.ts al día · ${v.n} bloques validados (103 sesiones × plan A/B × 45′/30′) · curadas d${meta.curadas.join(',d')} · Pictorial ${meta.pictorial.asignadas}/${meta.pictorial.total} · uWorld del plan B sin pasarse del stock (${v.resumen.agotadas} sesiones con relleno ProMIR; quedan ${JSON.stringify(v.resumen.quedan)}) · test ProMIR igual en A y B en ${v.resumen.pmd} sesiones PMD`);
} else {
  fs.writeFileSync(OUT, out);
  console.log(`✓ escrito src/lib/dermaGuiaDatos.ts (${(out.length / 1024).toFixed(1)} KB) · ${v.n} bloques validados · curadas d${meta.curadas.join(',d')} · Pictorial ${meta.pictorial.asignadas}/${meta.pictorial.total}`);
}
