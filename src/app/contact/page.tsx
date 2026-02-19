import { ContactForm } from "@/features/contact";

export default function ContactPage() {
  return (
    <div className="relative flex min-h-[calc(100dvh-8rem)] items-center justify-center overflow-hidden px-4 py-8 sm:py-12 md:py-16">
      <div className="relative z-10 w-full max-w-4xl">
        <ContactForm />
      </div>
    </div>
  );
}
