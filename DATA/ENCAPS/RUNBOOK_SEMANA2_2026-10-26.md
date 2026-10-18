> Copia en el repo del runbook del lote «semana 1 estructurada» (dom 18-oct-2026). Úsalo el vie 23 por la tarde / sáb 24 (revisión semanal) para generar los runners de la semana 2 (lun 26 → jue 29-oct) **después** del mini-sim del vie 23.

# RUNBOOK · ENCAPS semana 2 (lun 26 → jue 29-oct-2026): cómo generar los runners DESPUÉS del mini-sim del vie 23 + stock por código

> Redactado el dom 18-oct-2026 (F1, lote «semana 1 estructurada»). Todo lo numérico sale de una **simulación fiel** en copia aislada
> (fuera del repo: mismo generador, mismo pool, mismo SQL; la simulación no escribió nada en el repo). Sin reposición de stock.
> Comandos desde `D:\joseph-md-app`. Ningún paso de este documento escribe Supabase, Calendar ni Vercel salvo donde se dice
> «con OK explícito de Joseph».

## 0. Por qué se genera DESPUÉS del vie 23 (y qué hay que saber antes)

1. **La eval del lunes 26 no es «del código de ayer»**: la sesión anterior es el mini-sim (vie 23), así que `modoEval` cae en el modo
   «lunes: 5Q de fallos previos del registro, críticos primero». Lee `DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json`. Hoy el
   registro solo tiene 2 rondas (julio). Los fallos de la semana 1 **solo entran** si las rondas se apendan **con `preguntas[]`**, es decir,
   con el export del runner + `--registrar … --append`. Los cierres hechos en la app y traídos con `gen_encaps_semana.js --pull` NO traen
   `preguntas[]`, así que no aportan fallos por ítem.
2. **Limitación real del generador actual:** «fallos previos» solo casa ítems del pool que tengan el campo `fallo_previo` etiquetado (claves
   tipo `tipo_pasiva`) o que estén en un código `debil` de `resumen_por_subtema`. Hoy **solo 1 ítem libre** cumple (`R-2025-1A-Q86`, I-3,
   atributos_vpp). El resto de la eval del lunes sale de «críticos primero» (simulación: 3 × II-3 nuevos + 1 × I-3). Es decir, **hoy la eval del
   lunes NO usa los fallos del mini-sim**. El parche **P2** (§3) lo arregla.
3. **El cierre semanal puede cambiar los códigos de la semana 2.** `gen_encaps_semana.js --semana 2026-10-19` emite
   `SEMANAS/override_2026-10-26.json` y lo mezcla en `overrides_acumulado.json`. Si Joseph acepta el override, cambia
   `_encaps_mantenimiento_2027.sql`, que es lo que leen el runner y la guía. Por eso los runners se generan **después** de esa decisión.
4. Tampoco hay que correr `--semana 2026-10-19`: la semana 1 ya está entera y esa orden sobrescribiría `banco_2026-10-21/22` y `eval_2026-10-20/21/22`.

## 1. Runbook exacto (vie 23 17:10 → dom 25-oct)

**Paso 1 · Registrar la semana 1 con `preguntas[]` (PC).** Para cada runner resuelto: botón «Generar JSON», luego «Descargar .json», y después:
```
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-19.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-19.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-20.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\PRETEST_ARRANQUE_2026-10-20.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-21.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\BANCO_2026-10-21.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\EVAL_2026-10-22.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\BANCO_2026-10-22.json --append
node DATA/_scripts/gen_encaps_minisim.js --registrar <ruta>\MINISIM_2026-10-23.json --append
```
- El progreso del runner vive en el `localStorage` del navegador donde se resolvió. Si fue en el móvil (URL web), el export se descarga
  allí y se pasa al PC.
