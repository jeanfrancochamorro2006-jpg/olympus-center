import { redirect } from "next/navigation";
import { categories } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export default async function CategoriaRedirect({
  params,
}: PageProps<"/componentes/[categoria]">) {
  const { categoria } = await params;
  redirect(`/productos?cat=${categoria}`);
}
