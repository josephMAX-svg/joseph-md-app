/**
 * gen_guia_lectura.js — genera DATA/MIR/guia_lectura_semana1-2.json (nombre histórico: desde v6.03 cubre D1-D76): QUÉ leer, CUÁNTO y CÓMO
 * en el bloque MIR 15:15–16:15 de los 76 días-tema del plan (v6.08: lun 16-nov-2026 → jue 4-mar-2027; v6.07: lun 9-nov → jue 25-feb; v6.06: lun 2-nov → jue 18-feb; v6.05: lun 26-oct → jue 11-feb; v6.03: mié 21-oct → lun 8-feb) y en el slot ProMIR de Derma (d3)
 * + plan B de lectura Derma d1-d3, a partir de la
 * MEDICIÓN REAL de los capítulos ProMIR (medicion_promir_2026-10-18/<capId>.json, hecha con analiza_cap.js en el Chrome de Joseph,
 * solo lectura, sin iniciar tests) y de los planes de la app (mirDailyPlan · mirPreguntasOficiales · dermaDailyPlan · ankiLinks).
 *
 *   Uso:  node DATA/MIR/guia_lectura/gen_guia_lectura.js            (escribe el JSON)
 *         node DATA/MIR/guia_lectura/gen_guia_lectura.js --check    (comprueba que el JSON del repo está al día y que cada bloque suma 60′)
 *
 * Bitácora
 *  · v6.02c (18-oct-2026 · Joseph: «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar»): primera versión. Método en `_meta.metodo`.
 *    Formato de cada bloque = GuiaBloque (src/lib/guia.ts, lo crea E1): { franja, plan, titulo, totalMin, pasos[{min, que, como, enlace?}],
 *    recursos[{t, url, min?, cantidad?}], hecho, planB? } + campos extra de datos (`preguntas`, `secciones`) que la UI puede ignorar.
 *    Nada inventado: palabras, secciones, figuras, tablas, vídeos y citas MIR salen de la medición; las páginas no se dan (ProMIR no
 *    pagina); el texto de «Orientación MIR» de ProMIR NO se copia (repo público): `enfasis` es un resumen propio de 1-2 líneas.
 *  · v6.02c F2 (18-oct-2026, hallazgos E6): D1 15:23 «5Q CIEGAS extra» con enlace directo (la 1.ª en el paso + las 5 en los recursos) ·
 *    test ProMIR del d3 de Derma: «(2Q más solo si te sobra tiempo)» en vez de «(10Q solo si el caso de 13:36 terminó antes)» (el plan B
 *    no tiene caso y en el plan A el caso no es a las 13:36).
 *  · v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct + MEDICIÓN COMPLETA): la medición ProMIR cubre ya los 76 capítulos del plan (66 medidos
 *    el 20-oct con la sesión de Joseph y el mismo analiza_cap.js; el texto del recuadro «Orientación MIR» se retiró de los JSON al versionar:
 *    repo público) → la guía MEDIDA pasa de D1-D10 a D1-D76 (D77 mini-MIR y D78 corrección no leen capítulo: siguen en mirGuia.ts). Método:
 *    (1) se reserva el pool de la app de los 76 capítulos ANTES de repartir (ningún quiz usa la versión ProMIR de un pre-test futuro);
 *    (2) TEST DE CIERRE = pool de la app sin usar y, si no llega a 10 (con los 76 capítulos reservados: Gastroenterología 0 · Hematología 5 ·
 *    Reumatología 8 · Endocrino, Nefro y Pediatría 9), se completa con preguntas MIR citadas en los capítulos del bloque recién cerrado y no
 *    usadas (≥2015 primero, más recientes primero); (3) quiz corto (capítulo con pocas citadas): se completa con citadas no usadas de los
 *    capítulos YA leídos de la misma asignatura (interleaving del bloque), y si aun así no llega, del bloque anterior; (4) `enfasis`: los 11
 *    resúmenes propios se conservan y el resto se DERIVA de la medición (las 3 secciones con más preguntas citadas; ningún texto de ProMIR);
 *    (5) Derma: las sesiones de las semanas 1-2 se toman por d (d1-d5), no por fechas cableadas (19-30 oct). Fechas = mirDailyPlan (v6.03).
 *  · v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; del 19 al 25-oct sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 26-oct → D76 jue
 *    11-feb · dermaDailyPlan d1-d5 mar 27-oct → vie 6-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; la semana lun 26 → vie 30-oct sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 2-nov →
 *    D76 jue 18-feb · dermaDailyPlan d1-d5 lun 2 → jue 12-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.08 (14-nov-2026 · re-fecha D1 = lun 16-nov; la semana del lun 9-nov sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 16-nov →
 *    D76 jue 4-mar · dermaDailyPlan d1-d5 lun 16 → jue 26-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.09 (16-nov-2026 · D1 = mar 17-nov; el lun 16 no se estudió y el jue 31-dic pasa a hábil): solo cambian las FECHAS de F1 (mirDailyPlan D1 mar
 *    17-nov → D32 jue 31-dic, desde D33 lun 4-ene igual que la v6.08: D76 jue 4-mar · dermaDailyPlan d1-d5 mié 18-nov → lun 30-nov); medición, reparto de
 *    preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.09 · lote 1 (17-nov-2026 · auditoría tiempo ↔ material a2-7): el paso de las 15:53 pasa de «8Q comentadas (máx. 10)» a «6Q comentadas (máx. 8)»
 *    (77 s + 30 s de comentario = 107 s/Q: 6Q ≈ 10,7′ en 12′; 8Q eran 14,3′). Solo cambia el TEXTO del paso y del «hecho» (QUIZ_HACER): la lista del quiz
 *    (8-10Q), su reparto con las anclas y las preguntas de todos los días quedan idénticos; las de la lista que no entran siguen en la cola del capítulo.
 *    Aplica a los 76 días-tema (también los de 2027: es el mismo texto).
 *  · v6.09b · lote 1-ter (17-nov-2026 · revisión R del lote 1-bis: 53 pasos MIR de F1 fuera de 0,85-1,15): SOLO F1 desde el D2 (mié 18-nov → jue 31-dic; el D1
 *    —en curso— y 2027 quedan idénticos): eval anclada de 4Q 7′ → 6′ (su cronómetro; 4 × 77 s = 5,1′ → 0,86) con el minuto al Anki (5′ → 6′) · pre-test 5Q
 *    8′ → 7′ (6,4′ → 0,92) con el minuto a la LECTURA DIRIGIDA (15′ → 16′, las mismas secciones): a 150 palabras/min —la regla fija de lectura en español—
 *    suman 15,5-18,1′ con el recuadro (a 15′, 5 días quedaban por encima de 1,15; a 16′, todos en 0,97-1,13) y el paso lo declara «(N′ medidos a 150
 *    palabras/min; M′ a 180)». --check valida esas razones en F1 y que fuera de F1 no cambia nada. Preguntas, secciones y reparto: idénticos.
 *  · v6.09b · lote 1-quater (17-nov-2026 · revisión R2 del lote 1-ter): las evals de 2-3Q de F1 (D2 mié 18 · D3 jue 19 · D6 mar 24 · D7 mié 25-nov) dejaban
 *    «los N′ que sobran, adelanta el Anki» (la eval sola a 0,37-0,55): sus 7′ son ahora 4Q COMENTADAS (77 s + 30 s = 107 s/Q → 7,1′ → 1,02) = las ancladas
 *    + (4 − nQ) de la cola del quiz del D-1 (la 7.ª-10.ª de su lista, ya en el plan; en preguntas.eval como slot «cola D-1»); el quiz que cede (D2, D5, D6;
 *    el D1 —en curso— no se toca) lo anuncia al principio de su «cómo» con la fecha. Anki 5′ y log 3′ (aciertos/4) sin cambio. Derma: el plan B de lectura
 *    d1-d3 lleva además `min150` (los mismos apartados a 150 palabras/min, la regla fija en español). --check exige la cola en toda eval de < 4Q de F1 y
 *    que ningún paso de F1 deje minutos «que sobran». 2027 idéntico (no tiene evals de < 4Q).
 *  · v6.07 (8-nov-2026 · corrimiento D1 = lun 9-nov; la semana del lun 2-nov sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 9-nov →
 *    D76 jue 25-feb · dermaDailyPlan d1-d5 mar 10 → vie 20-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'DATA/MIR/guia_lectura_semana1-2.json');
const MED = path.join(__dirname, 'medicion_promir_2026-10-18');
const CHECK = process.argv.includes('--check');

// ── carga de src/lib/*.ts transpilado en memoria (solo lectura; mismo patrón que los verificadores) ──
const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
const cache = new Map();
function load(rel) {
  let file = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  if (!fs.existsSync(file)) for (const ext of ['.ts', '.tsx']) if (fs.existsSync(file + ext)) { file += ext; break; }
  if (cache.has(file)) return cache.get(file).exports;
  const m = { exports: {} }; cache.set(file, m);
  const src = fs.readFileSync(file, 'utf8').replace(/import\.meta\.env/g, '({})');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const req = (spec) => (spec.startsWith('.') ? load(path.resolve(path.dirname(file), spec)) : {});
  new Function('exports', 'module', 'require', js)(m.exports, m, req);
  return m.exports;
}
const MD = load('src/lib/mirDailyPlan.ts');
const POOL = load('src/lib/mirPreguntasOficiales.ts');
const DERMA = load('src/lib/dermaDailyPlan.ts');
const ANKI = load('src/lib/ankiLinks.ts');

// ── método (declarado) ──
const RITMO = { prosaPpm: 180, tablaPpm: 90, figuraMin: 0.5 };
const LECTURA_MIN = 15;          // franja 15:38–15:53 (MIR_FRANJAS)
const ORIENT_MIN = 1;            // recuadro «Orientación MIR» al empezar la lectura
const CLIP_MAX_SEG = 12 * 60;    // regla MIR_FRANJAS: «vídeo solo si el clip es ≤12 min verificado»
const SEG_POR_Q = 77;            // MIR_SEG_POR_Q (210Q / 270 min)
const QUIZ_N = 8, QUIZ_MAX = 10; // LISTA del quiz: 8-10Q (selección y reparto con las anclas, sin cambio)
// v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a2-7): lo que se HACE en los 12′ = 6Q comentadas (máx. 8): 77 s + 30 s de comentario = 107 s/Q →
//   6Q ≈ 10,7′ (8Q = 14,3′ no cabían); la lista sigue siendo de 8-10 y las que no entran quedan en la cola del capítulo (esta lista, en orden)
const QUIZ_HACER = 6, QUIZ_HACER_MAX = 8, SEG_COMENTARIO = 30;
// v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis: 53 pasos MIR de F1 fuera de 0,85-1,15 —pre-test 5Q en 8′ = 0,80 y eval anclada 4Q en 7′ = 0,73—):
//   SOLO F1 desde el D2 (mié 18-nov → jue 31-dic; el D1 —mar 17-nov, en curso— y 2027 no cambian), dentro de las mismas franjas y sin material nuevo:
//   · 15:15-15:30: la eval anclada de 4Q dura su cronómetro (6′; 4 × 77 s = 5,1′) y el minuto pasa al Anki (6′; deuda a cero + mazo de Ravi, paso elástico);
//     las evals de 2-3Q (D2, D3, D6, D7) siguen con 7′ (lote 1-quater: 4Q comentadas con la cola del quiz del D-1, ver colaEvalDe).
//   · 15:30-16:15: el pre-test 5Q pasa a 7′ (5 × 77 s = 6,4′) y el minuto pasa a la LECTURA DIRIGIDA (16′) con las MISMAS secciones: a 150 palabras/min
//     —la regla fija de lectura en español— suman 15,5-18,1′ con el recuadro (a 180, 13,5-15′): a 15′ había 5 días por encima de 1,15; a 16′, todos en 0,97-1,13.
const LOTE1T_DESDE = '2026-11-18', LOTE1T_HASTA = '2027-01-03', PPM_REGLA = 150;
const enLote1t = (iso) => iso >= LOTE1T_DESDE && iso <= LOTE1T_HASTA;
// v6.09b · lote 1-quater (17-nov-2026, revisión R2 del lote 1-ter, hallazgo de las evals de 2-3Q): en F1 (D2, D3, D6, D7 = mié 18 · jue 19 · mar 24 ·
//   mié 25-nov) la eval de 2-3Q ya no deja «los N′ que sobran, adelanta el Anki»: los 7′ son 4Q COMENTADAS (77 s + 30 s = 107 s/Q → 4 × 107 s = 7,1′) =
//   las nQ ancladas + (4 − nQ) de la COLA del quiz del D-1 (la 7.ª-10.ª de su lista: material del plan que ya existe, sin tocar ningún otro día). El Anki
//   (5′) y el log (3′, aciertos/4) no cambian; 2027 no tiene evals de < 4Q.
const SEG_EVAL_COMENTADA = SEG_POR_Q + SEG_COMENTARIO, EVAL_Q_F1 = 4;
/** Cola del quiz del D-1 que entra en la eval del día d (solo F1 con < 4Q ancladas): { dC = día cuyo quiz cede, n = cuántas, fecha del día d } o null. */
function colaEvalDe(d) {
  const x = MD.mirDiaN(d); if (!x || !enLote1t(x.fecha) || MD.mirCierreDe(d)) return null;
  const a = MD.mirAnclas(d); if (!a.d1) return null;
  const nQ = (a.d1 ? 2 : 0) + (a.d3 ? 1 : 0) + (a.d7 ? 1 : 0);
  return nQ < EVAL_Q_F1 ? { dC: a.d1.d, n: EVAL_Q_F1 - nQ, nQ, fecha: x.fecha } : null;
}
const dec1 = (x) => String(Math.round(x * 10) / 10).replace('.', ',');
/** Minutos de la lectura elegida (recuadro + secciones) a 150 palabras/min en la prosa (tablas a 90, figuras 0,5′ y clips, como el generador); una sección
 *  PARCIAL cuenta la misma fracción que a 180. */
