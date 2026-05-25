import Image from "next/image";

const navigationItems = [
  { label: "Dashboard", active: true, icon: DashboardIcon },
  { label: "Services", icon: LayersIcon },
  { label: "Projects", icon: FolderIcon },
  { label: "Team", icon: TeamIcon },
  { label: "Users", icon: UsersIcon },
  { label: "Settings", icon: SettingsIcon },
];

const metricCards = [
  {
    title: "Active Services",
    value: "08",
    tone: "from-slate-900/95 via-slate-800/90 to-slate-900/80",
    image: "/images/slider-3.png",
    action: "Create Service",
    icon: PlusIcon,
  },
  {
    title: "Ongoing Projects",
    value: "12",
    tone: "from-slate-800/95 via-slate-700/90 to-slate-900/80",
    image: "/images/slider-4.png",
    action: "Manage Projects",
    icon: ArrowRightIcon,
  },
  {
    title: "System Users",
    value: "24",
    tone: "from-slate-600/90 via-slate-500/90 to-slate-700/90",
    image: "/images/slider-4.png",
    action: "Manage Admins",
    icon: UsersIcon,
  },
];

const activityItems = [
  {
    title: "Project milestone approved",
    description: "Skyline Urban Development moved to the final finishing stage.",
    time: "12 minutes ago",
  },
  {
    title: "New service request received",
    description: "Client asked for structural consultation and BOQ review.",
    time: "1 hour ago",
  },
  {
    title: "Team roster updated",
    description: "Two engineers and one supervisor were assigned to a new site.",
    time: "Today",
  },
];

