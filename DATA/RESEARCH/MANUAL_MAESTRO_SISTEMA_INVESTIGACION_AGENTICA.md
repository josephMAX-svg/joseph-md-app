# MANUAL MAESTRO DEL SISTEMA DE INVESTIGACIÓN DERMATOLÓGICA AGÉNTICA
## Documento de lectura estructural para construcción de aplicación web + motor agéntico
### Joseph Max Soto Tocas · UNCP Huancayo, Perú · Abril 2026
### Versión unificada 3.0 — consolidación de toda la investigación del proyecto

---

> **PROPÓSITO DE ESTE DOCUMENTO**
>
> Este NO es un set de instrucciones operativas. Es un **manual de lectura
> estructural** diseñado para que otro agente de IA (en otro chat o en
> Claude Code) comprenda la totalidad de lo investigado y diseñe a partir
> de aquí una **aplicación web** y un **sistema agéntico** que automaticen
> la creación de revisiones sistemáticas dermatológicas con estándar de
> publicación internacional (JEADV, JAAD).
>
> El lector de este manual debe profundizar aún más en cada componente,
> verificar lo que cambie con el tiempo, y traducir este diseño conceptual
> en código y arquitectura ejecutable.
>
> **Premisa central:** una revisión sistemática rigurosa requiere leer
> literatura de los últimos ~30 años cubriendo ≥90% de los estudios
> existentes. En dermatología estética esto es inmanejable manualmente.
> El sistema agéntico debe hacer esa búsqueda exhaustiva en automático,
> sincronizado con Google Calendar, de modo que cuando llegue la hora de
> "research" (días alternos lunes-viernes), el humano solo revise y valide
> lo que el sistema ya descubrió, cribó y organizó durante las horas previas.

---

# PARTE 1 — CONTEXTO DEL USUARIO Y OBJETIVO

## 1.1 Quién es Joseph

Médico peruano, egresado de la Facultad de Medicina Humana de la
Universidad Nacional del Centro del Perú (UNCP), en Huancayo. Reside en
El Tambo, Huancayo (sierra central peruana, 3,200 m s.n.m.).

Estado a la fecha de este manual:
- Tesis de pregrado defendida (20 abril 2026): asociación entre severidad
  de acné vulgar (escala IGA) y calidad de vida (índice CADI) en
  adolescentes mujeres de la I.E. Nuestra Señora de Cocharcas, Huancayo.
- **0 publicaciones indexadas** (línea base real).
- 0 revisiones sistemáticas completadas.
- RENACYT: sin registro (0 puntos).
- Readiness de perfil de investigación: ~6%.

## 1.2 El objetivo terminal

**Fellowship de Dermatología en Mayo Clinic (2035-2037).**

Toda la arquitectura de investigación se evalúa contra un filtro único:
*"¿Este output construye el CV competitivo para Mayo Clinic Dermatology
en 2035?"* — operacionalizado como el **Filtro Mayo** (puntaje ≥32/40
en novedad + viabilidad + impacto + valor curricular).

## 1.3 La ruta vital (contexto temporal completo)

```
2026 → Defensa tesis (✓ 20 ABR) → publicar tesis en JAAD International
       ENCAPS Plaza Huachac (10 AGO) · SERUM · USMLE Step 1
2027-2029 → 2-4 SRs publicadas · RENACYT VII→VI→V
2030 → MIR Top 50 → Dermatología Hospital Clínic Barcelona
       USMLE Step 2 >260
2030-2035 → Residencia MIR + 6-8 publicaciones PubMed primer autor
            Research elective en hospital USA → carta recomendación
2035 → Aplicación Fellowship Mayo Clinic Dermatología
2037-2041 → Residencia Mayo Clinic
2041+ → Dermatólogo académico de referencia mundial
```

## 1.4 Los 4 sectores del sistema completo

Este manual se centra en **INVESTIGACIÓN**, pero el sistema agéntico vive
dentro de una arquitectura mayor de 4 sectores que comparten infraestructura:

| Sector | Tiempo diario (calendario) | Rol de la IA |
|--------|---------------------------|--------------|
| **Investigación** | 13:15-14:15 (1h, días alternos profundo) | Foco de este manual |
| **Empresa dermatológica** | 14:45-15:15 (+ventas 14:15-14:45) | Automatización pacientes |
| **Inversión** | sin slot fijo aún | Análisis de mercado |
| **Estudios (MIR/USMLE)** | 07:15-18:45 (bloque principal) | Motor APEX activo |

El **bloque de construcción** (04:00-05:45) es donde se construyen y mejoran
los agentes de TODOS los sectores. Principio rector: **BUILD vs USE** — el
bloque de IA construye sistemas; los bloques sectoriales solo los consumen.

---

# PARTE 2 — EL HORARIO Y LA SINCRONIZACIÓN CON GOOGLE CALENDAR

## 2.1 Horario diario estándar (desde mayo 2026)

