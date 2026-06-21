import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión | OlympusCenter",
};

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-5 py-12 bg-canvas">
      <div className="w-full max-w-[400px] bg-surface border border-border rounded-2xl shadow-card p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/IMG/LOGO/logo1.png"
            alt="OlympusCenter"
            className="h-12 w-12 object-contain mb-2"
          />
          <h1 className="text-[1.3rem] font-extrabold text-ink">Bienvenido</h1>
          <p className="text-[0.85rem] text-slate">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-[0.85rem] text-slate mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-brand hover:text-brand-dark font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