const min150 = (sel) => ORIENT_MIN + sel.reduce((s, u) => {
  const clip = u.clips.reduce((a, v) => a + v.seg, 0) / 60;
  const r150 = u.palabras / PPM_REGLA + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + clip;
  const r180 = u.palabras / RITMO.prosaPpm + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + clip;
  return s + (u.parcial ? (u.minLeer * r150) / Math.max(r180, 0.01) : r150);
}, 0);
const PROMIR = 'https://promir.medicapanamericana.com';
const capUrl = (id) => `${PROMIR}/capitulo/${id}`;
const preguntaUrl = (pid) => `${PROMIR}/pregunta/MIR/${pid}`;
/** id del pool de la app (año del EXAMEN, p. ej. 2024-050) → id ProMIR (año de la convocatoria, 2023-050 = «MIR 2023-2024, P050»).
 *  Verificado el 18-oct con 3 casos: pool 2024-050 = ProMIR 2023-050 (Fase II) · 2024-049 = 2023-049 (Fase IV) · 2023-052 = 2022-052. */
const poolAProMIR = (id) => `${+id.slice(0, 4) - 1}-${id.slice(5)}`;
const proMIRAPool = (pid) => `${+pid.slice(0, 4) + 1}-${pid.slice(5)}`;
const r05 = (x) => Math.round(x * 2) / 2;
const fmtSeg = (s) => (s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtF = (iso) => `${WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${+iso.slice(8)}-${MES[+iso.slice(5, 7) - 1]}`;

/** Resumen PROPIO (no copia) del recuadro «Orientación MIR» de cada capítulo: qué pide ProMIR priorizar. */
const ENFASIS = { // 11 resúmenes propios (v6.02c); el resto lo deriva enfasisMedido() de la medición (v6.03)
  '570779c9f4d68bf008dbc7b1': 'El capítulo de Epidemiología más preguntado de forma constante: dominarlo entero. Foco: definición y características del ECA, aleatorización, análisis (NNT; por protocolo vs por intención de tratar), tipos (pragmático vs explicativo) y fases.',
  '570779c9f4d68bf008dbc80d': 'Muy preguntado: los diseños (transversal, casos y controles, cohortes, ecológico, ensayo) con sus ventajas, limitaciones y para qué sirve cada uno.',
  '570779c9f4d68bf008dbc80f': 'Preguntas en todas las convocatorias; cálculos sencillos de exactitud diagnóstica (S, E, VPP, VPN, cocientes de probabilidad); la curva ROC usa los mismos conceptos.',
  '64a3be863f62ec1dbb3e665b': 'Preguntas en aumento; casi todas salen con sentido común + pocos conceptos teóricos (principios, relación médico-paciente, consentimiento, rechazo de tratamiento).',
  '570779c9f4d68bf008dbc7e9': '≈3 preguntas/año; recurrentes: shock, pulso venoso yugular y ruidos/soplos; es la base del resto de Cardiología.',
  '570779c9f4d68bf008dbc78d': 'Preguntas todos los años: ECG básico, manejo de la FA, diagnóstico diferencial de las taquicardias supraventriculares, bloqueos AV e indicaciones de marcapasos.',
  '570779c9f4d68bf008dbc731': 'El tema más preguntado del MIR en los últimos años: separar enfermedad coronaria estable de SCA; lo esencial es diagnóstico y tratamiento del SCA y sus complicaciones (sobre todo mecánicas).',
  '64588d5ef704295c924d9289': '3-4 preguntas/año (directas o indirectas): obligado y muy rentable.',
  '570779c8f4d68bf008dbc65a': 'Importancia intermedia (≈2 preguntas/examen); ProMIR lo expone por entidades, con caso clínico en cada una.',
  '570779c8f4d68bf008dbc658': 'En auge por los fármacos con impacto pronóstico (iSGLT2 y arGLP-1 en diabetes; nuevos hipolipemiantes en dislipemia).',
  '570779c8f4d68bf008dbc646': 'Poco preguntado de forma directa, pero es el vocabulario de toda la Dermatología (estructura, lesiones elementales, tratamientos): volver a él las veces que haga falta.',
};

/** v6.03: énfasis DERIVADO de la medición (sin texto de ProMIR): las 3 secciones con más preguntas MIR citadas, ponderadas por recencia. */
function enfasisMedido(us) {
  const top = us.filter((u) => u.nivel !== 'H2' && u.score > 0).sort((a, b) => b.score - a.score || a.i - b.i).slice(0, 3);
  return top.length ? `Medido (preguntas MIR que cita el capítulo, ponderadas por recencia): el peso está en ${top.map((u) => `${u.titulo} (${u.citasMIR} citadas${u.citasDesde2015 ? `, ${u.citasDesde2015} ≥2015` : ''})`).join(' · ')}.` : null;
}

// ── medición → unidades de lectura ──
function cargarMedicion(capId) {
  const f = path.join(MED, capId + '.json');
  if (!fs.existsSync(f)) throw new Error('falta la medición de ' + capId);
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}
function unidades(med) {
  return med.secciones.map((s, i) => {
    const clips = s.videos.filter((v) => v.seg > 0 && v.seg <= CLIP_MAX_SEG);
    const largos = s.videos.filter((v) => v.seg > CLIP_MAX_SEG);
    const min = s.palabras / RITMO.prosaPpm + s.palabrasTabla / RITMO.tablaPpm + s.figs * RITMO.figuraMin + clips.reduce((x, v) => x + v.seg, 0) / 60;
    const c15 = s.citasMIRdesde2015, c20 = s.citasMIRdesde2020;
    return {
      i, nivel: s.nivel, titulo: s.titulo, palabras: s.palabras, palabrasTabla: s.palabrasTabla, figs: s.figs, tablas: s.tablas.length,
      citasMIR: s.citasMIR, citasDesde2015: c15, citasDesde2020: c20, citas: s.citas.slice().sort().reverse(),
      clips: clips.map((v) => ({ seg: v.seg, dur: fmtSeg(v.seg), leyenda: v.leyenda })), largos: largos.map((v) => ({ seg: v.seg, dur: fmtSeg(v.seg), leyenda: v.leyenda })),
      min: Math.max(0.5, r05(min)),
      /** peso de la sección DENTRO del capítulo = sus preguntas MIR citadas, ponderadas por recencia: ≥2020 ×3 · 2015-2019 ×2 · <2015 ×1 */
      score: c20 * 3 + (c15 - c20) * 2 + (s.citasMIR - c15),
    };
  });
}

/** Lectura dirigida de 15′: recuadro de orientación (1′) + secciones por peso hasta llenar 14′; la sección top que no cabe entera
 *  se lee PARCIAL (solo los párrafos con chip MIR reciente). Reserva = las 3 siguientes por peso (para cuando aciertas el pre-test). */
function elegirLectura(us, pretestSecs) {
  const cand = us.filter((u) => u.nivel !== 'H2' && (u.palabras > 0 || u.palabrasTabla > 0)).map((u) => ({ ...u, s: u.score + (pretestSecs.has(u.i) ? 5 : 0) }))
    .sort((a, b) => b.s - a.s || a.min - b.min || a.i - b.i);
  let resto = LECTURA_MIN - ORIENT_MIN; const sel = []; let parcial = null;
  for (const u of cand) {
    if (resto < 1) break;
    if (u.s <= 0) break; // sin preguntas MIR citadas → no entra en los 15′
    if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false }); resto -= u.min; }
    else if (!sel.length || (!parcial && resto >= 4 && u.s >= cand[0].s * 0.5)) { parcial = { ...u, minLeer: r05(resto), parcial: true }; sel.push(parcial); resto = 0; }
  }
  // v6.03: capítulo con pocas secciones citadas (D22 se quedaba en 7,5′ de 15′) → si sobran ≥3′, se completa con las secciones SIN preguntas
  // citadas que caben enteras, en el orden del capítulo (contexto: dan sentido a las citadas); con ≥14′ de citadas no cambia nada.
  if (resto >= 3) {
    for (const u of cand.filter((x) => x.s <= 0).sort((a, b) => a.i - b.i)) {
      if (resto < 1) break;
      if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false, contexto: true }); resto -= u.min; }
    }
  }
  const elegidos = new Set(sel.map((x) => x.i));
  const reserva = cand.filter((u) => !elegidos.has(u.i) && u.s > 0).slice(0, 3);
  return { sel: sel.sort((a, b) => a.i - b.i), reserva, minUsados: r05(LECTURA_MIN - resto) };
}

