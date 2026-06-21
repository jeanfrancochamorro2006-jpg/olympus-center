"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Truck, Star, Check, ShoppingCart, Eye } from "lucide-react";
import { type Product, formatPEN, discountPercent, hoverImage } from "@/lib/catalog";
import { useCart } from "@/components/cart/CartProvider";

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-warning text-warning" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

function cuotas(price: number) {
  return (price / 12).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);
  const hover = hoverImage(product);
  const { add, toggleFavorite, isFavorite } = useCart();
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product.id);

  function handleAdd() {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group relative flex flex-col bg-surface rounded-2xl border border-border hover:border-brand/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Imagen */}
      <div className="relative bg-white p-4">
        {discount && (
          <span className="absolute top-3 left-3 z-10 bg-brand text-white text-[0.72rem] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={fav}
          className={`absolute top-3 right-3 z-10 h-8 w-8 grid place-items-center rounded-full bg-white border transition-colors ${
            fav ? "border-brand text-brand" : "border-border text-muted hover:text-brand hover:border-brand"
          }`}
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-brand" : ""}`} />
        </button>
        <Link
          href={`/producto/${product.id}`}
          className="relative block h-[170px] flex items-center justify-center overflow-hidden rounded-lg"
        >
          {/* Resplandor al hacer hover */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(200,16,46,0.14), transparent 68%)",
            }}
          />
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className={`relative max-h-full max-w-full object-contain transition-all duration-300 ease-out group-hover:drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)] ${
              hover ? "group-hover:opacity-0" : "group-hover:scale-110"
            }`}
          />
          {hover && (
            <img
              src={hover}
              alt={`${product.title} - vista 2`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out group-hover:drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)]"
            />
          )}
          {/* Etiqueta Ver detalle */}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-ink/85 text-white text-[0.72rem] font-semibold px-3 py-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="h-3.5 w-3.5" /> Ver detalle
          </span>
        </Link>
      </div>

      {/* Detalle */}
      <div className="flex flex-col flex-grow px-4 pb-4 pt-3 border-t border-border/60">
        <span className="text-[0.68rem] font-bold tracking-wider text-muted uppercase">
          {product.brand}
        </span>
        <h3 className="mt-0.5 text-[0.92rem] leading-snug min-h-[2.5em]">
          <Link
            href={`/producto/${product.id}`}
            className="text-ink line-clamp-2 hover:text-brand transition-colors"
          >
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5 mt-1.5">
          <Stars rating={product.rating} />
          <span className="text-[0.72rem] text-muted">({product.reviews})</span>
        </div>

        {/* Precio + acción */}
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-retro text-[0.95rem] text-ink">{formatPEN(product.price)}</span>
            {discount && (
              <span className="text-[0.7rem] font-bold text-brand bg-brand-soft px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
          {product.oldPrice && (
            <span className="block text-[0.78rem] text-muted line-through mt-0.5">
              Antes {formatPEN(product.oldPrice)}
            </span>
          )}
          <p className="text-[0.72rem] text-slate mt-1">
            o <span className="font-semibold text-ink">12x S/ {cuotas(product.price)}</span> sin interés
          </p>

          <div className="min-h-[1.15rem] mt-1.5">
            {product.freeShipping ? (
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-success">
                <Truck className="h-3.5 w-3.5" /> Envío gratis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> En stock
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`mt-2.5 w-full h-10 rounded-lg text-[0.88rem] font-bold transition-all flex items-center justify-center gap-2 ${
              added
                ? "bg-success text-white"
                : "bg-brand hover:bg-brand-dark text-white active:scale-[0.98]"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