const quickActions = [
  "Add new project",
  "Publish service",
  "Invite team member",
  "Review contact requests",
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0c1d33_0%,#10284a_46%,#0a1627_100%)] text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:w-70 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(92,153,190,0.18),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_22%)]" />
          <div className="relative flex h-full flex-col px-5 py-6 sm:px-6 lg:px-5 lg:py-7">
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

            <nav className="mt-8 flex flex-1 flex-col gap-2" aria-label="Admin navigation">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    aria-current={item.active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 text-[1rem] font-medium transition-colors duration-150 ${item.active ? "bg-white/14 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)]" : "text-slate-200/72 hover:bg-white/7 hover:text-white"}`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${item.active ? "border-white/10 bg-white/10" : "border-white/5 bg-white/5"}`}>
                      <Icon />
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
              <div className="text-sm font-semibold text-white">Security Status</div>
              <p className="mt-2 text-sm leading-6 text-slate-200/70">
                Secure session active with role-based access and dashboard monitoring.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                <span>Protected</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  Welcome, Admin!
                </h1>
              </div>

              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-700"
                aria-label="Logout"
              >
                <LogoutIcon />
              </button>
            </div>
          </header>

          <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-[linear-gradient(90deg,#112747_0%,#172d4b_55%,#23465e_100%)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(112,164,187,0.16),transparent_18%),radial-gradient(circle_at_92%_78%,rgba(255,255,255,0.06),transparent_12%)]" />
              <div className="relative max-w-3xl">
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100/80 backdrop-blur-sm">
                  Capital Engineering Command Center
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Manage services, projects, and team operations from one place.
                </h2>
                <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-slate-100/78 sm:text-[1.05rem]">
                  This dashboard is set up to match the professional admin style in the screenshot, with a strong left rail, summary cards, and quick access actions.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
              <div className="grid gap-5 lg:grid-cols-3">
                {metricCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.title}
                      className={`relative min-h-57.5 overflow-hidden rounded-3xl bg-linear-to-br ${card.tone} p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]`}
                    >
                      <Image
                        src={card.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-20 mix-blend-soft-light"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.22)_0%,rgba(5,10,18,0.48)_100%)]" />
                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <p className="text-[1.03rem] font-medium text-white/82">
                            {card.title}
                          </p>
                          <div className="mt-3 text-6xl font-semibold tracking-[-0.08em] text-white">
                            {card.value}
                          </div>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[0.96rem] font-medium text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.15)] transition-transform duration-150 hover:-translate-y-0.5"
                          >
                            {card.action}
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-slate-700">
                              <Icon />
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Quick Actions
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                      Operations
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Live
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="flex w-full items-center justify-between rounded-[18px] border border-slate-200 px-4 py-4 text-left text-[0.98rem] font-medium text-slate-700 transition-colors duration-150 hover:border-slate-300 hover:bg-slate-50"
                    >
                      <span>{action}</span>
                        <span className="text-slate-400">-&gt;</span>
                    </button>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Recent Activity
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                      Platform updates
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-slate-500">Updated now</span>
                </div>

                <div className="mt-5 space-y-4">
                  {activityItems.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[18px] border border-slate-200 bg-slate-50/80 px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-[1rem] font-semibold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="mt-1 max-w-2xl text-[0.96rem] leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                          {item.time}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Overview
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  System snapshot
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[18px] bg-[linear-gradient(180deg,#eef4fb_0%,#e6edf6_100%)] p-4">
                    <div className="text-sm font-medium text-slate-500">
                      Secure session
                    </div>
                    <div className="mt-2 text-3xl font-semibold tracking-tighter text-slate-900">
                      Active
                    </div>
                  </div>
                  <div className="rounded-[18px] bg-[linear-gradient(180deg,#edf7f2_0%,#e2f0e8_100%)] p-4">
                    <div className="text-sm font-medium text-slate-500">
                      Pending tasks
                    </div>
                    <div className="mt-2 text-3xl font-semibold tracking-tighter text-slate-900">
                      06
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[20px] bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] p-5 text-white">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                    Admin note
                  </div>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/85">
                    Use this area for alerts, approvals, or operational highlights without changing the overall professional look.
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function DashboardIcon() {
  return <GlyphIcon path="M4 13h7V4H4zm9 7h7v-12h-7zM4 20h7v-5H4zm9-14h7v-2h-7z" />;
}

function LayersIcon() {
  return <GlyphIcon path="M12 3l9 5-9 5-9-5 9-5zm0 9l9 5-9 5-9-5 9-5z" />;
}

function FolderIcon() {
  return <GlyphIcon path="M3.5 7.5h6l2 2H20a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />;
}

function TeamIcon() {
  return <GlyphIcon path="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm6 0a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 15 11zM3.5 19a5.5 5.5 0 0 1 11 0" />;
}

function UsersIcon() {
  return <GlyphIcon path="M9 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 12zm8 1a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 17 13zM2.5 20a6.5 6.5 0 0 1 13 0m2-3a4.5 4.5 0 0 1 4.5 4.5" />;
}

function SettingsIcon() {
  return <GlyphIcon path="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm8 3.5l-2.1.8a6.9 6.9 0 0 1-.7 1.7l1 2-1.7 1.7-2-1a6.9 6.9 0 0 1-1.7.7L12 21l-1.8-.1a6.9 6.9 0 0 1-1.7-.7l-2 1-1.7-1.7 1-2a6.9 6.9 0 0 1-.7-1.7L3 12l.1-1.8a6.9 6.9 0 0 1 .7-1.7l-1-2L4.5 5l2 1a6.9 6.9 0 0 1 1.7-.7L12 3l1.8.1a6.9 6.9 0 0 1 1.7.7l2-1 1.7 1.7-1 2a6.9 6.9 0 0 1 .7 1.7L20 12z" />;
}

function PlusIcon() {
  return <GlyphIcon path="M12 5v14M5 12h14" />;
}

function ArrowRightIcon() {
  return <GlyphIcon path="M5 12h14m-6-6l6 6-6 6" />;
}

function LogoutIcon() {
  return <GlyphIcon path="M10 17l5-5-5-5M15 12H3m12-7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3" />;
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