// gen_aurum_plan.js — GENERA src/lib/aurumDailyPlan.ts (motor día-a-día AURUM · v2).
//
// AURUM = programa de 6 meses para volverse un closer de ventas de élite (26 semanas,
// 130 lecciones). Fuente: DATA/AURUM/curricula/_curriculum_v2.json (roster AUDITADO +
// horario recalibrado): fases (7), libros_por_fase, los 11 libros con audiolibros,
// descubrimientos (top sellers reales), roster (KEEP/FOUNDATION/DROP) y los detalles
// día-a-día (ver + practica + lectura, suma = min_core).
//
// Reglas de calendario (idénticas en espíritu a gen_synapse_plan.js):
//  · INICIO = argv[2] (YYYY-MM-DD; v5.4 = jue 2026-09-03 · v5.17 = jue 2026-10-01 · v5.18 = lun 2026-10-05 · v5.19 = mar 2026-10-06 · v5.20 = v6.00 = mié 2026-10-07 · v6.01 = lun 2026-10-12 · v6.02 = lun 2026-10-19 · v6.03 = mié 2026-10-21 · v6.05 = lun 2026-10-26; salta además los DÍAS PROTEGIDOS 22-feb / 9-mar / 10-mar). Las 130 lecciones se asignan a días
//    HÁBILES consecutivos Lunes→Viernes (SALTA sábados y domingos; NO salta feriados).
//    El NÚCLEO L-V es la ventana 14:15-15:15.
//  · 130 hábiles ≈ 26 semanas. La fecha fin se calcula y se imprime.
//  · semana del plan = índice 1..26 (cada 5 días hábiles = 1 semana). El d=1..5 del JSON
//    es el 1º..5º hábil de su semana del plan (= Lun..Vie solo si el D1 cae en lunes; v5.20: D1 mié 7-oct →
//    d=1..5 = mié..mar hasta el mar 22-dic (D55); la semana D56-D60 va del mié 23 al mié 30-dic (vie 25 feriado), la
//    D61-D65 del lun 4 al vie 8-ene (31-dic y 1-ene fuera) y desde ahí d=1..5 = lun..vie hasta el vie 19-feb (D95 = D95 del Step 1);
//    el lun 22-feb (PROTEGIDO) se salta → D96-D105 = mar..lun (mar 23-feb → lun 8-mar); el mar 9 y el mié 10-mar (PROTEGIDOS) se
//    saltan → desde el jue 11-mar d=1..5 = jue..mié (D130 mié 14-abr).
//    v5.19: D1 mar 6-oct → d=1..5 = mar..lun hasta el lun 21-dic (D55); la semana D56-D60 va del mar 22 al mar 29-dic (vie 25 feriado), la
//    D61-D65 del mié 30-dic al jue 7-ene (31-dic y 1-ene fuera), y desde el vie 8-ene d=1..5 = vie..jue.
//    v5.18: D1 lun 5-oct → d=1..5 = lun..vie hasta el vie 18-dic (D55); la semana D56-D60 va del lun 21 al lun 28-dic (vie 25 feriado), la
//    D61-D65 del mar 29-dic al mié 6-ene (31-dic y 1-ene fuera), y desde el jue 7-ene d=1..5 = jue..mié.
//    v5.17: D1 jue 1-oct → d=1..5 = jue..mié hasta el mié 23-dic y desde el mar 5-ene mar..lun).
//
// v2 — los bloques:
//  · A    (ver)      — VÍDEO a ver        · formato 'pantalla' · slot 'core'
//  · PRAC (practica) — drill del día      · formato 'practica' · slot 'core'
//  · L    (lectura)  — libro/audiolibro   · formato 'audio' (si tipo='audiolibro') o
//                                           'lectura' (si tipo='libro') · slot 'lectura'
//    El núcleo (A + PRAC) suma min_core (30-60 min) y va en 14:15-15:15. La L (lectura)
//    NO va en esa hora: es para los HUECOS de lectura/viajes (track aparte).
//  · + link a Obsidian (vault, carpeta 07_VENTAS_AURUM).
// real:true = URL verificada/estable · real:false = URL marcada "(verificar)" en el currículo.
//
// v3 (5-sep-2026, Palmerton cero puntos ciegos):
//  · `liviano` (opcional) — variante LIVIANO del drill (1 de cada 5: el 5º día de cada semana de F3-F6 — viernes solo con D1 en lunes) y, en los
//    cierres de fase 3-6, la versión LIVIANO del PITCH. Sale de `dia.liviano` del currículo; el
//    paciente y las cifras de la oferta viven en `CUR.liviano` → AURUM_LIVIANO_CASO.
//  · `pitch` (opcional) — nº de PITCH (1..7) en el último día de cada fase (D15, D35, D55, D75, D95,
//    D115, D130): ahí se aplica AURUM_RUBRICA_PITCH (src/lib/aurumData.ts). → AURUM_PITCH_DIAS.
//  · SKIP_FIJOS (25-dic, 31-dic, 1-ene) se saltan igual que en el resto de planes v5.6.
//
// v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct, no se estudió mié 7 → vie 9-oct): 130 hábiles lun 12-oct-2026 → MAR 20-ABR-2027 (+3 hábiles,
//    mismas 130 lecciones en el mismo orden; sigue antes del SERUMS). Con D1 en lunes d=1..5 = lun..vie hasta el vie 18-dic (D50); el vie 25-dic
//    (SKIP) desplaza → D55 lun 28-dic; 31-dic/1-ene → d=5 en miércoles D60-D105; vie 12-mar y lun 15-mar (PROTEGIDOS) → D110 vie 19-mar; Semana
//    Santa → D115 mar 30-mar. PITCH v1 D15 vie 30-oct · v2 D35 vie 27-nov · v3 D55 lun 28-dic · v4 D75 mié 27-ene · v5 D95 mié 24-feb · v6 D115
//    mar 30-mar · v7 D130 mar 20-abr. min30 (30') sigue desde el lun 4-ene-2027 (encaps.intensiva_desde, sin cambio).
// v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct, no se estudió lun 12 → vie 16-oct): 130 hábiles lun 19-oct-2026 → MAR 27-ABR-2027 (+5 hábiles,
//    mismas 130 lecciones en el mismo orden; sigue antes del SERUMS, lun 3-may). Con D1 en lunes d=1..5 = lun..vie hasta el vie 18-dic (D45); el
//    vie 25-dic (SKIP) desplaza → D50 lun 28-dic; 31-dic/1-ene → d=5 en miércoles D55-D100; vie 12-mar y lun 15-mar (PROTEGIDOS) → D105 vie 19-mar;
//    Semana Santa → D110/D115 en martes. PITCH v1 D15 vie 6-nov · v2 D35 vie 4-dic · v3 D55 mié 6-ene · v4 D75 mié 3-feb · v5 D95 mié 3-mar · v6 D115
//    mar 6-abr · v7 D130 mar 27-abr. min30 (30') sigue desde el lun 4-ene-2027 (encaps.intensiva_desde, sin cambio): 78 filas (v6.01: 73).
// v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct, lun 19 y mar 20-oct sin estudio): 130 hábiles mié 21-oct-2026 → JUE 29-ABR-2027 (+2 hábiles,
//    mismas 130 lecciones en el mismo orden; sigue antes del SERUMS, lun 3-may). Con D1 en miércoles d=1..5 = mié..mar hasta el mar 22-dic (D45);
//    el vie 25-dic (SKIP) desplaza → D50 mié 30-dic; 31-dic/1-ene → d=5 en viernes D55-D95 (de nuevo alineado con el viernes); vie 12-mar y lun
//    15-mar (PROTEGIDOS) → d=5 en martes D100-D105 (mar 16 y mar 23-mar); Semana Santa (jue 25 / vie 26-mar) → jueves D110-D115. PITCH v1 D15 mar
//    10-nov · v2 D35 mar 8-dic · v3 D55 vie 8-ene · v4 D75 vie 5-feb · v5 D95 vie 5-mar · v6 D115 jue 8-abr · v7 D130 jue 29-abr. min30 (30') sigue
//    desde el lun 4-ene-2027 (encaps.intensiva_desde, sin cambio): 80 filas (v6.02: 78). Variantes LIVIANO fuera de viernes: 7 (v6.02: 13).
// v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; no se estudió del lun 19 al dom 25-oct, orden de Joseph «todo inicia el lunes 26 … no quites
//    temas, solamente corre lo que está faltando»): 130 hábiles lun 26-oct-2026 → MAR 4-MAY-2027 (+3 hábiles sobre v6.03 = +5 sobre v6.02, una
//    semana exacta; mismas 130 lecciones en el mismo orden; nada se recorta ni comprime). ⚠ El fin ya NO cae antes del SERUMS (lun 3-may,
//    supuesto): D129 lun 3-may y D130 mar 4-may (PITCH v7) son los 2 primeros días del SERUMS, a 30' (min30), igual que el mantenimiento MIR
//    de v6.02 cruzaba 2 días el inicio del SERUMS. Con D1 en lunes d=1..5 = lun..vie hasta el vie 18-dic (D40); el vie 25-dic (SKIP) desplaza →
//    D45 lun 28-dic; 31-dic/1-ene → d=5 en miércoles D50-D95 (D95 mié 10-mar, semana del ENCAPS); vie 12-mar y lun 15-mar (PROTEGIDOS) → D100
//    vie 19-mar; Semana Santa (jue 25 / vie 26-mar) → martes D105-D130. PITCH v1 D15 vie 13-nov · v2 D35 vie 11-dic · v3 D55 mié 13-ene · v4 D75
//    mié 10-feb · v5 D95 mié 10-mar · v6 D115 mar 13-abr · v7 D130 mar 4-may. min30 (30') sigue desde el lun 4-ene-2027 (encaps.intensiva_desde,
//    sin cambio): 83 filas (v6.03: 80). Variantes LIVIANO fuera de viernes: 14 (v6.03: 7).
// v6.00 (6-oct-2026 · V6_ESPEC §E): SKIP y DÍAS PROTEGIDOS desde DATA/_scripts/_fechas_v6.json (se eliminan los v5.20 22-feb / 9-mar /
//    10-mar; entran vie 12-mar, lun 15-mar y la Semana Santa jue 25 / vie 26-mar) → 130 hábiles mié 7-oct-2026 → JUE 15-ABR-2027
//    (D96 lun 22-feb · pitch v5 D95 vie 19-feb = · v6 D115 mar 23-mar · v7 D130 jue 15-abr). DJ-4: desde la F2 (encaps.intensiva_desde =
//    lun 4-ene-2027) AURUM va a 30' (14:15-14:45) = el `min` núcleo de la fila; los bloques extra quedan opcionales → campo por fila
//    `min30: fecha >= intensiva_desde` (la UI muestra 30'). Nada se recorta: mismas 130 lecciones, mismo orden.
// Determinista: sin Date.now()/Math.random aleatorio. Regenerar: node DATA/_scripts/gen_aurum_plan.js YYYY-MM-DD
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CUR = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/AURUM/curricula/_curriculum_v2.json'), 'utf8'));

