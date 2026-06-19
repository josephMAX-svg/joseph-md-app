# ENCAPS · Verificación EXHAUSTIVA de fuentes (en vivo, 19-jun-2026)

> Entrada con la sesión logueada de Joseph (Chrome DevTools) a QxMedic, Theomed y Google Drive. Objetivo: cobertura 100% para ≥17/20, links EXACTOS para no buscar, y detectar material nuevo.
> Dumps de respaldo: `_qx_calendario_2026_v2.json` (videos), `_qx_fichas_minsa.json` (95 fichas), `_theomed_cursos.json` + `_theomed_secciones.json`, `_drive_academias.json`.

## 1) QxMedic (qxmedic-aulavirtual.com · SERUMS 2026-II)
**273 eventos = 184 videoclases + 56 evaluaciones + 33 transmisiones en vivo.** SIN material nuevo vs 17-jun (mismo total). Las 99 videoclases con fecha >17-jun son release por goteo (ya están en el catálogo).
- **184 videoclases con URL EXACTA** (formato `https://qxmedic-aulavirtual.com/mis-clases/videoclases/{cap}/{id}`), por área: Cuidado Integral 70 · Salud Pública 48 · Gestión 30 · Investigación 20 · Ética 16. → ya mapeadas por tema en Supabase (160 en el plan).
- **Biblioteca "Fundamentos Teóricos" = 95-96 FICHAS TÉCNICAS del MINSA** (PDFs en Dropbox), con link exacto cada una (`_qx_fichas_minsa.json`). Es el "material del ministerio": alumbramiento, atención prenatal, APS, esquema de vacunación, ITS, salud mental, cáncer infantil, metales pesados, etc. **Estas fichas son fuente directa de muchas preguntas ENCAPS.**
- Secciones extra de QX: Método QX, Tendencias, Evaluaciones App, Banqueo (App Banqueo), Mentoring/estadísticas, Syllabus, Tutoriales.

## 2) Theomed (campus.academiatheomed.com)
3 cursos: **SIMULACROS MEDICINA (id 37) · MEDICINA REGULAR GP1 (id 73) · KAHOOTS (id 89).**
- **SIMULACROS MEDICINA — 8 cuestionarios con URL exacta de quiz:**
  - SIMULACRO 15/05 → `/mod/quiz/view.php?id=20244`
  - SIMULACRO 29MAY → `/mod/quiz/view.php?id=4242`
  - SIMULACRO 12JUN → `/mod/quiz/view.php?id=4442`
  - EXAMEN TIPO A → `id=7934` · EXAMEN TIPO B → `id=7935`
  - EXAMEN TIPO A → `id=7937` · EXAMEN TIPO B → `id=7938`
  - EXAMEN 2025 II → `id=7940` · (+ sección "Examen 2024 II - MEDICINA ENCAPS MINSA")
- **MEDICINA REGULAR GP1 (id 73)** — material por área en carpetas: §11 con 26 carpetas, §10/§12/§17 con recursos (17), §7 FLASHCARDS. Secciones: NORMAS TÉCNICAS, SALUD PÚBLICA, CUIDADO INTEGRAL, ÉTICA, etc. (31 folders + 17 resources + 8 quiz totales).
- **KAHOOTS (id 89)**: grabaciones Kahoot + material semana final ("Respuestas Kahoot 16/06").

## 3) Google Drive · SERUMS 2026 II (3 academias de RESPALDO — las otras 2 = QX/Theomed, ya verificadas)
| Academia | Carpeta | Contenido |
|---|---|---|
| **DR LOPEZ** (la más completa) | [folder](https://drive.google.com/drive/folders/1na0lmY_BY9naLlcAzgqSBXR7T-kPUBKv) | 🎬 Videoclases · 🎯 Compendio · 📈 **Normativas (fichas MINSA)** · 📝 Simulacros · 😬 Kahoot |
| **GALENO MEDIC** | [folder](https://drive.google.com/drive/folders/1_hSoU8ZuLBCnq8VpWkPi6b7_ryUPxoUk) | ✨ Perlitas (high-yield) · 🎥 Videoclases · Cronograma · Tutoría |
| **VILLAMEDIC** | [folder](https://drive.google.com/drive/folders/1ovJbxq1Bw_Jub6vPK-K1nv6Nc_ovh79P) | Fase 1 Clases en vivo · Simulacros · Cronograma jun-jul |

**Regla de cobertura 100%:** si un tema NO tiene videoclase en QX/Theomed → buscar en **DR LOPEZ → Videoclases** (o GALENO Videoclases). Para más simulacros → **VILLAMEDIC Simulacros + DR LOPEZ Simulacros**. Para fichas/normativa MINSA → **QX biblioteca (95 fichas) + DR LOPEZ Normativas**. Para repaso rápido → **GALENO Perlitas**.

## Veredicto
- Material principal (QX videos + fichas MINSA + Theomed simulacros) **verificado y con links exactos** — sin material nuevo desde el 17-jun.
- 3 academias de respaldo (DR LOPEZ / GALENO / VILLAMEDIC) inventariadas: cubren cualquier hueco de video + simulacros + normativa extra.
- Nada perdido: los 184 videos + 95 fichas MINSA + 8 simulacros Theomed + las 3 academias quedan documentados con su acceso directo.
