# PIRQA — Auditoría de publicaciones públicas (raw)

> Fecha de auditoría: **11-jun-2026** · Auditor: Claude Code (subagente)
> Cuentas auditadas: TikTok `@pirqahuachac` · YouTube `@pirqahuachac` · Instagram `@pirqa.huachac` · Web `pirqa.pe`

---

## 0. Método y honestidad sobre el acceso

| Fuente | Vía | Resultado |
|---|---|---|
| TikTok @pirqahuachac | WebFetch directo | **BLOQUEADO** (solo devolvió "TikTok - Make Your Day", cero datos) |
| YouTube @pirqahuachac | WebFetch directo (perfil y /videos) | **BLOQUEADO** (solo footer genérico de YouTube) |
| Instagram @pirqa.huachac | WebFetch directo | **Parcial** (solo el título "PIRQA · Tradiciones de Huáchac", resto base64 ilegible) |
| pirqa.pe | WebFetch directo | **OK completo** |
| Las 3 redes | **Chrome real del usuario (MCP chrome-devtools, sesión logueada del dueño)** | **OK completo** — todos los datos de abajo salen de snapshots a11y reales tomados el 11-jun-2026 |
| Facebook page de PIRQA | — | **[pendiente]** — no se auditó; la web pirqa.pe declara un Facebook @pirqa.huachac pero no se abrió el perfil |
| Búsqueda externa (indexación) | WebSearch | Las cuentas **NO aparecen indexadas** en búsqueda web (cuentas muy nuevas/pequeñas; el único "Pirqa" indexado en TikTok es una academia de escalada ajena) |

Lo no verificable se marca [pendiente]. Las vistas de TikTok provienen del texto accesible de la grilla del perfil (número al final de cada tarjeta); las fechas exactas de publicación en TikTok no eran visibles en la grilla → [pendiente], se infieren por contenido (elecciones 7-jun, estreno cuy 31-may).

---

## 1. Inventario real por plataforma

### 1.1 TikTok — @pirqahuachac ("PIRQA · Pachamanca de Huáchac")
- **13 seguidores · 68 me gusta · 0 siguiendo** · Bio: "Pachamanca a la tierra · Huáchac, Junín · WhatsApp 934 173 914"
- 10 videos visibles, **todos con "sonido original - PIRQA"** (ningún trending audio):

| # | Video (resumen del caption) | Vistas | URL |
|---|---|---|---|
| 1 | "El secreto del chancho a la caja china 🔥 la piel crocante la hace el carbón de ARRIBA... domingo 14" | 363 | https://www.tiktok.com/@pirqahuachac/video/7648778272016223509 |
| 2 | "Hoy el Perú elige presidente 🗳️ pero te dejo un secreto... carbón de ARRIBA... domingo 14 CHANCHO" | **2** | https://www.tiktok.com/@pirqahuachac/video/7648767786075819284 |
| 3 | "¿CUY o CHANCHO a la caja china? VOTA en los comentarios" (elecciones) | 365 | https://www.tiktok.com/@pirqahuachac/video/7648021979013893397 |
| 4 | "Este domingo cerramos 🗳️ elecciones... el PRÓXIMO domingo una sorpresa dorada al carbón" | **873** | https://www.tiktok.com/@pirqahuachac/video/7647683828609191188 |
| 5 | "¿Cuánto cuesta comer como en el valle del Mantaro? Pachamanca desde S/25..." | **879** | https://www.tiktok.com/@pirqahuachac/video/7645978559256775957 |
| 6 | "🟣 Las 3 chichas del valle en jarra de barro — morada, jora y maní · S/20" | 655 | https://www.tiktok.com/@pirqahuachac/video/7645975818472082709 |
| 7 | "🔥 HOY es el lanzamiento: Cuy a la caja china — jaca kanka... ¼ S/35 · entero S/99" | 190 | https://www.tiktok.com/@pirqahuachac/video/7645975628147117333 |
| 8 | "En Huáchac, la tierra todavía cocina 🌿 3000 años bajo piedra. Solo 40 platos por finde" | 225 | https://www.tiktok.com/@pirqahuachac/video/7645440870036114689 |
| 9 | "3 minutos que valen el viaje 🔥 Solo 40 platos por finde" | 205 | https://www.tiktok.com/@pirqahuachac/video/7645326214260952336 |
| 10 | "La pachamanca no se cocina, se espera 🌿 500 años de paciencia. ¿Vienes este domingo? 👇" | 226 | https://www.tiktok.com/@pirqahuachac/video/7644978727369067793 |

