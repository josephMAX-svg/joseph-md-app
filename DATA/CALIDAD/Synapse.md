# Calidad Synapse — síntesis (17-jun-2026)

Estado del arte 2026 para llegar a nivel TOP de programador/AI engineer, consolidado de 5 investigaciones. JERARQUIA DE REFERENTES (casi todo gratis y verificado): Karpathy sigue siendo el #1 fundacional (Zero to Hero + nanochat); y desde may-2026 LITERALMENTE trabaja en Anthropic liderando pre-training de Claude — el material del programa ya es "lo que hace tu empresa-meta". Anthropic es el referente directo del objetivo: Anthropic Academy (catalogo crecio a 21 cursos: gratis, certificado, cubre API+MCP+agentes+skills+subagentes+Cowork) + repos oficiales (anthropics/courses, claude-cookbooks). Stanford CS336 "Language Modeling from Scratch" (ed. 2026) es el recurso CUMBRE para construir un LLM de verdad. Sebastian Raschka (LLMs-from-scratch + reasoning-from-scratch) da el codigo linea-a-linea. DeepLearning.AI/Andrew Ng + Hugging Face cubren AI engineering aplicado y agentes con certificado. Chip Huyen y Hamel Husain cubren produccion y evals (el tema mas subestimado). CAMINO OPTIMO validado (OSSU/teachyourselfcs): F0 fundamentos CS -> Python -> matematicas -> datos/SQL -> ML clasico -> deep learning -> LLMs from scratch -> agentes/produccion. La regla de oro: el 90% se queda pegando APIs sin fundamentos; el diferenciador elite es poder CONSTRUIR desde cero (CS336+Raschka+Karpathy) Y desplegar/evaluar en produccion (HF Agents+evals+MLOps). Tiempo realista: 8-12 meses programando ya, ~2 años desde cero a 20h/sem. NOVEDADES 2026 que el plan Synapse aun no incorpora (gaps clave): (1) Certificacion oficial Claude Certified Architect-Foundations CCA-F (12-mar-2026, 5 dominios, 99 USD) = la credencial verificable "nivel Anthropic" que falta como hito; (2) "Context engineering" es ahora disciplina propia (sucesora de "prompt engineering", dominio #5 del CCA-F) con sus 3 ensayos fundacionales de Anthropic 2025 (context engineering, long-running harnesses, agent skills) que faltan en F4; (3) memory tools/compaction de Sonnet 4.5; (4) interpretabilidad de frontera (transformer-circuits.pub: circuit tracing, attribution graphs, Breakthrough Tech 2026) para F6. Casi todo es gratis; solo libros de Raschka/Huyen y el curso de evals de Maven son pagos, todos con contraparte gratis. Material elite: casi todo en INGLES (gap si se prioriza español).

