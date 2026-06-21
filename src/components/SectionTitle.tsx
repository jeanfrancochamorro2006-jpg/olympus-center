import Link from "next/link";

export default function SectionTitle({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <h2 className="font-retro text-ink text-[0.95rem] sm:text-[1.1rem] leading-snug relative pl-3 before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-[5px] before:rounded-full before:bg-brand">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-[0.85rem] font-semibold text-brand hover:text-brand-dark transition-colors"
        >
          Ver todo →
        </Link>
      )}
    </div>
  );
}
