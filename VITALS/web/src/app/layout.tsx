import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser, getUsers } from "@/lib/user";
import { mvHealth } from "@/lib/api";

const serif = Newsreader({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-serif", style: ["normal", "italic"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "VITALS · Pulso",
  description: "Ejercicio + nutrición medidos por IA: fotografía tu comida, registra por voz, mide tu adherencia.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "VITALS" },
};

export const viewport: Viewport = {
  themeColor: "#0B1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Degrada con gracia si el servicio de inteligencia no está arriba.
  let user = null, users: any[] = [], health = null;
  try {
    [user, users, health] = await Promise.all([getCurrentUser(), getUsers(), mvHealth()]);
  } catch {
    health = null;
  }

  return (
    <html lang="es-PE" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {user ? (
          <AppShell user={user} users={users} health={health}>
            {children}
          </AppShell>
        ) : (
          <ServiceDown />
        )}
      </body>
    </html>
  );
}

function ServiceDown() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="mv-accent" />
      <h1 className="font-serif text-2xl">Movimiento</h1>
      <p className="text-sm text-ink-muted">
        No puedo conectar con la capa de inteligencia. Levántala con:
      </p>
      <pre className="w-full overflow-x-auto rounded-xl bg-ink p-3 text-left text-xs text-ink-inverse">
        cd intelligence{"\n"}.venv\Scripts\python -m uvicorn app.main:app --port 8000
      </pre>
      <p className="text-xs text-ink-muted">Luego recarga esta página. Ver README.md.</p>
    </main>
  );
}
