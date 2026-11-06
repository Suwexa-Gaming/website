import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 10" className={`btn-arrow h-2.5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

/** Section opener: a slash, an index and a label on one hairline. */
export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-5" data-reveal>
      <span aria-hidden="true" className="block h-3 w-[7px] -skew-x-[28deg] bg-gold" />
      {index ? <span className="eyebrow text-ash">{index}</span> : null}
      <span className="eyebrow text-bone">{children}</span>
    </div>
  );
}

/** Inner page opening, in the same voice as the home hero. */
export function PageHeader({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="shell pt-36 pb-16 md:pt-48 md:pb-24">
      <p className="eyebrow rise text-gold">{label}</p>
      <h1 className="display display-xl rise mt-6 max-w-[14ch]" style={{ "--d": "80ms" } as React.CSSProperties}>
        {title}
      </h1>
      {children ? (
        <div className="lede rise mt-8 max-w-2xl" style={{ "--d": "180ms" } as React.CSSProperties}>
          {children}
        </div>
      ) : null}
    </header>
  );
}

/** Long-form text for legal pages and articles. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[66ch] space-y-5 font-text text-[1.08rem] leading-[1.7] text-ash [&_a]:text-bone [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4 [&_h2]:pt-8 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-bone [&_strong]:font-semibold [&_strong]:text-bone [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      {children}
    </div>
  );
}
