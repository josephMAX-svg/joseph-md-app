/**
 * remap_inicio.js — corre las fechas de arranque de los planes NO-ENCAPS a una fecha dada.
 *
 * v5.10b (13-sep-2026, integración segunda capa): Research ya NO se re-fecha con slots() — el bloque 4 delega en
 * gen_research_plan.js (conoce la pausa 15-ene→10-feb en v5.18-v5.20 —v5.17: 13-ene→8-feb—, RESEARCH_HITOS, DAILY_META.finNucleo/pausa, los chips con fecha y
 * el ciclo 2) y comprueba los invariantes antes y después (42 átomos · d41 ≥ 2027-02-01 · hitos ciclo 1 ⊂ DIAS) +
 * gen_research_calendar.js --check (overlays 🔬). Derma pasa a 73 slots (70 + 3 segundas pasadas parciales del taper
 * Step 1 d44-d49) y el bloque 5b regenera el ciclo 2 (gen_derma_ciclo2.js). USMLE avisa si el plan termina después de
 * DAILY_META.examenTarget; MIR avisa si D78 pisa el arranque del mantenimiento (mirMantenimiento.ts).
 *
 * Sustituye a la familia one-shot remap_inicio_<dia>.js (15-jun … 2-jul), que era copy-paste
 * byte-idéntico salvo la fecha incrustada ~7 veces. Ahora la fecha es UN solo parámetro.
 *
 *   Uso:  node DATA/_scripts/remap_inicio.js 2026-07-02
 *         node DATA/_scripts/remap_inicio.js            (usa START por defecto abajo)
 *         node DATA/_scripts/remap_inicio.js 2026-10-12 --usmle-aparte   (v6.01: todos los bloques; la aserción USMLE avisa en vez de abortar)
 *         node DATA/_scripts/remap_inicio.js 2026-10-07 --bloques derma[,research,mir,business,liviano]   (v6.00: solo esos bloques;
 *                                                       sin --bloques corre todos los que quedan, como antes)
 *
 * v6.00 (6-oct-2026 · V6_ESPEC §E/§H r2 · lote 1B): se ELIMINAN los bloques 1 (re-fechaba usmleStep1Daily.ts con calNoWeekend(START, 95))
 * y 3 (usmleStep1Plan.ts UNIDADES) y la exigencia USMLE == 95: pisarían la salida de gen_usmle_v5.js (tramo 1 D1-D60 + tramo 2 T1-T158,
 * fuente única del USMLE desde la v6) → solo queda una ASERCIÓN de solo lectura (DIAS[0].fecha === START). Las constantes SKIP / DÍAS
 * PROTEGIDOS / inicio del SERUMS salen de DATA/_scripts/_fechas_v6.json (vía gen_fechas_v6.js; se eliminan los protegidos v5.20 22-feb /
 * 9-mar / 10-mar). PARIDAD F4 (DJ-3): Research↔Derma cuenta L-V hasta el día anterior a serums.inicio y L-S desde entonces → Derma lun ·
 * mié · vie, Research mar · jue · sáb; domingo descanso. El bloque Derma re-fecha d1-d73 y fija DERMA_DAILY_META.taperStep1 (d44-d49)
 * = «alivio F2 (antes taper Step 1)» con las fechas que salgan; después corre gen_derma_ciclo2.js (bloque 5b, mismas reglas).
 *
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct, Joseph: «todo empieza el lunes 12»; no se estudió mié 7, jue 8 ni vie 9-oct):
 * el pipeline corre con START = 2026-10-12 y TODOS los bloques (mir · research · derma · business · liviano). Nueva opción
 * --usmle-aparte: el USMLE lo regenera OTRO lote en paralelo (gen_usmle_v5.js / gen_tramo2.js --pendientes-f1), así que la aserción de
 * solo lectura DIAS[0].fecha === START pasa a AVISO (sin la opción sigue abortando, como en v6.00); al cerrar ambos lotes se vuelve a
 * correr sin ella para comprobarla. Paridad Research↔Derma con D1 lunes: el lun 12-oct es día-Research (d1 Research lun 12-oct · d1
 * Derma mar 13-oct): Research pierde 1 ranura (jue 8-oct) y Derma 2 (mié 7 y vie 9-oct); nada se recorta, todo corre y el fin se amplía.
 *
 * v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct, Joseph: «todo corre a partir del 19»; no se estudió lun 12 → vie 16-oct): mismo pipeline con
 * START = 2026-10-19 y TODOS los bloques (+ --usmle-aparte mientras el lote USMLE corre en paralelo). Paridad Research↔Derma: el lun 19-oct es
 * día-DERMA (d1 Derma lun 19-oct · d1 Research mar 20-oct): Research pierde 3 ranuras (lun 12, mié 14, vie 16-oct) → con 30 días-Research antes de
 * la pausa R6, R7 y X-1 también se desplazan tras ella (gen_research_plan.js); Derma pierde 2 (mar 13, jue 15-oct). MIR D78 lun 8-feb → el
 * mantenimiento conserva sus 57 filas mar 9-feb → mar 4-may (cruza 2 días el inicio del SERUMS) y la extensión (tope vie 24-sep) absorbe: 123 filas.
 * Qué hace: solo corre fechas (domingos LIBRES, parámetros intactos). Regex AÑO-AGNÓSTICO
 * (20\d\d-\d\d-\d\d) porque Derma son 70 slots ≈ 6.5 meses → cruza a 2027.
 * ENCAPS va aparte (Supabase: gen_encaps_mantenimiento_2027.js <fecha> → execute_sql, backup fechado automático).
 * SYNAPSE (hasta feb-2027) / VIBECODING (95 días = D# del Step 1) / AURUM van aparte (sus propios generadores, misma fecha).
 * USMLE: este script SOLO re-fecha; la fuente de verdad (hitos anclados por fecha, niveles, taper) es DATA/_scripts/usmle/gen_usmle_v5.js.
 */
