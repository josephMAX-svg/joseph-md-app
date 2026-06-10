/**
 * brandContentExtras.ts — GENERADO por DATA/_scripts/extract_content_extras.js desde el
 * workflow content-tools-referents (3 agentes, URLs verificadas; raw en
 * DATA/BUSINESS/_scrape/content_tools_referents_raw.json). NO editar a mano.
 * ⚠ Sora (OpenAI) DESCONTINUADA abr-2026 — usar Veo en Gemini (plan ya pagado) + Google Flow.
 */
export interface Herramienta { nombre: string; tipo: string; url: string; nota: string }
export interface Referente { nombre: string; red: string; url: string; porQue: string }

export const HERRAMIENTAS: Herramienta[] = [
  {
    "nombre": "CapCut Web",
    "tipo": "Editor web de video",
    "url": "https://www.capcut.com/tools/online-video-editor",
    "nota": "El editor de referencia para Reels/TikTok/Shorts: plantillas verticales virales, auto-captions, text-to-speech, beat sync y export directo a TikTok (es de ByteDance). Corre 100%…"
  },
  {
    "nombre": "Canva (editor de video y Reels)",
    "tipo": "Editor web de video + diseño",
    "url": "https://www.canva.com/video-editor/",
    "nota": "Ideal para Reels con texto/gráficos de marca y carruseles convertidos a video. Punto CLAVE para este usuario: ya tiene el MCP oficial de Canva conectado en este entorno…"
  },
  {
    "nombre": "Microsoft Clipchamp",
    "tipo": "Editor web de video",
    "url": "https://app.clipchamp.com/",
    "nota": "El free tier más honesto de los editores web: 1080p limpio sin pagar. Buen plan B a CapCut si no quieres ecosistema ByteDance. Solo funciona en Chrome/Edge (perfecto para…"
  },
  {
    "nombre": "Adobe Express",
    "tipo": "Editor web de video + diseño",
    "url": "https://www.adobe.com/express/",
    "nota": "Alternativa sólida con plantillas verticales y captions integrados; en 2026 sumó slip edits y mejoras de captions. Export limpio gratis. · Sí, web app estándar con login Adobe.…"
  },
  {
    "nombre": "Veo dentro de Gemini",
    "tipo": "Generador de video IA",
    "url": "https://gemini.google.com/",
    "nota": "La ruta de video IA de mayor calidad disponible 'gratis' para este usuario (ya la paga). Veo genera clips verticales con audio listos como B-roll o hook de Reels. Es la respuesta…"
  },
  {
    "nombre": "Google Flow",
    "tipo": "Generador/estudio de video IA",
    "url": "https://labs.google/flow",
    "nota": "El estudio 'filmmaker' de Google sobre Veo: escenas encadenadas, extensión de clips, ingredientes de imagen (Imagen/Nano Banana), control de cámara. Mucho más volumen mensual que…"
  },
  {
    "nombre": "Meta Business Suite",
    "tipo": "Programador de publicaciones…",
    "url": "https://business.facebook.com/",
    "nota": "El programador nativo y gratuito para Reels de IG/FB — sin límites de posts/mes como los schedulers de terceros. Web completa de escritorio. · Sí — es de las más automatizables:…"
  },
  {
    "nombre": "TikTok Studio (subida web nativa)",
    "tipo": "Subida + programador nativo de TikTok",
    "url": "https://www.tiktok.com/tiktokstudio",
    "nota": "La única forma oficial y gratuita de programar TikToks; la programación SOLO existe en la web de escritorio, no en la app móvil — perfecto para automatización por navegador. El…"
  },
  {
    "nombre": "YouTube Studio",
    "tipo": "Subida + programador de Shorts (y…",
    "url": "https://studio.youtube.com/",
    "nota": "Programador nativo de Shorts más flexible de los tres (se puede editar lo programado, sin ventana de 10 días). Bonus: sus auto-captions sirven como generador de subtítulos gratis…"
  }
];

