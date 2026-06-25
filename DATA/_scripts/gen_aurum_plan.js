// gen_aurum_plan.js — GENERA src/lib/aurumDailyPlan.ts (motor día-a-día AURUM · v2).
//
// AURUM = programa de 6 meses para volverse un closer de ventas de élite (26 semanas,
// 130 lecciones). Fuente: DATA/AURUM/curricula/_curriculum_v2.json (roster AUDITADO +
// horario recalibrado): fases (7), libros_por_fase, los 11 libros con audiolibros,
// descubrimientos (top sellers reales), roster (KEEP/FOUNDATION/DROP) y los detalles
// día-a-día (ver + practica + lectura, suma = min_core).
//
// Reglas de calendario (idénticas en espíritu a gen_synapse_plan.js):
//  · INICIO = 2026-06-24. Las 130 lecciones se asignan a días HÁBILES consecutivos
//    Lunes→Viernes (SALTA sábados y domingos). El NÚCLEO L-V es la ventana 14:15-15:15.
//  · 130 hábiles ≈ 26 semanas. La fecha fin se calcula y se imprime.
//  · semana del plan = índice 1..26 (cada 5 días hábiles = 1 semana). El d=1..5 del JSON
//    es Lun..Vie dentro de su semana, así que cae siempre en el día hábil correcto.
//
// v2 — los bloques:
//  · A    (ver)      — VÍDEO a ver        · formato 'pantalla' · slot 'core'
//  · PRAC (practica) — drill del día      · formato 'practica' · slot 'core'
//  · L    (lectura)  — libro/audiolibro   · formato 'audio' (si tipo='audiolibro') o
//                                           'lectura' (si tipo='libro') · slot 'lectura'
//    El núcleo (A + PRAC) suma min_core (30-60 min) y va en 14:15-15:15. La L (lectura)
//    NO va en esa hora: es para los HUECOS de lectura/viajes (track aparte).
//  · + link a Obsidian (vault, carpeta 07_VENTAS_AURUM).
// real:true = URL verificada/estable · real:false = URL marcada "(verificar)" en el currículo.
//
// Determinista: sin Date.now()/Math.random aleatorio. Regenerar: node DATA/_scripts/gen_aurum_plan.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CUR = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/AURUM/curricula/_curriculum_v2.json'), 'utf8'));

// ─── Aplanar las 130 lecciones en orden (fase → semana → día 1..5) ───
const lecciones = [];
for (const det of CUR.detalles) {
  const fase = det.fase; // 1..7
  for (const sem of det.semanas) {
    for (const dia of sem.dias) {
      lecciones.push({ fase, semJson: sem.sem, dJson: dia.d, ...dia });
    }
  }
}
if (lecciones.length !== 130) throw new Error('Se esperaban 130 lecciones, hay ' + lecciones.length);

// ─── Calendario: 130 días hábiles L-V consecutivos desde 2026-06-24 ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const START = new Date('2026-06-26T12:00:00'); // viernes 26-jun-2026 (25-jun tampoco se estudió; todo corre a 26-jun · ÚLTIMA reprogramación)
function nextBusinessDay(date) {
  const d = new Date(date);
  do { d.setTime(d.getTime() + 86400000); } while (d.getDay() === 0 || d.getDay() === 6);
  return d;
}
// primer día hábil ≥ START (24-jun es miércoles → 1er hábil = mié 24-jun)
let cursor = new Date(START);
while (cursor.getDay() === 0 || cursor.getDay() === 6) cursor = nextBusinessDay(cursor);

