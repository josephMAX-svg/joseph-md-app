# NÍTIDA · Protocolos de "consulta tipo" (dermatología médica por suscripción · tele-derma)

> **Qué es esto.** NÍTIDA es la línea Pulso "Dermatología médica por suscripción" (`empresaData.ts`, 2026 T4)
> que el 27-ago-2026 se **fusionó con Derma**: su materia prima son los átomos del **módulo B** del plan
> (d7 psoriasis · d8 eccemas/DA · d9 acné+rosácea · d10 ampollosas · d11 urticaria · d12 farmacodermias ·
> d13 conectivopatías) + **d68 cosmecéutica**, y la capa de comunicación/adherencia del `DERMA_MASTER_SPEC` §4.
> Este doc convierte lo estudiado en **protocolo de producto**: una "consulta tipo" por diagnóstico.
>
> **Reglas de honestidad (SPEC §8).** Aquí van *mecanismos mentales* (estables) y *estructura de consulta*.
> Toda **dosis, concentración, pauta o criterio numérico** es *parámetro clínico* → se escribe como clase
> terapéutica y lleva **`A VERIFICAR (dd-mmm)`** contra la fuente primaria antes de entrar en la app o en un
> guion real. Fuentes ya verificadas en `referentes.md`: Global Alliance acné 2018 (PMID 29127053) · MD ASA
> (PMID 33977669). Para DA, psoriasis, rosácea y pigmentación **no hay guía verificada en referentes.md** →
> todo lo terapéutico de esas secciones está marcado. Esto es un borrador de producto, **no** una guía clínica.

---

## 0. Marco común de la consulta NÍTIDA (aplica a los 5 diagnósticos + cosmecéutica)

### 0.1 Estructura de la consulta (SPEC §4.1 — fusión MD ASA + práctica clínica)
1. **Escuchar la queja literal** y reformularla a mensaje emocional ("me veo mal / me da vergüenza" → no es el
   grano, es el conjunto). Anotar la frase textual del paciente (se reutiliza en el cierre).
2. **Reencuadrar de síntoma a causa** con UN dibujo simple (folículo inflamado · barrera rota · placa que se
   renueva rápido · vaso que se dilata · melanocito estimulado por luz).
3. **Priorizar** ≤3 objetivos; fijar expectativa de **tiempo** (lo que más rompe la adherencia).
4. **Plan por etapas** explícito: qué hoy, qué a las 6-8 semanas, por qué ese orden.
5. **Consentir de verdad**: nombrar el efecto adverso esperable y el plan si aparece (sube la confianza).
6. **Cierre con tarea de casa** + criterio de revisión + foto de control agendada.

### 0.2 Tele-derma: flujo y foto estandarizada (protocolo propio NÍTIDA)
| Paso | Qué | Detalle operativo |
|---|---|---|
| Intake | Formulario previo | Motivo, tiempo de evolución, qué ha usado (con fotos de los envases), alergias, embarazo/lactancia, fototipo autodeclarado (I-VI, con escala visual), medicación, antecedentes. |
| **Foto estandarizada** | Set mínimo de 5 tomas (cara) | Frontal · 45° derecha · 45° izquierda · perfil derecho · perfil izquierdo. Tronco/extremidades: 1 general + 1 detalle con moneda/regla como escala. |
| | Condiciones | Luz natural difusa (ventana lateral), sin flash directo, fondo neutro, sin maquillaje ni cremas, pelo recogido, cámara a la altura de los ojos, ~40 cm, **misma hora y mismo sitio** en cada control. |
| | Control | Mismas 5 tomas a las 6-8 semanas → comparación lado a lado (antes/después) que el paciente ve. |
| Triaje de exclusión | Lo que NO es tele-derma NÍTIDA | Lesión pigmentada nueva/cambiante (→ presencial + dermatoscopia), fiebre + rash, ampollas/erosiones extensas, afectación mucosa, dolor desproporcionado, sospecha de infección profunda, embarazo con dermatosis nueva, niño <2 años, paciente inmunodeprimido con lesión nueva. |
| Consentimiento | Telesalud | Texto de consentimiento informado para teleconsulta + uso de imágenes (almacenamiento cifrado, no redes). **Marco legal telesalud Perú (Ley 30421 / normativa MINSA vigente) — A VERIFICAR (05-sep)** antes de lanzar. |
| Rutina | **≤3 pasos** | Regla de adherencia (SPEC §4.2): una rutina de 3 pasos que se hace gana a una de 7 que se abandona. Formato fijo: **limpiador · activo · fotoprotector** (mañana) / **limpiador · activo** (noche). |
| Revisión | **6-8 semanas** | Foto de control + IGA + preguntas de adherencia ("¿cuántas noches de 7 lo usaste?") + efectos esperados aparecidos. |
| Métrica | **IGA** | Investigator's Global Assessment 0-4 (0 claro · 1 casi claro · 2 leve · 3 moderado · 4 severo) anotado en cada visita; objetivo de producto = **ΔIGA ≥1 a las 8 semanas** o cambio de plan. La versión exacta de la escala es específica por enfermedad (acné/DA/rosácea) — **A VERIFICAR (05-sep)** la definición por diagnóstico antes de usarla como métrica de producto. |

