import React from 'react';
import DermaHub from '../components/study/DermaHub';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

/**
 * Derma — Hub rediseñado (referente clínico → Mayo): currículo por bloques A–G
 * (prioridad/vueltas/links) + protocolo 12 semanas + movimiento de Business +
 * alternancia Research↔Derma. Usado en mobile y desktop (detecta el contexto).
 * El currículo estético anterior (Cotofana/de Maio) queda en el historial git.
 */
export default function DermaScreen() {
  const { isDesktop } = useResponsiveLayout();
  return <DermaHub variant={isDesktop ? 'desktop' : 'mobile'} />;
}
