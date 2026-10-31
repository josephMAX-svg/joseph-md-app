#!/usr/bin/env node
/**
 * gen_encaps_guia.js — genera src/lib/encapsGuia.ts: la GUÍA «qué · cuánto · cómo» de la hora ENCAPS 16:15-17:15 de CADA sesión del
 * mantenimiento F1 (v6.06: dia 1-42, lun 2-nov → mié 30-dic-2026; v6.05: dia 1-47 desde el lun 26-oct · v6.03: dia 1-50 desde el mié 21-oct · v6.02: dia 1-52 desde el lun 19-oct) en el formato común `GuiaBloque` (src/lib/guia.ts).
 *   node DATA/_scripts/gen_encaps_guia.js                  → escribe src/lib/encapsGuia.ts (aborta si un bloque no cuadra)
 *   node DATA/_scripts/gen_encaps_guia.js --check          → regenera en memoria y compara con el fichero (exit 1 si difiere)
 *   node DATA/_scripts/gen_encaps_guia.js --informe <md>   → además escribe la tabla de las semanas 1-2
 * Entradas (nada a mano en el .ts):
 *   · las f1.dias filas (_fechas_v6.json; v6.06: 42 · v6.05: 47 · v6.03: 50) del SQL vigente DATA/_scripts/_encaps_mantenimiento_2027.sql (= Supabase study_schedule
 *     MANTENIMIENTO; NO cambia fechas, dia, códigos ni sub-ejes del régimen vigente);
 *   · los runners de DATA/ENCAPS/BANCO_PROPIO (eval_ · pretest_arranque_ · banco_ · minisim_ <fecha>.json/.html): nº de preguntas, códigos,
 *     sub-ejes y modo salen del propio .json; la URL web solo se pone si el runner ya está publicado en public/encaps/bp
 *     (node DATA/_scripts/sync_encaps_bp_web.js) — si no, enlace local file:/// en el plan B y AVISO visible;
 *   · encaps_guia_catalogo.js (material del Drive por código del 18-oct · compendio y videoclases por área · proyecto de Claude del área ·
 *     nota Obsidian del CÓDIGO) + ENCAPS_FICHAS_POR_TEMA de src/lib/encapsFuentes.ts (fichas MINSA, respaldo de los códigos sin inventario).
 * Reparto de los 60′ (decisión E4 del 18-oct; Σ pasos = 60 en todos, el script aborta si no):
 *   · PRE-TEST DE ARRANQUE (D1 + D2; v6.06: lun 2 + mar 3-nov · v6.05: lun 26 + mar 27-oct · v6.03: mié 21 + jue 22-oct): 2 arranque · 10 eval 5Q · 24 pre-test 20Q (72 s/Q, modo examen) · 15 corrección · 5 registro
 *     (--registrar --append; el formulario de la app NO: dejaría la ronda como MIX) · 4 APEX.
 *   · BANCO (lun-jue): 2 arranque · 8 eval 5Q (72 s/Q + solución) · 30 banco principal 20Q (≈90 s/Q con corrección inmediata) · 8 secundario de
 *     cola larga · 7 material del Drive SOLO si fallaste ≥2 del principal (si no: relee tus «dudosas») · 3 registro · 2 APEX.
 *   · MINI-SIM (viernes): 2 arranque · 30 mini-sim 25Q a 72 s/Q · 18 corrección · 5 registro + cierre semanal · 5 APEX + material de los calientes.
 * v6.02c (18-oct-2026, E4): nuevo.
 * v6.03 (20-oct-2026, corrimiento «todo comienza mañana miércoles 21»): nº de filas = _fechas_v6.json f1.dias (antes 52 fijo) · la eval se
 *   describe con su _meta.sesion_anterior («del código de AYER» solo si la sesión anterior fue ayer; el lun 26 es la de I-3 del jue 22, tras
 *   el mini-sim del vie 23) · el aviso «runners por generar» manda --semana SOLO si esa semana no tiene runners ya armados (si los tiene,
 *   --eval/--banco del día: --semana re-sortearía los bancos re-fechados) · override del arranque y cabecera del .ts derivados de las filas.
 * v6.03b (20-oct-2026 · técnica de simulacro, DATA/ENCAPS/METODO_SIMULACRO_ENCAPS.md): los pasos del MINI-SIM (30′ · 18′ · 5′ · 5′) y el bloque
 *   cronometrado del PRE-TEST DE ARRANQUE (24′) llevan la técnica de RaviMedTest adaptada a ENCAPS (catálogo: TECNICA_SIM): reloj del runner cada
 *   10Q con los hitos de tiempo restante, orden 1→n con atención extra al arranque, una sola decisión por pregunta, revisión FORMAL final sin
 *   cambiar contenido · corrección en el orden de Ravi (falsa certeza → fallos → aciertos no ciegos → forma) · la nota solo se compara con la
 *   misma receta · tarjetas solo de fallos «tontos»/discriminativos. Mismos minutos, misma franja.
 * v6.05 (24-oct-2026, «todo inicia el lunes 26»): sin cambio de lógica. META.version / generado y la nota de corrimiento de la cabecera del .ts
 *   salen del último corrimiento de _fechas_v6.json (antes texto fijo 'v6.03' / '2026-10-20') · el texto «previsto» de un banco sin runner cita
 *   CAT.PREVISTO_ORIGEN (antes «--dry del 18-oct») · el --informe toma las semanas 1-2 desde el lunes del D1 (antes ≤ 2026-10-30 fijo).
 * v6.05 (fix 24-oct, verificación adversarial): (1) el aviso «Runners por generar ANTES del lunes … (regla: el …)» cita el ÚLTIMO DÍA DE PLAN antes
 *   del lunes (ultimoDiaPlanAntes: L-V sin SKIP ni protegidos) y no lunes − 3 (el lun 28-dic decía «el vie 25-dic», que es SKIP → jue 24-dic);
 *   (2) ENCAPS_GUIA_META.version = _fechas_v6.json version y generado = fecha REAL de generación (Lima); --check y la escritura ignoran esa fecha
 *   (regenerar sin cambios no reescribe). Controles: el script aborta si un aviso cita un día que no es de plan o si version ≠ la del JSON.
 * v6.06 (31-oct-2026, «reestructura todo a partir del 2 de noviembre … corre nada más»): F1 dia 1-42 desde el lun 2-nov (runners re-fechados por
 *   sesión) · NUEVO: export ENCAPS_SABADO_F2 / encapsSabadoDe(fecha) = el CARRIL SÁBADO 09:30-10:30 de la intensiva (pendientes F1 que no caben en
 *   los días de reposición lun-jue del carril B: extra.carril_sabado de la fila del viernes host en _encaps_intensivo_2027.sql = Supabase). Lo usa
 *   plantillasV6 (bloque ENCAPS del sábado F2 en el Home) — la app pinta los ítems desde la fila viva (encapsPlan.carrilSabadoDe). Controles: el
 *   sábado es sábado, su host es el viernes anterior con el mismo dia, no es protegido ni SKIP, y cada pendiente trae su código (banco) o su receta
 *   (mini-sim) y sim_n = 1000 + dia del host.
 * v6.06 (fix, 31-oct-2026): las 5 sesiones F1 del CARRIL SÁBADO (sáb 9, 16, 23, 30-ene y 6-feb; fila mant. 44/45/46/47 y 40 de la v6.05) habían
 *   perdido su guía «qué · cuánto · cómo» (en la v6.05 tenían GuiaBloque de 60′ con 5-7 pasos). El cuerpo del bucle de F1 pasa a
 *   construirGuia(fila, sab) y genera también su GuiaBloque (franja 09:30–10:30, rótulo «🔁 REPOSICIÓN F1 · mant. N», nota de reposición,
 *   eval de fallos previos si no hay runner, cierre «Carril B 16:15» con la fecha del sábado / mini-sim con sim_n 1000 + dia, runner
 *   eval_/banco_/minisim_<sábado> si existe) → export guiaEncapsSabadoDe / sesionEncapsSabadoDe / sabadoEncapsCuadra; TodayMission la devuelve
 *   como guías del bloque encaps-sab. Controles: cada sábado tiene guía (franja, rótulo, nota, tipo/código/sim_n) · Σ pasos = minutos de la
 *   franja · TodayMission usa guiaEncapsSabadoDe en el bloque encaps-sab · control de la APP (encapsPlan.ts cargado con stubs, cargar_ts.js):
 *   las tareas D{dia}:s_* no cuentan en el total del viernes host y sí el sábado (itemsDelTotal; useEncapsPlan lo usa) · los ejemplos --banco /
 *   --eval de la tabla de BANCO_PROPIO/README.md son sesiones válidas del régimen (decían 2026-10-28 → 2026-11-09 / 2026-11-10). Las guías F1
 *   no cambian (decodificadas, idénticas).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS } = require('./usmle/cargar_ts');
const CAT = require('./encaps_guia_catalogo');

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const iInf = argv.indexOf('--informe');
const INFORME = iInf >= 0 ? argv[iInf + 1] : null;
const OUT = path.join(ROOT, 'src', 'lib', 'encapsGuia.ts');
const SQL = path.join(ROOT, 'DATA', '_scripts', '_encaps_mantenimiento_2027.sql');
const BP = path.join(ROOT, 'DATA', 'ENCAPS', 'BANCO_PROPIO');
const PUB = path.join(ROOT, 'public', 'encaps', 'bp');
const WEB = 'https://joseph-md-app.vercel.app/encaps/bp/';
const LOCAL = 'file:///D:/joseph-md-app/DATA/ENCAPS/BANCO_PROPIO/';
const VAULT_DIR = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const OBS_VAULT = 'Vault_Medicina MIR_Joseph';
const FRANJA = '16:15–17:15';
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/encapsGuia.ts'); process.exit(1); };
const avisos = [];

// ── SQL vigente (filas MANTENIMIENTO) ─────────────────────────────────────────────────────────────────────────
function tupla(line) {
  const out = []; let i = line.indexOf('(') + 1;
  while (i < line.length) {
    while (line[i] === ' ' || line[i] === ',') i++;
    if (line[i] === ')') break;
    if (line[i] === "'") {
      let s = ''; i++;
      for (;;) { if (line[i] === "'") { if (line[i + 1] === "'") { s += "'"; i += 2; continue; } i++; break; } s += line[i++]; }
      if (line.startsWith('::jsonb', i)) { i += 7; out.push(JSON.parse(s)); } else out.push(s);
    } else if (line.startsWith('NULL', i)) { out.push(null); i += 4; }
    else { let s = ''; while (line[i] !== ',' && line[i] !== ')') s += line[i++]; out.push(Number(s)); }
  }
  return out;
}
const COLS = ['examen', 'dia', 'fecha', 'weekday', 'tipo', 'codigo', 'subtema', 'prioridad', 'modo', 'videos', 'theomed', 'material_comp', 'temas_secundarios', 'extra'];
const FILAS = fs.readFileSync(SQL, 'utf8').split(/\r?\n/).filter((l) => l.startsWith("('ENCAPS',")).map((l) => {
  const t = tupla(l); const o = {}; COLS.forEach((c, k) => { o[c] = t[k]; }); return o;
});
const F6 = require('./gen_fechas_v6').cargarFechasV6();
const F1_DIAS = F6.f1.dias; // v6.06: 42 · v6.05: 47 (v6.03: 50 · v6.02: 52) — antes constante
const CORR = (F6.corrimientos || []).at(-1) || null; // v6.05: versión y fecha del régimen vigente (META, cabecera del .ts)
if (FILAS.length !== F1_DIAS) aborta(`el SQL tiene ${FILAS.length} filas MANTENIMIENTO (se esperan f1.dias = ${F1_DIAS})`);
const cabSql = (fs.readFileSync(SQL, 'utf8').split(/\r?\n/)[0] || '').replace(/^--\s*/, '');
// v6.06: CARRIL SÁBADO de la intensiva (extra.carril_sabado de la fila del viernes host) → ENCAPS_SABADO_F2 (clave = el sábado)
const SQL_INT = path.join(ROOT, 'DATA', '_scripts', '_encaps_intensivo_2027.sql');
const SABADOS = {};
const SAB_CTX = {}; // v6.06 (fix): fecha del sábado → { p: pendiente_f1 completo, hostTipo, host: fila del viernes host } (guía + control de la app)
for (const l of (fs.existsSync(SQL_INT) ? fs.readFileSync(SQL_INT, 'utf8') : '').split(/\r?\n/)) {
  if (!l.startsWith("('ENCAPS',")) continue;
  const t = tupla(l); const r = {}; COLS.forEach((c, k) => { r[c] = t[k]; });
  const cs = r.extra && r.extra.carril_sabado; if (!cs) continue;
  const p = cs.pendiente_f1 || {}; const ex = p.extra || {};
  const hostEsperado = new Date(cs.fecha + 'T12:00:00Z'); hostEsperado.setUTCDate(hostEsperado.getUTCDate() - 1);
  if (new Date(cs.fecha + 'T12:00:00Z').getUTCDay() !== 6 || hostEsperado.toISOString().slice(0, 10) !== r.fecha || !cs.host || cs.host.dia !== r.dia || cs.host.fecha !== r.fecha) aborta(`carril SÁBADO: ${cs.fecha} no es el sábado siguiente a su fila host ${r.fecha} (dia ${r.dia})`);
  if ((F6.protegidos || []).some((x) => x.fecha === cs.fecha) || (F6.skip || []).includes(cs.fecha)) aborta(`carril SÁBADO: ${cs.fecha} es protegido o SKIP`);
  if (p.tipo === 'banqueo1h' ? !p.codigo : p.tipo === 'mini_sim' ? (!Array.isArray(ex.cola_larga) || cs.sim_n !== 1000 + r.dia) : true) aborta(`carril SÁBADO ${cs.fecha}: pendiente F1 sin código / receta / sim_n`);
  SABADOS[cs.fecha] = { fecha: cs.fecha, host: { dia: r.dia, fecha: r.fecha }, ini: cs.ini, fin: cs.fin, tipo: p.tipo, codigo: p.codigo || null, subEje: ex.sub_eje || null,
    subtema: p.subtema, secundarios: (p.temas_secundarios || []).filter((x) => x.rol === 'cola_larga').map((x) => x.codigo), colaLarga: ex.cola_larga || [],
    simN: cs.sim_n ?? null, corrimiento: p.corrimiento, diaMant: p.dia_mant, fechaOriginal: p.fecha_original, origen: String(p.origen || '').replace('mantenimiento_', 'F1 ') };
  SAB_CTX[cs.fecha] = { p, hostTipo: r.tipo, host: r };
}

