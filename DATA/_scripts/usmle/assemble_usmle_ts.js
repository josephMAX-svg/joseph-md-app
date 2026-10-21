/**
 * assemble_usmle_ts.js — ensambla src/lib/usmleStep1Daily.ts (GENERADO) a partir de la salida de gen_usmle_v5.js.
 *
 * v6.00 (6-oct-2026): REESTRUCTURACIÓN ANUAL (V6_ESPEC §B · §F). Lee usmle_dias_v6.json (DIAS = tramo 1 · DIAS_T2 = tramo 2) y
 *   comprueba que coincide con usmle_dias_v5.txt (misma serialización, misma corrida); las fechas de cabecera, DAILY_META, USMLE_TAPER
 *   y los textos con fecha salen de las filas generadas y de _fechas_v6.json (validado por ../gen_fechas_v6.js) — ninguna fecha a mano.
 *   Emite: DIAS (60) · DIAS_T2 (158) · DIAS_TODOS · DAILY_META v6 (version 'v6.00', examenTarget, tramos, pausa, gonogo…) ·
 *   USMLE_TAPER nuevo (§B6) · FRANJAS (F1/F3, horas sin cambio) + FRANJA_F3_REENTRADA · FRANJAS_F4 por turno M/T/L/G + H + H-sáb
 *   (§B4.1) · faseDe / semanaDe / esDiaTaper / esViernesNivel4 / diaDe / diaAnterior / diaPrevio / ventana7d / hitosDelPlan sobre los
 *   2 tramos (navegación por ÍNDICE en DIAS_TODOS: los d no son contiguos, 1-60 y 101-258) · semanaDe = semanaStep1(iso).n de
 *   fechasV6 (módulo hoja: usmleStep1Daily NO importa homeBriefing, r2 · I7).
 *   Textos visibles sin fechas de la v5.20 (control de textos del Lote 3).
 * v6.01 (10-oct-2026): corrimiento D1 mié 7-oct → lun 12-oct. Los textos de F1 salen de las filas y de escenario.desplazadasF1 /
 *   colchonF1Consumido (gen_usmle_v5.js): F1 = D1-D57 sin C1/C2 (consumidos) y la bioestadística (v5.20 D79) en el tramo 2; la línea de
 *   bitácora del corrimiento sale de _fechas_v6.json «corrimientos». Nada de «D58»/«D59-D60»/«mié 7-oct» escrito a mano.
 * v6.02 (17-oct-2026): corrimiento D1 lun 12-oct → lun 19-oct (F1 = 52 hábiles, hitos anclados en F1). Las líneas de F1 salen de
 *   escenario.origenF1 (D# v5.20 de cada d de F1; gen_tramo2.colocarF1): tramos «D1-D51 = mismo D#» + cada d con otro origen (D52 = NBME 28,
 *   v5.20 D55) + la lista de DESPLAZADAS (D52-D54, D56, D57, D79 → T3-T8). La bitácora del header lleva TODOS los corrimientos del JSON
 *   (v6.01 y v6.02), no solo el vigente. El doc de `uid` lista las unidades C<D> desplazadas reales (ya no «C79» fijo).
 * v6.03 (20-oct-2026): corrimiento D1 lun 19-oct → mié 21-oct (F1 = 50 hábiles; 8 desplazadas: v5.20 D50 Neuro, D51-D54, D56, D57
 *   Heme/Onco, D79 → T3-T10). Sin cambio de lógica (todo sale de las filas y del JSON); la regla del corrimiento se cierra con un solo punto.
 * v6.04 (21-oct-2026): examen Step 1 lun 27-sep → lun 25-oct-2027 (decisión de Joseph; _fechas_v6.json step1.cambios). Sin cambio de lógica en
 *   las filas; DJ-1 v6.04 = una sola fecha → examenVentana / worstCase dicen «examen 25-oct en todos los escenarios ENCAPS» (DJ1_UNICA).
 * v5.x: leía usmle_dias_v5.txt (solo DIAS, 95 días) y pegaba cabecera/pie fijos con las fechas del último corrimiento escritas a mano.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const V6 = require('../gen_fechas_v6');
const { add, wd, f, fy } = V6;

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'src', 'lib', 'usmleStep1Daily.ts');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/usmleStep1Daily.ts'); process.exit(1); };

let FV6;
try { FV6 = V6.cargarFechasV6(); } catch (e) { aborta(e.message); }
const J = JSON.parse(fs.readFileSync(path.join(__dirname, 'usmle_dias_v6.json'), 'utf8'));
const txt = fs.readFileSync(path.join(__dirname, 'usmle_dias_v5.txt'), 'utf8').trim();
// misma serialización que gen_usmle_v5.js (claves sin comillas)
const aTS = (x) => JSON.stringify(x).replace(/"([a-zA-Z][a-zA-Z0-9]*)":/g, '$1:');
if (txt !== 'export const DIAS: DiaUSMLE[] = ' + aTS(J.DIAS) + ';\nexport const DIAS_T2: DiaUSMLE_T2[] = ' + aTS(J.DIAS_T2) + ';') aborta('usmle_dias_v5.txt ≠ usmle_dias_v6.json (¿corridas distintas de gen_usmle_v5.js?)');
const DIAS = J.DIAS, T2 = J.DIAS_T2, ESC = J.escenario;
if (J.version !== FV6.version) aborta(`usmle_dias_v6.json es ${J.version} y _fechas_v6.json ${FV6.version}`);
if (ESC.encaps !== FV6.encaps.examen || ESC.examen !== FV6.step1.examen || ESC.serums !== FV6.serums.inicio) aborta('el escenario de usmle_dias_v6.json no es el de _fechas_v6.json (¿se corrió gen_usmle_v5.js con --seco?)');
if (DIAS.length !== FV6.f1.dias || !T2.length) aborta(`filas inesperadas: DIAS ${DIAS.length} · DIAS_T2 ${T2.length}`);

// ── datos derivados (todo de las filas y del JSON) ──
const ultimo = (a) => a[a.length - 1];
const fT = (x) => `T${x.t} ${f(x.fecha)}`;
const porTipo = (t) => T2.filter((x) => x.tipo === t);
const hitoT2 = (re) => T2.find((x) => x.tipo === 'hito' && re.test(x.nombre || ''));
const D94 = T2.find((x) => x.tipo === 'taper' && x.dOrig === 94);
const D95 = T2.find((x) => x.tipo === 'taper' && x.dOrig === 95);
const RITUAL = ultimo(T2);
if (!D94 || !D95 || RITUAL.tipo !== 'ritual') aborta('el tramo 2 no termina en D94 → D95 → ritual');
const FREE120 = hitoT2(/Free 120/);
const NBME29 = hitoT2(/NBME 29/);
const GATE = T2.find((x) => x.gate);
const E = FV6.step1.examen, VIAJE = FV6.step1.viaje_d1, REINICIO = FV6.step1.reinicio, GONOGO = FV6.step1.gonogo;
const REGRESO = add(E, 1);
const TAPER_SEM = porTipo('taper').filter((x) => x.dOrig === null);
const PAUSA = { desde: add(FV6.f1.fin, 1), hasta: add(REINICIO, -1) };
// v6.04 (21-oct-2026): DJ-1 v6.04 = UNA sola fecha (examen 25-oct en todos los escenarios ENCAPS; adelanto = base = plan B) → los textos de la
//   ventana dicen eso en vez de «adelanto · base · plan B» (con la tabla de 3 filas de la v6.00-v6.03, el texto de siempre).
const DJ1_UNICA = V6.DJ1.length === 1 || (FV6.step1.adelanto === FV6.step1.examen && FV6.step1.planB === FV6.step1.examen);
const BASE_DJ1 = V6.DJ1.length >= 3 ? V6.DJ1[1].examen : FV6.step1.examen;
const VER_DJ1 = ((FV6.step1.cambios || []).at(-1) || {}).version || FV6.version; // versión que fijó la DJ-1 vigente (v6.04)
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const eligibilityTxt = (() => { // '2027-08..2027-10' → 'ago-sep-oct 2027'
  const m = /^(\d{4})-(\d{2})\.\.(\d{4})-(\d{2})$/.exec(FV6.step1.eligibility);
  if (!m || m[1] !== m[3]) return FV6.step1.eligibility;
  const o = []; for (let k = +m[2]; k <= +m[4]; k++) o.push(MESES[k - 1]);
  return o.join('-') + ' ' + m[1];
})();
const CORTO = { Cardiovascular: 'Cardio', Respiratory: 'Resp', Renal: 'Renal', Gastrointestinal: 'GI', Endocrine: 'Endocrino', 'Nervous System': 'Neuro', 'Hematology & Oncology': 'Heme/Onco',
  Fundamentos: 'Fundamentos', Immunology: 'Inmuno', 'Microbiology / ID': 'Micro', Reproductive: 'Repro', 'Musculoskeletal / Rheum': 'MSK', 'Psychiatry & Behavioral': 'Psiq', Biochemistry: 'Bioq' };
const corto = (s) => CORTO[s] || s;
const esHito = (x) => /🎯/.test(x.sub);
const vie = (x) => wd(x.fecha) === 5;
const f1N3 = DIAS.filter((x) => x.nivelUW === 3).map((x) => `D${x.d} ${f(x.fecha)} ${corto(x.system)}`);
const f1AbreViernes = DIAS.filter((x) => vie(x) && x.nivelUW === 1 && !esHito(x)).map((x) => `D${x.d} ${corto(x.system)}`);
const f1N4 = DIAS.filter((x) => x.nivelUW === 4 && x.bbCh !== 'Colchón').map((x) => `D${x.d} ${f(x.fecha)} ${corto(x.system)}`);
const t2N4Vie = T2.filter((x) => x.tipo === 'contenido' && !x.parte && x.nivelUW === 4).map((x) => `${fT(x)} ${corto(x.system)}`);
const REACT = porTipo('reactivacion'), RANDOM = porTipo('uw_random'), INCORR = porTipo('incorrectas'), CONSOL = porTipo('consolidacion'), COLCHON = porTipo('colchon');
const rangoT = (a) => (a.length ? `T${a[0].t}-T${ultimo(a).t}` : '—');
const hitosF1 = DIAS.filter(esHito), hitosT2 = porTipo('hito');
const nombreHito = (x) => x.nombre || (/UWSA1/.test(x.sub) ? 'UWSA1' : (/NBME \d+/.exec(x.sub) || [x.system])[0]);
const listaHitos = [...hitosF1.map((x) => `${nombreHito(x)} D${x.d} ${f(x.fecha)}`), ...hitosT2.map((x) => `${x.nombre} T${x.t} ${f(x.fecha)}`)];
const listaHitosLineas = listaHitos.reduce((acc, h, i) => { if (i % 4 === 0) acc.push([]); acc[acc.length - 1].push(h); return acc; }, []).map((g, i, all) => ' *   ' + g.join(' · ') + (i === all.length - 1 ? '.' : ' ·')).join('\n');
const preguntasFrescas = DIAS.filter((x) => !esHito(x) && x.bbCh !== 'Colchón').reduce((a, x) => a + x.qDia, 0)
  + T2.filter((x) => ['contenido', 'refuerzo', 'uw_random'].includes(x.tipo)).reduce((a, x) => a + x.qDia, 0);
const colchonH = COLCHON.reduce((a, x) => a + x.h, 0);
// v6.01: F1 variable (colchón F1 consumido · filas de temario desplazadas al tramo 2)
const COLCHON_F1 = DIAS.filter((x) => x.bbCh === 'Colchón');
const DESPL = ESC.desplazadasF1 || [];
const DESPL_T2 = T2.filter((x) => x.tipo === 'contenido' && x.dOrig != null && DESPL.includes(x.dOrig));
const BIOEST_F1 = DIAS.find((x) => x.bbCh === 'Biostats/Epi');
const CORR = FV6.corrimientos || []; // v6.02: toda la bitácora de corrimientos v6 (v6.01, v6.02…), en orden
const SEM_F1 = V6.semanasF1De(FV6.f1.inicio, FV6.f1.fin);
const rangoD = (a) => (a.length ? (a.length === 1 ? `D${a[0].d}` : `D${a[0].d}-D${ultimo(a).d}`) : '—');
// v6.02: origen v5.20 de cada d de F1 (escenario.origenF1 = colocarF1; sin él, d = D# salvo el colchón y la bioestadística de la v6.00)
const ORIGEN_F1 = ESC.origenF1 || DIAS.map((x) => (x.bbCh === 'Colchón' ? x.sub.split(' ')[0] : x === BIOEST_F1 ? 79 : x.d));
if (ORIGEN_F1.length !== DIAS.length) aborta(`escenario.origenF1 tiene ${ORIGEN_F1.length} filas y DIAS ${DIAS.length}`);
const tramosId = DIAS.reduce((acc, x, i) => { // tramos contiguos de d con origen = su mismo D#
  if (ORIGEN_F1[i] !== x.d) return acc;
  const u = acc[acc.length - 1];
  if (u && u.b === x.d - 1) u.b = x.d; else acc.push({ a: x.d, b: x.d });
  return acc;
}, []);
const filasNoId = DIAS.filter((x, i) => typeof ORIGEN_F1[i] === 'number' && ORIGEN_F1[i] !== x.d);
const descNoId = (x) => { const o = ORIGEN_F1[x.d - 1];
  if (esHito(x)) return `D${x.d} ${f(x.fecha)} = ${nombreHito(x)} (v5.20 D${o}; un hito de F1 no sale de F1: no cabe por su D# → último slot de F1${/NBME 28/.test(x.sub) ? ', sigue siendo el checkpoint de fecha' : ''})`;
  if (x === BIOEST_F1) return `D${x.d} ${f(x.fecha)} = bioestadística + epidemiología + ética (ex-D79 v5.20)`;
  return `D${x.d} ${f(x.fecha)} = ${corto(x.system)} (v5.20 D${o})`; };
const lineasF1 = [
  `${tramosId.map((r) => (r.a === r.b ? `D${r.a}` : `D${r.a}-D${r.b}`)).join(' + ')} = contenido v5.20 de su mismo D# (los NBME 25-28 pasan a 07:00-12:30; nivelUW/qDia por la regla del día de la semana)`,
  ...filasNoId.map(descNoId),
  COLCHON_F1.length ? `${rangoD(COLCHON_F1)} = ${COLCHON_F1.map((x) => x.sub.split(' ')[0]).join('/')} COLCHÓN F1 (absorben los primeros días perdidos)` : `sin colchón F1 (${(ESC.colchonF1Consumido || []).join('/') || 'C1/C2'} consumidos por el corrimiento): un día perdido de F1 pasa al tramo 2 el ${f(PAUSA.desde)} (disparador (f), --pendientes-f1)`,
  ...(DESPL_T2.length ? [`DESPLAZADA${DESPL_T2.length > 1 ? 'S' : ''} al tramo 2 (las últimas filas de temario no-hito, en orden v5.20, a la cabeza de la cola): `
    + DESPL_T2.map((x) => `v5.20 D${x.dOrig} ${x.system === 'Psychiatry & Behavioral' && /Bioestad/.test(x.subV520 || '') ? 'bioestadística' : corto(x.system)} → T${x.t} ${f(x.fecha)} (d ${x.d})`).join(' · ')] : []),
];
const trocear = (txt, pre1, pre) => { // líneas de comentario de ≤ ~130 caracteres
  const out = []; let cur = '';
  for (const p of txt.split(' ')) { if ((cur + ' ' + p).length > 126) { out.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p; }
  if (cur) out.push(cur);
  return out.map((l, i) => (i === 0 ? pre1 : pre) + l).join('\n');
};
const lineasF1Txt = trocear(lineasF1.join(' · '), ' *   ', ' *   ');
const corrTxt = CORR.map((c) => trocear(`${c.version} (${fy(c.fecha)}): corrimiento rígido del D1 ${fy(c.d1_previo)} → ${fy(c.d1)} (sin estudio: ${c.perdidos.map(f).join(', ')}) · ${c.regla.replace(/\.$/, '')}.`, ' * ', ' *   ')).join('\n');
const colchonF1Nivel4 = COLCHON_F1.length ? ` · ${COLCHON_F1.map((x) => x.sub.split(' ')[0]).join('/')} COLCHÓN F1 (${rangoD(COLCHON_F1)})` : '';
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const L = (x) => JSON.stringify(x);

// ── textos con fecha (generados) ──
const BLOQUE = `F1/F3: 05:00 ANKI AM · 07:15 repaso anclado · 08:15 PRE-TEST 10Q · 09:00 DEEP PRIME 2h · 11:00 30Q consolidación · 18:00 eval modo examen (6h15/día; F3 + 16:15 REENTRADA = 7h15) · PAUSA ${f(PAUSA.desde)} → ${f(PAUSA.hasta)}: Anki 30' L-V + sáb 07:45 STEP 1 VIVO 20Q · F4 (SERUMS, L-S): plantilla por turno M/T/L/G (FRANJAS_F4)`;
const METODO = `Palmerton · 5 niveles UWorld: NO se sube de nivel sin ≥80% en 10Q consecutivas del nivel actual (validación ≤24-48 h). Nivel 1-2 = subtema (5Q tutor → 5Q timed) · nivel 3 = sistema completo timed (viernes sin hito hasta S10 + REACTIVACIÓN del tramo 2) · nivel 4 = mixto de sistemas dominados (eval 18:00 diaria + viernes sin hito desde S11 + reentrada + uw_random + colchón) · nivel 5 = 40Q random timed (incorrectas, consolidación, taper + hitos). Si <80%: repetir bloques de 5Q del subtema fallado y auditar recursos/comprensión/aplicación/memoria; nunca avanzar de tema. Taper ${f(D94.fecha)} (D94, última sesión de banco) + ${f(D95.fecha)} (D95, sesión mínima ≤1 h) · ${f(RITUAL.fecha)} ritual sin estudio · ${f(VIAJE)} viaje (D-1) · examen ${fy(E)} (${FV6.version}; ${FV6.step1.provisional ? 'PROVISIONAL: ' : ''}fecha a reservar según DJ-1 al salir la convocatoria ENCAPS).`;
const VENTANA = DJ1_UNICA
  ? `eligibility ${eligibilityTxt} · examen ${FV6.step1.examen} en todos los escenarios ENCAPS (DJ-1 ${VER_DJ1}: sin adelanto; plan B = base → un NO-GO pasa a la extensión de la elegibilidad)`
  : `eligibility ${eligibilityTxt} · adelanto ${FV6.step1.adelanto} · base ${BASE_DJ1} · plan B ${FV6.step1.planB}`;

const header = `/**
 * usmleStep1Daily.ts — Plan DÍA A DÍA USMLE Step 1 · ${FV6.version} (reestructuración anual decidida por Joseph el ${fy(FV6.decidido)}).
 * GENERADO por DATA/_scripts/usmle/assemble_usmle_ts.js (datos: gen_usmle_v5.js + gen_tramo2.js · fechas: _fechas_v6.json / fechasV6.ts).
 * NO editar a mano: node gen_usmle_v5.js && node assemble_usmle_ts.js && node update_diainicio.js && node remap_obsidian_usmle.js
 * && node verificar_v6.js (en DATA/_scripts/usmle/). Fin del corrimiento diario (V6_ESPEC §B7): un día perdido NO mueve el examen.
 *
 * TRAMO 1 = F1 · DIAS (D1-D${DIAS.length}) · ${fy(DIAS[0].fecha)} → ${fy(ultimo(DIAS).fecha)} · L-V · 6h15/día (05:00 · 07:15-12:00 · 18:00).
${lineasF1Txt}
${corrTxt ? corrTxt + '\n' : ''} * PAUSA (estado PAUSA en la app, sin fila «hoy») · ${f(PAUSA.desde)} → ${fy(PAUSA.hasta)}: transición + ENCAPS intensiva (examen
 *   ${fy(FV6.encaps.examen)}${FV6.encaps.provisional ? ' PROVISIONAL' : ''}) + lunes libre · Step 1 en mantenimiento: Anki 30' L-V + sáb 07:45 «STEP 1 VIVO» 20Q (§B2).
 * TRAMO 2 · DIAS_T2 (T1-T${T2.length}, d ${T2[0].d}-${ultimo(T2).d}) · ${fy(T2[0].fecha)} → ${fy(RITUAL.fecha)}${FV6.step1.provisional ? ' (PROVISIONAL)' : ''}:
 *   F3 ${T2.filter((x) => x.fase === 'F3').length} filas L-V (7h15: F1 + 16:15 REENTRADA) · F4 ${T2.filter((x) => x.fase === 'F4').length} filas L-S con el SERUMS (desde ${fy(FV6.serums.inicio)}${FV6.serums.supuesto ? ' [supuesto]' : ''};
 *   domingo libre; plantilla por turno M/T/L/G, FRANJAS_F4). Cola: reentrada → contenido v5.20 (${DESPL_T2.length ? DESPL_T2.map((x) => 'D' + x.dOrig).join('/') + ' de F1, ' : ''}Micro, Repro, MSK, Psiq, Bioq) →
 *   refuerzo → reactivación ← uw_random ← incorrectas ← consolidación ← taper; ${COLCHON.length} filas COLCHÓN (≈${Math.round(colchonH)} h al piso) absorben
 *   los días perdidos («atrasada: hazla hoy»). Cada fila con dOrig conserva el contenido v5.20 (subV520) → multiset = 0 (V1).
 * HITOS (hitosDelPlan()):
${listaHitosLineas}
 *   GO/NO-GO ${fy(GONOGO)} (E-49, fila T${GATE ? GATE.t : '—'}) · D94 ${f(D94.fecha)} última sesión de banco · D95 ${f(D95.fecha)} sesión mínima ·
 *   ritual ${f(RITUAL.fecha)} (sin estudio) · viaje ${f(VIAJE)} (D-1) · EXAMEN ${fy(E)} · regreso ${f(REGRESO)} (USMLE_TAPER).
 * Ventana DJ-1: ${VENTANA}.
 * Presupuesto uWorld FRESCO planificado: ${preguntasFrescas} Q (F1 sin hitos${COLCHON_F1.length ? ' ni C1/C2' : ''} + contenido + refuerzo + uw_random; banco 3.659).
 * v5.20: plan de 95 días L-V con corrimiento rígido (+1 hábil por día no estudiado) y examen en febrero — SUSTITUIDO por la v6.00${FV6.version !== 'v6.00' ? ` (vigente: ${FV6.version})` : ''}.
 * Jerarquía de material: Path→Pathoma · Micro/Pharm→Sketchy · Physio/Biochem/Anat→AMBOSS+B&B · Behav/Biostats→First Aid.
 * Método Palmerton: comprensión fisiológica > memorización · tarjetas Anki de MECANISMO (FSRS) · pre-test ciego → active reading →
 * free recall → preguntas → log de errores. Cada día lleva nivelUW (1-5) y qDia; el gate (80% en 10Q) vive en USMLE_GATE / usmleScores.ts.
 */
