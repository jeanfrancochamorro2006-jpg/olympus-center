import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Rocket,
  Handshake,
  ShieldCheck,
  Headphones,
  Check,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandLogos from "@/components/BrandLogos";

export const metadata: Metadata = {
  title: "Nosotros | OlympusCenter",
  description: "Conoce OlympusCenter, tu tienda especializada en hardware de PC.",
};

const stats = [
  { value: "+10K", label: "Clientes satisfechos" },
  { value: "+500", label: "Productos en catálogo" },
  { value: "24/7", label: "Soporte y asesoría" },
  { value: "100%", label: "Garantía oficial" },
];

const valores = [
  { icon: Target, title: "Calidad garantizada", desc: "Trabajamos solo con marcas oficiales y productos 100% originales." },
  { icon: Rocket, title: "Envío a todo el país", desc: "Despachamos de forma rápida y segura a nivel nacional." },
  { icon: Handshake, title: "Asesoría experta", desc: "Te ayudamos a armar la PC ideal para tus necesidades." },
  { icon: ShieldCheck, title: "Compra protegida", desc: "Pago seguro y garantía oficial en cada compra." },
];

const misionPoints = [
  "Productos originales con garantía del fabricante",
  "Precios competitivos y financiamiento en cuotas",
  "Asesoría personalizada antes y después de la compra",
];

export default function NosotrosPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 pt-4">
        <Breadcrumbs items={[{ label: "Nosotros" }]} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white mt-4">
        <div className="absolute -top-24 right-0 h-[400px] w-[400px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto px-5 py-14 text-center">
          <img src="/IMG/LOGO/logo1.png" alt="OlympusCenter" className="h-16 w-16 object-contain mx-auto mb-5" />
          <span className="font-retro inline-flex items-center gap-2 text-brand text-[0.6rem] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> NUESTRA EMPRESA
          </span>
          <h1 className="text-[2.2rem] md:text-[3rem] font-extrabold tracking-tight">
            Sobre <span className="text-brand">OlympusCenter</span>
          </h1>
          <p className="mt-4 text-white/65 max-w-[640px] mx-auto text-[1rem]">
            Somos una tienda especializada en hardware y componentes de PC. Nuestra
            misión es ofrecer productos originales, precios competitivos y una
            experiencia de compra confiable para gamers, profesionales y entusiastas
            de la tecnología.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-[1100px] mx-auto px-5 -mt-8 relative grid grid-cols-2 lg:grid-cols-4 gap-4 pb-10 lg:pb-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-surface border border-border rounded-2xl shadow-card p-6 text-center lg:-translate-y-8"
            >
              <p className="font-retro text-brand text-[1.1rem]">{s.value}</p>
              <p className="text-[0.82rem] text-slate mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-5 py-12 space-y-16">
        {/* Misión */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-retro text-brand text-[0.6rem]">NUESTRA MISIÓN</span>
            <h2 className="text-[1.8rem] font-extrabold text-ink mt-3 leading-tight">
              Hacer la tecnología de alto rendimiento accesible para todos
            </h2>
            <p className="text-slate mt-4">
              Desde nuestros inicios, ayudamos a miles de clientes a construir la
              computadora de sus sueños. Combinamos un catálogo curado de las
              mejores marcas con un equipo apasionado por la tecnología.
            </p>
            <ul className="mt-6 space-y-3">
              {misionPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.92rem] text-ink">
                  <span className="h-5 w-5 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full" />
            <div className="relative bg-gradient-to-br from-canvas to-white border border-border rounded-3xl p-8 grid place-items-center">
              <img
                src="/IMG/Case/case-asus-tuf-gaming-gt302-argb-white.png"
                alt="Setup OlympusCenter"
                className="max-h-[300px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Valores */}
        <section>
          <div className="text-center mb-8">
            <span className="font-retro text-brand text-[0.6rem]">POR QUÉ ELEGIRNOS</span>
            <h2 className="text-[1.8rem] font-extrabold text-ink mt-3">
              Lo que nos hace diferentes
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map((v) => (
              <div
                key={v.title}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-brand hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <span className="h-12 w-12 grid place-items-center rounded-xl bg-brand-soft text-brand">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="text-[1.05rem] font-bold text-ink mt-4">{v.title}</h3>
                <p className="text-slate text-[0.88rem] mt-1.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Marcas asociadas */}
        <section className="text-center">
          <span className="font-retro text-brand text-[0.6rem]">MARCAS ASOCIADAS</span>
          <h2 className="text-[1.8rem] font-extrabold text-ink mt-3 mb-2">
            Trabajamos con las mejores marcas
          </h2>
          <p className="text-slate mb-8 max-w-[560px] mx-auto">
            Somos distribuidores autorizados de las marcas líderes en hardware y
            componentes de PC.
          </p>
          <BrandLogos />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-ink text-white">
          <div className="absolute -bottom-20 -right-10 h-[300px] w-[300px] rounded-full bg-brand/25 blur-[100px]" />
          <div className="relative px-8 py-12 md:py-14 text-center">
            <h2 className="text-[1.7rem] md:text-[2.1rem] font-extrabold leading-tight">
              ¿Listo para armar tu PC ideal?
            </h2>
            <p className="text-white/65 mt-3 max-w-[520px] mx-auto">
              Explora nuestro catálogo o visítanos en tienda y recibe asesoría
              personalizada de nuestro equipo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link
                href="/productos"
                className="h-12 px-7 inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
              >
                Ver productos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tiendas"
                className="h-12 px-7 inline-flex items-center gap-2 rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                <Headphones className="h-4 w-4" /> Visitar tiendas
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
