# MIR · POOL_USO — cómo consume cada segmento el pool oficial (anti-repetición por `qIds`)

**Fuente en la app:** [`src/lib/mirPreguntasOficiales.ts`](../../src/lib/mirPreguntasOficiales.ts) (GENERADO por `node DATA/_scripts/gen_mir_pool.js --emit`; 1.050 preguntas oficiales MIR 2022-2026, 1.025 con clave definitiva, 124 con imagen; ≈1,1 MB). Pipeline y datos: [`pool/README.md`](pool/README.md). Estado: `MIR_POOL_META.estado` = `v1 · 13-sep-2026 · 1050 preguntas · clasificación LLM con muestra verificada …`.

Palmerton, *"questions as the curriculum"*: el MIR recicla conceptos año tras año, así que **cada pregunta oficial se hace UNA sola vez** en la 1ª vuelta + banqueo, se registra qué ids se han consumido y ninguna viñeta se inventa: las viñetas APEX y las explicaciones de Claude citan el `id` de la pregunta oficial de la que derivan (regla anti-alucinación: verificar contra fuente real).

## 1. El contrato (tres piezas)

| Pieza | Dónde | Qué hace |
|---|---|---|
| `mirUsadasIds(entries)` | `src/lib/mirEvalLog.ts` | devuelve el `Set` de ids ya consumidos: recorre el campo `qIds` de TODAS las entradas del log (local + espejo Supabase tras `mirEvalLogPull()`) |
| `preguntasSinUsar(capId, usadas, opts?)` / `preguntasSinUsarDeAsignatura(num, usadas, opts?)` / `preguntasMixtasSinUsar(n, usadas, semilla, filtro?)` | `src/lib/mirPreguntasOficiales.ts` | filtran el pool quitando `usadas`; por defecto **excluyen anuladas** (clave `null`) y las que llevan `nota` (2025-208, clave A VERIFICAR); orden **año descendente, nº ascendente** (lo más reciente primero) |
| `qIds` en `MirEvalEntry` | `EvalForm` de `MirTodayPlan.tsx` (`qIds` prop → `mirEvalLogAppend`) | al guardar la eval, la entrada lleva los ids que se sirvieron → a partir de ese momento `mirUsadasIds()` los excluye |

Reglas fijas:
- **Nunca** se reutiliza un id de `qIds` en la 1ª vuelta ni en el banqueo. La repetición controlada (2ª vuelta, abr-2027 en adelante) se hará con un flag explícito de fase, no borrando el log.
- Cuando `preguntasSinUsar(...)` devuelve **menos de las que pide el segmento**, el resto se completa con el **test del capítulo ProMIR** (la UI ya lo declara como fallback: "sin pool oficial (test del capítulo)"). No se rellena con preguntas de otro capítulo sin decirlo.
- Las preguntas **con imagen** se sirven igual (el enunciado cita "(IMAGEN n)" / "Pregunta asociada a la imagen n"); el cuaderno de imágenes NO está en el repo → `node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes` (URLs en `pool/_fuentes.json`). Hasta tenerlo, esas preguntas se contestan con el enunciado y se marca en la Shopping List "imagen no vista".
- `preguntasConImagen({ capId | num })` alimenta la cuota **"1 de cada 4 APEX con imagen"** (campo *Pregunta oficial origen* = `id`).
- Reserva (201-210): se sirven como las demás (son preguntas oficiales con clave definitiva).

## 2. Segmento a segmento (Calendar 15:15-16:15, plan 1ª vuelta D1-D76)

