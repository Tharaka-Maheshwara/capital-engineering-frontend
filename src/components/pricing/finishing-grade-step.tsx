"use client";

import type { FinishingState } from "./pricing-types";

type FinishingStepProps = {
  finishing: FinishingState;
  stepFourComplete: boolean;
  onFinishingChange: (next: FinishingState) => void;
  onBack: () => void;
  onNext: () => void;
};

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 17.3 6.1 20l1.1-6.3L2 9.6l6.4-.9L12 3l3.6 5.7 6.4.9-5.2 3.9L17.9 20z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FinishingGradeStep({ finishing, stepFourComplete, onFinishingChange, onBack, onNext }: FinishingStepProps) {
  const grades = [
    { id: "Budget", title: "Budget", subtitle: "Cement floors, basic paint, local fittings", range: "රු5,500–7,500/sqft" },
    { id: "Standard", title: "Standard", subtitle: "Tiles, aluminium windows, painted walls", range: "රු8,000–12,000/sqft" },
    { id: "Luxury", title: "Luxury", subtitle: "Imported tiles, premium fittings", range: "රු13,000–20,000+/sqft" },
  ];

  const interiorOptions = {
    flooring: ["Cement / Terrazzo", "Ceramic tiles (+රු180k)", "Porcelain / Granite (+රු380k)", "Marble (+රු700k)"],
    windows: ["Timber frames", "Aluminium (+රු220k)", "UPVC (+රු220k)"],
    electrical: ["Standard", "Modular switches (+රු150k)", "Smart home (+රු500k)"],
    plumbing: ["Local fittings", "Imported fittings (+රු250k)"],
    ceiling: ["Plaster", "Board ceiling (+රු100k)", "Suspended (+රු250k)"],
    kitchen: ["Basic kitchen", "Modern kitchen (+රු200k)", "Island / Designer (+රු500k)"],
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">Finishing & fittings grade</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">Overall finishing quality level සහ key interior selections තෝරන්න. මේවට total cost range එකට බලපායි.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">Finishing grade</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {grades.map((g) => {
            const selected = finishing.grade === (g.id as any);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onFinishingChange({ ...finishing, grade: g.id as any })}
                className={`p-4 rounded-xl border ${selected ? "border-[#5b87c7] bg-[#1d1d1d]" : "border-white/8 bg-white/3"}`}>
                <div className="flex items-start gap-3">
                  <span className="h-8 w-8 text-slate-300/90"><StarIcon /></span>
                  <div className="text-left">
                    <div className="font-semibold text-white">{g.title}</div>
                    <div className="text-sm text-slate-400">{g.subtitle}</div>
                    <div className="text-sm text-[#8ec3ff] mt-2">{g.range}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300/80">Interior upgrades</h3>
          <div className="grid gap-3 sm:grid-cols-3 mt-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Flooring</span>
              <select value={finishing.flooring} onChange={(e) => onFinishingChange({ ...finishing, flooring: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.flooring.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Windows</span>
              <select value={finishing.windows} onChange={(e) => onFinishingChange({ ...finishing, windows: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.windows.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Electrical</span>
              <select value={finishing.electrical} onChange={(e) => onFinishingChange({ ...finishing, electrical: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.electrical.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Plumbing</span>
              <select value={finishing.plumbing} onChange={(e) => onFinishingChange({ ...finishing, plumbing: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.plumbing.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Ceiling</span>
              <select value={finishing.ceiling} onChange={(e) => onFinishingChange({ ...finishing, ceiling: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.ceiling.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300/90">Kitchen</span>
              <select value={finishing.kitchen} onChange={(e) => onFinishingChange({ ...finishing, kitchen: e.target.value })} className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100">
                {interiorOptions.kitchen.map((o) => <option key={o} value={o} className="bg-[#161616]">{o}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100">← Back</button>
          <button type="button" disabled={!stepFourComplete} onClick={onNext} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80">Next →</button>
        </div>
      </div>
    </div>
  );
}
