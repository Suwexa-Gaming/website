"use client";

import { useEffect, useRef, useState } from "react";

const WIDE_SHAPE = "(min-aspect-ratio: 6/5)";

/**
 * The hero's living layer: a silent seamless loop fading in over the still art.
 * The still stays underneath and remains the only thing loaded for visitors who
 * ask for reduced motion or reduced data.
 */
export function HeroMotion() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    // On a slow connection the still art is the better experience.
    if (!element || connection?.saveData || /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Follows the screen's shape, so rotating a phone or tablet swaps the loop too.
    const shape = window.matchMedia(WIDE_SHAPE);
    let visible = false;
    const load = () => {
      setPlaying(false);
      element.src = shape.matches ? "/video/hero-wide.mp4" : "/video/hero-tall.mp4";
      if (visible) element.play().catch(() => {});
    };
    // The still is what visitors see first, so the loop waits until the page has settled.
    const begin = () => window.setTimeout(load, 500);
    let timer = 0;
    if (document.readyState === "complete") timer = begin();
    else window.addEventListener("load", () => (timer = begin()), { once: true });
    shape.addEventListener("change", load);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) element.play().catch(() => {});
      else element.pause();
    });
    observer.observe(element);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      shape.removeEventListener("change", load);
    };
  }, []);

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[1500ms] art-wide:object-[100%_50%] ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
