import { Header, Footer } from "@/components/layout";
import {
  BentoSection,
  HeroSection,
  ServicesSection,
  TimelineSection,
} from "@/features/home";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BentoSection />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  );
}
