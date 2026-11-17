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
 * v6.08 (fix revisión 14-nov): (dia1) la cadena de ★ de ENCAPS::Cifras salta los días en que la guía USMLE del Anki pasa de las 05:30 (el Home
 * oculta ahí el 05:30 de ENCAPS; se lee de src/lib/usmleGuia.ts → correr DESPUÉS de gen_usmle_guia.js) y, sin Anki 05:30 de F1 después, va al
 * Anki 05:00 de la intensiva · (dia9) el arranque del lunes nombra los banqueos grabados del domingo si ese domingo no hubo simulacro ·
 * (dia10) revisión normativa N°2 (ITS) en la mañana 18 · (est6) los sábados de F2 (9-ene → 6-mar) con la clase EN VIVO de Theomed (JSON sabados).
 * v6.09 (16-nov-2026, «hoy no avancé, todo empieza mañana; el sábado 21 y el domingo 22 viajo»): D1 = mar 17-nov y el jue 31-dic deja de ser SKIP.
 *   Las mañanas corren UNA ranura (n1 mié 18-nov … n16 mié 23-dic, n17 DOM 27-DIC, n18 lun 28, n19 mié 30, n20 jue 31, n21 mar 5-ene); el JSON separa en
 *   `extra` el contenido de la mañana (viaja con la n) y las notas atadas a la fecha (clases en vivo de esa noche → la mañana que las recoge). Código:
 *   (1) un día extra puede ser un L-V HÁBIL de la transición (jue 31-dic, ya no SKIP) y todo hábil de la transición tiene que serlo; (2) DOMINGOS DE PLAN
 *   (_meta.domingos_plan: dom 27-dic) → M[fecha].domingoPlan, sus 18:00 flexibles (ejemplo 20:00-20:45: a las 17:00 está el baile) y el arranque sin
 *   «las del simulacro del domingo»; (3) fines de semana SIN SESIÓN (corrida_s1.sin_sesion: sáb 21 y dom 22-nov) siguen en el JSON (sábado con
 *   `sin_sesion` + `diferido`; domingo modo 'sin_sesion') sin guías ni índice; la revisión del sábado salta un sábado sin sesión («sáb 28-nov 14:00»);
 *   (4) el Anki 05:30 también el jue 31-dic, y hasta la 1.ª mañana ENCAPS incluida (mar 17 y mié 18) SIN repasos: aún no hay tarjetas (los 15′ se dicen).
 * v6.09 (fix revisión adversarial 16-nov): (joseph 1) antes del D2 del Step 1 (usmleStep1Daily.diaPorD(2); jue 19-nov) el mazo USMLE está vacío → los 10′
 *   del Anki 05:30 son libres (antes «10′ más de vencidas USMLE»); la 1.ª mañana no cita reglas ★ del arranque y su 18:00 dice «(aún no hay vencidas)» ·
 *   (joseph 3) DOMINGO DE PLAN con hora propia (_meta.domingos_plan: manana · tarde · compromiso; dom 27-dic 06:00-10:45 + cifras 10:45-11:30 a hora fija):
 *   las 7 franjas y las horas del protocolo de sus textos se desplazan en bloque (desfManana) y la mañana siguiente cita la hora real de sus tarjetas
 *   («las de las 10:25 del dom 27-dic»; fix 2: 10:10) · (joseph 4) RECUPERACIÓN FIJA de un domingo (domingos[].recupera; dom 29-nov 06:30-08:00 → fix 2: 07:15-08:45; grabación de la ET 2/3 +
 *   los PPT en diferido que las notas mandan a ese domingo) → encapsRecuperaDe / guiaEncapsRecuperaDe (bloque encaps-rec de plantillasV6); el ENCAPS
 *   opcional de ese domingo, de ejemplo en franja_ejemplo (08:15-12:15, antes del compromiso de las 12:30).
 * v6.09 (fix 2, lun 16-nov noche · la rutina de la mañana 05:45-07:15 —caminata, ducha y desayuno— NO se toca ningún día): (a) el DOMINGO DE PLAN va en
 *   TRAMOS (_meta.domingos_plan[].manana = [[ini, fin], …], Σ = 285′; dom 27-dic: 04:15-05:45 + 07:15-10:30, cifras 10:30-11:15): las 7 franjas del protocolo
 *   se reparten por los tramos (protocoloAReal) y la franja que cae en el corte se parte en dos guías («1.ª parte» / «2.ª parte», pasos partidos por minutos;
 *   solo puede caer dentro de la TEORÍA o en el borde de una franja); ningún tramo puede pisar 05:45-07:15 · M[fecha].domingoPlanHoras.manana = los tramos y
 *   .que = qué lleva cada uno (un bloque del Home por tramo: encaps-am + encaps-am2; guiaEncapsMananaEnRango) · (b) la RECUPERACIÓN FIJA del dom 29-nov pasa a
 *   07:15-08:45 (antes 06:30-08:00, encima de la ducha y el desayuno) y el simulacro opcional de ese domingo, de ejemplo 08:45-12:15: un franja_ejemplo de
 *   3 h 30-4 h recorta solo la corrección (80′ → 50′; lo que no se corrija, a la revisión del sábado) y el bloque dice su duración real.
 * v6.09 (mar 17-nov · orden de Joseph: «el 22 a partir de las 2 de la tarde se puede hacer»): DOMINGO DE LLEGADA = un domingo SIN SESIÓN (sigue en
 *   corrida_s1.sin_sesion: los planes secundarios no tienen nada) con `llegada` (hora) + `recupera` → la RECUPERACIÓN FIJA del viaje va ese día, después de
 *   la llegada (dom 22-nov 15:00-16:30; hasta ahora dom 29 07:15-08:45) y nunca después de las 17:00. Solo lleva los PPT de clases ANTERIORES a ese domingo
 *   (el de SP 2/11, clase del lun 23, va el dom 29 como PRIMER PASO de su ENCAPS del domingo: domingos[].ppt = { min, clases, motivo }; no opcional; sus
 *   minutos salen de la corrección del simulacro, 80′ → 75′). La grabación de la recuperación respeta la regla elástica (20′ → mitad de la clase) y, con
 *   los PPT, llena la franja exacta (Σ pasos = franja: validarGuia). ENCAPS_MINIMO de encaps-rec dice los minutos reales de sus PPT.
 * v6.09b (mar 17-nov · auditoría tiempo ↔ material; Joseph: «no puede haber poco tiempo con mucho material ni mucho tiempo con poco material»): cada paso
 *   con minutos lleva material medido que cabe (ratio 0,85-1,15 con las reglas de la auditoría). Reglas en _meta.reglas_tiempo del JSON (ver «unidades de
 *   teoría»): vídeo y banqueo grabado ×1,2 (pausas) · banqueo grabado a 1,25× · clase en diferido = 60 % a 2× fijo (si no llega, `min` + el resto EN AUDIO,
 *   explícito) · PPT 10′ (9′ en la recuperación del dom 22 para que sume 90′) · Theoesencial = páginas × 1′ (ítems «theoesencial»; control: las páginas de
 *   las sesiones en vídeo = mañanas + _meta.theoesencial.fuera_f1 con fecha en F2) · PDF 2′/p · corrección = 0,85′/Q (ya no se acorta: si no cabe, ABORTA;
 *   mar 5-ene 60Q → 50Q y sus 10Q, el lun 28-dic 18:00: tarde_extra) · lo que sobra (≥ 5′) = la norma del día · el texto dice los minutos finales.
 *   Anki 05:00 (contrato con el lote USMLE): repasos ENCAPS 05:20-05:45 (25′) lun · mié · vie y jue 31-dic, 05:30-05:45 (15′) mar · jue. Domingos: los
 *   primeros pasos NO opcionales (PPT; banqueo previo del dom 3-ene, el 9/19 que no cabía el jue 31-dic) alargan el bloque y la corrección del simulacro
 *   dice cuántas preguntas corrige; dom 22 (llegada) con plan B con fecha (CI 2/8 ↔ ET 2/3 a las 18:00 del vie 27-nov) y sin Anki.
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
const N_SES = { SP: 8, CI: 8, GES: 7, INV: 3, ET: 3 };
// v6.09b (a1-6): páginas del Theoesencial por área (THEOMED_Y_DRIVE §1.3, columna «Theoesenciales»: SP 127 · CI 135 · ET 22 · INV 48 · GES 40)
const THEO_P_AREA = {};
{
  const NOM = { 'Salud Pública': 'SP', 'Cuidado Integral': 'CI', 'Ética e Intercult.': 'ET', 'Investigación': 'INV', 'Gestión': 'GES' };
  for (const line of fs.readFileSync(THEO, 'utf8').split(/\r?\n/)) {
    const c = line.split('|').map((x) => x.trim());
    if (c.length >= 8 && NOM[c[1]]) { const m = /^(\d+) p$/.exec(c[6]); if (m) THEO_P_AREA[NOM[c[1]]] = Number(m[1]); }
  }
  for (const a of Object.keys(N_SES)) if (!THEO_P_AREA[a]) aborta(`THEOMED_Y_DRIVE.md §1.3: faltan las páginas del Theoesencial de ${a}`);
}
const segTxt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ── controles de fechas (las mañanas, sábados y domingos salen de _fechas_v6.json) ──────────────────────────────
const SKIP = new Set(F6.skip);
const STEP_DIAS = F6.step1.f1_dias_semana || [1, 2, 3, 4, 5];
const ESPERADAS = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d) && !STEP_DIAS.includes(w)) ESPERADAS.push(d); }
// v6.08 (14-nov-2026): DÍAS EXTRA de mañana ENCAPS fuera de F1 (_meta.dias_extra del JSON, con su motivo). Con D1 el lun 16-nov caben 19 mañanas
//   en F1 (antes 22): el SIMULACRO DE CIERRE se queda anclado al mié 30-dic y las 3 que no caben van CON FECHA a (1) el jue 31-dic, día extra SOLO
//   ENCAPS (sigue siendo SKIP para el Step 1 y los planes secundarios) y (2) el mar 5-ene, en lugar del calentamiento I-3 de la intensiva. Solo se
//   admite un día extra L-V posterior a F1 que sea SKIP dentro de la transición o un día de la semana 1 de la intensiva anterior al pre-test.
const EXTRA = new Map((J._meta.dias_extra || []).map((x) => [x.fecha, x.motivo]));
// v6.09 (16-nov-2026): el jue 31-dic deja de ser SKIP (recupera el lun 16, que no se estudió) → es un día HÁBIL de la transición: un día extra puede
//   ser también un L-V de la transición que NO es SKIP (día de plan completo: mañana ENCAPS + 16:15 + secundarios; el Step 1 ya está en pausa). Todo
//   L-V hábil de la transición tiene que ser día extra (si no, ese día de plan se quedaría sin su mañana ENCAPS).
const SIN_SESION = new Set((F6.corrida_s1 && F6.corrida_s1.sin_sesion) || []);
const HAB_TRANS = [];
for (let d = F6.transicion.desde; d <= F6.transicion.hasta; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d)) HAB_TRANS.push(d); }
for (const [f, motivo] of EXTRA) {
  const w = dow(f);
  if (!/^20\d\d-\d\d-\d\d$/.test(f) || w < 1 || w > 5 || f <= F6.f1.fin) aborta(`_meta.dias_extra ${f}: debe ser un L-V posterior a F1 (${F6.f1.fin})`);
  const enTransicion = f >= F6.transicion.desde && f <= F6.transicion.hasta; // v6.08: solo un SKIP · v6.09: SKIP o hábil de la transición
  const enS1 = f > F6.encaps.intensiva_desde && f < F6.encaps.pretest;
  if (!enTransicion && !enS1) aborta(`_meta.dias_extra ${f}: solo vale un día de la transición (${F6.transicion.desde} → ${F6.transicion.hasta}) o un día de la semana 1 de la intensiva entre el ${F6.encaps.intensiva_desde} y el pre-test del ${F6.encaps.pretest}`);
  if (!motivo) aborta(`_meta.dias_extra ${f}: sin motivo`);
  ESPERADAS.push(f);
}
for (const d of HAB_TRANS) if (!EXTRA.has(d)) aborta(`${d} es un L-V hábil de la transición (no es SKIP en _fechas_v6.json ${F6.version}) y no está en _meta.dias_extra: ese día de plan se quedaría sin su mañana ENCAPS`);
// v6.09 (16-nov-2026): DOMINGOS DE PLAN (_meta.domingos_plan, con su motivo): una mañana ENCAPS de F1 que ya no cabe entre semana va un domingo de F1
//   (v6.09: dom 27-dic, mañana 17/21; obligatoria, 07:15-12:00 con su protocolo; sus «cifras, normas y flashcards» de las 18:00 son FLEXIBLES ese día
//   porque a las 17:00 está el baile). No puede ser un domingo sin sesión (corrida_s1.sin_sesion).
const DOM_PLAN = new Map((J._meta.domingos_plan || []).map((x) => [x.fecha, x.motivo]));
// v6.09 (fix revisión 16-nov, joseph 3): el domingo de plan va a HORA FIJA y se puede cumplir con el horario real del domingo (baile 17:00-20:00,
//   compromiso personal a mediodía): `manana` [ini, fin] = las 7 franjas del protocolo desplazadas (dom 27-dic: 06:00-10:45, 75′ antes) · `tarde`
//   [ini, fin] = sus cifras, normas y flashcards (45′) a hora FIJA al terminar la mañana (10:45-11:30; antes flexibles, de ejemplo 20:00-20:45, después
//   del baile) · `compromiso` = hora del compromiso personal de ese día (el margen se dice en el aviso). Sin `manana`, el protocolo de siempre (07:15-12:00).
// v6.09 (fix 2, 16-nov noche): `manana` = lista de TRAMOS [[ini, fin], …] (Σ = 285′, las 7 franjas del protocolo repartidas en orden; dom 27-dic:
//   04:15-05:45 + 07:15-10:30) para que el domingo de plan empiece a las 04:15 como entre semana y no pise la rutina de la mañana (05:45-07:15).
const PROT_INI = '07:15', PROT_FIN = '12:00', PROT_MIN = aMin(PROT_FIN) - aMin(PROT_INI);
const RUTINA_AM = ['05:45', '07:15']; // caminata · ducha · desayuno, todos los días: no se toca
const DOM_PLAN_H = new Map((J._meta.domingos_plan || []).filter((x) => x.manana).map((x) => [x.fecha, { manana: x.manana, tarde: x.tarde, compromiso: x.compromiso || null }]));
for (const [f, motivo] of DOM_PLAN) {
  if (!/^20\d\d-\d\d-\d\d$/.test(f) || dow(f) !== 0 || f < F6.f1.inicio || f > F6.f1.fin) aborta(`_meta.domingos_plan ${f}: debe ser un domingo de F1 (${F6.f1.inicio} → ${F6.f1.fin})`);
  if (SIN_SESION.has(f) || SKIP.has(f)) aborta(`_meta.domingos_plan ${f}: es un día sin sesión (corrida_s1.sin_sesion o SKIP)`);
  if (!motivo) aborta(`_meta.domingos_plan ${f}: sin motivo`);
  const h = DOM_PLAN_H.get(f);
  if (h) {
    const ok = (x) => Array.isArray(x) && x.length === 2 && x.every((t) => /^\d\d:\d\d$/.test(t)) && aMin(x[1]) > aMin(x[0]);
    if (!Array.isArray(h.manana) || !h.manana.length || h.manana.length > 2 || !h.manana.every(ok)) aborta(`_meta.domingos_plan ${f}: «manana» debe ser una lista de 1 o 2 tramos [ini, fin]`);
    for (let i = 1; i < h.manana.length; i++) if (aMin(h.manana[i][0]) < aMin(h.manana[i - 1][1])) aborta(`_meta.domingos_plan ${f}: los tramos de la mañana se solapan o no van en orden`);
    const suma = h.manana.reduce((a, t) => a + aMin(t[1]) - aMin(t[0]), 0);
    if (suma !== PROT_MIN) aborta(`_meta.domingos_plan ${f}: los tramos de la mañana suman ${suma}′ y deben sumar ${PROT_MIN}′ (las 7 franjas del protocolo)`);
    for (const t of h.manana) {
      if (aMin(t[0]) < aMin('04:15')) aborta(`_meta.domingos_plan ${f}: el tramo ${t.join('-')} empieza antes de las 04:15`);
      if (aMin(t[0]) < aMin(RUTINA_AM[1]) && aMin(RUTINA_AM[0]) < aMin(t[1])) aborta(`_meta.domingos_plan ${f}: el tramo ${t.join('-')} pisa la rutina de la mañana (${RUTINA_AM.join('-')}: caminata, ducha y desayuno; no se toca)`);
    }
    const finM = h.manana[h.manana.length - 1][1];
    if (!ok(h.tarde) || aMin(h.tarde[1]) - aMin(h.tarde[0]) !== 45 || aMin(h.tarde[0]) < aMin(finM)) aborta(`_meta.domingos_plan ${f}: «tarde» debe ser [ini, fin] de 45′ después de la mañana`);
    if (h.compromiso && (!/^\d\d:\d\d$/.test(h.compromiso) || aMin(h.compromiso) < aMin(h.tarde[1]))) aborta(`_meta.domingos_plan ${f}: «compromiso» ${h.compromiso} antes del fin de las cifras (${h.tarde[1]})`);
    if (aMin(h.tarde[1]) > aMin('17:00')) aborta(`_meta.domingos_plan ${f}: las cifras terminan después de las 17:00 (domingo: estudio solo antes del baile)`);
  }
  ESPERADAS.push(f);
}
/** v6.09 (fix 2): tramos reales de la mañana ENCAPS de `iso` ([[07:15, 12:00]] salvo domingo de plan con hora propia). */
const tramosManana = (iso) => { const h = DOM_PLAN_H.get(iso); return h ? h.manana : [[PROT_INI, PROT_FIN]]; };
/** v6.09 (fix 2): hora REAL de una hora del protocolo (07:15-12:00) en la mañana de `iso`, recorriendo sus tramos en orden. En el corte entre dos tramos,
 *  `lado` = 'ini' (algo que EMPIEZA ahí: el tramo siguiente) o 'fin' (algo que TERMINA ahí: el tramo anterior). Dom 27-dic: 07:15 → 04:15 · 08:45 → 05:45
 *  (fin) / 07:15 (ini) · 11:40 → 10:10 · 12:00 → 10:30. Sin tramos propios, la misma hora. */
