# 🧪 PRE-TEST DIAGNÓSTICO 2026-II — arranque de la fase intensiva ENCAPS 2027-I

> **Cuándo:** el **primer viernes de la fase intensiva**, que con el régimen **v5.18 arranca DESPUÉS del examen Step 1 del jue 18-feb-2027** → **vie 19-feb-2027** si Joseph elige D1 = vie 19-feb (default de fecha de `gen_encaps_minisim.js --pretest`; ese viernes es a la vez el D1 de la intensiva y el pre-test) o **vie 26-feb** si elige D1 = lun 22-feb (lo que siembra `gen_encaps_intensivo_2027.js` con su D1 por defecto) — al decidir hay que alinear los dos scripts (`PENDIENTES_JOSEPH.md` ⚪ A). ⚠ El vie 5-feb del diseño original **no sirve**: con el corrimiento rígido es el **D87 del Step 1** (Free 120) y el **día 87 del mantenimiento** (mini-sim); tampoco el vie 12-feb, que es el **D92 del Step 1** y el **día 92 = último mini-sim del mantenimiento** (el D94, última sesión de banco, es el mar 16-feb y el D95 = D-1 real el mié 17-feb). El pre-test sigue siendo en viernes. Es el primero de los simulacros 100Q de viernes (`FASE_INTENSIVA_2027-I.md`).
> *(v5.17, 30-sep: examen Step 1 mar 16-feb → pre-test vie 19-feb si D1 = mié 17-feb, o vie 26-feb si D1 = lun 22-feb; generado el vie 12-feb = D94 de entonces. v5.16, 26-sep: examen Step 1 jue 11-feb → pre-test vie 12-feb si D1 = vie 12-feb, o vie 19-feb si D1 = lun 15-feb. v5.15, 22-sep: examen Step 1 lun 8-feb → pre-test vie 12-feb, o vie 19-feb si D1 = lun 15-feb en vez de mar 9-feb; el vie 5-feb era el D95 = D-1.)*
> **Qué:** el examen real **ENCAPS/SERUMS 2026-II** (09-ago-2026), 100 preguntas, **clave oficial verificada 100/100**, que Joseph **no rindió** y que está en **LISTA NEGRA** de generación desde el 05-sep-2026 (`PROTOCOLO_GENERACION_PREGUNTAS.md §3-bis-LN`). Es la única medición limpia posible del nivel real antes de las 7 semanas intensivas.
> **Material:** `_examen_2026-2_items.json` (100 ítems A-D + clave + código v3 + formato) y `exams_txt/2026-2.txt`. Runner: `node DATA/_scripts/gen_encaps_minisim.js --pretest` → `BANCO_PROPIO/pretest_2026-II.html` (**generarlo el mar 16-feb-2027, no antes** — v5.18: ese día es el **D94 del Step 1**, la última sesión de banco: correr el script por la tarde, fuera del bloque (el mié 17-feb es D-1 y el jue 18-feb el examen: ninguno de los dos sirve); la fecha por defecto del runner es el vie 19-feb (`2027-02-19`): si Joseph lo rinde el vie 26-feb, pasar `2027-02-26` y basta re-correrlo el jueves anterior (jue 25-feb). El generador se niega si no se pasa `--pretest`. *(v5.15: generarlo el jue 4-feb = D94 de entonces; v5.16: mar 9-feb; v5.17: vie 12-feb.)*).
> **Umbral de arranque: ≥ 70/100** (el que fija `PROTOCOLO_HORA_MANTENIMIENTO.md`: llegar a febrero desde ~70%).
> **Re-fechado 3-oct-2026 (régimen v5.18):** el mantenimiento se re-sembró con **D1 = lun 5-oct-2026 · 92 días · cierre vie 12-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.16`, backup `study_schedule_bk_1003`; los backups anteriores, del `bk_0930` de v5.17 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudiaron el jue 1 ni el vie 2 de octubre (decimoséptimo corrimiento, 31-ago→5-oct, 25 hábiles perdidos). **4.º CORRIMIENTO RÍGIDO** (Joseph, sáb 3-oct: «todo inicia el 5 corre lo que tengas que correr para que todo inicie el 5»): solo corren los días — ningún tema se toca ni se recorta —, así que el mantenimiento conserva sus 92 sesiones y su cierre pasa del mié 10-feb (v5.17) al **vie 12-feb**. El USMLE Step 1 acaba el **mié 17-feb-2027 (D95 = último día del plan y D-1 REAL; D94 mar 16-feb = última sesión de banco; sin finde entre D94 y D95)** y el examen pasa al **jue 18-feb-2027** → **los días 93-96 de la cuenta ENCAPS (lun 15, mar 16, mié 17 y jue 18-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **vie 19-feb (día 97)** o el **lun 22-feb (día 98; D1 por defecto del script)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-19 <fecha-examen>` (o `2027-02-22`) — decisión de Joseph. El pre-test se rinde el primer viernes de la intensiva (**vie 19-feb** o **vie 26-feb**) y se genera el **mar 16-feb** (D94, por la tarde) o el jueves anterior al viernes en que se rinda. El escenario CORTO (examen dom 14-mar) sigue en pie.
> ⏸ *(Histórico, superado por el de 3-oct)* **Re-fechado 30-sep-2026 (régimen v5.17):** el mantenimiento se re-sembró con **D1 = jue 1-oct-2026 · 92 días · cierre mié 10-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.15`, backup `study_schedule_bk_0930`; los backups anteriores, del `bk_0926` de v5.16 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudiaron el lun 28, el mar 29 ni el mié 30 de septiembre (decimosexto corrimiento, 31-ago→1-oct, 23 hábiles perdidos). **3.er CORRIMIENTO RÍGIDO:** solo corren los días — ningún tema se toca ni se recorta —, así que el mantenimiento conserva sus 92 sesiones y su cierre pasa del vie 5-feb (v5.16) al **mié 10-feb**. El USMLE Step 1 acaba el **lun 15-feb-2027 (D95 = último día del plan y D-1 REAL; D94 vie 12-feb = última sesión de banco; sáb 13 y dom 14-feb libres entre D94 y D95)** y el examen pasa al **mar 16-feb-2027** → **los días 93-96 de la cuenta ENCAPS (jue 11, vie 12, lun 15 y mar 16-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **mié 17-feb (día 97)** o el **lun 22-feb (día 100; D1 por defecto del script)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-17 <fecha-examen>` (o `2027-02-22`) — decisión de Joseph. El pre-test se rinde el primer viernes de la intensiva (**vie 19-feb** o **vie 26-feb**) y se genera el **vie 12-feb** (D94, por la tarde) o el jueves anterior al viernes en que se rinda. El escenario CORTO (examen dom 14-mar) sigue en pie.
> ⏸ *(Histórico, superado por el de 30-sep)* **Re-fechado 22-sep-2026 (régimen v5.15):** el mantenimiento se re-sembró con **D1 = mié 23-sep-2026 · 92 días · cierre mar 2-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.13`, backup `study_schedule_bk_0922`; los `bk_0919` de v5.14, `bk_0916` de v5.13, `bk_0915` de v5.12, `bk_0914` de v5.11, `bk_0912` de v5.10, `bk_0910` de v5.9, `bk_0909` de v5.8 y `bk_0908` de v5.7 siguen intactos) porque tampoco se estudiaron el lun 21 ni el mar 22 de septiembre (decimocuarto corrimiento, 31-ago→23-sep, 17 hábiles perdidos). **CORRIMIENTO RÍGIDO:** solo corren los días — ningún tema se toca ni se recorta, y donde había fin clavado se amplían días, así que el mantenimiento conserva sus 92 sesiones y su cierre se corre del vie 29-ene al **mar 2-feb**. **El pre-test SÍ se mueve:** el vie 5-feb es ahora el D95 = D-1 del Step 1, así que pasa al **primer viernes de la intensiva (vie 12-feb, o vie 19-feb si D1 = lun 15-feb)**; se genera el **jue 4-feb** (D94 del Step 1, última sesión de banco: correr el script por la tarde — el generador solo necesita `--pretest`). Lo que también cambia: el USMLE Step 1 acaba el **vie 5-feb-2027 (D95 = D-1 dentro del plan; D94 jue 4-feb = última sesión de banco; sáb 6 y dom 7-feb libres entre D95 y el examen)** y el examen pasa al **lun 8-feb-2027** — es decir, **los días 93-96 de la cuenta ENCAPS (mié 3 → lun 8-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **mar 9-feb (día 97)** o el **lun 15-feb (día 101)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-09 <fecha-examen>` (o `2027-02-15`); el escenario CORTO (examen dom 14-mar) sigue en pie. *(v5.14, 19-sep: D1 lun 21-sep · 92 días · bk_0919 · Step 1 D95 = mié 3-feb, examen jue 4-feb, pre-test propuesto el vie 5-feb. v5.13, 16-sep: D1 jue 17-sep · 94 días · bk_0916 · Step 1 D95 = lun 1-feb, examen mar 2-feb, intensiva propuesta desde el mié 3-feb.)*
> **Fecha del examen (05-sep-2026):** ASUMIDA, no confirmada. Las fechas que circulan (26-mar y 28-mar-2027) caen en Semana Santa 2027 (Jue 25 · Vie 26 · Pascua dom 28-mar, verificado) y son imposibles; hasta la convocatoria SERUMS 2027-I (`SENALES_2027-I.md`) se planifica con el escenario CORTO (examen dom 14-mar-2027 → intensiva de 6 semanas en el diseño original; v5.18: 16 días hábiles D1→D-1 con D1 = vie 19-feb o 15 con D1 = lun 22-feb, `FASE_INTENSIVA_2027-I.md` §0; v5.17: 18 / 15). El pre-test es siempre el **primer viernes de la intensiva** y no cambia con el escenario de examen ENCAPS (v5.18: vie 19-feb si D1 = vie 19-feb, o vie 26-feb si D1 = lun 22-feb — `FASE_INTENSIVA_2027-I.md` §0-§1; v5.17: vie 19-feb si D1 = mié 17-feb, o vie 26-feb; v5.15: vie 12-feb, o vie 19-feb si D1 = lun 15-feb).

