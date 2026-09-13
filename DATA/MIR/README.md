# DATA · MIR — España

Toda la data REAL del plan MIR. Fuente canónica (código): `src/lib/*.ts`. Plataforma:
**ProMIR** (`promir.medicapanamericana.com`) — SPA por WebSocket; deep-link `/capitulo/<id>`.
Abre bien en Chrome (no necesita Edge). Cruzado con **rabi_94** (Google Drive, 1ª vuelta).
Método de referencia: **Palmerton** (comprensión > memorización · preguntas ciegas primero ·
Anki de mecanismo FSRS · medir por % ciego). Meta: Top 50 MIR 2030.

> v3 "cero puntos ciegos" (5-sep-2026): selección por Peso MIR + núcleo rabi_94, Epi/Bioética
> en D1-D4, bloques alineados al Step 1, eval multi-temporal, registro de mediciones, test de
> cierre, mini-MIR D77, modo banqueo ene-mar 2027. El Calendar (15:15-16:15 L-V) NO cambia.
>
> **v5.10 (12-sep-2026): D1 = LUN 14-SEP-2026.** El 11 de septiembre tampoco se estudió → +1 día hábil
> sobre v5.9. Es el **noveno corrimiento** (31-ago → 14-sep; 10 días hábiles perdidos).
> Regla literal de Joseph, reconfirmada en este corrimiento:
> **ni un tema ni un subtema se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe
> alargando el final. El plan sigue teniendo **78 días** y las franjas, metas y contenidos son
> idénticos: solo se re-fechó. Como el 31-dic y el 1-ene no son días hábiles del plan, la cola salta a
> enero: D77 (mini-MIR) queda el **mié 30-dic-2026** y D78 (corrección) pasa de mié 30-dic al **lun 4-ene-2027**,
> el mismo día en que arranca el mantenimiento (ese lunes se hace la corrección; el banqueo empieza el mar 5-ene —
> **A VERIFICAR (12-sep)** cómo lo muestra la app, que hoy hace fallback al mantenimiento cuando no hay `DiaMIR`).
> El mantenimiento (4-ene→31-mar-2027) NO se mueve de fechas; solo su modo reducido se alarga hasta el **mié 27-ene** (D95 del Step 1).

## 1. Plan día-a-día (78 días = 76 temas + D77 mini-MIR + D78 corrección · D1 lun 14-sep-2026 → D78 lun 4-ene-2027)
Fuente de verdad: [`src/lib/mirDailyPlan.ts`](../../src/lib/mirDailyPlan.ts) (bloque GENERADO por
[`STUDY_HUB/_scrape/gen_mir_daily.js`](../../STUDY_HUB/_scrape/gen_mir_daily.js) `[YYYY-MM-DD]`).
L-V, sáb+dom libres, skips = 25-dic, 31-dic y 1-ene (no son días hábiles del plan), hasta el lun 4-ene-2027 (D77 mini-MIR mié 30-dic · D78 corrección lun 4-ene). 1 tema atómico/día, 1ª vuelta.

**Regla de selección (v3):** por asignatura, top-N capítulos por `pesoPct` de `mirDetalleData`
(N = días del bloque) + los capítulos **núcleo rabi_94** (`mirPrioridades1V`) forzados: un núcleo
que no entra por peso sustituye al de menor peso no-núcleo del top-N si su peso ≥ (ese − 0,5).
Match título ProMIR ↔ nombre MIR_DETALLE **exacto normalizado** (NFD sin tildes) + fallback manual
explícito (17 títulos truncados/paréntesis). Dentro del bloque, los capítulos "cimiento"
(fisiología/semiología/básica) abren y el resto va por peso desc. Asserts en el generador:
cobertura por bloque ≥ 90 % del óptimo top-N · todo `peso` a ±0,05 de MIR_DETALLE (nunca null en
temas) · capIds reales de `mirTemarioData` · fechas L-V · D1-D4 = Epi×3 + Bioética×1.