function protocoloAReal(iso, h, lado = 'ini') {
  let o = aMin(h) - aMin(PROT_INI);
  const ts = tramosManana(iso);
  for (let i = 0; i < ts.length; i++) {
    const len = aMin(ts[i][1]) - aMin(ts[i][0]);
    if (o < len || (o === len && (lado === 'fin' || i === ts.length - 1))) return hhmm(aMin(ts[i][0]) + o);
    o -= len;
  }
  return h;
}
/** hora real de una hora del protocolo («11:40») en la mañana de `iso` (dom 27-dic: 10:10). */
const horaProt = (iso, h) => protocoloAReal(iso, h, 'ini');
ESPERADAS.sort();
const esDomPlan = (iso) => DOM_PLAN.has(iso);
const SAB_ESP = [], DOM_ESP = [];
for (let d = F6.f1.inicio; d <= F6.transicion.hasta; d = addDias(d, 1)) { if (dow(d) === 6) SAB_ESP.push(d); if (dow(d) === 0) DOM_ESP.push(d); }
// v6.08 (fix revisión 14-nov, est6): + los sábados de F2 (intensiva → víspera del examen ENCAPS) que no son protegidos ni SKIP: sáb 9-ene → sáb 6-mar
//   (el sáb 13-mar es D-1 ENCAPS, protegido). Llevan la clase EN VIVO de Theomed de las 15:00 con el título del calendario del campus
//   (THEOMED_Y_DRIVE.md §3.3; confirmado por el calendario del campus el sáb 14-nov). Si el examen ENCAPS se mueve, la lista del JSON deja de
//   cuadrar y el generador aborta hasta actualizarla.
const PROT_SAB = new Set((F6.protegidos || []).map((x) => x.fecha));
const SAB_F2 = [];
for (let d = F6.encaps.intensiva_desde; d < F6.encaps.examen; d = addDias(d, 1)) if (dow(d) === 6 && !PROT_SAB.has(d) && !SKIP.has(d)) SAB_F2.push(d);
SAB_ESP.push(...SAB_F2);
const esSabF2 = (iso) => SAB_F2.includes(iso);
const fechasJ = J.mananas.map((x) => x.fecha);
if (fechasJ.join() !== ESPERADAS.join()) aborta(`mañanas del JSON (${fechasJ.length}) ≠ días de F1 sin Step ni SKIP de _fechas_v6.json ${F6.version} + días extra (${ESPERADAS.length}): sobran [${fechasJ.filter((f) => !ESPERADAS.includes(f)).join(', ')}] · faltan [${ESPERADAS.filter((f) => !fechasJ.includes(f)).join(', ')}]`);
if (J.mananas.some((x) => x.a_las_18 && !EXTRA.has(x.fecha))) aborta('a_las_18 solo vale en un día extra (_meta.dias_extra)');
J.mananas.forEach((x, i) => { if (x.n !== i + 1) aborta(`mañana ${x.fecha}: n = ${x.n} ≠ ${i + 1}`); });
if (J.sabados.map((x) => x.fecha).join() !== SAB_ESP.join()) aborta(`sábados del JSON ≠ sábados de F1 + transición + F2 sin protegidos (${SAB_ESP.join(', ')})`);
if (J.domingos.map((x) => x.fecha).join() !== DOM_ESP.join()) aborta(`domingos del JSON ≠ domingos de F1 + transición (${DOM_ESP.join(', ')})`);
// v6.09 (16-nov-2026): fines de semana SIN SESIÓN (corrida_s1.sin_sesion; v6.09: sáb 21 y dom 22-nov, viaje) → siguen en el JSON (nada se quita: la clase
//   del sábado consta, marcada en diferido) pero sin guías ni bloques: sábado con `sin_sesion: true` + `diferido` (qué pasa con su clase) · domingo con
//   modo 'sin_sesion'. Domingo de plan (_meta.domingos_plan) = modo 'manana' (lleva la mañana ENCAPS, no el ENCAPS opcional).
for (const s of J.sabados) {
  if (SIN_SESION.has(s.fecha) !== !!s.sin_sesion) aborta(`sábado ${s.fecha}: «sin_sesion» ${s.sin_sesion ? 'marcado y el día no está' : 'sin marcar y el día está'} en corrida_s1.sin_sesion`);
  if (s.sin_sesion && s.vivo && !s.diferido) aborta(`sábado ${s.fecha}: sin sesión con clase en vivo («${s.vivo}») y sin «diferido» (qué se hace con la clase)`);
}
for (const d of J.domingos) {
  if (SIN_SESION.has(d.fecha) !== (d.modo === 'sin_sesion')) aborta(`domingo ${d.fecha}: modo «${d.modo || 'simulacro'}» y ${SIN_SESION.has(d.fecha) ? '' : 'no '}está en corrida_s1.sin_sesion`);
  if (DOM_PLAN.has(d.fecha) !== (d.modo === 'manana')) aborta(`domingo ${d.fecha}: modo «${d.modo || 'simulacro'}» y ${DOM_PLAN.has(d.fecha) ? '' : 'no '}está en _meta.domingos_plan`);
  // v6.09 (17-nov): DOMINGO DE LLEGADA (dom 22-nov) = sin sesión + `llegada` + `recupera` (la recuperación fija del viaje, después de la llegada)
  if (d.llegada && (d.modo !== 'sin_sesion' || !d.recupera || !/^\d\d:\d\d$/.test(d.llegada))) aborta(`domingo ${d.fecha}: «llegada» solo en un domingo sin sesión con «recupera» y hora HH:MM`);
}
const NM = J.mananas.length;

// ── unidades de teoría ─────────────────────────────────────────────────────────────────────────────────────────
// v6.09b (mar 17-nov · auditoría tiempo ↔ material, hallazgos a1-1/5/6/7/17): reglas del «cuánto» en _meta.reglas_tiempo del JSON (fuente única):
//   vídeo y banqueo grabado ACTIVO piden pausas → ×1,2 (pausa) · banqueo grabado a 1,25× (+ pausa: 1 h → 58′) · clase EN VIVO en diferido = REGLA FIJA
//   60 % de la clase a 2× (2 h 30 → 45′ · 2 h 14 → 40′; antes «elástica» entre 20′ y la mitad: la misma clase recibía de 22′ a 75′); si la mañana no
//   da para el 60 %, el ítem trae `min` y lo que falta va EXPLÍCITAMENTE en audio · PPT = 10′ · Theoesencial = páginas × 1′ (ítem «theoesencial»
//   del JSON; solo las páginas de las sesiones en VÍDEO: texto primero ya lo lee en su ÷ 3; lo que no cabe en F1, _meta.theoesencial.fuera_f1 con
//   fecha) · PDF = 2′/página · el texto de cada paso dice sus minutos FINALES (el redondeo absorbido, a1-17).
const RT_ = J._meta.reglas_tiempo || {};
for (const k of ['pausa', 'activo_vel', 'vivo_frac', 'vivo_vel', 'ppt_min', 'theo_min_por_p', 'pdf_min_por_p', 'correccion_min_por_q']) if (!(RT_[k] > 0)) aborta(`_meta.reglas_tiempo.${k} falta o no es un número > 0`);
const VEL_VIDEO = 1.75, VEL_TEXTO = 3, PAUSA = RT_.pausa, VEL_ACTIVO = RT_.activo_vel, VIVO_FRAC = RT_.vivo_frac, VIVO_VEL = RT_.vivo_vel, PPT_MIN = RT_.ppt_min,
  THEO_P = RT_.theo_min_por_p, PDF_P = RT_.pdf_min_por_p, CORR_Q = RT_.correccion_min_por_q;
const pct100 = (x) => `${Math.round(x * 100)} %`;
const MODO = J._meta.modos;
/** v6.09b: minutos de tramos útiles de una clase en vivo en diferido (60 % de la clase a 2×). */
const vivoMin = (dur) => Math.round(dur * VIVO_FRAC / VIVO_VEL);
/** v6.09b: «→ 45′ de tramos útiles a 2× (60 % de la clase)» o, si la mañana no da para el 60 %, «→ 30′ … (40 % de la clase; lo que falta hasta el 60 %, 15′, en audio …)». */
const vivoQue = (item, dur, min) => {
  const ref = vivoMin(dur);
  return `${item} · clase de ${durTxt(dur)} → ${min}′ de tramos útiles a ${vel(VIVO_VEL)} (${min >= ref ? `${pct100(VIVO_FRAC)} de la clase` : `${pct100(min * VIVO_VEL / dur)} de la clase; lo que falta hasta el ${pct100(VIVO_FRAC)}, ${ref - min}′ de tramos útiles, en audio en un tiempo muerto`})`;
};
/** Expande un ítem de teoría del JSON en unidades con su «cuánto» (min), lo que pide de verdad su material (exact) y su ruta. `que(min)` escribe el
 *  texto con los minutos FINALES (v6.09b). */
function unidades(it) {
  // v6.09b: Theoesencial = páginas × 1′ (sin «duracion» en minutos)
  if (it.modo === 'theoesencial') {
    if (!AREA[it.area] || !(it.paginas > 0) || !it.de) aborta(`ítem Theoesencial (${it.fecha}): área, páginas y «de» obligatorios`);
    const ex = it.paginas * THEO_P;
    return [{ tipo: 'theo', area: it.area, paginas: it.paginas, min: Math.round(ex), exact: ex,
      que: (min) => `Theoesencial de ${AREA[it.area]} · ${it.de} → ${min}′ (${it.paginas} p a ${THEO_P}′ por página)`,
      como: `${cap(MODO.theoesencial)}.${it.resto ? ` Lo que no cabe hoy: ${it.resto}.` : ''} Ruta: ${RUTA.theoes(AREA[it.area])}.`, enlace: L99 }];
  }
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
      // v6.09b: el vídeo pide pausas (antes de cada diapositiva de concepto) → ×1,2
      const ex = it.modo === 'video' ? seg / 60 / v * PAUSA : seg / 60 / VEL_TEXTO;
      const extra = s[4] && i0 === i1 ? s[4].trim() : '';
      return {
        tipo: 'sesion', modo: it.modo, area: a, s: i, min: Math.round(ex), exact: ex, postTest: `${a} S${i}`, codigos: it.codigos || [],
        que: (min) => (it.modo === 'video'
          ? `${a} S${i}${extra ? ' ' + extra : ''} · vídeo ${segTxt(seg)} → ${min}′ a ${vel(v)} con pausas${cod}`
          : `${a} S${i}${extra ? ' ' + extra : ''} · TEXTO PRIMERO (${min}′; el vídeo dura ${segTxt(seg)})${cod}`),
        como: `${it.modo === 'video' ? MODO.video.replace(/^vídeo a 1,75× \(2× donde se indica\)/, `Vídeo a ${vel(v)}`) : cap(MODO.texto)}${it.velocidad && it.modo === 'texto' ? ` (${it.velocidad})` : ''}.${it.modo === 'video' ? ` Los minutos llevan las pausas (vídeo ÷ ${vel(v)} × ${String(PAUSA).replace('.', ',')}).` : ''} Notas SOLO en forma de pregunta. Ruta: ${RUTA.asinc(AREA[a], i)}.`,
        enlace: L99,
      };
    });
  }
  const b = /^Banqueo (\d+)\/19/.exec(it.item);
  if (b && it.modo === 'activo') {
    // v6.09b: a 1,25× + la pausa antes de cada respuesta (×1,2): 1 h → 58′ (antes «activo = su duración»)
    const ex = durJ / VEL_ACTIVO * PAUSA;
    return [{ tipo: 'activo', min: Math.round(ex), exact: ex, que: (min) => `${it.item} · ${durTxt(durJ)} a ${vel(VEL_ACTIVO)} con pausa → ${min}′ · ACTIVO`,
      como: `${cap(MODO.activo)} (${durTxt(durJ)} ÷ ${vel(VEL_ACTIVO)} × ${String(PAUSA).replace('.', ',')}). Ruta: ${RUTA.adic} › banqueo semanal grabado.`, enlace: L116 }];
  }
  if (/^Revisión normativa/.test(it.item)) {
    const pdf = Number((/PDF (\d+) p/.exec(it.item) || [])[1] || 0);
    const ex = durJ / VEL_TEXTO + pdf * PDF_P; // v6.09b: PDF a 2′/página (antes 1′)
    return [{ tipo: 'texto', min: Math.round(ex), exact: ex, codigos: it.codigos || [], que: (min) => `${it.item} · TEXTO PRIMERO (${min}′: vídeo de ${it.duracion}${pdf ? ` + PDF de ${pdf} p` : ''})${cod}`, como: `${cap(MODO.texto)}.${pdf ? ` El PDF, a ${PDF_P}′ por página.` : ''} Ruta: ${RUTA.adic} › revisiones normativas.`, enlace: L116 }];
  }
  const v = /^(SP|CI|GES|INV|ET) (\d+)\/(\d+)\b(.*)$/.exec(it.item);
  if (v && it.modo === 'vivo_diferido') {
    const cond = /si no la viste en vivo/.test(it.item);
    // v6.09b: REGLA FIJA = 60 % de la clase a 2× (2 h 30 → 45′); `min` del JSON = la mañana no da para el 60 % → lo que falta, explícitamente en audio
    const ref = vivoMin(durJ);
    if (it.min != null && !(it.min > 0 && it.min < ref)) aborta(`«${it.item}» (${it.fecha}): «min» ${it.min} solo vale por debajo del ${pct100(VIVO_FRAC)} de la clase (${ref}′)`);
    const ex = it.min != null ? it.min : durJ * VIVO_FRAC / VIVO_VEL;
    return [{ tipo: 'vivo', cond, area: v[1], dur: durJ, min: Math.round(ex), exact: ex, postTest: `${v[1]} ${v[2]}/${v[3]}`,
      que: (min) => vivoQue(it.item, durJ, min),
      como: `${cap(MODO.vivo_diferido)}. Primero el PPT; el vídeo solo donde el PPT no explica.${cond ? ' Si la viste EN VIVO el sábado, este tiempo va a la otra clase o a la norma del tema.' : ''}${it.alternativa ? ` ${it.alternativa}` : ''} Ruta: ${RUTA.vivo(AREA[v[1]])}.`,
      enlace: L99 }];
  }
  if (/^Normas de la semana|^Hoja de reglas/.test(it.item)) {
    const normas = /^Normas/.test(it.item);
    return [{ tipo: 'presupuesto', min: durJ, exact: durJ, que: (min) => `${it.item} · ${durTxt(min)}`,
      como: normas ? `Lectura de VERIFICACIÓN, no lineal: definiciones de las primeras páginas, tablas, flujogramas, plazos y cifras. Cada dato que dudes → tarjeta a las 11:40. Ruta: ${RUTA.normas}.` : 'Tapa la regla, dila en voz alta, comprueba. Las que no salgan → ★ y tarjeta a las 11:40.',
      enlace: normas ? L99 : undefined }];
  }
  aborta(`no sé expandir el ítem de teoría «${it.item}» (modo ${it.modo})`);
}
const CAP_TEORIA = aMin('09:15') - aMin('07:30');
const CAP_TARDE = 45;
/** Reparte la teoría del día en la franja de 105′ (en orden, unidades enteras) y lo que no cabe → 18:00.
 *  v6.09b: sin unidades elásticas (la clase en diferido tiene regla fija). Redondeo que conserva la suma: si una unidad no entra por ≤ 1′ de redondeo
 *  (Σ de lo que pide de verdad ≤ franja + 0,5′), la unidad más redondeada hacia arriba cede ese minuto (mié 25-nov: banqueo 57,6′ + CI S1 47,5′ =
 *  105,1′ → 58 + 47). Lo que sobra (< 5′) se reparte 1′ a 1′ entre las unidades más largas; ≥ 5′ = la norma del día (si no hay norma, ABORTA: cada
 *  minuto de la teoría lleva material). */
