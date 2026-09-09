# 🏦 BANCO_PROPIO — depósito único de preguntas ENCAPS con clave verificada (mantenimiento 2027-I → intensiva)

> Todo lo que Joseph resuelve en la hora ENCAPS (16:15-17:15) y en los viernes sale de aquí. Cada ítem cita **contra qué se verificó su clave** (gate §3-bis de `PROTOCOLO_GENERACION_PREGUNTAS.md`). **LISTA NEGRA:** ningún fichero de este depósito deriva del examen 2026-II hasta el pre-test del 5-feb-2027 (`PRETEST_2026-II.md`); el generador rechaza cualquier ítem cuyo `verificado_contra` / `molde` / `fuente` mencione `2026-2` o `2026-II`.

## 1) Ficheros

| Fichero | Qué es | Ítems | Entra al pool del runner |
|---|---|---|---|
| `_examenes_reales_2024-2A_2026-1.json` | Los 6 exámenes reales (2024-2A/2B · 2025-1A/1B · 2025-2 · 2026-1) con enunciado, 4 opciones y **clave oficial** extraída de los resaltados del PDF (2026-1 sin clave). A/B son el mismo examen barajado. | 600 (400 únicos con clave) | no (referencia; `--sim100 <proceso>` lo usa como simulacro 100Q) |
| `_etiquetas_examenes_reales_v3.json` | Etiquetado por **código v3 + sub_eje + formato** de los 300 ítems con clave (2024-2A · 2025-1A · 2025-2), hecho enunciado por enunciado el 05-sep-2026. Línea base real por código. | 300 | no (los ítems etiquetados viven en `set_*_1.json` y `set_reales_otros_1.json`) |
| `_inventario_banco_por_codigo.json` | Oferta vs demanda por código v3 (§4). Se regenera con `--inventario`. | — | no |
| `banco_items_v1.json` | 50 ítems espejo (moldes 2024-2A→2026-1, 44 con clave oficial) diseñados para los 2 primeros mini-sims (`reservado_para` 11-sep / 18-sep). | 50 | sí |
| `set_<codigo>_1.json` × 8 | **Stock real de las 2 primeras semanas de la rotación** (sem A: II-3, I-3, V-2, III-5 · sem B: II-5, I-4, IV-1+IV-2, II-4). 25Q por código = ítems **reales** re-etiquetados (clave oficial) + ítems **nuevos** cuya clave cita el texto extraído de los compendios locales (López 2026-I / Theomed 2026, pdftotext 05-sep) y la norma. Reparto: I-3 25 reales · V-2 25 reales · IV-1+IV-2 21+4 · I-4 17+8 · III-5 15+10 · II-5 8+17 · II-4 6+19 · II-3 5+20. | 200 | sí |
| `set_reales_otros_1.json` | Resto de ítems reales etiquetados (cola larga, rebotes II-1/II-11/II-8, III-8, V-MED, IV-6+IV-7, 11 V-2 sobrantes). Alimenta los **secundarios** de cola larga y los mini-sims. | 178 | sí |
| `set_cola_larga_1.json` | Ítems nuevos para códigos de cola larga con < 4 reales (hoy V-6 telesalud ×6, Compendio López Gestión 2026-I). | 6 | sí |
| `minisim_<viernes>.json/.html` | Mini-simulacro de viernes (25Q, receta fija) ya armado + runner HTML. | 25 c/u | salida (sus ids quedan "usados") |
| `banco_<fecha>.json/.html` | Banco del día lun-jue (16-20Q del código/sub-eje + 4-5Q del secundario), corrección inmediata. | 20-25 c/u | salida |
| `eval_<fecha>.json/.html` | Eval anclada 16:15 (5Q = 3 cifras + 2 viñetas del código de ayer; lunes = fallos previos). | 5 c/u | salida |
| `pretest_2026-II.html` · `sim100_<proceso>_<fecha>.html` | Pre-test del 5-feb-2027 (generar el jue 4-feb) y simulacros 100Q de la intensiva. | 100 | salida |

## 2) Esquema de ítem (el de `banco_items_v1.json`, ampliado)

```json
{ "id": "R-2025-2-Q22 | N-II3-001 | BP-0001", "codigo": "I-3 | V-2 | IV-1+IV-2 | V-MED …", "area": "I|II|III|IV|V",
  "formato": "viñeta | directa | cifra | viñeta+cifra", "critico": true, "sub_eje": "clave de SUB_EJES en _encaps_ciclo_v3.js", "subangulo": "label",
  "fallo_previo": "clave del sub-ángulo fallado en _registro_resoluciones.json que este ítem re-testea (o null)", "reservado_para": "viernes YYYY-MM-DD o null",
  "dif": "media|alta|real", "origen": "examen_real | nuevo_05sep2026 | espejo",
  "enunciado": "…", "opciones": { "A": "…", "B": "…", "C": "…", "D": "…" }, "clave": "B", "respuesta": "texto de la clave", "explicacion": "…|null",
  "fuente": "de dónde sale el contenido", "verificado_contra": "CLAVE OFICIAL <proceso> Q<n> = … | Compendio <x> (texto extraído): '…' | norma con número y año",
  "molde": "<proceso> Q<n> | sin molde" }
```
Prefijos de id: `R-` real · `N-` nuevo · `BP-` espejo v1. 4 opciones A-D (el examen real tiene 4). Un fichero = `{ _meta, items[] }`; cualquier `*.json` que no empiece por `_` ni sea salida del runner entra al pool.

