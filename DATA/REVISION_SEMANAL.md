# 📋 REVISIÓN SEMANAL — sábado 07:15-07:35 (20') · v5.10 · re-fechado 12-sep-2026

> Ritual único que revisa los 9 frentes del régimen v5.10 (D1 = lun 14-sep-2026, Step 1 = principal) con
> **10 métricas** y una sola pregunta: *¿el sistema va on-track o hay que corregir ESTA semana?*
> Palmerton revisa el checklist G "en cada hito NBME" (~3 semanas): demasiado grueso para un plan donde
> 1 día perdido = +1 hábil. Aquí la cadencia es semanal y el trabajo de recopilar lo hace un script.
>
> **Franja**: sábado 07:15-07:35 (hueco libre tras el desayuno; no toca las franjas L-V). El evento en el
> Google Calendar NO se ha creado: decisión de Joseph (pendiente). **Semana 1 = sáb 19-sep-2026** (v5.10: la S1 del Step 1 es la semana lun 14 → vie 18-sep; el sáb 12-sep queda como "pre-D1" en el cockpit y no lleva revisión). Las 20 semanas se numeran desde `DAILY_META.inicio` = 14-sep — misma regla que `semanaStep1()` del cockpit y que `gen_revision_semanal.js` (lee el `inicio` del `.ts`) — y los hitos conservan su fecha, así que la tabla de abajo corre una fila respecto a v5.9.
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
| 2 | **uWorld % acumulado vs mínimo on-track** del próximo hito | manual (dashboard uWorld); el script imprime el hito y su mínimo (Parte V) | NBME 25 ≥ 51 · 26 ≥ 54 · 27 ≥ 57 · 28 ≥ 61 · 29 ≥ 63 · 30 ≥ 65 · 31 ≥ 68 (GO) | > 5 puntos bajo el mínimo → auditar método (no horas); UWSA1 lun 14-sep = baseline sin juicio |
| 3 | **Anki**: due medio · backlog · retención 30 d · % Again · **minFinde** | `_anki_telemetria.json` + AnkiConnect en vivo | backlog < 20 · retención 85-92 % · Again < 15 % | backlog > 100 o retención < 85 % = **alarma G "avalancha"** → cero nuevas hasta backlog < 20; Anki finde = due × 20 s |
| 4 | **ENCAPS · % ciego del viernes** (mini-sim 25Q) + rondas de la semana | `_registro_resoluciones.json` (examen ENCAPS, fecha en la semana) | ≥ 18/25 hacia diciembre (crucero 75 %; meta 85 %) | < 15/25 dos viernes seguidos → re-ponderar la rotación (PROTOCOLO_HORA_MANTENIMIENTO) |
| 5 | **MIR · eval D-1** media + días con eval | `jmd-mir-eval-log` (export localStorage) | ≥ 60 % · 5/5 días | < 50 % media → solo eval D-1 la semana siguiente (deep work al tema peor) |
| 6 | **SYNAPSE · misiones ✓** (L-sáb) | Supabase `plan_checks` (plan_key `synapse`) ∪ `jmd-study-progress-v1.synapse` vs días del plan en la semana | ≥ 5/6 | < 4/6 dos semanas → SYNAPSE a solo audio B hasta recuperar el hábito |
| 7 | **Vibecoding · proyecto S<n> shipped** (sí/no + evidencia) | `plan_checks` (`vibecoding`, 5/5 días = auto-reporte) + **`DATA/SYNAPSE/_vibecoding_ship.json`** si existe (`verify_vibecoding.js`: criterios ok/total → SHIPPED real manda sobre el ✓) + commit/URL/test | 1 proyecto/semana con los 4 criterios de aceptación | no shipped → el sábado PC cierra; NUNCA se arrastra a la semana siguiente (VIBECODING_12_PROYECTOS.md) |
| 8 | **VITALS**: adherencia (días con log) · sueño medio · noches < 7 h · agua media | `mv_wellness_logs` (user `joseph`, tipos `sueno`/`agua`) si hay credencial; **fallback del sueño: `sueno_h` del diario Obsidian**; si nada, manual | sueño ≥ 7 h · 0 noches < 6 h · agua ≥ 3.000 ml | 1 noche < 6 h → ÁMBAR al día siguiente; 3 noches < 7 h → bajar carga de secundarios (PROTOCOLO_MODO_MINIMO) |
| 9 | **Días perdidos** + niveles ÁMBAR/ROJO de la semana + corrimiento ejecutado (sí/no) | `plan_checks` (`usmle`) ∪ `jmd-study-progress-v1.usmle` vs días del plan · niveles: `jmd-modo-log` ∪ campo `modo` del diario (la app manda si ambos existen) | 0 perdidos · ≤ 1 ÁMBAR | 1 perdido = +1 hábil (`remap_inicio.js <fecha>`); ≥ 2 ÁMBAR tres semanas seguidas = plan mal dimensionado → reestructurar |
| 10 | **Alarma checklist G** (PALMERTON_POR_MATERIA §G) **+ burnout §6**: nº de alarmas activas y cuál | el script pre-marca: G8 (Anki) si backlog > 100; G1 (validación rápida) si no hubo eval ≥ 80 % en la semana; G10 (noche exhausto) si sueño < 6 h; **BURNOUT ÁMBAR** si ≥ 1 casilla `burnout_*` en el diario de la semana, **BURNOUT ROJO** si `burnout_gym` (DOCTRINA §6 · PROTOCOLO_MODO_MINIMO §1) | 0 activas | 1 activa → corrección escrita esta semana; 2+ → semana ÁMBAR |

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