function repartir(dia) {
  const us = dia.teoria.flatMap((t) => unidades({ ...t, fecha: dia.fecha }));
  // v6.08: `a_las_18` = teoría que va DIRECTAMENTE a las 18:00 (jue 31-dic: SP 6/11, que no cabe en ninguna mañana); va antes que lo que no cupo
  const manana = [], tarde = (dia.a_las_18 || []).flatMap((t) => unidades({ ...t, fecha: dia.fecha })).map((u) => ({ ...u, forzada: true }));
  let usado = 0;
  for (const u of us) {
    if (usado + u.min <= CAP_TEORIA) { manana.push(u); usado += u.min; continue; }
    const exTot = [...manana, u].reduce((a, x) => a + x.exact, 0);
    if (usado + u.min - CAP_TEORIA === 1 && exTot <= CAP_TEORIA + 0.5) {
      const cede = [...manana, u].filter((x) => x.min - x.exact > 0).sort((x, y) => (y.min - y.exact) - (x.min - x.exact))[0];
      if (cede) { cede.min -= 1; if (cede !== u) usado -= 1; manana.push(u); usado += u.min; continue; }
    }
    tarde.push(u);
  }
  let libre = CAP_TEORIA - usado;
  if (libre >= 5 && !normaTxt(dia)) aborta(`${dia.fecha}: sobran ${libre}′ en la teoría y no hay norma del día ni otro material con fecha: completa la mañana en el JSON`);
  if (libre > 0 && libre < 5) {
    const orden = manana.filter((x) => x.tipo !== 'presupuesto').sort((x, y) => y.min - x.min);
    for (let i = 0; libre > 0 && orden.length; i = (i + 1) % orden.length) { orden[i].min += 1; libre -= 1; }
  }
  const pend = tarde.reduce((a, u) => a + u.min, 0);
  if (pend > CAP_TARDE) aborta(`${dia.fecha}: lo que no cabe en la teoría (${pend}′) no cabe tampoco a las 18:00 (${CAP_TARDE}′)`);
  return { manana, tarde, libre };
}

// ── textos comunes ─────────────────────────────────────────────────────────────────────────────────────────────
const FUENTES = J._meta.banqueo_fuentes.replace(/^por orden:\s*/, '').replace(/\.?\s*El material de academias no se copia al repo ni a la app\.?$/, '');
const RESERVA = 'Reservados: el ENCAPS 2026-II real (pre-test ciego del vie 8-ene) y el 2026-I (ensayo general del jue 11-mar). Cuarentena: nada del 2026-II de ninguna carrera antes del vie 8-ene.';
const CONFIANZA = 'Confianza en cada una: segura · dudosa · adivinada (el % CIEGO = seguras ÷ total).';
const TIPOS_ERROR = 'tipo de error (concepto · cifra · lectura · confusión entre vecinos) + regla de 1 línea en el registro';
const CRITICOS = 'I-3 · V-2 · IV-1+IV-2 · I-4 · II-3 · III-5 · II-5 · II-4';
/** «sábado 14:00» (F1 y transición, con la clase en vivo) o «sáb 9-ene 07:15» (F2): la revisión semanal que recoge el registro de `iso`. */
// v6.09 (16-nov-2026): un sábado SIN SESIÓN (corrida_s1.sin_sesion; v6.09: sáb 21-nov, viaje) no tiene revisión → la del sábado siguiente, con su fecha
//   («sáb 28-nov 14:00»: la revisión S01 va junto con la S02); antes «sábado 14:00» también la semana del 17 al 20-nov
const revSab = (iso) => {
  let s = addDias(iso, ((6 - dow(iso)) + 7) % 7 || 7), salto = false;
  while (SIN_SESION.has(s)) { s = addDias(s, 7); salto = true; }
  return s <= F6.transicion.hasta ? (salto ? `${corta(s)} 14:00` : 'sábado 14:00') : `${corta(s)} 07:15`;
};
const VIGENCIA = 'Si dos fuentes no coinciden, manda la norma más reciente del campus Theomed 2027-I / MINSA.';
const WDL = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
/** v6.07 (fix lote 1b del Calendar): de qué mañana ENCAPS son las tarjetas y los errores del arranque de `hoy` (la anterior es `prev`):
 *  «de ayer» solo si fue el día anterior · «del viernes» / «del lunes» / «del miércoles» si es la mañana ENCAPS anterior de la rotación
 *  (lun · mié · vie: hasta la v6.07 ponía «de ayer» los mié y vie, que siguen a un día de Step) · «del último día ENCAPS, mié 23-dic» si
 *  entre medias un SKIP se comió una mañana ENCAPS (lun 28-dic: el vie 25-dic es SKIP; antes decía «del viernes» y remitía al mié 23-dic). */
function prevMananaTxt(prev, hoy) {
  if (addDias(prev, 1) === hoy) return { de: 'de ayer', saltadas: [] };
  // v6.08: un día extra tras F1 (mar 5-ene) → la última mañana ENCAPS (jue 31-dic), sin hablar de la rotación ni de los SKIP de por medio
  if (hoy > F6.f1.fin) return { de: `del ${WDL[dow(prev)]} ${Number(prev.slice(8))}-${MES[Number(prev.slice(5, 7)) - 1]} (la última mañana ENCAPS)`, saltadas: [] };
  let esperada = addDias(hoy, -1); // la mañana ENCAPS anterior según la rotación (L-V sin Step), ignorando los SKIP
  while (dow(esperada) === 0 || dow(esperada) === 6 || STEP_DIAS.includes(dow(esperada))) esperada = addDias(esperada, -1);
  if (esperada === prev) return { de: `del ${WDL[dow(prev)]}`, saltadas: [] };
  const saltadas = [];
  for (let d = addDias(prev, 1); d < hoy; d = addDias(d, 1)) if (SKIP.has(d) && dow(d) >= 1 && dow(d) <= 5 && !STEP_DIAS.includes(dow(d))) saltadas.push(d);
  return { de: `del último día ENCAPS, ${corta(prev)}`, saltadas };
}
/** v6.07 (fix): la próxima sesión del Anki 05:30 de ENCAPS tras `iso` (para las ★ de las cifras de las 18:00): «mañana» · «el lunes» · «el jue 24-dic».
 *  v6.08 (fix revisión 14-nov, dia1): sin Anki 05:30 de F1 después (mié 30-dic → transición · mar 5-ene, ya en F2) → el primer Anki 05:00 de la
 *  intensiva (L-V de F2: «ANKI · ENCAPS::Cifras (15′) + USMLE mantenimiento»): «el Anki del lun 4-ene 05:00 (ENCAPS::Cifras 15′)». Antes: «la
 *  transición» (sin Anki ENCAPS hasta el lun 4-ene) y «la próxima sesión de Anki». */
const PROTEG = new Set((F6.protegidos || []).map((x) => x.fecha));
const proxAnkiTxt = (iso, gaFechas) => {
  const n = gaFechas.find((d) => d > iso);
  if (n) return n === addDias(iso, 1) ? `mañana a las ${gaIni(n)}` : dow(iso) === 5 && n === addDias(iso, 3) ? `el lunes a las ${gaIni(n)}` : `el ${corta(n)} a las ${gaIni(n)}`;
  let f2 = iso < F6.encaps.intensiva_desde ? F6.encaps.intensiva_desde : addDias(iso, 1);
  while (dow(f2) === 0 || dow(f2) === 6 || SKIP.has(f2) || PROTEG.has(f2)) f2 = addDias(f2, 1);
  if (f2 >= F6.encaps.examen) return null;
  return f2 === addDias(iso, 1) ? 'el Anki de mañana 05:00 (ENCAPS::Cifras 15′)' : `el Anki del ${corta(f2)} 05:00 (ENCAPS::Cifras 15′)`;
};
// días con el Anki 05:30 de ENCAPS VISIBLE (L-V de F1 sin SKIP): GA (más abajo) se genera para todos, pero el Home (TodayMission, bloque Anki
//   05:00-05:45; = sim_plantilla_dia) solo lo pinta si la guía USMLE de ese bloque no pasa de las 05:30.
// v6.08 (fix revisión 14-nov, dia1): los días en que la guía USMLE ocupa 05:00-05:45 (mar 17-nov configuración de Anki, jue 19-nov Day-After 2/6,
//   mar 24 y jue 26-nov y mar 1-dic «ANKI AM + vídeo pendiente») el Anki 05:30 de ENCAPS no se ve: las ★ de la víspera iban a un día sin tarjeta y
//   el siguiente 05:30 no las nombraba (la cadena se rompía 5 veces). Ahora la cadena salta esos días: «★ para el mié 18-nov a las 05:30» y ese día
//   «(y las ★ del lun 16-nov)». Se calcula con la guía USMLE real (usmleGuia.ts: regenerar este fichero DESPUÉS de gen_usmle_guia.js).
const UG = cargarModuloTS(path.join('src', 'lib', 'usmleGuia.ts'));
// v6.09 (fix revisión 16-nov, joseph 1): el mazo USMLE está VACÍO hasta el D2 del Step 1 (la primera tarjeta nace por APEX ese día; v6.09: jue 19-nov)
//   → antes de esa fecha el Anki 05:30 no manda «10′ más de vencidas USMLE»: son minutos libres
const USMLE_D2 = (() => { const r = cargarModuloTS(path.join('src', 'lib', 'usmleStep1Daily.ts')).diaPorD(2); if (!r) aborta('usmleStep1Daily.ts sin D2'); return r.fecha; })();
// v6.09 (16-nov-2026): + los L-V hábiles de la transición (jue 31-dic, día de plan que recupera el lun 16): su Anki 05:00 también lleva los 15′ de
//   repasos ENCAPS (el Step 1 ya está en pausa: el USMLE, solo vencidas opcionales)
// v6.09b (17-nov · auditoría a1-11, CONTRATO con el lote USMLE): el reparto del Anki 05:00-05:45 sigue el tamaño de los mazos → lun · mié · vie (días de
//   mañana ENCAPS) y los L-V hábiles de la transición (jue 31-dic): USMLE 05:00-05:20 + ENCAPS 05:20-05:45 (25′: Cifras 10′ + Flashcards 10′ + APEX::ENCAPS 5′)
//   · mar · jue (días de Step): USMLE 05:00-05:30 + ENCAPS 05:30-05:45 (15′). La cola de vídeo USMLE ya no entra en las 05:00 (la saca el otro lote).
const HAB_TRANS_SET = new Set(HAB_TRANS);
/** v6.09b: hora a la que empiezan los repasos ENCAPS del Anki 05:00 ese día (05:20 lun · mié · vie y jue 31-dic · 05:30 mar · jue). */
function gaIni(d) { return HAB_TRANS_SET.has(d) || !STEP_DIAS.includes(dow(d)) ? '05:20' : '05:30'; }
const usmleOcupaGA = (d) => UG.guiaUsmleEnRango(d, '05:00', '05:45').some((g) => { const q = G.partesFranja(g.franja); return !!q && aMin(q.fin) > aMin(gaIni(d)); });
const DIAS_GA = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d)) DIAS_GA.push(d); }
DIAS_GA.push(...HAB_TRANS);
const GA_FECHAS = [], GA_OCULTOS = [];
for (const d of DIAS_GA) (usmleOcupaGA(d) ? GA_OCULTOS : GA_FECHAS).push(d);

