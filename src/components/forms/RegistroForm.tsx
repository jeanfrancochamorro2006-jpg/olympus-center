"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function RegistroForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="h-10 w-10 mx-auto text-success" />
        <p className="text-ink font-bold mt-3">¡Cuenta creada!</p>
        <p className="text-slate text-[0.85rem] mt-1">Ya puedes iniciar sesión y comprar.</p>
        <Link
          href="/login"
          className="inline-flex mt-5 h-10 px-5 items-center rounded-lg bg-brand hover:bg-brand-dark text-white text-[0.9rem] font-semibold transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-[0.82rem] font-medium text-ink mb-1">Nombre completo</label>
        <input
          type="text"
          required
          className="w-full h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
      </div>
      <div>
        <label className="block text-[0.82rem] font-medium text-ink mb-1">Correo electrónico</label>
        <input
          type="email"
          required
          className="w-full h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
      </div>
      <div>
        <label className="block text-[0.82rem] font-medium text-ink mb-1">Contraseña</label>
        <input
          type="password"
          required
          className="w-full h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
      </div>
      <label className="flex items-start gap-2 text-[0.8rem] text-slate">
        <input type="checkbox" required className="accent-brand mt-0.5" />
        <span>
          Acepto los{" "}
          <Link href="/terminos" className="text-brand hover:text-brand-dark">
            términos y condiciones
          </Link>
        </span>
      </label>
      <button
        type="submit"
        className="w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
      >
        Crear cuenta
      </button>
    </form>
  );
}