**Orden de bloques = cada asignatura PRECEDE ~1 semana a su sistema Step 1** (clínica en español
como prime → mecanismo en inglés 7 días después = re-exposición espaciada del mismo sistema).
Homólogo Step 1 = rangos reales de `usmleStep1Daily.ts` **v5.10** (95 días, D1 = lun 14-sep-2026 → D95 = mié 27-ene-2027),
leídos del array `DIAS` — no estimados.

| # | Asignatura | Días MIR | Fechas | Capítulos (orden del bloque) | Cobertura peso | Homólogo Step 1 | Lag |
|---|------------|----------|--------|------------------------------|----------------|-----------------|-----|
| 1 | Epidemiología (Tier S) | D1–D3 | 14-sep→16-sep | Ensayo clínico 32,2 · Clasificación de estudios 24,3 · Pruebas diagnósticas 13,5 | 70,1 / 70,1 | Biostats/Epi (D78, 4-ene) | — |
| 2 | Medicina Legal y Bioética (Tier S) | D4 | 17-sep | Principios de bioética y relación médico-paciente 39,8 | 39,8 / 39,8 | Ethics/Behavioral (D78, 4-ene) | — |
| 3 | Cardiología | D5–D11 | 18-sep→28-sep | Cardiología básica · Ritmo · Isquémica · IC · Valvulopatías★ · Riesgo CV · Miocardio | 71,8 / 71,8 | Cardiovascular D6–D16 (21-sep→5-oct; D15 = NBME 25) | ⚠ +3 d |
| 4 | Neumología | D12–D16 | 29-sep→5-oct | Fisiología★ · Cáncer de pulmón★ · Pleura/mediastino · EPOC★ · Intersticiales | 61,2 / 61,2 | Respiratory D17–D22 (6→13-oct) | +7 d |
| 5 | Nefrología | D17–D22 | 6-oct→13-oct | Fisiología renal★ · FRA · GN primarias · Riñón y sistémicas · IRC · Síndromes clínicos | 80,5 / 80,5 | Renal D23–D28 (14→21-oct) | +8 d |
| 6 | Gastroenterología | D23–D30 | 14-oct→23-oct | Hígado · Colon · Intestino delgado · Estómago★ · Misc. quirúrgica · Páncreas · Esófago★ · Vía biliar | 100 / 100 | Gastrointestinal D29–D36 (22-oct→2-nov; D30 = NBME 26) | +8 d |
| 7 | Endocrinología y Nutrición | D31–D36 | 26-oct→2-nov | DM★ · Tiroides★ · Hipófisis · Suprarrenales · Nutrición/obesidad · Lípidos | 78,0 / 78,0 | Endocrine D37–D41 (3→9-nov) | +8 d |
| 8 | Neurología | D37–D43 | 3-nov→11-nov | Semiología · Neurocirugía · ECV★ · Movimiento · Epilepsia · Demencias · Cefaleas | 76,6 / 76,6 | Nervous System D42–D50 (10→20-nov; D45 = NBME 27) | +7 d |
| 9 | Hematología | D44–D48 | 12-nov→18-nov | Coagulación 21,5 · Linfomas · Hemolíticas · Carenciales · NMP | 65,0 / 65,0 | Hematology & Oncology D51–D56 (23→30-nov) | +11 d |
| 10 | Enfermedades Infecciosas | D49–D56 | 19-nov→30-nov | Tropicales 12,6 · VIH · TBC · ITRI/neumonía · SNC · Antibacterianos★ · Hongos · Sepsis | 62,9 / 62,9 | Microbiology / ID D57–D64 (1→10-dic; D60 = NBME 28) | +12 d |
| 11 | Ginecología y Obstetricia | D57–D62 | 1-dic→8-dic | Ca mama★ 15,7 · Hemorragia gestación · Complicaciones maternas · Infecciones y embarazo · Control gestación · Masas anexiales/Ca ovario★ | 46,7 / 46,7 | Reproductive D65–D69 (11→17-dic) | +10 d |
| 12 | Reumatología | D63–D68 | 9-dic→16-dic | Vasculitis★ · Espondiloartropatías · Otras conectivopatías · AR · Cristales★ · LES★ | 65,1 / 65,5 | Musculoskeletal / Rheum D71–D73 (21→23-dic) | +12 d |
| 13 | Pediatría | D69–D73 | 17-dic→23-dic | Digestivo · Neonatología · Desarrollo/nutrición · Infecciosa · Vacunación (🇪🇸 delta) | 78,1 / 78,1 | — (sin homólogo) | — |
| 14 | Psiquiatría | D74–D76 | 24-dic→29-dic | Ánimo★ · Neuróticos★ · Psicóticos | 61,5 / 61,5 | Psychiatry & Behavioral D74–D78 (24-dic→4-ene; D77 = NBME 30) | ⚠ 0 d |
| — | Repaso integral | D77 | 30-dic | **mini-MIR 40Q mixto cronometrado (51 min · 77 s/Q · en blanco permitido)** | — | — | — |
| — | Repaso integral | D78 | 4-ene-2027 | **corrección Whole-Page + Shopping List + tabla de neto por asignatura = baseline abr-2027** | — | — | — |

