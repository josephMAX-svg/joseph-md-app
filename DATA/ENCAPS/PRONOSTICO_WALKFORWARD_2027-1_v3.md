# 📈 ENCAPS 2027-I · Walk-forward v3 (Fable 5 · 27-ago-2026)

> ⚠️ **VECTOR CANÓNICO v3: II 30 · I 27 · V 21 · III 13 · IV 9** (bandas abajo).
> **CRÍTICOS canónicos v3 = OCHO: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2** (este último condicional al comité — ver §4).
> Construido con los **7 exámenes reales** (2024-II A/B, 2025-I A/B, 2025-II, 2026-I, **2026-II clasificado pregunta a pregunta**). Supersede a `PRONOSTICO_WALKFORWARD_2026-2_v2.md`.
> Data: `_examen_2026-2_clasificado.json` + `ANALISIS_EXAMEN_2026-2_REAL.md` + `_qx_tendencias.json`. Examen objetivo: **2027-I, fines de marzo 2027**.

---

## 1) Qué pasó en 2026-II y cómo le fue al v2 (resumen del backtest en vivo)

| Área | Serie 2024-II→2026-II | v2 predijo | Real | Error |
|---|---|---|---|---|
| II CI | 23→21→28→36→**30** | 33 | 30 | +3 |
| I SP | 24→28→23→30→**26** | 28 | 26 | +2 |
| V Gestión | 31→23→31→20→**19** | 22 | 19 | +3 |
| III Ética | 9→17→16→11→**13** | 13 | 13 | **0** |
| IV Inv | 14→11→2→3→**12** | 4 | 12 | **−8** |

- **MAE 3.2 pp = el mejor fold de la serie** (4.4/5.2/6.0 históricos) y **ranking de áreas 5/5 correcto**.
- **PERO**: el escenario de contingencia del v2 §6 (prob. 15-20%) **ocurrió** — IV rebotó a 12, la viñeta cayó de 92%→**49%**, volvieron el recall normativo y los números finos (dosis, plazos, semanas).
- Críticos v2 capturaron 37/100; radar completo v2 ≈ 69/100. Aciertos exactos: I-3 (11), V-2 rebote (11, banda 8-18), II-3 (5), III-5 (5), II-6, II-10, V-MED, III-8, II-4. Fallos: IV (−8), II-1 (5→1), II-11 (5→2), II-5 fuera de radar (0→5).
- Detalle completo: `ANALISIS_EXAMEN_2026-2_REAL.md` §3.

---

## 2) 🎯 Vector de áreas 2027-I

Ponderación por recencia (pesos 1..5 por proceso) da: I 26.6 · II 29.5 · III 13.3 · IV 7.6 · V 23.0. Ajustes de juicio: V lleva 2 procesos consecutivos bajos (20, 19) → no anclar en el promedio inflado por 2024-25; IV es **bimodal por comité** (régimen viñeta: 2-3 · régimen teoría: 11-14) y el último comité es el mejor predictor del siguiente → punto medio-alto con banda ancha.

| Área | % v3 | banda | tendencia | nota |
|---|---|---|---|---|
| **II — Cuidado Integral** | **30** | 27–34 | rey estable | sigue #1 pero ya no en máximos (36 fue el pico); la corrección "II siempre se subestima" del v2 sobre-corrigió |
| **I — Salud Pública** | **27** | 24–29 | estable-alta | I-3 + I-4 la sostienen; coyuntura epidemiológica la puede empujar |
| **V — Gestión** | **21** | 18–25 | estable-baja | 2 folds seguidos ~20; V-2 concentra más de la mitad del área |
| **III — Ética/Intercultural** | **13** | 11–15 | estable | la más predecible (0 pp de error en el último fold) |
| **IV — Investigación** | **9** | **5–14** | 🔀 bimodal | si el comité 2026-II persiste → 10-13; si vuelve el régimen viñeta → 3-5. NO volver a apostar al piso |

**Formato esperado 2027-I: viñeta/escenario 45-70%** (banda ancha deliberada). Entrenar los DOS modos: conducta clínica en viñeta **y** recall de cifras/definiciones normativas (dosis, plazos, categorías, semanas). El v2 entrenaba solo el primero.

---

## 3) Ranking de temas por rentabilidad esperada (frecuencia × recencia)

> % = punto esperado por examen de 100. Bandas honestas: n=7 exámenes sigue siendo muestra corta.

