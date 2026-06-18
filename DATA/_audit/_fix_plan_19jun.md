# Plan de fixes — mantenimiento 19-jun (verificado por check_links + fetch real)

## Links MUERTOS confirmados (404/dead) → reemplazo robusto verificado (200)

### aurumData.ts (HAND-WRITTEN — editar directo)
- `https://www.youtube.com/@BrianTracySpeaker` (404, líneas 82 y 167) → **`https://www.youtube.com/@BrianTracyOfficial`** (200, replace_all)
- `https://commoncog.com/c/cases/how-mark-roberge-built-hubspots-sales-engine/` (404, líneas 152 y 193) → **`https://www.goodreads.com/book/show/22551047-the-sales-acceleration-formula`** (200) + cambiar tipo a 'libro' y nombre a "The Sales Acceleration Formula (Mark Roberge)"
- `https://www.afponline.org/.../chris-voss.../` (404, línea 185) → **`https://www.blackswanltd.com/`** (200) + tipo 'web', nombre "The Black Swan Group (Chris Voss)"

### DATA/AURUM/curricula/_curriculum_v2.json → regen gen_aurum_plan.js
- `https://fanaticalprospecting.com/origin-sales-gravy-video/` (404, ×3: d126/d128/d130) → **`https://www.salesgravy.com/`** (200, Jeb Blount) + material "Sales Gravy (Jeb Blount)"

### DATA/BIBLIOTECA/_aurum_biblioteca.json → regen gen_aurum_biblioteca.js
- $100M Offers audioSpotify `episode/6Z7lvct82rPpem99QZ9Gdy` (404) → **`https://open.spotify.com/search/100M%20Offers%20Alex%20Hormozi`**
- Vendes o vendes audioSpotify `episode/1wTuF3M8vUGkxgTt0mxcYu` (404) → **`https://open.spotify.com/search/Vendes%20o%20vendes%20Grant%20Cardone`**
- Vendes o vendes compraUrl `amazon.com/-/es/dp/6073128312` (404) → **`https://www.amazon.com/s?k=Vendes+o+vendes+Grant+Cardone`**

### DATA/BIBLIOTECA/_biblioteca_niveles.json → regen gen_biblioteca.js
Patrón: compraUrl dp/<asin> 404 → `https://www.amazon.com/s?k=<titulo+autor>` (siempre resuelve). audioSpotify episode 404 → `https://open.spotify.com/search/<query>`.
- n110 Hormone Repair Manual `dp/0648352064` → amazon search "Hormone Repair Manual Lara Briden"
- n112 Testosterone for Life `dp/0071596690` → amazon search "Testosterone for Life Morgentaler"
- n113 Hormone Intelligence `dp/0063030411` → amazon search "Hormone Intelligence Aviva Romm"
- n122 The Sleep Book `dp/1409157636` → amazon search "The Sleep Book Guy Meadows"
- n131 Emotional Intelligence audioSpotify `episode/7IE0l9UN970bpCHXb8ccJ1` (404) → spotify search "Emotional Intelligence Daniel Goleman" (compraUrl B0000647PF está OK)
- n141 Hyperfocus `dp/052552225X` → amazon search "Hyperfocus Chris Bailey"
- n149 Scattered Minds `dp/059350438X` → amazon search "Scattered Minds Gabor Mate"
- n156 Come Together `dp/0593500091` → amazon search "Come Together Emily Nagoski"

## NO son problemas (no tocar)
- localhost:3000/chat, /apex/manual (405), 192.168.1.2:3000 (ECONNREFUSED): endpoints runtime del server Apex, no links de navegador.
- qacynpqdrorpuegsmtcy.supabase.co (404 en root): base de la API Supabase, funciona.
- drive.google.com/file/d/${id (DEAD): template literal capturado por el regex (mirDriveResources.ts construye la URL con el id real). OK.
- kaggle.com/learn, portswigger.net/web-security(+/llm-attacks): re-verificado GET=200 (solo bloquean HEAD). OK.
- phrasebank.manchester.ac.uk (ECONNREFUSED): recurso académico real; rechaza IPs de datacenter. Válido en navegador.
- qxmedic-aulavirtual.com/evaluaciones: 200 pero redirige a la home del aula (no deep-link). Aceptable (abre la plataforma). Menor.

## Pendiente de los workflows
- wbdaz1xpc (audit funcional): hallazgos code/flow/responsive/integración a aplicar.
- wdagi8r66 (calidad élite): additions/drops para Synapse + AURUM + libros (con URLs verificadas).
