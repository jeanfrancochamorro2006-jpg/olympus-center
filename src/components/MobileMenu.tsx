"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User, ShoppingCart, Phone, ChevronRight } from "lucide-react";
import { categories } from "@/lib/catalog";
import { getCategoryIcon } from "@/lib/icons";
import SocialLinks from "@/components/SocialLinks";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Medios de pago", href: "/medios-de-pago" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Contáctanos", href: "/contacto" },
  { label: "Nosotros", href: "/nosotros" },
];

const WHATSAPP = "+51 999 888 777";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="md:hidden h-10 w-10 grid place-items-center rounded-lg text-white hover:bg-white/10 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-[70] h-full w-[82%] max-w-[320px] bg-surface shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-4 h-14 bg-ink">
          <Link href="/" className="flex items-center gap-2">
            <img src="/IMG/LOGO/logo1.png" alt="OlympusCenter" className="h-8 w-8 object-contain" />
            <span className="font-retro text-white text-[0.7rem]">OLYMPUS</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="h-9 w-9 grid place-items-center rounded-lg text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Acciones rápidas */}
          <div className="flex gap-2 p-4 border-b border-border">
            <Link
              href="/login"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-border text-[0.85rem] font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
            >
              <User className="h-4 w-4" /> Mi cuenta
            </Link>
            <Link
              href="/carrito"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-brand text-white text-[0.85rem] font-semibold hover:bg-brand-dark transition-colors"
            >
              <ShoppingCart className="h-4 w-4" /> Carrito
            </Link>
          </div>

          {/* Navegación */}
          <nav className="py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 text-[0.92rem] font-semibold border-l-4 transition-colors ${
                  isActive(item.href)
                    ? "border-brand text-brand bg-brand-soft"
                    : "border-transparent text-ink hover:bg-canvas"
                }`}
              >
                {item.label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </nav>

          {/* Categorías */}
          <div className="px-4 pt-3 pb-2">
            <p className="font-retro text-[0.62rem] text-muted">CATEGORÍAS</p>
          </div>
          <div className="pb-2">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/productos?cat=${cat.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-[0.88rem] text-slate hover:bg-canvas hover:text-brand transition-colors"
                >
                  <span className="h-8 w-8 grid place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pie: contacto + redes */}
        <div className="border-t border-border p-4 bg-ink">
          <a
            href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-[0.85rem] font-semibold mb-3"
          >
            <span className="h-8 w-8 grid place-items-center rounded-full bg-success">
              <Phone className="h-4 w-4" />
            </span>
            {WHATSAPP}
          </a>
          <SocialLinks />
        </div>
      </aside>
    </>
  );
}
