/**
 * dermaCerebro.ts — el "CEREBRO CLÍNICO" del DERMA_MASTER_SPEC §3 convertido en datos (PLAN ÉLITE v2.1 · 5-sep-2026).
 *
 * 35 fichas = los 22 átomos X (estética, d19-20 + d47-56 + d59-68) + 13 átomos CRIT clínicos del plan
 * (d5 danger zones · d7 psoriasis · d8 eccemas · d9 acné [plantilla canónica §3.2] · d10 ampollosas ·
 * d12 farmacodermias · d14 bacterianas · d16 virales · d18 parasitosis · d22 QA · d23 CBC/CEC · d24 melanoma ·
 * d44 cicatrización/complicaciones). Cada ficha lleva los 7 pasos (causa → mecanismo → capa → decisión →
 * lo-que-no-puedo-errar → comunicación → hábito), la catástrofe+rescate en 1 línea y el guion de paciente
 * (mastery gate §6.3: recitar los 7 pasos + árbol + catástrofe/rescate + guion, sin mirar).
 *
 * REGLA DE HONESTIDAD (SPEC §8 `verify`): los pasos son MECANISMO MENTAL (estable). Toda dosis, concentración,
 * %, mm o pauta es PARÁMETRO CLÍNICO: solo se escribe la cifra si está verificada en la fuente citada
 * (DeLorenzi 2017 abstract · Goodman 2020 texto completo · referentes.md); lo demás va en `verificar[]`
 * como "A VERIFICAR (05-sep)". La UI (DermaCerebroCard) debe distinguir visualmente ambas capas.
 *
 * Simulador "Oclusión vascular · 90 s" (DermaEmergencyDrill, SPEC §9.5): DERMA_DRILL_HDPH = checklist que
 * Joseph recita de memoria (signos → hialuronidasa HDPH → endpoints → ceguera → oftalmología → kit → prevención);
 * dermaDrillEvaluar() devuelve acierto/fallos para el ledger (fuente 'drill'). Se ejecuta en d19/d20, d46 (H) y d70 (Z).
 */
import type { DermaBloqueKey, DermaTier } from './dermaDailyPlan';

export interface DermaCerebroPasos {
  causa: string;        // 1 · ¿qué proceso real produce lo que veo?
  mecanismo: string;    // 2 · ¿por qué pasa, a nivel de tejido/fisiología? (la cascada)
  capa: string;         // 3 · ¿en qué plano vivo? ¿qué hay debajo? ¿qué no puedo tocar?
  decision: string;     // 4 · árbol: opciones, primera línea, criterios, secuenciación
  noErrar: string;      // 5 · la catástrofe específica y su rescate, precableado
  comunicacion: string; // 6 · qué digo, qué dibujo, qué expectativa fijo
  habito: string;       // 7 · qué cambia el paciente, adherencia, cuándo reviso, cómo mido
}
export interface DermaCerebroFicha {
  id: string;             // 'X-19-oclusion-vascular'
  d: number;              // átomo del plan al que pertenece (dermaDailyPlan.ts)
  bKey: DermaBloqueKey;
  tier: DermaTier;
  titulo: string;
  referente: string;      // "según quién" (authority graph §2)
  pasos: DermaCerebroPasos;
  /** Catástrofe + rescate en UNA línea (lo que se recita en el mastery gate). */
  catastrofe: string;
  /** Guion de paciente: frase ancla que se recita tal cual. */
  guion: string;
  /** Solo fuentes verificadas (PMID/PMC/DOI/AccessDerma bookid+sectionid). */
  fuentes: string[];
  /** Parámetros clínicos pendientes de cotejo contra la primaria — se muestran como "A VERIFICAR". */
  verificar?: string[];
}

export const DERMA_CEREBRO_PASOS: Array<{ k: keyof DermaCerebroPasos; n: number; label: string; pregunta: string }> = [
  { k: 'causa', n: 1, label: 'Causa', pregunta: '¿Qué proceso real produce lo que veo (no la queja literal)?' },
  { k: 'mecanismo', n: 2, label: 'Mecanismo', pregunta: '¿Por qué pasa, a nivel de tejido/fisiología? (la cascada)' },
  { k: 'capa', n: 3, label: 'Capa / anatomía', pregunta: '¿En qué plano vivo? ¿Qué hay debajo? ¿Qué no puedo tocar?' },
  { k: 'decision', n: 4, label: 'Decisión', pregunta: 'Árbol: opciones, primera línea, criterios de elección, secuencia.' },
  { k: 'noErrar', n: 5, label: 'Lo que no puedo errar', pregunta: '¿Cuál es la catástrofe de este tema y su rescate, precableado?' },
  { k: 'comunicacion', n: 6, label: 'Comunicación', pregunta: '¿Qué digo, qué dibujo, qué expectativa fijo?' },
  { k: 'habito', n: 7, label: 'Hábito / seguimiento', pregunta: '¿Qué cambia el paciente, cómo aseguro adherencia, cuándo reviso, cómo mido?' },
];
/** Mastery gate §6.3: un átomo cuenta como dominado solo si, sin mirar, Joseph entrega los 4. */
export const DERMA_MASTERY_GATE: Array<{ k: 'pasos' | 'arbol' | 'catastrofe' | 'guion'; t: string }> = [
  { k: 'pasos', t: 'Recita los 7 pasos del cerebro clínico' },
  { k: 'arbol', t: 'Da el árbol de decisión correcto (primera línea + criterios)' },
  { k: 'catastrofe', t: 'Nombra la catástrofe + su rescate' },
  { k: 'guion', t: 'Entrega el guion de paciente' },
];

// ── fuentes verificadas (referentes.md · 10-jun / 5-sep-2026) ──
const F = {
  delorenzi17: 'DeLorenzi C. HDPH protocol. Aesthet Surg J 2017 · PMID 28333326 (abstract verificado 05-sep-2026)',
  delorenzi14: 'DeLorenzi C. Complications of injectable fillers, part 2: vascular complications. ASJ 2014 · PMID 24692598',
  delorenzi13: 'DeLorenzi C. Complications of injectable fillers, part I. ASJ 2013 · PMID 23636629',
  goodman20: 'Goodman GJ, Magnusson MR et al. Consensus on HA embolic visual loss. ASJ 2020 · PMC7427155 (texto verificado 05-sep-2026)',
  cotofana22: 'Cotofana S et al. Vascular Safe Zones for Facial Soft Tissue Filler Injections. Plast Aesthet Nurs 2022 · PMID 36469395',
  freytag19: 'Freytag DL … Cotofana S. Facial Safe Zones for Soft Tissue Filler Injections. J Drugs Dermatol 2019 · PMID 31524345',
  mdcodes: 'de Maio M. MD Codes. Aesthet Plast Surg 2021 · PMC8012343',
  mdasa: 'de Maio M. MD ASA. J Cosmet Dermatol 2021 · PMID 33977669',
  myomod: 'de Maio M. Myomodulation. Aesthet Plast Surg 2018 · PMID 29549406 (update 2020 PMC7447619)',
  carruthers: 'Carruthers & Carruthers. Procedures in Cosmetic Dermatology: Botulinum Toxin 5e (Elsevier 2024, ISBN 9780323831161)',
  cureus26: 'Complicaciones de toxina botulínica — Cureus 2026 (OA) · PMC12865869',
  toxins25: 'Toxina en líneas frontales — Toxins 2025 (OA) · PMC12737568',
  anderson83: 'Anderson RR, Parrish JA. Selective photothermolysis. Science 1983 · PMID 6836297',
  manstein04: 'Manstein D … Anderson RR. Fractional photothermolysis. Lasers Surg Med 2004 · PMID 15216537',
  globalAcne: 'Thiboutot DM, Dréno B et al. Practical management of acne for clinicians (Global Alliance). JAAD 2018 · PMID 29127053',
  ad: (book: number, sid: number, t: string) => `AccessDerma ${t} · bookid ${book} / sectionid ${sid}`,
  ca: (sid: number, t: string) => `Fitzpatrick Color Atlas 9e · ${t} · bookid 3309 / sectionid ${sid}`,
  dn: (slug: string) => `DermNet · https://dermnetnz.org/topics/${slug}`,
};

/* ────────────────────────────────────────────────────────────────────────────
 * LAS 35 FICHAS
 * ────────────────────────────────────────────────────────────────────────── */
