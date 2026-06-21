import Link from "next/link";
import { Search, ShoppingCart, User, Phone } from "lucide-react";
import CartBadge from "@/components/cart/CartBadge";
import CategoriesMenu from "@/components/CategoriesMenu";
import SocialLinks from "@/components/SocialLinks";
import TopNav from "@/components/TopNav";
import MobileMenu from "@/components/MobileMenu";

const WHATSAPP = "+51 999 888 777";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      {/* Barra superior: logo + navegación */}
      <div className="bg-ink">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex items-center justify-between gap-3 h-14">
          <div className="flex items-center gap-1">
            {/* Menú móvil */}
            <MobileMenu />
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/IMG/LOGO/logo1.png" alt="OlympusCenter" className="h-9 w-9 object-contain" />
              <span className="leading-none">
                <span className="font-retro block text-white text-[0.72rem] sm:text-[0.78rem] leading-none">OLYMPUS</span>
                <span className="font-retro block text-brand text-[0.4rem] sm:text-[0.42rem] tracking-[0.25em] mt-1">
                  CENTER
                </span>
              </span>
            </Link>
          </div>

          {/* Navegación principal (resalta la página activa) */}
          <TopNav />
        </div>
      </div>

      {/* Barra principal: categorías + buscador + contacto + carrito */}
      <div className="bg-ink-2">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 py-3 flex items-center gap-3 md:gap-5">
          <CategoriesMenu />

          {/* Buscador */}
          <form action="/productos" method="get" className="flex-1 min-w-0 hidden sm:flex">
            <input
              type="search"
              name="q"
              placeholder="Buscar productos, marcas y más..."
              className="w-full h-11 px-4 rounded-l-lg border border-transparent text-[0.9rem] text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="h-11 px-5 rounded-r-lg bg-brand hover:bg-brand-dark text-white transition-colors grid place-items-center"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-white shrink-0 hover:text-brand transition-colors"
          >
            <span className="h-9 w-9 grid place-items-center rounded-full bg-success/90 text-white">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[0.66rem] text-white/60">Escríbenos</span>
              <span className="text-[0.85rem] font-bold">{WHATSAPP}</span>
            </span>
          </a>

          {/* Redes */}
          <SocialLinks className="hidden md:flex shrink-0" />

          {/* Cuenta + Carrito */}
          <div className="flex items-center gap-1 md:gap-2 text-white shrink-0 ml-auto md:ml-0 md:border-l md:border-white/15 md:pl-3">
            <Link
              href="/login"
              aria-label="Mi cuenta"
              className="h-9 w-9 grid place-items-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>
            <Link
              href="/carrito"
              aria-label="Carrito de compras"
              className="relative h-9 w-9 grid place-items-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <CartBadge />
            </Link>
          </div>
        </div>

        {/* Buscador móvil */}
        <form action="/productos" method="get" className="sm:hidden max-w-[1200px] mx-auto px-5 pb-3 flex">
          <input
            type="search"
            name="q"
            placeholder="Buscar productos..."
            className="w-full h-10 px-4 rounded-l-lg text-[0.9rem] text-ink bg-white focus:outline-none"
          />
          <button type="submit" aria-label="Buscar" className="h-10 px-4 rounded-r-lg bg-brand text-white grid place-items-center">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
