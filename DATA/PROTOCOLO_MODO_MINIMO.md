# 🚦 PROTOCOLO DE MODO MÍNIMO — VERDE · ÁMBAR · ROJO (v6.00 · 6-oct-2026, fechas v6.02 · 17-oct-2026 (⏸ v6.01 · 10-oct); historial v5.20 abajo)

> **v6.02 (sáb 17-oct-2026, vigente):** las reglas de este protocolo no cambian; cambian las fechas de F1 (lun 19-oct → mié 30-dic, 52 sesiones; el NBME 28 es
> la última, d52 mié 30-dic). Del lun 12 al vie 16-oct no se estudió (5 hábiles más): como la F1 ya no tenía colchón, el corrimiento sacó al tramo 2 las 5 últimas
> filas de Heme/Onco (regla de hitos anclados: un hito de F1 nunca sale de F1). Desde el lun 19-oct, un día ROJO/perdido de F1 sigue sin colchón propio → su
> fila pasa al tramo 2 en el cierre de F1 (jue 31-dic, `--pendientes-f1 <slot>`) y gasta una de las **28 filas COLCHÓN** (≈ 73,5 h) del tramo 2. **Excepción:
> si el día perdido es el NBME 28 (mié 30-dic), no pasa al tramo 2: se rinde el sáb 2-ene 07:00-12:30** y la revisión S11 pasa a las 13:30. Deload de F1: **lun
> 23-nov** y semana del lun 28-dic (la del NBME 28). **Gates de F1 v6.02: mié 11-nov (D18) y mié 9-dic (D38)** — núcleo < 85 % → secundarios salvo MIR a 30'.
>
> ⏸ **v6.01 (sáb 10-oct-2026; historial):** las reglas de este protocolo no cambian; cambian las fechas de F1 (lun 12-oct → mié 30-dic, D1-D57). **Ojo: C1/C2 (el colchón
> de F1) se CONSUMIERON con el corrimiento** (7-9 oct sin estudio): desde el lun 12-oct, un día ROJO/perdido de F1 ya no tiene colchón propio → su fila pasa al
> tramo 2 en el cierre de F1 (jue 31-dic) y gasta una de las **38 filas COLCHÓN** (≈ 100 h) del tramo 2. Deload de F1: lun 16-nov y semana del lun 28-dic
> (⚠ en v6.01 esa semana es la MISMA del NBME 28 —lun 28-dic—, ya no la posterior: decisión **(f)** abierta en `DATA/PENDIENTES_JOSEPH.md`).
> **Gates de F1 v6.01: mié 4-nov (D18) y mié 2-dic (D38)** — núcleo < 85 % → secundarios salvo MIR a 30' (*⏸ v6.00: vie 30-oct / vie 27-nov*).

