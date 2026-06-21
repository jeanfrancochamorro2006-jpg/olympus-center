import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-5 py-16 text-center">
      <div>
        <img
          src="/IMG/LOGO/logo1.png"
          alt="OlympusCenter"
          className="h-16 w-16 object-contain mx-auto mb-5 opacity-80"
        />
        <p className="text-[3.5rem] font-extrabold text-brand leading-none">404</p>
        <h1 className="text-[1.4rem] font-bold text-ink mt-2">
          Página no encontrada
        </h1>
        <p className="text-slate mt-2 max-w-[420px] mx-auto">
          La página que buscas no existe o fue movida. Revisa la dirección o
          vuelve al inicio.
        </p>
        <Link
          href="/"
          className="inline-flex mt-6 h-11 px-6 items-center rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
