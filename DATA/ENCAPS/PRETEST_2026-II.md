# 🧪 PRE-TEST DIAGNÓSTICO 2026-II — arranque de la fase intensiva ENCAPS 2027-I

> **Cuándo:** viernes **5-feb-2027** (primer viernes de la fase intensiva; D1 intensiva = lun 1-feb). Es el primero de los simulacros 100Q de viernes (`FASE_INTENSIVA_2027-I.md`).
> **Qué:** el examen real **ENCAPS/SERUMS 2026-II** (09-ago-2026), 100 preguntas, **clave oficial verificada 100/100**, que Joseph **no rindió** y que está en **LISTA NEGRA** de generación desde el 05-sep-2026 (`PROTOCOLO_GENERACION_PREGUNTAS.md §3-bis-LN`). Es la única medición limpia posible del nivel real antes de las 7 semanas intensivas.
> **Material:** `_examen_2026-2_items.json` (100 ítems A-D + clave + código v3 + formato) y `exams_txt/2026-2.txt`. Runner: `node DATA/_scripts/gen_encaps_minisim.js --pretest` → `BANCO_PROPIO/pretest_2026-II.html` (**generarlo el jueves 4-feb, no antes**; el generador se niega si no se pasa `--pretest`).
> **Umbral de arranque: ≥ 70/100** (el que fija `PROTOCOLO_HORA_MANTENIMIENTO.md`: llegar a febrero desde ~70%).

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
| Post-examen | 30 min de corrección por código + 15 min de registro. La tutoría (fallos → tarjetas/APEX) es el lunes 8-feb |

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
4. El generador de la intensiva lee el JSON de la ronda y **re-ordena solo** las semanas 2-5: `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-01 <fecha-examen> --pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json` (la fecha de examen real la fija la convocatoria SERUMS 2027-I, ver `SENALES_2027-I.md`).

## 5) Registro: ronda `PRETEST_2026-II` en `_registro_resoluciones.json` (append, no reescribir)

El runner exporta este bloque (botón "Exportar JSON"); se guarda como `TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json` **y** se apenda a `rondas[]` del registro. Esquema (compatible con las rondas de julio, con `confianza` obligatoria):

```json
{
  "id": "PRETEST_2026-II",
  "fecha": "2027-02-05",
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
- `error` ∈ CCSN · CONCEPTO · CRONOLOGIA · CONTEXTO · OLVIDO (solo si `ok=false`); `causa` = una línea con el razonamiento que lo llevó ahí; `ruta` = ANKI · OBSIDIAN · AMBOS. Estos tres campos se rellenan en la tutoría del lunes 8-feb, no el viernes.
- `resumen_por_subtema` del registro lo recalcula el sistema de tracking desde `rondas[]`; aquí no se edita a mano.

## 6) Qué NO hacer

- No "estudiar el 2026-II" antes: cualquier lectura previa invalida el pre-test (la clasificación por código y la clave están en ficheros que **no se abren** hasta el 5-feb; las cifras del deck `ENCAPS::Cifras` son datos normativos y no revelan viñeta ni distractores).
- No repetirlo como simulacro después: una vez rendido, el 2026-II pasa a banco espejo para las semanas 2-5 (viñetas espejo, no las mismas preguntas).
- No comparar contra el 2026-I rendido en julio-agosto 2026: aquel se contaminó como cantera de moldes; este es la única línea base limpia.
