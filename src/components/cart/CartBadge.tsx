"use client";

import { useCart } from "@/components/cart/CartProvider";

export default function CartBadge() {
  const { count, hydrated } = useCart();
  if (!hydrated || count === 0) return null;
  return (
    <span className="absolute -top-0.5 left-6 bg-brand text-white text-[0.65rem] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
      {count > 99 ? "99+" : count}
    </span>
  );
}
