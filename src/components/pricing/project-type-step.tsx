"use client";

import type { ContactState, ProjectTypeId, ProjectTypeOption } from "./pricing-types";

type ProjectTypeStepProps = {
  contact: ContactState;
  selectedProjectType: ProjectTypeId;
  projectTypes: ProjectTypeOption[];
  stepOneComplete: boolean;
  onContactChange: (nextContact: ContactState) => void;
  onProjectTypeChange: (projectType: ProjectTypeId) => void;
  onNext: () => void;
};

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4.5 11 7.5-6 7.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10.5V20h10v-9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VillaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4.5 12 7.5-7 7.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10.8V20h9V10.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 20v-4h2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 13h1.2M12.8 13H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RenovationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 19 4-1 10-10-3-3-10 10-1 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 6 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 21V4.5h14V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h2M8 12h2M8 16h2M14 8h2M14 12h2M14 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ProjectTypeStep({
  contact,
  selectedProjectType,
  projectTypes,
  stepOneComplete,
  onContactChange,
  onProjectTypeChange,
  onNext,
}: ProjectTypeStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">Project type</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          Start with your contact details and project type to unlock the next step.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300/80">
          <span className="flex h-6 w-6 items-center justify-center text-slate-400">
            <ContactIcon />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">Contact details</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Name</span>
            <input
              type="text"
              value={contact.name}
              onChange={(event) => onContactChange({ ...contact, name: event.target.value })}
              placeholder="Kamal Perera"
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 placeholder:text-slate-400/75 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Phone</span>
            <input
              type="tel"
              value={contact.phone}
              onChange={(event) => onContactChange({ ...contact, phone: event.target.value })}
              placeholder="071 xxx xxxx"
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 placeholder:text-slate-400/75 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300/90">Email</span>
            <input
              type="email"
              value={contact.email}
              onChange={(event) => onContactChange({ ...contact, email: event.target.value })}
              placeholder="your@email.co"
              className="h-12 w-full rounded-[10px] border border-white/10 bg-white/4 px-4 text-[1rem] text-slate-100 placeholder:text-slate-400/75 outline-none transition focus:border-[#4d87c8] focus:bg-white/6"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">Project type</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {projectTypes.map((projectType) => {
            const Icon =
              projectType.id === "house"
                ? HouseIcon
                : projectType.id === "villa"
                  ? VillaIcon
                  : projectType.id === "renovation"
                    ? RenovationIcon
                    : CommercialIcon;

            const isSelected = selectedProjectType === projectType.id;

            return (
              <button
                key={projectType.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onProjectTypeChange(projectType.id)}
                className={`group min-h-24 rounded-[14px] border p-4 text-left transition duration-150 ${isSelected ? "border-[#5b87c7] bg-[#1d1d1d] shadow-[inset_0_0_0_1px_rgba(91,135,199,0.16)]" : "border-white/12 bg-white/3 hover:border-white/20 hover:bg-white/5"}`}
              >
                <span className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-[10px] ${isSelected ? "bg-[#243f61] text-[#8ec3ff]" : "bg-white/5 text-slate-300/90"}`}>
                  <Icon />
                </span>

                <div className="space-y-1">
                  <p className={`text-[1.02rem] font-semibold ${isSelected ? "text-white" : "text-slate-100/95"}`}>{projectType.title}</p>
                  <p className="text-sm text-slate-400">{projectType.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            {stepOneComplete
              ? "All required details are filled. You can continue to location."
              : "Fill all contact fields to continue to the next step."}
          </p>

          <button
            type="button"
            disabled={!stepOneComplete}
            onClick={onNext}
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
