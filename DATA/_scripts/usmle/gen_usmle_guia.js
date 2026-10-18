/**
 * gen_usmle_guia.js — genera src/lib/usmleGuia.ts: la GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (D1-D52 + fines de
 * semana), en el formato común `GuiaBloque` de src/lib/guia.ts.
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            → escribe src/lib/usmleGuia.ts (aborta si un bloque no cuadra)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --check    → regenera en memoria y compara con el fichero (exit 1 si difiere)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --informe <ruta.md>  → además escribe la tabla de la semana 1 + el reparto F1
 * Entradas (nada a mano en el .ts):
 *   · las filas REALES de F1 (src/lib/usmleStep1Daily.ts vía cargar_ts.js: fechas, D#, sub, nivelUW, qDia, palm) — este script NO
 *     cambia fechas, D#, hitos ni niveles (v6.02 intacto);
 *   · catálogos verificados el 18-oct-2026: DATA/USMLE/qbankly_bb_step1_videos.tsv (491 vídeos B&B con duración) ·
 *     qbankly_uworld_step1_filtros.tsv (13 Subjects + 169 Systems con nº de preguntas) · qbankly_uworld_step1_matriz.tsv (Subject × System) ·
 *     qbankly_mehlman_step1_sistemas.tsv (respaldo) · qbankly_hitos_step1.tsv (UWSA/NBME: bloques reales) · STUDY_HUB/_scrape/qbankly_libs_full.json;
 *   · el mapeo D# → recursos de guia_catalogo_f1.js (con AVISO visible cuando no es exacto).
 * Reglas de carga (decisión E1 del 18-oct, «vamos despacio, desde cero con el inglés»):
 *   · VELOCIDAD de vídeo: S1 (D1-D5) 1,0× con subtítulos en inglés · S2-S3 (D6-D15) 1,25× · desde S4 (D16) 1,5× — se sube SOLO si el free
 *     recall de 90 s del último vídeo recoge ≥3 ideas; si no, te quedas en la velocidad anterior (el reparto de abajo usa la nominal).
 *     Minutos reales = duración ÷ velocidad × 1,2 (S1) / × 1,15 (después) por las pausas para anotar.
 *   · El vídeo del TEMA NUEVO solo se ve DESPUÉS del pre-test ciego de las 08:15 (deep prime 09:00, máx. 70′ de vídeo real; el resto de la
 *     franja = lectura ≥25′ + ≤10 tarjetas 20′ + free recall 5′). Lo que no cabe NO se recorta: pasa a la COLA y se ve en el «vídeo
 *     pendiente» de las 07:15 del día siguiente (≤30′; en S1 también las 05:00 de mié-vie, ≤30′, porque el mazo aún está casi vacío) o en el
 *     hueco libre de un deep prime posterior. Los vídeos Palmerton «High Yield <sistema>» (visión del sistema, 40′-2 h 45′) entran a la
 *     cola detrás de los B&B y se ven por tramos con su minuto de inicio y fin.
 *   · Nivel 1 (S1): ≤30 preguntas NUEVAS al día sumando todas las franjas; todo en Tutor sin reloj salvo los hitos. Cada subtema: 10Q
 *     el día que se estudia (2 bloques de 5, 11:00) + 5Q a las 07:15 del día siguiente (validación 24 h); gate ≥8/10 y ≥4/5; si falla,
 *     1 bloque extra de 5Q (dentro del tope). Desde S2 rigen nivelUW/qDia del plan (N1 30Q · N2 40Q · N3 40Q).
 *   · Si el System de uWorld no tiene las preguntas pedidas: (1) todas las Unused del System; (2) los Systems hermanos del catálogo;
 *     (3) el mismo subtema en «Mehlman - Step 1 QBank - 2026» (qbankly_mehlman_step1_sistemas.tsv); nunca preguntas fuera del tema.
 *   · Day-After de cada hito (~4 h, Palmerton §9.2): repartido en franjas existentes (18:00 del hito, 07:15 del día siguiente y las 18:00
 *     de los 3-4 días siguientes), sin tocar el subtema de esos días.
 * v6.02c (18-oct-2026, E1): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): lun 19 · los 2 Palmerton de método (FSRS · «The ONLY video») con la regla de minutos de la semana 1
 *   (duración × 1,2 a 1,0×) y repartidos sin recortar (lo que no cabe → cabeza de la cola: D3 05:00) · la preparación del UWSA1 se parte en
 *   07:15-07:25 y 07:55-08:50 (el SYNAPSE de las 07:25 sale una sola vez, en su tarjeta) · capítulos B&B exactamente como en el catálogo (sin «(NEW)»).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily, cargarModuloTS } = require('./cargar_ts');
const { MAPA, PALM, PATHOMA } = require('./guia_catalogo_f1');

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const CHECK = argv.includes('--check');
const INFORME = opt('--informe');
const OUT = path.join(ROOT, 'src', 'lib', 'usmleGuia.ts');
const DU = path.join(ROOT, 'DATA', 'USMLE');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/usmleGuia.ts'); process.exit(1); };

// ── catálogos ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const tsv = (f) => fs.readFileSync(path.join(DU, f), 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
const BB = new Map(); // id → { cap, sec, nombre, s }
for (const [cs, id, nombre, s] of tsv('qbankly_bb_step1_videos.tsv')) { const [cap, sec] = cs.split(' > '); BB.set(Number(id), { cap, sec, nombre, s: Number(s) }); }
const UWS = new Map(); const UWY = new Map();
for (const [t, id, nombre, q] of tsv('qbankly_uworld_step1_filtros.tsv')) (t === 'S' ? UWS : UWY).set(Number(id), { nombre, q: Number(q) });
const MAT = new Map(); // `${s}:${y}` → n
for (const [s, , y, , n] of tsv('qbankly_uworld_step1_matriz.tsv')) MAT.set(`${s}:${y}`, Number(n));
const MH = new Map();
for (const [id, nombre, q] of tsv('qbankly_mehlman_step1_sistemas.tsv')) MH.set(Number(id), { nombre, q: Number(q) });
const LIBJ = JSON.parse(fs.readFileSync(path.join(ROOT, 'STUDY_HUB', '_scrape', 'qbankly_libs_full.json'), 'utf8'));
const HITOS = new Map(); // nombre del QBank → { id, q, bloques: [n por bloque] } (qbankly_hitos_step1.tsv)
for (const [id, nombre, , q, subj] of tsv('qbankly_hitos_step1.tsv')) HITOS.set(nombre, { id: Number(id), q: Number(q), bloques: subj.split(' · ').map((x) => Number(x.trim().split(' ').pop())) });
const LIB = new Map(); // `${e}:${doc}` → nombre
for (const [k, e] of [['epub1', 1], ['epub2', 2], ['epub3', 3]]) for (const s of LIBJ.libs[k] || []) for (const t of s.topics || []) if (t.doc) LIB.set(`${e}:${t.doc}`, t.name.replace(/\s+/g, ' ').trim());

const U = cargarUsmleDaily();
const F1 = U.DIAS; // 52 filas
if (F1.length !== 52 || F1[0].fecha !== '2026-10-19' || F1[51].fecha !== '2026-12-30') aborta('F1 no es la v6.02 esperada (52 filas, lun 19-oct → mié 30-dic)');
const ANKI = (() => { try { return cargarModuloTS(path.join('src', 'lib', 'ankiLinks.ts')); } catch { return null; } })();
const deckDe = (row) => (ANKI ? ANKI.usmleAnkiDeck(row.system, row.matType) : 'APEX::USMLE::General');

// validación del catálogo contra los TSV/índices
for (const [d, m] of Object.entries(MAPA)) {
  for (const id of m.bb) if (!BB.has(id)) aborta(`D${d}: vídeo B&B ${id} no está en el catálogo`);
  for (const id of m.uw) if (!UWY.has(id)) aborta(`D${d}: System uWorld ${id} no existe`);
  for (const id of m.mh || []) if (!MH.has(id)) aborta(`D${d}: System Mehlman ${id} no existe`);
  for (const [e, doc] of m.lib) if (!LIB.has(`${e}:${doc}`)) aborta(`D${d}: Library e=${e} doc=${doc} no existe en el índice`);
  if (m.uwSub) for (const y of m.uwSub[1]) if (!MAT.has(`${m.uwSub[0]}:${y}`)) aborta(`D${d}: celda Subject ${m.uwSub[0]} ∩ System ${y} vacía`);
}

// ── utilidades ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const QBQ = 'https://qbankly.app/qbanks', QBV = 'https://qbankly.app/videos';
const lib = (e, doc) => `https://qbankly.app/library?e=${e}&doc=${doc}`;
const yt = (id, t0) => `https://www.youtube.com/watch?v=${id}${t0 ? `&t=${t0}s` : ''}`;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const hms = (s) => (s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : mmss(s));
const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fd = (iso) => { const d = new Date(iso + 'T12:00:00Z'); return `${DOW[d.getUTCDay()]} ${d.getUTCDate()}-${MES[d.getUTCMonth()]}`; };
const esHito = (r) => /🎯/.test(r.sub);
// v6.02c F2 (E6): el capítulo se escribe EXACTAMENTE como en el catálogo (qbankly_bb_step1_videos.tsv, sin «(NEW)»)
const bbRuta = (id) => { const v = BB.get(id); return `B&B Step 1 › ${v.cap} › ${v.sec} › ${v.nombre}`; };
const uwNom = (id) => `«${UWY.get(id).nombre}» (${UWY.get(id).q})`;
const mhNom = (id) => `«${MH.get(id).nombre}» (${MH.get(id).q})`;
const libNom = (e, doc) => `${e === 1 ? 'uWorld Medical Library' : e === 3 ? 'PassMedicine' : 'AMBOSS'} · «${LIB.get(`${e}:${doc}`)}»`;
/** velocidad nominal y factor de pausas por D# */
const vel = (d) => (d <= 5 ? { v: 1.0, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' } : d <= 15 ? { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN' } : { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (solo si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)' });
const realMin = (s, d) => { const { v, f } = vel(d); return Math.ceil((s / 60 / v) * f); };


// ── índices de filas ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
const IDX = new Map(F1.map((r, i) => [r.d, i]));
const filaD = (d) => F1[IDX.get(d)];
/** k-ésima fila de CONTENIDO anterior (salta hitos) · k = 1 → ayer de contenido */
function contAtras(r, k) { let c = 0; for (let i = IDX.get(r.d) - 1; i >= 0; i--) { if (!esHito(F1[i])) { c++; if (c === k) return F1[i]; } } return null; }
/** ¿r es el n-ésimo día de plan tras un hito NBME de F1 (n = 1..4)? */
function trasHito(r) { for (let n = 1, i = IDX.get(r.d) - 1; i >= 0 && n <= 4; i--, n++) if (esHito(F1[i])) return F1[i].d === 1 ? null : { hito: F1[i], n }; return null; }
const corto = (s, n = 70) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const S1 = (d) => d <= 5;

// ── 1) REPARTO DE VÍDEO (cola) ────────────────────────────────────────────────────────────────────────────────────────────────────
// Capacidad de vídeo real por franja: 05:00 solo en S1 (mié-vie, mazo casi vacío) · 07:15 «vídeo pendiente» ≤30′ (no el día siguiente a
// un hito: Day-After) · deep prime 09:00 ≤70′. El tema NUEVO solo entra a partir del deep prime (después del pre-test ciego).
const CAP = { s0500: (d) => (d >= 3 && d <= 5 ? 30 : 0), s0715: (d) => (d === 2 ? 0 : trasHito(filaD(d))?.n === 1 ? 0 : 30), s0900: () => 70 };
const colaBB = []; const colaPalm = []; // ítems: { tipo, id, ini, fin, dOrig } (ini/fin en segundos del vídeo)
/** v6.02c F2 (E6): Palmerton de MÉTODO adelantados al D1 (lun 19, UWSA1) — FSRS (era del D3) y «The ONLY video» (era del D2) — con la
 *  MISMA regla de minutos que los B&B (duración ÷ 1,0 × 1,2 por las pausas para anotar). Lo que no cabe en las franjas del D1 va a la
 *  cabeza de la cola (delante de los B&B: es lo pendiente más antiguo) y se ve, partido por minutos, en la siguiente franja de vídeo. */
const colaMetodo = [];
const METODO = {
  Te5RnxeG_Gg: { dPlan: 3, como: 'se adelanta a hoy porque FSRS se configura ANTES de la primera tarjeta (era el vídeo del D3, «setup Anki FSRS»): pausa y anota los 8 cambios' },
  BOtQJeFE_rc: { dPlan: 2, como: 'era el vídeo del D2: se adelanta al lun 19 para aliviar el martes (Day-After + lesión celular) · pausa y anota 5 ideas' },
};
const REP = {}; // d → { s0500: [], s0715: [], s0900: [], desborde: [] }
const item = (tipo, id, dOrig) => ({ tipo, id, ini: 0, fin: tipo === 'bb' ? BB.get(id).s : PALM[id].s, dOrig });
const realDe = (it, d) => realMin(it.fin - it.ini, d);
const MIN_TRAMO = 8; // minutos reales mínimos para abrir un tramo (si queda menos, el hueco pasa a lectura/Anki)
/** Coloca `it` (o un tramo desde it.ini) en `libre` minutos reales. Devuelve { puesto, resto } (resto = null si entró entero). */
function colocar(it, d, libre, dest) {
  const m = realDe(it, d);
  if (m <= libre) { dest.push({ ...it, min: m }); return { usado: m, resto: null }; }
  if (libre < MIN_TRAMO) return { usado: 0, resto: it };
  const { v, f } = vel(d);
  const toma = Math.floor(((libre / f) * v * 60) / 60) * 60; // segundos de vídeo, a minuto entero
  if (toma < 60) return { usado: 0, resto: it };
  const mm = realMin(toma, d);
  dest.push({ ...it, fin: it.ini + toma, min: mm });
  return { usado: mm, resto: { ...it, ini: it.ini + toma } };
}
/** Vacía la cola en orden estricto (Palmerton de método pendientes del D1 → B&B pendientes → Palmerton High Yield), partiendo el
 *  vídeo por minutos si no cabe entero. */
function llenarDesdeCola(d, cap, dest, excluirD) {
  let libre = cap;
  for (const cola of [colaMetodo, colaBB, colaPalm]) {
    while (cola.length && libre >= MIN_TRAMO) {
      if (excluirD != null && cola[0].dOrig === excluirD) break; // el desborde de HOY no se ve hoy fuera de orden
      const r = colocar(cola[0], d, libre, dest); libre -= r.usado;
      if (r.resto) { if (r.usado === 0) break; cola[0] = r.resto; } else cola.shift();
    }
  }
  return libre;
}
// D1 (lun 19-oct): 05:00 = mazos 4′ + vídeo FSRS + preset ≥10′ → 31′ de vídeo real · 07:55-08:50 = vídeo(s) + peor escenario 12′ +
// agua/Ziploc 4′ → 39′ de vídeo real (07:15-07:25 = localizar el UWSA1; 07:25-07:55 = SYNAPSE, su propia tarjeta)
const D1REP = { s0500: [], s0755: [] };
const D1CAP = { s0500: 45 - 4 - 10, s0755: 55 - 12 - 4 };
colaMetodo.push(item('palm', 'Te5RnxeG_Gg', 1), item('palm', 'BOtQJeFE_rc', 1));
for (const k of ['s0500', 's0755']) {
  let libre = D1CAP[k];
  while (colaMetodo.length && libre >= MIN_TRAMO) { const r = colocar(colaMetodo[0], 1, libre, D1REP[k]); libre -= r.usado; if (r.resto) { if (r.usado === 0) break; colaMetodo[0] = r.resto; } else colaMetodo.shift(); }
  if (k === 's0500' && !D1REP.s0500.length) aborta('D1 05:00: el vídeo FSRS no entra (ni un tramo) antes del preset');
}
const COLA_METODO_TRAS_D1 = colaMetodo.map((it) => ({ ...it }));
const minCola = (c) => c.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0);
for (const r of F1) {
  if (r.d === 1 || esHito(r)) continue;
  const d = r.d; const m = MAPA[d]; const rep = { s0500: [], s0715: [], s0900: [], desborde: [] }; REP[d] = rep;
  if (CAP.s0500(d)) llenarDesdeCola(d, CAP.s0500(d), rep.s0500);
  if (CAP.s0715(d)) llenarDesdeCola(d, CAP.s0715(d), rep.s0715);
  let libre = CAP.s0900(d); const hoy = m.bb.map((id) => item('bb', id, d)); const pend = [];
  for (const it of hoy) {
    if (pend.length) { pend.push(it); continue; }
    const r2 = colocar(it, d, libre, rep.s0900); libre -= r2.usado;
    if (r2.resto) pend.push(r2.resto);
  }
  rep.desborde = pend.map((x) => ({ ...x })); colaBB.push(...pend);
  if (r.palm && d > 3 && PALM[r.palm.id]) colaPalm.push(item('palm', r.palm.id, d)); // D2/D3: sus Palmerton se adelantan al lun 19 (D1)
  if (libre >= MIN_TRAMO) llenarDesdeCola(d, libre, rep.s0900, d);
  rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) };
}
const COLA_FINAL = { bb: colaBB.map((it) => ({ ...it })), palm: [...colaMetodo, ...colaPalm].map((it) => ({ ...it })) };
/** Dónde cae cada tramo de vídeo (para avisar «pasa a …»). */
const DONDE = []; // { d, slot, it }
for (const [d, rep] of Object.entries(REP)) for (const slot of ['s0500', 's0715', 's0900']) for (const it of rep[slot]) DONDE.push({ d: Number(d), slot, it });
const SLOT_TXT = { s0500: '05:00', s0715: '07:15', s0900: '09:00' };
function destinoDe(it) {
  const xs = DONDE.filter((x) => x.it.tipo === it.tipo && x.it.id === it.id && x.it.dOrig === it.dOrig && x.it.fin > it.ini && x.it.ini < it.fin);
  return xs.length ? xs.map((x) => `D${x.d} ${fd(filaD(x.d).fecha)} ${SLOT_TXT[x.slot]}`).join(' + ') : 'TRAMO 2 (T3 jue 18-mar, cuando sigue Heme/Onco)';
}

