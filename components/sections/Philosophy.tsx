import { SectionLabel } from "@/components/ui/primitives";
import { principles } from "@/content/site";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="bg-ink-2">
      <div className="section shell">
        <SectionLabel index="03">Our philosophy</SectionLabel>
        <h2 id="philosophy-title" className="sr-only">
          Our philosophy
        </h2>
        <ol className="mt-10 md:mt-14">
          {principles.map((item, index) => (
            <li
              key={item.index}
              className="group grid gap-x-6 gap-y-4 border-b border-line py-10 md:grid-cols-12 md:py-16"
              data-reveal
              style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <p className="display text-[clamp(3.5rem,8vw,8rem)] text-transparent [-webkit-text-stroke:1px_#4a4f58] transition-colors duration-700 group-hover:[-webkit-text-stroke:1px_var(--color-gold)] md:col-span-2">
                {item.index}
              </p>
              <div className="md:col-span-5">
                <h3 className="display display-md">{item.title}</h3>
              </div>
              <div className="md:col-span-5">
                <p className="voice text-[1.75rem] text-bone md:text-[2.25rem]">{item.statement}</p>
                <p className="lede mt-4 !text-[1.05rem]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
