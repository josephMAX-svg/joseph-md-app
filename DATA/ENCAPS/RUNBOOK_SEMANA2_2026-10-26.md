> ⚠ **v6.05 (sáb 24-oct-2026 · orden de Joseph «todo inicia el lunes 26; corre lo que falta, alarga los plazos, no quites temas»):** la semana
> del 19 no se estudió (ni el D1 del mié 21, ni su alias del jue 22, ni el mini-sim del vie 23) → **D1 = lun 26-oct**. La corrida por alias de la
> v6.04a (jue 22 = plan del mié 21 … mini-sim el dom 25) **queda sin efecto**: Supabase, el SQL y los runners se re-fecharon el 24-oct POR SESIÓN
> (ítems intactos, `_meta.realineado`). El nombre del fichero (`…_2026-10-26`) se conserva para no romper las remisiones de otros documentos:
> **la «semana 2» de este runbook es ahora la del lun 2-nov**.
> - **Semana 1** (lun 26 → vie 30-oct, **ENTERA ARMADA**): **lun 26** D1 = `EVAL_2026-10-26` (fallos previos) + `PRETEST_ARRANQUE_2026-10-26`
>   (parte 1) · **mar 27** D2 = `EVAL_2026-10-27` (II-3) + `PRETEST_ARRANQUE_2026-10-27` (parte 2) · **mié 28** D3 = `EVAL_2026-10-28` (I-3) +
>   `BANCO_2026-10-28` (V-2 · planeamiento + V-6) · **jue 29** D4 = `EVAL_2026-10-29` (V-2) + `BANCO_2026-10-29` (III-5 · pertinencia_barreras +
>   II-6) · **vie 30** D5 = `MINISIM_2026-10-30` (II-2 + I-10). Sáb 31 y dom 1 libres.
> - **Semana 2** (lun 2 → vie 6-nov): **lun 2** D6 II-5 · **mar 3** D7 I-4 · **mié 4** D8 IV-1 · **jue 5** D9 II-4 → **POR GENERAR** (este runbook,
>   entera con `--semana 2026-11-02` + `--eval 2026-11-02`) · **vie 6** D10 = `MINISIM_2026-11-06` (V-6 + II-6, ya armado). También está armado
>   `MINISIM_2026-11-13` (II-10 + I-5+I-6, D15).
> - *(Histórico. v6.04, 21-oct: semana corrida por alias, este runbook se corría el dom 25 tras el mini-sim. v6.03, 20-oct: D1 = mié 21-oct, la
>   semana 2 era lun 26 → jue 29 con el lun 26 y el mar 27 ya armados y el mié 28 / jue 29 generados día a día. v6.02, 18-oct: semana 2 = lun 26
>   II-5 → jue 29 II-4 con `--semana 2026-10-26`.)*

# RUNBOOK · ENCAPS semana 2 (lun 2 → jue 5-nov-2026): cómo generar los runners de la semana DESPUÉS del mini-sim del vie 30-oct + stock por código

> Redactado el dom 18-oct-2026 (F1, lote «semana 1 estructurada»), re-fechado el mar 20-oct (v6.03) y otra vez el sáb 24-oct-2026 (v6.05). Todo
> lo numérico sale de una **simulación fiel** en copia aislada (fuera del repo: mismo generador, mismo pool, mismo SQL v6.05; la simulación no
> escribió nada en el repo), en el orden que se pide aquí (`--semana 2026-11-02` y después `--eval 2026-11-02`; las semanas siguientes igual). Sin
> reposición de stock y sin rondas registradas de la semana 1. Comandos desde `D:\joseph-md-app`. Ningún paso de este documento escribe Supabase,
> Calendar ni Vercel salvo donde se dice «con OK explícito de Joseph».

## 0. Por qué se genera DESPUÉS del vie 30 (y qué hay que saber antes)

