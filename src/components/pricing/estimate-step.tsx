"use client";

import {
  type ContactState,
  type EstimatorConfigState,
  budgetTypes,
  soilOptions,
  designOptions,
  storyOptions,
  roofOptions,
  projectTypes,
} from "./pricing-types";

type EstimateStepProps = {
  contact: ContactState;
  projectType: string;
  config: EstimatorConfigState;
  onBack: () => void;
};

function format(n: number) {
  return `රු ${Math.round(n).toLocaleString()}`;
}

export default function EstimateStep({
  contact,
  projectType,
  config,
  onBack,
}: EstimateStepProps) {
  const sqftVal = Number(config.sqft) || 0;

  // Retrieve option definitions
  const activeBudget = budgetTypes.find((b) => b.id === config.budgetType) || budgetTypes[0];
  const activeSoil = soilOptions.find((s) => s.id === config.soil) || soilOptions[0];
  const activeDesign = designOptions.find((d) => d.id === config.design) || designOptions[0];
  const activeStory = storyOptions.find((s) => s.id === config.stories) || storyOptions[0];
  const activeRoof = roofOptions.find((r) => r.id === config.roof) || roofOptions[0];
  const activeProjType = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  // Calculations
  const baseCost = sqftVal * activeBudget.rate;

  const soilCost = baseCost * activeSoil.factor;
  const designCost = baseCost * activeDesign.factor;
  const storyCost = baseCost * activeStory.factor;
  const roofCost = baseCost * activeRoof.factor;

  const totalCost = baseCost + soilCost + designCost + storyCost + roofCost;
  const perSqftCost = sqftVal ? Math.round(totalCost / sqftVal) : 0;

  // Construction Phase Breakdown
  const phases = [
    { title: "Structure & Civil Works", pct: 0.43, description: "Foundation, pillars, concrete, brickwork" },
    { title: "Finishing & Tiling", pct: 0.28, description: "Floor plastering, wall tiling, painting" },
    { title: "MEP (Electrical & Plumbing)", pct: 0.18, description: "Wiring, piping, switches, bathroom fixtures" },
    { title: "Doors, Windows & Fittings", pct: 0.11, description: "Main door, frames, aluminum window glass" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Estimated Construction Cost
        </h1>
        <p className="text-sm text-slate-400">
          Generated for 2026 construction rates in Sri Lanka.
        </p>
      </div>

      {/* Main Total Callout */}
      <div className="p-6 sm:p-8 rounded-[22px] border border-white/10 bg-gradient-to-br from-[#172e48]/40 to-[#121212] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <div className="absolute top-0 right-0 h-40 w-40 bg-[#4d87c8]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid gap-4 sm:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8ec3ff]">
              Total Estimated Cost
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {format(totalCost)}
            </div>
            <div className="mt-1 text-sm text-slate-400">
              Avg. Rate: <span className="text-slate-200 font-semibold">{format(perSqftCost)}</span> per sq.ft
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6 text-sm text-slate-400 space-y-2">
            <div>
              Project: <span className="text-slate-200 font-medium">{activeProjType.title}</span>
            </div>
            <div>
              Client: <span className="text-slate-200 font-medium">{contact.name}</span> ({contact.phone})
            </div>
            <div>
              Email: <span className="text-slate-200 font-medium">{contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Cards */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
          Estimated Phase Distribution
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.title}
              className="p-4 rounded-xl border border-white/8 bg-white/3 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 block">{p.title}</span>
                <span className="text-xs text-slate-500 block leading-tight mt-1">{p.description}</span>
              </div>
              <div className="mt-4">
                <span className="text-lg font-bold text-slate-200 block">{format(totalCost * p.pct)}</span>
                <span className="text-[10px] text-[#8ec3ff] font-semibold block">{Math.round(p.pct * 100)}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adjustments & Calculation Table */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
          Detailed Estimate Breakdown
        </h2>
        <div className="overflow-x-auto rounded-[16px] border border-white/10 bg-white/1.5 p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Cost Item / Options</th>
                <th className="pb-3 text-center">Factor</th>
                <th className="pb-3 text-right pr-2">Calculated Cost</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-white/5">
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Base Construction Area
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {sqftVal.toLocaleString()} Sq.Ft @ {format(activeBudget.rate)} / sq.ft ({activeBudget.title})
                  </span>
                </td>
                <td className="py-3.5 text-center text-slate-400">-</td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {format(baseCost)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Soil Condition Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeSoil.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeSoil.factor > 0 ? `+${activeSoil.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {soilCost > 0 ? `+${format(soilCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Design Complexity Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeDesign.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeDesign.factor > 0 ? `+${activeDesign.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {designCost > 0 ? `+${format(designCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Stories (Floors) Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeStory.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeStory.factor > 0 ? `+${activeStory.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {storyCost > 0 ? `+${format(storyCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Roof Design Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeRoof.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeRoof.factor > 0 ? `+${activeRoof.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {roofCost > 0 ? `+${format(roofCost)}` : format(0)}
                </td>
              </tr>
              <tr className="bg-white/2">
                <td className="py-4 pl-2 font-bold text-white text-base">Total Estimate</td>
                <td className="py-4 text-center text-slate-300 font-bold">
                  {(activeSoil.factor + activeDesign.factor + activeStory.factor + activeRoof.factor) > 0 
                    ? `+${Math.round((activeSoil.factor + activeDesign.factor + activeStory.factor + activeRoof.factor) * 100)}%` 
                    : "0%"}
                </td>
                <td className="py-4 text-right pr-2 font-extrabold text-[#8ec3ff] text-base">
                  {format(totalCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100 hover:border-white/20 hover:bg-white/4"
        >
          ← Adjust Details
        </button>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:bg-[#203f66] hover:text-white hover:border-[#3c76b8]">
            Free Site Visit & BOQ
          </button>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:bg-white/6 hover:text-white">
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

