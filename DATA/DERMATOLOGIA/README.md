# DATA · DERMATOLOGÍA (board + estética)

Carpeta de la sección **Dermatología**. Spec maestra: [`../../DERMA_MASTER_SPEC.md`](../../DERMA_MASTER_SPEC.md)
(fuente de verdad del módulo: cerebro clínico de 7 pasos, referentes, bloques A–G + acné,
motor de estudio diario). Aquí se **guarda la data extraída** de las 3 fuentes y el plan día-a-día.

## Las 3 fuentes de información (extraer data REAL, no inventar)
1. **Qbankly — Dermatología** (`qbankly.app`) · preguntas + vídeos board. **Abre SOLO en
   Microsoft Edge.** Acceso: extensión "Claude in Chrome" instalada en Edge, o navegar a
   mano. Mismo API interno `/api/v2/...` que USMLE (ver `DATA/USMLE`). Los links de la app
   deben ofrecer botón **◆ Edge**.
2. **ProMIR — Dermatología** (`promir.medicapanamericana.com`) · asignatura de Dermatología
   dentro de las 30 (ver `src/lib/mirTemarioData.ts`); temario + capítulos `/capitulo/<id>`
   + videoclases. Abre en Chrome.
3. **AccessDermatologyDxRx** (`dermatology.mhmedical.com`) · McGraw Hill, **ya logueado**
   (Remote Access UF / George A. Smathers Libraries). Contiene: Review Questions, Cases,
   Videos, Study Tools, Books (p. ej. *Taylor & Kelly's Dermatology for Skin of Color*,
   Fitzpatrick). Acceso: Microsoft Edge, Claude-in-Chrome, o Chrome DevTools vía Claude-in-Chrome.

## Qué guardar aquí (estructura sugerida)
```
DERMATOLOGIA/
  README.md                 (este archivo)
  _scrape/                  JSON crudo de cada fuente (Qbankly/ProMIR/AccessDerma)
  temario.md                temario consolidado de dermatología (board) por bloques
  daily-plan.md             plan tema-atómico/día (interdiario con Research)
  referentes.md             autoridades (Cotofana, de Maio, Carruthers, DeLorenzi…) verificadas
  recursos.md               vídeos YouTube + cursos con URLs reales verificadas
```

## Encargo del chat de Dermatología
- Extraer la estructura real de las 3 fuentes (temario, vídeos con duración, preguntas).
- Construir un plan **tema-atómico/día** estilo USMLE/MIR (mismo motor: HOY/Horario/7d/Temario,
  links reales, progreso real marcable, botón ◆ Edge para Qbankly), ritmo **interdiario** con Research.
- Mejorar/ampliar `DERMA_MASTER_SPEC.md` con lo verificado y dejar la data en esta carpeta.
- La **página web la diseña el chat principal**; este chat se enfoca en extraer + estructurar.

> El bloque de investigación verificada (revistas, anatomía, referencias) se añade como
> apéndice a `DERMA_MASTER_SPEC.md` (ver sección "Apéndice verificado" al final).