- Engagement real observado en notificaciones: likes de usuarios reales (Carlos, Dolly Power) y un follow institucional (CCONUSUR). Hay tracción orgánica embrionaria.
- Anomalía: el video #2 (2 vistas) duplica el mensaje del #1 el mismo día → canibalización.

### 1.2 YouTube — @pirqahuachac ("PIRQA · Pachamanca de Huáchac")
- **4 suscriptores · 12 videos** · Descripción: "Pachamanca a la tierra, cocida bajo piedra, en pleno valle del Mantaro." · Link: pirqa.pe
- Canal ID: UCVPFrmMcmvjTOR31breJK7Q

**Shorts (7):**

| Short | Vistas | URL |
|---|---|---|
| "¿KEIKO o SÁNCHEZ? 🇵🇪 HOY 7 jun · planes en AGRO y COMIDA" | 779 | https://www.youtube.com/shorts/9NUZI_v-lx8 |
| "¿Por qué este CHANCHO tarda 4 HORAS? 🔥 14 JUN" | 56 | https://www.youtube.com/shorts/iWrZMYeNA1s |
| "¿Por qué PIRQA cierra ESTE domingo? 🗳️ vuelve sáb 13 + chancho 14" | **820** | https://www.youtube.com/shorts/Yt__6n_rO6A |
| "HOY · CUY a la caja china · 11am-2pm · S/99 familiar" | 214 | https://www.youtube.com/shorts/wBnYnztZEvs |
| "El mejor cuy a la caja china del valle del Mantaro 🔥 a 5 min del Castillo" | 520 | https://www.youtube.com/shorts/O_eXcrDCz-Q |
| "POV: domingo en Huáchac (te invito a mi mesa)" | 514 | https://www.youtube.com/shorts/YtB8_RrPaFc |
| "Esto pasa en Huáchac cada domingo (S/35 la pachamanca)" | 113 | https://www.youtube.com/shorts/1DpOoL_LZYw |

**Videos largos (5):**

| Video | Duración | Vistas | Fecha | URL |
|---|---|---|---|---|
| "HOY votas: ¿Keiko o Sánchez? planes AGRO·TURISMO·COMIDA (data, sin política)" | 14:51 | 38 | hace 3 días | https://www.youtube.com/watch?v=oq4Q5YcbSvk |
| "El CHANCHO que TARDA 4 HORAS · El secreto de 1907 (lanzamiento 14 jun)" | 14:51 | 113 | hace 6 días | https://www.youtube.com/watch?v=-7J_mZGTem8 |
| "La CHICHA MORADA tiene MÁS antioxidantes que el vino tinto 🌽" | 7:06 | 60 | hace 12 días | https://www.youtube.com/watch?v=T-SsxgbbIIA |
| "El CUY tiene MÁS PROTEÍNA que el POLLO 🔥" | 5:53 | **9** | hace 12 días | https://www.youtube.com/watch?v=k7xSeC5Hmfo |
| "Lo que pasa cuando entierras carne 60 min bajo piedras al rojo 🔥" | 8:05 | 18 | hace 13 días | https://www.youtube.com/watch?v=Td-r-2kdBpQ |

