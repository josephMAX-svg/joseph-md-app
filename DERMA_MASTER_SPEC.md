# DERMA · MASTER SPEC

**Documento maestro de desarrollo + conocimiento para el módulo `Derma` (dermatología estética)**
**Destinatario primario:** Claude Code (build) · **Destinatario secundario:** H (estudio diario)
**Versión:** 1.0 · **Formato:** fuente de verdad para generar pantallas, datos y plan de estudio intradiario dentro de `joseph-md-app`.

---

## 0. CÓMO USAR ESTE DOCUMENTO

Este `.md` tiene dos lectores:

1. **Claude Code** lo usa como *spec*: de aquí salen el modelo de datos, las pantallas a diseñar dentro de `Derma`, y la lógica del motor de estudio diario (espejo del motor `Study` que ya existe con plan diario + repaso espaciado D+1/3/7/14/28). Claude Code ya conoce la interfaz; lo que aporta este documento es **qué enseñar, en qué orden, anclado a qué referente, y cómo medir maestría**.
2. **H** lo usa como mapa mental del experto: la secuencia de razonamiento que recorre un dermatólogo estético élite para cualquier motivo de consulta, y los guiones para hablar con el paciente y cambiarle hábitos.

> **Regla de oro del proyecto (heredada del módulo Derma):** primero el *alfabeto* (lesiones + semiología), luego el 80/20 de la consulta, luego *lo que no puedes errar* (vascular/ceguera/oncología), y la correlación **clínica → dermatoscópica → histológica** del mismo caso es lo que distingue a la élite. Estética = capa que se monta **encima** de esa base, nunca sin ella.

---

## 1. NORTE / FILOSOFÍA — el mecanismo mental del experto

El no-experto piensa en **síntomas** ("esta arruga", "este grano"). El experto piensa en **causa → mecanismo → cascada de decisión → comunicación → hábito**. Esa es la diferencia que este módulo debe instalar.

Cuatro principios que atraviesan todos los bloques:

1. **Tratar la causa, no la arruga.** La cara no "tiene líneas": pierde hueso, reabsorbe grasa por compartimentos, afloja ligamentos de retención y desciende. La línea es el *humo*; el fuego es la pérdida estructural. (de Maio, Carruthers)
2. **Pensar en capas, no en superficie.** Toda decisión inyectable o lumínica empieza por *¿en qué plano estoy y qué hay debajo?* (Cotofana). La seguridad nace de la anatomía 3D, no de la técnica de mano.
3. **Lo que no puedes errar manda sobre lo que quieres lograr.** Antes de buscar el resultado bonito, el experto ya tiene precableado el árbol de la catástrofe (oclusión vascular → ceguera/necrosis) y su rescate. (DeLorenzi)
4. **El resultado clínico vive o muere en la conversación.** Diagnóstico perfecto + paciente que no entiende ni cumple = fracaso. El experto diseña la consulta como un acto de traducción y de cambio de conducta. (Global Alliance / de Maio MD ASA)

**Mantra operativo para el app:** *Causa antes que síntoma · Capa antes que superficie · Seguridad antes que belleza · Conversación antes que prescripción.*

---

## 2. PANEL DE REFERENTES (authority graph)

Cada bloque del currículum se ancla a un referente. Para cada uno: **mecanismo mental**, **método/framework firma**, **fuente nº1** y **qué buscar para profundizar**. Claude Code debe modelar esto como entidad `Authority` (ver §7) y mostrar, en cada subtema, "según quién" se está estudiando.

### 2.1 Anatomía / topografía / planos seguros → **Sebastian Cotofana**
- **Por qué él:** anatomista facial de referencia mundial; profesor en Mayo Clinic College of Medicine — alineado con tu "camino a Mayo".
- **Mecanismo mental:** no ve "una zona", ve **un sándwich de capas** (piel → grasa subcutánea → SMAS/músculo → espacios profundos → periostio) y la red arterial 3D que la atraviesa. Antes de cualquier punto pregunta: *¿plano? ¿qué arteria/vena/nervio viaja aquí? ¿es zona de fuga hacia la oftálmica?*
- **Framework firma:** zonas de peligro vs. **zonas seguras** vasculares por región (mejor pensar "dónde sí" que solo "dónde no"). Nariz = región nº1 de riesgo de ceguera por su conexión con la circulación oftálmica. Temple = 10 capas, 4 arterias.
- **Fuente nº1:** *Cotofana Anatomy* (curso por disección por región) + sus papers de *Vascular Safe Zones* (Aesthetic Surgery Journal).
- **Profundizar (YouTube/primarias):** disecciones por región (temple, midface lateral, mentón, mandíbula, nariz); concepto de planos fasciales y transmisión de fuerza temple→mandíbula.

### 2.2 Volumen / rellenos / análisis facial → **Mauricio de Maio**
- **Por qué él:** convirtió la inyección de instinto en sistema reproducible (MD Codes™), con lenguaje anatómico compartido.
- **Mecanismo mental — MD ASA (Multi-Dimensional Aesthetic Scan):** cinco jerarquías de tamiz:
  - **H1** = aleja al paciente de "distracciones" (líneas sueltas) hacia los **8 Atributos Emocionales**: negativos (cansado, triste, enojado, caído) / positivos (joven, atractivo, contorneado, femenino-masculino). Se eligen **3 atributos prioritarios** por paciente.
  - **H2** = tercios faciales · **H3** = dinámica periorbital y perioral · **H4** = unidades faciales · **H5** = subunidades.
  - El resultado se traduce a **ecuación MD Codes** → fórmula de tratamiento.
