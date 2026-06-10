# PROMPT — Chat VITALS: migración nativa + videos embebidos + retención Hormozi

> Copiar TODO lo que sigue (desde "ROL" hasta el final) en un chat nuevo de Claude Code
> abierto en `D:\joseph-md-app`. Diseñado el 10-jun-2026 por el chat principal de Joseph MD.

---

ROL: Eres un diseñador/ingeniero de élite trabajando para el Dr. Joseph Soto Tocas en
`D:\joseph-md-app` (Expo 55 + React Native Web → Vercel `joseph-md-app.vercel.app`, branch
`master`, deploy automático). Tu misión es convertir VITALS — hoy un iframe a una app externa —
en la versión mejorada "de la casa Pulso": videos de los referentes de Joseph YA insertados en
las dinámicas, más planes, más botones y más estructura de retención siguiendo la metodología
de Alex Hormozi. Trabajas en automático: no preguntas lo que puedas verificar leyendo código.

## PASO 0 — LEE TODO ESTO ANTES DE TOCAR NADA (en este orden)

Dentro de `D:\joseph-md-app`:
1. `DATA/VITALS/vitals-app-map.md` — mapa completo del código fuente de VITALS (ya explorado).
2. `DATA/VITALS/referentes.md` — los canales de YouTube a usar (suscripciones REALES de Joseph).
3. `DATA/VITALS/retencion-research.md` — las 8 mecánicas de retención + técnica de embeds +
   líneas rojas de ToS de YouTube. Es tu spec de producto.
4. `DATA/BUSINESS/hormozi-method.md` — la metodología Hormozi verificada (Value Equation:
   prioriza SIEMPRE bajar time-delay y effort).
5. `src/config.ts` — `VITALS_URL` apunta hoy a `https://web-sigma-eight-92.vercel.app`
   (iframe en `src/screens/VitalsScreen.tsx`). Lee el comentario del archivo: explica POR QUÉ
   es iframe a URL absoluta y no un rewrite (los `fetch('/api/...')` crudos de Next.js).

Fuente original (SOLO LECTURA, fuera de este repo):
`D:\CRM_PULSO_v3.1\PAGINA WEB EJERCICIO Y NUTRICION\`
- `web/src/lib/tutorials.ts` (67 líneas) — el mapa keyword→YouTube-ID. Cobertura PARCIAL:
  ejercicios sin ID (p. ej. Baile/cardio) caen a un botón de búsqueda externa. ESTE es el
  archivo núcleo del problema de videos.
- `web/src/components/video.tsx` — `VideoEmbed` (facade lazy, youtube-nocookie) + `VideoButton`
  (fallback). La infraestructura de embed YA EXISTE; falta cobertura total + referentes.
- `web/src/app/ejercicio/page.tsx` — la página que consume ambos.
- `web/src/lib/engine/plan.ts` — `SPLIT_JOSEPH` (Lun torso empuje 30' · Mar pierna post 60' ·
  Mié baile · Jue torso jalón 30' · Vie pierna ant 60') + `generarPlan()`/`reestructurarPlan()`
  + **pisos de seguridad (kcal mínima, proteína 1.6 g/kg, pérdida ≤1%/sem; violación → escala
  a médico). PROHIBIDO romper o relajar estos pisos.**
- `web/src/lib/engine/{domain,index,ai,gemini,seed}.ts` — scoring, TDEE, e1RM, coach.
- `supabase/migrations/0001_movimiento_schema.sql` (1210 líneas) — mv_users, mv_plans (JSON
  versionado), mv_exercise_logs, mv_food_logs, mv_foods (~500 alimentos peruanos),
  mv_body_composition, mv_activity_proofs, mv_wellness_logs, mv_messages, RLS.
- `research/` — RESEARCH_REFERENTES.md, HORMOZI_METODOLOGIA.md, rag_chunks/knowledge.json.
- `D:\CRM_PULSO_v3.1\02_DESIGN_SYSTEM\paleta_colores.css` — tokens del CRM padre.

## REGLA DE ORO (verbatim de Joseph)

**"Migra esa data... copia y pega, NO la eliminas de CRM pulso."**
- COPIA el código de `D:\CRM_PULSO_v3.1\PAGINA WEB EJERCICIO Y NUTRICION\` a
  `D:\joseph-md-app\VITALS\` (nueva carpeta en la raíz del repo). NUNCA borres, muevas ni
  edites NADA dentro de `D:\CRM_PULSO_v3.1` — es la fuente viva del CRM y tiene su propio
  repo git local (sin remote). Verifica al final con `git -C "D:\CRM_PULSO_v3.1\PAGINA WEB
  EJERCICIO Y NUTRICION" status` que quedó intacto.
