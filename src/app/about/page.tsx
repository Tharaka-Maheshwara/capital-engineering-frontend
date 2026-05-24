import Image from "next/image";
import Link from "next/link";

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

        <div className="relative flex min-h-[78vh] w-full items-center px-4 py-20 sm:px-6 lg:px-10">
          <div className="max-w-3xl lg:max-w-4xl ml-60">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-200/80 backdrop-blur-sm">
              About Capital Engineering Ceylon
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Our Story of
              <span className="block text-slate-400">Building Excellence</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/90 sm:text-xl">
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
                href="/services"
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

            <div className="absolute -right-3 top-6 rounded-[18px] bg-slate-500 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] sm:right-3 sm:top-8">
              <div className="text-3xl font-extrabold leading-none">98%</div>
              <div className="mt-1 text-sm font-medium text-white/85">
                Client Satisfaction
              </div>
            </div>

            <div className="absolute -bottom-6 left-4 rounded-[18px] bg-slate-800 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] sm:left-6">
              <div className="text-3xl font-extrabold leading-none">500+</div>
              <div className="mt-1 text-sm font-medium text-white/75">
                Projects Completed
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
