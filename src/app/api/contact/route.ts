import { NextResponse } from "next/server";
import { z } from "zod";
import { escapeHtml } from "@/lib/security";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Adresse email invalide").max(255),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères").max(200),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Envoi email via Resend (si RESEND_API_KEY configuré)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
      const toEmail = process.env.CONTACT_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? "contact@example.com";

      // Échappement HTML pour prévenir les injections XSS dans l'email
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeSubject = escapeHtml(subject);
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `[Contact] ${subject}`,
        html: `
          <h2>Nouveau message depuis le formulaire de contact</h2>
          <p><strong>De :</strong> ${safeName} (${safeEmail})</p>
          <p><strong>Sujet :</strong> ${safeSubject}</p>
          <hr>
          <p>${safeMessage}</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Échec de l'envoi de l'email" },
          { status: 500 }
        );
      }
    } else {
      // Mode développement : log uniquement
      console.log("[Contact form]", { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
