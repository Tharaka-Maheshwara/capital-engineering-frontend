import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Licensed & Fully Insured",
  "ISO Certified Quality",
  "On-Time Delivery",
  "Eco-Friendly Practices",
  "Advanced Techniques",
  "24/7 Client Support",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CompanyOverviewSection() {
  return (
    <section className="relative overflow-hidden bg-[#20395f] py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_24%)] pointer-events-none" />

      <div className="relative mx-auto grid w-[min(1280px,calc(100%-48px))] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-130 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <div className="relative aspect-4/5 overflow-hidden rounded-[22px] bg-slate-700">
              <Image
                src="/images/slider-4.png"
                alt="Capital Engineering team reviewing plans"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm lg:block" />

          <div className="absolute -bottom-6 left-1/2 w-37.5 -translate-x-1/2 rounded-[22px] bg-[#7e92ad] px-5 py-4 text-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.18)] sm:left-auto sm:-right-4 sm:translate-x-0">
            <div className="text-4xl font-extrabold leading-none">15+</div>
            <div className="mt-2 text-sm font-medium text-white/90">
              Years of Excellence
            </div>
          </div>
        </div>

        <div className="text-slate-50">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-300/80">
            Who We Are
          </span>

          <h2 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            More Than Just a Construction Company
          </h2>

          <p className="mt-6 max-w-[58ch] text-[1rem] leading-8 text-slate-300/85">
            Founded in 2010, Capital Engineering Ceylon has grown from a local
            contractor into one of the region&apos;s most trusted construction
            firms. Our journey is built on a simple mission: deliver exceptional
            work while upholding the highest standards of quality and integrity.
          </p>

          <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-slate-300/85">
            Today, with 500+ completed projects and 150+ dedicated
            professionals, we bring expertise, innovation, and passion to every
            structure we raise.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-[0.98rem] text-slate-100"
              >
                <span className="inline-flex h-5 w-5 flex-none items-center justify-center text-slate-300/90">
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#879bb6] px-6 py-4 text-[0.98rem] font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#98acc4]"
            >
              Learn Our Story
              <span aria-hidden="true" className="text-xl leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