### 0.3 Guiones ancla (SPEC §4.3 — banco editable, se reutilizan en todos los temas)
- **Crónico:** "No lo curamos hoy; lo ponemos bajo control y lo mantenemos."
- **Peor-antes-de-mejor:** "Las primeras semanas la piel se queja. Eso significa que está funcionando, no que falla."
- **Expectativa de tiempo:** "Esto se mide a 6-8 semanas con foto, no en el espejo cada mañana."
- **Seguridad:** "Esto es muy seguro porque sé exactamente qué hay debajo y tengo el plan si algo no va bien."
- **Adherencia:** "Menos pasos, hechos todos los días, ganan a la rutina perfecta que se abandona."

### 0.4 Límites y derivación (transversal)
Derivar a presencial/urgencia si: fiebre + rash · ampollas o erosiones · mucosas afectadas · dolor intenso ·
lesión pigmentada sospechosa · falta de respuesta en 2 ciclos (12-16 semanas) · sospecha de causa sistémica
(artritis, pérdida de peso, adenopatías) · efectos adversos no esperados. Registrar la derivación como
desenlace del producto (no es fracaso: es seguridad).

---

## 1. ACNÉ — plantilla canónica (SPEC §3.2 + Global Alliance 2018, PMID 29127053)

| Campo | Contenido |
|---|---|
| **Qué mira la foto** | Comedones (abiertos/cerrados) vs pápulas/pústulas vs nódulos; distribución cara/tronco; cicatriz atrófica; PIH (fototipos IV-VI = piel peruana). |
| **Causa → mecanismo (guion de dibujo)** | Unidad pilosebácea: hiperqueratinización del infundíbulo → microcomedón → sebo atrapado → *C. acnes* + inflamación → pápula/pústula/nódulo → cicatriz/PIH. "No es suciedad: lavarse más lo empeora." |
| **Clasificación** | Leve (comedones ± pocas pápulas) · moderado · severo/nodular · con cicatriz. IGA 0-4 en cada visita (SPEC §3.2: "clasificar siempre para medir y comunicar"). Fitzpatrick anotado (riesgo PIH). |
| **Rutina ≤3 pasos (clases, sin dosis)** | AM: limpiador suave · **peróxido de benzoílo** (BPO) · fotoprotector. PM: limpiador · **retinoide tópico** sobre toda la zona. Lógica Global Alliance: atacar varios mecanismos a la vez (retinoide + BPO ± antibiótico tópico), **limitar antibióticos** en tiempo y siempre con BPO. Concentraciones y marcas — **A VERIFICAR (05-sep)**. |
| **Escalado (deja de ser tele-derma pura)** | Moderado-severo → añadir oral (antibiótico limitado en tiempo con BPO; hormonal en mujeres); nodular/resistente/cicatriz → **isotretinoína con programa de seguridad** (laboratorios, anticoncepción) = presencial obligatoria. |
| **Guion** | "El acné es una enfermedad de la piel, no falta de higiene. Es crónica: la controlamos. Las primeras 4-8 semanas la piel puede irritarse o verse peor antes de mejorar; eso es esperado y NO es para abandonar." Empezar el retinoide en noches alternas. |
| **Revisión 6-8 sem** | Foto set 5 · IGA · adherencia (noches/7) · irritación (esperada) · PIH nueva. ΔIGA ≥1 → mantener; sin cambio → revisar adherencia antes de escalar. |
| **Lo que no puedo errar** | No "esperar a ver" con nódulos (cicatriz); teratogenicidad de isotretinoína; no monoterapia antibiótica prolongada. |
| **Límites/derivar** | Nodular, cicatriz activa, acné fulminans, sospecha hormonal (hirsutismo, irregularidad menstrual), fracaso a 2 ciclos. |