1. **La eval del lunes 2-nov es la de «lunes»: 5Q de fallos previos del registro (+ P2).** `--semana` NO arma la eval del lunes (solo mar-jue):
   se genera aparte con `--eval 2026-11-02`, **después** de registrar la semana 1, para que tome los fallos reales del pre-test, las evals, los
   bancos y el mini-sim del vie 30.
2. **Los fallos de la semana 1 solo entran si las rondas se apendan con `preguntas[]`**, es decir, con el export del runner + `--registrar …
   --append`. Los cierres hechos en la app y traídos con `gen_encaps_semana.js --pull` NO traen `preguntas[]`, así que no aportan fallos por
   ítem (ni a P2 ni al «≥5 fallos previos» del mini-sim).
3. **El cierre semanal puede cambiar los códigos de la semana 2.** `gen_encaps_semana.js --semana 2026-10-26` emite
   `SEMANAS/override_2026-11-02.json` y lo mezcla en `overrides_acumulado.json`. Si Joseph acepta el override, cambia
   `_encaps_mantenimiento_2027.sql`, que es lo que leen el runner y la guía. II-5 (lun 2), I-4 (mar 3), IV-1 (mié 4) e II-4 (jue 5) pueden
   cambiar (I-3 y V-2 son intocables y no caen esa semana). Por eso los runners de la semana 2 se generan **después** de esa decisión.
4. **No correr `--semana 2026-10-26`.** Re-sortearía `banco_2026-10-28`, `banco_2026-10-29`, `eval_2026-10-27/28/29`, ya armados y re-fechados
   (es determinista por fecha, pero la semilla depende de la fecha nueva: saldrían OTROS ítems). La semana 2 no tiene ningún runner, así que
   `--semana 2026-11-02` es seguro.

## 1. Runbook exacto (vie 30-oct 17:15, tras el mini-sim → a más tardar el lun 2-nov antes de las 16:15)

**Paso 1 · Registrar la semana 1 con `preguntas[]` (PC).** Para cada runner resuelto: botón «Generar JSON», luego «Descargar .json», y después:
```
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-26.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-26.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-27.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-27.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-28.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\BANCO_2026-10-28.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-29.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\BANCO_2026-10-29.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\MINISIM_2026-10-30.json --append
```
- El progreso del runner vive en el `localStorage` del navegador donde se resolvió. Si fue en el móvil (URL web), el export se descarga
  allí y se pasa al PC.
- Comprobación (deben salir las 9 rondas, cada una con su nº de preguntas):
```
node -e "const r=require('./DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json');console.log(r.rondas.filter(x=>x.fecha>='2026-10-26').map(x=>x.id+' · '+(x.preguntas||[]).length+'Q').join('\n'))"
```

**Paso 2 · Solo si algún cierre se hizo en la app.** `node DATA/_scripts/gen_encaps_semana.js --pull --dry` y luego `--pull`. Solo lee
Supabase. No duplica: usa la clave fecha + código + tipoRonda.

**Paso 3 · Cierre semanal.** `node DATA/_scripts/gen_encaps_semana.js --semana 2026-10-26` (lun 26 → vie 30). Produce
`SEMANAS/semana_2026-10-26.md`, `override_2026-11-02.json` (propuesta), `resumen_por_subtema` y `PERFIL_CONOCIMIENTO.md`. Es el primer cierre con
n = 5 por crítico (el pre-test de arranque entero cae en esta semana).

