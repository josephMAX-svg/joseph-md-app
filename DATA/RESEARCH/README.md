# DATA · RESEARCH (revisiones sistemáticas → Mayo / Bioclinic)

Carpeta de la sección **Research**. Spec maestra: [`../../MD_MAESTRO_BIOCLINIC_RESEARCH.md`](../../MD_MAESTRO_BIOCLINIC_RESEARCH.md)
(visión Mayo/Bioclinic, líneas 0–8, motor de publicación, sistema agéntico, roadmap).
Aquí se **guarda la data investigada** y el plan día-a-día de research.

## Foco
- **Revisiones sistemáticas** (no investigación general): es el camino más rápido a PIPs
  porque **no requieren comité de ética** y se hacen con datos públicos.
- **Línea énfasis:** dermatología **estética estructural** (Líneas 1–4, 7).
- **Meta dura:** ~3 PIPs para competir · 8–15 nivel Mayo · ≥3 SR/meta-análisis.
- **Contexto temporal:** España (MIR 2030–2034) → fellowship dermatología EE.UU. (Mayo/
  Bioclinic) → residencia. Estándares muy altos para IMG (ver §1.3 *reality check* del MD).

## Estructura actual (lo que ya está aquí)
```
RESEARCH/
  README.md                 (este archivo)
  journals.md               ✅ revistas top verificadas (IF JCR 2024, cuartil, Diamond OA/50% LMIC, requisitos)
  benchmarks.md             ✅ cuántas pubs/SR para match derma EE.UU. + Mayo (honesto, NRMP verificado)
  systematic-reviews.md     ✅ playbook PRISMA/PROSPERO/GRADE + herramientas + walkthrough de referentes paso a paso
  discovery-engine.md       ✅ MOTOR verificado jun-2026: OpenAlex troncal + 5 fuentes, cascada texto completo, citas por IA (no Zotero), orquestación n8n/Supabase/Ollama
  agentic-system.md         ✅ sistema agéntico (orquestador + subagentes + QA citas/Turnitin + ensamblado .docx)
  daily-plan.md             ✅ plan día-a-día interdiario con Derma (40 átomos, mismo motor que USMLE/MIR · metodología OpenAlex/IA)
  lines/                    ✅ fichas de SR por línea (índice + L4 complicaciones=SR-1 + L5 fototipos=SR-2)
  RUTA_PUBLICACION_2027.md  ✅ calendario editorial 12 meses + §3.1 PRESUPUESTO 2026-27 (APC verificados 5-sep-2026) + §9 MESA EDITORIAL (5 entregables, estado vivo)
  MENTORES.md               ✅ mini-CRM de mentores/senior authors (Dr. Ciro · Rising Scholars/AuthorAID · Finlay · Cotofana · DIGA) + 3 mensajes de sep redactados (NO enviados)
  CARTA_1/candidatos.md     ✅ carta al editor #1: 5 artículos diana jul-sep 2026 con DOI verificado, ventana, límites, coste y ángulo latino + correo a IJD (no enviado)
  CASE_REPORT_1/            ✅ case report #1: caso_candidatos (tabla vacía + fuentes A/B) · consentimiento_publicacion_ES_EN · protocolo_fotos · CARE_checklist_13
  TESIS_L0/                 ✅ tesis IGA×CADI → research letter: etica.md (CEI/consentimientos) · strobe_checklist.md · research_letter_outline.md (cascada JAAD Intl → IJD → Actas → Anais)
  agentic/prompts_claude_code/  ✅ plantillas fijas letter_to_editor.md · case_report_CARE.md · research_letter_STROBE.md → docx_assembler.py --template {sr|letter|care|strobe} (gate citation_verifier)
  ../../supabase/functions/ ✅ copia versionada de las Edge Functions research-discovery v2 / research-fulltext v1 (5-sep-2026) + README
  MANUAL_MAESTRO_SISTEMA_INVESTIGACION_AGENTICA.md  (input del usuario · spec conceptual que discovery-engine.md verifica y aterriza)
  PROMPT_CHAT_RESEARCH.md · PROMPT_OBSIDIAN_RESEARCH.md   prompts base
  _raw_findings.json        fuentes crudas del workflow de verificación (352 búsquedas)
```

## Encargo del chat de Research (estado)
1. ✅ **Cómo construyen los referentes** una SR paso a paso → walkthrough canónico mapeado a recursos
   reales en [`systematic-reviews.md`](systematic-reviews.md) (sección "Referentes de método").
2. ✅ **Revistas top + dónde publicar gratis** (Diamond OA / 50% LMIC) y requisitos → [`journals.md`](journals.md);
   benchmarks Mayo honestos → [`benchmarks.md`](benchmarks.md).
3. ✅ **Plan día-a-día** interdiario con Derma, mismo motor que USMLE/MIR, links/vídeos reales →
   [`daily-plan.md`](daily-plan.md) (40 átomos que ejecutan SR-1 de extremo a extremo).
4. ✅ **Sistema agéntico** (orchestrator-worker + HITL, subagentes por sección, QA de citas+Turnitin,
   ensamblado .docx runnable) → [`agentic-system.md`](agentic-system.md).
5. ✅ MD maestro ampliado (§13) sin pisar el §12 verificado; fichas de SR por línea → [`lines/`](lines/).

> **Pendiente / próxima acción:** ver el resumen al final de [`daily-plan.md`](daily-plan.md) y la siguiente
> acción de máxima palanca en el MD maestro §13.

> El bloque de investigación verificada (revistas, SR, benchmarks Mayo, sistema agéntico)
> se añade como apéndice a `MD_MAESTRO_BIOCLINIC_RESEARCH.md` (ver "Apéndice verificado").
