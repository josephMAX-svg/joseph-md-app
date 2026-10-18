/**
 * gen_guia_lectura.js — genera DATA/MIR/guia_lectura_semana1-2.json: QUÉ leer, CUÁNTO y CÓMO en el bloque MIR 15:15–16:15 de D1-D10
 * (lun 19-oct → vie 30-oct-2026) y en el slot ProMIR de Derma (d3, vie 23-oct) + plan B de lectura Derma d1-d3, a partir de la
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
const QUIZ_N = 8, QUIZ_MAX = 10; // 8-10Q comentadas en 12′: 8 × 77 s = 10,3′ + lectura del comentario
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
const ENFASIS = {
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
  const elegidos = new Set(sel.map((x) => x.i));
  const reserva = cand.filter((u) => !elegidos.has(u.i) && u.s > 0).slice(0, 3);
  return { sel: sel.sort((a, b) => a.i - b.i), reserva, minUsados: r05(LECTURA_MIN - resto) };
}

// ── días MIR D1-D10 ──
const DIAS = MD.MIR_DIAS.filter((x) => x.d >= 1 && x.d <= 10);
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
  const nCit = Math.max(0, QUIZ_MAX - quizPool.length);
  const quiz = quizPool.concat(dedup.slice(0, nCit).map((c) => ({ id: null, fuente: 'citada ProMIR', promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo, leida: sel.some((s) => s.i === c.u.i) })));
  quiz.forEach((q) => usadosProMIR.add(q.promir));
  const sigue = dedup.slice(nCit);
  ANCLAS[x.d] = { d1: sigue.slice(0, 2), d3: sigue.slice(2, 3), d7: sigue.slice(3, 4) };
  for (const a of [].concat(ANCLAS[x.d].d1, ANCLAS[x.d].d3, ANCLAS[x.d].d7)) usadosProMIR.add(a.pid);
  const minCompleta = r05(us.reduce((s, u) => s + u.min, 0));
  CAP[x.d] = { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta, extra };
}

function pasosDia(d) {
  const { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta } = CAP[d];
  const deck = ANKI.mirAnkiDeck(x.asignatura);
  const cierre = MD.mirCierreDe(d);
  const anc = MD.mirAnclas(d);
  const pasos = []; const preguntas = {};
  if (cierre) {
    const num = cierre.num;
    const sinUsar = POOL.preguntasDeAsignatura(num).map((q) => q.id).filter((id) => !usadosPool.has(id) && !usadosProMIR.has(poolAProMIR(id))).sort().reverse();
    const ids = sinUsar.slice(0, 10); ids.forEach((id) => usadosPool.add(id));
    preguntas.cierre = ids.map((id) => ({ id, fuente: 'pool app', promir: poolAProMIR(id), url: preguntaUrl(poolAProMIR(id)) }));
    pasos.push({ min: 15, hora: '15:15–15:30', que: `TEST DE CIERRE · 10Q reales MIR de ${cierre.asignatura} (bloque D${cierre.dIni}-D${cierre.dFin} cerrado)`, como: `Cronómetro 13 min (77 s/Q), en blanco si no descartas 2 · fuente: pool oficial de la app sin usar (${sinUsar.length} de ${cierre.asignatura} tras los pre-tests) · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % la asignatura entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre).` });
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
    preguntas.eval = slots.map((y) => ({ slot: y.k, dia: y.d, tema: CAP[y.d].x.tema, preguntas: y.ids.map((c) => ({ promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo })) }));
    const minQ = Math.ceil((nQ * SEG_POR_Q) / 60);
    pasos.push({ min: 7, hora: '15:15–15:22', que: `EVAL ANCLADA ${nQ}Q · ${slots.map((y) => `${y.n}Q ${y.k} (D${y.d} ${CAP[y.d].x.tema.split(' (')[0]})`).join(' + ')}`, como: `Cronómetro ${minQ}′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas)${nQ < 4 ? ` · hoy solo hay ${nQ}Q (no existen D-3/D-7 todavía): los ${7 - minQ}′ que sobran, adelanta el Anki` : ''} · si la app te propone un tema 🔥 caliente (gate), manda la app.` });
    pasos.push({ min: 5, hora: '15:22–15:27', que: `Anki ${deck}`, como: 'FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer.' });
    pasos.push({ min: 3, hora: '15:27–15:30', que: 'Log de la eval en la app', como: 'aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana.' });
  }
  // pre-test
  pasos.push({ min: 8, hora: '15:30–15:38', que: `PRE-TEST 5Q ciegas del capítulo nuevo (${pre.filter((p) => p.fuente === 'pool app').length} del pool oficial de la app${pre.some((p) => p.fuente !== 'pool app') ? ` + ${pre.filter((p) => p.fuente !== 'pool app').length} citadas en ProMIR` : ''})`, como: 'Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta).' });
  preguntas.pretest = pre;
  // lectura
  const linea = (u) => `${u.titulo} (${u.parcial ? `PARCIAL ${u.minLeer}′ de ${u.min}′: solo los párrafos con chip MIR ≥2015` : `${u.min}′`}${u.citasMIR ? ` · ${u.citasMIR} preguntas MIR citadas` : ''}${u.clips.length ? ` · clip ${u.clips.map((c) => c.dur).join(' + ')}` : ''})`;
  pasos.push({ min: 15, hora: '15:38–15:53', que: `LECTURA DIRIGIDA ${LECTURA_MIN}′ · Orientación MIR (1′) + ${sel.map(linea).join(' · ')}`, como: `Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (${reserva.map((u) => `${u.titulo} ${u.min}′`).join(' · ') || '—'}). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia ${RITMO.prosaPpm} palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.`, enlace: { t: `ProMIR · ${x.tema}`, url: capUrl(x.capId) } });
  // quiz
  preguntas.quiz = quiz;
  pasos.push({ min: 12, hora: '15:53–16:05', que: `${QUIZ_N}Q comentadas (máx. ${QUIZ_MAX}) · ${pool.length > 5 ? `${Math.min(pool.length - 5, QUIZ_MAX)} del pool oficial que no entraron en el pre-test + ` : ''}preguntas MIR citadas en las secciones que acabas de leer`, como: `Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. ${pool.length > 5 ? `Pool oficial de la app para este capítulo: ${pool.length}Q → 5 en el pre-test y ${Math.min(pool.length - 5, QUIZ_MAX)} abren el quiz (en la app)${quiz.length > pool.length - 5 ? `; el resto, preguntas MIR citadas en el capítulo (${med.totCitas})` : ''}.` : `Pool oficial de la app para este capítulo: ${pool.length}Q (todas en el pre-test) → el quiz sale de las ${med.totCitas} preguntas MIR citadas en el capítulo.`}` });
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
      hecho: `${cierre ? 'Cierre 10Q registrado + ' : !anc.d1 ? 'Mazo creado + 5Q ciegas extra + ' : 'Eval registrada + Anki a cero + '}pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥${QUIZ_N}Q del quiz registradas + ≤4 APEX creados.`,
      planB: `Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: ${pool.length}Q del capítulo + ${POOL.preguntasDeAsignatura(x.num).length} de ${x.asignatura}) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′).`,
    },
    preguntas,
    lectura: {
      minUsados, ritmo: RITMO,
      secciones: sel.map((u) => ({ titulo: u.titulo, min: u.min, minLeer: u.minLeer, parcial: u.parcial, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips })),
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
      minLecturaCompleta: c.minCompleta, audio: c.med.audioTema, enfasis: ENFASIS[x.capId] || null,
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
const DERMA_DIAS = DERMA.DERMA_DIAS.filter((x) => x.fecha >= '2026-10-19' && x.fecha <= '2026-10-30');
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
      planB: pbSecs.length ? { t: `ProMIR Dermatología · cap. 1 «${medD.titulo.replace(/^\d+\.-\s*/, '')}» → ${pbSecs.map((u) => u.titulo).join(' + ')}`, url: capUrl(D1CAP.capId), min: sumMin(pbSecs), palabras: pbSecs.reduce((s, u) => s + u.palabras + u.palabrasTabla, 0), figs: pbSecs.reduce((s, u) => s + u.figs, 0), por: pb.por } : null,
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
    version: 'v6.02c', generado: '2026-10-18', generador: 'DATA/MIR/guia_lectura/gen_guia_lectura.js',
    medicion: 'DATA/MIR/guia_lectura/medicion_promir_2026-10-18/<capId>.json (analiza_cap.js · chrome-devtools en el Chrome de Joseph con su sesión ProMIR · dom 18-oct-2026 · solo lectura: no se inició ni creó ningún test)',
    metodo: {
      palabras: 'Texto propio de cada sección (bloques p · li · div.ul-item · figcaption), sin guiones blandos (U+00AD) y DEDUPLICADO: la maquetación en columnas de ProMIR repite el párrafo entero cuando cruza de columna (medido en el cap. 6 Epidemiología: 10.134 palabras con duplicados y texto de las figuras SVG → 7.411 reales + 343 en tablas). Por eso las cifras son menores que un conteo bruto del innerText (≈9.950).',
      ritmo: `${RITMO.prosaPpm} palabras/min el texto (lectura de estudio en español, comprensiva) · ${RITMO.tablaPpm} palabras/min las tablas · ${RITMO.figuraMin}′ por figura · clips ≤12 min por su duración. A 150 palabras/min multiplica los minutos por 1,2.`,
      pesoSeccion: 'Preguntas MIR que el propio capítulo cita en cada sección (chips «MIR AAAA-AAAA, Pnnn» = /pregunta/MIR/AAAA-nnn), ponderadas por recencia: ≥2020 ×3 · 2015-2019 ×2 · <2015 ×1; +5 si una pregunta del pre-test cae en esa sección.',
      lectura15: `Franja 15:38–15:53: ${ORIENT_MIN}′ de recuadro «Orientación MIR» + secciones por peso hasta llenar ${LECTURA_MIN - ORIENT_MIN}′ (enteras; si la de más peso no cabe, se lee PARCIAL: solo los párrafos con chip MIR ≥2015). Las secciones de las preguntas FALLADAS en el pre-test van primero; las de las acertadas se saltan y entra la reserva. Lo que no entra queda para la 2.ª vuelta (fase principal, oct-2027).`,
      preguntas: 'Pre-test = pool oficial de la app (mirPreguntasOficiales, MIR 2022-2026, ids = año del EXAMEN); si hay menos de 5, se completa con citadas ProMIR ≥2015. Quiz 8-10Q, evals ancladas de los días siguientes = preguntas citadas en las secciones LEÍDAS (más recientes primero), sin repetir ninguna. Equivalencia de ids: pool 2024-050 = ProMIR /pregunta/MIR/2023-050 («MIR 2023-2024, P050»), verificada el 18-oct en 3 preguntas. Cierres de asignatura = pool de la app sin usar.',
      videos: 'Los vídeos de cada capítulo se midieron (duración real del <video>). Regla MIR_FRANJAS: solo entran en la franja los clips ≤12 min (auscultación, ecografía…); Masterclass/Videoclase/Imperdible y el vídeo resumen de la asignatura (resumenVid de mirDailyPlan) quedan como opcionales fuera de la franja.',
      anclas: 'mirDailyPlan.mirAnclas(d) (sin log): D-1 2Q + D-3 1Q + D-7 1Q; D2 solo tiene D-1 (2Q), D3 tiene D-1 + D-3=—; los días de cierre (D4 Epidemiología, D5 Bioética) no hay eval. La app puede cambiar un slot por un tema 🔥 caliente (mirAnclasDinamicas): manda la app.',
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