// ── 2) PREGUNTAS uWorld (estimación: lo que este plan consume de cada System) ───────────────────────────────────────────────────────
const POOL = new Map([...UWY].map(([id, v]) => [id, v.q]));
const organoDe = (id) => UWY.get(id).nombre.replace(/ \([^()]*\)$/, '');
const sistemasOrgano = (id) => [...UWY.keys()].filter((x) => organoDe(x) === organoDe(id));
const disp = (ids) => ids.reduce((a, id) => a + (POOL.get(id) || 0), 0);
function tomar(ids, n) { let falta = n; for (const id of ids) { if (falta <= 0) break; const t = Math.min(POOL.get(id) || 0, falta); POOL.set(id, (POOL.get(id) || 0) - t); falta -= t; } return n - falta; }
const vistos = []; // Systems de uWorld de los días de contenido ya hechos (orden de aparición)
const VISTOS_ANTES = {}; // d → Systems vistos ANTES de ese día (para la eval de las 18:00, que incluye el de hoy)
const QS = {}; // d → { val, pre, con, ev, dispAntes, deficit }
const uwDe = (d) => (MAPA[d] ? MAPA[d].uw : []);
function sistemasSoFar(r) { // Systems del mismo sistema del plan hasta hoy (hoy primero, luego hacia atrás)
  const out = [...uwDe(r.d)];
  for (let i = IDX.get(r.d) - 1; i >= 0; i--) { const x = F1[i]; if (esHito(x)) continue; if (x.system !== r.system) break; for (const id of uwDe(x.d)) if (!out.includes(id)) out.push(id); }
  return out;
}
for (const r of F1) {
  if (r.d === 1 || esHito(r)) continue;
  const d = r.d; const hoy = uwDe(d); const q = { val: 0, pre: 0, con: 0, ev: 0, dispAntes: disp(hoy), deficit: 0 };
  const th = trasHito(r); const prev = contAtras(r, 1);
  VISTOS_ANTES[d] = [...vistos];
  if (d === 2) { q.pre = tomar(hoy, 8); }
  else if (d === 3) { q.pre = tomar(hoy, 10); }
  else if (d === 4) { q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([1112, 1072, 1004], 5); }
  else if (d === 5) { q.val = tomar([1004], 5); q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([...vistos].sort((a, b) => POOL.get(b) - POOL.get(a)), 5); }
  else {
    if (prev && !(th && th.n === 1)) q.val = tomar(uwDe(prev.d), 5);
    const necesita = 10 + (r.nivelUW === 1 ? 20 : r.nivelUW === 3 ? 10 : 0);
    q.deficit = Math.max(0, necesita - q.dispAntes);
    q.pre = tomar(hoy, 10);
    if (r.nivelUW === 1) q.con = tomar(hoy, 20);
    else if (r.nivelUW === 2) q.con = tomar(prev ? uwDe(prev.d) : [], 5) + tomar(sistemasSoFar(r), 25);
    else q.con = tomar(sistemasOrgano(hoy[0]).filter((x) => !hoy.includes(x)).concat(hoy), 20) + tomar(hoy, 10);
    const evN = th && th.n <= 3 ? 0 : 10;
    if (evN) q.ev = tomar([...vistos, ...hoy.filter((x) => !vistos.includes(x))].sort((a, b) => POOL.get(b) - POOL.get(a)), evN);
  }
  QS[d] = q;
  for (const id of hoy) if (!vistos.includes(id)) vistos.push(id);
}

