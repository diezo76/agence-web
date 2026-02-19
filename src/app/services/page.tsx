import { Header, Footer } from "@/components/layout";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Nos Services</h1>
          <p className="text-muted-foreground">
            Page en cours de construction.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