```
21:00-03:45  DORMIR
03:45-04:00  Declaraciones (mindset)
04:00-05:45  BLOQUE IA — CONSTRUIR (agentes de todos los sectores)
05:45-07:00  Físico (correr + calistenia + ducha)
07:00-07:15  Desayuno
07:15-12:00  MIR (preguntas: general + núcleo + todos los temas)
12:00-12:30  Almuerzo
12:30-13:00  Lectura de libro
13:00-13:15  Programación con mamá
13:15-14:15  INVESTIGACIÓN DERMATOLÓGICA ← slot crítico (1h exacta)
14:15-14:45  Ventas & Influencia
14:45-15:15  Finanzas y Empresa Dermatológica
15:15-17:15  ENCAPS + UWorld + AMBOSS
17:15-18:15  Dermatología especializada
18:15-18:45  Anki (AMKI)
18:45-19:15  Alistarse + viaje
19:00-20:30  Gym o baile
20:30-21:00  Viaje vuelta + evaluación del día
```

## 2.2 Rotación semanal del bloque de construcción IA (04:00-05:45)

```
LUN → Construir/mejorar agentes INVESTIGACIÓN
MAR → Construir/mejorar agentes ESTUDIO
MIÉ → Construir/mejorar agentes EMPRESA + VENTAS
JUE → Construir/mejorar agentes INVERSIÓN
VIE → Integración cross-sector + DeepLearning.AI Medicine (Coursera)
SAB → Revisión semanal + deuda técnica
```

## 2.3 El rol de Google Calendar en el sistema agéntico

**Concepto clave de diseño:** el sistema agéntico debe leer el Google
Calendar del usuario vía API para saber cuándo es la hora de "research".
La investigación está intercalada (un día sí, un día no, lunes a viernes).

Flujo de sincronización temporal:
1. El agente orquestador consulta Google Calendar API cada mañana.
2. Identifica si hoy hay bloque de "INVESTIGACIÓN DERMATOLÓGICA".
3. **Durante las horas previas a ese bloque** (mientras Joseph hace MIR,
   físico, etc.), el motor de descubrimiento corre en segundo plano:
   busca, deduplica, criba con IA local, y organiza los hallazgos.
4. Cuando Joseph llega a las 13:15, **todo el trabajo pesado ya está hecho**:
   solo revisa los papers pre-cribados, resuelve conflictos de screening,
   y toma decisiones de inclusión/exclusión que requieren juicio humano.
5. El bloque de 1 hora se convierte en pura validación y decisión, no en
   búsqueda manual interminable.

Este es el corazón de por qué el sistema existe: **convertir 1 hora/día
de capacidad humana en el equivalente de un equipo de investigación.**

---

# PARTE 3 — ARQUITECTURA TECNOLÓGICA COMPLETA

## 3.1 El stack central

```
┌─────────────────────────────────────────────────────────────┐
│  VPS Hetzner CX32 (~$8/mes · 4 vCPU · 8GB RAM)                │
│  Servidor 24/7 — corre todo el motor de fondo                 │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ n8n          │  │ OpenClaw     │  │ Ollama           │    │
│  │ orquestación │  │ interfaz     │  │ Phi-4 Mini       │    │
│  │ workflows    │  │ Telegram/WA  │  │ screening $0     │    │
│  │ cron 24/7    │  │ proactivo    │  │ clasificación    │    │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘    │
│         └─────────────────┴───────────────────┘              │
│                           │                                   │
│                  ┌────────▼────────┐                          │
│                  │ Supabase        │                          │
│                  │ (PostgreSQL)    │                          │
│                  │ papers/estado   │                          │
│                  └─────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
              │                              │
              ▼                              ▼
┌──────────────────────────┐   ┌──────────────────────────────┐
│ PC (i7-10700 · 16GB)     │   │ Mac Mini M4 16GB (futuro $599)│
│ Claude Max $200/mes      │   │ Ollama Llama 3.1 8B @ 35 tok/s│
│ trabajo intelectual      │   │ servidor LLM local dedicado   │
│ D:\motor_apex\ (scripts) │   │ migración no destructiva       │
└──────────────────────────┘   └──────────────────────────────┘
```

## 3.2 Especificaciones de hardware verificadas

**PC actual (DESKTOP-SI22B2P):**
- CPU: Intel i7-10700 @ 2.90GHz · 8 núcleos / 16 hilos
- RAM: 16 GB DDR4 (15.9 GB total · ~7.7 GB disponible en uso)
- GPU: sin dedicada → inferencia CPU únicamente
- OS: Windows 10 Pro
- Placa: Gigabyte B460M DS3H
- Capacidad Ollama: Llama 3.2 3B (~8 tok/s usable) · Llama 3.1 8B (~2-3 tok/s lento)

**Mac Mini M4 (recomendado, futuro):**
- M4 base 16GB: ~$599 → Llama 3.1 8B @ 28-35 tok/s (12x más rápido que el i7)
- Consumo: ~20W vs ~100W del PC → ahorro eléctrico real ~$70/año
- Memoria unificada: GPU+CPU+Neural Engine comparten pool
- Función: servidor Ollama dedicado 24/7, silencioso
- NO necesita el M4 Pro 48GB/64GB ($1,999-2,499) para este uso

## 3.3 Roles de cada componente del stack

| Componente | Costo | Rol exacto |
|-----------|-------|-----------|
| **VPS Hetzner CX32** | $8/mes | Servidor 24/7 de todo el motor de fondo |
| **n8n** | $0 (self-hosted) | Orquestación de workflows, cron, triggers |
| **Supabase** | $0 (plan free) | Base de papers, decisiones, estado de agentes |
| **Ollama + Phi-4 Mini** | $0 | Screening/clasificación repetitiva sin API |
| **OpenClaw** | $0 | Interfaz conversacional proactiva (Telegram) |
| **Claude Max** | $200/mes (ya pagado) | Orquestador + subagentes + QA (trabajo intelectual) |
| **Meta Business API** | $0 hasta 1k conv/mes | WhatsApp/Instagram empresa |