// ─── Aplanar las 130 lecciones en orden (fase → semana → día 1..5) ───
const lecciones = [];
for (const det of CUR.detalles) {
  const fase = det.fase; // 1..7
  for (const sem of det.semanas) {
    for (const dia of sem.dias) {
      lecciones.push({ fase, semJson: sem.sem, dJson: dia.d, ...dia });
    }
  }
}
if (lecciones.length !== 130) throw new Error('Se esperaban 130 lecciones, hay ' + lecciones.length);

// ─── Calendario: 130 días hábiles L-V consecutivos desde START (argv[2]) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const START_ISO = process.argv[2] || '2026-10-26'; // default = D1 v6.05 (v6.03: 2026-10-21 · v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07 · v5.19: 2026-10-06 · v5.18: 2026-10-05 · v5.17: 2026-10-01; antes 2026-09-07, v5.6); el pipeline pasa siempre la fecha if(!/^20\d\d-\d\d-\d\d$/.test(START_ISO)) throw new Error('START inválido: '+START_ISO); // v5.6: D1 = lun 7-sep-2026
const START = new Date(START_ISO + 'T12:00:00'); // START parametrizado: node <script> YYYY-MM-DD
// v6.00 (6-oct-2026): SKIP y DÍAS PROTEGIDOS desde DATA/_scripts/_fechas_v6.json (gen_fechas_v6.js aborta si no cuadra con sus derivaciones).
// SKIP v6 = 25-dic · 31-dic · 1-ene · jue 25 / vie 26-mar-2027 · PROTEGIDOS v6 = vie 12-mar · sáb 13 · dom 14-mar · lun 15-mar · sáb 25-sep ·
// dom 26-sep · lun 27-sep (los v5.20 lun 22-feb · mar 9-mar · mié 10-mar desaparecen). Sin sesiones de planes secundarios (Research · Derma ·
// AURUM · MIR mantenimiento) en esas fechas: se SALTAN como un feriado y el plan corre una ranura (nada se recorta). MISMA fuente en
// gen_research_plan · gen_derma_ciclo2 · remap_inicio (Derma) · gen_aurum_plan · gen_mir_mantenimiento.
const F6 = require('./gen_fechas_v6').cargarFechasV6();
const SKIP_FIJOS = new Set(F6.skip);
const PROTEGIDOS = new Set(F6.protegidos.map((x) => x.fecha));
/** v6.00 (DJ-4): desde la F2 (lun 4-ene-2027) AURUM = 30' (14:15-14:45) = `min` núcleo; el resto, opcional. */
const MIN30_DESDE = F6.encaps.intensiva_desde;
const isoOf = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
function nextBusinessDay(date) {
  const d = new Date(date);
  do { d.setTime(d.getTime() + 86400000); } while (d.getDay() === 0 || d.getDay() === 6 || SKIP_FIJOS.has(isoOf(d)) || PROTEGIDOS.has(isoOf(d)));
  return d;
}
// primer día hábil ≥ START (si START cae en finde, se corre al lunes siguiente)
let cursor = new Date(START);
while (cursor.getDay() === 0 || cursor.getDay() === 6) cursor = nextBusinessDay(cursor);

