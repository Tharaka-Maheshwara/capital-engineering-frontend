"use client";

import type { BuildingSizeState } from "./pricing-types";

type BuildingSizeStepProps = {
  buildingSize: BuildingSizeState;
  stepThreeComplete: boolean;
  onBuildingSizeChange: (next: BuildingSizeState) => void;
  onBack: () => void;
  onNext: () => void;
};

function LayoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 11.5h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 11.5v7h4v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11.5v7h4v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BuildingSizeStep({
  buildingSize,
  stepThreeComplete,
  onBuildingSizeChange,
  onBack,
  onNext,
}: BuildingSizeStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Built-up area — layout
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          Built-up area, rooms and a simple structural choices estimate.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300/80">
          <span className="flex h-6 w-6 items-center justify-center text-slate-400">
            <LayoutIcon />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
            Built-up
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Built-up area (sq. ft.)
            </span>
            <input
              type="number"
              min="0"
              value={buildingSize.builtUpArea}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  builtUpArea: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Floors
            </span>
            <input
              type="number"
              min="0"
              value={buildingSize.floors}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  floors: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Bedrooms
            </span>
            <input
              type="number"
              min="0"
              value={buildingSize.bedrooms}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  bedrooms: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Bathrooms
            </span>
            <input
              type="number"
              min="0"
              value={buildingSize.bathrooms}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  bathrooms: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Ceiling height
            </span>
            <select
              value={buildingSize.ceilingHeight}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  ceilingHeight: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            >
              {["9 ft (standard)", "10–12 ft (+6%)"].map((opt) => (
                <option key={opt} value={opt} className="bg-[#161616]">
                  {opt}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">
              Roof type
            </span>
            <select
              value={buildingSize.roofType}
              onChange={(e) =>
                onBuildingSizeChange({
                  ...buildingSize,
                  roofType: e.target.value,
                })
              }
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            >
              {["Pitched / Gable", "Box / Flat slab (+12%)"].map((opt) => (
                <option key={opt} value={opt} className="bg-[#161616]">
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300/80">
            Foundation & structure
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 mt-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">
                Foundation type
              </span>
              <select
                value={buildingSize.foundationType}
                onChange={(e) =>
                  onBuildingSizeChange({
                    ...buildingSize,
                    foundationType: e.target.value,
                  })
                }
                className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
              >
                {["Strip foundation", "Raft foundation (+6%)"].map((opt) => (
                  <option key={opt} value={opt} className="bg-[#161616]">
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">
                Design complexity
              </span>
              <select
                value={buildingSize.designComplexity}
                onChange={(e) =>
                  onBuildingSizeChange({
                    ...buildingSize,
                    designComplexity: e.target.value,
                  })
                }
                className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
              >
                {[
                  "Simple (rectangular)",
                  "Moderate (L/T shape)",
                  "Complex (curves / cantilevers)",
                ].map((opt) => (
                  <option key={opt} value={opt} className="bg-[#161616]">
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100 transition duration-150 hover:border-white/20 hover:bg-white/5"
          >
            ← Back
          </button>

          <button
            type="button"
            disabled={!stepThreeComplete}
            onClick={onNext}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:border-white/16 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:border-white/8 disabled:bg-white/2 disabled:text-slate-500"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