## 3) Cómo se consumen (todo con `node DATA/_scripts/gen_encaps_minisim.js`)

| Cuándo | Comando | Qué arma | Reglas |
|---|---|---|---|
| Lun-jue 16:30 **banco del día** | `--banco 2026-09-10` | lee la fila `banqueo1h` de `_encaps_mantenimiento_2027.sql` (código, `extra.sub_eje`, secundario) → 16-20Q del código ciñéndose al **sub-eje del día** (luego otros sub-ejes del código) + 4-5Q del secundario de cola larga; corrección **inmediata** al marcar respuesta + confianza; ≥40 % recall directo | avisa si el sub-eje tiene < 8Q o el secundario < 4Q |
| Mar-jue 16:15 **eval anclada** | `--eval 2026-09-10` | 5Q del código de AYER: 3 cifras + 2 viñetas (prefiere el sub-eje de ayer), solución al final; lunes **y D1 del régimen** (sin sesión anterior en el SQL): 5Q de fallos previos, críticos primero | el viernes no lleva eval (el mini-sim ocupa las 16:15) |
| Viernes 16:15 **mini-sim** | `2026-09-25` | 25Q receta fija (8 II · 7 I · 5 V · 3 III · 2 IV, 50/50 viñeta-directa, ≥10 críticos, ≥5 fallos previos, 5-6Q de los 2 códigos de cola larga del viernes), 72 s/Q | escribe `minisim_<fecha>.json/.html`; exige 25Q |
| Toda una semana de golpe | `--semana 2026-09-07` (siempre el LUNES de la semana, aunque no tenga sesión) | banco lun-jue + eval mar-jue + mini-sim del viernes (si no existe); los días sin fila en el SQL se saltan con «sin sesión» | pre-generar el viernes anterior (regla: ≥5 sesiones de stock por delante) |
| Fin de sesión | `--registrar <export.json> [--append]` | guarda la ronda en `TRACKING_ERRORES/RONDAS/` y da la línea para `gen_encaps_semana.js --cerrar` | append-only |
| Inventario | `--inventario` | `_inventario_banco_por_codigo.json` | — |
| Intensiva | `--pretest` (jue 4-feb) · `--sim100 2025-2|2025-1A|2024-2A|propio <fecha>` | 100Q / 72 s | `propio` exige ≥100 ítems no usados |

**Fallos previos (≥5Q del mini-sim):** el runner solo puede cumplirlos si el pool tiene ítems con `fallo_previo` = clave de un sub-ángulo fallado en `_registro_resoluciones.json` (o del código en estado "débil" en `resumen_por_subtema`). Hoy solo I-3 tiene fallos registrados y sus ítems etiquetados ya se consumieron (semana 1): al cerrar cada semana con `gen_encaps_semana.js`, los sets nuevos deben traer `fallo_previo` con las claves recién falladas y el mini-sim del viernes siguiente se regenera (`node … <viernes>`; sobrescribe su propio fichero sin tocar los demás). Mientras tanto el runner avisa "fallos previos: n/5" y rellena con críticos.

**Stock pre-generado hoy (09-sep-2026, re-fecha a D1 = jue 10-sep · régimen v5.8):** `eval_2026-09-10` (D1, modo fallos previos: no hay sesión anterior en el SQL; 5Q de I-3) · `banco_2026-09-10` (II-3 · esquema_intervalos + secundario II-2, 22Q) · `minisim_2026-09-11` (cola larga II-2 + I-10) · `minisim_2026-09-18` (V-6 + II-6) · `minisim_2026-09-25` (II-10 + I-5+I-6). Al correr el régimen un día más, el **9-sep dejó de tener sesión**: se borraron `banco_2026-09-09` y `eval_2026-09-09` (json + html) y se regeneró la semana 1 con `--semana 2026-09-07` (el lunes 7, el martes 8 y el miércoles 9 ya no tienen fila y el script los salta). Los tres mini-sims **no se regeneraron a propósito**: su `_meta.cola_larga` sigue coincidiendo 1:1 con la fila `mini_sim` del SQL nuevo (11-sep II-2+I-10 · 18-sep V-6+II-6 · 25-sep II-10+I-5+I-6) y regenerarlos habría roto la unicidad de ids. 102 ítems en total, **0 ids repetidos** y **0 ítems derivados del 2026-II** (verificado el 09-sep: ningún `fuente`/`molde`/`verificado_contra` cita ese proceso; tres ítems del pool —BP-0010, BP-0012, BP-0017, moldes 2024-2A/2025-1A con clave oficial— solo lo mencionan como comentario dentro de su `explicacion`). Avisos de stock vigentes: el secundario **II-2 quedó en 0Q disponibles** (solo entraron 2Q de las 4-5 de la receta) y **II-3 baja a 5Q disponibles** tras el banco del 10-sep → reponer `set_II-3_2.json` y cola larga II-2 antes de la semana 3. I-3 vuelve a tener **20Q disponibles**: su sesión (`tipos_vigilancia`) se corrió al lun 14-sep, ya en la semana 2 (`--semana 2026-09-14`, aún sin pre-generar).

