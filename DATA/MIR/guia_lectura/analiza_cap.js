async () => {
  const _sl = (ms) => new Promise((r) => setTimeout(r, ms));
  let _prev = -1, _stable = 0;
  for (let i = 0; i < 60 && _stable < 3; i++) { const _h2 = document.querySelector('h2'); const _ok = _h2 && _h2.innerText.trim().length > 3 && !/Cargando/.test(document.body.innerText.slice(0, 400)) && document.querySelector('.listenAudioButton, .orientacionMir, h3'); const n = document.querySelectorAll('h3').length + document.querySelectorAll('p').length; if (_ok && n > 5 && n === _prev) _stable++; else _stable = 0; _prev = n; await _sl(500); }
  for (let i = 0; i < 16; i++) { const vs = [...document.querySelectorAll('video')]; if (vs.every((v) => v.duration > 0)) break; vs.forEach((v) => { try { if (v.preload !== 'metadata') { v.preload = 'metadata'; v.load(); } } catch (e) {} }); await _sl(500); }
  // Analizador de capítulo ProMIR (SOLO LECTURA). Secciones = H2/H3/H4 visibles del cuerpo del capítulo.
  // Palabras: bloques <p>/<li> (sin tablas ni SVG), quitando guiones blandos (U+00AD) y deduplicando el texto que la maquetación
  // en columnas repite cuando un párrafo cruza de columna. Citas MIR = enlaces a.quiestion-reference (/pregunta/MIR/AAAA-NNN), únicas por href.
  const norm = (t) => (t || '').replace(/­/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const nPal = (t) => (norm(t).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+(?:[-'’][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+)*/g) || []).length;
  const h2 = document.querySelector('h2');
  if (!h2) return { error: 'sin h2 (¿no cargó?)' };
  const h3s = [...document.querySelectorAll('h3')].filter((h) => h.offsetParent);
  let cont = h2.parentElement;
  while (cont && !h3s.every((h) => cont.contains(h))) cont = cont.parentElement;
  if (!cont) return { error: 'sin contenedor' };
  const vistos = new Set();
  const heads = [...cont.querySelectorAll('h2,h3,h4')].filter((h) => h.offsetParent && norm(h.innerText) && !vistos.has(norm(h.innerText)) && vistos.add(norm(h.innerText)));
  const secs = heads.map((h) => ({ nivel: h.tagName, titulo: norm(h.innerText), palabras: 0, palabrasTabla: 0, citas: new Set(), figs: new Set(), tablas: new Set(), videos: [] }));
  const idxDe = (node) => { let k = -1; for (let i = 0; i < heads.length; i++) { const p = heads[i].compareDocumentPosition(node); if (p & Node.DOCUMENT_POSITION_FOLLOWING || heads[i] === node) k = i; else break; } return k; };
  // bloques de texto corrido: cada nodo de texto se asigna a su bloque más cercano (p · li · div.ul-item · figcaption); el texto PROPIO de
  // cada bloque se deduplica (la maquetación en columnas repite el bloque entero cuando cruza de columna). Fuera: tablas, SVG, headings, audio.
  const BLK = 'p, li, div.ul-item, figcaption';
  const propio = new Map();
  const tw = document.createTreeWalker(cont, NodeFilter.SHOW_TEXT); let tn;
  while ((tn = tw.nextNode())) {
    const el = tn.parentElement; if (!el || el.closest('.tableWrapper, svg, a.svgWrapper, h2, h3, h4, button, .rh5v-Time_component')) continue;
    const blk = el.closest(BLK); if (!blk || !cont.contains(blk)) continue;
    propio.set(blk, (propio.get(blk) || '') + ' ' + tn.textContent);
  }
  const textos = new Set();
  for (const [blk, txt] of propio) {
    const t = norm(txt); if (!t || textos.has(t)) continue; textos.add(t);
    const k = idxDe(blk); if (k < 0) continue;
    secs[k].palabras += nPal(t.replace(/\(?MIR \d{4}-\d{4}, ?P\d+\)?/g, ''));
  }
  for (const a of cont.querySelectorAll('a.quiestion-reference')) { const k = idxDe(a); if (k >= 0) secs[k].citas.add(a.getAttribute('href')); }
  const recVistos = new Set();
  for (const e of cont.querySelectorAll('.recuerdaMir')) { const t = norm(e.innerText).slice(0, 60); if (!t || recVistos.has(t)) continue; recVistos.add(t); const k = idxDe(e); if (k >= 0) secs[k].recuerda = (secs[k].recuerda || 0) + 1; }
  const figVistas = new Set();
  for (const a of cont.querySelectorAll('a.svgWrapper, img')) { const id = a.getAttribute('href') || a.src; if (figVistas.has(id)) continue; figVistas.add(id); const k = idxDe(a); if (k >= 0) secs[k].figs.add(id); }
  const tabVistas = new Set();
  for (const t of cont.querySelectorAll('.tableWrapper')) {
    const cap = norm(t.innerText).slice(0, 90); const clave = cap.slice(0, 40);
    if (tabVistas.has(clave)) continue; tabVistas.add(clave);
    const k = idxDe(t); if (k < 0) continue;
    secs[k].tablas.add(cap.replace(/^(Tabla [\d-]+\.[^A-Z]*?[a-z)]+) .*$/, '$1').slice(0, 90));
    secs[k].palabrasTabla += nPal(t.innerText);
  }
  const vidVistos = new Set();
  for (const v of cont.querySelectorAll('video')) {
    const src = (v.currentSrc || v.src || '').split('/').pop(); if (vidVistos.has(src)) continue; vidVistos.add(src);
    const fig = v.closest('figure'); const fc = fig && fig.querySelector('figcaption'); const leyenda = fc ? [norm(fc.textContent)] : null;
    const k = idxDe(v); if (k >= 0) secs[k].videos.push({ id: src, seg: Math.round(v.duration || 0), leyenda: leyenda ? leyenda[0].slice(0, 120) : null });
  }
  const out = secs.map((s) => {
    const citas = [...s.citas].map((h) => h.replace('/pregunta/MIR/', ''));
    return { nivel: s.nivel, titulo: s.titulo, palabras: s.palabras, palabrasTabla: s.palabrasTabla, citasMIR: citas.length, citasMIRdesde2015: citas.filter((c) => +c.slice(0, 4) >= 2015).length, citasMIRdesde2020: citas.filter((c) => +c.slice(0, 4) >= 2020).length, citas, figs: s.figs.size, tablas: [...s.tablas], videos: s.videos, recuerda: s.recuerda || 0 };
  });
  const orient = [...cont.querySelectorAll('*')].find((e) => /^Orientación MIR/.test(norm(e.innerText)) && e.children.length < 6);
  const nav = [...document.querySelectorAll('a.cubreFlecha')].map((a) => ({ t: norm(a.innerText), href: a.getAttribute('href') }));
  return {
    titulo: document.title, url: location.href, audioTema: !!document.querySelector('.listenAudioButton'),
    orientacionMIR: orient ? norm(orient.innerText).slice(0, 400) : null,
    secciones: out, nav,
    totPalabras: out.reduce((x, s) => x + s.palabras, 0), totPalabrasTabla: out.reduce((x, s) => x + s.palabrasTabla, 0),
    totCitas: out.reduce((x, s) => x + s.citasMIR, 0), totFigs: out.reduce((x, s) => x + s.figs, 0), totTablas: out.reduce((x, s) => x + s.tablas.length, 0), totRecuerda: out.reduce((x, s) => x + s.recuerda, 0),
  };
}
