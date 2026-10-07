# PROPUESTA v6.00: reestructuración definitiva desde el mié 7-oct-2026

**Estado:** es una propuesta para que la leas y decidas. Todavía no se ha tocado el repo, Supabase ni el Calendar.
**Fecha:** mar 6-oct-2026.
**Base:** 3 informes (SERUMS/EsSalud/ENCAPS, momento del Step 1, mapa del sistema), 2 diseños (max-nota, max-viabilidad) y 2 críticas (exámenes y medicina, calendario y vida real). Todas las fechas y horas están recalculadas con node en `scratchpad/v600/final/calc.js` y `calc2.js`, además de los scripts de los diseñadores y críticos, que se re-ejecutaron.

**Etiquetas:**
- **[H]** hecho verificado (URL o `fichero:línea`).
- **[S]** supuesto.
- **[C]** cálculo con node.
- **[DJ]** decides tú (§8).

---

## 0. Resumen en 10 líneas

1. **Qué cambia.** El Step 1 se parte en dos tramos y el ENCAPS pasa a ser el bloque principal de la mañana desde el **lun 4-ene**. El Step 1 ya no se rinde en febrero: se rinde después del ENCAPS, dentro del SERUMS.
2. **Mañana, mié 7-oct, no cambia nada.** D1 = UWSA1 y pre-test ENCAPS a las 16:15. Único ajuste sugerido: empezar el UWSA1 a las 08:15 para tener pausas.
3. **F1 · mié 7-oct → mié 30-dic (60 sesiones).**
   - Step 1 a 6h15/día: D1-D57 idénticos a v5.20, con los mismos 5 hitos.
   - D58 = bioestadística/epi/ética. D59-D60 = colchón y consolidación.
   - Microbiología pasa entera a 2027.
   - ENCAPS va "lento": 1 h diaria, 60 sesiones.
4. **F2 · lun 4-ene → examen ENCAPS.** Planificación: **dom 14-mar PROVISIONAL**; lo probable es entre el 21-mar y el 25-abr.
   - ENCAPS: ~32 h/semana, con núcleo fijo de 9 semanas y una cola de 5 días anclada al examen.
   - Step 1 en mantenimiento: ~4,5 h/semana.
5. **F3 · martes siguiente al ENCAPS → vie 30-abr.** Step 1 a tiempo completo; el NBME 29 sirve de nueva línea base.
6. **F4 · SERUMS (supuesto lun 3-may) → examen Step 1.** Piso de 18 h/semana de Step 1 con turno mañana; ~28 h con turno tarde. Sueño de 7 h intacto.
7. **FECHA OBJETIVO del Step 1: LUN 27-SEP-2027.**
   - Eligibility **ago-sep-oct**.
   - Si el ENCAPS cae ≤21-mar → mar 31-ago. Si cae ≥25-abr → lun 25-oct.
   - **GO/NO-GO el lun 9-ago** (E-49, antes de que empiece el recargo por cambio).
8. **Cifras.**
   - Step 1: de ~594 h (v5.20) a ~850-1.000 h.
   - ENCAPS: de ~170 h a ~380-575 h.
   - Slots de barrido ENCAPS: de 4 a 32. Simulacros 100Q: de 1 a 8-14.
9. **No encontrado en ninguna fuente:**
   - horario de turnos del Centro Médico Concepción de EsSalud;
   - fecha del ENCAPS 2027-I;
   - inicio del SERUMS 2027-I;
   - si Prometric Lima toma el USMLE.
   Todo esto se maneja con escenarios y reglas, no con fechas inventadas.
10. **Fin del corrimiento diario.** Un día perdido ya no mueve ningún examen: se paga con colchón.
    - Hay 2 niveles de carga, con disparador automático, porque con 12,25 h/día planificadas se cumplieron 0 de 27 hábiles.
    - Quedan 5 decisiones tuyas en §8.

---

## 1. Línea de tiempo por fases

Fechas y días de la semana verificados con node [C].
- Feriados 2026 que **sí son sesión** (como en v5.20): jue 8-oct, mar 8-dic, mié 9-dic.
- Días sin sesión: vie 25-dic, jue 31-dic, vie 1-ene, jue 25-mar y vie 26-mar (Semana Santa 2027), además de sábados y domingos hasta mayo.

| Fase | Desde | Hasta | Hábiles | Bloque principal | Meta de salida |
|---|---|---|---|---|---|
| **F1** Step 1 tramo 1 | **mié 7-oct-2026** | **mié 30-dic-2026** | 60 (D1-D60) | Step 1 6h15 L-V. ENCAPS mantenimiento 1 h (16:15) | NBME 28 del mar 22-dic = foto antes de la pausa |
| Transición | jue 31-dic | dom 3-ene | — | Libre (Anki) | — |
| **F2** ENCAPS intensiva | **lun 4-ene-2027** | examen ENCAPS: **dom 14-mar PROVISIONAL** (probable 21-mar → 25-abr) | 50 (14-mar) · 55 (21-mar) · 63 (4-abr) · 68 (11-abr) · 73 (18-abr) · 78 (25-abr) | ENCAPS de mañana (~32 h/sem). Step 1 en mantenimiento (~4,5 h/sem) | ENCAPS ≥17/20 (decide la plaza: PF = 0,3·PPP + 0,7·nota, [H] instructivo 2026-I §4.28) |
| **F3** Step 1 reinicio | **martes siguiente al ENCAPS** (plan.: mar 16-mar) | vie 30-abr, o el día previo al inicio real del SERUMS | 32 (14-mar) · 27 · 19 · 14 · 9 · 4 (25-abr) | Step 1 a tiempo completo (7h15) | NBME 29 = nueva línea base. Microbiología entera |
| **F4** Step 1 + SERUMS | **lun 3-may-2027 [S]** (1-may = sáb feriado) | **examen lun 27-sep-2027** | 21 semanas | SERUMS 6 h/día + Step 1 (piso 18 h/sem) | Step 1 aprobado al 1.er intento, con NBME ≥70 % |
| F5 (esbozo) | mar 28-sep-2027 | fin del SERUMS (~30-abr-2028) | — | MIR principal a medio tiempo. Vuelven Derma c2, Research c2, CURVA/DENSA | — |

**Hitos que estructuran el año:**

| Fecha | Hito |
|---|---|
| mié 7-oct | UWSA1 (D1) |
| mar 20-oct | NBME 25 |
| mar 10-nov | NBME 26 |
| lun 16-nov | Deload |
| mar 1-dic | NBME 27 |
| vie 18-dic | Último mini-sim ENCAPS del año = checkpoint |
| mar 22-dic | NBME 28 |
| lun 28 → mié 30-dic | Semana deload con D58-D60 |
| lun 4-ene | Arranca la intensiva ENCAPS |
| vie 8-ene | PRE-TEST 2026-II, 100Q |
| vie 15-ene → vie 5-mar | 8 SIM 100Q los viernes |
| jue 11 / vie 12-mar | D-2 / D-1 (escenario 14-mar) |
| dom 14-mar | ENCAPS (provisional) |
| mar 16-mar | Reinicio Step 1 (si el ENCAPS es el 14-mar) |
| lun 3-may | SERUMS [S] |
| dom 1 y dom 8-ago | NBME 31 y NBME 32 |
| lun 9-ago | **GO/NO-GO** |
| dom 19-sep | Free 120 + 3 bloques |
| lun 27-sep-2027 | **STEP 1** |

**Entre el ENCAPS y el SERUMS** ([H], antecedentes 2025-I a 2026-II):
- Pasan **17-53 días**.
- Hay resultados (≈4-5 días después), inscripción aparte en SERUMS Digital y **adjudicación por Zoom** (quien no está presente queda "AUSENTE").
- Entrega de documentos el día de inicio, **inducción propia de EsSalud** y 3 días hábiles para presentarse.
- Esos días se bloquean en el Calendar apenas salga el cronograma. Ningún hito puede caer en la adjudicación.

---

## 2. Plantillas semanales (con horas netas)

### 2.0 Regla de carga de dos niveles (nueva en v6)

**Por qué:** la plantilla F1 programa **12,25 h de estudio al día**, de 04:15 a 18:45 [H `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md:121-151`]. Desde el 31-ago se cumplieron **0 de 27 hábiles** [H `DATA/PROTOCOLO_MODO_MINIMO.md:8`].

| Nivel | Qué entra | Cuándo se hace |
|---|---|---|
| **NÚCLEO** | F1/F3/F4: Step 1 (+ ENCAPS 1 h en F1). F2: ENCAPS + Anki USMLE + Step 1 del sábado | Todos los días, también en ÁMBAR (en versión mínima en ROJO, `PROTOCOLO_MODO_MINIMO.md`) |
| **SOLO EN VERDE** | MIR, Research↔Derma, AURUM, LIVIANO, SYNAPSE/vibecoding | Solo si el día es VERDE |