## 2. DERMATITIS ATÓPICA (d8) — `A VERIFICAR` guía (sin fuente en referentes.md)

| Campo | Contenido |
|---|---|
| **Qué mira la foto** | Placas eccematosas mal definidas en flexuras (adulto/niño) o cara/extensoras (lactante); liquenificación (crónico); excoriaciones. En piel de color: eritema violáceo/gris, patrón papular folicular (d8 · fototipo). |
| **Causa → mecanismo** | Barrera cutánea defectuosa + inflamación tipo 2 + prurito → rascado → más barrera rota (círculo). Dibujo: "pared de ladrillos sin cemento". |
| **Clasificación** | Extensión (% superficie), intensidad del prurito (0-10 autodeclarado), sueño afectado, IGA. |
| **Rutina ≤3 pasos** | AM/PM: limpiador sin jabón · **emoliente** generoso (la base del tratamiento, todos los días) · **antiinflamatorio tópico** en brote (corticoide tópico de potencia según zona, o inhibidor de calcineurina en cara/pliegues). Potencias, duración y edad — **A VERIFICAR (05-sep)**. |
| **Guion** | "Tu piel pierde agua porque le falta 'cemento'. El hidratante no es cosmética: es el tratamiento. La crema antiinflamatoria es el bombero: se usa cuando hay fuego y se retira cuando se apaga." Anticipar la "corticofobia". |
| **Revisión 6-8 sem** | Foto · IGA · prurito 0-10 · nº de brotes · adherencia al emoliente (la variable que más falla). |
| **Lo que no puedo errar** | Eccema herpético (vesículas monomorfas + dolor + fiebre) → urgencia; sobreinfección; uso crónico de corticoide potente en cara. |
| **Límites/derivar** | Fracaso a dos ciclos, extensión amplia, sospecha de alergia de contacto (patch test presencial), necesidad de sistémico/biológico. |

## 3. PSORIASIS (d7) — `A VERIFICAR` guía

| Campo | Contenido |
|---|---|
| **Qué mira la foto** | Placas **bien delimitadas** eritemato-descamativas, escama plateada, codos/rodillas/cuero cabelludo/sacro; uñas (pits, onicólisis); en piel de color el eritema se ve violáceo y la PIH/hipopigmentación residual es frecuente. |
| **Causa → mecanismo** | Enfermedad inmunomediada (eje IL-23/IL-17) con renovación epidérmica acelerada. Dibujo: "la piel se renueva en días en vez de semanas y se acumula". Es sistémica: preguntar articulaciones. |
| **Clasificación** | Extensión (% superficie), zonas de alto impacto (cara, manos, genitales, uñas), IGA/PGA, artritis (dolor/rigidez matinal). |
| **Rutina ≤3 pasos** | Limpiador suave · **tópico antiinflamatorio/queratorregulador** (corticoide tópico ± análogo de vitamina D; cuero cabelludo en vehículo adecuado) · emoliente/queratolítico según escama. Pautas y combinaciones — **A VERIFICAR (05-sep)**. |
| **Guion** | "Es crónica y va por brotes: la controlamos, no la curamos. No es contagiosa. Lo que hagas en casa (hidratar, no rascar la escama, evitar el alcohol en exceso) mueve el resultado." |
| **Revisión 6-8 sem** | Foto · IGA · % superficie · articulaciones · impacto en calidad de vida (una pregunta 0-10). |
| **Lo que no puedo errar** | Eritrodermia o pustulosis generalizada → urgencia; artritis psoriásica no diagnosticada; corticoide sistémico "para el brote" (rebote). |
| **Límites/derivar** | >10 % de superficie o zonas de alto impacto o artritis → necesidad de fototerapia/sistémico/biológico (presencial). |