import { semanaStep1, enPausaStep1 } from './fechasV6';
import type { Turno } from './fechasV6';

export const QBV = 'https://qbankly.app/videos';
export const QBQ = 'https://qbankly.app/qbanks';
export const QBF = 'https://qbankly.app/flashcards';
export const QBL = 'https://qbankly.app/library';
export const yt = (id: string) => 'https://www.youtube.com/watch?v=' + id;

export const DAILY_META = {
  step: 1, version: ${q(FV6.version)}, inicio: ${q(DIAS[0].fecha)}, fin: ${q(RITUAL.fecha)},
  /** Nº de filas (${DIAS.length} + ${T2.length}): SOLO informativo. Los d NO son contiguos (1-${DIAS.length} y ${T2[0].d}-${ultimo(T2).d}): nadie navega ni detecta el último día con él (usar DIAS_TODOS). */
  totalDias: ${DIAS.length + T2.length},
  tramos: [
    { n: 1, inicio: ${q(DIAS[0].fecha)}, fin: ${q(ultimo(DIAS).fecha)}, dias: ${DIAS.length} },
    { n: 2, inicio: ${q(T2[0].fecha)}, fin: ${q(RITUAL.fecha)}, dias: ${T2.length}, provisional: ${FV6.step1.provisional || FV6.encaps.provisional || FV6.serums.supuesto} },
  ],
  /** Step 1 en PAUSA (fechasV6.enPausaStep1): sin fila «hoy»; solo mantenimiento (§B2). */
  pausa: { desde: ${q(PAUSA.desde)}, hasta: ${q(PAUSA.hasta)}, motivo: 'ENCAPS intensiva + lunes libre' },
  /** Examen Step 1 (${FV6.version}; ${FV6.step1.provisional ? 'PROVISIONAL: ' : ''}base de planificación DJ-1). La fecha a RESERVAR depende del ENCAPS (fechasV6.reservaStep1). */
  examenTarget: ${q(E)},
  examenVentana: ${q(VENTANA)},
  /** GO/NO-GO = E-49 (horas acumuladas §B4.5 + NBME 31/32 ≥ 68 % con uno ≥ 70 %). */
  gonogo: ${q(GONOGO)},
  /** D-1 = viaje a Lima (sin estudio; USMLE_TAPER.dMenos1). El último día de plan es el ritual (${f(RITUAL.fecha)}). */
  descansoD1: ${q(VIAJE)},
  serumsInicio: ${q(FV6.serums.inicio)},
  /** Viernes de nivel 4 desde esta semana del plan (S1 = semana del D1) — flag VIERNES_N4_DESDE_SEMANA de gen_usmle_v5.js. 0 = desactivado. */
  viernesN4DesdeSemana: 11,
  bloque: ${q(BLOQUE)},
  // Palmerton v3 (5-sep-2026): la regla que gobierna el volumen. Nivel del día = DIAS_TODOS[].nivelUW; gate = USMLE_GATE.
  metodo: ${q(METODO)},
};

