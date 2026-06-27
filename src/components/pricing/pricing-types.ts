export type ProjectTypeId = "house" | "villa" | "renovation" | "commercial";

export type ContactState = {
  name: string;
  phone: string;
  email: string;
};

export type BudgetTypeId = "budget-friendly" | "semi-luxury" | "luxury";
export type SoilType = "normal" | "poor";
export type DesignComplexity = "simple" | "complex";
export type StoryType = "1" | "2" | "3";
export type RoofType = "slab" | "hiped" | "multy-gable";

export type EstimatorConfigState = {
  sqft: string;
  budgetType: BudgetTypeId;
  soil: SoilType;
  design: DesignComplexity;
  stories: StoryType;
  roof: RoofType;
};

export type PricingStep = {
  number: 1 | 2 | 3;
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
  { number: 2, label: "Configuration" },
  { number: 3, label: "Estimate", done: true },
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

export const budgetTypes = [
  {
    id: "budget-friendly" as BudgetTypeId,
    title: "Budget Friendly",
    rate: 8000,
    description: "Standard construction using quality materials at a budget-conscious price.",
  },
  {
    id: "semi-luxury" as BudgetTypeId,
    title: "Semi-Luxury",
    rate: 12000,
    description: "Premium materials, elegant finishes, and refined architecture.",
  },
  {
    id: "luxury" as BudgetTypeId,
    title: "Luxury",
    rate: 16000,
    description: "Top-tier custom specifications, imported fittings, and grand aesthetics.",
  },
];

export const soilOptions = [
  {
    id: "normal" as SoilType,
    title: "Normal Soil",
    factor: 0.0,
    description: "Good load-bearing capability. Standard strip/column foundations.",
  },
  {
    id: "poor" as SoilType,
    title: "Poor Soil",
    factor: 0.10,
    description: "Marshy, loose, or fill ground. Requires additional foundation treatment (+10%).",
  },
];

export const designOptions = [
  {
    id: "simple" as DesignComplexity,
    title: "Simple Design",
    factor: 0.0,
    description: "Clean, straight lines. Highly efficient and cost-effective layout.",
  },
  {
    id: "complex" as DesignComplexity,
    title: "Complex Design",
    factor: 0.08,
    description: "Architectural custom structures, extensions, and complex styling (+8%).",
  },
];

export const storyOptions = [
  {
    id: "1" as StoryType,
    title: "1 Story",
    factor: 0.0,
    description: "Single-floor slab/foundation structure.",
  },
  {
    id: "2" as StoryType,
    title: "2 Stories",
    factor: 0.10,
    description: "Double floor construction layout (+10%).",
  },
  {
    id: "3" as StoryType,
    title: "3 Stories",
    factor: 0.20,
    description: "Triple floor layout with structural reinforcement (+20%).",
  },
];

export const roofOptions = [
  {
    id: "slab" as RoofType,
    title: "Concrete Slab",
    factor: 0.0,
    description: "Reinforced flat concrete roof slab.",
  },
  {
    id: "hiped" as RoofType,
    title: "Hiped Roof",
    factor: 0.05,
    description: "Elegant sloping hip roof with modern tiles/sheets (+5%).",
  },
  {
    id: "multy-gable" as RoofType,
    title: "Multy Gable",
    factor: 0.10,
    description: "Architecturally complex roof design with multi-sided gables (+10%).",
  },
];

