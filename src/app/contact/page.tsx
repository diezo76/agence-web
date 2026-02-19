import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/features/contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Nous contacter</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous recontacterons
                dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
