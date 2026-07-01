/**
 * homeBriefing.ts — Material curado del COCKPIT del Home (Command Center).
 *
 * Enriquece el Home con contenido, SIN tocar Supabase, fechas, cronogramas ni
 * item_keys. Todo se compone al vuelo desde datos ya presentes en la app:
 *   - "Today at a glance"  → patrón Superhuman Morning Briefing (1 línea accionable)
 *   - IDEA DE LA SEMANA    → 1 idea-ancla semanal ligada a la fase del orquestador
 *   - CANON (no negociable)→ núcleo de ~10 lecturas del founder (Naval / Tribe of Mentors)
 *
 * Fuentes del encuadre: superhuman.com/products/mail · navalmanack.com/navals-recommended-reading
 * · notion.com/templates/life-command-center-529 · culturedcode.com/things
 * NO editar cronogramas: esto es contenido/encuadre, no reprogramación.
 */

// ── Núcleo "no negociable" de la Biblioteca (canon del operador) ──
// Referencia por n de ESTUDIO_LIBROS / BIBLIOTECA_LIBROS. Marca el núcleo (lo
// esencial) separado de la cola larga. NO añade libros: solo los clasifica.
export const BIBLIOTECA_CANON: number[] = [
  2,   // Outlive — Peter Attia (identidad/longevidad · referente maestro)
  1,   // The Obesity Code — Jason Fung (paradigma hormonal · columna de Liviano)
  8,   // Why We Sleep — Matthew Walker (defiende las 7h · doctrina militarizada)
  20,  // $100M Offers — Alex Hormozi (oferta irresistible · núcleo comercial)
  21,  // $100M Leads — Alex Hormozi (generación de leads)
  28,  // Ultralearning — Scott Young (método de aprendizaje directo · meta-skill)
];

export function esCanon(n: number): boolean {
  return BIBLIOTECA_CANON.includes(n);
}

// ── IDEA DE LA SEMANA (idea-ancla, no solo frase diaria) ──
// Rota por número de semana ISO. Enmarca el foco semanal del cockpit y lo liga
// a la doctrina de estudio (Palmerton/Oakley/Deep Work) ya presente en memoria.
export interface IdeaSemana {
  idea: string;
  fuente: string;
  foco: string;
}

const IDEAS_SEMANA: IdeaSemana[] = [
  { idea: 'Comprensión antes que memoria: 1 idea por tarjeta, y solo avanzas cuando la entiendes al 100%.', fuente: 'Alec Palmerton · Yousmle', foco: 'Calidad del encoding' },
  { idea: 'Mide por % en ciego, no por sensación. La ilusión de competencia se rompe con el pre-test.', fuente: 'Barbara Oakley · A Mind for Numbers', foco: 'Testing efectivo' },
  { idea: 'Defiende las 7h de sueño con evidencia: el sueño consolida lo que estudiaste hoy.', fuente: 'Matthew Walker · Why We Sleep', foco: 'Consolidación' },
  { idea: 'Deep work sin fricción: elimina la decisión, protege el bloque, entra al foco enfocado→difuso.', fuente: 'Cal Newport · Deep Work', foco: 'Foco profundo' },
  { idea: 'La dificultad deseable es la que enseña: intercalar y espaciar cuesta hoy y paga mañana.', fuente: 'Bjork · desirable difficulty', foco: 'Interleaving' },
  { idea: 'El operador parte del Higher Self: identidad → meta → proyecto → la acción de hoy.', fuente: 'Notion Life OS · identity-based', foco: 'Identidad→acción' },
  { idea: 'Haz ofertas tan buenas que decir que no se sienta estúpido — vale para tu tiempo también.', fuente: 'Alex Hormozi · $100M Offers', foco: 'Prioridad brutal' },
];

/** Idea de la semana (rota por semana del año, determinista). */
export function ideaDeLaSemana(iso: string): IdeaSemana {
  const wk = isoWeek(iso);
  return IDEAS_SEMANA[wk % IDEAS_SEMANA.length];
}

function isoWeek(iso: string): number {
  try {
    const d = new Date(iso + 'T00:00:00');
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
    return Math.floor((days + jan1.getDay()) / 7);
  } catch {
    return 0;
  }
}

// ── "Today at a glance" — Morning Briefing de 1 línea ──
// Compone un resumen accionable desde datos ya cargados por el Home. No pide
// data nueva: recibe lo que el cockpit ya tiene en mano.
export interface BriefingInput {
  encapsTema?: string | null;     // tema ENCAPS del día (texto corto)
  mirBloque?: string | null;      // etiqueta MIR/USMLE (p.ej. "MIR D12 · Cardio")
  unread?: number;                // reports sin leer
  apexQueue?: number;             // APEX pendientes
  streak?: number;                // racha
  deepWorkH?: number;             // horas deep work hoy
}

/** Frase-briefing de 1 línea (estilo Superhuman). Vacía si no hay señales. */
export function componerBriefing(inp: BriefingInput): string {
  const partes: string[] = [];
  if (inp.encapsTema) partes.push(`hoy toca ${inp.encapsTema}`);
  if (inp.mirBloque) partes.push(inp.mirBloque);
  if ((inp.deepWorkH ?? 0) > 0) partes.push(`${Math.round((inp.deepWorkH ?? 0) * 10) / 10}h deep work`);
  if ((inp.apexQueue ?? 0) > 0) partes.push(`${inp.apexQueue} APEX en cola`);
  if ((inp.unread ?? 0) > 0) partes.push(`${inp.unread} reporte${(inp.unread ?? 0) > 1 ? 's' : ''} sin leer`);
  if ((inp.streak ?? 0) > 0) partes.push(`racha ${inp.streak}d`);
  if (!partes.length) return 'Sin loops abiertos — arranca el bloque de HOY.';
  // capitaliza la primera parte
  const s = partes.join(' · ');
  return s.charAt(0).toUpperCase() + s.slice(1) + '.';
}