/** Gate de progresión Palmerton (UWorld Complete Guide · 80% Mastery Method). */
export const USMLE_GATE = {
  pct: 80, nQ: 10, ventanaHoras: 48,
  regla: 'No subir de nivel sin ≥80% en 10Q consecutivas del nivel actual, validadas ≤24-48 h después de estudiar el subtema.',
  siFalla: 'Si <80%: NO avanzar de tema. Repetir bloques de 5Q del subtema fallado y auditar en orden: (1) recursos, (2) comprensión (¿memoricé?), (3) aplicación a caso nuevo, (4) memoria/Anki. Si en 1-2 días no llega al 80%, el método está roto: ajustar YA.',
  medida: 'Gate del día en la app = % de la consolidación de las 11:00 (Fase A) o del bloque timed del día (Fases B-C). El % de UWorld es gate de proceso, no predicción: solo el NBME predice.',
};

export type NivelUW = 1 | 2 | 3 | 4 | 5;
export interface NivelUWInfo { nivel: NivelUW; nombre: string; formato: string; qDia: string; umbral: string; dondeVive: string; fase: string; color: string }
/** Los 5 niveles de maestría UWorld (Palmerton, "UWorld Complete Guide: The Five Levels of Mastery to 260+") mapeados a las fases A/B/C del plan ${FV6.version} (tramo 1 + tramo 2). */
export const USMLE_NIVELES: NivelUWInfo[] = [
  { nivel: 1, nombre: 'Subtema · tutor sin tiempo', fase: 'A', formato: 'Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options)', qDia: 'Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación)', umbral: '80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo', dondeVive: ${q("08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema · F4: «PARTE 1» de cada contenido partido (10Q tutor + deep prime)")}, color: '#7C8496' },
  { nivel: 2, nombre: 'Subtema · timed', fase: 'A', formato: 'Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar)', qDia: 'Volumen creciente → plan: 40Q (10 + 30)', umbral: '80% en ≥3 subtemas distintos, ≥1 validado en <48 h', dondeVive: ${q("11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) · tramo 2: REFUERZO (ética + bioestadística 2.ª vuelta) y «PARTE 2» de cada contenido partido en F4")}, color: '#4F7DD6' },
  { nivel: 3, nombre: 'Sistema completo · timed', fase: 'A', formato: 'Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema)', qDia: 'Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor)', umbral: '80% en 20Q timed consecutivas del sistema', dondeVive: ${q(`VIERNES sin NBME/UWSA a las 11:00 hasta S10 (F1: ${f1N3.join(' · ')}; los viernes que abren sistema —${f1AbreViernes.join(', ')}— quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 · tramo 2: REACTIVACIÓN de los sistemas de F1 (${REACT.length} filas, ${rangoT(REACT)}: incorrectas/flagged uWorld + AMBOSS, sin uWorld fresco) · F3: 16:15 REENTRADA (20Q timed del sistema de la rotación)`)}, color: '#6BB8B0' },
  { nivel: 4, nombre: 'Sistemas mixtos · timed', fase: 'A (dosis diaria + viernes desde S11) → B', formato: 'Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión)', qDia: 'Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q)', umbral: '80% en bloques mixtos de 20Q timed de ≥3 sistemas', dondeVive: ${q(`18:00 EVAL (10Q mixta timed) en F1 y F3 como dosis diaria · VIERNES sin hito desde S11 (F1: ${f1N4.join(' · ') || '—'} · tramo 2: ${t2N4Vie.join(' · ') || '—'}) = 20-30Q mixtos timed a las 11:00 en vez de sistema único (franjaNota) · T1 REENTRADA (${f(T2[0].fecha)})${colchonF1Nivel4} · uw_random (D84/D86/D88/D89 + 3 nuevas = UWorld FRESCO reservado, ${rangoT(RANDOM)}) · COLCHÓN antes del Free 120 (40Q timed del sistema débil)`)}, color: '#C8A96A' },
  { nivel: 5, nombre: 'Mixto completo 40Q · timed', fase: 'B → C (+ todos los hitos)', formato: 'Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen', qDia: 'Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120', umbral: '80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%)', dondeVive: ${q(`05:00 STRESS SET 10Q/12min (Fases B-C) · hitos = formato nivel 5 como MEDICIÓN, no como progresión (F1: UWSA1 + NBME 25-28 · tramo 2: ${NBME29 ? 'NBME 29 T' + NBME29.t : ''} → ${FREE120 ? 'Free 120 T' + FREE120.t : ''}) · DAY-AFTER de cada hito de F4 · incorrectas 2.ª pasada (D90/D91 + 7 nuevas, ${rangoT(INCORR)}) · consolidación (D92/D93 AMBOSS 200 + Pathoma/First Aid rapid review, ${rangoT(CONSOL)}) · taper (D94 ${f(D94.fecha)} · D95 ${f(D95.fecha)}) · colchón posterior al Free 120 (solo incorrectas/flagged)`)}, color: '#C56A5A' },
];

