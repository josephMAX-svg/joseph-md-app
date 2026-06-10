# LIVIANO — Panel de Control Central del Dueño

## Cómo se organiza y se mide una clínica de telesalud / DTC de élite (GLP-1 / pérdida de peso)

> **Propósito de este documento.** Es la referencia única ("source of truth") para el dueño de LIVIANO sobre tres cosas: (1) cómo se *estructura* una empresa de telesalud direct-to-consumer (DTC) de alto nivel, (2) cómo se *mide* — cada KPI con su fórmula exacta, por qué importa y el benchmark típico — y (3) cómo funcionan el *estudio de creativos* y la *logística de abastecimiento GLP-1*. Está pensado para que el dueño lo lea una vez en profundidad y después vuelva al **Tablero** (Parte 2) cada semana.
>
> **Fecha de compilación:** junio 2026. Las fórmulas son universales; los *benchmarks* y el marco regulatorio GLP-1 reflejan el estado del mercado a 2025–2026 y deben re-verificarse cada trimestre.
>
> **Aviso.** La Parte 4 describe el *modelo de negocio, de costos y de cumplimiento* del abastecimiento. No contiene instrucciones de fabricación ni asesoría legal o médica. El marco regulatorio GLP-1 cambia rápido: validar con un abogado farmacéutico y con la regulación del país/estado de operación de LIVIANO antes de actuar.

---

# PARTE 1 — ESTRUCTURA ORGANIZACIONAL

## 1.1 La idea central: dos fábricas

Una empresa de telesalud DTC de élite no es "una empresa": son **dos fábricas acopladas** que comparten dueño, marca y datos, pero que se gestionan con lógicas distintas y métricas distintas.

| | **FÁBRICA DE DEMANDA** | **FÁBRICA DE ENTREGA** |
|---|---|---|
| Qué hace | Genera atención, leads y ventas | Convierte la venta en un resultado clínico y un producto entregado |
| Funciones | Marketing/Growth, Creativos, Media buying, Ventas/Conversión | Operación clínica, Farmacia/Dispensación, Logística/Fulfillment, Atención y Retención |
| Lógica | Volumen, velocidad, experimentación, "matar y escalar" | Consistencia, seguridad, cumplimiento, costo unitario, cero defectos |
| Métrica madre | **CAC** (costo de adquisición) y **ROAS** | **Costo por orden entregada** y **margen de contribución** |
| Falla típica | Quemar dinero en anuncios que no convierten | Romper la cadena de frío, stockout, churn por mala experiencia |

**Por qué separarlas explícitamente.** El error más caro en DTC de salud es dejar que la fábrica de demanda dicte la de entrega (vender ofertas que la operación no puede cumplir con margen) o que la de entrega frene la demanda (operación lenta que no escala). El dueño debe tener **un responsable por cada fábrica** y una métrica-puente que las conecte: el **margen de contribución por cliente** (lo que queda después de pagar la entrega *y* la adquisición). Si ese número es positivo y creciente, ambas fábricas están sanas.

La conexión matemática entre ambas es la regla de Hormozi de *Client-Financed Acquisition* (CFA): el negocio se auto-financia cuando el **margen bruto generado en los primeros 30 días** supera **2× CAC + COGS**. Es decir, lo que cobra un cliente nuevo en su primer mes debe pagar su propia adquisición, su propia entrega, *y además* financiar la adquisición del siguiente cliente.

## 1.2 Funciones / departamentos de una telesalud DTC

1. **Producto / Clínico (Medical & Clinical Ops).** Protocolos de prescripción, criterios de elegibilidad, banderas rojas de seguridad, red de médicos/prescriptores, telemedicina, farmacovigilancia, calidad clínica. En GLP-1 es el departamento que protege la licencia para operar.
2. **Operaciones / Logística (Supply & Fulfillment).** Abastecimiento del fármaco, relación con farmacias (compounding/marca), inventario, cadena de frío, empaque, envío last-mile, devoluciones, control de mermas.
3. **Marketing / Growth.** Estrategia de adquisición, creativos/afiches, media buying (Meta, TikTok, Google, YouTube), landing pages, atribución, SEO/contenido, influencers, email/SMS.
4. **Ventas / Conversión.** Cierre de leads que requieren toque humano (consulta inicial, objeciones de precio), upsell/cross-sell (planes anuales, productos complementarios), reactivación.
5. **Finanzas.** Contabilidad, unit economics, flujo de caja, pricing, presupuesto de ads, reporting al dueño, cumplimiento fiscal.
6. **Atención al cliente / Retención (CX & Success).** Soporte, manejo de efectos adversos no clínicos, gestión de renovaciones, prevención de churn, NPS, win-back.
7. **Tecnología / Datos.** Plataforma (portal del paciente, EHR ligero, e-prescribing), CRM, integraciones de pago, dashboards, automatizaciones, seguridad/privacidad de datos de salud.

