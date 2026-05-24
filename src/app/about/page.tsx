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
          <div className="max-w-3xl lg:max-w-4xl">
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
    </main>
  );
}