- **Framework firma:** **MD Codes** (códigos por subunidad: p. ej. Ck1–Ck5 mejilla, T1–T2 temple, Tt1–Tt3 surco lagrimal) como *checklist* anatómico, no secuencia. **Myomodulation / MD DYNA Codes**: usar relleno para modular la acción muscular. Secuenciar primero el **fundamento** (mediofacial) y luego refinar.
- **Fuente nº1:** *Injectable Fillers in Aesthetic Medicine* (de Maio & Rzany, Springer) + paper "MD Codes: A Methodological Approach…" (Aesthetic Plastic Surgery).
- **Profundizar:** algoritmos por *shape* facial (redonda, cuadrada, triangular, etc.); concepto de "mother–daughter–grandmother" para enseñar severidad de déficit.

### 2.3 Toxina botulínica → **Jean & Alastair Carruthers**
- **Por qué ellos:** co-fundadores del uso cosmético del BOTOX (1987); editores de la serie de referencia práctica.
- **Mecanismo mental:** mapear **músculo → vector de tracción → arruga dinámica**, dosificar por la función (no por la línea), y respetar la interacción de fuerzas (debilitar un músculo libera a su antagonista → de ahí trucos como el *Nefertiti lift* o el descenso de cola de ceja). Pensar en **unidades por punto** y en difusión.
- **Framework firma:** descripción punto-por-punto con racional para cada zona (glabela, frontal, periocular, masetero, cuello, hiperhidrosis), tablas de conversión entre productos, y diagramas de flujo para eventos adversos.
- **Fuente nº1:** **Procedures in Cosmetic Dermatology: *Botulinum Toxin*, 5.ª ed.** (Carruthers, Carruthers; serie ed. Dover & Alam) — con biblioteca de video de técnicas.
- **Profundizar:** masetero/bruxismo, sonrisa gingival, *lip flip*, platysma; daxibotulinumtoxinA y toxina tópica como novedades.

### 2.4 Complicaciones vasculares / rescate → **Claudio DeLorenzi**
- **Por qué él:** definió el estándar moderno de rescate de oclusión por relleno.
- **Mecanismo mental:** el experto vive con el árbol de la catástrofe precableado. *Blanqueo* = primer signo; dolor puede faltar. La arteria ocluida por HA necesita **inundarse** de hialuronidasa hasta hidrolizar todo el bloque de tejido.
- **Framework firma — High Dose Pulsed Hyaluronidase (HDPH):** dosis altas repetidas **cada hora** hasta resolución de isquemia (sin dolor, color normal, buen relleno capilar). Dosis orientativa ~450 UI por "área" de bajo volumen; ~900 UI si afecta una segunda zona (p. ej. nariz). Simplicidad deliberada: solo hialuronidasa; compresas/AAS/nitroglicerina **no** son el motor del rescate.
- **Fuente nº1:** DeLorenzi C., *New High Dose Pulsed Hyaluronidase Protocol…* (Aesthetic Surgery Journal, 2017) + *Complications of Injectable Fillers Part I/II*.
- **Profundizar:** consenso de pérdida visual embólica (Goodman/Magnusson 2020), hialuronidasa guiada por ecografía, kit de emergencia (FEK). **Esta sección es CRÍTICA: el app debe tratarla como "no puedes errar".**

### 2.5 Equipos basados en energía (láser/IPL/RF/HIFU) → **R. Rox Anderson** (cimiento) + **Roy Geronemus / Neil Sadick / Tina Alster** (aplicación)
- **Por qué ellos:** Anderson & Parrish = la física madre; Geronemus/Sadick/Alster = aplicación clínica y fraccional.
- **Mecanismo mental:** todo lo lumínico se reduce a **fototermólisis selectiva**: elegir la **longitud de onda** que absorbe el cromóforo objetivo (melanina, hemoglobina, agua, tinta), con un **pulso más corto que el tiempo de relajación térmica** del objetivo para dañarlo sin cocer alrededor. Fraccional = columnas microscópicas de daño con piel sana intercalada → cicatriza rápido.
- **Framework firma:** decisión por **cromóforo → longitud de onda → duración de pulso → enfriamiento → fototipo (Fitzpatrick)**. Ablativo vs no ablativo; fraccional vs total.
- **Fuente nº1:** Anderson RR, Parrish JA, *Selective Photothermolysis* (Science, 1983); Manstein/Anderson, *Fractional Photothermolysis* (2004); **Procedures in Cosmetic Dermatology: *Lasers, Lights, and Energy Devices*, 5.ª ed.**
- **Profundizar:** protocolos combinados, RF microneedling, HIFU, criolipólisis; seguridad en piel de color (riesgo de PIH).

