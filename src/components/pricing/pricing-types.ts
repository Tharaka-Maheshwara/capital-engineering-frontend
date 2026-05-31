export type ProjectTypeId = "house" | "villa" | "renovation" | "commercial";

export type ContactState = {
  name: string;
  phone: string;
  email: string;
};

export type LocationState = {
  district: string;
  divisionalSecretariat: string;
  plotSize: string;
  plotShape: string;
  utilities: string;
};

export type BuildingSizeState = {
  builtUpArea: string; // sq ft
  floors: string;
  bedrooms: string;
  bathrooms: string;
  ceilingHeight: string;
  roofType: string;
  foundationType: string;
  designComplexity: string;
};

export type FinishingState = {
  grade: "Budget" | "Standard" | "Luxury" | "";
  flooring: string;
  windows: string;
  electrical: string;
  plumbing: string;
  ceiling: string;
  kitchen: string;
};

export type SpecialFeaturesState = {
  garage: boolean;
  swimmingPool: boolean;
  boundaryWall: boolean;
  solar: boolean;
  landscaping: boolean;
  generator: boolean;
  cctv: boolean;
  acPreWiring: boolean;
  servantQuarters: boolean;
  waterTank: boolean;
};

export type PricingStep = {
  number: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  done?: boolean;
};

export type ProjectTypeOption = {
  id: ProjectTypeId;
  title: string;
  subtitle: string;
};

export const pricingSteps: PricingStep[] = [
  { number: 1, label: "Project type" },
  { number: 2, label: "Location" },
  { number: 3, label: "Building size" },
  { number: 4, label: "Finishing grade" },
  { number: 5, label: "Special features" },
  { number: 6, label: "Estimate", done: true },
];

export const projectTypes: ProjectTypeOption[] = [
  {
    id: "house",
    title: "New House",
    subtitle: "Single / double storey residential",
  },
  {
    id: "villa",
    title: "Villa / Bungalow",
    subtitle: "Luxury standalone residence",
  },
  {
    id: "renovation",
    title: "Renovation / Extension",
    subtitle: "Remodel or add to existing",
  },
  {
    id: "commercial",
    title: "Commercial",
    subtitle: "Shop, office, warehouse",
  },
];

export const sriLankaDistricts = [
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

export const divisionalSecretariatTypes = ["Urban", "Suburban", "Rural"];
export const plotShapes = ["Rocky", "Marshy/Fill", "Sloped"];