export const DERMA_CEREBRO: DermaCerebroFicha[] = [
  // ══════════════ CLÍNICA CRIT (13) ══════════════
  { id: 'A-05-danger-zones', d: 5, bKey: 'A', tier: 'CRIT', titulo: 'Anatomía facial + danger zones (glabela y nariz = máximo riesgo)', referente: 'Cotofana',
    pasos: {
      causa: 'La cara no es una superficie: es un sándwich de capas atravesado por una red arterial 3D con conexiones a la circulación oftálmica. El riesgo de un pinchazo lo define la arteria que viaja debajo, no la arruga de encima.',
      mecanismo: 'Las ramas de la a. facial (angular, labial superior), la a. dorsal nasal y las a. supratroclear/supraorbitaria (ramas de la oftálmica) se anastomosan en glabela y nariz: un bolo a presión puede viajar retrógrado hacia la a. oftálmica y la a. central de la retina.',
      capa: 'Piel → grasa subcutánea (compartimentos) → SMAS/músculo → grasa profunda/espacios → periostio. Las arterias nominadas cambian de plano por región: superficiales en glabela/nariz (subcutáneo), profundas en pómulo (supraperióstico). La sien = varias capas y arterias (temporal superficial, temporal profunda).',
      decision: 'Antes de cualquier punto: ¿región? ¿plano? ¿qué arteria/vena/nervio viaja aquí? ¿es zona de fuga hacia la oftálmica? → elegir plano "donde sí" (safe zones por región, Cotofana/Freytag) en vez de solo memorizar "dónde no".',
      noErrar: 'Inyectar glabela/nariz/frente en plano superficial con bolo grande = ceguera o necrosis. No hay zona de riesgo cero (DeLorenzi): siempre con hialuronidasa a mano.',
      comunicacion: '"Esto es muy seguro porque sé exactamente qué hay debajo y tengo el plan si algo no va bien." Dibujar las capas y la arteria en el consentimiento.',
      habito: 'Hábito del inyector, no del paciente: recitar plano + arteria + zona de fuga ANTES de cada punto; drill de 90 s de oclusión vascular en cada checkpoint (d19-20, d46, d70).',
    },
    catastrofe: 'Embolia arterial (oclusión cutánea o ceguera) → hialuronidasa HDPH inmediata + protocolo de ceguera Goodman 2020 + oftalmología.',
    guion: '"Sé qué hay debajo de cada punto y tengo el plan si algo no va bien."',
    fuentes: [F.cotofana22, F.freytag19, F.ad(2811, 245216992, 'Dermatologic Surgery · Surgical Anatomy & Cosmetic Subunits'), F.delorenzi17] },

  { id: 'B-07-psoriasis', d: 7, bKey: 'B', tier: 'CRIT', titulo: 'Psoriasis + papuloescamosas', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Enfermedad inmunomediada crónica (eje IL-23/Th17) con predisposición genética; no es infecciosa ni de higiene.',
      mecanismo: 'Activación de células dendríticas → IL-23 → Th17 → IL-17/IL-22 → hiperproliferación de queratinocitos (recambio epidérmico acelerado) → placa eritematosa con escama plateada gruesa; paraqueratosis y microabscesos de Munro en histología; Koebner en trauma.',
      capa: 'Epidermis (acantosis, paraqueratosis) + dermis papilar (vasos dilatados → signo de Auspitz al desprender la escama). Uñas (pits, mancha de aceite), cuero cabelludo y articulaciones (artritis psoriásica) son parte de la enfermedad.',
      decision: 'Clasificar extensión/gravedad (BSA, PGA) y cribar artritis → leve-localizada: tópicos (corticoide potente ± análogo de vitamina D, queratolítico si escama gruesa) → moderada-grave, artritis, pustulosa/eritrodérmica o fallo tópico: derivar a sistémico/fototerapia/biológico (decisión de especialista).',
      noErrar: 'No dar corticoide sistémico (rebote pustuloso/eritrodérmico al retirarlo); no confundir psoriasis guttata con sífilis 2ª ni pitiriasis rosada (collarete, medallón heráldico); no dejar pasar la artritis.',
      comunicacion: '"Es una enfermedad del sistema inmune de la piel: no se contagia. No la curamos hoy, la ponemos bajo control y la mantenemos. Las placas tardan semanas en aplanarse; la mancha residual NO es actividad."',
      habito: 'Emoliente diario, ciclos de tópico (no continuo), evitar desencadenantes (estrés, alcohol, betabloqueantes/litio, infecciones estreptocócicas). Revisión 6-8 semanas con foto y PGA/BSA; preguntar articulaciones siempre.',
    },
    catastrofe: 'Psoriasis pustulosa generalizada / eritrodermia (tras corticoide sistémico) → ingreso, soporte y sistémico; nunca "más corticoide".',
    guion: '"No se contagia. No la curamos hoy: la controlamos y la mantenemos."',
    fuentes: [F.ca(275941727, 'S3 Psoriasiform Dermatoses'), F.dn('psoriasis')],
    verificar: ['Umbrales BSA/PGA para "leve" y criterios de sistémico — A VERIFICAR (05-sep) en Color Atlas 9e S3 / guía AAD-NPF'] },

  { id: 'B-08-eccemas', d: 8, bKey: 'B', tier: 'CRIT', titulo: 'Eccemas: dermatitis atópica, de contacto, seborreica', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Barrera epidérmica defectuosa (filagrina) + desviación Th2 (DA); contacto con irritante o alérgeno (dermatitis de contacto); Malassezia sobre piel seborreica (seborreica). El picor es el motor de la enfermedad, no un síntoma accesorio.',
      mecanismo: 'Barrera rota → pérdida de agua transepidérmica → entrada de alérgenos/irritantes → inflamación Th2 (IL-4/IL-13) → espongiosis (edema intercelular) → vesículas en agudo, liquenificación por rascado en crónico; ciclo picor-rascado.',
      capa: 'Epidermis (espongiosis, estrato córneo disfuncional) + dermis superficial (infiltrado). En piel de color el eritema se ve violáceo/gris y predomina el patrón papular folicular.',
      decision: 'Clasificar gravedad (IGA, prurito 0-10, sueño) y sitio → base SIEMPRE: emoliente 2×/día + evitar irritantes → brote: corticoide tópico por potencia según zona (baja en cara/pliegues, media-alta en tronco/extremidades) en ciclos; inhibidor de calcineurina en cara/pliegues como ahorrador → sobreinfección (costras melicéricas): tratar → refractario/extenso: derivar (fototerapia, sistémicos, biológicos).',
      noErrar: 'Eccema herpético (vesículas monomorfas en sacabocados + fiebre en atópico) = urgencia antiviral; no usar corticoide potente en cara/párpados de forma continua (atrofia, glaucoma); en contacto: retirar el sospechoso y confirmar con parche, no "probar cremas".',
      comunicacion: '"La piel atópica pierde agua por una barrera que no cierra bien: el emoliente ES el tratamiento, no un extra. El corticoide bien usado, por ciclos, es seguro; lo peligroso es el brote sin tratar."',
      habito: 'Plan de acción por semáforo (verde emoliente · ámbar corticoide 5-7 días · rojo consulta), baños cortos tibios sin esponja, cantidad en unidades de punta de dedo (FTU). Revisión 6 semanas con foto + IGA + brotes/mes.',
    },
    catastrofe: 'Eccema herpético (Kaposi varicelliforme) → antiviral sistémico urgente y suspender corticoide tópico en la zona.',
    guion: '"El emoliente ES el tratamiento, no un extra."',
    fuentes: [F.ca(275941291, 'S2 Eczema/Dermatitis'), F.dn('atopic-dermatitis')],
    verificar: ['Potencia y duración de ciclos de corticoide tópico por zona — A VERIFICAR (05-sep) en Color Atlas 9e S2'] },

  { id: 'B-09-acne', d: 9, bKey: 'B', tier: 'CRIT', titulo: 'Acné (+ rosácea, hidradenitis) — PLANTILLA CANÓNICA §3.2', referente: 'Global Alliance (Thiboutot, Dréno)',
    pasos: {
      causa: 'No es "grasa" ni "suciedad": trastorno inflamatorio crónico de la unidad pilosebácea con base hormonal/inflamatoria.',
      mecanismo: 'Hiperqueratinización del infundíbulo → microcomedón → atrapamiento de sebo → proliferación de C. acnes y activación inmune → inflamación → pápula/pústula/nódulo → riesgo de cicatriz atrófica y PIH (sobre todo en fototipos altos / piel peruana).',
      capa: 'Glándula sebácea, infundíbulo folicular, dermis (donde se juega la cicatriz). Mapear distribución (cara vs tronco) cambia el abordaje.',
      decision: 'Leve-moderado: retinoide tópico + BPO (± antibiótico tópico) de entrada — atacar varios mecanismos a la vez. Moderado-severo: añadir oral, limitar antibióticos en tiempo y siempre con BPO (resistencias), considerar hormonal en mujeres. Nódulo-quístico / resistente / con cicatriz: isotretinoína con su programa de seguridad (laboratorio, anticoncepción). Clasificar siempre (IGA, Glogau para cicatriz, Fitzpatrick).',
      noErrar: 'No dejar progresar a cicatriz por "esperar a ver"; teratogenicidad de isotretinoína; no monoterapia prolongada de antibiótico.',
      comunicacion: '"El acné es una enfermedad de la piel, no falta de higiene — lavarse más lo empeora. Es crónica: vamos a controlarla, no a curarla en una semana. Las primeras 4-8 semanas la piel puede irritarse o verse peor antes de mejorar; eso es esperado y NO es para abandonar." Dibujar el folículo. Fijar expectativa de TIEMPO.',
      habito: 'Rutina mínima viable (limpiador suave, el activo, fotoprotección obligatoria por PIH), aplicar sobre toda la zona y no solo el grano, empezar lento con el retinoide (noches alternas). Revisión 6-8 semanas con foto estandarizada; medir IGA (CADI si tesis). Anticipar y nombrar los efectos = palanca nº1 de adherencia.',
    },
    catastrofe: 'Cicatriz permanente por retraso terapéutico / embarazo bajo isotretinoína → tratar precoz y programa de seguridad estricto.',
    guion: '"No es falta de higiene. Es crónica: la controlamos. Las primeras semanas la piel se queja: significa que funciona, no que falla."',
    fuentes: [F.globalAcne, F.ca(275941112, 'S1 Sebaceous/Eccrine/Apocrine'), F.dn('acne')],
    verificar: ['Dosis y duración de isotretinoína y de antibiótico oral — A VERIFICAR (05-sep) en Global Alliance 2018 texto completo'] },

  { id: 'B-10-ampollosas', d: 10, bKey: 'B', tier: 'CRIT', titulo: 'Ampollosas autoinmunes: pénfigo vs penfigoide vs dermatitis herpetiforme', referente: 'Fitzpatrick / Barnhill',
    pasos: {
      causa: 'Autoanticuerpos contra proteínas de adhesión: desmogleína 1/3 (pénfigo, intraepidérmico) · BP180/BP230 hemidesmosoma (penfigoide, subepidérmico) · transglutaminasa epidérmica/IgA (dermatitis herpetiforme, celiaquía).',
      mecanismo: 'El NIVEL de la ampolla es el mecanismo: pérdida de adhesión entre queratinocitos (acantólisis) → ampolla flácida que se rompe (Nikolsky +, erosiones orales) vs separación en la unión dermoepidérmica → ampolla tensa que resiste (penfigoide, prurito, anciano) vs IgA granular en papilas → vesículas agrupadas muy pruriginosas en codos/rodillas/glúteos.',
      capa: 'Epidermis (suprabasal en pénfigo vulgar; subcórnea en foliáceo/SSSS) vs zona de la membrana basal (lámina lúcida en penfigoide, sublámina densa en EBA: salt-split techo vs suelo).',
      decision: 'Sospecha → biopsia de lesión + perilesional para IFD (IgG intercelular "en panal" vs IgG/C3 lineal en BMZ vs IgA granular) + IFI/ELISA → pénfigo: corticoide sistémico + ahorrador/rituximab (especialista) · penfigoide: corticoide tópico potente extenso ± sistémico · DH: dieta sin gluten + dapsona (con G6PD previa).',
      noErrar: 'No confundir pénfigo (mucosas, flácida, mortal sin tratamiento) con penfigoide (tensa, mejor pronóstico); no dar dapsona sin G6PD; no "reventar y cubrir" sin biopsia; descartar SJS/TEN y SSSS en el agudo.',
      comunicacion: '"Esto necesita una biopsia para saber exactamente qué es antes de tratar; no es urgencia de hoy pero sí de esta semana. Mientras tanto: no reventar, fomentos y evitar el sol."',
      habito: 'Cuidado de erosiones, boca blanda si mucosas, control de efectos del corticoide (glucosa, presión, hueso). Revisión según especialista; Nítida acompaña adherencia y cribado de efectos.',
    },
    catastrofe: 'Pénfigo vulgar no reconocido → sepsis/pérdida de fluidos por erosiones extensas; SJS/TEN mal etiquetado como "ampollas" → retirar fármaco y unidad de quemados.',
    guion: '"Necesita biopsia esta semana; no es la urgencia de hoy. No reventar, fomentos, sin sol."',
    fuentes: [F.ca(275942016, 'S6 Bullous Diseases'), F.dn('pemphigus-vulgaris'), F.dn('bullous-pemphigoid')] },

  { id: 'B-12-farmacodermias', d: 12, bKey: 'B', tier: 'CRIT', titulo: 'Farmacodermias graves: SJS/TEN, DRESS, AGEP', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Reacción de hipersensibilidad grave a un fármaco (T citotóxica en SJS/TEN; T con eosinofilia y reactivación de herpesvirus en DRESS; neutrofílica en AGEP), no "alergia cutánea leve".',
      mecanismo: 'SJS/TEN: linfocitos T citotóxicos/granulisina → apoptosis masiva de queratinocitos → despegamiento epidérmico (Nikolsky +), mucosas, fiebre; SJS <10 % BSA, TEN >30 %. DRESS: 2-8 semanas tras el fármaco, exantema + edema facial + fiebre + adenopatías + eosinofilia + hígado/riñón. AGEP: pústulas estériles no foliculares sobre eritema en pliegues, horas-días tras el fármaco.',
      capa: 'Epidermis en necrosis de espesor total (TEN) = "quemadura" interna; mucosas oral/ocular/genital; órganos internos en DRESS.',
      decision: 'Reconocer el patrón (mucosas + Nikolsky = SJS/TEN; edema facial + eosinofilia = DRESS; pústulas agudas = AGEP) → SUSPENDER TODOS los fármacos sospechosos (regla de las 8 semanas previas) → SJS/TEN: unidad de quemados/UCI, soporte, oftalmología; DRESS: corticoide sistémico prolongado (especialista); AGEP: retirar y tópicos.',
      noErrar: 'No reintroducir el fármaco ni sus reactivos cruzados (aromáticos anticonvulsivantes entre sí); no retrasar el traslado "a ver si mejora"; ojo seco/simbléfaron y secuelas oculares si no se ve oftalmología.',
      comunicacion: '"Esto puede ser una reacción grave a un medicamento y hay que verlo hoy en urgencias. Deje de tomar [fármaco] ahora mismo y lleve esta lista con las fechas: es lo que más ayuda al médico que lo reciba."',
      habito: 'Alergia documentada en la ficha (fármaco + reacción + fecha) y tarjeta para el paciente; evitar reexposición y cruzados. Revisión de secuelas oculares/mucosas a 4-8 semanas.',
    },
    catastrofe: 'TEN no reconocida → mortalidad alta por sepsis/fallo multiorgánico → suspender fármaco hoy + unidad de quemados + oftalmología.',
    guion: '"Puede ser una reacción grave a un medicamento: deje de tomarlo ahora y vaya hoy a urgencias con esta lista."',
    fuentes: [F.ca(275944593, 'S23 Adverse Drug Reactions'), F.dn('stevens-johnson-syndrome-toxic-epidermal-necrolysis')],
    verificar: ['Cortes de % BSA para SJS/overlap/TEN y criterios RegiSCAR de DRESS — A VERIFICAR (05-sep) en Color Atlas 9e S23'] },

  { id: 'C-14-bacterianas', d: 14, bKey: 'C', tier: 'CRIT', titulo: 'Bacterianas: impétigo, celulitis/erisipela, SSSS, fascitis (cuándo NO es celulitis)', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Invasión bacteriana (S. aureus, S. pyogenes) de una capa concreta: epidermis (impétigo), dermis superficial (erisipela), dermis profunda/subcutáneo (celulitis), fascia (fascitis necrotizante) o toxina a distancia (SSSS).',
      mecanismo: 'La capa infectada dicta el cuadro: costras melicéricas superficiales (impétigo) · placa roja caliente con borde neto y elevado (erisipela, linfáticos superficiales) · borde difuso (celulitis) · toxina exfoliativa que rompe desmogleína 1 → despegamiento superficial sin mucosas (SSSS) · necrosis fascial con dolor desproporcionado, crepitación, bullas hemorrágicas y toxicidad (fascitis).',
      capa: 'Epidermis → dermis superficial → dermis profunda/subcutáneo → fascia. Cuanto más profunda, más sistémica y más quirúrgica.',
      decision: 'Impétigo localizado: tópico; extenso: oral antiestafilocócico → erisipela/celulitis: antibiótico sistémico + marcar el borde + elevar; revisar 48 h → signos de alarma (dolor desproporcionado, progresión rápida, crepitación, bullas, hipotensión) = fascitis → cirugía URGENTE + antibiótico de amplio espectro → SSSS (neonato/niño, Nikolsky +, sin mucosas): antiestafilocócico IV.',
      noErrar: 'Tratar una fascitis necrotizante como celulitis "y esperar": la mortalidad se decide en horas — el desbridamiento no se retrasa por imagen; no confundir SSSS (sin mucosas, subcórneo) con TEN (mucosas, espesor total).',
      comunicacion: '"Esto es una infección de la piel; dibujo el borde para ver mañana si avanza. Si el dolor es mucho mayor de lo que se ve, o aparece fiebre alta o ampollas oscuras, es urgencia inmediata."',
      habito: 'Tratar la puerta de entrada (tiña pedis, eccema, úlcera), elevación, completar antibiótico. Celulitis recurrente: profilaxis de la puerta de entrada. Revisión 48 h del borde marcado.',
    },
    catastrofe: 'Fascitis necrotizante etiquetada como celulitis → desbridamiento quirúrgico urgente + antibiótico de amplio espectro, sin esperar pruebas.',
    guion: '"Marco el borde. Si el dolor supera lo que se ve, es urgencia ahora."',
    fuentes: [F.ca(275944706, 'S25 Bacterial Infections'), F.dn('cellulitis')] },

  { id: 'C-16-virales', d: 16, bKey: 'C', tier: 'CRIT', titulo: 'Virales: HSV/VZV (Tzanck), VPH, molusco', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Infección viral con tropismo epidérmico: latencia neuronal y reactivación (HSV/VZV), proliferación epitelial inducida (VPH), poxvirus (molusco).',
      mecanismo: 'HSV/VZV: replicación en queratinocitos → degeneración balonizante y células gigantes multinucleadas (Tzanck) → vesículas agrupadas sobre eritema (HSV) o dermatomales unilaterales (zóster, dolor previo); VPH: hiperplasia epidérmica con koilocitos → verruga que interrumpe dermatoglifos con puntos negros (capilares trombosados); molusco: cuerpos de inclusión → pápula umbilicada.',
      capa: 'Epidermis (vesícula intraepidérmica, hiperplasia); ganglio sensitivo (latencia); en inmunodeprimidos las lesiones se hacen atípicas, extensas o necróticas.',
      decision: 'Reconocer patrón (agrupado vs dermatomal vs verrucoso vs umbilicado) → HSV/zóster: antiviral oral precoz (zóster: idealmente <72 h; oftálmico o inmunodeprimido: valorar IV y oftalmología) → verrugas: destructivos/queratolíticos escalonados o esperar en niños → molusco: observar o destructivo; en adulto genital/extenso: cribar VIH/ITS.',
      noErrar: 'Zóster oftálmico (punta nasal = Hutchinson → ojo) y zóster diseminado en inmunodeprimido; eccema herpético en atópico; molusco extenso en adulto = descartar VIH; no biopsiar un "molusco" en VIH sin pensar en criptococosis/histoplasmosis.',
      comunicacion: '"El virus queda dormido en el nervio y puede volver con estrés, sol o defensas bajas; el antiviral acorta el brote y evita el dolor posterior si se empieza pronto." En VPH: "las verrugas se curan, pero tardan y pueden volver".',
      habito: 'Iniciar antiviral al primer hormigueo (receta en casa en recurrentes), fotoprotección labial, no compartir toallas/rasuradoras; vacuna de zóster según edad (A VERIFICAR indicación local).',
    },
    catastrofe: 'Zóster oftálmico / eccema herpético / zóster diseminado en inmunodeprimido → antiviral sistémico urgente (± IV) + oftalmología.',
    guion: '"El virus duerme en el nervio; empezado pronto, el antiviral acorta el brote y evita el dolor después."',
    fuentes: [F.ca(275945801, 'S27 Viral Diseases'), F.dn('herpes-simplex')],
    verificar: ['Dosis/duración de antivirales y ventana de 72 h del zóster — A VERIFICAR (05-sep) en Color Atlas 9e S27'] },

  { id: 'C-18-parasitosis', d: 18, bKey: 'C', tier: 'CRIT', titulo: 'Parasitosis: escabiosis, leishmaniasis (Perú), pediculosis, larva migrans', referente: 'Fitzpatrick / Color Atlas 9e (eje Perú)',
    pasos: {
      causa: 'Parásito en la piel: ácaro que excava túneles (Sarcoptes), protozoo inoculado por flebótomo (Leishmania, endémica en Perú), piojo, larva de anquilostoma animal.',
      mecanismo: 'Escabiosis: hembra en el estrato córneo → surcos + prurito nocturno por hipersensibilidad (empeora de noche, contactos con picor); leishmaniasis cutánea: amastigotes en macrófagos dérmicos → pápula que se ulcera con borde indurado sobreelevado en zona expuesta, indolora, de meses; mucocutánea: destrucción nasal/oral tardía.',
      capa: 'Estrato córneo (surco escabiótico: pliegues interdigitales, muñecas, genitales; en lactante palmas/plantas) · dermis (granuloma de leishmaniasis) · mucosas (forma mucocutánea).',
      decision: 'Escabiosis: escabicida tópico a TODOS los convivientes al mismo tiempo + ropa/cama; costrosa (inmunodeprimido): ivermectina oral + tópico; prurito post-escabiosis semanas = no reinfestación. Leishmaniasis: confirmar (frotis/biopsia/PCR) → tratamiento según especie y forma (antimoniales u otros, programa MINSA) — nunca "úlcera crónica sin diagnóstico".',
      noErrar: 'Tratar solo al paciente y no a los contactos (reinfestación); dejar una úlcera indolora de meses como "infección" (leishmaniasis, esporotricosis, TB cutánea o CBC); escabiosis costrosa como "psoriasis"; leishmaniasis mucosa no reconocida.',
      comunicacion: '"El picor de noche y en la familia es escabiosis: se cura, pero todos los de casa se tratan el mismo día aunque no piquen; el picor puede seguir unas semanas y no significa que siga viva." Leishmaniasis: "esta úlcera la causa un parásito de la picadura; se trata y se cura, pero hay que confirmar cuál es".',
      habito: 'Lavar ropa/cama a alta temperatura o bolsa cerrada varios días, repetir el escabicida según pauta, revisar a las 2-4 semanas. Leishmaniasis: repelente/mosquitero en zona endémica, seguimiento de cicatriz y de mucosas.',
    },
    catastrofe: 'Leishmaniasis mucocutánea por úlcera no diagnosticada / escabiosis costrosa en inmunodeprimido → confirmar y tratar con programa; tratar convivientes.',
    guion: '"Todos en casa se tratan el mismo día aunque no les pique."',
    fuentes: [F.ca(275946425, 'S28 Infestations'), F.dn('leishmaniasis'), F.dn('scabies')],
    verificar: ['Esquema terapéutico de leishmaniasis (norma técnica MINSA vigente) y pauta de repetición del escabicida — A VERIFICAR (05-sep)'] },

  { id: 'D-22-queratosis-actinica', d: 22, bKey: 'D', tier: 'CRIT', titulo: 'Queratosis actínica + campo de cancerización', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Daño UV acumulado en queratinocitos (mutaciones p53): lesión precursora de CEC en piel fotoexpuesta, y el campo que la rodea ya está mutado aunque se vea normal.',
      mecanismo: 'UVB → dímeros de pirimidina → clones de queratinocitos atípicos en la capa basal → pápula áspera con escama adherente ("se palpa más que se ve"); patrón en fresa dermatoscópico (pseudorred rosada + folículos con halo blanco). Una fracción progresa a CEC in situ (Bowen) y a CEC invasor.',
      capa: 'Epidermis (atipia basal con paraqueratosis; respeta anejos) sobre dermis con elastosis solar. Campo de cancerización = toda la unidad fotoexpuesta (cuero cabelludo, cara, dorso de manos).',
      decision: 'Lesión aislada: crioterapia o destructivo; múltiples/campo: terapia de campo (5-FU, imiquimod, PDT — A VERIFICAR pautas) + fotoprotección; induración, dolor, crecimiento rápido, sangrado o >1 cm = biopsia (CEC).',
      noErrar: 'Tratar con crioterapia un CEC invasor disfrazado de QA (induración, dolor); ignorar el campo (tratar solo la lesión que se ve); QA en inmunodeprimido/trasplantado = riesgo alto de CEC.',
      comunicacion: '"Estas manchas ásperas son el aviso del sol acumulado: la mayoría no pasa a nada, pero alguna puede volverse cáncer de piel, por eso las tratamos y protegemos toda la zona, no solo la mancha."',
      habito: 'Fotoprotección diaria de amplio espectro + sombrero (la única prevención del campo), autoexploración de lesiones nuevas induradas o que sangran, revisión periódica (más frecuente en inmunodeprimidos).',
    },
    catastrofe: 'CEC invasor tratado como QA con crioterapia → biopsiar toda lesión indurada, dolorosa o que no responde.',
    guion: '"Es el aviso del sol acumulado: tratamos la mancha y protegemos toda la zona."',
    fuentes: [F.ca(275942807, 'S11 Precancerous Lesions & Cutaneous Carcinomas'), F.dn('actinic-keratosis')],
    verificar: ['Pautas de 5-FU/imiquimod/PDT y % de progresión QA→CEC — A VERIFICAR (05-sep) en Color Atlas 9e S11'] },

  { id: 'D-23-cbc-cec', d: 23, bKey: 'D', tier: 'CRIT', titulo: 'Carcinoma basocelular + espinocelular: subtipos, riesgo, manejo', referente: 'Fitzpatrick / Margin Control Surgery',
    pasos: {
      causa: 'CBC: tumor de células basaloides por activación de la vía Hedgehog (PTCH1) con UV crónica; CEC: transformación maligna del queratinocito por UV acumulada (± VPH, inmunosupresión, cicatrices crónicas).',
      mecanismo: 'CBC: nidos basaloides en empalizada con retracción, crecimiento local lento, casi nunca metastatiza pero destruye (nariz, párpado, oreja); clínica: pápula perlada con telangiectasias arboriformes, úlcera que no cura. CEC: perlas córneas y atipia invasora; pápula/nódulo hiperqueratósico o úlcera indurada, crece más rápido, sí metastatiza (labio, oreja, inmunodeprimido, >2 cm, perineural).',
      capa: 'Epidermis → dermis → invasión perineural/ósea en los agresivos. Subtipos de CBC infiltrativo/morfeiforme/micronodular tienen bordes subclínicos mal definidos.',
      decision: 'Biopsia (shave/punch según lesión; NUNCA shave parcial si se piensa en melanoma) → estratificar riesgo (área H de la cara, tamaño, subtipo, bordes, recurrencia, inmunosupresión, perineural) → bajo riesgo: excisión con margen estándar; alto riesgo/área H/recurrente: Mohs (control de márgenes); no candidato quirúrgico: radioterapia; localmente avanzado/metastásico: sistémico (inhibidor Hedgehog en CBC, inmunoterapia en CEC — especialista).',
      noErrar: 'CBC en área H (canto interno, nariz, oreja, párpado) resecado "a ojo" con margen insuficiente → recurrencia destructiva; CEC en inmunodeprimido/labio/oreja subestimado (metástasis); tratar un melanoma amelanótico como CBC.',
      comunicacion: '"Es un cáncer de piel de los que se curan quitándolo bien; no suele extenderse (CBC) / puede hacerlo si no se trata (CEC). Lo importante es quitarlo entero: por eso a veces usamos una técnica que revisa los bordes al momento (Mohs)."',
      habito: 'Fotoprotección estricta, autoexploración mensual, revisión periódica (nuevo cáncer de piel en los años siguientes es frecuente), control de inmunosupresión si aplica.',
    },
    catastrofe: 'Recurrencia destructiva de CBC en área H por margen insuficiente / CEC metastásico en inmunodeprimido → estratificar riesgo y Mohs cuando está indicado.',
    guion: '"Se cura quitándolo entero; por eso a veces revisamos los bordes al momento."',
    fuentes: [F.ca(275942807, 'S11 Cutaneous Carcinomas'), F.dn('basal-cell-carcinoma'), 'AccessDerma Margin Control Surgery of the Skin · bookid 3319'],
    verificar: ['Márgenes clínicos en mm por riesgo y criterios AUC de Mohs — A VERIFICAR (05-sep) en Margin Control Surgery (3319)'] },

  { id: 'D-24-melanoma', d: 24, bKey: 'D', tier: 'CRIT', titulo: 'Melanoma: ABCDE, Breslow, manejo (acral/lentiginoso en fototipos altos = Perú)', referente: 'Fitzpatrick / Color Atlas 9e',
    pasos: {
      causa: 'Transformación maligna del melanocito (BRAF/NRAS/KIT, UV intermitente en extensión superficial; sin relación UV en acral/mucoso, la forma más frecuente en fototipos altos).',
      mecanismo: 'Fase de crecimiento radial (in situ / lentiginoso, años) → fase vertical (invasión dérmica: Breslow = mm desde la granulosa = el pronóstico) → ganglio → metástasis. Clínica: ABCDE + "patito feo" + cambio; dermatoscopia: asimetría de estructuras, red atípica, velo azul-blanco, vasos polimorfos; acral: patrón paralelo de las crestas (vs surcos benigno).',
      capa: 'Unión dermoepidérmica (radial) → dermis (vertical, Breslow) → linfático. Acral: palmas, plantas, subungueal (Hutchinson = pigmento en el pliegue proximal).',
      decision: 'Sospecha → biopsia EXCISIONAL completa con margen estrecho (nunca shave parcial ni curetaje) → Breslow/ulceración/mitosis → ampliación de márgenes según Breslow + ganglio centinela según umbral (A VERIFICAR mm) → estadio → adyuvancia/inmunoterapia en avanzado (oncología).',
      noErrar: 'Shave o "quemar" una lesión pigmentada sospechosa (pierde el Breslow); melanoma acral/subungueal tratado como hematoma u onicomicosis durante meses; melanoma amelanótico nodular etiquetado de "angioma/CBC".',
      comunicacion: '"Esta mancha tiene señales de alarma y hay que quitarla completa para analizarla; el análisis nos dice la profundidad y con eso el plan. Detectado a tiempo, el melanoma se cura."',
      habito: 'Autoexploración mensual incluidas plantas y uñas (Perú: acral), fotoprotección, revisión con dermatoscopia según riesgo (nevus múltiples/atípicos, antecedente familiar).',
    },
    catastrofe: 'Melanoma acral/subungueal diagnosticado tarde por confundirlo con hematoma/hongo → biopsia excisional de toda melanoniquia o lesión acral cambiante.',
    guion: '"Hay que quitarla entera para analizarla: la profundidad decide el plan. A tiempo, se cura."',
    fuentes: [F.ca(275942978, 'S12 Melanoma'), F.dn('melanoma')],
    verificar: ['Márgenes de ampliación por Breslow y umbral de ganglio centinela — A VERIFICAR (05-sep) en Color Atlas 9e S12 / guía AAD'] },

  { id: 'G-44-cicatrizacion', d: 44, bKey: 'G', tier: 'CRIT', titulo: 'Cicatrización + complicaciones quirúrgicas y su manejo', referente: 'Dermatologic Surgery (AccessDerma)',
    pasos: {
      causa: 'Toda herida repara en fases; la complicación es la fase que se descarrila: sangre acumulada (hematoma), bacteria (infección), tensión (dehiscencia/necrosis), exceso de colágeno (queloide).',
      mecanismo: 'Hemostasia → inflamación (días 1-3) → proliferación (granulación, epitelización, angiogénesis) → remodelación (colágeno III → I durante meses). Hematoma a 24-48 h (tenso, doloroso); infección día 4-7 (eritema, calor, exudado); dehiscencia día 7-10 (tensión, al retirar suturas); necrosis de colgajo por tensión/tabaco/hematoma bajo el colgajo; queloide sobrepasa los bordes (fototipos altos, tórax/hombros/lóbulo).',
      capa: 'Epidermis (epitelización desde bordes y anejos) · dermis (colágeno, la cicatriz visible) · subcutáneo (hematoma, espacio muerto) · pedículo vascular del colgajo.',
      decision: 'Prevención: hemostasia meticulosa, cierre por planos sin tensión, RSTL, antibiótico solo si indicado. Hematoma tenso: drenar; infección: cultivo + antibiótico; dehiscencia: cierre secundario o resutura según tiempo; necrosis: desbridar lo desvitalizado y curar por segunda intención; queloide: corticoide intralesional ± otras (A VERIFICAR pautas), prevención en riesgo.',
      noErrar: 'No drenar un hematoma tenso bajo un colgajo (necrosis); confundir eritema inflamatorio normal de 48 h con infección (antibiótico innecesario) o al revés; cirugía electiva en fototipo alto con antecedente de queloide sin advertirlo.',
      comunicacion: '"Una cicatriz tarda un año en madurar: primero roja y dura, luego se aclara y ablanda. Los primeros días un poco de rojo y calor es normal; dolor que aumenta, pus o que se abra no lo es: llame."',
      habito: 'Cuidado de herida simple, evitar tensión/esfuerzo, no fumar, fotoprotección de la cicatriz 6-12 meses, silicona/masaje según indicación. Revisión a la retirada de suturas y a los 3 meses con foto.',
    },
    catastrofe: 'Necrosis de colgajo por hematoma no drenado / infección profunda → drenar, desbridar, cultivo y antibiótico.',
    guion: '"La cicatriz tarda un año en madurar; rojo y calor los primeros días es normal, dolor creciente o pus no."',
    fuentes: [F.ad(2811, 245222451, 'Dermatologic Surgery · Managing Surgical Complications'), F.dn('keloid-and-hypertrophic-scar')],
    verificar: ['Pautas de corticoide intralesional en queloide y criterios de profilaxis antibiótica — A VERIFICAR (05-sep) en 2811/245222451'] },

  // ══════════════ ESTÉTICA X (22) ══════════════
  { id: 'X-19-oclusion-vascular', d: 19, bKey: 'X', tier: 'CRIT', titulo: 'OCLUSIÓN VASCULAR por relleno: reconocimiento + protocolo HDPH de memoria', referente: 'DeLorenzi',
    pasos: {
      causa: 'Un bolo de ácido hialurónico dentro de una arteria (o comprimiéndola) corta la perfusión del territorio: el problema es un émbolo de gel, no una "reacción".',
      mecanismo: 'Émbolo intraarterial → isquemia inmediata del territorio (palidez/blanqueo) → livedo reticular → cianosis → necrosis si no se resuelve; el dolor puede faltar por el anestésico. La arteria ocluida por HA necesita INUNDARSE de hialuronidasa: concentración suficiente durante tiempo suficiente para hidrolizar el bloque hasta que los productos pasen por el lecho capilar (DeLorenzi 2017).',
      capa: 'Arterias nominadas del subcutáneo (facial/angular, dorsal nasal, supratroclear, supraorbitaria, temporal superficial) y sus anastomosis con la a. oftálmica. No hay áreas de riesgo cero; hay áreas de más y menos riesgo.',
      decision: 'Reconocer (blanqueo/livedo, relleno capilar lento, dolor desproporcionado o ausente) → PARAR y anotar la hora → hialuronidasa en dosis ALTA inundando todo el tejido isquémico → REPETIR CADA HORA hasta resolución clínica (relleno capilar, color de la piel y ausencia de dolor) → si ojo o neuro: protocolo de ceguera (d20). Ventana: implementado en <2 días del inicio, sin pérdida de piel en su serie.',
      noErrar: 'Una sola dosis "y esperar"; cócteles (compresas, AAS, nitroglicerina) como motor del rescate en vez de hialuronidasa repetida; inyectar sin hialuronidasa en la clínica; no reconocer la isquemia porque "no duele".',
      comunicacion: 'Antes: "Existe una complicación rara pero seria en la que el producto tapa un vaso; la reconozco en el momento y tengo el antídoto aquí." Durante: calma, explicar cada pulso horario y que la vigilancia sigue hasta que la piel esté rosada y sin dolor.',
      habito: 'Hábito del inyector: hialuronidasa siempre a mano y con fecha vigente, checklist HDPH recitado en cada checkpoint (drill 90 s), técnica de baja presión y bajo volumen. Paciente: contacto 24 h y revisión diaria hasta resolución.',
    },
    catastrofe: 'Necrosis cutánea (o ceguera) por émbolo de HA → hialuronidasa HDPH inmediata, pulsos horarios hasta relleno capilar/color/sin dolor; ojo → Goodman 2020 + oftalmología.',
    guion: '"Es rara pero seria: la reconozco al momento y tengo el antídoto aquí."',
    fuentes: [F.delorenzi17, F.delorenzi14, F.delorenzi13],
    verificar: ['UI de hialuronidasa por "área" (SPEC §2.4 orienta ~450 UI por área de bajo volumen y ~900 si afecta una segunda zona) — A VERIFICAR (05-sep) en el texto completo de DeLorenzi 2017: el abstract solo fija "dosis altas repetidas cada hora hasta resolución"', 'Nº máximo de pulsos y criterio de parada — A VERIFICAR (05-sep) texto completo'] },

  { id: 'X-20-ceguera', d: 20, bKey: 'X', tier: 'CRIT', titulo: 'Ceguera por relleno: prevención, manejo inmediato, kit de emergencia', referente: 'Goodman / Magnusson (consenso 2020)',
    pasos: {
      causa: 'Émbolo de HA que alcanza la a. oftálmica/central de la retina por flujo retrógrado desde una arteria facial anastomosada, casi siempre desde nariz, glabela o frente.',
      mecanismo: 'Bolo a presión en supratroclear/supraorbitaria/dorsal nasal/angular → viaja contra corriente hasta la a. oftálmica → con la relajación del émbolo entra en la a. central de la retina o ciliares → pérdida visual inmediata (± dolor ocular, ptosis, oftalmoplejía; ± ictus si pasa a carótida interna). Casos reportados: nariz 56,3 %, glabela 27,1 %, frente 18,8 % (Goodman 2020).',
      capa: 'Grado 4 de riesgo: glabela, nariz, frente · grado 3: sien, surco nasogeniano, surco lagrimal, periorbital, mejilla medial · grado 2: labios, perioral, mejilla anterior · grado 1: mandíbula/marioneta, mejilla lateral, submalar, preauricular, mentón.',
      decision: 'Es una emergencia vascular verdadera: pedir ayuda y organizar traslado urgente (hospital oftalmológico/emergencias) → anotar la hora, evaluar visión, pupilas, movimientos oculares y neuro básico → si el relleno era HA: hialuronidasa a dosis alta (1500 UI en 2 mL de lidocaína 1 %) donde se puso el relleno + en el reborde supraorbitario en la localización de la a. supratroclear (14 mm de la línea media) → retrobulbar/peribulbar SOLO con experiencia y diagnóstico seguro → medidas para bajar la PIO (masaje ocular, rebreathing, timolol) son de baja evidencia pero no se desaconsejan → NO anticoagular en consulta.',
      noErrar: 'Perder minutos "observando"; no tener hialuronidasa en la clínica (todas deben tenerla); confiar en la aspiración (sin evidencia; el consenso recomienda en contra); creer que la cánula es segura en la nariz (no lo es) o que una cánula <25 G no se comporta como aguja.',
      comunicacion: 'Consentimiento: nombrar la ceguera con calma y el plan de rescate ("sube la confianza, no la baja"). En el evento: "Vamos a actuar ahora mismo y te llevamos al oftalmólogo; te explico cada paso."',
      habito: 'Prevención como hábito: microbolos <0,1 mL, muy lento, baja presión de extrusión, aguja siempre en movimiento, dirección lejos del ojo en zonas de alto riesgo, anestésico con epinefrina en el punto de entrada de la cánula, considerar aguja/cánula perpendicular a los vasos axiales; kit de emergencia revisado (hialuronidasa vigente) y simulacro cronometrado en cada checkpoint.',
    },
    catastrofe: 'Pérdida visual por émbolo → hialuronidasa 1500 UI/2 mL lidocaína 1 % en el sitio + supratroclear (14 mm de línea media), retrobulbar solo con experiencia, traslado inmediato a oftalmología; no anticoagular en consulta.',
    guion: '"Es rarísimo, pero si pasa sé qué hacer en el primer minuto y adónde ir en el segundo."',
    fuentes: [F.goodman20, F.delorenzi17, F.cotofana22],
    verificar: ['Composición completa del kit de emergencia (más allá de hialuronidasa disponible siempre) — A VERIFICAR (05-sep) en Goodman 2020 tabla/apéndice', 'Ventana de isquemia retiniana tolerable (la cifra "90 min" NO aparece en el consenso) — A VERIFICAR (05-sep) en fuente oftalmológica primaria'] },

  { id: 'X-47-anatomia-3d', d: 47, bKey: 'X', tier: 'CRIT', titulo: 'Anatomía facial 3D: 5 capas, SMAS, compartimentos grasos, ligamentos', referente: 'Cotofana',
    pasos: {
      causa: 'Lo que el paciente llama "surco" o "flacidez" es el resultado de cómo se apilan y deslizan cinco capas ancladas por ligamentos, no un defecto de la piel.',
      mecanismo: 'Las 5 capas (piel → grasa subcutánea en compartimentos → SMAS/músculo → grasa profunda y espacios → periostio/hueso) se mueven en bloque en la cara móvil y quedan fijas en los ligamentos de retención (orbicular, cigomático, mandibular, masetérico-cutáneo); la deflación de compartimentos profundos y la reabsorción ósea hunden las superficiales y marcan los surcos justo en los puntos de anclaje.',
      capa: 'Cada región tiene su versión: sien (capas múltiples con arterias temporales superficial y profunda), mediocara (grasa profunda medial/SOOF), labio (submucoso), mentón/mandíbula (supraperióstico). El plano supraperióstico profundo es relativamente seguro en pómulo; el subcutáneo superficial contiene las arterias nominadas.',
      decision: 'Análisis por capas antes de tratar: ¿el problema es hueso (soporte), grasa profunda (volumen), ligamento (descolgamiento) o piel (calidad)? → cada capa tiene su herramienta (relleno profundo de soporte, relleno superficial de contorno, toxina para vector, energía para piel). Secuenciar fundación (profundo, mediofacial) → refinamiento.',
      noErrar: 'Tratar la capa equivocada (rellenar piel cuando falta hueso); inyectar subcutáneo en zonas con arterias nominadas creyendo que es "profundo"; ignorar la transmisión de fuerza sien→mandíbula al planificar.',
      comunicacion: 'Dibujar el sándwich de capas: "la cara no tiene líneas, pierde estructura; la línea es el humo, el fuego es la pérdida de soporte. Devolvemos soporte donde falta, no tapamos la línea."',
      habito: 'Estudio del inyector: recitar las 5 capas y los ligamentos por región antes de cada procedimiento; palpación ósea y de ligamentos como rutina de exploración; foto estandarizada 3D-like (frontal, 45°, perfil) en cada visita.',
    },
    catastrofe: 'Inyección en plano equivocado (arteria del subcutáneo) → oclusión → HDPH; anatomía por región antes de cada punto.',
    guion: '"La línea es el humo; el fuego es la pérdida de estructura. Devolvemos soporte, no tapamos líneas."',
    fuentes: [F.ad(3200, 266614877, 'Baumann 3e · Facial Anatomy and Aging'), F.cotofana22, F.freytag19] },

  { id: 'X-48-arterias-safe-zones', d: 48, bKey: 'X', tier: 'CRIT', titulo: 'Arterias peligrosas + zonas seguras: glabela, nariz, sien, surco nasogeniano', referente: 'Cotofana',
    pasos: {
      causa: 'El riesgo de un punto no es la región sino la combinación región × plano × arteria: la misma zona es segura en un plano y letal en otro.',
      mecanismo: 'Glabela: supratroclear/supraorbitaria (ramas de la oftálmica) superficiales → vía directa al ojo. Nariz: dorsal nasal + angular (anastomosis con oftálmica), muy superficiales en dorso/punta. Sien: temporal superficial (subcutánea) y temporal profunda (interfascial/periostio). Surco nasogeniano: a. facial cambia de plano (profunda abajo, superficial arriba) → el "punto de fuga" hacia la angular.',
      capa: 'Pensar "dónde SÍ": plano supraperióstico en pómulo lateral, interfascial/supraperióstico en sien (evitando la temporal superficial), subcutáneo superficial en labio con microbolos, evitar nariz/glabela salvo expertos y siempre con protocolo de rescate listo.',
      decision: 'Para cada región: identificar la arteria dominante y su plano (Cotofana PAN 2022 / Freytag JDD 2019) → elegir el plano "seguro" para esa región y la herramienta (aguja para bolos supraperiósticos precisos, cánula donde el consenso la considera más segura: ceja, mejilla lateral/anterior; NO nariz) → microbolos, aguja en movimiento, baja presión.',
      noErrar: 'Bolo en glabela/nariz en plano superficial; dar por segura la cánula en la nariz; inyectar la sien sin saber si estoy sobre la temporal superficial; olvidar que grado 1 ≠ riesgo cero.',
      comunicacion: '"Cada zona tiene un mapa de vasos; inyecto en el plano donde no están y con técnica que reduce el riesgo al mínimo — y si algo pasa, sé qué hacer."',
      habito: 'Antes de inyectar: palpar pulsos (facial en el borde mandibular, temporal superficial), marcar con el paciente sentado, recitar plano y arteria; mapa anatómico de riesgo = variable "zona" en SR-1 (R33).',
    },
    catastrofe: 'Embolia hacia la oftálmica desde glabela/nariz/frente (grado 4) → protocolo Goodman 2020 + HDPH.',
    guion: '"Inyecto en el plano donde el vaso no está; y si algo pasa, sé qué hacer."',
    fuentes: [F.cotofana22, F.freytag19, F.goodman20] },

  { id: 'X-49-envejecimiento-mdasa', d: 49, bKey: 'X', tier: 'ALTA', titulo: 'Envejecimiento estructural + análisis facial (tercios, MD ASA)', referente: 'de Maio',
    pasos: {
      causa: 'La queja ("me veo cansada/triste") no es una línea: es el mensaje emocional que emite un conjunto de cambios estructurales (hueso, grasa, ligamento, piel).',
      mecanismo: 'Hueso: reabsorción orbitaria, maxilar, piriforme y mandibular → pérdida de soporte; grasa: deflación por compartimentos (profundos primero) → vacíos y descenso de los superficiales; ligamentos: laxitud → surcos en sus anclajes; piel: elastosis y arrugas. Todo junto emite atributos negativos (cansado, triste, enfadado, caído).',
      capa: 'MD ASA (de Maio 2021): H1 atributos emocionales (negativos cansado/triste/enfadado/caído vs positivos joven/atractivo/contorneado/femenino-masculino; elegir 3 prioritarios) → H2 tercios faciales → H3 dinámica periorbital/perioral → H4 unidades → H5 subunidades → ecuación MD Codes.',
      decision: 'Escuchar la queja literal → reformular a mensaje emocional → priorizar 3 atributos → mapear qué estructura los produce → plan por etapas (fundación mediofacial antes que refinamiento) → foto estandarizada antes/después realista.',
      noErrar: 'Tratar la "distracción" (la línea que señala el paciente) en vez de la causa; sobre-rellenar sin soporte óseo; prometer transformación ("cambiar la cara").',
      comunicacion: '"No vamos a cambiarte la cara; vamos a devolverte lo que el tiempo movió." Dibujar la cara que pierde estructura; fijar 3 objetivos máximo y un antes/después realista.',
      habito: 'Foto estandarizada en cada visita (misma luz/ángulo), plan por etapas escrito, revisión a 2-4 semanas del tratamiento y anual del plan estructural.',
    },
    catastrofe: 'Resultado antinatural por tratar la línea y no la causa (sobrecorrección, "cara de almohada") → análisis por capas y fundación primero.',
    guion: '"No te cambiamos la cara: te devolvemos lo que el tiempo movió."',
    fuentes: [F.mdasa, F.mdcodes, F.ad(3200, 266614593, 'Baumann 3e · Intrinsic Aging')] },

  { id: 'X-50-toxina-i', d: 50, bKey: 'X', tier: 'CRIT', titulo: 'Toxina I: mecanismo (SNAP-25), serotipos, unidades NO intercambiables', referente: 'Carruthers',
    pasos: {
      causa: 'La arruga dinámica la produce un músculo que tracciona la piel; la toxina no "borra la arruga", quita la tracción.',
      mecanismo: 'La cadena pesada de la toxina A se une a la terminal colinérgica → endocitosis → la cadena ligera cliva SNAP-25 (complejo SNARE) → no hay exocitosis de acetilcolina → denervación química reversible; el efecto aparece en días y revierte en meses por brotes axonales y nueva SNARE.',
      capa: 'Placa neuromuscular del músculo diana (frontal, corrugador, prócer, orbicular, masetero, platisma…); la difusión desde el punto depende de dosis, volumen y anatomía → la capa vecina que no quiero tocar (elevador del párpado) define el riesgo.',
      decision: 'Indicación (arruga dinámica vs estática: estática = relleno/energía) → producto (serotipo A: onabotulinum, abobotulinum, incobotulinum, prabotulinum, daxibotulinum) → dosis por punto según músculo y fuerza, nunca por "la línea" → mapear el vector de tracción y los antagonistas (debilitar uno libera al otro).',
      noErrar: 'Intercambiar unidades entre marcas 1:1 (no son intercambiables; usar tablas de conversión del producto); no reconstituir ni conservar según ficha; inyectar sin mapear el músculo (ptosis, asimetría).',
      comunicacion: '"No congela la cara: relaja el músculo que marca la arruga; tarda unos días en verse, dura meses y se va solo. No es intercambiable entre marcas: por eso uso siempre la misma y en tus unidades."',
      habito: 'Registro de producto/lote/unidades por punto con foto en reposo y en gesto; retoque programado a las 2 semanas; repetición según duración real observada.',
    },
    catastrofe: 'Debilidad no deseada por difusión/dosis (ptosis palpebral, disfagia en cuello) → sin antídoto: prevención por mapa muscular; ptosis → apraclonidina (A VERIFICAR pauta).',
    guion: '"Relaja el músculo que marca la arruga: tarda días, dura meses y se va solo."',
    fuentes: [F.carruthers, F.ad(3200, 266616475, 'Baumann 3e · Botulinum Toxins'), F.toxins25],
    verificar: ['Tablas de conversión entre productos y dosis por punto — A VERIFICAR (05-sep) en Carruthers 5e / Baumann 3e 266616475'] },

  { id: 'X-51-toxina-ii-superior', d: 51, bKey: 'X', tier: 'ALTA', titulo: 'Toxina II: tercio superior (frontal, glabela, patas de gallo) — cómo evitar la ptosis', referente: 'Carruthers',
    pasos: {
      causa: 'Las líneas del tercio superior son vectores: glabela (corrugador + prócer tiran medial/inferior), frente (frontal eleva), periocular (orbicular cierra).',
      mecanismo: 'El frontal es el ÚNICO elevador de la ceja: si lo debilito más que a sus depresores (corrugador, prócer, orbicular), la ceja cae (ptosis de ceja). Si la toxina difunde al elevador del párpado superior, cae el párpado (ptosis palpebral). Debilitar depresores glabelares sin frontal = ceja sube ("Spock" si queda frontal lateral activo).',
      capa: 'Corrugador (profundo medialmente, se superficializa lateral), prócer (línea media), frontal (delgado, superficial, bajo la galea), orbicular lateral (superficial, fuera del reborde orbitario); septo orbitario y elevador del párpado = lo que no quiero alcanzar.',
      decision: 'Explorar en gesto (fruncir, elevar, sonreír) y en reposo; posición de la ceja y de los párpados basal (ptosis latente compensada por frontal = NO tratar frente fuerte) → glabela: puntos en corrugador/prócer → frente: puntos altos, dosis baja, respetar la porción inferior → patas de gallo: orbicular lateral fuera del reborde orbitario → retoque a 2 semanas.',
      noErrar: 'Debilitar el frontal en quien lo usa para compensar una ptosis palpebral latente; puntos bajos/mediales en la frente (ptosis de ceja); inyectar bajo el reborde orbitario o cerca del septo (ptosis palpebral); olvidar el frontal lateral (Spock).',
      comunicacion: '"En la frente vamos con dosis baja y arriba: prefiero un retoque a los 15 días que una ceja caída dos meses. Si un párpado bajara, hay un colirio que ayuda mientras pasa."',
      habito: 'Fotos en reposo y gesto pre/post, retoque a las 2 semanas anotando qué corregí, registro por punto para reproducir o ajustar en la siguiente sesión.',
    },
    catastrofe: 'Ptosis palpebral por difusión al elevador → apraclonidina tópica (pauta A VERIFICAR) hasta que remita; ptosis de ceja → esperar (no hay antídoto).',
    guion: '"Dosis baja y arriba en la frente; mejor retocar que una ceja caída dos meses."',
    fuentes: [F.carruthers, F.ad(2811, 245227386, 'Dermatologic Surgery · Neuromodulators'), F.cureus26],
    verificar: ['Distancia mínima al reborde orbitario y dosis por punto en frontal/glabela — A VERIFICAR (05-sep) en Carruthers 5e', 'Concentración/pauta de apraclonidina — A VERIFICAR (05-sep) en Cureus 2026 PMC12865869'] },

  { id: 'X-52-toxina-iii-inferior', d: 52, bKey: 'X', tier: 'ALTA', titulo: 'Toxina III: tercio inferior, Nefertiti, masetero, hiperhidrosis', referente: 'Carruthers',
    pasos: {
      causa: 'En el tercio inferior y cuello la toxina modula fuerzas (elevadores vs depresores) y funciones (masticación, sudoración), no solo arrugas.',
      mecanismo: 'Nefertiti: debilitar bandas platismales (depresor) libera el vector elevador → redefine el contorno mandibular. Masetero: atrofia por desuso → adelgaza el ángulo mandibular y alivia bruxismo. DAO: comisura sube; mentalis: mentón empedrado se alisa; sonrisa gingival: elevador del labio superior y del ala nasal. Hiperhidrosis: bloqueo colinérgico de la glándula ecrina.',
      capa: 'Platisma (superficial, bandas), masetero (profundo bajo el arco cigomático, evitar risorio/cigomático mayor superficiales → sonrisa asimétrica), DAO (evitar depresor del labio inferior → labio caído), músculos periorales (dosis mínimas: incompetencia oral).',
      decision: 'Indicación precisa (bruxismo/contorno · bandas · comisura · sonrisa gingival · sudoración con test de Minor para mapear) → dosis conservadora, puntos profundos en masetero, superficiales en platisma → revisar a 2 semanas; hiperhidrosis: mapear con yodo-almidón y repartir puntos intradérmicos.',
      noErrar: 'Difusión al depresor del labio inferior o al orbicular (asimetría de sonrisa, babeo); platisma: disfagia/debilidad cervical por dosis alta o profunda; masetero: debilidad masticatoria excesiva o sonrisa asimétrica por risorio.',
      comunicacion: '"En la boca y el cuello uso dosis pequeñas: el objetivo es equilibrar fuerzas, y un exceso se nota al hablar o tragar. Se va solo, pero preferimos no llegar ahí."',
      habito: 'Test de Minor documentado en hiperhidrosis, foto en gesto (sonrisa, apretar dientes, tensar cuello), diario de bruxismo; retoque a 2 semanas y repetición según duración.',
    },
    catastrofe: 'Disfagia/debilidad cervical (platisma) o asimetría de sonrisa (masetero/DAO) → sin antídoto: dosis conservadora y anatomía; vigilar deglución.',
    guion: '"Dosis pequeñas para equilibrar fuerzas; un exceso se nota al hablar o tragar."',
    fuentes: [F.carruthers, F.ad(2953, 248412579, 'Cosmetic Procedures in Primary Care · Botulinum Toxin')],
    verificar: ['Dosis por músculo (masetero, platisma, DAO) y para hiperhidrosis axilar — A VERIFICAR (05-sep) en Carruthers 5e'] },

  { id: 'X-53-toxina-iv-complicaciones', d: 53, bKey: 'X', tier: 'CRIT', titulo: 'Toxina IV: complicaciones y manejo — ptosis, asimetrías, difusión', referente: 'Carruthers (Cureus 2026)',
    pasos: {
      causa: 'Casi todas las complicaciones de la toxina son la toxina haciendo su trabajo en el músculo equivocado o en exceso: difusión, dosis o mapa muscular incorrecto.',
      mecanismo: 'Difusión al elevador del párpado → ptosis palpebral (días 3-14, remite en semanas); frontal debilitado → ptosis de ceja; frontal lateral respetado → Spock; cigomático → sonrisa asimétrica; platisma → disfagia; dosis insuficiente o anticuerpos neutralizantes → fallo secundario; equimosis, cefalea, dolor local como efectos menores.',
      capa: 'Septo orbitario/elevador del párpado (ptosis), frontal inferior (ceja), cigomático mayor (sonrisa), platisma profundo (deglución). El vecino anatómico define la complicación.',
      decision: 'Ptosis palpebral: apraclonidina en colirio (agonista alfa: estimula el músculo de Müller) mientras remite (pauta A VERIFICAR); ptosis de ceja: esperar, no hay antídoto; asimetría: retoque contralateral a las 2 semanas; Spock: puntos en frontal lateral; fallo secundario: revisar dosis/técnica antes de pensar en anticuerpos.',
      noErrar: 'Prometer que "no pasa nada" (todo se resuelve solo, pero puede durar semanas-meses); tratar una ptosis de ceja con más toxina; no reconocer reacciones sistémicas raras (debilidad generalizada, disfagia) que requieren valoración médica.',
      comunicacion: 'Consentir de verdad: "Puede caer un párpado o una ceja unas semanas; es reversible y tengo un colirio para el párpado. Es raro y por eso empiezo con dosis prudente." Si ocurre: llamada el mismo día, explicar el tiempo y el plan.',
      habito: 'Registro por punto y foto en gesto para aprender de cada asimetría; retoque programado; el paciente evita frotar/masajear la zona tras la inyección y se mantiene erguido las primeras horas (A VERIFICAR evidencia de estas medidas).',
    },
    catastrofe: 'Ptosis palpebral / disfagia por difusión → apraclonidina (párpado), vigilancia y tiempo; prevención por dosis y anatomía.',
    guion: '"Puede caer un párpado unas semanas: es reversible y tengo colirio; por eso empiezo prudente."',
    fuentes: [F.cureus26, F.carruthers, F.ad(2811, 245227386, 'Dermatologic Surgery · Neuromodulators')],
    verificar: ['Concentración y pauta de apraclonidina y alternativas — A VERIFICAR (05-sep) en Cureus 2026 PMC12865869', 'Evidencia de las medidas post-inyección (no masajear, erguido) — A VERIFICAR (05-sep)'] },

  { id: 'X-54-rellenos-i-reologia', d: 54, bKey: 'X', tier: 'ALTA', titulo: 'Rellenos I: reología del HA (G′, cohesividad) + bioestimuladores (CaHA/PLLA)', referente: 'de Maio',
    pasos: {
      causa: 'El "relleno" no es un producto único: la reología decide si proyecta, se integra o migra, y la reversibilidad decide el margen de seguridad.',
      mecanismo: 'HA reticulado: G′ (elasticidad/firmeza) alto → soporte y proyección (mentón, mandíbula, pómulo profundo); G′ bajo → integración en tejidos finos (labio, surco lagrimal, líneas finas); cohesividad y tamaño de partícula → resistencia a la deformación y a la migración; HA es hidrolizable por hialuronidasa. CaHA/PLLA: bioestimulación de colágeno por respuesta a cuerpo extraño → NO reversibles.',
      capa: 'Producto por plano: alto G′ supraperióstico/profundo; bajo G′ subcutáneo superficial/submucoso; bioestimuladores en subcutáneo/supraperióstico de zonas de bajo riesgo vascular, nunca en labio ni periorbital.',
      decision: 'Objetivo (soporte vs contorno vs calidad de piel) → capa → reología → reversibilidad exigible en zonas de riesgo (HA) → volumen mínimo eficaz y revisión.',
      noErrar: 'Bioestimulador (no reversible) en zona de riesgo vascular alto o superficial (nódulos, oclusión sin antídoto); HA de alto G′ superficial (nódulos, Tyndall); volumen por sesión excesivo.',
      comunicacion: '"Uso productos distintos según si necesitas soporte o suavidad; en zonas delicadas uso los que puedo disolver si hiciera falta. Empezamos con menos y revisamos."',
      habito: 'Registro de producto/lote/volumen por punto y plano; revisión a 2-4 semanas con foto; intervalo de mantenimiento según producto y zona.',
    },
    catastrofe: 'Oclusión con producto no reversible (CaHA/PLLA) sin antídoto → solo HA en zonas de riesgo; HDPH si es HA.',
    guion: '"En zonas delicadas uso lo que puedo disolver; empezamos con menos y revisamos."',
    fuentes: [F.ad(2812, 244978644, 'Cosmeceuticals · Hyaluronic Acid'), F.mdcodes, F.delorenzi13],
    verificar: ['Valores de G′ por producto y volúmenes orientativos por región — A VERIFICAR (05-sep) en Soft Tissue Augmentation 5e (Carruthers, ISBN 9780323830751)'] },

  { id: 'X-55-rellenos-ii-planos', d: 55, bKey: 'X', tier: 'ALTA', titulo: 'Rellenos II: planos de inyección, aguja vs cánula, técnica por región', referente: 'de Maio / Goodman 2020',
    pasos: {
      causa: 'La seguridad y el resultado de un relleno dependen más del PLANO y la TÉCNICA que del producto: dónde deposito, con qué, cuánto y a qué velocidad.',
      mecanismo: 'Bolo supraperióstico con aguja → proyección puntual (pómulo, mentón); cánula en subcutáneo → distribución lineal con menos punciones y, en ciertas zonas, menos riesgo de entrar en un vaso (ceja, mejilla lateral/anterior); presión y volumen del bolo determinan si un émbolo viaja retrógrado; la aguja en movimiento evita depositar todo el bolo en una luz vascular.',
      capa: 'Pómulo: supraperióstico (bolo) · sien: interfascial/supraperióstico · surco lagrimal: profundo, bajo el orbicular · labio: submucoso/subcutáneo superficial en microbolos · mandíbula/mentón: supraperióstico · nariz: alto riesgo (cánula NO es más segura ahí).',
      decision: 'Región → plano → herramienta (aguja para bolos profundos precisos; cánula donde el consenso la considera más segura; calibre ≥25 G porque <25 G se comporta como aguja) → microbolos <0,1 mL, muy lento, baja presión, aguja/cánula en movimiento, dirección lejos del ojo en alto riesgo; anestésico con epinefrina en el punto de entrada; la aspiración NO es medida de seguridad (el consenso recomienda en contra).',
      noErrar: 'Confiar en aspiración negativa; bolo grande a presión; cánula fina creyendo que es "segura"; nariz/glabela sin formación específica y sin hialuronidasa.',
      comunicacion: '"Inyecto poco a poco, despacio y en el plano correcto; es lo que de verdad reduce el riesgo. Puede haber moratón o hinchazón unos días."',
      habito: 'Checklist de técnica antes de cada zona (plano, herramienta, calibre, microbolo, velocidad, movimiento); registro de técnica y volumen por punto = variables de la plantilla de extracción de SR-1 (R22).',
    },
    catastrofe: 'Émbolo por bolo a presión en plano vascular → HDPH / protocolo de ceguera; prevención = microbolos lentos, aguja en movimiento, sin aspiración como falsa seguridad.',
    guion: '"Poco a poco, despacio y en el plano correcto: eso es lo que reduce el riesgo."',
    fuentes: [F.goodman20, F.ad(2811, 245227491, 'Dermatologic Surgery · Fillers and Injectable Implants'), F.mdcodes] },

  { id: 'X-56-md-codes', d: 56, bKey: 'X', tier: 'ALTA', titulo: 'Rellenos III: MD Codes fundación (Ck, T, Tt) + myomodulation', referente: 'de Maio',
    pasos: {
      causa: 'Sin un lenguaje anatómico compartido cada inyector improvisa; MD Codes convierte la inyección en un checklist reproducible ligado al atributo emocional que quiero cambiar.',
      mecanismo: 'Cada código = subunidad + plano + herramienta + producto + volumen orientativo (Ck1-Ck5 mejilla, T1-T2 sien, Tt1-Tt3 surco lagrimal…); la fundación (mediofacial/soporte) precede al refinamiento (labio, surcos). Myomodulation: el relleno bajo o sobre un músculo cambia su palanca y modula su acción (p. ej., soporte del DAO o del elevador) — el relleno también trata la dinámica.',
      capa: 'Códigos de fundación en planos profundos (supraperióstico, grasa profunda); códigos de contorno en subcutáneo; myomodulation depende de la relación músculo-relleno en la capa correcta.',
      decision: 'MD ASA (3 atributos) → ecuación de códigos (checklist, no secuencia rígida) → fundación primero, revisar, refinamiento después → integrar toxina (vector) y relleno (soporte/myomodulation) como un solo plan.',
      noErrar: 'Refinar (labio, surco nasogeniano) antes de dar soporte (mediocara); usar los códigos como receta sin analizar al paciente; olvidar que los volúmenes de los códigos son orientativos.',
      comunicacion: '"Trabajo con un mapa: primero los puntos que sostienen, luego los que perfilan; por eso lo hacemos por etapas y la primera etapa ya cambia el mensaje de cansancio."',
      habito: 'Plan escrito por códigos y etapas, foto estandarizada por etapa, revisión a 2-4 semanas; formación continua (MD Codes Institute / AMI).',
    },
    catastrofe: 'Sobrecorrección o resultado desproporcionado por refinar sin fundación → plan por etapas; complicación vascular → HDPH.',
    guion: '"Primero lo que sostiene, luego lo que perfila: por etapas."',
    fuentes: [F.mdcodes, F.myomod, F.mdasa] },

  { id: 'X-59-etnia-genero-fat', d: 59, bKey: 'X', tier: 'ALTA', titulo: 'Rellenos IV: consideraciones étnicas y de género + fat transfer', referente: 'de Maio / Dermatologic Surgery',
    pasos: {
      causa: 'La belleza no es un canon único: proporciones étnicas y de género distintas exigen objetivos distintos; el error es "occidentalizar" o feminizar/masculinizar sin querer.',
      mecanismo: 'Diferencias de proyección malar, nasal y mentoniana, ángulo mandibular, forma de ceja y labio según etnia y género; en fototipos IV-VI cada punción es un riesgo de PIH y de queloide (puntos de entrada). Fat transfer: injerto autólogo con supervivencia variable, volumen grande, NO reversible y con riesgo embólico alto (partícula grande).',
      capa: 'Mismas capas, distintos vectores: mandíbula/mentón (masculino: ángulo y proyección), pómulo/labio (femenino: curvas); fat transfer en planos profundos con cánula roma.',
      decision: 'Análisis con el marco cultural y de género del paciente (no del inyector) → menos punciones y cánula en fototipos altos → fat transfer solo en manos con formación, en zonas de bajo riesgo, y nunca como sustituto de HA en zonas reversibles.',
      noErrar: 'Imponer proporciones ajenas; ignorar PIH/queloide en fototipos altos; fat transfer en zonas de alto riesgo vascular (no hay antídoto).',
      comunicacion: '"El objetivo es que sigas siendo tú, con tus rasgos y tu origen, más descansado; no hay un molde único de belleza."',
      habito: 'Fotos estandarizadas con tono de piel real (calibración), protocolo anti-PIH (fotoprotección, menos punciones), seguimiento de puntos de entrada en fototipos altos.',
    },
    catastrofe: 'Embolia grasa (fat transfer) sin antídoto / queloide en puntos de entrada en fototipo alto → selección estricta, cánula roma, planos profundos, advertir antes.',
    guion: '"Que sigas siendo tú, con tus rasgos, más descansado."',
    fuentes: [F.ad(2811, 245227608, 'Dermatologic Surgery · Ethnic & Gender Considerations (Fillers)'), F.mdasa] },

  { id: 'X-60-peelings-i', d: 60, bKey: 'X', tier: 'ALTA', titulo: 'Peelings I: profundidad, agentes (glicólico, salicílico, TCA, fenol), frosting', referente: 'Baumann',
    pasos: {
      causa: 'Un peeling es una herida química controlada: la profundidad de la lesión decide el resultado y el riesgo, no el "nombre" del ácido.',
      mecanismo: 'Superficial (alfa/beta-hidroxiácidos, Jessner, TCA bajo): destruye epidermis parcial → renovación, sin downtime. Medio (TCA a concentración media, combinaciones): alcanza dermis papilar → frosting nivel II-III, remodelación de colágeno. Profundo (fenol/Baker-Gordon): dermis reticular → máximo efecto, riesgo de cicatriz, hipopigmentación y cardiotoxicidad del fenol (arritmias) → monitorización.',
      capa: 'Epidermis (superficial) → dermis papilar (medio) → dermis reticular (profundo). El frosting (coagulación de proteínas) es el indicador visual de profundidad en TCA.',
      decision: 'Indicación (acné activo/PIH leve → superficial; fotoenvejecimiento/arrugas finas/QA → medio; arrugas profundas en fototipos bajos → profundo con monitorización) × fototipo × downtime aceptado → preparación (retinoide/despigmentante, profilaxis herpética) → aplicación uniforme, neutralización si procede, cuidado post.',
      noErrar: 'Peeling medio/profundo en fototipo IV-VI sin pretratamiento (PIH); fenol sin monitorización cardíaca; reactivación herpética sin profilaxis; combinar con isotretinoína reciente (cicatriz — A VERIFICAR intervalo).',
      comunicacion: '"Es una renovación controlada: la piel se pela unos días y luego se ve más uniforme; con tu tono de piel vamos a la profundidad que es segura y en varias sesiones."',
      habito: 'Fotoprotección estricta antes y después, retinoide de preparación y mantenimiento, no arrancar la piel, revisión a 1-2 semanas con foto.',
    },
    catastrofe: 'Cicatriz/hipopigmentación por profundidad excesiva o arritmia por fenol → profundidad por fototipo y monitorización en profundos.',
    guion: '"Renovación controlada, a la profundidad segura para tu piel, en varias sesiones."',
    fuentes: [F.ad(3200, 266616672, 'Baumann 3e · Chemical Peels'), F.dn('chemical-peels')],
    verificar: ['% de TCA para peeling medio y niveles de frosting — A VERIFICAR (05-sep) en Baumann 3e 266616672', 'Intervalo tras isotretinoína — A VERIFICAR (05-sep)'] },

  { id: 'X-61-peelings-ii-fototipo', d: 61, bKey: 'X', tier: 'ALTA', titulo: 'Peelings II: por fototipo (IV-VI), prevención de PIH, complicaciones', referente: 'Baumann / Cosmetic Derm for Skin of Color',
    pasos: {
      causa: 'En fototipos altos el melanocito responde a cualquier inflamación con más pigmento: la complicación más frecuente de un peeling no es la cicatriz sino la hiperpigmentación postinflamatoria.',
      mecanismo: 'Inflamación → activación melanocítica → PIH epidérmica (marrón, luz de Wood acentúa) o dérmica (gris-azulada, incontinencia de pigmento, no acentúa) → la dérmica dura meses-años; hipopigmentación por daño melanocítico en profundos; melasma se puede empeorar con calor/inflamación.',
      capa: 'Unión dermoepidérmica (transferencia de melanina) y dermis papilar (melanófagos en PIH dérmica). Cuanto más profundo el peeling, más riesgo en IV-VI.',
      decision: 'Fototipo IV-VI: solo superficiales/medios con pretratamiento (retinoide + despigmentante + fotoprotección estricta), test en zona pequeña, evitar profundos → PIH aparecida: fotoprotección con color, despigmentante tópico (A VERIFICAR pautas), paciencia; nunca "más peeling" en fase inflamatoria.',
      noErrar: 'Peeling medio sin preparar en piel de color; confundir PIH dérmica (no responde a despigmentantes) con epidérmica; fotoprotección insuficiente post; profilaxis herpética olvidada.',
      comunicacion: '"Tu piel se defiende de la inflamación fabricando pigmento: por eso preparamos antes, vamos superficial y protegemos con fotoprotector con color. Si aparece una mancha, se trata y se va, pero tarda."',
      habito: 'Preparación 2-4 semanas (A VERIFICAR), fotoprotector con óxido de hierro a diario, sombrero, sin sol directo; foto estandarizada basal y a 8-12 semanas.',
    },
    catastrofe: 'PIH dérmica prolongada / hipopigmentación permanente por peeling profundo en fototipo alto → profundidad conservadora + pretratamiento + fotoprotección estricta.',
    guion: '"Tu piel fabrica pigmento cuando se inflama: por eso preparamos, vamos superficial y protegemos."',
    fuentes: [F.ad(2956, 248485136, 'Cosmetic Derm for Skin of Color · Ablative/Deep Peels'), F.dn('postinflammatory-hyperpigmentation')],
    verificar: ['Protocolo de pretratamiento (retinoide/despigmentante, semanas) — A VERIFICAR (05-sep) en 2956/248485136'] },

  { id: 'X-62-laser-i-fototermolisis', d: 62, bKey: 'X', tier: 'CRIT', titulo: 'Láser I: fototermólisis selectiva — cromóforo → λ → pulso → enfriamiento', referente: 'Anderson & Parrish',
    pasos: {
      causa: 'Todo lo lumínico se reduce a una física: dañar un objetivo (cromóforo) sin cocer lo de alrededor.',
      mecanismo: 'Fototermólisis selectiva (Anderson-Parrish 1983): elegir la longitud de onda que el cromóforo absorbe más que el tejido vecino (melanina: absorción decrece con λ; hemoglobina: picos en visible; agua: infrarrojo medio; tinta: por color) y una duración de pulso menor que el tiempo de relajación térmica del objetivo → el calor se queda en el blanco. Fraccional (Manstein 2004): columnas microscópicas de daño con piel sana intercalada → curación rápida.',
      capa: 'Epidermis (melanina epidérmica = el competidor por el fotón en fototipos altos → enfriamiento de contacto/criógeno/aire) · dermis papilar (vasos, pigmento dérmico) · dermis reticular (agua → ablativos).',
      decision: 'Objetivo → cromóforo → λ → duración de pulso (≈ tamaño del blanco) → fluencia → enfriamiento epidérmico → fototipo (Fitzpatrick) → test spot → parámetros conservadores y esperar respuesta.',
      noErrar: 'λ corta con alta absorción melánica en fototipo alto (quemadura, hipo/hiperpigmentación); sin enfriamiento; sin protección ocular (láser en párpado/ojo); ignorar bronceado reciente.',
      comunicacion: '"El láser es luz que busca un objetivo concreto (pigmento, vaso, agua) y lo calienta sin dañar lo demás; por eso elegimos la máquina por tu problema y tu tono de piel, y hacemos una prueba primero."',
      habito: 'Fotoprotección estricta pre/post, sin bronceado 4 semanas (A VERIFICAR), gafas de protección, registro de parámetros por sesión, foto estandarizada.',
    },
    catastrofe: 'Quemadura/hipopigmentación permanente por λ o fluencia inadecuadas al fototipo, o lesión ocular sin gafas → física antes que máquina; test spot; protección ocular siempre.',
    guion: '"Luz que busca un objetivo y respeta lo demás; elegimos por tu problema y tu tono, y probamos primero."',
    fuentes: [F.anderson83, F.manstein04, F.ad(2818, 240357100, 'Lasers in Dermatology · Fundamentals')] },

  { id: 'X-63-laser-ii-vascular-pigmento', d: 63, bKey: 'X', tier: 'ALTA', titulo: 'Láser II: lesiones vasculares (PDL) + pigmento y tatuajes (Q-switched/pico)', referente: 'Anderson',
    pasos: {
      causa: 'Vasos y pigmento son cromóforos con física distinta: la hemoglobina pide luz amarilla-verde con pulsos de ms; el pigmento (melanosoma, partícula de tinta) pide pulsos de ns-ps (fotoacústico).',
      mecanismo: 'PDL: absorción por oxihemoglobina → coagulación del vaso → púrpura esperable días (malformación capilar, telangiectasias, hemangioma, rosácea eritematosa). Q-switched/picosegundo: pulso ultracorto → fragmentación fotoacústica de melanosomas/tinta → eliminación por macrófagos; λ según color de tinta (negro/azul con 1064, rojo con 532, verde con 755 — A VERIFICAR); nevus de Ota/lentigos.',
      capa: 'Vasos dérmicos superficiales (PDL) · melanina epidérmica (lentigos) · dermis (Ota, tatuaje). En fototipos altos la melanina epidérmica compite y obliga a λ larga (1064) y menor fluencia.',
      decision: 'Lesión → cromóforo → dispositivo (PDL vs Q-switched/pico) → λ por color/profundidad → test spot → sesiones espaciadas; púrpura post-PDL es esperada, ampolla o blanqueo no.',
      noErrar: 'Tatuaje cosmético (piel/rojo con óxido de hierro) que se oscurece paradójicamente con Q-switched; alexandrita/532 en fototipo alto (hipopigmentación, quemadura); tratar una lesión pigmentada sin descartar melanoma.',
      comunicacion: '"Con el vascular saldrá un moratón unos días: es que ha funcionado. Con el pigmento son varias sesiones y algunas tintas responden peor; probamos una zona primero."',
      habito: 'Fotoprotección estricta, no bronceado, gafas; registro de parámetros y foto por sesión; intervalo entre sesiones según cromóforo.',
    },
    catastrofe: 'Melanoma tratado con láser "como lentigo" / oscurecimiento paradójico de tatuaje cosmético / hipopigmentación en fototipo alto → dermatoscopia antes, test spot, λ por fototipo.',
    guion: '"El moratón del vascular significa que funcionó; el pigmento va en varias sesiones y probamos primero."',
    fuentes: [F.ad(2818, 240357136, 'Lasers in Dermatology · Cutaneous Vascular Lesions'), F.anderson83],
    verificar: ['λ exactas por color de tinta y parámetros de PDL — A VERIFICAR (05-sep) en 2818/240357136'] },

  { id: 'X-64-laser-iii-fraccional-rf', d: 64, bKey: 'X', tier: 'ALTA', titulo: 'Láser III: resurfacing fraccional (ablativo/no ablativo) + radiofrecuencia + tightening', referente: 'Manstein / Anderson',
    pasos: {
      causa: 'Textura, cicatriz y laxitud son problemas de colágeno dérmico: hay que provocar una lesión térmica controlada que dispare remodelación sin destruir la epidermis completa.',
      mecanismo: 'Ablativo fraccional (CO2 10 600 nm, Er:YAG 2940 nm; agua como cromóforo): columnas de vaporización + coagulación → máxima remodelación, más downtime y riesgo de PIH. No ablativo fraccional: columnas de daño térmico con epidermis intacta → menos efecto por sesión, más sesiones, más seguro en fototipos altos. RF (mono/bipolar, microagujas) y HIFU: calor dérmico sin cromóforo → contracción y neocolagénesis independientes del fototipo.',
      capa: 'Epidermis (intacta o vaporizada), dermis papilar/reticular (columnas), SMAS (HIFU). La profundidad y densidad de las columnas dictan resultado y riesgo.',
      decision: 'Indicación (cicatriz de acné/fotoenvejecimiento severo → ablativo fraccional en fototipos bajos; fototipos altos → no ablativo o RF microagujas; laxitud leve → RF/HIFU) → densidad y energía conservadoras en piel de color → profilaxis herpética en peribucal → cuidado post estricto.',
      noErrar: 'Ablativo fraccional agresivo en fototipo IV-VI (PIH prolongada); densidad/energía excesivas (cicatriz); infección post-ablativo; expectativas de "lifting" con RF.',
      comunicacion: '"Creamos miles de microcolumnas que la piel repara fabricando colágeno nuevo; con tu tono vamos con la versión que no quita la superficie y en varias sesiones. La mejoría se ve en meses, no en días."',
      habito: 'Cuidado post (limpieza, emoliente, fotoprotección estricta), evitar sol semanas, retinoide de mantenimiento; foto basal y a 3-6 meses.',
    },
    catastrofe: 'Cicatriz o PIH prolongada por densidad/energía excesivas en fototipo alto o infección post-ablativo → parámetros conservadores, profilaxis, seguimiento estrecho.',
    guion: '"Microcolumnas que la piel repara con colágeno nuevo: la mejora se ve en meses."',
    fuentes: [F.manstein04, F.ad(2818, 240357478, 'Lasers in Dermatology · Laser & RF Resurfacing')],
    verificar: ['Parámetros de densidad/energía por fototipo — A VERIFICAR (05-sep) en 2818/240357478'] },

  { id: 'X-65-laser-iv-fototipos-altos', d: 65, bKey: 'X', tier: 'CRIT', titulo: 'Láser IV: seguridad en fototipos IV-VI — parámetros, PIH, depilación en piel étnica', referente: 'Anderson / Dermatologic Surgery',
    pasos: {
      causa: 'En piel de color el cromóforo que quiero (folículo, vaso) compite con el que no quiero (melanina epidérmica): el riesgo es tratar la epidermis del paciente en vez de su problema.',
      mecanismo: 'Absorción de melanina decrece con λ → λ larga (Nd:YAG 1064) deposita menos energía en la epidermis; pulso largo (ms) permite disipar calor epidérmico mientras el folículo, más grande, retiene; enfriamiento protege la epidermis; fluencia conservadora. Complicaciones: PIH (inflamación) vs hipopigmentación (daño melanocítico) vs quemadura (ampolla, costra).',
      capa: 'Epidermis (melanina competidora) → folículo en dermis profunda (depilación) → vaso dérmico. El grosor y color del pelo también cuentan (pelo fino/claro responde mal).',
      decision: 'Fototipo V-VI: Nd:YAG de pulso largo como primera opción (diodo con precaución; alexandrita/IPL no) → test spot y esperar respuesta (días) → fluencia conservadora, pulso largo, enfriamiento → PIH: fotoprotección con color + despigmentante (A VERIFICAR); quemadura: cuidado de herida, no retratar hasta resolución.',
      noErrar: 'Alexandrita/IPL en fototipo VI; sin test spot; tratar piel bronceada; confundir quemadura con "reacción normal".',
      comunicacion: '"Tu piel tiene más pigmento y el láser lo ve: por eso uso una longitud de onda que lo respeta, pruebo una zona y voy con energía prudente. Si aparece una mancha, se trata y se va."',
      habito: 'No sol ni bronceado 4-6 semanas (A VERIFICAR), fotoprotección con óxido de hierro, rasurar (no depilar con cera) antes de la sesión, foto y registro de parámetros por sesión.',
    },
    catastrofe: 'Quemadura/hipopigmentación permanente en fototipo VI por λ corta o fluencia alta → Nd:YAG pulso largo, test spot, enfriamiento.',
    guion: '"Tu piel tiene más pigmento y el láser lo ve: elijo la luz que lo respeta y pruebo primero."',
    fuentes: [F.ad(2811, 245228834, 'Dermatologic Surgery · Laser/Light en piel de color'), F.anderson83],
    verificar: ['Fluencias y duraciones de pulso conservadoras por fototipo — A VERIFICAR (05-sep) en 2811/245228834'] },

  { id: 'X-66-contorno-escleroterapia', d: 66, bKey: 'X', tier: 'MED', titulo: 'Contorno corporal (criolipólisis, HIFU) + escleroterapia básica', referente: 'Lasers in Dermatology / Sclerotherapy',
    pasos: {
      causa: 'Grasa localizada y venas superficiales son problemas de tejido diana (adipocito, endotelio): se destruyen selectivamente y el cuerpo los reabsorbe.',
      mecanismo: 'Criolipólisis: frío controlado → apoptosis del adipocito (más sensible al frío que la piel) → reabsorción en semanas; complicación paradójica: hiperplasia adiposa (crecimiento en la zona tratada, meses). HIFU/RF corporal: calor focal → daño térmico del adipocito/contracción. Escleroterapia: esclerosante (polidocanol, STS) daña el endotelio → fibrosis y oclusión de la vena; complicaciones: matting telangiectásico, pigmentación (hemosiderina), úlcera por extravasación/inyección arterial.',
      capa: 'Grasa subcutánea (criolipólisis/HIFU) · venas reticulares/telangiectasias (escleroterapia); varices tronculares con reflujo → dúplex y tratamiento del eje primero.',
      decision: 'Contorno: paciente cerca de su peso, grasa pellizcable localizada, expectativas realistas → sesiones y meses; escleroterapia: dúplex si hay varices/reflujo, concentración por calibre (A VERIFICAR), compresión post, evitar sol.',
      noErrar: 'Prometer pérdida de peso con contorno; no advertir de la hiperplasia paradójica; esclerosar telangiectasias con reflujo troncular no tratado (recurrencia); inyección intraarterial (dolor intenso/blanqueo inmediato → parar).',
      comunicacion: '"No es para adelgazar: es para una zona concreta y se ve en 2-3 meses. En venas, se cierran las tratadas pero pueden salir otras; la compresión después es parte del tratamiento."',
      habito: 'Peso estable, actividad física, compresión post-escleroterapia y fotoprotección de la zona; foto estandarizada basal y a 3 meses.',
    },
    catastrofe: 'Úlcera por extravasación/inyección arterial de esclerosante o hiperplasia adiposa paradójica → técnica, concentración adecuada, parar ante dolor/blanqueo; advertir antes.',
    guion: '"No es para adelgazar: una zona concreta, en 2-3 meses."',
    fuentes: [F.ad(2818, 240357542, 'Lasers in Dermatology · Devices for Body Contour'), F.dn('sclerotherapy'), 'AccessDerma Sclerotherapy 2e (TOC extraído, ver DERMA_MASTER_SPEC B.5)'],
    verificar: ['Concentraciones de polidocanol/STS por calibre y tiempo de compresión — A VERIFICAR (05-sep) en Sclerotherapy 2e (AccessDerma)'] },

  { id: 'X-67-microneedling-prp', d: 67, bKey: 'X', tier: 'ALTA', titulo: 'Microneedling + PRP + skinboosters: evidencia y técnica', referente: 'Baumann',
    pasos: {
      causa: 'Cicatriz de acné, poros y calidad de piel son déficit de colágeno y de matriz: un microtrauma mecánico controlado dispara la reparación sin dañar la epidermis por completo.',
      mecanismo: 'Microagujas → microcanales dérmicos → cascada de cicatrización (factores de crecimiento, neocolagénesis, elastogénesis) con epidermis casi intacta → seguro en fototipos altos. PRP: concentrado de plaquetas con factores de crecimiento (evidencia moderada en alopecia androgénica y cicatrices, mejor combinado con microneedling). Skinboosters: HA poco reticulado en microdepósitos → hidratación y calidad, no volumen.',
      capa: 'Dermis papilar/reticular superficial según profundidad de aguja (indicación: A VERIFICAR mm por zona); PRP intradérmico o en cuero cabelludo; skinboosters en dermis media.',
      decision: 'Cicatriz de acné/estrías/poros → microneedling seriado (± PRP); alopecia androgénica → PRP como coadyuvante; piel deshidratada/fina → skinboosters; siempre con acné activo controlado y sin isotretinoína reciente (A VERIFICAR intervalo).',
      noErrar: 'Rodillo/pen no estéril o reutilizado (infección, granulomas por productos no aptos para vía intradérmica); tratar sobre acné activo o herpes; prometer resultados de relleno con skinboosters.',
      comunicacion: '"Hacemos microcanales que la piel repara fabricando colágeno: enrojece 1-2 días y la mejora se acumula sesión a sesión. Es seguro para tu tono de piel."',
      habito: 'Fotoprotección, sin maquillaje 24 h (A VERIFICAR), sin retinoide días antes/después, sesiones espaciadas; foto estandarizada basal y tras la serie.',
    },
    catastrofe: 'Infección/granuloma por técnica no estéril o producto no intradérmico → material estéril de un solo uso y productos aprobados por vía; suspender ante acné/herpes activo.',
    guion: '"Microcanales que la piel repara con colágeno; enrojece 1-2 días y mejora sesión a sesión."',
    fuentes: [F.ad(3200, 266617053, 'Baumann 3e · Microneedling and PRP'), F.dn('skin-needling')],
    verificar: ['Profundidad de aguja por indicación (mm) y protocolo de PRP — A VERIFICAR (05-sep) en Baumann 3e 266617053'] },

  { id: 'X-68-cosmeceutica', d: 68, bKey: 'X', tier: 'ALTA', titulo: 'Ciencia cosmecéutica: Baumann Skin Typing, retinoides, antioxidantes, fotoprotección (protocolo Nítida)', referente: 'Baumann',
    pasos: {
      causa: 'La rutina diaria del paciente es el tratamiento de fondo de toda la estética: sin barrera, fotoprotección y retinoide, cualquier procedimiento rinde menos y se complica más.',
      mecanismo: 'Retinoides tópicos (retinol → retinaldehído → tretinoína/adapaleno): normalizan la queratinización, estimulan colágeno y reducen pigmento; vitamina C (L-ascórbico): antioxidante y cofactor de colágeno; niacinamida: barrera y transferencia de melanosomas; fotoprotección de amplio espectro (+ color/óxido de hierro para luz visible en melasma/PIH); despigmentantes (hidroquinona en ciclos, azelaico, etc.).',
      capa: 'Estrato córneo (barrera, hidratación), epidermis (recambio, melanocito), dermis papilar (colágeno). El Baumann Skin Type (seco/graso · sensible/resistente · pigmentado/no · arrugado/tenso) elige la rutina por capa.',
      decision: 'Clasificar el tipo de piel Baumann → rutina ≤3 pasos AM (limpiador + antioxidante + fotoprotector) / PM (limpiador + retinoide escalonado; despigmentante si melasma/PIH) → escalar concentración/frecuencia según tolerancia → integrar con procedimientos (pre y post).',
      noErrar: 'Retinoide + isotretinoína o peeling/láser sin pausa (irritación/cicatriz); hidroquinona continua sin ciclos (ocronosis); sin fotoprotector con color en melasma; rutinas de 7 pasos que se abandonan.',
      comunicacion: '"No vamos a cambiarte la cara; vamos a devolverle lo que el tiempo movió — y eso empieza por proteger. Menos productos, mejor elegidos: una rutina de 3 pasos que se hace gana a una de 7 que se abandona. El retinoide irrita las primeras semanas: es normal."',
      habito: 'Foto estandarizada basal y a 12 semanas, tolerancia al retinoide (subir despacio), MASI si melasma, revisión de fotoprotección en cada visita (Nítida: consulta cosmecéutica por suscripción).',
    },
    catastrofe: 'Ocronosis por hidroquinona continua / dermatitis irritativa severa por escalado brusco → ciclos y escalado lento; fotoprotección como base.',
    guion: '"Menos productos, mejor elegidos: 3 pasos que se hacen ganan a 7 que se abandonan."',
    fuentes: ['AccessDerma Cosmeceuticals and Cosmetic Ingredients · bookid 2812', F.ad(3200, 266614593, 'Baumann 3e · Intrinsic Aging'), F.dn('topical-retinoids')],
    verificar: ['Concentración y duración de ciclos de hidroquinona y SPF mínimo recomendado — A VERIFICAR (05-sep) en Cosmeceuticals (2812) / guía AAD'] },
];

