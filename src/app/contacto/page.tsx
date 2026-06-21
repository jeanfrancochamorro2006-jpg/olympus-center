import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactoForm from "@/components/forms/ContactoForm";

export const metadata: Metadata = {
  title: "Contacto | OlympusCenter",
  description: "Comunícate con el equipo de OlympusCenter.",
};

const canales = [
  { icon: Mail, title: "Correo", value: "ventas@olympuscenter.com" },
  { icon: Phone, title: "Teléfono", value: "+51 999 888 777" },
  { icon: MessageCircle, title: "WhatsApp", value: "+51 999 888 777" },
  { icon: MapPin, title: "Dirección", value: "Av. Tecnológica 123, Lima" },
];

export default function ContactoPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: "Contacto" }]} />

      <h1 className="mt-5 mb-2 text-[1.8rem] font-extrabold text-ink">Contáctanos</h1>
      <p className="text-slate mb-8">
        ¿Tienes una consulta? Escríbenos y te responderemos a la brevedad.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Canales */}
        <div className="space-y-3">
          {canales.map((c) => (
            <div
              key={c.title}
              className="flex items-center gap-4 bg-surface border border-border rounded-xl p-4"
            >
              <span className="h-10 w-10 shrink-0 grid place-items-center rounded-lg bg-brand-soft text-brand">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.78rem] text-muted font-semibold uppercase">
                  {c.title}
                </p>
                <p className="text-ink font-medium">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <ContactoForm />
      </div>
    </div>
  );
}
