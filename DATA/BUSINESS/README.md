# DATA · BUSINESS (Estudio Pulso · academias LIVIANO / CURVA / DENSA · metodología Hormozi)

Data del estudio del fundador y de las academias médicas de Pulso. **Desde el 5-sep-2026 (Palmerton
"cero puntos ciegos") el plan Business ya NO es un bloque de 2h**: es el **formato L** (20-25 min de
audiolibro/lectura en los huecos, L-J, + 1 output pequeño el viernes) y solo cubre lo que no cubren
**AURUM** (marketing/ventas, 14:15-15:15) ni **LIVIANO Academia** (medicina de la obesidad, 17:15-18:00).

> **v5.8 (9-sep-2026) — corrimiento.** El 9 de septiembre tampoco se estudió → **D1 = jue 10-sep-2026**
> (+1 día hábil sobre v5.7). **No se fusionó ni se recortó nada**: cada plan conserva su número de días y el
> desfase se absorbe alargando el final. Business: **121 filas · jue 10-sep-2026 → vie 8-ene-2027** (84 de
> trabajo + 37 DESCANSO), **17 OUTPUT** de los cuales **16 caen en VIERNES** (S1 vie 11-sep → S15 vie 18-dic,
> más el extra del vie 8-ene) y 1 en el cierre de enero (S16 jue 7-ene). AURUM: **130 días · 10-sep-2026 →
> lun 15-mar-2027**. LIVIANO: **90 días · 10-sep-2026 → lun 18-ene-2027**. Fechas leídas de los `.ts` el
> 9-sep, no estimadas.

| Fichero | Qué es |
|---------|--------|
| `plan_pulso_v3_L.json` | **FUENTE VIVA del plan Business v3 L**: 84 filas de trabajo (BIOLOGIA 4 · SUEÑO 8 · MENTAL 9 · FOCO 8 · PAREJA 12 · PESO 16 · HORMONAL 3 · META 7 · OUTPUT 17) con `modo` L / CRITICA / OUTPUT. PESO = Biblioteca del Fundador nivel 3-4 (Hungry Brain, Burn, Outlive); PESO/HORMONAL de divulgación (Fung, Sowa, Gottfried, Bluming) van en modo CRITICA ("contrastar con la Academia / CURVA_ACADEMIA"). Textos vencidos del xlsx eliminados (pre-launch, "lo que sé al 31-ago", agendas de sept). |
| `plan_estudio_pulso_v2_mejorado.xlsx` | el Excel original (INTACTO, legado v2: 8 hojas — Análisis, Filosofía, Biblioteca 28 libros, Calendario 96 días, Técnicas, Outputs, Recursos, Métricas). Se regenera con `gen_business_plan.py --v2` solo por arqueología. |
| `_scrape/plan_pulso_v2.json` | dump completo del Excel (todas las hojas); la hoja `Metricas_v2` es el tracker semanal que ahora vive en `BIZ_TRACKER`. |
| `_scrape/research_raw.json` | hallazgos crudos del workflow (con fuentes) |
| [`LIVIANO_ACADEMIA.md`](LIVIANO_ACADEMIA.md) | **Academia LIVIANO** (medicina de la obesidad, 6 módulos + M7 Acceso en Perú): franja 17:15-18:00, **90 días desde el jue 10-sep-2026 → lun 18-ene-2027 (v5.8)**. Plan día a día en `src/lib/livianoStudyPlan.ts`; casos, rúbrica, drills y tarjetas en `src/lib/livianoCasos.ts` (ambos GENERADOS por `DATA/_scripts/gen_liviano_plan.js` desde `liviano_curriculum.json`). |
| `liviano_curriculum.json` | currículo fuente de la Academia LIVIANO (módulos → temas → casos → drills). |
| [`CURVA_ACADEMIA.md`](CURVA_ACADEMIA.md) | **esqueleto** (sin días) de la academia CURVA — terapia hormonal de la menopausia e hipogonadismo masculino: objetivo, 6 módulos, 3 esqueletos curriculares con fuentes verificadas, límites de competencia, metáforas, ruta de credencial. Se convierte en plan de 90 días con `gen_liviano_plan.js` en enero-2027 (arranca en febrero). |
| [`DENSA_ACADEMIA.md`](DENSA_ACADEMIA.md) | **esqueleto** (sin días) de la academia DENSA — alopecia androgenética, efluvio telógeno, minoxidil oral, PRP: misma estructura. Arranca en febrero-2027. |
| [`hormozi-method.md`](hormozi-method.md) | **Metodología Hormozi para Pulso**: $100M Offers (Value Equation, Grand Slam, Trim & Stack, MAGIC) + Leads (Core Four, lead magnets 7 pasos, Rule of 100, give:ask ≈3.5:1) + Money Models (CFA: 30 días → 2 clientes) + playbook de contenido orgánico con días recomendados. **Hoy se entrena en AURUM** (F4/F7), no en el plan Business. |
| [`libros.md`](libros.md) | **los 28 libros, revisión de élite**: tesis · frameworks con capítulo · frase-ancla fiel · aplicación Pulso · recursos con URL real |
| [`terrenos-leads.md`](terrenos-leads.md) | **Terrenos · Casa Soto Tocas**: bitácora 11-jun (21 leads Marketplace reactivados) · discrepancias de precio · recomendación NO ads hasta agosto (gate Lean Analytics) · sistema permanente (OMTM, cadencia, 8x8) |
| [`golden-brand.md`](golden-brand.md) | **Qori Golden**: web viva (qori-golden.vercel.app) · modelo de venta verificado · seña S/500, timeline 8 pasos, precios Perú · redes (FB+YT) · logo |
| [`allpa-terrenos.md`](allpa-terrenos.md) | **ALLPA** (=tierra en quechua): marca SOCIAL de los terrenos · página FB (ID 61590457814813) + YouTube @allpaterrenos · 5 guiones de valor nicho comprador-a-distancia |
| `ANKI_COLA/` | CSV importables de tarjetas de mecanismo (LIVIANO: `LIVIANO_mecanismo.csv`, deck `APEX::LIVIANO::<modulo>`). |
| `_scrape/*_raw.md` (6, 11-jun) | investigación verificada: hormozi_seguimiento · lean_analytics · cro_landing · libros_inmobiliaria · referentes_terrenos_peru · golden_breeders · crm_pulso_eval · pirqa_publicaciones · catalogo_predios_huachac.txt |

