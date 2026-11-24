// journal_hoy.js — crea/abre la entrada del día en el synapse-journal (vacío 2 de gaps_v3b_synapse.json).
//
// El journal es un repo local aparte: D:/synapse-journal (README con el ciclo 5/35/5; una nota por SEMANA ISO en
// journal/<YYYY>-W<ww>.md; el remoto privado lo crea Joseph: gh repo create synapse-journal --private --source=D:/synapse-journal).
// Cada día del vibecoding (04:15) cierra con 5' aquí: objetivo · qué construí · commit/URL · qué aprendí ·
// % del código que entiendo · bloqueo · freno 04:55 (commit selectivo o nota de estado; nunca git stash) · hora de la 1ª review de Anki.
//
// Qué hace:
//   1) Calcula la semana ISO de la fecha (hoy o --fecha) y crea journal/<semana>.md desde la plantilla si no existe
//      (cabecera con la semana del Step 1, el proyecto S<n> de la semana leído de src/lib/vibecodingPlan.ts y sus criterios).
//   2) Añade la sección del día ("## Lun 14-sep · D1 · S1 · <proyecto>") si aún no está, con los 6 campos + freno. El domingo de SHIP (o de PC opcional
//      del taper) sin paso del proyecto no lleva sección: se escribe en «Cierre de semana».
//   3) --abrir: abre el fichero en VS Code (code) o, si no hay `code`, con el programa por defecto de Windows.
//
// Uso:
//   node DATA/_scripts/journal_hoy.js                 # entrada de hoy (crea lo que falte) e imprime la ruta
//   node DATA/_scripts/journal_hoy.js --abrir         # + abre el fichero
//   node DATA/_scripts/journal_hoy.js --fecha 2026-09-14 --print
// Variables: SYNAPSE_JOURNAL (ruta del repo; default D:/synapse-journal). Sin dependencias.
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const JOURNAL = (process.env.SYNAPSE_JOURNAL || 'D:/synapse-journal').replace(/\\/g, '/');
const argv = process.argv.slice(2);
const has = (k) => argv.includes(k);
const arg = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };

const pad = (n) => String(n).padStart(2, '0');
const hoy = new Date();
const REAL = arg('--fecha', `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`);
if (!/^20\d\d-\d\d-\d\d$/.test(REAL)) throw new Error('--fecha inválida (YYYY-MM-DD): ' + REAL);
// v6.06e: la guía y el botón 📓 usan la fecha de plan → el fichero, el proyecto y el paso del día salen de ella
const _V6 = require('./gen_fechas_v6');
// v6.10y (lun 23-nov-2026): + el alias PROPIO del vibecoding (corrida_s1.alias_frente: S1 corre una sesión, mar 24 = plan del mié 18 … vie 27 = plan del lun 23)
//   y el domingo cuyo SHIP absorbe un paso (en_ship: dom 29-nov = el paso 5 de S1, que va primero dentro del SHIP) → su sección es la de ese paso
const _F6 = _V6.cargarFechasV6();
// v6.11 (mar 24-nov-2026): el SHIP del domingo puede absorber VARIOS pasos (en_ship = lista, en orden: dom 29-nov = los pasos 4 y 5 de S1) → una sección
//   por paso, en ese orden (FECHAS_SEC, abajo); FECHA = el primero (semana, cabecera y proyecto salen de él)
const PASOS_SHIP = _V6.enShipDe(REAL, _F6, 'vibecoding');
const FECHA = PASOS_SHIP[0] || _V6.fechaPlanDe(REAL, _F6, 'vibecoding');
// v6.07d: la cabecera del journal dice los días REALES del proyecto y de su SHIP (con la semana corrida no son los de plan)
const _REAL = (f) => _V6.fechaRealDe(f, _V6.cargarFechasV6(), 'vibecoding');
// v6.10w (pendientes de la revisión): un día REAL sin sesión (corrida_s1.sin_sesion: del lun 16 al dom 22-nov) no tiene vibecoding: fechaPlanDe lo da
//   como la próxima fecha de plan (mié 18-nov), que se hace otro día real (lun 23) → escribir su sección hoy la DUPLICABA («## Mié 18-nov (hecho el Vie
//   20-nov)» y luego «(hecho el Lun 23-nov)»). Sin alias, ni reparto, ni extra del vibecoding ese día → no se escribe nada y se dice qué día real lo hace.
const _C1 = _F6.corrida_s1 || {};
const _own = (o, k) => !!o && Object.prototype.hasOwnProperty.call(o, k);
const SIN_SESION_HOY = (_C1.sin_sesion || []).includes(REAL) && !_own(_C1.alias, REAL) && !_own(_C1.reparto, REAL)
  && !(_V6.extraListaDe ? _V6.extraListaDe(REAL, _F6) : []).some((x) => x.frente === 'vibecoding');