export const REFERENTES: Record<string, Referente[]> = {
  "pulso": [
    {
      "nombre": "Dr. Sebastián Arrieta (@doctorarrietam) — Perú",
      "red": "TikTok/Instagram",
      "url": "https://www.tiktok.com/@doctorarrietam",
      "porQue": "Médico peruano con máster en Obesidad y Trastornos de la Conducta Alimentaria; ~1.1M en Instagram y TikTok con videos que superan 2M de vistas. Es EL modelo para Pulso:…"
    },
    {
      "nombre": "Dr. Rawdy (Rawdy Reales) — Colombia",
      "red": "TikTok",
      "url": "https://www.tiktok.com/@dr.rawdy",
      "porQue": "Internista colombiano haciendo fellowship de ENDOCRINOLOGÍA (el nicho hormonal exacto de Pulso) con 7.3M en TikTok (@dr.rawdy). Formato: humor + docencia en clips de…"
    },
    {
      "nombre": "Dr. Borja Bandera — España",
      "red": "YouTube",
      "url": "https://www.youtube.com/@BorjaBandera",
      "porQue": "Endocrinólogo y nutricionista español, de las voces más influyentes de salud metabólica en habla hispana. Es EL referente en español para contenido GLP-1: videos…"
    },
    {
      "nombre": "Isabel Viña Bas — España",
      "red": "TikTok/Instagram/podcast",
      "url": "https://www.tiktok.com/@isabelvinabas",
      "porQue": "Médica española (residencia en Endocrinología y Nutrición) con ~435K Instagram, ~140K TikTok y el podcast 'Tus amigas las hormonas' (2.º más escuchado de salud/fitness…"
    },
    {
      "nombre": "Marian Rojas Estapé — España",
      "red": "Instagram/YouTube/podcast",
      "url": "https://www.instagram.com/marianrojasestape/",
      "porQue": "Psiquiatra del Instituto Rojas-Estapé con ~5M en Instagram, canal YouTube propio y uno de los podcasts de salud/bienestar más escuchados del mundo en español; libros…"
    },
    {
      "nombre": "Farmacéutico Fernández (Álvaro Fernández) — España",
      "red": "TikTok",
      "url": "https://www.tiktok.com/@farmaceuticofernandez",
      "porQue": "Farmacéutico madrileño con 3.8M en TikTok y ~1M en Instagram. Su motor de contenido: responder en 30-45s las preguntas que la gente no se atreve a hacer en persona ('el…"
    },
    {
      "nombre": "Doctor Mike (Mikhail Varshavski) — EEUU",
      "red": "YouTube",
      "url": "https://www.youtube.com/@DoctorMike",
      "porQue": "Médico de familia en NYC, ~14.9M suscriptores. Su formato insignia: 'Doctor reacts' a TikToks médicos, series de TV y casos de ER — mezcla entretenimiento + corrección…"
    },
    {
      "nombre": "Dr. Karan Rajan — Reino Unido",
      "red": "TikTok/YouTube",
      "url": "https://www.drkaranrajan.com/about",
      "porQue": "Cirujano del NHS con +10M de seguidores sumando TikTok/YouTube/IG/Facebook desde 2020. Fórmula quirúrgica: desmontar UN mito en menos de 60 segundos — dato rápido,…"
    },
    {
      "nombre": "Dr. Spencer Nadolsky — EEUU",
      "red": "Telemedicina + redes",
      "url": "https://joinvineyard.com/",
      "porQue": "Médico de medicina de obesidad, fundador de Vineyard (clínica de cuidado integral GLP-1) y voz constante en podcasts/YouTube explicando agonistas GLP-1, efectos…"
    },
    {
      "nombre": "Dr. Michael Breus ('The Sleep Doctor') — EEUU",
      "red": "Instagram/TikTok/web",
      "url": "https://www.instagram.com/thesleepdoctor/",
      "porQue": "Psicólogo clínico especializado en sueño (25 años de práctica), autor bestseller ('The Power of When'), cuentas @thesleepdoctor con cientos de miles de seguidores y…"
    }
  ],
  "pirqa": [
    {
      "nombre": "La Casita de Ricardo (@pachamancas.lcr)",
      "red": "Restaurante de pachamanca",
      "url": "https://www.tiktok.com/@pachamancas.lcr",
      "porQue": "EL caso de referencia directo: huarique de San Miguel (Lima) con +20 años que se viralizó en TikTok gracias a su pachamanca a la tierra. Su cuenta propia publica el…"
    },
    {
      "nombre": "Waldir Maqque (@waldir.maqque)",
      "red": "Creador de cocina andina",
      "url": "https://www.tiktok.com/@waldir.maqque",
      "porQue": "Creador cusqueño que cocina pachamanca, pachacaja y huatia en el campo con su familia. Formato ganador: proceso completo paso a paso (cavar, calentar piedras, tapar,…"
    },
    {
      "nombre": "Azucena Mondalgo (@mondalgo.azucena)",
      "red": "Creadora de vida rural andina",
      "url": "https://www.tiktok.com/@mondalgo.azucena",
      "porQue": "Tiktoker peruana de vida en el campo (+766K seguidores en su cuenta original según Trome; videos de pachamanca con cuy con 230K likes y un viral de 7M de vistas).…"
    },
    {
      "nombre": "Buenazo! (@buenazo.peru)",
      "red": "Marca de recetas peruanas",
      "url": "https://www.tiktok.com/@buenazo.peru",
      "porQue": "Marca de cocina peruana (del grupo RPP) con recetas cortas paso a paso, incluida pachamanca a la olla. Referencia de formato 'receta vertical en 60-90 segundos' con…"
    },
    {
      "nombre": "Perú Foodies (@peru.foodies)",
      "red": "Cuenta de reseñas/datazos de…",
      "url": "https://www.tiktok.com/@peru.foodies",
      "porQue": "Cuenta de recomendaciones de restaurantes en Lima; su video sobre La Casita de Ricardo demuestra el motor de tráfico real: el restaurante no necesita viralizarse solo,…"
    },
    {
      "nombre": "Gastón Acurio (@gastonacurio)",
      "red": "Chef referente de…",
      "url": "https://www.instagram.com/gastonacurio/",
      "porQue": "1M de seguidores. Referencia de formato 'historia detrás del plato': habla del productor, del origen andino, de la memoria. Para un restaurante de experiencia (no solo…"
    }
  ],
  "golden": [
    {
      "nombre": "Soul Desire Goldens (Nicole Goeckeritz)",
      "red": "CRIADORA de golden retriever…",
      "url": "https://www.tiktok.com/@soul_desire_goldens",
      "porQue": "El referente más directo para el negocio: criadora hobby de Utah cuyo video de una cachorra sentada en el bowl de agua hizo 27.9M de vistas en 2 meses (Daily Paws).…"
    },
    {
      "nombre": "Tucker Budzyn (@tuckerbudzyn)",
      "red": "Cuenta de golden más grande…",
      "url": "https://www.tiktok.com/@tuckerbudzyn",
      "porQue": "11.7M en TikTok, 4M en IG, +5M en YouTube. Formato ganador: skits cortos con 'voz interna' del perro (subtítulos como si el perro hablara), dinámica dueña-perro-cachorro…"
    },
    {
      "nombre": "A Guy and A Golden — Teddy (@aguyandagolden)",
      "red": "Dúo dueño-golden",
      "url": "https://www.tiktok.com/@aguyandagolden",
      "porQue": "17M de seguidores y +10B de vistas. Formato ganador: rutinas diarias y trucos del perro con su dueño Jonathan, clips de 15-30s sin producción, repetibles. Demuestra que…"
    },
    {
      "nombre": "Rebas Golden Life (@rebasgoldenlife)",
      "red": "Cuenta de golden + camada…",
      "url": "https://www.tiktok.com/@rebasgoldenlife",
      "porQue": "Su video 'el momento exacto en que la cachorra eligió a su familia' fue viral y cubierto por Newsweek. Formato ganador para VENTA de cachorros: el día de elección ('pick…"
    },
    {
      "nombre": "My Golden Retriever Puppies",
      "red": "Red de criadores (Ohio)",
      "url": "https://www.youtube.com/@mygoldenretrieverpuppies4347",
      "porQue": "Referencia de contenido COMERCIAL puro: un video corto por cada cachorro disponible (nombre, precio, garantía genética de 1 año, vacunas), enlazado a la web de venta. Es…"
    },
    {
      "nombre": "Cachorros Golden Retriever Perú…",
      "red": "Competidor/benchmark LOCAL…",
      "url": "https://www.instagram.com/petsgoldenretriever.pe/",
      "porQue": "Criadero peruano real con ~6.5K seguidores en IG: vende con padres importados de EE.UU., garantía y contacto por WhatsApp (+51). Es el benchmark local directo: el nivel…"
    }
  ]
};
