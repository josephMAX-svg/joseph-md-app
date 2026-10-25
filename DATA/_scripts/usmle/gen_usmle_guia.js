/**
 * gen_usmle_guia.js — genera src/lib/usmleGuia.ts: la GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (D1-D47 en la v6.05 + fines de
 * semana) y, v6.05b, de las filas de F1 DESPLAZADAS al tramo 2 (T3-T13 + el NBME 29 de T2 y los días de cola de vídeo T14-T18, plantilla F3),
 * en el formato común `GuiaBloque` de src/lib/guia.ts.
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            → escribe src/lib/usmleGuia.ts (aborta si un bloque no cuadra)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --check    → regenera en memoria y compara con el fichero (exit 1 si difiere)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --informe <ruta.md>  → además escribe la tabla de la semana 1 + el reparto F1
 * Entradas (nada a mano en el .ts):
 *   · las filas REALES de F1 (src/lib/usmleStep1Daily.ts vía cargar_ts.js: fechas, D#, sub, nivelUW, qDia, palm) — este script NO
 *     cambia fechas, D#, hitos ni niveles (el plan vigente de _fechas_v6.json, hoy v6.05, intacto);
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
 *     pendiente» de las 07:15 del día siguiente (≤30′; del D3 al D5 también las 05:00, ≤30′, porque el mazo aún está casi vacío) o en el
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
 * v6.03 (20-oct-2026): corrimiento del D1 lun 19-oct → mié 21-oct (lun 19 y mar 20 sin estudio; F1 = 50 filas, mié 21-oct → mié 30-dic).
 *   El guion NO cambia (mismo D#, mismos bloques, mismos minutos): D1 UWSA1 + Day-After 1/6 · D2 Day-After 2/6-4/6 · D3 5/6 · D4 6/6 + eval
 *   reducida · D5 eval de cierre D1-D5; lo que cambia es la FECHA de cada D#, que ahora se DERIVA de las filas: nada de «lun 19», «martes»,
 *   «2026-10-24» ni «52 filas» escrito a mano (guarda contra _fechas_v6.json; «ayer»/«mañana» → la fecha real cuando hay fin de semana en
 *   medio: D3 vie 23 → D4 lun 26). El catálogo se lee por el ORIGEN v5.20 de cada d (colocarF1): las filas v5.20 D50 (Neuro) y D51
 *   (Heme/Onco) ya no son de F1 → sus recursos quedan en guia_catalogo_f1.js y se listan en META.bbDesplazadasTramo2 (T3/T4). Sáb 24 y
 *   dom 25-oct = solo lo nativo del fin de semana (Anki sáb 19:00 · dom 17:00 opcional).
 * v6.05 (24-oct-2026): corrimiento del D1 mié 21-oct → lun 26-oct (la semana del 19 sin estudio; F1 = 47 filas, lun 26-oct → mié 30-dic).
 *   Mismo guion por D# (sin cambio de bloques ni minutos): D1 lun 26 UWSA1 08:50-13:00 (07:15 localizar · 07:25 SYNAPSE · 07:55 vídeo de
 *   método + peor escenario · Day-After 1/6 a las 18:00) · D2 mar 27 · D3 mié 28 · D4 jue 29 · D5 vie 30 (ya sin fin de semana en medio:
 *   el aviso del Day-After lo dice solo si hay sábado/domingo entre el D1 y el D4) · sáb 31-oct / dom 1-nov = solo Anki. Las filas v5.20
 *   D47-D50 (Neuro) y D51 (Heme/Onco) ya no son de F1 → META.bbDesplazadasTramo2 (T3-T7). Lo que no cabe en el último día de contenido
 *   (D46: vídeos B&B de fármacos autonómicos + el resto del Palmerton Neuro Part 2) NO se recorta: queda en META.colaAlCierreF1 y su aviso
 *   lo manda al tramo 2 (T3, con Neuro).
 * v6.05b (24-oct-2026, verificación adversarial): (1) la cola al cierre de F1 (≈82′ de B&B de fármacos autonómicos del D46 + 61′ del Palmerton
 *   Neuro Part 2 del D45) ya NO se queda sin día: el reparto sigue en el tramo 2 (SEQ = F1 + DIAS_T2 hasta la última desplazada) con las MISMAS
 *   capacidades por franja (07:15 «vídeo pendiente» ≤30′ salvo el día siguiente a un hito · hueco del deep prime 09:00) → T4 vie 19-mar 07:15 +
 *   09:00 · T5 lun 22-mar 07:15 + 09:00 · T6 mar 23-mar 07:15; lo que deja la última desplazada va al «vídeo pendiente» 07:15-07:45 de las
 *   filas siguientes del tramo 2 (días de cola, F3) hasta vaciarla; si no se vacía, ABORTA (META.colaAlCierreTramo2 siempre []) y destinoDe()
 *   sin franja es un error. (2) GUÍA de las 11 desplazadas (v5.20 D47-D54, D56, D57, D79) en su fecha T con el MISMO guion por D# (anki0500 ·
 *   repaso0715/dayAfter0715 · pretest · deepPrime · consolidacion · eval18) + 16:15 REENTRADA (reentrada1615, F3) y la del NBME 29 (T2, hitoNBME:
 *   su Day-After 1/6-6/6 cae en T2-T6 como en F1); franjas leídas de plantillasV6.ts › bloquesF3 + FRANJA_F3_REENTRADA (aborta si un bloque cae
 *   fuera) · catálogo: guia_catalogo_f1.js + D52-D54, D56, D57, D79 (nuevos) · SUBTEMA APEX del tramo 2 con el D# v5.20 (47_…, 65_nbme29) · la
 *   bioestadística a ::Biostatistics · consolidación de nivel 4 (viernes N4 del tramo 2; F1 no tiene). F1: solo cambian los avisos del D45/D46
 *   (destino explícito T4-T6 en vez de «→ TRAMO 2»). Controles: verificar_v6.js «guía USMLE».
 * v6.03b (20-oct-2026): MÉTODO ANKI · APEX dentro de los pasos existentes (mismas franjas, mismos minutos por bloque), según
 *   DATA/USMLE/METODO_ANKI_APEX_USMLE.md (Palmerton vía NotebookLM con citas + Tutorías MI + PALMERTON_*.md): D1 05:00 = configuración
 *   EXACTA (preset «APEX USMLE» en el padre + «Save to All Subdecks»: FSRS 0,90 · 20 nuevas/día · 9999 repasos/día · repasos antes que
 *   nuevas · steps por defecto · día nuevo a las 4 h; antes decía 200 repasos/día, que oculta vencidas) · Anki AM = vencidas primero sin
 *   tope + Good/Again + nuevas solo con vencidas a 0 + telemetría (% Again) · tope de CREACIÓN 20 tarjetas/día repartido por bloque
 *   (deep prime ≤10 · consolidación ≤4/3/2 según nivel · eval ≤5 · comprimida ≤3 · PC cards del Day-After primero) con la cabecera APEX
 *   del día (ESPECIALIDAD/SUBTEMA/FUENTE/MODO válidos para el parser v2.3.2: «General» no existe en el motor → Pathology) · sábado =
 *   vencidas + «Save to All Subdecks» (+ FSRS Optimize a las 4 semanas) + Stats · domingo opcional con la postura de Palmerton.
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
const F1 = U.DIAS; // v6.03: 50 filas (mié 21-oct → mié 30-dic) · v6.02: 52 (lun 19-oct → mié 30-dic)
// v6.03: la F1 esperada sale de _fechas_v6.json (antes: 52 filas y '2026-10-19' fijos)
const FV6 = require('../gen_fechas_v6').cargarFechasV6();
const VER = FV6.version;
if (F1.length !== FV6.f1.dias || F1[0].fecha !== FV6.f1.inicio || F1[F1.length - 1].fecha !== FV6.f1.fin) aborta(`F1 de usmleStep1Daily.ts (${F1.length} filas, ${F1[0] && F1[0].fecha} → ${F1.length ? F1[F1.length - 1].fecha : '—'}) ≠ _fechas_v6.json ${VER} (${FV6.f1.dias}, ${FV6.f1.inicio} → ${FV6.f1.fin}): corre antes gen_usmle_v5.js + assemble_usmle_ts.js`);
// el guion a mano de D1-D5 (semana1) presupone ESTE contenido por D#: si un corrimiento lo cambiara, aborta en vez de escribir textos falsos
{ const S1_ESP = [/UWSA1/, /lesión celular/, /neoplasia/, /Inmunidad innata/, /Hipersensibilidades/];
  const mal = S1_ESP.map((re, i) => (F1[i] && re.test(F1[i].sub) ? null : `D${i + 1}`)).filter(Boolean);
  if (mal.length) aborta(`el guion de D1-D5 no corresponde a las filas ${mal.join(', ')} (UWSA1 · lesión celular · neoplasia · inmunidad · hipersensibilidad)`); }
const ANKI = (() => { try { return cargarModuloTS(path.join('src', 'lib', 'ankiLinks.ts')); } catch { return null; } })();
const deckDe = (row) => (ANKI ? ANKI.usmleAnkiDeck(row.system, row.matType) : 'APEX::USMLE::Pathology'); // v6.03: sin ankiLinks = Pathology (el parser APEX no acepta «General»)

// ── v6.03b · MÉTODO ANKI · APEX (DATA/USMLE/METODO_ANKI_APEX_USMLE.md) ───────────────────────────────────────────────────────────
// Ajustes y cuotas: Palmerton (NotebookLM «STEP 1 · Palmerton Engine», transcripción de «Give Me 30 Minutes and I'll 5X Your Anki
// Efficiency»: ≤50 nuevas/día —30-40 al empezar—, 9.999 repasos/día, retención 0,90, Good ≈90 % / Again ≈10 %, sin Hard/Easy) ajustado a
// la franja FIJA de 45′ del Anki AM (su calibración: ~1 h por 100 repasos y 1-2′ por tarjeta nueva) → tope de creación 20/día.
const AK = {
  nuevasDia: 20, maxRev: 9999, ret: '0,90', topeDia: 20,
  deepPrime: 10, consol: { 1: 4, 2: 3, 3: 2 }, eval: 5, evalComp: 3, evalRed: 3, exp: 3,
};
const METODO_MD = 'DATA/USMLE/METODO_ANKI_APEX_USMLE.md';
/** Los 44 tags USMLE que acepta el parser APEX v2.3.2 (agente_estudio · subtema_mapping.json › USMLE.tags_clinicos_a_crear, leído el
 *  20-oct-2026). ESPECIALIDAD fuera de esta lista = el motor RECHAZA el bloque («USMLE especialidad invalida»): no existe «General». */
const APEX_USMLE_TAGS = ['Aging', 'Anatomy', 'Anesthesiology', 'Behavioral_Science', 'Biochemistry', 'Biostatistics', 'Cardiology', 'Cell_Biology',
  'Critical_Care', 'Dermatology', 'Embryology', 'Emergency_Medicine', 'Endocrinology', 'Environmental_Medicine', 'Ethics', 'Family_Medicine',
  'Gastroenterology', 'Genetics', 'Geriatrics', 'Gynecology', 'Hematology_Oncology', 'Histology', 'Immunology', 'Infectious_Diseases',
  'Laboratory_Medicine', 'Microbiology', 'Neonatology', 'Nephrology', 'Neurology', 'Obstetrics', 'Occupational_Medicine', 'Oncology',
  'Orthopedics', 'Otolaryngology', 'Pain_Medicine', 'Pathology', 'Pathophysiology', 'Pediatrics', 'Pharmacology', 'Physiology', 'Psychiatry',
  'Pulmonology', 'Rheumatology', 'Surgery'];