- Copia `web/` completo + `supabase/` + `research/` (omite `node_modules`, `.next`, `.git`).
- La copia en `VITALS/` es la base de trabajo. El deploy actual
  (`web-sigma-eight-92.vercel.app`) sigue vivo y sin tocar mientras desarrollas.

## ARQUITECTURA DEL DEPLOY (decide tú, con esta guía)

VITALS es Next.js 14 App Router con API routes (`/api/vision`, `/api/coach`, …) — NO puede
"absorberse" dentro del bundle estático de Expo Web. Opciones en orden de preferencia:
1. **Proyecto Vercel nuevo** desde `D:\joseph-md-app\VITALS\web` (p. ej. `vitals-pulso`):
   migras env vars de Supabase/Gemini (pídelas a Joseph SOLO si no están en `.env.local` de la
   carpeta original — puedes copiarlas de ahí, JAMÁS commitearlas), después cambias UNA línea:
   `VITALS_URL` en `src/config.ts`. El iframe sigue siendo el mecanismo correcto (leíste por qué).
2. Actualizar el proyecto Vercel existente para que apunte al nuevo código solo si Joseph lo
   pide explícitamente (hoy ese proyecto deploya desde otra fuente).
Si no puedes hacer deploy sin credenciales que faltan, deja TODO listo (código + README de
deploy en `VITALS/DEPLOY.md`) y dile a Joseph exactamente qué botón apretar.

## MISIÓN 1 — Videos embebidos al 100% con los referentes de Joseph

1. Extrae el catálogo COMPLETO de ejercicios que `generarPlan()`/`SPLIT_JOSEPH` puede emitir
   (lee `plan.ts` + `seed.ts` + `reestructurarPlan()` — incluye las variantes de sustitución).
   Haz una lista exhaustiva — incluye Baile (miércoles) y cualquier cardio.
2. Reescribe `tutorials.ts` para cobertura TOTAL: cada ejercicio → `{yt: ID, start?, end?}`.
   Fuentes por orden: **Andrés Vázquez Personal Trainer** (@AndresVazquezPersonalTrainer —
   embedding VERIFICADO permitido vía oEmbed), **Dr. Antelm Pujol** (@thefitmedstudent —
   evidencia médica), FitDance/FitDanceTV (baile/cardio), Mayo Clinic (educación salud).
   Encuentra los IDs navegando los canales REALES (Chrome DevTools MCP o WebFetch/oEmbed) —
   **NO inventes IDs de video; verifica cada uno con
   `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`
   (200 = existe y es embebible)**. Si un ejercicio no tiene video en los referentes,
   usa el mejor video embebible basado en evidencia y dilo en el reporte — no lo dejes
   en fallback de búsqueda salvo imposibilidad real.