const fs = require('fs'); const path = require('path');

// v6.00: --bloques <lista> (derma · research · mir · business · liviano); el valor de la opción no cuenta como posicional
const ARGS = process.argv.slice(2);
const iBloques = ARGS.indexOf('--bloques');
const BLOQUES_VALIDOS = ['derma', 'research', 'mir', 'business', 'liviano'];
const BLOQUES = iBloques >= 0 ? new Set(String(ARGS[iBloques + 1] || '').split(',').map((x) => x.trim()).filter(Boolean)) : null; // null = todos
if (BLOQUES) { if (!BLOQUES.size) throw new Error('--bloques sin valor (' + BLOQUES_VALIDOS.join(',') + ')'); for (const b of BLOQUES) if (!BLOQUES_VALIDOS.includes(b)) throw new Error('bloque desconocido: ' + b + ' (válidos: ' + BLOQUES_VALIDOS.join(', ') + ')'); }
const corre = (b) => !BLOQUES || BLOQUES.has(b);
// v6.01: --usmle-aparte → la aserción USMLE (solo lectura) avisa en vez de abortar (lote USMLE en paralelo; ver cabecera)
const USMLE_APARTE = ARGS.includes('--usmle-aparte');
const POS = ARGS.filter((a, i) => !a.startsWith('--') && !(iBloques >= 0 && i === iBloques + 1));
const START = POS[0] || '2026-07-02';           // ← única fuente de la fecha de arranque
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);

