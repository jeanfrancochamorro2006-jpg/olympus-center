import type { Metadata } from "next";
import Link from "next/link";
import { Package, Undo2, ShieldCheck, Truck, Plus } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Centro de ayuda | OlympusCenter",
  description: "Encuentra respuestas a las preguntas más frecuentes.",
};

const temas = [
  { icon: Package, title: "Envíos y entregas", desc: "Tiempos, cobertura y costos.", href: "/envios" },
  { icon: Undo2, title: "Cambios y devoluciones", desc: "Cómo devolver un producto.", href: "/devoluciones" },
  { icon: ShieldCheck, title: "Garantía", desc: "Cobertura y cómo hacerla válida.", href: "/garantia" },
  { icon: Truck, title: "Seguir mi pedido", desc: "Conoce el estado de tu compra.", href: "/seguimiento" },
];

const faqs = [
  { q: "¿Cuánto demora la entrega?", a: "Entre 1 y 5 días hábiles según tu ubicación." },
  { q: "¿Los productos son originales?", a: "Sí, todos son originales con garantía oficial del fabricante." },
  { q: "¿Qué medios de pago aceptan?", a: "Visa, Mastercard, Yape y transferencia bancaria." },
  { q: "¿Puedo recoger en tienda?", a: "Sí, sin costo presentando tu documento de identidad." },
];

export default function AyudaPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Ayuda" }]} />

      <h1 className="mt-5 mb-2 text-[1.8rem] font-extrabold text-ink">
        ¿Cómo podemos ayudarte?
      </h1>
      <p className="text-slate mb-8">
        Explora los temas más consultados o contáctanos directamente.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {temas.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="bg-surface border border-border rounded-xl p-5 hover:border-brand hover:shadow-card transition-all"
          >
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-brand-soft text-brand">
              <t.icon className="h-5 w-5" />
            </span>
            <h3 className="text-[1rem] font-bold text-ink mt-3">{t.title}</h3>
            <p className="text-slate text-[0.85rem] mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-[1.3rem] font-extrabold text-ink mb-4">
        Preguntas frecuentes
      </h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group bg-surface border border-border rounded-xl p-4"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-ink">
              {f.q}
              <Plus className="h-4 w-4 text-brand transition-transform group-open:rotate-45" />
            </summary>
            <p className="text-slate text-[0.9rem] mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
