import React from "react";

function IconPhone() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2A19 19 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12 1.04.36 2.05.7 3.02a2 2 0 0 1-.45 2.11L9.91 11.09a13 13 0 0 0 4 4l1.24-1.24a2 2 0 0 1 2.11-.45c.97.34 1.98.58 3.02.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8.5l-9 6-9-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactCards() {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5 xl:gap-6">
          <div className="group rounded-3xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-800 to-slate-600 text-white shadow-[0_12px_24px_rgba(30,41,59,0.28)] transition-transform duration-200 group-hover:scale-105">
              <IconPhone />
            </div>
            <h4 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-slate-900">
              Call Us
            </h4>
            <p className="space-y-1 text-sm leading-6 text-slate-600">
              <span className="block text-[0.98rem] font-medium text-slate-700">
                +94 777 434 403
              </span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Mon–Fri, 8AM–6PM
              </span>
            </p>
          </div>

          <div className="group rounded-3xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-800 to-slate-600 text-white shadow-[0_12px_24px_rgba(30,41,59,0.28)] transition-transform duration-200 group-hover:scale-105">
              <IconMail />
            </div>
            <h4 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-slate-900">
              Email Us
            </h4>
            <p className="space-y-1 text-sm leading-6 text-slate-600">
              <span className="block text-[0.98rem] font-medium text-slate-700">
                info.lankacapital@gmail.com
              </span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                We reply within 24hrs
              </span>
            </p>
          </div>

          <div className="group rounded-3xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-800 to-slate-600 text-white shadow-[0_12px_24px_rgba(30,41,59,0.28)] transition-transform duration-200 group-hover:scale-105">
              <IconPhone />
            </div>
            <h4 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-slate-900">
              Hot Line
            </h4>
            <p className="space-y-1 text-sm leading-6 text-slate-600">
              <span className="block text-[0.98rem] font-medium text-slate-700">
                +94 4 981 500
              </span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Available 24/7
              </span>
            </p>
          </div>

          <div className="group rounded-3xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-800 to-slate-600 text-white shadow-[0_12px_24px_rgba(30,41,59,0.28)] transition-transform duration-200 group-hover:scale-105">
              <IconClock />
            </div>
            <h4 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-slate-900">
              Office Hours
            </h4>
            <p className="space-y-1 text-sm leading-6 text-slate-600">
              <span className="block text-[0.98rem] font-medium text-slate-700">
                Mon–Fri: 8AM–6PM
              </span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Sat: 9AM–4PM
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
