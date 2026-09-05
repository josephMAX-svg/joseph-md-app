# 🚦 PROTOCOLO DE MODO MÍNIMO — VERDE · ÁMBAR · ROJO (v5.7 · 5-sep-2026)

> Válvula de burnout del régimen v5.6 (D1 = lun 7-sep-2026 · Step 1 = bloque principal · examen 25-29 ene 2027).
> **No cambia franjas, metas ni fechas de examen.** Solo define, por escrito y con disparadores medibles, qué
> se recorta primero cuando el día no da para todo — para que el recorte sea una decisión y no un colapso.
> Palmerton: el fracaso es de comportamiento y proceso; "estudiar de noche exhausto" y la "procrastinación
> productiva" son alarmas (checklist G de `DATA/USMLE/PALMERTON_POR_MATERIA.md`). El único mínimo que ya
> existía era el del USMLE (Anki + 10Q); aquí se extiende a los 9 frentes con orden de degradación.
> Evidencia de fragilidad que motiva el protocolo: 5 días perdidos seguidos (31-ago→4-sep) y el 25-jun.

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
| 🟡 **ÁMBAR** | · sueño de anoche **< 6 h** · eval 18:00 **< 60 %** dos días seguidos · **1 día perdido** en la semana · Anki **backlog > 100** o retención 30 d < 85 % · síntomas leves (resfrío, dolor) | VITALS quick-log sueño (`mv_wellness_logs` tipo `sueno`) o autoreporte · scores USMLE (`jmd-usmle-scores`, proyecto S3) · `jmd-modo-log` · `DATA/USMLE/_anki_telemetria.json` | 1 noche ≥ 7 h **y** 1 día completo VERDE cumplido (Anki + 10Q + eval) |
| 🔴 **ROJO** | · **≥ 2 días perdidos** seguidos · enfermedad (fiebre, gastro, lesión) · sueño **< 5 h** dos noches · imprevisto que come ≥ 4 h del bloque principal (viaje, trámite, familia) | los mismos + criterio de Joseph | al día siguiente con Anki + 10Q hechos → ÁMBAR (nunca directo a VERDE) |

Regla de conflicto: si dos disparadores apuntan a niveles distintos, manda el más grave.

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
| — | 🏃 Correr 06:00 · 🏋️ GYM/BAILE 19:00 | según Calendar | caminar 20' en vez de correr; GYM/BAILE opcional | nada; dormir |

Orden en que se recortan los secundarios si hace falta ir "a medias" dentro de ÁMBAR (primero el que menos
pierde por un día de hueco): AURUM → LIVIANO → Research/Derma → SYNAPSE → Vibecoding → MIR → ENCAPS.
ENCAPS es el último porque su hora ya es de mantenimiento (1 h) y el examen 2027-I sigue siendo meta ≥ 17/20.

## 3. ROJO = Anki + 10Q + dormir + remap