**Paso 4 · Decisión sobre el override de la semana del 2-nov** (la toma Joseph):
- **(a) Sin override** (por defecto): no se toca nada.
- **(b) Con override:** se corre la línea EXACTA que imprime el cierre: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-10-26 --hasta
  2026-12-30 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_2026-11-02.json`. Supabase se actualiza con `execute_sql` **solo con OK
  explícito de Joseph**. Después se corren `node DATA/_scripts/gen_encaps_guia.js` y las verificaciones. Recién entonces se pasa al paso 6.

**Paso 5 · Parches P1 + P2: YA APLICADOS el dom 18-oct-2026** en `DATA/_scripts/gen_encaps_minisim.js`: (P1) el relleno ya no toma ítems de
mini-sims futuros; (P2) la eval del lunes usa de verdad los fallos registrados con `preguntas[]`. No hay que hacer nada aquí.

**Paso 6 · Generar la semana 2 (el orden importa: `--semana` primero, la eval del lunes después):**
```
node DATA/_scripts/gen_encaps_minisim.js --semana 2026-11-02 --dry   # solo informa: revisar avisos
node DATA/_scripts/gen_encaps_minisim.js --semana 2026-11-02         # lun banco II-5 · mar-jue eval → banco (I-4 · IV-1 · II-4); el vie 6 ya existe
node DATA/_scripts/gen_encaps_minisim.js --eval 2026-11-02           # eval del LUNES: 5Q de fallos previos del registro (+ P2)
```
- Es el orden que se simuló (§2). Si se invierte (eval del lunes antes que `--semana`), la eval del lunes puede tomar ítems libres de II-4 y el
  banco del jue 5 sale con 13 libres + 3 re-test en vez de 15 + 1.
- Si hay que repetir un día: `--banco <fecha>` / `--eval <fecha>` sobrescriben su propio fichero (sus ids no cuentan como usados mientras
  se regeneran).
- `minisim_2026-11-06` NO se regenera salvo que la reposición traiga ítems nuevos con `fallo_previo` de la semana 1 (receta: ≥5 fallos
  previos). En ese caso, `node DATA/_scripts/gen_encaps_minisim.js 2026-11-06` sobrescribe solo ese fichero.

**Paso 7 · Publicar y comprobar:**
```
node DATA/_scripts/gen_encaps_minisim.js --refrescar --dry    # debe decir «al día» en todas (guarda LISTA NEGRA)
node DATA/_scripts/sync_encaps_bp_web.js && node DATA/_scripts/sync_encaps_bp_web.js --check
node DATA/_scripts/gen_encaps_guia.js && node DATA/_scripts/gen_encaps_guia.js --check
node DATA/_scripts/gen_encaps_minisim.js --inventario
npx tsc --noEmit -p .
```
Commit y deploy los hace Joseph o el orquestador (ningún agente).

## 2. Qué debe salir (simulación del 24-oct con el stock actual, sin tanda 0)

| Día | Runner | Contenido | Observación |
|---|---|---|---|
| lun 2 | `banco_2026-11-02` | II-5 · nts_adolescente **20Q** (9 del sub-eje + 11 mci_curso_vida) + **II-10 2Q** | II-5 queda en **0**; secundario 2/4 |
| lun 2 | `eval_2026-11-02` | «lunes»: 5Q de fallos previos del registro (críticos primero; con P2 si la semana 1 se registró con `preguntas[]`) | se genera DESPUÉS de `--semana` |
| mar 3 | `eval_2026-11-03` | II-5: **5/5 re-test** (fallback paso 1: reales de II-5 ya usados) | el banco del lun 2 consume todo el pool libre de II-5 |
| mar 3 | `banco_2026-11-03` | I-4 · dengue **16Q** (8 dengue + 3 malaria_zoonosis + 3 rabia + 2 epp) + **I-5+I-6 4Q** | I-4 queda en **0** |
| mié 4 | `eval_2026-11-04` | I-4: **5/5 re-test** | — |
| mié 4 | `banco_2026-11-04` | IV-1 · metodo_cientifico **18Q** (6 + 5 tipos_estudio + 4 instrumentos + 3 muestreo) + **II-EMG 2Q** | IV-1+IV-2 queda en **0**; secundario 2/4 |
| jue 5 | `eval_2026-11-05` | IV-1: **5/5 re-test** | — |
| jue 5 | `banco_2026-11-05` | II-4 · suplementacion_cifras **16Q** (15 libres + 1 re-test) + **I-OCC 3Q** | II-4 queda en **0**; secundario 3/4 |
| vie 6 | `minisim_2026-11-06` | ya armado (V-6 + II-6), 25Q | No se toca |

- **P1 comprobado en la simulación:** 0 ítems de `minisim_2026-11-06` / `minisim_2026-11-13` en las 8 salidas nuevas.
- Las evals de mar-jue salen en re-test porque el banco del día anterior consume **todo** el pool libre del código. Así está diseñado el
  fallback de v5.14. Repiten ítems vistos 1-7 días antes (banco de ayer, pre-test del 26/27).
- La guía de la app (`src/lib/encapsGuia.ts`, catálogo `PREVISTO_SEMANA2`) ya muestra estas cifras para el 2-5 nov mientras los runners no existan.

## 3. Defectos encontrados en el generador y parches (APLICADOS al repo el dom 18-oct-2026 en `DATA/_scripts/gen_encaps_minisim.js`)

- **P1 · spoiler (bug).** `completarConFallback` re-testeaba cualquier id «usado», también los de salidas **futuras** ya armadas
  (`minisim_2026-11-06`, `minisim_2026-11-13`): Joseph los habría visto 1-3 días antes del mini-sim. El parche excluye del fallback los ids de
  salidas con fecha ≥ la sesión (salvo las que `--semana` va a regenerar). Simulado el 18-oct (v6.02): **3 → 0**; el 20-oct (v6.03) y el 24-oct
  (v6.05): **0**.
- **P2 · la eval del lunes usa los fallos (mejora).** Después de los ítems con `fallo_previo`, prioriza ítems libres del mismo
  código + sub-eje y luego del mismo código que los fallos de los 7 días previos. Cuenta como fallo `ok:false` y también el acierto no ciego
  (`acierto_por_suerte`). Máximo 2 por código. Los críticos quedan solo de relleno, y `_meta.modo` deja constancia (p. ej. «P2: V-2×3
  IV-1+IV-2×2 …»). En v6.05 actúa en la eval del lun 2-nov (§1, paso 6).
- Observación, sin parche: parte de los ítems de `minisim_2026-10-30` y `minisim_2026-11-06` son ítems **espejo** (mismo molde 2024-2A→2025-2) de
  reales que Joseph ve en los días previos (pre-test, evals, bancos). Es el diseño de `banco_items_v1`, pero infla la nota /25. Si molesta:
  excluir en `armarSet` los espejos cuyo molde se usó en los 7 días previos (lo decide Joseph).

## 4. Stock por código (pool 434 · libres hoy 249 · tras la semana 2 simulada 164)

Demanda mínima: 16Q por banco (eval en re-test) · 4Q por secundario · 3Q por código de cola larga del viernes. «Faltan» = demanda mínima de
las sesiones F1 aún sin runner (desde el lun 2-nov; viernes desde el 20-nov) − libres hoy. «1.er quiebre» = primera sesión de la simulación
(semana a semana, sin reponer) en la que el código no llega a su mínimo y tira de re-test / fallback. «Tener el set listo antes de» = viernes
anterior a la semana del quiebre (regla del README: pre-generar el viernes anterior). Con el D1 en lunes, cada sesión lun-jue cae **2 slots
lun-jue más tarde** que en la v6.03 y cada mini-sim **una semana más tarde**.

| Código | Libres hoy | Tras sem 2 | 1.er quiebre (sin reponer) | Faltan (mín.) hasta el 30-dic | Tener el set listo antes de |
|---|---|---|---|---|---|
| II-10 (sec) | 2 | 0 | **lun 2-nov** (2/4) | 10 | **vie 30-oct** (tanda 0) |
| II-EMG (sec/CL) | 2 | 0 | **mié 4-nov** (2/4) | 9 | **vie 30-oct** (tanda 0) |
| I-OCC (sec/CL) | 3 | 0 | **jue 5-nov** (3/4) | 8 | **vie 30-oct** (tanda 0) |
| II-4 | 15 | 0 | **jue 5-nov** suplementacion_cifras (15 + 1 re-test) · jue 3-dic 16Q re-test | 17 | vie 30-oct (1) · vie 27-nov (resto) |
| II-1 | 11 | 11 | **lun 9-nov** prenatal_emergencias (11 + 5 fallback) | 21 | **vie 6-nov** |
| I-3 | 10 | 9 | **mar 10-nov** notificacion (9 + 7 re-test) | 54 | **vie 6-nov** |
| V-2 | 1 | 1 | **mié 11-nov** clima_calidad (1 + 15 re-test) | 63 | **vie 6-nov** |
| III-8 | 8 | 8 | **jue 12-nov** ley_27815 (8 + 8 fallback) | 24 | **vie 6-nov** |
| II-11 | 5 | 5 | lun 16-nov prep_dual_ptmi (5 + 11 fallback) | 27 | vie 13-nov |
| III-1 (sec) | 4 | 4 | lun 16-nov (3/4; el fallback de área III del jue 12 se lleva 1) | 7 | vie 13-nov |
| IV-6+IV-7 | 6 | 6 | mar 17-nov imryd (6 + 10 fallback) | 26 | vie 13-nov |
| III-9 (sec/CL) | 2 | 2 | mar 17-nov (2/4) | 9 | vie 13-nov |
| II-8 | 11 | 11 | jue 19-nov paquetes_tamizaje (11 + 5 fallback) | 21 | vie 13-nov |
| **mini-sim vie 20-nov** | — | — | **NO se puede armar** (22Q: IV 0/2 y cola larga II-EMG + I-OCC 0/5; el generador aborta < 25Q) | IV ≥ 2 + cola II-EMG/I-OCC | **vie 13-nov** |
| II-3 | 15 | 11 | lun 23-nov novedades_gestante (1 + 15: el pool libre de II-3 lo gastan antes la eval del lunes y el fallback de área II de II-1 / II-11 / II-8) | 17 | vie 20-nov (mejor vie 6-nov, antes del primer fallback de área II) |
| II-2 (sec/CL) | 2 | 2 | mar 24-nov (2/4) | 6 | vie 20-nov |
| III-5 | 0 | 0 | jue 26-nov medicina_tradicional (0 + 16 re-test) | 32 | vie 20-nov |
| V-6 (sec) | 3 | 3 | jue 26-nov (3/4) | 5 | vie 20-nov |
| III-3 (sec/CL) | 4 | 4 | vie 27-nov (mini-sim: 2/5 de III-3 + I-11+I-12) · mar 8-dic (0/4) | 7 | vie 20-nov |
| II-5 | 20 | 0 | lun 30-nov mci_curso_vida (0 + 16 re-test) | 28 | vie 27-nov |
| II-6 · I-5+I-6 (sec) | 0 · 4 | 0 · 0 | lun 30-nov · mié 2-dic (0/4) | 8 · 4 | vie 27-nov |
| I-4 | 16 | 0 | mar 1-dic rabia (0 + 16 re-test) | 32 | vie 27-nov |
| IV-1+IV-2 | 18 | 0 | mié 4-nov metodo_cientifico sale con 18Q y lo deja en 0 → **mié 2-dic** tipos_estudio | 30 | vie 27-nov |
| I-11+I-12 · V-1 · V-3 (sec/CL) | 7 · 8 · 7 | igual | 9 / 10 / 14-dic | 4 · 3 · 4 | vie 4-dic · vie 4-dic · vie 11-dic |
| V-MED | 22 | 22 | mié 16-dic esenciales_sismed (el mié 18-nov sale con 20Q y deja 2) | 10 | vie 11-dic |
| II-9 · II-7 · I-1 · I-10 (sec/CL) | 4 · 8 · 8 · 7 | igual | 17 / 21 / 22 / 24-dic | 7 · 3 · 0 · 1 | vie 11-dic · vie 18-dic · vie 18-dic · vie 18-dic |

**Total mínimo hasta el 30-dic ≈ 497Q** (con la misma cuenta daba ≈ 543Q con la F1 v6.03: los −46Q son las 3 sesiones que salen de la F1 —II-4
plan_multisectorial #3 + I-5+I-6, II-1 prenatal_emergencias #3 + II-EMG y el mini-sim I-1 + II-2— y pasan al carril B de la intensiva, lun 8,
mar 9 y mié 10-mar-2027: la demanda no desaparece, se mueve a marzo) + **≈52Q** para que los 5 mini-sims del 20-nov al 18-dic lleguen a 25Q.
Sin reponer, desde el **lun 23-nov todos los bancos son 16/16 re-test** y **ningún mini-sim desde el vie 20-nov llega a 25Q** (20-nov 22Q ·
27-nov 17Q · 4-dic 16Q · 11-dic 11Q · 18-dic 7Q). Los mini-sims del vie 30-oct, 6-nov y 13-nov ya están armados (25Q). El README de BANCO_PROPIO
§4 prevé V-2 (mié 11-nov), III-5 (jue 26-nov) e II-5 (lun 30-nov). Se queda corto: también rompen II-1 e I-3 en la semana 3 (9-10-nov), III-8
en la misma semana, y II-11, IV-6+IV-7, II-8 más el mini-sim del 20-nov en la semana 4.

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
| 0 | **vie 30-oct** (semana 2: lun 2 → jue 5-nov) | `set_cola_larga_2` (II-10 ×2 · II-EMG ×2 · I-OCC ×1) · `set_II-4_2` (≥1, ideal 5) · opcional 5Q nuevas por código (II-5, I-4, IV-1) para que las evals de mar-jue no sean re-test | ≈ 6 (+15) |
| 1 | **vie 6-nov** (sem 3: lun 9 → jue 12-nov) | `set_II-1_1` (prenatal_emergencias ≥5 + parto_lactancia) · `set_I-3_2` (notificacion ≥7) · `set_V-2_2` (clima_calidad ≥15) · `set_III-8_1` (ley_27815 ≥8, historia_clinica) · opcional `set_II-3_2` para que el fallback de área II no gaste su pool | ≈ 35 + resto del año en tandas siguientes |
| 2 | vie 13-nov (sem 4: lun 16 → jue 19-nov) | `set_II-11_1` · `set_IV-6+IV-7_1` (imryd, etica_publicacion) · `set_II-8_1` (≥5) · cola larga III-1 / III-9 · **≥2 ítems IV + 5 de II-EMG / I-OCC** para el mini-sim del 20-nov | ≈ 40 |
| 3 | vie 20-nov (sem 5: lun 23 → jue 26-nov) | `set_II-3_2` (novedades_gestante) · `set_I-3_3` (historia_natural ≥16) · `set_V-2_3` (residuos_bioseguridad) · `set_III-5_2` (medicina_tradicional) · cola larga II-2 / V-6 / III-3 · cuotas II ×4 + IV ×2 del mini-sim del 27-nov | ≈ 80 |
| 4 | vie 27-nov (sem 6: lun 30-nov → jue 3-dic) | `set_II-5_2` (mci_curso_vida) · `set_I-4_2` (rabia) · `set_IV-1+IV-2_2` (tipos_estudio) · `set_II-4_3` (anemia_dx_tto) · cola larga II-6 / II-10 / I-5+I-6 / II-EMG | ≈ 75 |
| 5-6 | vie 4-dic → vie 18-dic | segunda instancia de II-1 · I-3 · V-2 · III-8 (7-10-dic), II-11 · IV-6 · V-MED · II-8 (14-17-dic), II-3 · I-3 · V-2 · III-5 (21-24-dic), II-5 · I-4 · IV-1 (28-30-dic) + cola larga de los viernes + mini-sims | resto hasta ≈ 497 + 52 |

Si no hay capacidad para reponer a este ritmo, la alternativa honesta es **aceptar el re-test como norma desde la semana 4** (lo permite la cadena
de fallback de v5.14, con aviso) y bajar el mini-sim a la receta que el stock permita. Eso exige cambiar `RECETA_MINISIM` o permitir
`< 25Q` en `modoMinisim`, y es decisión de Joseph. Mientras no se decida, el mini-sim del vie 20-nov **no se genera** (el runner aborta).