/** Ficha del cerebro clínico de un átomo (si existe: 22 X + 13 CRIT). */
export function dermaCerebroDe(d: number): DermaCerebroFicha | undefined { return DERMA_CEREBRO.find((f) => f.d === d); }
export function dermaCerebroPorBloque(bKey: DermaBloqueKey): DermaCerebroFicha[] { return DERMA_CEREBRO.filter((f) => f.bKey === bKey); }
/** Días del plan que tienen ficha (para el chip "Cerebro" en HOY y la pestaña del Hub). */
export const DERMA_CEREBRO_DIAS: number[] = DERMA_CEREBRO.map((f) => f.d);

/* ────────────────────────────────────────────────────────────────────────────
 * SIMULADOR "OCLUSIÓN VASCULAR · 90 s" (SPEC §9.5) — checklist HDPH + ceguera que se recita de memoria.
 * verificado=true solo si la afirmación está en el abstract de DeLorenzi 2017 o en el texto de Goodman 2020
 * (ambos cotejados 05-sep-2026); el resto es paráfrasis del SPEC §2.4 o parámetro pendiente.
 * ────────────────────────────────────────────────────────────────────────── */
export type DermaDrillFuente = 'DeLorenzi 2017' | 'Goodman 2020' | 'SPEC §2.4 (DeLorenzi 2014)' | 'A VERIFICAR';
export interface DermaDrillItem { k: string; fase: 'reconocer' | 'hialuronidasa' | 'endpoints' | 'ceguera' | 'kit' | 'prevencion'; t: string; detalle: string; fuente: DermaDrillFuente; verificado: boolean }
export const DERMA_DRILL_HDPH: { titulo: string; segundos: number; pasos: DermaDrillItem[]; minimoAcierto: number } = {
  titulo: 'Oclusión vascular por relleno · recita el protocolo en 90 s',
  segundos: 90,
  minimoAcierto: 0.8, // ≥80 % de los ítems (todos los VERIFICADOS obligatorios) en ≤90 s = acierto en el ledger
  pasos: [
    { k: 'signos', fase: 'reconocer', t: 'Signos: blanqueo inmediato → livedo reticular → cianosis → necrosis; el dolor PUEDE faltar (anestésico)', detalle: 'Diferenciar de congestión venosa (edema violáceo tardío) y Tyndall. Relleno capilar lento en el territorio.', fuente: 'SPEC §2.4 (DeLorenzi 2014)', verificado: false },
    { k: 'parar', fase: 'reconocer', t: 'PARAR la inyección y documentar la HORA de inicio del evento', detalle: 'Goodman 2020: "Document the time of the beginning of the vascular event". Evaluar visión, pupilas, movimientos oculares y neuro básico.', fuente: 'Goodman 2020', verificado: true },
    { k: 'hdph', fase: 'hialuronidasa', t: 'Hialuronidasa en DOSIS ALTA inundando TODO el tejido isquémico (solo hialuronidasa: es el motor del rescate)', detalle: 'DeLorenzi 2017: "solely the use of hyaluronidase in repeated high doses"; la dosis escala con la cantidad de tejido isquémico ("flood the occluded vessels").', fuente: 'DeLorenzi 2017', verificado: true },
    { k: 'pulsos', fase: 'hialuronidasa', t: 'REPETIR CADA HORA hasta resolución clínica', detalle: 'DeLorenzi 2017: "repeated hourly until resolution".', fuente: 'DeLorenzi 2017', verificado: true },
    { k: 'ui', fase: 'hialuronidasa', t: 'Dosis orientativa por "área" (SPEC: ~450 UI por área de bajo volumen; ~900 UI si afecta una segunda zona, p. ej. nariz)', detalle: 'NO está en el abstract: A VERIFICAR (05-sep) en el texto completo de DeLorenzi 2017 antes de fijar la cifra en Anki.', fuente: 'A VERIFICAR', verificado: false },
    { k: 'endpoints', fase: 'endpoints', t: 'Endpoints de resolución: relleno capilar normal + color de la piel normal + ausencia de dolor', detalle: 'DeLorenzi 2017: "capillary refill, skin color, and absence of pain".', fuente: 'DeLorenzi 2017', verificado: true },
    { k: 'ventana', fase: 'endpoints', t: 'Ventana: implementado en <2 días del inicio, sin pérdida parcial ni total de piel en su serie', detalle: 'DeLorenzi 2017: "if the protocol was implemented within 2 days of the ischemic event onset".', fuente: 'DeLorenzi 2017', verificado: true },
    { k: 'ojo', fase: 'ceguera', t: 'CEGUERA (pérdida visual ± dolor ocular, ptosis, oftalmoplejía): emergencia vascular verdadera → pedir ayuda y TRASLADO URGENTE a oftalmología/emergencias', detalle: 'Goodman 2020: "true vascular emergency"; "transfer the patient at the earliest opportunity… emergency physician from a specialist eye hospital".', fuente: 'Goodman 2020', verificado: true },
    { k: 'hial-ojo', fase: 'ceguera', t: 'Si era HA: hialuronidasa 1500 UI en 2 mL de lidocaína 1 % donde se puso el relleno + en el reborde supraorbitario, en la a. supratroclear (14 mm de la línea media)', detalle: 'Goodman 2020, texto verificado. Retrobulbar/peribulbar SOLO con experiencia y diagnóstico seguro.', fuente: 'Goodman 2020', verificado: true },
    { k: 'pio', fase: 'ceguera', t: 'Bajar la PIO (masaje ocular, rebreathing, timolol) = baja evidencia, no se desaconseja; NO anticoagular en consulta', detalle: 'Goodman 2020: "anticoagulation should not be performed at the bedside".', fuente: 'Goodman 2020', verificado: true },
    { k: 'kit', fase: 'kit', t: 'KIT: hialuronidasa disponible SIEMPRE en la clínica (fecha vigente) + lidocaína 1 %, jeringas/agujas, colirio, teléfono del oftalmólogo de referencia', detalle: 'Goodman 2020: "Every clinic must have hyaluronidase available for immediate utilization". Composición completa del kit: A VERIFICAR (05-sep).', fuente: 'Goodman 2020', verificado: true },
    { k: 'zonas', fase: 'prevencion', t: 'Zonas grado 4 (glabela, nariz, frente); casos reportados: nariz 56,3 % · glabela 27,1 % · frente 18,8 %', detalle: 'Goodman 2020. Grado 3: sien, surco nasogeniano, surco lagrimal, periorbital, mejilla medial. No hay riesgo cero (DeLorenzi 2017).', fuente: 'Goodman 2020', verificado: true },
    { k: 'tecnica', fase: 'prevencion', t: 'Prevención: microbolos <0,1 mL, muy lento, baja presión, aguja/cánula en movimiento; NO aspirar (sin evidencia; el consenso recomienda en contra); cánula NO más segura en nariz; <25 G se comporta como aguja', detalle: 'Goodman 2020, texto verificado.', fuente: 'Goodman 2020', verificado: true },
  ],
};
/** Evalúa el drill: ítems marcados como recitados + segundos empleados → acierto para el ledger (fuente 'drill'). */
export function dermaDrillEvaluar(recitados: string[], segundos: number): { acierto: boolean; aTiempo: boolean; pct: number; faltan: DermaDrillItem[]; faltanVerificados: DermaDrillItem[] } {
  const set = new Set(recitados);
  const faltan = DERMA_DRILL_HDPH.pasos.filter((p) => !set.has(p.k));
  const faltanVerificados = faltan.filter((p) => p.verificado);
  const pct = Math.round(((DERMA_DRILL_HDPH.pasos.length - faltan.length) / DERMA_DRILL_HDPH.pasos.length) * 100);
  const aTiempo = segundos <= DERMA_DRILL_HDPH.segundos;
  return { acierto: aTiempo && faltanVerificados.length === 0 && pct >= DERMA_DRILL_HDPH.minimoAcierto * 100, aTiempo, pct, faltan, faltanVerificados };
}
/** Sesiones en las que se ejecuta el drill (d19/d20 · checkpoint H d46 · cierre Z d70). */
export const DERMA_DRILL_DIAS: number[] = [19, 20, 46, 70];
