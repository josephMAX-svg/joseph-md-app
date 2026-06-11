/**
 * obsidianVaultMap.ts — GENERADO por DATA/_scripts/build_vault_jmd_sync.js (2026-06-10).
 * Mapa app → nota EXACTA del vault para SYNAPSE (82 materiales), Empresa (5 marcas +
 * biblioteca) y VITALS (3 secciones). NO editar a mano — regenerar con el script
 * (los paths salen del MISMO código que crea las carpetas: cero drift).
 */
import { obsUrl } from './obsidianMap';

export const OBS_SYNAPSE_MAPA = '05_SYNAPSE_IA/00_Mapa_SYNAPSE';
export const OBS_SYNAPSE_FASES: Record<string, string> = {
  "F0": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/_fase",
  "F1": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/_fase",
  "F2": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/_fase",
  "F3": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/_fase",
  "F4": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/_fase",
  "F5": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/_fase",
  "F6": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/_fase",
};
export const OBS_SYNAPSE_MATERIALES: Record<string, string> = {
  "Anthropic Academy (portal oficial)": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/01_Anthropic_Academy_portal_oficial/_concepto_madre",
  "Claude 101 (+ Claude Code 101 + Platform 101)": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/02_Claude_101_Claude_Code_101_Platform_101/_concepto_madre",
  "AI Fluency: Framework & Foundations": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/03_AI_Fluency_Framework_Foundations/_concepto_madre",
  "Building Effective AI Agents (ensayo)": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/04_Building_Effective_AI_Agents_ensayo/_concepto_madre",
  "[1hr Talk] Intro to Large Language Models": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/05_1hr_Talk_Intro_to_Large_Language_Models/_concepto_madre",
  "Deep Dive into LLMs like ChatGPT": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/06_Deep_Dive_into_LLMs_like_ChatGPT/_concepto_madre",
  "Neural networks (incluye transformers/GPT)": "05_SYNAPSE_IA/F0_La_Escuela_de_Anthropic/07_Neural_networks_incluye_transformers_GPT/_concepto_madre",
  "CS50P: Introduction to Programming with Python": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/01_CS50P_Introduction_to_Programming_with_Python/_concepto_madre",
  "Automate the Boring Stuff with Python (3ª ed.)": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/02_Automate_the_Boring_Stuff_with_Python_3_ed/_concepto_madre",
  "The Python Tutorial (docs oficiales)": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/03_The_Python_Tutorial_docs_oficiales/_concepto_madre",
  "Pro Git (2ª ed.)": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/04_Pro_Git_2_ed/_concepto_madre",
  "The Missing Semester of Your CS Education": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/05_The_Missing_Semester_of_Your_CS_Education/_concepto_madre",
  "CS50x: Introduction to Computer Science": "05_SYNAPSE_IA/F1_Codigo_Python_terminal_Git/06_CS50x_Introduction_to_Computer_Science/_concepto_madre",
  "Kaggle Learn (Python, pandas, Intro ML)": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/01_Kaggle_Learn_Python_pandas_Intro_ML/_concepto_madre",
  "Python for Data Analysis (3ª ed., Open Access)": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/02_Python_for_Data_Analysis_3_ed_Open_Access/_concepto_madre",
  "Python Data Science Handbook": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/03_Python_Data_Science_Handbook/_concepto_madre",
  "SQLBolt — SQL interactivo": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/04_SQLBolt_SQL_interactivo/_concepto_madre",
  "Databases: Relational Databases and SQL": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/05_Databases_Relational_Databases_and_SQL/_concepto_madre",
  "Introduction to Probability (Stat 110)": "05_SYNAPSE_IA/F2_Datos_pandas_SQL_probabilidad/06_Introduction_to_Probability_Stat_110/_concepto_madre",
  "Essence of linear algebra": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/01_Essence_of_linear_algebra/_concepto_madre",
  "Essence of calculus": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/02_Essence_of_calculus/_concepto_madre",
  "MIT 6.S191: Introduction to Deep Learning": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/03_MIT_6_S191_Introduction_to_Deep_Learning/_concepto_madre",
  "Practical Deep Learning for Coders": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/04_Practical_Deep_Learning_for_Coders/_concepto_madre",
  "Neural Networks: Zero to Hero": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/05_Neural_Networks_Zero_to_Hero/_concepto_madre",
  "CS50 AI: Artificial Intelligence with Python": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/06_CS50_AI_Artificial_Intelligence_with_Python/_concepto_madre",
  "nanochat (capstone de Eureka Labs)": "05_SYNAPSE_IA/F3_Deep_learning_como_piensa_la_maquina/07_nanochat_capstone_de_Eureka_Labs/_concepto_madre",
  "Building with the Claude API": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/01_Building_with_the_Claude_API/_concepto_madre",
  "Prompt Engineering Interactive Tutorial": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/02_Prompt_Engineering_Interactive_Tutorial/_concepto_madre",
  "anthropics/courses (API, Prompt Eng, Evals, Tool Use)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/03_anthropics_courses_API_Prompt_Eng_Evals_Tool_Use/_concepto_madre",
  "Introduction to Model Context Protocol": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/04_Introduction_to_Model_Context_Protocol/_concepto_madre",
  "MCP: Advanced Topics": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/05_MCP_Advanced_Topics/_concepto_madre",
  "Claude Code in Action": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/06_Claude_Code_in_Action/_concepto_madre",
  "Intro to agent skills + Intro to subagents": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/07_Intro_to_agent_skills_Intro_to_subagents/_concepto_madre",
  "Claude Agent SDK (documentación oficial)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/08_Claude_Agent_SDK_documentacion_oficial/_concepto_madre",
  "Define success criteria & build evals (Claude Docs)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/09_Define_success_criteria_build_evals_Claude_Docs/_concepto_madre",
  "Hugging Face Agents Course": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/10_Hugging_Face_Agents_Course/_concepto_madre",
  "MCP: Build Rich-Context AI Apps with Anthropic": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/11_MCP_Build_Rich_Context_AI_Apps_with_Anthropic/_concepto_madre",
  "Building toward Computer Use with Anthropic": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/12_Building_toward_Computer_Use_with_Anthropic/_concepto_madre",
  "Claude Code: A Highly Agentic Coding Assistant": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/13_Claude_Code_A_Highly_Agentic_Coding_Assistant/_concepto_madre",
  "AI Agents in LangGraph": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/14_AI_Agents_in_LangGraph/_concepto_madre",
  "LangChain Academy: Intro to LangGraph": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/15_LangChain_Academy_Intro_to_LangGraph/_concepto_madre",
  "n8n Course: Level One": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/16_n8n_Course_Level_One/_concepto_madre",
  "n8n Advanced AI (agents + LangChain en n8n)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/17_n8n_Advanced_AI_agents_LangChain_en_n8n/_concepto_madre",
  "A Practical Guide to Building Agents (PDF)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/18_A_Practical_Guide_to_Building_Agents_PDF/_concepto_madre",
  "AI Engineering (libro)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/19_AI_Engineering_libro/_concepto_madre",
  "Build a Large Language Model (From Scratch)": "05_SYNAPSE_IA/F4_Ingenieria_de_agentes_y_workflows_EL_CORAZON/20_Build_a_Large_Language_Model_From_Scratch/_concepto_madre",
  "OWASP Top 10 (Web Application Security)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/01_OWASP_Top_10_Web_Application_Security/_concepto_madre",
  "OWASP Top 10 for LLM Applications": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/02_OWASP_Top_10_for_LLM_Applications/_concepto_madre",
  "Web Security Academy": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/03_Web_Security_Academy/_concepto_madre",
  "Web LLM attacks (Web Security Academy)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/04_Web_LLM_attacks_Web_Security_Academy/_concepto_madre",
  "Serie \"Prompt injection\" (2022-2025)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/05_Serie_Prompt_injection_2022_2025/_concepto_madre",
  "The lethal trifecta for AI agents": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/06_The_lethal_trifecta_for_AI_agents/_concepto_madre",
  "Stanford CS253: Web Security (curso completo)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/07_Stanford_CS253_Web_Security_curso_completo/_concepto_madre",
  "TryHackMe: Pre Security + Jr Penetration Tester": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/08_TryHackMe_Pre_Security_Jr_Penetration_Tester/_concepto_madre",
  "HTB Academy: AI Red Teamer (con Google)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/09_HTB_Academy_AI_Red_Teamer_con_Google/_concepto_madre",
  "Many-shot jailbreaking (research)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/10_Many_shot_jailbreaking_research/_concepto_madre",
  "Constitutional Classifiers (research)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/11_Constitutional_Classifiers_research/_concepto_madre",
  "Responsible Scaling Policy (ASL levels)": "05_SYNAPSE_IA/F5_Ciberseguridad_web_clasica_seguridad_de_IA/12_Responsible_Scaling_Policy_ASL_levels/_concepto_madre",
  "RLHF Book (post-training de LLMs)": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/01_RLHF_Book_post_training_de_LLMs/_concepto_madre",
  "ARENA 3.0 (Alignment Research Engineer Accelerator)": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/02_ARENA_3_0_Alignment_Research_Engineer_Accelerato/_concepto_madre",
  "Full Stack Deep Learning (Course 2022)": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/03_Full_Stack_Deep_Learning_Course_2022/_concepto_madre",
  "MIT 6.006: Introduction to Algorithms": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/04_MIT_6_006_Introduction_to_Algorithms/_concepto_madre",
  "CS50W: Web Programming with Python & JavaScript": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/05_CS50W_Web_Programming_with_Python_JavaScript/_concepto_madre",
  "Stanford CS229: Machine Learning (Andrew Ng)": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/06_Stanford_CS229_Machine_Learning_Andrew_Ng/_concepto_madre",
  "Stanford CS224N: NLP with Deep Learning": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/07_Stanford_CS224N_NLP_with_Deep_Learning/_concepto_madre",
  "Stanford CS25: Transformers United": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/08_Stanford_CS25_Transformers_United/_concepto_madre",
  "Anthropic Fellows Program (LA BECA)": "05_SYNAPSE_IA/F6_Nivel_Anthropic_post_training_alignment/09_Anthropic_Fellows_Program_LA_BECA/_concepto_madre",
  "Hugging Face LLM Course": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/01_Hugging_Face_LLM_Course/_concepto_madre",
  "OpenAI Cookbook": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/02_OpenAI_Cookbook/_concepto_madre",
  "Ahead of AI (Substack)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/03_Ahead_of_AI_Substack/_concepto_madre",
  "Machine Learning Specialization": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/04_Machine_Learning_Specialization/_concepto_madre",
  "Lex Fridman #452 — Dario Amodei (CEO Anthropic)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/05_Lex_Fridman_452_Dario_Amodei_CEO_Anthropic/_concepto_madre",
  "Dwarkesh — Dario Amodei": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/06_Dwarkesh_Dario_Amodei/_concepto_madre",
  "Lex Fridman #333 — Andrej Karpathy": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/07_Lex_Fridman_333_Andrej_Karpathy/_concepto_madre",
  "Dwarkesh — Sholto & Trenton: How LLMs actually think": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/08_Dwarkesh_Sholto_Trenton_How_LLMs_actually_think/_concepto_madre",
  "Dwarkesh — Demis Hassabis (DeepMind)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/09_Dwarkesh_Demis_Hassabis_DeepMind/_concepto_madre",
  "Latent Space — The AI Engineer Podcast": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/10_Latent_Space_The_AI_Engineer_Podcast/_concepto_madre",
  "No Priors (Sarah Guo + Elad Gil)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/11_No_Priors_Sarah_Guo_Elad_Gil/_concepto_madre",
  "Canal oficial de Anthropic (YouTube)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/12_Canal_oficial_de_Anthropic_YouTube/_concepto_madre",
  "Canal DeepLearning.AI (charlas de Ng)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/13_Canal_DeepLearning_AI_charlas_de_Ng/_concepto_madre",
  "The Batch (newsletter semanal)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/14_The_Batch_newsletter_semanal/_concepto_madre",
  "Real Python (tutoriales + podcast)": "05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/15_Real_Python_tutoriales_podcast/_concepto_madre",
};
export const OBS_EMPRESA: Record<string, string> = {
  "pulso": "02_EMPRESA FINANZAS/01_PULSO/_concepto_madre",
  "liviano": "02_EMPRESA FINANZAS/02_LIVIANO/_concepto_madre",
  "pirqa": "02_EMPRESA FINANZAS/03_PIRQA/_concepto_madre",
  "terrenos": "02_EMPRESA FINANZAS/04_TERRENOS/_concepto_madre",
  "golden": "02_EMPRESA FINANZAS/05_GOLDEN/_concepto_madre",
  "biblioteca": "02_EMPRESA FINANZAS/06_BIBLIOTECA/_indice_biblioteca",
  "mapa": "02_EMPRESA FINANZAS/00_Mapa_EMPRESA",
};
export const OBS_VITALS: Record<string, string> = {
  "entrenamiento": "08_VITALS/01_ENTRENAMIENTO/_concepto_madre",
  "nutricion": "08_VITALS/02_NUTRICION/_concepto_madre",
  "retencion": "08_VITALS/03_RETENCION/_concepto_madre",
  "mapa": "08_VITALS/00_Mapa_VITALS",
};

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const NORM_INDEX: [string, string][] = Object.entries(OBS_SYNAPSE_MATERIALES).map(([n, p]) => [norm(n), p]);

