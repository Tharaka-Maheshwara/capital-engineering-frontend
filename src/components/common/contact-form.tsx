"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honey: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honey: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill Name, Email and Message fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        honey: "",
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success)
    return (
      <div role="status" className="rounded-md bg-green-50 p-4 text-green-800">
        Thanks — your message was sent. We'll be in touch shortly.
      </div>
    );

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl space-y-4"
      aria-label="Contact form"
    >
      <input
        type="text"
        name="website"
        value={form.honey}
        onChange={(e) => update("honey", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
          aria-required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          aria-required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone (optional)</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Subject</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          className="mt-1 w-full rounded border px-3 py-2"
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          required
        />
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