/** Franjas horarias fijas del bloque USMLE en F1 y F3 (L-V) · nivel UWorld y gate por franja (Palmerton v3). Las HORAS no cambian (${FV6.version}). */
export const FRANJAS = [
  { hora: '05:00–05:45', fase: 'ANKI AM (madrugada fresca · pasada principal FSRS · Good ≈90% / Again solo olvido real · ≤50 nuevas/día) · Fases B-C: + STRESS SET 10Q/12min (primer instinto, sin cambiar respuestas)', tipo: 'anki', nivel: 'B-C: 5', gate: '—' },
  { hora: '07:15–08:15', fase: 'Repaso anclado multi-temporal D-1/D-3/D-7 + free recall (Anki restante) · VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q)', tipo: 'anki', nivel: '2', gate: 'subtema de ayer ≥80% en las 10Q (5 aquí + 5 en la consolidación) → validado · <80% → 5Q más del subtema antes de pasar a otro' },
  { hora: '08:15–09:00', fase: 'PRE-TEST: 10Q uWorld ciegas del tema NUEVO (tutor · SIN tiempo) + free recall 90s = UWorld primero para DIAGNOSTICAR, First Aid después para tratar', tipo: 'pretest', nivel: '1', gate: 'sin gate: es diagnóstico (40-60% es normal) · cada duda, incluso en aciertos, va a la shopping list' },
  { hora: '09:00–11:00', fase: 'DEEP PRIME: vídeo B&B/Pathoma/Sketchy + First Aid active reading (Whole Page Rule: la página completa, no el dato fallado) + tarjetas Anki de MECANISMO (≤10, patogenia→presentación, en voz alta antes de escribir)', tipo: 'read', nivel: '—', gate: '—' },
  { hora: '11:00–12:00', fase: 'CONSOLIDACIÓN por nivel del día (nivelUW): nivel 1 = 20Q en bloques 5Q tutor del subtema (días 1-2 del sistema) · nivel 2 = 30Q en bloques 5Q timed de subtemas validados (incluye 5Q del subtema de ayer = 2ª mitad del gate) · nivel 3 (viernes sin hito hasta S10 · reactivación) = 20Q sistema completo timed + 10Q tutor · nivel 4 (viernes sin hito desde S11 · reentrada · colchón) = 20-30Q timed MIXTOS de sistemas dominados + 10Q tutor del subtema · taper D94-D95 = 20Q flagged, nada nuevo · revisión = Educational Objective + shopping list + log de errores (knowledge / transfer / proceso)', tipo: 'eval', nivel: '1→4 (nivelUW del día)', gate: '≥80% → mañana sube de nivel · <80% → repetir 5Q del subtema fallado, NO avanzar (registrar en 📏 Medición)' },
  { hora: '18:00–18:45', fase: 'EVALUACIÓN ACUMULATIVA modo examen: 10Q mixta timed (90 s/Q · tope 2 min · cover-the-options · juez, no abogado) + corrección + APEX · Fase A = dosis diaria de nivel 4 · día de hito: registrar aquí el % del NBME/UWSA/Free 120', tipo: 'exam', nivel: '4 (Fase A) · 5 (B-C)', gate: '≥80% sostenido = listo para mezclar sistemas · hitos: comparar con el mínimo on-track del hito (usmleScores.HITOS_ONTRACK · ${FV6.version}: F1 por D# (${hitosF1.map((x) => `D${x.d} ${f(x.fecha)}`).join(' · ')}); 2027 por ventana semanal + preferente, §B5)' },
];
/** F3 (${f(T2[0].fecha)} → ${f(ultimo(T2.filter((x) => x.fase === 'F3')).fecha)}): F1 + este bloque (7h15/día). La fila del día dice el sistema de la rotación en su franjaNota («16:15 REENTRADA: …»). */
export const FRANJA_F3_REENTRADA = { hora: '16:15–17:15', fase: 'REENTRADA (solo F3): 20Q timed del sistema de la rotación (Cardio → Resp → Renal → GI → Endo → Neuro → Heme → Fundamentos → Inmuno; ver franjaNota de la fila) + revisión', tipo: 'eval', nivel: '3', gate: '≥80% → el sistema sigue «vivo» · <80% → al COLCHÓN más próximo (sistema débil)' };

/**
 * F4 (SERUMS ${f(FV6.serums.inicio)} → ${f(RITUAL.fecha)}, L-S; domingo LIBRE) — plantillas por turno de la posta (V6_ESPEC §B4.1; el turno se marca cada día
 * en la app: serumsTurnos.leerTurno). M mañana 07-13 · T tarde 13-19 · L feriado/sin turno · G guardia · H día de hito (turno T o
 * feriado sin turno: el hito ES el Step 1 del día) · H-sáb fallback del hito (semana sin ningún día T/L, «condición degradada»).
 * Preguntas del día: qDia con turno M/L/G · qDiaT (= qDia + 40, bloque B 07:40-10:10, AMBOSS/incorrectas) con turno T.
 * MIR siempre 1 h y R↔D siempre ≥ 30' (DJ-4).
 */
