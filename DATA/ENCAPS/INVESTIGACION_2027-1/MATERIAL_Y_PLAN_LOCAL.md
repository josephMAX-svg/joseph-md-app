# ENCAPS 2027-I · Material y plan que YA existen en disco (inventario del dom 8-nov-2026)

> Objetivo del alumno: **primer puesto** en el ENCAPS 2027-I, meta **> 17.5/20** (con 100 preguntas y nota vigesimal = aciertos ÷ 5 → **≥ 88 aciertos**).
> Investigación de solo lectura sobre `D:\agente_estudio\ENCAPS\ENCAPS`, `DATA/ENCAPS`, `DATA/_scripts`, `src/lib/encaps*.ts`, el vault Obsidian
> (`06_ENCAPS`) y la memoria del proyecto (`encaps-*.md`). No se consultó Supabase en vivo ni las plataformas (QX, Theomed, Drive).
> **Lista negra respetada:** el examen real 2026-II (PDF `EXAMENES/ENCAPS 2026 2.pdf`, `_examen_2026-2_items.json`, `exams_txt/2026-2.txt`,
> `PRETEST_2026-II.md`) no se abrió ni se copia aquí; solo se cita que existe y el resumen por áreas que ya figura en el pronóstico v3.
> Fechas: mandan `DATA/_scripts/_fechas_v6.json` (v6.06 + capa `corrida_s1` v6.06e).

---

## 0) Lo más importante en 10 líneas

1. **El sistema está construido de punta a punta** (pronóstico v3, rotación F1 de 42 días ya sembrada en Supabase, intensiva de 50 días ya sembrada,
   generador de runners HTML, registro de errores, deck de cifras, protocolo de simulacro). No hay que rediseñar: hay que **ejecutar y reponer stock**.
2. **Preguntas reales con clave oficial: 300 únicas** (2024-II, 2025-I, 2025-II; las formas A/B son el mismo examen barajado) + **100 del 2026-II
   reservadas** como pre-test ciego del **vie 8-ene-2027**. El 2026-I (100 ítems) **no tiene clave en disco**.
3. **Banco propio (pool del runner): 434 ítems** = 300 reales re-etiquetados + 84 nuevos verificados contra compendio/norma + 50 espejo.
   **Disponibles 249**; los otros 185 ya están dentro de runners pre-generados (2-20 nov de plan) que el alumno aún no ha hecho.
4. **Déficit de stock: ≈ 1 517 preguntas** frente a la demanda sembrada (1 750Q de banqueo F1 + carril B + carril sábado), sin contar el loop
   de la intensiva ni los 3 SIM 100Q «propios». Sin reponer, **desde el 30-nov (fecha de plan) todos los bancos son re-test** y el mini-sim del 27-nov
   no se puede armar. Las tandas de reposición 0-6 (`RUNBOOK_SEMANA2_2026-10-26.md` §5) **no se han producido**.
5. **Rendimiento real del alumno: casi nulo.** Solo 2 rondas registradas (julio, ambas de I-3: 4/20 y 16/20; % ciego global 40 %). El pre-test de
   arranque (40Q, línea base de los 8 críticos) **no se ha rendido**: 7 de 8 críticos sin medición.
6. **Arranque según el plan vigente: hoy dom 8-nov = D1** (alias v6.06e: dom 8 = plan del lun 2). Si el alumno empieza el **lun 9**, ese día es el
   plan del mar 3 (D2) y el D1 queda sin hacer → decidir si se absorbe o se corre otra vez (ver §3.1).
7. Huecos de material: **Gestión (V) es el eje más pobre** (3 fichas QX, ninguna norma en PDF, sin compendio 2026-II); **II-EMG e I-OCC sin video
   ni ficha**; 50 sub-temas marcados como «gap» del compendio; normas de 2025-26 de esquema/CRED/adulto/triaje con número **A VERIFICAR**.