## 1.3 Organigrama por etapa

**Etapa 0–1 (validación, < ~US$50–100k/mes de ingresos).** El dueño es CEO + Growth + Finanzas. Se contrata/terceriza primero, en este orden:
1. **Director/a Médico/a (o prescriptor líder)** — sin esto no hay negocio legal. *Primera contratación clave.*
2. **Media buyer / Growth** — quien hace funcionar la fábrica de demanda.
3. **Coordinador/a de Operaciones + CX** (un solo rol al inicio) — pedidos, farmacia, soporte.
4. **Editor/a de creativos** (puede ser freelance) — alimenta el testing de afiches.

**Etapa escalando (~US$100k–1M/mes).** Aparecen líderes de área:
- **Head of Growth** (media + creativos + CRO) | **Head of Clinical Ops** | **Head of Supply/Fulfillment** | **Head of CX/Retención** | **Controller/Finance**. El dueño pasa de operador a *dueño del tablero*: revisa KPIs, asigna capital, contrata.

**Etapa escalado (> US$1M/mes).** Estructura por las dos fábricas con C-level:
- **CMO/CRO** (demanda) y **COO** (entrega) reportando al CEO; **CFO**; **CMO clínico/Medical Director** independiente; **CTO/Head of Data**. Equipos especializados: brand vs performance, creative strategist dedicado, analista de cohortes, gerente de inventario/forecast, compliance officer.

## 1.4 RACI básico (quién es Responsable, Aprobador, Consultado, Informado)

| Decisión / proceso | Growth | Clínico | Supply | Finanzas | CX | Dueño |
|---|---|---|---|---|---|---|
| Lanzar/matar un creativo | **R/A** | C | I | C | I | I |
| Aprobar protocolo de prescripción | C | **R/A** | I | I | I | A |
| Definir precio y oferta | C | C | C | **R** | C | **A** |
| Elegir farmacia / proveedor GLP-1 | I | **C** | **R** | C | I | **A** |
| Presupuesto de ads del mes | **R** | I | I | **A** | I | A |
| Política de reembolso / garantía | I | C | I | C | **R/A** | A |
| Gestión de stockout / quiebre | I | C | **R/A** | I | C | I |

*Regla de oro:* toda decisión que toque **seguridad del paciente o legalidad** lleva el médico como Aprobador; toda decisión que mueva **dinero estructural** (precio, proveedor, presupuesto) lleva al dueño como Aprobador.

---

# PARTE 2 — KPIs E ÍNDICES (el corazón del documento)

> Convención: **MRR** = Monthly Recurring Revenue. Todas las fórmulas usan el mismo período (mensual salvo que se indique). "Margen bruto $" = ingreso − COGS.

## 2.1 Ingresos y crecimiento

| Métrica | Qué es | Fórmula | Por qué importa | Objetivo / benchmark |
|---|---|---|---|---|
| **Revenue (Ingresos)** | Dinero facturado en el período | Σ ventas del período | Tamaño bruto del negocio | Crecer m/m sin destruir margen |
| **MRR** | Ingreso recurrente mensual | Σ (suscriptores activos × cuota mensual) | Predecibilidad del cash en modelo suscripción | Crecimiento m/m positivo |
| **ARR** | Ingreso recurrente anual | MRR × 12 | Visión anual / valuación | — |
| **AOV (ticket promedio)** | Valor promedio por pedido | Revenue ÷ nº de pedidos | Palanca directa de unit economics (subir AOV mejora CAC payback) | Subir vía bundles/planes |
| **Tasa de crecimiento (MoM)** | Velocidad de crecimiento | (Revenue mes actual − Revenue mes previo) ÷ Revenue mes previo | Mide si la máquina acelera o desacelera | "Triple, triple, double, double" en early stage es agresivo |

