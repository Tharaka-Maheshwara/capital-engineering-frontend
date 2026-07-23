"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import {
  fetchCostEstimations,
  deleteCostEstimation,
  type CostEstimationEntry,
} from "@/lib/cost-estimation";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(value: string | number) {
  return `Rs. ${Number(value).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function badgeColor(type: string): string {
  const map: Record<string, string> = {
    house: "bg-blue-100 text-blue-700",
    villa: "bg-purple-100 text-purple-700",
    renovation: "bg-amber-100 text-amber-700",
    commercial: "bg-emerald-100 text-emerald-700",
    "budget-friendly": "bg-green-100 text-green-700",
    "semi-luxury": "bg-yellow-100 text-yellow-700",
    luxury: "bg-rose-100 text-rose-700",
  };
  return map[type] ?? "bg-gray-100 text-gray-700";
}

function capitalize(s: string) {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Modal                                                       */
/* ------------------------------------------------------------------ */

function DetailModal({
  entry,
  onClose,
}: {
  entry: CostEstimationEntry;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2 className="text-xl font-bold text-slate-900 pr-8">Cost Estimation Details</h2>
        <p className="mt-1 text-sm text-slate-500">Submitted {formatDate(entry.created_at)}</p>

        <div className="mt-6 space-y-5">
          {/* Client Info */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Information</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span className="font-medium text-slate-900">{entry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900">{entry.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">{entry.email}</span>
              </div>
            </div>
          </div>

          {/* Project Config */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Configuration</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Project Type</span>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor(entry.project_type)}`}>
                  {capitalize(entry.project_type)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Building Size</span>
                <span className="font-medium text-slate-900">{Number(entry.sqft).toLocaleString()} sq.ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Budget Type</span>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor(entry.budget_type)}`}>
                  {capitalize(entry.budget_type)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Soil Condition</span>
                <span className="font-medium text-slate-900">{capitalize(entry.soil)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Design Complexity</span>
                <span className="font-medium text-slate-900">{capitalize(entry.design)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stories</span>
                <span className="font-medium text-slate-900">{entry.stories} {Number(entry.stories) === 1 ? "Story" : "Stories"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roof Type</span>
                <span className="font-medium text-slate-900">{capitalize(entry.roof)}</span>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Cost Summary</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-500">Base Cost</span>
                <span className="font-semibold text-blue-800">{formatCurrency(entry.base_cost)}</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2">
                <span className="text-blue-600 font-bold">Total Estimated Cost</span>
                <span className="text-lg font-extrabold text-blue-900">{formatCurrency(entry.total_cost)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CostEstimationManager() {
  const [entries, setEntries] = useState<CostEstimationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 15, total: 0 });
  const [selectedEntry, setSelectedEntry] = useState<CostEstimationEntry | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadData = useCallback(async (p: number, s: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCostEstimations(p, 15, s);
      setEntries(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(page, search);
  }, [page, loadData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      loadData(1, value);
    }, 400);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this cost estimation?")) return;
    setDeletingId(id);
    try {
      await deleteCostEstimation(id);
      await loadData(page, search);
    } catch {
      alert("Failed to delete cost estimation.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout
      activeHref="/admin/cost-estimations"
      title="Admin Panel"
      pageTitle="Cost Estimations"
    >
      {/* Header Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">All Estimates</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {meta.total} estimation{meta.total !== 1 ? "s" : ""} submitted by users
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Client</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Sq.Ft</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Budget</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Total Cost</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
                      <span className="text-sm text-slate-400">Loading estimations...</span>
                    </div>
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                          <path d="M9 17h6M9 13h6M9 9h6M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-600">No estimations found</span>
                      <span className="text-xs text-slate-400">Cost estimations submitted by users will appear here.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-slate-800">{entry.name}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm text-slate-600">{entry.phone}</div>
                      <div className="text-xs text-slate-400">{entry.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor(entry.project_type)}`}>
                        {capitalize(entry.project_type)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-sm font-medium text-slate-700">
                        {Number(entry.sqft).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor(entry.budget_type)}`}>
                        {capitalize(entry.budget_type)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-sm font-bold text-slate-900">
                        {formatCurrency(entry.total_cost)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-slate-500">{formatDate(entry.created_at)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                          title="View details"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          disabled={deletingId === entry.id}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === entry.id ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" />
                          ) : (
                            <TrashIcon />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3.5">
            <span className="text-xs text-slate-500">
              Page {meta.current_page} of {meta.last_page} · {meta.total} total
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                disabled={page >= meta.last_page}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </AdminLayout>
  );
}
