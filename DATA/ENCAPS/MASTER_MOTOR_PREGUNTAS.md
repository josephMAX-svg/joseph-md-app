# 🎛️ MASTER — MOTOR DE PREGUNTAS ENCAPS (plan + Calendar + forecast)
> Fuente única para generar preguntas automáticamente cuando Joseph pida "dame preguntas de [X]" o "pre-test/post-test de hoy".
> Amarra: (1) plan diario real (Supabase `study_schedule`, proyecto joseph-medicina), (2) bloques del Google Calendar, (3) forecast vigente (`PRONOSTICO_WALKFORWARD_2026-2_v2.md` + `INDICE_FUENTE_UNICA_2026-2.md`). Generado 01-jul-2026 · pronóstico validado con la reclasificación de los 6 exámenes.
> ⚠️ **Correcciones obligatorias en claves (verificadas 01-jul):** VPH = **DOSIS ÚNICA** 9-18a nonavalente (RM 218-2024) · PEI = **5 años** (CEPLAN 2024), POI anual · I-3 = **Directiva 046 / RM 506-2012** (NO "067/2020") · alcohol = **AUDIT** 10 ítems (NO "AUDIT-C"). No usar `_ARCHIVO_ANTIGUOS/`.

## 0) CÓMO SE USA (protocolo automático)
Cuando Joseph pida preguntas: **PRE-FLIGHT** (verificar `date` + día del plan) → identificar el tema del día (tabla §3) → tomar sus **sub-ángulos del forecast** (§4) + los ángulos reales de los 6 exámenes → generar en **formato viñeta-pesado (~60-75%, el examen real es 74-83% viñeta)** → entregar como **widget interactivo ciego** (Palmerton) → al recibir respuestas: clave + fuente + clasificar error (Contexto/Cronología/CCSN/Concepto/Olvido). Ponderar por rentabilidad del forecast. Nunca inventar: toda clave trazable a NTS/ficha/examen.

## 1) BLOQUES DEL CALENDAR → TIPO DE PREGUNTA
| Hora | Bloque | Tipo | Qué genero |
|---|---|---|---|
| 04:45 | Warm-up 20Q adaptativo | mixto | 20 una-por-una, 70% vistos + 30% críticos no vistos |
| 08:15 | **PRE-TEST 10Q ciegas** | pre | 10 ciegas del tema del día, antes del deep-prime (diagnóstico) |
| 11:00 | **Consolidación 30Q** | **post** | 30 del tema visto + interleaving, tras el deep-prime |
| 18:00 | Evaluación Diaria (modo examen) | post-acumulativo | tema de AYER + interleaving, 72 s/Q |
Pre-test = ciego, activa schemas (pretesting effect). Post-test = mide consolidación tras estudiar.

## 1b) FORECAST VIGENTE = WALK-FORWARD v2 §7 (supersede Fable5 y la tabla §3 pre-verificación)
<!-- Vector unificado 2026-07-20: II33·I28·V22·III13·IV4 (fuente: PRONOSTICO_WALKFORWARD_2026-2_v2 §7, verificación en vivo QX). Supersede los vectores previos II34·I27·V23·III13·IV3 y II33·I27·V23·III13·IV4. -->
`PRONOSTICO_WALKFORWARD_2026-2_v2.md` **§7** + `EXAMEN_ESPEJO_2026-2.md` (24 preguntas modelo, estilo caso→4 opciones→clave+NTS→trampa) + `_qx_tendencias.json` (validado vs base "Tendencias" de QX, 400 preguntas). Áreas **CANÓNICO**: **II 33 · I 28 · V 22 · III 13 · IV 4**. **Críticos = SIETE: I-3 · II-1 · II-3 · V-2 · II-11 · III-5 · II-8** (**II-8 subió de ALTA a CRÍTICO**; quedan en ALTA: II-9 · III-9 · V-1 · V-MED). Puntos §7: I-3 ~12 · V-2 ~9 · II-1 5 · II-3 5 · II-11 5 · III-5 5 · II-8 4 · V-1 3 · II-9 3. Formato ~90% viñeta. V-2 volátil banda 8-18. Watch-list: III-9 (HC/SUSALUD) · I-1/I-12 · III-4 código violeta · II-2 CRED · II-6 TB · II-10 cáncer. **I-6 bioestadística prácticamente EXTINTA (~0.5%, QX 2/400) — ya NO es crítica.** Escenario contingencia (~15-20%): si revierte a teoría, IV/I-6 resucitan → repaso conceptual mínimo.