if (SIN_SESION_HOY) {
  const r = _REAL(FECHA);
  console.log(`SIN SESIÓN ${REAL} (corrida_s1.sin_sesion ${_C1.version || ''}): hoy no hay vibecoding ni entrada en el journal · la próxima sesión (plan ${FECHA}) se hace el ${r}${r !== FECHA ? '' : ' (su propio día)'}: node DATA/_scripts/journal_hoy.js --fecha ${r}`);
  process.exit(0);
}
// v6.10y (revisión): con el alias PROPIO del vibecoding, el día real cuyo plan GLOBAL es una fecha que ese alias hace OTRO día (lun 23-nov: plan del mié 18, cuyo
//   paso 1/5 va el mar 24) no tiene vibecoding → escribir hoy esa sección la creaba con el día equivocado («## Mié 18-nov (hecho el Lun 23-nov)») y el mar 24 la
//   reutilizaba («sección de hoy ya existía») · v6.11 (mar 24-nov): igual un día real SIN SESIÓN del vibecoding (alias_frente.vibecoding.sin_sesion: el mar 24, cuyo
//   paso 1 va el mié 25): fechaPlanDe le da la fila del próximo día con sesión
const _AF = _V6.aliasFrenteDe(_F6, 'vibecoding');
// mar 24-nov-2026 (revisión): con --abrir, si ese paso va en la MISMA semana (lun-dom) que hoy, se crea el fichero de la semana (cabecera con los criterios de
//   aceptación + cierre) si falta y se abre, SIN sección de hoy (la del paso la añade su día real): así el journal de la semana existe desde hoy (el recall del
//   SYNAPSE de hoy va ahí) y el día del paso sigue escribiendo su sección como siempre
let SOLO_ABRIR = false;
if (_AF && !PASOS_SHIP.length && Object.values(_AF.alias).includes(FECHA) && _REAL(FECHA) !== REAL) {
  const _lun = (s) => { const d = new Date(s + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
  if (has('--abrir') && _lun(_REAL(FECHA)) === _lun(REAL)) {
    SOLO_ABRIR = true;
    console.log(`SIN VIBECODING ${REAL}: el paso de este plan (${FECHA}) va el ${_REAL(FECHA)} · --abrir: se crea (si falta) y se abre el journal de la semana, sin sección de hoy`);
  } else {
    console.log(`SIN VIBECODING ${REAL}: el paso de este plan (${FECHA}) va el ${_REAL(FECHA)} (corrida_s1.alias_frente.vibecoding) · hoy no se escribe nada: node DATA/_scripts/journal_hoy.js --fecha ${_REAL(FECHA)}`);
    process.exit(0);
  }
}

const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const toISO = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return toISO(d); };
const dow = (s) => fromISO(s).getUTCDay();
const fmt = (s) => `${WD[dow(s)]} ${s.slice(8, 10)}-${MES[Number(s.slice(5, 7)) - 1]}`;
function semanaISO(s) {
  const d = fromISO(s); const day = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - day + 3);
  const fy = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const w = 1 + Math.round(((d - fy) / 86400000 - 3 + ((fy.getUTCDay() + 6) % 7)) / 7);
  return d.getUTCFullYear() + '-W' + pad(w);
}
// ─── plan del vibecoding (regex sobre el TS generado; sin importar TS) ───
let VP = '';
try { VP = fs.readFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), 'utf8'); } catch { /* sin plan: journal genérico */ }
const D1 = (VP.match(/inicio:\s*'(\d{4}-\d{2}-\d{2})'/) || [])[1] || null;
// v6.10z-b: el paso, sin los escapes del literal de JS en una sola pasada (\\ → \, \" → ", \n → espacio): la ruta del test del parser va con barras invertidas
const unesc = (s) => s.replace(/\\(.)/g, (_, c) => (c === 'n' ? ' ' : c));
const DIAS = [...VP.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"[^"]+",semana:(\d+),proyecto:"([^"]+)",k:\d+,tipo:"([^"]+)",min:(\d+),deload:(true|false),paso:"((?:[^"\\]|\\.)*)"\}/g)]
  .map((m) => ({ d: +m[1], fecha: m[2], semana: +m[3], proyecto: m[4], tipo: m[5], min: +m[6], deload: m[7] === 'true', paso: unesc(m[8]) }));
