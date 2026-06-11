/**
 * SYNAPSE — formación élite en IA (Mind · AI-engineered).
 * Médico → especialista en IA nivel Anthropic: Python, datos, deep learning,
 * agentes/workflows, ciberseguridad, post-training.
 *
 * TODOS los materiales fueron verificados con WebFetch/oEmbed (10-jun-2026) por un
 * workflow de 13 agentes (6 frentes + verificación adversarial + crítico de
 * completitud). Fuente completa: DATA/SYNAPSE/_raw_findings.json (85 materiales)
 * y DATA/SYNAPSE/materiales-verificados.md. Cero URLs inventadas.
 *
 * El motor día-a-día (misiones estilo ENCAPS/Business + Calendar 30 min) lo
 * construye el chat SYNAPSE: DATA/SYNAPSE/PROMPT_CHAT_SYNAPSE.md.
 */

export type SynapseNivel = 'base' | 'intermedio' | 'avanzado';

export type SynapseMaterial = {
  nombre: string;
  referente: string;
  credencial: string;
  tipo: 'curso' | 'libro' | 'video' | 'playlist' | 'podcast' | 'docs' | 'tutorial' | 'beca';
  url: string;
  gratis: string; // 'gratis' | precio | 'parcial'
  duracion?: string;
  nivel: SynapseNivel;
  porQue: string;
  audio?: boolean; // sirve para espacios muertos (audio / lectura / vídeo corto móvil)
};

export type SynapseFase = {
  id: string;
  fase: string;
  titulo: string;
  desc: string;
  duracion: string;
  entregable: string;
  estado: 'activa' | 'pendiente' | 'meta';
  materiales: SynapseMaterial[];
};