> **Nota v5.10 — las dos correspondencias estrechas siguen ahí, Cardiología algo mejor.** MIR mantiene 78
> días y Step 1 mantiene 95: en v5.10 **no se fusionó ni se recortó nada**, el día perdido se absorbió
> alargando el Step 1 hasta el mié 27-ene-2027 (examen target vie 29-ene). `Lag` = días naturales entre el inicio del bloque MIR
> y el inicio de su sistema Step 1 (cálculo sobre las fechas reales de los dos `.ts`, no estimado).
> - **Cardiología (⚠ +3 d):** MIR arranca el vie 18-sep y Cardiovascular el lun 21-sep (el UWSA1 ocupa el
>   D1 y el contenido del Step 1 empieza el mar 15-sep, así que Cardio USMLE cae un lunes). El prime en
>   español precede al mecanismo en inglés por un fin de semana (1 día hábil): mejor que el +1 de v5.9,
>   pero sigue siendo la correspondencia más débil del plan y el "espaciado de 7 días" no se cumple.
> - **Psiquiatría (⚠ 0 d):** ambos arrancan el jue 24-dic — solapamiento total, igual que en v5.6-v5.9.
>   Aquí el prime es simultáneo, no anticipado.
> - Los otros 9 bloques quedan entre **+7 y +12 días** (Neumo y Neuro +7 · Nefro, Gastro y Endo +8 ·
>   Gine +10 · Hemato +11 · Infecto y Reuma +12), es decir dentro o por encima del objetivo
>   de ~1 semana. No se re-permuta el MIR para arreglar Cardiología: hacerlo movería 11 bloques y
>   el objetivo primario hasta el 29-ene es el Step 1, no el MIR.

★ = núcleo rabi_94. Total: **957,4 puntos-peso** de 957,8 óptimos (plan previo: 744,2 · +28,6 %).
Núcleos que NO entran (peso demasiado bajo; el generador lo avisa): Intro endocrino 1,9 · Bacterias
generalidades 3,2 · Ca endometrio 4,1 · Ca cérvix 2,5 · Ca vulva 0,6 · Reuma "Introducción" 6,1.
En Reuma el núcleo LES (8,41) sustituye a Enf. metabólica ósea (8,77) → 99,5 % del óptimo.

Cada fila `DiaMIR`: `d, fecha, asignatura, num, rent, tema, capId (deep-link ProMIR), peso (Peso MIR
% real), vuelta, resumenVid, usmleSystem, sub ('epi'|'bio'|null)`. **`resumenVid` es la duración
del vídeo RESUMEN DE LA ASIGNATURA completa (Cardio 2:27 h, Gastro 3:21 h…), no del capítulo: no se
ve entero en el bloque.** `MIR_COBERTURA` guarda cobertura/óptimo por bloque.