### 2.6 Acné + tesis (cambio de hábito y adherencia) → **Global Alliance to Improve Outcomes in Acne** (Thiboutot, Dréno, Leyden, Layton, Gollnick, Kang)
- **Por qué ellos:** el consenso internacional de manejo práctico, con foco explícito en *adherencia* y vida real.
- **Mecanismo mental:** el acné es **enfermedad inflamatoria crónica**; el experto trata la **cascada** (microcomedón → hiperqueratinización → *C. acnes* → inflamación → cicatriz/PIH), no el grano del día. Combina mecanismos complementarios (retinoide tópico + antimicrobiano/BPO) desde el inicio, limita antibióticos, y **diseña la adherencia** porque sabe que ahí se pierde el caso.
- **Framework firma:** terapia combinada de primera línea; retinoide como base que actúa sobre el microcomedón; BPO para limitar resistencia; isotretinoína para nódulo-quístico/resistente con su programa de seguridad; **clasificar** (IGA / Glogau para cicatriz / Fitzpatrick) para medir y comunicar.
- **Fuente nº1:** Thiboutot, Dréno et al., *Practical Management of Acne for Clinicians* (JAAD, 2018, Global Alliance).
- **Profundizar:** adherencia (Dréno, estudios de cumplimiento), psicodermatología/impacto en calidad de vida (CADI), correlación con tu deliverable de tesis (CADI/IGA, Spearman).

> **Nota de honestidad intelectual para el app:** los *mecanismos mentales* de arriba están parafraseados de fuentes verificadas; los **números y dosis** (p. ej. UI de hialuronidasa) deben confirmarse siempre contra la fuente primaria dentro de cada ficha. El módulo de investigación (§8) existe justo para esto.

---

## 3. EL "CEREBRO CLÍNICO" — plantilla de razonamiento maestro reproducible

Esto es lo más importante que debe *enseñar* el app: no datos sueltos, sino la **secuencia que recorre un experto para cualquier motivo de consulta**. Claude Code debe convertir esto en una *plantilla* que se rellena por cada subtema (campo `reasoning_template` en el modelo de datos).

### 3.1 La secuencia maestra (7 pasos, igual para acné, volumen, láser, etc.)

1. **CAUSA** — ¿qué proceso real produce lo que veo? (no la queja literal del paciente)
2. **MECANISMO** — ¿por qué pasa, a nivel de tejido/fisiología? (la cascada)
3. **CAPA / ANATOMÍA** — ¿en qué plano vivo? ¿qué hay debajo? ¿qué no puedo tocar?
4. **DECISIÓN** — árbol: opciones, primera línea, criterios de elección, secuenciación.
5. **LO QUE NO PUEDO ERRAR** — la catástrofe específica de este tema y su rescate, precableado.
6. **COMUNICACIÓN** — cómo lo traduzco al paciente (qué digo, qué dibujo, qué expectativa fijo).
7. **HÁBITO / SEGUIMIENTO** — qué cambia el paciente en casa, cómo aseguro adherencia, cuándo reviso, cómo mido.

Cada subtema del currículo debe tener estos 7 campos llenos. Un subtema **no se considera dominado** hasta que H pueda recitar los 7 de memoria (mastery gate, §6).

### 3.2 Ejemplo desarrollado — ACNÉ (modelo de cómo debe verse CADA subtema)

> Este es el formato exacto que Claude Code debe replicar para los 54 subtemas.

- **1 · Causa:** no es "grasa" ni "suciedad". Es un trastorno de la unidad pilosebácea con base hormonal/inflamatoria.
- **2 · Mecanismo (cascada):** hiperqueratinización del infundíbulo → microcomedón → atrapamiento de sebo → proliferación de *C. acnes* y activación inmune → inflamación → pápula/pústula/nódulo → riesgo de cicatriz atrófica y PIH (sobre todo en fototipos altos / piel peruana).
- **3 · Capa/Anatomía:** glándula sebácea, infundíbulo folicular, dermis (donde se juega la cicatriz). Mapear distribución (cara vs tronco) cambia abordaje.
- **4 · Decisión (árbol, según Global Alliance):**
  - Leve-moderado: **retinoide tópico + BPO** (± antibiótico tópico) de entrada — atacar varios mecanismos a la vez.
  - Moderado-severo: añadir oral; **limitar antibióticos** en tiempo y siempre con BPO para frenar resistencia; considerar hormonal en mujeres.
  - Nódulo-quístico / resistente / con cicatriz: **isotretinoína** con su programa de seguridad (laboratorios, embarazo).
  - **Clasificar siempre** (IGA, Glogau para cicatriz, Fitzpatrick) para medir respuesta y comunicar.
- **5 · Lo que no puedo errar:** no dejar progresar a cicatriz por "esperar a ver"; teratogenicidad de isotretinoína; no monoterapia prolongada de antibiótico.
- **6 · Comunicación (guion):** "El acné es una enfermedad de la piel, no falta de higiene — lavarse más empeora. Es crónica: vamos a controlarla, no a curarla en una semana. Las primeras 4–8 semanas la piel puede irritarse o verse peor antes de mejorar; eso es esperado y NO es para abandonar." Dibujar el folículo. Fijar expectativa de **tiempo** (esto es lo que más rompe la adherencia).
- **7 · Hábito/Seguimiento:** rutina mínima viable (limpiador suave, el activo, **fotoprotección obligatoria** por PIH), aplicar producto sobre toda la zona y no solo el grano, "empezar lento" con el retinoide (noches alternas) para tolerar; revisión a las 6–8 semanas con foto estandarizada; medir IGA. Anticipar y nombrar los efectos para que no sorprendan = la palanca nº1 de cumplimiento.

