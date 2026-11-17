// synapse_f1_tramos.js — v6.09b · S1 (mar 17-nov-2026, auditoría tiempo ↔ material, hallazgos a2-4 / a2-5 / a2-6).
// Lo usa gen_synapse_plan.js: trocea por FECHA el SYNAPSE de F1 (mié 18-nov-2026 → dom 3-ene-2027; el mar 17 está en curso y no se toca) con el
// material MEDIDO de DATA/SYNAPSE/medidas_f1.json (medir_synapse_f1.js). Para cada bloque A/B/C de F1 escribe `leccion` (rótulo que dice la verdad) y
// `guia` {que, como, url, t} (el paso de la guía, que rutinaGuia.pasoSyn usa antes que la curaduría) + `med` (minutos que pide el material).
// REGLAS (las de la auditoría): lectura en inglés 100 palabras/min · audio/vídeo = duración ÷ velocidad (×1,2 si el paso pide pausas) · paso OK si
// necesario/asignado ∈ [0,85; 1,15].
//  · A (pantalla 15′): el vídeo medido (Karpathy, 3Blue1Brown) se ve ENTERO a la velocidad que lo deja en 15′ ± 15 % (1,0× · 1,25× · 1,5×; uno corto, con
//    pausas para anotar). Las lecciones de la Academy no publican duración: siguen como caja de 15′ (la plataforma guarda el progreso).
//  · B (audio 10′): Dwarkesh y canal Anthropic a 1,5× (10′ = 15 min de audio); el deep dive del canal a 1,0× (curaduría del lote 1: tramos de 10′).
//    Rótulo = «tramo k/N del plan · min a-b de <duración>». Lex #452 = su capítulo exacto; si dura < 8,5′, el resto de los 10′ sigue la COLA de audio.
//    No Priors (sin episodio fijo) y The Batch: se ACOTAN a los 10′.
//  · C (lectura 5′): ventanas de ≈500 palabras (425-575) cortadas en el final de una sección o de un párrafo (localizador = sección + n.º de párrafo).
//  · Lo que no cabe en su sesión NO se quita: entra en la COLA (audio · artículos · capítulos) y la consumen, por este orden, los comodines del sábado de
//    F1, el hueco de Lex, las sesiones de 2027 que ya lo prevén (lun 4-ene Pro Git «sigue donde quedaste», mar 5-ene Sholto tramo 4/4, vie 8-ene «termina
//    los tramos pendientes») y, el resto, la COLA POST-STEP 1: 30′/día L-V desde el lun 13-dic-2027 (tras el examen del lun 6-dic). Cada sesión dice adónde
//    va su resto, con fecha.
// v6.09b · lote 1-ter S3 (mar 17-nov-2026 · revisión R del lote 1-bis, hallazgos 1, 5 y 9):
//  · (1) la COLA POST-STEP 1 ya tiene FRANJA REAL: un bloque SYNAPSE 04:15-04:45 L-V (COLA_INI; en F5 el bloque A 04:05 del Step 1 ya no existe y a esa hora
//    no hay turno del SERUMS: M 07:00-13:00 · T 13:00-19:00) en cada fecha de la cola (plantillasV6 › bloqueSynCola, rutinaGuia › guiaSynapseColaDe). Cada
//    día lleva sus PASOS con minutos enteros que suman la franja (30′; el último día, lo que haya) y cada paso con necesario/asignado ∈ [0,85; 1,15]:
//    las piezas < 3,5′ van en el mismo paso que su vecina y el generador ABORTA si algo queda fuera. Feriados (FERIADOS_V6) también fuera de la cola.
//  · (1, mínimo) el final del deep dive (min 50:00-1:16:42 a 1,0×, 26:42 = 26,7′) ya no va a 2027-2028: F1_EXTRA = sáb 26-dic 07:15-07:42 (ventana de
//    estudio del sábado 04:15-08:25, entre la rutina de la mañana y el gimnasio; hueco real: ese sábado no hay nada entre 05:45 y 14:00). El vie 8-ene
//    «termina los tramos pendientes» sigue con lo siguiente del canal, a la velocidad de su serie.
//  · (9) SÁBADO: el A medido lleva sus minutos reales (redondeados) y el C del comodín baja/sube lo mismo (A + B + C = 30′): el bloque termina a las 21:30,
//    antes del Anki (sáb 12, 19 y 26-dic: A 17′ · C 3′; lo que el C no lee sigue en la cola de lectura, con fecha).
//  · (5) toda FECHA DE DESTINO va al principio del «cómo» (≤ 100 caracteres: el volcado del Calendar corta el «cómo» en 110): «Resto → …», «Sigue → …»,
//    «Lo que queda → …». Ninguna fecha futura después del carácter 100 del «cómo» ni del 140 del «qué» (el generador ABORTA si la hay).
// v6.09b lote 1-quater QS (mar 17-nov-2026 · revisión R2 del lote 1-ter, hallazgos a / d / e):
//  · (a) el vie 8-ene-2027 (B «termina los tramos pendientes») recibe dos restos de F1 a 1,5× («Tips…» 15:00-18:19 del vie 4-dic + «Building…»
//    30:00-41:00 del vie 18-dic = 14:19 de audio ≈ 9,5′) y su texto decía «1,0× · exactamente 10′»: ahora su paso B dice esas piezas, minutos, velocidad,
//    de dónde retoma cada una y adónde va lo que queda (EXTRA_2027: la única fecha de 2027 que este módulo escribe; declarada en cambios_2027).
//  · (d) ENTRE SEMANA, el A medido que pide más que su franja (14, 17 y 31-dic: 16-16,7′ en 15′) lleva sus minutos reales y el C baja lo mismo, como el
//    sábado: A + B + C = 30′ y no retrasa el Business de las 13:00; lo que el C no lee sigue con su fecha (F1 o cola post-Step 1).
//  · (e) el C del sábado con menos minutos ya no dice «lo que no leas sigue en la cola de lectura» (sin fecha): remite a las fechas de «Lo que queda».
// v6.10 (mar 17-nov-2026 · 1.ª sesión mié 18-nov; el mar 17 tampoco se estudió): (1) HECHO_17 pasa a PRIMER_MARTES = «piezas fijas del primer martes
//  de F1» (Dwarkesh × Dario 0:00-10:00 a 1,0× + las primeras ≈500 palabras de «Prompt injection attacks…»), ahora aplicadas al MAR 24-NOV (la 1.ª
//  sesión del carril del martes; ya no se dan por hechas); (2) ctx.rec = sesiones de RECUPERACIÓN a hora fija (gen_synapse_plan.js › REC_V610: sáb 28-nov
//  07:15-07:45, A-unit del mar 17 + piezas B/C del carril del martes de la sem 2) → entran en el recorrido como un día más, ANTES de la sesión de las
//  21:00 de ese día; la serie dario / pi1 sigue en ellas desde los 600 s / 500 palabras (10:00-25:00 a 1,5× · «Leaking your prompt» p. 10 → «Detect…»
//  p. 3, lo que la v6.09 tenía el mar 24) y desde la sesión de las 21:00 todo queda igual. Su resultado va con la clave «fecha@hora|tag»; el resto de
//  «Prompt injection…» conserva en la cola el ORIGEN de la sesión que recupera (mar 17, como en la v6.09), así el comodín de las 21:00 no cambia de orden.
'use strict';
const fs = require('fs');
const path = require('path');

const DESDE = '2026-11-18', HASTA = '2027-01-03', COLA_DESDE = '2027-12-13', COLA_MIN = 30;
/** v6.09b lote 1-ter: hora del bloque de la cola post-Step 1 (F5, L-V). */
const COLA_INI = '04:15';
/** v6.09b lote 1-ter: huecos REALES de F1 (con hora) para lo que no cabe en los comodines del sábado (hallazgo 1 de R: el final del deep dive). */
const F1_EXTRA = [{ fecha: '2026-12-26', ini: '07:15', id: 'deepDivePE' }];
/** v6.09b lote 1-quater (QS · hallazgo a de R2): fechas de 2027 cuyo bloque este módulo SÍ reescribe (y solo esas): el vie 8-ene «termina los tramos
 *  pendientes» recibe dos restos de F1 y su paso B dice cuáles. gen_synapse_plan.js aborta si llega cualquier otra fecha fuera de F1. */
