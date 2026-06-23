const fs=require("fs");
const dir="D:/joseph-md-app/DATA/ENCAPS/thv/";
const sessions=JSON.parse(fs.readFileSync(dir+"_sessions_full.json","utf8")).filter(x=>x.tipo==="asinc");
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ");
// keyword map per ENCAPS code (distinctive terms)
const KW={
 "II-3":["vacun","inmuniz","esavi","cadena de frio","esquema nacional"],
 "II-1":["salud materna","materno","prenatal","gestante","puerperio","obstetr","planificacion familiar","atencion del parto"],
 "II-2":["cred","crecimiento y desarrollo","control de crecimiento"],
 "I-4":["dengue","malaria","metaxenic","leishman","bartonel","zoonosis","definicion de caso","definiciones de caso"],
 "II-4":["anemia","micronutriente","suplementacion de hierro","desnutricion"],
 "II-6":["tuberculosis"," tbc "],
 "V-1":["categorizacion","categorias de establecimientos"],
 "II-11":[" vih ","sida"," its ","sifilis","transmision sexual"],
 "I-1":["promocion de la salud","estilos de vida saludable"],
 "I-2":["fesp","funciones esenciales"],
 "I-3":["vigilancia epidemiolog","notificacion epidemiolog","brote epidem"],
 "II-5":["modelo de cuidado integral"," mci ","maguis"," mais ","curso de vida","modelo de atencion"],
 "II-7":["adulto mayor","vacam"],
 "II-8":["hipertension","diabetes","hearts","no transmisibles","enfermedades cronicas"],
 "II-9":["salud mental"],
 "II-10":["cancer","oncolog","neoplas"],
 "III-1":["bioetica","principios eticos","beneficencia","no maleficencia"],
 "III-3":["consentimiento informado"],
 "III-9":["derechos del paciente","derechos de los usuarios","derechos del usuario"],
 "V-2":["planeamiento estrategico"," pei "," poi ","foda","plan operativo"],
 "V-6":["telesalud","telemedicina","teleorientacion"],
 "IV-1+IV-2":["tipos de estudio","disenos de estudio","cohorte","casos y controles","ensayo clinico","validez","sesgo","tipos de investigacion"],
 "I-5+I-6":["determinantes","bioestadistica","demografia"],
 "I-7":["pnaia","accion por la infancia","ninez"],
 "I-8":["discapacidad"],
 "I-9":["estrategia nacional de salud familiar","ensf"],
 "I-11+I-12":["agente comunitario","salud comunitaria","participacion comunitaria"],
 "II-12":["salud bucal","odontolog","salud oral"],
 "II-13":["salud ocular","oftalm","salud visual","auditiv","salud del oido"],
 "III-2":["colegio medico"," cmp ","deontolog","acto medico"],
 "III-5":["interculturalidad","pertinencia cultural","parto vertical","medicina tradicional"],
 "III-6+III-10":["pueblos indigenas","adecuacion cultural","poblacion indigena"],
 "III-8":["27815","etica de la funcion publica","codigo de etica"],
 "IV-3+IV-5":["tamizaje","cribado","sensibilidad","especificidad","prueba diagnostica","valor predictivo"],
 "IV-4":["riesgo relativo","odds ratio","razon de momios","medidas de asociacion"],
 "IV-6+IV-7":["indicadores de salud","sala situacional","sistema de vigilancia"],
 "V-3":["niveles de atencion","referencia y contrarreferencia"],
 "V-7+V-10":[" sis ","aseguramiento universal"," aus ","seguro integral de salud"],
 "I-10":["alma ata","atencion primaria de salud"," aps "],
 "III-4+III-7":["violencia","aborto","maltrato","feminicidio"],
};
const result={}; // code -> [{key,area,n,rid,vimeo,firstSlide,nSlides,pct,hits}]
for(const s of sessions){
  const base=s.area.replace(/[^A-Za-z]/g,"")+"_"+s.tipo+"_"+s.n+"_"+s.rid;
  const txt=fs.readFileSync(dir+"txt/"+base+".txt","utf8");
  const slides=txt.split("\f");
  const nSlides=slides.length;
  const slidesN=slides.map(norm);
  for(const[code,kws]of Object.entries(KW)){
    let first=-1,hits=0;
    for(let i=0;i<slidesN.length;i++){const sl=slidesN[i];let h=0;for(const k of kws){if(sl.includes(k))h++;}if(h){hits+=h;if(first<0)first=i;}}
    if(hits>0){(result[code]=result[code]||[]).push({key:base,area:s.area,n:s.n,rid:s.rid,vimeo:s.vimeo,firstSlide:first+1,nSlides,pct:Math.round((first/(nSlides-1||1))*100),hits});}
  }
}
// rank each code's sessions by hits desc
for(const c of Object.keys(result))result[c].sort((a,b)=>b.hits-a.hits||a.firstSlide-b.firstSlide);
fs.writeFileSync(dir+"_tema_sesion_map.json",JSON.stringify(result,null,1));
// report
const allCodes=Object.keys(KW);
console.log("Codes with >=1 session match:",Object.keys(result).length,"/",allCodes.length);
const missing=allCodes.filter(c=>!result[c]);
console.log("NO MATCH:",missing.join(", ")||"(none)");
console.log("\n=== top session per code ===");
for(const c of allCodes){const r=result[c];if(!r){console.log(c.padEnd(12),"-- none");continue;}const t=r[0];console.log(c.padEnd(12),t.area.slice(0,16).padEnd(16),"S"+t.n,"slide "+t.firstSlide+"/"+t.nSlides+" ("+t.pct+"%)","hits="+t.hits,r.length>1?("+"+(r.length-1)+"more"):"");}
