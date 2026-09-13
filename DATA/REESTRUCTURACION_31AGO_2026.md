# REESTRUCTURACIÓN MASIVA · D1 = LUNES 14-SEP-2026 (v5.10)

> **Corrimientos:** 31-ago, 1-sep, 2-sep, 3-sep, 4-sep, 7-sep, 8-sep, 9-sep, 10-sep y **11-sep** no se
> estudiaron → TODO corrió a **D1 = lun 14-sep-2026** (regla determinista: cada día sin estudiar =
> +1 hábil). Son **10 días hábiles de colchón consumidos** desde el 31-ago (noveno corrimiento). USMLE =
> **95 días** (fases **A D1-D80 · B D81-D87 · C D88-D95**), ahora **lun 14-sep-2026 → mié 27-ene-2027** ·
> ENCAPS = **97 días** (Supabase re-sembrado, backup `study_schedule_bk_0912`) ·
> MIR/Derma/Business/LIVIANO/SYNAPSE/AURUM/vibecoding re-fechados (Research NO se mueve: ya estaba en el 14-sep).
> 11 de los 12 HITOS UWSA/NBME se quedaron en sus fechas originales; **el UWSA1 (anclado al vie 11-sep, ya
> pasado) se movió al lun 14-sep y sigue siendo el D1** — primer hito que cambia de fecha en todos los
> corrimientos. Las franjas y las metas no cambian; la ventana de examen (25-29 ene-2027) tampoco, pero **el
> target pasa del mié 27 al VIE 29-ene** (el plan termina el mié 27 = D95; jue 28 = descanso pre-examen).
>
> ⚠ **REGLA PERMANENTE DE JOSEPH (dictada el 9-sep, reconfirmada el 10-sep como "reorganización total"):**
> ***"ni un subtema ni tema dejar por detrás"***. De la v5.3 a la v5.7 el desfase se pagaba **fusionando
> días de contenido** para que los hitos no cambiaran de fecha. **Desde la v5.8 no se fusiona ni se
> recorta nada**: el temario sale 1:1 y el desfase se absorbe **alargando el final del plan**.
> **Detalle del corrimiento v5.10 en §12** (§11 = v5.9, §10 = v5.8 y §9 = v5.7, todos históricos).
>
> 🔴 **Lo más importante de la v5.10: el UWSA1 cambia de fecha por primera vez y YA NO QUEDA MARGEN.** El
> UWSA1 estaba anclado al vie 11-sep, que pasó sin estudiar; se mueve al **lun 14-sep = D1** (baseline antes
> de estudiar nada, como prescribe Palmerton) y el **primer día de CONTENIDO es el mar 15-sep = D2**. El plan
> termina el **mié 27-ene**, que era el target: **el examen pasa al vie 29-ene** (último día de la ventana) y
> el jue 28 queda de descanso. **El próximo corrimiento obliga a decidir entre recortar temario o rendir fuera
> de la ventana 25-29 ene.**
>
> *Histórico:* el 31-ago se amplió el cuaderno NotebookLM "STEP 1 · Palmerton Engine" de 25 a ~140 fuentes
> (catálogo completo del canal) y la guía PALMERTON_POR_MATERIA pasó a v2. El 2-sep se corrió una
> verificación total (frontend build, backend Supabase, deploy, temas citados, Calendar) — ver §7.
> El 3-sep tampoco se estudió: corrimiento a D1 = vie 4-sep (v5.5) — mismo pipeline, hitos de
> viernes intactos, 1 día de contenido USMLE fusionado. El 4-sep TAMPOCO se estudió: corrimiento
> determinista a D1 = lun 7-sep (v5.6). El 7 y el 8-sep tampoco → v5.7. El 9-sep tampoco → v5.8.
> El 10-sep tampoco → v5.9. El **11-sep tampoco** → **v5.10** (este documento).
> **§7, §8, §9, §10 y §11 son registro histórico (v5.6, v5.7, v5.8 y v5.9) y se conservan íntegros: sus
> fechas y D# son los de ANTES de este corrimiento.**

> Ejecutada el 27-ago-2026. **Supersede** a PLAN_DEFINITIVO_28JUL_2026-2 y al sprint ENCAPS 2026-II
> (examen 2026-II rendido el 9-ago; Joseph no lo dio — el análisis del examen real está en
> `DATA/ENCAPS/ANALISIS_EXAMEN_2026-2_REAL.md`).

## La inversión de prioridades

| | Antes (sprint 2026-II) | Ahora (v5 · desde 31-ago) |
|---|---|---|
| **Bloque principal (mañana 07:15-12:00 + eval 18:00)** | 🇵🇪 ENCAPS (5h30/día) | 🇺🇸 **USMLE Step 1** (5h30/día) |
| **1h de la tarde (16:15-17:15)** | 🇺🇸 USMLE (1h) | 🇵🇪 **ENCAPS mantenimiento** (1h banqueo) |
| **17:15-18:00** | [PAUSADO] Dermatología (zombie) | ⚖️ **LIVIANO Academia** (nuevo) |
| **MIR 15:15-16:15** | igual | igual (intacto) |
| **RESEARCH↔DERMA 13:30-14:15** | igual | igual (interdiario; contenido Derma renovado) |
| **Fines de semana** | sábado simulacros | **SÁBADO Y DOMINGO LIBRES** (regla nueva) |

**Exámenes objetivo:** USMLE Step 1 → semana **25-29 ene 2027** (target **vie 29**; jue 28 descanso pre-examen) ·
ENCAPS 2027-I → **fines de marzo 2027** (feb-mar: ENCAPS vuelve a principal) · MIR sigue su curso.

## 1 · USMLE Step 1 — plan v5.10 MAESTRO (95 días)

- **Fuente de verdad:** `src/lib/usmleStep1Daily.ts` (v5.10, **D1 = lun 14-sep-2026 → D95 = mié 27-ene-2027**;
  `examenVentana = '2027-01-25 → 2027-01-29'`, target vie 29-ene).
  Docs: `DATA/USMLE/README.md`, `PALMERTON_POR_MATERIA.md` (v3, catálogo completo), `CALENDARIO_5_MESES.md`,
  `RECURSOS_META_2026.md`.
- **El D1 es el UWSA1** (baseline, 160Q; **movido del vie 11-sep al lun 14-sep** — primer hito que cambia de
  fecha en todos los corrimientos) y el **contenido arranca en D2, mar 15-sep** (Fundamentos / Pathoma 1-2);
  Cardio abre el lun 21-sep (D6). Es lo que prescribe Palmerton: medir antes de estudiar nada.
- **Fases:** A contenido **D1-D80** (14-sep→**6-ene**, ~40Q uWorld/día = 1ª vuelta completa del banco 3659Q) ·
  B banco intensivo **D81-D87** (7→15-ene) · C sprint **D88-D95** (18→**27-ene**; D89/D91/D93 siguen siendo
  días de banco alojados en el sprint: incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2; D94 mar 26-ene =
  repaso FA 6-10 con 40Q flagged · D95 mié 27-ene = rapid review con 20Q). Cada día conserva su `nivelUW`
  (1-5) y su `qDia`; el total sigue siendo **5580Q** (3340 de banco diario + 2240 de simulacros). Bioquímica
  (días dobles heredados de la v5.7) = **D79 mar 5-ene y D80 mié 6-ene**, detrás del NBME 30 (D77) y de
  Biostats (D78, lun 4-ene); MSK **D71-D73 (21-23 dic) íntegro DESPUÉS del NBME 29** (ya no lo parte).
