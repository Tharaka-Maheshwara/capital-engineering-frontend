"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type DesignStatus = "Draft" | "Published";

type DesignRecord = {
  id: number;
  title: string;
  category: string;
  style: string;
  status: DesignStatus;
  displayOrder: number;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  galleryCount: number;
  createdAt: string;
};

const defaultRecords: DesignRecord[] = [
  {
    id: 1,
    title: "Modern Residence Concept",
    category: "Residential",
    style: "Minimal",
    status: "Published",
    displayOrder: 1,
    description:
      "A clean residential concept with open volumes, soft lighting, and natural textures.",
    imageUrl: "/images/slider-3.png",
    imageAlt: "Modern residence concept preview",
    galleryCount: 4,
    createdAt: "Today",
  },
  {
    id: 2,
    title: "Commercial Facade Study",
    category: "Commercial",
    style: "Contemporary",
    status: "Draft",
    displayOrder: 2,
    description:
      "A façade study prepared for client review with multiple material variations.",
    imageUrl: "/images/slider-4.png",
    imageAlt: "Commercial facade study preview",
    galleryCount: 6,
    createdAt: "Yesterday",
  },
];

const categoryOptions = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Interior",
  "Exterior",
  "Landscape",
];

const styleOptions = ["Minimal", "Contemporary", "Luxury", "Industrial", "Tropical"];

export default function DesignManager() {
  const [records, setRecords] = useState<DesignRecord[]>(defaultRecords);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [style, setStyle] = useState(styleOptions[0]);
  const [status, setStatus] = useState<DesignStatus>("Draft");
  const [displayOrder, setDisplayOrder] = useState("1");
  const [description, setDescription] = useState("");
  const [altText, setAltText] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [galleryNames, setGalleryNames] = useState<string[]>([]);
  const previewUrlRef = useRef<string | null>(null);

  const stats = [
    { label: "Total Concepts", value: String(records.length).padStart(2, "0") },
    {
      label: "Published",
      value: String(records.filter((record) => record.status === "Published").length).padStart(2, "0"),
    },
    {
      label: "Drafts",
      value: String(records.filter((record) => record.status === "Draft").length).padStart(2, "0"),
    },
  ];

  function updatePreview(file: File | null) {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (!file) {
      setImagePreviewUrl(null);
      setSelectedImageName(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setImagePreviewUrl(objectUrl);
    setSelectedImageName(file.name);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextRecord: DesignRecord = {
      id: Date.now(),
      title: title.trim() || "Untitled concept",
      category,
      style,
      status,
      displayOrder: Number(displayOrder) || records.length + 1,
      description: description.trim() || "No description provided yet.",
      imageUrl: imagePreviewUrl,
      imageAlt: altText.trim() || title.trim() || "Design preview",
      galleryCount: galleryNames.length,
      createdAt: "Just now",
    };

    setRecords((current) => [nextRecord, ...current]);
    setTitle("");
    setCategory(categoryOptions[0]);
    setStyle(styleOptions[0]);
    setStatus("Draft");
    setDisplayOrder(String(records.length + 1));
    setDescription("");
    setAltText("");
    setGalleryNames([]);
    updatePreview(null);
  }

  function handleReset() {
    setTitle("");
    setCategory(categoryOptions[0]);
    setStyle(styleOptions[0]);
    setStatus("Draft");
    setDisplayOrder("1");
    setDescription("");
    setAltText("");
    setGalleryNames([]);
    updatePreview(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              Admin / Designs
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
              Add a new design concept
            </h1>
          </div>

          <Link
            href="/admin/admin-dashboard"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-900">
                {stat.value}
              </div>
            </article>
          ))}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Design form
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  Create concept details
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Design only
              </span>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Design title">
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-300 focus:bg-white"
                    placeholder="Villa concept with pool court"
                  />
                </Field>

                <Field label="Category">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-300 focus:bg-white"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Style">
                  <select
                    value={style}
                    onChange={(event) => setStyle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-300 focus:bg-white"
                  >
                    {styleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Display order">
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(event) => setDisplayOrder(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-300 focus:bg-white"
                    placeholder="1"
                  />
                </Field>
              </div>

              <Field label="Status">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["Draft", "Published"] as DesignStatus[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setStatus(option)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${status === option ? "border-sky-300 bg-sky-50 text-sky-700" : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white"
                  placeholder="Explain the concept, mood, materials, or client brief."
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Image alt text">
                  <input
                    value={altText}
                    onChange={(event) => setAltText(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-300 focus:bg-white"
                    placeholder="Exterior concept preview"
                  />
                </Field>

                <Field label="Main concept image">
                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50/40">
                    <span>{selectedImageName ?? "Choose an image"}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => updatePreview(event.target.files?.[0] ?? null)}
                    />
                  </label>
                </Field>
              </div>

              <Field label="Gallery images">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) =>
                    setGalleryNames(Array.from(event.target.files ?? []).map((file) => file.name))
                  }
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white"
                />
                <p className="mt-2 text-sm text-slate-500">
                  {galleryNames.length > 0
                    ? `${galleryNames.length} file(s) selected`
                    : "Add multiple supporting renders or mood-board images."}
                </p>
              </Field>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Save design concept
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Clear form
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Preview
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  Live concept card
                </h2>
              </div>

              <div className="p-5 sm:p-6">
                <div className="relative overflow-hidden rounded-[24px] bg-slate-100">
                  <div
                    className="h-72 bg-cover bg-center"
                    style={{
                      backgroundImage: imagePreviewUrl
                        ? `url(${imagePreviewUrl})`
                        : "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02))",
                    }}
                    aria-label={altText || title || "Concept preview"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      {category}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                      {title || "Untitled concept"}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {description || "Concept description will appear here."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Recent concepts
              </p>
              <div className="mt-4 space-y-4">
                {records.map((record) => (
                  <article
                    key={record.id}
                    className="flex gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
                      {record.imageUrl ? (
                        <Image
                          src={record.imageUrl}
                          alt={record.imageAlt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="truncate text-sm font-semibold text-slate-900">
                            {record.title}
                          </h4>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                            {record.category} / {record.style}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${record.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {record.status}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                        {record.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Order {record.displayOrder}</span>
                        <span>{record.createdAt}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-2 block uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
