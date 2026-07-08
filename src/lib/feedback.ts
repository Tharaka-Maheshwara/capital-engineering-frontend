export type FeedbackEntry = {
  id: number;
  name: string;
  email?: string;
  rating: number;
  message: string;
  created_at: string;
};

type FeedbackApiCollection = {
  data?: FeedbackEntry[];
};

type SubmitFeedbackInput = {
  token: string;
  rating: number;
  message: string;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function fetchFeedbackEntries(
  perPage = 6,
): Promise<FeedbackEntry[]> {
  const response = await fetch(
    `${apiBaseUrl}/api/v1/feedbacks?per_page=${perPage}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to load feedback entries");
  }

  const payload = (await response.json()) as FeedbackApiCollection;
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function submitFeedback({
  token,
  rating,
  message,
}: SubmitFeedbackInput): Promise<FeedbackEntry> {
  const response = await fetch(`${apiBaseUrl}/api/v1/feedbacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, message }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { data?: FeedbackEntry; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Failed to submit feedback");
  }

  window.dispatchEvent(new Event("feedback-updated"));

  if (!payload?.data) {
    throw new Error("Feedback submission succeeded but no data was returned");
  }

  return payload.data;
}