// ── días MIR D1-D10 ──
const DIAS = MD.MIR_DIAS.filter((x) => x.d >= 1 && x.d <= MD.MIR_TEMAS_TOTAL); // v6.03: D1-D76 (antes D1-D10); D77/D78 no leen capítulo
const usadosPool = new Set();      // ids del pool de la app ya asignados (pre-tests, cierres)
const usadosProMIR = new Set();    // ids ProMIR ya asignados
const ANCLAS = {};                 // d → { d1: [2 ids], d3: [1], d7: [1] } (para las evals de los días siguientes)
const CAP = {};                    // d → datos del capítulo
// TODO el pool de la app de los 10 capítulos (pre-test + resto, que va al quiz) se reserva ANTES de repartir quiz/anclas: así ningún quiz usa la versión ProMIR
// de una pregunta que otro día va a salir en su pre-test (p. ej. pool 2022-122 = ProMIR 2021-122)
for (const x of DIAS) for (const id of POOL.preguntasDeCapitulo(x.capId).map((q) => q.id)) { usadosPool.add(id); usadosProMIR.add(poolAProMIR(id)); }
for (const x of DIAS) {
  const med = cargarMedicion(x.capId);
  const us = unidades(med);
  const pool = POOL.preguntasDeCapitulo(x.capId).map((q) => q.id).sort();
  const secDeProMIR = (pid) => us.find((u) => u.citas.includes(pid));
  // pre-test: las del pool de la app (hasta 5); si faltan, se completa con citadas ≥2015 de las secciones de más peso
  const pre = pool.slice(0, 5).map((id) => { const pid = poolAProMIR(id); const u = secDeProMIR(pid); return { id, fuente: 'pool app', promir: pid, url: preguntaUrl(pid), seccion: u ? u.titulo : null }; });
  pre.forEach((p) => { usadosPool.add(p.id); usadosProMIR.add(p.promir); });
  const pretestSecs = new Set(pre.map((p) => us.findIndex((u) => u.titulo === p.seccion)).filter((i) => i >= 0));
  const { sel, reserva, minUsados } = elegirLectura(us, pretestSecs);
  const porPeso = us.slice().sort((a, b) => b.score - a.score || a.i - b.i);
  const ordenCitas = (secs) => secs.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid));
  if (pre.length < 5) {
    for (const { pid, u } of ordenCitas(porPeso.filter((u) => u.citasDesde2015 > 0)).filter((c) => +c.pid.slice(0, 4) >= 2015)) {
      if (pre.length >= 5) break; if (usadosProMIR.has(pid)) continue;
      pre.push({ id: null, fuente: 'citada ProMIR', promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usadosProMIR.add(pid);
    }
  }
  if (pre.length < 5) { // v6.03: capítulo con pocas citadas ≥2015 libres (D22 · D48 · D60) → se completa con las anteriores del MISMO capítulo, más recientes primero
    for (const { pid, u } of ordenCitas(porPeso)) {
      if (pre.length >= 5) break; if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid)) || pre.some((p) => p.promir === pid)) continue;
      pre.push({ id: null, fuente: 'citada ProMIR', promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usadosProMIR.add(pid);
    }
  }
  // D1 (sin anclas ni cierre): 5Q ciegas EXTRA = citadas ≥2015 de las secciones de más peso, reservadas ANTES del quiz
  const sinEval = !MD.mirCierreDe(x.d) && !MD.mirAnclas(x.d).d1;
  const extra = [];
  if (sinEval) {
    for (const { pid, u } of ordenCitas(porPeso).filter((c) => +c.pid.slice(0, 4) >= 2015)) {
      if (extra.length >= 5) break; if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid))) continue;
      extra.push({ promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usadosProMIR.add(pid);
    }
  }
  // quiz 8-10Q + anclas futuras: citadas de las secciones LEÍDAS (más recientes primero); si no llegan, del resto por peso
  const fuenteQuiz = ordenCitas(sel).concat(ordenCitas(porPeso.filter((u) => !sel.some((s) => s.i === u.i))));
  const libres = fuenteQuiz.filter((c) => !usadosProMIR.has(c.pid) && !usadosPool.has(proMIRAPool(c.pid)));
  const vistos = new Set(); const dedup = libres.filter((c) => !vistos.has(c.pid) && vistos.add(c.pid));
  // el pool de la app que no cabe en el pre-test (capítulos con >5) abre el quiz: se responde en la app, con clave oficial y qIds
  const quizPool = pool.slice(5).slice(0, QUIZ_MAX).map((id) => { const pid = poolAProMIR(id); const u = secDeProMIR(pid); return { id, fuente: 'pool app', promir: pid, url: preguntaUrl(pid), seccion: u ? u.titulo : null, leida: !!u && sel.some((s) => s.i === u.i) }; });
  // v6.03: con los 76 capítulos, los de pocas preguntas citadas se quedaban sin anclas (D-1/D-3/D-7 sin pregunta) → el quiz cede hasta 4
  // citadas a las anclas futuras (2Q D-1 + 1Q D-3 + 1Q D-7) sin bajar de QUIZ_N (8); con ≥14 libres sigue siendo de 10.
  const ANCLAS_N = 4;
  const nCit = Math.max(0, Math.min(QUIZ_MAX - quizPool.length, Math.max(QUIZ_N - quizPool.length, dedup.length - ANCLAS_N)));
  const quiz = quizPool.concat(dedup.slice(0, nCit).map((c) => ({ id: null, fuente: 'citada ProMIR', promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo, leida: sel.some((s) => s.i === c.u.i) })));
  quiz.forEach((q) => usadosProMIR.add(q.promir));
  // v6.03: capítulo con pocas preguntas citadas → el quiz se completa hasta QUIZ_N con citadas no usadas de capítulos YA leídos (misma
  // asignatura primero —interleaving del bloque—, luego el resto de días previos), más recientes primero; quedan marcadas `deDia`.
  if (quiz.length < QUIZ_N) {
    const previos = Object.values(CAP).filter((c) => c.x.d < x.d).sort((a, b) => (b.x.num === x.num) - (a.x.num === x.num) || b.x.d - a.x.d);
    for (const c of previos) {
      for (const { pid, u } of c.us.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid))) {
        if (quiz.length >= QUIZ_N) break;
        if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid))) continue;
        quiz.push({ id: null, fuente: 'citada ProMIR · repaso', promir: pid, url: preguntaUrl(pid), seccion: u.titulo, leida: true, deDia: c.x.d, tema: c.x.tema });
        usadosProMIR.add(pid);
      }
      if (quiz.length >= QUIZ_N) break;
    }
  }
  const sigue = dedup.slice(nCit);
  ANCLAS[x.d] = { d1: sigue.slice(0, 2), d3: sigue.slice(2, 3), d7: sigue.slice(3, 4) };
  for (const a of [].concat(ANCLAS[x.d].d1, ANCLAS[x.d].d3, ANCLAS[x.d].d7)) usadosProMIR.add(a.pid);
  const minCompleta = r05(us.reduce((s, u) => s + u.min, 0));
  CAP[x.d] = { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta, extra };
}