1. 05:00 Anki AM (todo el due; si el due es > 150, hasta 45' y el resto el día siguiente — **nunca capar**).
2. 08:15 pre-test 10Q del tema del día (tutor, sin cronómetro). Se registra el resultado.
3. Dormir/recuperar. Sin pantallas de estudio. Sin "aprovechar" para vídeos.
4. **Decisión de corrimiento** (al cierre del día o a la mañana siguiente): si NO se hizo el bloque principal, el
   día cuenta como perdido → `node DATA/_scripts/remap_inicio.js <mañana>` + `gen_encaps_mantenimiento_2027.js <mañana>`
   (→ execute_sql con backup) + `gen_synapse_plan.js <mañana>` + `gen_aurum_plan.js <mañana>` +
   `gen_vibecoding_plan.js <mañana>` + regenerar USMLE (gen_usmle_v5.js, recorta 1 día de contenido) + docs.
   Los hitos UWSA/NBME son FIJOS en sus viernes: un corrimiento en Fase A recorta contenido, no mueve hitos.
5. Al día siguiente: ÁMBAR obligatorio (no VERDE) aunque te sientas bien.

## 4. Semanas DELOAD de los frentes secundarios (fechas intactas · carga 50 %)

Tras cada NBME de mitad de fase el sistema descarga los **secundarios** una semana; el USMLE sigue intacto.
La app marca la semana en el cockpit ("SEMANA · DELOAD") y en MISIÓN DE HOY (chip DELOAD).

| Semana | Fechas | Motivo | Qué significa 50 % |
|---|---|---|---|
| **S8** | lun 26 → vie 30-oct-2026 | post-NBME 26 (vie 23-oct) | MIR: eval D-1 + 30' (no 60') · ENCAPS: 12Q del tema del día (no 25) + registro · LIVIANO: 25' solo estudio (sin aplicación) · Research/Derma: 20' · AURUM: 30' · SYNAPSE: solo A (15') · Vibecoding: proyecto S8 ya en deload en el catálogo (2 días de 45' + 3 de 15') |
| **S14** | lun 7 → vie 11-dic-2026 | post-NBME 28 (vie 4-dic) | ídem (el vibecoding S1-S12 ya terminó el 27-nov: la franja 04:15 en S14 = Anki extra o dormir) |

Reglas del deload: los temas/días de cada plan NO se mueven (el tema de ese día se hace a la mitad, no se
pospone); el Anki de sáb/dom sigue dimensionándose por `due × 20 s`; si la semana de deload coincide con
ÁMBAR/ROJO, manda el nivel (más restrictivo).

## 5. Fuentes de datos y cómo se cierra el bucle

- **Sueño**: quick-log de VITALS a las 07:00 (20 s, `mv_wellness_logs` tipo `sueno`, user `joseph`). Mientras no
  haya registro reciente (último dato: jun-2026), el disparador se evalúa por autoreporte al elegir el modo.
  Proyecto **S7** del vibecoding (19-23 oct) lleva el dato al Home y sugiere ÁMBAR automáticamente.
- **Eval 18:00 y pre-test**: proyecto **S3** (21-25 sep) crea `jmd-usmle-scores` → Supabase. Hasta entonces se anota
  a mano en la revisión semanal.
- **Anki backlog/retención**: `node DATA/_scripts/anki_telemetria.js` (Anki abierto) → KPI del cockpit + alarma G.
- **Días perdidos / niveles**: `jmd-modo-log` (la app) → export de localStorage → `gen_revision_semanal.js`
  (métrica 9). El sábado 07:15 se revisa cuántos días fueron ÁMBAR/ROJO y si el corrimiento se ejecutó.
- **Revisión semanal**: `DATA/REVISION_SEMANAL.md` (sábado 07:15-07:35). Tres semanas seguidas con ≥ 2 días ÁMBAR
  = el plan está mal dimensionado, no Joseph: se abre reestructuración (no se "aguanta").

## 6. Checklist de 30 segundos (05:00)

- [ ] ¿Dormí ≥ 6 h? (si no → ÁMBAR)
- [ ] ¿Ayer hice Anki + 10Q? (si no → hoy ÁMBAR; si tampoco anteayer → ROJO + remap)
- [ ] ¿Estoy enfermo o hay un imprevisto de ≥ 4 h? (sí → ROJO)
- [ ] ¿El cockpit muestra "ANKI · ⚠ avalancha"? (sí → ÁMBAR + cero nuevas hasta backlog < 20)
- [ ] Elijo el modo en MISIÓN DE HOY y no lo bajo de gravedad hasta mañana.

---
*Relación con otros docs: `DATA/REESTRUCTURACION_31AGO_2026.md` (régimen), `DATA/ENCAPS/RUTINA_EXTREMA_MILITARIZADA.md`
(LEY CERO 7 h; su tabla horaria es del loop ENCAPS de julio — la vigente es la de MISIÓN DE HOY),
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G (alarmas) y Parte V (mínimos on-track por hito),
`DATA/REVISION_SEMANAL.md`, `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría y regla del finde).*
