# DATA/BUSINESS/_kpi/ — archivo del KPI log semanal de LIVIANO (Cockpit F1)

> Creado el 19-sep-2026 (v5.14). Carpeta destino del botón **"Exportar JSON"** del bloque *KPI log semanal*
> del Cockpit F1 de LIVIANO (`src/components/empresa/panels.tsx` → `LivianoKpiLog`). Hasta que el CRM Pulso
> exponga un endpoint read-only, esta carpeta es el único registro versionado de los números REALES de la semana.

## Qué guarda el botón

- **Origen**: `localStorage['jmd-liviano-kpi']` del navegador (este dispositivo). El Cockpit muestra 18 KPIs
  constantes (`LIVIANO_KPIS`); el log guarda los 6 KPIs **semanales** reales definidos en
  `src/lib/empresaData.ts` → `LIVIANO_KPI_SEMANAL`: `leads` · `consultas` · `altas` · `mrr` · `churn` · `cogs`.
- **Nombre del fichero**: `liviano_kpi_<AAAA>-W<SS>.json` (semana ISO del día en que se exporta, p. ej.
  `liviano_kpi_2026-W39.json` para la semana del lun 21-sep-2026). Si el navegador bloquea la descarga, el JSON se
  copia al portapapeles: pegarlo aquí con ese mismo nombre.
- **Forma del JSON** (una exportación = TODO el log, no solo la semana actual; el fichero más reciente contiene a los anteriores):

```json
{
  "exportado": "2026-09-25",
  "origen": "jmd-liviano-kpi",
  "destino": "DATA/BUSINESS/_kpi/",
  "metas": [ { "key": "leads", "label": "Leads", "unidad": "#", "meta": 10, "direccion": "mayor" }, "…" ],
  "regla": "Regla del tracker: si un KPI queda < 80 % de su meta DOS semanas seguidas → ajustar (oferta, canal o proceso), no esperar.",
  "semanas": [
    { "key": "2026-W39", "lunes": "2026-09-21", "valores": { "leads": 0, "consultas": 0, "altas": 0, "mrr": 0, "churn": 0, "cogs": 0 },
      "nota": "texto libre opcional", "guardado": "2026-09-25" }
  ]
}
```

## Regla de uso

1. Rellenar el log el **viernes** (o en la revisión semanal del sábado) con cifras reales del CRM/WhatsApp; sin dato → celda vacía, nunca 0 inventado.
2. Exportar y guardar aquí. Commit normal del repo (no contiene datos de pacientes: solo agregados semanales).
3. `kpiSemanalAlertas` aplica la regla "< 80 % dos semanas seguidas → ajustar"; las alertas se pintan en el Cockpit.
4. `DATA/_scripts/gen_revision_semanal.js` puede leer el JSON más reciente de esta carpeta (glob `liviano_kpi_*.json`) para el bloque LIVIANO — **A VERIFICAR (19-sep)**: cableado pendiente, hoy el script no lo lee.

Ficheros esperados: `liviano_kpi_AAAA-WSS.json` (uno por exportación) + este README + `.gitkeep`.
