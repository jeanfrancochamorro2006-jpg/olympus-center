import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SeguimientoForm from "@/components/forms/SeguimientoForm";

export const metadata: Metadata = {
  title: "Seguimiento de pedido | OlympusCenter",
};

export default function SeguimientoPage() {
  return (
    <div className="max-w-[640px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Seguimiento" }]} />

      <h1 className="mt-5 mb-2 text-[1.8rem] font-extrabold text-ink">Sigue tu pedido</h1>
      <p className="text-slate mb-8">
        Ingresa tu número de pedido para conocer el estado de tu entrega.
      </p>

      <SeguimientoForm />
    </div>
  );
}