**Costo adicional total del sistema completo: $8/mes** sobre lo ya pagado.

---

# PARTE 4 — EL SISTEMA AGÉNTICO: DISEÑO CONCEPTUAL

## 4.1 Filosofía de diseño: orquestador + subagentes especializados

El sistema NO es un único agente que hace todo. Es una jerarquía donde un
**orquestador** planifica y delega a **subagentes** especializados, cada uno
con un brief autocontenido, sus fuentes requeridas, y su formato de salida.
Un **agente de QA** verifica antes de cada checkpoint humano.

## 4.2 Definición de roles (prompts de sistema conceptuales)

### Agente Orquestador
```
Nunca escribes secciones tú mismo. Dada una tarea (Línea, Fase, tipo de
output): (1) escribes un plan explícito a memoria; (2) lo descompones en
tareas de subagente independientes, cada una con brief autocontenido,
fuentes requeridas, y formato de salida; (3) despachas workers;
(4) integras retornos; (5) ruteas a QA. Aplicas el Filtro Mayo (≥32/40)
y el estándar de estructura argumentativa. Respetas los silos de líneas.
Defines presupuesto explícito (máx subagentes, máx llamadas a herramientas).
```

### Subagente Methods (ejemplo)
```
Escribe SOLO la sección Methods para [Línea X / output Z]. Usa PRISMA 2020
para SR. Declara diseño + muestra + setting + instrumentos + plan
estadístico con la cadena del programa (Shapiro-Wilk → Spearman; Kappa
ponderado κ>0.80; IC bootstrap). Output en inglés, formato de revista
[target]. No inventes citas; marca cualquier vacío factual como [VERIFY].
```

### Subagente References
```
Construye la lista de referencias SOLO desde fuentes presentes en el store
compartido `papers` (Supabase). Cada referencia debe ser un registro real
y recuperable (DOI/PMID). Marca ítems no verificables como [UNVERIFIED] —
nunca fabriques.
```

### Agente QA / Citación
```
Verifica antes del checkpoint humano: (a) cada afirmación sigue
diseño+n+país+institución+año+autor+revista; (b) ≥1 estudio peruano por
argumento o "ninguno existe" explícito; (c) todas las citas resuelven a
DOIs/PMIDs reales; (d) originalidad de paráfrasis (Turnitin-safe);
(e) cadena estadística coherente; (f) ensambla .docx anclando inserciones
DESPUÉS del campo TOC más externo de Word. Produce un reporte checklist.
```

## 4.3 Principio Human-in-the-Loop (HITL)

Las herramientas de IA aceleran screening y extracción, pero **el juicio
humano sigue siendo esencial** en: diseño de protocolo, decisiones de
inclusión finales, evaluación de calidad (RoB), y aprobación pre-envío.
El sistema usa checkpoints: el agente trabaja hasta un punto de decisión,
notifica al humano vía Telegram, y espera aprobación antes de continuar.

## 4.4 La distinción crítica: qué automatiza y qué no

**El sistema automatiza (sin intervención humana):**
- Búsqueda exhaustiva en todas las fuentes bibliográficas
- Deduplicación de resultados
- Pre-screening con IA local (clasificación binaria relevante/no)
- Descarga de PDFs de acceso abierto
- Organización en base de datos
- Generación de borradores de secciones
- Verificación de que las citas resuelven a DOIs reales

**El humano hace (insustituible):**
- Resolver conflictos de screening que la IA marca como dudosos
- Evaluación de riesgo de sesgo (requiere juicio clínico)
- Decisión final de inclusión/exclusión
- Revisión crítica del draft antes de enviar
- Negociación con revisores
- Aprobación en cada checkpoint

---

# PARTE 5 — EL MOTOR DE DESCUBRIMIENTO BIBLIOGRÁFICO
## (El componente más crítico del sistema)

## 5.1 El problema que resuelve

Los estándares de revistas como JEADV exigen que una revisión sistemática
cubra la literatura de las últimas décadas con **sensibilidad ≥90-97%** —
es decir, que prácticamente ningún estudio relevante se escape. En
dermatología estética, el volumen de literatura hace esto imposible de
hacer manualmente en 1 hora/día.

**Si la búsqueda se limita solo a PubMed, la revisión queda incompleta y
será rechazada.** PubMed es excelente pero parcial. Web of Science y Scopus
son potentes pero de acceso restringido (pago) y tampoco son exhaustivos
solos. La solución es un motor que combine múltiples fuentes, priorizando
la de mayor cobertura abierta.

## 5.2 La fuente troncal: OpenAlex (la organización sin fines de lucro)

**OpenAlex** es la base de datos académica abierta más grande del mundo,
creada y mantenida por **OurResearch**, una organización sin fines de lucro
(la "beneficencia" / fundación de búsqueda gratuita).

Datos verificados (2025-2026):
- Cobertura: 250M+ trabajos académicos (continuación expandida del extinto
  Microsoft Academic Graph).
