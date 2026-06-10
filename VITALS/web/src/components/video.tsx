"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X, Youtube, GraduationCap, ListMusic, Check, Zap, BookOpen } from "lucide-react";
import { Tutorial, Clip, ytSearchUrl, ytThumb, BAILE_TRACKS } from "@/lib/tutorials";

/* ─────────────────────────────────────────────────────────────────────────────
 * IFrame API de YouTube (carga única). La usamos por dos razones:
 * 1. onError 101/150 (canal con embedding deshabilitado) → degradar al botón de búsqueda.
 * 2. onStateChange === 0 (ENDED) → encadenar la playlist de baile (sesión continua).
 * Parámetros: rel=0 (sugerencias del mismo canal) + playsinline=1 (iOS).
 * `modestbranding` NO se usa (ignorado por YouTube desde ago-2023).
 * ──────────────────────────────────────────────────────────────────────────── */
let ytApiPromise: Promise<any> | null = null;
function loadYT(): Promise<any> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const w = window as any;
    if (w.YT && w.YT.Player) { resolve(w.YT); return; }
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => { prev?.(); resolve(w.YT); };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

/** Player controlado: un video (con start/end opcional) o una lista encadenada. */
function YTPlayer({ ids, start, end, title, onFail, onTrack }: {
  ids: string[]; start?: number; end?: number; title?: string;
  onFail: () => void; onTrack?: (i: number) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    let alive = true;
    loadYT().then((YT) => {
      if (!alive || !hostRef.current) return;
      const next = () => {
        idxRef.current = (idxRef.current + 1) % ids.length; // al acabar la última, reinicia la sesión
        onTrack?.(idxRef.current);
        playerRef.current?.loadVideoById(ids[idxRef.current]);
      };
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: ids[0],
        playerVars: {
          autoplay: 1, rel: 0, playsinline: 1,
          ...(ids.length === 1 && start != null ? { start } : {}),
          ...(ids.length === 1 && end != null ? { end } : {}),
        },
        events: {
          onError: (e: any) => {
            // 101/150 = embedding deshabilitado; 100 = video removido; 2 = id inválido.
            if (![101, 150, 100, 2].includes(e?.data)) return;
            if (ids.length > 1 && idxRef.current < ids.length - 1) next();
            else onFail();
          },
          onStateChange: (e: any) => { if (e?.data === 0 && ids.length > 1) next(); },
        },
      });
    });
    return () => { alive = false; try { playerRef.current?.destroy(); } catch { /* ya desmontado */ } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full" title={title}>
      <div ref={hostRef} className="h-full w-full" />
    </div>
  );
}

/** Fallback honesto: búsqueda en YouTube (nunca un enlace muerto). */
function SearchLink({ tutorial, note }: { tutorial: Tutorial; note?: string }) {
  return (
    <a href={ytSearchUrl(tutorial.q)} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-line bg-raised p-3 active:scale-[0.99]">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger-subtle text-danger"><Youtube className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{note || "Ver técnica en YouTube"}</p>
        <p className="truncate text-xs text-ink-muted">{tutorial.creator}</p>
      </div>
      <Play className="h-4 w-4 text-ink-muted" />
    </a>
  );
}

const TRACK_TITLE: Record<string, string> = Object.fromEntries(BAILE_TRACKS.map((t) => [t.id, t.titulo]));

/** Embed "lite" (facade): miniatura primero, el player carga solo al tocar.
 *  Dos niveles: ⚡ Express (corto, por defecto) y A fondo. Soporta sesión continua (playlist). */
