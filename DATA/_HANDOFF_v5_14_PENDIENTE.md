# HANDOFF · corrimiento v5.14 + sistematización — LO QUE FALTA (para la siguiente sesión, modelo Opus 5)

**Escrito el sáb 19-sep-2026 ~20:00 Lima por la sesión Fable 5.1** al agotarse la sesión (100 %) y el límite semanal de
Fable (96 %). Instrucción literal de Joseph: *"reestructuración y terminar todo lo que falta en cuanto a estructura y
sistematización — todo inicia el 21/09/2026 — realizar una verificación completa al terminar, no debe tener ni un punto
que dejamos atrás"* y después *"deja todo listo para que una vez retornen los tokens trabaje Opus 5 todo lo que falta"*.

Régimen vigente: **v5.14 · D1 = LUN 21-SEP-2026 · D95 = mié 3-feb-2027 = D-1 · examen target JUE 4-FEB-2027** (15 hábiles
perdidos desde el 31-ago). REGLA: no se fusiona ni se recorta contenido; cada día perdido mueve el examen un hábil.

---

## 1 · Estado del árbol (commits)

- `76f17a2` **wip(v5.14)** — CORE COMPLETO Y VERIFICADO: planes .ts regenerados (USMLE 95 d 21-sep→3-feb; MIR 78 d →11-ene +
  mantenimiento 57 d 12-ene→31-mar; Research 42 d 22-sep→17-feb + ciclo 2 19-feb→24-ago; Derma 73 d 21-sep→13-abr + ciclo 2
  15-abr→6-jul; LIVIANO 90 d →27-ene; Business 121 →19-ene; AURUM 130 →24-mar; SYNAPSE 131 →29-ene; vibecoding 95 →3-feb),
  generadores con defaults v5.14, **Supabase ENCAPS sembrado (92 filas = 75 banqueo1h + 17 mini_sim, backup
  `study_schedule_bk_0919`, `study_metrics.extra` d1/backup/dias_ciclo/regimen v6.12)**, bancos ENCAPS (pre-test lun 21 +
  mar 22, semana 1, mini-sims realineadas), textos de la app, memoria de Claude a v5.14, plantilla Obsidian `regimen: v5.14`,
  perfil ENCAPS, tsc 0 errores, multiconjunto USMLE/LIVIANO/MIR/Business dif 0.
