// cal.js — helpers de calendario v6 (UTC-noon, sin zonas horarias)
const D = (s) => new Date(s + 'T12:00:00Z');
const iso = (d) => d.toISOString().slice(0, 10);
const add = (s, n) => { const d = D(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const wd = (s) => D(s).getUTCDay();
const DN = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MN = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const f = (s) => s ? DN[wd(s)] + ' ' + (+s.slice(8)) + '-' + MN[+s.slice(5, 7) - 1] : '—';
const fy = (s) => s ? f(s) + '-' + s.slice(0, 4) : '—';
const diff = (a, b) => Math.round((D(b) - D(a)) / 864e5);
// Feriados nacionales Perú (gob.pe) 2026-2027 — propuesta §6
const FER = new Set([
  '2026-10-08', '2026-11-01', '2026-12-08', '2026-12-09', '2026-12-25',
  '2027-01-01', '2027-03-25', '2027-03-26', '2027-05-01', '2027-06-07', '2027-06-29', '2027-07-23', '2027-07-28', '2027-07-29',
  '2027-08-06', '2027-08-30', '2027-10-08', '2027-11-01', '2027-12-08', '2027-12-09', '2027-12-25',
]);
// Días SIN SESIÓN de ningún plan (v6): 25-dic, 31-dic, 1-ene, Jueves y Viernes Santo 2027
const SKIP_V6 = new Set(['2026-12-25', '2026-12-31', '2027-01-01', '2027-03-25', '2027-03-26']);
const SKIP_V520 = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
function rango(a, b) { const o = []; for (let s = a; s <= b; s = add(s, 1)) o.push(s); return o; }
// L-V hábiles sin skip
const habLV = (a, b, skip = SKIP_V6) => rango(a, b).filter((s) => wd(s) >= 1 && wd(s) <= 5 && !skip.has(s));
// L-S (F4)
const habLS = (a, b, skip = SKIP_V6) => rango(a, b).filter((s) => wd(s) >= 1 && wd(s) <= 6 && !skip.has(s));
const lunesDe = (s) => add(s, wd(s) === 0 ? -6 : 1 - wd(s));
module.exports = { D, iso, add, wd, f, fy, diff, FER, SKIP_V6, SKIP_V520, rango, habLV, habLS, lunesDe, DN };