> ## ⏸ v6.00 (REESTRUCTURACIÓN ANUAL, mar 6-oct-2026) — vigente salvo las fechas de F1 (D1-D57, gates, C1/C2), que corrigen las notas v6.02 y v6.01 de arriba
> - **DJ-4 (decisión de Joseph): MIR mantiene su horario (1 h/día en todas las fases); todos los demás secundarios se reducen hasta un MÍNIMO DE 30' —
>   nunca desaparecen.** En ÁMBAR cada secundario queda en **30' (mínimo DJ-4)**, MIR en **Anki + 25Q (1 h)** y el núcleo (Step 1; ENCAPS en la F2) no se
>   degrada. Es lo que pinta la app (`minimoPorFrente` en `src/lib/homeBriefing.ts`, constante `MINIMO_DJ4`). Tabla completa en **§2-bis**.
> - **Disparador semanal (V6_ESPEC §B7.4):** si el núcleo queda **< 80 % dos semanas seguidas**, todos los secundarios salvo MIR bajan a 30' hasta 2 semanas
>   ≥ 90 % (ya no se suspenden). **Gates de F1:** **v6.02: mié 11-nov (D18) y mié 9-dic (D38)** *(⏸ v6.00: vie 30-oct / vie 27-nov · ⏸ v6.01: mié 4-nov / mié 2-dic)* — núcleo < 85 % → mismo efecto.
> - **Fin del corrimiento diario:** un día perdido ya NO mueve el examen ni dispara `remap_inicio.js`. Se paga con colchón: F1 → C1/C2 (mar 29 / mié 30-dic) *(⏸ v6.00 · ⏸ v6.01: C1/C2 consumidos el 10-oct: F1 → tramo 2 directamente · **v6.02:** ídem; el NBME 28, si se pierde, va al sáb 2-ene)* y,
>   desde el 3.er día perdido, el contenido pasa al tramo 2 · F2 → se pierde el slot ENCAPS de menor brecha · F3/F4 → la fila no hecha se hace en la próxima
>   fila COLCHÓN. Replan solo por la regla anti-replan (`DATA/REESTRUCTURACION_31AGO_2026.md` §24.4). Por eso §0.2, §0.4 y §3.4 de abajo quedan SUPERSEDIDOS.
> - **ROJO (enfermedad):** secundarios omitidos (sin cambio) — **decisión abierta de Joseph** si también el ROJO debe respetar el mínimo de 30' (V6_ESPEC §I).
>   **En la F2** (lun 4-ene → vie 12-mar) el ROJO protege el núcleo ENCAPS: la app pinta ENCAPS «Solo Anki cifras + pre-test 10Q del sub-eje (08:15)», Step 1
>   «Anki vencido ≤15' (Step 1 en mantenimiento)» y omite el bloque principal y la eval del Step 1; fuera de la F2, igual que antes (§2-bis).
> - Sueño 21:00 → 04:00 y gimnasio siguen siendo innegociables en todas las fases (en el SERUMS con turno tarde el gimnasio va a las 06:10).
> - Fases v6: F1 Step 1 mié 7-oct → mié 30-dic *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → mié 30-dic · **v6.02:** lun 19-oct → mié 30-dic)* · F2 ENCAPS intensiva lun 4-ene → vie 12-mar (examen dom 14-mar PROVISIONAL) · F3 Step 1 mar 16-mar → vie 30-abr ·
>   F4 Step 1 + SERUMS ~lun 3-may → sáb 25-sep (L-S) · examen Step 1 lun 27-sep-2027.
>
> ⏸ *(Historial v5.20, SUPERSEDIDO por el bloque v6.00:)*

> Válvula de burnout del régimen v5.20 (D1 = mié 7-oct-2026 · Step 1 = bloque principal · D94 = jue 18-feb-2027 = última sesión de banco · D95 = vie 19-feb = último día del plan y D-1 HÁBIL · finde libre sáb 20 / dom 21-feb (dom 21 = D-1 REAL, sin estudio) · examen target **LUN 22-FEB-2027**, fuera de la ventana 25-29 ene · después: fase intensiva ENCAPS mar 23-feb → mar 9-mar y **examen ENCAPS/SERUMS 2027-I FIJADO el mié 10-mar-2027**). *(v5.19: D1 mar 6-oct · D94 mié 17-feb · D95 jue 18-feb = D-1 real, sin finde en medio · examen vie 19-feb. v5.18: D1 lun 5-oct · D94 mar 16-feb · D95 mié 17-feb · examen jue 18-feb. v5.17: D1 jue 1-oct · D94 vie 12-feb · finde 13-14 libre · D95 lun 15-feb · examen mar 16-feb.)*
> 🆕 **Corrimiento RÍGIDO (22-sep; aplicado de nuevo el 26-sep, v5.16, el 30-sep, v5.17, el sáb 3-oct, v5.18, el lun 5-oct, v5.19, y el mar 6-oct, v5.20 = DEFINITIVO por decisión de Joseph)**: cuando un día se pierde, corre el plan ENTERO — contenido **y** los 12 hitos, que conservan su D# —, no se toca ningún tema y, donde un plan tenía un fin clavado (ENCAPS, MIR mantenimiento), **se amplían días** en vez de perder sesiones.
> **No cambia franjas, metas ni fechas de examen.** Solo define, por escrito y con disparadores medibles, qué
> se recorta primero cuando el día no da para todo — para que el recorte sea una decisión y no un colapso.
> Palmerton: el fracaso es de comportamiento y proceso; "estudiar de noche exhausto" y la "procrastinación
> productiva" son alarmas (checklist G de `DATA/USMLE/PALMERTON_POR_MATERIA.md`). El único mínimo que ya
> existía era el del USMLE (Anki + 10Q); aquí se extiende a los 9 frentes con orden de degradación.
> Evidencia de fragilidad que motiva el protocolo: **19 corrimientos seguidos (31-ago→7-oct, 27 días hábiles perdidos; v5.20)** — 5 en bloque (31-ago→4-sep), luego uno a uno el 7, 8, 9, 10, 11, 14, 15 y 16 de septiembre, el jue 17 + vie 18-sep juntos, el lun 21 + mar 22-sep juntos, el mié 23 + jue 24 + vie 25-sep juntos, el lun 28 + mar 29 + mié 30-sep juntos, el jue 1 + vie 2-oct juntos, el lun 5-oct y el mar 6-oct — más el 25-jun. El plan ya desborda la ventana 25-29 ene (D95 = vie 19-feb = último día del plan, D-1 hábil) y **el examen salió de la ventana: lun 22-feb, con el finde 20-21 feb en medio** (Prometric por agendar/reprogramar, eligibility por confirmar; v5.19: 18 corrimientos, 26 hábiles, examen vie 19-feb; v5.18: 17 corrimientos, 25 hábiles, examen jue 18-feb; v5.17: 16 corrimientos, 23 hábiles, examen mar 16-feb); **cada día más sin estudiar mueve el examen otro hábil o exige recortar temario** (decisión de Joseph). El modo mínimo es ahora la única válvula.

