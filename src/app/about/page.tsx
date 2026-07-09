import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";

import FeedbackFormSection from "@/components/common/feedback-form-section";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Capital Engineering Ceylon, our values, team, and track record delivering trusted construction projects.",
  alternates: {
    canonical: "/about",
  },
};

const coreValues = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality, ensuring every project meets the highest standards of craftsmanship.",
    icon: TargetIcon,
  },
  {
    title: "Transparency",
    description:
      "Clear communication and honest dealings with all our clients, partners, and stakeholders.",
    icon: EyeIcon,
  },
  {
    title: "Integrity",
    description:
      "We build lasting relationships based on trust, respect, and unwavering ethical practices.",
    icon: HeartIcon,
  },
];

const clientAdvantages = [
  "Licensed and insured professionals",
  "On-time project delivery",
  "Competitive, transparent pricing",
  "Advanced construction techniques",
  "Eco-friendly building practices",
  "24/7 dedicated client support",
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="/images/slider-4.png"
            alt="Capital Engineering team reviewing plans on site"
            className="h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,20,34,0.88)_0%,rgba(18,37,58,0.72)_48%,rgba(18,37,58,0.38)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.06)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.06)_96%)] bg-size-[64px_64px] opacity-30" />
        </div>

        <div className="relative flex min-h-[60vh] lg:min-h-[78vh] w-full items-center px-4 py-16 sm:px-6 lg:px-10">
          <div className="max-w-3xl lg:max-w-4xl lg:ml-40 mx-auto lg:mx-0 text-center lg:text-left">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-200/80 backdrop-blur-sm">
              About Capital Engineering Ceylon
            </span>

            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-7xl">
              Our Story of
              <span className="block text-slate-400">Building Excellence</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200/90 sm:text-lg">
              Over 15 years of creating remarkable structures and lasting client
              relationships across the region. From residential builds to
              large-scale infrastructure, we combine precision, reliability, and
              engineering expertise in every project we deliver.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-900 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              Our Journey
            </span>

            <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
              Built on Trust, Driven by Excellence
            </h2>

            <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-slate-600">
              Founded in 2010, Capital Engineering Ceylon has grown from a small
              local contractor to one of the region&apos;s most trusted
              construction companies. Our journey began with a simple mission:
              to deliver exceptional construction services while maintaining the
              highest standards of quality and integrity.
            </p>

            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600">
              Today, we&apos;ve successfully completed over 500 projects,
              ranging from residential homes to large-scale commercial
              developments. Our team of 150+ dedicated professionals brings
              expertise, innovation, and passion to every project.
            </p>

            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600">
              What sets us apart is our commitment to understanding our
              clients&apos; vision and bringing it to life with precision and
              care - building not just structures, but lasting legacies.
            </p>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-slate-500 px-6 py-4 text-[0.98rem] font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-600"
              >
                Work With Us
                <span aria-hidden="true" className="text-xl leading-none">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-130 lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
              <div className="relative aspect-4/5">
                <Image
                  src="/images/slider-4.png"
                  alt="Capital Engineering site team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="hidden sm:block absolute -right-3 top-6 rounded-[18px] bg-slate-500 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] sm:right-3 sm:top-8">
              <div className="text-3xl font-extrabold leading-none">98%</div>
              <div className="mt-1 text-sm font-medium text-white/85">
                Client Satisfaction
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-6 left-4 rounded-[18px] bg-slate-800 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] sm:left-6">
              <div className="text-3xl font-extrabold leading-none">500+</div>
              <div className="mt-1 text-sm font-medium text-white/75">
                Projects Completed
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#20385c_0%,#1b2f4d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.04)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.04)_96%)] bg-size-[64px_64px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_44%)]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-200/70 backdrop-blur-sm">
              What We Stand For
            </span>

            <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Our Core Values
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200/75 sm:text-lg">
              The principles that guide every decision, every project, and every
              relationship we build.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {coreValues.map((value) => (
              <CoreValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-900 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              The Capital Engineering Ceylon Edge
            </span>

            <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
              Why Our Clients Keep Coming Back
            </h2>

            <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-slate-600">
              We don&apos;t just build structures - we build trust. Our
              commitment to excellence goes beyond the final handover; we aim
              for relationships that last a lifetime.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {clientAdvantages.map((advantage) => (
                <div
                  key={advantage}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                    <CheckIcon />
                  </span>
                  <span className="text-[0.98rem] leading-6 text-slate-700">
                    {advantage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-136 lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
              <div className="relative aspect-[0.95/1] min-h-[280px] sm:min-h-[360px] lg:min-h-[496px]">
                <Image
                  src="/images/slider-4.png"
                  alt="Capital Engineering flagship commercial project"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,15,29,0.08)_0%,rgba(6,15,29,0.25)_100%)]" />

              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-[#2f4a77]/95 px-5 py-4 text-white shadow-[0_20px_45px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[1.02rem] font-semibold leading-6">
                      Skyline Tower — 2025
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Flagship Commercial Project
                    </div>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/8 px-4 py-1.5 text-xs font-medium text-white/55">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeedbackFormSection />
    </main>
  );
}

function CoreValueCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ComponentType;
}) {
  return (
    <article className="rounded-[22px] border border-white/8 bg-[#162443] px-8 py-10 text-center shadow-[0_18px_48px_rgba(4,12,28,0.24)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-b from-slate-500 to-slate-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        <span className="h-8 w-8">
          <Icon />
        </span>
      </div>

      <h3 className="mt-7 text-xl font-semibold text-white">{title}</h3>

      <p className="mt-4 text-[0.98rem] leading-7 text-slate-300/80">
        {description}
      </p>
    </article>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-9.5-9C.5 7.5 3 4.5 6.5 4.5c1.9 0 3.5 1 4.5 2.4 1-1.4 2.6-2.4 4.5-2.4 3.5 0 6 3 4 6.5-2.5 4.6-9.5 9-9.5 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6.5 12.5 3.4 3.4 7.6-7.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
