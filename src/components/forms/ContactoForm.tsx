"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactoForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <CheckCircle2 className="h-10 w-10 mx-auto text-success" />
        <h3 className="text-[1.1rem] font-bold text-ink mt-3">¡Mensaje enviado!</h3>
        <p className="text-slate text-[0.9rem] mt-1">
          Gracias por escribirnos. Te responderemos a la brevedad.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 h-10 px-5 rounded-lg bg-brand hover:bg-brand-dark text-white text-[0.9rem] font-semibold transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="bg-surface border border-border rounded-2xl p-6 space-y-4"
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
        <label className="block text-[0.82rem] font-medium text-ink mb-1">Mensaje</label>
        <textarea
          required
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