// ── guías de la MAÑANA ─────────────────────────────────────────────────────────────────────────────────────────
const GM = {}, GT = {}, MD = {}, QUE_TRAMOS = {}; // v6.09 (fix 2): QUE_TRAMOS = qué lleva cada tramo de un domingo de plan en tramos
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
    // v6.08 (fix revisión 14-nov, dia9): el lunes, las tarjetas del ENCAPS del domingo según su modo: los domingos de banqueos grabados (dom 6-dic:
    //   N°08-N°09 · dom 20-dic: N°10-N°11 + corrección) no tienen simulacro (antes: «y las del simulacro del domingo» también esos lunes)
    const domAyer = lunes ? J.domingos.find((x) => x.fecha === addDias(dia.fecha, -1)) : null;
    // v6.09 (16-nov-2026): sin nada del domingo si ese domingo fue SIN SESIÓN (dom 22-nov, viaje) o si fue domingo de PLAN (dom 27-dic: su mañana ya es
    //   «la de ayer»)
    const delDomingo = !lunes || (domAyer && ['sin_sesion', 'manana'].includes(domAyer.modo)) ? '' : domAyer && ['banqueos', 'banqueos_correccion'].includes(domAyer.modo) ? ' (y las de los banqueos grabados del domingo, si los hiciste)' : ' (y las del simulacro del domingo, si lo hiciste)';
    gs.push(guia(fr('07:15', '07:30'), `${tag} · ARRANQUE EN FRÍO`, primera
      ? [
        P(15, 'Orientación en el campus (es el primer día: no hay tarjetas de ayer)', 'Cronograma en vivo y asíncrono; dónde están PPT, post-tests, Theoesenciales, glosarios y las 100 normas técnicas. Ruta: Campus › curso 99 (y el 116 de sesiones adicionales).', L99),
      ]
      : [
        // v6.09 (fix revisión 16-nov, joseph 3): la hora de las tarjetas de la mañana anterior es la REAL (dom 27-dic, domingo de plan: 10:10 — fix 2)
        P(8, `10 tarjetas ${pv.de}, de memoria`, `Las de las ${horaProt(prevM.fecha, '11:40')} del ${corta(prevM.fecha)}${porSkip}${delDomingo}. Tapa la respuesta, dila en voz alta, comprueba.`),
        P(7, `Reglas de los errores ${pv.de}, sin mirar`, 'Lee solo el error en el registro y di la regla. Si no sale, márcala ★: va primero en el banqueo de hoy.'),
      ], [R99], primera ? 'sabes dónde está cada cosa del campus' : 'las 10 tarjetas dichas y las reglas repasadas (las que no salieron, con ★)', { aviso: dia.extra || undefined }));
    // 07:30 teoría
    const pasosT = rep.manana.map((u) => P(u.min, typeof u.que === 'function' ? u.que(u.min) : u.que, u.como, u.enlace));
    // v6.09b (a1-6): el Theoesencial ya no es «el resto de la franja» (iba al revés de sus páginas: SP 127 p con 0′, GES 40 p con 95′): es un ítem con
    //   sus páginas. Lo que sobra (≥ 5′) va a la NORMA DEL DÍA (la regla de la auditoría: «su sobrante pasa a la norma del día»)
    if (rep.libre >= 5) pasosT.push(P(rep.libre, `Norma del día: ${normaTxt(dia)} → ${rep.libre}′`,
      `Lectura de VERIFICACIÓN de esa norma: definiciones de las primeras páginas, tablas, flujogramas, plazos y cifras (tapa y di). Lo que no salga → tarjeta a las 11:40. ${VIGENCIA} Ruta: ${RUTA.normas}.`, L99));
    const resumenT = dia.teoria.filter((t) => t.modo !== 'theoesencial').map((t) => t.item.replace(/\s*\(.*\)$/, '')).join(' + ') + (dia.teoria.some((t) => t.modo === 'theoesencial') ? ' + Theoesencial' : '');
    const noCabe = rep.tarde.filter((u) => !u.forzada), a18 = rep.tarde.filter((u) => u.forzada); // v6.08: + lo que va directo a las 18:00
    // v6.09: en un domingo de plan lo pendiente va a sus cifras, normas y flashcards FLEXIBLES (a las 18:00 está el baile)
    // v6.09 (fix revisión 16-nov, joseph 3): ese bloque ya no es flexible: va a hora fija al terminar la mañana (sin la hora escrita: la mañana se desplaza)
    const a18Txt = esDomPlan(dia.fecha) ? 'a las cifras, normas y flashcards de hoy (al terminar la mañana)' : 'a las 18:00 de hoy';
    const avisoT = [noCabe.length ? `No cabe en 105′ → ${a18Txt}: ${noCabe.map((u) => `${u.postTest || u.que}`).join(' + ')}.` : '',
      a18.length ? `A las 18:00 de hoy, además: ${a18.map((u) => `${u.postTest || u.que}`).join(' + ')} en diferido (no cabe en ninguna mañana).` : ''].filter(Boolean).join(' ') || undefined;
    gs.push(guia(fr('07:30', '09:15'), `${tag} · TEORÍA · ${resumenT}`, pasosT, [R99, ...(dia.teoria.some((t) => /^Banqueo|^Revisión normativa/.test(t.item)) ? [R116] : [])],
      'sesiones vistas o leídas, con notas SOLO en forma de pregunta', { aviso: avisoT, planB: `Si el campus no carga: la misma sesión en ${RUTA.theoDrive}, o el Theoesencial del tema. Lo que no veas hoy va ${esDomPlan(dia.fecha) ? 'a las cifras, normas y flashcards de hoy (al terminar la mañana)' : 'a las 18:00'}.` }));
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
    // v6.09b (a1-8): un banqueo cronometrado que no cabe en 60′ ya no alarga su franja recortando la corrección (mar 5-ene: 60Q → corrección de 23′):
    //   la corrección se ESCALA a 0,85′ por pregunta y, si no cabe, ABORTA (se baja el nº de preguntas en el JSON)
    // v6.09b: `banqueo.franja` = otra franja del banqueo para conservar las horas de una fila ya sembrada (mar 5-ene: 09:45-10:57, la fila D34 de la intensiva
    //   lleva esas franjas en extra.loop; 50Q = 60′ + 12′ de vuelta a las marcadas, y la corrección de 43′ llena 10:57-11:40)
    const fB = dia.banqueo.franja || null;
    if (fB && (!Array.isArray(fB) || fB.length !== 2 || fB[0] !== '09:45' || !(aMin(fB[1]) > aMin('09:45')) || !(aMin(fB[1]) < aMin('11:40')))) aborta(`${dia.fecha}: banqueo.franja debe ser ["09:45", fin < 11:40]`);
    const finB = fB ? fB[1] : '10:45';
    if (minQ > aMin(finB) - aMin('09:45')) aborta(`${dia.fecha}: ${nQ}Q × 72 s = ${minQ}′ no caben en el banqueo de 09:45-${finB}: baja el nº de preguntas en el JSON`);
    const mezcla = /mezcla/.test(dia.banqueo.area);
    const pasosB = [P(Math.min(minQ, aMin(finB) - aMin('09:45')), `${nQ}Q de ${dia.banqueo.area}${dia.banqueo.cronometrado ? ' · EN BLOQUE CRONOMETRADO' : ''} · modo examen (72 s c/u)`,
      // v6.09 (fix revisión 16-nov, joseph 1): la 1.ª mañana no tiene reglas ★ del arranque (es la orientación en el campus) → sin esa frase
      `Sin mirar nada. ${CONFIANZA} ${mezcla ? 'Reparto del vector v3: CI 30 · SP 27 · GES 21 · ET 13 · INV 9 (los 8 críticos primero). Fuentes: DR LOPEZ post-tests y Qx banqueo F2 de varias áreas' : `Fuentes, por orden: ${FUENTES}`}.${primera ? '' : ' Las reglas con ★ del arranque, primero.'} ${RESERVA}`)];
    const restoB = aMin(finB) - aMin('09:45') - pasosB[0].min;
    const nMax = restoB >= 15 ? Math.min(40, nQ + Math.floor((restoB - 5) * 60 / 72)) : nQ; // v6.09b: lo que de verdad se corrige (las del «hasta NQ si sobra» también)
    if (restoB > 0) pasosB.push(P(restoB, restoB >= 15 ? `Vuelta a las marcadas + hasta ${nMax}Q del mismo tema si sobra` : 'Vuelta a las marcadas', restoB >= 15 ? 'Como en el examen: primero las dudosas, sin clave. Si sobra, sigue con preguntas del mismo tema (o los post-tests que no cupieron a las 09:15).' : 'Como en el examen: las dudosas al final, sin clave.'));
    gs.push(guia(fr('09:45', finB), `${tag} · BANQUEO ${nQ}Q · ${dia.banqueo.area}`, pasosB, [R99],
      `${nQ}Q respondidas con su confianza y el % ciego anotado`, { planB: 'Si una fuente no carga, pasa a la siguiente del orden. Nunca el 2026-II.' }));
    // corrección — v6.09b (a1-8): 0,85′ por pregunta (fallos + dudosas; la tasa del simulacro de 100Q), el resto de la franja = verificación en la norma
    const minC = aMin('11:40') - aMin(finB);
    const normaHoy = normaTxt(dia);
    const minCorr = Math.ceil(nMax * CORR_Q);
    if (minC < minCorr || (minC - minCorr > 0 && minC - minCorr < 10)) aborta(`${dia.fecha}: la corrección de ${nMax}Q (${minCorr}′) no cabe en ${finB}-11:40 o deja menos de 10′ de verificación en la norma`);
    const verif = minC - minCorr;
    gs.push(guia(fr(finB, '11:40'), `${tag} · CORRECCIÓN Y REGLAS${normaHoy ? ' + NORMA' : ''}`, [
      P(minCorr, `Cada fallo y cada dudosa de las ${nMax === nQ ? nQ : `${nQ}-${nMax}`}Q de hoy → ${minCorr}′`, `${cap(TIPOS_ERROR)}. Mira por qué es correcta la buena, no solo la tuya. ${String(CORR_Q).replace('.', ',')}′ por pregunta${verif ? ': si hiciste menos, el tiempo que sobra va a la verificación.' : '; las reglas de cifra o definición, contra la hoja de reglas de esta mañana (hoy no hay franja aparte de verificación en la norma).'}`),
      ...(verif ? [P(verif, normaHoy ? `Verificación en la norma: ${normaHoy}` : 'Verificación en la norma de cada regla nueva', `Definición de las primeras páginas, tabla o flujograma. ${VIGENCIA} Ruta: ${RUTA.normas}.`, L99)] : []),
    ], [R99], 'cada fallo con su tipo y su regla de 1 línea en el registro; las reglas verificadas en la norma', { planB: `Si la norma no está en el campus: ${RUTA.drLopezNorm}.` }));
    // 11:40 tarjetas
    gs.push(guia(fr('11:40', '12:00'), `${tag} · TARJETAS de lo que fallaste`, [
      P(15, '5-10 tarjetas nuevas', 'Solo cifra o definición textual de lo que fallaste. Nada de tarjetas de lo que ya sabes.'),
      P(5, 'Registro del día', `Nota del post-test, n y % ciego del banqueo, errores nuevos: lo usa la revisión del ${revSab(dia.fecha)}.`),
    ], [], '5-10 tarjetas creadas y el registro del día cerrado'));
    MD[dia.fecha] = { tarde: rep.tarde.map((u) => ({ min: u.min, que: typeof u.que === 'function' ? u.que(u.min) : u.que, como: u.como, postTest: u.postTest || null, ...(u.forzada ? { forzada: true } : {}) })) };
  }
  // continuidad 07:15 → 12:00
  let t = '07:15';
  for (const g of gs) { const p = G.partesFranja(g.franja); if (!p || p.ini !== t) aborta(`${dia.fecha}: hueco o solape antes de ${g.franja} (esperaba ${t})`); t = p.fin; }
  if (t !== '12:00') aborta(`${dia.fecha}: la mañana termina a las ${t}, no a las 12:00`);
  // v6.09 (fix revisión 16-nov, joseph 3): DOMINGO DE PLAN con hora propia → las franjas van a su hora real y, con ellas, toda hora del protocolo (07:15-12:00)
  //   escrita en títulos, pasos, plan B y avisos («tarjeta a las 11:40» → 10:10). No se tocan: las horas de OTRO día («las de las 11:40 del mié 23-dic») ni el
  //   aviso del JSON (dia.extra: ya trae las horas reales del domingo).
  // v6.09 (fix 2, 16-nov noche): en TRAMOS (dom 27-dic: 04:15-05:45 + 07:15-10:30; la rutina de 05:45-07:15 no se toca) → protocoloAReal en vez de un
  //   desfase único, y la franja en la que cae el corte (solo la TEORÍA, o un borde de franja) se parte en dos guías: sus pasos se reparten por minutos
  //   (el que cruza el corte, en «1.ª parte» y «2.ª parte») y cada parte dice dónde está la otra.
  if (DOM_PLAN_H.has(dia.fecha)) {
    const real = (h, lado) => protocoloAReal(dia.fecha, h, lado);
    const mov = (s) => (typeof s !== 'string' ? s : s.replace(/\b(\d\d):(\d\d)\b(?!\s+del\s+(?:lun|mar|mié|jue|vie|sáb|dom)\s)/g, (x) => {
      const v = aMin(x);
      return v >= aMin(PROT_INI) && v <= aMin(PROT_FIN) ? real(x, 'ini') : x;
    }));
    const ts = tramosManana(dia.fecha);
    const cortes = []; { let acc = 0; for (const t0 of ts.slice(0, -1)) { acc += aMin(t0[1]) - aMin(t0[0]); cortes.push(acc); } } // minutos del protocolo en los que se corta
    const out = [];
    for (const g0 of gs) {
      const p = G.partesFranja(g0.franja);
      const a = aMin(p.ini) - aMin(PROT_INI), b = aMin(p.fin) - aMin(PROT_INI);
      const g = { ...g0, titulo: mov(g0.titulo), pasos: g0.pasos.map((x) => ({ ...x, que: mov(x.que), como: mov(x.como) })), hecho: mov(g0.hecho),
        ...(g0.planB ? { planB: mov(g0.planB) } : {}), ...(g0.aviso ? { aviso: g0.aviso === dia.extra ? g0.aviso : mov(g0.aviso) } : {}) };
      const dentro = cortes.filter((c) => c > a && c < b);
      if (!dentro.length) { out.push({ ...g, franja: fr(real(p.ini, 'ini'), real(p.fin, 'fin')) }); continue; }
      if (dentro.length > 1 || !/ · TEORÍA · /.test(g0.titulo)) aborta(`${dia.fecha}: el corte entre tramos cae dentro de «${g0.titulo}» (${g0.franja}): solo puede caer dentro de la TEORÍA o en el borde de una franja`);
      const tC = hhmm(aMin(PROT_INI) + dentro[0]), k = dentro[0] - a;
      const [i1, f1, i2, f2] = [real(p.ini, 'ini'), real(tC, 'fin'), real(tC, 'ini'), real(p.fin, 'fin')];
      const pa = [], pb = []; let s0 = 0;
      for (const x of g.pasos) {
        const e = s0 + x.min;
        if (e <= k) pa.push(x);
        else if (s0 >= k) pb.push(x);
        else { const m1 = k - s0, m2 = e - k; pa.push({ ...x, min: m1, que: `${x.que} — 1.ª parte: ${m1}′ (los ${m2}′ restantes, a las ${i2})` }); pb.push({ ...x, min: m2, que: `${x.que} — 2.ª parte: los ${m2}′ restantes` }); }
        s0 = e;
      }
      if (!pa.length || !pb.length) aborta(`${dia.fecha}: el corte de la TEORÍA deja una parte sin pasos`);
      out.push({ ...g, franja: fr(i1, f1), titulo: `${g.titulo} · 1.ª parte (${k}′)`, totalMin: k, pasos: pa, hecho: 'la 1.ª parte de la teoría vista o leída, con notas SOLO en forma de pregunta',
        aviso: [g.aviso, `La teoría sigue a las ${i2} (${b - a - k}′): entre medias, la rutina de la mañana (${f1}-${i2}), que no se toca.`].filter(Boolean).join(' ') });
      out.push({ ...g, franja: fr(i2, f2), titulo: `${g.titulo} · 2.ª parte (${b - a - k}′, tras la rutina de la mañana)`, totalMin: b - a - k, pasos: pb, aviso: `Es la 2.ª parte de la teoría de hoy (la 1.ª, ${i1}-${f1}): termina lo que quedó y sigue al post-test.` });
    }
    // continuidad: cada tramo cubierto de punta a punta, sin huecos ni solapes, y nada fuera de los tramos
    let j = 0;
    for (const t0 of ts) {
      let c = t0[0];
      while (j < out.length && G.partesFranja(out[j].franja).ini === c) { c = G.partesFranja(out[j].franja).fin; j++; }
      if (c !== t0[1]) aborta(`${dia.fecha}: el tramo ${t0.join('-')} de la mañana no queda cubierto (llega a ${c})`);
    }
    if (j !== out.length) aborta(`${dia.fecha}: hay franjas de la mañana fuera de sus tramos (${out.slice(j).map((x) => x.franja).join(', ')})`);
    gs.splice(0, gs.length, ...out);
    // qué lleva cada tramo (lo pinta el Home: un bloque por tramo)
    const etq = (x) => (/ARRANQUE/.test(x.titulo) ? 'arranque' : / · TEORÍA · /.test(x.titulo) ? `teoría${/ · 1\.ª parte/.test(x.titulo) ? ' (1.ª parte)' : / · 2\.ª parte/.test(x.titulo) ? ' (2.ª parte)' : ''}`
      : /POST-TEST/.test(x.titulo) ? 'post-test' : /RECALL/.test(x.titulo) ? 'recall' : /^Pausa$/.test(x.titulo) ? null : /BANQUEO/.test(x.titulo) ? 'banqueo'
        : /CORRECCIÓN/.test(x.titulo) ? 'corrección' : /TARJETAS/.test(x.titulo) ? 'tarjetas' : /SIMULACRO/.test(x.titulo) ? 'simulacro' : 'mañana');
    QUE_TRAMOS[dia.fecha] = ts.map((t0) => gs.filter((x) => { const q = G.partesFranja(x.franja); return aMin(q.ini) >= aMin(t0[0]) && aMin(q.ini) < aMin(t0[1]); }).map(etq).filter(Boolean).join(' → '));
  }
  GM[dia.fecha] = gs;

  // ── 18:00 · ENCAPS · cifras, normas y flashcards (45′) ──
  const pend = (MD[dia.fecha] && MD[dia.fecha].tarde) || [];
  const pendM = pend.filter((u) => !u.forzada), pendF = pend.filter((u) => u.forzada); // v6.08: lo que no cupo por la mañana · lo que va directo a las 18:00
  const pasosP = pend.map((u) => P(u.min, `${u.forzada ? 'CLASE EN DIFERIDO (va hoy a las 18:00)' : 'PENDIENTE de la mañana'}: ${u.que}`, `${u.como}${u.postTest ? ` Al terminar, su post-test (primer intento ciego); si no cabe, abre el banqueo del ${corta((J.mananas[dia.n] || dia).fecha)}.` : ''}`, L99));
  // v6.09b (a1-8): preguntas de otra mañana que no caben allí (tarde_extra: las 10Q del mar 5-ene, que pasa de 60Q a 50Q, van al lun 28-dic 18:00)
  const tx = dia.tarde_extra || null;
  if (tx) {
    if (!(tx.q > 0) || !tx.area || !tx.de || !tx.motivo || !J.mananas.some((x) => x.fecha === tx.de)) aborta(`${dia.fecha}: tarde_extra sin q / area / de (una mañana del JSON) / motivo`);
    if (pend.length) aborta(`${dia.fecha}: tarde_extra en un día con pendiente de la mañana a las 18:00 (tiene que ser un día sin pendiente)`);
    const mQ = Math.ceil(tx.q * 72 / 60), mC = Math.ceil(tx.q * CORR_Q);
    pasosP.push(P(mQ, `${tx.q}Q de ${tx.area} (las de la mañana ${J.mananas.find((x) => x.fecha === tx.de).n}/${NM}, ${corta(tx.de)}, que ya no caben allí) · modo examen (72 s c/u)`, `Sin mirar nada, en bloque cronometrado. ${CONFIANZA} ${RESERVA}`),
      P(mC, `Cada fallo y cada dudosa de las ${tx.q}Q → ${mC}′`, `${cap(TIPOS_ERROR)}. ${String(CORR_Q).replace('.', ',')}′ por pregunta.`));
  }
  const P_ = pasosP.reduce((a, p) => a + p.min, 0);
  const Rr = CAP_TARDE - P_;
  const cierre = dia.fase === 'cierre';
  const codTxt = codigos.length ? codigos.join(' · ') : /mezcla/.test(dia.banqueo.area) ? `los 8 críticos (${CRITICOS})` : dia.banqueo.area.replace(/(SP|CI|GES|INV|ET)/g, (x) => AREA[x]);
  const pasosR = [];
  const flash = (m) => (cierre
    ? P(m, 'Flashcards ENCAPS::Flashcards · vencidas + las tarjetas de los errores del simulacro', 'Anki. Hoy sin nuevas del temario: las tarjetas de lo que fallaste esta mañana, primero.')
    // v6.09 (fix revisión 16-nov, joseph 1): la 1.ª mañana ENCAPS no tiene vencidas (las primeras tarjetas nacen hoy a las 11:40)
    // v6.09b: las nuevas que caben en los minutos (≈50 s por tarjeta nueva, máx. 30); antes «15 nuevas» también en 10′ (12,5′ de material)
    : P(m, `Flashcards ENCAPS::Flashcards · ${Math.min(30, Math.floor(m * 60 / 50))} nuevas del tema de hoy ${dia.n === 1 ? '(aún no hay vencidas)' : '+ vencidas'}`, 'Anki. Las nuevas del área de hoy, en el orden del temario. Si aún no importaste el mazo de DR LOPEZ (decisión tuya), haz las nuevas de ENCAPS::Cifras.'));
  const cifras = (m) => (cierre
    ? P(m, 'Cifras de lo que fallaste en el simulacro', `Busca cada cifra fallada en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para ${proxAnkiTxt(dia.fecha, GA_FECHAS) || 'la próxima sesión de Anki'}.`)
    : P(m, `Cifras y plazos de ${codTxt}`, `Las filas de esos códigos en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para ${proxAnkiTxt(dia.fecha, GA_FECHAS) || 'la próxima sesión de Anki'}.`));
  if (Rr >= 30) {
    pasosR.push(flash(Rr - 20), cifras(10));
    pasosR.push(normaTxt(dia) ? P(10, `Norma del día: ${normaTxt(dia)}`, `Una tabla o flujograma más de esa norma → tarjeta. Ruta: ${RUTA.normas}.`, L99)
      : P(10, 'Pizarra del mes (memoria visible)', 'Cifras y definiciones del mes en la pizarra: plazos de notificación, esquema de vacunas, dosis de hierro, metas de indicadores. Lo que se aprende aquí pasa a tarjeta.'));
  } else if (Rr >= 15) pasosR.push(flash(Rr - 10), cifras(10));
  else if (Rr > 0) pasosR.push(flash(Rr));
  // v6.09 (16-nov-2026): en un DOMINGO DE PLAN (dom 27-dic) a las 17:00 está el baile → estos 45′ son FLEXIBLES (bloque sin hora en plantillasV6); la
  //   franja de la guía es solo un ejemplo: 20:00-20:45, al volver (la tarde es del SHIP y del Anki del domingo)
  const domP = esDomPlan(dia.fecha);
  // v6.09 (fix revisión 16-nov, joseph 3): con hora propia (_meta.domingos_plan.tarde; dom 27-dic: 10:45-11:30) estos 45′ van a HORA FIJA al terminar la
  //   mañana: el domingo solo se estudia antes de las 17:00 (baile) y a mediodía hay un compromiso personal. Antes: flexibles, de ejemplo 20:00-20:45.
  const hDom = DOM_PLAN_H.get(dia.fecha);
  const avisoDom = !domP ? '' : hDom
    ? `Domingo de plan: estos 45′ van a hora fija, al terminar la mañana (${hDom.tarde[0]}-${hDom.tarde[1]}), no después del baile de las 17:00.${hDom.compromiso ? ` Quedan ${aMin(hDom.compromiso) - aMin(hDom.tarde[1])}′ de margen antes del compromiso personal de las ${hDom.compromiso}.` : ''}`
    : 'Hoy es domingo: a las 17:00 está el baile, así que estos 45′ son flexibles (de ejemplo 20:00-20:45, al volver; o en un hueco antes de las 17:00).';
  GT[dia.fecha] = guia(domP ? (hDom ? fr(hDom.tarde[0], hDom.tarde[1]) : fr('20:00', '20:45')) : fr('18:00', '18:45'), `ENCAPS · CIFRAS, NORMAS Y FLASHCARDS${domP ? (hDom ? ' (domingo de plan: al terminar la mañana)' : ' (flexible: hoy es domingo)') : ''}${pendM.length ? ' (+ lo pendiente de la mañana)' : ''}${pendF.length ? ` (+ ${pendF.map((u) => u.postTest).join(' + ')} en diferido)` : ''}${tx ? ` (+ ${tx.q}Q de la mañana del ${corta(tx.de)})` : ''}`, [...pasosP, ...pasosR], [R99],
    pendM.length ? 'lo pendiente de la mañana terminado y las flashcards del día hechas' : pendF.length ? `${pendF.map((u) => u.postTest).join(' + ')} vista en sus tramos útiles${Rr > 0 ? ' y las flashcards del día hechas' : ' (el resto, en audio en un tiempo muerto)'}` : 'flashcards del día hechas y las cifras de hoy dichas en voz alta',
    { aviso: [avisoDom, pendM.length ? `Hoy la teoría no cupo entera en ${GM[dia.fecha].filter((g) => / · TEORÍA · /.test(g.titulo)).map((g) => g.franja.replace('–', '-')).join(' y ') || `${horaProt(dia.fecha, '07:30')}-${horaProt(dia.fecha, '09:15')}`}: lo que falta va primero (${P_}′).` : pendF.length ? `Hoy a las 18:00 va ${pendF.map((u) => u.postTest).join(' + ')} en diferido (${P_}′): es la clase que no cabe en ninguna mañana; las flashcards de hoy van al próximo Anki.` : '',
      tx ? `Hoy, primero, ${tx.q}Q de la mañana ${J.mananas.find((x) => x.fecha === tx.de).n}/${NM} (${corta(tx.de)}): allí van ${J.mananas.find((x) => x.fecha === tx.de).banqueo.n}Q cronometradas y estas ya no caben (corrección a ${String(CORR_Q).replace('.', ',')}′ por pregunta).` : ''].filter(Boolean).join(' ') || undefined });
}
function normaTxt(dia) { return dia.norma && dia.norma !== 'verificación' ? dia.norma : null; }

