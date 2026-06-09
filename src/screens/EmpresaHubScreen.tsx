import React from 'react';
import EmpresaHub from '../components/empresa/EmpresaHub';

/**
 * EmpresaHubScreen — versión mobile/tablet del Hub de Empresa (sección Business).
 * Selector Pulso · LIVIANO · PIRQA · Franquicias con los 7 paneles de Liviano.
 * Reemplaza a EmpresaScreen (DTC Dermatología), que se conserva como referencia.
 */
export default function EmpresaHubScreen() {
  return <EmpresaHub variant="mobile" />;
}
