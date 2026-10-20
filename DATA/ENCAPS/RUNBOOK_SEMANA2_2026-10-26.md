> Copia en el repo del runbook del lote «semana 1 estructurada» (dom 18-oct-2026), **re-fechada el mar 20-oct-2026 a la v6.03**. Úsalo el **vie 23-oct tras el mini-sim** (16:15-17:15) o el fin de semana (sáb 24 / dom 25 son libres: solo si te sobra un rato en el PC) y, a más tardar, el **lun 26 antes de las 16:15**, para generar los runners que faltan de la semana 2 (mié 28 y jue 29-oct) **después** del mini-sim.
>
> ⚠ **v6.03 (mar 20-oct-2026 · corrimiento de Joseph «todo comienza mañana miércoles 21, corre dos días»):** el lun 19 y el mar 20 no hubo estudio → **D1 = mié 21-oct**. La corrida por alias de la v6.02d (mar 20 = plan del lun 19 … mini-sim el dom 25) **queda sin efecto**: cada runner lleva ya su **FECHA REAL** (re-fechados por sesión lun-jue el 20-oct, ítems intactos, `_meta.realineado`). Los viernes de mini-sim no se movieron.
> - **Semana 1** (la del lun 19): **mié 21** D1 = `EVAL_2026-10-21` (fallos previos) + `PRETEST_ARRANQUE_2026-10-21` (parte 1) · **jue 22** D2 = `EVAL_2026-10-22` (II-3) + `PRETEST_ARRANQUE_2026-10-22` (parte 2) · **vie 23** D3 = `MINISIM_2026-10-23` (16:15). Sáb 24 y dom 25 libres.
> - **Semana 2** (lun 26 → vie 30): **lun 26** D4 = `EVAL_2026-10-26` (I-3) + `BANCO_2026-10-26` (V-2) **YA ARMADOS** · **mar 27** D5 = `EVAL_2026-10-27` (V-2) + `BANCO_2026-10-27` (III-5) **YA ARMADOS** · **mié 28** D6 (II-5) y **jue 29** D7 (I-4) **POR GENERAR** (este runbook) · **vie 30** D8 = `MINISIM_2026-10-30` (ya armado).
> - *(v6.02, 18-oct: la semana 2 era lun 26 II-5 → jue 29 II-4 y se generaba entera con `--semana 2026-10-26`; ya no vale: sobrescribiría los bancos re-fechados del lun 26 y el mar 27.)*

# RUNBOOK · ENCAPS semana 2 (lun 26 → jue 29-oct-2026): cómo generar los runners que faltan DESPUÉS del mini-sim del vie 23 + stock por código

> Redactado el dom 18-oct-2026 (F1, lote «semana 1 estructurada») y re-fechado el mar 20-oct-2026 (v6.03). Todo lo numérico sale de una
> **simulación fiel** en copia aislada (fuera del repo: mismo generador, mismo pool, mismo SQL v6.03; la simulación no escribió nada en el repo).
> Sin reposición de stock. Comandos desde `D:\joseph-md-app`. Ningún paso de este documento escribe Supabase, Calendar ni Vercel salvo donde
> se dice «con OK explícito de Joseph».

## 0. Por qué se genera DESPUÉS del vie 23 (y qué hay que saber antes)

1. **La eval del lun 26 ya está armada y es de I-3, no de fallos.** Es la eval de la sesión lun-jue nº 3 de la F1, re-fechada (`eval_2026-10-26`,
   5Q de I-3 = el código de la sesión anterior lun-jue, jue 22). Regla de lunes: si ya registraste los fallos del mini-sim del vie 23, rehaz
   esos primero; esta eval sirve de recall de I-3 (no se pierde). **Por defecto NO se regenera** (regla del corrimiento: los runners ya
   armados se re-fechan, no se re-sortean). Opción de Joseph: rehacerla en modo «lunes» con P2 (5Q de los códigos fallados en los 7 días
   previos) con `node DATA/_scripts/gen_encaps_minisim.js --eval 2026-10-26` **después** del paso 6; sobrescribe `eval_2026-10-26` y sus
   5 ids vuelven al pool.