**Disparador automático:**
- Si el núcleo queda por debajo del 80 % dos semanas seguidas, se suspende todo el nivel secundario.
- Se reactiva tras 2 semanas con el núcleo ≥90 %.
- Se mide el sábado en la revisión semanal.

**Otras reglas de carga:**
- **Arranque:** la semana 1 (mié 7 → vie 9-oct) empieza en **ÁMBAR**: núcleo obligatorio, secundarios opcionales.
- **Franjas que se liberan en febrero** (SYNAPSE 12:30 desde el 16-feb, LIVIANO 17:15 desde el 15-feb, vibecoding 04:15 desde el 22-feb): **no se rellenan**. Son la válvula de descanso.
- **Gimnasio/baile y sueño 21:00→04:00:** innegociables en todas las fases. Saltarse el gimnasio "para estudiar" cuenta como ROJO conductual (`PROTOCOLO_MODO_MINIMO.md:28`).

### 2.1 F1 (mié 7-oct → mié 30-dic): plantilla v5.20 sin cambios de hora

| Hora | Bloque | Nivel |
|---|---|---|
| 04:15-05:00 | Vibecoding (SYNAPSE) | secundario |
| 05:00-05:45 | USMLE Anki AM | núcleo |
| 05:45-07:15 | Correr, calistenia, ducha, desayuno | — |
| 07:15-12:00 | USMLE: repaso D-1/D-3/D-7 · pre-test 10Q · deep prime · 30Q | núcleo |
| 12:30-13:00 | SYNAPSE | secundario |
| 13:30-14:15 | Research ↔ Derma | secundario |
| 14:15-15:15 | AURUM | secundario |
| 15:15-16:15 | MIR | secundario |
| 16:15-17:15 | **ENCAPS mantenimiento (rotación v3)** | núcleo |
| 17:15-18:00 | LIVIANO | secundario |
| 18:00-18:45 | USMLE eval acumulativa | núcleo |
| 19:00-20:30 | Gimnasio/baile · 21:00 dormir | — |

**Ajustes de franja en los días de hito** (el NBME son 4 × 50Q a 75' = **5 h netas**, [H nbme.org]; la franja de v5.20 de 07:15 a 11:00 se queda corta en 75'):
- **NBME 25/26/27/28 de 07:00 a 12:30**, sin las 30Q de las 11:00.
- **UWSA1:** de 08:15 a 12:45, sin el pre-test 10Q del D1.

### 2.2 F2 (lun 4-ene → examen ENCAPS): ENCAPS de mañana

**Lunes a jueves**

| Hora | Bloque | Nivel |
|---|---|---|
| 04:15-05:00 | Vibecoding (hasta vie 19-feb). Después **libre** | secundario |
| 05:00-05:15 | Anki ENCAPS::Cifras | núcleo |
| 05:15-05:45 | **Anki USMLE: solo repasos, 0 nuevas, FSRS 0,85** | núcleo |
| 05:45-07:15 | Correr, calistenia, ducha, desayuno (sin cambio) | — |
| 07:15-08:15 | ENCAPS repaso espaciado **D-1 / D-7 / D-21** | núcleo |
| 08:15-09:00 | ENCAPS pre-test 10Q ciego del sub-eje | núcleo |
| 09:00-11:00 | ENCAPS deep prime (norma/NTS + cifras) | núcleo |
| 11:00-12:00 | ENCAPS consolidación 30Q + cierre de 1 línea | núcleo |
| 12:30-13:00 | SYNAPSE (hasta lun 15-feb). Después libre | secundario |
| 13:30-14:15 | Research ↔ Derma | secundario |
| 14:15-14:45 | **AURUM a 30'** (hasta mié 14-abr) | secundario |
| 15:15-16:15 | MIR (diario hasta mié 27-ene, después mantenimiento) | secundario |
| 16:15-17:15 | **ENCAPS carril B**: las filas 61-92 del mantenimiento en su misma fecha (4-ene → 16-feb). Después repone instancias perdidas y lista de vigilancia | núcleo |
| 17:15-18:00 | LIVIANO (hasta vie 12-feb). Después libre | secundario |
| 18:00-18:45 | ENCAPS eval en modo examen, 20Q a 72 s: **10 del sub-eje del día + 10 de hace 7-21 días** | núcleo |
| 19:00-20:30 | Gimnasio/baile · 21:00 dormir | — |

**Viernes**

| Hora | Bloque |
|---|---|
| 05:00-05:45 | Anki ENCAPS + USMLE |
| 07:15-09:15 | **SIM 100Q** (los 2 últimos SIM y el D-2 van de **11:00 a 13:00**, la hora del 2026-I, [prensa]) |
| 09:30-11:00 | Corrección por código + `--registrar` |
| 11:00-12:00 | Los 2 códigos peores |
| 16:15 | Libre (descanso después del SIM) |
| 18:00-18:45 | `--pull` y cierre semanal |

**Sábado**
- 07:15-07:45: revisión semanal.
- **07:45-09:15: STEP 1 VIVO.** 20Q timed **mezcladas** de todos los sistemas de F1 (10 incorrectas de UWorld + 10 nuevas de **AMBOSS**, para no gastar UWorld) y revisión.
- El resto del día, libre (SYNAPSE PC hasta el 13-feb, en nivel secundario).

**Domingo:** libre, con Anki de 15' a las 17:00.

### 2.3 F3 (martes siguiente al ENCAPS → vie 30-abr): Step 1 a tiempo completo
- **Igual que F1 en Step 1** (05:00 Anki · 07:15-12:00 · 18:00 eval), más estos ajustes:
  - **04:15-05:00:** Anki de choque, solo la primera semana, por los repasos acumulados en la pausa. FSRS vuelve a 0,90 el día 1.
  - **16:15-17:15:** reentrada (20Q timed de un sistema de F1 + revisión) en la franja que deja ENCAPS.
- **Día 1:** reentrada. **Día 2:** **NBME 29** de 07:00 a 12:30.
- **Lunes posterior al ENCAPS:** libre.
- **Sábado y domingo:** libres, salvo los trámites del SERUMS.
- **Secundarios de F3 (solo en verde):** Research↔Derma, AURUM hasta el 14-abr, MIR mantenimiento hasta el 22-abr.

### 2.4 F4-M: SERUMS turno MAÑANA (07:00-13:00, lunes a sábado [S])

Supuesto [S]: vives en Huancayo, con unos 40' de traslado a Concepción. Si vives en Concepción ganas unos 70' al día.

