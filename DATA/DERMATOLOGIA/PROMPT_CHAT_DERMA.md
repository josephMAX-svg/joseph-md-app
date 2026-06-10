# PROMPT — Chat DERMATOLOGÍA (pegar tal cual en el chat nuevo)

> Copia todo lo que está dentro del bloque de abajo y pégalo como primer mensaje del chat
> que se encargará de Dermatología (dentro de la carpeta `D:\joseph-md-app`).

---

```
Eres Claude Code trabajando en D:\joseph-md-app (Expo + React Native Web, deploy en
joseph-md-app.vercel.app, GitHub josephMAX-svg/joseph-md-app, rama master). Soy el Dr.
Joseph Soto Tocas. TU DOMINIO ES DERMATOLOGÍA (board + estética estructural).

PASO 0 — LEE PRIMERO (no inventes nada, todo sale de aquí):
- D:\joseph-md-app\DERMA_MASTER_SPEC.md  ← spec maestra del módulo Derma (cerebro clínico
  de 7 pasos, referentes Cotofana/de Maio/Carruthers/DeLorenzi/Anderson/Global Alliance,
  bloques A–G + acné, motor de estudio diario, esquema de datos).
- D:\joseph-md-app\DATA\DERMATOLOGIA\README.md  ← dónde guardar la data y las 3 fuentes.
- Mira cómo quedó el motor diario de USMLE y MIR para COPIAR su patrón exacto:
  src/components/study/UsmleTodayPlan.tsx y MirTodayPlan.tsx (sub-pestañas HOY / Horario /
  7 días / Temario; navegación Día X/N; cola de materiales con links; progreso REAL).
  src/lib/usmleStep1Daily.ts y mirDailyPlan.ts (estructura del plan día-a-día).
  src/lib/studyProgress.ts (progreso real marcable, persistido en localStorage, empieza 0%).

REGLA DE ORO: NO ALUCINES. Cada dato (duración de vídeo, página, deep-link, nº de preguntas)
se EXTRAE de la fuente real logueada o se marca [pendiente]. Nunca inventes URLs ni cifras.

LAS 3 FUENTES DE DERMATOLOGÍA (extrae data real de las tres):
1) Qbankly — Dermatología (qbankly.app). ABRE SOLO EN MICROSOFT EDGE (Chrome con CDP la
   bloquea). Accede con la extensión "Claude in Chrome" instalada en Edge (igual que se
   hizo con USMLE), o navega a mano. API interna /api/v2/... (mismo patrón que en
   DATA/USMLE/README.md). OJO rate-limit 429. En la app, los links Qbankly llevan botón
   "◆ Edge" (microsoft-edge:<url>) + Chrome.
2) ProMIR — Dermatología (promir.medicapanamericana.com). La asignatura de Dermatología
   está entre las 30 de src/lib/mirTemarioData.ts; saca su temario + capítulos
   /capitulo/<id> + videoclases (duración mm:ss del DOM). Abre en Chrome.
3) AccessDermatologyDxRx (dermatology.mhmedical.com). YA ESTOY LOGUEADO (Remote Access UF /
   Smathers Libraries). Tiene Review Questions, Cases, Videos, Study Tools y Books (p. ej.
   Taylor & Kelly's Dermatology for Skin of Color, Fitzpatrick). Accede vía Microsoft Edge,
   Claude-in-Chrome, o Chrome DevTools vía Claude-in-Chrome (tú eliges la más efectiva).
   Pregúntame con AskUserQuestion qué navegador usar antes de conectarte (gate de seguridad).

QUÉ CONSTRUIR (data + plan, NO la página web — esa la diseña mi chat principal):
A) Extrae la ESTRUCTURA REAL de las 3 fuentes: temario de dermatología por bloques, vídeos
   con duración, bancos de preguntas por tema. Guarda el JSON crudo en
   DATA/DERMATOLOGIA/_scrape/ y lo consolidado en DATA/DERMATOLOGIA/temario.md.
B) Diseña un PLAN TEMA-ATÓMICO/DÍA de dermatología (1 subtema/día) con el MISMO motor que
   USMLE/MIR: orden de alto rendimiento para boards + capa estética del DERMA_MASTER_SPEC,
   cada día con su material de las 3 fuentes (link real + botón ◆ Edge para Qbankly),
   repaso espaciado, y progreso REAL marcable (empieza en 0%). Guarda en
   DATA/DERMATOLOGIA/daily-plan.md y, si haces código, en src/lib/dermaDailyPlan.ts.
C) RITMO INTERDIARIO con Research: un día Dermatología, el siguiente Research (alternando).
   El bloque horario es el del Google Calendar (NO modifiques el Calendar; el tema vive en
   la app).
D) Verifica y completa los referentes y recursos del DERMA_MASTER_SPEC con URLs reales
   (vídeos Cotofana, MD Codes, etc.) → DATA/DERMATOLOGIA/referentes.md y recursos.md.

AL TERMINAR: (1) deja TODA la data extraída en DATA/DERMATOLOGIA/ (no la pierdas), (2)
mejora y amplía D:\joseph-md-app\DERMA_MASTER_SPEC.md con lo verificado (añade un apéndice
"DATA VERIFICADA" con lo nuevo), (3) hazme un resumen de qué extrajiste, qué quedó pendiente
y qué fuente faltó. Commit a master con mensajes claros. No toques las secciones USMLE/MIR
ni el Calendar.
```