// ── fichas MINSA por código (encapsFuentes.ts) ────────────────────────────────────────────────────────────────
const FUENTES = cargarModuloTS(path.join('src', 'lib', 'encapsFuentes.ts'));
const FICHAS = FUENTES.ENCAPS_FICHAS_POR_TEMA || {};

// ── helpers ───────────────────────────────────────────────────────────────────────────────────────────────────
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const corta = (iso) => { const d = new Date(iso + 'T12:00:00Z'); return `${WD[d.getUTCDay()]} ${Number(iso.slice(8, 10))}-${MES[Number(iso.slice(5, 7)) - 1]}`; };
/** v6.05 (fix): último día de plan ESTRICTAMENTE anterior a `iso` (L-V, ni SKIP ni protegido de _fechas_v6.json): vie 25-dic (SKIP) → jue 24-dic. */
const NO_PLAN = new Set([...(F6.skip || []), ...(F6.protegidos || []).map((x) => x.fecha)]);
function ultimoDiaPlanAntes(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  do d.setUTCDate(d.getUTCDate() - 1); while (d.getUTCDay() === 0 || d.getUTCDay() === 6 || NO_PLAN.has(d.toISOString().slice(0, 10)));
  return d.toISOString().slice(0, 10);
}
const romano = (c) => ((c || '').match(/^[IVX]+/) || [''])[0];
const obsUrl = (file) => 'obsidian://open?vault=' + encodeURIComponent(OBS_VAULT) + '&file=' + encodeURIComponent(file);
let vaultMontado = fs.existsSync(VAULT_DIR);
function obsidianDe(codigo, subEje) {
  const e = CAT.OBSIDIAN[codigo];
  if (!e) { avisos.push(`sin nota Obsidian mapeada para ${codigo}`); return null; }
  const rel = typeof e === 'string' ? e : ((subEje && e.sub && e.sub[subEje]) || e.def);
  const file = `${CAT.OBS_BASE}/${rel}/_concepto_madre`;
  if (vaultMontado && !fs.existsSync(path.join(VAULT_DIR, file + '.md'))) aborta(`la nota Obsidian «${file}.md» de ${codigo} no existe en el vault`);
  return { t: `◆ Obsidian · ${codigo} · ${rel.split('/').pop().replace(/^\d+_/, '').replace(/_/g, ' ')}`, url: obsUrl(file) };
}
/** Ficha MINSA por [clave de ENCAPS_FICHAS_POR_TEMA, título exacto] (aborta si no existe: nada inventado). */
function ficha([clave, titulo]) {
  const f = (FICHAS[clave] || []).find((x) => x.titulo === titulo);
  if (!f) aborta(`FICHA_SUBEJE: no existe la ficha «${titulo}» en ENCAPS_FICHAS_POR_TEMA['${clave}']`);
  return f;
}
/**
 * Material del código para el sub-eje del día: (1) ficheros del Drive inventariados (S2) que valen para ese sub-eje; (2) si no hay, las
 * fichas MINSA de FICHA_SUBEJE para ese código + sub-eje (elegidas a mano por título; nunca una ficha de otro sub-eje: V-2 «clima» ≠ ficha
 * «FODA»); (3) sin sub-eje (cola larga / mini-sim): las 2 primeras fichas del código; (4) si nada encaja: compendio + videoclases del área.
 */
