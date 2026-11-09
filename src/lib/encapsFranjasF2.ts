/**
 * encapsFranjasF2.ts — franjas de la intensiva ENCAPS (F2) que pintan A LA VEZ el Home (plantillasV6.bloquesF2), ENCAPS → Plan › Horario
 * (EncapsPlanView.bloquesIntensivoBase, con la fila viva) y los ítems del día (encapsPlan.itemsBase: su `hora` y su `dur` salen de aquí).
 * FUENTE ÚNICA: antes cada vista tenía su hora (Home 09:30-12:00 · Horario 09:30-10:30 · ítem 60′ en la corrección de los SIM de las 07:15; la de
 * las 18:00 en 45′ con el ítem en 60′; el cierre semanal de los viernes solo en el Home). Módulo hoja: solo importa fechasV6 (también hoja).
 * v6.07 (fix rev. e5fd4bd, 8-nov-2026): nuevo (sustituye a rutinaGuia.franjaCorrSim11De). check_rutina_guia.js (6b) compara las tres vistas.
 */
import { SKIP_V6 } from './fechasV6';

export interface FranjaF2 { ini: string; fin: string; min: number }
/** Corrección de un simulacro: + `peoresDesde` = hora a la que empiezan «los 2 códigos peores» cuando tienen tramo propio (SIM de las 07:15). */
export interface FranjaCorrSim extends FranjaF2 { peoresDesde: string | null }

const aMin = (h: string): number => { const [a, b] = h.split(':').map(Number); return (a ?? 0) * 60 + (b ?? 0); };
const franja = (ini: string, fin: string): FranjaF2 => ({ ini, fin, min: aMin(fin) - aMin(ini) });

/** CORRECCIÓN + CIERRE de un simulacro 100Q de la intensiva (SIM 100Q, pre-test 2026-II, dress rehearsal D-2) = ítem D{dia}:i_sim_corr:
 *  · SIM / pre-test de las 07:15 (07:15-09:15) → 09:30-12:00: corrección por código + CIERRE 09:30-11:00 y los 2 códigos peores 11:00-12:00
 *    (PROPUESTA_V6 §2.2 «Viernes», V6_ESPEC §F2, PRETEST_2026-II.md: «como los viernes del núcleo»; serie del Calendar v6.07 «corrección del SIM 09:30-12:00»);
 *  · SIM / dress de las 11:00 (11:00-13:00) → 16:15-17:15 si el 16:15 está libre (la fila no trae extra.carril_b) · 18:00-18:45 si el 16:15 es del
 *    carril B (donde iría la EVAL: la fila del SIM no trae extra.loop). Los 2 códigos peores van dentro de la hora (y, si mañana es REPASO de la
 *    quincena, la corrección a fondo es ese repaso de las 07:15). */
export function franjaCorrSimDe(hora: string, conCarrilB: boolean): FranjaCorrSim {
  if (hora !== '11:00') return { ...franja('09:30', '12:00'), peoresDesde: '11:00' };
  return { ...(conCarrilB ? franja('18:00', '18:45') : franja('16:15', '17:15')), peoresDesde: null };
}

/** ¿`iso` es el último hábil (L-V fuera de SKIP) de su semana? El viernes; antes si lo que queda de la semana es SKIP (p. ej. mié 24-mar-2027, con
 *  el jueves y el viernes santo en SKIP_V6: con el examen el 18-abr o el 25-abr el generador pone ahí el SIM 100Q del módulo parcial). */
export function ultimoHabilDeSemana(iso: string, skip: Set<string> = SKIP_V6): boolean {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`), w = d.getUTCDay();
  if (w === 0 || w === 6) return false;
  for (let k = 1; k <= 5 - w; k++) {
    const x = new Date(d); x.setUTCDate(d.getUTCDate() + k);
    if (!skip.has(x.toISOString().slice(0, 10))) return false;
  }
  return true;
}

/** CIERRE SEMANAL del ENCAPS (node DATA/_scripts/gen_encaps_semana.js --pull → --semana) = ítem D{dia}:i_semana, en el día de SIM 100Q / pre-test
 *  que cierra la semana (ultimoHabilDeSemana): es la serie 18:00 del Calendar («ENCAPS EVAL 20Q (10 + 10) · viernes: --pull y cierre semanal»,
 *  V6_ESPEC; PROPUESTA_V6 §2.2 «Viernes 18:00-18:45 --pull y cierre semanal»): 18:00-18:45 si las 18:00 están libres · 18:45-19:00, al terminar la
 *  corrección, si el simulacro es de las 11:00 y el 16:15 es del carril B (la corrección ocupa 18:00-18:45: vie 5-mar-2027). */
export function franjaCierreSemanalDe(hora: string, conCarrilB: boolean): FranjaF2 {
  const c = franjaCorrSimDe(hora, conCarrilB);
  return c.ini === '18:00' ? franja(c.fin, '19:00') : franja('18:00', '18:45');
}
