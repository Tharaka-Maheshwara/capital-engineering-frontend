"use client";

import { useState } from "react";
import PricingSidebar from "./pricing-sidebar";
import ProjectTypeStep from "./project-type-step";
import ConfigurationStep from "./configuration-step";
import EstimateStep from "./estimate-step";
import {
  type ContactState,
  type ProjectTypeId,
  type EstimatorConfigState,
  projectTypes,
} from "./pricing-types";

export default function PricingEstimator() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectTypeId>("house");
  const [contact, setContact] = useState<ContactState>({
    name: "",
    phone: "",
    email: "",
  });

  const [estimatorConfig, setEstimatorConfig] = useState<EstimatorConfigState>({
    sqft: "",
    budgetType: "budget-friendly",
    soil: "normal",
    design: "simple",
    stories: "1",
    roof: "slab",
  });

  const stepOneComplete =
    contact.name.trim().length > 0 &&
    contact.phone.trim().length > 0 &&
    contact.email.trim().length > 0 &&
    selectedProjectType.length > 0;

  const stepTwoComplete =
    estimatorConfig.sqft.trim().length > 0 &&
    Number(estimatorConfig.sqft) > 0 &&
    estimatorConfig.budgetType.length > 0;

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[#161616] shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,99,154,0.18),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(255,255,255,0.04),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />

        <div className="relative grid min-h-180 lg:grid-cols-[280px_minmax(0,1fr)]">
          <PricingSidebar activeStep={currentStep} />

          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
            <div className="max-w-4xl">
              {currentStep === 1 ? (
                <ProjectTypeStep
                  contact={contact}
                  selectedProjectType={selectedProjectType}
                  projectTypes={projectTypes}
                  stepOneComplete={stepOneComplete}
                  onContactChange={setContact}
                  onProjectTypeChange={setSelectedProjectType}
                  onNext={() => setCurrentStep(2)}
                />
              ) : currentStep === 2 ? (
                <ConfigurationStep
                  config={estimatorConfig}
                  onConfigChange={setEstimatorConfig}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              ) : currentStep === 3 ? (
                <EstimateStep
                  contact={contact}
                  projectType={selectedProjectType}
                  config={estimatorConfig}
                  onBack={() => setCurrentStep(2)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

