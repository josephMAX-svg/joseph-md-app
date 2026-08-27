# 📈 ENCAPS 2026-II · Walk-forward v2 (Fable 5 · 01-jul-2026)

<!-- Vector unificado 2026-07-20: II33·I28·V22·III13·IV4 (fuente: PRONOSTICO_WALKFORWARD_2026-2_v2 §7, verificación en vivo QX). Supersede los vectores previos II34·I27·V23·III13·IV3 y II33·I27·V23·III13·IV4. -->

> ⚠️ **VECTOR CANÓNICO (unificado 20-jul-2026): II 33 · I 28 · V 22 · III 13 · IV 4** — el de §7 (verificación en vivo contra el banco de QX), NO el de §3 pre-verificación. §3 quedó actualizado a estos valores; su tabla histórica se conserva con nota de supersesión.
> **CRÍTICOS canónicos = SIETE: I-3 · II-1 · II-3 · V-2 · II-11 · III-5 · II-8.**

> Backtest científico **sin lookahead** sobre los 6 exámenes oficiales reales, con verificación iterativa y auditoría adversarial. 39 agentes en paralelo/secuencia.
> Método: en cada paso el predictor ve **solo** los exámenes previos (datos inyectados en el prompt) y tiene **prohibido** leer pronósticos/guías ya escritos → el backtest mide de verdad si el método habría acertado, no si conoce la respuesta.
> Data cruda: `exams_txt/*.txt`. Resultado estructurado completo: task `wpdj97fyc`. Supersede a `PRONOSTICO_WALKFORWARD_FABLE5.md`.

---

## 1) Cómo evolucionaron los exámenes (clasificación independiente pregunta-por-pregunta)

| Proceso | I SP | II CI | III Ética | IV Inv | V Gestión | % viñeta | tema n°1 |
|---|---|---|---|---|---|---|---|
| 2024-II | 24 | 23 | 9 | 14 | **31** | 42% | V-2 (15.5%) |
| 2025-I | 28 | 21 | 17 | 11 | 23 | 60% | I-3 (11%) |
| 2025-II | 23 | 28 | 16 | **2** | 31 | 83% | V-2 (21%) |
| 2026-I | 30 | **36** | 11 | 3 | 20 | **92%** | I-3 (14.9%) |

**Dos giros estructurales confirmados por la data cruda:**
1. **II (Cuidado Integral) pasó a ser el área rey** (23→21→28→**36**), alza monótona en los últimos 3 procesos. Desplazó a V y a I.
2. **El examen se volvió clínico en viñeta** (42%→**92%**). El cálculo/teoría (bioestadística I-6, diseños IV) prácticamente se extinguió: **IV colapsó a piso 2-4%**.

---

## 2) Backtest walk-forward (la parte honesta: predecir a ciegas y verificar)

| Fold (entrenamiento → objetivo) | MAE área | hit-rate temas | mayor error de área | sorpresas ciegas |
|---|---|---|---|---|
| 2024-II → **2025-I** | 4.4 pp | 100%* | III −7 (subestimado) | III-9, I-5, II-7, I-1, I-11, V-1 |
| +2025-I → **2025-II** | 5.2 pp | 69% | IV +8 (sobre-estimado) | I-1, I-12, II-9, III-8 |
| +2025-II → **2026-I** | 6.0 pp | 80% | **II −10** (subestimado) | **II-3**, II-11, I-5, I-2 |

\* El 100% del primer fold es engañoso: bandas anchas garantizan "acierto" sin precisión. El MAE es la métrica real.

**Lecciones que el propio backtest destiló (y que ya están aplicadas al pronóstico):**
- **II se subestima sistemáticamente.** En 2026-I predijo 26 y salió 36 (−10pp, el peor error de todo el backtest). Hay que anclar II arriba, no en los altos-20.
- **V-2 (planeamiento) es el tema más volátil** (15.5→9→21→8.9), oscila ~2.3× entre procesos y es *anti-persistente* (sube-baja-sube-baja). Acertar el código pero errar la magnitud fue el fallo recurrente.
- **I-3 (vigilancia) es el nuevo rey temático** y su eje viró de "brote/notificación" hacia **vigilancia activa/pasiva e IAAS** + cadena epidemiológica.
- **IV está en colapso terminal**, no en simple declive: predecir 10% fue un error de +8pp. Piso 2-4% con banda estrecha.
- **Bioestadística/cálculo (I-6) y diseños (IV-1) retirados del top:** el formato 90%+ viñeta premia reconocimiento/conducta, no números finos.
- **Picos emergentes ciegos** de perfil básico/comunitario en TODOS los folds (~13pp/proceso que el top-15 no ve venir): I-5, II-7, I-1, I-11/I-12, II-9, III-8, II-3, II-11. → hay que reservar "presupuesto de sorpresa".

