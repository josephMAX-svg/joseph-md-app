# REUSO_PULSO — Qué reutilizamos del CRM (sin tocarlo)

> Solo lectura del repo `CRM_PULSO_v3.1/`. Lo que reusamos lo **copiamos/adaptamos dentro** de
> `PAGINA WEB EJERCICIO Y NUTRICION/`. Nada del original se modificó.

---

## 1. Design System (`02_DESIGN_SYSTEM/`)
**Reusado:** tokens "warm clinical / premium editorial".
- Paleta: superficie `#FAFAF7`, navy marca `#1E3A5F`, oro premium `#A8895A`, estados muted (success `#3A7A4F`,
  warning `#8B6F2C`, error `#94584E`). Para el **portal del usuario** adoptamos además la variante cálida del
  paciente LIVIANO (microcemento `#F2EEE5`, salvia `#4A5C40`, latón `#B8924F`) por ser mobile-first y "casa de adobe
  con bioimpedanciometría".
- Tipografía: **serif para headings** (Newsreader/Fraunces) + **Inter** para body + **mono tabular** para números.
- Layout/densidad: whitespace generoso, acento gold-ochre en page headers, **touch targets ≥48px**, tabular-nums.
- **Cómo se reusó:** se tradujeron a `web/app/globals.css` (variables CSS `--mv-*`) + `tailwind.config.ts`. Copia, no
  import del original.

## 2. Modelo de datos (`03_MODELO_DATOS/011_liviano_domain.sql`, `018_liviano_nutricion.sql`)
**Reusado como plantilla de esquema** (espejo en `supabase/migrations/` y en el SQLite de `intelligence/`):
| Entidad CRM | Reuso en Movimiento |
|---|---|
| `body_composition` (metrics jsonb, fuente, fecha) | `body_composition` (misma forma + campos Renpho explícitos + `screenshot_url`, `raw_extract`) |
| `exercise_logs` (series jsonb `[{reps,carga_kg,rpe}]`, volumen_total) | `exercise_logs` idéntico + `rir`, `hecho`, detección de PR |
| `meal_logs` + `foods` (macros/100g, FTS `search_foods`, peruanos) | `food_logs` + `foods` reusando la base peruana y `plan_match`, `confianza` |
| `knowledge_base` + `knowledge_chunks` (RAG pgvector 768d, `match_knowledge`, `search_knowledge_fts`) | misma estructura RAG; chunks sembrados desde `research/rag_chunks/` |
| `care_plan_items` + `plan_checkins` + vista `patient_adherence` | base del **plan** y del **motor de adherencia** por pilar |
| `clinician_tasks` (bandera_roja/escalamiento, severidad) | **idéntico** — el coach escala aquí |
| `fhir_resources` (Observation/CarePlan/Flag, LOINC) | composición y actividad como `Observation` FHIR R4; escalamiento como `Flag` |
| `magic_links` (acceso paciente por token) | mismo patrón para producción (en local: selector de usuario) |
| `patient_profiles` (altura, peso_meta, meta_kcal, meta_proteina_g, garantía) | `profiles` con baseline InBody + objetivo + pesos de pilares |

**LOINC reusados** (de `lines/liviano.ts → bodyMetrics`): peso `29463-7`, %grasa `41982-0`, músculo esq. `73964-9`,
visceral `73708-0`, agua `73807-0`, IMC `39156-5`, TMB `60842-2`. Los heredamos tal cual.

## 3. Agente Klotho (`src/lib/agent/engine.ts`, `lines/liviano.ts`)
**Reusado como patrón del Coach IA** ("Pulso Coach", hermano de Klotho):
- Pipeline **idéntico**: (1) **banderas rojas por regex → escala ANTES de razonar**; (2) **RAG híbrido**
  (vector si hay embeddings, si no FTS/keyword); (3) **razona con persona + contexto + conocimiento**; (4)
  **fallback honesto** sin LLM usando el conocimiento recuperado.
- **Escalamiento idéntico:** crea `clinician_tasks` + recurso FHIR `Flag` + evento de sistema.
- `nuncaDecide`, `redFlags` (vómito, dolor abdominal, deshidratación, reacción alérgica, hambre marcada bajo GLP-1) →
  **reutilizados** y ampliados con banderas de **relación poco sana con la comida** y **pérdida demasiado rápida**.
- Diferencia: el CRM usa **Gemini**; aquí el primario es **Claude (Anthropic)** por requerimiento §4, con el mismo
  patrón de degradación.

## 4. App del paciente (`src/app/(portal)/p/[token]/`)
**Reusado como referencia de UX mobile-first:**
- Home "Hoy": **anillo de adherencia** (LivingLeaf), **racha**, **tendencia de peso** (sparkline), **próxima mejor
  acción** (Noom), **garantía bar**, **plan list con checkins**, **QuickAdd**. Replicamos estos componentes.
- Páginas espejo: `comida`, `ejercicio`, `bioimpedancia/composicion`, `chat/coach`, `perfil`.
- **PWA:** `manifest.webmanifest` + `sw.js` conservador (cachea solo estáticos, **nunca** data del usuario) →
  adaptado a `web/public/`.
- Patrón de **degradación a modo mock** cuando faltan envs → lo reusamos para correr sin credenciales.

## 5. Variables de entorno (`05_VARIABLES_ENTORNO/`, `06_REPOS_DESTINO/pulso-crm/.env.example`)
**Reusados los nombres** (no los valores): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`/`GOOGLE_VISION_API_KEY`,
`NEXT_PUBLIC_APP_URL`. Añadimos `INTELLIGENCE_URL` (FastAPI) y `MOVIMIENTO_DB_PATH` (SQLite local).

## 6. Oferta / garantía (LIVIANO `lines/liviano.ts → offer.garantiaReglas`, `LIVIANO_Oferta_Maestra.docx`)
**Reusada la lógica de garantía por adherencia (Hormozi, premia el proceso):**
- `≥95 %` → elegible devolución **total**; `≥80–90 %` → elegible **parcial**. La spec de Movimiento usa
  **≥90 % parcial** y **≥95 % total** (config-driven, editable por el médico).
- **Solo MIDE y MARCA elegibilidad; NO mueve dinero.** Genera **reporte de evidencia** (fotos, timestamps, logs) que
  el médico revisa. Decisión de pago = humana.

---

## 7. Lo que NO reusamos (y por qué)
- **Auth/middleware multi-tenant del CRM:** en local usamos selector de usuario simple; producción usará Supabase
  auth + `magic_links` (documentado en CHECKLIST).
- **Baileys/WhatsApp, Meta CAPI, facturación, pipeline de marketing:** fuera de alcance de esta PWA.
- **Gemini como IA primaria:** reemplazado por Claude (§4), conservando el patrón de degradación.
