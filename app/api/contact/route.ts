import { NextResponse, type NextRequest } from "next/server";
import { validateContact } from "@/lib/contact";

/**
 * Receives the contact form and forwards it by email through Resend.
 * Abuse controls: same-origin check, JSON and size limits, a honeypot field, a
 * minimum fill time and a per-address rate limit. The limit lives in memory, so
 * it is per server instance. It slows casual abuse rather than guaranteeing a quota.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const MAX_BODY_BYTES = 16 * 1024;

const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return json({ error: "This request was not accepted." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "This request was not accepted." }, 415);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return json({ error: "The form is not connected yet. Please email us directly." }, 503);
  }

  const now = Date.now();
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(address, now)) {
    return json({ error: "Too many messages from this connection. Please try again later." }, 429);
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return json({ error: "That message is too long." }, 413);
  }

  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("shape");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "This request was not accepted." }, 400);
  }

  // Anything that trips the bot checks gets a normal-looking reply and is dropped.
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : 0;
  if ((typeof raw.website === "string" && raw.website.length > 0) || now - startedAt < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const { data, errors } = validateContact(raw);
  if (!data) return json({ errors }, 422);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[Suwexa Gaming] ${data.topic}, from ${data.name}`,
      text: `From: ${data.name} <${data.email}>\nTopic: ${data.topic}\n\n${data.message}`,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!response?.ok) {
    return json({ error: "Your message could not be sent just now. Please try again or email us directly." }, 502);
  }

  return json({ ok: true });
}