// Alias: variantes de nombre que usa el plan día-a-día → nombre canónico del material.
const ALIAS: [RegExp, string][] = [
  [/^cs50p/i, 'CS50P: Introduction to Programming with Python'],
  [/^pro git/i, 'Pro Git (2ª ed.)'],
  [/the batch/i, 'The Batch (newsletter semanal)'],
  [/^simon willison$/i, 'Serie "Prompt injection" (2022-2025)'],
  [/intro to llms/i, '[1hr Talk] Intro to Large Language Models'],
  [/deep dive/i, 'Deep Dive into LLMs like ChatGPT'],
  [/many-?shot/i, 'Many-shot jailbreaking (research)'],
  [/constitutional classifiers/i, 'Constitutional Classifiers (research)'],
  [/responsible scaling|\basl\b/i, 'Responsible Scaling Policy (ASL levels)'],
  [/lethal trifecta/i, 'The lethal trifecta for AI agents'],
  [/canal anthropic/i, 'Canal oficial de Anthropic (YouTube)'],
  [/python tutorial/i, 'The Python Tutorial (docs oficiales)'],
  [/automate the boring/i, 'Automate the Boring Stuff with Python (3ª ed.)'],
];

function fuzzy(q0: string): string | null {
  const q = norm(q0);
  if (!q) return null;
  const hit = NORM_INDEX.find(([n]) => n === q) || NORM_INDEX.find(([n]) => n.startsWith(q) || q.startsWith(n));
  if (hit) return hit[1];
  const qt = new Set(q.split(' ').filter((t) => t.length > 3));
  if (!qt.size) return null;
  let best: [number, string] | null = null;
  for (const [n, p] of NORM_INDEX) {
    const inter = n.split(' ').filter((t) => qt.has(t)).length;
    const score = inter / Math.max(qt.size, 1);
    if (score >= 0.6 && (!best || score > best[0])) best = [score, p];
  }
  return best ? best[1] : null;
}

/** Nota del material SYNAPSE: exacto → alias (material+lección) → difuso (material, luego lección). */
export function synObsPath(material: string, leccion = ''): string | null {
  if (OBS_SYNAPSE_MATERIALES[material]) return OBS_SYNAPSE_MATERIALES[material];
  const ctx = material + ' ' + leccion;
  for (const [re, nombre] of ALIAS) {
    if (re.test(ctx) && OBS_SYNAPSE_MATERIALES[nombre]) return OBS_SYNAPSE_MATERIALES[nombre];
  }
  return fuzzy(material) || (leccion ? fuzzy(leccion) : null);
}
export const synObsUrl = (material: string, leccion = ''): string | null => {
  const p = synObsPath(material, leccion);
  return p ? obsUrl(p) : null;
};
