"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const ESTADOS = [
  { t: "Pedido confirmado", d: "Tu compra fue recibida.", done: true },
  { t: "En preparación", d: "Estamos alistando tus productos.", done: true },
  { t: "En camino", d: "Tu pedido está en ruta.", done: true },
  { t: "Entregado", d: "Pedido entregado.", done: false },
];

export default function SeguimientoForm() {
  const [code, setCode] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTracked(code.trim() || "OLY-2026-00123");
        }}
        className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ej. OLY-2026-00123"
          className="flex-1 h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
        <button
          type="submit"
          className="h-11 px-6 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors inline-flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" /> Consultar
        </button>
      </form>

      {tracked && (
        <div className="mt-8 bg-surface border border-border rounded-2xl p-6">
          <p className="text-[0.82rem] font-semibold text-muted uppercase mb-1">
            Pedido
          </p>
          <p className="font-retro text-[0.85rem] text-ink mb-5">{tracked}</p>
          <ol className="relative border-l-2 border-border ml-2 space-y-6">
            {ESTADOS.map((s) => (
              <li key={s.t} className="ml-5">
                <span
                  className={`absolute -left-[9px] h-4 w-4 rounded-full border-2 ${
                    s.done ? "bg-brand border-brand" : "bg-surface border-border"
                  }`}
                />
                <p className={`font-medium ${s.done ? "text-ink" : "text-muted"}`}>{s.t}</p>
                <p className="text-[0.85rem] text-slate">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