## 2) RECONCILIACIÓN PLAN vs FORECAST (⚠️ ajustes recomendados)
El plan de la app se armó con el pronóstico previo; el forecast Fable5 (01-jul) corrige:
- ✅ **D1 I-3** y **D2 V-2** = confirmados CRÍTICOS (anclas). Mantener al 100%.
- ⚠️ **D4 I-5+I-6 (marcado CRÍTICA en la app) → DEGRADAR.** El forecast muestra **I-6 bioestadística prácticamente EXTINTA (~0.5%; QX Tendencias 2/400; n=0,0 en los 2 últimos exámenes por el viraje a viñeta) → ya NO es crítica** e **I-5 solo MEDIA (~3-4%)**. Recomendación: pasar D4 a **repaso ligero**, NO deep-prime crítico; reasignar esa energía a II-3/III-5/II-1.
- ✅ **D5 II-3 vacunas** = pico ALTA emergente, bien ubicado.
- ⚠️ **V-MED (farmacovigilancia/DIGEMID/URM, ~4% ALTA)** *(pseudo-código agregado: gestión de medicamentos, no es un código del temario oficial ni figura en `GUIA_POR_TEMA_2026-2.md`)* NO tiene día propio en el plan (va embebido en V-2/V-1). **Asegurar cobertura explícita** — es un cluster real de 4%.
- 📈 **II es el área rey (~33%).** Reforzar reps de II-3, II-1, II-8, II-11, II-9 (clínica en viñeta).
- 📉 **IV colapsó (~4%).** D17 (IV-1+IV-2) y D19-20 (IV-3/4/5/6/7) = mínimo esfuerzo, repaso conceptual, NO deep work.

## 3) PLAN DIARIO REAL (Supabase · 43 días · examen FIJO jue 20-ago)
| D | Fecha | Tema principal | Prio | NTS clave | Secundarios |
|---|---|---|---|---|---|
| 1 | jue 02-jul | **I-3 Vigilancia EPI** | CRÍTICA | Directiva 046-MINSA/DGE · RM 506-2012 | — |
| 2 | vie 03-jul | **V-2 PEI/POI/FODA** | CRÍTICA | CEPLAN 001-2024 | — |
| 3 | sáb 04-jul | Simulacros 1-3 (QX Virtual 01-03) | — | — | — |
| 4 | lun 06-jul | I-5+I-6 Determinantes+Bioestadística ⚠️degradar | (CRÍTICA→MEDIA) | DSS OMS 2008 | — |
| 5 | mar 07-jul | **II-3 Vacunación** | CRÍTICA/ALTA | NTS 196 + RM 218-2024 (VPH DOSIS ÚNICA) | — |
| 6 | mié 08-jul | III-5 Salud Intercultural | ALTA | DS 016-2016 + NTS 047 | II-6 TB |
| 7 | jue 09-jul | I-4 Defs caso (Dengue/TB/Malaria) | ALTA→MEDIA | GPC Dengue + Dir 067 | II-9 Salud Mental |
| 8 | vie 10-jul | V-3 Niveles/referencia | ALTA | NTS 020 | II-7 VACAM |
| 9 | sáb 11-jul | Simulacros 4-6 (QX Virtual 04-06) | — | — | — |
| 10 | lun 13-jul | II-11 ITS/VIH | ALTA | NTS 097 + NTS 230 | II-5 MCI |
| 11 | mar 14-jul | I-1 Promoción | ALTA | Ottawa + PROMSA | II-10 Cáncer |
| 12 | mié 15-jul | II-1 Salud Materna | ALTA | NTS 105/121/214 | II-4 Anemia |
| 13 | jue 16-jul | II-8 HEARTS/HTA-DM | ALTA | NTS 229 + GPC | III-1 Bioética |
| 14 | vie 17-jul | V-1 Categorización EESS | ALTA | NTS 021 | III-4+III-7 Violencia/Aborto |
| 15 | sáb 18-jul | Simulacros 7-9 (QX Virtual 07-09) | — | — | — |
| 16 | lun 20-jul | III-9 Derechos paciente | ALTA | Ley 29414 + SUSALUD | I-11+I-12 Fam/Comunit · V-6 Telesalud |
| 17 | mar 21-jul | IV-1+IV-2 Diseños/Validez ⚠️mín esfuerzo | ALTA→BAJA | Sackett/Fletcher/GRADE | III-6+III-10 · I-7 PNAIA |
| 18 | mié 22-jul | I-2 FESP | MEDIA | OPS FESP 2020 | II-2 CRED · I-10 APS · III-3 Consent. |
| 19 | jue 23-jul | III-2 CMP/deontología | MEDIA | Ética CMP + Ley 15173 | V-7+V-10 · IV-4 · IV-3+IV-5 |
| 20 | vie 24-jul | III-8 Ética pública | MEDIA | Ley 27815 | II-12 Bucal · IV-6+IV-7 · I-8 · I-9 · II-13 |
| 21 | sáb 25-jul | Simulacros 10-12 (ENCAPS oficiales 2025-I, 2025-II, 2026-I) | — | — | — |
| 22-26 | 27-31 jul | Repaso espaciado + banco + mapas | — | — | — |
| 27 | sáb 01-ago | Simulacros 13-15 (Theomed 15-may, 29-may, 12-jun) | — | — | — |
| 28-32 | 03-07 ago | Repaso espaciado + banco + mapas | — | — | — |
| 33 | sáb 08-ago | Simulacros 16-18 (Theomed 26-jun, 10-jul, 24-jul) | — | — | — |
| 34-38 | 10-14 ago | Repaso espaciado + banco + mapas | — | — | — |
| 39 | sáb 15-ago | Simulacros 19-22 (Theomed 07/21-ago + QX EVA SP/Inv) | — | — | — |
| 40-41 | 17-18 ago | Repaso espaciado + banco + mapas | — | — | — |
| 42 | mié 19-ago | DÍA-EXAMEN (banqueos QX por área, recta final) | — | — | — |
| 43 | **jue 20-ago** | **EXAMEN ENCAPS 2026-II** | — | — | — |
(Domingos libres = consolidación por sueño. Todo se corre +1 por cada día no estudiado; el examen 20-ago es tope fijo.)

