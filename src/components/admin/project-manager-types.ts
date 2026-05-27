export type ProjectRecord = {
  id: number;
  title: string;
  status: string;
  status_label: string;
  location: string;
  client: string;
  area: string | null;
  description: string;
  meta_description: string | null;
  price: string | null;
  start_date: string | null;
  end_date: string | null;
  featured_image_url: string | null;
  featured_image_thumbnail: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
};

export type ProjectFormState = {
  title: string;
  description: string;
  status: "planning" | "ongoing" | "completed";
  location: string;
  client: string;
  area: string;
  price: string;
  startDate: string;
  endDate: string;
};
