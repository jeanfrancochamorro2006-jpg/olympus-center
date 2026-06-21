import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Truck, CreditCard } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import NewsletterForm from "@/components/NewsletterForm";

const cols = [
  {
    title: "Productos",
    links: [
      { label: "Todos los productos", href: "/productos" },
      { label: "Procesadores", href: "/productos?cat=procesadores" },
      { label: "Tarjetas Gráficas", href: "/productos?cat=tarjetas" },
      { label: "Placas Base", href: "/productos?cat=placas" },
      { label: "Almacenamiento", href: "/productos?cat=almacenamiento" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Seguimiento de pedido", href: "/seguimiento" },
      { label: "Envíos y entregas", href: "/envios" },
      { label: "Cambios y devoluciones", href: "/devoluciones" },
      { label: "Garantía", href: "/garantia" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Tiendas", href: "/tiendas" },
      { label: "Medios de pago", href: "/medios-de-pago" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de privacidad", href: "/privacidad" },
    ],
  },
  {
    title: "Mi cuenta",
    links: [
      { label: "Iniciar sesión", href: "/login" },
      { label: "Crear cuenta", href: "/registro" },
      { label: "Mi carrito", href: "/carrito" },
      { label: "Contáctanos", href: "/contacto" },
    ],
  },
];

const features = [
  { icon: Truck, t: "Envío a todo el país", d: "Rápido y seguro" },
  { icon: ShieldCheck, t: "Garantía oficial", d: "En todos los productos" },
  { icon: CreditCard, t: "Pago seguro", d: "Hasta 12 cuotas" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 mt-12">
      {/* Barra de acento */}
      <div className="h-1 bg-gradient-to-r from-brand via-brand-dark to-brand" />

      {/* Features */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {features.map((f) => (
            <div key={f.t} className="flex items-center gap-3 px-2 py-5 justify-center sm:justify-start">
              <span className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-brand/15 text-brand">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-white font-semibold text-[0.9rem] leading-tight">{f.t}</p>
                <p className="text-[0.78rem] text-white/55">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h3 className="text-white font-extrabold text-[1.1rem]">Suscríbete y recibe ofertas exclusivas</h3>
            <p className="text-[0.85rem]">Novedades, descuentos y lanzamientos directo en tu correo.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Columnas */}
      <div className="max-w-[1200px] mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-12 gap-8">
        {/* Marca */}
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <img src="/IMG/LOGO/logo1.png" alt="OlympusCenter" className="h-10 w-10 object-contain" />
            <span className="leading-none">
              <span className="font-retro block text-white text-[0.85rem]">OLYMPUS</span>
              <span className="font-retro block text-brand text-[0.48rem] tracking-[0.25em] mt-1.5">CENTER</span>
            </span>
          </div>
          <p className="text-[0.85rem] max-w-[280px]">
            Tu tienda especializada en hardware y componentes de PC. Calidad,
            garantía y los mejores precios del mercado.
          </p>
          <div className="mt-5 space-y-2 text-[0.82rem]">
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-brand shrink-0" /> ventas@olympuscenter.com
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-brand shrink-0" /> +51 999 888 777
            </p>
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-brand shrink-0" /> Av. Tecnológica 123, Lima
            </p>
          </div>
          <div className="mt-5">
            <p className="text-white/50 text-[0.75rem] mb-2">Síguenos</p>
            <SocialLinks />
          </div>
        </div>

        {/* Enlaces */}
        {cols.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h3 className="text-white font-bold text-[0.92rem] mb-4 relative inline-block after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-6 after:rounded-full after:bg-brand after:content-['']">
              {col.title}
            </h3>
            <ul className="space-y-2.5 list-none">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.83rem] hover:text-brand hover:pl-1 transition-all inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.8rem] text-white/55">
          <p>© 2026 OlympusCenter — Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-white/40 mr-1">Pago seguro:</span>
            {["VISA", "Mastercard", "Yape", "Plin"].map((m) => (
              <span
                key={m}
                className="h-7 px-2.5 grid place-items-center rounded bg-white text-ink text-[0.68rem] font-bold"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
