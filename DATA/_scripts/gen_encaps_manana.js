/**
 * gen_encaps_manana.js — v6.07 (dom 8-nov-2026): MAÑANAS ENCAPS de F1 (lun · mié · vie 07:15-12:00) + su hora de las 18:00 + los 15′ de
 * repasos ENCAPS del Anki 05:00 + la clase EN VIVO de Theomed del sábado (14:45 preparar · 15:00-17:00 en vivo) + el ENCAPS opcional del
 * domingo (4 h, flexible, sin hora fija) → src/lib/encapsManana.ts, en el formato común «qué · cuánto · cómo» (GuiaBloque, src/lib/guia.ts).
 *
 *   node DATA/_scripts/gen_encaps_manana.js            → escribe src/lib/encapsManana.ts
 *   node DATA/_scripts/gen_encaps_manana.js --check    → regenera en memoria y compara con el fichero (exit 1 si difiere o si algo no cuadra)
 *   node DATA/_scripts/gen_encaps_manana.js --informe 2026-11-16   → además imprime las guías de ese día
 *
 * Fuente de contenido (NO se inventa nada aquí): DATA/ENCAPS/_encaps_manana_v607.json (protocolo de la mañana, modos de estudio, 22 mañanas
 * con su teoría, banqueo, norma y notas; sábados con la clase en vivo; domingos con el simulacro) · duración EXACTA de cada sesión asíncrona
 * de Theomed: DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md §1.3 (tabla «Sesiones asíncronas») · plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md
 * §3-§7 · fechas: DATA/_scripts/_fechas_v6.json (F1, días de Step del tramo 1, SKIP, transición).
 *
 * Reglas del generador (las mismas que el plan, escritas aquí para que el cálculo sea reproducible):
 *  · La mañana sigue las 7 franjas del protocolo (07:15 arranque · 07:30 teoría · 09:15 post-test · 09:30 pausa · 09:45 banqueo · 10:45
 *    corrección · 11:40 tarjetas). El mié 30-dic (cierre) = simulacro 100Q / 2 h + corrección en las mismas horas.
 *  · «Cuánto» de la teoría: vídeo = duración ÷ 1,75 (÷ 2 si la mañana dice «2×») · texto primero = duración ÷ 3 (el plan: «el texto se lee
 *    3-4 veces más rápido que el vídeo») + 1′ por página de PDF si la trae · banqueo grabado ACTIVO = su duración · bloques de normas u hoja de
 *    reglas = su duración (ya es tiempo de trabajo) · clase en vivo en diferido = ELÁSTICA (solo tramos útiles, entre 20′ y la mitad de la
 *    clase; el resto en audio en tiempos muertos, como dice el plan).
 *  · La franja de teoría tiene 105′. Lo que no cabe ENTERO (sesión a sesión, en orden) NO se quita: pasa a las 18:00 del MISMO día (bloque
 *    «ENCAPS · cifras, normas y flashcards»), con su post-test. Si sobra tiempo (≥ 5′), va a «Theoesencial + norma del tema» (lectura activa);
 *    si sobran < 5′, se suma a la última sesión (es redondeo).
 *  · Banqueo: n × 72 s. Si es cronometrado y no cabe en 60′ (28-dic: 60Q = 72′), la franja del banqueo crece y la corrección se acorta (≥ 30′).
 *  · Arranque 07:15 (fix lote 1b del Calendar): las 10 tarjetas y las reglas son de la mañana ENCAPS anterior: «de ayer» solo si fue el día
 *    anterior · «del viernes» / «del lunes» / «del miércoles» si es la anterior de la rotación · «del último día ENCAPS, mié 23-dic» si un SKIP
 *    se comió una mañana ENCAPS (lun 28-dic). Las ★ de las cifras de las 18:00 van al PRIMER Anki 05:30 siguiente («mañana» · «el lunes»).
 *  · Enlaces SOLO al campus de Theomed (cursos 99, 105 y 116 del JSON). El material de academias del Drive se nombra por su ruta, sin enlace
 *    (el repo es público: no se copia nada al repo ni a public/).
 * Controles (aborta y no escribe): las mañanas del JSON = los días de F1 L-V sin Step (step1.f1_dias_semana) y sin SKIP · sábados = los de
 * F1 + transición · domingos = los de F1 + transición · duración de cada grupo de sesiones del JSON = Σ de la tabla de Theomed (± 3′) ·
 * validarGuia en todas las guías · cada mañana cubre 07:15-12:00 sin huecos ni solapes · lo pendiente cabe en las 18:00 · ninguna URL fuera
 * del campus de Theomed.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS } = require('./usmle/cargar_ts');

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const iInf = argv.indexOf('--informe');
const INFORME = iInf >= 0 ? argv[iInf + 1] : null;
const OUT = path.join(ROOT, 'src', 'lib', 'encapsManana.ts');
const SRC = path.join(ROOT, 'DATA', 'ENCAPS', '_encaps_manana_v607.json');
const THEO = path.join(ROOT, 'DATA', 'ENCAPS', 'INVESTIGACION_2027-1', 'THEOMED_Y_DRIVE.md');
const FECHAS = path.join(ROOT, 'DATA', '_scripts', '_fechas_v6.json');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/encapsManana.ts'); process.exit(1); };
const AVISOS = [];

const J = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const F6 = JSON.parse(fs.readFileSync(FECHAS, 'utf8'));
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'));

// ── utilidades ────────────────────────────────────────────────────────────────────────────────────────────────
const aMin = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const fr = (ini, fin) => `${ini}–${fin}`;
const dow = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();
const addDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const corta = (iso) => `${WD[dow(iso)]} ${Number(iso.slice(8))}-${MES[Number(iso.slice(5, 7)) - 1]}`;
const durTxt = (m) => (m < 60 ? `${m}′` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}′`);
const vel = (v) => String(v).replace('.', ',') + '×';
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
/** «2 h 10» · «50′» · «1 h» → minutos */
function durMin(s) {
  const m = /^\s*(?:(\d+)\s*h)?\s*(\d+)?\s*′?\s*$/.exec(String(s || ''));
  if (!m || (!m[1] && !m[2])) aborta(`duración ilegible «${s}»`);
  return Number(m[1] || 0) * 60 + Number(m[2] || 0);
}
const P = (min, que, como, enlace) => ({ min, que, como, ...(enlace ? { enlace } : {}) });
const R = (t, url, extra = {}) => ({ t, url, ...extra });
function guia(franja, titulo, pasos, recursos, hecho, extra = {}) {
  const totalMin = G.minutosFranja(franja);
  return { franja, plan: 'encaps', titulo, totalMin, pasos, recursos, hecho, ...(extra.planB ? { planB: extra.planB } : {}), ...(extra.aviso ? { aviso: extra.aviso } : {}) };
}