## 2.2 Márgenes y rentabilidad

| Métrica | Fórmula | Qué mide / por qué importa | Benchmark |
|---|---|---|---|
| **COGS** (costo de lo vendido) | Σ costos directos de entregar (fármaco + dispensación + envío + consulta médica variable) | Base de todo el margen | Atacarlo es la palanca #1 (ver Parte 4) |
| **Margen bruto $** | Revenue − COGS | Cuánto queda para pagar marketing y overhead | — |
| **Margen bruto %** | (Revenue − COGS) ÷ Revenue × 100 | Escalabilidad del modelo | Software/suscripción puro: 75–80%+. DTC físico con fármaco: típicamente 50–70%; cuanto más alto, más oferta agresiva se puede dar |
| **Margen de contribución** | Margen bruto $ − costos variables de venta (incl. CAC) | Lo que cada cliente deja *después* de pagar su entrega y su adquisición | Debe ser **positivo desde el día 1** idealmente |
| **EBITDA** | Beneficio antes de intereses, impuestos, depreciación y amortización | Rentabilidad operativa "limpia" | — |
| **Margen neto %** | Beneficio neto ÷ Revenue × 100 | Lo que de verdad queda al final | — |
| **Regla de 40** | (Crecimiento % ARR) + (margen EBITDA o FCF %) ≥ 40 | Equilibrio crecimiento vs rentabilidad | ≥ 40 es "sano" |

**Gasto bruto vs gasto neto.** *Gasto bruto* = todo el efectivo que sale (todos los costos y gastos). *Gasto neto (net burn)* = gasto bruto − ingresos del período; es lo que realmente "quemas" de tu caja. Un negocio puede tener gasto bruto altísimo y net burn cero (o negativo = genera caja) si los ingresos cubren los egresos.

**Flujo de caja (cash flow).** Es el movimiento real de efectivo (entradas − salidas), distinto del beneficio contable. En DTC con suscripción y cobro anticipado, el cash flow puede ser mejor que el EBITDA (cobras hoy, entregas durante meses); con compras de inventario grandes, puede ser peor (pagas el fármaco antes de venderlo).

- **Burn rate.** *Gross burn* = total de egresos de efectivo del mes. *Net burn* = gross burn − ingresos del mes. Es la velocidad a la que se consume la caja.
- **Runway.** = Caja disponible ÷ net burn mensual. Cuántos meses sobrevive el negocio sin nueva inyección. **Benchmark prudente: 18–24 meses de runway.**

## 2.3 Unit economics (lo más importante)

| Métrica | Fórmula | Qué mide | Objetivo / benchmark |
|---|---|---|---|
| **CAC** | Total gasto de marketing y ventas ÷ nº de clientes nuevos | Costo de adquirir un cliente | Lo más bajo posible manteniendo volumen |
| **LTV** | AOV × frecuencia de compra × vida media del cliente (en revenue) | Ingreso total esperado por cliente | — |
| **LTGP** (LTV en *gross profit*) | LTV × margen bruto % | Versión correcta para decisiones: lo que **queda** por cliente, no lo que factura | Usar siempre LTGP, no LTV bruto |
| **Ratio LTV:CAC (o LTGP:CAC)** | LTGP ÷ CAC | El número que "gobierna todo el negocio" | **≥ 3:1** mínimo. **Por nivel de toque humano (Hormozi):** 3:1 sin humanos, **6:1 con algo de toque**, **9:1+ con múltiples toques humanos** — telesalud cae en 6:1–9:1. Telesalud por suscripción reportada en 7–9× |
| **CAC payback period** | CAC ÷ (margen bruto $ mensual por cliente) | En cuántos meses recuperas lo invertido en adquirir | **DTC: 6–12 meses** aceptable; **suscripción/alta frecuencia: 3–6 meses**; **< 3 meses = excelente**; **> 12 = riesgo de caja serio** |
| **Contribución por cliente** | Margen bruto $ por cliente − CAC | Cuánto deja neto cada cliente tras adquirirlo | Positivo |

