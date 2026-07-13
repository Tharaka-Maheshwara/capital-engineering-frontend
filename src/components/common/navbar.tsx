"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthSession, type AuthSession } from "@/lib/auth";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Designs", href: "/designs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19a8 8 0 0 1 16 0"
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
        strokeLinejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getUserDisplayName(authSession: AuthSession | null): string {
  if (!authSession) {
    return "Login";
  }

  const name = authSession.user.name.trim();
  if (name) {
    return name;
  }

  return authSession.user.email.split("@")[0] || "Account";
}

function getUserInitials(authSession: AuthSession | null): string {
  if (!authSession) {
    return "U";
  }

  const name = authSession.user.name.trim();
  if (name) {
    const nameParts = name.split(/\s+/).filter(Boolean);
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  }

  const emailName = authSession.user.email.split("@")[0];
  return emailName.slice(0, 2).toUpperCase() || "U";
}

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); // Added for custom modal
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const updateAuthState = () => {
      setAuthSession(getAuthSession());
    };
    const authTimer = window.setTimeout(updateAuthState, 0);
    window.addEventListener("auth-session-changed", updateAuthState);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("auth-session-changed", updateAuthState);
      window.clearTimeout(authTimer);
    };
  }, []);

  const isActiveLink = (href: string) => {
    const [cleanHref, hash] = href.split("#");

    if (hash) {
      return pathname === cleanHref && activeHash === `#${hash}`;
    }

    if (cleanHref === "/") {
      return pathname === "/";
    }

    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  // Open custom confirmation instead of browser confirm
  const handleLogoutClick = () => {
    setIsLogoutConfirmOpen(true);
  };

  // Execute actual logout action
  const confirmLogout = () => {
    clearAuthSession();
    setAuthSession(null);
    setIsMenuOpen(false);
    setIsLogoutConfirmOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-slate-950/95">
        <div
          className={`grid w-full grid-cols-1 gap-2 px-4 text-center text-[1rem] text-slate-100 transition-all duration-300 ease-out sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-6 sm:text-[1.08rem] md:text-[1.18rem] lg:px-8 ${isScrolled ? "py-2 sm:min-h-14" : "py-4 sm:min-h-20"}`}
        >
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
        <div
          className={`relative w-full px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8 ${isScrolled ? "py-2.5" : "py-4"}`}
        >
          <div
            className={`flex w-full items-center justify-between gap-3 transition-all duration-300 ease-out lg:gap-8 ${isScrolled ? "min-h-16" : "min-h-23"}`}
          >
            <Link href="/" className="inline-flex min-w-0 items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Capital Engineering Logo"
                width={74}
                height={74}
                className={`flex-none rounded-[18px] object-contain bg-white/5 p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.24)] transition-all duration-300 ease-out ${isScrolled ? "h-12 w-12 sm:h-14 sm:w-14" : "h-16 w-16 sm:h-18.5 sm:w-18.5"}`}
                priority
              />
              <span
                className={`hidden min-w-0 flex-col leading-tight transition-all duration-300 ease-out sm:flex ${isScrolled ? "opacity-90" : "opacity-100"}`}
              >
                <span
                  className={`truncate font-bold tracking-[-0.03em] text-slate-50 transition-all duration-300 ease-out ${isScrolled ? "text-[1.05rem] lg:text-[1.28rem]" : "text-[1.2rem] lg:text-[1.55rem]"}`}
                >
                  Capital Engineering Ceylon (Pvt) Ltd
                </span>
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden flex-1 flex-wrap items-center justify-center gap-1 lg:flex"
            >
              {links.map((link) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3.5 py-3 text-[1.02rem] font-medium transition-colors duration-150 md:px-4 md:py-4 md:text-[1.04rem] ${isActive ? "text-slate-50" : "text-slate-200/70 hover:text-slate-50"} after:absolute after:bottom-1.5 after:left-3.5 after:h-0.5 after:w-[calc(100%-1.75rem)] after:origin-center after:rounded-full after:bg-slate-50 after:transition-transform after:duration-200 after:content-[''] md:after:left-4 md:after:w-[calc(100%-2rem)] ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label={
                authSession
                  ? `Signed in as ${getUserDisplayName(authSession)}`
                  : "Go to login page"
              }
              onClick={() => {
                if (!authSession) {
                  router.push("/auth/login");
                }
              }}
              className="hidden ml-auto items-center gap-3 rounded-[14px] bg-slate-400/95 px-4 py-2 text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95 lg:flex"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950/25 text-sm font-bold tracking-[0.08em] text-white">
                {authSession ? getUserInitials(authSession) : <UserIcon />}
              </span>
              <span className="min-w-0 text-left text-sm font-semibold leading-tight">
                {getUserDisplayName(authSession)}
              </span>
            </button>

            {authSession ? (
              <button
                type="button"
                onClick={handleLogoutClick}
                className="hidden rounded-[14px] border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10 lg:inline-flex"
              >
                Logout
              </button>
            ) : null}

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
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-[14px] px-3 py-3 text-[1rem] font-medium transition-colors duration-150 ${isActive ? "bg-white/8 text-slate-50 underline decoration-2 underline-offset-8" : "text-slate-200/80 hover:bg-white/5 hover:text-slate-50"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                if (!authSession) {
                  router.push("/auth/login");
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-slate-400/95 px-5 py-3 text-sm font-bold text-slate-50 shadow-[0_10px_22px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-slate-300/95 lg:hidden"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950/25 text-xs font-bold tracking-[0.08em] text-white">
                {authSession ? getUserInitials(authSession) : <UserIcon />}
              </span>
              <span className="max-w-[12rem] truncate">
                {getUserDisplayName(authSession)}
              </span>
            </button>

            {authSession ? (
              <button
                type="button"
                onClick={handleLogoutClick}
                className="inline-flex items-center justify-center rounded-[14px] border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10 lg:hidden"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>



      {/* --- CUSTOM LOGOUT CONFIRMATION MODAL (NO LOCALHOST WORDING) --- */}
      {isLogoutConfirmOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsLogoutConfirmOpen(false)} 
          />
          
          {/* Modal Content Card */}
          <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-50">
              Confirm Logout
            </h3>
            <p className="mt-2 text-[1.02rem] text-slate-300">
              Are you sure you want to log out of your account?
            </p>
            
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="rounded-[14px] bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}