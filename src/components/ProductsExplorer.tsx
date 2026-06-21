"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { SlidersHorizontal, X, Search, Star, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories, discountPercent, type Product } from "@/lib/catalog";

const PER_PAGE = 15;

const PRICE_BUCKETS = [
  { id: "all", label: "Todos los precios", test: () => true },
  { id: "lt500", label: "Menos de S/ 500", test: (p: number) => p < 500 },
  { id: "500-1000", label: "S/ 500 – 1,000", test: (p: number) => p >= 500 && p <= 1000 },
  { id: "1000-2000", label: "S/ 1,000 – 2,000", test: (p: number) => p > 1000 && p <= 2000 },
  { id: "gt2000", label: "Más de S/ 2,000", test: (p: number) => p > 2000 },
];

const RATINGS = [
  { id: 0, label: "Todas" },
  { id: 4, label: "4★ o más" },
  { id: 4.5, label: "4.5★ o más" },
];

const SORTS = [
  { id: "relevancia", label: "Relevancia" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
  { id: "rating", label: "Mejor valorados" },
  { id: "descuento", label: "Mayor descuento" },
];

const allBrands = [...new Set(products.map((p) => p.brand))].sort();

export default function ProductsExplorer({
  initialCat = "",
  initialQuery = "",
  initialOffers = false,
}: {
  initialCat?: string;
  initialQuery?: string;
  initialOffers?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [cat, setCat] = useState(initialCat);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [freeOnly, setFreeOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(initialOffers);
  const [sort, setSort] = useState("relevancia");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  function clearAll() {
    setQuery("");
    setCat("");
    setBrands([]);
    setPrice("all");
    setMinRating(0);
    setFreeOnly(false);
    setOffersOnly(false);
    setSort("relevancia");
  }

  const activeCount =
    (cat ? 1 : 0) + brands.length + (price !== "all" ? 1 : 0) + (minRating ? 1 : 0) + (freeOnly ? 1 : 0) + (offersOnly ? 1 : 0);

  const filtered = useMemo(() => {
    const bucket = PRICE_BUCKETS.find((b) => b.id === price)!;
    const q = query.trim().toLowerCase();
    let list = products.filter((p: Product) => {
      if (cat && p.category !== cat) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (freeOnly && !p.freeShipping) return false;
      if (offersOnly && !discountPercent(p)) return false;
      if (p.rating < minRating) return false;
      if (!bucket.test(p.price)) return false;
      if (q && !`${p.title} ${p.brand} ${p.specs}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list];
    if (sort === "precio-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "descuento")
      list.sort((a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0));
    return list;
  }, [cat, brands, price, minRating, freeOnly, offersOnly, query, sort]);

  // Volver a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPage(1);
  }, [cat, brands, price, minRating, freeOnly, offersOnly, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);

  function goTo(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Buscar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en resultados..."
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-[0.88rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-retro text-[0.62rem] text-ink mb-3">CATEGORÍA</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[0.86rem] text-slate cursor-pointer">
            <input type="radio" name="cat" checked={cat === ""} onChange={() => setCat("")} className="accent-brand" />
            Todas
          </label>
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-[0.86rem] text-slate cursor-pointer">
              <input
                type="radio"
                name="cat"
                checked={cat === c.slug}
                onChange={() => setCat(c.slug)}
                className="accent-brand"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="font-retro text-[0.62rem] text-ink mb-3">MARCA</h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {allBrands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-[0.86rem] text-slate cursor-pointer">
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="accent-brand"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-retro text-[0.62rem] text-ink mb-3">PRECIO</h3>
        <div className="space-y-1.5">
          {PRICE_BUCKETS.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-[0.86rem] text-slate cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={price === b.id}
                onChange={() => setPrice(b.id)}
                className="accent-brand"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      {/* Calificación */}
      <div>
        <h3 className="font-retro text-[0.62rem] text-ink mb-3">CALIFICACIÓN</h3>
        <div className="space-y-1.5">
          {RATINGS.map((r) => (
            <label key={r.id} className="flex items-center gap-2 text-[0.86rem] text-slate cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === r.id}
                onChange={() => setMinRating(r.id)}
                className="accent-brand"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      {/* Ofertas y envío */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-[0.88rem] font-semibold text-ink cursor-pointer">
          <input type="checkbox" checked={offersOnly} onChange={(e) => setOffersOnly(e.target.checked)} className="accent-brand" />
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-brand" /> Solo en oferta
          </span>
        </label>
        <label className="flex items-center gap-2 text-[0.88rem] font-medium text-ink cursor-pointer">
          <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} className="accent-brand" />
          Solo con envío gratis
        </label>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full h-10 rounded-lg border border-border text-[0.85rem] font-semibold text-slate hover:border-brand hover:text-brand transition-colors"
        >
          Limpiar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block bg-surface border border-border rounded-2xl p-5 sticky top-44">
        <FilterPanel />
      </aside>

      {/* Resultados */}
      <div ref={topRef} className="scroll-mt-44">
        {/* Barra superior */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <p className="text-[0.88rem] text-slate">
            {filtered.length > 0 ? (
              <>
                Mostrando{" "}
                <span className="font-bold text-ink">
                  {start + 1}–{Math.min(start + PER_PAGE, filtered.length)}
                </span>{" "}
                de <span className="font-bold text-ink">{filtered.length}</span>
              </>
            ) : (
              "0 productos"
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-border text-[0.85rem] font-semibold text-ink"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filtros
              {activeCount > 0 && (
                <span className="bg-brand text-white text-[0.7rem] rounded-full h-5 min-w-5 px-1 grid place-items-center">
                  {activeCount}
                </span>
              )}
            </button>
            <label className="flex items-center gap-2 text-[0.85rem]">
              <span className="text-muted hidden sm:inline">Ordenar:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-surface text-[0.85rem] font-medium focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                <button
                  onClick={() => goTo(current - 1)}
                  disabled={current === 1}
                  aria-label="Página anterior"
                  className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-surface text-slate hover:border-brand hover:text-brand transition-colors disabled:opacity-40 disabled:hover:text-slate disabled:hover:border-border"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => goTo(n)}
                    aria-current={n === current ? "page" : undefined}
                    className={`h-10 min-w-10 px-3 rounded-lg border text-[0.9rem] font-semibold transition-colors ${
                      n === current
                        ? "bg-brand border-brand text-white"
                        : "bg-surface border-border text-slate hover:border-brand hover:text-brand"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => goTo(current + 1)}
                  disabled={current === totalPages}
                  aria-label="Página siguiente"
                  className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-surface text-slate hover:border-brand hover:text-brand transition-colors disabled:opacity-40 disabled:hover:text-slate disabled:hover:border-border"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center">
            <Star className="h-9 w-9 mx-auto text-muted mb-3" />
            <h2 className="text-[1.05rem] font-bold text-ink">Sin resultados</h2>
            <p className="text-slate text-[0.9rem] mt-1">Prueba quitando algunos filtros.</p>
            <button
              onClick={clearAll}
              className="mt-4 h-10 px-5 rounded-lg bg-brand hover:bg-brand-dark text-white text-[0.88rem] font-semibold transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Drawer de filtros (móvil) */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`md:hidden fixed top-0 right-0 z-[70] h-full w-[85%] max-w-[340px] bg-surface shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <span className="font-bold text-ink">Filtros</span>
          <button onClick={() => setOpen(false)} aria-label="Cerrar" className="h-9 w-9 grid place-items-center rounded-lg hover:bg-canvas">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FilterPanel />
        </div>
        <div className="border-t border-border p-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold"
          >
            Ver {filtered.length} resultado{filtered.length !== 1 && "s"}
          </button>
        </div>
      </aside>
    </div>
  );
}
