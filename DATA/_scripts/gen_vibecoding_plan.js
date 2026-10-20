// gen_vibecoding_plan.js — GENERA src/lib/vibecodingPlan.ts (motor día-a-día del VIBECODING 04:15-05:00)
// y DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md (doc legible con fechas).
//
// Fuente única: DATA/SYNAPSE/vibecoding_proyectos.json
//   · proyectos: 12 proyectos S1-S12 (backlog REAL, ordenados por riesgo para el Step 1) · 5 pasos (5 hábiles) cada uno.
//   · taper:     8 semanas S13-S20 (v5.10-b, 12-sep-2026): S13-S16 mantenimiento ≤15'/día (flag deload) ·
//                S17-S20 deload total (journal 5' + audio) · S20 = semana del examen (v5.20: mié 17 → vie 19-feb, D93-D95; finde libre y examen lun 22-feb · v5.19: mar 16 → jue 18-feb, D93-D95; examen vie 19-feb · v5.18: lun 15 → mié 17-feb · v5.17: jue 11 → lun 15-feb; v5.16: lun-mié).
//   · _meta:     freno 04:55 · convención de commit [S<n>] · verificación mecánica (verify_vibecoding.js).
// Calendario: START = argv[2] (YYYY-MM-DD, default 2026-10-21 = D1 v6.03; v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07 · v5.19: 2026-10-06 · v5.18: 2026-10-05 · v5.17: 2026-10-01) · días HÁBILES L-V
// (salta sáb/dom y los SKIP de _fechas_v6.json: 25-dic/31-dic/1-ene en el rango, misma regla que remap_inicio.js).
//   · S1-S12: 5 días hábiles por proyecto (paso 1 definir · 2-3 construir · 4 verificar · 5 doc+commit; v5.20: bloques mié → mar, S12 mié 23 → mié 30-dic por el festivo del vie 25-dic; v5.19: bloques mar → lun, S12 mar 22 → mar 29-dic; v5.18: lun → vie, S12 lun 21 → lun 28-dic; v5.17: jue → mié) →
//     60 días · sábado PC (SYNAPSE 15:00-17:00) = SHIP del proyecto (sábado siguiente al 5º día) · domingo = Feynman.
//   · S13-S20: (hasta v5.10) semanas de CALENDARIO (lun→vie) desde el lunes siguiente al fin de S12, con los feriados fuera
//     (desde v5.11: bloques secuenciales de pasos.length hábiles; v5.20: el último termina el D95 del Step 1 = vie 19-feb-2027; finde libre; examen lun 22-feb · v5.19: jue 18-feb / vie 19-feb · v5.18: mié 17-feb / jue 18-feb · v5.17: lun 15-feb / mar 16-feb).
//     Con cualquier D1 (v5.20: mié 7-oct; v5.19: mar 6-oct; v5.18: lun 5-oct; v5.17: jue 1-oct), el día d del vibecoding coincide con el D# del Step 1 (95 días).
// Ship log: si existe DATA/SYNAPSE/_vibecoding_ship.json (escrito por verify_vibecoding.js) se hornea en el TS
// (VIBE_SHIP_LOG) para que la app muestre el último verify aunque no haya localStorage.
//
// v6.00 (6-oct-2026 · V6_ESPEC §E): el Step 1 ya NO es en febrero (examen objetivo lun 27-sep-2027; pausa del 31-dic al 15-mar por la
// intensiva ENCAPS). Las FECHAS del vibecoding no cambian (S1-S12 mié 7-oct → mié 30-dic + taper S13-S20 lun 4-ene → vie 19-feb): el
// fin del taper sigue siendo el 95.º hábil desde START (= vie 19-feb-2027; en v5.20 coincidía con el D95 del Step 1). Solo cambian los
// TEXTOS: taper S13-S20 «por el ENCAPS» (DATA/SYNAPSE/vibecoding_proyectos.json) y esta cabecera. SKIP desde _fechas_v6.json
// (jue 25 / vie 26-mar quedan fuera del rango, así que las fechas son idénticas).
// v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct; no se estudió mié 7 → vie 9-oct): START = 2026-10-12 → S1-S12 lun 12-oct → mié 6-ene-2027
// (bloques lun → vie; S11 lun 21 → lun 28-dic por el feriado del vie 25-dic; S12 mar 29-dic → mié 6-ene) · taper S13-S20 jue 7-ene → MIÉ
// 24-FEB-2027 (= 95.º hábil desde START: el fin se AMPLÍA +3 hábiles, nada se recorta). SHIP S1 sáb 17-oct … S11 sáb 2-ene · S12 sáb 9-ene;
// S15 y S16 cierran la misma semana (SHIP sáb 30-ene): el PC opcional de S15 va ese sábado y el de S16, PROPIO, el sáb 6-feb (gen_synapse_plan.js,
// PC_DESPLAZADOS; aquí `pcSab`, al principio solo para el .md y desde el ajuste de abajo también en el .ts · nada se fusiona). Textos con fecha del catálogo (taper y _meta) re-escritos a v6.01 en
// DATA/SYNAPSE/vibecoding_proyectos.json; `semanaStep1` del taper sin el prefijo «S<n> · …» duplicado (semanaStep1Txt).
// v6.01 (10-oct-2026 · card del vibecoding = bloque PC del SYNAPSE): `pcSab` (sábado del PC en el SYNAPSE) se EMITE en el .ts para proyectos
// (= ship) y taper (S16 → sáb 6-feb; `ship` NO cambia: sigue siendo el sábado tras su último hábil y marca la ventana de cada entrada) +
// vibePCSabado(fecha) = los bloques PC del SYNAPSE de ese sábado con el MISMO orden y la MISMA regla que gen_synapse_plan.js (desplazados del
// taper → la entrada que hace SHIP ese sábado → si ninguna, la que está en curso = «avance»). vibeProyectoEnFecha / vibeTaperEnFecha la usan en
// sábado y, en L-V, devuelven la entrada del DÍA (los bloques del taper ya no son lun → vie y las ventanas ini → ship+1 se solapaban: el jue
// 14-ene la card decía S13 con el paso de S14). Corrige la card frente al SYNAPSE en sáb 26-dic (avance S11, no SHIP), sáb 2-ene (SHIP S11, no
// S12), sáb 9-ene (SHIP S12, no taper S13) y sáb 6-feb (PC propio de S16 + PC de S17). gen_synapse_plan.js comprueba que su PC = pcSab.
// v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct; no se estudió lun 12 → vie 16-oct): START = 2026-10-19 (+5 hábiles = una semana exacta) →
// S1-S12 lun 19-oct → mié 13-ene-2027 (bloques lun → vie; S10 lun 21 → lun 28-dic por el feriado del vie 25-dic; S11 mar 29-dic → mié 6-ene;
// S12 jue 7 → mié 13-ene, dentro de la intensiva ENCAPS) · taper S13-S20 jue 14-ene → MIÉ 3-MAR-2027 (= 95.º hábil desde START: el fin se
// AMPLÍA +5 hábiles, nada se recorta). SHIP S1 sáb 24-oct … S9 sáb 19-dic · sáb 26-dic = avance de S10 · S10 sáb 2-ene · S11 sáb 9-ene · S12
// sáb 16-ene; S15 (jue 28-ene → mar 2-feb) y S16 (mié 3 → vie 5-feb) cierran la misma semana → PC de S15 el sáb 6-feb y el de S16, propio,
// el sáb 13-feb (pcSab; junto al PC 0' de S17). Textos con fecha del catálogo (taper, proyectos S4/S5/S7/S9 y _meta) re-escritos a v6.02 en
// DATA/SYNAPSE/vibecoding_proyectos.json (revisiones S04_2026-11-14 · S05_2026-11-21 · S13_2027-01-16, comprobadas con gen_revision_semanal.js --dry-run).
// v6.02 (17-oct): el comentario generado del .ts «Semana DELOAD (S7 = post-NBME 26)» era falso desde v6.01 (S7 = lun 30-nov → vie 4-dic en
// v6.02; la deload post-NBME 26 = lun 23 → vie 27-nov = S6). Ahora dice la verdad y sale del cálculo: el flag `deload` sigue en S7 por el
// orden v5.10-b, sin mover contenido ni minutos (precedente v6.01), con el rango de S7 de este START; las semanas deload del Step 1 las fija
// homeBriefing.DELOAD_SEMANAS (v6.02: lun 23-nov y lun 28-dic). Solo cambia ese comentario: datos idénticos.
// v6.02 (17-oct, verificación final): la cabecera del .md decía «S1-S12 · lun 19-oct → mié 13-ene 2026» (el año salía de la PRIMERA fecha:
// S12 cierra en 2027) y conservaba el texto v5.10-b «N días = los mismos 95 del Step 1 (d == D#)», falso desde v6.00 (el d del vibecoding es
// su propio día L-V; ya no es el D del Step 1). Ahora cada extremo lleva su año y el texto dice la regla vigente. Solo cambia el .md: datos idénticos.
// v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20-oct sin estudio, orden de Joseph «simplemente corre, no comprimas»):
// START = 2026-10-21 (+2 hábiles) → S1-S12 mié 21-oct → vie 15-ene-2027 (bloques mié → mar hasta S9; S10 mié 23 → mié 30-dic por el feriado
// del vie 25-dic; S11 lun 4 → vie 8-ene y S12 lun 11 → vie 15-ene, ya dentro de la intensiva ENCAPS) · taper S13-S20 lun 18-ene → VIE 5-MAR-2027
// (= 95.º hábil desde START: el fin se AMPLÍA +2 hábiles, nada se recorta). S1 = mié 21 → mar 27-oct: NO cabe en la semana del D1 y NO se
// comprime → el sáb 24-oct es AVANCE de S1 (SYNAPSE: «Avance del proyecto S1 — SHIP el 2026-10-31») y el SHIP S1 es el sáb 31-oct; S2 sáb 7-nov …
// S9 sáb 26-dic · S10 sáb 2-ene · S11 sáb 9-ene · S12 sáb 16-ene. S15 (lun 1 → jue 4-feb) y S16 (vie 5 → mar 9-feb) ya no cierran la misma
// semana (PC sáb 6-feb y sáb 13-feb: nada se desplaza). S19 (mié 24-feb → mar 2-mar) y S20 (mié 3 → vie 5-mar) sí cierran la misma semana
// (SHIP sáb 6-mar), pero el sábado siguiente (13-mar) es día PROTEGIDO (D-1 del ENCAPS) → REGLA NUEVA: un PC no se desplaza a un día
// protegido; pcSab = ship (los dos van después del SYNAPSE, que cierra el lun 1-mar: «PC = no» en el catálogo, nada se pierde).
// Textos con fecha del catálogo (_meta, proyectos S4/S5/S7/S9 y taper) re-escritos a v6.03 en DATA/SYNAPSE/vibecoding_proyectos.json
// (revisiones S05_2026-11-21 · S06_2026-11-28 · S14_2027-01-23, mismo cálculo que gen_revision_semanal.js: S1 = semana del lun 19-oct).
// Uso:  node DATA/_scripts/gen_vibecoding_plan.js 2026-10-21   (v6.03; v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07; v5.19: 2026-10-06 · v5.18: 2026-10-05)
// Pipeline de corrimiento: tras remap_inicio.js <fecha>, correr también este script con la misma fecha
// (igual que gen_synapse_plan.js / gen_aurum_plan.js). Determinista: sin Date.now() ni aleatoriedad.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const START = process.argv[2] || '2026-10-21'; // v6.03 (v6.02: 2026-10-19 · v6.01: 2026-10-12 · v6.00 = v5.20: 2026-10-07 · v5.19: 2026-10-06 · v5.18: 2026-10-05 · v5.17: 2026-10-01)
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);
// v6.00: último día del taper = 95.º hábil desde START (v6.03: vie 5-mar-2027 con START=2026-10-21 · v6.02: mié 3-mar-2027 con START=2026-10-19 · v6.01: mié 24-feb-2027 con START=2026-10-12 · v6.00: vie 19-feb-2027 con START=2026-10-07); hasta v5.20 era el D95 del Step 1 (vie 19-feb-2027 con START=2026-10-07 · v5.19: jue 18-feb con START=2026-10-06 · v5.18: mié 17-feb con START=2026-10-05; v5.17: lun 15-feb con START=2026-10-01). Se calcula, no se fija a mano:
// 95 días hábiles desde START con la misma regla de feriados.
const DIAS_STEP1 = 95; // v6.00: nombre histórico — nº de hábiles del vibecoding (95), ya no coincide con el Step 1 (tramo 1 D1-D60 + tramo 2 T1-T158)

