import {
  BentoSection,
  HeroSection,
  ServicesSection,
  StatsSection,
  TimelineSection,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <BentoSection />
      <TimelineSection />
    </>
  );
}
