import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AdmitPatient } from "@/components/admit-patient";
import { StatsBar } from "@/components/stats-bar";
import { PatientDashboard } from "@/components/patient-dashboard";
import { CarePrograms } from "@/components/care-programs";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-foreground">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 pt-36 pb-24 relative z-10">
        <HeroSection />
        <AdmitPatient />
        <StatsBar />
      </main>

      <PatientDashboard />
      <CarePrograms />
      <CtaBanner />
      <Footer />

      {/* Decorative glow blob (dark mode only) */}
      <div
        className="hidden dark:block fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[400px] rounded-full
          bg-[#F0B90B]/10 blur-[120px] pointer-events-none animate-glow-pulse"
      />
    </div>
  );
}