8. Accesos 2027-I a QX y Theomed **A VERIFICAR**: de ellos dependen 2 de los 8 SIM 100Q y el banqueo masivo por área (≈ 2 000Q).
9. **No hay en el repo ningún dato de qué nota obtuvo el primer puesto** en procesos previos ni la regla de puntuación (¿descuenta el error?):
   ambos A VERIFICAR para calibrar «primer puesto».
10. El vault Obsidian `06_ENCAPS` es un **andamiaje vacío** (94 notas «concepto madre» en estado `vacio`, 0 APEX).

---

## a) Estructura del examen y peso histórico

| Dato | Valor | Fuente |
|---|---|---|
| Nº de preguntas | **100**, 4 opciones (A-D), 5 áreas | `_examenes_reales_2024-2A_2026-1.json`, `SENALES_2027-I.md` canal 1 |
| Nota | vigesimal: 85 aciertos = 17.0 · **88 = 17.6** (meta > 17.5) | `META_NIVEL_METODO_ENCAPS.md` |
| Tiempo de entrenamiento | 72 s/Q → 120′ por 100Q (protocolo propio; duración oficial A VERIFICAR) | `METODO_SIMULACRO_ENCAPS.md` |
| Regla de puntuación / hoja | **A VERIFICAR** en las bases de la convocatoria 2027-I | `METODO_SIMULACRO_ENCAPS.md` §6 |
| Día | los 6 ENCAPS previos fueron en domingo; **dom 14-mar-2027 PROVISIONAL**; escenarios 14-mar, 21-mar, 4/11/18/25-abr; tope de convocatoria mié 17-feb | `_fechas_v6.json` `encaps` |

### Áreas (ejes): serie real 2024-II → 2026-II y vector v3

| Área | 2024-II | 2025-I | 2025-II | 2026-I | 2026-II | QX Tendencias /400 | **v3 (2027-I)** | banda |
|---|---|---|---|---|---|---|---|---|
| II Cuidado Integral | 23 | 21 | 28 | 36 | 30 | 30.75 % | **30** | 27-34 |
| I Salud Pública | 24 | 28 | 23 | 30 | 26 | 29.5 % | **27** | 24-29 |
| V Gestión | 31 | 23 | 31 | 20 | 19 | 20.25 % | **21** | 18-25 |
| III Ética/Interculturalidad | 9 | 17 | 16 | 11 | 13 | 12 % | **13** | 11-15 |
| IV Investigación | 14 | 11 | 2 | 3 | 12 | 7.5 % | **9** | 5-14 (bimodal) |

- Pronóstico `PRONOSTICO_WALKFORWARD_2027-1_v3.md` (27-ago-2026, 7 exámenes): el v2 acertó el ranking 5/5 con MAE 3.2 pp, pero falló IV (−8).
- **Formato:** la viñeta cayó de 92 % (2026-I) a 49 % en el último proceso → para 2027-I se espera **45-70 % viñeta** y vuelve el recall de cifras,
  plazos y definiciones textuales. Entrenar los dos modos.
- **Los 8 críticos v3 (≈ 49 % del examen):** I-3 vigilancia (11 %) · V-2 planeamiento/clima-calidad/residuos (10 %) · IV-1+IV-2 método y tipos de
  estudio (5 %) · I-4 transmisibles/dengue/rabia/EPP (5 %) · II-3 inmunizaciones (5 %) · III-5 interculturalidad (5 %) · II-5 adolescente/MCI (4 %) ·
  II-4 anemia/suplementación (4 %). Rebote probable: II-1 obstetricia, II-11 ITS, II-8 ECNT (2 % c/u). Cola larga: 17 códigos (≈ 30-35 pp).
- Taxonomía: ≈ 35 códigos v3 (42 en `encapsCobertura.ts`, que conserva códigos de baja frecuencia).

---

## b) Inventario de material y de preguntas

### b.1 Disco `D:\agente_estudio\ENCAPS\ENCAPS` (sin `_DUPLICADOS` ni `_BASURA`)