| # | Cód | % | banda | tendencia | núcleo a dominar (calibrado a 2026-II) |
|---|---|---|---|---|---|
| 1 | **I-3** | **11** | 9–14 | rey estable (11-15 en 4 folds) | tipos de vigilancia (activa/pasiva/centinela); notificación inmediata + ficha clínico-epidemiológica; historia natural (subclínico); causalidad (Hill, necesaria/suficiente); sala situacional/ASIS/EIS; bloqueo vacunal y control de brote; TLP; riesgos en desastres |
| 2 | **V-2** | **10** | 8–14 | volátil alto (15.5→9→21→9→11) | TRES sub-ejes con peso propio: (a) planeamiento POI/PEI/FODA/objetivos estratégicos (~5), (b) **clima organizacional + gestión de calidad (~4, en alza dura)**, (c) residuos sólidos/bioseguridad: colores de bolsa, punzocortantes 3/4 (~2) |
| 3 | **IV-1+IV-2** | **5** | 2–8 | 🔀 rebotó (7 en 2026-II) | método científico (definiciones textuales); tipos de estudio (descriptivo vs analítico); muestreo no probabilístico (bola de nieve, cuotas); instrumentos de recolección |
| 4 | **I-4** | **5** | 3–8 | alza (3→6) | dengue COMPLETO: escenarios I/II/III, índice aédico, control larvario/adulticida, necropsia 24h; rabia (clasificación exposición); precauciones EPP por patógeno; malaria/zoonosis |
| 5 | **II-3** | **5** | 3–7 | estable-alta (3 folds seguidos ≥5) | esquema + **novedades: VRS gestante 32-36 sem, Tdap gestante**; intervalos mínimos; ESAVI (clasificación + kit: epinefrina 0.01 mg/kg IM); cadena de frío |
| 6 | **III-5** | **5** | 4–6 | estable (5,5 exactos 2 folds) | pertinencia cultural y barreras culturales; medicina tradicional/complementaria; pertenencia étnica; inclusión social; migrantes |
| 7 | **II-5** ⚡ | **4** | 2–6 | emergente fuerte (0→5) | NTS cuidado integral del **adolescente** (áreas de riesgo, factores protectores/consejería, continuidad IE→EESS); MCI/curso de vida (indicadores, objetivo) |
| 8 | **II-4** | **4** | 2–5 | estable-alza (3→4) | suplementación por grupo con CIFRAS: MEF 60mg+400ug 2×/sem·3m, escolar 60mg diario·3m, lactante; plan multisectorial (intersectorial); consejería nutricional OMS |
| 9 | **IV-6+IV-7** | **4** | 1–6 | rebotó (5) | estructura IMRyD (resumen, marco teórico, discusión); ética de publicación (fraude/autoría); estadística descriptiva básica (moda/mediana/media) |
| 10 | **III-8** | **3** | 2–4 | estable (3-4) | Ley 27815: deberes vs prohibiciones vs principios (distinguirlos TEXTUALMENTE); HC archivo activo 5 años/acceso |
| 11 | **V-MED** | **3** | 2–4 | estable | farmacovigilancia (notificación espontánea); medicamentos esenciales/URM; contrataciones (área usuaria); stock/SISMED |
| 12 | II-2 | 2.5 | 1–4 | estable | AIEPI/IRA (bronquiolitis-referencia); clínica de inmunoprevenibles (sarampión: vitamina A, PEES) |
| 13 | II-11 | 2 | 1–5 | ↩ rebote probable | PrEP; sífilis gestacional (PGB 2.4M UI); prueba dual; PTMI — aplastada en 2026-II, anti-persistente |
| 14 | II-1 | 2 | 1–5 | ↩ rebote probable | parto/emergencias obstétricas + lactancia (32 sem); OJO: la gestante ahora cae vía vacunas/ITS |
| 15 | II-8 | 2 | 1–4 | ↩ rebote posible | paquete básico/completo ENT; 150 min OMS; metas DM2/HbA1c |
| 16 | II-6 | 2 | 1–3 | estable (2,2) | definiciones de caso TB; derechos laborales (licencia con goce) |
| 17 | II-10 | 2 | 1–3 | estable (2) | tamizaje mama (mamografía por edad/rol del I-2); signos de alarma cáncer infantil |
| 18 | V-6 ⚡ | 2 | 1–3 | emergente (2) | Ley 30421: telesalud vs teleconsulta/teleinterconsulta/telemonitoreo/teleorientación — definiciones textuales |
| 19 | I-10 | 2 | 1–3 | emergente (2) | APS: definición y ATRIBUTOS (primer contacto, accesibilidad, continuidad, integralidad, coordinación) |
| 20 | I-5+I-6 | 2 | 1–4 | estable-baja | determinantes; demografía/fuentes de datos (hechos vitales); transición epidemiológica; bioestadística mínima ya NO extinta |
| 21 | II-EMG ⚡ | 1.5 | 0–3 | emergente (2) | prioridades de atención en emergencia (RM jul-2026): P-I inmediato · P-II ≤10' · P-III ≤30' + ejemplos por triaje |
| 22 | I-OCC ⚡ | 1.5 | 0–3 | emergente (2) | salud ocupacional: riesgo profesional (vínculo laboral), factores físico/biológico/ergonómico/**psicosocial** |
| 23 | III-3 ⚡ | 1.5 | 0–3 | emergente (2) | retiro voluntario (contenido del formato); negativa/rechazo en emergencia → ministerio público |
| 24 | I-11+I-12 | 1.5 | 0–3 | estable (2) | plan local de salud (autoridad local); alianzas estratégicas/intersectorialidad |
| 25 | V-1 | 1.5 | 1–3 | baja (1) | categorías y RRHH por categoría (I-3 = odontología+laboratorio); UPSS |
| 26 | III-9 | 1 | 0–2 | estable | Ley 29414 por CATEGORÍAS de derecho (segunda opinión = acceso a servicios) |
| 27 | II-9 | 1 | 0–3 | baja (1) | modelo comunitario de salud mental; CSMC |
| 28 | II-7 | 1 | 0–3 | baja (1) | VACAM corta (dónde: I-2/I-3/I-4); 4 valoraciones |
| 29 | III-1 / III-2 | 1+1 | 0–2 c/u | estable | ética salud pública (justicia/racionamiento); deontología CMP (relaciones entre colegas) |
| 30 | V-3 / V-RRHH | 1+1 | 0–2 c/u | estable | RIS 4 dimensiones (prestación = puerta de entrada); definición gestión RRHH |
| — | I-1 / I-2 | 1 | 0–3 | baja (1) | promoción/entornos saludables; FESP solo repaso |

### 🥇 CRÍTICOS v3 (OCHO) — dominar al 100% antes que nada
**I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2**
- Entran: **I-4** (duplicó a 6), **II-5** (emergente 5), **II-4** (estable 4 con cifras preguntables), **IV-1+IV-2** (7 en 2026-II; crítico *condicional*: si señales de formato indican reversión a viñeta plena, degradar a ALTA).
- Salen (a ALTA con flag de rebote): **II-1, II-11, II-8** — anti-persistentes; no enterrarlos (lección V-2).
- Cobertura esperada de los 8 críticos: **~49%** del examen.

---

## 4) 🌱 Emergentes 2026-II (nuevos en el patrón) y 📉 en declive

### Emergentes — incorporar al banco YA
1. **II-5 adolescente/MCI** (0→5): la NTS del adolescente fue el eje singular más nuevo. Ficha obligada.
2. **Bloque IV completo** (3→12): método científico + tipos de estudio + muestreo + IMRyD. Es el "nuevo" tema #3 en volumen.
3. **Clima organizacional + calidad** (sub-eje de V-2, ~4-5): definición SERVIR, dimensiones, gestión en 3 fases, gestión de calidad.
4. **II-EMG triaje/emergencia** (RM jul-2026 → cayó en ago-2026): las **normas publicadas 0-6 meses antes del examen entran directo** → en feb-mar 2027 barrer RM/NTS nuevas de sep-2026 en adelante.
5. **I-OCC salud ocupacional** (2), **V-6 telesalud** (2), **III-3 consentimiento/retiro-rechazo** (2), **I-10 APS atributos** (2).
6. **Clusters coyunturales**: dengue (8 preguntas) y sarampión (5, brote regional 2026). Para 2027-I: seguir el **boletín epidemiológico DGE de dic-2026→mar-2027** y banquear lo que esté en sala situacional (dengue casi seguro; sarampión si el brote sigue; lo que emerja).
7. **Novedades de esquema**: VRS gestante ya cayó; vigilar nuevas incorporaciones PNI 2026-27.

### En declive (no muertos: mantener repaso mínimo + flag de rebote)
- **II-1 obstetricia** (5-6 histórico → 1): el contenido gestante migró de envase (vacunas, ITS). Repasar vía II-3/II-11.
- **II-11 ITS** (→2), **II-8 ECNT** (→2), **II-9 salud mental** (→1), **II-7 VACAM** (→1), **V-1 categorización** (2.5→1).
- **I-1/I-2 promoción-FESP** (→1): mínimos históricos.
- **Viñeta clínica como formato dominante** (92→49%): el "todo es conducta clínica" murió en 2026-II.

---

## 5) ⚠️ Confianza y riesgos

- **Confianza: MEDIA-ALTA en áreas** (mejor MAE de la serie, ranking 5/5), **MEDIA en temas** (radar v2 cubrió 69%; el v3 amplía a ~35 códigos).
- **Riesgo #1 — el formato, no los temas**: no sabemos si el comité 2026-II repite en 2027-I. Por eso IV banda 5-14 y formato 45-70% viñeta. Señal de desempate: los simulacros QX/Theomed de ene-mar 2027 y el estilo de sus "Tendencias" actualizadas (re-scan al arrancar la fase intensiva).
- **Riesgo #2 — rebotes anti-persistentes**: II-1/II-11/II-8 baratos hoy, con sesgo de rebote. El presupuesto de sorpresa (~10-13 pp) va ahí + picos comunitarios.
- **Riesgo #3 — coyuntura**: 13 preguntas de 2026-II orbitaron dengue+sarampión. Un brote distinto en el verano 2027 (p.ej. tosferina, oropouche, leptospirosis por lluvias) reordenaría I-3/I-4 por dentro sin mover el total.
- n = 7 exámenes / 5 procesos: bandas, no puntos.

---

## 6) 🗓️ Implicaciones de plan para 2027-I (examen fines de marzo 2027)

### Fase A — 1h/día de preguntas (sep-2026 → ene-2027, ~20 semanas)
Presupuesto semanal ≈ 105-125 preguntas (régimen v5.4: lun-jue 20-25Q del tema de la rotación + 5Q eval anclada, viernes mini-simulacro 25Q; sábado y domingo LIBRES — ver PROTOCOLO_HORA_MANTENIMIENTO.md). Mezcla del ciclo de 4 semanas proporcional al v3:

| Bloque | Q/sem | Contenido |
|---|---|---|
| I-3 | 8 | rotar los 8 sub-ejes del núcleo (§3 fila 1) |
| V-2 | 7 | alternar los 3 sub-ejes: planeamiento / clima+calidad / residuos |
| IV (1+2 y 6+7) | 7 | método científico, tipos de estudio, muestreo, IMRyD, estadística descriptiva |
| I-4 | 4 | dengue completo + rabia + EPP |
| II-3 | 4 | esquema con novedades + ESAVI + números |
| II-5 | 3 | NTS adolescente + MCI |
| III-5 | 3 | interculturalidad |
| II-4 | 3 | cifras de suplementación |
| Rotativo ALTA/MEDIA | 12 | II-11, II-1, II-8, III-8, V-MED, II-2, II-6, II-10, V-6, I-10, II-EMG, I-OCC, III-3… (2 códigos/sem en ciclo) |
| Repaso de errores (D-1/D-3/D-7) | 10 | del `TRACKING_ERRORES/_registro_resoluciones.json` |

Reglas de la fase A:
1. **Doble formato desde el día 1**: por cada tema, ~50% viñetas y ~50% recall directo de cifras/definiciones (tabla de números críticos aparte: dosis, plazos, semanas, porcentajes, categorías).
2. Todas las claves verificadas contra fuente real (protocolo `PROTOCOLO_GENERACION_PREGUNTAS.md`); el examen 2026-II clasificado es ahora banco espejo de 100 preguntas reales con clave verificada — queda **RESERVADO como pre-test diagnóstico del arranque de la fase intensiva (1ª semana de febrero)**; no quemarlo antes (regla del `PROTOCOLO_HORA_MANTENIMIENTO.md`).
3. Fin de enero: **checkpoint** — % ciego por área contra el vector v3; redistribuir la mezcla hacia las áreas con brecha.

### Fase B — intensiva (feb → mar-2027, ~7 semanas)
1. **Re-scan de señales** (semana 1 de feb): QX Tendencias actualizado, materiales/lives nuevos, boletín DGE (coyuntura), RM/NTS publicadas desde sep-2026 → ajustar pesos y el condicional de IV.
2. **Simulacros completos 100Q/72s** cada VIERNES por la mañana (sábados y domingos libres; formato mixto 50/50 viñeta-directa), con análisis de errores por código. El primero = el examen 2026-II real (reservado).
3. Semanas 2-5: barrido de los 8 críticos al 100% + drills de números críticos diarios (10 min).
4. Semanas 6-7: watch-list + rebotes (II-1/II-11/II-8) + repaso multi-temporal de todo el registro de errores; última semana solo repaso, sin material nuevo.
5. Dress rehearsal D-2, medio día D-1 (doctrina del sprint 2026-II que ya funcionó).

---

*Método: clasificación pregunta-por-pregunta del 7º examen (clave oficial verificada 100/100) + serie de 5 procesos con ponderación por recencia + lecciones L1-L6 del backtest (`ANALISIS_EXAMEN_2026-2_REAL.md` §3). Sin lookahead: el v2 se evaluó tal como quedó escrito el 20-jul-2026.*
