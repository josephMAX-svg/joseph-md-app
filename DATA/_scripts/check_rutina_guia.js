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
// v6.08 (14-nov-2026, D1 = lun 16-nov): (13) las mañanas ENCAPS fuera de F1 (encapsManana.diaExtra: jue 31-dic —v6.08: día extra SOLO ENCAPS; v6.09: día de
//   PLAN de la transición, recupera el lun 16-nov, con 16:15 y secundarios—, y mar 5-ene, en la intensiva) tienen encaps-am 07:15-12:00 + encaps-pm 18:00-18:45
//   sin USMLE, LOOP ni EVAL; un día SKIP con mañana extra (v6.08: el 31-dic) no lleva ningún otro bloque; la fila del 5-ene
//   trae extra.manana_f1 y su loop = las franjas de la guía. El resto de controles ENCAPS cubren ya el CARRIL VIERNES del núcleo (vie 8 → 12-feb) y el
//   carril SÁBADO a las 14:00 (la hora del SQL).
// v6.08 (14-nov-2026 · lote B2: Business · LIVIANO · vibecoding · SYNAPSE · AURUM): (14) SÁBADOS reales hasta el SERUMS (gimnasio 08:30-14:00 · baile
//   17:00-20:00 · en F2, Theomed en vivo 15:00-17:00): ventanas 04:15-08:25 · 14:00-17:00 · 21:00-22:00; F2 = STEP 1 VIVO 04:15 · revisión 07:15 · Business
//   07:45 · SYNAPSE 21:00 · (15) todo día con Business tiene su bloque (el plan llega a F3) · AURUM en día de hito también en F4 (hito nominal; guía tras
//   el hito, D129 lun 24-may = NBME 30) · las esperas de Business del sábado F2 pasan de 09:15 a 07:45 y las del SYNAPSE A/B/C de F2 de 15:00 a 21:00.
// v6.08 (rev. 14-nov · lote secundarios): (16) el ejemplo del SHIP del domingo no pisa el Anki del domingo (16:45-17:00) ni la franja de ejemplo del
//   ENCAPS opcional de ese domingo, y el Feynman va justo antes · (17) día de NBME de F3 dentro de SYNAPSE / Business (NBME 29, mié 17-mar): SYNAPSE
//   13:00-13:30 y el OUTPUT del día ENTERO en el cierre del sábado (avisado en las notas), como en F1 · (18) el aviso del SYNAPSE del sábado nombra la
//   clase en vivo solo si ese sábado la hay y «el Anki de las 21:30» solo con bloque anki-sab · (19) la nota «Sábado libre … lo de los sábados va los
//   domingos» solo si el domingo siguiente trae plan de la corrida (v6.08: sáb 14 y dom 15-nov, los dos sin sesión).
// v6.09 (16-nov-2026, D1 = mar 17-nov · sáb 21 y dom 22-nov libres por viaje): (20) FIN DE SEMANA SIN SESIÓN dentro del plan (RG.sabadoLibre: sábado de
//   corrida_s1.sin_sesion ≥ D1, y su domingo): ninguna guía de revisión / Business / SYNAPSE / SHIP / Feynman esos días; la revisión de ese sábado va JUNTO
//   con la del sábado siguiente (RG.revisionesJuntasDe: la guía del sáb 28 nombra S01_2026-11-21 + S02_2026-11-28, 30′) y sus OUTPUT de Business se
//   cierran ese sábado siguiente (si esa semana no tuvo OUTPUT —v6.09: el OUTPUT S1 corrió al lun 23—, su fila del tracker: bizCierreDe.soloTracker;
//   sáb 28-nov = tracker de la semana del lun 16 + OUTPUT S1 = 25′ → 07:45-08:10, antes del gimnasio; un cierre > 15′ con clase en vivo ya no va a las
//   17:15, dentro del baile). Las expectativas del «1.er sábado» (revisión primera, SYNAPSE 21:00, cierre Business, SHIP / Feynman del domingo, comodines
//   curados) usan el 1.er sábado CON sesión (SAB1R); el fichero S01 sigue siendo el del 1.er sábado. El ejemplo del SHIP del domingo con A/B/C del
//   SYNAPSE (dom 29-nov, domingo de recuperación) empieza antes (14:15) y sigue acabando a las 16:45.
// v6.09 (rev. adversarial, 16-nov-2026): (21) Business y LIVIANO en F1 / transición: ningún OUTPUT antes de la última lectura de su módulo (orden de
//   DATA/BUSINESS/plan_pulso_v3_L.json) ni ningún CASO antes de sus 4·k lecciones; el viernes que lleva esa lectura / lección y el lunes del OUTPUT / caso
//   lo avisan · (22) el 1.er día con sesión tras un D1 sin sesión (mar 17-nov) avisa de que sale como D2 / «día 2» (Business y SYNAPSE) · (23) SYNAPSE: los
//   recursos repartidos (Brockman 39′ · «Prompt injection…» · deep dive · trifecta) avanzan por FECHA, sin huecos ni solapes (minutos contiguos desde el
//   0:00), ningún «episodio de esta semana» / «siguiente artículo» genérico de su carril mientras el recurso está a medias, y toda «retoma donde paraste el
//   <fecha>» nombra una sesión anterior del MISMO recurso · (24) cierre de Business de un sábado con clase en vivo: nunca a las 14:00 (revisión + preparar
//   la clase) ni > 40′ (bizCierreDe.excede → error explícito) · (25) ninguna nota de un día SKIP posterior a transicion.hasta dice que el 31-dic es día de
//   plan (plantillasV6; v6.09: Jueves y Viernes Santo de 2027) · el campo d del SYNAPSE de cada fecha ≥ 2027-01-04 no depende del D1 (START = lunes).
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
  // v6.07 (fix lote 1b del Calendar): el Feynman del domingo habla del MISMO proyecto que el PC de ese domingo (SHIP o avance; antes iba por la
  //   semana del SYNAPSE: dom 3-ene «proyecto S8» con el SHIP de S7) y todo domingo con SHIP / avance de un proyecto S1-S12 tiene su Feynman
  if (w === 0) {
    const pcs = V.vibePCDomingo(x.fecha); const main = pcs[pcs.length - 1];
    const fey = RG.guiaFeynmanDe(x.fecha);
    const sFey = fey ? Number((/proyecto S(\d+)/.exec(fey.titulo) || [])[1]) : null;
    if (main && main.proyecto && !fey) errores.push(`${x.fecha} feynman dom: el PC es ${main.tipo} S${main.s} y no hay Feynman`);
    if (fey && (!main || !main.proyecto || main.s !== sFey)) errores.push(`${x.fecha} feynman dom: Feynman de S${sFey} ≠ PC ${main ? `${main.tipo} S${main.s}` : '(sin PC)'}`);
    if (fey && main && main.proyecto && !fey.pasos[0].que.includes(`S${main.s}`)) errores.push(`${x.fecha} feynman dom: el paso no nombra S${main.s}`);
  }
}
for (const x of A.AURUM_DIAS) if (!RG.guiaAurumDe(x.fecha)) falta('aurum', x.fecha, `D${x.d}`);
for (const x of L.LIV_DIAS) if (!RG.guiaLivianoDe(x.fecha)) falta('liviano', x.fecha, `D${x.d}`);
for (const x of B.BIZ_DIAS) {
  const m = B.bizModo(x);
  if (m === 'DESCANSO') continue;
  const hoy = RG.guiaBusinessDe(x.fecha);
  let sabado = addDias(x.fecha, 6 - dow(x.fecha));
  while (RG.sabadoLibre(sabado)) sabado = addDias(sabado, 7); // v6.09: sábado sin sesión (viaje) → el cierre va con el del sábado siguiente
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
// v6.09: 1.er sábado CON sesión desde el D1 (sáb 21-nov es viaje → sáb 28-nov); el fichero S01 sigue siendo el del SAB1
const sabConSesion = (s) => { let x = s; for (let i = 0; i < 8 && RG.sabadoLibre(x); i++) x = addDias(x, 7); return x; };
const SAB1R = sabConSesion(SAB1);
const HITOS_F1 = U.DIAS.filter((x) => U.esHito(x));
const UWSA1 = (HITOS_F1.find((x) => /Self-Assessment 1|UWSA1/.test(x.uw)) || {}).fecha;
const NBMES = HITOS_F1.filter((x) => !/Self-Assessment|UWSA/.test(x.uw) && /NBME/.test(x.uw)).map((x) => x.fecha);
const habilSig = (iso) => { let c = addDias(iso, 1); while (dow(c) === 0 || dow(c) === 6 || HITOS_F1.some((h) => h.fecha === c)) c = addDias(c, 1); return c; };
const OUT1 = (B.BIZ_DIAS.find((x) => B.bizModo(x) === 'OUTPUT') || {}).fecha; // 1.er OUTPUT (v6.03: vie 23-oct)
// v6.10b (17-nov-2026, decisión 4 de Joseph): el UWSA1 salió de F1 (→ tramo 2, T82): sin él, el 1.er día de Step (D2 jue 19-nov) lleva el SYNAPSE a su hora
//   normal (12:30) en vez de las 07:25 del día de hito
if (!NBMES.length || !OUT1) errores.push(`plan sin NBME (${NBMES.length}) / OUTPUT (${OUT1}): no se pueden derivar las expectativas`);
for (let iso = SAB1; iso <= '2026-12-26'; iso = addDias(iso, 7)) {
  if (RG.sabadoLibre(iso)) { // v6.09 (20): sábado sin sesión → sin guías ese fin de semana; su revisión va con la del sábado siguiente
    for (const [n, f] of [['revision', RG.guiaRevisionDe], ['business', RG.guiaBusinessDe], ['synapse', RG.guiaSynapseDe]]) if (f(iso)) errores.push(`${iso} (20): sábado sin sesión con guía ${n} ${f(iso).franja}`);
    for (const [n, f] of [['ship', RG.guiaShipDe], ['feynman', RG.guiaFeynmanDe]]) if (FV.corridaS1De(addDias(iso, 1)) && f(addDias(iso, 1))) errores.push(`${addDias(iso, 1)} (20): domingo sin sesión con guía ${n}`);
    const rd = RG.revisionDomingoDe(iso); // v6.09b: con domingo de llegada, la revisión del sábado sin sesión va SOLA ese domingo (dom 22-nov 14:30)
    const sig = rd ? rd.domingo : sabConSesion(iso), gj = RG.guiaRevisionDe(sig);
    if (!gj || !gj.titulo.includes(RG.revisionFicheroDe(iso).replace('.md', '')) || !gj.pasos[0].como.includes(`${iso} --forzar`)) errores.push(`${sig} (20): la revisión no lleva la del ${iso} (sin sesión)${rd ? ' en su domingo de llegada' : ' junto con la suya'}`);
    if (rd && gj && gj.franja.split('–')[0] !== rd.ini) errores.push(`${sig} (20): la revisión del domingo de llegada empieza a las ${gj.franja.split('–')[0]} y no a las ${rd.ini}`);
    if (rd) { const g2 = RG.guiaRevisionDe(sabConSesion(iso)); if (!g2 || g2.pasos.reduce((s, p) => s + p.min, 0) > 30) errores.push(`${sabConSesion(iso)} (20): la revisión del sábado siguiente no cabe en 30′ tras mover la del ${iso} al domingo`); }
    continue;
  }
  if (!RG.guiaRevisionDe(iso)) falta('revision', iso, 'sábado de F1');
}
{ // v6.09 (20): resumen del fin de semana sin sesión
  const libres = []; for (let iso = SAB1; iso <= '2027-01-02'; iso = addDias(iso, 7)) if (RG.sabadoLibre(iso)) libres.push(iso);
  console.log(`v6.09 · (20) sábados sin sesión dentro del plan: ${libres.length ? libres.map((s) => `${s} → revisión y cierre Business con el ${sabConSesion(s)} (${(RG.guiaRevisionDe(sabConSesion(s)) || {}).titulo || '—'} · Business ${(RG.guiaBusinessDe(sabConSesion(s)) || {}).franja || '—'})`).join(' · ') : 'ninguno'} · 1.er sábado con sesión ${SAB1R}`);
}

// ── franjas de las decisiones de carga (semana 1 + hitos) ──
// v6.07: sábado de F1 y transición (RG.sabadoTheomed) = revisión 14:00 · Business 14:30 (OUTPUT entero → 17:15) · SYNAPSE 13:30; F2/F3 = 07:15 · 09:15 · 15:00
// v6.08 (14-nov-2026, decisión 7): F2 también 07:45 tras la revisión de las 07:15 (antes 09:15, dentro del gimnasio 08:30-14:00) y SYNAPSE A/B/C 21:00
const bizSab = (sab, entero) => (RG.sabadoTheomed(sab) ? (entero ? '07:45–08:25' : '14:30–14:45') : (entero ? '07:45–08:25' : '07:45–08:00')); // v6.09: entero con clase → 07:45 (antes 17:15, dentro del baile)
const SAB_F2_ABC = (S.SYN_DIAS.find((d) => dow(d.fecha) === 6 && FV.faseV6(d.fecha) === 'F2' && d.bloques.some((b) => /^[ABC]$/.test(b.tag))) || {}).fecha;
// v6.11 fase 2: el NBME es el del día REAL: la fila de un frente con alias propio que se hace ese día (SYNAPSE / Business del plan del vie 11-dic, el mié 16)
const enRealDe = (n, fr) => { const r = FV.fechaRealDe(n); return dow(r) >= 1 && dow(r) <= 5 ? FV.fechaPlanDe(r, fr) : n; };
const esperado = [
  ...(UWSA1 ? [[UWSA1, RG.guiaSynapseDe, '07:25–07:55'], [habilSig(UWSA1), RG.guiaSynapseDe, '12:30–13:00']] : [[U.DIAS[0].fecha, RG.guiaSynapseDe, '12:30–13:00']]), ...NBMES.map((n) => [enRealDe(n, 'synapse'), RG.guiaSynapseDe, '13:00–13:30']),
  [D1, RG.guiaBusinessDe, '13:00–13:25'], [OUT1, RG.guiaBusinessDe, RG.bizOutputEnteroDomingoDe && RG.bizOutputEnteroDomingoDe(OUT1) ? '13:00–13:40' : '13:00–13:25'] /* v6.11 (mar 24-nov): el OUTPUT S1 va ENTERO el dom 29-nov */,
  // v6.09 (rev. joseph 5): el cierre del 1.er OUTPUT va el sábado de SU semana (el OUTPUT S1 va el lun 23 → sáb 28); si el sábado anterior fue sin sesión y su
  //   semana no tuvo OUTPUT, ese sábado lleva además la fila del tracker de esa semana (10′ + 15′ = 25′ → 07:45-08:10, antes del gimnasio)
  // v6.11 (lun 23-nov): el cierre va el sábado siguiente a su día REAL (alias: el OUTPUT S1 del mar 24 de plan se hace el lun 30 → sáb 5-dic, 14:30-14:45); el
  //   sábado de su semana de plan (sáb 28-nov), si el anterior fue sin sesión, lleva solo la fila del tracker de esa semana (10′: 14:30-14:40 con la clase en vivo)
  ...(() => { const rr = FV.fechaRealDe(OUT1, 'business'), sb = addDias(rr, 6 - dow(rr)), sp = addDias(OUT1, 6 - dow(OUT1));
    if (sb === sp) return [[sb, RG.guiaBusinessDe, RG.sabadoLibre(addDias(sb, -7)) ? '07:45–08:10' : bizSab(sb, false)]];
    return [...(RG.sabadoLibre(addDias(sp, -7)) ? [[sp, RG.guiaBusinessDe, RG.sabadoTheomed(sp) ? '14:30–14:40' : '07:45–07:55']] : []), [sb, RG.guiaBusinessDe, bizSab(sb, false)]]; })(),
  // v6.09: el domingo del 1.er sábado con sesión (dom 29-nov) trae además el A/B/C del SYNAPSE (30′) → SHIP de ejemplo 14:15-16:45 y Feynman 14:05-14:15
  ...(() => { const dom = addDias(SAB1R, 1), ex = ((S.synDiaDe(dom) || {}).bloques || []).filter((b) => /^[ABC]$/.test(b.tag)).reduce((a, b) => a + b.min, 0), hmx = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; return [[dom, RG.guiaShipDe, `${hmx(14 * 60 + 45 - ex)}–16:45`], [dom, RG.guiaFeynmanDe, `${hmx(14 * 60 + 35 - ex)}–${hmx(14 * 60 + 45 - ex)}`]]; })() /* v6.08 (rev. dia7): el ejemplo 15:00-17:00 pisaba el Anki del domingo 16:45-17:00 */, [SAB1R, RG.guiaSynapseDe, '21:00–21:30'] /* v6.07b: sáb gimnasio 08:30-14:00 + baile 17:00-20:00 → 21:00 */,
  ...(SAB_F2_ABC ? [[SAB_F2_ABC, RG.guiaSynapseDe, '21:00–21:30'] /* v6.08: 15:00-17:00 = Theomed en vivo (ene-mar) */, [SAB_F2_ABC, RG.guiaRevisionDe, '07:15–07:45']] : []),
  [SAB1R, RG.guiaRevisionDe, '14:00–14:30'], [D1, RG.guiaAurumDe, '14:15–15:15'], [D1, RG.guiaLivianoDe, '17:15–18:00'],
  [D1, RG.guiaVibeDe, '04:15–05:00'],
];
// Business en día de NBME (F1): lectura → audio 12:30-12:55 en el almuerzo · OUTPUT → entero el sábado 07:45-08:25 (v6.02: vie 30-oct)
for (const n0 of NBMES) {
  const n = enRealDe(n0, 'business'); // v6.11 fase 2
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
    esperado.push([sabX, RG.guiaBusinessDe, cs && hm1(cs.ini) < hm1('07:45') + 40 && hm1('07:45') < hm1(cs.fin) ? `${cs.fin}–${hh1(hm1(cs.fin) + 40)}` : '07:45–08:25']); // v6.08: 07:45 (antes 09:15)
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
  // v6.09 (20): sábado sin sesión cuya semana tuvo lecturas pero ningún OUTPUT → su fila del tracker va en el cierre del sábado siguiente con sesión
  for (let sb = addDias(FV.FECHAS_V6.f1.inicio, (6 - dow(FV.FECHAS_V6.f1.inicio) + 7) % 7); sb <= FV.FECHAS_V6.transicion.hasta; sb = addDias(sb, 7)) {
    if (!RG.sabadoLibre(sb)) continue;
    const lect = [1, 2, 3, 4, 5].some((k) => { const r = B.bizDiaDe(addDias(sb, -k)); return r && !['DESCANSO', 'OUTPUT'].includes(B.bizModo(r)); });
    const outsSb = [1, 2, 3, 4, 5].some((k) => { const r = B.bizDiaDe(addDias(sb, -k)); return r && B.bizModo(r) === 'OUTPUT'; });
    const c2 = RG.bizCierreDe(sabConSesion(sb)), g2 = RG.guiaBusinessDe(sabConSesion(sb));
    if (lect && !outsSb && (!c2 || !c2.soloTracker.includes(sb) || !g2 || !g2.pasos.some((p) => /^TRACKER semanal \(1 fila\) — semana del/.test(p.que)))) errores.push(`${sb} (20): semana sin OUTPUT y sin sesión: su fila del tracker no va en el cierre del ${sabConSesion(sb)}`);
  }
  const sabs = [...new Set(B.BIZ_DIAS.filter((r) => B.bizModo(r) === 'OUTPUT').map((r) => addDias(r.fecha, 6 - dow(r.fecha))))];
  for (const sb of sabs) {
    if (RG.sabadoLibre(sb)) { // v6.09 (20): sábado sin sesión → sus OUTPUT van en el cierre del sábado siguiente con sesión
      const c2 = RG.bizCierreDe(sabConSesion(sb)), outs = B.BIZ_DIAS.filter((r) => B.bizModo(r) === 'OUTPUT' && addDias(r.fecha, 6 - dow(r.fecha)) === sb);
      if (RG.bizCierreDe(sb)) errores.push(`${sb} (20): sábado sin sesión con cierre de Business`);
      for (const o of outs) {
        if (!c2 || !c2.outs.some((x) => x.r.d === o.d)) errores.push(`${sb} (20): el OUTPUT D${o.d} (${o.fecha}) no se cierra el sábado siguiente con sesión`);
        const go = RG.guiaBusinessDe(o.fecha), sg = sabConSesion(sb), WDc = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], MESc = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const cita = `${WDc[dow(sg)]} ${Number(sg.slice(8))}-${MESc[Number(sg.slice(5, 7)) - 1]} ${c2 ? c2.ini : ''}`;
        if (!go || !(go.aviso || '').includes(cita)) errores.push(`${o.fecha} (20): el aviso del OUTPUT D${o.d} no cita su cierre «${cita}»`);
      }
      continue;
    }
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
  // v6.08 (14-nov-2026, decisión 5): también F4 — el hito NOMINAL del día (RG.hitoUsmleF4De; v6.08: D129 lun 24-may = NBME 30): con el bloque sin hora
  //   (plantilla H, turno T / sin marcar) la guía va TRAS el hito en el tiempo muerto de la posta (no a las 07:30 del turno M) y lo avisa
  let nHitoF4 = 0;
  for (const h of [...U.DIAS, ...U.DIAS_T2].filter((x) => U.esHito(x))) {
    const a = A.aurumDiaDe(h.fecha); if (!a) continue;
    nHitoAurum++;
    const f4 = FV.faseV6(h.fecha) === 'F4'; if (f4) nHitoF4++;
    const g = RG.guiaAurumDe(h.fecha); const av = (g && g.aviso) || '';
    const hu = f4 ? RG.hitoUsmleF4De(h.fecha) : RG.hitoUsmleDe(h.fecha);
    if (f4 && hu && hu.fin && g && hm1(g.franja.split('–')[0]) < hm1(hu.fin)) errores.push(`${h.fecha} guiaAurumDe D${a.d}: día de hito de F4 (${hu.nombre} ${hu.franja}) con la guía ${g.franja} antes de terminar el hito`);
    if (!hu || !av.startsWith(`Hoy ${hu.nombre}`) || !/tras el hito/.test(av) || (hu.franja && !av.includes(hu.franja)) || (g && !av.includes(g.franja))) errores.push(`${h.fecha} guiaAurumDe D${a.d}: día de hito USMLE (${hu ? hu.nombre : h.sub.slice(0, 30)}) sin el aviso «hito por la mañana · AURUM ${g ? g.franja : ''} tras el hito»`);
    if (a.pitch && !new RegExp(`PITCH v${a.pitch} HOY`).test(av)) errores.push(`${h.fecha} guiaAurumDe D${a.d}: PITCH v${a.pitch} en día de hito sin avisarlo`);
    const enc = EG.guiaEncapsDe(h.fecha);
    if (enc && /CHECKPOINT/.test(enc.titulo) && !/CHECKPOINT DEL AÑO de ENCAPS/.test(av)) errores.push(`${h.fecha} guiaAurumDe D${a.d}: CHECKPOINT ENCAPS ${enc.franja} el mismo día del hito sin avisarlo`);
  }
  console.log(`AURUM en día de hito USMLE (F1/F3/F4): ${nHitoAurum} día(s) con el aviso comprobado (F4: ${nHitoF4}, la guía tras el hito)`);
}
if (RG.revisionFicheroDe(SAB1) !== `S01_${SAB1}.md`) errores.push(`revisionFicheroDe(${SAB1}) = ${RG.revisionFicheroDe(SAB1)} ≠ S01_${SAB1}.md`);
if (!/^Primera revisión/.test((RG.guiaRevisionDe(SAB1R) || {}).aviso || '')) errores.push(`${SAB1R} guiaRevisionDe: no la marca como la PRIMERA revisión`); // v6.09: 1.er sábado con sesión

// ── v6.03: la curaduría de la semana 1 va con su PASO / PIEZA / FILA del plan (no con la fecha) → comprobar que aterriza ──
const conTexto = (g, re) => (Array.isArray(g) ? g : [g]).some((x) => !!x && x.pasos.some((p) => re.test(p.que) || re.test(p.como)));
// v6.10w: guías del SYNAPSE de una fecha de PLAN = la suya + la sesión a hora fija que lleva su contenido (cadena: el del sáb 28-nov va el dom 29 05:00)
const gSynDe = (iso) => [RG.guiaSynapseDe(iso), ...(S.SYN_REC_F1 || []).filter((r) => r.cadena && r.plan === iso).map((r) => RG.guiaSynapseRecDe(r.fecha, r.ini))];
const vibeS1 = V.VIBE_DIAS.filter((x) => x.semana === 1);
const curVibe = [/test_parser_multilinea/, /Redeploy: node_parsear_tarjeta_v2_3/, /APEX::USMLE::Cardiology/, /_apex_e2e_prueba\.json/, /Commit \[S1\]/]; // v6.10: textos correctos del chat Vibe Coding (17-nov)
vibeS1.forEach((x) => { if (!conTexto(RG.guiaVibeDe(x.fecha), curVibe[x.k - 1])) errores.push(`${x.fecha} guiaVibeDe: falta la curaduría del paso ${x.k} de S1`); });
const primeraSyn = (re, tag) => (S.SYN_DIAS.find((d) => d.bloques.some((b) => b.tag === tag && re.test(b.material + ' ' + b.leccion))) || {}).fecha;
// v6.10 (SECUNDARIOS): la A-unit de la auditoría F0 sale en la sesión de recuperación del sáb 28-nov 07:15 (SYN_REC_F1 · guiaSynapseRecDe) y la pieza
//   fija del primer martes de F1 (mar 24) la escribe el troceado («min 0:00-10:00 (tramo 1/3 del plan)»)
const primeraSynRec = (re, tag) => primeraSyn(re, tag) || ((S.SYN_REC_F1 || []).find((r) => r.bloques.some((b) => b.tag === tag && re.test(b.material + ' ' + b.leccion))) || {}).fecha;
const curSyn = [
  // v6.10 · tanda C (decidido con Joseph): la auditoría F0 abre la 1.ª sesión (mié 18, 3′, texto exacto «AUDITORÍA F0 (pendiente del mar 17)») → la busca en mayúsculas o minúsculas
  [primeraSynRec(/^Anthropic Academy AUDITORÍA F0/, 'A'), /auditoría F0|AUDITORÍA F0 \(pendiente del mar 17\)/], [primeraSyn(/^No Priors/, 'B'), /Greg Brockman/], [primeraSyn(/^Pro Git/, 'C'), /Pro Git › 1\.1/],
  [primeraSyn(/^Dwarkesh — Dario Amodei Tramo 1\/3/, 'B'), /tramo 1\/3 = minutos 0:00-10:00|min 0:00-10:00 \(tramo 1\/3 del plan\)/], [primeraSyn(/^Simon Willison — serie Prompt injection/, 'C'), /Prompt injection attacks against GPT-3/],
  [primeraSyn(/^The Python Tutorial.*Sección 1:/, 'C'), /Whetting Your Appetite/], [primeraSyn(/^The Batch/, 'B'), /carta de Ng/], [primeraSyn(/^Automate the Boring Stuff.*cap\. 0:/, 'C'), /cap\. 0 «Introduction»/],
  [primeraSynRec(/^Canal Anthropic.*deep dive.*tramo 1\b/, 'B'), /minutos 0:00-10:00/], [primeraSynRec(/^Simon Willison The lethal trifecta/i, 'C'), /lethal trifecta/], // v6.11 (mar 24-nov): + la sesión a hora fija del sáb 28-nov 04:15
];
for (const [iso, re] of curSyn) { const gs = iso ? [RG.guiaSynapseDe(iso), RG.guiaSynapseRecDe ? RG.guiaSynapseRecDe(iso) : null] : []; if (!gs.some((g) => conTexto(g, re))) errores.push(`${iso} SYNAPSE: falta la curaduría ${re}`); } // v6.10: + la sesión de recuperación // v6.07: el sábado también sale de guiaSynapseDe
// v6.05: comodines = el 1.er sábado tras su pieza, con prioridad para la curaduría original (No Priors + «Prompt injection…»); el deep dive y la
//   trifecta del viernes solo si su sábado es OTRO (v6.03: sáb 24 = deep dive + trifecta y sáb 31 = No Priors + Willison · v6.05: sáb 31 = No Priors + Willison)
const sabTras = (iso) => iso && sabConSesion(addDias(iso, ((6 - dow(iso) + 6) % 7) + 1)); // v6.09: el 1.er sábado CON sesión tras la pieza
const SAB_NP = sabTras(primeraSyn(/^No Priors/, 'B'));
const SAB_DD0 = sabTras(primeraSynRec(/^Canal Anthropic.*deep dive.*tramo 1\b/, 'B')); // v6.11 (mar 24-nov): el tramo 1 puede ir en una sesión a hora fija (sáb 28-nov 04:15)
// v6.05 (fix): si el 1.er sábado tras el deep dive ya lo ocupa la curaduría original, sus comodines van al SIGUIENTE sábado (v6.05: sáb 7-nov)
const SAB_DD = SAB_DD0 === SAB_NP ? addDias(SAB_DD0, 7) : SAB_DD0;
// v6.07: los comodines del sábado están en guiaSynapseDe (el PC pasó al domingo)
// v6.10c (cadena del carril del martes): el resto de «Prompt injection…» va al comodín del 1.er sábado tras la sesión de la serie que lo deja (mar 1-dic → sáb
//   5-dic; v6.09 y v6.10: el sáb 28-nov); No Priors sigue en el 1.er sábado tras su pieza
const piResto = (S.SYN_DIAS.find((d) => d.bloques.some((b) => b.tag === 'C' && /^Simon Willison — serie Prompt injection/.test(b.material) && b.guia && /^Resto → /.test(b.guia.como))) || {}).fecha;
// v6.11 (revisión c32): el 1.er sábado tras el día REAL de esa sesión (alias: el mar 1-dic de plan se hace el lun 7-dic → sáb 12-dic; antes, el sáb 5-dic, dos días
//   ANTES de que existiera el resto)
// v6.11 fase 2: si la sesión que deja el resto es la 1.ª fila de una CADENA (sáb 5-dic 21:00 = la fila del mar 1-dic), el comodín es el de ese mismo sábado (su fila va
//   el dom 6-dic 05:00, después: gSynDe lo incluye)
const SAB_PI = piResto ? ((S.SYN_REC_F1 || []).some((r) => r.cadena && r.plan === piResto) ? piResto : sabTras(FV.fechaRealDe(piResto, 'synapse'))) : SAB_NP;
if (!conTexto(gSynDe(SAB_NP), /Greg Brockman/) || !conTexto(gSynDe(SAB_PI), /Prompt injection attacks/)) errores.push(`${SAB_NP}/${SAB_PI} guiaSynapseDe: faltan los comodines curados de la curaduría original (No Priors + «Prompt injection…»)`);
if (!conTexto(gSynDe(SAB_DD), /deep dive.*minutos \d+:00-\d+:00/) || !conTexto(gSynDe(SAB_DD), /lethal trifecta/)) errores.push(`${SAB_DD} guiaSynapseDe: faltan los comodines curados del deep dive + trifecta (1.er sábado LIBRE tras la pieza)`);
if (SAB_DD0 === SAB_NP && conTexto(gSynDe(SAB_NP), /deep dive.*minutos/)) errores.push(`${SAB_NP} guiaSynapseDe: el comodín del deep dive pisa al de No Priors`);
// v6.05 (fix): el deep dive retoma donde quedó (tramos de 10′ ya vistos antes del sábado): con el tramo 2 del vie 6-nov → minutos 20:00-30:00
{
  // v6.11 (mar 24-nov): + los tramos de las sesiones a hora fija anteriores a ese sábado (sáb 28-nov 04:15)
  const tramos = S.SYN_DIAS.filter((d) => d.fecha < SAB_DD && dow(d.fecha) >= 1 && dow(d.fecha) <= 5).reduce((a, d) => a + d.bloques.filter((b) => b.tag === 'B' && /AI prompt engineering: A deep dive/.test(b.leccion)).length, 0)
    + (S.SYN_REC_F1 || []).filter((r) => r.fecha < SAB_DD).reduce((a, r) => a + r.bloques.filter((b) => b.tag === 'B' && /AI prompt engineering: A deep dive/.test(b.leccion)).length, 0);
  if (!conTexto(gSynDe(SAB_DD), new RegExp(`deep dive.*minutos ${10 * tramos}:00-${10 * tramos + 10}:00`))) errores.push(`${SAB_DD} guiaSynapseDe: el comodín del deep dive no retoma en el minuto ${10 * tramos} (${tramos} tramos vistos)`);
}
// ── v6.09 (rev. adversarial): controles (21)-(24) — ver la cabecera ──
{
  const TH = FV.FECHAS_V6.transicion.hasta, fs = require('fs');
  const WDl = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  // (21) Business: OUTPUT nunca antes de la última lectura de su módulo (orden del JSON) en F1 / transición; avisos del viernes y del lunes
  const PJ = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'BUSINESS', 'plan_pulso_v3_L.json'), 'utf8')).dias;
  let nOut21 = 0, nCaso21 = 0, nOutVie21 = 0;
  for (const r of B.BIZ_DIAS) {
    if (B.bizModo(r) !== 'OUTPUT' || r.fecha > TH) continue;
    const j = PJ.findIndex((x) => x.modo === 'OUTPUT' && x.lectura === r.lectura);
    const req = PJ.slice(0, j).filter((x) => x.modo !== 'OUTPUT').length;
    const hechas = B.BIZ_DIAS.filter((x) => x.d < r.d && ['L', 'CRITICA'].includes(B.bizModo(x))).length;
    if (j < 0 || hechas < req) errores.push(`${r.fecha} (21): OUTPUT D${r.d} con ${hechas} lecturas antes y su módulo exige ${req}`);
    if (dow(r.fecha) !== 5) {
      nOut21++;
      // v6.11 (ítem 29): el aviso nombra el día REAL (alias) → «(en F1 no va el viernes)» solo si ese día real no es viernes; en viernes real, sin el paréntesis
      const nomR = WDl[dow(FV.fechaRealDe(r.fecha, 'business'))], esVieR = nomR === 'viernes'; if (esVieR) nOutVie21++;
      const g = RG.guiaBusinessDe(r.fecha), av21 = (g && g.aviso) || '';
      if (!g || !new RegExp(`Hoy ${nomR}, `).test(av21) || /en F1 no va el viernes/.test(av21) === esVieR) errores.push(`${r.fecha} (21): el OUTPUT D${r.d} va el ${nomR} real y su guía ${esVieR ? 'dice «(en F1 no va el viernes)» o no nombra el viernes' : 'no lo explica'}`);
      const vie = [...B.BIZ_DIAS].reverse().find((x) => x.fecha < r.fecha && dow(x.fecha) === 5 && B.bizModo(x) !== 'DESCANSO');
      const gv = vie && RG.guiaBusinessDe(vie.fecha); if (vie && ['L', 'CRITICA'].includes(B.bizModo(vie)) && (!gv || !/ÚLTIMA lectura del módulo, no el OUTPUT|no va el OUTPUT: faltan lecturas del módulo/.test(gv.aviso || ''))) errores.push(`${vie.fecha} (21): el viernes de la última lectura no avisa de que el OUTPUT va el ${r.fecha}`);
    }
  }
  // (21) LIVIANO: caso k nunca antes de sus 4·k lecciones en F1 / transición; avisos del viernes y del lunes
  for (const r of L.LIV_DIAS) {
    if (r.casoId == null || r.fecha > TH) continue;
    const lec = L.LIV_DIAS.filter((x) => x.casoId == null && x.d < r.d).length;
    if (lec < 4 * r.casoId) errores.push(`${r.fecha} (21): CASO ${r.casoId} con ${lec} lecciones antes (< ${4 * r.casoId})`);
    if (r.wd !== 'Vie') {
      nCaso21++;
      const g = RG.guiaLivianoDe(r.fecha); if (!g || !/va hoy .* y no el viernes|va hoy viernes: el /.test(g.aviso || '') /* remate v6.10w: día REAL viernes */ || (r.wd === 'Lun' && !r.pretest)) errores.push(`${r.fecha} (21): CASO ${r.casoId} en ${r.wd} sin el aviso (o sin el pre-test del lunes)`);
      const vie = [...L.LIV_DIAS].reverse().find((x) => x.d < r.d && x.wd === 'Vie');
      const gv = vie && RG.guiaLivianoDe(vie.fecha);
      // v6.10d (fix revisión 18-nov): con el alias, el viernes de plan se hace otro día real (vie 20 → lun 23) y el aviso nombra ese día
      const nomV = vie ? ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][new Date(FV.fechaRealDe(vie.fecha, 'liviano') + 'T12:00:00Z').getUTCDay()] : '';
      if (vie && vie.casoId == null && (!gv || !new RegExp(`Hoy ${nomV} no hay caso`).test(gv.aviso || ''))) errores.push(`${vie.fecha} (21): el viernes de la lección no avisa de que el CASO ${r.casoId} va el ${r.fecha}`);
    }
  }
  // (22) D1 sin sesión → el 1.er día con sesión sale como D2 / «día 2» y lo avisa (Business y SYNAPSE)
  const b0 = B.BIZ_DIAS.find((x) => B.bizModo(x) !== 'DESCANSO');
  if (b0 && b0.d > 1 && B.BIZ_DIAS.filter((x) => x.d < b0.d).every((x) => (FV.corridaS1De(x.fecha) || {}).tipo === 'sin_sesion') && !new RegExp(`Primera lectura\\. Sale como D${b0.d} porque el D1 era el`).test((RG.guiaBusinessDe(b0.fecha) || {}).aviso || '')) errores.push(`${b0.fecha} (22): Business sale como D${b0.d} sin avisar`);
  const s0 = S.SYN_DIAS.find((x) => x.bloques.some((b) => /^[ABC]$/.test(b.tag)));
  if (s0 && s0.d > 1 && S.SYN_DIAS.filter((x) => x.d < s0.d).every((x) => (FV.corridaS1De(x.fecha) || {}).tipo === 'sin_sesion') && !new RegExp(`Primera sesión\\. Sale como día ${s0.d} porque el día 1 era el`).test((RG.guiaSynapseDe(s0.fecha) || {}).aviso || '')) errores.push(`${s0.fecha} (22): SYNAPSE sale como día ${s0.d} sin avisar`);
  // (23) SYNAPSE: recursos repartidos por FECHA — minutos contiguos, sin carril genérico a medias, retoma = sesión anterior del mismo recurso
  const synPasos = (iso) => [...(dow(iso) === 0 ? [RG.guiaShipDe(iso)] : []), RG.guiaSynapseDe(iso)].filter(Boolean).flatMap((g) => g.pasos); // v6.10w: las sesiones a hora fija de una cadena, aparte (con su fecha) // v6.09b: el dom 22 (llegada) lleva el SYNAPSE de recuperación en guiaSynapseDe
  const MESc = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const fC = (iso) => `${['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][dow(iso)]} ${Number(iso.slice(8))}-${MESc[Number(iso.slice(5, 7)) - 1]}`;
  const RECURSOS = [
    { n: 'Brockman', re: /Greg Brockman/, gen: /^B \(audio\) · No Priors .*Episodio de esta semana/, fin: 39 },
    { n: 'deep dive', re: /AI prompt engineering: A deep dive/, gen: null, fin: null },
    { n: 'Prompt injection', re: /Prompt injection attacks against GPT-3/, gen: /^C \(lectura\) · Simon Willison — serie Prompt injection — El siguiente artículo/, fin: null },
    { n: 'trifecta', re: /lethal trifecta/i, gen: null, fin: null },
  ];
  let nSes23 = 0;
  for (const rc of RECURSOS) {
    const ses = [];
    // v6.10w: la sesión a hora fija de una cadena (dom 29-nov 05:00 = la del sáb 28) cuenta con SU fecha real (la que citan los «retoma donde paraste el …»)
    for (const d of S.SYN_DIAS) {
      if (d.fecha > TH) break;
      for (const p of synPasos(d.fecha)) if (rc.re.test(p.que)) ses.push({ fecha: d.fecha, p });
      for (const r of (S.SYN_REC_F1 || []).filter((x) => x.cadena && x.plan === d.fecha)) for (const p of (RG.guiaSynapseRecDe(r.fecha, r.ini) || { pasos: [] }).pasos) if (rc.re.test(p.que)) ses.push({ fecha: r.fecha, p });
    }
    if (!ses.length) continue;
    nSes23 += ses.length;
    const mins = ses.map((x) => /minutos (\d+):00-(\d+):00/.exec(x.p.que)).filter(Boolean).map((m) => [Number(m[1]), Number(m[2])]);
    if (mins.length) { if (mins[0][0] !== 0) errores.push(`(23) ${rc.n}: la 1.ª sesión no empieza en 0:00`); for (let i = 1; i < mins.length; i++) if (mins[i][0] !== mins[i - 1][1]) errores.push(`(23) ${rc.n}: minutos no contiguos (${mins[i - 1].join('-')} → ${mins[i].join('-')})`); if (rc.fin && mins[mins.length - 1][1] !== rc.fin) errores.push(`(23) ${rc.n}: no llega al final (${rc.fin}′)`); }
    const ultima = ses[ses.length - 1].fecha;
    if (rc.gen) for (const d of S.SYN_DIAS) { if (d.fecha <= ses[0].fecha || d.fecha >= ultima) continue; for (const p of synPasos(d.fecha)) if (rc.gen.test(p.que)) errores.push(`${d.fecha} (23) ${rc.n}: carril genérico con el recurso a medias («${p.que.slice(0, 60)}…»)`); }
    ses.forEach((x, i) => { const m = /donde (?:paraste|quedaste) el (?:comodín del )?(\S+ \d+-\S+?)[.:,)\s]/.exec(x.p.como); if (m && (i === 0 || !ses.slice(0, i).some((y) => fC(y.fecha) === m[1]))) errores.push(`${x.fecha} (23) ${rc.n}: «retoma donde paraste el ${m[1]}» no es una sesión anterior del recurso`); });
  }
  // (24) cierre de Business de un sábado con clase en vivo: nunca 14:00 ni > 40′
  let nSab24 = 0;
  for (let sb = addDias(FV.FECHAS_V6.f1.inicio, (6 - dow(FV.FECHAS_V6.f1.inicio) + 7) % 7); sb <= TH; sb = addDias(sb, 7)) {
    const c = RG.bizCierreDe(sb); if (!c || c.fecha !== sb) continue;
    nSab24++;
    if (c.excede) errores.push(`${sb} (24): cierre Business de ${c.outs.reduce((a, o) => a + (o.entero ? 40 : 15), 0) + 10 * c.soloTracker.length}′ en sábado con clase en vivo: sin hueco (07:45-08:25 = 40′; 14:00 = revisión + preparar la clase): partirlo a mano`);
    if (RG.sabadoTheomed(sb) && c.ini === '14:00') errores.push(`${sb} (24): cierre Business a las 14:00 en sábado con clase en vivo (pisa la revisión)`);
  }
  console.log(`v6.09 · (21) OUTPUT de F1 tras su última lectura: ${nOut21} fuera del viernes de plan (${nOutVie21} en viernes real, sin «(en F1 no va el viernes)») · casos LIVIANO de F1 tras su lección: ${nCaso21} en lunes · (23) sesiones de recursos repartidos del SYNAPSE: ${nSes23} · (24) cierres de sábado de F1: ${nSab24}`);
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
 [/^Resistencia leptínica/, /leptin resistance/], [/^(VIERNES|LUNES|MARTES) CASO 1\/16/, /Lessons learned from the weight-reduced state/],
 [/^Circuito arcuato II/, /2\.ª pasada: POMC/], [/^(VIERNES|LUNES|MARTES) CASO 2\/16/, /Determinants of feeding behavior/], [/^El argumento del tratamiento crónico/, /Developmental determinants/]] // v6.09: en F1 los casos 1-5 van el LUNES, tras su lección
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
    RD2 = LIB('researchDailyPlan'), R272 = LIB('researchDailyPlan2027'), DC2 = LIB('dermaCiclo2'), MM2 = LIB('mirMantenimiento'), EM2 = LIB('encapsManana'), FR2 = LIB('encapsFranjasF2');
  const hm = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const tmB = (b) => /tiempo muerto|guardia|cuando se pueda|^tarde$|descansos del hito|todo el día/i.test(b.hora);
  const WDC = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const avisosSim = [];
  const contenido = (b, iso) => {   // guías del bloque (null = SIN contenido) — mismas consultas que TodayMission.contenidoBloquePlan
    switch (b.plan) {
      case 'vibecoding': { const g = b.id === 'pc' ? RG2.guiaShipDe(iso) : b.id === 'feynman' ? RG2.guiaFeynmanDe(iso) : VB2.vibeDiaDe(iso) ? RG2.guiaVibeDe(iso) : null; return g ? [g] : null; }
      case 'synapse': { const g = b.id === 'syn-cola' ? RG2.guiaSynapseColaDe(iso) /* v6.09b lote 1-ter */ : b.id === 'syn-rec' || b.id === 'syn-rec2' ? RG2.guiaSynapseRecDe(iso, b.ini) /* v6.10w: + syn-rec2 */ /* v6.10: recuperación a hora fija (sáb 28-nov 07:15), como TodayMission */ : SY2.synDiaDe(iso) ? RG2.guiaSynapseDe(iso) : null; return g ? [g] : null; }
      case 'business': { const g = RG2.guiaBusinessDe(iso); return g ? [g] : null; }
      case 'aurum': { const g = b.id === 'aurum-l' ? RG2.guiaAurumSabadoDe(iso) /* v6.09b lote 1-bis S2: sábado 04:15 de F1 */ : AU2.aurumDiaDe(iso) ? RG2.guiaAurumDe(iso, F62.faseV6(iso) === 'F4' ? b.ini : undefined) : null; return g ? [g] : null; }
      case 'liviano': { const g = LV2.livDiaDe(iso) ? RG2.guiaLivianoDe(iso) : null; return g ? [g] : null; }
      case 'revision': { const g = RG2.guiaRevisionDe(iso); return g ? [g] : null; }
      case 'mir': return MD2.mirSesionDe(iso) ? [] : null;
      case 'encaps': {
        // v6.07: bloques ENCAPS nuevos con su guía (encapsManana)
        if (b.id === 'encaps-am' || b.id === 'encaps-am2') { const gs = EM2.guiaEncapsMananaEnRango(iso, b.ini, b.fin); return gs.length ? gs : null; } // v6.09 (fix 2): domingo de plan en tramos
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
  let nSim = 0, nSab14 = 0, nSabF2Vivo = 0;
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
          const an = B_('anki'); /* v6.09: la 1.ª mañana ENCAPS (mié 18-nov) va antes del D2 del Step: mazos aún vacíos, el bloque no promete repasos */ if (!an || (iso === '2026-11-18' ? !/CONFIGURACIÓN/.test(an.nombre) : iso === '2026-11-19' ? !/sin tarjetas que repasar → vídeos de método/.test(an.nombre) : !/ENCAPS 15′/.test(an.nombre))) /* v6.10: la CONFIGURACIÓN (45′) va el mié 18 · v6.10b (decisión 4 de Joseph): jue 19 = D2 en nivel 0, mazo USMLE vacío → vídeos de método (sin UWSA1 ni triaje) · v6.10u: el preset vuelve a la configuración (mié 18 de plan); el D2, solo vídeos de método · v6.10y-b (sin efecto desde la v6.11: el lun 23 quedó sin sesión y la configuración vuelve entera al mar 24) */ errores.push(`${tag}: el Anki 05:00 no dice «USMLE 30′ + repasos ENCAPS 15′»`);
        }
        if (w === 6 && RG2.sabadoTheomed(iso) && bs.length) {
          const viv = EM2.theomedSabadoDe(iso);
          if (hora('revision') !== '14:00–14:30') errores.push(`${tag}: revisión semanal ${hora('revision')} ≠ 14:00–14:30`);
          if (viv && viv.vivo && (hora('theomed-prep') !== '14:45–15:00' || hora('theomed-vivo') !== '15:00–17:00')) errores.push(`${tag}: clase en vivo «${viv.vivo}» sin theomed-prep 14:45 + theomed-vivo 15:00-17:00`);
          if ((!viv || !viv.vivo) && (B_('theomed-prep') || B_('theomed-vivo'))) errores.push(`${tag}: bloque de clase en vivo un sábado sin clase`);
          if (RG2.guiaSynapseDe(iso) && hora('syn') !== '21:00–21:30') errores.push(`${tag}: SYNAPSE del sábado ${hora('syn')} ≠ 21:00–21:30`); // v6.07b: al volver del baile
        }
        if (w === 6 && B_('pc')) errores.push(`${tag}: bloque PC el sábado (v6.07: el SHIP del vibecoding es el domingo)`);
        if (w === 6 && SY2.synDiaDe(iso) && RG2.guiaSynapseDe(iso) && !B_('syn') && bs.length) errores.push(`${tag}: sábado con SYNAPSE A/B/C sin bloque SYNAPSE`);
        if (w === 0) {
          const pcs = VB2.vibePCDomingo(iso);
          if (RG2.guiaShipDe(iso) && (!B_('pc') || B_('pc').ini)) errores.push(`${tag}: el SHIP del domingo no tiene bloque PC flexible (sin hora)`);
          if (!B_('pc')) for (const x of pcs) if (!p.notas.some((n) => new RegExp(`S${x.s}\\b`).test(n)) && !F62.motivoProtegido(iso)) errores.push(`${tag}: PC de S${x.s} sin bloque ni nota`);
          { const dE = EM2.encapsDomingoDe(iso), bE = B_('encaps-dom'); // v6.10w: + a hora fija (modo previos)
            if (dE && (!bE || (dE.fija ? bE.ini !== dE.fija[0] || bE.fin !== dE.fija[1] : bE.ini))) errores.push(`${tag}: falta el ENCAPS del domingo (${dE.fija ? `a hora fija ${dE.fija.join('-')}` : 'flexible, sin hora'})`); }
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
      // v6.08 (14-nov-2026, decisiones 1 y 7) · (14) SÁBADO REAL de Joseph hasta el SERUMS (F1 · transición · F2 · F3): todo bloque con hora dentro de
      //   04:15-08:25 · 14:00-17:00 · 21:00-22:00 (gimnasio 08:30-14:00 · baile 17:00-20:00) y, en F2 (ene-mar), nada en 15:00-17:00 salvo el bloque de
      //   la propia clase EN VIVO de Theomed (theomed-vivo; fix est6: antes ni se pintaba) — antes el STEP 1 VIVO 07:45-09:15 y el cierre Business 09:15 caían en el gimnasio y el SYNAPSE 15:00 en la clase ·
      //   (15) todo día con Business (bizFranjaDe: fila de lectura / OUTPUT o cierre de la semana) tiene su bloque en la plantilla (v6.08: el plan llega
      //   a F3, mar 16 → sáb 20-mar)
      if (!turno && !p.corrida && dow(iso) === 6 && ['F1', 'TRANSICION', 'F2', 'F3'].includes(F62.faseV6(iso))) {
        // v6.12 (mar 24-nov-2026): un SÁBADO HÁBIL (corrida_s1.sabado_habil: día de estudio completo, sin gimnasio ni baile) estudia de 04:15 a 20:30 (como un L-V;
        //   = gen_fechas_v6.VENTANA_SABADO_HABIL) + su SYNAPSE y Anki de las 21:00-22:00, como cualquier sábado
        const habil = (F62.FECHAS_V6.corrida_s1.sabado_habil || []).includes(iso);
        const VENT = habil ? [['04:15', '20:30'], ['21:00', '22:00']] : [['04:15', '08:25'], ['14:00', '17:00'], ['21:00', '22:00']];
        for (const b of bs) {
          if (!b.ini || !b.fin || b.ini === b.fin || tmB(b)) continue;
          if (!VENT.some(([a, c]) => hm(a) <= hm(b.ini) && hm(b.fin) <= hm(c))) errores.push(`${tag}: ${b.hora} ${b.nombre.slice(0, 40)} fuera de las ventanas de estudio del ${habil ? 'sábado hábil' : 'sábado'} (${VENT.map((x) => x.join('-')).join(' · ')})`);
          else if (F62.faseV6(iso) === 'F2' && b.id !== 'theomed-vivo' && hm(b.ini) < hm('17:00') && hm('15:00') < hm(b.fin)) errores.push(`${tag}: ${b.hora} ${b.nombre.slice(0, 40)} encima de la clase EN VIVO de Theomed (15:00-17:00, sábados de ene-mar)`);
        }
        // v6.08 (fix revisión 14-nov, est6): el sábado de F2 con clase (encapsManana.theomedSabadoDe) PINTA la clase: theomed-vivo 15:00-17:00 y, si
        //   la franja 14:45-15:00 está libre (sin carril SÁBADO), theomed-prep 14:45-15:00 · sin clase, ninguno de los dos
        if (F62.faseV6(iso) === 'F2') {
          const B_ = (id) => bs.find((b) => b.id === id);
          const hora = (id) => { const b = B_(id); return b ? `${b.ini}–${b.fin}` : null; };
          const vivF2 = EM2.theomedSabadoDe(iso);
          const pisa1445 = bs.some((b) => b.id !== 'theomed-prep' && b.ini && b.fin && hm(b.ini) < hm('15:00') && hm('14:45') < hm(b.fin));
          if (vivF2 && vivF2.vivo) {
            if (hora('theomed-vivo') !== '15:00–17:00' || !EM2.guiaTheomedVivoDe(iso)) errores.push(`${tag}: clase EN VIVO de F2 «${vivF2.vivo}» sin bloque theomed-vivo 15:00-17:00 (o sin guía)`);
            if (!pisa1445 && hora('theomed-prep') !== '14:45–15:00') errores.push(`${tag}: 14:45-15:00 libre y sin «preparar la clase» (theomed-prep) de «${vivF2.vivo}»`);
            if (pisa1445 && B_('theomed-prep')) errores.push(`${tag}: theomed-prep 14:45 encima de otro bloque (carril SÁBADO)`);
            nSabF2Vivo++;
          } else if (B_('theomed-prep') || B_('theomed-vivo')) errores.push(`${tag}: bloque de clase en vivo un sábado de F2 sin clase`);
        }
        nSab14++;
      }
      if (!turno && !p.corrida && RG2.bizFranjaDe(iso) && !bs.some((b) => b.plan === 'business')) errores.push(`${tag}: hay Business hoy (${RG2.bizFranjaDe(iso).ini}) y la plantilla no trae su bloque`);
      // v6.06 (fix) · ningún bloque nombra una FASE del régimen distinta de la del día (F3: «SYNAPSE · 30' (cierre F2)»); se permite «REPOSICIÓN F1»
      //   (lo de la F1 que se repone en el carril sábado de F2)
      for (const b of bs) {
        const m = /\bF([1-5])\b/.exec(b.nombre.replace(/REPOSICIÓN F\d\b/g, ''));
        if (m && `F${m[1]}` !== FASE_N(F62.faseV6(iso))) errores.push(`${tag}: el bloque «${b.nombre.slice(0, 60)}» nombra la fase F${m[1]} en un día de ${F62.faseV6(iso)}`);
      }
    }
  }
  global.localStorage.removeItem(ST2.TURNOS_KEY);
  console.log(`v6.08 · sábados hasta el SERUMS dentro de las ventanas reales (04:15-08:25 · 14:00-17:00 · 21:00-22:00; F2: en 15:00-17:00 solo la clase en vivo): ${nSab14} · sábados de F2 con la clase EN VIVO de Theomed pintada: ${nSabF2Vivo} · todo día con Business con su bloque`);
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
  //   v6.07 (fix rev. e5fd4bd, revisión adversarial): (6) la corrección de TODO simulacro (SIM 07:15 y pre-test → 09:30-12:00 · 11:00 → 16:15-17:15 o
  //   18:00-18:45) con su ítem D{dia}:i_sim_corr a la misma hora y con la misma duración (antes 60′ fijos) y sin LOOP ni EVAL un día de simulacro
  //   (cualquier L-V); (6b) Horario = Home también en la corrección de las 07:15 (con sus 2 tramos), en el CIERRE SEMANAL y en el D-1 (medio día, en
  //   serie desde las 07:15); (12b) CIERRE SEMANAL con bloque 'encaps-semana' + ítem D{dia}:i_semana ⇔ el día de SIM / pre-test cierra la semana
  //   (encapsFranjasF2.ultimoHabilDeSemana): 18:00-18:45, o 18:45-19:00 tras la corrección de las 18:00 (vie 5-mar).
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
    let nF2 = 0, nCB = 0, nCorr = 0, nRep = 0, nMs = 0, nEv7 = 0, nHor = 0, nSen = 0, nAbs = 0, nSemB = 0, nMd = 0;
    for (const r of ROWS) {
      const p = PL.plantillaDelDia(r.fecha);
      if (p.fase !== 'F2' || p.corrida) continue;
      nF2++;
      const bs = p.bloques, tag = `${r.fecha} ${WDC[dow(r.fecha)]} D${r.dia} ${r.tipo}`, w = dow(r.fecha);
      const hb = (b) => (b ? `${b.ini}–${b.fin}` : '—');
      const enc = bs.find((b) => b.id === 'encaps'), cb = bs.find((b) => b.id === 'carrilb'), ev = bs.find((b) => b.id === 'eval'), corr = bs.find((b) => b.id === 'encaps-corr'), sem = bs.find((b) => b.id === 'encaps-semana');
      const prev = ROWS.find((x) => x.dia === r.dia - 1) || null;
      let its = [];
      try { its = EP2.itemsForDay(r, {}, prev, null); } catch (e) { errores.push(`${tag}: encapsPlan.itemsForDay lanzó ${e.message}`); }
      // (6b) Horario de ENCAPS → Plan (fila viva = la del SQL) ⇔ Home
      let hor = null;
      if (horarioDe) { try { hor = horarioDe(r); } catch (e) { errores.push(`${tag}: EncapsPlanView.bloquesIntensivo lanzó ${e.message}`); } }
      if (hor) {
        nHor++;
        const hCorr = hor.find((b) => /^📊/.test(b.titulo)), hCB = hor.find((b) => /^◈ CARRIL B/.test(b.titulo)), hSem = hor.find((b) => /^📈/.test(b.titulo));
        // v6.07 (fix rev. e5fd4bd #3): la corrección de TODO simulacro (SIM 07:15 / 11:00, pre-test, dress) a la misma hora en el Horario y en el Home (antes
        //   solo las de las 11:00: vie 8-ene sin bloque en el Home y los SIM 07:15 a 09:30-10:30 en el Horario pasaban) y, en la de las 07:15, sus 2 tramos
        //   (corrección + cierre · 2 códigos peores) a las horas que dice el bloque del Home
        if (!!hCorr !== !!corr || (corr && hCorr.hora !== `${corr.ini}-${corr.fin}`)) errores.push(`${tag}: ENCAPS → Plan › Horario pinta la corrección del simulacro ${hCorr ? hCorr.hora : '—'} y el Home ${hb(corr)}`);
        else if (corr && corr.ini === '09:30') { const pt = (hCorr.pasos || []).map((p) => p.t); if (pt.length !== 2 || !corr.nombre.includes(`${pt[0]}-${pt[1]}`) || !corr.nombre.includes(`${pt[1]}-${corr.fin}`)) errores.push(`${tag}: tramos de la corrección en el Horario (${pt.join(' · ') || '—'}) ≠ los del bloque del Home «${corr.nombre}»`); }
        // (#5) CIERRE SEMANAL: Horario ⇔ Home, a la misma hora
        if (!!hSem !== !!sem || (sem && hSem.hora !== `${sem.ini}-${sem.fin}`)) errores.push(`${tag}: CIERRE SEMANAL en el Horario ${hSem ? hSem.hora : '—'} ≠ Home ${hb(sem)}`);
        if (!!hCB !== !!cb || (hCB && hCB.hora !== `${cb.ini}-${cb.fin}`)) errores.push(`${tag}: CARRIL B en el Horario ${hCB ? hCB.hora : '—'} ≠ Home ${hb(cb)}`);
        if (['senales', 'repaso_final', 'medio_dia'].includes(r.tipo) && !Array.isArray(r.extra.loop)) { // v6.07 (fix rev. e5fd4bd #6): + el D-1 (medio día)
          if (r.tipo === 'medio_dia') nMd++;
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
        // v6.07 (fix rev. e5fd4bd #1/#5): un día de simulacro (CUALQUIER L-V) no lleva LOOP ni EVAL 18:00 (la fila no trae extra.loop); las 18:00 del
        //   viernes son el CIERRE SEMANAL (abajo)
        if (bs.some((b) => /LOOP/.test(b.nombre))) errores.push(`${tag}: simulacro de las ${h} con LOOP en la plantilla`);
        if (ev) errores.push(`${tag}: EVAL 18:00 «${ev.nombre.slice(0, 50)}» en un día de simulacro (la fila no trae extra.loop)`);
        // (6) corrección + CIERRE con su ítem D{dia}:i_sim_corr, A LA MISMA HORA Y CON LA MISMA DURACIÓN (v6.07 fix rev. e5fd4bd #3/#4; antes el ítem
        //   duraba 60′ siempre): SIM / pre-test de las 07:15 → 09:30-12:00 (corrección 09:30-11:00 + 2 códigos peores 11:00-12:00; PROPUESTA_V6 §2.2,
        //   PRETEST_2026-II.md) · 11:00: 16:15 libre → 16:15-17:15; 16:15 del carril B → 18:00-18:45
        const kCorr = `D${r.dia}:i_sim_corr`, itC = its.find((it) => it.key === kCorr);
        const esperaCorr = h === '11:00' ? (r.extra.carril_b ? '18:00–18:45' : '16:15–17:15') : '09:30–12:00';
        if (!corr || hb(corr) !== esperaCorr) errores.push(`${tag}: corrección del simulacro de las ${h} ${hb(corr)} (≠ ${esperaCorr}${h === '11:00' ? `: ${r.extra.carril_b ? 'el 16:15 es del carril B' : '16:15 libre'}` : ''})`);
        else if (!String(corr.detalle || '').includes(kCorr)) errores.push(`${tag}: el bloque de corrección no nombra el ítem ${kCorr} (TodayMission lo muestra como tema)`);
        else if (!itC) errores.push(`${tag}: ENCAPS → Plan sin el ítem ${kCorr}`);
        else if (itC.hora !== hb(corr) || itC.dur !== hm(corr.fin) - hm(corr.ini)) errores.push(`${tag}: ítem ${kCorr} ${itC.hora || 'sin hora'} · ${itC.dur}′ ≠ bloque del Home ${hb(corr)} (${hm(corr.fin) - hm(corr.ini)}′)`);
        else nCorr++;
        // (12b) v6.07 (fix rev. e5fd4bd #5): CIERRE SEMANAL ⇔ el día de SIM / pre-test cierra la semana (encapsFranjasF2.ultimoHabilDeSemana: el viernes),
        //   con su ítem D{dia}:i_semana a la misma hora y duración: 18:00-18:45, o al terminar la corrección de las 18:00 hasta las 19:00 (vie 5-mar)
        const kSem = `D${r.dia}:i_semana`, itS = its.find((it) => it.key === kSem);
        const esperaSem = r.tipo !== 'dress_rehearsal' && FR2.ultimoHabilDeSemana(r.fecha);
        if (!!sem !== esperaSem || !!itS !== esperaSem) errores.push(`${tag}: CIERRE SEMANAL ${sem ? hb(sem) : 'sin bloque'} · ítem ${itS ? itS.hora : '—'} y el día ${esperaSem ? 'sí' : 'no'} cierra la semana`);
        else if (sem) {
          const esperaH = corr && corr.ini === '18:00' ? `${corr.fin}–19:00` : '18:00–18:45';
          if (hb(sem) !== esperaH || itS.hora !== hb(sem) || itS.dur !== hm(sem.fin) - hm(sem.ini)) errores.push(`${tag}: CIERRE SEMANAL ${hb(sem)} · ítem ${itS.hora} ${itS.dur}′ (≠ ${esperaH})`);
          else if (!String(sem.detalle || '').includes(kSem) || !/--pull/.test(sem.detalle) || !/--semana/.test(sem.detalle)) errores.push(`${tag}: el bloque del CIERRE SEMANAL no nombra ${kSem} ni --pull → --semana`);
          else nSemB++;
        }
        if (h === '11:00') {
          const s = bs.find((b) => b.plan === 'synapse');
          if (s && hb(s) !== '13:00–13:30') errores.push(`${tag}: SIM 11:00 con el SYNAPSE ${hb(s)} (≠ 13:00–13:30)`);
        }
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
      // v6.10: el día extra de fin de semana (corrida_s1.extra › liviano: dom 6-dic 08:15-09:00) va a SU franja (bloqueCorrido); los demás, a las 17:15
      else if (((x2) => (x2 ? b.ini !== x2.ini || b.fin !== x2.fin : b.ini !== '17:15' || b.fin !== '18:00'))(FV.extraCorridaDe(x.fecha).find((y) => y.frente === 'liviano'))) errores.push(`${x.fecha} LIVIANO D${x.d}: bloque ${b.hora} (≠ ${(FV.extraCorridaDe(x.fecha).find((y) => y.frente === 'liviano') || { ini: '17:15', fin: '18:00' }).ini}–${(FV.extraCorridaDe(x.fecha).find((y) => y.frente === 'liviano') || { ini: '17:15', fin: '18:00' }).fin})`);
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
    // (13) v6.08 (14-nov-2026): MAÑANAS ENCAPS fuera de F1 (encapsManana, diaExtra: jue 31-dic —v6.08: día extra SOLO ENCAPS; v6.09: día de PLAN de la
    //   transición (recupera el lun 16-nov) con 16:15 y secundarios— · mar 5-ene, en la intensiva en lugar del calentamiento I-3): la plantilla del día pinta
    //   encaps-am 07:15-12:00 + encaps-pm 18:00-18:45 (con su guía: lo cubre la simulación), sin USMLE, LOOP ni EVAL 18:00; un día SKIP con mañana extra
    //   (v6.08: el 31-dic; v6.09: ninguno) no lleva ningún otro bloque; en la intensiva, la fila del día trae extra.manana_f1 y su
    //   extra.loop = el Anki de las 05:00 + las franjas de la guía (hora y minutos), sin segmento de las 18:00
    let nExtra = 0;
    for (const f of EM2.ENCAPS_MANANA_FECHAS) {
      const am = EM2.encapsMananaDe(f);
      if (!am || !am.diaExtra) continue;
      nExtra++;
      const bs = PL.plantillaDelDia(f).bloques, tag = `${f} mañana ENCAPS ${am.n}/${am.de} (día extra)`;
      const hx = (id) => { const b = bs.find((x) => x.id === id); return b ? `${b.ini}–${b.fin}` : '—'; };
      if (hx('encaps-am') !== '07:15–12:00' || hx('encaps-pm') !== '18:00–18:45') errores.push(`${tag}: falta encaps-am 07:15-12:00 o encaps-pm 18:00-18:45 (hay ${hx('encaps-am')} / ${hx('encaps-pm')})`);
      if (bs.some((b) => b.id === 'usmle' || b.id === 'eval' || (b.id === 'encaps' && /LOOP/.test(b.nombre)))) errores.push(`${tag}: con bloque USMLE, EVAL 18:00 o LOOP`);
      if (F62.FECHAS_V6.skip.includes(f) && bs.some((b) => !['encaps-am', 'encaps-pm'].includes(b.id))) errores.push(`${tag}: día SKIP con bloques de otros planes (${bs.filter((b) => !['encaps-am', 'encaps-pm'].includes(b.id)).map((b) => b.id).join(', ')})`);
      const r = ROWS.find((x) => x.fecha === f);
      if (r) {
        const esp = JSON.stringify(EM2.guiaEncapsMananaDe(f).map((g) => { const q = G2.partesFranja(g.franja); return [q && q.ini, g.totalMin]; }));
        const lp = Array.isArray(r.extra.loop) ? r.extra.loop : [];
        if (!r.extra.manana_f1 || r.extra.manana_f1.n !== am.n || JSON.stringify(lp.filter((sg) => sg.h !== '05:00').map((sg) => [sg.h, sg.min])) !== esp || lp.some((sg) => sg.h === '18:00')) errores.push(`${tag}: la fila D${r.dia} de la intensiva no trae extra.manana_f1 ni extra.loop = las franjas de su guía (sin el segmento de las 18:00)`);
      }
    }
    if (EM2.ENCAPS_MANANA_META.extra && EM2.ENCAPS_MANANA_META.extra.length !== nExtra) errores.push(`encapsManana: ${EM2.ENCAPS_MANANA_META.extra.length} días extra en el META y ${nExtra} mañanas con diaExtra`);
    console.log(`v6.08 · mañanas ENCAPS fuera de F1: ${nExtra} (bloques encaps-am + encaps-pm sin USMLE ni LOOP; fila de la intensiva = su guía)`);
    console.log(`intensiva ENCAPS ↔ plantilla F2 (SQL ${ROWS.length} filas = índice F2): ${nF2} día(s) F2 · SIM 11:00 ${lista(sim11)} · quincena SIM ${lista(qSim)} · repaso ${lista(qRep)} · cola ${COLA.join(' ')} · REPASO sin loop ${nRep} · corrección de simulacro (Home = Horario = ítem, hora y duración) ${nCorr} · cierre semanal con bloque + ítem ${nSemB} · D-1 en serie ${nMd} · carril B ${nCB} día(s) (viernes: ${lista(cbVie) || '—'} · mini-sim ${nMs}) · EVAL ANCLADA tras SIM ${nEv7} · «mini-sim absorbido» comprobado en ${nAbs} · Horario = Home en ${nHor} día(s) · señales ${nSen} · cierre semanal en ${nSem} semana(s) · carril SÁBADO ${nSab} a la hora del SQL · LIVIANO en F3 ${nLiv} sesión(es) · Business+SYNAPSE ${nBS2} día(s) sin solape`);
  }
  // v6.08 (rev. 14-nov · lote secundarios): controles (16)-(19) — ver la cabecera
  {
    const frm = (s) => { const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(s || ''); return m ? [hm(m[1]), hm(m[2])] : null; };
    const cruza = (a, b) => !!a && !!b && a[0] < b[1] && b[0] < a[1];
    const US2 = LIB('usmleStep1Daily'), BZ2 = LIB('businessStudyPlan');
    const ini16 = addDias(F62.FECHAS_V6.f1.inicio, -7), fin16 = '2027-04-30';
    let nDom16 = 0, nNb17 = 0, nSab18 = 0, nNota19 = 0;
    for (let iso = ini16; iso <= fin16; iso = addDias(iso, 1)) {
      const w = dow(iso);
      if (w === 0) {
        const sh = RG2.guiaShipDe(iso); if (!sh) continue;
        const s = frm(sh.franja), p = PL.plantillaDelDia(iso), an = p.bloques.find((b) => b.id === 'anki-dom');
        const en = EM2.guiaEncapsDomingoDe(iso), fe = RG2.guiaFeynmanDe(iso);
        if (an && cruza(s, [hm(an.ini), hm(an.fin)])) errores.push(`${iso} (16): el ejemplo del SHIP ${sh.franja} pisa el Anki del domingo ${an.ini}-${an.fin}`);
        if (en && cruza(s, frm(en.franja))) errores.push(`${iso} (16): el ejemplo del SHIP ${sh.franja} pisa el ejemplo del ENCAPS del domingo ${en.franja}`);
        // v6.08 (Calendar): desde el dom 6-dic, con el ejemplo de tarde, el Feynman va en los 10′ iniciales del SHIP (RG2.feynmanAlEmpezarShip)
        const alEmp = RG2.feynmanAlEmpezarShip(iso);
        if (fe && (!frm(fe.franja) || (alEmp ? frm(fe.franja)[0] !== s[0] || frm(fe.franja)[1] > s[1] : frm(fe.franja)[1] !== s[0]))) errores.push(`${iso} (16): el Feynman ${fe.franja} no va ${alEmp ? 'al empezar' : 'justo antes'} del SHIP ${sh.franja}`);
        if (fe && en && cruza(frm(fe.franja), frm(en.franja))) errores.push(`${iso} (16): el ejemplo del Feynman ${fe.franja} pisa el ejemplo del ENCAPS ${en.franja}`);
        if (s && s[0] < hm('07:15')) errores.push(`${iso} (16): el ejemplo del SHIP ${sh.franja} empieza antes de las 07:15 (caminata, ducha y desayuno)`);
        nDom16++;
      }
      if (w === 6 && SY2.synDiaDe(iso) && SY2.synDiaDe(iso).bloques.some((b) => /^[ABC]$/.test(b.tag))) {
        const p = PL.plantillaDelDia(iso); if (p.corrida) continue;
        const av = RG2.synFranjaDe(iso).aviso || '', viv = EM2.theomedSabadoDe(iso);
        const espViv = viv ? !!viv.vivo : F62.faseV6(iso) === 'F2';
        if (/Theomed en vivo/.test(av) !== espViv) errores.push(`${iso} (18): el aviso del SYNAPSE ${espViv ? 'no nombra' : 'nombra'} la clase en vivo (${viv ? `theomedSabadoDe: ${viv.vivo || 'sin clase'}` : 'sin datos'})`);
        if (viv && /Theomed en vivo/.test(av) !== p.bloques.some((b) => b.id === 'theomed-vivo')) errores.push(`${iso} (18): el aviso del SYNAPSE y el bloque theomed-vivo no cuadran`);
        if (/Anki de las 21:30/.test(av) !== p.bloques.some((b) => b.id === 'anki-sab')) errores.push(`${iso} (18): el aviso del SYNAPSE ${/Anki de las 21:30/.test(av) ? 'nombra' : 'no nombra'} «el Anki de las 21:30» y la plantilla ${p.bloques.some((b) => b.id === 'anki-sab') ? 'lo trae' : 'no lo trae'}`);
        nSab18++;
      }
      const pN = PL.plantillaDelDia(iso);
      if (pN.notas.some((n) => /lo de los sábados va los domingos/.test(n))) {
        const cD = F62.corridaS1De(addDias(iso, 1));
        if (!cD || cD.tipo === 'sin_sesion') errores.push(`${iso} (19): nota «Sábado libre … lo de los sábados va los domingos» y el domingo ${addDias(iso, 1)} no trae plan de la corrida`);
        nNota19++;
      }
    }
    for (const h of US2.DIAS_T2.filter((x) => US2.esHito(x) && F62.faseV6(x.fecha) === 'F3' && /NBME/.test(x.uw) && !/Self-Assessment|UWSA/.test(x.uw))) {
      const f = h.fecha, synAbc = SY2.synDiaDe(f) && SY2.synDiaDe(f).bloques.some((b) => /^[ABC]$/.test(b.tag));
      if (synAbc && RG2.synFranjaDe(f).franja !== '13:00–13:30') errores.push(`${f} (17): NBME de F3 con SYNAPSE ${RG2.synFranjaDe(f).franja} ≠ 13:00–13:30 (almuerzo 12:30)`);
      const r = BZ2.bizDiaDe(f);
      if (r && BZ2.bizModo(r) === 'OUTPUT') {
        const sab = addDias(f, 6 - dow(f)), c = RG2.bizCierreDe(sab), g = c ? RG2.guiaBusinessDe(c.fecha) : null;
        if (RG2.bizFranjaDe(f)) errores.push(`${f} (17): NBME de F3 con el OUTPUT D${r.d} el mismo día (debe ir entero al cierre del sábado)`);
        if (!c || !c.outs.some((o) => o.r.d === r.d && o.entero)) errores.push(`${f} (17): el OUTPUT D${r.d} del NBME no va ENTERO en el cierre de la semana`);
        else if (!g || g.franja !== `${c.ini}–${c.fin}`) errores.push(`${c.fecha} (17): cierre ${c.ini}–${c.fin} sin guía de Business (${g ? g.franja : '—'})`);
        if (!PL.plantillaDelDia(f).notas.some((n) => /va ENTERO/.test(n))) errores.push(`${f} (17): las notas del día no avisan de que el OUTPUT D${r.d} va entero al sábado`);
      } else if (r && BZ2.bizModo(r) !== 'DESCANSO' && (!RG2.bizFranjaDe(f) || `${RG2.bizFranjaDe(f).ini}–${RG2.bizFranjaDe(f).fin}` !== '12:30–12:55')) errores.push(`${f} (17): NBME de F3 con Business de lectura fuera del almuerzo 12:30-12:55`);
      if (synAbc || r) nNb17++;
    }
    console.log(`v6.08 · (16) domingos con SHIP de ejemplo sin pisar el Anki 16:45 ni el ENCAPS: ${nDom16} · (17) NBME de F3 con SYNAPSE / Business: ${nNb17} · (18) avisos del SYNAPSE del sábado: ${nSab18} · (19) notas «sábado libre»: ${nNota19}`);
    // (25) v6.09 (rev. datos 1 / joseph 7): ninguna nota de un día SKIP posterior a transicion.hasta dice que el 31-dic es día de plan (plantillasV6; el lote
    //   ENCAPS la arregla: hasta entonces este control falla en Jueves y Viernes Santo de 2027)
    let nSkip25 = 0;
    for (const f of F62.FECHAS_V6.skip.filter((x) => x > F62.FECHAS_V6.transicion.hasta)) {
      nSkip25++;
      for (const n of PL.plantillaDelDia(f).notas) if (/31-dic/.test(n) && /día de plan/.test(n)) errores.push(`${f} (25): la nota del día SKIP dice que el 31-dic es día de plan: «${n.slice(0, 160)}»`);
    }
    console.log(`v6.09 · (25) días SKIP posteriores a la transición sin «31-dic … día de plan» en sus notas: ${nSkip25} revisados`);
  }
  console.log(`simulación del día: ${nSim} día×turno (${SIM_INI} → ${SIM_FIN}; última fila MIR ${MIR_FIN}) · solapes, bloques sin contenido, guías fuera de su bloque, MIR y fases nombradas`);
  // v6.09b lote 1-ter (S3 · hallazgo 1 de la revisión R) · (26) COLA DEL SYNAPSE DE F1 CON FRANJA REAL — cada fecha de SYN_COLA_POST_STEP1 (F5, fuera del
  //   rango de la simulación de arriba y del --rango de la batería) y de SYN_COLA_F1 (huecos de F1 con hora): (a) la plantilla del día (todos los turnos en
  //   F5) trae el bloque «syn-cola» con la hora del generador, sin solaparse con ningún otro bloque con hora; (b) su guía (guiaSynapseColaDe) cae en el
  //   bloque, Σ pasos = franja = 30′ (el último día de la cola, si va corto, sus minutos) y cada paso con necesario/asignado ∈ [0,85; 1,15]; (c) la cola es
  //   L-V sin SKIP, protegidos ni feriados; (d) toda fecha de la cola que citan los textos de F1 («cola post-Step 1 04:15: …») existe en la cola, y viceversa
  //   ninguna pieza queda sin una sesión de F1 que la mande ahí; (e) ninguna fecha FUTURA después del corte del Calendar (140 del «qué» · 100 del «cómo») en
  //   los pasos de SYNAPSE, Business, AURUM y LIVIANO de F1 (18-nov → 3-ene; hallazgo 5).
  {
    const COLA = [...SY2.SYN_COLA_F1.map((d) => ({ ...d, post: false })), ...SY2.SYN_COLA_POST_STEP1.map((d) => ({ ...d, post: true }))];
    const ultimo = SY2.SYN_COLA_POST_STEP1[SY2.SYN_COLA_POST_STEP1.length - 1];
    let nCola = 0, nPasosCola = 0;
    if (!SY2.SYN_COLA_POST_STEP1.length) errores.push('(26) SYN_COLA_POST_STEP1 vacía');
    for (const c of COLA) {
      const f5 = F62.faseV6(c.fecha) === 'F5';
      if (c.post && (!f5 || dow(c.fecha) === 0 || dow(c.fecha) === 6 || F62.SKIP_V6.has(c.fecha) || F62.esFeriado(c.fecha) || F62.motivoProtegido(c.fecha))) errores.push(`(26) ${c.fecha}: día de la cola post-Step 1 que no es L-V hábil de F5`);
      for (const turno of f5 ? [undefined, 'M', 'T', 'L', 'G'] : [undefined]) {
        ST2 && global.localStorage.removeItem(ST2.TURNOS_KEY);
        const p = PL.plantillaDelDia(c.fecha, turno), tag = `(26) ${c.fecha} ${p.plantilla}${turno ? '/' + turno : ''}`;
        const b = p.bloques.find((x) => x.id === 'syn-cola');
        if (!b) { errores.push(`${tag}: sin bloque SYNAPSE de la cola (${c.ini}-${c.fin})`); continue; }
        if (b.ini !== c.ini || b.fin !== c.fin) errores.push(`${tag}: bloque ${b.hora} ≠ ${c.ini}-${c.fin}`);
        for (const o of p.bloques) if (o !== b && o.ini && o.fin && o.ini !== o.fin && !tmB(o) && hm(o.ini) < hm(b.fin) && hm(b.ini) < hm(o.fin)) errores.push(`${tag}: SYNAPSE ${b.hora} ⟂ ${o.hora} ${o.nombre.slice(0, 40)}`);
        if (turno) continue;
        nCola++;
        const g = RG2.guiaSynapseColaDe(c.fecha);
        if (!g) { errores.push(`${tag}: sin guía (guiaSynapseColaDe)`); continue; }
        if (g.franja !== `${c.ini}–${c.fin}`) errores.push(`${tag}: guía ${g.franja} fuera de su bloque ${b.hora}`);
        const tot = g.pasos.reduce((x, y) => x + y.min, 0);
        if (tot !== g.totalMin || tot !== c.min) errores.push(`${tag}: Σ pasos ${tot}′ ≠ franja ${g.totalMin}′ / ${c.min}′`);
        if (c.post && c.min !== 30 && c.fecha !== ultimo.fecha) errores.push(`${tag}: la cola es de 30′/día y este día lleva ${c.min}′`); // v6.09b lote 1-quater: por fecha (c es una copia: `c !== ultimo` era siempre cierto)
        if (c.pasos.length !== g.pasos.length) errores.push(`${tag}: ${g.pasos.length} pasos en la guía y ${c.pasos.length} en la cola`);
        c.pasos.forEach((x, i) => { nPasosCola++; const r = x.med / x.min, gm = (g.pasos[i] || {}).min; if (r < 0.85 || r > 1.15 || gm !== x.min) errores.push(`${tag}: paso ${i + 1} con ${x.med}′ de material en ${x.min}′ (ratio ${r.toFixed(2)}; guía ${gm}′)`); });
      }
    }
    // (d) fechas de la cola citadas en F1 ↔ cola
    const MESc = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const isoDe = (d, mes, y) => `${y}-${String(MESc.indexOf(mes) + 1).padStart(2, '0')}-${String(Number(d)).padStart(2, '0')}`;
    const colaSet = new Set(SY2.SYN_COLA_POST_STEP1.map((d) => d.fecha));
    let nCit = 0;
    for (const d of SY2.SYN_DIAS) for (const x of d.bloques) {
      const t = x.guia ? x.guia.como : '';
      for (const m of t.matchAll(/cola (?:post-Step 1 )?\d\d:\d\d: (?:\S+ )?(\d{1,2})-(\w{3})-(\d{4})(?: → (?:\S+ )?(\d{1,2})-(\w{3})-(\d{4}))?/g)) {
        nCit++;
        const a = isoDe(m[1], m[2], m[3]), z = m[4] ? isoDe(m[4], m[5], m[6]) : a;
        if (!colaSet.has(a) || !colaSet.has(z)) errores.push(`(26) ${d.fecha} ${x.tag}: cita la cola ${a}${z !== a ? ' → ' + z : ''} y esa fecha no está en SYN_COLA_POST_STEP1`);
      }
    }
    if (!nCit) errores.push('(26) ningún texto de F1 cita la cola post-Step 1 (¿se perdió el destino del resto?)');
    // (e) ninguna fecha FUTURA después del corte del Calendar en los pasos de SYNAPSE · Business · AURUM · LIVIANO de F1 (18-nov → 3-ene)
    const FR = /(?<![\p{L}\d])(?:(?:lun|mar|mié|jue|vie|sáb|dom)\.? )?(\d{1,2})-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)(?:-(\d{4}))?(?![\p{L}\d])/gu;
    const URLX = /(https?|file|obsidian|vscode):\/\/[^\s)»\]]+/g;
    const fut = (txt, f, corte) => { const o = []; for (const m of String(txt).replace(URLX, '').matchAll(FR)) { const mes = MESc.indexOf(m[2]) + 1, y = m[3] ? Number(m[3]) : mes >= 7 ? 2026 : 2027; const iso = `${y}-${String(mes).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`; if (iso > f && m.index + m[0].length > corte) o.push(`«${m[0]}» en ${m.index + m[0].length}`); } return o; };
    let nDest = 0, nSinF = 0;
    // v6.09b lote 1-quater (QS · hallazgo e de R2): (26e) cubre también VIBECODING 04:15, el SHIP y el FEYNMAN del domingo (antes solo SYNAPSE · Business ·
    //   AURUM · LIVIANO: el «Lo que no cierre hoy va al SHIP del dom 29-nov» del lun 23-nov estaba en el carácter 148 y nadie lo veía) · (26f) en esos mismos
    //   frentes, ninguna frase de DESTINO SIN FECHA en los pasos de F1 (las que la regla no admite: «va al SHIP del domingo», «sigue en la cola de lectura»,
    //   «lo fecha el plan…», «primeras de la cola», «en un tiempo muerto», «no hoy», «después del min … no es tarea»).
    const SIN_F = /(va al SHIP del domingo|sigue en la cola de lectura|lo fecha el plan|primeras de la cola|en un tiempo muerto|\bno hoy\b|después del min [\d:]+ no es tarea|no es tarea del plan)/i;
    for (let iso = '2026-11-18'; iso <= FV.FECHAS_V6.transicion.hasta; iso = addDias(iso, 1)) {
      const gs = [['SYNAPSE', RG2.guiaSynapseDe(iso)], ['SYNAPSE cola', RG2.guiaSynapseColaDe(iso)], ['Business', RG2.guiaBusinessDe(iso)], ['AURUM', AU2.aurumDiaDe(iso) ? RG2.guiaAurumDe(iso) : null], ['AURUM sáb', RG2.guiaAurumSabadoDe(iso)], ['LIVIANO', LV2.livDiaDe(iso) ? RG2.guiaLivianoDe(iso) : null],
        ['VIBECODING', RG2.guiaVibeDe(iso)], ['SHIP', RG2.guiaShipDe(iso)], ['Feynman', RG2.guiaFeynmanDe(iso)]];
      for (const [n, g] of gs) for (const p of (g && g.pasos) || []) {
        nDest++;
        // v6.11 (mar 24-nov): el SYNAPSE de una fila de plan que se hace días después (alias) cita como PASADO lo ya hecho («Retoma donde paraste el sáb 28-nov», fila del
        //   vie 27 que se hace el jue 3-dic): sus fechas de destino se miden desde su día real
        const isoR = n === 'SYNAPSE' && FV.fechaRealDe(iso, 'synapse') > iso ? FV.fechaRealDe(iso, 'synapse') : iso;
        for (const e of fut(p.que, isoR, 140)) errores.push(`(26e) ${iso} ${n}: fecha de destino ${e} del «qué» (> 140: el Calendar la corta) · «${p.que.slice(0, 60)}…»`);
        for (const e of fut(p.como, isoR, 100)) errores.push(`(26e) ${iso} ${n}: fecha de destino ${e} del «cómo» (> 100: el Calendar la corta) · «${p.como.slice(0, 60)}…»`);
        if (['SYNAPSE', 'SYNAPSE cola', 'Business', 'VIBECODING', 'SHIP', 'Feynman'].includes(n)) { nSinF++; const m = SIN_F.exec(`${p.que} ${p.como}`); if (m) errores.push(`(26f) ${iso} ${n}: destino sin fecha «${m[0]}» · «${p.que.slice(0, 60)}…»`); }
      }
    }
    // (26g) v6.09b lote 1-quater (QS · hallazgo a de R2): todo resto de F1 que el SYNAPSE manda a un día de 2027 con su tramo («Resto → vie 8-ene (15:00-18:19 a
    //   1,5×)») aparece TAL CUAL en el paso de ese día (minutos y velocidad): antes el vie 8-ene decía «1,0× · exactamente 10′» y recibía 14:19 a 1,5×.
    let n26g = 0;
    for (const d of SY2.SYN_DIAS) {
      if (d.fecha < '2026-11-18' || d.fecha > FV.FECHAS_V6.transicion.hasta) continue;
      for (const x of d.bloques) for (const m of ((x.guia && x.guia.como) || '').matchAll(/→ (?:(?:lun|mar|mié|jue|vie|sáb|dom) )?(\d{1,2})-(ene|feb|mar|abr|may|jun) \((\d+:\d\d(?::\d\d)?)-(\d+:\d\d(?::\d\d)?) a ([\d,]+)×\)/g)) {
        n26g++;
        const iso = `2027-${String(MESc.indexOf(m[2]) + 1).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
        const dd = SY2.synDiaDe(iso), bx = dd && dd.bloques.find((y) => y.tag === x.tag);
        const txt = bx && bx.guia ? `${bx.guia.que} ${bx.guia.como}` : '';
        if (!txt.includes(`min ${m[3]}-${m[4]}`) || !txt.includes(`${m[5]}×`)) errores.push(`(26g) ${d.fecha} ${x.tag}: manda «${m[3]}-${m[4]} a ${m[5]}×» al ${iso} y su paso ${x.tag} no lo dice («${(bx && bx.guia ? bx.guia.que : bx ? bx.leccion : '—').slice(0, 90)}…»)`);
      }
    }
    if (!n26g) errores.push('(26g) ningún resto de F1 del SYNAPSE con tramo a un día de 2027 (¿cambió el formato «Resto → vie 8-ene (a-b a v×)»?)');
    // (26i) v6.09b lote 1-quater (QS · hallazgo d de R2): ningún A medido del SYNAPSE de F1 pide más minutos (redondeados) de los que tiene su paso y el día
    //   sigue sumando 30′ (A + B + C): si el A pide 16-17′, el C baja lo mismo (antes 14, 17 y 31-dic: A de 16-16,7′ en 15′ y la franja real en 31-32′).
    let n26i = 0;
    for (const d of SY2.SYN_DIAS) {
      if (d.fecha < '2026-11-18' || d.fecha > FV.FECHAS_V6.transicion.hasta) continue;
      const abc = d.bloques.filter((x) => ['A', 'B', 'C'].includes(x.tag)), a = abc.find((x) => x.tag === 'A');
      if (!a || a.med == null) continue;
      n26i++;
      if (Math.round(a.med) > a.min) errores.push(`(26i) ${d.fecha}: el A medido pide ${a.med}′ y su paso tiene ${a.min}′ (el C debe bajar lo mismo)`);
      const tot = abc.reduce((x, y) => x + y.min, 0);
      if (tot !== 30) errores.push(`(26i) ${d.fecha}: A + B + C = ${tot}′ (≠ 30′)`);
    }
    // (26h) v6.09b lote 1-quater (QE · hallazgo N5 de R2): el (26e) también en los pasos ENCAPS de F1 (18-nov → 3-ene) — mañanas, 18:00, Anki ENCAPS, sábado
    //   (preparar + en vivo), ENCAPS del domingo y recuperación fija: ninguna fecha FUTURA después del corte del Calendar (140 del «qué» · 100 del «cómo»). Solo
    //   quedan fuera las REFERENCIAS que no son un destino: la reserva del 2026-II («(pre-test ciego del vie 8-ene)», «(ensayo general del jue 11-mar)», «de
    //   ninguna carrera antes del vie 8-ene») y el uso de la nota del simulacro («la usa el GATE del CHECKPOINT del vie 18-dic»). + ninguna frase de destino sin
    //   fecha («lo fecha el plan…», «primeras de la cola», «en un tiempo muerto», «no hoy», «va a la otra clase o a la norma del tema», el post-test del sábado
    //   «el domingo o al empezar el banqueo del lunes», sin minutos).
    const REF_ENC =/\((?:pre-test ciego|ensayo general) del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}\)|de ninguna carrera antes del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}|la usa el GATE del CHECKPOINT del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}/gu;
    const SIN_F_ENC = /(lo fecha el plan|primeras de la cola|en un tiempo muerto|\bno hoy\b|va a la otra clase o a la norma|el domingo o al empezar el banqueo)/i;
    const sinRef = (t) => String(t || '').replace(REF_ENC, (m) => '·'.repeat(m.length));
    let nEnc = 0;
    for (let iso = '2026-11-18'; iso <= FV.FECHAS_V6.transicion.hasta; iso = addDias(iso, 1)) {
      const gs = [...EM2.guiaEncapsMananaDe(iso).map((g) => [`ENCAPS mañana ${g.franja}`, g]), ['ENCAPS 18:00', EM2.guiaEncapsTardeDe(iso)], ['ENCAPS Anki', EM2.guiaEncapsAnkiDe(iso)],
        ['ENCAPS sáb (preparar)', EM2.guiaTheomedPrepDe(iso)], ['ENCAPS sáb (en vivo)', EM2.guiaTheomedVivoDe(iso)], ['ENCAPS domingo', EM2.guiaEncapsDomingoDe(iso)], ...EM2.guiasEncapsRecuperaDe(iso).map((g) => [`ENCAPS recuperación ${g.franja}`, g])]; // v6.10z-d: todos los bloques fijos del día (varios el mismo sábado)
      for (const [n, g] of gs) for (const p of (g && g.pasos) || []) {
        nEnc++;
        // v6.10w: futura respecto al día REAL en que se hace (con el alias, el 2-dic de plan es el lun 7-dic: «las 2 del dom 6-dic» ya pasó)
        const isoR = FV.fechaRealDe(iso, 'encaps');
        for (const e of fut(sinRef(p.que), isoR, 140)) errores.push(`(26h) ${iso} ${n}: fecha de destino ${e} del «qué» (> 140: el Calendar la corta) · «${p.que.slice(0, 60)}…»`);
        for (const e of fut(sinRef(p.como), isoR, 100)) errores.push(`(26h) ${iso} ${n}: fecha de destino ${e} del «cómo» (> 100: el Calendar la corta) · «${p.como.slice(0, 60)}…»`);
        const m = SIN_F_ENC.exec(`${p.que} ${p.como}`); if (m) errores.push(`(26h) ${iso} ${n}: destino sin fecha «${m[0]}» · «${p.que.slice(0, 60)}…»`);
      }
    }
    console.log(`v6.09b lote 1-quater · (26h) ENCAPS de F1: ${nEnc} pasos (mañanas, 18:00, Anki, sábados, domingos y recuperación) sin fecha de destino tras el corte del Calendar ni destinos sin fecha`);
    // (26j) v6.09b lote 1-quater FX1 (revisión V2 · avisos): el Calendar corta el AVISO de cada guía a 240 caracteres (lib_txt.cortar) → ninguna fecha FUTURA de
    //   F1 (18-nov → 3-ene) más allá del carácter 230 del aviso (margen del corte por palabras), en ENCAPS, USMLE (sus 4 franjas) y los planes de rutinaGuia (antes,
    //   35 fechas de destino solo en el aviso, en las posiciones 254-636). + (26h) toda condición «si … hiciste la CI 2/8» nombra también la rama del plan B.
    const UG2 = LIB('usmleGuia');
    let nAv = 0;
    for (let iso = '2026-11-18'; iso <= FV.FECHAS_V6.transicion.hasta; iso = addDias(iso, 1)) {
      const gs = [...EM2.guiaEncapsMananaDe(iso), EM2.guiaEncapsTardeDe(iso), EM2.guiaEncapsAnkiDe(iso), EM2.guiaTheomedPrepDe(iso), EM2.guiaTheomedVivoDe(iso), EM2.guiaEncapsDomingoDe(iso), ...EM2.guiasEncapsRecuperaDe(iso) /* v6.10z-d */,
        ...UG2.guiaUsmleDe(iso), RG2.guiaVibeDe(iso), RG2.guiaSynapseDe(iso), RG2.guiaSynapseColaDe(iso), RG2.guiaBusinessDe(iso), AU2.aurumDiaDe(iso) ? RG2.guiaAurumDe(iso) : null, RG2.guiaAurumSabadoDe(iso),
        LV2.livDiaDe(iso) ? RG2.guiaLivianoDe(iso) : null, RG2.guiaRevisionDe(iso), RG2.guiaShipDe(iso), RG2.guiaFeynmanDe(iso)].filter(Boolean);
      for (const g of gs) {
        // una fecha que ya está dentro de los 230 primeros caracteres (el resumen del principio) es visible aunque se repita en el detalle de detrás
        if (g.aviso) { nAv++; const av = sinRef(g.aviso), ini230 = av.slice(0, 230); for (const e of fut(av, iso, 230).filter((x) => !ini230.includes(/«(.*)»/.exec(x)[1]))) errores.push(`(26j) ${iso} ${g.franja} «${g.titulo.slice(0, 40)}…»: fecha de destino ${e} del AVISO (> 230: el Calendar lo corta a 240)`); }
        for (const p of g.pasos || []) if (/hiciste la CI 2\/8/.test(`${p.que} ${p.como}`) && !/ET 2\/3/.test(`${p.que} ${p.como}`)) errores.push(`(26h) ${iso} ${g.franja}: condición «hiciste la CI 2/8» sin la rama del plan B (ET 2/3) · «${p.que.slice(0, 60)}…»`);
      }
    }
    console.log(`v6.09b lote 1-quater FX1 · (26j) ${nAv} avisos de F1 (ENCAPS · USMLE · rutinaGuia) sin fecha de destino tras el carácter 230`);
    ST2 && global.localStorage.removeItem(ST2.TURNOS_KEY);
    console.log(`v6.09b lote 1-ter · (26) cola del SYNAPSE de F1 con franja real: ${nCola} días (${SY2.SYN_COLA_F1.map((d) => `${d.fecha} ${d.ini}`).join(' · ')} + post-Step 1 ${SY2.SYN_COLA_POST_STEP1[0] ? SY2.SYN_COLA_POST_STEP1[0].fecha : '—'} → ${ultimo ? ultimo.fecha : '—'} ${SY2.SYN_COLA_POST_STEP1[0] ? SY2.SYN_COLA_POST_STEP1[0].ini : ''}) · ${nPasosCola} pasos en [0,85; 1,15] · ${nCit} citas de la cola en F1 · ${nDest} pasos de F1 sin fecha de destino tras el corte del Calendar (+ vibecoding/SHIP/Feynman) · (26f) ${nSinF} pasos sin destino sin fecha · (26g) ${n26g} restos de F1 → 2027 con su tramo en el paso de destino · (26i) ${n26i} días con el A medido dentro de su paso y A + B + C = 30′`);
  }
  if (avisosSim.length) console.warn(`⚠ ${avisosSim.length} aviso(s) fuera de este ámbito:\n  ` + avisosSim.slice(0, 10).join('\n  '));
}

// ── v6.10 · secundarios (17-nov-2026 · D1 = mié 18-nov; el mar 17 tampoco se estudió) ──
// Dueño de esta sección: SECUNDARIOS (vibecoding · SYNAPSE · Business · AURUM · MIR · LIVIANO · Research/Derma). Controles PERMANENTES (no comparan con
//   un commit): (s0) el mar 17-nov no tiene sesión en ningún plan secundario · (s1) cada (fecha, frente) de corrida_s1.extra tiene su sesión en el plan
//   del frente, con los minutos de su franja, y su guía (Σ pasos = franja; la franja de la guía es la L-V del frente —la mueve plantillasV6 ›
//   bloqueCorrido + moverGuia— salvo la sesión de recuperación del SYNAPSE, que trae la suya) · (s2) anclas de identidad (v6.10c: la última sesión de F1
//   de cada frente el sáb 2-ene y desde el lun 4-ene las fechas de la v6.09; OUTPUT de F1 en martes; SYNAPSE de recuperación el dom 3-ene) · (s3) L de AURUM de los
//   sábados de F1 ≤ 05:45 y el vibecoding del sáb 28 ≥ 39′ sin solaparse con ella · (s4) LIVIANO: casos diferidos de F1 tras sus 4 lecciones y el
//   pre-test solo en lunes · (s5) SYNAPSE: A+B+C = 30′ en la sesión de recuperación y el aviso «Primera sesión» del mié 18 nombra los 2 días sin sesión.
{
  const secErr = [];
  const MDp = cargarModuloTS(path.join('src', 'lib', 'mirDailyPlan.ts'), cache);
  const RDp = cargarModuloTS(path.join('src', 'lib', 'researchDailyPlan.ts'), cache);
  const RDd = cargarModuloTS(path.join('src', 'lib', 'researchData.ts'), cache);
  const RGu = cargarModuloTS(path.join('src', 'lib', 'researchGuia.ts'), cache);
  const MGu = cargarModuloTS(path.join('src', 'lib', 'mirGuia.ts'), cache);
  const FVs = cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'), cache);
  const hm = (h) => { const [a, b] = String(h).split(':').map(Number); return a * 60 + b; };
  const minF = (fr) => { const [a, b] = String(fr).split(/[–-]/); return hm(b) - hm(a); };
  const sumP = (g) => (g && g.pasos ? g.pasos.reduce((x, p) => x + p.min, 0) : -1);
  const EX = FVs.FECHAS_V6.corrida_s1.extra || {};
  const HOY0 = '2026-11-17';
  const enExtra = Object.keys(EX).length > 0 && FVs.FECHAS_V6.corrida_s1.sin_sesion.includes(HOY0);
  if (enExtra) {
    // (s0) mar 17-nov: sin sesión en los planes secundarios
    if (V.vibeDiaDe(HOY0)) secErr.push(`(v610-s0) vibecoding con fila el ${HOY0}`);
    const s17 = S.synDiaDe(HOY0);
    if (!s17 || s17.bloques.some((b) => b.tag !== 'R' || b.min !== 0)) secErr.push(`(v610-s0) SYNAPSE del ${HOY0} con bloques que no son R de 0′`);
    const b17 = B.bizDiaDe(HOY0);
    if (b17 && B.bizModo(b17) !== 'DESCANSO') secErr.push(`(v610-s0) Business con lectura/OUTPUT el ${HOY0}`);
    if (A.aurumDiaDe(HOY0)) secErr.push(`(v610-s0) AURUM con lección el ${HOY0}`);
    if (L.livDiaDe(HOY0)) secErr.push(`(v610-s0) LIVIANO con lección el ${HOY0}`);
    if (MDp.mirDiaDe(HOY0)) secErr.push(`(v610-s0) MIR con sesión el ${HOY0}`);
    if (RDp.DIAS.some((x) => x.fecha === HOY0)) secErr.push(`(v610-s0) Research con átomo el ${HOY0}`);
    // (s1) cada día extra de un frente secundario tiene su sesión y su guía
    const LV = { vibecoding: '04:15–05:00', business: '13:00–13:25', aurum: '14:15–15:15', mir: '15:15–16:15', liviano: '17:15–18:00', 'research-derma': '13:30–14:15' };
    let nEx = 0;
    // v6.10w (dom 22-nov): cada entrada hace la fila de SU fecha de plan (x.plan: sáb 2-ene = la del jue 31-dic · dom 3-ene = la del sáb 2-ene · lun 4-ene
    //   ENCAPS = la del sáb 2-ene); la guía se pide con esa fecha. ENCAPS va aparte (v610-b). Un L-V solo el lunes del RE-SCAN.
    for (const f of Object.keys(EX)) for (const x of FVs.extraCorridaDe(f)) {
      const frente = x.frente, franja = `${x.ini}-${x.fin}`, p = x.plan;
      if (frente === 'encaps') continue;
      const m = minF(franja);
      const dw = new Date(f + 'T12:00:00Z').getUTCDay();
      if (dw !== 0 && dw !== 6 && f !== FVs.FECHAS_V6.encaps.intensiva_desde) secErr.push(`(v610-s1) corrida_s1.extra ${f} no es fin de semana (ni el lunes del RE-SCAN)`);
      const chkGuia = (g, nom) => {
        if (!g) { secErr.push(`(v610-s1) ${f} ${frente}: sin guía (${nom})`); return; }
        if (sumP(g) !== m) secErr.push(`(v610-s1) ${f} ${frente}: Σ pasos ${sumP(g)} ≠ ${m}′ de la franja ${franja}`);
        // v6.10c: el vibecoding de un día deload (15′) viene en su franja L-V corta (04:15-04:30)
        const lvF = frente === 'vibecoding' && V.vibeDiaDe(p) ? `04:15–${String(Math.floor((255 + V.vibeDiaDe(p).min) / 60)).padStart(2, '0')}:${String((255 + V.vibeDiaDe(p).min) % 60).padStart(2, '0')}` : frente === 'business' && RG.bizOutputEnteroDomingoDe && RG.bizOutputEnteroDomingoDe(p) ? '13:00–13:40' /* v6.11 (mar 24-nov): OUTPUT entero del dom 29-nov */ : LV[frente];
        if (frente !== 'synapse' && g.franja !== lvF) secErr.push(`(v610-s1) ${f} ${frente}: la guía viene en ${g.franja} y debe venir en la franja L-V ${lvF} (la mueve el Home)`);
        if (!/a hora fija/.test(g.aviso || '')) secErr.push(`(v610-s1) ${f} ${frente}: la guía no avisa «a hora fija» con la hora real`);
        else if (frente !== 'synapse' && frente !== 'vibecoding') {
          // v6.10c: el aviso se lee tras moverGuia (como lo pinta el Home): con la hora real DENTRO de la franja de plan (sáb 2-ene AURUM 14:30 en 14:15-15:15)
          //   el texto se escribe compensado y es la guía movida la que debe nombrar la hora real
          const dz = hm(franja.split('-')[0]) - hm(String(g.franja).split('–')[0]);
          const gm = dz ? G.moverGuia(g, dz) : g;
          if (!(gm.aviso || '').includes(franja.split('-')[0])) secErr.push(`(v610-s1) ${f} ${frente}: el aviso no nombra la hora real ${franja} (tras moverGuia: «${(gm.aviso || '').slice(0, 80)}»)`);
        }
      };
      if (frente === 'vibecoding') { const d = V.vibeDiaDe(p); if (!d || d.min !== m) secErr.push(`(v610-s1) ${f} vibecoding: ${d ? `${d.min}′ ≠ ${m}′` : 'sin fila'}`); chkGuia(RG.guiaVibeDe(p), 'guiaVibeDe'); nEx++; }
      else if (frente === 'synapse') {
        // v6.10w: todas las sesiones a hora fija del día (dom 3-ene: 05:00 la del sáb 2-ene + 11:30 la recuperación del mar 17); la de corrida_s1.extra, la primera
        const rs = (S.synRecsDe ? S.synRecsDe(f) : [S.synRecDe(f)].filter(Boolean));
        if (!rs.length || `${rs[0].ini}-${rs[0].fin}` !== franja) secErr.push(`(v610-s1) ${f} SYNAPSE: sin sesión a hora fija ${franja} (SYN_REC_F1)`);
        for (const r of rs) {
          const fr2 = `${r.ini}-${r.fin}`;
          if (r.bloques.reduce((x, b) => x + b.min, 0) !== minF(fr2) || !['A', 'B', 'C'].every((t) => r.bloques.some((b) => b.tag === t))) secErr.push(`(v610-s5) ${f} ${r.ini} SYNAPSE a hora fija: A+B+C ≠ ${minF(fr2)}′`);
          const g = RG.guiaSynapseRecDe(f, r.ini);
          if (!g || g.franja !== fr2.replace('-', '–')) secErr.push(`(v610-s1) ${f} SYNAPSE: guiaSynapseRecDe ${g ? g.franja : 'null'} ≠ ${fr2}`);
          if (!g) secErr.push(`(v610-s1) ${f} ${r.ini} SYNAPSE: sin guía`); else if (sumP(g) !== minF(fr2)) secErr.push(`(v610-s1) ${f} ${r.ini} SYNAPSE: Σ pasos ${sumP(g)} ≠ ${minF(fr2)}′`); else if (!/a hora fija/.test(g.aviso || '')) secErr.push(`(v610-s1) ${f} ${r.ini} SYNAPSE: la guía no avisa «a hora fija»`);
          nEx++;
        }
      // v6.11 fase 2: un OUTPUT a hora fija (sáb 28-nov 07:15) es su parte 1/2 de 25′ (la 2/2, el cierre del mismo sábado)
      } else if (frente === 'business') { const r = B.bizDiaDe(p); if (!r || B.bizModo(r) === 'DESCANSO' || (B.bizModo(r) === 'OUTPUT' ? !(m === 25 || (m === 40 && RG.bizOutputEnteroDomingoDe && RG.bizOutputEnteroDomingoDe(p))) : r.min !== m)) secErr.push(`(v610-s1) ${f} Business (plan ${p}): ${r ? `${B.bizModo(r)} ${r.min}′` : 'sin fila'} (esperado lectura de ${m}′, OUTPUT 1/2 de 25′ u OUTPUT entero de 40′ un domingo)`); chkGuia(RG.guiaBusinessDe(p), 'guiaBusinessDe'); nEx++; }
      else if (frente === 'aurum') { if (!A.aurumDiaDe(p)) secErr.push(`(v610-s1) ${f} AURUM (plan ${p}): sin lección`); chkGuia(RG.guiaAurumDe(p), 'guiaAurumDe'); nEx++; }
      // v6.11 fase 2: la sesión a hora fija puede ser un CASO (dom 6-dic = CASO 2/16, plan del mar 1-dic)
      else if (frente === 'liviano') { const r = L.livDiaDe(p); if (!r || r.min !== m || (r.casoId != null && FVs.faseV6(f) === 'TRANSICION')) secErr.push(`(v610-s1) ${f} LIVIANO (plan ${p}): ${r ? `${r.min}′${r.casoId != null ? ' CASO' : ''}` : 'sin lección'} (esperado lección de ${m}′)`); chkGuia(RG.guiaLivianoDe(p), 'guiaLivianoDe'); nEx++; }
      else if (frente === 'mir') { if (!MDp.mirDiaDe(p)) secErr.push(`(v610-s1) ${f} MIR (plan ${p}): sin sesión`); chkGuia(MGu.mirGuiaDe(p, '15:15'), 'mirGuiaDe'); nEx++; }
      else if (frente === 'research-derma') {
        const at = RDp.DIAS.find((x) => x.fecha === p);
        const tipo = RDd.diaEstudioTipo(new Date(Number(p.slice(0, 4)), Number(p.slice(5, 7)) - 1, Number(p.slice(8, 10))));
        // v6.10w: la entrada de otra fecha de plan puede ser un día-DERMA (dom 3-ene = la Derma d17 del jue 31-dic): su sesión existe y no lleva átomo
        if (p !== f && tipo === 'derma') { const DCm = cargarModuloTS(path.join('src', 'lib', 'dermaCiclo2.ts'), cache); if (!DCm.dermaDiaDeConCiclo2(p)) secErr.push(`(v610-s1) ${f} Derma (plan ${p}): sin sesión`); nEx++; continue; }
        if (!at) secErr.push(`(v610-s1) ${f} Research (plan ${p}): sin átomo`);
        if (tipo !== 'research') secErr.push(`(v610-s1) ${f} Research: diaEstudioTipo no lo da como día-Research (TIPO_RD_FORZADO antes que la regla del finde)`);
        if (at) chkGuia(RGu.guiaResearchDe(at), 'guiaResearchDe');
        nEx++;
      }
    }
    // (s2) anclas de identidad · v6.10c (decisión de Joseph del 17-nov 17:20, corrimiento LITERAL): cada frente corre un hábil hasta fin de año, su última
    //   sesión de F1 va el sáb 2-ene y desde el lun 4-ene todo cae como en la v6.09 (antes: identidad desde el lun 30-nov / lun 7-dic / sáb 28 21:00)
    const ancla = (cond, txt) => { if (!cond) secErr.push(`(v610-s2) ${txt}`); };
    const SAB2 = '2027-01-02', LUN4 = '2027-01-04';
    const v32 = V.VIBE_DIAS.find((x) => x.d === 32), v33 = V.VIBE_DIAS.find((x) => x.d === 33); ancla(v32 && v32.fecha === SAB2 && v33 && v33.fecha === LUN4, `vibecoding d32/d33 = ${v32 && v32.fecha} / ${v33 && v33.fecha} (esperado sáb 2-ene / lun 4-ene)`);
    // v6.10w: 94 días (el d31 del jue 31-dic, sin día real: sus pasos se reparten en la semana deload S7 con los mismos minutos)
    ancla(V.VIBE_META.finTaper === '2027-04-06' && V.VIBE_DIAS.length === 94 && !V.vibeDiaDe('2026-12-31') && V.VIBE_DIAS.filter((x) => x.semana === 7).reduce((a, x) => a + x.min, 0) === 135, `vibecoding: fin ${V.VIBE_META.finTaper} / ${V.VIBE_DIAS.length} días (esperado mar 6-abr / 94, sin fila el jue 31-dic, S7 = 135′)`);
    const b2 = B.bizDiaDe(SAB2), b4 = B.bizDiaDe(LUN4); ancla(b2 && B.bizModo(b2) !== 'DESCANSO' && B.bizModo(b2) !== 'OUTPUT' && b2.d === 48 && b4 && b4.d === 50, `Business sáb 2-ene = ${b2 && `D${b2.d} ${B.bizModo(b2)}`} (esperado D48 lectura) · lun 4-ene = ${b4 && `D${b4.d}`} (esperado D50)`);
    ancla(B.BIZ_DIAS.filter((x) => B.bizModo(x) !== 'DESCANSO').length === 84 && B.BIZ_DIAS[B.BIZ_DIAS.length - 1].fecha === '2027-03-19', 'Business: 84 filas de trabajo y fin vie 19-mar');
    for (const f of ['2026-11-24', '2026-12-01', '2026-12-08', '2026-12-15', '2026-12-22']) { const r = B.bizDiaDe(f); ancla(r && B.bizModo(r) === 'OUTPUT', `Business ${f}: se espera el OUTPUT de F1 (martes, tras su última lectura)`); }
    const m32 = MDp.MIR_DIAS.find((x) => x.d === 32), m33 = MDp.MIR_DIAS.find((x) => x.d === 33); ancla(m32 && m32.fecha === SAB2 && m33 && m33.fecha === LUN4, `MIR D32/D33 = ${m32 && m32.fecha} / ${m33 && m33.fecha} (esperado sáb 2-ene / lun 4-ene)`);
    ancla(MDp.MIR_DIAS[MDp.MIR_DIAS.length - 1].fecha === '2027-03-08', 'MIR D78 = lun 8-mar');
    const a15 = A.AURUM_DIAS.find((x) => x.d === 15), a32 = A.AURUM_DIAS.find((x) => x.d === 32), a33 = A.AURUM_DIAS.find((x) => x.d === 33);
    ancla(a15 && a15.fecha === '2026-12-08' && a15.pitch === 1, `AURUM D15 (PITCH v1) = ${a15 && a15.fecha} (esperado mar 8-dic)`);
    ancla(a32 && a32.fecha === SAB2 && a33 && a33.fecha === LUN4, `AURUM D32/D33 = ${a32 && a32.fecha} / ${a33 && a33.fecha} (esperado sáb 2-ene / lun 4-ene)`);
    ancla(A.AURUM_DIAS[A.AURUM_DIAS.length - 1].fecha === '2027-05-25', 'AURUM D130 = mar 25-may');
    const l15 = L.LIV_DIAS.find((x) => x.d === 15), l32 = L.LIV_DIAS.find((x) => x.d === 32), l33 = L.LIV_DIAS.find((x) => x.d === 33);
    ancla(l15 && l15.fecha === '2026-12-08' && l15.casoId === 3, `LIVIANO d15 = ${l15 && l15.fecha} (esperado MARTES CASO 3 el mar 8-dic)`);
    ancla(l32 && l32.fecha === SAB2 && l32.casoId == null && l33 && l33.fecha === LUN4 && l33.pretest, `LIVIANO d32/d33 = ${l32 && l32.fecha} / ${l33 && l33.fecha} (esperado sáb 2-ene lección / lun 4-ene con pre-test)`);
    ancla(L.LIV_DIAS[L.LIV_DIAS.length - 1].fecha === '2027-04-02', 'LIVIANO fin = vie 2-abr');
    const r9 = RDp.DIAS.find((x) => x.code === 'R9'), t3 = RDp.DIAS.find((x) => x.code === 'T-3'), t4 = RDp.DIAS.find((x) => x.code === 'T-4');
    ancla(r9 && r9.fecha === '2026-12-09' && r9.d === 8, `Research R9 = ${r9 && r9.fecha} (esperado mié 9-dic, d8)`);
    ancla(t3 && t3.fecha === SAB2 && t4 && t4.fecha === LUN4, `Research T-3/T-4 = ${t3 && t3.fecha} / ${t4 && t4.fecha} (esperado sáb 2-ene / lun 4-ene)`);
    ancla(S.SYN_DIAS.length === 137 && S.SYN_PLAN_META.fin === '2027-04-01', `SYNAPSE: ${S.SYN_DIAS.length} días · fin ${S.SYN_PLAN_META.fin} (esperado 137 · jue 1-abr)`);
    const s28 = S.synDiaDe('2026-11-28'); ancla(s28 && s28.d === 13 && s28.bloques.some((b) => b.tag === 'A'), 'SYNAPSE sáb 28-nov 21:00 = d13 con su A-unit');
    // v6.11 (mar 24-nov): el sáb 28-nov lleva una sesión a hora fija de CADENA (04:15, la última de la semana 1), no la recuperación del mar 17
    ancla(!(S.synRecsDe('2026-11-28') || []).some((r) => !r.cadena) && !!S.synRecDe('2027-01-03'), 'SYNAPSE: la sesión de recuperación va el dom 3-ene (no el sáb 28-nov)');
    // v6.11 fase 2 (diseño del juez, pendiente del OK de Joseph): el sáb 28-nov y el dom 6-dic vuelven a llevar días extra, pero no por partes: cada frente hace a
    //   hora fija la fila de SU fecha de plan (sáb 28: AURUM y Business del mar 24-nov · dom 6: SYNAPSE de la cadena y LIVIANO del mar 1-dic)
    // v6.11 (mar 24-nov): + el SYNAPSE de una cadena (sáb 28-nov 04:15: sus sesiones a hora fija son todas de cadena)
    for (const f of ['2026-11-28', '2026-12-06']) ancla(!EX[f] || Object.entries(EX[f]).every(([k, v]) => (typeof v === 'object' && v.plan && v.plan < f) || (f === '2026-12-06' && v === '05:00-05:30') || (k === 'synapse' && typeof v === 'string' && (S.synRecsDe(f) || []).length > 0 && S.synRecsDe(f).every((r) => r.cadena))), `corrida_s1.extra ${f}: solo filas de su fecha de plan (sin recuperación por partes)`);
    // v6.10w: el dom 29-nov solo lleva el SYNAPSE de la cadena de la semana 1 (05:00, la sesión del sáb 28)
    // v6.11 (mar 24-nov, orden «hoy solo ENCAPS»): + AURUM y Business, cada uno con la fila de su fecha de plan (el mar 24 no tuvieron sesión y corrieron un día)
    ancla(EX['2026-11-29'] && (S.synRecsDe('2026-11-29')[0] || {}).cadena && Object.entries(EX['2026-11-29']).every(([k, v]) => k === 'synapse' || (['aurum', 'business'].includes(k) && typeof v === 'object' && v.plan === '2026-11-24')), 'corrida_s1.extra dom 29-nov: el SYNAPSE de la cadena (05:00, la sesión del sáb 28) y AURUM y Business del mar 24-nov');
    ancla(!RG.aurumLSabadoDe(SAB2), 'AURUM: el sáb 2-ene (sábado que recupera) no lleva «L de la semana»');
    // (s3) L de AURUM de los sábados de F1 ≤ 05:45; el vibecoding extra del sábado tras la L y ≥ 39′
    let nSab = 0;
    for (let s = '2026-11-21'; s <= FVs.FECHAS_V6.transicion.hasta; s = (() => { const d = new Date(s + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 7); return d.toISOString().slice(0, 10); })()) {
      const l = RG.aurumLSabadoDe(s); if (!l) continue; nSab++;
      // v6.12 (mar 24-nov-2026): en un SÁBADO HÁBIL (corrida_s1.sabado_habil; Anki a las 05:00) la L va de 12:30 a 14:00, tras la mañana ENCAPS y antes de la revisión
      if ((FVs.FECHAS_V6.corrida_s1.sabado_habil || []).includes(s)) { if (hm(l.ini) < hm('12:30') || hm(l.fin) > hm('14:00')) secErr.push(`(v610-s3) ${s} (sábado hábil): la L de AURUM ${l.ini}-${l.fin} fuera de 12:30-14:00`); continue; }
      if (hm(l.fin) > hm('05:45')) secErr.push(`(v610-s3) ${s}: la L de AURUM termina a las ${l.fin} (> 05:45, rutina)`);
      const vx = EX[s] && EX[s].vibecoding;
      if (vx) { const [vi, vf] = vx.split('-'); if (hm(l.fin) > hm(vi)) secErr.push(`(v610-s3) ${s}: la L de AURUM (${l.ini}-${l.fin}) pisa el vibecoding ${vx}`); if (hm(vf) - Math.max(hm(vi), hm(l.fin)) < 39) secErr.push(`(v610-s3) ${s}: el vibecoding queda con < 39′`); }
    }
    // (s3b) v6.10 (c12, 18-nov): el audiolibro de Tracy de AURUM (F1) es UN hilo continuo en orden de día REAL (alias: el lunes real hace el plan del
    //   viernes) y el «Sigue → <fecha de plan>, desde H:MM:SS» de cada sábado nombra el siguiente tramo REAL (antes saltaba el lunes: «Sigue → mar 15-dic»)
    const TR = /tramo (\d:\d\d:\d\d)–(\d:\d\d:\d\d)/;
    const hilo = [];
    for (const x of A.AURUM_DIAS.filter((y) => !y.min30 && y.fecha <= FVs.FECHAS_V6.transicion.hasta)) {
      const g = RG.guiaAurumDe(x.fecha); if (!g) continue;
      for (const p of g.pasos) { const m = TR.exec(p.que); if (m && /Psychology Of Selling/.test(p.que)) hilo.push({ real: FVs.ordenRealDe(x.fecha, 'aurum'), plan: x.fecha, a: m[1], b: m[2], sab: false }); } // v6.11 (revisión c32): ordenRealDe (el plan sin día, el mié 30-dic, detrás del último día del alias, como aurumF1)
    }
    for (let s = '2026-11-21'; s <= FVs.FECHAS_V6.transicion.hasta; s = (() => { const d = new Date(s + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 7); return d.toISOString().slice(0, 10); })()) {
      const g = RG.guiaAurumSabadoDe(s); if (!g) continue;
      for (const p of g.pasos) { const m = TR.exec(p.que); if (m && /Psychology Of Selling/.test(p.que)) hilo.push({ real: s, plan: s, a: m[1], b: m[2], sab: true, como: p.como }); }
    }
    const sgs = (t) => { const [h, mi, se] = t.split(':').map(Number); return h * 3600 + mi * 60 + se; };
    hilo.sort((p, q) => (p.real < q.real ? -1 : p.real > q.real ? 1 : sgs(p.a) - sgs(q.a)));
    const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    hilo.forEach((t, i) => {
      if (i && t.a !== hilo[i - 1].b) secErr.push(`(v610-s3b) AURUM Tracy: el tramo del ${t.real} empieza en ${t.a} y el anterior en orden real (${hilo[i - 1].real}) acaba en ${hilo[i - 1].b}`);
      if (!t.sab) return;
      const sig = hilo[i + 1], m = /Sigue → \S+ (\d{1,2})-([a-z]{3}), desde (\d:\d\d:\d\d)/.exec(t.como || '');
      if (!sig) { if (m) secErr.push(`(v610-s3b) AURUM sáb ${t.real}: «Sigue →» sin tramo siguiente`); return; }
      if (!m) { secErr.push(`(v610-s3b) AURUM sáb ${t.real}: sin «Sigue → …, desde …»`); return; }
      const nombra = `${Number(sig.plan.slice(8))}-${MESES[Number(sig.plan.slice(5, 7)) - 1]}`;
      if (`${Number(m[1])}-${m[2]}` !== nombra || m[3] !== sig.a) secErr.push(`(v610-s3b) AURUM sáb ${t.real}: «Sigue → ${m[1]}-${m[2]}, desde ${m[3]}» ≠ siguiente tramo real ${sig.real} (plan ${nombra}) desde ${sig.a}`);
    });
    if (hilo.length < 10) secErr.push(`(v610-s3b) AURUM Tracy: solo ${hilo.length} tramos (¿cambió el texto «tramo H:MM:SS–H:MM:SS»?)`);
    // (s4) LIVIANO: caso diferido de F1 tras sus 4·k lecciones; pre-test solo en lunes
    for (const r of L.LIV_DIAS) {
      if (r.pretest && r.wd !== 'Lun') secErr.push(`(v610-s4) LIVIANO D${r.d} ${r.fecha}: pre-test fuera de lunes`);
      if (r.casoId != null && r.fecha <= FVs.FECHAS_V6.transicion.hasta && L.LIV_DIAS.filter((x) => x.d < r.d && x.casoId == null).length < 4 * r.casoId) secErr.push(`(v610-s4) LIVIANO CASO ${r.casoId} (${r.fecha}) antes de sus ${4 * r.casoId} lecciones`);
    }
    // (s5) aviso «Primera sesión» del SYNAPSE: nombra los días sin sesión y la sesión de recuperación
    const s1 = S.SYN_DIAS.find((x) => x.bloques.some((b) => b.tag === 'A'));
    const av = (s1 && (RG.guiaSynapseDe(s1.fecha) || {}).aviso) || '';
    if (s1 && s1.fecha === '2026-11-18' && !(/Primera sesión\. Sale como día 3/.test(av) && /mar 17-nov/.test(av) && /carril del martes corre una semana/.test(av))) secErr.push(`(v610-s5) SYNAPSE mié 18: el aviso «Primera sesión» no nombra el mar 17 ni la cadena del carril del martes: «${av.slice(0, 160)}»`);
    console.log(`v6.10 · secundarios: mar 17 sin sesión · ${nEx} bloques extra de fin de semana con sesión y guía · anclas de identidad · ${nSab} L de AURUM de sábado ≤ 05:45 · LIVIANO casos/pre-test · SYNAPSE «Primera sesión»`);
  }
  for (const e of secErr) errores.push(e);
}

// ── v6.10 · núcleo (17-nov-2026 · D1 = mié 18-nov; el mar 17 tampoco se estudió) ──
// Dueño: NÚCLEO (fechas · Step 1 · ENCAPS 16:15 y mañanas · plantillas). Controles PERMANENTES de la v6.10:
//   (v610-a) mar 17-nov: CORRIDO, 0 bloques, sin guía USMLE, sin sesión ENCAPS 16:15 ni mañana ENCAPS · (v610-b) corrida_s1.extra: cada (fecha, frente,
//   franja) tiene su bloque con hora en la plantilla y el domingo deja ≥ 40′ de almuerzo (Σ fijos + Σ flexibles ≤ ventana − 40′) · (v610-c) Step: D1 = UWSA1
//   jue 19-nov con su SYNAPSE 07:25 · NBME 25 = mar 15-dic (07:00-12:30) · cada step1.f1_extra es un SÁBADO de Step (usmle 04:15-05:45 · usmle2 07:15-08:25 ·
//   usmle3 14:30-16:05 · eval 16:05-16:50 · anki-sab 21:30-22:00, con sus guías dentro de las ventanas del sábado) · enPausaStep1 falso hasta la última mañana
//   de F1 y verdadero desde el día siguiente al lunes libre · el jue 31-dic no es día de Step ni de pausa · DIAS_T2 = tramo2_vigente.json (= v6.09) ·
//   (v610-d) Anki: mié 18 = CONFIGURACIÓN 45′ (v6.11: mar 24 real) · jue 19 sin configuración · del 18 al 24-nov ningún bloque USMLE sin material salvo el descanso declarado del
//   jue 19 y del mar 24 · ninguna «NUEVAS: … del <día>» cita un día sin Step · (v610-e) ENCAPS: dia del mantenimiento = orden por fecha · diaActual = dia
//   (mié 18, vie 20, lun 23, vie 27, dom 29, lun 30, jue 31, lun 4-ene, vie 12-mar) · sim_n = dia en los 5 mini-sims de F1 · (v610-f) ENCAPS 16:15: filas
//   dia ≥ 10 idénticas a la v6.09 (git show e34e1ad, si el commit existe).
{
  const nErr = [];
  const cpx = require('child_process');
  const fsx = require('fs');
  const tsx = require(path.join(__dirname, '..', '..', 'node_modules', 'typescript'));
  const stubN = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : k === '__esModule' ? true : stubN()), apply: () => stubN(), construct: () => stubN() });
  if (!global.localStorage) { const mem = new Map(); global.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) }; }
  const cacheN = new Map();
  const cargarN = (file) => {
    if (cacheN.has(file)) return cacheN.get(file).exports;
    const m = { exports: {} }; cacheN.set(file, m);
    const req = (spec) => {
      if (!spec.startsWith('.')) return stubN();
      let d = path.resolve(path.dirname(file), spec);
      for (const e of ['', '.ts', '.tsx']) if (fsx.existsSync(d + e) && fsx.statSync(d + e).isFile()) { d += e; break; }
      return d.endsWith('.json') ? JSON.parse(fsx.readFileSync(d, 'utf8')) : cargarN(d);
    };
    new Function('exports', 'module', 'require', tsx.transpileModule(fsx.readFileSync(file, 'utf8'), { compilerOptions: { module: tsx.ModuleKind.CommonJS, target: tsx.ScriptTarget.ES2020, jsx: tsx.JsxEmit.React, esModuleInterop: true } }).outputText)(m.exports, m, req);
    return m.exports;
  };
  const LN = (n) => cargarN(path.join(__dirname, '..', '..', 'src', 'lib', n + '.ts'));
  const PLn = LN('plantillasV6'), F6n = LN('fechasV6'), Un = LN('usmleStep1Daily'), UGn = LN('usmleGuia'), EGn = LN('encapsGuia'), EMn = LN('encapsManana'), EPn = LN('encapsPlan');
  const hmN = (h) => { const [a, b] = String(h).split(':').map(Number); return a * 60 + b; };
  const F6j = F6n.FECHAS_V6;
  // (v610-a)
  {
    const iso = '2026-11-17';
    if (F6j.corrida_s1.sin_sesion.includes(iso)) {
      const p = PLn.plantillaDelDia(iso);
      if (p.plantilla !== 'CORRIDO' || p.bloques.length) nErr.push(`(v610-a) ${iso}: plantilla ${p.plantilla} con ${p.bloques.length} bloque(s) (se espera CORRIDO, 0)`);
      if (UGn.guiaUsmleDe(iso).length) nErr.push(`(v610-a) ${iso}: la guía USMLE tiene bloques un día sin sesión`);
      if (EGn.sesionEncapsDe(iso) || EMn.encapsMananaDe(iso)) nErr.push(`(v610-a) ${iso}: ENCAPS (16:15 o mañana) con sesión un día sin sesión`);
    }
  }
  // (v610-b)
  let nX = 0;
  for (const [iso] of Object.entries(F6j.corrida_s1.extra || {})) {
    const p = PLn.plantillaDelDia(iso);
    for (const x of F6n.extraCorridaDe(iso)) {
      nX++;
      if (!p.bloques.some((b) => b.ini === x.ini && b.fin === x.fin && (b.plan === x.frente || (x.frente === 'research-derma' && b.plan === 'research-derma')))) nErr.push(`(v610-b) ${iso}: sin bloque de ${x.frente} en ${x.ini}-${x.fin}`);
    }
    if (dow(iso) === 0) {
      const fijos = p.bloques.filter((b) => b.ini && b.fin).reduce((a, b) => a + (hmN(b.fin) - hmN(b.ini)), 0);
      const flex = p.bloques.filter((b) => !b.ini).reduce((a, b) => a + (b.min || 0), 0);
      const ventana = (hmN('05:45') - hmN('05:00')) + (hmN('17:00') - hmN('07:15'));
      if (fijos + flex > ventana - 40) nErr.push(`(v610-b) ${iso}: ${fijos}′ fijos + ${flex}′ flexibles > ${ventana - 40}′ (ventana del domingo − 40′ de almuerzo)`);
    }
  }
  // (v610-c) · v6.10b (decisión 4 de Joseph, 17-nov 17:05): jue 19 = D2 en NIVEL 0 (lesión celular), sin UWSA1 en F1 (→ tramo 2, T82) y con su SYNAPSE a las
  //   12:30 · NBME 25 = D8 jue 10-dic (07:00-12:30) · sin step1.f1_extra: el sáb 2-ene sin bloques de Step · la pausa del Step desde el jue 31-dic (como v6.09)
  const D = Un.DIAS, T2 = Un.DIAS_T2;
  const d1 = D[0];
  if (!d1 || d1.d !== 2 || !/lesión celular/.test(d1.sub) || d1.fecha !== '2026-11-19' || D.some((x) => /UWSA1/.test(x.sub))) nErr.push(`(v610-c) 1.ª fila de F1 = ${d1 && 'D' + d1.d} ${d1 && d1.fecha} ${d1 && d1.sub.slice(0, 30)} (se espera el D2 lesión celular del jue 19-nov y ningún UWSA1 en F1)`);
  // v6.10d: con el alias de corrida_s1 el D2 (fecha de plan jue 19) se hace el vie 20 y el NBME 25 (plan jue 10-dic) el vie 11-dic → se mira la plantilla del día REAL
  else { const r1 = F6n.fechaRealDe(d1.fecha, 'usmle'); const p = PLn.plantillaDelDia(r1); const s = p.bloques.find((b) => b.id === 'syn'); const u = p.bloques.find((b) => b.id === 'usmle'); if (!s || s.ini !== '12:30') nErr.push(`(v610-c) ${r1} (plan ${d1.fecha}): el SYNAPSE no va a las 12:30 (${s && s.hora})`); if (!u || u.ini !== '07:15' || u.fin !== '12:00' || (u.fechaPlan || r1) !== d1.fecha) nErr.push(`(v610-c) ${r1} (plan ${d1.fecha}): el bloque USMLE no es el normal 07:15-12:00 del D2 (${u && u.hora} · plan ${u && u.fechaPlan})`); }
  const uw1 = T2.find((x) => x.tipo === 'hito' && x.dOrig === 1);
  if (!uw1 || uw1.t !== 82 || uw1.fecha !== '2027-06-29' || !T2.some((x) => x.t === 83 && x.tipo === 'day_after' && /UWSA1/.test(x.sub))) nErr.push(`(v610-c) el UWSA1 no está en el tramo 2 en T82 (mar 29-jun-2027) con su Day-After en T83 (${uw1 ? 'T' + uw1.t + ' ' + uw1.fecha : '—'})`);
  const n25 = D.find((x) => /NBME 25/.test(x.sub));
  if (!n25 || n25.fecha !== '2026-12-10' || n25.d !== 8) nErr.push(`(v610-c) NBME 25 = ${n25 && 'D' + n25.d + ' ' + n25.fecha} (se espera D8 jue 10-dic)`);
  else { const r25 = F6n.fechaRealDe(n25.fecha, 'usmle'); const b = PLn.plantillaDelDia(r25).bloques.find((y) => y.id === 'usmle'); if (!b || b.ini !== '07:00' || b.fin !== '12:30' || (b.fechaPlan || r25) !== n25.fecha) nErr.push(`(v610-c) NBME 25 (plan ${n25.fecha} → real ${r25}): bloque ${b && b.hora} (≠ 07:00-12:30 del plan ${n25.fecha})`); }
  if ('f1_extra' in F6j.step1) nErr.push('(v610-c) _fechas_v6.json › step1.f1_extra sigue ahí (retirado en la v6.10b)');
  { const p2 = PLn.plantillaDelDia('2027-01-02'); const st = p2.bloques.filter((b) => ['usmle', 'usmle2', 'usmle3', 'eval', 'anki-sab'].includes(b.id)); if (st.length || UGn.guiaUsmleDe('2027-01-02').length) nErr.push(`(v610-c) sáb 2-ene: bloques o guía de Step (${st.map((b) => b.id).join(', ') || 'guía'}) — ya no es mañana de Step`); }
  const ultS = F6n.DERIVADOS_V6.ultimoStepF1;
  for (let x = addDias(ultS, 1); x < F6j.step1.reinicio; x = addDias(x, 1)) if (!F6n.enPausaStep1(x)) { nErr.push(`(v610-c) enPausaStep1(${x}) = false dentro de la pausa`); break; }
  if (!F6n.enPausaStep1('2026-12-31') || F6n.esDiaPlan('2026-12-31', 'usmle')) nErr.push('(v610-c) 2026-12-31: se espera Step 1 en PAUSA (como en la v6.09)');
  {
    const t2 = JSON.parse(fsx.readFileSync(path.join(__dirname, 'usmle', 'tramo2_vigente.json'), 'utf8'));
    if (JSON.stringify(t2) !== JSON.stringify(T2)) nErr.push('(v610-c) DIAS_T2 de usmleStep1Daily.ts ≠ tramo2_vigente.json');
    try { const h = cpx.execFileSync('git', ['show', 'e34e1ad:DATA/_scripts/usmle/tramo2_vigente.json'], { cwd: path.join(__dirname, '..', '..'), encoding: 'utf8', maxBuffer: 64 << 20 })
      .split('FSRS vuelve a 0,90 hoy').join('FSRS vuelve a 90 % hoy'); // v6.10w: cambio declarado de TEXTO (Desired retention en %, Anki 25.02), no de fila
    const hJ = JSON.parse(h), nJ = JSON.parse(fsx.readFileSync(path.join(__dirname, 'usmle', 'tramo2_vigente.json'), 'utf8')); const difT = nJ.map((x, k) => (JSON.stringify(x) === JSON.stringify(hJ[k]) ? null : x.t)).filter((t) => t !== null); if (nJ.length !== hJ.length || difT.some((t) => t !== 82 && t !== 83)) nErr.push(`(v610-c) tramo2_vigente.json ≠ el de la v6.09 (e34e1ad) fuera de T82-T83 (el UWSA1 en el hueco del UWSA3 opcional, cambio declarado): ${difT.join(', ')}`); } catch (e) { /* sin el commit (clon superficial): no se compara */ }
  }
  // (v610-d)
  {
    // v6.11 (lun 23-nov): sin efecto la v6.10y-b (reparto de la configuración): mié 18 de plan (mar 24 real) = CONFIGURACIÓN 45′ · jue 19 de plan (D2) = 05:00-05:30 sin configuración
    const conf = UGn.guiaUsmleDe('2026-11-18').find((g) => g.franja.startsWith('05:'));
    if (!conf || conf.franja !== '05:00–05:45' || !/CONFIGURACIÓN/.test(conf.titulo)) nErr.push('(v610-d) mié 18-nov: el Anki 05:00 no es la CONFIGURACIÓN de 45′');
    const j19 = UGn.guiaUsmleDe('2026-11-19').find((g) => g.franja.startsWith('05:'));
    if (!j19 || /CONFIGURACIÓN/.test(j19.titulo) || j19.franja !== '05:00–05:30') nErr.push('(v610-d) jue 19-nov: el Anki 05:00 debe ser 05:00-05:30 y sin configuración');
    if (PLn.plantillaDelDia('2026-11-28').bloques.some((b) => b.id === 'anki-fsrs')) nErr.push('(v610-d) sáb 28-nov: sobra el bloque anki-fsrs (v6.11: la configuración va entera el mar 24)');
    for (let iso = '2026-11-18'; iso <= '2026-11-24'; iso = addDias(iso, 1)) {
      for (const g of UGn.guiaUsmleDe(iso).filter((x) => x.franja.startsWith('05:'))) for (const p of g.pasos) {
        if (/^Libre\b/.test(p.que)) nErr.push(`(v610-d) ${iso} ${g.franja}: paso «Libre» (sin material)`);
        if (/[Dd]escanso/.test(p.que)) nErr.push(`(v610-d) ${iso} ${g.franja}: descanso en el Anki 05:00 (v6.10b: sin UWSA1, cada franja lleva material)`);
      }
    }
    const MESn = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' };
    const stepF = new Set(D.map((x) => x.fecha));
    for (let iso = F6j.f1.inicio; iso <= F6j.transicion.hasta; iso = addDias(iso, 1)) for (const g of UGn.guiaUsmleDe(iso)) for (const p of g.pasos) {
      const m = /^NUEVAS:.*?(?:del?|creaste el) (?:lun|mar|mié|jue|vie|sáb|dom) (\d{1,2})-([a-z]{3})/.exec(p.que);
      if (!m) continue;
      const mm = MESn[m[2]]; const y = mm === '01' && iso.slice(5, 7) === '12' ? +iso.slice(0, 4) + 1 : mm === '12' && iso.slice(5, 7) === '01' ? +iso.slice(0, 4) - 1 : +iso.slice(0, 4);
      const f = `${y}-${mm}-${String(m[1]).padStart(2, '0')}`;
      if (!stepF.has(f)) nErr.push(`(v610-d) ${iso} ${g.franja}: «${p.que.slice(0, 60)}» cita el ${f}, que no es día de Step`);
    }
  }
  // (v610-e) + (v610-f)
  {
    const leer = (txt) => txt.split(/\r?\n/).filter((l) => l.startsWith("('ENCAPS',")).map((l) => { const m = /^\('ENCAPS',(\d+),'([\d-]+)','[^']+','([^']+)'/.exec(l); const sn = /"sim_n":(\d+)/.exec(l); return { dia: +m[1], fecha: m[2], tipo: m[3], simN: sn ? +sn[1] : null, l: l.replace(/[,;]\s*$/, '') }; });
    const M = leer(fsx.readFileSync(path.join(__dirname, '_encaps_mantenimiento_2027.sql'), 'utf8'));
    const ord = [...M].sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    ord.forEach((r, i) => { if (r.dia !== i + 1) nErr.push(`(v610-e) mantenimiento: ${r.fecha} es dia ${r.dia} y por fecha toca ${i + 1}`); });
    for (const r of M.filter((x) => x.tipo === 'mini_sim')) if (r.simN !== r.dia) nErr.push(`(v610-e) mini-sim ${r.fecha}: sim_n ${r.simN} ≠ dia ${r.dia}`);
    // v6.10c: sin el dom 29-nov; el dia 32 es el sáb 2-ene (fin de semana que recupera, corrida_s1.extra)
    // v6.10d (mié 18-nov · alias de corrida_s1: jue 19-nov → vie 1-ene hacen el plan del hábil anterior): el SQL, Supabase, los runners y el daemon siguen
    //   con la fecha de PLAN; diaActual(día real) = el dia de su fecha de plan (fechaPlanDe): jue 19 = 1 · vie 20 = 2 · lun 23 = 3 (mini-sim del vie 20) …
    //   vie 1-ene = 31 (el del jue 31-dic) · sáb 2-ene = 32 · desde el lun 4-ene, por fecha. El mié 18 (sin sesión) y el fin de semana sin sesión
    //   enseñan la próxima sesión (la del día real siguiente con plan).
    // v6.10u (jue 19-nov · el jue 19 sin sesión; del vie 20-nov al vie 25-dic cada día real hace el plan de su hábil real anterior): vie 20 = 1 · lun 23 = 2 (D2) ·
    //   mar 24 = 3 (mini-sim del vie 20) … vie 25-dic = 26 (el del mié 23-dic) · lun 28-dic = 27 y desde ahí, como en la v6.10d
    // v6.10w (dom 22-nov): sin expectativas escritas a mano para F1 (cambiaban con cada corrida): las da el bucle de abajo (diaActual = dia de la fila de su fecha
    //   de PLAN, fechaPlanDe con el alias y corrida_s1.extra); aquí solo las anclas de la intensiva, que no se mueven
    const ESPd = { '2027-01-04': 33, '2027-03-12': 82 };
    for (const [iso, d] of Object.entries(ESPd)) { const v = EPn.diaActual('ENCAPS', F6j.f1.inicio, 82, iso); if (v !== d) nErr.push(`(v610-e) diaActual(${iso}) = ${v} (se espera ${d})`); }
    // v6.10d: cada día real del 18-nov al 4-ene → el dia de la fila del SQL con su fecha de PLAN (fechaPlanDe), y cada fila del SQL se pinta en su día real
    //   (fechaRealDe) con el bloque ENCAPS de esa fecha de plan
    for (let iso = addDias(F6j.f1.inicio, 0); iso <= '2027-01-04'; iso = addDias(iso, 1)) {
      const fp = F6n.fechaPlanDe(iso, 'encaps'), r = M.find((x) => x.fecha === fp);
      if (r && EPn.diaActual('ENCAPS', F6j.f1.inicio, 82, iso) !== r.dia) nErr.push(`(v610-e) diaActual(${iso}) ≠ dia ${r.dia} de su fecha de plan ${fp}`);
    }
    // v6.11 (lun 23-nov): la fila cuya fecha de plan se quedó SIN DÍA real (gen_fechas_v6.planesSinDia: el mié 30-dic; la coloca otra ronda) no se exige aquí
    const SIN_DIA = new Set(require('./gen_fechas_v6').planesSinDia());
    for (const r of M) {
      if (SIN_DIA.has(r.fecha)) continue;
      const real = F6n.fechaRealDe(r.fecha, 'encaps'), p = PLn.plantillaDelDia(real);
      if (!p.bloques.some((b) => b.plan === 'encaps' && b.id === 'encaps' && (b.fechaPlan || real) === r.fecha)) nErr.push(`(v610-e) fila dia ${r.dia} (plan ${r.fecha}): el día real ${real} no trae su bloque ENCAPS con esa fecha de plan`);
    }
    try {
      const H = leer(cpx.execFileSync('git', ['show', 'e34e1ad:DATA/_scripts/_encaps_mantenimiento_2027.sql'], { cwd: path.join(__dirname, '..', '..'), encoding: 'utf8', maxBuffer: 64 << 20 }));
      // v6.10c (corrimiento literal): las 27 filas de banco de la v6.09, en el MISMO orden y con el mismo contenido (sin dia/fecha/weekday), y los 5 mini-sims
      //   en sus mismos viernes con el mismo contenido (salvo sim_n = dia); antes: «filas dia ≥ 10 idénticas»
      const sinF = (l) => l.replace(/^\('ENCAPS',\d+,'[\d-]+','[^']+',/, '').replace(/"sim_n":\d+/, '"sim_n":N');
      const byF = (x, y) => (x.fecha < y.fecha ? -1 : 1);
      const bancoH = H.filter((x) => x.tipo !== 'mini_sim').sort(byF).map((x) => sinF(x.l)), bancoM = M.filter((x) => x.tipo !== 'mini_sim').sort(byF).map((x) => sinF(x.l));
      if (JSON.stringify(bancoH) !== JSON.stringify(bancoM)) nErr.push('(v610-f) mantenimiento ENCAPS: las filas de banco no son las de la v6.09 (e34e1ad) en el mismo orden');
      const simH = H.filter((x) => x.tipo === 'mini_sim').map((x) => x.fecha + sinF(x.l)), simM = M.filter((x) => x.tipo === 'mini_sim').map((x) => x.fecha + sinF(x.l));
      if (JSON.stringify(simH) !== JSON.stringify(simM)) nErr.push('(v610-f) mantenimiento ENCAPS: los mini-sims no están en los mismos viernes con el mismo contenido que en la v6.09 (e34e1ad)');
      if (M.length !== H.length || M[M.length - 1].fecha !== '2027-01-02') nErr.push(`(v610-f) mantenimiento ENCAPS: ${M.length} filas (v6.09: ${H.length}) · última ${M[M.length - 1] && M[M.length - 1].fecha} (se espera el sáb 2-ene)`);
    } catch (e) { /* sin el commit: no se compara */ }
  }
  console.log(`v6.10 · núcleo: mar 17 sin sesión · ${nX} bloques de corrida_s1.extra con su bloque · Step D2 jue 19 (nivel 0; UWSA1 → T82) · NBME 25 jue 10-dic · sin sábados de Step · pausa desde el ${addDias(ultS, 1)} · Anki 18-24 nov · ENCAPS dia por fecha + diaActual + sim_n · tramo 2 = v6.09 · filas de banco de la v6.09 en orden (v6.10c: dia 32 = sáb 2-ene)`);
  for (const e of nErr) errores.push(e);
}

// v6.10j (rev. c14, 18-nov-2026 noche) · REVISIÓN SEMANAL, paso RELLENAR: (a) el «cómo» empieza por los RÓTULOS de las métricas y «nunca se inventa … «sin
//   dato»», todo dentro de los 110 caracteres que deja ver el Calendar; ENCAPS primero hasta su examen y, después, último (o fuera); (b) cada cosa medida de
//   ENCAPS (pre-tests de arranque y mini-sims de F1, simulacro de cierre de año, simulacros del domingo, pre-test 100Q, SIM 100Q, dress rehearsal, mini-sims del
//   carril B y del sábado, examen) entra en UNA sola revisión (encapsRevDe), también la semana del sáb 13-mar (PROTEGIDO: sin revisión); (c) el «SIM #n» de
//   la revisión = sim.num del SQL de la intensiva
{
  const FV = cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'), cache);
  const EG = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'), cache);
  const EM = cargarModuloTS(path.join('src', 'lib', 'encapsManana.ts'), cache);
  const fs = require('fs');
  const F6 = FV.FECHAS_V6, EXA = F6.encaps.examen, HASTA = '2027-05-01';
  const rErr = []; const vistas = new Map(); const itemsDe = new Map(); let nRev = 0;
  const ROT = /^(4 ENCAPS · )?1 USMLE · 2 uWorld · 5 MIR · 8 sueño( · 4 ENCAPS)?; nunca se inventa: lo que no tengas queda «sin dato» → /;
  for (let iso = F6.f1.inicio; iso <= HASTA; iso = addDias(iso, 1)) {
    const g = RG.guiaRevisionDe(iso);
    if (!g || FV.motivoProtegido(iso)) continue; // sáb 13-mar: la plantilla no pinta la revisión (D-1 ENCAPS)
    nRev++;
    const p = g.pasos.find((x) => /^RELLENAR/.test(x.que)), c = (p && p.como) || '', m = ROT.exec(c);
    if (!m || m[0].length > 110) { rErr.push(`${iso} (v610j-a): RELLENAR sin los rótulos de las métricas delante (o pasan de 110): «${c.slice(0, 120)}»`); continue; }
    if (!!m[1] !== (iso <= EXA)) rErr.push(`${iso} (v610j-a): ENCAPS ${m[1] ? 'primero tras su examen' : 'no va primero antes de su examen'} (${EXA})`);
    const sab = RG.revisionSabadoDe(iso), r = RG.encapsRevDe(sab);
    if (!!m[2] !== (iso > EXA && r.items.length > 0)) rErr.push(`${iso} (v610j-a): 4 ENCAPS al final ${m[2] ? 'sin nada que medir' : 'falta (su ventana trae ' + r.items.join(' + ') + ')'}`);
    if (iso <= EXA && !/4 ENCAPS: /.test(c)) rErr.push(`${iso} (v610j-a): sin el detalle «4 ENCAPS: …»`);
    for (const f of r.fechas) { if (vistas.has(f)) rErr.push(`${f} (v610j-b): medido en dos revisiones (${vistas.get(f)} y ${iso})`); vistas.set(f, iso); }
    for (const f of r.fechas) itemsDe.set(f, r.items.join(' + '));
  }
  // lo que se espera medir (fechas REALES), de los datos de los generadores
  const esp = new Set();
  for (let p = addDias(F6.f1.inicio, -1); p <= '2027-01-10'; p = addDias(p, 1)) {
    const s = EG.sesionEncapsDe(p), mm = EM.encapsMananaDe(p);
    if (s && (s.tipo === 'minisim' || s.tipo === 'pretest')) esp.add(FV.fechaRealDe(p));
    if (mm && mm.fase === 'cierre') esp.add(FV.fechaRealDe(p));
  }
  for (let x = F6.f1.inicio; x <= HASTA; x = addDias(x, 1)) {
    const d = EM.encapsDomingoDe(x), f2 = EG.encapsF2De(x), sb = EG.encapsSabadoDe(x);
    if ((d && /simulacro/.test(d.modo)) || (f2 && (['pretest', 'sim100', 'dress_rehearsal'].includes(f2.tipo) || (f2.carrilB && f2.carrilB.pendiente === 'mini_sim'))) || (sb && sb.tipo === 'mini_sim') || x === EXA) esp.add(x);
  }
  for (const f of esp) if (!vistas.has(f)) rErr.push(`${f} (v610j-b): lo ENCAPS medido ese día no entra en ninguna revisión`);
  // (c) SIM #n = sim.num del SQL
  const sims = fs.readFileSync(path.join(__dirname, '_encaps_intensivo_2027.sql'), 'utf8').split('\n').filter((l) => /^\('ENCAPS',\d+,'\d{4}-\d{2}-\d{2}','[^']+','sim100'/.test(l))
    .map((l) => ({ f: /^\('ENCAPS',\d+,'(\d{4}-\d{2}-\d{2})'/.exec(l)[1], n: Number((/"num":(\d+)/.exec(l) || [])[1]) }));
  for (const s of sims) if (!new RegExp(`SIM #${s.n} 100Q del `).test(itemsDe.get(s.f) || '')) rErr.push(`${s.f} (v610j-c): la revisión no lo nombra «SIM #${s.n} 100Q» (sim.num del SQL)`);
  console.log(`v6.10j · revisión semanal: ${nRev} revisiones con los rótulos delante (≤ 110) · ${esp.size} mediciones ENCAPS, cada una en una sola revisión · ${sims.length} SIM 100Q con su #n del SQL`);
  for (const e of rErr) errores.push(e);
}

// ── v6.10l (rev. c15 · rutina-usmle-synapse-vibe) ──
//   (a) SHIP «CERRAR»: cada criterio de aceptación de la lista es su cabeza entera (hasta la «→») o un corte en límite de palabra con « …» (nunca media palabra:
//       «PRONOSTICO_WALKFO», «asignatu») y sin paréntesis / comillas «» abiertos; en F1 el plan B no deja «los A» antes del criterio (1)
//   (b) vibecoding: el aviso de una semana deload dice la carga de sus minutos reales (S7 «2 días de 45′ + 3 de 15′» · S13-S16 «15′/día» · S17-S20 «journal 5′»)
//   (c) SYNAPSE: ningún aviso le habla al Calendar («El Calendar debe …») · (d) taper: ningún PC de deload total (0′) dice «30' máx»
{
  const lErr = [];
  for (let iso = '2026-11-18'; iso <= '2027-04-11'; iso = addDias(iso, 1)) {
    if (dow(iso) === 0) {
      const g = RG.guiaShipDe(iso); const p = g && g.pasos.find((x) => /^CERRAR lo que el verify/.test(x.que)); const pr = p && V.vibePCDomingo(iso).at(-1);
      if (p && pr && pr.proyecto) {
        const ac = pr.proyecto.aceptacion.map((a) => a.split('→')[0].trim());
        const items = [...p.como.matchAll(/\((\d+)\) (.+?)(?= · \(\d+\) |\.? El plan B|\.? Si todo|\.?$)/g)].map((m) => [Number(m[1]), m[2]]);
        if (items.length !== ac.length) lErr.push(`${iso} (v610l-a): SHIP con ${items.length} criterios en «CERRAR» (esperados ${ac.length})`);
        for (const [n, t] of items) {
          const full = ac[n - 1] || '', cut = /\s…$/.test(t), base = t.replace(/\s…$/, '');
          if (!cut && t !== full) lErr.push(`${iso} (v610l-a): criterio (${n}) ≠ su cabeza entera: «${t.slice(0, 60)}…»`);
          if (cut && !(full.startsWith(base) && /[\s,;:)»'"]/.test(full[base.length] || ' '))) lErr.push(`${iso} (v610l-a): criterio (${n}) cortado a media palabra: «${base.slice(-30)}»`);
          if (cut && ((base.match(/\(/g) || []).length !== (base.match(/\)/g) || []).length || (base.match(/«/g) || []).length !== (base.match(/»/g) || []).length)) lErr.push(`${iso} (v610l-a): criterio (${n}) con un paréntesis o una comilla abiertos`);
        }
        if (/a cuenta de estos \d+′: los A/.test(p.como)) lErr.push(`${iso} (v610l-a): el plan B vuelve a ir delante del criterio (1) («… los A …»)`);
      }
    }
    const v = V.vibeDiaDe(iso);
    if (v && v.deload) {
      const av = (RG.guiaVibeDe(iso) || {}).aviso || '', mins = V.VIBE_DIAS.filter((y) => y.semana === v.semana).map((y) => y.min);
      // v6.10w: con minutos mixtos, el reparto sale de los minutos REALES de la semana (S7: 15 · 45 · 45 · 30 → «2 días de 45′ + 1 de 30′ + 1 de 15′»)
      const cnt = [...mins.reduce((mm, m) => mm.set(m, (mm.get(m) || 0) + 1), new Map())].sort((a, b) => b[0] - a[0]).map(([m, k], i) => `${k}${i ? '' : ` día${k > 1 ? 's' : ''}`} de ${m}′`).join(' + ');
      const ok = mins.every((m) => m <= 5) ? /Deload total: journal 5′\./.test(av) : mins.every((m) => m === mins[0]) ? new RegExp(`Mantenimiento: ${mins[0]}′/día\\.`).test(av) : av.includes(`carga al 50 % (${cnt})`);
      if (!ok || (mins.every((m) => m === mins[0]) && /2 días de 45′/.test(av))) lErr.push(`${iso} (v610l-b): vibecoding S${v.semana}: el aviso de deload no sale de sus minutos (${[...new Set(mins)].join('/')}′): «${av.slice(0, 80)}»`);
    }
    const sy = RG.guiaSynapseDe(iso);
    if (sy && /El Calendar (?:debe|ya está)/.test(sy.aviso || '')) lErr.push(`${iso} (v610l-c): el aviso del SYNAPSE le habla al Calendar`);
  }
  for (const t of V.VIBE_TAPER) if (t.tipo === 'deload' && /30' máx|PC dom OPCIONAL/.test(t.shipTxt)) lErr.push(`taper S${t.s} (v610l-d): PC de 0′ (deload total) con «30' máx»`);
  console.log(`v6.10l · SHIP: criterios en límite de palabra · vibecoding: aviso de deload por minutos reales · SYNAPSE sin notas al Calendar · taper sin «30' máx» en los PC de 0′`);
  for (const e of lErr) errores.push(e);
}

// ── ronda c40 (chat SYNAPSE) · v611-syn-hecho: el «hecho» de TODA guía del SYNAPSE (sesión guiaSynapseDe, recuperación / cadena guiaSynapseRecDe, cola de F1
//   y cola post-Step 1 guiaSynapseColaDe)
//   (a) dice dónde va el ✓ con las etiquetas REALES de la app: «✓ en <pestaña> › <subpestaña>» = tabBarLabel de Synapse (AppNavigator; el mismo en
//       DesktopSidebar) › label de la subpestaña de SynapseHub donde se pinta SynapseTodayPlan (el botón ✓ del día); nada de «pestaña 🧠 SYNAPSE» ni «⚡ Hoy».
//       El pie del panel derecho de escritorio (DesktopRightPanel, «marca el día en …») usa la misma ruta.
//   (b) cabe en la línea «Hecho» del Calendar: la regla de corte.cortarHecho (DATA/_v600/cal/cal_bk/v609/c12/corte.js) = 180 caracteres, o 240 si es una
//       lista de ≥ 3 criterios « + » fuera de paréntesis y comillas; si no, el volcado lo corta (sáb 26-dic 07:15: 201 → cortado en «… en el chat …»)
{
  const fs = require('fs');
  const hErr = [];
  const leer = (rel) => fs.readFileSync(path.join(__dirname, '..', '..', rel), 'utf8');
  const nav = (/name="Synapse"[\s\S]{0,300}?tabBarLabel:\s*'([^']+)'/.exec(leer(path.join('src', 'navigation', 'AppNavigator.tsx'))) || [])[1];
  const side = (/\{\s*key:\s*'Synapse',\s*label:\s*'([^']+)'/.exec(leer(path.join('src', 'layouts', 'DesktopSidebar.tsx'))) || [])[1];
  const hub = leer(path.join('src', 'components', 'study', 'SynapseHub.tsx'));
  const subKey = (/sub === '(\w+)' && <SynapseTodayPlan\b[^>]*\bonToggle=/.exec(hub) || [])[1];
  const subLbl = subKey ? (new RegExp(String.raw`\{\s*key:\s*'${subKey}',\s*label:\s*'([^']+)'\s*\}`).exec(hub) || [])[1] : undefined;
  if (!nav || !side || nav !== side) hErr.push(`(v611-syn-hecho) etiqueta de la pestaña SYNAPSE: AppNavigator «${nav}» · DesktopSidebar «${side}» (deben existir y coincidir)`);
  if (!subLbl) hErr.push('(v611-syn-hecho) SynapseHub.tsx: no encuentro la subpestaña donde se pinta SynapseTodayPlan (el ✓ del día)');
  const ruta = `✓ en ${nav} › ${subLbl}`;
  const masN0 = (s) => { let p = 0, q = 0, n = 0; for (let i = 0; i < s.length; i++) { const ch = s[i]; if (ch === '(') p++; else if (ch === ')' && p) p--; else if (ch === '«') q++; else if (ch === '»' && q) q--; else if (!p && !q && s.startsWith(' + ', i)) n++; } return n; };
  const limHecho = (h) => (masN0(h) >= 2 ? 240 : 180);
  const gs = [];
  for (let iso = INI; iso <= FIN; iso = addDias(iso, 1)) gs.push(['sesión', iso, RG.guiaSynapseDe(iso)]);
  for (const r of S.SYN_REC_F1 || []) gs.push([r.cadena ? 'cadena' : 'recuperación', r.fecha, RG.guiaSynapseRecDe(r.fecha, r.ini)]);
  for (const c of [...(S.SYN_COLA_F1 || []), ...(S.SYN_COLA_POST_STEP1 || [])]) gs.push(['cola', c.fecha, RG.guiaSynapseColaDe(c.fecha)]);
  const n = { sesión: 0, cadena: 0, recuperación: 0, cola: 0 };
  let maxL = 0;
  // ronda c40 (remate): el ✓ de «⚡ run» marca la fila que la app pinta ESE día real (SynapseTodayPlan: synTodayISO = fechaPlanDe(hoy, 'synapse') →
  //   synDiaDe o planHoyD de studyProgress, replicado aquí) y es un interruptor → (c) una sesión pide «✓ en … › ⚡ run» solo si esa fila es la suya; la
  //   cadena (cola de la sesión de su día), la recuperación sin fila propia y las colas, ningún ✓; (d) ninguna fila se pide dos veces
  const planHoyD = (iso) => { const e = S.SYN_DIAS.find((x) => x.fecha === iso); if (e) return e.d; const nx = S.SYN_DIAS.find((x) => FV.fechaRealDe(x.fecha) > iso); return nx ? nx.d : S.SYN_DIAS[S.SYN_DIAS.length - 1].d; };
  const runD = (real) => { const p = FV.fechaPlanDe(real, 'synapse'); const t = S.synDiaDe(p); return t ? t.d : planHoyD(p); };
  const pedidas = new Map();
  for (const [tipo, iso, g] of gs) {
    if (!g) continue;
    n[tipo]++;
    const h = String(g.hecho || '').replace(/\s{2,}/g, ' ').trim(), lim = limHecho(h);
    const real = tipo === 'sesión' ? FV.fechaRealDe(iso, 'synapse') : iso;
    const fila = tipo === 'sesión' ? (S.synDiaDe(iso) || {}).d : null; // cadena, recuperación y cola: sin fila propia (la cadena es la cola de la sesión de su día)
    const quiere = fila == null ? null : ruta;
    if (tipo === 'sesión' && fila != null && runD(real) !== fila) hErr.push(`${iso} SYNAPSE sesión ${g.franja} (v611-syn-hecho): su día real ${real} «⚡ run» pinta la fila D${runD(real)}, no la suya (D${fila}): el ✓ marcaría otra`);
    if (quiere && subLbl && !h.includes(quiere)) hErr.push(`${iso} SYNAPSE ${tipo} ${g.franja} (v611-syn-hecho): el «hecho» no dice «${quiere}»: «${h.slice(0, 90)}»`);
    if (!quiere && /✓/u.test(h)) hErr.push(`${iso} SYNAPSE ${tipo} ${g.franja} (v611-syn-hecho): sin fila propia en «⚡ run» (ese día pinta la D${runD(real)}) y el «hecho» pide un ✓: «${h.slice(0, 90)}»`);
    if (fila != null) { if (pedidas.has(fila)) hErr.push(`${iso} SYNAPSE ${tipo} ${g.franja} (v611-syn-hecho): la fila D${fila} ya la pide ${pedidas.get(fila)} (el ✓ es un interruptor: dos pulsaciones la desmarcan)`); else pedidas.set(fila, `${tipo} ${real} ${g.franja}`); }
    if (/pestaña 🧠|⚡ Hoy/u.test(h)) hErr.push(`${iso} SYNAPSE ${tipo} ${g.franja} (v611-syn-hecho): el «hecho» usa la ruta vieja del ✓: «${h.slice(0, 90)}»`);
    if (h.length > lim) hErr.push(`${iso} SYNAPSE ${tipo} ${g.franja} (v611-syn-hecho): el «hecho» mide ${h.length} > ${lim} (línea «Hecho» del Calendar${lim === 240 ? ', lista de criterios' : ''}): el volcado lo corta`);
    maxL = Math.max(maxL, h.length);
  }
  if (!n['sesión'] || !n.cola || !(n.cadena + n['recuperación'])) hErr.push(`(v611-syn-hecho) faltan guías del SYNAPSE que revisar: ${JSON.stringify(n)}`);
  const pie = (/marca el día en ([^\n<{]+)/.exec(leer(path.join('src', 'layouts', 'DesktopRightPanel.tsx'))) || [])[1];
  if (subLbl && (!pie || pie.trim() !== ruta.replace(/^✓ en /, ''))) hErr.push(`(v611-syn-hecho) DesktopRightPanel.tsx: «marca el día en ${pie ? pie.trim() : '?'}» ≠ «${ruta.replace(/^✓ en /, '')}»`);
  console.log(`v6.11 · SYNAPSE «hecho»: ${n['sesión']} sesiones con «${ruta}» de su fila (${pedidas.size} filas, ninguna dos veces) · ${n.cadena} cadenas, ${n['recuperación']} recuperaciones y ${n.cola} colas sin ✓ (sin fila propia) · dentro del límite del Calendar (180 · 240 en lista; máx ${maxL})`);
  for (const e of hErr) errores.push(e);
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