---

## 1) Condiciones (modo examen estricto)

| Parámetro | Valor |
|---|---|
| Preguntas | 100 (orden original 1-100, sin barajar: el orden real también entrena la fatiga del examen) |
| Tiempo | **72 s/Q · 120 min totales**, reloj corriendo, sin pausa (el runner no tiene botón de pausa) |
| Hora | viernes por la mañana, en el bloque principal (la franja exacta la fija la reestructuración de febrero; el simulacro ocupa ~2 h + 45 min de corrección) |
| Material | NADA: sin compendio, sin Anki, sin celular. Solo hoja de respuestas |
| Por ítem | letra + **confianza** 1 (adivinada) · 2 (dudosa) · 3 (segura) — sin confianza el ítem no cuenta como ciego |
| Corrección | **solo al final** (el runner no muestra la clave hasta cerrar las 100) |
| Post-examen | 30 min de corrección por código + 15 min de registro. La tutoría (fallos → tarjetas/APEX) es el **lunes siguiente** (v5.18, igual que en v5.17: lun 22-feb si el pre-test es el vie 19-feb, lun 1-mar si es el vie 26-feb; v5.15: lun 15-feb tras el vie 12-feb) |

Regla de honestidad Palmerton: un acierto con confianza 1 **no es conocimiento** (`acierto_por_suerte = true`). La métrica que manda es el **% CIEGO REAL = correctas con confianza 3 / 100**.

