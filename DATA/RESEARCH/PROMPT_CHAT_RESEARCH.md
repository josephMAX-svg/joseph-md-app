# PROMPT — Chat RESEARCH (pegar tal cual en el chat nuevo)

> Copia todo lo que está dentro del bloque de abajo y pégalo como primer mensaje del chat
> que se encargará de Research / revisiones sistemáticas (en la carpeta `D:\joseph-md-app`).

---

```
Eres Claude Code en D:\joseph-md-app (Expo + React Native Web, deploy joseph-md-app.vercel.app,
GitHub josephMAX-svg/joseph-md-app, rama master). Soy el Dr. Joseph Soto Tocas. TU DOMINIO ES
RESEARCH: construir un programa de REVISIONES SISTEMÁTICAS (no investigación general) que sirva
de motor hacia Mayo Clinic / Bioclinic en dermatología estética.

PASO 0 — LEE PRIMERO (todo sale de aquí, no inventes):
- D:\joseph-md-app\MD_MAESTRO_BIOCLINIC_RESEARCH.md  ← spec maestra (visión Mayo/Bioclinic,
  líneas de investigación 0–8, motor de publicación, sistema agéntico, roadmap). YA TIENE un
  "§12 APÉNDICE · DATA VERIFICADA (jun-2026)" con correcciones reales — respétalo, no lo pises.
- D:\joseph-md-app\DATA\RESEARCH\README.md  ← dónde guardar la data.
- D:\joseph-md-app\DATA\RESEARCH\journals.md / benchmarks.md / systematic-reviews.md /
  agentic-system.md  ← data YA verificada (revistas con IF real, dónde publicar gratis,
  benchmarks NRMP honestos, playbook SR, diseño agéntico). Parte de aquí, amplíala.
- Mira el motor diario de USMLE/MIR para copiar su patrón: src/components/study/UsmleTodayPlan.tsx,
  src/lib/usmleStep1Daily.ts, src/lib/studyProgress.ts (progreso real, empieza 0%).

REGLAS DE ORO:
- NO ALUCINES. Cada cita lleva DOI/PMID real; cada revista, su IF de Clarivate; cada botón de la
  app enlaza a un SITIO REAL (nunca un placeholder ni "botón con mi imagen").
- Verdad ya verificada (no la contradigas): NO hay "nº de publicaciones requerido"; los matcheados
  de derma promedian ~27.7 abstracts/presentaciones/pubs (NO 27 papers); para IMG la N es diminuta
  (Match 2026: 4 de 29 non-US-IMG); Perú = upper-middle-income → solo 50% de descuento APC (gratis
  real = Diamond OA: Anais Brasileiros, Actas Dermo-Sifiliográficas, JAAD por suscripción).
- HITL: humano (yo) verifica el Word final. Nada se "termina" sin mi checkpoint.

QUÉ CONSTRUIR (data + plan + sistema; la página web la diseña mi chat principal):
1) REFERENTES DE MÉTODO: revisa cómo construyen los top de YouTube/web una revisión sistemática
   paso a paso. Guarda recursos con URLs reales verificadas → DATA/RESEARCH/systematic-reviews.md.
2) REVISTAS: completa/verifica la tabla de revistas (IF real, cuartil, gratis vs APC, requisitos
   anti-desk-rejection) y "dónde publica gratis un peruano" → DATA/RESEARCH/journals.md.
3) BENCHMARKS MAYO honestos (NRMP, ECFMG, Steps, vías research-fellow/observership sin ACGME, nº
   razonable de SR) → DATA/RESEARCH/benchmarks.md.
4) PLAN DÍA-A-DÍA de research con el MISMO motor que USMLE/MIR (HOY/Horario/7d/Temario, progreso
   real marcable, links/vídeos reales), ritmo INTERDIARIO con Dermatología (un día Research, el
   siguiente Derma). NO modifiques el Google Calendar; el tema vive en la app. → DATA/RESEARCH/daily-plan.md.
5) SISTEMA AGÉNTICO (el corazón): patrón orchestrator-worker + HITL. Un AGENTE LÍDER dirige UNA
   línea de investigación (énfasis: dermatología estética estructural, líneas 1–4/7); SUBAGENTES
   redactan cada sección (Intro / Métodos[PRISMA 2020] / Resultados[forest plot] / Discusión /
   Referencias) en contexto aislado; un AGENTE QA verifica citas reales (DOI/PMID, sin alucinar) +
   paráfrasis (Turnitin) + cadena estadística; y se ENSAMBLA un Word (.docx) con python-docx —
   automáticamente, aunque yo no esté. Yo llego y corrijo "esto falta, esto mejoramos". Diseño +
   prompts base por rol → DATA/RESEARCH/agentic-system.md (ya hay un borrador verificado, mejóralo).

AL TERMINAR: (1) deja TODA la data en DATA/RESEARCH/ (no la pierdas; sub-carpetas lines/ y agentic/
si hace falta), (2) mejora y amplía MD_MAESTRO_BIOCLINIC_RESEARCH.md sin pisar el §12, (3) resúmeme
qué verificaste, qué quedó pendiente y la siguiente acción de máxima palanca. Commit a master con
mensajes claros. No toques las secciones USMLE/MIR/Derma ni el Calendar.

CONTEXTO TEMPORAL: España (MIR 2030–2034) → fellowship dermatología EE.UU. (Mayo/Bioclinic) →
residencia. Estándares muy altos para IMG. Las revisiones sistemáticas son el output más eficiente
para construir el CV desde ahora.
```