| Segmento | Llamada | `kind` del log | n |
|---|---|---|---|
| **Eval anclada 4Q** (15:15) | por cada slot de `mirAnclasDinamicas(d)`: `preguntasSinUsar(capId del tema del slot, usadas).slice(0, 2 \| 1)` (2Q al D-1, 1Q a cada slot dinámico) | `anclada` (+ `anclasD`) | 4 |
| **Pre-test 5Q ciegas** (15:53) | `preguntasSinUsar(dia.capId, usadas).slice(0, 5)` | `pretest` | 5 |
| **Quiz 8-10Q comentadas** (16:05) — YA IMPLEMENTADO en `HoyView` (`qIdsQuiz`) | `preguntasSinUsar(dia.capId, usadas).slice(0, 10)` (las 5 del pre-test ya están en `usadas` si se guardó) | `quiz` | 8-10 |
| **Test de cierre 10Q** (1er día de cada bloque, `mirCierreDe(d)`) | `mezclaDeterminista(preguntasSinUsarDeAsignatura(num de la asignatura cerrada, usadas), fecha).slice(0, 10)` | `cierre` | 10 |
| **Mini-MIR D77 40Q** (lun 4-ene-2027) | `preguntasMixtasSinUsar(40, usadas, '2027-01-04', { soloPlan: true })` → tabla de neto por asignatura para la baseline de D78 | `miniMIR` | 40 |
| **APEX** (≤4/día) | *Pregunta oficial origen* = uno de los ids servidos ese día; 1 de cada 4 con `preguntasConImagen({ capId })` | — | — |

Los pre-test/quiz del mismo capítulo comparten cola: al servir el quiz, `usadas` ya contiene los 5 ids del pre-test guardado (el orden año desc / nº asc hace que el pre-test se lleve 2026-2025 y el quiz continúe).

**Presupuesto real** (13-sep-2026, `_clasificacion_stats.json`): 477 preguntas caen en los 76 capítulos del plan (mediana **5 usables por capítulo**, máx. 17 en Diabetes). El consumo teórico de la 1ª vuelta es 76 × (5 + 10) = 1.140 → el pool oficial cubre **≈ 40 %** de las preguntas de la 1ª vuelta por capítulo; el resto es test ProMIR (fallback). Capítulos del plan con **< 5 usables** (ese día el quiz será casi todo ProMIR): D22 Síndromes clínicos en nefrología (1) · D57 Cáncer de mama (1) · D60 Infecciones y embarazo (1) · D66 Artritis reumatoide (1) · D4 Bioética (2) · D33 Hipófisis (2) · D48 NMP crónicas (2) · D52 Neumonía (2) · D53 Antibacterianos (2) · D55 Hongos (2) · D58 Hemorragia gestación (2) · D62 Ovario (2) · y 19 capítulos con 3-4. Ningún capítulo del plan está a cero.

## 3. Banqueo ene-mar 2027 (`src/lib/mirMantenimiento.ts`, **61 días, mié 6-ene → mié 31-mar** · v5.11, 14-sep; v5.10: 62 desde el 5-ene)

| Día | 15Q / 10Q foco | 10Q interleaving | Registro |
|---|---|---|---|
| lun-jue `banco` (normal) | `preguntasSinUsarDeAsignatura(dia.num, usadas)` → `mezclaDeterminista(…, fecha).slice(0, 15)` | `preguntasSinUsarDeAsignatura(dia.num2, usadas).slice(0, 10)` | `mantenimiento`, `asignatura` = foco, `qIds` = los 25 |
| lun-jue `banco` (reducido, hasta el jue 28-ene = D95 del Step 1) | `preguntasMixtasSinUsar(10, usadas, fecha, { nums: [dia.num, dia.num2] })` | — | `mantenimiento` |
| **jueves TIER C EXPRESS** (semanas 1-12, campo `dia.tierC`, `MIR_MANT_TIER_C`) | foco igual que arriba (15Q) | **10Q = `preguntasSinUsar(tierC.capId, usadas)`**; si faltan, completar con `preguntasSinUsarDeAsignatura(tierC.num, usadas)`; si sigue faltando, test del capítulo ProMIR (`capUrl(tierC.capId)`) | **entrada propia** `mantenimiento` con `asignatura = tierC.asignatura`, `capId = tierC.capId`, `qIds` = las 10 (NO se mezclan con la asignatura foco: así entran en `mirStatsPorAsignatura` y en la tabla del handoff 31-mar) |
| viernes | `preguntasSinUsarDeAsignatura(mirMantFoco(dia, mirPeorAsignatura()).num, usadas).slice(0, 30)` | — | `mantenimiento` (neto semanal) |