- **Siguiente commit (hacerlo primero en la próxima sesión, ya está en el working tree, tsc = 0):** docs USMLE + REESTRUCTURACION
  §17 completos (agente docs-usmle ✓), Calendar completo (agentes calendar-A ✓ y calendar-B ✓), `_calendar_overlays.json`
  con los 12 🔬 registrados (`--check` = 0), `encapsPlan.ts` con `regimenDe()` (parcial, compila), y las ediciones PARCIALES
  de docs-resto (cortado por el límite) en: PENDIENTES_JOSEPH.md, ENCAPS/*.md (8), DERMATOLOGIA/*.md (4), RESEARCH/*.md (5),
  BUSINESS/*.md (4). Commit sugerido: `wip(v5.14): docs USMLE + Calendar completos · docs resto parcial · encapsPlan regimenDe`.

## 2 · LO HECHO por los agentes (no repetir; verificar con grep / get_event)

### 2.1 Google Calendar (josephsototocas@gmail.com · America/Lima) — COMPLETO
- UWSA1 `o1gla7846uae4tgngvc4q45osg` → lun 21-sep 09:00-13:00 (medido). 11 overlays NBME25-33/UWSA2/Free120 con D# v5.14.
- Examen `oinh139dsnbuma9r3kfu56dhkc` → jue 4-feb-2027 07:00-16:00, título "🎯 USMLE STEP 1 · EXAMEN (target v5.14 — agendar en Prometric)".
- Overlays nuevos: **D94** `neboplchsaua4snj39nrl480nc` (mar 2-feb 07:15-12:00) · **D95** `n90bdqhohadu1eqbctv148dn28` (mié 3-feb 05:00-12:00).
- 12 overlays 🔬 Research re-fechados vía `gen_research_calendar.js` (`--set` ×12, `--check` = 0).
- **UNTIL resuelto con SERIES DE EXTENSIÓN** (create, no delete) para D93-D95 (ids MEDIDOS con get_event el 19-sep): ANKI AM 05:00 `gfapfa25hm5d9s65n7oiu0jsms` ·
  repaso 07:15 `vi7lrsm2blitpqistrt87i3sqk` · pre-test 08:15 `mlqvrm4m8bn38qfl37qddjgk5g` (evento suelto, solo lun 1-feb) · DEEP PRIME
  `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` · eval 18:00 `r850pocdgcm8pi6a42cvv37v1k` (MO,TU). ENCAPS no se extiende.
- **📋 REVISIÓN SEMANAL** creada: `21fbiohc1i47r4lqmaa3eb76l4` (sáb 07:15-07:35 desde el 26-sep, UNTIL 7-feb; default sábado, decisión sáb/dom de Joseph).
- 38 series con descripción v5.14 (23 de siempre + 9 GYM/BAILE con ids nuevos `4qvs34d84u82psvknpqhv3jc7a`, `3m8m4resu8akph4a7qfuf3h1qn`,
  `13m3tcqjjc34rt6iqfblla18q1` + SYNAPSE sáb/dom reescritas sin `<br>` + las 8 de la 2.ª tanda: 07:15, 09:00, 11:00, 18:00 alineadas a
  FRANJAS (5Q timed · regla del frente · EO + shopping list · 10Q 90 s rule-in→juez→flag), SYNAPSE 12:30, Research↔Derma, MIR 15:15
  (texto MIR_FRANJAS) y MIR 15:30).
- Pendiente de Joseph (no bugs): 4 títulos desalineados con la descripción nueva (07:15 "2Q", 11:00 "tutor", MIR 15:15 "4Q", MIR 15:30
  "Free Recall"); ALUMUERZO typo; ALISTARSE martes; GYM/BAILE de la víspera (mié 3-feb).

### 2.2 Docs USMLE — COMPLETO (agente docs-usmle ✓)
README, CALENDARIO_5_MESES (regenerado desde DIAS), PALMERTON_POR_MATERIA (692 D# + 373 fechas remapeados, 0 discrepancias),
PALMERTON_DIVERGENCIAS_PLAN (§E-5 v5.14), RECURSOS_META_2026, PALMERTON_METODO_COMPLETO §12, REESTRUCTURACION_31AGO_2026 (cabecera v5.14,
§1-§5, §13.3, **§17 nueva** con 17.8 → `DATA/SISTEMATIZACION_2026-09-19.md`, que AÚN NO EXISTE: lo escribe docs-sistematizacion).
Scripts reutilizables en `scratchpad/v514/` de la sesión anterior (pueden no existir en la nueva sesión: no depender de ellos).

### 2.3 Docs resto — PARCIAL (agente docs-resto cortado tras 100 tool calls)
Tocados (verificar uno a uno con `grep -n "v5.13\|17-sep\|1-feb\|2-feb\|29-ene\|8-ene\|7-ene\|9-abr\|25-ene\|26-ene"`): PENDIENTES_JOSEPH.md,
ENCAPS/{PROTOCOLO_HORA_MANTENIMIENTO, FASE_INTENSIVA_2027-I, PRETEST_2026-II, BANCO_PROPIO/README, RUTINA_EXTREMA_MILITARIZADA,
AUDITORIA_AGENTE_ESTUDIO_2026-07-02, CALENDAR_SEGMENTOS_LUNES_VIERNES, SENALES_2027-I}.md, DERMATOLOGIA/{PLAN_ELITE_2026-27, daily-plan,
RUTA_FELLOWSHIP_ESTETICO, ANKI_COLA/README_COLA_DERMA}.md, RESEARCH/{RUTA_PUBLICACION_2027, MENTORES, TESIS_L0/etica,
TESIS_L0/research_letter_outline, CASE_REPORT_1/caso_candidatos, lines/L4-complicaciones}.md, BUSINESS/{LIVIANO_ACADEMIA,
LIVIANO_PROTOCOLO_CLINICO_v1, PROMPT_CHAT_BUSINESS, README}.md.
**NO tocados todavía:** DATA/SYNAPSE/*.md (CURSO_IA_04H_31AGO, motor-dia-a-dia; VIBECODING_12_PROYECTOS ya regenerado),
DATA/ROADMAP_MAESTRO_2026-2034.md, DATA/REVISION_SEMANAL.md, DATA/PROTOCOLO_MODO_MINIMO.md, DATA/SYNC_ANKI_OBSIDIAN_APP.md,
DATA/MIR/** (reservado al agente MIR), DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md (reservado a calendar-doc).

### 2.4 Código — PARCIAL
`src/lib/encapsPlan.ts`: cabecera v5.14, `regimenDe(examen, metrics, days)` (origenD1/origenTotal), `STUDY_D1`/`STUDY_TOTAL_DAYS` como fallback,
`diaActual(examen, d1Override?, totalOverride?)`. Falta cablearlo en `useEncapsPlan`, la rama `modo='INTENSIVO'` en `itemsForDay` y `simDays`.
Nada más de src/** cambió. `git diff src/lib/encapsPlan.ts` lo muestra.

## 3 · LO QUE FALTA (en este orden)

### 3.1 Workflow de sistematización + consolidación (relanzar)
Script guardado: `C:\Users\Joseph Max\.claude\projects\D--joseph-md-app\3b73ef89-6aa7-49fe-a236-e6aed6aef118\workflows\scripts\corrimiento-v514-21sep-docs-sistematizacion-r2-wf_9666103b-727.js`
(run `wf_9666103b-727`; los resultados de docs-usmle, calendar-A y calendar-B están cacheados en su `journal.jsonl`). **Relanzar con
`Workflow({scriptPath, resumeFromRunId: 'wf_9666103b-727'})` SOLO si el script no se edita; si se edita (recomendado: ver abajo), lanzar nuevo.**
Lecciones: 8 agentes en paralelo revientan el límite de sesión (~1,9 M tokens en 10 min); 4 en paralelo ≈ 1,5 M en 75 min también lo
reventaron al final. **Lanzar de 2 en 2 (o 3), con prompts que digan qué está hecho y con economía de contexto.**
Agentes pendientes y sus prompts (copiar del script; ajustar "YA HECHO"):
1. **docs-resto (reintento)**: primero lo NO tocado (SYNAPSE md, ROADMAP, REVISION_SEMANAL, PROTOCOLO_MODO_MINIMO, SYNC_ANKI), luego verificar
   con grep los 22 ya tocados y completar. PENDIENTES_JOSEPH.md: verificar cabecera v5.14, fila 0, consecuencias v5.14 (lista en el script).
2. **integrador-mir**, **integrador-usmle-codigo**, **integrador-encaps** (continuar desde `regimenDe()`), **integrador-liviano-synapse-derma** —
   ficheros disjuntos según el script; ninguno empezó (el 2.º intento murió a los 0 tool calls).
3. **calendar-doc** → `CALENDAR_SEGMENTOS_V5_6.md` §16 con los ids de §2.1 de este handoff (los resultados completos de calendar-A/B están
   en `…\tasks\wlv8ydxo8.output` y en el journal del run `wf_9666103b-727`).
4. **docs-sistematizacion** → crea `DATA/SISTEMATIZACION_2026-09-19.md` (o fecha real), cierra en PENDIENTES el bloque "Para la próxima pasada de
   agentes" + "hallazgos del crítico", y `SEGUNDA_CAPA_ESTADO.md` §3.
5. **auditoria-restos** (docs) → restos v5.13 + verificación node de los 12 planes + tsc.

### 3.2 Después del workflow (orquestador)
- Aplicar `para_orquestador` de cada agente (restos en src/scripts que ellos no pueden tocar); `npx tsc --noEmit -p .` = 0.
- Idempotencia: `node DATA/_scripts/remap_inicio.js 2026-09-21` + los generadores con 2026-09-21 → `git diff` vacío (A VERIFICAR pendiente desde v5.10).
- **Workflow de VERIFICACIÓN COMPLETA** (lo pidió Joseph: "ni un punto que dejamos atrás"), multi-lente y loop-until-dry: (a) planes .ts con node
  (cifras del §3 del script de auditoría), (b) restos v5.13/17-sep en DATA+src, (c) Calendar en vivo con `list_events` de lun 21-sep, vie 2-oct,
  vie 15-ene, lun 1-feb, mar 2-feb, mié 3-feb, jue 4-feb (overlays, extensiones, revisión semanal), (d) Supabase (`study_schedule` 75+17,
  `study_metrics.extra`), (e) bancos ENCAPS (pretest 21/22, evals 22-24 con 5Q, minisims 25-sep/2-oct/9-oct, inventario), (f) PENDIENTES:
  cada ítem o cerrado o explícitamente de Joseph, (g) memoria + plantilla Obsidian, (h) tsc + `npx expo export --platform web`; crítico de
  completitud al final; 2 rondas secas para cerrar.
- `npx expo export --platform web` → commit `feat(v5.14): corrimiento a D1 = lun 21-sep-2026 · D95 = mié 3-feb = D-1 · examen target jue 4-feb-2027 + sistematización`
  (Co-Authored-By según el system-reminder de esa sesión) → push → Vercel: `sh scratchpad/vercel_check.sh` (o a mano: bundle debe contener
  `USMLE Step 1 v5.14`, `inicio:'2026-09-21'`, `examenTarget:'2027-02-04'`, `ENCAPS:92`) → PENDIENTES línea "Deploy a Vercel" → commit → push →
  SendUserFile PENDIENTES → informe.

## 4 · Datos v5.14 que necesita cualquier agente (leídos de los .ts con node el 19-sep)
- USMLE: D1 lun 21-sep = UWSA1 · hitos NBME25 D10 · 26 D25 · 27 D40 · 28 D55 · 29 D65 · 30 D72 (mié 30-dic) · UWSA2 D77 · NBME31 D82 (vie 15-ene,
  el día siguiente al cierre de contenido D81 jue 14-ene) · 32 D83 · 33 D85 · Free120 D87 · fases A D1-81 / B D82-86 / C D87-95 · viernes N3
  D15/D20/D35/D45/D50 · N4 solo D60 (11-dic) · taper D94 mar 2-feb (última sesión de banco) · D95 mié 3-feb (D-1) · examen jue 4-feb · finde
  30-31 ene libre entre D92 y D93 · 5560Q · 20 semanas (S1 = 21-25 sep).
- ENCAPS 92 d (21-sep→29-ene), pre-test lun 21 + mar 22, mini-sim vie 25-sep = D5, bk_0919, intensiva propuesta vie 5-feb / lun 8-feb.
- MIR 78 d →lun 11-ene; mantenimiento 57 d mar 12-ene→31-mar (46 lun-jue + 11 vie, 12 Tier C desde jue 14-ene, reducido hasta 3-feb; jue 4-feb = D18 normal → decisión).
- Research 42 d mar 22-sep→mié 17-feb (pausa 4→29-ene; CR-9 lun 1-feb = D93, ya no víspera); ciclo 2 vie 19-feb→mar 24-ago; hitos M1 28-sep · C-2 6-oct ·
  T-1 8-oct · C-6 26-oct · CR-1 30-oct · T-8 1-dic · X-1 7-dic · CR-8 17-dic · CR-9 1-feb · X-9 25-feb · R10 3-mar · R43 13-jul.
- Derma d1 lun 21-sep → d73 mar 13-abr; d42 15-ene · d43 19-ene Mohs · taper d44-d49 21-ene→4-feb (d49 = día del examen) · d50 8-feb; ciclo 2 15-abr→6-jul.
- LIVIANO 90 d →mié 27-ene: caso 1 vie 25-sep (D5) … caso 16 D87 vie 22-ene ANTES del capstone D89 mar 26-ene; drills D37/D58/D75/D88; trimestrales D46/D90;
  Acceso Perú D39 + D41-D44. Business 121 →19-ene. AURUM 130 →24-mar (pitch v5 D95 mié 3-feb = D-1). SYNAPSE 131 d →vie 29-ene. Vibecoding S1-S12 =
  semanas de calendario (S6 = deload post-NBME 26 con el flag en S7 → decisión).

## 5 · Decisiones de Joseph acumuladas (no las toma ningún agente)
Prometric jue 4-feb + eligibility · aceptar el NBME 31 sin banco de consolidación delante (o mover el GO/NO-GO al NBME 32) · intensiva ENCAPS
vie 5-feb o lun 8-feb · MIR jue 4-feb reducido/vacío · AURUM pitch v5 el 3-feb (D-1) · Derma d49 el 4-feb (swap d43↔taper opcional) · vibecoding
flag deload S7 vs semana S6 · revisión semanal sáb (creada) vs dom · GYM/BAILE víspera · 4 títulos de series · ALUMUERZO · ALISTARSE martes ·
reponer stock de bancos ENCAPS (V-2 179 · I-3 165 · III-5 90 antes del jue 22-oct …) = CONTENIDO, no estructura.