### Tabla de cobertura antes → después (puntos de Peso MIR cubiertos por asignatura)
| Asignatura | Antes (días · cobertura / óptimo) | Después (días · cobertura / óptimo) | Cambio |
|------------|-----------------------------------|-------------------------------------|--------|
| Epidemiología | 0 d · 0 | 3 d · 70,1 / 70,1 | **nuevo** (Tier S "empieza aquí" que faltaba) |
| Medicina Legal y Bioética | 0 d · 0 | 1 d · 39,8 / 39,8 | **nuevo** |
| Cardiología | 8 d · 73,8 / 77,0 | 7 d · 71,8 / 71,8 | −1 día (Síncope 2,6 e HTA 4,5 fuera), óptimo |
| Gastroenterología | 8 d · 100 / 100 | 8 d · 100 / 100 | = (pesos corregidos: antes 22,13 en 7 de 8) |
| Nefrología | 6 d · 80,5 / 80,5 | 6 d · 80,5 / 80,5 | = |
| Endocrinología | 7 d · 79,9 / 85,2 | 6 d · 78,0 / 78,0 | −1 día (Intro 1,9 fuera), óptimo |
| Neumología | 6 d · 43,9 / 69,6 | 5 d · 61,2 / 61,2 | +17,3 con 1 día menos (entran Ca pulmón, Pleura, Intersticiales) |
| Infecciosas | 8 d · 48,4 / 62,9 | 8 d · 62,9 / 62,9 | +14,5 (Tropicales 12,6 + VIH 10,8 + Hongos) |
| Neurología | 7 d · 76,1 / 76,6 | 7 d · 76,6 / 76,6 | +0,5 (Cefaleas por EM) |
| Reumatología | 6 d · 61,0 / 65,5 | 6 d · 65,1 / 65,5 | +4,1 (Otras conectivopatías; Cristales peso null → 8,41) |
| Hematología | 5 d · 26,2 / 65,0 | 5 d · 65,0 / 65,0 | **+38,8** (Coagulación 21,5 + Linfomas 13,1 + NMP 9,1) |
| Ginecología y Obstetricia | 6 d · 15,2 / 46,7 | 6 d · 46,7 / 46,7 | **+31,4** (Ca mama 15,7 + Hemorragia + Complicaciones + …) |
| Pediatría | 5 d · 76,8 / 78,1 | 5 d · 78,1 / 78,1 | +1,3 (Vacunación por Respiratorio) |
| Psiquiatría | 4 d · 62,4 / 72,1 | 3 d · 61,5 / 61,5 | −1 día (Intro 0,9 fuera), óptimo |
| **Total** | **76 d · 744,2 / 879,2** | **76 d · 957,4 / 957,8** | **+213 pts · pesos erróneos 20 → 0** |

## 2. Temario + detalle (30 asignaturas reales)
- [`src/lib/mirTemarioData.ts`](../../src/lib/mirTemarioData.ts) — 30 asignaturas, capítulos con `capId` + deep-link, rentabilidad (chart "Distribución MIR"). Raw `STUDY_HUB/_scrape/promir_full_temario.json`.
- [`src/lib/mirDetalleData.ts`](../../src/lib/mirDetalleData.ts) — por asignatura: Peso MIR % por tema, páginas, horas, Enfoque, subtemas top, vídeos. Raw `_scrape/mir_detalle_clean.json` + `intros/NN_*.json`.
- [`src/lib/mirPrioridades1V.ts`](../../src/lib/mirPrioridades1V.ts) — núcleo 1ª vuelta rabi_94 (CTO×AMIR×MirAsturias).
- [`src/lib/mirDriveResources.ts`](../../src/lib/mirDriveResources.ts) — resúmenes Drive (Mirnion `.note`, MIR 2022 PDF).
- Verificados con vídeos+duraciones: `mirCardiologiaData.ts`, `mirDigestivoData.ts`.
- Dato corregido en `mirData.ts` (Tier S): **Epidemiología ~10 Q/año (~5 % del MIR; 3 capítulos = 70 %) · Estadística inferencial 0 Q en 5 años (ProMIR) · Bioética ~1,2 % (Principios = 40 % del bloque)**. La nota antigua "Estadística 6-10 Q" era falsa.

