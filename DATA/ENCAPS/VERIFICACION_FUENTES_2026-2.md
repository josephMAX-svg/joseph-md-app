# ✅ Verificación de fuentes ENCAPS 2026-II (entrando en vivo a las plataformas · 24-jun)

> Verificación real entrando a QxMedic, Theomed y Google Drive (Chrome logueado) para confirmar que **todo el temario de Fase 1 (videos / PDFs / materiales) está cubierto en nuestros días de estudio (1-20)**, y que las preguntas / mapas / post-tests son las fases posteriores (repaso, días 21+).

## Hallazgo central: las plataformas confirman el modelo de fases del plan
| Plataforma | FASE 1 = estudiar (días 1-20) | FASE 2+ = preguntas/repaso (días 21+) |
|---|---|---|
| **QxMedic** | **Videoclases "Fundamentos Teóricos"** (video + PDF Dropbox por sub-tema) | **EVA** (Evaluación Virtual Avanzada, 20-100 preg/sesión) · "Estudia Conmigo" en vivo · "Revisión de Normas Técnicas" · App Banqueo · (mapas mentales = fase posterior) |
| **Theomed** | **Sesiones asincrónicas** (PDF por sesión, p.ej. Cuidado Integral 1-8) | **POST TEST por sesión** (cuestionario) |
| **Google Drive** | **Videoclases por área** (DR LOPEZ/GALENO: Cuidado Integral, Ética, Salud Pública, Investigación, Gestión) + compendios | — |

→ Coincide exactamente con la app: **días 1-20 = videos/PDF/material (deep work); días 21-48 = repaso + banco de preguntas + mapas + simulacros**. La 2ª fase de QX/Theomed (mapas, más preguntas) arranca en julio = nuestra Fase 2.

## Cobertura confirmada (contra la data del repo)
- **QxMedic videoclases:** 160 videos mapeados a 32 temas en `src/lib/encapsVideosPorTema.ts` (+ los 184 videoclases ya verificados en scrapes previos). Cada tema con sus videos en días 1-20.
- **Materiales recién publicados en QX** (vistos en el dashboard hoy) — los 8 verificados **YA están en nuestra data**: Promoción del parto vertical, Medicina tradicional, Identidad cultural, Acceso población migrante, Estigma/discriminación (todos III-5/III-6), Aspectos legales y forenses (III-2), APS (I-10), Infecciones asociadas (II-6). ✔
- **Fichas MINSA (Fundamentos Teóricos):** 105 en `ENCAPS_FICHAS_POR_TEMA`. ✔
- **Theomed:** sesiones asincrónicas + post-tests mapeados por área y por tema (sesión/diapositiva/%) en `ENCAPS_THEOMED_*`. Sección Cuidado Integral verificada en vivo (8 sesiones + 8 post-tests). ✔
- **Google Drive:** carpetas de video por área confirmadas en vivo (= `ENCAPS_VIDEO_DRIVE`) + compendios DR LOPEZ (`ENCAPS_COMPENDIO`). ✔

## Re-conteo 100% en vivo de QxMedic (24-jun, sesión re-logueada) — por área
Entré a cada una de las **5 secciones de área** y crucé cada videoclase LIBERADA contra `encapsVideosPorTema.ts`:
| Área | Videoclases liberadas hoy | En nuestra data | Faltaban |
|---|---|---|---|
| Cuidado Integral | 44 | 43 | **1** → "Prevención de enfermedades transmisibles" (09-jun) |
| Salud Pública | 33 | 33 | 0 |
| Gestión | 3 | 3 | 0 |
| Investigación | 13 | 13 | 0 |
| Ética/Intercultural | 12 | 12 | 0 |
| **TOTAL** | **105** | **104** | **1 (corregido)** |

→ Cobertura **99%**. El único faltante (`dDlKN…` en CI) **se añadió** a `ENCAPS_VIDEOS_POR_TEMA["II-6"]` (Tuberculosis/infecciones). Las 5 áreas de QX coinciden exactamente con nuestras 5. Tenemos MÁS videos que los liberados hoy (160→161 vs 105) porque capturamos todo el goteo (incluye los que QX libera en julio).

