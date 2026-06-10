# VITALS v2 — guía de deploy (Vercel)

> Código: `VITALS/web` (Next.js 14 App Router). Build verificado sin errores el 10-jun-2026.
> El deploy viejo (`web-sigma-eight-92.vercel.app`, fuente: CRM Pulso) sigue vivo y NO se toca.

## Opción recomendada: proyecto Vercel NUEVO (p. ej. `vitals-pulso`)

1. **Crear el proyecto** — en [vercel.com/new](https://vercel.com/new), importa el repo
   `joseph-md-app` y configura:
   - **Root Directory:** `VITALS/web`
   - **Framework Preset:** Next.js (autodetectado)
   - Build/Install: por defecto (`next build` / `npm install`)

2. **Variables de entorno** (Settings → Environment Variables). Copia los VALORES desde
   `VITALS/web/.env.local` de esta máquina (ese fichero está gitignored — JAMÁS se commitea):

   | Variable | Para qué |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Base de datos (mv_*) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Acceso anon (RLS activo) |
   | `GEMINI_API_KEY` | Visión de comida/báscula + coach IA |

   (Opcional: `GEMINI_MODEL` si quieres otro modelo; por defecto usa gemini-2.0-flash.)

3. **Deploy** → copia la URL resultante (p. ej. `https://vitals-pulso.vercel.app`).

4. **Apuntar el dashboard**: en `D:\joseph-md-app\src\config.ts` cambia UNA línea:
   ```ts
   export const VITALS_URL = 'https://vitals-pulso.vercel.app';
   ```
   El iframe sigue siendo el mecanismo correcto (los `fetch('/api/...')` crudos de Next.js
   no sobreviven a un rewrite con basePath — ver comentario en config.ts).

5. Commit + push de `config.ts` → el deploy automático de joseph-md-app hace el resto.

## Verificación post-deploy (2 min)

- `/` abre con el entreno del día ya renderizado + score de hoy.
- `/ejercicio` un miércoles: la sesión de baile reproduce DENTRO de la app y encadena pistas.
- Registrar una serie por encima de tu histórico → banner ¡PR! con confeti.
- Consola del navegador sin errores.

## Notas

- La base Supabase es la MISMA que usa el deploy viejo (mismos datos, mismas RLS). Ambos
  deploys pueden convivir mientras pruebas.
- Los videos son embeds de YouTube (IDs verificados por oEmbed el 10-jun-2026). ToS: no
  cobrar por verlos, no gatearlos, no cachearlos, no superponer nada sobre el player.