**Regla CFA (auto-financiación, Hormozi).** El negocio escala sin capital externo si:
**Margen bruto de los primeros 30 días > (2 × CAC) + COGS.**
Ejemplo: si CAC = $100 y COGS = $50, necesitas ≥ **$300** de margen bruto en el primer mes para que cada cliente pague su adquisición, su producto, *y* financie al siguiente cliente.

## 2.4 Marketing / Ads

| Métrica | Fórmula | Qué mide | Benchmark 2025–2026 |
|---|---|---|---|
| **ROAS** | Ingreso atribuido ÷ gasto en ads | Retorno por $ de publicidad | DTC blended sano **3–4×**; prospecting 2–3×; retargeting 6–10×. (Mediana cruda de mercado ~1.9×) |
| **CPM** | (Gasto ÷ impresiones) × 1000 | Costo por mil impresiones | Meta ~$8–14; TikTok ~$4–8; YouTube ~$10–18; LinkedIn $20–45 |
| **CPC** | Gasto ÷ clics | Costo por clic | Varía por canal/industria |
| **CTR** | (Clics ÷ impresiones) × 100 | % que hace clic tras ver el anuncio | Frío sano **1.5–2%+**; < 0.8% en feed = matar |
| **CPL** | Gasto ÷ leads | Costo por lead | Salud suele estar por encima del promedio social (~$28 Meta, subiendo) |
| **CPA / CPL por canal** | Gasto del canal ÷ conversiones del canal | Eficiencia real por fuente | Comparar canal a canal; TikTok suele dar CPA más bajo, Meta más caro |
| **Hook rate** | (Reproducciones de 3s ÷ impresiones) × 100 | Si el primer frame "frena el scroll" | **> 30% fuerte; < 20% débil** |
| **Tasa de conversión por etapa** | Conversiones etapa N ÷ entradas etapa N | Dónde se cae el funnel | Medir lead→consulta→pago→activo |

**Cómo atribuir y comparar canales.** Tres capas: (1) **plataforma** (lo que reporta Meta/TikTok — optimista, infla conversiones), (2) **analítica propia / post-purchase survey** ("¿cómo nos conociste?") para des-sesgar, (3) **MER / blended ROAS** = Revenue total ÷ Gasto total en ads, la única cifra que no se puede "trucar" entre plataformas. **Decisión:** asignar presupuesto al canal con mejor **CAC real** (no mejor ROAS de plataforma), respetando capacidad de la fábrica de entrega.

## 2.5 Retención / Suscripción

| Métrica | Fórmula | Qué mide | Benchmark |
|---|---|---|---|
| **Logo churn** | Clientes perdidos en el período ÷ clientes al inicio | % de *clientes* que se van | Suscripción sana: < ~5% anual (≈ <1%/mes) |
| **Revenue churn** | MRR perdido ÷ MRR al inicio | % de *ingreso* que se va | Más importante que logo churn |
| **GRR** (retención bruta de ingresos) | (MRR inicio − churn − downgrades) ÷ MRR inicio | Cuánto retienes *sin* contar expansión | B2B ~88%; best-in-class > 92% |
| **NRR** (retención neta de ingresos) | (MRR inicio − churn − downgrades + expansión) ÷ MRR inicio | Crecimiento de la base existente | Mediana ~101%; **> 100% = la base crece sola**; top > 120% |
| **Retención por cohortes** | % de cada cohorte (ej. "altas de enero") aún activa a los N meses | Revela decaimiento y problemas tempranos que el promedio oculta | Curva que se aplana = buen producto |
| **% de recompra / repeat rate** | Clientes con ≥2 compras ÷ total clientes | Salud de la frecuencia | Subir con planes |
| **Duración media de suscripción** | 1 ÷ churn mensual (en meses) | Vida media del cliente | Alimenta el LTV |

> **Por qué cohortes y no solo el promedio:** un NRR "estable" puede esconder que tus mejores cohortes crecen a 130% mientras las peores caen a 70% y se cancelan. La cohorte revela el problema **meses antes** que el agregado.

## 2.6 Operación / Logística

