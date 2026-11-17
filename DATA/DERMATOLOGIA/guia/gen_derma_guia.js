/**
 * gen_derma_guia.js — genera src/lib/dermaGuiaDatos.ts (DATOS de la guía Derma «qué · cuánto · cómo»; la LÓGICA y la regla para el resto
 * de sesiones viven en src/lib/dermaGuia.ts).
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js           → escribe src/lib/dermaGuiaDatos.ts (aborta si un bloque no cuadra)
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js --check   → regenera en memoria, compara y valida la guía (plan A y plan B) de TODAS las
 *                                                             sesiones Derma (ciclo 1 + ciclo 2; 45′ y la variante 30′ del SERUMS)
 * Entradas (nada a mano en el .ts):
 *   · guia_catalogo_derma.js (decisiones curadas d1-d5 + temas/asignación del Pictorial Review 4e)
 *   · DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json (listado REAL de los 200 casos, 18-oct) · accessderma_clinica_tocs.json +
 *     accessderma_estetica_tocs.json (índices de los libros) · DATA/USMLE/qbankly_bb_step1_videos.tsv (B&B Dermatology con duración) ·
 *     DATA/USMLE/qbankly_uworld_step1_filtros.tsv (Systems de Dermatology con nº de preguntas) · DATA/MIR/guia_lectura_semana1-2.json
 *     (E2: lectura medida del cap. 1 ProMIR de Dermatología + test del d3) · src/lib/dermaDailyPlan.ts (filas reales: casoIds, fechas)
 *     · src/lib/usmleStep1Daily.ts (fechas de D5/D15 = cambios de velocidad de vídeo, regla E1)
 * Bitácora
 *  · v6.02c (18-oct-2026, E3): nuevo. No cambia fechas, D#, casoIds ni bancos del plan: solo describe cada sesión de 45′.
 *  · v6.02c F2 (18-oct-2026, hallazgos E6): DERMA_CME_DESPLAZADO (d12 lee el capítulo de su átomo — S23 del Color Atlas 9e, título del
 *    índice accessderma_estructura.json — y su módulo CME pasa a d42) · DERMNET_DERMOSCOPY (respaldo de Dermoscopedia) · --check valida
 *    además: (1) ningún paso de uWorld del PLAN B pide más Unused de las que quedan en su System (reparto en orden de fecha, peor caso =
 *    todas las sesiones por plan B) → al agotarse, relleno ProMIR con nº de preguntas; (2) el TEST ProMIR de las sesiones PMD tiene el mismo
 *    nº de preguntas y minutos en plan A y plan B.
 *  · v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; d1 Derma mar 27-oct): sin cambios de lógica; fechas de dermaDailyPlan (d1-d5 mar 27-oct → vie
 *    6-nov) y velocidad de vídeo de usmleStep1Daily (D5 vie 30-oct · D15 vie 13-nov), ya regenerados.
 *  · v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; d1 Derma lun 2-nov = día del UWSA1): sin cambios de lógica; fechas de dermaDailyPlan (d1-d5 lun 2-nov →
 *    jue 12-nov) y velocidad de vídeo de usmleStep1Daily (D5 vie 6-nov · D15 la que dé el plan USMLE v6.06), ya regenerados por sus lotes.
 *  · v6.07 (8-nov-2026 · corrimiento D1 = lun 9-nov; d1 Derma mar 10-nov): sin cambios de lógica; fechas de dermaDailyPlan (d1-d5 mar 10 → vie 20-nov).
 *    La velocidad de vídeo sale de usmleStep1Daily (D5/D15), que regenera el lote USMLE: volver a correr este script (o --check) cuando ese lote cierre.
 *  · v6.08 (14-nov-2026 · re-fecha D1 = lun 16-nov; d1 Derma lun 16-nov): fechas de dermaDailyPlan (d1-d5 lun 16 → jue 26-nov). La F1 del Step 1 tiene ya
 *    solo 13 filas (D1 mar 17-nov → D13 mar 29-dic): sin D15 en usmleStep1Daily, el fin del tramo 1,25× es el ÚLTIMO día de Step de la F1 (mar 29-dic, la
 *    misma fecha que el D15 de la v6.07); D5 = mar 1-dic (v6.07: mar 24-nov). Antes abortaba («no encuentro D5/D15»).
 */