// c38 (lun 23-nov): + pcSab (el domingo del PC en la app, vibePCDomingo; '' = sin PC; sin el campo, el del ship)
const PROY = [...VP.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)",rotacion:"[^"]+",deload:(?:true|false),ini:"(\d{4}-\d{2}-\d{2})",fin:"(\d{4}-\d{2}-\d{2})",ship:"(\d{4}-\d{2}-\d{2})"(?:,pcSab:"(\d{4}-\d{2}-\d{2}|)")?[\s\S]*?aceptacion:\[((?:"(?:[^"\\]|\\.)*",?)*)\]/g)]
  .map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), ini: m[4], fin: m[5], ship: m[6], pcSab: m[7] ?? m[6], aceptacion: [...m[8].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1].replace(/\\"/g, '"')) }));
const TAPER = [...VP.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)",tipo:"(mantenimiento|deload)",ini:"(\d{4}-\d{2}-\d{2})",fin:"(\d{4}-\d{2}-\d{2})",ship:"(\d{4}-\d{2}-\d{2})"(?:,pcSab:"(\d{4}-\d{2}-\d{2}|)")?/g)]
  .map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), tipo: m[4], ini: m[5], fin: m[6], ship: m[7], pcSab: m[8] ?? m[7], aceptacion: [] }));
