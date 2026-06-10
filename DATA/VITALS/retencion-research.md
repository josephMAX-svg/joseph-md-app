# VITALS — investigación de retención + embeds de YouTube (10-jun-2026)

> Producida por 2 agentes de investigación con fuentes verificadas. Es la base técnica del
> prompt `PROMPT_CHAT_VITALS.md`. Criterio Hormozi (HORMOZI_METODOLOGIA.md del propio repo
> VITALS): **priorizar el denominador de la Value Equation** (bajar time-delay y effort)
> antes que inflar el numerador.

## A. Stack de retención — 8 mecánicas probadas (apps reales)

| # | Mecánica | App de referencia | Qué hace | Mapeo Hormozi |
|---|----------|-------------------|----------|----------------|
| 1 | **Score diario que expira** | Whoop (Recovery %, WHOOP Age) | Un número HOY que se recalcula cada día — si no entras, no lo ves. Razón nº1 de apertura diaria | ↓ time-delay (feedback inmediato) |
| 2 | **Racha semanal + freeze** | Peloton (semanas activas), Duolingo (freeze) | La unidad es la SEMANA (no el día: un día perdido no destruye meses) + 1 freeze/mes para proteger la racha | ↓ sacrifice (perdonar la vida real) |
| 3 | **Banner de PR en vivo** | Hevy (records multi-categoría) | Al loguear una serie que supera e1RM/volumen/reps históricos → banner inmediato. Multi-categoría = PRs frecuentes | ↑ dream outcome visible |
| 4 | **Plan pre-armado al abrir** | Fitbod | La app abre YA con el entreno del día listo (cero decisiones). Si fallaste ayer, se reajusta solo | ↓ effort (cero fricción de arranque) |
| 5 | **Logging sin fricción** | MacroFactor (foto/voz, <5 s) | Registrar comida en segundos. VITALS YA tiene foto+Gemini — pulir, no construir | ↓ effort |
| 6 | **Coach adherence-neutral** | MacroFactor (filosofía explícita) | El coach NUNCA regaña por fallar; ajusta el plan hacia adelante. La culpa es el predictor nº1 de abandono | ↓ sacrifice emocional |
| 7 | **Leaderboard segmentado** | Strava (Local Legend: solo frecuencia, no rendimiento) | Comparar solo contra contexto justo (o contra ti mismo). Local Legend premia CONSTANCIA, no fuerza | ↑ likelihood percibida |
| 8 | **Reporte semanal + recap anual** | Whoop (Weekly Performance Assessment), Spotify Wrapped | Lunes: resumen 7d con 1 insight accionable. Anual: recap compartible | ↑ dream outcome + social |

**Prioridad para VITALS (1 usuario real: Joseph):** 1, 4, 3, 2, 8 primero — el 5 ya existe
(pulir), el 6 es un cambio de prompt del coach, el 7 aplaza hasta que haya >1 usuario
(o versión "tú vs. tu semana pasada").

## B. Embeds de YouTube — técnica verificada

- **Patrón facade** (lo que VITALS ya hace en `video.tsx` con youtube-nocookie + clic en
  miniatura): correcto, mantener. Alternativas equivalentes: `lite-youtube-embed`,
  `@next/third-parties/google` → `<YouTubeEmbed/>` (Next.js oficial, usa lite-youtube bajo el capó).
- **Parámetros útiles**: `start=N&end=N` (clip de la parte técnica exacta del video),
  `rel=0` (sugerencias solo del mismo canal), `playsinline=1` (iOS).
  ⚠️ `modestbranding` está MUERTO (ignorado desde ago-2023).
- **Playlists propias**: pasar `videoIds` y avanzar con la IFrame API en `onStateChange===0`
  (fin de video) → sesión de baile continua sin salir de la app.
- **iOS caveat**: autoplay programático tras gesto requiere doble interacción a veces —
  la facade (clic del usuario en la miniatura) lo evita por diseño.
- **Errores 101/150** (embedding deshabilitado por el canal): manejar `onError` →
  degradar al `VideoButton` (búsqueda externa) que ya existe.
- **✅ Verificado vía oEmbed (10-jun-2026): el canal de Andrés Vázquez PERMITE embedding.**

## C. Líneas rojas de ToS de YouTube (NO cruzar)

1. **III.F.3.a** — NO cobrar por ver contenido embebido (VITALS es interno/gratuito para
   el usuario: OK, pero si algún día se vende acceso a la app, los videos no pueden ser
   el contenido de pago).
2. **III.F.3.b** — NO poner los videos detrás de un gate (login-wall específico para verlos).
3. **III.E.1** — NO cachear/descargar los videos.
4. **III.I.6** — NO modificar ni superponer elementos sobre el player.
5. Mostrar atribución natural (título/canal visibles — el player ya lo hace).

## D. Ventanas de publicación (de la investigación Business, aplica a contenido VITALS→Pulso)

IG mié/jue tarde-noche · TikTok tardes + fin de semana · Shorts viernes
(Buffer/Sprout/Hootsuite 2025-2026, ya guardado en DATA/BUSINESS).
