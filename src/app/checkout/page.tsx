import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | OlympusCenter",
  description: "Finaliza tu compra de forma segura.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Carrito", href: "/carrito" }, { label: "Checkout" }]} />
      <h1 className="mt-5 mb-6 text-[1.6rem] font-extrabold text-ink">Finalizar compra</h1>
      <CheckoutView />
    </div>
  );
}
