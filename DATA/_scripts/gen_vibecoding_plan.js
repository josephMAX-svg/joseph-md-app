// gen_vibecoding_plan.js — GENERA src/lib/vibecodingPlan.ts (motor día-a-día del VIBECODING 04:15-05:00)
// y DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md (doc legible con fechas).
//
// Fuente única: DATA/SYNAPSE/vibecoding_proyectos.json
//   · proyectos: 12 proyectos S1-S12 (backlog REAL, ordenados por riesgo para el Step 1) · 5 pasos L-V cada uno.
//   · taper:     8 semanas S13-S20 (v5.10-b, 12-sep-2026): S13-S16 mantenimiento ≤15'/día (flag deload) ·
//                S17-S20 deload total (journal 5' + audio) · S20 = semana del examen (lun-mié, D93-D95).
//   · _meta:     freno 04:55 · convención de commit [S<n>] · verificación mecánica (verify_vibecoding.js).
// Calendario: START = argv[2] (YYYY-MM-DD, default 2026-09-21 = D1 v5.14) · días HÁBILES L-V (salta sáb/dom y los
// feriados fijos 25-dic/31-dic/1-ene, misma regla que remap_inicio.js).
//   · S1-S12: 5 días hábiles por proyecto (Lun definir · Mar/Mié construir · Jue verificar · Vie doc+commit) →
//     60 días · sábado PC (SYNAPSE 15:00-17:00) = SHIP del proyecto · domingo = Feynman.
//   · S13-S20: semanas de CALENDARIO (lun→vie) desde el lunes siguiente al fin de S12, con los feriados fuera
//     (S15 = 4 días, S16 = 3, S20 = 3; v5.14: bloques secuenciales, S20 = lun 1 → mié 3-feb-2027 = D95 del Step 1; examen jue 4-feb).
//     Con D1 = lun 14-sep, el día d del vibecoding coincide con el D# del Step 1 (95 días).
// Ship log: si existe DATA/SYNAPSE/_vibecoding_ship.json (escrito por verify_vibecoding.js) se hornea en el TS
// (VIBE_SHIP_LOG) para que la app muestre el último verify aunque no haya localStorage.
//
// Uso:  node DATA/_scripts/gen_vibecoding_plan.js 2026-09-21
// Pipeline de corrimiento: tras remap_inicio.js <fecha>, correr también este script con la misma fecha
// (igual que gen_synapse_plan.js / gen_aurum_plan.js). Determinista: sin Date.now() ni aleatoriedad.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const START = process.argv[2] || '2026-09-21';
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);
// Último día del taper = D95 del Step 1 (mié 3-feb-2027 con START=2026-09-21). Se calcula, no se fija a mano:
// 95 días hábiles desde START con la misma regla de feriados.
const DIAS_STEP1 = 95;

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
const SKIP_FIJOS = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const isHabil = (s) => dow(s) !== 0 && dow(s) !== 6 && !SKIP_FIJOS.has(s);
// D95 del Step 1 (misma regla de hábiles): último día del taper
const finStep1 = (() => { let c = START, n = 0; while (true) { if (isHabil(c)) { n++; if (n === DIAS_STEP1) return c; } c = addDays(c, 1); } })();

