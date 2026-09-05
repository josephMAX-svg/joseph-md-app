// gen_vibecoding_plan.js — GENERA src/lib/vibecodingPlan.ts (motor día-a-día del VIBECODING 04:15-05:00)
// y DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md (doc legible con fechas).
//
// Fuente única: DATA/SYNAPSE/vibecoding_proyectos.json (12 proyectos S1-S12, backlog REAL del repo).
// Calendario: START = argv[2] (YYYY-MM-DD, default 2026-09-07 = D1 v5.6) · 60 días HÁBILES L-V
// (salta sáb/dom y los feriados fijos 25-dic/31-dic/1-ene, misma regla que remap_inicio.js) ·
// 5 días por proyecto (Lun definir · Mar/Mié construir · Jue verificar · Vie doc+commit) ·
// sábado PC (SYNAPSE 15:00-17:00) = SHIP del proyecto de la semana · domingo = Feynman.
//
// Uso:  node DATA/_scripts/gen_vibecoding_plan.js 2026-09-07
// Pipeline de corrimiento: tras remap_inicio.js <fecha>, correr también este script con la misma fecha
// (igual que gen_synapse_plan.js / gen_aurum_plan.js). Determinista: sin Date.now() ni aleatoriedad.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const START = process.argv[2] || '2026-09-07';
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);

const CAT = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/vibecoding_proyectos.json'), 'utf8'));
const P = CAT.proyectos;
if (P.length !== 12) throw new Error('El catálogo debe tener 12 proyectos, hay ' + P.length);
P.forEach((p, i) => {
  if (p.s !== i + 1) throw new Error('Proyecto fuera de orden: ' + p.id);
  if (!Array.isArray(p.pasos) || p.pasos.length !== 5) throw new Error('Cada proyecto necesita 5 pasos (L-V): ' + p.id);
  if (!p.docs || !p.docs.length) throw new Error('Proyecto sin docs: ' + p.id);
  for (const d of p.docs) if (!/^https:\/\//.test(d.url)) throw new Error('URL no https en ' + p.id + ': ' + d.url);
});

// ─── calendario (idéntico en espíritu a remap_inicio.js: L-V + feriados fijos fuera) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = (s) => fromISO(s).getUTCDay();
const SKIP_FIJOS = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const isHabil = (s) => dow(s) !== 0 && dow(s) !== 6 && !SKIP_FIJOS.has(s);

const TIPO_POR_WD = { Lun: 'definir', Mar: 'construir', Mié: 'construir', Jue: 'verificar', Vie: 'ship-prep' };
const TIPO_LABEL = { definir: "5' objetivo → spec del día", construir: 'construir con Claude Code', verificar: 'verificar en vivo (test/URL/dato)', 'ship-prep': 'doc + commit + preparar SHIP' };

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
if (dias.length !== 60) throw new Error('Deben salir 60 días, salieron ' + dias.length);
// sábado de SHIP de cada semana = el sábado siguiente al 5º día del proyecto
const sabadoShip = (fechaVie) => { let s = fechaVie; while (dow(s) !== 6) s = addDays(s, 1); return s; };
const semanas = P.map((p) => {
  const ds = dias.filter((x) => x.semana === p.s);
  return { s: p.s, id: p.id, ini: ds[0].fecha, fin: ds[ds.length - 1].fecha, ship: sabadoShip(ds[ds.length - 1].fecha) };
});

// ─── emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
const arrTs = (a) => '[' + a.map((x) => `"${esc(x)}"`).join(',') + ']';
const docsTs = (docs) => '[' + docs.map((x) => `{label:"${esc(x.label)}",url:"${esc(x.url)}"}`).join(',') + ']';
const proyTs = (p) => {
  const w = semanas.find((x) => x.s === p.s);
  return `{s:${p.s},id:"${esc(p.id)}",nombre:"${esc(p.nombre)}",rotacion:"${p.rotacion}",deload:${!!p.deload},ini:"${w.ini}",fin:"${w.fin}",ship:"${w.ship}",sirveA:"${esc(p.sirveA)}",objetivo:"${esc(p.objetivo)}",entregable:"${esc(p.entregable)}",aceptacion:${arrTs(p.aceptacion)},repo:"${esc(p.repo)}",docs:${docsTs(p.docs)},pasos:${arrTs(p.pasos)},shipTxt:"${esc(p.ship)}"}`;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},proyecto:"${x.proyecto}",k:${x.k},tipo:"${x.tipo}",min:${x.min},deload:${x.deload},paso:"${esc(x.paso)}"}`;

const ts = `/**
 * vibecodingPlan.ts — Motor día-a-día del VIBECODING 04:15-05:00 (L-V, 45') · 12 proyectos S1-S12 ·
 * ${dias.length} días hábiles · ${dias[0].fecha} → ${dias[dias.length - 1].fecha} (sáb y dom libres; sábado PC SYNAPSE = SHIP del proyecto).
 * GENERADO por DATA/_scripts/gen_vibecoding_plan.js desde DATA/SYNAPSE/vibecoding_proyectos.json.
 * NO editar a mano — regenerar: node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD
 *
 * Filosofía (CURSO_IA_04H_31AGO.md): builder, no estudiante. Cada semana termina 1 proyecto REAL con
 * entregable verificable (commit / URL viva / test verde) y criterio de aceptación — se mide por OUTPUT,
 * no por tiempo sentado (Palmerton). Ciclo diario: 5' objetivo → 35' construir → 5' commit + nota synapse-journal.
 * Progreso REAL manual: PlanKey 'vibecoding' (studyProgress.ts), empieza 0%.
 * Semana DELOAD (post-NBME 26): carga 50% (2 días de 45' + 3 de 15'), fechas intactas.
 */
