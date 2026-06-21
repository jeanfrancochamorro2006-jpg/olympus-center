import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Envíos y entregas | OlympusCenter" };

export default function EnviosPage() {
  return (
    <InfoPage
      title="Envíos y entregas"
      intro="Llevamos tus componentes hasta la puerta de tu casa de forma rápida y segura."
      sections={[
        { heading: "Cobertura nacional", body: "Realizamos envíos a todas las regiones del país. Los tiempos de entrega varían entre 1 y 5 días hábiles según tu ubicación." },
        { heading: "Envío gratis", body: "Productos marcados con la etiqueta “Envío gratis” no tienen costo de despacho. En el resto de casos el costo se calcula según el destino." },
        { heading: "Seguimiento", body: "Una vez despachado tu pedido recibirás un código de seguimiento por correo para conocer el estado de tu entrega en tiempo real." },
        { heading: "Recojo en tienda", body: "También puedes recoger tu pedido sin costo en nuestras tiendas físicas presentando tu documento de identidad." },
      ]}
    />
  );
}
