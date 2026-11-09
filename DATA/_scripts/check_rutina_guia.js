// check_rutina_guia.js — verifica las guías «qué · cuánto · cómo» de src/lib/rutinaGuia.ts (v6.02c, 18-oct-2026, E5) para TODOS los días
// de los planes vibecoding · SYNAPSE · AURUM · LIVIANO · Business · revisión semanal · SHIP del sábado · Feynman del domingo.
//
// Comprueba (sale con código 1 si algo falla):
//   · validarGuia (src/lib/guia.ts) en cada bloque: Σ pasos = totalMin = minutos de la franja, pasos con qué/cómo, minutos enteros ≥ 1,
//     URLs con esquema válido, «hecho» no vacío;
//   · COBERTURA: cada fila de cada plan tiene su guía (vibecoding L-V · SYNAPSE L-V + sábados con PC/ABC · AURUM · LIVIANO · Business
//     L-V con lectura/OUTPUT —el OUTPUT de un viernes de NBME aparece el sábado— · revisión de cada sábado de F1);
//   · la franja de cada guía cae donde dice la decisión de carga (Business 13:00 o 12:30 en NBME · SYNAPSE 12:30 / 07:25 UWSA1 / 13:00 NBME);
//   · (v6.03) la curaduría de la semana 1 cae en su paso / pieza / fila del plan.
// Uso:
//   node DATA/_scripts/check_rutina_guia.js                         # verificación completa
//   node DATA/_scripts/check_rutina_guia.js --informe 2026-11-02 2026-11-14   # además imprime la tabla día × franja (markdown)
// v6.03 (20-oct-2026): las expectativas de franja ya no están cableadas a la semana del lun 19-oct: salen del plan (D1, UWSA1/NBME,
//   1.er OUTPUT de Business, 1.er sábado ≥ D1) + comprobación de que la curaduría de la semana 1 (vibeS1 · SYN_CUR_PIEZAS · BIZ_TRAMO)
//   aterriza en su paso / pieza / fila del plan corrido (v6.03: mié 21-oct → sáb 31-oct).
// v6.05 (24-oct-2026, D1 = lun 26-oct): sin fechas nuevas cableadas — las expectativas siguen saliendo del plan. Cambios: (1) el rango verificado
//   llega hasta el último día de los 7 planes (AURUM termina el mar 4-may-2027; antes el tope fijo 1-may dejaba fuera D129-D130); (2) los
//   comodines curados del sábado se esperan donde los pone la regla nueva de rutinaGuia («1.er sábado tras su pieza», prioridad a la curaduría
//   original): sáb 31-oct = No Priors + «Prompt injection…»; el deep dive + trifecta solo si su sábado es otro (v6.03: sáb 24); (3) el SYNAPSE de
//   TODOS los NBME de F1 a las 13:00 (v6.05: vie 6-nov · vie 27-nov · vie 18-dic · mié 30-dic), no solo el primero.
// v6.05 (fix 24-oct, verificación adversarial): + controles que habrían detectado cada fallo — SIMULACIÓN DEL DÍA (plantillaDelDia + contenido
//   de cada bloque, sáb 24-oct-2026 → examen + 5 días; F4 con turno sin marcar · T · L · G): sin solapes, sin bloques de plan vacíos, guías
//   dentro de su bloque, AURUM de F4 sin chocar con bloques con hora, SYNAPSE 13:00 los días del ENCAPS 11:00-13:00, ENCAPS sin «HOY» antes del
//   D1 · comodines del deep dive + trifecta en el 1.er sábado LIBRE (v6.05: sáb 7-nov) retomando en su minuto · guiaShipDe nombra todas las
//   piezas PC del sábado · vibecoding: ship = pcSab y ningún PC en día protegido. plantillasV6/encapsPlan se cargan con stubs para los imports
//   no relativos (react, supabase).
// v6.06 (31-oct-2026, D1 = lun 2-nov): las expectativas siguen saliendo del plan (UWSA1 lun 2-nov 07:25 · NBME vie 13-nov / vie 4-dic / vie 18-dic /
//   mié 30-dic 13:00 · 1.er OUTPUT vie 6-nov · comodines sáb 7-nov = No Priors + Willison y sáb 14-nov = deep dive + trifecta). Cambios: (1) un sábado
//   del SYNAPSE que solo trae el bloque R de «día protegido» (sáb 13-mar-2027: SYNAPSE y vibecoding ya llegan a la semana del ENCAPS) no exige guía
//   del sábado; (2) ningún plan de este checker tiene fila en un día PROTEGIDO (salvo ese bloque R de 0′) y lo que no cupo antes del ENCAPS (SYNAPSE
//   mar 16-mar · vibecoding mar 16 → vie 19-mar) tiene bloque y guía en F3 (la simulación lo cubre); (3) un OUTPUT de Business en el viernes del
//   SIM 100Q de las 11:00 de F2 (vie 26-feb) va entero al sábado 09:15-09:55, como el de un viernes de NBME.
// v6.06 (fix 31-oct-2026): (1) la simulación del día llega hasta max(examen + 5, última fila de MIR_MANT_DIAS) — v6.06: vie 5-nov-2027, las 9 repuestas
//   MIR tras el Step 1 (antes paraba el sáb 30-oct y no veía las del 1 al 5-nov); (2) toda sesión MIR (mirSesionDe) tiene su bloque MIR y en F5 la
//   nota «el banqueo MIR … ya cerró» solo sale sin filas MIR posteriores; (3) ningún bloque nombra una fase del régimen distinta de la del día (salvo
//   «REPOSICIÓN F1» de lo que se repone) — «SYNAPSE · 30' (cierre F2)» en F3; (4) AURUM en un día de hito USMLE (F1/F3) avisa del hito (por la mañana,
//   AURUM a su hora tras él) y, si los hay, del PITCH y del CHECKPOINT ENCAPS de ese día (D35 = PITCH v2, vie 18-dic: NBME 27 + CHECKPOINT DEL AÑO).
// v6.07 (dom 8-nov-2026, D1 = lun 9-nov · PLAN_PRIMER_PUESTO_2027-I): (1) el PC (SHIP del vibecoding) pasa al DOMINGO, flexible: guiaShipDe se
//   espera el domingo (ejemplo 15:00-17:00) y el Feynman a las 14:50; el SYNAPSE A/B/C del sábado sale de guiaSynapseDe (13:30 en F1 y la transición ·
//   15:00 en F2/F3) — cobertura, curaduría y comodines se buscan ahí; (2) revisión del sábado 14:00 y cierre Business 14:30 (OUTPUT entero → 17:15)
//   en F1 y la transición; (3) SIMULACIÓN: plantilla v6.07 de F1 — lun · mié · vie = encaps-am 07:15-12:00 (7 franjas contiguas de encapsManana) +
//   encaps-pm 18:00, sin bloque USMLE principal ni eval · mar · jue = USMLE + eval, sin encaps-am/pm · Anki «USMLE 30′ + repasos ENCAPS 15′» ·
//   sábado: revisión 14:00, theomed-prep 14:45 + theomed-vivo 15:00-17:00 si hay clase, SYNAPSE 13:30, ningún PC el sábado · domingo: encaps-dom,
//   PC y Feynman FLEXIBLES (sin hora) y todo PC del vibecoding del domingo con bloque o nombrado en las notas · todo sábado con A/B/C tiene su
//   bloque SYNAPSE; (4) los bloques ENCAPS nuevos tienen guía (encapsManana) y entran en el control «guía dentro de su bloque».
// v6.07 (fix 8-nov-2026 · quincena final del ENCAPS, lun 1 → vie 5-mar-2027): (1) INTENSIVA ↔ PLANTILLA F2 leída del SQL sembrado
//   (_encaps_intensivo_2027.sql): SIM 100Q de las 11:00 = RG.SIM_F2_11 (los 5) · dress = D2_ENCAPS · quincena = SIM_QUINCENA_F2 + REPASO_QUINCENA_F2 ·
//   cada SIM a su hora (11:00 sin LOOP y con SYNAPSE 13:00) · repaso = «QUINCENA FINAL · REPASO» 07:15-12:00 · CARRIL B 16:15 ⇔ extra.carril_b con
//   ítems D{dia}:b_* en encapsPlan.itemsForDay (CARRIL VIERNES vie 5-mar = D82:b_*) · EVAL 18:00 de la quincena solo si la fila la trae; (2) LIVIANO:
//   toda sesión con su bloque 17:15-18:00, también en F3 (mar 16 → lun 22-mar); (3) 0 solapes Business ⟂ SYNAPSE (guías de todos los días y bloques
//   de la plantilla) · Business de un día con el ENCAPS 11:00 que no es viernes de OUTPUT a 14:45-15:10 (RG.BIZ_ENCAPS_11).
// v6.07 (fix 2, 8-nov-2026 · revisión independiente): la quincena / cola de rutinaGuia (quincenaF2De = regla del generador, COLA_F2) = el SQL · el
//   índice F2 de encapsGuia (encapsF2De) = el SQL · CARRIL B 16:15 ⇔ extra.carril_b con título del dato (MINI-SIM 25Q · CARRIL VIERNES) · todo L-J
//   repaso_final sin loop = REPASO sin EVAL · EVAL 18:00 de la quincena Y la cola ⇔ la fila la trae · corrección del SIM 100Q de las 11:00 con bloque
//   propio que nombra D{dia}:i_sim_corr (16:15 libre o 18:00) · EVAL ANCLADA tras un SIM de lun / mié sin rótulo de lunes / viernes · CARRIL SÁBADO a la
//   hora del SQL con Business detrás (y aviso en el viernes) · cierre de Business nunca en un día protegido / SKIP (va al día hábil de bizCierreDe y
//   el aviso del OUTPUT lo cita) · guiaBusinessDe(protegido / SKIP) = null.
// v6.07 (fix 3, 8-nov-2026 · 2.ª revisión): ENCAPS → Plan › Horario (EncapsPlanView.bloquesIntensivo, cargado con un export solo en memoria) = Home
//   en la corrección del simulacro de las 11:00, el carril B y la serie 07:15 de señales / repaso · corrección también en el D-2 · EVAL 18:00 ⇔
//   segmento 18:00 del loop en todo L-J de F2 (y señales = RE-SCAN) · «mini-sim absorbido» ⇔ extra.minisim_absorbido · cierre semanal en toda semana F2.
// Sin dependencias nuevas (typescript del repo vía usmle/cargar_ts.js). Solo lectura: no escribe nada.
'use strict';
const path = require('path');
const { cargarModuloTS } = require('./usmle/cargar_ts');

const argv = process.argv.slice(2);
const iInf = argv.indexOf('--informe');
const INF = iInf >= 0 ? [argv[iInf + 1], argv[iInf + 2] || argv[iInf + 1]] : null;

const cache = new Map();
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), cache);
const RG = cargarModuloTS(path.join('src', 'lib', 'rutinaGuia.ts'), cache);
const V = cargarModuloTS(path.join('src', 'lib', 'vibecodingPlan.ts'), cache);
const S = cargarModuloTS(path.join('src', 'lib', 'synapseDailyPlan.ts'), cache);
const A = cargarModuloTS(path.join('src', 'lib', 'aurumDailyPlan.ts'), cache);
const L = cargarModuloTS(path.join('src', 'lib', 'livianoStudyPlan.ts'), cache);
const B = cargarModuloTS(path.join('src', 'lib', 'businessStudyPlan.ts'), cache);

const addDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const dow = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();
const errores = [];
const cuenta = {};
const filas = [];
function revisar(nombre, iso, g) {
  if (!g) return;
  cuenta[nombre] = (cuenta[nombre] || 0) + 1;
  for (const e of G.validarGuia(g)) errores.push(`${iso} ${nombre} ${g.franja}: ${e}`);
  if (INF && iso >= INF[0] && iso <= INF[1]) filas.push({ iso, nombre, g });
}
const FUNCS = [
  ['vibecoding', RG.guiaVibeDe], ['synapse', RG.guiaSynapseDe], ['business', RG.guiaBusinessDe], ['aurum', RG.guiaAurumDe],
  ['liviano', RG.guiaLivianoDe], ['revision', RG.guiaRevisionDe], ['ship dom', RG.guiaShipDe], ['feynman dom', RG.guiaFeynmanDe],
];
// v6.05: FIN = último día de los planes de este checker (AURUM → mar 4-may-2027 en v6.05; antes el tope fijo '2027-05-01')
const ultimo = (xs) => (xs.length ? xs[xs.length - 1].fecha : '2027-05-01');
const INI = '2026-10-17';
const FIN = [ultimo(V.VIBE_DIAS), ultimo(S.SYN_DIAS), ultimo(A.AURUM_DIAS), ultimo(L.LIV_DIAS), ultimo(B.BIZ_DIAS), '2027-05-01'].sort().pop();
for (let iso = INI; iso <= FIN; iso = addDias(iso, 1)) for (const [n, f] of FUNCS) revisar(n, iso, f(iso));

// ── cobertura ──
const falta = (plan, iso, motivo) => errores.push(`${iso} ${plan}: SIN GUÍA (${motivo})`);
for (const x of V.VIBE_DIAS) if (!RG.guiaVibeDe(x.fecha)) falta('vibecoding', x.fecha, `d${x.d}`);
for (const x of S.SYN_DIAS) {
  const w = dow(x.fecha);
  if (w >= 1 && w <= 5 && x.bloques.some((b) => /^[ABC]$/.test(b.tag)) && !RG.guiaSynapseDe(x.fecha)) falta('synapse', x.fecha, `d${x.d}`);
  // v6.06: un sábado PROTEGIDO del SYNAPSE (solo el bloque R de 0′, sáb 13-mar-2027) no tiene guía del sábado (ni PC)
  // v6.07: el sábado = A/B/C (guiaSynapseDe); el PC (SHIP del vibecoding) es el DOMINGO (guiaShipDe) — un domingo con solo PC de 0′ no tiene guía
  if (w === 6 && x.bloques.some((b) => /^[ABC]$/.test(b.tag)) && !RG.guiaSynapseDe(x.fecha)) falta('synapse sáb', x.fecha, `d${x.d}`);
  if (w === 0 && x.bloques.some((b) => b.tag === 'PC' && b.min > 0) && !RG.guiaShipDe(x.fecha)) falta('ship dom', x.fecha, `d${x.d}`);
  if (w === 0 && x.bloques.some((b) => b.tag === 'R' && b.min >= 10 && /^Feynman/.test(b.material)) && !RG.guiaFeynmanDe(x.fecha)) falta('feynman dom', x.fecha, `d${x.d}`);
}
for (const x of A.AURUM_DIAS) if (!RG.guiaAurumDe(x.fecha)) falta('aurum', x.fecha, `D${x.d}`);
for (const x of L.LIV_DIAS) if (!RG.guiaLivianoDe(x.fecha)) falta('liviano', x.fecha, `D${x.d}`);
for (const x of B.BIZ_DIAS) {
  const m = B.bizModo(x);
  if (m === 'DESCANSO') continue;
  const hoy = RG.guiaBusinessDe(x.fecha);
  const sabado = addDias(x.fecha, 6 - dow(x.fecha));
  // v6.07 (fix H5): el cierre del OUTPUT va el sábado o, si el sábado es PROTEGIDO / SKIP, el día hábil que da bizCierreDe (mié 10-mar 13:00)
  const cierre = m === 'OUTPUT' ? RG.bizCierreDe(sabado) : null;
  const sab = cierre ? RG.guiaBusinessDe(cierre.fecha) : null;
  if (!hoy && !sab) falta('business', x.fecha, `D${x.d} ${m}`);
  if (m === 'OUTPUT' && (!sab || sab.franja !== `${cierre.ini}–${cierre.fin}`)) falta('business', cierre ? cierre.fecha : sabado, `cierre del OUTPUT D${x.d}${sab ? ` (franja ${sab.franja} ≠ ${cierre.ini}–${cierre.fin})` : ''}`);
}
// v6.03 (20-oct-2026): las fechas de las expectativas SALEN DEL PLAN (D1 = f1.inicio, UWSA1/NBME de usmleStep1Daily, OUTPUT de Business,
// 1.er sábado ≥ D1) en vez de estar cableadas a la semana del lun 19-oct (v6.02); así el checker sigue valiendo si el plan vuelve a correr.
const FV = cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'), cache);
const U = cargarModuloTS(path.join('src', 'lib', 'usmleStep1Daily.ts'), cache);
const D1 = FV.FECHAS_V6.f1.inicio;
const SAB1 = addDias(D1, (6 - dow(D1) + 7) % 7);           // 1.er sábado desde el D1 (v6.03: sáb 24-oct)
const HITOS_F1 = U.DIAS.filter((x) => U.esHito(x));
const UWSA1 = (HITOS_F1.find((x) => /Self-Assessment 1|UWSA1/.test(x.uw)) || {}).fecha;
const NBMES = HITOS_F1.filter((x) => !/Self-Assessment|UWSA/.test(x.uw) && /NBME/.test(x.uw)).map((x) => x.fecha);
const habilSig = (iso) => { let c = addDias(iso, 1); while (dow(c) === 0 || dow(c) === 6 || HITOS_F1.some((h) => h.fecha === c)) c = addDias(c, 1); return c; };
const OUT1 = (B.BIZ_DIAS.find((x) => B.bizModo(x) === 'OUTPUT') || {}).fecha; // 1.er OUTPUT (v6.03: vie 23-oct)
if (!UWSA1 || !NBMES.length || !OUT1) errores.push(`plan sin UWSA1 (${UWSA1}) / NBME (${NBMES.length}) / OUTPUT (${OUT1}): no se pueden derivar las expectativas`);
for (let iso = SAB1; iso <= '2026-12-26'; iso = addDias(iso, 7)) if (!RG.guiaRevisionDe(iso)) falta('revision', iso, 'sábado de F1');

