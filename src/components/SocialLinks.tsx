const ICONS = {
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  ),
  tiktok: (
    <path d="M16.5 2h-2.8v12.4a2.3 2.3 0 1 1-2-2.27V9.3a5.2 5.2 0 1 0 4.8 5.18V8.9a6.3 6.3 0 0 0 3.7 1.18V7.2a3.7 3.7 0 0 1-3.7-3.7V2z" />
  ),
};

function BrandIcon({ name, className }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {ICONS[name]}
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { name: "Facebook", href: "https://facebook.com", icon: <BrandIcon name="facebook" className="h-[18px] w-[18px]" /> },
  { name: "Instagram", href: "https://instagram.com", icon: <InstagramIcon className="h-[18px] w-[18px]" /> },
  { name: "TikTok", href: "https://tiktok.com", icon: <BrandIcon name="tiktok" className="h-[18px] w-[18px]" /> },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-brand transition-colors"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
