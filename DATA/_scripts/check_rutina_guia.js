// check_rutina_guia.js — verifica las guías «qué · cuánto · cómo» de src/lib/rutinaGuia.ts (v6.02c, 18-oct-2026, E5) para TODOS los días
// de los planes vibecoding · SYNAPSE · AURUM · LIVIANO · Business · revisión semanal · SHIP del sábado · Feynman del domingo.
//
// Comprueba (sale con código 1 si algo falla):
//   · validarGuia (src/lib/guia.ts) en cada bloque: Σ pasos = totalMin = minutos de la franja, pasos con qué/cómo, minutos enteros ≥ 1,
//     URLs con esquema válido, «hecho» no vacío;
//   · COBERTURA: cada fila de cada plan tiene su guía (vibecoding L-V · SYNAPSE L-V + sábados con PC/ABC · AURUM · LIVIANO · Business
//     L-V con lectura/OUTPUT —el OUTPUT de un viernes de NBME aparece el sábado— · revisión de cada sábado de F1);
//   · la franja de cada guía cae donde dice la decisión de carga (Business 13:00 o 12:30 en NBME · SYNAPSE 12:30 / 07:25 UWSA1 / 13:00 NBME).
// Uso:
//   node DATA/_scripts/check_rutina_guia.js                         # verificación completa
//   node DATA/_scripts/check_rutina_guia.js --informe 2026-10-19 2026-10-25   # además imprime la tabla día × franja (markdown)
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
for (let iso = '2026-10-24'; iso <= '2026-12-26'; iso = addDias(iso, 7)) if (!RG.guiaRevisionDe(iso)) falta('revision', iso, 'sábado de F1');

// ── franjas de las decisiones de carga (semana 1 + hitos) ──
const esperado = [
  ['2026-10-19', RG.guiaSynapseDe, '07:25–07:55'], ['2026-10-20', RG.guiaSynapseDe, '12:30–13:00'], ['2026-10-30', RG.guiaSynapseDe, '13:00–13:30'],
  ['2026-10-19', RG.guiaBusinessDe, '13:00–13:25'], ['2026-10-23', RG.guiaBusinessDe, '13:00–13:25'], ['2026-10-24', RG.guiaBusinessDe, '07:45–08:00'],
  ['2026-10-31', RG.guiaBusinessDe, '07:45–08:25'], ['2026-10-24', RG.guiaShipDe, '15:00–17:00'], ['2026-10-25', RG.guiaFeynmanDe, '15:00–15:10'],
  ['2026-10-24', RG.guiaRevisionDe, '07:15–07:45'], ['2026-10-19', RG.guiaAurumDe, '14:15–15:15'], ['2026-10-19', RG.guiaLivianoDe, '17:15–18:00'],
  ['2026-10-19', RG.guiaVibeDe, '04:15–05:00'],
];
for (const [iso, f, fr] of esperado) { const g = f(iso); if (!g || g.franja !== fr) errores.push(`${iso} ${f.name}: franja ${g ? g.franja : 'null'} ≠ ${fr}`); }
if (RG.revisionFicheroDe('2026-10-24') !== 'S01_2026-10-24.md') errores.push(`revisionFicheroDe(2026-10-24) = ${RG.revisionFicheroDe('2026-10-24')} ≠ S01_2026-10-24.md`);

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
