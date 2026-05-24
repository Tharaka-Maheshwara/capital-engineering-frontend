"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Designs", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header className="relative z-10">
      <div className="border-b border-white/10 bg-slate-950/95">
        <div className="flex min-h-14.5 w-full flex-wrap items-center justify-center gap-3 px-6 py-2 text-[0.82rem] text-slate-100 md:justify-between md:gap-7 md:py-0 md:text-[0.95rem] lg:px-8">
          <a
            href="tel:+94777434403"
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            +94 777 434 403
          </a>
          <a
            href="mailto:info.lankacapital@gmail.com"
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            info.lankacapital@gmail.com
          </a>
          <a
            href="tel:+944981500"
            className="ml-auto inline-flex items-center gap-2 whitespace-nowrap"
          >
            Hot Line: +94 4 981 500
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.02)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,37,58,0.9),rgba(18,37,58,0.64)),linear-gradient(135deg,transparent_0_76%,rgba(255,255,255,0.05)_76%_78%,transparent_78%_100%),radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.05),transparent_18%)] backdrop-blur-md" />
        <div className="relative flex min-h-23 w-full flex-col items-center gap-4 px-6 py-4 lg:flex-row lg:justify-between lg:gap-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Capital Engineering Logo"
              width={74}
              height={74}
              className="h-18.5 w-18.5 flex-none rounded-[18px] object-contain bg-white/5 p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
              priority
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-slate-50 lg:text-[1.55rem]">
                Capital Engineering (PVT) LTD
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-wrap items-center justify-center gap-1"
          >
            {links.map((link) => {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-3.5 py-3 text-[1.02rem] font-medium text-slate-200/70 transition-colors duration-150 hover:text-slate-50 md:px-4 md:py-4 md:text-[1.04rem]"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#contact"
            className="flex-none rounded-[14px] bg-slate-400/95 px-6 py-4 text-base font-bold text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