const ROOT = path.join(__dirname, '..', '..');
const WD = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const iso=d=>d.toISOString().slice(0,10); const fromISO=s=>new Date(s+'T12:00:00Z');
const addDays=(s,n)=>{const d=fromISO(s);d.setUTCDate(d.getUTCDate()+n);return iso(d);};
const wdOf=s=>WD[fromISO(s).getUTCDay()]; const isSun=s=>fromISO(s).getUTCDay()===0;
const isWeekend=s=>{const w=fromISO(s).getUTCDay();return w===0||w===6;};
// v5 (27-ago-2026): SÁBADOS Y DOMINGOS LIBRES en todos los planes + feriados fijos.
// v6.00 (6-oct-2026): SKIP, DÍAS PROTEGIDOS e inicio del SERUMS desde DATA/_scripts/_fechas_v6.json (fuente única; gen_fechas_v6.js aborta si
// el JSON no cuadra con sus derivaciones). SKIP v6 = 25-dic · 31-dic · 1-ene · jue 25 / vie 26-mar-2027. PROTEGIDOS v6 = vie 12-mar · sáb 13 ·
// dom 14-mar (ENCAPS PROVISIONAL) · lun 15-mar · sáb 25-sep (ritual) · dom 26-sep · lun 27-sep (EXAMEN Step 1); se eliminan los v5.20
// (lun 22-feb · mar 9-mar · mié 10-mar). Desde serums.inicio el SÁBADO es día de plan para los interdiarios (DJ-3).
// MISMA fuente en gen_research_plan · gen_derma_ciclo2 · remap_inicio (Derma) · gen_aurum_plan · gen_mir_mantenimiento.
const F6=require('./gen_fechas_v6').cargarFechasV6();
const SKIP_FIJOS=new Set(F6.skip); // (MIR diario 78 y LIVIANO 90 terminan antes de la Semana Santa: mismas fechas que con el SKIP v5.20)
const PROTEGIDOS=new Set(F6.protegidos.map((x)=>x.fecha)); // SOLO para los interdiarios (slots → Derma); MIR diario/Business/LIVIANO no se tocan
const SERUMS_INICIO=F6.serums.inicio; // v6.00: paridad L-S desde aquí (Derma lun · mié · vie · Research mar · jue · sáb)
function calNoSun(start,n){const o=[];let c=start;while(o.length<n){if(!isSun(c))o.push(c);c=addDays(c,1);}return o;} // legado (pre-v5)
function calNoWeekend(start,n){const o=[];let c=start;while(o.length<n){if(!isWeekend(c)&&!SKIP_FIJOS.has(c))o.push(c);c=addDays(c,1);}return o;}
// v6.00: paridad L-V antes del SERUMS y L-S desde serums.inicio (= researchData.ts#diaEstudioTipo); domingo siempre descanso.
function tipoDia(s){const d=fromISO(s),dow=d.getUTCDay();if(dow===0||(dow===6&&s<SERUMS_INICIO))return'descanso';let cnt=0,cur=fromISO('2026-06-10');while(cur<d){const wd=cur.getUTCDay();if((wd>=1&&wd<=5)||(wd===6&&iso(cur)>=SERUMS_INICIO))cnt++;cur.setUTCDate(cur.getUTCDate()+1);}return cnt%2===0?'research':'derma';}
function slots(t,start,n){const o=[];let c=start;while(o.length<n){if(tipoDia(c)===t&&!SKIP_FIJOS.has(c)&&!PROTEGIDOS.has(c))o.push(c);c=addDays(c,1);}return o;} // v5.4: los interdiarios también saltan SKIP_FIJOS
function replaceFechas(file,marker,nd){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(marker);if(i<0)throw new Error(file+': '+marker);const j=s.indexOf('];',i);let k=0;const seg=s.slice(i,j).replace(/(fecha:\s*["'])(20\d\d-\d\d-\d\d)(["'])/g,(_,a,_o,c)=>{if(k>=nd.length)throw new Error(file+': sobran');return a+nd[k++]+c;});if(k!==nd.length)throw new Error(file+`: esperaba ${nd.length} reemplazó ${k}`);fs.writeFileSync(p,s.slice(0,i)+seg+s.slice(j),'utf8');}
function countFechas(file,marker){const s=fs.readFileSync(path.join(ROOT,file),'utf8');const i=s.indexOf(marker);const j=s.indexOf('];',i);return[...s.slice(i,j).matchAll(/fecha:\s*["'](20\d\d-\d\d-\d\d)["']/g)].map(m=>m[1]);}
/** Actualiza inicio/fin (regex) dentro del bloque META que sigue al marcador. Año-agnóstico (Derma cruza a 2027). */
function setMeta(file,metaMarker,inicio,fin){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(metaMarker);if(i<0)throw new Error(file+': meta '+metaMarker);const end=s.indexOf('};',i);let reg=s.slice(i,end);reg=reg.replace(/inicio:\s*'20\d\d-\d\d-\d\d'/, `inicio: '${inicio}'`);if(fin)reg=reg.replace(/fin:\s*'20\d\d-\d\d-\d\d'/, `fin: '${fin}'`);s=s.slice(0,i)+reg+s.slice(end);fs.writeFileSync(p,s,'utf8');}

// 1) USMLE — v6.00 (6-oct-2026 · V6_ESPEC §E r2): ELIMINADO el re-fechado (calNoWeekend(START, 95) sobre usmleStep1Daily.ts) y la exigencia
//    USMLE == 95: la fuente única del USMLE es DATA/_scripts/usmle/gen_usmle_v5.js + assemble_usmle_ts.js (tramo 1 D1-D60 + tramo 2 T1-T158,
//    lee _fechas_v6.json). Aquí solo queda una ASERCIÓN de SOLO LECTURA: el primer día del plan (DIAS[0].fecha) debe ser START.
{const f='src/lib/usmleStep1Daily.ts';let src='';try{src=fs.readFileSync(path.join(ROOT,f),'utf8');}catch{}
 const m=src.match(/export const DIAS\b[^=\n]*=\s*\[[\s\S]*?fecha:\s*["'](20\d\d-\d\d-\d\d)["']/);
 if(!m)console.warn('⚠ USMLE: no encuentro DIAS[0].fecha en '+f+' (aserción de solo lectura omitida)');
 else if(m[1]!==START){const msg='USMLE: DIAS[0].fecha = '+m[1]+' ≠ START '+START+' → el USMLE se regenera con gen_usmle_v5.js (v6: remap ya no lo re-fecha)';
  if(USMLE_APARTE)console.warn('⚠ '+msg+' · v6.01 --usmle-aparte: el lote USMLE corre en paralelo → re-correr remap sin la opción al cerrarlo');else throw new Error(msg);}
 else console.log('USMLE (solo lectura) ✓ DIAS[0].fecha = '+START+' · el USMLE NO se re-fecha aquí desde la v6.00');}
// 2) MIR (78)
if(corre('mir')){const f='src/lib/mirDailyPlan.ts';if(countFechas(f,'export const MIR_DIAS').length!==78)throw new Error('MIR!=78');const nd=calNoWeekend(START,78);replaceFechas(f,'export const MIR_DIAS',nd);setMeta(f,'export const MIR_DAILY_META',START,nd[77]);console.log('MIR ✓ '+nd[0]+'→'+nd[77]);
 // v5.10b: el mantenimiento (mirMantenimiento.ts, generado) arranca el día hábil siguiente a D78; si D78 lo pisa, regenerar con otra fecha de inicio.
 try{const mm=fs.readFileSync(path.join(ROOT,'src/lib/mirMantenimiento.ts'),'utf8');const ini=(mm.match(/gen_mir_mantenimiento\.js (20\d\d-\d\d-\d\d) (20\d\d-\d\d-\d\d)/)||[])[1];
  if(ini&&nd[77]>=ini)console.warn('⚠ MIR: D78 ('+nd[77]+') pisa el mantenimiento (inicio '+ini+') → node DATA/_scripts/gen_mir_mantenimiento.js <primer hábil > D78> <57.º día de plan desde ese inicio> (v6.02: el mantenimiento CONSERVA sus 57 filas —2027-02-09 → 2027-05-04— y la extensión, --ext-hasta = default del _fechas_v6.json, absorbe la diferencia (123 filas) · v6.01: 2027-02-02 → 2027-04-27 · v6.00: fin fijo 2027-04-22)');}catch{}}
// 3) USMLE plan UNIDADES — v6.00: ELIMINADO (usmleStep1Plan.ts lo regenera update_diainicio.js en el lote USMLE; ningún fichero de src/ lo importa).
// 4) Research (42) — v5.10b: el re-fechado lo hace gen_research_plan.js (conoce la pausa 15-ene→10-feb en v5.18-v5.20 —v5.17: 13-ene→8-feb—, RESEARCH_HITOS, DAILY_META.finNucleo/pausa,
//    los chips con fecha —chipsDyn— y el ciclo 2 researchDailyPlan2027.ts; slots() NO sabe de la pausa). remap solo comprueba el invariante antes y después.
if(corre('research')){const f='src/lib/researchDailyPlan.ts';if(countFechas(f,'export const DIAS').length!==42)throw new Error('RES!=42');
 require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_research_plan.js'))+' '+START,{stdio:'inherit'});
 const nd=countFechas(f,'export const DIAS');if(nd.length!==42)throw new Error('RES!=42 tras gen_research_plan');
 if(nd[40]<'2027-02-01')throw new Error('Research: d41 ('+nd[40]+') debe caer tras la pausa de átomos 15-ene → 10-feb (>= 2027-02-01)');
 const src=fs.readFileSync(path.join(ROOT,f),'utf8');const hitos=[...src.matchAll(/'([\w-]+)': \{ code: '[^']+', fecha: '(20\d\d-\d\d-\d\d)', ciclo: 1, d: (\d+) \}/g)];
 if(!hitos.length)throw new Error('Research: RESEARCH_HITOS ciclo 1 no encontrado (¿cambió el formato del generador?)');
 for(const [,k,fecha,d] of hitos){if(nd[Number(d)-1]!==fecha)throw new Error('RESEARCH_HITOS['+k+'] ('+fecha+') no coincide con DIAS d'+d+' ('+nd[Number(d)-1]+')');}
 console.log('Research ✓ (gen_research_plan.js) '+nd[0]+'→'+nd[41]+' · hitos ciclo 1 coherentes: '+hitos.length);
 try{require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_research_calendar.js'))+' --check',{stdio:'inherit'});}
 catch{console.warn('⚠ overlays 🔬 RESEARCH desfasados → node DATA/_scripts/gen_research_calendar.js y update_event (o delete+create) de los `recrear` con su payload, luego --set hito=eventId');}}
// 5) Derma (73 · v3 taper 12-sep: 70 + 3 segundas pasadas parciales) — slots derma (alterna con Research, ancla 10-jun → 25-jun = derma)
if(corre('derma')){const f='src/lib/dermaDailyPlan.ts';if(countFechas(f,'DERMA_DIAS: DiaDerma[] = [').length!==73)throw new Error('DERMA!=73 (v3 taper)');const nd=slots('derma',START,73);replaceFechas(f,'DERMA_DIAS: DiaDerma[] = [',nd);setMeta(f,'export const DERMA_DAILY_META',nd[0],nd[72]);console.log('Derma ✓ '+nd[0]+'→'+nd[72]+' (73 d · v6.00: skip/protegidos de _fechas_v6.json + paridad L-S desde el SERUMS → lun · mié · vie) · después: node DATA/_scripts/gen_derma_ciclo2.js');
 // v6.00 (6-oct-2026 · V6_ESPEC §E): ya no hay examen Step 1 en febrero → el taper POSICIONAL d44-d49 pasa a «alivio F2 (antes taper Step 1)»
 // (mismo contenido: 1 caso + FSRS + 0 lectura nueva) y DERMA_DAILY_META.taperStep1 se FIJA aquí con las fechas reales de d44-d49 + motivo
 // (v6: lun 8-feb → lun 22-feb). v5.10b-v5.20 solo avisaba si d44-d49 se salían de la ventana NBME 31 → examen.
 {const pth=path.join(ROOT,f);let dm=fs.readFileSync(pth,'utf8');const k=dm.indexOf('export const DERMA_DAILY_META');const re=/taperStep1:\s*\{[^}]*\}/;
  if(k<0||!re.test(dm.slice(k)))throw new Error('Derma: DERMA_DAILY_META.taperStep1 no encontrado');
  dm=dm.slice(0,k)+dm.slice(k).replace(re,`taperStep1: { desdeD: 44, hastaD: 49, desde: '${nd[43]}', hasta: '${nd[48]}', motivo: 'alivio F2 (antes taper Step 1)' }`);fs.writeFileSync(pth,dm,'utf8');
  console.log('Derma ✓ taperStep1 = «alivio F2 (antes taper Step 1)» d44 '+nd[43]+' → d49 '+nd[48]);}}
// 5b) Derma CICLO 2 (d74-d103, src/lib/dermaCiclo2.ts) — GENERADO: arranca en el primer día-Derma tras DERMA_DAILY_META.fin y verifica 0 solapes con Research (ambos ciclos)
if(corre('derma')){try{require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_derma_ciclo2.js')),{stdio:'inherit'});}
catch{console.warn('⚠ gen_derma_ciclo2.js falló (paridad/feriados/solape con Research): dermaCiclo2.ts puede estar DESFASADO → revisar y correr a mano node DATA/_scripts/gen_derma_ciclo2.js');}}
// 6) Business — v5.10b (13-sep): delega en gen_business_plan.py <START> (fuente única DATA/BUSINESS/plan_pulso_v3_L.json; sáb/dom Y feriados fijos como DESCANSO
//    → 84 trabajo + 37 descansos = 121 con START=2026-09-14 (v5.12: START=2026-09-16 · v5.13: 2026-09-17 · v5.14: 2026-09-21 · v5.15: 2026-09-23 · v5.16: 2026-09-28 · v5.17: 2026-10-01 · v5.18: 2026-10-05 · v5.19: 2026-10-06 · v5.20 = v6.00: 2026-10-07 · v6.01: 2026-10-12 → mar 9-feb-2027 · v6.02: 2026-10-19 → mar 16-feb-2027); antes el remap reconstruía SIN SKIP_FIJOS y dejaba 116 filas ≠ generador). Fallback JS alineado si no hay python.
if(corre('business')){const f='src/lib/businessStudyPlan.ts';const p=path.join(ROOT,f);let viaPy=false;
 for(const py of ['python','py -3','python3']){try{require('child_process').execSync(py+' '+JSON.stringify(path.join(__dirname,'gen_business_plan.py'))+' '+START,{stdio:'inherit'});viaPy=true;break;}catch{}}
 if(!viaPy){console.warn('⚠ Business: python no disponible → reconstrucción JS alineada con gen_business_plan.py (feriados SKIP_FIJOS como DESCANSO, modo:"DESCANSO")');
  let s=fs.readFileSync(p,'utf8');const marker='export const BIZ_DIAS: DiaBiz[] = [';const i=s.indexOf(marker);const bs=i+marker.length;const j=s.indexOf('];',bs);const parts=s.slice(bs,j).split('},{').map((pp,idx,arr)=>{let e=pp;if(idx>0)e='{'+e;if(idx<arr.length-1)e=e+'}';return e.trim();});const work=parts.filter(e=>!/materia:"DESCANSO"/.test(e));if(work.length!==84)throw new Error('BIZ work='+work.length);
  const out=[];let cur=START,wi=0,d=1;while(wi<work.length){if(isWeekend(cur))out.push(`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (fin de semana). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null,modo:"DESCANSO"}`);else if(SKIP_FIJOS.has(cur))out.push(`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",materia:"DESCANSO",lectura:"FERIADO (${cur}): día libre. Sin lectura ni output.",accion:"",min:0,libroN:null,yt:null,modo:"DESCANSO"}`);else out.push(work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/,`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`));d++;cur=addDays(cur,1);}
  const total=out.length,fin=out[out.length-1].match(/fecha:"([^"]*)"/)[1];s=s.slice(0,bs)+out.join(',')+s.slice(j);const bizMetaRe=/inicio: '20\d\d-\d\d-\d\d', fin: '[^']*', totalDias: \d+, \/\/[^\n]*/;if(!bizMetaRe.test(s))throw new Error('Business: no encontré la línea META (inicio/fin/totalDias // …)');s=s.replace(bizMetaRe,`inicio: '${START}', fin: '${fin}', totalDias: ${total}, // generado START=${START} · SÁB y DOM LIBRES + feriados fijos fuera · 84 trabajo + ${total-84} descansos`);fs.writeFileSync(p,s,'utf8');}
 const s2=fs.readFileSync(p,'utf8');const m=s2.match(/inicio: '(20\d\d-\d\d-\d\d)', fin: '(20\d\d-\d\d-\d\d)', totalDias: (\d+)/);if(!m||m[1]!==START)throw new Error('Business: META no re-fechada a '+START);const nWork=(s2.match(/materia:"(?!DESCANSO")/g)||[]).length;if(nWork!==84)throw new Error('Business work='+nWork);
 console.log('Business ✓ '+m[1]+'→'+m[2]+' total='+m[3]+' (84 trabajo · '+(viaPy?'gen_business_plan.py':'fallback JS')+')');}

// 7) LIVIANO Academia (90) — fecha + wd por fila (L-V, feriados fuera)
if(corre('liviano')){const f='src/lib/livianoStudyPlan.ts';const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const marker='LIV_DIAS: DiaLiviano[] = [';const i=s.indexOf(marker);if(i<0)throw new Error('LIVIANO: marker');const j=s.indexOf('];',i);const nd=calNoWeekend(START,90);let k=0;const seg=s.slice(i,j).replace(/("?)fecha\1:\s*"20\d\d-\d\d-\d\d",\s*("?)wd\2:\s*"[^"]*"/g,(_m,q1,q2)=>{if(k>=nd.length)throw new Error('LIVIANO: sobran');const fch=nd[k++];return `${q1}fecha${q1}:"${fch}",${q2}wd${q2}:"${wdOf(fch)}"`;});if(k!==nd.length)throw new Error(`LIVIANO: esperaba ${nd.length} reemplazó ${k}`);s=s.slice(0,i)+seg+s.slice(j);s=s.replace(/inicio: '20\d\d-\d\d-\d\d', fin: '20\d\d-\d\d-\d\d', totalDias: 90/,`inicio: '${nd[0]}', fin: '${nd[89]}', totalDias: 90`);fs.writeFileSync(p,s,'utf8');console.log('LIVIANO ✓ '+nd[0]+'→'+nd[89]);}

// 7b) LIVIANO — invariante "caso clínico en VIERNES" (el remap fila a fila la rompe si START no es lunes)
if(corre('liviano'))require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'liviano_reslot_viernes.js')),{stdio:'inherit'});

console.log('\nOK — remap START='+START+' · bloques: '+(BLOQUES?[...BLOQUES].join(','):'todos (MIR · Research vía gen_research_plan.js · Derma 73 + ciclo 2 · Business · LIVIANO + reslot)')+' · USMLE solo aserción de solo lectura (v6.00). Aparte, con la MISMA fecha y en este orden: gen_vibecoding_plan.js <fecha> ANTES que gen_synapse_plan.js <fecha> (hasta feb-2027) · gen_aurum_plan.js <fecha> · STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check (+ gen_mir_mantenimiento.js si D78 pisa el inicio del mantenimiento: jue 28-ene en v5.20 · v5.19: mié 27-ene · v5.18: mar 26-ene) · gen_encaps_mantenimiento_2027.js <fecha> → execute_sql (backup fechado, DELETE solo MANTENIMIENTO) · USMLE con gen_usmle_v5.js (hitos por fecha, sin recortar) · overlays 🔬 RESEARCH si --check avisó (gen_research_calendar.js) · docs + D# de los overlays del Calendar. El pool MIR (gen_mir_pool.js --emit) NO depende de fechas.');