export type PlantillaF4 = Turno | 'H' | 'H-sáb';
export type FrenteF4 = 'step1' | 'hito' | 'mir' | 'research-derma' | 'serums' | 'gimnasio' | 'vida';
export interface FranjaF4 { hora: string; fase: string; frente: FrenteF4 }
export const FRANJAS_F4: Record<PlantillaF4, FranjaF4[]> = {
  M: [
    { hora: '04:00', fase: 'Despertar', frente: 'vida' },
    { hora: '04:05–05:55', fase: 'STEP 1 · BLOQUE A (1h50): preguntas nuevas timed / contenido nuevo (la fila del día, qDia)', frente: 'step1' },
    { hora: '05:55–06:20', fase: 'Ducha + desayuno', frente: 'vida' },
    { hora: '06:20–07:00', fase: 'Traslado a la posta', frente: 'vida' },
    { hora: '07:00–13:00', fase: 'SERUMS · turno MAÑANA', frente: 'serums' },
    { hora: '07:00–13:00 (tiempo muerto)', fase: "Research ↔ Derma 30' en tiempo muerto de la posta (DJ-4)", frente: 'research-derma' },
    { hora: '13:00–13:40', fase: "Traslado · Anki USMLE 25' en el móvil (si marea, audio)", frente: 'step1' },
    { hora: '13:40–14:30', fase: "Almuerzo (siesta ≤20')", frente: 'vida' },
    { hora: '14:30–16:00', fase: 'STEP 1 · BLOQUE B (1h30, solo carga baja: incorrectas, FA/Pathoma, Anki)', frente: 'step1' },
    { hora: '16:00–17:00', fase: 'MIR 1 h (DJ-4)', frente: 'mir' },
    { hora: '18:00', fase: 'Cena', frente: 'vida' },
    { hora: '19:00–20:30', fase: 'Gimnasio (sin cambio)', frente: 'gimnasio' },
    { hora: '21:00', fase: 'Dormir', frente: 'vida' },
  ],
  T: [
    { hora: '04:00', fase: 'Despertar', frente: 'vida' },
    { hora: '04:05–06:05', fase: 'STEP 1 · BLOQUE A (2 h): contenido nuevo (la fila del día)', frente: 'step1' },
    { hora: '06:10–07:00', fase: 'Gimnasio', frente: 'gimnasio' },
    { hora: '07:00–07:40', fase: 'Ducha + desayuno', frente: 'vida' },
    { hora: '07:40–10:10', fase: "STEP 1 · BLOQUE B (2h20 netas, pausa 10'): 40Q timed + revisión (qDiaT = qDia + 40: AMBOSS / incorrectas uWorld, nunca uWorld fresco)", frente: 'step1' },
    { hora: '10:10–10:35', fase: 'Anki USMLE', frente: 'step1' },
    { hora: '10:35–11:35', fase: 'MIR 1 h (DJ-4)', frente: 'mir' },
    { hora: '11:35–12:15', fase: 'Almuerzo · salida 12:20', frente: 'vida' },
    { hora: '13:00–19:00', fase: 'SERUMS · turno TARDE', frente: 'serums' },
    { hora: '13:00–19:00 (tiempo muerto)', fase: "Research ↔ Derma 30' en tiempo muerto de la posta (DJ-4)", frente: 'research-derma' },
    { hora: '19:40', fase: 'Cena', frente: 'vida' },
    { hora: '21:00', fase: 'Dormir', frente: 'vida' },
  ],
  L: [
    { hora: '04:00', fase: 'Despertar', frente: 'vida' },
    { hora: '04:05–06:05', fase: 'STEP 1 · BLOQUE A (2 h)', frente: 'step1' },
    { hora: '07:00–07:30', fase: 'Desayuno', frente: 'vida' },
    { hora: '07:30–12:30', fase: 'STEP 1 · BLOQUE LARGO (los hitos van aquí) — feriado sin turno = día doble', frente: 'step1' },
    { hora: '12:30–12:55', fase: 'Anki USMLE', frente: 'step1' },
    { hora: '15:15–16:15', fase: 'MIR 1 h (su franja establecida)', frente: 'mir' },
    { hora: '16:20–16:50', fase: "Research ↔ Derma 30' (DJ-4)", frente: 'research-derma' },
    { hora: '19:00–20:30', fase: 'Gimnasio', frente: 'gimnasio' },
    { hora: '21:00', fase: 'Dormir', frente: 'vida' },
  ],
  G: [
    { hora: 'guardia', fase: 'SERUMS · GUARDIA', frente: 'serums' },
    { hora: 'tiempo muerto', fase: "MIR 1 h en tiempo muerto de la guardia (Anki MIR 15' + 25Q en el móvil); lo que no se termine se SUMA al día de plan siguiente (nunca se pierde)", frente: 'mir' },
    { hora: 'tiempo muerto', fase: "Research ↔ Derma 30' en tiempo muerto de la guardia (DJ-4)", frente: 'research-derma' },
    { hora: 'cuando se pueda', fase: "Anki USMLE 25'", frente: 'step1' },
  ],
  H: [
    { hora: '04:00', fase: 'Despertar', frente: 'vida' },
    { hora: '04:05–05:05', fase: 'MIR 1 h (DJ-4)', frente: 'mir' },
    { hora: '05:10–06:00', fase: 'Gimnasio', frente: 'gimnasio' },
    { hora: '06:00–06:45', fase: 'Ducha + desayuno', frente: 'vida' },
    { hora: '07:00', fase: 'HITO (sustituye a los bloques A y B): NBME 07:00–12:15 · UWSA 07:00–11:15 · Free 120 07:00–10:15 · ensayo 7 bloques 07:00–16:30 (solo en día sin turno)', frente: 'hito' },
    { hora: '12:20–19:00 (turno T)', fase: 'Almuerzo rápido y salida 12:20 → posta 13:00–19:00 (SERUMS · turno TARDE)', frente: 'serums' },
    { hora: '12:30–13:15 (día L)', fase: "Almuerzo · siesta ≤20'", frente: 'vida' },
    { hora: 'tiempo muerto (T) · 16:20–16:50 (L)', fase: "Research ↔ Derma 30' (DJ-4)", frente: 'research-derma' },
    { hora: 'tiempo muerto (T) · tarde (L)', fase: "Anki USMLE 25'", frente: 'step1' },
    { hora: '19:40', fase: 'Cena', frente: 'vida' },
    { hora: '21:00', fase: 'Dormir', frente: 'vida' },
  ],
  'H-sáb': [
    { hora: '04:00', fase: 'Despertar', frente: 'vida' },
    { hora: '04:05–05:05', fase: 'MIR 1 h (DJ-4)', frente: 'mir' },
    { hora: '05:05–05:50', fase: 'Gimnasio', frente: 'gimnasio' },
    { hora: '05:50–06:20', fase: 'Ducha + desayuno', frente: 'vida' },
    { hora: '06:20–07:00', fase: 'Traslado a la posta', frente: 'vida' },
    { hora: '07:00–13:00', fase: 'SERUMS · turno MAÑANA', frente: 'serums' },
    { hora: '07:00–13:00 (tiempo muerto)', fase: "Research ↔ Derma 30' en tiempo muerto de la posta (DJ-4)", frente: 'research-derma' },
    { hora: '13:00–13:40', fase: "Traslado · Anki USMLE 25'", frente: 'step1' },
    { hora: '13:40–14:10', fase: 'Almuerzo', frente: 'vida' },
    { hora: '14:15–19:30', fase: 'HITO por la tarde — CONDICIÓN DEGRADADA (semana sin ningún día T/L; NBME 31/32 nunca después del sábado de su ventana)', frente: 'hito' },
    { hora: '19:40', fase: 'Cena', frente: 'vida' },
    { hora: '21:00', fase: 'Dormir', frente: 'vida' },
  ],
};
/** Horas de Step 1 por plantilla (§B4.1-B4.2; PISO = todo turno M con el bloque B al 25 %). */
export const FRANJAS_F4_HORAS: Record<PlantillaF4, string> = {
  M: 'Step 1 bruto 3,75 h / efectivo 3,00 (bloque B al 50 %) · 2,63 al PISO (bloque B al 25 %)',
  T: 'Step 1 bruto 4,75 h / efectivo 4,51 (×0,95)',
  L: 'Step 1 ≈7,4 h (modelo: día del perfil +2 h)',
  G: 'Step 1 ≈0,4 h (Anki)',
  H: 'el hito ES el Step 1 del día (NBME 5,25 h · UWSA 4,25 h · Free 120 3,2 h · ensayo 8,5 h)',
  'H-sáb': 'el hito ES el Step 1 del día (por la tarde, tras el turno M)',
};
export const FRANJAS_F4_NOTAS: string[] = [
  'Semana (6 días de plan): PISO 15,75 h · M 18,0 · MIX (50 % M / 50 % T) 22,5 · T 27,1 h efectivas · inducción (2 primeras semanas del SERUMS) al 50 %.',
  "Variantes T: turno 12:00-18:00 → bloque B 07:00-09:30, Anki 09:30, MIR 09:55-10:55, salida 11:20, gimnasio 19:00-20:00 · turno 14:00-20:00 → todo +30' y dormir 21:30-04:30.",
  "Domingo: LIBRE (Anki ≤15' opcional, no se registra). Revisión semanal: sábado, 20' dentro del bloque de Step 1 del día.",
  'Día de hito: plantilla H si ese día hay turno T o es feriado sin turno; si la semana no tiene ningún día T/L → H-sáb (condición degradada). El day-after va al día de plan siguiente al hito real.',
];

