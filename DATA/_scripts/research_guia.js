/**
 * research_guia.js — construye la GUÍA «qué · cuánto · cómo» de cada átomo de Research (formato común GuiaBloque de src/lib/guia.ts).
 * Lo llama gen_research_plan.js (fuente única del plan) y el resultado se escribe en src/lib/researchGuia.ts (GENERADO).
 *   · 45′ en la franja 13:30–14:15 (bloque R↔D interdiario) · Σ pasos = 45 (aborta si no).
 *   · Átomos con guía PASO A PASO (semanas 1-2 del régimen; v6.03: jue 22-oct → mar 3-nov · v6.02: R0 · R1 · M1 · C-1 · M2): qué cuentas/qué abstract/qué plantilla, cuántos
 *     minutos, cómo y con el enlace exacto (URLs ya verificadas en REC / MENTORES.md / candidatos.md; el abstract de R1 = PMID 19807760,
 *     verificado en PubMed E-utilities el 18-oct-2026).
 *   · El resto: guía estructurada desde las 5 franjas del bloque (eval anclada 5 · pre-test 5 · deep work 25 con el recurso 1 del átomo ·
 *     free recall 5 · APEX 5) con el objetivo, el entregable (= «terminado cuando»), el artefacto y los chips del propio átomo.
 *   · F4 (desde el SERUMS, fecha ≥ serums.inicio): 30′ en tiempo muerto de la posta, sin hora fija → franja NOMINAL 13:30–14:00 con aviso.
 *   · Pausa de átomos (intensiva ENCAPS): GUIA_RESEARCH_MINIMO 30′ (DJ-4).
 * Regla anti-alucinación: nada de páginas ni URLs nuevas sin verificar; lo «A VERIFICAR» se dice.
 * v6.02c (18-oct-2026, E4): nuevo.
 * v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; Research d1 jue 22-oct): la ventana de la consulta Crossref de C-1 deja de estar cableada
 *   (29-ago → 28-oct = los 60 días previos a C-1 en v6.02) y se deriva de la fecha REAL de C-1 (60 días hacia atrás → C-1); los mensajes a
 *   mentores (M1/M2) dicen «con las fechas del plan vigente» en vez de «v6.02». Las fechas de cada paso ya salían de fechaDe() (sin cambio).
 */
'use strict';

const GH = 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/';
const OBS_VAULT = 'Vault_Medicina MIR_Joseph';
const obsUrl = (file) => 'obsidian://open?vault=' + encodeURIComponent(OBS_VAULT) + '&file=' + encodeURIComponent(file);
/** v6.03: ventana [desde, hasta] = los 60 días previos a C-1 (antes cableada a 2026-08-29 → 2026-10-28, la de v6.02). */
const CROSSREF = (q, desde, hasta) => 'https://api.crossref.org/works?filter=issn:0190-9622,issn:2666-3287,issn:0011-9059,issn:1473-2130,issn:1076-0512,from-pub-date:' + desde + ',until-pub-date:' + hasta + '&query.bibliographic=' + encodeURIComponent(q) + '&rows=30&select=DOI,title,container-title,issued,published-online,type';
const MES_LARGO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtDM = (iso) => `${Number(iso.slice(8, 10))}-${MES_LARGO[Number(iso.slice(5, 7)) - 1]}`;

/**
 * Código TS que se emite en src/lib/researchGuia.ts: guía GENÉRICA (5 franjas del bloque) y F4 (30′, franja nominal), construida en tiempo de
 * ejecución desde DIAS + REC (todo el texto ya está en el bundle: no se duplica). Σ pasos = 45 / 30 (fijo).
 */
