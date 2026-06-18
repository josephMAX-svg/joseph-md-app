# SYNAPSE · Mini-Fase AGOSTO (AI-first) — construir software DIRIGIENDO a la IA

> 10 semanas · 19-jun → 31-ago · 30 min/día L-V + ~2h sábado de teclado. En la app: Synapse → pestaña **🚀 Agosto**.
> Filosofía: no memorizar sintaxis ni teclear código que la IA ya escribe. El skill humano es **dirigir y verificar** (vocabulario, prompting, criterio, arquitectura, gusto). Ejecutable y MEDIBLE desde el día 1 (práctica deliberada, Ericsson · *Peak*).

## Objetivo
Pasar de "sé que la IA programa" a **"dirijo a la IA para construir y desplegar software real CON CRITERIO"**. Al cerrar agosto: especificas una landing/app para ALLPA o Qori, conduces explore→plan→code→commit, verificas con Claude in Chrome, despliegas en Vercel y EXPLICAS cada pieza.

## KPIs (práctica deliberada, no minutos)
- **Prompts efectivos/semana** (resuelven al 1.º-2.º intento): ~3 (S1) → ~12 (S10), nota 1-5 en `prompts.md`
- **Features VIVAS** en URL pública de Vercel: acumulado **≥ 8** (cada una con commit + link)
- **%-de-código-que-entiendo** (métrica estrella): ~30% (S2) → **≥ 80%** (S10)
- **Vocabulario activo** señalado en tu proyecto: 15/15
- **Ciclos explore→plan→code→commit** (plan mode): ≥ 10
- **Bugs detectados en el navegador y resueltos** (Claude in Chrome): ≥ 5

## Las 10 semanas (cada una deja un entregable medible)
| Sem | Foco | Entregable medible | Recurso clave |
|---|---|---|---|
| S1 19-28 jun | Vocabulario + instalar Claude Code (preguntar, no codear) | glosario.md 15 términos + Claude Code respondiendo 3 preguntas | GitHub Hello World · MDN Internet · Claude Code Quickstart |
| S2 29 jun-5 jul | Agentic loop + explore→plan→code→commit (plan mode) | 1 ciclo completo (plan→diff→commit) | How it works · Best practices |
| S3 6-12 jul | Promptear para construir (claro, contexto, ejemplos) | prompts.md 5 pares vago↔específico, nota 1-5 | Prompt Overview · Tutorial interactivo |
| S4 13-19 jul | CLAUDE.md + dar a la IA forma de VERIFICAR | CLAUDE.md propio + 1 caso "corre-el-check-y-arregla" | Best practices |
| S5 20-26 jul | PROYECTO REAL: landing ALLPA/Qori con v0; leer lo generado | repo público "landing v1" + journal por archivo | v0 · Common workflows |
| S6 27 jul-2 ago | DESPLEGAR en Vercel (build, prod vs preview, dominio) | URL pública viva + journal de términos | Vercel Getting started/Deploy |
| S7 3-9 ago | Verificar en navegador con Claude in Chrome | 2 bugs detectados y resueltos en el navegador | Claude Code with Chrome |
| S8 10-16 ago | Backend simple: formulario de lead que guarda datos | formulario VIVO + journal endpoint/env var | Vercel Add a database |
| S9 17-23 ago | Leer el código como REVISOR (agente revisa tu diff) | 1 revisión + 3 mejoras que entendiste y aprobaste | Best practices (revisión adversarial) |
| S10 24-31 ago | CAPSTONE: Claude entrevista→SPEC.md, construir, desplegar | app FINAL pública + SPEC.md + README + demo 5 min | Best practices (let Claude interview you) |

**Entregable final:** una mini-app/landing REAL y pública en Vercel para ALLPA o Qori Golden, hecha dirigiendo a la IA (SPEC.md, generada con v0/Claude Code, verificada con Claude in Chrome, documentada en README). La prueba: abrir el repo y EXPLICAR cada archivo + el journal.

## Recursos AI-first (verificados) — categoría 🤖 "Construir con IA" en la biblioteca
Claude Code (Quickstart/Best practices/How it works/Common workflows/Chrome · code.claude.com) · Prompt Engineering Overview + best practices (platform.claude.com) · Prompt Eng Interactive Tutorial · DeepLearning.AI Claude Code · v0 by Vercel · Cursor · anthropic-quickstarts · Writing tools for agents · Building Effective Agents · Context Engineering · GitHub Hello World · MDN Internet · Vercel deploy.
**Se degradan para esta mini-fase** (vuelven en sept+): CS50P, Automate, Python Tutorial, Missing Semester, MIT 6.006, nand2tetris, OSTEP — memorizar sintaxis/escribir a mano es justo lo que la IA hace.

## Práctica deliberada (Peak · Ericsson) — la IA es tu coach
Principios y sistema medible (rúbrica 0-100, INPUT vs PRÁCTICA, pre/post-test, mastery gate, error-log, dificultad adaptativa) están en la pestaña 🚀 Agosto y en `src/lib/synapseData.ts` (SYNAPSE_PRACTICA).

## ¿Cuánto comprime la IA los 3 años? (análisis honesto)
Lo que comprime NO son las horas, es la **calidad del bucle** (objetivo→feedback→corrección). Ericsson desmonta las 10.000 h ("hacer más de lo mismo no te hace mejor"). Bloom (1984): tutoría 1-a-1 + mastery = alumno medio sobre el 98% (+2σ); la IA escala ese tutor a coste ~0. RCT Harvard (Kestin 2025): con tutor-IA se aprende **>2× por hora**. Horizontes a 30-60 min/día:
- **Top-10%** (construir/desplegar con IA): manual ~1-2 años → con coach-IA **~6-10 meses**.
- **Top-5%**: manual ~3 años → con IA **~1.5-2 años**.
- **Top-1%**: la IA **NO** lo comprime — exige miles de horas en el borde; el salto del 10.º al 1.er puesto cuesta desproporcionadamente más. Ahí la palanca es el conocimiento humano profundo (F4/F5/F6 del roadmap multi-año).

La IA convierte "aprender a HACERLO" (años) en "aprender a DIRIGIRLO y MEDIRLO" (semanas para las bases). El techo lo pone el juicio humano entrenado con repeticiones reales.
