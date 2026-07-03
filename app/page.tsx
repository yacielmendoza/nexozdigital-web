import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section01Hero } from "@/components/sections/Section01Hero";
import { Section02ProofBar } from "@/components/sections/Section02ProofBar";
import { Section03Problem } from "@/components/sections/Section03Problem";
import { Section04Solution } from "@/components/sections/Section04Solution";
import { Section05Services } from "@/components/sections/Section05Services";
import { Section06Process } from "@/components/sections/Section06Process";
import { Section07Social } from "@/components/sections/Section07Social";
import { Section08LeadMagnet } from "@/components/sections/Section08LeadMagnet";
import { Section09About } from "@/components/sections/Section09About";
import { SectionFAQ } from "@/components/sections/Section_FAQ";
import { Section10CTA } from "@/components/sections/Section10CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-hidden">
        <Section01Hero />
        <Section02ProofBar />
        <Section03Problem />
        <Section04Solution />
        <Section05Services />
        <Section06Process />
        <Section07Social />
        <Section08LeadMagnet />
        <Section09About />
        <SectionFAQ />
        <Section10CTA />
      </main>
      <Footer />
    </>
  );
}
