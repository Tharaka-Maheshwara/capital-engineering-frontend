"use client";

import type { SpecialFeaturesState } from "./pricing-types";

type SpecialFeaturesStepProps = {
  features: SpecialFeaturesState;
  stepFiveComplete: boolean;
  onFeaturesChange: (next: SpecialFeaturesState) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function SpecialFeaturesStep({
  features,
  stepFiveComplete,
  onFeaturesChange,
  onBack,
  onNext,
}: SpecialFeaturesStepProps) {
  const items = [
    { id: "garage", title: "Garage / Carport", range: "රු.500k - 1.0M" },
    { id: "swimmingPool", title: "Swimming pool", range: "රු.2.5M - 5.0M" },
    {
      id: "boundaryWall",
      title: "Boundary wall & gate",
      range: "රු.700k - 1.5M",
    },
    { id: "solar", title: "Solar panel system", range: "රු.900k - 1.8M" },
    { id: "landscaping", title: "Landscaping", range: "රු.350k - 800k" },
    { id: "generator", title: "Backup generator", range: "රු.400k - 800k" },
    { id: "cctv", title: "CCTV & security", range: "රු.150k - 400k" },
    { id: "acPreWiring", title: "AC pre-wiring", range: "රු.300k - 650k" },
    {
      id: "servantQuarters",
      title: "Servant quarters",
      range: "රු.350k - 700k",
    },
    {
      id: "waterTank",
      title: "Underground water tank",
      range: "රු.200k - 450k",
    },
  ] as const;

  function toggle(id: keyof SpecialFeaturesState) {
    onFeaturesChange({
      ...features,
      [id]: !features[id],
    } as SpecialFeaturesState);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Additional structures & services
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          Main building එකට අමතරව include කිරීමට අවශ්‍ය features සහ structures
          තෝරන්න.
        </p>
      </div>

      <section>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((it) => {
            const key = it.id as keyof SpecialFeaturesState;
            const selected = features[key];
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => toggle(key)}
                className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${selected ? "border-[#5b87c7] bg-[#1d1d1d]" : "border-white/8 bg-white/3"}`}
              >
                <div>
                  <div className="font-semibold text-white">{it.title}</div>
                  <div className="text-sm text-slate-400">{it.range}</div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    readOnly
                    checked={selected}
                    className="h-4 w-4"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100"
          >
            ← Back
          </button>
          <button
            type="button"
            disabled={!stepFiveComplete}
            onClick={onNext}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80"
          >
            Generate estimate
          </button>
        </div>
      </div>
    </div>
  );
}