// ── franjas de las decisiones de carga (semana 1 + hitos) ──
// v6.07: sábado de F1 y transición (RG.sabadoTheomed) = revisión 14:00 · Business 14:30 (OUTPUT entero → 17:15) · SYNAPSE 13:30; F2/F3 = 07:15 · 09:15 · 15:00
const bizSab = (sab, entero) => (RG.sabadoTheomed(sab) ? (entero ? '17:15–17:55' : '14:30–14:45') : FV.faseV6(sab) === 'F2' ? (entero ? '09:15–09:55' : '09:15–09:30') : (entero ? '07:45–08:25' : '07:45–08:00'));
const SAB_F2_ABC = (S.SYN_DIAS.find((d) => dow(d.fecha) === 6 && FV.faseV6(d.fecha) === 'F2' && d.bloques.some((b) => /^[ABC]$/.test(b.tag))) || {}).fecha;
const esperado = [
  [UWSA1, RG.guiaSynapseDe, '07:25–07:55'], [habilSig(UWSA1), RG.guiaSynapseDe, '12:30–13:00'], ...NBMES.map((n) => [n, RG.guiaSynapseDe, '13:00–13:30']),
  [D1, RG.guiaBusinessDe, '13:00–13:25'], [OUT1, RG.guiaBusinessDe, '13:00–13:25'], [addDias(OUT1, 1), RG.guiaBusinessDe, bizSab(addDias(OUT1, 1), false)],
  [addDias(SAB1, 1), RG.guiaShipDe, '15:00–17:00'], [addDias(SAB1, 1), RG.guiaFeynmanDe, '14:50–15:00'], [SAB1, RG.guiaSynapseDe, '13:30–14:00'],
  ...(SAB_F2_ABC ? [[SAB_F2_ABC, RG.guiaSynapseDe, '15:00–15:30'], [SAB_F2_ABC, RG.guiaRevisionDe, '07:15–07:45']] : []),
  [SAB1, RG.guiaRevisionDe, '14:00–14:30'], [D1, RG.guiaAurumDe, '14:15–15:15'], [D1, RG.guiaLivianoDe, '17:15–18:00'],
  [D1, RG.guiaVibeDe, '04:15–05:00'],
];
// Business en día de NBME (F1): lectura → audio 12:30-12:55 en el almuerzo · OUTPUT → entero el sábado 07:45-08:25 (v6.02: vie 30-oct)
for (const n of NBMES) {
  const r = B.bizDiaDe(n);
  if (!r || B.bizModo(r) === 'DESCANSO') continue;
  if (B.bizModo(r) === 'OUTPUT') esperado.push([addDias(n, 6 - dow(n)), RG.guiaBusinessDe, bizSab(addDias(n, 6 - dow(n)), true)]);
  else esperado.push([n, RG.guiaBusinessDe, '12:30–12:55']);
}
// v6.06: OUTPUT de Business en un viernes con el ENCAPS 11:00-13:00 de F2 (SIM #7, vie 26-feb) → entero el sábado 09:15-09:55 (F2) y nada ese viernes
// v6.07 (fix): solo en VIERNES (v6.07: vie 19-feb · vie 26-feb · vie 5-mar); un día con el ENCAPS 11:00-13:00 que no es viernes de OUTPUT (SIM lun 1 /
//   mié 3-mar de la quincena, D-2) lleva Business a 14:45-15:10 (RG.BIZ_ENCAPS_11), fuera del SYNAPSE 13:00-13:30
const BIZ11 = `${RG.BIZ_ENCAPS_11.ini}–${RG.BIZ_ENCAPS_11.fin}`;
// v6.07 (fix H6): si ese sábado tiene el CARRIL SÁBADO ENCAPS (09:30-10:30, hora del SQL) el OUTPUT entero va al terminar el carril (10:30-11:10)
const EGc = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'), cache);
const hm1 = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const hh1 = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
for (const x of B.BIZ_DIAS.filter((r) => B.bizModo(r) !== 'DESCANSO' && RG.encapsOnceATrece(r.fecha))) {
  if (B.bizModo(x) === 'OUTPUT' && dow(x.fecha) === 5) {
    const sabX = addDias(x.fecha, 6 - dow(x.fecha)), cs = EGc.encapsSabadoDe(sabX);
    esperado.push([sabX, RG.guiaBusinessDe, cs && hm1(cs.ini) < hm1('09:15') + 40 ? `${cs.fin}–${hh1(hm1(cs.fin) + 40)}` : '09:15–09:55']);
    if (RG.guiaBusinessDe(x.fecha)) errores.push(`${x.fecha} guiaBusinessDe: OUTPUT en viernes de SIM 100Q 11:00 → debe ir entero al sábado (hoy sin guía)`);
  } else esperado.push([x.fecha, RG.guiaBusinessDe, BIZ11]);
}
// v6.07 (fix): 0 solapes Business ⟂ SYNAPSE (guías) en TODOS los días de los planes (antes de la v6.07 fix el lun 1 y el mié 3-mar-2027 los dos iban
//   a las 13:00 si el SYNAPSE se movía por el SIM de las 11:00)
{
  const hm0 = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const fr = (g) => { const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec((g && g.franja) || ''); return m ? [hm0(m[1]), hm0(m[2])] : null; };
  let nBS = 0;
  for (let iso = INI; iso <= FIN; iso = addDias(iso, 1)) {
    const b = fr(RG.guiaBusinessDe(iso)), s = fr(RG.guiaSynapseDe(iso));
    if (!b || !s) continue;
    nBS++;
    if (b[0] < s[1] && s[0] < b[1]) errores.push(`${iso} Business ${RG.guiaBusinessDe(iso).franja} ⟂ SYNAPSE ${RG.guiaSynapseDe(iso).franja}`);
  }
  console.log(`Business ⟂ SYNAPSE: ${nBS} día(s) con los dos, 0 solapes esperados`);
}
// v6.06: ningún plan de este checker en un día PROTEGIDO (el SYNAPSE solo con su bloque R de 0′)
{
  const PROT = new Set(FV.FECHAS_V6.protegidos.map((p) => p.fecha));
  for (const [n, xs] of [['vibecoding', V.VIBE_DIAS], ['aurum', A.AURUM_DIAS], ['liviano', L.LIV_DIAS], ['business', B.BIZ_DIAS.filter((r) => B.bizModo(r) !== 'DESCANSO')]]) for (const x of xs) if (PROT.has(x.fecha)) errores.push(`${x.fecha} ${n}: fila en día PROTEGIDO`);
  for (const x of S.SYN_DIAS) if (PROT.has(x.fecha) && x.bloques.some((b) => b.tag !== 'R' || b.min > 0)) errores.push(`${x.fecha} synapse: A/B/C/PC en día PROTEGIDO`);
  // v6.07 (fix H5): guiaBusinessDe(protegido / SKIP) = null (antes el sáb 13-mar, D-1 ENCAPS, llevaba el cierre de los OUTPUT D120 / D121) y el cierre
  //   de una semana cuyo sábado es protegido / SKIP va a un día hábil entre el último OUTPUT y ese sábado, nunca protegido ni SKIP, con su guía, y el
  //   aviso del OUTPUT lo cita («25′ hoy + 15′ el mié 10-mar 13:00»)
  const SKIPc = new Set(FV.FECHAS_V6.skip);
  for (const pr of [...PROT, ...SKIPc]) { const g = RG.guiaBusinessDe(pr); if (g) errores.push(`${pr} guiaBusinessDe: Business ${g.franja} en un día ${PROT.has(pr) ? 'PROTEGIDO' : 'SKIP'}`); }
  let nMov = 0;
  const sabs = [...new Set(B.BIZ_DIAS.filter((r) => B.bizModo(r) === 'OUTPUT').map((r) => addDias(r.fecha, 6 - dow(r.fecha))))];
  for (const sb of sabs) {
    const c = RG.bizCierreDe(sb);
    if (!c) { errores.push(`${sb}: semana con OUTPUT sin cierre (bizCierreDe = null)`); continue; }
    if (PROT.has(c.fecha) || SKIPc.has(c.fecha)) errores.push(`${sb}: el cierre de la semana cae el ${c.fecha}, día ${PROT.has(c.fecha) ? 'PROTEGIDO' : 'SKIP'}`);
    if (c.fecha === sb) continue;
    nMov++;
    const ult = c.outs.map((o) => o.r.fecha).sort().pop();
    if (!(c.fecha > ult && c.fecha < sb) || [0, 6].includes(dow(c.fecha))) errores.push(`${sb}: cierre movido al ${c.fecha}, fuera de (último OUTPUT ${ult}, sábado) o en fin de semana`);
    const g = RG.guiaBusinessDe(c.fecha);
    if (!g || g.franja !== `${c.ini}–${c.fin}` || !/PROTEGIDO/.test(g.aviso || '')) errores.push(`${c.fecha} guiaBusinessDe: cierre movido sin guía ${c.ini}–${c.fin} o sin el aviso del sábado protegido (${g ? g.franja : '—'})`);
    const WDc = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], MESc = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const cita = `15′ el ${WDc[dow(c.fecha)]} ${Number(c.fecha.slice(8))}-${MESc[Number(c.fecha.slice(5, 7)) - 1]} ${c.ini}`;
    for (const o of c.outs.filter((o) => !o.entero)) { const go = RG.guiaBusinessDe(o.r.fecha); if (!go || !(go.aviso || '').includes(cita)) errores.push(`${o.r.fecha} guiaBusinessDe D${o.r.d}: el aviso del OUTPUT no cita «${cita}» (cierre movido)`); }
  }
  console.log(`Business en días protegidos / SKIP: 0 esperado · ${sabs.length} semana(s) con OUTPUT · ${nMov} cierre(s) movido(s) a un día hábil (sábado protegido / SKIP)`);
}
for (const [iso, f, fr] of esperado) { const g = f(iso); if (!g || g.franja !== fr) errores.push(`${iso} ${f.name}: franja ${g ? g.franja : 'null'} ≠ ${fr}`); }
// v6.06 (fix): AURUM en un día de HITO USMLE de F1/F3 (filas 🎯 de DIAS + DIAS_T2; en F4 el hito se reordena por turno) → la guía lo avisa en su 1.er
//   aviso (hito por la mañana · AURUM a su hora, tras el hito) y nombra el PITCH y el CHECKPOINT ENCAPS de ese día si los hay (v6.06: D35 vie 18-dic)
{
  const EG = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'), cache);
  let nHitoAurum = 0;
  for (const h of [...U.DIAS, ...U.DIAS_T2].filter((x) => U.esHito(x) && FV.faseV6(x.fecha) !== 'F4')) {
    const a = A.aurumDiaDe(h.fecha); if (!a) continue;
    nHitoAurum++;
    const g = RG.guiaAurumDe(h.fecha); const av = (g && g.aviso) || '';
    const hu = RG.hitoUsmleDe(h.fecha);
    if (!hu || !av.startsWith(`Hoy ${hu.nombre}`) || !/tras el hito/.test(av) || (hu.franja && !av.includes(hu.franja)) || (g && !av.includes(g.franja))) errores.push(`${h.fecha} guiaAurumDe D${a.d}: día de hito USMLE (${hu ? hu.nombre : h.sub.slice(0, 30)}) sin el aviso «hito por la mañana · AURUM ${g ? g.franja : ''} tras el hito»`);
    if (a.pitch && !new RegExp(`PITCH v${a.pitch} HOY`).test(av)) errores.push(`${h.fecha} guiaAurumDe D${a.d}: PITCH v${a.pitch} en día de hito sin avisarlo`);
    const enc = EG.guiaEncapsDe(h.fecha);
    if (enc && /CHECKPOINT/.test(enc.titulo) && !/CHECKPOINT DEL AÑO de ENCAPS/.test(av)) errores.push(`${h.fecha} guiaAurumDe D${a.d}: CHECKPOINT ENCAPS ${enc.franja} el mismo día del hito sin avisarlo`);
  }
  console.log(`AURUM en día de hito USMLE (F1/F3): ${nHitoAurum} día(s) con el aviso comprobado`);
}
if (RG.revisionFicheroDe(SAB1) !== `S01_${SAB1}.md`) errores.push(`revisionFicheroDe(${SAB1}) = ${RG.revisionFicheroDe(SAB1)} ≠ S01_${SAB1}.md`);
if (!/^Primera revisión/.test((RG.guiaRevisionDe(SAB1) || {}).aviso || '')) errores.push(`${SAB1} guiaRevisionDe: no la marca como la PRIMERA revisión`);

