# PROMPT — Claude Code dentro de D:\qori-golden · Logo + Video YouTube (Qori Golden)

> Pégalo en Claude Code abriendo la carpeta **D:\qori-golden**. Todo el material ya está en `_MARKETING\`.

---

CONTEXTO: Estás dentro de D:\qori-golden (web estática de Qori Golden, criadero familiar de Golden Retriever en Huáchac, Valle del Mantaro, Huancayo — familia Soto Tocas). Todo el material de referencia ya está copiado dentro de esta carpeta en `_MARKETING\`: los logos en `_MARKETING\logos\`, los frameworks de venta en `_MARKETING\ventas-hormozi\` (hormozi-method.md, libros.md, golden_breeders_raw.md, los _scrape y research_raw.json) y el método de YouTube en `_MARKETING\youtube-playbook\PLAYBOOK_YOUTUBE_IA_UNIVERSAL.md`. ANTES de hacer nada, LEE COMPLETO ese playbook y golden_breeders_raw.md. Además tengo el NotebookLM "YOUTUBE DATA" (36 fuentes de canales de crecimiento en español): úsalo para pedir citas textuales sobre títulos, miniaturas, retención y outliers cuando lo necesites.

CUENTA: todo sale de josephsototocas@gmail.com. Marca/colores: honey #C9913B + cream #FBF6EC + brown #3B2A18 + green #0E7C5A (WhatsApp). Tipografía Cormorant Garamond (display) + Inter Tight (UI). WhatsApp +51 934 173 914.

=== TAREA 1: LOGO / AVATAR EN REDES ===
1. Coloca `_MARKETING\logos\qori-golden-avatar-512.png` como FOTO DE PERFIL del canal de YouTube @qorigolden (Studio > Personalización > Perfil > Foto) Y de la página de Facebook Qori Golden. Es 512x512 listo para usar, no lo recortes.
2. Usa `_MARKETING\logos\qori-golden-logo-horizontal.png` como banner/encabezado del canal de YouTube y portada de Facebook (si pide más resolución, regenera el banner a 2560x1440 con safe-zone central a partir del lockup horizontal, fondo cream sólido). Como Chrome está en tier "read", para subir las imágenes en youtube.com/studio y facebook.com usa el MCP claude-in-chrome (adjuntar a mi Chrome ya abierto, NO sesión nueva, para preservar mi login de Google); haz screenshot y reporta cada paso.

=== TAREA 2: UN (1) VIDEO LARGO DE YOUTUBE, 100% IA, AL PIE DEL PLAYBOOK ===
NICHO/ÁNGULO: Golden Retriever criado EN LA ALTURA de Huancayo (Valle del Mantaro) por una familia, con transparencia total (salud verificable, crianza en casa, garantía por contrato). El video es 85% EDUCACIÓN / 15% marca (give:ask de Hormozi). NO es venta directa: es el comprador que quiere un golden sano y teme que le vendan un cachorro enfermo o "criadero fábrica".

Idea outlier validada (regla §5): elige UN tema tipo "lo que nadie te dice sobre criar un Golden en la sierra" o "cómo elegir un cachorro golden SANO (y no que te estafen)". Verifica que funcione en canales pequeños <50k subs y que sea ejecutable 100% con IA (NotebookLM + imágenes IA + fotos/2 videos reales de Boby que están en D:\qori-golden\fotos-boby\).

Construcción exacta según el playbook:
- TÍTULO (§1): MÁXIMO 55 caracteres, curiosity gap (pregunta sin respuesta), incluye número/tiempo o autoridad, palabra de poder y el DESEO FINAL (un perro sano y de buen carácter), no el medio. Cuenta los caracteres y déjalos anotados. Ej. de molde a adaptar (no copiar literal): "¿Por qué tu Golden hace ESTO? (y cómo evitarlo)".
- HOOK 30s (§3): estructura HOOK → PRUEBA SOCIAL → OUTPUT, SIN "hola, bienvenidos" y SIN pedir like/sub al inicio. Abre 1-2 LOOPS de curiosidad que resuelvas al final.
- ESTRUCTURA DE LIBRO (§3): capítulos que enganchen al siguiente, cero relleno ni tecnicismos.
- VARIEDAD VISUAL (§4, error #1 que mata el video): 1 CAMBIO VISUAL CADA 4-8 SEGUNDOS. Si el video dura ~12 min => 110-160 cambios. Técnicas: Ken Burns con zoom/pan/orbit DISTINTO en cada foto de Boby, slides de datos hechos con Python+Pillow (números gigantes, comparativas raza/alimentación, timeline de las primeras semanas), b-roll IA (Veo 3.1 / Kling para humo/agua/golden corriendo), cambio de color de fondo por capítulo, SFX en cada corte. PROHIBIDO imagen fija 10 minutos.
- VOZ (§6): NotebookLM "Deep Dive" 2 voces (12-22 min) con focus_prompt que fije el tono educativo, la marca Qori Golden y la exactitud. Descarga el audio desde Studio > ⋮ Más > Descargar (clic real, la API falla).
- ENSAMBLAJE (§6): ffmpeg con libx264 + faststart. NUNCA uses -c:v copy al muxear audio con concat (rompe el moov atom y YouTube lo rechaza). Anti-look-IA en los prompts de imagen: lenguaje de cámara (shot on Sony 50mm, shallow DoF), luz coherente (golden hour), imperfecciones (film grain, candid) y negative prompt (smooth plastic, airbrushed, oversaturated, fingers, watermark, text).

=== TAREA 3: ENFOQUE EXTREMO EN LA MINIATURA (§2 — el packaging es el 50%) ===
- EXACTAMENTE 3 ELEMENTOS, ni uno más.
- FONDO CLARO (cream/honey) para destacar contra la mayoría de miniaturas oscuras del nicho.
- Contraste fuerte con colores cálidos; cara expresiva del golden (foto real de Boby si calza).
- El TEXTO debe ser corto y COMPLEMENTAR el título, NUNCA repetirlo, y generar una pregunta en vez de responderla. Legible en móvil.
- Genera 3 variantes de miniatura para A/B test en YouTube.

=== RESTRICCIÓN CRÍTICA DE VERIFICACIÓN DE TELÉFONO (§7) ===
La MINIATURA PERSONALIZADA y los VIDEOS >15 min REQUIEREN el canal verificado por teléfono (SMS en youtube.com/verify, lo hace el DUEÑO del canal). Si el canal NO está verificado: (a) corta el video a ≤14:50 con ffmpeg; (b) como YouTube rechazará silenciosamente la miniatura custom y mostrará un frame feo, METE dentro del metraje una SLIDE tipo-miniatura (con el texto bueno) para que el frame auto-generado quede decente. Pregúntame si ya verifiqué el teléfono de @qorigolden antes de asumir.

ENTREGABLES: título final (con conteo de caracteres), guion con marcas de tiempo de los cambios visuales, audio NotebookLM descargado, MP4 final ≤14:50 listo para subir, y 3 miniaturas. Déjalo todo en D:\qori-golden\_MARKETING\salida-video\. Ejecuta TODO desde esta carpeta (D:\qori-golden). Repórtame el avance y pregúntame solo lo que de verdad bloquee (verificación de teléfono, precio final del cachorro).