> **Esto es lo que pediste:** el experto ya tiene "todo el tratamiento, qué decir, cómo cambiar hábitos" precableado. El app debe entrenar a H hasta que ese cableado sea automático para cada tema.

---

## 4. CAPA DE COMUNICACIÓN Y CAMBIO DE HÁBITO (transversal)

El conocimiento que no se transmite no cura. Esta capa debe existir como **módulo propio dentro de Derma** y como **campo en cada subtema** (`patient_script`).

### 4.1 Estructura de consulta (fusión de MD ASA + práctica clínica)
1. **Escuchar la queja literal** y reformularla a **mensaje emocional** ("me veo cansada" → no es el surco, es el conjunto). (de Maio H1)
2. **Reencuadrar de síntoma a causa** con un dibujo simple (cara que pierde estructura / folículo inflamado).
3. **Priorizar** 3 objetivos máximos; gestionar expectativa de tiempo y de "antes/después realista".
4. **Plan por etapas** explícito (qué hoy, qué después, por qué ese orden).
5. **Consentir informado de verdad:** nombrar la complicación seria con calma y el plan de rescate (paradójicamente *aumenta* la confianza).
6. **Cierre con la tarea de casa** y el criterio de revisión.

### 4.2 Principios de adherencia (Global Alliance)
- La adherencia es **el** punto de fuga en crónicos como el acné: simplificar la rutina, anticipar los efectos iniciales, y dar un horizonte temporal claro suben el cumplimiento.
- **Menos pasos = más cumplimiento.** Una rutina de 3 pasos que se hace gana a una de 7 que se abandona.
- **Foto estandarizada** cada visita: convierte lo subjetivo en progreso visible → motiva.

### 4.3 Banco de guiones (el app debe almacenarlos por tema, editables)
Ejemplos de "frases ancla" que el experto reutiliza:
- Crónico: *"No lo curamos hoy; lo ponemos bajo control y lo mantenemos."*
- Peor-antes-de-mejor: *"Las primeras semanas la piel se queja. Eso significa que está funcionando, no que falla."*
- Expectativa de relleno: *"No vamos a cambiarte la cara; vamos a devolverte lo que el tiempo movió."*
- Seguridad: *"Esto es muy seguro porque sé exactamente qué hay debajo y tengo el plan si algo no va bien."*

---

## 5. MAPA DE CONOCIMIENTO (bloques A–G → subtemas)

Espejo de tu mapa actual (54 subtemas, 7 bloques A–G, 21 críticos). Claude Code debe renderizarlo como árbol con: criticidad (🔴 crítico / 🟡 / 🟢), referente ancla, y estado (0–100% maestría). Estructura propuesta (ajustable a tus 54):

- **A · Fundamentos / lenguaje dermatológico** (🔴 base) — semiología, lesiones elementales, Fitzpatrick, fototipos en piel peruana. *Ancla: base clínica.*
- **B · Anatomía facial 3D y planos seguros** (🔴) — 5 capas, compartimentos grasos, ligamentos de retención, arterias, zonas de peligro/seguras, reabsorción ósea. *Ancla: Cotofana.*
- **C · Análisis facial y envejecimiento estructural** (🟡) — tercios, cánones, proporción áurea, SMAS, MD ASA, análisis étnico. *Ancla: de Maio.*
- **D · Inyectables y reología** (🟡) — G-prime, cohesividad, tipos de HA, bioestimuladores, selección por zona, MD Codes, myomodulation. *Ancla: de Maio / Carruthers.*
- **E · Toxina botulínica** (🟡) — mecanismo, serotipos, conversión de unidades, protocolos tercio superior/medio/inferior, Nefertiti, hiperhidrosis. *Ancla: Carruthers.*
- **F · Complicaciones y rescate** (🔴🔴 no puedes errar) — oclusión vascular, HDPH (DeLorenzi), Tyndall, biofilm, anafilaxia, necrosis, ceguera. *Ancla: DeLorenzi.*
- **G · Equipos de energía** (🟡) — fototermólisis selectiva, ablativo/no ablativo/fraccional, RF, HIFU, IPL, microneedling, criolipólisis, combinados. *Ancla: Anderson/Geronemus.*
- **(+) Acné + tesis** — manejo basado en mecanismo, adherencia, IGA/CADI, Spearman. *Ancla: Global Alliance.* (puede vivir en A/clínica o como bloque propio).

Cada subtema lleva: `reasoning_template` (los 7 pasos, §3), `patient_script` (§4), `authority_id`, `criticality`, `sources[]`, y `correlation` (clínica↔dermatoscópica↔histológica cuando aplique).

---

## 6. MOTOR DE ESTUDIO DIARIO / INTRADIARIO (espejo de `Study`)

Esto define **qué hace H cada día**, igual que en el módulo Study hoy aparece "II-3 Vacunación · hoy" + cola + próximos días. Claude Code debe portar esa lógica a Derma.