// ── campus (los ÚNICOS enlaces) y rutas del Drive (solo texto) ───────────────────────────────────────────────
const CAMPUS = J._meta.campus;
for (const [k, u] of Object.entries(CAMPUS)) if (!/^https:\/\/campus\.academiatheomed\.com\//.test(u)) aborta(`_meta.campus.${k} no es del campus de Theomed: ${u}`);
const L99 = { t: 'Campus · curso 99', url: CAMPUS.curso };
const L105 = { t: 'Campus · simulacros (105)', url: CAMPUS.simulacros };
const L116 = { t: 'Campus · adicionales (116)', url: CAMPUS.adicionales };
const R99 = R('Campus Theomed · curso 99 (MEDICINA REGULAR GP2 2027-I)', CAMPUS.curso);
const R105 = R('Campus Theomed · curso 105 (SIMULACROS MEDICINA 2027)', CAMPUS.simulacros);
const R116 = R('Campus Theomed · curso 116 (SESIONES ADICIONALES GP02)', CAMPUS.adicionales);
const DRIVE = 'Drive u/4 › SERUMS 2026 II';
const RUTA = {
  asinc: (area, s) => `Campus › curso 99 › bloque ${area} › Sesiones asíncronas › S${s} (vídeo · PPT · post-test)`,
  vivo: (area) => `Campus › curso 99 › bloque ${area} › Sesiones sincrónicas (grabación · PPT · post-test)`,
  adic: 'Campus › curso 116 (SESIONES ADICIONALES GP02)',
  theoes: (area) => `Campus › curso 99 › Material complementario › Theoesencial y glosario de ${area}`,
  normas: 'Campus › curso 99 › sección «Normas técnicas» (por ítem del temario) · carpeta «NORMAS TÉCNICAS» del material complementario',
  drLopezPT: `${DRIVE} › DR LOPEZ › 🚀 PosTest`,
  drLopezSim: `${DRIVE} › DR LOPEZ › 📝 Simulacros`,
  drLopezNorm: `${DRIVE} › DR LOPEZ › 📈 Normativas`,
  qxBanqueo: `${DRIVE} › Qx MEDIC › Fase 2 › Banqueo`,
  theoDrive: `${DRIVE} › THEOMED › 📚 Videoclases asincrónicas (misma serie, edición 2026-II)`,
};
const AREA = { SP: 'Salud Pública', CI: 'Cuidado Integral', GES: 'Gestión', INV: 'Investigación', ET: 'Ética e Interculturalidad' };
const AREA_DE_NOMBRE = (txt) => Object.entries(AREA).find(([, n]) => txt.startsWith(n))?.[0] ?? null;

// ── duración exacta de las sesiones asíncronas (THEOMED_Y_DRIVE §1.3) ──────────────────────────────────────────
const SES = {};
{
  const md = fs.readFileSync(THEO, 'utf8');
  for (const line of md.split(/\r?\n/)) {
    const m = /^\| (SP|CI|GES|INV|ET) \| (S1 .+) \|\s*$/.exec(line);
    if (!m) continue;
    for (const x of m[2].matchAll(/S(\d+) \d+-\w+ · (\d+(?::\d+){1,2})/g)) {
      const p = x[2].split(':').map(Number);
      const seg = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
      SES[`${m[1]} S${x[1]}`] = seg;
    }
  }
  for (const [a, n] of Object.entries({ SP: 8, CI: 8, GES: 7, INV: 3, ET: 3 })) for (let i = 1; i <= n; i++) if (!SES[`${a} S${i}`]) aborta(`THEOMED_Y_DRIVE.md §1.3: falta la duración de ${a} S${i}`);
}
const segTxt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ── controles de fechas (las mañanas, sábados y domingos salen de _fechas_v6.json) ──────────────────────────────
const SKIP = new Set(F6.skip);
const STEP_DIAS = F6.step1.f1_dias_semana || [1, 2, 3, 4, 5];
const ESPERADAS = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d) && !STEP_DIAS.includes(w)) ESPERADAS.push(d); }
const SAB_ESP = [], DOM_ESP = [];
for (let d = F6.f1.inicio; d <= F6.transicion.hasta; d = addDias(d, 1)) { if (dow(d) === 6) SAB_ESP.push(d); if (dow(d) === 0) DOM_ESP.push(d); }
const fechasJ = J.mananas.map((x) => x.fecha);
if (fechasJ.join() !== ESPERADAS.join()) aborta(`mañanas del JSON (${fechasJ.length}) ≠ días de F1 sin Step ni SKIP de _fechas_v6.json ${F6.version} (${ESPERADAS.length}): sobran [${fechasJ.filter((f) => !ESPERADAS.includes(f)).join(', ')}] · faltan [${ESPERADAS.filter((f) => !fechasJ.includes(f)).join(', ')}]`);
J.mananas.forEach((x, i) => { if (x.n !== i + 1) aborta(`mañana ${x.fecha}: n = ${x.n} ≠ ${i + 1}`); });
if (J.sabados.map((x) => x.fecha).join() !== SAB_ESP.join()) aborta(`sábados del JSON ≠ sábados de F1 + transición (${SAB_ESP.join(', ')})`);
if (J.domingos.map((x) => x.fecha).join() !== DOM_ESP.join()) aborta(`domingos del JSON ≠ domingos de F1 + transición (${DOM_ESP.join(', ')})`);
const NM = J.mananas.length;

// ── unidades de teoría ─────────────────────────────────────────────────────────────────────────────────────────
const VEL_VIDEO = 1.75, VEL_TEXTO = 3;
const MODO = J._meta.modos;
/** Expande un ítem de teoría del JSON en unidades con su «cuánto» (min) y su ruta. */
function unidades(it) {
  const durJ = durMin(it.duracion);
  const cod = it.codigos && it.codigos.length ? ` (${it.codigos.join(' · ')})` : '';
  const s = /^(SP|CI|GES|INV|ET) S(\d)(?:-S?(\d))?\b(.*)$/.exec(it.item);
  if (s && (it.modo === 'video' || it.modo === 'texto')) {
    const a = s[1], i0 = Number(s[2]), i1 = Number(s[3] || s[2]);
    const lista = []; for (let i = i0; i <= i1; i++) lista.push(i);
    const totalSeg = lista.reduce((acc, i) => acc + SES[`${a} S${i}`], 0);
    // la tabla de Theomed (duración de cada vídeo, en segundos) manda sobre la suma escrita en el JSON: si no coinciden, aviso (no se aborta)
    if (Math.abs(totalSeg / 60 - durJ) > 3) AVISOS.push(`«${it.item}» (${it.fecha || '?'}) dice ${it.duracion} y la tabla de Theomed (THEOMED_Y_DRIVE §1.3) suma ${durTxt(Math.round(totalSeg / 60))}: se usa la tabla`);
    const v = it.modo === 'video' ? (/^2×/.test(it.velocidad || '') ? 2 : VEL_VIDEO) : null;
    return lista.map((i) => {
      const seg = SES[`${a} S${i}`];
      const min = it.modo === 'video' ? Math.round(seg / 60 / v) : Math.round(seg / 60 / VEL_TEXTO);
      const extra = s[4] && i0 === i1 ? s[4].trim() : '';
      return {
        tipo: 'sesion', area: a, s: i, min, postTest: `${a} S${i}`, codigos: it.codigos || [],
        que: it.modo === 'video'
          ? `${a} S${i}${extra ? ' ' + extra : ''} · vídeo ${segTxt(seg)} → ${min}′ a ${vel(v)}${cod}`
          : `${a} S${i}${extra ? ' ' + extra : ''} · TEXTO PRIMERO (${min}′; el vídeo dura ${segTxt(seg)})${cod}`,
        como: `${it.modo === 'video' ? MODO.video.replace(/^vídeo a 1,75×/, `Vídeo a ${vel(v)}`) : cap(MODO.texto)}${it.velocidad && it.modo === 'texto' ? ` (${it.velocidad})` : ''}. Notas SOLO en forma de pregunta. Ruta: ${RUTA.asinc(AREA[a], i)}.`,
        enlace: L99,
      };
    });
  }
  const b = /^Banqueo (\d+)\/19/.exec(it.item);
  if (b && it.modo === 'activo') {
    return [{ tipo: 'activo', min: durJ, que: `${it.item} · ${durTxt(durJ)} · ACTIVO`, como: `${cap(MODO.activo)}. Ruta: ${RUTA.adic} › banqueo semanal grabado.`, enlace: L116 }];
  }
  if (/^Revisión normativa/.test(it.item)) {
    const pdf = Number((/PDF (\d+) p/.exec(it.item) || [])[1] || 0);
    const min = Math.round(durJ / VEL_TEXTO) + pdf;
    return [{ tipo: 'texto', min, codigos: it.codigos || [], que: `${it.item} · TEXTO PRIMERO (${min}′: vídeo de ${it.duracion}${pdf ? ` + PDF de ${pdf} p` : ''})${cod}`, como: `${cap(MODO.texto)}. Ruta: ${RUTA.adic} › revisiones normativas.`, enlace: L116 }];
  }
  const v = /^(SP|CI|GES|INV|ET) (\d+)\/(\d+)\b(.*)$/.exec(it.item);
  if (v && it.modo === 'vivo_diferido') {
    const cond = /si no la viste en vivo/.test(it.item);
    return [{ tipo: 'vivo', elastico: true, cond, area: v[1], dur: durJ, minMin: 20, maxMin: Math.round(durJ / 2), postTest: `${v[1]} ${v[2]}/${v[3]}`,
      que: (min) => `${it.item} · clase de ${durTxt(durJ)} → ${min}′ de tramos útiles a 2×`,
      como: `${cap(MODO.vivo_diferido)}. Primero el PPT; el vídeo solo donde el PPT no explica.${cond ? ' Si la viste EN VIVO el sábado, este tiempo va a la otra clase o a la norma del tema.' : ''} Ruta: ${RUTA.vivo(AREA[v[1]])}.`,
      enlace: L99 }];
  }
  if (/^Normas de la semana|^Hoja de reglas/.test(it.item)) {
    const normas = /^Normas/.test(it.item);
    return [{ tipo: 'presupuesto', min: durJ, que: `${it.item} · ${durTxt(durJ)}`,
      como: normas ? `Lectura de VERIFICACIÓN, no lineal: definiciones de las primeras páginas, tablas, flujogramas, plazos y cifras. Cada dato que dudes → tarjeta a las 11:40. Ruta: ${RUTA.normas}.` : 'Tapa la regla, dila en voz alta, comprueba. Las que no salgan → ★ y tarjeta a las 11:40.',
      enlace: normas ? L99 : undefined }];
  }
  aborta(`no sé expandir el ítem de teoría «${it.item}» (modo ${it.modo})`);
}
const CAP_TEORIA = aMin('09:15') - aMin('07:30');
const CAP_TARDE = 45;
/** Reparte la teoría del día en la franja de 105′ (en orden, unidades enteras) y lo que no cabe → 18:00. */
function repartir(dia) {
  const us = dia.teoria.flatMap((t) => unidades({ ...t, fecha: dia.fecha }));
  const fijas = us.filter((u) => !u.elastico), elas = us.filter((u) => u.elastico);
  const manana = [], tarde = [];
  let usado = 0;
  for (const u of us) {
    if (u.elastico) { manana.push(u); continue; }
    if (usado + u.min <= CAP_TEORIA) { manana.push(u); usado += u.min; } else tarde.push(u);
  }
  // elásticas: el tiempo que queda, repartido por duración (entre minMin y maxMin); si no llega a minMin → a las 18:00 (también elástica)
  let resto = CAP_TEORIA - usado;
  const elasM = manana.filter((u) => u.elastico);
  const sumDur = elasM.reduce((a, u) => a + u.dur, 0);
  elasM.forEach((u, i) => {
    const cuota = i === elasM.length - 1 ? resto : Math.round((CAP_TEORIA - usado) * u.dur / sumDur);
    u.min = Math.min(u.maxMin, Math.max(0, cuota));
    resto -= u.min;
  });
  for (const u of elasM.filter((x) => x.min < x.minMin)) { manana.splice(manana.indexOf(u), 1); resto += u.min; tarde.push(u); }
  const pend = tarde.reduce((a, u) => a + (u.elastico ? u.minMin : u.min), 0);
  if (pend > CAP_TARDE) aborta(`${dia.fecha}: lo que no cabe en la teoría (${pend}′) no cabe tampoco a las 18:00 (${CAP_TARDE}′)`);
  // elásticas de la tarde: lo que deje la tarde (≥ minMin)
  let restoT = CAP_TARDE - tarde.filter((u) => !u.elastico).reduce((a, u) => a + u.min, 0);
  for (const u of tarde.filter((x) => x.elastico)) { u.min = Math.min(u.maxMin, restoT); restoT -= u.min; }
  return { manana, tarde, libre: resto, fijas, elas };
}