- **Validación para SR:** un estudio de Stansfield et al. (Cochrane Evidence
  Synthesis Methods, 2025, DOI 10.1002/cesm.70038) encontró que de 131
  registros relevantes de una revisión sistemática, **128 (98%) estaban
  presentes en OpenAlex**.
- Cobertura de referencias comparable a Web of Science y Scopus en datasets
  recientes (Scientometrics, 2025).
- API gratuita y abierta (CC0). Desde feb 2026 requiere una API key gratuita.
- Permite búsquedas booleanas + búsqueda por citaciones e ítems relacionados.

**Por qué OpenAlex es el troncal:** es gratis, exhaustivo, tiene API para
automatización, y su cobertura para revisiones sistemáticas está validada
en literatura peer-reviewed por encima del 95%.

## 5.3 Arquitectura multi-fuente del motor (la "Capa 0 — Discovery")

El motor de descubrimiento corre la búsqueda en **5 fuentes complementarias**
que combinadas alcanzan ~97% de sensibilidad (estándar JEADV):

| Fuente | Cobertura | Acceso | Rol en el motor |
|--------|-----------|--------|-----------------|
| **OpenAlex** | 250M+ trabajos | API gratis (key) | Troncal — máxima cobertura abierta |
| **PubMed/MEDLINE** | 37M biomédicos | Entrez API gratis | Gold standard biomédico |
| **Europe PMC** | 43M+ (incl. Embase parcial) | API gratis | Cobertura europea + preprints |
| **LILACS/BVS** | Latinoamérica | API gratis | **Ventaja diferencial peruana/LATAM** |
| **Semantic Scholar** | 214M+ papers | API gratis | Complemento semántico + TLDR IA |

Fuentes de verificación manual complementaria (si la institución da acceso):
- **Cochrane CENTRAL** (ensayos clínicos · búsqueda web)
- **Embase completo** (vía institución o VPN académica)

**Flujo de la Capa 0:**
```
Query PICO → ejecuta en las 5 APIs simultáneamente (Python async)
          → consolida resultados en un CSV maestro
          → deduplica por DOI/PMID/título (≈33% duplicados es normal)
          → guarda registros únicos en Supabase (tabla `papers`)
          → reporta vía Telegram: "SR Línea X: N abstracts únicos listos"
```

## 5.4 Construcción de queries — ejemplo real (Línea 6, validación CADI)

```
("acne vulgaris"[MeSH] OR "acne"[tiab] OR "acne vulgaris"[tiab])
AND
("Cardiff Acne Disability Index"[tiab] OR "CADI"[tiab] OR
 "quality of life"[MeSH] OR "quality of life"[tiab] OR
 "dermatology life quality index"[tiab] OR "DLQI"[tiab] OR
 "patient reported outcome"[tiab])
AND
("validation"[tiab] OR "psychometric"[tiab] OR "reliability"[tiab] OR
 "validity"[tiab] OR "cross-cultural"[tiab] OR "adaptation"[tiab])
```

Parámetros obligatorios para PRISMA:
- Buscar desde **inception** (sin fecha de inicio límite)
- Idiomas: inglés, español, portugués, francés
- Sin límite de fecha de publicación final
- Cada fuente requiere su sintaxis propia (MeSH para PubMed, filtros para OpenAlex)

## 5.5 Esqueleto técnico del motor de búsqueda (Python)

```python
# Concepto de implementación — D:\motor_apex\discovery_engine.py
import asyncio, aiohttp
from Bio import Entrez
import pandas as pd

Entrez.email = "[email del usuario]"
OPENALEX_KEY = "[key gratuita]"

async def buscar_openalex(session, query):
    url = "https://api.openalex.org/works"
    params = {"search": query, "per-page": 200,
              "api_key": OPENALEX_KEY, "filter": "type:article"}
    # paginar con cursor hasta agotar resultados
    ...

async def buscar_pubmed(query):
    handle = Entrez.esearch(db="pubmed", term=query, retmax=2000)
    ...

async def buscar_europepmc(session, query):
    url = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
    ...

async def buscar_lilacs(session, query):
    url = "https://pesquisa.bvsalud.org/portal/api/rss"
    ...

async def buscar_semantic_scholar(session, query):
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    ...

async def discovery_completo(query_pico):
    async with aiohttp.ClientSession() as session:
        resultados = await asyncio.gather(
            buscar_openalex(session, query_pico),
            buscar_europepmc(session, query_pico),
            buscar_lilacs(session, query_pico),
            buscar_semantic_scholar(session, query_pico),
        )
    pubmed = buscar_pubmed(query_pico)  # síncrono
    todos = consolidar(resultados, pubmed)
    unicos = deduplicar(todos, claves=['doi','pmid','titulo_norm'])
    guardar_supabase(unicos)
    return f"{len(unicos)} registros únicos de {len(todos)} totales"
```

---

# PARTE 6 — ACCESO A TEXTO COMPLETO (PDFs)

## 6.1 El reto del acceso

Encontrar que un paper existe (metadato) es distinto de obtener su PDF para
leerlo. El motor debe maximizar el acceso a texto completo de forma legal
y exhaustiva.

## 6.2 Estrategia de acceso en cascada (legal primero)

