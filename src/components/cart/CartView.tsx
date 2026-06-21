"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPEN } from "@/lib/catalog";

export default function CartView() {
  const { lines, subtotal, count, setQty, remove, clear, hydrated } = useCart();

  if (!hydrated) {
    return <div className="h-40 grid place-items-center text-slate">Cargando…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-12 text-center">
        <div className="mx-auto mb-4 h-16 w-16 grid place-items-center rounded-full bg-brand-soft text-brand">
          <ShoppingCart className="h-8 w-8" />
        </div>
        <h2 className="text-[1.15rem] font-bold text-ink">Tu carrito está vacío</h2>
        <p className="text-slate text-[0.9rem] mt-1">Agrega productos para verlos aquí.</p>
        <Link
          href="/"
          className="inline-flex mt-6 h-11 px-6 items-center rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
        >
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      {/* Lista */}
      <div className="space-y-3">
        {lines.map(({ product, qty }) => (
          <div
            key={product.id}
            className="bg-surface border border-border rounded-xl p-4 flex gap-4"
          >
            <div className="h-20 w-20 shrink-0 bg-white rounded-lg border border-border grid place-items-center p-2">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.7rem] text-muted uppercase font-semibold">{product.brand}</p>
              <h3 className="text-[0.92rem] font-medium text-ink line-clamp-2">{product.title}</h3>
              <button
                onClick={() => remove(product.id)}
                className="mt-1 inline-flex items-center gap-1 text-[0.78rem] text-muted hover:text-brand transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Eliminar
              </button>
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="font-retro text-[0.85rem] text-ink">
                {formatPEN(product.price * qty)}
              </span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQty(product.id, qty - 1)}
                  className="h-8 w-8 grid place-items-center text-slate hover:text-brand"
                  aria-label="Disminuir"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-[0.9rem] font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(product.id, qty + 1)}
                  className="h-8 w-8 grid place-items-center text-slate hover:text-brand"
                  aria-label="Aumentar"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={clear}
          className="text-[0.82rem] text-muted hover:text-brand transition-colors inline-flex items-center gap-1.5"
        >
          <Trash2 className="h-3.5 w-3.5" /> Vaciar carrito
        </button>
      </div>

      {/* Resumen */}
      <aside className="bg-surface border border-border rounded-2xl p-5 lg:sticky lg:top-44">
        <h2 className="font-retro text-[0.8rem] text-ink mb-4">RESUMEN</h2>
        <div className="space-y-2 text-[0.9rem]">
          <div className="flex justify-between text-slate">
            <span>Productos ({count})</span>
            <span>{formatPEN(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate">
            <span>Envío</span>
            <span className="text-success font-semibold">Gratis</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-baseline">
            <span className="font-bold text-ink">Total</span>
            <span className="font-retro text-[1rem] text-ink">{formatPEN(subtotal)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-5 w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors flex items-center justify-center"
        >
          Finalizar compra
        </Link>
        <Link
          href="/"
          className="mt-2 block text-center text-[0.84rem] text-slate hover:text-brand transition-colors"
        >
          Seguir comprando
        </Link>
      </aside>
    </div>
  );
}
