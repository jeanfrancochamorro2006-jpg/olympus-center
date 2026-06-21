"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutGrid, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "@/lib/catalog";

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 h-11 px-4 sm:px-5 rounded-lg text-[0.85rem] font-bold uppercase tracking-wide text-white bg-brand hover:bg-brand-dark transition-colors"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Categorías</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Lista vertical (se abre al pasar el mouse) */}
      <div
        className={`absolute left-0 top-full z-50 pt-2 w-[280px] transition-all duration-150 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none"
        }`}
      >
        <ul className="bg-ink rounded-lg shadow-card-hover overflow-hidden list-none border border-white/10">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/productos?cat=${cat.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 px-4 py-3 text-[0.8rem] font-semibold uppercase tracking-wide text-white/85 border-b border-white/[0.06] hover:bg-brand hover:text-white transition-colors"
              >
                {cat.name}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/productos"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 px-4 py-3 text-[0.8rem] font-bold uppercase tracking-wide text-brand hover:bg-brand hover:text-white transition-colors"
            >
              Ver todos los productos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