const diaHoy = DIAS.find((x) => x.fecha === FECHA) || null;
// v6.11 (lun 23-nov, chat vibecoding): un día sin bloque de vibecoding DENTRO del plan (sábado, feriado, día protegido: su fecha de plan no tiene paso ni
//   SHIP) no escribe nada, igual que un día sin sesión: antes el sáb 28-nov creaba «## Sáb 28-nov» fuera del plan. Fuera del rango del plan (antes del
//   primer paso o tras el último SHIP) sigue la entrada libre de siempre.
// c38 (lun 23-nov, chat vibecoding): los domingos de SHIP del journal = los que la app pinta con bloque PC (vibePCDomingo de vibecodingPlan.ts → guiaShipDe):
//   el pcSab de un proyecto (SHIP) o de un taper de mantenimiento (PC opcional, 30′), en el día del SHIP (diaShip) y fuera de los días protegidos o sin
//   sesión. Un taper de deload total (PC de 0′: dom 28-mar, 4-abr y 11-abr-2027) no tiene bloque (plantillasV6 solo lo nombra en las notas) → no cuenta.
//   El rango del plan sigue cerrando en el último ship del .ts (esos domingos siguen dentro: no escriben nada).
//   Límite conocido (sin caso en el plan actual): un domingo de «avance» (proyecto en curso, sin SHIP) tampoco está en _ships → daría SIN VIBECODING.
const _setTS = (n) => { try { return JSON.parse((VP.match(new RegExp(`const ${n} = new Set<string>\\((\\[[^\\]]*\\])\\)`)) || [])[1] || '[]'); } catch { return []; } };
const _sinPC = new Set([..._setTS('VIBE_PROTEGIDOS'), ..._setTS('VIBE_SIN_SESION')]);
const _diaShip = Number((VP.match(/diaShip:\s*(\d)/) || [])[1] || 0);
const _conPC = (p) => !!p.pcSab && dow(p.pcSab) === _diaShip && !_sinPC.has(p.pcSab);
const _ships = new Set([...PROY, ...TAPER.filter((t) => t.tipo === 'mantenimiento')].filter(_conPC).map((p) => p.pcSab));
const _rango = DIAS.length ? [DIAS.map((x) => x.fecha).sort()[0], [...DIAS.map((x) => x.fecha), ...[...PROY, ...TAPER].map((p) => p.ship)].sort().pop()] : null;
if (!diaHoy && _rango && FECHA >= _rango[0] && FECHA <= _rango[1] && !_ships.has(FECHA)) {
  console.log(`SIN VIBECODING ${REAL}: ${fmt(REAL)} no tiene bloque de vibecoding en el plan (ni paso ni SHIP) · hoy no se escribe nada en el journal`);
  process.exit(0);
}
// v6.10q: la semana del journal = la del PROYECTO si el plan la fija (S1 entero en 2026-W47, también su SHIP del dom 29; = vibecodingPlan.vibeJournalSemanaDe de
//   la app); si no, la semana ISO de la fecha de plan. El lunes y el domingo de la cabecera, los de esa semana. v6.10u: la tabla sale del .ts generado
//   (VIBE_JOURNAL_SEMANA, { n: «YYYY-Www» }; gen_vibecoding_plan.js › JOURNAL_SEM), no de _fechas_v6.json
const _JSEM = (() => { try { return Object.fromEntries(Object.entries(JSON.parse((VP.match(/const VIBE_JOURNAL_SEMANA: Record<number, string> = (\{[^}]*\});/) || [])[1] || '{}')).map(([n, w]) => [`S${n}`, w])); } catch { return {}; } })();
const _sHoy = diaHoy ? diaHoy.semana : (PROY.find((p) => p.ship === FECHA) || {}).s;
const SEM = (_sHoy != null && _JSEM[`S${_sHoy}`]) || semanaISO(REAL); // v6.10w: la semana del DÍA REAL (S1 = lun 23 → vie 27-nov, 2026-W48)
const lunesDeSemana = (w) => { const [y, n] = w.split('-W').map(Number); const e4 = `${y}-01-04`; return addDays(addDays(e4, -((dow(e4) + 6) % 7)), (n - 1) * 7); };
const LUNES = SEM === semanaISO(REAL) ? addDays(REAL, -((dow(REAL) + 6) % 7)) : lunesDeSemana(SEM);
const DOMINGO = addDays(LUNES, 6);
// v6.10q: sin los días de un proyecto cuyo journal va en OTRA semana (S1 en 2026-W47: la cabecera del 2026-W48 es la de S2, no la de S1)
const semanaDias = DIAS.filter((x) => LUNES <= _REAL(x.fecha) && _REAL(x.fecha) <= addDays(LUNES, 4) && (!_JSEM[`S${x.semana}`] || _JSEM[`S${x.semana}`] === SEM)); // v6.10w: por día REAL
const proySemana = semanaDias.length ? (PROY.find((p) => p.s === semanaDias[0].semana) || TAPER.find((t) => t.s === semanaDias[0].semana) || null) : null;
const nStep1 = D1 ? Math.floor((fromISO(LUNES) - fromISO(D1)) / 86400000 / 7) + 1 : null;

