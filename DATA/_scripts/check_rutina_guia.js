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
//   node DATA/_scripts/check_rutina_guia.js --informe 2026-10-21 2026-10-31   # además imprime la tabla día × franja (markdown)
// v6.03 (20-oct-2026): las expectativas de franja ya no están cableadas a la semana del lun 19-oct: salen del plan (D1, UWSA1/NBME,
//   1.er OUTPUT de Business, 1.er sábado ≥ D1) + comprobación de que la curaduría de la semana 1 (vibeS1 · SYN_CUR_PIEZAS · BIZ_TRAMO)
//   aterriza en su paso / pieza / fila del plan corrido (v6.03: mié 21-oct → sáb 31-oct).
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
const INI = '2026-10-17', FIN = '2027-05-01';
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
  [UWSA1, RG.guiaSynapseDe, '07:25–07:55'], [habilSig(UWSA1), RG.guiaSynapseDe, '12:30–13:00'], [NBMES[0], RG.guiaSynapseDe, '13:00–13:30'],
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
if (!conTexto(RG.guiaShipDe(SAB1), /deep dive.*10:00-20:00/) || !conTexto(RG.guiaShipDe(SAB1), /lethal trifecta/)) errores.push(`${SAB1} guiaShipDe: faltan los comodines curados del 1.er sábado`);
if (!conTexto(RG.guiaShipDe(addDias(SAB1, 7)), /Greg Brockman/) || !conTexto(RG.guiaShipDe(addDias(SAB1, 7)), /Prompt injection attacks/)) errores.push(`${addDias(SAB1, 7)} guiaShipDe: faltan los comodines curados del 2.º sábado`);
const lect = B.BIZ_DIAS.filter((x) => B.bizModo(x) === 'L' || B.bizModo(x) === 'CRITICA').slice(0, 4);
// LIVIANO: la lectura medida (LIV_LECT) va con su TEMA / CASO, no con el D (v6.03: los casos caen D3/D8/D13 en vez de D5/D10/D15)
const livTema = (re) => L.LIV_DIAS.find((x) => re.test(x.tema));
[[/^La obesidad como enfermedad/, /Essential Points › Definition/], [/^Leptina:/, /Neurobiology of energy homeostasis › Background/],
 [/^Resistencia leptínica/, /leptin resistance/], [/^VIERNES CASO 1\/16/, /Lessons learned from the weight-reduced state/],
 [/^Circuito arcuato II/, /2\.ª pasada: POMC/], [/^VIERNES CASO 2\/16/, /Determinants of feeding behavior/], [/^El argumento del tratamiento crónico/, /Developmental determinants/]]
  .forEach(([rt, re]) => { const x = livTema(rt); if (!x || !conTexto(RG.guiaLivianoDe(x.fecha), re)) errores.push(`${x ? x.fecha + ' D' + x.d : rt} guiaLivianoDe: falta la lectura medida ${re}`); });
[/In Spark/, /In Spark/, /In Defense of Food/, /In Defense of Food/].forEach((re, i) => { const x = lect[i]; if (!x || !conTexto(RG.guiaBusinessDe(x.fecha), re)) errores.push(`${x ? x.fecha : '?'} guiaBusinessDe: falta el tramo curado ${re} (lectura ${i + 1})`); });

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
