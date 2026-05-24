"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Designs", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/#contact" },
];

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 5h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9l5 3-5 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-10">
      <div className="border-b border-white/10 bg-slate-950/95">
        <div className="grid w-full grid-cols-1 gap-2 px-4 py-2 text-center text-[0.75rem] text-slate-100 sm:min-h-14.5 sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-6 sm:text-[0.85rem] md:text-[0.95rem] lg:px-8">
          <a
            href="tel:+94777434403"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap sm:justify-self-start sm:text-left"
          >
            +94 777 434 403
          </a>
          <a
            href="mailto:info.lankacapital@gmail.com"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap sm:justify-self-center"
          >
            info.lankacapital@gmail.com
          </a>
          <a
            href="tel:+944981500"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap sm:justify-self-end sm:text-right"
          >
            Hot Line: +94 4 981 500
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.02)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,37,58,0.9),rgba(18,37,58,0.64)),linear-gradient(135deg,transparent_0_76%,rgba(255,255,255,0.05)_76%_78%,transparent_78%_100%),radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.05),transparent_18%)] backdrop-blur-md" />
        <div className="relative w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-h-23 w-full items-center justify-between gap-3">
            <Link href="/" className="inline-flex min-w-0 items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Capital Engineering Logo"
                width={74}
                height={74}
                className="h-16 w-16 flex-none rounded-[18px] object-contain bg-white/5 p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.24)] sm:h-18.5 sm:w-18.5"
                priority
              />
              <span className="hidden min-w-0 flex-col leading-none sm:flex">
                <span className="truncate text-[1.2rem] font-bold tracking-[-0.03em] text-slate-50 lg:text-[1.55rem]">
                  Capital Engineering (PVT) LTD
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <nav
                aria-label="Primary"
                className="flex flex-wrap items-center justify-center gap-1"
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
                href="/login"
                aria-label="Login"
                className="inline-flex flex-none items-center gap-2 rounded-[14px] bg-slate-400/95 px-5 py-3 text-sm font-bold text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95 md:px-6 md:py-4 md:text-base"
              >
                <span className="sr-only">Login</span>
                <span className="h-5 w-5 shrink-0">
                  <LoginIcon />
                </span>
                <span>Login</span>
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[14px] bg-slate-400/95 text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95 lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <span className="h-5 w-5">
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </span>
            </button>
          </div>

          <div
            id="primary-navigation"
            className={`${isMenuOpen ? "flex" : "hidden"} mt-4 flex-col gap-3 rounded-[18px] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-md lg:hidden`}
          >
            <nav aria-label="Mobile Primary" className="flex flex-col gap-1">
              {links.map((link) => {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-[14px] px-3 py-3 text-[1rem] font-medium text-slate-200/80 transition-colors duration-150 hover:bg-white/5 hover:text-slate-50"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-slate-400/95 px-5 py-3 text-sm font-bold text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95"
            >
              <span className="h-5 w-5 shrink-0">
                <LoginIcon />
              </span>
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