| Carpeta | PDFs | Páginas | Qué hay |
|---|---|---|---|
| `EXAMENES` | 6 (+1 reservado, no abierto) | 72 | 5 «CLAVE DE RESPUESTA» (2024-2A, 2024-2B, 2025-1A, 2025-1B, 2025-2; clave = resaltado amarillo) + `2026 1.pdf` (14 pp, sin clave) · `ENCAPS 2026 2.pdf` = pre-test reservado |
| `TIO LOPEZ` | 34 (+4 xlsx) | 1 266 | compendios 2026-I por área (SP 46 · CI 91 · Ética 9 · Inv 18 · Gestión 30 = 194 pp) · compendios **2026-II** solo SP 28 · Ética 8 · CI 72 (**faltan Inv y Gestión 2026-II**) · 12 PDFs de diapositivas (clases, repasos semanales y 2 «resolución de simulacros»; 769 pp) · copias de las 5 claves (58 pp) y 3 exámenes 2025 sin clave (36 pp) · carpeta «Día 5 vigilancia» con 6 documentos normativos (101 pp) · xlsx: oferta de plazas 2025-I/II y 2 trackers antiguos |
| `THEOMED` | 24 | 1 428 | 4 manuales (CI 310 · SP 208 · Gestión 171 · Inv 91 pp) · manual Bloque III 41 · Ética S1 35 · compendio 2026-I 67 · «esenciales» 2025-II 40 · banco de preguntas 2025-I 24 · **10 normas de interculturalidad** (399 pp) · 4 resúmenes (definiciones de caso EPI, FESP, MCI, causalidad; 37 pp) |
| `QXMEDIC PPT SALUD PUBLICA` | 14 | 55 | fichas teóricas de Salud Pública (vigilancia, brotes, demografía, prevención, IAAS, URM, ASIS, causalidad, pruebas diagnósticas) |
| `FORMAS DE ESTUDIO` | 2 (+19 docx) | 12 | hoja de ruta y horario asincrónico 2026-II; planes v2-v10 del ciclo 2026-II (obsoletos) |
| `RECURSOS A USAR` | 0 (8 docx) | — | guías maestras 2026-II por área (SP, Gestión, Investigación/NTS, Cuidado Integral, Ética, fuentes fuera de compendios) |
| **Total útil** | **80 PDFs** | **≈ 2 833 pp** | + 30 PDFs duplicados (60 MB) en `_DUPLICADOS` |

### b.2 Fichas MINSA y normas por eje

| Eje | Fichas teóricas QX (biblioteca, 105 en total, links en `encapsFuentes.ts`) | Normas en PDF en disco | Otro material en disco |
|---|---|---|---|
| I Salud Pública | **33** | 6 (vigilancia: directiva RENACE, directiva de notificación de brotes 2012, lista de enfermedades notificables + 3 de apoyo) | 14 fichas QX SP en PDF, manual Theomed SP 208 pp, compendios SP 2026-I/II |
| II Cuidado Integral | **44** | **0** (esquema de vacunación, anemia, adolescente, CRED, adulto, TB, ITS, ECNT: solo vía manuales/compendios) | manual Theomed CI 310 pp, compendios CI 2026-I/II (91 + 72 pp) |
| III Ética/Intercult. | **12** | **10** (política intercultural, transversalización DDHH-género-interculturalidad, pertenencia étnica, diálogo intercultural, adecuación cultural 1.er nivel, plan de salud intercultural, parto vertical, consejería CRED intercultural, VIH en pueblos amazónicos, equipos AISPED) | compendios Ética 2026-I/II, Ética S1 Theomed |
| IV Investigación | **13** | 0 | manual Theomed Inv 91 pp, compendio 2026-I 18 pp |
| V Gestión | **3** | **0** | manual Theomed Gestión 171 pp, compendio 2026-I 30 pp |

Online (no en disco, enlazado desde la app): carpeta «Normativas» de la academia de `TIO LOPEZ` en Drive, 184 videoclases QX con URL directa
(SP 48 · CI 70 · Gestión 30 · Inv 20 · Ética 16), 45 videos de sesión Theomed, 56 evaluaciones QX del calendario 2026.