// ─── título a Title Case suave (las fases vienen con mayúscula inicial en el JSON) ───
function tituloCase(s) {
  const MIN = new Set(['y', 'de', 'la', 'el', 'sin', 'e', 'del', 'al', 'en']);
  return String(s).toLowerCase().split(' ').map((w, i) => {
    if (i > 0 && MIN.has(w)) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ').replace(/\(([a-z])/g, (m, c) => '(' + c.toUpperCase());
}

// ─── formato de la lectura según tipo (audiolibro → audio · libro → lectura) ───
function formatoLectura(tipo) {
  return tipo === 'audiolibro' ? 'audio' : 'lectura';
}

// ─── Construir los 130 DiaAurum ───
const dias = [];
let date = new Date(cursor);
for (let i = 0; i < lecciones.length; i++) {
  const L = lecciones[i];
  const d = i + 1;                       // 1..130
  const semana = Math.floor(i / 5) + 1;  // 1..26 (5 días hábiles por semana)
  const fechaISO = date.toISOString().slice(0, 10);
  const wd = WD[date.getDay()];
  if (wd === 'Sáb' || wd === 'Dom') throw new Error('Día ' + d + ' cae en fin de semana: ' + fechaISO);

  const fa = CUR.fases.find((x) => x.n === L.fase);
  const faseId = 'f' + L.fase;
  const faseLabel = `F${L.fase} · ${tituloCase(fa.titulo)}`;

  const bloques = [];
  // A — vídeo a ver (pantalla · core)
  const v = L.ver || {};
  bloques.push({
    tag: 'A', slot: 'core', min: v.min || 0, formato: 'pantalla',
    material: v.canal || '', leccion: v.titulo || '', url: v.url || undefined,
    dur: v.min ? `${v.min} min` : undefined,
    real: !(v.url && /\(verificar\)/i.test(v.url)),
  });
  // PRAC — práctica/drill del día (practica · core)
  const p = L.practica || {};
  bloques.push({
    tag: 'PRAC', slot: 'core', min: p.min || 0, formato: 'practica',
    material: 'Drill del día', leccion: p.texto || '', real: true,
  });
  // L — lectura: libro/audiolibro (audio|lectura · slot 'lectura', en huecos de viaje)
  const lc = L.lectura;
  if (lc) {
    bloques.push({
      tag: 'L', slot: 'lectura', min: lc.min || 0, formato: formatoLectura(lc.tipo),
      material: lc.fuente || lc.titulo || '', leccion: lc.titulo || '', url: lc.url || undefined,
      dur: lc.min ? `${lc.min} min` : undefined,
      real: !(lc.url && /\(verificar\)/i.test(lc.url)),
    });
  }

  dias.push({
    d, fecha: fechaISO, wd, semana,
    faseId, fase: faseLabel,
    titulo: L.titulo,
    obs: L.obsidian_nota || undefined,
    min: L.min_core,                     // núcleo (ver + practica) = min_core (30-60)
    bloques,
  });

  date = nextBusinessDay(date);
}

// fecha fin = la del último día
const finISO = dias[dias.length - 1].fecha;
const TOTAL = dias.length;
const SEMANAS = dias[dias.length - 1].semana;

// ─── mapa de fases para la meta (faseId → label corto, con rango de semanas reales) ───
const semanasDeFase = {};
for (const x of dias) (semanasDeFase[x.faseId] = semanasDeFase[x.faseId] || new Set()).add(x.semana);
const fasesMeta = {};
for (const f of CUR.fases) {
  const set = semanasDeFase['f' + f.n];
  const arr = set ? [...set].sort((a, b) => a - b) : [];
  const rango = arr.length ? `sem ${arr[0]}-${arr[arr.length - 1]}` : '';
  fasesMeta['f' + f.n] = `F${f.n} · ${tituloCase(f.titulo)} (${rango})`;
}

// ─── Emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
const blkTs = (b) => {
  let o = `{tag:"${b.tag}",slot:"${b.slot}",min:${b.min || 0},formato:"${b.formato}",material:"${esc(b.material)}",leccion:"${esc(b.leccion)}"`;
  if (b.url) o += `,url:"${esc(b.url)}"`;
  if (b.dur) o += `,dur:"${esc(b.dur)}"`;
  o += `,real:${b.real !== false}}`;
  return o;
};
const diaTs = (x) => {
  let o = `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},faseId:"${x.faseId}",fase:"${esc(x.fase)}",titulo:"${esc(x.titulo)}"`;
  if (x.obs) o += `,obs:"${esc(x.obs)}"`;
  o += `,min:${x.min},bloques:[${x.bloques.map(blkTs).join(',')}]}`;
  return o;
};

const faseIdUnion = CUR.fases.map((f) => `'f${f.n}'`).join(' | ');
const fasesMetaTs = Object.entries(fasesMeta).map(([k, v]) => `${k}: '${v.replace(/'/g, "\\'")}'`).join(', ');

const ts = `/**
 * aurumDailyPlan.ts — Motor día-a-día AURUM v2 (${SEMANAS} semanas · ${TOTAL} días · ${dias[0].fecha} → ${finISO}).
 * AURUM = programa de 6 meses para volverse un closer de ventas de élite.
 * GENERADO por DATA/_scripts/gen_aurum_plan.js desde DATA/AURUM/curricula/_curriculum_v2.json.
 * NO editar a mano — regenerar: node DATA/_scripts/gen_aurum_plan.js
 *
 * Calendario: las ${TOTAL} lecciones se asignan a días HÁBILES consecutivos Lunes→Viernes
 * (salta sábados y domingos). Ventana fija en Google Calendar: 14:15-15:15.
 *  NÚCLEO (slot 'core', en 14:15-15:15, suma = min_core 30-60 min):
 *    A    (pantalla)  el VÍDEO a ver de la lección (link directo + min)
 *    PRAC (practica)  el drill del día — la práctica deliberada (la "caja negra" del closer)
 *  LECTURA (slot 'lectura', NO en esa hora — en tus huecos de viaje/lectura):
 *    L    (audio|lectura)  el libro/audiolibro de la fase: audio si tipo='audiolibro', lectura si tipo='libro'
 *  + link a Obsidian (vault, carpeta 07_VENTAS_AURUM).
 * real:true = URL verificada/estable · real:false = URL marcada "(verificar)" en el currículo.
 * Progreso REAL manual (PlanKey 'aurum', empieza 0%).
 */
export type AurumFormato = 'pantalla' | 'practica' | 'audio' | 'lectura';
export interface AurumBloque {
  tag: 'A' | 'PRAC' | 'L';
  slot: 'core' | 'lectura';
  min: number;
  formato: AurumFormato;
  material: string;
  leccion: string;
  url?: string;
  dur?: string;
  real: boolean;
}
export interface DiaAurum {
  d: number; fecha: string; wd: string; semana: number;
  faseId: ${faseIdUnion}; fase: string; titulo: string; obs?: string;
  min: number; // núcleo (ver + practica) = min_core
  bloques: AurumBloque[];
}

export const AURUM_PLAN_META = {
  inicio: '${dias[0].fecha}', fin: '${finISO}', totalDias: ${TOTAL}, semanas: ${SEMANAS},
  ventana: '14:15–15:15',
  bloque: "Nucleo 30-60 min (ver+practicar) en 14:15-15:15 · lectura/audiolibro en huecos de viaje",
  fases: { ${fasesMetaTs} },
} as const;

export const AURUM_DIAS: DiaAurum[] = [
${dias.map(diaTs).join(',\n')}
];

export function aurumDiaDe(fechaISO: string): DiaAurum | undefined { return AURUM_DIAS.find(x => x.fecha === fechaISO); }
export function aurum7d(fromD: number): DiaAurum[] { return AURUM_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }

export const AURUM_FORMATO_ICON: Record<AurumFormato, string> = {
  pantalla: '🎬', practica: '🎯', audio: '🎧', lectura: '📖',
};
export const AURUM_TAG_LABEL: Record<AurumBloque['tag'], string> = {
  A: 'A · ver', PRAC: 'PRAC · practicar pitch', L: 'lectura/audio (en tus huecos)',
};

// ─── Obsidian: nota del día en el vault (carpeta 07_VENTAS_AURUM) ───
const AURUM_VAULT = 'Vault_Medicina MIR_Joseph';
/** Enlace obsidian:// a la nota del día. El currículo trae rutas tipo "VENTAS/Fase1/S01 - …";
 *  las reanclamos a la carpeta real 07_VENTAS_AURUM del vault. */
export function aurumObsUrl(nota?: string): string | null {
  if (!nota) return null;
  const segs = String(nota).replace(/^VENTAS\\//, '').split('/');
  segs[segs.length - 1] = segs[segs.length - 1].replace(/[\\\\/:*?"<>|]/g, '-').trim();
  const file = '07_VENTAS_AURUM/' + segs.join('/');
  return 'obsidian://open?vault=' + encodeURIComponent(AURUM_VAULT) + '&file=' + encodeURIComponent(file);
}
`;

fs.writeFileSync(path.join(ROOT, 'src/lib/aurumDailyPlan.ts'), ts, 'utf8');

// ─── Verificaciones de salida ───
const finSemana = dias.filter((x) => x.wd === 'Sáb' || x.wd === 'Dom');
const semanasCubiertas = new Set(dias.map((x) => x.semana));
const minFuera = dias.filter((x) => x.min < 30 || x.min > 60);
console.log('OK src/lib/aurumDailyPlan.ts');
console.log('  inicio:', dias[0].fecha, '· fin:', finISO, '· totalDias:', TOTAL, '· semanas:', SEMANAS);
console.log('  ventana:', '14:15–15:15');
console.log('  días en fin de semana:', finSemana.length, '(debe ser 0)');
console.log('  semanas cubiertas:', semanasCubiertas.size, '(debe ser', SEMANAS + ')');
console.log('  días con min∉[30,60]:', minFuera.length, '(debe ser 0)');
if (TOTAL !== 130) throw new Error('Se esperaban 130 días, hay ' + TOTAL);
if (finSemana.length) throw new Error('Hay días en sábado/domingo');
if (semanasCubiertas.size !== SEMANAS || SEMANAS !== 26) throw new Error('Faltan semanas por cubrir (esperado 26, hay ' + SEMANAS + ')');
if (minFuera.length) throw new Error('Hay días con min_core fuera de [30,60]');
