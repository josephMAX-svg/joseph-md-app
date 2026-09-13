# 🚦 PROTOCOLO DE MODO MÍNIMO — VERDE · ÁMBAR · ROJO (v5.10 · re-fechado 12-sep-2026)

> Válvula de burnout del régimen v5.10 (D1 = lun 14-sep-2026 · Step 1 = bloque principal · D95 = mié 27-ene-2027 · examen vie 29-ene-2027, ventana 25-29 ene).
> **No cambia franjas, metas ni fechas de examen.** Solo define, por escrito y con disparadores medibles, qué
> se recorta primero cuando el día no da para todo — para que el recorte sea una decisión y no un colapso.
> Palmerton: el fracaso es de comportamiento y proceso; "estudiar de noche exhausto" y la "procrastinación
> productiva" son alarmas (checklist G de `DATA/USMLE/PALMERTON_POR_MATERIA.md`). El único mínimo que ya
> existía era el del USMLE (Anki + 10Q); aquí se extiende a los 9 frentes con orden de degradación.
> Evidencia de fragilidad que motiva el protocolo: **9 corrimientos seguidos (31-ago→14-sep, 10 días hábiles perdidos)** — 5 en bloque (31-ago→4-sep) y luego uno a uno el 7, 8, 9, 10 y 11 de septiembre — más el 25-jun. Con el plan cerrando el mié 27-ene y el examen el vie 29-ene, **el siguiente corrimiento ya no cabe** sin recortar contenido o salir de la ventana: el modo mínimo es ahora la única válvula.

## 0. Principios

1. **El USMLE no se degrada en ÁMBAR.** Los secundarios pagan primero, siempre en el mismo orden.
2. **Un día sin Anki AM + pre-test 10Q = día perdido** (definición operativa). Día perdido = +1 hábil de corrimiento.
3. **El nivel se elige a las 05:00** (al abrir el día) y se puede subir de gravedad durante el día, nunca bajar.
   Se registra en la app (MISIÓN DE HOY → selector MODO; `localStorage 'jmd-modo'`, log en `'jmd-modo-log'`).
4. **ROJO máximo 2 días seguidos** sin decisión: al tercero se ejecuta el corrimiento y se vuelve a ÁMBAR.
5. **Dormir es parte del protocolo**, no lo que sobra: LEY CERO 7 h (RUTINA_EXTREMA_MILITARIZADA). En ÁMBAR y
   ROJO la hora liberada se duerme o se descansa sin pantalla — no se rellena con otro frente.

## 1. Niveles y disparadores medibles

| Nivel | Se activa si (cualquiera) | Fuente del dato | Se desactiva cuando |
|---|---|---|---|
| 🟢 **VERDE** | por defecto | — | — |
| 🟡 **ÁMBAR** | · sueño de anoche **< 6 h** · eval 18:00 **< 60 %** dos días seguidos · **1 día perdido** en la semana · Anki **backlog > 100** o retención 30 d < 85 % · síntomas leves (resfrío, dolor) · **≥ 1 de las 4 señales tempranas de burnout** (DOCTRINA §6, checklist de 60 s): **(1)** % en ciego cayendo 2 días seguidos en temas YA dominados · **(2)** releer la misma viñeta > 2 veces sin registrar, o +20 % de tiempo/pregunta sin ganar precisión · **(3)** dormirse en < 5 min (presión de sueño) o insomnio pese al agotamiento · **(4)** cinismo ("es una lotería", "igual no llego") | VITALS quick-log sueño (`mv_wellness_logs` tipo `sueno`) o autoreporte · scores USMLE (`jmd-usmle-scores`, proyecto S3) · `jmd-modo-log` · `DATA/USMLE/_anki_telemetria.json` · **casillas `burnout_*` de la nota del día** (vault `01_USMLE/05_DIARY`, plantilla `_template_day_usmle`, se marcan en el cierre 18:25-18:45 y se confirman en voz alta en el 🚗 VIAJE VUELTA 20:30) | 1 noche ≥ 7 h **y** 1 día completo VERDE cumplido (Anki + 10Q + eval) **y** 0 señales §6 ese día |
| 🔴 **ROJO** | · **≥ 2 días perdidos** seguidos · enfermedad (fiebre, gastro, lesión) · sueño **< 5 h** dos noches · imprevisto que come ≥ 4 h del bloque principal (viaje, trámite, familia) · **señal ROJA conductual: saltarse el gym/baile "para estudiar"** (§6.5 — primer indicador de descompensación, no de compromiso; casilla `burnout_gym`) | los mismos + criterio de Joseph | al día siguiente con Anki + 10Q hechos → ÁMBAR (nunca directo a VERDE) |

