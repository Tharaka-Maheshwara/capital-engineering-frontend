"use client";

import { plotShapes, type LocationState } from "./pricing-types";

type LocationStepProps = {
  location: LocationState;
  stepTwoComplete: boolean;
  onLocationChange: (nextLocation: LocationState) => void;
  onBack: () => void;
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20s5-4.5 5-9a5 5 0 0 0-10 0c0 4.5 5 9 5 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="1.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function LandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 18.5 9 9.5l5 5 5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 18.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m11 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

const divisionalSecretariats = ["Urban", "Suburban", "Rural"];
export default function LocationStep({ location, stepTwoComplete, onLocationChange, onBack }: LocationStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">Project site location</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          Add the site location and plot details so the estimator can continue.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300/80">
          <span className="flex h-6 w-6 items-center justify-center text-slate-400">
            <PinIcon />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">Location</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">District</span>
            <select
              value={location.district}
              onChange={(event) => onLocationChange({ ...location, district: event.target.value })}
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            >
              {districts.map((district) => (
                <option key={district} value={district} className="bg-[#161616]">
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Divisional Secretariat</span>
            <select
              value={location.divisionalSecretariat}
              onChange={(event) => onLocationChange({ ...location, divisionalSecretariat: event.target.value })}
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            >
              {divisionalSecretariats.map((secretariat) => (
                <option key={secretariat} value={secretariat} className="bg-[#161616]">
                  {secretariat}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300/80">
          <span className="flex h-6 w-6 items-center justify-center text-slate-400">
            <LandIcon />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">Plot details</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Plot size (perches)</span>
            <input
              type="number"
              min="0"
              value={location.plotSize}
              onChange={(event) => onLocationChange({ ...location, plotSize: event.target.value })}
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Plot shape</span>
            <select
              value={location.plotShape}
              onChange={(event) => onLocationChange({ ...location, plotShape: event.target.value })}
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            >
              {plotShapes.map((shape) => (
                <option key={shape} value={shape} className="bg-[#161616]">
                  {shape}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Utilities connection</span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Connected", value: "Connected" },
                { label: "No utilities", value: "No utilities" },
              ].map((option) => {
                const isSelected = location.utilities === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onLocationChange({ ...location, utilities: option.value })}
                    className={`h-12 rounded-xl border px-4 text-[0.95rem] font-medium transition duration-150 ${isSelected ? "border-[#4d87c8] bg-[#17395d] text-slate-50 shadow-[0_0_0_1px_rgba(77,135,200,0.4)]" : "border-white/10 bg-white/4 text-slate-300/80 hover:border-white/16 hover:bg-white/5 hover:text-white"}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
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
            <span className="h-4 w-4">
              <ArrowLeftIcon />
            </span>
            <span>Back</span>
          </button>

          <button
            type="button"
            disabled={!stepTwoComplete}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:border-white/16 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:border-white/8 disabled:bg-white/2 disabled:text-slate-500"
          >
            <span>Next</span>
            <span className="h-4 w-4">
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
