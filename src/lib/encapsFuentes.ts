/**
 * encapsFuentes.ts — MATERIAL ENCAPS verificado EN VIVO (re-scrape 22-jun-2026, Chrome DevTools).
 * Todo el material con LINK DIRECTO (para no buscar). GENERADO por DATA/_scripts/gen_encaps_fuentes.js.
 * Cobertura 100% (meta ≥17/20): cada tema muestra sus fichas MINSA QX (ENCAPS_FICHAS_POR_TEMA) + video
 * de respaldo si QX no tiene (ENCAPS_VIDEO_RESPALDO); fichas/normativa → QX biblioteca + DR LOPEZ Normativas.
 */
export type FichaMinsa = { titulo: string; url: string; area: string };
export type FichaTema = { titulo: string; url: string; min: number };
export type FuenteLink = { n: string; url: string };
export type AcademiaRespaldo = { nombre: string; tag: string; url: string; carpetas: FuenteLink[] };

export const ENCAPS_FICHAS_MINSA: FichaMinsa[] = [
  {"titulo":"Alumbramiento","url":"https://www.dropbox.com/scl/fi/9z93qko2vsx1k8zzwoivq/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-38.-Alumbramiento.pdf?rlkey=ppvkm8hzmzqnuz5vr6ra50kqb&dl=0","area":"Cuidado Integral"},
  {"titulo":"Aspectos legales y forenses en medicina","url":"https://www.dropbox.com/scl/fi/9xi99u9w652p8ynzfal0w/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ASPECTOS-LEGALES-Y-FORENSES-EN-MEDICINA.pdf?rlkey=g6rpv8rvc35bh9shzx8f09lgc&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención centrada en la persona","url":"https://www.dropbox.com/scl/fi/lgewz3352amk4g0wwj0h1/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ATENCI-N-CENTRADA-EN-LA-PERSONA.pdf?rlkey=mraqcmumj90173u0nd9efqv5d&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención de la persona con el esquema regular de vacunación","url":"https://www.dropbox.com/scl/fi/ly00qq80wxqamsdtvhcm6/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-45.-Atenci-n-de-la-persona-con-el-esquema-regular-de-vacunaci-n.pdf?rlkey=jficxbnzicamavsx2xzs391vl&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención integral de las its","url":"https://www.dropbox.com/scl/fi/pg44pxsjzq99v4momhzwo/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-ATENCI-N-INTEGRAL-DE-LAS-ITS.pdf?rlkey=5wpjsz2ijax652ikw5evyph0r&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención médica en situaciones de emergencia, urgencia y referencia","url":"https://www.dropbox.com/scl/fi/0i887g0wbk4x4kze3mg4o/FT-CUIDADO-INTEGRAL-DE-SALUD-02.-Temas-espec-ficos-Atenci-n-m-dica-en-situaciones-de-emergencia-urgencia-y-referencia.pdf?rlkey=4utszfdi070xh9nddynml3thg&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención prenatal","url":"https://www.dropbox.com/scl/fi/kgw857s5w7fdqu9i9faaq/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-35.-Atenci-n-prenatal.pdf?rlkey=238nn5f404bpzmfpswcpjfy6g&dl=0","area":"Cuidado Integral"},
  {"titulo":"Atención primaria de salud (aps)","url":"https://www.dropbox.com/scl/fi/v0q5pgdspsl521jb20p05/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ATENCI-N-PRIMARIA-DE-SALUD-APS.pdf?rlkey=48exj3vguv5b19hauigx6jdp0&dl=0","area":"Cuidado Integral"},
  {"titulo":"Climaterio y menopausia","url":"https://www.dropbox.com/scl/fi/rapdhze4x9cm3mwj1787t/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-CLIMATERIO-Y-MENOPAUSIA.pdf?rlkey=n60cl3rzclmta51lafi1ixi3o&dl=0","area":"Cuidado Integral"},
  {"titulo":"Cuidados de la salud mental","url":"https://www.dropbox.com/scl/fi/x9kfrg9g7pnh0oxpzzcqz/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-02.-Cuidados-de-la-salud-mental.pdf?rlkey=9hjlup8ssk89rixo4mb3ossxr&dl=0","area":"Cuidado Integral"},
  {"titulo":"Detección temprana de cáncer infantil","url":"https://www.dropbox.com/scl/fi/dhclovhvq0ejp5918lb9p/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-05.-Detecci-n-temprana-de-c-ncer-infantil.pdf?rlkey=4wsi1824nyf0q82w5vrw0xh9k&dl=0","area":"Cuidado Integral"},
  {"titulo":"Diagnóstico del embarazo","url":"https://www.dropbox.com/scl/fi/o22abw50uijv0hipaa56y/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-33.-Diagn-stico-del-embarazo.pdf?rlkey=2fv6smvgiyvt2vyapuxfqaqgp&dl=0","area":"Cuidado Integral"},
  {"titulo":"Dilatación","url":"https://www.dropbox.com/scl/fi/1hwgtclr3o8swpmbu7k1w/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-36.-Dilataci-n.pdf?rlkey=ehf52lqq81k5almu8t0di30xs&dl=0","area":"Cuidado Integral"},
  {"titulo":"Esquema nacional de vacunación en perú","url":"https://www.dropbox.com/scl/fi/cj5t9sz7zxfb5ey8jx4zh/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-ESQUEMA-NACIONAL-DE-VACUNACI-N-EN-PER.pdf?rlkey=qujtcx6tb58l7brchsk735mqd&dl=0","area":"Cuidado Integral"},
  {"titulo":"Exámenes auxiliares y de apoyo al diagnóstico y tratamiento de problemas de salud","url":"https://www.dropbox.com/scl/fi/ogjlnrjdvd0gibr6sex4w/FT-CUIDADO-INTEGRAL-DE-SALUD-02.-Temas-espec-ficos-Ex-menes-auxiliares-y-de-apoyo-al-diagn-stico-y-tratamiento-de-problemas-de-salud.pdf?rlkey=jsrvgwir6m5lsmujck96t48i7&dl=0","area":"Cuidado Integral"},
  {"titulo":"Exposición a metales pesados y otras sustancias","url":"https://www.dropbox.com/scl/fi/0inof6q45jv4zcawj2dkx/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-04.-Exposici-n-a-metales-pesados-y-otras-sustancias.pdf?rlkey=7m8sn7jn6jzy1rt9x8phwyy7m&dl=0","area":"Cuidado Integral"},
  {"titulo":"Expulsivo","url":"https://www.dropbox.com/scl/fi/7dvrg7cll3qf9y5022x62/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-37.-Expulsivo.pdf?rlkey=ucfky6h0dch65pq7n44i1uy4i&dl=0","area":"Cuidado Integral"},
  {"titulo":"Infecciones asociadas a la atención de salud","url":"https://www.dropbox.com/scl/fi/jfqks1fbcz8bzh77zdqze/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-05.-Infecciones-asociadas-a-la-atenci-n-de-salud.pdf?rlkey=p3nqxpvgbw20ib5e35qcjjo14&dl=0","area":"Cuidado Integral"},
  {"titulo":"Intoxicaciones","url":"https://www.dropbox.com/scl/fi/s5m3gdz00e3i20wsn8mbw/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-INTOXICACIONES.pdf?rlkey=zbmhlb9vcmi1tgoqmzm3jzc41&dl=0","area":"Cuidado Integral"},
  {"titulo":"Manejo inicial de emergencias neonatales","url":"https://www.dropbox.com/scl/fi/t3oozmxga8pkys55v0use/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-46.-Manejo-inicial-de-emergencias-neonatales.pdf?rlkey=yaz9qki7ui5nsjl9kop5b75mj&dl=0","area":"Cuidado Integral"},
  {"titulo":"Manejo inicial de emergencias obstétricas","url":"https://www.dropbox.com/scl/fi/9u4vto8h5077s0x260sv8/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-39.-Manejo-inicial-de-emergencias-obst-tricas.pdf?rlkey=seodinayfjrwz8ynyvvdcdci7&dl=0","area":"Cuidado Integral"},
  {"titulo":"Mci - definición del modelo","url":"https://www.dropbox.com/scl/fi/5tpmdy3bz00xbtzn6iezm/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-02.-MCI-Definici-n-del-modelo.pdf?rlkey=r1ygsspwqf3p0p01lfzs37g6k&dl=0","area":"Cuidado Integral"},
  {"titulo":"Mci - política nacional multisectorial de salud al 2030","url":"https://www.dropbox.com/scl/fi/79vqr9wenn1vlc54wfui0/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-01.-MCI-Pol-tica-nacional-multisectorial-de-salud-al-2031.pdf?rlkey=tkq3p5w0uz0lulwj4djnmiswr&dl=0","area":"Cuidado Integral"},
  {"titulo":"Mci - prestación","url":"https://www.dropbox.com/scl/fi/1u1smnbd1i0djpgceauey/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-03.-MCI-Prestaci-n.pdf?rlkey=7sz3snta5aj7t69vczij8o3h8&dl=0","area":"Cuidado Integral"},
  {"titulo":"Medidas preventivas en salud bucal","url":"https://www.dropbox.com/scl/fi/99i112pzofj9bfcz4rskh/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-06.-Medidas-preventivas-en-salud-bucal.pdf?rlkey=wv1ifgzyxufjcawbg82v3saz1&dl=0","area":"Cuidado Integral"},
  {"titulo":"Nutrición en el embarazo","url":"https://www.dropbox.com/scl/fi/7w407qf0gsstljzcfyoww/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-34.-Nutrici-n-en-el-embarazo.pdf?rlkey=p65tpzjkk617ahpjrqwwdn8rz&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete básico de cuidado del binomio madre niño","url":"https://www.dropbox.com/scl/fi/j0mxgxn17mprbk6ynfeqr/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-42.-Paquete-b-sico-de-cuidado-del-binomio-madre-ni-o.pdf?rlkey=v91hig8gpcfg4r17o8ccln6y9&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete básico de cuidado para el adolescente","url":"https://www.dropbox.com/scl/fi/6z9f44jq97qb156mp1rp5/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-05.-Paquete-b-sico-de-cuidado-para-el-adolescente.pdf?rlkey=uhz86f5u5sncdv9029y4mhmf7&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete básico del cuidado integral del adulto","url":"https://www.dropbox.com/scl/fi/9bj29npeuf3la2qt4qad5/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-02.-Paquete-b-sico-del-cuidado-integral-del-adulto.pdf?rlkey=t4seumkof1dtcfsdsamx26lge&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete básico del cuidado integral del adulto mayor","url":"https://www.dropbox.com/scl/fi/24xs3pn06j7yaqd4uholb/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-03.-Paquete-b-sico-del-cuidado-integral-del-adulto-mayor.pdf?rlkey=m3owcqsxa14inoqtyp6zw61i7&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete básico del cuidado integral del joven","url":"https://www.dropbox.com/scl/fi/giexk6rvzmazjdj14z48y/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-01.-Paquete-b-sico-del-cuidado-integral-del-joven.pdf?rlkey=8amuo1kwlwaxcw201r8uda09d&dl=0","area":"Cuidado Integral"},
  {"titulo":"Paquete del cuidado integral de salud del niño - cred","url":"https://www.dropbox.com/scl/fi/ev24ezvb2ewp1iv6pfo30/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-CRED.pdf?rlkey=vo86a8uyuv81brghyqfro5raa&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención combinada del vih","url":"https://www.dropbox.com/scl/fi/288eqvdeolkslb9gbpczw/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-09.-Prevenci-n-combinada-del-VIH.pdf?rlkey=apdkba4blbw8xfsadzcf5fim6&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención de enfermedades transmisibles","url":"https://www.dropbox.com/scl/fi/07tgeu2gkzm3hzs16icda/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-41.-Prevenci-n-de-la-trasmisi-n-materno-infantil-del-VIH-s-filis-y-hepatitis-B.pdf?rlkey=o93bpk5efyb9ptd8e5jd6ax9a&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención de la transmisión materno infantil de vih, sífilis y vhb","url":"https://www.dropbox.com/scl/fi/90fmjgoxo27faz58y9jl3/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-Prevenci-n-de-transmisi-n-materno-infantil-de-VIH-s-filis-y-hepatitis-B.pdf?rlkey=t33f9q1mui21yoss8okpqe8oq&dl=0st=e2i5qkq4&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de anemia","url":"https://www.dropbox.com/scl/fi/qlzqwmp8xig4iegtl977i/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-08.-Prevenci-n-y-control-de-anemia.pdf?rlkey=yqqyo2e8t8majrgeo99fay2on&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de cáncer","url":"https://www.dropbox.com/scl/fi/omz47ijfuhe5jfrkpgp0r/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-C-NCER.pdf?rlkey=5v48k5yzahnb1vl7v9tw41web&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de dengue","url":"https://www.dropbox.com/scl/fi/luuxfip88szawxu9mfvak/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-DENGUE.pdf?rlkey=p6myx6yud0iszf18t0x2hfh3b&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de ecnt","url":"https://www.dropbox.com/scl/fi/pv2g7ow2bryey4obr91ay/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-ECNT.pdf?rlkey=9h85r71ybdj9ebwen5b3sjlf3&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de enfermedades raras y huérfanas","url":"https://www.dropbox.com/scl/fi/ltl8u7z28lmi38x4br8sl/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-01.-Prevenci-n-y-control-de-enfermedades-raras-y-hu-rfanas.pdf?rlkey=g1kgeig2b7kiaook92y55l8w1&dl=0","area":"Cuidado Integral"},
  {"titulo":"Prevención y control de la tuberculosis","url":"https://www.dropbox.com/scl/fi/69qsuv4jlg7yts7o6u5ep/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-07.-Prevenci-n-y-control-de-la-tuberculosis.pdf?rlkey=00vtnu0gbl32h0hzjw9s44us4&dl=0","area":"Cuidado Integral"},
  {"titulo":"Riesgo obstétrico","url":"https://www.dropbox.com/scl/fi/u3giqokh7yx8i3qda1rav/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-40.-Riesgo-obst-trico.pdf?rlkey=zmb6gtefxlgx89uscv5s0im4n&dl=0","area":"Cuidado Integral"},
  {"titulo":"Suplementación con vitamina a","url":"https://www.dropbox.com/scl/fi/gbzi0w3ule3qdbor30f7f/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-Suplementaci-n-con-vitamina-A.pdf?rlkey=2aw27i7vp3g9ny7jdyf41di80&dl=0","area":"Cuidado Integral"},
  {"titulo":"Vigilancia y manejo de zoonosis","url":"https://www.dropbox.com/scl/fi/fevia3c0phdru8mrwye09/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-VIGILANCIA-Y-MANEJO-DE-ZOONOSIS.pdf?rlkey=fbfghohz339n7xgl840fw80ff&dl=0","area":"Cuidado Integral"},
  {"titulo":"Acceso a la atención en salud de la población migrante","url":"https://www.dropbox.com/scl/fi/q03ij1hrjdh86ixexiys2/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-06.-Acceso-a-la-atenci-n-en-salud-de-la-poblaci-n-migrante.pdf?rlkey=jgnbqoejwt4yem4u3yof7rgqp&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Atención en salud con enfoque intercultural y pertinencia cultural","url":"https://www.dropbox.com/scl/fi/9fy99xm4371vthvz5le2a/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-05.-Atenci-n-en-salud-con-enfoque-intercultural-y-pertinencia-cultural.pdf?rlkey=efbnsw9f6q8fwtxko1hhzs5e7&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Código de ética y deóntologia profesional ética y bioética","url":"https://www.dropbox.com/scl/fi/dzd4o66gvrq88bps47i56/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-02.-C-digo-de-tica-y-de-ntologia-profesional.pdf?rlkey=qhclasrxnl8od59d7rcp8c35c&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Comunicación y diálogo intercultural en salud","url":"https://www.dropbox.com/scl/fi/16gm6z23ccj3027zn1kqi/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-02.-Comunicaci-n-y-di-logo-intercultural-en-salud.pdf?rlkey=sme0zr01pm1swgcbdititetfk&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Derechos deberes de las personas usuarias de los servicios de salud ética y bioética","url":"https://www.dropbox.com/scl/fi/s9j48ooayywz8axgh0dvq/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-04.-Derechos-deberes-de-las-personas-usuarias-de-los-servicios-de-salud.pdf?rlkey=drs31a8j4kk5j4vx6qukpee1t&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Diversidad cultural, promoción de la inclusión y la equidad","url":"https://www.dropbox.com/scl/fi/hhmf73duk7i1ci2esjt8d/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-04.-Diversidad-cultural-promoci-n-de-la-inclusi-n-y-la-equidad.pdf?rlkey=w5j3wf96for79awthq3lwfmfv&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"ética e integridad y ética en la función pública ética y bioética","url":"https://www.dropbox.com/scl/fi/fprigedotochv6wgayphm/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-03.-tica-e-integridad-y-tica-en-la-funci-n-p-blica.pdf?rlkey=i61zd3mttkcy75cbsez66javc&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Identidad cultural y autopercepción étnica","url":"https://www.dropbox.com/scl/fi/zrtfnynitlbu066imq0iw/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-03.-Identidad-cultural-y-autopercepci-n-tnica.pdf?rlkey=sxo6rxs7z002ev221ikq31sar&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Medicina tradicional, complementaria y alternativa","url":"https://www.dropbox.com/scl/fi/38k7v6x3lxn5d3z84nzus/FUNDAMENTOS-TE-RICOS-TICA-E-INTERCULTURALIDAD-1.-ATENCI-N-INTERCULTURAL-EN-SALUD-MEDICINA-TRADICIONAL-COMPLEMENTARIA-Y-ALTERNATIVA.pdf?rlkey=qnpmqlkvazlon4p4xvfsw5w34&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Prevención de la estigma y discriminación étnica, cultural, y en otras poblaciones clave y vulnerables","url":"https://www.dropbox.com/scl/fi/zg1duzyw0mlu9edusef0u/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-07.-Prevenci-n-de-la-estigma-y-discriminaci-n-tnica-cultural-y-en-otras-poblaciones-clave-y-vulnerables.pdf?rlkey=ri90ofxz6keaa0yai9ua70m9b&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Principios y fundamentos de la ética ética y bioética","url":"https://www.dropbox.com/scl/fi/b03tve6wnmt1o8q56o5i6/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-01.-Principios-y-fundamentos-de-la-tica.pdf?rlkey=1gg27wteq37w41jk42xd8l7sm&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Promoción del parto vertical","url":"https://www.dropbox.com/scl/fi/63hwgu8qmchw7mzw77au3/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-01.-Promoci-n-del-Parto-vertical.pdf?rlkey=l6pouc91v9ojtnae2xqt5oklj&dl=0","area":"Ética e Interculturalidad"},
  {"titulo":"Análisis estratégico institucional (foda) planificación y presupuesto en salud","url":"https://www.dropbox.com/scl/fi/y6tft6b0ehp73ywqj5dml/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-03.-An-lisis-estrat-gico-institucional-FODA.pdf?rlkey=ydw85rip3ky6enwh5ii3bnesb&dl=0","area":"Gestión de Servicios"},
  {"titulo":"Planeamiento a nivel institucional - pei planificación y presupuesto en salud","url":"https://www.dropbox.com/scl/fi/5tvgyl3n2i4nokeoj3pmy/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-01.-Planeamiento-a-nivel-institucional-PEI.pdf?rlkey=g21saqjuokgbvvtg9b931fraj&dl=0","area":"Gestión de Servicios"},
  {"titulo":"Planeamiento a nivel institucional - poi, evaluación del poi planificación y presupuesto en salud","url":"https://www.dropbox.com/scl/fi/peu0h2ov1elsacj1djteo/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-02.-Planeamiento-a-nivel-institucional-POI-evaluaci-n-del-POI.pdf?rlkey=infjbzyrf1v0zcqa4yrtk7lu3&dl=0","area":"Gestión de Servicios"},
  {"titulo":"Características estructurales del informe","url":"https://www.dropbox.com/scl/fi/klivoxv440tzu5ckn71ke/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-01.-Caracter-sticas-estructurales-del-informe.pdf?rlkey=hnrie6ivi70nonbs01wsqmoqy&dl=0","area":"Investigación"},
  {"titulo":"Conceptos básicos de investigación","url":"https://www.dropbox.com/scl/fi/jxzed29sayvy6b2dddsm4/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-01.-Conceptos-b-sicos-de-investigaci-n.pdf?rlkey=44uv1ywurazgxcxpasjbxcc7b&dl=0","area":"Investigación"},
  {"titulo":"Elaboración del proyecto de investigación","url":"https://www.dropbox.com/scl/fi/kvr1dmasowu0iw59nlqv0/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-02.-Elaboraci-n-del-proyecto-de-investigaci-n.pdf?rlkey=v073epqcai0cywxvnc8gtgbcg&dl=0","area":"Investigación"},
  {"titulo":"Enfoques y métodos de investigación","url":"https://www.dropbox.com/scl/fi/f9hjnqjgq13jlc7pvn0bg/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-02.-Enfoques-y-m-todos-de-investigaci-n.pdf?rlkey=cnnej6pnbi5whpvkkirg4u3rw&dl=0","area":"Investigación"},
  {"titulo":"Estudios analíticos experimentales","url":"https://www.dropbox.com/scl/fi/47aywopkckzk0wvttfnjl/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-05.-Estudios-anal-ticos-experimentales.pdf?rlkey=udz88ib7cghrudp27mify4fka&dl=0","area":"Investigación"},
  {"titulo":"Estudios analíticos observacionales","url":"https://www.dropbox.com/scl/fi/uji3k81s2ylsalk92ukbt/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-04.-Estudios-anal-ticos-observacionales.pdf?rlkey=5uczt9b3o0br4ch9wbi01fqew&dl=0","area":"Investigación"},
  {"titulo":"ética y aspectos éticos de las publicaciones científicas","url":"https://www.dropbox.com/scl/fi/9omryjt8ad5aqv57ba9w5/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-03.-tica-y-aspectos-ticos-de-las-publicaciones-cient-ficas.pdf?rlkey=axy4e9cl0uyzp9ba79lg5j0wv&dl=0","area":"Investigación"},
  {"titulo":"Instrumentos de recolección de datos y validación","url":"https://www.dropbox.com/scl/fi/ui7ybqg38qajyy4md0k9r/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-04.-Instrumentos-de-recolecci-n-de-datos-y-validaci-n.pdf?rlkey=wz4njxn3rgn24yud7d1tmyuz9&dl=0","area":"Investigación"},
  {"titulo":"Principales instrumentos de medición en primer nivel de atención","url":"https://www.dropbox.com/scl/fi/owz418y77q9s47vwtmvb2/FT-INVESTIGACI-N-2.-EJECUCI-N-DE-LA-INVESTIGACI-N-PRINCIPALES-INSTRUMENTOS-DE-MEDICI-N-EN-PRIMER-NIVEL-DE-ATENCI-N.pdf?rlkey=a3a0md8s7kx59n363zn4kgi8a&dl=0","area":"Investigación"},
  {"titulo":"Procesamiento y análisis de datos","url":"https://www.dropbox.com/scl/fi/7vnqi25pun2291tqwem4r/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-05.-Procesamiento-y-an-lisis-de-datos.pdf?rlkey=rt8t82et6nt6m2f0fr04izqa3&dl=0","area":"Investigación"},
  {"titulo":"Publicación científica","url":"https://www.dropbox.com/scl/fi/tv1cndbrrvw0jqv0ggwtp/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-Publicaci-n-cient-fica.pdf?rlkey=i6a2vibngobr8csib9rhfa728&dl=0","area":"Investigación"},
  {"titulo":"Requisitos metodológicos del informe","url":"https://www.dropbox.com/scl/fi/1gf1q8tafnb0l02dnoka0/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-02.-Requisitos-metodol-gicos-del-informe.pdf?rlkey=gdc3mws807vr9wxo7dehprh6h&dl=0","area":"Investigación"},
  {"titulo":"Tipos de investigación y estudios descriptivos","url":"https://www.dropbox.com/scl/fi/smhaf2unbtaypxaep8lb7/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-03.-Tipos-de-investigaci-n-y-estudios-descriptivos.pdf?rlkey=ubkn7sd5l376y43mj7a48c6t4&dl=0","area":"Investigación"},
  {"titulo":"Acceso a los servicios de salud salud comunitaria","url":"https://www.dropbox.com/scl/fi/i7uhpw3jnh5uvg55jbxx4/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Acceso-a-los-servicios-de-salud.pdf?rlkey=gngx77kvynlqbz0k548crnz0l&dl=0","area":"Salud Pública"},
  {"titulo":"Alimentación y nutrición salud comunitaria","url":"https://www.dropbox.com/scl/fi/3i5pt7ikgk30h1hmaqrnx/FT-SALUD-P-BLICA-01.-Salud-comunitaria-03.-Alimentaci-n-y-nutrici-n.pdf?rlkey=u42ykpq73lp6hgor7mhpce6qq&dl=0","area":"Salud Pública"},
  {"titulo":"Análisis situacional de salud - sala situacional de salud","url":"https://www.dropbox.com/scl/fi/l16kddjz71u2qx0c3e5vr/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-10.-An-lisis-situacional-de-salud-Sala-situacional-de-salud.pdf?rlkey=vhz79bzodtw4shk1pjix8wusn&dl=0","area":"Salud Pública"},
  {"titulo":"Bioseguridad","url":"https://www.dropbox.com/scl/fi/bgcn9etn6i6f3f4x6jgfm/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-05.-Bioseguridad.pdf?rlkey=gsyi6mgrnyarldz849ev4gamx&dl=0","area":"Salud Pública"},
  {"titulo":"Causalidad y riesgo","url":"https://www.dropbox.com/scl/fi/6dzjcwt73q514dcb1kn5h/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-22.-Causalidad-y-riesgo.pdf?rlkey=r0yc5gt2kodlt7pbjgt86ddw6&dl=0","area":"Salud Pública"},
  {"titulo":"Conceptos básicos de epidemiología","url":"https://www.dropbox.com/scl/fi/2ed4bf1yog880lqcw28g2/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Conceptos-b-sicos-de-epidemiolog-a.pdf?rlkey=tbrdhrwwv547virj37l18fv1v&dl=0","area":"Salud Pública"},
  {"titulo":"Conceptos básicos de salud pública","url":"https://www.dropbox.com/scl/fi/9r0taeihtlckimbwoi61r/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Conceptos-b-sicos-de-salud-p-blica.pdf?rlkey=3161a08v1lzpoxhj4qgwn78eu&dl=0","area":"Salud Pública"},
  {"titulo":"Control de vectores y plagas salud comunitaria","url":"https://www.dropbox.com/scl/fi/6atg071cy04iuopw3zr39/FT-SALUD-P-BLICA-01.-Salud-comunitaria-04.-Control-de-vectores-y-plagas.pdf?rlkey=vsaqidofghpwgg2v02p30tqid&dl=0","area":"Salud Pública"},
  {"titulo":"Demografía","url":"https://www.dropbox.com/scl/fi/gu2c33eaeox5t2hqls2ls/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-06.-Demograf-a.pdf?rlkey=ck34agf0cgqla0ufvy6a31fig&dl=0","area":"Salud Pública"},
  {"titulo":"Determinantes sociales - ambientales, biogenéticos y comerciales salud comunitaria","url":"https://www.dropbox.com/scl/fi/wmhsw1p5r5ozeeux1k222/FT-SALUD-P-BLICA-01.-Salud-comunitaria-01.-Determinantes-sociales-ambientales-biogen-ticos-y-comerciales.pdf?rlkey=m7ebcc8tc9r77v2nv7v70f4hu&dl=0","area":"Salud Pública"},
  {"titulo":"Endemias, epidemias y brotes","url":"https://www.dropbox.com/scl/fi/0otma3pbu1rjdfhsbemhf/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-05.-Endemias-epidemias-y-brotes.pdf?rlkey=jpjtunxncs7kl8ebua58njcfp&dl=0","area":"Salud Pública"},
  {"titulo":"Etapas y niveles de prevención","url":"https://www.dropbox.com/scl/fi/ntyrkpq6wmwcjs6wq6e1h/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-08.-Etapas-y-niveles-de-prevenci-n.pdf?rlkey=fx6rrzmzn0ip39mduqi8dypgf&dl=0","area":"Salud Pública"},
  {"titulo":"Funciones esenciales de la salud pública","url":"https://www.dropbox.com/scl/fi/tqyiaz9anyt8nwbsnw8zn/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-02.-Funciones-esenciales-de-la-salud-p-blica.pdf?rlkey=my0gf3dkcbylozls6q2prygsy&dl=0","area":"Salud Pública"},
  {"titulo":"Gestión del riesgo en situaciones de emergencias y desastres","url":"https://www.dropbox.com/scl/fi/astmrfz644jhvcmdcckam/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-06.-Gesti-n-del-riesgo-en-situaciones-de-emergencias-y-desastres.pdf?rlkey=zun09unfgqjfpewj8qz6eytbr&dl=0","area":"Salud Pública"},
  {"titulo":"Gestión y manejo de los residuos sólidos salud comunitaria","url":"https://www.dropbox.com/scl/fi/gpphkp8rpoe92tpl6t3s1/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-GESTI-N-Y-MANEJO-DE-LOS-RESIDUOS-S-LIDOS.pdf?rlkey=2lg20hflra40v82nq12831rai&dl=0","area":"Salud Pública"},
  {"titulo":"Historia natural del proceso salud enfermedad","url":"https://www.dropbox.com/scl/fi/dnw2e5rw43x6rpedjabk8/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-07.-Historia-natural-del-proceso-salud-enfermedad.pdf?rlkey=yxpvb7xi6n0fm6tq1fezxvzkq&dl=0","area":"Salud Pública"},
  {"titulo":"Información, educación y comunicación para la salud","url":"https://www.dropbox.com/scl/fi/j560ryw73k405pvgabgrz/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-04.-Informaci-n-educaci-n-y-comunicaci-n-para-la-salud.pdf?rlkey=nytctdssnrbmmhmf3lx695xzh&dl=0","area":"Salud Pública"},
  {"titulo":"Inocuidad alimentaria salud comunitaria","url":"https://www.dropbox.com/scl/fi/u5102qvfhl5355c80usml/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Inocuidad-alimentaria.pdf?rlkey=2uxg42qo5rz3zfcugqiz5dvv6&dl=0","area":"Salud Pública"},
  {"titulo":"Intervenciones comunitarias en salud salud comunitaria","url":"https://www.dropbox.com/scl/fi/85tis2rsx3v6zoanibgr1/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-INTERVENCIONES-COMUNITARIAS-EN-SALUD.pdf?rlkey=u9xb316x571qjjr0nynq7d5id&dl=0","area":"Salud Pública"},
  {"titulo":"Modelo de salud mental comunitaria salud comunitaria","url":"https://www.dropbox.com/scl/fi/4lqrmc0s810hdosrs0zf8/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-MODELO-DE-SALUD-MENTAL-COMUNITARIA.pdf?rlkey=wqh4s3rsbsqwmtutc8mi25sjp&dl=0","area":"Salud Pública"},
  {"titulo":"Participación social y comunitaria salud comunitaria","url":"https://www.dropbox.com/scl/fi/4518lic7c8pyxwbu21jub/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Participaci-n-social-y-comunitaria.pdf?rlkey=22irb0ruwcsfdafu4vjmk9uyj&dl=0","area":"Salud Pública"},
  {"titulo":"Plan de salud local salud comunitaria","url":"https://www.dropbox.com/scl/fi/5yeg3p73yt24k1lztksmo/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-PLAN-DE-SALUD-LOCAL.pdf?rlkey=l7i48ixwrrbk19kmikbu2grlz&dl=0","area":"Salud Pública"},
  {"titulo":"Prevención y control de infecciones","url":"https://www.dropbox.com/scl/fi/u9upg6yhgkgdfukjp9xns/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-09.-Prevenci-n-y-Control-de-infecciones.pdf?rlkey=91wkacnbtmm790aisgsg0upjj&dl=0","area":"Salud Pública"},
  {"titulo":"Promoción de la salud - lineamientos","url":"https://www.dropbox.com/scl/fi/ib0qzv4v2f0d3ep2c7hzz/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-02.-Promoci-n-de-la-salud-Lineamientos.pdf?rlkey=ie7wd55jhgc8xtdqr2a68lfkn&dl=0","area":"Salud Pública"},
  {"titulo":"Promoción de la salud y participación comunitaria","url":"https://www.dropbox.com/scl/fi/trf12qfhl6rmvlnuc57z6/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-01.-Promoci-n-de-la-salud-y-participaci-n-comunitaria.pdf?rlkey=p52jzn6pubusvk5ardc4x1b6i&dl=0","area":"Salud Pública"},
  {"titulo":"Protección específica de la salud","url":"https://www.dropbox.com/scl/fi/0svfwt93troe3vv1klexe/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-03.-Protecci-n-espec-fica-de-la-salud.pdf?rlkey=fisk1v3emvzrlbx3g8qiy91jm&dl=0","area":"Salud Pública"},
  {"titulo":"Pruebas diagnósticas","url":"https://www.dropbox.com/scl/fi/dm04gtry1eca2n3kk9yhw/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-23.-Pruebas-diagn-sticas.pdf?rlkey=tc9zapxidm2eiho9099j20lnr&dl=0","area":"Salud Pública"},
  {"titulo":"Salud ocupacional salud comunitaria","url":"https://www.dropbox.com/scl/fi/s7o4srpmb787hra43fwqd/FT-SALUD-P-BLICA-01.-Salud-comunitaria-06.-Salud-ocupacional.pdf?rlkey=i90m9dquu6u02w37qqu327d8t&dl=0","area":"Salud Pública"},
  {"titulo":"Sectorización y ficha familiar salud comunitaria","url":"https://www.dropbox.com/scl/fi/p5ko5n5o425y2l5lzp4k3/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-SECTORIZACI-N-Y-FICHA-FAMILIAR.pdf?rlkey=rqhkci4ggj88o06c40mjwau8f&dl=0","area":"Salud Pública"},
  {"titulo":"Sistemas de información y tic en salud salud comunitaria","url":"https://www.dropbox.com/scl/fi/crq3560lssclow85n1fpv/FT-SALUD-P-BLICA-01.-Salud-comunitaria-02.-Sistemas-de-informaci-n-y-TIC-en-salud.pdf?rlkey=5h6r6u7tmmxdgmrv40rsco8wh&dl=0","area":"Salud Pública"},
  {"titulo":"Uso racional de medicamentos","url":"https://www.dropbox.com/scl/fi/6ktn8dgciscugqyfdqp1o/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-11.-Uso-racional-de-medicamentos.pdf?rlkey=n39i8udwamuy0eyc0fi7yxxqh&dl=0","area":"Salud Pública"},
  {"titulo":"Vigilancia en salud pública","url":"https://www.dropbox.com/scl/fi/9x43tu5a6i98gv4vip2uy/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Vigilancia-en-salud-p-blica.pdf?rlkey=e88gpkfqoqo1ybv87gxfn4g87&dl=0","area":"Salud Pública"},
  {"titulo":"Vigilancia epidemiológica","url":"https://www.dropbox.com/scl/fi/bczhbb6wv9bgqya8cc2mh/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Vigilancia-epidemiol-gica.pdf?rlkey=6aysg9nko8amos4slsgmarn6d&dl=0","area":"Salud Pública"},
];

// 105 fichas MINSA mapeadas a cada tema (codigo) → "Material del tema" del plan diario, con tiempo.
export const ENCAPS_FICHAS_POR_TEMA: Record<string, FichaTema[]> = {
 "II-3": [
  {
   "titulo": "Atención de la persona con el esquema regular de vacunación",
   "url": "https://www.dropbox.com/scl/fi/ly00qq80wxqamsdtvhcm6/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-45.-Atenci-n-de-la-persona-con-el-esquema-regular-de-vacunaci-n.pdf?rlkey=jficxbnzicamavsx2xzs391vl&dl=0",
   "min": 10
  },
  {
   "titulo": "Esquema nacional de vacunación en perú",
   "url": "https://www.dropbox.com/scl/fi/cj5t9sz7zxfb5ey8jx4zh/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-ESQUEMA-NACIONAL-DE-VACUNACI-N-EN-PER.pdf?rlkey=qujtcx6tb58l7brchsk735mqd&dl=0",
   "min": 10
  }
 ],
 "II-1": [
  {
   "titulo": "Alumbramiento",
   "url": "https://www.dropbox.com/scl/fi/9z93qko2vsx1k8zzwoivq/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-38.-Alumbramiento.pdf?rlkey=ppvkm8hzmzqnuz5vr6ra50kqb&dl=0",
   "min": 10
  },
  {
   "titulo": "Atención prenatal",
   "url": "https://www.dropbox.com/scl/fi/kgw857s5w7fdqu9i9faaq/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-35.-Atenci-n-prenatal.pdf?rlkey=238nn5f404bpzmfpswcpjfy6g&dl=0",
   "min": 10
  },
  {
   "titulo": "Climaterio y menopausia",
   "url": "https://www.dropbox.com/scl/fi/rapdhze4x9cm3mwj1787t/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-CLIMATERIO-Y-MENOPAUSIA.pdf?rlkey=n60cl3rzclmta51lafi1ixi3o&dl=0",
   "min": 10
  },
  {
   "titulo": "Diagnóstico del embarazo",
   "url": "https://www.dropbox.com/scl/fi/o22abw50uijv0hipaa56y/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-33.-Diagn-stico-del-embarazo.pdf?rlkey=2fv6smvgiyvt2vyapuxfqaqgp&dl=0",
   "min": 10
  },
  {
   "titulo": "Dilatación",
   "url": "https://www.dropbox.com/scl/fi/1hwgtclr3o8swpmbu7k1w/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-36.-Dilataci-n.pdf?rlkey=ehf52lqq81k5almu8t0di30xs&dl=0",
   "min": 10
  },
  {
   "titulo": "Expulsivo",
   "url": "https://www.dropbox.com/scl/fi/7dvrg7cll3qf9y5022x62/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-37.-Expulsivo.pdf?rlkey=ucfky6h0dch65pq7n44i1uy4i&dl=0",
   "min": 10
  },
  {
   "titulo": "Manejo inicial de emergencias neonatales",
   "url": "https://www.dropbox.com/scl/fi/t3oozmxga8pkys55v0use/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-46.-Manejo-inicial-de-emergencias-neonatales.pdf?rlkey=yaz9qki7ui5nsjl9kop5b75mj&dl=0",
   "min": 10
  },
  {
   "titulo": "Manejo inicial de emergencias obstétricas",
   "url": "https://www.dropbox.com/scl/fi/9u4vto8h5077s0x260sv8/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-39.-Manejo-inicial-de-emergencias-obst-tricas.pdf?rlkey=seodinayfjrwz8ynyvvdcdci7&dl=0",
   "min": 10
  },
  {
   "titulo": "Paquete básico de cuidado del binomio madre niño",
   "url": "https://www.dropbox.com/scl/fi/j0mxgxn17mprbk6ynfeqr/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-42.-Paquete-b-sico-de-cuidado-del-binomio-madre-ni-o.pdf?rlkey=v91hig8gpcfg4r17o8ccln6y9&dl=0",
   "min": 10
  },
  {
   "titulo": "Riesgo obstétrico",
   "url": "https://www.dropbox.com/scl/fi/u3giqokh7yx8i3qda1rav/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-40.-Riesgo-obst-trico.pdf?rlkey=zmb6gtefxlgx89uscv5s0im4n&dl=0",
   "min": 10
  },
  {
   "titulo": "Promoción del parto vertical",
   "url": "https://www.dropbox.com/scl/fi/63hwgu8qmchw7mzw77au3/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-01.-Promoci-n-del-Parto-vertical.pdf?rlkey=l6pouc91v9ojtnae2xqt5oklj&dl=0",
   "min": 10
  }
 ],
 "II-2": [
  {
   "titulo": "Paquete del cuidado integral de salud del niño - cred",
   "url": "https://www.dropbox.com/scl/fi/ev24ezvb2ewp1iv6pfo30/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-CRED.pdf?rlkey=vo86a8uyuv81brghyqfro5raa&dl=0",
   "min": 10
  }
 ],
 "I-4": [
  {
   "titulo": "Exposición a metales pesados y otras sustancias",
   "url": "https://www.dropbox.com/scl/fi/0inof6q45jv4zcawj2dkx/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-04.-Exposici-n-a-metales-pesados-y-otras-sustancias.pdf?rlkey=7m8sn7jn6jzy1rt9x8phwyy7m&dl=0",
   "min": 10
  },
  {
   "titulo": "Intoxicaciones",
   "url": "https://www.dropbox.com/scl/fi/s5m3gdz00e3i20wsn8mbw/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-INTOXICACIONES.pdf?rlkey=zbmhlb9vcmi1tgoqmzm3jzc41&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención de enfermedades transmisibles",
   "url": "https://www.dropbox.com/scl/fi/07tgeu2gkzm3hzs16icda/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-41.-Prevenci-n-de-la-trasmisi-n-materno-infantil-del-VIH-s-filis-y-hepatitis-B.pdf?rlkey=o93bpk5efyb9ptd8e5jd6ax9a&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención y control de dengue",
   "url": "https://www.dropbox.com/scl/fi/luuxfip88szawxu9mfvak/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-DENGUE.pdf?rlkey=p6myx6yud0iszf18t0x2hfh3b&dl=0",
   "min": 10
  },
  {
   "titulo": "Vigilancia y manejo de zoonosis",
   "url": "https://www.dropbox.com/scl/fi/fevia3c0phdru8mrwye09/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-VIGILANCIA-Y-MANEJO-DE-ZOONOSIS.pdf?rlkey=fbfghohz339n7xgl840fw80ff&dl=0",
   "min": 10
  }
 ],
 "II-4": [
  {
   "titulo": "Nutrición en el embarazo",
   "url": "https://www.dropbox.com/scl/fi/7w407qf0gsstljzcfyoww/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-34.-Nutrici-n-en-el-embarazo.pdf?rlkey=p65tpzjkk617ahpjrqwwdn8rz&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención y control de anemia",
   "url": "https://www.dropbox.com/scl/fi/qlzqwmp8xig4iegtl977i/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-08.-Prevenci-n-y-control-de-anemia.pdf?rlkey=yqqyo2e8t8majrgeo99fay2on&dl=0",
   "min": 10
  },
  {
   "titulo": "Suplementación con vitamina a",
   "url": "https://www.dropbox.com/scl/fi/gbzi0w3ule3qdbor30f7f/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-Suplementaci-n-con-vitamina-A.pdf?rlkey=2aw27i7vp3g9ny7jdyf41di80&dl=0",
   "min": 10
  },
  {
   "titulo": "Alimentación y nutrición salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/3i5pt7ikgk30h1hmaqrnx/FT-SALUD-P-BLICA-01.-Salud-comunitaria-03.-Alimentaci-n-y-nutrici-n.pdf?rlkey=u42ykpq73lp6hgor7mhpce6qq&dl=0",
   "min": 10
  }
 ],
 "II-6": [
  {
   "titulo": "Prevención y control de la tuberculosis",
   "url": "https://www.dropbox.com/scl/fi/69qsuv4jlg7yts7o6u5ep/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-07.-Prevenci-n-y-control-de-la-tuberculosis.pdf?rlkey=00vtnu0gbl32h0hzjw9s44us4&dl=0",
   "min": 10
  }
 ],
 "V-1": [],
 "II-11": [
  {
   "titulo": "Atención integral de las its",
   "url": "https://www.dropbox.com/scl/fi/pg44pxsjzq99v4momhzwo/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-ATENCI-N-INTEGRAL-DE-LAS-ITS.pdf?rlkey=5wpjsz2ijax652ikw5evyph0r&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención combinada del vih",
   "url": "https://www.dropbox.com/scl/fi/288eqvdeolkslb9gbpczw/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-09.-Prevenci-n-combinada-del-VIH.pdf?rlkey=apdkba4blbw8xfsadzcf5fim6&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención de la transmisión materno infantil de vih, sífilis y vhb",
   "url": "https://www.dropbox.com/scl/fi/90fmjgoxo27faz58y9jl3/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-Prevenci-n-de-transmisi-n-materno-infantil-de-VIH-s-filis-y-hepatitis-B.pdf?rlkey=t33f9q1mui21yoss8okpqe8oq&dl=0st=e2i5qkq4&dl=0",
   "min": 10
  },
  {
   "titulo": "Diversidad cultural, promoción de la inclusión y la equidad",
   "url": "https://www.dropbox.com/scl/fi/hhmf73duk7i1ci2esjt8d/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-04.-Diversidad-cultural-promoci-n-de-la-inclusi-n-y-la-equidad.pdf?rlkey=w5j3wf96for79awthq3lwfmfv&dl=0",
   "min": 10
  }
 ],
 "I-1": [
  {
   "titulo": "Infecciones asociadas a la atención de salud",
   "url": "https://www.dropbox.com/scl/fi/jfqks1fbcz8bzh77zdqze/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-05.-Infecciones-asociadas-a-la-atenci-n-de-salud.pdf?rlkey=p3nqxpvgbw20ib5e35qcjjo14&dl=0",
   "min": 10
  },
  {
   "titulo": "Bioseguridad",
   "url": "https://www.dropbox.com/scl/fi/bgcn9etn6i6f3f4x6jgfm/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-05.-Bioseguridad.pdf?rlkey=gsyi6mgrnyarldz849ev4gamx&dl=0",
   "min": 10
  },
  {
   "titulo": "Conceptos básicos de salud pública",
   "url": "https://www.dropbox.com/scl/fi/9r0taeihtlckimbwoi61r/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Conceptos-b-sicos-de-salud-p-blica.pdf?rlkey=3161a08v1lzpoxhj4qgwn78eu&dl=0",
   "min": 10
  },
  {
   "titulo": "Etapas y niveles de prevención",
   "url": "https://www.dropbox.com/scl/fi/ntyrkpq6wmwcjs6wq6e1h/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-08.-Etapas-y-niveles-de-prevenci-n.pdf?rlkey=fx6rrzmzn0ip39mduqi8dypgf&dl=0",
   "min": 10
  },
  {
   "titulo": "Historia natural del proceso salud enfermedad",
   "url": "https://www.dropbox.com/scl/fi/dnw2e5rw43x6rpedjabk8/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-07.-Historia-natural-del-proceso-salud-enfermedad.pdf?rlkey=yxpvb7xi6n0fm6tq1fezxvzkq&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención y control de infecciones",
   "url": "https://www.dropbox.com/scl/fi/u9upg6yhgkgdfukjp9xns/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-09.-Prevenci-n-y-Control-de-infecciones.pdf?rlkey=91wkacnbtmm790aisgsg0upjj&dl=0",
   "min": 10
  },
  {
   "titulo": "Promoción de la salud - lineamientos",
   "url": "https://www.dropbox.com/scl/fi/ib0qzv4v2f0d3ep2c7hzz/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-02.-Promoci-n-de-la-salud-Lineamientos.pdf?rlkey=ie7wd55jhgc8xtdqr2a68lfkn&dl=0",
   "min": 10
  },
  {
   "titulo": "Promoción de la salud y participación comunitaria",
   "url": "https://www.dropbox.com/scl/fi/trf12qfhl6rmvlnuc57z6/FT-SALUD-P-BLICA-02.-Promoci-n-de-la-salud-y-prevenci-n-del-riesgo-01.-Promoci-n-de-la-salud-y-participaci-n-comunitaria.pdf?rlkey=p52jzn6pubusvk5ardc4x1b6i&dl=0",
   "min": 10
  }
 ],
 "I-2": [
  {
   "titulo": "Funciones esenciales de la salud pública",
   "url": "https://www.dropbox.com/scl/fi/tqyiaz9anyt8nwbsnw8zn/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-02.-Funciones-esenciales-de-la-salud-p-blica.pdf?rlkey=my0gf3dkcbylozls6q2prygsy&dl=0",
   "min": 10
  }
 ],
 "I-3": [
  {
   "titulo": "Conceptos básicos de epidemiología",
   "url": "https://www.dropbox.com/scl/fi/2ed4bf1yog880lqcw28g2/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Conceptos-b-sicos-de-epidemiolog-a.pdf?rlkey=tbrdhrwwv547virj37l18fv1v&dl=0",
   "min": 10
  },
  {
   "titulo": "Endemias, epidemias y brotes",
   "url": "https://www.dropbox.com/scl/fi/0otma3pbu1rjdfhsbemhf/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-05.-Endemias-epidemias-y-brotes.pdf?rlkey=jpjtunxncs7kl8ebua58njcfp&dl=0",
   "min": 10
  },
  {
   "titulo": "Vigilancia en salud pública",
   "url": "https://www.dropbox.com/scl/fi/9x43tu5a6i98gv4vip2uy/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Vigilancia-en-salud-p-blica.pdf?rlkey=e88gpkfqoqo1ybv87gxfn4g87&dl=0",
   "min": 10
  },
  {
   "titulo": "Vigilancia epidemiológica",
   "url": "https://www.dropbox.com/scl/fi/bczhbb6wv9bgqya8cc2mh/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-1.-M-todos-y-aplicaciones-de-salud-p-blica-Vigilancia-epidemiol-gica.pdf?rlkey=6aysg9nko8amos4slsgmarn6d&dl=0",
   "min": 10
  }
 ],
 "II-5": [
  {
   "titulo": "Atención centrada en la persona",
   "url": "https://www.dropbox.com/scl/fi/lgewz3352amk4g0wwj0h1/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ATENCI-N-CENTRADA-EN-LA-PERSONA.pdf?rlkey=mraqcmumj90173u0nd9efqv5d&dl=0",
   "min": 10
  },
  {
   "titulo": "Atención primaria de salud (aps)",
   "url": "https://www.dropbox.com/scl/fi/v0q5pgdspsl521jb20p05/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ATENCI-N-PRIMARIA-DE-SALUD-APS.pdf?rlkey=48exj3vguv5b19hauigx6jdp0&dl=0",
   "min": 10
  },
  {
   "titulo": "Exámenes auxiliares y de apoyo al diagnóstico y tratamiento de problemas de salud",
   "url": "https://www.dropbox.com/scl/fi/ogjlnrjdvd0gibr6sex4w/FT-CUIDADO-INTEGRAL-DE-SALUD-02.-Temas-espec-ficos-Ex-menes-auxiliares-y-de-apoyo-al-diagn-stico-y-tratamiento-de-problemas-de-salud.pdf?rlkey=jsrvgwir6m5lsmujck96t48i7&dl=0",
   "min": 10
  },
  {
   "titulo": "Mci - definición del modelo",
   "url": "https://www.dropbox.com/scl/fi/5tpmdy3bz00xbtzn6iezm/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-02.-MCI-Definici-n-del-modelo.pdf?rlkey=r1ygsspwqf3p0p01lfzs37g6k&dl=0",
   "min": 10
  },
  {
   "titulo": "Mci - política nacional multisectorial de salud al 2030",
   "url": "https://www.dropbox.com/scl/fi/79vqr9wenn1vlc54wfui0/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-01.-MCI-Pol-tica-nacional-multisectorial-de-salud-al-2031.pdf?rlkey=tkq3p5w0uz0lulwj4djnmiswr&dl=0",
   "min": 10
  },
  {
   "titulo": "Mci - prestación",
   "url": "https://www.dropbox.com/scl/fi/1u1smnbd1i0djpgceauey/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-espec-ficos-03.-MCI-Prestaci-n.pdf?rlkey=7sz3snta5aj7t69vczij8o3h8&dl=0",
   "min": 10
  },
  {
   "titulo": "Paquete básico de cuidado para el adolescente",
   "url": "https://www.dropbox.com/scl/fi/6z9f44jq97qb156mp1rp5/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-05.-Paquete-b-sico-de-cuidado-para-el-adolescente.pdf?rlkey=uhz86f5u5sncdv9029y4mhmf7&dl=0",
   "min": 10
  },
  {
   "titulo": "Paquete básico del cuidado integral del adulto",
   "url": "https://www.dropbox.com/scl/fi/9bj29npeuf3la2qt4qad5/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-02.-Paquete-b-sico-del-cuidado-integral-del-adulto.pdf?rlkey=t4seumkof1dtcfsdsamx26lge&dl=0",
   "min": 10
  },
  {
   "titulo": "Paquete básico del cuidado integral del adulto mayor",
   "url": "https://www.dropbox.com/scl/fi/24xs3pn06j7yaqd4uholb/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-03.-Paquete-b-sico-del-cuidado-integral-del-adulto-mayor.pdf?rlkey=m3owcqsxa14inoqtyp6zw61i7&dl=0",
   "min": 10
  },
  {
   "titulo": "Paquete básico del cuidado integral del joven",
   "url": "https://www.dropbox.com/scl/fi/giexk6rvzmazjdj14z48y/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-01.-Paquete-b-sico-del-cuidado-integral-del-joven.pdf?rlkey=8amuo1kwlwaxcw201r8uda09d&dl=0",
   "min": 10
  },
  {
   "titulo": "Uso racional de medicamentos",
   "url": "https://www.dropbox.com/scl/fi/6ktn8dgciscugqyfdqp1o/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-11.-Uso-racional-de-medicamentos.pdf?rlkey=n39i8udwamuy0eyc0fi7yxxqh&dl=0",
   "min": 10
  }
 ],
 "II-7": [],
 "II-8": [
  {
   "titulo": "Prevención y control de ecnt",
   "url": "https://www.dropbox.com/scl/fi/pv2g7ow2bryey4obr91ay/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-ECNT.pdf?rlkey=9h85r71ybdj9ebwen5b3sjlf3&dl=0",
   "min": 10
  }
 ],
 "II-9": [
  {
   "titulo": "Cuidados de la salud mental",
   "url": "https://www.dropbox.com/scl/fi/x9kfrg9g7pnh0oxpzzcqz/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-02.-Cuidados-de-la-salud-mental.pdf?rlkey=9hjlup8ssk89rixo4mb3ossxr&dl=0",
   "min": 10
  },
  {
   "titulo": "Modelo de salud mental comunitaria salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/4lqrmc0s810hdosrs0zf8/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-MODELO-DE-SALUD-MENTAL-COMUNITARIA.pdf?rlkey=wqh4s3rsbsqwmtutc8mi25sjp&dl=0",
   "min": 10
  }
 ],
 "II-10": [
  {
   "titulo": "Detección temprana de cáncer infantil",
   "url": "https://www.dropbox.com/scl/fi/dhclovhvq0ejp5918lb9p/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-05.-Detecci-n-temprana-de-c-ncer-infantil.pdf?rlkey=4wsi1824nyf0q82w5vrw0xh9k&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención y control de cáncer",
   "url": "https://www.dropbox.com/scl/fi/omz47ijfuhe5jfrkpgp0r/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-4.-TEMAS-TRANSVERSALES-PREVENCI-N-Y-CONTROL-DE-C-NCER.pdf?rlkey=5v48k5yzahnb1vl7v9tw41web&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención y control de enfermedades raras y huérfanas",
   "url": "https://www.dropbox.com/scl/fi/ltl8u7z28lmi38x4br8sl/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-01.-Prevenci-n-y-control-de-enfermedades-raras-y-hu-rfanas.pdf?rlkey=g1kgeig2b7kiaook92y55l8w1&dl=0",
   "min": 10
  }
 ],
 "III-1": [
  {
   "titulo": "Código de ética y deóntologia profesional ética y bioética",
   "url": "https://www.dropbox.com/scl/fi/dzd4o66gvrq88bps47i56/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-02.-C-digo-de-tica-y-de-ntologia-profesional.pdf?rlkey=qhclasrxnl8od59d7rcp8c35c&dl=0",
   "min": 10
  },
  {
   "titulo": "Derechos deberes de las personas usuarias de los servicios de salud ética y bioética",
   "url": "https://www.dropbox.com/scl/fi/s9j48ooayywz8axgh0dvq/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-04.-Derechos-deberes-de-las-personas-usuarias-de-los-servicios-de-salud.pdf?rlkey=drs31a8j4kk5j4vx6qukpee1t&dl=0",
   "min": 10
  },
  {
   "titulo": "ética e integridad y ética en la función pública ética y bioética",
   "url": "https://www.dropbox.com/scl/fi/fprigedotochv6wgayphm/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-03.-tica-e-integridad-y-tica-en-la-funci-n-p-blica.pdf?rlkey=i61zd3mttkcy75cbsez66javc&dl=0",
   "min": 10
  },
  {
   "titulo": "Principios y fundamentos de la ética ética y bioética",
   "url": "https://www.dropbox.com/scl/fi/b03tve6wnmt1o8q56o5i6/FT-TICA-E-INTERCULTURALIDAD-01.-tica-y-bio-tica-01.-Principios-y-fundamentos-de-la-tica.pdf?rlkey=1gg27wteq37w41jk42xd8l7sm&dl=0",
   "min": 10
  }
 ],
 "III-3": [],
 "III-9": [],
 "V-2": [
  {
   "titulo": "Análisis estratégico institucional (foda) planificación y presupuesto en salud",
   "url": "https://www.dropbox.com/scl/fi/y6tft6b0ehp73ywqj5dml/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-03.-An-lisis-estrat-gico-institucional-FODA.pdf?rlkey=ydw85rip3ky6enwh5ii3bnesb&dl=0",
   "min": 10
  },
  {
   "titulo": "Planeamiento a nivel institucional - pei planificación y presupuesto en salud",
   "url": "https://www.dropbox.com/scl/fi/5tvgyl3n2i4nokeoj3pmy/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-01.-Planeamiento-a-nivel-institucional-PEI.pdf?rlkey=g21saqjuokgbvvtg9b931fraj&dl=0",
   "min": 10
  },
  {
   "titulo": "Planeamiento a nivel institucional - poi, evaluación del poi planificación y presupuesto en salud",
   "url": "https://www.dropbox.com/scl/fi/peu0h2ov1elsacj1djteo/FT-GESTI-N-DE-LOS-SERVICIOS-DE-SALUD-01.-Planificaci-n-y-presupuesto-en-salud-02.-Planeamiento-a-nivel-institucional-POI-evaluaci-n-del-POI.pdf?rlkey=infjbzyrf1v0zcqa4yrtk7lu3&dl=0",
   "min": 10
  }
 ],
 "V-6": [],
 "IV-1": [
  {
   "titulo": "Conceptos básicos de investigación",
   "url": "https://www.dropbox.com/scl/fi/jxzed29sayvy6b2dddsm4/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-01.-Conceptos-b-sicos-de-investigaci-n.pdf?rlkey=44uv1ywurazgxcxpasjbxcc7b&dl=0",
   "min": 10
  },
  {
   "titulo": "Enfoques y métodos de investigación",
   "url": "https://www.dropbox.com/scl/fi/f9hjnqjgq13jlc7pvn0bg/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-02.-Enfoques-y-m-todos-de-investigaci-n.pdf?rlkey=cnnej6pnbi5whpvkkirg4u3rw&dl=0",
   "min": 10
  },
  {
   "titulo": "Estudios analíticos experimentales",
   "url": "https://www.dropbox.com/scl/fi/47aywopkckzk0wvttfnjl/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-05.-Estudios-anal-ticos-experimentales.pdf?rlkey=udz88ib7cghrudp27mify4fka&dl=0",
   "min": 10
  },
  {
   "titulo": "Estudios analíticos observacionales",
   "url": "https://www.dropbox.com/scl/fi/uji3k81s2ylsalk92ukbt/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-04.-Estudios-anal-ticos-observacionales.pdf?rlkey=5uczt9b3o0br4ch9wbi01fqew&dl=0",
   "min": 10
  },
  {
   "titulo": "Tipos de investigación y estudios descriptivos",
   "url": "https://www.dropbox.com/scl/fi/smhaf2unbtaypxaep8lb7/FT-INVESTIGACI-N-01.-Conceptos-y-clasificaci-n-de-las-investigaciones-03.-Tipos-de-investigaci-n-y-estudios-descriptivos.pdf?rlkey=ubkn7sd5l376y43mj7a48c6t4&dl=0",
   "min": 10
  }
 ],
 "I-5+I-6": [
  {
   "titulo": "Demografía",
   "url": "https://www.dropbox.com/scl/fi/gu2c33eaeox5t2hqls2ls/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-06.-Demograf-a.pdf?rlkey=ck34agf0cgqla0ufvy6a31fig&dl=0",
   "min": 10
  },
  {
   "titulo": "Determinantes sociales - ambientales, biogenéticos y comerciales salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/wmhsw1p5r5ozeeux1k222/FT-SALUD-P-BLICA-01.-Salud-comunitaria-01.-Determinantes-sociales-ambientales-biogen-ticos-y-comerciales.pdf?rlkey=m7ebcc8tc9r77v2nv7v70f4hu&dl=0",
   "min": 10
  }
 ],
 "I-7": [],
 "I-8": [],
 "I-9": [],
 "I-11+I-12": [
  {
   "titulo": "Acceso a los servicios de salud salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/i7uhpw3jnh5uvg55jbxx4/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Acceso-a-los-servicios-de-salud.pdf?rlkey=gngx77kvynlqbz0k548crnz0l&dl=0",
   "min": 10
  },
  {
   "titulo": "Control de vectores y plagas salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/6atg071cy04iuopw3zr39/FT-SALUD-P-BLICA-01.-Salud-comunitaria-04.-Control-de-vectores-y-plagas.pdf?rlkey=vsaqidofghpwgg2v02p30tqid&dl=0",
   "min": 10
  },
  {
   "titulo": "Gestión y manejo de los residuos sólidos salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/gpphkp8rpoe92tpl6t3s1/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-GESTI-N-Y-MANEJO-DE-LOS-RESIDUOS-S-LIDOS.pdf?rlkey=2lg20hflra40v82nq12831rai&dl=0",
   "min": 10
  },
  {
   "titulo": "Inocuidad alimentaria salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/u5102qvfhl5355c80usml/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Inocuidad-alimentaria.pdf?rlkey=2uxg42qo5rz3zfcugqiz5dvv6&dl=0",
   "min": 10
  },
  {
   "titulo": "Intervenciones comunitarias en salud salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/85tis2rsx3v6zoanibgr1/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-INTERVENCIONES-COMUNITARIAS-EN-SALUD.pdf?rlkey=u9xb316x571qjjr0nynq7d5id&dl=0",
   "min": 10
  },
  {
   "titulo": "Participación social y comunitaria salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/4518lic7c8pyxwbu21jub/FT-SALUD-P-BLICA-02.-Salud-comunitaria-Participaci-n-social-y-comunitaria.pdf?rlkey=22irb0ruwcsfdafu4vjmk9uyj&dl=0",
   "min": 10
  },
  {
   "titulo": "Plan de salud local salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/5yeg3p73yt24k1lztksmo/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-PLAN-DE-SALUD-LOCAL.pdf?rlkey=l7i48ixwrrbk19kmikbu2grlz&dl=0",
   "min": 10
  },
  {
   "titulo": "Salud ocupacional salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/s7o4srpmb787hra43fwqd/FT-SALUD-P-BLICA-01.-Salud-comunitaria-06.-Salud-ocupacional.pdf?rlkey=i90m9dquu6u02w37qqu327d8t&dl=0",
   "min": 10
  },
  {
   "titulo": "Sectorización y ficha familiar salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/p5ko5n5o425y2l5lzp4k3/FUNDAMENTOS-TE-RICOS-SALUD-P-BLICA-3.-SALUD-COMUNITARIA-SECTORIZACI-N-Y-FICHA-FAMILIAR.pdf?rlkey=rqhkci4ggj88o06c40mjwau8f&dl=0",
   "min": 10
  },
  {
   "titulo": "Sistemas de información y tic en salud salud comunitaria",
   "url": "https://www.dropbox.com/scl/fi/crq3560lssclow85n1fpv/FT-SALUD-P-BLICA-01.-Salud-comunitaria-02.-Sistemas-de-informaci-n-y-TIC-en-salud.pdf?rlkey=5h6r6u7tmmxdgmrv40rsco8wh&dl=0",
   "min": 10
  }
 ],
 "II-12": [
  {
   "titulo": "Medidas preventivas en salud bucal",
   "url": "https://www.dropbox.com/scl/fi/99i112pzofj9bfcz4rskh/FT-CUIDADO-INTEGRAL-DE-SALUD-01.-Temas-transversales-06.-Medidas-preventivas-en-salud-bucal.pdf?rlkey=wv1ifgzyxufjcawbg82v3saz1&dl=0",
   "min": 10
  }
 ],
 "II-13": [],
 "III-2": [
  {
   "titulo": "Aspectos legales y forenses en medicina",
   "url": "https://www.dropbox.com/scl/fi/9xi99u9w652p8ynzfal0w/FUNDAMENTOS-TE-RICOS-CUIDADO-INTEGRAL-DE-SALUD-3.-TEMAS-ESPEC-FICOS-ASPECTOS-LEGALES-Y-FORENSES-EN-MEDICINA.pdf?rlkey=g6rpv8rvc35bh9shzx8f09lgc&dl=0",
   "min": 10
  }
 ],
 "III-5": [
  {
   "titulo": "Acceso a la atención en salud de la población migrante",
   "url": "https://www.dropbox.com/scl/fi/q03ij1hrjdh86ixexiys2/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-06.-Acceso-a-la-atenci-n-en-salud-de-la-poblaci-n-migrante.pdf?rlkey=jgnbqoejwt4yem4u3yof7rgqp&dl=0",
   "min": 10
  },
  {
   "titulo": "Atención en salud con enfoque intercultural y pertinencia cultural",
   "url": "https://www.dropbox.com/scl/fi/9fy99xm4371vthvz5le2a/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-05.-Atenci-n-en-salud-con-enfoque-intercultural-y-pertinencia-cultural.pdf?rlkey=efbnsw9f6q8fwtxko1hhzs5e7&dl=0",
   "min": 10
  },
  {
   "titulo": "Comunicación y diálogo intercultural en salud",
   "url": "https://www.dropbox.com/scl/fi/16gm6z23ccj3027zn1kqi/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-02.-Comunicaci-n-y-di-logo-intercultural-en-salud.pdf?rlkey=sme0zr01pm1swgcbdititetfk&dl=0",
   "min": 10
  },
  {
   "titulo": "Identidad cultural y autopercepción étnica",
   "url": "https://www.dropbox.com/scl/fi/zrtfnynitlbu066imq0iw/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-03.-Identidad-cultural-y-autopercepci-n-tnica.pdf?rlkey=sxo6rxs7z002ev221ikq31sar&dl=0",
   "min": 10
  },
  {
   "titulo": "Medicina tradicional, complementaria y alternativa",
   "url": "https://www.dropbox.com/scl/fi/38k7v6x3lxn5d3z84nzus/FUNDAMENTOS-TE-RICOS-TICA-E-INTERCULTURALIDAD-1.-ATENCI-N-INTERCULTURAL-EN-SALUD-MEDICINA-TRADICIONAL-COMPLEMENTARIA-Y-ALTERNATIVA.pdf?rlkey=qnpmqlkvazlon4p4xvfsw5w34&dl=0",
   "min": 10
  },
  {
   "titulo": "Prevención de la estigma y discriminación étnica, cultural, y en otras poblaciones clave y vulnerables",
   "url": "https://www.dropbox.com/scl/fi/zg1duzyw0mlu9edusef0u/FT-TICA-E-INTERCULTURALIDAD-01.-Atenci-n-intercultural-en-salud-07.-Prevenci-n-de-la-estigma-y-discriminaci-n-tnica-cultural-y-en-otras-poblaciones-clave-y-vulnerables.pdf?rlkey=ri90ofxz6keaa0yai9ua70m9b&dl=0",
   "min": 10
  }
 ],
 "III-6+III-10": [],
 "III-8": [
  {
   "titulo": "ética y aspectos éticos de las publicaciones científicas",
   "url": "https://www.dropbox.com/scl/fi/9omryjt8ad5aqv57ba9w5/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-03.-tica-y-aspectos-ticos-de-las-publicaciones-cient-ficas.pdf?rlkey=axy4e9cl0uyzp9ba79lg5j0wv&dl=0",
   "min": 10
  }
 ],
 "IV-2": [
  {
   "titulo": "Elaboración del proyecto de investigación",
   "url": "https://www.dropbox.com/scl/fi/kvr1dmasowu0iw59nlqv0/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-02.-Elaboraci-n-del-proyecto-de-investigaci-n.pdf?rlkey=v073epqcai0cywxvnc8gtgbcg&dl=0",
   "min": 10
  },
  {
   "titulo": "Instrumentos de recolección de datos y validación",
   "url": "https://www.dropbox.com/scl/fi/ui7ybqg38qajyy4md0k9r/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-04.-Instrumentos-de-recolecci-n-de-datos-y-validaci-n.pdf?rlkey=wz4njxn3rgn24yud7d1tmyuz9&dl=0",
   "min": 10
  },
  {
   "titulo": "Procesamiento y análisis de datos",
   "url": "https://www.dropbox.com/scl/fi/7vnqi25pun2291tqwem4r/FT-INVESTIGACI-N-02.-Metodolog-a-de-la-investigaci-n-05.-Procesamiento-y-an-lisis-de-datos.pdf?rlkey=rt8t82et6nt6m2f0fr04izqa3&dl=0",
   "min": 10
  },
  {
   "titulo": "Causalidad y riesgo",
   "url": "https://www.dropbox.com/scl/fi/6dzjcwt73q514dcb1kn5h/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-22.-Causalidad-y-riesgo.pdf?rlkey=r0yc5gt2kodlt7pbjgt86ddw6&dl=0",
   "min": 10
  }
 ],
 "IV-3+IV-5": [
  {
   "titulo": "Pruebas diagnósticas",
   "url": "https://www.dropbox.com/scl/fi/dm04gtry1eca2n3kk9yhw/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-23.-Pruebas-diagn-sticas.pdf?rlkey=tc9zapxidm2eiho9099j20lnr&dl=0",
   "min": 10
  }
 ],
 "IV-4": [],
 "IV-6+IV-7": [
  {
   "titulo": "Características estructurales del informe",
   "url": "https://www.dropbox.com/scl/fi/klivoxv440tzu5ckn71ke/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-01.-Caracter-sticas-estructurales-del-informe.pdf?rlkey=hnrie6ivi70nonbs01wsqmoqy&dl=0",
   "min": 10
  },
  {
   "titulo": "Publicación científica",
   "url": "https://www.dropbox.com/scl/fi/tv1cndbrrvw0jqv0ggwtp/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-Publicaci-n-cient-fica.pdf?rlkey=i6a2vibngobr8csib9rhfa728&dl=0",
   "min": 10
  },
  {
   "titulo": "Requisitos metodológicos del informe",
   "url": "https://www.dropbox.com/scl/fi/1gf1q8tafnb0l02dnoka0/FT-INVESTIGACI-N-03.-Ejecuci-n-de-la-investigaci-n-02.-Requisitos-metodol-gicos-del-informe.pdf?rlkey=gdc3mws807vr9wxo7dehprh6h&dl=0",
   "min": 10
  },
  {
   "titulo": "Análisis situacional de salud - sala situacional de salud",
   "url": "https://www.dropbox.com/scl/fi/l16kddjz71u2qx0c3e5vr/FT-SALUD-P-BLICA-01.-M-todos-y-aplicaciones-de-salud-p-blica-10.-An-lisis-situacional-de-salud-Sala-situacional-de-salud.pdf?rlkey=vhz79bzodtw4shk1pjix8wusn&dl=0",
   "min": 10
  }
 ],
 "V-3": [
  {
   "titulo": "Atención médica en situaciones de emergencia, urgencia y referencia",
   "url": "https://www.dropbox.com/scl/fi/0i887g0wbk4x4kze3mg4o/FT-CUIDADO-INTEGRAL-DE-SALUD-02.-Temas-espec-ficos-Atenci-n-m-dica-en-situaciones-de-emergencia-urgencia-y-referencia.pdf?rlkey=4utszfdi070xh9nddynml3thg&dl=0",
   "min": 10
  }
 ],
 "V-7+V-10": [],
 "I-10": [
  {
   "titulo": "Principales instrumentos de medición en primer nivel de atención",
   "url": "https://www.dropbox.com/scl/fi/owz418y77q9s47vwtmvb2/FT-INVESTIGACI-N-2.-EJECUCI-N-DE-LA-INVESTIGACI-N-PRINCIPALES-INSTRUMENTOS-DE-MEDICI-N-EN-PRIMER-NIVEL-DE-ATENCI-N.pdf?rlkey=a3a0md8s7kx59n363zn4kgi8a&dl=0",
   "min": 10
  }
 ],
 "III-4+III-7": []
};

// temas SIN video en QxMedic → videoclase de respaldo (DR LOPEZ / GALENO)
export const ENCAPS_VIDEO_RESPALDO: Record<string, { url: string; label: string; min: number }> = {
 "III-3": {
  "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "I-7": {
  "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "I-8": {
  "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "I-9": {
  "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "II-13": {
  "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "IV-3+IV-5": {
  "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8",
  "label": "🎬 Videoclase de respaldo (GALENO) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "IV-4": {
  "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8",
  "label": "🎬 Videoclase de respaldo (GALENO) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "IV-6+IV-7": {
  "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8",
  "label": "🎬 Videoclase de respaldo (GALENO) — QxMedic no tiene video de este tema",
  "min": 25
 },
 "III-4+III-7": {
  "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu",
  "label": "🎬 Videoclase de respaldo (DR LOPEZ) — QxMedic no tiene video de este tema",
  "min": 25
 }
};

export const ENCAPS_ACADEMIAS_RESPALDO: AcademiaRespaldo[] = [
 {
  "nombre": "DR LOPEZ",
  "tag": "La más completa",
  "url": "https://drive.google.com/drive/folders/1na0lmY_BY9naLlcAzgqSBXR7T-kPUBKv",
  "carpetas": [
   {
    "n": "🎬 Videoclases · Cuidado Integral",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "n": "🎬 Videoclases · Ética e Interculturalidad",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "n": "🎬 Videoclases · Salud Pública",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "n": "📈 Normativas (fichas MINSA)",
    "url": "https://drive.google.com/drive/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko"
   },
   {
    "n": "📝 Simulacros",
    "url": "https://drive.google.com/drive/folders/1Svt1JyDTunsfOYUI8ochTEYW6NzynsBH"
   },
   {
    "n": "🎯 Compendio",
    "url": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V"
   },
   {
    "n": "😬 Kahoot",
    "url": "https://drive.google.com/drive/folders/1qPY0rwPDsUZhIJfIyaL1z76W69YGUlFO"
   },
   {
    "n": "🎥 Sesión Introductoria (mp4)",
    "url": "https://drive.google.com/file/d/1gf2zPcrc4peDWScn6Lauvy2mrF7wQmc1/view"
   }
  ]
 },
 {
  "nombre": "GALENO MEDIC",
  "tag": "Perlitas high-yield",
  "url": "https://drive.google.com/drive/folders/1_hSoU8ZuLBCnq8VpWkPi6b7_ryUPxoUk",
  "carpetas": [
   {
    "n": "✨ Perlitas Galeno (resúmenes high-yield)",
    "url": "https://drive.google.com/drive/folders/1U0aPoXeM9MmCdj7PspvKr5VP-b9RKxZN"
   },
   {
    "n": "🎥 Videoclases",
    "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
   },
   {
    "n": "🤝 Tutoría General",
    "url": "https://drive.google.com/drive/folders/1iMNLfo7_Srhr12d6hR6jzU6594azb8Ez"
   },
   {
    "n": "🎥 Introducción al curso (mp4)",
    "url": "https://drive.google.com/file/d/1_ch2QERQ56uEulVQKM6vTqQSqbW--J4s/view"
   }
  ]
 },
 {
  "nombre": "VILLAMEDIC",
  "tag": "Clases en vivo + sims",
  "url": "https://drive.google.com/drive/folders/1ovJbxq1Bw_Jub6vPK-K1nv6Nc_ovh79P",
  "carpetas": [
   {
    "n": "🎥 Fase 1: Clases en vivo",
    "url": "https://drive.google.com/drive/folders/1fVpTnKxprTgCS2ENeGlJ6PSL34I7ntXm"
   },
   {
    "n": "📝 Simulacros",
    "url": "https://drive.google.com/drive/folders/1UiJVPpq_BCtp-dodUfDn1fnVURZC_16h"
   },
   {
    "n": "📅 Cronograma jun-jul (pdf)",
    "url": "https://drive.google.com/file/d/19kZQFC0bmT3hgmsOlGoyc7GsOnU8_6sc/view"
   }
  ]
 }
];

export const ENCAPS_THEOMED_SIMULACROS: FuenteLink[] = [
 {
  "n": "Simulacro 15/05",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=20244"
 },
 {
  "n": "Simulacro 29-MAY",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=4242"
 },
 {
  "n": "Simulacro 12-JUN",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=4442"
 },
 {
  "n": "Examen TIPO A",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=7934"
 },
 {
  "n": "Examen TIPO B",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=7935"
 },
 {
  "n": "Examen TIPO A (2)",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=7937"
 },
 {
  "n": "Examen TIPO B (2)",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=7938"
 },
 {
  "n": "Examen 2025-II",
  "url": "https://campus.academiatheomed.com/mod/quiz/view.php?id=7940"
 }
];

// Theomed por área (sección del curso 73): cada tema deep-linkea a su área → sesiones + PPTs + POSTESTS
// + repasos + banqueos, incluido lo que se libere por vueltas. area = ENCAPS_AREA_PREFIJO[codigo prefijo].
export const ENCAPS_THEOMED_AREA: Record<string, { url: string; n: number }> = {
 "Salud Pública": {
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "n": 31
 },
 "Cuidado Integral": {
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "n": 54
 },
 "Ética e Interculturalidad": {
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "n": 11
 },
 "Investigación": {
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=5",
  "n": 7
 },
 "Gestión de Servicios": {
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "n": 25
 }
};
export const ENCAPS_THEOMED_EXTRA: FuenteLink[] = [
 {
  "n": "📋 Normas Técnicas (transversal · 30 docs)",
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=1"
 },
 {
  "n": "📂 Material complementario",
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=7"
 },
 {
  "n": "🎥 Webinars",
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=8"
 },
 {
  "n": "🏁 Actividades finales 2026-II",
  "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=9"
 }
];
export const ENCAPS_AREA_PREFIJO: Record<string, string> = {
 "I": "Salud Pública",
 "II": "Cuidado Integral",
 "III": "Ética e Interculturalidad",
 "IV": "Investigación",
 "V": "Gestión de Servicios"
};

export const ENCAPS_QX_ACCESOS: FuenteLink[] = [
 {
  "n": "📚 Biblioteca · Fundamentos Teóricos (105 fichas)",
  "url": "https://qxmedic-aulavirtual.com/mis-clases/biblioteca"
 },
 {
  "n": "🎬 Videoclases QxMedic (184, por área)",
  "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
 },
 {
  "n": "🧪 Evaluaciones / App Banqueo",
  "url": "https://qxmedic-aulavirtual.com/evaluaciones/banqueapp"
 }
];

export const ENCAPS_FUENTES_META = {
  fichasMinsa: 105,
  fichasAsignadas: 102,
  academiasRespaldo: 3,
  theomedSimulacros: 8,
  verificado: '2026-06-22',
} as const;
