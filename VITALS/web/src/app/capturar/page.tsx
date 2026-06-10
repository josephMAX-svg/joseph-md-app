import { PageHeader } from "@/components/ui";
import { Capture } from "@/components/capture";

export const dynamic = "force-dynamic";

export default function CapturarPage() {
  return (
    <div className="mv-enter lg:mx-auto lg:max-w-2xl">
      <PageHeader label="Captura por foto" title="¿Qué registramos?" subtitle="La IA identifica y mide. Tú casi no escribes." />
      <Capture />
    </div>
  );
}