Disponibilidad real para los 12 Tier C (preguntas usables del capítulo / de la asignatura): Trauma MI 13/52 · Trauma MS 12/52 · Rx-Urgencias síndromes torácicos **3**/17 · Onco urgencias 9/28 · Geriatría enfermedad en mayores 13/36 · ORL oído 12/30 · Paliativos control de síntomas 12/16 · Uro próstata 6/20 · Oftalmo retina 8/18 · Genética enfermedades genéticas 5/13 · Inmuno básica 14/22 · Gestión economía de la salud **1**/13. En Rx-Urgencias, Uro, Genética y Gestión el capítulo no llega a 10 → se completa con la asignatura (regla de arriba) y se anota en el log qué parte fue del capítulo.

Agotamiento previsible: 61 días × 25-30Q ≈ 1.500 preguntas > 1.025 usables → hacia **mediados de febrero** las asignaturas grandes (Cardio 86, Gastro 80) se quedan sin preguntas oficiales sin usar. Cuando ocurra: (a) fallback al test por asignatura de ProMIR, (b) el MIR 2027 (examen 23-ene-2027; plantilla definitiva ≈ 2 semanas después) añade 210 preguntas nuevas: `ANIOS_MIR` += 2027 → `--descargar` → `--parse` → nuevo pase LLM a `pool/_clasificacion_llm/2027.json` → `--clasificar` → `--verificar` → `--emit` (≈ 1 h de trabajo, sin tocar la UI).

## 4. Bloque Derma 13:30 (agente derma-ui · gap 3)

1 de cada 3 sesiones Derma sustituye "~10Q review" por 10Q MIR-Derma: `preguntasSinUsar(capId del capítulo Derma en rotación, usadas)` (Dermatología = num 5; 30 preguntas usables 2022-2026, 6/año; Oncología cutánea e Infecciosas concentran la mitad) y, si faltan, `preguntasSinUsarDeAsignatura(5, usadas)`; se registra con `kind 'derma10Q'`, `asignatura 'Dermatología'` y `qIds`. Como el log es único, esas ids tampoco reaparecen en el mini-MIR ni en el banqueo.

## 5. Lo que la UI todavía NO hace (pendiente integrador · 13-sep-2026)

- `HoyView` solo pasa `qIds` al **quiz**; pre-test, anclada, cierre y mini-MIR aún no piden ids al pool (las funciones existen: tabla §2). Sin ese cableado, las preguntas del pre-test pueden reaparecer en el quiz del mismo capítulo.
- `MantenimientoView`: un único `EvalForm` con la asignatura foco. Falta el **segundo formulario** para los 10Q Tier C (`dia.tierC`) con su asignatura (§3) y el chip "próximo Tier C" (`mirMantProximoTierC(d)`).
- Espejo Supabase: **A VERIFICAR (13-sep)** que `mir_eval_log` guarda `qIds` (columna/JSON) y que `mirEvalLogPull()` los trae de vuelta; si no, la anti-repetición solo vale por dispositivo.
- El texto de una pregunta servida se muestra desde `preguntaPorId(id)` (enunciado + 4 opciones + clave al corregir); mientras no haya vista de pregunta, la UI enseña los ids y Joseph las abre en el cuaderno (`url` de cada pregunta = PDF oficial v0).

## 6. Anti-alucinación y trazabilidad

- Cada pregunta del pool = texto oficial sin corregir + clave de la hoja **definitiva** del Ministerio (`pool/_fuentes.json`: URL, sha256, fecha). Nada inventado; si el clasificador no supo el capítulo, `capId = null` (21 preguntas) o `num = 0` "Otras · sin asignatura ProMIR" (20 preguntas de fisiología/bioquímica/anatomía/plástica/rehabilitación).
- `confianza` (alta 796 · media 218 · baja 36) viaja con la pregunta: las "baja" se sirven igual pero conviene revisar su capítulo cuando se corrija (ajuste manual = editar la etiqueta en `pool/_clasificacion_llm/AAAA.json` y regenerar; nunca el `.ts`).
- Clave en duda: 2025-208 (IAMSEST, antiagregación) NO se sirve hasta resolverla (`pool/README.md` § Pendientes).