const TIPO_POR_WD = { Lun: 'definir', Mar: 'construir', Mié: 'construir', Jue: 'verificar', Vie: 'ship-prep' };
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
    const tipo = TIPO_POR_WD[wd] || 'construir';
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
// todos los pasos corren +1 hábil respecto a la v5.10 y el último cae en D95 (= D-1 del examen).
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
if (dias.length !== DIAS_STEP1) throw new Error(`Deben salir ${DIAS_STEP1} días en total (= D# del Step 1), salieron ${dias.length}`);
if (dias[dias.length - 1].fecha !== finStep1) throw new Error('El último día del taper debe ser el D95 del Step 1: ' + finStep1);

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
  return `{s:${p.s},id:"${esc(p.id)}",nombre:"${esc(p.nombre)}",rotacion:"${p.rotacion}",deload:${!!p.deload},ini:"${w.ini}",fin:"${w.fin}",ship:"${w.ship}",sirveA:"${esc(p.sirveA)}",objetivo:"${esc(p.objetivo)}",entregable:"${esc(p.entregable)}",aceptacion:${arrTs(p.aceptacion)},verificacion:${verTs(p.verificacion)},repo:"${esc(p.repo)}",repoGit:"${esc(p.repo_git)}",docs:${docsTs(p.docs)},pasos:${arrTs(p.pasos)},shipTxt:"${esc(p.ship)}"}`;
};
const taperTs = (t) => {
  const w = taperSemanas.find((x) => x.s === t.s);
  return `{s:${t.s},id:"${esc(t.id)}",nombre:"${esc(t.nombre)}",tipo:"${t.tipo}",ini:"${w.ini}",fin:"${w.fin}",ship:"${w.ship}",minDia:${t.minDia},semanaStep1:"${esc(t.semana_step1)}",objetivo:"${esc(t.objetivo)}",sensores:${arrTs(t.sensores || [])},pasos:${arrTs(t.pasos)},shipTxt:"${esc(t.ship)}"}`;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},proyecto:"${x.proyecto}",k:${x.k},tipo:"${x.tipo}",min:${x.min},deload:${x.deload},paso:"${esc(x.paso)}"}`;
const shipTs = (e) => `{s:${e.s},id:"${esc(e.id)}",fecha:"${e.fecha}",hora:"${esc(e.hora)}",criterios_ok:${e.criterios_ok},total:${e.total},shipped:${e.shipped},resumen:"${esc(e.resumen)}"}`;

const nP = dias.filter((x) => x.semana <= 12).length;
const ts = `/**
 * vibecodingPlan.ts — Motor día-a-día del VIBECODING 04:15-05:00 (L-V) · 12 proyectos S1-S12 (${nP} días hábiles,
 * ${dias[0].fecha} → ${finS12}; sáb PC SYNAPSE = SHIP) + taper S13-S20 (${dias[nP].fecha} → ${dias[dias.length - 1].fecha}:
 * S13-S16 mantenimiento ≤15'/día con flag deload · S17-S20 deload total = journal 5' + audio · S20 = semana del examen).
 * ${dias.length} días en total = los ${DIAS_STEP1} días del Step 1 (mismo D#: d del vibecoding == D del Step 1).
 * GENERADO por DATA/_scripts/gen_vibecoding_plan.js desde DATA/SYNAPSE/vibecoding_proyectos.json.
 * NO editar a mano — regenerar: node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD
 *
 * Filosofía (CURSO_IA_04H_31AGO.md): builder, no estudiante. Cada semana termina 1 proyecto REAL con
 * entregable verificable y criterio de aceptación MECÁNICO — 'shipped' lo decide
 * node DATA/_scripts/verify_vibecoding.js <n> (→ DATA/SYNAPSE/_vibecoding_ship.json, horneado aquí en VIBE_SHIP_LOG
 * y leído en vivo desde localStorage 'jmd-vibe-ship'); el ✓ manual (PlanKey 'vibecoding') solo cuenta días.
 * Ciclo diario: 5' objetivo → 35' construir → 5' commit + journal (D:/synapse-journal, node DATA/_scripts/journal_hoy.js).
 * FRENO 04:55: commit-or-stash obligatorio; 05:00 Anki sin excepción; si el día se recorta pierde el proyecto, nunca el Anki.
 * Semana DELOAD (S7 = post-NBME 26): carga 50% (2 días de 45' + 3 de 15'), fechas intactas.
 */
export type VibeRotacion = 'yocpmd' | 'preguntas' | 'bots' | 'contenido';
export type VibeTipo = 'definir' | 'construir' | 'verificar' | 'ship-prep' | 'sensores' | 'mejora' | 'lectura' | 'retro' | 'journal';
export type VibeVerifTipo = 'git' | 'test' | 'url' | 'supabase' | 'fichero' | 'manual';
export interface VibeDoc { label: string; url: string }
export interface VibeVerificacion { tipo: VibeVerifTipo; resumen: string }
export interface VibeProyecto {
  s: number; id: string; nombre: string; rotacion: VibeRotacion; deload: boolean;
  ini: string; fin: string; ship: string;            // L-V del proyecto + sábado de SHIP (PC SYNAPSE)
  sirveA: string; objetivo: string; entregable: string; aceptacion: string[]; verificacion: VibeVerificacion[];
  repo: string; repoGit: string; docs: VibeDoc[]; pasos: string[]; shipTxt: string;
}
export interface VibeTaper {
  s: number; id: string; nombre: string; tipo: 'mantenimiento' | 'deload';
  ini: string; fin: string; ship: string; minDia: number; semanaStep1: string; objetivo: string;
  sensores: string[]; pasos: string[]; shipTxt: string;
}
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
/** Semana del taper vigente para una fecha (L-V, su sábado de PC opcional y su domingo). undefined fuera del taper. */
export function vibeTaperEnFecha(fechaISO: string): VibeTaper | undefined {
  return VIBE_TAPER.find((t) => t.ini <= fechaISO && fechaISO <= addDiasISO(t.ship, 1));
}
/** Proyecto vigente para una fecha: el de su semana L-V, o (sáb/dom) el de la semana que acaba de cerrar.
 *  A partir del taper (S13+) devuelve undefined: usar vibeTaperEnFecha. */
