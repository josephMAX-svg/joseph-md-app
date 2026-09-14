# MIR · pool de preguntas oficiales (2022-2026)

Pool de las **1.050 preguntas oficiales** del examen MIR (Medicina) de las convocatorias **MIR 2022, 2023, 2024, 2025 y 2026** (5 × 210: 200 + 10 de reserva), con la **clave definitiva** del Ministerio de Sanidad, parseadas a JSON desde los PDF oficiales y **clasificadas por asignatura y capítulo real de ProMIR** (`src/lib/mirTemarioData.ts`). Cubre los tres pasos del punto 2 de `DATA/USMLE/_palmerton_v3_extractos/gaps_v3b_mir.json` ("questions as the curriculum"): (1) descarga + parseo → `AAAA.json`; (2) clasificación LLM + verificación → `AAAA_clasificado.json`; (3) generación de [`src/lib/mirPreguntasOficiales.ts`](../../../src/lib/mirPreguntasOficiales.ts) (`--emit`). Cómo lo consume cada segmento del loop (anti-repetición por `qIds`): [`../POOL_USO.md`](../POOL_USO.md).

Creado el 12-sep-2026 (paso 1) · clasificación y `.ts` el 13-sep-2026 (régimen v5.10; sin cambios en v5.11, 14-sep: el pool no depende de fechas — el plan 1ª vuelta va ahora mar 15-sep → mar 5-ene-2027 y el mantenimiento mié 6-ene → mié 31-mar).

## Origen de los datos (verificado 12-sep-2026)

| Qué | Fuente | Cómo |
|---|---|---|
| Cuaderno de examen, **versión 0** | Ministerio de Sanidad · portal FSE → *Datos, Exámenes anteriores e Impresión Autoinformes → Consulta cuadernos de exámenes anteriores* (`https://fse.sanidad.gob.es/fseweb/view/public/datosanteriores/cuadernosExamen/busquedaConvocatoria.xhtml`) | API REST de la SPA: `GET /hera/api/datos/convocatoria/getDatosCuadernosExamen?titulacion=M&anyo=<pruebas>&version=0&opcionSelect=C` (JSON con el PDF en base64) |
| **Hoja de respuestas definitiva** (versión 0) | Mismo portal, opción *Hoja de respuestas* | `GET /hera/api/datos/convocatoria/getHojaRespuestas?titulacion=M&anyo=<pruebas>&version=0` → tabla JSON de 42 filas × 5 pares `{V_k: nº pregunta, RC_k: respuesta}`; **casilla en blanco = pregunta anulada** |
| Cuaderno de imágenes | Mismo portal, `opcionSelect=I` (solo con `--con-imagenes`) | 15-25 MB por año: **no se guarda en el repo**; URL oficial y del espejo en `_fuentes.json` |
| Espejo público (sin registro) | `https://www.examenesmir.com/examenes-mir-pdf` → `https://api.examenesmir.com/api/v1/public/convocatorias/<AAAA>/download/cuadernillo` | Los 5 cuadernillos descargados de ahí son **byte a byte idénticos** (sha256) a los del Ministerio. Su API **no publica plantillas** (`answer_key_url: null`), por eso la clave sale del Ministerio |

Acceso: el portal FSE es una SPA Angular que pide un **token anónimo** (`POST /hera/oauth/api/v1/oidc/token` con `{client_id:'herapublico', grant_type:'session_id'}`, usuario `ANONIMO`, scope `MW_PUBLICO`) y lo envía como `Authorization: Bearer` junto a `X-XSRF-TOKEN`, `Process-Type: MENU`, `Process-Check`, `Proceso-Id`. `gen_mir_pool.js --descargar` replica exactamente esas llamadas (sin registro, sin captcha, sin scraping de páginas logueadas). Años que lista la API (`getAnyos`): pruebas selectivas 2021-2025.

### Convención de años

**`AAAA` = año en que se celebra el examen.** MIR 2026 = *Pruebas selectivas 2025* (examen 24-ene-2026, nombre oficial del fichero `Cuaderno_2025_M_0_C.pdf`). En la API del Ministerio `anyo = AAAA - 1`. Los ids de pregunta son `AAAA-NNN` (`NNN` = número en la **versión 0**, 001-210; 201-210 son las de reserva).

## Licencia y uso