```
Para cada paper incluido, el agente intenta en orden:
1. Unpaywall API (de OurResearch — misma org que OpenAlex, legal, gratis)
   → localiza versiones open-access legales del paper (>30M PDFs)
2. Europe PMC / PMC open access → texto completo de papers biomédicos
3. OpenAlex `open_access` field → ubicación OA si existe
4. Author manuscripts / preprints (medRxiv, bioRxiv, repositorios)
5. Repositorios institucionales (ALICIA-CONCYTEC para tesis peruanas)
6. Solicitud directa al autor (email automático "request reprint")
```

**Unpaywall** es la pieza clave del acceso legal: es de la misma organización
sin fines de lucro que OpenAlex, indexa más de 30 millones de PDFs de acceso
abierto legal, y tiene API gratuita. Se integra directamente con el flujo.

## 6.3 Sobre SciHub y herramientas de zona gris

Existen herramientas como SciHub que ofrecen acceso a papers tras paywall.
Su estatus legal es disputado y varía por jurisdicción. **El diseño del
sistema prioriza las rutas de acceso abierto legal** (Unpaywall, Europe PMC,
PMC, preprints) que en dermatología cubren la mayoría de la literatura
relevante. El agente debe agotar las vías legales antes de marcar un paper
como "texto completo no disponible" para gestión manual por el humano.

## 6.4 Herramientas de IA para lectura y extracción asistida

Una vez obtenidos los PDFs, herramientas de IA aceleran la comprensión y
extracción de datos (capa de lectura, complementaria a Claude):

| Herramienta | Cobertura | Fortaleza | Costo |
|------------|-----------|-----------|-------|
| **Elicit** | 138M papers | Pipeline real de screening SR (hasta 40k papers) + extracción en tablas | Free + Plus $12/mes |
| **SciSpace** | 280M papers | Chat with PDF + multi-fuente (Scholar+PubMed) + agentes biomedicina | Free + $12/mes |
| **Consensus** | 280M+ | Consensus meter + filtros Q1-Q4 + tipo de estudio | Free + $15/mes |
| **Semantic Scholar** | 214M+ | API gratis + resúmenes TLDR | $0 |

**Nota de diseño:** estas herramientas son complementarias. El motor propio
(OpenAlex + 4 fuentes) hace el descubrimiento exhaustivo reproducible que
exige PRISMA; las herramientas de IA aceleran la lectura y extracción una vez
que los papers están seleccionados. **Elicit** es la más relevante por tener
un pipeline de screening sistemático real con criterios de inclusión/exclusión.

---

# PARTE 7 — EL PIPELINE COMPLETO DE UNA REVISIÓN SISTEMÁTICA

## 7.1 Flujo de extremo a extremo (caso de uso completo)

```
1. ORQUESTADOR registra el plan + objetivo PICO + PROSPERO CRD
        ↓
2. DISCOVERY (Capa 0) corre búsqueda en 5 fuentes → dedup → Supabase
        ↓
3. SCREENING: Phi-4 Mini pre-filtra (clasificación binaria local, $0)
   → 2 "revisores" (agente + humano, o dos pases) deciden incluir/excluir
   → Kappa calculado en Python; conflictos → CHECKPOINT HUMANO
        ↓
4. FULL-TEXT: Unpaywall + cascada de acceso → PDFs a Supabase
   → revisión de texto completo de los que pasaron screening
        ↓
5. EXTRACCIÓN: subagente extrae tabla PICO + outcomes (Claude + verificación)
        ↓
6. EVALUACIÓN: RoB 2 (RCTs) / ROBINS-I (observacionales) → CHECKPOINT HUMANO
        ↓
7. SÍNTESIS: meta-análisis (forest + funnel plot en Python) o narrativa
   → GRADE por outcome (GRADEpro)
        ↓
8. REDACCIÓN: subagentes escriben Intro / Methods(PRISMA) / Results /
   Discussion / References (cada uno en su Claude Project especializado)
        ↓
9. QA verifica: PRISMA 27 ítems + GRADE + citas reales DOI/PMID + Turnitin
        ↓
10. ENSAMBLADO: .docx + supplementary (checklist PRISMA, PROSPERO CRD)
        ↓
11. CHECKPOINT HUMANO FINAL: Joseph verifica el Word → aprueba
        ↓
12. ENVÍO a revista (acción humana — el sistema nunca envía solo)
```

## 7.2 Los momentos de intervención humana (checkpoints)

El sistema corre autónomo entre checkpoints, pero **se detiene y notifica
vía Telegram** en estos puntos de decisión:
- Después de screening: resolver conflictos de inclusión dudosos
- Después de RoB: validar evaluación de calidad
- Antes del envío: revisión crítica final del manuscrito completo

## 7.3 Tiempo estimado por SR con el sistema vs sin él

| Etapa | Sin sistema (manual) | Con sistema agéntico |
|-------|---------------------|---------------------|
| Búsqueda 5 fuentes | 8-12 horas | minutos (automático) |
| Deduplicación | 3-4 horas | segundos (automático) |
| Screening 800 abstracts | 9-13 horas | 40-70 min (pre-filtrado) + validación |
| Acceso a PDFs | días | automático (cascada) |
| Extracción | 30 min/paper | 5 min/paper (asistido) |
| Forest plots | medio día | automático |
| Borradores secciones | semanas | horas (subagentes) |
| **Total primera SR** | 10-14 meses | 6-8 meses |

---

# PARTE 8 — ESTÁNDARES EDITORIALES NO NEGOCIABLES

