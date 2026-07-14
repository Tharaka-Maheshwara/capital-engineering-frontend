"use client";

import Link from "next/link";
import { Fragment } from "react";

const navigationItems = [
  { label: "Dashboard", href: "/admin/admin-dashboard", icon: DashboardIcon },
  { label: "Projects", href: "/admin/projects", icon: FolderIcon },
  { label: "Articles", href: "/admin/articles", icon: ArticleIcon },
  { label: "Designs", href: "/admin/designs", icon: PaletteIcon },
  { label: "Feedback", href: "#", icon: FeedbackIcon },
];

type AdminSidebarProps = {
  activeHref: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ activeHref, isOpen, onClose }: AdminSidebarProps) {
  const sidebarContent = (
    <aside className="relative flex h-full w-70 flex-col overflow-y-auto bg-[linear-gradient(180deg,#0c1d33_0%,#10284a_46%,#0a1627_100%)] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(92,153,190,0.18),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="relative flex flex-col gap-y-5 px-5 py-6 sm:px-6 lg:px-5 lg:py-7">
        <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="text-lg font-black tracking-[-0.06em]">CE</span>
          </div>
          <div>
            <div className="text-[0.96rem] font-semibold uppercase tracking-[0.24em] text-slate-200/70">
              Capital Engineering
            </div>
            <div className="text-[1.08rem] font-bold tracking-[-0.03em] text-white">
              Admin Command Center
            </div>
          </div>
        </div>

        <nav className="flex-1" aria-label="Admin navigation">
          <ul role="list" className="flex flex-1 flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeHref;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 text-[1rem] font-medium transition-colors duration-150 ${isActive ? "bg-white/14 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)]" : "text-slate-200/72 hover:bg-white/7 hover:text-white"}`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${isActive ? "border-white/10 bg-white/10" : "border-white/5 bg-white/5"}`}
                    >
                      <Icon />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
          <div className="text-sm font-semibold text-white">
            Security Status
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-200/70">
            Secure session active with role-based access and dashboard
            monitoring.
          </p>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            <span>Protected</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" />
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:sticky lg:top-0 lg:h-screen lg:flex lg:w-70 lg:flex-col lg:border-r lg:border-white/10">
        {sidebarContent}
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Sidebar */}
        <div className="relative flex w-full max-w-xs flex-1">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}

function DashboardIcon() {
  return (
    <GlyphIcon path="M4 13h7V4H4zm9 7h7v-12h-7zM4 20h7v-5H4zm9-14h7v-2h-7z" />
  );
}

function FolderIcon() {
  return (
    <GlyphIcon path="M3.5 7.5h6l2 2H20a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />
  );
}

function PaletteIcon() {
  return (
    <GlyphIcon path="M12 3a9 9 0 1 0 9 9c0-2.2-1.8-4-4-4h-1.2a1.8 1.8 0 0 1 0-3.6H17A5 5 0 0 0 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm2.8-3.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
  );
}

function ArticleIcon() {
  return <GlyphIcon path="M4 6h16M4 10h16M4 14h10M4 18h7" />;
}

function FeedbackIcon() {
  return (
    <GlyphIcon path="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-5 4v-4H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
  );
}

function GlyphIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