// ── 05:30 · repasos ENCAPS (15′) tras el Anki USMLE · todos los días de plan de F1 (L-V sin SKIP) ──────────────────
const GA = {};
const GT_FECHAS = J.mananas.map((x) => x.fecha);
const PRIMERA_M = GT_FECHAS[0];
for (const d of DIAS_GA) {
  const w = dow(d);
  // v6.09 (16-nov-2026, «el primer día no repasa lo que aún no existe»): hasta la PRIMERA mañana ENCAPS incluida (mar 17 y mié 18-nov) no hay ninguna
  //   tarjeta ENCAPS estudiada (las primeras se hacen el mié 18 a las 11:40 y a las 18:00) → sin repasos: los 15′ se dicen (mazos listos + USMLE)
  const ini = gaIni(d), minGA = aMin('05:45') - aMin(ini); // v6.09b: 25′ (lun · mié · vie y jue 31-dic) o 15′ (mar · jue)
  if (d <= PRIMERA_M) {
    GA[d] = guia(fr(ini, '05:45'), `ANKI · repasos ENCAPS ${minGA}′ (después del USMLE) · hoy aún sin tarjetas ENCAPS`, [
      P(5, 'Sin repasos ENCAPS: aún no hay tarjetas', `Las primeras tarjetas ENCAPS se hacen ${d === PRIMERA_M ? 'hoy' : `el ${corta(PRIMERA_M)}`} (11:40 y 18:00); los repasos empiezan después. Estos 5′: comprueba que los mazos ENCAPS::Cifras, ENCAPS::Flashcards y APEX::ENCAPS están en Anki, con FSRS.`),
      // v6.09 (fix revisión 16-nov, joseph 1): antes del D2 del Step 1 el mazo USMLE también está vacío → minutos libres (antes «10′ más de vencidas USMLE»)
      d < USMLE_D2
        ? P(minGA - 5, `Libres: los mazos aún están vacíos (ENCAPS nace ${d === PRIMERA_M ? 'hoy' : `el ${corta(PRIMERA_M)}`} a las 11:40; USMLE, el ${corta(USMLE_D2)})`, `La primera tarjeta USMLE nace por APEX el ${corta(USMLE_D2)} (D2): hoy no hay vencidas que repasar. Termina antes o prepara la mañana.`)
        : P(minGA - 5, `USMLE: ${minGA - 5}′ más de vencidas`, 'Alarga el Anki USMLE con estos minutos (o terminas antes).'),
    ], [], 'mazos ENCAPS listos en Anki (aún sin repasos)', { aviso: GT_FECHAS.includes(d) ? 'Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.' : undefined });
    continue;
  }
  // v6.07 (fix): las ★ de las cifras de las 18:00 (lun · mié · vie) se repasan en el PRIMER Anki 05:30 que sigue: «de ayer» solo el día
  //   siguiente a una tarde ENCAPS, «del viernes» el lunes; si ya hubo otro Anki 05:30 en medio (mié, vie, lun 28-dic), no hay ★ pendientes
  const ultT = [...GT_FECHAS].reverse().find((x) => x < d);
  const pend = ultT && !GA_FECHAS.some((x) => x > ultT && x < d);
  const deT = !pend ? null : ultT === addDias(d, -1) ? 'de ayer' : w === 1 && ultT === addDias(d, -3) ? 'del viernes' : `del ${corta(ultT)}`;
  const cif = P(10, deT ? `ENCAPS::Cifras · vencidas (y las ★ ${deT})` : 'ENCAPS::Cifras · vencidas', 'Responde en voz alta antes de girar. FSRS: Good / Again, nunca Hard ni Easy.');
  GA[d] = guia(fr(ini, '05:45'), `ANKI · repasos ENCAPS ${minGA}′ (después del USMLE)`, minGA >= 25 ? [
    cif,
    P(10, 'ENCAPS::Flashcards · vencidas', 'El mazo que más crece (las nuevas de cada tarde de las 18:00). Si aún no importaste el mazo de DR LOPEZ (decisión tuya), estos 10′ van a ENCAPS::Cifras.'),
    P(minGA - 20, 'APEX::ENCAPS · vencidas', 'Las tarjetas APEX de las sesiones de las 16:15. Si hoy no hay vencidas, estos minutos van a ENCAPS::Flashcards.'),
  ] : [
    cif,
    P(minGA - 10, 'ENCAPS::Flashcards + APEX::ENCAPS · vencidas', 'Primero ENCAPS::Flashcards; lo que no acabes, el próximo Anki de 25′ (lun · mié · vie). Si aún no importaste el mazo de DR LOPEZ (decisión tuya), estos minutos van a ENCAPS::Cifras.'),
  ], [], minGA >= 25 ? '0 vencidas en ENCAPS::Cifras, ENCAPS::Flashcards y APEX::ENCAPS' : '0 vencidas en ENCAPS::Cifras (y en ENCAPS::Flashcards si ya existe)', { aviso: GT_FECHAS.includes(d) ? 'Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.' : undefined }); // v6.09: el aviso, si ese día hay mañana ENCAPS (jue 31-dic: jueves sin Step); antes, si no era día de Step
}