- Los cuadernos llevan impreso **"PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL"** (Ministerio de Sanidad). Este pool es de **uso privado de estudio** de Joseph: no se redistribuye, no se publica, no se sube a servicios de terceros. Si el repo tiene remoto público, valorar excluir `DATA/MIR/pool/raw/*.pdf` (y los JSON) del push.
- examenesmir.com dice de sus ficheros: *"Los cuadernillos y plantillas publicados en esta biblioteca son los documentos oficiales emitidos por el Ministerio de Sanidad tras cada convocatoria"*; no declara licencia propia.

## Ficheros

```
DATA/MIR/pool/
├── README.md                          ← este fichero
├── _fuentes.json                      ← por convocatoria: URL exacta, parámetros, fecha de descarga, sha256, bytes, espejo
├── _stats.json                        ← estadísticas del parseo por año (las genera --parse)
├── _parse_errores.json                ← lo que el parser no resolvió o pide revisión (nunca se rellena a mano)
├── _clasificacion_stats.json          ← paso 2: distribución por asignatura/confianza, contraste con CTO, muestra y % de acuerdo (--clasificar/--verificar)
├── _clasificacion_llm/
│   ├── AAAA.json                      ← etiquetas del pase LLM {numero: 'ASIG.cap.confianza'} (la ÚNICA entrada manual del paso 2)
│   ├── _muestra_2pasada_lectura.txt   ← las 105 preguntas de la muestra (10 %) con enunciado íntegro, SIN etiqueta (para clasificar a ciegas)
│   └── _muestra_2pasada.json          ← etiquetas de la 2ª pasada {id: 'ASIG.cap.confianza'}
├── 2022.json … 2026.json              ← 210 preguntas por año parseadas (formato abajo)
├── 2022_clasificado.json … 2026_clasificado.json ← las mismas + asignatura/num/capId/capitulo/fueraDePlan/enPlan/confianza (--clasificar)
└── raw/
    ├── AAAA_cuadernillo.pdf           ← PDF oficial versión 0 (idéntico Ministerio = espejo)
    ├── AAAA_cuadernillo.txt           ← pdftotext -enc UTF-8 -raw (trazabilidad del parseo)
    └── AAAA_plantilla_definitiva_v0.json ← hoja de respuestas tal cual la sirve la API del Ministerio
```

### Formato de `AAAA.json`

Array de 210 objetos, en orden:

```json
{
  "id": "2026-013",
  "numero": 13,
  "enunciado": "Texto íntegro del enunciado (con el marcador de imagen si lo lleva)",
  "opciones": ["opción 1", "opción 2", "opción 3", "opción 4"],
  "clave": null,          // 1-4 según la plantilla DEFINITIVA; null si anulada
  "imagen": true,         // el enunciado va ligado al cuaderno de imágenes
  "anulada": true,        // casilla en blanco en la plantilla definitiva
  "imagen_num": "13",     // nº de imagen tal como lo cita el cuaderno ("5a" si son varias); null si no hay
  "reserva": false        // numero > 200
}
```

Los siete primeros campos son el contrato del punto 2 del gap; `imagen_num` y `reserva` son extras para el clasificador. Las preguntas anuladas **se conservan** (con `clave: null`); el `.ts` NO las sirve por defecto (`MirPoolOpts.incluirAnuladas`).

### Formato de `AAAA_clasificado.json` (paso 2)

Los campos de arriba más:

```json
{
  "num": 11, "asignatura": "Gastroenterología",        // asignatura REAL de mirTemarioData (0 = 'Otras · sin asignatura ProMIR'; -1 = SIN CLASIFICAR)
  "capN": 7, "capId": "570779c8f4d68bf008dbc64c", "capitulo": "Enfermedades del colon",   // capId REAL (null si el enunciado no fija capítulo)
  "fueraDePlan": false,     // la asignatura NO está entre las 14 del plan (Tier C / mini-MIR)
  "enPlan": true,           // el capId es uno de los 76 capítulos de mirDailyPlan D1-D76
  "confianza": "alta",      // alta · media · baja · pendiente
  "etiqueta": "GAS.7.a"     // la etiqueta LLM de origen (_clasificacion_llm/AAAA.json)
}
```

Nota sobre `capId` en asignaturas fuera del plan: el gap pedía `capId null` para ellas; se conserva el **capId real** cuando el capítulo es evidente porque el Tier C express (punto 4) necesita servir "10Q del capítulo top-1" (`preguntasSinUsar(tierC.capId)`); `fueraDePlan:true` sigue marcando que no son del plan.

