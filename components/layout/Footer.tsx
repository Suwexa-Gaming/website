import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { navigation, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <p className="voice text-3xl text-bone md:col-span-6 md:text-[2.6rem]">
            An independent game studio. <em className="text-ash">We build worlds worth playing.</em>
          </p>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-8">
            <p className="eyebrow text-ash">Explore</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line pb-0.5 text-[0.95rem]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow text-ash">Studio</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <Link href="/studio#press" className="link-line pb-0.5">
                  Press kit
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="link-line pb-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-line pb-0.5">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Wordmark className="mt-20 h-auto w-full text-ink-3 md:mt-28" title="Suwexa Gaming" />

        <div className="mt-8 flex flex-col justify-between gap-2 text-sm text-ash sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>No trackers. No cookie banner.</p>
        </div>
      </div>
    </footer>
  );
}
