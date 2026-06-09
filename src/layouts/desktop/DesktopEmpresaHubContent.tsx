import React from 'react';
import EmpresaHub from '../../components/empresa/EmpresaHub';

/**
 * DesktopEmpresaHubContent — versión desktop del Hub de Empresa (sección Business).
 * Mismo hub multi-empresa con grids más anchos (GlassCards, métricas hero).
 * Reemplaza a DesktopEmpresaContent (DTC Dermatología), conservado como referencia.
 */
export default function DesktopEmpresaHubContent() {
  return <EmpresaHub variant="desktop" />;
}
