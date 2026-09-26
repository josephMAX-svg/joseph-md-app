# 📋 REVISIÓN SEMANAL — sábado 07:15-07:35 (20') · v5.16 · re-fechado 26-sep-2026

> Ritual único que revisa los 9 frentes del régimen v5.16 (D1 = lun 28-sep-2026, Step 1 = principal; D95 = mié 10-feb = D-1 REAL; examen target jue 11-feb-2027) con
> **10 métricas** y una sola pregunta: *¿el sistema va on-track o hay que corregir ESTA semana?*
> Palmerton revisa el checklist G "en cada hito NBME" (~3 semanas): demasiado grueso para un plan donde
> 1 día perdido = +1 hábil. Aquí la cadencia es semanal y el trabajo de recopilar lo hace un script.
>
> **Franja**: sábado 07:15-07:35 (hueco libre tras el desayuno; no toca las franjas L-V). El evento **📋 REVISIÓN SEMANAL ya existe en el
> Google Calendar** (id **`th5utf73brht5g0lkt87hd4940`**, sáb 07:15-07:35 desde el **sáb 3-oct-2026**, **`UNTIL=20270221T045959Z`** — la serie se RECREÓ el 26-sep (v5.16)
> porque `recurrenceData` no se puede actualizar por MCP; los ids anteriores `0r2rmn0f4vea40dls47lg60t44` (v5.15) y `21fbiohc1i47r4lqmaa3eb76l4` (v5.14) están borrados. La serie llega al **sáb 20-feb-2027** para que existan la **S20 (sáb 13-feb, semana del examen)** y el
> **post-mortem del examen (S21, sáb 20-feb)** — el Step 1 es el **jue 11-feb**; la elección sáb/dom sigue siendo decisión de Joseph). **Semana 1 = sáb 3-oct-2026** = semana **lun 28-sep → vie 2-oct (D1-D5: con el D1 en lunes la S1 vuelve a ser una semana COMPLETA)**. Las semanas se numeran desde `DAILY_META.inicio` = 28-sep — misma regla que `semanaStep1()` del cockpit (`STEP1_SEMANAS = 20`) y que
> `gen_revision_semanal.js` (lee el `inicio` del `.ts`); el plan cierra en **20 semanas de calendario**: la S20 (lun 8 → vie 12-feb) contiene **D93-D95 y el examen (jue 11-feb)** —
> ⚠ en v5.16 **no hay fin de semana libre entre el D95 y el examen**: el D-1 real ES el D95 (mié 10-feb); el sábado 13-feb es la revisión S20 (primera lectura del examen) y el **sábado 20-feb** el post-mortem (S21, fuera del plan de 95 días pero dentro de la serie).
> 🆕 **En v5.16 los 12 hitos siguen corriendo con el plan y conservan su D#** (regla RÍGIDA de v5.15); con el D1 en lunes **vuelven a caer en viernes** (8 de los 12: D10 · D25 · D40 · D55 · D72 · D77 · D82 · D87), salvo **NBME 29 (lun 28-dic, por el salto del 25-dic), NBME 32 (lun 25-ene) y NBME 33 (mié 27-ene)**;
> los SHIP del vibecoding van en los sábados 3-oct … 19-dic (S1-S12 = bloques de 5 hábiles lun→vie) y vuelven a coincidir 1:1 con las semanas de revisión S1-S12.
> *(v5.15, 22-sep: D1 mié 23-sep · S1 = sáb 26-sep, semana corta de 3 días · id `0r2rmn0f4vea40dls47lg60t44` · S20 = sáb 6-feb · post-mortem sáb 13-feb · examen lun 8-feb.)*
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
| 2 | **uWorld % acumulado vs mínimo on-track** del próximo hito | manual (dashboard uWorld); el script imprime el hito y su mínimo (Parte V) | NBME 25 ≥ 51 · 26 ≥ 54 · 27 ≥ 57 · 28 ≥ 61 · 29 ≥ 63 · 30 ≥ 65 · 31 ≥ 68 (GO) | > 5 puntos bajo el mínimo → auditar método (no horas); UWSA1 lun 28-sep = baseline sin juicio |
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

