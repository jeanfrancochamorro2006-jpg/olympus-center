import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Términos y condiciones | OlympusCenter" };

export default function TerminosPage() {
  return (
    <InfoPage
      title="Términos y condiciones"
      intro="Al utilizar este sitio aceptas los siguientes términos y condiciones de uso."
      sections={[
        { heading: "Uso del sitio", body: "El contenido de OlympusCenter es solo para fines informativos y comerciales. Los precios y disponibilidad pueden cambiar sin previo aviso." },
        { heading: "Precios y pagos", body: "Todos los precios se muestran en soles (S/) e incluyen impuestos cuando corresponde. Aceptamos los medios de pago indicados en el proceso de compra." },
        { heading: "Propiedad intelectual", body: "Las marcas, logos e imágenes pertenecen a sus respectivos titulares y se usan únicamente con fines de identificación de los productos." },
        { heading: "Responsabilidad", body: "OlympusCenter no se responsabiliza por daños derivados del uso indebido de los productos adquiridos a través de la plataforma." },
      ]}
    />
  );
}
