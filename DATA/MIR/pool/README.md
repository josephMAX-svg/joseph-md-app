# MIR · pool de preguntas oficiales (2022-2026)

Pool de las **1.050 preguntas oficiales** del examen MIR (Medicina) de las convocatorias **MIR 2022, 2023, 2024, 2025 y 2026** (5 × 210: 200 + 10 de reserva), con la **clave definitiva** del Ministerio de Sanidad, parseadas a JSON desde los PDF oficiales. Es el **paso 1** del punto 2 de `DATA/USMLE/_palmerton_v3_extractos/gaps_v3b_mir.json` ("questions as the curriculum"): descarga + parseo. **La clasificación por asignatura/capítulo (paso 2) y la generación de `src/lib/mirPreguntasOficiales.ts` (paso 3) NO están aquí** — las hace el siguiente agente; este directorio no toca la app.

Creado el 12-sep-2026 (régimen v5.10).

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
├── _stats.json                        ← estadísticas por año (las genera --parse)
├── _parse_errores.json                ← lo que el parser no resolvió o pide revisión (nunca se rellena a mano)
├── 2022.json … 2026.json              ← 210 preguntas por año (formato abajo)
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

Los siete primeros campos son el contrato del punto 2 del gap; `imagen_num` y `reserva` son extras para el clasificador. Las preguntas anuladas **se conservan** (con `clave: null`) para que el siguiente paso decida si las usa como material (suelen ser preguntas con defecto).

## Cómo regenerar

```bash
# desde D:\joseph-md-app  (Node ≥ 18; pdftotext de xpdf/poppler — viene con Git for Windows)
node DATA/_scripts/gen_mir_pool.js --descargar            # cuadernos v0 + plantillas definitivas → raw/ + _fuentes.json (idempotente: compara sha256)
node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes   # además los cuadernos de imágenes (pesados; la API oficial falla para 2024 → usar el espejo)
node DATA/_scripts/gen_mir_pool.js --parse                # pdftotext -raw + parseo + claves → AAAA.json, _stats.json, _parse_errores.json
node DATA/_scripts/gen_mir_pool.js --stats                # tabla Markdown de estadísticas
# --anios 2025,2026 limita cualquier modo a esas convocatorias
```

Cuando salga el **MIR 2027** (examen 23-ene-2027): añadir `2027` a `ANIOS_MIR` en el script y ejecutar `--descargar` + `--parse` **después** de que el Ministerio publique la plantilla **definitiva** (≈ 2 semanas tras el examen; antes `tieneRespuesta` puede ser `false` o servir la provisional).

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
- Sin clasificación por asignatura/capítulo ni etiquetas de dificultad: eso es el paso 2 (LLM + muestreo manual del 10 % + contraste con los análisis por especialidad).
- El texto es el oficial tal cual (incluidas erratas del cuaderno, p. ej. "triangulo", "auriculo-ventricular").

## Pendientes

- Verificar la clave de la **208 del MIR 2025** (reserva; IAMSEST no revascularizable → antiagregación) contra la resolución definitiva de la Comisión Calificadora (portal FSE o BOE): la hoja de la API da 2 (AAS + clopidogrel), Redacción Médica e iSanidad dicen 3 (AAS + ticagrelor). No corregir `raw/2025_plantilla_definitiva_v0.json` a mano: si se confirma 3, añadir la clave verificada al mecanismo de contraste del script (`CONTRASTES_PRENSA`) y que el paso 2 la trate como clave verificada; si la API cambia, `--descargar --anios 2025` + `--parse` la recogen solos.
- Decidir si `raw/*.pdf` y los JSON se excluyen del remoto (leyenda "prohibida la reproducción").