## 0. Principios

1. **El USMLE no se degrada en ÁMBAR.** Los secundarios pagan primero, siempre en el mismo orden.
2. **Un día sin Anki AM + pre-test 10Q = día perdido** (definición operativa). Día perdido = +1 hábil de corrimiento. ⏸ *v6.00: SUPERSEDIDO — el día perdido ya no corre el plan: se paga con colchón (bloque v6.00).*
3. **El nivel se elige a las 05:00** (al abrir el día) y se puede subir de gravedad durante el día, nunca bajar.
   Se registra en la app (MISIÓN DE HOY → selector MODO; `localStorage 'jmd-modo'`, log en `'jmd-modo-log'`).
4. **ROJO máximo 2 días seguidos** sin decisión: al tercero se ejecuta el corrimiento y se vuelve a ÁMBAR. ⏸ *v6.00: ya no hay corrimiento; al tercero se vuelve a ÁMBAR y los días perdidos van al colchón (si el colchón se agota, disparador (e) de la regla anti-replan).*
5. **Dormir es parte del protocolo**, no lo que sobra: LEY CERO 7 h (RUTINA_EXTREMA_MILITARIZADA). En ÁMBAR y
   ROJO la hora liberada se duerme o se descansa sin pantalla — no se rellena con otro frente.

## 1. Niveles y disparadores medibles

| Nivel | Se activa si (cualquiera) | Fuente del dato | Se desactiva cuando |
|---|---|---|---|
| 🟢 **VERDE** | por defecto | — | — |
| 🟡 **ÁMBAR** | · sueño de anoche **< 6 h** · eval 18:00 **< 60 %** dos días seguidos · **1 día perdido** en la semana · Anki **backlog > 100** o retención 30 d < 85 % · síntomas leves (resfrío, dolor) · **≥ 1 de las 4 señales tempranas de burnout** (DOCTRINA §6, checklist de 60 s): **(1)** % en ciego cayendo 2 días seguidos en temas YA dominados · **(2)** releer la misma viñeta > 2 veces sin registrar, o +20 % de tiempo/pregunta sin ganar precisión · **(3)** dormirse en < 5 min (presión de sueño) o insomnio pese al agotamiento · **(4)** cinismo ("es una lotería", "igual no llego") | VITALS quick-log sueño (`mv_wellness_logs` tipo `sueno`) o autoreporte · scores USMLE (`jmd-usmle-scores`, proyecto S3) · `jmd-modo-log` · `DATA/USMLE/_anki_telemetria.json` · **casillas `burnout_*` de la nota del día** (vault `01_USMLE/05_DIARY`, plantilla `_template_day_usmle`, se marcan en el cierre 18:25-18:45 y se confirman en voz alta en el 🚗 VIAJE VUELTA 20:30) | 1 noche ≥ 7 h **y** 1 día completo VERDE cumplido (Anki + 10Q + eval) **y** 0 señales §6 ese día |
| 🔴 **ROJO** | · **≥ 2 días perdidos** seguidos · enfermedad (fiebre, gastro, lesión) · sueño **< 5 h** dos noches · imprevisto que come ≥ 4 h del bloque principal (viaje, trámite, familia) · **señal ROJA conductual: saltarse el gym/baile "para estudiar"** (§6.5 — primer indicador de descompensación, no de compromiso; casilla `burnout_gym`) | los mismos + criterio de Joseph | al día siguiente con Anki + 10Q hechos → ÁMBAR (nunca directo a VERDE) |

