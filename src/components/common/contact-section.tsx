"use client";

import React from "react";
import ContactForm from "@/components/common/contact-form";

export default function ContactSection() {
  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      <section>
        <div className="rounded-2xl border border-slate-700 bg-[#162a43] p-8 shadow-lg max-w-2xl">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-[#17324a] px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
              MESSAGE US
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-100">
              Send Us a Message
            </h2>
            <p className="mt-2 text-slate-300">
              We’d love to hear about your project — tell us a bit about it and
              we’ll get back quickly.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <aside className="space-y-6">
        <div className="h-56 rounded-2xl overflow-hidden border border-slate-700 shadow-sm">
          <iframe
            title="Company location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537353153169!3d-37.81627974202179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0xabcdefabcdef!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sau!4v1620000000000"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#16324a]/60 p-6">
          <h3 className="text-lg font-semibold text-slate-100">
            Why Work With Capital Engineering Ceylon?
          </h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            {[
              "Free initial consultation and project estimate",
              "Licensed, bonded, and fully insured",
              "Professional engineering expertise",
              "Dedicated project manager for every build",
              "Transparent pricing — no hidden costs",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-slate-300 mt-1"
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
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