/** ESPECIALIDAD APEX del día: el tag del deck de ankiLinks salvo «General» (Fundamentos = patología general → Pathology). */
const espApex = (row) => { const t = deckDe(row).split('::').pop(); return t === 'General' ? 'Pathology' : /Biostatistics/i.test(row.uw || '') ? 'Biostatistics' : t; }; // v6.05: la bioestadística (v5.20 D79, T13) → ::Biostatistics (ankiLinks la manda a Psychiatry)
const deckApex = (row) => `APEX::USMLE::${espApex(row)}`;
const nn = (d) => String(d).padStart(2, '0');

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
// v6.05 (24-oct): las filas de F1 DESPLAZADAS al tramo 2 (sub «DE F1 → TRAMO 2 …») llevan la MISMA guía por D# en su fecha T (plantilla F3)
//   → «ayer», D-3/D-7, el Day-After de un hito y el reparto de vídeo corren sobre SEQ = F1 + el tramo 2 hasta la última desplazada (con la
//   reentrada T1 y el NBME 29 T2 en medio: la reentrada no es «día de contenido» y el NBME reparte su Day-After en las desplazadas).
const T2_DESPL = U.DIAS_T2.filter((x) => x.tipo === 'contenido' && /^DE F1 → TRAMO 2/.test(x.sub));
const SEQ = [...F1, ...(T2_DESPL.length ? U.DIAS_T2.filter((x) => x.t <= T2_DESPL[T2_DESPL.length - 1].t) : [])];
const IDX = new Map(SEQ.map((r, i) => [r.d, i]));
const filaD = (d) => SEQ[IDX.get(d)];
/** v6.05: fila con guía de CONTENIDO (F1 no-hito · desplazada del tramo 2): la reentrada T1 no cuenta como «ayer» */
const esCont = (r) => !!MF1[r.d];
/** k-ésima fila de CONTENIDO anterior (salta hitos y, en el tramo 2, la reentrada) · k = 1 → ayer de contenido */
function contAtras(r, k) { let c = 0; for (let i = IDX.get(r.d) - 1; i >= 0; i--) { if (esCont(SEQ[i])) { c++; if (c === k) return SEQ[i]; } } return null; }
/** ¿r es el n-ésimo día de plan tras un hito NBME (de F1 o, v6.05, el NBME 29 antes de las desplazadas) (n = 1..4)? */
function trasHito(r) { for (let n = 1, i = IDX.get(r.d) - 1; i >= 0 && n <= 4; i--, n++) if (esHito(SEQ[i])) return SEQ[i].d === 1 ? null : { hito: SEQ[i], n }; return null; }
/** v6.05: etiqueta de una fila en los textos (F1 «D7» · tramo 2 «T4», d = 100 + t) */
const etqD = (d) => (d > 100 ? `T${d - 100}` : `D${d}`);
const etq = (r) => etqD(r.d);
/** v6.05: texto del subtema sin el prefijo «DE F1 → TRAMO 2 (…) · » de las desplazadas (subV520 = texto v5.20 exacto) */
const txtSub = (r) => r.subV520 || r.sub;
const corto = (s, n = 70) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const S1 = (d) => d <= 5;
// v6.03 (20-oct): fechas DERIVADAS de las filas (D# → fecha) para los textos de la semana 1 y los avisos
const DD = (d) => filaD(d).fecha;
const fdc = (iso) => `${DOW[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${new Date(iso + 'T12:00:00Z').getUTCDate()}`; // «mié 21»
const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
/** «ayer» si a es el día natural anterior a b; si no (fin de semana en medio), «el vie 23-oct» */
const antesTxt = (a, b) => (diasEntre(a, b) === 1 ? 'ayer' : `el ${fd(a)}`);
/** «mañana» si b es el día natural siguiente a a; si no, «el lun 26-oct» */
const despuesTxt = (a, b) => (diasEntre(a, b) === 1 ? 'mañana' : `el ${fd(b)}`);
const mayus = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const sabadoTras = (iso) => { let t = new Date(iso + 'T12:00:00Z'); do { t = new Date(t.getTime() + 864e5); } while (t.getUTCDay() !== 6); return t.toISOString().slice(0, 10); };
// v6.03: el catálogo (MAPA, por D# v5.20) se lee por el ORIGEN de cada d de F1 (colocarF1: hitos anclados) → MF1[d]
const ORIGEN_F1 = require('./gen_tramo2').colocarF1(F1.length).enF1;
const MF1 = {};
for (const r of F1) {
  if (esHito(r)) continue;
  const o = ORIGEN_F1[r.d - 1];
  if (typeof o !== 'number' || !MAPA[o]) aborta(`D${r.d} (${r.fecha}): sin mapeo en guia_catalogo_f1.js (origen v5.20 ${o})`);
  MF1[r.d] = MAPA[o];
}
// v6.03: filas de F1 DESPLAZADAS al tramo 2 (T2_DESPL, arriba) · v6.05: su catálogo por su dOrig (= D# v5.20) y su guía en su fecha T con
//   la plantilla de F3 → solo F3 y sin partir (en F4 la plantilla es por turno): si no, aborta en vez de escribir una guía que no cuadra
for (const r of T2_DESPL) {
  if (!MAPA[r.dOrig]) aborta(`T${r.t} (${r.fecha}, v5.20 D${r.dOrig}): fila desplazada sin mapeo en guia_catalogo_f1.js`);
  if (r.fase !== 'F3' || r.parte) aborta(`T${r.t} (${r.fecha}): fila desplazada en ${r.fase}${r.parte ? ' parte ' + r.parte : ''} — la guía del tramo 2 solo tiene la plantilla de F3`);
  MF1[r.d] = MAPA[r.dOrig];
}
/** v6.05: filas del tramo 2 con guía = las desplazadas + el hito cuyo Day-After (Palmerton §9.2) cae en ellas (NBME 29, T2) */
const TG = [...new Set([...T2_DESPL.map((r) => trasHito(r)).filter(Boolean).map((th) => th.hito), ...T2_DESPL])].sort((a, b) => a.t - b.t);
for (const r of TG) if (esHito(r) && (r.fase !== 'F3' || !/\(07:00-12:30\)/.test(r.sub) || !/Form \d+/.test(r.uw))) aborta(`T${r.t} (${r.fecha}): hito con Day-After en las desplazadas fuera del formato NBME de F3 (07:00-12:30)`);
const CORTO_T2 = { 'Nervous System': 'Neuro', 'Hematology & Oncology': 'Heme/Onco', 'Psychiatry & Behavioral': 'bioestadística' };
// v6.03b · cabecera APEX del día (SUBTEMA = D# de 2 cifras + subtema uWorld en inglés; hitos: D# + forma) y presupuesto de tarjetas
const slugUW = (id) => {
  let s = (/\(([^()]*)\)\s*$/.exec(UWY.get(id).nombre) || [])[1] || UWY.get(id).nombre;
  s = s.replace(/^Normal (pulmonary )?structure and function(?: of the)? ?/i, (x, p) => `normal ${p || ''}`);
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40).replace(/_+$/, '');
};
const hitoSlug = (r) => (/UWSA1/.test(r.sub) ? 'uwsa1' : `nbme${(/NBME (\d+)/.exec(r.sub) || /Form (\d+)/.exec(r.uw || '') || [])[1]}`);
/** v6.05: número del SUBTEMA APEX = D# del plan en F1 · en el tramo 2, el D# v5.20 (dOrig: 47…79, NBME 29 = 65) — 2 cifras y único */
const dApex = (r) => (r.t ? r.dOrig : r.d);
const subApex = (r) => (esHito(r) ? `${nn(dApex(r))}_${hitoSlug(r)}` : `${nn(dApex(r))}_${slugUW(MF1[r.d].uw[0])}`);
const fuenteHito = (h) => (/UWSA/.test(h.sub) ? 'UWorld' : 'NBME');
const cabApex = (esp, sub, fuente, modo) => `EXAMEN: USMLE · ESPECIALIDAD: ${esp} · SUBTEMA: ${sub} · FUENTE: ${fuente} · MODO: ${modo} · IMAGEN: no`;
const ESP_PREG = '<sistema de la pregunta: Cardiology, Nephrology, Microbiology…>';
for (const r of [...F1, ...TG]) {
  if (esHito(r)) { if (!/^\d{2}_(uwsa1|nbme\d+)$/.test(subApex(r))) aborta(`${etq(r)}: SUBTEMA APEX del hito no derivable (${subApex(r)})`); continue; }
  if (!APEX_USMLE_TAGS.includes(espApex(r))) aborta(`${etq(r)}: ESPECIALIDAD APEX «${espApex(r)}» no está en los 44 tags del parser`);
  if (!/^\d{2}_[a-z][a-z0-9_]*$/.test(subApex(r))) aborta(`${etq(r)}: SUBTEMA APEX «${subApex(r)}» no cumple NN_lowercase`);
}
/** Reglas de redacción (Palmerton: frente «Subject - question», tuyo y exigente; resumen arriba si el reverso es largo; sin cloze). */
const R_FRENTE = 'FRENTE en inglés «Subject - question», escrito por ti, exigente y sin pistas; REVERSO «Summary:» 1 frase con el porqué (+ ≤2 líneas); CCSN = con qué no confundirlo; 1 idea por tarjeta, sin cloze';
const R_ENVIO = 'copia el BLOQUE APEX → Ctrl+Shift+A (o ⚡ APEX 1-TAP) → el toast ✓ = tarjeta en Anki + nota en Obsidian';
/** Ruta de cada error (Palmerton: Educational Objective como filtro; PC card si fallaste el diagnóstico; los errores de lectura no son de tarjeta). */
const R_ERROR = 'por cada incorrecta y cada acierto con duda, lee el Educational Objective y clasifica: K (no lo sabías) → 1 concept card del PRINCIPIO (abstraído: sin edad ni sexo del paciente) · no reconociste el diagnóstico → 1 PC card (cronología en presente, 4-6 pasos) · QI (lo sabías y leíste o interpretaste mal) → sin tarjeta: la micro-destreza al log de 📏 Medición. Filtro: «¿vale repasarlo a diario 6 meses?»; agotado el tope, el resto va a la shopping list';
/** Presupuesto de tarjetas NUEVAS del día (tope 20): primero las PC cards / tarjetas de experimento del Day-After, luego deep prime ≤10,
 *  luego consolidación (≤4/3/2 por nivel), luego la eval (≤5; comprimida ≤3; reducida del D4 ≤3). */
function presupuesto(r) {
  const d = r.d; const th = trasHito(r);
  const b0715 = d === 2 ? AK.exp + 3 : th && th.n === 1 ? AK.exp : 0;
  const da18 = d === 2 || d === 3 ? 3 : d === 4 ? 1 : th && th.n <= 4 ? DRILL[th.n].length : 0;
  const dp = AK.deepPrime; let resto = AK.topeDia - b0715 - da18 - dp;
  const nivel = S1(d) ? 1 : r.nivelUW;
  const con = Math.max(0, Math.min(AK.consol[nivel] ?? 2, resto)); resto -= con;
  const hayEval = d === 4 || d === 5 || (!S1(d) && !(th && th.n <= 3));
  const nomEval = d === 4 ? AK.evalRed : th && th.n === 4 ? AK.evalComp : AK.eval;
  const ev = hayEval ? Math.max(0, Math.min(nomEval, resto)) : 0;
  return { b0715, da18, dp, con, ev, total: b0715 + da18 + dp + con + ev };
}
/** Textos de tarjeta por bloque (v6.03b): PC card y tarjeta de experimento del Day-After (h = fila del hito), revisión de la consolidación
 *  y corrección de la eval (k = cuántas tarjetas caben hoy según `presupuesto`). Lo que cambia por día (la cabecera) va en el «qué»; el
 *  «cómo» es fijo para que el .ts generado lo guarde una sola vez. */
const cabCorta = (esp, sub, fuente, modo) => `ESPECIALIDAD ${esp} · SUBTEMA ${sub} · FUENTE ${fuente} · MODO ${modo}`;
const pcCardTxt = (h) => `→ 1 PC card por pregunta, por APEX (${cabApex(ESP_PREG, subApex(h), fuenteHito(h), 'simulacro_step1')}): FRENTE «<diagnosis> - pathophysiologic chronology from the root cause to the presenting finding?» · REVERSO = la cadena en presente, 4-6 pasos unidos con «→» · ${R_ENVIO}.`;
const expCardTxt = (h) => `por APEX (${cabApex(ESP_PREG, subApex(h), fuenteHito(h), 'simulacro_step1')}): FRENTE «<experiment or graph> - what was manipulated, what was measured and what does the result predict?» · REVERSO «Summary:» con el principio que lo explica · ${R_ENVIO}.`;
const nTarj = (k) => `${k} tarjeta${k === 1 ? '' : 's'}`;
const COMO_ERR = `${mayus(R_ERROR)}. ${mayus(R_FRENTE)} · ${R_ENVIO} (cabecera: EXAMEN: USMLE + los campos del título del paso + IMAGEN: no).`;
function revCon(r, min, k, fuente) {
  if (k <= 0) return P(min, `Revisión: Educational Objective + log de errores (hoy 0 tarjetas: el tope de ${AK.topeDia} ya lo cubren el Day-After y el deep prime)`, 'Cada fallo: knowledge / transfer / proceso → 📏 Medición (consolidación %); lo que merecería tarjeta va a la shopping list.');
  return P(min, `Revisión: Educational Objective → ≤${nTarj(k)} APEX + log de errores (tope del día ${AK.topeDia}) · ${cabCorta(espApex(r), subApex(r), fuente, 'estudio')}`, `${COMO_ERR}${fuente === 'UWorld' ? ' Si la pregunta es de Mehlman: FUENTE mix_examen_usmle.' : ''} Consolidación % y tipo de error (knowledge / transfer / proceso) → 📏 Medición.`);
}
function corrEval(r, min, k) {
  return P(min, `Corrección: Educational Objective + tipo de error + ≤${nTarj(k)} APEX · ${cabCorta('= sistema de la pregunta', `${nn(dApex(r))}_eval`, 'UWorld', 'estudio')}`, COMO_ERR);
}
/** Submazos APEX que usa el F1 (orden de aparición) y el sábado del «Optimize» FSRS del preset (1.er sábado ≥ 28 días tras el D1). */
const F1_DECKS = [...new Set(F1.filter((r) => !esHito(r)).map(espApex))];
const SAB_OPT = (() => { let t = new Date(F1[0].fecha + 'T12:00:00Z'); t = new Date(t.getTime() + 28 * 864e5); while (t.getUTCDay() !== 6) t = new Date(t.getTime() + 864e5); return t.toISOString().slice(0, 10); })();
const TRAMO2_TXT = T2_DESPL.length ? `TRAMO 2 (T${T2_DESPL[0].t} ${fd(T2_DESPL[0].fecha)}, cuando siguen las filas desplazadas de F1: ${[...new Set(T2_DESPL.map((x) => CORTO_T2[x.system] || x.system))].join(' → ')})` : 'TRAMO 2';

// ── 1) REPARTO DE VÍDEO (cola) ────────────────────────────────────────────────────────────────────────────────────────────────────
// Capacidad de vídeo real por franja: 05:00 solo del D3 al D5 (mazo casi vacío) · 07:15 «vídeo pendiente» ≤30′ (no el día siguiente a
// un hito: Day-After) · deep prime 09:00 ≤70′. El tema NUEVO solo entra a partir del deep prime (después del pre-test ciego).
const CAP = { s0500: (d) => (d >= 3 && d <= 5 ? 30 : 0), s0715: (d) => (d === 2 ? 0 : trasHito(filaD(d))?.n === 1 ? 0 : 30), s0900: () => 70 };
const colaBB = []; const colaPalm = []; // ítems: { tipo, id, ini, fin, dOrig } (ini/fin en segundos del vídeo)
/** v6.02c F2 (E6): Palmerton de MÉTODO adelantados al D1 (el día del UWSA1; v6.03: mié 21-oct) — FSRS (era del D3) y «The ONLY video» (era del D2) — con la
 *  MISMA regla de minutos que los B&B (duración ÷ 1,0 × 1,2 por las pausas para anotar). Lo que no cabe en las franjas del D1 va a la
 *  cabeza de la cola (delante de los B&B: es lo pendiente más antiguo) y se ve, partido por minutos, en la siguiente franja de vídeo. */