Regla de conflicto: si dos disparadores apuntan a niveles distintos, manda el más grave.

**Por qué las señales §6 entran aquí (12-sep-2026):** los disparadores anteriores (sueño, eval, día perdido) miden el daño *después* de ocurrido y el sensor de sueño no llega hasta el puente VITALS (proyecto S5 del vibecoding, mié 4 → mar 10-nov, v5.20; v5.19: mar 3 → lun 9-nov). Las 5 señales de `DATA/ENCAPS/DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` §6 son las tempranas y objetivas: la 1 es la única con valor predictivo demostrado en el propio registro (aparece **antes** que la sensación), las 2-4 son conductuales y se contestan en 60 s, y la 5 (gym) ya estaba definida en PLAN_SABADO_25JUL como "primer signo de descompensación". Con esto la válvula deja de depender de un sensor externo: basta la nota del día.

## 2. Orden de degradación por frente (qué queda de cada uno)

La tabla es la misma que aplica la app (`minimoPorFrente` en `src/lib/homeBriefing.ts`); cada bloque de
MISIÓN DE HOY muestra su mínimo cuando el nivel no es VERDE.

| # | Frente (franja L-V) | 🟢 VERDE | 🟡 ÁMBAR | 🔴 ROJO |
|---|---|---|---|---|
| 1 | 🇺🇸 USMLE · Anki AM 05:00 | completo | **intacto** | **Anki AM completo (innegociable)** |
| 2 | 🇺🇸 USMLE · bloque principal 07:15-12:00 | completo | **intacto** | solo **pre-test 10Q (08:15)** + Anki restante; el resto del bloque = dormir/recuperar |
| 3 | 🇺🇸 USMLE · eval 18:00 | completa | **intacta** | omitida |
| 4 | 🧠 Vibecoding 04:15 | 45' | 15': commit de lo que haya + 1 línea en synapse-journal; sin construir nuevo | omitido |
| 5 | 🧠 SYNAPSE 12:30 | A+B+C (30') | **solo audio B (10')** | omitido |
| 6 | 🔬/🩺 Research · Derma 13:30 | 45' | 1 ítem de 5' (leer el abstract/átomo del día y marcar ✓) | omitido |
| 7 | 💰 AURUM 14:15 | 60' | 1 ítem de 5' (el drill del día, sin vídeo) | omitido |
| 8 | 🇪🇸 MIR 15:15 | eval D-1 + deep work | **solo eval D-1 (15', 15:15-15:30)** | omitido |
| 9 | 🇵🇪 ENCAPS 16:15 | 1 h banqueo | 10Q ciegas (20') **con registro** en TRACKING_ERRORES | omitido |
| 10 | ⚖️ LIVIANO 17:15 | 45' | 1 ítem de 5' (releer el módulo del día, sin aplicación) | omitido |
| — | 🏃 Correr 06:00 · 🏋️ GYM/BAILE 19:00 | según Calendar | caminar 20' en vez de correr; GYM/BAILE opcional (**saltarlo "para estudiar" = ROJO**, no ÁMBAR) | nada; dormir |
| — | 😴 **Siesta OPCIONAL 13:15-13:30** (hueco ya existente entre LECTURA 13:00 y Research/Derma 13:30 · `7jmf8p1l5b5q6jbtmj9uualiq8`) | no hace falta | **válvula ÁMBAR: ≤ 20' con alarma** (más = inercia de sueño y se come el bloque de las 13:30); solo si el modo es ÁMBAR, dormiste < 6 h o anoche marcaste ≥ 1 señal §6; sin pantalla; sin café para "activar" (cafeína ≤ 11:00). NO sustituye las 7 h de la LEY CERO | dormir de verdad (el bloque principal ya está reducido a Anki + 10Q) |

Orden en que se recortan los secundarios si hace falta ir "a medias" dentro de ÁMBAR (primero el que menos
pierde por un día de hueco): AURUM → LIVIANO → Research/Derma → SYNAPSE → Vibecoding → MIR → ENCAPS.
ENCAPS es el último porque su hora ya es de mantenimiento (1 h) y el examen 2027-I sigue siendo meta ≥ 17/20 (**v6.00: examen dom 14-mar-2027 PROVISIONAL**; en la F2 el ENCAPS es el núcleo y no entra en este orden; un día perdido ya no corre nada: se paga con colchón — en F2, el slot de menor brecha · ⏸ v5.20, SUPERSEDIDO: examen FIJADO el mié 10-mar-2027; fase intensiva mar 23-feb → mar 9-mar, sembrada en Supabase como días 97-107; ⚠ confirmar día/hora en la convocatoria SERUMS 2027-I: los ENCAPS se rindieron siempre en domingo).

## 2-bis. Mínimos v6.00 por frente (DJ-4) — manda sobre la tabla §2

| Frente | 🟢 VERDE | 🟡 ÁMBAR (v6.00) | 🔴 ROJO |
|---|---|---|---|
| 🇺🇸 USMLE (Anki AM · bloque principal · eval) — F1, F3, F4 | completo | **intacto** | Anki AM + pre-test 10Q (sin cambio) |
| 🇺🇸 USMLE en la F2 (mantenimiento: Anki 30' L-V + sáb 20Q) | completo | intacto | **Anki vencido ≤15' (Step 1 en mantenimiento)** · bloque principal y eval del Step 1 **omitidos** |
| 🇵🇪 ENCAPS F1 (16:15) | 1 h banqueo | 10Q ciegas (20') con registro | omitido |
| 🇵🇪 ENCAPS F2 (intensiva = núcleo) | loop completo + carril B | **loop: pre-test 10Q + 30Q + eval 20Q** | **Solo Anki cifras + pre-test 10Q del sub-eje (08:15)**; el resto del bloque = dormir/recuperar |
| 🇪🇸 MIR | 1 h | **Anki + 25Q (1 h, DJ-4)** | omitido |
| 🔬/🩺 Research ↔ Derma | 45' (F4: 30' en tiempo muerto) | **30' (mínimo DJ-4)** | omitido |
| 💰 AURUM | 60' (desde el 4-ene: 30') | **30' (mínimo DJ-4)** | omitido |
| 🧠 SYNAPSE · 🛠 vibecoding · ⚖️ LIVIANO (hasta que terminan: vie 26-feb · mié 3-mar · mié 24-feb — v6.02; ⏸ v6.01: 19-feb · 24-feb · 17-feb · ⏸ v6.00: 15-feb · 19-feb · 12-feb) | 30' · 45' · 45' | **30' (mínimo DJ-4)** | omitido |

Notas: (1) fuera de la F2 la columna ROJO de los secundarios es la de v5.20 sin cambios — decisión abierta (DJ-4 dice «nunca desaparecen»); en la F2 el ROJO
es el de las dos filas F2 de arriba (`minimoPorFrente(frente, 'ROJO', iso)` con `faseV6(iso) === 'F2'`). (2) La siesta OPCIONAL 13:15-13:30 y la higiene
circadiana siguen igual. (3) En F4 la plantilla del día depende del turno (M · T · L · G); el mínimo de cada frente es el mismo.

Higiene circadiana que acompaña a la válvula (no cambia franjas; detalle en LEY CERO de `RUTINA_EXTREMA_MILITARIZADA.md`
y en `CALENDAR_SEGMENTOS_V5_6.md` §0): **cafeína ≤ 11:00, máximo 2 tomas (05:00 y 07:00); después agua o descafeinado** —
un café de mediodía sigue activo a las 21:00 y recorta el sueño profundo que consolida lo estudiado. La carrera de las 06:00
al aire libre es la señal de luz matinal: no se pasa a indoor ni en ÁMBAR (se camina 20').

## 3. ROJO = Anki + 10Q + dormir (v6.00: sin remap — el día perdido va al colchón)

> v6.00: en F1/F3/F4 los pasos 1-3 son los de abajo (Anki AM + pre-test 10Q del Step 1); **en la F2** son Anki cifras + pre-test 10Q del sub-eje ENCAPS
> (08:15) + Anki USMLE vencido ≤15'. El paso 4 (remap) queda SUPERSEDIDO: no hay corrimiento (colchón + anti-replan; examen ENCAPS dom 14-mar PROVISIONAL,
> examen Step 1 lun 27-sep-2027).

1. 05:00 Anki AM (todo el due; si el due es > 150, hasta 45' y el resto el día siguiente — **nunca capar**).
2. 08:15 pre-test 10Q del tema del día (tutor, sin cronómetro). Se registra el resultado.
3. Dormir/recuperar. Sin pantallas de estudio. Sin "aprovechar" para vídeos.
4. ⏸ *v6.00: SUPERSEDIDO — ya no hay corrimiento: el bloque principal no hecho queda como fila atrasada y se hace en el próximo colchón (C1/C2 en F1; fila COLCHÓN en F3/F4) *(⏸ v6.00 · v6.01 · v6.02: F1 ya sin C1/C2 → tramo 2)*; en F2 se pierde el slot de menor brecha.* *(Texto v5.20:)* **Decisión de corrimiento** (al cierre del día o a la mañana siguiente): si NO se hizo el bloque principal, el
   día cuenta como perdido → `node DATA/_scripts/remap_inicio.js <mañana>` + `gen_encaps_mantenimiento_2027.js <mañana>`
   (→ execute_sql con backup) + `gen_synapse_plan.js <mañana>` + `gen_aurum_plan.js <mañana>` +
   `gen_vibecoding_plan.js <mañana>` + regenerar USMLE (`gen_usmle_v5.js`; desde v5.8 NO recorta contenido: alarga el final) + docs.
   Los hitos UWSA/NBME son FIJOS en sus fechas: un corrimiento en Fase A mueve contenido, no hitos (única excepción: el UWSA1,
   ya pasado, se movió al D1 en v5.10 → v5.20: mié 7-oct; v5.19: mar 6-oct). 🆕 **Desde la v5.15 (y de nuevo en la v5.16, la v5.17, la v5.18, la v5.19 y la v5.20) los otros 11 hitos también corren con el plan** (conservan su D#, cambian de fecha; en v5.20 casi todos caen en MARTES; v5.19: lunes). ⚠ El D95 ya es el vie 19-feb (último día del plan, D-1 hábil) y el examen quedó FUERA de la ventana (lun 22-feb; el finde 20-21 feb queda entre el D95 y el examen y el dom 21-feb es el D-1 real, sin estudio; el finde 13-14 feb queda entre el D90 y el D91): **no hay colchón**
   — otro corrimiento mueve el examen otro hábil (reprogramar en Prometric; ¿cubre el eligibility period?) o exige recortar contenido — decisión de Joseph ANTES de ejecutar el remap.
5. Al día siguiente: ÁMBAR obligatorio (no VERDE) aunque te sientas bien.

## 4. Semanas DELOAD de los frentes secundarios (fechas intactas · carga 50 %)

Tras cada NBME de mitad de fase el sistema descarga los **secundarios** una semana; el USMLE sigue intacto.
> ✅ **v6.00 (RESUELTO):** las dos semanas deload de F1 no cambian (lun 16-nov *(⏸ v6.00 · ⏸ v6.01 · **v6.02:** lun 23-nov, post-NBME 26 del vie 20-nov)* y lun 28-dic; `DELOAD_SEMANAS`) y el deload es **secundarios −50 % con
> piso 30' (DJ-4) y MIR 1 h** — es lo que pinta la app (chip «DELOAD secundarios −50 % (piso 30' · MIR 1 h)» en MISIÓN DE HOY). Donde la tabla de abajo
> (v5.20) baja MIR a 30' o deja Research/Derma (20'), LIVIANO (25'), SYNAPSE (15') o vibecoding (≤15') por debajo de 30', manda el piso: **MIR 1 h; cada
> secundario ≥ 30'** (ENCAPS F1 1 h → 30'; AURUM 60' → 30'). El Step 1 sigue intacto.
La app marca la semana en el cockpit ("SEMANA · DELOAD") y en MISIÓN DE HOY (chip DELOAD).

| Semana | Fechas | Motivo | Qué significa 50 % |
|---|---|---|---|
| **S7** (S7 en v5.19, S6 en v5.18, S7 en v5.17, S6 en v5.16, S7 en v5.13, S8 en v5.9) | lun 16 → vie 20-nov-2026 (sin cambio en v5.20) | post-NBME 26 (**mar 10-nov, D25** en v5.20; v5.19: lun 9-nov — la deload sigue siendo la semana SIGUIENTE al hito) | MIR: eval D-1 + 30' (no 60') · ENCAPS: 12Q del tema del día (no 25) + registro · LIVIANO: 25' solo estudio (sin aplicación) · Research/Derma: 20' · AURUM: 30' · SYNAPSE: solo A (15') · Vibecoding: ✅ **sigue alineado en v5.20 sin tocar el catálogo** (por mayoría): con el D1 en miércoles los bloques van mié→mar y el proyecto que lleva el flag `deload: true`, el **S7 motor de preguntas ENCAPS (mié 18 → mar 24-nov)**, cubre 3 de los 5 días de la semana deload (mié 18 → vie 20-nov); el lun 16 y el mar 17-nov son los 2 últimos días del S6 `rls-datos-tesis` (mié 11 → mar 17-nov, proyecto normal) · 2 días de 45' + 3 de ≤15' *(v5.19: bloques mar→lun, el S7 mar 17 → lun 23-nov cubría 4 de 5; v5.18: bloques lun→vie, la deload 9-13 nov = S6 exacta sin flag, flag en S7; v5.17: bloques jue→mié, la deload quedaba repartida entre S6 y S7)* |
| **S13** (S13 en v5.19, S12 en v5.18, S13 en v5.17, S12 en v5.16, S13 en v5.13, S14 en v5.9) | lun 28 → mié 30-dic-2026 (jue 31-dic y vie 1-ene feriados; sin cambio en v5.20) | post-NBME 28 (**mar 22-dic, D55** en v5.20; v5.19: lun 21-dic) | ídem (en v5.20 el capstone S12 del vibecoding corre mié 23 → mié 30-dic —los 3 días de la semana deload, lun 28 / mar 29 / mié 30, son sus 3 últimos pasos— con SHIP el sáb 2-ene; desde el lun 4-ene la franja 04:15 = taper ≤15'/día (S13-S16) y journal 5' (S17-S20) hasta el **vie 19-feb-2027** (D95 = último día del plan, D-1 hábil; examen lun 22-feb): sensores verdes + journal) *(v5.19: capstone mar 22 → mar 29-dic, taper desde el mié 30-dic hasta el jue 18-feb; v5.18: deload lun 21 → jue 24-dic = S12, capstone lun 21 → lun 28-dic, taper desde el mar 29-dic hasta el mié 17-feb; v5.17: capstone jue 17 → mié 23-dic, taper desde el jue 24-dic hasta el lun 15-feb)* |