### b.3 Preguntas reales con clave oficial (por examen)

| Proceso | Ítems | Clave oficial | Estado |
|---|---|---|---|
| 2024-II forma A (= forma B barajada) | 100 | 100/100 | en el banco; `--sim100 2024-2A` |
| 2025-I forma A (= forma B barajada) | 100 | 100/100 | en el banco; `--sim100 2025-1A` |
| 2025-II | 100 | 100/100 (98 automáticas + 2 a mano) | en el banco; `--sim100 2025-2` |
| 2026-I | 100 | **0** (no hay PDF de claves) | solo molde de estilo |
| 2026-II | 100 | 100/100 | **RESERVADO** hasta el pre-test del vie 8-ene-2027 |
| **Usables hoy** | **300 únicas** | | + 100 tras el 8-ene |

Fuente: `BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json` y `_etiquetas_examenes_reales_v3.json` (300 ítems etiquetados por código, sub-eje y formato).

### b.4 Preguntas por código: reales (3 exámenes con clave) · pool del banco propio · disponibles · déficit

| Código | v3 % | Reales etiquetados | Pool | Disponibles | Déficit vs demanda sembrada | Tarjetas Cifras |
|---|---|---|---|---|---|---|
| **I-3** ★ | 11 | 25 | 33 | 10 | **170** | 29 |
| **V-2** ★ | 10 | 36 | 41 | **1** | **179** | 22 |
| **IV-1+IV-2** ★ | 5 | 21 | 28 | 18 | 72 | 11 |
| **I-4** ★ | 5 | 17 | 28 | 16 | 74 | 13 |
| **II-3** ★ | 5 | 5 | 28 | 15 | 75 | 11 |
| **III-5** ★ | 5 | 15 | 29 | **0** | 90 | 8 |
| **II-5** ★ | 4 | 8 | 27 | 20 | 70 | 9 |
| **II-4** ★ | 4 | 6 | 27 | 15 | 75 | 9 |
| II-1 (rebote) | 2 | 11 | 12 | 11 | 79 | 4 |
| II-11 (rebote) | 2 | 5 | 6 | 5 | 67 | 3 |
| II-8 (rebote) | 2 | 11 | 12 | 11 | 61 | 8 |
| IV-6+IV-7 | 4 | 6 | 7 | 6 | 66 | 8 |
| III-8 | 3 | 10 | 11 | 8 | 64 | 7 |
| V-MED | 3 | 22 | 23 | 22 | 50 | 11 |
| Cola larga (17 códigos: II-2, I-10, V-6, II-6, II-10, I-5+I-6, II-EMG, I-OCC, III-3, I-11+I-12, V-1, V-3, III-1, III-9, I-1, II-9, II-7) | ≈ 30 | 2-8 c/u | 2-10 c/u | 0-8 c/u (II-6 = 0) | 13-28 c/u | 1-6 c/u |
| **Total** | 100 | **300** | **434** | **249** | **≈ 1 517** | **207** |

★ = crítico v3. Fuente: `BANCO_PROPIO/_inventario_banco_por_codigo.json` (regenerado el 31-oct). Composición del pool: 300 reales (clave oficial)
+ 84 nuevos (clave verificada contra compendio local o norma; sobre todo en II-3, II-4, II-5, III-5, I-4) + 50 espejo (`banco_items_v1.json`, 44 con molde
de clave oficial).

### b.5 Otras fuentes de preguntas (fuera del pool)

- **QX banqueo por área** (scan 20-jul-2026): SP 688 · CI 1 109 · Ética 255 · Inv y Gestión no publicados entonces. Acceso 2027-I **A VERIFICAR**.
- **Theomed**: postests por área (SP 17 · CI 13 · Ética 5 · Inv 15 quizzes), curso «Simulacros» (8 quizzes listados, 11 en el scan), kahoots.
- **QX**: «Simulacros virtuales» (3) y «Evaluación virtual avanzada» (12). Drive: carpetas de simulacros de 3 academias.
- **Sets de julio** en `TRACKING_ERRORES/*_claves.json`: 6 × 20 = 120Q (100 de I-3 + 20 mixtas de rentabilidad). Ojo: la `GUIA_POR_TEMA_2026-2.md`
  tenía claves inventadas (probado el 5-ago); estas claves no pasaron por el gate de verificación del protocolo actual.
