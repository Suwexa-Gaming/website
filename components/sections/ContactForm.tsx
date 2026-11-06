"use client";

import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/primitives";
import { LIMITS, TOPICS, mailtoHref, validateContact, type ContactErrors } from "@/lib/contact";

type Status = { kind: "idle" | "sending" | "sent" | "drafted" } | { kind: "failed"; message: string };

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-lg text-bone transition-colors placeholder:text-ash/60 hover:border-ash focus:border-gold focus:outline-none aria-invalid:border-[#d9685d]";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-[0.65rem] text-ash">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#ec9087]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ hasBackend, email }: { hasBackend: boolean; email: string }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const { data, errors: found } = validateContact(raw);
    setErrors(found);
    if (!data) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Without a mail service configured, hand the message to the visitor's own email app.
    if (!hasBackend) {
      window.location.href = mailtoHref(email, data);
      setStatus({ kind: "drafted" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, startedAt: startedAt.current }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (response.ok && result.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else {
        if (result.errors) setErrors(result.errors);
        setStatus({ kind: "failed", message: result.error ?? "Please check the form and try again." });
      }
    } catch {
      setStatus({ kind: "failed", message: "Your message could not be sent just now. Please try again or email us directly." });
    }
  }

  if (status.kind === "sent") {
    return (
      <p role="status" className="voice text-4xl text-bone">
        Thank you. <em className="text-ash">Your message is with us.</em>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={markStarted} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="topic" label="What is it about?" error={errors.topic}>
        <select id="topic" name="topic" defaultValue={TOPICS[0]} className={`${fieldClass} [&>option]:bg-ink-2`}>
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Your message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {/* Left empty by people. Automated submissions tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary disabled:opacity-60">
          {status.kind === "sending" ? "Sending" : hasBackend ? "Send message" : "Continue in your email app"} <Arrow />
        </button>
        <p role="status" className="text-sm text-ash">
          {status.kind === "failed" ? <span className="text-[#ec9087]">{status.message}</span> : null}
          {status.kind === "drafted" ? "Your email app should now be open with your message ready to send." : null}
        </p>
      </div>
    </form>
  );
}
