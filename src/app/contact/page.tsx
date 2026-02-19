import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/features/contact";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-purple-900/30 to-black px-4 py-16">
        <div className="relative z-10 w-full max-w-4xl">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
