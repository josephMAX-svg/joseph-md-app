/**
 * explorar_fecha_examen.js — v6.07 (8-nov-2026): ¿con qué fecha de examen cabe el tramo 2 del Step 1 sin recortar nada? SOLO LEE: no escribe
 * ningún fichero del repo ni toca _fechas_v6.json (la fecha la decide Joseph).
 *
 *   node DATA/_scripts/usmle/explorar_fecha_examen.js [--f1-filas N] [--semana-plan S] [--semanas K]
 *     --f1-filas N   slots del Step en F1 (por defecto, los de _fechas_v6.json: diasStepF1 = 13 con step1.f1_dias_semana [2, 4] en la v6.08)
 *     --semana-plan S  v6.08: filas de una semana de plan de F1 (por defecto step1.f1_dias_semana.length = 2; la v6.07 se exploró con 5)
 *     --semanas K    cuántos lunes después del 25-oct-2027 probar (por defecto 12, hasta el 17-ene-2028)
 *
 * Para cada lunes E = 25-oct-2027 + k semanas: genera el tramo 2 con gen_tramo2.generarTramo2 (la misma regla que producción, R1: nunca se
 * recorta) y muestra el déficit (unidades de la cola que no caben), el COLCHÓN (filas y horas al piso), el GO/NO-GO (E-49) y el colchón de
 * HORAS de la regla de cálculo de gen_fechas_v6 (§B4.4). La tabla de hitos 2027 de un examen posterior al 25-oct NO está decidida: aquí se usa
 * una PROPUESTA con el patrón de la v6.04 (cuando el examen pasó del 27-sep al 25-oct): NBME 30 (lun 24-may) y UWSA3 (mar 29-jun) se quedan;
 * NBME 31, NBME 32, UWSA2, NBME 33 y el Free 120 + 4 bloques corren k semanas con el examen.
 * Resultado v6.07 (15 slots, Day-After de los NBME desplazados a F3 en franjas): 25-oct → déficit 11 u · 1-nov → 8 · 8-nov → 5 · 15-nov → 2 ·
 * 22-nov → 0 (colchón 2 filas ≈ 5 h) · 29-nov → 8 filas ≈ 21 h · 6-dic → 14 filas ≈ 37 h. Para aplicarlo: _fechas_v6.json (step1.examen,
 * adelanto, planB, reserva_por_encaps, eligibility, cambios + derivados), DJ1 de gen_fechas_v6.js y HITOS[E] de gen_tramo2.js y de
 * ref_v6/gen_tramo2_ref.js; después la cadena habitual y la referencia ref_v6/tramo2_14mar_<E>_v607.json (= gen_tramo2_ref.js 2027-03-14 <E>
 * --f1-filas 15), que verificar_v6.js toma sola.
 * Resultado v6.08 (13 slots, semana de plan de 2 filas; NBME 25 en F1 = D8): 25-oct → déficit 13 u · 1-nov → 10 · 8-nov → 7 · 15-nov → 4 ·
 * 22-nov → 1 · 29-nov → 0 (colchón 4 filas ≈ 10,5 h) · 6-dic (vigente) → 10 filas ≈ 26,3 h · 13-dic → 16 filas ≈ 42 h (hitos de propuesta).
 */
'use strict';
const V6 = require('../gen_fechas_v6');
const T = require('./gen_tramo2');

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const F = V6.cargarFechasV6();
const n = opt('--f1-filas') != null ? Number(opt('--f1-filas')) : V6.derivar(F).diasStepF1;
const SEM = opt('--semana-plan') != null ? opt('--semana-plan') : String(T.semanaPlanDe(F)); // v6.08
const K = opt('--semanas') != null ? Number(opt('--semanas')) : 12;
const BASE = '2027-10-25';
/** Propuesta de hitos 2027 para un examen E = 25-oct + k semanas (patrón v6.04): NBME 30 y UWSA3 fijos; el resto + k semanas. */
const tablaHitos = (k) => T.HITOS[BASE].map(([nom, forma, a, b, p]) => (/NBME 30|UWSA3/.test(nom) ? [nom, forma, a, b, p]
  : [nom, forma, V6.add(a, 7 * k), V6.add(b, 7 * k), V6.add(p, 7 * k)]));

console.log(`Tramo 2 con ${n} slots de Step en F1 (${V6.diasSemanaTxt(F.step1.f1_dias_semana)}; semana de plan ${SEM} filas) · ENCAPS ${V6.fy(F.encaps.examen)} · SERUMS ${V6.fy(F.serums.inicio)} · examen vigente ${V6.fy(F.step1.examen)}`);
let primera = null;
for (let k = 0; k <= K; k++) {
  const E = V6.add(BASE, 7 * k);
  const hitos = T.HITOS[E] || tablaHitos(k);
  const prev = T.HITOS[E];
  T.HITOS[E] = hitos; // solo en memoria
  try {
    const o = T.opcionesTramo2([F.encaps.examen, E, F.serums.inicio, '--f1-filas', String(n), '--semana-plan', SEM, '--permitir-deficit'], F);
    const r = T.generarTramo2(o);
    const col = r.out.filter((x) => x.tipo === 'colchon');
    const piso = Math.round(V6.colchonPiso(V6.reinicioDe(F.encaps.examen), E, { ...V6.ctxDe(F), examen: E }));
    const def = r.deficitFwd + r.deficitBwd;
    if (!def && !primera) primera = E;
    console.log(`${V6.fy(E)}${prev ? '' : ' (hitos: propuesta)'} · ${r.out.length} filas · déficit ${def} u${def ? ` (adelante ${r.deficitFwd} · atrás ${r.deficitBwd})` : ''} · colchón ${col.length} filas ≈ ${col.reduce((a, x) => a + x.h, 0).toFixed(1)} h · horas (piso) ${piso >= 0 ? '+' : ''}${piso} · GO/NO-GO ${V6.f(r.GONOGO)}`);
  } catch (e) {
    console.log(`${V6.fy(E)}: ${e.message}`);
  } finally {
    if (prev) T.HITOS[E] = prev; else delete T.HITOS[E];
  }
}
console.log(primera ? `→ primera fecha sin déficit: ${V6.fy(primera)}` : '→ ninguna fecha sin déficit en el rango probado');