## 4) SUB-ÁNGULOS POR TEMA (del forecast — qué preguntar en cada uno)
- **I-3** (CRÍTICA, alza): vigilancia activa/pasiva/IAAS · notificación inmediata (fiebre amarilla/ETA/zoonosis) · cadena epi/caso índice · historia natural (fases) + niveles de prevención · incidencia vs prevalencia · tasa ataque/letalidad · endemia/epidemia/brote/pandemia/epizootia · gradiente biológico · ASIS/sala situacional · transición epidemiológica.
- **V-2** (CRÍTICA, #1): **PEI 5 años vs POI anual** (Guía CEPLAN 2024; POI Multianual ≥3a) · FODA/análisis interno · ciclo de planeamiento · misión/visión · acreditación (autoevaluación/externa) · MOF/CAP · clima organizacional · buzón/auditoría.
- **II-3** (ALTA pico): cadena de frío 2-8°C + shake test · calendario por edad (pentavalente 2-4-6m, RN BCG/HvB) · **VPH DOSIS ÚNICA 9-18a (nonavalente, RM 218-2024)** · vacunas adulto mayor · ESAVI (grave vs coincidente).
- **V-MED** (ALTA · *pseudo-código agregado: gestión de medicamentos, no es un código del temario oficial*): farmacovigilancia/tecnovigilancia DIGEMID · URM/resistencia · baja de vencidos · tipos de RAM (isoniazida, benzodiacepinas, hiperkalemia losartán-espironolactona) · SISMED · stock/abastecimiento.
- **III-5** (ALTA): parto vertical · mal de ojo/susto/curandero · etnocentrismo/relativismo/aculturación migrantes · plantas medicinales · traductor/equidad.
- **II-1** (ALTA): criterios/posición parto vertical · preeclampsia/eclampsia (MgSO₄) · placenta previa (sangrado indoloro) · corioamnionitis (RPM) · IMC pregestacional.
- **II-8** (**CRÍTICA**, ~4%): HbA1c<7% · HTA tiazídicos/MAPA · perímetro abdominal/RCV · prediabetes (100-125) · sulfonilureas.
- **II-11** (**CRÍTICA**, alza, ~5%): prueba dual VIH/sífilis · penicilina benzatínica/estadios · VIH gestante/TARV+TPT · PEP ocupacional.
- **II-9** (ALTA, alza): depresión mayor · **AUDIT (10 ítems, no AUDIT-C)** · SRQ interpretación · salud mental comunitaria.
- **I-4** (MEDIA): dengue grupos A/B/C + signos de alarma · SSN dengue B2 · control vectorial IPO/ovitrampas · malaria (P. vivax/P. falciparum).
- **V-1** (MEDIA): categorización EESS (quién asigna) · capacidad resolutiva · cartera de servicios · UPSS/residuos.
- **I-5** (MEDIA, degradado): determinantes estructurales/intermedios/estilo de vida · equidad · JUNTOS.
- (IV-1/IV-4: solo repaso conceptual — piso muerto. **I-6 bioestadística ~0.5% (QX 2/400) = prácticamente extinta, ya NO crítica** — repaso mínimo solo por el escenario de contingencia.)

## 5) EMERGENTES A VIGILAR (picos que aparecen sin aviso)
II-3 vacunas (el más fuerte) · II-9 salud mental · II-11 ITS dual · III-4 código violeta/violencia sexual · I-12 participación comunitaria · V-3 RIS · V-6 telesalud · II-2 CRED/neurodesarrollo.

## 6) DATA FUENTE (para no re-generar)
- Plan diario: Supabase `study_schedule` (examen='ENCAPS'), proyecto `qacynpqdrorpuegsmtcy`.
- Forecast vigente: `PRONOSTICO_WALKFORWARD_2026-2_v2.md` + `INDICE_FUENTE_UNICA_2026-2.md` (data granular archivada en `_ARCHIVO_ANTIGUOS/_pronostico_2026_2_FABLE5.json`).
- Bloques Calendar + estructura: `GUIA_OPERATIVA_LOOP_DIARIO.md`.
- Métodos élite + coach: memorias `elite-prep-methods`, `coach-stance-encaps`; `RUTINA_EXTREMA_MILITARIZADA.md`.
- Fuentes por tema: `src/lib/encapsFuentes.ts`, `encapsVideosPorTema.ts`; NTS por tema §3 de `GENERADOR_PREGUNTAS_ENCAPS.md`.
