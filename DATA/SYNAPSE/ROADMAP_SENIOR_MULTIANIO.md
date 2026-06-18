# SYNAPSE · Roadmap a programador SENIOR full-stack (1 · 2 · 3 años)

> Investigación verificada 18-jun-2026 (panel de agentes, URLs abiertas con WebFetch). Mapea el tiempo REAL:
> **30 min/día L-V** (15' pantalla + 10' audio + 5' lectura) **+ ~2 h sábado de teclado** + domingo libre ≈ **4.5 h/semana**.
> Honesto: a este ritmo, "senior full-stack" es un horizonte de **3 años**. La pista de IA (F0–F7, ya en la app) corre en paralelo.
> Los recursos viven en `src/lib/synapseData.ts` → categorías **Backend de producción** y **Frontend & diseño web**.

## Los 3 carriles (corren a la vez, no en serie)
1. **IA / LLM** — F0–F7 ya estructurado (Anthropic Academy → Karpathy → CS336 → agentes → RLHF → interpretabilidad). Es tu diferenciador.
2. **Backend** — Python de diseño → APIs → datos → testing → deploy → system design.
3. **Frontend + diseño** — HTML/CSS/JS → React/Next → UI/UX → deploy. (Sirve además para construir las landings de AURUM.)

## AÑO 1 — Cimientos + primeras cosas en producción
- **Brújula (semana 1):** [roadmap.sh/backend](https://roadmap.sh/backend) + [roadmap.sh/frontend](https://roadmap.sh/frontend). Marca lo que ya tienes (Python, Git, SQL intro).
- **Backend (bloque pantalla):** completar el [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/) sección a sección; datos con [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html) + [CS50 SQL](https://cs50.harvard.edu/sql/); testing con [pytest](https://docs.pytest.org/en/stable/). Diseño de código con [ArjanCodes](https://arjancodes.com/) (audio en viajes) y lecturas de [MIT 6.031](https://web.mit.edu/6.031/) en los 5'.
- **Frontend (sábado de teclado):** [Google Learn CSS](https://web.dev/learn/css) (flex/grid) + [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript) (HTML/CSS + todo JavaScript). Audio de huecos = [Kevin Powell](https://www.kevinpowell.co/) + [Josh Comeau](https://www.joshwcomeau.com/). Lectura = [Laws of UX](https://lawsofux.com/) + [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development).
- **Deploy:** [Vercel getting started](https://vercel.com/docs/getting-started-with-vercel) (ya usas Vercel para VITALS).
- **🎯 Entregable Año 1:** una API FastAPI propia (p.ej. para ALLPA/Qori) con PostgreSQL + Pydantic + auth básica + suite pytest, en repo público; **3-5 landings/proyectos** maquetados y desplegados. = backend junior sólido + frontend que maqueta cualquier diseño responsive.

## AÑO 2 — De junior a mid-level + primer deploy serio
- **Hilo conductor:** [Full Stack Open](https://fullstackopen.com/en/) (Helsinki) partes 1-7 (React, estado, comunicación con backend, testing) + [Next.js Learn](https://nextjs.org/learn) (16 cap., dashboard full-stack real).
- **Deploy real:** [Docker Get Started](https://docs.docker.com/get-started/) + [The Twelve-Factor App](https://12factor.net/) → dockerizar y desplegar tu API del Año 1; [TestDriven.io](https://testdriven.io/) para TDD + CI. Criterio de framework: [Django REST](https://www.django-rest-framework.org/) (opcional).
- **Diseño aplicado:** [Refactoring UI](https://www.refactoringui.com/) + [Google UX](https://www.coursera.org/professional-certificates/google-ux-design) (concentrado) + [Learn Accessibility](https://web.dev/learn/accessibility).
- **🎯 Entregable Año 2:** tu app del Año 1 desplegada (contenedor + Postgres gestionado) con CI que corre los tests en cada push + README de arquitectura; SPAs React / apps Next.js completas con UI cuidada y accesible. = mid-level capaz de entregar un servicio de producción end-to-end. **Ya eres full-stack real** (Python+SQL detrás, React/Next delante).

## AÑO 3 — Pensamiento de SENIOR (system design + datos a escala)
- **System design (gratis):** [System Design Primer](https://github.com/donnemartin/system-design-primer) (tiene README-es) + [ByteByteGo](https://bytebytego.com/) (newsletter/YouTube) todo el año en huecos/audio.
- **Datos a escala (lectura de fondo):** [Designing Data-Intensive Applications](https://dataintensive.net/) (Kleppmann, ~$45) — 1-2 caps/mes.
- **Frontend avanzado:** cerrar Full Stack Open (TypeScript, GraphQL, CI/CD, React Native) + [CS50 Web](https://cs50.harvard.edu/web/) (visión Harvard de web, seguridad, escalabilidad). TS + testing + Lighthouse como hábito.
- **Solo si vas por entrevistas FAANG/lab:** [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview).
- **🎯 Entregable Año 3:** un documento de diseño de sistema (diagramas + trade-offs) de uno de tus negocios + tu API con caching/métricas; combinas SYNAPSE-IA (agentes/LLM) con full-stack para construir **un producto de IA con UI propia de punta a punta**. = razonas como senior, listo para entrevistas de diseño.

## Cómo consumir el material en inglés (no es problema)
- **YouTube** (ArjanCodes, ByteByteGo, Kevin Powell, freeCodeCamp): engranaje → Subtítulos → **Traducir automáticamente → Español**. Deja el audio en hueco y lees subtítulos.
- **Páginas y docs** (FastAPI, PostgreSQL, MDN, roadmap.sh, 12factor, System Design Primer): Chrome → clic derecho → **"Traducir al español"** (o [translate.google.com](https://translate.google.com/?op=websites) modo "Sitios web"). Mantiene el código intacto.
- **System Design Primer** tiene traducción oficial: `README-es.md` en el repo.
- **Libros densos** (DDIA): Kindle traduce por palabra; para capítulos, [DeepL](https://www.deepl.com/) mantiene mejor el matiz técnico que Google.
- **Escuchar texto** (12factor, MIT 6.031): función "Leer en voz alta" de Edge/Chrome tras traducir la página.
- Aprende de una vez los ~20-30 **términos técnicos en inglés** (request, fixture, endpoint, hook, deploy…): son idénticos en cualquier idioma y los usan los TOP.

## Ajustes al contenido previo (decididos por el panel)
- **SQLBolt** → degradado a "calentamiento" de 5'; el material real de datos ahora es PostgreSQL Tutorial + CS50 SQL.
- **CS50W** → se mantiene como introducción/visión Harvard de web (Año 3), no como el camino de APIs (ese es FastAPI + Full Stack Open).
- Nada se borró: los 3 carriles son aditivos sobre lo que ya existía.
