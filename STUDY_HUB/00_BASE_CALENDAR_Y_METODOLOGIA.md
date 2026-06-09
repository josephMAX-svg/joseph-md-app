# STUDY HUB — Base: Google Calendar real + metodología (10-jun-2026)

> Snapshot de la base sobre la que se reconstruyen Research, Derma y los segmentos de estudio
> (MIR/USMLE/ENCAPS) dentro de la app YoCPMD. Guardado para no perder contexto entre turnos/agentes.
> Fuente: Google Calendar `josephsototocas@gmail.com` (America/Lima) + `plan_estudio_pulso_v2_mejorado.xlsx` + `src/lib/encapsPlan.ts`.

## 1. Sistema diario real (bloques de tarde, recurrentes L–V)

| Hora | Bloque | Calendar eventId (master) | Notas |
|---|---|---|---|
| 13:00–13:15 | [PAUSADO 96D] PROGRAMACIÓN MAMA | `5btgr7vjkde08bsncln23hjh9f` | pausado hasta 11-ago |
| 13:00–13:30 | 💤 NAP ESTRICTO 30min | `j7f4cvb6ipmnj3kmrd7lplm7k8` | Mednick/NASA/Ericsson |
| 13:30–14:15 | 🔬 INVESTIGACIÓN DERMATOLÓGICA (45min) | `3ofg2ljv8kl3p1adm2e5d5nih3` | **→ alternar Research ↔ Derma** |
| 14:15–14:45 | 🎯 VENTAS & INFLUENCIA (30min) | `at1nak8f24nbnj1mh2jcd4aggg` | **→ Pulso** |
| 14:45–15:15 | FINANZAS Y EMPRESA DERMATOLÓGICA (30min) | `5leoak8brg82l9c4amc88uvek7` | **→ Pulso (estudio 96d)** |
| 15:15–15:30 | 🇪🇸 MIR — Evaluación Anclada D-1 (4Q + Anki + corrección) | `2ldp6obaapnvo76li28uprrddg` | testing effect |
| 15:30–16:15 | 🇪🇸 MIR — Deep Work Mini (Pre-test + Lectura + Free Recall + APEX max 4) | `00k364heibh1n6f9hfspcv9dpi` | 1 subtema atómico/día |
| 16:15–16:30 | 🇺🇸 USMLE — Anchored Evaluation (2Q + Anki + corrección) | `65hq433s3mhod6bb72ospqjtk7` | + glosario inglés médico |
| 16:30–17:15 | 🇺🇸 USMLE — Mini Deep Work English (Pre-test + Reading + Free Recall + APEX max 3) | `v1ohf8a8eobdmi12l1kgit9lpo` | TODO EN INGLÉS |

**Solo L–V son días de estudio.** Domingo descanso total.

## 2. Metas declaradas (de las descripciones del calendario)
- **MIR (España):** examen ene-2030 → Top 50 → **Dermatología Hospital Clínic Barcelona**. Meta a mar-2028: 800–1000 Anki MIR sólidas.
- **USMLE (EE.UU.):** Step 1 feb-2028. Identity stacking: *"I am a Mayo Clinic dermatology fellow."* Step 1 oficialmente Pass/Fail, se entrena como si fuera 270. Empieza desde casi cero en inglés médico (meta glosario 600–1200 términos a oct-2026).
- **ENCAPS (Perú):** examen ~19-ago/30-ago-2026. D1 = mié 10-jun (ya estructurado en la app).
- **Research → Mayo Clinic** y **Derma → referente clínico**: las dos ramas de la franja 13:30.

## 3. Formato APEX (Palmerton) — el átomo de tarjeta
```
FRENTE: SUJETO — ¿pregunta directa?
REVERSO: ≤ 2 líneas
CCSN: con qué se confunde + diferencia clave
FISIOPATOLOGÍA: mecanismo ≤ 3 líneas
RELACIONES: 1 línea conexión otra patología
EXAMEN: [MIR|USMLE|ENCAPS] · ESPECIALIDAD · SUBTEMA
```
Solo botones AGAIN / GOOD. Umbrales: dominio→tema nuevo mañana; gris→repaso finde; <umbral→repetir tema mañana.

