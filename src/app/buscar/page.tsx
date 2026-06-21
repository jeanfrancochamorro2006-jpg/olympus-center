import { redirect } from "next/navigation";

export default async function BuscarRedirect({
  searchParams,
}: PageProps<"/buscar">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  redirect(`/productos${q ? `?q=${encodeURIComponent(q)}` : ""}`);
}
