import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoresSection from "@/components/StoresSection";

export const metadata: Metadata = {
  title: "Tiendas | OlympusCenter",
  description: "Visita nuestras tiendas físicas y encuéntranos en el mapa.",
};

export default function TiendasPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Tiendas" }]} />

      <h1 className="mt-5 mb-2 text-[1.8rem] font-extrabold text-ink">Nuestras tiendas</h1>
      <p className="text-slate mb-8">
        Visítanos y recibe asesoría personalizada. Encuéntranos en el mapa.
      </p>

      <StoresSection />
    </div>
  );
}
