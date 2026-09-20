# 📋 REVISIÓN SEMANAL — sábado 07:15-07:35 (20') · v5.14 · re-fechado 19-sep-2026

> Ritual único que revisa los 9 frentes del régimen v5.14 (D1 = lun 21-sep-2026, Step 1 = principal; D95 = mié 3-feb = D-1; examen target jue 4-feb-2027) con
> **10 métricas** y una sola pregunta: *¿el sistema va on-track o hay que corregir ESTA semana?*
> Palmerton revisa el checklist G "en cada hito NBME" (~3 semanas): demasiado grueso para un plan donde
> 1 día perdido = +1 hábil. Aquí la cadencia es semanal y el trabajo de recopilar lo hace un script.
>
> **Franja**: sábado 07:15-07:35 (hueco libre tras el desayuno; no toca las franjas L-V). El evento **📋 REVISIÓN SEMANAL ya existe en el
> Google Calendar** (id `21fbiohc1i47r4lqmaa3eb76l4`, sáb 07:15-07:35 desde el 26-sep-2026, UNTIL 7-feb-2027; creado el 19-sep con el sábado por defecto —
> la elección sáb/dom sigue siendo decisión de Joseph). **Semana 1 = sáb 26-sep-2026** = semana lun 21 → vie 25-sep (D1-D5; con D1 en lunes ya no hay
> sábado "pre-D1": el sáb 19-sep queda fuera del plan). Las semanas se numeran desde `DAILY_META.inicio` = 21-sep — misma regla que `semanaStep1()` del cockpit y que
> `gen_revision_semanal.js` (lee el `inicio` del `.ts`); con D1 en lunes el plan cierra en **20 semanas exactas**: la S20 (lun 1 → mié 3-feb = D93-D95) contiene el D-1 y el
> examen del jue 4-feb, y su sábado 6-feb es a la vez la revisión y el post-mortem. Los hitos conservan su fecha (solo el UWSA1 se movió al D1 = lun 21-sep) y bajan 2 su D#;
> los SHIP del vibecoding siguen en los mismos sábados (S1 sáb 26-sep … S12 sáb 12-dic) y ahora coinciden 1:1 con las semanas de revisión S1-S12.
>
> **Pre-relleno automático** (viernes 21:00 o sábado 07:10, 1 comando):
> `node DATA/_scripts/gen_revision_semanal.js` → `DATA/USMLE/REVISIONES/S<NN>_<sábado>.md` + append en
> `DATA/USMLE/REVISIONES/_semanas.json`. Fuentes: Supabase (SELECT anon: `study_schedule`, `study_sim_scores`,
> `study_metrics`, `study_checks` y, **desde el 12-sep, `plan_checks`** = los ✓ de los 10 planes que la app espeja
> desde localStorage vía `src/lib/studyProgressSync.ts`; VITALS `mv_wellness_logs` solo si hay credencial en env, si no "sin acceso") ·
> export de localStorage (`jmd-*`, ahora **opcional**: complementa por unión y es el fallback sin red) ·
> **diario USMLE en Obsidian** (frontmatter de `01_USMLE/05_DIARY/*.md`: pre-test/30Q/eval, sueño, modo y las 5 casillas de burnout;
> `--vault` o env `JMD_VAULT`) · `DATA/SYNAPSE/_vibecoding_ship.json` (si existe: SHIPPED del verificador) ·
> AnkiConnect (localhost:8765; si no responde, "Anki cerrado") ·
> `DATA/USMLE/_anki_telemetria.json` · `DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json` ·
> los planes `src/lib/*Plan.ts`. Lo que el script no encuentra queda como **"sin dato"** — se rellena a mano
> en los 20', nunca se inventa.

## Los 20 minutos

| Min | Paso |
|---|---|
| 0-2 | Abrir `S<NN>_<sábado>.md` (ya pre-rellenado). Si el cockpit dice "☁ offline" o el script no vio `plan_checks`, tocar PROGRESO → **Sincronizar ahora** (o exportar el JSON, snippet abajo, 20 s). |
| 2-10 | Rellenar a mano las métricas "sin dato" (uWorld %, eval media si aún no hay S3, MIR, VITALS). |
| 10-14 | Checklist G (métrica 10): marcar alarmas activas. **Una sola alarma = corregir esta semana.** |
| 14-18 | Decidir: nivel de la semana que entra (VERDE/ÁMBAR/deload), 1 corrección concreta, 1 cosa que se deja de hacer. |
| 18-20 | Guardar. Anki del sábado (19:00) y del domingo (17:00) = `minFinde` de la métrica 3. |

