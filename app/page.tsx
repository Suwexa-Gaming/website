import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedGames } from "@/components/sections/FeaturedGames";
import { Hero } from "@/components/sections/Hero";
import { Interlude } from "@/components/sections/Interlude";
import { NewsSection } from "@/components/sections/NewsSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { Showcase } from "@/components/sections/Showcase";
import { StudioIntro } from "@/components/sections/StudioIntro";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <FeaturedGames />
      <Philosophy />
      <Interlude />
      <Showcase />
      <NewsSection />
      <ContactSection />
    </>
  );
}