## 2) Hoja de respuestas (si se rinde en papel; el runner HTML la genera sola)

Formato: `n | letra | conf(1-3)` en 4 columnas de 25. Al terminar se tipea en el runner (modo "hoja") o directamente en el bloque JSON del §5.

| n | L | c | n | L | c | n | L | c | n | L | c |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | 26 | | | 51 | | | 76 | | |
| 2 | | | 27 | | | 52 | | | 77 | | |
| 3 | | | 28 | | | 53 | | | 78 | | |
| 4 | | | 29 | | | 54 | | | 79 | | |
| 5 | | | 30 | | | 55 | | | 80 | | |
| 6 | | | 31 | | | 56 | | | 81 | | |
| 7 | | | 32 | | | 57 | | | 82 | | |
| 8 | | | 33 | | | 58 | | | 83 | | |
| 9 | | | 34 | | | 59 | | | 84 | | |
| 10 | | | 35 | | | 60 | | | 85 | | |
| 11 | | | 36 | | | 61 | | | 86 | | |
| 12 | | | 37 | | | 62 | | | 87 | | |
| 13 | | | 38 | | | 63 | | | 88 | | |
| 14 | | | 39 | | | 64 | | | 89 | | |
| 15 | | | 40 | | | 65 | | | 90 | | |
| 16 | | | 41 | | | 66 | | | 91 | | |
| 17 | | | 42 | | | 67 | | | 92 | | |
| 18 | | | 43 | | | 68 | | | 93 | | |
| 19 | | | 44 | | | 69 | | | 94 | | |
| 20 | | | 45 | | | 70 | | | 95 | | |
| 21 | | | 46 | | | 71 | | | 96 | | |
| 22 | | | 47 | | | 72 | | | 97 | | |
| 23 | | | 48 | | | 73 | | | 98 | | |
| 24 | | | 49 | | | 74 | | | 99 | | |
| 25 | | | 50 | | | 75 | | | 100 | | |

