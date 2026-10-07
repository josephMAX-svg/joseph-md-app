process.env.QUIET=1;
const { add, wd, f, fy } = require('./cal');
const m = require('./e_secundarios.js');
const { rc1, rc2, dc1, dc2, au } = m;
const all = rc1.concat(rc2);
const H = { M1: 3, 'C-2': 6, 'T-1': 7, 'C-6': 13, 'CR-1': 15, 'T-8': 26, 'X-1': 28, 'CR-8': 32, 'CR-9': 35, 'X-9': 45, R10: 47, R43: 94 };
console.log('\nOVERLAYS Research v6:', Object.entries(H).map(([k, d]) => k + ' d' + d + ' ' + f(all[d - 1])).join(' · '));
console.log('Research c2 d94 R43', fy(all[93]), '· d108', f(all[107]), '· d109', fy(all[108]));
// patrón semanal F4
const S='2027-05-03'; const pat={}; for(const s of rc2.filter(x=>x>=S&&x<'2027-05-30')) pat[wd(s)]='R'; for(const s of dc1.concat(dc2).filter(x=>x>=S&&x<'2027-05-30')) pat[wd(s)]=(pat[wd(s)]||'')+'D';
console.log('patrón F4 por día de semana (1=lun..6=sáb):', JSON.stringify(pat));
// MIR mant FIN 22-abr y extensión desde vie 23-abr
const skip=new Set(['2026-12-25','2026-12-31','2027-01-01','2027-03-25','2027-03-26']); const prot=new Set(['2027-03-12','2027-03-15','2027-09-25','2027-09-27']);
const plan=(s)=>{const w=wd(s);if(w===0)return false;if(w===6&&s<S)return false;return !skip.has(s)&&!prot.has(s)};
const mm=[];for(let c='2027-01-28';c<='2027-04-22';c=add(c,1))if(plan(c))mm.push(c);
console.log('MIR mant (FIN 22-abr):',mm.length,'filas · lun-jue',mm.filter(s=>wd(s)<=4).length,'· viernes',mm.filter(s=>wd(s)===5).length);
const ext=[];for(let c='2027-04-23';c<'2027-09-27';c=add(c,1))if(plan(c))ext.push(c);
console.log('MIR ext:',f(ext[0]),'→',fy(ext.at(-1)),ext.length,'filas · F3',ext.filter(s=>s<S).length,'· F4',ext.filter(s=>s>=S).length,'· lun-jue',ext.filter(s=>wd(s)>=1&&wd(s)<=4).length,'· viernes',ext.filter(s=>wd(s)===5).length,'· sábados',ext.filter(s=>wd(s)===6).length,'· semanas (lun) ',new Set(ext.map(s=>add(s,1-wd(s)))).size);
// variantes de examen
// r2 (crítica): ritual = ÚLTIMO DÍA DE PLAN anterior a E−1 (no E−2: con examen en martes E−2 es domingo y el ritual es el sábado)
const ritualDe=(E)=>{let x=add(E,-2);while(wd(x)===0||skip.has(x))x=add(x,-1);return x;};
for(const E of ['2027-08-31','2027-09-27','2027-10-25']){const p2=new Set(['2027-03-12','2027-03-15',ritualDe(E),add(E,-1),E]);const e2=[];for(let c='2027-04-23';c<E;c=add(c,1)){const w=wd(c);if(w===0||(w===6&&c<S)||skip.has(c)||p2.has(c))continue;e2.push(c)}console.log('MIR ext examen',fy(E),'(ritual',f(ritualDe(E))+'):',f(e2[0]),'→',fy(e2.at(-1)),e2.length,'filas')}