**Un ítem se usa una sola vez:** los ids presentes en cualquier `minisim_*.json`, `banco_*.json` o `eval_*.json` quedan excluidos de los sets siguientes (sin importar la fecha, porque los sets se pre-generan por adelantado). Para reponer stock se añaden ficheros `set_<codigo>_<n>.json` (nunca se editan ids ya consumidos). `--dry` en cualquier modo solo informa.

Cada runner HTML abre en el navegador sin red: reloj, confianza 1-3 obligatoria, corrección por código/sub-eje/formato (% bruto y **% CIEGO = seguras/total**), clasificación del error (CONCEPTO · OLVIDO · CRONOLOGÍA · CCSN · CONTEXTO · CAMBIO · TIEMPO · LECTURA) y export JSON en el esquema de ronda v3 + línea de cierre. Estado en `localStorage` (`jmd-encaps-runner-<id>`).

## 4) Stock vs demanda (inventario regenerado el 09-sep-2026 contra el SQL de D1 = jue 10-sep)

Siembra vigente (**D1 = jue 10-sep-2026 · 99 días · cierre vie 29-ene-2027**, backup `study_schedule_bk_0909`): **80 sesiones `banqueo1h` + 19 mini-sims de viernes**, con **I-3 10 · V-2 10 · el resto 5 sesiones** cada uno (I-4 · II-1 · II-3 · II-4 · II-5 · II-8 · II-11 · III-5 · III-8 · IV-1+IV-2 · IV-6+IV-7 · V-MED) y 80 slots de secundario de cola larga + 38 slots de cola larga en los viernes. Demanda sembrada en 99 días ≈ **1 908Q** (80 sesiones × 16-20Q + 80 secundarios × 4-5Q + 19 viernes × 5-6Q de cola larga). Al arrancar un día más tarde con el cierre fijo del 29-ene, la rotación pasó de 100 a **99 días** y **II-3 bajó de 6 a 5 sesiones** (el resto de códigos mantiene su cuenta; **A VERIFICAR (09-sep)** con Joseph si esa instancia de II-3 debe recuperarse en la fase intensiva). Oferta en el pool: **434 ítems** (348 con clave oficial), de los cuales **332 siguen disponibles** tras la semana 1. Cubre las **2 primeras semanas** de la rotación y los 3 primeros mini-sims; a partir de la semana 3 hay que reponer: los códigos con más déficit son I-3 (10 sesiones), V-2 (10), II-3/II-4/II-5/I-4/III-5/IV-1+IV-2 (5 c/u), II-1/II-11/II-8/III-8/IV-6+IV-7/V-MED (5 c/u) y, en cola larga, II-2 (ya en 0Q) · II-EMG · I-OCC · V-6 · V-3 · III-9 (2-3 reales cada uno). Plan de reposición: (a) `set_<codigo>_2.json` con moldes 2024-2A→2026-1 + compendios (viernes tarde, gate §3-bis), (b) QX Banqueo/Theomed postests por ÁREA como complemento no filtrable por código (acceso 2027-I **A VERIFICAR (09-sep)**), (c) desde el 8-feb-2027 el 2026-II como cantera de espejos. Detalle por código: `_inventario_banco_por_codigo.json` (sus `_meta.descripcion`, `_meta.rotacion` y `_meta.totales` se leen ahora del propio SQL: `dias_sembrados`, `d1`, `cierre`).

## 5) Cómo añadir un set nuevo (checklist)

1. Nombre `set_<codigo>_<n>.json`, `_meta` con `codigo`, `n`, `descripcion`, `generado`, `LISTA_NEGRA`.
2. Ids únicos con prefijo `N-<codigo sin signos>-<nnn>`; `formato` de 4 valores; `sub_eje` con las claves de `_encaps_ciclo_v3.js`.
3. `verificado_contra` = clave oficial (`CLAVE OFICIAL <proceso> Q<n>`) o cita textual del compendio/norma con número y año; lo no verificable se marca "no verificable contra clave oficial" y se dice explícitamente.
4. Nada del 2026-II (ni viñeta, ni molde, ni cifra-pregunta) hasta el 8-feb-2027.
5. `node DATA/_scripts/gen_encaps_minisim.js --inventario` para ver el nuevo stock; `--banco <fecha> --dry` para comprobar que el sub-eje del día queda cubierto.
