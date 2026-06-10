# PROMPT — Chat SYNAPSE: motor día-a-día de formación élite en IA + Calendar 30'

> Copiar TODO lo que sigue (desde "ROL" hasta el final) en un chat nuevo de Claude Code
> abierto en `D:\joseph-md-app`. Diseñado el 10-jun-2026 por el chat principal de Joseph MD.

---

ROL: Eres un diseñador/ingeniero de élite trabajando para el Dr. Joseph Soto Tocas en
`D:\joseph-md-app` (Expo 55 + React Native Web → Vercel `joseph-md-app.vercel.app`, branch
`master`, deploy automático desde master). Tu misión: convertir la sección **SYNAPSE** 🧠
(ya existente en la app — sidebar, hub con Ruta/Biblioteca/Protocolo, 93 materiales con URL
verificada) en un **motor día-a-día** como los de ENCAPS/MIR/Business: misión exacta de HOY,
progreso real por lección, y los 30 min/día insertados en Google Calendar en espacios muertos.
Trabajas en automático: no preguntas lo que puedas verificar leyendo código.

## CONTEXTO — qué es SYNAPSE

El objetivo de Joseph (verbatim): llegar a ser "un especialista en inteligencia artificial
que conoce Python, conoce data science, conoce todo... lo que buscan las más grandes
empresas, por ejemplo los que contrata Anthropic, los de esa beca para Anthropic [Fellows
Program]... experto en ciberseguridad, experto en creación de agentes y workflows... por los
referentes, por los que han estudiado en Harvard, en Stanford... no por youtubers del momento".
El inicio es "la escuela/licenciatura básica de Anthropic" (= Anthropic Academy, F0 de la ruta).

## PASO 0 — LEE TODO ESTO ANTES DE TOCAR NADA (en este orden)

1. `DATA/SYNAPSE/materiales-verificados.md` — los 93 materiales con URL VERIFICADA
   (workflow de 13 agentes, 10-jun-2026) + notas de orden sugerido por frente + veredicto
   del auditor. **Esta es tu fuente canónica de materiales.**
2. `DATA/SYNAPSE/_raw_findings.json` — la misma data en JSON estructurado (úsala para
   generar; tiene campos formato_espacios_muertos, duracion, nivel por material) + los
   requisitos REALES de 3 puestos de Anthropic y del Fellows Program (en `notas` del
   frente "anthropic").
3. `src/lib/synapseData.ts` — la data curada que ya consume la app: 7 fases (F0 Escuela de
   Anthropic → F6 Fellows), biblioteca por categorías, protocolo 30', nivel meta,
   advertencias. **Respeta sus tipos y nombres.**
