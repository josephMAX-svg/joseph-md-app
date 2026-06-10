/**
 * Template: se re-monta en CADA navegación → la transición de página corre cada vez.
 * Da la sensación "app de élite" al moverse entre secciones.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="mv-page">{children}</div>;
}
