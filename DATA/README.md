# DATA — base de datos estructurada del proyecto `joseph-md-app`

Carpeta raíz donde vive **toda la data del programa**, separada por dominio para no
perderla. La data "viva" que consume la app está en `src/lib/*.ts` (versionada en git);
aquí se **consolida en formato legible** y se **guarda la data que extraen los chats**.

| Carpeta | Qué contiene | Estado | Chat responsable |
|---------|--------------|--------|------------------|
| [`USMLE/`](USMLE/README.md) | Plan Step 1 día-a-día · Qbankly (uWorld/Amboss/PassMed) · B&B · Sketchy · Palmerton · protocolo Google Calendar | ✅ poblado | (hecho en este chat) |
| [`MIR/`](MIR/README.md) | Plan MIR día-a-día (ProMIR) · 12 asignaturas · Peso MIR % · deep-links · protocolo Calendar | ✅ poblado | (hecho en este chat) |
| [`DERMATOLOGIA/`](DERMATOLOGIA/README.md) | Dermatología (board + estética) · 3 fuentes: Qbankly derma, ProMIR derma, AccessDermatologyDxRx · spec en [`../DERMA_MASTER_SPEC.md`](../DERMA_MASTER_SPEC.md) | 🟡 scaffold | **Chat Dermatología** |
| [`RESEARCH/`](RESEARCH/README.md) | Revisiones sistemáticas · revistas objetivo · líneas de investigación · sistema agéntico · spec en [`../MD_MAESTRO_BIOCLINIC_RESEARCH.md`](../MD_MAESTRO_BIOCLINIC_RESEARCH.md) | 🟡 scaffold | **Chat Research** |

## Reglas de la data (para todos los chats)
1. **No inventar.** Cada dato (duración, página, IF, requisito, deep-link) se extrae de
   la fuente real (plataforma logueada / web verificable) o se marca `[pendiente]`.
2. **Una fuente canónica por dato.** Si la app lo usa, vive en `src/lib/*.ts`; estos MD
   son el mapa legible + la data cruda que aún no está en código.
3. **Guardar siempre aquí.** Todo chat, al terminar, deja su data en la carpeta de su
   dominio (sub-carpeta `_scrape/` para JSON crudo, MD para lo consolidado).

## Ritmo de estudio (calendario real del usuario, hora Lima)
- **USMLE Step 1** — **BLOQUE PRINCIPAL** desde la reestructuración del 31-ago (6h15/día L-V: 05:00 Anki AM · 07:15 repaso anclado ·
  08:15 pre-test 10Q · 09:00 deep prime · 11:00 30Q · 18:00 eval). Régimen v5.18: D1 = lun 5-oct-2026 → D95 = mié 17-feb-2027 (D-1 real) →
  examen target jue 18-feb-2027 (`src/lib/usmleStep1Daily.ts`; v5.17: jue 1-oct → lun 15-feb, examen mar 16-feb). *(Hasta el 31-ago era el bloque 16:15–17:15.)*
- **ENCAPS** — 1h/día de banqueo (16:15–17:15 L-V, mantenimiento 2027-I: lun 5-oct-2026 → vie 12-feb-2027, v5.18; v5.17: jue 1-oct → mié 10-feb; `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`).
- **MIR** — bloque diario 15:15–16:15 (prioridad España).
- **Dermatología ↔ Research** — **interdiario alternando** (un día Derma, el siguiente
  Research), en el bloque de estudio que corresponda. Ambos se construyen día-a-día con
  el mismo motor (tema atómico/día, links reales, progreso real marcable).