function pasosDia(d) {
  const { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta } = CAP[d];
  const L1 = enLote1t(x.fecha); // v6.09b · lote 1-ter: F1 desde el D2
  const deck = ANKI.mirAnkiDeck(x.asignatura);
  const cierre = MD.mirCierreDe(d);
  const anc = MD.mirAnclas(d);
  const pasos = []; const preguntas = {};
  if (cierre) {
    const num = cierre.num;
    const sinUsar = POOL.preguntasDeAsignatura(num).map((q) => q.id).filter((id) => !usadosPool.has(id) && !usadosProMIR.has(poolAProMIR(id))).sort().reverse();
    const ids = sinUsar.slice(0, 10); ids.forEach((id) => { usadosPool.add(id); usadosProMIR.add(poolAProMIR(id)); });
    preguntas.cierre = ids.map((id) => ({ id, fuente: 'pool app', promir: poolAProMIR(id), url: preguntaUrl(poolAProMIR(id)) }));
    // v6.03: si el pool de la asignatura no llega a 10 (sus capítulos del plan ya lo consumieron), se completa con preguntas MIR citadas en los
    // capítulos del bloque recién cerrado que no salieron en ningún paso (≥2015 primero; dentro, más recientes primero)
    const citBloque = Object.values(CAP).filter((c) => c.x.d >= cierre.dIni && c.x.d <= cierre.dFin).flatMap((c) => c.us.flatMap((u) => u.citas.map((pid) => ({ pid, u, c }))))
      .filter((y) => !usadosProMIR.has(y.pid) && !usadosPool.has(proMIRAPool(y.pid)))
      .sort((a, b) => (+b.pid.slice(0, 4) >= 2015) - (+a.pid.slice(0, 4) >= 2015) || b.pid.localeCompare(a.pid));
    const vistosCierre = new Set();
    for (const y of citBloque) {
      if (preguntas.cierre.length >= 10) break;
      if (vistosCierre.has(y.pid)) continue; vistosCierre.add(y.pid);
      preguntas.cierre.push({ id: null, fuente: 'citada ProMIR', promir: y.pid, url: preguntaUrl(y.pid), seccion: y.u.titulo, deDia: y.c.x.d });
      usadosProMIR.add(y.pid);
    }
    const nCitCierre = preguntas.cierre.length - ids.length;
    const fuenteCierre = nCitCierre ? `pool oficial de la app sin usar (${ids.length} de ${cierre.asignatura}: sus capítulos del plan ya consumieron el resto) + ${nCitCierre} preguntas MIR citadas en los capítulos del bloque D${cierre.dIni}-D${cierre.dFin} que no salieron en ningún paso (≥2015 primero)` : `pool oficial de la app sin usar (${sinUsar.length} de ${cierre.asignatura} tras los pre-tests)`;
    pasos.push({ min: 15, hora: '15:15–15:30', que: `TEST DE CIERRE · 10Q reales MIR de ${cierre.asignatura} (bloque D${cierre.dIni}-D${cierre.dFin} cerrado)`, como: `Cronómetro 13 min (77 s/Q), en blanco si no descartas 2 · fuente: ${fuenteCierre} · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % la asignatura entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre).` });
  } else if (!anc.d1) { // D1: sin anclas (el primer día del plan)
    pasos.push({ min: 5, hora: '15:15–15:20', que: `ARRANQUE (D1 no tiene anclas) · Anki: crear el mazo ${deck}`, como: 'Preset FSRS de APEX::MIR (retention 0,85; DATA/MIR/README.md §5). Sin tarjetas nuevas todavía: las crean los APEX de las 16:05.' });
    // 5Q ciegas extra (citadas ≥2015 de las secciones de más peso, distintas del pre-test; reservadas en el primer pase)
    const extra = CAP[d].extra;
    if (extra.length !== 5) throw new Error('D' + d + ': 5Q ciegas extra → ' + extra.length);
    preguntas.extraD1 = extra;
    pasos.push({ min: 3, hora: '15:20–15:23', que: 'Recuadro «Orientación MIR» del capítulo + mapa de secciones (sin leer el texto)', como: 'Lee solo el recuadro y recorre los títulos: las secciones marcadas en «Lectura 15′» son las que concentran las preguntas MIR citadas.', enlace: { t: 'Capítulo ProMIR', url: capUrl(x.capId) } });
    pasos.push({ min: 7, hora: '15:23–15:30', que: `5Q CIEGAS extra · preguntas MIR ≥2015 citadas en el capítulo (${extra.map((c) => c.promir).join(' · ')})`, como: 'Abre cada enlace (ProMIR → pregunta: el botón de este paso = la 1.ª; las 5 están en los recursos de la tarjeta), responde SIN leer, 77 s/Q, en blanco si no descartas 2 · apunta acierto/fallo: cada fallo marca la sección a leer en la lectura dirigida.', enlace: { t: `1.ª de 5 · MIR ${extra[0].promir}`, url: extra[0].url } }); // v6.02c F2 (E6): enlace directo
  } else {
    const slots = [];
    if (anc.d1) slots.push({ k: 'D-1', d: anc.d1.d, n: 2, ids: ANCLAS[anc.d1.d].d1 });
    if (anc.d3) slots.push({ k: 'D-3', d: anc.d3.d, n: 1, ids: ANCLAS[anc.d3.d].d3 });
    if (anc.d7) slots.push({ k: 'D-7', d: anc.d7.d, n: 1, ids: ANCLAS[anc.d7.d].d7 });
    const nQ = slots.reduce((s, y) => s + y.n, 0);
    const cortos = slots.filter((y) => y.ids.length < y.n); // v6.03: capítulos de pocas citadas → la eval repite un fallo de ese día
    preguntas.eval = slots.map((y) => ({ slot: y.k, dia: y.d, tema: CAP[y.d].x.tema, preguntas: y.ids.map((c) => ({ promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo })) }));
    const minQ = Math.ceil((nQ * SEG_POR_Q) / 60);
    // v6.09b · lote 1-ter: en F1 (D2-D32) la eval de 4Q dura su cronómetro (6′) y el minuto pasa al Anki
    const evalMin = L1 && nQ === 4 ? minQ : 7; const hEval = `15:${15 + evalMin}`;
    const cola = colaEvalDe(d); // v6.09b · lote 1-quater: F1 con 2-3Q ancladas → 4Q comentadas con la cola del quiz del D-1
    const nomD = (dd) => `D${dd} ${CAP[dd].x.tema.split(' (')[0]}`;
    if (cola) {
      const qc = CAP[cola.dC].quiz.slice(QUIZ_HACER); // la 7.ª-10.ª de la lista del quiz del D-1 (las que su paso no pide: 6Q, máx. 8)
      // aunque ayer llegara a la 8.ª (máx.), quedan ≥ n en la cola
      if (qc.length - (QUIZ_HACER_MAX - QUIZ_HACER) < cola.n) throw new Error(`D${d}: la cola del quiz del D${cola.dC} no llega a ${cola.n}Q aunque ayer pararas en la ${QUIZ_HACER_MAX}.ª`);
      const pos = `la ${QUIZ_HACER + 1}.ª-${QUIZ_HACER + qc.length}.ª de su lista`;
      preguntas.eval.push({ slot: 'cola D-1', dia: cola.dC, tema: CAP[cola.dC].x.tema, posiciones: pos, n: cola.n, preguntas: qc.map((q) => ({ promir: q.promir, url: q.url, seccion: q.seccion })) });
      const tot = nQ + cola.n;
      const lasN = `${cola.n === 1 ? 'la primera' : `las ${cola.n} primeras`} de su lista que no hiciste ayer (${cola.n} × ${SEG_EVAL_COMENTADA} s ≈ ${dec1((cola.n * SEG_EVAL_COMENTADA) / 60)}′; ${cola.n === 1 ? `la ${QUIZ_HACER + 1}.ª` : `la ${QUIZ_HACER + 1}.ª y la ${QUIZ_HACER + 2}.ª`} si paraste en la ${QUIZ_HACER}.ª)`;
      const faltan = !anc.d3 ? 'no existen D-3/D-7 todavía' : 'no existe D-7 todavía';
      pasos.push({
        min: evalMin, hora: `15:15–${hEval}`,
        que: `EVAL ANCLADA ${nQ}Q + ${cola.n}Q de la cola del quiz del D${cola.dC} · ${tot}Q comentadas (${tot} × ${SEG_EVAL_COMENTADA} s = ${dec1((tot * SEG_EVAL_COMENTADA) / 60)}′) · ${slots.map((y) => `${y.n}Q ${y.k} (${nomD(y.d)})`).join(' + ')} · cola del quiz del D${cola.dC}: ${pos} (${qc.map((q) => q.promir).join(' · ')})`,
        como: `Cronómetro ${evalMin}′: ${tot}Q a ${SEG_POR_Q} s + ${SEG_COMENTARIO} s de comentario (${SEG_EVAL_COMENTADA} s/Q), en blanco si no descartas 2 · primero las ${nQ} ancladas (${nQ} × ${SEG_EVAL_COMENTADA} s ≈ ${dec1((nQ * SEG_EVAL_COMENTADA) / 60)}′; preguntas: las listadas, citadas ProMIR de lo que leíste ese día, no usadas) · después ${lasN}: hoy solo hay ${nQ}Q ancladas (${faltan}) y el hueco lo llena material del plan, no el Anki · registra las ${tot} juntas en el log de las 15:27 (aciertos/${tot})${cortos.length ? ` · ${cortos.map((y) => `${y.k} (D${y.d}) ${y.ids.length ? `solo trae ${y.ids.length} de ${y.n}` : 'no trae pregunta nueva'}`).join(' · ')}: su capítulo ya no tiene preguntas citadas sin usar → repite la que FALLASTE ese día (pre-test o quiz; si acertaste todo, la más difícil)` : ''} · si la app te propone un tema 🔥 caliente (gate), manda la app.`,
      });
    } else pasos.push({ min: evalMin, hora: `15:15–${hEval}`, que: `EVAL ANCLADA ${nQ}Q · ${slots.map((y) => `${y.n}Q ${y.k} (D${y.d} ${CAP[y.d].x.tema.split(' (')[0]})`).join(' + ')}`, como: `Cronómetro ${minQ}′ (77 s/Q${evalMin !== 7 ? `: ${nQ} × 77 s = ${dec1((nQ * SEG_POR_Q) / 60)}′` : ''}), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas)${nQ < 4 ? ` · hoy solo hay ${nQ}Q (no existen D-3/D-7 todavía): los ${7 - minQ}′ que sobran, adelanta el Anki` : ''}${cortos.length ? ` · ${cortos.map((y) => `${y.k} (D${y.d}) ${y.ids.length ? `solo trae ${y.ids.length} de ${y.n}` : 'no trae pregunta nueva'}`).join(' · ')}: su capítulo ya no tiene preguntas citadas sin usar → repite la que FALLASTE ese día (pre-test o quiz; si acertaste todo, la más difícil)` : ''} · si la app te propone un tema 🔥 caliente (gate), manda la app.` });
    pasos.push({ min: 12 - evalMin, hora: `${hEval}–15:27`, que: `Anki ${deck}`, como: 'FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer.' });
    pasos.push({ min: 3, hora: '15:27–15:30', que: 'Log de la eval en la app', como: 'aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana.' });
  }
  // pre-test (v6.09b · lote 1-ter: en F1, 7′ = 5 × 77 s ≈ 6,4′; el minuto pasa a la lectura)
  const preMin = L1 ? 7 : 8; const hPre = `15:${30 + preMin}`;
  pasos.push({ min: preMin, hora: `15:30–${hPre}`, que: `PRE-TEST 5Q ciegas del capítulo nuevo (${pre.filter((p) => p.fuente === 'pool app').length} del pool oficial de la app${pre.some((p) => p.fuente !== 'pool app') ? ` + ${pre.filter((p) => p.fuente !== 'pool app').length} citadas en ProMIR` : ''})`, como: (L1 ? 'Sin leer nada · 77 s/Q (5Q ≈ 6,4′)' : 'Sin leer nada · 77 s/Q') + ' · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta).' });
  preguntas.pretest = pre;
  // lectura
  const linea = (u) => `${u.titulo} (${u.parcial ? `PARCIAL ${u.minLeer}′ de ${u.min}′: solo los párrafos con chip MIR ≥2015` : `${u.min}′`}${u.citasMIR ? ` · ${u.citasMIR} preguntas MIR citadas` : ''}${u.contexto ? ' · contexto, sin preguntas citadas' : ''}${u.clips.length ? ` · clip ${u.clips.map((c) => c.dur).join(' + ')}` : ''})`;
  // v6.09b · lote 1-ter: en F1 la lectura es de 16′ con las MISMAS secciones (a 150 palabras/min suman m150′ con el recuadro)
  const m150 = Math.round(min150(sel) * 10) / 10; const lecMin = L1 ? LECTURA_MIN + (8 - preMin) : LECTURA_MIN;
  pasos.push({ min: lecMin, hora: `${hPre}–15:53`, que: `LECTURA DIRIGIDA ${lecMin}′${L1 ? ` (${dec1(m150)}′ medidos a ${PPM_REGLA} palabras/min; ${dec1(minUsados)}′ a ${RITMO.prosaPpm})` : ''} · Orientación MIR (1′) + ${sel.map(linea).join(' · ')}`, como: `Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (${reserva.map((u) => `${u.titulo} ${u.min}′`).join(' · ') || '—'}). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. ${L1 ? `Minutos de cada sección a ${RITMO.prosaPpm} palabras/min (ritmo de referencia del método); a ${PPM_REGLA} —la regla de lectura en español— la lista suma ${dec1(m150)}′ con el recuadro: por eso el paso es de ${lecMin}′` : `Ritmo de referencia ${RITMO.prosaPpm} palabras/min`}. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.`, enlace: { t: `ProMIR · ${x.tema}`, url: capUrl(x.capId) } });
  // quiz
  preguntas.quiz = quiz;
  const nRepaso = quiz.filter((q) => q.deDia).length; // v6.03: complemento con capítulos ya leídos
  // v6.09b · lote 1-quater: si la eval de mañana (F1, < 4Q ancladas) toma la cola de este quiz, el paso lo dice al principio del «cómo» (con su fecha)
  const colaMan = colaEvalDe(d + 1); const aMan = L1 && colaMan && colaMan.dC === d // el D1 (17-nov, en curso) no se toca
    ? `${colaMan.n === 1 ? 'La primera que no entre abre' : `Las ${colaMan.n} primeras que no entren abren`} la eval de mañana (${fmtF(colaMan.fecha)} 15:15) · ` : '';
  pasos.push({ min: 12, hora: '15:53–16:05', que: `${QUIZ_HACER}Q comentadas (máx. ${QUIZ_HACER_MAX}) de la lista de ${quiz.length} · ${pool.length > 5 ? `${Math.min(pool.length - 5, QUIZ_MAX)} del pool oficial que no entraron en el pre-test + ` : ''}preguntas MIR citadas en las secciones que acabas de leer${nRepaso ? ` + ${nRepaso} de repaso de capítulos ya leídos (${[...new Set(quiz.filter((q) => q.deDia).map((q) => 'D' + q.deDia))].join(' · ')})` : ''}`, como: `${aMan}Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · ${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s de comentario (≈${SEG_POR_Q + SEG_COMENTARIO} s/Q: ${QUIZ_HACER}Q ≈ ${String(Math.round((QUIZ_HACER * (SEG_POR_Q + SEG_COMENTARIO)) / 6) / 10).replace(".", ",")}′; la ${QUIZ_HACER + 1}.ª y la ${QUIZ_HACER_MAX}.ª solo si vas rápido) · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés: las de la lista que no entren no se pierden, siguen en la cola del capítulo (esta lista, en este orden) para la 2.ª vuelta y como reserva de su EVAL anclada D-3/D-7. ${pool.length > 5 ? `Pool oficial de la app para este capítulo: ${pool.length}Q → 5 en el pre-test y ${Math.min(pool.length - 5, QUIZ_MAX)} abren el quiz (en la app)${quiz.length > pool.length - 5 ? `; el resto, preguntas MIR citadas en el capítulo (${med.totCitas})` : ''}.` : `Pool oficial de la app para este capítulo: ${pool.length}Q (todas en el pre-test) → el quiz sale de las ${med.totCitas} preguntas MIR citadas en el capítulo.`}` });
  pasos.push({ min: 10, hora: '16:05–16:15', que: `≤4 APEX en ${deck}`, como: 'Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki.' });
  const totalMin = pasos.reduce((s, p) => s + p.min, 0);
  const vidLargos = us.flatMap((u) => u.largos.map((v) => `${v.leyenda ? v.leyenda.replace(/^(Vídeo [\d-]+)/, '$1 · ') : 'vídeo'} (${v.dur})`));
  const recursos = [
    { t: `ProMIR · ${x.tema} (capítulo completo)`, url: capUrl(x.capId), min: minCompleta, cantidad: `${med.totPalabras.toLocaleString('es-ES')} palabras de texto + ${med.totPalabrasTabla} en tablas · ${us.filter((u) => u.nivel !== 'H2').length} secciones · ${med.totFigs} figuras · ${med.totTablas} tablas · audio «escuchar todo el tema» (duración no medida)` },
    { t: 'Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)', url: capUrl(x.capId), cantidad: `${med.totCitas} (≥2015: ${us.reduce((s, u) => s + u.citasDesde2015, 0)} · ≥2020: ${us.reduce((s, u) => s + u.citasDesde2020, 0)})` },
    { t: 'Pool oficial de la app (MIR 2022-2026) de este capítulo', url: capUrl(x.capId), cantidad: `${pool.length}Q (${pool.join(' · ')})` },
  ];
  // v6.02c F2 (E6): las 5Q ciegas extra del D1 con su enlace directo (antes el paso decía «abre cada enlace» sin enlaces)
  if (preguntas.extraD1) preguntas.extraD1.forEach((c, i) => recursos.push({ t: `5Q ciegas extra ${i + 1}/5 · MIR ${c.promir}`, url: c.url }));
  if (x.resumenVid) recursos.push({ t: `Vídeo resumen de ${x.asignatura} (asignatura entera) — NO entra en la franja (>12 min)`, url: capUrl(x.capId), min: Math.round(x.resumenVid.split(':').reverse().reduce((s, v, i) => s + (+v) * 60 ** i, 0) / 60) });
  for (const v of vidLargos) recursos.push({ t: `Opcional fuera de la franja: ${v}`, url: capUrl(x.capId) });
  return {
    bloque: {
      franja: '15:15–16:15', plan: 'MIR', titulo: `MIR D${d}/78 · ${x.asignatura} — ${x.tema}`, totalMin, pasos, recursos,
      hecho: `${cierre ? 'Cierre 10Q registrado + ' : !anc.d1 ? 'Mazo creado + 5Q ciegas extra + ' : 'Eval registrada + Anki a cero + '}pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥${QUIZ_HACER}Q del quiz registradas + ≤4 APEX creados.`,
      planB: `Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: ${pool.length}Q del capítulo + ${POOL.preguntasDeAsignatura(x.num).length} de ${x.asignatura}) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′).`,
    },
    preguntas,
    lectura: {
      minUsados, ritmo: RITMO, ...(enLote1t(x.fecha) ? { min150: Math.round(min150(sel) * 10) / 10, minPaso: pasos.find((p) => p.que.startsWith('LECTURA DIRIGIDA')).min } : {}),
      secciones: sel.map((u) => ({ titulo: u.titulo, min: u.min, minLeer: u.minLeer, parcial: u.parcial, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips, ...(u.contexto ? { contexto: true } : {}) })),
      reserva: reserva.map((u) => ({ titulo: u.titulo, min: u.min, citasMIR: u.citasMIR })),
      paraElRepaso: { min: r05(minCompleta - sel.reduce((s, u) => s + u.minLeer, 0)), donde: '2.ª vuelta MIR (fase principal desde oct-2027) · el audio «escuchar todo el tema» de ProMIR es opcional en tiempos muertos (no está en el plan)', secciones: us.filter((u) => u.nivel !== 'H2' && !sel.some((s) => s.i === u.i && !s.parcial)).map((u) => `${u.titulo} ${u.min}′`) },
    },
  };
}

