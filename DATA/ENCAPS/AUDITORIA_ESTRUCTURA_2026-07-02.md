# 🔍 AUDITORÍA DE ESTRUCTURA Y DUPLICADOS — joseph-md-app × agente_estudio
> Fable 5 · 02-jul-2026 · 7 agentes de auditoría (~770k tokens) + verificación forense por hash MD5 (1.291 archivos) + ejecución.
> **Este documento reporta lo AUDITADO y lo YA EJECUTADO.** Todo lo movido está en `_ARCHIVO_MANIFEST_2026-07-02.tsv` (reversible).

---

## 0. VEREDICTO EN UNA LÍNEA
Los dos árboles están **sanos y son complementarios, no duplicados entre sí**. El desorden real era **interno**: 45 scripts de migración fechados copy-paste, 3 etiquetas de predicción desfasadas en el código, y ~50 materiales/artefactos duplicados o muertos. **Todo eso ya se archivó (111 movimientos, nada borrado)** y se corrigió el código. El pronóstico ENCAPS es **sólido con reservas cuantificables**.

---

## 1. ARQUITECTURA — dos vecinos, no anidar
| Árbol | Qué es | Rol | Tamaño |
|---|---|---|---|
| `D:\joseph-md-app` | App Expo/React Native + inteligencia derivada (src/lib `*.ts`, DATA, generadores) | **Fuente de verdad viva y versionada** | 3-4 MB de datos |
| `D:\agente_estudio` | Orquestador Python (7 daemons → Anki/Obsidian/Notion/Supabase vía n8n) + **material crudo** ENCAPS | Runtime vivo + materia prima (PDFs) | ~285 MB material |

**Se mantienen SEPARADOS a propósito** (confirma la auditoría del APEX del mismo día): anidarlos publicaría secretos en el remoto de GitHub, Vercel intentaría desplegar el runtime Python, y sus ciclos de vida son incompatibles. Se comunican por HTTP + Supabase, no por filesystem. Solo **1 archivo** es idéntico cruzando árboles (`Horario_Asincronico_Theomed…pdf`).

### ⚠ Hallazgo estructural mayor: el pipeline Python ENCAPS quedó una generación atrás
`agente_estudio/ENCAPS/data/plan_v9.json` sigue en **D1=10-jun, examen=10-ago, 71 días**. La app vigente está en **D1=02-jul, examen=20-ago, 43 días**. La app es la fuente viva; el pipeline `plan_v9/schedule_v9/encaps.db` es un snapshot abandonado. Los reportes de Telegram del daemon ENCAPS **mienten con números viejos** hasta que se re-sincronice (ver §6, no auto-ejecutado por ser un sistema vivo).

---

## 2. PREDICCIONES ENCAPS — ¿están correctas? SÍ, con reservas
**Veredicto del verificador escéptico: `SOUND_WITH_CAVEATS`.** Reclasificó el examen 2026-1 pregunta por pregunta y reprodujo las cifras (II=36, I=28, III=11, IV=3, V=21). El ranking **II > I > V > III > IV está triplemente confirmado** (conteo propio + walk-forward + QX Tendencias 400Q independiente). El método walk-forward sin lookahead es correcto.

**Pronóstico vigente (correcto en lo estructural):** II=REY, I estructural, V volátil, III meseta, IV colapso; formato **~90% viñeta clínica**.

### Reservas cuantitativas (para tu decisión — NO las apliqué al forecast)
| # | Sev | Reserva | Recomendación |
|---|---|---|---|
| 1 | **ALTA** | El MAE del backtest crece 4.4→5.2→6.0 y el peor error es el fold más reciente. El MAE esperado (~6pp) es **mayor que el ancho de varias bandas** (banda de II = 7pp ≈ 1 solo MAE). | Ensanchar TODAS las bandas a semi-ancho ≥6pp. *(Ya corregí el disclaimer del código para que diga la MAE real.)* |
| 2 | MEDIA | El centro de II (33-34) está 2-3pp **por encima** de la única fuente independiente (QX=30.75%); se ancla al pico 36. | Bajar centro de II a ~31-32 y bajar el piso de banda a 28 (cubrir regresión a la media=27). |
| 3 | MEDIA | Las series de V-2 mezclan granularidad (a veces área-V entera ~21%, a veces sub-tema estricto ~9%); la "volatilidad" puede ser en parte artefacto. | Fijar UNA definición operativa de V-2 y recontar. |
| 4 | BAJA | Los 7 críticos = los 7 de mayor forecast → circular. **I-5 (determinantes) y III-8 (confidencialidad/HC) salieron 3× cada uno en 2026-1** y quedan fuera. | Añadir I-5 y III-8 a un segundo anillo "alto-piso". |
| 5 | BAJA | Cifras que oscilan entre secciones del propio doc (II 34 vs 33; IV 3 vs 4). | Publicar UNA tabla canónica y que todo la referencie. |

---

## 3. CÓDIGO — correcciones YA aplicadas y refactor
### `src/lib/encapsRentabilidad.ts` (corregido en sitio)
Los **valores** de área ya estaban alineados con el walk-forward v2. Estaban mal 3 **etiquetas** de temas críticos (taxonomía vieja) y 1 de área:
- `I-3`: "Determinantes / promoción" → **"Vigilancia epidemiológica / brotes (Dir. 046)"** (determinantes es I-5).
- `II-1`: "Atención integral por etapas" → **"Salud materna: prenatal / parto / emergencias"**.
- `II-8`: "Salud del adulto mayor" → **"HEARTS: HTA/DM · ECNT"** (adulto mayor es II-7).
- Área `I`: "Ética / Salud Pública" → **"Salud Pública"**.
- Banda IV: piso 3 → **2** (alinea con la fuente citada, banda 2-5).
- Disclaimer: ahora declara la **MAE backtest real ~6pp**, no solo "±2-4pp".
*(Glosas verificadas contra la fuente canónica `GUIA_POR_TEMA_2026-2.md`, no contra un solo agente.)*