| Hora | Bloque |
|---|---|
| 04:00-04:05 | Despertar, agua |
| **04:05-05:55** | **STEP 1 · BLOQUE A (1h50)**: preguntas nuevas timed o contenido nuevo. "Study before work, not after" [H `PALMERTON_METODO_COMPLETO.md:1311`] |
| 05:55-06:20 | Ducha + desayuno (≥30 g de proteína) |
| 06:20-07:00 | Traslado |
| 07:00-13:00 | SERUMS |
| 13:00-13:40 | Traslado (Anki USMLE 25' en el móvil si no marea; si no, audio) |
| 13:40-14:30 | Almuerzo + siesta ≤20' |
| **14:30-16:00** | **STEP 1 · BLOQUE B (1h30)**, solo carga baja: revisar incorrectas, Anki, relectura de FA o Pathoma. Después del hospital se rinde "2-4× más lento" [H `PALMERTON_METODO_COMPLETO.md:1294`] |
| 16:00-18:30 | Libre, vida, trámites; cena a las 18:00 |
| 18:45-20:30 | Viaje + **gimnasio/baile de 19:00 a 20:30 (se mantiene)** |
| 21:00-04:00 | Dormir 7 h |

- **Domingo:** 06:00 caminata · 07:00-07:20 revisión semanal · **07:30-12:30 bloque largo de 5 h** · 17:00 Anki · 18:00-19:30 baile.
  - Los domingos con hito: examen de 06:30 a 12:00 y revisión de 14:00 a 16:00.
- **1 domingo libre al mes sin hito:** dom 16-may, 13-jun, 11-jul, 22-ago y 12-sep.
- Si el sábado no hay turno: bloque de 07:30 a 11:30.

### 2.5 F4-T: SERUMS turno TARDE (13:00-19:00)

| Hora | Bloque |
|---|---|
| **04:05-06:05** | **STEP 1 · BLOQUE A (2 h)**, contenido nuevo |
| 06:10-07:00 | **Gimnasio movido a la mañana.** Con salida a las 19:00 y 40' de vuelta, el gimnasio nocturno solo cabe recortando sueño |
| 07:00-07:40 | Ducha + desayuno |
| **07:40-10:10** | **STEP 1 · BLOQUE B (2h30, con pausa de 10')**: 40Q timed + revisión |
| 10:10-10:35 | Anki USMLE |
| 10:35-11:20 | Bloque C opcional (colchón, o Research/MIR si toca) |
| 11:20-12:00 | Almuerzo |
| 12:20-13:00 | Traslado |
| 13:00-19:00 | SERUMS |
| 19:00-19:40 | Traslado (audio, sin pantalla) |
| 19:40-20:15 | Cena |
| 20:15-21:00 | Higiene, sin pantallas · 21:00 dormir |

- **Sábado con turno:** bloque A (2 h) + bloque B (1 h).
- **Domingo:** como en F4-M; el baile pasa al domingo de 18:00 a 19:30.
- **Variante 12:00-18:00:** bloque A 04:05-06:05 · bloque B 07:00-09:30 · Anki 09:30 · salida 11:20 · **gimnasio de 19:00 a 20:00 (se mantiene por la tarde)**.
- **Variante 14:00-20:00:** todo el día se corre 30', dormir de 21:30 a 04:30 · bloque A 04:35-06:35 · gimnasio 06:40-07:30 · bloque B 08:00-10:30 · bloque C 10:30-12:00.

### 2.6 Horas netas por semana

| Fase | Núcleo | Secundario (solo en verde) | Notas |
|---|---|---|---|
| F1 | **36,25 h** (Step 1 31,25 + ENCAPS 5) | ≤25 h | Total planificado 61 h, igual que hoy, pero el compromiso es el núcleo |
| F2 | **≈37 h** (ENCAPS ≈32,5 + Step 1 ≈4,5) | ≈21 h hasta mediados de feb; ≈11 h después | La carga baja sola en febrero |
| F3 | **36,25 h** de Step 1 (~27,5 productivas) | ≤11 h | Sábado y domingo libres |
| F4-M | Step 1 bruto ≈25,5 h → **18-20,5 h efectivas** | MIR: Anki 10'/día | Más el SERUMS (36 h) y unos 8 h de traslados |
| F4-T | Step 1 bruto ≈31-33 h → **28-30,5 h efectivas** | Ídem | Al 26-sep el turno tarde suma **≈+190 h frente al turno mañana (M) y ≈+240 h frente al piso** [C] |

---

## 3. USMLE Step 1

### 3.1 Qué se hace hasta el 31-dic (F1, D1-D60). Adoptado salvo que lo vetes

**D1-D57 (mié 7-oct → jue 24-dic): idénticos a v5.20.**
- Contenido: Fundamentos, Inmuno, Cardio, Resp, Renal, GI, Endo, Neuro y **Heme/Onco, que termina el D57** [H `src/lib/usmleStep1Daily.ts`, D51-D57].
- Los **5 hitos conservan su D# y su fecha** (regla R2): UWSA1 mié 7-oct · NBME 25 mar 20-oct · NBME 26 mar 10-nov · NBME 27 mar 1-dic · NBME 28 mar 22-dic.
- También siguen los deloads del lun 16-nov y lun 28-dic y los ids del Calendar.

**Único cambio: D58-D60 (semana deload del 28 al 30-dic).**

| D | Fecha | v5.20 | **v6** |
|---|---|---|---|
| D58 | lun 28-dic | Bacteriología general + Gram+ cocos | **Bioestadística + epidemiología + ética/comunicación** (el antiguo D79, AMBOSS HY) |
| D59 | mar 29-dic | Gram+ bacilos, anaerobios, Gram− cocos | **C1: colchón o consolidación** |
| D60 | mié 30-dic | Gram− bacilos, zoonosis | **C2: colchón o consolidación** |

Por qué:
1. **Microbiología no queda partida 3+4 alrededor de una pausa de 11-17 semanas.** Es la materia que más depende de la memoria, y lo último que se aprende antes de un parón es lo que antes se olvida (crítica de exámenes, §C3).
2. **La bioestadística se repasa sola entre enero y marzo**, porque es la misma materia que los sub-ejes ENCAPS IV-1 (método científico, tipos de estudio, muestreo) e I-3 (causalidad).
3. **C1 y C2 absorben hasta 2 días perdidos en F1** sin mover el 4-ene. Si no se pierde ninguno, sirven para la 2.ª pasada de incorrectas de los 9 sistemas y para cerrar Anki antes de la pausa.
4. **No se recorta nada:** Micro (7 días) pasa entera al tramo 2. Si se pierden 3 días o más, la bioestadística vuelve al tramo 2.

**Cobertura al 30-dic** [H, inv:timing]:
- 9 sistemas + bioestadística.
- **≈64 % del banco UWorld por sistema** (`PALMERTON_METODO_COMPLETO.md:380`).
- Unas **1.900-2.000 preguntas de UWorld usadas** de 3.659.
- 375 h brutas.

**Checkpoints de cumplimiento** (gates sobre el núcleo):

| Gate | Fecha | Si el núcleo hecho < 85 % |
|---|---|---|
| 1 | vie 30-oct (D18) | Se suspenden los secundarios (§2.0) y se descuentan del colchón del Step 1 5,5 h por cada D perdido |
| 2 | vie 27-nov (D38) | Ídem |

### 3.2 Mantenimiento de enero a abril (F2)

- **Anki USMLE: 0 tarjetas nuevas desde el 31-dic.**
  - FSRS a 0,85 desde el 4-ene y de vuelta a 0,90 el día del reinicio.
  - 30' de lunes a viernes a las 05:15 y 15' el fin de semana.
- **Sábado de 07:45 a 09:15:** 20Q timed **mezcladas de todos los sistemas** de F1 (10 incorrectas de UWorld + 10 nuevas de AMBOSS) y revisión.
  - Se corrigen dos fallos de los diseños: la franja del viernes a las 16:15 (después del SIM 100Q) y los bloques de 2 sistemas por semana.
  - Mezclar los sistemas es mejor (intercalado, g = 0,42, [Brunmair & Richter 2019](https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf)).
- **Ningún NBME ni UWSA en F2.**
- **Coste** [C]: ≈4,5 h/semana, es decir **43-70 h** en total, según el ENCAPS caiga entre el 14-mar y el 25-abr (9 a 15 sábados).
- **Evidencia:**
  - Custers 2010: sin repaso se retienen 2/3 a 3/4 de las ciencias básicas a 1 año ([Springer](https://link.springer.com/article/10.1007/s10459-008-9101-y)).
  - Deng 2015: Anki solo aporta ~1 punto por cada ~1.700 tarjetas ([PubMed](https://pubmed.ncbi.nlm.nih.gov/26498443/)). **Por eso las preguntas semanales no son opcionales.**
- **Duración de la pausa** [C]: 10,7 semanas (ENCAPS 14-mar) · 13,7 (4-abr) · 14,7 (11-abr) · 15,7 (18-abr) · 16,7 (25-abr).

### 3.3 Reanudación: tramo 2

**Modelo de datos:** el tramo 2 es un **array aparte T1…Tn, una fila por fecha**, con `dOrig` (el D de v5.20 al que corresponde).
- No se usa `fechas[]` por D: `diaDe()` y `planHoyD()` buscan por `x.fecha === iso` [H `usmleStep1Daily.ts:129`, `studyProgress.ts:52-58`].
- Durante la pausa, la app muestra un estado **PAUSA**, no el D61 como "hoy".

**Paquete "sí o sí": 399 h productivas desde el reinicio** (mínimo 275 h, inv:timing):

| Paquete | Mínimo / sí o sí | Cuándo |
|---|---|---|
| Contenido pendiente: **Micro 7** · Repro 5 · MSK 3 · Psiq 3 · Bioq 2 (dobles) · +2 días de "sí o sí" (ética/comunicación y 2.ª vuelta de bioestadística) | 81 / 108 h | Micro en F3 a tiempo completo; el resto en el bloque A de mayo → fin de junio |
| Reactivar los 9 sistemas de F1 (bloques timed por sistema) | 54 / 90 h | Intercalado mayo-julio (bloque B y domingos) |
| UWorld fresco random timed (≈520 Q) | 25 / 39 h | Julio |
| 2.ª pasada de incorrectas (≈1.280 Q) + sistemas débiles | 24 / 51 h | Fin de julio → agosto |
| 8 evaluaciones de 2027 + ensayo de resistencia | 61 / 61 h | §3.4 |
| Consolidación final: FA rapid review, Pathoma 1-3, AMBOSS 200 (antiguos D90-D95) | 30 / 50 h | lun 30-ago → dom 19-sep |
| **Total** | **275 / 399 h** | |

**Taper:**
- lun 20 → jue 23-sep (última sesión de banco), 2 h/día.
- vie 24 ligero · sáb 25 descanso · **dom 26 viaje a Lima** · **lun 27 examen**.

### 3.4 Hitos y fechas nuevas

Son los 12 de siempre (ninguno se borra) más **UWSA3 opcional**, que es formativo.
- Qbankly tiene NBME 21-33 y UWSA 1/2/3 [H `DATA/USMLE/README.md:380`]: **no hay escasez de formularios**.
- **Riesgo real:** que el acceso a Qbankly no llegue a sep-oct de 2027. Verificarlo.

Mínimos on-track [S]:
- Salen de Palmerton: +5 %/mes a tiempo completo (`:1112`). El UWSA sobreestima 10-15 puntos (`:1593`).
- ≥65 % ≈ 95 % de probabilidad de aprobar; ≥70 % ≈ 99 % (`:1076-1077`).
- **Se recalibran con el NBME 25 y el NBME 28.**

**Calendario base (examen lun 27-sep):**

| Hito | Fecha | E-n | Mínimo / regla |
|---|---|---|---|
| UWSA1 | mié 7-oct-2026 (D1) | — | Línea base (NBME-eq ≈ UWSA1 − 10/15) |
| NBME 25 | mar 20-oct (D10) | — | Línea base NBME real |
| NBME 26 | mar 10-nov (D25) | — | ≥ NBME 25 + 3 |
| NBME 27 | mar 1-dic (D40) | — | ≥ NBME 25 + 6 |
| **NBME 28** | **mar 22-dic (D55)** | — | **Checkpoint de fecha:** ≥58 % → 27-sep en ruta · 50-57 % → 27-sep con gate estricto · **<50 % → la base pasa al 25-oct** [S] |
| **NBME 29** | **reinicio + 1 hábil** (p. ej. mié 17-mar o mié 14-abr) | — | Nueva línea base. ≥ NBME 28 − 5. **Caída >8 puntos → +2 semanas de reactivación** (paga el colchón) |
| NBME 30 | dom 30-may | E-120 | ≥ NBME 28. Ritmo real medido ≥18 h/sem |
| UWSA3 (opcional) | dom 27-jun | E-92 | Señal formativa |
| NBME 31 | dom 1-ago | E-57 | ≥65 % |
| NBME 32 | dom 8-ago | E-50 | 31 y 32 ≥68 %, al menos uno ≥70 % |
| **GO/NO-GO** | **lun 9-ago** | **E-49** | Antes del E-46 (jue 12-ago): **cambiar es gratis** |
| UWSA2 | dom 15-ago | E-43 | "Low risk" (señal secundaria) |
| NBME 33 | dom 29-ago | E-29 | ≥68 %. **<65 % → 25-oct, pagando el recargo** |
| Free 120 + 3 bloques random (ensayo de 7 bloques) | dom 19-sep | E-8 | ≥70 % de aciertos [S] |
| Última sesión de banco | jue 23-sep | E-4 | — |
| D-1 | dom 26-sep | E-1 | Viaje a Lima |
| **EXAMEN** | **lun 27-sep-2027** | 0 | Basta 1 día de permiso (2 si hay turno de mañana el martes) |

- Los hitos de 2027 van en **domingo**, no en feriados: EsSalud puede programar turnos en feriados [H directiva 012].
- Los feriados (lun 7-jun, mar 29-jun, vie 23-jul, mié 28 y jue 29-jul, vie 6-ago, lun 30-ago) quedan como días dobles para temas débiles si no hay turno.

**Calendario de adelanto (examen mar 31-ago; solo si el ENCAPS es ≤21-mar):**

| Hito | Fecha | E-n |
|---|---|---|
| NBME 29 | Reinicio + 1 | — |
| NBME 30 | dom 30-may | — |
| NBME 31 | dom 4-jul | — |
| NBME 32 | dom 11-jul | — |
| **GO/NO-GO** | **lun 12-jul** | **E-50** (el E-46 es el vie 16-jul) |
| UWSA2 | dom 18-jul | — |
| NBME 33 | dom 8-ago | — |
| Free 120 + 3 bloques | dom 22-ago | — |
| Última sesión de banco | jue 26-ago | — |
| D-1 (viaje) | lun 30-ago | Feriado |
| **Examen** | **mar 31-ago** | — |

Si el GO/NO-GO del 12-jul falla, se pasa al 27-sep sin recargo.

**Calendario plan B (examen lun 25-oct):**
- NBME 31 dom 29-ago · NBME 32 dom 5-sep · **GO/NO-GO lun 6-sep (E-49)**.
- UWSA2 dom 12-sep · NBME 33 dom 26-sep · Free 120 dom 17-oct · D-1 dom 24-oct.
- Si también falla: **extensión contigua nov-dic-ene** (es la única permitida; coste $70 o $100, sin confirmar).

### 3.5 Por qué el 27-sep (horas productivas acumuladas desde el reinicio)

Supuestos del cálculo [C] (`final/calc.js`):
- 5,5 h/día a tiempo completo hasta el SERUMS, que empieza el 3-may.
- 2 semanas de adaptación al 50 %.
- +2 h por feriado entre semana.
- Perfiles: **PISO 18 h/sem** (turno mañana con el bloque B al 25 %, o guardias), **M 20,5** (turno mañana con el bloque B al 50 %), **T 30** (turno tarde).
- Meta: 399 h. Entre paréntesis, el colchón respecto a esa meta.

| ENCAPS → reinicio | Perfil | 399 h se alcanzan | Colchón al 30-ago | Colchón al 26-sep | Colchón al 24-oct |
|---|---|---|---|---|---|
| dom 14-mar → mar 16-mar | PISO / M / T | 31-jul / 23-jul / 30-jun | +82 / +122 / +275 | +151 / +201 / +391 | +225 |
| dom 21-mar → mar 23-mar | PISO / M / T | 10-ago / 31-jul / 6-jul | +54 / +94 / +248 | +123 / +174 / +364 | +197 |
| dom 4-abr → mar 6-abr | PISO / M / T | 27-ago / 14-ago / 16-jul | +10 / +50 / +204 | **+79** / +130 / +320 | +153 |
| dom 11-abr → mar 13-abr | PISO / M / T | 6-sep / 23-ago / 23-jul | −17 / +23 / +176 | **+52** / +102 / +292 | +126 |
| (tu 15-abr fijo) | PISO / M / T | 11-sep / 27-ago / 25-jul | −28 / +12 / +165 | +41 / +91 / +281 | +115 |
| dom 18-abr → mar 20-abr | PISO / M / T | 17-sep / 1-sep / 28-jul | −45 / −5 / +149 | **+24** (+33 si el SERUMS empieza el 6-may) / +75 / +265 | +98 |
| dom 25-abr → mar 27-abr | PISO / M / T | **28-sep** / 10-sep / 3-ago | −72 / −32 / +121 | **−3** (+16 si el SERUMS empieza el 17-may) / +47 / +237 | **+71** |

Lectura:
- **Junio y julio quedan descartados** en todos los escenarios de abril.
- **Agosto (31-ago) solo es viable con el ENCAPS en marzo.**
- El **27-sep** aguanta el piso con el ENCAPS entre el 4 y el 18-abr, que es lo más probable: 6 de 6 ENCAPS en domingo y procesos I del 6-abr-2025 y 19-abr-2026 [H].
- **Con el ENCAPS ≥25-abr, la fecha honesta es el 25-oct.**

**Proyección de nota** [S, inv:timing]: con un baseline NBME-eq de 45 % se llega a ~72-75 % a fines de septiembre; con 40 % a ~68 % (límite); con 35 % a ~63 % (no aprueba con margen). **La fecha la decide el NBME, no el calendario.**

### 3.6 Reglas operativas (sustituyen al corrimiento diario)

**Días perdidos:**

| Fase | Qué pasa |
|---|---|
| F1 | C1 y C2 absorben los 2 primeros. Desde el 3.º, el contenido pasa al tramo 2 (+5,5 h cada uno). **El 4-ene no se mueve** |
| F2 | Se pierde el slot de menor brecha. **El ENCAPS no se mueve** (la fecha la pone el MINSA) |
| F3/F4 | Se descuenta del colchón. Agotado el colchón, la fecha la mueven los gates, nunca un día suelto |

**Eligibility y reserva:**
- **Periodo ago-sep-oct 2027.** Cubre el 31-ago, el 27-sep y el 25-oct, así que **no depende de la fecha del ENCAPS**.
- Inscripción vía **FSMB** (desde el 12-ene-2026 los IMG se inscriben ahí) entre dic-2026 y ene-2027. Coste: $695 + $210 de recargo regional [H].
- El permiso llega ~6 meses antes de que empiece el periodo [H `ecfmg_2025ib.txt:1255-1257`].
- La reserva se abre como mucho 6 meses antes del examen (≈ dom 28-mar para el 27-sep).
- **Reservar** el 31-ago si el ENCAPS es ≤21-mar; el 27-sep si cae entre el 4 y el 18-abr; el 25-oct si es ≥25-abr.
- Antes de inscribirse: **pasaporte vigente** con nombre idéntico [H `ecfmg_2025ib.txt:449-453`].
- **Prometric Lima:** que tome el USMLE no está confirmado (§6).

**Regla anti-replan:**
- Llevamos 19 corrimientos en 5 semanas. Desde v6, el plan solo se rehace por 4 disparadores con fecha: la convocatoria ENCAPS, el turno del SERUMS, los gates NBME y el NBME 28.
- Todo lo demás se absorbe con colchón o con el modo mínimo.

---

## 4. ENCAPS

### 4.1 Mantenimiento "lento" (mié 7-oct → mié 30-dic)

- **Días 1-60 sin ningún cambio:** 49 de banqueo1h + **11 mini-sims de 25Q** en los mismos viernes, el último el **vie 18-dic**.
  - La generación en seco con `--hasta 2026-12-31` coincide fila a fila [H `v600/dry_mant_hasta1231.sql`].
  - Críticos en F1: I-3 6 · V-2 6 · II-3 4 · los demás 3.
- **El checkpoint de fin de enero se adelanta al vie 18-dic.**
- **Las filas 61-92 del v5.20 (4-ene → 16-feb) no se borran:**
  - Las 26 de lunes a jueves pasan a **carril B a las 16:15 en F2, en la misma fecha**.
  - Los 6 mini-sims de esos viernes quedan absorbidos por el SIM 100Q del viernes, y su receta se guarda en `extra`.
- **Stock urgente:** III-5 0/29 y V-2 1/41 [H `PENDIENTES_JOSEPH.md:365`]. Hay que reponer antes del lun 26-oct (siguiente V-2) y del mar 10-nov (siguiente III-5).

### 4.2 Intensiva desde el lun 4-ene: núcleo fijo más cola anclada

**S1 (lun 4 → vie 8-ene):**
- lun 4: SEÑALES #1 (re-scan y convocatoria).
- mar 5 a jue 7: calentamiento I-3 / V-2 / II-3.
- **vie 8-ene: PRE-TEST 2026-II, 100Q, clave oficial** (antes previsto el vie 26-feb).

**Núcleo, S2-S9 (lun 11-ene → vie 5-mar): 32 slots de barrido para los 31 sub-ejes de los 8 críticos.**
- Reparto por defecto: I-3 7 · V-2 5 · IV 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2. Va intercalado, no en bloques.
- **Tras el pre-test del 8-ene se reordena por brecha.** Las brechas mayores van primero, porque un sub-eje visto después del ~19-feb ya no llega a su recuperación del D+21 antes del 14-mar.
- Cada SIM puede mover como máximo 2 slots de la semana siguiente.

| Semana | Lun | Mar | Mié | Jue | Vie (07:15) |
|---|---|---|---|---|---|
| S2 · 11-15 ene | I-3 | V-2 | II-3 | I-4 | SIM #1 = **2025-II oficial** |
| S3 · 18-22 ene | I-3 | IV | III-5 | II-4 | SIM #2 |
| S4 · 25-29 ene | I-3 | V-2 | II-5 | I-4 | SIM #3 |
| S5 · 1-5 feb | I-3 | II-3 | IV | V-2 | SIM #4 = **2024-II oficial** |
| S6 · 8-12 feb | I-3 | III-5 | II-4 | I-4 | SIM #5 |
| S7 · 15-19 feb | I-3 | V-2 | II-3 | IV | SIM #6 |
| S8 · 22-26 feb | I-3 | III-5 | II-4 | II-5 | SIM #7 = **2025-I oficial (ancla tardía)** |
| S9 · 1-5 mar | V-2 | IV | II-3 | I-4 | SIM #8 |

**Segunda pasada sin añadir horas** (crítica de exámenes, §D):
- Repaso de las 07:15 en D-1 / D-7 / **D-21**.
- Eval de las 18:00 con 10Q del día + 10Q de sub-ejes de hace 7-21 días. Así cada sub-eje tiene 3 recuperaciones espaciadas, además de los SIM.
- **Pasada profunda solo para los sub-ejes que estén por debajo del 70 % en el D+21.**

**Cola: siempre los 5 hábiles antes del examen.**
- Lunes: pasada profunda del sub-eje peor.
- Martes y miércoles: repaso final de cifras y normas.
- **Jueves D-2: dress rehearsal de 11:00 a 13:00.**
- Viernes D-1: medio día.
- Sábado libre. **Domingo examen.**

**Módulos de extensión, 1 semana cada uno, si el examen cae más tarde:**
- Lunes y martes: pasada profunda de los 2 sub-ejes peores.
- Miércoles: rebote de cola larga (II-1 / II-11 / II-8).
- Jueves: lista de vigilancia.
- Viernes: SIM.
- **Semana Santa** (jue 25 y vie 26-mar, sin sesión): el SIM de esa semana va el mié 24-mar.

### 4.3 Escenarios y regla de convocatoria [C]

| Examen (domingo) | Hábiles F2 | Módulos | SIM 100Q tras el pre-test (sin contar el D-2) | Cola (lun → vie) | Sin convocatoria al… → descartado |
|---|---|---|---|---|---|
| **14-mar (planificación)** | 50 | 0 | 8 | 8 → 12-mar | mié 17-feb |
| 21-mar | 55 | 1 | 9 | 15 → 19-mar | mié 24-feb |
| 4-abr | 63 | 2,6 | 11 (uno el mié 24-mar) | 29-mar → 2-abr | mié 10-mar |
| 11-abr | 68 | 3,6 | 12 (ídem) | 5 → 9-abr | mié 17-mar |
| 18-abr | 73 | 4,6 | 13 (ídem) | 12 → 16-abr | mié 24-mar |
| 25-abr | 78 | 5,6 | 14 (ídem) | 19 → 23-abr | mié 31-mar |

- **Regla:** la convocatoria sale como mínimo 25 días antes del examen [H: 25, 26, 45 y 54 días observados].
- La señal del "29-ene sin convocatoria" que proponían los diseños **no tiene base** (todavía quedarían 44 días) y se descarta.
- **Al salir la convocatoria:**
  - se fija `exam_date`;
  - se regeneran solo las filas posteriores al vie 5-mar (módulos y cola);
  - se protegen el D-1 y el día del examen en todos los planes;
  - y **recién entonces** se activan las pausas o reducciones de los secundarios (§5).
- Los 6 escenarios quedan generados en seco en diciembre (ya existen los del 14-mar, 21-mar y 11-abr en `v600/`).
- **El mié 10-mar de v5.20 queda sustituido:** los 6 ENCAPS anteriores fueron en domingo [H] y tú ahora dices "más o menos el 14".

### 4.4 Simulacros y criterio de preparación

| Uso | Fuente | Estado |
|---|---|---|
| Pre-test 8-ene | 2026-II | Con clave oficial |
| Anclas oficiales | 2025-II (15-ene), 2024-II (5-feb) y 2025-I (26-feb) | Con clave |
| Resto | Theomed / QX 2027-I / propios | **Acceso por verificar** |
| Dress rehearsal | 2026-I real | Solo si antes se arma una clave por consenso (QX + Theomed + verificación contra la norma); **hoy no hay clave** [H `PENDIENTES_JOSEPH.md:369`]. Si no, uno propio |

- **Criterio de "listo" [S]:** el último oficial ≥85 % (17/20) **y** los 2 últimos SIM ≥85 %.
- Regla permanente: verificar cada ítem contra la clave oficial antes de usarlo (memoria `claves-oficiales-serums-disco`).

### 4.5 Inventario de preguntas: el cuello de botella empieza en octubre

- **Oct-nov:** etiquetar por código las **2.052 preguntas reales de QX** [H `PROTOCOLO_HORA_MANTENIMIENTO.md:154`] y generar **solo lo que falte**, verificado contra la clave o la norma. Unos 150 ítems/semana en segundo plano, a cargo de Claude.
- **Antes de diciembre [DJ-acción]:** decidir si se paga QX/Theomed 2027-I e intentar conseguir la clave del 2026-I.

---

## 5. Planes secundarios por fase

Ninguno se borra: se re-fechan. Hasta la convocatoria **no se regenera nada de oct-feb**: los días protegidos de v5.20 (22-feb, 9-mar, 10-mar) se quedan como tardes sin sesión, que no hacen daño.

| Plan | F1 (oct-dic) | F2 (ENCAPS) | F3 (post-ENCAPS) | F4 (SERUMS) |
|---|---|---|---|---|
| **MIR** | Diario 1 h, igual | Diario D61-D78 hasta el mié 27-ene; mantenimiento desde el 28-ene. El modo reducido 28-ene → 19-feb se queda (alivia carga) | Mantenimiento hasta el **jue 22-abr** (igual) | **La fase principal se aplaza a oct-2027.** En el SERUMS solo Anki MIR 10'/día, 0 nuevas, retención 0,80 |
| **Research** | Ciclo 1, igual | La pausa del vie 15-ene al mié 10-feb se queda (coincide con la adaptación a la intensiva). Con la convocatoria se protegen el D-1 y el examen | Ciclo 2 sigue, solo en verde | **Ciclo 2 pausado y re-fechado a oct-2027.** R43/SR-1 (29-jul) → oct-nov. PROSPERO R10 (vie 19-mar) se hace en F2/F3 |
| **Derma** | Ciclo 1, igual | El taper d44-d49 (8 → 24-feb) se queda como alivio. Con la convocatoria, **intercambio**: los átomos de taper pasan a las 2 semanas previas al ENCAPS y los que estaban ahí (d53/d54, que son CRIT) ocupan las fechas de febrero. `DERMA_TAPER_ENCAPS_FECHA` **sigue en null**: activarla recorta ±3 hábiles [H `dermaDailyPlan.ts:763-783`] | Ciclo 1 hasta d73 (~5-may). Los átomos que caigan después del 3-may van a domingo | **Ciclo 2 (7-may → 28-jul) → oct-2027** |
| **AURUM** | Igual (1 h) | **30' desde el 4-ene** [DJ-4]. El pitch v5 (vie 19-feb) solo cambia de etiqueta | Termina el **mié 14-abr** (pitch v7) | Terminado |
| **SYNAPSE / vibecoding** | Igual | Terminan el lun 15-feb y el vie 19-feb. El taper pasa a ser "por el ENCAPS" (solo etiqueta) | — | Opcional: 1 h el domingo por la tarde, solo en verde |
| **LIVIANO** | Igual | Termina el vie 12-feb (capstone jue 11-feb). La franja de las 17:15 queda **libre** | — | — |
| **Business / Estudio Pulso** | Igual | Termina el jue 4-feb | — | — |
| **CURVA / DENSA** | — | Arrancaban en febrero "después del Step 1" → **oct-2027** | — | — |
| **Revisión semanal** | Sábado 07:15 | Sábado 07:15 | Sábado | **Domingo 07:00** (el sábado probablemente se trabaja) |
| **Gimnasio / baile** | 19:00-20:30 | Igual | Igual | Turno M y T 12-18: igual. T 13-19 o 14-20: gimnasio por la mañana y baile el domingo |

---

## 6. Qué se investigó (SERUMS, EsSalud Concepción, ENCAPS, Prometric)

**SERUMS: inicio y procesos**
- **[H]** Inicio por norma: **1-may** (proceso I) y **1-oct** (proceso II), hasta 12 meses. El MINSA puede cambiarlo por RM. RM 605-2024/MINSA: [El Peruano](https://busquedas.elperuano.pe/dispositivo/NL/2322806-5).
- **[H]** 2026-I: ENCAPS reprogramado al dom 19-abr por lluvias; inicio de la remunerada el **mié 6-may** y de la equivalente el **mar 26-may** (RM 379-2026).
  - [Cronograma DIGEP](https://geresaloreto.gob.pe/PanelAdministrativo/uploads/serums/1772453931_Cronograma-evaluacion-para-el-serums-2026-I-actualizado-fecha-19-de-abril.pdf) · [Infobae](https://www.infobae.com/peru/2026/04/15/atencion-estudiantes-de-medicina-minsa-oficializa-fechas-de-inicio-y-cierre-del-serums-2026-i/)
- **[H]** ENCAPS anteriores, **todos en domingo:** 1-sep-2024 · 6-abr-2025 · 24-ago-2025 · 19-abr-2026 · 9-ago-2026.
  - Antelación entre convocatoria y examen: 25-54 días. Entre examen e inicio del servicio: 17-53 días.
  - [Cronograma 2025-I](https://cdn.www.gob.pe/uploads/document/file/7753373/6552880-cronograma-proceso-de-evaluacion-para-el-servivio-rural-y-urbano-marginal-de-salud-serums-2025.pdf) · [Cronograma 2026-II](https://cdn.www.gob.pe/uploads/document/file/10322495/8389146-cronograma-evalpas-2026-ii-word.pdf)

**Jornada del serumista**
- **[H]** Remunerada: 6 h diarias, 36 a la semana o 150 al mes. Equivalente: 18 h semanales.
- **[H]** Las guardias comunitarias **no generan descanso post-guardia**.
- **[H]** Abandono: 5 faltas injustificadas consecutivas, 10 en 30 días o 15 en 90.
- **[H]** EsSalud hace su propia inducción.
- Fuente de las cuatro: instructivo 2026-I §4.19, §11.4, §13.2.5 y §13.4.4 ([PDF](https://geresaloreto.gob.pe/PanelAdministrativo/uploads/serums/1776776912_8040033-instructivo-proceso-serums-2026-i.pdf)).
- **[H]** EsSalud programa turnos de 6 h, de mañana o de tarde. Domingos y feriados pueden tener turnos de 6 h o guardia ([Directiva 012](https://sinamssop.pe/wp-content/uploads/2025/09/DIRECTIVA-012-PROGRAMACION-ASISTENCIAL-ESSALUD.pdf)).
- **[S]** 150 h ÷ 6 ≈ 25 turnos al mes, así que probablemente se trabaje también el sábado.

**EsSalud en Concepción**
- **[H]** Hay un solo establecimiento de EsSalud en la provincia: **Centro Médico Concepción**.
  - I-3, GD-3, RENIPRESS 00008668. Jr. Junín 1101. Tel. **064-581119**.
  - **1 plaza remunerada de medicina en 2026-I**, que se adjudica por mérito.
  - [Oferta 2026-I](https://geresaloreto.gob.pe/PanelAdministrativo/uploads/serums/1776777001_8040039-oferta-de-plazas-remuneradas-serums-2026-i.pdf) · [Nota EsSalud](https://www.essalud.gob.pe/essalud-junin-implementa-mejoras-en-la-atencion-del-centro-medico-concepcion/)
- **NO ENCONTRADO:** el horario de turnos médicos del centro y si tiene guardias. Un agregador de baja confianza dice "07:00-18:00". SUSALUD pide sesión.

**USMLE: inscripción y Prometric**
- **[H]** Desde el 12-ene-2026 los IMG se inscriben al Step 1 vía **FSMB**, por $695 + $210 ([Addendum 2026](https://www.usmle.org/sites/default/files/2025-12/2026%20Bulletin%20Addendum.pdf)).
- **[H]** Reserva con 6 meses de antelación como máximo. **Recargo por cambios dentro de los 45 días previos** ([usmle.org](https://www.usmle.org/bulletin-information/applying-scheduling)).
- **[H]** Una sola extensión contigua del eligibility period. El periodo de 3 meses sale **solo** del ejemplo del Booklet ECFMG 2025 ([PDF](https://www.ecfmg.org/2025ib/2025ib.pdf)); no está confirmado para la FSMB.
- **NO CONFIRMADO:** que el centro Prometric de Lima (ICPNA, Av. Angamos Oeste) tome el USMLE.
  - La lista citada es del programa ISEE, no del USMLE ([PDF](https://www.erblearn.org/wp-content/uploads/documents/isee/20200824_ERB_ISEE_Prometric_Test_Centers_International.pdf)).
  - Un médico peruano tuvo que rendir en Bogotá en 2022 ([blog](https://danimedi.com/blog/dando-el-usmle-step-1/)).
  - Mi búsqueda de hoy tampoco encontró confirmación ([quantaprep](https://www.quantaprep.com/blog/prometric-testing-centers-usmle) no menciona Perú).

**Feriados 2027**
- **[H]** Base: [gob.pe](https://www.gob.pe/feriados/historicos). Días de la semana con node.
- Entre semana: vie 1-ene · jue 25 y vie 26-mar · lun 7-jun · mar 29-jun · vie 23-jul · mié 28 y jue 29-jul · vie 6-ago · lun 30-ago · vie 8-oct.

**No encontrado (pendiente de verificar):**
- Convocatoria y fecha del ENCAPS 2027-I.
- RM de inicio del SERUMS 2027-I.
- Oferta de plazas 2027-I.
- Horario y guardias del Centro Médico Concepción.
- Prometric Lima para el USMLE.
- Monto del recargo internacional y de la extensión.
- Plazo del trámite en FSMB.
- Valorización de EsSalud.
- Días no laborables de 2027.
- Tiempo real de traslado Huancayo ↔ Concepción.

---

## 7. Riesgos y mitigaciones

| # | Riesgo | Mitigación / disparador |
|---|---|---|
| 1 | **No cumplir el plan (0/27 hábiles)**: es el riesgo n.º 1 para los dos exámenes | Dos niveles de carga y disparador automático (§2.0) · semana 1 en ÁMBAR · gates de cumplimiento el 30-oct y el 27-nov · regla anti-replan (§3.6) · la fecha se fija con el piso de 18 h/sem, no con el objetivo |
| 2 | ENCAPS en abril o tarde (25-abr) | Núcleo fijo + módulos · regla de "examen − 25 días" · ENCAPS ≥25-abr → Step 1 el 25-oct |
| 3 | Olvido del Step 1 en la pausa de 11-17 semanas | Anki diario + 20Q mezcladas los sábados + sinergia con bioestadística · NBME 29 en el reinicio + 1 · caída >8 puntos → +2 semanas pagadas por el colchón |
| 4 | Horario del SERUMS desconocido; guardias sin descanso | Plantillas M y T + variantes · piso de 18 h · **llamar al 064-581119 o al serumista 2026-I** antes de la adjudicación · día de guardia = solo Anki |
| 5 | No conseguir la plaza de Concepción (1 sola, por mérito) | El ENCAPS ≥17 compra la plaza · llevar a la adjudicación una lista ordenada de plazas EsSalud de Junín · plaza lejana = recalcular el traslado |
| 6 | Que Prometric Lima no tome el USMLE | Verificarlo **antes del vie 30-oct** en el buscador de prometric.com. Si no: Bogotá o Santiago (2-3 días de permiso y el viaje) |
| 7 | Recargo por mover la fecha | Las decisiones se toman en el E-49 o antes. El NBME 33 y el Free 120 solo confirman |
| 8 | Que caduque Qbankly, UWorld o AMBOSS antes de sep-oct | Revisar ya las fechas de vencimiento. Comprar o renovar cubriendo hasta el examen |
| 9 | Inventario ENCAPS (V-2 y III-5 a cero) | Etiquetado de las 2.052 de QX + generación verificada desde octubre · QX/Theomed 2027-I · clave del 2026-I |
| 10 | Agotamiento en 12 meses seguidos | Deloads el 16-nov y el 28-dic · Semana Santa · Fiestas Patrias al 60 % · 1 domingo libre al mes · día libre después del ENCAPS · 1 semana libre después del Step 1 · sueño de 7 h |
| 11 | Que el NBME no suba lo proyectado (baseline bajo) | Checkpoint del NBME 28 (<50 % → 25-oct) · gates NBME · la proyección del +5 %/mes es heurística |
| 12 | Permiso para el examen (no está normado) | Examen en **lunes**, con 1 día justificado pedido con ≥4 semanas de antelación; nunca una falta injustificada (§13.4.4) |
| 13 | Errores técnicos al implementar | Ver §9: orden de la clave primaria, carril B visible en la app, 25 y 26-mar en los skip, UNTIL con `T045959Z`, crear antes de borrar, una sola fuente de fechas |
| 14 | ID o eligibility USMLE previos que no constan | Revisar si existe una inscripción o un periodo ene-mar ya pagado y pedir el cambio o la extensión antes de que venza |

---

## 8. DECISIONES QUE TOMA JOSEPH (5)

**DJ-1 · Fecha del Step 1 y periodo de eligibility.** Para cuándo: la inscripción FSMB (dic-ene); se confirma con la convocatoria ENCAPS.
- **A · RECOMENDADA:** ventana **ago-sep-oct 2027** y **objetivo lun 27-sep-2027**.
  - Se ajusta sola según la fecha del ENCAPS: si es ≤21-mar, mar 31-ago; si es ≥25-abr, lun 25-oct.
  - **GO/NO-GO el lun 9-ago** (E-49, sin recargo). El NBME 33 solo confirma.
  - Colchón al piso de 18 h/sem con el ENCAPS en abril: +24 a +79 h.
- **B:** el lun 25-oct fijo como base. Colchón de +71 a +225 h, pero 4 semanas más de SERUMS más estudio y más olvido de lo de oct-dic.
- **C:** el mar 31-ago fijo. Solo llega si el ENCAPS cae en marzo; con el ENCAPS en abril, el colchón al 30-ago va de −72 a +10 h al piso.
- **D:** julio (vie 30-jul). Descartado: ni con el ENCAPS el 14-mar se completan las 399 h al piso antes del 31-jul.

**DJ-2 · Cuándo se reinicia el Step 1 tras el ENCAPS.** Para cuándo: ya (se aplica al salir la convocatoria).
- **A · RECOMENDADA:** el **martes siguiente al ENCAPS**, con el lunes libre.
  - Con el ENCAPS el 14-mar da 32 hábiles a tiempo completo antes de mayo, frente a 12 empezando el 15-abr: unas +110 h.
  - Con el ENCAPS ≥11-abr coincide en la práctica con tu "15 de abril".
- **B:** jue 15-abr fijo (tu propuesta literal). Si el ENCAPS cae en marzo se tiran ~20 hábiles; si cae el 18 o 25-abr es imposible (choca con la cola del ENCAPS).
- **C:** el martes posterior + 1 semana de descanso. Cuesta 5 hábiles a tiempo completo (≈27 h). Solo tiene sentido si el ENCAPS cae en marzo.

**DJ-3 · Modelo de estudio en el SERUMS (turno a pedir, gimnasio, horas, fines de semana).** Para cuándo: abril, antes de la adjudicación o inducción.
- **A · RECOMENDADA:** pedir **turno TARDE** fijo.
  - Todo el Step 1 va antes del turno: ~4,5 h/día de lunes a viernes + 3 h el sábado + 5 h el domingo ≈ **28-30 h/sem**.
  - Con turno 12-18 el gimnasio sigue a las 19:00. Con 13-19 o 14-20 el gimnasio pasa a las 06:10 y el baile al domingo.
  - Al 26-sep suma **≈+190 h frente al turno mañana y ≈+240 h frente al piso** [C], y abre la puerta al adelanto.
- **B:** turno MAÑANA.
  - El gimnasio de las 19:00 queda intacto.
  - Step 1: 1h50 antes del turno + 1h30 después (solo tareas de baja carga) + domingo 5 h ≈ **18-20,5 h/sem**.
  - Fecha: 27-sep si el ENCAPS es ≤18-abr; 25-oct si es más tarde.
- **C:** no pedir nada, aceptar lo que asignen y planificar con el piso de 18 h/sem (igual que B).
- **D:** SERUMS equivalente (18 h/sem, ad honorem, empieza unas 3 semanas más tarde). Libera unas +18 h/sem, pero sin remuneración y fuera de la plaza remunerada de EsSalud Concepción. No recomendado.
- **En todas las opciones:** domingo de 07:30 a 12:30 = bloque largo · 1 domingo libre al mes sin hito · dormir de 21:00 a 04:00, innegociable.

**DJ-4 · Carga y planes secundarios.** Para cuándo: ya; define cómo arrancas mañana.
- **A · RECOMENDADA:** dos niveles.
  - **Núcleo:** Step 1 en F1/F3/F4, ENCAPS en F2, más Anki.
  - **Secundarios** (MIR, Research↔Derma, AURUM, LIVIANO, SYNAPSE/vibecoding): solo en VERDE.
  - Disparador: núcleo <80 % dos semanas seguidas → se suspenden los secundarios hasta 2 semanas ≥90 %.
  - Semana 1 en ÁMBAR. AURUM a 30' desde el 4-ene. Las franjas que se liberan en febrero no se rellenan.
  - En el SERUMS: solo Step 1 + Anki MIR 10'. MIR principal, Derma ciclo 2, el resto de Research ciclo 2, CURVA y DENSA pasan a oct-2027 (re-fechados, nada se borra).
- **B:** todo como en v5.20 hasta que cada plan termine (12,25 h/día planificadas; con esa carga se cumplieron 0 de 27 hábiles). En el SERUMS, igual que A.
- **C:** congelar todos los secundarios desde el 4-ene hasta el Step 1 (foco máximo). Research, Derma, AURUM y MIR se re-fechan a oct-2027.

**DJ-5 · Fecha con la que se planifica el ENCAPS.** Para cuándo: ya.
- **A · RECOMENDADA:** **dom 14-mar-2027 PROVISIONAL** (tu "más o menos el 14").
  - Núcleo fijo del 4-ene al 5-mar + cola de 5 hábiles anclada al examen + módulos de 1 semana si sale más tarde.
  - Regla de convocatoria: examen − 25 días.
- **B:** mantener el mié 10-mar de v5.20. No tiene precedente (6 de 6 ENCAPS fueron en domingo) y quita 3 hábiles al núcleo (30 slots de barrido y 7 SIM en vez de 32 y 8) [C].
- **C:** planificar con el dom 11-abr (lo más probable según los antecedentes). Da más holgura, pero si el examen sale el 14 o el 21-mar la cola llega tarde y peligra la plaza.

*Adoptado salvo veto (no cuenta como decisión): cierre de F1 con D58 = bioestadística y D59-D60 = colchón, y Micro entera en 2027 (§3.1).*

---

## 9. Plan de implementación (en este orden, cuando decidas)

**Regla general:**
- Nada se toca hasta que decidas.
- Borrar series del Calendar necesita tu OK explícito.
- Antes de cada siembra en Supabase: backup y verificación de hash.
- Deploy verificado por el contenido del bundle.
- **D1-D57, los NBME 25-28 con sus ids y las filas ENCAPS 1-60 no cambian.**

**Paso 0 · Hoy y mañana**
- Nada. Mañana es el D1 v5.20.
- Opcional: empezar el UWSA1 a las 08:15.

**Paso 1 · Tras tu decisión (≤ vie 9-oct): fuente única y avisos**
1. `DATA/_scripts/_fechas_v6.json`: ENCAPS provisional 2027-03-14, regla de reinicio, SERUMS 2027-05-03 [S], Step 1 2027-09-27, adelanto 2027-08-31, plan B 2027-10-25, eligibility ago-oct, días protegidos. Lo leen todos los generadores y la app.
2. Memoria:
   - línea de ESTADO VIGENTE;
   - `usmle-step1-v5` → v6;
   - `encaps-mantenimiento`;
   - `coach-stance` con el objetivo por fase: Step 1 hasta el 30-dic → ENCAPS hasta el examen → Step 1 hasta el 27-sep;
   - handoff nuevo.
3. Docs: `PENDIENTES_JOSEPH.md`, `REESTRUCTURACION_31AGO_2026.md` §v6.00, `ROADMAP_MAESTRO`, `SENALES_2027-I.md` (registrar tu "~14-mar").
4. Supabase: backup de `study_metrics`, y en `extra` cambiar `exam_date` a 2027-03-14 (texto PROVISIONAL), `intensiva {desde 2027-01-04, pretest 2027-01-08}` y `regimen`. Solo metadatos; las filas no se tocan todavía.
5. App mínima: en `DAILY_META.examenTarget` poner 2027-09-27 PROVISIONAL, más los textos de cuenta atrás (`homeBriefing`, `UsmleHub`, `EncapsPlanView`, `EncapsCockpit`) para que no muestren 22-feb ni 10-mar. Deploy verificado.

**Paso 2 · Antes del mar 20-oct (primer NBME)**
- Calendar:
  - Los 4 NBME de F1 pasan a 07:00-12:30 (ids conservados).
  - Recrear las 6 series USMLE y la de ENCAPS 16:15 con DTSTART 7-oct y **UNTIL 20261231T045959Z**: primero se crean, después se borran las viejas, con tu OK. Las instancias pasadas se recrean solas.

**Paso 3 · Octubre: verificaciones (tú) e inventario (Claude)**
- Tú, antes del vie 30-oct:
  - Prometric Lima: ¿toma el USMLE?
  - ¿Tienes ya USMLE/ECFMG ID o un eligibility period pagado?
  - Pasaporte vigente.
  - Fechas de vencimiento de Qbankly, UWorld y AMBOSS.
  - Llamar al 064-581119.
- Claude: etiquetar por código las 2.052 de QX y reponer V-2 (antes del 26-oct) y III-5 (antes del 10-nov).
- **Tarea quincenal de SEÑALES** (vigilar la convocatoria): es configuración persistente, así que **necesita tu OK**.

**Paso 4 · Noviembre (antes del lun 30-nov): código USMLE**
- `gen_usmle_v5.js`:
  - `SIMS` indexado por D#, no por fecha;
  - D58-D60 de F1;
  - **tramo 2 como array aparte T1…Tn con `dOrig`**;
  - textos del taper.
- `assemble_usmle_ts.js` → `usmleStep1Daily.ts`: `DAILY_META.tramos`, pausa, `USMLE_TAPER` nuevo.
- Estado **PAUSA** en `TodayMission` y `UsmleTodayPlan` (`planHoyD` no debe mostrar el D61 durante F2).
- `HITOS_STEP1` derivado de los datos, no escrito a mano (`homeBriefing.ts`).
- `usmleScores.HITOS_ONTRACK` (§3.4). `STEP1_SEMANAS` y `TOTAL_SEM` por fases.
- `remap_inicio.js`: quitar los invariantes de 95 días. Regenerar `obsidianMap` para D58-D60.

**Paso 5 · Antes del vie 11-dic: siembra ENCAPS (el orden importa por la clave primaria `(examen, dia)`)**
1. App: rama `extra.carril_b` en `itemsForDay`, `HorarioView` y el daemon, con paridad. Deploy. **Sin esto, las 26 sesiones del carril B serían invisibles.**
2. Exportar a JSON las filas 61-92 del mantenimiento → backup `study_schedule_bk_<fecha>`.
3. `gen_encaps_mantenimiento_2027.js --hasta 2026-12-31` (60 filas).
4. **Después,** `gen_encaps_intensivo_2027.js` modificado:
   - D1 2027-01-04 y examen 2027-03-14 PROVISIONAL;
   - `--slots-barrido 32` intercalado;
   - cola anclada y módulos;
   - repaso D-1/D-7/D-21 y eval 10+10;
   - carril B;
   - `--bk` con nombre explícito;
   - días 61-110; el contenido de las filas 97-107 del v5.20 se re-fecha.
5. `gen_encaps_minisim.js --pretest 2027-01-08`.
6. `encapsPlan.ts`: añadir 2027-03-25 y 2027-03-26 a `STUDY_SKIP_DATES` (si no, desfase de +2 días tras Semana Santa).
7. Hash local = Supabase.
8. Generar en seco los 6 escenarios (14-mar → 25-abr).

**Paso 6 · Antes del jue 24-dic: Calendar F2 (crear antes de borrar)**
- Series desde el 4-ene:
  - ENCAPS 05:00 · 07:15-12:00 · 18:00;
  - Anki USMLE 05:15;
  - carril B 16:15 de lunes a jueves (hasta el 16-feb);
  - Step 1 vivo el sábado a las 07:45.
- Re-fechar los eventos ENCAPS (ids conservados): banner `4mfnu95l…` 4-ene → D-1 · PRE-TEST `27bs58ee…` → 8-ene · SIM `g6t22lag…` → 15-ene, más 7 viernes · DRESS `ip4lhi4l…` / D-1 `tl0irrsb…` / EXAMEN `8juk0mvl…` → 11, 12 y 14-mar PROVISIONAL.
- Re-fechar los hitos USMLE de 2027 (ids conservados, "PROVISIONAL" en el título) según §3.4:

  | Evento | Id | Nueva fecha |
  |---|---|---|
  | NBME 29 | `ae93…` | Reinicio + 1 (provisional mié 17-mar) |
  | NBME 30 | `mael…` | 30-may |
  | NBME 31 | `l771…` | 1-ago |
  | NBME 32 | `h65e…` | 8-ago |
  | UWSA2 | `2u7v…` | 15-ago |
  | NBME 33 | `la5r…` | 29-ago |
  | Free 120 | `lh9j…` | 19-sep |
  | D94 | `nebo…` | jue 23-sep |
  | D95 | `n90b…` | dom 26-sep |
  | EXAMEN | `oinh…` | lun 27-sep |

  Además, crear el evento GO/NO-GO del lun 9-ago.
- **Con tu OK, borrar** las 7 series de extensión de febrero (`qhtokf24`, `u08hjmtk`, `rmcsbarba`, `rfnkceao`, `b98p0181`, `anjhsglon`, `d8252hjo`) y las 3 del loop intensivo del 23-feb (`ie79j1cv`, `i4o9s8fh`, `do51osap`). Son bloques diarios, no evaluaciones.
- Revisión semanal `6iog…` por tramos.

**Paso 7 · Dic-ene: inscripción USMLE vía FSMB** (eligibility ago-sep-oct; tú).

**Paso 8 · Al salir la convocatoria (~feb-mar)**
- Fijar `exam_date`. Regenerar solo las filas posteriores al 5-mar.
- Días protegidos D-1 y examen en MIR, Research, Derma y AURUM: **una sola regeneración** de los secundarios.
- Intercambio del taper de Derma.
- Elegir la fecha que se reserva (§3.6) y reservar en Prometric cuando se abra.
- Bloquear en el Calendar los trámites del SERUMS.

**Paso 9 · En el reinicio**
- Fechar el tramo 2 (T1…Tn) desde el día real de reinicio.
- NBME 29 en el reinicio + 1. Series de F3.

**Paso 10 · Cuando se conozca el turno (~mayo)**
- Series de F4 con la plantilla M o T (§2.4 / §2.5) y revisión semanal el domingo.

**Paso 11 · En cada gate (NBME 28, 12-jul / 9-ago / 6-sep)**
- Mover la fecha solo antes del E-46.
- Actualizar el JSON ancla, que propaga el cambio a la app, el Calendar y los docs.

---

### Anexo: verificación
- `v600/final/calc.js` y `calc2.js` (este documento): F1 60 sesiones · escenarios F2 14-mar → 25-abr · hitos base, adelanto y plan B con E-n · domingos · horas PISO/M/T.
- Reproducidos sin diferencias: `v6/c1.js`, `v6/c2.js`, `design/f12.js`, `horas.js`, `buf.js`, `f4.js`, `crit/crit.js` y `crit_cal/s.js` (126 afirmaciones de fecha, 0 discrepancias).
- Líneas del repo citadas y releídas hoy:
  - `PROTOCOLO_MODO_MINIMO.md:8,28`
  - `CALENDAR_SEGMENTOS_V5_6.md:121-151`
  - `PALMERTON_METODO_COMPLETO.md:380,1076-1077,1112,1294,1311,1593`
  - `USMLE/README.md:380`
  - `encapsPlan.ts:33`
  - `dermaDailyPlan.ts:763-783`
  - `usmleStep1Daily.ts:129` (D51-D60, D79)
  - `studyProgress.ts:52-58`
  - `PENDIENTES_JOSEPH.md:365,369,658`
  - instructivo 2026-I §4.28
  - `ecfmg_2025ib.txt:449-453,1190-1212,1255-1257`