---

## 3) 🎯 Pronóstico 2026-II (ajustado tras auditoría adversarial)

> 🔄 **SUPERSEDIDO POR §7** (verificación en vivo QX, misma fecha pero posterior). Los valores de esta sección **ya fueron actualizados** al vector canónico y a los puntos recalibrados de §7. La columna "histórico (pre-§7)" conserva lo que decía la auditoría adversarial antes de cotejar contra el banco en vivo de QX — se mantiene para trazabilidad, **no se usa para planificar**.

### Áreas
| Área | % base | banda | tendencia | histórico (pre-§7) | nota |
|---|---|---|---|---|---|
| **II — Cuidado Integral** | **33** | 32–37 | 🔺 alza (rey) | 34 | sesgo al alza; podría ser 35-36 (error histórico siempre por debajo) |
| **I — Salud Pública** | **28** | 25–30 | estable-alta | 27 | sostenida por I-3 |
| **V — Gestión** | **22** | 20–26 | 🔀 volátil | 23 | riesgo de **rebote al alza** si V-2 revierte |
| **III — Ética/Intercultural** | **13** | 12–16 | estable | 13 | incluir III-9 (HC/SUSALUD), fue el mayor miss histórico |
| **IV — Investigación** | **4** | 2–6 | 🔻 piso | 3 | NO deep-work (ver escenario de contingencia) |

### Temas (rentabilidad esperada, ya calibrada a viñeta clínica)
> Los % de esta tabla **ya incorporan la recalibración de §7**. La columna "pre-§7" conserva el valor anterior a la verificación en vivo (solo trazabilidad).

| Cód | % | banda | pre-§7 | tendencia | núcleo a dominar |
|---|---|---|---|---|---|
| **I-3** | 12 | 11–16 | 13 | alza | vigilancia activa/pasiva/IAAS; cadena epi/historia natural; notificación inmediata; ASIS/sala situacional |
| **V-2** | 9 | **8–18** | 10 | volátil ↕ | definición normativa POI/PEI (no teoría FODA); fase del ciclo de planeamiento; residuos/bioseguridad en desastre |
| **II-1** | 5 | 4–8 | 6 | alza | **parto vertical** (criterios/posición); referencia de gestante por nivel; preeclampsia/eclampsia |
| **II-3** | 5 | 3–8 | 5 | alza | **cadena de frío 2-8°C** y ruptura; esquema por edad (VPH 9a, SPR, influenza+neumococo AM); ESAVI |
| **II-11** | 5 | 3–7 | 5 | alza | prueba dual VIH/sífilis (gestante/adolescente); penicilina benzatínica; PTMI |
| **III-5** | 5 | 3–7 | 5 | estable | pertinencia cultural (parto vertical, quechua, plantas); migrantes/estigma |
| **II-8** | 4 | 3–6 | 4 | estable | metas DM2 (HbA1c<7%); RCV (perímetro/PA/IMC); prediabetes |
| **I-5** | 4 | 2–6 | 4 | alza | determinante estructural vs intermedio vs estilo de vida; equidad; intersectorial (JUNTOS) |
| **II-9** | 3 | 2–6 | 4 | alza | tamizaje salud mental (**AUDIT** 10 ítems/SRQ) y referencia; episodio depresivo |
| **III-8** | 4 | 2–6 | 4 | alza | confidencialidad VIH/secreto profesional; deberes del servidor; HC (archivo/acceso) |
| **V-MED** ⚠️ | 4 | 2–6 | 4 | baja | *(pseudo-código agregado: gestión de medicamentos, no es un código del temario oficial)* farmacovigilancia/RAM; URM/resistencia; DIGEMID/SISMED/vencidos |
| **V-1** | 3 | 2–6 | 4 | alza | categorización EESS (quién asigna); UPSS; referencia por nivel |
| **I-4** | 3 | 2–5 | 3 | estable | dengue A/B/C signos de alarma (reconocer, no ml/kg); control vectorial; malaria |
| **II-4** | 3 | 2–5 | 3 | estable | suplementación de hierro por etapa (lactante 4m, gestante); clasificación/conducta anemia |
| **II-7** | 3 | 2–5 | 3 | estable | VACAM; Pfeiffer/caídas; inmunización del adulto mayor |
| **II-6** | 2 | 1–4 | — | estable | tuberculosis (añadido en §7: QX 8/400) |
| **I-6** ☠️ | ~0.5 | 0–2 | retirado | 🔻 extinto | **bioestadística prácticamente EXTINTA (QX 2/400). YA NO ES CRÍTICO** — solo repaso conceptual mínimo por el escenario de contingencia (§6) |

### 🥇 Críticos (dominar al 100% antes que nada) — SIETE, canónico
**I-3 · II-1 · II-3 · V-2 · II-11 · III-5 · II-8**
(II-8 es **CRÍTICO**, no ALTA. I-6 e I-5 ya NO son críticos.)