const TS_BUILDER = `
const corto = (s: string, n: number): string => (s.length > n ? s.slice(0, Math.max(s.lastIndexOf(' ', n - 3), 20)) + '…' : s);
function generica(x: DiaResearch, prev: DiaResearch | null): GuiaBloque {
  const recs = x.recs.map((k) => ({ k, ...(REC[k] || { label: k, url: 'https://pubmed.ncbi.nlm.nih.gov/' }) }));
  const obs = researchObsUrlDay(x.d);
  const chips = [...(x.chips || []), ...(x.horas ? [\`carga real ≈ \${x.horas} h por revisor FUERA del bloque (el átomo coordina y cierra)\`] : [])];
  const r0 = recs[0];
  if (x.fecha >= FECHAS_V6.serums.inicio) {
    return {
      franja: '13:30–14:00', plan: 'research-derma', titulo: \`\${x.code} · núcleo del átomo (F4 · 30′)\`, totalMin: 30,
      pasos: [
        { min: 2, que: 'Pre-test 60 s: el objetivo de hoy en 1 frase', como: 'A papel o en el móvil.' },
        { min: 23, que: \`NÚCLEO: \${x.entregable}\`, como: \`Recurso: «\${r0.label}». Produce solo el entregable atómico; lo demás del átomo queda opcional (DJ-4).\`, enlace: { t: \`\${r0.k}\`, url: r0.url } },
        { min: 3, que: 'Free recall + log del gap', como: 'Una línea.' },
        { min: 2, que: 'Guardar el artefacto (≤1 APEX)', como: \`Dónde: \${corto(x.artefacto, 140)}\`, ...(obs ? { enlace: { t: '◆ Obsidian', url: obs } } : {}) },
      ],
      recursos: [...recs.map((r) => ({ t: r.label, url: r.url })), ...(obs ? [{ t: '◆ Obsidian · carpeta del entregable', url: obs }] : [])],
      hecho: x.entregable,
      aviso: ['F4 (SERUMS): 30′ en tiempo muerto de la posta, SIN hora fija — la franja 13:30–14:00 es nominal', ...chips].join(' · '),
    };
  }
  return {
    franja: '13:30–14:15', plan: 'research-derma', titulo: \`\${x.code} · \${corto(x.objetivo, 110)}\`, totalMin: 45,
    pasos: [
      { min: 5, que: prev ? \`Eval anclada de \${prev.code}: 2Q de auto-test del método + ¿existe el artefacto «\${corto(prev.artefacto, 120)}»?\` : 'Arranque: abre la carpeta del entregable y el recurso 1', como: prev ? 'De memoria; si el artefacto de la sesión anterior no existe, apúntalo como deuda en la Mesa editorial (no se rehace hoy).' : 'Sin átomo previo.' },
      { min: 5, que: 'Pre-test / free recall 60 s: ¿qué sé ya de este paso? + el objetivo de hoy en 1 frase', como: 'A papel, sin mirar; lo contrastas al final.' },
      { min: 25, que: \`DEEP WORK: \${x.objetivo}\`, como: \`Trabaja con «\${r0.label}» MIENTRAS produces el artefacto: \${x.artefacto}\${recs.length > 1 ? \` (apoyo: \${recs.slice(1).map((r) => r.label).join(' · ')})\` : ''}.\${x.tool && x.tool !== '—' ? \` Herramienta: \${x.tool}.\` : ''}\`, enlace: { t: \`\${r0.k}\`, url: r0.url } },
      { min: 5, que: 'Free recall a papel + log del gap (método / razonamiento / herramienta)', como: 'Compara con el pre-test del inicio.' },
      { min: 5, que: '≤3 APEX-método (Palmerton) + guardar el artefacto', como: \`Dónde queda: \${corto(x.artefacto, 160)}\`, ...(obs ? { enlace: { t: '◆ Obsidian', url: obs } } : {}) },
    ],
    recursos: [...recs.map((r) => ({ t: r.label, url: r.url })), ...(obs ? [{ t: '◆ Obsidian · carpeta del entregable', url: obs }] : [])],
    hecho: x.entregable,
    ...(recs.length > 1 ? { planB: \`Si «\${r0.label}» no abre o no basta: «\${recs[1].label}».\` } : {}),
    ...(chips.length ? { aviso: chips.join(' · ') } : {}),
  };
}
`;

