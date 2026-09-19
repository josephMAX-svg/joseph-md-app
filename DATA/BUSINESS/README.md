# DATA · BUSINESS (Estudio Pulso · academias LIVIANO / CURVA / DENSA · metodología Hormozi)

Data del estudio del fundador y de las academias médicas de Pulso. **Desde el 5-sep-2026 (Palmerton
"cero puntos ciegos") el plan Business ya NO es un bloque de 2h**: es el **formato L** (20-25 min de
audiolibro/lectura en los huecos, L-J, + 1 output pequeño el viernes) y solo cubre lo que no cubren
**AURUM** (marketing/ventas, 14:15-15:15) ni **LIVIANO Academia** (medicina de la obesidad, 17:15-18:00).

> **v5.14 (19-sep-2026) — corrimiento.** Ni el jue 17 ni el vie 18 de septiembre se estudiaron → **D1 = lun 21-sep-2026**
> (+2 días hábiles sobre v5.13; decimotercer corrimiento del ciclo 31-ago→21-sep, 15 hábiles perdidos). **No se fusionó ni se recortó nada**:
> las 84 filas de trabajo son las mismas y el desfase se absorbe alargando el final. Business: **121 filas ·
> lun 21-sep-2026 → mar 19-ene-2027** (84 de trabajo + **37 DESCANSO**), **17 OUTPUT** de los cuales **15 caen en VIERNES**
> (S1 vie 25-sep → S15 vie 15-ene: con D1 en lunes cada OUTPUT de semana corre UNA SEMANA respecto a v5.10-v5.13, como ya pasó en v5.10; S1 = D5), S16 el **lun 18-ene** (D120) y el OUTPUT
> extra el **mar 19-ene** (D121, último día del plan). AURUM: **130 días · lun 21-sep-2026 → mié 24-mar-2027** (pitches v1 vie 9-oct (D15) · v2 vie 6-nov (D35) · v3 vie 4-dic (D55, día del NBME 28) · v4 mié 6-ene (D75) · v5 mié 3-feb (D95, = D-1 del Step 1) · v6 mié 3-mar (D115) · v7 mié 24-mar (D130); 16 variantes LIVIANO, 10 fuera de viernes por la deriva post-feriado). LIVIANO: **90 días ·
> lun 21-sep-2026 → mié 27-ene-2027** — con D1 en lunes el plan tiene exactamente **16 viernes** (25-sep → 22-ene) y el generador ya no salta ninguno: caso 1 = D5 vie 25-sep y el **caso integral 16/16 (D87 vie 22-ene) vuelve a caer ANTES del repaso (D88), del capstone (D89 mar 26-ene) y de la trimestral II (D90 mié 27-ene)**: la inversión de v5.13 desaparece (ver `LIVIANO_ACADEMIA.md`). Contexto: el Step 1 termina el mié 3-feb (D95 = D-1) → examen target **jue 4-feb-2027**. Fechas leídas de los `.ts` con node el 19-sep, no estimadas.
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
| [`LIVIANO_ACADEMIA.md`](LIVIANO_ACADEMIA.md) | **Academia LIVIANO** (medicina de la obesidad, 6 módulos + M7 Acceso en Perú): franja 17:15-18:00, **90 días desde el lun 21-sep-2026 → mié 27-ene-2027 (v5.14)**. Plan día a día en `src/lib/livianoStudyPlan.ts`; casos, rúbrica, drills y tarjetas en `src/lib/livianoCasos.ts` (ambos GENERADOS por `DATA/_scripts/gen_liviano_plan.js` desde `liviano_curriculum.json`). |
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
- **AURUM** (`DATA/AURUM/`, `src/lib/aurumDailyPlan.ts`, 14:15-15:15 L-V, 130 días · **lun 21-sep-2026 → mié 24-mar-2027**, v5.14): todo lo de ventas/oferta/objeciones/cierre. Desde v3 (5-sep) incluye **1 de cada 5 drills en variante LIVIANO** (venta ética de un programa médico con el mismo paciente de la Academia, CMP Art. 73) y la **rúbrica del PITCH** (6 ítems 0-2, 7 viernes de cierre de fase, score persistido) + **Closer Scoreboard editable** por semana.
- **LIVIANO Academia** (17:15-18:00): obesidad, GLP-1, nutrición, ejercicio, conducta, cirugía, acceso en Perú, protocolo clínico.
- **Business formato L** (sin franja): BIOLOGIA · SUEÑO · MENTAL · FOCO · PAREJA (Calma/Foco/Cerca — las líneas no médicas de Pulso) + PESO nivel 3-4 como contrapeso científico + OUTPUT semanal.
- **VITALS** (app del paciente, `VITALS/`): lo que el paciente hace/mide. Puente Academia ↔ VITALS en `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md`.

