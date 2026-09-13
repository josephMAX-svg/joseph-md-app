// journal_hoy.js — crea/abre la entrada del día en el synapse-journal (vacío 2 de gaps_v3b_synapse.json).
//
// El journal es un repo local aparte: D:/synapse-journal (README con el ciclo 5/35/5; una nota por SEMANA ISO en
// journal/<YYYY>-W<ww>.md; el remoto privado lo crea Joseph: gh repo create synapse-journal --private --source=D:/synapse-journal).
// Cada día del vibecoding (04:15) cierra con 5' aquí: objetivo · qué construí · commit/URL · qué aprendí ·
// % del código que entiendo · bloqueo · freno 04:55 (commit-or-stash) · hora de la 1ª review de Anki.
//
// Qué hace:
//   1) Calcula la semana ISO de la fecha (hoy o --fecha) y crea journal/<semana>.md desde la plantilla si no existe
//      (cabecera con la semana del Step 1, el proyecto S<n> de la semana leído de src/lib/vibecodingPlan.ts y sus criterios).
//   2) Añade la sección del día ("## Lun 14-sep · D1 · S1 · <proyecto>") si aún no está, con los 6 campos + freno.
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
const FECHA = arg('--fecha', `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`);
if (!/^20\d\d-\d\d-\d\d$/.test(FECHA)) throw new Error('--fecha inválida (YYYY-MM-DD): ' + FECHA);

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
const SEM = semanaISO(FECHA);
const LUNES = addDays(FECHA, -((dow(FECHA) + 6) % 7));
const DOMINGO = addDays(LUNES, 6);