- **Theomed «Banco de preguntas SERUMS 2025-I»** (PDF 24 pp) y diapositivas de «resolución de simulacros» (2 PDFs, 160 pp) en disco.
- **Deck Anki `ENCAPS::Cifras`**: 207 tarjetas (`TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` = `CIFRAS_CRITICAS_2027-I.md`).
  ⚠ **93 de ellas se derivaron del examen reservado** (excepción permitida por el protocolo §3-bis-LN): si el alumno estudia el deck antes del
  8-ene, el pre-test 2026-II deja de ser 100 % ciego en esas cifras. Leer su resultado con esa reserva.

---

## c) El plan ENCAPS que existe hoy

### c.1 Calendario maestro (`_fechas_v6.json`, v6.06 + v6.06e)

| Tramo | Fechas | `dia` | Qué |
|---|---|---|---|
| **F1 mantenimiento** | lun 2-nov → mié 30-dic-2026 (fechas de plan) | 1-42 | 1 h/día 16:15-17:15 · 35 `banqueo1h` + 7 mini-sims 25Q (viernes) |
| Corrida v6.06e | real: **dom 8-nov → dom 6-dic** (semana domingo-viernes, sábados libres) | — | alias: cada domingo recupera un día; desde el **lun 7-dic** el plan va en su fecha |
| Transición | 31-dic → 3-ene | — | sin ENCAPS (SKIP 25-dic, 31-dic, 1-ene) |
| **Intensiva** | **lun 4-ene → vie 12-mar-2027** | 43-92 | ENCAPS pasa a bloque principal (loop de mañana + carril B 16:15 + carril sábado) |
| Examen | **dom 14-mar-2027 PROVISIONAL** | — | días protegidos 12, 13 y 15-mar |

### c.2 F1 día a día (fecha de PLAN → fecha REAL por el alias)

Cada sesión lun-jue: eval anclada 5Q (16:15) + banco 16-20Q del código y sub-eje (16:30) + 4-5Q del secundario de cola larga (17:02) + cierre
(17:10). Viernes: mini-sim 25Q (8 II · 7 I · 5 V · 3 III · 2 IV; 50/50 viñeta-directa; umbral 18/25).

