import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/ui/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the Suwexa Gaming website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader label="Legal" title="Terms of Use" />
      <div className="shell pb-[var(--section)]">
        <Prose>
          <p>
            <strong>Effective 6 November 2026.</strong> These terms cover your use of this website. Our games may come with
            terms of their own.
          </p>
          <h2>Using this site</h2>
          <p>
            You are welcome to browse this site and share links to it. Please do not attempt to disrupt it, gain
            unauthorised access to it or use the contact form to send unsolicited messages.
          </p>
          <h2>Our work</h2>
          <p>
            The text, artwork, logos and game material on this site belong to {site.name} or are used with permission. Our
            press kit materials may be used to write about the studio and its games. Other uses need our written
            permission.
          </p>
          <h2>Other sites</h2>
          <p>Links to other sites are provided for convenience. We do not control those sites and are not responsible for them.</p>
          <h2>Accuracy</h2>
          <p>
            We work to keep this site accurate, but it is provided as it is, without guarantees. Details about a game in
            development may change before release.
          </p>
          <h2>Changes</h2>
          <p>If these terms change, the new version will appear on this page with a new effective date.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Prose>
      </div>
    </>
  );
}
