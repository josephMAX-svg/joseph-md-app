# MIR · Método RaviMedTest adaptado a la hora MIR (v6.03b · 20-oct-2026)

> Pedido de Joseph (20-oct-2026): estructurar el método de estudio del MIR con el referente **RaviMedTest** (Ravi: uno de sus vídeos
> cuenta cómo acabó «entre los 100 primeros» del MIR 2020; canal de YouTube @ravimedtest y material compartido en el Drive de Joseph):
> Anki, tarjetas, conceptos, cómo manejar el Anki, repasos relacionales, simulacros. Todo dentro de **nuestro** sistema: la hora MIR fija
> (60′, 15:15–16:15 en F1-F3; turno del SERUMS en F4), el pool oficial de la app, **APEX** (⚡ APEX 1-TAP / Ctrl+Shift+A → n8n → Anki +
> nota del vault) y el log `mir_eval_log`.
>
> **Qué NO cambia:** franjas, carga horaria (60′/día), D#, fechas, filas del plan, pool oficial, umbrales, cierres. El método entra
> **dentro** de los pasos existentes. Ver §10 (antes → después).
>
> **Dónde vive:** datos en [`metodo_ravimedtest.json`](metodo_ravimedtest.json) → `gen_mir_guia.js` los emite como `MIR_METODO`
> en `src/lib/mirGuiaDatos.ts` → `src/lib/mirGuia.ts` (`metodoRavi`, D77/D78, banqueo) los mete en la guía del día.
> `node DATA/MIR/guia_lectura/gen_mir_guia.js --check` falla si un día del plan pierde el método (repaso relacional, Anki de dos
> mazos, criterio APEX, técnica de simulacro del D77, orden de corrección del D78).

---

## 1. Fuentes (verificadas el 20-oct-2026; nada inventado)

**NotebookLM** «MIR · RaviMedTest Engine (método + Anki + vueltas)» — los vídeos del canal de Ravi como fuentes. 6 consultas el
20-oct (método completo · mazos y relacionales · 1 h/día y corrección · desgloses, corrección y técnica de simulacro · los 3 errores ·
percentiles · desgloses). Cada dato de este documento lleva su vídeo; las frases son resumen propio (citas literales ≤ 15 palabras).

| # | Vídeo (título tal como figura en el canal) | Enlace (público) |
|---|---|---|
| V1 | «Qué es ANKI y por qué te va a solucionar la vida en el examen MIR» | — |
| V2 | «Mis REPASOS RELACIONALES para el MIR» | — |
| V3 | «MIS 3 MAYORES ERRORES EN LA PREPARACIÓN MIR» | — |
| V4 | «PREGUNTAS DISCRIMINATIVAS · La clave del MIR» | — |
| V5 | «Preguntas y respuestas de medicina, examen MIR y estudio (Q&A) #1» | — |
| V6 | «Cómo hacer un simulacro #MIR de manera EFICIENTE» | https://www.youtube.com/watch?v=FNIbWi9ST2M |
| V7 | «EL DÍA DEL EXAMEN MIR: MI EXPERIENCIA» | — |
| V8 | «Cómo gestionar los percentiles en la preparación del examen MIR» | https://www.youtube.com/watch?v=trwFNlIU4Cs |
| V9 | «Cómo responde preguntas MIR un opositor del percentil 100» | https://www.youtube.com/watch?v=PFB1d-zqKvM |
| V10 | «Cómo responde preguntas del simulacro un opositor del percentil 100» | — |
| V11 | «Cómo estudiar en medicina para incrementar tu puntuación. En detalle.» | https://www.youtube.com/watch?v=nqYkEyeduBU |
| V12 | «Extracomunitarios en el examen MIR: ADVERTENCIAS» | — |

Los enlaces son los que el propio Ravi publicó en su directorio «LINKS de mis APORTACIONES» (Drive, docx legible); los 4 comprobados vivos
el 20-oct-2026 (oEmbed de YouTube: título y canal RaviMedTest).