function materialDe(codigo, subEje) {
  const area = CAT.AREA[romano(codigo)];
  const todos = CAT.DRIVE_POR_CODIGO[codigo] || [];
  const drive = todos.filter((m) => !m.sub || !subEje || m.sub.includes(subEje));
  if (drive.length) return { fuente: 'drive', items: drive.map((m) => ({ t: m.t, url: m.url, tipo: m.tipo })) };
  const fichas = FICHAS[CAT.ALIAS_FICHAS[codigo] || codigo] || [];
  const over = subEje ? CAT.FICHA_SUBEJE[`${codigo}:${subEje}`] : null;
  const elegidas = over ? over.map(ficha) : (!subEje ? fichas.slice(0, 2) : []);
  const items = elegidas.map((f) => ({ t: `Ficha MINSA (Dropbox) «${f.titulo}»`, url: f.url, tipo: 'pdf', min: f.min }));
  if (area) items.push({ t: area.compendio.t, url: area.compendio.url, tipo: 'pdf' });
  if (!elegidas.length && area) items.push({ t: area.videoclases.t, url: area.videoclases.url, tipo: 'carpeta' });
  return { fuente: elegidas.length ? 'fichas' : 'compendio', items };
}
function runner(f) {
  const json = path.join(BP, f + '.json');
  if (!fs.existsSync(json)) return null;
  const j = JSON.parse(fs.readFileSync(json, 'utf8'));
  const publicado = fs.existsSync(path.join(PUB, f + '.html'));
  if (!publicado) avisos.push(`${f}: existe en BANCO_PROPIO pero no está publicado (node DATA/_scripts/sync_encaps_bp_web.js)`);
  const porCod = {}; for (const it of j.items || []) porCod[it.codigo] = (porCod[it.codigo] || 0) + 1;
  return { f, url: publicado ? WEB + f + '.html' : null, local: LOCAL + f + '.html', n: (j.items || []).length, seg: j.seg_por_q || null, umbral: j.umbral ?? null, porCod, meta: j._meta || {}, j };
}
const enlaceRunner = (r, t) => (r ? { t, url: r.url || r.local } : undefined);
const recursoRunner = (r, t) => (r ? [{ t, url: r.url || r.local, cantidad: `${r.n}Q` }] : []);
const proyectoDe = (codigo) => CAT.PROYECTO[romano(codigo)] || CAT.PROYECTO.LOPEZ;

// próxima sesión de banco de un código (las de pre-test no cuentan: su banco se sustituye)
const PRETEST_FECHAS = new Set(FILAS.filter((r) => fs.existsSync(path.join(BP, `pretest_arranque_${r.fecha}.json`))).map((r) => r.fecha));
// v6.03: lunes del primer override con n ≥ 5 = lunes siguiente al primer mini-sim tras el pre-test (v6.03 y v6.02: lun 26-oct)
const LUNES_OVERRIDE = (() => { const p = [...PRETEST_FECHAS].sort().at(-1); const v = p && FILAS.find((r) => r.fecha > p && r.tipo === 'mini_sim'); if (!v) return 'lunes siguiente al primer mini-sim'; const d = new Date(v.fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 3); return corta(d.toISOString().slice(0, 10)); })();
const proximaDe = (codigo, desdeDia) => FILAS.find((r) => r.dia > desdeDia && r.tipo === 'banqueo1h' && r.codigo === codigo && !PRETEST_FECHAS.has(r.fecha));

const PASO_ARRANQUE = (runners) => ({
  min: 2,
  que: `Arranque: abre ${runners.filter(Boolean).map((r) => r.f).join(' + ') || 'el banco del día'}, móvil en silencio y NADA de material abierto`,
  como: 'Los runners abren en cualquier navegador (también el del móvil) y guardan el avance en ese navegador. Confianza 1-3 OBLIGATORIA en cada ítem (3 = segura · 2 = dudosa · 1 = adivinada): el % CIEGO = seguras / total.',
  ...(runners[0] ? { enlace: enlaceRunner(runners[0], `${runners[0].f}`) } : {}),
});
const REGISTRO_RUNNER = (r, tipo) => `Una sola vía (nunca las dos): (a) en el PC, botón «Generar JSON» del runner → node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta del JSON> --append (guarda las preguntas en TRACKING_ERRORES) — preferida; o (b) en el móvil, ENCAPS → Plan → HOY → CIERRE DE SESIÓN tipo ${tipo} con n · seguras · dudosas · fallos por subtipo · t medio (el --pull del cierre semanal la trae al registro).`;
const evalDesc = (r, fila, prev) => {
  if (!r) return null;
  const modo = String(r.meta.modo || r.j.tema || '');
  if (/fallos previos/i.test(modo)) return `5Q de FALLOS PREVIOS del registro (hoy: ${Object.entries(r.porCod).map(([c, n]) => `${n} × ${c}`).join(' + ')})`;
  // v6.03: el código y la sesión anterior salen del propio runner (_meta.sesion_anterior); «AYER» solo si fue el día anterior
  const sa = r.meta.sesion_anterior || {}; const cod = r.j.codigo && r.j.codigo !== 'MIX' ? r.j.codigo : (prev ? prev.codigo : '');
  const ayer = (() => { const d = new Date(fila.fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); })();
  if (sa.fecha && sa.fecha !== ayer) return `5Q de ${cod} = código de la sesión anterior (${corta(sa.fecha)}; tras el mini-sim del viernes: si ya registraste sus fallos, rehaz esos primero) (3 cifras + 2 viñetas)`;
  return `5Q del código de AYER ${cod} (3 cifras + 2 viñetas)`;
};

// ── construcción por sesión ───────────────────────────────────────────────────────────────────────────────────
const SES = {}; const GUIA = {}; const TABLA = [];
/**
 * Guía «qué · cuánto · cómo» de una sesión (banco · pre-test · mini-sim). v6.06 (fix): función (antes el cuerpo del bucle de F1) para
 * reutilizarla en el CARRIL SÁBADO de la intensiva: `sab` = null en F1 · en el sábado { franja, etq, simN, host, hostTxt, lunesSem, evalSin,
 * tipoCierre, nota } (misma receta de 60′; cambian la franja, el rótulo, la eval sin runner, el cierre, el aviso de runners y la nota de reposición).
 */