Clave oficial (solo para corregir, NO abrir antes): `_examen_2026-2_items.json → _meta.clave_oficial`.

## 3) Corrección por CÓDIGO contra el vector v3

Cada ítem ya trae su `codigo` (taxonomía v3) y su `formato_pretest`. La brecha se mide en **tres capas**:

### 3.1 Por ÁREA (vector v3: II 30 · I 27 · V 21 · III 13 · IV 9)

| Área | n en 2026-II | correctas | % bruto | correctas seguras (conf 3) | **% ciego** | brecha vs 85% | lectura |
|---|---|---|---|---|---|---|---|
| II Cuidado Integral | 30 | | | | | | |
| I Salud Pública | 26 | | | | | | |
| V Gestión | 19 | | | | | | |
| III Ética/Intercult. | 13 | | | | | | |
| IV Investigación | 12 | | | | | | |
| **TOTAL** | **100** | | | | | | ≥70 bruto para arrancar |

### 3.2 Por CÓDIGO (33 códigos tocados; n real del 2026-II · V = viñeta · D = directa conceptual · C = cifra)

| Cód | n | V | D | C | preguntas | ok | ok seguras | % ciego | índice de brecha = n × (1 − %ciego) | slots extra sem 2-5 |
|---|---|---|---|---|---|---|---|---|---|---|
| **V-2** ★ | 11 | 8 | 3 | 0 | 3, 8, 11, 19, 28, 62, 82, 83, 89, 94, 100 | | | | | |
| **I-3** ★ | 11 | 7 | 3 | 1 | 5, 7, 25, 32, 34, 41, 42, 49, 65, 68, 97 | | | | | |
| **IV-1+IV-2** ★ | 7 | 3 | 4 | 0 | 18, 21, 39, 44, 56, 63, 66 | | | | | |
| **I-4** ★ | 6 | 4 | 1 | 1 | 6, 14, 20, 37, 51, 91 | | | | | |
| **II-5** ★ | 5 | 2 | 3 | 0 | 1, 27, 96, 98, 99 | | | | | |
| **II-3** ★ | 5 | 4 | 0 | 1 | 4, 22, 23, 33, 79 | | | | | |
| IV-6+IV-7 | 5 | 1 | 4 | 0 | 9, 35, 60, 75, 87 | | | | | |
| **III-5** ★ | 5 | 1 | 4 | 0 | 29, 38, 64, 74, 95 | | | | | |
| **II-4** ★ | 4 | 1 | 2 | 1 | 47, 52, 73, 78 | | | | | |
| II-2 | 3 | 2 | 1 | 0 | 24, 31, 61 | | | | | |
| III-8 | 3 | 1 | 2 | 0 | 30, 81, 86 | | | | | |
| V-MED | 3 | 2 | 1 | 0 | 69, 71, 76 | | | | | |
| I-5+I-6 | 2 | 0 | 2 | 0 | 13, 92 | | | | | |
| III-3 ⚡ | 2 | 2 | 0 | 0 | 15, 57 | | | | | |
| II-EMG ⚡ | 2 | 1 | 0 | 1 | 16, 59 | | | | | |
| II-8 ↩ | 2 | 0 | 1 | 1 | 17, 90 | | | | | |
| II-6 | 2 | 0 | 2 | 0 | 26, 67 | | | | | |
| I-10 ⚡ | 2 | 1 | 1 | 0 | 40, 45 | | | | | |
| II-10 | 2 | 2 | 0 | 0 | 43, 80 | | | | | |
| I-11+I-12 | 2 | 1 | 1 | 0 | 48, 88 | | | | | |
| I-OCC ⚡ | 2 | 1 | 1 | 0 | 50, 54 | | | | | |
| II-11 ↩ | 2 | 1 | 1 | 0 | 53, 85 | | | | | |
| V-6 ⚡ | 2 | 0 | 2 | 0 | 84, 93 | | | | | |
| V-3 | 1 | 0 | 1 | 0 | 2 | | | | | |
| V-1 | 1 | 1 | 0 | 0 | 10 | | | | | |
| III-2 | 1 | 1 | 0 | 0 | 12 | | | | | |
| II-9 | 1 | 0 | 1 | 0 | 36 | | | | | |
| II-7 | 1 | 0 | 1 | 0 | 46 | | | | | |
| II-1 ↩ | 1 | 0 | 0 | 1 | 55 | | | | | |
| V-RRHH | 1 | 0 | 1 | 0 | 58 | | | | | |
| III-9 | 1 | 0 | 1 | 0 | 70 | | | | | |
| I-1 | 1 | 1 | 0 | 0 | 72 | | | | | |
| III-1 | 1 | 1 | 0 | 0 | 77 | | | | | |

