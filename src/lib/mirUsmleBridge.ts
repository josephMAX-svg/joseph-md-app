/**
 * mirUsmleBridge.ts — puente de SOLO LECTURA entre el bloque MIR (15:15) y el Step 1 (mañana).
 *
 * El plan MIR v3 está permutado para que cada asignatura PRECEDA ~1 semana a su sistema Step 1
 * (clínica en español como prime → mecanismo en inglés 7 días después = re-exposición espaciada).
 * Este módulo hace explícito ese puente para que Joseph no lo tenga que recordar de memoria a las
 * 15:15 tras 6 h de Step 1:
 *  · mirUsmleBridge(fecha) → qué sistema(s) Step 1 tocan ESA semana (DIAS reales de usmleStep1Daily)
 *    + el rango completo del sistema homólogo de la asignatura MIR del día.
 *  · usmleMirParalelo(fecha) → para la UI USMLE: "MIR en paralelo: Cardiología (D5-D11)".
 * No escribe nada. Otro agente lo integra en UsmleTodayPlan.
 */
import { DIAS, DiaUSMLE } from './usmleStep1Daily';
import { MIR_DIAS, DiaMIR, mirDiaDe, mirBloques, MIR_TEMAS_TOTAL } from './mirDailyPlan';

export interface SistemaSemana { system: string; dIni: number; dFin: number; fechaIni: string; fechaFin: string; }
export interface RangoSistema { system: string; dIni: number; dFin: number; fechaIni: string; fechaFin: string; }
export interface MirUsmleBridge {
  fecha: string;
  /** asignatura MIR del día (plan D1-D76) o null (colchón, mantenimiento, día libre) */
  mir: { asignatura: string; d: number; dIni: number; dFin: number; usmleSystem: string } | null;
  /** semana L-V de `fecha`: sistemas Step 1 que se estudian (sin los días Assessment) + hitos */
  semana: { lunes: string; viernes: string; sistemas: SistemaSemana[]; hitos: string[] };
  /** rango completo del sistema homólogo en usmleStep1Daily (null si '—' o no existe) */
  homologo: RangoSistema | null;
  /** chip HOY: "Step 1 esta semana: Cardiovascular D6-D10" */
  texto: string;
  /** "Homólogo Step 1 de Cardiología: Cardiovascular D6-D15 (14-sep→25-sep)" */
  textoHomologo: string;
  /** para UsmleTodayPlan: "MIR en paralelo: Cardiología (D5-D11)" */
  textoUsmle: string;
}

const fmtCorto = (iso: string) => {
  const m = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(iso.slice(8, 10), 10)}-${m[parseInt(iso.slice(5, 7), 10) - 1] || '?'}`;
};
function lunesDe(iso: string): string {
  try { const d = new Date(iso + 'T12:00:00Z'); const w = d.getUTCDay(); d.setUTCDate(d.getUTCDate() - ((w + 6) % 7)); return d.toISOString().slice(0, 10); } catch { return iso; }
}
function addDias(iso: string, n: number): string {
  try { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); } catch { return iso; }
}
/** Agrupa días USMLE consecutivos por sistema. */
function agrupar(dias: DiaUSMLE[]): SistemaSemana[] {
  const out: SistemaSemana[] = [];
  for (const x of dias) {
    if (x.system === 'Assessment') continue;
    const last = out[out.length - 1];
    if (last && last.system === x.system) { last.dFin = x.d; last.fechaFin = x.fecha; }
    else out.push({ system: x.system, dIni: x.d, dFin: x.d, fechaIni: x.fecha, fechaFin: x.fecha });
  }
  return out;
}
/** Rango completo (primer→último día) de un sistema Step 1; acepta `system` o `bbCh` (p. ej. 'Biostats/Epi'). */
export function usmleRangoSistema(system: string): RangoSistema | null {
  if (!system || system === '—') return null;
  const ds = DIAS.filter((x) => x.system === system || x.bbCh === system);
  if (!ds.length) return null;
  return { system, dIni: ds[0].d, dFin: ds[ds.length - 1].d, fechaIni: ds[0].fecha, fechaFin: ds[ds.length - 1].fecha };
}
const rangoTxt = (r: { dIni: number; dFin: number }) => (r.dIni === r.dFin ? `D${r.dIni}` : `D${r.dIni}-D${r.dFin}`);

export function mirUsmleBridge(fecha: string): MirUsmleBridge {
  const lunes = lunesDe(fecha), viernes = addDias(lunes, 4);
  const semanaDias = DIAS.filter((x) => x.fecha >= lunes && x.fecha <= viernes);
  const sistemas = agrupar(semanaDias);
  const hitos = semanaDias.filter((x) => x.system === 'Assessment').map((x) => `${x.uw} (${fmtCorto(x.fecha)})`);
  const dia: DiaMIR | undefined = mirDiaDe(fecha);
  const bloque = dia && dia.d <= MIR_TEMAS_TOTAL ? mirBloques().find((b) => b.num === dia.num && dia.d >= b.dIni && dia.d <= b.dFin) : undefined;
  const mir = dia && bloque ? { asignatura: dia.asignatura, d: dia.d, dIni: bloque.dIni, dFin: bloque.dFin, usmleSystem: dia.usmleSystem } : null;
  const homologo = mir ? usmleRangoSistema(mir.usmleSystem) : null;
  const texto = sistemas.length
    ? `Step 1 esta semana: ${sistemas.map((s) => `${s.system} ${rangoTxt(s)}`).join(' · ')}${hitos.length ? ` · 🎯 ${hitos.join(', ')}` : ''}`
    : hitos.length ? `Step 1 esta semana: 🎯 ${hitos.join(', ')}` : 'Step 1: sin días de plan esta semana';
  const textoHomologo = mir
    ? homologo
      ? `Homólogo Step 1 de ${mir.asignatura}: ${homologo.system} ${rangoTxt(homologo)} (${fmtCorto(homologo.fechaIni)}→${fmtCorto(homologo.fechaFin)})`
      : `${mir.asignatura}: sin homólogo directo en el Step 1`
    : '';
  const textoUsmle = mir ? `MIR en paralelo: ${mir.asignatura} (D${mir.dIni}-D${mir.dFin})` : '';
  return { fecha, mir, semana: { lunes, viernes, sistemas, hitos }, homologo, texto, textoHomologo, textoUsmle };
}

/** Para la UI USMLE: asignatura MIR que corre en paralelo esa semana (aunque el día concreto sea libre). */
export function usmleMirParalelo(fecha: string): { asignatura: string; dIni: number; dFin: number; usmleSystem: string; texto: string } | null {
  const lunes = lunesDe(fecha), viernes = addDias(lunes, 4);
  const semana = MIR_DIAS.filter((x) => x.fecha >= lunes && x.fecha <= viernes && x.d <= MIR_TEMAS_TOTAL);
  if (!semana.length) return null;
  const counts = new Map<string, number>();
  for (const x of semana) counts.set(x.asignatura, (counts.get(x.asignatura) || 0) + 1);
  const asignatura = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0];
  const b = mirBloques().find((bl) => bl.asignatura === asignatura);
  if (!b) return null;
  return { asignatura, dIni: b.dIni, dFin: b.dFin, usmleSystem: b.usmleSystem, texto: `MIR en paralelo: ${asignatura} (D${b.dIni}-D${b.dFin})` };
}