## Las 10 métricas

| # | Métrica | Fuente automática | On-track | Alarma → acción |
|---|---|---|---|---|
| 1 | **USMLE · medias de la semana**: pre-test /10 · 30Q % · eval 18:00 % | `jmd-usmle-scores` (proyecto S3 del vibecoding); **fallback: diario Obsidian** (`pretest10` / `q30_pct` / `eval_pct` / `error_dominante` de la nota del día, 60 s en el cierre 18:25-18:45) | pre-test ≥ 5/10 · 30Q ≥ 65 % · eval ≥ 60 % (gate Palmerton 80 % = tema dominado) | eval < 60 % dos días seguidos → ÁMBAR; media 7 d < 55 % → auditar el tipo de error dominante (knowledge/transfer/proceso), no sumar horas |
| 2 | **uWorld % acumulado vs mínimo on-track** del próximo hito | manual (dashboard uWorld); el script imprime el hito y su mínimo (Parte V) | NBME 25 ≥ 51 · 26 ≥ 54 · 27 ≥ 57 · 28 ≥ 61 · 29 ≥ 63 · 30 ≥ 65 · 31 ≥ 68 (GO) | > 5 puntos bajo el mínimo → auditar método (no horas); UWSA1 jue 17-sep = baseline sin juicio |
| 3 | **Anki**: due medio · backlog · retención 30 d · % Again · **minFinde** | `_anki_telemetria.json` + AnkiConnect en vivo | backlog < 20 · retención 85-92 % · Again < 15 % | backlog > 100 o retención < 85 % = **alarma G "avalancha"** → cero nuevas hasta backlog < 20; Anki finde = due × 20 s |
| 4 | **ENCAPS · % ciego del viernes** (mini-sim 25Q) + rondas de la semana | `_registro_resoluciones.json` (examen ENCAPS, fecha en la semana) | ≥ 18/25 hacia diciembre (crucero 75 %; meta 85 %) | < 15/25 dos viernes seguidos → re-ponderar la rotación (PROTOCOLO_HORA_MANTENIMIENTO) |
| 5 | **MIR · eval D-1** media + días con eval | `jmd-mir-eval-log` (export localStorage) | ≥ 60 % · 5/5 días | < 50 % media → solo eval D-1 la semana siguiente (deep work al tema peor) |
| 6 | **SYNAPSE · misiones ✓** (L-sáb) | Supabase `plan_checks` (plan_key `synapse`) ∪ `jmd-study-progress-v1.synapse` vs días del plan en la semana | ≥ 5/6 | < 4/6 dos semanas → SYNAPSE a solo audio B hasta recuperar el hábito |
| 7 | **Vibecoding · proyecto S<n> shipped** (sí/no + evidencia) | `plan_checks` (`vibecoding`, 5/5 días = auto-reporte) + **`DATA/SYNAPSE/_vibecoding_ship.json`** si existe (`verify_vibecoding.js`: criterios ok/total → SHIPPED real manda sobre el ✓) + commit/URL/test | 1 proyecto/semana con los 4 criterios de aceptación | no shipped → el sábado PC cierra; NUNCA se arrastra a la semana siguiente (VIBECODING_12_PROYECTOS.md) |
| 8 | **VITALS**: adherencia (días con log) · sueño medio · noches < 7 h · agua media | `mv_wellness_logs` (user `joseph`, tipos `sueno`/`agua`) si hay credencial; **fallback del sueño: `sueno_h` del diario Obsidian**; si nada, manual | sueño ≥ 7 h · 0 noches < 6 h · agua ≥ 3.000 ml | 1 noche < 6 h → ÁMBAR al día siguiente; 3 noches < 7 h → bajar carga de secundarios (PROTOCOLO_MODO_MINIMO) |
| 9 | **Días perdidos** + niveles ÁMBAR/ROJO de la semana + corrimiento ejecutado (sí/no) | `plan_checks` (`usmle`) ∪ `jmd-study-progress-v1.usmle` vs días del plan · niveles: `jmd-modo-log` ∪ campo `modo` del diario (la app manda si ambos existen) | 0 perdidos · ≤ 1 ÁMBAR | 1 perdido = +1 hábil (`remap_inicio.js <fecha>`); ≥ 2 ÁMBAR tres semanas seguidas = plan mal dimensionado → reestructurar |
| 10 | **Alarma checklist G** (PALMERTON_POR_MATERIA §G) **+ burnout §6**: nº de alarmas activas y cuál | el script pre-marca: G8 (Anki) si backlog > 100; G1 (validación rápida) si no hubo eval ≥ 80 % en la semana; G10 (noche exhausto) si sueño < 6 h; **BURNOUT ÁMBAR** si ≥ 1 casilla `burnout_*` en el diario de la semana, **BURNOUT ROJO** si `burnout_gym` (DOCTRINA §6 · PROTOCOLO_MODO_MINIMO §1) | 0 activas | 1 activa → corrección escrita esta semana; 2+ → semana ÁMBAR |