### 6.1 Generación del "Plan del día"
Cada día el motor produce:
- **1 Tema-foco del día** (el subtema del que se generan los APEX del día).
- **Cola de práctica** (3–6 ítems) en orden de prioridad: cada ítem puede ser de su propio tema/día-foco (no todos son del tema del día), como ya hace tu cola QX.
- **Repaso espaciado**: temas vistos reaparecen a **D+1 / D+3 / D+7 / D+14 / D+28** (idéntico al motor actual).
- **Estado del día**: "Hechos hoy X/N · %".

### 6.2 Secuencia intradiaria por subtema (la "línea de acción")
Para cada tema-foco, el día se recorre así:
1. **Encuadre (2 min):** "según [referente], el mecanismo de hoy es…"
2. **Deep dive** del subtema con los **7 pasos** del Cerebro Clínico (§3).
3. **Correlación** (cuando aplique): mismo caso en clínica → dermatoscopia → histología.
4. **Drill de comunicación:** H redacta/recita el `patient_script` del tema.
5. **Quiz / escenario cronometrado:** caso aplicado (incl. un escenario de complicación si el bloque es F).
6. **APEX cards** generadas de los errores del día (alimenta `APEX Queue`).
7. **Dictate error:** H dicta dónde falló → el motor crea repaso dirigido (espejo de tu botón "Dictate Error").

### 6.3 Mastery gate (cuándo un subtema cuenta como "completado")
Un subtema sube a 100% solo si H, sin mirar:
- recita los **7 pasos** del razonamiento,
- da el **árbol de decisión** correcto,
- nombra **la catástrofe + su rescate**,
- entrega el **guion de paciente**.
Hasta entonces queda en repaso espaciado. (Esto conecta con el contador "subtopics completed" del dashboard.)

### 6.4 Modos de estudio (reutilizar los que ya usa H)
`Modo A` (drill rápido), memory challenge, quiz mode, escenarios cronometrados, deep dive, **APEX BLOCK** para zonas de confusión, *safe-plane breakdown* (bloque B/F), *draw challenge* (anatomía/iPad). El app ya los soporta en Study; portarlos a Derma.

### 6.5 Vista "próximos 7 días"
Igual que Study muestra el horizonte semanal, Derma debe pre-secuenciar 7 días respetando: criticidad (críticos primero), dependencias (no tocar D/E/F sin B), y la carga de repaso espaciado pendiente.

---

## 7. ESQUEMA DE DATOS (para que Claude Code construya)

Modelo mínimo (TypeScript-like; adaptar al stack real del app):

```ts
type Criticality = "critical_no_err" | "critical" | "high" | "normal";

interface Authority {
  id: string;            // "cotofana"
  name: string;          // "Sebastian Cotofana"
  domain: string;        // "Anatomía facial / planos seguros"
  mentalModel: string;   // cómo razona (1-3 frases)
  signatureFramework: string;
  primarySource: string; // libro/paper nº1
  goDeeper: string[];    // qué buscar (video/primaria)
}

interface Subtopic {
  id: string;            // "F-3-oclusion-vascular"
  blockId: "A"|"B"|"C"|"D"|"E"|"F"|"G"|"ACNE";
  title: string;
  criticality: Criticality;
  authorityId: string;
  reasoning: {           // los 7 pasos del Cerebro Clínico (§3)
    causa: string; mecanismo: string; capaAnatomia: string;
    decision: string; noPuedoErrar: string; comunicacion: string; habitoSeguimiento: string;
  };
  patientScript: string;
  sources: string[];
  correlation?: { clinica: string; dermatoscopia: string; histologia: string };
  mastery: number;       // 0-100
  srsState: { lastSeen: string; nextDue: string; interval: 1|3|7|14|28 };
}

interface DayPlan {
  date: string;
  focusSubtopicId: string;
  queue: string[];       // subtopic ids, en prioridad
  spacedReview: string[];// subtopic ids vencidos hoy
  doneCount: number; totalCount: number;
}
```

Reglas del motor: `nextDue` avanza por la escalera SRS solo si el `mastery gate` (§6.3) se cumple; si H falla, el intervalo se reinicia o retrocede.

---

## 8. MOTOR DE INVESTIGACIÓN CONTINUA (research pipeline)

El módulo no debe ser estático: debe **seguir investigando**. Diseño:

- **Botón "Profundizar" en cada subtema** → genera consultas dirigidas a fuentes primarias (PubMed, libros de la serie *Procedures in Cosmetic Dermatology*, cursos del referente) y a video (disecciones de Cotofana, charlas de de Maio/Carruthers).
- **Cola de "fuentes por verificar"**: cada dato numérico (dosis, % , parámetros láser) entra con flag `verify` hasta cotejarse contra primaria → cuando se confirma, se cita.
- **Captura de novedades**: campo `lastReviewed` por subtema; lo que pasa de X meses se marca para re-chequeo (la estética cambia rápido: nuevas toxinas, bioestimuladores, devices).
- **Conexión con tu tesis (acné):** pipeline específico para CADI/IGA + correlación de Spearman, con plantilla de análisis estadístico.
- **Integración sugerida:** dado que ya tienes conectores (PubMed, Notion, Drive), el pipeline puede empujar fichas verificadas a Notion y traer PDFs desde Drive.