- **Hitos (11 fechas intactas + UWSA1 movido; D# nuevos):** UWSA1 **14-sep = D1** (baseline; antes vie 11-sep) ·
  NBME 25 **2-oct = D15** · NBME 26 **23-oct = D30** · NBME 27 **13-nov = D45** · NBME 28 **4-dic = D60** ·
  NBME 29 **18-dic = D70** · NBME 30 **30-dic = D77** (cierre del contenido de 2026) · UWSA2 **8-ene = D82** ·
  NBME 31 **15-ene = D87** (**GO/NO-GO**) · NBME 32 **18-ene = D88** · NBME 33 **20-ene = D90** ·
  Free 120 **22-ene = D92**.
- **Regla v5.10 (Joseph): NADA se fusiona ni se recorta.** El multiconjunto `(system, sub)` de `DIAS` es
  **idéntico** al de la v5.9 (0 filas perdidas y 0 filas nuevas en las 95; remapeo D# biyectivo 95/95) y el
  total de Q objetivo no se movió (**5580**). El desfase se absorbió **alargando el plan** hasta el mié 27-ene.
  Los 2 días dobles de Bioquímica (**D79 y D80**) vienen de la v5.7 y conservan todos sus temas;
  **no se creó ningún día doble nuevo**.
- **Criterio GO (Step 1 es pass/fail y un fail queda PARA SIEMPRE en ECFMG):**
  2 NBME consecutivos ≥68% + UWSA2 low-risk → confirmar fecha. Si no → correr a feb-mar (el
  eligibility period lo permite sin costo).
- **Método (Palmerton, validado por NotebookLM "STEP 1 · Palmerton Engine", 25 videos):**
  Anki en la MAÑANA con mente fresca · First Aid = mapa de objetivos (no biblia) · 80% mastery
  (80% en 10Q consecutivas del subtema antes de avanzar) · tarjetas de MECANISMO y cronología
  fisiopatológica · ~50% de fallos son de interpretación, no de conocimiento · stress sets
  (10Q/12min) recién en Fases B-C.
- **Regla de corrimiento:** un día perdido corre todo +1 día hábil
  (`node DATA/_scripts/remap_inicio.js <fecha>` — L-V + feriados, **95 días USMLE**, re-fecha también
  MIR/Research/Derma/Business/LIVIANO y re-slotea los casos LIVIANO a viernes; aparte:
  `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql, `gen_synapse_plan.js <fecha>`,
  `gen_aurum_plan.js <fecha>`). Los hitos USMLE están anclados a fechas: si se corre, migrar los
  overlays del Calendar o aceptar que caigan en otro día de la semana.
  **Coste acumulado hasta la v5.7:** cada corrimiento recortaba 1 día de CONTENIDO de la Fase A para no
  mover los hitos (en v5.7 se recortaron 2 días — ver §9). **Desde la v5.8 esa regla está DEROGADA**: ya no
  se recorta nada; el precio se paga alargando el plan por la cola y consumiendo colchón de calendario.
  **En la v5.10 el colchón se agotó del todo**: D95 cae el mié 27-ene (el target anterior), el examen pasa
  al vie 29-ene y solo queda el jue 28 de descanso — ver §12.6.

## 2 · ENCAPS — mantenimiento 2027-I (1h/día)

- **Supabase (v5.10): 97 días L-V (14-sep-2026 → 29-ene-2027)** en `study_schedule`, modo `MANTENIMIENTO`
  (backups: `study_schedule_bk_0827` → `bk_0831` → `bk_0902` → `bk_0903` → `bk_0906` → `bk_0906b` →
  `bk_0908` → `bk_0909` → `bk_0910` → **`bk_0912`**). Generador: `DATA/_scripts/gen_encaps_mantenimiento_2027.js <fecha>`.
  ✅ **Aplicado y verificado el 12-sep** por dos vías independientes: (a) el SQL generado
  (`DATA/_scripts/_encaps_mantenimiento_2027.sql`) trae **97 filas · 2026-09-14 → 2027-01-29**, 0 fines de
  semana, 0 feriados, 79 de banqueo + 18 mini-sim de viernes, backup `study_schedule_bk_0912`; (b) `execute_sql`
  sobre la tabla viva (12-sep) → **97 filas · 2026-09-14 → 2027-01-29**, `dia` 1→97, 0 fines de semana,
  0 feriados, 18 `mini_sim`, y la tabla `study_schedule_bk_0912` existe (con `bk_0910` intacta).
  ⚠ **ENCAPS sigue siendo el único bloque que NO se alarga**: mantiene su fecha de cierre (vie 29-ene,
  alineada al examen ENCAPS 2027-I, no al Step 1) y por eso pasa de 98 a **97 días**. Como la hora ENCAPS
  es **banqueo puro** (no temario secuencial), no se pierde ningún tema: se pierde otra sesión de banco —
  van **3 acumuladas** (100 → 99 → 98 → 97; los viernes de mini-sim bajan de 19 a 18). **Confirmar con
  Joseph** si prefiere eso o extender ENCAPS hasta el **lun 1-feb-2027** (recupera 1 sesión), el
  **mar 2-feb** (recupera 2) o el **mié 3-feb** (recupera las 3).
- **Rotación de 4 semanas** ponderada por el **PRONÓSTICO WALK-FORWARD v3**
  (`DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md`, construido con los 7 exámenes reales
  2024-II→2026-II): vector **II 30 · I 27 · V 21 · III 13 · IV 9** · 8 críticos
  **I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1/2** (+ ALTA con flag de rebote: II-1, II-11, II-8).
  I-3 y V-2 caen 2× por ciclo (11 sesiones c/u).
- **Estructura del día (16:15-17:15):** eval anclada 5Q del tema de ayer (15') → banco del día
  20-25Q ciegas (40') → registro TRACKING_ERRORES + ≤3 APEX (5'). **Viernes: mini-simulacro 25Q
  mixto 72s/Q** (19 en total).
- **Lección del 2026-II** (el pronóstico v2 tuvo su mejor fold, MAE 3.2pp, PERO Investigación saltó
  4→12): el área IV ya nunca va a piso — por eso IV-1/2 es crítico condicional en la rotación.
- App: `src/lib/encapsPlan.ts` **v6.8** (`STUDY_D1.ENCAPS = '2026-09-14'`; el nº de días lo define la
  siembra de Supabase = **97**), skip fines de semana + feriados,
  rama compacta `MANTENIMIENTO` en `itemsForDay`; los viernes `tipo='mini_sim'` usan la plantilla de simulacro.

## 3 · Google Calendar — cambios aplicados

**Creadas (series L-V, hasta 29-ene):** 🇺🇸 Repaso Multi-Temporal 07:15 · 🇺🇸 PRE-TEST 08:15 ·
🇺🇸 DEEP PRIME 09:00-11:00 · 🇺🇸 30Q Consolidación 11:00 · 🇵🇪 ENCAPS 1h Banqueo 16:15 ·
⚖️ LIVIANO Academia 17:15 (sin fecha fin) · 🇺🇸 Evaluación Modo Examen 18:00.
**+ 12 overlays naranjas** de hitos (UWSA1/2, NBME 25-33, Free 120) en sus fechas exactas.

**Eliminadas:** las 5 series ENCAPS de mañana/noche, las 2 series USMLE de 16:15-17:15 y los
2 zombies `[PAUSADO 96D]` vencidos (DERMATOLOGIA 17:15, PROGRAMACIÓN MAMA 13:00).
**Intactos:** MIR, SYNAPSE, AURUM, RESEARCH↔DERMA, LECTURA, toda la rutina (GYM/BAILE/DORMIR/…)
y los fines de semana (libres — SYNAPSE PC sáb/dom se mantienen porque son personales).

**Franja 04:15-05:45 (decisión 27-ago):** el zombie `[PAUSADO 96D] CURSO DE IA` fue reemplazado por
**🧠 CURSO DE IA — REACTIVADO** (L-V desde 31-ago; la serie vieja además pisaba EKER 04:00-04:15):
lección técnica SYNAPSE 45' + práctica en teclado 45' · **viernes = Claude Code / IA agéntica aplicada**
a los sistemas propios. Doc: `DATA/SYNAPSE/CURSO_IA_04H_31AGO.md`. Academias CURVA y DENSA → FEBRERO
post-Step 1 (NÍTIDA se fusiona con Derma). Protocolo operativo de la hora ENCAPS:
`DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.

## 4 · Derma · LIVIANO · Research

- **Derma** (`DATA/DERMATOLOGIA/PLAN_ELITE_2026-27.md` + `src/lib/dermaDailyPlan.ts` renovado):
  70 átomos interdiarios (**mar 15-sep-2026 → mar 30-mar-2027**, salta feriados; en la v5.10 se movió
  +2 días de calendario porque el lun 14-sep es día Research) sobre AccessDermatology real — 200 casos visuales ciegos +
  1.301 review questions (Pictorial 4e 381 · CORE 104 · Barnhill's 403 · 3e 363 · QOTW 50) +
  Fitzpatrick/Baumann; los últimos ~20-25 átomos = ESTÉTICA (toxina, fillers, láser, peelings).
  Dato clave: la cosmética está formalmente dentro del CORE surgical del board americano.
- **LIVIANO Academia** (`DATA/BUSINESS/LIVIANO_ACADEMIA.md` + `src/lib/livianoStudyPlan.ts` +
  panel 📚 Academia en Business→LIVIANO): **90 días, lun 14-sep-2026 → mié 20-ene-2027**; 6 módulos + M7 Acceso
  en Perú (fisiología del peso → GLP-1/tirzepatida → acceso Perú → nutrición → ejercicio →
  farmacología/bariátrica → conducta → síntesis), 45'/día (25' estudio + 20' explicarlo
  en palabras simples), **16 casos, todos en viernes** (18-sep → 15-ene, **fechas de caso sin cambio en la v5.10**;
  verificado: 16/16 caen en viernes, 0 fines de semana y 0 feriados en las 90 filas).
  Cifras ancla: semaglutida −15% · tirzepatida −21% ·
  SELECT −20% CV · 67% del peso se recupera al suspender (argumento del tratamiento crónico).
- **Research** (`DATA/RESEARCH/RUTA_PUBLICACION_2027.md`): escalera carta→case report→revisión
  sistemática; case report #1 → Dermatology Online Journal (MEDLINE, APC ≤$300); Cureus deslistada
  de WoS (máx 1-2 ítems); dato NRMP: IMGs no-match en derma tenían mediana 12 publicaciones —
  el volumen sin Steps no compensa → proteger Step 1 hasta enero es la jugada correcta.
  Plan diario (**ciclo 1: 42 átomos, lun 14-sep-2026 → mar 9-feb-2027**; **ciclo 2: 67 átomos,
  jue 11-feb → lun 16-ago-2027**; pausa 4→29-ene = 0 átomos). **En la v5.10 Research NO se mueve** (ya
  estaba en el lun 14-sep desde la v5.9; `researchDailyPlan.ts` solo cambia la línea de fecha de generación
  vs HEAD) y es **Derma la que se mueve +2 días de calendario** (vie 11-sep → mar 15-sep) por la paridad
  Research↔Derma anclada al 10-jun: el lun 14-sep es día Research.
  Hitos editoriales v5.10 = los de la v5.9 (releídos de `DATA/RESEARCH/daily-plan.md` el 12-sep, no estimados):
  mentor M1 **vie 18-sep** · carta diana C-2 **lun 28-sep** · **SUBMIT carta-1 (C-6) vie 16-oct** ·
  ética tesis T-1 **mar 20-oct** · CR-1 (caso del case report) **mar 3-nov** ·
  **SUBMIT tesis-L0 (T-8) lun 23-nov** · revisor #2 (X-1) **vie 27-nov** · paquete CR congelado (CR-8)
  **mié 9-dic** · **SUBMIT case report (CR-9) lun 1-feb-2027** · equipo (X-9) **mié 17-feb** ·
  **PROSPERO (R10) mar 23-feb** · **SUBMIT SR-1 (R43) lun 5-jul-2027**.

## 5 · Qué se re-fechó en la app (corrimiento v5.10 · 12-sep-2026 · D1 = lun 14-sep)

Fechas leídas de los `.ts` con `node` el 12-sep-2026 (bloque `DAILY_META` de cada fichero, no
estimadas); ENCAPS leído de Supabase con `execute_sql`:

| Plan | Fichero | D1 | Dfin | Nº |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | `usmleStep1Daily.ts` | **lun 14-sep-2026** | **mié 27-ene-2027** | **95** |
| 🇵🇪 ENCAPS mantenimiento | `encapsPlan.ts` + Supabase | **lun 14-sep-2026** | vie 29-ene-2027 | **97** ⬇1 |
| 🇪🇸 MIR 1ª vuelta | `mirDailyPlan.ts` | **lun 14-sep-2026** | **lun 4-ene-2027** | 78 |
| 🇪🇸 MIR mantenimiento | `mirMantenimiento.ts` | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo; días en modo reducido 17 → 18, hasta el 27-ene)* |
| 🔬 Research ciclo 1 | `researchDailyPlan.ts` | lun 14-sep-2026 | mar 9-feb-2027 | 42 *(sin cambio)* |
| 🔬 Research ciclo 2 | `researchDailyPlan2027.ts` | jue 11-feb-2027 | lun 16-ago-2027 | 67 *(sin cambio)* |
| 🩺 Derma élite | `dermaDailyPlan.ts` | **mar 15-sep-2026** | **mar 30-mar-2027** | 70 |
| ⚖️ LIVIANO Academia | `livianoStudyPlan.ts` | **lun 14-sep-2026** | **mié 20-ene-2027** | 90 |
| 💼 Business formato L | `businessStudyPlan.ts` | **lun 14-sep-2026** | **mar 12-ene-2027** | **121** ⬇2 (84 trabajo + 37 DESCANSO) |
| 💰 AURUM | `aurumDailyPlan.ts` | **lun 14-sep-2026** | **mié 17-mar-2027** | 130 |
| 🧠 SYNAPSE | `synapseDailyPlan.ts` | **lun 14-sep-2026** | **jue 3-dic-2026** | **81** ⬇1 |
| 🛠 Vibecoding 04:15 | `vibecodingPlan.ts` | **lun 14-sep-2026** | **vie 4-dic-2026** | 60 (12 proyectos S1-S12; SHIP sáb 19-sep … 5-dic, iguales) |

`remap_inicio.js` salta sáb+dom+feriados (25-dic, 31-dic, 1-ene) en USMLE/MIR/LIVIANO
(Business solo inserta DESCANSO en finde y deja 116 filas; `gen_business_plan.py` las reconstruye a 121
aplicando también los feriados como DESCANSO — la fuente de verdad es el `.py`; Research, SYNAPSE, AURUM,
LIVIANO y vibecoding se regeneran con sus propios generadores — ver §8.7, §9 y §12.5).

## 7 · Verificación total (2-sep-2026, 8 agentes en paralelo + comprobación visual)

| Área | Resultado | Evidencia |
|---|---|---|
| **Frontend build** | ✅ | `tsc` 0 errores · `expo export --platform web` 0 warnings (1313 módulos, bundle 4.4 MB) · dist/ ignorado en git |
| **Deploy Vercel** | ✅ | joseph-md-app.vercel.app sirve el bundle v5.4 (`2026-09-03` ×13, `MANTENIMIENTO`, `v5.4`) ≤2 min tras el push · vitals-pulso 200 |
| **USMLE (99 días)** | ✅ | 0 fines de semana/feriados, 12 hitos en sus fechas exactas, diaInicio = DIAS, Obsidian ≤99; README/CALENDARIO/PALMERTON regenerados desde el TS |
| **MIR / Derma / Research** | ✅ (2 fixes) | Derma d44 y Research d41 caían en 1-ene/25-dic → re-sloteados; `slots()` del remap ahora salta feriados; MIR 78 L-V (3-sep→21-dic) |
| **Business / LIVIANO / SYNAPSE / AURUM** | ✅ (fixes) | SYNAPSE 82d y AURUM 130d regenerados a 3-sep (AURUM ahora también salta feriados); LIVIANO: 16/16 casos re-sloteados a VIERNES reales |
| **Backend Supabase** | ✅ + ⚠ P0 | 104 filas ENCAPS (3-sep→29-ene, 20 mini-sims en viernes, 0 huecos), labels IV-1/IV-6/V-7 corregidos, `dias_a_examen` 208 · **P0 pre-existente: `datos_tesis` (datos de menores) con RLS OFF + anon key en repo; 46 tablas sin RLS (40 son backups `study_schedule_*`)** |
| **Temas citados** | ✅ (2 fixes) | B&B/uWorld/Palmerton/AccessDerma/MIR verificados reales; corregida cifra NWCR en LIVIANO; uw d75 alineado a categoría uWorld exacta |
| **Google Calendar** | ✅ | 11 bloques de estudio presentes en cada L-V del 3 al 11-sep, sin solapes entre bloques de estudio, finde libre, sin series viejas; descripciones de los 12 hitos actualizadas a D# v5.4 |

Pendientes menores (no bloqueantes): martes ALISTARSE 18:30 pisa 15' la eval USMLE (rutina pre-existente); las series USMLE del Calendar siguen hasta el 29-ene (semana de examen) aunque el plan termina el 22; 9 checks stale de julio en `study_checks` (claves distintas, sin colisión).

3-sep: corrimiento a D1=4-sep (v5.5) — mismo pipeline, hitos intactos, 1 día de contenido USMLE fusionado.

## 6 · NotebookLM

- **"STEP 1 · Palmerton Engine (método + sistemas)"** — **295 fuentes (tope del plan)**: ~146 videos del canal
  (método + High-Yield por sistema, catálogo completo vía playlists) + **149 artículos de yousmle.com** (crawl del
  sitemap 615 posts → 151 relevantes Step 1/método; 2 duplicados omitidos). Es el motor de consulta del método y
  de las tarjetas de mecanismo. https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86
- **"DERMA · Élite Engine (Palmerton derma · fuentes verificadas)"** — 75 fuentes OA verificadas (DermNet
  describing-lesions + Dermoscopy CME, Dermoscopedia, Cotofana, DeLorenzi, Goodman, MD Codes, láser, acné, ISSVA,
  StatPearls…), enlazado en la pestaña Fuentes del Hub Derma (`DERMA_NOTEBOOKLM` en dermaData.ts).
  https://notebooklm.google.com/notebook/0e9fac5c-01f3-406e-96f2-6230bd66a29c

## 8 · "Cero puntos ciegos" — investigación Palmerton v3 + Fase C por sección (4→6-sep-2026)

**Método.** (1) Crawl completo de yousmle.com e ingesta al cuaderno (295 fuentes). (2) Seis análisis de vacíos por
sección con criterio de preparador de élite (MIR, ENCAPS, Derma, Research, LIVIANO/AURUM/Business, SYNAPSE/VITALS/rutina)
→ **65 vacíos** con impacto/esfuerzo/ficheros (`DATA/USMLE/_palmerton_v3_extractos/gaps_*.json`). (3) **Fase C**: 12
agentes en paralelo con ficheros disjuntos implementaron los de impacto alto/medio sin tocar franjas, metas ni fechas
(commit `22ac163`). (4) Segunda capa de vacíos post-implementación (`gaps_v3b_*.json`) para la siguiente iteración.
(5) Extracción exhaustiva del método (6 temas + 6 grupos de materias) y síntesis en `DATA/USMLE/PALMERTON_METODO_COMPLETO.md`
y `PALMERTON_POR_MATERIA.md` v3; plan USMLE ceñido a los 5 niveles UWorld (§8.8).

### 8.1 MIR (15:15-16:15)
- **Plan v3 regenerado** (`STUDY_HUB/_scrape/gen_mir_daily.js --check`): selección **top-N por Peso MIR** + núcleos
  rabi_94 forzados (cobertura 744 → **957 puntos-peso**, 20 pesos corruptos → 0), **D1-D4 = Epidemiología + Bioética**
  (mejor ratio Q/día; transferencia directa del I-3 de ENCAPS), bloques permutados para que cada asignatura **preceda ~1
  semana a su sistema Step 1** (campo `usmleSystem`), D77 mini-MIR 40Q/51 min + D78 baseline por asignatura.
- Franjas rebalanceadas dentro del bloque (7 → 17-19 Q/día; lectura dirigida a los gaps del pre-test; 77 s/Q real);
  eval anclada multi-temporal **D-1/D-3/D-7**; test de cierre 10Q por asignatura (≥70% consolidada, <55% a anclas).
- **Medición**: `mirEvalLog.ts` (localStorage, neto A−F/3, tipo de error knowledge/transfer/proceso + `delta_es`
  🇪🇸), MIR_READINESS derivado del log; puente `mirUsmleBridge.ts` (chip "Step 1 esta semana" / "MIR en paralelo").
- **Mantenimiento ene-mar 2027** (`mirMantenimiento.ts`, 63 días, 25Q/día ponderadas por peso y por el log; modo
  reducido 4-22 ene) → el bloque 15:15 ya no queda vacío entre el 24-dic y el 31-mar.
- Pendiente Joseph: pool de preguntas oficiales (`mirPreguntasOficiales.ts` vacío; MVP = cuadernillos 2022-2026 de
  examenesmir.com clasificados por capId) · preset FSRS `APEX::MIR` retention 0,85 · confirmar acceso AMIR.

### 8.2 ENCAPS (16:15-17:15) — ver también DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md
- App/datos a **v3**: `encapsRentabilidad.ts` y `encapsCobertura.ts` (8 críticos + 3 ALTA rebote, IV nunca <6%;
  II-EMG e I-OCC creados); **Supabase re-sembrado** (102 filas, backup `study_schedule_bk_0906b`) con **sub-eje por
  sesión** (V-2 planeamiento/clima+calidad/residuos, I-3 8 sub-ejes…) y **`temas_secundarios` = cola larga** (17
  códigos → ≈30 pp del vector que antes no tenían slot); mini-sim de viernes con receta fija y nota persistida en
  `study_sim_scores` (Cockpit grafica vs 18/25).
- **Tracking unificado** multi-examen (`_registro_resoluciones.json` _meta v3, taxonomía Palmerton + CCSN + delta_es)
  + cierre de sesión en 1 línea + `gen_encaps_semana.js` (% ciego semanal vs vector, temas calientes, override del CICLO).
- **Sellado del 2026-II** (texto + ítems extraídos = LISTA NEGRA; pre-test vie 5-feb-2027 en `PRETEST_2026-II.md`),
  banco propio (`BANCO_PROPIO/`: exámenes reales 2024-2A→2026-1 por código, mini-sims HTML con temporizador 72s/Q
  para 11 y 18-sep, `gen_encaps_minisim.js`), **cifras críticas** (CSV Anki `ENCAPS_Cifras_2027-I` para el bloque
  05:00), `gen_encaps_intensivo_2027.js` (SQL de la fase intensiva feb-mar, se aplica al confirmar la fecha).
- Pendiente Joseph: re-scan logueado QX/Theomed el 9-sep (¿acceso vivo? ¿Investigación/Gestión publicados?) ·
  verificar RM de emergencia (II-EMG) y base legal SST (I-OCC) · convocatoria SERUMS 2027-I (fecha real).

### 8.3 Derma (13:30, interdiario)
- `dermaDailyPlan.ts` v2.1: **200 casos en permutación fija** (2/día, `casoIds`), micro-track de **dermatoscopia**
  (18 módulos DermNet CME + 1 imagen ciega/sesión), **swap de contenido d19-20 ↔ d57-58** (oclusión vascular/HDPH y
  ceguera ANTES de la extracción de SR-1), `puenteResearch`, campos `nitida` (protocolo/guion/seguimiento) en el
  módulo B, capa ATLAS completada.
- `dermaCerebro.ts` (**35 fichas de 7 pasos** X + CRIT, con checklist HDPH), `dermaLedger.ts` (ledger por caso y
  fallos por módulo CORE), decks `APEX::DERMA::<A..X>` + plantilla de sesión, registro `TRACKING/_registro_derma.json`,
  componentes (dictado morfológico 8 ejes con gate del módulo A, cerebro clínico modo recitar, simulador oclusión
  vascular 90 s, registro por caso, widget de debilidades, checkpoints), cuaderno NotebookLM Derma, rama Obsidian
  `10_DERMATOLOGIA` + `obsidianDermaMap.ts`, `RUTA_FELLOWSHIP_ESTETICO.md` (ASDS/ACGME/Mayo verificados),
  `NITIDA_PROTOCOLOS.md`.
- Pendiente Joseph: crear los 10 sub-decks en Anki · TOC de Fitzpatrick/Barnhill/Weinberg con sesión UF (método en
  `_scrape/README_TOC_PENDIENTE.md`) · dermatoscopio de bolsillo antes de d45 · cifras "A VERIFICAR" de las fichas.

### 8.4 Research (13:30, interdiario)
- **Plan re-cortado** (`gen_research_plan.js <fecha>`, fuente única → `researchDailyPlan.ts` + `daily-plan.md` +
  `obsidianResearchMap.ts`): pistas **R0 infra académica** (checklist 10 cuentas) · **M contactos** (Dr. Ciro,
  AuthorAID, Finlay) · **C carta al editor** (C-1 candidatos verificados → submit oct-nov) · **T tesis L0** (research
  letter: ética/CEI → STROBE → cascada JAAD Intl → IJD → Actas → Anais) · **CR case report** (consentimiento, fotos,
  CARE 13) · 0 átomos del 4 al 29-ene · **SR-1 pasa al ciclo 2** (`researchDailyPlan2027.ts`, 5-feb→10-ago-2027, con
  revisor humano #2 y equipo PROSPERO).
- `RESEARCH_ENTREGABLES` + **Mesa editorial** en el Hub (estado por entregable), timeline/horario viejos eliminados;
  docs: `MENTORES.md` (3 mensajes listos), `CARTA_1/candidatos.md` (5 artículos 2026 con DOI verificado por
  Crossref), `CASE_REPORT_1/` (consentimiento ES/EN, protocolo de fotos, CARE), `TESIS_L0/`, presupuesto en RUTA §3;
  Edge Functions `research-discovery`/`research-fulltext` descargadas al repo (`supabase/functions/`), DDL faltante,
  `research_agent_tasks` a idle, `exportResearchCorpus()` CSV/RIS para Rayyan, plantillas letter/CARE/STROBE + `docx_assembler --template`.
- Pendiente Joseph: ENVIAR los 3 mensajes (2ª-3ª semana sep) · documentar CEI/consentimientos de la tesis (1ª
  semana oct) · caso + consentimiento + senior author antes del 31-oct · crear ORCID/Scholar/CTI Vitae · decidir si
  la tesis se somete el 17-nov (plan) o en feb (RUTA §3.1).

### 8.5 LIVIANO · AURUM · Business · CURVA/DENSA · VITALS
- **LIVIANO**: currículo como dato (`liviano_curriculum.json`) + generador `gen_liviano_plan.js` (absorbe el reslot de
  viernes), **16 casos únicos** con datos clínicos, red flags y rúbrica 0-2×4 (`livianoCasos.ts`), **módulo 7 "Acceso en
  Perú"** (DIGEMID, condición de venta, 2 cotizaciones + magistral, cadena de frío) como tarea verificable →
  `LIVIANO_ACCESO_PERU`, revisión trimestral, pre-test ciego lunes + drills de cifras, **216 tarjetas de mecanismo**
  (CSV), score real en vez de ✓, `LivianoKpiLog` semanal con semáforo, `LIVIANO_PROTOCOLO_CLINICO_v1.md` (capstone).
- **AURUM**: variante LIVIANO en F3-F6 (1 de cada 5 drills, PITCH v4-v6, mismo paciente que el caso integral),
  `AURUM_RUBRICA_PITCH` (6 ítems) en los 7 viernes de cierre, scoreboard semanal editable con semáforo.
- **Business**: plan Pulso re-scope a formato **L** (lectura 20-25'/día + 1 output viernes; sin bloque de 2h
  inexistente; sin contradicciones con la Academia) desde `plan_pulso_v3_L.json`.
- **CURVA / DENSA**: esqueletos curriculares con fuentes verificadas (menopausia/andrología; S3 alopecia + AAD) para
  convertir en plan de 90 días en enero. **VITALS**: `LIVIANO_VITALS_BRIDGE.md` (estándar Academia → regla VITALS; 3 tareas).
- Pendiente Joseph: decidir eje de CURVA (estética corporal vs hormonal) · leer las guías descargadas y rellenar
  cifras "A VERIFICAR" · las 3 tareas VITALS requieren un chat de VITALS (código en producción, no tocado).

### 8.6 SYNAPSE · vibecoding · sistema transversal
- **Vibecoding 04:15 como dato**: `VIBECODING_12_PROYECTOS.md` + `vibecodingPlan.ts` (S1 parser APEX → S2 telemetría
  Anki → S3 scores USMLE → S4 revisión semanal → S5 hook remap → **S6 RLS datos_tesis** → S7 VITALS → S8 motor de
  preguntas → S9 overlays → S10 bot LIVIANO → S11 contenido → S12 capstone), con entregable verificable y ✓ en la app;
  F1 de SYNAPSE (12:30) sustituye CS50P por el stack real (Claude Code/Academy · Supabase · n8n), PC sáb = SHIP, dom = Feynman.
- **Revisión semanal** (`DATA/REVISION_SEMANAL.md`, 10 métricas; `gen_revision_semanal.js` pre-rellena desde
  Supabase/localStorage/AnkiConnect/VITALS y appendea a `DATA/USMLE/REVISIONES/_semanas.json`; tarjeta "Semana N/20"),
  **telemetría Anki** (`anki_telemetria.js`, KPI due/backlog/retención en el cockpit; Anki de finde = due × 20 s),
  **`PROTOCOLO_MODO_MINIMO.md`** (VERDE/ÁMBAR/ROJO con disparadores medibles y orden de degradación; selector en Home).
- **Rutina/Calendar**: `CALENDAR_SEGMENTOS_V5_6.md` re-extraído del Calendar vivo (autoridad de CUÁNDO y CÓMO);
  descripciones de desayuno/almuerzo/deep prime/MIR/ENCAPS→LIVIANO/GYM con comida-hidratación; **protocolo test-day
  de Palmerton en los 12 overlays de hito** (Ziploc 1/2/3, sit-in breaks, almuerzo dentro del sim, VITALS como ensayo);
  `RUTINA_EXTREMA_MILITARIZADA.md` a v5.6 (Step 1 primario hasta enero); memoria de Claude con "ESTADO VIGENTE".
- **Parser APEX** (D:/agente_estudio): P0-2 (lookahead sin `$`) y P0-3 (caso_clinico/fisio_expandida) arreglados con
  test multilínea verde; n8n sigue con el código del 7-may hasta redeploy.
- Pendiente Joseph: crear el evento sáb 07:15 "REVISIÓN SEMANAL" · auditar F0 en 5' el 9-sep · verificar FSRS/10
  nuevas en Anki D1-D2 · redeploy n8n (APEX-MOTOR-FLOW-V2) · `datos_tesis` RLS OFF sigue abierto (proyecto S6, 12-16 oct).

### 8.7 Pipeline de corrimiento (si un día no se estudia)
> **⚠ SUPERADO el 13-sep-2026 por §13.3** (remap ya invoca `gen_research_plan.js`, `gen_derma_ciclo2.js` y `gen_business_plan.py`; SYNAPSE hasta ene-2027; `gen_research_calendar.js`; `gen_mir_pool.js --emit`). Se conserva como histórico.

`node DATA/_scripts/remap_inicio.js <fecha>` → después, en este orden: `gen_research_plan.js <fecha>` (la pausa de enero
no la conoce el remap) · `gen_liviano_plan.js <fecha>` · `gen_business_plan.py <fecha>` · **`gen_vibecoding_plan.js <fecha>` ANTES que** `gen_synapse_plan.js <fecha>`
(el PC del sábado lee las fechas de SHIP de `vibecodingPlan.ts`; si se invierte el orden, el sábado anuncia el cierre de un proyecto que aún no terminó)
· `gen_vibecoding_plan.js <fecha>` · `gen_aurum_plan.js <fecha>` · `STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check`
· `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql · USMLE con `gen_usmle_v5.js` (scratchpad;
**desde la v5.8 NO recorta ni fusiona contenido**: los 12 hitos van anclados por fecha en el mapa `SIMS`
y el plan se alarga por la cola) · docs + D# de los overlays del Calendar.

## 9 · Corrimiento v5.7 (8-sep-2026) — D1 pasa de lun 7-sep a MIÉ 9-SEP-2026

> 🗂 **HISTÓRICO — SUPERSEDIDO por §10 (v5.8, 9-sep-2026).** Se conserva íntegro como registro del
> último corrimiento que todavía FUSIONABA contenido; sus fechas, D# y cifras son las de ANTES de la
> v5.8. La regla que describe (§9.2 "qué se recortó") **ya no rige**.

### 9.1 Por qué

**El 7 y el 8 de septiembre no se estudiaron.** Regla determinista del sistema: cada día sin estudiar
= **+1 día hábil** para todos los planes. Dos días perdidos = **+2 hábiles** → el D1 de todo el régimen
pasa de **lun 7-sep-2026** a **mié 9-sep-2026** (v5.7).

Lo que **NO** se movió, por diseño:
- Las **franjas horarias** (04:15 vibecoding · 05:00 Anki AM · 07:15-12:00 Step 1 · 12:30 SYNAPSE ·
  13:30 Research↔Derma · 14:15 AURUM · 15:15 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval).
- Las **metas** de cada frente (Step 1 PASS · ENCAPS ≥17 · MIR Top 50 · publicaciones).
- Las **fechas de examen**: Step 1 semana **25-29 ene-2027** · ENCAPS 2027-I fines de marzo.
- Los **hitos** UWSA/NBME/Free 120: siguen en sus viernes originales; solo cambia su D#.
- El **MIR mantenimiento** (4-ene → 31-mar-2027): tiene fechas fijas, no se corre.

### 9.2 Qué se recortó

Para que los hitos no se muevan, el corrimiento **se paga con contenido de la Fase A del USMLE**:
esta vez **2 días** (uno por cada día perdido). Se hizo **fusionando los 4 días de cierre de la Fase A
en 2 días dobles**, sin perder ningún tema:

| v5.6 (4 días) | → | v5.7 (2 días dobles) |
|---|---|---|
| D78 Metabolismo HY (glucólisis/TCA/CTE · glucógeno · lípidos) | → | **D78 · lun 28-dic** — Bioquímica HY (día doble): metabolismo **+** aminoácidos, ciclo de urea, errores innatos y vitaminas |
| D79 Aminoácidos + ciclo de urea + errores innatos + vitaminas | ↗ | *(fusionado en D78)* |
| D80 Biología molecular + genética (herencias, trinucleótidos) | → | **D79 · mar 29-dic** — Cierre de Fase A (día doble): biología molecular y genética **+** farmacología general (PK/PD, toxicología, antídotos) |
| D81 Farmacología general: PK/PD + toxicología + antídotos | ↗ | *(fusionado en D79)* |

**Ningún tema se perdió**: los 4 bloques de contenido siguen en el plan, comprimidos en 2 sesiones.
El sistema `Pharmacology` deja de existir como día propio y su contenido vive dentro del cierre de
Biochemistry. El resto de la Fase A (sistemas D1-D77) queda **intacta día por día**.

### 9.3 Tabla plan → D1 / Dfin / nº días · ANTES (v5.6) y AHORA (v5.7)

Todas las fechas parseadas de los `.ts` (v5.6 desde el commit `b24f986`; v5.7 desde el árbol de trabajo).

| Plan | D1 v5.6 | Dfin v5.6 | Nº v5.6 | **D1 v5.7** | **Dfin v5.7** | **Nº v5.7** |
|---|---|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | lun 7-sep-2026 | vie 22-ene-2027 | 97 | **mié 9-sep-2026** | **vie 22-ene-2027** | **95** ⬇2 |
| 🇵🇪 ENCAPS mantenimiento | lun 7-sep-2026 | vie 29-ene-2027 | 102 | **mié 9-sep-2026** | **vie 29-ene-2027** | **100** ⬇2 |
| 🇪🇸 MIR 1ª vuelta | lun 7-sep-2026 | mié 23-dic-2026 | 78 | **mié 9-sep-2026** | **lun 28-dic-2026** | 78 |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo)* |
| 🔬 Research ciclo 1 | mar 8-sep-2026 | mié 3-feb-2027 | 42 | **jue 10-sep-2026** | **vie 5-feb-2027** | 42 |
| 🔬 Research ciclo 2 | vie 5-feb-2027 | mar 10-ago-2027 | 67 | **mar 9-feb-2027** | **jue 12-ago-2027** | 67 |
| 🩺 Derma élite | lun 7-sep-2026 | lun 22-mar-2027 | 70 | **mié 9-sep-2026** | **mié 24-mar-2027** | 70 |
| ⚖️ LIVIANO Academia | lun 7-sep-2026 | mié 13-ene-2027 | 90 | **mié 9-sep-2026** | **vie 15-ene-2027** | 90 |
| 💼 Business formato L | lun 7-sep-2026 | mar 5-ene-2027 | 121 | **mié 9-sep-2026** | **jue 7-ene-2027** | 121 |
| 💰 AURUM | lun 7-sep-2026 | mié 10-mar-2027 | 130 | **mié 9-sep-2026** | **vie 12-mar-2027** | 130 |
| 🧠 SYNAPSE | lun 7-sep-2026 | jue 26-nov-2026 | 81 | **mié 9-sep-2026** | **sáb 28-nov-2026** | 81 |
| 🛠 Vibecoding 04:15 | lun 7-sep-2026 | vie 27-nov-2026 | 60 | **mié 9-sep-2026** | **mar 1-dic-2026** | 60 |

**Hitos USMLE: fecha idéntica, D# nuevo** — UWSA1 11-sep D5→**D3** · NBME 25 2-oct D20→**D18** ·
NBME 26 23-oct D35→**D33** · NBME 27 13-nov D50→**D48** · NBME 28 4-dic D65→**D63** ·
NBME 29 18-dic D75→**D73** · NBME 30 30-dic D82→**D80** · UWSA2 8-ene D87→**D85** ·
NBME 31 15-ene D92→**D90** (GO/NO-GO) · NBME 32 18-ene D93→**D91** · NBME 33 20-ene D95→**D93** ·
Free 120 22-ene D97→**D95**.

### 9.4 Pipeline ejecutado, en orden

1. `node DATA/_scripts/remap_inicio.js 2026-09-09` — re-fecha MIR, Derma, Business, LIVIANO y los
   demás bloques del remap (salta sáb+dom y los feriados 25-dic / 31-dic / 1-ene).
2. `node DATA/_scripts/gen_research_plan.js 2026-09-09` — Research ciclos 1 y 2 (el remap no conoce la
   pausa de enero; este script sobreescribe sus fechas) → `researchDailyPlan.ts`, `researchDailyPlan2027.ts`,
   `obsidianResearchMap.ts` y `DATA/RESEARCH/daily-plan.md`.
3. `node DATA/_scripts/gen_liviano_plan.js 2026-09-09` — 90 días, 16 casos re-sloteados a VIERNES reales,
   pre-tests en lunes, 4 drills (D36 · D57 · D76 · D87) → `livianoStudyPlan.ts` + `livianoCasos.ts` + CSV Anki.
4. `python DATA/_scripts/gen_business_plan.py 2026-09-09` — 121 filas (84 trabajo + 37 DESCANSO), 15 OUTPUT
   en viernes + S16 y la retro en el cierre de enero.
5. `node DATA/_scripts/gen_synapse_plan.js 2026-09-09` — 81 días (12 semanas, 9-sep → 28-nov).
6. `node DATA/_scripts/gen_vibecoding_plan.js 2026-09-09` — 60 días + 12 SHIP en sábados (19-sep → 5-dic)
   → `vibecodingPlan.ts` + `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md`.
7. `node DATA/_scripts/gen_aurum_plan.js 2026-09-09` — 130 días (9-sep → 12-mar-2027).
8. `node STUDY_HUB/_scrape/gen_mir_daily.js 2026-09-09 --check` — 78 días con verificación de pesos,
   capIds, fechas L-V y D1-D4 = Epi + Bioética.
9. `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-09` → **SQL generado** en
   `DATA/_scripts/_encaps_mantenimiento_2027.sql` (100 filas, 9-sep → 29-ene, backup `study_schedule_bk_0908`).
   **⚠ PENDIENTE: aplicarlo con `execute_sql`** — es el único paso del pipeline que no está ejecutado.
10. USMLE con `gen_usmle_v5.js` (scratchpad): 95 días, fases 80/90/95, fusión de los 4 días de cierre de
    Fase A en 2 (§9.2), hitos en sus viernes.
11. `npx tsc --noEmit -p .` → **0 errores**.
12. Docs regenerados/actualizados a v5.7 (este fichero, README de MIR/Business, PLAN_ELITE Derma,
    RUTA_PUBLICACION, LIVIANO_ACADEMIA, CURSO_IA_04H, VIBECODING_12_PROYECTOS, motor-dia-a-dia,
    ROADMAP_MAESTRO) + D# de los 12 overlays de hito en el Calendar.

### 9.5 Efectos colaterales detectados (y qué hacer)

1. **ENCAPS Supabase sin aplicar** (paso 9). Hasta que se ejecute el SQL, la app lee el calendario de
   la v5.6 y muestra el tema equivocado en la franja 16:15.
2. **SHIP del vibecoding desalineado con SYNAPSE.** Con D1 en miércoles, la semana de cada proyecto va
   mié→mar y su SHIP real (`VIBE_PROYECTOS.ship`) cae el **sábado siguiente** (S1 = sáb 19-sep), mientras
   `synapseDailyPlan.ts` sigue etiquetando "SHIP Sn" el sábado de SU semana n (sáb 12-sep). Va **una semana
   por delante**, y el **SHIP S12 (sáb 5-dic-2026) queda fuera** de los 81 días de SYNAPSE (terminan el
   28-nov). Manda `VIBE_PROYECTOS`. Arreglo propuesto en `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` §Pendiente v5.7.
3. **Puente MIR↔Step 1 estrechado en 2 bloques.** El MIR mantiene 78 días y el Step 1 bajó a 95, así que
   los desfases cambiaron: **Cardiología** ahora precede al bloque Cardiovascular en **1 día** (15-sep vs
   16-sep) en vez de 3, y **Psiquiatría** arranca el mismo día que Psychiatry & Behavioral (21-dic). Los
   otros 9 bloques quedan entre +6 y +12 días. No se re-permuta el MIR: el objetivo primario hasta el
   29-ene es el Step 1. Detalle en `DATA/MIR/README.md` §1.
4. **Dos hitos editoriales con 1 día de margen**: `C-6` (SUBMIT carta al editor, mié 14-oct) contra el
   deadline interno del 15-oct, y `CR-1` (caso + senior author del case report, vie 30-oct) contra el
   31-oct. Detalle y plan B en `DATA/RESEARCH/RUTA_PUBLICACION_2027.md` §9.1.
5. **Los D# de LIVIANO cambiaron de número, no solo de fecha** (el generador re-sloteó los casos a los
   viernes reales): drills D37/D58/D77/D88 → **D36/D57/D76/D87**; revisión trimestral D46/D90 →
   **D45/D89**; capstone D89 → **D88**. La fecha es lo estable, no el número de día.

## 10 · Corrimiento v5.8 (9-sep-2026) — D1 pasa de mié 9-sep a JUE 10-SEP-2026

> 🕘 **HISTÓRICO.** Superado por el corrimiento v5.9 del 10-sep (§11): las fechas, los D# y los conteos de esta sección son los de ANTES de ese corrimiento y se conservan como registro.

### 10.1 Por qué

**El 9 de septiembre tampoco se estudió.** Regla determinista del sistema: cada día sin estudiar =
**+1 día hábil** para todos los planes → el D1 del régimen pasa de **mié 9-sep-2026** a
**jue 10-sep-2026** (v5.8). Es el **octavo** día hábil de colchón consumido desde el 31-ago.

### 10.2 La regla NUEVA (y es la que manda)

> ***"ni un subtema ni tema dejar por detrás, absolutamente todo de Joseph MD corre a partir del 10"***
> — Joseph, 9-sep-2026.

De la **v5.3 a la v5.7** el desfase se pagaba **fusionando días de contenido** del cierre de Fase A
para que los 12 hitos NBME/UWSA no cambiaran de fecha (97 → 95 días, 4 días de bioquímica/farmacología
comprimidos en 2 días dobles — §9.2).

**Desde la v5.8 eso queda derogado:**

| | Hasta v5.7 | **Desde v5.8** |
|---|---|---|
| Qué se hace con el desfase | se **comprime contenido** (fusión de días) | se **alarga el plan por la cola** |
| Temario | perdía granularidad (días dobles) | **1:1, intacto** |
| Fecha final del USMLE | fija (vie 22-ene-2027) | **se mueve** (ahora lun 25-ene-2027) |
| Hitos NBME/UWSA | fijos | **fijos** (no cambia) |
| Franjas, metas, ventana de examen | fijas | **fijas** (no cambia) |

**Prueba dura de que nada se perdió** (verificada, no estimada): el multiconjunto de
`(system, tier, sub, bbCh, bbVid, uw, mat, matType, palm)` de `DIAS` en `usmleStep1Daily.ts` es
**idéntico** al de la v5.7 — **0 diferencias en las 95 filas** — y el total de preguntas objetivo
sigue siendo **5580Q** (3340 de banco diario + 2240 de simulacros). El generador reporta
*"contenido usado 73/73, 0 sobrante"*.

**Cómo se logró que los 12 hitos no se movieran.** Los 5 hitos de enero (UWSA2, NBME 31/32/33,
Free 120) estaban colocados **por posición** dentro de los arrays de Fase B/C, así que al ganar un día
se habrían corrido. Ahora están **anclados por fecha** en el mapa `SIMS` del generador (igual que los 7
hitos de 2026) y los 10 días no-hito restantes se consumen desde un único array `POST_A` en los huecos
libres. Además, la clasificación de `nivelUW`/`qDia` dejó de depender de umbrales de fecha
(`>= 2027-01-04` / `>= 2027-01-18`) y pasa a depender del **origen de la fila** (`bbCh` = `Banco` /
`Sprint`): así la regla es exactamente la misma aunque el contenido se derrame hasta el 4-ene.

### 10.3 Tabla plan → D1 / Dfin / nº de días · ANTES (v5.7) y AHORA (v5.8)

Todas las fechas parseadas de los `.ts` con `node` (v5.7 desde `git show HEAD`; v5.8 desde el árbol de
trabajo). ENCAPS leído de Supabase con `execute_sql`.

| Plan | D1 v5.7 | Dfin v5.7 | Nº v5.7 | **D1 v5.8** | **Dfin v5.8** | **Nº v5.8** |
|---|---|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | mié 9-sep-2026 | vie 22-ene-2027 | 95 | **jue 10-sep-2026** | **lun 25-ene-2027** | **95** |
| 🇵🇪 ENCAPS mantenimiento | mié 9-sep-2026 | vie 29-ene-2027 | 100 | **jue 10-sep-2026** | vie 29-ene-2027 | **99** ⬇1 |
| 🇪🇸 MIR 1ª vuelta | mié 9-sep-2026 | lun 28-dic-2026 | 78 | **jue 10-sep-2026** | **mar 29-dic-2026** | 78 |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo)* |
| 🔬 Research ciclo 1 | jue 10-sep-2026 | vie 5-feb-2027 | 42 | jue 10-sep-2026 | vie 5-feb-2027 | 42 *(sin cambio)* |
| 🔬 Research ciclo 2 | mar 9-feb-2027 | jue 12-ago-2027 | 67 | mar 9-feb-2027 | jue 12-ago-2027 | 67 *(sin cambio)* |
| 🩺 Derma élite | mié 9-sep-2026 | mié 24-mar-2027 | 70 | **vie 11-sep-2026** | **vie 26-mar-2027** | 70 |
| ⚖️ LIVIANO Academia | mié 9-sep-2026 | vie 15-ene-2027 | 90 | **jue 10-sep-2026** | **lun 18-ene-2027** | 90 |
| 💼 Business formato L | mié 9-sep-2026 | jue 7-ene-2027 | 121 | **jue 10-sep-2026** | **vie 8-ene-2027** | 121 |
| 💰 AURUM | mié 9-sep-2026 | vie 12-mar-2027 | 130 | **jue 10-sep-2026** | **lun 15-mar-2027** | 130 |
| 🧠 SYNAPSE | mié 9-sep-2026 | sáb 28-nov-2026 | 81 | **jue 10-sep-2026** | **lun 30-nov-2026** | **82** ⬆1 |
| 🛠 Vibecoding 04:15 | mié 9-sep-2026 | mar 1-dic-2026 | 60 | **jue 10-sep-2026** | **mié 2-dic-2026** | 60 |

**Tres planes NO se movieron +1 día como el resto — leerlo antes de asumir nada:**

1. **Research ciclos 1 y 2: fechas idénticas.** Research y Derma se alternan en la franja 13:30-14:15;
   con D1 en jueves la **paridad se invirtió**, así que Research se queda con el jue 10-sep (que ya era
   suyo) y **Derma pasa del mié 9-sep al vie 11-sep** (+2 días de calendario, no +1).
2. **ENCAPS pierde un día (100 → 99).** Es el único bloque que **no se alargó**: conserva su cierre en
   **vie 29-ene-2027** porque esa fecha está alineada al examen ENCAPS 2027-I, no al Step 1. Como la
   hora ENCAPS es **banqueo puro** (no temario secuencial), no desaparece ningún tema: desaparece una
   sesión de banco. → **decisión pendiente de Joseph** (§10.5).
3. **SYNAPSE gana un día (81 → 82).** Su generador cuenta también sábados/domingos (PC de fin de
   semana): al arrancar en jueves, la última semana entra completa y el plan cierra el **lun 30-nov**.

**Hitos USMLE: fecha idéntica, D# nuevo** — UWSA1 11-sep D3→**D2** · NBME 25 2-oct D18→**D17** ·
NBME 26 23-oct D33→**D32** · NBME 27 13-nov D48→**D47** · NBME 28 4-dic D63→**D62** ·
NBME 29 18-dic D73→**D72** · NBME 30 30-dic D80→**D79** · UWSA2 8-ene D85→**D84** ·
NBME 31 15-ene D90→**D89** (GO/NO-GO) · NBME 32 18-ene D91→**D90** · NBME 33 20-ene D93→**D92** ·
Free 120 22-ene D95→**D94**. Los 12 overlays naranjas del Google Calendar **no cambian de fecha**:
solo hay que actualizar el D# de su título.

### 10.4 Pipeline ejecutado, en orden

> **Trazabilidad:** los comandos de esta lista son el pipeline canónico de §8.7 instanciado con la fecha
> `2026-09-10`; el detalle de qué se ejecutó lo reportó el agente de datos. Lo que sí está **verificado
> de forma independiente** (parseo con `node` de cada `.ts` + `execute_sql` sobre `study_schedule`) son
> los **resultados**: las fechas, los D# y los conteos de §10.3. El log exacto de los pasos 1-8 y 11
> (`npx tsc --noEmit`) es **A VERIFICAR (09-sep)**.

1. `node DATA/_scripts/remap_inicio.js 2026-09-10` — re-fecha MIR, Derma, Business, LIVIANO y los demás
   bloques del remap (salta sáb+dom y los feriados 25-dic / 31-dic / 1-ene) + reslot LIVIANO.
2. `node DATA/_scripts/gen_research_plan.js 2026-09-10` — Research ciclos 1 y 2 (el remap no conoce la
   pausa de enero) → `researchDailyPlan.ts`, `researchDailyPlan2027.ts`, `obsidianResearchMap.ts`,
   `DATA/RESEARCH/daily-plan.md`.
3. `node DATA/_scripts/gen_liviano_plan.js 2026-09-10` — 90 días, 16 casos re-sloteados a VIERNES reales
   → `livianoStudyPlan.ts` + `livianoCasos.ts` + CSV Anki.
4. `python DATA/_scripts/gen_business_plan.py 2026-09-10` — 121 filas (84 trabajo + 37 DESCANSO).
5. `node DATA/_scripts/gen_vibecoding_plan.js 2026-09-10` — **ANTES que SYNAPSE** (el PC del sábado lee
   las fechas de SHIP de `vibecodingPlan.ts`): 60 días + 12 SHIP en viernes (11-sep → 27-nov).
6. `node DATA/_scripts/gen_synapse_plan.js 2026-09-10` — 82 días (10-sep → 30-nov).
7. `node DATA/_scripts/gen_aurum_plan.js 2026-09-10` — 130 días (10-sep → 15-mar-2027).
8. `node STUDY_HUB/_scrape/gen_mir_daily.js 2026-09-10 --check` — 78 días con verificación de pesos,
   capIds y fechas L-V.
9. `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-10` → `execute_sql` contra
   `qacynpqdrorpuegsmtcy`, con backup previo **`study_schedule_bk_0909`**. Verificado: 99 filas,
   10-sep-2026 → 29-ene-2027, 0 fines de semana, 0 feriados.
10. USMLE con `gen_usmle_v5.js` (scratchpad) **en su versión v5.8**: 95 días, fases 80/89/95, hitos
    anclados por FECHA en `SIMS`, array `POST_A` para los días no-hito, clasificación por `bbCh`.
    **Sin fusiones ni recortes** (contenido 73/73, 0 sobrante).
11. `npx tsc --noEmit -p .` → 0 errores *(reportado por el agente de datos · **A VERIFICAR (09-sep)**)*.
12. Docs a v5.8: este fichero (§1, §2, §4, §5, §10), `DATA/USMLE/README.md`,
    `DATA/USMLE/CALENDARIO_5_MESES.md`, `DATA/USMLE/PALMERTON_POR_MATERIA.md`,
    `DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md`, `DATA/USMLE/RECURSOS_META_2026.md` + D# de los 12
    overlays de hito del Calendar.

> **El orden importa**: `gen_vibecoding_plan.js` SIEMPRE antes que `gen_synapse_plan.js`, y el SQL de
> ENCAPS SIEMPRE con backup previo. El paso 10 (USMLE) va al final porque consume las fechas ya fijadas.

### 10.5 Efectos colaterales de la v5.8 (y qué hacer)

1. **D95 = lun 25-ene-2027 cae DENTRO de la ventana de examen** (25-29 ene, target mié 27). El plan y la
   semana de examen ahora se solapan: el D95 (repaso rapid review First Aid + Anki + 20Q flagged) es de
   hecho el **D-2** del target. El mar 26-ene (D-1) sigue **fuera** de los 95 días — su protocolo es una
   decisión abierta (`DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md` §E-5).
2. **Se acabó el colchón barato.** Con la regla de no recortar, **cada día perdido a partir de ahora
   empuja D95 más adentro de la ventana** (26 → 27 → 28-ene) y obliga a mover el target del examen o a
   activar el plan B de fecha (feb-mar, mismo eligibility period). Ya no hay "fusión" que absorba el golpe.
3. **ENCAPS: 100 → 99 días.** Único bloque no alargado (§10.3, nota 2). Decidir: dejarlo en 99 o
   extenderlo al **lun 1-feb-2027** para recuperar la sesión. Requiere re-sembrar Supabase.
4. **Los niveles UWorld de 9 días cambiaron de N3↔N2** (el viernes de cada sistema cae sobre otro
   subtema): **Heme/Onc se queda sin viernes de nivel 3** y **Respiratorio gana uno**. Reparto v5.8:
   N3 en **D12 (25-sep, Cardio) · D22 (9-oct, Resp) · D27 (16-oct, Renal) · D67 (11-dic, Repro)**;
   N1 en los viernes de sistema recién abierto **D7, D37, D42, D52, D57**. Totales: N3×4 y N2×41
   (antes N3×5 y N2×40). **Ningún tema cambió: solo el formato del bloque de las 11:00 de esos días.**
5. **NBME 29 (vie 18-dic) ahora PARTE el bloque MSK** en vez de cerrarlo: D70-D71 antes del hito y
   **D73 (lun 21-dic)** después. Llegar al hito con artritis + LES/vasculitis validados.
6. **NBME 30 (mié 30-dic) queda ENTRE los dos días dobles de Bioquímica**: D78 el mar 29-dic y
   **D80 el lun 4-ene-2027** (jue 31-dic y vie 1-ene son skip). El "cierre de Fase A" ya no termina en
   2026: la Fase A muere el **4-ene**.
7. **Derma se movió +2 días, no +1** (mié 9-sep → vie 11-sep) por la inversión de paridad con Research.
   Verificar en el Calendar que la alternancia RESEARCH↔DERMA de las 13:30 quedó con la nueva paridad.
8. **Los D# de los 12 overlays del Calendar quedan desfasados** hasta que se editen los títulos: las
   FECHAS son correctas, el número de día no.

---

## 11 · Corrimiento v5.9 (10-sep-2026) — D1 pasa de jue 10-sep a VIERNES 11-SEP-2026

> 🕘 **HISTÓRICO.** Superado por el corrimiento v5.10 del 12-sep (§12): las fechas, los D# y los conteos de esta sección son los de ANTES de ese corrimiento y se conservan como registro. En particular, el "D1 = UWSA1 el vie 11-sep" de §11.3 ya no rige: ese viernes pasó sin estudiar y el UWSA1 se movió al lun 14-sep.
### 11.1 Por qué

**El 10 de septiembre tampoco se estudió.** Regla determinista del sistema: cada día sin estudiar =
**+1 día hábil** para todos los planes → el D1 del régimen pasa de **jue 10-sep-2026** a
**vie 11-sep-2026** (v5.9). Es el **octavo corrimiento** del régimen y el **noveno día hábil de colchón
consumido** desde el 31-ago (31-ago · 1 · 2 · 3 · 4 · 7 · 8 · 9 · 10-sep).

### 11.2 La regla que manda: no se fusiona ni se recorta nada

> ***"ni un subtema ni tema dejar por detrás"*** — Joseph, 9-sep-2026, reconfirmado el 10-sep como
> **"reorganización total"**.

Es la misma regla de la v5.8, ya permanente. De la **v5.3 a la v5.7** el desfase se pagaba **fusionando
días de contenido** del cierre de Fase A para que los 12 hitos NBME/UWSA no cambiaran de fecha
(97 → 95 días, 4 días de bioquímica/farmacología comprimidos en 2 días dobles — §9.2). **Desde la v5.8
eso está derogado, y en la v5.9 se vuelve a aplicar la regla nueva:**

| | Hasta v5.7 | **Desde v5.8, aplicado otra vez en v5.9** |
|---|---|---|
| Qué se hace con el desfase | se **comprime contenido** (fusión de días) | se **alarga el plan por la cola** |
| Temario | perdía granularidad (días dobles) | **1:1, intacto** |
| Fecha final del USMLE | fija (vie 22-ene-2027) | **se mueve** (v5.8 lun 25-ene → v5.9 **mar 26-ene**) |
| Hitos NBME/UWSA | fijos | **fijos** (no cambia) |
| Franjas, metas, ventana de examen | fijas | **fijas** (no cambia) |

**Prueba dura de que nada se perdió** (verificada con `node`, no estimada): el multiconjunto de
`(system, tier, sub, bbCh, bbVid, uw, mat, matType, palm)` de `DIAS` en `usmleStep1Daily.ts` es
**idéntico** al de la v5.8 — **0 filas perdidas y 0 filas nuevas en las 95** — y el total de preguntas
objetivo sigue siendo **5580Q** (3340 de banco diario + 2240 de simulacros). El remapeo D#(v5.8) →
D#(v5.9) es **biyectivo 95/95**, y solo 23 días cambian de número.

### 11.3 🔴 El UWSA1 pasa a ser el D1 y el contenido arranca el lun 14-sep

Los 12 hitos están **anclados por fecha**, no por posición. El **vie 11-sep** era la fecha del **UWSA1**;
al arrancar el plan ese mismo día, el simulacro no se mueve — se mueve el contenido:

| | v5.8 | **v5.9** |
|---|---|---|
| D1 | jue 10-sep · Fundamentos (Pathoma 1-2) | **vie 11-sep · 🎯 UWSA1 (160Q, baseline)** |
| D2 | vie 11-sep · 🎯 UWSA1 | **lun 14-sep · Fundamentos (Pathoma 1-2)** |
| D3 | lun 14-sep · Fundamentos (Pathoma 3) | mar 15-sep · Fundamentos (Pathoma 3) |
| S1 (semana del 7-sep) | 2 días (D1 contenido + D2 hito) | **1 solo día, y es el simulacro** |

**Esto es correcto y esperado; no hay que "arreglarlo" moviendo el hito.** Palmerton prescribe
exactamente esto: el baseline se mide **antes** de estudiar nada. El único efecto real es cosmético
(S1 pasa a ser una semana de un día) más el hecho de que el temario empieza en lunes, con la semana
completa por delante.

### 11.4 Tabla plan → D1 / Dfin / nº de días · ANTES (v5.8) y AHORA (v5.9)

Los 11 planes (12 filas: Research va en 2 ciclos). Todas las fechas parseadas del bloque `DAILY_META`
de cada `.ts` con `node` (v5.8 desde `git show HEAD`; v5.9 desde el árbol de trabajo). ENCAPS leído de
Supabase con `execute_sql` **y** contrastado contra el SQL generado.

| Plan | D1 v5.8 | Dfin v5.8 | Nº v5.8 | **D1 v5.9** | **Dfin v5.9** | **Nº v5.9** |
|---|---|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | jue 10-sep-2026 | lun 25-ene-2027 | 95 | **vie 11-sep-2026** | **mar 26-ene-2027** | **95** |
| 🇵🇪 ENCAPS mantenimiento | jue 10-sep-2026 | vie 29-ene-2027 | 99 | **vie 11-sep-2026** | vie 29-ene-2027 | **98** ⬇1 |
| 🇪🇸 MIR 1ª vuelta | jue 10-sep-2026 | mar 29-dic-2026 | 78 | **vie 11-sep-2026** | **mié 30-dic-2026** | 78 |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo)* |
| 🔬 Research ciclo 1 | jue 10-sep-2026 | vie 5-feb-2027 | 42 | **lun 14-sep-2026** | **mar 9-feb-2027** | 42 |
| 🔬 Research ciclo 2 | mar 9-feb-2027 | jue 12-ago-2027 | 67 | **jue 11-feb-2027** | **lun 16-ago-2027** | 67 |
| 🩺 Derma élite | vie 11-sep-2026 | vie 26-mar-2027 | 70 | vie 11-sep-2026 | vie 26-mar-2027 | 70 *(sin cambio)* |
| ⚖️ LIVIANO Academia | jue 10-sep-2026 | lun 18-ene-2027 | 90 | **vie 11-sep-2026** | **mar 19-ene-2027** | 90 |
| 💼 Business formato L | jue 10-sep-2026 | vie 8-ene-2027 | 121 | **vie 11-sep-2026** | **lun 11-ene-2027** | **123** ⬆2 |
| 💰 AURUM | jue 10-sep-2026 | lun 15-mar-2027 | 130 | **vie 11-sep-2026** | **mar 16-mar-2027** | 130 |
| 🧠 SYNAPSE | jue 10-sep-2026 | lun 30-nov-2026 | 82 | **vie 11-sep-2026** | **mar 1-dic-2026** | 82 |
| 🛠 Vibecoding 04:15 | jue 10-sep-2026 | mié 2-dic-2026 | 60 | **vie 11-sep-2026** | **jue 3-dic-2026** | 60 |

**Cuatro planes NO se movieron +1 día como el resto — leerlo antes de asumir nada:**

1. **Derma élite no se movió en absoluto** (sigue en vie 11-sep → vie 26-mar, 70 sesiones). Research y
   Derma se alternan en la franja 13:30-14:15; en la v5.8 la paridad ya había empujado a Derma al
   vie 11-sep, y con el D1 del régimen ahora en esa misma fecha, a Derma le toca quedarse donde estaba.
2. **Research se movió +2 días de calendario, no +1** (ciclo 1: jue 10-sep → **lun 14-sep**; ciclo 2:
   mar 9-feb → **jue 11-feb**), por la misma inversión de paridad con Derma. Los totales (42 y 67
   átomos) y la pausa de enero por Step 1 no cambian.
3. **ENCAPS pierde otro día (99 → 98).** Es el único bloque que **no se alarga**: conserva su cierre en
   **vie 29-ene-2027** porque esa fecha está alineada al examen ENCAPS 2027-I, no al Step 1. Como la
   hora ENCAPS es **banqueo puro** (no temario secuencial), no desaparece ningún tema: desaparece una
   sesión de banco — y ya van **2 acumuladas** desde los 100 días originales. → **decisión pendiente de
   Joseph** (§11.5).
4. **Business gana 2 días (121 → 123).** Su generador inserta filas `DESCANSO` para sáb/dom/feriados; al
   arrancar en viernes, el plan cruza dos fines de semana más y las filas de trabajo siguen siendo
   **84** — solo suben las de descanso (37 → 39). No hay contenido nuevo ni perdido.

**Hitos USMLE: fecha idéntica, D# nuevo** — UWSA1 11-sep D2→**D1** · NBME 25 2-oct D17→**D16** ·
NBME 26 23-oct D32→**D31** · NBME 27 13-nov D47→**D46** · NBME 28 4-dic D62→**D61** ·
NBME 29 18-dic D72→**D71** · NBME 30 30-dic D79→**D78** · UWSA2 8-ene D84→**D83** ·
NBME 31 15-ene D89→**D88** (GO/NO-GO) · NBME 32 18-ene D90→**D89** · NBME 33 20-ene D92→**D91** ·
Free 120 22-ene D94→**D93**. Los 12 overlays naranjas del Google Calendar **no cambian de fecha**:
solo hay que actualizar el D# de su título.

### 11.5 Efectos colaterales de la v5.9 (y qué hacer)

1. 🔴 **D95 = mar 26-ene-2027 es la VÍSPERA del target de examen (mié 27-ene).** El plan y la semana de
   examen ya no solo se solapan: **no queda ningún día de descanso entre el último día de estudio y el
   examen**. Si Joseph mantiene el mié 27, el protocolo D-1 (Anki vencido, nada denso, dormir temprano)
   hay que meterlo DENTRO de D95, que hoy es "rapid review First Aid + Anki + 20Q flagged". **Moviendo
   el examen al jue 28 recupera 1 día libre; al vie 29, 2 días** — ambos dentro de la misma ventana
   25-29 ene, sin tocar el eligibility period. **Decisión de Joseph.**
2. **Se acabó el colchón por delante.** Con la regla de no recortar, **cada día perdido a partir de
   ahora empuja D95 hacia el final de la ventana** (27 → 28 → 29-ene, y después ya no hay margen) y
   obliga a mover el target del examen o a activar el plan B de fecha (feb-mar, mismo eligibility
   period). Ya no hay "fusión" que absorba el golpe: el siguiente día perdido cuesta día de examen.
3. **ENCAPS: 99 → 98 días** (2 sesiones perdidas desde los 100 originales). Único bloque no alargado
   (§11.4, nota 3). Decidir: dejarlo en 98, o extenderlo al **lun 1-feb-2027** (recupera 1) o al
   **mar 2-feb-2027** (recupera las 2). Requiere re-sembrar Supabase con backup previo.
4. **Los niveles UWorld de 10 días cambiaron (5 pares N2↔N3)**: al correr todo +1 día hábil, el viernes
   de cada sistema cae sobre otro subtema. **GI, Endo y Heme/Onc estrenan su viernes de nivel 3 y Repro
   lo pierde.** Reparto v5.9: N3 en **D11 (25-sep, Cardio) · D21 (9-oct, Resp) · D26 (16-oct, Renal) ·
   D36 (30-oct, GI) · D41 (6-nov, Endo) · D56 (27-nov, Heme/Onc)**; N1 en los viernes de sistema recién
   abierto **D6 (18-sep), D51 (20-nov) y D66 (11-dic)**. Totales: **N3×6 y N2×39** (antes N3×4 y N2×41).
   **Ningún tema cambió: solo el formato del bloque de las 11:00 de esos días.**
5. **NBME 29 (vie 18-dic) sigue PARTIENDO el bloque MSK**: D70 antes del hito y **D72 · D73**
   (lun 21-dic y mar 22-dic) después. Llegar al hito con artritis validada.
6. **NBME 30 (mié 30-dic) ya NO queda entre los dos días dobles de Bioquímica**: ahora va **delante de
   los dos**, que quedan consecutivos en **D79 (lun 4-ene)** y **D80 (mar 5-ene)**. La Fase A muere el
   **5-ene**, un día más tarde que en la v5.8.
7. **La semana S1 tiene un solo día** (D1 = UWSA1, vie 11-sep) y **S21 tiene dos** (D94 lun 25-ene y
   D95 mar 26-ene). El contenido real arranca el **lun 14-sep**, con la semana completa por delante.
8. **Los D# de los 12 overlays del Calendar quedan desfasados** hasta que se editen los títulos: las
   FECHAS son correctas, el número de día no.

### 11.6 Qué se documentó en esta pasada

Docs llevados a v5.9 (D# y fechas remapeados con script verificado y contrastados contra el `.ts` con
un validador que comprueba **cada par D#↔fecha↔día de la semana**: 218 pares verificados, 0
incoherencias fuera de los bloques históricos):
`DATA/USMLE/README.md` · `DATA/USMLE/CALENDARIO_5_MESES.md` (semana a semana S1-S21 + día a día D1-D95
regenerados desde `DIAS`; la tabla de 95 filas se comprobó campo a campo contra el `.ts`: 0 errores,
0 sábados/domingos, 0 feriados) · `DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md` (solo remapeo de
D#/fechas y de los niveles de los viernes — **las 8 decisiones abiertas de §E se conservan intactas**) ·
`DATA/USMLE/RECURSOS_META_2026.md` · `DATA/USMLE/PALMERTON_POR_MATERIA.md` (4.600+ líneas: 253
referencias D# y 131 fechas distintas remapeadas con script + 21 correcciones contextuales de nivel
hechas a mano) · y este fichero (cabecera, §1, §2, §5, §10 marcado como histórico, §11).

---

## 12 · Corrimiento v5.10 (12-sep-2026) — D1 pasa de vie 11-sep a LUNES 14-SEP-2026

### 12.1 Por qué

**El 11 de septiembre tampoco se estudió.** Regla determinista del sistema: cada día sin estudiar =
**+1 día hábil** para todos los planes → el D1 del régimen pasa de **vie 11-sep-2026** a
**lun 14-sep-2026** (v5.10). Es el **noveno corrimiento** del régimen y el **décimo día hábil de colchón
consumido** desde el 31-ago (31-ago · 1 · 2 · 3 · 4 · 7 · 8 · 9 · 10 · 11-sep).

Lo que **NO** se movió, por diseño:
- Las **franjas horarias** (04:15 vibecoding · 05:00 Anki AM · 07:15-12:00 Step 1 · 12:30 SYNAPSE ·
  13:30 Research↔Derma · 14:15 AURUM · 15:15 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval).
- Las **metas** de cada frente (Step 1 PASS · ENCAPS ≥17 · MIR Top 50 · publicaciones).
- La **ventana de examen** del Step 1 (25-29 ene-2027; `examenVentana` no cambia) y el examen ENCAPS
  2027-I (fines de marzo).
- **11 de los 12 hitos** UWSA/NBME/Free 120: siguen en sus fechas; solo cambia su D#.
- El **MIR mantenimiento** (4-ene → 31-mar-2027): fechas fijas, no se corre.
- **Research ciclos 1 y 2**: ya estaban en el lun 14-sep (v5.9), no se mueven.

### 12.2 La regla que manda: no se fusiona ni se recorta nada

> ***"ni un subtema ni tema dejar por detrás"*** — Joseph, 9-sep-2026, permanente desde la v5.8.

De la **v5.3 a la v5.7** el desfase se pagaba **fusionando días de contenido** del cierre de Fase A
(97 → 95 días, 4 días de bioquímica/farmacología comprimidos en 2 días dobles — §9.2). **Desde la v5.8
eso está derogado y en la v5.10 se aplica por tercera vez la regla nueva:**

| | Hasta v5.7 | **Desde v5.8 (v5.8 · v5.9 · v5.10)** |
|---|---|---|
| Qué se hace con el desfase | se **comprime contenido** (fusión de días) | se **alarga el plan por la cola** |
| Temario | perdía granularidad (días dobles) | **1:1, intacto** |
| Fecha final del USMLE | fija (vie 22-ene-2027) | **se mueve** (v5.8 lun 25-ene → v5.9 mar 26-ene → v5.10 **mié 27-ene**) |
| Hitos NBME/UWSA | fijos | **fijos** — salvo el UWSA1, cuya fecha ya había pasado (§12.3) |
| Franjas, metas, ventana de examen | fijas | **fijas**; el **target** dentro de la ventana sí se mueve (§12.4) |

**Prueba dura de que nada se perdió** (verificada con `node`, no estimada): el multiconjunto
`(system, sub)` de `DIAS` en `usmleStep1Daily.ts` es **idéntico** al de la v5.9 — **0 filas perdidas y
0 filas nuevas en las 95** — y el total de preguntas objetivo sigue siendo **5580Q** (3340 de banco diario
+ 2240 de simulacros). El remapeo D#(v5.9) → D#(v5.10) es **biyectivo 95/95**: los 95 días cambian de
fecha (+1 hábil) y 23 cambian además de número (los que rodean a cada hito).

### 12.3 🔴 El UWSA1 se mueve al lun 14-sep = D1 (primer hito que cambia de fecha)

Los 12 hitos están **anclados por fecha**. Hasta la v5.9 ningún corrimiento había alcanzado la fecha de
un hito; en la v5.10 el vie 11-sep (fecha del UWSA1) **ya pasó sin estudiar**, así que el hito se re-ancla
al nuevo D1. **Regla que nace aquí: un hito cuya fecha ya pasó se mueve al nuevo D1; los que aún no
llegaron, no.** El baseline sigue rindiéndose el primer día del plan, como prescribe Palmerton.

| | v5.9 | **v5.10** |
|---|---|---|
| D1 | vie 11-sep · 🎯 UWSA1 (160Q, baseline) | **lun 14-sep · 🎯 UWSA1 (160Q, baseline)** |
| D2 | lun 14-sep · Fundamentos (Pathoma 1-2) | **mar 15-sep · Fundamentos (Pathoma 1-2)** |
| D6 (abre Cardio) | vie 18-sep | **lun 21-sep** |
| S1 | 1 solo día (vie 11-sep, el simulacro) | **5 días completos** (lun hito + mar-vie contenido) |
| Overlay del UWSA1 en Google Calendar | vie 11-sep | **hay que MOVERLO al lun 14-sep** (los otros 11 overlays solo cambian de D# en el título) |

### 12.4 🔴 Target de examen → VIE 29-ENE-2027 (el plan termina el mié 27; jue 28 descanso)

Con D95 = **mié 27-ene**, el plan termina exactamente en el que era el target de examen. **Decisión tomada
el 12-sep**: el target pasa al **vie 29-ene-2027**, último día de la ventana 25-29 ya prevista (la ventana
no cambia; `DAILY_META.examenVentana` sigue siendo `2027-01-25 → 2027-01-29`), y el **jue 28-ene queda como
día de descanso pre-examen** (protocolo D-1 de Palmerton: solo Anki vencido, nada denso, empacar, dormir
temprano). El D-2 es el propio D95 (rapid review First Aid + Anki + 20Q flagged). Prometric: **agendar el
vie 29-ene**, no el mié 27.

> ⚠ **YA NO QUEDA MARGEN.** Los tres corrimientos sin recorte (v5.8 → v5.9 → v5.10) consumieron el
> colchón entero: lun 25 → mar 26 → mié 27-ene, y el target ya está en el último día de la ventana.
> **El próximo corrimiento obliga a decidir entre (a) recortar temario — derogar la regla de §12.2 — o
> (b) rendir fuera de la ventana 25-29 ene** (plan B: feb-mar 2027, mismo eligibility period, sin costo si
> se aplicó ene-mar). No hay una tercera opción "gratis".

### 12.5 Tabla plan → D1 / Dfin / nº de días · ANTES (v5.9) y AHORA (v5.10)

Los 11 planes (12 filas: Research va en 2 ciclos). Todas las fechas parseadas del bloque `DAILY_META`
de cada `.ts` con `node` el 12-sep (v5.9 desde `git show HEAD`; v5.10 desde el árbol de trabajo). ENCAPS
leído de Supabase con `execute_sql` **y** contrastado contra el SQL generado.

| Plan | D1 v5.9 | Dfin v5.9 | Nº v5.9 | **D1 v5.10** | **Dfin v5.10** | **Nº v5.10** |
|---|---|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | vie 11-sep-2026 | mar 26-ene-2027 | 95 | **lun 14-sep-2026** | **mié 27-ene-2027** | **95** |
| 🇵🇪 ENCAPS mantenimiento | vie 11-sep-2026 | vie 29-ene-2027 | 98 | **lun 14-sep-2026** | vie 29-ene-2027 | **97** ⬇1 |
| 🇪🇸 MIR 1ª vuelta | vie 11-sep-2026 | mié 30-dic-2026 | 78 | **lun 14-sep-2026** | **lun 4-ene-2027** | 78 |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo; reducidos 17 → 18, hasta el 27-ene)* |
| 🔬 Research ciclo 1 | lun 14-sep-2026 | mar 9-feb-2027 | 42 | lun 14-sep-2026 | mar 9-feb-2027 | 42 *(sin cambio)* |
| 🔬 Research ciclo 2 | jue 11-feb-2027 | lun 16-ago-2027 | 67 | jue 11-feb-2027 | lun 16-ago-2027 | 67 *(sin cambio)* |
| 🩺 Derma élite | vie 11-sep-2026 | vie 26-mar-2027 | 70 | **mar 15-sep-2026** | **mar 30-mar-2027** | 70 |
| ⚖️ LIVIANO Academia | vie 11-sep-2026 | mar 19-ene-2027 | 90 | **lun 14-sep-2026** | **mié 20-ene-2027** | 90 |
| 💼 Business formato L | vie 11-sep-2026 | lun 11-ene-2027 | 123 | **lun 14-sep-2026** | **mar 12-ene-2027** | **121** ⬇2 |
| 💰 AURUM | vie 11-sep-2026 | mar 16-mar-2027 | 130 | **lun 14-sep-2026** | **mié 17-mar-2027** | 130 |
| 🧠 SYNAPSE | vie 11-sep-2026 | mar 1-dic-2026 | 82 | **lun 14-sep-2026** | **jue 3-dic-2026** | **81** ⬇1 |
| 🛠 Vibecoding 04:15 | vie 11-sep-2026 | jue 3-dic-2026 | 60 | **lun 14-sep-2026** | **vie 4-dic-2026** | 60 |

**Cinco planes NO se movieron +1 día como el resto — leerlo antes de asumir nada:**

1. **Research ciclos 1 y 2 no se mueven en absoluto** (42 y 67 átomos; `researchDailyPlan.ts` cambia solo
   la línea de fecha de generación vs HEAD): ya estaban en el lun 14-sep desde la v5.9. Los avisos del
   generador "X-6 / X-5 no caben antes de la pausa → después del 29-ene" son los mismos que producía la
   v5.9. Hitos editoriales sin cambio (M1 vie 18-sep · C-6 SUBMIT vie 16-oct · T-8 SUBMIT lun 23-nov ·
   CR-8 mié 9-dic · CR-9 SUBMIT lun 1-feb · R10 PROSPERO mar 23-feb · R43 SUBMIT lun 5-jul).
2. **Derma se mueve +2 días de calendario, no +1** (vie 11-sep → **mar 15-sep**; cierre vie 26-mar →
   **mar 30-mar**): la paridad interdiaria Research↔Derma está anclada al 10-jun y el lun 14-sep es día
   Research. Verificar en el Calendar la alternancia de las 13:30.
3. **ENCAPS pierde otro día (98 → 97).** Único bloque que **no se alarga**: conserva su cierre en
   **vie 29-ene-2027** (alineado al examen ENCAPS 2027-I). Como es **banqueo puro**, no desaparece ningún
   tema: desaparece una sesión de banco — ya van **3 acumuladas** (100 → 99 → 98 → 97; mini-sims de
   viernes 19 → 18). Backup `study_schedule_bk_0912` (bk_0910/0909/0908 intactas). → decisión Joseph (§12.6).
4. **Business baja de 123 a 121 filas (84 trabajo + 37 DESCANSO; antes 39).** El remap deja 116 filas
   (no aplica feriados) y `gen_business_plan.py` las reconstruye a 121 aplicando 25-dic / 31-dic / 1-ene
   como DESCANSO: **la fuente de verdad es el `.py`**. Las 84 filas de trabajo no cambian.
5. **SYNAPSE baja de 82 a 81 días.** Los 12 días "R" de la v5.9 incluían el sáb 12-sep (sin SHIP); ahora
   hay **11 sábados PC = 11 SHIP (19-sep … 28-nov)**. El SHIP 12 (sáb 5-dic) queda fuera del plan SYNAPSE
   en ambas versiones (lo manda `VIBE_PROYECTOS`, cuyos 12 SHIP 19-sep … 5-dic no cambian).

**Hitos USMLE: 11 fechas idénticas, D# nuevo; UWSA1 cambia de fecha** — UWSA1 vie 11-sep → **lun 14-sep**,
sigue **D1** · NBME 25 2-oct D16→**D15** · NBME 26 23-oct D31→**D30** · NBME 27 13-nov D46→**D45** ·
NBME 28 4-dic D61→**D60** · NBME 29 18-dic D71→**D70** · NBME 30 30-dic D78→**D77** · UWSA2 8-ene
D83→**D82** · NBME 31 15-ene D88→**D87** (GO/NO-GO) · NBME 32 18-ene D89→**D88** · NBME 33 20-ene
D91→**D90** · Free 120 22-ene D93→**D92**.

### 12.6 Efectos colaterales de la v5.10 (y qué hacer)

1. 🔴 **Margen agotado** (§12.4): D95 = mié 27-ene, target vie 29-ene, jue 28 único descanso. El siguiente
   día perdido ya no se absorbe: **recortar temario o rendir fuera de la ventana** — decisión de Joseph
   en el momento en que ocurra, no después.
2. 🔴 **El overlay del UWSA1 en Google Calendar cambia de FECHA** (vie 11-sep → lun 14-sep), no solo de D#.
   Los otros 11 overlays naranjas conservan su fecha; hay que actualizar el D# de sus títulos (D15, D30,
   D45, D60, D70, D77, D82, D87, D88, D90, D92). **A VERIFICAR (12-sep)**: no se ha comprobado el Calendar
   en esta pasada.
3. **ENCAPS: 98 → 97 días** (3 sesiones perdidas desde los 100 originales). Decidir: dejarlo en 97, o
   extenderlo al **lun 1-feb** (recupera 1), **mar 2-feb** (2) o **mié 3-feb** (3). Requiere re-sembrar
   Supabase con backup previo.
4. **13 días cambian de nivel UWorld** (6 pares N2↔N3 + Neuro): al correr todo +1 día hábil, el viernes
   de cada sistema cae sobre otro subtema. **Neuro estrena su viernes de nivel 3.** Reparto v5.10: N3 en
   **D10 (25-sep, Cardio taquiarritmias) · D20 (9-oct, Resp restrictivas) · D25 (16-oct, Renal
   electrolitos) · D35 (30-oct, GI hígado II) · D40 (6-nov, Endo DM) · D50 (20-nov, Neuro EM/meningitis/
   tumores) · D55 (27-nov, Heme leucemias)**; N1 en los viernes de sistema recién abierto **D5 (18-sep,
   Inmuno) y D65 (11-dic, Repro)**. Totales: **N3×7 y N2×38** (antes N3×6 y N2×39). **Ningún tema cambió:
   solo el formato del bloque de las 11:00 de esos días.** Viernes del plan: 17 (8 hitos); el UWSA1 ya no
   ocupa un viernes.
5. **NBME 25 (vie 2-oct, D15) ahora PARTE el bloque Cardio**: D6-D14 antes del hito y **D16 (lun 5-oct,
   valvulopatías/endocarditis/miocardiopatías/congénitas)** después. Llegar al hito con hemodinámica,
   ECG, arritmias, SCA e IC validados.
6. **NBME 29 (vie 18-dic, D70) ya NO parte el bloque MSK**: D71-D73 (21-23 dic) van íntegros detrás.
   **NBME 30 (mié 30-dic, D77)** va delante de Biostats (D78, lun 4-ene) y de los dos días dobles de
   Bioquímica (D79 mar 5-ene · D80 mié 6-ene). La Fase A muere el **6-ene**.
7. **Fase B queda en 7 días (D81 jue 7-ene → D87 NBME 31 vie 15-ene) y Fase C en 8 (D88-D95)**: UWSA2 =
   D82; D89 (mar 19-ene), D91 (jue 21-ene) y D93 (lun 25-ene) siguen siendo días de banco alojados en
   el sprint (incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2); D94 mar 26-ene = repaso FA 6-10
   (40Q flagged) · D95 mié 27-ene = rapid review (20Q).
8. **Semanas: 20** (S1 = 14-18 sep completa, 5 días; S15 = 4 días por el 25-dic; S16 = 3 días por el
   31-dic y el 1-ene; S20 = 25-27 ene, 3 días). Antes eran 21 con una S1 de un solo día.
9. `update_diainicio.js` avisa **"SIN SISTEMA EN DIAS: Pharmacology (transversal)"** — preexistente (alias
   sin sistema propio en `DIAS` desde la fusión de la v5.7), no es regresión.
10. AURUM avisa **9 variantes LIVIANO fuera de viernes** por la deriva post-25-dic — comportamiento
    preexistente del generador, **A VERIFICAR (12-sep)** si conviene re-slotearlas.
11. **MIR mantenimiento**: los días en modo reducido pasan de 17 a **18** (4-ene → 27-ene) porque el Step 1
    ahora termina el 27; el bloque 15:15 no queda vacío.

### 12.7 Pipeline ejecutado, en orden

> **Trazabilidad:** los comandos son el pipeline canónico de §8.7 instanciado con la fecha `2026-09-14`;
> el detalle de ejecución lo reportó el agente de datos. Lo **verificado de forma independiente** en esta
> pasada (parseo con `node` de cada `.ts` del árbol de trabajo + `execute_sql` sobre `study_schedule` +
> lectura del SQL generado) son los **resultados**: las fechas, los D#, los conteos de §12.5 y el multiconjunto
> `(system, sub)` del USMLE. El log exacto de los pasos 1-8 y 11 (`npx tsc --noEmit`) es **A VERIFICAR (12-sep)**.

1. `node DATA/_scripts/remap_inicio.js 2026-09-14` — re-fecha MIR, Derma, Business, LIVIANO y los demás
   bloques del remap (salta sáb+dom y los feriados 25-dic / 31-dic / 1-ene) + reslot LIVIANO.
2. `node DATA/_scripts/gen_research_plan.js 2026-09-14` — Research ciclos 1 y 2 (sin cambio de fechas).
3. `node DATA/_scripts/gen_liviano_plan.js 2026-09-14` — 90 días, 16 casos en VIERNES reales (18-sep → 15-ene).
4. `python DATA/_scripts/gen_business_plan.py 2026-09-14` — 121 filas (84 trabajo + 37 DESCANSO).
5. `node DATA/_scripts/gen_vibecoding_plan.js 2026-09-14` — **ANTES que SYNAPSE**: 60 días + 12 SHIP en sábados (19-sep → 5-dic).
6. `node DATA/_scripts/gen_synapse_plan.js 2026-09-14` — 81 días (14-sep → 3-dic).
7. `node DATA/_scripts/gen_aurum_plan.js 2026-09-14` — 130 días (14-sep → 17-mar-2027).
8. `node STUDY_HUB/_scrape/gen_mir_daily.js 2026-09-14 --check` — 78 días (14-sep → 4-ene-2027) + `mirMantenimiento.ts` (reducidos 18).
9. `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-14` → `execute_sql` contra
   `qacynpqdrorpuegsmtcy`, con backup previo **`study_schedule_bk_0912`**. Verificado el 12-sep: 97 filas,
   14-sep-2026 → 29-ene-2027, `dia` 1→97, 0 fines de semana, 0 feriados, 18 mini-sims.
10. USMLE con `gen_usmle_v5.js` (scratchpad) **v5.10**: 95 días, fases 80/87/95, 12 hitos anclados por
    FECHA en `SIMS` (UWSA1 re-anclado al lun 14-sep), array `POST_A` para los días no-hito, clasificación
    por `bbCh`. **Sin fusiones ni recortes** (multiconjunto idéntico a la v5.9).
11. `npx tsc --noEmit -p .` → 0 errores *(reportado por el agente de datos · **A VERIFICAR (12-sep)**)*.
12. Docs a v5.10: este fichero (cabecera, §1, §2, §4, §5, §11 marcado como histórico, §12),
    `DATA/USMLE/README.md`, `DATA/USMLE/CALENDARIO_5_MESES.md`, `DATA/USMLE/PALMERTON_POR_MATERIA.md`,
    `DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md`, `DATA/USMLE/RECURSOS_META_2026.md`,
    `DATA/USMLE/PALMERTON_METODO_COMPLETO.md` §12 + D# (y la fecha del UWSA1) de los 12 overlays del Calendar.

### 12.8 Qué se documentó en esta pasada

Docs llevados a v5.10 con D# y fechas remapeados por script (mapa D#/fecha v5.9 → v5.10 derivado del
`DIAS` de HEAD vs árbol de trabajo) y contrastados contra el `.ts` con un validador que comprueba **cada
par D# ↔ fecha ↔ día de la semana ↔ nivel** citado en los textos:
`DATA/USMLE/README.md` (reescrito: fases 80/7/8, tabla sistema→días, tabla v5.9 vs v5.10, 12 hitos,
niveles N1×28 · N2×38 · N3×7 · N4×4 · N5×18) · `DATA/USMLE/CALENDARIO_5_MESES.md` (semana a semana
S1-S20 + niveles por semana + día a día D1-D95 regenerados desde `DIAS`; reglas de reprogramación con la
excepción del UWSA1 y el margen agotado) · `DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md` (remapeo + la
decisión del target vie 29-ene en §E-5; las 8 decisiones abiertas siguen abiertas) ·
`DATA/USMLE/RECURSOS_META_2026.md` · `DATA/USMLE/PALMERTON_POR_MATERIA.md` (remapeo con script + correcciones
contextuales de nivel: los 7 viernes N3 nuevos, Cardio partido por el NBME 25, MSK íntegro, §F test day) ·
`DATA/USMLE/PALMERTON_METODO_COMPLETO.md` §12 (tabla 12.3 regenerada, hitos 12.4, fases B-C 12.5 con el
jue 28 de descanso y el vie 29 de examen) · y este fichero.


## 13 · Segunda capa "cero puntos ciegos" (12-13 sep-2026) — 13 agentes sobre `gaps_v3b_*.json` (65 puntos ciegos)

> **Base:** commit `16c1c28` (v5.10 limpio) → `a884de4` (wip de los primeros 11 agentes: 145 ficheros, +48.642/−2.007) →
> árbol de trabajo con `mir-pool-clasificar`, `derma-ui` e integración (17 ficheros modificados + 8 nuevos en `DATA/MIR/pool/`).
> Fuente de esta sección: los 13 informes estructurados (`hecho / ficheros / gaps_cerrados / pendiente_usuario / notas`) leídos
> íntegros por el integrador el 13-sep-2026. **Régimen v5.10 intacto:** ni franjas, ni metas, ni fechas de examen, ni un solo
> tema o subtema cambió (comprobado con `node` sobre cada `.ts` tras regenerar todo: mismas fechas, mismos multiconjuntos).
> **Sin `gaps_v3b_usmle*.json`:** el crítico USMLE auditó las 10 divergencias abiertas de `PALMERTON_METODO_COMPLETO.md` §12.6.

### 13.1 Tabla por sección — gaps hechos / parciales / pendientes de Joseph

Leyenda: **✅** hecho · **◐** parcial (qué falta) · **⏳** pendiente de Joseph (decisión, sesión logueada o acción fuera del repo) · **—** descartado (motivo).

| Sección (agente) | ✅ Hechos | ◐ Parciales | ⏳ Pendientes de Joseph | — Descartados |
|---|---|---|---|---|
| **USMLE · crítico de completitud** (solo lectura, §1-§11 + §12.6) | §12.6-10 (día parcial = PROTOCOLO_MODO_MINIMO); §12.6-2/-5/-7 cerrados después por `usmle-palmerton-2` | §12.6-5: taper/D-1 en código y docs, pero el Calendar del jue 28 y vie 29-ene sigue con las 6 series USMLE + MIR/ENCAPS/GYM y sin overlay | §12.6-1 (20Q permanente) · -3 (GO sin UWSA2) · -4 (Free 120 Prometric + maratón) · -6 (eval 18:00→12:00) · -8 (UWSA1 <40 %) · -9 (ítems experimentales) + 31 hallazgos (#1-#31: series 07:15/11:00/18:00 del Calendar desactualizadas desde el 27-ago, bug `diaPrevio` post-hito, gate sin mecánica de 2.º fallo, regla del tercio, micro-destrezas, respuestas cambiadas, NBME por bloque/sistema, Day-After, mazo Pharm aparte, config Anki §4.2, `gen_usmle_v5.js` solo en scratchpad…) | no existe `gaps_v3b_usmle` (auditó §12.6) |
| **USMLE · Palmerton implementables** (`usmle-palmerton-2`) | mir v3b #9 (puente MIR: chip "MIR precedió", `sysTag`/`sysFilteredQuery`, MIR_DECK) · derma v3b #6 lado USMLE (D73 cuenta doble, `DERMA_STEP1_DIAS`) · §E-2 viernes N4 (flag semana 11 → D55) · §E-5 taper D94/D95 + D-1 jue 28 + test day (`USMLE_TAPER`) · §E-7 burnout como REGLA (`gateHito` 'ALERTA BURNOUT' + banner) | — | §E-1 · §E-3 · §E-4 · §E-6 · §E-8 (se decide el lun 14-sep con el UWSA1 real) · MIR_DECK epidemiologia/bioetica/dermatologia A VERIFICAR con AnkiConnect · tag `sys::` a mano hasta que APEX lo ponga | — |
| **ENCAPS · app y % ciego** (`encaps-app`) | [3] cierre de sesión en la app (`encapsProgressSync.ts`, fórmula del script, `study_progress` fuente `app:cierre`, espejo `study_sim_scores`, localStorage `jmd-encaps-cierres`) + Cockpit (% ciego por código, tendencia a 85 %, temas calientes) · [9] eval anclada con la regla REAL en la cola y HORARIO + `study_metrics.extra.horarios` corregido | [3] la parte `gen_encaps_semana.js --pull` (Supabase → registro) no existe | primer cierre real lun 14-sep 17:10 · nota /25 del vie 18-sep una sola vez · decidir la convergencia registro↔Supabase (`--pull`) · deploy Vercel | [1][2][4][5][6][7][8]: ya cubiertos (1.ª capa o `encaps-scripts`) |
| **ENCAPS · scripts, backups, pre-test** (`encaps-scripts`) | [7] DELETE filtrado por modo + backup `study_schedule_bk_<YYYYMMDD>` que aborta si existe + `overrides_acumulado.json` + verificación impresa · [8] pre-test de arranque 40Q (36/40 reales) lun 14 / mar 15-sep · [9] PROTOCOLO §1/§1-bis con la regla real · [4] rutina quincenal de señales DOCUMENTADA (§2-bis/§2-ter) | [8] 4 ítems nuevos (II-3 ×1, III-5 ×3) por la regla de no reutilizar ids de la semana | crear la rutina quincenal (scheduled-tasks) · resolver los 2 pre-tests y registrarlos con `--registrar --append` · vie 18-sep primer override · reponer stock V-2 / III-5 / II-3 / I-3 · decidir 40/40 reales | — |
| **Transversal** (`synapse-ia-vitals-rutina` 6-11) | [6] diario USMLE en el vault (plantilla plana v5.10 + Dashboard + parser YAML en `gen_revision_semanal.js`) · [7] burnout §6 como disparadores ÁMBAR/ROJO (PROTOCOLO, RUTINA, DOCTRINA, 🚗 VIAJE VUELTA) · [8] cafeína ≤11:00 + siesta ≤20' opcional · [9] progreso persistente (`plan_checks` + `studyProgressSync.ts` + Exportar/Importar en CockpitStatusBar) · [10] ANKI sáb/dom + EKER (los 4 eventos SYNAPSE los cerró `vibecoding`) | [11] (a) CORRER/CALISTENIA piden registro en VITALS; (b)(c) Tarea D documentada, código de VITALS no se toca | comprobar PROGRESO '☁ ok' en Vercel · activar Dataview en el vault · crear la 1.ª nota `05_DIARY/2026-09-14.md` · Tarea D en el chat de VITALS (MET A VERIFICAR) · UNTIL de 7 series y 9 series GYM/BAILE v5.6 | — |
| **SYNAPSE · vibecoding** (`vibecoding` 1-5) | [1] catálogo re-secuenciado por riesgo + `verificacion[]` + `[S<n>]` (deload S7 = 26-30 oct) · [2] journal `D:/synapse-journal` + `journal_hoy.js` + enlace 📓 · [3] `verify_vibecoding.js` + `_vibecoding_ship.json` + `VIBE_SHIP_LOG` (la métrica 7 de `gen_revision_semanal.js` ya lo lee: lo hizo `transversal`) · [4] freno 04:55 (regla + KPI 1ª review en `anki_telemetria.js` v2 + cuenta atrás) · [5] vibecoding S13-S20 (95 días = D#) + SYNAPSE F2 sem 13-19 hasta el vie 22-ene-2027 (131 días) | — | `gh repo create synapse-journal --private` · validar `anki_telemetria.js` con Anki abierto · página oficial CCA-F A VERIFICAR · RLS `datos_tesis` ya o en S6 · `git init` en D:/agente_estudio (opcional) · elegir sáb o dom para la revisión semanal | [6]-[11] (otros agentes) |
| **RESEARCH · plan** (`research-plan` 1-4, 10, 12) | [1] T-1 (ética/CEI) a d7 mié 30-sep con solicitud expedita + gates CEI en T-7/T-8 + etica.md con los 1.256/291/865/785/316 reales del xlsx · [2] CR-1/CR-2 a d15/d16 (22 y 26-oct) + regla "sin caso el 8-oct → fuente B" · [3] R9 (AMSTAR-2 de las 5 SR/MA, PMID verificados) antes de R6 · [10] `horas` reales en R17-R26 (62 h) + PROSPERO con margen · [12] gate de inglés + plan B 22-oct + X-2 revisa CR-6 · [5] **cerrado por el integrador** (remap bloque 4 → `gen_research_plan.js` + aserciones + `--check` de overlays) | [4] Actas y Anais leídos en vivo; JAAD Intl / IJD → 403 (abrir con Chrome) | confirmar el re-orden v5.10b · T-1: nº/fecha del CEI o solicitud el 30-sep · modelos de consentimiento/asentimiento · denominador de la prevalencia 39,8 % · dónde caen las 40-70 h/revisor de SR-1 · reglas MENTORES fila 2 y 6 · R9 rellenar AMSTAR-2 | [6][7][8][9][11] (`research-infra`) |
| **RESEARCH · infraestructura** (`research-infra`) | [6] `citation_verifier.py`/`docx_assembler.py` UTF-8 + CLI + `run_verifier.bat` probado · [7] 12 overlays 🔬 RESEARCH en el Calendar + `gen_research_calendar.js` (--check rc=0, 12/12 sincronizados el 13-sep) · [8] `research_entregables` (RLS + policy) + `researchEntregablesSync.ts` + Mesa editorial con histórico; RLS activado en `research_manuscripts`/`research_citations` · [5] cerrado por el integrador | [8] RUTA §9 debe marcarse "solo lectura, se regenera" (`mesaMarkdown()`) · [9] research-discovery v3 en el repo, NO desplegada · [11] export de-identificado (865 filas, gitignored) + DATOS_README; RLS/borrado de `datos_tesis` = decisión | secrets OPENALEX_KEY/NCBI_KEY + deploy v3 · DECISIÓN `datos_tesis` (opción A recomendada; comprobar la key de `bot_tesis.py`) · revisar el CSV de-id antes de OSF/Zenodo (T-7) · script exacto de rs/κ A VERIFICAR · desglose de los 100 ausentes | — |
| **Derma · datos** (`derma-data`) | [1] capa Palmerton (verificada) · [2] taper Step 1 d44-d49 por swap de contenido, plan 70→73, 0 átomos perdidos · [3] fichas cerebro (verificadas) · [5] presupuesto por banco + cursor "retoma en Q#" + cura pendiente · [6] `step1` en 8 átomos + `anclajeStep1` d12/d24 · [8] ciclo 2 d74-d103 (`gen_derma_ciclo2.js` → `dermaCiclo2.ts`, 36 casos a 3/sesión, 0 solapes con Research) · [9] ruta fellowship (existía) | [10] PLAN_ELITE §3/§13-§16 al ciclo real; recursos.md lo tocó `derma-ui` | fecha REAL del examen ENCAPS 2027-I → `DERMA_TAPER_ENCAPS_FECHA` · sección de First Aid para d12/d24 · decidir la sesión OPCIONAL del vie 29-ene (d49) · confirmar 3 casos/sesión desde d50 | [4] (sesión AccessDerma) · [7] (UI) |
| **Derma · UI** (`derma-ui`) | [5] "retoma en Q#" en el ColaItem + banco secundario + cura obligatoria DD Challenge tras fallo CCSN · [7] pestaña Cerebro con % ciego real (ledger), progreso A-X, hitos v5.10 leídos del plan, SPEC A-G como índice · [8] fallback automático al ciclo 2 | informe truncado en el encargo del integrador (13-sep): el detalle de [1][3][6][10] lado UI queda **A VERIFICAR (13-sep)** contra `DermaHub.tsx`/`DermaTodayPlan.tsx` (compilan: tsc 0) | — | — |
| **MIR · loop** (`mir-loop`) | [1] gate por tema (pre-test + quiz 8-10Q + ancla D-1 ≥80 %; caliente hasta 2 aciertos; ajuste obligatorio al 2.º fallo; anclas dinámicas) · [5] MIR_HITOS Top 50 + umbrales por fase 70/55→75/60 · [6] táctica −1/3 + `TimerQ` 77 s/Q + no cambiar · [10] `DELTA_ESPANA.md` (17 fuentes verificadas) + `gen_delta_espana.js` + `delta:true` en 11 días · [9] parte MIR (Pregunta oficial origen) | [7] espejo `mir_eval_log` hecho; falta bloque MIR en `gen_revision_semanal.js`/`vibecodingPlan.ts` + prueba con 2 dispositivos · [11] "APEX MIR directamente en Anki" como regla; preset FSRS/sub-decks/n8n manuales | probar el espejo desde el móvil · completar `DELTA_ESPANA.md` (403/404) · tablas oficiales netas–nº de orden + fecha MIR 2030 · Anki: preset APEX::MIR · flujo semanal del delta · confirmar "acumulado <50 % no cuenta como evento" | [2][3][4][8] (otros agentes; MIR_CALENDARIO sí se actualizó) |
| **MIR · pool oficial** (`mir-pool-descarga` + `mir-pool-clasificar`) | [2] paso 1 (5 cuadernos + plantillas DEFINITIVAS del portal FSE, 1.050 Q, 0 errores de parseo, contrastes con prensa) + paso 2 (clasificación LLM: 30 asignaturas ProMIR + 'Otras', 477 en plan, 0 capítulos a cero, muestra 10 % verificada 100 %/99 %) + paso 3 (`mirPreguntasOficiales.ts` 1,1 MB, `preguntasSinUsar`/`poolResumen`/`preguntasDeAsignatura`) + `POOL_USO.md` · [4] Tier C express: 12 jueves del mantenimiento con `capId` real y peso (`gen_mir_mantenimiento.js`, `MIR_MANT_TIER_C`) | [2] UI: solo el quiz 8-10Q pide ids al pool; pre-test/anclada/cierre/mini-MIR y el 2.º formulario Tier C son cableado de `MirTodayPlan.tsx` · [4] README §1 tabla de pesos de las 16 asignaturas fuera del plan + aviso "cobertura ~80 %" en D78 + 2.º EvalForm en MantenimientoView | clave de la 2025-208 (Ministerio 2 vs prensa 3) A VERIFICAR · decidir `.gitignore` para `DATA/MIR/pool/raw/*.pdf` (6,2 MB, "PROHIBIDA LA REPRODUCCIÓN") y los JSON del pool antes del commit · imágenes bajo demanda (`--con-imagenes`) · 2.ª fase: cruce con "preguntas MIR de este capítulo" de ProMIR | [1][3][5]-[11] (otros agentes) |

**Recuento (13 informes):** de los 65 puntos ciegos + las 10 divergencias §12.6, quedan **hechos** ~46, **parciales** 13 (todos con la parte
que falta nombrada arriba) y **pendientes de Joseph** las decisiones §E (5) + `datos_tesis` + las verificaciones con sesión logueada;
los "descartados" son solapes entre agentes (el punto lo cerró otro), no puntos abandonados. El detalle operativo de cada pendiente
está en `DATA/PENDIENTES_JOSEPH.md` (el consolidador reescribe sus bloques 🔴/🟠/🟡/🔵/⚪ con los `pendiente_usuario` de esta capa).

### 13.2 Qué corrigió el integrador (13-sep-2026)

- **`remap_inicio.js` v5.10b** (`DATA/_scripts/`): bloque 4 Research delega en `gen_research_plan.js <fecha>` (la pausa 4→29-ene,
  `RESEARCH_HITOS`, `finNucleo/pausa`, chips `chipsDyn` y el ciclo 2 viven en el generador; `slots()` no sabe de la pausa) y comprueba
  42 átomos · d41 ≥ 2027-02-01 · 9 hitos del ciclo 1 ⊂ `DIAS` · `gen_research_calendar.js --check` (aviso si un overlay 🔬 se desfasa);
  bloque 5 Derma con guard **73** (`nd[72]`) + aviso si d44-d49 salen de la ventana `taperStep1` + **5b** `gen_derma_ciclo2.js`;
  bloque 6 Business delega en **`gen_business_plan.py <fecha>`** (antes el remap reconstruía SIN feriados: 116 filas ≠ las 121 del
  generador → no era idempotente); USMLE avisa si D95 alcanza `descansoD1`/`examenTarget`; MIR avisa si D78 pisa el inicio del
  mantenimiento (`mirMantenimiento.ts`). Guards comprobados contra los `.ts`: USMLE 95 · MIR 78 · UNIDADES 5 · Research 42 · Derma 73 ·
  Business 84 trabajo · LIVIANO 90.
- **Idempotencia** (generadores con fecha de generación incrustada): `gen_research_plan.js`, `gen_derma_ciclo2.js` y
  `gen_mir_pool.js --emit` ya **no reescriben** el fichero cuando solo cambia la marca de fecha/timestamp (conservan la anterior).
  Verificado el 13-sep: `remap_inicio.js 2026-09-14` ×2 + `gen_liviano_plan.js` · `gen_vibecoding_plan.js` · `gen_synapse_plan.js` ·
  `gen_aurum_plan.js` · `gen_mir_daily.js 2026-09-14` + `--check` · `gen_mir_mantenimiento.js` · `gen_derma_ciclo2.js` ·
  `gen_mir_pool.js --emit` → **`git diff` vacío en todos los planes** (fechas, D# y contenido idénticos; Business 121 filas).
- **Supabase** (`qacynpqdrorpuegsmtcy`, verificado con `execute_sql` sobre `pg_class`/`pg_policies`/`information_schema`):
  `mir_eval_log` (26 col) · `plan_checks` (4) · `research_entregables` (9) con RLS ON + policy "Allow all" [ALL/true/true] (patrón
  `study_sim_scores`); RLS + "Allow all" en `research_manuscripts` y `research_citations`; `research_engine_state.sources_ok/last_error`;
  `study_metrics.extra.horarios._nota` = v5.10. Migraciones concatenadas al final de `src/lib/supabase-schema.sql` (con su origen) y el
  DDL de Research documentado en `DATA/RESEARCH/agentic/supabase_schema.sql` §11. `datos_tesis` sigue con RLS OFF (decisión de Joseph).
- **Compilación:** `npx tsc --noEmit -p .` → **0 errores** (los 14+ errores cruzados que reportaban los agentes durante la sesión
  —`dermaDailyPlan.ts`, `encapsPlan.ts` zona, `mirEvalSync.ts`, `MirHub.tsx` estilos— ya estaban resueltos en el árbol final) ·
  `npx expo export --platform web` → **0** (13-sep-2026: bundle web `index-06dab137….js` 6,5 MB · `dist/` está en .gitignore).

### 13.3 Pipeline de corrimiento v5.10b (sustituye al de §8.7 y §12.7)

1. `node DATA/_scripts/remap_inicio.js <fecha>` — USMLE (solo re-fecha) · MIR · UNIDADES · **Research vía `gen_research_plan.js`**
   (+ aserciones + `gen_research_calendar.js --check`) · **Derma 73 + ciclo 2 (`gen_derma_ciclo2.js`)** · **Business vía
   `gen_business_plan.py`** · LIVIANO + reslot (`gen_liviano_plan.js`). Idempotente: correrlo dos veces no cambia nada.
2. `node DATA/_scripts/gen_vibecoding_plan.js <fecha>` **ANTES que** `node DATA/_scripts/gen_synapse_plan.js <fecha>`
   (vibecoding = 95 días = D# del Step 1 con taper S13-S20; SYNAPSE = 131 días hasta el vie 22-ene-2027, F2 sem 13-19).
3. `node DATA/_scripts/gen_aurum_plan.js <fecha>`.
4. `node STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check`; si el remap avisa que D78 pisa el 5-ene →
   `node DATA/_scripts/gen_mir_mantenimiento.js <primer hábil > D78> 2027-03-31` (Tier C express incluido).
5. `node DATA/_scripts/gen_encaps_mantenimiento_2027.js <fecha> [--override SEMANAS/override_<lunes>.json]` → revisar el SQL
   (backup `study_schedule_bk_<YYYYMMDD>` automático que ABORTA si ya existe · DELETE solo `modo='MANTENIMIENTO'` · overrides
   acumulados) → `execute_sql` → pegar la verificación que imprime el script (79 banqueo1h + 18 mini_sim).
6. USMLE con `gen_usmle_v5.js` (hitos anclados por FECHA, flag `VIERNES_N4_DESDE_SEMANA`, `TAPER_ACTIVO`; **nunca recorta ni
   fusiona**) → `assemble_usmle_ts.js` → `update_diainicio.js` → `remap_obsidian_usmle.js`. ⚠ Viven en el scratchpad temporal:
   copiarlos a `DATA/_scripts/` es pendiente (hallazgo #29 del crítico).
7. Si el paso 1 avisó de overlays 🔬 desfasados: `node DATA/_scripts/gen_research_calendar.js` → `update_event` (o delete+create)
   de los `recrear` con su payload → `--set hito=eventId`.
8. Pool MIR — **no depende de fechas**; solo cuando cambie el pool o la clasificación: `node DATA/_scripts/gen_mir_pool.js --clasificar`
   → `--verificar` → `--emit` (idempotente: no reescribe si el contenido no cambió).
9. `npx tsc --noEmit -p .` → 0 · `npx expo export --platform web` → 0.
10. Docs (`REESTRUCTURACION`, `USMLE/README`, `CALENDARIO_5_MESES`, `PALMERTON_*`, `PENDIENTES_JOSEPH`) + D# de los overlays del Calendar
    (los 12 🎯 USMLE a mano; los 12 🔬 RESEARCH con el paso 7).
