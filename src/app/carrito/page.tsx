import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito de compras | OlympusCenter",
};

export default function CarritoPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Carrito" }]} />
      <h1 className="mt-5 mb-6 text-[1.6rem] font-extrabold text-ink">Tu carrito</h1>
      <CartView />
    </div>
  );
}