const EXTRA_2027 = ['2027-01-08'];
const VEL = 1.5, PPM = 100, OBJ = 500, MIN_W = 425, MAX_W = 575;
const RAT = [0.85, 1.15];
/** corte del volcado del Calendar (lib_txt.js: «qué» 150 · «cómo» 110) con margen: una fecha de destino nunca después de estos caracteres */
const CORTE_QUE = 140, CORTE_COMO = 100;
// curaduría del lote 1 que sigue mandando (rutinaGuia SYN_SERIES): el episodio de Greg Brockman (No Priors) del dom 22 al lun 30-nov
const RESERVADO_B = new Set(['2026-11-22', '2026-11-23', '2026-11-28', '2026-11-30']);
// v6.10: PIEZAS FIJAS DEL PRIMER MARTES DE F1 (antes HECHO_17, «ya hecho el mar 17-nov, en curso»): Dwarkesh × Dario 0:00-10:00 a 1,0× · «Prompt injection
//   attacks against GPT-3» las primeras ≈500 palabras → el mar 24-nov (la 1.ª sesión del carril del martes desde que el mar 17 quedó sin sesión)
const PRIMER_MARTES = { fecha: '2026-11-24', dario: 600, velDario: 1, pi1: 500 };
// v6.10 · tanda C (17-nov-2026 · CORRECCIÓN DE HECHO del chat SYNAPSE, leída en las páginas): CORTES LIMPIOS — un tramo de lectura nunca termina DENTRO
//   de una lista o de un blockquote. [sección (índice de medidas_f1.json), párrafo inicial, párrafo final] (párrafos 1-based, como loc()); `txt` = cómo
//   lo nombra el localizador cuando el corte cae al final del grupo. py1 §1: el párrafo 8 («…for several reasons:») abre la lista de 3 puntos (p. 9-11):
//   el corte va al final de la lista (≈516 palabras; antes «hasta el párrafo 9», dentro de una viñeta). pi1 «Leaking your prompt»: los p. 9-10 caen
//   dentro de blockquotes → la pieza fija del primer martes termina al final de la sección (≈516; antes en el p. 9).
const SIN_CORTE = { py1: [{ si: 1, pa: 8, pb: 11, txt: 'la lista de 3 puntos' }], pi1: [{ si: 2, pa: 9, pb: 10, txt: null }] };