// ── textos comunes ─────────────────────────────────────────────────────────────────────────────────────────────
const FUENTES = J._meta.banqueo_fuentes.replace(/^por orden:\s*/, '').replace(/\.?\s*El material de academias no se copia al repo ni a la app\.?$/, '');
const RESERVA = 'Reservados: el ENCAPS 2026-II real (pre-test ciego del vie 8-ene) y el 2026-I (ensayo general del jue 11-mar). Cuarentena: nada del 2026-II de ninguna carrera antes del vie 8-ene.';
const CONFIANZA = 'Confianza en cada una: segura · dudosa · adivinada (el % CIEGO = seguras ÷ total).';
const TIPOS_ERROR = 'tipo de error (concepto · cifra · lectura · confusión entre vecinos) + regla de 1 línea en el registro';
const CRITICOS = 'I-3 · V-2 · IV-1+IV-2 · I-4 · II-3 · III-5 · II-5 · II-4';
/** «sábado 14:00» (F1 y transición, con la clase en vivo) o «sáb 9-ene 07:15» (F2): la revisión semanal que recoge el registro de `iso`. */
const revSab = (iso) => { const s = addDias(iso, ((6 - dow(iso)) + 7) % 7 || 7); return s <= F6.transicion.hasta ? 'sábado 14:00' : `${corta(s)} 07:15`; };
const VIGENCIA = 'Si dos fuentes no coinciden, manda la norma más reciente del campus Theomed 2027-I / MINSA.';
const WDL = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
/** v6.07 (fix lote 1b del Calendar): de qué mañana ENCAPS son las tarjetas y los errores del arranque de `hoy` (la anterior es `prev`):
 *  «de ayer» solo si fue el día anterior · «del viernes» / «del lunes» / «del miércoles» si es la mañana ENCAPS anterior de la rotación
 *  (lun · mié · vie: hasta la v6.07 ponía «de ayer» los mié y vie, que siguen a un día de Step) · «del último día ENCAPS, mié 23-dic» si
 *  entre medias un SKIP se comió una mañana ENCAPS (lun 28-dic: el vie 25-dic es SKIP; antes decía «del viernes» y remitía al mié 23-dic). */
function prevMananaTxt(prev, hoy) {
  if (addDias(prev, 1) === hoy) return { de: 'de ayer', saltadas: [] };
  let esperada = addDias(hoy, -1); // la mañana ENCAPS anterior según la rotación (L-V sin Step), ignorando los SKIP
  while (dow(esperada) === 0 || dow(esperada) === 6 || STEP_DIAS.includes(dow(esperada))) esperada = addDias(esperada, -1);
  if (esperada === prev) return { de: `del ${WDL[dow(prev)]}`, saltadas: [] };
  const saltadas = [];
  for (let d = addDias(prev, 1); d < hoy; d = addDias(d, 1)) if (SKIP.has(d) && dow(d) >= 1 && dow(d) <= 5 && !STEP_DIAS.includes(dow(d))) saltadas.push(d);
  return { de: `del último día ENCAPS, ${corta(prev)}`, saltadas };
}
/** v6.07 (fix): la próxima sesión del Anki 05:30 de ENCAPS tras `iso` (para las ★ de las cifras de las 18:00): «mañana» · «el lunes» · «el jue 24-dic». */
const proxAnkiTxt = (iso, gaFechas) => {
  const n = gaFechas.find((d) => d > iso);
  if (!n) return null;
  return n === addDias(iso, 1) ? 'mañana a las 05:30' : dow(iso) === 5 && n === addDias(iso, 3) ? 'el lunes a las 05:30' : `el ${corta(n)} a las 05:30`;
};
// días con el Anki 05:30 de ENCAPS (L-V de F1 sin SKIP): los mismos que GA más abajo
const GA_FECHAS = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d)) GA_FECHAS.push(d); }

