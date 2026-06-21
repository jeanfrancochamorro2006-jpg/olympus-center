"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Truck,
  Star,
  Check,
  ShoppingCart,
  Minus,
  Plus,
  ShieldCheck,
  Lock,
  Package,
} from "lucide-react";
import { type Product, formatPEN, discountPercent } from "@/lib/catalog";
import { useCart } from "@/components/cart/CartProvider";

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= Math.round(rating) ? "fill-warning text-warning" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

export default function ProductDetailView({ product }: { product: Product }) {
  const { add, toggleFavorite, isFavorite } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = discountPercent(product);
  const fav = isFavorite(product.id);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const specItems = product.specs.split("·").map((s) => s.trim()).filter(Boolean);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function handleBuy() {
    add(product, qty);
    router.push("/carrito");
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Imagen */}
      <div className="relative bg-white border border-border rounded-2xl p-8 flex items-center justify-center">
        {discount && (
          <span className="absolute top-4 left-4 bg-brand text-white text-[0.8rem] font-bold px-2.5 py-1 rounded">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={`absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white border transition-colors ${
            fav ? "border-brand text-brand" : "border-border text-muted hover:text-brand hover:border-brand"
          }`}
        >
          <Heart className={`h-5 w-5 ${fav ? "fill-brand" : ""}`} />
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[380px] max-w-full object-contain"
        />
      </div>

      {/* Info */}
      <div>
        <p className="text-[0.78rem] font-semibold tracking-wide text-muted uppercase">
          {product.brand}
        </p>
        <h1 className="text-[1.6rem] font-extrabold text-ink leading-tight mt-1">
          {product.title}
        </h1>

        <div className="flex items-center gap-2 mt-3">
          <Stars rating={product.rating} />
          <span className="text-[0.82rem] text-slate">
            {product.rating} · {product.reviews} reseñas
          </span>
        </div>

        {/* Precio */}
        <div className="mt-5 bg-canvas border border-border rounded-xl p-5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-retro text-[1.35rem] text-ink">{formatPEN(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[1rem] text-muted line-through">{formatPEN(product.oldPrice)}</span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-success text-[0.85rem] font-semibold mt-1">
              Ahorras {formatPEN(savings)}
            </p>
          )}
          <div className="mt-2">
            {product.freeShipping ? (
              <span className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-success">
                <Truck className="h-4 w-4" /> Envío gratis a todo el país
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-[0.85rem] text-slate">
                <span className="h-2 w-2 rounded-full bg-success" /> En stock · Listo para enviar
              </span>
            )}
          </div>
        </div>

        {/* Cantidad + acciones */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-11 w-11 grid place-items-center text-slate hover:text-brand"
              aria-label="Disminuir"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-11 w-11 grid place-items-center text-slate hover:text-brand"
              aria-label="Aumentar"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-[0.82rem] text-muted">Cantidad</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleAdd}
            className={`h-12 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              added ? "bg-success text-white" : "border-2 border-brand text-brand hover:bg-brand-soft"
            }`}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" /> Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" /> Agregar al carrito
              </>
            )}
          </button>
          <button
            onClick={handleBuy}
            className="h-12 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
          >
            Comprar ahora
          </button>
        </div>

        {/* Garantías */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Truck, t: "Envío rápido" },
            { icon: ShieldCheck, t: "Garantía oficial" },
            { icon: Lock, t: "Pago seguro" },
          ].map((g) => (
            <div key={g.t} className="bg-surface border border-border rounded-xl py-3 px-2">
              <g.icon className="h-5 w-5 mx-auto text-brand" />
              <p className="text-[0.72rem] text-slate mt-1.5">{g.t}</p>
            </div>
          ))}
        </div>

        {/* Especificaciones */}
        <div className="mt-6">
          <h2 className="font-retro text-[0.78rem] text-ink mb-3">ESPECIFICACIONES</h2>
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            <li className="flex justify-between px-4 py-2.5 text-[0.88rem]">
              <span className="text-muted">Marca</span>
              <span className="text-ink font-medium">{product.brand}</span>
            </li>
            {specItems.map((s, i) => (
              <li key={i} className="flex items-center gap-2 px-4 py-2.5 text-[0.88rem]">
                <Package className="h-3.5 w-3.5 text-brand shrink-0" />
                <span className="text-ink">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