const salida = [];
for (const x of DIAS) {
  const c = CAP[x.d];
  const p = pasosDia(x.d);
  salida.push({
    d: x.d, fecha: x.fecha, dia: fmtF(x.fecha), asignatura: x.asignatura, tema: x.tema, capId: x.capId, url: capUrl(x.capId), pesoMIRcap: x.peso, delta: !!x.delta,
    cierre: MD.mirCierreDe(x.d) ? MD.mirCierreDe(x.d).asignatura : null,
    capitulo: {
      titulo: c.med.titulo, palabras: c.med.totPalabras, palabrasTabla: c.med.totPalabrasTabla, figs: c.med.totFigs, tablas: c.med.totTablas, citasMIR: c.med.totCitas,
      minLecturaCompleta: c.minCompleta, audio: c.med.audioTema, enfasis: ENFASIS[x.capId] || enfasisMedido(c.us),
      secciones: c.us.map((u) => ({ nivel: u.nivel, titulo: u.titulo, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, tablas: u.tablas, min: u.min, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips, videosLargos: u.largos })),
      resumenVidAsignatura: x.resumenVid || null,
    },
    ...p,
  });
}

// ── Derma (bloque R↔D 13:30–14:15): slot ProMIR del d3 + plan B de lectura d1-d3 desde ProMIR Derma cap 1 ──
const D1CAP = DERMA.PROMIR_DERMA_CAPS[0];
const medD = cargarMedicion(D1CAP.capId);
const usD = unidades(medD);
const secD = (pref) => usD.filter((u) => pref.some((p) => u.titulo.startsWith(p)));
const sumMin = (arr) => r05(arr.reduce((s, u) => s + u.min, 0));
const DERMA_DIAS = DERMA.DERMA_DIAS.filter((x) => x.d >= 1 && x.d <= 5); // v6.03: las 5 sesiones de las semanas 1-2 por d (v6.02c: fechas cableadas 19 → 30-oct)
const PLANB_DERMA = {
  1: { secs: ['2.1.', '2.2.'], por: 'lesiones primarias y secundarias = el tema del d1' },
  2: { secs: ['2.3.'], por: 'exploración dermatológica (descripción, color, distribución) = el tema del d2' },
  3: { secs: ['1.1.', '1.2.', '1.3.', '3.'], por: 'epidermis → dermis → hipodermis + nociones de anatomía patológica = el tema del d3' },
};
const citasD = usD.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid));
const derma = DERMA_DIAS.map((x) => {
  const cap = DERMA.promirDermaCapDe(x.d);
  const pb = PLANB_DERMA[x.d];
  const pbSecs = pb ? secD(pb.secs) : [];
  const out = {
    d: x.d, fecha: x.fecha, dia: fmtF(x.fecha), sub: x.sub, franja: '13:30–14:15',
    lectura10: {
      hora: '14:03–14:13', planA: x.extra ? { t: x.extra.t, url: x.extra.url, nota: 'AccessDermatology: «remote access expired» → 403 hasta que Joseph renueve el acceso desde la red institucional' } : null,
      // v6.09b · lote 1-quater: `min150` = los mismos apartados a la regla fija de lectura en español (prosa a 150 palabras/min; tablas a 90, 0,5′ por figura)
      planB: pbSecs.length ? { t: `ProMIR Dermatología · cap. 1 «${medD.titulo.replace(/^\d+\.-\s*/, '')}» → ${pbSecs.map((u) => u.titulo).join(' + ')}`, url: capUrl(D1CAP.capId), min: sumMin(pbSecs), min150: Math.round((min150(pbSecs.map((u) => ({ ...u, parcial: false }))) - ORIENT_MIN) * 10) / 10, palabras: pbSecs.reduce((s, u) => s + u.palabras + u.palabrasTabla, 0), figs: pbSecs.reduce((s, u) => s + u.figs, 0), por: pb.por } : null,
    },
  };
  if (cap) {
    const n = Math.floor((11 * 60) / SEG_POR_Q); // 13:52–14:03 = 11′ → 8Q a 77 s/Q
    out.testProMIR = {
      hora: '13:52–14:03', cap: cap.n, capitulo: cap.t, capId: cap.capId, url: capUrl(cap.capId), pesoMIR: cap.peso,
      poolApp: { capitulo: POOL.preguntasDeCapitulo(cap.capId).length, asignatura: POOL.preguntasDeAsignatura(5).length },
      citadasProMIR: citasD.length, nQ: n,
      preguntas: citasD.slice(0, 11).map((c) => ({ promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo })),
      como: `11′ = ${n}Q a 77 s/Q (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; ${POOL.preguntasDeAsignatura(5).length} de Dermatología en total) → se usan las ${citasD.length} preguntas MIR citadas en el capítulo (más recientes primero) · registro en la app: kind derma10Q, asignatura «Dermatología» (neto A − F/3).`,
    };
  }
  return out;
});

