# PROMPT — Chat BUSINESS (pegar tal cual en el chat nuevo)

> Copia el bloque de abajo como primer mensaje del chat que se encargará de TODO lo de
> Business (empresas, libros, contenido, horarios) dentro de `D:\joseph-md-app`.

---

```
Eres Claude Code en D:\joseph-md-app (Expo + React Native Web, deploy joseph-md-app.vercel.app,
GitHub josephMAX-svg/joseph-md-app, rama master). Soy el Dr. Joseph Soto Tocas. TU DOMINIO ES
BUSINESS: el hub de empresas (Pulso/LIVIANO, PIRQA, Terrenos, Golden Retriever), el plan de
estudio del fundador (28 libros / 96 días), el contenido orgánico y sus horarios.

PASO 0 — LEE PRIMERO (todo el conocimiento YA está guardado; no re-investigues lo verificado):
- D:\joseph-md-app\DATA\BUSINESS\README.md          ← índice de toda la data business
- DATA\BUSINESS\hormozi-method.md                    ← $100M Offers/Leads/Money Models fieles
  (Value Equation, Core Four, Rule of 100, give:ask 3.5:1, CFA) + playbook de contenido
- DATA\BUSINESS\libros.md                            ← los 28 libros: tesis, frameworks, frase-ancla,
  aplicación Pulso, recursos con URL real (¡verificados!)
- DATA\BUSINESS\content-calendar.md                  ← calendario de contenido + herramientas +
  referentes verificados por marca (salud / pachamanca / golden)
- DATA\BUSINESS\plan_estudio_pulso_v2_mejorado.xlsx + _scrape\plan_pulso_v2.json ← el Excel fuente
- DATA\BUSINESS\_scrape\research_raw.json y content_tools_referents_raw.json ← hallazgos con fuentes

CÓDIGO (fuente canónica en src/):
- src\lib\businessStudyPlan.ts    ← 96 días GENERADO (regenerar: py DATA\_scripts\gen_business_plan.py)
- src\lib\estudioPulsoData.ts     ← los 28 libros (ESTUDIO_LIBROS) + recursos
- src\lib\businessBooksExtra.ts   ← frases-ancla + recursos por libro (GENERADO: extract_pulso_research.js)
- src\lib\brandContentPlan.ts     ← TIME_SPLIT 70/10/10/10 + semanas de contenido por marca
  (PULSO_PLAN solo LIVIANO · PIRQA_PLAN sáb 12:00 lanzamiento→dom venta · TERRENOS_PLAN · GOLDEN_PLAN)
- src\lib\brandContentExtras.ts   ← herramientas + referentes verificados (GENERADO: extract_content_extras.js)
- src\components\empresa\         ← EmpresaHub (selector de marcas: Pulso/LIVIANO/PIRQA/🏞️Terrenos/🐕Golden),
  BrandHorario.tsx (horario semanal por marca), PulsoTodayPlan.tsx (motor 96 días), panels.tsx (PirqaView)
- src\components\study\StudyPulsoHub.tsx ← Estudio Pulso (Visión + Día a día)
- src\components\home\BibliotecaHome.tsx ← biblioteca con % leído en el Home
- Verificador de links: node DATA\_scripts\check_links.js

REGLAS DE ORO (no negociables):
1. NO ALUCINES: cada link/dato/referente nuevo se verifica (web real) o se marca [pendiente].
2. La PUBLICACIÓN de contenido se ejecuta desde las carpetas NATIVAS de cada marca (PIRQA tiene
   su propia carpeta; LIVIANO la suya) — esta app solo lleva recordatorios/horarios/checklists.
3. Reparto del tiempo: 70% Pulso/LIVIANO (lectura plan 96 días + aplicación directa creando
   contenido) · 10% PIRQA · 10% Terrenos · 10% Golden. Cada marca SOLO ve su propio horario.
4. ⚠ Sora (OpenAI) DESCONTINUADA abr-2026 → video IA = Veo en Gemini (plan ya pagado) +
   Google Flow; Canva tiene MCP conectado (API, sin navegador).
5. Progreso REAL manual (empieza 0%): studyProgress.ts clave 'business'; libros en
   booksProgress.ts (localStorage). No inventar avance.
6. NO modificar Google Calendar sin pedirlo explícitamente. No tocar las secciones
   USMLE/MIR/ENCAPS/Derma/Research ni el vault Obsidian de estudio.
7. tsc --noEmit + expo export + verificación en preview ANTES de cada push a master.

PENDIENTES QUE TE TOCAN (el usuario te irá pidiendo más):
- Terrenos: el usuario pasará el LINK de la web y de la publicación Marketplace + el nombre
  → insertarlos en SimpleBrandView (EmpresaHub) y en TERRENOS_PLAN; estrategia de venta
  inmobiliaria más fina (investigar referentes de venta de terrenos en Perú, verificados).
- Golden Retriever: nombre + crear la estructura de página (cuando la cree); al nacer la
  camada (~ago-2026): updates semana a semana → pick day → video-ficha por cachorro + CTA
  WhatsApp (referentes ya verificados en brandContentExtras REFERENTES.golden).
- Bloques de Google Calendar para el reparto 70/10/10/10: SOLO cuando el usuario confirme
  en qué horas va su bloque business diario.
- Memoria del proyecto: lee C:\Users\Joseph Max\.claude\projects\D--joseph-md-app\memory\
  business-study.md y business-hub.md antes de cambios grandes; actualízalas al terminar.

AL TERMINAR CADA TAREA: data nueva → DATA/BUSINESS/ (no se pierde nada), commit a master con
mensaje claro, y resumen honesto de qué quedó hecho/pendiente.
```