// v6.09 (16-nov-2026 · D1 = mar 17-nov): sin cambios de lógica; fechas de dermaDailyPlan (d1-d5 mié 18 · vie 20 · mar 24 · jue 26 · lun 30-nov: Derma
//   corre una ranura y el jue 31-dic es su día de recuperación) · velocidad de vídeo sin cambio (el Step 1 no cambia).
// v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a2-8 · a2-16): sin cambios en este generador ni en dermaGuiaDatos.ts — la 2.ª pasada de un
//   B&B repetido (2× + recall 60 s, minutos liberados → 1-2Q) y los minutos B&B a la velocidad de reserva 1,25× viven en src/lib/dermaGuia.ts (solo F1
//   y el jue 31-dic). Este --check valida además que esas sesiones cuadran y que el reparto de uWorld del plan B no se pasa del stock. La velocidad de
//   Derma sigue en sus cortes D5/D15 (el Step 1 adelanta su 1,25× al D3, pero el d3/d4 curados de Derma —mar 24 y jue 26-nov— van a 1,0× con su guion).
// v6.09b · lote 1-bis (17-nov-2026, auditoría a2-9): DERMNET_MEDIDO (dermnet_medidas_f1.json: las 11 páginas DermNet del plan B de F1 medidas → minutos
//   = palabras/120 + 0,25′/imagen con su alcance por secciones). El --check valida además que cada sesión de F1 con atlas DermNet lo lleva medido y con
//   esos minutos (y que no se cae por el «relleno < 3′»). 2027 no cambia (otro lote). La velocidad de Derma se queda en sus cortes D5/D15: medido el
//   d3/d4 (mar 24 y jue 26-nov), su franja cuadra a 1,0× (ver el informe del lote 1-bis), así que adelantar el 1,25× no arregla ninguna franja.
// v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis, hallazgos 4 · 5 · 8): DermNet a la regla fija (palabras/100, no /120, + 0,25′/imagen) y medido
//   POR SESIÓN: dermnet_medidas_f1.json v2 = páginas por sección (+ 3 enlaces del índice de micosis para el 31-dic) y, por fecha, qué se lee. Alcance = el de
//   la guía anterior al lote 1-bis (todas las imágenes + clínica + diferencial o su sustituto) + lo que añadió el 1-bis; los minutos salen del proyecto
//   Claude (0′ el 4 y el 8-dic). El resto de cada página «no forma parte del átomo» (sin «no hoy»); lo del átomo que no cabe el 4-dic (2 secciones de
//   psoriasis) va al jue 10-dic con sus minutos. El --check valida además las viñetas del proyecto Claude (k = round(min/5), k × 5 / min en 0,85-1,15),
//   el «(N′ medidos» del paso, la fecha de destino dentro del corte del Calendar y que nada diga «no hoy». 2027 no cambia.
// v6.09b · lote 1-quater (17-nov-2026, revisión R2 del lote 1-ter · pendientes de U2): (1) modo Tutor de uWorld a la regla fija 90 s + 0,85′ = 2,35′/Q en
//   F1 (curadas d1 5Q en 12′ y d2 4Q en 9′; por regla UW_TUTOR_F1 de dermaGuia.ts: 5Q en 12′ o 3Q en 7′ con lo que suelta al proyecto Claude) con el MISMO
//   total de Unused por System en F1 → 2027 igual; (2) PassMedicine «Epidermis» (24-nov) y «Vitiligo» (26-nov), que piden sesión, van ACOTADOS al tiempo;
//   (3) d5 (30-nov): el resumen de PubMed medido (177 palabras → 2′, antes 5′ = 0,35) y el consenso PMC re-medido (Pregunta 3 + Tabla 2 + Key Points +
//   Figuras 1-3 = 11,98′ en 13′); (4) la lectura ProMIR de d1-d3 declara sus minutos a 150 palabras/min (min150 de E2). El --check exige en TODA sesión de F1
//   la regla del Tutor y que ningún paso sin medida quede sin acotar, y que el consumo de uWorld de F1 por System no cambie (UW_F1_TOTAL).
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS, cargarUsmleDaily } = require('../../_scripts/usmle/cargar_ts');
const CAT = require('./guia_catalogo_derma');

const CHECK = process.argv.includes('--check');
const OUT = path.join(ROOT, 'src', 'lib', 'dermaGuiaDatos.ts');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/dermaGuiaDatos.ts'); process.exit(1); };
const rd = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const tsv = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));

const cache = new Map();
const DD = cargarModuloTS(path.join('src', 'lib', 'dermaDailyPlan.ts'), cache);
const ANKI = cargarModuloTS(path.join('src', 'lib', 'ankiLinks.ts'), cache);
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), cache);
const U = cargarUsmleDaily();

// ── fuentes ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const CASES = rd('DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json');
if (CASES.total !== 200) aborta('accessderma_cases1546.json no tiene 200 casos');
const areaDe = (pos) => (pos <= 30 ? 'Dermatopathology' : pos <= 140 ? 'Medical Dermatology' : pos <= 170 ? 'Pediatric Dermatology' : 'Surgical Dermatology');
CASES.casos.forEach((c) => { if (c.area !== areaDe(c.pos)) aborta(`caso pos ${c.pos}: área ${c.area} ≠ rango esperado ${areaDe(c.pos)}`); });
const CORE = { Dermatopathology: 'Path', 'Medical Dermatology': 'Med', 'Pediatric Dermatology': 'Peds', 'Surgical Dermatology': 'Surg' };
for (let p = 1; p <= 200; p++) if (DD.dermaCasoArea(p) !== CORE[areaDe(p)]) aborta(`dermaCasoArea(${p}) = ${DD.dermaCasoArea(p)} ≠ listado real (${CORE[areaDe(p)]}) → corrige dermaDailyPlan.dermaCasoArea`);
const casoUrl = (g) => `https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=${g}&gbosContainerID=310&viewByNumber=false&groupid=1546`;

const TOCS = rd('DATA/DERMATOLOGIA/_scrape/accessderma_clinica_tocs.json').libros;
const TOCE = rd('DATA/DERMATOLOGIA/_scrape/accessderma_estetica_tocs.json').libros;
function cap(bookid, sid) {
  const L = TOCS[bookid] || TOCE[bookid];
  if (!L) aborta(`libro ${bookid} sin índice`);
  const all = [...(L.front || []), ...((L.parts || []).flatMap((p) => p.chapters))];
  const c = all.find((x) => String(x.sid) === String(sid));
  if (!c) aborta(`libro ${bookid}: sectionid ${sid} no está en el índice`);
  return { t: c.t, url: `https://dermatology.mhmedical.com/content.aspx?bookid=${bookid}&sectionid=${sid}` };
}

const BB = new Map();
for (const [cs, id, nombre, s] of tsv('DATA/USMLE/qbankly_bb_step1_videos.tsv')) BB.set(Number(id), { ruta: cs, nombre, s: Number(s) });
const BB_IDS = [69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 251, 281];
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const UW = new Map();
for (const [t, id, nombre, q] of tsv('DATA/USMLE/qbankly_uworld_step1_filtros.tsv')) if (t === 'Y' && /^Dermatology/.test(nombre)) UW.set(Number(id), { nombre, q: Number(q) });
if (UW.size !== 6) aborta(`uWorld: esperaba 6 Systems de Dermatology, hay ${UW.size}`);