## 8.1 Checklist anti-desk-rejection para SR

```
□ PROSPERO registrado (número CRD) ANTES de la búsqueda
  (gratis · york.ac.uk/prospero · 2-4 semanas de aprobación)
□ PRISMA 2020 (checklist 27 ítems + diagrama de flujo) como supplementary
□ GRADE (certeza de evidencia por outcome · GRADEpro online gratis)
  — obligatorio en Tier 1-2 (JEADV)
□ Kappa interobservador reportado con IC 95% (decisión incluir/excluir)
□ ≥3-5 bases de datos buscadas (el motor cubre 5 = 97% sensibilidad)
□ Forest plot + funnel plot (si hay meta-análisis)
□ Ethics statement: "No ethical approval required for systematic review"
□ Inglés académico pulido (edición profesional $200-400 si no nativo)
```

## 8.2 Jerarquía de revistas objetivo

**TIER 3 — Empezar aquí (2026-2027):**
| Revista | IF | APC | Nota |
|---------|-----|-----|------|
| JAAD International | 5.2 | Waiver LMIC | Primera publicación · familia AAD |
| Int. J. Dermatology | ~4.5 | $0 sin OA | Desk reject más bajo (~20%) |
| Skin Health & Disease | ~3.5 | $0 Diamond OA | Gratis autor y lector · EADV |

**TIER 2 — Target principal (2027-2030):**
| Revista | IF | APC | Nota |
|---------|-----|-----|------|
| **JEADV** | 8.4 | $0 sin OA | La mejor gratuita · exige GRADE |
| Dermatologic Surgery | ~4.5 | $0 sin OA | Leída por fellows de procedimientos |

**TIER 1 — Meta 2030-2035:**
| Revista | IF | Nota |
|---------|-----|------|
| JAAD | 12.8 | SR solo como Brief Report (~800 palabras) |
| JAMA Dermatology | ~11.8 | Flagship para Línea 8 (CNN) |
| BJD | ~11 | Muy exigente |

**Regla APC + LMIC:** Perú es país de ingreso medio-bajo (Banco Mundial) →
solicitar waiver de APC tras aceptación (reducción 50-100%). JEADV hybrid
sin OA cuesta $0 y pesa igual que Gold OA para CV y RENACYT.

## 8.3 Aclaración fundamental: bases de datos ≠ revistas

Scopus, PubMed y Web of Science son **bases de datos indexadoras**, NO
revistas. Se publica EN una revista (ej. JEADV) y esta queda indexada
automáticamente en PubMed + Scopus + WoS. Un paper en JEADV vale igual en
las tres simultáneamente.

---

# PARTE 9 — PROBABILIDADES DE RECHAZO Y MANEJO

## 9.1 Tasas reales por revista

| Revista | Desk reject | Aceptación final | Tiempo total |
|---------|------------|-----------------|--------------|
| JAAD principal | ~65% | ~10-15% | 4-12 meses |
| JEADV | ~60% | ~20-25% | 6-14 meses |
| JAAD International | ~35% | ~30-35% | 3-8 meses |
| Int. J. Dermatology | ~20% | ~40-45% | 3-7 meses |

## 9.2 Causas de rechazo (en orden de frecuencia)

1. **Falta de novedad** (desk reject 72h) → verificar SRs previas ANTES.
   Ventaja de Joseph: el ángulo latinoamericano/peruano es novedad real.
2. **Inglés deficiente** → edición profesional obligatoria para JEADV.
3. **PRISMA/PROSPERO/GRADE incompleto** → desk reject automático.
4. **Pocos estudios o heterogeneidad alta** (I²>75%) → considerar scoping review.
5. **Afiliación institucional débil** → mitigar con co-autores (Dr. Ciro +
   Prof. Finlay de Cardiff = credibilidad internacional).
6. **Segundo revisor no comprometido** → co-autoría como incentivo real.

## 9.3 Estrategia de cascada (waterfall)

Si una revista rechaza → incorporar TODOS los comentarios → reenviar a la
siguiente en jerarquía. El 82% de papers rechazados que incorporan cambios
terminan publicándose, frecuentemente en igual o mejor IF. **Nunca reenviar
el mismo manuscrito sin modificar.**

Cascada de la tesis: JAAD International → Int. J. Dermatology →
J. Derm. Treatment → Skin Health & Disease → Actas Dermosifiliográficas.
Probabilidad de no publicar en NINGUNA con metodología sólida: <5%.

---

# PARTE 10 — PLAN MAESTRO DE PUBLICACIÓN (TIEMPOS)

## 10.1 Paper 1 — Tesis → JAAD International (2026)

```
ABR 2026  Defensa tesis (✓)
MAY 2026  Traducción inglés + edición profesional ($200-400) + reformateo
JUN 2026  Envío vía Editorial Manager → primera decisión 4-8 semanas
JUL-DIC   Según escenario:
          A) Aceptación directa (~10%) → publicación en 4-5 meses
          B) Revisión mayor (~45%) → publicación en 8-9 meses
          C) Rechazo (~40%) → cascada → publicación en 7-8 meses vía alterna
```

## 10.2 SR 1 — Línea 6 CADI multicéntrico → JEADV (2026-2027)