// ── v6.03: la curaduría de la semana 1 va con su PASO / PIEZA / FILA del plan (no con la fecha) → comprobar que aterriza ──
const conTexto = (g, re) => !!g && g.pasos.some((p) => re.test(p.que) || re.test(p.como));
const vibeS1 = V.VIBE_DIAS.filter((x) => x.semana === 1);
const curVibe = [/test_parser_multilinea/, /Redeploy: pegar n8n_parser_v2_3/, /APEX::USMLE::<sistema>/, /_apex_e2e_prueba\.json/, /Commit \[S1\]/];
vibeS1.forEach((x) => { if (!conTexto(RG.guiaVibeDe(x.fecha), curVibe[x.k - 1])) errores.push(`${x.fecha} guiaVibeDe: falta la curaduría del paso ${x.k} de S1`); });
const primeraSyn = (re, tag) => (S.SYN_DIAS.find((d) => d.bloques.some((b) => b.tag === tag && re.test(b.material + ' ' + b.leccion))) || {}).fecha;
const curSyn = [
  [primeraSyn(/^Anthropic Academy AUDITORÍA F0/, 'A'), /auditoría F0/], [primeraSyn(/^No Priors/, 'B'), /Greg Brockman/], [primeraSyn(/^Pro Git/, 'C'), /Pro Git › 1\.1/],
  [primeraSyn(/^Dwarkesh — Dario Amodei Tramo 1\/3/, 'B'), /tramo 1\/3 = minutos 0:00-10:00/], [primeraSyn(/^Simon Willison — serie Prompt injection/, 'C'), /Prompt injection attacks against GPT-3/],
  [primeraSyn(/^The Python Tutorial.*Sección 1:/, 'C'), /Whetting Your Appetite/], [primeraSyn(/^The Batch/, 'B'), /carta de Ng/], [primeraSyn(/^Automate the Boring Stuff.*cap\. 0:/, 'C'), /cap\. 0 «Introduction»/],
  [primeraSyn(/^Canal Anthropic.*deep dive.*tramo 1\b/, 'B'), /minutos 0:00-10:00/], [primeraSyn(/^Simon Willison The lethal trifecta/i, 'C'), /lethal trifecta/],
];
for (const [iso, re] of curSyn) { const g = iso && RG.guiaSynapseDe(iso); if (!conTexto(g, re)) errores.push(`${iso} SYNAPSE: falta la curaduría ${re}`); } // v6.07: el sábado también sale de guiaSynapseDe
// v6.05: comodines = el 1.er sábado tras su pieza, con prioridad para la curaduría original (No Priors + «Prompt injection…»); el deep dive y la
//   trifecta del viernes solo si su sábado es OTRO (v6.03: sáb 24 = deep dive + trifecta y sáb 31 = No Priors + Willison · v6.05: sáb 31 = No Priors + Willison)
const sabTras = (iso) => iso && addDias(iso, ((6 - dow(iso) + 6) % 7) + 1);
const SAB_NP = sabTras(primeraSyn(/^No Priors/, 'B'));
const SAB_DD0 = sabTras(primeraSyn(/^Canal Anthropic.*deep dive.*tramo 1\b/, 'B'));
// v6.05 (fix): si el 1.er sábado tras el deep dive ya lo ocupa la curaduría original, sus comodines van al SIGUIENTE sábado (v6.05: sáb 7-nov)
const SAB_DD = SAB_DD0 === SAB_NP ? addDias(SAB_DD0, 7) : SAB_DD0;
// v6.07: los comodines del sábado están en guiaSynapseDe (el PC pasó al domingo)
if (!conTexto(RG.guiaSynapseDe(SAB_NP), /Greg Brockman/) || !conTexto(RG.guiaSynapseDe(SAB_NP), /Prompt injection attacks/)) errores.push(`${SAB_NP} guiaSynapseDe: faltan los comodines curados de la curaduría original (No Priors + «Prompt injection…»)`);
if (!conTexto(RG.guiaSynapseDe(SAB_DD), /deep dive.*minutos \d+:00-\d+:00/) || !conTexto(RG.guiaSynapseDe(SAB_DD), /lethal trifecta/)) errores.push(`${SAB_DD} guiaSynapseDe: faltan los comodines curados del deep dive + trifecta (1.er sábado LIBRE tras la pieza)`);
if (SAB_DD0 === SAB_NP && conTexto(RG.guiaSynapseDe(SAB_NP), /deep dive.*minutos/)) errores.push(`${SAB_NP} guiaSynapseDe: el comodín del deep dive pisa al de No Priors`);
// v6.05 (fix): el deep dive retoma donde quedó (tramos de 10′ ya vistos antes del sábado): con el tramo 2 del vie 6-nov → minutos 20:00-30:00
{
  const tramos = S.SYN_DIAS.filter((d) => d.fecha < SAB_DD && dow(d.fecha) >= 1 && dow(d.fecha) <= 5).reduce((a, d) => a + d.bloques.filter((b) => b.tag === 'B' && /AI prompt engineering: A deep dive/.test(b.leccion)).length, 0);
  if (!conTexto(RG.guiaSynapseDe(SAB_DD), new RegExp(`deep dive.*minutos ${10 * tramos}:00-${10 * tramos + 10}:00`))) errores.push(`${SAB_DD} guiaSynapseDe: el comodín del deep dive no retoma en el minuto ${10 * tramos} (${tramos} tramos vistos)`);
}
// v6.05 (fix): la guía del PC nombra TODAS las piezas PC de ese día (v6.07: el DOMINGO — dom 7-mar-2027: S16 30′ + S17 0′). Un domingo con solo
//   piezas de 0′ no tiene guía: lo nombran las notas de la plantilla (lo comprueba la simulación del día)
for (const x of S.SYN_DIAS.filter((d) => dow(d.fecha) === 0)) {
  const g = RG.guiaShipDe(x.fecha);
  if (!g) continue;
  const txt = [g.titulo, g.aviso || '', ...g.pasos.map((p) => p.que)].join(' ');
  for (const pc of V.vibePCDomingo(x.fecha)) if (!new RegExp(`S${pc.s}\\b`).test(txt)) errores.push(`${x.fecha} guiaShipDe: no nombra la pieza PC de S${pc.s} (${pc.tipo})`);
}
// v6.05 (fix): vibecoding — ship = pcSab (alineados) y ningún PC en un día protegido (S20: pcSab '' = sin PC)
{
  const PROT = new Set(FV.FECHAS_V6.protegidos.map((p) => p.fecha));
  for (const x of [...V.VIBE_PROYECTOS, ...V.VIBE_TAPER]) {
    if (x.pcSab && x.pcSab !== x.ship) errores.push(`vibecoding S${x.s}: ship ${x.ship} ≠ pcSab ${x.pcSab} (desalineados)`);
    if (x.pcSab && PROT.has(x.pcSab)) errores.push(`vibecoding S${x.s}: PC el ${x.pcSab}, día PROTEGIDO`);
  }
  for (const p of PROT) if (V.vibePCDomingo(p).length) errores.push(`vibecoding: vibePCDomingo(${p}) trae PC en un día PROTEGIDO`);
}
const lect = B.BIZ_DIAS.filter((x) => B.bizModo(x) === 'L' || B.bizModo(x) === 'CRITICA').slice(0, 4);
// LIVIANO: la lectura medida (LIV_LECT) va con su TEMA / CASO, no con el D (v6.03: los casos caen D3/D8/D13 en vez de D5/D10/D15)
const livTema = (re) => L.LIV_DIAS.find((x) => re.test(x.tema));
[[/^La obesidad como enfermedad/, /Essential Points › Definition/], [/^Leptina:/, /Neurobiology of energy homeostasis › Background/],
 [/^Resistencia leptínica/, /leptin resistance/], [/^VIERNES CASO 1\/16/, /Lessons learned from the weight-reduced state/],
 [/^Circuito arcuato II/, /2\.ª pasada: POMC/], [/^VIERNES CASO 2\/16/, /Determinants of feeding behavior/], [/^El argumento del tratamiento crónico/, /Developmental determinants/]]
  .forEach(([rt, re]) => { const x = livTema(rt); if (!x || !conTexto(RG.guiaLivianoDe(x.fecha), re)) errores.push(`${x ? x.fecha + ' D' + x.d : rt} guiaLivianoDe: falta la lectura medida ${re}`); });
[/In Spark/, /In Spark/, /In Defense of Food/, /In Defense of Food/].forEach((re, i) => { const x = lect[i]; if (!x || !conTexto(RG.guiaBusinessDe(x.fecha), re)) errores.push(`${x ? x.fecha : '?'} guiaBusinessDe: falta el tramo curado ${re} (lectura ${i + 1})`); });

