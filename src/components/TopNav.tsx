"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TOP_NAV = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Medios de pago", href: "/medios-de-pago" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Contáctanos", href: "/contacto" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function TopNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
      {TOP_NAV.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`px-3 py-2 text-[0.82rem] font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
              active ? "text-brand" : "text-white/90 hover:text-brand"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