// ─── título a Title Case suave (las fases vienen con mayúscula inicial en el JSON) ───
function tituloCase(s) {
  const MIN = new Set(['y', 'de', 'la', 'el', 'sin', 'e', 'del', 'al', 'en']);
  return String(s).toLowerCase().split(' ').map((w, i) => {
    if (i > 0 && MIN.has(w)) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ').replace(/\(([a-z])/g, (m, c) => '(' + c.toUpperCase());
}

// ─── formato de la lectura según tipo (audiolibro → audio · libro → lectura) ───
function formatoLectura(tipo) {
  return tipo === 'audiolibro' ? 'audio' : 'lectura';
}

// ─── Construir los 130 DiaAurum ───
const dias = [];
let date = new Date(cursor);
for (let i = 0; i < lecciones.length; i++) {
  const L = lecciones[i];
  const d = i + 1;                       // 1..130
  const semana = Math.floor(i / 5) + 1;  // 1..26 (5 días hábiles por semana)
  const fechaISO = date.toISOString().slice(0, 10);
  const wd = WD[date.getDay()];
  if (wd === 'Sáb' || wd === 'Dom') throw new Error('Día ' + d + ' cae en fin de semana: ' + fechaISO);

  const fa = CUR.fases.find((x) => x.n === L.fase);
  const faseId = 'f' + L.fase;
  const faseLabel = `F${L.fase} · ${tituloCase(fa.titulo)}`;

  const bloques = [];
  // A — vídeo a ver (pantalla · core)
  const v = L.ver || {};
  bloques.push({
    tag: 'A', slot: 'core', min: v.min || 0, formato: 'pantalla',
    material: v.canal || '', leccion: v.titulo || '', url: v.url || undefined,
    dur: v.min ? `${v.min} min` : undefined,
    real: !(v.url && /\(verificar\)/i.test(v.url)),
  });
  // PRAC — práctica/drill del día (practica · core)
  const p = L.practica || {};
  bloques.push({
    tag: 'PRAC', slot: 'core', min: p.min || 0, formato: 'practica',
    material: 'Drill del día', leccion: p.texto || '', real: true,
  });
  // L — lectura: libro/audiolibro (audio|lectura · slot 'lectura', en huecos de viaje)
  const lc = L.lectura;
  if (lc) {
    bloques.push({
      tag: 'L', slot: 'lectura', min: lc.min || 0, formato: formatoLectura(lc.tipo),
      material: lc.fuente || lc.titulo || '', leccion: lc.titulo || '', url: lc.url || undefined,
      dur: lc.min ? `${lc.min} min` : undefined,
      real: !(lc.url && /\(verificar\)/i.test(lc.url)),
    });
  }

  // v3 — variante LIVIANO del drill (viernes de F3-F6) y nº de PITCH en el cierre de fase
  const lv = L.liviano || null;
  const ultimoDeFase = i === lecciones.length - 1 || lecciones[i + 1].fase !== L.fase;
  dias.push({
    d, fecha: fechaISO, wd, semana,
    faseId, fase: faseLabel,
    titulo: L.titulo,
    obs: L.obsidian_nota || undefined,
    min: L.min_core,                     // núcleo (ver + practica) = min_core (30-60)
    min30: fechaISO >= MIN30_DESDE,      // v6.00: F2/F3 (desde el lun 4-ene-2027) → 30' (la UI muestra 30' = núcleo; bloques extra opcionales)
    bloques,
    liviano: lv ? { texto: lv.texto, min: lv.min || 0, pitch: lv.pitch || undefined } : undefined,
    pitch: ultimoDeFase ? L.fase : undefined,
    dj: L.dJson, // 1..5 dentro de su semana del plan (no se emite)
  });

  date = nextBusinessDay(date);
}

// fecha fin = la del último día
const finISO = dias[dias.length - 1].fecha;
const TOTAL = dias.length;
const SEMANAS = dias[dias.length - 1].semana;

// ─── mapa de fases para la meta (faseId → label corto, con rango de semanas reales) ───
const semanasDeFase = {};
for (const x of dias) (semanasDeFase[x.faseId] = semanasDeFase[x.faseId] || new Set()).add(x.semana);
const fasesMeta = {};
for (const f of CUR.fases) {
  const set = semanasDeFase['f' + f.n];
  const arr = set ? [...set].sort((a, b) => a - b) : [];
  const rango = arr.length ? `sem ${arr[0]}-${arr[arr.length - 1]}` : '';
  fasesMeta['f' + f.n] = `F${f.n} · ${tituloCase(f.titulo)} (${rango})`;
}

// ─── Emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
const blkTs = (b) => {
  let o = `{tag:"${b.tag}",slot:"${b.slot}",min:${b.min || 0},formato:"${b.formato}",material:"${esc(b.material)}",leccion:"${esc(b.leccion)}"`;
  if (b.url) o += `,url:"${esc(b.url)}"`;
  if (b.dur) o += `,dur:"${esc(b.dur)}"`;
  o += `,real:${b.real !== false}}`;
  return o;
};
const diaTs = (x) => {
  let o = `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},faseId:"${x.faseId}",fase:"${esc(x.fase)}",titulo:"${esc(x.titulo)}"`;
  if (x.obs) o += `,obs:"${esc(x.obs)}"`;
  o += `,min:${x.min},min30:${x.min30 ? 'true' : 'false'},bloques:[${x.bloques.map(blkTs).join(',')}]`;
  if (x.liviano) {
    o += `,liviano:{texto:"${esc(x.liviano.texto)}",min:${x.liviano.min}`;
    if (x.liviano.pitch) o += `,pitch:"${esc(x.liviano.pitch)}"`;
    o += '}';
  }
  if (x.pitch) o += `,pitch:${x.pitch}`;
  o += '}';
  return o;
};
const pitchDias = dias.filter((x) => x.pitch).map((x) => `{pitch:${x.pitch},d:${x.d},fecha:"${x.fecha}",faseId:"${x.faseId}",liviano:${x.liviano && x.liviano.pitch ? 'true' : 'false'}}`);
const LIV = CUR.liviano || {};
const livCasoTs = `{
  paciente: "${esc((LIV.paciente || {}).resumen || '')}",
  fuente: "${esc((LIV.paciente || {}).fuente || '')}",
  kpi: "${esc((LIV.paciente || {}).kpi || '')}",
  regla: "${esc(LIV.regla || '')}",
  valueStack: "${esc((LIV.cifras_oferta || {}).value_stack || '')}",
  ancla: "${esc((LIV.cifras_oferta || {}).ancla || '')}",
  objeciones: [${(((LIV.cifras_oferta || {}).objeciones) || []).map((s) => `"${esc(s)}"`).join(', ')}],
  limiteEtico: "${esc((LIV.limite_etico || {}).regla_closer || '')}",
  art73: "${esc((LIV.limite_etico || {}).art_73 || '')}",
}`;

const faseIdUnion = CUR.fases.map((f) => `'f${f.n}'`).join(' | ');
const fasesMetaTs = Object.entries(fasesMeta).map(([k, v]) => `${k}: '${v.replace(/'/g, "\\'")}'`).join(', ');

const ts = `/**
 * aurumDailyPlan.ts — Motor día-a-día AURUM v2 (${SEMANAS} semanas · ${TOTAL} días · ${dias[0].fecha} → ${finISO}).
 * AURUM = programa de 6 meses para volverse un closer de ventas de élite.
 * GENERADO por DATA/_scripts/gen_aurum_plan.js desde DATA/AURUM/curricula/_curriculum_v2.json.
 * NO editar a mano — regenerar: node DATA/_scripts/gen_aurum_plan.js YYYY-MM-DD (v6.05: 2026-10-26 · v6.03: 2026-10-21 · v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07 · v5.19: 2026-10-06 · v5.18: 2026-10-05)
 * v6.00 (6-oct-2026 · V6_ESPEC §E): SKIP / DÍAS PROTEGIDOS de DATA/_scripts/_fechas_v6.json → fin ${finISO}; desde ${MIN30_DESDE} (F2, DJ-4)
 * AURUM = 30' 14:15-14:45 (campo min30 = true: la UI muestra 30' = núcleo; bloques extra opcionales). Mismas 130 lecciones.
 *
 * Calendario: las ${TOTAL} lecciones se asignan a días HÁBILES consecutivos Lunes→Viernes
 * (salta sábados y domingos). Ventana fija en Google Calendar: 14:15-15:15.
 *  NÚCLEO (slot 'core', en 14:15-15:15, suma = min_core 30-60 min):
 *    A    (pantalla)  el VÍDEO a ver de la lección (link directo + min)
 *    PRAC (practica)  el drill del día — la práctica deliberada (la "caja negra" del closer)
 *  LECTURA (slot 'lectura', NO en esa hora — en tus huecos de viaje/lectura):
 *    L    (audio|lectura)  el libro/audiolibro de la fase: audio si tipo='audiolibro', lectura si tipo='libro'
 *  + link a Obsidian (vault, carpeta 07_VENTAS_AURUM).
 * real:true = URL verificada/estable · real:false = URL marcada "(verificar)" en el currículo.
 * Progreso REAL manual (PlanKey 'aurum', empieza 0%).
 *
 * v3 (5-sep-2026): \`liviano\` = variante LIVIANO del drill (5º día de cada semana de F3-F6: SPIN de la Evaluación
 * Integral · value stack S/ 6,360 vs S/ 3,870 + ancla bariátrica · 7 objeciones · cierre ético sin
 * promesa clínica, CMP Art. 73) con el MISMO paciente del caso integral de la Academia; \`pitch\` = nº
 * de PITCH en el cierre de fase (rúbrica AURUM_RUBRICA_PITCH en aurumData.ts).
 */
export type AurumFormato = 'pantalla' | 'practica' | 'audio' | 'lectura';
export interface AurumBloque {
  tag: 'A' | 'PRAC' | 'L';
  slot: 'core' | 'lectura';
  min: number;
  formato: AurumFormato;
  material: string;
  leccion: string;
  url?: string;
  dur?: string;
  real: boolean;
}
/** Variante LIVIANO del drill (venta ética de un programa médico; mismo paciente que el caso integral). */
export interface AurumLiviano { texto: string; min: number; pitch?: string }
export interface DiaAurum {
  d: number; fecha: string; wd: string; semana: number;
  faseId: ${faseIdUnion}; fase: string; titulo: string; obs?: string;
  min: number; // núcleo (ver + practica) = min_core
  /** v6.00 (DJ-4): true desde la F2 (lun 4-ene-2027) → la sesión es 30' (14:15-14:45) = núcleo; lo demás opcional. */
  min30: boolean;
  bloques: AurumBloque[];
  liviano?: AurumLiviano; // 5º día de cada semana de F3-F6 (1 de cada 5 drills)
  pitch?: number;         // 1..7 = día de cierre de fase → grabar PITCH vN y puntuar con AURUM_RUBRICA_PITCH
}

export const AURUM_PLAN_META = {
  inicio: '${dias[0].fecha}', fin: '${finISO}', totalDias: ${TOTAL}, semanas: ${SEMANAS},
  ventana: '14:15–15:15', // v6.00: 14:15–14:45 (30') desde min30Desde
  min30Desde: '${MIN30_DESDE}', diasMin30: ${dias.filter((x) => x.min30).length},
  bloque: "Nucleo 30-60 min (ver+practicar) en 14:15-15:15 · lectura/audiolibro en huecos de viaje",
  fases: { ${fasesMetaTs} },
} as const;

export const AURUM_DIAS: DiaAurum[] = [
${dias.map(diaTs).join(',\n')}
];

/** Los 7 días de cierre de fase (PITCH v1→v7; 5º día de la semana del plan: v6.05 = vie D15/D35 (13-nov · 11-dic), mié D55/D75/D95 (13-ene · 10-feb · 10-mar), mar D115 (13-abr) y mar D130 (4-may, ya en el SERUMS) · v6.03 = mar D15/D35 (10-nov · 8-dic), vie D55/D75/D95 (8-ene · 5-feb · 5-mar), jue D115 (8-abr) y jue D130 (29-abr) · v6.02 = vie D15/D35, mié D55 (6-ene)/D75/D95, mar D115 (6-abr) y mar D130 (27-abr) · v6.01 = vie D15/D35, lun D55 (28-dic), mié D75/D95, mar D115 (30-mar) y mar D130 (20-abr) · v6.00 = mar D15/D35/D55, vie D75/D95, mar D115 (23-mar) y jue D130 (15-abr) · D96 lun 22-feb (ya no es día protegido); vie 12-mar y lun 15-mar (D-1 hábil y lunes post-ENCAPS) y la Semana Santa (25-26 mar) no llevan AURUM · v5.20 = mar D15/D35/D55, vie D75/D95 y mié D115/D130 · D95 vie 19-feb = último día del plan Step 1; el examen (lun 22-feb) y la víspera/día del ENCAPS (9-10 mar) eran DÍAS PROTEGIDOS · v5.19 = lun D15/D35/D55 y jue D75/D95/D115/D130 (⚠ D95 jue 18-feb = D-1 del Step 1 y D96 vie 19-feb = día del examen) · v5.18: vie D15-D55 y mié D75-D130). \`liviano\` = ese PITCH tiene versión LIVIANO. */
export const AURUM_PITCH_DIAS: { pitch: number; d: number; fecha: string; faseId: DiaAurum['faseId']; liviano: boolean }[] = [
  ${pitchDias.join(',\n  ')}
];

/** Caso LIVIANO de AURUM (= caso integral de la Academia) + cifras de la oferta (empresaData.ts LIVIANO_OFERTA). */
export const AURUM_LIVIANO_CASO = ${livCasoTs} as const;
export const AURUM_LIVIANO_DIAS: number[] = [${dias.filter((x) => x.liviano).map((x) => x.d).join(', ')}];

export function aurumDiaDe(fechaISO: string): DiaAurum | undefined { return AURUM_DIAS.find(x => x.fecha === fechaISO); }
export function aurum7d(fromD: number): DiaAurum[] { return AURUM_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }

export const AURUM_FORMATO_ICON: Record<AurumFormato, string> = {
  pantalla: '🎬', practica: '🎯', audio: '🎧', lectura: '📖',
};
export const AURUM_TAG_LABEL: Record<AurumBloque['tag'], string> = {
  A: 'A · ver', PRAC: 'PRAC · practicar pitch', L: 'lectura/audio (en tus huecos)',
};

// ─── Obsidian: nota del día en el vault (carpeta 07_VENTAS_AURUM) ───
const AURUM_VAULT = 'Vault_Medicina MIR_Joseph';
/** Enlace obsidian:// a la nota del día. El currículo trae rutas tipo "VENTAS/Fase1/S01 - …";
 *  las reanclamos a la carpeta real 07_VENTAS_AURUM del vault.
 *  v6.03 (verificación de contenido, 20-oct-2026): la carpeta es SOLO el primer segmento (FaseN) y el resto es el título de la lección,
 *  que puede llevar «/» («asertiva / positiva / DJ», «70/30», «como/que», «alternativo/suposicion/invitacion»): antes se partía en cada
 *  «/» y el enlace apuntaba a una nota inexistente. Mismo saneo que gen_aurum_obsidian.js (barra, dos puntos, * ? " < > | → -). */
export function aurumObsUrl(nota?: string): string | null {
  if (!nota) return null;
  const rel = String(nota).replace(/^VENTAS\\//, '');
  const i = rel.indexOf('/');
  const san = (s: string): string => s.replace(/[\\\\/:*?"<>|]/g, '-').trim();
  const file = '07_VENTAS_AURUM/' + (i < 0 ? san(rel) : rel.slice(0, i) + '/' + san(rel.slice(i + 1)));
  return 'obsidian://open?vault=' + encodeURIComponent(AURUM_VAULT) + '&file=' + encodeURIComponent(file);
}
`;

fs.writeFileSync(path.join(ROOT, 'src/lib/aurumDailyPlan.ts'), ts, 'utf8');

// ─── Verificaciones de salida ───
const finSemana = dias.filter((x) => x.wd === 'Sáb' || x.wd === 'Dom');
const semanasCubiertas = new Set(dias.map((x) => x.semana));
const minFuera = dias.filter((x) => x.min < 30 || x.min > 60);
console.log('OK src/lib/aurumDailyPlan.ts');
console.log('  inicio:', dias[0].fecha, '· fin:', finISO, '· totalDias:', TOTAL, '· semanas:', SEMANAS);
console.log('  ventana:', '14:15–15:15');
console.log('  días en fin de semana:', finSemana.length, '(debe ser 0)');
console.log('  semanas cubiertas:', semanasCubiertas.size, '(debe ser', SEMANAS + ')');
console.log('  días con min∉[30,60]:', minFuera.length, '(debe ser 0)');
const enFeriado = dias.filter((x) => SKIP_FIJOS.has(x.fecha) || PROTEGIDOS.has(x.fecha));
const livDias = dias.filter((x) => x.liviano);
const pitchD = dias.filter((x) => x.pitch).map((x) => `v${x.pitch}=D${x.d} (${x.wd} ${x.fecha})`);
console.log('  días en feriado fijo:', enFeriado.length, '(debe ser 0)');
console.log('  drills con variante LIVIANO:', livDias.length, '(debe ser 16: 5º día de cada semana de F3-F6 = 1 de cada 5) →', livDias.map((x) => 'D' + x.d + '/' + x.wd.slice(0, 2)).join(' '));
console.log('  cierres de fase / PITCH:', pitchD.join(' · '));
// Nota: las semanas del plan son 5 días hábiles consecutivos; tras un feriado fijo (25-dic) el 5º día deja de
// caer en viernes (deriva de calendario ya presente desde v5.4 con SKIP_FIJOS), y con el D1 fuera de lunes
// (v5.17: jue 1-oct) no cae en viernes nunca; v5.20 (D1 mié 7-oct, con los DÍAS PROTEGIDOS 22-feb / 9-10 mar saltados): martes hasta el D55, mié 30-dic el D60, viernes D65-D95, lunes D100-D105 y miércoles D110-D115 · v5.19 (D1 mar 6-oct): lunes hasta el D55, mar 29-dic el D60 y jueves desde el D65 (ninguna en viernes) · v5.18 (D1 lun 5-oct): viernes hasta el D55, lun 28-dic el D60 y miércoles desde el D65. El invariante que se exige es "1 de cada 5 drills" (d=5 del JSON),
// no el día de la semana.
const livNoViernes = livDias.filter((x) => x.wd !== 'Vie').length;
if (livNoViernes) console.log('  ⚠ variantes LIVIANO fuera de viernes por la deriva post-feriado o el D1 fuera de lunes:', livNoViernes, '(esperado: en v6.05, con D1 en lunes, 14 —lun D45 (28-dic), mié D50-D95, mar D105-D115; D40 y D100 caen en viernes—; en v6.03, con D1 en miércoles, 7 —mar D40-D45, mié D50 (30-dic), mar D100-D105, jue D110-D115; D55-D95 caen en viernes—; en v6.02, con D1 en lunes, 13 —lun D50, mié D55-D100, mar D110-D115; D40, D45 y D105 caen en viernes—; en v6.01, con D1 en lunes, 12 —lun D55, mié D60-D105, mar D115; D40-D50 y D110 caen en viernes—; en v6.00, con D1 en miércoles, 7 —mar D40-D55, mié D60, mar D110-D115; D65-D105 caen en viernes—; en v5.20, 9 —mar hasta D55, mié D60, lun D100-D105, mié D110-D115; D65-D95 sí caen en viernes—; en v5.19, con D1 en martes, todas —lun hasta D55, mar D60, jue D65-D115—; en v5.18 D60 lun + D65-D115 mié; con D1 en jueves, todas)');
if (TOTAL !== 130) throw new Error('Se esperaban 130 días, hay ' + TOTAL);
if (finSemana.length) throw new Error('Hay días en sábado/domingo');
if (enFeriado.length) throw new Error('Hay días en feriado fijo');
if (semanasCubiertas.size !== SEMANAS || SEMANAS !== 26) throw new Error('Faltan semanas por cubrir (esperado 26, hay ' + SEMANAS + ')');
if (minFuera.length) throw new Error('Hay días con min_core fuera de [30,60]');
if (livDias.length !== 16) throw new Error('Se esperaban 16 drills con variante LIVIANO, hay ' + livDias.length);
if (livDias.some((x) => x.dj !== 5)) throw new Error('Hay variantes LIVIANO fuera del 5º día de su semana: ' + livDias.filter((x) => x.dj !== 5).map((x) => 'D' + x.d).join(', '));
if (pitchD.length !== 7) throw new Error('Se esperaban 7 cierres de fase, hay ' + pitchD.length);