## 4. ROSÁCEA (d9) — `A VERIFICAR` guía

| Campo | Contenido |
|---|---|
| **Qué mira la foto** | Eritema centrofacial persistente, telangiectasias, pápulas/pústulas **sin comedones** (vs acné), fimas, ojos rojos/secos (ocular). |
| **Causa → mecanismo** | Disregulación neurovascular + inflamación innata (± *Demodex*); desencadenantes (calor, alcohol, sol, comida picante, estrés). Dibujo: "vaso que se dilata y no vuelve". |
| **Clasificación** | Por fenotipo: eritema persistente · pápulo-pustulosa · fimatosa · ocular. IGA para el componente pápulo-pustuloso. |
| **Rutina ≤3 pasos** | AM: limpiador muy suave · **fotoprotector mineral** (obligatorio) · PM: **antiinflamatorio tópico** (metronidazol / ivermectina / ácido azelaico según fenotipo). Vasoconstrictor tópico para el eritema y láser vascular (PDL, d63) = fase presencial. Elección y pautas — **A VERIFICAR (05-sep)**. |
| **Guion** | "No es acné aunque se parezca: los productos de acné la empeoran. La mitad del tratamiento es evitar tus disparadores; llevemos un diario de 2 semanas." |
| **Revisión 6-8 sem** | Foto · IGA (pápulas) · escala de eritema 0-4 · diario de disparadores · síntomas oculares. |
| **Lo que no puedo errar** | Rosácea ocular (derivar a oftalmología); confundir con lupus/dermatitis seborreica/dermatitis perioral por corticoide; corticoide tópico en cara (empeora). |
| **Límites/derivar** | Fimas, ocular, fracaso a tópicos (oral), láser vascular. |

## 5. PIGMENTACIÓN — melasma · PIH · fototipos IV-VI (d4 + d61/d65) — `A VERIFICAR` guía

| Campo | Contenido |
|---|---|
| **Qué mira la foto** | Melasma: máculas marrones simétricas malares/frontales/labio superior (luz de Wood no aplica en tele-derma: describir profundidad por color). PIH: máculas que siguen la huella de una inflamación previa (acné, picadura, procedimiento). Descartar léntigos/nevus (→ presencial si duda). |
| **Causa → mecanismo** | Melanocito hiperestimulado (luz UV **y visible**, hormonas, inflamación, calor) → melanina que se deposita en epidermis y/o dermis (la dérmica responde peor). Dibujo: "fábrica de pigmento con el interruptor pegado". |
| **Clasificación** | Extensión y oscuridad (escala MASI simplificada o foto comparada), fototipo IV-VI = riesgo alto de PIH con cualquier procedimiento (conecta con SR-2 L5). |
| **Rutina ≤3 pasos** | AM: limpiador · **fotoprotector de amplio espectro con color/óxido de hierro** (contra luz visible) · PM: **despigmentante** (retinoide, ácido azelaico, tranexámico tópico, hidroquinona/triple combinación por ciclos). Agentes, concentraciones y duración — **A VERIFICAR (05-sep)**. Peelings/láser solo en fase presencial y con la regla "seguridad antes que técnica" (d61/d65). |
| **Guion** | "La fotoprotección es el tratamiento; lo demás es ayuda. Sin ella todo lo que hagamos vuelve. Es lento: 8-12 semanas para ver cambio y tendencia a recaer en verano." |
| **Revisión 6-8 sem** | Foto (misma luz, misma hora — aquí es crítico) · irritación · aplicación real del fotoprotector (cantidad, reaplicación). |
| **Lo que no puedo errar** | Ocronosis exógena por hidroquinona prolongada sin control; irritación que genera MÁS PIH; tratar una lesión pigmentada que era melanoma (nunca despigmentar una lesión no diagnosticada). |
| **Límites/derivar** | Lesión pigmentada única/asimétrica → dermatoscopia presencial; melasma dérmico refractario; cualquier procedimiento. |

## 6. COSMECÉUTICA — la "rutina base NÍTIDA" (d68 + gap-module G+9)