### 🌱 Watch-list de emergentes (piso 2-4% + "presupuesto de sorpresa" ~10-13pp)
III-9 (HC/quejas/SUSALUD) · I-1/I-12 (intersectorialidad, participación/control social) · III-4 (código violeta / kit agresión sexual) · II-2 (CRED) · I-2 (FESP) · II-7 (adulto mayor).

---

## 4) Señal de materiales (QX Medic + Theomed + Drive) — indicador adelantado

- **Alineación fuerte (material = rentabilidad):** Cuidado Integral (área II) domina en las 3 fuentes (70 videoclases QX, 15 sesiones Theomed, ~45 fichas MINSA, 9-10 banqueos). Confirma II como rey de forma independiente. I-3 es 2º en material y 2º en rentabilidad.
- **Señal adelantada más limpia:** los emergentes **II-3 (vacunas), II-11 (ITS dual) y II-9 (salud mental)** tienen **fichas MINSA dedicadas nuevas** (esquema de vacunación desdoblado; triple ficha VIH/sífilis/VHB; doble ficha de salud mental). No es solo historial.
- **Trampa de horas (NO caer):** **Investigación (IV)** está *sobre-representada* en material (20 videoclases + 4 banqueos QX) pese a colapsar a 2-4% → inercia de banco legacy, no señal real. Igual con parte del banqueo de Ética.
- **Punto ciego de fichas:** **Gestión (V-2/V-MED)** tiene solo ~3 fichas MINSA pese a ser área crítica; QX/Theomed lo cubren por **videoclase + 9 lives "Normas Técnicas" (CEPLAN/PNMSM 2030)**. Quien estudie solo por fichas subestima V-2.
- Regla: **el volumen de CLASE nueva + FICHA nueva predice mejor que el volumen de BANQUEO** (el banqueo arrastra bancos viejos de IV/III que ya no rinden).

---

## 5) Auditoría adversarial — veredicto: **AJUSTAR** (ya incorporado arriba)

Ajustes de mayor impacto que se aplicaron al pronóstico base del sintetizador (I28·II33·III13·IV4·V22):
1. ~~**II subida 33→34**~~ (banda al alza 32-37): la tendencia es monótona y el error histórico siempre fue por debajo. → **REVERTIDO por §7: II vuelve a 33** (QX Tendencias en vivo da CI 123/400 ≈31%); la banda al alza 32-37 se mantiene.
2. **II-3 bajada 7→5**: era extrapolación de un solo pico (2,1,2,7.9); riesgo de regresión a la media. La ficha MINSA es señal de material, no de frecuencia de examen.
3. **V-2 banda ampliada a 8-18**: anti-persistente (std 5.0); tras un fold bajo suele **rebotar**. No apostar a dos folds bajos seguidos.
4. **III mantiene 13 pero se añade III-9 al top/watch**: fue el mayor miss histórico y seguía omitido.
5. **I-3 con sesgo a la baja dentro de banda** (posible regresión a ~12): no clavar el último pico.
6. **Escenario de contingencia** (ver §6).

---

## 6) ⚠️ Confianza: **MEDIA**

- **Convergencia alta en áreas** (los 3 métodos coinciden en el vector canónico: **II rey 33, I 28, V 22, III 13, IV 4** piso) + confirmación independiente por materiales → confianza estructural buena.
- **Supuesto más frágil (riesgo sistémico):** la **continuidad del formato viñeta ~90%**. Todo el pronóstico está calibrado a reconocimiento/conducta. Serie de %viñeta: 42→60→83→92 (ya en techo).
- **Escenario de contingencia (~15-20% prob.):** si un comité nuevo revierte parcialmente hacia teoría/cálculo → **IV sube a 8-10%, reaparece I-6/bioestadística y diseños**, y II se modera. Tener repaso conceptual mínimo de IV-1 e I-6 por si acaso.
- **Otros riesgos:** magnitud de V-2 (miss recurrente 2.3×) e I-3; II podría ser aún más alto (35-36); picos comunitarios ciegos irreductibles con n=4 procesos.

**n = 6 exámenes / 4 procesos = muestra corta.** Las cifras por-tema son **bandas**, no puntos.

---

## 7) ✅ Verificación EN VIVO (01-jul, QX Medic + Theomed logueados)

Se validó el pronóstico contra las plataformas reales. Hallazgo clave: **QX Medic tiene su propia base de "Tendencias"** (conteo histórico de preguntas por sub-tema sobre ~4 exámenes = 400 preguntas) — un dataset **independiente** que reproduce mi walk-forward.