## 3. Bloque diario 15:15–16:15 (Google Calendar — verificado, NO modificar; solo se rebalancea el interior)
`MIR_FRANJAS` en `mirDailyPlan.ts`. Tiempo real por pregunta MIR = **77 s** (210Q / 270 min), no 90-100 s.
**17-19 Q/día** (antes 7) con −40 % de lectura. Fuente de preguntas = **test del capítulo ProMIR**
(verificado, logueado) o cuadernillos oficiales (examenesmir.com). "AMIR Test" no está verificado → no se prescribe.

| Hora | Fase |
|------|------|
| 15:15–15:22 | **EVAL ANCLADA 4Q multi-temporal** = 2Q tema D-1 + 1Q tema D-3 + 1Q tema D-7 (77 s/Q, en blanco permitido) |
| 15:22–15:27 | Anki APEX::MIR (FSRS · Good/Again · retention 0,85) |
| 15:27–15:30 | Log de la eval en la app (aciertos/4 · brecha knowledge/transfer/proceso · 🇪🇸 delta · fallo D-7 → **cola D+14**) |
| 15:30–15:38 | PRE-TEST 5Q ciegas del capítulo nuevo → marca los gaps |
| 15:38–15:53 | LECTURA DIRIGIDA solo a los gaps (Whole Page Rule sobre el capítulo ProMIR; vídeo solo si el clip ≤12 min está verificado) |
| 15:53–16:05 | 8-10Q comentadas del capítulo · Rule-In → Rule-Out · cover-the-options |
| 16:05–16:15 | ≤4 APEX desde el Shopping List (plantilla APEX-MIR, §5) |

- **1er día de cada bloque:** 15:15–15:30 = **TEST DE CIERRE** 10Q reales de la asignatura recién
  cerrada (13 min · 77 s/Q · en blanco permitido) → neto = A − F/3 · **≥70 % consolidada · 55-69 %
  intermedia · <55 % entra a la rotación de anclas D-7** hasta recuperar (`mirCierreDe`, `mirFranjasDe`).
- **Sáb y dom libres:** no existe "repaso finde". Lo que falla en D-7 va a la **cola D+14** (`mirColaD14`).
- Helpers: `mirAnclas(d)` → `{d1,d3,d7}` · `mirSesionDe(fecha)` → plan | mantenimiento · `mirBloques()` · `mirMinutos(nQ)`.
- Puente Step 1: [`src/lib/mirUsmleBridge.ts`](../../src/lib/mirUsmleBridge.ts) → `mirUsmleBridge(fecha)`
  = "Step 1 esta semana: Cardiovascular D6-D10" + homólogo completo; `usmleMirParalelo(fecha)` para la UI USMLE
  ("MIR en paralelo: Cardiología (D5-D11)"). Solo lectura de `usmleStep1Daily.DIAS`.

## 4. Medición (Palmerton: "medir por % ciego") — [`src/lib/mirEvalLog.ts`](../../src/lib/mirEvalLog.ts)
Registro **append-only** en localStorage `jmd-mir-eval-log`:
`{fecha, d, tema, asignatura, num, aciertos, total, blancos, tiempoSeg, tipoError:'knowledge'|'transfer'|'proceso', ccsn?, delta_es, kind, anclas?}`.
- `kind`: `anclada` (4Q) · `pretest` (5Q, diagnóstico, no cuenta) · `cierre` (10Q) · `miniMIR` (40Q, D77) · `mantenimiento` (25/30/10Q).
- Taxonomía unificada Palmerton (knowledge / transfer / proceso) + subtipo CCSN heredado de ENCAPS +
  **`delta_es`** = fallo por contestar con el manejo Perú/USA (terminología, guías españolas, calendario vacunal, legislación).
