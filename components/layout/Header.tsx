"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark, Wordmark } from "@/components/brand/Wordmark";
import { Arrow } from "@/components/ui/primitives";
import { games, statusLabel } from "@/content/games";
import { navigation } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu when the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const featured = games[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative transition-colors duration-500 ${
          scrolled && !open ? "border-b border-line/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between md:h-20">
          <Link href="/" aria-label="Suwexa Gaming, home" className="group relative z-10 flex items-center gap-3">
            <Mark className="h-7 w-7 transition-transform duration-500 ease-cinema group-hover:-translate-y-0.5" />
            <Wordmark className="h-[0.95rem] w-auto text-bone" title="Suwexa" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navigation.map((item) =>
              item.href === "/games" ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`nav-link eyebrow block py-3 transition-colors hover:text-bone ${isActive(item.href) ? "text-gold" : "text-bone/75"}`}
                  >
                    {item.label}
                  </Link>
                  <div className="invisible absolute top-full left-1/2 w-[23rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-300 ease-cinema group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <Link href={`/games/${featured.slug}`} className="group/card cut-br block bg-ink-3">
                      <span className="relative block aspect-[16/8] overflow-hidden">
                        <Image
                          src={featured.keyArt.src}
                          alt=""
                          fill
                          sizes="368px"
                          className="object-cover transition-transform duration-700 ease-cinema group-hover/card:scale-105"
                        />
                      </span>
                      <span className="flex items-center justify-between gap-4 px-5 py-4">
                        <span>
                          <span className="block text-sm font-semibold">{featured.title}</span>
                          <span className="eyebrow mt-1 block text-[0.62rem] text-ash">{statusLabel[featured.status]}</span>
                        </span>
                        <Arrow className="text-gold" />
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`nav-link eyebrow py-3 transition-colors hover:text-bone ${isActive(item.href) ? "text-gold" : "text-bone/75"}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={`absolute right-0 h-[1.5px] bg-bone transition-all duration-500 ease-cinema ${open ? "top-1.5 w-7 rotate-[28deg]" : "top-0 w-7"}`}
              />
              <span
                className={`absolute right-0 h-[1.5px] bg-bone transition-all duration-500 ease-cinema ${open ? "top-1.5 w-7 -rotate-[28deg]" : "top-3 w-5"}`}
              />
            </span>
          </button>
        </div>
        <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-gold/80" />
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 isolate flex flex-col bg-ink transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <Image src="/images/studio/hero-tall.webp" alt="" fill sizes="100vw" className="-z-10 object-cover object-top opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <nav aria-label="Mobile" className="shell relative flex flex-1 flex-col justify-center gap-1 pt-20">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`display flex items-baseline gap-4 py-2 text-[clamp(2.4rem,12vw,4rem)] transition-all duration-700 ease-cinema ${
                open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              } ${isActive(item.href) ? "text-gold" : "text-bone"}`}
              style={{ transitionDelay: open ? `${80 + index * 50}ms` : "0ms" }}
            >
              <span className="eyebrow text-ash">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={`/games/${featured.slug}`} className="shell relative flex items-center gap-4 border-t border-line py-5">
          <span className="relative block h-14 w-24 shrink-0 overflow-hidden">
            <Image src={featured.keyArt.src} alt="" fill sizes="96px" className="object-cover" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{featured.title}</span>
            <span className="eyebrow mt-1 block text-[0.62rem] text-ash">{statusLabel[featured.status]}</span>
          </span>
          <Arrow className="text-gold" />
        </Link>
      </div>
    </header>
  );
}
