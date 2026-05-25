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
      <div role="status" className="rounded-md bg-emerald-700/20 p-4 text-emerald-200">
        Thanks — your message was sent. We'll be in touch shortly.
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="w-full" aria-label="Contact form">
      <input
        type="text"
        name="website"
        value={form.honey}
        onChange={(e) => update("honey", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">Full Name *</label>
          <input
            className="mt-2 w-full rounded-lg bg-[#12263b]/60 border border-slate-700 px-3 py-2 placeholder-slate-400 text-slate-100 focus:outline-none"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            aria-required
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Email Address *</label>
          <input
            type="email"
            className="mt-2 w-full rounded-lg bg-[#12263b]/60 border border-slate-700 px-3 py-2 placeholder-slate-400 text-slate-100 focus:outline-none"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            aria-required
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Phone Number</label>
          <input
            className="mt-2 w-full rounded-lg bg-[#12263b]/60 border border-slate-700 px-3 py-2 placeholder-slate-400 text-slate-100 focus:outline-none"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(555) 000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Project Type *</label>
          <select
            className="mt-2 w-full rounded-lg bg-[#12263b]/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
          >
            <option value="">Select type...</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Renovation</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300">Message *</label>
          <textarea
            className="mt-2 w-full rounded-lg bg-[#12263b]/60 border border-slate-700 px-3 py-3 placeholder-slate-400 text-slate-100 focus:outline-none"
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            required
            placeholder="Tell us about your project..."
          />
        </div>
      </div>

      {error && <div className="text-rose-400 mt-2">{error}</div>}

      <div className="mt-4">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-600/60 px-4 py-3 text-slate-100 disabled:opacity-60"
          disabled={loading}
        >
          <span>{loading ? "Sending..." : "Send Message"}</span>
          <svg className="h-4 w-4 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 12l19-9-9 19-2-7-8-3z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
