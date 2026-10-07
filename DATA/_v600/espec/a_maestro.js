// a_maestro.js — §A calendario maestro v6 (fases, escenarios ENCAPS, días protegidos)
const { add, wd, f, fy, diff, FER, SKIP_V6, habLV, habLS, rango } = require('./cal');
const F1 = habLV('2026-10-07', '2026-12-31');
console.log('F1 sesiones', F1.length, f(F1[0]), '→', f(F1.at(-1)));
console.log('F1 feriados que SÍ son sesión:', F1.filter((s) => FER.has(s)).map(f).join(', '));
const hit = { 1: 'UWSA1', 10: 'NBME 25', 25: 'NBME 26', 40: 'NBME 27', 55: 'NBME 28' };
console.log('F1 hitos:', Object.entries(hit).map(([d, n]) => n + ' D' + d + ' ' + f(F1[d - 1])).join(' · '));
console.log('D57', f(F1[56]), 'D58', f(F1[57]), 'D59', f(F1[58]), 'D60', f(F1[59]));
console.log('gates D18', f(F1[17]), 'D38', f(F1[37]));
console.log('deloads lun 16-nov', f('2026-11-16'), 'lun 28-dic', f('2026-12-28'));
// ENCAPS: numeración `dia` L-V desde 7-oct saltando SKIP_V6
const diaENC = (s) => habLV('2026-10-07', s).length; // dia de la fecha s (si s es hábil)
console.log('dia ENCAPS 4-ene', diaENC('2027-01-04'), '· 16-feb', diaENC('2027-02-16'), '· 12-mar', diaENC('2027-03-12'));
const SERUMS = '2027-05-03';
const ESC = ['2027-03-14', '2027-03-21', '2027-04-04', '2027-04-11', '2027-04-18', '2027-04-25'];
console.log('\nESCENARIOS');
for (const ex of ESC) {
  const F2 = habLV('2027-01-04', add(ex, -1));
  const nucleo = habLV('2027-01-04', '2027-03-05');
  const cola = F2.slice(-5);
  const modDias = F2.length - nucleo.length - 5;
  const vie = F2.filter((s) => wd(s) === 5);
  const viePost = vie.filter((s) => s > '2027-01-08' && s < cola[0]);
  const ssDentro = ex > '2027-03-26';
  const rein = add(ex, 2); // martes siguiente (dom examen)
  const lunLibre = add(ex, 1);
  const F3 = habLV(rein, add(SERUMS, -1));
  const nbme29 = F3[1];
  const diaFin = diaENC(F2.at(-1));
  console.log(JSON.stringify({ examen: fy(ex), F2: F2.length, nucleo: nucleo.length, modulosDias: modDias, modulosSem: +(modDias / 5).toFixed(1), cola: f(cola[0]) + '→' + f(cola[4]), dress: f(cola[3]), d1: f(cola[4]), simsPostPretest: viePost.length + (ssDentro ? '(+1 mié 24-mar si SS)' : ''), conv: f(add(ex, -25)), lunLibre: f(lunLibre), reinicio: f(rein), F3: F3.length, nbme29: f(nbme29), diasSupabase: '61-' + diaFin, pausaSem: +(diff('2026-12-31', rein) / 7).toFixed(1) }));
  // semanas de módulo
  if (modDias > 0) { const mods = F2.slice(nucleo.length, F2.length - 5); console.log('   módulos:', mods.map(f).join(', ')); }
  if (ssDentro) { const vSS = '2027-03-26'; console.log('   SS: jue 25 y vie 26-mar sin sesión → SIM de esa semana el mié 24-mar'); }
}
// F4 días de plan L-S
for (const [E, lab] of [['2027-08-31', 'adelanto'], ['2027-09-27', 'base'], ['2027-10-25', 'plan B']]) {
  const ls = habLS(SERUMS, add(E, -1));
  const sab = ls.filter((s) => wd(s) === 6).length;
  const fer = ls.filter((s) => FER.has(s));
  console.log(`F4 (${lab} ${fy(E)}): ${ls.length} días L-S (sábados ${sab}) · feriados en días de plan: ${fer.map(f).join(', ')} · domingos libres ${rango(SERUMS, add(E, -1)).filter((s) => wd(s) === 0).length} · semanas ${(diff(SERUMS, E) / 7).toFixed(1)}`);
}
console.log('\n1-may', f('2027-05-01'), '· 3-may', f('2027-05-03'), '· sáb 25-sep', f('2027-09-25'), '· dom 26-sep', f('2027-09-26'), '· 27-sep', f('2027-09-27'), '· 28-sep', f('2027-09-28'));
console.log('transición', f('2026-12-31'), '→', f('2027-01-03'));
console.log('F3 base (14-mar):', habLV('2027-03-16', '2027-04-30').length, 'hábiles · SS dentro: 25/26-mar');
console.log('E-49 base', f(add('2027-09-27', -49)), '· E-46', f(add('2027-09-27', -46)), '· E-45', f(add('2027-09-27', -45)));
console.log('E-49 adelanto', f(add('2027-08-31', -49)), '· E-46', f(add('2027-08-31', -46)));
console.log('E-49 planB', f(add('2027-10-25', -49)), '· E-46', f(add('2027-10-25', -46)));
console.log('reserva abre ~6 meses antes de 27-sep:', f(add('2027-09-27', -183)), '· de 31-ago:', f(add('2027-08-31', -183)), '· de 25-oct:', f(add('2027-10-25', -183)));
