import { NextResponse } from "next/server";

/**
 * Contact / lead-magnet endpoint.
 *
 * Sends the lead diagnosis request via Resend when RESEND_API_KEY is set.
 * If the key is missing (e.g. local dev before secrets are wired), the route
 * still responds 200 and logs the lead so the front-end success flow works.
 *
 * Required env vars (see .env.example):
 *   RESEND_API_KEY   — Resend API key
 *   CONTACT_TO_EMAIL — inbox that receives the leads (defaults below)
 *   CONTACT_FROM_EMAIL — verified Resend sender (defaults below)
 */

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  language?: string;
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hola@nexozdigital.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Nexoz Digital <onboarding@resend.dev>";

export async function POST(request: Request) {
  let data: LeadPayload;
  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // --- Basic server-side validation ---
  const name = data.name?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim();
  const businessType = data.businessType?.trim();

  const emailValid = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailValid || !phone || !businessType) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No key yet → don't fail the user; record the lead and return success.
  // TODO: add RESEND_API_KEY to the environment to enable real email delivery.
  if (!apiKey) {
    console.info("[contact] New lead (email delivery disabled — no RESEND_API_KEY):", {
      name,
      email,
      phone,
      businessType,
      language: data.language
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    // Imported lazily so the build doesn't require the key to be present.
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nuevo Diagnóstico solicitado — ${name}`,
      text: [
        "Nueva solicitud de Diagnóstico Digital Express:",
        "",
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        `Tipo de negocio: ${businessType}`,
        `Idioma: ${data.language ?? "—"}`
      ].join("\n")
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