Regla de conflicto: si dos disparadores apuntan a niveles distintos, manda el más grave.

**Por qué las señales §6 entran aquí (12-sep-2026):** los disparadores anteriores (sueño, eval, día perdido) miden el daño *después* de ocurrido y el sensor de sueño no llega hasta el puente VITALS (proyecto S7). Las 5 señales de `DATA/ENCAPS/DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` §6 son las tempranas y objetivas: la 1 es la única con valor predictivo demostrado en el propio registro (aparece **antes** que la sensación), las 2-4 son conductuales y se contestan en 60 s, y la 5 (gym) ya estaba definida en PLAN_SABADO_25JUL como "primer signo de descompensación". Con esto la válvula deja de depender de un sensor externo: basta la nota del día.

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
ENCAPS es el último porque su hora ya es de mantenimiento (1 h) y el examen 2027-I sigue siendo meta ≥ 17/20.

Higiene circadiana que acompaña a la válvula (no cambia franjas; detalle en LEY CERO de `RUTINA_EXTREMA_MILITARIZADA.md`
y en `CALENDAR_SEGMENTOS_V5_6.md` §0): **cafeína ≤ 11:00, máximo 2 tomas (05:00 y 07:00); después agua o descafeinado** —
un café de mediodía sigue activo a las 21:00 y recorta el sueño profundo que consolida lo estudiado. La carrera de las 06:00
al aire libre es la señal de luz matinal: no se pasa a indoor ni en ÁMBAR (se camina 20').

## 3. ROJO = Anki + 10Q + dormir + remap

1. 05:00 Anki AM (todo el due; si el due es > 150, hasta 45' y el resto el día siguiente — **nunca capar**).
2. 08:15 pre-test 10Q del tema del día (tutor, sin cronómetro). Se registra el resultado.
3. Dormir/recuperar. Sin pantallas de estudio. Sin "aprovechar" para vídeos.
4. **Decisión de corrimiento** (al cierre del día o a la mañana siguiente): si NO se hizo el bloque principal, el
   día cuenta como perdido → `node DATA/_scripts/remap_inicio.js <mañana>` + `gen_encaps_mantenimiento_2027.js <mañana>`
   (→ execute_sql con backup) + `gen_synapse_plan.js <mañana>` + `gen_aurum_plan.js <mañana>` +
   `gen_vibecoding_plan.js <mañana>` + regenerar USMLE (`gen_usmle_v5.js`; desde v5.8 NO recorta contenido: alarga el final) + docs.
   Los hitos UWSA/NBME son FIJOS en sus fechas: un corrimiento en Fase A mueve contenido, no hitos (única excepción: el UWSA1,
   ya pasado, se movió al D1 en v5.10). ⚠ En v5.10 el D95 ya es el mié 27-ene y el examen el vie 29-ene: no queda colchón
   para otro corrimiento sin recortar o salir de la ventana 25-29 ene — decisión de Joseph antes de ejecutar el remap.
5. Al día siguiente: ÁMBAR obligatorio (no VERDE) aunque te sientas bien.

## 4. Semanas DELOAD de los frentes secundarios (fechas intactas · carga 50 %)

Tras cada NBME de mitad de fase el sistema descarga los **secundarios** una semana; el USMLE sigue intacto.
La app marca la semana en el cockpit ("SEMANA · DELOAD") y en MISIÓN DE HOY (chip DELOAD).

| Semana | Fechas | Motivo | Qué significa 50 % |
|---|---|---|---|
| **S7** (S8 en v5.9) | lun 26 → vie 30-oct-2026 | post-NBME 26 (vie 23-oct) | MIR: eval D-1 + 30' (no 60') · ENCAPS: 12Q del tema del día (no 25) + registro · LIVIANO: 25' solo estudio (sin aplicación) · Research/Derma: 20' · AURUM: 30' · SYNAPSE: solo A (15') · Vibecoding: ⚠ en v5.10 el proyecto S8 (el que lleva `deload: true` en el catálogo, 2 días de 45' + 3 de 15') corre **lun 2 → vie 6-nov**, una semana DESPUÉS de esta; la semana de deload la ocupa entera el S7 (puente VITALS) a carga normal. Decisión de Joseph — **A VERIFICAR (12-sep)**: mover el flag `deload` a S7 en `vibecoding_proyectos.json` (y regenerar) o dejar el deload del vibecoding en 2-6 nov |
| **S13** (S14 en v5.9) | lun 7 → vie 11-dic-2026 | post-NBME 28 (vie 4-dic) | ídem (el vibecoding S1-S12 termina el **vie 4-dic-2026** y su último SHIP es el sáb 5-dic: en S13 la franja 04:15 = Anki extra o dormir) |

