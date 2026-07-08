import DesignsGrid from "@/components/designs/designs-grid";

export const metadata = {
  title: "Designs",
  description:
    "Browse architectural and interior design concepts from Capital Engineering Ceylon.",
  alternates: {
    canonical: "/designs",
  },
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type DesignApiRecord = {
  id: number;
  main_category?: string | null;
  image_urls?: string[] | null;
};

export default async function DesignsPage() {
  let designs: any[] = [];
  try {
    const response = await fetch(`${apiBase}/api/v1/designs?per_page=24`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const payload = (await response.json()) as { data?: DesignApiRecord[] };
      designs = Array.isArray(payload?.data)
        ? payload.data
            .filter((item) => typeof item.id === "number")
            .map((item) => ({
              id: item.id,
              main_category: item.main_category ?? "Untitled design",
              image_urls: Array.isArray(item.image_urls) ? item.image_urls : [],
            }))
        : [];
    } else {
      console.error(
        `Failed to fetch designs: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error fetching designs:", error);
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/slider-3.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.7)_38%,rgba(15,23,42,0.45)_65%,rgba(15,23,42,0.78)_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200/90">
            Our Designs
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            Explore the latest architectural and interior design concepts
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Browse the designs published in the admin dashboard. Open any card
            to view the full description, categories, and image set.
          </p>
        </div>
      </section>

      <DesignsGrid designs={designs} />
    </main>
  );
}