// ── 3) CONSTRUCTORES de bloques ─────────────────────────────────────────────────────────────────────────────────────────────────
const aMin = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const minF = (fr) => { const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(fr); return m ? aMin(m[2]) - aMin(m[1]) : NaN; };
const ERR = [];
function dedupe(rs) { const seen = new Set(); return rs.filter((r) => { const k = r.t + '|' + r.url; if (seen.has(k)) return false; seen.add(k); return true; }); }
function B(fecha, franja, titulo, pasos, recursos, hecho, extra = {}) {
  const total = minF(franja); const suma = pasos.reduce((a, p) => a + p.min, 0);
  if (suma !== total) ERR.push(`${fecha} ${franja} «${titulo}»: Σ pasos ${suma} ≠ ${total}`);
  for (const p of pasos) if (!Number.isInteger(p.min) || p.min < 1) ERR.push(`${fecha} ${franja}: paso con min ${p.min}`);
  const g = { franja, plan: 'usmle', titulo, totalMin: total, pasos, recursos: dedupe(recursos), hecho };
  if (extra.planB) g.planB = extra.planB;
  if (extra.aviso) g.aviso = extra.aviso;
  return g;
}
const P = (min, que, como, enlace) => (enlace ? { min, que, como, enlace } : { min, que, como });
const TUTOR = 'Tutor (sin reloj)', TIMED = 'Timed (90 s/Q · tope 2 min)';
const tcUW = (ids, n, modo) => `QBanks › «uWorld - USMLE Step 1» (ACTIVE QBANK) › New Test → System${ids.length > 1 ? 's' : ''} ${ids.map(uwNom).join(' + ')} · Subjects: todos · Status: Unused · ${n} preguntas · Order: por defecto · ${modo} → BEGIN TEST`;
const tcMH = (ids, n, modo) => `QBanks › «Mehlman - Step 1 QBank - 2026» (ACTIVE QBANK) › New Test → System${ids.length > 1 ? 's' : ''} ${ids.map(mhNom).join(' + ')} · Status: Unused · ${n} preguntas · ${modo} → BEGIN TEST`;
const L_UW = { t: 'Qbankly › QBanks', url: QBQ };
const R_UW = { t: 'Qbankly › QBanks (Test Composer)', url: QBQ };
const R_VID = { t: 'Qbankly › Video Library (B&B Step 1)', url: QBV };
const R_ANKI = { t: 'AnkiWeb (solo si el escritorio falla)', url: 'https://ankiweb.net/decks' };
const respaldo = (d, n) => (MAPA[d] && MAPA[d].mh && MAPA[d].mh.length
  ? `Si el composer muestra < ${n} Unused en esos Systems: haz las que haya y completa con Mehlman (QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank) → ${MAPA[d].mh.map(mhNom).join(' + ')}, mismo modo; después vuelve a uWorld. Nunca preguntas de otro tema.`
  : 'Si no hay Unused suficientes: las que haya + Status Incorrect del mismo System; nunca preguntas de otro tema.');

function pasosVideo(d, arr) {
  return arr.map((it) => {
    const vv = vel(d);
    if (it.tipo === 'bb') {
      const v = BB.get(it.id); const entero = it.ini === 0 && it.fin === v.s;
      const tramo = entero ? `(${mmss(v.s)})` : `de ${mmss(it.ini)} a ${mmss(it.fin)} (dura ${mmss(v.s)}; Qbankly guarda el minuto)`;
      return P(it.min, `${bbRuta(it.id)} ${tramo}`, `${vv.txt}${it.dOrig !== d ? ` · PENDIENTE del D${it.dOrig}` : ''} · pausa y anota cada idea en 1 línea (patogenia → presentación)`, { t: 'Video Library (B&B Step 1)', url: QBV });
    }
    const p = PALM[it.id];
    const entero = it.ini === 0 && it.fin === p.s;
    const tramo = entero ? `(${hms(p.s)})` : `de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`;
    const coma = (x) => (Number.isInteger(x) ? `${x},0` : String(x).replace('.', ','));
    const minTxt = `${it.min}′ = ${Math.round((it.fin - it.ini) / 60)} min de vídeo ÷ ${coma(vv.v)} × ${coma(vv.f)} por las pausas`;
    const sigue = it.ini ? (it.dOrig !== d ? ` · PENDIENTE del D${it.dOrig}: sigue desde el minuto ${hms(it.ini)}` : ` · sigue desde el minuto ${hms(it.ini)} (lo empezaste antes, hoy)`) : '';
    if (METODO[it.id]) return P(it.min, `Palmerton · «${p.t}» ${tramo}`, `YouTube · ${vv.txt}${sigue} · ${METODO[it.id].como} · ${minTxt}`, { t: it.ini ? 'YouTube (desde ese minuto)' : 'YouTube', url: yt(it.id, it.ini) });
    return P(it.min, `Palmerton · «${p.t}» de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`, `YouTube a ${String(vv.v).replace('.', ',')}× con subtítulos · visión del sistema (D${it.dOrig}): escucha y anota 3 ideas; sin tarjetas`, { t: 'YouTube (desde ese minuto)', url: yt(it.id, it.ini) });
  });
}
const recVideo = (arr) => arr.map((it) => (it.tipo === 'bb' ? { t: bbRuta(it.id), url: QBV, min: Math.round(BB.get(it.id).s / 60) } : { t: `Palmerton · ${PALM[it.id].t}`, url: yt(it.id, it.ini), min: Math.round(PALM[it.id].s / 60) }));
const libTxt = (d, n) => MAPA[d].lib.slice(0, n).map(([e, doc]) => libNom(e, doc)).join(' + ');
const recLib = (d) => MAPA[d].lib.map(([e, doc], i) => ({ t: `${libNom(e, doc)}${i < 2 ? '' : ' (si sobra tiempo)'}`, url: lib(e, doc) }));
const pathomaTxt = (d) => (MAPA[d].pathoma ? ` · Pathoma ${MAPA[d].pathoma.map((c) => `cap. ${c} (${PATHOMA[c]})`).join(' + ')} SOLO si tienes cuenta` : '');

// ANKI 05:00
function anki0500(r) {
  const d = r.d; const f = r.fecha; const rep = REP[d];
  if (S1(d) && rep && rep.s0500.length) {
    const vids = pasosVideo(d, rep.s0500); const V = vids.reduce((a, p) => a + p.min, 0);
    return B(f, '05:00–05:45', 'ANKI AM (mazo casi vacío) + vídeo pendiente', [
      P(10, 'Anki: TODAS las vencidas de APEX::USMLE (tarjetas de mecanismo y PC cards de los días anteriores)', 'Sync → APEX::USMLE › Study Now · reviews first · Good ≈90 % / Again solo olvido real · sin Hard/Easy · nuevas: las de ayer (preset 20/día).'),
      ...vids,
      P(45 - 10 - V, 'Free recall de lo que acabas de ver + resto de Anki', 'Sin mirar: 90 s por vídeo, escribe la cadena causal; si quedan vencidas, termínalas.'),
    ], [...recVideo(rep.s0500), R_ANKI], '0 vencidas en APEX::USMLE + el vídeo pendiente visto y resumido', { planB: 'Si Anki pide más de 15′, el vídeo pasa a las 07:15 (Anki primero, siempre).' });
  }
  return B(f, '05:00–05:45', 'ANKI AM · cola FSRS de APEX::USMLE', [
    P(3, 'Sync + APEX::USMLE (mazo padre) › Study Now', 'Anki escritorio. Si hay > 200 vencidas: hoy nuevas = 0 (backlog, Palmerton §4.10).'),
    P(37, 'TODAS las vencidas (reviews first) · tope 200', 'Responde en voz alta antes de girar · Good si recordaste (≈90 %) · Again solo si olvidaste de verdad · sin Hard/Easy.'),
    P(4, 'Nuevas: las que creaste ayer (≤10 de mecanismo + PC cards; preset 20/día)', 'Solo si terminaste las vencidas; si no, nuevas = 0.'),
    P(1, 'Telemetría', 'node DATA/_scripts/anki_telemetria.js (vencidas, backlog, retención).'),
  ], [R_ANKI], '0 vencidas en APEX::USMLE (o tope de 200) y la telemetría registrada', { planB: 'Anki escritorio no abre → AnkiWeb/AnkiDroid solo para repasar; nunca «Forget» ni resetear el mazo.' });
}

// REPASO 07:15 (genérico D6+)
function repaso0715(r) {
  const d = r.d; const f = r.fecha; const prev = contAtras(r, 1); const rep = REP[d]; const d3 = contAtras(r, 3); const d7 = contAtras(r, 7);
  const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0);
  const pasos = [
    P(10, `Shopping list + free recall de AYER: «${corto(prev.sub, 80)}» (D${prev.d})`, 'Lee tus notas de 📏 Medición de ayer; después, SIN mirar, escribe en 90 s la cadena causal del subtema y marca lo que no salió.'),
    P(10, '5Q TIMED del subtema de ayer (validación 24-48 h · 1.ª mitad del gate de 10Q)', tcUW(uwDe(prev.d), 5, TIMED), L_UW),
    ...vids,
  ];
  const resto = 60 - 20 - V;
  const dd = [d3 && ['D-3', d3], d7 && ['D-7', d7]].filter(Boolean);
  if (resto > 0) pasos.push(P(resto, `${dd.map((x) => x[0]).join(' / ')}: free recall de ${dd.map((x) => `«${corto(x[1].sub, 50)}» (D${x[1].d})`).join(' y ')} + Anki restante`, 'Sin mirar: 3 ideas de cada uno; lo que salga < 60 % → busca sus tarjetas y márcalas Again. Si quedaron vencidas a las 05:00, termínalas aquí.'));
  return B(f, '07:15–08:15', `REPASO ANCLADO · validación del D${prev.d}${V ? ' + vídeo pendiente' : ''}`, pasos, [R_UW, ...recVideo(rep.s0715)], '5Q hechas (≥4/5 → subtema de ayer validado; <4/5 → 5Q más de ese System en la consolidación) y el free recall escrito', { planB: respaldo(prev.d, 5) });
}

// PRE-TEST 08:15 (genérico D6+)
function pretest(r) {
  const d = r.d; const q = QS[d]; const hoy = uwDe(d);
  return B(r.fecha, '08:15–09:00', `PRE-TEST · 10Q ciegas · ${corto(r.sub, 60)}`, [
    P(3, `Armar: ${hoy.map(uwNom).join(' + ')}`, tcUW(hoy, 10, TUTOR), L_UW),
    P(30, '10Q ciegas del tema NUEVO (sin haber visto nada de hoy)', 'SAQ (pregunta autónoma) antes de mirar las opciones + CCSN; después lee la explicación entera (~3′ por pregunta).'),
    P(12, 'Free recall 90 s + shopping list', 'Escribe sin mirar lo que ya sabes del tema; cada duda, también en los aciertos, a la shopping list de 📏 Medición (pre-test /10).'),
  ], [R_UW], 'nota /10 en 📏 Medición (40-60 % es normal: es diagnóstico, no gate)', { planB: respaldo(d, 10), aviso: q.deficit ? `Según este plan, a estos Systems de uWorld les quedan ~${q.dispAntes} Unused antes de hoy y el día pide ${q.dispAntes + q.deficit} (pre-test + consolidación): cuando el composer se quede corto, usa el respaldo de abajo (Mehlman).` : undefined });
}

