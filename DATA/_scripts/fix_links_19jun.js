// fix_links_19jun.js — reemplaza los 15 links MUERTOS (404, verificados por check_links.js)
// por URLs robustas verificadas (200). Opera sobre el TEXTO de cada archivo fuente (no parsea JSON)
// para no alterar formato. Tras correr esto: regenerar aurumDailyPlan / aurumBiblioteca / bibliotecaNiveles.
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

const R = [
  // [archivo, buscar, reemplazar]
  // aurumData.ts (hand-written)
  ['src/lib/aurumData.ts', 'https://www.youtube.com/@BrianTracySpeaker', 'https://www.youtube.com/@BrianTracyOfficial'],
  ['src/lib/aurumData.ts', 'https://commoncog.com/c/cases/how-mark-roberge-built-hubspots-sales-engine/', 'https://www.goodreads.com/book/show/22551047-the-sales-acceleration-formula'],
  ['src/lib/aurumData.ts', 'https://www.afponline.org/ideas-inspiration/discussions/afp-conversations-podcast/Details/chris-voss-ex-fbi-hostage-negotiator-explains-why-you-should-never-split-the-difference/', 'https://www.blackswanltd.com/'],
  // _curriculum_v2.json → regen gen_aurum_plan.js
  ['DATA/AURUM/curricula/_curriculum_v2.json', 'https://fanaticalprospecting.com/origin-sales-gravy-video/', 'https://www.salesgravy.com/'],
  ['DATA/AURUM/curricula/_curriculum_v2.json', 'The-Challenger-Sale-Taking-Control-of-the-Customer-Conversation (verificar)', 'The-Challenger-Sale-Taking-Control-of-the-Customer-Conversation'],
  // _aurum_biblioteca.json → regen gen_aurum_biblioteca.js
  ['DATA/BIBLIOTECA/_aurum_biblioteca.json', 'https://open.spotify.com/episode/6Z7lvct82rPpem99QZ9Gdy', 'https://open.spotify.com/search/100M%20Offers%20Alex%20Hormozi'],
  ['DATA/BIBLIOTECA/_aurum_biblioteca.json', 'https://open.spotify.com/episode/1wTuF3M8vUGkxgTt0mxcYu', 'https://open.spotify.com/search/Vendes%20o%20vendes%20Grant%20Cardone'],
  ['DATA/BIBLIOTECA/_aurum_biblioteca.json', 'https://www.amazon.com/-/es/dp/6073128312', 'https://www.amazon.com/s?k=Vendes+o+vendes+Grant+Cardone'],
  // _biblioteca_niveles.json → regen gen_biblioteca.js
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Hormone-Repair-Manual-Healthy-Hormones/dp/0648352064', 'https://www.amazon.com/s?k=Hormone+Repair+Manual+Lara+Briden'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Testosterone-Life-Recharge-Vitality-Overall/dp/0071596690', 'https://www.amazon.com/s?k=Testosterone+for+Life+Morgentaler'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Hormone-Intelligence-Complete-Restoring-Well-Being/dp/0063030411', 'https://www.amazon.com/s?k=Hormone+Intelligence+Aviva+Romm'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Sleep-Book-Well-Every-Night/dp/1409157636', 'https://www.amazon.com/s?k=The+Sleep+Book+Guy+Meadows'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://open.spotify.com/episode/7IE0l9UN970bpCHXb8ccJ1', 'https://open.spotify.com/search/Emotional%20Intelligence%20Daniel%20Goleman'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Hyperfocus-More-Productive-World-Distraction/dp/052552225X', 'https://www.amazon.com/s?k=Hyperfocus+Chris+Bailey'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Scattered-Minds-Origins-Attention-Disorder/dp/059350438X', 'https://www.amazon.com/s?k=Scattered+Minds+Gabor+Mate'],
  ['DATA/BIBLIOTECA/_biblioteca_niveles.json', 'https://www.amazon.com/Come-Together-Science-Creating-Connections/dp/0593500091', 'https://www.amazon.com/s?k=Come+Together+Emily+Nagoski'],
];

const cache = {};
let totalReps = 0, warns = 0;
for (const [f, find, repl] of R) {
  const p = path.join(ROOT, f);
  let s = cache[p] ?? fs.readFileSync(p, 'utf8');
  const n = s.split(find).length - 1;
  if (n === 0) { console.log('⚠  NO encontrado en', f, ':', find.slice(0, 60)); warns++; continue; }
  s = s.split(find).join(repl);
  cache[p] = s;
  totalReps += n;
  console.log(`✓ ${f}: ${n}× ${find.slice(8, 48)}… → ${repl.slice(8, 44)}…`);
}
for (const [p, s] of Object.entries(cache)) fs.writeFileSync(p, s, 'utf8');
console.log(`\nTotal reemplazos: ${totalReps} · warnings: ${warns} · archivos tocados: ${Object.keys(cache).length}`);
