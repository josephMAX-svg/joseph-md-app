import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mv-enter flex flex-col items-center gap-3 py-16 text-center">
      <div className="mv-accent" />
      <h2 className="font-serif text-2xl font-medium">Aquí no hay nada</h2>
      <p className="text-sm text-ink-muted">Esta página no existe.</p>
      <Link href="/" className="mv-btn-primary mt-2"><Home className="h-4 w-4" /> Volver a Hoy</Link>
    </div>
  );
}
