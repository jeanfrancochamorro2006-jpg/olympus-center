import type { Metadata } from "next";
import Link from "next/link";
import RecuperarForm from "@/components/forms/RecuperarForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña | OlympusCenter",
};

export default function RecuperarPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-5 py-12 bg-canvas">
      <div className="w-full max-w-[400px] bg-surface border border-border rounded-2xl shadow-card p-8">
        <h1 className="text-[1.3rem] font-extrabold text-ink text-center">
          Recuperar contraseña
        </h1>
        <p className="text-[0.85rem] text-slate text-center mt-1 mb-6">
          Ingresa tu correo y te enviaremos un enlace para restablecerla.
        </p>

        <RecuperarForm />

        <p className="text-center text-[0.85rem] text-slate mt-6">
          <Link href="/login" className="text-brand hover:text-brand-dark font-semibold">
            ← Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
