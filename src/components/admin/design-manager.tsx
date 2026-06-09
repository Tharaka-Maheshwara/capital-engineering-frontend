"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

import DesignFormModal from "@/components/admin/design-form-modal";
import DesignRecordsSection from "@/components/admin/design-records-section";
import type {
  DesignFormState,
  DesignRecord,
  DesignStatus,
} from "@/components/admin/design-manager-types";

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

const initialFormState: DesignFormState = {
  title: "",
  category: categoryOptions[0],
  style: styleOptions[0],
  status: "Draft",
  displayOrder: "1",
  description: "",
  imageAlt: "",
};

const navigationItems = [
  { label: "Dashboard", href: "/admin/admin-dashboard", icon: DashboardIcon },
  { label: "Services", href: "#", icon: LayersIcon },
  { label: "Projects", href: "/admin/projects", icon: FolderIcon },
  { label: "Designs", href: "/admin/designs", active: true, icon: PaletteIcon },
  { label: "Team", href: "#", icon: TeamIcon },
  { label: "Users", href: "#", icon: UsersIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

export default function DesignManager() {
  const [records, setRecords] = useState<DesignRecord[]>(defaultRecords);
  const [form, setForm] = useState<DesignFormState>(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesignId, setEditingDesignId] = useState<number | null>(null);
  const [editingDesign, setEditingDesign] = useState<DesignRecord | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [galleryNames, setGalleryNames] = useState<string[]>([]);
  
  const stats = [
    { label: "Total Concepts", value: String(records.length).padStart(2, "0"), tone: "from-slate-900 via-slate-800 to-slate-700" },
    { label: "Published", value: String(records.filter((r) => r.status === "Published").length).padStart(2, "0"), tone: "from-emerald-900 via-emerald-800 to-slate-800" },
    { label: "Drafts", value: String(records.filter((r) => r.status === "Draft").length).padStart(2, "0"), tone: "from-sky-900 via-sky-800 to-slate-800" },
  ];

  function updateField<K extends keyof DesignFormState>(
    key: K,
    value: DesignFormState[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updatePreview(file: File | null) {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    if (!file) {
      setImagePreviewUrl(null);
      setSelectedImageName(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);
    setSelectedImageName(file.name);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    updatePreview(event.target.files?.[0] ?? null);
  }

  function handleGalleryImagesChange(event: ChangeEvent<HTMLInputElement>) {
    setGalleryNames(Array.from(event.target.files ?? []).map((file) => file.name));
  }

  function openCreateModal() {
    setEditingDesignId(null);
    setEditingDesign(null);
    setForm({ ...initialFormState, displayOrder: String(records.length + 1) });
    setImagePreviewUrl(null);
    setSelectedImageName(null);
    setGalleryNames([]);
    setIsModalOpen(true);
  }

  function openEditModal(design: DesignRecord) {
    setEditingDesignId(design.id);
    setEditingDesign(design);
    setForm({
      title: design.title,
      category: design.category,
      style: design.style,
      status: design.status,
      displayOrder: String(design.displayOrder),
      description: design.description,
      imageAlt: design.imageAlt,
    });
    setImagePreviewUrl(design.imageUrl);
    setSelectedImageName(null);
    setGalleryNames(Array.from({ length: design.galleryCount }).map((_, i) => `Existing Image ${i + 1}`));
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingDesignId(null);
    setEditingDesign(null);
    setForm(initialFormState);
    setImagePreviewUrl(null);
    setSelectedImageName(null);
    setGalleryNames([]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingDesignId !== null) {
      // Edit
      setRecords((current) =>
        current.map((rec) =>
          rec.id === editingDesignId
            ? {
                ...rec,
                title: form.title.trim() || "Untitled concept",
                category: form.category,
                style: form.style,
                status: form.status,
                displayOrder: Number(form.displayOrder) || records.length,
                description: form.description.trim() || "No description provided yet.",
                imageUrl: imagePreviewUrl || rec.imageUrl,
                imageAlt: form.imageAlt.trim() || form.title.trim() || "Design preview",
                galleryCount: galleryNames.length,
              }
            : rec
        )
      );
    } else {
      // Create
      const nextRecord: DesignRecord = {
        id: Date.now(),
        title: form.title.trim() || "Untitled concept",
        category: form.category,
        style: form.style,
        status: form.status,
        displayOrder: Number(form.displayOrder) || records.length + 1,
        description: form.description.trim() || "No description provided yet.",
        imageUrl: imagePreviewUrl,
        imageAlt: form.imageAlt.trim() || form.title.trim() || "Design preview",
        galleryCount: galleryNames.length,
        createdAt: "Just now",
      };
      setRecords((current) => [nextRecord, ...current]);
    }
    
    closeModal();
  }

  function handleDelete(designId: number) {
    if (!confirm("Delete this concept? This action cannot be undone.")) {
      return;
    }
    setRecords((current) => current.filter((rec) => rec.id !== designId));
  }

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0c1d33_0%,#10284a_46%,#0a1627_100%)] text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:w-70 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(92,153,190,0.18),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_22%)]" />
          <div className="relative flex h-full flex-col px-5 py-6 sm:px-6 lg:px-5 lg:py-7">
            <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                <span className="text-lg font-black tracking-[-0.06em]">
                  CE
                </span>
              </div>
              <div>
                <div className="text-[0.96rem] font-semibold uppercase tracking-[0.24em] text-slate-200/70">
                  Capital Engineering
                </div>
                <div className="text-[1.08rem] font-bold tracking-[-0.03em] text-white">
                  Design Manager
                </div>
              </div>
            </div>

            <nav
              className="mt-8 flex flex-1 flex-col gap-2"
              aria-label="Admin navigation"
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 text-[1rem] font-medium transition-colors duration-150 ${item.active ? "bg-white/14 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)]" : "text-slate-200/72 hover:bg-white/7 hover:text-white"}`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${item.active ? "border-white/10 bg-white/10" : "border-white/5 bg-white/5"}`}
                    >
                      <Icon />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
              <div className="text-sm font-semibold text-white">
                Design Concepts
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-200/70">
                Manage all your residential, commercial, and other architectural design concepts here.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-200">
                <span>Connected</span>
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_0_6px_rgba(56,189,248,0.12)]" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  Concept Management
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  Designs
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Add New Design
                </button>
                <Link
                  href="/admin/admin-dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-800"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </header>

          <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="grid gap-5 md:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className={`rounded-3xl bg-linear-to-br ${stat.tone} p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]`}
                >
                  <p className="text-sm font-medium text-white/80">{stat.label}</p>
                  <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-white">
                    {stat.value}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6">
              <DesignRecordsSection
                designs={records}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </div>
            
            <DesignFormModal
              isOpen={isModalOpen}
              editingDesignId={editingDesignId}
              editingDesign={editingDesign}
              form={form}
              categoryOptions={categoryOptions}
              styleOptions={styleOptions}
              imagePreviewUrl={imagePreviewUrl}
              selectedImageName={selectedImageName}
              galleryNames={galleryNames}
              onClose={closeModal}
              onSubmit={handleSubmit}
              onImageChange={handleImageChange}
              onGalleryImagesChange={handleGalleryImagesChange}
              onFieldChange={updateField}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

function DashboardIcon() {
  return <GlyphIcon path="M4 13h7V4H4zm9 7h7v-12h-7zM4 20h7v-5H4zm9-14h7v-2h-7z" />;
}

function LayersIcon() {
  return <GlyphIcon path="M12 3l9 5-9 5-9-5 9-5zm0 9l9 5-9 5-9-5 9-5z" />;
}

function FolderIcon() {
  return <GlyphIcon path="M3.5 7.5h6l2 2H20a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />;
}

function PaletteIcon() {
  return <GlyphIcon path="M12 3a9 9 0 1 0 9 9c0-2.2-1.8-4-4-4h-1.2a1.8 1.8 0 0 1 0-3.6H17A5 5 0 0 0 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm2.8-3.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />;
}

function TeamIcon() {
  return <GlyphIcon path="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm6 0a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 15 11zM3.5 19a5.5 5.5 0 0 1 11 0" />;
}

function UsersIcon() {
  return <GlyphIcon path="M9 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 12zm8 1a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 17 13zM2.5 20a6.5 6.5 0 0 1 13 0m2-3a4.5 4.5 0 0 1 4.5 4.5" />;
}

function SettingsIcon() {
  return <GlyphIcon path="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm8 3.5l-2.1.8a6.9 6.9 0 0 1-.7 1.7l1 2-1.7 1.7-2-1a6.9 6.9 0 0 1-1.7.7L12 21l-1.8-.1a6.9 6.9 0 0 1-1.7-.7l-2 1-1.7-1.7 1-2a6.9 6.9 0 0 1-.7-1.7L3 12l.1-1.8a6.9 6.9 0 0 1 .7-1.7l-1-2L4.5 5l2 1a6.9 6.9 0 0 1 1.7-.7L12 3l1.8.1a6.9 6.9 0 0 1 1.7.7l2-1 1.7 1.7-1 2a6.9 6.9 0 0 1 .7 1.7L20 12z" />;
}

function GlyphIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
