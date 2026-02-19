import { NextResponse } from "next/server";
import { z } from "zod";
import { escapeHtml } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2, "Nom invalide").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z
    .string()
    .max(20)
    .refine((val) => !val || /^[+]?[\d\s.-]{10,}$/.test(val), "Téléphone invalide")
    .optional(),
  message: z.string().min(10, "Message trop court").max(5000),
});

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown";
    const { success } = rateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans 1 minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.flatten().fieldErrors;
      const message =
        Object.values(firstError)[0]?.[0] ?? "Données invalides";
      return NextResponse.json(
        { error: message, details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
      const toEmail =
        process.env.CONTACT_EMAIL ??
        process.env.RESEND_FROM_EMAIL ??
        "contact@example.com";

      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
      const safePhone = phone ? escapeHtml(phone) : "Non renseigné";

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `[Contact] Message de ${name}`,
        html: `
          <h2>Nouveau message depuis le formulaire de contact</h2>
          <p><strong>De :</strong> ${safeName} (${safeEmail})</p>
          <p><strong>Téléphone :</strong> ${safePhone}</p>
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
      console.log("[Contact form]", { name, email, phone, message });
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
