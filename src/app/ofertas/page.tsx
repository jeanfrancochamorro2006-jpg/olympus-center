import { redirect } from "next/navigation";

export default function OfertasPage() {
  redirect("/productos?oferta=1");
}
