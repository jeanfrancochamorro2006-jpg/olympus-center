import type { Metadata } from "next";
import Link from "next/link";
import RegistroForm from "@/components/forms/RegistroForm";

export const metadata: Metadata = {
  title: "Crear cuenta | OlympusCenter",
};

export default function RegistroPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-5 py-12 bg-canvas">
      <div className="w-full max-w-[420px] bg-surface border border-border rounded-2xl shadow-card p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/IMG/LOGO/logo1.png"
            alt="OlympusCenter"
            className="h-12 w-12 object-contain mb-2"
          />
          <h1 className="text-[1.3rem] font-extrabold text-ink">Crear cuenta</h1>
          <p className="text-[0.85rem] text-slate">
            Regístrate para comprar más rápido
          </p>
        </div>

        <RegistroForm />

        <p className="text-center text-[0.85rem] text-slate mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-brand hover:text-brand-dark font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
