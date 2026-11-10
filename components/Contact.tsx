"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "./SectionHeading";
import { PERSON } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The site is a static export, so the form posts to Web3Forms, which emails
// each submission to the address the access key was created for. The key is
// meant to be public (it can only send to that one inbox).
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "71ef544b-092b-4e01-8c46-facd3d4230eb";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Ange ditt namn.";
    if (!email || !EMAIL_RE.test(email))
      nextErrors.email = "Ange en giltig e-postadress.";
    if (!subject) nextErrors.subject = "Ange ett ämne.";
    if (!message || message.length < 10)
      nextErrors.message = "Meddelandet måste vara minst 10 tecken.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        `Formuläret är inte aktiverat än. Mejla mig på ${PERSON.email} så länge.`
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Web3Forms renders every non-reserved field as a labelled row in the
    // notification email, in insertion order, so the keys double as the
    // Swedish labels you see in the inbox. "Svara" goes straight to the
    // visitor thanks to replyto.
    const payload = new FormData();
    payload.set("access_key", WEB3FORMS_ACCESS_KEY);
    payload.set("subject", `Nytt meddelande från ${name}: ${subject}`);
    payload.set("from_name", `Portföljen · ${name}`);
    payload.set("replyto", email);
    if (data.get("botcheck")) payload.set("botcheck", "on");
    payload.set("Namn", name);
    payload.set("E-post", email);
    payload.set("Ämne", subject);
    payload.set("Meddelande", message);
    payload.set("Skickat från", window.location.href.split("#")[0]);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body?.success) {
        throw new Error(
          `Det gick inte att skicka just nu. Försök igen eller mejla ${PERSON.email}.`
        );
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Något gick fel. Försök igen."
      );
    }
  }

  if (status === "success") {
    return (
      <section id="kontakt" className="bg-graphite py-section">
        <div className="container-content">
          <SectionHeading title="Kontakt" onDark />
          <div>
            <div className="max-w-lg border border-line-onDark bg-graphite-soft p-8">
              <p className="label mb-3 text-blue">Skickat</p>
              <h3 className="font-display text-2xl font-medium text-paper">
                Tack för ditt meddelande.
              </h3>
              <p className="mt-3 text-muted-onDark">
                Jag återkommer oftast inom ett par dagar.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="label mt-6 text-blue underline underline-offset-4"
              >
                Skicka ett till meddelande
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="bg-graphite py-section">
      <div className="container-content">
        <SectionHeading title="Kontakt" onDark />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div>
              <p className="text-base text-muted-onDark">
                Hör av dig om du vill bygga något ihop eller bara har en
                fråga. Jag svarar oftast inom ett par dagar.
              </p>
              <a
                href={`mailto:${PERSON.email}`}
                className="label mt-6 inline-block text-paper underline decoration-line-onDark underline-offset-4 hover:decoration-blue"
              >
                {PERSON.email}
              </a>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="label mt-3 block text-paper underline decoration-line-onDark underline-offset-4 hover:decoration-blue"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Web3Forms honeypot: bots tick it, real visitors never see it */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Namn"
                    name="name"
                    type="text"
                    error={errors.name}
                  />
                  <Field
                    label="E-post"
                    name="email"
                    type="email"
                    error={errors.email}
                  />
                </div>

                <Field
                  label="Ämne"
                  name="subject"
                  type="text"
                  error={errors.subject}
                />

                <div>
                  <label
                    htmlFor="message"
                    className="label block text-faint-onDark"
                  >
                    Meddelande
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full border-b border-line-onDark bg-transparent py-2 text-paper outline-none transition-colors focus:border-blue"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-error-onDark">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-error-onDark">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="label border border-blue bg-blue px-8 py-3 text-paper transition-colors hover:bg-blue-deep disabled:opacity-50"
                >
                  {status === "loading" ? "Skickar…" : "Skicka meddelande"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  error,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label block text-faint-onDark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full border-b border-line-onDark bg-transparent py-2 text-paper outline-none transition-colors focus:border-blue"
      />
      {error && <p className="mt-2 text-sm text-error-onDark">{error}</p>}
    </div>
  );
}
