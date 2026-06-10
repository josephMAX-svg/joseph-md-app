# VITALS — mapa del código fuente (explorado 10-jun-2026)

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