2. **Los fallos de la semana 1 solo entran si las rondas se apendan con `preguntas[]`**, es decir, con el export del runner + `--registrar …
   --append`. Los cierres hechos en la app y traídos con `gen_encaps_semana.js --pull` NO traen `preguntas[]`, así que no aportan fallos por
   ítem (ni a P2 ni al «≥5 fallos previos» del mini-sim).
3. **El cierre semanal puede cambiar los códigos de la semana 2.** `gen_encaps_semana.js --semana 2026-10-19` emite
   `SEMANAS/override_2026-10-26.json` y lo mezcla en `overrides_acumulado.json`. Si Joseph acepta el override, cambia
   `_encaps_mantenimiento_2027.sql`, que es lo que leen el runner y la guía. V-2 (lun 26) es intocable; III-5 (mar 27), II-5 (mié 28) e
   I-4 (jue 29) pueden cambiar. Por eso los runners que faltan se generan **después** de esa decisión.
4. **No correr `--semana 2026-10-19` ni `--semana 2026-10-26`.** La primera sobrescribiría `eval_2026-10-21` (la eval del D1) y
   `eval_2026-10-22`; la segunda re-sortearía `banco_2026-10-26`, `banco_2026-10-27` y `eval_2026-10-27`, ya armados (es determinista
   por fecha, pero la semilla depende de la fecha nueva: saldrían OTROS ítems). Lo que falta (mié 28 y jue 29) se genera día a día.

## 1. Runbook exacto (vie 23 17:15, tras el mini-sim → a más tardar el lun 26 antes de las 16:15)

**Paso 1 · Registrar la semana 1 con `preguntas[]` (PC).** Para cada runner resuelto: botón «Generar JSON», luego «Descargar .json», y después:
```
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-21.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-21.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-22.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-22.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\MINISIM_2026-10-23.json --append
```
- El progreso del runner vive en el `localStorage` del navegador donde se resolvió. Si fue en el móvil (URL web), el export se descarga
  allí y se pasa al PC.
- Comprobación (deben salir las 5 rondas, cada una con su nº de preguntas):
```
node -e "const r=require('./DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json');console.log(r.rondas.filter(x=>x.fecha>='2026-10-21').map(x=>x.id+' · '+(x.preguntas||[]).length+'Q').join('\n'))"
```

**Paso 2 · Solo si algún cierre se hizo en la app.** `node DATA/_scripts/gen_encaps_semana.js --pull --dry` y luego `--pull`. Solo lee
Supabase. No duplica: usa la clave fecha + código + tipoRonda.

**Paso 3 · Cierre semanal.** `node DATA/_scripts/gen_encaps_semana.js --semana 2026-10-19` (la semana del lun 19 contiene el mié 21, el jue 22
y el vie 23). Produce `SEMANAS/semana_2026-10-19.md`, `override_2026-10-26.json` (propuesta), `resumen_por_subtema` y
`PERFIL_CONOCIMIENTO.md`.