★ = crítico v3 · ⚡ = emergente 2026-II · ↩ = ALTA con flag de rebote. (Las 6 viñetas con respuesta numérica — Q4, 59, 78, 81, 83, 85 — cuentan en la columna V y además en la fila "viñeta+cifra" de 3.3.)

### 3.3 Por FORMATO (lección L2 del 2026-II: el riesgo es el formato, no el tema)

| Formato (`formato_pretest`) | n | ok | ok seguras | % ciego | qué revela un fallo |
|---|---|---|---|---|---|
| Viñeta / escenario | 43 | | | | reconocimiento de conducta (CCSN / CONTEXTO) |
| Viñeta + cifra (Q4, 59, 78, 81, 83, 85) | 6 | | | | conducta correcta pero número olvidado (OLVIDO) |
| Directa conceptual | 44 | | | | definición textual de norma (CONCEPTO) |
| Cifra pura (Q5, 16, 23, 52, 55, 90, 91) | 7 | | | | recall de dosis/plazos (OLVIDO) → deck ENCAPS::Cifras |

Tipo de error por ítem fallado: **CCSN** (confundió concepto vecino) · **CONCEPTO** (no lo sabía) · **CRONOLOGÍA** (orden/tiempo) · **CONTEXTO** (leyó mal la viñeta) · **OLVIDO** (lo sabía, no lo recuperó).

## 4) Lectura del resultado y siembra de las semanas 2-5

| % bruto | % ciego | Veredicto | Qué cambia en `FASE_INTENSIVA_2027-I.md` |
|---|---|---|---|
| ≥ 80 | ≥ 70 | base sólida | semanas 2-5 = críticos en 1 pasada + **cola larga y rebotes suben a 2 slots/sem** desde la semana 3 |
| 70-79 | 55-69 | **arranque previsto** | plan tal cual: los 16 slots L-J de las semanas 2-5 se reparten por el **índice de brecha** (tabla 3.2, orden descendente); ningún crítico baja de 1 slot |
| 60-69 | < 55 | brecha en críticos | las semanas 2-5 se cierran al 100% en los 8 críticos: **2 slots por crítico** ordenados por brecha; cola larga solo en los mini-bloques de 5Q; drill de cifras sube a 15 min |
| < 60 | — | alarma | ídem anterior + la semana 6 se convierte en 3.ª pasada de los 4 códigos peores; se avisa a Claude para re-sembrar con `gen_encaps_intensivo_2027.js <D1> <examen> --pretest <json>` |