const colaMetodo = [];
const METODO = {
  Te5RnxeG_Gg: { dPlan: 3, como: 'se adelanta a hoy porque FSRS se configura ANTES de la primera tarjeta (era el vídeo del D3, «setup Anki FSRS»): pausa y anota los 8 cambios' },
  BOtQJeFE_rc: { dPlan: 2, como: `era el vídeo del D2: se adelanta al D1 (${fd(DD(1))}) para aliviar el D2 (${fd(DD(2))}: Day-After + lesión celular) · pausa y anota 5 ideas` },
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
// D1 (día del UWSA1): 05:00 = mazos 4′ + vídeo FSRS + preset ≥10′ → 31′ de vídeo real · 07:55-08:50 = vídeo(s) + peor escenario 12′ +
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
/** Reparto de vídeo de un día de contenido (F1 o, v6.05, una desplazada del tramo 2: mismas capacidades por franja). */
function repartoDia(r) {
  const d = r.d; const m = MF1[d]; const rep = { s0500: [], s0715: [], s0900: [], desborde: [] }; REP[d] = rep;
  if (CAP.s0500(d)) llenarDesdeCola(d, CAP.s0500(d), rep.s0500);
  if (CAP.s0715(d)) llenarDesdeCola(d, CAP.s0715(d), rep.s0715);
  let libre = CAP.s0900(d); const hoy = m.bb.map((id) => item('bb', id, d)); const pend = [];
  for (const it of hoy) {
    if (pend.length) { pend.push(it); continue; }
    const r2 = colocar(it, d, libre, rep.s0900); libre -= r2.usado;
    if (r2.resto) pend.push(r2.resto);
  }
  rep.desborde = pend.map((x) => ({ ...x })); colaBB.push(...pend);
  if (r.palm && d > 3 && PALM[r.palm.id]) colaPalm.push(item('palm', r.palm.id, d)); // D2/D3: sus Palmerton se adelantan al D1 (día del UWSA1)
  if (libre >= MIN_TRAMO) llenarDesdeCola(d, libre, rep.s0900, d);
  rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) };
}
for (const r of F1) if (r.d !== 1 && !esHito(r)) repartoDia(r);
/** Cola de vídeo al cierre de F1 (META.colaAlCierreF1): v6.05 → se ve en el tramo 2 (abajo); su destino exacto sale de DONDE. */
const COLA_F1 = { bb: colaBB.map((it) => ({ ...it })), palm: [...colaMetodo, ...colaPalm].map((it) => ({ ...it })) };
// v6.05 (24-oct, verificación adversarial): la cola NO se queda sin día. Sigue, en orden y partida por minutos, en las desplazadas del tramo 2
//   (07:15 «vídeo pendiente» ≤30′ salvo el día siguiente a un hito · hueco del deep prime 09:00), con su vídeo propio delante, como en F1…
for (const r of SEQ.slice(F1.length)) if (esCont(r)) repartoDia(r);
//   … y lo que quede tras la última desplazada, en el «vídeo pendiente» 07:15-07:45 de las filas siguientes del tramo 2 (F3; nunca el día de un
//   hito ni el siguiente) hasta vaciarla. Si no se vacía en F3, ABORTA (nada se recorta ni se queda sin fecha).
const CAP_COLA = 25; // minutos reales de vídeo en la franja 07:15-07:45 de un día de cola (+ ≥5′ de free recall)
const COLA_DIAS = [];
{
  const quedan = () => colaMetodo.length + colaBB.length + colaPalm.length;
  const ultT = SEQ.length > F1.length ? SEQ[SEQ.length - 1].t : 0;
  for (const r of U.DIAS_T2.filter((x) => x.t > ultT)) {
    if (!quedan()) break;
    if (r.fase !== 'F3') aborta(`la cola de vídeo de las desplazadas no se vacía en F3 (quedan ${minCola(colaBB)}′ de B&B + ${minCola(colaMetodo) + minCola(colaPalm)}′ de Palmerton al llegar a T${r.t} ${r.fecha}, ${r.fase})`);
    const prevT = U.DIAS_T2[r.t - 2];
    if (r.tipo === 'hito' || r.tipo === 'day_after' || (prevT && prevT.tipo === 'hito')) continue;
    const rep = { s0500: [], s0715: [], s0900: [], desborde: [], colaDia: true }; REP[r.d] = rep;
    llenarDesdeCola(r.d, CAP_COLA, rep.s0715);
    if (!rep.s0715.length) aborta(`T${r.t} ${r.fecha}: el día de cola no admite ni un tramo de vídeo`);
    rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) };
    COLA_DIAS.push(r);
  }
  if (quedan()) aborta('la cola de vídeo no se vacía en el tramo 2');
}
/** Cola al cierre de la guía (F1 + desplazadas + días de cola): SIEMPRE vacía (si no, arriba se abortó). */
const COLA_FINAL = { bb: colaBB.map((it) => ({ ...it })), palm: [...colaMetodo, ...colaPalm].map((it) => ({ ...it })) };
/** Dónde cae cada tramo de vídeo (para avisar «pasa a …»). */
const DONDE = []; // { d, slot, it }
for (const [d, rep] of Object.entries(REP)) for (const slot of ['s0500', 's0715', 's0900']) for (const it of rep[slot]) DONDE.push({ d: Number(d), slot, it });
const SLOT_TXT = { s0500: '05:00', s0715: '07:15', s0900: '09:00' };
/** fecha de un d con reparto (F1, desplazada o día de cola del tramo 2) */
const FECHA_D = (d) => (filaD(d) || U.DIAS_T2.find((x) => x.d === d)).fecha;
function destinoDe(it) {
  const xs = DONDE.filter((x) => x.it.tipo === it.tipo && x.it.id === it.id && x.it.dOrig === it.dOrig && x.it.fin > it.ini && x.it.ini < it.fin);
  // v6.05: con la cola vaciada en el tramo 2 todo tramo tiene franja; si no, es un error del reparto (antes: «→ TRAMO 2 (…)» sin día)
  if (!xs.length) { ERR.push(`vídeo sin franja: ${it.tipo === 'bb' ? bbRuta(it.id) : PALM[it.id].t} ${it.ini}-${it.fin}s (${etqD(it.dOrig)})`); return TRAMO2_TXT; }
  // v6.05 (24-oct): si una parte del vídeo sigue en la cola al cierre de F1 (COLA_FINAL), el aviso lo dice con su tramo (antes solo se
  //   nombraban las franjas donde SÍ cabía: con F1 = 47 el Palmerton Neuro Part 2 del D45 se ve 0:00-39:00 el D46 y el resto va al tramo 2)
  const resto = [...COLA_FINAL.bb, ...COLA_FINAL.palm].find((x) => x.tipo === it.tipo && x.id === it.id && x.dOrig === it.dOrig && x.fin > it.ini && x.ini < it.fin);
  const fmt = it.tipo === 'bb' ? mmss : hms;
  return xs.map((x) => `${etqD(x.d)} ${fd(FECHA_D(x.d))} ${SLOT_TXT[x.slot]}`).join(' + ') + (resto ? ` + el resto (${fmt(resto.ini)}→${fmt(resto.fin)}) → ${TRAMO2_TXT}` : '');
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
const uwDe = (d) => (MF1[d] ? MF1[d].uw : []);
function sistemasSoFar(r) { // Systems del mismo sistema del plan hasta hoy (hoy primero, luego hacia atrás)
  const out = [...uwDe(r.d)];
  for (let i = IDX.get(r.d) - 1; i >= 0; i--) { const x = SEQ[i]; if (esHito(x)) continue; if (x.system !== r.system) break; for (const id of uwDe(x.d)) if (!out.includes(id)) out.push(id); }
  return out;
}
for (const r of SEQ) { // v6.05: F1 y después las desplazadas del tramo 2 (el pool de uWorld sigue gastándose en orden)
  if (r.d === 1 || esHito(r) || !esCont(r)) continue;
  const d = r.d; const hoy = uwDe(d); const q = { val: 0, pre: 0, con: 0, ev: 0, dispAntes: disp(hoy), deficit: 0 };
  const th = trasHito(r); const prev = contAtras(r, 1);
  VISTOS_ANTES[d] = [...vistos];
  if (d === 2) { q.pre = tomar(hoy, 8); }
  else if (d === 3) { q.pre = tomar(hoy, 10); }
  else if (d === 4) { q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([1112, 1072, 1004], 5); }
  else if (d === 5) { q.val = tomar([1004], 5); q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([...vistos].sort((a, b) => POOL.get(b) - POOL.get(a)), 5); }
  else {
    if (prev && !(th && th.n === 1)) q.val = tomar(uwDe(prev.d), 5);
    const necesita = 10 + (r.nivelUW === 1 ? 20 : r.nivelUW === 3 || r.nivelUW === 4 ? 10 : 0);
    q.deficit = Math.max(0, necesita - q.dispAntes);
    q.pre = tomar(hoy, 10);
    if (r.nivelUW === 1) q.con = tomar(hoy, 20);
    else if (r.nivelUW === 2) q.con = tomar(prev ? uwDe(prev.d) : [], 5) + tomar(sistemasSoFar(r), 25);
    else if (r.nivelUW === 4) q.con = tomar([...vistos].filter((x) => !hoy.includes(x)).sort((a, b) => POOL.get(b) - POOL.get(a)), 20) + tomar(hoy, 10); // v6.05: viernes N4 (mixtos)
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
const respaldo = (d, n) => (MF1[d] && MF1[d].mh && MF1[d].mh.length
  ? `Si el composer muestra < ${n} Unused en esos Systems: haz las que haya y completa con Mehlman (QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank) → ${MF1[d].mh.map(mhNom).join(' + ')}, mismo modo; después vuelve a uWorld. Nunca preguntas de otro tema.`
  : 'Si no hay Unused suficientes: las que haya + Status Incorrect del mismo System; nunca preguntas de otro tema.');

function pasosVideo(d, arr) {
  return arr.map((it) => {
    const vv = vel(d);
    if (it.tipo === 'bb') {
      const v = BB.get(it.id); const entero = it.ini === 0 && it.fin === v.s;
      const tramo = entero ? `(${mmss(v.s)})` : `de ${mmss(it.ini)} a ${mmss(it.fin)} (dura ${mmss(v.s)}; Qbankly guarda el minuto)`;
      return P(it.min, `${bbRuta(it.id)} ${tramo}`, `${vv.txt}${it.dOrig !== d ? ` · PENDIENTE del ${etqD(it.dOrig)}` : ''} · pausa y anota cada idea en 1 línea (patogenia → presentación)`, { t: 'Video Library (B&B Step 1)', url: QBV });
    }
    const p = PALM[it.id];
    const entero = it.ini === 0 && it.fin === p.s;
    const tramo = entero ? `(${hms(p.s)})` : `de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`;
    const coma = (x) => (Number.isInteger(x) ? `${x},0` : String(x).replace('.', ','));
    const minTxt = `${it.min}′ = ${Math.round((it.fin - it.ini) / 60)} min de vídeo ÷ ${coma(vv.v)} × ${coma(vv.f)} por las pausas`;
    const sigue = it.ini ? (it.dOrig !== d ? ` · PENDIENTE del ${etqD(it.dOrig)}: sigue desde el minuto ${hms(it.ini)}` : ` · sigue desde el minuto ${hms(it.ini)} (lo empezaste antes, hoy)`) : '';
    if (METODO[it.id]) return P(it.min, `Palmerton · «${p.t}» ${tramo}`, `YouTube · ${vv.txt}${sigue} · ${METODO[it.id].como} · ${minTxt}`, { t: it.ini ? 'YouTube (desde ese minuto)' : 'YouTube', url: yt(it.id, it.ini) });
    return P(it.min, `Palmerton · «${p.t}» de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`, `YouTube a ${String(vv.v).replace('.', ',')}× con subtítulos · visión del sistema (${etqD(it.dOrig)}): escucha y anota 3 ideas; sin tarjetas`, { t: 'YouTube (desde ese minuto)', url: yt(it.id, it.ini) });
  });
}
const recVideo = (arr) => arr.map((it) => (it.tipo === 'bb' ? { t: bbRuta(it.id), url: QBV, min: Math.round(BB.get(it.id).s / 60) } : { t: `Palmerton · ${PALM[it.id].t}`, url: yt(it.id, it.ini), min: Math.round(PALM[it.id].s / 60) }));
const libTxt = (d, n) => MF1[d].lib.slice(0, n).map(([e, doc]) => libNom(e, doc)).join(' + ');
const recLib = (d) => MF1[d].lib.map(([e, doc], i) => ({ t: `${libNom(e, doc)}${i < 2 ? '' : ' (si sobra tiempo)'}`, url: lib(e, doc) }));
const pathomaTxt = (d) => (MF1[d].pathoma ? ` · Pathoma ${MF1[d].pathoma.map((c) => `cap. ${c} (${PATHOMA[c]})`).join(' + ')} SOLO si tienes cuenta` : '');

// ANKI 05:00
function anki0500(r) {
  const d = r.d; const f = r.fecha; const rep = REP[d];
  const i = IDX.get(d); const prevPlan = i > 0 ? SEQ[i - 1] : null;
  const creadas = prevPlan ? (antesTxt(prevPlan.fecha, f) === 'ayer' ? 'ayer' : `el ${fd(prevPlan.fecha)}`) : 'ayer';
  if (S1(d) && rep && rep.s0500.length) {
    const vids = pasosVideo(d, rep.s0500); const V = vids.reduce((a, p) => a + p.min, 0);
    const pr = contAtras(r, 1); const nuevasDe = pr && antesTxt(pr.fecha, f) !== 'ayer' ? `las del ${fd(pr.fecha)}` : 'las de ayer';
    return B(f, '05:00–05:45', 'ANKI AM (mazo casi vacío) + vídeo pendiente', [
      P(10, 'Anki: TODAS las vencidas de APEX::USMLE (mazo PADRE: junta todos los submazos) y después las nuevas', `Sync → APEX::USMLE › Study Now · vencidas primero · responde en voz alta antes de girar · Good ≈90 % (recordaste la lógica central) / Again solo si la olvidaste · nunca Hard/Easy · nuevas: ${nuevasDe} (preset ${AK.nuevasDia}/día).`),
      ...vids,
      P(45 - 10 - V, 'Free recall de lo que acabas de ver + resto de Anki', 'Sin mirar: 90 s por vídeo, escribe la cadena causal; si quedan vencidas, termínalas. Sync al cerrar.'),
    ], [...recVideo(rep.s0500), R_ANKI], '0 vencidas en APEX::USMLE + el vídeo pendiente visto y resumido', { planB: 'Si Anki pide más de 15′, el vídeo pasa a las 07:15 (Anki primero, siempre).' });
  }
  const hito = esHito(r);
  return B(f, '05:00–05:45', `ANKI AM · cola FSRS de APEX::USMLE${hito ? ' (antes del hito)' : ''}`, [
    P(2, 'Sync + APEX::USMLE (mazo PADRE) › Study Now', `Anki escritorio · un solo clic en el padre: Anki junta todos los submazos (Pharm incluido). Si la telemetría de ayer dio ALARMA G (backlog > 100 o retención < 85 %) → hoy PROTOCOLO DE BACKLOG (${METODO_MD} §7): New cards/day 0 · Maximum reviews/day 200.`),
    P(33, 'VENCIDAS primero (reviews first) · sin tope (Maximum reviews/day 9999)', 'Lee el frente, responde EN VOZ ALTA y gira: Good si recordaste la lógica central (≈90 %, no palabra por palabra) · Again solo si la olvidaste (≈10 %) · nunca Hard/Easy · lee primero la línea «Summary:» (20-30 s por tarjeta).'),
    P(8, `NUEVAS: las APEX que creaste ${creadas} (preset ${AK.nuevasDia}/día)`, hito
      ? 'Solo si las vencidas llegaron a 0; si no, nuevas = 0 hoy (esperan en la cola). Hoy NO se crean tarjetas: el NBME se corrige desde las 18:00 (Day-After).'
      : 'Solo si las vencidas llegaron a 0. Si a las 05:37 aún quedan vencidas: nuevas = 0 hoy (esperan en la cola) y las vencidas que falten van al primer «Anki restante» (07:15) o mañana a las 05:00, siempre antes que nuevas.'),
    P(2, 'Sync final + telemetría', 'Sync · node DATA/_scripts/anki_telemetria.js → due · backlog · retención 30 d · % Again (sano ≈10 %; > 20 % = tarjetas largas o perfeccionismo → divídelas; ≈0 % = no te estás examinando).'),
  ], [R_ANKI], '0 vencidas en APEX::USMLE (las nuevas solo después) y la telemetría registrada', { planB: 'Anki escritorio no abre → AnkiWeb/AnkiDroid solo para repasar; nunca «Forget» ni resetear el mazo (borra el historial del algoritmo).' });
}

// REPASO 07:15 (genérico D6+)
function repaso0715(r) {
  const d = r.d; const f = r.fecha; const prev = contAtras(r, 1); const rep = REP[d]; const d3 = contAtras(r, 3); const d7 = contAtras(r, 7);
  const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0);
  // v6.05: en el tramo 2, «ayer» solo si la última sesión de contenido fue el día natural anterior (p. ej. Semana Santa: T7 mié 24 → T8 lun 29-mar)
  const lejos = r.t && antesTxt(prev.fecha, f) !== 'ayer';
  const pasos = [
    P(10, `Shopping list + free recall de ${lejos ? `la ÚLTIMA SESIÓN (${fd(prev.fecha)})` : 'AYER'}: «${corto(txtSub(prev), 80)}» (${etq(prev)})`, `Lee tus notas de 📏 Medición ${lejos ? `del ${fd(prev.fecha)}` : 'de ayer'}; después, SIN mirar, escribe en 90 s la cadena causal del subtema y marca lo que no salió.`),
    P(10, lejos ? `5Q TIMED del subtema del ${fd(prev.fecha)} (validación a los ${diasEntre(prev.fecha, f)} días · 1.ª mitad del gate de 10Q)` : '5Q TIMED del subtema de ayer (validación 24-48 h · 1.ª mitad del gate de 10Q)', tcUW(uwDe(prev.d), 5, TIMED), L_UW),
    ...vids,
  ];
  const resto = 60 - 20 - V;
  const dd = [d3 && ['D-3', d3], d7 && ['D-7', d7]].filter(Boolean);
  if (resto > 0) pasos.push(P(resto, `${dd.map((x) => x[0]).join(' / ')}: free recall de ${dd.map((x) => `«${corto(txtSub(x[1]), 50)}» (${etq(x[1])})`).join(' y ')} + Anki restante`, 'Sin mirar: 3 ideas de cada uno; lo que salga < 60 % → busca sus tarjetas y márcalas Again. Si quedaron vencidas a las 05:00, termínalas aquí.'));
  return B(f, '07:15–08:15', `REPASO ANCLADO · validación del ${etq(prev)}${V ? ' + vídeo pendiente' : ''}`, pasos, [R_UW, ...recVideo(rep.s0715)], '5Q hechas (≥4/5 → subtema de ayer validado; <4/5 → 5Q más de ese System en la consolidación) y el free recall escrito', { planB: respaldo(prev.d, 5) });
}

// PRE-TEST 08:15 (genérico D6+)
function pretest(r) {
  const d = r.d; const q = QS[d]; const hoy = uwDe(d);
  return B(r.fecha, '08:15–09:00', `PRE-TEST · 10Q ciegas · ${corto(txtSub(r), 60)}`, [
    P(3, `Armar: ${hoy.map(uwNom).join(' + ')}`, tcUW(hoy, 10, TUTOR), L_UW),
    P(30, '10Q ciegas del tema NUEVO (sin haber visto nada de hoy)', 'SAQ (pregunta autónoma) antes de mirar las opciones + CCSN; después lee la explicación entera (~3′ por pregunta).'),
    P(12, 'Free recall 90 s + shopping list', 'Escribe sin mirar lo que ya sabes del tema; cada duda, también en los aciertos, a la shopping list de 📏 Medición (pre-test /10).'),
  ], [R_UW], 'nota /10 en 📏 Medición (40-60 % es normal: es diagnóstico, no gate)', { planB: respaldo(d, 10), aviso: q.deficit ? `Según este plan, a estos Systems de uWorld les quedan ~${q.dispAntes} Unused antes de hoy y el día pide ${q.dispAntes + q.deficit} (pre-test + consolidación): cuando el composer se quede corto, usa el respaldo de abajo (Mehlman).` : undefined });
}

// DEEP PRIME 09:00
function deepPrime(r) {
  const d = r.d; const m = MF1[d]; const rep = REP[d];
  const vids = pasosVideo(d, rep.s0900); const V = vids.reduce((a, p) => a + p.min, 0);
  const L = 95 - V; const nDocs = Math.min(m.lib.length, L >= 45 ? 4 : L >= 35 ? 3 : 2);
  const pasos = [
    ...vids,
    P(L, `Lectura activa: ${libTxt(d, nDocs)} + First Aid 2026 › ${m.fa}${pathomaTxt(d)}`, `Whole Page Rule: la sección completa, no solo el dato; 3-5 puntos high-yield a mano + 1 esquema.${m.lib.length > nDocs ? ` Si sobra tiempo: ${m.lib.slice(nDocs).map(([e, doc]) => libNom(e, doc)).join(' · ')}.` : ''}`, { t: libNom(m.lib[0][0], m.lib[0][1]).replace(/^[^·]*· /, ''), url: lib(m.lib[0][0], m.lib[0][1]) }),
    P(18, `≤${AK.deepPrime} tarjetas APEX de la sección que acabas de leer/ver → ${deckApex(r)} (Whole Page Rule: toda la sección, no solo el dato)`, `Antes de cada una, EN VOZ ALTA: patogenia → presentación → cómo se conectan. Tipos: concept («use the pathophysiology to explain…») · P-to-P · compare & contrast · transfer (dato o lab → estado fisiopatológico).${r.matType === 'pharm' ? ' Día Pharm: 1 tarjeta por CLASE con el mecanismo que explica uso y toxicidad (Palmerton agrupa los efectos adversos por mecanismo); la pregunta inversa (efecto → fármaco) solo si se evalúa, como 2.º bloque.' : ''} ${mayus(R_FRENTE)}.`),
    P(2, `Envío APEX · cabecera: EXAMEN: USMLE · ${cabCorta(espApex(r), subApex(r), 'First_Aid', 'estudio')} · IMAGEN: no${deckDe(r) !== deckApex(r) ? ` (la app muestra ${deckDe(r)}; ${/::General$/.test(deckDe(r)) ? 'el motor APEX no acepta «General»' : `la bioestadística va a ::${espApex(r)}, su tag APEX`})` : ''}`, `${mayus(R_ENVIO)}. Si el toast falla, el bloque queda en la cola de ⚡ APEX 1-TAP: nunca lo pases a mano a otro mazo. Las tarjetas de IMAGEN (ECG, histología, TC) no van por APEX (el motor pone la imagen en el reverso): créalas en Anki escritorio en el submazo del día, con la imagen en el frente.`),
    P(5, 'Free recall final (sin mirar)', 'Dibuja la cadena causal del día en 1 hoja; compárala con tus notas y corrige en rojo.'),
  ];
  const avisos = [];
  if (m.nota) avisos.push(m.nota);
  if (rep.desborde.length) avisos.push(`A ${vel(d).txt.split(' (')[0]} no cabe todo en 70′ de vídeo: ${rep.desborde.map((it) => `${it.tipo === 'bb' ? BB.get(it.id).nombre : PALM[it.id].t}${it.ini ? ` (desde ${mmss(it.ini)})` : ''} → ${destinoDe(it)}`).join(' · ')}. No se recorta: se ve en esas franjas.`);
  if (r.palm && d > 3) { const it = { tipo: 'palm', id: r.palm.id, ini: 0, fin: PALM[r.palm.id].s, dOrig: d }; avisos.push(`Palmerton «${PALM[r.palm.id].t}» (${hms(PALM[r.palm.id].s)}, visión del sistema) entra a la cola detrás de los B&B → ${destinoDe(it)}.`); }
  if (r.t) avisos.unshift(`Fila DESPLAZADA de F1 (era v5.20 D${r.dOrig}): la misma guía que tenía en F1, con las franjas de F3 (07:15-12:00 · 16:15 REENTRADA · 18:00).`); // v6.05
  return B(r.fecha, '09:00–11:00', `DEEP PRIME · ${corto(txtSub(r), 70)}`, pasos, [R_VID, ...recVideo(rep.s0900), ...recLib(d)], `vídeo(s) de arriba vistos, lectura con 3-5 puntos a mano y ≤${AK.deepPrime} tarjetas APEX confirmadas (toast ✓) en ${deckApex(r)}`, { planB: 'Qbankly caído → misma sección en First Aid (libro) y la lectura de la Library cuando vuelva. Pathoma: sin cuenta en el repo (pathoma.com: Free = 6 vídeos de prueba 1 mes; Pro desde US$84,95 con libro en papel, sin PDF) → la Library lo cubre.', aviso: avisos.join(' ') || undefined });
}

// CONSOLIDACIÓN 11:00 por nivel (genérico D6+)
function consolidacion(r) {
  const d = r.d; const hoy = uwDe(d); const prev = contAtras(r, 1); const n = r.nivelUW; const m = MF1[d];
  const sub = m.uwSub ? ` · si se acaban: Subject «${UWS.get(m.uwSub[0]).nombre}» ∩ ${m.uwSub[1].map(uwNom).join(' + ')} = ${m.uwSub[1].reduce((a, y) => a + MAT.get(`${m.uwSub[0]}:${y}`), 0)}Q (matriz real del composer)` : '';
  let pasos; let titulo;
  if (n === 1) {
    titulo = 'CONSOLIDACIÓN · nivel 1 · 20Q Tutor del subtema';
    pasos = [
      P(2, 'Armar bloques de 5Q', tcUW(hoy, 5, TUTOR) + sub, L_UW),
      P(40, '4 bloques de 5Q en Tutor (20Q)', '≈2′ por pregunta + su explicación; corrige cada bloque antes del siguiente.'),
      revCon(r, 15, presupuesto(r).con, 'UWorld'),
      P(3, 'Gate del día', '≥80 % en 10 consecutivas → validado (mañana 07:15: 5Q timed) · <80 % → mañana a las 07:15 repites 5Q del subtema; NO avances de nivel.'),
    ];
  } else if (n === 2) {
    titulo = 'CONSOLIDACIÓN · nivel 2 · 30Q TIMED en bloques de 5';
    const sf = sistemasSoFar(r);
    pasos = [
      P(2, 'Armar bloques de 5Q TIMED', `${tcUW(sf, 5, TIMED)} · el 1.er bloque = 5Q de ayer (${uwDe(prev.d).map(uwNom).join(' + ')}) = 2.ª mitad del gate${sub}`, L_UW),
      P(45, '6 bloques de 5Q TIMED (30Q)', 'Cronómetro 2:00 por pregunta (si suena: adivina, flag, sigue) · cover-the-options · juez, no abogado.'),
      revCon(r, 11, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥80 % → mañana sube el subtema · <80 % → mañana a las 07:15 repites 5Q del subtema fallado.'),
    ];
  } else if (n === 4) { // v6.05: viernes N4 del tramo 2 (franjaNota «VIERNES NIVEL 4»; en F1 no hay: viernesN4DesdeSemana = 11)
    titulo = 'CONSOLIDACIÓN · nivel 4 (viernes) · 20Q MIXTOS timed + 10Q Tutor del subtema';
    const mix = (VISTOS_ANTES[d] || []).filter((x) => !hoy.includes(x));
    pasos = [
      P(2, 'Armar los 2 tests en el Test Composer', `20Q: QBanks › «uWorld - USMLE Step 1» › New Test → Systems: los ${mix.length} ya vistos de los sistemas dominados (no el de hoy) · Subjects todos · Status Unused · 20 · Timed → BEGIN · luego 10Q: ${hoy.map(uwNom).join(' + ')} · Tutor`, L_UW),
      P(30, '20Q MIXTOS TIMED (≥3 sistemas ya dominados)', 'Cronómetro 2:00 por pregunta; saltar entre especialidades sin aviso (eso es el nivel 4); flag y sigue.'),
      P(20, '10Q Tutor del subtema de hoy', 'Con explicación; cada fallo a la shopping list.'),
      revCon(r, 6, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate N4', '≥80 % en los 20Q mixtos timed → listo para mezclar sistemas · <80 % → el sistema más flojo del bloque, al colchón más próximo.'),
    ];
  } else {
    titulo = 'CONSOLIDACIÓN · nivel 3 · 20Q del SISTEMA timed + 10Q Tutor';
    const org = sistemasOrgano(hoy[0]);
    pasos = [
      P(2, 'Armar el test en el Test Composer', `20Q: QBanks › «uWorld - USMLE Step 1» › New Test → Systems: TODOS los de «${organoDe(hoy[0])}» (${org.length} Systems) · Subjects todos · Status Unused · 20 · Timed → BEGIN · luego 10Q: ${hoy.map(uwNom).join(' + ')} · Tutor`, L_UW),
      P(30, '20Q del sistema completo TIMED (sin saber el subtema)', 'Cronómetro 2:00 por pregunta; flag y sigue.'),
      P(20, '10Q Tutor del subtema de hoy', 'Con explicación; cada fallo a la shopping list.'),
      revCon(r, 6, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate N3', '≥80 % en las 20Q timed del sistema → el sistema queda «vivo» · <80 % → al colchón del tramo 2 (sistema débil).'),
    ];
  }
  return B(r.fecha, '11:00–12:00', titulo, pasos, [R_UW], `${n === 1 ? '20Q' : n === 2 ? '30Q timed' : n === 4 ? '30Q (20 mixtas timed + 10 tutor)' : '30Q (20 timed + 10 tutor)'} hechas, % y tipo de error en 📏 Medición y el gate marcado ✓/✗`, { planB: respaldo(d, n === 1 ? 20 : 30) });
}

// EVAL 18:00 (genérico)
function pasosEval(r, comprimido) {
  const ids = [...(VISTOS_ANTES[r.d] || []), ...uwDe(r.d).filter((x) => !(VISTOS_ANTES[r.d] || []).includes(x))];
  const txtSis = `los ${ids.length} Systems ya vistos (los de hoy: ${uwDe(r.d).map((id) => `«${UWY.get(id).nombre}»`).join(', ')}; más los de ${r.t ? 'F1 y de las filas desplazadas anteriores' : 'los días anteriores de F1'})`;
  if (comprimido) return [
    P(1, 'Armar 10Q mixtas TIMED', `QBanks › uWorld › New Test → Systems: ${txtSis} · Status Unused · 10 · Timed`, L_UW),
    P(15, '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · sin cambiar respuestas salvo error de lectura.'),
    corrEval(r, 12, presupuesto(r).ev),
    P(2, 'Registrar eval % + horas netas del día', '📏 Medición.'),
  ];
  return [
    P(2, 'Armar 10Q mixtas TIMED de lo ya visto', `QBanks › uWorld › New Test → Systems: ${txtSis} · Subjects todos · Status Unused · 10 · Timed`, L_UW),
    P(15, '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · juez, no abogado · cuenta las respuestas cambiadas y las relecturas.'),
    corrEval(r, 23, presupuesto(r).ev),
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
  const pasos = [P(dr.length * 15, `Drill de cronología del ${nom}: pregunta${dr.length > 1 ? 's' : ''} ${dr.join(', ')} de 10 (las falladas más largas y con más labs)`, `15′ cada una: reescribe A MANO el caso en orden cronológico estricto y en presente ${pcCardTxt(th.hito)}`)];
  if (th.n === 4) pasos.push(...pasosEval(r, true));
  return B(r.fecha, '18:00–18:45', `DAY-AFTER ${nom} · ${th.n + 2}/6 — drill de cronología${th.n === 4 ? ' + eval 10Q' : ''}`, pasos, [R_UW], th.n === 4 ? '10/10 PC cards del drill y la eval de 10Q registrada' : `${dr.length} PC cards más`, { aviso: th.n === 1 ? `Day-After del ${nom} (Palmerton §9.2, ~4 h) repartido: 18:00 del hito (registro + trayectoria + auditoría) · 07:15 de hoy (triaje + gráficos) · 18:00 de hoy y de los 3 días siguientes (10 drills). La eval de 10Q vuelve el 4.º día; el subtema de cada día NO cambia.` : undefined });
}
function dayAfter0715(r, th) {
  const nom = nomHito(th.hito);
  return B(r.fecha, '07:15–08:15', `DAY-AFTER ${nom} · 2/6 — triaje + gráficos`, [
    P(45, `Triaje de las incorrectas del ${nom} (bloques 1-4 en orden)`, '1′ por pregunta: Educational Objective → K (no lo sabía) o QI (lo sabía y leí/interpreté mal). Lo que no entre en 45′ se queda sin triar: el NBME es un mapa (regla de oro).'),
    P(15, `Ítems experimentales / gráficos → ${AK.exp - 1}-${AK.exp} tarjetas de «diseño del experimento»`, `Qué se manipuló, qué se midió, qué predice el resultado; ${expCardTxt(th.hito)}`),
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
    ], [{ t: `Qbankly › QBanks › NBME › ${nom}`, url: QBQ, cantidad: `${bloques.reduce((a, b) => a + b, 0)}Q` }], '4 bloques terminados y el % total + por bloque en 📏 Medición', { aviso: `El NBME (plan ${VER}: 07:00-12:30) sustituye a las franjas 07:15 · 08:15 · 09:00 · 11:00 de hoy y pisa el almuerzo 12:00-12:30: ${r.fase === 'F3' ? 'almuerzo 12:30-13:00 (F3: no hay SYNAPSE; R↔D 13:30 sin cambio). Su Day-After (~4 h) se reparte como en F1: 18:00 de hoy (1/6) + las 4 filas siguientes (07:15 del día siguiente y 18:00).' : 'almuerzo 12:30-13:00 y SYNAPSE 13:00-13:30 (en el hueco del libro + holgura).'}${r.d === F1[F1.length - 1].d ? ' Es la última sesión de F1: su Day-After (~4 h) no tiene franja en F1 (jue 31-dic = SKIP) → ⚠ DECISIÓN DE JOSEPH (propuesta: sáb 2-ene 07:00-11:00, o repartido en los «STEP 1 VIVO» de los sábados de enero).' : ''}`, planB: 'Qbankly caído: espera 10 min (un bloque no empezado no se pierde); si sigue, el NBME pasa a la tarde por bloques y lo decide Joseph (el hito no cambia de día sin su OK).' }),
    B(f, '18:00–18:45', `DAY-AFTER NBME ${form} · 1/6 — registro + trayectoria + auditoría`, [
      P(5, 'Registrar en 📏 Medición: % total, % de los 4 bloques, horas netas', 'Step 1 → 📋 HOY → 📏 Medición.'),
      P(15, 'Trayectoria: curva del % frente a los hitos previos y al mínimo on-track', '¿Subieron los sistemas estudiados en las últimas 2 semanas?'),
      P(15, 'Auditoría de honestidad por escrito', '«Si sigo haciendo lo mismo 6 meses, ¿qué resultado tendría?» + 3 decisiones concretas.'),
      P(10, 'Informe por sistema (Palmerton §9.1)', 'Copia el % por sistema (Qbankly › Test History / Reports); exige ≥80 % en lo ya estudiado.'),
    ], [R_UW], 'medición, trayectoria, auditoría e informe por sistema escritos')];
}

// ── v6.05 (24-oct) · TRAMO 2: 16:15 REENTRADA de las desplazadas, días de cola de vídeo y encaje en la plantilla F3 ─────────────────
/** Sistema de la rotación de F3 (gen_tramo2 sistemaRot → franjaNota «16:15 REENTRADA: 20Q timed de X + revisión») → órgano de uWorld. */
const ORGANO_ROT = { Cardiovascular: 'Cardiovascular System', Respiratory: 'Pulmonary & Critical Care', Renal: 'Renal, Urinary Systems & Electrolytes', Gastrointestinal: 'Gastrointestinal & Nutrition',
  Endocrine: 'Endocrine, Diabetes & Metabolism', 'Nervous System': 'Nervous System', 'Hematology & Oncology': 'Hematology & Oncology', Fundamentos: 'Pathology (General Principles)', Immunology: 'Allergy & Immunology' };
/** 16:15-17:15 REENTRADA (solo F3, FRANJA_F3_REENTRADA): 20Q timed del sistema de la rotación SIN uWorld fresco (V2b: la reentrada no lo gasta). */
function reentrada1615(r) {
  const m = /16:15 REENTRADA: 20Q timed de (.+?) \+ revisión/.exec(r.franjaNota || '');
  const org = m && ORGANO_ROT[m[1]]; const ids = org ? [...UWY.keys()].filter((id) => organoDe(id) === org) : [];
  if (!ids.length) { ERR.push(`${etq(r)} ${r.fecha}: 16:15 REENTRADA sin sistema de la rotación reconocible («${r.franjaNota || ''}»)`); return null; }
  return B(r.fecha, U.FRANJA_F3_REENTRADA.hora, `16:15 REENTRADA · 20Q timed de ${m[1]} (rotación de F3)`, [
    P(2, `Armar: los ${ids.length} Systems de «${org}»`, `QBanks › «uWorld - USMLE Step 1» › New Test → Systems: TODOS los de «${org}» (${ids.length}) · Subjects todos · Status Incorrect (NO Unused: el uWorld fresco se reserva para el contenido) · 20 · Timed → BEGIN TEST · si salen < 20, completa con AMBOSS (bloque timed del mismo sistema)`, L_UW),
    P(30, '20Q TIMED del sistema (90 s/Q · tope 2 min)', 'Sin saber el subtema: cover-the-options · flag y sigue · cuenta las respuestas cambiadas.'),
    P(25, 'Revisión: Educational Objective + log de errores (0 tarjetas nuevas: el tope del día ya lo reparten deep prime, consolidación y eval)', 'Cada fallo: knowledge / transfer / proceso → 📏 Medición; lo que merecería tarjeta va a la shopping list.'),
    P(3, 'Gate de la reentrada (marca ✓/✗ en 📏 Medición)', U.FRANJA_F3_REENTRADA.gate),
  ], [R_UW], '20Q timed del sistema de la rotación, % en 📏 Medición y el gate marcado', { planB: 'Sin incorrectas suficientes en uWorld: AMBOSS (bloque timed del mismo sistema); nunca uWorld Unused (fresco).' });
}
/** Día de COLA (tras la última desplazada): «vídeo pendiente» 07:15-07:45 con lo que no cupo en sus deep prime (regla de F1, ≤30′). */
function colaVideo0715(r) {
  const rep = REP[r.d]; const vids = pasosVideo(r.d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0);
  const origen = [...new Set(rep.s0715.map((it) => etqD(it.dOrig)))].join(' · ');
  return B(r.fecha, '07:15–07:45', `VÍDEO PENDIENTE · cola de las filas desplazadas de F1 (${origen})`, [
    ...vids,
    P(30 - V, 'Free recall del vídeo (sin mirar)', '90 s por vídeo: la cadena causal en 3 ideas; lo que no salga, a la shopping list.'),
  ], recVideo(rep.s0715), 'tramo(s) de vídeo vistos y resumidos', { aviso: `Nada se recorta: lo que no cupo en los deep prime de las filas desplazadas de F1 (${etq(T2_DESPL[0])}-${etq(T2_DESPL[T2_DESPL.length - 1])}) se ve en el «vídeo pendiente» de las 07:15 (≤30′), en orden y partido por minutos. El resto de la franja 07:15-08:15 (repaso anclado + validación de 5Q) y el día siguen como dice la fila ${etq(r)}.` });
}
/** Franjas USMLE de la plantilla F3 leídas de src/lib/plantillasV6.ts › bloquesF3 (anki · bloque principal · eval; en un hito, el de su sub)
 *  + FRANJA_F3_REENTRADA: todo bloque de la guía del tramo 2 tiene que caer dentro de una (si no, aborta). */
const F3_USMLE = (() => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'plantillasV6.ts'), 'utf8');
  const cuerpo = (/function bloquesF3\([\s\S]*?\r?\n\}\r?\n/.exec(src) || [''])[0];
  const fr = [...cuerpo.matchAll(/bloque\('([\w-]+)', '(\d\d:\d\d)', '(\d\d:\d\d)', [^\n]*?'usmle', 'usmle-[a-z]+'\)/g)].map((x) => ({ id: x[1], ini: x[2], fin: x[3] }));
  const [ri, rf] = U.FRANJA_F3_REENTRADA.hora.split('–'); fr.push({ id: 'reentrada', ini: ri, fin: rf });
  if (!['anki', 'usmle', 'eval'].every((id) => fr.some((x) => x.id === id))) aborta('plantillasV6.ts › bloquesF3: no encuentro las franjas USMLE de F3 (anki · usmle · eval) para encajar la guía del tramo 2');
  return fr;
})();
function dentroF3(r, g) {
  const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(g.franja); if (!m) return false;
  const h = esHito(r) ? /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/.exec(r.sub) : null;
  const fr = F3_USMLE.filter((x) => !(h && (x.id === 'usmle' || x.id === 'reentrada'))).concat(h ? [{ id: 'hito', ini: h[1], fin: h[2] }] : []);
  return fr.some((x) => aMin(m[1]) >= aMin(x.ini) && aMin(m[2]) <= aMin(x.fin));
}

// ── S1 · semana 1 = D1-D5 (v6.05: lun 26 → vie 30-oct, sin fin de semana en medio · v6.03: mié 21 → mar 27-oct, con el 24-25 en medio) a mano (vídeos: del reparto de arriba) ─────────────────────────────────────────────────────
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
    B(f, '05:00–05:45', 'ANKI · CONFIGURACIÓN (el mazo está vacío): mazos + preset «APEX USMLE» (FSRS)', [
      P(4, `Mazos: confirma APEX::USMLE (padre) y los ${F1_DECKS.length} submazos del F1: ${F1_DECKS.map((t) => `::${t}`).join(' · ')}`, 'Anki escritorio › Create Deck con el nombre EXACTO de los que falten (el motor APEX también los crea al vuelo, pero sin tu preset). Lo de patología general va a ::Pathology: el motor no acepta «General». Pharm = submazo propio (::Pharmacology) con su propio tope diario, como pide Palmerton. Sync.'),
      ...v05,
      P(45 - 4 - V05 - 2, 'Preset «APEX USMLE» en Deck Options del PADRE → Save ▾ «Save to All Subdecks»', `FSRS: si ya está activado (vale para toda la colección), déjalo; si no, actívalo y pulsa «Optimize all presets» (ya tienes historial en tus mazos MIR/ENCAPS; Palmerton solo hace esperar ~1 mes con SM-2 a quien es nuevo en Anki) · Desired retention ${AK.ret} · New cards/day ${AK.nuevasDia} · Maximum reviews/day ${AK.maxRev} (nunca 200: oculta vencidas) · learning y relearning steps por defecto (no tocar) · Display order › New/review order: «Show after reviews» · Preferences › Review › Next day starts at 4. El «Optimize» propio de este preset va el ${fd(SAB_OPT)} (4 semanas de repasos).${resto05 ? ' El final del vídeo se ve a las 07:55: si cambia algo de esto, ajústalo mañana a las 05:00 (el mazo sigue vacío).' : ''}`),
      P(2, 'Telemetría con 0 tarjetas', 'node DATA/_scripts/anki_telemetria.js con Anki abierto: debe leer retención 0,90 y ningún aviso «rev.perDay < 9999». El aviso «nuevas/día = 20 (esperado 10)» viene del script anterior a este método (pendiente de actualizar): ignóralo.'),
    ], [recPalm('Te5RnxeG_Gg'), { t: 'AnkiWeb', url: 'https://ankiweb.net/decks' }], `preset «APEX USMLE» (FSRS ${AK.ret} · ${AK.nuevasDia} nuevas/día · ${AK.maxRev} repasos/día · repasos antes que nuevas) guardado en el padre y en todos los submazos, y la telemetría con 0 tarjetas registrada`, { planB: 'Si Anki escritorio no abre: crea los mazos en AnkiWeb hoy y aplica el preset mañana a las 05:00 (el mazo sigue vacío).', aviso: `Método completo (ajustes, tipos de tarjeta, cuotas, backlog, telemetría): ${METODO_MD}. Desde mañana cada tarjeta nace por APEX con la cabecera del día (ESPECIALIDAD · SUBTEMA · FUENTE · MODO) y un tope de ${AK.topeDia} tarjetas nuevas/día.` }),
    B(f, '07:15–07:25', 'PREPARACIÓN DEL HITO 1/2 · localizar el UWSA1 (hoy no hay tema nuevo ni «ayer»)', [
      P(10, 'Localizar el UWSA1 SIN empezarlo', 'Qbankly › QBanks › USMLE High Yield › «uWorld - Step 1 Self Assessment Simulation 1» (160Q · 4 h) › Details (Subjects: Block - #1 … Block - #4 = 40Q cada uno) › Select QBank (queda como ACTIVE QBANK). No pulses BEGIN.', L_UW),
    ], [R_UW], 'UWSA1 como ACTIVE QBANK (sin empezar)', { aviso: 'Hoy el bloque USMLE va de 07:15 a 13:00: el UWSA1 son 4 h netas (4 × 40Q × 90 s) y con la pausa no cabe en 09:00-13:00 → empieza a las 08:50. 07:25-07:55 = SYNAPSE (su propia tarjeta del Home; no se repite aquí) · 07:55-08:50 = 2/2 de la preparación · ALMUERZO 13:00-13:30 (en vez del libro + holgura) · Research ↔ Derma 13:30 sin cambio.' }),
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
    ], [{ t: 'Qbankly › QBanks › USMLE High Yield › UWSA1', url: QBQ, cantidad: '160Q' }], '4 bloques terminados (160Q) y el % de cada bloque anotado', { planB: `Qbankly no carga: espera 10 min y recarga (un bloque no empezado no se pierde). Si sigue caído, los bloques que falten van a las 18:00 y la revisión al ${fd(DD(2))}: el UWSA1 no cambia de día sin decisión de Joseph.` }),
    B(f, '18:00–18:45', 'DAY-AFTER UWSA1 · 1/6 — medición + informe por sistema + auditoría', [
      P(5, 'Registrar en 📏 Medición: % total + % de B1-B4 + horas netas de hoy', 'Step 1 → 📋 HOY → 📏 Medición (bloques del hito).'),
      P(15, 'Informe por sistema (Palmerton §9.1)', 'Qbankly › Test History / Reports del UWSA1: copia el % por sistema (si no hay informe, anota el Subject/System de cada incorrecta). Es el mapa de partida: no se exige 80 % en nada.'),
      P(15, 'Auditoría de honestidad por escrito', '«Si sigo haciendo lo mismo 6 meses, ¿qué resultado tendría?» + 3 decisiones para esta semana. (Trayectoria: no aplica, es el primer hito.)'),
      P(10, 'Triaje: 10 primeras incorrectas del bloque 1', '1′ cada una: solo el Educational Objective → K (no lo sabía) o QI (lo sabía y leí/interpreté mal).'),
    ], [R_UW], '% en Medición, tabla por sistema, auditoría escrita y 10 incorrectas con K/QI', { aviso: `Del D1 al D4 la franja de las 18:00 es la revisión del UWSA1 (Day-After ~4 h repartido ${fdc(DD(1))} 18:00 → ${fdc(DD(4))} 18:00${diasEntre(DD(1), DD(4)) > 3 ? ', con el fin de semana en medio' : ''}): la eval de 10Q mixtas de nivel 4 no tiene sentido sin temas vistos. Vuelve reducida el ${fd(DD(4))} (D4) y el ${fd(DD(5))} (D5).` }),
    ];
  }
  const out = [];
  // 05:00
  if (d === 2) out.push(B(f, '05:00–05:45', 'ANKI (vacío) → DAY-AFTER UWSA1 · 2/6 — triaje', [
    P(2, 'Anki: sync; 0 vencidas (todavía no hay tarjetas)', 'Abre APEX::USMLE para confirmarlo; si hubiera alguna, primero esa.'),
    P(43, 'Triaje: 43 incorrectas más del UWSA1 (resto del B1, B2, B3 en orden)', `1′ por pregunta: Educational Objective → K o QI. Con las 10 de ${antesTxt(DD(1), DD(2))} ≈ 1 h de triaje (Palmerton §9.2). Las que no entren se quedan sin triar: el UWSA es un mapa, no un temario.`),
  ], [R_UW], '≈53 incorrectas con K/QI (o todas, si fallaste menos)', { aviso: 'El mazo está vacío hasta hoy y el vídeo del tema nuevo no se ve antes del pre-test ciego de las 08:15 → la franja de Anki se usa para el triaje del UWSA1.' }));
  else out.push(anki0500(r));
  // 07:15
  if (d === 2) out.push(B(f, '07:15–08:15', 'DAY-AFTER UWSA1 · 3/6 — gráficos + drill de cronología (1-3)', [
    P(15, `Ítems experimentales / gráficos del UWSA1 → ${AK.exp - 1}-${AK.exp} tarjetas de «diseño del experimento»`, `Separa esas preguntas; cada tarjeta ${expCardTxt(filaD(1))}`),
    P(45, 'Drill de cronología: 3 incorrectas (las más largas y con más labs)', `15′ cada una: reescribe A MANO el caso en orden cronológico estricto y en presente ${pcCardTxt(filaD(1))}`),
  ], [R_UW], '2-3 tarjetas de experimento + 3 PC cards', { aviso: `El plan ponía el Day-After (~4 h) en el deep prime de hoy: se reparte en 6 franjas (${fdc(DD(1))} 18:00 · ${fdc(DD(2))} 05:00 · ${fdc(DD(2))} 07:15 · ${fdc(DD(2))} 18:00 · ${fdc(DD(3))} 18:00 · ${fdc(DD(4))} 18:00 = 253′) para no apilar 4 h encima del primer tema. El subtema de hoy no cambia.` }));
  else {
    // v6.03: «ayer» / «24 h» solo si el día de contenido anterior es el día natural anterior (D4 lun 26 ← D3 vie 23 = 72 h, fin de semana)
    const pv = contAtras(r, 1); const ay = antesTxt(pv.fecha, f); const horasVal = diasEntre(pv.fecha, f) * 24;
    const valTit = (que) => (horasVal === 24 ? `validación 24 h de ${que}` : `validación de ${que} a las ${horasVal} h (tras el fin de semana)`);
    const valTxt = horasVal === 24 ? 'validación 24 h' : `validación a las ${horasVal} h, tras el fin de semana`;
    const prevTxt = { 3: ['lesión y muerte celular (D2)', tcMH([48], 5, TUTOR), `Mehlman, activo desde ${ay}`], 4: ['inflamación + neoplasia (D3)', tcMH([204, 46], 5, TUTOR), `Mehlman, activo desde ${ay} a las 11:00`], 5: ['inmunidad innata/adaptativa (D4)', tcUW([1004], 5, TUTOR), 'uWorld: quedan 5 de las 25 de este System según este plan; si no hay → Mehlman «Immunology (General Cell function)» (24)'] }[d];
    const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0); const resto = 60 - 23 - V;
    out.push(B(f, '07:15–08:15', `REPASO ANCLADO · ${valTit(prevTxt[0])}${V ? ' + vídeo pendiente' : ''}`, [
      P(8, `Shopping list + free recall de ${prevTxt[0]}`, `Lee tus notas ${ay === 'ayer' ? 'de ayer' : 'del ' + fd(pv.fecha)} en 📏 Medición; después, sin mirar, escribe la cadena causal en 90 s.`),
      P(15, `5Q TUTOR de ${prevTxt[0]} (${valTxt} · ${prevTxt[2]})`, prevTxt[1], L_UW),
      ...vids,
      ...(resto > 0 ? [P(resto, V ? 'Free recall del vídeo + Anki restante' : 'Repaso multi-temporal D-1/D-2 + 2.ª pasada de las tarjetas', V ? 'Sin mirar: 90 s por vídeo; si quedan vencidas, termínalas.' : `Rehaz a mano, sin mirar, los esquemas de lesión celular, inflamación y neoplasia; compáralos con tus notas y repasa las tarjetas creadas ${ay}.`)] : []),
    ], [R_UW, ...recVideo(rep.s0715)], '5Q hechas (≥4/5 = validado; <4/5 → hoy en la consolidación repites 5Q de ese subtema) y free recall escrito'));
  }
  // 08:15
  const pre = {
    2: ['PRE-TEST · lesión celular + inflamación — 8Q (TODAS las que tiene uWorld)', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank (${antesTxt(DD(1), DD(2))} quedó activo el UWSA1) › New Test → Systems ${uwNom(1110)} + ${uwNom(1111)} · Subjects todos · Status Unused · 8 · Order por defecto · Tutor → BEGIN TEST`, L_UW), P(30, '8Q ciegas en Tutor (sin reloj)', 'SAQ + CCSN antes de mirar las opciones; después lee la explicación entera (~3′ por pregunta en inglés).'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de lesión/muerte celular e inflamación; cada duda (también en aciertos) a la shopping list de 📏 Medición.')], 'uWorld solo tiene 8Q de «Principles of pathology» (Cellular pathology 6 + Inflammation and repair 2): se usan TODAS aquí; la consolidación de las 11:00 y la validación de mañana van con Mehlman (respaldo).'],
    3: ['PRE-TEST · neoplasia — 10Q ciegas (uWorld)', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} · Status Unused · 10 · Tutor → BEGIN TEST`, L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de neoplasia; dudas a la shopping list.')]],
    4: ['PRE-TEST · inmunidad innata/adaptativa + MHC + linfocitos — 10Q ciegas', [P(3, 'Volver a uWorld y armar', `QBanks › USMLE › «uWorld - USMLE Step 1» › Select QBank › New Test → System ${uwNom(1004)} · Status Unused · 10 · Tutor → BEGIN TEST`, L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: qué sabes de inmunidad; dudas a la shopping list.')]],
    5: ['PRE-TEST · hipersensibilidad + autoinmunidad + inmunodeficiencias + trasplante — 10Q ciegas', [P(3, 'Armar el test en el Test Composer', tcUW([1002, 1001, 1000, 1005], 10, TUTOR), L_UW), P(30, '10Q ciegas en Tutor', 'SAQ + CCSN; explicación entera de cada una.'), P(12, 'Free recall 90 s + shopping list', 'Sin mirar: tipos I-IV de hipersensibilidad, inmunodeficiencias que conozcas; dudas a la shopping list.')]],
  }[d];
  out.push(B(f, '08:15–09:00', pre[0], pre[1], [R_UW], d === 2 ? 'nota /8 en 📏 Medición (40-60 % es normal: es diagnóstico)' : 'nota /10 en 📏 Medición (40-60 % es normal: es diagnóstico)', { planB: respaldo(d, 10), aviso: pre[2] }));
  // 09:00
  out.push(deepPrime(r));
  // 11:00
  const con = {
    2: ['CONSOLIDACIÓN · lesión y muerte celular — 10Q Tutor (Mehlman)', [P(3, 'Cambiar a Mehlman y armar', `QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank › New Test → System ${mhNom(48)} · Status Unused · 5 · Tutor → BEGIN TEST`, L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con su explicación; corrige el 1.er bloque antes de armar el 2.º.'), revCon(r, 15, presupuesto(r).con, 'mix_examen_usmle'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', `≥8/10 → validado (${despuesTxt(DD(2), DD(3))} 07:15: 5Q más) · <8/10 → el bloque extra de abajo.`), P(10, 'Bloque extra de 5Q SOLO si <8/10 · si ≥8/10: 1.ª pasada de las tarjetas de hoy', 'Mismo filtro. Tope del día: 30 preguntas nuevas.')], `Mehlman es el respaldo porque uWorld no tiene más preguntas de este subtema. ${mayus(despuesTxt(DD(2), DD(3)))} a las 08:15 vuelves a uWorld (Select QBank).`],
    3: ['CONSOLIDACIÓN · inflamación + neoplasia — 10Q Tutor (Mehlman)', [P(3, 'Cambiar a Mehlman y armar', `QBanks › USMLE › «Mehlman - Step 1 QBank - 2026» › Select QBank › New Test → System ${mhNom(204)} · Status Unused · 5 · Tutor → BEGIN TEST`, L_UW), P(15, 'Bloque 1: 5Q de inflamación y reparación (Tutor)', 'Con explicación; corrige antes del bloque 2.'), P(15, 'Bloque 2: 5Q de neoplasia (Tutor)', `New Test → System ${mhNom(46)} · Status Unused · 5 · Tutor.`), revCon(r, 15, presupuesto(r).con, 'mix_examen_usmle'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', `≥8/10 → validados (${despuesTxt(DD(3), DD(4))} 07:15: 5Q más) · <8/10 → bloque extra.`), P(10, 'Bloque extra de 5Q del subtema más flojo SOLO si <8/10 · si no: tarjetas de hoy', 'Tope del día: 30 nuevas.')], 'La neoplasia de uWorld (53Q: Neoplasia 31 + Principles of oncology 22) se reserva para el pre-test y la eval: la consolidación va con Mehlman para no gastarla.'],
    4: ['CONSOLIDACIÓN · inmunidad básica — 10Q Tutor (uWorld)', [P(3, 'Armar el test en el Test Composer', tcUW([1004], 5, TUTOR), L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con explicación.'), revCon(r, 15, presupuesto(r).con, 'UWorld'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', '≥8/10 → validado · <8/10 → bloque extra.'), P(10, `Bloque extra de 5Q SOLO si <8/10 (respaldo: Mehlman ${mhNom(66)})`, 'Si ≥8/10: tarjetas de hoy. Tope del día: 30 nuevas.')]],
    5: ['CONSOLIDACIÓN · hipersensibilidad / inmunodeficiencias — 10Q Tutor (uWorld)', [P(3, 'Armar el test en el Test Composer', tcUW([1002, 1001, 1000, 1005], 5, TUTOR), L_UW), P(30, '2 bloques de 5Q en Tutor (10Q)', '≈3′ por pregunta con explicación.'), revCon(r, 15, presupuesto(r).con, 'UWorld'), P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', `≥8/10 → validado (${despuesTxt(DD(5), DD(6))} 07:15: 5Q timed) · <8/10 → bloque extra.`), P(10, 'Bloque extra de 5Q SOLO si <8/10 · si no: tarjetas de hoy', 'Tope del día: 30 nuevas (si haces el extra, la eval de las 18:00 va solo con incorrectas).')]],
  }[d];
  out.push(B(f, '11:00–12:00', con[0], con[1], [R_UW], '10Q (o 15) hechas, % en 📏 Medición y gate marcado ✓/✗', { aviso: con[2], planB: d >= 4 ? respaldo(d, 10) : undefined }));
  // 18:00
  if (d === 2 || d === 3) out.push(B(f, '18:00–18:45', `DAY-AFTER UWSA1 · ${d === 2 ? '4/6 — drill de cronología (4-6)' : '5/6 — drill de cronología (7-9)'}`, [P(45, `Drill de cronología: 3 incorrectas más del UWSA1 (${d === 2 ? '4, 5 y 6' : '7, 8 y 9'} de 10)`, `15′ cada una: caso reescrito A MANO en orden cronológico y en presente ${pcCardTxt(filaD(1))}`)], [R_UW], `3 PC cards más (${d === 2 ? 6 : 9}/10)`));
  else if (d === 4) out.push(B(f, '18:00–18:45', 'DAY-AFTER UWSA1 · 6/6 + EVAL reducida (5Q timed)', [
    P(15, 'Drill de cronología: la 10.ª incorrecta del UWSA1', `Reescrita a mano en orden cronológico ${pcCardTxt(filaD(1))} Day-After cerrado (≈4 h).`),
    P(1, 'Armar 5Q TIMED de lo ya visto', `QBanks › uWorld › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} + ${uwNom(1004)} · Status Unused · 5 · Timed`, L_UW),
    P(8, '5Q TIMED (90 s/Q)', 'Modo examen: cover-the-options; sin cambiar respuestas.'),
    corrEval(r, 16, presupuesto(r).ev),
    P(5, 'Registrar eval % + horas netas', '📏 Medición.'),
  ], [R_UW], 'drill 10/10 y la eval de 5Q registrada', { aviso: 'Eval reducida a 5Q nuevas: el tope de la semana 1 (D1-D5) son 30 preguntas nuevas al día (5 + 10 + 10 + 5). Si hoy hiciste el bloque extra de las 11:00, cambia estas 5 por 5 de Status Incorrect.' }));
  else out.push(B(f, '18:00–18:45', 'EVAL de cierre de la semana 1 (D1-D5) · 5Q nuevas timed + 5 incorrectas', [
    P(2, 'Armar 2 tests de 5Q TIMED', `(a) QBanks › uWorld › New Test → Systems ${uwNom(1112)} + ${uwNom(1072)} + ${uwNom(1004)} + ${uwNom(1002)} · Status Unused · 5 · Timed · (b) mismo filtro con Status Incorrect · 5 · Timed`, L_UW),
    P(16, '10Q TIMED (5 nuevas + 5 re-test de incorrectas)', '90 s/Q; cover-the-options.'),
    corrEval(r, 17, presupuesto(r).ev),
    P(10, `Registrar + resumen para la revisión semanal del ${fd(sabadoTras(f))}`, '📏 Medición (eval %, horas netas) + gates de D2-D5: lesión celular · inflamación · neoplasia · inmunidad básica · inmunidad clínica (✓/✗) + minutos de vídeo que quedan en la cola.'),
  ], [R_UW], 'eval registrada y el resumen de la semana escrito', { aviso: 'Tope de la semana 1 (D1-D5): 30 preguntas nuevas/día (5 + 10 + 10 + 5). Si hiciste el bloque extra de las 11:00, el test (a) también va con Status Incorrect.' }));
  return out;
}

// ── fines de semana de F1 (Anki del Calendar: sáb 19:00-19:30 · dom 17:00-17:15) ───────────────────────────────────────────────
function findes() {
  // v6.03: los fines de semana DENTRO de F1 (antes 24-oct → 27-dic fijos) y el aviso del 1.er sábado tras el D1 (antes '2026-10-24' y la cola
  //   del D5): la cola es la del último día de plan antes de ese sábado y se ve en los 2 días de plan siguientes
  const out = {}; const SAB1 = sabadoTras(DD(1));
  const antesSab = [...F1].reverse().find((r) => r.fecha < SAB1 && REP[r.d]); const q5 = antesSab ? REP[antesSab.d].colaTras : { bbMin: 0, palmMin: 0 };
  const trasSab = F1.filter((r) => r.fecha > SAB1).slice(0, 2);
  const franjasCola = trasSab.every((r) => S1(r.d)) ? '05:00, 07:15 y hueco del deep prime' : '07:15 y hueco del deep prime';
  for (let t = new Date(DD(1) + 'T12:00:00Z'); t <= new Date(F1[F1.length - 1].fecha + 'T12:00:00Z'); t = new Date(t.getTime() + 86400000)) {
    const iso = t.toISOString().slice(0, 10); const w = t.getUTCDay();
    if (w === 6) out[iso] = [B(iso, '19:00–19:30', `ANKI del sábado · cola FSRS + preset${iso === SAB_OPT ? ' + FSRS Optimize' : ''} + Stats`, [
      P(22, 'TODAS las vencidas de APEX::USMLE (padre › Study Now)', 'Solo vencidas · Good ≈90 % / Again solo olvido real · nunca Hard/Easy · cuando el contador de repasos llegue a 0, cierra: el sábado no se crean ni se estudian nuevas (las del viernes esperan al lunes).'),
      P(3, iso === SAB_OPT ? 'Preset en los submazos nuevos + FSRS › Optimize del preset' : 'Preset en los submazos nuevos', `El motor APEX crea los submazos al vuelo con el preset Default (sin tus ajustes): Deck Options del padre APEX::USMLE › Save ▾ «Save to All Subdecks».${iso === SAB_OPT ? ` Hoy además, con 4 semanas de repasos del preset: FSRS › «Optimize» y deja Desired retention en ${AK.ret}.` : ''}`),
      P(5, 'Telemetría + Stats de la semana', `node DATA/_scripts/anki_telemetria.js · Anki › Stats del padre: % Again (≈10 % sano; > 20 % → tarjetas largas o perfeccionismo: divídelas; ≈0 % → no te estás examinando) · ALARMA G (backlog > 100 o retención < 85 %) → el lunes, protocolo de backlog (${METODO_MD} §7).`),
    ], [R_ANKI], '0 vencidas (o 22′ cumplidos), el preset al día en todos los submazos y la telemetría registrada', { aviso: iso === SAB1 ? `Sábado sin vídeo ni preguntas (descanso). A la revisión semanal de las 07:15 lleva: % del UWSA1, gates de la semana (📏 Medición) y la cola de vídeo: ≈${q5.bbMin}′ de B&B + ${q5.palmMin}′ de Palmerton que se ven el ${trasSab.map((r) => fd(r.fecha)).join(' y el ')} (${franjasCola}).` : undefined })];
    if (w === 0) out[iso] = [B(iso, '17:00–17:15', 'ANKI del domingo · OPCIONAL (≤15′)', [
      P(15, 'Solo vencidas de APEX::USMLE (si hay)', 'Opcional en el plan (domingo libre) y no se registra. Postura de Palmerton: repasos a cero TODOS los días (saltarse 1-2 días le costó caro) → si hay vencidas, hazlas y el lunes empieza limpio. Nuevas no.'),
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
// v6.05 (24-oct): TRAMO 2 — las desplazadas con el guion de F1 por D# (07:15 · 08:15 · 09:00 · 11:00 · 16:15 REENTRADA · 18:00) + el hito cuyo
//   Day-After cae en ellas (NBME 29: 05:00 · hito 07:00-12:30 · 18:00 Day-After 1/6) + los días de cola de vídeo (07:15-07:45); todo dentro
//   de las franjas USMLE de la plantilla F3
for (const r of TG) {
  const th = trasHito(r);
  GUIA[r.fecha] = esHito(r) ? hitoNBME(r) : [anki0500(r), th && th.n === 1 ? dayAfter0715(r, th) : repaso0715(r), pretest(r), deepPrime(r), consolidacion(r), reentrada1615(r), eval18(r)].filter(Boolean);
}
for (const r of COLA_DIAS) GUIA[r.fecha] = [colaVideo0715(r)];
for (const r of [...TG, ...COLA_DIAS]) for (const g of GUIA[r.fecha]) if (!dentroF3(r, g)) ERR.push(`${etq(r)} ${r.fecha} ${g.franja} «${g.titulo}»: fuera de las franjas USMLE de la plantilla F3 (plantillasV6.ts › bloquesF3)`);
// v6.03b: el presupuesto de tarjetas nuevas de cada día de contenido no pasa del tope (Palmerton: la única palanca es crear menos)
for (const r of [...F1, ...TG]) if (!esHito(r) && presupuesto(r).total > AK.topeDia) ERR.push(`${etq(r)} ${r.fecha}: presupuesto de tarjetas ${presupuesto(r).total} > ${AK.topeDia}`);
if (ERR.length) aborta('bloques que no cuadran:\n  ' + ERR.join('\n  '));
const FECHAS = Object.keys(GUIA).sort();

// vídeos B&B de los capítulos de F1 sin día en F1 (constancia)
const CAPS_F1 = ['Pathology', 'Immunology', 'Cardiology', 'Pulmonary', 'Renal', 'Gastroenterology', 'Neurology'];
const usados = new Set(Object.values(MAPA).flatMap((m) => m.bb));
// v6.03: vídeos B&B de las filas de F1 DESPLAZADAS al tramo 2 que tienen mapeo en el catálogo (se ven en su fila T; no cuentan como «sin día»)
const DESPL_BB = T2_DESPL.filter((x) => MAPA[x.dOrig]).map((x) => `v5.20 D${x.dOrig} → T${x.t} ${fd(x.fecha)}: ${MAPA[x.dOrig].bb.map((id) => `${BB.get(id).cap} › ${BB.get(id).sec} › ${BB.get(id).nombre} (${mmss(BB.get(id).s)})`).join(' · ')}`);
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
    for (const id of MF1[d].bb) { const it = item('bb', id, d); if (pend.length) { pend.push(it); continue; } const rr = col(it, d, l); l -= rr.u; if (rr.resto) pend.push(rr.resto); }
    cB.push(...pend); if (r.palm && d > 3 && PALM[r.palm.id]) cP.push(item('palm', r.palm.id, d)); if (l >= MIN_TRAMO) llenar(d, l, d);
  }
  return { bbMin: cB.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0), palmMin: [...cM, ...cP].reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0) };
}
const ESC125 = residuo(1.25);
// v6.05: la cola al cierre de F1 (COLA_F1) y, para cada tramo, su destino en el tramo 2 (DONDE); la cola al cierre de la guía es siempre []
const fmtIt = (it) => (it.tipo === 'bb' ? `${bbRuta(it.id)} ${mmss(it.ini)}→${mmss(it.fin)} (${etqD(it.dOrig)})` : `Palmerton «${PALM[it.id].t}» ${hms(it.ini)}→${hms(it.fin)} (${etqD(it.dOrig)})`);
const finalPalm = COLA_F1.palm.map(fmtIt);
const finalBB = COLA_F1.bb.map(fmtIt);

const META = {
  version: VER,
  generado: '2026-10-24',
  fuente: 'DATA/_scripts/usmle/gen_usmle_guia.js + guia_catalogo_f1.js · catálogos Qbankly del 18-oct-2026 (DATA/USMLE/qbankly_*.tsv)',
  dias: FECHAS.length,
  bloques: FECHAS.reduce((a, f) => a + GUIA[f].length, 0),
  velocidad: 'S1 (D1-D5) 1,0× con subtítulos EN · S2-S3 (D6-D15) 1,25× · desde S4 (D16) 1,5× si el free recall del último vídeo recoge ≥3 ideas (si no, 1,25×) · minutos reales = duración ÷ velocidad × 1,2 (S1) / 1,15',
  reglaPreguntasS1: 'Semana 1 = D1-D5 (nivel 1, desde cero con el inglés): ≤30 preguntas NUEVAS/día sumando todas las franjas, todo en Tutor salvo el UWSA1 y la eval reducida; cada subtema 10Q el día que se estudia (2 bloques de 5) + 5Q a las 07:15 del día siguiente; gate ≥8/10 y ≥4/5; bloque extra de 5Q solo si falla. Desde el D6: nivelUW/qDia del plan ' + VER + '.',
  reglaRespaldo: 'System con menos preguntas de las pedidas → (1) todas las Unused del System, (2) los Systems hermanos del catálogo, (3) el mismo subtema en «Mehlman - Step 1 QBank - 2026»; nunca preguntas fuera del tema.',
  reglaVideo: 'El vídeo del tema nuevo solo después del pre-test ciego (deep prime, ≤70′ reales); lo que no cabe pasa a la cola y se ve, en orden y partido por minutos, en el «vídeo pendiente» de las 07:15 (≤30′; del D3 al D5 también a las 05:00) o en el hueco de un deep prime posterior; lo que queda al cierre de F1 sigue en el tramo 2 (filas desplazadas y, si sobra, el «vídeo pendiente» 07:15-07:45 de las filas siguientes): nada se queda sin día. Palmerton High Yield entra a la cola detrás de los B&B; los 2 Palmerton de MÉTODO adelantados al D1 (' + fd(DD(1)) + ', día del UWSA1: FSRS · «The ONLY video») siguen la misma regla de minutos (× 1,2 a 1,0×) y lo que no cabe ese día va a la cabeza de la cola.',
  reglaAnki: `Anki (método Palmerton + flujo APEX, ${METODO_MD}): preset «APEX USMLE» en APEX::USMLE y en todos sus submazos — FSRS ${AK.ret} · ${AK.nuevasDia} nuevas/día · ${AK.maxRev} repasos/día · repasos antes que nuevas · learning steps por defecto · día nuevo a las 4 h; Good ≈90 % / Again ≈10 %, sin Hard/Easy; tope de CREACIÓN ${AK.topeDia} tarjetas/día (deep prime ≤${AK.deepPrime} + errores de la consolidación y de la eval, o PC cards del Day-After) por APEX (Ctrl+Shift+A), frente «Subject - question» en inglés, «Summary:» con el porqué, sin cloze; ALARMA G (backlog > 100 o retención < 85 %) → 0 nuevas + 200 repasos/día hasta backlog < 20; «Optimize» FSRS del preset el ${fd(SAB_OPT)}.`,
  tarjetasPorDia: Object.fromEntries([...F1, ...TG].filter((r) => !esHito(r)).map((r) => { const b = presupuesto(r); return [etq(r), `${b.total} (Day-After ${b.b0715 + b.da18} · deep prime ${b.dp} · consolidación ${b.con} · eval ${b.ev})`]; })),
  colaAlCierreF1: [...finalBB, ...finalPalm],
  /** v6.05: destino EXPLÍCITO (fecha + franja) de cada tramo de colaAlCierreF1 en el tramo 2 (verificar_v6.js lo comprueba contra los pasos) */
  colaAlCierreF1Destino: [...COLA_F1.bb, ...COLA_F1.palm].map((it) => `${fmtIt(it)} → ${destinoDe(it)}`),
  /** v6.05: filas del tramo 2 con guía (desplazadas de F1 + el hito cuyo Day-After cae en ellas), plantilla F3 */
  guiaTramo2: TG.map((r) => `${etq(r)} ${fd(r.fecha)}: ${esHito(r) ? `${nomHito(r)} + Day-After 1/6 (18:00)` : `v5.20 D${r.dOrig} · ${corto(txtSub(r), 60)}`} · ${GUIA[r.fecha].length} franjas`),
  /** v6.05: días de cola tras la última desplazada (vídeo pendiente 07:15-07:45) */
  colaTramo2: COLA_DIAS.map((r) => `${etq(r)} ${fd(r.fecha)} 07:15–07:45: ${REP[r.d].s0715.map(fmtIt).join(' + ')}`),
  /** v6.05: lo que queda en la cola al cierre de la guía — SIEMPRE vacío (el generador aborta si no) */
  colaAlCierreTramo2: [...COLA_FINAL.bb, ...COLA_FINAL.palm].map(fmtIt),
  escenario125: `Si la velocidad se queda en 1,25× desde el D16: al cierre de F1 quedarían ≈${ESC125.bbMin}′ de B&B + ${ESC125.palmMin}′ de Palmerton en la cola (con 1,5×: ${COLA_F1.bb.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′ + ${COLA_F1.palm.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′), que se ven en el tramo 2: 07:15 y deep prime de las filas desplazadas y, si sobra, el «vídeo pendiente» 07:15-07:45 de las filas siguientes.`,
  diasConAviso: F1.filter((r) => MF1[r.d] && MF1[r.d].nota).map((r) => r.d),
  diasConAvisoTramo2: TG.filter((r) => MF1[r.d] && MF1[r.d].nota).map(etq),
  bbSinDiaF1: SIN_DIA,
  bbDesplazadasTramo2: DESPL_BB,
};
if (ERR.length) aborta('destinos de vídeo que no cuadran:\n  ' + ERR.join('\n  ')); // v6.05: destinoDe() de colaAlCierreF1Destino
if (META.colaAlCierreTramo2.length) aborta('la cola de vídeo no queda vacía: ' + META.colaAlCierreTramo2.join(' · '));

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
 * usmleGuia.ts — GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (${fd(DD(1))} → ${fd(F1[F1.length - 1].fecha)}-${F1[F1.length - 1].fecha.slice(0, 4)} + los fines de semana) y de las
 * filas de F1 desplazadas al tramo 2 (${TG.length ? `${etq(TG[0])} ${fd(TG[0].fecha)} → ${etq(TG[TG.length - 1])} ${fd(TG[TG.length - 1].fecha)}` : '—'}${COLA_DIAS.length ? ` + cola de vídeo ${etq(COLA_DIAS[0])}-${etq(COLA_DIAS[COLA_DIAS.length - 1])}` : ''}, plantilla F3), en el
 * formato común \`GuiaBloque\` (src/lib/guia.ts). Lo pintan UsmleTodayPlan (📋 HOY → 🧭 Guía del día) y la tarjeta USMLE del Home.
 * GENERADO por DATA/_scripts/usmle/gen_usmle_guia.js (mapeo: guia_catalogo_f1.js) — NO editar a mano:
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            (escribe) · --check (compara) · --informe <ruta.md>
 * Lee las filas REALES de usmleStep1Daily.ts (no cambia fechas, D#, hitos ni niveles de la ${VER}) y los catálogos verificados el
 * 18-oct-2026: B&B Step 1 (491 vídeos con duración), Test Composer de uWorld (13 Subjects · 169 Systems · matriz Subject × System),
 * Mehlman (respaldo), UWSA/NBME (bloques reales) y la Library de Qbankly (uWorld Medical Library · PassMedicine).
 * Reglas: ${META.velocidad}.
 *   ${META.reglaPreguntasS1}
 *   ${META.reglaRespaldo}
 *   ${META.reglaVideo}
 *   ${META.reglaAnki}
 * Avisos visibles (mapeo plan → catálogo no exacto): D${META.diasConAviso.join(', D')}${META.diasConAvisoTramo2.length ? ` · tramo 2: ${META.diasConAvisoTramo2.join(', ')}` : ''}.
 * v6.02c (18-oct-2026, E1): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): lun 19 · los 2 Palmerton de método (FSRS · «The ONLY video») con la regla de minutos de la semana 1
 *   (duración × 1,2 a 1,0×) y repartidos sin recortar (lo que no cabe → cabeza de la cola: D3 05:00) · la preparación del UWSA1 se parte en
 *   07:15-07:25 y 07:55-08:50 (el SYNAPSE de las 07:25 sale una sola vez, en su tarjeta) · capítulos B&B exactamente como en el catálogo (sin «(NEW)»).
 * v6.03 (20-oct-2026): D1 = mié 21-oct (lun 19 y mar 20 sin estudio) · F1 = 50 filas · mismo guion por D# con las fechas derivadas de las
 *   filas (D1 UWSA1 mié 21 · D2 jue 22 · D3 vie 23 · sáb 24 / dom 25 solo Anki · D4 lun 26 · D5 mar 27) · catálogo por el origen v5.20 de cada d.
 * v6.03b (20-oct-2026): método Anki · APEX dentro de los pasos (mismas franjas y minutos): D1 05:00 con los ajustes exactos (9999 repasos/día,
 *   no 200) · Anki AM con vencidas sin tope + Good/Again + telemetría · tope de creación ${AK.topeDia}/día repartido por bloque con la cabecera APEX
 *   del día · sábado con «Save to All Subdecks» (+ Optimize FSRS el ${fd(SAB_OPT)}) · ${METODO_MD}.
 * v6.05 (24-oct-2026): D1 = lun 26-oct (la semana del 19 sin estudio) · F1 = 47 filas · mismo guion por D# (D1 UWSA1 lun 26 · D2 mar 27 ·
 *   D3 mié 28 · D4 jue 29 · D5 vie 30 · sáb 31-oct / dom 1-nov solo Anki) · v5.20 D47-D51 → bbDesplazadasTramo2 · lo que no cabe en el D46
 *   (último día de contenido) queda en colaAlCierreF1 y su aviso lo manda al tramo 2: nada se recorta.
 * v6.05b (24-oct-2026): la cola al cierre de F1 con destino explícito en el tramo 2 (colaAlCierreF1Destino) · guía de las filas desplazadas de
 *   F1 en su fecha T con el mismo guion por D# + 16:15 REENTRADA y el NBME 29 con su Day-After (guiaTramo2) · días de cola de vídeo 07:15-07:45
 *   (colaTramo2) · colaAlCierreTramo2 = [] siempre.
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
  L.push(`## Tabla final · semana 1 USMLE (D1-D5: ${fd(DD(1))} → ${fd(DD(5))}-${DD(5).slice(0, 4)})`, '', '| Día | Franja | Bloque | Qué · cuánto (pasos con minutos) | Cómo (resumen) | Enlace |', '|---|---|---|---|---|---|');
  for (const f of FECHAS.filter((x) => x <= DD(5))) for (const g of GUIA[f]) {
    L.push(`| ${fd(f)} | ${g.franja} (${g.totalMin}′) | ${esc(g.titulo)} | ${g.pasos.map((p) => `**${p.min}′** ${esc(p.que)}`).join('<br>')} | ${g.pasos.map((p) => esc(p.como)).join('<br>')} | ${[...new Set(g.pasos.filter((p) => p.enlace).map((p) => `[${esc(p.enlace.t)}](${p.enlace.url})`))].join('<br>') || '—'} |`);
    if (g.aviso) L.push(`| | | ⚠ aviso | ${esc(g.aviso)} | | |`);
  }
  L.push('', '## Reparto de vídeo F1 (minutos reales por franja; P = Palmerton)', '', '| D | Fecha | v | 05:00 | 07:15 | 09:00 | cola tras el día |', '|---|---|---|---|---|---|---|');
  const fx = (a) => a.map((x) => `${x.tipo === 'bb' ? BB.get(x.id).nombre.replace(/^\d+ - /, '') : 'P·' + PALM[x.id].t.slice(0, 22)}${x.ini || x.fin !== (x.tipo === 'bb' ? BB.get(x.id).s : PALM[x.id].s) ? ` [${mmss(x.ini)}-${mmss(x.fin)}]` : ''} ${x.min}′`).join(' · ') || '—';
  for (const r of F1) { const p = REP[r.d]; L.push(p ? `| D${r.d} | ${fd(r.fecha)} | ${vel(r.d).v} | ${esc(fx(p.s0500))} | ${esc(fx(p.s0715))} | ${esc(fx(p.s0900))} | ${p.colaTras.bbMin}′ B&B + ${p.colaTras.palmMin}′ P |` : `| D${r.d} | ${fd(r.fecha)} | — | HITO | ${esc(r.sub)} | | |`); }
  L.push('', `Cola al cierre de F1: ${META.colaAlCierreF1.join(' · ') || 'vacía'}. ${META.escenario125}`);
  L.push('', '## uWorld: días con preguntas previsiblemente justas (aviso en el pre-test)', '');
  for (const r of F1) { const q = QS[r.d]; if (q && q.deficit) L.push(`- D${r.d} ${fd(r.fecha)} · ${MF1[r.d].uw.map(uwNom).join(' + ')}: ~${q.dispAntes} Unused antes del día para ${q.dispAntes + q.deficit} → respaldo Mehlman ${(MF1[r.d].mh || []).map(mhNom).join(' + ')}`); }
  L.push('', '## Vídeos B&B de los capítulos de F1 que no caen en ningún día de F1', '', ...SIN_DIA.map((x) => `- ${x}`));
  fs.writeFileSync(INFORME, L.join('\n') + '\n');
  console.log('✓ informe → ' + INFORME);
}