## Clasificación (paso 2, 13-sep-2026)

- **Método:** pase LLM (Claude, sesión del 13-sep) sobre enunciado + 4 opciones de cada una de las 1.050 preguntas → etiqueta `ASIG.cap.conf` (30 códigos de asignatura = las 30 de ProMIR + `OTR`; `cap` = nº de capítulo real en `mirTemarioData.ts`, `x` = sin capítulo; `conf` = a/m/b). `--clasificar` resuelve cada etiqueta contra el temario real (falla si el capítulo no existe), cruza con el plan y escribe `AAAA_clasificado.json`. Criterios: **alta** = capítulo evidente · **media** = asignatura clara, capítulo por mejor ajuste (p. ej. EII → intestino delgado/colon; vacunas de adulto → Infecciosas sin capítulo) · **baja** = la propia asignatura es discutible (fisiología aplicada, cirugía general sin órgano claro, rehabilitación). `OTR` (num 0, 20 preguntas) = fisiología/bioquímica/anatomía básicas, cirugía plástica, rehabilitación: sin asignatura ProMIR, se dejan con `capId null` y NO se les inventa un capítulo. Cirugía general → Gastroenterología (cap 8 "Miscelánea de temas quirúrgicos" u órgano); cirugía vascular → Cardiología 13-15; neurocirugía → Neurología 2; maxilofacial → ORL 6; medicina intensiva → Infecciosas 3 (sepsis/shock) o Neumología 15 (SDRA/VM); prevención hospitalaria (IRAS, aislamientos, higiene de manos) → Infecciosas 21; cribados/prevención poblacional → Gestión 1.
- **Resultado (1.050):** confianza alta 796 · media 218 · baja 36 · pendiente 0 · con capítulo 1.029 · en los 76 capítulos del plan **477** · asignatura fuera del plan 344. Por asignatura (5 años): Cardiología 86 · Gastroenterología 80 · Infecciosas 66 · Neurología 61 · Endocrino 60 · Ginecología 54 · Traumatología 53 · Neumología 52 · Reumatología 42 · Pediatría 40 · Psiquiatría 40 · Nefrología 39 · Geriatría 36 · Hematología 36 · ORL 31 · Dermatología 31 · Oncología 28 · Epidemiología 26 · Legal y Bioética 24 · Inmunología 22 · Otras 20 · Urología 20 · Oftalmología 19 · Rx-Urgencias 18 · Paliativos 16 · Genética 13 · Gestión 13 · Farmacología 9 · Alergología 8 · Anestesiología 7 · Estadística 0 (coincide con su `pesoGlobal`: sin preguntas en las últimas 5 convocatorias). Ningún capítulo del plan queda a cero; mediana 5 preguntas usables por capítulo del plan (lista de los que tienen < 5 en `../POOL_USO.md` §2).
- **Verificación por muestreo (10 %):** 105 ids deterministas (semilla 20260913, `_clasificacion_stats.json.muestra2Pasada`) reclasificados **a ciegas** en un paso separado leyendo el enunciado íntegro sin la etiqueta de la 1ª pasada (`_muestra_2pasada_lectura.txt` → `_muestra_2pasada.json`, `--verificar`). Acuerdo: **asignatura 100 % (105/105) · capítulo 99,0 % (101/102)** en la comparación original; el único desacuerdo (2025-103: disección de aorta proximal, 1ª pasada "Cardiopatía isquémica" → 2ª "Enfermedades de la aorta") se corrigió en la etiqueta a favor de la 2ª pasada y el fichero de stats quedó en 100/100. **Limitación honesta:** la 2ª pasada la hizo el mismo LLM; no es un evaluador humano independiente ni la validación cruzada con "preguntas MIR de este capítulo" de ProMIR (pendiente, requiere sesión logueada).
- **Contraste externo** con el desglose por asignatura que publicó ConSalud citando a **Academia CTO** (200 preguntas sin reserva; MIR 2026 y 2025; tabla y agrupación CTO→ProMIR en `CONTRASTE_CTO`/`CTO_A_PROMIR` del script; para 2022-2024 no se localizó tabla comparable con WebFetch). Desviaciones |Δ| ≥ 3 y su explicación (todas son de **frontera de categoría**, no de preguntas mal leídas):
  - MIR 2025 · Gastroenterología 12 vs CTO Digestivo 8 + Cirugía General 13 = 21 (−9): CTO agrupa como "Cirugía General" preguntas que ProMIR reparte en Endocrino (tiroides 123), Hematología (esplenectomía 128), Infecciosas 21 (infección de herida 129 y 171), Rx-Urgencias (aerobilia 18), Oncología (hepatitis por nivolumab 119) → coherente con Infecciosas +3 y Oncología +3. Paliativos +4 y Gestión +1: CTO no tiene esas categorías. Pediatría −3 / Psiquiatría −3 / Epidemiología −3 / Otras −3: pediatría-psiquiatría infantil, prevención (→ Gestión/Infecciosas 21) y básicas repartidas.
  - MIR 2026 · Epidemiología 3 vs 10 (−7): CTO mete en "Epidemiología" la prevención hospitalaria (higiene de manos, IRAS, aislamiento por gotas = Infecciosas 21, 3 Q), calidad/seguridad del paciente y cribados (Gestión, 3 Q) y el sobrediagnóstico → 3 + 3 + 3 + 1 = 10. Neurología 8 vs 12 (−4): narcolepsia (→ Psiquiatría 10), amiloidosis con clínica neurológica (→ Reumatología 10), rehabilitación de la marcha (→ Otras) y la HTIC. Pediatría 7 vs 11 (−4): SMSL (→ Legal 10), maltrato (→ Legal 5), TEA (→ Psiquiatría 9), dermatitis del pañal (→ Dermatología 5). Otras/básicas 6 vs 10 (−4): fisiología cardíaca/renal/respiratoria asignada al capítulo básico de su asignatura. Infecciosas +3, Paliativos +3, Gestión +3: categorías que CTO no separa.
  - Asignaturas donde LLM y CTO coinciden exactamente: 2025 → Cardiología 16, Traumatología 11, Hematología 7, Oftalmología 5, Alergología 2, Genética 1; 2026 → Ginecología 9, Reumatología 9, Legal/Bioética 8, Nefrología 7, Dermatología 6, Geriatría 6, ORL 5, Inmunología 2.