export function vibeProyectoEnFecha(fechaISO: string): VibeProyecto | undefined {
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
`;
fs.writeFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), ts, 'utf8');
console.log('OK src/lib/vibecodingPlan.ts ·', dias.length, 'días ·', dias[0].fecha, '→', finS12, '(S1-S12) + taper', dias[nP].fecha, '→', dias[dias.length - 1].fecha, '· ship log', SHIP_LOG.length, 'entradas');

// ─── emitir DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md ───
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmt = (s) => `${WD[dow(s)].toLowerCase()} ${s.slice(8, 10)}-${MES[Number(s.slice(5, 7)) - 1]}`;
const md = [];
md.push(`# 🧠 VIBECODING — 12 proyectos semanales (S1-S12 · ${fmt(dias[0].fecha)} → ${fmt(finS12)} ${dias[0].fecha.slice(0, 4)}) + taper S13-S20 (${fmt(dias[nP].fecha)} → ${fmt(dias[dias.length - 1].fecha)} ${dias[dias.length - 1].fecha.slice(0, 4)})`);
md.push('');
md.push(`> GENERADO por \`DATA/_scripts/gen_vibecoding_plan.js ${START}\` desde \`DATA/SYNAPSE/vibecoding_proyectos.json\` (editar el JSON, no este .md). Franja **04:15–05:00 L-V (45')** · sábado **PC SYNAPSE 15:00-17:00 = SHIP** del proyecto · domingo = Feynman del proyecto (10', opcional). Progreso real en la app: pestaña ⚡ run de SYNAPSE (PlanKey \`vibecoding\`, ✓ por día) y bloque 04:15 de MISIÓN DE HOY. **v5.10-b (12-sep-2026)**: catálogo RE-SECUENCIADO por riesgo para el Step 1 con lo ya construido por agentes (parser APEX v2.5.1 + test, usmleScores.ts, anki_telemetria.js v1, gen_revision_semanal.js v1, plan_checks.sql, verify_vibecoding.js, journal_hoy.js): cada proyecto COMPLETA o pone en producción algo real. ${dias.length} días = los mismos ${DIAS_STEP1} del Step 1 (d == D#).`);
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
for (const t of T) { const w = taperSemanas.find((x) => x.s === t.s); md.push(`| S${t.s} | ${t.nombre} | taper · ${t.tipo} | ${fmt(w.ini)} → ${fmt(w.fin)} (${t.minDia}'/día) | ${t.tipo === 'mantenimiento' ? fmt(w.ship) + ' (opcional 30\')' : 'opcional / no'} | **sí (${t.tipo})** |`); }
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
  md.push('- **Pasos diarios (45\' cada uno' + (p.deload ? '; deload: mar/jue 15\'' : '') + ')**:');
  for (const x of ds) md.push(`  - **${x.wd} ${x.fecha.slice(8, 10)}-${x.fecha.slice(5, 7)} · ${TIPO_LABEL[x.tipo]}${x.min !== 45 ? ` (${x.min}')` : ''}**: ${x.paso}`);
  md.push(`- **SHIP**: ${p.ship}`);
  md.push('');
}
md.push('## Semanas 13-20 · TAPER (mantenimiento → deload total → examen)');
md.push('');
md.push(`> ${CAT._meta.taper_regla}`);
md.push('');
for (const t of T) {
  const w = taperSemanas.find((x) => x.s === t.s);
  const ds = dias.filter((x) => x.semana === t.s);
  md.push(`### S${t.s} · ${t.nombre} · ${t.tipo.toUpperCase()} (${t.minDia}'/día)`);
  md.push('');
  md.push(`- **Semana**: ${fmt(w.ini)} → ${fmt(w.fin)} (${ds.length} días hábiles) · Step 1: ${t.semana_step1}`);
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
