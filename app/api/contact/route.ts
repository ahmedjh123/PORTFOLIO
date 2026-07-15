import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-memory rate limiting. Resets whenever the serverless function cold-starts,
// so it's a basic deterrent rather than a hard guarantee — good enough for a
// low-traffic portfolio contact form, not a substitute for a real WAF.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "För många förfrågningar. Försök igen om en stund." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Ogiltig förfrågan." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Honeypot field is invisible to real visitors — if it's filled, it's a bot.
  // Respond as if everything succeeded so the bot doesn't learn otherwise.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Alla fält är obligatoriska." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Ogiltig e-postadress." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    subject.length > MAX_FIELD_LENGTH ||
    message.length > MAX_FIELD_LENGTH
  ) {
    return NextResponse.json(
      { error: "Ett av fälten är för långt." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Meddelandet är för kort." },
      { status: 400 }
    );
  }

  const {
    ZOHO_SMTP_HOST,
    ZOHO_SMTP_PORT,
    ZOHO_SMTP_USER,
    ZOHO_SMTP_PASSWORD,
    CONTACT_RECEIVER_EMAIL,
  } = process.env;

  if (
    !ZOHO_SMTP_HOST ||
    !ZOHO_SMTP_PORT ||
    !ZOHO_SMTP_USER ||
    !ZOHO_SMTP_PASSWORD ||
    !CONTACT_RECEIVER_EMAIL
  ) {
    console.error("Contact form: missing SMTP environment variables.");
    return NextResponse.json(
      { error: "Serverfel. Försök igen senare." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: ZOHO_SMTP_HOST,
    port: Number(ZOHO_SMTP_PORT),
    secure: Number(ZOHO_SMTP_PORT) === 465,
    auth: {
      user: ZOHO_SMTP_USER,
      pass: ZOHO_SMTP_PASSWORD,
    },
  });

  const safeName = stripNewlines(name);
  const safeSubject = stripNewlines(subject);

  try {
    await transporter.sendMail({
      from: `"${safeName} via ahmedjh.great-site.net" <${ZOHO_SMTP_USER}>`,
      to: CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `[Portfölj] ${safeSubject}`,
      text: `Namn: ${safeName}\nE-post: ${email}\n\n${message}`,
      html: `
        <p><strong>Namn:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json(
      { error: "Kunde inte skicka meddelandet. Försök igen senare." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