### 1.3 Instagram — @pirqa.huachac ("PIRQA · Tradiciones de Huáchac")
- **26 publicaciones · 13 seguidores · 0 seguidos** · Categoría: Restaurante peruano
- Bio: "Una piedra mal puesta arruina la pachamanca. Por eso cuidamos cada pirqa. Pachamanca a la tierra · Huáchac, Junín" · Link: www.pirqa.pe (con UTM ig/social/link_in_bio — bien instrumentado)
- **Hallazgo crítico: las 12 publicaciones visibles del feed son IMÁGENES estáticas (flyers con mucho texto). El perfil NO muestra pestaña de Reels** → no hay video corto publicado en la red donde más cerca está el comprador local (IG/FB de Meta).
- Posts visibles (fecha · contenido · URL):
  1. 07-jun · Flyer "PRÓXIMO DOMINGO 14 ESTRENO: EL CHANCHO QUE TARDA 4 HORAS... piel cristal crocante · RESERVA WhatsApp +51 934 173 914" · https://www.instagram.com/pirqa.huachac/p/DZTLhr_H-Jz/
  2. 05-jun · Flyer elecciones 7-jun (cerrado, vota informado, "nos reencontramos el domingo 14") · https://www.instagram.com/pirqa.huachac/p/DZOZOvEDLvb/
  3. 04-jun · Flyer "ESTE DOMINGO 7 CERRADO por elecciones · 14-jun VOLVEMOS con una SORPRESA" · https://www.instagram.com/pirqa.huachac/p/DZLo6najNRG/
  4. 31-may · Flyer "LAS 3 CHICHAS DEL VALLE... CUY caja china... Reserva con el 50% por Yape" · https://www.instagram.com/pirqa.huachac/p/DZAFm-3H3X4/
  5. 31-may · Flyer "HOY SE ESTRENA EL CUY A LA CAJA CHINA · POCOS CUPOS HOY" · https://www.instagram.com/pirqa.huachac/p/DY_2vS5n4Os/
  6. 29-may · Flyer "DOMINGO 31: el festín wanka completo" · https://www.instagram.com/pirqa.huachac/p/DY8qYlKF2yW/
  7. 29-may · Carrusel branding "la del valle, a la tierra" · https://www.instagram.com/pirqa.huachac/p/DY7XpMGnLI-/
  8. 29-may · Flyer "ESTRENO DOMINGO 31: CUY A LA CAJA CHINA S/99 · porción S/35" · https://www.instagram.com/pirqa.huachac/p/DY7VboBHxxk/
  9. 29-may · Flyer "PACHAMANCA Familiar 4 personas S/98" · https://www.instagram.com/pirqa.huachac/p/DY7SG9YEq6c/
  10. 28-may · Flyer "Familiar S/98 incluye 1 jarra de chicha de cortesía" · https://www.instagram.com/pirqa.huachac/p/DY5H4qgjD_-/
  11. 28-may · Flyer "EL DOMINGO COMPLETO: Pachamanca + Cuy + 3 chichas" · https://www.instagram.com/pirqa.huachac/p/DY5G9lTjMqZ/
  12. 27-may · Carrusel educativo "LAS 3 CHICHAS DEL VALLE — 1. JORA, la madre (desliza)" · https://www.instagram.com/pirqa.huachac/p/DY2Djm1IApP/
  - Posts 13-26: **[pendiente]** (no cargados en el snapshot; requiere scroll)

### 1.4 Web — pirqa.pe (verificada por WebFetch, funciona)
- "PIRQA · Pachamanca de Huáchac — Cocida bajo tierra". Secciones: La Carta, Cuy, Chichas, El Lugar, Reservar.
- **El ritual en 4 pasos ya está narrado en la web**: marinado 12 h → piedras 4 h → armado → "el destape" de 3 minutos de humo. (El activo narrativo central YA existe; falta convertirlo en video.)
- Precios: Pachamanca S/18-S/98 · Cuy S/22-S/99 · Chicharrón S/27 · Chichas S/12-S/20.
- Horario: solo fines de semana 11-16 h, 5 turnos, 40 cupos. Reserva con adelanto S/15 (individual) / S/45 (familiar) vía Yape/Plin. WhatsApp +51 934 173 914.
- Declara redes: Instagram, TikTok, YouTube y Facebook @pirqa.huachac.

---

## 2. Evaluación Hook-Retain-Reward (Hormozi) y give:ask

