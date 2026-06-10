# PROMPT — Chat RESEARCH · integración OBSIDIAN (pegar tal cual)

> Para el chat encargado de Research (revisiones sistemáticas), DESPUÉS de su trabajo
> base (journals/benchmarks/daily-plan ya están ✅ en DATA/RESEARCH/). Replica la
> integración Obsidian que el chat principal montó para MIR/USMLE/ENCAPS.

---

```
CONTEXTO: en D:\joseph-md-app ya está montada la integración Obsidian de los 3 grandes
sistemas (MIR, USMLE, ENCAPS) y tu plan día-a-día de research ya existe
(DATA/RESEARCH/daily-plan.md + src/lib/researchDailyPlan.ts). Tu trabajo: darle su rama
en el vault Obsidian y conectar los links. LEE PRIMERO:

1) D:\agente_estudio\CLAUDE.md  ← motor APEX y patrón de carpetas (APEX_creados/ por
   subtema; el sistema agéntico de papers escribirá también aquí sus notas).
2) D:\joseph-md-app\DATA\_scripts\build_vault_trilingue.js  ← script de referencia que
   construyó el vault trilingüe. COPIA SU PATRÓN (idempotente, dry-run, nunca borra).
3) D:\joseph-md-app\src\lib\obsidianMap.ts  ← formato de los deep-links obsidian://.
4) El vault REAL: D:\JOSEPH\Vault_Medicina MIR_Joseph  (bajo D:\JOSEPH). Ya existe la
   carpeta 04_INVESTIGACIÓN DERMATOLÓGICA — ÚSALA como tu rama (no crees otra raíz);
   primero LISTA su contenido actual y NO toques lo que ya tenga.

QUÉ CONSTRUIR:
A) Dentro de 04_INVESTIGACIÓN DERMATOLÓGICA\ crea la estructura del programa:
     00_DASHBOARD_RESEARCH\Dashboard_Research.md   (bonito: callouts + dataview)
     01_LINEAS\NN_linea\  ← una carpeta por línea de investigación (L0–L8 del
        MD_MAESTRO_BIOCLINIC_RESEARCH.md §5), cada una con APEX_creados\ +
        _concepto_madre.md (frontmatter: linea, mayo_score, estado, revistas_objetivo;
        callout con el gap + SR derivable + colaboradores)
     02_SR_EN_CURSO\SR-1_complicaciones\ y SR-2_fototipos\  ← una carpeta por revisión
        sistemática activa (de DATA/RESEARCH/lines/), con subcarpetas del pipeline:
        01_protocolo_PICO\ 02_busqueda\ 03_screening\ 04_extraccion\ 05_manuscrito\
        y una _hoja_de_ruta.md por SR (checklist PRISMA/PROSPERO con casillas - [ ])
     03_PLAYBOOK\  ← notas con el playbook SR (resume de DATA/RESEARCH/systematic-reviews.md)
B) Builder en DATA/_scripts/build_vault_research.js (dry-run → --write → reporte) que
   EMITE src/lib/obsidianResearchMap.ts con researchObsUrl(...) por línea y por SR.
   Vault name EXACTO: 'Vault_Medicina MIR_Joseph'.
C) En tu plan día-a-día de Research en la app, añade el botón ◆ Obsidian (#A78BFA) en
   la cola de HOY y filas del temario (referencia: UsmleTodayPlan.tsx) — cada átomo del
   plan enlaza a la carpeta de su SR/línea.
D) Actualiza 00_Dashboard\Mapa_Temarios_Trilingue.md añadiendo la sección
   "🔬 RESEARCH" (NO borres lo existente).
E) El sistema agéntico (DATA/RESEARCH/agentic-system.md): añade a su spec que el QA/
   ensamblador deja una nota-resumen del .docx generado en la carpeta 05_manuscrito\
   de la SR correspondiente (path exacto), para que todo quede navegable en Obsidian.

REGLAS: no toques 01_USMLE/03_MIR/06_ENCAPS ni lo ya existente en 04_INVESTIGACIÓN
DERMATOLÓGICA · dry-run antes de escribir · no inventes data (líneas/SR = las del MD
maestro y DATA/RESEARCH/lines/) · commit a master · reporta carpetas creadas y pendientes.
```
