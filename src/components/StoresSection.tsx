import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { stores } from "@/lib/stores";

export default function StoresSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stores.map((t) => (
        <div
          key={t.ciudad}
          className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col"
        >
          <iframe
            title={`Mapa ${t.ciudad}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(t.query)}&z=15&output=embed`}
            className="w-full h-44 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-9 w-9 grid place-items-center rounded-lg bg-brand-soft text-brand">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-[1.05rem] font-bold text-ink">{t.ciudad}</h3>
            </div>
            <p className="text-slate text-[0.88rem]">{t.dir}</p>
            <p className="text-slate text-[0.82rem] mt-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {t.hora}
            </p>
            <p className="text-slate text-[0.82rem] mt-1 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> {t.tel}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-[0.85rem] font-semibold transition-colors"
            >
              <Navigation className="h-4 w-4" /> Cómo llegar
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
