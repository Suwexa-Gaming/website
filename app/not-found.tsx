import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
      <Image src="/images/studio/ridge.webp" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="shell pt-40 pb-16">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display display-xl mt-4 max-w-[12ch]">This part of the world isn&rsquo;t built yet.</h1>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the start <Arrow />
        </Link>
      </div>
    </section>
  );
}
