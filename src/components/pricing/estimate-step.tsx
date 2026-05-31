"use client";

import type {
  ContactState,
  BuildingSizeState,
  FinishingState,
  SpecialFeaturesState,
} from "./pricing-types";

type EstimateStepProps = {
  contact: ContactState;
  projectType: string;
  buildingSize: BuildingSizeState;
  finishing: FinishingState;
  features: SpecialFeaturesState;
  onBack: () => void;
};

function format(n: number) {
  return `රු${Math.round(n).toLocaleString()}`;
}

export default function EstimateStep({
  contact,
  projectType,
  buildingSize,
  finishing,
  features,
  onBack,
}: EstimateStepProps) {
  const area = Number(buildingSize.builtUpArea) || 0;

  const gradeRates: Record<string, [number, number]> = {
    Budget: [5500, 7500],
    Standard: [8000, 12000],
    Luxury: [13000, 20000],
  };

  const gradeKey = (finishing.grade as string) || "Standard";
  const rates = gradeRates[gradeKey] || gradeRates.Standard;

  const baseLow = area * rates[0];
  const baseHigh = area * rates[1];

  const featureRanges: Record<keyof SpecialFeaturesState, [number, number]> = {
    garage: [500000, 1000000],
    swimmingPool: [2500000, 5000000],
    boundaryWall: [700000, 1500000],
    solar: [900000, 1800000],
    landscaping: [350000, 800000],
    generator: [400000, 800000],
    cctv: [150000, 400000],
    acPreWiring: [300000, 650000],
    servantQuarters: [350000, 700000],
    waterTank: [200000, 450000],
  };

  let featuresLow = 0;
  let featuresHigh = 0;
  (Object.keys(features) as Array<keyof SpecialFeaturesState>).forEach((k) => {
    if (features[k]) {
      const r = featureRanges[k];
      featuresLow += r[0];
      featuresHigh += r[1];
    }
  });

  const totalLow = baseLow + featuresLow;
  const totalHigh = baseHigh + featuresHigh;

  const perSqLow = area ? Math.round(totalLow / area) : 0;
  const perSqHigh = area ? Math.round(totalHigh / area) : 0;

  const comps = [
    { title: "Structure & civil works", pct: 0.43 },
    { title: "Finishes (floor, wall, ceiling)", pct: 0.28 },
    { title: "Electrical, plumbing & MEP", pct: 0.18 },
    { title: "Doors, windows & joinery", pct: 0.11 },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Estimated construction cost · 2026
        </h1>
        <p className="text-sm text-slate-400">
          {format(totalLow)} - {format(totalHigh)}
        </p>
        <p className="text-sm text-slate-400">
          {format(perSqLow)} - {format(perSqHigh)} per sq.ft
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {comps.map((c) => (
          <div
            key={c.title}
            className="p-4 rounded-xl border border-white/8 bg-white/3"
          >
            <div className="text-sm text-slate-300">{c.title}</div>
            <div className="mt-2 text-lg font-semibold">
              {format(totalLow * c.pct)} - {format(totalHigh * c.pct)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {Math.round(c.pct * 100)}% of structure
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <h3 className="text-sm font-semibold text-slate-300">Cost component</h3>
        <div className="mt-3">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-slate-400">
                <th>Component</th>
                <th className="text-right">Low estimate</th>
                <th className="text-right">High estimate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Structural construction</td>
                <td className="py-2 text-right">{format(totalLow * 0.43)}</td>
                <td className="py-2 text-right">{format(totalHigh * 0.43)}</td>
              </tr>
              <tr>
                <td className="py-2">Interior upgrades</td>
                <td className="py-2 text-right">{format(totalLow * 0.28)}</td>
                <td className="py-2 text-right">{format(totalHigh * 0.28)}</td>
              </tr>
              <tr>
                <td className="py-2">Landscaping</td>
                <td className="py-2 text-right">{format(featuresLow)}</td>
                <td className="py-2 text-right">{format(featuresHigh)}</td>
              </tr>
              <tr>
                <td className="py-2">Servant quarters</td>
                <td className="py-2 text-right">
                  {format(features.servantQuarters ? 350000 : 0)}
                </td>
                <td className="py-2 text-right">
                  {format(features.servantQuarters ? 700000 : 0)}
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2 font-semibold">Total estimate</td>
                <td className="py-2 font-semibold text-right">
                  {format(totalLow)}
                </td>
                <td className="py-2 font-semibold text-right">
                  {format(totalHigh)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100"
        >
          ← Back
        </button>
        <div className="space-x-3">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80">
            Free site visit & BOQ
          </button>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80">
            Cost estimate — Word document download
          </button>
        </div>
      </div>
    </div>
  );
}
