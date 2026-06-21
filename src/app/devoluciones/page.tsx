import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Cambios y devoluciones | OlympusCenter" };

export default function DevolucionesPage() {
  return (
    <InfoPage
      title="Cambios y devoluciones"
      intro="Tu satisfacción es lo más importante. Conoce nuestra política de cambios y devoluciones."
      sections={[
        { heading: "Plazo de devolución", body: "Cuentas con 7 días calendario desde la recepción del producto para solicitar un cambio o devolución, siempre que el producto se encuentre en su empaque original y sin uso." },
        { heading: "Productos defectuosos", body: "Si recibes un producto con fallas de fábrica, lo cambiamos sin costo adicional. Solo contáctanos con tu número de pedido." },
        { heading: "Cómo solicitarlo", body: "Escríbenos a ventas@olympuscenter.com indicando tu número de pedido y el motivo. Nuestro equipo te guiará en todo el proceso." },
        { heading: "Reembolsos", body: "Los reembolsos se procesan a través del mismo medio de pago utilizado, en un plazo de 5 a 10 días hábiles tras aprobar la devolución." },
      ]}
    />
  );
}
