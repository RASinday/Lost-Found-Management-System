import AboutHero from "../../components/about/AboutHero";
import ResearcherGrid from "../../components/about/ResearcherGrid";
import SchoolSection from "../../components/about/SchoolSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-14 md:space-y-16">
        <AboutHero />
        <ResearcherGrid />
        <SchoolSection />
      </div>
    </main>
  );
}

// compilerOptions: {
//   baseUrl: ".",
//   paths: { "@/*": ["*"] }
// }