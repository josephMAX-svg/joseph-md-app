# HORMOZI · Metodología aplicada a Pulso Movimiento (retención)

> Estudio de Alex Hormozi (*$100M Offers*, *$100M Leads*, *$100M Money Models*, Gym Launch) y cómo lo
> insertamos en el producto para que **el paciente se quede** (retención / anti-churn). Coherente con la
> `LIVIANO_Oferta_Maestra.docx` (ya Hormozi: ancla cirugía bariátrica, trip-wire, stack de valor, garantía
> por proceso). Cada concepto → un **mecanismo de producto** + un **chunk de RAG** para el coach.

---

## 1. La Ecuación de Valor (el corazón de *$100M Offers*)

```
                 Dream Outcome  ×  Perceived Likelihood of Achievement
   Valor  =  ────────────────────────────────────────────────────────
                 Time Delay     ×  Effort & Sacrifice
```

Para maximizar el valor percibido: **sube** el resultado soñado y la probabilidad percibida de lograrlo;
**baja** el tiempo hasta el resultado y el esfuerzo/sacrificio. Si el tiempo y el esfuerzo tienden a cero,
el valor tiende a infinito.

**Cómo Pulso Movimiento sube/baja cada palanca (y se lo MOSTRAMOS al usuario):**
| Palanca | Qué hace la app |
|---|---|
| ⬆ **Dream Outcome** | El objetivo se enmarca como transformación (no "bajar 2 kg"): músculo, energía, salud, longevidad. La tendencia de peso + composición hace tangible el sueño. |
| ⬆ **Perceived Likelihood** | **Garantía por adherencia** (premia el proceso) + evidencia (fotos, PRs, gráficos) + base científica citada (Phillips, Schoenfeld…) + médico en el bucle. "Esto SÍ va a funcionar." |
| ⬇ **Time Delay** | **Front-loading**: resultado temprano visible en 2–4 semanas. "Primer logro" en el primer registro. Feedback inmediato de cada foto. |
| ⬇ **Effort & Sacrifice** | **Foto + voz**: el usuario casi no escribe. La IA mide. Cero formularios. "Una foto y listo." |

→ Producto: la página **/valor** muestra esta ecuación con TUS datos (es el ancla psicológica anti-churn).

## 2. Stack de Valor (precio ancla = cirugía bariátrica)

Hormozi: el precio se justifica apilando valor hasta que el precio parezca ridículo. La Oferta Maestra ya
ancla contra **cirugía bariátrica (S/ 15k–45k)**: "transformación médica real, sin bisturí, por una fracción".
Los **bonos = módulos de la app** con valor declarado (Cocina Liviana S/600, Movimiento 15 S/400, Escudo
Liviano S/500, Espejo InBody S/400, Defensa Muscular S/450…).

→ Producto: en **/valor**, "Lo que ya estás recibiendo" lista los módulos activos con su valor declarado,
sumando un total que **supera ampliamente** lo pagado. El usuario VE el valor cada vez que abre la app.

## 3. Garantía (invierte el riesgo)

Hormozi: la garantía agresiva quita el riesgo de comprar. Pulso usa una **garantía ética por adherencia**:
premia el **proceso** (lo que SÍ depende del paciente), no un resultado clínico. ≥90% → devolución parcial;
≥95% → total. Ya implementada (`/adherencia`). Hormozi-framing: "Si cumples tu parte, no pierdes nada."

## 4. Ascensión y Continuidad (Gym Launch — el motor de RETENCIÓN)

Hormozi/Gym Launch: el gimnasio promedio pierde ~10% de socios/mes. La solución es **ascensión**: al terminar
un reto (6 semanas), una **revisión de meta** transiciona al paciente a una **membresía de continuidad**.
"Get more customers, make them worth more, **keep them longer**."

→ Producto (lo construimos): **fases del programa como escalera de ascensión**:
1. **Front-load** (sem 1–4): resultado temprano → engancha.
2. **Sostenible** (sem 5–12): hábito.
3. **Mantenimiento / Anti-rebote** (continuidad): el bono "Blindaje Anti-Rebote". Al llegar a la meta, NO se
   "gradúa y se va": se le ofrece la fase de mantenimiento (continuidad). El coach hace la **revisión de meta**.

## 5. Primer logro rápido (onboarding — bajar Time Delay a casi 0)

Hormozi: maximizar el **valor temprano** reduce el churn temprano (el más letal). 

→ Producto: al primer registro (foto/voz/peso), la app celebra un **"primer logro"** inmediato y muestra el
siguiente paso. El usuario obtiene una victoria en el minuto 1.

## 6. Razones para quedarse > razones para irse (anti-churn diario)

Hormozi: la retención se gana entregando resultados y haciendo sentir el progreso. Palancas ya presentes que
encuadramos como anti-churn: **racha** (no romper la cadena), **próxima mejor acción** (un solo paso), **anillo
de adherencia** (progreso visible), **celebración de hitos**, **PRs**, **tendencia de peso**. El coach refuerza
con la lógica **80/20** (un día imperfecto sigue sumando → evita el abandono por perfeccionismo).

---

## 7. Mapa concepto → mecanismo (resumen de implementación)
| Hormozi | Mecanismo en Movimiento |
|---|---|
| Ecuación de Valor | Página **/valor** con tus datos (las 4 palancas) |
| Stack de valor | "Lo que ya estás recibiendo" (módulos + valor declarado vs lo pagado) |
| Garantía (riesgo invertido) | `/adherencia` (90/95) + framing "cumples tu parte, no pierdes" |
| Ascensión / continuidad | Fases del plan (front-load → sostenible → anti-rebote) + revisión de meta |
| Primer logro / valor temprano | Celebración de "primer logro" en el primer registro |
| Anti-churn diario | Racha, próxima acción, hitos, 80/20 (coach) |

> **Ética (no negociable):** Hormozi se usa para **retención por valor real entregado**, nunca para presión
> indebida sobre un paciente. La garantía premia proceso, no resultado clínico. El médico aprueba. Nada de
> falsa escasez en salud. El valor que mostramos es valor que de verdad recibe.

Fuentes: Alex Hormozi — *$100M Offers* (Ecuación de Valor, Grand Slam Offer, garantías), *$100M Leads*,
*$100M Money Models*, Gym Launch (ascensión, continuidad, retención). `LIVIANO_Oferta_Maestra.docx` (Pulso).