const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const dowOf = (f) => new Date(f + 'T12:00:00Z').getUTCDay();
const fC = (f) => `${WD[dowOf(f)]} ${Number(f.slice(8, 10))}-${MES[Number(f.slice(5, 7)) - 1]}${f > '2027-06-30' ? '-' + f.slice(0, 4) : ''}`;
const addD = (f, n) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const ts = (s) => { s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}` : `${m}:${String(x).padStart(2, '0')}`; };
const r10 = (n) => Math.round(n / 10) * 10;
const fmt1 = (n) => (Math.round(n * 10) / 10).toFixed(1).replace('.', ',');
const velTxt = (v) => (v === 1 ? '1,0' : String(v).replace('.', ','));
const aMinH = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const aHH = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
/** fechas (con o sin día de la semana) de un texto → ISO (año: el escrito, o el de F1: jul-dic = 2026, ene-jun = 2027) */
const FECHA_RE = /(?<![\p{L}\d])(?:(?:lun|mar|mié|jue|vie|sáb|dom)\.? )?(\d{1,2})-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)(?:-(\d{4}))?(?![\p{L}\d])/gu;
function fechasEn(s) {
  const out = [];
  for (const m of String(s).matchAll(FECHA_RE)) {
    const mes = MES.indexOf(m[2]) + 1, y = m[3] ? Number(m[3]) : mes >= 7 ? 2026 : 2027;
    out.push({ iso: `${y}-${String(mes).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`, fin: m.index + m[0].length, txt: m[0] });
  }
  return out;
}

function crear(MED, ctx) {
  // ── lecturas aplanadas a párrafos ──
  const LEC = {};
  for (const [id, L] of Object.entries(MED.lectura)) {
    const flat = [];
    L.secciones.forEach((s, si) => s.p.forEach((w, pi) => flat.push({ si, pi, w })));
    // v6.10 · tanda C: finales de tramo prohibidos (dentro de una lista / blockquote) y grupo que termina en cada índice (para el localizador)
    const prohibido = new Set(), finGrupo = new Map();
    for (const g of SIN_CORTE[id] || []) {
      const ia = flat.findIndex((x) => x.si === g.si && x.pi === g.pa - 1), ib = flat.findIndex((x) => x.si === g.si && x.pi === g.pb - 1);
      if (ia < 0 || ib < ia) throw new Error(`v6.10 · SIN_CORTE: el grupo ${id} §${g.si} p. ${g.pa}-${g.pb} no existe en medidas_f1.json`);
      for (let k = ia + 1; k <= ib; k++) prohibido.add(k);
      finGrupo.set(ib + 1, g);
    }
    LEC[id] = { ...L, id, flat, prohibido, finGrupo };
  }
  const tSec = (L, si) => L.secciones[si].t;
  const urlSec = (L, si) => L.secciones[si].url || L.url;
  const sumW = (L, a, b) => { let w = 0; for (let i = a; i < b; i++) w += L.flat[i].w; return w; };
  /** ventana de lectura desde el párrafo `a` (≤ `lim`): ≈obj palabras, corte preferente al final de una sección */
  function ventana(L, a, obj = OBJ, lim = L.flat.length) {
    const lo = Math.round(obj * MIN_W / OBJ), hi = Math.round(obj * MAX_W / OBJ);
    let w = 0, best = null, bestSec = null;
    for (let i = a; i < lim; i++) {
      w += L.flat[i].w;
      const fin = i + 1, finSec = fin === L.flat.length || L.flat[fin].pi === 0;
      const d = Math.abs(w - obj);
      const limpio = !L.prohibido.has(fin); // v6.10 · tanda C: nunca dentro de una lista / blockquote
      if (w >= lo && w <= hi && limpio) { if (!best || d < best.d) best = { b: fin, w, d }; if (finSec && (!bestSec || d < bestSec.d)) bestSec = { b: fin, w, d }; }
      if (w > hi) { if (!best) { const wPrev = w - L.flat[i].w; best = i > a && Math.abs(wPrev - obj) < d ? { b: i, w: wPrev } : { b: fin, w }; } break; }
      if (fin === lim && !best) best = { b: fin, w };
    }
    const r = bestSec || best;
    return r ? { a, b: r.b, w: r.w } : { a, b: a, w: 0 };
  }
  /** localizador «desde … hasta …» de los párrafos [a, b) */
  function loc(L, a, b) {
    const ini = L.flat[a];
    const d = ini.pi === 0 ? `desde «${tSec(L, ini.si)}»` : `desde «${tSec(L, ini.si)}», párrafo ${ini.pi + 1}`;
    if (b >= L.flat.length) return `${d} hasta el final`;
    const fin = L.flat[b];
    if (fin.pi === 0) return fin.si - 1 === ini.si && ini.pi === 0 ? `«${tSec(L, ini.si)}» entera` : `${d} hasta el final de «${tSec(L, fin.si - 1)}»`;
    const g = L.finGrupo && L.finGrupo.get(b); // v6.10 · tanda C: el corte cae al final de una lista nombrada
    if (g && g.txt) return `${d} hasta el final de ${g.txt} de «${tSec(L, fin.si)}» (párrafo ${fin.pi}, incluido)`;
    return `${d} hasta el párrafo ${fin.pi} de «${tSec(L, fin.si)}» (incluido)`;
  }

  // ── colas: audio (B) y lectura (C: artículos primero, después capítulos), por fecha de origen ──
  const colaB = [], colaC = [];
  const destinos = new Map(); // clave del resto → [{fecha, hora, det}]
  const addDest = (k, fecha, det, hora) => { if (!destinos.has(k)) destinos.set(k, []); destinos.get(k).push({ fecha, hora: hora || null, det }); };
  const AUD = MED.audio;
  /** hora de la sesión de destino que conviene escribir (las de hora no habitual): comodín del sábado 21:00 · el resto, la franja de su día */
  const horaSes = (f) => (dowOf(f) === 6 ? '21:00' : null);
  /** consume `seg` segundos de audio (de reloj, a la velocidad de cada pieza) de la cola B; minutos de audio ENTEROS */
  function tomarB(segReloj, fecha, filtro = () => true) {
    const piezas = [];
    let resto = segReloj;
    while (resto > 30) {
      const it = colaB.find(filtro);
      if (!it) break;
      const cabe = Math.floor((resto * it.vel) / 60) * 60;
      if (cabe <= 0) break;
      const fin = Math.min(it.b, it.a + cabe);
      piezas.push({ it, a: it.a, b: fin });
      addDest(it.k, fecha, `${ts(it.a)}-${ts(fin)}`, horaSes(fecha));
      resto -= (fin - it.a) / it.vel;
      it.a = fin;
      if (it.a >= it.b - 1) colaB.splice(colaB.indexOf(it), 1);
    }
    return { piezas, seg: segReloj - resto };
  }
  function tomarC(obj, fecha) {
    const piezas = [];
    let falta = obj;
    while (falta > 60 && colaC.length) {
      colaC.sort((x, y) => (x.articulo === y.articulo ? (x.origen < y.origen ? -1 : x.origen > y.origen ? 1 : 0) : x.articulo ? -1 : 1));
      const it = colaC[0];
      const quedan = sumW(it.L, it.a, it.b);
      const v = quedan <= falta * 1.15 ? { a: it.a, b: it.b, w: quedan } : ventana(it.L, it.a, falta, it.b);
      if (v.b <= v.a) break;
      piezas.push({ it, a: v.a, b: v.b, w: v.w });
      addDest(it.k, fecha, `≈${r10(v.w)} palabras`, horaSes(fecha));
      falta -= v.w;
      it.a = v.b;
      if (it.a >= it.b) colaC.shift();
    }
    return { piezas, w: obj - falta };
  }

  // ── estado de las series ──
  const posA = {}, posL = {};
  const keyRes = (id) => `${id}#resto`;
  const res = { sesiones: new Map() }; // fecha|tag → {leccion, guia, med, min?}
  const extra2027 = new Map(); // v6.09b lote 1-quater: fecha|tag de EXTRA_2027 → {leccion, guia, med}
  // v6.10: sesión de recuperación en curso (ctx.rec) → su resultado va con la clave «fecha@hora|tag» (la de las 21:00 de ese día conserva «fecha|tag»)
  let curRec = null;
  const K = (f) => (curRec && f === curRec.fecha ? `${f}@${curRec.hora}` : f);
  /** v6.10: «Sigue → …» con la hora si el destino es una sesión de recuperación (sáb 28-nov 07:15) */
  const fS = (dia) => `${fC(dia.fecha)}${dia.rec ? ' ' + dia.hora : ''}`;
  /** v6.10: «la dejaste el …» — si la sesión anterior del recurso fue la de recuperación de HOY (07:15), «hoy a las 07:15» */
  const pvA = (id, origen, f) => { const x = prevSes[id] || origen; const r = (ctx.rec || []).find((y) => y.fecha === x); return x === f && r ? `hoy a las ${r.ini}` : `el ${fC(x)}`; };
  const out = (fecha, tag, o) => res.sesiones.set(`${K(fecha)}|${tag}`, o);
  const audioIdDeCanal = (lec) => /AI prompt engineering: A deep dive/.test(lec) ? 'deepDivePE' : /Tips for building AI agents/.test(lec) ? 'tips' : /Building Anthropic/.test(lec) ? 'building' : /How difficult is AI alignment/.test(lec) ? 'alignment' : /Interpretability/.test(lec) ? 'interp' : null;
  const prevSes = {}; // id → fecha de la última sesión (para «retoma donde paraste el …»)

  // pendientes que crean las sesiones de F1 y que solo se resuelven al final (texto con fechas)
  const pendTxt = []; // {fecha, tag, resto?, restoTxt?, piezas?, base}

  const enF1 = (f) => f >= DESDE && f <= HASTA;
  // v6.10: las sesiones de recuperación (ctx.rec) entran en el recorrido como un día más, antes del día real de esa fecha (07:15 < 21:00)
  const dias = [...ctx.dias];
  for (const r of ctx.rec || []) {
    const i = dias.findIndex((d) => d.fecha === r.fecha);
    if (i < 0) throw new Error(`v6.10: la sesión de recuperación ${r.fecha} ${r.ini} no está dentro del plan`);
    dias.splice(i, 0, { fecha: r.fecha, hora: r.ini, plan: r.plan, rec: true, bloques: r.bloques });
  }
  const siguienteMismo = (desdeIdx, tag, re) => { for (let i = desdeIdx + 1; i < dias.length; i++) { const b = dias[i].bloques.find((x) => x.tag === tag && re.test(x.material)); if (b) return { dia: dias[i], b }; } return null; };

  // ── A · vídeos medidos ──
  const DD = AUD.kDeep, KI = AUD.kIntro;
  const ddCortes = [0, 867, 1869, 2572, 3563, 4832, 6106, 7493, 8867, 10106, 11379, DD.seg]; // = los 11 tramos de buildAUnits (capítulos reales)
  const kiCortes = [0, 1543, 2743, KI.seg];
  function velDe(seg) {
    const d = seg / 60;
    if (d < 13.5) return { v: 1, pausa: true, min: (d * 1.2) }; // < 0,9 de la franja a 1,0× → con pausas para anotar (×1,2)
    const c = [1, 1.25, 1.5].map((v) => ({ v, r: d / v / 15 })).filter((x) => x.r <= 1.15);
    if (!c.length) return { v: 1.5, pausa: false, min: d / 1.5 };
    let pick = c[0];
    for (const x of c.slice(1)) if (Math.abs(x.r - 1) + 0.05 < Math.abs(pick.r - 1)) pick = x;
    return { v: pick.v, pausa: false, min: d / pick.v };
  }
  /** `sab` (v6.09b lote 1-ter, hallazgo 9): el sábado el A lleva sus minutos reales y el C del comodín compensa → devuelve los minutos del A */
  function bloqueA(dia, b, sab) {
    let seg = null, a = 0, rango = '';
    if (/^Karpathy — \[1hr Talk\]/.test(b.material)) { const k = Number((/Part (\d)/.exec(b.leccion) || [])[1]); a = kiCortes[k - 1]; seg = kiCortes[k] - a; rango = `${ts(a)} → ${ts(kiCortes[k])}`; }
    else if (/^Karpathy — Deep Dive/.test(b.material)) { const k = Number((/Tramo (\d+)\/11/.exec(b.leccion) || [])[1]); a = ddCortes[k - 1]; seg = ddCortes[k] - a; rango = `${ts(a)} → ${ts(ddCortes[k])}`; }
    else if (/^3Blue1Brown/.test(b.material) && b.dur && !/mitad/.test(b.leccion)) { const m = /^(\d+):(\d+)/.exec(b.dur); if (m) { seg = Number(m[1]) * 60 + Number(m[2]); rango = `0:00 → ${m[1]}:${m[2]}`; } }
    if (seg == null) return b.min;
    const v = velDe(seg);
    const minTxt = Math.round(v.min);
    // v6.09b lote 1-quater (QS · hallazgo d de R2): ENTRE SEMANA, si el A medido pide MÁS que su franja (lun 14-dic 16,0′ · jue 17-dic 16,7′ · jue 31-dic
    //   16,4′ en 15′), el A lleva sus minutos reales (16-17′) y el C baja lo mismo (4-3′), como el sábado: A + B + C = 30′ y el bloque no retrasa el de
    //   después (Business 13:00); lo que el C no lee sigue con su fecha («Sigue → …» / «Resto → …», al principio del «cómo»). Si pide menos, sin cambio.
    const comp = !sab && Math.round(v.min) > b.min;
    const asig = sab || comp ? Math.round(v.min) : b.min;
    const auditTxt = b.audit ? ' F0 = auditoría: si ya lo viste, márcalo ✓ y adelanta la siguiente pendiente.' : '';
    const compTxt = comp ? ` Hoy el A tiene ${asig}′ y el C ${b.min + 5 - asig}′: el bloque sigue sumando 30′ y no retrasa el bloque siguiente.` : '';
    const como = v.pausa
      ? `En el PC, 1,0× con subtítulos en inglés y PAUSA para anotar cada idea (×1,2): ${ts(seg)} de vídeo ≈ ${fmt1(v.min)}′, cabe entero en los ${asig}′.${compTxt}${auditTxt}`
      : comp
        ? `En el PC, ${velTxt(v.v)}× con subtítulos en inglés: el tramo entero son ${fmt1(v.min)}′ de reloj (${ts(seg)} ÷ ${velTxt(v.v)}).${compTxt} Anota 1 idea en el journal.${auditTxt}`
      : sab && asig !== b.min
        ? `En el PC, ${velTxt(v.v)}× con subtítulos en inglés: el tramo entero son ${fmt1(v.min)}′ de reloj (${ts(seg)} ÷ ${velTxt(v.v)}). Sábado: hoy el A tiene ${asig}′ y el C ${b.min + 5 - asig}′, así el bloque sigue terminando a las 21:30 (antes del Anki; nada después de las 22:00). Anota 1 idea en el journal.${auditTxt}`
        : `En el PC, ${velTxt(v.v)}× con subtítulos en inglés: el tramo entero son ${fmt1(v.min)}′ de reloj (${ts(seg)} ÷ ${velTxt(v.v)})${v.min > asig + 0.5 ? `, ${fmt1(v.min - asig)}′ más que la franja: dentro del margen del plan (±15 %), termínalo` : `, caben en los ${asig}′`}. Anota 1 idea en el journal.${auditTxt}`;
    const que = `${b.material} › ${b.leccion} → ${rango} (${ts(seg)} de vídeo) a ${velTxt(v.v)}×${v.pausa ? ' con pausas' : ''} = ${minTxt}′`;
    out(dia.fecha, 'A', { leccion: `${b.leccion} → ${ts(seg)} de vídeo a ${velTxt(v.v)}×${v.pausa ? ' con pausas' : ''} = ${minTxt}′ (medido el 17-nov)`, dur: `${ts(seg)} (a ${velTxt(v.v)}× = ${minTxt}′)`, guia: { que, como, url: b.url, t: 'A ↗' }, med: v.min, ...(asig !== b.min ? { min: asig } : {}) });
    return asig;
  }

  // ── B ──
  const audioSesion = (id, vel, segReloj) => { const A = AUD[id]; const a = posA[id] ?? 0; const fin = Math.min(A.seg, a + Math.round(segReloj * vel)); posA[id] = fin; return { a, b: fin }; };
  const capsTxt = (id, a, b) => AUD[id].caps.filter((c, i, arr) => c[0] < b && (arr[i + 1] ? arr[i + 1][0] : AUD[id].seg) > a).map((c) => c[1]).join(' · ');
  function restoAudio(id, fecha, vel, carril) {
    const A = AUD[id], a = posA[id] ?? 0;
    if (a >= A.seg - 1) return null;
    const it = { k: keyRes(id), id, titulo: A.titulo, url: A.url, a, b: A.seg, vel, origen: fecha, carril };
    colaB.push(it);
    return it;
  }
  const lexCaps = ctx.lexCaps; // [{n, titulo, ini}] (seg)
  function bloqueB(idx, dia, b) {
    const f = dia.fecha, m = b.material;
    if (RESERVADO_B.has(f) && !dia.rec) return; // v6.10: la sesión de recuperación del sáb 28 07:15 no es la curaduría del comodín de las 21:00
    if (/^No Priors/.test(m)) {
      const que = 'No Priors (Sarah Guo + Elad Gil) · el episodio más reciente → min 0:00-15:00 a 1,5× (10′)';
      out(f, 'B', { leccion: 'Episodio más reciente → min 0:00-15:00 a 1,5× (10′). Sin episodio fijo: se acota a los 10′; el resto del episodio no es tarea (cada lunes, el último que haya salido)', guia: { que, como: 'Auriculares, 1,5×. Para a los 15:00 del episodio (10′ de reloj). No Priors es actualidad y no tiene episodio fijo en el plan: lo que quede del episodio NO es tarea (el lunes que viene, el más reciente).', url: b.url, t: 'B ↗' }, med: 10 });
      return;
    }
    if (/^The Batch/.test(m)) {
      if (!prevSes.batch) { prevSes.batch = f; return; } // la 1.ª aparición conserva la curaduría (carta de Ng + 2 noticias)
      out(f, 'B', { leccion: 'El número de esta semana: la carta de Ng y, si sobra, las 2 primeras noticias — se acota a 10′', guia: { que: 'The Batch (Andrew Ng) · el número de esta semana (si aún no salió hoy, el más reciente): la carta de Ng + 2 noticias', como: 'Lectura, 10′ y fuera: la carta entera y, con lo que quede, las 2 primeras noticias; no abras enlaces internos. Lo que no leas no es tarea (sale otro número el jueves).', url: b.url, t: 'B ↗' }, med: 10 });
      return;
    }
    if (/^Lex #452/.test(m)) {
      const n = Number((/cap\. (\d+)/.exec(b.leccion) || [])[1]);
      const c = lexCaps[n - 1], sig = lexCaps[n];
      const segCap = sig.ini - c.ini, minCap = segCap / 60;
      let extra = { piezas: [], seg: 0 };
      if (minCap < 8.5) extra = tomarB((10 - minCap) * 60, f, (it) => it.vel !== 1); // el deep dive (1,0×) sigue en los comodines del sábado
      const partes = [`Lex #452 · cap. ${n} «${c.titulo}» desde ${ts(c.ini)} hasta ${ts(sig.ini)} (${ts(segCap)} a 1,0×)`];
      const comoP = [`Auriculares. Lex a 1,0×: escucha SOLO el cap. ${n} (para a las ${ts(sig.ini)}: el cap. ${n + 1} es la sesión del ${n + 1 <= 7 ? 'miércoles que viene' : 'próximo miércoles'}).`];
      for (const p of extra.piezas) {
        partes.push(`${p.it.id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(p.a)}-${ts(p.b)} de ${p.it.titulo.replace(/^.*· /, '')} (cola de audio, ${velTxt(p.it.vel)}×)`);
        comoP.push(`Con los ${fmt1((10 - minCap))}′ que deja el capítulo, sigue la cola de audio: ${p.it.titulo} a ${velTxt(p.it.vel)}× (${ts(p.b - p.a)} de audio = ${fmt1((p.b - p.a) / p.it.vel / 60)}′); la dejaste el ${fC(prevSes[p.it.id] || p.it.origen)}.`);
        prevSes[p.it.id] = f;
      }
      const med = minCap + extra.seg / 60;
      out(f, 'B', { leccion: `Cap. ${n}: "${c.titulo}" (desde ${ts(c.ini)} hasta ${ts(sig.ini)} = ${ts(segCap)})${extra.piezas.length ? ' + cola de audio' : ''}`, guia: { que: partes.join(' + '), como: comoP.join(' '), url: b.url, t: 'B ↗' }, med });
      return;
    }
    if (/^Comodín de audio/.test(m)) {
      const t = tomarB(600, f);
      if (!t.piezas.length) return;
      const que = 'Comodín de audio · ' + t.piezas.map((p) => `${p.it.titulo} → ${p.it.id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(p.a)}-${ts(p.b)}${p.b >= AUD[p.it.id].seg - 1 ? ' (final)' : ''}`).join(' + ');
      const como = t.piezas.map((p) => { const pv = pvA(p.it.id, p.it.origen, f); const r = `${t.piezas.length > 1 ? `${p.it.titulo.replace(/^.*· /, '')}: ` : 'Auriculares, '}${velTxt(p.it.vel)}×${p.it.vel === 1 ? ' con subtítulos en inglés' : ''}, ${ts(p.b - p.a)} de audio = ${fmt1((p.b - p.a) / p.it.vel / 60)}′${t.piezas.length > 1 ? ` (la dejaste ${pv}).` : `. Retoma donde paraste ${pv}.`}`; prevSes[p.it.id] = f; return r; }).join(' ') + ' Nada nuevo: la cola de audio de F1 (lo que no cupo en su día).';
      pendTxt.push({ fecha: f, key: K(f), tag: 'B', piezas: t.piezas.map((p) => ({ k: p.it.k, fin: p.b })), base: { leccion: 'Cola de audio: ' + t.piezas.map((p) => `${p.it.titulo.replace(/^.*· /, '')} min ${ts(p.a)}-${ts(p.b)}`).join(' + '), guia: { que, como, url: t.piezas[0].it.url + (/youtube/.test(t.piezas[0].it.url) ? `&t=${t.piezas[0].a}s` : ''), t: 'B ↗' }, med: t.seg / 60 } });
      return;
    }
    let id = null, vel = VEL, plan = null, carril = 'vie';
    if (/^Dwarkesh — Dario/.test(m)) { id = 'dario'; carril = 'mar'; const k = (/Tramo (\d)\/(\d)/.exec(b.leccion) || []); plan = { k: +k[1], N: +k[2] }; }
    else if (/^Dwarkesh — Demis/.test(m)) { id = 'demis'; carril = 'mar'; plan = { k: 1, N: 1 }; }
    else if (/^Dwarkesh — Sholto/.test(m)) { id = 'sholto'; carril = 'mar'; const k = (/Tramo (\d)\/(\d)/.exec(b.leccion) || []); plan = { k: +k[1], N: +k[2] }; }
    else if (/^Canal Anthropic/.test(m)) { id = audioIdDeCanal(b.leccion); if (id === 'deepDivePE') vel = 1; }
    if (!id) return;
    // v6.10: la 1.ª sesión del carril del martes (mar 24-nov) = la pieza fija: Dario 0:00-10:00 a 1,0× (antes «hecha el mar 17»); desde la siguiente, 1,5×
    if (id === 'dario' && f === PRIMER_MARTES.fecha && posA.dario == null) vel = PRIMER_MARTES.velDario;
    const A = AUD[id];
    const { a, b: fin } = audioSesion(id, vel, 600);
    if (id === 'dario' && f === PRIMER_MARTES.fecha && fin !== PRIMER_MARTES.dario) throw new Error(`v6.10: la pieza fija del ${f} debe acabar en ${PRIMER_MARTES.dario} s (acaba en ${fin})`);
    const prev = prevSes[id];
    prevSes[id] = f;
    // ¿sigue la serie en su carril? (siguiente aparición del mismo recurso en F1 o en 2027)
    const sig = siguienteMismo(idx, 'B', new RegExp('^' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const sigMismo = sig && (id !== 'deepDivePE' ? (audioIdDeCanal(sig.b.leccion) === id || /^Dwarkesh/.test(m)) : audioIdDeCanal(sig.b.leccion) === id);
    let it = null, pre2027 = '';
    const ultimaF1 = !(sigMismo && enF1(sig.dia.fecha));
    if (ultimaF1) {
      if (id === 'sholto' && sig && sig.dia.fecha <= '2027-01-31') {
        // mar 5-ene: «Tramo 4/4 (10')… Exactamente 10′ desde donde quedaste» a 1,0× → 10 min de audio
        const a5 = posA.sholto, b5 = Math.min(A.seg, a5 + 600); posA.sholto = b5; pre2027 = `Tramo 4/4 → ${fC(sig.dia.fecha)} (min ${ts(a5)}-${ts(b5)}, 1,0×). `;
        addDest(keyRes(id) + '#5ene', sig.dia.fecha, 'x');
      }
      it = restoAudio(id, f, vel, carril);
    }
    const tramoTxt = plan ? `tramo ${plan.k}/${plan.N} del plan` : null;
    const que = `${A.titulo} (${ts(A.seg)}) → ${id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(a)}-${ts(fin)}${tramoTxt ? ` (${tramoTxt})` : ''}${fin >= A.seg - 1 ? ' (final)' : ''}`;
    const comoBase = `Auriculares, ${velTxt(vel)}×${vel === 1 ? ' con subtítulos en inglés' : ''}: ${ts(fin - a)} de audio = ${fmt1((fin - a) / vel / 60)}′${capsTxt(id, a, fin) ? ` (capítulos: ${capsTxt(id, a, fin)})` : ''}. ${prev ? `Retoma donde paraste el ${fC(prev)}.` : 'Empieza en 0:00.'}`;
    const head = /^Canal Anthropic/.test(m) ? `${(/^"[^"]+"/.exec(b.leccion) || [''])[0]} — tramo ${Math.floor(a / (600 * vel)) + 1}` : tramoTxt ? `${tramoTxt[0].toUpperCase()}${tramoTxt.slice(1)}` : '';
    const base = { leccion: `${head ? `${head}: ` : ''}min ${ts(a)}-${ts(fin)} de ${ts(A.seg)} a ${velTxt(vel)}× (10′)`, guia: { que, como: comoBase, url: A.url + (/youtube/.test(A.url) && a ? `&t=${a}s` : ''), t: 'B ↗' }, med: (fin - a) / vel / 60 };
    if (it) pendTxt.push({ fecha: f, key: K(f), tag: 'B', resto: it.k, restoTxt: `min ${ts(it.a)}-${ts(it.b)} = ${fmt1((it.b - it.a) / vel / 60)}′ a ${velTxt(vel)}×`, base, pre: pre2027 });
    else if (sigMismo) { base.guia.como = `Sigue → ${fS(sig.dia)}. ${base.guia.como}`; out(f, 'B', base); }
    else { base.guia.como = pre2027 + base.guia.como; out(f, 'B', base); }
  }

  // ── C ──
  const CAP_DE = (b) => {
    if (/^Pro Git/.test(b.material)) return `progit${(/cap\. (\d+)/.exec(b.leccion) || [])[1]}`;
    if (/^The Python Tutorial/.test(b.material) && /Sección (\d+):/.test(b.leccion)) return `py${/Sección (\d+):/.exec(b.leccion)[1]}`;
    if (/^Automate the Boring Stuff/.test(b.material)) return `atbs${(/cap\. (\d+)/.exec(b.leccion) || [])[1]}`;
    if (/lethal trifecta/i.test(b.leccion)) return 'trifecta';
    if (/Many-shot jailbreaking/.test(b.leccion)) return 'manyshot';
    if (/Constitutional Classifiers/.test(b.leccion)) return 'constclass';
    if (/Responsible Scaling Policy/.test(b.leccion)) return 'rsp';
    return null;
  };
  const SERIE_W = ['pi1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'];
  let serieW = { i: 0, a: 0 }; // v6.10: la serie empieza en la palabra 0 (la pieza fija del primer martes ya no se da por hecha)
  /** v6.10: fin (párrafo, exclusivo) de la pieza fija del primer martes = el mismo corte que HECHO_17 (≥ 500 palabras), así el resto de la serie no se mueve */
  // v6.10 · tanda C (corrección de hecho): ≥ 500 palabras y nunca dentro de un blockquote → final de «Leaking your prompt» (≈516)
  let FIN_PI1_PRIMER = LEC.pi1.flat.findIndex((_, k) => sumW(LEC.pi1, 0, k + 1) >= PRIMER_MARTES.pi1) + 1;
  while (LEC.pi1.prohibido.has(FIN_PI1_PRIMER)) FIN_PI1_PRIMER++;
  /** v6.10 · tanda C: fin (exclusivo) de la 2.ª pieza de «Prompt injection…» = el de la v6.09 (párrafo 3 de «Detect the attack with more AI?») */
  const FIN_PI1_SEGUNDO = LEC.pi1.flat.findIndex((x) => LEC.pi1.secciones[x.si].t === 'Detect the attack with more AI?' && x.pi === 2) + 1;
  if (FIN_PI1_SEGUNDO <= FIN_PI1_PRIMER) throw new Error('v6.10 · tanda C: no encuentro el párrafo 3 de «Detect the attack with more AI?» en medidas_f1.json');
  const recC = (b) => (/ · recupera el .+$/.exec(b.leccion) || [''])[0];
  /** Pro Git: «Pro Git › 2.2 «Recording Changes…» (cap. 2)» — la sección numerada (página del libro) donde empieza la ventana */
  const tituloDe = (L, a) => {
    if (!/^progit/.test(L.id)) return L.titulo;
    for (let si = L.flat[a].si; si >= 0; si--) { const mm = /^(\d+\.\d+) (?:.* - )?(.*)$/.exec(L.secciones[si].t); if (mm) return `Pro Git › ${mm[1]} «${mm[2]}» (${L.titulo.replace(/^Pro Git › /, '')})`; }
    return L.titulo;
  };
  function lecturaTxt(id, v, extraComo = '', prev, minC = 5) {
    const L = LEC[id];
    return {
      que: `${tituloDe(L, v.a)} → ${loc(L, v.a, v.b)} (≈${r10(v.w)} palabras)`,
      como: `${minC}′ a 100 palabras/min (${v.w} palabras ≈ ${fmt1(v.w / PPM)}′).${prev ? ` Retoma donde quedaste el ${fC(prev)}.` : ''}${extraComo}`,
      url: urlSec(L, L.flat[v.a].si),
    };
  }
  /** `minC`: minutos del C de hoy (5; el sábado, lo que deje el A medido) */
  function bloqueC(idx, dia, b, minC = 5) {
    const f = dia.fecha, m = b.material;
    const minO = minC !== b.min ? { min: minC } : {};
    if (/^Simon Willison — serie Prompt injection/.test(m)) {
      // serie de Willison en orden (martes y el vie 18-dic): «Prompt injection attacks…» ya va por la palabra ≈500 (mar 17-nov)
      const piezas = []; let falta = minC * PPM;
      // v6.10: la 1.ª sesión de la serie (mar 24-nov) = la pieza fija: «Prompt injection attacks…» desde el principio hasta la palabra ≈500 (corte de HECHO_17)
      if (f === PRIMER_MARTES.fecha && serieW.i === 0 && serieW.a === 0) {
        const v = { a: 0, b: FIN_PI1_PRIMER, w: sumW(LEC.pi1, 0, FIN_PI1_PRIMER) };
        piezas.push({ id: 'pi1', v }); falta = 0; serieW.a = v.b;
      }
      while (falta > 60 && serieW.i < SERIE_W.length) {
        const L = LEC[SERIE_W[serieW.i]];
        const quedan = sumW(L, serieW.a, L.flat.length);
        // v6.10 · tanda C: la 2.ª pieza de «Prompt injection…» (tras la fija del primer martes, que ya termina al final de «Leaking your prompt») acaba donde
        //   acababa en la v6.09 (párrafo 3 de «Detect the attack with more AI?»): así lo que queda del artículo para el comodín (≈230 palabras) y toda la cola
        //   de lectura siguen iguales (sin esto el corte limpio desplazaba los comodines hasta el 2-ene y el del sáb 19-dic quedaba en 0,80)
        const v = L.id === 'pi1' && serieW.a === FIN_PI1_PRIMER && FIN_PI1_SEGUNDO > serieW.a ? { a: serieW.a, b: FIN_PI1_SEGUNDO, w: sumW(L, serieW.a, FIN_PI1_SEGUNDO) }
          : quedan <= falta * 1.15 ? { a: serieW.a, b: L.flat.length, w: quedan } : ventana(L, serieW.a, falta);
        piezas.push({ id: L.id, v }); falta -= v.w; serieW.a = v.b;
        if (serieW.a >= L.flat.length) { serieW.i++; serieW.a = 0; }
        else {
          // el final de un artículo (≤ 300 palabras) que no cabe hoy: al comodín del sábado (lo prometido el mar 17-nov para «Prompt injection…») y la serie sigue con el siguiente
          const rest = sumW(L, serieW.a, L.flat.length);
          if (rest <= 300 && L.id === 'pi1') { colaC.push({ k: `${L.id}#resto`, id: L.id, L, a: serieW.a, b: L.flat.length, origen: dia.plan || prevSes[L.id] || f, articulo: true, serie: true }); serieW.i++; serieW.a = 0; }
          break;
        }
      }
      const partes = piezas.map((p) => lecturaTxt(p.id, p.v, '', null));
      const w = piezas.reduce((x, p) => x + p.v.w, 0);
      const prev = prevSes[piezas[0].id];
      piezas.forEach((p) => { prevSes[p.id] = f; });
      const sigW = siguienteMismo(idx, 'C', /^Simon Willison — serie Prompt injection/);
      const enCurso = serieW.i < SERIE_W.length && serieW.a > 0 ? LEC[SERIE_W[serieW.i]] : null;
      const tail = colaC.find((x) => x.serie && x.origen && x.id === piezas[piezas.length - 1].id);
      // v6.09b lote 1-ter (hallazgo 5): el destino, al principio del «cómo»
      const sigF = sigW ? fS(sigW.dia) : 'el próximo martes';
      const sigTxt = tail ? `Siguiente artículo de la serie → ${sigF}. `
        : enCurso ? `Sigue → ${sigF}, con el resto de este artículo${sigW && !enF1(sigW.dia.fecha) ? ' (antes de «el siguiente artículo de la serie»)' : ''}. ` : sigW ? `Siguiente artículo de la serie → ${sigF}. ` : '';
      const base = { leccion: piezas.map((p) => `${LEC[p.id].titulo.replace(/^Simon Willison · /, '')} ${loc(LEC[p.id], p.v.a, p.v.b)}`).join(' + ') + ` (≈${r10(w)} palabras)${recC(b)}`,
        guia: { que: `Simon Willison · serie Prompt injection: ${partes.map((x) => x.que.replace(/^Simon Willison · /, '')).join(' + ')}`, como: `${sigTxt}${minC}′ a 100 palabras/min (${w} palabras ≈ ${fmt1(w / PPM)}′).${prev ? ` Retoma donde quedaste el ${fC(prev)}.` : ''}`, url: partes[0].url, t: 'C ↗' }, med: w / PPM, ...minO };
      if (tail) pendTxt.push({ fecha: f, key: K(f), tag: 'C', resto: tail.k, restoTxt: `≈${r10(sumW(tail.L, tail.a, tail.b))} palabras`, base, soloDest: true });
      else out(f, 'C', base);
      return;
    }
    if (/^Comodín de lectura/.test(m)) {
      const t = tomarC(minC * PPM, f);
      if (!t.piezas.length) return;
      const que = 'Comodín de lectura · ' + t.piezas.map((p) => `${tituloDe(p.it.L, p.a)} → ${loc(p.it.L, p.a, p.b)} (≈${r10(p.w)} palabras)`).join(' + ');
      // v6.09b lote 1-quater (QS · e): «lo que no leas sigue en la cola de lectura» no decía cuándo → remite a las fechas de «Lo que queda» (§QUEDA§ se
      //   resuelve al final, cuando ya se conocen los destinos; si no queda nada, la frase se va)
      const sabTxt = minC !== b.min ? ` Sábado: hoy el C tiene ${minC}′ (el A medido ocupa ${b.min + 15 - minC}′)§QUEDA§.` : '';
      const como = `${minC}′ a 100 palabras/min (${t.w} palabras ≈ ${fmt1(t.w / PPM)}′). ` + t.piezas.map((p) => { const pv = pvA(p.it.id, p.it.origen, f); const r = t.piezas.length > 1 ? `«${p.it.L.titulo.replace(/^.*«|».*$/g, '')}» (la dejaste ${pv}).` : `Retoma donde quedaste ${pv}.`; prevSes[p.it.id] = f; return r; }).join(' ') + ' Nada nuevo: la cola de lectura de F1 (lo que no cupo en su día).' + sabTxt;
      pendTxt.push({ fecha: f, key: K(f), tag: 'C', piezas: t.piezas.map((p) => ({ k: p.it.k, fin: p.b })), base: { leccion: 'Cola de lectura: ' + t.piezas.map((p) => `${p.it.L.titulo.replace(/^.*«|».*$/g, '')} (≈${r10(p.w)} palabras)`).join(' + '), guia: { que, como, url: urlSec(t.piezas[0].it.L, t.piezas[0].it.L.flat[t.piezas[0].a].si), t: 'C ↗' }, med: t.w / PPM, ...minO } });
      return;
    }
    const id = CAP_DE(b);
    if (!id || !LEC[id]) return;
    const L = LEC[id];
    const a = posL[id] ?? 0;
    const v = ventana(L, a, minC * PPM);
    posL[id] = v.b;
    const prev = prevSes[id];
    prevSes[id] = f;
    const articulo = !/^(py|atbs|progit)/.test(id);
    // ¿la siguiente sesión de su carril es el MISMO capítulo? (Pro Git: 2 lunes por capítulo; el cap. 6 sigue el lun 4-ene)
    const sig = siguienteMismo(idx, 'C', new RegExp('^' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const sigMismo = sig && CAP_DE(sig.b) === id;
    let pre2027 = '', post2027 = '';
    if (sigMismo && !enF1(sig.dia.fecha)) {
      const v2 = ventana(L, posL[id]); posL[id] = v2.b;
      pre2027 = `Sigue → ${fC(sig.dia.fecha)} (≈${r10(v2.w)} palabras). `;
      post2027 = ` Ese día: ${loc(L, v2.a, v2.b)}.`;
    }
    // v6.09b lote 1-quater (QS · hallazgo d): entre semana con el A medido de 16-17′, el C baja lo mismo (lo que no lee sigue con su fecha, arriba)
    const compC = minC !== b.min ? ` Hoy el C tiene ${minC}′ (el A medido ocupa ${b.min + 15 - minC}′): el bloque sigue sumando 30′; lo que no lees hoy va con la fecha de arriba.` : '';
    const t = lecturaTxt(id, v, compC, prev, minC);
    const head = (/^Sección \d+: "[^"]+"/.exec(b.leccion) || [])[0] || ((/cap\. \d+: "[^"]+"/.exec(b.leccion) || [])[0]) || b.leccion.split(' — ')[0];
    const base = { leccion: `${head} → ${loc(L, v.a, v.b)} (≈${r10(v.w)} palabras de ${L.total})${recC(b)}`, guia: { ...t, t: 'C ↗' }, med: v.w / PPM, ...minO };
    if (sigMismo && enF1(sig.dia.fecha)) { base.guia.como = `Sigue → ${fS(sig.dia)}. ${base.guia.como}`; out(f, 'C', base); return; }
    base.guia.como = pre2027 + base.guia.como + post2027;
    if (posL[id] < L.flat.length) {
      const it = { k: `${id}#resto`, id, L, a: posL[id], b: L.flat.length, origen: f, articulo };
      colaC.push(it);
      pendTxt.push({ fecha: f, key: K(f), tag: 'C', resto: it.k, restoTxt: `≈${r10(sumW(L, it.a, it.b))} palabras: ${loc(L, it.a, it.b)}`, base });
    } else out(f, 'C', base);
  }

  // ── recorrido de F1 ──
  dias.forEach((dia, idx) => {
    if (!enF1(dia.fecha)) return;
    curRec = dia.rec ? dia : null; // v6.10
    const sab = dowOf(dia.fecha) === 6;
    let minC = 5;
    for (const b of dia.bloques) {
      // v6.09b lote 1-quater (QS · d): el C compensa lo que el A medido se aparta de sus 15′ (sábado siempre; entre semana, solo si pide más: A 16-17′ → C 4-3′)
      if (b.tag === 'A') { const aMin = bloqueA(dia, b, sab); if (aMin !== b.min) minC = 5 - (aMin - b.min); }
      else if (b.tag === 'B') bloqueB(idx, dia, b);
      else if (b.tag === 'C') bloqueC(idx, dia, b, minC);
    }
  });

  // ── pasos con minutos ENTEROS que suman `T` y necesario/asignado ∈ [0,85; 1,15] (las piezas < 3,5′ van con su vecina) ──
  function pasosDe(piezas, T, donde) {
    const pasos = piezas.map((pz) => ({ med: pz.med, piezas: [pz] }));
    for (;;) {
      const i = pasos.findIndex((p) => p.med < 3.5);
      if (i < 0 || pasos.length === 1) break;
      const j = i + 1 < pasos.length ? i + 1 : i - 1, [x, y] = i < j ? [i, j] : [j, i];
      pasos.splice(x, 2, { med: pasos[x].med + pasos[y].med, piezas: [...pasos[x].piezas, ...pasos[y].piezas] });
    }
    const asig = pasos.map((p) => Math.max(1, Math.round(p.med)));
    let dif = T - asig.reduce((s, x) => s + x, 0);
    while (dif !== 0) {
      const sg = Math.sign(dif);
      let best = -1, bd = Infinity;
      asig.forEach((x, i) => { if (x + sg < 1) return; const d = Math.abs(pasos[i].med / (x + sg) - 1); if (d < bd) { bd = d; best = i; } });
      asig[best] += sg; dif -= sg;
    }
    pasos.forEach((p, i) => { p.min = asig[i]; p.med = Math.round(p.med * 10) / 10; const r = p.med / p.min; if (r < RAT[0] || r > RAT[1]) throw new Error(`v6.09b lote 1-ter: ${donde}: paso de ${p.min}′ con ${p.med}′ de material (ratio ${r.toFixed(2)})`); });
    return pasos;
  }
  const retomaDe = {}; // id → última fecha (F1 o cola) en que se tocó
  const piezaAudio = (it, a, b) => { const p = { tipo: 'audio', id: it.id, titulo: it.titulo, url: it.url + (/youtube/.test(it.url) && a ? `&t=${Math.round(a)}s` : ''), desde: ts(a), hasta: ts(b), vel: it.vel, med: Math.round(((b - a) / it.vel / 60) * 10) / 10, retoma: retomaDe[it.id] || prevSes[it.id] || it.origen }; return p; };
  const piezaLect = (it, a, b, w) => ({ tipo: 'lectura', id: it.id, titulo: it.L.titulo, url: urlSec(it.L, it.L.flat[a].si), desde: loc(it.L, a, b), palabras: w, med: Math.round((w / PPM) * 10) / 10, retoma: retomaDe[it.id] || prevSes[it.id] || it.origen });

  // ── v6.09b lote 1-ter (hallazgo 1, mínimo): huecos REALES de F1 con hora (F1_EXTRA) para lo que no cupo en los comodines del sábado ──
  const colaF1 = [];
  for (const x of F1_EXTRA) {
    const it = colaB.find((y) => y.id === x.id);
    if (!it) continue;
    const pz = piezaAudio(it, it.a, it.b);
    addDest(it.k, x.fecha, `${ts(it.a)}-${ts(it.b)}`, x.ini);
    retomaDe[it.id] = x.fecha;
    colaB.splice(colaB.indexOf(it), 1);
    const T = Math.round(pz.med);
    colaF1.push({ fecha: x.fecha, ini: x.ini, fin: aHH(aMinH(x.ini) + T), min: T, med: pz.med, pasos: pasosDe([pz], T, `${x.fecha} ${x.ini}`) });
  }
  // ── 2027 que ya lo prevé: vie 8-ene «termina los tramos pendientes de las semanas previas» (canal Anthropic, 10′, a la velocidad de su serie) ──
  {
    const d8 = dias.find((d) => d.fecha > HASTA && d.bloques.some((b) => b.tag === 'B' && /^Canal Anthropic/.test(b.material) && /termina los tramos pendientes/.test(b.leccion)));
    if (d8) {
      const delCanal = colaB.filter((x) => x.carril === 'vie');
      let resto = 600;
      const tomadas = []; // v6.09b lote 1-quater (QS · a): lo que recibe el vie 8-ene, para escribir su paso B con piezas, minutos y velocidad
      for (const it of delCanal) {
        if (resto <= 30) break;
        const cabe = Math.floor((resto * it.vel) / 60) * 60, fin = Math.min(it.b, it.a + cabe);
        if (fin <= it.a) break;
        tomadas.push({ it, a: it.a, b: fin, prev: retomaDe[it.id] || prevSes[it.id] || it.origen });
        addDest(it.k, d8.fecha, `${ts(it.a)}-${ts(fin)} a ${velTxt(it.vel)}×`);
        retomaDe[it.id] = d8.fecha; // la cola post-Step 1 retoma donde quedó el vie 8-ene
        resto -= (fin - it.a) / it.vel; it.a = fin;
      }
      for (let i = colaB.length - 1; i >= 0; i--) if (colaB[i].a >= colaB[i].b - 1) colaB.splice(i, 1);
      // v6.09b lote 1-quater (QS · hallazgo a de R2): el paso B del vie 8-ene decía «1,0× · exactamente 10′ desde donde quedaste» (genérico) y F1 le manda
      //   2 restos a 1,5× (vie 4-dic «Tips…» min 15:00-18:19 + vie 18-dic «Building…» min 30:00-41:00 = 14:19 de audio ≈ 9,5′): ahora dice exactamente esas
      //   piezas, minutos y velocidad, de dónde retoma cada una y adónde va lo que queda (cola post-Step 1). Es el ÚNICO bloque de 2027 que escribe este
      //   módulo (EXTRA_2027; declarado en cambios_2027: «hueco que recibe dos restos de F1»).
      if (tomadas.length) {
        const nom = (it) => `«${it.titulo.replace(/^.*· «|»$/g, '')}»`;
        const seg = tomadas.reduce((s, p) => s + (p.b - p.a), 0), reloj = tomadas.reduce((s, p) => s + (p.b - p.a) / p.it.vel, 0) / 60;
        const vels = [...new Set(tomadas.map((p) => p.it.vel))];
        const velT = vels.length === 1 ? `a ${velTxt(vels[0])}×` : '';
        const que = `Canal Anthropic · ${tomadas.map((p) => `${nom(p.it)} → min ${ts(p.a)}-${ts(p.b)}${p.b >= AUD[p.it.id].seg - 1 ? ' (final)' : ''}${vels.length > 1 ? ` a ${velTxt(p.it.vel)}×` : ''}`).join(' + ')}${velT ? `, ${velT}` : ''} (${tomadas.map((p) => ts(p.b - p.a)).join(' + ')} de audio = ${fmt1(reloj)}′)`;
        const como = `Auriculares, ${vels.map((v) => `${velTxt(v)}×`).join(' / ')}: ${ts(seg)} de audio = ${fmt1(reloj)}′ de reloj, dentro de los 10′ del B. Retoma donde paraste ${tomadas.map((p) => `el ${fC(p.prev)} (${nom(p.it)})`).join(' y ')}. Nada nuevo: son los tramos pendientes del canal que no cupieron en su día de F1.`;
        pendTxt.push({ fecha: d8.fecha, tag: 'B', extra: true, piezas: tomadas.map((p) => ({ k: p.it.k, fin: p.b })),
          base: { leccion: `termina los tramos pendientes de las semanas previas: ${tomadas.map((p) => `${nom(p.it)} min ${ts(p.a)}-${ts(p.b)}`).join(' + ')}${velT ? ` ${velT}` : ''} (${fmt1(reloj)}′)`, guia: { que, como, url: tomadas[0].it.url + (/youtube/.test(tomadas[0].it.url) && tomadas[0].a ? `&t=${tomadas[0].a}s` : ''), t: 'B ↗' }, med: reloj } });
      }
    }
  }
  // ── COLA POST-STEP 1: 30′/día L-V desde el lun 13-dic-2027, 04:15-04:45 (v6.09b lote 1-ter: con franja y pasos) ──
  const cola = [];
  const todo = [...colaB.map((x) => ({ ...x, tipo: 'audio' })), ...colaC.map((x) => ({ ...x, tipo: 'lectura' }))]
    .sort((x, y) => (x.origen < y.origen ? -1 : x.origen > y.origen ? 1 : x.tipo === y.tipo ? 0 : x.tipo === 'audio' ? -1 : 1));
  const habil = (f) => dowOf(f) >= 1 && dowOf(f) <= 5 && !ctx.skip.has(f) && !ctx.protegidos.has(f) && !(ctx.feriados && ctx.feriados.has(f));
  let dia = COLA_DESDE;
  while (!habil(dia)) dia = addD(dia, 1);
  let hoy = { fecha: dia, piezas: [], med: 0 };
  const cerrarDia = () => { if (hoy.piezas.length) cola.push(hoy); dia = addD(dia, 1); while (!habil(dia)) dia = addD(dia, 1); hoy = { fecha: dia, piezas: [], med: 0 }; };
  const MIN_TROZO = 4.5; // trozo mínimo al final de un día (minutos de reloj)
  for (const it of todo) {
    for (;;) {
      const libre = COLA_MIN - hoy.med;
      if (it.tipo === 'audio') {
        if (it.a >= it.b - 1) break;
        const rem = (it.b - it.a) / it.vel / 60;
        if (hoy.med + rem <= COLA_MIN * 1.1 || (hoy.med + rem <= COLA_MIN * RAT[1] && rem - libre < 3.5)) {
          const pz = piezaAudio(it, it.a, it.b); hoy.piezas.push(pz); hoy.med += pz.med; addDest(it.k, hoy.fecha, `${pz.desde}-${pz.hasta}`, COLA_INI); retomaDe[it.id] = hoy.fecha; it.a = it.b;
          if (COLA_MIN - hoy.med < MIN_TROZO) cerrarDia();
          break;
        }
        if (libre < MIN_TROZO) { cerrarDia(); continue; }
        const cabe = Math.floor(libre * it.vel) * 60, fin = Math.min(it.b, it.a + cabe);
        const pz = piezaAudio(it, it.a, fin); hoy.piezas.push(pz); hoy.med += pz.med; addDest(it.k, hoy.fecha, `${pz.desde}-${pz.hasta}`, COLA_INI); retomaDe[it.id] = hoy.fecha;
        it.a = fin; cerrarDia();
      } else {
        if (it.a >= it.b) break;
        const quedan = sumW(it.L, it.a, it.b), rem = quedan / PPM;
        if (hoy.med + rem <= COLA_MIN * 1.1 || (hoy.med + rem <= COLA_MIN * RAT[1] && rem - libre < 3.5)) {
          const pz = piezaLect(it, it.a, it.b, quedan); hoy.piezas.push(pz); hoy.med += pz.med; addDest(it.k, hoy.fecha, `≈${r10(quedan)} palabras`, COLA_INI); retomaDe[it.id] = hoy.fecha; it.a = it.b;
          if (COLA_MIN - hoy.med < MIN_TROZO) cerrarDia();
          break;
        }
        if (libre < MIN_TROZO) { cerrarDia(); continue; }
        const v = ventana(it.L, it.a, libre * PPM, it.b);
        if (v.b <= v.a) { cerrarDia(); continue; }
        const pz = piezaLect(it, v.a, v.b, v.w); hoy.piezas.push(pz); hoy.med += pz.med; addDest(it.k, hoy.fecha, `≈${r10(v.w)} palabras`, COLA_INI); retomaDe[it.id] = hoy.fecha;
        it.a = v.b; cerrarDia();
      }
    }
  }
  if (hoy.piezas.length) cola.push(hoy);
  // nada se quita: todo resto de F1 queda con fecha (si algo quedara sin colocar, ABORTA)
  for (const it of todo) if (it.tipo === 'audio' ? it.a < it.b - 1 : it.a < it.b) throw new Error(`v6.09b: resto sin fecha en la cola post-Step 1: ${it.k}`);
  // franja y pasos de cada día: 30′ (el último día, si tiene menos de 25,5′ de material, sus minutos redondeados)
  const colaOut = cola.map((d) => {
    const med = Math.round(d.piezas.reduce((s, p) => s + p.med, 0) * 10) / 10;
    const T = med < COLA_MIN * RAT[0] ? Math.max(5, Math.round(med)) : COLA_MIN;
    if (T !== COLA_MIN && d !== cola[cola.length - 1]) throw new Error(`v6.09b lote 1-ter: día de la cola ${d.fecha} con ${med}′ de material (solo el último puede ir corto)`);
    if (med / T > RAT[1] || med / T < RAT[0]) throw new Error(`v6.09b lote 1-ter: día de la cola ${d.fecha}: ${med}′ de material en ${T}′`);
    return { fecha: d.fecha, ini: COLA_INI, fin: aHH(aMinH(COLA_INI) + T), min: T, med, pasos: pasosDe(d.piezas, T, d.fecha) };
  });

  // ── textos con los destinos (fechas) del resto: SIEMPRE al principio del «cómo» (hallazgo 5) ──
  const NOMBRE = Object.fromEntries([...Object.entries(MED.lectura).map(([k, v]) => [k, v.titulo.replace(/^.*«|».*$/g, '')]), ...Object.entries(MED.audio).map(([k, v]) => [k, v.titulo.replace(/^.*· /, '').replace(/^«|»$/g, '')])]);
  const CORTO = { deepDivePE: 'deep dive', tips: 'Tips for building AI agents', building: 'Building Anthropic', alignment: 'AI alignment', interp: 'Interpretability', dario: 'Dario', demis: 'Demis', sholto: 'Sholto', pi1: 'Prompt injection attacks…', trifecta: 'trifecta', manyshot: 'Many-shot', constclass: 'Constitutional Classifiers', rsp: 'RSP' };
  const cortoDe = (k) => { const id = k.replace(/#.*$/, ''); return CORTO[id] || (/^py(\d+)/.test(id) ? `Python §${id.slice(2)}` : /^atbs(\d+)/.test(id) ? `ATBS cap. ${id.slice(4)}` : /^progit(\d+)/.test(id) ? `Pro Git cap. ${id.slice(6)}` : NOMBRE[id] || id); };
  const una = (x, det) => `${fC(x.fecha)}${x.hora ? ' ' + x.hora : ''}${det && x.det ? ` (${x.det})` : ''}`;
  /** destinos de la clave `k` posteriores a `desde`, en ≤ `max` caracteres (con el detalle de cada tramo si cabe) */
  function destTxt(k, desde, max, desdeHora) {
    // v6.10: desde una sesión de recuperación (sáb 28 07:15) cuentan también los destinos de ESE día a una hora posterior (el comodín de las 21:00)
    const ds = (destinos.get(k) || []).filter((x) => x.det !== 'x' && (x.fecha > desde || (!!desdeHora && x.fecha === desde && (x.hora || '') > desdeHora)));
    const f1 = ds.filter((x) => x.fecha < COLA_DESDE), post = ds.filter((x) => x.fecha >= COLA_DESDE);
    const postTxt = post.length ? `cola post-Step 1 ${COLA_INI}: ${post.length === 1 ? fC(post[0].fecha) : `${fC(post[0].fecha)} → ${fC(post[post.length - 1].fecha)}`}` : '';
    const sinWd = (f) => fC(f).replace(/^\S+ /, '');
    const postCorto = post.length ? `cola ${COLA_INI}: ${post.length === 1 ? sinWd(post[0].fecha) : `${sinWd(post[0].fecha)} → ${sinWd(post[post.length - 1].fecha)}`}` : '';
    const f1Rango = f1.length > 2 ? `${una(f1[0], false)} … ${una(f1[f1.length - 1], false)}` : f1.map((x) => una(x, false)).join(' · ');
    const intentos = [
      [f1.map((x) => una(x, true)).join(' · '), postTxt],
      [f1.map((x) => una(x, false)).join(' · '), postTxt],
      [f1Rango, postTxt],
      [f1Rango, postCorto],
      [ds.length ? `${una(ds[0], false)} y siguientes` : ''],
    ].map((p) => p.filter(Boolean).join(' · '));
    return intentos.find((s) => s.length <= max) || intentos[intentos.length - 1];
  }
  for (const p of pendTxt) {
    const o = JSON.parse(JSON.stringify(p.base));
    const pre0 = p.pre || '';
    if (p.resto) {
      const pre = `Resto → ${destTxt(p.resto, p.fecha, CORTE_COMO - pre0.length - 10, p.key && p.key.includes('@') ? p.key.split('@')[1] : null)}. `;
      if (/^Resto → \. /.test(pre)) throw new Error(`v6.10: ${p.key || p.fecha}|${p.tag}: resto sin destino`);
      o.guia.como = pre0 + pre + `${o.guia.como} Lo que queda: ${p.restoTxt}.`;
    } else if (pre0) o.guia.como = pre0 + o.guia.como;
    let fins = [];
    if (p.piezas) {
      fins = p.piezas.map((x) => { const ds = (destinos.get(x.k) || []).filter((d) => d.fecha > p.fecha && d.det !== 'x'); return ds.length ? { k: x.k } : null; }).filter(Boolean);
      if (fins.length) {
        const arma = (max) => `Lo que queda → ${fins.map((x) => `${p.piezas.length > 1 ? `${cortoDe(x.k)}: ` : ''}${destTxt(x.k, p.fecha, max)}`).join(' · ')}. `;
        let pre = arma(84); if (pre.length > CORTE_COMO) pre = arma(40); if (pre.length > CORTE_COMO) pre = arma(24);
        o.guia.como = pre + o.guia.como;
      }
    }
    // v6.09b lote 1-quater (QS · e): el C del sábado con menos minutos remite a las fechas de «Lo que queda» (antes: «sigue en la cola de lectura», sin fecha)
    o.guia.como = o.guia.como.replace('§QUEDA§', fins.length ? ': lo que no lees hoy va con las fechas de «Lo que queda»' : '');
    if (p.extra) extra2027.set(`${p.fecha}|${p.tag}`, o); // v6.09b lote 1-quater (QS · a): vie 8-ene-2027 (EXTRA_2027)
    else res.sesiones.set(`${p.key || p.fecha}|${p.tag}`, o);
  }
  // control (hallazgo 5): ninguna fecha FUTURA después del corte del Calendar en los pasos de F1 (y del vie 8-ene, EXTRA_2027)
  for (const k of extra2027.keys()) if (!EXTRA_2027.includes(k.split('|')[0])) throw new Error(`v6.09b lote 1-quater: ${k}: bloque de 2027 fuera de EXTRA_2027`);
  for (const [k, o] of [...res.sesiones, ...extra2027]) {
    if (o.guia && /§QUEDA§/.test(o.guia.como)) throw new Error(`v6.09b lote 1-quater: ${k}: §QUEDA§ sin resolver`);
    const f = k.split('|')[0].split('@')[0];
    if (!o.guia) continue;
    for (const x of fechasEn(o.guia.que)) if (x.iso > f && x.fin > CORTE_QUE) throw new Error(`v6.09b lote 1-ter: ${k}: fecha de destino «${x.txt}» en el carácter ${x.fin} del «qué» (> ${CORTE_QUE})`);
    for (const x of fechasEn(o.guia.como)) if (x.iso > f && x.fin > CORTE_COMO) throw new Error(`v6.09b lote 1-ter: ${k}: fecha de destino «${x.txt}» en el carácter ${x.fin} del «cómo» (> ${CORTE_COMO}): ${o.guia.como.slice(0, 160)}`);
  }
  return { sesiones: res.sesiones, cola: colaOut, colaF1, extra2027 };
}

module.exports = { crear, DESDE, HASTA, COLA_DESDE, COLA_MIN, COLA_INI, F1_EXTRA, EXTRA_2027, fechasEn };