Marco verificado: Hook-Retain-Reward de $100M Leads (hook = primeros segundos; retain = listas/pasos/historias que sostienen; reward = cumplir lo prometido) y ratio give:ask ≈ 3.5:1 (derivado de TV: 47 min de contenido / 13 min de anuncio por hora; las cuentas en crecimiento deben dar AÚN más). Fuentes en §5.

### 2.1 Lo que está BIEN (verificado en los captions/títulos)
- **Hooks de curiosidad ya funcionan**: los 4 contenidos más vistos son hooks de pregunta/newsjacking, no de venta: "¿Por qué PIRQA cierra ESTE domingo?" (820), "¿Cuánto cuesta comer como en el valle?" (879), "Este domingo cerramos 🗳️" (873), "¿KEIKO o SÁNCHEZ? planes en AGRO y COMIDA" (779). El newsjacking electoral multiplicó ~4x la media del canal.
- **Reward educativo presente**: "el secreto del carbón de ARRIBA", "la chicha morada tiene más antioxidantes que el vino", "3000 años bajo piedra" — dan dato real, no solo venden.
- **CTA e infraestructura impecables**: WhatsApp en bio, link en bio con UTM, reserva con adelanto Yape. El "ask" está bien construido.
- **Anticipación de estreno** (chancho 14-jun) = patrón lanzamiento correcto.

### 2.2 Lo que está MAL (contra el estándar)
1. **give:ask INVERTIDO en Instagram**: 11 de 12 posts visibles son flyers de venta/reserva → ratio real ≈ **1:11 de give:ask** (el estándar es 3.5 gives por 1 ask). En TikTok es mejor (≈ mitad give) pero casi todo cierra con "Reserva 👉".
2. **Instagram sin un solo Reel**: el formato que Meta más distribuye no existe en la cuenta; todo es flyer estático con texto denso (formato de menor alcance orgánico).
3. **Sin caras**: ningún caption/título sugiere rostro del dueño o del pachamanquero. Las cuentas food sin rostro no construyen retención ni confianza (mismo hallazgo que en content-calendar.md para cuentas médicas).
4. **Sin trending audio en TikTok**: 10/10 videos con "sonido original" propio.
5. **El destape NO es el protagonista**: la web lo narra ("3 minutos de humo") pero ni un solo video/caption está construido hacia ese clímax. Es exactamente lo que hizo viral a La Casita de Ricardo.
6. **Duplicación**: 2 videos del mismo mensaje el mismo día (el segundo murió con 2 vistas).
7. **Videos largos de 14:51 con 9-113 vistas**: el esfuerzo de largos no se justifica aún; a 4 suscriptores, los largos no tienen audiencia que retener.
8. **Retención (watch time) [pendiente]**: no medible desde el perfil público; revisar en TikTok Studio / YouTube Studio.

---

## 3. Estándar verificado 2025-2026 para contenido food (TikTok/Reels/Shorts)

Síntesis de fuentes reales (URLs en §5):

- **Duración**: <30 segundos genera el mayor engagement en video de restaurante; el hook decide en los **primeros 3 segundos** (Spindl, CloudKitchens).
- **Formatos probados**: (a) sensorial/ASMR — el chisporroteo, el vapor, el cheese-pull, el corte; (b) **before/after y transformación** (el destape ES un before/after natural); (c) behind-the-scenes y POV del staff; (d) "qué pedir" / datazo con precio+dirección; (e) chef/dueño a cámara (CloudKitchens, Toast, TastyIgniter, WebstaurantStore).
- **Frecuencia**: 1-2 videos/semana de calidad como piso, subir a 3-5/semana para alcance máximo; horas pico: 11-13 h, 17-19 h y 20-22 h (Spindl).
- **Consistencia > volumen** (Buffer, 52M+ posts, 200k cuentas, 2024-2025): publicar en 20+ semanas de una ventana de 26 = **~+450% engagement por post** vs. publicar esporádico; cualquier semana con post supera a una semana en silencio; 10+ posts/semana = +32 seguidores/semana promedio.
- **give:ask ≈ 3.5:1** y "da hasta que te pidan comprar"; las cuentas pequeñas en crecimiento deben sobre-dar (hasta 10:1) antes de pedir ($100M Leads, resúmenes citados).
- **TikTok for Business** mantiene guía específica de food advertising (formatos nativos, creadores locales): https://ads.tiktok.com/business/en/guides/food-advertising-guide
- **Referente directo verificado — La Casita de Ricardo** (@pachamancas.lcr, San Miguel, Lima): su viralidad NO la generó solo su cuenta; la generaron **foodies terceros** que publican el datazo con precio + dirección + qué pedir (billytravel_oficial, dannielahe, jamaenruta, valeriamera_, ricoyfacil, fiorelaallisoon — URLs en §5). Patrón replicable: invitar 3-5 foodies de Huancayo un domingo, cada uno publica su versión.