## Referentes top
- Andrej Karpathy (ex-OpenAI/Tesla, Eureka Labs; desde may-2026 lidera pre-training en ANTHROPIC) — Zero to Hero + nanochat + Deep Dive into LLMs; el referente #1 fundacional para construir LLMs desde cero
- Anthropic (Academy + repos oficiales) — la escuela del objetivo: API, MCP, agentes, skills, subagentes, Cowork; certificacion CCA-F; los ensayos de ingenieria (Building Effective Agents, context engineering, harnesses, agent skills)
- Tatsunori Hashimoto y Percy Liang (Stanford CS336) — Language Modeling from Scratch, el curso universitario cumbre 2026 para construir un LLM completo
- Sebastian Raschka — LLMs-from-scratch y reasoning-from-scratch: el codigo PyTorch linea-a-linea, estandar de oro para ENTENDER
- Andrew Ng (DeepLearning.AI, Stanford CS229) — ML Specialization + short courses de agentes/RAG; la via mas rapida a AI engineering aplicado
- Jeremy Howard (fast.ai) — Practical Deep Learning for Coders, la mejor rampa top-down para coders
- Chip Huyen — AI Engineering (libro mas leido en O'Reilly 2025) + repo aie-book de recursos curados para produccion
- Hamel Husain (+ Shreya Shankar) — los referentes de evals/LLM evaluation, el tema mas subestimado y diferenciador 2026
- Hugging Face — ecosistema de cursos gratis con certificado (LLM, Agents, Deep RL, MCP, smol course de post-training)
- Harvard CS50 (David Malan/Brian Yu) y MIT 6.S191 (Amini) — bases estructuradas de CS/AI y deep learning, re-grabadas cada año

## Recursos top (verificados)
- **Neural Networks: Zero to Hero (micrograd → makemore → GPT desde cero)** — Andrej Karpathy (intermedio, verificado)
  - https://karpathy.ai/zero-to-hero.html
  - EL curso fundacional canonico y gratis: construyes backprop, MLP, un GPT y un tokenizer BPE desde cero en Python (repo karpathy/nn-zero-to-hero). Base imprescindible para entender LLMs por dentro antes de cualquier AI engineering serio. Karpathy ahora lidera pre-training en Anthropic = la empresa-meta del plan.
- **nanochat — clon de ChatGPT full-stack en ~8.000 lineas, entrenable por ~$100** — Andrej Karpathy (avanzado, verificado)
  - https://github.com/karpathy/nanochat
  - Sucesor oficial de nanoGPT (55k+ stars, MIT, oct-2025): pipeline completo (tokenizacion, pretraining, finetuning, eval, inference, chat UI). Proyecto capstone de mayor señal para el portafolio. nanoGPT esta deprecado — usar este.
- **Anthropic Academy — cursos gratis de Claude (API, MCP, agentes, skills, subagentes, Cowork)** — Anthropic (base-avanzado, verificado)
  - https://anthropic.skilljar.com/
  - EL recurso #1 para el objetivo 'nivel Anthropic': 21 cursos verificados en vivo (el plan asume 19 — faltan 'Introduction to Claude Cowork' y 'AI Capabilities and Limitations'). Gratis (solo email) con certificado oficial. Es la prep directa del examen CCA-F.
- **Claude Certified Architect — Foundations (CCA-F): primera certificacion tecnica oficial** — Anthropic Academy (intermedio, verificado)
  - https://www.anthropic.com/learn
  - GAP CLAVE: lanzada 12-mar-2026. Examen proctored 60 preguntas, 120 min, aprobar 720/1000, 99 USD (gratis partners). 5 dominios: Agentic Architecture 27%, Claude Code 20%, Tool Design & MCP 18%, Prompt Engineering 20%, Context Management 15%. La credencial VERIFICABLE 'nivel Anthropic' que el plan no tiene — debe ser hito de F0→F4. La Academy es la prep gratuita.
- **anthropics/courses — 5 cursos oficiales (API, Prompt Eng, Real World Prompting, Evaluations, Tool Use)** — Anthropic (principiante-intermedio, verificado)
  - https://github.com/anthropics/courses
  - 5 cursos gratis MIT en Jupyter (~22k stars, mantenido). El Prompt Evaluations y Tool Use son justo lo que piden los puestos Applied AI. Complemento practico (codigo ejecutable) de la Academy.
- **anthropics/claude-cookbooks — patterns/agents (Building Effective Agents)** — Anthropic (intermedio-avanzado, verificado)
  - https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents
  - Implementaciones oficiales de los 5 patrones canonicos de agentes (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) + orquestacion multi-agente async. La fuente con mas autoridad para agentes de produccion (F4). Acompaña al ensayo 'Building Effective Agents'.
- **Effective context engineering for AI agents (ensayo Anthropic)** — Anthropic Engineering (intermedio, verificado)
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - GAP CLAVE de F4. Ensayo (29-sep-2025) que define context engineering como sucesor del prompt engineering: context rot, compaction, structured note-taking, just-in-time retrieval. Es el dominio #5 del CCA-F. ~25 min, apto para huecos/audio.
- **Stanford CS336: Language Modeling from Scratch (ed. 2025/2026)** — Tatsunori Hashimoto y Percy Liang (Stanford) (avanzado, verificado)
  - https://cs336.stanford.edu/
  - El recurso CUMBRE para construir un LLM de verdad: tokenizacion, Transformer, FlashAttention2/Triton, paralelismo, scaling laws, pipeline de datos, inferencia, post-training (SFT/RLHF/RL). Videos+slides+5 assignments en GitHub, gratis. Edicion 2026 disponible. Es el salto a elite real (F3→F6).
- **rasbt/LLMs-from-scratch — Build a LLM (From Scratch), codigo del libro de Raschka** — Sebastian Raschka (intermedio-avanzado, verificado)
  - https://github.com/rasbt/LLMs-from-scratch
  - Estandar de oro para CODIFICAR un GPT en PyTorch paso a paso sin librerias externas: base model → clasificador → chatbot, corre en laptop. Codigo 100% gratis (el libro es pago). Si nanochat es 'entrenar', esto es 'entender cada linea'. Su reasoning-from-scratch (2025) extiende a modelos de razonamiento.
- **fast.ai — Practical Deep Learning for Coders (Part 1 + Part 2)** — Jeremy Howard (fast.ai) (intermedio, verificado)
  - https://course.fast.ai/
  - Verificado en vivo, gratis. La mejor rampa top-down para coders: entrenas modelos utiles desde la leccion 1 con PyTorch+fastai+HF+Gradio; Part 2 incluye diffusion y transformers. Ideal para arrancar rapido con poco tiempo diario. Libro (fastbook) gratis online.
- **Hugging Face — AI Agents Course (smolagents, LangGraph, LlamaIndex + certificado)** — Hugging Face (principiante-intermedio, verificado)
  - https://huggingface.co/learn/agents-course/en/unit0/introduction
  - Curso estructurado gratis con ritmo semanal (3-4h/sem, encaja con los huecos diarios de Synapse), labs en HF Spaces, leaderboards y certificado. El area de mayor demanda 2026. Parte del hub gratis huggingface.co/learn (LLM, Deep RL, smol course de post-training, MCP).
- **DeepLearning.AI — Short Courses gratis (Agentes, RAG, LangGraph, LlamaIndex)** — DeepLearning.AI (Andrew Ng + partners) (intermedio, verificado)
  - https://www.deeplearning.ai/courses?types=short_course
  - Decenas de short courses (1-4h) auditables gratis: Prompt Engineering for Developers, AI Agents in LangGraph (Harrison Chase), Building Agentic RAG with LlamaIndex, Knowledge Graphs for RAG. Co-construidos con OpenAI/Anthropic/LangChain. La via mas rapida a las fases agenticas/RAG de Synapse.
- **CS50's Introduction to AI with Python (Harvard, OpenCourseWare)** — Harvard / CS50 (David Malan, Brian Yu) (principiante-intermedio, verificado)
  - https://cs50.harvard.edu/ai/
  - Verificado en vivo, gratis, 7 semanas con proyectos en Python: busqueda en grafos, knowledge representation, incertidumbre, optimizacion, ML, redes neuronales, NLP y LLMs. Base estructurada excelente para los fundamentos de CS/AI (F0-F1).
- **MIT 6.S191: Introduction to Deep Learning (edicion anual 2026)** — Alexander y Ava Amini (MIT) (intermedio, verificado)
  - https://introtodeeplearning.com/
  - La intro a deep learning mas actualizada: se re-graba y open-sourcea CADA año (ed. 2026 confirmada). Videos+slides+labs en GitHub. Buen complemento conciso a fundamentos, incluye leccion de Language Models and New Frontiers.
- **chiphuyen/aie-book — recursos del libro AI Engineering (2025)** — Chip Huyen (intermedio-avanzado, verificado)
  - https://github.com/chiphuyen/aie-book
  - Repo gratis de soporte del libro AI Engineering (el mas leido en O'Reilly): blogs tecnicos, papers y recursos curados (resources.md) para construir apps con foundation models. Cubre la capa de produccion que falta entre 'construir' y 'desplegar'.
- **Hamel Husain — LLM Evals (guia FAQ + masterclass gratis)** — Hamel Husain (intermedio-avanzado, verificado)
  - https://hamel.dev/blog/posts/evals-faq/
  - Los evals son el tema MAS subestimado y diferenciador en AI engineering 2026. El curso completo (con Shreya Shankar) es pago en Maven, pero esta guia exhaustiva + masterclass de 50 min son GRATIS y de altisimo nivel practico. Cierra la capa de evaluacion/observabilidad.
- **MCP — tutorial oficial 'Build an MCP Server' + servers + python-sdk** — Anthropic / Model Context Protocol (intermedio, verificado)
  - https://modelcontextprotocol.io/docs/develop/build-server
  - Tutorial end-to-end (tools get_alerts/get_forecast → Claude Desktop) + repos oficiales modelcontextprotocol/servers (forkear) y /python-sdk. Construir y publicar un MCP server propio es uno de los proyectos de portafolio de mayor señal en 2026 (dominio del CCA-F).
- **PortSwigger Web Security Academy — Web LLM Attacks (labs) + OWASP LLM Top 10** — PortSwigger (intermedio, verificado)
  - https://portswigger.net/web-security/llm-attacks
  - 4 labs interactivos GRATIS con LLM real (excessive agency, API vulns, insecure output handling, indirect prompt injection), sin registro. La mejor entrada practica a seguridad de IA (F5), anclada en el marco OWASP Top 10 for LLM Applications 2025 (genai.owasp.org). Complementa con el juego Gandalf de Lakera.
- **DataTalksClub/llm-zoomcamp — curso gratis 10 semanas (RAG, agents, eval, monitoring)** — DataTalksClub (intermedio, verificado)
  - https://github.com/DataTalksClub/llm-zoomcamp
  - Hilo conductor curricular y fuente de proyectos de portafolio: 10 semanas gratis cubriendo RAG, vector search, embeddings, agentes, function calling, evaluacion y monitoring con proyecto final. Une las pistas anteriores en un sistema desplegable y publico en GitHub.

## Acciones
- [ ] ACTUALIZAR F0: corregir 'Anthropic Academy 19 cursos' → 21 cursos (synapseData.ts, material 'academy' linea 44) y añadir los dos cursos nuevos verificados: 'Introduction to Claude Cowork' (https://anthropic.skilljar.com/introduction-to-claude-cowork) y 'AI Capabilities and Limitations'.
- [ ] AÑADIR HITO DE CERTIFICACION (gap #1 'nivel Anthropic'): incluir el examen Claude Certified Architect–Foundations (CCA-F, 12-mar-2026, 5 dominios, 99 USD) como entregable/credencial explicito al cerrar F0→F4. La Academy completa es la prep gratuita (~15-20h). Es la prueba verificable que hoy falta en el plan.
- [ ] INCORPORAR CONTEXT ENGINEERING COMO TEMA PROPIO en F4 (es el dominio #5 del CCA-F y el termino dominante 2026, no solo flags /compact /clear): añadir los 3 ensayos fundacionales de Anthropic 2025 — 'Effective context engineering for AI agents' (29-sep), 'Effective harnesses for long-running agents' (26-nov) y 'Equipping agents for the real world with Agent Skills' (18-dic) — al mismo nivel que 'Building Effective Agents', que ya esta incluido.
- [ ] AÑADIR MEMORY TOOLS / COMPACTION de Sonnet 4.5 (file-based memory, context editing +29% / +memory 39%) + el claude-cookbook de tool-use/context engineering al bloque de agentes de F4 — gap concreto vs el stack de agentes 2026.
- [ ] ELEVAR F3→F6 CON CONSTRUCCION REAL DE LLM: añadir Stanford CS336 'Language Modeling from Scratch' (ed. 2026, cs336.stanford.edu) como columna avanzada y rasbt/LLMs-from-scratch como codigo linea-a-linea, manteniendo nanochat como capstone. Es el diferenciador elite (construir desde cero) que separa del 90% que solo pega APIs.
- [ ] REFORZAR F6 (alignment/interpretabilidad) con la frontera 2026: añadir Transformer Circuits Thread (transformer-circuits.pub — circuit tracing, attribution graphs, cross-layer transcoders, nombrado Breakthrough Tech 2026) junto al material existente de ARENA/RLHF Book.
- [ ] AÑADIR CAPA DE EVALS Y PRODUCCION (hoy ausente como tema): guia de evals de Hamel Husain (hamel.dev/blog/posts/evals-faq) + repo de Chip Huyen (chiphuyen/aie-book) + LLM Zoomcamp (DataTalksClub) como columna de F4/F5 para cerrar 'construir → evaluar → desplegar/monitorear', que es la señal mas fuerte de portafolio.
- [ ] ACTUALIZAR LA NARRATIVA/'POR QUE' del programa: Karpathy (base de F0/F3: Intro LLMs, Deep Dive, Zero to Hero, nanochat) se unio a Anthropic en may-2026 para liderar pre-training de Claude — convierte su material en 'lo que hoy hace tu empresa-meta'. Verificar en fuente primaria antes de afirmarlo como hecho en la app (la fuente actual es secundaria).
- [ ] VERIFICAR URLs FRAGILES antes de fijarlas en la app: el ID del video Karpathy 'Deep Dive into LLMs like ChatGPT' (watch?v=7xTGNNLPyMI ya esta en synapseData.ts pero no se confirmo por fetch — verificar o apuntar a youtube.com/AndrejKarpathy), la ruta exacta de OWASP LLM Top 10 (genai.owasp.org reorganiza), y la pagina del MCP Course de HF (no aparecio en el ultimo fetch de huggingface.co/learn).
- [ ] CONFIRMAR ANTES DE INVERTIR TIEMPO los repos marcados 'incierto' (no verificados por fetch): pguso/ai-agents-from-scratch y confident-ai/deepteam — validar estrellas/actividad/URL exacta antes de incluirlos como recursos del plan.
- [ ] DECISION DE IDIOMA: casi todo el material elite verificado esta en INGLES (gap real). Si Synapse necesita contenido nativo en español para fases avanzadas (LLMs from scratch, agentes), lanzar una investigacion dedicada — los subtitulos auto-traducidos de Karpathy/fast.ai/HF cubren parcialmente, pero no hay equivalente elite gratis en español confirmado.
- [ ] NO TOCAR (confirmado vigente): 'Building Effective Agents' sigue siendo el ensayo fundacional (complementado, no reemplazado); nanochat es el capstone correcto; la advertencia de que LLM101n aun no existe es correcta; Fellows Program, RLHF Book, ARENA, OWASP LLM Top 10, PortSwigger, CS229/CS224N y 3Blue1Brown siguen vigentes.