// ── guías de la MAÑANA ─────────────────────────────────────────────────────────────────────────────────────────
const GM = {}, GT = {}, MD = {};
for (const dia of J.mananas) {
  const lunes = dow(dia.fecha) === 1;
  const prevM = J.mananas[dia.n - 2] || null;
  const areas = [...new Set(dia.teoria.map((t) => t.area).filter((a) => AREA[a]))];
  const codigos = [...new Set(dia.teoria.flatMap((t) => t.codigos || []))];
  const tag = `ENCAPS · mañana ${dia.n}/${NM}`;
  const gs = [];
  if (dia.fase === 'cierre') {
    // mié 30-dic: SIMULACRO DE CIERRE DE AÑO 100Q / 2 h + corrección (mismas horas que el protocolo)
    const sim = (/\(([^)]*simulacro[^)]*)\)/i.exec(dia.banqueo.area) || [])[1] || 'simulacro';
    const num = (/simulacro (\d+)/i.exec(sim) || [])[1];
    const ruta = `${RUTA.drLopezSim} › ${num ? `${num}.° simulacro` : 'simulacro'} (versión SIN claves; la de claves, solo para corregir)`;
    gs.push(guia(fr('07:15', '07:30'), `${tag} · PREPARAR EL SIMULACRO`, [
      P(10, `Abrir ${sim} sin claves`, `Ruta: ${ruta}. Hoja de respuestas en papel si puedes.`),
      P(5, 'Condiciones de examen', 'Sin reloj a la vista, móvil fuera, agua. Nada abierto.'),
    ], [R99], 'el simulacro abierto y la hoja lista', { aviso: dia.extra || undefined }));
    gs.push(guia(fr('07:30', '09:30'), `${tag} · SIMULACRO DE CIERRE DE AÑO · 100Q en 2 h`, [
      P(100, 'Primera vuelta: básicas e intermedias', '72 s por pregunta. Marca las dudosas y sigue. Ninguna en blanco: no restan.'),
      P(20, 'Vuelta a las marcadas', 'Las atípicas al final. Reserva de 10-15′.'),
    ], [R99], 'las 100 respondidas en 2 h, sin parar', { planB: `Si ese PDF no abre: otro simulacro de DR LOPEZ que no hayas hecho (${RUTA.drLopezSim}).` }));
    gs.push(guia(fr('09:30', '09:45'), 'Pausa', [P(15, 'Pausa', 'De pie, agua, sin pantalla.')], [], 'pausa hecha sin pantalla'));
    gs.push(guia(fr('09:45', '11:40'), `${tag} · CORRECCIÓN DEL SIMULACRO Y REGLAS`, [
      P(10, 'Nota y % por área', 'Con la versión con claves. Nota = aciertos × 0,2. Anota el % de cada área.'),
      P(85, 'Cada error y cada dudosa', `${cap(TIPOS_ERROR)}. Mira por qué es correcta la buena, no solo la tuya.`),
      P(20, 'Verificación en la norma', `Las reglas de cifra o definición, contra la norma (definición, tabla o flujograma). ${VIGENCIA} Ruta: ${RUTA.normas}.`, L99),
    ], [R99], 'nota y % por área en el registro; cada error con su regla de 1 línea', { planB: `Si una norma no está en el campus: ${RUTA.drLopezNorm}.` }));
    gs.push(guia(fr('11:40', '12:00'), `${tag} · TARJETAS + CIERRE DEL AÑO`, [
      P(15, '5-10 tarjetas nuevas de lo que fallaste', 'Solo cifra o definición textual.'),
      P(5, 'Registro del cierre', `Nota del simulacro y errores repetidos (misma regla) en el registro: lo usa la revisión del ${revSab(dia.fecha)}.`),
    ], [], 'tarjetas creadas y la nota en el registro'));
  } else {
    const rep = repartir(dia);
    // 07:15 arranque en frío
    const primera = dia.n === 1;
    const pv = primera ? null : prevMananaTxt(prevM.fecha, dia.fecha);
    const porSkip = pv && pv.saltadas.length ? ` —${pv.saltadas.map((x) => 'el ' + corta(x)).join(' y ')} ${pv.saltadas.length > 1 ? 'fueron' : 'fue'} SKIP, sin mañana ENCAPS—` : '';
    gs.push(guia(fr('07:15', '07:30'), `${tag} · ARRANQUE EN FRÍO`, primera
      ? [
        P(15, 'Orientación en el campus (es el primer día: no hay tarjetas de ayer)', 'Cronograma en vivo y asíncrono; dónde están PPT, post-tests, Theoesenciales, glosarios y las 100 normas técnicas. Ruta: Campus › curso 99 (y el 116 de sesiones adicionales).', L99),
      ]
      : [
        P(8, `10 tarjetas ${pv.de}, de memoria`, `Las de las 11:40 del ${corta(prevM.fecha)}${porSkip}${lunes ? ' (y las del simulacro del domingo, si lo hiciste)' : ''}. Tapa la respuesta, dila en voz alta, comprueba.`),
        P(7, `Reglas de los errores ${pv.de}, sin mirar`, 'Lee solo el error en el registro y di la regla. Si no sale, márcala ★: va primero en el banqueo de hoy.'),
      ], [R99], primera ? 'sabes dónde está cada cosa del campus' : 'las 10 tarjetas dichas y las reglas repasadas (las que no salieron, con ★)', { aviso: dia.extra || undefined }));
    // 07:30 teoría
    const pasosT = rep.manana.map((u) => P(u.min, typeof u.que === 'function' ? u.que(u.min) : u.que, u.como, u.enlace));
    if (rep.libre >= 5) pasosT.push(P(rep.libre, `Theoesencial ${areas.length ? 'de ' + areas.map((a) => AREA[a]).join(' y ') : 'del área'}: los temas de hoy${codigos.length ? ` (${codigos.join(' · ')})` : ''}${dia.norma && dia.norma !== 'verificación' ? ` + la norma: ${dia.norma}` : ''}`,
      `Lectura activa: tapa cada definición y dila. Lo que no salga → tarjeta a las 11:40. Si una sesión te tomó más, este tiempo la absorbe. Ruta: ${areas.length ? RUTA.theoes(areas.map((a) => AREA[a]).join(' / ')) : RUTA.normas}.`, L99));
    else if (rep.libre > 0 && pasosT.length) pasosT[pasosT.length - 1].min += rep.libre;
    const resumenT = dia.teoria.map((t) => t.item.replace(/\s*\(.*\)$/, '')).join(' + ');
    const avisoT = rep.tarde.length ? `No cabe en 105′ → a las 18:00 de hoy: ${rep.tarde.map((u) => `${u.postTest || u.que}`).join(' + ')}.` : undefined;
    gs.push(guia(fr('07:30', '09:15'), `${tag} · TEORÍA · ${resumenT}`, pasosT, [R99, ...(dia.teoria.some((t) => /^Banqueo|^Revisión normativa/.test(t.item)) ? [R116] : [])],
      'sesiones vistas o leídas, con notas SOLO en forma de pregunta', { aviso: avisoT, planB: `Si el campus no carga: la misma sesión en ${RUTA.theoDrive}, o el Theoesencial del tema. Lo que no veas hoy va a las 18:00.` }));
    // 09:15 post-test
    const pts = rep.manana.filter((u) => u.postTest).map((u) => u.postTest);
    gs.push(guia(fr('09:15', '09:30'), pts.length ? `${tag} · POST-TEST de Theomed · ${pts.join(' · ')}` : `${tag} · RECALL de cifras y definiciones de hoy`, pts.length
      ? [P(15, `Post-test${pts.length > 1 ? 's' : ''} de ${pts.join(', ')}`, `Primer intento CIEGO, sin apuntes: es la medición. La nota va al registro.${pts.length > 1 ? ' Los que no quepan en 15′ abren el banqueo de las 09:45 (cuentan como banqueo del tema).' : ''} Ruta: el post-test está en la misma sección de la sesión.`, L99)]
      : [P(15, '10 cifras o definiciones de lo de hoy, de memoria', 'Tapa, di, comprueba. Las que fallen → tarjeta a las 11:40.')],
    [R99], pts.length ? 'nota del primer intento en el registro' : '10 cifras dichas; las falladas, anotadas', { planB: pts.length ? `Si el post-test no abre: 10Q del post-test de DR LOPEZ del área (${RUTA.drLopezPT}), también a ciegas.` : undefined }));
    // 09:30 pausa
    gs.push(guia(fr('09:30', '09:45'), 'Pausa', [P(15, 'Pausa', 'De pie, agua, sin pantalla.')], [], 'pausa hecha sin pantalla'));
    // 09:45 banqueo
    const nQ = dia.banqueo.n;
    const minQ = Math.ceil(nQ * 72 / 60);
    const finB = dia.banqueo.cronometrado && minQ > 60 ? hhmm(aMin('09:45') + minQ) : '10:45';
    if (aMin('11:40') - aMin(finB) < 30) aborta(`${dia.fecha}: el banqueo (${minQ}′) deja menos de 30′ de corrección`);
    const mezcla = /mezcla/.test(dia.banqueo.area);
    const pasosB = [P(Math.min(minQ, aMin(finB) - aMin('09:45')), `${nQ}Q de ${dia.banqueo.area}${dia.banqueo.cronometrado ? ' · EN BLOQUE CRONOMETRADO' : ''} · modo examen (72 s c/u)`,
      `Sin mirar nada. ${CONFIANZA} ${mezcla ? 'Reparto del vector v3: CI 30 · SP 27 · GES 21 · ET 13 · INV 9 (los 8 críticos primero). Fuentes: DR LOPEZ post-tests y Qx banqueo F2 de varias áreas' : `Fuentes, por orden: ${FUENTES}`}. Las reglas con ★ del arranque, primero. ${RESERVA}`)];
    const restoB = aMin(finB) - aMin('09:45') - pasosB[0].min;
    if (restoB > 0) pasosB.push(P(restoB, restoB >= 15 ? `Vuelta a las marcadas + hasta ${Math.min(40, nQ + Math.floor((restoB - 5) * 60 / 72))}Q del mismo tema si sobra` : 'Vuelta a las marcadas', restoB >= 15 ? 'Como en el examen: primero las dudosas, sin clave. Si sobra, sigue con preguntas del mismo tema (o los post-tests que no cupieron a las 09:15).' : 'Como en el examen: las dudosas al final, sin clave.'));
    gs.push(guia(fr('09:45', finB), `${tag} · BANQUEO ${nQ}Q · ${dia.banqueo.area}`, pasosB, [R99],
      `${nQ}Q respondidas con su confianza y el % ciego anotado`, { planB: 'Si una fuente no carga, pasa a la siguiente del orden. Nunca el 2026-II.', aviso: dia.banqueo.cronometrado && minQ > 60 ? `${nQ}Q × 72 s = ${minQ}′: el banqueo va de 09:45 a ${finB} y la corrección empieza a las ${finB}.` : undefined }));
    // corrección
    const minC = aMin('11:40') - aMin(finB);
    const normaHoy = normaTxt(dia);
    gs.push(guia(fr(finB, '11:40'), `${tag} · CORRECCIÓN Y REGLAS${normaHoy ? ' + NORMA' : ''}`, [
      P(minC - 20, 'Cada fallo y cada dudosa', `${cap(TIPOS_ERROR)}. Mira por qué es correcta la buena, no solo la tuya.`),
      P(20, normaHoy ? `Verificación en la norma: ${normaHoy}` : 'Verificación en la norma de cada regla nueva', `Definición de las primeras páginas, tabla o flujograma. ${VIGENCIA} Ruta: ${RUTA.normas}.`, L99),
    ], [R99], 'cada fallo con su tipo y su regla de 1 línea en el registro; las reglas verificadas en la norma', { planB: `Si la norma no está en el campus: ${RUTA.drLopezNorm}.` }));
    // 11:40 tarjetas
    gs.push(guia(fr('11:40', '12:00'), `${tag} · TARJETAS de lo que fallaste`, [
      P(15, '5-10 tarjetas nuevas', 'Solo cifra o definición textual de lo que fallaste. Nada de tarjetas de lo que ya sabes.'),
      P(5, 'Registro del día', `Nota del post-test, n y % ciego del banqueo, errores nuevos: lo usa la revisión del ${revSab(dia.fecha)}.`),
    ], [], '5-10 tarjetas creadas y el registro del día cerrado'));
    MD[dia.fecha] = { tarde: rep.tarde.map((u) => ({ min: u.min, que: typeof u.que === 'function' ? u.que(u.min) : u.que, como: u.como, postTest: u.postTest || null })) };
  }
  // continuidad 07:15 → 12:00
  let t = '07:15';
  for (const g of gs) { const p = G.partesFranja(g.franja); if (!p || p.ini !== t) aborta(`${dia.fecha}: hueco o solape antes de ${g.franja} (esperaba ${t})`); t = p.fin; }
  if (t !== '12:00') aborta(`${dia.fecha}: la mañana termina a las ${t}, no a las 12:00`);
  GM[dia.fecha] = gs;

  // ── 18:00 · ENCAPS · cifras, normas y flashcards (45′) ──
  const pend = (MD[dia.fecha] && MD[dia.fecha].tarde) || [];
  const pasosP = pend.map((u) => P(u.min, `PENDIENTE de la mañana: ${u.que}`, `${u.como}${u.postTest ? ` Al terminar, su post-test (primer intento ciego); si no cabe, abre el banqueo del ${corta((J.mananas[dia.n] || dia).fecha)}.` : ''}`, L99));
  const P_ = pasosP.reduce((a, p) => a + p.min, 0);
  const Rr = CAP_TARDE - P_;
  const cierre = dia.fase === 'cierre';
  const codTxt = codigos.length ? codigos.join(' · ') : /mezcla/.test(dia.banqueo.area) ? `los 8 críticos (${CRITICOS})` : dia.banqueo.area.replace(/(SP|CI|GES|INV|ET)/g, (x) => AREA[x]);
  const pasosR = [];
  const flash = (m) => (cierre
    ? P(m, 'Flashcards ENCAPS::Flashcards · vencidas + las tarjetas de los errores del simulacro', 'Anki. Hoy sin nuevas del temario: las tarjetas de lo que fallaste esta mañana, primero.')
    : P(m, `Flashcards ENCAPS::Flashcards · ${m >= 20 ? '30' : '15'} nuevas del tema de hoy + vencidas`, 'Anki. Las nuevas del área de hoy, en el orden del temario. Si aún no importaste el mazo de DR LOPEZ (decisión tuya), haz las nuevas de ENCAPS::Cifras.'));
  const cifras = (m) => (cierre
    ? P(m, 'Cifras de lo que fallaste en el simulacro', 'Busca cada cifra fallada en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para la transición.')
    : P(m, `Cifras y plazos de ${codTxt}`, `Las filas de esos códigos en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para ${proxAnkiTxt(dia.fecha, GA_FECHAS) || 'la próxima sesión de Anki'}.`));
  if (Rr >= 30) {
    pasosR.push(flash(Rr - 20), cifras(10));
    pasosR.push(normaTxt(dia) ? P(10, `Norma del día: ${normaTxt(dia)}`, `Una tabla o flujograma más de esa norma → tarjeta. Ruta: ${RUTA.normas}.`, L99)
      : P(10, 'Pizarra del mes (memoria visible)', 'Cifras y definiciones del mes en la pizarra: plazos de notificación, esquema de vacunas, dosis de hierro, metas de indicadores. Lo que se aprende aquí pasa a tarjeta.'));
  } else if (Rr >= 15) pasosR.push(flash(Rr - 10), cifras(10));
  else if (Rr > 0) pasosR.push(flash(Rr));
  GT[dia.fecha] = guia(fr('18:00', '18:45'), `ENCAPS · CIFRAS, NORMAS Y FLASHCARDS${pend.length ? ' (+ lo pendiente de la mañana)' : ''}`, [...pasosP, ...pasosR], [R99],
    pend.length ? 'lo pendiente de la mañana terminado y las flashcards del día hechas' : 'flashcards del día hechas y las cifras de hoy dichas en voz alta',
    { aviso: pend.length ? `Hoy la teoría no cupo entera en 07:30-09:15: lo que falta va primero (${P_}′).` : undefined });
}
function normaTxt(dia) { return dia.norma && dia.norma !== 'verificación' ? dia.norma : null; }