## Cómo regenerar

```bash
# desde D:\joseph-md-app  (Node ≥ 18; pdftotext de xpdf/poppler — viene con Git for Windows)
node DATA/_scripts/gen_mir_pool.js --descargar            # cuadernos v0 + plantillas definitivas → raw/ + _fuentes.json (idempotente: compara sha256)
node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes   # además los cuadernos de imágenes (pesados; la API oficial falla para 2024 → usar el espejo)
node DATA/_scripts/gen_mir_pool.js --parse                # pdftotext -raw + parseo + claves → AAAA.json, _stats.json, _parse_errores.json
node DATA/_scripts/gen_mir_pool.js --stats                # tabla Markdown de estadísticas del parseo
node DATA/_scripts/gen_mir_pool.js --clasificar           # etiquetas LLM (_clasificacion_llm/AAAA.json) × pool → AAAA_clasificado.json + _clasificacion_stats.json (+ muestra 2ª pasada la 1ª vez)
node DATA/_scripts/gen_mir_pool.js --verificar            # % de acuerdo de _clasificacion_llm/_muestra_2pasada.json con la clasificación
node DATA/_scripts/gen_mir_pool.js --emit                 # src/lib/mirPreguntasOficiales.ts (< 3 MB; luego npx tsc --noEmit -p .)
# --anios 2025,2026 limita --descargar/--parse/--clasificar a esas convocatorias
```

Cuando salga el **MIR 2027** (examen 23-ene-2027): añadir `2027` a `ANIOS_MIR` en el script y ejecutar `--descargar` + `--parse` **después** de que el Ministerio publique la plantilla **definitiva** (≈ 2 semanas tras el examen; antes `tieneRespuesta` puede ser `false` o servir la provisional); después un nuevo pase LLM → `_clasificacion_llm/2027.json` (mismo formato) → `--clasificar` → 2ª pasada sobre la nueva muestra → `--verificar` → `--emit`. Corregir una clasificación = editar la etiqueta en `_clasificacion_llm/AAAA.json` y regenerar (nunca el `.ts` ni `AAAA_clasificado.json` a mano).

### Cómo parsea

