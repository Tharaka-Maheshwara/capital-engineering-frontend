export default function Home() {
  return (
    <main className="mx-auto w-[min(1280px,calc(100%-48px))] py-12 md:py-16">
      <section
        id="contact"
        className="flex min-h-[54vh] items-end rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,16,27,0.34),rgba(7,16,27,0.12))] p-8 backdrop-blur-md md:p-11"
      >
        <div>
          <p className="mb-2.5 text-[0.82rem] uppercase tracking-[0.18em] text-white/70">
            Capital Engineering Ceylon
          </p>
          <h1 className="max-w-[10ch] text-[clamp(2.4rem,5vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
            Structural confidence with a clear, modern header.
          </h1>
          <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-7 text-slate-100/80">
            The navbar now mirrors the requested composition and includes Pricing and Articles.
          </p>
        </div>
      </section>
    </main>
  );
}