- `mirNeto` (A − F/3) · `mirStatsPorAsignatura` · `mirPeorAsignatura` (alimenta los viernes del mantenimiento) ·
  `mirAsignaturasEnAnclasD7` · `mirColaD14` · `mirEvalLogExportJSON` / `mirEvalLogImportJSON` (merge por id).
- **MIR_READINESS ya no es un 5 hardcodeado:** `mirReadiness()` (mirData.ts) = mini-MIR > media de cierres > ancladas > 0.
- D77 = mini-MIR 40Q (solo plantilla + neto) · D78 = corrección Whole-Page + `mirBaselineTabla()` (neto por asignatura = baseline honesto abr-2027).
- Pendiente (fuera de la app): volcar el export JSON en `DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json` con `plan:'MIR'` o en una tabla Supabase `mir_eval_log`.

## 5. Anki · preset FSRS `APEX::MIR` y plantilla APEX-MIR
- Deck raíz `APEX::MIR::<asignatura>` (`ankiLinks.mirAnkiDeck`; se crean lazy, hoy solo existe `cardiologia`).
- **Preset FSRS "APEX::MIR"** (separado del USMLE): desired retention **0,85 hasta el 31-mar-2027** (→ 0,90 al
  entrar en la fase principal) · solo Good/Again · nuevas ≤4/día · límite de repasos sin capar (la franja de
  5 min soporta ~40-60 reviews; si el deck marca >60 vencidas dos días seguidos → bajar nuevas a 2 esa semana).
  Configurarlo es manual en Anki escritorio (A VERIFICAR 05-sep: no hay acceso AnkiConnect desde la app).
- **Plantilla APEX-MIR** (campos obligatorios): `SAQ conceptual` · `Por qué (mecanismo fisiopatológico)` ·
  `🇪🇸 delta vs Perú/USA` (obligatoria si `delta_es`; si no aplica: "= igual") · `Tag sistema USMLE`
  (doble tag `APEX::MIR::<asig>` + `<usmleSystem>` del día) · `Pregunta oficial origen` (año-nº cuando exista el pool).
- **Cuota 1 de cada 4 APEX = tarjeta drill con imagen real** del capítulo ProMIR (ECG, Rx, analítica, derma):
  formato "Cardio — ECG: ¿qué muestra y qué haces?". El MIR trae ~25 preguntas con imagen.

## 6. Mantenimiento ene-mar 2027 (banqueo puro) — [`src/lib/mirMantenimiento.ts`](../../src/lib/mirMantenimiento.ts)
Generado por [`DATA/_scripts/gen_mir_mantenimiento.js`](../../DATA/_scripts/gen_mir_mantenimiento.js) `[inicio] [fin]`
(default 4-ene→31-mar-2027; 63 días L-V, salta sáb/dom y 1-ene). Sin contenido nuevo.
- **normal:** 15:15–15:30 Anki APEX::MIR · 15:30–16:02 25Q reales MIR (15Q asignatura foco + 10Q interleaving · 77 s/Q = 32 min) · 16:02–16:15 corrección (13 min).
- **viernes:** 15:15–15:25 Anki · 15:25–16:04 **30Q de la asignatura PEOR del log** (`mirMantFoco(dia, mirPeorAsignatura())`; fallback = mayor peso de la semana) · corrección + neto semanal.
- **modo reducido 4-27 ene** (Fase B/C Step 1, flag `modo:'reducido'`, **18 días** — cubre hasta el D95 del Step 1, mié 27-ene; `REDUCIDO_HASTA = '2027-01-27'` en el generador, v5.10): 15:15–15:35 Anki · 15:35–15:48 10Q · 15:48–15:55 log · resto al Step 1. El jue 28-ene (descanso pre-examen) y el vie 29-ene (examen) ya van en modo normal según el `.ts`: **A VERIFICAR (12-sep)** con Joseph si esos dos días también deben ir a Anki + 10Q.
- Rotación lun-jue **ponderada por Peso MIR global** (texto real del intro ProMIR, `mirDetalleData.pesoGlobal`;
  cuotas exactas por resto mayor + smooth weighted round-robin): Cardio 6 · Gastro 6 · Neuro 5 · Infecto 5 ·
  Endo 4 · Neumo 4 · Reuma 4 · Epi 3 · Nefro 3 · Hemato 3 · Psiq 3 · Pedia 2 · Gine 2 · Bioética 1 (= 51 slots).