const CAT = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/vibecoding_proyectos.json'), 'utf8'));
const P = CAT.proyectos;
const T = CAT.taper || [];
if (P.length !== 12) throw new Error('El catálogo debe tener 12 proyectos, hay ' + P.length);
P.forEach((p, i) => {
  if (p.s !== i + 1) throw new Error('Proyecto fuera de orden: ' + p.id);
  if (!Array.isArray(p.pasos) || p.pasos.length !== 5) throw new Error('Cada proyecto necesita 5 pasos (L-V): ' + p.id);
  if (!p.docs || !p.docs.length) throw new Error('Proyecto sin docs: ' + p.id);
  for (const d of p.docs) if (!/^https:\/\//.test(d.url)) throw new Error('URL no https en ' + p.id + ': ' + d.url);
  if (!Array.isArray(p.aceptacion) || p.aceptacion.length !== 4) throw new Error('Cada proyecto necesita 4 criterios de aceptación: ' + p.id);
  if (!Array.isArray(p.verificacion) || p.verificacion.length !== p.aceptacion.length) throw new Error('verificacion[] debe tener 1 comprobación por criterio: ' + p.id);
  for (const v of p.verificacion) if (!['git', 'test', 'url', 'supabase', 'fichero', 'manual'].includes(v.tipo)) throw new Error('tipo de verificación desconocido en ' + p.id + ': ' + v.tipo);
  if (!p.repo_git) throw new Error('Proyecto sin repo_git (para git log --grep [S<n>]): ' + p.id);
});
if (T.length !== 8) throw new Error('El taper debe tener 8 semanas (S13-S20), hay ' + T.length);
T.forEach((t, i) => {
  if (t.s !== 13 + i) throw new Error('Taper fuera de orden: ' + t.id);
  if (!['mantenimiento', 'deload'].includes(t.tipo)) throw new Error('tipo de taper desconocido: ' + t.id);
  if (!Array.isArray(t.pasos) || !t.pasos.length) throw new Error('Taper sin pasos: ' + t.id);
});

// ─── calendario (idéntico en espíritu a remap_inicio.js: L-V + feriados fijos fuera) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = (s) => fromISO(s).getUTCDay();
const SKIP_FIJOS = new Set(require('./gen_fechas_v6').cargarFechasV6().skip); // v6.00: SKIP de _fechas_v6.json (v5.20: 25-dic/31-dic/1-ene)
const isHabil = (s) => dow(s) !== 0 && dow(s) !== 6 && !SKIP_FIJOS.has(s);
// 95.º hábil desde START (misma regla de hábiles): último día del taper (v5.20: = D95 del Step 1)
const finStep1 = (() => { let c = START, n = 0; while (true) { if (isHabil(c)) { n++; if (n === DIAS_STEP1) return c; } c = addDays(c, 1); } })();

// v5.17 (30-sep-2026): el tipo va con el PASO (k), no con el día de la semana — con el D1 en jueves los bloques de 5 hábiles
// corren jue→mié y un tipo por weekday desalinearía el paso 1 («Inventario…») con «verificar». Con D1 en lunes es idéntico al anterior.
const TIPO_POR_K = ['definir', 'construir', 'construir', 'verificar', 'ship-prep'];
const TIPO_LABEL = {
  definir: "5' objetivo → spec del día", construir: 'construir con Claude Code', verificar: 'verificar en vivo (test/URL/dato)', 'ship-prep': 'doc + commit + preparar SHIP',
  sensores: "sensores verdes (≤15')", mejora: "1 mejora pequeña (≤15')", lectura: 'journal + lectura de docs', retro: 'retro semanal', journal: "journal 5' + audio (deload total)",
};
const tipoTaper = (paso) => {
  if (/^Sensores/i.test(paso)) return 'sensores';
  if (/^1 mejora/i.test(paso)) return 'mejora';
  if (/^Journal 5' \+ lectura/i.test(paso)) return 'lectura';
  if (/^Retro/i.test(paso)) return 'retro';
  if (/^Commit/i.test(paso)) return 'ship-prep';
  return 'journal';
};

// ─── S1-S12: 5 días hábiles por proyecto ───
const dias = [];
let cur = START, d = 0;
for (const p of P) {
  for (let k = 0; k < 5; k++) {
    while (!isHabil(cur)) cur = addDays(cur, 1);
    d++;
    const wd = WD[dow(cur)];
    const tipo = TIPO_POR_K[k];
    // deload: días 2 y 4 de la semana a 15' (el catálogo ya lo refleja en el texto del paso)
    const min = p.deload ? (k === 0 || k === 2 ? 45 : 15) : 45;
    dias.push({ d, fecha: cur, wd, semana: p.s, proyecto: p.id, k: k + 1, tipo, min, paso: p.pasos[k], deload: !!p.deload });
    cur = addDays(cur, 1);
  }
}
if (dias.length !== 60) throw new Error('Deben salir 60 días S1-S12, salieron ' + dias.length);
const finS12 = dias[dias.length - 1].fecha;
// sábado de SHIP de cada semana = el sábado siguiente al 5º día del proyecto
const sabadoShip = (fechaVie) => { let s = fechaVie; while (dow(s) !== 6) s = addDays(s, 1); return s; };
const semanas = P.map((p) => {
  const ds = dias.filter((x) => x.semana === p.s);
  return { s: p.s, id: p.id, ini: ds[0].fecha, fin: ds[ds.length - 1].fecha, ship: sabadoShip(ds[ds.length - 1].fecha) };
});

// ─── S13-S20: bloques SECUENCIALES de pasos.length días hábiles a partir del hábil siguiente a S12, tope = D95 ───
// v5.11 (14-sep-2026): antes eran semanas de calendario (lun→vie); con D1 en martes las semanas de proyecto ya no
// coinciden con las de calendario, así que el taper sigue la misma regla que S1-S12: cada entrada del catálogo ocupa
// tantos hábiles consecutivos como pasos trae (5·5·4·3·5·5·5·3 = 35 = hábiles que quedan hasta D95). Nada se fusiona:
// todos los pasos corren +1 hábil respecto a la v5.10 y el último cae en el 95.º hábil (= último día del plan, vie 19-feb; v6.00: dentro de la intensiva ENCAPS).
let curT = addDays(finS12, 1);
const taperSemanas = [];
for (const t of T) {
  const ds = [];
  while (ds.length < t.pasos.length) { if (isHabil(curT) && curT <= finStep1) ds.push(curT); else if (curT > finStep1) break; curT = addDays(curT, 1); }
  if (ds.length !== t.pasos.length) throw new Error(`Taper ${t.id}: quedan ${ds.length} días hábiles hasta D95 (${finStep1}) pero el catálogo trae ${t.pasos.length} pasos`);
  ds.forEach((f, k) => {
    d++;
    dias.push({ d, fecha: f, wd: WD[dow(f)], semana: t.s, proyecto: t.id, k: k + 1, tipo: tipoTaper(t.pasos[k]), min: t.minDia, paso: t.pasos[k], deload: true });
  });
  taperSemanas.push({ s: t.s, id: t.id, ini: ds[0], fin: ds[ds.length - 1], ship: sabadoShip(ds[ds.length - 1]) });
}
if (dias.length !== DIAS_STEP1) throw new Error(`Deben salir ${DIAS_STEP1} días en total, salieron ${dias.length}`);
if (dias[dias.length - 1].fecha !== finStep1) throw new Error('El último día del taper debe ser el 95.º hábil desde START: ' + finStep1);

// v6.01 (10-oct-2026): sábado del PC opcional de cada semana del taper en el SYNAPSE (gen_synapse_plan.js, PC_DESPLAZADOS): el de su SHIP,
// salvo que la entrada anterior cierre el MISMO sábado (v6.03: ninguna dentro del SYNAPSE; S19 y S20 cierran el sáb 6-mar, ver abajo · v6.02: S15 mar 2-feb y S16 vie 5-feb → SHIP sáb 6-feb · v6.01: S15 mar 26-ene y S16 vie 29-ene → SHIP sáb 30-ene) → la 2.ª lleva su PC propio
// el sábado siguiente (S16 → sáb 13-feb en v6.02 · sáb 6-feb en v6.01). El campo `ship` del .ts NO cambia (vibeTaperEnFecha lo usa para la ventana L-V + finde de cada semana).
// v6.01 (10-oct): `pcSab` se emite también en el .ts (VibeProyecto/VibeTaper) y lo leen vibePCSabado() y la guarda de gen_synapse_plan.js.
// Proyectos S1-S12: pcSab = ship (dos proyectos no pueden compartir sábado de SHIP: solo el taper se desplaza, igual que en gen_synapse_plan.js).
semanas.forEach((w, i) => {
  if (i && semanas[i - 1].ship === w.ship) throw new Error(`S${w.s} comparte sábado de SHIP (${w.ship}) con S${semanas[i - 1].s}: solo el taper se desplaza`);
  w.pcSab = w.ship;
});
// v6.03 (20-oct-2026): un PC NO se desplaza a un día PROTEGIDO de _fechas_v6.json (S20 → sáb 13-mar = D-1 del ENCAPS): pcSab = ship. Hoy solo
// afecta a S20, que (como S19) cae después del SYNAPSE y no tiene PC («PC = no»): gen_synapse_plan.js no desplaza los SHIP > FIN_PLAN.
const PROTEGIDOS = new Set(require('./gen_fechas_v6').cargarFechasV6().protegidos.map((x) => x.fecha));
taperSemanas.forEach((w, i) => {
  const prev = i ? taperSemanas[i - 1] : semanas[semanas.length - 1];
  const sig = addDays(w.ship, 7);
  const desplaza = !!prev && prev.ship === w.ship && !PROTEGIDOS.has(sig);
  w.pcSab = desplaza ? sig : w.ship;
  w.pcCon = desplaza ? prev.s : null;
});

// v6.01: `semana_step1` del taper → `semanaStep1` del .ts. Cada corrimiento antepone «S<n> · <rango nuevo> (vX.YY: …)» al texto anterior,
// que ya empezaba por «S<n> · …» → el .ts salía con el prefijo duplicado («S13 · jue 7 → mié 13-ene (v6.01: …) · S13 · lun 4 → vie 8-ene
// (v6.00: …)»). Aquí el prefijo S<n> queda UNA vez (el vigente) y los anteriores pasan a historial «vX.YY: <rango> (…)», como v5.19/v5.18.
// Guarda: el rango vigente del texto debe ser el calculado (ini → fin); si no, el catálogo está desfasado y se aborta.
const MES_TXT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const rangoTxt = (a, b) => {
  const f = (s, conMes) => `${WD[dow(s)].toLowerCase()} ${Number(s.slice(8, 10))}${conMes ? '-' + MES_TXT[Number(s.slice(5, 7)) - 1] : ''}`;
  return `${f(a, a.slice(5, 7) !== b.slice(5, 7))} → ${f(b, true)}`;
};
const semanaStep1Txt = (t) => {
  const w = taperSemanas.find((x) => x.s === t.s);
  const pre = `S${t.s} · `;
  let txt = String(t.semana_step1 || '');
  if (!txt.startsWith(pre)) throw new Error(`taper S${t.s}: semana_step1 debe empezar por «${pre}»`);
  const vigente = rangoTxt(w.ini, w.fin);
  if (!txt.slice(pre.length).replace(/^cierre del plan: /, '').startsWith(vigente)) {
    throw new Error(`taper S${t.s}: semana_step1 dice «${txt.slice(0, 60)}…» pero el bloque calculado es ${vigente} (actualizar vibecoding_proyectos.json)`);
  }
  txt = txt.replace(new RegExp(` · S${t.s} · (?:cierre del plan: )?([^()]*?) \\((v\\d+\\.\\d+): `, 'g'), ' · $2: $1 (');
  if (txt.split(pre).length !== 2) throw new Error(`taper S${t.s}: prefijo «${pre}» repetido en semana_step1 con un formato no reconocido`);
  return txt;
};

// ─── ship log (verify_vibecoding.js) → horneado en el TS ───
let SHIP_LOG = [];
try {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/_vibecoding_ship.json'), 'utf8'));
  SHIP_LOG = (j.entradas || []).map((e) => ({ s: Number(e.s) || 0, id: String(e.id || ''), fecha: String(e.fecha || ''), hora: String(e.hora || ''), criterios_ok: Number(e.criterios_ok) || 0, total: Number(e.total) || 0, shipped: !!e.shipped, resumen: String(e.resumen || '') }));
} catch { /* aún sin verify: log vacío */ }

// ─── emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
const arrTs = (a) => '[' + a.map((x) => `"${esc(x)}"`).join(',') + ']';
const docsTs = (docs) => '[' + docs.map((x) => `{label:"${esc(x.label)}",url:"${esc(x.url)}"}`).join(',') + ']';
const verTs = (v) => '[' + v.map((x) => `{tipo:"${x.tipo}",resumen:"${esc(x.tipo === 'git' ? `commit ${x.grep} en ${x.repo}` : x.tipo === 'test' ? `${x.cmd}${x.expect ? ' → ' + x.expect : ''}` : x.tipo === 'url' ? x.url : x.tipo === 'supabase' ? `tabla ${x.tabla}${x.min_filas ? ' ≥' + x.min_filas + ' filas' : ''}` : x.tipo === 'fichero' ? x.path : x.como || 'manual')}"}`).join(',') + ']';
const proyTs = (p) => {
  const w = semanas.find((x) => x.s === p.s);
  return `{s:${p.s},id:"${esc(p.id)}",nombre:"${esc(p.nombre)}",rotacion:"${p.rotacion}",deload:${!!p.deload},ini:"${w.ini}",fin:"${w.fin}",ship:"${w.ship}",pcSab:"${w.pcSab}",sirveA:"${esc(p.sirveA)}",objetivo:"${esc(p.objetivo)}",entregable:"${esc(p.entregable)}",aceptacion:${arrTs(p.aceptacion)},verificacion:${verTs(p.verificacion)},repo:"${esc(p.repo)}",repoGit:"${esc(p.repo_git)}",docs:${docsTs(p.docs)},pasos:${arrTs(p.pasos)},shipTxt:"${esc(p.ship)}"}`;
};
const taperTs = (t) => {
  const w = taperSemanas.find((x) => x.s === t.s);
  return `{s:${t.s},id:"${esc(t.id)}",nombre:"${esc(t.nombre)}",tipo:"${t.tipo}",ini:"${w.ini}",fin:"${w.fin}",ship:"${w.ship}",pcSab:"${w.pcSab}",minDia:${t.minDia},semanaStep1:"${esc(semanaStep1Txt(t))}",objetivo:"${esc(t.objetivo)}",sensores:${arrTs(t.sensores || [])},pasos:${arrTs(t.pasos)},shipTxt:"${esc(t.ship)}"}`;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},proyecto:"${x.proyecto}",k:${x.k},tipo:"${x.tipo}",min:${x.min},deload:${x.deload},paso:"${esc(x.paso)}"}`;
const shipTs = (e) => `{s:${e.s},id:"${esc(e.id)}",fecha:"${e.fecha}",hora:"${esc(e.hora)}",criterios_ok:${e.criterios_ok},total:${e.total},shipped:${e.shipped},resumen:"${esc(e.resumen)}"}`;

const nP = dias.filter((x) => x.semana <= 12).length;
const ts = `/**
 * vibecodingPlan.ts — Motor día-a-día del VIBECODING 04:15-05:00 (L-V) · 12 proyectos S1-S12 (${nP} días hábiles,
 * ${dias[0].fecha} → ${finS12}; sáb PC SYNAPSE = SHIP) + taper S13-S20 (${dias[nP].fecha} → ${dias[dias.length - 1].fecha}:
 * S13-S16 mantenimiento ≤15'/día con flag deload · S17-S20 deload total = journal 5' + audio · S20 = cierre del plan).
 * ${dias.length} días hábiles en total. v6.00 (6-oct-2026): el taper S13-S20 es «por el ENCAPS» (intensiva lun 4-ene → dom 14-mar-2027
 * PROVISIONAL; el Step 1 está en pausa del 31-dic al 15-mar y su examen es el lun 27-sep-2027) — solo texto, mismas fechas. Hasta v5.20
 * los 95 días coincidían con el D# del Step 1; desde la v6 el d del vibecoding ya NO es el D del Step 1.
 * v6.01 (10-oct-2026): pcSab = sábado del PC en el SYNAPSE (= ship; en v6.03 ninguno se desplaza —S20 no va al sáb 13-mar, PROTEGIDO— · S16 → sáb 13-feb en v6.02 · sáb 6-feb en v6.01) y vibePCSabado() = bloques PC del SYNAPSE de ese
 * sábado (SHIP · avance · taper, mismo orden): la card del vibecoding resuelve el sábado con ella y el L-V con la entrada del día.
 * GENERADO por DATA/_scripts/gen_vibecoding_plan.js desde DATA/SYNAPSE/vibecoding_proyectos.json.
 * NO editar a mano — regenerar: node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD
 *
 * Filosofía (CURSO_IA_04H_31AGO.md): builder, no estudiante. Cada semana termina 1 proyecto REAL con
 * entregable verificable y criterio de aceptación MECÁNICO — 'shipped' lo decide
 * node DATA/_scripts/verify_vibecoding.js <n> (→ DATA/SYNAPSE/_vibecoding_ship.json, horneado aquí en VIBE_SHIP_LOG
 * y leído en vivo desde localStorage 'jmd-vibe-ship'); el ✓ manual (PlanKey 'vibecoding') solo cuenta días.
 * Ciclo diario: 5' objetivo → 35' construir → 5' commit + journal (D:/synapse-journal, node DATA/_scripts/journal_hoy.js).
 * FRENO 04:55: commit-or-stash obligatorio; 05:00 Anki sin excepción; si el día se recorta pierde el proyecto, nunca el Anki.
 * Semana DELOAD del vibecoding: flag \`deload\` en ${P.filter((p) => p.deload).map((p) => { const w = semanas.find((x) => x.s === p.s); return `S${p.s} (${rangoTxt(w.ini, w.fin)})`; }).join(' · ') || '—'}, carga 50% (2 días de 45' + 3 de 15'),
 * fechas intactas. El flag sigue en S7 por el orden v5.10-b, sin mover contenido ni minutos (precedente v6.01; en v6.03 S7 solapa 3 de sus 5
 * días con la semana post-NBME 26). Las semanas deload del Step 1 las fija homeBriefing.DELOAD_SEMANAS (v6.03: lun 30-nov y lun 28-dic).
 */
export type VibeRotacion = 'yocpmd' | 'preguntas' | 'bots' | 'contenido';
export type VibeTipo = 'definir' | 'construir' | 'verificar' | 'ship-prep' | 'sensores' | 'mejora' | 'lectura' | 'retro' | 'journal';
export type VibeVerifTipo = 'git' | 'test' | 'url' | 'supabase' | 'fichero' | 'manual';
export interface VibeDoc { label: string; url: string }
export interface VibeVerificacion { tipo: VibeVerifTipo; resumen: string }
export interface VibeProyecto {
  s: number; id: string; nombre: string; rotacion: VibeRotacion; deload: boolean;
  ini: string; fin: string; ship: string;            // L-V del proyecto + sábado de SHIP (PC SYNAPSE)
  pcSab: string;                                      // v6.01: sábado de su PC en el SYNAPSE (= ship en S1-S12)
  sirveA: string; objetivo: string; entregable: string; aceptacion: string[]; verificacion: VibeVerificacion[];
  repo: string; repoGit: string; docs: VibeDoc[]; pasos: string[]; shipTxt: string;
}
export interface VibeTaper {
  s: number; id: string; nombre: string; tipo: 'mantenimiento' | 'deload';
  ini: string; fin: string; ship: string; minDia: number; semanaStep1: string; objetivo: string;
  sensores: string[]; pasos: string[]; shipTxt: string;
  pcSab: string;                                      // v6.01: sábado de su PC opcional en el SYNAPSE (= ship, o el siguiente si la anterior cierra el mismo y no es día protegido: v6.03 ninguno · S16 → sáb 13-feb en v6.02 · sáb 6-feb en v6.01)
}
/** v6.01: un bloque PC del SYNAPSE en sábado (vibePCSabado). 'ship' = SHIP del proyecto · 'avance' = el proyecto aún no terminó · 'taper' = PC opcional. */
export interface VibePCSabado { tipo: 'ship' | 'avance' | 'taper'; s: number; proyecto?: VibeProyecto; taper?: VibeTaper }
export interface DiaVibe {
  d: number; fecha: string; wd: string; semana: number; proyecto: string; k: number;
  tipo: VibeTipo; min: number; deload: boolean; paso: string;
}
/** Resultado de node DATA/_scripts/verify_vibecoding.js <s> (una entrada por ejecución; s=0 = --sensores). */
export interface VibeShipEntry { s: number; id: string; fecha: string; hora: string; criterios_ok: number; total: number; shipped: boolean; resumen: string }

export const VIBE_META = {
  inicio: '${dias[0].fecha}', fin: '${finS12}', finTaper: '${dias[dias.length - 1].fecha}', totalDias: ${dias.length}, diasProyectos: ${nP}, semanas: 20, proyectos: 12,
  franja: "04:15–05:00 L-V (45') · sáb 15:00-17:00 PC SYNAPSE = SHIP · dom = Feynman del proyecto (10', opcional) · S13-S16 ≤15'/día · S17-S20 journal 5'",
  ciclo: "5' objetivo → 35' construir con Claude Code → 5' commit + journal (D:/synapse-journal)",
  freno: "04:55 commit-or-stash obligatorio · 05:00 Anki sin excepción · si el día se recorta pierde el proyecto, nunca el Anki",
  freno0455: '04:55', ankiInicio: '05:00',
  commit: "[S<n>] … en el repo declarado (verify_vibecoding.js hace git log --grep)",
  journalRoot: 'D:/synapse-journal',
  shipKey: 'jmd-vibe-ship',
  rotacion: { yocpmd: 'Automatización YoCPMD', preguntas: 'Pipeline de preguntas ENCAPS/USMLE/MIR', bots: 'Bots CRM Pulso / LIVIANO', contenido: 'Contenido IA para las marcas' },
} as const;

export const VIBE_PROYECTOS: VibeProyecto[] = [
${P.map(proyTs).join(',\n')}
];

export const VIBE_TAPER: VibeTaper[] = [
${T.map(taperTs).join(',\n')}
];

export const VIBE_DIAS: DiaVibe[] = [
${dias.map(diaTs).join(',\n')}
];

/** Ship log horneado en la última regeneración (fuente: DATA/SYNAPSE/_vibecoding_ship.json). */
export const VIBE_SHIP_LOG: VibeShipEntry[] = [
${SHIP_LOG.map(shipTs).join(',\n')}
];

export const VIBE_TIPO_LABEL: Record<VibeTipo, string> = ${JSON.stringify(TIPO_LABEL)};
export const VIBE_ROTACION_ICON: Record<VibeRotacion, string> = { yocpmd: '⚙️', preguntas: '❓', bots: '🤖', contenido: '🎬' };

export function vibeDiaDe(fechaISO: string): DiaVibe | undefined { return VIBE_DIAS.find((x) => x.fecha === fechaISO); }
export function vibeProyectoDe(s: number): VibeProyecto | undefined { return VIBE_PROYECTOS.find((x) => x.s === s); }
export function vibeTaperDe(s: number): VibeTaper | undefined { return VIBE_TAPER.find((x) => x.s === s); }
/** v6.01 (10-oct-2026): bloque(s) PC del SYNAPSE de un sábado, con el MISMO orden y la MISMA regla que gen_synapse_plan.js
 *  (PC_DESPLAZADOS + bloquePC): 1.º las entradas del taper cuyo PC propio se desplazó a ese sábado (pcSab ≠ ship: ninguna en v6.03 · S16 → sáb 13-feb en v6.02 —sáb 6-feb en v6.01—, porque
 *  S15 y S16 cierran la misma semana), luego la entrada que hace SHIP ese sábado (proyecto → 'ship' · taper → 'taper') y, si ninguna cierra
 *  ese sábado, la que está en curso (proyecto → 'avance': aún no terminó; v6.03: sáb 24-oct = avance de S1, que termina el mar 27-oct y hace SHIP el sáb 31-oct · sáb 26-dic = avance de S10 en v6.02 —S11 en v6.01—, que termina el lun 28-dic y hace SHIP
 *  el sáb 2-ene). El ÚLTIMO elemento es el principal (cabecera de la card). [] si no es sábado o cae fuera del plan. */
export function vibePCSabado(fechaISO: string): VibePCSabado[] {
  if (diaSemanaISO(fechaISO) !== 6) return [];
  const out: VibePCSabado[] = VIBE_TAPER.filter((t) => t.pcSab === fechaISO && t.pcSab !== t.ship).map((t) => ({ tipo: 'taper' as const, s: t.s, taper: t }));
  const todos: Array<VibeProyecto | VibeTaper> = [...VIBE_PROYECTOS, ...VIBE_TAPER];
  const cierra = todos.find((x) => x.ship === fechaISO);
  const m = cierra || todos.find((x) => x.ini <= fechaISO && fechaISO <= x.ship);
  if (m) {
    const tp = vibeTaperDe(m.s);
    out.push(tp ? { tipo: 'taper', s: m.s, taper: tp } : { tipo: cierra ? 'ship' : 'avance', s: m.s, proyecto: vibeProyectoDe(m.s) });
  }
  return out;
}
/** Entrada del taper vigente para una fecha. v6.01 (10-oct-2026): L-V = la del DÍA (los bloques del taper ya no son lun → vie y las ventanas
 *  ini → ship+1 se solapan: el jue 11-feb es S17, no S16, en v6.03 · el jue 21-ene es S14, no S13, en v6.02 —jue 14-ene en v6.01—) · sábado = la del PC del SYNAPSE (vibePCSabado; undefined si ese sábado es el SHIP
 *  de un proyecto: S12 el sáb 16-ene en v6.03 y v6.02 —sáb 9-ene en v6.01—) · domingo/feriado = la del último hábil anterior, hasta el domingo tras su SHIP. undefined fuera del taper. */
export function vibeTaperEnFecha(fechaISO: string): VibeTaper | undefined {
  const pc = vibePCSabado(fechaISO);
  if (pc.length) return pc[pc.length - 1].taper;
  const dia = vibeDiaDe(fechaISO);
  if (dia) return vibeTaperDe(dia.semana);
  const prev = [...VIBE_DIAS].reverse().find((x) => x.fecha < fechaISO);
  const t = prev ? vibeTaperDe(prev.semana) : undefined;
  return t && fechaISO <= addDiasISO(t.ship, 1) ? t : undefined;
}
/** Proyecto vigente para una fecha: el de su semana L-V, o (sáb/dom) el de la semana que acaba de cerrar.
 *  A partir del taper (S13+) devuelve undefined: usar vibeTaperEnFecha.
 *  v6.01 (10-oct-2026): en sábado manda el PC del SYNAPSE (vibePCSabado): el proyecto que hace SHIP o AVANZA ese día (v6.03: sáb 24-oct = AVANCE de S1, sáb 2-ene = SHIP de S10, sáb 16-ene = SHIP de S12 con el taper desde el lun 18-ene · v6.02: sáb 2-ene = SHIP de S10,
 *  sáb 16-ene = SHIP de S12 aunque el taper ya empezó el jue 14-ene · v6.01: sáb 2-ene = S11, sáb 9-ene = SHIP de S12 con el taper desde el jue 7-ene); undefined si ese sábado el PC es del taper. */
export function vibeProyectoEnFecha(fechaISO: string): VibeProyecto | undefined {
  const pc = vibePCSabado(fechaISO);
  if (pc.length) return pc[pc.length - 1].proyecto;
  if (VIBE_TAPER.length && fechaISO >= VIBE_TAPER[0].ini) return undefined;
  const dia = vibeDiaDe(fechaISO);
  if (dia && dia.semana <= 12) return vibeProyectoDe(dia.semana);
  const prev = [...VIBE_DIAS].filter((x) => x.semana <= 12).reverse().find((x) => x.fecha < fechaISO);
  if (prev) return vibeProyectoDe(prev.semana);
  return VIBE_PROYECTOS[0];
}
/** Nº de proyectos con sus 5 días marcados ✓ (PlanKey 'vibecoding') — auto-reporte, NO es 'shipped'. */
export function vibeShipped(done: Set<number>): number {
  return VIBE_PROYECTOS.filter((p) => VIBE_DIAS.filter((x) => x.semana === p.s).every((x) => done.has(x.d))).length;
}
/** Ship log vivo: horneado + localStorage 'jmd-vibe-ship' (lo escribe el one-liner de verify_vibecoding.js). try/catch. */
export function vibeShipLogLeer(): VibeShipEntry[] {
  let extra: VibeShipEntry[] = [];
  try {
    const raw = (globalThis as any).localStorage?.getItem(VIBE_META.shipKey);
    if (raw) { const j = JSON.parse(raw); extra = Array.isArray(j) ? j : j && typeof j === 'object' ? [j] : []; }
  } catch { extra = []; }
  const all = [...VIBE_SHIP_LOG, ...extra].filter((e) => e && typeof e.s === 'number' && typeof e.fecha === 'string');
  const seen = new Set<string>();
  return all.filter((e) => { const k = e.s + '|' + e.fecha + '|' + e.hora; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
}
/** Último verify del proyecto s (undefined si nunca se corrió). */
export function vibeUltimoVerify(s: number, log: VibeShipEntry[] = vibeShipLogLeer()): VibeShipEntry | undefined {
  const xs = log.filter((e) => e.s === s);
  return xs.length ? xs[xs.length - 1] : undefined;
}
/** Nº de proyectos S1-S12 cuyo ÚLTIMO verify dio shipped=true (el KPI real de 'shipped'). */
export function vibeShippedVerificado(log: VibeShipEntry[] = vibeShipLogLeer()): number {
  return VIBE_PROYECTOS.filter((p) => { const u = vibeUltimoVerify(p.s, log); return !!u && u.shipped; }).length;
}
/** Semana ISO (YYYY-Www) de una fecha: nombre del fichero del journal (D:/synapse-journal/journal/<semana>.md). */
export function vibeSemanaISO(fechaISO: string): string {
  try {
    const d = new Date(fechaISO + 'T12:00:00Z');
    const day = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - day + 3);
    const fy = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    const w = 1 + Math.round(((d.getTime() - fy.getTime()) / 86400000 - 3 + ((fy.getUTCDay() + 6) % 7)) / 7);
    return d.getUTCFullYear() + '-W' + String(w).padStart(2, '0');
  } catch { return fechaISO.slice(0, 4) + '-W00'; }
}
/** Ruta del journal de la semana y su URL vscode:// (VS Code instalado en el PC de Joseph; en móvil no abre). */
export function vibeJournalPath(fechaISO: string): string { return VIBE_META.journalRoot + '/journal/' + vibeSemanaISO(fechaISO) + '.md'; }
export function vibeJournalUrl(fechaISO: string): string { return 'vscode://file/' + vibeJournalPath(fechaISO); }
function addDiasISO(fechaISO: string, n: number): string {
  try { const d = new Date(fechaISO + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); } catch { return fechaISO; }
}
/** 0 = domingo … 6 = sábado (UTC a mediodía, igual que addDiasISO); NaN si la fecha no es válida. */
function diaSemanaISO(fechaISO: string): number { return new Date(fechaISO + 'T12:00:00Z').getUTCDay(); }
`;
fs.writeFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), ts, 'utf8');
console.log('OK src/lib/vibecodingPlan.ts ·', dias.length, 'días ·', dias[0].fecha, '→', finS12, '(S1-S12) + taper', dias[nP].fecha, '→', dias[dias.length - 1].fecha, '· ship log', SHIP_LOG.length, 'entradas');

// ─── emitir DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md ───
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmt = (s) => `${WD[dow(s)].toLowerCase()} ${s.slice(8, 10)}-${MES[Number(s.slice(5, 7)) - 1]}`;
const md = [];
md.push(`# 🧠 VIBECODING — 12 proyectos semanales (S1-S12 · ${fmt(dias[0].fecha)}${dias[0].fecha.slice(0, 4) !== finS12.slice(0, 4) ? ' ' + dias[0].fecha.slice(0, 4) : ''} → ${fmt(finS12)} ${finS12.slice(0, 4)}) + taper S13-S20 (${fmt(dias[nP].fecha)} → ${fmt(dias[dias.length - 1].fecha)} ${dias[dias.length - 1].fecha.slice(0, 4)})`);
md.push('');
md.push(`> GENERADO por \`DATA/_scripts/gen_vibecoding_plan.js ${START}\` desde \`DATA/SYNAPSE/vibecoding_proyectos.json\` (editar el JSON, no este .md). Franja **04:15–05:00 L-V (45')** · sábado **PC SYNAPSE 15:00-17:00 = SHIP** del proyecto · domingo = Feynman del proyecto (10', opcional). Progreso real en la app: pestaña ⚡ run de SYNAPSE (PlanKey \`vibecoding\`, ✓ por día) y bloque 04:15 de MISIÓN DE HOY. **v5.10-b (12-sep-2026)**: catálogo RE-SECUENCIADO por riesgo para el Step 1 con lo ya construido por agentes (parser APEX v2.5.1 + test, usmleScores.ts, anki_telemetria.js v1, gen_revision_semanal.js v1, plan_checks.sql, verify_vibecoding.js, journal_hoy.js): cada proyecto COMPLETA o pone en producción algo real. ${dias.length} días L-V propios del plan (desde v6.00 el d del vibecoding YA NO es el D del Step 1; ⏸ v5.10-b: los mismos ${DIAS_STEP1} del Step 1, d == D#).`);
md.push('');
md.push('## Reglas (Palmerton aplicado a construir)');
md.push('');
md.push(`- ${CAT._meta.regla}`);
md.push(`- **FRENO 04:55**: ${CAT._meta.freno_0455}`);
md.push(`- **Commits**: ${CAT._meta.commit_convencion}`);
md.push(`- **Verificación mecánica**: ${CAT._meta.verificacion}`);
md.push('- **Definition of done** = los 4 criterios de aceptación del proyecto verificados por `verify_vibecoding.js` (commit hash / test verde / URL o tabla viva / fichero de salida). Sin eso, el sábado PC se usa para cerrar; nada se arrastra a la semana siguiente.');
md.push('- **Rotación** (repite subiendo nivel): ' + Object.entries(CAT._meta.rotacion).map(([k, v]) => `\`${k}\` = ${v}`).join(' · '));
md.push(`- **Deload**: ${CAT._meta.deload}`);
md.push(`- **Taper S13-S20**: ${CAT._meta.taper_regla}`);
md.push('- **Cero inventos**: ' + CAT._meta.urls_verificadas + ' Lo que exija credenciales o decisión de Joseph está marcado "A VERIFICAR".');
md.push('- Cada día cierra con la entrada del journal (`node DATA/_scripts/journal_hoy.js` → `D:/synapse-journal/journal/<semana ISO>.md`: objetivo · qué construí · commit/URL · qué aprendí · % del código que entiendo · bloqueo). El sábado de SHIP se corre `verify` ANTES de marcar el proyecto como shipped.');
md.push('');
md.push('## Calendario');
md.push('');
md.push('| S | Proyecto | Rotación | L-V | SHIP (sáb PC) | Deload |');
md.push('|---|---|---|---|---|---|');
for (const p of P) { const w = semanas.find((x) => x.s === p.s); md.push(`| S${p.s} | ${p.nombre} | ${p.rotacion} | ${fmt(w.ini)} → ${fmt(w.fin)} | ${fmt(w.ship)} | ${p.deload ? '**sí (50%)**' : '—'} |`); }
for (const t of T) { const w = taperSemanas.find((x) => x.s === t.s); md.push(`| S${t.s} | ${t.nombre} | taper · ${t.tipo} | ${fmt(w.ini)} → ${fmt(w.fin)} (${t.minDia}'/día) | ${t.tipo === 'mantenimiento' ? fmt(w.pcSab) + ' (opcional 30\')' + (w.pcCon ? ` — cierra la misma semana que S${w.pcCon} (SHIP ${fmt(w.ship)}): su PC propio va el sábado siguiente` : '') : 'opcional / no'} | **sí (${t.tipo})** |`); }
md.push('');
for (const p of P) {
  const w = semanas.find((x) => x.s === p.s);
  const ds = dias.filter((x) => x.semana === p.s);
  md.push(`## S${p.s} · ${p.nombre}${p.deload ? ' · DELOAD' : ''}`);
  md.push('');
  md.push(`- **Semana**: ${fmt(w.ini)} → ${fmt(w.fin)} · **SHIP**: sábado ${fmt(w.ship)} (PC SYNAPSE 15:00-17:00) · rotación \`${p.rotacion}\` · commits \`[S${p.s}] …\` en \`${p.repo_git}\``);
  md.push(`- **A quién sirve**: ${p.sirveA}`);
  md.push(`- **Objetivo**: ${p.objetivo}`);
  md.push(`- **Entregable verificable**: ${p.entregable}`);
  md.push(`- **Dónde**: ${p.repo}`);
  md.push(`- **Criterio de aceptación (definition of done)** — \`node DATA/_scripts/verify_vibecoding.js ${p.s}\`:`);
  p.aceptacion.forEach((a, i) => { const v = p.verificacion[i]; md.push(`  - [ ] ${a} _(verify: ${v.tipo}${v.tipo === 'manual' ? ' — ' + v.como : ''})_`); });
  md.push('- **Docs (verificadas 5-sep-2026)**: ' + p.docs.map((x) => `[${x.label}](${x.url})`).join(' · '));
  // v5.19: la etiqueta del deload sale de los días reales con 15' (antes fija en «mar/jue», solo cierta con bloques lun→vie)
  const dl15 = ds.filter((x) => x.min === 15).map((x) => x.wd.toLowerCase());
  md.push('- **Pasos diarios (45\' cada uno' + (p.deload ? `; deload: ${dl15.join('/') || '—'} 15'` : '') + ')**:');
  for (const x of ds) md.push(`  - **${x.wd} ${x.fecha.slice(8, 10)}-${x.fecha.slice(5, 7)} · ${TIPO_LABEL[x.tipo]}${x.min !== 45 ? ` (${x.min}')` : ''}**: ${x.paso}`);
  md.push(`- **SHIP**: ${p.ship}`);
  md.push('');
}
md.push('## Semanas 13-20 · TAPER por el ENCAPS (mantenimiento → deload total → cierre) · v6.00');
md.push('');
md.push(`> ${CAT._meta.taper_regla}`);
md.push('');
for (const t of T) {
  const w = taperSemanas.find((x) => x.s === t.s);
  const ds = dias.filter((x) => x.semana === t.s);
  md.push(`### S${t.s} · ${t.nombre} · ${t.tipo.toUpperCase()} (${t.minDia}'/día)`);
  md.push('');
  md.push(`- **Semana**: ${fmt(w.ini)} → ${fmt(w.fin)} (${ds.length} días hábiles) · contexto (intensiva ENCAPS): ${semanaStep1Txt(t)}`);
  md.push(`- **Objetivo**: ${t.objetivo}`);
  if (t.sensores && t.sensores.length) md.push('- **Sensores**: ' + t.sensores.map((s) => `\`${s}\``).join(' · '));
  md.push('- **Días**:');
  for (const x of ds) md.push(`  - **${x.wd} ${x.fecha.slice(8, 10)}-${x.fecha.slice(5, 7)} · ${TIPO_LABEL[x.tipo]}**: ${x.paso}`);
  md.push(`- **Sábado/domingo**: ${t.ship}`);
  md.push('');
}
md.push('## Retro (rellenar en S12 desde `DATA/SYNAPSE/_vibecoding_ship.json`)');
md.push('');
md.push('| S | Shipped (verify) | criterios_ok/total | Evidencia (commit/URL/test) | Lección |');
md.push('|---|---|---|---|---|');
for (const p of P) {
  const u = [...SHIP_LOG].reverse().find((e) => e.s === p.s);
  md.push(`| S${p.s} | ${u ? (u.shipped ? '✅' : '❌') + ' ' + u.fecha : '☐'} | ${u ? `${u.criterios_ok}/${u.total}` : ''} | | |`);
}
md.push('');
fs.writeFileSync(path.join(ROOT, 'DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md'), md.join('\n'), 'utf8');
console.log('OK DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md · SHIP sábados:', semanas.map((w) => w.ship).join(', '), '· taper:', taperSemanas.map((w) => `S${w.s} ${w.ini}→${w.fin}`).join(' · '));