| dia | Plan | Real | Sesión (código · sub-eje + secundario) | Runner |
|---|---|---|---|---|
| 1 | lun 2-nov | **dom 8-nov** | eval (fallos previos) + **pre-test de arranque 1/2** (II-3 · V-2 · III-5 · I-3, 20Q) | listo |
| 2 | mar 3 | **lun 9** | eval II-3 + **pre-test 2/2** (II-5 · I-4 · IV-1+IV-2 · II-4, 20Q) | listo |
| 3 | mié 4 | mar 10 | V-2 · planeamiento + V-6 | listo |
| 4 | jue 5 | mié 11 | III-5 · pertinencia/barreras + II-6 | listo |
| 5 | vie 6 | jue 12 | **mini-sim 1** (cola II-2 + I-10) | listo |
| 6-9 | 9-12 nov | vie 13, dom 15, lun 16, mar 17 | II-5 adolescente + II-10 · I-4 dengue + I-5+I-6 · IV-1 método científico + II-EMG · II-4 suplementación + I-OCC | **por generar** (`--semana 2026-11-09 --eval 2026-11-09`, tras el mini-sim 1) |
| 10 | vie 13 | mié 18 | mini-sim 2 (V-6 + II-6) | listo |
| 11-14 | 16-19 nov | jue 19, vie 20, dom 22, lun 23 | II-1 prenatal · I-3 notificación · V-2 clima/calidad · III-8 Ley 27815 | por generar |
| 15 | vie 20 | mar 24 | mini-sim 3 (II-10 + I-5+I-6) | listo |
| 16-19 | 23-26 nov | mié 25, jue 26, vie 27, dom 29 | II-11 PrEP/dual/PTMI · IV-6 IMRyD · V-7 farmacovigilancia/URM · II-8 paquetes/tamizaje | por generar |
| 20 | vie 27 | lun 30 | mini-sim 4 (II-EMG + I-OCC) | **no se puede armar sin stock** |
| 21-24 | 30-nov → 3-dic | mar 1 → vie 4-dic | II-3 novedades gestante · I-3 historia natural · V-2 residuos · III-5 medicina tradicional | por generar |
| 25 | vie 4-dic | dom 6-dic | mini-sim 5 (III-3 + I-11+I-12) | por generar |
| 26-29 | 7-10 dic | en fecha | II-5 MCI · I-4 rabia · IV-1 tipos de estudio · II-4 anemia dx/tto | por generar |
| 30 | vie 11 | en fecha | mini-sim 6 (V-1 + V-3) | por generar |
| 31-34 | 14-17 dic | en fecha | II-1 parto/lactancia · I-3 causalidad · V-2 planeamiento · III-8 historia clínica | por generar |
| 35 | vie 18 | en fecha | **mini-sim 7 = CHECKPOINT DEL AÑO** (III-1 + III-9) | por generar |
| 36-39 | 21-24 dic | en fecha | II-11 sífilis/sindrómico · IV-6 ética de publicación · V-7 esenciales/SISMED · II-8 metas HTA/DM | por generar |
| 40-42 | 28-30 dic | en fecha | II-3 ESAVI/kit · I-3 sala situacional/ASIS · V-2 clima/calidad | por generar |

Rotación F1 por código: I-3 ×5 · V-2 ×5 · II-3 ×3 · III-5, II-5, I-4, IV-1, II-4, II-1, III-8, II-11, IV-6, V-7, II-8 ×2 · 7 mini-sims (14 slots de cola larga).
**18 sesiones F1 pendientes** de corrimientos anteriores ya tienen fecha en la intensiva (13 en el carril B 17-feb → 10-mar; 5 en el carril sábado).

### c.3 Intensiva (lun 4-ene → vie 12-mar-2027, sembrada en `_encaps_intensivo_2027.sql` v6.06)

| Fecha | `dia` | Qué |
|---|---|---|
| lun 4-ene | 43 | re-scan de señales (convocatoria, normas nuevas, boletín DGE, tendencias QX) |
| mar 5 → jue 7 | 44-46 | calentamiento I-3 / V-2 / II-3 (sin material nuevo) |
| **vie 8-ene** | **47** | **PRE-TEST 2026-II** 100Q / 120′ (07:15-09:15). Gate: ≥ 70 % bruto / ≥ 55 % ciego |
| lun 11-ene → jue 4-mar | 48-86 | **32 slots de barrido** de los 8 críticos: I-3 7 · V-2 5 · II-3 4 · I-4 4 · IV-1+IV-2 4 · III-5 3 · II-4 3 · II-5 2 (re-ordenable con `--pretest`) |
| viernes 15-ene → 5-mar | 52 … 87 | **8 SIM 100Q**: #1 2025-II real · #2 Theomed/QX · #3 propio · #4 2024-II real · #5 QX/Theomed · #6 propio · #7 2025-I real · #8 propio. Umbral ≥ 85 % bruto / ≥ 75 % ciego hacia el D-2 |
| lun 8-mar | 88 | pasada profunda del sub-eje peor |
| mar 9 · mié 10 | 89-90 | repaso final (errores + cifras + mapas en blanco) |
| **jue 11-mar** | 91 | **dress rehearsal** 100Q (2026-I si hay clave por consenso; si no, propio) |
| vie 12-mar | 92 | medio día (30′ de cifras + hoja de errores) |

