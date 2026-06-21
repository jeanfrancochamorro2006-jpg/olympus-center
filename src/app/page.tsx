import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import CategoryCarousel from "@/components/CategoryCarousel";
import BrandLogos from "@/components/BrandLogos";
import StoresSection from "@/components/StoresSection";
import Link from "next/link";
import { Truck, ShieldCheck, Lock, Headphones, Play, ArrowRight } from "lucide-react";
import { bestSellers } from "@/lib/catalog";

const benefits = [
  { icon: Truck, t: "Envío rápido", d: "A todo el país" },
  { icon: Lock, t: "Compra segura", d: "Pago 100% protegido" },
  { icon: ShieldCheck, t: "Garantía oficial", d: "En todos los productos" },
  { icon: Headphones, t: "Asesoría experta", d: "Te ayudamos a elegir" },
];

// Videos de TikTok embebidos (reproducción inline). Usa el ID del video.
const tiktoks = [
  { id: "7575348255752490258", href: "https://www.tiktok.com/@gaming.world.peru/video/7575348255752490258" },
  { id: "7635078374657903893", href: "https://www.tiktok.com/@banana_store_pc/video/7635078374657903893" },
  { id: "7644598135892839688", href: "https://www.tiktok.com/@www.caleta.pe/video/7644598135892839688" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        {/* Glow suave de marca */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-5 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div>
            <span className="font-retro inline-flex items-center gap-2 text-brand text-[0.58rem] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              NUEVO · SERIE RTX 50
            </span>
            <h1 className="text-[2.5rem] md:text-[3.6rem] font-extrabold leading-[1.03] tracking-tight text-ink">
              Arma tu PC ideal
              <br />
              con los mejores <span className="text-brand">componentes</span>
            </h1>
            <p className="mt-5 text-slate text-[1.02rem] max-w-[440px]">
              Procesadores, tarjetas gráficas y almacenamiento de última
              generación, con garantía oficial y envío a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/productos?oferta=1"
                className="h-12 px-7 inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold transition-colors shadow-lg shadow-brand/25"
              >
                Ver ofertas <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/productos?cat=tarjetas"
                className="inline-flex items-center gap-2 text-ink font-semibold hover:text-brand transition-colors group"
              >
                <span className="h-10 w-10 grid place-items-center rounded-full border border-border group-hover:border-brand transition-colors">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                Tarjetas gráficas
              </Link>
            </div>
          </div>

          {/* Producto */}
          <Link href="/producto/gpu-asus-rtx5070ti" className="relative block group order-first md:order-last">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-brand/10 blur-3xl" />
            <img
              src="/IMG/Tarjeta%20Grafica/vga-asus-geforce-nvidia-prime-rtx-5070-t.png"
              alt="ASUS Prime GeForce RTX 5070 Ti"
              className="relative mx-auto max-h-[300px] md:max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {benefits.map((b) => (
            <div key={b.t} className="px-4 py-5 flex items-center gap-3 justify-center">
              <span className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.92rem] font-bold text-ink leading-tight">{b.t}</p>
                <p className="text-[0.78rem] text-slate">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 py-10 space-y-12">
        {/* Categorías (carrusel) */}
        <CategoryCarousel />

        {/* Banner promocional */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ink to-ink-2 text-white">
          <div className="px-8 py-10 md:py-12 max-w-[640px]">
            <p className="font-retro text-brand text-[0.62rem]">ARMA TU SETUP GAMER</p>
            <h3 className="text-[1.7rem] md:text-[2rem] font-extrabold mt-3 leading-tight">
              Hasta 20% de descuento en componentes seleccionados
            </h3>
            <Link
              href="/productos?oferta=1"
              className="mt-6 inline-flex h-11 px-6 items-center rounded-lg bg-brand hover:bg-brand-dark font-semibold transition-colors"
            >
              Comprar ahora
            </Link>
          </div>
        </section>

        {/* Más vendidos */}
        <section>
          <SectionTitle title="Los más vendidos" href="/productos" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Marcas */}
        <section>
          <SectionTitle title="Marcas oficiales" />
          <BrandLogos />
        </section>

        {/* Síguenos en redes (videos) */}
        <section className="rounded-2xl bg-ink px-5 py-8 sm:px-8">
          <div className="text-center mb-7">
            <p className="font-retro text-brand text-[0.62rem]">SÍGUENOS EN REDES</p>
            <h2 className="text-white text-[1.5rem] font-extrabold mt-3">
              Ofertas, reviews y armados en video
            </h2>
            <p className="text-white/60 text-[0.9rem] mt-1">
              No te pierdas el contenido de OlympusCenter
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {tiktoks.map((v) => (
              <div
                key={v.id}
                className="w-[280px] max-w-full aspect-[9/16] overflow-hidden rounded-2xl border-2 border-white/10 bg-black"
              >
                <iframe
                  src={`https://www.tiktok.com/player/v1/${v.id}?autoplay=1&loop=1&controls=1&music_info=0&description=0&rel=0`}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  title={`TikTok ${v.id}`}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>

        {/* Nuestras tiendas */}
        <section>
          <SectionTitle title="Nuestras tiendas" href="/tiendas" />
          <StoresSection />
        </section>
      </div>
    </>
  );
}