export type VibeRotacion = 'yocpmd' | 'preguntas' | 'bots' | 'contenido';
export type VibeTipo = 'definir' | 'construir' | 'verificar' | 'ship-prep';
export interface VibeDoc { label: string; url: string }
export interface VibeProyecto {
  s: number; id: string; nombre: string; rotacion: VibeRotacion; deload: boolean;
  ini: string; fin: string; ship: string;            // L-V del proyecto + sábado de SHIP (PC SYNAPSE)
  sirveA: string; objetivo: string; entregable: string; aceptacion: string[]; repo: string;
  docs: VibeDoc[]; pasos: string[]; shipTxt: string;
}
export interface DiaVibe {
  d: number; fecha: string; wd: string; semana: number; proyecto: string; k: number;
  tipo: VibeTipo; min: number; deload: boolean; paso: string;
}

export const VIBE_META = {
  inicio: '${dias[0].fecha}', fin: '${dias[dias.length - 1].fecha}', totalDias: ${dias.length}, semanas: 12,
  franja: "04:15–05:00 L-V (45') · sáb 15:00-17:00 PC SYNAPSE = SHIP · dom = Feynman del proyecto (10', opcional)",
  ciclo: "5' objetivo → 35' construir con Claude Code → 5' commit + nota synapse-journal",
  rotacion: { yocpmd: 'Automatización YoCPMD', preguntas: 'Pipeline de preguntas ENCAPS/USMLE', bots: 'Bots CRM Pulso / LIVIANO', contenido: 'Contenido IA para las marcas' },
} as const;

export const VIBE_PROYECTOS: VibeProyecto[] = [
${P.map(proyTs).join(',\n')}
];

export const VIBE_DIAS: DiaVibe[] = [
${dias.map(diaTs).join(',\n')}
];

export const VIBE_TIPO_LABEL: Record<VibeTipo, string> = ${JSON.stringify(TIPO_LABEL)};
export const VIBE_ROTACION_ICON: Record<VibeRotacion, string> = { yocpmd: '⚙️', preguntas: '❓', bots: '🤖', contenido: '🎬' };