4. `src/components/study/SynapseHub.tsx` — el hub ya construido (HERO + Ruta/Biblioteca/
   Protocolo, acento índigo #818CF8). Tu motor "HOY" se añade aquí como primera pestaña.
5. `src/lib/businessStudyPlan.ts` + `src/components/study/StudyPulsoHub.tsx` — EL MOLDE del
   motor día-a-día (misiones diarias generadas, así lo hizo Business). También mira
   `src/components/study/EncapsPlanView.tsx` y `ResearchTodayPlan.tsx` para el patrón "HOY".
6. `src/lib/studyProgress.ts` — progreso REAL manual (localStorage `jmd-study-progress-v1`,
   PlanKey por plan, empieza en 0%). Extenderás PlanKey con `'synapse'`.
7. `src/layouts/DesktopRightPanel.tsx` (función `SynapseRightPanel`) — el panel derecho ya
   muestra fase actual + protocolo + quick links; conéctalo al motor cuando exista.
8. `DATA/BUSINESS/hormozi-method.md` — para el tono de las misiones (acción concreta,
   una sola siguiente acción obvia, cero bullshit motivacional).

## MISIÓN 1 — Motor día-a-día `synapseDailyPlan.ts` (como ENCAPS/Business)

1. Genera `src/lib/synapseDailyPlan.ts` (marca el archivo como GENERADO + script generador
   en `DATA/_scripts/` si lo haces por script, patrón de `businessStudyPlan.ts`).
2. Estructura del día (30 min en huecos — instrucción verbatim de Joseph: "ponle como
   treinta minutos al día dividido así en espacios cortos, en espacios muertos"):
   - **Bloque A (15', pantalla)** — lección ACTIVA de la fase actual: lección/capítulo
     EXACTO del material del día con su link directo (p. ej. "AI Fluency — módulo 2:
     Delegation" → URL skilljar). Avanza secuencialmente por los materiales de cada fase
     de `SYNAPSE_FASES` respetando el ORDEN SUGERIDO de las notas del frente en el JSON.
   - **Bloque B (10', audio)** — el podcast/vídeo del día desde la categoría "Audio para
     espacios muertos" (rota: No Priors → Dwarkesh → Lex troceado con timestamps → canal
     Anthropic → The Batch los jueves que sale).
   - **Bloque C (5', lectura móvil)** — píldora corta: artículo de Willison, capítulo de
     Pro Git, sección del ensayo de Anthropic, etc.
   - **Sábado o domingo (60–90', PC, OPCIONAL)** — el bloque de teclado: ejercicios de
     código/notebooks/proyecto público de la fase (Zero to Hero, ARENA, psets…).
3. Cada misión diaria lleva: id estable, fase, material, lección concreta, url, formato
   (pantalla/audio/lectura/PC), duración. Checkbox de progreso real (`studyProgress` con
   PlanKey `'synapse'`) — empieza en 0%, NADA derivado de fechas.
4. Pestaña "⚡ Hoy" como PRIMERA pestaña de SynapseHub: misión de hoy (los 3 bloques),
   racha/semana, % de fase, botón al material. Los ✓ alimentan el RingStat "Completadas".
5. Cobertura: genera como mínimo las primeras 12 semanas (F0 completa + arranque F1) día a
   día; el resto puede generarse por fase al avanzar (documenta cómo regenerar).
6. NO inventes lecciones: si no conoces el índice interno de un curso (p. ej. los títulos
   de las 13 lecciones de Claude 101), entra a la página real (WebFetch/Chrome DevTools MCP)
   y extrae el temario REAL; si no es accesible, la misión dice "siguiente lección de <curso>"
   con el link — honesto, sin inventar títulos.

## MISIÓN 2 — Google Calendar: los 30 min en espacios muertos

Instrucción verbatim de Joseph: "¿en qué parte de Google Calendar ingresará esto? ...en
cuarto de hora de lectura del libro dentro de Pulso... cuarto de hora en alguna parte más
del calendario donde podamos estar libres o en viajes o mientras estamos descansando entre
gaps o en el almuerzo cuando terminamos rápido o en nap estricto tal vez diez minutos. En
general ponle como treinta minutos al día dividido en espacios cortos, en espacios muertos."

1. LEE primero el calendario real (MCP de Google Calendar, `list_events` de los próximos
   7-14 días) para localizar: (a) el bloque de lectura Pulso existente, (b) los gaps reales
   entre bloques de estudio (ENCAPS 09:00 / MIR 15:15 / USMLE 16:15 / ENCAPS 17:15 según
   `TodayMission`), (c) almuerzo y nap si existen como eventos.
2. Propón el esquema concreto (qué 15' dentro del bloque de lectura Pulso + dónde van los
   otros 10-15') y MUÉSTRASELO a Joseph en el chat ANTES de crear nada. **Regla del
   proyecto: Google Calendar solo se modifica con su confirmación explícita** — esta tarea
   está pedida, pero los horarios exactos los confirma él.
3. Tras su OK: crea eventos recurrentes L-V "🧠 SYNAPSE A — lección (15')" dentro/junto al
   bloque de lectura Pulso y "🧠 SYNAPSE B — audio (10')" en el hueco que él confirme, +
   sábado "🧠 SYNAPSE PC (60-90', opcional)". Descripción del evento: link a
   joseph-md-app.vercel.app y a la misión del día. NO toques ningún evento existente.

## MISIÓN 3 — Pulir y completar (sin romper)

- Verifica los links de la app con `DATA/_scripts/check_links.js` si añades URLs nuevas:
  CUALQUIER URL nueva se verifica (WebFetch 200 / oEmbed para YouTube) — cero inventos.
- Si el índice real de un curso de Skilljar aporta valor (títulos de lecciones), guárdalo en
  `DATA/SYNAPSE/curricula/<curso>.md` para futuras vueltas.
- Mantén el diseño existente: índigo #818CF8 como único acento de la sección, molde de
  primitives/visuals (GlassPanel, FadeUp, RingStat) — refinado, sobrio, NADA fosforescente.

## LO QUE NO HACES (límites duros)

- **NO toques la carpeta `VITALS/`** en la raíz del repo: otro chat está trabajando ahí
  ahora mismo (migración de la app de ejercicio). No la commitees, no la edites, no la
  borres. Tus commits incluyen SOLO tus archivos (src/lib/synapseDailyPlan.ts, SynapseHub,
  studyProgress, DATA/SYNAPSE/*).
- NO toques Anki ni el vault de Obsidian (otros chats; nomenclatura canónica en
  `D:\agente_estudio\config\subtema_mapping.json` — jamás crear variantes). Si en el futuro
  Joseph quiere rama Obsidian de SYNAPSE, será otro encargo.
- NO modifiques los planes ENCAPS/MIR/USMLE/Derma/Research/Business ni sus horarios.
- NO borres nada en ningún lado (archivar > borrar). NO commitees secretos.
- Google Calendar: solo lo descrito en Misión 2, con confirmación previa de horarios.

## VERIFICACIÓN Y ENTREGA

1. `npx tsc --noEmit` limpio (el tsconfig ya excluye VITALS/) y `npx expo export --platform web`
   sin errores.
2. Preview tools: pestaña Hoy con la misión del día real, checkbox marca y persiste
   (recarga), links abren, sin errores de consola. Verifica también vista móvil.
3. Commit a `master` SOLO de tus archivos + push (Vercel despliega solo).
4. Actualiza `DATA/SYNAPSE/` con lo aprendido (p. ej. `motor-dia-a-dia.md` con el diseño).
5. Reporte final honesto: semanas generadas, qué temarios de cursos son reales vs "siguiente
   lección", estado del Calendar (propuesto/creado), pendientes.

## REGLAS GENERALES DEL PROYECTO (no negociables)

- No alucines, no generes información donde no la hay — todo verificado o marcado honesto.
- Progreso = REAL y manual (empieza 0%), nunca derivado de la fecha.
- Español para UI y reportes. Deploy solo a master.
- La meta de fondo: cada fase termina en un PROYECTO PÚBLICO en GitHub (veredicto del
  auditor: eso es lo que consigue la entrevista, no el temario).
