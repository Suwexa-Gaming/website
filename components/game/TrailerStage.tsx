"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { GameTrailer } from "@/content/games";

/**
 * A silent loop of real footage while the visitor reads, and the full trailer,
 * with sound, in a dark theatre view on request. The loop only runs while on
 * screen, and never for visitors who ask for reduced motion or reduced data.
 */
export function TrailerStage({ title, trailer }: { title: string; trailer: GameTrailer }) {
  const stage = useRef<HTMLDivElement>(null);
  const teaser = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [looping, setLooping] = useState(false);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const video = teaser.current;
    const host = stage.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!video || !host || connection?.saveData || /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "")) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dialog.current?.open) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const openTheatre = (event: MouseEvent) => {
    event.preventDefault();
    setWide(window.matchMedia("(min-width: 768px)").matches);
    setOpen(true);
    teaser.current?.pause();
    dialog.current?.showModal();
  };

  const closeTheatre = () => {
    setOpen(false);
    if (stage.current && stage.current.getBoundingClientRect().bottom > 0) teaser.current?.play().catch(() => {});
  };

  return (
    <div ref={stage} id="trailer" className="relative scroll-mt-24">
      {/* The film's own light, spilling softly onto the page. */}
      <div aria-hidden="true" className="absolute -inset-x-[3%] -inset-y-[8%] -z-10 opacity-45 blur-3xl saturate-150">
        <Image src={trailer.poster} alt="" fill sizes="50vw" quality={75} className="object-cover" />
      </div>

      <a
        href={trailer.full1080}
        onClick={openTheatre}
        aria-label={`Play the ${title} trailer with sound, ${trailer.duration}`}
        className="group block"
      >
        <span
          className="relative block overflow-hidden bg-ink shadow-[0_0_0_1px_rgba(244,244,242,0.1)]"
          style={{ aspectRatio: `${trailer.width} / ${trailer.height}` }}
        >
        <Image
          src={trailer.poster}
          alt={trailer.posterAlt}
          fill
          sizes="(min-width: 1800px) 1700px, 100vw"
          quality={85}
          className="object-cover"
        />
        <video
          ref={teaser}
          src={trailer.teaser}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setLooping(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${looping ? "opacity-100" : "opacity-0"}`}
        />
        <span className="absolute inset-0 bg-ink/10 transition-opacity md:bg-transparent md:bg-gradient-to-t md:from-ink/90 md:via-ink/5 md:to-ink/20 duration-700 group-hover:opacity-60" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="cut-br flex h-12 w-16 items-center justify-center bg-gold [--cut:10px] md:[--cut:14px] text-ink transition-all duration-500 ease-cinema group-hover:scale-110 group-hover:bg-bone md:h-24 md:w-32">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 md:ml-1 md:h-8 md:w-8" fill="currentColor" aria-hidden="true">
              <path d="M6 3l15 9-15 9V3z" />
            </svg>
          </span>
        </span>

        {/* Over the film on larger screens. */}
        <span className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-4 p-8 md:flex">
          <span>
            <span className="eyebrow block text-gold">Official trailer</span>
            <span className="display mt-2 block text-4xl">{title}</span>
          </span>
          <span className="eyebrow shrink-0 text-bone/80">{trailer.duration} · Sound on</span>
        </span>
        </span>

        {/* Below the film on phones, where it would cover the picture. */}
        <span className="mt-4 flex items-start justify-between gap-4 md:hidden">
          <span>
            <span className="eyebrow block text-[0.62rem] text-gold">Official trailer</span>
            <span className="display mt-1.5 block text-2xl">{title}</span>
          </span>
          <span className="eyebrow shrink-0 text-[0.62rem] text-bone/80">{trailer.duration} · Sound on</span>
        </span>
      </a>

      <dialog
        ref={dialog}
        aria-label={`${title} trailer`}
        onClose={closeTheatre}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-black/95 p-0 text-bone backdrop:bg-black open:flex"
      >
        {open ? (
          <video
            key={wide ? "1080" : "720"}
            src={wide ? trailer.full1080 : trailer.full720}
            poster={trailer.poster}
            controls
            autoPlay
            playsInline
            className="max-h-full w-full max-w-[min(100vw,177vh)]"
          />
        ) : null}
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="eyebrow absolute top-4 right-4 flex min-h-11 items-center gap-3 bg-ink/70 px-4 text-[0.68rem] text-bone hover:text-gold md:top-6 md:right-6"
        >
          Close
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>
      </dialog>
    </div>
  );
}