Reglas del deload: los temas/días de cada plan NO se mueven (el tema de ese día se hace a la mitad, no se
pospone); el Anki de sáb/dom sigue dimensionándose por `due × 20 s`; si la semana de deload coincide con
ÁMBAR/ROJO, manda el nivel (más restrictivo).

## 5. Fuentes de datos y cómo se cierra el bucle

- **Sueño**: quick-log de VITALS a las 07:00 (20 s, `mv_wellness_logs` tipo `sueno`, user `joseph`). Mientras no
  haya registro reciente (último dato: jun-2026), el disparador se evalúa por autoreporte al elegir el modo.
  Proyecto **S7** del vibecoding (lun 26-oct → vie 30-oct, SHIP sáb 31-oct) lleva el dato al Home y sugiere ÁMBAR automáticamente.
- **Eval 18:00 y pre-test**: proyecto **S3** (lun 28-sep → vie 2-oct, SHIP sáb 3-oct) crea `jmd-usmle-scores` → Supabase. Hasta entonces se anota
  a mano en la revisión semanal.
- **Anki backlog/retención**: `node DATA/_scripts/anki_telemetria.js` (Anki abierto) → KPI del cockpit + alarma G.
- **Días perdidos / niveles**: `jmd-modo-log` (la app) → export de localStorage → `gen_revision_semanal.js`
  (métrica 9). El sábado 07:15 se revisa cuántos días fueron ÁMBAR/ROJO y si el corrimiento se ejecutó.
  **v5.10 (12-sep):** los ✓ de los 10 planes ya no viven solo en el navegador: la app los espeja en Supabase
  `plan_checks` (`src/lib/studyProgressSync.ts`; instrumento PROGRESO del cockpit = exportar/importar/sincronizar)
  y el script los lee directamente (unión con el export si lo hay) → "día perdido" se detecta sin tocar el navegador.
- **Señales de burnout (§6) y modo del día**: la nota diaria del vault (`01_USMLE/05_DIARY/<fecha>.md`, plantilla
  `_template_day_usmle.md`, 60 s en el cierre 18:25-18:45) lleva `modo`, `sueno_h`, `pretest10/q30_pct/eval_pct` y
  las 5 casillas `burnout_*`; `gen_revision_semanal.js` parsea ese frontmatter como fallback de las métricas 1, 8 y 9
  y pre-marca la alarma **BURNOUT** en la 10 (≥ 1 señal → ÁMBAR; `burnout_gym` → ROJO conductual). El
  `00_DASHBOARD_USMLE` del vault muestra la misma semana en dataview. Receta: `DATA/SYNC_ANKI_OBSIDIAN_APP.md`.
- **Revisión semanal**: `DATA/REVISION_SEMANAL.md` (sábado 07:15-07:35). Tres semanas seguidas con ≥ 2 días ÁMBAR
  = el plan está mal dimensionado, no Joseph: se abre reestructuración (no se "aguanta").

## 6. Checklist de 30 segundos (05:00)

- [ ] ¿Dormí ≥ 6 h? (si no → ÁMBAR)
- [ ] ¿Ayer hice Anki + 10Q? (si no → hoy ÁMBAR; si tampoco anteayer → ROJO + remap)
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
(siesta opcional 13:15-13:30) · DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv` y DEEP PRIME `cb2uh20jnvu7pgfev4183pgctc` (cafeína ≤ 11:00).*