// ─── Materiales (definidos una vez, referenciados por fase y biblioteca) ───
const M = {
  // F0 — La Escuela de Anthropic
  academy: { nombre: 'Anthropic Academy (portal oficial)', referente: 'Anthropic', credencial: 'La "escuela de Anthropic" — cursos oficiales con certificado', tipo: 'docs', url: 'https://www.anthropic.com/learn', gratis: 'gratis', duracion: '19 cursos en Skilljar', nivel: 'base', porQue: 'Punto de entrada único a la licenciatura de Anthropic; emite certificados', audio: true },
  claude101: { nombre: 'Claude 101 (+ Claude Code 101 + Platform 101)', referente: 'Anthropic Academy', credencial: 'Cursos oficiales de Anthropic con certificado', tipo: 'curso', url: 'https://anthropic.skilljar.com/claude-101', gratis: 'gratis', duracion: '13 lecciones · 4 módulos', nivel: 'base', porQue: 'El arranque oficial: orientación a Claude, Claude Code y la plataforma', audio: true },
  aiFluency: { nombre: 'AI Fluency: Framework & Foundations', referente: 'Anthropic Academy', credencial: 'Marco oficial 4D (Delegation·Description·Discernment·Diligence)', tipo: 'curso', url: 'https://anthropic.skilljar.com/ai-fluency-framework-foundations', gratis: 'gratis', duracion: 'módulos cortos + examen', nivel: 'base', porQue: 'Cómo Anthropic piensa la colaboración humano-IA; vocabulario interno', audio: true },
  effectiveAgents: { nombre: 'Building Effective AI Agents (ensayo)', referente: 'Schluntz & Zhang · Anthropic', credencial: 'El ensayo fundacional de agentes citado en toda la industria', tipo: 'docs', url: 'https://www.anthropic.com/engineering/building-effective-agents', gratis: 'gratis', duracion: '~25 min lectura', nivel: 'intermedio', porQue: 'Los 5 patrones de workflows vs agents — vocabulario obligatorio en entrevistas', audio: true },
  karpathyIntro: { nombre: '[1hr Talk] Intro to Large Language Models', referente: 'Andrej Karpathy', credencial: 'Stanford PhD · fundador de OpenAI · ex-director IA Tesla', tipo: 'video', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', gratis: 'gratis', duracion: '1 h', nivel: 'base', porQue: 'La mejor panorámica de qué es un LLM, sin código ni matemática', audio: true },
  karpathyDeep: { nombre: 'Deep Dive into LLMs like ChatGPT', referente: 'Andrej Karpathy', credencial: 'Stanford PhD · fundador de OpenAI · ex-Tesla', tipo: 'video', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', gratis: 'gratis', duracion: '3.5 h (≈14 huecos)', nivel: 'base', porQue: 'Pretraining, fine-tuning, RLHF y alucinaciones — cómo se construye un Claude', audio: true },
  nn3b1b: { nombre: 'Neural networks (incluye transformers/GPT)', referente: '3Blue1Brown · Grant Sanderson', credencial: 'Matemático de Stanford, el divulgador más respetado', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', gratis: 'gratis', duracion: '8 vídeos · ~2.5 h', nivel: 'base', porQue: 'La mejor intuición VISUAL de redes, backprop y transformers', audio: true },

  // F1 — Código
  cs50p: { nombre: 'CS50P: Introduction to Programming with Python', referente: 'David J. Malan · Harvard', credencial: 'El curso introductorio más famoso del mundo', tipo: 'curso', url: 'https://cs50.harvard.edu/python/', gratis: 'gratis', duracion: '10 semanas + proyecto', nivel: 'base', porQue: 'Python con rigor Harvard — prerrequisito directo de todo lo demás', audio: true },
  automate: { nombre: 'Automate the Boring Stuff with Python (3ª ed.)', referente: 'Al Sweigart', credencial: 'Fellow de la Python Software Foundation · +500k copias', tipo: 'libro', url: 'https://automatetheboringstuff.com/', gratis: 'gratis online', duracion: '25 capítulos', nivel: 'base', porQue: 'Automatización real desde el capítulo 1 — Python práctico desde cero', audio: true },
  pyTutorial: { nombre: 'The Python Tutorial (docs oficiales)', referente: 'Python Software Foundation', credencial: 'La referencia canónica del lenguaje', tipo: 'docs', url: 'https://docs.python.org/3/tutorial/', gratis: 'gratis', duracion: '16 secciones', nivel: 'base', porQue: 'La misma fuente que usa cualquier ingeniero serio', audio: true },
  proGit: { nombre: 'Pro Git (2ª ed.)', referente: 'Scott Chacon', credencial: 'Cofundador de GitHub', tipo: 'libro', url: 'https://git-scm.com/book/en/v2', gratis: 'gratis (CC)', duracion: '10 capítulos', nivel: 'base', porQue: 'Git/GitHub es lo primero que delata a un no-ingeniero — hueco crítico detectado', audio: true },
  missingSemester: { nombre: 'The Missing Semester of Your CS Education', referente: 'MIT CSAIL', credencial: 'Curso oficial del MIT (shell, Git, debugging)', tipo: 'curso', url: 'https://missing.csail.mit.edu/', gratis: 'gratis', duracion: '11 lecciones', nivel: 'base', porQue: 'Vivir en la terminal: el pegamento de Claude Code, agentes y todo el tooling', audio: true },
  cs50x: { nombre: 'CS50x: Introduction to Computer Science', referente: 'David J. Malan · Harvard', credencial: 'El curso más tomado de la historia de Harvard', tipo: 'curso', url: 'https://cs50.harvard.edu/x/', gratis: 'gratis', duracion: '11 semanas', nivel: 'base', porQue: 'Pensamiento computacional desde cero absoluto (opcional si haces CS50P)', audio: true },

  // F2 — Datos
  kaggle: { nombre: 'Kaggle Learn (Python, pandas, Intro ML)', referente: 'Kaggle · Google', credencial: 'La plataforma de data science de Google', tipo: 'tutorial', url: 'https://www.kaggle.com/learn', gratis: 'gratis', duracion: '~4 h por micro-curso', nivel: 'base', porQue: 'Lecciones de 15-20 min — encaje exacto con tus 30 min/día', audio: true },
  mckinney: { nombre: 'Python for Data Analysis (3ª ed., Open Access)', referente: 'Wes McKinney', credencial: 'CREADOR de pandas', tipo: 'libro', url: 'https://wesmckinney.com/book/', gratis: 'gratis online', duracion: '13 capítulos', nivel: 'intermedio', porQue: 'Aprender pandas del creador de pandas', audio: true },
  vanderplas: { nombre: 'Python Data Science Handbook', referente: 'Jake VanderPlas', credencial: 'Google Research · contribuidor scikit-learn', tipo: 'libro', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', gratis: 'gratis online', duracion: 'NumPy→pandas→Matplotlib→sklearn', nivel: 'intermedio', porQue: 'El stack científico completo en un solo sitio gratis', audio: true },
  sqlbolt: { nombre: 'SQLBolt — SQL interactivo', referente: 'SQLBolt', credencial: 'El tutorial interactivo canónico de SQL', tipo: 'tutorial', url: 'https://sqlbolt.com/', gratis: 'gratis', duracion: '18 lecciones · 5-8 h', nivel: 'base', porQue: 'Micro-lecciones de 5-10 min que corren en el navegador del móvil', audio: true },
  widom: { nombre: 'Databases: Relational Databases and SQL', referente: 'Jennifer Widom · Stanford', credencial: 'Decana de ingeniería de Stanford, autoridad mundial en BD', tipo: 'curso', url: 'https://www.edx.org/learn/relational-databases/stanford-university-databases-relational-databases-and-sql', gratis: 'audit gratis', duracion: '8-10 h', nivel: 'intermedio', porQue: 'SQL con pedigrí Stanford para consolidar SQLBolt', audio: true },
  stat110: { nombre: 'Introduction to Probability (Stat 110)', referente: 'Joe Blitzstein · Harvard', credencial: 'Professor of the Practice in Statistics, Harvard', tipo: 'libro', url: 'https://probabilitybook.net', gratis: 'gratis (PDF oficial + YouTube)', duracion: '~35 lecciones', nivel: 'intermedio', porQue: 'Todo el ML es probabilidad — hueco crítico detectado por el auditor', audio: true },

  // F3 — Deep learning
  algebra3b1b: { nombre: 'Essence of linear algebra', referente: '3Blue1Brown', credencial: 'Matemático de Stanford', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', gratis: 'gratis', duracion: '16 vídeos · ~3 h', nivel: 'base', porQue: 'La matemática mínima para entender redes — intuición geométrica', audio: true },
  calculo3b1b: { nombre: 'Essence of calculus', referente: '3Blue1Brown', credencial: 'Matemático de Stanford', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', gratis: 'gratis', duracion: '12 vídeos · ~3 h', nivel: 'base', porQue: 'Derivadas y gradientes — el corazón de backpropagation', audio: true },
  mit6s191: { nombre: 'MIT 6.S191: Introduction to Deep Learning', referente: 'Alexander Amini · MIT', credencial: 'Curso oficial del MIT, edición 2026 en curso', tipo: 'curso', url: 'https://introtodeeplearning.com/', gratis: 'gratis (open source)', duracion: '9 lectures + 3 labs', nivel: 'intermedio', porQue: 'El bootcamp de DL más condensado y actualizado con sello MIT' },
  fastai: { nombre: 'Practical Deep Learning for Coders', referente: 'Jeremy Howard · fast.ai', credencial: 'Fundador fast.ai/Answer.AI · ex-presidente de Kaggle', tipo: 'curso', url: 'https://course.fast.ai/', gratis: 'gratis', duracion: '9 lecciones · ~90 min', nivel: 'intermedio', porQue: 'Top-down: entrenas modelos reales desde la lección 1' },
  zeroToHero: { nombre: 'Neural Networks: Zero to Hero', referente: 'Andrej Karpathy', credencial: 'Fundador de OpenAI · ex-Tesla', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ', gratis: 'gratis', duracion: '~10 lecciones · 18-20 h', nivel: 'intermedio', porQue: 'EL curso canónico: construyes un GPT desde cero en código (requiere teclado)' },
  cs50ai: { nombre: 'CS50 AI: Artificial Intelligence with Python', referente: 'Brian Yu & Malan · Harvard', credencial: 'Profesores de Harvard', tipo: 'curso', url: 'https://cs50.harvard.edu/ai/', gratis: 'gratis', duracion: '7 semanas', nivel: 'intermedio', porQue: 'Puente perfecto entre CS50P y deep learning, con proyectos guiados', audio: true },
  nanochat: { nombre: 'nanochat (capstone de Eureka Labs)', referente: 'Andrej Karpathy', credencial: 'Sucesor de nanoGPT (~55k stars)', tipo: 'tutorial', url: 'https://github.com/karpathy/nanochat', gratis: 'gratis (entrenar ~$48 opcional)', duracion: 'pipeline completo', nivel: 'avanzado', porQue: 'Un clon de ChatGPT full-stack mínimo y hackeable — proyecto final de fase' },

  // F4 — Agentes & LLM engineering (el corazón)
  claudeApi: { nombre: 'Building with the Claude API', referente: 'Anthropic Academy', credencial: 'El curso TRONCAL de la academia para developers', tipo: 'curso', url: 'https://anthropic.skilljar.com/claude-with-the-anthropic-api', gratis: 'gratis', duracion: '8 secciones (API, evals, tools, RAG, MCP)', nivel: 'intermedio', porQue: 'Cubre exactamente los skills que los puestos de Anthropic listan', audio: true },
  promptTutorial: { nombre: 'Prompt Engineering Interactive Tutorial', referente: 'Anthropic (GitHub oficial)', credencial: 'Repo oficial · 36.3k estrellas', tipo: 'tutorial', url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial', gratis: 'gratis (tokens aparte)', duracion: '9 capítulos', nivel: 'base', porQue: 'El estándar de oro de prompting según la propia Anthropic', audio: true },
  anthropicCourses: { nombre: 'anthropics/courses (API, Prompt Eng, Evals, Tool Use)', referente: 'Anthropic (GitHub oficial)', credencial: 'Repo educativo oficial · 21.8k estrellas', tipo: 'tutorial', url: 'https://github.com/anthropics/courses', gratis: 'gratis (tokens aparte)', duracion: '5 cursos en notebooks', nivel: 'intermedio', porQue: '"Prompt Evaluations" es ORO: evals aparece en casi todos los puestos de Anthropic' },
  mcpIntro: { nombre: 'Introduction to Model Context Protocol', referente: 'Anthropic Academy', credencial: 'Curso oficial de la creadora del estándar MCP', tipo: 'curso', url: 'https://anthropic.skilljar.com/introduction-to-model-context-protocol', gratis: 'gratis', duracion: '13 lecciones', nivel: 'intermedio', porQue: 'MCP aparece textualmente en los requisitos de los puestos Applied AI', audio: true },
  mcpAdvanced: { nombre: 'MCP: Advanced Topics', referente: 'Anthropic Academy', credencial: 'Curso oficial de Anthropic', tipo: 'curso', url: 'https://anthropic.skilljar.com/model-context-protocol-advanced-topics', gratis: 'gratis', duracion: '14 lecciones', nivel: 'avanzado', porQue: 'Sampling, transports, producción — diferencia a un candidato técnico' },
  claudeCodeAction: { nombre: 'Claude Code in Action', referente: 'Anthropic Academy', credencial: 'Curso oficial destacado en anthropic.com/learn', tipo: 'curso', url: 'https://anthropic.skilljar.com/claude-code-in-action', gratis: 'gratis', duracion: '~20 lecciones', nivel: 'intermedio', porQue: 'Cómo está construido un agente de código real (el de Anthropic)', audio: true },
  agentSkills: { nombre: 'Intro to agent skills + Intro to subagents', referente: 'Anthropic Academy', credencial: 'Cursos oficiales de las primitivas más nuevas', tipo: 'curso', url: 'https://anthropic.skilljar.com/introduction-to-agent-skills', gratis: 'gratis', duracion: '6 + 4 módulos', nivel: 'avanzado', porQue: 'Skills y subagentes: las piezas más recientes del stack de agentes' },
  agentSdk: { nombre: 'Claude Agent SDK (documentación oficial)', referente: 'Anthropic', credencial: 'Claude Code como librería (Python/TS)', tipo: 'docs', url: 'https://code.claude.com/docs/en/agent-sdk/overview', gratis: 'gratis (uso consume API)', duracion: 'overview + hooks, subagents, MCP', nivel: 'avanzado', porQue: 'El proyecto-portfolio nivel-Anthropic se construye con esto', audio: true },
  evalsDocs: { nombre: 'Define success criteria & build evals (Claude Docs)', referente: 'Anthropic (docs oficiales)', credencial: 'La guía de referencia de evaluaciones', tipo: 'docs', url: 'https://platform.claude.com/docs/en/docs/test-and-evaluate/develop-tests', gratis: 'gratis', duracion: '~30 min + código', nivel: 'intermedio', porQue: 'La habilidad que separa amateur de ingeniero LLM', audio: true },
  hfAgents: { nombre: 'Hugging Face Agents Course', referente: 'Hugging Face', credencial: 'La plataforma central del open-source en IA', tipo: 'curso', url: 'https://huggingface.co/learn/agents-course/unit0/introduction', gratis: 'gratis (2 certificados)', duracion: '5 unidades + 3 bonus', nivel: 'base', porQue: 'El curso gratuito de agentes más completo: smolagents, LlamaIndex, LangGraph, evals' },
  hfLlm: { nombre: 'Hugging Face LLM Course', referente: 'Hugging Face', credencial: 'Creadores de la librería Transformers', tipo: 'curso', url: 'https://huggingface.co/learn/llm-course/chapter1/1', gratis: 'gratis', duracion: '12 capítulos', nivel: 'base', porQue: 'El "por qué" detrás de los agentes: transformers, tokenizers, fine-tuning' },
  dlaiMcp: { nombre: 'MCP: Build Rich-Context AI Apps with Anthropic', referente: 'Elie Schoppik (Anthropic) × DeepLearning.AI', credencial: 'Head of Technical Education de Anthropic en la plataforma de Andrew Ng', tipo: 'curso', url: 'https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/', gratis: 'gratis (beta)', duracion: '1 h 38 min', nivel: 'intermedio', porQue: 'MCP enseñado por Anthropic en vídeos de ~10 min — perfecto para huecos', audio: true },
  dlaiComputerUse: { nombre: 'Building toward Computer Use with Anthropic', referente: 'Colt Steele (Anthropic) × DeepLearning.AI', credencial: 'Head of Curriculum de Anthropic', tipo: 'curso', url: 'https://www.deeplearning.ai/short-courses/building-toward-computer-use-with-anthropic/', gratis: 'gratis (beta)', duracion: '1 h 37 min', nivel: 'base', porQue: 'La rampa oficial: prompting → tool use → caching → computer use', audio: true },
  dlaiClaudeCode: { nombre: 'Claude Code: A Highly Agentic Coding Assistant', referente: 'Anthropic × DeepLearning.AI', credencial: 'Curso oficial conjunto', tipo: 'curso', url: 'https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/', gratis: 'gratis (beta)', duracion: '1 h 50 min', nivel: 'intermedio', porQue: 'Contexto, MCP servers, git worktrees, sesiones paralelas en producción', audio: true },
  dlaiLanggraph: { nombre: 'AI Agents in LangGraph', referente: 'Harrison Chase (CEO LangChain) × DeepLearning.AI', credencial: 'El creador de la herramienta', tipo: 'curso', url: 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/', gratis: 'gratis (beta)', duracion: '1 h 32 min', nivel: 'intermedio', porQue: 'Agente desde cero en Python y luego con LangGraph, por su creador', audio: true },
  langchainAcademy: { nombre: 'LangChain Academy: Intro to LangGraph', referente: 'LangChain', credencial: 'Academia oficial', tipo: 'curso', url: 'https://academy.langchain.com/courses/intro-to-langgraph', gratis: 'gratis', duracion: '55 lecciones · ~6 h', nivel: 'intermedio', porQue: 'Estado, memoria, human-in-the-loop, sub-grafos y despliegue de agentes' },
  n8nLevelOne: { nombre: 'n8n Course: Level One', referente: 'n8n (docs oficiales)', credencial: 'Curso oficial del equipo de n8n', tipo: 'tutorial', url: 'https://docs.n8n.io/courses/level-one/', gratis: 'gratis', duracion: '7 capítulos', nivel: 'base', porQue: 'Sistematiza lo que YA haces con el motor APEX', audio: true },
  n8nAdvancedAi: { nombre: 'n8n Advanced AI (agents + LangChain en n8n)', referente: 'n8n (docs oficiales)', credencial: 'Docs oficiales sección Advanced AI', tipo: 'docs', url: 'https://docs.n8n.io/advanced-ai/', gratis: 'gratis', duracion: 'referencia + tutoriales', nivel: 'intermedio', porQue: 'Conecta el motor APEX con agentes, vector stores, memoria y RAG' },
  openaiCookbook: { nombre: 'OpenAI Cookbook', referente: 'OpenAI (oficial)', credencial: 'Repo oficial · ~74k estrellas', tipo: 'docs', url: 'https://github.com/openai/openai-cookbook', gratis: 'gratis (tokens aparte)', duracion: 'cientos de notebooks', nivel: 'intermedio', porQue: 'Recetas de producción: agentes, evals, guardrails, tool use' },
  openaiAgentsGuide: { nombre: 'A Practical Guide to Building Agents (PDF)', referente: 'OpenAI (oficial)', credencial: 'Guía corporativa oficial', tipo: 'docs', url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf', gratis: 'gratis', duracion: '34 páginas', nivel: 'base', porQue: 'Orquestación single/multi-agente y guardrails — el complemento al ensayo de Anthropic', audio: true },
  aiEngineering: { nombre: 'AI Engineering (libro)', referente: 'Chip Huyen', credencial: 'Stanford (CS329S) · ex-NVIDIA/Snorkel/Netflix', tipo: 'libro', url: 'https://huyenchip.com/books/', gratis: '~$40-55 (audiolibro Audible)', duracion: '~500 págs · 10 caps', nivel: 'intermedio', porQue: 'EL libro de referencia de apps con LLMs: evals, RAG, agentes, inferencia', audio: true },
  raschkaLlm: { nombre: 'Build a Large Language Model (From Scratch)', referente: 'Sebastian Raschka', credencial: 'Ex-profesor UW-Madison · Lightning AI', tipo: 'libro', url: 'https://www.manning.com/books/build-a-large-language-model-from-scratch', gratis: '~$35 (código gratis en GitHub)', duracion: '7 capítulos + notebooks', nivel: 'avanzado', porQue: 'Construyes un GPT completo: entiendes el LLM por dentro, no solo lo consumes' },
  aheadOfAi: { nombre: 'Ahead of AI (Substack)', referente: 'Sebastian Raschka', credencial: '194k+ suscriptores investigadores', tipo: 'podcast', url: 'https://magazine.sebastianraschka.com/', gratis: 'parcial', duracion: '1-2 artículos/mes', nivel: 'intermedio', porQue: 'Investigación LLM al día, explicada por un educador de élite', audio: true },

  // F5 — Ciberseguridad
  owaspTop10: { nombre: 'OWASP Top 10 (Web Application Security)', referente: 'OWASP Foundation', credencial: 'El consenso estándar de la industria', tipo: 'docs', url: 'https://owasp.org/www-project-top-ten/', gratis: 'gratis', duracion: '2-4 h lectura', nivel: 'base', porQue: 'El vocabulario común de toda la ciberseguridad de aplicaciones', audio: true },
  owaspLlm: { nombre: 'OWASP Top 10 for LLM Applications', referente: 'OWASP Gen AI Security Project', credencial: 'El marco canónico de riesgos de LLMs', tipo: 'docs', url: 'https://genai.owasp.org/llm-top-10/', gratis: 'gratis (también en español)', duracion: '2-3 h lectura', nivel: 'intermedio', porQue: 'LA pieza clave del perfil ciberseguridad+IA: prompt injection, excessive agency…', audio: true },
  portswigger: { nombre: 'Web Security Academy', referente: 'PortSwigger', credencial: 'Creadores de Burp Suite', tipo: 'tutorial', url: 'https://portswigger.net/web-security', gratis: 'gratis 100%', duracion: '30+ temas · 100-200 h', nivel: 'base', porQue: 'El estándar de facto de seguridad web práctica desde cero' },
  webLlmAttacks: { nombre: 'Web LLM attacks (Web Security Academy)', referente: 'PortSwigger', credencial: 'Tema oficial de la Academy', tipo: 'tutorial', url: 'https://portswigger.net/web-security/llm-attacks', gratis: 'gratis', duracion: 'teoría + labs', nivel: 'intermedio', porQue: 'Puente directo: atacar LLMs integrados en aplicaciones reales', audio: true },
  willisonPi: { nombre: 'Serie "Prompt injection" (2022-2025)', referente: 'Simon Willison', credencial: 'Co-creador de Django; quien acuñó el término', tipo: 'playlist', url: 'https://simonwillison.net/series/prompt-injection/', gratis: 'gratis', duracion: '~20 artículos de 10-20 min', nivel: 'intermedio', porQue: 'La crónica de referencia de la vulnerabilidad #1 de los LLMs', audio: true },
  lethalTrifecta: { nombre: 'The lethal trifecta for AI agents', referente: 'Simon Willison', credencial: 'El artículo más citado sobre seguridad de agentes', tipo: 'docs', url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/', gratis: 'gratis', duracion: '15 min', nivel: 'intermedio', porQue: 'El marco mental: datos privados + contenido no confiable + comunicación externa', audio: true },
  cs253: { nombre: 'Stanford CS253: Web Security (curso completo)', referente: 'Feross Aboukhadijeh · Stanford', credencial: 'Instructor de Stanford, fundador de Socket', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLMF2PpA06Sb26oYT-dfNOt3Y4wwoLAho0', gratis: 'gratis', duracion: '~20 lecciones · ~80 min', nivel: 'intermedio', porQue: 'El curso universitario de referencia en seguridad web — funciona casi como podcast', audio: true },
  tryhackme: { nombre: 'TryHackMe: Pre Security + Jr Penetration Tester', referente: 'TryHackMe', credencial: 'Plataforma líder (3M+ usuarios)', tipo: 'tutorial', url: 'https://tryhackme.com/paths', gratis: 'parcial ($16.99/mes premium)', duracion: '~40 h + ~50-60 h', nivel: 'base', porQue: 'La rampa de entrada más guiada: redes, Linux, primeros ataques' },
  htbAiRedTeam: { nombre: 'HTB Academy: AI Red Teamer (con Google)', referente: 'Hack The Box + Google', credencial: 'Alineado con el Secure AI Framework de Google', tipo: 'curso', url: 'https://academy.hackthebox.com/path/preview/ai-red-teamer', gratis: 'parcial', duracion: '12 módulos · 230 secciones', nivel: 'avanzado', porQue: 'La única ruta estructurada de red teaming de IA hecha con un gigante' },
  manyShotJb: { nombre: 'Many-shot jailbreaking (research)', referente: 'Anthropic', credencial: 'Investigación oficial del equipo de seguridad', tipo: 'docs', url: 'https://www.anthropic.com/research/many-shot-jailbreaking', gratis: 'gratis', duracion: '15-20 min', nivel: 'intermedio', porQue: 'Cómo se rompe un LLM con contexto largo, por quien construye los modelos', audio: true },
  constClassifiers: { nombre: 'Constitutional Classifiers (research)', referente: 'Anthropic', credencial: 'Investigación oficial (feb-2025)', tipo: 'docs', url: 'https://www.anthropic.com/research/constitutional-classifiers', gratis: 'gratis', duracion: '15-20 min', nivel: 'avanzado', porQue: 'El estado del arte en DEFENSA de LLMs — la otra mitad del perfil', audio: true },
  rsp: { nombre: 'Responsible Scaling Policy (ASL levels)', referente: 'Anthropic', credencial: 'El marco de gobernanza de riesgos más citado', tipo: 'docs', url: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy', gratis: 'gratis', duracion: '15 min', nivel: 'intermedio', porQue: 'Los AI Safety Levels son lenguaje obligatorio a nivel estratégico', audio: true },

  // F6 — Nivel Fellows
  rlhfBook: { nombre: 'RLHF Book (post-training de LLMs)', referente: 'Nathan Lambert · Allen Institute for AI', credencial: 'Referencia mundial en post-training (ex-HuggingFace)', tipo: 'libro', url: 'https://rlhfbook.com/', gratis: 'gratis online', duracion: 'instruction tuning, reward models, DPO/PPO', nivel: 'avanzado', porQue: 'Anthropic existe gracias al post-training — el vocabulario diario del Fellows', audio: true },
  arena: { nombre: 'ARENA 3.0 (Alignment Research Engineer Accelerator)', referente: 'Callum McDougall → Google DeepMind', credencial: 'EL material con el que la comunidad se prepara para MATS/Fellows', tipo: 'tutorial', url: 'https://github.com/callummcdougall/ARENA_3.0', gratis: 'gratis (open source)', duracion: '4 capítulos: PyTorch, mech interp, RL, evals', nivel: 'avanzado', porQue: 'Prep directa del Fellows Program: transformers desde cero + interpretabilidad' },
  fsdl: { nombre: 'Full Stack Deep Learning (Course 2022)', referente: 'Frye, Karayev, Tobin · UC Berkeley', credencial: 'El curso de MLOps nacido en Berkeley', tipo: 'curso', url: 'https://fullstackdeeplearning.com/course/2022/', gratis: 'gratis', duracion: '9 lectures + labs', nivel: 'avanzado', porQue: 'Desplegar y mantener en producción, no solo entrenar en un notebook' },
  mit6006: { nombre: 'MIT 6.006: Introduction to Algorithms', referente: 'Demaine, Ku, Solomon · MIT', credencial: 'MIT OpenCourseWare oficial', tipo: 'curso', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', gratis: 'gratis', duracion: 'vídeos + psets con soluciones', nivel: 'avanzado', porQue: 'Las entrevistas de los labs incluyen coding screens con DSA' },
  cs50w: { nombre: 'CS50W: Web Programming with Python & JavaScript', referente: 'Brian Yu & Malan · Harvard', credencial: 'Continuación oficial de CS50x', tipo: 'curso', url: 'https://cs50.harvard.edu/web/', gratis: 'gratis', duracion: 'Django, React, SQL, escalabilidad', nivel: 'intermedio', porQue: 'Todo producto de IA real es una app web alrededor de un modelo' },
  cs229: { nombre: 'Stanford CS229: Machine Learning (Andrew Ng)', referente: 'Andrew Ng · Stanford', credencial: 'EL curso canónico de ML', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU', gratis: 'gratis', duracion: '20 lectures · ~26 h', nivel: 'avanzado', porQue: 'La teoría matemática que Anthropic da por sentada en entrevistas' },
  cs224n: { nombre: 'Stanford CS224N: NLP with Deep Learning', referente: 'Christopher Manning · Stanford', credencial: 'Director del Stanford AI Lab', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ', gratis: 'gratis', duracion: '~20 lectures · ~25 h', nivel: 'avanzado', porQue: 'La base teórica directa de los LLMs: transformers y attention' },
  cs25: { nombre: 'Stanford CS25: Transformers United', referente: 'Stanford Online', credencial: 'Seminario con ponentes de los grandes labs', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rNiJRchCzutFw5ItR_Z27CM', gratis: 'gratis', duracion: 'charlas de ~60 min', nivel: 'avanzado', porQue: 'Estado del arte contado por quienes lo construyen — funciona como audio', audio: true },
  mlSpec: { nombre: 'Machine Learning Specialization', referente: 'Andrew Ng · DeepLearning.AI', credencial: 'El curso de ML más influyente de la historia', tipo: 'curso', url: 'https://www.coursera.org/specializations/machine-learning-introduction', gratis: '$49/mes (ayuda financiera disponible)', duracion: '3 cursos · ~95 h', nivel: 'avanzado', porQue: 'ML completo por el referente nº1 en educación de IA', audio: true },
  fellows: { nombre: 'Anthropic Fellows Program (LA BECA)', referente: 'Anthropic Alignment Science', credencial: 'Programa oficial con mentores de Anthropic', tipo: 'beca', url: 'https://alignment.anthropic.com/2025/anthropic-fellows-program-2026/', gratis: 'PAGAN: $3,850/semana + ~$15k/mes cómputo', duracion: '4 meses full-time', nivel: 'avanzado', porQue: 'NO pide PhD ni papers ni ML previo: pide Python fluido + ejecución + motivación por AI safety' },

  // Audio para huecos
  lexDario: { nombre: 'Lex Fridman #452 — Dario Amodei (CEO Anthropic)', referente: 'Lex Fridman (MIT) + Dario Amodei', credencial: 'La entrevista más profunda al CEO de Anthropic (+ Olah y Askell)', tipo: 'podcast', url: 'https://lexfridman.com/dario-amodei', gratis: 'gratis', duracion: '~5 h (trocear con timestamps)', nivel: 'intermedio', porQue: 'Visión interna directa: scaling, seguridad, interpretabilidad, carácter de Claude', audio: true },
  dwarkeshDario: { nombre: 'Dwarkesh — Dario Amodei', referente: 'Dwarkesh Patel + Dario Amodei', credencial: 'El entrevistador técnico de referencia de los labs', tipo: 'podcast', url: 'https://www.dwarkesh.com/p/dario-amodei', gratis: 'gratis', duracion: '1 h 58 min', nivel: 'intermedio', porQue: 'Más denso y técnico que la versión de Lex', audio: true },
  lexKarpathy: { nombre: 'Lex Fridman #333 — Andrej Karpathy', referente: 'Lex Fridman + Karpathy', credencial: 'Fundador de OpenAI · ex-Tesla', tipo: 'podcast', url: 'https://lexfridman.com/andrej-karpathy', gratis: 'gratis', duracion: '~3.5 h', nivel: 'intermedio', porQue: 'El mejor traductor de deep learning a intuición', audio: true },
  dwarkeshInterp: { nombre: 'Dwarkesh — Sholto & Trenton: How LLMs actually think', referente: 'Dwarkesh + Bricken (Anthropic) & Douglas', credencial: 'Interpretabilidad mecanicista desde dentro de los labs', tipo: 'podcast', url: 'https://www.dwarkesh.com/p/sholto-douglas-trenton-bricken', gratis: 'gratis', duracion: '3 h 12 min (denso)', nivel: 'avanzado', porQue: 'Superposición e in-context learning — el nivel mental al que apuntas', audio: true },
  dwarkeshDemis: { nombre: 'Dwarkesh — Demis Hassabis (DeepMind)', referente: 'Dwarkesh + Hassabis', credencial: 'Premio Nobel de Química 2024 (AlphaFold)', tipo: 'podcast', url: 'https://www.dwarkesh.com/p/demis-hassabis', gratis: 'gratis', duracion: '1 h', nivel: 'intermedio', porQue: 'IA × ciencia (AlphaFold) — directo a tu perfil médico-investigador', audio: true },
  latentSpace: { nombre: 'Latent Space — The AI Engineer Podcast', referente: 'swyx + Alessio Fanelli', credencial: 'swyx acuñó el término "AI Engineer"', tipo: 'podcast', url: 'https://www.latent.space/', gratis: 'gratis', duracion: '60-90 min, semanal', nivel: 'avanzado', porQue: 'El único podcast 100% de AI engineering aplicado: el rol al que aspiras', audio: true },
  noPriors: { nombre: 'No Priors (Sarah Guo + Elad Gil)', referente: 'Sarah Guo (Conviction) + Elad Gil', credencial: 'Inversores top de IA', tipo: 'podcast', url: 'https://podcasts.apple.com/us/podcast/no-priors-artificial-intelligence-technology-startups/id1668002688', gratis: 'gratis', duracion: '22-56 min, semanal', nivel: 'base', porQue: 'El mejor ratio insight/minuto para huecos + ángulo de negocio (Pulso)', audio: true },
  anthropicYt: { nombre: 'Canal oficial de Anthropic (YouTube)', referente: 'Anthropic', credencial: 'Canal corporativo oficial', tipo: 'video', url: 'https://www.youtube.com/@anthropic-ai', gratis: 'gratis', duracion: 'vídeos 5-60 min', nivel: 'intermedio', porQue: 'Empieza por "AI prompt engineering: A deep dive" — vocabulario y cultura de la empresa meta', audio: true },
  dlaiYt: { nombre: 'Canal DeepLearning.AI (charlas de Ng)', referente: 'Andrew Ng · DeepLearning.AI', credencial: 'Organización educativa de Ng', tipo: 'video', url: 'https://www.youtube.com/@Deeplearningai', gratis: 'gratis', duracion: '5-60 min', nivel: 'base', porQue: 'Píldoras de Ng — puente entre podcasts y cursos formales', audio: true },
  theBatch: { nombre: 'The Batch (newsletter semanal)', referente: 'Andrew Ng · DeepLearning.AI', credencial: 'Con "Andrew’s Letters" del propio Ng', tipo: 'docs', url: 'https://www.deeplearning.ai/the-batch/', gratis: 'gratis', duracion: '~10 min/semana', nivel: 'base', porQue: 'El filtro de noticias de IA con más criterio — sustituye doomscrolling', audio: true },
  realPython: { nombre: 'Real Python (tutoriales + podcast)', referente: 'Real Python', credencial: 'Referencia editorial seria del ecosistema', tipo: 'podcast', url: 'https://realpython.com/', gratis: 'parcial', duracion: 'semanal', nivel: 'intermedio', porQue: 'El único recurso 100% audio para mantener inmersión Python sin pantalla', audio: true },
} satisfies Record<string, SynapseMaterial>;

export const SYNAPSE_MATERIALES = M;

// ─── Meta ───
export const SYNAPSE_META = {
  titulo: 'SYNAPSE',
  subtitulo: 'MIND · AI-ENGINEERED — médico → especialista en IA nivel Anthropic',
  tesis: 'La sinapsis entre tu cerebro médico y las máquinas. Python, datos, deep learning, agentes, ciberseguridad y post-training — SOLO con los referentes (Anthropic, Stanford, MIT, Harvard, creadores de las herramientas), cero youtubers del momento. 30 min/día en espacios muertos, proyecto público por fase.',
  accent: '#818CF8',
  nota: 'Motor ACTIVO (pestaña ⚡ Hoy): 12 semanas día a día — F0 completa (sem 1-8) + arranque F1/CS50P (sem 9-12) — con lecciones EXACTAS de los temarios reales extraídos el 10-jun-2026 (DATA/SYNAPSE/curricula/). Bloques A 15\' pantalla · B 10\' audio · C 5\' lectura + sábado PC opcional. Progreso manual real (empieza 0%). Las semanas 13+ se regeneran con DATA/_scripts/gen_synapse_plan.js al avanzar de fase.',
} as const;

// ─── Fases ───
export const SYNAPSE_FASES: SynapseFase[] = [
  {
    id: 'f0', fase: 'F0', titulo: 'La Escuela de Anthropic', duracion: 'sem 1–4', estado: 'activa',
    desc: 'La "licenciatura básica" de Anthropic con la que pediste empezar: Academy completa de nivel base + la visión panorámica de Karpathy. Todo apto para huecos móviles.',
    entregable: 'Certificados Claude 101 + AI Fluency · dominar los 5 patrones de agentes',
    materiales: [M.academy, M.claude101, M.aiFluency, M.effectiveAgents, M.karpathyIntro, M.karpathyDeep, M.nn3b1b],
  },
  {
    id: 'f1', fase: 'F1', titulo: 'Código: Python + terminal + Git', duracion: 'sem 5–12', estado: 'pendiente',
    desc: 'La base que un médico no tiene y Anthropic da por sentada. Python es el ÚNICO requisito universal en todos sus puestos (verificado en sus vacantes reales).',
    entregable: 'Primer repo público en GitHub con scripts Python propios para Pulso',
    materiales: [M.cs50p, M.automate, M.pyTutorial, M.proGit, M.missingSemester, M.cs50x],
  },
  {
    id: 'f2', fase: 'F2', titulo: 'Datos: pandas + SQL + probabilidad', duracion: 'sem 13–20', estado: 'pendiente',
    desc: 'Data science por los CREADORES de las herramientas (McKinney = pandas) + la probabilidad de Harvard que todo el ML asume.',
    entregable: 'Análisis pandas de un dataset real (Pulso/LIVIANO) publicado en GitHub',
    materiales: [M.kaggle, M.mckinney, M.vanderplas, M.sqlbolt, M.widom, M.stat110],
  },
  {
    id: 'f3', fase: 'F3', titulo: 'Deep learning: cómo piensa la máquina', duracion: 'sem 21–32', estado: 'pendiente',
    desc: 'De la intuición visual (3Blue1Brown) a construir un GPT desde cero con Karpathy. MIT + Harvard + fast.ai como columna.',
    entregable: 'Tu primer GPT entrenado desde cero (Zero to Hero) + certificado CS50 AI',
    materiales: [M.algebra3b1b, M.calculo3b1b, M.mit6s191, M.fastai, M.zeroToHero, M.cs50ai, M.nanochat],
  },
  {
    id: 'f4', fase: 'F4', titulo: 'Ingeniería de agentes y workflows (EL CORAZÓN)', duracion: 'sem 33–48', estado: 'pendiente',
    desc: 'API de Claude, MCP, Agent SDK, evals, LangGraph y n8n (tu motor APEX). "Experiencia LLM en producción pesa más que credenciales académicas" — patrón verificado en los puestos de Anthropic.',
    entregable: '1–2 agentes REALES en producción con evals (motor APEX v2 con Agent SDK + MCP propio)',
    materiales: [M.claudeApi, M.promptTutorial, M.anthropicCourses, M.mcpIntro, M.mcpAdvanced, M.claudeCodeAction, M.agentSkills, M.agentSdk, M.evalsDocs, M.hfAgents, M.dlaiMcp, M.dlaiComputerUse, M.dlaiClaudeCode, M.dlaiLanggraph, M.langchainAcademy, M.n8nLevelOne, M.n8nAdvancedAi, M.openaiAgentsGuide, M.aiEngineering, M.raschkaLlm],
  },
  {
    id: 'f5', fase: 'F5', titulo: 'Ciberseguridad (web clásica → seguridad de IA)', duracion: 'sem 49–60', estado: 'pendiente',
    desc: 'OWASP + PortSwigger (creadores de Burp) + Simon Willison + la investigación de seguridad de la propia Anthropic. Cierra con red teaming de IA (HTB × Google).',
    entregable: 'Auditoría de seguridad documentada de tus propios agentes (OWASP LLM Top 10)',
    materiales: [M.owaspTop10, M.owaspLlm, M.portswigger, M.webLlmAttacks, M.willisonPi, M.lethalTrifecta, M.cs253, M.tryhackme, M.htbAiRedTeam, M.manyShotJb, M.constClassifiers, M.rsp],
  },
  {
    id: 'f6', fase: 'F6', titulo: 'Nivel Anthropic: post-training + alignment', duracion: 'sem 61+', estado: 'meta',
    desc: 'RLHF, ARENA (la prep real del Fellows), MLOps de Berkeley, DSA del MIT y la teoría élite de Stanford. La meta: aplicar al Anthropic Fellows Program.',
    entregable: 'Aplicación al Anthropic Fellows Program + portfolio público completo',
    materiales: [M.rlhfBook, M.arena, M.fsdl, M.mit6006, M.cs50w, M.cs229, M.cs224n, M.cs25, M.fellows],
  },
];

// ─── Biblioteca por categoría ───
export const SYNAPSE_BIBLIOTECA: { categoria: string; icon: string; items: SynapseMaterial[] }[] = [
  { categoria: 'La Escuela de Anthropic', icon: '🏛', items: [M.academy, M.claude101, M.aiFluency, M.claudeApi, M.mcpIntro, M.mcpAdvanced, M.claudeCodeAction, M.agentSkills, M.promptTutorial, M.anthropicCourses, M.agentSdk, M.evalsDocs, M.effectiveAgents, M.fellows] },
  { categoria: 'Python & código', icon: '🐍', items: [M.cs50p, M.cs50x, M.automate, M.pyTutorial, M.proGit, M.missingSemester, M.realPython] },
  { categoria: 'Datos & estadística', icon: '📊', items: [M.kaggle, M.mckinney, M.vanderplas, M.sqlbolt, M.widom, M.stat110] },
  { categoria: 'Matemática visual', icon: '🧮', items: [M.nn3b1b, M.algebra3b1b, M.calculo3b1b] },
  { categoria: 'Deep learning', icon: '🧠', items: [M.karpathyIntro, M.karpathyDeep, M.zeroToHero, M.nanochat, M.mit6s191, M.fastai, M.cs50ai] },
  { categoria: 'Agentes & LLM engineering', icon: '🤖', items: [M.hfAgents, M.hfLlm, M.dlaiMcp, M.dlaiComputerUse, M.dlaiClaudeCode, M.dlaiLanggraph, M.langchainAcademy, M.n8nLevelOne, M.n8nAdvancedAi, M.openaiCookbook, M.openaiAgentsGuide, M.aiEngineering, M.raschkaLlm, M.aheadOfAi] },
  { categoria: 'Ciberseguridad', icon: '🛡', items: [M.owaspTop10, M.owaspLlm, M.portswigger, M.webLlmAttacks, M.willisonPi, M.lethalTrifecta, M.cs253, M.tryhackme, M.htbAiRedTeam, M.manyShotJb, M.constClassifiers, M.rsp] },
  { categoria: 'Teoría élite Stanford/MIT/Berkeley', icon: '🎓', items: [M.cs229, M.cs224n, M.cs25, M.mit6006, M.fsdl, M.cs50w, M.mlSpec, M.rlhfBook, M.arena] },
  { categoria: 'Audio para espacios muertos', icon: '🎧', items: [M.lexDario, M.dwarkeshDario, M.lexKarpathy, M.dwarkeshInterp, M.dwarkeshDemis, M.latentSpace, M.noPriors, M.anthropicYt, M.dlaiYt, M.theBatch] },
];

// ─── KPIs ───
const ALL = Object.values(M) as SynapseMaterial[];
export const SYNAPSE_KPIS = {
  fases: SYNAPSE_FASES.length,
  materialesVerificados: ALL.length,
  fasesCompletadas: 0, // progreso REAL — empieza en 0
  metaFinal: 'Anthropic Fellows Program',
} as const;

// ─── Protocolo (horario REAL en Google Calendar — confirmado por Joseph el 10-jun-2026) ───
export const SYNAPSE_HORARIO: { min: string; bloque: string; que: string; formato: string }[] = [
  { min: "30'", bloque: 'L–V 12:30–13:00 · evento "🧠 SYNAPSE — misión del día"', que: "La misión completa de la pestaña ⚡ Hoy: A lección 15' + B audio 10' + C lectura 5'", formato: 'pantalla' },
  { min: '2 h', bloque: 'Sábado 15:00–17:00 · "🧠 SYNAPSE — PC sábado"', que: 'Bloque de teclado: notebooks, repo público synapse-journal, Problem Sets de CS50P + ponerse al día', formato: 'requiere PC' },
  { min: '2 h', bloque: 'Domingo 15:00–17:00 · "🧠 SYNAPSE — repaso + PC" (14 y 21-jun libres)', que: 'Repaso semanal (Feynman en voz alta) + terminar lo que quedó del bloque PC', formato: 'repaso' },
  { min: 'extra', bloque: 'Viajes · colas · gaps sueltos (opcional)', que: 'Adelantar audio (B) o lectura móvil (C) en cualquier hueco muerto del día', formato: 'sí-audio' },
];

// ─── Quick links (right panel) ───
export const SYNAPSE_QUICKLINKS: { label: string; url: string; nota: string }[] = [
  { label: '◆ Obsidian — Mapa SYNAPSE', url: 'obsidian://open?vault=Vault_Medicina%20MIR_Joseph&file=05_SYNAPSE_IA%2F00_Mapa_SYNAPSE', nota: 'tu segundo cerebro: 7 fases · 82 subtemas con temario real' },
  { label: '🏛 Anthropic Academy', url: 'https://www.anthropic.com/learn', nota: 'La escuela oficial — F0 empieza aquí' },
  { label: '🎓 Claude 101', url: 'https://anthropic.skilljar.com/claude-101', nota: 'Primer curso con certificado' },
  { label: '📜 Building Effective Agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', nota: 'El ensayo fundacional (25 min)' },
  { label: '🎙 Karpathy: Intro to LLMs', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', nota: '1 h en audio — hoy mismo' },
];

// ─── El nivel meta (verificado en vacantes reales de Anthropic, jun-2026) ───
export const SYNAPSE_NIVEL_META: { skill: string; fuente: string }[] = [
  { skill: 'Python sólido a nivel producción', fuente: 'el ÚNICO requisito universal en todos los puestos (Research Engineer Evals $320-485k, Interpretability $315-560k)' },
  { skill: 'Evals / evaluation frameworks', fuente: 'aparece en casi todos los puestos Y en el Fellows — por eso F4 los trabaja con el material oficial de Anthropic' },
  { skill: 'Experiencia LLM en producción > títulos', fuente: 'Applied AI Architect ($240-315k) pide "builder credibility como ingeniero o fundador técnico" — tu perfil Pulso ya suma' },
  { skill: 'MCP + context engineering', fuente: 'textual en los requisitos de los puestos Applied AI' },
  { skill: 'Distributed systems / data pipelines', fuente: 'mínimos del Research Engineer (se cubren en F6 con FSDL + MIT 6.006)' },
  { skill: 'Fellows Program: ejecución, no credenciales', fuente: '"You don’t need a PhD, prior ML experience, or published papers" (textual) — piden Python fluido + convertir problemas ambiguos en progreso + motivación AI safety. Stipend $3,850/semana + ~$15k/mes de cómputo' },
];

// ─── Honestidad (no inventado) ───
export const SYNAPSE_ADVERTENCIAS: string[] = [
  'Fellows Program: requiere autorización de trabajo en US/UK/Canadá (sin sponsorship de visa) — verificar tu situación antes de apuntar a la beca; los skills sirven igual para Applied AI y para Pulso.',
  'A 30 min/día la ruta completa es 12–18 meses realistas. F0 y F4 son las de mayor ROI inmediato (la F4 mejora directamente el motor APEX y Pulso).',
  'Zero to Hero, ARENA, MIT 6.006 y CS50W exigen bloques largos de TECLADO — no caben en huecos de 10-15 min; van al bloque opcional de fin de semana.',
  'LLM101n de Karpathy AÚN NO existe (repo archivado con nota oficial); nanochat es su capstone ya publicado. nanoGPT está deprecado → usar nanochat.',
  'ML Specialization de Ng ya no tiene audit gratis a nivel especialización ($49/mes); intentar audit por curso individual o ayuda financiera antes de pagar.',
  'Veredicto del auditor de completitud: lo que consigue la entrevista no es el temario sino PROYECTOS PÚBLICOS demostrables en GitHub — por eso cada fase exige un entregable público.',
  'Las 85 URLs fueron verificadas en vivo el 10-jun-2026 (WebFetch/oEmbed). Si alguna cambia, la fuente canónica es DATA/SYNAPSE/materiales-verificados.md.',
];
