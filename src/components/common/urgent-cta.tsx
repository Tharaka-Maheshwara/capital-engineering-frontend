import Link from "next/link";
import React from "react";

function IconPhoneSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export default function UrgentCta() {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <div className="overflow-hidden rounded-[20px] border border-white/6 bg-[linear-gradient(180deg,#172b45_0%,#12263b_100%)] p-6 shadow-[0_24px_60px_rgba(3,15,31,0.24)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200/80">
              24/7 HOT LINE
            </span>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              Need Urgent Engineering Help?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              We're available around the clock for emergency situations.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="tel:+944981500"
              className="inline-flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(3,15,31,0.24)] hover:bg-white/12"
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white/6 p-2">
                <IconPhoneSmall />
              </span>
              <span>+94 4 981 500</span>
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