// ── 05:30 · repasos ENCAPS (15′) tras el Anki USMLE · todos los días de plan de F1 (L-V sin SKIP) ──────────────────
const GA = {};
const GT_FECHAS = J.mananas.map((x) => x.fecha);
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) {
  const w = dow(d); if (w < 1 || w > 5 || SKIP.has(d)) continue;
  // v6.07 (fix): las ★ de las cifras de las 18:00 (lun · mié · vie) se repasan en el PRIMER Anki 05:30 que sigue: «de ayer» solo el día
  //   siguiente a una tarde ENCAPS, «del viernes» el lunes; si ya hubo otro Anki 05:30 en medio (mié, vie, lun 28-dic), no hay ★ pendientes
  const ultT = [...GT_FECHAS].reverse().find((x) => x < d);
  const pend = ultT && !GA_FECHAS.some((x) => x > ultT && x < d);
  const deT = !pend ? null : ultT === addDias(d, -1) ? 'de ayer' : w === 1 && ultT === addDias(d, -3) ? 'del viernes' : `del ${corta(ultT)}`;
  GA[d] = guia(fr('05:30', '05:45'), 'ANKI · repasos ENCAPS 15′ (después del USMLE)', [
    P(10, deT ? `ENCAPS::Cifras · vencidas (y las ★ ${deT})` : 'ENCAPS::Cifras · vencidas', 'Responde en voz alta antes de girar. FSRS: Good / Again, nunca Hard ni Easy.'),
    P(5, 'ENCAPS::Flashcards · vencidas', 'Si aún no importaste el mazo de DR LOPEZ (decisión tuya), estos 5′ van a ENCAPS::Cifras.'),
  ], [], '0 vencidas en ENCAPS::Cifras (y en ENCAPS::Flashcards si ya existe)', { aviso: STEP_DIAS.includes(w) ? undefined : 'Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.' });
}

// ── sábado · THEOMED EN VIVO (14:45 preparar · 15:00-17:00 en vivo) ─────────────────────────────────────────────
const SAB = {}, GSP = {}, GSV = {};
for (const s of J.sabados) {
  const a = s.vivo ? AREA_DE_NOMBRE(s.vivo) : null;
  if (s.vivo && !a) aborta(`sábado ${s.fecha}: no reconozco el área de «${s.vivo}»`);
  SAB[s.fecha] = { fecha: s.fecha, vivo: s.vivo, area: a ? AREA[a] : null };
  if (!s.vivo) continue;
  GSP[s.fecha] = guia(fr('14:45', '15:00'), `ENCAPS · PREPARAR LA CLASE · ${s.vivo}`, [
    P(5, `Abre el PPT de ${s.vivo}`, `Lee títulos e índice. Ruta: ${RUTA.vivo(AREA[a])} (si ya está publicado).`, L99),
    P(7, '3 preguntas que la clase te tiene que responder', 'Escríbelas en forma de pregunta, de tus errores del área o de lo que no entiendes del PPT.'),
    P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
  ], [R99], 'PPT abierto y 3 preguntas escritas');
  GSV[s.fecha] = guia(fr('15:00', '17:00'), `THEOMED EN VIVO · ${s.vivo}`, [
    P(5, `Entrar a la clase: ${s.vivo}`, `Ruta: ${RUTA.vivo(AREA[a])}. Puntual: la asistencia cuenta.`, L99),
    P(105, 'Clase EN VIVO, participando', 'Antes de que el docente responda, responde tú. Notas SOLO en forma de pregunta. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.'),
    P(10, 'Cierre a las 17:00', 'Mira si tus 3 preguntas quedaron respondidas. Anota el minuto donde te vas: el tramo 17:00-17:30 lo ves en la grabación (a 2×, en audio en un tiempo muerto). El post-test de la clase, en cuanto lo publiquen: primer intento ciego (el domingo o al empezar el banqueo del lunes 09:45).'),
  ], [R99], 'clase seguida en vivo hasta las 17:00 y las ★ anotadas', {
    aviso: 'La clase dura hasta las 17:30: vas en vivo hasta las 17:00; el último tramo, en la grabación.',
    planB: 'Si no puedes conectarte: la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.',
  });
}

