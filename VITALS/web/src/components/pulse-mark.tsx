/** Brand-mark animado: una línea de pulso/latido que se dibuja en bucle (movimiento sutil). */
export function PulseMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2 12 H7 L9.5 6 L13 18 L15.5 12 H22"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        pathLength={48} strokeDasharray="48"
        style={{ animation: "pulseDraw 2.6s ease-in-out infinite" }}
      />
    </svg>
  );
}