export function vibeDiaDe(fechaISO: string): DiaVibe | undefined { return VIBE_DIAS.find((x) => x.fecha === fechaISO); }
export function vibeProyectoDe(s: number): VibeProyecto | undefined { return VIBE_PROYECTOS.find((x) => x.s === s); }
/** Proyecto vigente para una fecha: el de su semana L-V, o (sáb/dom) el de la semana que acaba de cerrar. */
export function vibeProyectoEnFecha(fechaISO: string): VibeProyecto | undefined {
  const dia = vibeDiaDe(fechaISO);
  if (dia) return vibeProyectoDe(dia.semana);
  const prev = [...VIBE_DIAS].reverse().find((x) => x.fecha < fechaISO);
  if (prev) return vibeProyectoDe(prev.semana);
  return VIBE_PROYECTOS[0];
}
/** Nº de proyectos SHIPPED = semanas con sus 5 días marcados ✓ (PlanKey 'vibecoding'). */
export function vibeShipped(done: Set<number>): number {
  return VIBE_PROYECTOS.filter((p) => VIBE_DIAS.filter((x) => x.semana === p.s).every((x) => done.has(x.d))).length;
}
`;
fs.writeFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), ts, 'utf8');
console.log('OK src/lib/vibecodingPlan.ts ·', dias.length, 'días ·', dias[0].fecha, '→', dias[dias.length - 1].fecha);

// ─── emitir DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md ───
const fmt = (s) => `${WD[dow(s)].toLowerCase()} ${s.slice(8, 10)}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(s.slice(5, 7)) - 1]}`;
const md = [];
md.push(`# 🧠 VIBECODING — 12 proyectos semanales (S1-S12 · ${fmt(dias[0].fecha)} → ${fmt(dias[dias.length - 1].fecha)} ${dias[0].fecha.slice(0, 4)})`);
md.push('');
md.push(`> GENERADO por \`DATA/_scripts/gen_vibecoding_plan.js ${START}\` desde \`DATA/SYNAPSE/vibecoding_proyectos.json\` (editar el JSON, no este .md). Franja **04:15–05:00 L-V (45')** · sábado **PC SYNAPSE 15:00-17:00 = SHIP** del proyecto · domingo = Feynman del proyecto (10', opcional). Progreso real en la app: pestaña ⚡ run de SYNAPSE (PlanKey \`vibecoding\`, ✓ por día) y bloque 04:15 de MISIÓN DE HOY.`);
md.push('');
md.push('## Reglas (Palmerton aplicado a construir)');
md.push('');
md.push(`- ${CAT._meta.regla}`);
md.push('- **Definition of done** = los 4 criterios de aceptación del proyecto verificados (commit hash / URL viva / test verde / dato en Supabase). Sin eso, el sábado PC se usa para cerrar; nada se arrastra a la semana siguiente.');
md.push('- **Rotación** (repite subiendo nivel): ' + Object.entries(CAT._meta.rotacion).map(([k, v]) => `\`${k}\` = ${v}`).join(' · '));
md.push(`- **Deload**: ${CAT._meta.deload}`);
md.push('- **Cero inventos**: ' + CAT._meta.urls_verificadas + ' Lo que exija credenciales o decisión de Joseph está marcado "A VERIFICAR".');
md.push('- Cada día cierra con 1 línea en `synapse-journal` (qué construí · qué aprendí · qué falta). El sábado de SHIP se marca el proyecto como shipped en la retro de S12.');
md.push('');
md.push('## Calendario');
md.push('');
md.push('| S | Proyecto | Rotación | L-V | SHIP (sáb PC) | Deload |');
md.push('|---|---|---|---|---|---|');
for (const p of P) { const w = semanas.find((x) => x.s === p.s); md.push(`| S${p.s} | ${p.nombre} | ${p.rotacion} | ${fmt(w.ini)} → ${fmt(w.fin)} | ${fmt(w.ship)} | ${p.deload ? '**sí (50%)**' : '—'} |`); }
md.push('');
for (const p of P) {
  const w = semanas.find((x) => x.s === p.s);
  const ds = dias.filter((x) => x.semana === p.s);
  md.push(`## S${p.s} · ${p.nombre}${p.deload ? ' · DELOAD' : ''}`);
  md.push('');
  md.push(`- **Semana**: ${fmt(w.ini)} → ${fmt(w.fin)} · **SHIP**: sábado ${fmt(w.ship)} (PC SYNAPSE 15:00-17:00) · rotación \`${p.rotacion}\``);
  md.push(`- **A quién sirve**: ${p.sirveA}`);
  md.push(`- **Objetivo**: ${p.objetivo}`);
  md.push(`- **Entregable verificable**: ${p.entregable}`);
  md.push(`- **Dónde**: ${p.repo}`);
  md.push('- **Criterio de aceptación (definition of done)**:');
  for (const a of p.aceptacion) md.push(`  - [ ] ${a}`);
  md.push('- **Docs (verificadas 5-sep-2026)**: ' + p.docs.map((x) => `[${x.label}](${x.url})`).join(' · '));
  md.push('- **Pasos diarios (45\' cada uno' + (p.deload ? '; deload: mar/jue 15\'' : '') + ')**:');
  for (const x of ds) md.push(`  - **${x.wd} ${x.fecha.slice(8, 10)}-${x.fecha.slice(5, 7)} · ${TIPO_LABEL[x.tipo]}${x.min !== 45 ? ` (${x.min}')` : ''}**: ${x.paso}`);
  md.push(`- **SHIP**: ${p.ship}`);
  md.push('');
}
md.push('## Retro (rellenar en S12)');
md.push('');
md.push('| S | Shipped | Evidencia (commit/URL/test) | Lección |');
md.push('|---|---|---|---|');
for (const p of P) md.push(`| S${p.s} | ☐ | | |`);
md.push('');
fs.writeFileSync(path.join(ROOT, 'DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md'), md.join('\n'), 'utf8');
console.log('OK DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md · SHIP sábados:', semanas.map((w) => w.ship).join(', '));
