import Image from "next/image";

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-0 w-full bg-linear-to-b from-[#24384f] to-[#131d28] text-slate-300">
      <div className="w-full">
        <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-12 xl:px-20 pt-12 pb-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16 xl:gap-24">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-lg bg-white/10 p-1.5">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Capital Engineering
                  </h4>
                  <p className="text-base text-slate-400">Ceylon (PVT) LTD</p>
                </div>
              </div>

              <p className="text-lg leading-8 text-slate-300">
                Excellence in engineering and construction — building the future
                of Sri Lanka with innovative solutions and professional
                expertise.
              </p>

              <div className="flex gap-3">
                <a className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 text-sm">
                  FB
                </a>
                <a className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 text-sm">
                  TW
                </a>
                <a className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 text-sm">
                  LN
                </a>
                <a className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 text-sm">
                  IG
                </a>
              </div>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-semibold text-slate-300">
                QUICK LINKS
              </h5>
              <ul className="space-y-3 text-lg">
                <li>
                  <a href="/" className="text-slate-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-slate-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    className="text-slate-300 hover:text-white"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    className="text-slate-300 hover:text-white"
                  >
                    Designs
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-slate-300 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-semibold text-slate-300">
                SERVICES
              </h5>
              <ul className="space-y-3 text-lg">
                <li className="text-slate-300">Engineering Consultancy</li>
                <li className="text-slate-300">Construction Management</li>
                <li className="text-slate-300">Industrial Development</li>
                <li className="text-slate-300">Design & Architecture</li>
                <li className="text-slate-300">Project Management</li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-semibold text-slate-300">
                CONTACT INFO
              </h5>
              <ul className="space-y-4 text-lg text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-400">📞</span>
                  <div>
                    <div className="text-lg">+94 777 434 403</div>
                    <div className="text-sm text-slate-400">
                      Hot Line: +94 4 981 500
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-400">✉️</span>
                  <div>
                    <div className="text-lg">info.lankacapital@gmail.com</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-400">🕒</span>
                  <div className="text-lg text-slate-300">
                    Mon–Fri: 8AM–6PM | Sat: 9AM–4PM
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 bg-[#0f2a3f] w-full">
        <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-12 xl:px-20 py-3 flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="text-lg text-slate-400">
            © 2026 Capital Engineering Ceylon (PVT) LTD. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-slate-400 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-slate-400 hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="/sitemap.xml"
              className="text-sm text-slate-400 hover:text-white"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