```
MAY-JUN 2026  Contactar Prof. Finlay (Cardiff) + registrar PROSPERO + PICO
JUN-AGO 2026  Búsqueda 5 fuentes (motor) → screening → Kappa ≥0.80
AGO-OCT 2026  Extracción + RoB + GRADE
OCT-DIC 2026  Meta-análisis/síntesis + redacción + edición inglés
DIC-ENE 2027  Pre-submission enquiry + envío a JEADV
2027          Proceso editorial 8-14 semanas + revisión mayor
JUL 2027      SR publicada (escenario optimista) → ~14-16 meses desde inicio
```

## 10.3 Cronograma maestro 2026-2035

```
2026 → Tesis enviada + SR Línea 6 búsqueda completa + ENCAPS + SERUM
2027 → SR Línea 6 en JEADV + SR Línea 5 iniciada + USMLE Step 1
2028 → SRs Líneas 4+7 · 3-4 publicaciones acumuladas
2029 → Preparación MIR · 4-5 publicaciones · RENACYT Nivel V
2030 → MIR Top 50 → Clínic Barcelona · USMLE Step 2 >260
2030-2035 → Residencia + SR Línea 8 (CNN→JAMA Derm) + research elective USA
            6-8 publicaciones PubMed primer autor
2035 → Aplicación Fellowship Mayo Clinic
```

---

# PARTE 11 — CURVA DE APRENDIZAJE DESDE CERO

## 11.1 Fase 0 — Fundamentos (paralelo a tesis · bloque IA 30min/día)

```
Sem 1-2: Leer PRISMA 2020 completo · crear ORCID + Google Scholar
Sem 3-4: Leer 2 SRs de JEADV · instalar Zotero + Rayyan
Sem 5-6: Crear cuenta PROSPERO · tutorial GRADEpro (~3h)
Sem 7-8: Borrador traducción abstract tesis · identificar 2º revisor
Costo: $0 · ~20 horas
```

## 11.2 Fases 1-3 (resumen)

```
FASE 1 (2026): Publicar tesis · primera búsqueda SR real con el motor
FASE 2 (2027): Primera SR completa en JEADV
FASE 3 (2028+): Ritmo de crucero · 2 papers/año · 6-8 meses por paper
```

## 11.3 Realidad emocional de los primeros 2 años

El primer rechazo duele pero es el mejor peer review gratuito (normalmente
cuesta $2,000+ en investigación). El segundo ya no duele igual. Con el
paper #1 publicado, el proceso editorial deja de ser misterio. Con el #3,
hay track record para contactar colaboradores internacionales.

---

# PARTE 12 — RENACYT (CONCYTEC · registro Carlos Monge Medrano)

## 12.1 Sistema de puntos (ventana de 10 años)

| Actividad | Puntos |
|-----------|--------|
| Artículo Q1 (primer autor) | 4 pts |
| Artículo Q2 (primer autor) | 3 pts |
| Artículo Q3 (primer autor) | 2 pts |
| Artículo Q4/Scopus (primer autor) | 1 pt |
| Co-autor (cualquier quartil) | mitad del primer autor |
| Dirección tesis maestría | 2 pts c/u |

## 12.2 Niveles y ruta de Joseph

```
Nivel VII (≥2 pts): tesis en JAAD Int (Q2) → entrada directa
Nivel VI (≥5 pts): + SR Línea 6 en JEADV (Q1, 4pts) = 6 pts
Nivel V (≥10 pts): + SR Línea 5 (Q2, 3pts) + SR Línea 4 (Q2, 3pts) = 12 pts
```

Palanca: dirección de tesis de maestría (2 pts c/u) durante la residencia,
co-dirigiendo TFM.

---

# PARTE 13 — LAS 8 LÍNEAS DE INVESTIGACIÓN

```
Línea 0 — Tesis acné IGA×CADI Cocharcas → JAAD International (ACTIVA)
Línea 1 — Anatomía vascular facial peruana (Doppler) → Derm Surgery / PRS
Línea 2 — Envejecimiento facial peruanos → J Cosmetic Derm
Línea 3 — Fillers G-Prime alta vs baja (n=60) → J Cosmetic Derm
Línea 4 — Complicaciones inyectables PERÚ-SAFE (score 38/40) → JAAD/BJD
Línea 5 — RF fraccionada + PRP fototipos IV-V → Dermatologic Surgery
Línea 6 — Validación CADI multicéntrico Perú → JEADV (contactar Finlay)
Línea 7 — BTX maseterino peruanos → J Cosmetic Derm
Línea 8 — CNN clasificación acné (flagship) → JAMA Dermatology
```

**Regla de silos:** cada línea vive en su propio chat con scope explícito.
No más de 2 SRs activas simultáneamente.

**Colaboradores clave:**
- Dr. Ciro Jesús Rodríguez Aliaga → asesor, Gold Standard IGA (ancla nacional)
- Prof. Andrew Finlay (Cardiff) → creator CADI/DLQI → Línea 6 (multiplicador)
- Sebastian Cotofana → anatomía vascular → Línea 1

---

# PARTE 14 — QUÉ DEBE HACER LA APLICACIÓN WEB

## 14.1 Visión de la aplicación

Una interfaz web que sirva de **panel de control del sistema de investigación
agéntica**, donde Joseph en su hora de research (13:15-14:15) vea de un vistazo
el estado de todas sus SRs y tome decisiones en los checkpoints.

