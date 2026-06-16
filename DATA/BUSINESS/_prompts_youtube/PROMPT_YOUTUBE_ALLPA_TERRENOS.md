# PROMPT — Claude Code dentro de D:\casa-soto-tocas · Logo + Video YouTube (ALLPA Terrenos)

> Pégalo en Claude Code abriendo la carpeta **D:\casa-soto-tocas**. Todo el material ya está en `_MARKETING\`.

---

CONTEXTO: Estás dentro de D:\casa-soto-tocas (web nativa Next.js 14 del catálogo de 13 predios en Huáchac / Valle del Mantaro — casasototocas.vercel.app, familia Soto Tocas). ALLPA ("tierra" en quechua) es la MARCA SOCIAL paralela de esos mismos terrenos (Facebook página ID 61590457814813 ya creada, YouTube @allpaterrenos ya creado). Todo el material de referencia ya está copiado dentro de esta carpeta en `_MARKETING\`: logos en `_MARKETING\logos\` (allpa-avatar-512.png, allpa-logo-horizontal, allpa-emblema, el wordmark Casa Soto Tocas y el QR), frameworks de venta en `_MARKETING\ventas-hormozi\` (hormozi-method.md, libros.md, hormozi_seguimiento_raw.md, lean_analytics_raw.md, cro_landing_raw.md, referentes_terrenos_peru_raw.md, libros_inmobiliaria_raw.md, research_raw.json) y el método en `_MARKETING\youtube-playbook\PLAYBOOK_YOUTUBE_IA_UNIVERSAL.md`. ANTES de hacer nada, LEE COMPLETO ese playbook (presta atención a la §10 adaptación nicho TERRENOS) y hormozi_seguimiento_raw.md. También tengo el NotebookLM "YOUTUBE DATA" (36 fuentes de canales de crecimiento en español) para pedir citas textuales sobre títulos, miniaturas, retención y outliers.

CUENTA: todo sale de josephsototocas@gmail.com. Marca/colores: navy + gold + cream + tierra/green. Tipografía Cormorant + Inter Tight. WhatsApp +51 934 173 914. Catálogo: casasototocas.vercel.app. Visitas sáb/dom 4:00 p.m. con cita. Estado legal real de los predios: SUNARP / Juzgado de Paz / Escritura Pública Notarial.

=== TAREA 1: LOGO / AVATAR EN REDES ===
1. Coloca `_MARKETING\logos\allpa-avatar-512.png` como FOTO DE PERFIL del canal de YouTube @allpaterrenos (Studio > Personalización > Perfil) Y de la página de Facebook ALLPA (ID 61590457814813). Es 512x512 listo, no lo recortes.
2. Usa `_MARKETING\logos\allpa-logo-horizontal.png` como banner del canal de YouTube y portada de Facebook (si pide más resolución, regenera el banner a 2560x1440 con safe-zone central desde el lockup, fondo cream/navy sólido). Chrome está en tier "read": para subir imágenes en youtube.com/studio y facebook.com usa el MCP claude-in-chrome (adjuntar a mi Chrome ya abierto, NO sesión nueva, para preservar mi login de Google); screenshot y reporte de cada paso.

=== TAREA 2: UN (1) VIDEO LARGO DE YOUTUBE, 100% IA, AL PIE DEL PLAYBOOK ===
NICHO/ÁNGULO (el más importante): el COMPRADOR-A-DISTANCIA / EMIGRANTE — la persona del valle que vive en Lima, EE.UU., España, etc., quiere comprar un terreno en su tierra pero TIENE MIEDO de que lo estafen comprando sin estar presente. El video resuelve ese miedo enseñándole a VERIFICAR la partida en SUNARP DESDE EL CELULAR y a comprar sin viajar (videollamada + poder a un notario). Es 85% EDUCACIÓN ANTI-ESTAFA / 15% marca (give:ask de Hormozi). NO es venta directa de un predio.

Idea outlier validada (§5 y §10): elige UN tema tipo "Cómo saber si un terreno es REAL desde tu celular (sin viajar)" o "Cómo comprar terreno en Perú SIN que te estafen estando lejos". Verifica que funcione en canales pequeños <50k subs y que sea 100% ejecutable con IA (NotebookLM + drone IA + mapas + tablas + capturas reales del proceso SUNARP).

Construcción exacta según el playbook:
- TÍTULO (§1): MÁXIMO 55 caracteres, curiosity gap, número/tiempo o autoridad, palabra de poder y el DESEO FINAL (comprar seguro sin que te estafen), no el medio. Cuenta los caracteres y anótalos. Molde a adaptar (no copiar literal): "Cómo NO te estafan al comprar terreno desde lejos".
- HOOK 30s (§3): HOOK → PRUEBA SOCIAL → OUTPUT, sin "hola bienvenidos", sin pedir like/sub al inicio. Abre 1-2 LOOPS (ej: "el error #1 que cometen los que compran desde el extranjero lo veremos al final").
- ESTRUCTURA DE LIBRO (§3): capítulos encadenados. Apóyate en el contenido real: verificar partida en SUNARP, diferencia Juzgado de Paz vs SUNARP vs Escritura, comprar por videollamada + poder notarial, los 3 errores (pagar sin partida, "gangas" falsas, acceso no verificado). Cero relleno.
- VARIEDAD VISUAL (§4, error #1 que mata el video): 1 CAMBIO CADA 4-8 SEGUNDOS (video ~12 min => 110-160 cambios). Técnicas: drone IA del valle (Veo 3.1/Kling), mapas de plusvalía y ubicación, slides Python+Pillow con números gigantes (precio S/, S//m², minutos a la Plaza), tablas comparativas de estado legal, capturas de pantalla del paso a paso en SUNARP, "antes/después" de pista, checklist legal en pantalla, cambio de color de fondo por capítulo, SFX en cada corte. PROHIBIDO imagen fija 10 minutos. Fotos reales de contexto en D:\casa-soto-tocas\fotos generales\.
- VOZ (§6): NotebookLM "Deep Dive" 2 voces (12-22 min) con focus_prompt fijando tono educativo anti-estafa, marca ALLPA y exactitud legal. Descarga desde Studio > ⋮ Más > Descargar (clic real).
- ENSAMBLAJE (§6): ffmpeg libx264 + faststart. NUNCA -c:v copy al muxear audio con concat (rompe moov atom, YouTube lo rechaza). Anti-look-IA en prompts de imagen: lenguaje de cámara (shot on Sony, shallow DoF), luz coherente (golden hour/overcast), imperfecciones (film grain, candid) y negative prompt (smooth plastic, airbrushed, oversaturated, fingers, watermark, text).

=== TAREA 3: ENFOQUE EXTREMO EN LA MINIATURA (§2 — el packaging es el 50%) ===
- EXACTAMENTE 3 ELEMENTOS, ni uno más.
- FONDO CLARO (cream) para destacar contra la mayoría de miniaturas oscuras del nicho inmobiliario.
- Contraste fuerte (navy/gold sobre cream); puede ir un elemento de autoridad visual (sello SUNARP, lupa sobre una partida, el valle al fondo).
- TEXTO corto que COMPLEMENTA el título, NUNCA lo repite, y genera una pregunta (ej: "¿REAL o ESTAFA?"). Legible en móvil.
- Genera 3 variantes para A/B test en YouTube.

=== RESTRICCIÓN CRÍTICA DE VERIFICACIÓN DE TELÉFONO (§7) ===
La MINIATURA PERSONALIZADA y los VIDEOS >15 min REQUIEREN el canal verificado por teléfono (SMS en youtube.com/verify, lo hace el DUEÑO del canal). Si @allpaterrenos NO está verificado: (a) corta el video a ≤14:50 con ffmpeg; (b) como YouTube rechazará silenciosamente la miniatura custom y mostrará un frame feo, METE dentro del metraje una SLIDE tipo-miniatura (texto bueno) para que el frame auto-generado quede decente. Pregúntame si ya verifiqué el teléfono de @allpaterrenos antes de asumir.

ENTREGABLES: título final (con conteo de caracteres), guion con marcas de tiempo de los cambios visuales, audio NotebookLM descargado, MP4 final ≤14:50 listo para subir, y 3 miniaturas. Déjalo todo en D:\casa-soto-tocas\_MARKETING\salida-video\. Ejecuta TODO desde esta carpeta (D:\casa-soto-tocas). Reporta el avance y pregúntame solo lo que de verdad bloquee (verificación de teléfono).
