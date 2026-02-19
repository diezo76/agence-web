import { Header, Footer } from "@/components/layout";
import { HeroSection, ServicesSection } from "@/features/home";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
