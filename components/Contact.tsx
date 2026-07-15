"use client";

import { useState, type FormEvent } from "react";
import FadeInSection from "./FadeInSection";
import SectionLabel from "./SectionLabel";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GitHub Pages only serves static files, so the form posts to Formspree
// instead of a Next.js API route. Replace with your own form ID from
// https://formspree.io before deploying — see README.md.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

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

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          body?.errors?.map((e: { message: string }) => e.message).join(" ") ||
          "Något gick fel. Försök igen.";
        throw new Error(message);
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
          <SectionLabel index="04" title="Kontakt" onDark />
          <FadeInSection>
            <div className="max-w-lg border border-line-onDark bg-graphite-soft p-8">
              <p className="label mb-3 text-blue">Skickat</p>
              <h3 className="font-display text-2xl font-medium text-paper">
                Tack för ditt meddelande.
              </h3>
              <p className="mt-3 text-muted-onDark">
                Jag återkommer så snart jag kan, vanligtvis inom ett par
                dagar.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="label mt-6 text-blue underline underline-offset-4"
              >
                Skicka ett till meddelande
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="bg-graphite py-section">
      <div className="container-content">
        <SectionLabel index="04" title="Kontakt" onDark />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeInSection>
              <p className="text-base text-muted-onDark">
                Har du ett projekt, en idé eller bara en fråga? Skriv gärna —
                jag läser allt som kommer in.
              </p>
              <a
                href="mailto:ahmad@omegasoftware.se"
                className="label mt-6 inline-block text-paper underline decoration-line-onDark underline-offset-4 hover:decoration-blue"
              >
                ahmad@omegasoftware.se
              </a>
            </FadeInSection>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <FadeInSection delay={0.1}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Formspree's built-in honeypot field — hidden from real visitors */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <input
                  type="hidden"
                  name="_subject"
                  value="Nytt meddelande från portföljen"
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
            </FadeInSection>
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
