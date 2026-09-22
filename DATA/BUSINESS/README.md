# DATA · BUSINESS (Estudio Pulso · academias LIVIANO / CURVA / DENSA · metodología Hormozi)

Data del estudio del fundador y de las academias médicas de Pulso. **Desde el 5-sep-2026 (Palmerton
"cero puntos ciegos") el plan Business ya NO es un bloque de 2h**: es el **formato L** (20-25 min de
audiolibro/lectura en los huecos, L-J, + 1 output pequeño el viernes) y solo cubre lo que no cubren
**AURUM** (marketing/ventas, 14:15-15:15) ni **LIVIANO Academia** (medicina de la obesidad, 17:15-18:00).

> **v5.15 (22-sep-2026) — corrimiento RÍGIDO.** Ni el lun 21 ni el mar 22 de septiembre se estudiaron → **D1 = mié 23-sep-2026**
> (+2 días hábiles sobre v5.14; decimocuarto corrimiento del ciclo 31-ago→23-sep, 17 hábiles perdidos). **Regla del corrimiento rígido: no se toca NINGÚN tema ni contenido — solo corren los días, y donde había un fin clavado se AMPLÍAN días en vez de perder sesiones**:
> las 84 filas de trabajo son las mismas y el desfase se absorbe alargando el final. Business: **121 filas ·
> mié 23-sep-2026 → jue 21-ene-2027** (84 de trabajo + **37 DESCANSO**), **17 OUTPUT** de los cuales **15 caen en VIERNES**
> (S1 vie 25-sep → S15 vie 15-ene: las FECHAS de los 15 OUTPUT de viernes NO se mueven respecto a v5.14 — con D1 en miércoles solo baja su D# en 2; S1 = D3), S16 el **mié 20-ene** (D120) y el OUTPUT
> extra el **jue 21-ene** (D121, último día del plan). AURUM: **130 días · mié 23-sep-2026 → vie 26-mar-2027** (pitches v1 mar 13-oct (D15) · v2 mar 10-nov (D35) · v3 mar 8-dic (D55, día del NBME 28) · v4 vie 8-ene (D75) · v5 vie 5-feb (D95, = D95 del Step 1, su último día de plan, 3 días antes del examen) · v6 vie 5-mar (D115) · v7 vie 26-mar (D130); 16 variantes LIVIANO, 7 fuera de viernes). LIVIANO: **90 días ·
> mié 23-sep-2026 → vie 29-ene-2027** — el plan vuelve a tener **17 viernes** (25-sep → 29-ene) y el generador salta el primero (vie 25-sep = D3, sin caso): caso 1 = D8 vie 2-oct y el **caso integral 16/16 (D90 vie 29-ene) vuelve a caer DESPUÉS del repaso (D87 mar 26-ene), del capstone (D88 mié 27-ene) y de la trimestral II (D89 jue 28-ene)**: la inversión reaparece y la decisión vuelve a quedar ABIERTA (ver `LIVIANO_ACADEMIA.md` y `DATA/PENDIENTES_JOSEPH.md` ⚪ fila D). Contexto: el Step 1 termina el vie 5-feb (D95 = D-1 dentro del plan; sáb 6 y dom 7-feb libres) → examen target **lun 8-feb-2027**. Fechas leídas de los `.ts` el 22-sep, no estimadas.
> *(v5.14, 19-sep: D1 lun 21-sep · Business → mar 19-ene (S16 lun 18-ene; OUTPUT S1 vie 25-sep = D5 → S15 vie 15-ene) · AURUM → mié 24-mar (pitches vie 9-oct · vie 6-nov · vie 4-dic · mié 6-ene · mié 3-feb · mié 3-mar · mié 24-mar) · LIVIANO → mié 27-ene, 16 viernes = 16 casos, caso 1 = D5 vie 25-sep, caso 16 = D87 vie 22-ene por delante del capstone D89.)*
> *(v5.13, 16-sep: D1 jue 17-sep · Business → vie 15-ene (S16 jue 14-ene; OUTPUT S1 vie 18-sep → S15 vie 8-ene) · AURUM → lun 22-mar (pitches mié 7-oct · mié 4-nov · mié 2-dic · lun 4-ene · lun 1-feb · lun 1-mar · lun 22-mar) · LIVIANO → lun 25-ene, 17 viernes con el vie 18-sep sin caso, caso 16 D89 detrás del capstone D88.)*
> *(v5.12, 15-sep: D1 mié 16-sep · Business → jue 14-ene (S16 mié 13-ene) · AURUM → vie 19-mar (pitches mar 6-oct · mar 3-nov · mar 1-dic · mié 30-dic · vie 29-ene · vie 26-feb · vie 19-mar) · LIVIANO → vie 22-ene, caso 16 D90 detrás del capstone D88 y de la trimestral II D89.)*
> *(v5.11, 14-sep: D1 mar 15-sep · Business → mié 13-ene · AURUM → jue 18-mar (pitches lun 5-oct · lun 2-nov · lun 30-nov · mar 29-dic · jue 28-ene · jue 25-feb · jue 18-mar) · LIVIANO → jue 21-ene, caso 1 vie 18-sep, caso 16 vie 15-ene.)*
> *(v5.10, 12-sep: D1 lun 14-sep · Business → mar 12-ene · AURUM → mié 17-mar · LIVIANO → mié 20-ene.)*

| Fichero | Qué es |
|---------|--------|
| `plan_pulso_v3_L.json` | **FUENTE VIVA del plan Business v3 L**: 84 filas de trabajo (BIOLOGIA 4 · SUEÑO 8 · MENTAL 9 · FOCO 8 · PAREJA 12 · PESO 16 · HORMONAL 3 · META 7 · OUTPUT 17) con `modo` L / CRITICA / OUTPUT. PESO = Biblioteca del Fundador nivel 3-4 (Hungry Brain, Burn, Outlive); PESO/HORMONAL de divulgación (Fung, Sowa, Gottfried, Bluming) van en modo CRITICA ("contrastar con la Academia / CURVA_ACADEMIA"). Textos vencidos del xlsx eliminados (pre-launch, "lo que sé al 31-ago", agendas de sept). |
| `plan_estudio_pulso_v2_mejorado.xlsx` | el Excel original (INTACTO, legado v2: 8 hojas — Análisis, Filosofía, Biblioteca 28 libros, Calendario 96 días, Técnicas, Outputs, Recursos, Métricas). Se regenera con `gen_business_plan.py --v2` solo por arqueología. |
| `_scrape/plan_pulso_v2.json` | dump completo del Excel (todas las hojas); la hoja `Metricas_v2` es el tracker semanal que ahora vive en `BIZ_TRACKER`. |
| `_scrape/research_raw.json` | hallazgos crudos del workflow (con fuentes) |
| [`LIVIANO_ACADEMIA.md`](LIVIANO_ACADEMIA.md) | **Academia LIVIANO** (medicina de la obesidad, 6 módulos + M7 Acceso en Perú): franja 17:15-18:00, **90 días desde el mié 23-sep-2026 → vie 29-ene-2027 (v5.15)**. Plan día a día en `src/lib/livianoStudyPlan.ts`; casos, rúbrica, drills y tarjetas en `src/lib/livianoCasos.ts` (ambos GENERADOS por `DATA/_scripts/gen_liviano_plan.js` desde `liviano_curriculum.json`). |
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
- **AURUM** (`DATA/AURUM/`, `src/lib/aurumDailyPlan.ts`, 14:15-15:15 L-V, 130 días · **mié 23-sep-2026 → vie 26-mar-2027**, v5.15): todo lo de ventas/oferta/objeciones/cierre. Desde v3 (5-sep) incluye **1 de cada 5 drills en variante LIVIANO** (venta ética de un programa médico con el mismo paciente de la Academia, CMP Art. 73) y la **rúbrica del PITCH** (6 ítems 0-2, 7 viernes de cierre de fase, score persistido) + **Closer Scoreboard editable** por semana.
- **LIVIANO Academia** (17:15-18:00): obesidad, GLP-1, nutrición, ejercicio, conducta, cirugía, acceso en Perú, protocolo clínico.
- **Business formato L** (sin franja): BIOLOGIA · SUEÑO · MENTAL · FOCO · PAREJA (Calma/Foco/Cerca — las líneas no médicas de Pulso) + PESO nivel 3-4 como contrapeso científico + OUTPUT semanal.
- **VITALS** (app del paciente, `VITALS/`): lo que el paciente hace/mide. Puente Academia ↔ VITALS en `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md`.

## En la app (src/lib + componentes)
- `src/lib/businessStudyPlan.ts` — GENERADO por `python DATA/_scripts/gen_business_plan.py [YYYY-MM-DD]`
  (**v5.15: `2026-09-23` = D1**) desde `plan_pulso_v3_L.json`: 121 filas = 84 de trabajo + 37 DESCANSO
  (sáb/dom + feriados 25-dic/31-dic/1-ene) · **mié 23-sep-2026 → jue 21-ene-2027** · `BIZ_META.bloque` = formato L ·
  `BIZ_FRANJAS` (micro-estructura de 25') · `BIZ_TRACKER` (Metricas_v2) · campo `modo` por fila ·
  `bizModo()`. Re-fechado en corrimientos por `DATA/_scripts/remap_inicio.js` (bloque 6 Business: exige
  84 filas de trabajo y filas sin llaves dentro de los strings; sus DESCANSO regenerados no traen `modo`
  → `bizModo()` lo infiere). ⚠ El remap NO aplica los feriados (deja 116 filas); la fuente de verdad es el `.py`,
  que reconstruye las 121 con 25-dic/31-dic/1-ene como DESCANSO — correrlo siempre después del remap.
- `src/lib/businessBooksExtra.ts` — GENERADO (`DATA/_scripts/extract_pulso_research.js`): frase-ancla + recursos reales por libro; `fraseDelDia()` para el Home.
- `src/components/empresa/PulsoTodayPlan.tsx` — motor día-a-día en formato L (HOY según `modo` L/CRITICA/OUTPUT · Formato L + tracker · 7d · Temario con % real desde 0). Ya no sugiere el bloque de 2h.
- `src/components/home/BibliotecaHome.tsx` — biblioteca en Home: % leído por libro/materia (manual, localStorage `jmd-books-progress-v1`), frase del día, links reales.
- `src/lib/aurumData.ts` — `AURUM_RUBRICA_PITCH` (+ store `jmd-aurum-rubrica`), `AURUM_SCOREBOARD_METAS` (+ store `jmd-aurum-scoreboard-v1`, semana ISO, semáforo). `src/components/empresa/AurumHub.tsx` / `aurumVisuals.tsx` / `AurumTodayPlan.tsx` los renderizan.

## Pipeline de corrimiento (cada día sin estudiar = +1 hábil)
`node DATA/_scripts/remap_inicio.js YYYY-MM-DD` (re-fecha Business y 6 planes más) · `node DATA/_scripts/gen_aurum_plan.js YYYY-MM-DD` · `python DATA/_scripts/gen_business_plan.py YYYY-MM-DD` (equivalente al remap para Business, y además salta los feriados fijos) · `node DATA/_scripts/gen_liviano_plan.js YYYY-MM-DD` (Academia).
**Ejecutado el 22-sep-2026 con `2026-09-23` (v5.15).**

### Calendario de OUTPUT v5.15 (15 viernes + el cierre de enero · leído de `BIZ_DIAS` el 22-sep)

| # | Fecha | Entregable (1 página salvo indicación) |
|---|---|---|
| S1 · D3 | vie 25-sep-2026 | Régimen biológico del fundador v1 |
| S2 · D10 | vie 2-oct-2026 | Protocolo de sueño transversal Pulso v1 |
| S3 · D17 | vie 9-oct-2026 | Guion de 60 s "luz de mañana y última comida temprano" |
| S4 · D24 | vie 16-oct-2026 | Manual sesiones Calma v0 |
| S5 · D31 | vie 23-oct-2026 | Voz editorial Calma: 5 hooks + 1 tarjeta de mecanismo |
| S6 · D38 | vie 30-oct-2026 | Protocolo Foco adultos v0 |
| S7 · D45 | vie 6-nov-2026 | Plantilla de coaching ejecutivo semanal |
| S8 · D52 | vie 13-nov-2026 | Protocolo Cerca Mujer v0 |
| S9 · D59 | vie 20-nov-2026 | Guion de la "Sesión para la pareja/familia" (bono LIVIANO) |
| S10 · D66 | vie 27-nov-2026 | Protocolo Cerca v0 + mapa de derivación + 5 hooks |
| S11 · D73 | vie 4-dic-2026 | 3 tarjetas de mecanismo Anki (leptina · recompensa · saciedad) |
| S12 · D80 | vie 11-dic-2026 | Guion de 90 s "por qué el ejercicio no adelgaza pero es innegociable" |
| S13 · D87 | vie 18-dic-2026 | Tabla "lo que dice el libro vs lo que dice la evidencia" |
| S14 · D108 | **vie 8-ene-2027** | "Decatlón del centenario" + plan personal de 12 semanas |
| S15 · D115 | **vie 15-ene-2027** | 10 preguntas abiertas para CURVA_ACADEMIA |
| S16 · D120 | **mié 20-ene-2027** | Documento de cierre v2 + tracker de 16 semanas completo |
| — · D121 | **jue 21-ene-2027** | OUTPUT extra · retro del formato L → ajustes para CURVA/DENSA (febrero) |

⚠ **Cambio v5.15:** las **fechas de los 15 OUTPUT de viernes NO se mueven** (S1 sigue el vie 25-sep, S15 el vie 15-ene); lo que cambia es el D#, que **baja 2** porque D1 pasa a miércoles (S1 = D3 … S15 = D115). El **S16 cae en mié 20-ene** (D120; v5.14: lun 18-ene · v5.13: jue 14-ene · v5.12: mié 13-ene · v5.11: mar 12-ene · v5.10: lun 11-ene) y el OUTPUT extra el **jue 21-ene** (D121), nuevo último día del plan (las lecturas se agotan antes de la cola de enero: colchones META lun 18 → mar 19-ene). Reparto de las 84 filas de trabajo intacto (`gen_business_plan.py` con `2026-09-23`).
materias sin tocar (contado del `.ts`): BIOLOGIA 4 · SUEÑO 8 · MENTAL 9 · FOCO 8 · PAREJA 12 · PESO 16 ·
HORMONAL 3 · META 7 · OUTPUT 17 = 84 de trabajo.

## Pendiente (siguiente fase, cuando se pida)
- Enero-2027: convertir `CURVA_ACADEMIA.md` y `DENSA_ACADEMIA.md` en `curva_curriculum.json` / `densa_curriculum.json` y generar sus planes de 90 días con `gen_liviano_plan.js` (arrancan en febrero, post-Step 1).
- Programa de publicación de contenido automatizado (PIRQA-style) usando el playbook: cadencia mié→dom, Hook-Retain-Reward, lead magnets de diagnóstico por vertical.