- Comprobación (deben salir las 9 rondas, cada una con su nº de preguntas):
```
node -e "const r=require('./DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json');console.log(r.rondas.filter(x=>x.fecha>='2026-10-19').map(x=>x.id+' · '+(x.preguntas||[]).length+'Q').join('\n'))"
```

**Paso 2 · Solo si algún cierre se hizo en la app.** `node DATA/_scripts/gen_encaps_semana.js --pull --dry` y luego `--pull`. Solo lee
Supabase. No duplica: usa la clave fecha + código + tipoRonda.

**Paso 3 · Cierre semanal.** `node DATA/_scripts/gen_encaps_semana.js --semana 2026-10-19`. Produce `SEMANAS/semana_2026-10-19.md`,
`override_2026-10-26.json` (propuesta), `resumen_por_subtema` y `PERFIL_CONOCIMIENTO.md`.

**Paso 4 · Decisión sobre el override de la semana del 26-oct** (la toma Joseph):
- **(a) Sin override** (por defecto): no se toca nada.
- **(b) Con override:** se corre la línea EXACTA que imprime el cierre: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-10-19 --override …
  --hasta 2026-12-30`. Supabase se actualiza con `execute_sql` **solo con OK explícito de Joseph**. Después se corren
  `node DATA/_scripts/gen_encaps_guia.js` y las 4 verificaciones v6.02. Recién entonces se pasa al paso 6.

**Paso 5 · Parches P1 + P2: YA APLICADOS el dom 18-oct-2026 (commit del lote «semana 1»)** en `DATA/_scripts/gen_encaps_minisim.js`: (P1) el relleno ya no toma ítems de mini-sims futuros; (P2) la eval del lunes usa de verdad los fallos registrados con `preguntas[]`. No hay que hacer nada aquí.

**Paso 6 · Generar (el orden importa):**
```
node DATA/_scripts/gen_encaps_minisim.js --semana 2026-10-26 --dry     # solo informa: revisar avisos
node DATA/_scripts/gen_encaps_minisim.js --semana 2026-10-26           # banco_26..29 + eval_27..29; vie 30 = «minisim ya existe» (no se toca)
node DATA/_scripts/gen_encaps_minisim.js --eval 2026-10-26             # eval del LUNES, DESPUÉS de los bancos
```
- `--semana` NO genera la eval del lunes (solo hace mar-jue). Si `--eval 2026-10-26` va **antes**, se come 5 críticos y deja el banco
  II-5 del lunes en 18Q (en vez de 20) y el de II-4 con 2Q de fallback (en vez de 1). Simulado en los dos órdenes.
- Si después hay que repetir `--semana 2026-10-26`: primero borrar `eval_2026-10-26.json/.html` (si no, sus ids cuentan como usados y los
  bancos cambian) y repetir la `--eval` al final.
- `minisim_2026-10-30` NO se regenera salvo que la reposición traiga ítems nuevos con `fallo_previo` de la semana 1 (receta: ≥5 fallos
  previos; hoy tiene 5). En ese caso, `node DATA/_scripts/gen_encaps_minisim.js 2026-10-30` sobrescribe solo ese fichero.

**Paso 7 · Publicar y comprobar:**
```
node DATA/_scripts/gen_encaps_minisim.js --refrescar --dry    # debe decir «al día» en todas (guarda LISTA NEGRA)
node DATA/_scripts/sync_encaps_bp_web.js && node DATA/_scripts/sync_encaps_bp_web.js --check
node DATA/_scripts/gen_encaps_guia.js && node DATA/_scripts/gen_encaps_guia.js --check
node DATA/_scripts/gen_encaps_minisim.js --inventario
npx tsc --noEmit
```
Commit y deploy los hace Joseph o el orquestador (ningún agente).

## 2. Qué debe salir (simulación con el stock actual, sin tanda 0)

| Día | Runner | Contenido | Observación |
|---|---|---|---|
| lun 26 | `eval_2026-10-26` | 5Q: 1 I-3 con `fallo_previo` + 4 críticos (3 II-3 nuevos + 1 I-3) | Con P2 y la ronda del mini-sim registrada entran ítems libres de los códigos fallados (en la prueba, 1 V-2; el resto ya lo consumen los bancos) |
| lun 26 | `banco_2026-10-26` | II-5 · nts_adolescente: **20Q** (9 del sub-eje + 11 mci_curso_vida) + **II-10 2Q** | II-5 queda en **0**; secundario 2/4 |
| mar 27 | `eval_2026-10-27` | II-5: **5/5 re-test** (fallback paso 1) | Sin P1: 1 ítem es de `minisim_2026-10-30` (BP-0034) → spoiler |
| mar 27 | `banco_2026-10-27` | I-4 · dengue: **16Q** + I-5+I-6 4Q | I-4 queda en **0** |
| mié 28 | `eval_2026-10-28` | I-4: **5/5 re-test** | — |
| mié 28 | `banco_2026-10-28` | IV-1 · metodo_cientifico: **18Q** + **II-EMG 2Q** | IV-1+IV-2 queda en **0**; secundario 2/4 |
| jue 29 | `eval_2026-10-29` | IV-1: **5/5 re-test** | Sin P1: BP-0049 es de `minisim_2026-10-30` → spoiler |
| jue 29 | `banco_2026-10-29` | II-4 · suplementacion_cifras: **16Q** (15 + 1 fallback) + **I-OCC 3Q** | II-4 queda en **0**; sin P1, el fallback es BP-0035 de `minisim_2026-10-30` |
| vie 30 | `minisim_2026-10-30` | ya armado (V-6 + II-6), 25Q | No se toca |

Las evals de mar-jue salen siempre en re-test porque el banco del día anterior consume **todo** el pool libre del código. Así está
diseñado el fallback de v5.14. Repiten ítems vistos 1-8 días antes: banco de ayer, pre-test del 20 y mini-sim del 23.

## 3. Defectos encontrados en el generador y parches (APLICADOS al repo el dom 18-oct-2026 en `DATA/_scripts/gen_encaps_minisim.js`)

- **P1 · spoiler (bug).** `completarConFallback` re-testea cualquier id «usado», también los de salidas **futuras** ya armadas
  (`minisim_2026-10-30`, `minisim_2026-11-06`). En la semana 2 lo hacen 3 ítems: BP-0034 (eval mar 27), BP-0049 (eval jue 29) y
  BP-0035 (banco jue 29). Joseph los vería 1-3 días antes del mini-sim. El parche excluye del fallback los ids de salidas con fecha ≥ la
  sesión (salvo las que `--semana` va a regenerar). Simulado: **3 → 0** ítems de salidas futuras, sin cambiar nada más.
  Aplicado (junto con P2) en `DATA/_scripts/gen_encaps_minisim.js`.
- **P2 · la eval del lunes usa los fallos (mejora).** Después de los ítems con `fallo_previo`, prioriza ítems libres del mismo
  código + sub-eje y luego del mismo código que los fallos de los 7 días previos. Cuenta como fallo `ok:false` y también el acierto no ciego
  (`acierto_por_suerte`). Máximo 2 por código. Los críticos quedan solo de relleno, y `_meta.modo` deja constancia (p. ej. «P2: V-2×3
  IV-1+IV-2×2 …»). Probado con una ronda sintética en la copia: funciona. Pero con el stock actual los códigos fallados ya los vació el banco
  del día, así que el efecto real llega con la reposición. Aplicado en `DATA/_scripts/gen_encaps_minisim.js` (+41/−5 líneas; `node --check` OK; `--refrescar --dry` → 0 salidas por refrescar).
- Observación, sin parche: **15 de los 25 ítems de `minisim_2026-10-23`** (y 13 de `minisim_2026-10-30`) son ítems **espejo** (mismo
  molde 2024-2A→2025-2) de reales que Joseph ve de lun a jue en evals, pre-test o bancos. Es el diseño de `banco_items_v1`, pero infla la nota
  /25. Si molesta: excluir en `armarSet` los espejos cuyo molde se usó en los 7 días previos (lo decide Joseph).

## 4. Stock por código (pool 434 · libres hoy 249 · tras la semana 2 simulada 164)

Demanda mínima: 16Q por banco (eval en re-test) · 4Q por secundario · 3Q por código de cola larga del viernes. «Generar a más tardar» = viernes
anterior a la semana del primer quiebre (regla del README: pre-generar el viernes anterior).

| Código | Libres hoy | Tras sem 2 | 1.er quiebre (sin reponer) | Faltan (mín.) hasta el 30-dic | Tener el set listo antes de |
|---|---|---|---|---|---|
| II-10 (sec) | 2 | 0 | **lun 26-oct** (2/4) | 8 + 2 ya | **sáb 24-oct** (tanda 0) |
| II-EMG (sec/CL) | 2 | 0 | **mié 28-oct** (2/4) | 11 + 2 ya | **sáb 24-oct** (tanda 0) |
| I-OCC (sec/CL) | 3 | 0 | **jue 29-oct** (3/4) | 11 + 1 ya | **sáb 24-oct** (tanda 0) |
| II-4 | 15 | 0 | **jue 29-oct** (1Q fallback) · jue 26-nov 16Q | 32 | sáb 24-oct (5) · vie 20-nov (resto) |
| II-1 | 11 | 11 | **lun 2-nov** prenatal_emergencias | 37 | **vie 30-oct** |
| I-3 | 10 | 8 | **mar 3-nov** notificacion | 72 | **vie 30-oct** |
| V-2 | 1 | 1 | **mié 4-nov** clima_calidad | 79 | **vie 30-oct** |
| III-8 | 8 | 8 | **jue 5-nov** ley_27815 | 24 | **vie 30-oct** |
| II-11 | 5 | 5 | lun 9-nov prep_dual_ptmi | 27 | vie 6-nov |
| IV-6+IV-7 | 6 | 6 | mar 10-nov imryd | 26 | vie 6-nov |
| III-9 (sec/CL) | 2 | 2 | mar 10-nov | 9 | vie 6-nov |
| II-8 | 11 | 11 | jue 12-nov paquetes_tamizaje | 21 | vie 6-nov |
| **mini-sim vie 13-nov** | — | — | **NO se puede armar** (23Q: falta cuota IV ×2; el generador aborta < 25Q) | IV ≥ 2 + cola II-EMG/I-OCC | vie 6-nov |
| II-3 | 15 | 12 | lun 16-nov novedades_gestante | 20 | vie 13-nov |
| II-2 (sec/CL) | 2 | 2 | mar 17-nov | 9 | vie 13-nov |
| III-5 | 0 | 0 | jue 19-nov medicina_tradicional | 32 | vie 13-nov |
| V-6 (sec) | 3 | 3 | jue 19-nov | 5 | vie 13-nov |
| III-3 (sec/CL) | 4 | 4 | vie 20-nov | 11 | vie 13-nov |
| II-5 | 20 | 0 | lun 23-nov mci_curso_vida | 32 | vie 20-nov |
| I-4 | 16 | 0 | mar 24-nov rabia | 32 | vie 20-nov |
| IV-1+IV-2 | 18 | 0 | mié 25-nov tipos_estudio | 32 | vie 20-nov |
| II-6 · II-10 · I-5+I-6 (sec) | 0 · 2 · 4 | 0 · 0 · 0 | 23 / 24 / 25-nov | 8 c/u | vie 20-nov |
| I-11+I-12 · V-1 · III-1 (sec/CL) | 7 · 8 · 4 | igual | 2 / 3 / 4-dic | 4 · 3 · 7 | vie 27-nov |
| V-MED | 22 | 22 | mié 9-dic esenciales_sismed | 10 | vie 4-dic |
| V-3 · II-9 (sec) | 7 · 4 | igual | 7 / 10-dic | 4 · 7 | vie 4-dic |
| II-7 · I-10 · I-1 (sec/CL) | 8 · 7 · 8 | igual | 14 / 17 / 18-dic | 3 · 1 · 3 | vie 11-dic |

**Total mínimo hasta el 30-dic ≈ 588Q** + ~117Q de cuotas de área para los 6 mini-sims del 13-nov al 18-dic. Si cada eval de mar-jue
tiene que salir con ítems nuevos (20 + 5 por banco), son ≈ 938Q. Sin reponer, desde el **lun 16-nov todos los bancos son ≥ 14/16 re-test**
y **ningún mini-sim desde el vie 13-nov llega a 25Q** (13-nov 23Q · 20-nov 19Q · 27-nov 17Q · 4-dic 13Q · 11-dic 9Q · 18-dic 6Q).
El README de BANCO_PROPIO §4 solo prevé V-2 (4-nov), III-5 (19-nov) e II-5 (23-nov). Se queda corto: también rompen II-1, I-3 y III-8
en la semana 3, y II-11, IV-6+IV-7 y II-8 más el mini-sim del 13-nov en la semana 4.

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
| 0 | **sáb 24-oct** (generar sem 2) | `set_cola_larga_2` (II-10 ×3 · II-EMG ×3 · I-OCC ×2) · opcional `set_II-4_2` ×5 · opcional 5Q nuevas por código (II-5, I-4, IV-1+IV-2) para que las evals de mar-jue no sean re-test | 8 (+5 +15) |
| 1 | **vie 30-oct** (sem 3) | `set_II-1_1` (prenatal_emergencias ≥16 + parto_lactancia) · `set_I-3_2` (notificacion ≥16) · `set_V-2_2` (clima_calidad ≥16) · `set_III-8_1` (ley_27815 ≥8, historia_clinica) | ≈ 56 + resto del año en tandas siguientes |
| 2 | vie 6-nov (sem 4) | `set_II-11_1` · `set_IV-6+IV-7_1` (imryd, etica_publicacion) · `set_II-8_1` · cola larga III-9 / II-EMG / I-OCC · **≥4 ítems IV** para el mini-sim del 13-nov | ≈ 60 |
| 3 | vie 13-nov (sem 5) | `set_II-3_2` (novedades_gestante) · `set_I-3_3` (historia_natural) · `set_V-2_3` (residuos_bioseguridad) · `set_III-5_2` (medicina_tradicional) · cola larga II-2 / V-6 / III-3 | ≈ 80 |
| 4 | vie 20-nov (sem 6) | `set_II-5_2` (mci_curso_vida) · `set_I-4_2` (rabia) · `set_IV-1+IV-2_2` (tipos_estudio) · `set_II-4_3` (anemia_dx_tto) · cola larga II-6 / II-10 / I-5+I-6 | ≈ 88 |
| 5-6 | vie 27-nov → vie 11-dic | segunda instancia de II-1 · I-3 · V-2 · III-8 (30-nov → 3-dic), II-11 · IV-6 · V-MED · II-8 (7-10-dic), II-3 · I-3 · V-2 · III-5 (14-17-dic), II-5 · I-4 · IV · II-4 (21-24-dic), II-1 · I-3 · V-2 (28-30-dic) + mini-sims | resto hasta ≈ 588 + 117 |

Si no hay capacidad para reponer a este ritmo, la alternativa honesta es **aceptar el re-test como norma desde la semana 4** (lo permite la cadena
de fallback de v5.14, con aviso) y bajar el mini-sim a la receta que el stock permita. Eso exige cambiar `RECETA_MINISIM` o permitir
`< 25Q` en `modoMinisim`, y es decisión de Joseph. Mientras no se decida, el mini-sim del vie 13-nov **no se genera** (el runner aborta).
