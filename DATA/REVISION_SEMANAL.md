# 📋 REVISIÓN SEMANAL — sábado 07:15-07:35 (20') · v5.19 · re-fechado 5-oct-2026

> Ritual único que revisa los 9 frentes del régimen v5.19 (D1 = mar 6-oct-2026, Step 1 = principal; D94 = mié 17-feb = última sesión de banco; D95 = jue 18-feb = D-1 REAL; examen target vie 19-feb-2027) con
> **10 métricas** y una sola pregunta: *¿el sistema va on-track o hay que corregir ESTA semana?*
> Palmerton revisa el checklist G "en cada hito NBME" (~3 semanas): demasiado grueso para un plan donde
> 1 día perdido = +1 hábil. Aquí la cadencia es semanal y el trabajo de recopilar lo hace un script.
>
> **Franja**: sábado 07:15-07:35 (hueco libre tras el desayuno; no toca las franjas L-V). El evento **📋 REVISIÓN SEMANAL ya existe en el
> Google Calendar** (id **`6iog066kra2e07ue1d0f2osuvs`**, sáb 07:15-07:35 desde el **sáb 10-oct-2026**, **`UNTIL=20270221T045959Z`** — la serie se RECREÓ el sáb 3-oct (v5.18)
> porque `recurrenceData` no se puede actualizar por MCP y la serie tenía que arrancar una semana más tarde; **en v5.19 (lun 5-oct) conserva id y fechas y solo cambió su descripción**; el id v5.17 `th5utf73brht5g0lkt87hd4940` (arrancaba el sáb 3-oct) y los anteriores `0r2rmn0f4vea40dls47lg60t44` (v5.15) y `21fbiohc1i47r4lqmaa3eb76l4` (v5.14) ya no existen). La serie llega al **sáb 20-feb-2027**, que en v5.19 es la
> **S20 = cierre D92-D95 + post-mortem del examen** (el Step 1 es el **vie 19-feb**, el día anterior a esa revisión; la elección sáb/dom sigue siendo decisión de Joseph). **Semana 1 = sáb 10-oct-2026** = semana **lun 5 → vie 9-oct (con el D1 en MARTES la S1 tiene 4 sesiones, D1-D4 = mar 6 → vie 9; el lun 5-oct no tiene sesión)**. Las semanas se numeran desde la semana L-V de `DAILY_META.inicio` (6-oct → su lunes, 5-oct) — misma regla que `semanaStep1()` del cockpit (`STEP1_SEMANAS = 20`) y que
> `gen_revision_semanal.js` (lee el `inicio` del `.ts`; `TOTAL_SEM = 20`); el plan ocupa **20 semanas de calendario**: la S19 (lun 8 → vie 12-feb) contiene **D87-D91** y la S20 (lun 15 → vie 19-feb) contiene **D92 (lun 15), D93 (mar 16), D94 (mié 17-feb, última sesión de banco), D95 (jue 18-feb = D-1 REAL) y el examen (vie 19-feb)** —
> ⚠ en v5.19, como en v5.18 y v5.16, **no hay fin de semana entre el D94 y el D95**: el finde 13-14 feb queda entre el D91 (vie 12) y el D92 (lun 15), así que el sábado 13-feb es la revisión S19 (cierre de la semana del Free 120 + banco D87-D91) y el **sábado 20-feb** es la revisión S20 = cierre D92-D95 + post-mortem del examen del día anterior (último sábado de la serie).
> 🆕 **En v5.19 los 12 hitos siguen corriendo con el plan y conservan su D#** (regla RÍGIDA de v5.15-v5.18); con el D1 en martes **caen casi todos en LUNES** (8 de los 12: D10 · D25 · D40 · D55 · D72 · D77 · D82 · D87), salvo **UWSA1 (mar 6-oct = D1), NBME 29 (jue 7-ene, por los saltos de 25-dic/31-dic/1-ene), NBME 32 (mar 2-feb) y NBME 33 (jue 4-feb)**;
> los proyectos del vibecoding S1-S11 pasan a bloques de 5 hábiles **mar→lun** (S12 = mar 22 → mar 29-dic por el feriado del 25-dic) y su SHIP va el sábado siguiente al último lunes (17-oct … 26-dic; S12 el sáb 2-ene): **la revisión del sábado N (07:15) cae el mismo día que el SHIP del proyecto N-1 (PC 15:00)** (sáb 17-oct = revisión S2 + SHIP S1 … sáb 2-ene = revisión S13 + SHIP S12) — la métrica 7 se cierra con el `verify_vibecoding.js` de esa tarde o en la revisión siguiente; por eso los criterios de S4/S5 apuntan a `S05_2026-11-07.md` y `S06_2026-11-14.md`.
> *(v5.18, 3-oct: D1 lun 5-oct · S1 completa (D1-D5) · S19 = D88-D92 · S20 = D93-D95 + examen jue 18-feb · hitos casi todos en viernes · vibecoding lun→vie, la revisión N recibía el SHIP N el mismo sábado · deload S6/S12.)*
> *(v5.17, 30-sep: D1 jue 1-oct · S1 = sáb 3-oct corta (solo D1-D2) · 21 semanas · id `th5utf73brht5g0lkt87hd4940` · S20 = sáb 13-feb (D90-D94) · S21 = sáb 20-feb = D95 + post-mortem del mar 16-feb · hitos en miércoles · vibecoding jue→mié, la revisión N recibía el SHIP N-1.)*
> *(v5.16, 26-sep: D1 lun 28-sep · S1 = sáb 3-oct completa (D1-D5) · 20 semanas · S20 = sáb 13-feb con el examen jue 11-feb dentro · post-mortem sáb 20-feb (S21 fuera del plan). v5.15, 22-sep: D1 mié 23-sep · S1 = sáb 26-sep, semana corta de 3 días · id `0r2rmn0f4vea40dls47lg60t44` · S20 = sáb 6-feb · post-mortem sáb 13-feb · examen lun 8-feb.)*
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
| 2 | **uWorld % acumulado vs mínimo on-track** del próximo hito | manual (dashboard uWorld); el script imprime el hito y su mínimo (Parte V) | NBME 25 ≥ 51 · 26 ≥ 54 · 27 ≥ 57 · 28 ≥ 61 · 29 ≥ 63 · 30 ≥ 65 · 31 ≥ 68 (GO) | > 5 puntos bajo el mínimo → auditar método (no horas); UWSA1 mar 6-oct (v5.19) = baseline sin juicio |
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