Loop diario lun-jue (horas heredadas, «a confirmar»): 05:00 Anki cifras · 07:15 repaso D-1/D-3/D-7 · 08:15 pre-test 10Q del sub-eje (gate 80 %) ·
09:00 deep prime + drill de cifras · 11:00 consolidación 30Q · 12:00 cierre · 17:15 anclaje · 18:00 eval 20Q. Carril B 16:15: 26 `banqueo1h` (4-ene → 16-feb)
+ 13 reposiciones (17-feb → 10-mar). Carril sábado 09:30: sáb 9, 16, 23, 30-ene y 6-feb.

### c.4 Runners y herramientas

| Pieza | Estado |
|---|---|
| `DATA/_scripts/gen_encaps_minisim.js` | generador único: `<viernes>` mini-sim · `--banco` · `--eval` · `--semana` · `--pretest-arranque` · `--pretest` (2026-II) · `--sim100 2024-2A/2025-1A/2025-2/propio` · `--registrar --append` · `--inventario` · `--realinear` · `--refrescar` |
| `gen_encaps_semana.js` | cierre de 1 línea (`--cerrar`), perfil (`--perfil`), override semanal por temas calientes |
| `gen_encaps_mantenimiento_2027.js` / `gen_encaps_intensivo_2027.js` | siembra Supabase (F1 y F2); el de la intensiva se re-ejecuta con `--pretest <export>` tras el 8-ene |
| `gen_encaps_guia.js` + `encaps_guia_catalogo.js` → `src/lib/encapsGuia.ts` | guía «qué·cuánto·cómo» de cada sesión F1 y sábados F2 |
| `sync_encaps_bp_web.js` | publica los runners en `public/encaps/bp` (bloquea cualquier mención al examen reservado) |
| `src/lib/encapsPlan.ts` | lee el régimen vivo y la capa de alias v6.06e |
| **Runners ya generados (11)** | pre-test de arranque ×2 · eval ×4 (plan 2-5 nov) · banco ×2 (plan 4-5 nov) · mini-sim ×3 (plan 6, 13, 20-nov) |

### c.5 Qué falta generar (en orden de urgencia)

1. **Tanda 0 de stock** antes del jue 12-nov real: `set_cola_larga_2` (II-10, II-EMG, I-OCC) y `set_II-4_2`.
2. **Runners de la semana de plan 9-nov** (`--semana 2026-11-09 --eval 2026-11-09`) el jue 12 real, tras el mini-sim 1; luego cada semana.
3. **Tandas 1-6** (≈ 414Q hasta el 30-dic + ≈ 28Q para que los mini-sims 27-nov → 18-dic lleguen a 25Q): primero I-3, V-2, II-1, III-8 (antes del
   mini-sim 2) y después II-11, IV-6+IV-7, II-8, II-3, III-5, II-5, I-4, IV-1+IV-2, II-4.