**QX "Tendencias · Generales" (conteo por área, /400):** Cuidado Integral **123 (~31%)** · Salud Pública **118 (~29%)** · Gestión **81 (~20%)** · Ética **48 (~12%)** · Investigación **30 (~7.5%)**.
→ Confirma el ranking **II > I > V > III > IV** y que II es #1. La única divergencia: **IV aparece en 7.5%** en el agregado de QX porque incluye exámenes viejos (2024-II tenía IV=14%); mi walk-forward lo baja a 3-4% por recency (el colapso reciente bajo formato viñeta). **Esto confirma que el material/dato de IV es legacy inflado, no señal real.**

**QX "Tendencias · Capítulos" (conteo por sub-tema, ÷4 = % por examen) — cotejo con mi pronóstico:**

| Tema (mi código) | QX conteo /400 | ≈ %/examen | mi forecast | veredicto |
|---|---|---|---|---|
| I-3 vigilancia+brotes+mediciones+ASIS+causalidad | 40 | ~10 | 13 | ligeramente alto → centrar ~12 |
| I-6 bioestadística | 2 | 0.5 | retirado | ✅ confirmado muerto |
| II-8 ECNT (DM/HTA) | 16 | 4 | 4 | ✅ exacto |
| I-4 metaxénicas/zoonosis (QX lo pone en CI) | 14 | 3.5 | 3 | ✅ |
| II-3 vacunación (esquema+regular) | 13 | 3.25 | 5 | ✅ (recency+ficha lo justifican) |
| II-1 obstetricia (emergencias+parto+puerperio) | 13 | 3.25 | 6 | **alto → bajar a ~5** |
| Planeamiento V-2 (PEI/POI+FODA) | 20 | 5 | 10 | alto → centrar ~8-9 (con calidad/clima sube a ~7.75) |
| II-11 ITS | 9 | 2.25 | 5 | alto en agregado, pero **live NT-ITS + triple ficha + rebote 2026-I** → mantener ~4 |
| II-7 adulto mayor/VACAM | 9 | 2.25 | 3 | ✅ |
| II-6 tuberculosis | 8 | 2 | (no destacado) | **AÑADIR a lista media** |
| II-4 anemia | 8 | 2 | 3 | ✅ |
| III-5 interculturalidad | ~20 | ~5 | 5 | ✅ exacto |
| V-1 categorización EESS | 10 | 2.5 | 4 | ligeramente alto → ~3 |
| III-8 ética función pública + HC | ~14 | ~3.5 | 4 | ✅ |
| II-9 salud mental | 4 | 1 | 4 | alto en agregado, pero **doble ficha nueva** → ~3 |
| II-10 cáncer (tamizaje mama/CACU) | 6 | 1.5 | (no listado) | **AÑADIR a watch** |
| IV (todos) | 30 | 7.5 legacy | 3-4 recency | divergencia esperada (ver arriba) |

**Señales en vivo adicionales (confirman emergentes):**
- QX corre sesiones en vivo **"Revisión de Normas Técnicas"** cuyos PDF listan explícitamente **NT Inmunizaciones (II-3), NT Planificación Familiar, NT ITS (II-11)** → confirmación directa de los picos II-3/II-11 y añade **planificación familiar** como ángulo a vigilar (anticoncepción/consejería, cruza con II-1).
- Materiales recién publicados esta semana = todo **Gestión** (categorización, RIS, UPSS, HC, referencia, logística/stock, RRHH, AUS, telesalud) → V se cubre por videoclase/PDF, no por ficha (confirma el punto ciego de fichas de V).
- **Theomed 2026-II** activo con 3 cursos: Medicina Regular GP1, Simulacros Medicina, Kahoots 2026-2 (coincide con la data scrapeada, sin estructura nueva).

**Ajustes finos post-verificación (el pronóstico de §3 se mantiene; solo se recalibran puntos):**
- Bajar **II-1** 6→**5**, **V-2** 10→**~9**, **V-1** 4→**3**, **II-9** 4→**3**, centrar **I-3** en **~12**.
- **Añadir II-6 (tuberculosis, ~2%)** a la lista media y **II-10 (cáncer/tamizaje, ~1.5%)** a la watch-list.
- Áreas prácticamente iguales (blend recency + QX): **II 33 · I 28 · V 22 · III 13 · IV 4** ← ⭐ **VECTOR CANÓNICO** (propagado a §3, `src/lib/encapsRentabilidad.ts`, `INDICE_FUENTE_UNICA_2026-2.md`, `GUIA_OPERATIVA_LOOP_DIARIO.md`, `MASTER_MOTOR_PREGUNTAS.md` el 20-jul-2026).
- **Conclusión: el walk-forward queda validado por la fuente independiente de QX.** El ranking, los críticos y el colapso de IV se sostienen; los emergentes II-3/II-11/II-9 están confirmados por sesiones en vivo y fichas nuevas.