## Revisión USMLE · criterios Palmerton fijados el 19-sep-2026 (2.ª capa, hallazgos #8 #11 #16 #21 #28 #30; fuente única `src/lib/usmleScores.ts`)

- **Pisos ÁMBAR vs gate (#21)**: 30Q ≥ 65 % y eval 18:00 ≥ 60 % son los **pisos ÁMBAR de la semana** (`PISO_AMBAR`, `semaforoPct`); el **gate de PROGRESIÓN diario sigue siendo 80 %** (`USMLE_GATE`). Eval bajo el piso 2 días seguidos = alarma en el checklist; no se sube de nivel por estar en ámbar.
- **Regla del tercio (#8, métrica 10)**: `nFallos` / `nConocidos` del export JSON (ventana 7 d, `reglaDelTercio`); **ALARMA si más de 1/3 de los fallos son de temas YA estudiados** → esa semana la consolidación 11:00 vuelve a esos subtemas antes de avanzar.
- **Abogado / lectura circular (#11, G6)**: `cambiadas` ≥ 2 en una sesión (cambiar una respuesta ya marcada = ALARMA ⚖ ABOGADO) · `relecturas` ≥ 3 en una pregunta (🔁 LECTURA CIRCULAR) — juez, no abogado: se decide en la primera lectura con rule-in → juez → flag.
- **Shopping list semanal (#28)**: listar las `notas` de la semana (export JSON) — cada duda anotada en el 07:15 siguiente y en el deep prime; si la lista está vacía tres días, la sesión no está cazando gaps.
- **Backlog Anki (#16, métrica 3)**: reviews primero, nuevas después; **días con backlog > 0** en la semana = métrica 3; backlog > 100 → nuevas = 0 y cap 200 reviews (300 con energía) hasta pantalla verde; **freno por hito**: % del banco/NBME estancado o en declive → nuevas = 0 (`REGLA_BACKLOG_HITO`). Además `anki_telemetria.js` avisa si `rev.perDay < 9999` o `rollover ≠ 4`.
- **Checklist §11.5 pre-marcado (#30)**: `checklist115(scores, hasta)` marca solo: gate < 80 % · regla del tercio · abogado · lectura circular · eval bajo el piso 2 días · días parciales; Hard/Easy y backlog quedan "sin datos" hasta la telemetría. `gen_revision_semanal.js` puede pre-marcar lo mismo desde el export JSON (campos `cambiadas` / `relecturas` / `nFallos` / `nConocidos` / `diasParciales`).

## Plantilla (la genera el script; aquí para verla completa)

```
# Revisión semanal S<NN>/20 · sáb <fecha> · semana <lun> → <vie> · hito de la semana: <UWSA/NBME o —> · DELOAD: sí/no
Generado: <fecha hora> · fuentes OK: [supabase, localStorage(<fecha export>), ankiconnect|json, registro, vitals|sin acceso]

## 1 USMLE medias         pre-test __/10 · 30Q __% · eval __%  (días con dato: _/5)   → on-track: sí/no
## 2 uWorld acumulado     __% (n=____) · próximo hito: <NBME> <fecha> mínimo <≥__%> · distancia: __ pts
## 3 Anki                 due medio __ · backlog __ · retención 30d __% · again __% · minFinde __' · alarma G: sí/no
## 4 ENCAPS viernes       mini-sim __/25 (__% ciego) · rondas de la semana: _ · temas fallados: ___
## 5 MIR eval D-1         media __% · días con eval _/5 · peor tema: ___
## 6 SYNAPSE misiones     _/6 ✓ · A-units F0 auditadas: _
## 7 Vibecoding           S<n> <nombre> · días ✓ _/5 · SHIPPED: sí/no · evidencia: <commit/URL/test>
## 8 VITALS               logs _/7 · sueño medio __h · noches <7h: _ · <6h: _ · agua media ____ ml
## 9 Días perdidos        _ (fechas) · ÁMBAR: _ · ROJO: _ · corrimiento ejecutado: sí/no/no aplica
## 10 Checklist G         activas: _ → [ ] G1 validación rápida [ ] G2 procrastinación productiva [ ] G3 personalizar fracaso
                          [ ] G4 "solo pasar" [ ] G5 simulacros cómodos [ ] G6 cambiar respuestas [ ] G7 mazos ajenos
                          [ ] G8 capar Anki [ ] G9 releer lo sabido [ ] G10 noche exhausto

## Decisiones (rellenar a mano, 4 líneas máximo)
- Nivel de la semana que entra: VERDE / ÁMBAR / DELOAD
- 1 corrección concreta (qué, cuándo, cómo se mide el sábado que viene):
- 1 cosa que se deja de hacer:
- Anki sáb/dom: __' / __' (= due × 20 s)
```

## Progreso persistente (v5.10 · 12-sep; vigente en v5.11-v5.14) y export de localStorage

**Los ✓ ya no dependen del navegador.** `src/lib/studyProgressSync.ts` espeja `jmd-study-progress-v1` en Supabase
`plan_checks` {plan_key, dia, checked_at, device}: cada ✓/✗ sube al instante (diff), el primer `loadDone` de la sesión
fusiona lo remoto con lo local (migración única incluida) y el script lee la tabla directamente (métricas 6, 7 y 9).
Instrumento **PROGRESO** del cockpit (`N ✓ · ☁ ok/offline`) → **Exportar** (JSON al portapapeles) · **Importar** (pegar en
otro navegador; fusiona por unión, nunca borra un ✓) · **Sincronizar ahora**. DDL: `DATA/_scripts/_migrations/plan_checks.sql`.

El export de localStorage (`jmd-*`) sigue sirviendo para `jmd-mir-eval-log`, `jmd-usmle-scores` y `jmd-modo-log` hasta que
cada uno tenga su espejo, y como fallback sin red. En la web de la app (Vercel), consola del navegador (F12) → pegar → se copia
al portapapeles → guardar como `DATA/USMLE/REVISIONES/_localstorage_export.json` (el script lo lee automáticamente; también
acepta `--ls <ruta>`; también acepta el JSON del botón PROGRESO → Exportar). En el cockpit, tocar el instrumento **SEMANA**
hace la misma copia al portapapeles (solo web).

```js
copy(JSON.stringify(Object.fromEntries(Object.keys(localStorage).filter(k => k.startsWith('jmd-')).map(k => { try { return [k, JSON.parse(localStorage.getItem(k))]; } catch { return [k, localStorage.getItem(k)]; } }))))
```

## Calendario de las 20 semanas (sábados de revisión)

| S | Sábado | Hito de esa semana (viernes) | Deload secundarios |
|---|---|---|---|
| S1 | 26-sep | UWSA1 (baseline, **lun 21-sep = D1**; movido del jue 17-sep) · D1-D5 · mini-sim ENCAPS vie 25-sep (D5) · MIR D5 Cardiología vie 25-sep · LIVIANO caso 1 · SHIP S1 (sáb 26-sep) | — |
| S2 | 3-oct | NBME 25 vie 2-oct (D10, ≥ 51 %) · Research M1 lun 28-sep · SHIP S2 | — |
| S3 | 10-oct | viernes N3 (D15) · Research C-2 mar 6-oct · T-1 jue 8-oct · SHIP S3 | — |
| S4 | 17-oct | viernes N3 (D20) · SHIP S4 (= este script con ≥ 8/10 métricas reales) | — |
| S5 | 24-oct | NBME 26 vie 23-oct (D25, ≥ 54 %) · SHIP S5 | — |
| **S6** | 31-oct | D26-D30 · Research C-6 lun 26-oct · CR-1 vie 30-oct · SHIP S6 (`rls-datos-tesis`, sin flag deload) | **sí (26-30 oct, post-NBME 26)** |
| S7 | 7-nov | viernes N3 (D35) · SHIP S7 (proyecto con flag `deload`, lun 2 → vie 6-nov: mover el flag a S6 o dejarlo → decisión de Joseph) | — |
| S8 | 14-nov | NBME 27 vie 13-nov (D40, ≥ 57 %) · SHIP S8 | — |
| S9 | 21-nov | viernes N3 (D45) · SHIP S9 | — |
| S10 | 28-nov | viernes N3 (D50) · LIVIANO trimestral I lun 23-nov (D46) · SHIP S10 | — |
| S11 | 5-dic | NBME 28 vie 4-dic (D55, ≥ 61 %) · Research T-8 mar 1-dic · SHIP S11 | — |
| **S12** | 12-dic | viernes N4 (D60, único) · Research X-1 lun 7-dic · **SHIP S12 = cierre del vibecoding (sáb 12-dic)** | **sí (7-11 dic, post-NBME 28)** |
| S13 | 19-dic | NBME 29 vie 18-dic (D65, ≥ 63 %) · Research CR-8 jue 17-dic · taper vibecoding desde el lun 14-dic (≤ 15'/día) | — |
| S14 | 26-dic | D66-D69 (25-dic feriado) | — |
| S15 | 2-ene | NBME 30 mié 30-dic (D72, ≥ 65 %) · 31-dic/1-ene feriados · Research en pausa 4→29-ene | — |
| S16 | 9-ene | dermato Step 1 mar 5-ene (D74) · UWSA2 vie 8-ene (D77, low risk) · MIR D77 mini-MIR vie 8-ene | — |
| S17 | 16-ene | MIR D78 corrección lun 11-ene + mantenimiento desde el mar 12-ene · **cierre de contenido jue 14-ene (D81)** · **NBME 31 vie 15-ene (D82) · GO/NO-GO (≥ 68 %)** · Derma d42 · vibecoding deload total desde el lun 11-ene | — |
| S18 | 23-ene | NBME 32 lun 18-ene (D83) · NBME 33 mié 20-ene (D85) · Free 120 vie 22-ene (D87, ≥ 70 %) · desde el NBME 31 cero contenido nuevo · LIVIANO caso 16 vie 22-ene (D87) · Derma d43 Mohs mar 19-ene, taper d44-d49 desde el jue 21-ene | — |
| S19 | 30-ene | D88-D92 (lun 25 → vie 29-ene, Fase C: incorrects + AMBOSS 200) · LIVIANO capstone mar 26 (D89) + trimestral II mié 27-ene (D90, cierre) · **última A-unit de SYNAPSE vie 29-ene (D92)** · sáb 30 y dom 31 libres (solo Anki vencido) | — |
| S20 | 6-feb | **D93-D95 (lun 1 → mié 3-feb)**: CR-9 lun 1-feb (D93) · **D94 mar 2-feb = D-2, última sesión de banco** · **D95 mié 3-feb = D-1 dentro del plan** (sesión mínima AM + ritual de test-day `USMLE_TAPER.d95`/`dMenos1`; pitch AURUM v5 y Derma d49 caen el 3/4-feb — ver PENDIENTES) · **examen JUE 4-FEB** · el sábado 6-feb = revisión + post-mortem del examen + arranque de la intensiva ENCAPS (vie 5 o lun 8-feb → decisión) | — |

⚠ **v5.14:** el plan Step 1 termina el **mié 3-feb-2027 (D95 = D-1 DENTRO del plan)** y el examen pasa al **jue 4-feb-2027** (fuera de la ventana 25-29 ene; Prometric/eligibility a confirmar por Joseph). Con D1 en lunes el plan vuelve a cerrar en **20 semanas exactas** (ya no hay S21): la S19 (25-29 ene) contiene D88-D92 y el finde 30-31 ene libre, la S20 (1-3 feb) contiene D93-D95 y el examen, y el sáb 6-feb lleva la revisión S20 + el post-mortem. La última A-unit de SYNAPSE cae el vie 29-ene (S19, D92) — adelantarla al vie 22 sigue A DECIDIR. *(v5.13: D1 jue 17-sep, S1 = sáb 19-sep, D95 lun 1-feb en una S21 de un día y examen mar 2-feb; v5.12: D95 = vie 29-ene = última sesión y examen lun 1-feb; v5.11: D95 = jue 28-ene = D-1 y examen vie 29-ene dentro de la S20.)* Las dos semanas DELOAD (26-30 oct y 7-11 dic)
conservan sus fechas (`gen_revision_semanal.js` las tiene fijas) y pasan a numerarse S6 y S12.

## Historial

`DATA/USMLE/REVISIONES/_semanas.json` (append-only, una entrada por semana; el script no duplica: si vuelve a
correr la misma semana, actualiza los campos automáticos y conserva los manuales). Los `.md` semanales viven
en la misma carpeta. La tarjeta **"S N/20"** del cockpit (CockpitStatusBar) y el chip de MISIÓN DE HOY se
calculan desde `DAILY_META.inicio` del USMLE — misma numeración que este doc.

---
*Docs relacionados: `DATA/PROTOCOLO_MODO_MINIMO.md` · `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría) ·
`DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` (S4 = este script en producción con ≥ 8/10 métricas reales) ·
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G y Parte V · `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.*