3. Para Baile: playlist propia — array `videoIds` de FitDance + IFrame API avanzando en
   `onStateChange===0`, sesión continua de la duración del bloque (30-45').
   Usa `start`/`end` cuando el video del referente tenga la demostración técnica en un
   segmento concreto.
4. Mantén el patrón facade de `video.tsx` (correcto). Añade manejo de `onError` 101/150 →
   degradar a `VideoButton`. Añade `rel=0` y `playsinline=1`. NO uses `modestbranding` (muerto).
5. **Líneas rojas ToS** (en `retencion-research.md` §C): no cobrar por los videos, no gatearlos,
   no cachearlos, no superponer nada sobre el player.
6. Los videos deben sentirse "de la empresa Pulso": tarjeta propia con el nombre del ejercicio,
   los cues técnicos del motor, y el player embebido dentro — no un link que te saca de la app.

## MISIÓN 2 — Retención Hormozi (más planes, más botones, más estructura)

Implementa las mecánicas de `retencion-research.md` §A en este orden de prioridad
(denominador primero — bajar effort y time-delay):

1. **Plan pre-armado al abrir** (Fitbod): el home abre YA con el entreno del día renderizado
   (el motor `generarPlan()` ya lo computa — sácalo al home, cero clics). Si ayer no se
   completó, `reestructurarPlan()` reajusta y el home lo dice en una línea, sin culpa.
2. **Score diario que expira** (Whoop): un número 0-100 HOY (el motor ya tiene
   scoreDay en `domain.ts`) — grande, arriba, con anillo. Mañana se recalcula desde cero.
3. **Banner de PR en vivo** (Hevy): al loguear una serie que supere el e1RM histórico
   (data YA está en mv_exercise_logs + cálculo e1RM en domain.ts) → banner inmediato
   multi-categoría (e1RM / volumen sesión / reps a peso dado). Es el mejor momento dopamina.
4. **Racha SEMANAL + freeze** (Peloton/Duolingo): unidad = semana cumplida (≥N sesiones según
   plan), 1 freeze/mes automático. NO racha diaria (un viaje la destruiría → abandono).
5. **Reporte de lunes** (Whoop WPA): resumen 7d generado por el motor + 1 insight accionable
   del coach (Gemini ya está integrado).
6. **Coach adherence-neutral** (MacroFactor): revisa el prompt del coach en `engine/ai.ts` /
   `gemini.ts` — el coach NUNCA regaña; reconoce y ajusta hacia adelante. La culpa predice abandono.
7. Leaderboard: APLAZADO (1 solo usuario). Si quieres, versión "tú vs. tu semana pasada".

Botones/estructura: cada mecánica = una tarjeta con UN botón de acción primaria
(Hormozi: una sola siguiente acción obvia). Nada de menús profundos.

**Restricción dura:** NO rompas la lógica del motor que ya funciona — pisos de seguridad,
escalamiento a médico, score, TDEE, RLS de Supabase. Tu trabajo es EXPONER el motor con menos
fricción, no reescribirlo.

## MISIÓN 3 — Tema visual Joseph MD (refinado, caro, sofisticado)

Re-tematiza la copia con la paleta de la web-app principal: navy profundo + grises + UN solo
acento oro — NADA fosforescente (Joseph lo considera ordinario/tosco/barato). Referencias:
- App principal: revisa los tokens usados en `src/components/home/` y screens de Study.
- CRM padre: `D:\CRM_PULSO_v3.1\02_DESIGN_SYSTEM\paleta_colores.css` (navy #0B1628 OK;
  el teal #4DB8C9 fosforescente → sustituir por oro/crema como acento).
Tipografía editorial, espaciado generoso, sombras sutiles, motion discreto (no confeti
gratuito — el confeti existente puede quedarse SOLO en el banner de PR, que es su lugar).

## VERIFICACIÓN Y ENTREGA

1. `npm run build` (o `next build`) de `VITALS/web` sin errores TS.
2. Levanta dev server y verifica con las preview tools: home con plan pre-armado + score,
   página ejercicio con video EMBEBIDO (no botón externo) para un día de fuerza Y para
   miércoles-baile, banner PR simulado, sin errores de consola.
3. Verifica que `D:\CRM_PULSO_v3.1` quedó INTACTO (`git status` limpio en su repo).
4. Commit a `master` de joseph-md-app: la carpeta `VITALS/` + cambio de `VITALS_URL` (solo si
   ya hay deploy nuevo funcionando; si no, NO toques config.ts todavía).
5. Actualiza `DATA/VITALS/vitals-app-map.md` (sección nueva "v2 nativa: qué cambió") y guarda
   cualquier hallazgo importante en `DATA/VITALS/`.
6. Reporte final honesto: cobertura de videos X/Y verificados por oEmbed, mecánicas
   implementadas, qué quedó pendiente y por qué, URL de deploy si lo hay.

## REGLAS GENERALES DEL PROYECTO (no negociables)

- No alucines: no inventes IDs de YouTube, datos ni resultados — verifica todo.
- No borres nada en ningún lado (archivar > borrar). `D:\CRM_PULSO_v3.1` es intocable.
- No commitees secretos (env vars de Supabase/Gemini van en Vercel, no en git).
- No modifiques Google Calendar, Anki ni el vault de Obsidian — eso es de otros chats.
- Deploy solo a `master`. Español para UI y reportes.
- Si Anki/Obsidian aparecen en tu camino: la nomenclatura canónica está en
  `D:\agente_estudio\config\subtema_mapping.json` — no crees variantes (no aplica a VITALS,
  pero por si acaso).
