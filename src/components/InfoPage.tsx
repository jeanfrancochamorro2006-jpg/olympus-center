import Breadcrumbs from "@/components/Breadcrumbs";

export type InfoSection = { heading: string; body: string };

export default function InfoPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: InfoSection[];
}) {
  return (
    <div className="max-w-[820px] mx-auto px-5 py-6">
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className="mt-5 mb-3 text-[1.8rem] font-extrabold text-ink">{title}</h1>
      {intro && <p className="text-slate mb-8">{intro}</p>}

      <div className="space-y-7">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-[1.1rem] font-bold text-ink mb-2">{s.heading}</h2>
            <p className="text-slate text-[0.95rem] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