function construirGuia(fila, sab = null) {
  const prev = sab ? null : FILAS.find((r) => r.dia === fila.dia - 1) || null;
  const e = fila.extra || {};
  const sec = (fila.temas_secundarios || []).filter((s) => s.rol === 'cola_larga');
  const rEval = runner(`eval_${fila.fecha}`);
  const lunes = new Date(fila.fecha + 'T12:00:00Z').getUTCDay() === 1;
  let g; let ses;

  if (fila.tipo === 'mini_sim') {
    const r = runner(`minisim_${fila.fecha}`);
    const cola = e.cola_larga || sec.map((s) => s.codigo);
    const receta = e.receta || {};
    const recTxt = ['II', 'I', 'V', 'III', 'IV'].map((a) => `${receta[a]} ${a}`).join(' · ');
    const obsCola = cola.map((c) => obsidianDe(c, null)).filter(Boolean);
    const matCola = cola.flatMap((c) => materialDe(c, null).items.slice(0, 1).map((m) => ({ ...m, t: `${c} · ${m.t}` })));
    const lunesSem = e.semana || fila.fecha;
    const siguiente = FILAS.find((x) => x.dia > fila.dia);
    g = {
      franja: sab ? sab.franja : FRANJA, plan: 'encaps',
      titulo: sab ? `${sab.etq} · 🔥 MINI-SIM 25Q (${recTxt}) · cola larga ${cola.join(' + ')} · sim_n ${sab.simN}`
        : `D${fila.dia} · 🔥 MINI-SIM #${e.sim_n || fila.dia} · 25Q (${recTxt}) · cola larga ${cola.join(' + ')}${e.checkpoint ? ' · CHECKPOINT DEL AÑO' : ''}`,
      totalMin: 60,
      pasos: [
        PASO_ARRANQUE([r]),
        { min: 30, que: `MINI-SIMULACRO 25Q mixtas (${recTxt}; ≥${e.criticos_min || 10} de los 8 críticos · ≥${e.fallos_previos_min || 5} de fallos previos · ${e.cola_larga_q || '5-6'}Q de ${cola.join(' + ')})${r ? ` — ${r.f}` : ' — runner POR GENERAR'}`,
          como: `${e.seg_por_q || 72} s/Q = 30′ ESTRICTOS, sin pausa y sin material; la corrección aparece solo al terminar. ${CAT.TECNICA_SIM.como(25, 30, 3, e.seg_por_q || 72)} Umbral ${e.umbral_25 || 18}/25; alerta si <${e.alerta_25 || 15}/25 dos viernes seguidos.`,
          ...(r ? { enlace: enlaceRunner(r, 'Mini-sim') } : {}) },
        { min: 18, que: 'Corrección: cada fallo y cada «dudosa» (orden de Ravi)', como: CAT.TECNICA_SIM.CORRECCION },
        sab ? { min: 5, que: `Registro: nota /25 (sim_n ${sab.simN})`, como: `Nota /25 en ENCAPS → Plan → CIERRE DE SESIÓN tipo mini_sim (el sábado la vista abre la fila del ${corta(sab.host.fecha)}, D${sab.host.dia}; el cierre sale con la fecha del sábado y la nota va a study_sim_scores con sim_n = ${sab.simN}: no pisa el ${sab.hostTxt} del viernes). ${REGISTRO_RUNNER(r, 'mini_sim').replace(/^Una sola vía \(nunca las dos\): /, 'Ronda: ')} Sin cierre semanal ni override: es una reposición dentro de la intensiva. ${CAT.TECNICA_SIM.COMPARA}` }
          : { min: 5, que: `Registro: nota /25 + cierre semanal`, como: `Nota /25 en ENCAPS → Plan → ▲ SIM (o CIERRE DE SESIÓN tipo mini_sim). ${REGISTRO_RUNNER(r, 'mini_sim').replace(/^Una sola vía \(nunca las dos\): /, 'Ronda: ')} Después, en el PC: node DATA/_scripts/gen_encaps_semana.js --semana ${lunesSem} → propuesta de override para ${siguiente ? corta(siguiente.fecha) : 'la semana siguiente'}. ${CAT.TECNICA_SIM.COMPARA}` },
        { min: 5, que: '1-3 APEX de los errores de CONOCIMIENTO + material SOLO de los códigos calientes', como: `${CAT.TECNICA_SIM.TARJETAS} Cada APEX a la nota Obsidian del código fallado (cola larga: enlaces abajo) y a Anki APEX::ENCAPS; si un código quedó caliente, abre su PDF (recursos) y copia la cifra exacta a la nota. ${CAT.TECNICA_SIM.ENVIO}`, ...(obsCola[0] ? { enlace: obsCola[0] } : {}) },
      ],
      recursos: [...recursoRunner(r, `Runner ${r ? r.f : ''}`), ...matCola, ...obsCola, CAT.PROYECTO.LOPEZ],
      hecho: sab ? `25/25 respondidas en ≤30′ con la revisión formal hecha · nota /25 registrada con sim_n ${sab.simN} (CIERRE DE SESIÓN del sábado o --registrar) · 1-3 APEX creados.`
        : `25/25 respondidas en ≤30′ con la revisión formal hecha · nota /25 registrada (▲ SIM o --registrar) · cierre semanal corrido (override de la semana siguiente) · 1-3 APEX creados.`,
      planB: r ? `Si el enlace web no abre: en el PC ${r.local} (es el mismo fichero). Sin runner: Theomed · SIMULACROS MEDICINA o QX · Simulacros Virtuales (25Q mixtas a 72 s/Q), anotando la nota como /25.` : 'Runner sin generar: node DATA/_scripts/gen_encaps_minisim.js ' + fila.fecha + ' → node DATA/_scripts/sync_encaps_bp_web.js → node DATA/_scripts/gen_encaps_guia.js → deploy. Si no llega: QX · Simulacros Virtuales (25Q a 72 s/Q, nota /25).',
      ...(sab ? { aviso: [sab.nota, !r ? `runner minisim_${fila.fecha} por generar (node DATA/_scripts/gen_encaps_minisim.js ${fila.fecha}, o --semana ${sab.lunesSem})` : null].filter(Boolean).join(' · ') }
        : e.checkpoint || !r ? { aviso: [e.checkpoint, !r ? `runner minisim_${fila.fecha} por generar` : null].filter(Boolean).join(' · ') } : {}),
    };
    ses = { fecha: fila.fecha, dia: fila.dia, tipo: 'minisim', codigo: null, subEje: null, secundarios: cola, eval: null, principal: r ? { f: r.f, url: r.url, local: r.local, n: r.n } : null, pretest: null, obsidian: obsCola[0] ? obsCola[0].url : null, proyecto: CAT.PROYECTO.LOPEZ };
    if (!sab) TABLA.push({ fecha: fila.fecha, dia: fila.dia, tipo: 'MINI-SIM', principal: `25Q (${recTxt}) · cola ${cola.join(' + ')}`, eval: '—', runners: r ? r.f : 'POR GENERAR', material: matCola.map((m) => m.t).join(' · '), obs: obsCola.map((o) => o.t).join(' · '), proyecto: CAT.PROYECTO.LOPEZ.t });
  } else {
    const codigo = fila.codigo; const subEje = e.sub_eje || null; const subLbl = e.sub_eje_label || fila.subtema;
    const area = CAT.AREA[romano(codigo)];
    const obs = obsidianDe(codigo, subEje);
    const proyecto = proyectoDe(codigo);
    const ePrev = rEval ? evalDesc(rEval, fila, prev) : null;
    const rPre = runner(`pretest_arranque_${fila.fecha}`);

    if (rPre) {
      const pm = rPre.meta; const cods = pm.codigos || Object.keys(rPre.porCod);
      const prox = cods.map((c) => { const p = proximaDe(c.split('+')[0], fila.dia); return p ? `${c} ${corta(p.fecha)}` : `${c} (sin banco en F1)`; });
      const obsCods = cods.map((c) => obsidianDe(c.split('+')[0], null)).filter(Boolean);
      const matCods = cods.flatMap((c) => materialDe(c.split('+')[0], null).items.slice(0, 1).map((m) => ({ ...m, t: `${c} · ${m.t}` })));
      g = {
        franja: sab ? sab.franja : FRANJA, plan: 'encaps',
        titulo: `D${fila.dia} · 🧪 PRE-TEST DE ARRANQUE parte ${pm.parte}/${pm.de} · 20Q (${cods.join(' · ')}) a 72 s/Q + eval 5Q`,
        totalMin: 60,
        pasos: [
          PASO_ARRANQUE([rEval, rPre]),
          { min: 10, que: `EVAL ANCLADA · ${ePrev || '5Q'} — ${rEval ? rEval.f : 'sin runner'}`, como: 'De memoria y sin material: 72 s/Q (6′) → al final lee la solución de cada fallo (4′) y escribe la regla en 1 línea. Si fallas ≥2, ese código queda CALIENTE para el override del viernes (no cambia el tema de mañana).', ...(rEval ? { enlace: enlaceRunner(rEval, 'Eval 5Q') } : {}) },
          { min: 24, que: `PRE-TEST DE ARRANQUE parte ${pm.parte}/${pm.de} · ${rPre.n}Q CIEGAS (${cods.map((c) => `${rPre.porCod[c] || 5} × ${c}`).join(' · ')}) · ítems REALES con clave oficial 2024-2A / 2025-1A / 2025-2 — ${rPre.f}`,
            como: `MODO EXAMEN: 72 s/Q = 24′ sin pausa y sin material; la solución sale solo al final. Es tu LÍNEA BASE ciega por crítico: marca la confianza real (no «para quedar bien»). ${CAT.TECNICA_SIM.como(rPre.n, 24, 2, rPre.seg || 72)}`, enlace: enlaceRunner(rPre, 'Pre-test') },
          { min: 15, que: 'Corrección del pre-test: cada fallo y cada «dudosa»', como: `Lee la explicación y la fuente del runner; clasifica (knowledge: CONCEPTO · OLVIDO · CRONOLOGIA / transfer: CCSN · CONTEXTO / proceso: CAMBIO · TIEMPO · LECTURA) y escribe la regla en 1 línea. Hoy NO abres material del Drive: cada código se trabaja en su propia sesión de banco (${prox.join(' · ')}).` },
          { min: 5, que: 'Registro del pre-test: «Generar JSON» → --registrar --append', como: `En el PC: node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta del JSON descargado> --append → la ronda «pretest» se reparte por código (n = 5 por crítico para el override del ${LUNES_OVERRIDE}). Hoy NO uses el formulario CIERRE DE SESIÓN de la app: guardaría las 20Q como MIX.` },
          { min: 4, que: '1-3 APEX de los errores de CONOCIMIENTO (CONCEPTO / OLVIDO)', como: 'Cada APEX a la nota Obsidian del código fallado (las 4 notas en recursos) y a Anki APEX::ENCAPS: la regla corregida + la cifra exacta, en una frase.', ...(obsCods[0] ? { enlace: obsCods[0] } : {}) },
        ],
        recursos: [...recursoRunner(rEval, `Eval ${rEval ? rEval.f : ''}`), ...recursoRunner(rPre, `Pre-test ${rPre.f}`), ...obsCods, ...matCods],
        hecho: `Eval 5/5 y pre-test ${rPre.n}/${rPre.n} respondidos con confianza · JSON del pre-test registrado con --registrar --append · 1-3 APEX creados.`,
        planB: `Si el enlace web no abre: en el PC ${rPre.local}${rEval ? ` y ${rEval.local}` : ''} (son los mismos ficheros). El pre-test NO se sustituye por QX: es la línea base con clave oficial.`,
        aviso: `Hoy NO hay «banco ${codigo} + ${sec.map((s) => s.codigo).join(' + ')}»: el pre-test de arranque SUSTITUYE el banco del día (BANCO_PROPIO, _meta.sustituye; el horario no cambia). ${sec.map((s) => s.codigo).join(' + ')} (cola larga) entra en el mini-sim del ${corta((FILAS.find((x) => x.dia > fila.dia && x.tipo === 'mini_sim') || fila).fecha)}.`,
      };
      ses = { fecha: fila.fecha, dia: fila.dia, tipo: 'pretest', codigo, subEje, secundarios: sec.map((s) => s.codigo), eval: rEval ? { f: rEval.f, url: rEval.url, local: rEval.local, n: rEval.n } : null, principal: { f: rPre.f, url: rPre.url, local: rPre.local, n: rPre.n }, pretest: { parte: pm.parte, de: pm.de, codigos: cods, n: rPre.n }, obsidian: obsCods[0] ? obsCods[0].url : null, proyecto };
      if (!sab) TABLA.push({ fecha: fila.fecha, dia: fila.dia, tipo: `PRE-TEST ${pm.parte}/${pm.de}`, principal: `${rPre.n}Q ${cods.join(' · ')} (sustituye ${codigo} · ${subEje})`, eval: ePrev || '—', runners: [rEval && rEval.f, rPre.f].filter(Boolean).join(' + '), material: matCods.map((m) => m.t).join(' · '), obs: obsCods.map((o) => o.t).join(' · '), proyecto: '—' });
    } else {
      const rBan = runner(`banco_${fila.fecha}`);
      const prev2 = PREVISTO(fila.fecha);
      const secCods = sec.map((s) => s.codigo);
      const nPri = rBan ? (rBan.meta.conteos || {}).principal ?? rBan.porCod[codigo] : (prev2 ? prev2.principal : null);
      const nSec = rBan ? (rBan.meta.conteos || {}).secundario ?? 0 : (prev2 ? prev2.secundario : null);
      const porSub = rBan ? (rBan.meta.conteos || {}).por_sub_eje || {} : {};
      const mat = materialDe(codigo, subEje);
      const mat1 = mat.items[0];
      const matSec = secCods.flatMap((c) => materialDe(c, null).items.slice(0, 1).map((m) => ({ ...m, t: `${c} · ${m.t}` })));
      const obsSec = secCods.map((c) => obsidianDe(c, null)).filter(Boolean);
      const evalTxt = ePrev || (sab ? sab.evalSin : lunes ? '5Q REHECHAS con otro enfoque de los fallos del mini-sim del viernes' : `5Q del código de AYER ${prev && prev.codigo ? prev.codigo : ''} (3 cifras + 2 viñetas)`);
      const qPri = nPri != null ? `${nPri}Q` : '16-20Q';
      const qSec = nSec != null ? `${nSec}Q` : '4-5Q';
      const subTxt = Object.keys(porSub).length ? ` (${Object.entries(porSub).map(([k, v]) => `${v} ${k}`).join(' · ')})` : '';
      const pendiente = !rBan;
      const cmdSemana = (() => { const d = new Date(fila.fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); })();
      // v6.05 (fix 24-oct): el día de la regla = el ÚLTIMO DÍA DE PLAN antes del lunes (antes lunes − 3 fijo: para el lun 28-dic decía «el vie
      //   25-dic», que es SKIP → ahora jue 24-dic)
      const vieAnt = ultimoDiaPlanAntes(cmdSemana);
      g = {
        franja: sab ? sab.franja : FRANJA, plan: 'encaps',
        titulo: `${sab ? sab.etq : `D${fila.dia}`} · 🎯 BANCO ${codigo} · ${subLbl}${secCods.length ? ` + cola larga ${secCods.join(' + ')}` : ''}`,
        totalMin: 60,
        pasos: [
          PASO_ARRANQUE([rEval, rBan]),
          { min: 8, que: `EVAL ANCLADA · ${evalTxt} — ${rEval ? rEval.f : 'runner POR GENERAR'}`, como: sab ? 'De memoria y sin material: 72 s/Q (6′) + 2′ para leer la solución de cada fallo. Si fallas ≥2 de un código, queda CALIENTE en el registro (temas calientes de ENCAPS → Plan): no cambia el banco de hoy.'
            : 'De memoria y sin material: 72 s/Q (6′) + 2′ para leer la solución de cada fallo. Si fallas ≥2, ese código queda CALIENTE para el override del viernes (no cambia el tema de mañana).', ...(rEval ? { enlace: enlaceRunner(rEval, 'Eval 5Q') } : {}) },
          { min: 30, que: `BANCO DEL DÍA · ${qPri} CIEGAS de ${codigo} · sub-eje «${subLbl}»${subTxt} — ${rBan ? rBan.f : `banco_${fila.fecha} POR GENERAR${prev2 ? ` (previsto: ${CAT.PREVISTO_ORIGEN})` : ''}`}`,
            como: 'Pregunta a pregunta con corrección INMEDIATA (≈90 s/Q con la explicación): primero respondes y marcas confianza, después lees la clave y la fuente y recalibras (Palmerton). Meta crucero ≥75 % ciego.', ...(rBan ? { enlace: enlaceRunner(rBan, 'Banco') } : {}) },
          { min: 8, que: secCods.length ? `SECUNDARIO de cola larga · ${qSec} de ${secCods.join(' + ')} — ${sec.map((s) => s.subtema).join(' / ').slice(0, 160)}` : 'Sin secundario: 8′ más del banco principal (sub-ejes distintos)', como: secCods.length ? 'Las últimas preguntas del mismo runner, mismo método (corrección inmediata + confianza). Si el runner trae menos de 4, completa con el banco de respaldo (plan B) hasta 5.' : 'Mismo método.' },
          { min: 7, que: mat1 ? `MATERIAL — SOLO si fallaste ≥2 del principal: ${mat1.t}` : 'MATERIAL — solo si fallaste ≥2: compendio del área', como: 'Busca en el PDF SOLO la sección de tus fallos y copia la cifra o la definición exacta a la nota Obsidian del código. Si fallaste <2: usa estos 7′ para releer las explicaciones de tus «dudosas». Banco primero, material después (nunca al revés).', ...(mat1 ? { enlace: { t: `${mat1.tipo === 'mp4' ? 'Vídeo' : mat1.tipo === 'carpeta' ? 'Carpeta' : 'PDF'}`, url: mat1.url } } : {}) },
          { min: 3, que: `Registro de la sesión (n = ${nPri != null && nSec != null ? nPri + nSec : 'las del runner'})`, como: REGISTRO_RUNNER(rBan, sab ? sab.tipoCierre : 'banco del día') },
          { min: 2, que: '1-3 APEX de los errores de CONOCIMIENTO', como: `A la nota Obsidian del código (${codigo}) y a Anki APEX::ENCAPS: la regla corregida + la cifra exacta, en una frase.`, ...(obs ? { enlace: obs } : {}) },
        ],
        recursos: [...recursoRunner(rEval, `Eval ${rEval ? rEval.f : ''}`), ...recursoRunner(rBan, `Banco ${rBan ? rBan.f : ''}`), ...mat.items.slice(0, 4), ...matSec, ...(obs ? [obs] : []), ...obsSec, proyecto, ...(area ? [area.videoclases] : [])],
        hecho: `Eval 5/5 + ${qPri} de ${codigo}${secCods.length ? ` + ${qSec} de ${secCods.join(' + ')}` : ''} respondidas con confianza · sesión registrada por UNA vía (--registrar o CIERRE DE SESIÓN) · 1-3 APEX creados.`,
        planB: pendiente
          ? `Runner sin generar al empezar: (1) ${CAT.PLAN_B_QX.t} → área ${area ? area.nombre : ''} → ${qPri} del tema «${subLbl}» en modo estudio; (2) o en ${proyecto.t} pide «${qPri} tipo ENCAPS del sub-eje ${subEje || codigo}, 4 opciones, con la cita textual de la norma en cada clave»: esas NO cuentan para el % ciego hasta verificar la clave contra la fuente (gate §3-bis).${!rEval ? (sab ? ' Eval sin runner: en el mismo proyecto pide «5 preguntas nuevas sobre mis fallos previos del registro (te pego los enunciados), con otro escenario, sin repetir la pregunta».' : lunes ? ' Eval del lunes sin runner: en el mismo proyecto pide «5 preguntas nuevas sobre los conceptos que fallé en el mini-sim del viernes (te pego los enunciados), con otro escenario, sin repetir la pregunta».' : ` Eval sin runner: 5Q de ${prev && prev.codigo ? prev.codigo : 'ayer'} rehechas desde tus fallos de ayer (mismo proyecto, otro escenario).`) : ''} Respaldo de academia: ${CAT.POSTEST_DRLOPEZ.t} → ${CAT.POSTEST_DRLOPEZ.url}`
          : `Si el enlace web no abre: en el PC ${rBan.local}${rEval ? ` y ${rEval.local}` : ''}. Si el runner se queda corto: ${CAT.PLAN_B_QX.t} (mismo tema) o ${proyecto.t} (preguntas con cita textual; no cuentan para el % ciego hasta verificarlas).`,
        ...((() => {
          const av = [];
          // v6.03: si la semana ya tiene runners armados (p.ej. los re-fechados del lun 26 / mar 27-oct), --semana los re-sortearía → comandos del día
          const semanaArmada = [0, 1, 2, 3].map((k) => { const d = new Date(cmdSemana + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + k); return d.toISOString().slice(0, 10); })
            .some((f) => f !== fila.fecha && (fs.existsSync(path.join(BP, `banco_${f}.json`)) || fs.existsSync(path.join(BP, `eval_${f}.json`))));
          const cmdDia = [!rEval && !lunes ? `--eval ${fila.fecha}` : null, `--banco ${fila.fecha}`, !rEval && lunes ? `--eval ${fila.fecha}` : null].filter(Boolean).map((x) => `node DATA/_scripts/gen_encaps_minisim.js ${x}`).join(' → ');
          if (sab) av.push(sab.nota); // v6.06 (fix): nota de reposición del carril SÁBADO
          if (pendiente && sab) av.push(semanaArmada // v6.06 (fix): el sábado se arma con su semana del carril B (--semana) o solo (--eval / --banco del sábado)
            ? `Runners por generar ANTES del ${corta(fila.fecha)}: node DATA/_scripts/gen_encaps_minisim.js --eval ${fila.fecha} → node DATA/_scripts/gen_encaps_minisim.js --banco ${fila.fecha} → node DATA/_scripts/sync_encaps_bp_web.js → node DATA/_scripts/gen_encaps_guia.js → deploy (NO --semana ${cmdSemana}: la semana del carril B ya tiene runners armados y los re-sortearía).`
            : `Runners por generar ANTES del ${corta(fila.fecha)}: node DATA/_scripts/gen_encaps_minisim.js --semana ${cmdSemana} (con el carril B lun-jue arma también el sábado: eval_ + banco_${fila.fecha}) → node DATA/_scripts/sync_encaps_bp_web.js → node DATA/_scripts/gen_encaps_guia.js → deploy.`);
          else if (pendiente) av.push(semanaArmada
            ? `Runners por generar ANTES del ${corta(cmdSemana)} (regla: el ${corta(vieAnt)}, tras el mini-sim): ${cmdDia} → node DATA/_scripts/sync_encaps_bp_web.js → node DATA/_scripts/gen_encaps_guia.js → deploy (NO --semana ${cmdSemana}: la semana ya tiene runners armados y los re-sortearía).`
            : `Runners por generar ANTES del ${corta(cmdSemana)} (regla: el ${corta(vieAnt)}, ≥5 sesiones de stock): node DATA/_scripts/gen_encaps_minisim.js --semana ${cmdSemana}${lunes ? ` + --eval ${fila.fecha}` : ''} → node DATA/_scripts/sync_encaps_bp_web.js → node DATA/_scripts/gen_encaps_guia.js → deploy.`);
          if (prev2 && prev2.nota) av.push(prev2.nota);
          if (rBan && (rBan.meta.avisos || []).length) av.push(...rBan.meta.avisos.map(String));
          for (const c of [codigo, ...secCods]) if (CAT.AVISO_CODIGO[c]) av.push(CAT.AVISO_CODIGO[c]);
          if (mat.fuente !== 'drive') av.push(`${codigo} · ${subEje}: sin fichero del Drive inventariado para este sub-eje → material = ${mat.fuente === 'fichas' ? 'fichas MINSA del sub-eje + compendio del área' : 'compendio + videoclases del área (ninguna ficha MINSA del código trata este sub-eje)'}.`);
          return av.length ? { aviso: av.join(' · ') } : {};
        })()),
      };
      ses = { fecha: fila.fecha, dia: fila.dia, tipo: 'banco', codigo, subEje, secundarios: secCods, eval: rEval ? { f: rEval.f, url: rEval.url, local: rEval.local, n: rEval.n } : null, principal: rBan ? { f: rBan.f, url: rBan.url, local: rBan.local, n: rBan.n } : null, pretest: null, obsidian: obs ? obs.url : null, proyecto };
      if (!sab) TABLA.push({ fecha: fila.fecha, dia: fila.dia, tipo: 'BANCO', principal: `${qPri} ${codigo} · ${subEje} + ${qSec} ${secCods.join(' + ')}`, eval: evalTxt, runners: [rEval ? rEval.f : 'eval POR GENERAR', rBan ? rBan.f : 'banco POR GENERAR'].join(' + '), material: [mat1 && mat1.t, ...matSec.map((m) => m.t)].filter(Boolean).join(' · '), obs: obs ? obs.t : '—', proyecto: proyecto.t });
    }
  }
  // recursos: solo los campos de GuiaRecurso y sin URLs repetidas
  const vistos = new Set();
  g.recursos = g.recursos.filter((r) => r && !vistos.has(r.url) && vistos.add(r.url)).map((r) => ({ t: r.t, url: r.url, ...(r.min != null ? { min: r.min } : {}), ...(r.cantidad ? { cantidad: r.cantidad } : {}) }));
  // validación (misma regla que src/lib/guia.ts validarGuia) · v6.06 (fix): + la FRANJA dura 60′ (16:15–17:15 · sáb 09:30–10:30)
  const sum = g.pasos.reduce((a, p) => a + p.min, 0);
  const mf = (/^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/.exec(g.franja) || []).slice(1).map(Number);
  const durFranja = mf.length === 4 ? (mf[2] * 60 + mf[3]) - (mf[0] * 60 + mf[1]) : NaN;
  if (sum !== 60 || g.totalMin !== 60 || durFranja !== 60) aborta(`D${fila.dia} ${fila.fecha}: Σ pasos ${sum} · totalMin ${g.totalMin} · franja «${g.franja}» (${durFranja}′) ≠ 60`);
  g.pasos.forEach((p, i) => { if (!Number.isInteger(p.min) || p.min < 1 || !p.que || !p.como) aborta(`D${fila.dia} paso ${i + 1} incompleto`); if (p.enlace && !/^(https?:|file:|obsidian:)/.test(p.enlace.url)) aborta(`D${fila.dia} paso ${i + 1}: enlace no válido`); });
  g.recursos.forEach((r, i) => { if (!/^(https?:|file:|obsidian:)/.test(r.url)) aborta(`D${fila.dia} recurso ${i + 1}: URL no válida`); });
  return { g, ses };
}
for (const fila of FILAS) { const { g, ses } = construirGuia(fila); GUIA[fila.fecha] = g; SES[fila.fecha] = ses; }