// ── v6.05 (fix 24-oct): SIMULACIÓN DEL DÍA — plantillasV6.plantillaDelDia + contenido de cada bloque (réplica de TodayMission.contenidoBloque
//   para los frentes de este checker) desde el sáb 24-oct-2026 hasta 5 días tras el examen Step 1. Controles que habrían detectado los fallos de
//   la verificación adversarial: (a) SYNAPSE 12:30 ⟂ SIM 100Q 11:00-13:00 · (b) guía de AURUM a 14:15 en F4 (⟂ almuerzo/bloque B) · (f) R↔D ⟂
//   hito largo · (g) MIR en F5 sin sesión · (d) ENCAPS «HOY» antes del D1. Reglas: ningún solape entre bloques con hora (salvo tiempo muerto ⊂
//   posta, bloques de 0′ y el SYNAPSE del UWSA1 dentro de la preparación del hito, por diseño) · todo bloque de plan con contenido · la guía de
//   cada bloque de este checker dentro de su bloque (en F4, la de AURUM tras la del R↔D, sin chocar con ningún bloque con hora) · en F4 se
//   simulan el turno sin marcar (M) y T · L · G. plantillasV6 importa serumsTurnos → supabase: aquí los imports no relativos son stubs.
{
  const fs = require('fs');
  const ts = require(path.join(__dirname, '..', '..', 'node_modules', 'typescript'));
  const stub = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : k === '__esModule' ? true : stub()), apply: () => stub(), construct: () => stub() });
  if (!global.localStorage) { const mem = new Map(); global.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) }; }
  const cache2 = new Map();
  const cargarConStubs = (file) => {
    if (cache2.has(file)) return cache2.get(file).exports;
    const m = { exports: {} }; cache2.set(file, m);
    const req = (spec) => {
      if (!spec.startsWith('.')) return stub();
      let d = path.resolve(path.dirname(file), spec);
      for (const e of ['', '.ts', '.tsx']) if (fs.existsSync(d + e) && fs.statSync(d + e).isFile()) { d += e; break; }
      return d.endsWith('.json') ? JSON.parse(fs.readFileSync(d, 'utf8')) : cargarConStubs(d);
    };
    new Function('exports', 'module', 'require', ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText)(m.exports, m, req);
    return m.exports;
  };
  const LIB = (n) => cargarConStubs(path.join(__dirname, '..', '..', 'src', 'lib', n + '.ts'));
  const PL = LIB('plantillasV6'), RG2 = LIB('rutinaGuia'), G2 = LIB('guia'), MD2 = LIB('mirDailyPlan'), AU2 = LIB('aurumDailyPlan'), SY2 = LIB('synapseDailyPlan'),
    VB2 = LIB('vibecodingPlan'), LV2 = LIB('livianoStudyPlan'), F62 = LIB('fechasV6'), ST2 = LIB('serumsTurnos'), EP2 = LIB('encapsPlan'), EG2 = LIB('encapsGuia'),
    RD2 = LIB('researchDailyPlan'), R272 = LIB('researchDailyPlan2027'), DC2 = LIB('dermaCiclo2'), MM2 = LIB('mirMantenimiento'), EM2 = LIB('encapsManana');
  const hm = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const tmB = (b) => /tiempo muerto|guardia|cuando se pueda|^tarde$|descansos del hito|todo el día/i.test(b.hora);
  const WDC = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const avisosSim = [];
  const contenido = (b, iso) => {   // guías del bloque (null = SIN contenido) — mismas consultas que TodayMission.contenidoBloquePlan
    switch (b.plan) {
      case 'vibecoding': { const g = b.id === 'pc' ? RG2.guiaShipDe(iso) : b.id === 'feynman' ? RG2.guiaFeynmanDe(iso) : VB2.vibeDiaDe(iso) ? RG2.guiaVibeDe(iso) : null; return g ? [g] : null; }
      case 'synapse': { const g = SY2.synDiaDe(iso) ? RG2.guiaSynapseDe(iso) : null; return g ? [g] : null; }
      case 'business': { const g = RG2.guiaBusinessDe(iso); return g ? [g] : null; }
      case 'aurum': { const g = AU2.aurumDiaDe(iso) ? RG2.guiaAurumDe(iso, F62.faseV6(iso) === 'F4' ? b.ini : undefined) : null; return g ? [g] : null; }
      case 'liviano': { const g = LV2.livDiaDe(iso) ? RG2.guiaLivianoDe(iso) : null; return g ? [g] : null; }
      case 'revision': { const g = RG2.guiaRevisionDe(iso); return g ? [g] : null; }
      case 'mir': return MD2.mirSesionDe(iso) ? [] : null;
      case 'encaps': {
        // v6.07: bloques ENCAPS nuevos con su guía (encapsManana)
        if (b.id === 'encaps-am') { const gs = EM2.guiaEncapsMananaDe(iso); return gs.length ? gs : null; }
        if (b.id === 'encaps-pm') { const g = EM2.guiaEncapsTardeDe(iso); return g ? [g] : null; }
        if (b.id === 'theomed-prep') { const g = EM2.guiaTheomedPrepDe(iso); return g ? [g] : null; }
        if (b.id === 'theomed-vivo') { const g = EM2.guiaTheomedVivoDe(iso); return g ? [g] : null; }
        if (b.id === 'encaps-dom') { const g = EM2.guiaEncapsDomingoDe(iso); return g ? [g] : null; }
        return b.ini === '16:15' && F62.faseV6(iso) === 'F1' ? (EG2.sesionEncapsDe(iso) ? [] : null) : [];
      }
      case 'research-derma': return b.detalle || [...RD2.DIAS, ...R272.DIAS_2027].some((x) => x.fecha === iso) || DC2.dermaDiaDeConCiclo2(iso) ? [] : null;
      default: return [];  // usmle (lo verifica su propio ámbito) · serums · gimnasio · vida
    }
  };
  const examen = FV.FECHAS_V6.step1.examen;
  // v6.06 (fix): hasta la ÚLTIMA fila del banqueo MIR si va más allá de examen + 5 (v6.06: repuestas hasta el vie 5-nov-2027; antes paraba el sáb 30-oct)
  const MIR_FIN = MM2.MIR_MANT_DIAS.map((x) => x.fecha).sort().pop() || examen;
  const SIM_FIN = [addDias(examen, 5), MIR_FIN].sort().pop();
  const SIM_INI = '2026-10-24';
  const FASE_N = (f) => (/^F[1-5]$/.test(f) ? f : null);
  let nSim = 0;
  for (let iso = SIM_INI; iso <= SIM_FIN; iso = addDias(iso, 1)) {
    const f4 = F62.faseV6(iso) === 'F4';
    for (const turno of f4 ? [undefined, 'T', 'L', 'G'] : [undefined]) {
      ST2 && global.localStorage.removeItem(ST2.TURNOS_KEY);
      const p = PL.plantillaDelDia(iso, turno); nSim++;
      const tag = `${iso} ${WDC[dow(iso)]} ${p.plantilla}${turno ? '/' + turno : ''}`;
      const bs = p.bloques;
      // v6.06a: en un día de alias (semana corrida) el contenido es el de la FECHA DE PLAN del bloque (b.fechaPlan), como en TodayMission.contenidoBloque
      const fP = (p.corrida === 'alias' && bs[0] && bs[0].fechaPlan) || iso;
      const uwsa = (RG2.synFranjaDe(fP).franja || '').startsWith('07:25');
      for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
        const a = bs[i], c = bs[j];
        if (!a.ini || !a.fin || !c.ini || !c.fin || a.ini === a.fin || c.ini === c.fin || tmB(a) || tmB(c)) continue;
        if (!(hm(a.ini) < hm(c.fin) && hm(c.ini) < hm(a.fin))) continue;
        const par = [a, c];
        if (uwsa && par.some((b) => b.frente === 'usmle-principal') && par.some((b) => b.plan === 'synapse')) continue; // por diseño: la guía manda (07:25 entre las 2 partes de la prep)
        const msg = `${tag}: solape ${a.hora} ${a.nombre.slice(0, 38)} ⟂ ${c.hora} ${c.nombre.slice(0, 38)}`;
        if (turno === 'T' && par.some((b) => b.plan === 'serums') && par.some((b) => b.plan === 'usmle')) avisosSim.push(`${msg} — hito largo con turno T marcado: lo resuelve el motor de hitos (serumsTurnos.ordenSemanaDe, ámbito USMLE)`);
        else errores.push(msg);
      }
      for (const b of bs) {
        // v6.06a: réplica de TodayMission.contenidoBloque → se consulta en la fecha y hora de PLAN (b.fechaPlan, b.ini − b.desfaseMin) y la guía
        //   se mueve a la hora real con moverGuia (sin corrida: f = iso y d = 0, como antes)
        const f = b.fechaPlan || iso, d = b.desfaseMin || 0;
        const hh = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
        const bP = d && b.ini && b.fin ? { ...b, ini: hh(hm(b.ini) - d), fin: hh(hm(b.fin) - d) } : b;
        const gs0 = contenido(bP, f);
        const gs = gs0 && d ? gs0.map((g) => G2.moverGuia(g, d)) : gs0;
        if (gs === null) { errores.push(`${tag}: bloque ${b.hora} ${b.plan}/${b.id} SIN contenido (${b.nombre.slice(0, 50)})`); continue; }
        for (const g of gs) {
          const q = G2.partesFranja(g.franja); if (!q) continue;
          if (b.ini && b.fin && !tmB(b) && (hm(q.ini) < hm(b.ini) || hm(q.fin) > hm(b.fin))) errores.push(`${tag}: guía ${b.plan} ${g.franja} fuera de su bloque ${b.hora}`);
          if (b.ini && b.fin && tmB(b) && (hm(q.ini) < hm(b.ini) || hm(q.fin) > hm(b.fin))) errores.push(`${tag}: guía ${b.plan} ${g.franja} fuera de su ventana de tiempo muerto ${b.hora}`);
          if (b.plan === 'aurum' && f4) for (const o of bs) {
            if (o === b || !o.ini || !o.fin || o.ini === o.fin || tmB(o) || o.plan === 'serums') continue;
            if (hm(q.ini) < hm(o.fin) && hm(o.ini) < hm(q.fin)) errores.push(`${tag}: guía de AURUM ${g.franja} ⟂ ${o.hora} ${o.nombre.slice(0, 40)}`);
          }
        }
      }
      // v6.07 · plantilla de F1 / sábado / domingo (PLAN_PRIMER_PUESTO_2027-I §3) — solo días sin corrida y con turno por defecto
      if (!p.corrida && !turno) {
        const fase = F62.faseV6(iso), w = dow(iso);
        const B_ = (id) => bs.find((b) => b.id === id);
        const hora = (id) => { const b = B_(id); return b ? `${b.ini}–${b.fin}` : null; };
        if (fase === 'F1' && w >= 1 && w <= 5 && p.plantilla === 'F1') {
          const step = F62.esDiaStepF1(iso);
          if (step && (!B_('usmle') || !B_('eval') || B_('encaps-am') || B_('encaps-pm'))) errores.push(`${tag}: día de Step (mar · jue) sin USMLE 07:15 + eval 18:00, o con bloques ENCAPS de mañana/18:00`);
          if (!step) {
            if (B_('usmle') || B_('eval')) errores.push(`${tag}: día ENCAPS (lun · mié · vie) con bloque USMLE principal o eval`);
            if (hora('encaps-am') !== '07:15–12:00' || hora('encaps-pm') !== '18:00–18:45') errores.push(`${tag}: falta encaps-am 07:15-12:00 o encaps-pm 18:00-18:45 (hay ${hora('encaps-am')} / ${hora('encaps-pm')})`);
            const gs = EM2.guiaEncapsMananaDe(iso);
            let t = '07:15'; for (const g of gs) { const q = G2.partesFranja(g.franja); if (!q || q.ini !== t) { errores.push(`${tag}: la mañana ENCAPS tiene un hueco o solape en ${g.franja}`); break; } t = q.fin; }
            if (t !== '12:00') errores.push(`${tag}: la mañana ENCAPS no cubre 07:15-12:00 (termina ${t})`);
          }
          if (!B_('encaps') || hora('encaps') !== '16:15–17:15') errores.push(`${tag}: falta el ENCAPS 16:15 de la rotación F1`);
          const an = B_('anki'); if (!an || !/ENCAPS 15′/.test(an.nombre)) errores.push(`${tag}: el Anki 05:00 no dice «USMLE 30′ + repasos ENCAPS 15′»`);
        }
        if (w === 6 && RG2.sabadoTheomed(iso) && bs.length) {
          const viv = EM2.theomedSabadoDe(iso);
          if (hora('revision') !== '14:00–14:30') errores.push(`${tag}: revisión semanal ${hora('revision')} ≠ 14:00–14:30`);
          if (viv && viv.vivo && (hora('theomed-prep') !== '14:45–15:00' || hora('theomed-vivo') !== '15:00–17:00')) errores.push(`${tag}: clase en vivo «${viv.vivo}» sin theomed-prep 14:45 + theomed-vivo 15:00-17:00`);
          if ((!viv || !viv.vivo) && (B_('theomed-prep') || B_('theomed-vivo'))) errores.push(`${tag}: bloque de clase en vivo un sábado sin clase`);
          if (RG2.guiaSynapseDe(iso) && hora('syn') !== '13:30–14:00') errores.push(`${tag}: SYNAPSE del sábado ${hora('syn')} ≠ 13:30–14:00`);
        }
        if (w === 6 && B_('pc')) errores.push(`${tag}: bloque PC el sábado (v6.07: el SHIP del vibecoding es el domingo)`);
        if (w === 6 && SY2.synDiaDe(iso) && RG2.guiaSynapseDe(iso) && !B_('syn') && bs.length) errores.push(`${tag}: sábado con SYNAPSE A/B/C sin bloque SYNAPSE`);
        if (w === 0) {
          const pcs = VB2.vibePCDomingo(iso);
          if (RG2.guiaShipDe(iso) && (!B_('pc') || B_('pc').ini)) errores.push(`${tag}: el SHIP del domingo no tiene bloque PC flexible (sin hora)`);
          if (!B_('pc')) for (const x of pcs) if (!p.notas.some((n) => new RegExp(`S${x.s}\\b`).test(n)) && !F62.motivoProtegido(iso)) errores.push(`${tag}: PC de S${x.s} sin bloque ni nota`);
          if (EM2.encapsDomingoDe(iso) && (!B_('encaps-dom') || B_('encaps-dom').ini)) errores.push(`${tag}: falta el ENCAPS opcional del domingo (flexible, sin hora)`);
          if (B_('feynman') && B_('feynman').ini) errores.push(`${tag}: el Feynman del domingo tiene hora fija (v6.07: flexible)`);
        }
      }
      // (a) días con el ENCAPS 11:00-13:00 → SYNAPSE 13:00-13:30 (bloque y guía)
      if (!p.corrida && RG2.encapsOnceATrece(iso) && SY2.synDiaDe(iso) && ![0, 6].includes(dow(iso))) {
        const s = bs.find((b) => b.plan === 'synapse'); const g = RG2.guiaSynapseDe(iso);
        if (s && (s.hora !== '13:00–13:30' || !g || g.franja !== '13:00–13:30')) errores.push(`${tag}: SYNAPSE ${s.hora} / guía ${g ? g.franja : '—'} ≠ 13:00–13:30 (ENCAPS 11:00-13:00)`);
      }
      // v6.06 (fix) · toda sesión MIR tiene su bloque MIR (DJ-4) · F5: «el banqueo MIR … ya cerró» solo sin filas MIR posteriores (sáb 30-oct-2027)
      // v6.06a: un día corrido (sin_sesion) no trae bloques; en un día de alias la sesión MIR es la de la fecha de plan
      if (p.corrida !== 'sin_sesion' && p.corrida !== 'reparto' && MD2.mirSesionDe(fP) && !bs.some((b) => b.plan === 'mir')) errores.push(`${tag}: hay sesión MIR (mirSesionDe) y la plantilla no trae bloque MIR`);
      if (p.notas.some((n) => /banqueo MIR.*ya cerró/.test(n)) && MM2.MIR_MANT_DIAS.some((x) => x.fecha > iso)) errores.push(`${tag}: nota «el banqueo MIR … ya cerró» con filas MIR posteriores (hasta ${MIR_FIN})`);
      // v6.06 (fix) · ningún bloque nombra una FASE del régimen distinta de la del día (F3: «SYNAPSE · 30' (cierre F2)»); se permite «REPOSICIÓN F1»
      //   (lo de la F1 que se repone en el carril sábado de F2)
      for (const b of bs) {
        const m = /\bF([1-5])\b/.exec(b.nombre.replace(/REPOSICIÓN F\d\b/g, ''));
        if (m && `F${m[1]}` !== FASE_N(F62.faseV6(iso))) errores.push(`${tag}: el bloque «${b.nombre.slice(0, 60)}» nombra la fase F${m[1]} en un día de ${F62.faseV6(iso)}`);
      }
    }
  }
  global.localStorage.removeItem(ST2.TURNOS_KEY);
  // (d) ENCAPS antes del D1: el Home no tiene sesión (CORRIDO o sin bloque 16:15) y la vista no marca «HOY» (antesDelD1 = D1) · desde el D1, null
  for (let iso = addDias(D1, -2); iso <= D1; iso = addDias(iso, 1)) {
    const a = EP2.antesDelD1('ENCAPS', D1, iso);
    const enc = PL.plantillaDelDia(iso).bloques.some((b) => b.plan === 'encaps');
    if (iso < D1 && (a !== D1 || enc)) errores.push(`${iso} ENCAPS antes del D1: antesDelD1 = ${a} (≠ ${D1}) o el Home pinta un bloque ENCAPS`);
    // v6.06a: si el D1 cae en la semana corrida como día sin sesión, el bloque ENCAPS 16:15 lo pinta el día REAL del D1 (fechaRealDe)
    const d1Real = FV.fechaRealDe(D1, 'encaps');
    const encReal = PL.plantillaDelDia(d1Real).bloques.some((b) => b.plan === 'encaps');
    const aReal = EP2.antesDelD1('ENCAPS', D1, d1Real); // v6.06e: antesDelD1 compara días reales
    if (iso === D1 && (aReal !== null || (d1Real === D1 ? !enc : !encReal))) errores.push(`${iso} ENCAPS el D1: antesDelD1 = ${aReal} (debe ser null) o el Home no pinta el bloque 16:15 (día real ${d1Real})`);
  }
  // v6.07 (fix) · INTENSIVA ENCAPS ↔ PLANTILLA F2, leída del SQL sembrado (_encaps_intensivo_2027.sql = Supabase): (1) los SIM 100Q a las 11:00 del SQL
  //   = RG.SIM_F2_11 (v6.07: #6 vie 19 · #7 vie 26-feb · #8 lun 1 · #9 mié 3 · #10 vie 5-mar) y el dress = D2_ENCAPS; la quincena (extra.quincena) =
  //   SIM_QUINCENA_F2 + REPASO_QUINCENA_F2 (rutinaGuia.quincenaF2De = regla del generador) y la cola = COLA_F2; (2) cada SIM se pinta a SU hora (07:15-09:15
  //   + corrección 09:30 · 11:00-13:00 sin LOOP) con el SYNAPSE 13:00-13:30 los de las 11:00; (3) todo L-J con fila repaso_final SIN loop (quincena mar 2 ·
  //   jue 4 · cola D-4 / D-3 mar 9 · mié 10-mar) = REPASO 07:15-12:00 sin LOOP ni EVAL; (4) CARRIL B 16:15-17:15 (id 'carrilb') ⇔ la fila trae
  //   extra.carril_b, ENCAPS → Plan tiene sus ítems D{dia}:b_* (encapsPlan.itemsForDay), el viernes se llama «CARRIL VIERNES» y el pendiente mini_sim
  //   «MINI-SIM 25Q» (v6.07 fix H8: lun 22-feb · mar 2 · mié 10-mar, con D{dia}:b_msim); (5) en la quincena Y en la cola (L-J) la EVAL 18:00 ⇔ la
  //   fila trae el segmento de las 18:00 del loop (v6.07 fix H3: antes solo la quincena); (6) v6.07 fix H4: todo SIM 100Q de las 11:00 (y, desde el fix 3, el dress)
  //   tiene su bloque de corrección 'encaps-corr' que nombra el ítem D{dia}:i_sim_corr (y el ítem existe en itemsForDay): 16:15-17:15 si no hay carril
  //   B (vie 19 · 26-feb, con la EVAL 18:00 de cierre semanal) y 18:00-18:45 si lo hay (lun 1 · mié 3 · vie 5-mar, sin EVAL); (7) el índice F2 de
  //   encapsGuia (encapsF2De) = el SQL; (8) v6.07 fix H7: la EVAL ANCLADA del carril B tras un SIM de lun / mié no dice «(lunes)» ni «mini-sim de ese
  //   viernes absorbido»; (9) v6.07 fix H6: el CARRIL SÁBADO a la hora del SQL y Business ese sábado sin solape (tras el carril si no cabe antes);
  //   (10) LIVIANO: toda sesión (LIV_DIAS) con su bloque 17:15-18:00 —también las 5 de F3 (mar 16 → lun 22-mar-2027)—; (11) 0 solapes Business ⟂
  //   SYNAPSE en los bloques.
  //   v6.07 (fix 3, 2.ª revisión): (5) en TODO L-J de F2 la EVAL 18:00 ⇔ la fila trae el segmento de las 18:00 del loop, sin LOOP si la fila no trae
  //   loop y el día de señales = «RE-SCAN DE SEÑALES» (lun 4-ene se pintaba LOOP + EVAL); (6) también el dress rehearsal (D-2) tiene su corrección
  //   16:15-17:15 con D{dia}:i_sim_corr; (6b) ENCAPS → Plan › Horario (EncapsPlanView.bloquesIntensivo con la fila) = Home: la corrección del simulacro
  //   de las 11:00 a la misma hora, el CARRIL B a la misma hora y, en señales / repaso_final, los ítems de la fila en serie desde la hora del bloque
  //   del Home (07:15) con sus duraciones; (8) tras un SIM de VIERNES «mini-sim absorbido» ⇔ la fila del viernes trae extra.minisim_absorbido (también
  //   en la EVAL ANCLADA del carril SÁBADO, D{dia}:s_eval); (12) toda semana de F2 con SIM / pre-test el viernes tiene el CIERRE SEMANAL (--pull) en
  //   algún bloque ENCAPS (vie 5-mar: en el de la corrección de las 18:00, que sustituye a la EVAL, con --semana).
  {
    const SQL = path.join(__dirname, '_encaps_intensivo_2027.sql');
    const COLS = ['examen', 'dia', 'fecha', 'weekday', 'tipo', 'codigo', 'subtema', 'prioridad', 'modo', 'videos', 'theomed', 'material_comp', 'temas_secundarios', 'extra'];
    const tupla = (l) => {
      const s = l.trim().replace(/^\(/, '').replace(/\)[,;]?$/, '');
      const out = []; let i = 0;
      while (i < s.length) {
        if (s[i] === "'") {
          let j = i + 1, v = '';
          for (;;) { if (s[j] === "'" && s[j + 1] === "'") { v += "'"; j += 2; } else if (s[j] === "'" || j >= s.length) break; else v += s[j++]; }
          i = j + 1;
          if (s.startsWith('::jsonb', i)) { out.push(JSON.parse(v)); i += 7; } else out.push(v);
        } else { let j = s.indexOf(',', i); if (j < 0) j = s.length; const t = s.slice(i, j).trim(); out.push(t === 'NULL' ? null : Number(t)); i = j; }
        if (s[i] === ',') i++;
      }
      return Object.fromEntries(COLS.map((c, k) => [c, out[k]]));
    };
    const ROWS = fs.readFileSync(SQL, 'utf8').split('\n').filter((l) => l.startsWith("('ENCAPS',")).map(tupla).sort((a, b) => a.dia - b.dia);
    if (ROWS.length < 10 || ROWS.some((r) => !/^\d{4}-\d{2}-\d{2}$/.test(r.fecha) || !r.extra || typeof r.extra !== 'object')) errores.push(`_encaps_intensivo_2027.sql: ${ROWS.length} filas leídas o alguna sin fecha / extra (parser)`);
    const igualSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
    const lista = (s) => [...s].sort().join(' ');
    const sim11 = new Set(ROWS.filter((r) => r.tipo === 'sim100' && r.extra.sim && r.extra.sim.hora === '11:00').map((r) => r.fecha));
    if (!igualSet(sim11, RG2.SIM_F2_11)) errores.push(`SIM 100Q 11:00 del SQL (${lista(sim11)}) ≠ rutinaGuia.SIM_F2_11 (${lista(RG2.SIM_F2_11)})`);
    const dress = ROWS.find((r) => r.tipo === 'dress_rehearsal');
    if (!dress || dress.fecha !== RG2.D2_ENCAPS || (dress.extra.sim || {}).hora !== '11:00') errores.push(`dress rehearsal del SQL (${dress && dress.fecha} ${dress && (dress.extra.sim || {}).hora}) ≠ D2_ENCAPS ${RG2.D2_ENCAPS} 11:00`);
    const qSim = new Set(ROWS.filter((r) => r.extra.quincena && r.tipo === 'sim100').map((r) => r.fecha));
    const qRep = new Set(ROWS.filter((r) => r.extra.quincena && r.tipo === 'repaso_final').map((r) => r.fecha));
    if (!igualSet(qSim, new Set(RG2.SIM_QUINCENA_F2))) errores.push(`SIM de la quincena del SQL (${lista(qSim)}) ≠ rutinaGuia.SIM_QUINCENA_F2 (${lista(RG2.SIM_QUINCENA_F2)})`);
    if (!igualSet(qRep, RG2.REPASO_QUINCENA_F2)) errores.push(`REPASO de la quincena del SQL (${lista(qRep)}) ≠ rutinaGuia.REPASO_QUINCENA_F2 (${lista(RG2.REPASO_QUINCENA_F2)})`);
    const COLA = ROWS.slice(-5).map((r) => r.fecha);
    if (COLA.join() !== RG2.COLA_F2.join()) errores.push(`cola del SQL (${COLA.join(' ')}) ≠ rutinaGuia.COLA_F2 (${RG2.COLA_F2.join(' ')})`);
    const cbVie = new Set(ROWS.filter((r) => r.extra.carril_b && dow(r.fecha) === 5).map((r) => r.fecha));
    // (7) índice F2 de encapsGuia = el SQL (dia · tipo · hora · loop / EVAL 18:00 · carril B y su pendiente)
    for (const r of ROWS) {
      const x = EG2.encapsF2De(r.fecha), cbr = r.extra.carril_b, pe = cbr && cbr.pendiente_f1;
      const esperado = { dia: r.dia, tipo: r.tipo, simHora: (r.extra.sim || {}).hora || null, loop: Array.isArray(r.extra.loop), eval18: Array.isArray(r.extra.loop) && r.extra.loop.some((s) => s.h === '18:00'),
        cb: cbr ? `${cbr.tipo}/${pe ? pe.tipo : '-'}` : null };
      const visto = x && { dia: x.dia, tipo: x.tipo, simHora: x.simHora, loop: x.loop, eval18: x.eval18, cb: x.carrilB ? `${x.carrilB.tipo}/${x.carrilB.pendiente || '-'}` : null };
      if (JSON.stringify(esperado) !== JSON.stringify(visto)) errores.push(`${r.fecha} encapsGuia.encapsF2De ≠ SQL (${JSON.stringify(visto)} vs ${JSON.stringify(esperado)}): regenera con gen_encaps_guia.js`);
    }
    if (EG2.ENCAPS_F2_FECHAS.length !== ROWS.length) errores.push(`encapsGuia: índice F2 con ${EG2.ENCAPS_F2_FECHAS.length} filas y el SQL tiene ${ROWS.length}`);
    // (6b) ENCAPS → Plan › Horario: bloquesIntensivo de EncapsPlanView.tsx (privado del componente) se expone SOLO en esta carga añadiendo un export
    //   al fuente en memoria; react / react-native y demás imports no relativos = stub, los relativos con cargarConStubs (mismas instancias de src/lib)
    const horarioDe = (() => {
      const file = path.join(__dirname, '..', '..', 'src', 'components', 'EncapsPlanView.tsx');
      const m = { exports: {} };
      const req = (spec) => {
        if (!spec.startsWith('.')) return stub();
        let d = path.resolve(path.dirname(file), spec);
        for (const e of ['', '.ts', '.tsx']) if (fs.existsSync(d + e) && fs.statSync(d + e).isFile()) { d += e; break; }
        return d.endsWith('.json') ? JSON.parse(fs.readFileSync(d, 'utf8')) : cargarConStubs(d);
      };
      try {
        new Function('exports', 'module', 'require', ts.transpileModule(fs.readFileSync(file, 'utf8') + '\nexports.__bloquesIntensivo = bloquesIntensivo;\n', { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText)(m.exports, m, req);
      } catch (e) { errores.push(`EncapsPlanView.tsx: no se pudo cargar bloquesIntensivo para el control del Horario (${e.message})`); }
      return typeof m.exports.__bloquesIntensivo === 'function' ? m.exports.__bloquesIntensivo : null;
    })();
    const finHM = (h) => { const x = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec(h); return x ? [x[1], x[2]] : null; };
    let nF2 = 0, nCB = 0, nCorr = 0, nRep = 0, nMs = 0, nEv7 = 0, nHor = 0, nSen = 0, nAbs = 0;
    for (const r of ROWS) {
      const p = PL.plantillaDelDia(r.fecha);
      if (p.fase !== 'F2' || p.corrida) continue;
      nF2++;
      const bs = p.bloques, tag = `${r.fecha} ${WDC[dow(r.fecha)]} D${r.dia} ${r.tipo}`, w = dow(r.fecha);
      const hb = (b) => (b ? `${b.ini}–${b.fin}` : '—');
      const enc = bs.find((b) => b.id === 'encaps'), cb = bs.find((b) => b.id === 'carrilb'), ev = bs.find((b) => b.id === 'eval'), corr = bs.find((b) => b.id === 'encaps-corr');
      const prev = ROWS.find((x) => x.dia === r.dia - 1) || null;
      let its = [];
      try { its = EP2.itemsForDay(r, {}, prev, null); } catch (e) { errores.push(`${tag}: encapsPlan.itemsForDay lanzó ${e.message}`); }
      // (6b) Horario de ENCAPS → Plan (fila viva = la del SQL) ⇔ Home
      let hor = null;
      if (horarioDe) { try { hor = horarioDe(r); } catch (e) { errores.push(`${tag}: EncapsPlanView.bloquesIntensivo lanzó ${e.message}`); } }
      if (hor) {
        nHor++;
        const hCorr = hor.find((b) => /^📊/.test(b.titulo)), hCB = hor.find((b) => /^◈ CARRIL B/.test(b.titulo));
        if ((r.extra.sim || {}).hora === '11:00' && corr && (!hCorr || hCorr.hora !== `${corr.ini}-${corr.fin}`)) errores.push(`${tag}: ENCAPS → Plan › Horario pinta la corrección del simulacro de las 11:00 ${hCorr ? hCorr.hora : '—'} y el Home ${hb(corr)}`);
        if (!!hCB !== !!cb || (hCB && hCB.hora !== `${cb.ini}-${cb.fin}`)) errores.push(`${tag}: CARRIL B en el Horario ${hCB ? hCB.hora : '—'} ≠ Home ${hb(cb)}`);
        if (['senales', 'repaso_final'].includes(r.tipo) && !Array.isArray(r.extra.loop)) {
          // los ítems de la fila (i_*) en serie desde la hora del bloque ENCAPS del Home, con sus duraciones, y dentro de ese bloque
          const base = hor.filter((b) => !/^◈ /.test(b.titulo) && !/^SÁB /.test(b.hora)), iIt = its.filter((it) => /^D\d+:i_/.test(it.key));
          let h = enc ? enc.ini : '—', ok = !!enc && base.length === iIt.length;
          for (let k = 0; ok && k < base.length; k++) { const fr = finHM(base[k].hora); if (!fr || fr[0] !== h || hm(fr[1]) - hm(fr[0]) !== iIt[k].dur) ok = false; else h = fr[1]; }
          if (!ok || hm(h) > hm(enc.fin)) errores.push(`${tag}: Horario ${base.map((b) => b.hora).join(' + ')} ≠ ítems ${iIt.map((it) => `${it.key.split(':')[1]} ${it.dur}′`).join(' + ')} en serie desde el bloque del Home ${hb(enc)}`);
        }
      }
      if (['sim100', 'pretest', 'dress_rehearsal'].includes(r.tipo)) { // v6.07 (fix 3): + dress rehearsal (D-2)
        const h = (r.extra.sim || {}).hora || '07:15';
        const fin = h === '11:00' ? '13:00' : '09:15';
        if (hb(enc) !== `${h}–${fin}`) errores.push(`${tag}: el SIM de la fila es a las ${h} y la plantilla lo pinta ${hb(enc)}`);
        if (h === '11:00') {
          if (bs.some((b) => /LOOP/.test(b.nombre))) errores.push(`${tag}: SIM 11:00 con LOOP en la plantilla`);
          const s = bs.find((b) => b.plan === 'synapse');
          if (s && hb(s) !== '13:00–13:30') errores.push(`${tag}: SIM 11:00 con el SYNAPSE ${hb(s)} (≠ 13:00–13:30)`);
          // (6) corrección del SIM 11:00 con su ítem D{dia}:i_sim_corr: 16:15 libre → 16:15-17:15 (+ EVAL de cierre semanal el viernes); 16:15 del carril B
          //   → 18:00-18:45, sin EVAL
          const kCorr = `D${r.dia}:i_sim_corr`;
          const esperaCorr = r.extra.carril_b ? '18:00–18:45' : '16:15–17:15';
          if (!corr || hb(corr) !== esperaCorr) errores.push(`${tag}: corrección del SIM 11:00 ${hb(corr)} (≠ ${esperaCorr}: ${r.extra.carril_b ? 'el 16:15 es del carril B' : '16:15 libre'})`);
          else if (!String(corr.detalle || '').includes(kCorr)) errores.push(`${tag}: el bloque de corrección no nombra el ítem ${kCorr} (TodayMission lo muestra como tema)`);
          else nCorr++;
          if (!its.some((it) => it.key === kCorr)) errores.push(`${tag}: ENCAPS → Plan sin el ítem ${kCorr}`);
          const esperaEval = w === 5 && !r.extra.carril_b;
          if (!!ev !== esperaEval) errores.push(`${tag}: EVAL 18:00 ${ev ? 'pintada' : 'ausente'} en un SIM 11:00 ${r.extra.carril_b ? 'con' : 'sin'} carril B (${esperaEval ? 'debe ir: cierre semanal del viernes' : 'no va: las 18:00 son la corrección o la fila no la trae'})`);
        } else if (r.tipo === 'sim100' && (!corr || hb(corr) !== '09:30–12:00')) errores.push(`${tag}: SIM 07:15 sin la corrección 09:30-12:00`);
      }
      // (3) repaso_final sin loop (L-J) = REPASO 07:15-12:00 sin LOOP ni EVAL
      if (r.tipo === 'repaso_final' && !Array.isArray(r.extra.loop) && w >= 1 && w <= 4) {
        nRep++;
        const re = RG2.REPASO_QUINCENA_F2.has(r.fecha) ? /QUINCENA FINAL · REPASO/ : /REPASO FINAL D-\d/;
        if (hb(enc) !== '07:15–12:00' || !re.test(enc.nombre) || bs.some((b) => /LOOP/.test(b.nombre)) || ev) errores.push(`${tag}: repaso_final sin loop y la plantilla no pinta «${re.source}» 07:15-12:00 sin LOOP ni EVAL (hay ${enc ? `${hb(enc)} ${enc.nombre.slice(0, 50)}` : '—'}${ev ? ' + EVAL 18:00' : ''})`);
      }
      // (4) carril B ⇔ extra.carril_b · ítems D{dia}:b_* en ENCAPS → Plan · título del dato
      if (!!r.extra.carril_b !== !!cb) errores.push(`${tag}: ${r.extra.carril_b ? 'la fila trae extra.carril_b y la plantilla no pinta el CARRIL B 16:15' : `la plantilla pinta ${cb.nombre.slice(0, 40)} y la fila no trae extra.carril_b`}`);
      if (cb && (hb(cb) !== '16:15–17:15' || cb.plan !== 'encaps' || cb.frente !== 'encaps')) errores.push(`${tag}: CARRIL B ${hb(cb)} ${cb.plan}/${cb.frente} (≠ 16:15–17:15 encaps/encaps)`);
      if (r.extra.carril_b) {
        nCB++;
        if (!its.some((it) => it.key.startsWith(`D${r.dia}:b_`))) errores.push(`${tag}: ENCAPS → Plan sin ítems D${r.dia}:b_* del carril B (itemsCarrilB)`);
        if (w === 5 && !/CARRIL VIERNES/.test(cb ? cb.nombre : '')) errores.push(`${tag}: viernes con extra.carril_b y el bloque no se llama «CARRIL VIERNES»`);
        const msim = (r.extra.carril_b.pendiente_f1 || {}).tipo === 'mini_sim';
        if (msim) {
          nMs++;
          if (!cb || !/MINI-SIM 25Q/.test(cb.nombre) || !String(cb.detalle || '').includes(`D${r.dia}:b_msim`)) errores.push(`${tag}: carril B = MINI-SIM 25Q (pendiente F1) y el bloque no lo dice en el título / no nombra D${r.dia}:b_msim (${cb ? cb.nombre.slice(0, 50) : '—'})`);
          if (!its.some((it) => it.key === `D${r.dia}:b_msim`)) errores.push(`${tag}: ENCAPS → Plan sin el ítem D${r.dia}:b_msim`);
        } else if (cb && /MINI-SIM/.test(cb.nombre)) errores.push(`${tag}: el bloque del carril B dice MINI-SIM y la fila es un banco`);
        // (8) EVAL ANCLADA del carril B tras un SIM: «(lunes) … mini-sim de ese viernes absorbido» solo si el SIM fue un viernes
        const bev = its.find((it) => it.key === `D${r.dia}:b_eval`);
        if (bev && prev && ['sim100', 'pretest'].includes(prev.tipo)) {
          nEv7++;
          const deViernes = dow(prev.fecha) === 5;
          if (!deViernes && (/\(lunes\)|absorbido/.test(`${bev.label} ${bev.detail || ''}`) || !bev.label.includes(`${WDC[dow(prev.fecha)]} · D${prev.dia}`))) errores.push(`${tag}: EVAL ANCLADA tras el SIM del ${WDC[dow(prev.fecha)]} (D${prev.dia}) con rótulo de lunes / viernes: «${bev.label.slice(0, 90)}»`);
          if (deViernes && !/EVAL ANCLADA \(lunes\)/.test(bev.label)) errores.push(`${tag}: EVAL ANCLADA tras el SIM del viernes sin el rótulo de siempre «(lunes)»`);
        }
      }
      // (8) v6.07 fix 3: tras un SIM / pre-test de VIERNES, «el mini-sim de ese viernes quedó absorbido» ⇔ la fila del viernes trae extra.minisim_absorbido
      //   (vie 8-ene → 12-feb; no los vie 19 · 26-feb · 5-mar) — en la EVAL ANCLADA del carril B del lunes (D{dia}:b_eval, fila anterior = el viernes) y
      //   en la del carril SÁBADO (D{dia del viernes}:s_eval, la fila es el propio viernes)
      for (const [k, sim] of [[`D${r.dia}:b_eval`, prev], [`D${r.dia}:s_eval`, r]]) {
        const it = its.find((x) => x.key === k);
        if (!it || !sim || !['sim100', 'pretest'].includes(sim.tipo) || dow(sim.fecha) !== 5) continue;
        nAbs++;
        const dice = /absorbido/.test(`${it.label} ${it.detail || ''}`), hay = !!sim.extra.minisim_absorbido;
        if (dice !== hay) errores.push(`${tag}: ${k} ${dice ? 'dice' : 'no dice'} «mini-sim absorbido» y la fila del vie ${sim.fecha} (D${sim.dia}) ${hay ? 'sí' : 'no'} trae extra.minisim_absorbido`);
      }
      // (5) TODO L-J de F2 (v6.07 fix 3; antes solo quincena y cola): EVAL 18:00 ⇔ la fila trae el segmento de las 18:00 del loop · sin loop en la fila
      //   → ningún LOOP en la plantilla · día de señales → «RE-SCAN DE SEÑALES»
      if (w >= 1 && w <= 4) {
        const ev18 = Array.isArray(r.extra.loop) && r.extra.loop.some((sg) => sg.h === '18:00');
        if (ev18 !== !!ev) errores.push(`${tag}: EVAL 18:00 ${ev ? 'pintada' : 'ausente'} y la fila ${ev18 ? 'sí' : 'no'} la trae`);
        if (!Array.isArray(r.extra.loop) && bs.some((b) => /LOOP/.test(b.nombre))) errores.push(`${tag}: la fila no trae extra.loop y la plantilla pinta un LOOP`);
        if (r.tipo === 'senales') { nSen++; if (!enc || !/RE-SCAN DE SEÑALES/.test(enc.nombre)) errores.push(`${tag}: día de señales y el bloque ENCAPS es «${enc ? enc.nombre.slice(0, 60) : '—'}» (≠ RE-SCAN DE SEÑALES)`); }
      }
    }
    // (12) CIERRE SEMANAL del ENCAPS (gen_encaps_semana.js --pull → --semana; V6_ESPEC: EVAL 18:00 «viernes: --pull y cierre semanal») en toda semana de
    //   F2 cuyo viernes es SIM 100Q / pre-test: algún bloque ENCAPS de esa semana lo nombra (vie 5-mar: el de la corrección de las 18:00, con --semana)
    let nSem = 0;
    for (const r of ROWS.filter((x) => dow(x.fecha) === 5 && ['sim100', 'pretest'].includes(x.tipo))) {
      const bs = [];
      for (let k = -4; k <= 0; k++) { const p = PL.plantillaDelDia(addDias(r.fecha, k)); if (p.fase === 'F2' && !p.corrida) bs.push(...p.bloques.filter((b) => b.plan === 'encaps')); }
      const b = bs.find((x) => /cierre semanal/i.test(`${x.nombre} ${x.detalle || ''}`) && /--pull/.test(`${x.nombre} ${x.detalle || ''}`));
      if (!b) errores.push(`${r.fecha} vie D${r.dia}: la semana no tiene el CIERRE SEMANAL del ENCAPS (--pull → --semana) en ningún bloque`);
      else if (b.id !== 'eval' && !/--semana/.test(b.detalle || '')) errores.push(`${r.fecha} vie D${r.dia}: el cierre semanal va en «${b.nombre.slice(0, 50)}» y su detalle no dice --semana`);
      else nSem++;
    }
    // (9) CARRIL SÁBADO a la hora del SQL (extra.carril_sabado) y Business de ese sábado sin solape con él (v6.07 fix H6)
    let nSab = 0;
    for (const r of ROWS.filter((x) => x.extra.carril_sabado)) {
      const cs = r.extra.carril_sabado, p = PL.plantillaDelDia(cs.fecha), tag = `${cs.fecha} sáb (carril SÁBADO, host D${r.dia})`;
      const b = p.bloques.find((x) => x.id === 'encaps-sab'), biz = p.bloques.find((x) => x.plan === 'business');
      if (!b || b.ini !== cs.ini || b.fin !== cs.fin) { errores.push(`${tag}: el Home pinta el carril ${b ? b.hora : '—'} y el SQL dice ${cs.ini}-${cs.fin}`); continue; }
      nSab++;
      if (biz && hm(biz.ini) < hm(b.fin) && hm(b.ini) < hm(biz.fin)) errores.push(`${tag}: Business ${biz.hora} ⟂ carril SÁBADO ${b.hora}`);
      const g = RG2.guiaBusinessDe(cs.fecha);
      if (biz && (!g || g.franja !== biz.hora)) errores.push(`${tag}: guía de Business ${g ? g.franja : '—'} ≠ bloque ${biz.hora}`);
      if (biz && biz.ini === cs.fin && !/al terminar el carril SÁBADO ENCAPS/.test((g && g.aviso) || '')) errores.push(`${tag}: Business va tras el carril y su guía no lo avisa`);
      const vie = PL.plantillaDelDia(r.fecha);
      if (biz && biz.ini === cs.fin && !vie.notas.some((n) => n.includes(`${biz.ini}-${biz.fin}`))) errores.push(`${r.fecha} vie: el OUTPUT va entero al sábado ${biz.hora} (tras el carril) y las notas del viernes no lo avisan con esa hora`);
    }
    // (10) LIVIANO: cada sesión con su bloque (fuera de la semana corrida)
    let nLiv = 0;
    for (const x of LV2.LIV_DIAS) {
      const p = PL.plantillaDelDia(x.fecha);
      if (p.corrida) continue;
      const b = p.bloques.find((y) => y.plan === 'liviano');
      if (!b) errores.push(`${x.fecha} ${WDC[dow(x.fecha)]} ${p.plantilla}: sesión LIVIANO D${x.d} sin bloque en la plantilla`);
      else if (b.ini !== '17:15' || b.fin !== '18:00') errores.push(`${x.fecha} LIVIANO D${x.d}: bloque ${b.hora} (≠ 17:15–18:00)`);
      else if (F62.faseV6(x.fecha) === 'F3') nLiv++;
    }
    if (LV2.LIV_META.fin > F62.FECHAS_V6.step1.reinicio && !nLiv) errores.push(`LIVIANO llega a F3 (fin ${LV2.LIV_META.fin}) y ninguna sesión de F3 tiene bloque`);
    // (11) bloques Business ⟂ SYNAPSE en la plantilla (el control general de solapes también lo cubre; aquí se cuenta)
    let nBS2 = 0;
    for (let iso = SIM_INI; iso <= FIN; iso = addDias(iso, 1)) {
      const p = PL.plantillaDelDia(iso);
      const b = p.bloques.find((y) => y.plan === 'business' && y.ini), s = p.bloques.find((y) => y.plan === 'synapse' && y.ini);
      if (!b || !s) continue;
      nBS2++;
      if (hm(b.ini) < hm(s.fin) && hm(s.ini) < hm(b.fin)) errores.push(`${iso} plantilla: Business ${b.hora} ⟂ SYNAPSE ${s.hora}`);
    }
    console.log(`intensiva ENCAPS ↔ plantilla F2 (SQL ${ROWS.length} filas = índice F2): ${nF2} día(s) F2 · SIM 11:00 ${lista(sim11)} · quincena SIM ${lista(qSim)} · repaso ${lista(qRep)} · cola ${COLA.join(' ')} · REPASO sin loop ${nRep} · corrección del SIM 11:00 ${nCorr} · carril B ${nCB} día(s) (viernes: ${lista(cbVie) || '—'} · mini-sim ${nMs}) · EVAL ANCLADA tras SIM ${nEv7} · «mini-sim absorbido» comprobado en ${nAbs} · Horario = Home en ${nHor} día(s) · señales ${nSen} · cierre semanal en ${nSem} semana(s) · carril SÁBADO ${nSab} a la hora del SQL · LIVIANO en F3 ${nLiv} sesión(es) · Business+SYNAPSE ${nBS2} día(s) sin solape`);
  }
  console.log(`simulación del día: ${nSim} día×turno (${SIM_INI} → ${SIM_FIN}; última fila MIR ${MIR_FIN}) · solapes, bloques sin contenido, guías fuera de su bloque, MIR y fases nombradas`);
  if (avisosSim.length) console.warn(`⚠ ${avisosSim.length} aviso(s) fuera de este ámbito:\n  ` + avisosSim.slice(0, 10).join('\n  '));
}

// ── salida ──
if (INF) {
  const fmt = (g) => g.pasos.map((p) => `**${p.min}′** ${p.que.replace(/\|/g, '/')}`).join('<br>');
  console.log(`| Día | Franja | Plan · bloque | Qué · cuánto (min) | Enlaces |`);
  console.log('|---|---|---|---|---|');
  filas.sort((a, b) => (a.iso + a.g.franja).localeCompare(b.iso + b.g.franja));
  for (const { iso, nombre, g } of filas) {
    const links = [...g.pasos.filter((p) => p.enlace).map((p) => p.enlace), ...g.recursos].map((x) => `[${(x.t || '').replace(/\|/g, '/').slice(0, 40)}](${x.url})`).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).join(' ');
    console.log(`| ${iso} | ${g.franja} (${g.totalMin}′) | ${nombre} · ${g.titulo.replace(/\|/g, '/')} | ${fmt(g)} | ${links} |`);
    if (g.aviso) console.log(`| | | ⚠ aviso | ${g.aviso.replace(/\|/g, '/')} | |`);
  }
  console.log('');
}
console.log(`bloques verificados: ${Object.entries(cuenta).map(([k, v]) => `${k} ${v}`).join(' · ')} (${INI} → ${FIN})`);
if (errores.length) { console.error(`✗ ${errores.length} error(es):\n  ` + errores.slice(0, 60).join('\n  ')); process.exit(1); }
console.log('✓ check_rutina_guia: 0 errores · Σ pasos = franja en todos los bloques · cobertura completa de los 7 planes');
