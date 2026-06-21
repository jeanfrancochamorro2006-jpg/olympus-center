import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Garantía | OlympusCenter" };

export default function GarantiaPage() {
  return (
    <InfoPage
      title="Garantía"
      intro="Todos nuestros productos cuentan con garantía oficial del fabricante."
      sections={[
        { heading: "Cobertura", body: "La garantía cubre defectos de fabricación. El período varía según el producto y la marca, generalmente entre 12 y 36 meses." },
        { heading: "Qué no cubre", body: "No aplica a daños por mal uso, sobrevoltaje, manipulación indebida, líquidos o desgaste natural del producto." },
        { heading: "Cómo hacerla válida", body: "Conserva tu boleta o factura de compra. Con ella y tu número de pedido podrás iniciar el proceso de garantía con nosotros." },
        { heading: "Tiempo de respuesta", body: "Evaluamos cada caso en un plazo máximo de 72 horas hábiles y te informamos sobre la reparación, cambio o reembolso correspondiente." },
      ]}
    />
  );
}