// ── v6.06 (fix) · GUÍA DEL CARRIL SÁBADO (09:30–10:30): las 5 sesiones F1 que pasaron al carril SÁBADO de la intensiva (sáb 9, 16, 23, 30-ene
//    y 6-feb = fila mant. 44, 45, 46, 47 y 40 de la F1 v6.05) habían perdido su guía «qué · cuánto · cómo» (en la v6.05 tenían su GuiaBloque de
//    60′ con 5-7 pasos). Misma receta que en F1 (construirGuia) con la franja, el rótulo, la eval y el cierre del sábado + nota de reposición +
//    runner del SÁBADO si existe (eval_/banco_/minisim_<sábado>: gen_encaps_minisim.js --semana <lunes>). Clave = el sábado.
const GUIA_SAB = {}; const SES_SAB = {};
const HOST_TXT = { pretest: 'PRE-TEST 2026-II 100Q', sim100: 'SIM 100Q', dress_rehearsal: 'DRESS REHEARSAL' };
for (const [fecha, s] of Object.entries(SABADOS)) {
  const { p, hostTipo } = SAB_CTX[fecha];
  const lunesSem = (() => { const d = new Date(fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - 5); return d.toISOString().slice(0, 10); })();
  const hostTxt = HOST_TXT[hostTipo] || hostTipo;
  const sab = {
    franja: `${s.ini}–${s.fin}`, simN: s.simN, host: s.host, hostTxt, lunesSem,
    etq: `🔁 REPOSICIÓN F1 · mant. ${s.diaMant} de la ${s.origen}`,
    evalSin: `5Q de FALLOS PREVIOS del registro (otro enfoque, críticos primero: ayer, ${corta(s.host.fecha)}, fue el ${hostTxt}, sin banco de un código)`,
    tipoCierre: `«Carril B 16:15» (el sábado ENCAPS → Plan abre la fila del ${corta(s.host.fecha)}, D${s.host.dia}, y el cierre sale con la fecha del sábado)`,
    nota: `REPOSICIÓN F1 (${s.corrimiento}) · CARRIL SÁBADO ${s.ini}-${s.fin}: fila mant. ${s.diaMant} de la ${s.origen} (${corta(s.fechaOriginal)}) que no cupo en la F1 tras el corrimiento ni en los días de reposición lun-jue del carril B; ítems en ENCAPS → Plan, fila del ${corta(s.host.fecha)} (D${s.host.dia}, claves s_*)`,
  };
  const fila = { dia: s.host.dia, fecha, tipo: p.tipo, codigo: p.codigo || null, subtema: p.subtema, temas_secundarios: p.temas_secundarios || [], extra: p.extra || {} };
  const { g, ses } = construirGuia(fila, sab);
  GUIA_SAB[fecha] = g; SES_SAB[fecha] = ses;
}
// controles del carril SÁBADO: cada sábado de SABADOS tiene su guía (franja = la del carril, rótulo y nota de reposición) y su sesión (dia del
//   viernes host, tipo y código = los del pendiente; el mini-sim con su sim_n) · y TodayMission la devuelve en el bloque encaps-sab
for (const [fecha, s] of Object.entries(SABADOS)) {
  const g = GUIA_SAB[fecha], ses = SES_SAB[fecha];
  if (!g || !ses) aborta(`carril SÁBADO ${fecha}: sin guía «qué · cuánto · cómo»`);
  if (g.franja !== `${s.ini}–${s.fin}` || !g.titulo.startsWith('🔁 REPOSICIÓN F1') || !String(g.aviso || '').includes(`REPOSICIÓN F1 (${s.corrimiento}) · CARRIL SÁBADO`)) aborta(`carril SÁBADO ${fecha}: franja «${g.franja}» / rótulo / nota de reposición`);
  if (ses.dia !== s.host.dia || ses.tipo !== (s.tipo === 'mini_sim' ? 'minisim' : 'banco') || (s.tipo === 'mini_sim' ? !g.titulo.includes(`sim_n ${s.simN}`) : ses.codigo !== s.codigo)) aborta(`carril SÁBADO ${fecha}: sesión ≠ pendiente (dia ${ses.dia}/${s.host.dia} · tipo ${ses.tipo}/${s.tipo} · código ${ses.codigo}/${s.codigo})`);
  if (GUIA[fecha]) aborta(`carril SÁBADO ${fecha}: choca con una sesión de F1`);
}
// control de la APP (src/lib/encapsPlan.ts cargado en node con react / ./supabase de stub): en la fila de cada viernes host, las tareas del carril
//   SÁBADO (D{dia}:s_*) existen, NO cuentan en el total del viernes y SÍ el propio sábado (itemsDelTotal) · y useEncapsPlan calcula
//   totalToday/doneToday con itemsDelTotal (antes todayItems.length: el viernes host nunca llegaba al 100 %)
if (Object.keys(SABADOS).length) {
  const EP = cargarModuloTS(path.join('src', 'lib', 'encapsPlan.ts'), new Map(), { react: {}, './supabase': { supabase: {} } });
  for (const [fecha, s] of Object.entries(SABADOS)) {
    const day = SAB_CTX[fecha].host;
    const items = EP.itemsForDay(day, {}, null, null);
    const nSab = items.filter((it) => EP.esClaveSabado(it.key)).length;
    const tVie = EP.itemsDelTotal(day, items, s.host.fecha), tSab = EP.itemsDelTotal(day, items, fecha);
    if (!nSab || tVie.some((it) => EP.esClaveSabado(it.key)) || tVie.length !== items.length - nSab || tSab.length !== items.length) aborta(`app · carril SÁBADO ${fecha}: total del viernes host D${s.host.dia} ${tVie.length}/${items.length} (s_* ${nSab}) · el sábado ${tSab.length}/${items.length}`);
  }
  const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'encapsPlan.ts'), 'utf8');
  if (!/itemsDelTotal\(today, todayItems, hoyISO\)/.test(src) || !/const totalToday = itemsTotal\.length;/.test(src)) aborta('app · encapsPlan.useEncapsPlan: totalToday / doneToday no salen de itemsDelTotal (las tareas del sábado volverían al total del viernes)');
}
{
  const tm = fs.readFileSync(path.join(ROOT, 'src', 'components', 'home', 'TodayMission.tsx'), 'utf8');
  if (Object.keys(SABADOS).length && !/b\.id === 'encaps-sab'[\s\S]{0,600}guiaEncapsSabadoDe\(/.test(tm)) aborta('TodayMission.tsx: el bloque encaps-sab no devuelve guiaEncapsSabadoDe(iso) como guías (carril SÁBADO sin «qué · cuánto · cómo» en el Home)');
}
function PREVISTO(fecha) { return CAT.PREVISTO_SEMANA2[fecha] || null; }

// ── emisión ───────────────────────────────────────────────────────────────────────────────────────────────────
const conRunner = Object.values(SES).filter((s) => s.principal && s.principal.url).length;
// v6.05 (fix 24-oct): version = la del JSON de fechas (_fechas_v6.json · version) y generado = la fecha REAL de generación en Lima (UTC−5),
//   no las del último corrimiento. El --check y la escritura comparan SIN esa fecha (como gen_research_plan.js): regenerar sin cambios de
//   contenido no reescribe el fichero y conserva su fecha.
const HOY_LIMA = new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10);
const META = {
  version: F6.version, generado: HOY_LIMA, fuente: 'DATA/_scripts/gen_encaps_guia.js + encaps_guia_catalogo.js · ' + cabSql.slice(0, 120),
  sesiones: FILAS.length, conRunnerPublicado: conRunner, web: WEB, carrilSabado: Object.keys(GUIA_SAB).length,
  reparto: { pretest: '2 arranque · 10 eval 5Q · 24 pre-test 20Q · 15 corrección · 5 registro · 4 APEX', banco: '2 arranque · 8 eval 5Q · 30 banco principal · 8 secundario · 7 material (solo si ≥2 fallos) · 3 registro · 2 APEX', minisim: '2 arranque · 30 mini-sim 25Q · 18 corrección · 5 registro + cierre semanal · 5 APEX + material de los calientes' },
  tecnicaSimulacro: CAT.TECNICA_SIM.doc,
};
// tabla de textos repetidos (≥24 caracteres y ≥2 apariciones) → el .ts pesa la mitad
const _cnt = new Map();
const _walk = (v) => { if (typeof v === 'string') { if (v.length >= 24) _cnt.set(v, (_cnt.get(v) || 0) + 1); } else if (Array.isArray(v)) v.forEach(_walk); else if (v && typeof v === 'object') Object.values(v).forEach(_walk); };
_walk(GUIA); _walk(GUIA_SAB);
const TABLA_TXT = [..._cnt].filter(([, n]) => n >= 2).map(([t]) => t);
const _idx = new Map(TABLA_TXT.map((t, i) => [t, i]));
const _rep = (v) => (typeof v === 'string' ? (_idx.has(v) ? { $: _idx.get(v) } : v) : Array.isArray(v) ? v.map(_rep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, _rep(x)])) : v);
const GUIA_COMPRIMIDA = _rep(GUIA);
const GUIA_SAB_COMPRIMIDA = _rep(GUIA_SAB);
const ts = `/**
 * encapsGuia.ts — GUÍA «qué · cuánto · cómo» de la hora ENCAPS ${FRANJA} de CADA sesión del mantenimiento F1 (dia 1-${FILAS.length}, ${FILAS[0].fecha} →
 * ${FILAS[FILAS.length - 1].fecha}), en el formato común \`GuiaBloque\` (src/lib/guia.ts). Lo pintan EncapsPlanView (HOY → 🧭 Guía de la hora) y la
 * tarjeta ENCAPS del Home; encapsPlan.itemsMantenimiento toma de aquí los runners del día (y el PRE-TEST DE ARRANQUE del ${[...PRETEST_FECHAS].sort().map(corta).join(' / ')}).
 * GENERADO por DATA/_scripts/gen_encaps_guia.js (catálogo: encaps_guia_catalogo.js) — NO editar a mano:
 *   node DATA/_scripts/sync_encaps_bp_web.js && node DATA/_scripts/gen_encaps_guia.js   (· --check compara)
 * Fuentes: filas del SQL vigente (_encaps_mantenimiento_2027.sql = Supabase; no cambia fechas, dia ni códigos del régimen ${META.version}) · runners de
 * DATA/ENCAPS/BANCO_PROPIO publicados en ${WEB} (public/encaps/bp) · material del Drive del 18-oct por código · nota Obsidian del CÓDIGO ·
 * proyecto de Claude del área. Una sesión cuya fila de Supabase no cuadre (dia/código) con la de aquí NO usa la guía (sesionEncapsCuadra).
 * v6.02c (18-oct-2026, E4): nuevo. · ${META.version} (generado ${META.generado}): F1 dia 1-${FILAS.length} desde el ${corta(FILAS[0].fecha)}${CORR ? ` (corrimiento D1 ${corta(CORR.d1_previo)} → ${corta(CORR.d1)}: ${CORR.perdidos.length} hábiles sin estudio; runners re-fechados por sesión)` : ''}.
 */
import type { GuiaBloque } from './guia';

export interface EncapsRunnerRef { f: string; url: string | null; local: string; n: number }
export interface EncapsSesionGuia {
  fecha: string; dia: number; tipo: 'pretest' | 'banco' | 'minisim'; codigo: string | null; subEje: string | null; secundarios: string[];
  eval: EncapsRunnerRef | null; principal: EncapsRunnerRef | null;
  pretest: { parte: number; de: number; codigos: string[]; n: number } | null;
  obsidian: string | null; proyecto: { t: string; url: string };
}

export const ENCAPS_GUIA_META = ${JSON.stringify(META, null, 2)};

const S: Record<string, EncapsSesionGuia> = ${JSON.stringify(SES)};

// Tabla de textos repetidos (los pasos se repiten en ${FILAS.length} sesiones): un {"$": i} en RAW es T[i]. Se decodifica una vez al cargar.
const T: string[] = ${JSON.stringify(TABLA_TXT)};
const RAW: unknown = ${JSON.stringify(GUIA_COMPRIMIDA)};
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
const G = dec(RAW) as Record<string, GuiaBloque>;

/**
 * v6.06: CARRIL SÁBADO de la intensiva (${Object.values(SABADOS).length ? `${Object.values(SABADOS)[0].ini}-${Object.values(SABADOS)[0].fin}, ${Object.keys(SABADOS).map(corta).join(' · ')}` : 'sin filas'}) = pendientes F1 que no caben en
 * los días de reposición lun-jue del carril B. Viaja en extra.carril_sabado de la fila INTENSIVO del VIERNES host (el sábado no tiene dia
 * propio; claves de la app D{dia del viernes}:s_*). Clave = el SÁBADO. Lo usa plantillasV6 (bloque ENCAPS del sábado F2); los ítems salen de la
 * fila viva (encapsPlan.carrilSabadoDe).
 */
export interface EncapsSabadoF2 {
  fecha: string; host: { dia: number; fecha: string }; ini: string; fin: string; tipo: 'banqueo1h' | 'mini_sim'; codigo: string | null; subEje: string | null;
  subtema: string; secundarios: string[]; colaLarga: string[]; simN: number | null; corrimiento: string; diaMant: number; fechaOriginal: string; origen: string;
}
const SAB: Record<string, EncapsSabadoF2> = ${JSON.stringify(SABADOS)};
/** Pendiente F1 del carril SÁBADO (09:30-10:30) de una fecha ISO, o null. */
export function encapsSabadoDe(fecha: string): EncapsSabadoF2 | null { return SAB[fecha.slice(0, 10)] ?? null; }
export const ENCAPS_SABADO_FECHAS: string[] = Object.keys(SAB);
// v6.06 (fix): GUÍA «qué · cuánto · cómo» del CARRIL SÁBADO (la receta de 60′ de F1 en la franja del sábado, con nota de reposición y el runner
// del sábado si existe) y su sesión (dia = el del viernes host; runners eval_/banco_/minisim_<sábado>). La devuelve TodayMission (encaps-sab).
const SS: Record<string, EncapsSesionGuia> = ${JSON.stringify(SES_SAB)};
const GS = dec(${JSON.stringify(GUIA_SAB_COMPRIMIDA)}) as Record<string, GuiaBloque>;
/** Guía del CARRIL SÁBADO de una fecha ISO (el sábado), o null. */
export function guiaEncapsSabadoDe(fecha: string): GuiaBloque | null { return GS[fecha.slice(0, 10)] ?? null; }
/** Sesión (runners · Obsidian · proyecto) del CARRIL SÁBADO de una fecha ISO (el sábado), o null. */
export function sesionEncapsSabadoDe(fecha: string): EncapsSesionGuia | null { return SS[fecha.slice(0, 10)] ?? null; }
/** ¿La fila viva del VIERNES host (Supabase) es la del carril SÁBADO de la guía? (mismo dia del host y mismo código; mini-sim sin código). */
export function sabadoEncapsCuadra(fecha: string, hostDia: number, codigo: string | null | undefined): boolean {
  const s = SAB[String(fecha).slice(0, 10)];
  return !!s && s.host.dia === hostDia && (s.tipo === 'mini_sim' ? !codigo : s.codigo === (codigo || null));
}

/** Sesión ENCAPS (16:15) de una fecha ISO, o null. */
export function sesionEncapsDe(fecha: string): EncapsSesionGuia | null { return S[fecha.slice(0, 10)] ?? null; }
/** ¿La fila viva (Supabase) es la misma sesión que la guía? (mismo dia y código; un corrimiento futuro la invalida hasta regenerar). */
export function sesionEncapsCuadra(fecha: string, dia: number, codigo: string | null | undefined): boolean {
  const s = S[String(fecha).slice(0, 10)];
  return !!s && s.dia === dia && (s.tipo === 'minisim' ? !codigo : s.codigo === (codigo || null));
}
/** Guía de la hora ENCAPS de una fecha ISO, o null (fuera de F1, fin de semana o día sin sesión). */
export function guiaEncapsDe(fecha: string): GuiaBloque | null { return G[fecha.slice(0, 10)] ?? null; }
export const GUIA_ENCAPS_FECHAS: string[] = Object.keys(G);
`;