- `MirTodayPlan` hace fallback automático a este plan cuando no hay `DiaMIR` (pestaña "Banqueo").
- **Handoff 31-mar:** export JSON del log + tabla de neto por asignatura + stats FSRS del deck → entrada de la fase principal (abr-2027).

## 7. Ficheros canónicos y pipeline
- `src/lib/mirDailyPlan.ts` — plan 78 días (MIR_DIAS, MIR_FRANJAS, MIR_COBERTURA, helpers). GENERADO entre marcadores.
- `src/lib/mirMantenimiento.ts` — 63 días ene-mar 2027 (GENERADO). `src/lib/mirEvalLog.ts` — registro/neto/readiness.
- `src/lib/mirUsmleBridge.ts` — puente Step 1 (lectura). `src/lib/mirPreguntasOficiales.ts` — esqueleto del pool oficial (vacío, A VERIFICAR).
- `src/lib/mirTemarioData.ts` / `mirDetalleData.ts` / `mirPrioridades1V.ts` / `mirDriveResources.ts` / `mirData.ts`.
- UI: `src/components/study/MirHub.tsx` (readiness derivado) + `MirTodayPlan.tsx` (HOY/Horario/7d/Temario + anclas + formularios + banqueo) + `MirTemarioExplorer.tsx`.
- Raw: `STUDY_HUB/_scrape/promir_full_temario.json`, `mir_detalle_clean.json`, `intros/`.
- **Corrimiento** (cada día sin estudiar = +1 hábil): `node DATA/_scripts/remap_inicio.js <fecha>` re-fecha MIR_DIAS por regex
  (formato `fecha:"YYYY-MM-DD"` conservado; 78 filas) — o regenerar con `node STUDY_HUB/_scrape/gen_mir_daily.js <fecha>`
  (misma salida + verificación). El mantenimiento tiene fechas fijas (4-ene→31-mar) y no se corre; lo único que sigue al Step 1 es
  `REDUCIDO_HASTA` (= D95 del Step 1: v5.10 → `2027-01-27`), y se regenera con `node DATA/_scripts/gen_mir_mantenimiento.js`.
- `node STUDY_HUB/_scrape/gen_mir_daily.js --check` = test: falla (exit 1) si algún `peso` difiere >0,05 de MIR_DETALLE,
  si un capId no existe, si D1-D4 no son Epi+Bioética o si alguna fecha cae en finde.

## 8. Pendientes (fuera del alcance de la app)
- Pool de preguntas oficiales por capítulo (`mirPreguntasOficiales.ts`): scrape logueado de ProMIR ("preguntas MIR de este
  capítulo") o clasificación de cuadernillos examenesmir.com 2024-2026. Sin él, pre-test/eval/cierre usan el test del capítulo ProMIR.
- Acceso AMIR: no verificado → todo el loop se apoya en ProMIR + cuadernillos oficiales.
- Preset FSRS APEX::MIR (retention 0,85) y plantilla APEX-MIR: configurar en Anki escritorio.
- Obsidian: `obsidianMap.ts` mapea MIR por `capId` (no por día) → el nuevo orden no requiere regenerarlo.