Reglas del deload: los temas/días de cada plan NO se mueven (el tema de ese día se hace a la mitad, no se
pospone); el Anki de sáb/dom sigue dimensionándose por `due × 20 s`; si la semana de deload coincide con
ÁMBAR/ROJO, manda el nivel (más restrictivo).

## 5. Fuentes de datos y cómo se cierra el bucle

- **Sueño**: quick-log de VITALS a las 07:00 (20 s, `mv_wellness_logs` tipo `sueno`, user `joseph`). Mientras no
  haya registro reciente (último dato: jun-2026), el disparador se evalúa por autoreporte al elegir el modo.
  Proyecto **S5** del vibecoding (`vitals-puente`, mié 4 → mar 10-nov, SHIP sáb 14-nov · bloque mié→mar, v5.20; v5.19: mar 3 → lun 9-nov, SHIP sáb 14-nov) lleva el dato al Home y sugiere ÁMBAR automáticamente.
- **Eval 18:00 y pre-test**: proyecto **S3** (mié 21 → mar 27-oct, SHIP sáb 31-oct · bloque mié→mar, v5.20; *(⏸ v6.00 · ⏸ v6.01: S3 lun 26 → vie 30-oct, SHIP sáb 31-oct · **v6.02:** S3 lun 2 → vie 6-nov, SHIP sáb 7-nov)* v5.19: mar 20 → lun 26-oct, SHIP sáb 31-oct) crea `jmd-usmle-scores` → Supabase. Hasta entonces se anota
  a mano en la revisión semanal.
