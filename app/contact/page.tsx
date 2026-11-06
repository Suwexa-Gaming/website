import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Suwexa Gaming about a game, a partnership, the press or Carrom Crest support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection asPage />;
}
