export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#163b63] to-[#0f2a47] py-20 md:py-28">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 48px)`}} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
            LET'S BUILD TOGETHER
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Ready to Start Your Next Project?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
            Let's discuss how we can bring your construction vision to life. Get a free consultation and project estimate today.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#08305a] shadow-lg hover:shadow-xl"
            >
              Contact Us Today
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14" stroke="#08305a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5l7 7-7 7" stroke="#08305a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="/projects"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
            >
              View Our Designs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