// ── sábado · THEOMED EN VIVO (14:45 preparar · 15:00-17:00 en vivo) ─────────────────────────────────────────────
const SAB = {}, GSP = {}, GSV = {};
for (const s of J.sabados) {
  if (s.sin_sesion) continue; // v6.09: sábado sin sesión (sáb 21-nov, viaje): sin guías ni índice (la clase consta en el JSON, en diferido)
  // v6.08 (fix est6): el área sale del título («Cuidado Integral 6/8») o, en F2, de `area` (código SP · CI · GES · INV · ET, o null = varias áreas:
  //   el banqueo general del sáb 13-feb), porque los repasos se titulan «Repaso Investigación 1/2»
  const a = 'area' in s ? s.area : s.vivo ? AREA_DE_NOMBRE(s.vivo) : null;
  if ('area' in s && s.area !== null && !AREA[s.area]) aborta(`sábado ${s.fecha}: área «${s.area}» desconocida (SP · CI · GES · INV · ET o null)`);
  if ('area' in s && !esSabF2(s.fecha)) aborta(`sábado ${s.fecha}: «area» explícita solo en los sábados de F2`);
  if (s.vivo && !a && !('area' in s)) aborta(`sábado ${s.fecha}: no reconozco el área de «${s.vivo}»`);
  SAB[s.fecha] = { fecha: s.fecha, vivo: s.vivo, area: a ? AREA[a] : null };
  if (!s.vivo) continue;
  if (esSabF2(s.fecha)) {
    // v6.08 (fix revisión 14-nov, est6): SÁBADO DE F2 (9-ene → 6-mar) · clase EN VIVO 15:00-17:00 con el título del calendario del campus. El carril
    //   SÁBADO ENCAPS va de 14:00 a 15:00 casi todos los sábados: el «preparar la clase» de las 14:45 solo se pinta si esa franja está libre
    //   (plantillasV6.bloquesTheomedSabado; en v6.08, el sáb 6-mar), así que la guía de las 15:00 no da por hecho que hubo preparación.
    const banq = /banqueo/i.test(s.vivo);
    const rutaF2 = `Campus › curso 99 · enlace de la clase en el cronograma de la portada (la grabación y el PPT se publican 1-3 días después${a ? `, en el bloque ${AREA[a]}` : ''})`;
    GSP[s.fecha] = guia(fr('14:45', '15:00'), `ENCAPS · PREPARAR LA CLASE · ${s.vivo}`, banq ? [
      P(5, 'Hoja de respuestas lista', 'Una línea por pregunta: tu respuesta y tu confianza (segura · dudosa · adivinada) ANTES de que el docente la resuelva.'),
      P(7, `3 dudas ${a ? `de ${AREA[a]}` : 'de tus áreas peores'} que quieres ver resueltas`, 'De tus errores del registro (revisión de esta mañana): escríbelas en forma de pregunta.'),
      P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
    ] : [
      P(5, `Abre el material de ${s.vivo}`, `PPT o temario de la clase si ya está publicado; si no, el Theoesencial del área. ${rutaF2}.`, L99),
      P(7, '3 preguntas que la clase te tiene que responder', 'Escríbelas en forma de pregunta, de tus errores del área (registro y revisión de esta mañana).'),
      P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
    ], [R99], banq ? 'hoja de respuestas lista y 3 dudas escritas' : 'material abierto y 3 preguntas escritas');
    GSV[s.fecha] = guia(fr('15:00', '17:00'), `THEOMED EN VIVO · ${s.vivo}`, [
      P(5, `Entrar a la clase: ${s.vivo}`, `${rutaF2}. Puntual: la asistencia cuenta. Si no hubo «preparar la clase» (el carril de las 14:00 llega hasta las 15:00), anota al entrar 2-3 dudas del área.`, L99),
      banq
        ? P(105, `${s.vivo} EN VIVO, en activo`, 'Cada pregunta: léela, responde y marca tu confianza ANTES de la resolución del docente; después, la resolución. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.')
        : P(105, 'Clase EN VIVO, participando', 'Antes de que el docente responda, responde tú. Notas SOLO en forma de pregunta. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.'),
      P(10, 'Cierre a las 17:00', banq
        ? 'Anota cuántas acertaste y cuántas «seguras» fallaste; cada fallo, con su regla de 1 línea en el registro (lo recoge la revisión del sábado siguiente). El tramo 17:00-17:30, en la grabación (en activo, en un hueco de la semana).'
        : 'Mira si tus preguntas quedaron respondidas. Anota el minuto donde te vas: el tramo 17:00-17:30 lo ves en la grabación (a 2×, en audio en un tiempo muerto). Si la clase tiene post-test, en cuanto lo publiquen: primer intento ciego (el domingo).'),
    ], [R99], banq ? 'banqueo seguido en activo hasta las 17:00 y los fallos en el registro' : 'clase seguida en vivo hasta las 17:00 y las ★ anotadas', {
      aviso: `La clase dura hasta las 17:30 y el baile empieza a las 17:00: vas en vivo hasta las 17:00; el último tramo, en la grabación.${s.fecha === SAB_F2[0] ? ' Desde hoy y hasta el sáb 6-mar, la clase en vivo de Theomed de los sábados va en el Home (repasos de ene-mar, calendario del campus).' : ''}`,
      planB: banq ? 'Si no puedes conectarte: la grabación (1-3 días después), en activo: pausa en cada pregunta y responde antes de la resolución. Nunca en pasivo.'
        : 'Si no puedes conectarte: la grabación (1-3 días después), los tramos que el PPT no explica a 1,75-2× y el resto en audio en tiempos muertos.',
    });
    continue;
  }
  GSP[s.fecha] = guia(fr('14:45', '15:00'), `ENCAPS · PREPARAR LA CLASE · ${s.vivo}`, [
    P(5, `Abre el PPT de ${s.vivo}`, `Lee títulos e índice. Ruta: ${RUTA.vivo(AREA[a])} (si ya está publicado).`, L99),
    P(7, '3 preguntas que la clase te tiene que responder', 'Escríbelas en forma de pregunta, de tus errores del área o de lo que no entiendes del PPT.'),
    P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
  ], [R99], 'PPT abierto y 3 preguntas escritas');
  GSV[s.fecha] = guia(fr('15:00', '17:00'), `THEOMED EN VIVO · ${s.vivo}`, [
    P(5, `Entrar a la clase: ${s.vivo}`, `Ruta: ${RUTA.vivo(AREA[a])}. Puntual: la asistencia cuenta.`, L99),
    P(105, 'Clase EN VIVO, participando', 'Antes de que el docente responda, responde tú. Notas SOLO en forma de pregunta. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.'),
    // v6.09b (a1-18): el tramo 17:00-17:30 se declara SOLO audio (no tiene hueco propio)
    P(10, 'Cierre a las 17:00', 'Mira si tus 3 preguntas quedaron respondidas. Anota el minuto donde te vas: el tramo 17:00-17:30 (30′ de clase) va SOLO en audio, a 2× (15′), en un tiempo muerto de la semana: no lleva hueco propio. El post-test de la clase, en cuanto lo publiquen: primer intento ciego (el domingo o al empezar el banqueo del lunes 09:45).'),
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
const fmtMin = (n) => (n % 60 ? (n >= 60 ? `${Math.floor(n / 60)} h ${n % 60}′` : `${n}′`) : `${n / 60} h`);
const WD_LARGO = (iso) => `${WDL[dow(iso)]} ${Number(iso.slice(8))}`;
// v6.09b (a1-7/a1-17): banqueo grabado a 1,25× + la pausa en cada pregunta (×1,2) = su duración × 0,96 (antes «en activo = su duración», aunque pide pausar)
const mmssEx = (s) => { const m = /^(\d+):(\d\d)$/.exec(String(s || '')); if (!m) aborta(`duración mm:ss ilegible «${s}»`); return Number(m[1]) + Number(m[2]) / 60; };
const PASO_BANQUEO = `Pausa el vídeo en cada pregunta: léela, responde y marca tu confianza (1-3) ANTES de ver la resolución; después, la resolución completa (Palmerton). A ${vel(VEL_ACTIVO)} (las explicaciones), con la pausa de cada pregunta: su duración ÷ ${vel(VEL_ACTIVO)} × ${String(PAUSA).replace('.', ',')}.`;
for (const d of J.domingos.filter((x) => x.modo && !['simulacro', 'sin_sesion', 'manana'].includes(x.modo))) { // v6.09: sin_sesion (dom 22-nov, viaje) y manana (dom 27-dic, domingo de plan) no llevan el ENCAPS opcional
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
    const durB = d.banqueos.map((b) => Math.round(mmssEx(b.dur) / VEL_ACTIVO * PAUSA));
    const resto = G.minutosFranja(fr(ini, fin1)) - 5 - durB.reduce((a, x) => a + x, 0);
    if (resto < 10) aborta(`domingo ${d.fecha}: los banqueos (${durB.join(' + ')}′) no caben en ${ini}-${fin1}`);
    const tarj = Math.min(7, Math.floor(resto / 3));
    pasos.push(P(5, `Preparar: banqueos grabados ${nombres}`, `Ruta: Campus › curso 116 (SESIONES ADICIONALES GP02) › Banqueos generales – viernes › ${nombres}. Hoja para tu respuesta y tu confianza en cada pregunta; móvil fuera.`, L116));
    d.banqueos.forEach((b, i) => pasos.push(P(durB[i], `BANQUEO ${b.n} (${b.dur}) en activo a ${vel(VEL_ACTIVO)} con pausa → ${durB[i]}′`, PASO_BANQUEO)));
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
// v6.09 (fix revisión 16-nov, joseph 4): DOMINGO CON RECUPERACIÓN FIJA (domingos[].recupera; v6.09: dom 29-nov, el siguiente al viaje) = bloque ENCAPS
//   OBLIGATORIO a hora fija (franja; fix 2: 07:15-08:45, tras la rutina de la mañana) con la GRABACIÓN de la clase en vivo que se perdió (tramos útiles a 2×) + los PPT en diferido que las
//   notas de la semana mandan a ese domingo (ppt_min c/u; el de la clase grabada va antes de su grabación). Antes esas notas decían «el PPT el dom 29» y
//   ese domingo no tenía ningún paso que los nombrara. El ENCAPS opcional del día (simulacro) sigue aparte, de ejemplo después (franja_ejemplo).
const REC = {}, GR = {};
const COD_CLASE = /^(SP|CI|GES|INV|ET) \d+\/\d+$/;
const areaDe = (c) => AREA[c.split(' ')[0]];
const comoPPT = `Títulos y diapositivas de concepto; notas SOLO en forma de pregunta (cifra, plazo o definición textual → tarjeta a ENCAPS::Cifras). El audio de la clase, en tiempos muertos.`;
const REC_PPT_MIN = []; // minutos de PPT de cada recuperación (ENCAPS_MINIMO de encaps-rec)
for (const d of J.domingos.filter((x) => x.recupera)) {
  const r = d.recupera;
  // v6.09 (17-nov): un domingo SIN SESIÓN con «llegada» (dom 22-nov, de vuelta del viaje a las 14:00) sí lleva la recuperación, después de la llegada
  if (d.modo === 'manana' || (d.modo === 'sin_sesion' && !d.llegada)) aborta(`domingo ${d.fecha}: recupera en un domingo ${d.modo}${d.modo === 'sin_sesion' ? ' sin «llegada»' : ''}`);
  if (!Array.isArray(r.franja) || r.franja.length !== 2 || !r.grabacion || !Array.isArray(r.ppt) || !r.ppt.length || !(r.ppt_min > 0) || !r.motivo) aborta(`domingo ${d.fecha}: recupera sin franja / grabacion / ppt / ppt_min / motivo`);
  for (const c of [r.grabacion, ...r.ppt]) {
    if (!COD_CLASE.test(c.clase) || !/^20\d\d-\d\d-\d\d$/.test(c.de) || c.de >= d.fecha) aborta(`domingo ${d.fecha}: recupera › «${c.clase}» del ${c.de}: clase o fecha no válida (tiene que ser anterior al domingo)`);
  }
  const [ini, fin] = r.franja;
  if (d.llegada && aMin(ini) < aMin(d.llegada)) aborta(`domingo ${d.fecha}: la recuperación (${ini}) empieza antes de la llegada (${d.llegada})`);
  if (aMin(fin) > aMin('17:00')) aborta(`domingo ${d.fecha}: la recuperación termina a las ${fin}, después de las 17:00 (baile)`);
  if (aMin(ini) < aMin('07:15') && aMin(fin) > aMin('05:45')) aborta(`domingo ${d.fecha}: la recuperación ${ini}-${fin} pisa la rutina de la mañana (05:45-07:15)`);
  // v6.09b (a1-12): la grabación con la REGLA FIJA (60 % de la clase a 2×: 2 h 30 → 45′; antes elástica, 65′) y los PPT a ppt_min (9-10′; antes 5′):
  //   Σ pasos = la franja exacta (dom 22: 45 + 5 × 9 = 90′)
  const grabMin = vivoMin(durMin(r.grabacion.duracion));
  if (r.ppt_min < 9 || r.ppt_min > PPT_MIN) aborta(`domingo ${d.fecha}: ppt_min ${r.ppt_min}′ fuera de 9-${PPT_MIN}′ (un PPT de clase en vivo ≈ 40 p × 50 % × 0,5′)`);
  if (grabMin + r.ppt.length * r.ppt_min !== G.minutosFranja(fr(ini, fin))) aborta(`domingo ${d.fecha}: grabación (${grabMin}′) + ${r.ppt.length} PPT × ${r.ppt_min}′ ≠ la franja ${ini}-${fin}`);
  const pptG = r.ppt.find((x) => x.clase === r.grabacion.clase) || null;
  const pasos = [
    ...(pptG ? [P(r.ppt_min, `PPT de ${pptG.clase} (${corta(pptG.de)}), antes de su grabación`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(pptG.clase))}.`, L99)] : []),
    P(grabMin, `Grabación de ${vivoQue(`${r.grabacion.clase} (${corta(r.grabacion.de)})`, durMin(r.grabacion.duracion), grabMin).replace(' · clase de ', '; clase de ')}`, `${cap(MODO.vivo_diferido)}. Primero el PPT; el vídeo solo donde el PPT no explica. Notas SOLO en forma de pregunta. Ruta: ${RUTA.vivo(areaDe(r.grabacion.clase))}.`, L99),
    ...r.ppt.filter((x) => x !== pptG).map((x) => P(r.ppt_min, `PPT de ${x.clase} (${corta(x.de)}, en diferido)`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(x.clase))}.`, L99)),
  ];
  // v6.09b (a1-12): PLAN B CON FECHA — Theomed cuelga la grabación 1-3 días después de la clase: si a la hora de la recuperación la de r.grabacion aún no
  //   está, ese día va la de plan_b.grabacion (ya publicada; mismo molde: su PPT + 60 % a 2×) y la que faltaba pasa a plan_b.pasa (una 18:00 que hoy
  //   lleva la clase de plan_b: la que se intercambia)
  const pb = r.plan_b || null;
  let planBTxt = '';
  if (pb) {
    const g2 = pb.grabacion, ps = pb.pasa;
    if (!g2 || !COD_CLASE.test(g2.clase) || !(g2.de < d.fecha) || !ps || ps.clase !== r.grabacion.clase || !ps.fecha || ps.hora !== '18:00') aborta(`domingo ${d.fecha}: plan_b sin grabacion (clase anterior) o sin pasa { clase = ${r.grabacion.clase}, fecha, hora 18:00 }`);
    if (vivoMin(durMin(g2.duracion)) !== grabMin) aborta(`domingo ${d.fecha}: la grabación del plan B (${g2.clase}) no dura lo mismo que la del plan A: la franja no cuadraría`);
    const m18 = MD[ps.fecha] && MD[ps.fecha].tarde;
    if (!m18 || !m18.some((u) => u.postTest === g2.clase)) aborta(`domingo ${d.fecha}: plan_b › la 18:00 del ${ps.fecha} no lleva la ${g2.clase} (con la que se intercambia la ${ps.clase})`);
    planBTxt = ` PLAN B, si a las ${ini} la grabación de la ${r.grabacion.clase} aún no está publicada (Theomed la cuelga 1-3 días después de la clase): en su lugar, la ${g2.clase} (${corta(g2.de)}, ya publicada): su PPT (${r.ppt_min}′) + ${grabMin}′ de tramos útiles a 2×, y los PPT de ${r.ppt.filter((x) => x !== pptG).map((x) => x.clase).join(', ')} igual (${r.ppt_min}′ c/u) = ${G.minutosFranja(fr(ini, fin))}′. La ${ps.clase} (PPT + grabación) pasa al ${corta(ps.fecha)} a las ${ps.hora}, al hueco que deja la ${g2.clase}. Si algún otro PPT aún no está, sus ${r.ppt_min}′ van a la grabación.`;
  }
  // el ENCAPS opcional del MISMO domingo (si lo hay: modo simulacro) va después de la recuperación
  const conOpcional = !d.modo || d.modo === 'simulacro';
  const [ejI, ejF] = d.franja_ejemplo || ['08:00', '12:00'];
  if (conOpcional && aMin(ejI) < aMin(fin)) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional (${ejI}) empieza antes de que termine la recuperación (${fin})`);
  // v6.09 (17-nov): domingo de llegada → la mañana es libre; los PPT de clases POSTERIORES a este domingo van en el ENCAPS del domingo siguiente que los lleva (domingos[].ppt)
  const sigPPT = J.domingos.filter((x) => x.fecha > d.fecha && x.ppt).flatMap((x) => x.ppt.clases.filter((c) => c.de > d.fecha).map((c) => ({ ...c, dom: x.fecha })));
  // v6.09b: el domingo de llegada lleva también la revisión semanal (30′ antes) y el SYNAPSE de recuperación (al terminar): bloques propios (rutinaGuia)
  const llegadaTxt = d.llegada ? ` Domingo de llegada: la mañana es libre (viaje); desde las ${d.llegada}, de vuelta: ${hhmm(aMin(ini) - 30)} la revisión semanal, ${ini}-${fin} esta recuperación y, al terminar, el SYNAPSE de recuperación (bloques propios); nada de estudio desde las 17:00.` : '';
  const sigTxt = sigPPT.map((c) => ` El PPT de ${c.clase} (clase en vivo del ${corta(c.de)}, después de hoy) va el dom ${Number(c.dom.slice(8))}, primer paso de su ENCAPS del domingo.`).join('');
  GR[d.fecha] = guia(fr(ini, fin), `ENCAPS · RECUPERACIÓN DEL VIAJE (fija) · grabación ${r.grabacion.clase} + ${r.ppt.length} PPT en diferido`, pasos, [R99],
    `${r.grabacion.clase} vista en sus tramos útiles y los ${r.ppt.length} PPT leídos, con las notas en forma de pregunta`, {
      aviso: `Fijo, no opcional: recupera lo de la semana del viaje.${llegadaTxt} Los PPT que las notas de esos días mandan a este domingo van aquí (${r.ppt.map((x) => x.clase).join(' · ')}).${sigTxt}${conOpcional ? ` Después, el ENCAPS opcional${d.simulacro ? ` (simulacro${d.ranking ? ' con RANKING' : ''})` : ''}, de ejemplo ${ejI}-${ejF}.` : ''}`,
      planB: `${planBTxt.trim()}${planBTxt ? ' ' : ''}Si ${d.llegada ? 'llegas tarde o ' : ''}no llegas a todo: primero los ${r.ppt.length} PPT (${r.ppt.length * r.ppt_min}′); la grabación, en audio en tiempos muertos de la semana.`,
    });
  REC_PPT_MIN.push(r.ppt.length * r.ppt_min);
  REC[d.fecha] = { fecha: d.fecha, ini, fin, nombre: `ENCAPS · recuperación del viaje (fija): grabación ${r.grabacion.clase} + ${r.ppt.length} PPT en diferido`, tema: `Grabación ${r.grabacion.clase} a 2× en sus tramos útiles + PPT ${r.ppt.map((x) => x.clase).join(' · ')}`, clases: r.ppt.map((x) => x.clase), motivo: r.motivo, ...(d.llegada ? { llegada: d.llegada } : {}) };
}
for (const d of J.domingos.filter((x) => !x.modo || x.modo === 'simulacro')) {
  if (!d.simulacro) aborta(`domingo ${d.fecha}: modo simulacro sin «simulacro»`);
  // v6.09 (fix revisión 16-nov, joseph 4): hora de EJEMPLO del ENCAPS opcional (franja_ejemplo; dom 29-nov, tras la recuperación fija y antes del
  //   compromiso personal) · por defecto 08:00-12:00 como siempre
  // v6.09 (fix 2, 16-nov noche): la recuperación del dom 29-nov pasa a 07:15-08:45 (tras la rutina) → su ejemplo, 08:45-12:15 = 3 h 30: un franja_ejemplo
  //   de 3 h 30-4 h RECORTA solo la corrección (80′ → 50′; lo que no se corrija, a la revisión del sábado) y el bloque dice su duración real
  // v6.09b (17-nov · a1-1): PRIMER PASO NO OPCIONAL que alarga el bloque (domingos[].previo: dom 3-ene, el Banqueo 9/19 grabado, 58′ a 1,25× con pausa,
  //   que ya no cabía en la mañana del jue 31-dic): el simulacro opcional va detrás, en lo que queda de la franja de ejemplo (y su corrección se recorta)
  const [ejI, ejF] = d.franja_ejemplo || ['08:00', '12:00'];
  const pv = d.previo || null;
  if (pv && (!pv.motivo || !Array.isArray(pv.items) || !pv.items.length || !pv.de)) aborta(`domingo ${d.fecha}: previo sin motivo / items / de (la mañana de la que viene)`);
  const pvU = pv ? pv.items.flatMap((it) => unidades({ ...it, fecha: d.fecha })) : [];
  if (pvU.some((u) => u.tipo !== 'activo')) aborta(`domingo ${d.fecha}: previo solo admite banqueos grabados (modo activo)`);
  const pvMin = pvU.reduce((a, u) => a + u.min, 0);
  const minEj = G.minutosFranja(fr(ejI, ejF));
  if (d.compromiso && aMin(d.compromiso) < aMin(ejF)) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional (${ejF}) termina después del compromiso (${d.compromiso})`);
  if (aMin(ejI) < aMin('07:15') && aMin(ejF) > aMin('05:45')) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional ${ejI}-${ejF} pisa la rutina de la mañana (05:45-07:15)`);
  // v6.09 (17-nov): PPT en diferido como PRIMER PASO (no opcional) del ENCAPS del domingo (domingos[].ppt; dom 29-nov: SP 2/11, clase del lun 23, que ya no
  //   cabe en la recuperación del dom 22 por ser posterior a ella). Sus minutos salen de la corrección (como el recorte por compromiso): v6.09b, PPT = 10′ → 80′ → 70′
  const pp = d.ppt || null;
  if (pp && (!Array.isArray(pp.clases) || !pp.clases.length || !(pp.min > 0) || !pp.motivo)) aborta(`domingo ${d.fecha}: ppt sin clases / min / motivo`);
  if (pp && pp.min !== PPT_MIN) aborta(`domingo ${d.fecha}: ppt.min ${pp.min}′ ≠ ${PPT_MIN}′ (_meta.reglas_tiempo.ppt_min)`);
  for (const c of pp ? pp.clases : []) if (!COD_CLASE.test(c.clase) || !/^20\d\d-\d\d-\d\d$/.test(c.de) || c.de >= d.fecha) aborta(`domingo ${d.fecha}: ppt › «${c.clase}» del ${c.de}: clase o fecha no válida (tiene que ser anterior al domingo)`);
  // v6.09b: los primeros pasos NO opcionales (banqueo previo y PPT) ALARGAN el bloque; el simulacro (4 h) va en lo que queda de la franja de ejemplo y,
  //   si no cabe entero, se recorta SOLO la corrección (≤ 30′; antes el PPT salía de la corrección: 80′ → 75′). La corrección dice cuántas preguntas
  //   corrige (0,85′ c/u) y adónde van las demás, con fecha.
  const pptTot = pp ? pp.min * pp.clases.length : 0, recorte = 240 + pvMin + pptTot - minEj, corr = 80 - recorte;
  if (recorte < 0 || recorte > 30) aborta(`domingo ${d.fecha}: franja_ejemplo ${ejI}-${ejF} (${minEj}′${pvMin + pptTot ? `, ${pvMin + pptTot}′ de primeros pasos no opcionales` : ''}) deja para el simulacro ${minEj - pvMin - pptTot}′: debe estar entre 3 h 30 y 4 h`);
  // la corrección cubre las 100 si su ratio cabe en la tolerancia (100 × 0,85′ ≤ corr × 1,15: ≥ 74′); si no, dice cuántas corrige y adónde van las demás
  const nCorr = 100 * CORR_Q <= corr * 1.15 ? 100 : Math.floor(corr / CORR_Q);
  if (corr < 50) aborta(`domingo ${d.fecha}: la corrección del simulacro queda en ${corr}′ (< 50′) con el recorte (${recorte}′) y los PPT (${pptTot}′)`);
  const pptNom = pp ? pp.clases.map((c) => c.clase).join(' y ') : '';
  const pvNom = pv ? pv.items.map((x) => x.item.replace(/\s*\(.*\)$/, '')).join(' y ') : '';
  const noOpc = [pv ? `el ${pvNom} (${pvMin}′, en activo)` : '', pp ? `el PPT de ${pptNom} (${pptTot}′)` : ''].filter(Boolean).join(' y ');
  const noOpcDe = [pv ? `no cupo en la mañana del ${corta(pv.de)}` : '', pp ? `diferido de la clase en vivo del ${pp.clases.map((c) => corta(c.de)).join(' y ')}` : ''].filter(Boolean).join('; ');
  const pptAviso = noOpc ? `salvo su primer paso: ${noOpc}, ${noOpcDe}` : null;
  const motRec = recorte ? (d.compromiso ? 'recortada: hay un compromiso' : pv ? `recortada: el ${pvNom} va antes` : 'recortada') : '';
  DOM[d.fecha] = { fecha: d.fecha, simulacro: d.simulacro, ranking: !!d.ranking, modo: 'simulacro',
    nombre: pv ? `ENCAPS · domingo ${fmtMin(minEj)} (flexible): ${pvNom} (NO opcional) + simulacro 100Q opcional${d.ranking ? ' · RANKING Theomed' : ''}`
      : `ENCAPS · opcional ${fmtMin(minEj)} (flexible): ${pp ? `PPT ${pptNom} (no opcional) + ` : ''}simulacro 100Q + corrección${d.ranking ? ' · RANKING Theomed' : ''}`,
    hora: `flexible · ${fmtMin(minEj)}`, min: minEj,
    sub: `${pv ? `flexible · primero el ${pvNom} (${pvMin}′, NO opcional) · después, opcional: ` : `opcional y flexible · ${pp ? `primero el PPT de ${pptNom} (${pptTot}′, no opcional) · ` : ''}`}2 h de simulacro + ${fmtMin(minEj - pvMin - 120 - pptTot)} de corrección${motRec ? ` (${motRec})` : pptTot ? ` (${corr}′ de corrección en vez de 80′)` : ''}${d.ranking ? ' · RANKING: primer intento dentro de 89 h desde el viernes 16:00' : ''}`,
    etiqueta: pv ? `ENCAPS · domingo ${fmtMin(minEj)} (${pvNom} + simulacro 100Q opcional)` : `ENCAPS · domingo opcional ${fmtMin(minEj)} (${pp ? `PPT ${pptNom} + ` : ''}simulacro 100Q)`,
    tema: d.simulacro, campus: /^Theomed/.test(d.simulacro) ? 'simulacros' : null,
    ...(noOpc ? { ppt: [...(pv ? [pvNom] : []), ...(pp ? pp.clases.map((c) => c.clase) : [])], pptAviso } : {}) };
  const theomed = /^Theomed/.test(d.simulacro);
  const num = (/DR LOPEZ simulacro (\d+)/.exec(d.simulacro) || [])[1];
  const ruta = theomed ? 'Campus › curso 105 (SIMULACROS MEDICINA 2027) › el simulacro indicado' : `${RUTA.drLopezSim} › ${num ? `${num}.° simulacro` : 'simulacro'} (versión SIN claves; la de claves, solo para corregir)`;
  GD[d.fecha] = guia(fr(ejI, ejF), pv ? `ENCAPS · DOMINGO (sin hora fija) · ${pvNom} (NO opcional) + simulacro 100Q OPCIONAL + corrección` : `ENCAPS · OPCIONAL ${fmtMin(minEj)} (sin hora fija) · ${pp ? `PPT ${pptNom} + ` : ''}simulacro 100Q + corrección`, [
    ...pvU.map((u) => P(u.min, `${u.que(u.min)} · NO opcional`, `${u.como} Aunque hoy descanses del simulacro, este banqueo sí: no cupo en la mañana del ${corta(pv.de)}.`, u.enlace)),
    ...(pp ? pp.clases.map((c) => P(pp.min, `PPT de ${c.clase} (${corta(c.de)}, en diferido) · NO opcional`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(c.clase))}. Aunque hoy descanses del simulacro, este PPT sí: es el diferido de su clase en vivo.`, L99)) : []),
    P(10, `Preparar: ${d.simulacro}`, `Ruta: ${ruta}. Sin reloj a la vista, móvil fuera, hoja de respuestas si puedes.`, theomed ? L105 : undefined),
    P(120, 'SIMULACRO 100Q · 2 h sin parar', 'Primero las básicas e intermedias; marca las dudosas y vuelve al final. Ninguna en blanco: no restan. 72 s por pregunta, con 10-15′ de reserva.'),
    P(15, 'Pausa', 'De pie, agua, sin pantalla.'),
    P(corr, nCorr < 100 ? `Corrección: las primeras ${nCorr} de las 100 (cada error y cada dudosa) → ${corr}′` : 'Corrección: cada error y cada dudosa', `${cap(TIPOS_ERROR)} + verificación en la norma.${nCorr < 100 ? ` Hoy ${corr}′ (en vez de 80′${pv ? `: el ${pvNom} va antes` : ''}; ${String(CORR_Q).replace('.', ',')}′ por pregunta): primero las «seguras» falladas; las ${100 - nCorr} que no llegues a corregir, a la revisión del ${revSab(d.fecha)}.` : ''}`),
    P(15, 'Registro', `Nota (aciertos × 0,2), % por área y errores repetidos. Va a la revisión del ${revSab(d.fecha)}.`),
  ], [...(pp ? [R99] : []), ...(pv ? [R116] : []), ...(theomed ? [R105] : [])], `${pv ? `${pvNom} hecho en activo, con los fallos en el registro (no opcional) · ` : ''}${pp ? `PPT de ${pptNom} leído, con las notas en forma de pregunta (no opcional) · ` : ''}simulacro hecho en 2 h y corregido, con la nota en el registro (o descanso: es opcional)`, {
    aviso: `${noOpc ? 'Flexible' : 'Opcional y flexible'}: a la hora que puedas (${ejI}-${ejF} es solo un ejemplo${REC[d.fecha] ? `: hoy va después de la recuperación FIJA de las ${REC[d.fecha].ini}-${REC[d.fecha].fin}` : ''}${d.compromiso ? ` y termina antes del compromiso personal de las ${d.compromiso}` : ''}). ${noOpc ? `El primer paso NO es opcional: ${noOpc}, ${noOpcDe}; aunque descanses del simulacro, hazlo. ` : ''}Si vas atrasado, usa estas horas para lo pendiente de la semana.${d.ranking ? ' RANKING: cuenta el primer intento dentro de 89 h desde el viernes 16:00 → hoy, de un tirón.' : ''}`,
    planB: theomed ? `Si ese simulacro no está: uno antiguo del campus que no hayas hecho, o uno de DR LOPEZ (${RUTA.drLopezSim}).` : 'Si prefieres descansar antes de la intensiva, descansa: es opcional.',
  });
}