### `DATA/_scripts` — 45 migraciones fechadas colapsadas a 1 script parametrizado
Las 14 `remap_inicio_*.js` eran **byte-idénticas salvo la fecha incrustada ~7 veces**; ídem las familias `gen_encaps_remap_*` (16) y `gen_encaps_reshift_*` (10). Ahora hay **un solo `remap_inicio.js`** que recibe la fecha por CLI (`node DATA/_scripts/remap_inicio.js 2026-07-02`) y de paso **corrige un bug latente** (el bloque Business tenía un regex `inicio: '2026-06-\d\d'` que solo matchea junio → re-ejecutar tras el 2-jul fallaba). Sintaxis verificada (`node --check`). Los 45 one-shots vencidos → `DATA/_scripts/_ARCHIVO_ANTIGUOS/`.

### Duplicación de código pendiente (recomendado, NO ejecutado)
- El vector de pesos (`II 34·I 27·V 23·III 13·IV 3`) está escrito a mano en 2-3 `.ts`; derivarlo de `ENCAPS_AREA_FORECAST`.
- `agente_estudio`: el `subtema_mapping.json` está triplicado (embebido en `node_parsear_tarjeta_v2_3.js`); el parser convive en 2 versiones; los ~20 tests deberían reunificarse. Ninguno se tocó por ser runtime vivo.

---

## 4. DUPLICADOS Y MATERIAL ARCHIVADO (111 movimientos, reversible)
| Destino | N | Qué |
|---|---|---|
| `DATA/_scripts/_ARCHIVO_ANTIGUOS/` | 45 | migraciones fechadas one-shot (remap/reshift/multitema/reorder + gen_word_semana1 + fix_links_19jun) |
| `agente_estudio/ENCAPS/ENCAPS/_DUPLICADOS/` | 32 | 15 PPT QXMEDIC=THEOMED, 5 claves EXAMENES=TIO LOPEZ, descargas `(1)`, CDC ×2, ULTIMO CALENDARIO, 2025-2 PREGUNTAS, PDF mal etiquetado |
| `agente_estudio/ENCAPS/ENCAPS/_BASURA/` | 5 | locks `~$`, docx 0 bytes, 2 `.lnk` rotos |
| `agente_estudio/scripts/_ARCHIVO_DESARROLLO/` | 31 | tests, smoke, final_audit, cleanup one-shot, backup n8n viejo (0 refs vivas) |
| `agente_estudio/config/_ARCHIVO_SCHEMAS/` | 5 | schemas v1/v2_3/v2_4/tables (vigente = v2_5_pending) |
| `agente_estudio/_ARCHIVO_QA/` + `prompts/_ARCHIVO/` | 10 | QA congelado de mayo + prompts TUTOR viejos |

**Cada carpeta de archivo tiene un `LEEME.md`.** Nada se borró: todo se puede revertir con el manifiesto.

### ⚠ Un archivo requiere TU verificación manual
`THEOMED/BLOQUE III Manual 2026 I.pdf` y `THEOMED/ETICA e interculturalidad .pdf` son **byte-idénticos** (mismo documento, dos nombres). No pude leer el PDF aquí (sin render). Conservé el nombre "BLOQUE III Manual" y archivé el nombre "ETICA…" (que colisiona con la Ética real y distinta en `THEOMED/ETICA E INTERCULTURALIDAD/S1…2026.pdf`). **Abre el PDF una vez y confirma qué es realmente.**

---

## 5. LO QUE NO SE TOCÓ (y por qué)
- **7 daemons Python vivos**, nodos n8n, schema v2_5, gcal, sync, launchers, `reportes/generated` (salida viva), logs abiertos (120 MB — Windows los bloquea; ver §6).
- **El forecast en sí** (bandas/pct): las reservas §2 son decisiones tuyas, no bugs.
- `STUDY_HUB/_scrape` (workspace de scrape con micro-dups triviales).
- Los `_*.txt` scratch de `agente_estudio/scripts` tocados HOY (posible sesión activa).

## 6. PENDIENTES QUE NO SON AUTOMÁTICOS (sistema vivo — requieren tu OK)
De la auditoría APEX del mismo día (`AUDITORIA_AGENTE_ESTUDIO_2026-07-02.md`), siguen abiertos y **no los toqué porque modifican producción**:
1. 🔴 **Seguridad P0:** `SECURITY_AUDIT_PHASE_A_C.sql` escrito pero **nunca ejecutado** (7 semanas) → `datos_tesis` (55 filas de menores) con RLS OFF + anon key en repo con remoto. **Ejecútalo tú.**
2. 🔴 Bugs P0 del pipeline (scheduler dispara 4×, parser trunca multilínea, cleanup en loop 400 → log 36 MB).
3. 🟡 **Re-sincronizar `plan_v9`/configs del agente al plan vigente 02-jul/20-ago** (hoy mienten con 10-jun/10-ago).
4. 🟡 Rotación de logs (telegram 59 MB, cleanup 36 MB, api 25 MB) sin `RotatingFileHandler`.

> **Reversión total:** `DATA/ENCAPS/_ARCHIVO_MANIFEST_2026-07-02.tsv` — columna origen→destino de los 111 movimientos.