## Progreso persistente (v5.10 · 12-sep) y export de localStorage

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
| S1 | 19-sep | UWSA1 (baseline, **lun 14-sep = D1**; movido del vie 11-sep) · SHIP S1 del vibecoding | — |
| S2 | 26-sep | — | — |
| S3 | 3-oct | NBME 25 (≥ 51 %) | — |
| S4 | 10-oct | — | — |
| S5 | 17-oct | — | — |
| S6 | 24-oct | NBME 26 (≥ 54 %) | — |
| **S7** | 31-oct | — | **sí (26-30 oct)** |
| S8 | 7-nov | — (proyecto S8 del vibecoding, deload en el catálogo: 2-6 nov) | — |
| S9 | 14-nov | NBME 27 (≥ 57 %) | — |
| S10 | 21-nov | — | — |
| S11 | 28-nov | — (SHIP S11 del vibecoding) | — |
| S12 | 5-dic | NBME 28 (≥ 61 %) · **SHIP S12 = cierre del vibecoding** | — |
| **S13** | 12-dic | — | **sí (7-11 dic)** |
| S14 | 19-dic | NBME 29 (≥ 63 %) | — |
| S15 | 26-dic | (25-dic feriado) | — |
| S16 | 2-ene | NBME 30 mié 30-dic (≥ 65 %) · 31-dic/1-ene feriados | — |
| S17 | 9-ene | UWSA2 (low risk) | — |
| S18 | 16-ene | NBME 31 · GO/NO-GO (≥ 68 %) | — |
| S19 | 23-ene | NBME 32 (lun) · NBME 33 (mié) · Free 120 (vie ≥ 70 %) | — |
| S20 | 30-ene | D93-D95 taper (lun-mié) · jue 28 descanso · **examen vie 29-ene** → el sábado es post-mortem, no ritual | — |

⚠ **v5.10:** el plan Step 1 termina el **mié 27-ene-2027 (D95)** y el examen target pasa al **vie 29-ene** (jue 28 =
descanso pre-examen), así que la S20 (25-29 ene) contiene D93-D95 de taper, el descanso **y** el examen. El sáb 30-ene no
lleva el ritual de 20': el cierre de esa semana es el post-mortem del examen. Las dos semanas DELOAD (26-30 oct y 7-11 dic)
conservan sus fechas (`gen_revision_semanal.js` las tiene fijas) y pasan a numerarse S7 y S13.

## Historial

`DATA/USMLE/REVISIONES/_semanas.json` (append-only, una entrada por semana; el script no duplica: si vuelve a
correr la misma semana, actualiza los campos automáticos y conserva los manuales). Los `.md` semanales viven
en la misma carpeta. La tarjeta **"S N/20"** del cockpit (CockpitStatusBar) y el chip de MISIÓN DE HOY se
calculan desde `DAILY_META.inicio` del USMLE — misma numeración que este doc.

---
*Docs relacionados: `DATA/PROTOCOLO_MODO_MINIMO.md` · `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (telemetría) ·
`DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` (S4 = este script en producción con ≥ 8/10 métricas reales) ·
`DATA/USMLE/PALMERTON_POR_MATERIA.md` §G y Parte V · `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.*