const json = {
  _meta: {
    version: 'v6.09', generado: '2026-11-16', generador: 'DATA/MIR/guia_lectura/gen_guia_lectura.js',
    medicion: 'DATA/MIR/guia_lectura/medicion_promir_2026-10-18/<capId>.json (analiza_cap.js con la sesión ProMIR de Joseph · solo lectura: no se inició ni creó ningún test · dom 18-oct-2026: los 10 capítulos de D1-D10 v6.02 + Dermatología cap. 1 · mar 20-oct-2026: los 66 restantes del plan; carpeta con el nombre histórico del 18-oct · el texto del recuadro «Orientación MIR» no se versiona)',
    metodo: {
      palabras: 'Texto propio de cada sección (bloques p · li · div.ul-item · figcaption), sin guiones blandos (U+00AD) y DEDUPLICADO: la maquetación en columnas de ProMIR repite el párrafo entero cuando cruza de columna (medido en el cap. 6 Epidemiología: 10.134 palabras con duplicados y texto de las figuras SVG → 7.411 reales + 343 en tablas). Por eso las cifras son menores que un conteo bruto del innerText (≈9.950).',
      ritmo: `${RITMO.prosaPpm} palabras/min el texto (lectura de estudio en español, comprensiva) · ${RITMO.tablaPpm} palabras/min las tablas · ${RITMO.figuraMin}′ por figura · clips ≤12 min por su duración. A 150 palabras/min multiplica los minutos por 1,2.`,
      pesoSeccion: 'Preguntas MIR que el propio capítulo cita en cada sección (chips «MIR AAAA-AAAA, Pnnn» = /pregunta/MIR/AAAA-nnn), ponderadas por recencia: ≥2020 ×3 · 2015-2019 ×2 · <2015 ×1; +5 si una pregunta del pre-test cae en esa sección.',
      lectura15: `Franja 15:38–15:53: ${ORIENT_MIN}′ de recuadro «Orientación MIR» + secciones por peso hasta llenar ${LECTURA_MIN - ORIENT_MIN}′ (enteras; si la de más peso no cabe, se lee PARCIAL: solo los párrafos con chip MIR ≥2015). Las secciones de las preguntas FALLADAS en el pre-test van primero; las de las acertadas se saltan y entra la reserva. Lo que no entra queda para la 2.ª vuelta (fase principal, oct-2027).`,
      preguntas: 'Pre-test = pool oficial de la app (mirPreguntasOficiales, MIR 2022-2026, ids = año del EXAMEN); si hay menos de 5, se completa con citadas ProMIR ≥2015. Quiz = lista de 8-10Q (se hacen 6, máx. 8, a 77 s + 30 s de comentario; v6.09 lote 1), evals ancladas de los días siguientes = preguntas citadas en las secciones LEÍDAS (más recientes primero), sin repetir ninguna. Equivalencia de ids: pool 2024-050 = ProMIR /pregunta/MIR/2023-050 («MIR 2023-2024, P050»), verificada el 18-oct en 3 preguntas. Cierres de asignatura = pool de la app sin usar.',
      videos: 'Los vídeos de cada capítulo se midieron (duración real del <video>). Regla MIR_FRANJAS: solo entran en la franja los clips ≤12 min (auscultación, ecografía…); Masterclass/Videoclase/Imperdible y el vídeo resumen de la asignatura (resumenVid de mirDailyPlan) quedan como opcionales fuera de la franja.',
      anclas: 'mirDailyPlan.mirAnclas(d) (sin log): D-1 2Q + D-3 1Q + D-7 1Q; D2 solo tiene D-1 (2Q), D3 tiene D-1 + D-3=—; los días de cierre (D4 Epidemiología, D5 Bioética) no hay eval. La app puede cambiar un slot por un tema 🔥 caliente (mirAnclasDinamicas): manda la app.',
      capitulosPequenos: 'v6.03 (76 capítulos): (1) pool de la app de los 76 capítulos reservado antes de repartir; (2) cierre = pool sin usar + citadas no usadas del bloque cerrado si no llega a 10 (≥2015 primero); (3) pre-test: si faltan citadas ≥2015 libres, las anteriores del mismo capítulo; (4) el quiz cede hasta 4 citadas a las anclas sin bajar de 8 y, si aun así no llega a 8, se completa con citadas de capítulos ya leídos (misma asignatura primero, «repaso»); (5) lectura con ≥3′ libres → secciones sin citas del capítulo que caben enteras («contexto»); (6) ancla sin pregunta libre → el paso dice «repite la que FALLASTE ese día».',
      noVerificado: ['Duración del audio «escuchar todo el tema» (no se reprodujo).', 'Nº de preguntas de los tests de «Entrenar» por capítulo: ver ese recuento exige abrir el creador de tests; no se tocó. La guía usa el pool de la app + las citadas en el capítulo, que sí están contadas.', 'Comentario de cada pregunta: la página /pregunta/MIR/… muestra enunciado y opciones; el comentario aparece al responder (no se respondió ninguna).'],
    },
    franjasApp: MD.MIR_FRANJAS.map((f) => f.hora + ' ' + f.tipo),
  },
  mir: salida,
  derma,
};