Fuentes del plan: *Cosmeceuticals and Cosmetic Ingredients* (AccessDerma bookid 2812) · Baumann 3e (Skin Typing).
Principio: **evidencia, no marketing**. Rutina base de 3 pasos que luego se personaliza por diagnóstico:

| Paso | Activo con evidencia (clase) | Para quién | Guion |
|---|---|---|---|
| Limpiar | Limpiador suave sin jabón (pH ácido) | Todos | "Limpiar no es frotar." |
| Activo | **Retinoide tópico** (envejecimiento, acné, textura, PIH) · **Vitamina C** (antioxidante, luminosidad) · **Niacinamida** (barrera, sebo, PIH) | Según Baumann Skin Type (seca/grasa · sensible/resistente · pigmentada/no · arrugada/tensa) | "Un activo a la vez; se añade el segundo cuando el primero se tolera." |
| Proteger | **Fotoprotector amplio espectro** (mineral/con color en pigmentación y rosácea) | Todos, todos los días | "Es el único paso innegociable." |

Concentraciones, vehículos y compatibilidades (p. ej. retinoide + vit C) — **A VERIFICAR (05-sep)** contra
bookid 2812 / Baumann 3e antes de recomendar productos concretos. Exosomas, "boosters" y similares: sin
evidencia suficiente → NÍTIDA no los recomienda (posición de producto).

---

## 7. Banco de guiones por tema (editable — SPEC §4.3 / §9.6)

| Tema | Frase ancla | Cuándo |
|---|---|---|
| Acné | "Lavarse más lo empeora; el acné no es suciedad." | Encuadre |
| Acné | "Retinoide en noches alternas las 2 primeras semanas: tolerar antes que correr." | Plan |
| DA | "El hidratante ES el tratamiento; la crema antiinflamatoria es el bombero." | Plan |
| Psoriasis | "No es contagiosa y no es tu culpa; va por brotes y la controlamos." | Encuadre |
| Rosácea | "Los productos de acné la empeoran; tu diario de disparadores es la mitad del tratamiento." | Encuadre |
| Pigmentación | "La fotoprotección es el tratamiento; sin ella todo vuelve." | Plan |
| Todos | "Nos vemos en 6-8 semanas con las mismas 5 fotos: ahí decidimos." | Cierre |
| Todos | "Si aparece fiebre, ampollas o dolor fuerte, no esperes a la revisión: escríbeme." | Seguridad |

## 8. Métricas de producto (para el Business Hub / Nítida)

- **Adherencia**: % de pacientes con foto de control a 6-8 semanas (objetivo ≥70 %) y noches/7 de uso del activo.
- **Resultado**: % con ΔIGA ≥1 a las 8 semanas; % derivados a presencial (esperado, no fracaso).
- **Seguridad**: 0 lesiones pigmentadas tratadas sin dermatoscopia; 0 corticoides tópicos potentes en cara sin plan de retirada.
- **Experiencia**: pregunta única 0-10 "¿entendiste qué tiene tu piel y por qué?" al cierre de la primera consulta.

## 9. Pendientes `A VERIFICAR` (antes de que cualquier protocolo entre en la app)

- [ ] Marco legal de telesalud en Perú y consentimiento de imágenes (MINSA) — 05-sep.
- [ ] Definición exacta de IGA por diagnóstico (acné / DA / rosácea) y escala de eritema; MASI para melasma.
- [ ] Guías de referencia para DA, psoriasis, rosácea y pigmentación (añadirlas a `referentes.md` con DOI cuando se verifiquen) — hoy solo acné (Global Alliance 2018) está verificado.
- [ ] Concentraciones/pautas de cada clase tópica (retinoide, BPO, corticoide por zona, calcineurínicos, metronidazol/ivermectina/azelaico, despigmentantes) contra fuente primaria.
- [ ] Rutina base cosmecéutica: compatibilidades y vehículos contra bookid 2812 / Baumann 3e (d68).
- [ ] Campo `nitida?: {protocolo, guion, seguimiento}` en los 7 átomos B + d68 de `dermaDailyPlan.ts` (fichero de otro agente) → chip "Nítida" en HOY que abra la sección correspondiente de este doc.
