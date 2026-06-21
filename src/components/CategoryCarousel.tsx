"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { categories, categoryCover } from "@/lib/catalog";
import { getCategoryIcon } from "@/lib/icons";

export default function CategoryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Carrusel continuo (marquee) automático y rápido
  useEffect(() => {
    let raf = 0;
    const SPEED = 1.3; // px por frame
    const tick = () => {
      const el = ref.current;
      if (el && !pausedRef.current) {
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Duplicamos para un loop sin cortes
  const items = [...categories, ...categories];

  return (
    <section>
      <h2 className="font-retro text-ink text-[0.95rem] sm:text-[1.1rem] leading-snug relative pl-3 mb-6 before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-[5px] before:rounded-full before:bg-brand">
        Explora por categoría
      </h2>

      <div
        ref={ref}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        className="no-scrollbar flex gap-4 overflow-x-hidden"
      >
        {items.map((cat, i) => {
          const Icon = getCategoryIcon(cat.slug);
          const cover = categoryCover(cat.slug);
          return (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/productos?cat=${cat.slug}`}
              className="shrink-0 w-[240px] h-[190px] relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-canvas to-white group"
            >
              {/* Imagen */}
              {cover ? (
                <img
                  src={cover}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-brand/30">
                  <Icon className="h-20 w-20" />
                </span>
              )}

              {/* Nombre centrado (etiqueta) */}
              <span className="absolute inset-0 grid place-items-center px-4 pointer-events-none">
                <span className="text-center text-white font-extrabold text-[0.95rem] leading-tight bg-ink/75 group-hover:bg-brand/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transition-colors">
                  {cat.name}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