// ── domingo · ENCAPS opcional 4 h (flexible, sin hora fija; la franja 08:00-12:00 es solo un ejemplo) ───────────────
const DOM = {}, GD = {};
// v6.07d (11-nov): modos del domingo además del simulacro de 4 h (por defecto). Los domingos 6, 13 y 20-dic llevan por la mañana los SHIP que
//   la semana corrida dejó pendientes y tienen compromisos fijos por la tarde, así que su ENCAPS queda en 2 h. Por eso:
//   · «banqueos»: banqueos grabados nuevos de Theomed (curso 116), en activo, sin simulacro.
//   · «simulacro_2h»: solo el simulacro, de un tirón; la corrección va otro domingo (correccion_en).
//   · «banqueos_correccion»: banqueos + la corrección y el registro del simulacro de otro domingo (correccion_de), con una pausa en medio.
//   El generador escribe también lo que pinta la app (nombre, hora, minutos, sub, etiqueta, tema y campus), para que plantillasV6 y
//   TodayMission no repitan textos fijos («4 h»).
const mmss = (s) => { const m = /^(\d+):(\d\d)$/.exec(String(s || '')); if (!m) aborta(`duración mm:ss ilegible «${s}»`); return Number(m[1]) + (Number(m[2]) > 0 ? 1 : 0); };
const fmtMin = (n) => (n % 60 ? (n >= 60 ? `${Math.floor(n / 60)} h ${n % 60}′` : `${n}′`) : `${n / 60} h`);
const WD_LARGO = (iso) => `${WDL[dow(iso)]} ${Number(iso.slice(8))}`;
const PASO_BANQUEO = 'Pausa el vídeo en cada pregunta: léela, responde y marca tu confianza (1-3) ANTES de ver la resolución; después, la resolución completa (Palmerton). Banqueo grabado en activo = su duración.';
for (const d of J.domingos.filter((x) => x.modo && x.modo !== 'simulacro')) {
  if (!['banqueos', 'simulacro_2h', 'banqueos_correccion'].includes(d.modo)) aborta(`domingo ${d.fecha}: modo desconocido «${d.modo}»`);
  if (!Array.isArray(d.franja) || d.franja.length !== 2) aborta(`domingo ${d.fecha}: modo ${d.modo} sin franja [ini, fin]`);
  if (d.modo === 'banqueos_correccion' && (!Array.isArray(d.pausa) || d.pausa.length !== 2 || !d.correccion_de)) aborta(`domingo ${d.fecha}: banqueos_correccion sin pausa [ini, fin] o sin correccion_de`);
  if (d.modo === 'simulacro_2h' && !d.correccion_en) aborta(`domingo ${d.fecha}: simulacro_2h sin correccion_en`);
  // los dos domingos se apuntan entre sí: si se mueve uno, el otro diría una fecha falsa
  if (d.modo === 'simulacro_2h' && !J.domingos.some((x) => x.fecha === d.correccion_en && x.modo === 'banqueos_correccion' && x.correccion_de === d.fecha)) aborta(`domingo ${d.fecha}: su correccion_en (${d.correccion_en}) no es un domingo banqueos_correccion con correccion_de = ${d.fecha}`);
  if (d.modo === 'banqueos_correccion' && !J.domingos.some((x) => x.fecha === d.correccion_de && x.modo === 'simulacro_2h' && x.correccion_en === d.fecha)) aborta(`domingo ${d.fecha}: su correccion_de (${d.correccion_de}) no es un domingo simulacro_2h con correccion_en = ${d.fecha}`);
  const [ini, fin] = d.franja;
  const pasos = [];
  let titulo, hecho, aviso, planB, nombre, sub, etiqueta, tema, campus, recursos;
  const nombres = (d.banqueos || []).map((b) => b.n).join(' y ');
  if (d.modo === 'banqueos' || d.modo === 'banqueos_correccion') {
    if (!d.banqueos || !d.banqueos.length) aborta(`domingo ${d.fecha}: modo ${d.modo} sin banqueos`);
    const fin1 = d.modo === 'banqueos' ? fin : d.pausa[0];
    const durB = d.banqueos.map((b) => mmss(b.dur));
    const resto = G.minutosFranja(fr(ini, fin1)) - 5 - durB.reduce((a, x) => a + x, 0);
    if (resto < 10) aborta(`domingo ${d.fecha}: los banqueos (${durB.join(' + ')}′) no caben en ${ini}-${fin1}`);
    const tarj = Math.min(7, Math.floor(resto / 3));
    pasos.push(P(5, `Preparar: banqueos grabados ${nombres}`, `Ruta: Campus › curso 116 (SESIONES ADICIONALES GP02) › Banqueos generales – viernes › ${nombres}. Hoja para tu respuesta y tu confianza en cada pregunta; móvil fuera.`, L116));
    d.banqueos.forEach((b, i) => pasos.push(P(durB[i], `BANQUEO ${b.n} (${b.dur}) en activo`, PASO_BANQUEO)));
    pasos.push(P(resto - tarj, 'Corrección: cada fallo y cada dudosa', `${cap(TIPOS_ERROR)} + verificación en la norma.`));
    pasos.push(P(tarj, 'Tarjetas: solo lo discriminativo', 'Fallos «tontos» y detalles discriminativos, en formato pregunta → respuesta breve: cifras y plazos → ENCAPS::Cifras · conceptos → la nota del código.'));
    if (d.modo === 'banqueos_correccion') {
      const [p0, p1] = d.pausa;
      pasos.push(P(G.minutosFranja(fr(p0, p1)), `Pausa (${p0}-${p1})`, 'Fuera de la mesa: no es tiempo de estudio.'));
      const disp = G.minutosFranja(fr(p1, fin));
      if (disp !== 95) aborta(`domingo ${d.fecha}: la corrección del simulacro necesita 95′ (80 + 15) y la franja ${p1}-${fin} da ${disp}′`);
      pasos.push(P(80, `Corrección del simulacro con RANKING del ${WD_LARGO(d.correccion_de)}: cada error y cada dudosa`, `${cap(TIPOS_ERROR)} + verificación en la norma. Primero las «seguras» falladas (falsa certeza).`));
      pasos.push(P(15, 'Registro del simulacro', `% por área y errores repetidos (la nota ya la anotaste el ${WD_LARGO(d.correccion_de)}, al terminarlo). Va a la revisión del ${revSab(d.fecha)}.`));
    }
    titulo = d.modo === 'banqueos' ? `ENCAPS · DOMINGO 2 h · banqueos grabados ${nombres} de Theomed (en activo)`
      : `ENCAPS · DOMINGO · banqueos grabados ${nombres} + corrección del simulacro del ${WD_LARGO(d.correccion_de)}`;
    hecho = `banqueos ${nombres} hechos en activo (respuesta y confianza antes de cada resolución), fallos con su regla en el registro${d.modo === 'banqueos_correccion' ? ' · simulacro del ' + WD_LARGO(d.correccion_de) + ' corregido, con su % por área en el registro' : ''}`;
    aviso = `Banqueos grabados nuevos de Theomed (curso 116, publicados hasta el 11-nov): son atraso nuevo y van en activo, como todos los banqueos del plan. De ejemplo, ${ini}-${fin1}${d.modo === 'banqueos' ? '. Hoy no hay simulacro: los banqueos llenan las 2 h' : `; la corrección del simulacro, ${d.pausa[1]}-${fin}`}.`;
    planB = 'Si te quedas sin tiempo: termina el banqueo empezado y deja el otro para el siguiente hueco, nunca en pasivo ni a 2×.';
    nombre = d.modo === 'banqueos' ? `ENCAPS · domingo 2 h (flexible): banqueos grabados ${nombres} de Theomed` : `ENCAPS · domingo (flexible): banqueos ${nombres} + corrección del simulacro del ${WD_LARGO(d.correccion_de)}`;
    sub = d.modo === 'banqueos' ? 'flexible · en activo: respuesta antes de cada resolución · hoy sin simulacro' : `flexible · banqueos en activo (${ini}-${fin1}) + corrección y registro del simulacro (${d.pausa[1]}-${fin})`;
    etiqueta = d.modo === 'banqueos' ? `ENCAPS · domingo 2 h (banqueos ${nombres} de Theomed)` : `ENCAPS · domingo: banqueos ${nombres} + corrección del simulacro`;
    tema = `Theomed · banqueos grabados ${d.banqueos.map((b) => `${b.n} (${b.dur})`).join(' y ')}`;
    campus = 'adicionales';
    recursos = [R116];
  } else {
    if (!d.ranking || !/^Theomed/.test(d.simulacro || '')) aborta(`domingo ${d.fecha}: simulacro_2h solo para un simulacro de Theomed con ranking`);
    if (G.minutosFranja(fr(ini, fin)) !== 120) aborta(`domingo ${d.fecha}: simulacro_2h necesita una franja de 120′`);
    // v6.07d (2.ª revisión): la NOTA se anota hoy, al cerrar el intento (la usa la decisión que diga uso_nota: el GATE del vie 18-dic); la
    //   corrección y el % por área van el domingo de correccion_en
    const uso = d.uso_nota ? ` (la usa ${d.uso_nota})` : '';
    pasos.push(P(120, 'SIMULACRO 100Q · 2 h sin parar, de un tirón', `Localízalo antes (Campus › curso 105 (SIMULACROS MEDICINA 2027) › ${d.simulacro.replace(/^Theomed /, 'el ')}), sin empezarlo. Primero las básicas e intermedias; marca las dudosas y vuelve al final. Ninguna en blanco: no restan. 72 s por pregunta. Al cerrar el intento, anota la nota (aciertos × 0,2) en el registro${uso}, y guarda la hoja de respuestas para la corrección.`, L105));
    titulo = 'ENCAPS · DOMINGO 2 h · simulacro 100Q con RANKING (la corrección, otro domingo)';
    hecho = `simulacro hecho de un tirón en 2 h, con la NOTA (aciertos × 0,2) anotada en el registro${uso} y la hoja de respuestas guardada (la corrección, el ${WD_LARGO(d.correccion_en)})`;
    aviso = `RANKING: cuenta el primer intento dentro de 89 h desde el viernes 16:00 → hoy, de un tirón.${d.proyectado ? ' La apertura de ese viernes es una fecha PROYECTADA por la cadencia quincenal de Theomed: confírmala en el campus.' : ''} De ejemplo, ${ini}-${fin}. Hoy no cabe la corrección: va el ${WD_LARGO(d.correccion_en)}; la nota, en cambio, se anota hoy.`;
    planB = 'Si ese simulacro no está: uno antiguo del campus que no hayas hecho.';
    nombre = 'ENCAPS · opcional 2 h (flexible): simulacro 100Q · RANKING Theomed';
    sub = `de un tirón · RANKING: primer intento dentro de 89 h desde el viernes 16:00 · la corrección, el ${WD_LARGO(d.correccion_en)}`;
    etiqueta = 'ENCAPS · domingo 2 h (simulacro 100Q con RANKING)';
    tema = d.simulacro;
    campus = 'simulacros';
    recursos = [R105];
  }
  GD[d.fecha] = guia(fr(ini, fin), titulo, pasos, recursos, hecho, { aviso, planB });
  const min = pasos.filter((p) => !/^Pausa \(/.test(p.que)).reduce((a, p) => a + p.min, 0);
  const pausa = pasos.filter((p) => /^Pausa \(/.test(p.que)).reduce((a, p) => a + p.min, 0);
  // la hora del bloque cuadra con el chip de la guía (totalMin, pausa incluida) y dice cuánto es estudio
  const hora = pausa ? `flexible · ${fmtMin(min + pausa)} con ${pausa}′ de pausa (${fmtMin(min)} de estudio)` : `flexible · ${fmtMin(min)}`;
  DOM[d.fecha] = { fecha: d.fecha, simulacro: d.simulacro || null, ranking: !!d.ranking, modo: d.modo, nombre, hora, min, sub, etiqueta, tema, campus };
}
for (const d of J.domingos.filter((x) => !x.modo || x.modo === 'simulacro')) {
  if (!d.simulacro) aborta(`domingo ${d.fecha}: modo simulacro sin «simulacro»`);
  DOM[d.fecha] = { fecha: d.fecha, simulacro: d.simulacro, ranking: !!d.ranking, modo: 'simulacro',
    nombre: `ENCAPS · opcional 4 h (flexible): simulacro 100Q + corrección${d.ranking ? ' · RANKING Theomed' : ''}`, hora: 'flexible · 4 h', min: 240,
    sub: `opcional y flexible · 2 h de simulacro + 2 h de corrección${d.ranking ? ' · RANKING: primer intento dentro de 89 h desde el viernes 16:00' : ''}`,
    etiqueta: 'ENCAPS · domingo opcional 4 h (simulacro 100Q)', tema: d.simulacro, campus: /^Theomed/.test(d.simulacro) ? 'simulacros' : null };
  const theomed = /^Theomed/.test(d.simulacro);
  const num = (/DR LOPEZ simulacro (\d+)/.exec(d.simulacro) || [])[1];
  const ruta = theomed ? 'Campus › curso 105 (SIMULACROS MEDICINA 2027) › el simulacro indicado' : `${RUTA.drLopezSim} › ${num ? `${num}.° simulacro` : 'simulacro'} (versión SIN claves; la de claves, solo para corregir)`;
  GD[d.fecha] = guia(fr('08:00', '12:00'), `ENCAPS · OPCIONAL 4 h (sin hora fija) · simulacro 100Q + corrección`, [
    P(10, `Preparar: ${d.simulacro}`, `Ruta: ${ruta}. Sin reloj a la vista, móvil fuera, hoja de respuestas si puedes.`, theomed ? L105 : undefined),
    P(120, 'SIMULACRO 100Q · 2 h sin parar', 'Primero las básicas e intermedias; marca las dudosas y vuelve al final. Ninguna en blanco: no restan. 72 s por pregunta, con 10-15′ de reserva.'),
    P(15, 'Pausa', 'De pie, agua, sin pantalla.'),
    P(80, 'Corrección: cada error y cada dudosa', `${cap(TIPOS_ERROR)} + verificación en la norma.`),
    P(15, 'Registro', `Nota (aciertos × 0,2), % por área y errores repetidos. Va a la revisión del ${revSab(d.fecha)}.`),
  ], theomed ? [R105] : [], 'simulacro hecho en 2 h y corregido, con la nota en el registro (o descanso: es opcional)', {
    aviso: `Opcional y flexible: a la hora que puedas (08:00-12:00 es solo un ejemplo). Si vas atrasado, usa estas horas para lo pendiente de la semana.${d.ranking ? ' RANKING: cuenta el primer intento dentro de 89 h desde el viernes 16:00 → hoy, de un tirón.' : ''}`,
    planB: theomed ? `Si ese simulacro no está: uno antiguo del campus que no hayas hecho, o uno de DR LOPEZ (${RUTA.drLopezSim}).` : 'Si prefieres descansar antes de la intensiva, descansa: es opcional.',
  });
}

// ── validación de todas las guías ─────────────────────────────────────────────────────────────────────────────
const TODAS = [...Object.entries(GM).flatMap(([f, gs]) => gs.map((g) => [f, g])), ...Object.entries(GT), ...Object.entries(GA), ...Object.entries(GSP), ...Object.entries(GSV), ...Object.entries(GD)];
const ERR = [];
for (const [f, g] of TODAS) {
  for (const e of G.validarGuia(g)) ERR.push(`${f} ${g.franja} «${g.titulo.slice(0, 50)}»: ${e}`);
  const urls = [...g.pasos.filter((p) => p.enlace).map((p) => p.enlace.url), ...g.recursos.map((r) => r.url)];
  for (const u of urls) if (!/^https:\/\/campus\.academiatheomed\.com\//.test(u)) ERR.push(`${f} ${g.franja}: enlace fuera del campus de Theomed (${u})`);
  if (/drive\.google|docs\.google/.test(JSON.stringify(g))) ERR.push(`${f} ${g.franja}: enlace de Google Drive`);
}
if (ERR.length) aborta(`${ERR.length} error(es) de forma:\n  ` + ERR.slice(0, 40).join('\n  '));

// ── emisión ───────────────────────────────────────────────────────────────────────────────────────────────────
const RESUMEN = {};
for (const dia of J.mananas) {
  const t = dia.teoria.length ? dia.teoria.map((x) => x.item.replace(/\s*\(.*\)$/, '')).join(' + ') : dia.banqueo.area.replace(/\s*\+ corrección$/, '');
  RESUMEN[dia.fecha] = `${t} · ${dia.fase === 'cierre' ? 'simulacro 100Q' : `banqueo ${dia.banqueo.n}Q ${dia.banqueo.area}`}`;
}
const M = Object.fromEntries(J.mananas.map((d) => [d.fecha, { fecha: d.fecha, n: d.n, de: NM, fase: d.fase, teoria: d.teoria, banqueo: d.banqueo, norma: d.norma, extra: d.extra, resumen: RESUMEN[d.fecha], pendiente18: (MD[d.fecha] && MD[d.fecha].tarde.map((u) => u.postTest || u.que)) || [] }]));
const META = {
  version: J._meta.version, decidido: J._meta.decidido, fechas: F6.version, fuente: J._meta.fuente, mananas: NM,
  primera: J.mananas[0].fecha, ultima: J.mananas[NM - 1].fecha, protocolo: J._meta.protocolo_manana, campus: CAMPUS,
  reglas: 'vídeo ÷ 1,75 (÷ 2 si la mañana dice «2×») · texto primero ÷ 3 (+1′/página de PDF) · banqueo grabado activo = su duración · normas / hoja de reglas = su duración · clase en diferido elástica (20′ → mitad de la clase; el resto en audio) · lo que no cabe en 07:30-09:15 → 18:00 del mismo día',
};
const tabla = new Map();
const walk = (v) => { if (typeof v === 'string') { if (v.length >= 30) tabla.set(v, (tabla.get(v) || 0) + 1); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
const GUIAS = { GM, GT, GA, GSP, GSV, GD };
walk(GUIAS);
const T = [...tabla].filter(([, n]) => n >= 2).map(([s]) => s);
const idx = new Map(T.map((s, i) => [s, i]));
const rep = (v) => (typeof v === 'string' ? (idx.has(v) ? { $: idx.get(v) } : v) : Array.isArray(v) ? v.map(rep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rep(x)])) : v);

const ts = `/**
 * encapsManana.ts — v6.07 · MAÑANAS ENCAPS de F1 (lun · mié · vie 07:15-12:00, ${NM} mañanas: ${corta(META.primera)} → ${corta(META.ultima)}) + su hora de las 18:00
 * («cifras, normas y flashcards») + los 15′ de repasos ENCAPS del Anki 05:00 (05:30-05:45, todos los días de plan de F1) + la clase EN VIVO de
 * Theomed del sábado (14:45 preparar · 15:00-17:00 en vivo) + el ENCAPS OPCIONAL del domingo (4 h, flexible: la franja 08:00-12:00 de su guía
 * es solo un ejemplo). Formato común «qué · cuánto · cómo» (GuiaBloque, src/lib/guia.ts). Lo pintan el Home (TodayMission, bloques encaps-am ·
 * encaps-pm · theomed-prep · theomed-vivo · encaps-dom de plantillasV6) y el bloque Anki de las 05:00.
 * GENERADO por DATA/_scripts/gen_encaps_manana.js desde DATA/ENCAPS/_encaps_manana_v607.json (+ duración exacta de cada sesión asíncrona:
 * DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md §1.3) — NO editar a mano: node DATA/_scripts/gen_encaps_manana.js (· --check compara).
 * Plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md §3-§7. Fechas: _fechas_v6.json ${F6.version} (las mañanas = días de F1 sin Step 1).
 * Reglas del «cuánto»: ${META.reglas}.
 * Enlaces SOLO al campus de Theomed (cursos 99, 105, 116); el material de academias del Drive se nombra por su ruta, sin enlace.
 */
import type { GuiaBloque } from './guia';

export interface EncapsTeoria { item: string; area: string; duracion: string; modo: string; velocidad?: string; codigos?: string[] }
export interface EncapsMananaDia {
  fecha: string; n: number; de: number; fase: 'recuperacion' | 'ciclo' | 'cierre'; teoria: EncapsTeoria[];
  banqueo: { area: string; n: number; cronometrado?: boolean }; norma: string | null; extra: string | null;
  /** texto corto para el Home: teoría + banqueo */
  resumen: string;
  /** lo que no cupo en 07:30-09:15 y va a las 18:00 del mismo día */
  pendiente18: string[];
}
export interface TheomedSabado { fecha: string; vivo: string | null; area: string | null }
/** v6.07d: modo del domingo + lo que pinta la app (nombre, hora y minutos del bloque, sub, etiqueta del briefing, tema y botón del campus). */
export interface EncapsDomingo {
  fecha: string; simulacro: string | null; ranking: boolean;
  modo: 'simulacro' | 'banqueos' | 'simulacro_2h' | 'banqueos_correccion';
  nombre: string; hora: string; min: number; sub: string; etiqueta: string; tema: string; campus: 'simulacros' | 'adicionales' | null;
}

export const ENCAPS_MANANA_META = ${JSON.stringify(META, null, 2)};

const M: Record<string, EncapsMananaDia> = ${JSON.stringify(M)};
const SAB: Record<string, TheomedSabado> = ${JSON.stringify(SAB)};
const DOM: Record<string, EncapsDomingo> = ${JSON.stringify(DOM)};

// Tabla de textos repetidos: un {"$": i} en RAW es T[i]. Se decodifica una vez al cargar.
const T: string[] = ${JSON.stringify(T)};
const RAW: unknown = ${JSON.stringify(rep(GUIAS))};
const dec = (v: unknown): unknown => {
  if (Array.isArray(v)) return v.map(dec);
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    const ks = Object.keys(o);
    if (ks.length === 1 && ks[0] === '$' && typeof o.$ === 'number') return T[o.$];
    return Object.fromEntries(ks.map((k) => [k, dec(o[k])]));
  }
  return v;
};
const GU = dec(RAW) as {
  GM: Record<string, GuiaBloque[]>; GT: Record<string, GuiaBloque>; GA: Record<string, GuiaBloque>;
  GSP: Record<string, GuiaBloque>; GSV: Record<string, GuiaBloque>; GD: Record<string, GuiaBloque>;
};

const k = (iso: string): string => iso.slice(0, 10);
/** Mañana ENCAPS de F1 (lun · mié · vie) · null si ese día la mañana es del Step 1 o no hay plan. */
export function encapsMananaDe(iso: string): EncapsMananaDia | null { return M[k(iso)] ?? null; }
/** Las 7 franjas de la mañana ENCAPS (07:15-12:00; el mié 30-dic, simulacro de cierre) · [] si no hay. */
export function guiaEncapsMananaDe(iso: string): GuiaBloque[] { return GU.GM[k(iso)] ?? []; }
/** 18:00-18:45 «ENCAPS · cifras, normas y flashcards» (con lo pendiente de la mañana si lo hay). */
export function guiaEncapsTardeDe(iso: string): GuiaBloque | null { return GU.GT[k(iso)] ?? null; }
/** 05:30-05:45 · repasos ENCAPS (ENCAPS::Cifras + ENCAPS::Flashcards) tras el Anki USMLE, todos los días de plan de F1. */
export function guiaEncapsAnkiDe(iso: string): GuiaBloque | null { return GU.GA[k(iso)] ?? null; }
/** Sábado de F1 + transición: la clase EN VIVO de Theomed (vivo = null → ese sábado no hay clase) · null fuera de ese rango. */
export function theomedSabadoDe(iso: string): TheomedSabado | null { return SAB[k(iso)] ?? null; }
/** 14:45-15:00 · preparar la clase en vivo del sábado. */
export function guiaTheomedPrepDe(iso: string): GuiaBloque | null { return GU.GSP[k(iso)] ?? null; }
/** 15:00-17:00 · THEOMED EN VIVO. */
export function guiaTheomedVivoDe(iso: string): GuiaBloque | null { return GU.GSV[k(iso)] ?? null; }
/** Domingo de F1 + transición: el simulacro del ENCAPS opcional (4 h, flexible). */
export function encapsDomingoDe(iso: string): EncapsDomingo | null { return DOM[k(iso)] ?? null; }
/** Guía del ENCAPS opcional del domingo (sin hora fija: la franja 08:00-12:00 es solo un ejemplo). */
export function guiaEncapsDomingoDe(iso: string): GuiaBloque | null { return GU.GD[k(iso)] ?? null; }
export const ENCAPS_MANANA_FECHAS: string[] = Object.keys(M);

/** Mínimo de cada bloque ENCAPS nuevo según el modo del día (PROTOCOLO_MODO_MINIMO; null = intacto). La mañana ENCAPS es el bloque
 *  PRINCIPAL de lun · mié · vie: en ÁMBAR va entera; en ROJO conserva su mínimo y la teoría se recupera el domingo (ENCAPS opcional). */
export const ENCAPS_MINIMO: Record<string, { AMBAR: string | null; ROJO: string | null }> = {
  'encaps-am': { AMBAR: null, ROJO: 'Solo el arranque en frío (07:15) + 10Q ciegas del tema de hoy. El resto = dormir/recuperar; la teoría de hoy va al domingo (ENCAPS opcional).' },
  'encaps-pm': { AMBAR: "15': solo las flashcards (vencidas + 15 nuevas).", ROJO: 'Omitido hoy.' },
  'theomed-prep': { AMBAR: 'Omitido hoy: entra directo a la clase.', ROJO: 'Omitido hoy.' },
  'theomed-vivo': { AMBAR: null, ROJO: 'En vivo, omitida: la grabación cuando te recuperes (domingo o en audio).' },
};
`;

if (INFORME) {
  for (const g of [...(GA[INFORME] ? [GA[INFORME]] : []), ...(GM[INFORME] || []), ...(GT[INFORME] ? [GT[INFORME]] : []), ...(GSP[INFORME] ? [GSP[INFORME]] : []), ...(GSV[INFORME] ? [GSV[INFORME]] : []), ...(GD[INFORME] ? [GD[INFORME]] : [])]) {
    console.log(`\n${g.franja} (${g.totalMin}′) · ${g.titulo}${g.aviso ? `\n  ⚠ ${g.aviso}` : ''}`);
    for (const p of g.pasos) console.log(`  ${String(p.min).padStart(3)}′ ${p.que}\n        ${p.como}`);
  }
}
const resumen = `${NM} mañanas (${Object.values(GM).reduce((a, g) => a + g.length, 0)} franjas) · ${Object.keys(GT).length} tardes 18:00 (${Object.values(MD).filter((x) => x.tarde.length).length} con pendiente de la mañana) · ${Object.keys(GA).length} Anki 05:30 · ${Object.keys(GSV).length} sábados en vivo · ${Object.keys(GD).length} domingos`;
if (AVISOS.length) console.warn(`⚠ ${AVISOS.length} aviso(s):\n  ` + AVISOS.join('\n  '));
if (CHECK) {
  const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (actual !== ts) { console.error(`✗ src/lib/encapsManana.ts no coincide con lo que genera gen_encaps_manana.js (${resumen}) — regenera: node DATA/_scripts/gen_encaps_manana.js`); process.exit(1); }
  console.log(`✓ gen_encaps_manana --check: src/lib/encapsManana.ts al día · ${resumen} · validarGuia OK · enlaces solo del campus`);
} else {
  fs.writeFileSync(OUT, ts);
  console.log(`✓ escrito src/lib/encapsManana.ts · ${resumen}`);
}
