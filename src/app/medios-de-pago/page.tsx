import type { Metadata } from "next";
import { CreditCard, Smartphone, Building2, Banknote } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Medios de pago | OlympusCenter",
  description: "Conoce todas las formas de pago disponibles en OlympusCenter.",
};

const metodos = [
  { icon: CreditCard, title: "Tarjetas", desc: "Visa, Mastercard, American Express. Hasta 12 cuotas." },
  { icon: Smartphone, title: "Billeteras digitales", desc: "Yape y Plin. Paga al instante con QR." },
  { icon: Building2, title: "Transferencia bancaria", desc: "BCP, BBVA, Interbank y Scotiabank." },
  { icon: Banknote, title: "Pago contra entrega", desc: "Paga en efectivo al recibir tu pedido (según zona)." },
];

export default function MediosDePagoPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Medios de pago" }]} />

      <h1 className="mt-5 mb-2 text-[1.8rem] font-extrabold text-ink">Medios de pago</h1>
      <p className="text-slate mb-8">
        Elige la forma de pago que más te convenga. Todas nuestras transacciones
        son 100% seguras.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {metodos.map((m) => (
          <div key={m.title} className="bg-surface border border-border rounded-xl p-6 flex gap-4">
            <span className="h-12 w-12 shrink-0 grid place-items-center rounded-xl bg-brand-soft text-brand">
              <m.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-[1.05rem] font-bold text-ink">{m.title}</h3>
              <p className="text-slate text-[0.9rem] mt-1">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-ink text-white rounded-2xl p-6 flex items-center gap-4">
        <span className="h-12 w-12 grid place-items-center rounded-xl bg-brand">
          <CreditCard className="h-6 w-6" />
        </span>
        <div>
          <p className="font-bold">Compra protegida</p>
          <p className="text-white/70 text-[0.88rem]">
            Tus datos viajan cifrados y nunca almacenamos información de tu tarjeta.
          </p>
        </div>
      </div>
    </div>
  );
}
