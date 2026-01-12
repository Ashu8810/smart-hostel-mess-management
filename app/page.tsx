import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { SolutionOverview } from "@/components/sections/SolutionOverview";
import { MobileAppPreview } from "@/components/sections/MobileAppPreview";
import { KeyFeatures } from "@/components/sections/KeyFeatures";
import { Testimonials } from "@/components/sections/Testimonials";
import { RoleBasedAccess } from "@/components/sections/RoleBasedAccess";
import { Team } from "@/components/sections/Team";
import { ManagementSustainability } from "@/components/sections/ManagementSustainability";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <ProblemStatement />
        <SolutionOverview />
        <MobileAppPreview />
        <KeyFeatures />
        <Testimonials />
        <RoleBasedAccess />
        <Team />
        <ManagementSustainability />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
