"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Motor de scroll-reveal (un solo IntersectionObserver para toda la app). Marca con `data-in`
 * los elementos `.mv-reveal` cuando entran al viewport → entrada cinematográfica al hacer scroll.
 * Usa un data-attribute (no una clase) para no chocar con la hidratación de React: React ignora
 * atributos que él no renderizó, pero un className mutado dispara el warning de mismatch.
 * Se re-escanea en cada navegación. Respeta prefers-reduced-motion (el CSS los muestra de una).
 */
export function ScrollFX() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const scan = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".mv-reveal:not([data-in])"));
      if (reduce) { els.forEach((e) => (e.dataset.in = "1")); return; }
      els.forEach((el) => obs.observe(el));
    };
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "1";
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    // Escanea ahora y un par de veces tras la hidratación/datos.
    scan();
    const t1 = setTimeout(scan, 120);
    const t2 = setTimeout(scan, 400);
    return () => { obs.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);
  return null;
}