export interface DiaUSMLE {
  d: number; fecha: string; system: string; tier: 'CORE'|'HIGH'|'MED';
  sub: string; bbCh: string; bbVid: string; uw: string; mat: string; matType: string;
  palm: { id: string; t: string } | null;
  /** Nivel de maestría UWorld del día (1-5, Palmerton) — ver USMLE_NIVELES · generado por gen_usmle_v5.js / gen_tramo2.js */
  nivelUW: NivelUW;
  /** Q uWorld objetivo del día (pre-test + consolidación; hitos = Q del simulacro; banco = bloques timed). En F4 = turno M/L/G. */
  qDia: number;
  /** Texto extra de franja (viernes de nivel 4 · F3 «16:15 REENTRADA: …» · taper). NO es contenido: el subtema es \`sub\`. */
  franjaNota?: string;
}
/** Tipo de fila del tramo 2 (V6_ESPEC §B3). Las filas de F1 (DIAS) no llevan \`tipo\`. */
export type TipoFilaT2 = 'reentrada' | 'hito' | 'day_after' | 'contenido' | 'refuerzo' | 'reactivacion' | 'uw_random' | 'incorrectas' | 'consolidacion' | 'taper' | 'ritual' | 'colchon';
/** Fila del tramo 2 (${f(T2[0].fecha)} → ${f(RITUAL.fecha)}): todos los campos de DiaUSMLE + los del modelo de §B3. */
export interface DiaUSMLE_T2 extends DiaUSMLE {
  /** nº de fila del tramo 2 (1…n) · d = 100 + t (clave de plan_checks('usmle', d); estable: una regeneración nunca cambia un d ya pasado) */
  t: number;
  tipo: TipoFilaT2;
  /** D de la v5.20 cuyo contenido lleva la fila (null = fila nueva) */
  dOrig: number | null;
  /** unidad de cola (C58…, REF0/1, RX-<sistema>-<k>, UR84/URn1…, IN90/INn1…, CO92/COpathoma…, F1-<d>${DESPL.length ? `; ${FV6.version}: ${DESPL.map((d) => 'C' + d).join('/')} = filas de F1 desplazadas` : ''}); la usa la regeneración con congelado */
  uid?: string;
  /** 'k/n' si una unidad ocupa varias filas (F4: 2 filas; inducción: 4) */
  parte: string | null;
  fase: 'F3' | 'F4';
  faseUW: 'A' | 'B' | 'C';
  /** horas-plan al PISO */
  h: number;
  /** preguntas con turno T (= qDia + 40: bloque B 07:40-10:10, AMBOSS/incorrectas); solo filas F4 no ancladas y anteriores al Free 120 */
  qDiaT?: number;
  /** texto v5.20 literal (filas con dOrig): el sub visible lo contiene */
  subV520?: string;
  /** inducción del SERUMS (capacidad 0,25 u/fila) */
  adapt?: true;
  /** hitos de F4: ventana lun-sáb [ini, fin] (NBME 29 en F3: null) */
  ventana?: [string, string] | null;
  nombre?: string;
  forma?: number | 'UWSA3';
  gate?: 'GO/NO-GO (E-49)' | 'GO/NO-GO #2 (E-49)';
  /** recuperación de una fila F1 no hecha (cierre de F1, --pendientes-f1; las filas de F1 DESPLAZADAS por un corrimiento no lo llevan: van con dOrig) */
  dF1?: number;
  /** unidad de una fila congelada sin ✓ que vuelve entera a la cola (--pendientes) */
  pendiente?: true;
}
/** Fila de cualquiera de los dos tramos. */
export type DiaUSMLEPlan = DiaUSMLE | DiaUSMLE_T2;
`;

const footer = `

/** Los dos tramos en orden (${DIAS.length} + ${T2.length} filas). Navegar y buscar SIEMPRE aquí, por índice o por fecha (los d no son contiguos). */
export const DIAS_TODOS: DiaUSMLEPlan[] = [...DIAS, ...DIAS_T2];

/** ¿Fila del tramo 2? (las de F1 no llevan \`tipo\`). */
export function esFilaT2(x: DiaUSMLE): x is DiaUSMLE_T2 { return typeof (x as Partial<DiaUSMLE_T2>).tipo === 'string'; }
export function diaDe(fechaISO: string): DiaUSMLEPlan | undefined { return DIAS_TODOS.find((x) => x.fecha === fechaISO); }
export function diaPorD(d: number): DiaUSMLEPlan | undefined { return DIAS_TODOS.find((x) => x.d === d); }
/** Índice de la fila en DIAS_TODOS (-1 si no está). */
export function indiceDe(x: DiaUSMLE): number { return DIAS_TODOS.findIndex((y) => y.d === x.d); }
/**
 * Estado del Step 1 en una fecha (§B2 · §F): 'PAUSA' entre el ${f(PAUSA.desde)} y el ${f(PAUSA.hasta)} (enPausaStep1 de fechasV6: sin fila «hoy»;
 * T1 NO es «hoy» durante la pausa) · 'PLAN' con la fila de esa fecha (exacto) o la siguiente del plan (fin de semana, SKIP, protegido) ·
 * 'FIN' después de la última fila (viaje, examen, post-examen).
 */
export type EstadoUSMLE = { estado: 'PLAN'; dia: DiaUSMLEPlan; exacto: boolean } | { estado: 'PAUSA'; desde: string; hasta: string; reinicio: string } | { estado: 'FIN'; ultimo: DiaUSMLEPlan };
export function estadoUSMLE(fechaISO: string): EstadoUSMLE {
  if (enPausaStep1(fechaISO)) return { estado: 'PAUSA', desde: DAILY_META.pausa.desde, hasta: DAILY_META.pausa.hasta, reinicio: DIAS_T2[0]?.fecha ?? DAILY_META.pausa.hasta };
  const exacto = diaDe(fechaISO);
  if (exacto) return { estado: 'PLAN', dia: exacto, exacto: true };
  const sig = DIAS_TODOS.find((x) => x.fecha > fechaISO);
  if (sig) return { estado: 'PLAN', dia: sig, exacto: false };
  return { estado: 'FIN', ultimo: DIAS_TODOS[DIAS_TODOS.length - 1] as DiaUSMLEPlan };
}
export { enPausaStep1 };
/** Fila anterior LITERAL del plan (puede ser un hito 🎯; T1 → D${DIAS.length}). Para el repaso anclado usar diaPrevio / ultimoDiaContenido. */
export function diaAnterior(d: DiaUSMLE): DiaUSMLEPlan | undefined { const i = indiceDe(d); return i > 0 ? DIAS_TODOS[i - 1] : undefined; }
/**
 * Fila previa de CONTENIDO: salta los hitos 🎯 (fix #6 de la 2.ª capa, 19-sep-2026), recorriendo los 2 tramos por índice
 * (${FV6.version}: T1 → D${[...DIAS].reverse().find((x) => !esHito(x)).d}${esHito(ultimo(DIAS)) ? `, salta el ${nombreHito(ultimo(DIAS))} del D${ultimo(DIAS).d}` : ''}). D2 (tras el UWSA1) no tiene fila previa de contenido → undefined.
 */
export function diaPrevio(d: DiaUSMLE): DiaUSMLEPlan | undefined {
  for (let i = indiceDe(d) - 1; i >= 0; i--) { const x = DIAS_TODOS[i]; if (x && !esHito(x)) return x; }
  return undefined;
}
/** Alias con el nombre que propuso el crítico de completitud (#6). */
export const ultimoDiaContenido = diaPrevio;
/** 7 filas desde la primera con d ≥ fromD (por índice: cruza de D${DIAS.length} a T1). */
export function ventana7d(fromD: number): DiaUSMLEPlan[] { const i = DIAS_TODOS.findIndex((x) => x.d >= fromD); return i < 0 ? [] : DIAS_TODOS.slice(i, i + 7); }
export const TIER_INFO: Record<string,{c:string;t:string}> = { CORE:{c:'#E5484D',t:'Core'}, HIGH:{c:'#F5A623',t:'Alto'}, MED:{c:'#3FB984',t:'Medio'} };
/** Etiqueta de navegación: «Día {d}/${DIAS.length}» en F1 y «T{t}/${T2.length}» en el tramo 2. */
export function etiquetaDiaUSMLE(x: DiaUSMLE): string { return esFilaT2(x) ? 'T' + x.t + '/' + DIAS_T2.length : 'Día ' + x.d + '/' + DIAS.length; }
/** Etiqueta corta del tipo de fila del tramo 2 (chips). */
export const TIPO_FILA_T2_LABEL: Record<TipoFilaT2, string> = {
  reentrada: 'REENTRADA', hito: 'HITO', day_after: 'DAY-AFTER', contenido: 'CONTENIDO', refuerzo: 'REFUERZO', reactivacion: 'REACTIVACIÓN',
  uw_random: 'UWORLD RANDOM', incorrectas: 'INCORRECTAS', consolidacion: 'CONSOLIDACIÓN', taper: 'TAPER', ritual: 'RITUAL', colchon: 'COLCHÓN',
};
/**
 * Fase UWorld de una fila por su d (${FV6.version}): F1 (d ≤ ${DIAS.length}) = 'A' · ${DIAS.length + 1}-100 no existen (guarda: 'A', nunca undefined) ·
 * tramo 2 (d ≥ 101) = su faseUW (A hasta el primer uw_random ${RANDOM.length ? 'T' + RANDOM[0].t : ''} · B hasta la primera consolidación/taper ${CONSOL.length ? 'T' + CONSOL[0].t : ''} · C después).
 */
