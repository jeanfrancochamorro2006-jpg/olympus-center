"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Lock,
  Check,
  Loader2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Store,
  Printer,
} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPEN } from "@/lib/catalog";

type Brand = "visa" | "mastercard" | "amex" | "card";

const STORES = [
  { id: "lima-centro", name: "Lima Centro", addr: "Av. Tecnológica 123, Cercado de Lima" },
  { id: "miraflores", name: "Miraflores", addr: "Av. Larco 456, Miraflores" },
  { id: "sjl", name: "San Juan de Lurigancho", addr: "Av. Próceres 789, SJL" },
];

function detectBrand(num: string): Brand {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  return "card";
}
const BRAND_LABEL: Record<Brand, string> = { visa: "VISA", mastercard: "Mastercard", amex: "AMEX", card: "" };

const num2 = (n: number) => n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function numeroALetras(num: number): string {
  const U = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE", "VEINTIUNO", "VEINTIDÓS", "VEINTITRÉS", "VEINTICUATRO", "VEINTICINCO", "VEINTISÉIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE"];
  const D = ["", "", "", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
  const C = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];
  const dos = (n: number): string => {
    if (n < 30) return U[n];
    const d = Math.floor(n / 10), u = n % 10;
    return D[d] + (u ? " Y " + U[u] : "");
  };
  const tres = (n: number): string => {
    if (n === 100) return "CIEN";
    const c = Math.floor(n / 100), r = n % 100;
    return (C[c] + (r ? " " + dos(r) : "")).trim();
  };
  if (num === 0) return "CERO";
  const miles = Math.floor(num / 1000), resto = num % 1000;
  let s = "";
  if (miles > 0) s += miles === 1 ? "MIL" : tres(miles) + " MIL";
  if (resto > 0) s += (s ? " " : "") + tres(resto);
  return s.trim();
}

type Order = {
  id: string;
  serie: string;
  fecha: string;
  hora: string;
  name: string;
  dni: string;
  email: string;
  phone: string;
  pago: string;
  method: "domicilio" | "tienda";
  place: string;
  items: { title: string; qty: number; price: number }[];
  base: number;
  igv: number;
  total: number;
};

