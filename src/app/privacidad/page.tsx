import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Política de privacidad | OlympusCenter" };

export default function PrivacidadPage() {
  return (
    <InfoPage
      title="Política de privacidad"
      intro="Protegemos tus datos personales y respetamos tu privacidad."
      sections={[
        { heading: "Datos que recopilamos", body: "Recopilamos los datos que nos proporcionas al crear una cuenta o realizar una compra: nombre, correo, teléfono y dirección de envío." },
        { heading: "Uso de la información", body: "Usamos tus datos para procesar pedidos, brindar soporte y mejorar tu experiencia. No vendemos ni compartimos tu información con terceros sin tu consentimiento." },
        { heading: "Seguridad", body: "Aplicamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados, pérdida o alteración." },
        { heading: "Tus derechos", body: "Puedes solicitar acceso, rectificación o eliminación de tus datos personales escribiéndonos a ventas@olympuscenter.com." },
      ]}
    />
  );
}