// v6.09b (a1-6): CONTROL DEL THEOESENCIAL — por área, las páginas de las sesiones que van en VÍDEO (páginas del área ÷ sesiones × sesiones en vídeo;
//   las de texto primero ya lo leen en su ÷ 3) = las que lleva algún ítem «theoesencial» de las mañanas + las que _meta.theoesencial.fuera_f1 manda
//   con fecha a F2 (días de LOOP de la intensiva: encapsGuia.encapsF2De). Nada se queda sin fecha.
{
  const EGI = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'));
  const video = {}, puestas = {};
  for (const dia of J.mananas) for (const t of [...dia.teoria, ...(dia.a_las_18 || [])]) {
    if (t.modo === 'theoesencial') puestas[t.area] = (puestas[t.area] || 0) + t.paginas;
    const s = /^(SP|CI|GES|INV|ET) S(\d)(?:-S?(\d))?\b/.exec(t.item);
    if (s && t.modo === 'video') video[s[1]] = (video[s[1]] || 0) + Number(s[3] || s[2]) - Number(s[2]) + 1;
  }
  for (const x of (J._meta.theoesencial && J._meta.theoesencial.fuera_f1) || []) {
    if (!AREA[x.area] || !(x.p > 0) || !x.destino || !Array.isArray(x.fechas) || !x.fechas.length) aborta(`_meta.theoesencial.fuera_f1 ${x.area}: área, p, destino y fechas obligatorios`);
    for (const f of x.fechas) { const r = EGI.encapsF2De(f); if (!r || !r.loop) aborta(`_meta.theoesencial.fuera_f1 ${x.area}: ${f} no es un día de LOOP de la intensiva (DEEP PRIME)`); }
    puestas[x.area] = (puestas[x.area] || 0) + x.p;
  }
  for (const a of Object.keys(N_SES)) {
    const req = Math.round(THEO_P_AREA[a] * (video[a] || 0) / N_SES[a]);
    if ((puestas[a] || 0) !== req) aborta(`Theoesencial de ${a}: las sesiones en vídeo piden ${req} p (${THEO_P_AREA[a]} p × ${video[a] || 0}/${N_SES[a]}) y el JSON pone ${puestas[a] || 0} (mañanas + fuera_f1)`);
  }
}