export default function CheckoutView() {
  const { lines, subtotal, count, clear, hydrated } = useCart();
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const [delivery, setDelivery] = useState<"domicilio" | "tienda">("domicilio");
  const [store, setStore] = useState("");

  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const brand = detectBrand(cardNumber);

  function onCardNumber(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 16);
    setCardNumber(d.replace(/(.{4})/g, "$1 ").trim());
  }
  function onExpiry(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (delivery === "tienda" && !store) return;
    setProcessing(true);

    const igv = +(subtotal - subtotal / 1.18).toFixed(2);
    const base = +(subtotal - igv).toFixed(2);
    const place =
      delivery === "domicilio"
        ? `${address}, ${city}`
        : (() => {
            const s = STORES.find((x) => x.id === store);
            return s ? `${s.name} — ${s.addr}` : "";
          })();
    const now = new Date();

    const snapshot: Order = {
      id: "OLY-" + Math.floor(100000 + Math.random() * 900000),
      serie: "B002-" + Math.floor(10000000 + Math.random() * 89999999),
      fecha: now.toLocaleDateString("es-PE"),
      hora: now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
      name,
      dni,
      email,
      phone,
      pago: `TARJETA ${BRAND_LABEL[brand] || ""}`.trim(),
      method: delivery,
      place,
      items: lines.map((l) => ({ title: l.product.title, qty: l.qty, price: l.product.price })),
      base,
      igv,
      total: subtotal,
    };

    setTimeout(() => {
      setOrder(snapshot);
      setProcessing(false);
      clear();
    }, 2200);
  }

  if (!hydrated) {
    return <div className="h-40 grid place-items-center text-slate">Cargando…</div>;
  }

  // ===== Boleta electrónica (ticket) =====
  if (order) {
    const entero = Math.floor(order.total);
    const cent = Math.round((order.total - entero) * 100);
    const son = `${numeroALetras(entero)} CON ${String(cent).padStart(2, "0")}/100 SOLES`;
    const Sep = () => <div className="border-t border-dashed border-ink/40 my-2" />;

    return (
      <div className="max-w-[640px] mx-auto">
        <div className="text-center mb-5 print:hidden">
          <div className="mx-auto mb-3 h-14 w-14 grid place-items-center rounded-full bg-success/10 text-success">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-[1.4rem] font-extrabold text-ink">¡Pago aprobado!</h2>
          <p className="text-slate text-[0.9rem]">Esta es tu boleta electrónica.</p>
        </div>

        {/* Ticket */}
        <div
          id="boleta-print"
          className="mx-auto w-[320px] max-w-full bg-white border border-border rounded-lg shadow-card p-5 font-mono text-[11px] leading-tight text-ink"
        >
          {/* Logo */}
          <div className="bg-ink text-white rounded flex items-center justify-center gap-2 py-3 mb-3">
            <img src="/IMG/LOGO/logo1.png" alt="OlympusCenter" className="h-7 w-7 object-contain" />
            <span className="font-retro text-[0.62rem]">OLYMPUS</span>
          </div>

          <div className="text-center space-y-0.5">
            <p className="font-bold text-[12px]">OLYMPUSCENTER S.A.C.</p>
            <p className="font-bold">RUC: 20512345678</p>
            <p>Av. Tecnológica 123, Lima</p>
            <p>Telf: 999 888 777</p>
            <p>ventas@olympuscenter.com</p>
            <p>www.olympuscenter.com</p>
          </div>

          <Sep />
          <div className="text-center">
            <p className="font-bold text-[12px]">BOLETA DE VENTA ELECTRÓNICA</p>
            <p className="font-bold text-[12px]">{order.serie}</p>
          </div>

          <Sep />
          <div className="text-center">
            <p>{order.name || "CLIENTE VARIOS"}</p>
            <p>---</p>
            <p className="font-bold">DNI {order.dni || "00000000"}</p>
          </div>

          <div className="flex justify-between font-bold mt-2">
            <span>FECHA: {order.fecha}</span>
            <span>HORA: {order.hora}</span>
          </div>

          <Sep />
          <div className="flex justify-between font-bold">
            <span>Cant</span>
            <span>PRECIO</span>
            <span>TOTAL</span>
          </div>
          {order.items.map((it, i) => (
            <div key={i} className="mt-1.5">
              <div className="flex justify-between">
                <span>{it.qty} UND</span>
                <span>{num2(it.price)}</span>
                <span>{num2(it.price * it.qty)}</span>
              </div>
              <p className="uppercase">{it.title}</p>
            </div>
          ))}

          <Sep />
          <div className="space-y-0.5">
            <div className="flex justify-between font-bold">
              <span>TOTAL GRAVADO (S/)</span>
              <span>{num2(order.base)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>I.G.V 18% (S/)</span>
              <span>{num2(order.igv)}</span>
            </div>
            <div className="flex justify-between font-bold text-[13px] mt-1">
              <span>TOTAL (S/)</span>
              <span>{num2(order.total)}</span>
            </div>
          </div>

          <Sep />
          <p><span className="font-bold">SON:</span> {son}</p>
          <p><span className="font-bold">FORMA DE PAGO:</span> {order.pago}</p>
          <p className="mt-1">
            <span className="font-bold">ENTREGA:</span>{" "}
            {order.method === "domicilio" ? "DESPACHO A DOMICILIO" : "RECOJO EN TIENDA"}
          </p>
          <p className="uppercase">{order.place}</p>

          <Sep />
          <p className="text-center">¡Gracias por su compra!</p>
          <p className="text-center text-[9px] text-slate mt-1">
            Representación impresa de la Boleta de Venta Electrónica
          </p>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="h-11 px-6 inline-flex items-center justify-center gap-2 rounded-lg border border-border font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
          >
            <Printer className="h-4 w-4" /> Imprimir / Descargar
          </button>
          <Link
            href="/productos"
            className="h-11 px-6 inline-flex items-center justify-center rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  // Carrito vacío
  if (lines.length === 0) {
    return (
      <div className="max-w-[480px] mx-auto bg-surface border border-border rounded-2xl p-10 text-center">
        <div className="mx-auto mb-4 h-14 w-14 grid place-items-center rounded-full bg-brand-soft text-brand">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h2 className="text-[1.15rem] font-bold text-ink">No hay productos para pagar</h2>
        <p className="text-slate text-[0.9rem] mt-1">Agrega productos a tu carrito primero.</p>
        <Link href="/productos" className="inline-flex mt-5 h-11 px-6 items-center rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePay} className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="space-y-5">
        {/* Método de entrega */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-retro text-[0.72rem] text-ink mb-4">1. ENTREGA</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {([
              { id: "domicilio", icon: Truck, t: "Despacho a domicilio", d: "Recíbelo en tu casa" },
              { id: "tienda", icon: Store, t: "Recojo en tienda", d: "Retira sin costo" },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDelivery(opt.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-colors ${
                  delivery === opt.id ? "border-brand bg-brand-soft" : "border-border hover:border-brand/40"
                }`}
              >
                <opt.icon className={`h-6 w-6 shrink-0 ${delivery === opt.id ? "text-brand" : "text-muted"}`} />
                <span>
                  <span className="block text-[0.88rem] font-bold text-ink">{opt.t}</span>
                  <span className="block text-[0.76rem] text-slate">{opt.d}</span>
                </span>
              </button>
            ))}
          </div>

          {delivery === "domicilio" ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Dirección" className="sm:col-span-2">
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="Av. / Calle, número, dpto." />
              </Field>
              <Field label="Ciudad / Distrito">
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
              </Field>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[0.8rem] font-medium text-ink mb-1">Elige la tienda</p>
              {STORES.map((s) => (
                <label
                  key={s.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    store === s.id ? "border-brand bg-brand-soft" : "border-border hover:border-brand/40"
                  }`}
                >
                  <input type="radio" name="store" required checked={store === s.id} onChange={() => setStore(s.id)} className="accent-brand mt-1" />
                  <span>
                    <span className="block text-[0.86rem] font-semibold text-ink">{s.name}</span>
                    <span className="block text-[0.76rem] text-slate">{s.addr}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Contacto */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-retro text-[0.72rem] text-ink mb-4">2. TUS DATOS</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre completo">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </Field>
            <Field label="DNI">
              <input type="text" required inputMode="numeric" value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))} className={inputCls} placeholder="8 dígitos" />
            </Field>
            <Field label="Correo electrónico">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="tucorreo@ejemplo.com" />
            </Field>
            <Field label="Teléfono">
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
            </Field>
          </div>
        </section>

        {/* Pago */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-retro text-[0.72rem] text-ink">3. PAGO</h2>
            <span className="flex items-center gap-1.5 text-[0.72rem] text-muted">
              <Lock className="h-3.5 w-3.5" /> Cifrado SSL
            </span>
          </div>
          <div className="space-y-4">
            <Field label="Nombre en la tarjeta">
              <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)} className={inputCls} placeholder="Como aparece en la tarjeta" />
            </Field>
            <Field label="Número de tarjeta">
              <div className="relative">
                <input type="text" required inputMode="numeric" value={cardNumber} onChange={(e) => onCardNumber(e.target.value)} className={`${inputCls} pr-16`} placeholder="4242 4242 4242 4242" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {BRAND_LABEL[brand] ? <span className="text-[0.7rem] font-bold text-ink">{BRAND_LABEL[brand]}</span> : <CreditCard className="h-4 w-4" />}
                </span>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Vencimiento">
                <input type="text" required inputMode="numeric" value={expiry} onChange={(e) => onExpiry(e.target.value)} className={inputCls} placeholder="MM/AA" />
              </Field>
              <Field label="CVC">
                <input type="text" required inputMode="numeric" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputCls} placeholder="123" />
              </Field>
            </div>
            <p className="text-[0.72rem] text-muted bg-canvas rounded-lg px-3 py-2">
              💳 Modo prueba — usa la tarjeta <span className="font-semibold text-ink">4242 4242 4242 4242</span>, cualquier fecha futura y CVC.
            </p>
          </div>
        </section>
      </div>

      {/* Resumen */}
      <aside className="bg-surface border border-border rounded-2xl p-5 lg:sticky lg:top-44">
        <h2 className="font-retro text-[0.72rem] text-ink mb-4">TU PEDIDO</h2>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
          {lines.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-3 items-center">
              <div className="relative h-12 w-12 shrink-0 bg-white rounded-lg border border-border grid place-items-center p-1">
                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-brand text-white text-[0.65rem] font-bold">{qty}</span>
              </div>
              <p className="flex-1 text-[0.8rem] text-ink line-clamp-2">{product.title}</p>
              <span className="text-[0.8rem] font-semibold text-ink whitespace-nowrap">{formatPEN(product.price * qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-4 pt-4 space-y-2 text-[0.9rem]">
          <div className="flex justify-between text-slate">
            <span>Productos ({count})</span>
            <span>{formatPEN(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate">
            <span>Envío</span>
            <span className="text-success font-semibold">Gratis</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-border">
            <span className="font-bold text-ink">Total</span>
            <span className="font-retro text-[1rem] text-ink">{formatPEN(subtotal)}</span>
          </div>
        </div>
        <button type="submit" disabled={processing} className="mt-5 w-full h-12 rounded-lg bg-brand hover:bg-brand-dark text-white font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-80">
          {processing ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Procesando pago…</>
          ) : (
            <><Lock className="h-4 w-4" /> Pagar {formatPEN(subtotal)}</>
          )}
        </button>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[0.72rem] text-muted">
          <ShieldCheck className="h-3.5 w-3.5" /> Pago seguro · powered by{" "}
          <span className="font-semibold text-[#635bff]">stripe</span>
        </div>
      </aside>
    </form>
  );
}

const inputCls =
  "w-full h-11 px-3 rounded-lg border border-border text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand";

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[0.8rem] font-medium text-ink mb-1">{label}</span>
      {children}
    </label>
  );
}
