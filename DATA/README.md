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

## Ritmo de estudio: v7.00 (sáb 28-nov-2026), reorganización final, hora Lima
Todo arranca el **lun 30-nov-2026**. Fuente única de fechas: `DATA/_scripts/_fechas_v6.json` → `src/lib/fechasV6.ts`. Estado y detalle en [`_v600/README.md`](_v600/README.md).
- **ENCAPS (PRIORIDAD: 1.er puesto, examen dom 14-mar-2027, fijo).**
  - Mañanas L-V 07:15-12:00: 21 mañanas más 2 colchones (jue 24 y jue 31-dic).
  - Rotación 16:15-17:15 · cifras y normas a las 18:00 (lun·mié·vie) o a las 12:00-12:20 (mar·jue).
  - Intensiva del lun 4-ene al vie 12-mar. Plan: `ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md`.
- **USMLE Step 1: en PAUSA** del 30-nov al 15-mar, solo mantenimiento:
  - Anki ≤10′ a las 05:00.
  - mar·jue 18:00-18:45 en diciembre; sáb 04:15-05:45 del 9-ene al 27-feb.
  - Reinicio el mar 16-mar · examen provisional **lun 20-dic-2027** (plan B 27-dic).
- **Tardes L-V:** SYNAPSE 12:30 · Business 13:00 · Derma 13:30 · AURUM 14:15 · MIR 15:15 · LIVIANO 17:15.
  - Vibecoding a las 04:15.
  - Research ↔ Derma alternan; **Research está EN SUSPENSO** (su día queda como hueco libre).
- **Reglas fijas:** rutina 05:45-07:15 intocable · 0 pantallas desde las 20:30.
  - Sábado: gimnasio 08:30-14:00 y baile 17:00-20:00.
  - Domingo: baile desde las 17:00.