export function faseDe(d: number): 'A' | 'B' | 'C' {
  if (d <= 100) return 'A';
  return DIAS_T2.find((x) => x.d === d)?.faseUW ?? 'A';
}
/** Ficha del nivel UWorld (1-5); fuera de rango → nivel 1. */
export function nivelInfo(n: number): NivelUWInfo { return USMLE_NIVELES[Math.min(5, Math.max(1, Math.round(n || 1))) - 1] as NivelUWInfo; }
/** Día de hito (UWSA / NBME / Free 120): el subtema empieza con 🎯. */
export function esHito(x: DiaUSMLE): boolean { return /🎯/.test(x.sub); }
/** Días de hito del plan en orden (los 2 tramos: ${hitosF1.length} + ${hitosT2.length}). */
export function hitosDelPlan(): DiaUSMLEPlan[] { return DIAS_TODOS.filter(esHito); }
const DIAS_SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'] as const;
/** Día de la semana de una fecha AAAA-MM-DD (UTC-noon, sin zonas horarias). */
export function diaSemana(fechaISO: string): (typeof DIAS_SEMANA)[number] { return DIAS_SEMANA[new Date(fechaISO + 'T12:00:00Z').getUTCDay()] ?? 'dom'; }
/** Semana del Step 1 = semanaStep1(iso).n de fechasV6 (definición única, §F): S1-S${SEM_F1} = F1 · ${SEM_F1} durante la PAUSA · ${SEM_F1 + 1}+ = tramo 2 · 0 antes del D1. */
export function semanaDe(fechaISO: string): number {
  try { return semanaStep1(fechaISO).n; } catch { return 0; }
}
/** Viernes de nivel 4 (contenido de Fase A en viernes desde S11): el bloque de las 11:00 es mixto de sistemas dominados. Nunca en la reentrada, el colchón ni las filas de banco. */
export function esViernesNivel4(x: DiaUSMLE): boolean {
  const tipo = esFilaT2(x) ? x.tipo : undefined;
  return (!tipo || tipo === 'contenido') && diaSemana(x.fecha) === 'vie' && x.nivelUW === 4 && faseDe(x.d) === 'A' && !esHito(x);
}
/** Día de taper (semana previa al examen: lun-mié taper · jue D94 · vie D95): 20Q flagged + Anki maduro, cero contenido nuevo. */
export function esDiaTaper(x: DiaUSMLE): boolean { return (esFilaT2(x) && x.tipo === 'taper') || /^TAPER/.test(x.franjaNota ?? ''); }
/** Ritual de test-day (última fila del plan, sin estudio): aquí va el bloque D-1/EXAMEN (USMLE_TAPER.dMenos1 / .examen). */
export function esDiaRitual(x: DiaUSMLE): boolean { return (esFilaT2(x) && x.tipo === 'ritual') || x.d === DIAS_TODOS[DIAS_TODOS.length - 1]?.d; }
/** El día de "dermato Step 1" (B&B Dermatology, dentro de MSK): cuenta doble con los átomos Derma ya estudiados (puente Derma ↔ Step 1). */
export function esDiaDermaStep1(x: DiaUSMLE): boolean { return /dermato Step 1/i.test(x.sub) || /Dermatology/i.test(x.bbVid); }
/**
 * TAPER y D-1 (Palmerton §8.3-§8.4 · V6_ESPEC §B6). ${FV6.version}: D94 ${f(D94.fecha)} = última sesión de banco (solo bloque A) · D95 ${f(D95.fecha)} =
 * sesión mínima ≤1 h · ritual ${f(RITUAL.fecha)} SIN estudio (protegido) · ${f(VIAJE)} viaje a Lima (D-1) · ${fy(E)} EXAMEN · ${f(REGRESO)} regreso.
 * Un día perdido ya no mueve el examen: se paga con filas COLCHÓN; agotadas, decide el GO/NO-GO (§B7).
 * Todo lo de aquí sale de PALMERTON_METODO_COMPLETO.md §8.3-§8.4 (nada estimado): las cifras marcadas A VERIFICAR siguen así.
 */
export const USMLE_TAPER = {
  fuente: 'PALMERTON_METODO_COMPLETO.md §8.3-§8.4 · ${FV6.version}',
  cierre: ${q(`Desde el Free 120 (${f(FREE120 ? FREE120.fecha : '')}): 0 tarjetas nuevas y 0 preguntas nuevas salvo filas ya planificadas (o atrasadas); colchón = solo incorrectas/flagged + Anki maduro; sin +40Q de turno T; rapid review`)},
  /** Semana previa al examen: taper ≤2 h (solo bloque A; MIR sigue 1 h). */
  taperSemana: ${q(`${TAPER_SEM.map((x) => f(x.fecha)).join(' · ')} = taper (≤2 h, solo bloque A; MIR sigue 1 h) · ${f(D94.fecha)} D94 · ${f(D95.fecha)} D95 · ${f(RITUAL.fecha)} ritual`)},
  /** Permiso de examen en la posta: pedirlo con ≥4 semanas como día justificado. */
  permiso: ${q(`Permiso de examen: pedirlo con ≥4 semanas (${f(add(E, -28))} a más tardar) como día justificado, nunca falta injustificada`)},
  d94: { t: ${D94.t}, d: ${D94.d}, fecha: ${q(D94.fecha)}, rol: ${q(`ÚLTIMA SESIÓN DE BANCO (${f(D94.fecha)} · solo bloque A 04:05-06:05)`)}, resumen: 'Solo Anki MADURO + 20Q flagged/incorrectas ya vistas · First Aid de esquemas, no de detalle · dormir ≥7 h ya desde hoy' },
  d95: { t: ${D95.t}, d: ${D95.d}, fecha: ${q(D95.fecha)}, rol: ${q(`sesión MÍNIMA ≤1 h (${f(D95.fecha)} · bloque A 04:05-05:05)`)}, resumen: 'Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes (≤1 h) · cero preguntas nuevas, cero tarjetas nuevas · nada de estudio después de las 17:00 · mañana ritual (sin estudio) y empaque' },
  ritual: { t: ${RITUAL.t}, d: ${RITUAL.d}, fecha: ${q(RITUAL.fecha)}, rol: 'SIN ESTUDIO · turno de la posta · empacar: permiso impreso + digital, 2 ID idénticas, Ziploc por break, pasaje' },
  dMenos1: {
    fecha: ${q(VIAJE)}, rol: 'D-1 · viaje Huancayo → Lima · sin estudio · dormir ≥7 h',
    pasos: [
      ${q(`Sin estudio: la última sesión de banco fue el ${f(D94.fecha)} (D94), la sesión mínima el ${f(D95.fecha)} (D95) y el empaque el ${f(RITUAL.fecha)} (ritual); como mucho Anki vencido ≤30 min en el viaje, cero tarjetas nuevas, cero preguntas nuevas`)},
      'PROHIBIDO: bloques de preguntas, temas densos, abrir First Aid "para ver cuánto sé" (anécdota de Alec: cerró el libro — "the knowledge that I have is the knowledge that I have")',
      'Viaje Huancayo → Lima con margen (salir temprano, llegar de día) · nada de estudio después de las 17:00: journaling, paseo suave, visualización/meditación, cena con proteína',
      'Revisar antes de salir lo empacado en el ritual: permiso impreso + digital · 2 identificaciones con foto que coincidan EXACTAMENTE con el permiso · snacks en bolsas Ziploc etiquetadas Break #1-#4 (proteína > carbohidratos simples) · granos de espresso con chocolate si los usaste en los simulacros · pasaje de regreso',
      'Somnífero: NUNCA por primera vez esta noche (si se usa, ya probado semanas antes en una noche de simulacro)',
      'Dormir temprano (≥7-8 h) cerca del centro Prometric; alarma y ruta al Prometric comprobadas la noche anterior',
    ],
  },
  examen: {
    fecha: ${q(E)}, rol: 'EXAMEN · Prometric (centro a confirmar: Lima o extranjero, §I)',
    pasos: [
      'Desayuno alto en proteína y grasa (huevos, aguacate, nueces), sin carbohidratos simples; el café de siempre (no cambiar hábitos hoy)',
      'Tutorial: comprobar auriculares en la pestaña media y terminar → los 15 min pasan al descanso (60 min en vez de 45)',
      'Plan de bloques de Alec: 1-2 seguidos (sit-in 2-3 min si hace falta) → 10 min fuera · 3-4 seguidos → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 → fin',
      'Entre bloques: al pulsar "finalizar", esas 40Q dejan de existir; NUNCA revisar preguntas ni abrir First Aid en el casillero',
      'Nunca salir a mitad de bloque (el reloj sigue y puede reportarse como irregularidad) · si se agota el descanso, el bloque siguiente arranca solo',
      'Post-test: premiarte para cerrar el ciclo',
    ],
  },
  regreso: { fecha: ${q(REGRESO)}, rol: ${q(`regreso · permiso 1 día (2 si el ${f(REGRESO)} tiene turno M)`)} },
  /** Regla escrita (DIVERGENCIAS #29 → REGLA §E-7): la señal la da usmleScores.gateHito ('ALERTA BURNOUT'). */
  burnout: 'Si 2 hitos consecutivos quedan bajo su mínimo on-track Y hay síntomas (releer sin comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h): 3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño; frenar QBank y contenido nuevo; la pausa se paga con filas COLCHÓN; agotadas, decide el GO/NO-GO; se reanuda por el gate del 80%, no por la fecha.',
};

