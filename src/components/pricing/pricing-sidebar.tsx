import { pricingSteps } from "./pricing-types";

type PricingSidebarProps = {
  activeStep: number;
};

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 21V4.5h14V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-4h6v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h1.5M12 8h1.5M16 8h.5M8 12h1.5M12 12h1.5M16 12h.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function PricingSidebar({ activeStep }: PricingSidebarProps) {
  return (
    <aside className="border-b border-white/10 bg-white/2.5 px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#1b4f88] text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
          <span className="h-6 w-6">
            <BuildingIcon />
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-xl font-semibold tracking-[-0.03em] text-slate-100">Cost Estimator</p>
          <p className="text-sm text-slate-400">Sri Lanka · 2026 rates</p>
        </div>
      </div>

      <nav aria-label="Estimate steps" className="mt-6 space-y-2">
        {pricingSteps.map((step) => {
          const isActive = step.number === activeStep;
          const isDone = Boolean(step.done) || step.number < activeStep;

          return (
            <div
              key={step.number}
              className={`flex items-center gap-3 rounded-[18px] border px-3 py-3 transition-colors ${isActive ? "border-[#2c6fb0] bg-white/6 text-white shadow-[inset_3px_0_0_#2c6fb0]" : "border-transparent text-slate-300/80 hover:border-white/8 hover:bg-white/4"}`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${isActive ? "border-[#2c6fb0] bg-[#17395d] text-[#6fb0ff]" : isDone ? "border-white/20 bg-white/5 text-slate-200" : "border-white/18 bg-transparent text-slate-300/80"}`}
              >
                {isDone ? "✓" : step.number}
              </div>

              <span className={`text-[1.02rem] font-medium ${isActive ? "text-white" : "text-slate-300/80"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
