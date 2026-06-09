import React from 'react';
import ResearchHub from '../components/study/ResearchHub';

/**
 * Research (mobile) — Hub rediseñado (camino a Mayo Clinic): estructura ENCAPS
 * (prioridad/vueltas/links/deadline) + movimiento de Business + alternancia Research↔Derma.
 * El kanban anterior queda en el historial git como referencia.
 */
export default function InvestigacionScreen() {
  return <ResearchHub variant="mobile" />;
}
