# 📋 REVISIÓN SEMANAL — sábado 07:15-07:35 (20') · v5.17 · re-fechado 30-sep-2026

> Ritual único que revisa los 9 frentes del régimen v5.17 (D1 = jue 1-oct-2026, Step 1 = principal; D94 = vie 12-feb = última sesión de banco; D95 = lun 15-feb = D-1 REAL; examen target mar 16-feb-2027) con
> **10 métricas** y una sola pregunta: *¿el sistema va on-track o hay que corregir ESTA semana?*
> Palmerton revisa el checklist G "en cada hito NBME" (~3 semanas): demasiado grueso para un plan donde
> 1 día perdido = +1 hábil. Aquí la cadencia es semanal y el trabajo de recopilar lo hace un script.
>
> **Franja**: sábado 07:15-07:35 (hueco libre tras el desayuno; no toca las franjas L-V). El evento **📋 REVISIÓN SEMANAL ya existe en el
> Google Calendar** (id **`th5utf73brht5g0lkt87hd4940`**, sáb 07:15-07:35 desde el **sáb 3-oct-2026**, **`UNTIL=20270221T045959Z`** — la serie se RECREÓ el 26-sep (v5.16)
> porque `recurrenceData` no se puede actualizar por MCP; en v5.17 (30-sep) solo cambió su descripción, el `UNTIL` ya cubría el nuevo final; los ids anteriores `0r2rmn0f4vea40dls47lg60t44` (v5.15) y `21fbiohc1i47r4lqmaa3eb76l4` (v5.14) están borrados). La serie llega al **sáb 20-feb-2027**, que en v5.17 es la
> **S21 = cierre del D95 + post-mortem del examen** (el Step 1 es el **mar 16-feb**; la elección sáb/dom sigue siendo decisión de Joseph). **Semana 1 = sáb 3-oct-2026** = semana **lun 28-sep → vie 2-oct (con el D1 en jueves la S1 vuelve a ser CORTA: sesiones solo el jue 1 = D1 y el vie 2-oct = D2)**. Las semanas se numeran desde la semana L-V de `DAILY_META.inicio` (1-oct) — misma regla que `semanaStep1()` del cockpit (`STEP1_SEMANAS = 21`) y que
> `gen_revision_semanal.js` (lee el `inicio` del `.ts`; `TOTAL_SEM = 21`); el plan ocupa **21 semanas de calendario**: la S20 (lun 8 → vie 12-feb) contiene **D90-D94** (el vie 12-feb = D94 es la última sesión de banco) y la S21 (lun 15 → vie 19-feb) contiene **el D95 (lun 15-feb) y el examen (mar 16-feb)** —
> ⚠ en v5.17 **el finde libre vuelve, pero entre el D94 y el D95**: el sábado 13-feb es la revisión S20 (cierre del banco; el dom 14 libre) y el D-1 real ES el D95 (lun 15-feb); el **sábado 20-feb** es la revisión S21 = cierre del D95 + post-mortem del examen (último sábado de la serie).
> 🆕 **En v5.17 los 12 hitos siguen corriendo con el plan y conservan su D#** (regla RÍGIDA de v5.15/v5.16); con el D1 en jueves **pasan a caer en miércoles** (8 de los 12: D10 · D25 · D40 · D55 · D72 · D77 · D82 · D87), salvo **UWSA1 (jue 1-oct), NBME 29 (lun 4-ene, por los saltos de 25-dic/31-dic/1-ene), NBME 32 (jue 28-ene) y NBME 33 (lun 1-feb)**;
> los proyectos del vibecoding S1-S12 son bloques de 5 hábiles jue→mié y su SHIP va el sábado siguiente (10-oct … 26-dic): **la revisión de la semana N recibe el SHIP del proyecto N-1** (la S1, sáb 3-oct, no tiene SHIP).
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
| 2 | **uWorld % acumulado vs mínimo on-track** del próximo hito | manual (dashboard uWorld); el script imprime el hito y su mínimo (Parte V) | NBME 25 ≥ 51 · 26 ≥ 54 · 27 ≥ 57 · 28 ≥ 61 · 29 ≥ 63 · 30 ≥ 65 · 31 ≥ 68 (GO) | > 5 puntos bajo el mínimo → auditar método (no horas); UWSA1 jue 1-oct = baseline sin juicio |
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
# Revisión semanal S<NN>/21 · sáb <fecha> · semana <lun> → <vie> · hito de la semana: <UWSA/NBME o —> · DELOAD: sí/no
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

