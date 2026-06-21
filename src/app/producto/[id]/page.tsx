import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ProductDetailView from "@/components/ProductDetailView";
import {
  products,
  getProductById,
  getCategory,
  relatedProducts,
} from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/producto/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado | OlympusCenter" };
  return {
    title: `${product.title} | OlympusCenter`,
    description: `${product.title} — ${product.specs}. Compra al mejor precio con garantía oficial.`,
  };
}

export default async function ProductoPage({
  params,
}: PageProps<"/producto/[id]">) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const cat = getCategory(product.category);
  const related = relatedProducts(product);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-6">
      <Breadcrumbs
        items={[
          { label: "Componentes" },
          ...(cat
            ? [{ label: cat.name, href: `/componentes/${cat.slug}` }]
            : []),
          { label: product.title },
        ]}
      />

      <div className="mt-6">
        <ProductDetailView product={product} />
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <SectionTitle
            title="Productos relacionados"
            href={cat ? `/productos?cat=${cat.slug}` : undefined}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
