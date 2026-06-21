"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="flex items-center gap-2 text-success font-semibold text-[0.9rem]">
        <CheckCircle2 className="h-5 w-5" /> ¡Gracias por suscribirte!
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex w-full max-w-[380px]"
    >
      <input
        type="email"
        required
        placeholder="Tu correo electrónico"
        className="flex-1 h-11 px-4 rounded-l-lg text-[0.9rem] text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-r-lg bg-brand hover:bg-brand-dark text-white font-semibold text-[0.88rem] transition-colors inline-flex items-center gap-2"
      >
        <Send className="h-4 w-4" /> <span className="hidden sm:inline">Suscribirme</span>
      </button>
    </form>
  );
}
