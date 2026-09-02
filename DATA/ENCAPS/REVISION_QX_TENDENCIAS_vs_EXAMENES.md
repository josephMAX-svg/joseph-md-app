# 🔎 Revisión cruzada: QX "Tendencias" vs nuestra clasificación de los exámenes (01-jul-2026)

> Dos clasificaciones **independientes** de los mismos exámenes SERUMS/ENCAPS:
> - **Nuestra** (`_ARCHIVO_ANTIGUOS/_pronostico_2026_2_FABLE5.json`; forecast vigente en `PRONOSTICO_WALKFORWARD_2026-2_v2.md`): 600 preguntas = 6 exámenes (2024-2A/B, 2025-1A/B, 2025-2, 2026-1), clasificadas pregunta-por-pregunta con nuestra taxonomía I-1…V-MED.
> - **QX Medic "Tendencias"** (`_qx_tendencias.json`): 400 preguntas = ~4 procesos, taxonomía propia de QX (área → grupo → sub-tema), extraída en vivo.
>
> Sirve como validación externa del walk-forward. Ambos son **% por examen** (nuestro = n/600; QX = Total/400).

## 1) Por ÁREA

| Área | Nuestra % | QX % | ¿Coincide? |
|---|---|---|---|
| I — Salud Pública | 25.3 | 29.5 | QX +4 (ver taxonomía: QX mete más en I-2/mediciones; nosotros sacamos dengue a I-4) |
| II — Cuidado Integral | 25.0 | 30.75 | QX +5.75 (**QX cuenta dengue/metaxénicas en II**; nosotros en I-4) |
| III — Ética/Intercultural | 13.0 | 12.0 | ✅ casi igual |
| IV — Investigación | 10.0 | 7.5 | cercano (nuestro IV-1 está sobre-agrupado) |
| V — Gestión | 26.7 | 20.25 | Nuestra +6.4 (agregado 6 exámenes infla V; ver nota) |

**Nota clave sobre V:** nuestro agregado de 6 exámenes da V=26.7% porque incluye 2024-II y 2025-II (V=31% cada uno). Pero el examen **más reciente (2026-I) tuvo V=20%**, que coincide **exactamente** con el agregado de QX (20.25%). → Confirma que **V está bajando/asentándose en ~20-22%** y refuerza la decisión del forecast (V≈22) y la advertencia de volatilidad de V-2.

## 2) Por TEMA (nuestro código) — top rentabilidad

| Código | Nuestra % | QX % (mapeado) | Lectura |
|---|---|---|---|
| **V-2** planeamiento/calidad | 13.7 | ~8.75 | ambos #1 de Gestión; nuestro V-2 es más inclusivo (mete acreditación+clima) |
| **I-3** vigilancia/epi | 9.5 | ~10.5 | ✅ **ambos lo tienen como tema-ancla top**; QX incluso lo pone un poco más alto |
| **V-MED** medicamentos | 7.3 | ~5.5 | ✅ clúster real confirmado (QX lo parte entre SP-URM y Gestión-inventario) |
| **IV-1** diseños estudio | 5.8 | ~1.75 | ⚠ **nuestro IV-1 sobre-agrupa**: QX reparte metodología en tipos/enfoques/muestreo/instrumentos |
| **I-4** dengue/metaxénicas | 4.5 | ~4.25 | ✅ igual en magnitud (QX lo archiva en II, nosotros en I) |
| **III-5** interculturalidad | 3.7 | ~5.25 | ✅ QX lo pondera algo más alto (incluye parto vertical) |
| **II-8** ECNT (DM/HTA) | 3.5 | ~4.0 | ✅ |
| **II-1** obstetricia | 3.2 | ~3.5 | ✅ |
| **II-4** anemia/nutrición | 2.8 | ~2.75 | ✅ casi idéntico |
| **II-11** ITS | 2.7 | ~2.25 | ✅ |
| **II-3** vacunación | 2.7 | ~3.25 | ✅ QX algo más alto (esquema + esquema regular) |
| **I-1** promoción/prevención | 2.5 | ~3.5 | QX más alto (suma etapas de prevención) |
| **V-1** categorización EESS | 2.5 | ~3.25 | ✅ QX algo más alto |
| **II-7** adulto mayor/VACAM | 2.3 | ~2.25 | ✅ exacto |
| **I-5** determinantes | 2.2 | ~2.5 | ✅ |
| **III-8** ética púb./HC | 2.2 | ~1.75 (+HC 1.75) | ✅ (QX pone HC en Gestión) |
| **I-6** bioestadística | 2.0 | ~1.5 | ✅ **ambos lo dan casi muerto** |
| **II-6** tuberculosis | 1.3 | ~2.0 | ⚠ **QX lo pondera más** → subir TB en repaso |
| **II-10** cáncer/tamizaje | 1.5 | ~1.5 | ✅ |
| **II-9** salud mental | 1.5 | ~1.0 | ✅ (al alza por materiales) |
| **III-1** bioética/deontología | 1.2 | ~3.0 | ⚠ **QX lo pondera MUCHO más** (código de ética + principios) → no descuidar |