## Progreso persistente (v5.10 · 12-sep; vigente en v5.11-v5.16) y export de localStorage

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

## Calendario de las 20 semanas (+ post-mortem) — sábados de revisión (v5.16, fechas leídas de los `.ts` el 26-sep)

| S | Sábado | Hito de esa semana (en v5.16 casi siempre VIERNES) | Deload secundarios |
|---|---|---|---|
| S1 | 3-oct | **UWSA1 lun 28-sep = D1** (baseline; movido del mié 23-sep) · D1-D5 (Fundamentos D2-D3 + Inmuno D4-D5; **viernes N1 vie 2-oct = D5 abre Inmuno**) · ENCAPS pre-test de arranque lun 28 + mar 29 y 1.ª mini-sim vie 2-oct · Research M1 vie 2-oct · LIVIANO caso 1 vie 2-oct · **SHIP S1 (sáb 3-oct)** | — |
| S2 | 10-oct | D6-D10 (Cardio abre el **lun 5-oct = D6**) · **NBME 25 vie 9-oct (D10, ≥ 51 %)** · Research M2 jue 8-oct · SHIP S2 | — |
| S3 | 17-oct | D11-D15 (Cardio; **viernes N3 vie 16-oct = D15**, IC + shock) · Research C-2 lun 12 · T-1 mié 14 · M3 vie 16-oct · AURUM pitch v1 vie 16-oct (D15) · SHIP S3 | — |
| S4 | 24-oct | D16-D20 (cierre Cardio D16 + Resp D17-D20; **viernes N3 vie 23-oct = D20**) · Research R9 mar 20 · C-3 jue 22-oct (disparador del plan B del case report) · LIVIANO tarjetas MECANISMO D16 lun 19-oct · SHIP S4 (= este script con ≥ 8/10 métricas reales; fichero `S04_2026-10-24`) | — |
| S5 | 31-oct | D21-D25 (Resp D21-D22 + Renal D23-D24) · **NBME 26 vie 30-oct (D25, ≥ 54 %)** · **Research C-6 SUBMIT carta #1 vie 30-oct** · SHIP S5 (`S05_2026-10-31`) | — |
| **S6** | 7-nov | D26-D30 (Renal D26-D29; **viernes N1 vie 6-nov = D30 abre GI**) · Research R6 mar 3 · CR-1 jue 5-nov · SHIP S6 (`rls-datos-tesis`, **sin flag deload** — el flag lo lleva S7: decisión ⚪ H de PENDIENTES) | **sí (lun 2 → vie 6-nov, post-NBME 26)** |
| S7 | 14-nov | D31-D35 (GI; **viernes N3 vie 13-nov = D35**, Hígado II) · Research CR-2 lun 9 · T-3 mié 11 · T-4 vie 13-nov · AURUM pitch v2 vie 13-nov (D35) · SHIP S7 (proyecto `motor-preguntas-encaps` con flag `deload`, lun 9 → vie 13-nov, una semana DESPUÉS de la deload real) | — |
| S8 | 21-nov | D36-D40 (cierre GI D36 + Endo D37-D39) · **NBME 27 vie 20-nov (D40, ≥ 57 %)** · LIVIANO drill D37 mar 17 · DIGEMID D39 jue 19 · caso 8 vie 20-nov · Research T-2 mar 17 · T-5 jue 19-nov · SHIP S8 | — |
| S9 | 28-nov | D41-D45 (Endo D41-D42 + Neuro D43-D45; **viernes N3 vie 27-nov = D45**) · LIVIANO Acceso Perú D41-D44 (lun 23 → jue 26-nov) + caso 9 vie 27-nov · Research R7 lun 23 · T-6 mié 25 · CR-3 vie 27-nov · SHIP S9 | — |
| S10 | 5-dic | D46-D50 (Neuro; **viernes N3 vie 4-dic = D50**) · LIVIANO trimestral I D46 lun 30-nov · Research T-7 mar 1 · CR-4 jue 3-dic · SHIP S10 | — |
| S11 | 12-dic | D51-D55 (Heme/Onc D51-D54) · **NBME 28 vie 11-dic (D55, ≥ 61 %)** · **Research T-8 SUBMIT tesis L0 lun 7-dic** · CR-5 mié 9 · X-1 vie 11-dic · AURUM pitch v3 vie 11-dic (D55) · SHIP S11 | — |
| **S12** | 19-dic | D56-D60 (Heme D56-D57 + Micro D58-D60; **viernes N4 vie 18-dic = D60**, el único de nivel 4) · Research CR-6 mar 15 · X-2 jue 17-dic · LIVIANO drill D58 mié 16 · caso 12 vie 18-dic · **SHIP S12 capstone (sáb 19-dic): vibecoding S1-S12 cierra el vie 18-dic** | **sí (lun 14 → vie 18-dic, post-NBME 28)** |
| S13 | 26-dic | D61-D64 (Micro; lun 21 → jue 24-dic; **vie 25-dic feriado**) · Research CR-7 lun 21 · CR-8 mié 23-dic (paquete del case report congelado) · taper vibecoding S13 desde el lun 21-dic (≤ 15'/día) | — |
| S14 | 2-ene | **NBME 29 lun 28-dic (D65, ≥ 63 %)** · D66-D67 (Repro, mar 29 y mié 30-dic) · **31-dic y 1-ene feriados** · Research R3 mar 29-dic | — |
| S15 | 9-ene | D68-D72 (cierre Repro D68-D70 + MSK D71) · **NBME 30 vie 8-ene (D72, ≥ 65 %)** · Research R2 lun 4 · **X-7 mié 6-ene = cierre antes de la PAUSA Research (jue 7-ene → mié 3-feb)** · LIVIANO caso 13 vie 8-ene · ENCAPS: las mini-sims saltan el 25-dic y el 1-ene y vuelven el vie 8-ene | — |
| S16 | 16-ene | D73-D77 (MSK D73-D74 — **dermato Step 1 = D74 mar 12-ene** — + Psiquiatría D75-D76) · **UWSA2 vie 15-ene (D77, low risk)** · MIR D77 vie 15-ene = mini-MIR 40Q · AURUM pitch v4 mié 13-ene (D75) · LIVIANO drill D75 mié 13 · caso 14 vie 15-ene | — |
| S17 | 23-ene | D78-D82: Psicofármacos D78 lun 18 · Biostats D79 mar 19 · Bioquímica días dobles D80 mié 20 + **D81 jue 21-ene = cierre de contenido** · **NBME 31 vie 22-ene (D82) · GO/NO-GO (≥ 68 %)**, el día siguiente al cierre, sin banco de consolidación delante · **MIR 1ª vuelta cierra el lun 18-ene (D78) y el mantenimiento arranca el mar 19-ene en modo reducido** · LIVIANO caso 15 vie 22-ene | — |
| S18 | 30-ene | D83-D87 (lun 25 → vie 29-ene): **NBME 32 lun 25-ene (D83)** · random timed D84 · **NBME 33 mié 27-ene (D85)** · random timed D86 · **Free 120 vie 29-ene (D87, ≥ 70 %)** — abre la Fase C · Derma taper d44 vie 29-ene · **LIVIANO caso 16 integral vie 29-ene (D87), ANTES del capstone** | — |
| S19 | 6-feb | **D88-D92 (lun 1 → vie 5-feb)**: random timed D88-D89 · incorrects 2.ª pasada D90-D91 · AMBOSS 200 mitad 1 D92 vie 5-feb · **Research CR-9 SUBMIT case report vie 5-feb (= D92)** · LIVIANO repaso integral D88 lun 1 · capstone D89 mar 2 · trimestral II D90 mié 3-feb = fin del plan LIVIANO · **SYNAPSE y ENCAPS mantenimiento cierran el vie 5-feb** (última A-unit · mini-sim 17 = D92 ENCAPS) · vibecoding S19 deload total · el finde 6-7 feb es un finde normal dentro del plan | — |
| S20 | 13-feb | **D93-D95 + EXAMEN**: D93 lun 8-feb AMBOSS 200 mitad 2 · **D94 mar 9-feb = D-2, última sesión de banco** · **D95 mié 10-feb = D-1 REAL dentro del plan** (sesión mínima AM ≤ 2 h + ritual de test-day `USMLE_TAPER.d95`/`dMenos1`; nada después de las 17:00) · **🎯 EXAMEN JUE 11-FEB-2027** · vie 12-feb libre de Step 1 (Derma d49 opcional · MIR mantenimiento vuelve a modo normal · ENCAPS intensiva propuesta vie 12 o lun 15-feb con el pre-test 2026-II el vie 12) · Research X-8 mar 9-feb y **R8 jue 11-feb = día del examen (decisión: saltar o mover al lun 15-feb)** · AURUM pitch v5 mié 10-feb (D95) y D96 jue 11-feb (lección opcional) · el sábado 13-feb = revisión S20 + primera lectura del examen | — |
| S21 | 20-feb | **POST-MORTEM del examen** (semana lun 15 → vie 19-feb, fuera del plan de 95 días): Research X-3 lun 15 · X-4 mié 17 · X-5 vie 19-feb · Derma d50 mar 16-feb (vuelve a 3 casos/sesión) · MIR mantenimiento en modo normal · último sábado de la serie (`UNTIL=20270221T045959Z`) | — |

⚠ **v5.16 (2.º corrimiento RÍGIDO, 26-sep):** el plan Step 1 termina el **mié 10-feb-2027 (D95 = D-1 REAL dentro del plan)** y el examen es el **jue 11-feb-2027** (fuera de la ventana 25-29 ene; Prometric/eligibility a confirmar por Joseph). **No hay fin de semana libre entre el D95 y el examen** (el sáb 6 y el dom 7-feb son un finde normal dentro del plan). El plan sigue en **20 semanas**, ahora todas de calendario (S1 completa, lun 28-sep → vie 2-oct): la S19 (1-5 feb) contiene D88-D92 y la S20 (8-12 feb) contiene D93-D95 **y el examen**, así que el sáb 13-feb es la revisión S20 y el **sáb 20-feb** el post-mortem (S21). 🆕 Los 12 hitos corren con el plan y conservan su D# (regla de v5.15), y con el D1 en lunes **vuelven a caer en viernes** (8 de 12; NBME 29 lun 28-dic, NBME 32 lun 25-ene, NBME 33 mié 27-ene). La última A-unit de SYNAPSE cae el **vie 5-feb (D92)** — adelantarla sigue A DECIDIR. *(v5.15: D1 mié 23-sep, S1 = sáb 26-sep corta de 3 días, D95 vie 5-feb, finde 6-7 libre y examen lun 8-feb con post-mortem el sáb 13-feb; v5.13: D1 jue 17-sep, S1 = sáb 19-sep, D95 lun 1-feb en una S21 de un día y examen mar 2-feb; v5.12: D95 = vie 29-ene = última sesión y examen lun 1-feb; v5.11: D95 = jue 28-ene = D-1 y examen vie 29-ene dentro de la S20.)* Las dos semanas DELOAD (**lun 2 → vie 6-nov** y **lun 14 → vie 18-dic**, los lunes siguientes al NBME 26 del vie 30-oct y al NBME 28 del vie 11-dic)
las tiene `gen_revision_semanal.js` fijas (`DELOAD` = lunes `2026-11-02` y `2026-12-14`, misma pareja que `homeBriefing.DELOAD_SEMANAS`) y se numeran S6 y S12.

## Historial

`DATA/USMLE/REVISIONES/_semanas.json` (append-only, una entrada por semana; el script no duplica: si vuelve a
correr la misma semana, actualiza los campos automáticos y conserva los manuales). Los `.md` semanales viven
en la misma carpeta. La tarjeta **"S N/20"** del cockpit (CockpitStatusBar) y el chip de MISIÓN DE HOY se
calculan desde `DAILY_META.inicio` del USMLE — misma numeración que este doc.

---
*Docs relacionados: `DATA/PROTOCOLO_MODO_MINIMO.md` · `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría) ·
`DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` (S4 = este script en producción con ≥ 8/10 métricas reales) ·
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G y Parte V · `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.*
