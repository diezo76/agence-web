"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Loader2, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MagneticButton } from "@/components/shared";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ContactFormField } from "./contact-form-field";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s.-]{10,}$/.test(val),
      "Numéro invalide (min. 10 chiffres)"
    ),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const FIELDS: Array<{
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon: LucideIcon;
  as?: "input" | "textarea";
  rows?: number;
}> = [
  {
    name: "name",
    label: "Nom",
    placeholder: "Votre nom",
    type: "text",
    icon: User,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "votre@email.com",
    type: "email",
    icon: Mail,
  },
  {
    name: "phone",
    label: "Téléphone",
    placeholder: "+33 6 12 34 56 78",
    type: "tel",
    icon: Phone,
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Votre message...",
    as: "textarea",
    rows: 5,
    icon: Mail,
  },
];

function triggerConfetti() {
  const count = 80;
  const defaults = { origin: { y: 0.7 } };
  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setIsSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        toast.error(data.error ?? "Une erreur est survenue", {
          duration: Infinity,
        });
        return;
      }

      setIsSuccess(true);
      triggerConfetti();
      toast.success("Message envoyé ! Nous vous recontacterons rapidement.", {
        duration: 4000,
      });
      form.reset();
    } catch {
      toast.error("Erreur de connexion. Veuillez réessayer.", {
        duration: Infinity,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:grid-cols-2 md:gap-12 md:p-12">
      {/* Colonne gauche : Formulaire */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Envoyez-nous un message
        </h2>
        <p className="text-gray-400">
          Remplissez le formulaire et nous vous recontacterons dans les 24h.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
            aria-label="Formulaire de contact"
          >
            {FIELDS.map((field, index) => (
              <ContactFormField
                key={field.name}
                control={form.control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                icon={field.icon}
                as={field.as}
                rows={field.rows}
                disabled={isSubmitting}
                index={index}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="pt-2"
            >
              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-live="polite"
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-bold text-white transition-all duration-300",
                    "hover:from-purple-600 hover:to-pink-600",
                    "disabled:cursor-not-allowed disabled:opacity-70"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="size-5 animate-spin"
                        aria-hidden
                      />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </MagneticButton>
            </motion.div>
          </form>
        </Form>
      </motion.div>

      {/* Colonne droite : Infos */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col justify-center space-y-8"
      >
        <div>
          <h3 className="mb-4 text-xl font-bold text-white">
            Nos coordonnées
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-purple-400" />
              <div>
                <p className="font-medium text-white">Adresse</p>
                <p className="text-gray-400">
                  123 Avenue des Champs-Élysées
                  <br />
                  75008 Paris, France
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-5 shrink-0 text-purple-400" />
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="text-gray-400">contact@agence-web.fr</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-purple-400" />
              <div>
                <p className="font-medium text-white">Téléphone</p>
                <p className="text-gray-400">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-sm text-gray-400">
            Réponse sous 24h ouvrées. Pour les demandes urgentes, privilégiez
            l&apos;appel téléphonique.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