export function VideoEmbed({ tutorial, title }: { tutorial: Tutorial; title?: string }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [track, setTrack] = useState(0);
  const [nivel, setNivel] = useState<"express" | "fondo">("express");

  const esSesion = !!tutorial.playlist?.length && tutorial.playlist.length > 1;
  const clip: Clip | undefined = nivel === "fondo" && tutorial.fondo ? tutorial.fondo : tutorial.express || (tutorial.yt ? { yt: tutorial.yt, creator: tutorial.creator, dur: "" } : undefined);
  const ids = esSesion ? tutorial.playlist! : clip ? [clip.yt] : [];
  if (!ids.length || failed) {
    return <SearchLink tutorial={tutorial} note={failed ? "Ver en YouTube (no se puede reproducir aquí)" : undefined} />;
  }
  const tieneNiveles = !esSesion && !!tutorial.express && !!tutorial.fondo;
  const credito = esSesion ? tutorial.creator : clip?.creator || tutorial.creator;

  return (
    <div>
      {/* Subtarea corta por defecto: chips ⚡ Express / A fondo */}
      {tieneNiveles && (
        <div className="mb-2 flex gap-1.5">
          <button onClick={() => { setNivel("express"); }}
            className={`mv-chip transition ${nivel === "express" ? "bg-brass text-ink-inverse" : "bg-subtle text-ink-secondary"}`}>
            <Zap className="h-3 w-3" /> Express · {tutorial.express!.dur}
          </button>
          <button onClick={() => { setNivel("fondo"); }}
            className={`mv-chip transition ${nivel === "fondo" ? "bg-brass text-ink-inverse" : "bg-subtle text-ink-secondary"}`}>
            <BookOpen className="h-3 w-3" /> A fondo · {tutorial.fondo!.dur}
          </button>
        </div>
      )}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#060d1a]">
        {playing ? (
          <YTPlayer key={esSesion ? "sesion" : `${nivel}-${ids[0]}`} ids={ids} start={tutorial.start} end={tutorial.end} title={title} onFail={() => setFailed(true)} onTrack={setTrack} />
        ) : (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={esSesion ? "Iniciar sesión de baile" : "Reproducir tutorial"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ytThumb(ids[0])} alt={title || "Tutorial"} className="h-full w-full object-cover opacity-90 transition group-hover:scale-105" loading="lazy" />
            <span className="absolute inset-0 flex items-center justify-center bg-[#060d1a]/35">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink-inverse shadow-lg transition group-hover:scale-110">
                <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
              </span>
            </span>
            {esSesion ? (
              <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-[#060d1a]/75 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur">
                <ListMusic className="h-3.5 w-3.5 text-brass" /> Sesión continua · {ids.length} coreografías · ~45 min
              </span>
            ) : clip?.dur ? (
              <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-[#060d1a]/75 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur">
                <Zap className="h-3.5 w-3.5 text-brass" /> {clip.dur}
              </span>
            ) : null}
          </button>
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] text-ink-muted">
          <GraduationCap className="h-3 w-3" /> {credito}{esSesion && playing ? ` · pista ${track + 1}/${ids.length}` : ""}
        </span>
        <a href={ytSearchUrl(tutorial.q)} target="_blank" rel="noopener noreferrer" className="text-[11px] text-brass">más videos ↗</a>
      </div>
      {/* Tracklist del baile: cada pista es una subtarea de ~4 min */}
      {esSesion && playing && (
        <ol className="mt-2.5 max-h-44 space-y-1 overflow-y-auto no-scrollbar">
          {ids.map((id, i) => (
            <li key={id} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs ${i === track ? "bg-brass-subtle text-brass-deep" : i < track ? "text-ink-muted line-through" : "text-ink-secondary"}`}>
              {i === track ? <Play className="h-3 w-3 shrink-0" fill="currentColor" /> : i < track ? <Check className="h-3 w-3 shrink-0" /> : <span className="w-3 text-center text-[10px] tabular-nums">{i + 1}</span>}
              <span className="truncate">{TRACK_TITLE[id] || `Pista ${i + 1}`}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Tarjeta de técnica "de la casa Pulso": nombre del ejercicio + prescripción del motor +
 *  claves de técnica + player embebido. El video vive DENTRO de la app, no es un link que te saca. */
export function TecnicaCard({ nombre, detalle, tutorial, label = "Técnica de hoy" }: {
  nombre: string; detalle?: string; tutorial: Tutorial; label?: string;
}) {
  return (
    <div className="mv-card">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-brass" /><span className="mv-label">{label}</span></span>
        {detalle && <span className="text-[11px] tabular-nums text-ink-muted">{detalle}</span>}
      </div>
      <p className="mb-2.5 font-serif text-lg font-medium leading-tight">{nombre}</p>
      <VideoEmbed tutorial={tutorial} title={nombre} />
      {tutorial.cues?.length ? (
        <ul className="mt-3 space-y-1.5">
          {tutorial.cues.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs text-ink-secondary">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" /> {c}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Botón "Ver técnica" que abre un modal con la tarjeta completa (player + claves). */
export function VideoButton({ tutorial, title }: { tutorial: Tutorial; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-subtle text-brass-deep active:scale-95" aria-label={`Ver técnica de ${title}`}>
        <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-[#060d1a]/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-lg rounded-t-3xl bg-elevated p-4 shadow-lg sm:rounded-3xl mv-enter" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <div><p className="mv-label">Técnica</p><p className="font-serif text-lg font-medium">{title}</p></div>
              <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-line"><X className="h-5 w-5" /></button>
            </div>
            <VideoEmbed tutorial={tutorial} title={title} />
            {tutorial.cues?.length ? (
              <ul className="mt-3 space-y-1.5">
                {tutorial.cues.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-ink-secondary">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" /> {c}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