// DEEP PRIME 09:00
function deepPrime(r) {
  const d = r.d; const m = MAPA[d]; const rep = REP[d];
  const vids = pasosVideo(d, rep.s0900); const V = vids.reduce((a, p) => a + p.min, 0);
  const L = 95 - V; const nDocs = Math.min(m.lib.length, L >= 45 ? 4 : L >= 35 ? 3 : 2);
  const pasos = [
    ...vids,
    P(L, `Lectura activa: ${libTxt(d, nDocs)} + First Aid 2026 › ${m.fa}${pathomaTxt(d)}`, `Whole Page Rule: la sección completa, no solo el dato; 3-5 puntos high-yield a mano + 1 esquema.${m.lib.length > nDocs ? ` Si sobra tiempo: ${m.lib.slice(nDocs).map(([e, doc]) => libNom(e, doc)).join(' · ')}.` : ''}`, { t: libNom(m.lib[0][0], m.lib[0][1]).replace(/^[^·]*· /, ''), url: lib(m.lib[0][0], m.lib[0][1]) }),
    P(20, `≤10 tarjetas de MECANISMO en ${deckDe(r)}`, 'REGLA DEL FRENTE: anverso tuyo, en inglés, sujeto primero, sin cloze ni pistas; reverso = patogenia → presentación. Dilo en voz alta antes de escribirla.'),
    P(5, 'Free recall final (sin mirar)', 'Dibuja la cadena causal del día en 1 hoja; compárala con tus notas y corrige en rojo.'),
  ];
  const avisos = [];
  if (m.nota) avisos.push(m.nota);
  if (rep.desborde.length) avisos.push(`A ${vel(d).txt.split(' (')[0]} no cabe todo en 70′ de vídeo: ${rep.desborde.map((it) => `${it.tipo === 'bb' ? BB.get(it.id).nombre : PALM[it.id].t}${it.ini ? ` (desde ${mmss(it.ini)})` : ''} → ${destinoDe(it)}`).join(' · ')}. No se recorta: se ve en esas franjas.`);
  if (r.palm && d > 3) { const it = { tipo: 'palm', id: r.palm.id, ini: 0, fin: PALM[r.palm.id].s, dOrig: d }; avisos.push(`Palmerton «${PALM[r.palm.id].t}» (${hms(PALM[r.palm.id].s)}, visión del sistema) entra a la cola detrás de los B&B → ${destinoDe(it)}.`); }
  return B(r.fecha, '09:00–11:00', `DEEP PRIME · ${corto(r.sub, 70)}`, pasos, [R_VID, ...recVideo(rep.s0900), ...recLib(d)], `vídeo(s) de arriba vistos, lectura con 3-5 puntos a mano y ≤10 tarjetas creadas en ${deckDe(r)}`, { planB: 'Qbankly caído → misma sección en First Aid (libro) y la lectura de la Library cuando vuelva. Pathoma: sin cuenta en el repo (pathoma.com: Free = 6 vídeos de prueba 1 mes; Pro desde US$84,95 con libro en papel, sin PDF) → la Library lo cubre.', aviso: avisos.join(' ') || undefined });
}

// CONSOLIDACIÓN 11:00 por nivel (genérico D6+)
function consolidacion(r) {
  const d = r.d; const hoy = uwDe(d); const prev = contAtras(r, 1); const n = r.nivelUW; const m = MAPA[d];
  const sub = m.uwSub ? ` · si se acaban: Subject «${UWS.get(m.uwSub[0]).nombre}» ∩ ${m.uwSub[1].map(uwNom).join(' + ')} = ${m.uwSub[1].reduce((a, y) => a + MAT.get(`${m.uwSub[0]}:${y}`), 0)}Q (matriz real del composer)` : '';
  let pasos; let titulo;
  if (n === 1) {
    titulo = 'CONSOLIDACIÓN · nivel 1 · 20Q Tutor del subtema';
    pasos = [
      P(2, 'Armar bloques de 5Q', tcUW(hoy, 5, TUTOR) + sub, L_UW),
      P(40, '4 bloques de 5Q en Tutor (20Q)', '≈2′ por pregunta + su explicación; corrige cada bloque antes del siguiente.'),
      P(15, 'Revisión: Educational Objective + shopping list + log de errores', 'Cada fallo: knowledge / transfer / proceso → 📏 Medición (consolidación %).'),
      P(3, 'Gate del día', '≥80 % en 10 consecutivas → validado (mañana 07:15: 5Q timed) · <80 % → mañana a las 07:15 repites 5Q del subtema; NO avances de nivel.'),
    ];
  } else if (n === 2) {
    titulo = 'CONSOLIDACIÓN · nivel 2 · 30Q TIMED en bloques de 5';
    const sf = sistemasSoFar(r);
    pasos = [
      P(2, 'Armar bloques de 5Q TIMED', `${tcUW(sf, 5, TIMED)} · el 1.er bloque = 5Q de ayer (${uwDe(prev.d).map(uwNom).join(' + ')}) = 2.ª mitad del gate${sub}`, L_UW),
      P(45, '6 bloques de 5Q TIMED (30Q)', 'Cronómetro 2:00 por pregunta (si suena: adivina, flag, sigue) · cover-the-options · juez, no abogado.'),
      P(11, 'Revisión de las incorrectas: Educational Objective + log', 'knowledge / transfer / proceso → 📏 Medición; las correctas con duda también.'),
      P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥80 % → mañana sube el subtema · <80 % → mañana a las 07:15 repites 5Q del subtema fallado.'),
    ];
  } else {
    titulo = 'CONSOLIDACIÓN · nivel 3 · 20Q del SISTEMA timed + 10Q Tutor';
    const org = sistemasOrgano(hoy[0]);
    pasos = [
      P(2, 'Armar el test en el Test Composer', `20Q: QBanks › «uWorld - USMLE Step 1» › New Test → Systems: TODOS los de «${organoDe(hoy[0])}» (${org.length} Systems) · Subjects todos · Status Unused · 20 · Timed → BEGIN · luego 10Q: ${hoy.map(uwNom).join(' + ')} · Tutor`, L_UW),
      P(30, '20Q del sistema completo TIMED (sin saber el subtema)', 'Cronómetro 2:00 por pregunta; flag y sigue.'),
      P(20, '10Q Tutor del subtema de hoy', 'Con explicación; cada fallo a la shopping list.'),
      P(6, 'Revisión de las incorrectas del bloque timed', 'Educational Objective + tipo de error en 📏 Medición.'),
      P(2, 'Gate N3', '≥80 % en las 20Q timed del sistema → el sistema queda «vivo» · <80 % → al colchón del tramo 2 (sistema débil).'),
    ];
  }
  return B(r.fecha, '11:00–12:00', titulo, pasos, [R_UW], `${n === 1 ? '20Q' : n === 2 ? '30Q timed' : '30Q (20 timed + 10 tutor)'} hechas, % y tipo de error en 📏 Medición y el gate marcado ✓/✗`, { planB: respaldo(d, n === 1 ? 20 : 30) });
}

// EVAL 18:00 (genérico)
function pasosEval(r, comprimido) {
  const ids = [...(VISTOS_ANTES[r.d] || []), ...uwDe(r.d).filter((x) => !(VISTOS_ANTES[r.d] || []).includes(x))];
  const txtSis = `los ${ids.length} Systems ya vistos (los de hoy: ${uwDe(r.d).map((id) => `«${UWY.get(id).nombre}»`).join(', ')}; más los de los días anteriores de F1)`;
  if (comprimido) return [
    P(1, 'Armar 10Q mixtas TIMED', `QBanks › uWorld › New Test → Systems: ${txtSis} · Status Unused · 10 · Timed`, L_UW),
    P(15, '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · sin cambiar respuestas salvo error de lectura.'),
    P(12, 'Corrección + 1 tarjeta APEX por error', 'Educational Objective · tipo de error.'),
    P(2, 'Registrar eval % + horas netas del día', '📏 Medición.'),
  ];
  return [
    P(2, 'Armar 10Q mixtas TIMED de lo ya visto', `QBanks › uWorld › New Test → Systems: ${txtSis} · Subjects todos · Status Unused · 10 · Timed`, L_UW),
    P(15, '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · juez, no abogado · cuenta las respuestas cambiadas y las relecturas.'),
    P(23, 'Corrección: Educational Objective + tipo de error + 1 tarjeta APEX por error', 'knowledge / transfer / proceso; las de duda en aciertos también.'),
    P(5, 'Registrar en 📏 Medición', 'eval % · horas netas de Step 1 del día (GO/NO-GO por horas) · cambiadas · relecturas.'),
  ];
}
function eval18(r) {
  const th = trasHito(r);
  if (th && th.n <= 4) return dayAfter18(r, th);
  return B(r.fecha, '18:00–18:45', 'EVALUACIÓN ACUMULATIVA · 10Q mixtas timed (dosis de nivel 4)', pasosEval(r), [R_UW], 'eval % + horas netas del día en 📏 Medición', { planB: 'Si no quedan Unused en esos Systems: Status Incorrect de los mismos (re-test).' });
}
// DAY-AFTER de los NBME de F1 (D10 · D25 · D40): hito 18:00 + n=1 07:15 + n=1..4 18:00
const DRILL = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10] };
const nomHito = (h) => h.uw.replace('NBME CBS Form', 'NBME');
function dayAfter18(r, th) {
  const nom = nomHito(th.hito); const dr = DRILL[th.n];
  const pasos = [P(dr.length * 15, `Drill de cronología del ${nom}: pregunta${dr.length > 1 ? 's' : ''} ${dr.join(', ')} de 10 (las falladas más largas y con más labs)`, '15′ cada una: reescribe A MANO el caso en orden cronológico estricto y en presente → 1 PC card por pregunta en APEX::USMLE.')];
  if (th.n === 4) pasos.push(...pasosEval(r, true));
  return B(r.fecha, '18:00–18:45', `DAY-AFTER ${nom} · ${th.n + 2}/6 — drill de cronología${th.n === 4 ? ' + eval 10Q' : ''}`, pasos, [R_UW], th.n === 4 ? '10/10 PC cards del drill y la eval de 10Q registrada' : `${dr.length} PC cards más`, { aviso: th.n === 1 ? `Day-After del ${nom} (Palmerton §9.2, ~4 h) repartido: 18:00 del hito (registro + trayectoria + auditoría) · 07:15 de hoy (triaje + gráficos) · 18:00 de hoy y de los 3 días siguientes (10 drills). La eval de 10Q vuelve el 4.º día; el subtema de cada día NO cambia.` : undefined });
}
function dayAfter0715(r, th) {
  const nom = nomHito(th.hito);
  return B(r.fecha, '07:15–08:15', `DAY-AFTER ${nom} · 2/6 — triaje + gráficos`, [
    P(45, `Triaje de las incorrectas del ${nom} (bloques 1-4 en orden)`, '1′ por pregunta: Educational Objective → K (no lo sabía) o QI (lo sabía y leí/interpreté mal). Lo que no entre en 45′ se queda sin triar: el NBME es un mapa (regla de oro).'),
    P(15, 'Ítems experimentales / gráficos → 2-3 tarjetas de «diseño del experimento»', 'Qué se manipuló, qué se midió, qué predice el resultado.'),
  ], [R_UW], 'incorrectas etiquetadas K/QI y 2-3 tarjetas de experimento', { aviso: 'Hoy a las 07:15 no hay validación de 5Q ni vídeo pendiente (Day-After). El subtema de hoy sigue igual desde las 08:15.' });
}