// ─── fichero de la semana ───
const dir = path.join(JOURNAL, 'journal');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, SEM + '.md');
let creado = false;
const CIERRE = [
  '## Cierre de semana (domingo, tras el verify del SHIP)', // v6.10z-b (lun 23-nov): el SHIP es el domingo (PC del domingo), no el sábado
  '',
  '- shipped (verify): ☐ sí ☐ no · criterios __/4 · evidencia (commit/URL/test): ',
  '- lección de la semana (1 línea): ',
  '- Feynman del domingo (opcional, 3 líneas): ',
  '',
];
if (!fs.existsSync(file)) {
  const L = [];
  L.push(`# ${SEM} · ${fmt(LUNES)} → ${fmt(DOMINGO)} ${LUNES.slice(0, 4)}${nStep1 != null && nStep1 >= 1 && nStep1 <= 20 ? ` · Step 1 S${nStep1}/20` : ''}`);
  L.push('');
  if (proySemana) {
    L.push(`**Proyecto de la semana**: S${proySemana.s} · ${proySemana.nombre}${proySemana.tipo ? ` (taper · ${proySemana.tipo})` : ''} · ${_REAL(proySemana.ini) !== proySemana.ini || [0, 6].includes(dow(_REAL(proySemana.ini))) ? 'días' : 'L-V'} ${fmt(_REAL(proySemana.ini))} → ${fmt(_REAL(proySemana.fin))}${proySemana.tipo ? '' : ` · SHIP ${fmt(_REAL(proySemana.ship))} (PC del domingo, flexible) → \`node DATA/_scripts/verify_vibecoding.js ${proySemana.s}\``}`);
    if (proySemana.aceptacion.length) { L.push(''); L.push('Criterios de aceptación (definition of done):'); for (const a of proySemana.aceptacion) L.push(`- [ ] ${a}`); }
  } else {
    L.push('**Proyecto de la semana**: fuera del plan del vibecoding (src/lib/vibecodingPlan.ts) — semana libre o pre-D1.');
  }
  L.push('');
  L.push("> Ciclo diario 04:15-05:00: 5' objetivo → 35' construir → 5' esta entrada. **04:55 commit selectivo o nota de estado (nunca git stash) · 05:00 Anki sin excepción** (si el día se recorta pierde el proyecto, nunca el Anki). Commits `[S<n>] …`.");
  L.push('');
  L.push(...CIERRE);
  fs.writeFileSync(file, L.join('\n'), 'utf8');
  creado = true;
}

// ─── sección del día ───
let txt = fs.readFileSync(file, 'utf8');
const anadidas = []; // v6.11: secciones añadidas hoy (el SHIP que absorbe varios pasos añade una por paso)
// c38 (lun 23-nov, chat vibecoding): domingo de SHIP o de PC opcional del taper SIN paso que absorber (todos salvo el dom 29-nov): el journal del SHIP es el
//   «Cierre de semana» → no se añade la sección de un día de paso (antes «## Dom 06-dic» con objetivo · qué construí … encima del cierre); solo se abre el
//   fichero de la semana (creado si faltaba; si le falta el cierre, se le añade al final)
const SOLO_CIERRE = !diaHoy && _ships.has(FECHA);
const _pcHoy = [...PROY, ...TAPER].filter((p) => p.pcSab === FECHA);
const PC_TXT = _pcHoy.some((p) => !p.tipo) ? `SHIP ${_pcHoy.filter((p) => !p.tipo).map((p) => `S${p.s}`).join(' + ')}` : `PC opcional del taper (${_pcHoy.map((p) => `S${p.s}`).join(' · ')})`;
if (SOLO_CIERRE && !txt.includes('## Cierre de semana')) {
  txt = txt.replace(/\s*$/, '\n\n') + CIERRE.join('\n');
  fs.writeFileSync(file, txt, 'utf8');
}
// v6.10w: una sola sección por fecha de PLAN (aunque se escribiera otro día real: «## Mié 18-nov …» con o sin «(hecho el …)»)
const _esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// v6.11 (mar 24-nov): una sección por cada paso que absorbe el SHIP de hoy (en su orden; cada una se inserta antes del «Cierre de semana», así quedan en orden)
const FECHAS_SEC = SOLO_ABRIR ? [] : PASOS_SHIP.length ? PASOS_SHIP : [FECHA]; // SOLO_ABRIR: hoy sin vibecoding, ninguna sección
for (const FX of FECHAS_SEC) {
const diaX = DIAS.find((x) => x.fecha === FX) || null;
const titulo = `## ${fmt(FX)}${REAL !== FX ? ` (hecho el ${fmt(REAL)})` : ''}${diaX ? ` · D${diaX.d} · S${diaX.semana}` : ''}`;
const yaPlan = new RegExp(`^## ${_esc(fmt(FX))}(?= |$)`, 'm').test(txt);
if (!SOLO_CIERRE && yaPlan && !txt.includes(titulo)) console.log(`⚠ ya hay una sección del plan ${fmt(FX)} en ${SEM}.md (escrita otro día real): se usa esa, no se añade otra`);
if (!SOLO_CIERRE && !txt.includes(titulo) && !yaPlan) {
  const S = [];
  S.push(titulo);
  S.push('');
  if (diaX) S.push(`- paso del día (${diaX.tipo}${diaX.min !== 45 ? ` · ${diaX.min}'` : ''}${diaX.deload ? ' · deload' : ''}): ${diaX.paso}`);
  S.push('- objetivo del día (5\'): ');
  S.push('- qué construí: ');
  S.push('- commit / URL: ');
  S.push('- qué aprendí: ');
  S.push('- % del código que entiendo: __ %');
  S.push('- bloqueo: ');
  S.push('- freno 04:55 commit selectivo o nota de estado (nunca git stash): ☐ sí ☐ no · 1ª review Anki: __:__ (verde ≤05:10 · ámbar >05:10 · rojo sin review)');
  S.push('');
  // insertar antes de "## Cierre de semana" para que el cierre quede al final
  const i = txt.indexOf('## Cierre de semana');
  txt = i >= 0 ? txt.slice(0, i) + S.join('\n') + '\n' + txt.slice(i) : txt.replace(/\s*$/, '\n\n') + S.join('\n') + '\n';
  fs.writeFileSync(file, txt, 'utf8');
  anadidas.push(fmt(FX));
}
}

const rel = path.relative(JOURNAL, file).replace(/\\/g, '/');
if (SOLO_ABRIR) console.log(`${creado ? 'CREADO' : 'OK'} ${file} · ${fmt(REAL)} sin vibecoding: hoy no se añade sección (la del paso del ${fmt(FECHA)} la añade el ${fmt(_REAL(FECHA))})`);
else if (SOLO_CIERRE) console.log(`${creado ? 'CREADO' : 'OK'} ${file} · ${fmt(REAL)}, ${PC_TXT}: hoy no se añade sección de día · escribe en «Cierre de semana»`);
else console.log(`${creado ? 'CREADO' : 'OK'} ${file}${anadidas.length ? ' · +sección ' + anadidas.join(' + ') : ` · ${FECHAS_SEC.length > 1 ? 'secciones' : 'sección'} de hoy ya existía${FECHAS_SEC.length > 1 ? 'n' : ''}`}${diaHoy ? ` · ${FECHAS_SEC.map((fx) => DIAS.find((x) => x.fecha === fx)).filter(Boolean).map((x) => `D${x.d}`).join(' + ')} S${diaHoy.semana} ${diaHoy.proyecto}${PASOS_SHIP.length ? ' (dentro del SHIP)' : ''}` : ' · fuera del plan'}`);
if (has('--print')) console.log('\n' + fs.readFileSync(file, 'utf8'));
if (has('--abrir')) {
  try { cp.execSync(`code "${file}"`, { stdio: 'ignore', timeout: 15000, windowsHide: true }); console.log('abierto en VS Code'); }
  catch {
    try { cp.execSync(`cmd /c start "" "${file}"`, { stdio: 'ignore', timeout: 15000, windowsHide: true }); console.log('abierto con el programa por defecto'); }
    catch (e) { console.log('no se pudo abrir automáticamente:', e.message); }
  }
}
console.log(`journal: ${JOURNAL}/${rel} · commit sugerido (repo del journal, no es el [S<n>] del proyecto; dos órdenes): git -C "${JOURNAL}" add -A → git -C "${JOURNAL}" commit -m "journal ${SEM} ${FECHA}"`);