> **Importante:** el app debe distinguir visualmente *mecanismo mental enseñable* (estable) de *parámetro clínico* (debe re-verificarse). Nunca presentar una dosis como definitiva sin su fuente.

---

## 9. PANTALLAS QUE CLAUDE CODE DEBE DISEÑAR DENTRO DE `Derma`

1. **Dashboard Derma** (ya existe): añadir "maestría por bloque A–G", contador real de `subtopics completed`, y "tema-foco de hoy".
2. **Plan del día** (espejo de Study): tema-foco + cola + repaso espaciado + barra "Hechos hoy".
3. **Ficha de subtema**: los 7 pasos del Cerebro Clínico + guion de paciente + correlación + fuentes + botón "Profundizar".
4. **Panel de Referentes**: tarjeta por autoridad con mecanismo mental y fuente nº1.
5. **Modo escenario / complicación** (bloque F): simulador cronometrado de oclusión vascular → exige recitar HDPH.
6. **Banco de guiones de paciente** (capa de comunicación), editable.
7. **Research queue** + estado de verificación de datos.
8. **Vista 7 días** con dependencias y carga de repaso.

---

## 10. PROMPT PARA CLAUDE CODE (pegar tal cual)

> **Rol:** Eres el desarrollador del módulo `Derma` dentro de mi app `joseph-md-app` (Next.js/Vercel). Ya conoces mi sistema de diseño y el motor `Study` (plan diario, cola, repaso espaciado D+1/3/7/14/28, APEX cards, dictate error, modos A/quiz/escenario).
>
> **Objetivo:** Construir el módulo `Derma` de dermatología estética como un motor de estudio diario e intradiario que entrene no solo conocimiento sino el *mecanismo mental* del experto y la comunicación con el paciente, usando como fuente de verdad el documento `DERMA_MASTER_SPEC.md`.
>
> **Haz esto, en orden:**
> 1. Implementa el modelo de datos de §7 (`Authority`, `Subtopic`, `DayPlan`) y siembra las entidades `Authority` de §2 (Cotofana, de Maio, Carruthers, DeLorenzi, Anderson/Geronemus, Global Alliance).
> 2. Crea el mapa de bloques A–G + Acné de §5 con sus subtemas; deja cada subtema con la plantilla de 7 pasos (§3) y `patient_script` (§4) vacíos pero estructurados, marcando criticidad (F y B = "no puedes errar").
> 3. Implementa el **motor de plan diario** de §6: tema-foco + cola + repaso espaciado + mastery gate (§6.3). Reusa la lógica SRS del módulo Study.
> 4. Construye las pantallas de §9, empezando por **Ficha de subtema** (los 7 pasos + guion + fuentes + "Profundizar") y **Plan del día**.
> 5. Implementa el **research pipeline** de §8 con el flag `verify` para todo dato numérico y botón "Profundizar" por subtema (conectores PubMed/Notion/Drive si están disponibles).
> 6. Para el contenido de cada subtema, usa el **ejemplo de Acné de §3.2 como formato canónico**: replica esa profundidad para los demás temas, pero deja todo dato clínico/numérico con su fuente y con `verify` hasta cotejarse contra la fuente primaria del referente.
>
> **Reglas no negociables:**
> - Nunca presentes una dosis/parámetro como definitivo sin fuente primaria; márcalo `verify`.
> - Un subtema solo llega a 100% si pasa el mastery gate (recitar los 7 pasos + árbol + catástrofe/rescate + guion).
> - Distingue visualmente "mecanismo mental" (estable) de "parámetro clínico" (re-verificable).
> - El bloque F (complicaciones) y B (anatomía/planos) tienen prioridad de secuenciación: no habilites D/E/F sin B.
>
> **Entregable:** el módulo `Derma` navegable, con al menos el bloque de Acné y el bloque F (complicaciones) completos a nivel de demostración, y el resto estructurado y listo para que yo lo vaya llenando con "Profundizar".

---

### Apéndice · Fuentes nº1 por dominio (para el pipeline)
- Anatomía/seguridad: **Cotofana** — *Cotofana Anatomy*; *Vascular Safe Zones for Facial Soft Tissue Filler Injections* (ASJ).
- Volumen/análisis: **de Maio** — *Injectable Fillers in Aesthetic Medicine* (Springer); *MD Codes: A Methodological Approach* (Aesthetic Plastic Surgery); *MD ASA*.
- Toxina y rellenos: **Carruthers** — *Procedures in Cosmetic Dermatology: Botulinum Toxin* (5ª ed.) y *Soft Tissue Augmentation* (5ª ed.).
- Complicaciones: **DeLorenzi** — *New High Dose Pulsed Hyaluronidase Protocol* (ASJ, 2017); *Complications of Injectable Fillers I/II*.
- Energía: **Anderson & Parrish** — *Selective Photothermolysis* (Science, 1983); Manstein/Anderson *Fractional Photothermolysis* (2004); *Lasers, Lights, and Energy Devices* (5ª ed.).
- Acné/adherencia: **Global Alliance** (Thiboutot, Dréno) — *Practical Management of Acne for Clinicians* (JAAD, 2018).

---

## APÉNDICE · DATA VERIFICADA (jun-2026)

