/**
 * gen_delta_espana.js — vuelca las entradas `delta_es:true` del log MIR a filas "por completar" en
 * DATA/MIR/DELTA_ESPANA.md (Palmerton v3b, gap 10: el flag delta se marcaba a posteriori y no alimentaba nada).
 *
 *   Uso:  node DATA/_scripts/gen_delta_espana.js [export.json] [--write] [--desde YYYY-MM-DD] [--md ruta.md]
 *
 *   · export.json = lo que copia el botón "⤓ Exportar log JSON" de la pestaña HOY (mirEvalLogExportJSON):
 *     { version, plan:'MIR', exportado, entradas:[…] } — o un array de entradas. Por defecto lee
 *     DATA/MIR/mir_eval_log_export.json (pega ahí el JSON). También acepta el JSON de la tabla Supabase
 *     mir_eval_log (columnas snake_case: delta_es, cap_id, tipo_error…).
 *   · Sin --write: imprime las filas y el resumen por asignatura (no toca el .md).
 *   · Con --write: inserta las filas NUEVAS entre <!-- DELTA_LOG:INICIO --> y <!-- DELTA_LOG:FIN --> del .md.
 *     Idempotente: una entrada cuyo id ya aparece en el fichero no se vuelve a insertar (se conserva lo que
 *     Joseph haya completado a mano en esa fila).
 *   · Aviso "delta repetido": un mismo capId con ≥2 entradas delta (objetivo del mantenimiento: 0).
 *
 * No inventa nada: las columnas "manejo España" y "fuente oficial" se dejan como "A VERIFICAR" para completar.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const desdeIdx = argv.indexOf('--desde');
const DESDE = desdeIdx >= 0 ? argv[desdeIdx + 1] : null;
const mdIdx = argv.indexOf('--md'); // --md <ruta>: fichero destino alternativo (tests); por defecto DATA/MIR/DELTA_ESPANA.md
const MD = mdIdx >= 0 ? path.resolve(argv[mdIdx + 1]) : path.join(ROOT, 'DATA/MIR/DELTA_ESPANA.md');
const IN = argv.find((a) => !a.startsWith('--') && a !== DESDE && (mdIdx < 0 || a !== argv[mdIdx + 1])) || path.join(ROOT, 'DATA/MIR/mir_eval_log_export.json');
const INICIO = '<!-- DELTA_LOG:INICIO -->';
const FIN = '<!-- DELTA_LOG:FIN -->';

// ── plan (para resolver capId → tema/asignatura cuando la entrada no lo trae) ──
function planRows() {
  try {
    const src = fs.readFileSync(path.join(ROOT, 'src/lib/mirDailyPlan.ts'), 'utf8');
    const i = src.indexOf('export const MIR_DIAS'); const j = src.indexOf('];', i);
    const re = /\{d:(\d+),fecha:"([^"]+)",asignatura:"([^"]+)",num:(\d+),rent:"[^"]*",tema:"((?:[^"\\]|\\.)*)",capId:"([0-9a-f]+)"/g;
    return [...src.slice(i, j).matchAll(re)].map((m) => ({ d: +m[1], fecha: m[2], asignatura: m[3], num: +m[4], tema: JSON.parse('"' + m[5] + '"'), capId: m[6] }));
  } catch { return []; }
}
const PLAN = planRows();
const porD = new Map(PLAN.map((r) => [r.d, r]));

// ── entrada del log (app o Supabase) → forma común ──
function normalizar(e) {
  if (!e || typeof e !== 'object') return null;
  const delta = e.delta_es === true || e.delta_es === 'true' || e.deltaEs === true;
  if (!delta) return null;
  const kind = e.kind || 'anclada';
  const d = Number(e.d) || 0;
  const capId = e.capId || e.cap_id || (kind === 'anclada' ? porD.get(d - 1)?.capId : porD.get(d)?.capId) || '';
  const plan = PLAN.find((r) => r.capId === capId);
  return {
    id: String(e.id || `${e.fecha || '?'}-${kind}-${d}`),
    fecha: String(e.fecha || '').slice(0, 10), d, kind,
    asignatura: e.asignatura || plan?.asignatura || '—',
    tema: e.tema || plan?.tema || '—',
    capId,
    tipoError: e.tipoError || e.tipo_error || '',
    ccsn: e.ccsn || '',
    nota: e.nota || '',
    aciertos: Number(e.aciertos) || 0, total: Number(e.total) || 0,
  };
}
function leerEntradas(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const arr = Array.isArray(raw) ? raw : Array.isArray(raw?.entradas) ? raw.entradas : Array.isArray(raw?.data) ? raw.data : [];
  return arr.map(normalizar).filter(Boolean).filter((x) => !DESDE || x.fecha >= DESDE).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.id.localeCompare(b.id));
}
const esc = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
function fila(x) {
  const pista = [x.tipoError && `brecha ${x.tipoError}`, x.ccsn && `CCSN ${x.ccsn}`, x.nota].filter(Boolean).join(' · ');
  const link = x.capId ? `[${x.capId.slice(0, 8)}…](https://promir.medicapanamericana.com/capitulo/${x.capId})` : '—';
  return `| ${x.fecha} · D${x.d} · ${x.kind} <!-- id:${x.id} --> | ${esc(x.asignatura)} → ${esc(x.tema)} | (completar${pista ? `: ${esc(pista)}` : ''}) | A VERIFICAR | A VERIFICAR | A VERIFICAR | ${link} |`;
}

// ── main ──
if (!fs.existsSync(IN)) {
  console.error(`No existe ${IN}. Pega ahí el JSON del botón "Exportar log JSON" (o pasa la ruta como 1er argumento).`);
  process.exit(1);
}
const entradas = leerEntradas(IN);
const md = fs.existsSync(MD) ? fs.readFileSync(MD, 'utf8') : '';
const yaEn = new Set([...md.matchAll(/<!-- id:([^\s]+) -->/g)].map((m) => m[1]));
const nuevas = entradas.filter((x) => !yaEn.has(x.id));

// resumen por asignatura + delta repetido por capId
const porAsig = new Map(); const porCap = new Map();
for (const x of entradas) {
  porAsig.set(x.asignatura, (porAsig.get(x.asignatura) || 0) + 1);
  if (x.capId) porCap.set(x.capId, [...(porCap.get(x.capId) || []), x]);
}
console.log(`Entradas delta_es en ${path.relative(ROOT, IN)}: ${entradas.length} (nuevas para el .md: ${nuevas.length}; ya volcadas: ${entradas.length - nuevas.length})`);
for (const [a, n] of [...porAsig.entries()].sort((p, q) => q[1] - p[1])) console.log(`  · ${a.padEnd(28)} ${n}`);
const repetidos = [...porCap.entries()].filter(([, xs]) => xs.length >= 2);
if (repetidos.length) {
  console.log('⚠ DELTA REPETIDO (mismo capId ≥2 veces → APEX obligatorio con fuente verificada):');
  for (const [cap, xs] of repetidos) console.log(`  · ${xs[0].asignatura} → ${xs[0].tema} (${cap}) × ${xs.length}: ${xs.map((x) => x.fecha).join(', ')}`);
} else console.log('✓ sin delta repetido por capId');

if (!nuevas.length) { console.log('Nada nuevo que volcar.'); process.exit(0); }
const filas = nuevas.map(fila);
if (!WRITE) { console.log('\n--- filas (usa --write para insertarlas en DATA/MIR/DELTA_ESPANA.md) ---'); filas.forEach((f) => console.log(f)); process.exit(0); }

const a = md.indexOf(INICIO); const b = md.indexOf(FIN);
if (a < 0 || b < a) { console.error('DELTA_ESPANA.md sin marcadores DELTA_LOG:INICIO/FIN'); process.exit(1); }
const bloque = md.slice(a + INICIO.length, b);
const tieneCabecera = /\|\s*Fecha · D · kind/.test(bloque);
const cabecera = tieneCabecera ? '' : '\n| Fecha · D · kind | Asignatura → tema | Ítem (completar) | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |\n|---|---|---|---|---|---|---|';
const nuevoBloque = bloque.replace(/\s+$/, '') + cabecera + '\n' + filas.join('\n') + '\n';
fs.writeFileSync(MD, md.slice(0, a + INICIO.length) + nuevoBloque + md.slice(b), 'utf8');
console.log(`✓ ${filas.length} filas insertadas en DATA/MIR/DELTA_ESPANA.md`);
