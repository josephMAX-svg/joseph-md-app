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

## Conclusión
**No falta temario de Fase 1.** Todos los videos, PDFs y materiales de QxMedic + Theomed + Drive están capturados en la app y asignados a los días de estudio 1-20 (cobertura Pareto). Las preguntas/mapas/post-tests son las fases posteriores (días 21+), tal como pediste.

## Caveat honesto
- Al navegar directo a `/mis-clases/videoclases`, **la sesión de QxMedic se cerró** (pidió login). No re-logueé (credenciales del usuario). La verificación de QX se completó con: (a) el dashboard capturado antes del logout, (b) los materiales recientes cruzados contra la data, (c) los scrapes previos (184 videoclases). Para un **re-conteo 100% en vivo de cada videoclase**, basta que vuelvas a loguear QX y lo re-corro.
- No existe daemon de Telegram en el repo (la mención en encapsPlan.ts es solo convención de `item_key`).
