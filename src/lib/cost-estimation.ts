export type CostEstimationEntry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  sqft: number;
  budget_type: string;
  soil: string;
  design: string;
  stories: string;
  roof: string;
  base_cost: string;
  total_cost: string;
  created_at: string;
};

type CostEstimationApiCollection = {
  data?: CostEstimationEntry[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type SubmitCostEstimationInput = {
  name: string;
  phone: string;
  email: string;
  project_type: string;
  sqft: number;
  budget_type: string;
  soil: string;
  design: string;
  stories: string;
  roof: string;
  base_cost: number;
  total_cost: number;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function fetchCostEstimations(
  page = 1,
  perPage = 15,
  search = "",
): Promise<{
  data: CostEstimationEntry[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(
    `${apiBaseUrl}/api/v1/cost-estimations?${params.toString()}`,
    {
      cache: "no-store",
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to load cost estimations");
  }

  const payload = (await response.json()) as CostEstimationApiCollection;
  return {
    data: Array.isArray(payload.data) ? payload.data : [],
    meta: payload.meta ?? { current_page: 1, last_page: 1, per_page: perPage, total: 0 },
  };
}

export async function submitCostEstimation(
  data: SubmitCostEstimationInput,
): Promise<CostEstimationEntry> {
  const response = await fetch(`${apiBaseUrl}/api/v1/cost-estimations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = (await response.json().catch(() => null)) as {
    data?: CostEstimationEntry;
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Failed to submit cost estimation");
  }

  if (!payload?.data) {
    throw new Error("Cost estimation submitted but no data was returned");
  }

  return payload.data;
}

export async function deleteCostEstimation(id: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/v1/cost-estimations/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to delete cost estimation");
  }
}
