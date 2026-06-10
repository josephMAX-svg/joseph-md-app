# VITALS — mapa del código fuente (explorado 10-jun-2026)

## ⭐ v2 nativa: qué cambió (10-jun-2026)

El código vive ahora COPIADO en `D:\joseph-md-app\VITALS\` (web/ + supabase/ + research/,
sin node_modules/.next/.git). El original en CRM Pulso quedó INTACTO (git status limpio
verificado). Build `next build` sin errores. Deploy pendiente: ver `VITALS/DEPLOY.md`
(proyecto Vercel nuevo + 3 env vars + cambiar `VITALS_URL`). `config.ts` NO se tocó aún.

**Videos (MISIÓN 1)** — cobertura 17/17 del catálogo del motor, TODOS los IDs verificados
por oEmbed (31/31 OK, autor confirmado):
- `tutorials.ts` reescrito: 16 ejercicios → videos de **Andrés Vázquez Personal Trainer**
  (14 exactos + 2 más cercanos del mismo canal: Curl femoral→"Entrena tus ISQUIOS así",
  Zancadas→"Sentadilla búlgara"); Baile → `BAILE_PLAYLIST` 12 coreografías FitDance (~45');
  caminata/zona 2 → Mayo Clinic; + 2 píldoras de evidencia del Dr. Antelm Pujol. Cada
  entrada lleva `cues` (claves de técnica) y soporta `start`/`end`.
- `video.tsx`: facade conservado + IFrame API (onError 101/150 → degrada a búsqueda;
  onStateChange===0 encadena la playlist), `rel=0&playsinline=1`, sin `modestbranding`.
  Nueva `TecnicaCard` ("de la casa Pulso": nombre + prescripción del motor + cues + player).

**Retención Hormozi (MISIÓN 2)** — motor extendido SIN tocar pisos de seguridad:
1. Home abre con el entreno del día renderizado + botón único (oro). Si ayer quedó
   pendiente, lo dice en una línea sin culpa (`ayer_pendiente` en exerciseToday).
2. Score de hoy protagonista (anillo grande, "expira a medianoche").
3. Banner ¡PR! en vivo multi-categoría (e1RM/volumen/reps — `pr_categorias` en exerciseLog)
   con confeti (único lugar con confeti). El refresh se difiere hasta cerrar el banner.
4. Racha SEMANAL + 1 freeze/mes automático (`weeklyStreak`, solo lectura). Celebration
   pasó a hitos semanales (4/8/12/26/52), toast sin confeti.
5. Reporte de lunes (`weeklyReport`): 7d vs semana pasada + 1 insight del coach (Gemini
   con fallback determinista) — tarjeta en home solo los lunes.
6. Coach adherence-neutral: PERSONA en `ai.ts` ahora prohíbe explícitamente regañar/culpar.
7. Leaderboard: aplazado (1 usuario); el reporte de lunes ya compara "tú vs. tu semana pasada".

**Tema (MISIÓN 3)** — navy editorial: bg #0B1628, cards #13223A-ish, texto #E8EEF7,
"sage"→acero gris-azul claro, "brass"→ORO #D9A441 (único acento, acción primaria).
Sin fosforescentes. Marca renombrada VITALS (shell, manifest, metadata, themeColor).
Fix técnico: scroll-reveal ahora lo gestiona React en `ui.tsx` (antes ScrollFX mutaba
el DOM y disparaba warnings de hidratación; ScrollFX ya no se monta).

**Verificado en preview**: home con plan+score+racha, baile reproduciendo pista 1/12
dentro de la app, día de fuerza con video de Andrés embebido, banner PR capturado,
consola limpia. Simulación de PR hecha con el usuario demo `paciente-maria`
(3 logs de prueba escritos en mv_exercise_logs de ese usuario demo, fecha 10-jun).

> Fuente: `D:\CRM_PULSO_v3.1\PAGINA WEB EJERCICIO Y NUTRICION\` (repo git LOCAL, sin remote,
> desplegado en https://web-sigma-eight-92.vercel.app). Embebido en joseph-md-app vía iframe
> (`VITALS_URL` en `src/config.ts`). NO modificar el original — copiar para mejorar.

## Stack
**Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + Gemini Flash** (Claude vision como alt).
PWA mobile-first. Motor serverless en TS (no depende de la PC).

## Rutas (web/src/app/)
`/` home (anillo adherencia, racha, próxima acción) · `/capturar` (foto comida + Renpho) ·
`/comida` · `/ejercicio` (plan del día + videos + progresión e1RM) · `/composicion` ·
`/adherencia` (score hoy/7d/30d, banderas 90/95%) · `/valor` (Hormozi) · `/plan` ·
`/coach` (chat IA + RAG + escalamiento) · `/medico` · `/perfil`.

## Los videos (lo que el usuario quiere mejorar)
- `web/src/lib/tutorials.ts` (67 líneas): tabla `MAP` keyword→{yt: "<ID>", búsqueda fallback}.
  IDs hardcodeados de Jeff Nippard/Squat University. **Cobertura PARCIAL** — ejercicios sin ID
  (p. ej. Baile/cardio) caen al botón "Ver técnica en YouTube" (búsqueda externa).
- `web/src/components/video.tsx`: `VideoEmbed` (lazy iframe youtube-nocookie, clic en miniatura)
  + `VideoButton` (fallback). La infraestructura de embed YA existe — falta cobertura total
  + referentes del usuario.

## Motor y data
- `web/src/lib/engine/plan.ts`: `SPLIT_JOSEPH` (5 días: Lun torso empuje 30' · Mar pierna post 60' ·
  Mié baile · Jue torso jalón 30' · Vie pierna ant 60') + `generarPlan()` + `reestructurarPlan()`
  + pisos de seguridad (kcal, proteína 1.6 g/kg, ≤1% pérdida/sem; violación → escala a médico).
- `web/src/lib/engine/domain.ts`: scoreDay/scorePeriod, TDEE, progresión, e1RM.
- `web/src/lib/engine/index.ts` (296 líneas): API del motor.
- Supabase: `supabase/migrations/0001_movimiento_schema.sql` (1210 líneas): mv_users, mv_plans
  (JSON versionado), mv_exercise_logs, mv_food_logs, mv_foods (~500 alimentos peruanos),
  mv_body_composition, mv_activity_proofs, mv_wellness_logs, mv_messages. RLS multi-usuario.
- `research/`: RESEARCH_REFERENTES.md (Schoenfeld/Helms/Israetel/Nippard + nutrición Phillips/
  Aragon/Attia), HORMOZI_METODOLOGIA.md (retención), rag_chunks/knowledge.json (RAG del coach).

## Design system del CRM padre (para tematizar)
`D:\CRM_PULSO_v3.1\02_DESIGN_SYSTEM\paleta_colores.css`: navy `#0B1628`, card `#13223A`,
teal `#4DB8C9`, verde `#3FB984`, ámbar `#D9A441`, texto `#E8EEF7`.

## Git
Repo local en la carpeta raíz de "PAGINA WEB...", `git remote -v` vacío. Último log:
v6 migración serverless → Vercel · v4 metodología Hormozi (retención) + confeti.

## Referentes del usuario (de SUS suscripciones — DATA/VITALS/referentes.md)
Andrés Vázquez Personal Trainer (@AndresVazquezPersonalTrainer — el señalado), Dr. Antelm Pujol
(@thefitmedstudent — médico, hormonas×deporte×evidencia), The Fitness Boy, FitDance/FitDance Life,
Mayo Clinic. Criterio: procedimientos respaldados en revisiones sistemáticas/artículos
(la base ya está en research/RESEARCH_REFERENTES.md del propio repo).