1. `pdftotext -enc UTF-8 -raw` (orden del *content stream*): en estos cuadernos a dos columnas devuelve columna izquierda y luego derecha con la secuencia 1→210 monótona. El modo por defecto **mezcla líneas de las dos columnas** ("…clozapina. 96. Sobre los factores…") y rompe el parseo; `-layout` obligaría a partir columnas a mano.
2. Se descarta la portada (instrucciones "1. MUY IMPORTANTE" … "8. No se entregarán…"), los números de página (`-12-`) y las marcas de impresión (`(--MEDICINA-0--7/36)`).
3. Escáner secuencial: para `n = 1…210` busca el token `n.` (precedido de espacio/inicio, seguido de espacio), luego `1.`, `2.`, `3.`, `4.`, y el corte de la opción 4 es el token `n+1.`. El marcador "Pregunta asociada a la imagen 1." (2022-2025) se protege para que su "1." no se confunda con la opción 1.
4. Normalización: se deshace la partición silábica de fin de línea (`ate-` + `rosclerosis` → `aterosclerosis`; si tras el guion viene mayúscula/dígito se conserva el guion), se unen líneas y se colapsan espacios. No se corrige ortografía ni se toca el texto oficial.
5. Clave: de `raw/AAAA_plantilla_definitiva_v0.json`; blanco → `anulada: true`.
6. Validaciones duras (→ `errores`): 210 preguntas, números únicos y consecutivos, 4 opciones, enunciado no vacío, clave ∈ 1-4 o null, todos los números de la plantilla presentes. Avisos (→ `revisar`): opción > 500 caracteres, opción con `¿?` o que termina en `:`, enunciado con un patrón `k. Xxx` (posible opción absorbida).

## Contrastes hechos (anti-alucinación)

- **Anuladas por año = exactamente las que publicó la prensa al salir la plantilla definitiva** (Redacción Médica / ConSalud / iSanidad / casimedicos): 2022 → 120, 126, 189 · 2023 → 15, 40, 128, 138 · 2024 → 64, 68, 113, 180, 206 · 2025 → 15, 26, 28, 56, 162, 186 · 2026 → 13, 50, 64, 139, 142, 161, 208.
- **MIR 2026: las 210 casillas** de la hoja del Ministerio coinciden con la tabla V0 que reproduce casimedicos.com (`mir-2026-respuestas-oficiales`): 210/210, sin diferencias.
- **MIR 2025: la pregunta 150 tiene clave 4** en la hoja del Ministerio — es el cambio provisional→definitiva que reseñó la prensa ("pasa a tener como opción correcta la 4, en lugar de la 1"), luego la hoja que sirve la API es la **definitiva**, no la provisional. **Discrepancia abierta en la 208 (reserva):** Redacción Médica e iSanidad, citando la resolución definitiva, escriben "La pregunta 208, de reserva, tiene como opción correcta la 3 en lugar de la 2"; la hoja del Ministerio sigue dando **2**. El JSON conserva la clave oficial (2) y añade `nota: "clave A VERIFICAR (12-sep-2026)…"`; queda registrada en `_parse_errores.json` (`contraste-prensa`) y en `_stats.json` (`contrastes_prensa_discrepantes`). Esa pregunta no debe usarse con clave hasta resolverlo.
- El script lleva la tabla `CONTRASTES_PRENSA` (anuladas por año + cambios provisional→definitiva, con las fuentes) y en cada `--parse` vuelve a comparar; cualquier desviación futura de la API aparecerá ahí sola.
- Los 5 PDF del espejo examenesmir.com tienen el **mismo sha256** que los que devuelve la API del Ministerio (`_fuentes.json`, campo `espejo.identico`).
- Imágenes: el cuaderno dice "25 preguntas ligadas a una imagen"; el texto marca 25 en 2022-2025 y **24 en 2026** ("(IMAGEN n)" para 1-23 y 25; la 24 no lleva marcador en el texto) — se registra lo que dice el cuaderno, no se completa a mano.

## Estadísticas por año (generadas por `--parse`, 12-sep-2026)

