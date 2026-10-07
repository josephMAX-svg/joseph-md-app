const { add, f, rango } = require('./cal');
const { horasDia } = require('./b_horas');
for (const [E,lab] of [['2027-08-31','31-ago'],['2027-09-27','27-sep'],['2027-10-25','25-oct']]) {
  const g = add(E,-49);
  let hP=0,hM=0; for (const s of rango(g, add(E,-1))) { hP+=horasDia(s,'2027-01-01',E,'PISO'); hM+=horasDia(s,'2027-01-01',E,'M'); }
  console.log(lab,'GO/NO-GO',f(g),'· horas PISO de E-49 a D-1 =',hP.toFixed(0),'→ umbral horas reales acumuladas al E-49 (desde reinicio) ≥',Math.round(399-hP),'· (perfil M da',hM.toFixed(0),')');
  // checkpoints mensuales: requerido = 399 - PISO(desde checkpoint)
  for (const c of ['2027-05-31','2027-06-30','2027-07-31']) { if (c>=g) continue; let h=0; for (const s of rango(add(c,1), add(E,-1))) h+=horasDia(s,'2027-01-01',E,'PISO'); console.log('   checkpoint',f(c),'requiere acumulado ≥',Math.round(399-h)); }
}