**Google Drive de Joseph** (inventario por nombre; el repo es público → **sin ids ni enlaces a ficheros de terceros**; los enlaces de
la guía son búsquedas por nombre en el Drive de Joseph, que solo abren con su sesión):

| Carpeta / fichero | Dueño | Qué es | Leído |
|---|---|---|---|
| «RAVIMEDTEST»: «Guía 1V», «Asignaturas a trabajar en primera vuelta», «LINKS de mis APORTACIONES», «1. Fisiología endocrino», «2. Antibióticos», «6. Valvulopatías», «Valvulopatías tabla», «REUMA 01-04» | Joseph | notas `.note` (zip) | solo títulos (no legibles como texto) |
| «TARJETAS RELACIONALES RAVIMED»: «PEDIA», «NEUROLO», «GINECO» | Joseph | notas `.note` | solo títulos |
| «MATERIAL ORIENTACIÓN 1V» › «Asignaturas a trabajar en primera vuelta» (PDF + Doc) | compartido (rabi_94) | núcleo de 1.ª vuelta CTO × AMIR × MirAsturias | sí — ya está en [`src/lib/mirPrioridades1V.ts`](../../src/lib/mirPrioridades1V.ts) |
| «MATERIAL ORIENTACIÓN 1V» › «Guía 1V.docx» | compartido | índice de su tutoría de 1.ª vuelta: apuntes · simulacros (cómo se hacen y se corrigen) · desgloses («los 3 niveles de aprovechamiento») · recursos de cada academia | sí (es solo un índice: el contenido de cada punto no está escrito) |
| «MATERIAL ORIENTACIÓN 1V» › «LINKS de mis APORTACIONES (hasta 09-07-2021)» | compartido | directorio de sus tuits y vídeos (perlas, videocomentarios, #RaviTarjetaRelacional, vídeos largos) | sí |
| «TARJETAS RELACIONALES» › CARDIOLOGÍA · CIRUGÍA · DERMATOLOGÍA · DIGESTIVO · GINECOLOGÍA · HEMATOLOGÍA · INFECCIOSAS · INMUNOLOGÍA y GENÉTICA · NEUMOLOGÍA · NEUROLOGÍA · OTORRINOLARINGOLOGÍA · PEDIATRÍA · TRAUMATOLOGÍA | compartido | fichas JPG «concepto → concepto» + «ACLARACIONES» / «Actualizaciones y correcciones» | carpetas sí; **contenido solo en parte** (la API de Drive no lista todos los JPG de una carpeta ajena: abrirla para comprobar) |
| «Tarjetas 1ºV Ravi» › «1ºVUELTA 2MIR21.apkg» (13,8 MB) | compartido | mazo de prueba de 1.ª vuelta (Ravi lo enlaza como «tarjetas de prueba de 1ºV») | **no abierto** (binario: no se descarga ni se ejecuta desde aquí) |
| «MAZOS EXTRA» › «4. TARJETAS NUEVAS PARTE 1.apkg» (25,8 MB) · «4º VUELTA (MARCADAS).apkg» (40,4 MB) · «****ACTUALIZACIONES****» | compartido | mazos de vueltas posteriores | no abiertos (para 2.ª vuelta en adelante) |

**Repo:** [`README.md`](README.md) §3-§5 (hora MIR, medición, preset FSRS y plantilla APEX-MIR) · [`POOL_USO.md`](POOL_USO.md)
(un id del pool se usa una sola vez) · `src/lib/mirPrioridades1V.ts` · [`DELTA_ESPANA.md`](DELTA_ESPANA.md).

---

## 2. Lo que dice Ravi (resumen propio, con su vídeo)

**Anki**
1. **Las preguntas son el pilar; Anki es la herramienta de apoyo.** Hacía Anki y preguntas todos los días, 45′-1 h de Anki al día;
   Anki nunca debe quitar tiempo a los test (V5, V1).
2. **Pocas tarjetas, muchas repeticiones.** Rechaza meter el manual entero (habla de 15.000 tarjetas «tipo EE. UU.»); su pool total
   ronda las 1.200-1.500 tarjetas (Infecciosas ≈ 180) (V1).
3. **Qué es tarjeta:** fallos de simulacro/test y conceptos discriminativos de nivel 3/5-4/5 que la academia no enfatiza; formato
   pregunta → respuesta breve (V1, V4).
4. **Mazo personal pequeño (20-40 tarjetas de fallos «tontos») con prioridad absoluta**, y después sus mazos (V1).
5. **Modo aleatorio**, nunca por asignatura: el examen no viene por bloques y estudiar por mazo te dice de qué va la pregunta (V3).
6. Dos matices sobre cuándo usar sus mazos: (a) no se estudian «desde cero» — primero estudias la asignatura y luego las tarjetas
   (V4); (b) recomienda empezarlas pronto para «ganar terreno» con conceptos de nivel medio-alto (V3). → decisión nuestra en §4.

**Repasos relacionales (V2)**
7. Fichas (imágenes JPG) con relaciones directas **concepto → concepto** entre asignaturas, de nivel medio-alto; su ejemplo: dos
   cuadros de asignaturas distintas que comparten un signo y un tercero que no lo tiene. **No repiten ningún dato de sus tarjetas
   Anki**: son complementarias.
8. **Pauta: 2 veces por vuelta y por asignatura — una justo antes de empezarla y otra al acabarla**, y no se tocan más en esa vuelta.
   Él los vio al menos 8 veces en toda su preparación, añadiendo relaciones en cada vuelta.

**Corregir y estudiar con preguntas**
9. La corrección es memorización activa: pasaba mucho tiempo corrigiendo simulacros y memorizaba ahí (V5). Cada pregunta se
   exprime: la correcta, **por qué es falsa cada incorrecta** y la fisiopatología alrededor; también revisa las que acierta (V9).
10. En 1.ª vuelta llevaba un **cuadernito de fallos por asignatura** con lo que no venía claro en el manual (V5).
11. Las preguntas de años previos son la base, pero **no se leen antes para recortar el temario** («hacerse el harakiri», V11).
12. Con 2 opciones vivas tras descartar, **arriesga**: con −1/3 la lógica gana más de lo que pierde (V10).
13. Preguntas discriminativas = razonamiento clínico (lo que salva la vida primero) + conceptos de nivel 3-4/5 vecinos de lo ya
    preguntado (V4).

**Simulacro (V6, V7)** — formato MIR de su época (210Q, 4 h)
14. Reloj cada 20-30 preguntas para corregir desvíos pronto. 50Q ≈ 50-55′ incluyendo pasarlas a la plantilla.
15. Orden: empieza por la primera sin imagen, dos bloques de 50 seguidos pasando cada uno a la plantilla; atención extra a las
    ~40 primeras (nervios). Tras las 100 primeras, **10′ de pausa programada**. Después reservas en orden descendente y el bloque
    intermedio; **las ~27 de imagen al final** (50-60′), resolviéndolas primero por el texto.
16. **Últimos 10′: revisión formal** de la plantilla pregunta a pregunta. **Nunca se cambia una respuesta por contenido; solo por
    forma.** El día del MIR falló 4 preguntas por forma (marcar la verdadera cuando pedían la falsa).

**Percentiles (V8)**
17. Mirarlos desde el primer simulacro, sin ponerse etiquetas; compararse **dentro de la misma academia** y nunca comparar netas
    entre academias; una subida o bajada aislada no significa nada si no es consistente.

**Los 3 mayores errores (V3; los tres los cometió él)**
18. No hacer una 1.ª vuelta potente · estudiar en pasivo esperando que la repetición fije · repasar solo lo que le gusta (meses de
    test casi solo de Cardiología mientras perdía preguntas de Ginecología).

---

## 3. Adaptación a 1 h/día: qué hay dentro de la hora

Ravi dedicaba 45-60′ **solo** a Anki. Joseph tiene 60′ de MIR **en total** (DJ-4). Las preguntas mandan (P1), así que Anki se queda en
los 5′ del plan y el método se mete en los pasos que ya existen. Minutos tomados al APEX (10′) solo en los días de inicio y fin de
asignatura.

| Tipo de día | Reparto de la hora (min) | Qué cambia con el método |
|---|---|---|
| **Normal** (eval anclada) | eval 7 · Anki 5 · log 3 · pre-test 8 · lectura 15 · quiz 12 · APEX 10 | Anki = dos mazos (§4) · quiz: cada fallo se exprime · APEX con criterio Ravi + envío APEX 1-TAP |
| **Inicio de asignatura** (= test de cierre de la anterior) | cierre 15 · **relacional ANTES 3** · pre-test 8 · lectura 15 · quiz 12 · APEX **7** | + repaso relacional y reactivación del mazo Ravi de la asignatura; APEX ≤3 |
| **Último día de asignatura** | eval 7 · Anki 5 · log 3 · pre-test 8 · lectura 15 · quiz 12 · APEX **7** · **relacional AL TERMINAR 3** | + ≥2 flechas nuevas; APEX ≤3 |
| **D4 Bioética** (asignatura de 1 día; también cierre de Epidemiología) | cierre 15 · relacional ANTES **2** · pre-test 8 · lectura 15 · quiz 12 · APEX **6** · relacional AL TERMINAR **2** | las dos pasadas el mismo día |
| **D1** (mié 21-oct) | arranque 5 · orientación 3 · 5Q extra 7 · pre-test 8 · lectura 15 · quiz 12 · APEX 10 | el arranque importa el mazo Ravi **suspendido** y reactiva Epidemiología; sin relacional «antes» (primera asignatura: no hay nada que repasar) |
| **D77** mini-MIR (mar 9-feb-2027) | pasada 47 · revisión formal 4 · plantilla + neto 9 | técnica de simulacro (§6) |
| **D78** corrección (mié 10-feb-2027) | falladas 25 · blancos y dudosas 10 · APEX + flechas 10 · tabla de neto + 3 errores 15 | orden de corrección de Ravi (§5) |
| **Banqueo** (189 sesiones, feb → sep-2027) | Anki 10-15 · bloque de preguntas 32-39 · corrección 11-13 (sin cambios de minutos) | Anki = dos mazos (todas las asignaturas del plan ya reactivadas, ≤10 nuevas/día) · reloj cada 10Q y revisión formal en los bloques ≥20Q · corrección en orden de Ravi |

En el SERUMS la hora se desplaza al turno (M 16:00 · T 10:35 · L 15:15 · hito 04:05): la guía recalcula las horas del reloj.

---

## 4. Anki MIR: dos mazos, aleatorio, cuotas

| | Mazo personal | Mazo base de Ravi |
|---|---|---|
| Nombre | `APEX::MIR` (subdecks `APEX::MIR::<asignatura>`, `ankiLinks.mirAnkiDeck`) | «1ºVUELTA 2MIR21» (importado tal cual) |
| Qué entra | solo APEX: fallos propios y detalles de nivel 3-4/5 (§5) | las tarjetas de Ravi; se **reactivan por asignatura** |
| Preset | «APEX::MIR» (README §5): FSRS, retention 0,85 hasta el Step 1 → 0,90 desde oct-2027, ≤4 nuevas/día | «RAVI-1V»: FSRS, retention 0,85, **≤3 nuevas/día en la 1.ª vuelta · ≤10 en el banqueo** |
| Orden | **aleatorio**, estudiando desde la raíz `APEX::MIR` (todas las asignaturas mezcladas) | **aleatorio** entre lo reactivado |
| Prioridad | **primero y a cero** cada día (P4) | después, hasta que acabe el paso de Anki |
| Deuda | no se acumula (es pequeño) | si pasa de 60 vencidas dos días seguidos → nuevas a 0 esa semana (misma regla del README) |

**Por qué suspendido y reactivado por asignatura** (decisión sobre el matiz 6): Ravi pide una base mínima antes de sus tarjetas (V4) y
Joseph no va a clases de academia que le den esa base: la da el día del plan. Por eso una asignatura se reactiva **el día que empieza**
(en el paso del repaso relacional «antes») y, a partir de ahí, sus tarjetas entran mezcladas con todo lo ya reactivado (modo aleatorio,
P5). Las 16 asignaturas fuera del plan siguen suspendidas; un Tier C del banqueo puede reactivar la suya el día que entra (si el mazo la
trae). **Cuotas = adaptación propia** (Ravi no da nuevas/día): con 5′ de Anki al día, 3 nuevas de Ravi + ≤4 APEX ya llenan la franja.

**Cómo se monta (Joseph, una vez, en Anki escritorio — D1 o la noche del D1):**
1. Preset «APEX::MIR» con orden de repaso aleatorio (si no estaba).
2. Descargar e importar «1ºVUELTA 2MIR21.apkg» desde su Drive (búsqueda por nombre).
3. Navegador → todo el mazo importado → **Suspender (Ctrl+J)** → reactivar solo Epidemiología.
4. Comprobar la estructura del `.apkg` (¿subdecks o etiquetas por asignatura?). Si no viene por asignatura, se reactiva buscando por
   texto. **A VERIFICAR al importarlo** (no se ha abierto desde aquí).
5. Preset «RAVI-1V» al mazo importado.

**Control:** el test de humo semanal del README §5 (`findNotes "deck:APEX::MIR* added:7"` y vencidas). ⚠ No usar
`DATA/_scripts/anki_telemetria.js --query "deck:APEX::MIR*"`: guarda por fecha en `DATA/USMLE/_anki_telemetria.json` y **pisaría la
entrada USMLE de ese día** (necesita un fichero por mazo o un `--no-guardar`; pendiente fuera de este ámbito).

### Calendario de reactivación y repasos relacionales (1.ª vuelta, plan v6.03)

| Asignatura | Empieza (relacional ANTES + reactivar mazo Ravi) | Termina (relacional AL TERMINAR) | Cierre 10Q | Fichas de Ravi en el Drive |
|---|---|---|---|---|
| Epidemiología | D1 mié 21-oct (solo reactivar: sin relacional «antes») | D3 vie 23-oct | D4 lun 26-oct | no hay carpeta |
| Medicina Legal y Bioética | D4 lun 26-oct (2′) | D4 lun 26-oct (2′) | D5 mar 27-oct | no hay carpeta |
| Cardiología | D5 mar 27-oct | D11 mié 4-nov | D12 jue 5-nov | CARDIOLOGÍA |
| Neumología | D12 jue 5-nov | D16 mié 11-nov | D17 jue 12-nov | NEUMOLOGÍA |
| Nefrología | D17 jue 12-nov | D22 jue 19-nov | D23 vie 20-nov | no hay carpeta |
| Gastroenterología | D23 vie 20-nov | D30 mar 1-dic | D31 mié 2-dic | DIGESTIVO + CIRUGÍA |
| Endocrinología y Nutrición | D31 mié 2-dic | D36 mié 9-dic | D37 jue 10-dic | no hay carpeta |
| Neurología | D37 jue 10-dic | D43 vie 18-dic | D44 lun 21-dic | NEUROLOGÍA (+ «NEUROLO» propia) |
| Hematología | D44 lun 21-dic | D48 lun 28-dic | D49 mar 29-dic | HEMATOLOGÍA |
| Enfermedades Infecciosas | D49 mar 29-dic | D56 lun 11-ene | D57 mar 12-ene | INFECCIOSAS |
| Ginecología y Obstetricia | D57 mar 12-ene | D62 mar 19-ene | D63 mié 20-ene | GINECOLOGÍA (+ «GINECO» propia) |
| Reumatología | D63 mié 20-ene | D68 mié 27-ene | D69 jue 28-ene | no hay carpeta |
| Pediatría | D69 jue 28-ene | D73 mié 3-feb | D74 jue 4-feb | PEDIATRÍA (+ «PEDIA» propia) |
| Psiquiatría | D74 jue 4-feb | D76 lun 8-feb | (mini-MIR D77) | no hay carpeta |

13 pasadas «antes» + 14 «al terminar» = **27 repasos relacionales** en la guía (lo cuenta `gen_mir_guia.js --check`). Las fechas salen
de `mirDailyPlan.mirBloques()`: si el plan se corre, la guía se mueve sola.

---

## 5. Corrección → tarjeta, flecha o regla (y adónde va cada cosa)

| Lo que sale de la corrección | Destino | Regla |
|---|---|---|
| Fallo «tonto» (lo sabías y lo fallaste) o detalle discriminativo de nivel 3-4/5 | **APEX** → `APEX::MIR::<asignatura>` + nota en `03_MIR/…/APEX_creados` | formato pregunta → respuesta breve (plantilla APEX-MIR del README §5: SAQ + por qué + 🇪🇸 delta + tag `sys::`); ≤4/día (≤3 en días de relacional) |
| El dato ya está en el mazo de Ravi | **sin tarjeta nueva**: reactivar/marcar la de Ravi | no duplicar (P2) |
| Conexión entre asignaturas | **flecha** en la nota madre de las dos asignaturas (sección «🔗 Relacional») | nunca a Anki (P7) |
| Fallo de forma (leer mal, pasar mal la respuesta) | **regla de examen** en el log | sin tarjeta |
| Acierto por suerte (dudoso) | se corrige como un fallo | Ravi revisa también las acertadas (P9) |
| Lo que acertaste con seguridad | nada | P2: cuantas menos tarjetas, más repeticiones |

**Envío APEX:** ⚡ APEX 1-TAP (Ctrl+Shift+A) → n8n → tarjeta en Anki + nota del vault. **Mientras el redeploy del parser de n8n no esté
verificado con un APEX multilínea real** (README §5, regla v3b; tarea de vibecoding del jue 22-oct), las tarjetas MIR se crean
directamente en Anki.

**El «cuadernito de fallos» de Ravi (P10) ya existe:** es el Shopping List del día + el log de la app (`mir_eval_log`, kinds `pretest`
· `quiz` · `anclada` · `cierre` · `miniMIR` · `mantenimiento`) con la brecha knowledge / transfer / proceso.

**Orden de corrección (D78, banqueo, y cualquier simulacro):** falladas (la regla + por qué es falsa cada opción incorrecta) → en
blanco (¿había 2 descartables? → «blancos acertables» de la táctica −1/3) → acertadas con duda (¿lógica o suerte?).

**Repaso relacional — formato de la hoja propia** (nota madre de cada asignatura, `03_MIR/<asignatura>/00_introduccion_a_la_asignatura/
_concepto_madre`, sección «🔗 Relacional»): una línea por relación, `concepto A (asignatura X) → concepto B (asignatura Y): por qué se
conectan`, copiada también en la nota de la asignatura Y. Así la pasada «antes» de una asignatura encuentra las flechas que ya apuntan
a ella aunque Ravi no tenga fichas de esa asignatura.

---

## 6. Técnica de simulacro adaptada

| Regla de Ravi (V6, V7) | D77 mini-MIR 40Q (51′) | Banqueo ≥20Q (25Q/32′ · 30Q/39′) | Simulacros 200Q (desde 2028) |
|---|---|---|---|
| Reloj cada 20-30 preguntas | cada 10: Q10 ≤ 15:27 · Q20 ≤ 15:39 · Q30 ≤ 15:50 · Q40 ≤ 16:02 | cada 10, con las horas del turno (p. ej. 25Q: Q10 ≤ 15:42 · Q20 ≤ 15:54 · Q25 ≤ 16:00) | cada 25-30, con el formato vigente de la convocatoria (**A VERIFICAR**: nº de preguntas, reservas y duración) |
| Pasada algo más rápida que la media (50Q ≈ 50-55′) para dejar margen | ≈70 s/Q frente a 77 s/Q | ≈72 s/Q | ídem |
| Atención extra al arranque (nervios) | las 10 primeras | — | las ~40 primeras |
| Imágenes al final, por el texto primero | si una imagen atasca, al final de la pasada | ídem | bloque de imágenes al final |
| Pausa programada de 10′ | no (51′) | no | sí, a mitad |
| Revisión **formal** final; nunca cambiar por contenido | 4′ (16:02–16:06) | 2-3′ | 10′ |
| Con 2 opciones vivas, arriesgar (−1/3) | sí; si no descartas 2, en blanco | sí | sí |
| Percentil solo dentro de la misma academia | neto comparado solo con tus cierres/mini-MIR | ídem | percentil dentro de la academia; nunca netas entre academias |

El registro mide la técnica: `blancosAcertables`, `fallosEntreDos`, `cambiadas`, `cambiadasAFallo` (README §4.3) → `mirTacticaConsejo`.

---

## 7. Percentiles y lectura de resultados

- No hay percentil en el mini-MIR ni en el banqueo: se mira el **neto** y su serie (cierres, mini-MIR D77 ≥ 50 % = hito on-track).
- Una subida o bajada aislada no se interpreta; manda la tendencia (V8). Las decisiones del plan ya usan agregados (`mirAgregadoAsignatura`,
  n ≥ 20) y no un test suelto.
- En los simulacros de academia (2028-29) se compara percentil **dentro de la academia**; jamás netas entre academias (V8).

## 8. Los 3 errores de Ravi, vigilados por el plan

| Error (V3) | Cómo lo vigila el plan |
|---|---|
| 1.ª vuelta floja | 76 días-tema con pre-test, quiz y cierre medidos; D78 pregunta qué asignatura cerró con pocas preguntas |
| Estudio pasivo | la mitad de la hora son preguntas y su registro (eval + pre-test + quiz + log = 30′); la lectura va dirigida por los fallos del pre-test; Anki activo todos los días |
| Repasar solo lo cómodo | Anki aleatorio en los dos mazos · viernes del banqueo = asignatura PEOR del log · D78 contrasta la peor asignatura con su Anki y sus test |

## 9. Tensiones con Ravi que se mantienen a propósito (decisión de Joseph si quiere cambiarlas)

1. **Anki 5′ frente a 45-60′.** La hora MIR es fija (DJ-4). Consecuencia: el mazo de Ravi entra a 3/día en 1.ª vuelta y su grueso llega
   en el banqueo (≤10/día).
2. **Lectura dirigida por el pre-test frente a «no leer las preguntas para recortar el temario» (V11).** Con 15′ de lectura al día la 1.ª
   vuelta no puede leer capítulos enteros: el plan lee las secciones con más preguntas citadas y deja el resto medido para la 2.ª vuelta
   (`paraLa2aVuelta`, oct-2027). Ravi lo llama cerrarse puertas. Mitigación: Whole Page Rule (el apartado entero), el mazo de Ravi
   (conceptos de nivel 3-4/5 que no salen de las citas) y la 2.ª vuelta completa. **No se cambia sin decisión de Joseph.**
3. **Resúmenes de manuales** (Ravi deja esquemas en 1.ª vuelta para la 2.ª): el plan usa la nota madre del vault + el capítulo ProMIR
   medido; no se añade tiempo de resumen.
4. **Volumen de preguntas:** Ravi hizo ≈28.000 en toda su preparación (V5); el plan hace 17-19 al día en 1.ª vuelta y 25-30 en el banqueo.

## 10. Cambios en la guía del MIR (antes → después)

| Día / bloque | Antes | Después |
|---|---|---|
| Paso Anki (días con eval) | «Anki APEX::MIR::<asignatura>» · deuda a cero | «Anki · ① APEX::MIR (todas las asignaturas mezcladas) → ② mazo Ravi (lo reactivado)» · aleatorio · el personal primero y a cero; el de Ravi hasta el final del paso; regla de 60 vencidas |
| Paso APEX (todos) | ≤4 APEX desde el Shopping List, creados directamente en Anki | criterio Ravi (solo fallos y nivel 3-4/5, pregunta → respuesta breve, no duplicar el mazo de Ravi) + envío APEX 1-TAP (directo en Anki hasta verificar n8n) |
| Quiz 8-10Q (todos) | Rule-In → Rule-Out, registro | + exprimir cada fallo (por qué es falsa cada incorrecta) y apuntar solo fallos tontos/nivel 3-4/5 |
| D1 mié 21-oct · arranque 5′ | crear `APEX::MIR::epidemiologia` | + importar «1ºVUELTA 2MIR21» todo suspendido y reactivar Epidemiología (preset RAVI-1V, ≤3 nuevas/día) |
| 13 días de inicio de asignatura (D4, D5, D12, D17, D23, D31, D37, D44, D49, D57, D63, D69, D74) | cierre 15 · pre-test 15:30 · lectura 15:38 · quiz 15:53 · APEX 16:05 (10′, ≤4) | cierre 15 · **REPASO RELACIONAL ANTES 15:30–15:33** · pre-test 15:33 · lectura 15:41 · quiz 15:56–16:08 · APEX 16:08 (7′, ≤3) — en D4: 2′ + 2′ y APEX 6′ |
| 14 días de fin de asignatura (D3, D4, D11, D16, D22, D30, D36, D43, D48, D56, D62, D68, D73, D76) | … APEX 16:05–16:15 (10′) | … APEX 16:05–16:12 (7′, ≤3) · **REPASO RELACIONAL AL TERMINAR 16:12–16:15** |
| D77 mar 9-feb · mini-MIR | 51′ de test + 9′ de plantilla y neto | 47′ de pasada con reloj cada 10Q + **4′ de revisión formal** + 9′ de plantilla, neto y táctica −1/3 |
| D78 mié 10-feb · corrección | 40′ Whole-Page + 20′ tabla de neto | 25′ falladas · 10′ blancos y aciertos dudosos · 10′ ≤8 APEX + flechas · 15′ tabla de neto + 3 errores |
| Banqueo · Anki | «Anki APEX::MIR (todas las asignaturas)» | dos mazos, aleatorio, ≤10 nuevas/día del de Ravi |
| Banqueo · bloque ≥20Q | 77 s/Q, en blanco si no descartas 2 | + reloj cada 10Q con la hora del turno y 2-3′ de revisión formal |
| Banqueo · corrección | Whole-Page de cada fallo + log | orden de Ravi (falladas → blancos → dudosas) + tarjeta solo de fallos tontos/nivel 3-4/5 |

## 11. Pendientes de Joseph

- [ ] Importar «1ºVUELTA 2MIR21.apkg» (Anki escritorio), suspender todo, reactivar Epidemiología, preset RAVI-1V (D1 o esa noche).
- [ ] Comprobar si el `.apkg` trae subdecks o etiquetas por asignatura (decide cómo se reactiva cada asignatura).
- [ ] Crear la sección «🔗 Relacional» en la nota madre de cada asignatura cuando toque (la primera, Epidemiología, el vie 23-oct).
- [ ] Abrir las carpetas de relacionales de Ravi de Cardiología y Neumología antes del 27-oct / 5-nov (la API no lista todo su contenido).
- [ ] Decidir la tensión 2 de §9 (lectura dirigida frente a amplitud) para la 2.ª vuelta.