// HITOS NBME (D10 · D25 · D40 · D52)
function hitoNBME(r) {
  const f = r.fecha; const form = Number((/Form (\d+)/.exec(r.uw) || [])[1]);
  const fila = HITOS.get(`Self-Assessment - Form ${form}`); const bloques = fila ? fila.bloques : null;
  if (!bloques) aborta(`D${r.d}: forma NBME desconocida (${r.uw})`);
  const nom = `Self-Assessment - Form ${form}`;
  return [anki0500(r),
    B(f, '07:00–12:30', `HITO · NBME ${form} — 4 bloques de ${bloques.join('/')}Q (Timed)`, [
      P(3, 'Armar el bloque 1', `QBanks › NBME - Comprehensive Basic Science (Step 1) › «${nom}» (${bloques.reduce((a, b) => a + b, 0)}Q) › Select QBank › New Test → Subject «Block 1» (${bloques[0]}) · System All Systems · Status Unused · ${bloques[0]} · Timed → BEGIN TEST`, L_UW),
      P(75, `Bloque 1 · ${bloques[0]}Q · 75′ (ritmo NBME: 90 s/Q)`, 'Kit anti-pánico: tope 2 min · flag y sigue · sin cambiar respuestas salvo error de lectura.'),
      P(75, `Bloque 2 · ${bloques[1]}Q · 75′ (seguido)`, 'Sit-in 10-15 s en la silla → New Test «Block 2».'),
      P(12, 'Pausa fuera de la silla', 'Ziploc BREAK 1, agua, baño; no revises nada.'),
      P(75, `Bloque 3 · ${bloques[2]}Q · 75′`, 'New Test «Block 3».'),
      P(15, 'Pausa fuera de la silla', 'Ziploc BREAK 2.'),
      P(75, `Bloque 4 · ${bloques[3]}Q · 75′`, 'New Test «Block 4». Al terminar: % total y por bloque.'),
    ], [{ t: `Qbankly › QBanks › NBME › ${nom}`, url: QBQ, cantidad: `${bloques.reduce((a, b) => a + b, 0)}Q` }], '4 bloques terminados y el % total + por bloque en 📏 Medición', { aviso: `El NBME (plan v6.02: 07:00-12:30) sustituye a las franjas 07:15 · 08:15 · 09:00 · 11:00 de hoy y pisa el almuerzo 12:00-12:30: almuerzo 12:30-13:00 y SYNAPSE 13:00-13:30 (en el hueco del libro + holgura).${r.d === 52 ? ' Es la última sesión de F1: su Day-After (~4 h) no tiene franja en F1 (jue 31-dic = SKIP) → ⚠ DECISIÓN DE JOSEPH (propuesta: sáb 2-ene 07:00-11:00, o repartido en los «STEP 1 VIVO» de los sábados de enero).' : ''}`, planB: 'Qbankly caído: espera 10 min (un bloque no empezado no se pierde); si sigue, el NBME pasa a la tarde por bloques y lo decide Joseph (el hito no cambia de día sin su OK).' }),
    B(f, '18:00–18:45', `DAY-AFTER NBME ${form} · 1/6 — registro + trayectoria + auditoría`, [
      P(5, 'Registrar en 📏 Medición: % total, % de los 4 bloques, horas netas', 'Step 1 → 📋 HOY → 📏 Medición.'),
      P(15, 'Trayectoria: curva del % frente a los hitos previos y al mínimo on-track', '¿Subieron los sistemas estudiados en las últimas 2 semanas?'),
      P(15, 'Auditoría de honestidad por escrito', '«Si sigo haciendo lo mismo 6 meses, ¿qué resultado tendría?» + 3 decisiones concretas.'),
      P(10, 'Informe por sistema (Palmerton §9.1)', 'Copia el % por sistema (Qbankly › Test History / Reports); exige ≥80 % en lo ya estudiado.'),
    ], [R_UW], 'medición, trayectoria, auditoría e informe por sistema escritos')];
}

