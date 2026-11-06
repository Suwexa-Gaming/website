import Image from "next/image";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/content/site";

export function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const hasBackend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
  const Heading = asPage ? "h1" : "h2";

  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      <Image src="/images/studio/ridge.webp" alt="" fill sizes="100vw" className="-z-10 object-cover object-[60%_bottom] opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink/40" />
      <div className={`shell grid grid-cols-[minmax(0,1fr)] gap-14 pb-[var(--section)] lg:grid-cols-12 lg:gap-6 ${asPage ? "pt-36 md:pt-48" : "pt-[var(--section)]"}`}>
        <div className="lg:col-span-6">
          <p className="eyebrow text-gold" data-reveal>
            Contact
          </p>
          <Heading id="contact-title" className="display display-xl mt-5 max-w-[14ch]" data-reveal>
            Have something in mind?
          </Heading>
          <p className="lede mt-7 max-w-md" data-reveal>
            A game, a partnership, a question about Carrom Crest. Write to us and a person will read it.
          </p>
          <p className="mt-8" data-reveal>
            <span className="eyebrow block text-[0.65rem] text-ash">Or write directly</span>
            <a href={`mailto:${site.email}`} className="link-line mt-2 inline-block pb-1 text-lg font-medium break-all">
              {site.email}
            </a>
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <ContactForm hasBackend={hasBackend} email={site.email} />
        </div>
      </div>
    </section>
  );
}
