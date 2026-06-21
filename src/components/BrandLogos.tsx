import Link from "next/link";

type Brand = {
  name: string;
  href: string;
  render: React.ReactNode;
};

const brands: Brand[] = [
  {
    name: "Intel",
    href: "/buscar?q=Intel",
    render: (
      <span className="text-[1.45rem] font-semibold tracking-tight" style={{ color: "#0071C5" }}>
        intel
      </span>
    ),
  },
  {
    name: "AMD",
    href: "/buscar?q=AMD",
    render: (
      <span className="text-[1.5rem] font-extrabold italic tracking-tight text-ink">AMD</span>
    ),
  },
  {
    name: "NVIDIA",
    href: "/buscar?q=NVIDIA",
    render: (
      <span className="text-[1.2rem] font-extrabold tracking-wide" style={{ color: "#76B900" }}>
        NVIDIA
      </span>
    ),
  },
  {
    name: "ASUS",
    href: "/buscar?q=ASUS",
    render: (
      <span className="text-[1.4rem] font-extrabold tracking-[0.15em] text-ink">ASUS</span>
    ),
  },
  {
    name: "MSI",
    href: "/buscar?q=MSI",
    render: (
      <span className="text-[1.4rem] font-extrabold tracking-wide" style={{ color: "#C8102E" }}>
        MSI
      </span>
    ),
  },
  {
    name: "Gigabyte",
    href: "/buscar?q=Gigabyte",
    render: (
      <span className="text-[1.15rem] font-extrabold tracking-tight" style={{ color: "#F26722" }}>
        GIGABYTE
      </span>
    ),
  },
  {
    name: "Kingston",
    href: "/buscar?q=Kingston",
    render: (
      <span className="text-[1.25rem] font-bold tracking-tight" style={{ color: "#B3122B" }}>
        Kingston
      </span>
    ),
  },
  {
    name: "Corsair",
    href: "/buscar?q=Corsair",
    render: (
      <span className="text-[1.2rem] font-bold tracking-[0.12em] text-ink">
        CORS<span style={{ color: "#FFC72C" }}>A</span>IR
      </span>
    ),
  },
];

export default function BrandLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {brands.map((b) => (
        <Link
          key={b.name}
          href={b.href}
          aria-label={b.name}
          className="h-20 grid place-items-center bg-surface rounded-xl border border-border hover:border-brand hover:shadow-card transition-all grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
        >
          {b.render}
        </Link>
      ))}
    </div>
  );
}