| Métrica | Fórmula | Qué mide | Benchmark |
|---|---|---|---|
| **Fulfillment / order cycle time** | Tiempo desde pago hasta entrega (o envío) | Velocidad y experiencia | Lo más corto y consistente posible |
| **Tasa de stockout** | Pedidos no surtidos por falta de stock ÷ total pedidos | Quiebres de inventario | Apuntar a **95–98% in-stock** (stockout 2–5%) |
| **Rotación de inventario** | COGS ÷ inventario promedio | Cuántas veces "giras" el stock al año | DTC sano **2–4**; catálogos ajustados pueden ir más alto |
| **Costo de envío por orden** | Gasto total de envío ÷ nº de órdenes | Componente directo de COGS | Reducir vía consolidación/zonas |
| **NPS** | % Promotores (9–10) − % Detractores (0–6) | Lealtad y boca-a-boca | > 0 aceptable; > 50 excelente; medir por canal |

## 2.7 TABLERO DEL DUEÑO (vista de un vistazo)

Las 18 métricas que el dueño revisa cada semana. **Verde** = sano; **Ámbar** = vigilar; **Rojo** = actuar ya.

| # | Métrica | Grupo | Fórmula corta | 🟢 Verde | 🟡 Ámbar | 🔴 Rojo |
|---|---|---|---|---|---|---|
| 1 | Revenue / MRR | Crecimiento | Σ ingresos | ↑ m/m | plano | ↓ m/m |
| 2 | Crecimiento MoM | Crecimiento | Δ% mes | > 10% | 0–10% | < 0% |
| 3 | AOV | Crecimiento | Rev ÷ pedidos | ↑ | plano | ↓ |
| 4 | Margen bruto % | Rentabilidad | (Rev−COGS)÷Rev | > 60% | 50–60% | < 50% |
| 5 | Margen de contribución | Rentabilidad | MB$ − CAC | > 0 y ↑ | ~0 | < 0 |
| 6 | EBITDA / Margen neto | Rentabilidad | — | > 0 | ~0 | < 0 |
| 7 | Net burn | Caja | Egresos − ingresos | ≤ 0 | bajo | alto |
| 8 | Runway (meses) | Caja | Caja ÷ net burn | > 18 | 9–18 | < 9 |
| 9 | CAC | Unit econ. | Mkt+Ventas ÷ nuevos | estable/↓ | ↑ leve | ↑ fuerte |
| 10 | LTGP:CAC | Unit econ. | LTGP ÷ CAC | ≥ 3:1 (6:1 ideal) | 2–3:1 | < 2:1 |
| 11 | CAC payback | Unit econ. | CAC ÷ MB$/mes | < 6 m | 6–12 m | > 12 m |
| 12 | Blended ROAS / MER | Ads | Rev ÷ gasto ads | > 3× | 2–3× | < 2× |
| 13 | CTR (frío) | Ads | clics÷impr. | > 1.5% | 0.8–1.5% | < 0.8% |
| 14 | Hook rate | Ads | 3s views÷impr. | > 30% | 20–30% | < 20% |
| 15 | Revenue churn (mensual) | Retención | MRR perdido÷MRR | < 3% | 3–6% | > 6% |
| 16 | NRR | Retención | con expansión | > 100% | 90–100% | < 90% |
| 17 | Stockout / in-stock | Logística | no surtidos÷total | < 2% | 2–5% | > 5% |
| 18 | NPS | CX | %Prom − %Detr | > 50 | 20–50 | < 20 |

---

# PARTE 3 — ESTUDIO DE MERCADO Y CREATIVOS ("qué afiche funciona")

## 3.1 La pregunta correcta

No es "¿qué anuncio me gusta?" sino **"¿qué creativo me trae clientes al menor CAC, de forma repetible y escalable?"**. En DTC moderno el creativo *es* el principal driver de costo: mejores creativos → menor CPM → menor CAC → más oferta agresiva posible. El sistema para saberlo es un **creative testing framework**.

## 3.2 Métricas por creativo (de arriba del funnel hacia abajo)

Cada afiche/video se evalúa en cascada — un mal número arriba mata todo lo de abajo:

1. **CPM** — ¿el algoritmo lo distribuye barato? (creativos buenos bajan el CPM)
2. **Hook rate** (3s views ÷ impresiones) — ¿frena el scroll? **> 30% bueno.**
3. **Hold rate** (views completos o 15s ÷ impresiones) — ¿retiene?
4. **CTR** (clics ÷ impresiones) — ¿genera intención? **> 1.5% frío.**
5. **CPL** (gasto ÷ leads) — ¿convierte a lead barato?
6. **CAC por creativo** (gasto del creativo ÷ clientes de ese creativo) — **el juez final.**

## 3.3 Framework de testing (estructura 3-3-3 y aislar variables)

- **Aislar una variable por test** (mismo público, misma oferta; cambia solo el creativo, o solo el hook, o solo la oferta). Sin esto no sabes *qué* causó el resultado.
- **Hipótesis antes de lanzar:** escribir qué esperas y por qué.
- **Cadencia:** 3–5 conceptos nuevos por semana (la creatividad se agota; alimentar el pipeline siempre).
- **Estructura 3-3-3** (popular en agencias): ~3 conceptos × 3 variaciones × 3 hooks, en campañas limpias de testing separadas de las de escala.
- **Volumen mínimo antes de juzgar:** ~500 impresiones por creativo y ~7 días (o suficientes conversiones para que el CPL/CPA sea confiable). No matar antes de tener señal.

## 3.4 Regla de matar / escalar (kill / scale)

| Señal | Acción |
|---|---|
| CTR < 0.8% en feed (tras volumen mínimo) | **Matar**, sin importar el CPL |
| CTR > 1.5% pero CPL/CPA sobre objetivo | Probar otra landing/oferta antes de descartar |
| CPL/CAC bajo objetivo y estable | **Ganador** → escalar |
| Escalar ganadores | Subir presupuesto **+20–30% cada 48–72 h** (subidas bruscas reinician el "learning" y disparan el CPM) |

## 3.5 Tablero de "market study" (3 ejes)

Construir tres vistas cruzadas, todas con las mismas columnas (CPM, Hook, CTR, CPL, CAC, gasto, conversiones, estado 🟢🟡🔴):

1. **Por CANAL** (Meta vs TikTok vs Google vs YouTube): dónde está el CAC más barato *hoy*.
2. **Por CREATIVO** (cada afiche/video con su ID): ranking de ganadores vs perdedores; columna "estado" (testing / ganador / muerto) y "fecha de fatiga" (cuándo el CPM empieza a subir = el creativo se quemó).
3. **Por OFERTA** (precio/garantía/bundle): qué propuesta convierte mejor y deja mejor margen.

> **Disciplina semanal:** el dueño revisa el ranking de creativos, mata lo rojo, escala lo verde, y verifica que el pipeline tenga ≥ 3 conceptos nuevos cargados. Esto **es** el "estudio de mercado" continuo.

---

# PARTE 4 — LOGÍSTICA Y ABASTECIMIENTO GLP-1

> Enfoque: **modelo operativo, de costos y de cumplimiento.** No instrucciones de fabricación. El entorno regulatorio de 2025–2026 es de **alto riesgo y cambio rápido**: validar siempre con asesoría legal farmacéutica del territorio de LIVIANO.

## 4.1 Cómo es la cadena de suministro de una clínica DTC de pérdida de peso

Existen dos modelos de producto, con economías opuestas:

**A) Producto de MARCA (branded).** Semaglutida/tirzepatida del fabricante original, vía distribuidores mayoristas autorizados y farmacias. Precio de lista alto (históricamente > US$1.000/mes), márgenes finos para la clínica, sin riesgo de "copia". Es el camino *de cumplimiento más limpio*.

**B) Producto COMPOUNDED (formulado por farmacia).** Históricamente el motor del boom DTC: las plataformas de telesalud construían el funnel de adquisición, contrataban prescriptores y enrutaban las órdenes a **farmacias de compounding**. Permitía precios de ~US$200–400/mes y márgenes amplios. La estructura de esa cadena paralela:
- **Fabricantes de API** (principio activo a granel), mayormente en China/India.
- **Outsourcing facilities / farmacias** que formulaban el API en viales inyectables (503B = outsourcing a escala; 503A = compounding por receta individual).
- **Plataforma telesalud** que aportaba prescripción + adquisición + entrega al paciente.