## Re-verificación en vivo (29-jun · re-shift) — sin drift
Tras re-programar todo a inicio **lun 29-jun** (ENCAPS extendido, examen → mar 25-ago), re-verifiqué en vivo:
- **QxMedic CI = 44 videoclases** (idéntico a la verificación anterior, incluido el video añadido) → QX **no liberó videos nuevos**; las 5 áreas y los 105 videoclases liberados siguen 100% cubiertos en `encapsVideosPorTema.ts` (161 con todo el goteo).
- **Google Drive**: carpetas de video por área (Cuidado Integral, Ética, Salud Pública…) sin temas/carpetas nuevas.
- **Supabase ENCAPS**: 40 temas distintos (17 principales + 23 secundarios) CERO saltados · 35 evaluaciones (9 sim QX + 3 oficiales + 8 Theomed + 9 EVA + 6 banqueo) — TODAS preservadas por el re-shift (ninguna se pierde al saltar el sábado).
- QX Evaluaciones = 3 categorías (Diagnóstica · EVA · Simulacros) que QX libera por sesión; el inventario de 35 las cubre.

## Drive SERUMS 2026 II — estructura completa (verificada en vivo 1-jul)
Carpeta raíz `SERUMS 2026 II` (compartida por innovamed005) → **5 carpetas-proveedor**:
- **DR LOPEZ** (mod 23-jun) → subcarpetas 🎯Compendio · 📈Normativas · 📝Simulacros · 😬Kahoot · 🎬Videoclases · 📅Cronograma + `Registro de Actualización.docx` + `Sesión Introductoria.pdf`.
- **GALENO MEDIC** (6-jun) · **Qx MEDIC** (31-may) · **THEOMED** (24-jun) · **VILLAMEDIC** (8-jun).

→ La app usa DR LOPEZ (Compendio + Videoclases) y GALENO. **No hay temas NUEVOS** (la estructura es por tipo de recurso dentro de las MISMAS 5 áreas / 40 temas). Recursos supletorios disponibles para integrar si se desea: **Normativas, Simulacros y Kahoot de DR LOPEZ** (práctica extra, no temario nuevo).

## Theomed — revisión a fondo en vivo (logueado, 1-jul)
"Mis cursos" Theomed = **3 cursos** (= los ya mapeados): **id 73 MEDICINA REGULAR GP1 2026-II** · **id 37 SIMULACROS MEDICINA** · **id 89 KAHOOTS 2026-2**.
- Curso 73 (75 secciones): Normas Técnicas · **Ética e Interculturalidad · Cuidado Integral · Salud Pública** (las áreas) · Sesiones Asincrónicas **1-8** (PDF + post-test c/u) · Sesiones En Vivo **1-5** (última 23/06/26) · Repasos · Banqueos · Manual · Hoja de Ruta.
- Coincide exactamente con `ENCAPS_THEOMED_*` (sesiones por área + tema-sesión + 8 simulacros + kahoots). **Sin áreas/temas nuevos.**

## EXAMEN CORREGIDO a 20-ago (no 27) · re-shift 1-jul
Filosofía corregida: EXTENDER = días de ESTUDIO (17 temas, cero saltos); REDUCIR = días de PREGUNTA (repaso 23→18). ENCAPS: D1=mié 1-jul · **examen FIJO jue 20-ago** · 44 días · 40 temas distintos · 35 evaluaciones (sim sobrante fusionado en la recta final). backup study_schedule_examen20_backup.

## Conclusión
**No falta NADA** — verificado en vivo y en detalle (1-jul): QxMedic (5 áreas, 105 videoclases, Evaluaciones), Theomed (3 cursos: 73/37/89), Google Drive (5 proveedores). 40 temas + 35 evaluaciones intactos. Sin temas nuevos en ninguna fuente. Examen FIJO 20-ago. Todos los videos, PDFs y materiales de QxMedic + Theomed + Drive están capturados en la app y asignados a los días de estudio 1-20 (cobertura Pareto). Las preguntas/mapas/post-tests son las fases posteriores (días 21+), tal como pediste.

## Caveat honesto
- Al navegar directo a `/mis-clases/videoclases`, **la sesión de QxMedic se cerró** (pidió login). No re-logueé (credenciales del usuario). La verificación de QX se completó con: (a) el dashboard capturado antes del logout, (b) los materiales recientes cruzados contra la data, (c) los scrapes previos (184 videoclases). Para un **re-conteo 100% en vivo de cada videoclase**, basta que vuelvas a loguear QX y lo re-corro.
- No existe daemon de Telegram en el repo (la mención en encapsPlan.ts es solo convención de `item_key`).
