"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

export default function RecuperarForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center py-4">
        <MailCheck className="h-10 w-10 mx-auto text-success" />
        <p className="text-ink font-bold mt-3">Revisa tu correo</p>
        <p className="text-slate text-[0.85rem] mt-1">
          Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <input
        type="email"
        required
        placeholder="tucorreo@ejemplo.com"
        className="w-full h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
      />
      <button
        type="submit"
        className="w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
      >
        Enviar enlace
      </button>
    </form>
  );
}
