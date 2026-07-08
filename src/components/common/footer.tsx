import Image from "next/image";
import { JSX } from "react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V10H8v3h2.3v8h3.2Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.7 3h2.6c.2 1.4 1 2.5 2.3 3v2.7a6.4 6.4 0 0 1-2.2-.6v6.1a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.7a2.5 2.5 0 1 0 1.6 2.4V3Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.7 8 10.3h-6.3L12 13.8 6.4 20H3.2l7.3-8.2L2.8 2h6.4l4.5 5.8L18.9 2Z" />
    </svg>
  );
}

function SkypeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.2a7 7 0 0 1 6.9 8.1c.4.6.6 1.3.6 2.1a3.8 3.8 0 0 1-4.7 3.7A7 7 0 0 1 5 8.7a3.8 3.8 0 0 1 4.6-3.9A6.8 6.8 0 0 1 12 4.2Zm.3 3.1c-2 0-3.4 1.1-3.4 2.7 0 1.6 1.2 2.2 3 2.6 1.3.3 1.8.5 1.8 1.1 0 .6-.6 1-1.6 1-1.1 0-1.9-.4-2.7-1.2l-1.4 1.4c1 .9 2.2 1.5 4 1.5 2.4 0 3.9-1.2 3.9-2.9 0-1.7-1.1-2.3-3.1-2.8-1.2-.3-1.7-.5-1.7-1s.5-.9 1.4-.9c.9 0 1.6.3 2.2.9l1.4-1.4c-.8-.8-1.9-1.3-3.8-1.3Z" />
    </svg>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-0 w-full bg-linear-to-b from-[#24384f] to-[#131d28] text-slate-300">
      <div className="w-full">
        <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-12 xl:px-20 pt-16 pb-12">
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
                Excellence in engineering and construction building the future
                of Sri Lanka with innovative solutions and professional
                expertise.
              </p>
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

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-slate-300">
                  FOLLOW US
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-slate-200 transition-colors hover:bg-white/16"
                  >
                    <span className="h-4 w-4">
                      <FacebookIcon />
                    </span>
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-slate-200 transition-colors hover:bg-white/16"
                  >
                    <span className="h-4 w-4">
                      <YouTubeIcon />
                    </span>
                  </a>
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-slate-200 transition-colors hover:bg-white/16"
                  >
                    <span className="h-4 w-4">
                      <TikTokIcon />
                    </span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-slate-200 transition-colors hover:bg-white/16"
                  >
                    <span className="h-4 w-4">
                      <TwitterIcon />
                    </span>
                  </a>
                  <a
                    href="https://www.skype.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Skype"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-slate-200 transition-colors hover:bg-white/16"
                  >
                    <span className="h-4 w-4">
                      <SkypeIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 bg-[#0f2a3f] w-full">
        <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-12 xl:px-20 py-4 flex flex-col items-center justify-between gap-3 md:flex-row">
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
