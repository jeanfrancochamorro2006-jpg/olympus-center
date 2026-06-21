import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-[0.8rem] text-slate">
      <ol className="flex flex-wrap items-center gap-1.5 list-none">
        <li>
          <Link href="/" className="hover:text-brand transition-colors">
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-muted">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-brand transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