function construirGuiasResearch({ TODOS, rec, fechaDe, fmt, addDays, obsDe, SERUMS_INICIO }) {
  const R = (k) => { const r = rec(k); if (!r) throw new Error('research_guia: REC ' + k + ' no existe'); return { t: r.label, url: r.url }; };
  const f = (code) => fmt(fechaDe(code));
  const porCode = Object.fromEntries(TODOS.map((x) => [x.code, x]));
  const M2 = porCode.M2;
  const C1H = fechaDe('C-1'); const C1D = addDays(C1H, -60); // v6.03: ventana Crossref de C-1 = 60 días previos (v6.02: 2026-08-29 → 2026-10-28)

  /** Guías paso a paso (45′). `prev` = átomo anterior (eval anclada). */
  const DET = {
    R0: (x) => ({
      titulo: 'R0 · Infra académica: 7 cuentas hoy (ORCID · Scholar · CTI Vitae · PROSPERO · Rayyan · Zotero · keys NCBI + OpenAlex)',
      pasos: [
        { min: 2, que: 'Arranque: abre Estudio → Research → Desk → «Infra académica» (checklist 0/10) y tu gestor de contraseñas', como: 'Cada cuenta la creas TÚ (Claude no crea cuentas ni escribe contraseñas). Una contraseña distinta por cuenta, guardada en el gestor.' },
        { min: 8, que: '1 · ORCID iD (identidad de autor: la exige Editorial Manager al autor de correspondencia y PROSPERO a todo el equipo)', como: 'orcid.org → Register: el nombre tal como firmarás los artículos, correo personal + institucional, visibilidad pública; verifica el correo y copia el iD (0000-…).', enlace: R('ORCID') },
        { min: 5, que: '2 · Google Scholar · perfil público', como: 'Crea el perfil con el correo institucional y márcalo PÚBLICO; si aún no aparece ningún artículo tuyo, déjalo vacío (la tesis se añade cuando esté en el repositorio UNCP).', enlace: R('SCHOLAR') },
        { min: 8, que: '3 · CTI Vitae / RENACYT (CONCYTEC)', como: 'Registro con tu documento de identidad y vincula el ORCID; la tesis solo suma para RENACYT si está registrada aquí.', enlace: R('CTI') },
        { min: 4, que: '7 · PROSPERO (CRD York) — registro del protocolo de SR-1 en R10', como: 'Crea la cuenta (con el ORCID ya hecho). No registres nada todavía.', enlace: R('PROS') },
        { min: 4, que: '8 · Rayyan — cribado dual en ciego de SR-1', como: 'Cuenta gratuita (≤3 revisiones). El revisor #2 también necesitará la suya (X-1).', enlace: R('RAY') },
        { min: 4, que: '9 · Zotero — biblioteca de PDFs por entregable', como: 'Cuenta + instala el conector del navegador; crea una carpeta por entregable (carta-1 · tesis-L0 · case-report-1 · SR-1).', enlace: R('ZOT') },
        { min: 4, que: '10a · NCBI · API key de E-utilities (10 req/s)', como: 'Inicia sesión → Settings → API Key Management → Create.', enlace: R('NCBIACC') },
        { min: 3, que: '10b · OpenAlex · API key (motor research-discovery)', como: 'Sigue la página de autenticación de OpenAlex y genera la key.', enlace: R('OPENALEX') },
        { min: 3, que: 'Registro: ORCID iD y CTI Vitae en DATA/RESEARCH/MENTORES.md (crea al final «## Identificadores»; son públicos) + marca 7/10 en la checklist', como: 'Las API keys NO van al repo (es PÚBLICO): solo en el gestor de contraseñas / un .env local.', enlace: { t: 'MENTORES.md', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
      ],
      hecho: 'Checklist «Infra académica» 7/10 (ORCID · Scholar · CTI Vitae · PROSPERO · Rayyan · Zotero · keys NCBI + OpenAlex) + ORCID iD y CTI Vitae copiados en MENTORES.md «## Identificadores»; las keys solo en el gestor.',
      planB: 'Si una validación no llega hoy (correo de CTI Vitae u ORCID): márcala «en trámite» y sigue con la siguiente; se cierra en los 5′ de la eval anclada de R1 (' + f('R1') + ').',
      aviso: 'La checklist estima 10-15′ por cuenta: las 10 no caben en 45′. Hoy van 7; las 3 cuentas de portal son POR REVISTA y su URL está «A VERIFICAR»: Editorial Manager / ScholarOne se abren en C-5 (' + f('C-5') + ', formateo + cuenta activa en el portal del journal elegido) y eScholarship (Dermatology Online Journal) en CR-9 (' + f('CR-9') + ').',
      recursos: [R('ORCID'), R('SCHOLAR'), R('CTI'), R('PROS'), R('RAY'), R('ZOT'), R('NCBIACC'), R('OPENALEX')],
    }),
    R1: (x, prev) => ({
      titulo: 'R1 · 3 PICO (terapia · diagnóstico · pronóstico) + 1 abstract clasificado con Greenhalgh (Taylor 2009, PMID 19807760)',
      pasos: [
        { min: 5, que: `Eval anclada de ${prev.code}: ¿checklist «Infra académica» en 7/10? + 2Q: «¿qué identificador pide PROSPERO a todo el equipo?» · «¿dónde NO se guarda una API key?»`, como: 'Responde de memoria; si alguna cuenta quedó «en trámite», ciérrala ahora.' },
        { min: 5, que: 'Pre-test (free recall 60 s): qué es P · I · C · O y qué diseño responde mejor a terapia, a diagnóstico y a pronóstico', como: 'Escríbelo a papel sin mirar; lo compruebas en el paso 3.' },
        { min: 12, que: '3 PICO escritos en la nota nueva 01_PICO.md (vault: SR-1_complicaciones/01_protocolo_PICO) — una pregunta de cada tipo en el nicho rellenos · fototipos IV-VI', como: 'Plantilla por pregunta: P (pacientes) · I (intervención / exposición / prueba) · C (comparador) · O (desenlace medible) · tipo · diseño ideal (terapia → ECA · diagnóstico → transversal frente al patrón de oro · pronóstico → cohorte). Ejemplos de forma (no de contenido): terapia «relleno de ácido hialurónico en fototipo IV-VI vs otro producto → hiperpigmentación post-inflamatoria»; diagnóstico «ecografía Doppler vs diagnóstico clínico → oclusión vascular»; pronóstico «fototipo IV-VI tratado con relleno → PIH a 6 meses».', enlace: { t: '◆ 01_protocolo_PICO', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/01_protocolo_PICO/_README') } },
        { min: 15, que: 'Abstract: Taylor SC, Burgess CM, Callender VD. «Safety of nonanimal stabilized hyaluronic acid dermal fillers in patients with skin of color: a randomized, evaluator-blinded comparative trial». Dermatol Surg 2009;35 Suppl 2:1653-60 (PMID 19807760)', como: 'Método Greenhalgh («getting your bearings»): ¿por qué se hizo? · ¿estudio primario o secundario? · ¿diseño (el título dice aleatorizado y con evaluador ciego)? · ¿población? · ¿intervención y comparador? · ¿desenlace principal? → escribe su PICO y su diseño en 01_PICO.md.', enlace: { t: 'PubMed 19807760', url: 'https://pubmed.ncbi.nlm.nih.gov/19807760/' } },
        { min: 3, que: 'Free recall a papel: 3 ideas del abstract + 1 duda de método', como: 'Sin mirar la nota; luego compáralo.' },
        { min: 5, que: '≤3 APEX-método + guardar 01_PICO.md y enlazarla desde SR-1/_hoja_de_ruta', como: 'APEX tipo «tipo de pregunta → diseño ideal» y «ciego del evaluador = ¿qué sesgo controla?».', enlace: { t: '◆ SR-1 · hoja de ruta', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/_hoja_de_ruta') } },
      ],
      hecho: '01_PICO.md con 3 PICO (terapia · diagnóstico · pronóstico) + el abstract de Taylor 2009 clasificado por diseño + ≤3 APEX-método.',
      planB: 'Si PubMed no abre: el mismo registro en Europe PMC (https://europepmc.org/article/MED/19807760). Abstract de reserva: Grimes PE, Thomas JA, Murphy DK. J Cosmet Dermatol 2009;8(3):162-8 (PMID 19735512).',
      recursos: [R('CIL1'), R('GREEN'), { t: 'PubMed · Taylor 2009 (PMID 19807760)', url: 'https://pubmed.ncbi.nlm.nih.gov/19807760/' }, { t: 'PubMed · Grimes 2009 (reserva, PMID 19735512)', url: 'https://pubmed.ncbi.nlm.nih.gov/19735512/' }, R('DELO')],
    }),
    M1: (x, prev) => ({
      titulo: 'M1 · Dr. Ciro: WhatsApp con las 3 coautorías (tesis → research letter · carta · case report) + guion de 1 hoja',
      pasos: [
        { min: 5, que: `Eval anclada de ${prev.code}: ¿existe 01_PICO.md con 3 PICO? + 2Q: «terapia → ¿qué diseño?» · «Taylor 2009: ¿diseño y quién está ciego?»`, como: 'De memoria; si falta algo de R1, anótalo como deuda.' },
        { min: 5, que: 'Pre-test: de memoria, las 3 coautorías que le propones y qué le pides exactamente en cada una', como: 'Después compáralo con MENTORES.md §3 «Mensaje 1».' },
        { min: 15, que: 'Personaliza el WhatsApp y la hoja-guion de MENTORES.md §3 «Mensaje 1 — Dr. Ciro» con las fechas del plan vigente (v6.03)', como: `Carta al editor: envío C-6 ${f('C-6')} · research letter: formateo T-7 ${f('T-7')} → envío T-8 ${f('T-8')} · case report: elegir el caso antes del 31-oct (CR-1 ${f('CR-1')}). En el punto 1(a) del guion deja la pregunta de la vía CEI (expedita / retrospectiva / exención). Petición concreta y verificable, nunca «quiero experiencia».`, enlace: { t: 'MENTORES.md §3', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
        { min: 5, que: 'ENVÍA el WhatsApp (lo envías tú)', como: 'Pide 20 minutos esta semana o la próxima, en persona o por llamada; adjunta nada todavía.' },
        { min: 5, que: `Antes de T-1 (${f('T-1')}): lista de los 10 documentos de etica.md §1 (tengo / falta)`, como: 'Marca cuáles tienes en PDF y cuáles hay que pedir; lo que falte se lo preguntas al Dr. Ciro en la reunión.', enlace: { t: 'etica.md §1', url: GH + 'DATA/RESEARCH/TESIS_L0/etica.md' } },
        { min: 5, que: 'Registro en MENTORES.md: fila 1 (fecha de contacto · estado 🟡 · siguiente paso = seguimiento a los 3-5 días) + 1 línea en §2', como: 'Si en 3 semanas no hay caso → fila 6 (fuente B del caso), como dice MENTORES.md.' },
        { min: 5, que: 'Free recall + ≤3 APEX-método + sella el artefacto', como: 'APEX tipo «mensaje a mentor = petición concreta + reparto de trabajo + fecha».' },
      ],
      hecho: 'WhatsApp enviado al Dr. Ciro con las 3 coautorías + fila 1 de MENTORES.md con fecha y estado + lista de los 10 documentos de etica.md §1 (tengo / falta).',
      planB: 'Sin WhatsApp: el mismo texto por correo o en persona en su consulta, el mismo día.',
      recursos: [{ t: 'MENTORES.md (CRM + mensajes)', url: GH + 'DATA/RESEARCH/MENTORES.md' }, { t: 'TESIS_L0/etica.md', url: GH + 'DATA/RESEARCH/TESIS_L0/etica.md' }, R('ICMJE'), R('CREDIT')],
    }),
    'C-1': (x, prev) => ({
      titulo: 'C-1 · Discovery: 5 artículos candidatos de los últimos 60 días (JAAD · JAAD Intl · IJD · JCD · Dermatol Surg) + correo a IJD',
      pasos: [
        { min: 5, que: `Eval anclada de ${prev.code}: ¿respondió el Dr. Ciro? (regístralo) + 2Q: los 4 criterios ICMJE de autoría · 1 rol CRediT`, como: 'De memoria; la respuesta va a MENTORES.md §2.' },
        { min: 5, que: 'Pre-test: qué hace a un artículo buen «diana» para una carta', como: 'Ventana ≤8 semanas desde la publicación online (regla de candidatos.md mientras la de cada revista esté «A VERIFICAR») + un ángulo con 1 dato verificable peruano/latino.' },
        { min: 15, que: 'Consulta Crossref A (filler · hyaluronic acid · complication) y B (skin of color · Fitzpatrick · laser · cosmetic), ' + fmtDM(C1D) + ' → ' + fmtDM(C1H) + '-' + C1H.slice(0, 4) + ', en las 5 revistas por ISSN', como: 'Abre las dos URLs (mismas consultas que candidatos.md, con fechas nuevas) y anota título · revista · fecha online · DOI de los que encajen con derma estética · fototipos IV-VI · complicaciones de rellenos.', enlace: { t: 'Crossref A', url: CROSSREF('filler hyaluronic acid complication') } },
        { min: 10, que: 'Tabla de 5 candidatos en DATA/RESEARCH/CARTA_1/candidatos.md (nueva sección «oct-2026»)', como: 'Por fila: journal · fecha online · DOI · ventana (URL de Author Guidelines) · límite de palabras/refs · coste · ángulo. Los candidatos del 5-sep publicados online en jul-ago ya pasan las 8 semanas: solo siguen si la guía de su revista admite una ventana mayor.', enlace: { t: 'candidatos.md', url: GH + 'DATA/RESEARCH/CARTA_1/candidatos.md' } },
        { min: 5, que: 'Correo a la Editorial Office de IJD pidiendo su política de correspondencia (pendiente desde el 27-ago)', como: '5 líneas; lo envías tú. La dirección se toma de la web de la revista (no está verificada en el repo: A VERIFICAR).', enlace: R('IJD') },
        { min: 5, que: 'Free recall + ≤3 APEX-método + guarda candidatos.md', como: 'Cada DOI nuevo se verifica con DATA/RESEARCH/agentic/citation_verifier.py antes de C-2 (' + f('C-2') + ').' },
      ],
      hecho: 'CARTA_1/candidatos.md con 5 candidatos de los últimos 60 días (journal · fecha · DOI · ventana · límites · coste · ángulo) + correo a IJD enviado.',
      planB: 'Si Crossref no responde: PubMed con filtro de fecha (últimos 60 días) y el nombre de cada revista; OpenAlex como tercera vía.',
      recursos: [{ t: 'Crossref · consulta A (rellenos)', url: CROSSREF('filler hyaluronic acid complication', C1D, C1H) }, { t: 'Crossref · consulta B (skin of color)', url: CROSSREF('skin of color Fitzpatrick laser cosmetic', C1D, C1H) }, R('PM'), R('OPENALEX'), R('JAADINT'), R('IJD')],
    }),
    M2: (x, prev) => ({
      titulo: 'M2 · Rising Scholars: cuenta + solicitud de mentor 1-a-1 (inglés del primer manuscrito) + plan B de inglés',
      pasos: [
        { min: 5, que: `Eval anclada de ${prev.code}: ¿5 candidatos con DOI en candidatos.md? + 2Q: la regla de la ventana · por qué un dato verificable`, como: 'De memoria.' },
        { min: 5, que: 'Pre-test: qué 3 cosas pides al mentor y en qué meses', como: 'Después compáralo con MENTORES.md §3 «Mensaje 2».' },
        { min: 10, que: 'Registro en Rising Scholars (red gratuita de INASP; la cuenta la creas tú)', como: 'País Perú · institución FMH-UNCP · disciplina dermatología / salud pública · nivel early-career · idiomas ES/EN.', enlace: { t: 'risingscholars.net/accounts/register', url: 'https://risingscholars.net/accounts/register/' } },
        { min: 10, que: 'Solicitud de mentor en la sección Mentoring: pega el «Mensaje 2» de MENTORES.md con las fechas del plan vigente (v6.03)', como: `Cambia los meses del mensaje: carta al editor ≈ ${f('C-3')} → ${f('C-6')} · research letter ≈ ${f('T-7')} → ${f('T-8')} · case report: revisión en CR-6 (${f('CR-6')}). La mecánica exacta (buscar mentor vs publicar la solicitud) se confirma dentro de la plataforma (A VERIFICAR, 5-sep).`, enlace: { t: 'Mentoring', url: 'https://risingscholars.net/en/mentoring/' } },
        { min: 5, que: `MENTORES.md fila 2: fecha de solicitud + «decisión del plan B de inglés: ${fmt(addDays(M2.fecha, 28))}» + 1 línea en §2`, como: 'Si a las 4 semanas no hay mentor asignado → plan B (editor profesional, RUTA §3.1).', enlace: { t: 'MENTORES.md', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
        { min: 5, que: 'Plan B de inglés listo: inscríbete en «Writing in the Sciences» (Coursera; modo auditoría si está disponible)', como: 'Solo la inscripción; el curso se usa cuando toque redactar (C-3).', enlace: R('SCIWRITE') },
        { min: 5, que: 'Free recall + ≤3 APEX-método + sella el artefacto', como: 'APEX tipo «mentor de escritura: qué pedir · cuánto tiempo · con qué fecha».' },
      ],
      hecho: 'Cuenta en Rising Scholars + solicitud de mentor enviada + fila 2 de MENTORES.md con fecha y la fecha de decisión del plan B.',
      planB: 'Si el registro falla o la sección Mentoring no responde: guarda el mensaje y escribe a la red por su formulario de contacto; la fecha de decisión del plan B no se mueve.',
      recursos: [R('RISING'), { t: 'MENTORES.md §3 «Mensaje 2»', url: GH + 'DATA/RESEARCH/MENTORES.md' }, R('SCIWRITE'), R('PHRASE')],
    }),
  };

  const out = {}; const conDetalle = [];
  for (const x of TODOS) {
    const prev = TODOS.find((y) => y.d === x.d - 1) || null;
    const f4 = x.fecha >= SERUMS_INICIO;
    const obs = obsDe(x);
    const recs = x.recs.map(R);
    let g;
    if (DET[x.code] && !f4) {
      const d = DET[x.code](x, prev);
      g = { franja: '13:30–14:15', plan: 'research-derma', titulo: d.titulo, totalMin: 45, pasos: d.pasos, recursos: [...d.recursos, { t: '◆ Obsidian · carpeta del entregable', url: obsUrl(obs) }], hecho: d.hecho, ...(d.planB ? { planB: d.planB } : {}), ...(d.aviso || x.chips ? { aviso: [d.aviso, ...(x.chips || [])].filter(Boolean).join(' · ') } : {}) };
      conDetalle.push(x.code);
    } else {
      continue; // genérica / F4: la construye guiaResearchDe() en src/lib/researchGuia.ts (TS_BUILDER) desde DIAS + REC (no se duplica el texto en el bundle)
    }
    const sum = g.pasos.reduce((a, p) => a + p.min, 0);
    if (sum !== g.totalMin) throw new Error(`research_guia: ${x.code} Σ pasos ${sum} ≠ ${g.totalMin}`);
    g.pasos.forEach((p, i) => { if (!p.que || !p.como || !Number.isInteger(p.min) || p.min < 1) throw new Error(`research_guia: ${x.code} paso ${i + 1} incompleto`); });
    const vistos = new Set();
    g.recursos = g.recursos.filter((r) => !vistos.has(r.url) && vistos.add(r.url));
    out[x.d] = g;
  }
  const minimo = {
    franja: '13:30–14:00', plan: 'research-derma', titulo: "RESEARCH · mínimo 30′ (DJ-4) — pausa de átomos (intensiva ENCAPS)", totalMin: 30,
    pasos: [
      { min: 10, que: 'Inbox de revisores y editorial: estado de la carta y de la research letter en los portales', como: 'Responde lo que sea de 1 línea; lo que pida trabajo va a la cola de febrero (X-2 tiene la plantilla de rebuttal).' },
      { min: 15, que: '1 lectura de la cola del ciclo 2 (el recurso 1 del próximo átomo pendiente)', como: 'Lee con free recall al final; no produces artefacto nuevo.' },
      { min: 5, que: 'Repaso del paquete congelado del case report (CR-8)', como: 'Solo comprobar que manuscrito + fotos + consentimiento + CARE + cover siguen completos para CR-9.' },
    ],
    recursos: [{ t: '◆ Obsidian · Dashboard Research', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/00_DASHBOARD_RESEARCH/Dashboard_Research') }],
    hecho: 'Inbox al día + 1 lectura con free recall + paquete del case report comprobado.',
  };
  return { porD: out, minimo, conDetalle };
}

module.exports = { construirGuiasResearch, TS_BUILDER };