## Regla de reparto (para no duplicar)
- **AURUM** (`DATA/AURUM/`, `src/lib/aurumDailyPlan.ts`, 14:15-15:15 L-V, 130 días · **10-sep-2026 → lun 15-mar-2027**): todo lo de ventas/oferta/objeciones/cierre. Desde v3 (5-sep) incluye **1 de cada 5 drills en variante LIVIANO** (venta ética de un programa médico con el mismo paciente de la Academia, CMP Art. 73) y la **rúbrica del PITCH** (6 ítems 0-2, 7 viernes de cierre de fase, score persistido) + **Closer Scoreboard editable** por semana.
- **LIVIANO Academia** (17:15-18:00): obesidad, GLP-1, nutrición, ejercicio, conducta, cirugía, acceso en Perú, protocolo clínico.
- **Business formato L** (sin franja): BIOLOGIA · SUEÑO · MENTAL · FOCO · PAREJA (Calma/Foco/Cerca — las líneas no médicas de Pulso) + PESO nivel 3-4 como contrapeso científico + OUTPUT semanal.
- **VITALS** (app del paciente, `VITALS/`): lo que el paciente hace/mide. Puente Academia ↔ VITALS en `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md`.

## En la app (src/lib + componentes)
- `src/lib/businessStudyPlan.ts` — GENERADO por `python DATA/_scripts/gen_business_plan.py [YYYY-MM-DD]`
  (**v5.8: `2026-09-10` = D1**) desde `plan_pulso_v3_L.json`: 121 filas = 84 de trabajo + 37 DESCANSO
  (sáb/dom + feriados 25-dic/31-dic/1-ene) · **jue 10-sep-2026 → vie 8-ene-2027** · `BIZ_META.bloque` = formato L ·
  `BIZ_FRANJAS` (micro-estructura de 25') · `BIZ_TRACKER` (Metricas_v2) · campo `modo` por fila ·
  `bizModo()`. Re-fechado en corrimientos por `DATA/_scripts/remap_inicio.js` (bloque 6 Business: exige
  84 filas de trabajo y filas sin llaves dentro de los strings; sus DESCANSO regenerados no traen `modo`
  → `bizModo()` lo infiere).
- `src/lib/businessBooksExtra.ts` — GENERADO (`DATA/_scripts/extract_pulso_research.js`): frase-ancla + recursos reales por libro; `fraseDelDia()` para el Home.
- `src/components/empresa/PulsoTodayPlan.tsx` — motor día-a-día en formato L (HOY según `modo` L/CRITICA/OUTPUT · Formato L + tracker · 7d · Temario con % real desde 0). Ya no sugiere el bloque de 2h.
- `src/components/home/BibliotecaHome.tsx` — biblioteca en Home: % leído por libro/materia (manual, localStorage `jmd-books-progress-v1`), frase del día, links reales.
- `src/lib/aurumData.ts` — `AURUM_RUBRICA_PITCH` (+ store `jmd-aurum-rubrica`), `AURUM_SCOREBOARD_METAS` (+ store `jmd-aurum-scoreboard-v1`, semana ISO, semáforo). `src/components/empresa/AurumHub.tsx` / `aurumVisuals.tsx` / `AurumTodayPlan.tsx` los renderizan.

## Pipeline de corrimiento (cada día sin estudiar = +1 hábil)
`node DATA/_scripts/remap_inicio.js YYYY-MM-DD` (re-fecha Business y 6 planes más) · `node DATA/_scripts/gen_aurum_plan.js YYYY-MM-DD` · `python DATA/_scripts/gen_business_plan.py YYYY-MM-DD` (equivalente al remap para Business, y además salta los feriados fijos) · `node DATA/_scripts/gen_liviano_plan.js YYYY-MM-DD` (Academia).
**Ejecutado el 9-sep-2026 con `2026-09-10` (v5.8).**

### Calendario de OUTPUT v5.8 (los 15 viernes de contenido + el cierre de enero · leído de `BIZ_DIAS`)

| # | Fecha | Entregable (1 página salvo indicación) |
|---|---|---|
| S1 · D2 | vie 11-sep-2026 | Régimen biológico del fundador v1 |
| S2 · D9 | vie 18-sep-2026 | Protocolo de sueño transversal Pulso v1 |
| S3 · D16 | vie 25-sep-2026 | Guion de 60 s "luz de mañana y última comida temprano" |
| S4 · D23 | vie 2-oct-2026 | Manual sesiones Calma v0 |
| S5 · D30 | vie 9-oct-2026 | Voz editorial Calma: 5 hooks + 1 tarjeta de mecanismo |
| S6 · D37 | vie 16-oct-2026 | Protocolo Foco adultos v0 |
| S7 · D44 | vie 23-oct-2026 | Plantilla de coaching ejecutivo semanal |
| S8 · D51 | vie 30-oct-2026 | Protocolo Cerca Mujer v0 |
| S9 · D58 | vie 6-nov-2026 | Guion de la "Sesión para la pareja/familia" (bono LIVIANO) |
| S10 · D65 | vie 13-nov-2026 | Protocolo Cerca v0 + mapa de derivación + 5 hooks |
| S11 · D72 | vie 20-nov-2026 | 3 tarjetas de mecanismo Anki (leptina · recompensa · saciedad) |
| S12 · D79 | vie 27-nov-2026 | Guion de 90 s "por qué el ejercicio no adelgaza pero es indispensable" |
| S13 · D86 | vie 4-dic-2026 | Tabla "lo que dice el libro vs lo que dice la evidencia" |
| S14 · D93 | vie 11-dic-2026 | "Decatlón del centenario" + plan personal de 12 semanas |
| S15 · D100 | vie 18-dic-2026 | 10 preguntas abiertas para CURVA_ACADEMIA |
| S16 · D120 | **jue 7-ene-2027** | Documento de cierre v2 + tracker de 16 semanas completo |
| — · D121 | **vie 8-ene-2027** | OUTPUT extra · retro del formato L → ajustes para CURVA/DENSA (febrero) |

## Pendiente (siguiente fase, cuando se pida)
- Enero-2027: convertir `CURVA_ACADEMIA.md` y `DENSA_ACADEMIA.md` en `curva_curriculum.json` / `densa_curriculum.json` y generar sus planes de 90 días con `gen_liviano_plan.js` (arrancan en febrero, post-Step 1).
- Programa de publicación de contenido automatizado (PIRQA-style) usando el playbook: cadencia mié→dom, Hook-Retain-Reward, lead magnets de diagnóstico por vertical.
