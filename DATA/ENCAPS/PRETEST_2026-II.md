# 🧪 PRE-TEST DIAGNÓSTICO 2026-II — arranque de la fase intensiva ENCAPS 2027-I

> ## ✅ v6.01 VIGENTE (corrimiento al lun 12-oct-2026, sáb 10-oct) — misma fecha, nueva numeración
> - **Cuándo: vie 8-ene-2027, 07:15-09:15 = `dia` 62** de la cuenta ENCAPS (v6.01: el mantenimiento F1 es `dia` 1-57 desde el lun 12-oct y la intensiva se
>   renumeró `dia` 58-107 con las MISMAS fechas). Fila `pretest` re-sembrada en Supabase el 10-oct (huella v2 107 · `1795d281…`); default de
>   `gen_encaps_minisim.js --pretest` = `encaps.pretest` (`2027-01-08`) y Calendar `27bs58ee0ke180ht2rh6mgvft0` → ✅ ALINEADOS. La nota del PRE-TEST se guarda
>   con `sim_n` = 62 (`study_sim_scores`).
> - **Comando de regeneración tras el pre-test (v6.01):** `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-01-04 2027-03-14 --carril-b
>   DATA/ENCAPS/_carril_b_v520_61-92.json --pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json --desde 2027-01-11` (sin `--base`: el default ya es
>   2026-10-12; backup por defecto `study_schedule_bk_v601_int_<AAAAMMDD de ese día>`; `--pendientes-f1` por defecto = `DATA/ENCAPS/_pendientes_f1.json`, que
>   conserva la reposición F1 del 17/18/22-feb) → revisar → `execute_sql`. Re-ordena los 32 slots de barrido (lun 11-ene → jue 4-mar, `dia` 63-101).
> - Lo demás del bloque v6.00 (generar el HTML antes del lun 4-ene, LISTA NEGRA hasta el 8-ene, tutoría sáb 9 / dom 10-ene o lun 11-ene antes de las 07:15,
>   lectura del resultado) sigue igual.

> ## ⏸ v6.00 (REESTRUCTURACIÓN ANUAL, 6-oct-2026) — vigente salvo el `dia` y el comando, que corrige el bloque v6.01 de arriba
> - **Cuándo:** **vie 8-ene-2027, 07:15-09:15** = **dia 65** de la cuenta ENCAPS *(⏸ v6.00 · v6.01: dia 62)* = viernes de la S1 de la intensiva (lun 4-ene → vie 12-mar; examen ENCAPS
>   **dom 14-mar-2027 PROVISIONAL**). Fila `pretest` ya sembrada en Supabase (6-oct, `dia` 61-110) *(⏸ v6.00 · v6.01: re-sembrada el 10-oct, `dia` 58-107)* · default de `gen_encaps_minisim.js --pretest` =
>   `_fechas_v6.json → encaps.pretest` (`2027-01-08`) · Calendar `27bs58ee0ke180ht2rh6mgvft0` (vie 8-ene 07:15-09:15) → ✅ ALINEADOS. Corrección por código + registro
>   el mismo viernes, tras el SIM (como los viernes del núcleo: 09:30-11:00 corrección · 11:00-12:00 dos códigos peores).
> - **Generar el HTML** (`node DATA/_scripts/gen_encaps_minisim.js --pretest` → `BANCO_PROPIO/pretest_2026-II.html`) **antes del lun 4-ene** (en F1 o en la
>   transición 31-dic → 3-ene); generarlo no es abrirlo: no se abre hasta el vie 8-ene. **LISTA NEGRA del 2026-II hasta el pre-test** (desde ese día sale de ella).
> - **Tutoría** (campos `error` / `causa` / `ruta`) **y regeneración** de la intensiva: el **fin de semana sáb 9 / dom 10-ene** (el sábado, fuera del 07:15-09:15
>   de revisión semanal + STEP 1 VIVO) o, como tarde, el **lun 11-ene antes del loop de las 07:15** (primer slot de barrido del núcleo). Comando (cabecera de
>   `gen_encaps_intensivo_2027.js` y bloque v6.00 de `FASE_INTENSIVA_2027-I.md`; `--carril-b` es obligatorio en TODAS las ejecuciones):
>   `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-01-04 2027-03-14 --base 2026-10-07 --carril-b DATA/ENCAPS/_carril_b_v520_61-92.json --pretest
>   DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json --desde 2027-01-11` (backup por defecto `study_schedule_bk_v600_int_<AAAAMMDD de ese día>`; *(⏸ v6.00 · v6.01: sin `--base`; backup `study_schedule_bk_v601_int_<AAAAMMDD>`)* `--bk`
>   aborta si la tabla ya existe) → revisar → `execute_sql`. Re-ordena los **32 slots de barrido** (lun 11-ene → jue 4-mar) por índice de brecha conservando 32
>   slots, cada crítico ≥ 1 y «código del slot ≠ código del carril B de ese día»; las filas ≤ vie 8-ene no se tocan.
> - **Lectura del resultado (§4) en v6:** ya no hay «solo 4 slots»: el veredicto reparte los 32 slots del núcleo; tras el pre-test quedan **8 SIM 100Q** (vie
>   15-ene → vie 5-mar) + cola (lun 8-mar profunda · mar 9 / mié 10 repaso final · jue 11-mar dress rehearsal 11:00-13:00 · vie 12-mar medio día).
> - ⏸ **SUPERSEDIDO (v5.20 y anteriores, se conserva abajo como historial):** pre-test **vie 26-feb** (dia 100) · generar el HTML el **jue 18-feb** (D94) ·
>   tutoría / barrido desde el **lun 1-mar** · examen mié 10-mar · intensiva 23-feb → 9-mar · 4 slots de barrido · y el comando viejo
>   `gen_encaps_intensivo_2027.js 2027-02-23 2027-03-10 --pretest … --bk study_schedule_bk_intensivo_<AAAAMMDD>`.