- **Anki backlog/retención**: `node DATA/_scripts/anki_telemetria.js` (Anki abierto) → KPI del cockpit + alarma G.
- **Días perdidos / niveles**: `jmd-modo-log` (la app) → export de localStorage → `gen_revision_semanal.js`
  (métrica 9). El sábado 07:15 se revisa cuántos días fueron ÁMBAR/ROJO y (**v6.00**) cuánto colchón se consumió y si quedan filas atrasadas (⏸ v5.20: «y si el corrimiento se ejecutó»).
  **v5.10 (12-sep; vigente en v5.11-v5.20):** los ✓ de los 10 planes ya no viven solo en el navegador: la app los espeja en Supabase
  `plan_checks` (`src/lib/studyProgressSync.ts`; instrumento PROGRESO del cockpit = exportar/importar/sincronizar)
  y el script los lee directamente (unión con el export si lo hay) → "día perdido" se detecta sin tocar el navegador.
- **Señales de burnout (§6) y modo del día**: la nota diaria del vault (`01_USMLE/05_DIARY/<fecha>.md`, plantilla
  `_template_day_usmle.md`, 60 s en el cierre 18:25-18:45) lleva `modo`, `sueno_h`, `pretest10/q30_pct/eval_pct` y
  las 5 casillas `burnout_*`; `gen_revision_semanal.js` parsea ese frontmatter como fallback de las métricas 1, 8 y 9
  y pre-marca la alarma **BURNOUT** en la 10 (≥ 1 señal → ÁMBAR; `burnout_gym` → ROJO conductual). El
  `00_DASHBOARD_USMLE` del vault muestra la misma semana en dataview. Receta: `DATA/SYNC_ANKI_OBSIDIAN_APP.md`.