---

## 4. Sugerencias concretas para PIRQA (ciclo mié→dom; lanzamiento cupos sáb 12:00 → venta dom 11-16)

### 4.1 Cambios estructurales (esta semana)
1. **Reels YA en Instagram**: reutilizar los 10 TikToks existentes como Reels (mismo archivo, sin marca de agua). Cero costo, corrige el hueco más grande.
2. **Invertir el ratio**: de cada 5 posts, 4 give (proceso, ingrediente, historia, gente) y solo 1 ask (cupos). El ask concentrado sáb 12:00 y dom AM.
3. **La cara del dueño**: presentarse a cámara una vez por semana. El ángulo es oro puro y único: *"De lunes a viernes soy médico. Los domingos hago pachamanca en mi pueblo."* Ese hook no lo puede copiar nadie del valle.
4. **Pausar los largos de 14 min** hasta tener >500 suscriptores; redirigir ese esfuerzo a 3-5 cortos/semana de <30 s. (Excepción: 1 largo mensual "el ritual completo" como ancla.)
5. **No publicar 2 veces el mismo mensaje el mismo día** (caso del video de 2 vistas); variar hook aunque el tema se repita.

### 4.2 Plantilla semanal mié-dom (formato <30 s salvo indicación)
- **Mié (give)** — Ingrediente/proceso: el chincho, el huacatay, la piedra volcánica, la jora fermentando. ASMR: sonido real del fuego/del marinado. IG fuerte mié-jue.
- **Jue (give + semilla)** — Behind the scenes: preparando el marinado de 12 h, el dueño a cámara 15 s: "esto que ves hoy se entierra el domingo". Cierra con pregunta, no con venta.
- **Vie (give)** — Historia/gente: la abuela, el pueblo, el Castillo de Huáchac, "a 25 min de Huancayo". Shorts fuerte viernes tarde.
- **Sáb 12:00 (ASK — lanzamiento)** — Video de cupos: "Mañana solo 40 platos. 5 turnos. Yape S/15 y tu mesa queda sellada." + Stories countdown + responder WhatsApp en bloque.
- **Sáb tarde (give)** — El ritual empieza: calentando piedras 4 h, armando el horno de tierra. "Esto ya está pasando para mañana."
- **DOM 11:00-11:30 (clímax) — EL DESTAPE EN VIVO**: vertical, cámara fija sobre el hoyo, 3 minutos de humo, manos levantando las mantas, vapor, primer plano de la carne. Versión live (TikTok/IG) + clip editado de 20-30 s publicado el mismo domingo ("el destape de hoy") + reacción del primer cliente probando. Serie semanal con nombre fijo: **"El destape del domingo"** — es el equivalente exacto del activo que hizo viral a La Casita de Ricardo, pero PIRQA lo tiene EN TIERRA (Lima lo hace en olla/cilindro: ventaja de autenticidad).
- **Dom tarde (prueba social)** — Mesas llenas, niños, jarras de chicha, testimonios de 5 s. Material que alimenta los gives de la semana siguiente.