/**
 * KIT ANTI-PÁNICO del bloque (2.ª capa #26, 19-sep-2026). Se pinta en la Cola de hoy los días de hito (UWSA/NBME/Free 120)
 * y vale para cualquier bloque timed. Texto de PALMERTON_METODO_COMPLETO.md §7.1 · §5.5 · §5.6 · §7.4 · §7.6 · §8.4; nada estimado.
 */
export const PROTOCOLO_BLOQUE = {
  titulo: 'Kit anti-pánico del bloque (Palmerton §7.6 Panic Trap · §7.1 · §5.5 · §7.4)',
  pasos: [
    'AVP en 10 s DENTRO del bloque (Acknowledge · Validate · Permit): "siento mucha ansiedad ahora" → "claro que sí: es importante para mi carrera, llevo meses y hay una sola oportunidad" → "está bien sentirlo; me concentro en la pregunta y la miro como un puzzle, no como un juez de mi carácter"',
    'Tope de 2 min por pregunta (90 s + 30 %): si se cumple → adivinar, marcar (flag) y avanzar; nunca 4-5 min en una (las preguntas de >2 min salen ~50 % vs 80 % del bloque)',
    'Juez, no abogado: SAQ (pregunta autónoma) antes de mirar las opciones · CCSN (contexto · cronología · severidad · ruido) · rule-in antes de rule-out cuando quedan 2',
    'Flag y sigue: la pregunta marcada deja de existir hasta el final del bloque; volver a las marcadas solo si sobra tiempo en la primera pasada',
    'NO cambiar respuestas salvo error de lectura innegable (unidad, edad, signo vital omitido); nunca por sensación de duda (60-70 % de los cambios van de correcta a incorrecta)',
    'Pregunta difícil = "game on": es difícil para todos y vale un punto; desconfiar y acertar es lo peor (matriz de confianza 2×2)',
    'Entre bloques (sit-in break): "Oh F#@& to OK" en 10-15 s (nombrar la emoción · soltar con respiraciones nasales · recentrar · validar · reengancharse); al pulsar finalizar, esas 40Q dejan de existir',
  ],
  worstCase: ${q(`Worst-Case Scenario Planning (§7.6-1): ANTES del primer bloque del primer hito, escribir en detalle el peor escenario y exactamente qué harías (plan B de fecha${DJ1_UNICA ? `: el examen ya es el ${fy(E)} en todos los escenarios (DJ-1 ${VER_DJ1}) y un NO-GO del ${fy(GONOGO)} pasa a la extensión de la elegibilidad (nov-dic-ene, la única permitida)` : ` dentro de la ventana DJ-1 —adelanto ${fy(FV6.step1.adelanto)} → base ${fy(BASE_DJ1)} → plan B ${fy(FV6.step1.planB)}—`}, sin recortar temario; "would it be the end of the world? No"). Vive en Readiness → "Plan B / peor escenario" (localStorage jmd-usmle-worstcase).`)},
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §7.1 (2 min) · §5.5 (juez vs abogado) · §5.6 (rule-in) · §7.4 (cambiar respuestas) · §7.6 (Panic Trap: worst-case, drill, AVP) · §8.4 (test day)',
};

/**
 * DAY-AFTER PROTOCOL (2.ª capa #5 + §12.6-9, 19-sep-2026): ~4 h el día siguiente a cada hito. En F1/F3 se aloja en el deep prime
 * (09:00-11:00 + resto de la mañana) y el subtema de ese día NO cambia (regla de no fusionar); en F4 (${FV6.version}) es una FILA propia del
 * tramo 2 (tipo 'day_after', bloques A + B). Texto de PALMERTON_METODO_COMPLETO.md §9.1-§9.2 y §12.5; nada estimado.
 */
export const DAY_AFTER = {
  titulo: 'Day-After Protocol (Palmerton §9.2 · ~4 h · el día siguiente al hito)',
  cuando: 'El hito se rinde por la mañana. F1/F3: la auditoría cabe en el deep prime del día siguiente (09:00-11:00 + resto de la mañana) y el subtema de ese día sigue en pie (regla de no fusionar). F4: el day-after es una fila propia del tramo 2 (bloques A + B, sin preguntas nuevas) el día de plan siguiente al hito real.',
  pasos: [
    'Trayectoria (15 min): curva del % frente a los hitos previos; ¿subieron los sistemas estudiados en las últimas 2 semanas?',
    'Auditoría de honestidad (15 min, POR ESCRITO): "si sigo haciendo lo mismo que las últimas 2 semanas durante 6 meses, ¿qué resultado tendría?"',
    'Triaje de errores (1 h): knowledge gap vs QI errors (interpretación / toma de examen), típicamente 50/50; ¿abogado o juez?',
    'Drill de cronología fisiopatológica (2,5 h): 10 preguntas falladas (las más largas y con más labs) reescritas A MANO en orden cronológico estricto y en presente = 10 PC cards',
    'Reporte POR SISTEMA (§9.1): leer el hito sistema a sistema, exigiendo ≥80 % en lo ya estudiado ("si estudio algo, ¿sube y se mantiene cuando estudio lo siguiente?"); cautela: pocos ítems por materia → intervalos de confianza enormes',
    'Ítems experimentales / gráficos (knockouts, curvas) separados en la revisión → 2-3 tarjetas de "diseño del experimento" (§12.6-9: UWorld es débil en ese formato)',
  ],
  reglaDeOro: 'No dedicar el 70 % de la semana a repasar cada explicación del NBME (escribe los mejores enunciados y las peores explicaciones): usarlo como mapa de diagnóstico y rellenar con UWorld/Anki. Sin explicaciones (Free 120): PC manuscrita + Pathoma.',
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §9.1 (lectura por sistema) · §9.2 (Day-After) · §12.5 · §12.6-9',
};

/**
 * Reglas Palmerton por franja (2.ª capa #16 backlog · #17 regla del frente · #10 temporizador · #11 cambiadas/relecturas, 19-sep-2026).
 * Clave = índice de FRANJAS (0 = 05:00 Anki · 3 = 09:00 deep prime · 4 = 11:00 · 5 = 18:00). NO cambian horas ni contenido; HorarioView las pinta.
 */
export const FRANJAS_REGLAS: Record<number, string[]> = {
  0: [
    'BACKLOG (§4.10): reviews first, nuevas después; si falta tiempo, nuevas = 0. Vencidas acumuladas → nuevas = 0 y cap de reviews 200 (número psicológico; 300 si sobra energía y volver a 200 antes de dormir) hasta la pantalla verde; NUNCA "Forget" en bloque ni resetear el mazo.',
    ${q(`FRENO POR HITO (§4.10): % del banco / NBME estancado o en declive → nuevas = 0 y días dedicados a limpiar el backlog con honestidad · nuevas = 0 durante la PAUSA (${f(PAUSA.desde)} → ${f(PAUSA.hasta)}; FSRS 0,85 desde el ${f(FV6.encaps.intensiva_desde)} y 0,90 otra vez el día del reinicio, ${f(REINICIO)}) y desde el Free 120 (${f(FREE120 ? FREE120.fecha : '')}).`)},
    'Pharm = mazo aparte (§4.2): 20 nuevas/día dentro del cap de 50; máximo 3 mazos.',
  ],
  3: [
    'REGLA DEL FRENTE (§4.12): el anverso lo redactas TÚ (sujeto primero, amplio, sin pistas, sin cloze); APEX/Claude solo el reverso o compare & contrast una vez entendido. Anverso con la respuesta dentro = information leakage.',
  ],
  4: ['TEMPORIZADOR (§7.1): 2:00 por pregunta, reiniciado en cada una (si suena → adivinar, flag, avanzar); cuenta atrás en 📏 Medición o temporizador del teléfono.'],
  5: [
    'TEMPORIZADOR (§7.1 · §7.5): 2:00 por pregunta · 12:00 el stress set de 10Q (Fases B-C) · 60:00 el bloque de 40Q.',
    'MÉTRICAS DEL BLOQUE (§7.3-§7.4): contar respuestas CAMBIADAS (≥2 = abogado; solo se cambia por error de lectura innegable) y RELECTURAS de una misma pregunta (3-4 = lectura circular); se registran en 📏 Medición.',
  ],
};
`;

const ts = header + txt + footer;
// guardas del control de textos del Lote 3: ninguna fecha de la v5.20 fuera de comentarios de bitácora «v5.xx:»
const sinBitacora = ts.split('\n').filter((l) => !/v5\.\d\d:/.test(l)).join('\n');
const restos = [/examen lun 22-feb/, /22-feb/, /D9[0-5][^\n]{0,60}\bfeb\b/].filter((re) => re.test(sinBitacora));
if (restos.length) aborta('quedan textos de la v5.20 en el .ts: ' + restos.join(' · '));
fs.writeFileSync(OUT, ts, 'utf8');
console.log(`OK — escrito ${path.relative(ROOT, OUT)} · ${ts.length} chars · DIAS ${DIAS.length} · DIAS_T2 ${T2.length} · examen ${E} · gonogo ${GONOGO} · D94 ${D94.fecha} · D95 ${D95.fecha} · ritual ${RITUAL.fecha}`);