Reglas fijas independientes del puntaje:
1. Todo fallo tipo **OLVIDO** o de formato cifra → tarjeta en `TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` **esa misma tarde** (regla de `CIFRAS_CRITICAS_2027-I.md`).
2. Todo fallo **CCSN** → ficha de 1 página del par confundido (ruta OBSIDIAN) antes del banco de ese código en las semanas 2-5.
3. Los códigos con **100 % seguro** no reciben slot extra: solo repaso multi-temporal D-7 / D-14.
4. El generador de la intensiva lee el JSON de la ronda y **re-ordena solo** las semanas 2-5: `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-19 <fecha-examen> --pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json` (v5.18: `2027-02-19` = primer hábil tras el examen Step 1 del jue 18-feb, o `2027-02-22` — D1 por defecto del script — si Joseph prefiere arrancar el lunes siguiente; con los dos el barrido de las semanas 2-5 arranca el lun 1-mar; la fecha de examen real la fija la convocatoria SERUMS 2027-I, ver `SENALES_2027-I.md`. v5.17: `2027-02-17` o `2027-02-22` · v5.15: `2027-02-09` o `2027-02-15`).

## 5) Registro: ronda `PRETEST_2026-II` en `_registro_resoluciones.json` (append, no reescribir)

El runner exporta este bloque (botón "Exportar JSON"); se guarda como `TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json` **y** se apenda a `rondas[]` del registro. Esquema (compatible con las rondas de julio, con `confianza` obligatoria):

```json
{
  "id": "PRETEST_2026-II",
  "fecha": "2027-02-19",
  "bloque": "pretest_intensiva",
  "modo": "modo_examen_100q_72s_solucion_al_final",
  "fuente_preguntas": "DATA/ENCAPS/_examen_2026-2_items.json (examen real 2026-II · clave oficial 100/100 · LISTA NEGRA levantada al cerrar esta ronda)",
  "vector_referencia": "v3 II30·I27·V21·III13·IV9",
  "puntaje": "NN/100",
  "pct_ciego": 0,
  "tiempo_total_min": 0,
  "por_area": { "I": {"n": 26, "ok": 0, "seguras": 0}, "II": {"n": 30, "ok": 0, "seguras": 0}, "III": {"n": 13, "ok": 0, "seguras": 0}, "IV": {"n": 12, "ok": 0, "seguras": 0}, "V": {"n": 19, "ok": 0, "seguras": 0} },
  "por_codigo": { "V-2": {"n": 11, "ok": 0, "seguras": 0, "brecha": 0} },
  "por_formato": { "viñeta": {"n": 43, "ok": 0, "seguras": 0}, "viñeta+cifra": {"n": 6, "ok": 0, "seguras": 0}, "directa": {"n": 44, "ok": 0, "seguras": 0}, "cifra": {"n": 7, "ok": 0, "seguras": 0} },
  "preguntas": [
    { "n": 1, "codigo": "II-5", "subtema": "salud integral adolescente áreas riesgo", "tipo": "viñeta", "formato_pretest": "viñeta",
      "tu": "A", "correcta": "A", "ok": true, "confianza": 3, "acierto_por_suerte": false, "seg": 41,
      "error": null, "causa": null, "ruta": null }
  ]
}
```

- `confianza`: 1 adivinada · 2 dudosa · 3 segura. `acierto_por_suerte = ok && confianza == 1`. `seg` = segundos empleados (el runner los mide).
- `error` ∈ CCSN · CONCEPTO · CRONOLOGIA · CONTEXTO · OLVIDO (solo si `ok=false`); `causa` = una línea con el razonamiento que lo llevó ahí; `ruta` = ANKI · OBSIDIAN · AMBOS. Estos tres campos se rellenan en la tutoría del lunes siguiente (v5.18: lun 22-feb si el pre-test es el vie 19-feb, lun 1-mar si es el vie 26-feb), no el viernes.
- `resumen_por_subtema` del registro lo recalcula el sistema de tracking desde `rondas[]`; aquí no se edita a mano.

## 6) Qué NO hacer

- No "estudiar el 2026-II" antes: cualquier lectura previa invalida el pre-test (la clasificación por código y la clave están en ficheros que **no se abren** hasta el día del pre-test (v5.18: vie 19-feb o vie 26-feb); las cifras del deck `ENCAPS::Cifras` son datos normativos y no revelan viñeta ni distractores).
- No repetirlo como simulacro después: una vez rendido, el 2026-II pasa a banco espejo para las semanas 2-5 (viñetas espejo, no las mismas preguntas).
- No comparar contra el 2026-I rendido en julio-agosto 2026: aquel se contaminó como cantera de moldes; este es la única línea base limpia.