## 14.2 Funcionalidades núcleo que el constructor debe diseñar

```
1. DASHBOARD por línea de investigación
   - Estado de cada SR (discovery / screening / extracción / redacción / envío)
   - Número de papers encontrados, cribados, incluidos
   - Próximo checkpoint que requiere acción humana

2. COLA DE SCREENING
   - Papers pre-cribados por la IA local esperando validación humana
   - Interfaz de un clic: incluir / excluir / dudoso
   - Cálculo de Kappa en vivo

3. GESTOR DE PDFs
   - Estado de acceso a texto completo (encontrado/pendiente/manual)
   - Visor integrado de PDF con chat IA

4. EDITOR DE MANUSCRITO
   - Las secciones generadas por subagentes
   - Estado de QA (PRISMA, GRADE, citas verificadas)
   - Exportar a .docx

5. MONITOR DE PIPELINE
   - Workflows de n8n corriendo
   - Logs del motor de descubrimiento
   - Sincronización con Google Calendar (cuándo es research)

6. INTEGRACIÓN TELEGRAM
   - Notificaciones de checkpoints
   - Aprobaciones con botones desde el móvil
```

## 14.3 Stack sugerido para la app web

```
Frontend: React + Tailwind (panel de control)
Backend: el motor ya vive en VPS (n8n + Python + Supabase)
Base de datos: Supabase (ya existe — papers, estado, decisiones)
Autenticación: Supabase Auth
Tiempo real: Supabase Realtime (estado de pipeline en vivo)
Despliegue: VPS Hetzner o Vercel para el frontend
```

## 14.4 Principio de diseño de la app

La app NO reemplaza el trabajo intelectual — lo organiza. Es la capa de
visualización y control sobre el motor agéntico que corre en el VPS. El
objetivo es que en 1 hora de research, Joseph vea todo el estado, valide
los checkpoints pendientes, y deje el sistema corriendo para las siguientes
horas mientras él hace MIR, estudia, o duerme.

---

# PARTE 15 — REGLAS ABSOLUTAS DEL SISTEMA

```
SIEMPRE:
✓ Verificar SRs previas antes de proponer cualquier tema nuevo
✓ Exigir PROSPERO registrado antes de búsqueda formal
✓ Gap latinoamericano/peruano como diferencial en cada cover letter
✓ Búsqueda en ≥5 fuentes (nunca solo PubMed)
✓ Priorizar acceso abierto legal (Unpaywall) para texto completo
✓ Inglés académico profesional antes de enviar
✓ Filtro Mayo (≥32/40) en cada decisión de revista y método
✓ Checkpoints humanos en screening, RoB, y pre-envío

NUNCA:
✗ Fabricar datos, citas, o DOIs (límite absoluto)
✗ Limitarse solo a PubMed (revisión quedaría incompleta → rechazo)
✗ Revistas no indexadas en PubMed como "publicación"
✗ Reenviar sin modificar tras rechazo
✗ Iniciar >2 SRs simultáneamente
✗ Que el sistema envíe a revista sin aprobación humana
✗ APC sin verificar waiver LMIC disponible

SOBRE EL RECHAZO:
El rechazo no es el fracaso; el fracaso es no reenviar. El 82% de papers
que incorporan los cambios de los revisores terminan en igual o mejor IF.
```

---

# PARTE 16 — RESUMEN PARA EL CONSTRUCTOR DE ESTE MANUAL

Si eres el agente que va a construir la aplicación web y el sistema agéntico
a partir de este manual, esto es lo esencial que debes diseñar:

1. **Un motor de descubrimiento bibliográfico** que corra en Python sobre el
   VPS, busque en 5 fuentes (OpenAlex como troncal + PubMed + Europe PMC +
   LILACS + Semantic Scholar), deduplique, y guarde en Supabase. Esta es la
   pieza que garantiza la sensibilidad ≥90% que exigen los estándares JEADV.

2. **Una cascada de acceso a texto completo** legal (Unpaywall + Europe PMC +
   PMC + preprints + repositorios) para obtener los PDFs automáticamente.

3. **Un sistema de screening de dos capas:** Phi-4 Mini local (clasificación
   binaria gratis) → validación humana de los dudosos → Kappa en Python.

4. **Una jerarquía de agentes** (orquestador + subagentes de Methods, Results,
   Discussion, References + QA) que generen el manuscrito PRISMA-compliant,
   nunca fabricando citas, siempre verificando DOIs reales.

5. **Orquestación con n8n** corriendo 24/7, sincronizada con Google Calendar,
   de modo que el trabajo pesado ocurra antes del bloque de research humano.

6. **Una app web (React + Supabase)** como panel de control donde el humano
   valide checkpoints en su hora diaria de investigación.

7. **Integración Telegram** (vía OpenClaw o bot directo) para notificaciones
   y aprobaciones móviles.

El sistema debe profundizar y verificar cada herramienta contra su estado
actual al momento de construcción, porque las APIs, coberturas y precios
cambian. Este manual es el plano conceptual; el código es tarea del constructor.

---

*Manual Maestro v3.0 · Consolidación completa del proyecto*
*Joseph Max Soto Tocas · El Tambo, Huancayo, Perú · Abril 2026*
*Documento de lectura estructural — listo para copiar a otro chat o Claude Code*
*Verificar herramientas, APIs y estándares contra su estado actual al construir*
