"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { type Product, getProductById } from "@/lib/catalog";

type StoredItem = { id: string; qty: number };
export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  hydrated: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  favorites: string[];
  favCount: number;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "oly_cart";
const FAV_KEY = "oly_favs";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StoredItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const f = localStorage.getItem(FAV_KEY);
      if (c) setItems(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persistir
  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const add = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const lines: CartLine[] = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProductById(i.id);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [items]
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines]
  );

  const value: CartContextValue = {
    hydrated,
    lines,
    count,
    subtotal,
    favorites,
    favCount: favorites.length,
    add,
    remove,
    setQty,
    clear,
    toggleFavorite,
    isFavorite,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
