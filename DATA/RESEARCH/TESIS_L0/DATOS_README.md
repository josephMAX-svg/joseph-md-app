# TESIS L0 — Base de datos: ubicación, diccionario de variables, de-identificación y protección

> Palmerton v3b · gap 11 (12-sep-2026). Responde al punto **1.8** de `etica.md` ("base de datos anonimizada +
> diccionario de variables + script de análisis — A VERIFICAR") con lo que hay **en disco y en Supabase**, leído
> el 12-sep-2026 (no de memoria). Lo que sigue sin verificar va marcado **A VERIFICAR (12-sep)**. `etica.md` lo
> mantiene otro agente: este fichero es la fuente para rellenar su fila 8 y su §3 (data availability).

## 1. Dónde está la base (y qué NO hay que subir)

| Copia | Ruta | Contenido | Estado de protección |
|---|---|---|---|
| **Maestra (Excel)** | `D:\motor_apex\datos_tesis_acne.xlsx` (149 KB · modificado 2-abr-2026) | 6 hojas: `📋 PORTADA` · `🗃 BASE DATOS` (cabecera en la fila 4, datos filas 5-1260, **1.256 registros**, fila 1262 = totales) · `📊 KAPPA PILOTO` · `📈 DASHBOARD` · `📝 ESTADÍSTICA APA` · `📋 FLUJO PARTICIPANTES` (diagrama STROBE) | **Pseudonimizada** (ID `P-001…`, sin nombres ni DNI) pero con **cuasi-identificadores**: sección (A-E) + grado + edad + fecha de evaluación en un colegio nombrado → NO se comparte tal cual |
| **Copia en Supabase** | tabla `public.datos_tesis` (proyecto `qacynpqdrorpuegsmtcy`) — columnas `id uuid · id_paciente text · edad int · grado int · seccion text · iga int · cadi_1…cadi_5 int · cadi_total int · created_at` | **55 filas** (count el 12-sep-2026): subconjunto/piloto de la hoja BASE DATOS que insertó `D:\motor_apex\bot_tesis.py` (sin fecha ni observaciones; **con sección**) | **RLS OFF y 0 policies (verificado en `pg_class`/`pg_policies` el 12-sep-2026)** → legible con la anon key que está en el repo (remoto GitHub). Ver §5 |
| **Exportación de-identificada** | `DATA/RESEARCH/TESIS_L0/_deid/datos_tesis_acne_deid.csv` — **865 filas** (solo las evaluadas `P-###`; las 391 filas `A-`/`NC-`/`R-` de no participantes solo cuentan en el manifest) · la genera `DATA/RESEARCH/agentic/export_tesis_deid.py`; la carpeta está **gitignored** salvo README/.gitignore | Ver §3 | Apta para depósito OSF/Zenodo **tras revisión de Joseph**; no se sube automáticamente a ningún sitio |
| Scripts de análisis | `D:\motor_apex\01_pipeline_tesis_acne.py` · `_calcular_kappa.py` · `00_kappa_piloto.py` · `correccion_estadistica.py` (Python 3 · scipy/sklearn/openpyxl según la portada) | Spearman + bootstrap, κ ponderado (cuadrático), tablas APA | Qué script produce exactamente el rs = 0,637 / IC95 % / κ = 0,8125 del manuscrito: **A VERIFICAR (12-sep)** antes de citarlo en el data availability statement |

## 2. Flujo de participantes (hoja `📋 FLUJO PARTICIPANTES` + `📋 PORTADA`, leído 12-sep-2026) — STROBE ítem 13

| Nivel | n | Criterio / razón |
|---|---|---|
| 1 · Población objetivo | **1.256** alumnas matriculadas (3.° 375 · 4.° 449 · 5.° 432) | I.E. Nuestra Señora de Cocharcas, Huancayo · censo 23-mar → 1-abr-2026 (8 días hábiles) |
| 2 · Excluidas por consentimiento | **291** (271 padres no firmaron · 20 alumnas no asintieron) | consentimiento informado parental + asentimiento |
| 3 · Elegibles | **965** | 1.256 − 291 |
| 4 · Ausentes el día de evaluación | **100** (justificadas 40 · injustificadas 60 — el desglose exacto de la hoja: A VERIFICAR (12-sep), la celda está truncada en la lectura) | asistencia |
| 5 · Evaluadas (censo) | **865** | IGA por examen clínico + CADI autoadministrado |
| 6 · Registros incompletos | **80** | excluidos del análisis (CADI incompleto) |
| 7 · Registros completos | **785** | — |
| 8 · IGA = 0 (excluidas) | **469** | sin patología |
| 9 · **Muestra analítica** | **316** | IGA ≥ 1 × CADI |

→ `research_letter_outline.md` §2 dice "865 tamizadas → 316"; el flujo real es **1.256 → 291 → 965 → 100 → 865 → 80 → 785 → 469 → 316**
(lo edita el agente de docs; aquí queda la fuente). La prevalencia 39,8 % ≈ 316/794… **A VERIFICAR (12-sep)** el denominador
exacto que usó la tesis (316/785 = 40,3 %; 316/865 = 36,5 %; ninguno da 39,8 % con estos conteos).

## 3. Diccionario de variables

### 3.1 Hoja `🗃 BASE DATOS` (cabecera fila 4) → CSV de-identificado

| Columna Excel | Variable en el CSV | Tipo / rango | Descripción | ¿Se conserva? |
|---|---|---|---|---|
| A `N°` | — | entero correlativo | nº de fila | **NO** (redundante) |
| B `ID` | `id_hash` | texto, 12 hex | `P-001…P-865` = evaluadas → `sha256(SAL\|ID)[:12]`; la SAL vive en `_deid/.salt` (gitignored) o en la variable `TESIS_SALT` → el mapa ID↔hash no se puede reconstruir desde el CSV ni desde el repo. Los prefijos `A-` (ausente, 100), `NC-` (sin consentimiento parental, 271) y `R-` (la alumna rechazó, 20) marcan filas SIN datos clínicos que **no** van al CSV | SÍ (re-hash; solo `P-`) |
| C `Edad (años)` | `edad` | entero (años) | edad al momento del tamizaje | SÍ |
| D `Grado (1–5)` | `grado` | entero; en los datos: 3, 4, 5 (secundaria) | grado escolar | SÍ |
| E `Sección (A–E)` | — | letra | aula | **NO** (cuasi-identificador) |
| F `IGA (0–4)` | `iga` | ordinal 0-4 | Investigator Global Assessment (examen clínico; gold standard Dr. Ciro Rodríguez; κ ponderado cuadrático 0,8125) | SÍ |
| G `Descripción IGA` | — | texto derivado de F | etiqueta del grado | NO (derivable) |
| H-L `CADI 1…5 (0–3)` | `cadi_1`…`cadi_5` | ordinal 0-3 cada ítem | Cardiff Acne Disability Index, 5 ítems (versión en español utilizada y permiso: **A VERIFICAR (12-sep)** — `MENTORES.md` mensaje 3 a Finlay) | SÍ |
| M `CADI Total` | `cadi_total` | 0-15 (suma H-L) | puntuación total | SÍ |
| N `Clasif. CADI` | `clasif_cadi` | categórica: `Leve` (608) · `Moderado` (194) · `Severo` (60) · `–` → vacío (3) — valores literales de la hoja el 12-sep-2026 | clasificación del impacto; los cortes exactos usados por la tesis: **A VERIFICAR (12-sep)** en `📝 ESTADÍSTICA APA` (no se inventan aquí; el CSV conserva la etiqueta literal) | SÍ |
| O `Registro Completo` | `registro_completo` | `S` (hoja: `✓ Completo`, 785) / `N` (hoja: `⚠ Pendiente`, 80) | registro con IGA + 5 ítems CADI | SÍ |
| P `Fecha Evaluación` | — | fecha | día del tamizaje | **NO** (cuasi-identificador) |
| Q `Observaciones` | — | texto libre | anotaciones de campo | **NO** (puede contener datos identificables) |

### 3.2 Variables derivadas que usa el manuscrito (se recalculan desde el CSV, no se copian)
`acne = iga ≥ 1` · `impacto_moderado_severo` (según los cortes de N) · `rs(iga, cadi_total)` Spearman con IC95 % bootstrap ·
tabla 1 por grado IGA (n, %, edad media/DE, CADI mediana [RIC], % moderado-severo).

## 4. Cómo generar (y revisar) la exportación de-identificada

```bat
cd D:\joseph-md-app\DATA\RESEARCH\agentic
python export_tesis_deid.py --dry-run          REM cuenta y compara con la portada (1.256 → 291 → 100 → 865 → 785 → 316) sin escribir
python export_tesis_deid.py                    REM escribe ..\TESIS_L0\_deid\datos_tesis_acne_deid.csv (865 filas) + _manifest.json (+ .salt)
```
Ejecutado el 12-sep-2026: los 7 conteos coinciden con la portada; CSV de 865 filas × 12 columnas, 865 `id_hash` únicos,
`registro_completo` S=785/N=80, IGA 0=521 · 1=126 · 2=116 · 3=67 · 4=35 (evaluadas); edad 13-18; grado 3-5 (24 evaluadas sin grado en la hoja).
- Stdlib-only (lee el `.xlsx` como ZIP OOXML): no necesita openpyxl.
- `_manifest.json` lleva n, n completos, n IGA ≥ 1, sha256 del CSV y las columnas — **sin datos individuales**; es lo que se
  cita en el data availability statement junto al DOI del depósito.
- Antes de depositar: abrir el CSV y comprobar que **no** queda ninguna columna de las marcadas NO; comprobar k-anonimato
  mínimo (ninguna combinación edad × grado con n = 1 debería ser identificable sin sección/fecha — si aparece alguna, agrupar
  edad en tramos antes de depositar).

## 5. Protección de la copia en Supabase (`datos_tesis`) — DECISIÓN DE JOSEPH

`datos_tesis` tiene RLS **OFF** y **0 policies**: cualquiera con la anon key (que está en el repo) puede leer los 1.256
registros (con sección). Tres salidas, en orden de preferencia; **ninguna se aplicó** porque puede romper `agente_estudio`
(`D:\motor_apex\bot_tesis.py` / pipeline `01_pipeline_tesis_acne.py` leen o escriben la tabla — A VERIFICAR (12-sep) con
qué key: si usan la anon key, la opción A los deja sin acceso; con service_role siguen funcionando):

```sql
-- OPCIÓN A (recomendada): cerrar el acceso anónimo. Sin policies, anon/authenticated no ven filas; service_role sigue leyendo.
ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;

-- OPCIÓN B: borrar la copia (la maestra sigue en D:\motor_apex; el CSV de-identificado cubre el depósito). Irreversible.
-- DROP TABLE public.datos_tesis;

-- OPCIÓN C (NO protege, solo iguala el patrón de las tablas de estudio): RLS ON + policy permisiva.
-- ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all" ON public.datos_tesis FOR ALL USING (true) WITH CHECK (true);
```
Marco: Ley 29733 (datos de salud de menores = datos sensibles); ver `etica.md` §2. Cualquiera de las tres debe estar hecha
**antes del primer envío (T-8)** y constar en `etica.md` fila 8.

## 6. Frase de data availability (para T-7, sin "on request")
> "The de-identified dataset (age, school grade, IGA, CADI items and total; direct and quasi-identifiers removed, IDs
> re-hashed) and the analysis code are deposited at [OSF/Zenodo, DOI A VERIFICAR (12-sep)] under a CC BY 4.0 licence."