// ─── plan del vibecoding (regex sobre el TS generado; sin importar TS) ───
let VP = '';
try { VP = fs.readFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), 'utf8'); } catch { /* sin plan: journal genérico */ }
const D1 = (VP.match(/inicio:\s*'(\d{4}-\d{2}-\d{2})'/) || [])[1] || null;
const DIAS = [...VP.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"[^"]+",semana:(\d+),proyecto:"([^"]+)",k:\d+,tipo:"([^"]+)",min:(\d+),deload:(true|false),paso:"((?:[^"\\]|\\.)*)"\}/g)]
  .map((m) => ({ d: +m[1], fecha: m[2], semana: +m[3], proyecto: m[4], tipo: m[5], min: +m[6], deload: m[7] === 'true', paso: m[8].replace(/\\"/g, '"').replace(/\\n/g, ' ') }));
const PROY = [...VP.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)",rotacion:"[^"]+",deload:(?:true|false),ini:"(\d{4}-\d{2}-\d{2})",fin:"(\d{4}-\d{2}-\d{2})",ship:"(\d{4}-\d{2}-\d{2})"[\s\S]*?aceptacion:\[((?:"(?:[^"\\]|\\.)*",?)*)\]/g)]
  .map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), ini: m[4], fin: m[5], ship: m[6], aceptacion: [...m[7].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1].replace(/\\"/g, '"')) }));
const TAPER = [...VP.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)",tipo:"(mantenimiento|deload)",ini:"(\d{4}-\d{2}-\d{2})",fin:"(\d{4}-\d{2}-\d{2})",ship:"(\d{4}-\d{2}-\d{2})"/g)]
  .map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), tipo: m[4], ini: m[5], fin: m[6], ship: m[7], aceptacion: [] }));
const diaHoy = DIAS.find((x) => x.fecha === FECHA) || null;
const semanaDias = DIAS.filter((x) => LUNES <= x.fecha && x.fecha <= addDays(LUNES, 4));
const proySemana = semanaDias.length ? (PROY.find((p) => p.s === semanaDias[0].semana) || TAPER.find((t) => t.s === semanaDias[0].semana) || null) : null;
const nStep1 = D1 ? Math.floor((fromISO(LUNES) - fromISO(D1)) / 86400000 / 7) + 1 : null;

// ─── fichero de la semana ───
const dir = path.join(JOURNAL, 'journal');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, SEM + '.md');
let creado = false;
if (!fs.existsSync(file)) {
  const L = [];
  L.push(`# ${SEM} · ${fmt(LUNES)} → ${fmt(DOMINGO)} ${LUNES.slice(0, 4)}${nStep1 != null && nStep1 >= 1 && nStep1 <= 20 ? ` · Step 1 S${nStep1}/20` : ''}`);
  L.push('');
  if (proySemana) {
    L.push(`**Proyecto de la semana**: S${proySemana.s} · ${proySemana.nombre}${proySemana.tipo ? ` (taper · ${proySemana.tipo})` : ''} · L-V ${fmt(proySemana.ini)} → ${fmt(proySemana.fin)}${proySemana.tipo ? '' : ` · SHIP sáb ${fmt(proySemana.ship)} (PC SYNAPSE 15:00) → \`node DATA/_scripts/verify_vibecoding.js ${proySemana.s}\``}`);
    if (proySemana.aceptacion.length) { L.push(''); L.push('Criterios de aceptación (definition of done):'); for (const a of proySemana.aceptacion) L.push(`- [ ] ${a}`); }
  } else {
    L.push('**Proyecto de la semana**: fuera del plan del vibecoding (src/lib/vibecodingPlan.ts) — semana libre o pre-D1.');
  }
  L.push('');
  L.push("> Ciclo diario 04:15-05:00: 5' objetivo → 35' construir → 5' esta entrada. **04:55 commit-or-stash · 05:00 Anki sin excepción** (si el día se recorta pierde el proyecto, nunca el Anki). Commits `[S<n>] …`.");
  L.push('');
  L.push('## Cierre de semana (sábado, tras el verify)');
  L.push('');
  L.push('- shipped (verify): ☐ sí ☐ no · criterios __/4 · evidencia (commit/URL/test): ');
  L.push('- lección de la semana (1 línea): ');
  L.push('- Feynman del domingo (opcional, 3 líneas): ');
  L.push('');
  fs.writeFileSync(file, L.join('\n'), 'utf8');
  creado = true;
}

// ─── sección del día ───
let txt = fs.readFileSync(file, 'utf8');
const titulo = `## ${fmt(FECHA)}${diaHoy ? ` · D${diaHoy.d} · S${diaHoy.semana}` : ''}`;
let anadido = false;
if (!txt.includes(titulo)) {
  const S = [];
  S.push(titulo);
  S.push('');
  if (diaHoy) S.push(`- paso del día (${diaHoy.tipo}${diaHoy.min !== 45 ? ` · ${diaHoy.min}'` : ''}${diaHoy.deload ? ' · deload' : ''}): ${diaHoy.paso}`);
  S.push('- objetivo del día (5\'): ');
  S.push('- qué construí: ');
  S.push('- commit / URL: ');
  S.push('- qué aprendí: ');
  S.push('- % del código que entiendo: __ %');
  S.push('- bloqueo: ');
  S.push('- freno 04:55 commit-or-stash: ☐ sí ☐ no · 1ª review Anki: __:__ (verde ≤05:10 · ámbar >05:10 · rojo sin review)');
  S.push('');
  // insertar antes de "## Cierre de semana" para que el cierre quede al final
  const i = txt.indexOf('## Cierre de semana');
  txt = i >= 0 ? txt.slice(0, i) + S.join('\n') + '\n' + txt.slice(i) : txt.replace(/\s*$/, '\n\n') + S.join('\n') + '\n';
  fs.writeFileSync(file, txt, 'utf8');
  anadido = true;
}

const rel = path.relative(JOURNAL, file).replace(/\\/g, '/');
console.log(`${creado ? 'CREADO' : 'OK'} ${file}${anadido ? ' · +sección ' + fmt(FECHA) : ' · sección de hoy ya existía'}${diaHoy ? ` · D${diaHoy.d} S${diaHoy.semana} ${diaHoy.proyecto}` : ' · fuera del plan'}`);
if (has('--print')) console.log('\n' + fs.readFileSync(file, 'utf8'));
if (has('--abrir')) {
  try { cp.execSync(`code "${file}"`, { stdio: 'ignore', timeout: 15000, windowsHide: true }); console.log('abierto en VS Code'); }
  catch {
    try { cp.execSync(`cmd /c start "" "${file}"`, { stdio: 'ignore', timeout: 15000, windowsHide: true }); console.log('abierto con el programa por defecto'); }
    catch (e) { console.log('no se pudo abrir automáticamente:', e.message); }
  }
}
console.log(`journal: ${JOURNAL}/${rel} · commit sugerido: git -C "${JOURNAL}" add -A && git -C "${JOURNAL}" commit -m "journal ${SEM} ${FECHA}"`);
