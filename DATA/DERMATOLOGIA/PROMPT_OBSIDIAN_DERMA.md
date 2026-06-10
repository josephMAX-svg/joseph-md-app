# PROMPT — Chat DERMATOLOGÍA · integración OBSIDIAN (pegar tal cual)

> Para el chat encargado de Dermatología, DESPUÉS de que haya extraído su temario
> (o como siguiente mensaje si ya lo hizo). Replica lo que el chat principal hizo
> para ProMIR/Qbankly/ENCAPS.

---

```
CONTEXTO: en D:\joseph-md-app ya está montada la integración Obsidian de los 3 grandes
sistemas (MIR, USMLE, ENCAPS). Tu trabajo: replicarla para DERMATOLOGÍA. LEE PRIMERO:

1) D:\agente_estudio\CLAUDE.md  ← cómo funciona el motor APEX (Ctrl+Shift+A → n8n →
   Anki+Obsidian+Notion+Supabase). Las notas de estudio caen en la carpeta del subtema.
2) D:\joseph-md-app\DATA\_scripts\build_vault_trilingue.js  ← el script de referencia
   que construyó el vault para MIR/USMLE/ENCAPS. COPIA SU PATRÓN (idempotente, dry-run
   primero, NUNCA borra ni sobreescribe, _concepto_madre.md con callouts + dataview).
3) D:\joseph-md-app\src\lib\obsidianMap.ts  ← mapa generado (obsidian:// deep-links).
4) El vault REAL: D:\JOSEPH\Vault_Medicina MIR_Joseph  (OJO: bajo D:\JOSEPH, con espacio
   en el nombre). Ya tiene: 01_USMLE, 03_MIR, 06_ENCAPS — NO LOS TOQUES.

QUÉ CONSTRUIR:
A) Crea la rama 07_DERMATOLOGIA\ en el vault con tu temario (el que extrajiste de las
   3 fuentes: AccessDermatologyDxRx + Qbankly derma + ProMIR derma — está en
   DATA/DERMATOLOGIA/temario.md y daily-plan). Patrón EXACTO de las otras ramas:
     07_DERMATOLOGIA\NN_Bloque\NN_subtema\APEX_creados\ + _concepto_madre.md
   La _concepto_madre bonita: frontmatter (tipo, examen: DERMA, bloque, subtema, fuentes,
   fecha, estado: vacio) + callout con links a las 3 fuentes + secciones Resumen /
   Conceptos clave / CCSN / dataview de APEX_creados. En el bloque de dermatopatología
   y cirugía añade campo fuente_primaria (Barnhill's / Kantor).
B) Escribe tu builder en DATA/_scripts/build_vault_derma.js (mismo estilo: dry-run →
   --write → reporte) y EMITE src/lib/obsidianDermaMap.ts con dermaObsUrl(...) por
   bloque/subtema (usa el mismo formato obsidian://open?vault=...&file=...).
   El vault name EXACTO: 'Vault_Medicina MIR_Joseph'.
C) En tu plan día-a-día de Derma en la app, añade el botón ◆ Obsidian (color #A78BFA)
   en la cola de HOY y en las filas del temario — igual que UsmleTodayPlan/MirTodayPlan
   (míralos como referencia de código).
D) Actualiza 00_Dashboard\Mapa_Temarios_Trilingue.md añadiendo la sección
   "🧴 DERMATOLOGÍA" con links a tus bloques (NO borres lo que ya tiene).
E) Nota en el README de DATA/DERMATOLOGIA: el ruteo n8n del motor APEX aún no escribe
   en 07_DERMATOLOGIA (las carpetas quedan listas para cuando se encienda).

REGLAS: no inventes subtemas (solo los del temario real extraído) · no toques
01_USMLE/03_MIR/06_ENCAPS ni el Calendar · dry-run antes de escribir · commit a master
con mensaje claro · al final reporta: nº carpetas creadas, qué quedó pendiente.
```