// velocidad de vídeo (regla E1 del Step 1): S1 = hasta el D5 · S2-S3 = hasta el D15 · desde el D16
const fechaD = (d) => (U.DIAS.find((x) => x.d === d) || {}).fecha;
const VEL = { s1Hasta: fechaD(5), s23Hasta: fechaD(15) || (U.DIAS.length && U.DIAS.length < 15 ? U.DIAS[U.DIAS.length - 1].fecha : undefined) }; // v6.08: F1 con < 15 filas → fin de la F1 (mar 29-dic)
if (!VEL.s1Hasta || !VEL.s23Hasta) aborta('no encuentro D5/D15 en usmleStep1Daily');
const vel = (fecha) => (fecha <= VEL.s1Hasta ? { v: 1, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' } : fecha <= VEL.s23Hasta ? { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN' } : { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)' });

// v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis, hallazgos 4 · 5 · 8): el atlas DermNet de F1 MEDIDO por SESIÓN (fecha) con la regla fija
//   min = palabras/100 + 0,25′ por imagen (inglés; antes /120) y el alcance de la guía anterior al lote 1-bis (TODAS las imágenes de la página + clínica +
//   diferencial; si falta, su sustituto). Lo que no es del alcance «no forma parte del átomo»; lo que es del átomo y no cabe va a otro día con sus minutos
//   (aOtroDia → lectura «de» en la sesión destino). Solo recuentos y títulos de sección (nada del texto).
const DN = rd('DATA/DERMATOLOGIA/guia/dermnet_medidas_f1.json');
const DN_PPM = 100, DN_IMG = 0.25;
/** Tema (en español) de una sección que queda fuera del átomo, por su título. */
const temaFuera = (t) => (/^Who gets/i.test(t) ? 'epidemiología' : /cause|arise/i.test(t) ? 'causas' : /diagnos|tests? (are|for)|specimen|culture|blood tests|polymerase/i.test(t) ? 'diagnóstico'
  : /treatment|management/i.test(t) ? 'tratamiento' : /outcome|outlook/i.test(t) ? 'pronóstico' : /prevent/i.test(t) ? 'prevención' : /severity/i.test(t) ? 'gravedad'
    : /future/i.test(t) ? 'perspectivas' : /aggravate/i.test(t) ? 'factores agravantes' : /complication/i.test(t) ? 'complicaciones' : /^introduction$/i.test(t) ? 'introducción' : 'otros');
const secDN = (pag, t) => { const P = DN.paginas[pag]; if (!P) aborta(`DermNet: página «${pag}» sin medir`); const s = P.secciones.find((x) => x[0] === t); if (!s) aborta(`DermNet ${pag}: sin sección «${t}»`); return { t, palabras: s[1], imagenes: s[2] }; };
const r2 = (x) => Math.round(x * 100) / 100;
/** k viñetas del proyecto Claude en m minutos (≈5′ cada una) y su razón k × 5 / m (0,85-1,15; 0′ = sin viñetas). */
const vinetas = (m) => { const k = Math.round(m / 5); return { k, razon: m ? (k * 5) / m : 1 }; };
const DERMNET_MEDIDO = {};
for (const [fecha, s] of Object.entries(DN.sesiones)) {
  if (!(fecha <= '2027-01-03')) aborta(`DermNet ${fecha}: fuera de F1`);
  const lecturas = s.lee.map((l) => {
    const tx = l.texto.map((t) => secDN(l.pag, t)); const im = (l.imagenes || []).map((t) => secDN(l.pag, t));
    if (l.de && !(DN.sesiones[l.de] && DN.sesiones[l.de].aOtroDia && DN.sesiones[l.de].aOtroDia.fecha === fecha && DN.sesiones[l.de].aOtroDia.pag === l.pag && JSON.stringify(DN.sesiones[l.de].aOtroDia.texto) === JSON.stringify(l.texto))) aborta(`DermNet ${fecha}: la lectura «de» ${l.de} no coincide con el aOtroDia de esa sesión`);
    return { pag: l.pag, url: DN.paginas[l.pag].url, texto: l.texto, ...(im.length ? { soloImagenes: l.imagenes } : {}), palabras: tx.reduce((a, x) => a + x.palabras, 0), imagenes: tx.reduce((a, x) => a + x.imagenes, 0) + im.reduce((a, x) => a + x.imagenes, 0), ...(l.de ? { de: l.de } : {}) };
  });
  const palabras = lecturas.reduce((a, l) => a + l.palabras, 0), imagenes = lecturas.reduce((a, l) => a + l.imagenes, 0);
  const necesario = r2(palabras / DN_PPM + DN_IMG * imagenes);
  if (!(s.min >= 2 && necesario / s.min >= 0.85 && necesario / s.min <= 1.15)) aborta(`DermNet ${fecha}: ${s.min}′ para ${necesario}′ medidos (fuera de 0,85-1,15)`);
  if (!lecturas.some((l) => l.pag === s.atlas && !l.de)) aborta(`DermNet ${fecha}: no lee su atlas «${s.atlas}»`);
  // fuera del átomo: lo que queda de las páginas propias de hoy (no las que llegan de otro día) que no se lee hoy ni va a otro día
  const otro = s.aOtroDia ? s.aOtroDia.texto.map((t) => secDN(s.aOtroDia.pag, t)) : [];
  let fueraPal = 0; const temas = [];
  for (const l of lecturas.filter((x) => !x.de)) {
    for (const [t, w, img] of DN.paginas[l.pag].secciones) {
      if (l.texto.includes(t) || (s.aOtroDia && s.aOtroDia.pag === l.pag && s.aOtroDia.texto.includes(t))) continue;
      // la página del átomo: TODAS sus imágenes se ven (hoy o el día de destino); una sección con imágenes fuera del alcance → solo sus imágenes
      if (l.pag === s.atlas && img > 0 && !(l.soloImagenes || []).includes(t)) aborta(`DermNet ${fecha}: «${t}» tiene ${img} imágenes y no se ven (el alcance pide todas las de la página)`);
      fueraPal += w; if (w > 0 && !temas.includes(temaFuera(t))) temas.push(temaFuera(t));
    }
  }
  const pagAtlas = DN.paginas[s.atlas]; const imgAtlas = pagAtlas.secciones.reduce((a, x) => a + x[2], 0);
  const imgVistas = lecturas.filter((l) => l.pag === s.atlas && !l.de).reduce((a, l) => a + l.imagenes, 0) + otro.reduce((a, x) => a + x.imagenes, 0);
  if (imgVistas !== imgAtlas) aborta(`DermNet ${fecha}: ${imgVistas} imágenes vistas de ${imgAtlas} de la página «${s.atlas}»`);
  DERMNET_MEDIDO[fecha] = {
    atlas: s.atlas, lecturas, palabras, imagenes, necesario, min: s.min,
    fuera: { palabras: fueraPal, temas },
    ...(s.aOtroDia ? { aOtroDia: { fecha: s.aOtroDia.fecha, pag: s.aOtroDia.pag, texto: s.aOtroDia.texto, palabras: otro.reduce((a, x) => a + x.palabras, 0), imagenes: otro.reduce((a, x) => a + x.imagenes, 0), necesario: r2(otro.reduce((a, x) => a + x.palabras, 0) / DN_PPM + DN_IMG * otro.reduce((a, x) => a + x.imagenes, 0)) } } : {}),
    ...(s.motivo ? { motivo: s.motivo } : {}),
  };
}
for (const [fecha, m] of Object.entries(DERMNET_MEDIDO)) if (m.aOtroDia && !(DERMNET_MEDIDO[m.aOtroDia.fecha] && DERMNET_MEDIDO[m.aOtroDia.fecha].lecturas.some((l) => l.de === fecha))) aborta(`DermNet ${fecha}: su aOtroDia (${m.aOtroDia.fecha}) no lo recibe`);

// v6.09b · lote 1-quater (17-nov-2026, revisión R2 del lote 1-ter · pendientes de U2): reglas fijas que el --check exige en F1 (curadas y por regla)
/** Modo Tutor de uWorld = 90 s de pregunta + 0,85′ de explicación = 2,35′/Q: cada paso «· nQ · Tutor» cuadra en 0,85-1,15 y su texto dice «2,35′/Q». */
const TUTOR_MIN_Q = 2.35;
function pasosTutorMal(pasos) {
  const e = [];
  for (const p of pasos) {
    if (/~3′\/Q/.test(`${p.que} ${p.como}`)) e.push(`«${p.que.slice(0, 50)}…» sigue a ~3′/Q (la regla del Tutor es 2,35′/Q)`);
    const m = /· (\d+)Q · Tutor/.exec(p.que); if (!m || /Status Incorrect/.test(p.que)) continue;
    const r = (+m[1] * TUTOR_MIN_Q) / p.min;
    if (!(r >= 0.85 && r <= 1.15)) e.push(`uWorld ${m[1]}Q Tutor en ${p.min}′ (${m[1]} × 2,35′ / ${p.min} = ${r.toFixed(2)}, fuera de 0,85-1,15)`);
    if (!/2,35′\/Q/.test(p.como)) e.push(`uWorld ${m[1]}Q Tutor: el «cómo» no dice la regla (2,35′/Q)`);
  }
  return e;
}
/** Paso sin medida (pide sesión / «sin medir» / «no medible»): su alcance va ACOTADO al tiempo del paso («acotado a N′», N ≤ min) y dice dónde parar; si mezcla
 *  una parte medida y una acotada («(T′ medidos y acotados: … = M′ … acotado a A′»), T = M + A y T/min en 0,85-1,15. */
function pasosSinMedidaMal(pasos) {
  const e = [];
  for (const p of pasos) {
    const t = `${p.que} ${p.como}`;
    if (!/sin medir|no medible/.test(t)) continue;
    const a = /acotad[oa] a (\d+)′/.exec(t);
    if (!a || +a[1] > p.min) { e.push(`«${p.que.slice(0, 60)}…» sin medida y sin «acotado a N′» (N ≤ ${p.min}′)`); continue; }
    if (!/marca dónde paras/.test(p.como)) e.push(`«${p.que.slice(0, 60)}…» acotado sin decir dónde parar («marca dónde paras»)`);
    const mx = /\((\d+(?:,\d+)?)′ medidos y acotados: .*?= (\d+(?:,\d+)?)′ medidos .*?acotado a (\d+)′/.exec(p.que);
    if (mx) {
      const T = +mx[1].replace(',', '.'), M = +mx[2].replace(',', '.'), A = +mx[3];
      if (Math.abs(T - M - A) > 0.011 || !(T / p.min >= 0.85 && T / p.min <= 1.15)) e.push(`«${p.que.slice(0, 60)}…» ${T}′ (= ${M} + ${A}) en ${p.min}′ (fuera de 0,85-1,15 o suma mal)`);
    } else if (+a[1] !== p.min && !/\(\d+′ de lectura \+ \d+′ de recuerdo\)/.test(p.que)) e.push(`«${p.que.slice(0, 60)}…» acotado a ${a[1]}′ en un paso de ${p.min}′ sin decir qué hace con el resto`);
  }
  return e;
}
/** Total de Unused que F1 (≤ 3-ene-2027) consume por System con el reparto anterior (4Q por sesión de regla + d1 4Q + d2 3Q): el de ahora debe ser el mismo
 *  para que 2027 reciba el mismo stock (Inflammatory 28 − 24 = 4 · Skin and soft tissue infections 18 − 15 = 3). */
const UW_F1_TOTAL = { 1028: 24, 1031: 15 };

const E2 = rd('DATA/MIR/guia_lectura_semana1-2.json');
const E2D = (d) => E2.derma.find((x) => x.d === d) || aborta(`E2 sin derma d${d}`);

// ── contexto del catálogo ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const temaN = new Map(CAT.PICTORIAL_TEMAS.map((x) => [x.t, x.n]));
const usado = new Map();
for (const [d, lista] of Object.entries(CAT.PICTORIAL_ASIGNACION)) {
  const fila = DD.DERMA_DIAS.find((x) => x.d === Number(d));
  if (!fila) aborta(`Pictorial d${d}: no existe la sesión`);
  if (!fila.qbankly || !fila.qbankly.url.startsWith(DD.qa(3626))) aborta(`Pictorial d${d}: la fila no usa el Pictorial Review 4e`);
  if (fila.promir) aborta(`Pictorial d${d}: es sesión ProMIR (el slot es el test del capítulo)`);
  for (const [t, n] of lista) { if (!temaN.has(t)) aborta(`tema Pictorial desconocido «${t}»`); usado.set(t, (usado.get(t) || 0) + n); }
}
for (const [t, n] of usado) if (n > temaN.get(t)) aborta(`Pictorial «${t}»: asignadas ${n} > ${temaN.get(t)} disponibles`);

const C = {
  dia: (d) => DD.DERMA_DIAS.find((x) => x.d === d),
  deck: (b) => ANKI.dermaAnkiDeck(b),
  caso: (pos) => { const c = CASES.casos[pos - 1]; return { titulo: `${c.area}. Case ${c.numero}`, url: casoUrl(c.gbosID), area: CORE[c.area] }; },
  cap,
  bb: (id) => { const v = BB.get(id); if (!v) aborta(`B&B ${id} no está en el catálogo`); return { nombre: v.nombre, dur: mmss(v.s), s: v.s, ruta: v.ruta }; },
  bbMin: (id, fecha) => { const v = BB.get(id); const k = vel(fecha); return { min: Math.round((v.s / 60 / k.v) * k.f), txt: k.txt }; },
  uw: (id) => UW.get(id) || aborta(`uWorld ${id}`),
  temaN: (t) => temaN.get(t),
  pictorialDe: (d) => CAT.PICTORIAL_ASIGNACION[d] || aborta(`d${d} sin tema Pictorial`),
  pmd1Lectura: (d) => { const p = E2D(d).lectura10.planB; if (!p) aborta(`E2 d${d} sin plan B`); if (!(p.min150 > 0)) aborta(`E2 d${d}: el plan B no trae min150 (regenera gen_guia_lectura.js)`); return { secciones: p.t.split('→ ')[1] || p.t, min: p.min, min150: p.min150, palabras: p.palabras, figs: p.figs }; },
  pmd1Test: (d) => { const t = E2D(d).testProMIR; if (!t) aborta(`E2 d${d} sin test ProMIR`); return { nQ: t.nQ, ids: t.preguntas.map((x) => x.promir), citadas: t.citadasProMIR, como: t.como.replace(/ · registro en la app.*$/, '') }; },
  url: { pictorial: DD.qa(3626), casos: DD.cases(1546), pmd1: DD.pm(DD.PM_CAP.c1) },
};

// ── v6.02c F2 (E6): lectura del ÁTOMO en vez del módulo CME (d12) → el módulo pasa a la sesión destino ──────────────────────────
const ESTR = rd('DATA/DERMATOLOGIA/_scrape/accessderma_estructura.json');
const CA_TOC = new Map((ESTR.fitzpatrickColorAtlas9e_TOC.secciones || []).map((x) => [String(x.sid), x.t]));
const CME_DESPLAZADO = {};
for (const [d, v] of Object.entries(CAT.CME_DESPLAZADO || {})) {
  const fila = C.dia(Number(d)); const dst = C.dia(v.destino);
  if (!fila || !dst) aborta(`CME_DESPLAZADO d${d} → d${v.destino}: sesión inexistente`);
  if (!fila.extra) aborta(`CME_DESPLAZADO d${d}: la fila no tiene lectura del átomo (extra)`);
  const m = /bookid=3309&sectionid=(\d+)/.exec(fila.extra.url); if (!m) aborta(`CME_DESPLAZADO d${d}: la lectura del átomo no es del Color Atlas 9e`);
  const t = CA_TOC.get(m[1]); if (!t) aborta(`CME_DESPLAZADO d${d}: sectionid ${m[1]} no está en el índice del Color Atlas 9e`);
  if (!(fila.dermatoscopiaModulo || DD.dermatoscopiaModuloDe(fila.d))) aborta(`CME_DESPLAZADO d${d}: no tiene módulo CME que desplazar`);
  if (!DD.dermatoscopiaModuloDe(dst.d) || DD.dermatoscopiaModuloDe(dst.d).n <= 18) aborta(`CME_DESPLAZADO destino d${dst.d}: no es una sesión de repaso del micro-track`);
  CME_DESPLAZADO[d] = { destino: v.destino, libro: ESTR.fitzpatrickColorAtlas9e_TOC.bookTitle || "Fitzpatrick's Color Atlas and Synopsis of Clinical Dermatology, 9e", capitulo: t, url: fila.extra.url, foco: v.foco, motivo: v.motivo };
}

// ── sesiones curadas ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
const CUR = CAT.curadas(C);
const curada = {};
for (const [d, par] of Object.entries(CUR)) {
  const fila = C.dia(Number(d));
  for (const k of ['planA', 'planB']) {
    const g = par[k];
    const ceros = g.pasos.filter((p) => p.min === 0);
    if (ceros.length > 1) aborta(`d${d} ${k}: más de un paso de relleno (min 0)`);
    if (ceros.length === 1) { const resto = g.totalMin - g.pasos.reduce((s, p) => s + p.min, 0); if (resto < 3) aborta(`d${d} ${k}: el relleno queda en ${resto}′`); ceros[0].min = resto; }
    const e = G.validarGuia(g); if (e.length) aborta(`d${d} ${k}: ${e.join(' · ')}`);
    // v6.09b · lote 1-ter (hallazgo 4): todo paso que declara «(N′ medidos» (DermNet/PMC a 100 palabras/min + 0,25′/figura; ProMIR a 180) cuadra en 0,85-1,15;
    //   un dibujo declarado «(≈N′)» se suma; ninguno dice «~120 palabras/min»
    for (const p of g.pasos) {
      const m = /(\d+(?:[.,]\d+)?)′ medidos/.exec(p.que); if (!m) continue;
      const dib = /dibujo[^(]*\(≈(\d+(?:,\d+)?)′\)/.exec(p.que); const nec = Number(m[1].replace(',', '.')) + (dib ? Number(dib[1].replace(',', '.')) : 0);
      if (!(nec / p.min >= 0.85 && nec / p.min <= 1.15)) aborta(`d${d} ${k}: «${p.que.slice(0, 60)}…» ${p.min}′ para ${nec.toFixed(2)}′ (fuera de 0,85-1,15)`);
    }
    if (g.pasos.some((p) => /120 palabras\/min/.test(`${p.que} ${p.como}`))) aborta(`d${d} ${k}: un paso sigue a ~120 palabras/min (la regla de inglés es 100)`);
    // v6.09b · lote 1-quater (revisión R2): modo Tutor a la regla fija (2,35′/Q) y todo paso sin medida ACOTADO al tiempo (y dicho)
    const e2 = [...pasosTutorMal(g.pasos), ...pasosSinMedidaMal(g.pasos)];
    if (e2.length) aborta(`d${d} ${k}: ${e2.join(' · ')}`);
  }
  curada[d] = { d: Number(d), fecha: fila.fecha, casoIds: fila.casoIds, planA: par.planA, planB: par.planB };
}

// ── emisión ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const J1 = (o) => JSON.stringify(o, null, 1);
const bbDerm = {}; for (const id of BB_IDS) { const v = BB.get(id); bbDerm[id] = { nombre: v.nombre, s: v.s, ruta: v.ruta }; }
const uwDerm = {}; for (const [id, v] of UW) uwDerm[id] = v;
const t3 = E2D(3).testProMIR;
const meta = {
  version: 'v6.02c', generado: '2026-10-18',
  fuente: 'gen_derma_guia.js + guia_catalogo_derma.js · AccessDerma (listado de casos + índices, 18-oct) · Qbankly (B&B + uWorld, 18-oct) · E2 (ProMIR Derma cap. 1)',
  curadas: Object.keys(curada).map(Number),
  velocidad: { ...VEL, regla: 'hasta s1Hasta 1,0× (×1,2 pausas) · hasta s23Hasta 1,25× (×1,15) · después 1,5× (×1,15) — la misma regla que el Step 1 (E1)' },
  pictorial: { total: CAT.PICTORIAL_TEMAS.reduce((s, x) => s + x.n, 0), asignadas: [...usado.values()].reduce((a, b) => a + b, 0) },
  casosOrden: CASES.orden,
};
const out = `/**
 * dermaGuiaDatos.ts — DATOS de la guía Derma «qué · cuánto · cómo» (la lógica y la regla del resto de sesiones: src/lib/dermaGuia.ts).
 * GENERADO por DATA/DERMATOLOGIA/guia/gen_derma_guia.js (decisiones: guia_catalogo_derma.js) — NO editar a mano:
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js           (escribe) · --check (compara + valida todas las sesiones, plan A y B)
 * Fuentes verificadas el 18-oct-2026: listado REAL de «Dermatology Cases for Board Review» (Dermatopathology 1-30 · Medical 31-140 ·
 * Pediatric 141-170 · Surgical 171-200; URL directa por gbosID) · índices de Fitzpatrick 9e, Guidebook, Taylor & Kelly 3e, Dermoscopy
 * Self-Assessment 2e y Dermatologic Surgery · «Create Custom Quiz» del Pictorial Review 4e (34 temas, 381 preguntas) · B&B Step 1 ›
 * Dermatology (duraciones reales) · uWorld Step 1 › Systems de Dermatology (nº reales) · ProMIR Dermatología cap. 1 (medición E2).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): DERMA_CME_DESPLAZADO (d12 lee el capítulo de su átomo; su módulo CME pasa a d42) · DERMNET_DERMOSCOPY
 * (respaldo de Dermoscopedia) · los curados d2/d4 llevan ese respaldo · la lógica (reparto de uWorld del plan B y test PMD común) en dermaGuia.ts.
 */
import type { GuiaBloque } from './guia';

export interface DermaGuiaCurada { d: number; fecha: string; casoIds: number[]; planA: GuiaBloque; planB: GuiaBloque }

export const DERMA_GUIA_DATOS_META = ${J1(meta)};

/** gbosID de cada caso (índice = posición 1-200 − 1) → https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=… */
export const DERMA_CASO_GBOS: number[] = ${JSON.stringify(CASES.casos.map((c) => c.gbosID))};

/** Pictorial Review 4e · «Create Custom Quiz»: tema exacto → nº de preguntas disponibles. */
export const PICTORIAL_TEMAS: Array<{ t: string; n: number }> = ${JSON.stringify(CAT.PICTORIAL_TEMAS)};
/** Tema(s) del Pictorial por sesión (ciclo 1; solo sesiones Pictorial sin test ProMIR) — sin repetir preguntas. */
export const PICTORIAL_ASIGNACION: Record<number, Array<[string, number]>> = ${JSON.stringify(CAT.PICTORIAL_ASIGNACION)};

/** B&B Step 1 · vídeos de Dermatology (+ Fungal Skin Infections y Scleroderma) con duración real (s). */
export const BB_DERM: Record<number, { nombre: string; s: number; ruta: string }> = ${JSON.stringify(bbDerm)};
/** uWorld Step 1 · Test Composer · Systems de Dermatology (nº reales de preguntas). */
export const UW_DERM: Record<number, { nombre: string; q: number }> = ${JSON.stringify(uwDerm)};
/** Cambios de velocidad de vídeo (fechas de D5 y D15 del Step 1). */
export const DERMA_VELOCIDAD = ${JSON.stringify(VEL)};

/** ProMIR Dermatología cap. 1: test del d3 (preguntas MIR citadas en el capítulo, más recientes primero; E2). */
export const DERMA_TEST_PROMIR_D3 = ${JSON.stringify({ nQ: t3.nQ, citadas: t3.citadasProMIR, preguntas: t3.preguntas.map((x) => ({ id: x.promir, url: x.url, seccion: x.seccion })) })};

/** v6.02c F2 (E6): sesiones cuya lectura de 10′ (plan A) es la del ÁTOMO (fila del plan; título del índice) y no el módulo del micro-track de
 *  dermatoscopia, que pasa a la sesión «destino» (repaso del micro-track) — nada se recorta. */
export const DERMA_CME_DESPLAZADO: Record<number, { destino: number; libro: string; capitulo: string; url: string; foco: string; motivo: string }> = ${J1(CME_DESPLAZADO)};
/** Respaldo de Dermoscopedia (falla por HTTPS desde algunas redes): DermNet «Dermoscopy (Dermatoscopy)» (curl 200, 18-oct-2026). */
export const DERMNET_DERMOSCOPY = ${JSON.stringify(CAT.DERMNET_DERMOSCOPY)};
/** v6.09b · lote 1-ter: atlas DermNet de F1 MEDIDO el ${DN._meta.medido} POR SESIÓN (fecha) (DATA/DERMATOLOGIA/guia/dermnet_medidas_f1.json): lecturas (página +
 *  secciones), palabras de prosa, imágenes y minutos = palabras/100 + 0,25′ por imagen; «fuera» = lo que no forma parte del átomo; «aOtroDia» = lo del átomo que
 *  no cabe hoy, con su fecha (la sesión destino lo lee con «de»). Lo usa el paso «DermNet · atlas del átomo» del plan B de F1 (dermaGuia.ts, ≤ LOTE1_HASTA). */
export interface DermnetLectura { pag: string; url: string; texto: string[]; soloImagenes?: string[]; palabras: number; imagenes: number; de?: string }
export const DERMNET_MEDIDO: Record<string, { atlas: string; lecturas: DermnetLectura[]; palabras: number; imagenes: number; necesario: number; min: number; fuera: { palabras: number; temas: string[] }; aOtroDia?: { fecha: string; pag: string; texto: string[]; palabras: number; imagenes: number; necesario: number }; motivo?: string }> = ${J1(DERMNET_MEDIDO)};

/** Sesiones CURADAS (d1-d5): plan A (AccessDerma) y plan B (acceso remoto caducado), 13:30–14:15. */
export const DERMA_GUIA_CURADA: Record<number, DermaGuiaCurada> = ${J1(curada)};
`;

// ── validación de TODAS las sesiones con la lógica real (dermaGuia.ts) ───────────────────────────────────────────────────────────────
function validarTodo(tsDatos) {
  const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
  const abs = path.join(ROOT, 'src', 'lib', 'dermaGuiaDatos.ts');
  const c2 = new Map(); const mod = { exports: {} }; c2.set(abs, mod);
  new Function('exports', 'module', 'require', ts.transpileModule(tsDatos, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText)(mod.exports, mod, () => ({}));
  const DG = cargarModuloTS(path.join('src', 'lib', 'dermaGuia.ts'), c2);
  const D2 = cargarModuloTS(path.join('src', 'lib', 'dermaCiclo2.ts'), c2);
  const GG = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), c2);
  const errores = []; let n = 0;
  for (const dia of D2.DERMA_DIAS_TODOS) {
    for (const opts of [{}, { ini: '12:00', minutos: 30 }]) {
      const par = DG.dermaGuiaPar(dia, opts);
      for (const k of ['planA', 'planB']) {
        const e = GG.validarGuia(par[k]); n++;
        if (e.length) errores.push(`d${dia.d} ${dia.fecha} ${k} ${opts.minutos || 45}′: ${e.join(' · ')}`);
      }
    }
  }
  // v6.02c F2 (E6): (1) reparto de uWorld sin pasarse del stock · (2) test ProMIR PMD idéntico en plan A y plan B
  const F6 = cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'), c2);
  const quedan = new Map(Object.entries(uwDerm).map(([id, x]) => [Number(id), x.q]));
  const uwRe = /uWorld Step 1 · System «([^»]+)» · Unused · (\d+)Q/;
  let agotadas = 0; const pmd = [];
  for (const dia of [...D2.DERMA_DIAS_TODOS].sort((a, b) => (a.fecha < b.fecha ? -1 : 1))) {
    const min = F6.faseV6(dia.fecha) === 'F4' ? 30 : 45;
    const par = DG.dermaGuiaPar(dia, min === 30 ? { minutos: 30 } : {});
    for (const p of par.planB.pasos) {
      const r = uwRe.exec(p.que); if (!r) continue;
      const id = Number(Object.entries(uwDerm).find(([, x]) => x.nombre === r[1])?.[0]); const q = quedan.get(id) ?? 0; const k = Number(r[2]);
      if (k > q) errores.push(`d${dia.d} ${dia.fecha} plan B: uWorld «${r[1]}» pide ${k}Q y solo quedan ${q} (stock ${uwDerm[id] ? uwDerm[id].q : '?'})`);
      quedan.set(id, q - k);
    }
    if (par.planB.pasos.some((p) => /relleno: uWorld «/.test(p.que))) agotadas++;
    if (dia.promir) {
      const tA = par.planA.pasos.find((p) => /ProMIR Dermatología › cap\. \d+ .*· TEST \d+Q/.test(p.que));
      const tB = par.planB.pasos.find((p) => /ProMIR Dermatología › cap\. \d+ .*· TEST \d+Q/.test(p.que));
      if (tA && tB) { const qa = /TEST (\d+)Q/.exec(tA.que)[1], qb = /TEST (\d+)Q/.exec(tB.que)[1]; if (qa !== qb || tA.min !== tB.min) errores.push(`d${dia.d} ${dia.fecha}: test ProMIR plan A ${qa}Q/${tA.min}′ ≠ plan B ${qb}Q/${tB.min}′`); else pmd.push(`d${dia.d} ${qa}Q`); }
    }
  }
  // v6.09b · lote 1-bis / 1-ter: en F1 (≤ 3-ene-2027) cada atlas DermNet del plan B (45′) está medido POR FECHA (regla /100 + 0,25′/imagen) y lleva sus
  //   minutos; el proyecto Claude (variable de ajuste) tiene 0′ o k = round(min/5) viñetas con k × 5 / min en 0,85-1,15 y su texto dice k y los minutos
  //   reales por viñeta; ningún paso dice «no hoy»; lo que va a otro día lleva su fecha en los primeros 100 caracteres del «cómo» (corte del Calendar: 110)
  //   y la sesión destino nombra el origen; el total de la franja es 45′.
  let dnF1 = 0; const usadasDN = new Set();
  for (const dia of D2.DERMA_DIAS_TODOS.filter((x) => x.fecha <= '2027-01-03' && x.atlasUrl && x.atlasUrl.startsWith('https://dermnetnz.org/'))) {
    const c = curada[dia.d]; if (c && c.fecha === dia.fecha) continue; // curadas d1-d5: su guion propio
    const slug = dia.atlasUrl.replace('https://dermnetnz.org/topics/', ''); const m = DERMNET_MEDIDO[dia.fecha];
    if (!m || m.atlas !== slug) { errores.push(`d${dia.d} ${dia.fecha}: atlas DermNet «${slug}» de F1 sin medir para esta fecha (falta en dermnet_medidas_f1.json › sesiones)`); continue; }
    usadasDN.add(dia.fecha);
    const g = DG.dermaGuiaPar(dia).planB; const tag = `d${dia.d} ${dia.fecha}`;
    const p = g.pasos.find((x) => /^DermNet · atlas del átomo/.test(x.que));
    if (!p || p.min !== m.min) { errores.push(`${tag}: atlas DermNet «${slug}» ${p ? `con ${p.min}′` : 'no aparece en el plan B'} (medido: ${m.min}′)`); continue; }
    if (g.pasos.reduce((a, x) => a + x.min, 0) !== 45) errores.push(`${tag}: el plan B suma ${g.pasos.reduce((a, x) => a + x.min, 0)}′ (≠ 45′)`);
    if (g.pasos.some((x) => /no hoy/.test(`${x.que} ${x.como}`))) errores.push(`${tag}: un paso dice «no hoy» (destino sin fecha)`);
    if (!new RegExp(`\\(${String(m.necesario).replace('.', ',')}′ medidos`).test(p.que)) errores.push(`${tag}: el paso DermNet no declara sus «(${m.necesario}′ medidos»`);
    const cl = g.pasos.find((x) => x.que.startsWith('Proyecto Claude'));
    const sumaOtros = g.pasos.filter((x) => x !== cl).reduce((a, x) => a + x.min, 0);
    if (!cl && sumaOtros !== 45) errores.push(`${tag}: sin proyecto Claude y la franja no cuadra`);
    if (cl) {
      const v = vinetas(cl.min);
      if (!(v.k >= 1 && v.razon >= 0.85 && v.razon <= 1.15)) errores.push(`${tag}: proyecto Claude ${cl.min}′ ≈ ${v.k} viñetas (${v.k} × 5 / ${cl.min} = ${v.razon.toFixed(2)}, fuera de 0,85-1,15)`);
      const r = /hoy (\d+)′ ≈ (\d+) viñetas? \(≈([\d,]+)′ cada una\)/.exec(cl.que);
      if (!r || Number(r[1]) !== cl.min || Number(r[2]) !== v.k || Math.abs(Number(r[3].replace(',', '.')) - cl.min / v.k) > 0.051) errores.push(`${tag}: el texto del proyecto Claude no dice «hoy ${cl.min}′ ≈ ${v.k} viñetas (≈${(cl.min / v.k).toFixed(1).replace('.', ',')}′ cada una)»`);
    }
    if (m.aOtroDia) {
      const f = m.aOtroDia.fecha; const dd = new Date(f + 'T12:00:00Z'); const etq = `${['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][dd.getUTCDay()]} ${dd.getUTCDate()}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][dd.getUTCMonth()]}`;
      if (!(p.como.indexOf(etq) >= 0 && p.como.indexOf(etq) + etq.length <= 100)) errores.push(`${tag}: el destino «${etq}» no está en los primeros 100 caracteres del «cómo»`);
      const dst = D2.DERMA_DIAS_TODOS.find((x) => x.fecha === f); const pd = dst && DG.dermaGuiaPar(dst).planB.pasos.find((x) => /^DermNet · atlas del átomo/.test(x.que));
      if (!pd || !pd.que.includes(m.aOtroDia.texto[0])) errores.push(`${tag}: la sesión destino (${f}) no lee lo que le llega`);
    }
    dnF1++;
  }
  for (const f of Object.keys(DERMNET_MEDIDO)) if (!usadasDN.has(f)) errores.push(`DermNet ${f}: medida sin sesión Derma de F1 con ese atlas (fecha o atlas desplazados)`);
  // v6.09b · lote 1-quater: en TODA sesión Derma de F1 (curadas y por regla, plan B de 45′) el Tutor va a 2,35′/Q, ningún paso sin medida queda sin acotar,
  //   y el reparto de uWorld de F1 consume por System lo mismo que antes (2027 recibe el mismo stock)
  let nTutorF1 = 0;
  for (const dia of D2.DERMA_DIAS_TODOS.filter((x) => x.fecha <= '2027-01-03')) {
    const g = DG.dermaGuiaPar(dia).planB; const tag = `d${dia.d} ${dia.fecha}`;
    for (const e of [...pasosTutorMal(g.pasos), ...pasosSinMedidaMal(g.pasos)]) errores.push(`${tag}: ${e}`);
    nTutorF1 += g.pasos.filter((p) => /· \d+Q · Tutor/.test(p.que)).length;
  }
  const f1Uw = {}; for (const [f, a] of DG.dermaUwAsignacion()) if (f <= '2027-01-03') f1Uw[a.uw] = (f1Uw[a.uw] || 0) + a.toma;
  for (const [uw, n] of Object.entries(UW_F1_TOTAL)) if (f1Uw[uw] !== n) errores.push(`uWorld ${uwDerm[uw].nombre}: F1 consume ${f1Uw[uw] || 0}Q y debe consumir ${n} (si no, cambia el stock de 2027)`);
  for (const uw of Object.keys(f1Uw)) if (!(uw in UW_F1_TOTAL)) errores.push(`uWorld ${uwDerm[uw].nombre}: F1 lo usa y no está en UW_F1_TOTAL`);
  const resumen = { agotadas, quedan: Object.fromEntries([...quedan].map(([id, q]) => [uwDerm[id].nombre.replace(/^Dermatology \(|\)$/g, ''), q])), pmd: pmd.length, dnF1, nTutorF1 };
  return { errores, n, resumen };
}
const v = validarTodo(out);
if (v.errores.length) { console.error(v.errores.slice(0, 40).join('\n')); aborta(`${v.errores.length} bloque(s) no cuadran`); }
const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
if (CHECK) {
  if (actual !== out) { console.error('✗ src/lib/dermaGuiaDatos.ts NO está al día → node DATA/DERMATOLOGIA/guia/gen_derma_guia.js'); process.exit(1); }
  console.log(`✓ dermaGuiaDatos.ts al día · ${v.n} bloques validados (103 sesiones × plan A/B × 45′/30′) · curadas d${meta.curadas.join(',d')} · Pictorial ${meta.pictorial.asignadas}/${meta.pictorial.total} · uWorld del plan B sin pasarse del stock (${v.resumen.agotadas} sesiones con relleno ProMIR; quedan ${JSON.stringify(v.resumen.quedan)}) · test ProMIR igual en A y B en ${v.resumen.pmd} sesiones PMD · ${v.resumen.dnF1} atlas DermNet de F1 medidos · ${v.resumen.nTutorF1} pasos uWorld Tutor de F1 a 2,35′/Q (mismo total por System que antes)`);
} else {
  fs.writeFileSync(OUT, out);
  console.log(`✓ escrito src/lib/dermaGuiaDatos.ts (${(out.length / 1024).toFixed(1)} KB) · ${v.n} bloques validados · curadas d${meta.curadas.join(',d')} · Pictorial ${meta.pictorial.asignadas}/${meta.pictorial.total}`);
}
