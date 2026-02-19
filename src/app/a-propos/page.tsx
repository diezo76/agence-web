import { Header, Footer } from "@/components/layout";

export default function AProposPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">À propos</h1>
          <p className="text-muted-foreground">
            Page en cours de construction.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
