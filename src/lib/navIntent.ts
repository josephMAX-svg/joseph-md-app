/**
 * navIntent.ts — intención de navegación entre pantallas (Home → sub-vista de otra tab).
 * Módulo-singleton minúsculo: la pantalla destino lo consume al montar.
 */
let intent: string | null = null;
export const setNavIntent = (i: string) => { intent = i; };
export const consumeNavIntent = (): string | null => { const i = intent; intent = null; return i; };