// ── S1 · semana 1 (lun 19 → vie 23) a mano (vídeos: del reparto de arriba) ─────────────────────────────────────────────────────
function semana1(r) {
  const d = r.d; const f = r.fecha; const rep = REP[d];
  if (d === 1) {
    // v6.02c F2 (E6): los 2 Palmerton de método con la regla de minutos de la semana 1 (duración × 1,2 a 1,0×), del reparto D1REP;
    // lo que no cabe pasa a la cola (aviso con su destino). El SYNAPSE de las 07:25 tiene su propia tarjeta: aquí no se repite.
    const v05 = pasosVideo(1, D1REP.s0500); const V05 = v05.reduce((a, p) => a + p.min, 0);
    const v07 = pasosVideo(1, D1REP.s0755); const V07 = v07.reduce((a, p) => a + p.min, 0);
    const resto05 = D1REP.s0500.some((it) => it.id === 'Te5RnxeG_Gg' && it.fin < PALM.Te5RnxeG_Gg.s);
    const pend = COLA_METODO_TRAS_D1.map((it) => `«${PALM[it.id].t.split(' (en la app')[0]}» de ${hms(it.ini)} a ${hms(it.fin)} → ${destinoDe(it)}`);
    const recPalm = (id) => ({ t: `Palmerton · ${id === 'Te5RnxeG_Gg' ? 'Anki + FSRS' : 'The ONLY video (Step 1 2026)'} (YouTube)`, url: yt(id), min: Math.round(PALM[id].s / 60) });
    return [
    B(f, '05:00–05:45', 'ANKI · CONFIGURACIÓN (el mazo está vacío): mazos + FSRS', [
      P(4, 'Crear/confirmar los mazos APEX::USMLE::General · APEX::USMLE::Immunology · APEX::USMLE::Pharmacology', 'Anki escritorio › Create Deck con esos nombres exactos (los de cada sistema se crean el día que empiezan) · Sync.'),
      ...v05,
      P(45 - 4 - V05, 'Preset «APEX USMLE» aplicado a los 3 mazos (Deck Options)', `FSRS = ON · Desired retention 0,90 · learning steps por defecto (no tocar) · New cards/day 20 · Maximum reviews/day 200 · reviews antes que nuevas · Preferences › Next day starts at 4. Después: node DATA/_scripts/anki_telemetria.js (con Anki abierto).${resto05 ? ' El final del vídeo se ve a las 07:55: si cambia algo de esto, ajústalo mañana a las 05:00 (el mazo sigue vacío).' : ''}`),
    ], [recPalm('Te5RnxeG_Gg'), { t: 'AnkiWeb', url: 'https://ankiweb.net/decks' }], 'preset FSRS 0,90 · 20 nuevas/día · 200 revisiones/día activo en los 3 mazos y la telemetría con 0 tarjetas registrada', { planB: 'Si Anki escritorio no abre: crea los mazos en AnkiWeb hoy y aplica el preset FSRS mañana a las 05:00 (el mazo sigue vacío).' }),
    B(f, '07:15–07:25', 'PREPARACIÓN DEL HITO 1/2 · localizar el UWSA1 (hoy no hay tema nuevo ni «ayer»)', [
      P(10, 'Localizar el UWSA1 SIN empezarlo', 'Qbankly › QBanks › USMLE High Yield › «uWorld - Step 1 Self Assessment Simulation 1» (160Q · 4 h) › Details (Subjects: Block - #1 … Block - #4 = 40Q cada uno) › Select QBank (queda como ACTIVE QBANK). No pulses BEGIN.', L_UW),
    ], [R_UW], 'UWSA1 como ACTIVE QBANK (sin empezar)', { aviso: 'Hoy el bloque USMLE va de 07:15 a 13:00: el UWSA1 son 4 h netas (4 × 40Q × 90 s) y con la pausa no cabe en 09:00-13:00 → empieza a las 08:50. 07:25-07:55 = SYNAPSE (su propia tarjeta del Home; no se repite aquí) · 07:55-08:50 = 2/2 de la preparación · ALMUERZO 13:00-13:30 (en vez del libro + holgura) · Derma 13:30 sin cambio.' }),
    B(f, '07:55–08:50', 'PREPARACIÓN DEL HITO 2/2 · vídeo de método + peor escenario', [
      ...v07,
      P(55 - 4 - V07, 'Worst-Case Scenario Planning por escrito + kit anti-pánico', 'Escribe el peor escenario del UWSA1 y qué harías (Palmerton §7.6; Readiness → «Plan B / peor escenario»); lee los 7 pasos del 🧯 kit (Cola de hoy).'),
      P(4, 'Agua, baño, Ziploc «BREAK 1», móvil fuera', 'A las 08:49: New Test → Subject «Block - #1» (40) → System All → Status Unused → 40 → Timed, con el dedo en BEGIN TEST.'),
    ], [recPalm('BOtQJeFE_rc'), recPalm('Te5RnxeG_Gg')], 'tramos de vídeo vistos con sus notas, peor escenario escrito y el kit anti-pánico leído', { aviso: `Vídeos con la regla de la semana 1 (minutos = duración × 1,2 a 1,0× por las pausas para anotar), sin recortar: ${pend.length ? `lo que no cabe hoy pasa a la cola, delante de los B&B: ${pend.join(' · ')}.` : 'hoy caben enteros.'}` }),
    B(f, '08:50–13:00', 'HITO · UWSA1 BASELINE — 160Q en 4 bloques de 40 (Timed)', [
      P(60, 'Bloque 1 · 40Q · 60′', 'Subject «Block - #1» · Timed. Tope 2 min por pregunta: adivina, flag y sigue; no cambies respuestas salvo error de lectura.', L_UW),
      P(60, 'Bloque 2 · 40Q · 60′ (seguido)', 'Sit-in de 10-15 s en la silla («Oh F#@& to OK») → New Test → «Block - #2» → Timed. Si te sobró tiempo en el 1, ese es tu respiro.'),
      P(10, 'Pausa fuera de la silla', 'Ziploc BREAK 1 (proteína), agua, baño. No revises preguntas.'),
      P(60, 'Bloque 3 · 40Q · 60′', 'New Test → «Block - #3» → Timed.'),
      P(60, 'Bloque 4 · 40Q · 60′ (seguido)', 'Sit-in 10-15 s → «Block - #4». A las 13:00, almuerzo.'),
    ], [{ t: 'Qbankly › QBanks › USMLE High Yield › UWSA1', url: QBQ, cantidad: '160Q' }], '4 bloques terminados (160Q) y el % de cada bloque anotado', { planB: 'Qbankly no carga: espera 10 min y recarga (un bloque no empezado no se pierde). Si sigue caído, los bloques que falten van a las 18:00 y la revisión al martes: el UWSA1 no cambia de día sin decisión de Joseph.' }),
    B(f, '18:00–18:45', 'DAY-AFTER UWSA1 · 1/6 — medición + informe por sistema + auditoría', [
      P(5, 'Registrar en 📏 Medición: % total + % de B1-B4 + horas netas de hoy', 'Step 1 → 📋 HOY → 📏 Medición (bloques del hito).'),
      P(15, 'Informe por sistema (Palmerton §9.1)', 'Qbankly › Test History / Reports del UWSA1: copia el % por sistema (si no hay informe, anota el Subject/System de cada incorrecta). Es el mapa de partida: no se exige 80 % en nada.'),
      P(15, 'Auditoría de honestidad por escrito', '«Si sigo haciendo lo mismo 6 meses, ¿qué resultado tendría?» + 3 decisiones para esta semana. (Trayectoria: no aplica, es el primer hito.)'),
      P(10, 'Triaje: 10 primeras incorrectas del bloque 1', '1′ cada una: solo el Educational Objective → K (no lo sabía) o QI (lo sabía y leí/interpreté mal).'),
    ], [R_UW], '% en Medición, tabla por sistema, auditoría escrita y 10 incorrectas con K/QI', { aviso: 'Esta semana la franja de las 18:00 es la revisión del UWSA1 (Day-After ~4 h repartido lun 18:00 → jue 18:00): la eval de 10Q mixtas de nivel 4 no tiene sentido sin temas vistos. Vuelve reducida el jue y el vie.' }),
    ];
  }
  const out = [];
  // 05:00
  if (d === 2) out.push(B(f, '05:00–05:45', 'ANKI (vacío) → DAY-AFTER UWSA1 · 2/6 — triaje', [
    P(2, 'Anki: sync; 0 vencidas (todavía no hay tarjetas)', 'Abre APEX::USMLE para confirmarlo; si hubiera alguna, primero esa.'),
    P(43, 'Triaje: 43 incorrectas más del UWSA1 (resto del B1, B2, B3 en orden)', '1′ por pregunta: Educational Objective → K o QI. Con las 10 de ayer ≈ 1 h de triaje (Palmerton §9.2). Las que no entren se quedan sin triar: el UWSA es un mapa, no un temario.'),
  ], [R_UW], '≈53 incorrectas con K/QI (o todas, si fallaste menos)', { aviso: 'El mazo está vacío hasta hoy y el vídeo del tema nuevo no se ve antes del pre-test ciego de las 08:15 → la franja de Anki se usa para el triaje del UWSA1.' }));
  else out.push(anki0500(r));
  // 07:15
  if (d === 2) out.push(B(f, '07:15–08:15', 'DAY-AFTER UWSA1 · 3/6 — gráficos + drill de cronología (1-3)', [
    P(15, 'Ítems experimentales / gráficos del UWSA1 → 2-3 tarjetas de «diseño del experimento»', 'Separa esas preguntas; cada tarjeta: qué se manipuló, qué se midió, qué predice el resultado.'),
    P(45, 'Drill de cronología: 3 incorrectas (las más largas y con más labs)', '15′ cada una: reescribe A MANO el caso en orden cronológico estricto y en presente → 1 PC card por pregunta en APEX::USMLE::General.'),
  ], [R_UW], '2-3 tarjetas de experimento + 3 PC cards', { aviso: 'El plan ponía el Day-After (~4 h) en el deep prime de hoy: se reparte en 6 franjas (lun 18:00 · mar 05:00 · mar 07:15 · mar 18:00 · mié 18:00 · jue 18:00 = 253′) para no apilar 4 h encima del primer tema. El subtema de hoy no cambia.' }));
  else {
    const prevTxt = { 3: ['lesión y muerte celular (D2)', tcMH([48], 5, TUTOR), 'Mehlman, activo desde ayer'], 4: ['inflamación + neoplasia (D3)', tcMH([204, 46], 5, TUTOR), 'Mehlman, activo desde ayer a las 11:00'], 5: ['inmunidad innata/adaptativa (D4)', tcUW([1004], 5, TUTOR), 'uWorld: quedan 5 de las 25 de este System según este plan; si no hay → Mehlman «Immunology (General Cell function)» (24)'] }[d];
    const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0); const resto = 60 - 23 - V;
    out.push(B(f, '07:15–08:15', `REPASO ANCLADO · validación 24 h de ${prevTxt[0]}${V ? ' + vídeo pendiente' : ''}`, [
      P(8, `Shopping list + free recall de ${prevTxt[0]}`, 'Lee tus notas de ayer en 📏 Medición; después, sin mirar, escribe la cadena causal en 90 s.'),
      P(15, `5Q TUTOR de ${prevTxt[0]} (validación 24 h · ${prevTxt[2]})`, prevTxt[1], L_UW),
      ...vids,
      ...(resto > 0 ? [P(resto, V ? 'Free recall del vídeo + Anki restante' : 'Repaso multi-temporal D-1/D-2 + 2.ª pasada de las tarjetas', V ? 'Sin mirar: 90 s por vídeo; si quedan vencidas, termínalas.' : 'Rehaz a mano, sin mirar, los esquemas de lesión celular, inflamación y neoplasia; compáralos con tus notas y repasa las tarjetas creadas ayer.')] : []),
    ], [R_UW, ...recVideo(rep.s0715)], '5Q hechas (≥4/5 = validado; <4/5 → hoy en la consolidación repites 5Q de ese subtema) y free recall escrito'));
  }
  // 08:15
  const pre = {
    2: ['PRE-TEST · lesión celular + inflamación — 8Q (TODAS las que tiene uWorld)', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank (ayer quedó activo el UWSA1) › New Test → Systems ${uwNom(1110)} + ${uwNom(1111)} · Subjects todos · Status Unused · 8 · Order por defecto · Tutor → BEGIN TEST`, L_UW), P(30, '8Q ciegas en Tutor (sin reloj)', 'SAQ + CCSN antes de mirar las opciones; después lee la explicación entera (~3′ por pregunta en inglés).'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de lesión/muerte celular e inflamación; cada duda (también en aciertos) a la shopping list de 📏 Medición.')], 'uWorld solo tiene 8Q de «Principles of pathology» (Cellular pathology 6 + Inflammation and repair 2): se usan TODAS aquí; la consolidación de las 11:00 y la validación de mañana van con Mehlman (respaldo).'],
    3: ['PRE-TEST · neoplasia — 10Q ciegas (uWorld)', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} · Status Unused · 10 · Tutor → BEGIN TEST`, L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de neoplasia; dudas a la shopping list.')]],
    4: ['PRE-TEST · inmunidad innata/adaptativa + MHC + linfocitos — 10Q ciegas', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank › New Test → System ${uwNom(1004)} · Status Unused · 10 · Tutor → BEGIN TEST`, L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de inmunidad; dudas a la shopping list.')]],
    5: ['PRE-TEST · hipersensibilidad + autoinmunidad + inmunodeficiencias + trasplante — 10Q ciegas', [P(3, 'Armar el test en el Test Composer', tcUW([1002, 1001, 1000, 1005], 10, TUTOR), L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: tipos I-IV de hipersensibilidad, inmunodeficiencias que conozcas; dudas a la shopping list.')]],
  }[d];
  out.push(B(f, '08:15–09:00', pre[0], pre[1], [R_UW], d === 2 ? 'nota /8 en 📏 Medición (40-60 % es normal: es diagnóstico)' : 'nota /10 en 📏 Medición (40-60 % es normal: es diagnóstico)', { planB: respaldo(d, 10), aviso: pre[2] }));
  // 09:00
  out.push(deepPrime(r));
  // 11:00
  const con = {
    2: ['CONSOLIDACIÓN · lesión y muerte celular — 10Q Tutor (Mehlman)', [P(3, 'Cambiar a Mehlman y armar', `QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank › New Test → System ${mhNom(48)} · Status Unused · 5 · Tutor → BEGIN TEST`, L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con su explicación; corrige el 1.er bloque antes de armar el 2.º.'), P(15, 'Revisión: Educational Objective + shopping list + log de errores', 'knowledge / transfer / proceso → 📏 Medición (consolidación %).'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥8/10 → validado (mañana 07:15: 5Q más) · <8/10 → el bloque extra de abajo.'), P(10, 'Bloque extra de 5Q SOLO si <8/10 · si ≥8/10: 1.ª pasada de las tarjetas de hoy', 'Mismo filtro. Tope del día: 30 preguntas nuevas.')], 'Mehlman es el respaldo porque uWorld no tiene más preguntas de este subtema. Mañana a las 08:15 vuelves a uWorld (Select QBank).'],
    3: ['CONSOLIDACIÓN · inflamación + neoplasia — 10Q Tutor (Mehlman)', [P(3, 'Cambiar a Mehlman y armar', `QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank › New Test → System ${mhNom(204)} · Status Unused · 5 · Tutor → BEGIN TEST`, L_UW), P(15, 'Bloque 1: 5Q de inflamación y reparación (Tutor)', 'Con explicación; corrige antes del bloque 2.'), P(15, 'Bloque 2: 5Q de neoplasia (Tutor)', `New Test → System ${mhNom(46)} · Status Unused · 5 · Tutor.`), P(15, 'Revisión + shopping list + log', 'knowledge / transfer / proceso → 📏 Medición.'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥8/10 → validados (mañana 07:15: 5Q más) · <8/10 → bloque extra.'), P(10, 'Bloque extra de 5Q del subtema más flojo SOLO si <8/10 · si no: tarjetas de hoy', 'Tope del día: 30 nuevas.')], 'La neoplasia de uWorld (53Q: Neoplasia 31 + Principles of oncology 22) se reserva para el pre-test y la eval: la consolidación va con Mehlman para no gastarla.'],
    4: ['CONSOLIDACIÓN · inmunidad básica — 10Q Tutor (uWorld)', [P(3, 'Armar el test en el Test Composer', tcUW([1004], 5, TUTOR), L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con explicación.'), P(15, 'Revisión + shopping list + log', '📏 Medición.'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥8/10 → validado · <8/10 → bloque extra.'), P(10, `Bloque extra de 5Q SOLO si <8/10 (respaldo: Mehlman ${mhNom(66)})`, 'Si ≥8/10: tarjetas de hoy. Tope del día: 30 nuevas.')]],
    5: ['CONSOLIDACIÓN · hipersensibilidad / inmunodeficiencias — 10Q Tutor (uWorld)', [P(3, 'Armar el test en el Test Composer', tcUW([1002, 1001, 1000, 1005], 5, TUTOR), L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con explicación.'), P(15, 'Revisión + shopping list + log', '📏 Medición.'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥8/10 → validado (lun 07:15: 5Q timed) · <8/10 → bloque extra.'), P(10, 'Bloque extra de 5Q SOLO si <8/10 · si no: tarjetas de hoy', 'Tope del día: 30 nuevas (si haces el extra, la eval de las 18:00 va solo con incorrectas).')]],
  }[d];
  out.push(B(f, '11:00–12:00', con[0], con[1], [R_UW], '10Q (o 15) hechas, % en 📏 Medición y gate marcado ✓/✗', { aviso: con[2], planB: d >= 4 ? respaldo(d, 10) : undefined }));
  // 18:00
  if (d === 2 || d === 3) out.push(B(f, '18:00–18:45', `DAY-AFTER UWSA1 · ${d === 2 ? '4/6 — drill de cronología (4-6)' : '5/6 — drill de cronología (7-9)'}`, [P(45, `Drill de cronología: 3 incorrectas más del UWSA1 (${d === 2 ? '4, 5 y 6' : '7, 8 y 9'} de 10)`, '15′ cada una: caso reescrito A MANO en orden cronológico y en presente → 1 PC card.')], [R_UW], `3 PC cards más (${d === 2 ? 6 : 9}/10)`));
  else if (d === 4) out.push(B(f, '18:00–18:45', 'DAY-AFTER UWSA1 · 6/6 + EVAL reducida (5Q timed)', [
    P(15, 'Drill de cronología: la 10.ª incorrecta del UWSA1', 'Reescrita a mano en orden cronológico → PC card. Day-After cerrado (≈4 h).'),
    P(1, 'Armar 5Q TIMED de lo ya visto', `QBanks › uWorld › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} + ${uwNom(1004)} · Status Unused · 5 · Timed`, L_UW),
    P(8, '5Q TIMED (90 s/Q)', 'Modo examen: cover-the-options; sin cambiar respuestas.'),
    P(16, 'Corrección + 1 tarjeta APEX por error', 'Educational Objective · tipo de error.'),
    P(5, 'Registrar eval % + horas netas', '📏 Medición.'),
  ], [R_UW], 'drill 10/10 y la eval de 5Q registrada', { aviso: 'Eval reducida a 5Q nuevas: el tope de la semana 1 son 30 preguntas nuevas al día (5 + 10 + 10 + 5). Si hoy hiciste el bloque extra de las 11:00, cambia estas 5 por 5 de Status Incorrect.' }));
  else out.push(B(f, '18:00–18:45', 'EVAL de la semana · 5Q nuevas timed + 5 incorrectas + cierre S1', [
    P(2, 'Armar 2 tests de 5Q TIMED', `(a) QBanks › uWorld › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} + ${uwNom(1004)} + ${uwNom(1002)} · Status Unused · 5 · Timed · (b) mismo filtro con Status Incorrect · 5 · Timed`, L_UW),
    P(16, '10Q TIMED (5 nuevas + 5 re-test de incorrectas)', '90 s/Q; cover-the-options.'),
    P(17, 'Corrección + tarjeta APEX por error', 'Educational Objective · tipo de error.'),
    P(10, 'Registrar + resumen para la revisión del sábado', '📏 Medición (eval %, horas netas) + gates de la semana: lesión celular · inflamación · neoplasia · inmunidad básica · inmunidad clínica (✓/✗) + minutos de vídeo que quedan en la cola.'),
  ], [R_UW], 'eval registrada y el resumen de la semana escrito', { aviso: 'Tope semana 1: 30 preguntas nuevas/día (5 + 10 + 10 + 5). Si hiciste el bloque extra de las 11:00, el test (a) también va con Status Incorrect.' }));
  return out;
}

// ── fines de semana de F1 (Anki del Calendar: sáb 19:00-19:30 · dom 17:00-17:15) ───────────────────────────────────────────────
function findes() {
  const out = {}; const q5 = REP[5].colaTras;
  for (let t = new Date('2026-10-24T12:00:00Z'); t <= new Date('2026-12-27T12:00:00Z'); t = new Date(t.getTime() + 86400000)) {
    const iso = t.toISOString().slice(0, 10); const w = t.getUTCDay();
    if (w === 6) out[iso] = [B(iso, '19:00–19:30', 'ANKI del sábado · cola FSRS', [
      P(25, 'TODAS las vencidas de APEX::USMLE (reviews first)', 'Good ≈90 % / Again solo olvido real · nuevas = 0 (el sábado no se crean tarjetas).'),
      P(5, 'Telemetría + backlog', 'node DATA/_scripts/anki_telemetria.js · si el backlog > 100: el lunes nuevas = 0.'),
    ], [R_ANKI], '0 vencidas (o 25′ cumplidos) y telemetría registrada', { aviso: iso === '2026-10-24' ? `Sábado sin vídeo ni preguntas (descanso). A la revisión semanal de las 07:15 lleva: % del UWSA1, gates de la semana (📏 Medición) y la cola de vídeo: ≈${q5.bbMin}′ de B&B + ${q5.palmMin}′ de Palmerton que se ven el lun 26 y el mar 27 (07:15 y hueco del deep prime).` : undefined })];
    if (w === 0) out[iso] = [B(iso, '17:00–17:15', 'ANKI del domingo · OPCIONAL (≤15′)', [
      P(15, 'Solo vencidas de APEX::USMLE (si hay)', 'Opcional y no se registra: si estás cansado, no lo hagas (el lunes a las 05:00 lo absorbe).'),
    ], [R_ANKI], 'opcional: vencidas a 0 o descanso')];
  }
  return out;
}

// ── 4) ENSAMBLADO ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const GUIA = {};
for (const r of F1) {
  if (S1(r.d)) { GUIA[r.fecha] = semana1(r); continue; }
  if (esHito(r)) { GUIA[r.fecha] = hitoNBME(r); continue; }
  const th = trasHito(r);
  GUIA[r.fecha] = [anki0500(r), th && th.n === 1 ? dayAfter0715(r, th) : repaso0715(r), pretest(r), deepPrime(r), consolidacion(r), eval18(r)];
}
Object.assign(GUIA, findes());
if (ERR.length) aborta('bloques que no cuadran:\n  ' + ERR.join('\n  '));
const FECHAS = Object.keys(GUIA).sort();

// vídeos B&B de los capítulos de F1 sin día en F1 (constancia)
const CAPS_F1 = ['Pathology', 'Immunology', 'Cardiology', 'Pulmonary', 'Renal', 'Gastroenterology', 'Neurology'];
const usados = new Set(Object.values(MAPA).flatMap((m) => m.bb));
const SIN_DIA = [...BB.entries()].filter(([id, v]) => (CAPS_F1.includes(v.cap) || (v.cap === 'Endocrinology' && v.sec !== 'Reproductive') || (v.cap === 'Hematology' && v.sec === 'Red Blood Cells')) && !usados.has(id)).map(([id, v]) => `${v.cap} › ${v.sec} › ${v.nombre} (${mmss(v.s)})`);
// escenario: si la velocidad se queda en 1,25× desde S4 (no sube a 1,5×), ¿cuánto vídeo queda al cerrar F1?
function residuo(vmax) {
  const vv = (d) => (d <= 5 ? { v: 1.0, f: 1.2 } : { v: Math.min(d <= 15 ? 1.25 : 1.5, vmax), f: 1.15 });
  const rm = (s, d) => Math.ceil((s / 60 / vv(d).v) * vv(d).f);
  const cM = COLA_METODO_TRAS_D1.map((it) => ({ ...it })); const cB = []; const cP = []; // v6.02c F2: parte del resto del D1 (Palmerton de método)
  const col = (it, d, libre) => { const m = rm(it.fin - it.ini, d); if (m <= libre) return { u: m, resto: null }; if (libre < MIN_TRAMO) return { u: 0, resto: it }; const toma = Math.floor(((libre / vv(d).f) * vv(d).v * 60) / 60) * 60; if (toma < 60) return { u: 0, resto: it }; return { u: rm(toma, d), resto: { ...it, ini: it.ini + toma } }; };
  const llenar = (d, cap, ex) => { let l = cap; for (const c of [cM, cB, cP]) while (c.length && l >= MIN_TRAMO) { if (ex != null && c[0].dOrig === ex) break; const r = col(c[0], d, l); l -= r.u; if (r.resto) { if (!r.u) break; c[0] = r.resto; } else c.shift(); } return l; };
  for (const r of F1) {
    if (r.d === 1 || esHito(r)) continue; const d = r.d;
    if (CAP.s0500(d)) llenar(d, CAP.s0500(d)); if (CAP.s0715(d)) llenar(d, CAP.s0715(d));
    let l = 70; const pend = [];
    for (const id of MAPA[d].bb) { const it = item('bb', id, d); if (pend.length) { pend.push(it); continue; } const rr = col(it, d, l); l -= rr.u; if (rr.resto) pend.push(rr.resto); }
    cB.push(...pend); if (r.palm && d > 3 && PALM[r.palm.id]) cP.push(item('palm', r.palm.id, d)); if (l >= MIN_TRAMO) llenar(d, l, d);
  }
  return { bbMin: cB.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0), palmMin: [...cM, ...cP].reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0) };
}
const ESC125 = residuo(1.25);
const finalPalm = COLA_FINAL.palm.map((it) => `Palmerton «${PALM[it.id].t}» ${hms(it.ini)}→${hms(it.fin)} (D${it.dOrig})`);
const finalBB = COLA_FINAL.bb.map((it) => `${bbRuta(it.id)} ${mmss(it.ini)}→${mmss(it.fin)} (D${it.dOrig})`);

const META = {
  version: 'v6.02c',
  generado: '2026-10-18',
  fuente: 'DATA/_scripts/usmle/gen_usmle_guia.js + guia_catalogo_f1.js · catálogos Qbankly del 18-oct-2026 (DATA/USMLE/qbankly_*.tsv)',
  dias: FECHAS.length,
  bloques: FECHAS.reduce((a, f) => a + GUIA[f].length, 0),
  velocidad: 'S1 (D1-D5) 1,0× con subtítulos EN · S2-S3 (D6-D15) 1,25× · desde S4 (D16) 1,5× si el free recall del último vídeo recoge ≥3 ideas (si no, 1,25×) · minutos reales = duración ÷ velocidad × 1,2 (S1) / 1,15',
  reglaPreguntasS1: 'Semana 1 (nivel 1, desde cero con el inglés): ≤30 preguntas NUEVAS/día sumando todas las franjas, todo en Tutor salvo el UWSA1 y la eval reducida; cada subtema 10Q el día que se estudia (2 bloques de 5) + 5Q a las 07:15 del día siguiente; gate ≥8/10 y ≥4/5; bloque extra de 5Q solo si falla. Desde S2: nivelUW/qDia del plan v6.02.',
  reglaRespaldo: 'System con menos preguntas de las pedidas → (1) todas las Unused del System, (2) los Systems hermanos del catálogo, (3) el mismo subtema en «Mehlman - Step 1 QBank - 2026»; nunca preguntas fuera del tema.',
  reglaVideo: 'El vídeo del tema nuevo solo después del pre-test ciego (deep prime, ≤70′ reales); lo que no cabe pasa a la cola y se ve, en orden y partido por minutos, en el «vídeo pendiente» de las 07:15 (≤30′; en S1 también 05:00 mié-vie) o en el hueco de un deep prime posterior. Palmerton High Yield entra a la cola detrás de los B&B; los 2 Palmerton de MÉTODO adelantados al lun 19 (FSRS · «The ONLY video») siguen la misma regla de minutos (× 1,2 a 1,0×) y lo que no cabe ese día va a la cabeza de la cola.',
  colaAlCierreF1: [...finalBB, ...finalPalm],
  escenario125: `Si la velocidad se queda en 1,25× desde el D16: al cierre de F1 quedarían ≈${ESC125.bbMin}′ de B&B + ${ESC125.palmMin}′ de Palmerton sin franja (con 1,5×: ${COLA_FINAL.bb.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′ + ${COLA_FINAL.palm.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′).`,
  diasConAviso: F1.filter((r) => MAPA[r.d] && MAPA[r.d].nota).map((r) => r.d),
  bbSinDiaF1: SIN_DIA,
};

// ── 5) SALIDA (cadenas internadas: cada texto repetido se guarda una vez en S[]; los bloques son tuplas de índices) ─────────────
const S_ = []; const SIX = new Map();
const si = (s) => { if (s == null) return -1; if (!SIX.has(s)) { SIX.set(s, S_.length); S_.push(s); } return SIX.get(s); };
// tupla: [franja, titulo, totalMin, pasos[[min, que, como, enlaceT, enlaceUrl]], recursos[[t, url, min, cantidad]], hecho, planB, aviso]
const tupla = (g) => [si(g.franja), si(g.titulo), g.totalMin,
  g.pasos.map((p) => (p.enlace ? [p.min, si(p.que), si(p.como), si(p.enlace.t), si(p.enlace.url)] : [p.min, si(p.que), si(p.como)])),
  g.recursos.map((r) => (r.cantidad != null ? [si(r.t), si(r.url), r.min ?? -1, si(r.cantidad)] : r.min != null ? [si(r.t), si(r.url), r.min] : [si(r.t), si(r.url)])),
  si(g.hecho), si(g.planB), si(g.aviso)];
const DATOS = FECHAS.map((f) => [f, GUIA[f].map(tupla)]);
const cab = `/**
 * usmleGuia.ts — GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (lun 19-oct → mié 30-dic-2026 + los fines de semana), en el
 * formato común \`GuiaBloque\` (src/lib/guia.ts). Lo pintan UsmleTodayPlan (📋 HOY → 🧭 Guía del día) y la tarjeta USMLE del Home.
 * GENERADO por DATA/_scripts/usmle/gen_usmle_guia.js (mapeo: guia_catalogo_f1.js) — NO editar a mano:
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            (escribe) · --check (compara) · --informe <ruta.md>
 * Lee las filas REALES de usmleStep1Daily.ts (no cambia fechas, D#, hitos ni niveles de la v6.02) y los catálogos verificados el
 * 18-oct-2026: B&B Step 1 (491 vídeos con duración), Test Composer de uWorld (13 Subjects · 169 Systems · matriz Subject × System),
 * Mehlman (respaldo), UWSA/NBME (bloques reales) y la Library de Qbankly (uWorld Medical Library · PassMedicine).
 * Reglas: ${META.velocidad}.
 *   ${META.reglaPreguntasS1}
 *   ${META.reglaRespaldo}
 *   ${META.reglaVideo}
 * Avisos visibles (mapeo plan → catálogo no exacto): D${META.diasConAviso.join(', D')}.
 * v6.02c (18-oct-2026, E1): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): lun 19 · los 2 Palmerton de método (FSRS · «The ONLY video») con la regla de minutos de la semana 1
 *   (duración × 1,2 a 1,0×) y repartidos sin recortar (lo que no cabe → cabeza de la cola: D3 05:00) · la preparación del UWSA1 se parte en
 *   07:15-07:25 y 07:55-08:50 (el SYNAPSE de las 07:25 sale una sola vez, en su tarjeta) · capítulos B&B exactamente como en el catálogo (sin «(NEW)»).
 */
import type { GuiaBloque } from './guia';
import { franjaDentro } from './guia';

export const GUIA_USMLE_META = ${JSON.stringify(META, null, 2)} as const;

/** Textos internados (cada cadena repetida se guarda una vez). */
const S: string[] = ${JSON.stringify(S_)};
/** [franja, titulo, totalMin, pasos [min, que, como, enlaceT?, enlaceUrl?][], recursos [t, url, min?(-1 = sin dato), cantidad?][], hecho, planB, aviso] (-1 = no hay) */
type BloqueT = [number, number, number, number[][], number[][], number, number, number];
/** fecha (AAAA-MM-DD) → bloques del día (tuplas de índices de S) en orden de franja. */
const D: Record<string, BloqueT[]> = {
${DATOS.map(([f, bs]) => `  ${JSON.stringify(f)}: ${JSON.stringify(bs)},`).join('\n')}
};
const s = (i: number | undefined): string => (i == null || i < 0 ? '' : S[i] ?? '');
const n = (i: number | undefined): number => (i == null ? -1 : i);
function decodificar(b: BloqueT): GuiaBloque {
  const g: GuiaBloque = {
    franja: s(b[0]), plan: 'usmle', titulo: s(b[1]), totalMin: b[2],
    pasos: b[3].map((p) => (p.length >= 5 ? { min: n(p[0]), que: s(p[1]), como: s(p[2]), enlace: { t: s(p[3]), url: s(p[4]) } } : { min: n(p[0]), que: s(p[1]), como: s(p[2]) })),
    recursos: b[4].map((r) => ({ t: s(r[0]), url: s(r[1]), ...(n(r[2]) >= 0 ? { min: n(r[2]) } : {}), ...(n(r[3]) >= 0 ? { cantidad: s(r[3]) } : {}) })),
    hecho: s(b[5]),
  };
  if (b[6] >= 0) g.planB = s(b[6]);
  if (b[7] >= 0) g.aviso = s(b[7]);
  return g;
}
const CACHE = new Map<string, GuiaBloque[]>();
/** Fechas con guía (orden). */
export const GUIA_USMLE_FECHAS: string[] = Object.keys(D);
/** Bloques de la guía USMLE de esa fecha ([] si no hay). */
export function guiaUsmleDe(fecha: string): GuiaBloque[] {
  const c = CACHE.get(fecha); if (c) return c;
  const bs = D[fecha]; if (!bs) return [];
  const out = bs.map(decodificar); CACHE.set(fecha, out); return out;
}
/** Bloques cuya franja EMPIEZA en [ini, fin) — p. ej. el bloque principal del Home 07:00–12:00 agrupa 07:15 · 08:15 · 09:00 · 11:00. */
export function guiaUsmleEnRango(fecha: string, ini: string, fin: string): GuiaBloque[] {
  return guiaUsmleDe(fecha).filter((g) => franjaDentro(g.franja, ini, fin));
}
`;
if (CHECK) {
  const act = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (act !== cab) { console.error('✗ src/lib/usmleGuia.ts NO coincide con el generador (node DATA/_scripts/usmle/gen_usmle_guia.js)'); process.exit(1); }
  console.log(`✓ usmleGuia.ts al día · ${META.dias} fechas · ${META.bloques} bloques · todos cuadran (Σ pasos = franja)`);
} else {
  fs.writeFileSync(OUT, cab);
  console.log(`✓ escrito ${path.relative(ROOT, OUT)} · ${META.dias} fechas · ${META.bloques} bloques · ${(cab.length / 1024).toFixed(0)} KB · cola al cierre de F1: ${META.colaAlCierreF1.join(' · ') || 'vacía'}`);
  console.log('  ' + META.escenario125);
}

// ── 6) INFORME (tabla de la semana 1 + reparto de F1) ───────────────────────────────────────────────────────────────────────────
if (INFORME) {
  const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const L = [];
  L.push('## Tabla final · semana USMLE (lun 19 → dom 25-oct-2026)', '', '| Día | Franja | Bloque | Qué · cuánto (pasos con minutos) | Cómo (resumen) | Enlace |', '|---|---|---|---|---|---|');
  for (const f of FECHAS.filter((x) => x <= '2026-10-25')) for (const g of GUIA[f]) {
    L.push(`| ${fd(f)} | ${g.franja} (${g.totalMin}′) | ${esc(g.titulo)} | ${g.pasos.map((p) => `**${p.min}′** ${esc(p.que)}`).join('<br>')} | ${g.pasos.map((p) => esc(p.como)).join('<br>')} | ${[...new Set(g.pasos.filter((p) => p.enlace).map((p) => `[${esc(p.enlace.t)}](${p.enlace.url})`))].join('<br>') || '—'} |`);
    if (g.aviso) L.push(`| | | ⚠ aviso | ${esc(g.aviso)} | | |`);
  }
  L.push('', '## Reparto de vídeo F1 (minutos reales por franja; P = Palmerton)', '', '| D | Fecha | v | 05:00 | 07:15 | 09:00 | cola tras el día |', '|---|---|---|---|---|---|---|');
  const fx = (a) => a.map((x) => `${x.tipo === 'bb' ? BB.get(x.id).nombre.replace(/^\d+ - /, '') : 'P·' + PALM[x.id].t.slice(0, 22)}${x.ini || x.fin !== (x.tipo === 'bb' ? BB.get(x.id).s : PALM[x.id].s) ? ` [${mmss(x.ini)}-${mmss(x.fin)}]` : ''} ${x.min}′`).join(' · ') || '—';
  for (const r of F1) { const p = REP[r.d]; L.push(p ? `| D${r.d} | ${fd(r.fecha)} | ${vel(r.d).v} | ${esc(fx(p.s0500))} | ${esc(fx(p.s0715))} | ${esc(fx(p.s0900))} | ${p.colaTras.bbMin}′ B&B + ${p.colaTras.palmMin}′ P |` : `| D${r.d} | ${fd(r.fecha)} | — | HITO | ${esc(r.sub)} | | |`); }
  L.push('', `Cola al cierre de F1: ${META.colaAlCierreF1.join(' · ') || 'vacía'}. ${META.escenario125}`);
  L.push('', '## uWorld: días con preguntas previsiblemente justas (aviso en el pre-test)', '');
  for (const r of F1) { const q = QS[r.d]; if (q && q.deficit) L.push(`- D${r.d} ${fd(r.fecha)} · ${MAPA[r.d].uw.map(uwNom).join(' + ')}: ~${q.dispAntes} Unused antes del día para ${q.dispAntes + q.deficit} → respaldo Mehlman ${(MAPA[r.d].mh || []).map(mhNom).join(' + ')}`); }
  L.push('', '## Vídeos B&B de los capítulos de F1 que no caen en ningún día de F1', '', ...SIN_DIA.map((x) => `- ${x}`));
  fs.writeFileSync(INFORME, L.join('\n') + '\n');
  console.log('✓ informe → ' + INFORME);
}
