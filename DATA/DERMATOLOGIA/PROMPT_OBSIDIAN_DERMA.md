# DERMATOLOGÍA · integración OBSIDIAN — ESTADO (05-sep-2026) + prompt para lo que falta

> Este fichero era el prompt original (10-jun-2026) que pedía la rama `07_DERMATOLOGIA`. **Nunca se
> ejecutó** (vacío nº 10 del análisis Palmerton v3). El 05-sep-2026 se ejecutó con el builder de abajo.
> ⚠ `07_` ya lo ocupa `07_VENTAS_AURUM` en el vault real → la rama derma es **`10_DERMATOLOGIA`**.

## ✅ Hecho (05-sep-2026)

| Pieza | Dónde | Detalle |
|---|---|---|
| Builder | `DATA/_scripts/build_vault_derma.js` | Patrón de `build_vault_trilingue.js`/`build_vault_research.js`: idempotente, dry-run por defecto, `--write`, NUNCA borra ni sobreescribe. Lee `src/lib/dermaDailyPlan.ts` **compilándolo con el TypeScript del repo** (no re-tipea nada). |
| Rama en el vault | `D:\JOSEPH\Vault_Medicina MIR_Joseph\10_DERMATOLOGIA\` | **161 carpetas + 86 notas** (mañana: 153 + 82; tarde: +8 carpetas / +4 notas tras el swap de contenido d19/d20 ↔ d57/d58 del plan v2.1 — oclusión vascular y ceguera ahora en `09_X_Estetica/d19_…` y `d20_…`, fiebre-y-rash y pelo-uñas en `03_C_Infecciosas/d57_…` y `d58_…`) · 0 notas existentes tocadas · idempotencia verificada (dry-run: 235 intactos, 0 nuevos). ⚠ Quedan **4 carpetas huérfanas** con el slug antiguo (`03_C_Infecciosas/d19_el_paciente_agudo…`, `03_C_Infecciosas/d20_pelo_y_unas…`, `09_X_Estetica/d57_oclusion_vascular…`, `09_X_Estetica/d58_ceguera_por_relleno…`): están vacías (plantilla) y el builder no borra → bórralas o muévelas a mano; `node DATA/_scripts/build_vault_derma.js --huerfanas` las lista. |
| Estructura | `10_DERMATOLOGIA/NN_<K>_<bloque>/dNN_<subtema>/{APEX_creados, _concepto_madre.md}` | Bloques del **PLAN ÉLITE v2** (no del temario v1 de 54 subtemas): 01_A Fundamentos · 02_B Inflamatorias · 03_C Infecciosas · 04_D Tumores+dermatoscopia · 05_E Dermpath (`fuente_primaria: Barnhill's`) · 06_F Pediátrica · 07_G Quirúrgica (`fuente_primaria: Kantor + Dermatologic Surgery`) · 08_H Checkpoint CORE · 09_X Estética (22 átomos) · 10_Z Cierre. Cada bloque con `_indice.md` (dataview de estado). |
| Nota madre por átomo (70) | `_concepto_madre.md` | Frontmatter (examen DERMA, bloque, atomo, fecha_plan, tier, referente, urls de caso/review/lectura/atlas/dermatoscopia/histo, `nitida`, `puente_sr1`/`puente_sr2`/`puente_nota` (calculados desde el campo `puenteResearch` del plan v2.1), `modulo_core_fallos: []`, `estado: vacio`) + callout con los links reales del plan + **paso ① dictado morfológico (tabla 8 ejes)** + **paso ② ddx de 3** (pre-rellenado con el `ddx` del átomo si existe) + **Cerebro Clínico 7 pasos** (SPEC §3) como secciones + CCSN + dataview `APEX_creados/`. Los átomos con `nitida` (B + d68) llevan el tip NÍTIDA; los átomos SR-1 (hoy d19 · d20 · d48 · d55) enlazan a `SR-1 · hoja de ruta` (rama 04) y los SR-2 (d4 · d59 · d61 · d65) llevan la etiqueta L5 fototipos IV-VI. |
| Extras | `00_DASHBOARD_DERMA/Dashboard_Derma.md` · `90_DICTADOS_MORFOLOGIA/_plantilla_dictado.md` | Dashboard con bloques, dataviews de APEX y mastery gate; plantilla del dictado (gate módulo A: 10 dictados ≥6/8). |
| Mapa para la app | `src/lib/obsidianDermaMap.ts` (GENERADO) | `dermaObsUrlDay(d)`, `dermaObsUrlBlock(bKey)`, `OBS_DERMA_DICTADO_URL`, `OBS_DERMA_DASHBOARD_URL` — mismo estilo que `obsidianResearchMap.ts`, reutiliza `obsUrl()` de `obsidianMap.ts`. |

Regenerar tras cualquier corrimiento del plan (`remap_inicio.js`): `node DATA/_scripts/build_vault_derma.js --write`
(las notas existentes NO se reescriben — solo cambia `obsidianDermaMap.ts` si cambian carpetas; las fechas del
frontmatter quedan como estaban: son informativas). Tras un **swap de contenido** entre átomos (cambia el slug):
`--write --rewrite=<d,d>` re-escribe esas notas madre **solo si siguen `estado: vacio`** (nunca una nota trabajada) y
`--huerfanas` lista las carpetas con slug antiguo para moverlas a mano. Los sets NÍTIDA/SR-1/SR-2 se calculan desde
`nitida`/`puenteResearch` del plan, no están fijados en el script.

## ⏳ Pendiente (prompt para el chat/agent que toque la UI)

```
CONTEXTO: la rama 10_DERMATOLOGIA del vault "Vault_Medicina MIR_Joseph" YA existe (05-sep-2026) y
src/lib/obsidianDermaMap.ts YA exporta dermaObsUrlDay(d) / dermaObsUrlBlock(bKey) / OBS_DERMA_DASHBOARD_URL.

HAZ:
C) En src/components/study/DermaTodayPlan.tsx añade el botón ◆ Obsidian (color #A78BFA) en la cola de HOY
   (usa dermaObsUrlDay(dia.d)) y en las filas del temario (dermaObsUrlBlock(bKey)) — igual que
   UsmleTodayPlan/MirTodayPlan (referencia de código). Chip extra "📷 Dictado" → OBS_DERMA_DICTADO_URL en
   la franja 13:33 (paso ①). En DermaHub pestaña Cerebro: link "🧴 Dashboard Derma" → OBS_DERMA_DASHBOARD_URL.
D) Sección "🧴 DERMATOLOGÍA" en 00_Dashboard/Mapa_Temarios_Trilingue.md: NO se añadió (regla "solo crear"
   en el vault). Cuando Joseph lo autorice: node DATA/_scripts/build_vault_derma.js --write --patch-mapa
   (idempotente: solo añade la sección si no existe).
E) Ruteo automático: el pipeline APEX (n8n → Obsidian) sigue con P0-2/P0-3 abiertos (auditoría 02-jul)
   → la rama nace para notas MANUALES (tarjetas de mecanismo, dictados, CCSN). No enviar ::OBSIDIAN por
   el pipeline hasta arreglarlo. Cuando se arregle, añadir 10_DERMATOLOGIA al mapa de rutas del motor.

REGLAS: no toques 01_USMLE/03_MIR/04_INVESTIGACIÓN/06_ENCAPS/07_VENTAS_AURUM ni el Calendar · dry-run antes
de --write · el builder es la única forma de crear carpetas derma (no a mano).
```
