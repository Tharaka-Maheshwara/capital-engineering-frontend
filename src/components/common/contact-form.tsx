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

  const apiBaseUrl =

    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";



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

      const res = await fetch(`${apiBaseUrl}/api/v1/contact`, {

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

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "Something went wrong");

    } finally {

      setLoading(false);

    }

  }



  if (success)

    return (

      <div

        role="status"

        className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100 shadow-[0_16px_30px_rgba(3,15,31,0.18)]"

      >

        Thanks — your message was sent. We&apos;ll be in touch shortly.

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



      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>

          <label className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-300/85">

            Full Name *

          </label>

          <input

            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 placeholder-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-sky-300/50 focus:bg-white/8"

            value={form.name}

            onChange={(e) => update("name", e.target.value)}

            required

            aria-required

            placeholder="John Smith"

          />

        </div>



        <div>

          <label className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-300/85">

            Email Address *

          </label>

          <input

            type="email"

            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 placeholder-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-sky-300/50 focus:bg-white/8"

            value={form.email}

            onChange={(e) => update("email", e.target.value)}

            required

            aria-required

            placeholder="john@example.com"

          />

        </div>



        <div>

          <label className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-300/85">

            Phone Number

          </label>

          <input

            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 placeholder-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-sky-300/50 focus:bg-white/8"

            value={form.phone}

            onChange={(e) => update("phone", e.target.value)}

            placeholder="(555) 000-0000"

          />

        </div>



        <div>

          <label className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-300/85">

            Project Type *

          </label>

          <select

            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-sky-300/50 focus:bg-white/8"

            value={form.subject}

            onChange={(e) => update("subject", e.target.value)}

          >

            <option value="" className="bg-[#17324a] text-slate-50">

              Select type

            </option>

            <option value="Residential" className="bg-[#17324a] text-slate-50">

              Residential

            </option>

            <option value="Commercial" className="bg-[#17324a] text-slate-50">

              Commercial

            </option>

            <option value="Industrial" className="bg-[#17324a] text-slate-50">

              Industrial

            </option>

            <option value="Renovation" className="bg-[#17324a] text-slate-50">

              Renovation

            </option>

          </select>

        </div>



        <div className="md:col-span-2">

          <label className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-300/85">

            Message *

          </label>

          <textarea

            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-50 placeholder-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-sky-300/50 focus:bg-white/8"

            rows={6}

            value={form.message}

            onChange={(e) => update("message", e.target.value)}

            required

            placeholder="Tell us about your project..."

          />

        </div>

      </div>



      {error && (

        <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">

          {error}

        </div>

      )}



      <div className="mt-5">

        <button

          type="submit"

          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-slate-100 to-white px-4 py-3.5 font-semibold text-[#17324a] shadow-[0_16px_34px_rgba(3,15,31,0.2)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"

          disabled={loading}

        >

          <span>{loading ? "Sending..." : "Send Message"}</span>

          <svg

            className="h-4 w-4 text-[#17324a]"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24"

          >

            <path

              strokeWidth="2"

              strokeLinecap="round"

              strokeLinejoin="round"

              d="M2 12l19-9-9 19-2-7-8-3z"

            />

          </svg>

        </button>

      </div>

    </form>

  );

}