**El cambio regulatorio clave (2024–2026):** el compounding masivo de GLP-1 se expandió cuando los fármacos estaban en *escasez* (llegó a ~30% del suministro EE.UU. en 2024). Al estabilizarse el suministro, la FDA empezó a **cerrar la puerta**: en abril de 2026 propuso excluir semaglutida, tirzepatida y liraglutida de la lista de bulks 503B, y el compounding 503A solo sería permisible ante una *necesidad médica individualizada documentada* (no "más barato" ni "preferencia del paciente"). Hay litigios activos (Novo Nordisk, Eli Lilly) y cease-and-desist a clínicas y telesaludes.

**Implicación estratégica para LIVIANO:** el modelo de margen basado *solo* en compounding barato es **frágil y regulatoriamente expuesto**. Diseñar el negocio para que sobreviva a una transición hacia producto de marca u otra formulación cumplida; tratar el acceso a producto barato como una ventaja *temporal*, no como el cimiento.

## 4.2 Cadena de frío, inventario y cumplimiento

- **Cadena de frío:** los GLP-1 inyectables requieren refrigeración (rango típico 2–8 °C). La logística debe garantizar temperatura controlada extremo a extremo: empaque térmico, geles refrigerantes, *temperature logging*, transportistas que cumplan, y validación de excursiones de temperatura. Una ruptura de frío = producto inutilizable + riesgo al paciente + costo perdido.
- **Control de inventario:** trazabilidad por lote y vencimiento (FEFO: *first-expired-first-out*), conteo cíclico, y *forecast* de demanda atado al pipeline de marketing (si Growth va a escalar, Supply debe tener stock — esta es la coordinación entre las dos fábricas).
- **Cumplimiento regulatorio (general):** licencias de farmacia/telemedicina del territorio, e-prescribing válido, registros de paciente, farmacovigilancia, manejo de datos de salud (privacidad), y la elegibilidad legal de la fuente del fármaco. *Este punto define la licencia para operar.*

## 4.3 Cómo se reduce el costo de producto para tener más margen (idea Hormozi)

La filosofía: **un margen grande no es para "ganar más por venta", es munición para hacer ofertas que el competidor no puede igualar.** Si el COGS es bajo, LIVIANO puede ofrecer garantías agresivas, primer mes con descuento, bundles, o más servicio clínico — y aun así mantener LTGP:CAC ≥ 3:1. Palancas concretas para bajar COGS:

1. **Volumen / negociación con la farmacia o distribuidor** (precio por escala).
2. **Consolidación de proveedores** y contratos a término.
3. **Optimización de envío** (zonas, consolidación, empaque térmico más barato pero cumplido).
4. **Eficiencia clínica** (telemedicina asíncrona donde sea seguro y legal reduce el costo de la consulta por orden).
5. **Reducción de mermas** (cadena de frío + FEFO bajan el producto perdido).

> Cada dólar que baja el COGS *no se embolsa*: se reinvierte en oferta y adquisición para crecer más rápido que el competidor. Ese es el verdadero uso del margen.

## 4.4 Estructura de costos típica de una orden (ejemplo ilustrativo)

| Componente | % típico del precio | Notas |
|---|---|---|
| Producto (fármaco / API formulado) | 25–45% | La palanca #1; marca >> compounding |
| Dispensación / farmacia | 5–15% | Formulación, vial, etiquetado |
| Consulta médica (variable) | 5–15% | Asíncrona < síncrona en costo |
| Envío + empaque (cadena de frío) | 5–15% | Refrigerado encarece |
| Plataforma / pagos / software | 2–8% | EHR, e-prescribing, pasarela |
| **= COGS total** | **~45–70%** | Lo que define el margen bruto |
| **Margen bruto** | **~30–55%** | Antes de marketing/overhead |
| (−) CAC | variable | Sale del margen bruto |
| **= Contribución por cliente** | objetivo > 0 | El número-puente entre las dos fábricas |

*Los porcentajes son ilustrativos; LIVIANO debe llenarlos con sus números reales — esa hoja es el primer trabajo del área de Finanzas.*

---

# PARTE 5 — 15 DIRECTRICES ACCIONABLES PARA EL DUEÑO DE LIVIANO

