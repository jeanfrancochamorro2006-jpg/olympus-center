import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductsExplorer from "@/components/ProductsExplorer";
import { getCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Productos | OlympusCenter",
  description: "Explora todo nuestro catálogo de hardware con filtros por categoría, marca, precio y más.",
};

export default async function ProductosPage({
  searchParams,
}: PageProps<"/productos">) {
  const sp = await searchParams;
  const cat = typeof sp.cat === "string" ? sp.cat : "";
  const q = typeof sp.q === "string" ? sp.q : "";
  const offers = sp.oferta === "1" || sp.oferta === "true";
  const catName = cat ? getCategory(cat)?.name : undefined;

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-6">
      <Breadcrumbs
        items={[
          { label: "Productos", href: "/productos" },
          ...(offers ? [{ label: "Ofertas" }] : []),
          ...(catName ? [{ label: catName }] : []),
          ...(q ? [{ label: `“${q}”` }] : []),
        ]}
      />
      <h1 className="mt-5 mb-6 text-[1.6rem] font-extrabold text-ink">
        {q ? (
          <>
            Resultados para <span className="text-brand">“{q}”</span>
          </>
        ) : offers ? (
          <>
            Productos <span className="text-brand">en oferta</span>
          </>
        ) : (
          catName ?? "Todos los productos"
        )}
      </h1>
      <ProductsExplorer initialCat={cat} initialQuery={q} initialOffers={offers} />
    </div>
  );
}
