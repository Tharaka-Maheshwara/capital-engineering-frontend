"use client";

import { useState } from "react";
import PricingSidebar from "./pricing-sidebar";
import ProjectTypeStep from "./project-type-step";
import LocationStep from "./location-step";
import BuildingSizeStep from "./building-size-step";
import FinishingGradeStep from "./finishing-grade-step";
import SpecialFeaturesStep from "./special-features-step";
import {
  type ContactState,
  type LocationState,
  type BuildingSizeState,
  type ProjectTypeId,
  projectTypes,
} from "./pricing-types";

type PricingStep = 1 | 2 | 3 | 4 | 5 | 6;

export default function PricingEstimator() {
  const [currentStep, setCurrentStep] = useState<PricingStep>(1);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectTypeId>("house");
  const [contact, setContact] = useState<ContactState>({
    name: "",
    phone: "",
    email: "",
  });
  const [location, setLocation] = useState<LocationState>({
    district: "Colombo",
    divisionalSecretariat: "Urban",
    plotSize: "20",
    plotShape: "Rocky",
    utilities: "Connected",
  });

  const [buildingSize, setBuildingSize] = useState<BuildingSizeState>({
    builtUpArea: "1500",
    floors: "2",
    bedrooms: "3",
    bathrooms: "2",
    ceilingHeight: "9 ft (standard)",
    roofType: "Pitched / Gable",
    foundationType: "Strip foundation",
    designComplexity: "Simple (rectangular)",
  });

  const [finishing, setFinishing] = useState({
    grade: "Standard",
    flooring: "Cement / Terrazzo",
    windows: "Aluminium frames",
    electrical: "Standard",
    plumbing: "Local fittings",
    ceiling: "Plaster",
    kitchen: "Modern kitchen (+රු200k)",
  });

  const [specialFeatures, setSpecialFeatures] = useState({
    garage: false,
    swimmingPool: false,
    boundaryWall: false,
    solar: false,
    landscaping: false,
    generator: false,
    cctv: false,
    acPreWiring: false,
    servantQuarters: false,
    waterTank: false,
  });

  const stepOneComplete =
    contact.name.trim().length > 0 &&
    contact.phone.trim().length > 0 &&
    contact.email.trim().length > 0 &&
    selectedProjectType.length > 0;

  const stepTwoComplete =
    location.district.trim().length > 0 &&
    location.divisionalSecretariat.trim().length > 0 &&
    location.plotSize.trim().length > 0 &&
    location.plotShape.trim().length > 0 &&
    location.utilities.trim().length > 0;

  const stepThreeComplete =
    buildingSize.builtUpArea.trim().length > 0 &&
    buildingSize.floors.trim().length > 0 &&
    buildingSize.bedrooms.trim().length > 0 &&
    buildingSize.bathrooms.trim().length > 0;

  const stepFourComplete =
    (finishing as any).grade && (finishing as any).grade.length > 0;
  const stepFiveComplete = true;

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
                <LocationStep
                  location={location}
                  stepTwoComplete={stepTwoComplete}
                  onLocationChange={setLocation}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              ) : currentStep === 3 ? (
                <BuildingSizeStep
                  buildingSize={buildingSize}
                  stepThreeComplete={stepThreeComplete}
                  onBuildingSizeChange={setBuildingSize}
                  onBack={() => setCurrentStep(2)}
                  onNext={() => setCurrentStep(4)}
                />
              ) : currentStep === 4 ? (
                <FinishingGradeStep
                  finishing={finishing as any}
                  stepFourComplete={stepFourComplete}
                  onFinishingChange={setFinishing as any}
                  onBack={() => setCurrentStep(3)}
                  onNext={() => setCurrentStep(5)}
                />
              ) : currentStep === 5 ? (
                <SpecialFeaturesStep
                  features={specialFeatures as any}
                  stepFiveComplete={stepFiveComplete}
                  onFeaturesChange={setSpecialFeatures as any}
                  onBack={() => setCurrentStep(4)}
                  onNext={() => setCurrentStep(6)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
