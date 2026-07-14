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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(15,23,42,0.05),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_22%)]" />

      <div className="relative mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            Quick Contact
          </span>

          <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl md:text-4xl">
            Reach the Right Team, Faster
          </h2>

          <p className="mt-4 text-[0.98rem] leading-7 text-slate-500 sm:text-[1.02rem]">
            Use the most direct channel below for project inquiries, email, or
            urgent support.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5 xl:gap-6">
          <Card
            icon={<IconPhone />}
            accent="from-slate-800 via-slate-500 to-slate-800"
            iconBg="from-slate-900 to-slate-600"
            title="Call Us"
            subtitle="Speak with our team"
            primary="+94 777 434 403"
            secondary="Mon–Fri, 8AM–6PM"
          />
          <Card
            icon={<IconMail />}
            accent="from-[#20395f] via-[#5b7595] to-[#20395f]"
            iconBg="from-[#20395f] to-[#4f6a8a]"
            title="Email Us"
            subtitle="Send project details"
            primary="info.lankacapital@gmail.com"
            secondary="We reply within 24 hours"
          />
          <Card
            icon={<IconPhone />}
            accent="from-[#6f88a8] via-[#94a5bc] to-[#6f88a8]"
            iconBg="from-[#6f88a8] to-[#879bb6]"
            title="Hotline"
            subtitle="For urgent queries"
            primary="011 4 981 500"
            secondary="Available 24/7"
          />
          <Card
            icon={<IconClock />}
            accent="from-[#20395f] via-[#879bb6] to-[#20395f]"
            iconBg="from-slate-800 to-slate-500"
            title="Office Hours"
            subtitle="Visit or schedule a call"
            primary="Mon–Fri: 8AM–6PM"
            secondary="Sat: 9AM–4PM"
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  accent,
  iconBg,
  title,
  subtitle,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  accent: string;
  iconBg: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-7">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent}`}
      />
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${iconBg} text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)] transition-transform duration-200 group-hover:scale-105`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {title}
          </span>
          <h3 className="mt-2 text-[1.05rem] font-semibold tracking-[-0.02em] text-slate-900">
            {subtitle}
          </h3>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm leading-6 text-slate-600">
        <p className="wrap-break-word text-[0.98rem] font-semibold text-slate-800">
          {primary}
        </p>
        <p>{secondary}</p>
      </div>
    </div>
  );
}
