"use client";

import { useEffect, useRef, useState } from "react";

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
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!element || connection?.saveData) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.src = window.matchMedia("(min-width: 768px)").matches ? "/video/hero-wide.mp4" : "/video/hero-tall.mp4";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => {});
      else element.pause();
    });
    observer.observe(element);
    return () => observer.disconnect();
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
      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[1500ms] md:object-center ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