| MIR | Pruebas | Parseadas | Con clave | Anuladas | Imagen | Reserva | Claves 1/2/3/4 | Errores | Revisar |
|---|---|---|---|---|---|---|---|---|---|
| 2022 | 2021 | 210/210 | 207 | 3 (120, 126, 189) | 25 | 10 | 52/53/52/50 | 0 | 2 |
| 2023 | 2022 | 210/210 | 206 | 4 (15, 40, 128, 138) | 25 | 10 | 53/51/53/49 | 0 | 1 |
| 2024 | 2023 | 210/210 | 205 | 5 (64, 68, 113, 180, 206) | 25 | 10 | 50/53/52/50 | 0 | 0 |
| 2025 | 2024 | 210/210 | 204 | 6 (15, 26, 28, 56, 162, 186) | 25 | 10 | 51/54/50/49 | 0 | 1 |
| 2026 | 2025 | 210/210 | 203 | 7 (13, 50, 64, 139, 142, 161, 208) | 24 | 10 | 41/62/65/35 | 0 | 1 |
| **Total** | | **1050** | **1025** | **25** | **124** | | | | |

`_parse_errores.json` tiene 6 entradas: los 5 avisos "revisar" son falsos positivos del patrón `k. Xxx` ("diabetes mellitus tipo 2. Valorando…", "BIRADS 3. ¿Cuál…"; las 4 opciones de esas preguntas están completas y bien cortadas, comprobado a mano el 12-sep) y la 6ª es el contraste de la 208 del MIR 2025 descrito arriba. Ninguna es un error de parseo.

## Limitaciones conocidas

- Solo la **versión 0** de cada cuaderno (la canónica; las versiones 1-4 son permutaciones del mismo examen).
- Las **imágenes no están en el repo** (pesan 15-25 MB por año y la API oficial falla para 2024 con `OutOfMemoryError` al codificar en base64). URLs oficiales y del espejo en `_fuentes.json` (`tipo: imagenes_v0`); `--con-imagenes` las descarga bajo demanda.
- La fecha de examen por año viene de la API de examenesmir.com (campo `exam_date`), no del BOE → etiquetada "A VERIFICAR" en `_fuentes.json`.
- La clasificación es de un LLM, verificada por muestreo del 10 % por el mismo LLM y contrastada solo a nivel de asignatura con CTO (2025-2026): 36 preguntas con confianza **baja** y 21 sin capítulo; la validación cruzada capítulo a capítulo con "preguntas MIR de este capítulo" de ProMIR (sesión logueada) sigue pendiente. Sin etiquetas de dificultad.
- 20 preguntas (`num 0`, "Otras · sin asignatura ProMIR") no tienen asignatura en el temario de ProMIR (fisiología, bioquímica, anatomía, cirugía plástica, rehabilitación): solo se sirven en el mini-MIR mixto si se pide `soloPlan:false`.
- El texto es el oficial tal cual (incluidas erratas del cuaderno, p. ej. "triangulo", "auriculo-ventricular").
- `src/lib/mirPreguntasOficiales.ts` pesa ≈ 1,1 MB y entra en el bundle web (lo importa `MirTodayPlan.tsx`); si el pool crece por encima de 3 MB, `--emit` falla y hay que pasar los enunciados a carga lazy.

## Pendientes

- Verificar la clave de la **208 del MIR 2025** (reserva; IAMSEST no revascularizable → antiagregación) contra la resolución definitiva de la Comisión Calificadora (portal FSE o BOE): la hoja de la API da 2 (AAS + clopidogrel), Redacción Médica e iSanidad dicen 3 (AAS + ticagrelor). No corregir `raw/2025_plantilla_definitiva_v0.json` a mano: si se confirma 3, añadir la clave verificada al mecanismo de contraste del script (`CONTRASTES_PRENSA`) y que el paso 2 la trate como clave verificada; si la API cambia, `--descargar --anios 2025` + `--parse` la recogen solos.
- Decidir si `raw/*.pdf` y los JSON se excluyen del remoto (leyenda "prohibida la reproducción"). Ojo: `src/lib/mirPreguntasOficiales.ts` contiene los 1.050 enunciados y SÍ va al repo/bundle; si se excluye, hay que excluirlo también (y entonces la app queda "sin pool oficial").
- Revisar con sesión ProMIR las 36 preguntas de confianza baja y las 21 sin capítulo (`jq '.[] | select(.confianza=="baja" or .capId==null)' AAAA_clasificado.json`); corregir la etiqueta y regenerar.
- Buscar las tablas por asignatura de MIR 2022-2024 (CTO/AMIR/ConSalud) para completar `CONTRASTE_CTO`.