## En la app (src/lib + componentes)
- `src/lib/businessStudyPlan.ts` — GENERADO por `python DATA/_scripts/gen_business_plan.py [YYYY-MM-DD]`
  (**v5.14: `2026-09-21` = D1**) desde `plan_pulso_v3_L.json`: 121 filas = 84 de trabajo + 37 DESCANSO
  (sáb/dom + feriados 25-dic/31-dic/1-ene) · **lun 21-sep-2026 → mar 19-ene-2027** · `BIZ_META.bloque` = formato L ·
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
**Ejecutado el 19-sep-2026 con `2026-09-21` (v5.14).**

### Calendario de OUTPUT v5.14 (15 viernes + el cierre de enero · leído de `BIZ_DIAS` con node el 19-sep)

| # | Fecha | Entregable (1 página salvo indicación) |
|---|---|---|
| S1 · D5 | vie 25-sep-2026 | Régimen biológico del fundador v1 |
| S2 · D12 | vie 2-oct-2026 | Protocolo de sueño transversal Pulso v1 |
| S3 · D19 | vie 9-oct-2026 | Guion de 60 s "luz de mañana y última comida temprano" |
| S4 · D26 | vie 16-oct-2026 | Manual sesiones Calma v0 |
| S5 · D33 | vie 23-oct-2026 | Voz editorial Calma: 5 hooks + 1 tarjeta de mecanismo |
| S6 · D40 | vie 30-oct-2026 | Protocolo Foco adultos v0 |
| S7 · D47 | vie 6-nov-2026 | Plantilla de coaching ejecutivo semanal |
| S8 · D54 | vie 13-nov-2026 | Protocolo Cerca Mujer v0 |
| S9 · D61 | vie 20-nov-2026 | Guion de la "Sesión para la pareja/familia" (bono LIVIANO) |
| S10 · D68 | vie 27-nov-2026 | Protocolo Cerca v0 + mapa de derivación + 5 hooks |
| S11 · D75 | vie 4-dic-2026 | 3 tarjetas de mecanismo Anki (leptina · recompensa · saciedad) |
| S12 · D82 | vie 11-dic-2026 | Guion de 90 s "por qué el ejercicio no adelgaza pero es innegociable" |
| S13 · D89 | vie 18-dic-2026 | Tabla "lo que dice el libro vs lo que dice la evidencia" |
| S14 · D110 | **vie 8-ene-2027** | "Decatlón del centenario" + plan personal de 12 semanas |
| S15 · D117 | **vie 15-ene-2027** | 10 preguntas abiertas para CURVA_ACADEMIA |
| S16 · D120 | **lun 18-ene-2027** | Documento de cierre v2 + tracker de 16 semanas completo |
| — · D121 | **mar 19-ene-2027** | OUTPUT extra · retro del formato L → ajustes para CURVA/DENSA (febrero) |

⚠ **Cambio v5.14:** con D1 en lunes **los 15 OUTPUT de viernes corren UNA SEMANA** (S1 pasa del vie 18 al vie 25-sep = D5 … S15 del vie 8 al vie 15-ene = D117; la semana S1 = 21-25 sep coincide con la del calendario, como en v5.10); el **S16 cae en lun 18-ene** (D120; v5.13: jue 14-ene · v5.12: mié 13-ene · v5.11: mar 12-ene · v5.10: lun 11-ene) y el OUTPUT extra el **mar 19-ene** (D121), nuevo último día del plan (las lecturas se agotan antes de la cola de enero: colchones META lun 12 → jue 14-ene). Reparto de las 84 filas de trabajo intacto (`gen_business_plan.py` con `2026-09-21`).
materias sin tocar (contado del `.ts`): BIOLOGIA 4 · SUEÑO 8 · MENTAL 9 · FOCO 8 · PAREJA 12 · PESO 16 ·
HORMONAL 3 · META 7 · OUTPUT 17 = 84 de trabajo.

## Pendiente (siguiente fase, cuando se pida)
- Enero-2027: convertir `CURVA_ACADEMIA.md` y `DENSA_ACADEMIA.md` en `curva_curriculum.json` / `densa_curriculum.json` y generar sus planes de 90 días con `gen_liviano_plan.js` (arrancan en febrero, post-Step 1).
- Programa de publicación de contenido automatizado (PIRQA-style) usando el playbook: cadencia mié→dom, Hook-Retain-Reward, lead magnets de diagnóstico por vertical.