**Paso 4 · Decisión sobre el override de la semana del 26-oct** (la toma Joseph):
- **(a) Sin override** (por defecto): no se toca nada.
- **(b) Con override:** se corre la línea EXACTA que imprime el cierre: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-10-21 --override …
  --hasta 2026-12-30`. Supabase se actualiza con `execute_sql` **solo con OK explícito de Joseph**. Si el override cambia el código del
  mar 27 (III-5), regenerar ese día: `--eval 2026-10-27` no cambia (es V-2, del lun 26) pero `--banco 2026-10-27` sí (sobrescribe
  `banco_2026-10-27`). Después se corren `node DATA/_scripts/gen_encaps_guia.js` y las verificaciones. Recién entonces se pasa al paso 6.

**Paso 5 · Parches P1 + P2: YA APLICADOS el dom 18-oct-2026** en `DATA/_scripts/gen_encaps_minisim.js`: (P1) el relleno ya no toma ítems de
mini-sims futuros; (P2) la eval del lunes usa de verdad los fallos registrados con `preguntas[]`. No hay que hacer nada aquí.

**Paso 6 · Generar los que faltan (el orden importa: el mismo que usa `--semana`, eval del día → banco del día):**
```
node DATA/_scripts/gen_encaps_minisim.js --eval 2026-10-28 --dry      # solo informa: revisar avisos
node DATA/_scripts/gen_encaps_minisim.js --eval 2026-10-28             # III-5 (código del mar 27)
node DATA/_scripts/gen_encaps_minisim.js --banco 2026-10-28            # II-5 · nts_adolescente + II-10
node DATA/_scripts/gen_encaps_minisim.js --eval 2026-10-29             # II-5 (código del mié 28)
node DATA/_scripts/gen_encaps_minisim.js --banco 2026-10-29            # I-4 · dengue + I-5+I-6
```
- Respetar el orden (eval → banco de cada día, y el mié 28 antes que el jue 29): es el que usa `--semana` y el que se simuló (§2). La eval del
  jue 29 (II-5) tiene que ir después del banco del mié 28, que es el que consume el pool libre de II-5.
- Si hay que repetir un día: `--banco <fecha>` / `--eval <fecha>` sobrescriben su propio fichero (sus ids no cuentan como usados mientras
  se regeneran).
- `minisim_2026-10-30` NO se regenera salvo que la reposición traiga ítems nuevos con `fallo_previo` de la semana 1 (receta: ≥5 fallos
  previos; hoy tiene 5). En ese caso, `node DATA/_scripts/gen_encaps_minisim.js 2026-10-30` sobrescribe solo ese fichero.

**Paso 7 · Publicar y comprobar:**
```
node DATA/_scripts/gen_encaps_minisim.js --refrescar --dry    # debe decir «al día» en todas (guarda LISTA NEGRA)
node DATA/_scripts/sync_encaps_bp_web.js && node DATA/_scripts/sync_encaps_bp_web.js --check
node DATA/_scripts/gen_encaps_guia.js && node DATA/_scripts/gen_encaps_guia.js --check
node DATA/_scripts/gen_encaps_minisim.js --inventario
npx tsc --noEmit -p .
```
Commit y deploy los hace Joseph o el orquestador (ningún agente).

## 2. Qué debe salir (simulación del 20-oct con el stock actual, sin tanda 0)

| Día | Runner | Contenido | Observación |
|---|---|---|---|
| lun 26 | `eval_2026-10-26` | **ya armada**: 5Q de I-3 (recall del jue 22) | Regla de lunes: primero los fallos del mini-sim del vie 23 (opción P2: §0.1) |
| lun 26 | `banco_2026-10-26` | **ya armado**: V-2 · planeamiento **20Q** (18 del sub-eje + 2 clima_calidad) + **V-6 5Q** | V-2 queda en **1/41** |
| mar 27 | `eval_2026-10-27` | **ya armada**: V-2 5Q (código del lun 26) | — |
| mar 27 | `banco_2026-10-27` | **ya armado**: III-5 · pertinencia_barreras **20Q** + **II-6 5Q** | III-5 queda en **0** · II-6 en 0 |
| mié 28 | `eval_2026-10-28` | III-5: **5/5 re-test** (fallback paso 1: reales de III-5 ya usados) | El pool libre de III-5 ya está a 0 |
| mié 28 | `banco_2026-10-28` | II-5 · nts_adolescente: **20Q** (9 del sub-eje + 11 mci_curso_vida) + **II-10 2Q** | II-5 queda en **0**; secundario 2/4 |
| jue 29 | `eval_2026-10-29` | II-5: **5/5 re-test** (fallback paso 1) | — |
| jue 29 | `banco_2026-10-29` | I-4 · dengue: **16Q** (8 dengue + 3 rabia + 3 malaria_zoonosis + 2 epp) + **I-5+I-6 4Q** | I-4 queda en **0** |
| vie 30 | `minisim_2026-10-30` | ya armado (V-6 + II-6), 25Q | No se toca |

- **P1 comprobado en la simulación:** 0 ítems de `minisim_2026-10-30` / `minisim_2026-11-06` en las 4 salidas nuevas (sin P1 eran 3 spoilers
  en la semana 2 de la v6.02).
- Las evals de mié-jue salen en re-test porque el banco del día anterior (o el del mar 27, para III-5) consume **todo** el pool libre del
  código. Así está diseñado el fallback de v5.14. Repiten ítems vistos 1-7 días antes (banco de ayer, pre-test del 21/22).

## 3. Defectos encontrados en el generador y parches (APLICADOS al repo el dom 18-oct-2026 en `DATA/_scripts/gen_encaps_minisim.js`)

- **P1 · spoiler (bug).** `completarConFallback` re-testeaba cualquier id «usado», también los de salidas **futuras** ya armadas
  (`minisim_2026-10-30`, `minisim_2026-11-06`): Joseph los habría visto 1-3 días antes del mini-sim. El parche excluye del fallback los ids de
  salidas con fecha ≥ la sesión (salvo las que `--semana` va a regenerar). Simulado el 18-oct (v6.02): **3 → 0**; el 20-oct (v6.03): **0**.
- **P2 · la eval del lunes usa los fallos (mejora).** Después de los ítems con `fallo_previo`, prioriza ítems libres del mismo
  código + sub-eje y luego del mismo código que los fallos de los 7 días previos. Cuenta como fallo `ok:false` y también el acierto no ciego
  (`acierto_por_suerte`). Máximo 2 por código. Los críticos quedan solo de relleno, y `_meta.modo` deja constancia (p. ej. «P2: V-2×3
  IV-1+IV-2×2 …»). En v6.03 la eval del lun 26 ya está armada (I-3, re-fechada): P2 solo actúa si Joseph decide regenerarla (§0.1).
- Observación, sin parche: **9 de los 25 ítems de `minisim_2026-10-23`** (v6.02: 15, porque entonces V-2 y III-5 iban antes del mini-sim) y
  **13 de `minisim_2026-10-30`** son ítems **espejo** (mismo molde 2024-2A→2025-2) de reales que Joseph ve en los días previos (pre-test,
  evals, bancos). Es el diseño de `banco_items_v1`, pero infla la nota /25. Si molesta: excluir en `armarSet` los espejos cuyo molde se usó
  en los 7 días previos (lo decide Joseph).

## 4. Stock por código (pool 434 · libres hoy 249 · tras la semana 2 simulada 207)

Demanda mínima: 16Q por banco (eval en re-test) · 4Q por secundario · 3Q por código de cola larga del viernes. «Faltan» = demanda mínima de
las sesiones F1 aún sin runner (desde el mié 28-oct; viernes desde el 13-nov) − libres hoy. «Tener el set listo antes de» = viernes anterior
a la semana del primer quiebre (regla del README: pre-generar el viernes anterior). Con el D1 en miércoles, cada sesión lun-jue cae **2 slots
lun-jue más tarde** que en la v6.02; los viernes no se mueven.

| Código | Libres hoy | Tras sem 2 | 1.er quiebre (sin reponer) | Faltan (mín.) hasta el 30-dic | Tener el set listo antes de |
|---|---|---|---|---|---|
| II-10 (sec) | 2 | 0 | **mié 28-oct** (2/4) | 10 | **vie 23-oct** (tanda 0) |
| II-EMG (sec/CL) | 2 | 2 | **lun 2-nov** (2/4) | 13 | **vie 30-oct** |
| I-OCC (sec/CL) | 3 | 3 | **mar 3-nov** (3/4) | 8 | **vie 30-oct** |
| II-4 | 15 | 15 | **mar 3-nov** (15 + 1 fallback) · mar 1-dic 16Q re-test | 33 | vie 30-oct (1) · vie 27-nov (resto) |
| II-1 | 11 | 11 | **mié 4-nov** prenatal_emergencias (11 + 5 fallback) | 37 | **vie 30-oct** |
| I-3 | 10 | 10 | **jue 5-nov** notificacion (10 + 6 fallback) | 54 | **vie 30-oct** |
| V-2 | 1 | 1 | **lun 9-nov** clima_calidad (1 + 15 fallback) | 63 | vie 6-nov |
| III-8 | 8 | 8 | mar 10-nov ley_27815 | 24 | vie 6-nov |
| II-11 | 5 | 5 | mié 11-nov prep_dual_ptmi | 27 | vie 6-nov |
| IV-6+IV-7 | 6 | 6 | jue 12-nov imryd | 26 | vie 6-nov |
| III-9 (sec/CL) | 2 | 2 | jue 12-nov (2/4) | 9 | vie 6-nov |
| **mini-sim vie 13-nov** | — | — | **NO se puede armar** (23Q: IV 0/2 y cola larga II-EMG + I-OCC 0/5; el generador aborta < 25Q) | IV ≥ 2 + cola II-EMG/I-OCC | vie 6-nov |
| II-8 | 11 | 11 | mar 17-nov paquetes_tamizaje | 21 | vie 13-nov |
| II-3 | 15 | 15 | mié 18-nov novedades_gestante (15 + 1) | 17 | vie 13-nov |
| II-2 (sec/CL) | 2 | 2 | jue 19-nov (2/4) | 9 | vie 13-nov |
| III-3 (sec/CL) | 4 | 4 | vie 20-nov (mini-sim: 2/5 de III-3 + I-11+I-12) | 7 | vie 13-nov |
| III-5 | 0 | 0 | mar 24-nov medicina_tradicional | 32 | vie 20-nov |
| V-6 (sec) | 3 | 3 | mar 24-nov (3/4) | 5 | vie 20-nov |
| II-5 | 20 | 0 | mié 25-nov mci_curso_vida | 28 | vie 20-nov |
| I-4 | 16 | 0 | jue 26-nov rabia | 32 | vie 20-nov |
| IV-1+IV-2 | 18 | 18 | lun 2-nov metodo_cientifico sale con 18Q y lo deja en 0 → **lun 30-nov** tipos_estudio | 30 | vie 27-nov |
| II-6 · II-10 · I-5+I-6 (sec) | 0 · 2 · 4 | 0 · 0 · 0 | 25 / 26 / 30-nov | 8 · 10 · 8 | vie 20-nov (II-6, II-10) · vie 27-nov (I-5+I-6) |
| I-11+I-12 · V-1 · III-1 (sec/CL) | 7 · 8 · 4 | igual | 7 / 8 / 10-dic | 4 · 3 · 7 | vie 4-dic |
| V-MED | 22 | 22 | lun 14-dic esenciales_sismed (el lun 16-nov sale con 20Q y deja 2) | 10 | vie 11-dic |
| V-3 · II-9 (sec) | 7 · 4 | igual | 9 / 15-dic | 4 · 7 | vie 4-dic · vie 11-dic |
| II-7 · I-10 · I-1 (sec/CL) | 8 · 7 · 8 | igual | 16 / 22 / 17-dic | 3 · 1 · 3 | vie 11-dic · vie 18-dic · vie 11-dic |

**Total mínimo hasta el 30-dic ≈ 543Q** (misma cuenta que daba ≈ 583Q con la F1 v6.02: los −40Q son las 2 sesiones que salen de la F1 —I-3
brote_bloqueo #6 + I-OCC y V-2 residuos_bioseguridad #6 + III-3— y pasan al carril B de la intensiva, mié 3 y jue 4-mar-2027: la demanda no
desaparece, se mueve a marzo) + **≈45Q** para que los 6 mini-sims del 13-nov al 18-dic lleguen a 25Q. Sin reponer, desde el **lun 23-nov
todos los bancos son 16/16 re-test** y **ningún mini-sim desde el vie 13-nov llega a 25Q** (13-nov 23Q · 20-nov 19Q · 27-nov 19Q · 4-dic 19Q
· 11-dic 14Q · 18-dic 11Q). El README de BANCO_PROPIO §4 prevé V-2 (lun 9-nov), III-5 (mar 24-nov) e II-5 (mié 25-nov). Se queda corto:
también rompen II-1 e I-3 en la semana 3 (4-5-nov), y III-8, II-11, IV-6+IV-7 más el mini-sim del 13-nov en la semana 4.

## 5. Propuesta de reposición (por tandas, según la fecha límite)

Reglas para todos los sets: `PROTOCOLO_GENERACION_PREGUNTAS.md` §3-bis (clave verificada contra clave oficial, compendio extraído o norma
con número y año) · 4 opciones · `sub_eje` del día · `fallo_previo` con la clave del sub-ángulo fallado cuando re-testee un fallo de la semana
(eso alimenta la eval del lunes y el «≥5 fallos previos» del mini-sim) · **LISTA NEGRA:** nada del examen reservado como pre-test (ni molde, ni
viñeta, ni cifra-pregunta) y ninguna `explicacion` que lo nombre (`sync_encaps_bp_web.js` y `--refrescar` lo bloquean). Las 400 preguntas
reales con clave ya están todas etiquetadas en los sets. La oferta nueva sale de (a) ítems «N-» verificados contra compendio López /
Theomed / norma, como los `set_*_1`, o (b) el banqueo QX por área (1 109Q de Cuidado Integral en el scan del 20-jul; el acceso 2027-I está
por verificar).

| Tanda | Antes de | Sets | Q mínimas |
|---|---|---|---|
| 0 | **vie 23-oct** (generar mié 28 / jue 29) | `set_cola_larga_2` (II-10 ×2) · opcional 5Q nuevas por código (III-5, II-5) para que las evals del mié 28 y jue 29 no sean re-test | 2 (+10) |
| 1 | **vie 30-oct** (sem 3: lun 2 → jue 5-nov) | `set_cola_larga_2` (II-EMG ×2 · I-OCC ×1) · `set_II-4_2` (≥1, ideal 5) · `set_II-1_1` (prenatal_emergencias ≥5 + parto_lactancia) · `set_I-3_2` (notificacion ≥6) | ≈ 15 + resto del año en tandas siguientes |
| 2 | vie 6-nov (sem 4: lun 9 → jue 12-nov) | `set_V-2_2` (clima_calidad ≥16) · `set_III-8_1` (ley_27815 ≥8, historia_clinica) · `set_II-11_1` · `set_IV-6+IV-7_1` (imryd, etica_publicacion) · cola larga III-9 · **≥2 ítems IV + 5 de II-EMG / I-OCC** para el mini-sim del 13-nov | ≈ 60 |
| 3 | vie 13-nov (sem 5: lun 16 → jue 19-nov) | `set_II-8_1` (≥5) · `set_II-3_2` (novedades_gestante) · `set_I-3_3` (historia_natural ≥16) · cola larga II-2 / III-3 · cuotas II ×4 + IV ×2 del mini-sim del 20-nov | ≈ 35 |
| 4 | vie 20-nov (sem 6: lun 23 → jue 26-nov) | `set_V-2_3` (residuos_bioseguridad) · `set_III-5_2` (medicina_tradicional) · `set_II-5_2` (mci_curso_vida) · `set_I-4_2` (rabia) · cola larga V-6 / II-6 / II-10 | ≈ 80 |
| 5-6 | vie 27-nov → vie 11-dic | `set_IV-1+IV-2_2` (tipos_estudio, lun 30-nov) · `set_II-4_3` (anemia_dx_tto, mar 1-dic) · segunda instancia de II-1 · I-3 (2-3-dic), V-2 · III-8 · II-11 · IV-6 (7-10-dic), V-MED · II-8 · II-3 · I-3 (14-17-dic), V-2 · III-5 · II-5 · I-4 (21-24-dic), IV · II-4 · II-1 (28-30-dic) + mini-sims | resto hasta ≈ 543 + 45 |

Si no hay capacidad para reponer a este ritmo, la alternativa honesta es **aceptar el re-test como norma desde la semana 4** (lo permite la cadena
de fallback de v5.14, con aviso) y bajar el mini-sim a la receta que el stock permita. Eso exige cambiar `RECETA_MINISIM` o permitir
`< 25Q` en `modoMinisim`, y es decisión de Joseph. Mientras no se decida, el mini-sim del vie 13-nov **no se genera** (el runner aborta).
