"use client";

import { useRef, useState } from "react";
import {
  type EstimatorConfigState,
  type BudgetTypeId,
  budgetTypes,
  soilOptions,
  designOptions,
  storyOptions,
  roofOptions,
} from "./pricing-types";

type ConfigurationStepProps = {
  config: EstimatorConfigState;
  onConfigChange: (nextConfig: EstimatorConfigState) => void;
  onBack: () => void;
  onNext: () => void;
};

type FieldErrors = {
  sqft: boolean;
  budgetType: boolean;
};

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M5 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M19 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m11 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ConfigurationStep({
  config,
  onConfigChange,
  onBack,
  onNext,
}: ConfigurationStepProps) {
  const [errors, setErrors] = useState<FieldErrors>({ sqft: false, budgetType: false });

  const sqftSectionRef = useRef<HTMLDivElement | null>(null);
  const budgetSectionRef = useRef<HTMLDivElement | null>(null);

  const isSqftValid = Number(config.sqft) > 0;
  const isFormComplete = isSqftValid && config.budgetType;

  const handleSqftChange = (val: string) => {
    // Only allow numeric input
    const clean = val.replace(/[^0-9]/g, "");
    onConfigChange({ ...config, sqft: clean });
    if (clean && Number(clean) > 0) {
      setErrors((prev) => ({ ...prev, sqft: false }));
    }
  };

  const handleBudgetSelect = (id: BudgetTypeId) => {
    onConfigChange({ ...config, budgetType: id });
    setErrors((prev) => ({ ...prev, budgetType: false }));
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleNextClick = () => {
    const nextErrors: FieldErrors = {
      sqft: !isSqftValid,
      budgetType: !config.budgetType,
    };

    if (nextErrors.sqft || nextErrors.budgetType) {
      setErrors(nextErrors);
      // Navigate to whichever required field is missing first
      if (nextErrors.sqft) {
        scrollToRef(sqftSectionRef);
      } else if (nextErrors.budgetType) {
        scrollToRef(budgetSectionRef);
      }
      return;
    }

    setErrors({ sqft: false, budgetType: false });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Configuration details
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          Provide your floor area, budget preference, and structural conditions for an accurate estimation.
        </p>
      </div>

      {/* Main Inputs (SqFt & Budget Type) */}
      <section className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Square Footage Input */}
          <div ref={sqftSectionRef} className="md:col-span-1 space-y-2 scroll-mt-24">
            <label className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
              Building Size (Sq.Ft)
            </label>
            <div className="relative">
              <input
                type="text"
                value={config.sqft}
                onChange={(e) => handleSqftChange(e.target.value)}
                placeholder="e.g. 1500"
                aria-invalid={errors.sqft}
                className={`h-12 w-full rounded-[10px] border bg-white/4 pl-4 pr-16 text-[1rem] font-semibold text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#4d87c8] focus:bg-white/6 ${
                  errors.sqft ? "border-red-500/70" : "border-white/10"
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                sq.ft
              </span>
            </div>
            {errors.sqft ? (
              <p className="text-xs font-medium text-red-400">Please enter the building size.</p>
            ) : (
              <p className="text-xs text-slate-500">Total built-up floor area</p>
            )}
          </div>

          {/* Budget Type Cards */}
          <div ref={budgetSectionRef} className="md:col-span-2 space-y-2 scroll-mt-24">
            <label className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
              Budget Type
            </label>
            <div
              className={`grid gap-3 sm:grid-cols-3 rounded-[16px] transition ${
                errors.budgetType ? "ring-1 ring-red-500/60 p-1" : ""
              }`}
            >
              {budgetTypes.map((type) => {
                const isSelected = config.budgetType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleBudgetSelect(type.id)}
                    className={`group rounded-[14px] border p-4 text-left transition duration-150 flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? "border-[#5b87c7] bg-[#1d1d1d] shadow-[inset_0_0_0_1px_rgba(91,135,199,0.16)]"
                        : "border-white/12 bg-white/3 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <p className={`text-[0.95rem] font-bold tracking-tight ${isSelected ? "text-white" : "text-slate-100/90"}`}>
                        {type.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                    <div className={`mt-3 text-xs font-semibold ${isSelected ? "text-[#8ec3ff]" : "text-slate-400 group-hover:text-slate-300"}`}>
                      රු {type.rate.toLocaleString()} / sq.ft
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.budgetType && (
              <p className="text-xs font-medium text-red-400">Please select a budget type.</p>
            )}
          </div>
        </div>
      </section>

      {/* Structural & Site Adjusters */}
      <section className="space-y-6 pt-2 border-t border-white/5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
          Site & Structural Options
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Soil Option */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-300/90">Soil Condition</span>
            <div className="grid gap-3 grid-cols-2">
              {soilOptions.map((opt) => {
                const isSelected = config.soil === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onConfigChange({ ...config, soil: opt.id })}
                    className={`group rounded-[12px] border p-3 text-left transition duration-150 ${
                      isSelected
                        ? "border-[#5b87c7] bg-[#1d1d1d]"
                        : "border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/4"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[0.9rem] font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {opt.title}
                      </span>
                      {opt.factor > 0 && (
                        <span className="text-[11px] font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded">
                          +{opt.factor * 100}%
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 leading-normal">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Design Option */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-300/90">Design Complexity</span>
            <div className="grid gap-3 grid-cols-2">
              {designOptions.map((opt) => {
                const isSelected = config.design === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onConfigChange({ ...config, design: opt.id })}
                    className={`group rounded-[12px] border p-3 text-left transition duration-150 ${
                      isSelected
                        ? "border-[#5b87c7] bg-[#1d1d1d]"
                        : "border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/4"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[0.9rem] font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {opt.title}
                      </span>
                      {opt.factor > 0 && (
                        <span className="text-[11px] font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded">
                          +{opt.factor * 100}%
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 leading-normal">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story Option */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-300/90">Stories (Floors)</span>
            <div className="grid gap-3 grid-cols-3">
              {storyOptions.map((opt) => {
                const isSelected = config.stories === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onConfigChange({ ...config, stories: opt.id })}
                    className={`group rounded-[12px] border p-3 text-left transition duration-150 ${
                      isSelected
                        ? "border-[#5b87c7] bg-[#1d1d1d]"
                        : "border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/4"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[0.9rem] font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {opt.title}
                      </span>
                      {opt.factor > 0 && (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded">
                          +{opt.factor * 100}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roof Option */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-300/90">Roof Type</span>
            <div className="grid gap-3 grid-cols-3">
              {roofOptions.map((opt) => {
                const isSelected = config.roof === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onConfigChange({ ...config, roof: opt.id })}
                    className={`group rounded-[12px] border p-3 text-left transition duration-150 ${
                      isSelected
                        ? "border-[#5b87c7] bg-[#1d1d1d]"
                        : "border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/4"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[0.9rem] font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {opt.title}
                      </span>
                      {opt.factor > 0 && (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded">
                          +{opt.factor * 100}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:border-white/16 hover:bg-white/3 hover:text-white"
          >
            <ArrowLeftIcon />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNextClick}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#4d87c8] px-6 text-[0.95rem] font-medium text-white transition duration-200 hover:bg-[#5a98e0] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>Generate Cost</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