> ⏸ *(v5.20, SUPERSEDIDO por el bloque v6.00 de arriba)* **Cuándo:** el **primer viernes de la fase intensiva**, que con el régimen **v5.20 (DEFINITIVO) arranca el mar 23-feb-2027, día siguiente al examen Step 1 del lun 22-feb-2027** → **vie 26-feb-2027 = día 100** de la cuenta ENCAPS = default de fecha de `gen_encaps_minisim.js --pretest` (`2027-02-26`) y fila `pretest` **YA SEMBRADA** en Supabase por `gen_encaps_intensivo_2027.js` (6-oct, días 97-107, backup `study_schedule_bk_intensivo_1006`): ✅ ALINEADOS. ⚠ El vie 5-feb del diseño original **no sirve**: con el corrimiento rígido es el **D85 del Step 1** (NBME 33) y el **día 85 del mantenimiento** (mini-sim #85); tampoco el vie 12-feb (**D90 del Step 1**, **día 90 = último mini-sim del mantenimiento**) ni el vie 19-feb (**D95 del Step 1** = último día del plan; el D94, última sesión de banco, es el jue 18-feb y el examen Step 1 el lun 22-feb). El pre-test sigue siendo en viernes. Es el primero de los **dos** simulacros 100Q de viernes de la intensiva (el otro: examen real 2025-II, vie 5-mar; `FASE_INTENSIVA_2027-I.md`). ⚠ **v5.20: tras él quedan solo 4 slots de barrido (lun 1 → jue 4-mar) antes del examen ENCAPS del mié 10-mar → este pre-test decide QUÉ 4 códigos se barren** (§4).
> *(v5.19, 5-oct: examen Step 1 vie 19-feb → intensiva desde el lun 22-feb y pre-test el mismo vie 26-feb (defaults ya alineados), generado el mié 17-feb = D94 de entonces; el vie 5-feb era el D86 y el vie 12-feb el D91.)* *(v5.18, 3-oct: examen Step 1 jue 18-feb → pre-test vie 19-feb si D1 = vie 19-feb, o vie 26-feb si D1 = lun 22-feb, con los defaults de los dos scripts desalineados; generado el mar 16-feb = D94 de entonces. v5.17, 30-sep: examen Step 1 mar 16-feb → pre-test vie 19-feb si D1 = mié 17-feb, o vie 26-feb si D1 = lun 22-feb; generado el vie 12-feb = D94 de entonces. v5.16, 26-sep: examen Step 1 jue 11-feb → pre-test vie 12-feb si D1 = vie 12-feb, o vie 19-feb si D1 = lun 15-feb. v5.15, 22-sep: examen Step 1 lun 8-feb → pre-test vie 12-feb, o vie 19-feb si D1 = lun 15-feb en vez de mar 9-feb; el vie 5-feb era el D95 = D-1.)*
> **Qué:** el examen real **ENCAPS/SERUMS 2026-II** (09-ago-2026), 100 preguntas, **clave oficial verificada 100/100**, que Joseph **no rindió** y que está en **LISTA NEGRA** de generación desde el 05-sep-2026 (`PROTOCOLO_GENERACION_PREGUNTAS.md §3-bis-LN`). Es la única medición limpia posible del nivel real antes de la intensiva (v5.20: 11 hábiles, mar 23-feb → mar 9-mar; el diseño original preveía 7 semanas).
> **Material:** `_examen_2026-2_items.json` (100 ítems A-D + clave + código v3 + formato) y `exams_txt/2026-2.txt`. Runner: `node DATA/_scripts/gen_encaps_minisim.js --pretest` → `BANCO_PROPIO/pretest_2026-II.html` (**v6.00: generarlo antes del lun 4-ene-2027 y rendirlo el vie 8-ene** — ⏸ SUPERSEDIDO: **v5.20: generarlo el jue 18-feb-2027 = D94 del Step 1 (última sesión de banco), por la tarde y fuera del bloque, o antes** — el vie 19-feb es el D95 (último día del plan: sesión mínima + ritual de test-day) y el lun 22-feb el examen Step 1: ninguno sirve; como último recurso, el jue 25-feb (día 99), víspera del pre-test. Generarlo no es abrirlo: el HTML no se abre hasta el vie 26-feb. La fecha por defecto del runner ya es el vie 26-feb (`2027-02-26`). El generador se niega si no se pasa `--pretest`. *(v5.19: generarlo el mié 17-feb = D94 de entonces · v5.15: jue 4-feb; v5.16: mar 9-feb; v5.17: vie 12-feb; v5.18: mar 16-feb, con default `2027-02-19`.)*).
> **Umbral de arranque: ≥ 70/100** (el que fija `PROTOCOLO_HORA_MANTENIMIENTO.md`: llegar a febrero desde ~70%).
> ⏸ *(Histórico, SUPERSEDIDO por v6.00 — bloque de arriba)* **Re-fechado 6-oct-2026 (régimen v5.20 — DEFINITIVO):** el mantenimiento se re-sembró con **D1 = mié 7-oct-2026 · 92 días · cierre mar 16-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.18`, backup `study_schedule_bk_1006`; los backups anteriores, del `bk_1005` de v5.19 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudió el mar 6 de octubre (decimonoveno corrimiento, 31-ago→7-oct, **27 hábiles perdidos**). **6.º CORRIMIENTO RÍGIDO** (Joseph, mar 6-oct: «todo inicia el día 7 de octubre … tan solamente corre las fechas … la fase intensiva del serum inicia cuando ya damos el examen de Estados Unidos … el examen del serum será para la fecha del 10 de marzo … ese ya es el definitivo»): el mantenimiento conserva sus 92 sesiones y su cierre pasa del lun 15-feb al **mar 16-feb**. El USMLE Step 1 acaba el **vie 19-feb-2027 (D95 = último día del plan, D-1 hábil; D94 jue 18-feb = última sesión de banco)**, sáb 20 y dom 21-feb libres (**dom 21 = D-1 real**) y el **examen pasa al lun 22-feb-2027** → los días 93-96 de la cuenta ENCAPS (mié 17, jue 18, vie 19 y lun 22-feb) son el cierre del Step 1 y su examen → la **intensiva arranca el mar 23-feb (día 97)** y está **SEMBRADA** (días 97-107, backup `study_schedule_bk_intensivo_1006`): mar 23 señales · mié 24 / jue 25 calentamiento I-3 / V-2 · **vie 26-feb PRE-TEST (día 100)** · lun 1 → jue 4-mar barrido (4 slots) · vie 5-mar SIM 100Q 2025-II · lun 8-mar D-2 dress rehearsal · mar 9-mar D-1 · **examen ENCAPS FIJADO mié 10-mar-2027**. El pre-test se genera el **jue 18-feb** (D94) o antes.
> ⏸ *(Histórico, superado por el de 6-oct)* **Re-fechado 5-oct-2026 (régimen v5.19):** el mantenimiento se re-sembró con **D1 = mar 6-oct-2026 · 92 días · cierre lun 15-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.17`, backup `study_schedule_bk_1005`; los backups anteriores, del `bk_1003` de v5.18 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudió el lun 5 de octubre (decimoctavo corrimiento, 31-ago→6-oct, 26 hábiles perdidos). **5.º CORRIMIENTO RÍGIDO** (Joseph, lun 5-oct: «Todo inicia a partir del 6 … solo corre las fechas y alarga un día más la fecha de término; no elimines exámenes ni evaluaciones ya programados»): solo corren los días — ningún tema se toca ni se recorta —, así que el mantenimiento conserva sus 92 sesiones y su cierre pasa del vie 12-feb (v5.18) al **lun 15-feb**. El USMLE Step 1 acaba el **jue 18-feb-2027 (D95 = último día del plan y D-1 REAL; D94 mié 17-feb = última sesión de banco; sin finde entre D94 y D95)** y el examen pasa al **vie 19-feb-2027** → **los días 93-96 de la cuenta ENCAPS (mar 16, mié 17, jue 18 y vie 19-feb) son el cierre del Step 1 y su examen** → la intensiva arranca el **lun 22-feb (día 97; D1 por defecto del script)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-22 <fecha-examen>`. El pre-test se rinde el primer viernes de la intensiva (**vie 26-feb**) y se genera el **mié 17-feb** (D94, por la tarde) o el jue 25-feb. El escenario CORTO (examen dom 14-mar) sigue en pie.
> ⏸ *(Histórico, superado por el de 5-oct)* **Re-fechado 3-oct-2026 (régimen v5.18):** el mantenimiento se re-sembró con **D1 = lun 5-oct-2026 · 92 días · cierre vie 12-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.16`, backup `study_schedule_bk_1003`; los backups anteriores, del `bk_0930` de v5.17 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudiaron el jue 1 ni el vie 2 de octubre (decimoséptimo corrimiento, 31-ago→5-oct, 25 hábiles perdidos). **4.º CORRIMIENTO RÍGIDO** (Joseph, sáb 3-oct: «todo inicia el 5 corre lo que tengas que correr para que todo inicie el 5»): solo corren los días — ningún tema se toca ni se recorta —, así que el mantenimiento conserva sus 92 sesiones y su cierre pasa del mié 10-feb (v5.17) al **vie 12-feb**. El USMLE Step 1 acaba el **mié 17-feb-2027 (D95 = último día del plan y D-1 REAL; D94 mar 16-feb = última sesión de banco; sin finde entre D94 y D95)** y el examen pasa al **jue 18-feb-2027** → **los días 93-96 de la cuenta ENCAPS (lun 15, mar 16, mié 17 y jue 18-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **vie 19-feb (día 97)** o el **lun 22-feb (día 98; D1 por defecto del script)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-19 <fecha-examen>` (o `2027-02-22`) — decisión de Joseph. El pre-test se rinde el primer viernes de la intensiva (**vie 19-feb** o **vie 26-feb**) y se genera el **mar 16-feb** (D94, por la tarde) o el jueves anterior al viernes en que se rinda. El escenario CORTO (examen dom 14-mar) sigue en pie.
> ⏸ *(Histórico, superado por el de 3-oct)* **Re-fechado 30-sep-2026 (régimen v5.17):** el mantenimiento se re-sembró con **D1 = jue 1-oct-2026 · 92 días · cierre mié 10-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.15`, backup `study_schedule_bk_0930`; los backups anteriores, del `bk_0926` de v5.16 al `bk_0908` de v5.7, siguen intactos) porque tampoco se estudiaron el lun 28, el mar 29 ni el mié 30 de septiembre (decimosexto corrimiento, 31-ago→1-oct, 23 hábiles perdidos). **3.er CORRIMIENTO RÍGIDO:** solo corren los días — ningún tema se toca ni se recorta —, así que el mantenimiento conserva sus 92 sesiones y su cierre pasa del vie 5-feb (v5.16) al **mié 10-feb**. El USMLE Step 1 acaba el **lun 15-feb-2027 (D95 = último día del plan y D-1 REAL; D94 vie 12-feb = última sesión de banco; sáb 13 y dom 14-feb libres entre D94 y D95)** y el examen pasa al **mar 16-feb-2027** → **los días 93-96 de la cuenta ENCAPS (jue 11, vie 12, lun 15 y mar 16-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **mié 17-feb (día 97)** o el **lun 22-feb (día 100; D1 por defecto del script)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-17 <fecha-examen>` (o `2027-02-22`) — decisión de Joseph. El pre-test se rinde el primer viernes de la intensiva (**vie 19-feb** o **vie 26-feb**) y se genera el **vie 12-feb** (D94, por la tarde) o el jueves anterior al viernes en que se rinda. El escenario CORTO (examen dom 14-mar) sigue en pie.
> ⏸ *(Histórico, superado por el de 30-sep)* **Re-fechado 22-sep-2026 (régimen v5.15):** el mantenimiento se re-sembró con **D1 = mié 23-sep-2026 · 92 días · cierre mar 2-feb-2027** (régimen `MANTENIMIENTO_2027-1 v6.13`, backup `study_schedule_bk_0922`; los `bk_0919` de v5.14, `bk_0916` de v5.13, `bk_0915` de v5.12, `bk_0914` de v5.11, `bk_0912` de v5.10, `bk_0910` de v5.9, `bk_0909` de v5.8 y `bk_0908` de v5.7 siguen intactos) porque tampoco se estudiaron el lun 21 ni el mar 22 de septiembre (decimocuarto corrimiento, 31-ago→23-sep, 17 hábiles perdidos). **CORRIMIENTO RÍGIDO:** solo corren los días — ningún tema se toca ni se recorta, y donde había fin clavado se amplían días, así que el mantenimiento conserva sus 92 sesiones y su cierre se corre del vie 29-ene al **mar 2-feb**. **El pre-test SÍ se mueve:** el vie 5-feb es ahora el D95 = D-1 del Step 1, así que pasa al **primer viernes de la intensiva (vie 12-feb, o vie 19-feb si D1 = lun 15-feb)**; se genera el **jue 4-feb** (D94 del Step 1, última sesión de banco: correr el script por la tarde — el generador solo necesita `--pretest`). Lo que también cambia: el USMLE Step 1 acaba el **vie 5-feb-2027 (D95 = D-1 dentro del plan; D94 jue 4-feb = última sesión de banco; sáb 6 y dom 7-feb libres entre D95 y el examen)** y el examen pasa al **lun 8-feb-2027** — es decir, **los días 93-96 de la cuenta ENCAPS (mié 3 → lun 8-feb) son el cierre del Step 1 y su examen** → propuesta: intensiva desde el **mar 9-feb (día 97)** o el **lun 15-feb (día 101)** con `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-09 <fecha-examen>` (o `2027-02-15`); el escenario CORTO (examen dom 14-mar) sigue en pie. *(v5.14, 19-sep: D1 lun 21-sep · 92 días · bk_0919 · Step 1 D95 = mié 3-feb, examen jue 4-feb, pre-test propuesto el vie 5-feb. v5.13, 16-sep: D1 jue 17-sep · 94 días · bk_0916 · Step 1 D95 = lun 1-feb, examen mar 2-feb, intensiva propuesta desde el mié 3-feb.)*
> **Fecha del examen — v6.00: dom 14-mar-2027 PROVISIONAL** (se fija con la convocatoria; `_fechas_v6.json → encaps.examen`, `study_metrics.extra.exam_date = 2027-03-14`); el pre-test no se mueve con el escenario (siempre el vie 8-ene). ⏸ *(SUPERSEDIDO:)* **Fecha del examen — v5.20 (6-oct-2026): FIJADA por Joseph = mié 10-mar-2027** (`study_metrics.extra.exam_date`; intensiva de 11 hábiles, días 97-107, `FASE_INTENSIVA_2027-I.md` bloque v5.20). ⚠ Los ENCAPS fueron siempre en domingo: confirmar día/hora/sede en la convocatoria SERUMS 2027-I (`SENALES_2027-I.md`); si la mueve, se regenera la intensiva, pero el pre-test sigue siendo el vie 26-feb. *(Histórico hasta v5.19:)* **Fecha del examen (05-sep-2026):** ASUMIDA, no confirmada. Las fechas que circulaban (26-mar y 28-mar-2027) caen en Semana Santa 2027 (Jue 25 · Vie 26 · Pascua dom 28-mar, verificado) y son imposibles; hasta la convocatoria SERUMS 2027-I (`SENALES_2027-I.md`) se planifica con el escenario CORTO (examen dom 14-mar-2027 → intensiva de 6 semanas en el diseño original; v5.19: 15 días hábiles D1→D-1 con D1 = lun 22-feb (días 97-111), `FASE_INTENSIVA_2027-I.md` §0; v5.18: 16 / 15 · v5.17: 18 / 15). El pre-test es siempre el **primer viernes de la intensiva** y no cambia con el escenario de examen ENCAPS (v5.19: vie 26-feb, con D1 = lun 22-feb — `FASE_INTENSIVA_2027-I.md` §0-§1; v5.18: vie 19-feb si D1 = vie 19-feb, o vie 26-feb si D1 = lun 22-feb · v5.17: vie 19-feb si D1 = mié 17-feb, o vie 26-feb; v5.15: vie 12-feb, o vie 19-feb si D1 = lun 15-feb).

---

## 1) Condiciones (modo examen estricto)

| Parámetro | Valor |
|---|---|
| Preguntas | 100 (orden original 1-100, sin barajar: el orden real también entrena la fatiga del examen) |
| Tiempo | **72 s/Q · 120 min totales**, reloj corriendo, sin pausa (el runner no tiene botón de pausa) |
| Hora | **v6.00: vie 8-ene-2027 07:15-09:15** (bloque principal de la F2) + corrección. *(v5.20, SUPERSEDIDO: «la franja exacta la fija la reestructuración de febrero»; el simulacro ocupa ~2 h + 45 min de corrección)* |
| Material | NADA: sin compendio, sin Anki, sin celular. Solo hoja de respuestas |
| Por ítem | letra + **confianza** 1 (adivinada) · 2 (dudosa) · 3 (segura) — sin confianza el ítem no cuenta como ciego |
| Corrección | **solo al final** (el runner no muestra la clave hasta cerrar las 100) |
| Post-examen | 30 min de corrección por código + 15 min de registro. La tutoría (fallos → tarjetas/APEX) es **v6.00: el fin de semana sáb 9 / dom 10-ene o, como tarde, el lun 11-ene antes de las 07:15** (junto con la regeneración `--pretest … --desde 2027-01-11`, bloque v6.00 de arriba). *(SUPERSEDIDO:)* el **lunes siguiente** (v5.20: **lun 1-mar**, tras el pre-test del vie 26-feb — ese mismo lunes arranca el barrido, así que la regeneración con `--pretest` (§4 regla 4) se hace el viernes, tras exportar la ronda; v5.19: lun 1-mar; v5.18 y v5.17: lun 22-feb si el pre-test era el vie 19-feb, lun 1-mar si era el vie 26-feb; v5.15: lun 15-feb tras el vie 12-feb) |

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

✅ **v6.00:** el veredicto reparte los **32 slots de barrido** del núcleo (lun 11-ene → jue 4-mar, 8 semanas) por índice de brecha, cada crítico ≥ 1; después quedan 8 SIM 100Q y la cola (repaso final, dress rehearsal jue 11-mar). Con «alarma» (< 60), ampliar o cambiar días sigue siendo decisión de Joseph. ⏸ *(SUPERSEDIDO:)* ⚠ **v5.20 (intensiva sembrada, examen mié 10-mar):** las columnas «semanas 2-5 / semana 6 / 16 slots» son del diseño original. La intensiva real tiene **solo 4 slots de barrido** (lun 1 → jue 4-mar), sin semanas 3-6, sin rebotes ni repaso final: sea cual sea el veredicto, el `--pretest` solo decide **qué 4 códigos** se barren (los 4 primeros de la pasada 1 por índice de brecha n × (1 − % ciego); el script calcula un reparto teórico de 16 con cada crítico ≥1, pero solo caben 4). El resto de la brecha va al repaso D-1/D-3/D-7 del loop, al SIM 100Q del vie 5-mar y al dress rehearsal del lun 8-mar. Con un veredicto «alarma» (<60), ampliar la intensiva o cambiar días es decisión de Joseph.

Reglas fijas independientes del puntaje:
1. Todo fallo tipo **OLVIDO** o de formato cifra → tarjeta en `TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` **esa misma tarde** (regla de `CIFRAS_CRITICAS_2027-I.md`).
2. Todo fallo **CCSN** → ficha de 1 página del par confundido (ruta OBSIDIAN) antes del banco de ese código en las semanas 2-5.
3. Los códigos con **100 % seguro** no reciben slot extra: solo repaso multi-temporal D-7 / D-14.
4. El generador de la intensiva lee el JSON de la ronda y **re-ordena solo** el barrido. *(⏸ v6.00 · v6.01: sin `--base` (el default es f1.inicio = 2026-10-12) y backup `study_schedule_bk_v601_int_<AAAAMMDD>`; usar el comando del bloque v6.01 de arriba)* **v6.00:** `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-01-04 2027-03-14 --base 2026-10-07 --carril-b DATA/ENCAPS/_carril_b_v520_61-92.json --pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json --desde 2027-01-11` → revisar → `execute_sql` el sáb 9 / dom 10-ene o el lun 11-ene antes de las 07:15 (32 slots, lun 11-ene → jue 4-mar). ⏸ *(Comando v5.20, SUPERSEDIDO:)* `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-23 2027-03-10 --pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json --bk study_schedule_bk_intensivo_<AAAAMMDD>` → revisar → `execute_sql` **antes del lun 1-mar** (v5.20: `2027-02-23` = mar 23-feb, día siguiente al examen Step 1 del lun 22-feb, y `2027-03-10` = examen ENCAPS FIJADO, ambos defaults del script; el barrido son 4 slots lun 1 → jue 4-mar; el `--bk` debe ser nuevo, porque el SQL hace `DROP TABLE IF EXISTS` del backup y con el mismo nombre pisaría el `study_schedule_bk_intensivo_1006`; si la convocatoria SERUMS 2027-I mueve la fecha, poner la real, `SENALES_2027-I.md`. v5.19: `2027-02-22 <fecha-examen>`, barrido desde el lun 1-mar, fecha sin fijar · v5.18: `2027-02-19` o `2027-02-22` · v5.17: `2027-02-17` o `2027-02-22` · v5.15: `2027-02-09` o `2027-02-15`).

## 5) Registro: ronda `PRETEST_2026-II` en `_registro_resoluciones.json` (append, no reescribir)

El runner exporta este bloque (botón "Exportar JSON"); se guarda como `TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json` **y** se apenda a `rondas[]` del registro. Esquema (compatible con las rondas de julio, con `confianza` obligatoria):

```json
{
  "id": "PRETEST_2026-II",
  "fecha": "2027-02-26",
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
- `error` ∈ CCSN · CONCEPTO · CRONOLOGIA · CONTEXTO · OLVIDO (solo si `ok=false`); `causa` = una línea con el razonamiento que lo llevó ahí; `ruta` = ANKI · OBSIDIAN · AMBOS. Estos tres campos se rellenan en la tutoría (v6.00: sáb 9 / dom 10-ene o lun 11-ene antes de las 07:15; SUPERSEDIDO: «del lunes siguiente», v5.20: lun 1-mar, tras el pre-test del vie 26-feb; v5.19: igual · v5.18: lun 22-feb o lun 1-mar), no el viernes (el `--pretest` del generador solo necesita `ok` y `confianza`, que el runner exporta ese mismo viernes).
- `resumen_por_subtema` del registro lo recalcula el sistema de tracking desde `rondas[]`; aquí no se edita a mano.

## 6) Qué NO hacer

- No "estudiar el 2026-II" antes: cualquier lectura previa invalida el pre-test (la clasificación por código y la clave están en ficheros que **no se abren** hasta el día del pre-test (**v6.00: vie 8-ene-2027**; SUPERSEDIDO v5.20: vie 26-feb; v5.19: igual · v5.18: vie 19-feb o vie 26-feb); las cifras del deck `ENCAPS::Cifras` son datos normativos y no revelan viñeta ni distractores).
- No repetirlo como simulacro después: una vez rendido, el 2026-II pasa a banco espejo para las semanas 2-5 (viñetas espejo, no las mismas preguntas).
- No comparar contra el 2026-I rendido en julio-agosto 2026: aquel se contaminó como cantera de moldes; este es la única línea base limpia.