## Progreso persistente (v5.10 · 12-sep; vigente en v5.11-v5.17) y export de localStorage

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

## Calendario de las 21 semanas — sábados de revisión (v5.17, fechas leídas de los `.ts` regenerados el 30-sep)

| S | Sábado | Hito de esa semana (en v5.17 casi siempre MIÉRCOLES) | Deload secundarios |
|---|---|---|---|
| S1 | 3-oct | **Semana corta: solo D1-D2** · **UWSA1 jue 1-oct = D1** (baseline; movido del lun 28-sep) · D2 vie 2-oct Fundamentos (Pathoma 1-2; viernes N1) · ENCAPS pre-test de arranque parte 1 jue 1-oct y 1.ª mini-sim vie 2-oct · Research R0 vie 2-oct (abre el ciclo; Derma d1 jue 1-oct) · LIVIANO arranca el jue 1-oct (el vie 2-oct no tiene caso) · sin SHIP (el proyecto S1 del vibecoding, `apex-e2e`, corre jue 1 → mié 7-oct) | — |
| S2 | 10-oct | D3-D7 (Fundamentos D3 lun 5 + Inmuno D4-D5 mar 6 / mié 7 + Cardio abre el **jue 8-oct = D6**; viernes N1 vie 9-oct = D7) · ENCAPS pre-test de arranque parte 2 lun 5-oct · MIR D5 mié 7-oct Cardiología (precede a Cardio Step 1) · Research R1 mar 6 · M1 jue 8-oct · LIVIANO caso 1 vie 9-oct · **SHIP S1 `apex-e2e` (sáb 10-oct)** | — |
| S3 | 17-oct | D8-D12 (Cardio) · **NBME 25 mié 14-oct (D10, ≥ 51 %)** · **viernes N3 vie 16-oct = D12** (antiarrítmicos) · Research C-1 lun 12 · M2 mié 14 · C-2 vie 16-oct · LIVIANO caso 2 vie 16-oct · SHIP S2 `anki-sync-kpi` | — |
| S4 | 24-oct | D13-D17 (cierre Cardio D13-D16, valvulopatías D16 jue 22-oct + Resp abre el vie 23-oct = D17, viernes N1) · Research T-1 mar 20 · M3 jue 22-oct · AURUM pitch v1 mié 21-oct (D15) · LIVIANO tarjetas MECANISMO D15 mié 21 + caso 3 vie 23-oct · SHIP S3 `plan-checks-espejo` | — |
| S5 | 31-oct | D18-D22 (Resp; **viernes N3 vie 30-oct = D22**) · Research R9 lun 26 · C-3 mié 28-oct (disparador del plan B del case report) · C-4 vie 30-oct · LIVIANO síntesis módulo 1 D19 mar 27 + caso 4 vie 30-oct · SHIP S4 `verify-revision` (= este script con ≥ 8/10 métricas reales; fichero `S05_2026-10-31`) | — |
| S6 | 7-nov | D23-D27 (Renal D23-D24 lun 2 / mar 3) · **NBME 26 mié 4-nov (D25, ≥ 54 %)** · Renal D26-D27 (**viernes N3 vie 6-nov = D27**) · Research C-5 mar 3 · **C-6 SUBMIT carta #1 jue 5-nov** · LIVIANO caso 5 vie 6-nov · SHIP S5 `vitals-puente` (`S06_2026-11-07`) | — |
| **S7** | 14-nov | D28-D32 (Renal D28-D29 + GI D30-D32; **viernes N3 vie 13-nov = D32**) · Research R6 lun 9 · CR-1 mié 11 · CR-2 vie 13-nov · LIVIANO caso 6 vie 13-nov · SHIP S6 `rls-datos-tesis` · vibecoding: la deload cae repartida entre S6 (`rls-datos-tesis`, jue 5 → mié 11-nov, **sin flag**) y S7 (`motor-preguntas-encaps`, jue 12 → mié 18-nov, **con flag `deload`**) — decisión ⚪ H de PENDIENTES | **sí (lun 9 → vie 13-nov, post-NBME 26)** |
| S8 | 21-nov | D33-D37 (GI D33-D36 + Endo abre el vie 20-nov = D37, viernes N1) · Research T-3 mar 17 · T-4 jue 19-nov · AURUM pitch v2 mié 18-nov (D35) · LIVIANO drill D36 jue 19 + caso 7 vie 20-nov · SHIP S7 `motor-preguntas-encaps` | — |
| S9 | 28-nov | D38-D42 (Endo) · **NBME 27 mié 25-nov (D40, ≥ 57 %)** · **viernes N3 vie 27-nov = D42** · Research T-2 lun 23 · T-5 mié 25 · R7 vie 27-nov · LIVIANO Acceso Perú D39 mar 24 (DIGEMID) · D40 mié 25 · D41 jue 26-nov + caso 8 vie 27-nov · SHIP S8 `pool-mir` | — |
| S10 | 5-dic | D43-D47 (Neuro; **viernes N3 vie 4-dic = D47**) · Research T-6 mar 1 · CR-3 jue 3-dic · LIVIANO Acceso Perú D43 lun 30-nov (magistral) · D44 mar 1-dic (cadena de frío) + trimestral I D45 mié 2-dic + caso 9 vie 4-dic · SHIP S9 `overlays-hitos` | — |
| S11 | 12-dic | D48-D52 (Neuro D48-D50 + Heme/Onc D51-D52; viernes N1 vie 11-dic = D52) · Research T-7 lun 7 · CR-4 mié 9 · **T-8 SUBMIT tesis L0 vie 11-dic** · LIVIANO caso 10 vie 11-dic · SHIP S10 `bot-whatsapp-ocr` | — |
| S12 | 19-dic | D53-D57 (Heme/Onc) · **NBME 28 mié 16-dic (D55, ≥ 61 %)** · **viernes N4 vie 18-dic = D57** (el primero de nivel 4) · Research CR-5 mar 15 · X-1 jue 17-dic · AURUM pitch v3 mié 16-dic (D55) · LIVIANO caso 11 vie 18-dic · SHIP S11 `contenido-marcas` | — |
| **S13** | 26-dic | D58-D61 (Micro; lun 21 → jue 24-dic; **vie 25-dic feriado**: sin mini-sim ENCAPS) · Research CR-6 lun 21 · X-2 mié 23-dic · LIVIANO drill D58 lun 21-dic · **SHIP S12 capstone (sáb 26-dic): el vibecoding S1-S12 cierra el mié 23-dic**; taper S13 desde el jue 24-dic (≤ 15'/día) | **sí (lun 21 → jue 24-dic, post-NBME 28)** |
| S14 | 2-ene | D62-D64 (Micro, lun 28 → mié 30-dic; **Micro D64 cierra el contenido de 2026**; **31-dic y 1-ene feriados**: sin mini-sim ENCAPS) · Research CR-7 mar 29-dic | — |
| S15 | 9-ene | **NBME 29 lun 4-ene (D65, ≥ 63 %)** — primer hito de 2027 · D66-D69 (Repro; **viernes N4 vie 8-ene = D69**) · Research CR-8 lun 4 (paquete del case report congelado) · R3 mié 6 · R2 vie 8-ene · LIVIANO caso 12 vie 8-ene · ENCAPS: las mini-sims vuelven el vie 8-ene · vibecoding taper S13 cierra el lun 4-ene (S14 mar 5 → lun 11-ene) | — |
| S16 | 16-ene | D70-D74 (Repro D70 + MSK D71 artritis) · **NBME 30 mié 13-ene (D72, ≥ 65 %)** · MSK D73-D74 (**dermato Step 1 = D74 vie 15-ene**, viernes N4) · **Research X-7 mar 12-ene = cierre antes de la PAUSA Research (mié 13-ene → lun 8-feb)** · LIVIANO caso 13 vie 15-ene | — |
| S17 | 23-ene | D75-D79 (Psiquiatría D75-D76) · **UWSA2 mié 20-ene (D77, low risk)** · psicofármacos D78 jue 21 · Biostats D79 vie 22-ene (viernes N4) · MIR D77 mié 20-ene = mini-MIR 40Q · **MIR 1ª vuelta cierra el jue 21-ene (D78) y el mantenimiento arranca el vie 22-ene en modo reducido** · AURUM pitch v4 lun 18-ene (D75) · LIVIANO drill D75 lun 18 + caso 14 vie 22-ene | — |
| S18 | 30-ene | D80-D84: Bioquímica días dobles D80 lun 25 + **D81 mar 26-ene = cierre de contenido** · **NBME 31 mié 27-ene (D82) · GO/NO-GO (≥ 68 %)**, el día siguiente al cierre, sin banco de consolidación delante · **NBME 32 jue 28-ene (D83)** · random timed D84 vie 29-ene · Derma d42 mié 27-ene (sesión normal) · LIVIANO caso 15 vie 29-ene · Business cierra el vie 29-ene | — |
| S19 | 6-feb | **D85-D89 (lun 1 → vie 5-feb)**: **NBME 33 lun 1-feb (D85)** · random timed D86 mar 2 · **Free 120 mié 3-feb (D87, ≥ 70 %)** — abre la Fase C · random timed + sistema débil #2 D88-D89 · Derma taper d44 mar 2 · d45 jue 4-feb · LIVIANO repaso integral I D87 mié 3 · capstone D88 jue 4 · **caso 16 integral D89 vie 5-feb, DESPUÉS del capstone (decisión ⚪ D)** · ENCAPS última mini-sim (17.ª) vie 5-feb · vibecoding S19 deload total · el finde 6-7 feb es un finde normal dentro del plan | — |
| S20 | 13-feb | **D90-D94 (lun 8 → vie 12-feb)**: incorrects 2.ª pasada D90-D91 · AMBOSS 200 mitades 1-2 D92 mié 10 y D93 jue 11 · **D94 vie 12-feb = D-2, última sesión de banco** · **Research CR-9 SUBMIT case report mar 9-feb (= D91)** · X-8 jue 11-feb (= D93) · LIVIANO trimestral II + cierre D90 lun 8-feb = fin del plan LIVIANO · **SYNAPSE cierra el mar 9-feb** (última A-unit, D91) · **ENCAPS mantenimiento cierra el mié 10-feb** · Derma d46 lun 8 · d47 mié 10 · d48 vie 12-feb · vibecoding S20 (journal 5') desde el jue 11-feb · **sáb 13 y dom 14-feb libres** (el sábado 13 = revisión S20: cierre del banco) | — |
| S21 | 20-feb | **D95 + EXAMEN + POST-MORTEM** (semana lun 15 → vie 19-feb): **D95 lun 15-feb = D-1 REAL dentro del plan** (sesión mínima AM ≤ 2 h + ritual de test-day `USMLE_TAPER.d95`/`dMenos1`; nada después de las 17:00) · **🎯 EXAMEN MAR 16-FEB-2027** · ⚠ Research **R8 lun 15-feb = D-1** (decisión: no hacerlo ese día) · AURUM pitch v5 lun 15-feb (D95) y D96 mar 16-feb (mover/recuperar) · Derma d49 mar 16-feb (opcional; lo esperado es saltarla) · d50 jue 18-feb (vuelve a 3 casos/sesión) · MIR mantenimiento reducido hasta el mar 16-feb, normal desde el mié 17 · ENCAPS intensiva propuesta mié 17-feb (pre-test 2026-II vie 19-feb) o lun 22-feb · Research X-3 mié 17 · X-4 vie 19-feb · vibecoding S20 cierra el lun 15-feb · el sábado 20-feb = revisión S21: cierre del D95 + post-mortem del examen · último sábado de la serie (`UNTIL=20270221T045959Z`) | — |

⚠ **v5.17 (3.er corrimiento RÍGIDO, 30-sep):** el plan Step 1 termina el **lun 15-feb-2027 (D95 = D-1 REAL dentro del plan)** y el examen es el **mar 16-feb-2027** (fuera de la ventana 25-29 ene; Prometric/eligibility a confirmar por Joseph). **El fin de semana libre vuelve, pero entre el D94 (vie 12-feb, última sesión de banco) y el D95** (sáb 13 y dom 14-feb); el sáb 6 y el dom 7-feb son un finde normal dentro del plan (entre D89 y D90). El plan pasa a **21 semanas** (`TOTAL_SEM = 21`, `STEP1_SEMANAS = 21`): la S1 vuelve a ser corta (lun 28-sep → vie 2-oct, solo D1-D2), la S19 (1-5 feb) contiene D85-D89, la S20 (8-12 feb) D90-D94 y la S21 (15-19 feb) el D95 **y el examen**, así que el sáb 13-feb es la revisión S20 y el **sáb 20-feb** la S21 = cierre del D95 + post-mortem. 🆕 Los 12 hitos corren con el plan y conservan su D# (regla de v5.15), y con el D1 en jueves **pasan a caer en miércoles** (8 de 12; UWSA1 jue 1-oct, NBME 29 lun 4-ene, NBME 32 jue 28-ene, NBME 33 lun 1-feb). La última A-unit de SYNAPSE cae el **mar 9-feb (D91)** — adelantarla sigue A DECIDIR. *(v5.16: D1 lun 28-sep, S1 = sáb 3-oct completa, 20 semanas, D95 mié 10-feb = D-1 sin finde libre antes, examen jue 11-feb dentro de la S20 y post-mortem el sáb 20-feb; v5.15: D1 mié 23-sep, S1 = sáb 26-sep corta de 3 días, D95 vie 5-feb, finde 6-7 libre y examen lun 8-feb con post-mortem el sáb 13-feb; v5.13: D1 jue 17-sep, S1 = sáb 19-sep, D95 lun 1-feb en una S21 de un día y examen mar 2-feb; v5.12: D95 = vie 29-ene = última sesión y examen lun 1-feb; v5.11: D95 = jue 28-ene = D-1 y examen vie 29-ene dentro de la S20.)* Las dos semanas DELOAD (**lun 9 → vie 13-nov** y **lun 21 → jue 24-dic**, los lunes siguientes al NBME 26 del mié 4-nov y al NBME 28 del mié 16-dic)
las tiene `gen_revision_semanal.js` fijas (`DELOAD` = lunes `2026-11-09` y `2026-12-21`, misma pareja que `homeBriefing.DELOAD_SEMANAS`) y se numeran S7 y S13.

## Historial

`DATA/USMLE/REVISIONES/_semanas.json` (append-only, una entrada por semana; el script no duplica: si vuelve a
correr la misma semana, actualiza los campos automáticos y conserva los manuales). Los `.md` semanales viven
en la misma carpeta. La tarjeta **"S N/21"** del cockpit (CockpitStatusBar) y el chip de MISIÓN DE HOY se
calculan desde `DAILY_META.inicio` del USMLE — misma numeración que este doc.

---
*Docs relacionados: `DATA/PROTOCOLO_MODO_MINIMO.md` · `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría) ·
`DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` (S4 = este script en producción con ≥ 8/10 métricas reales) ·
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G y Parte V · `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.*
