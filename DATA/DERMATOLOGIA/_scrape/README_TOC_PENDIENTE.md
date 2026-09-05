# TOC clínicos de AccessDerma · PENDIENTE (requiere sesión logueada UF)

> Vacío nº 8 del análisis Palmerton v3 (05-sep-2026). **20 de los 70 átomos** de `src/lib/dermaDailyPlan.ts`
> apuntan a la PORTADA del libro (`book(2570)` Fitzpatrick's Dermatology 9e ×? · `book(2802)` Barnhill 4e ×5 ·
> `book(1913)` Weinberg 5e ×3 · `book(2960)` Guidebook ×3 · `book(3138)`/`book(2829)`/`book(3319)`/`book(2812)`/
> `book(2804)`/`book(2929)`) porque el TOC con `sectionid` solo se extrajo para el Color Atlas 9e (3309) y
> los 16 libros estéticos/quirúrgicos (`accessderma_estetica_tocs.json`, 740 capítulos).
> `dermatology.mhmedical.com` devuelve **403 a fetch anónimo** (SPEC Apéndice A) → NO se puede hacer desde
> un agente sin tu Chrome. Este README deja el método exacto para que lo ejecutes (o lo ejecute Claude con
> tu Chrome adjunto) en ~15 min.

## 1. Qué hay que extraer

| bookid | Libro | Para qué átomos | Prioridad |
|---|---|---|---|
| **2570** | Fitzpatrick's Dermatology 9e (texto de consulta post-fallo, PLAN_ELITE §5) | mapa `fitzCap` de los 70 átomos ("si fallas el caso, lee aquí 10′") + d3 | 🔴 |
| **2802** | Barnhill's Dermatopathology 4e | d29-d33 (módulo E) | 🔴 |
| **1913** | Weinberg's Pediatric Dermatology 5e | d34, d35, d38 (módulo F) | 🟡 |
| 2960 | Guidebook to Dermatologic Diagnosis | d2, d46, d69 | 🟡 |
| 2804 · 2929 | Dermoscopy Criteria Review · Dermoscopy Illustrated Self-Assessment 2e | d6, d26 + micro-track dermatoscopia | 🟡 |
| 3138 · 2829 · 3319 · 2812 | Kantor · Facial Flap · Margin Control · Cosmeceuticals | ya están en `accessderma_estetica_tocs.json` (B.5) → solo falta mapear capítulo en d41/d42/d43/d68 | 🟢 (sin scrape) |

Salida esperada: `DATA/DERMATOLOGIA/_scrape/accessderma_clinica_tocs.json` con **el mismo esquema** que
`accessderma_estetica_tocs.json`:

```json
{
 "fuente": "AccessDermatologyDxRx · TOCs clínicos · <fecha> · Chrome CDP sesión UF",
 "deepLink": "https://dermatology.mhmedical.com/content.aspx?bookid=<bookid>&sectionid=<sid>",
 "libros": {
  "2570": { "bookid": 2570, "bookTitle": "Fitzpatrick's Dermatology, 9e", "nParts": 0, "total": 0,
            "parts": [ { "part": "Part 1: …", "chapters": [ { "sid": "123456789", "t": "Chapter 1: …" } ] } ] }
 }
}
```

## 2. Método CDP exacto (el mismo que produjo los TOCs del 10-jun-2026)

Pre-requisito (una vez por máquina, ver `~/.claude/CLAUDE.md`): Chrome M144+ → `chrome://inspect/#remote-debugging`
→ activar "Allow remote debugging for this browser instance". Estar logueado en AccessDermatologyDxRx
(UF Remote Access / Smathers) en **ese** Chrome.

1. **Adjuntar** al Chrome activo con el MCP `chrome-devtools` (auto-connect; NO abrir sesión nueva: se
   perdería el login).
2. `navigate_page` → `https://dermatology.mhmedical.com/book.aspx?bookid=2570` y esperar a que cargue el
   panel "Table of Contents" (`wait_for` el texto "Table of Contents" o el selector `li.top-part`).
3. `evaluate_script` con el extractor (selectores documentados en el análisis v3: `book.aspx →
   a.topLevelPart → li.top-part a[href*=content.aspx]`; **re-verificar en vivo con `take_snapshot`** si el
   DOM cambió):

```js
() => {
  // Expande todas las partes colapsadas (si el TOC carga capítulos on-click)
  document.querySelectorAll('a.topLevelPart').forEach(a => { if (a.getAttribute('aria-expanded') === 'false') a.click(); });
  const parts = [...document.querySelectorAll('li.top-part')].map(li => ({
    part: (li.querySelector('a.topLevelPart') || li.querySelector('a'))?.textContent.trim(),
    chapters: [...li.querySelectorAll('a[href*="content.aspx"]')].map(a => ({
      sid: (a.getAttribute('href').match(/sectionid=(\d+)/) || [])[1] || null,
      t: a.textContent.replace(/\s+/g, ' ').trim(),
    })).filter(c => c.sid),
  }));
  const bookTitle = (document.querySelector('h1, .book-title')?.textContent || document.title).replace(/\s+/g, ' ').trim();
  const bookid = Number((location.search.match(/bookid=(\d+)/) || [])[1]);
  return { bookid, bookTitle, nParts: parts.length, total: parts.reduce((s, p) => s + p.chapters.length, 0), parts };
}
```

   Si `li.top-part` devuelve 0 nodos: el TOC de los libros clínicos puede cargar por capítulo bajo demanda
   (`a[data-sectionid]`) — en ese caso usar `[...document.querySelectorAll('a[href*="content.aspx?bookid=2570"]')]`
   como fallback y agrupar por el `h3/h4` previo.
4. Repetir para 2802 y 1913 (y 2960/2804/2929 si hay tiempo). Pegar los 3-6 objetos bajo `libros` en
   `accessderma_clinica_tocs.json`.
5. **Verificar** 3 deep-links al azar por libro con `navigate_page` (deben devolver 200 con el título del
   capítulo, como se hizo con los 62 links del plan).
6. Después (fuera de esta tarea, fichero de otro agente): regenerar `src/lib/dermaSourcesData.ts` (hoy está
   escrito a mano desde los JSON; no existe generador en `DATA/_scripts/`) → sustituir los `book()` de
   `dermaDailyPlan.ts` por `srcCap(bookid, sid)` y añadir `fitzCap?: { sid, t }` a los 70 átomos.

## 3. Por qué no se hizo hoy

- WebFetch/Claude sin tu Chrome → 403 en `mhmedical.com` (verificado en jun-2026 y documentado en el SPEC).
- El TOC estético se extrajo el 10-jun con tu sesión abierta; la sesión UF Remote Access caduca y hay que
  re-loguear a mano.

## 4. Checklist para marcarlo cerrado

- [ ] `accessderma_clinica_tocs.json` con 2570 + 2802 + 1913 (nParts/total > 0)
- [ ] 3 deep-links por libro verificados 200 con la sesión UF
- [ ] `dermaSourcesData.ts` regenerado · `dermaDailyPlan.ts` sin `book()` en lecturas (0/70)
- [ ] `fitzCap` en los 70 átomos → chip "si fallas el caso, lee aquí 10′" en DermaTodayPlan