// ── comprobaciones ──
const errs = [];
for (const x of salida) {
  if (x.bloque.totalMin !== 60) errs.push(`D${x.d}: los pasos suman ${x.bloque.totalMin}′ ≠ 60′`);
  if (x.preguntas.pretest.length !== 5) errs.push(`D${x.d}: pre-test con ${x.preguntas.pretest.length}Q`);
  if (x.preguntas.quiz.length < QUIZ_N) errs.push(`D${x.d}: quiz con ${x.preguntas.quiz.length}Q < ${QUIZ_N}`);
  if (x.lectura.minUsados > LECTURA_MIN) errs.push(`D${x.d}: lectura ${x.lectura.minUsados}′ > ${LECTURA_MIN}′`);
  // v6.09b · lote 1-ter: en F1 (D2-D32) cada paso medible cuadra a la regla fija (razón necesario/asignado 0,85-1,15): eval 4Q × 77 s · pre-test 5Q × 77 s ·
  //   lectura a 150 palabras/min; fuera de F1, los pasos siguen como estaban (2027 idéntico)
  if (enLote1t(x.fecha)) {
    const P = (re) => x.bloque.pasos.find((p) => re.test(p.que));
    const ok = (n, m) => m > 0 && n / m >= 0.85 && n / m <= 1.15;
    const ev = P(/^EVAL ANCLADA (\d+)Q/); const pr = P(/^PRE-TEST 5Q/); const le = P(/^LECTURA DIRIGIDA/);
    if (ev) {
      const n = +/^EVAL ANCLADA (\d+)Q/.exec(ev.que)[1];
      // v6.09b · lote 1-quater: eval de 2-3Q ancladas + la cola del quiz del D-1 = 4Q comentadas (107 s/Q) en sus 7′; nada de «adelanta el Anki»
      const c = /^EVAL ANCLADA \d+Q \+ (\d+)Q de la cola del quiz del D(\d+) · (\d+)Q comentadas/.exec(ev.que);
      if (c) {
        const tot = n + +c[1]; const slot = (x.preguntas.eval || []).find((s) => s.slot === 'cola D-1'); const qD = salida.find((y) => y.d === +c[2]);
        if (tot !== +c[3] || tot !== EVAL_Q_F1 || !ok((tot * SEG_EVAL_COMENTADA) / 60, ev.min)) errs.push(`D${x.d}: eval ${n}Q + ${c[1]}Q de cola = ${c[3]}Q comentadas en ${ev.min}′ (fuera de 0,85-1,15 o ≠ ${EVAL_Q_F1}Q)`);
        if (!slot || slot.dia !== +c[2] || slot.preguntas.length - (QUIZ_HACER_MAX - QUIZ_HACER) < +c[1]) errs.push(`D${x.d}: la cola del quiz del D${c[2]} no está en preguntas.eval o no llega a ${c[1]}Q aunque ayer pararas en la ${QUIZ_HACER_MAX}.ª`);
        else if (!qD || JSON.stringify(qD.preguntas.quiz.slice(QUIZ_HACER).map((q) => q.promir)) !== JSON.stringify(slot.preguntas.map((q) => q.promir))) errs.push(`D${x.d}: la cola no es la ${QUIZ_HACER + 1}.ª-10.ª del quiz del D${c[2]}`);
        if (qD && enLote1t(qD.fecha)) { const qz = qD.bloque.pasos.find((p) => /Q comentadas \(máx\./.test(p.que)); const i = qz ? qz.como.indexOf(`la eval de mañana (${x.dia} 15:15)`) : -1; if (i < 0 || i > 100) errs.push(`D${c[2]}: su quiz no anuncia en los primeros 100 caracteres que la cola abre la eval del ${x.dia}`); }
      } else if (n === 4) { if (!ok((n * SEG_POR_Q) / 60, ev.min)) errs.push(`D${x.d}: eval ${n}Q en ${ev.min}′`); }
      else errs.push(`D${x.d}: eval de ${n}Q en F1 sin la cola del quiz del D-1 (los minutos que sobran quedarían sin material)`);
    }
    if (x.bloque.pasos.some((p) => /adelanta el Anki|que sobran/.test(`${p.que} ${p.como}`))) errs.push(`D${x.d}: en F1 un paso deja minutos «que sobran» sin material`);
    if (!pr || !ok((5 * SEG_POR_Q) / 60, pr.min)) errs.push(`D${x.d}: pre-test 5Q en ${pr ? pr.min : '—'}′`);
    if (!le || !ok(x.lectura.min150, le.min) || !le.que.includes(`(${dec1(x.lectura.min150)}′ medidos`)) errs.push(`D${x.d}: lectura ${x.lectura.min150}′ (a 150) en ${le ? le.min : '—'}′`);
  } else if (x.lectura.min150 != null) errs.push(`D${x.d}: fuera de F1 con la lectura del lote 1-ter`);
}
const todas = salida.flatMap((x) => [].concat(x.preguntas.pretest.map((p) => p.promir), (x.preguntas.extraD1 || []).map((p) => p.promir), x.preguntas.quiz.map((p) => p.promir), (x.preguntas.cierre || []).map((p) => p.promir)));
const rep = todas.filter((p, i) => todas.indexOf(p) !== i);
if (rep.length) errs.push('preguntas repetidas entre pasos: ' + [...new Set(rep)].join(', '));
if (errs.length) { console.error('ERRORES:', errs); process.exit(1); }
const txt = JSON.stringify(json, null, 1) + '\n';
if (CHECK) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (cur !== txt) { console.error('✗ ' + path.relative(ROOT, OUT) + ' desactualizado: node DATA/MIR/guia_lectura/gen_guia_lectura.js'); process.exit(1); }
  console.log('✓ guía al día · ' + salida.length + ' días MIR · ' + derma.length + ' sesiones Derma');
} else {
  fs.writeFileSync(OUT, txt, 'utf8');
  console.log('Wrote ' + path.relative(ROOT, OUT));
  for (const x of salida) console.log(`  D${x.d} ${x.dia} ${x.tema.slice(0, 38).padEnd(38)} cap ${String(x.capitulo.palabras).padStart(5)} pal ≈${String(x.capitulo.minLecturaCompleta).padStart(5)}′ · lectura15 ${x.lectura.minUsados}′: ${x.lectura.secciones.map((s) => s.titulo.split(' ')[0] + (s.parcial ? '(p)' : '')).join(' ')} · pre ${x.preguntas.pretest.length} · quiz ${x.preguntas.quiz.length} · repaso ≈${x.lectura.paraElRepaso.min}′`);
  for (const x of derma) console.log(`  Derma d${x.d} ${x.dia} · planB ${x.lectura10.planB ? x.lectura10.planB.min + '′' : '—'}${x.testProMIR ? ` · test cap ${x.testProMIR.cap} ${x.testProMIR.nQ}Q de ${x.testProMIR.citadasProMIR} citadas` : ''}`);
}
