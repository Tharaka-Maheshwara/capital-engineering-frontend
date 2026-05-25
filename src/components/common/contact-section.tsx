"use client";

import React from "react";
import ContactForm from "@/components/common/contact-form";

export default function ContactSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
      <section>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#172b45_0%,#12263b_100%)] p-6 shadow-[0_24px_60px_rgba(3,15,31,0.28)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.08),transparent_22%)]" />

          <div className="relative mb-8 max-w-2xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/85">
              MESSAGE US
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-50 sm:text-[1.75rem]">
              Send Us a Message
            </h2>
            <p className="mt-2 max-w-xl leading-7 text-slate-300/90">
              We’d love to hear about your project — tell us a bit about it and
              we’ll get back quickly.
            </p>
          </div>

          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h3 className="text-[1.02rem] font-semibold tracking-[-0.02em] text-slate-900">
              Find Us on the Map
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Visit our office or pin the location for later.
            </p>
          </div>

          <div className="h-56 overflow-hidden sm:h-64">
          <iframe
            title="Company location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537353153169!3d-37.81627974202179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0xabcdefabcdef!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sau!4v1620000000000"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#16324a] p-6 shadow-[0_20px_50px_rgba(3,15,31,0.24)] sm:p-7">
          <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-slate-50">
            Why Work With Capital Engineering Ceylon?
          </h3>
          <ul className="mt-5 space-y-3 text-slate-300/90">
            {[
              "Free initial consultation and project estimate",
              "Licensed, bonded, and fully insured",
              "Professional engineering expertise",
              "Dedicated project manager for every build",
              "Transparent pricing — no hidden costs",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-none text-slate-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[0.98rem] leading-6">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