> Investigación verificada (workflow de 16 agentes, fuentes web reales). El **plan board
> completo tema-a-tema** vive en [`DATA/DERMATOLOGIA/daily-plan-base.md`](DATA/DERMATOLOGIA/daily-plan-base.md);
> aquí va el resumen. Lo no confirmable está marcado `(pendiente)`.

### Currículo board verificado (orden de ataque)
- **Curriculum canónico:** *Dermatology: Illustrated Study Guide and Comprehensive Board
  Review* (Sima Jain, 2.ª ed.) — **11 capítulos** subdivididos en sub-secciones atómicas
  = grano "1 tema/día". Reordenado: ciencia básica/inmuno → genodermatosis/peds →
  infecciosas → neoplasias → dermatopatología → cirugía → farmacología → medical amplio.
- **Ponderación ABD APPLIED (abderm.org, verificada):** Medical **55%** · Pediatric **15%**
  · Surgical **15%** · Dermatopathology **15%**. Asignar prioridad CRÍTICA/ALTA a los
  bloques Medical, Neoplasias, Dermatopatología y Medical-amplio.

### Las 3 fuentes (verificadas)
- **AccessDermatologyDxRx** (`dermatology.mhmedical.com`, logueado): Fitzpatrick 9e, Color
  Atlas & Synopsis 8e, **Taylor & Kelly's Dermatology for Skin of Color**, **Barnhill's
  Dermatopathology 4e + Challenge (400+ vignettes tipo board)**, Weinberg's Pediatric,
  Kantor (suturas + **400+ vídeos de procedimientos**), 20.000+ imágenes. ⚠ `mhmedical.com`
  devuelve **403 a fetch** → se navega a mano (Edge / Claude-in-Chrome / DevTools), no por API.
- **Qbankly — Dermatología** (`qbankly.app`): **NO existe un módulo Derma aislado** — su
  contenido de derma vive dentro de los subjects de cada banco. **Abre SOLO en Edge.**
- **ProMIR — Dermatología:** ✅ EXTRAÍDA COMPLETA (10-jun-2026) — ver Apéndice B.

### Encargo del módulo Derma — estado
✅ Plan tema-átomo/día construido (66 átomos, interdiario con Research):
`DATA/DERMATOLOGIA/daily-plan.md` + **`src/lib/dermaDailyPlan.ts`** (links reales, botón
◆ Edge para Qbankly, progreso real `studyProgress` clave `derma`). §2/§5 verificados →
`DATA/DERMATOLOGIA/referentes.md` y `recursos.md`. ⏳ La **UI** (pantallas §9) la diseña
el chat principal sobre `dermaDailyPlan.ts`, copiando `UsmleTodayPlan`/`MirTodayPlan`.

---

## APÉNDICE B · DATA VERIFICADA II (10-jun-2026 · extracción EN VIVO de las 3 fuentes)

> Extracción real con sesiones logueadas del usuario (Chrome DevTools MCP). Raw JSON en
> `DATA/DERMATOLOGIA/_scrape/`. Consolidado en `DATA/DERMATOLOGIA/temario.md`.

### B.1 ProMIR — Dermatología (asignatura 5) ✅ COMPLETA
- 11 capítulos navegados (`/capitulo/<capId>`, capIds en `mirTemarioData.ts`). Profesor:
  Dr. Luis Alfonso Pérez González. 18h 35min estimadas; peso "media (5-8 preg./convocatoria)".
- **Vídeos con duración real:** presentación **4:28** · videoclase resumen **3:18:11** ·
  Masterclass melanoma **1:39:10** (cap 4) · Dermatosis paraneoplásicas **16:46** (cap 3) ·
  Dermatoscopia **18:36** (cap 10, mp4 directo) · 2 clips de procedimiento (0:12, 0:17).
  Los caps 1/2/6/7/8/9 NO tienen vídeo propio (verificado, 0 etiquetas `<video>`).
- **Peso MIR % por tema** (ya en `mirDetalleData.ts` clave 5): Oncología 23,39 ·
  Infecciosas 17,29 · Sistémicas 15,25 · Conceptos 12,88 · Eritematodescamativas 8,81 ·
  Toxicodermias 8,14 · Ampollosas 6,10 · Glandular 4,75 · Genodermatosis 3,39 · Dermatoscopia 0.
- Secciones por capítulo + conteo figuras/tablas: `_scrape/promir_derma_capitulos.json`.

### B.2 AccessDermatologyDxRx ✅ ESTRUCTURA COMPLETA (CDP SÍ funciona aquí)
- **Review Questions (1.301 Q reales):** Barnhill's Challenge **403** (la cifra "400+" del
  Apéndice A queda confirmada en 403) · Pictorial Review 4e **381** · 3e **363** · CORE Exam
  Q-Bank **104** · Question of the Week **50**. Deep-link `/qa.aspx?resourceid=<id>`.
- **Cases (300):** Board Review **200 casos** (Medical 110/Dermpath 30/Peds 30/Surgical 30 —
  espeja el 55/15/15/15 de ABD APPLIED) · DD Challenge **100 sets** · LANGE (48 Q).
- **Vídeos contados en vivo (~176+):** Suturing (Kantor) **91** · Animations 21 · Clinical
  Videos 13 · Vein 13 · Lectures 11 · Peds 9 · Fitzpatrick 7 · Skin of Color 5 · General 4 ·
  Biopsies 2 · `[pendiente]` Dermatologic Surgery y 3D Modules. ⚠ La cifra "400+ vídeos" del
  Apéndice A no se pudo confirmar en el conteo visible; lo contado son ~176.
