import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Prose } from "@/components/ui/primitives";
import { games } from "@/content/games";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Suwexa Gaming website handles information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const carrom = games[0];
  return (
    <>
      <PageHeader label="Legal" title="Privacy Policy" />
      <div className="shell pb-[var(--section)]">
        <Prose>
          <p>
            <strong>Effective 6 November 2026.</strong> This policy covers this website. It does not cover our games, which
            have their own policies.
          </p>
          <h2>The short version</h2>
          <p>
            This website has no analytics, no advertising, no tracking and no cookies of its own. If you write to us, we
            use what you send to reply to you.
          </p>
          <h2>What we receive when you contact us</h2>
          <p>
            If you send the contact form or email us, we receive your name, your email address and your message. We use
            them to read and answer your message, and we keep them only as long as that conversation needs.
          </p>
          <p>
            When the contact form is connected to our email service, your message passes through that provider so it can
            reach us. If it is not connected, the form opens your own email app, and nothing is sent until you send it.
          </p>
          <h2>Technical information</h2>
          <p>
            Like any website, this one is delivered by a hosting provider that processes technical data such as IP
            addresses in order to serve pages and protect against abuse. The contact form also briefly holds a connection
            address in memory to limit repeated submissions. We do not use this information to identify you.
          </p>
          <h2>Our games</h2>
          <p>
            {carrom.title} has its own privacy policy, which applies to the game.{" "}
            {carrom.privacyUrl ? (
              <Link href={carrom.privacyUrl}>Read the {carrom.title} privacy policy</Link>
            ) : null}
            .
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us what we hold about you, or ask us to correct or delete it, by writing to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Changes</h2>
          <p>If this policy changes, the new version will appear on this page with a new effective date.</p>
        </Prose>
      </div>
    </>
  );
}