4. `pretest_2026-II.html` (`--pretest`) antes del lun 4-ene; ensayo del `--pretest` del generador de la intensiva en enero.
5. 3 SIM 100Q reales (listos para generar) + **3 «propios» (#3, #6, #8) que exigen ≥ 100 ítems libres cada uno con la mezcla del vector** → ≈ 300
   ítems nuevos, más el loop diario de la intensiva (≈ 40-60Q/día × 32 slots, estimación) y el dress rehearsal.
6. Confirmar accesos 2027-I a QX/Theomed (SIM #2 y #5) y conseguir la clave del 2026-I (dress rehearsal).

---

## d) Registro de rendimiento real del alumno

| Fecha | Ronda | Código | Resultado | % ciego |
|---|---|---|---|---|
| 2-jul-2026 | pre-test ciego set A | I-3 | 4/20 (bajo el azar; modelos invertidos: activa↔pasiva, endemia↔epidemia, VPP↔oportunidad) | 0 % (0 seguras) |
| 28-jul-2026 | warm-up SET2 | I-3 | 16/20 | 80 % |
| **Global** | 2 rondas | 1 código | 40 resueltas, 16 seguras | **40 %** |

- Patrón de error: **CCSN (confusión entre conceptos vecinos) 10/20**, CONCEPTO 8, CRONOLOGÍA 2; ningún error de proceso.
- `PERFIL_CONOCIMIENTO.md` (generado el 20-oct): 1/8 críticos medido; los otros 7 sin línea base.
- **No rindió** el ENCAPS 2026-II (9-ago-2026). Pre-test de arranque y mini-sims: **no rendidos** (los 2-7 nov figuran como `sin_sesion`).
- No existe la carpeta `SEMANAS/` (ningún cierre semanal ni override). `study_progress` en Supabase no se consultó.

---

## e) Huecos (temas sin material o sin preguntas)

**Sin video QX y sin ficha propia:** II-EMG (triaje/prioridades de emergencia, RM jul-2026 con número A VERIFICAR) e I-OCC (salud ocupacional):
0 videos QX, 0 Theomed, 2 gaps cada uno. También sin video QX: III-3 (consentimiento/retiro voluntario), III-4+III-7, IV-4, I-7, I-8, I-9, II-13.

**Gaps del compendio** (sub-temas nombrados pero no desarrollados; `encapsCobertura.ts`): **50 en total**; los más pesados en I-3 (4: canal
endémico, curva epidémica, tasa de ataque secundaria, directiva RENACE), V-7+V-10 (3), II-8 (3), I-11+I-12 (3) y V-2 (2).

**Normas sin PDF en disco:** todo el eje II (esquema de vacunación con su modificatoria de la hexavalente, CRED, adulto, adolescente, anemia, TB,
ITS), todo el eje V (POI/PEI, categorización, residuos sólidos, calidad, clima organizacional, telesalud) y el IV. Números de norma pendientes de
confirmar en `SENALES_2027-I.md`: esquema vigente y CRED (contradicción interna del manual), adulto 2025, 2.º nivel de pertinencia cultural, malaria 2025.

**Sin preguntas suficientes (disponibles hoy):** III-5 0 · V-2 1 · II-6 0 · II-10 2 · II-EMG 2 · II-2 2 · III-9 2 · I-OCC 3 · V-6 3. II-3, II-4 y II-5 tienen
solo 5-8 reales con clave; el resto de su pool son ítems nuevos.

**Eje V (Gestión, 21 % del examen):** 3 fichas QX de 105, ninguna norma, compendio solo 2026-I, banqueo QX del área no publicado al 20-jul.

**Sin dato para la meta «primer puesto»:** no hay en el repo notas de los primeros puestos de procesos anteriores ni la regla de descuento; la
referencia interna es «≥ 17 ≈ percentil 1 % (~2 000 plazas)» (memoria del proyecto), que no equivale al primer puesto.

**Vigía de señales parado:** última revisión registrada 5-sep-2026; la convocatoria 2027-I no se ha vuelto a mirar; la tarea quincenal estaba por crear.

**Obsidian `06_ENCAPS/ENCAPS_2026`:** 97 notas (94 de temario: SP 31 · CI 30 · Ética 9 · Inv 7 · Gestión 17 + dashboard y plantillas), todas en
estado `vacio`, 0 APEX. No hay conocimiento propio escrito.

---

*Fuentes principales: `PRONOSTICO_WALKFORWARD_2027-1_v3.md` · `PROTOCOLO_HORA_MANTENIMIENTO.md` · `FASE_INTENSIVA_2027-I.md` ·
`METODO_SIMULACRO_ENCAPS.md` · `META_NIVEL_METODO_ENCAPS.md` · `CIFRAS_CRITICAS_2027-I.md` · `SENALES_2027-I.md` · `ANALISIS_EXAMEN_2026-2_REAL.md` (solo §2,
resumen por área) · `BANCO_PROPIO/README.md` e inventario · `RUNBOOK_SEMANA2_2026-10-26.md` · `TRACKING_ERRORES/` · `_qx_*.json` · `_theomed_*.json` ·
`_scripts/_fechas_v6.json` · `_encaps_mantenimiento_2027.sql` · `_encaps_intensivo_2027.sql` · `src/lib/encaps*.ts` · memoria `encaps-*.md`.*