// ── validación de todas las guías ─────────────────────────────────────────────────────────────────────────────
const TODAS = [...Object.entries(GM).flatMap(([f, gs]) => gs.map((g) => [f, g])), ...Object.entries(GT), ...Object.entries(GA), ...Object.entries(GSP), ...Object.entries(GSV), ...Object.entries(GD), ...Object.entries(GR)];
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
const M = Object.fromEntries(J.mananas.map((d) => [d.fecha, { fecha: d.fecha, n: d.n, de: NM, fase: d.fase, teoria: d.teoria, banqueo: d.banqueo, norma: d.norma, extra: d.extra, resumen: RESUMEN[d.fecha], pendiente18: (MD[d.fecha] && MD[d.fecha].tarde.map((u) => u.postTest || u.que)) || [], ...(EXTRA.has(d.fecha) ? { diaExtra: EXTRA.get(d.fecha) } : {}), ...(DOM_PLAN.has(d.fecha) ? { domingoPlan: DOM_PLAN.get(d.fecha) } : {}), ...(DOM_PLAN_H.has(d.fecha) ? { domingoPlanHoras: { manana: DOM_PLAN_H.get(d.fecha).manana, que: QUE_TRAMOS[d.fecha], tarde: DOM_PLAN_H.get(d.fecha).tarde, compromiso: DOM_PLAN_H.get(d.fecha).compromiso } } : {}) }]));
const META = {
  version: J._meta.version, decidido: J._meta.decidido, fechas: F6.version, fuente: J._meta.fuente, mananas: NM,
  primera: J.mananas[0].fecha, ultima: J.mananas[NM - 1].fecha, ultimaF1: J.mananas.filter((d) => !EXTRA.has(d.fecha)).at(-1).fecha, extra: [...EXTRA.keys()], domingosPlan: [...DOM_PLAN.keys()], protocolo: J._meta.protocolo_manana, campus: CAMPUS,
  reglas: `vídeo ÷ 1,75 (÷ 2 si la mañana dice «2×») × ${String(PAUSA).replace('.', ',')} (pausas) · texto primero ÷ 3 (+${PDF_P}′/página de PDF) · banqueo grabado activo ÷ ${String(VEL_ACTIVO).replace('.', ',')} × ${String(PAUSA).replace('.', ',')} · Theoesencial = páginas × ${THEO_P}′ · PPT de clase en vivo = ${PPT_MIN}′ · normas / hoja de reglas = su duración · clase en diferido = ${pct100(VIVO_FRAC)} de la clase a ${vel(VIVO_VEL)} (si la mañana no da, lo que falta en audio, explícito) · corrección = ${String(CORR_Q).replace('.', ',')}′ por pregunta · lo que no cabe en 07:30-09:15 → 18:00 del mismo día (v6.09b)`,
};
const tabla = new Map();
const walk = (v) => { if (typeof v === 'string') { if (v.length >= 30) tabla.set(v, (tabla.get(v) || 0) + 1); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
const GUIAS = { GM, GT, GA, GSP, GSV, GD, GR }; // v6.09 (fix revisión, joseph 4): + GR (recuperación fija del domingo)
walk(GUIAS);
const T = [...tabla].filter(([, n]) => n >= 2).map(([s]) => s);
const idx = new Map(T.map((s, i) => [s, i]));
const rep = (v) => (typeof v === 'string' ? (idx.has(v) ? { $: idx.get(v) } : v) : Array.isArray(v) ? v.map(rep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rep(x)])) : v);

const ts = `/**
 * encapsManana.ts — ${J._meta.version} · MAÑANAS ENCAPS de F1 (lun · mié · vie 07:15-12:00, ${NM} mañanas: ${corta(META.primera)} → ${corta(META.ultima)}${DOM_PLAN.size ? `; domingo de plan: ${[...DOM_PLAN.keys()].map(corta).join(' · ')}` : ''}${EXTRA.size ? `; fuera de F1: ${[...EXTRA.keys()].map(corta).join(' · ')}` : ''}) + su hora de las 18:00
 * («cifras, normas y flashcards»; flexible el domingo de plan) + los repasos ENCAPS del Anki 05:00 (v6.09b: 05:20-05:45 lun · mié · vie y jue 31-dic, 05:30-05:45 mar · jue; antes 05:30-05:45, todos los días de plan de F1${HAB_TRANS.length ? ` y ${HAB_TRANS.map(corta).join(' · ')}` : ''}) + la clase EN VIVO de
 * Theomed del sábado (14:45 preparar · 15:00-17:00 en vivo; F1, transición y, desde la v6.08, los sábados de F2 9-ene → 6-mar) + el ENCAPS
 * OPCIONAL del domingo (4 h, flexible: la franja 08:00-12:00 de su guía es solo un ejemplo). Formato común «qué · cuánto · cómo» (GuiaBloque, src/lib/guia.ts). Lo pintan el Home (TodayMission, bloques encaps-am ·
 * encaps-pm · theomed-prep · theomed-vivo · encaps-dom de plantillasV6) y el bloque Anki de las 05:00.
 * GENERADO por DATA/_scripts/gen_encaps_manana.js desde DATA/ENCAPS/_encaps_manana_v607.json (+ duración exacta de cada sesión asíncrona:
 * DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md §1.3) — NO editar a mano: node DATA/_scripts/gen_encaps_manana.js (· --check compara).
 * Plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md §3-§7. Fechas: _fechas_v6.json ${F6.version} (las mañanas = días de F1 sin Step 1).
 * Reglas del «cuánto»: ${META.reglas}.
 * Enlaces SOLO al campus de Theomed (cursos 99, 105, 116); el material de academias del Drive se nombra por su ruta, sin enlace.
 */
import type { GuiaBloque } from './guia';

/** v6.09b: + Theoesencial (modo 'theoesencial': paginas, de, resto) · clase en diferido por debajo del 60 % (min) · alternativa (plan B con fecha) */
export interface EncapsTeoria { item: string; area: string; duracion: string; modo: string; velocidad?: string; codigos?: string[]; paginas?: number; de?: string; resto?: string; min?: number; alternativa?: string }
export interface EncapsMananaDia {
  fecha: string; n: number; de: number; fase: 'recuperacion' | 'ciclo' | 'cierre'; teoria: EncapsTeoria[];
  banqueo: { area: string; n: number; cronometrado?: boolean; /** v6.09b: otra franja del banqueo (mar 5-ene: 09:45-10:57, la de la fila D34 ya sembrada) */ franja?: [string, string] }; norma: string | null; extra: string | null;
  /** texto corto para el Home: teoría + banqueo */
  resumen: string;
  /** lo que no cupo en 07:30-09:15 y va a las 18:00 del mismo día (v6.08: + lo que va directo a las 18:00 de un día extra) */
  pendiente18: string[];
  /** v6.08: mañana fuera de F1 (v6.09: jue 31-dic, día de plan que recupera el lun 16 · mar 5-ene, en lugar del calentamiento I-3 de la intensiva): el motivo */
  diaExtra?: string;
  /** v6.09: mañana de un DOMINGO DE PLAN de F1 (dom 27-dic: ya no cabía entre semana): el motivo */
  domingoPlan?: string;
  /** v6.09 (fix revisión 16-nov): horas FIJAS del domingo de plan: TRAMOS de la mañana (las 7 franjas repartidas; fix 2: dom 27-dic 04:15-05:45 +
   *  07:15-10:30, sin tocar la rutina de 05:45-07:15) y qué lleva cada tramo · sus cifras, normas y flashcards al terminar (10:30-11:15) · hora del
   *  compromiso personal de ese día (para el margen) */
  domingoPlanHoras?: { manana: [string, string][]; que: string[]; tarde: [string, string]; compromiso: string | null };
}
/** v6.09 (fix revisión 16-nov): bloque ENCAPS FIJO de recuperación de un domingo tras el viaje: grabación de la clase perdida + PPT en diferido.
 *  v6.09 (17-nov): DOMINGO DE LLEGADA (dom 22-nov, sigue sin sesión en corrida_s1): «llegada» = hora a la que se vuelve (14:00); la recuperación va después (15:00-16:30). */
export interface EncapsRecupera { fecha: string; ini: string; fin: string; nombre: string; tema: string; clases: string[]; motivo: string; llegada?: string }
export interface TheomedSabado { fecha: string; vivo: string | null; area: string | null }
/** v6.07d: modo del domingo + lo que pinta la app (nombre, hora y minutos del bloque, sub, etiqueta del briefing, tema y botón del campus). */
export interface EncapsDomingo {
  fecha: string; simulacro: string | null; ranking: boolean;
  modo: 'simulacro' | 'banqueos' | 'simulacro_2h' | 'banqueos_correccion';
  nombre: string; hora: string; min: number; sub: string; etiqueta: string; tema: string; campus: 'simulacros' | 'adicionales' | null;
  /** v6.09 (17-nov): PPT en diferido que van como PRIMER PASO (no opcional) de este ENCAPS del domingo (dom 29-nov: SP 2/11) y la frase para la nota del día */
  ppt?: string[]; pptAviso?: string;
}

export const ENCAPS_MANANA_META = ${JSON.stringify(META, null, 2)};

const M: Record<string, EncapsMananaDia> = ${JSON.stringify(M)};
const SAB: Record<string, TheomedSabado> = ${JSON.stringify(SAB)};
const DOM: Record<string, EncapsDomingo> = ${JSON.stringify(DOM)};
const REC: Record<string, EncapsRecupera> = ${JSON.stringify(REC)};

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
  GSP: Record<string, GuiaBloque>; GSV: Record<string, GuiaBloque>; GD: Record<string, GuiaBloque>; GR: Record<string, GuiaBloque>;
};

const k = (iso: string): string => iso.slice(0, 10);
/** Mañana ENCAPS de F1 (lun · mié · vie) · v6.08: + los días extra fuera de F1 (jue 31-dic · mar 5-ene; diaExtra) · null si ese día la mañana es del Step 1 o no hay plan. */
export function encapsMananaDe(iso: string): EncapsMananaDia | null { return M[k(iso)] ?? null; }
/** Las 7 franjas de la mañana ENCAPS (07:15-12:00; el mié 30-dic, simulacro de cierre) · [] si no hay. */
export function guiaEncapsMananaDe(iso: string): GuiaBloque[] { return GU.GM[k(iso)] ?? []; }
/** v6.09 (fix 2, 16-nov): las franjas de la mañana ENCAPS que EMPIEZAN dentro de [ini, fin) — el domingo de plan en tramos (dom 27-dic) lleva un bloque
 *  del Home por tramo (encaps-am · encaps-am2) · sin ini o fin, todas. */
export function guiaEncapsMananaEnRango(iso: string, ini?: string | null, fin?: string | null): GuiaBloque[] {
  const gs = guiaEncapsMananaDe(iso);
  if (!ini || !fin) return gs;
  const m = (h: string): number => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));
  return gs.filter((g) => { const a = m(g.franja.slice(0, 5)); return a >= m(ini) && a < m(fin); });
}
/** 18:00-18:45 «ENCAPS · cifras, normas y flashcards» (con lo pendiente de la mañana si lo hay). */
export function guiaEncapsTardeDe(iso: string): GuiaBloque | null { return GU.GT[k(iso)] ?? null; }
/** Repasos ENCAPS tras el Anki USMLE, todos los días de plan de F1: v6.09b 05:20-05:45 (Cifras + Flashcards + APEX::ENCAPS) lun · mié · vie y jue 31-dic · 05:30-05:45 mar · jue. */
export function guiaEncapsAnkiDe(iso: string): GuiaBloque | null { return GU.GA[k(iso)] ?? null; }
/** Sábado de F1 + transición + F2 (v6.08: 9-ene → 6-mar, sin el 13-mar protegido): la clase EN VIVO de Theomed (vivo = null → ese sábado no hay clase) · null fuera de ese rango. */
export function theomedSabadoDe(iso: string): TheomedSabado | null { return SAB[k(iso)] ?? null; }
/** 14:45-15:00 · preparar la clase en vivo del sábado (en F2, plantillasV6 solo la pinta si el carril SÁBADO no ocupa esa franja). */
export function guiaTheomedPrepDe(iso: string): GuiaBloque | null { return GU.GSP[k(iso)] ?? null; }
/** 15:00-17:00 · THEOMED EN VIVO. */
export function guiaTheomedVivoDe(iso: string): GuiaBloque | null { return GU.GSV[k(iso)] ?? null; }
/** Domingo de F1 + transición: el simulacro del ENCAPS opcional (4 h, flexible). */
export function encapsDomingoDe(iso: string): EncapsDomingo | null { return DOM[k(iso)] ?? null; }
/** Guía del ENCAPS opcional del domingo (sin hora fija: la franja 08:00-12:00 es solo un ejemplo). */
export function guiaEncapsDomingoDe(iso: string): GuiaBloque | null { return GU.GD[k(iso)] ?? null; }
/** v6.09 (fix revisión 16-nov): bloque ENCAPS FIJO de recuperación del domingo (v6.09, 17-nov: dom 22-nov 15:00-16:30, domingo de llegada —antes dom 29 07:15-08:45—: grabación de la ET 2/3 + PPT en diferido) · null si no hay. */
export function encapsRecuperaDe(iso: string): EncapsRecupera | null { return REC[k(iso)] ?? null; }
/** Guía de ese bloque (hora fija). */
export function guiaEncapsRecuperaDe(iso: string): GuiaBloque | null { return GU.GR[k(iso)] ?? null; }
export const ENCAPS_MANANA_FECHAS: string[] = Object.keys(M);

/** Mínimo de cada bloque ENCAPS nuevo según el modo del día (PROTOCOLO_MODO_MINIMO; null = intacto). La mañana ENCAPS es el bloque
 *  PRINCIPAL de lun · mié · vie: en ÁMBAR va entera; en ROJO conserva su mínimo y la teoría se recupera el domingo (ENCAPS opcional). */
export const ENCAPS_MINIMO: Record<string, { AMBAR: string | null; ROJO: string | null }> = {
  'encaps-am': { AMBAR: null, ROJO: 'Solo el arranque en frío (07:15) + 10Q ciegas del tema de hoy. El resto = dormir/recuperar; la teoría de hoy va al domingo (ENCAPS opcional).' },
  'encaps-pm': { AMBAR: "15': solo las flashcards (vencidas + 15 nuevas).", ROJO: 'Omitido hoy.' },
  'theomed-prep': { AMBAR: 'Omitido hoy: entra directo a la clase.', ROJO: 'Omitido hoy.' },
  'theomed-vivo': { AMBAR: null, ROJO: 'En vivo, omitida: la grabación cuando te recuperes (domingo o en audio).' },
  'encaps-rec': { AMBAR: null, ROJO: 'Solo los PPT en diferido (${REC_PPT_MIN.length && REC_PPT_MIN.every((x) => x === REC_PPT_MIN[0]) ? REC_PPT_MIN[0] + '′' : 'sus minutos'}); la grabación, en audio en tiempos muertos de la semana.' },
  // v6.09 (fix 2): 2.º tramo de la mañana de un domingo de plan en tramos (dom 27-dic 07:15-10:30)
  'encaps-am2': { AMBAR: null, ROJO: 'Solo el post-test + 10Q ciegas del tema de hoy y sus tarjetas. El resto = dormir/recuperar.' },
};
`;

if (INFORME) {
  for (const g of [...(GA[INFORME] ? [GA[INFORME]] : []), ...(GM[INFORME] || []), ...(GT[INFORME] ? [GT[INFORME]] : []), ...(GSP[INFORME] ? [GSP[INFORME]] : []), ...(GSV[INFORME] ? [GSV[INFORME]] : []), ...(GR[INFORME] ? [GR[INFORME]] : []), ...(GD[INFORME] ? [GD[INFORME]] : [])]) {
    console.log(`\n${g.franja} (${g.totalMin}′) · ${g.titulo}${g.aviso ? `\n  ⚠ ${g.aviso}` : ''}`);
    for (const p of g.pasos) console.log(`  ${String(p.min).padStart(3)}′ ${p.que}\n        ${p.como}`);
  }
}
const resumen = `${NM} mañanas (${Object.values(GM).reduce((a, g) => a + g.length, 0)} franjas) · ${Object.keys(GT).length} tardes 18:00 (${Object.values(MD).filter((x) => x.tarde.length).length} con pendiente de la mañana) · ${Object.keys(GA).length} Anki 05:30 · ${Object.keys(GSV).length} sábados en vivo · ${Object.keys(GD).length} domingos · ${Object.keys(GR).length} recuperación(es) fija(s) de domingo`;
if (AVISOS.length) console.warn(`⚠ ${AVISOS.length} aviso(s):\n  ` + AVISOS.join('\n  '));
if (CHECK) {
  const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (actual !== ts) { console.error(`✗ src/lib/encapsManana.ts no coincide con lo que genera gen_encaps_manana.js (${resumen}) — regenera: node DATA/_scripts/gen_encaps_manana.js`); process.exit(1); }
  console.log(`✓ gen_encaps_manana --check: src/lib/encapsManana.ts al día · ${resumen} · validarGuia OK · enlaces solo del campus`);
} else {
  fs.writeFileSync(OUT, ts);
  console.log(`✓ escrito src/lib/encapsManana.ts · ${resumen}`);
}
