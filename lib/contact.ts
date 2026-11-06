/** Validation shared by the contact form and the contact endpoint. */
export const LIMITS = { name: 80, email: 160, message: 4000, minMessage: 10 } as const;

export const TOPICS = ["General enquiry", "Publishing or partnership", "Carrom Crest support", "Press"] as const;
export type Topic = (typeof TOPICS)[number];

export type ContactInput = {
  name: string;
  email: string;
  topic: Topic;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:.]{2,}$/;

// Control characters are removed from single-line fields, which also rules out header injection.
const singleLine = (value: unknown) => (typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim() : "");

export function validateContact(raw: Record<string, unknown>): { data?: ContactInput; errors: ContactErrors } {
  const name = singleLine(raw.name);
  const email = singleLine(raw.email);
  const topic = singleLine(raw.topic);
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  const errors: ContactErrors = {};
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!EMAIL.test(email) || email.length > LIMITS.email) errors.email = "Please enter a valid email address.";

  if (!TOPICS.includes(topic as Topic)) errors.topic = "Please choose a topic.";

  if (message.length < LIMITS.minMessage) errors.message = "Please write a little more, so we can help.";
  else if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  if (Object.keys(errors).length > 0) return { errors };
  return { data: { name, email, topic: topic as Topic, message }, errors };
}

export function mailtoHref(to: string, input: ContactInput) {
  const subject = `${input.topic}, from ${input.name}`;
  const body = `${input.message}\n\n${input.name}\n${input.email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