## 4. Repetición espaciada diferenciada por prioridad (de `encapsPlan.ts`)
```
CRÍTICA: [1, 3, 7, 28, 63]  → 6 vueltas (1ª video + 5)
ALTA:    [1, 7, 28, 63]     → 5 vueltas
MEDIA:   [3, 28, 63]        → 4 vueltas
BAJA:    [7, 63]            → 3 vueltas
```
Día-foco (deep-prime) por código de tema; el repaso cae cuando día-foco + intervalo == hoy.

## 5. Alternancia Research ↔ Derma (desde mié 10-jun, solo L–V)
| Día | Tipo |
|---|---|
| Mié 10 jun (D0) | RESEARCH |
| Jue 11 jun | DERMA |
| Vie 12 jun | RESEARCH |
| Lun 15 jun | DERMA |
| Mar 16 jun | RESEARCH |
| Mié 17 jun | DERMA |
| Jue 18 jun | RESEARCH |
| Vie 19 jun | DERMA |
| … | (alterna) |

Regla: weekday-index par desde Jun 10 = Research; impar = Derma. (La app calcula esto desde 2026-06-10.)

## 6. Plan Pulso 96 días (`plan_estudio_pulso_v2_mejorado.xlsx`) — el "guion Estudio" de Business
- 28 may – 31 ago 2026 · 96 días · 2h/día · 165h activas. 2 ramas: **Producto 60%** (referente clínico de cada vertical: peso, sueño, hormonal, mental, foco, pareja) + **Marketing/Ventas 40%** (Hormozi×3, Cialdini, Brunson, StoryBrand, Schwartz).
- 28 libros priorizados (P1/P2/P3) con output operativo por libro. Mes 1 = fundamentos Hormozi; Mes 2 = expansión + marketing aplicado; Mes 3 = síntesis + producción (brand book, protocolos, 60 piezas de contenido, quiz funnel).
- 7 reglas no-negociables (2h sagradas, output por libro, Anki 30 cards/sem, domingo descanso, abandonar libro a 4 sesiones sin valor, producción≫consumo, aplicación inmediata en tu cuerpo). Régimen biológico pre-requisito (sueño 7-8h, ejercicio AM zona 2, comida real andina).
- Recursos: Hormozi ES/EN, Aprendamos Marketing, Romuald Fons (SEO), Vilma Núñez, Peter Attia (The Drive), Huberman, Rhonda Patrick, Mark Hyman; blogs Curology/Hims (playbook); subreddits para lenguaje del paciente.
- **Este plan va como sub-sección "Estudio" dentro de Business (Pulso).** Las marcas del grupo: peso=Liviano, hormonal=Curva, piel=Nítida, capilar=Densa, mental=Calma, foco=Foco, pareja=Cerca.

## 7. Referencias por examen (logueado en las 3)
- **ProMIR** (MIR España): https://promir.medicapanamericana.com/ — temario base.
- **USMLE / EE.UU.**: Qbankly https://qbankly.app/ (abre en Edge, no Chrome) + método **Palmerton** (YouTube).
- **Dermatología**: AccessDermatology https://dermatology.mhmedical.com/ (McGraw-Hill: Fitzpatrick).
- **Cyrano** (referencia de FORMATO de tutor IA, NO de estética): https://cyrano-t3fl.onrender.com/ — metodología de chat-IA con voz para preguntar "¿cómo estudio X?".

## 8. Límites técnicos honestos (a tener presente)
- **No es posible** ver literalmente cada video de YouTube de Palmerton (4 meses) ni de ProMIR — no hay ingesta de video a esa escala. Se investiga el método por texto/web y se estructura la "memoria Palmerton" desde ahí.
- **Tutor IA de voz en vivo embebido** (estilo Cyrano) requiere backend + API keys; embeber keys en el bundle web público = agujero de seguridad. Se construye el shell de chat + conocimiento estructurado; la IA en vivo necesitaría un proxy serverless.
- Plataformas logueadas (ProMIR/Qbankly/AccessDermatology) requieren auth; los agentes no pueden loguearse → se usa info pública del currículo + materiales del usuario.