## 3) Diferencias de taxonomía (no cambian qué estudiar, sí el % por área)
1. **Dengue/malaria/zoonosis (metaxénicas):** QX → Cuidado Integral (II); nosotros → I-4 (Salud Pública). Explica gran parte del gap de área II.
2. **Gestión de la historia clínica:** QX → Gestión (V); nosotros → III-8 (Ética/legal).
3. **Uso racional de medicamentos:** QX → Salud Pública; nosotros → V-MED (Gestión).
4. **Parto vertical:** QX → Interculturalidad (III); nosotros lo repartimos II-1/III-5 según enfoque.
5. **IV-1:** nuestro clasificador agrupa casi toda la metodología en "diseños"; QX la reparte (tipos, enfoques, muestreo, instrumentos, validación).

## 4) Qué CONFIRMA y qué AJUSTA para el pronóstico 2026-II
**Confirma (señal robusta, dos fuentes independientes):**
- Ranking de áreas **II ≈ I > V > III > IV** y que **el bloque clínico de Cuidado Integral domina**.
- **I-3 (vigilancia) y V-2 (planeamiento) son los dos temas-ancla**; **V-MED es un clúster real** (~5.5-7%).
- **Bioestadística (I-6) casi extinta** (ambos ~0.5-2%). **IV modesta**; nuestro IV-1 estaba sobre-agrupado (el peso real de "diseños" es ~2%, no ~6%).
- **V está bajando a ~20-22%** (2026-I=20 coincide con QX 20.25).

**Ajusta / añade al radar (por QX):**
- **II-6 tuberculosis:** QX ~2% vs nuestro 1.3% → subir en el repaso (definición de SR, TPT, contactos).
- **III-1 bioética/deontología (código de ética + principios):** QX ~3% vs nuestro 1.2% → **estaba sub-ponderado; reforzar** (código de ética profesional, principios bioéticos).
- **I-1 promoción + etapas de prevención:** QX ~3.5% → mantener en lista media, no solo watch.
- Confirma bajar V-2 del pico (nuestro agregado 13.7% está inflado por exámenes viejos; QX ~8.75% y 2026-I lo enfrió).

**Conclusión:** la fuente independiente de QX **valida el walk-forward** (mismo ranking, mismos temas-ancla, mismo colapso de IV y bioestadística). Los únicos temas a subir respecto al forecast son **II-6 (TB)** y **III-1 (código de ética/bioética)**, y a bajar/vigilar el sobre-peso de **V-2** y **IV-1** por sobre-agrupación nuestra.

## 5) Archivos
- Datos QX crudos: `DATA/ENCAPS/_qx_tendencias.json`
- Nuestra clasificación: `DATA/ENCAPS/_ARCHIVO_ANTIGUOS/_pronostico_2026_2_FABLE5.json` (vigente: `PRONOSTICO_WALKFORWARD_2026-2_v2.md`)
- Pronóstico + backtest: `DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2026-2_v2.md`
- Examen-espejo: `DATA/ENCAPS/EXAMEN_ESPEJO_2026-2.md`
