// Service Worker Pulso Movimiento — conservador: cachea SOLO estáticos inmutables (con hash) e iconos.
// NUNCA intercepta /api/*, páginas con datos del usuario ni /uploads (van directo a la red).
// Habilita instalación PWA + base para push (recordatorios de entreno/dosis a futuro).

const VERSION = "mv-sw-v1";
const STATIC_CACHE = `static-${VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((c) => c.addAll(["/icon.svg", "/manifest.webmanifest"]).catch(() => {})),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Cache-first SOLO para estáticos inmutables + iconos/fuentes.
  const esEstatico =
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:js|css|woff2?|png|svg|webp|ico)$/.test(url.pathname);
  if (!esEstatico) return; // dinámico (páginas con datos, /api, /uploads) → red directa

  event.respondWith(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const hit = await cache.match(request);
      if (hit) return hit;
      try {
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      } catch {
        return hit || Response.error();
      }
    }),
  );
});

// Cola offline (base): registra acciones cuando no hay red y sincroniza al volver.
// La UI escribe en IndexedDB; aquí se haría el background sync. Capa futura (ver CHECKLIST).
self.addEventListener("sync", (event) => {
  if (event.tag === "mv-sync") {
    // event.waitUntil(reproducirColaPendiente());
  }
});
