export type DesignRecord = {
  id: number;
  mainCategory: string;
  subCategories: string[];
  imageUrls: string[];
  createdAt: string;
};

export type DesignFormState = {
  mainCategory: string;
  subCategories: string[];
};

export const designCategoryMap: Record<string, string[]> = {
  "Residential Designs": [
    "Modern Single-Story Houses",
    "Luxury Two-Story / Multi-Story Houses",
    "Budget-Friendly / Low Cost Houses",
    "Apartment & Condominium Units",
    "Tiny Houses / Eco-Friendly Homes",
  ],
  "Commercial Designs": [
    "Office Buildings / Corporate Spaces",
    "Retail Stores & Showrooms",
    "Hotels, Restaurants & Cafes",
    "Warehouses & Industrial Buildings",
  ],
  "Interior Designs": [
    "Living Room & Bedroom Concepts",
    "Modern Kitchen & Pantry Designs",
    "Bathroom & Washroom Layouts",
    "Office Interior & Lighting Concepts",
  ],
  "Exterior & Landscaping": [
    "Front Elevation Designs",
    "Garden & Courtyard Designs",
    "Swimming Pools & Outdoor Lounges",
    "Gate & Boundary Wall Designs",
  ],
  "Architectural & Structural Plans": [
    "2D Floor Plans & Blueprints",
    "3D Realistic Renderings / Virtual Tours",
    "MEP Drawings",
  ],
};
