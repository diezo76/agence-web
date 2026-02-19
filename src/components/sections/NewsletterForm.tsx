"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      // Simuler envoi - à connecter à votre API/newsletter
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Inscription réussie !");
      setEmail("");
    } catch {
      toast.error("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <Input
        type="email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="min-w-0 flex-1"
        aria-label="Email pour la newsletter"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "..." : "S'inscrire"}
      </Button>
    </form>
  );
}