- **36 libros con `bookid`** + **TOC completo del Fitzpatrick Color Atlas 9e** (35 secciones +
  3 apéndices con `sectionid` → deep-link por sección, esqueleto de lectura del plan diario).
- **Fitzpatrick's Dermatology 9e es bookid 2570** y el Color Atlas 9e es 3309 (en
  AccessDermatology, no en AccessMedicine como decía el dossier antiguo).

### B.3 Qbankly — derma ✅ COMPLETA (Step 1+2+3+flashcards · 10-jun vía Edge)
- uWorld Library subject **Dermatology: 43 temas** con docId (70–112) → deep-link
  `library?e=1&doc=<n>`; extraídos a `_scrape/qbankly_derm_library.json`.
- **Preguntas de derma por step** (raw `_scrape/qbankly_derm_step2.json`):
  - Step 1: uWorld **99** (6 subtemas; el "78" previo sumaba solo 3) · Amboss 88 ·
    Mehlman 248 · USMLERx 53 · PassMedicine MSK+skin 386.
  - **Step 2 CK: 534 Q** — uWorld **119** · Amboss **172** · Mehlman 132 · USMLERx 111.
  - Step 3: 263 Q — uWorld 102 · Amboss 104 · Mehlman 57.
  - High Yield (cat. 13): Mehlman HY IM 106 · Peds 74 · FM 63 · Surgery 59 · EM 14.
- **Flashcards:** no hay API aparte (404) — los decks SON bancos: uWorld S1 FlashCards
  (id 16, 2.180 cards) → **Dermatology 75** · uWorld S2 (id 17, 2.684) → **61**.
- **B&B Step 1 capítulo Dermatology = 0 vídeos** (no existe; no usarlo como material).
- Nota operativa: el navegador Edge con la extensión es **"Browser 2"** (Edg/148 verificado
  por userAgent); Video Library total subió a 1.797 (antes 1.546).

### B.4 Referentes verificados (URLs/DOIs reales → `DATA/DERMATOLOGIA/referentes.md`)
- **Cotofana:** curso <https://cotofanaanatomy.com/> · ⚠ NO tiene canal YouTube oficial
  (disecciones en su plataforma y Patreon) · safe zones = *Plastic and Aesthetic Nursing*
  2022 (DOI 10.1097/PSN.0000000000000480) + *JDD* 2019 (PMID 31524345) — ⚠ no ASJ como
  decía §2.1.
- **de Maio:** MD Codes = APS 2021, open access **PMC8012343** · MD ASA = JCD 2021
  (PMID 33977669; atributos H1 verificados) · Myomodulation = APS 2018 (PMID 29549406) ·
  libro Springer 10.1007/978-3-642-45125-6 · formación: mdcodes.com + AMI.
- **Carruthers:** Botulinum Toxin 5e ISBN 9780323831161 · Soft Tissue Augmentation 5e
  ISBN 9780323830751 (Elsevier shop, 2024).
- **DeLorenzi:** HDPH = ASJ 2017 DOI 10.1093/asj/sjw251 (PMID 28333326) · Complications
  I/II = PMID 23636629 / 24809362. **Consenso ceguera** (título real): Goodman, Magnusson
  et al., *…HA Embolic Visual Loss…*, ASJ 2020 (PMC7427155) — ⚠ corregir §2.4.
- **Anderson:** Science 1983 PMID 6836297 · Manstein 2004 PMID 15216537 · Lasers/Lights/
  Energy Devices 5e ISBN 9780323829052.
- **Global Alliance:** JAAD 2018 DOI 10.1016/j.jaad.2017.09.078 (PMID 29127053).

### B.5 Plan diario construido (66 átomos · interdiario)
- **Ritmo:** la franja boards 13:30–14:15 alterna Research↔Derma por día hábil
  (`researchData.ts#diaEstudioTipo`, D0=10-jun Research) ⇒ **Derma D1 = jue 11-jun-2026**,
  D66 = 10-dic-2026. Calendar intacto.
- **Estructura:** A Fundamentos (7) → B Genoderma/Peds (5) → C Infecciosas (6) →
  D Neoplasias+dermatoscopia (7) → E Dermatopatología (4) → F Cirugía (5) → G Farmacología
  (5) → H Medical amplio (12) → Cierre (1) → **X Estética estructural (14, referentes §2)**.
  Orden: Sima Jain reordenado × ABD APPLIED 55/15/15/15 × Peso MIR × dependencias del SPEC
  (alfabeto→80/20→no-errar→estética sobre anatomía).
- Cada día: lectura Access (sectionid real) + práctica Qbankly **◆ Edge** + 2º pase ProMIR +
  extra (casos/vídeo/paper). SRS CRÍTICA [1,3,7,28,63] (compartido con Research).
- Progreso REAL manual: `studyProgress.ts` → `PlanKey` ahora incluye `'derma'` (inicia 0%).

---

*Fin del documento. Este `.md` es la fuente de verdad; el contenido clínico fino se completa y verifica vía el research pipeline (§8).*
