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
//   node DATA/_scripts/check_rutina_guia.js --informe 2026-10-26 2026-11-07   # además imprime la tabla día × franja (markdown)
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
  ['liviano', RG.guiaLivianoDe], ['revision', RG.guiaRevisionDe], ['ship+synapse sáb', RG.guiaShipDe], ['feynman dom', RG.guiaFeynmanDe],
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
  if (w === 6 && !RG.guiaShipDe(x.fecha)) falta('ship+synapse sáb', x.fecha, `d${x.d}`);
  if (w === 0 && x.bloques.some((b) => b.tag === 'R' && b.min >= 10 && /^Feynman/.test(b.material)) && !RG.guiaFeynmanDe(x.fecha)) falta('feynman dom', x.fecha, `d${x.d}`);
}
for (const x of A.AURUM_DIAS) if (!RG.guiaAurumDe(x.fecha)) falta('aurum', x.fecha, `D${x.d}`);
for (const x of L.LIV_DIAS) if (!RG.guiaLivianoDe(x.fecha)) falta('liviano', x.fecha, `D${x.d}`);
for (const x of B.BIZ_DIAS) {
  const m = B.bizModo(x);
  if (m === 'DESCANSO') continue;
  const hoy = RG.guiaBusinessDe(x.fecha);
  const sabado = addDias(x.fecha, 6 - dow(x.fecha));
  const sab = m === 'OUTPUT' ? RG.guiaBusinessDe(sabado) : null;
  if (!hoy && !sab) falta('business', x.fecha, `D${x.d} ${m}`);
  if (m === 'OUTPUT' && !sab) falta('business', sabado, `cierre del OUTPUT D${x.d}`);
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
const esperado = [
  [UWSA1, RG.guiaSynapseDe, '07:25–07:55'], [habilSig(UWSA1), RG.guiaSynapseDe, '12:30–13:00'], ...NBMES.map((n) => [n, RG.guiaSynapseDe, '13:00–13:30']),
  [D1, RG.guiaBusinessDe, '13:00–13:25'], [OUT1, RG.guiaBusinessDe, '13:00–13:25'], [addDias(OUT1, 1), RG.guiaBusinessDe, '07:45–08:00'],
  [SAB1, RG.guiaShipDe, '15:00–17:00'], [addDias(SAB1, 1), RG.guiaFeynmanDe, '15:00–15:10'],
  [SAB1, RG.guiaRevisionDe, '07:15–07:45'], [D1, RG.guiaAurumDe, '14:15–15:15'], [D1, RG.guiaLivianoDe, '17:15–18:00'],
  [D1, RG.guiaVibeDe, '04:15–05:00'],
];
// Business en día de NBME (F1): lectura → audio 12:30-12:55 en el almuerzo · OUTPUT → entero el sábado 07:45-08:25 (v6.02: vie 30-oct)
for (const n of NBMES) {
  const r = B.bizDiaDe(n);
  if (!r || B.bizModo(r) === 'DESCANSO') continue;
  if (B.bizModo(r) === 'OUTPUT') esperado.push([addDias(n, 6 - dow(n)), RG.guiaBusinessDe, '07:45–08:25']);
  else esperado.push([n, RG.guiaBusinessDe, '12:30–12:55']);
}
for (const [iso, f, fr] of esperado) { const g = f(iso); if (!g || g.franja !== fr) errores.push(`${iso} ${f.name}: franja ${g ? g.franja : 'null'} ≠ ${fr}`); }
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
for (const [iso, re] of curSyn) { const g = iso && (dow(iso) === 6 ? RG.guiaShipDe(iso) : RG.guiaSynapseDe(iso)); if (!conTexto(g, re)) errores.push(`${iso} SYNAPSE: falta la curaduría ${re}`); }
// v6.05: comodines = el 1.er sábado tras su pieza, con prioridad para la curaduría original (No Priors + «Prompt injection…»); el deep dive y la
//   trifecta del viernes solo si su sábado es OTRO (v6.03: sáb 24 = deep dive + trifecta y sáb 31 = No Priors + Willison · v6.05: sáb 31 = No Priors + Willison)
const sabTras = (iso) => iso && addDias(iso, ((6 - dow(iso) + 6) % 7) + 1);
const SAB_NP = sabTras(primeraSyn(/^No Priors/, 'B'));
const SAB_DD0 = sabTras(primeraSyn(/^Canal Anthropic.*deep dive.*tramo 1\b/, 'B'));
// v6.05 (fix): si el 1.er sábado tras el deep dive ya lo ocupa la curaduría original, sus comodines van al SIGUIENTE sábado (v6.05: sáb 7-nov)
const SAB_DD = SAB_DD0 === SAB_NP ? addDias(SAB_DD0, 7) : SAB_DD0;
if (!conTexto(RG.guiaShipDe(SAB_NP), /Greg Brockman/) || !conTexto(RG.guiaShipDe(SAB_NP), /Prompt injection attacks/)) errores.push(`${SAB_NP} guiaShipDe: faltan los comodines curados de la curaduría original (No Priors + «Prompt injection…»)`);
if (!conTexto(RG.guiaShipDe(SAB_DD), /deep dive.*minutos \d+:00-\d+:00/) || !conTexto(RG.guiaShipDe(SAB_DD), /lethal trifecta/)) errores.push(`${SAB_DD} guiaShipDe: faltan los comodines curados del deep dive + trifecta (1.er sábado LIBRE tras la pieza)`);
if (SAB_DD0 === SAB_NP && conTexto(RG.guiaShipDe(SAB_NP), /deep dive.*minutos/)) errores.push(`${SAB_NP} guiaShipDe: el comodín del deep dive pisa al de No Priors`);
// v6.05 (fix): el deep dive retoma donde quedó (tramos de 10′ ya vistos antes del sábado): con el tramo 2 del vie 6-nov → minutos 20:00-30:00
{
  const tramos = S.SYN_DIAS.filter((d) => d.fecha < SAB_DD && dow(d.fecha) >= 1 && dow(d.fecha) <= 5).reduce((a, d) => a + d.bloques.filter((b) => b.tag === 'B' && /AI prompt engineering: A deep dive/.test(b.leccion)).length, 0);
  if (!conTexto(RG.guiaShipDe(SAB_DD), new RegExp(`deep dive.*minutos ${10 * tramos}:00-${10 * tramos + 10}:00`))) errores.push(`${SAB_DD} guiaShipDe: el comodín del deep dive no retoma en el minuto ${10 * tramos} (${tramos} tramos vistos)`);
}
// v6.05 (fix): la guía del sábado nombra TODAS las piezas PC de ese sábado (sáb 20-feb-2027: S16 30′ + S17 0′; antes la de 0′ no salía)
for (const x of S.SYN_DIAS.filter((d) => dow(d.fecha) === 6)) {
  const g = RG.guiaShipDe(x.fecha);
  const txt = g ? [g.titulo, g.aviso || '', ...g.pasos.map((p) => p.que)].join(' ') : '';
  for (const pc of V.vibePCSabado(x.fecha)) if (!new RegExp(`S${pc.s}\\b`).test(txt)) errores.push(`${x.fecha} guiaShipDe: no nombra la pieza PC de S${pc.s} (${pc.tipo})`);
}
// v6.05 (fix): vibecoding — ship = pcSab (alineados) y ningún PC en un día protegido (S20: pcSab '' = sin PC)
{
  const PROT = new Set(FV.FECHAS_V6.protegidos.map((p) => p.fecha));
  for (const x of [...V.VIBE_PROYECTOS, ...V.VIBE_TAPER]) {
    if (x.pcSab && x.pcSab !== x.ship) errores.push(`vibecoding S${x.s}: ship ${x.ship} ≠ pcSab ${x.pcSab} (desalineados)`);
    if (x.pcSab && PROT.has(x.pcSab)) errores.push(`vibecoding S${x.s}: PC el ${x.pcSab}, día PROTEGIDO`);
  }
  for (const p of PROT) if (V.vibePCSabado(p).length) errores.push(`vibecoding: vibePCSabado(${p}) trae PC en un día PROTEGIDO`);
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
    RD2 = LIB('researchDailyPlan'), R272 = LIB('researchDailyPlan2027'), DC2 = LIB('dermaCiclo2');
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
      case 'encaps': return b.ini === '16:15' && F62.faseV6(iso) === 'F1' ? (EG2.sesionEncapsDe(iso) ? [] : null) : [];
      case 'research-derma': return b.detalle || [...RD2.DIAS, ...R272.DIAS_2027].some((x) => x.fecha === iso) || DC2.dermaDiaDeConCiclo2(iso) ? [] : null;
      default: return [];  // usmle (lo verifica su propio ámbito) · serums · gimnasio · vida
    }
  };
  const examen = FV.FECHAS_V6.step1.examen;
  const SIM_FIN = addDias(examen, 5);
  let nSim = 0;
  for (let iso = '2026-10-24'; iso <= SIM_FIN; iso = addDias(iso, 1)) {
    const f4 = F62.faseV6(iso) === 'F4';
    for (const turno of f4 ? [undefined, 'T', 'L', 'G'] : [undefined]) {
      ST2 && global.localStorage.removeItem(ST2.TURNOS_KEY);
      const p = PL.plantillaDelDia(iso, turno); nSim++;
      const tag = `${iso} ${WDC[dow(iso)]} ${p.plantilla}${turno ? '/' + turno : ''}`;
      const bs = p.bloques;
      const uwsa = (RG2.synFranjaDe(iso).franja || '').startsWith('07:25');
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
        const gs = contenido(b, iso);
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
      // (a) días con el ENCAPS 11:00-13:00 → SYNAPSE 13:00-13:30 (bloque y guía)
      if (RG2.encapsOnceATrece(iso) && SY2.synDiaDe(iso) && ![0, 6].includes(dow(iso))) {
        const s = bs.find((b) => b.plan === 'synapse'); const g = RG2.guiaSynapseDe(iso);
        if (s && (s.hora !== '13:00–13:30' || !g || g.franja !== '13:00–13:30')) errores.push(`${tag}: SYNAPSE ${s.hora} / guía ${g ? g.franja : '—'} ≠ 13:00–13:30 (ENCAPS 11:00-13:00)`);
      }
    }
  }
  global.localStorage.removeItem(ST2.TURNOS_KEY);
  // (d) ENCAPS antes del D1: el Home no tiene sesión (CORRIDO o sin bloque 16:15) y la vista no marca «HOY» (antesDelD1 = D1) · desde el D1, null
  for (let iso = addDias(D1, -2); iso <= D1; iso = addDias(iso, 1)) {
    const a = EP2.antesDelD1('ENCAPS', D1, iso);
    const enc = PL.plantillaDelDia(iso).bloques.some((b) => b.plan === 'encaps');
    if (iso < D1 && (a !== D1 || enc)) errores.push(`${iso} ENCAPS antes del D1: antesDelD1 = ${a} (≠ ${D1}) o el Home pinta un bloque ENCAPS`);
    if (iso === D1 && (a !== null || !enc)) errores.push(`${iso} ENCAPS el D1: antesDelD1 = ${a} (debe ser null) o el Home no pinta el bloque 16:15`);
  }
  console.log(`simulación del día: ${nSim} día×turno (2026-10-24 → ${SIM_FIN}) · solapes, bloques sin contenido y guías fuera de su bloque`);
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