**Organización**
1. **Nombra dos responsables, uno por fábrica.** Un dueño de la fábrica de demanda (Growth) y uno de la fábrica de entrega (Ops clínica + supply). Tú, dueño, gobiernas el tablero y asignas capital.
2. **Contrata en orden: Director Médico → Media buyer → Coord. Ops/CX → Editor de creativos.** Sin médico no hay negocio legal; sin media buyer no hay demanda.
3. **Aplica el RACI:** seguridad/legalidad la aprueba el médico; precio/proveedor/presupuesto los apruebas tú. Escríbelo y pégalo en la pared.
4. **Una métrica-puente visible para todos: margen de contribución por cliente.** Si es positivo y crece, ambas fábricas están sanas.

**Finanzas**
5. **Revisa el Tablero de 18 métricas cada semana**, con colores. Actúa sobre todo lo rojo *antes* de mirar lo verde.
6. **Persigue LTGP:CAC ≥ 3:1 (apunta a 6:1 por el toque clínico) y CAC payback < 6 meses.** Si el payback pasa de 12 meses, frena el escalado: tienes problema de caja.
7. **Vigila el runway: nunca bajes de 9 meses; objetivo 18–24.** Conoce tu net burn al céntimo.
8. **Distingue gasto bruto de net burn y cash flow de EBITDA.** Cobra por adelantado (planes) para que el cash flow trabaje a tu favor; no confundas "facturé" con "cobré y me quedó".
9. **Implementa la regla CFA:** diseña la oferta para que el margen bruto de los primeros 30 días supere 2×CAC + COGS. Eso te deja crecer sin levantar capital.
10. **Llena la hoja real de estructura de costos por orden (Parte 4.4).** Es el primer entregable de Finanzas y la base de todo pricing.

**Marketing / Creativos**
11. **Trata el creativo como tu palanca #1 de CAC.** Mete 3–5 conceptos nuevos por semana, aísla una variable por test, y ten un pipeline siempre lleno.
12. **Aplica kill/scale sin sentimentalismo:** mata CTR < 0.8%; escala ganadores +20–30% cada 48–72 h; mide CAC *por creativo*, no solo ROAS de plataforma.
13. **Decide presupuesto por CAC real (post-purchase survey + MER), no por el ROAS optimista de la plataforma.**

**Logística / Abastecimiento**
14. **No construyas el negocio sobre el compounding barato como cimiento.** Es ventaja temporal y regulatoriamente expuesta (FDA 2026). Ten un plan B de producto de marca/formulación cumplida y un abogado farmacéutico de cabecera.
15. **Protege la cadena de frío y la coordinación demanda↔supply.** Logging de temperatura, FEFO, y forecast de inventario atado al plan de ads: si Growth va a escalar, Supply debe tener stock y la operación capacidad — esa es la diferencia entre crecer y colapsar.

---

## Fuentes consultadas (verificación de fórmulas y benchmarks, 2025–2026)

- LTV:CAC y unit economics DTC/telesalud — finsi.ai, marginos.com, topgrowthmarketing.com, mhigrowthengine.com, charlesrkirkland.com, kruzeconsulting.com
- CAC payback por vertical — eightx.co, sarasanalytics.com, nine.am
- Márgenes, churn, burn/runway, Regla de 40, NRR/GRR — venasolutions.com, gsquaredcfo.com, lucid.now, founderpath.com, kayako.com, crv.com, saasmetricsboard.com
- Ads (ROAS/CPM/CPC/CTR/CPL/CPA) — triplewhale.com, publift.com, thejonasagency.com, sovran.ai, epom.com
- Creative testing / hook rate / kill-scale — stackmatix.com, pilothouse.co, greatmarketing.ai, motionapp.com, bestever.ai
- Inventario / stockout / NPS — finaleinventory.com, shipbob.com, netsuite.com, onrampfunds.com
- Hormozi (LTV:CAC por toque, CFA, Grand Slam Offer) — shortform.com, stormy.ai
- Cadena de suministro y regulación GLP-1 compounding (503A/503B, FDA 2026) — fda.gov, frierlevitt.com, orrick.com, onhealthcare.tech, milliman.com