### 4.3 Tácticas adicionales
- **Foodies de Huancayo**: invitar 3-5 con mesa gratis un domingo (estrategia La Casita de Ricardo); pedirles el formato datazo: precio + "a 25 min de Huancayo" + dirección + qué pedir.
- **Trending audio** en al menos 1 de cada 3 TikToks; mantener sonido original solo cuando el audio real (fuego, vapor) sea el protagonista (ASMR).
- **Geo-tags y hashtags locales** consistentes: #huancayo #huachac #valledelmantaro + tag de ubicación en IG (los captions de TikTok ya lo hacen bien; IG no se pudo verificar → [pendiente]).
- **Subtítulos grandes** en todo video hablado (visualización sin audio en 4G).
- **Métricas semanales (domingo noche)**: vistas por video, % de give vs ask, reservas con adelanto atribuibles (preguntar "¿cómo nos encontraste?" en WhatsApp), seguidores. Línea base hoy: TikTok 13 seg / 68 likes · YT 4 subs · IG 13 seg.
- **Sinergia terrenos (nota)**: los videos del valle ("a 25 min de Huancayo", el Castillo, la plaza) sirven también como prueba de zona para los compradores de los 13 predios de casasototocas.vercel.app; el WhatsApp es el mismo (934 173 914) — mantener separación de marcas pero reutilizar B-roll.

---

## 5. Fuentes

**Observación directa (11-jun-2026, Chrome con sesión real vía MCP chrome-devtools):**
- https://www.tiktok.com/@pirqahuachac (perfil + 10 videos listados arriba con sus URLs individuales)
- https://www.youtube.com/@pirqahuachac/shorts y https://www.youtube.com/@pirqahuachac/videos (12 videos, URLs arriba)
- https://www.instagram.com/pirqa.huachac/ (26 posts, 12 URLs individuales arriba)
- https://www.pirqa.pe (WebFetch)

**Mejores prácticas food/restaurante 2025-2026:**
- CloudKitchens — TikTok marketing for restaurants: https://cloudkitchens.com/blog/tiktok-marketing-for-restaurants
- Spindl — 9 TikTok marketing ideas (duración <30 s, hook 3 s, frecuencia 1-2→3-5/sem, horas pico): https://www.spindl.app/en/blog/restaurant-tiktok-marketing-ideas
- Toast — TikTok marketing for restaurants 2025: https://pos.toasttab.com/blog/on-the-line/tiktok-marketing-for-restaurants
- TastyIgniter — Proven TikTok campaigns for restaurant growth: https://tastyigniter.com/blog/proven-tiktok-campaigns-that-drive-restaurant-growth
- WebstaurantStore — TikTok for restaurants: https://www.webstaurantstore.com/blog/4374/tiktok-for-restaurants.html
- ChowNow — TikTok views → online orders: https://get.chownow.com/blog/tiktok-marketing-for-restaurants/
- TikTok for Business — Food Advertising Guide (guía oficial): https://ads.tiktok.com/business/en/guides/food-advertising-guide
- Buffer — State of Social Media Engagement 2026 (52M+ posts; consistencia 20+/26 semanas = ~+450% engagement/post): https://buffer.com/resources/state-of-social-media-engagement-2026/

**Marco Hormozi (verificación):**
- Hook-Retain-Reward explicado: https://itsmostly.com/blog/alex-hormozis-content-strategy-hook-retain-and-reward-explained y https://www.powercademy.com/blog/alex-hormozi-s-hook-retain-reward-framework
- give:ask 3.5:1 (TV 47:13) en $100M Leads: https://digital-garden.ontheagilepath.net/comprehensive-summary-based-on-my-highlights · https://publish.obsidian.md/charllaubscher/02+Antilibrary/Hormozi-$100M+Leads

**Referente La Casita de Ricardo (verificado):**
- Cuenta oficial: https://www.tiktok.com/@pachamancas.lcr
- Foodies terceros que la viralizaron: https://www.tiktok.com/@billytravel_oficial/video/7299835258487180549 · https://www.tiktok.com/@dannielahe/video/7341534962153311494 · https://www.tiktok.com/@jamaenruta/video/7286993729641008389 · https://www.tiktok.com/@valeriamera_/video/7393150702924598534 · https://www.tiktok.com/@ricoyfacil/video/7416517166977142021

**Contexto local leído:** `D:\joseph-md-app\DATA\BUSINESS\content-calendar.md` (reparto 70/10/10/10, cadencia, referentes).