// v6.05 (fix): controles nuevos — (1) ningún aviso de runners cita un día SKIP / protegido / fin de semana como «día de la regla»;
//   (2) META.version = _fechas_v6.json version. Antes el aviso del lun 28-dic decía «el vie 25-dic» (SKIP).
for (const [f, g] of Object.entries(GUIA)) {
  for (const m of String(g.aviso || '').matchAll(/\(regla: el (\S+ \d+-\w+),/g)) {
    const [, dm] = m[1].split(' '); const [dd, mm] = dm.split('-');
    const y = Number(f.slice(0, 4)) - (MES.indexOf(mm) > Number(f.slice(5, 7)) - 1 ? 1 : 0); // la regla cae antes de la sesión (dic → ene)
    const fecha = `${y}-${String(MES.indexOf(mm) + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
    if (corta(fecha) !== m[1]) aborta(`${f}: el aviso de runners cita «el ${m[1]}», que no cuadra con el calendario (${fecha})`);
    if (NO_PLAN.has(fecha) || [0, 6].includes(new Date(fecha + 'T12:00:00Z').getUTCDay())) aborta(`${f}: el aviso de runners cita «el ${m[1]}» (${fecha}), que no es día de plan`);
  }
}
if (META.version !== F6.version) aborta(`ENCAPS_GUIA_META.version ${META.version} ≠ _fechas_v6.json ${F6.version}`);
// v6.06 (fix): los EJEMPLOS de la tabla «Cómo se consumen» de DATA/ENCAPS/BANCO_PROPIO/README.md (filas «| … | `--banco F` |» y «| … | `--eval F` |»)
//   son sesiones válidas del régimen vigente: --banco = banqueo1h de F1 sin pre-test de arranque · --eval = banqueo1h de mar-jue (antes decían
//   2026-10-28, que en la v6.06 ya no es día de plan). La bitácora del README (fechas de versiones anteriores) no se mira.
{
  const RM = path.join(BP, 'README.md');
  const malos = [];
  for (const [, op, f] of (fs.existsSync(RM) ? fs.readFileSync(RM, 'utf8') : '').matchAll(/^\| [^|\n]+ \| `--(banco|eval) (\d{4}-\d\d-\d\d)` \|/gm)) {
    const r = FILAS.find((x) => x.fecha === f), wd = new Date(f + 'T12:00:00Z').getUTCDay();
    if (!r || r.tipo !== 'banqueo1h' || (op === 'banco' ? PRETEST_FECHAS.has(f) : wd < 2 || wd > 4)) malos.push(`--${op} ${f}`);
  }
  if (malos.length) aborta(`BANCO_PROPIO/README.md: ejemplos que no son sesiones válidas de la ${F6.version}: ${malos.join(' · ')}`);
}
const sinGen = (s) => s.replace(/("generado": ")20\d\d-\d\d-\d\d(")/g, '$1$2').replace(/(\(generado )20\d\d-\d\d-\d\d(\))/g, '$1$2');
if (CHECK) {
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (sinGen(old) !== sinGen(ts)) { console.error('✗ src/lib/encapsGuia.ts no coincide con lo que genera gen_encaps_guia.js'); process.exit(1); }
  console.log(`OK — src/lib/encapsGuia.ts al día (${FILAS.length} sesiones · ${conRunner} con runner publicado · carril SÁBADO ${Object.keys(GUIA_SAB).length} guías)`);
} else {
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (old && sinGen(old) === sinGen(ts)) console.log(`= src/lib/encapsGuia.ts (sin cambios de contenido; conserva su fecha de generación)`);
  else { fs.writeFileSync(OUT, ts); console.log(`✓ src/lib/encapsGuia.ts (${FILAS.length} sesiones · ${conRunner} con runner publicado · carril SÁBADO ${Object.keys(GUIA_SAB).length} guías · ${Math.round(ts.length / 1024)} KB)`); }
}
if (avisos.length) console.warn([...new Set(avisos)].map((a) => '⚠ ' + a).join('\n'));
if (!vaultMontado) console.warn('⚠ vault de Obsidian no montado: no se comprobó que las notas existan');

if (INFORME) {
  const L = ['| Fecha | D | Tipo | Qué (principal) | Eval 16:15 | Runner(s) | Material del Drive / fichas | Obsidian | Proyecto Claude |', '|---|---|---|---|---|---|---|---|---|'];
  const finSem2 = (() => { const d = new Date(FILAS[0].fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) + 11); return d.toISOString().slice(0, 10); })(); // v6.05: viernes de la semana 2
  for (const t of TABLA.filter((x) => x.fecha <= finSem2)) L.push(`| ${corta(t.fecha)} | ${t.dia} | ${t.tipo} | ${t.principal} | ${t.eval} | ${t.runners} | ${t.material} | ${t.obs} | ${t.proyecto} |`);
  fs.writeFileSync(INFORME, L.join('\n') + '\n');
  console.log('✓ informe ' + INFORME);
}