- **Revisión semanal**: `DATA/REVISION_SEMANAL.md` (sábado 07:15-07:45 desde v6.00, serie `k8iaefnjq0mnrlvkilhcarrik8` → sáb 1-may; ⏸ v5.20: 07:15-07:35; en el SERUMS 20' dentro del Step 1 del sábado). Tres semanas seguidas con ≥ 2 días ÁMBAR
  = el plan está mal dimensionado, no Joseph: se abre reestructuración (no se "aguanta").

## 6. Checklist de 30 segundos (05:00)

- [ ] ¿Dormí ≥ 6 h? (si no → ÁMBAR)
- [ ] ¿Ayer hice Anki + 10Q? (si no → hoy ÁMBAR; si tampoco anteayer → ROJO; **v6.00: sin remap** — los días perdidos van al colchón)
- [ ] ¿Estoy enfermo o hay un imprevisto de ≥ 4 h? (sí → ROJO)
- [ ] ¿El cockpit muestra "ANKI · ⚠ avalancha"? (sí → ÁMBAR + cero nuevas hasta backlog < 20)
- [ ] ¿Anoche marqué ≥ 1 señal §6 en la nota del día? (sí → ÁMBAR; si fue "salté el gym para estudiar" → ROJO)
- [ ] Elijo el modo en MISIÓN DE HOY y no lo bajo de gravedad hasta mañana. (Cafeína: 05:00 y 07:00, nada después de las 11:00.)

---
*Relación con otros docs: `DATA/REESTRUCTURACION_31AGO_2026.md` (régimen), `DATA/ENCAPS/RUTINA_EXTREMA_MILITARIZADA.md`
(LEY CERO 7 h + cafeína ≤ 11:00; su tabla horaria es del loop ENCAPS de julio — la vigente es la de MISIÓN DE HOY),
`DATA/ENCAPS/DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` §6 (las 5 señales de burnout, ahora disparadores de este protocolo),
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G (alarmas) y Parte V (mínimos on-track por hito),
`DATA/REVISION_SEMANAL.md`, `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría, regla del finde y diario USMLE en Obsidian).
Calendar: 🚗 VIAJE VUELTA `3l59kpei7sg0l6kq51343or383` (pregunta por las 5 señales) · LECTURA DE LIBRO `7jmf8p1l5b5q6jbtmj9uualiq8`
(siesta opcional 13:15-13:30) · DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv` y DEEP PRIME `iuhj8busrh63ms7v4j5q8e9920` (v6.00, recreada el 6-oct; la v5.20 `cb2uh20jnvu7pgfev4183pgctc` ya no existe) (cafeína ≤ 11:00).*