## Progreso persistente (v5.10 · 12-sep; vigente en v5.11-v5.19) y export de localStorage

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

## Calendario de las 20 semanas — sábados de revisión (v5.19, fechas leídas de los `.ts` regenerados el 5-oct)

| S | Sábado | Hito de esa semana (en v5.19 casi siempre LUNES) | Deload secundarios |
|---|---|---|---|
| S1 | 10-oct | **Semana de 4 sesiones, D1-D4** (el lun 5-oct no tiene sesión: 26.º hábil perdido) · **UWSA1 mar 6-oct = D1** (baseline; movido del lun 5-oct) · D2 mié 7 + D3 jue 8-oct Fundamentos (Pathoma 1-3; setup Anki FSRS en D3) · Inmuno D4 vie 9-oct (viernes N1; el día 2 de Inmuno es el lun 12) · ENCAPS pre-test de arranque mar 6 + mié 7-oct, banco V-2 jue 8 y 1.ª mini-sim vie 9-oct (día 4) · Derma d1 mié 7 · d2 vie 9-oct · Research R0 mar 6 · R1 jue 8-oct · MIR D1-D4 (Epidemiología + Bioética) · LIVIANO arranca el mar 6 · caso 1 vie 9-oct (D4) · vibecoding S1 `apex-e2e` mar 6 → lun 12-oct (SHIP sáb 17-oct) | — |
| S2 | 17-oct | D5-D9: Inmuno D5 lun 12-oct (hipersensibilidades) · Cardio abre el **mar 13-oct = D6** (D6-D9; curvas PV/Wiggers D8 jue 15; **viernes N3 vie 16-oct = D9**, electrofisiología) · MIR D5 lun 12-oct Cardiología (precede a Cardio Step 1 por 1 hábil) · ENCAPS banco III-5 lun 12 (+ la eval de V-2) · II-5 NTS adolescente mar 13 · Research M1 lun 12 · C-1 mié 14 · M2 vie 16-oct · Derma d3 mar 13 · d4 jue 15 · LIVIANO caso 2 vie 16-oct · **SHIP S1 `apex-e2e` (sáb 17-oct)**; S2 `anki-sync-kpi` mar 13 → lun 19-oct | — |
| S3 | 24-oct | **NBME 25 lun 19-oct (D10, ≥ 51 %)** · D11-D14 Cardio (taquiarritmias · antiarrítmicos · aterosclerosis; **viernes N3 vie 23-oct = D14**, SCA) · Research C-2 mar 20 · T-1 jue 22-oct · Derma d5 lun 19 · d6 mié 21 · d7 vie 23 · LIVIANO caso 3 vie 23-oct · **SHIP S2 `anki-sync-kpi`**; S3 `plan-checks-espejo` mar 20 → lun 26-oct | — |
| S4 | 31-oct | D15 lun 26-oct (IC + shock) · D16 mar 27 (valvulopatías, cierra Cardio) + Resp D17-D19 (**viernes N3 vie 30-oct = D19**, obstructivas) · AURUM pitch v1 lun 26-oct (D15) · Research M3 lun 26 · R9 mié 28 · C-3 vie 30-oct (disparador del plan B del case report) · Derma d8 mar 27 · d9 jue 29 · LIVIANO tarjetas MECANISMO D16 mar 27 · caso 4 vie 30-oct · **SHIP S3 `plan-checks-espejo`**; S4 `verify-revision` mar 27-oct → lun 2-nov | — |
| S5 | 7-nov | D20-D24: Resp D20-D22 (lun 2 → mié 4) + Renal D23-D24 (jue 5 / vie 6, viernes N1) · Research C-4 mar 3 · C-5 jue 5-nov · Derma d10 lun 2 · d11 mié 4 · d12 vie 6 (SJS/TEN/DRESS) · LIVIANO síntesis módulo 1 D20 lun 2 · caso 5 vie 6-nov · **SHIP S4 `verify-revision`** (= este script con ≥ 8/10 métricas reales; fichero `S05_2026-11-07`); S5 `vitals-puente` mar 3 → lun 9-nov | — |
| S6 | 14-nov | **NBME 26 lun 9-nov (D25, ≥ 54 %)** · Renal D26-D29 (**viernes N3 vie 13-nov = D29**, AKI/ERC) · Research **C-6 SUBMIT carta #1 lun 9-nov** · R6 mié 11 · CR-1 vie 13-nov · Derma d13 mar 10 · d14 jue 12 · LIVIANO caso 6 vie 13-nov · **SHIP S5 `vitals-puente`** (`S06_2026-11-14`); S6 `rls-datos-tesis` mar 10 → lun 16-nov | — |
| **S7** | 21-nov | D30-D34 (GI; **viernes N3 vie 20-nov = D34**, hígado I) · Research CR-2 mar 17 · T-3 jue 19-nov · Derma d15 lun 16 · d16 mié 18 · d17 vie 20 · LIVIANO caso 7 vie 20-nov · **SHIP S6 `rls-datos-tesis`**; S7 `motor-preguntas-encaps` mar 17 → lun 23-nov **lleva el flag `deload`** y cubre mar 17 → vie 20 de esta semana (✅ alineado: ⚪ H de v5.18 resuelta) | **sí (lun 16 → vie 20-nov, post-NBME 26)** |
| S8 | 28-nov | D35-D39: GI D35-D36 (lun 23 hígado II / mar 24 biliar + páncreas) + Endo D37-D39 (**viernes N3 vie 27-nov = D39**, suprarrenal) · AURUM pitch v2 lun 23-nov (D35) · Research T-4 lun 23 · T-2 mié 25 · T-5 vie 27-nov · Derma d18 mar 24 · **d19 jue 26-nov = drill de oclusión vascular** · LIVIANO drill de cifras D37 mié 25 · síntesis módulo 2 D38 jue 26 · caso 8 vie 27-nov · **SHIP S7 `motor-preguntas-encaps`**; S8 `pool-mir` mar 24 → lun 30-nov | — |
| S9 | 5-dic | **NBME 27 lun 30-nov (D40, ≥ 57 %)** · Endo D41-D42 (mar 1 / mié 2) + Neuro D43-D44 (jue 3 / vie 4, viernes N1) · Research R7 mar 1 · T-6 jue 3-dic · Derma d20 lun 30 · d21 mié 2 · d22 vie 4 · LIVIANO Acceso Perú D40 lun 30-nov (registro DIGEMID) · D41 mar 1 (condición de venta) · D42 mié 2 (precio) · D43 jue 3-dic (magistral) + caso 9 vie 4-dic (D44) · AURUM d40 lun 30-nov = 1.ª variante LIVIANO · **SHIP S8 `pool-mir`**; S9 `overlays-hitos` mar 1 → lun 7-dic | — |
| S10 | 12-dic | D45-D49 (Neuro; **viernes N3 vie 11-dic = D49**, demencias + Parkinson) · Research CR-3 lun 7 · T-7 mié 9 · CR-4 vie 11-dic · Derma d23 mar 8 · d24 jue 10 (melanoma) · LIVIANO Acceso Perú D45 lun 7-dic (cadena de frío) · trimestral I D46 mar 8-dic · caso 10 vie 11-dic · **SHIP S9 `overlays-hitos`**; S10 `bot-whatsapp-ocr` mar 8 → lun 14-dic | — |
| S11 | 19-dic | D50 lun 14 (Neuro: EM, meningitis, NMJ, tumores SNC) + Heme/Onc D51-D54 (**vie 18-dic = D54 = el ÚNICO viernes N4 de la Fase A**, plaquetas + CID) · Research **T-8 SUBMIT tesis L0 mar 15-dic** · CR-5 jue 17-dic · Derma d25 lun 14 · d26 mié 16 · d27 vie 18 · LIVIANO caso 11 vie 18-dic · **SHIP S10 `bot-whatsapp-ocr`**; S11 `contenido-marcas` mar 15 → lun 21-dic | — |
| S12 | 26-dic | **NBME 28 lun 21-dic (D55, ≥ 61 %)** · Heme/Onc D56-D57 (mar 22 / mié 23) + Micro D58 jue 24-dic · **vie 25-dic feriado** (sin mini-sim ENCAPS) · AURUM pitch v3 lun 21-dic (D55, el mismo día que el NBME 28) · Research X-1 lun 21 · CR-6 mié 23-dic · Derma d28 mar 22 · d29 jue 24 · LIVIANO síntesis módulo 3 + drill D58 jue 24-dic · **SHIP S11 `contenido-marcas` (sáb 26-dic)**; S12 capstone `capstone-readme` mar 22 → mar 29-dic | — |
| **S13** | 2-ene | D59-D61 (Micro, lun 28 → mié 30-dic; **31-dic y 1-ene feriados**: sin mini-sim ENCAPS) · Research X-2 mar 29-dic · Derma d30 lun 28 · d31 mié 30 · **SHIP S12 capstone (sáb 2-ene): el vibecoding S1-S12 cierra el mar 29-dic**; taper S13 desde el mié 30-dic (≤ 15'/día) | **sí (lun 28 → mié 30-dic, post-NBME 28; jue 31 y vie 1 feriados)** |
| S14 | 9-ene | Micro D62-D64 (lun 4 → mié 6-ene; **D64 cierra Micro**) · **NBME 29 jue 7-ene (D65, ≥ 63 %)** — primer hito de 2027 · Repro D66 vie 8-ene (N1) · Research CR-7 lun 4 · CR-8 mié 6 (paquete del case report congelado) · R3 vie 8-ene · Derma d32 mar 5 · d33 jue 7 · LIVIANO caso 12 vie 8-ene (D66) · ENCAPS: las mini-sims vuelven el vie 8-ene | — |
| S15 | 16-ene | Repro D67-D70 (lun 11 → jue 14) + MSK D71 vie 15-ene (artritis, N1) · Research R2 mar 12 · **X-7 jue 14-ene = cierre antes de la PAUSA Research (vie 15-ene → mié 10-feb)** · Derma d34 lun 11 · d35 mié 13 · d36 vie 15 · LIVIANO síntesis módulo 4 D67 lun 11 · caso 13 vie 15-ene | — |
| S16 | 23-ene | **NBME 30 lun 18-ene (D72, ≥ 65 %, cierre Fase A del banco)** · MSK D73-D74 (mar 19 LES + vasculitis · **dermato Step 1 = D74 mié 20-ene**) · Psiquiatría D75-D76 (jue 21 / vie 22; MIR Psiquiatría D74 mié 20 = 1 hábil antes) · AURUM pitch v4 jue 21-ene (D75) · Derma d37 mar 19 · d38 jue 21 · LIVIANO síntesis módulo 6 + drill D75 jue 21 + caso 14 vie 22-ene | — |
| S17 | 30-ene | **UWSA2 lun 25-ene (D77, low risk)** · MIR D77 lun 25-ene = mini-MIR 40Q (mismo día que el UWSA2) y D78 mar 26-ene = cierre de la 1.ª vuelta → **el mantenimiento MIR arranca el mié 27-ene en modo reducido** · psicofármacos D78 mar 26 · Biostats D79 mié 27 · Bioquímica días dobles D80 jue 28 + **D81 vie 29-ene = cierre de contenido** · Derma d39 lun 25 · d40 mié 27 · d41 vie 29 · LIVIANO caso 15 vie 29-ene · Business OUTPUT S15 vie 29-ene | — |
| S18 | 6-feb | **D82-D86 (lun 1 → vie 5-feb) = Fase B entera**: **NBME 31 lun 1-feb (D82) · GO/NO-GO (≥ 68 %)**, el primer hábil tras el cierre de contenido (el finde 30-31 ene en medio) · **NBME 32 mar 2-feb (D83)** · random timed D84 mié 3 · **NBME 33 jue 4-feb (D85)** · random timed D86 vie 5 (N4) · Derma d42 mar 2 (colgajos, día del NBME 32) · d43 jue 4 (Mohs, día del NBME 33) · LIVIANO **caso 16 integral D86 vie 5-feb, ANTES del capstone (⚪ D resuelta)** · Business cierra el mié 3-feb (OUTPUT S16 mar 2 · extra mié 3) | — |
| S19 | 13-feb | **D87-D91 (lun 8 → vie 12-feb)**: **Free 120 lun 8-feb (D87, ≥ 70 %)** — abre la Fase C · random timed + sistema débil #2 D88-D89 · incorrects 2.ª pasada + débil #3 D90-D91 · **Research CR-9 SUBMIT case report jue 11-feb (= D90)** · LIVIANO síntesis módulo 5 D87 lun 8 · repaso integral I D88 mar 9 · capstone D89 mié 10 · trimestral II + cierre D90 jue 11-feb = fin del plan LIVIANO · Derma taper d44 lun 8 (tarde del Free 120) · d45 mié 10 · d46 vie 12-feb · **ENCAPS 17.ª mini-sim vie 12-feb** (el mantenimiento cierra el lun 15-feb, día 92) · **SYNAPSE cierra el sáb 13-feb** (cierre F2, d131) · vibecoding S19 journal 5' · el **sábado 13-feb = revisión S19** (el finde 13-14 queda entre D91 y D92) | — |
| S20 | 20-feb | **D92-D95 + EXAMEN + POST-MORTEM** (semana lun 15 → vie 19-feb): D92 lun 15 + D93 mar 16-feb (uWorld incorrects + AMBOSS 200, mitades 1 y 2; Research X-8 lun 15; **ENCAPS día 92 lun 15 = último banqueo del mantenimiento**; Derma d47 mar 16) · **D94 mié 17-feb = última sesión de banco** (Research **R8 = D94**, ⚪ K) · **D95 jue 18-feb = D-1 REAL dentro del plan** (sesión mínima AM ≤ 2 h + ritual de test-day `USMLE_TAPER.d95`/`dMenos1`; nada después de las 17:00; sin finde entre D94 y D95) — ese jueves caen además AURUM pitch v5 (D95), MIR Tier C Oncología (reducido), Derma d48 (opcional, corta, antes de las 17:00) y el último journal del vibecoding S20 · **🎯 EXAMEN VIE 19-FEB-2027** — ⚠ ese día caen también Research **X-3** y AURUM D96 (⚪ K/L); MIR reducido hasta el vie 19 inclusive (normal desde el lun 22) · después: Derma d49 lun 22-feb (d50 mié 24-feb vuelve a carga completa) · ENCAPS intensiva lun 22-feb (pre-test 2026-II vie 26-feb) · el sábado 20-feb = revisión S20: cierre D92-D95 + post-mortem del examen · último sábado de la serie (`UNTIL=20270221T045959Z`) | — |

⚠ **v5.19 (5.º corrimiento RÍGIDO, lun 5-oct):** el plan Step 1 termina el **jue 18-feb-2027 (D95 = D-1 REAL dentro del plan)** y el examen es el **vie 19-feb-2027** (fuera de la ventana 25-29 ene; Prometric/eligibility a confirmar por Joseph). **No hay fin de semana entre el D94 (mié 17-feb, última sesión de banco) y el D95** (como en v5.18 y v5.16): el sáb 13 y el dom 14-feb quedan entre el D91 (vie 12) y el D92 (lun 15). El plan sigue en **20 semanas** (`TOTAL_SEM = 20`, `STEP1_SEMANAS = 20`): la S1 (lun 5 → vie 9-oct) tiene 4 sesiones (D1-D4; el lun 5-oct no tiene sesión), la S18 (1-5 feb) contiene D82-D86 (la Fase B entera), la S19 (8-12 feb) D87-D91 y la S20 (15-19 feb) D92-D95 **y el examen**, así que el sáb 13-feb es la revisión S19 y el **sáb 20-feb** la S20 = cierre D92-D95 + post-mortem. 🆕 Los 12 hitos corren con el plan y conservan su D# (regla de v5.15), y con el D1 en martes **caen casi todos en lunes** (8 de 12; UWSA1 mar 6-oct, NBME 29 jue 7-ene, NBME 32 mar 2-feb, NBME 33 jue 4-feb). **Viernes de nivel 4 en la Fase A = 1 (D54 vie 18-dic, Heme/Onc)**; el resto del N4 vive en la eval 18:00 y en la Fase B/C (D84 · D86 · D88 · D89) — ⚪ Q de PENDIENTES. La última A-unit de SYNAPSE (cierre F2 + CCA-F) cae el **sáb 13-feb** (fin del motor, +1 día). *(v5.18: D1 lun 5-oct, S1 = sáb 10-oct completa (D1-D5), D94 mar 16-feb, D95 mié 17-feb = D-1 sin finde libre antes, examen jue 18-feb dentro de la S20, hitos casi todos en viernes, 0 viernes N4, deload S6/S12; v5.17: D1 jue 1-oct, S1 = sáb 3-oct corta (D1-D2), 21 semanas, D94 vie 12-feb, finde 13-14 feb libre entre D94 y D95, D95 lun 15-feb, examen mar 16-feb dentro de la S21 con post-mortem el sáb 20-feb, hitos en miércoles; v5.16: D1 lun 28-sep, S1 = sáb 3-oct completa, 20 semanas, D95 mié 10-feb = D-1 sin finde libre antes, examen jue 11-feb dentro de la S20 y post-mortem el sáb 20-feb; v5.15: D1 mié 23-sep, S1 = sáb 26-sep corta de 3 días, D95 vie 5-feb, finde 6-7 libre y examen lun 8-feb con post-mortem el sáb 13-feb; v5.13: D1 jue 17-sep, S1 = sáb 19-sep, D95 lun 1-feb en una S21 de un día y examen mar 2-feb; v5.12: D95 = vie 29-ene = última sesión y examen lun 1-feb; v5.11: D95 = jue 28-ene = D-1 y examen vie 29-ene dentro de la S20.)* Las dos semanas DELOAD (**lun 16 → vie 20-nov** y **lun 28 → mié 30-dic**, los lunes siguientes al NBME 26 del lun 9-nov y al NBME 28 del lun 21-dic; jue 31-dic y vie 1-ene feriados)
las tiene `gen_revision_semanal.js` fijas (`DELOAD` = lunes `2026-11-16` y `2026-12-28`, misma pareja que `homeBriefing.DELOAD_SEMANAS`) y se numeran S7 y S13 (v5.18: S6 y S12, lunes 9-nov y 21-dic).

## Historial

`DATA/USMLE/REVISIONES/_semanas.json` (append-only, una entrada por semana; el script no duplica: si vuelve a
correr la misma semana, actualiza los campos automáticos y conserva los manuales). Los `.md` semanales viven
en la misma carpeta. La tarjeta **"S N/20"** del cockpit (CockpitStatusBar) y el chip de MISIÓN DE HOY se
calculan desde `DAILY_META.inicio` del USMLE — misma numeración que este doc.

---
*Docs relacionados: `DATA/PROTOCOLO_MODO_MINIMO.md` · `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría) ·
`DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` (S4 = este script en producción con ≥ 8/10 métricas reales) ·
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G y Parte V · `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.*
