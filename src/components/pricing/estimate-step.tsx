"use client";

import { useState } from "react";
import {
  type ContactState,
  type EstimatorConfigState,
  budgetTypes,
  soilOptions,
  designOptions,
  storyOptions,
  roofOptions,
  projectTypes,
} from "./pricing-types";

type EstimateStepProps = {
  contact: ContactState;
  projectType: string;
  config: EstimatorConfigState;
  onBack: () => void;
};

function format(n: number) {
  return `රු ${Math.round(n).toLocaleString()}`;
}

// Plain-number formatter for PDF (avoids font/glyph issues with the "රු" prefix in jsPDF's default font)
function formatPlain(n: number) {
  return `Rs. ${Math.round(n).toLocaleString("en-US")}`;
}

export default function EstimateStep({
  contact,
  projectType,
  config,
  onBack,
}: EstimateStepProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const sqftVal = Number(config.sqft) || 0;

  // Retrieve option definitions
  const activeBudget = budgetTypes.find((b) => b.id === config.budgetType) || budgetTypes[0];
  const activeSoil = soilOptions.find((s) => s.id === config.soil) || soilOptions[0];
  const activeDesign = designOptions.find((d) => d.id === config.design) || designOptions[0];
  const activeStory = storyOptions.find((s) => s.id === config.stories) || storyOptions[0];
  const activeRoof = roofOptions.find((r) => r.id === config.roof) || roofOptions[0];
  const activeProjType = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  // Calculations
  const baseCost = sqftVal * activeBudget.rate;

  const soilCost = baseCost * activeSoil.factor;
  const designCost = baseCost * activeDesign.factor;
  const storyCost = baseCost * activeStory.factor;
  const roofCost = baseCost * activeRoof.factor;

  const totalCost = baseCost + soilCost + designCost + storyCost + roofCost;
  const perSqftCost = sqftVal ? Math.round(totalCost / sqftVal) : 0;

  // Construction Phase Breakdown
  const phases = [
    { title: "Structure & Civil Works", pct: 0.43, description: "Foundation, pillars, concrete, brickwork" },
    { title: "Finishing & Tiling", pct: 0.28, description: "Floor plastering, wall tiling, painting" },
    { title: "MEP (Electrical & Plumbing)", pct: 0.18, description: "Wiring, piping, switches, bathroom fixtures" },
    { title: "Doors, Windows & Fittings", pct: 0.11, description: "Main door, frames, aluminum window glass" },
  ];

  const totalFactorPct = Math.round(
    (activeSoil.factor + activeDesign.factor + activeStory.factor + activeRoof.factor) * 100
  );

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTableModule = await import("jspdf-autotable");
      const autoTable = autoTableModule.default;

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 40;

      const brandNavy: [number, number, number] = [23, 50, 74]; // #17324a
      const accentBlue: [number, number, number] = [77, 135, 200]; // #4d87c8
      const textDark: [number, number, number] = [30, 30, 30];
      const textMuted: [number, number, number] = [110, 110, 110];

      // ---------- Header band ----------
      doc.setFillColor(...brandNavy);
      doc.rect(0, 0, pageWidth, 90, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Capital Engineering Ceylon (Pvt) Ltd", marginX, 38);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(
        "info.lankacapital@gmail.com   |   +94 777 434 403   |   Hot Line: 011 4 981 500",
        marginX,
        56
      );

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Construction Cost Estimate", marginX, 78);

      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(`Date: ${today}`, pageWidth - marginX, 78, { align: "right" });

      // ---------- Client & project info ----------
      let cursorY = 120;
      doc.setTextColor(...textMuted);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text("PREPARED FOR", marginX, cursorY);
      doc.text("PROJECT DETAILS", pageWidth / 2 + 10, cursorY);

      cursorY += 16;
      doc.setTextColor(...textDark);
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.text(contact.name || "-", marginX, cursorY);
      doc.text(activeProjType.title, pageWidth / 2 + 10, cursorY);

      cursorY += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...textMuted);
      doc.text(contact.phone || "-", marginX, cursorY);
      doc.text(`${sqftVal.toLocaleString()} sq.ft`, pageWidth / 2 + 10, cursorY);

      cursorY += 14;
      doc.text(contact.email || "-", marginX, cursorY);
      doc.text(activeBudget.title, pageWidth / 2 + 10, cursorY);

      // ---------- Total cost callout ----------
      cursorY += 28;
      doc.setFillColor(244, 248, 252);
      doc.setDrawColor(...accentBlue);
      doc.roundedRect(marginX, cursorY, pageWidth - marginX * 2, 56, 6, 6, "FD");

      doc.setTextColor(...accentBlue);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("TOTAL ESTIMATED COST", marginX + 16, cursorY + 20);

      doc.setTextColor(...brandNavy);
      doc.setFontSize(20);
      doc.text(formatPlain(totalCost), marginX + 16, cursorY + 42);

      doc.setTextColor(...textMuted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(
        `Avg. rate: ${formatPlain(perSqftCost)} / sq.ft`,
        pageWidth - marginX - 16,
        cursorY + 32,
        { align: "right" }
      );

      cursorY += 56 + 26;

      // ---------- Detailed breakdown table ----------
      const tableRows = [
        [
          `Base Construction Area\n${sqftVal.toLocaleString()} sq.ft @ ${formatPlain(activeBudget.rate)}/sq.ft (${activeBudget.title})`,
          "-",
          formatPlain(baseCost),
        ],
        [
          `Soil Condition Adjustment\n${activeSoil.title}`,
          activeSoil.factor > 0 ? `+${activeSoil.factor * 100}%` : "0%",
          soilCost > 0 ? `+${formatPlain(soilCost)}` : formatPlain(0),
        ],
        [
          `Design Complexity Adjustment\n${activeDesign.title}`,
          activeDesign.factor > 0 ? `+${activeDesign.factor * 100}%` : "0%",
          designCost > 0 ? `+${formatPlain(designCost)}` : formatPlain(0),
        ],
        [
          `Stories (Floors) Adjustment\n${activeStory.title}`,
          activeStory.factor > 0 ? `+${activeStory.factor * 100}%` : "0%",
          storyCost > 0 ? `+${formatPlain(storyCost)}` : formatPlain(0),
        ],
        [
          `Roof Design Adjustment\n${activeRoof.title}`,
          activeRoof.factor > 0 ? `+${activeRoof.factor * 100}%` : "0%",
          roofCost > 0 ? `+${formatPlain(roofCost)}` : formatPlain(0),
        ],
      ];

      autoTable(doc, {
        startY: cursorY,
        margin: { left: marginX, right: marginX },
        head: [["Cost Item / Options", "Factor", "Calculated Cost"]],
        body: tableRows,
        foot: [["Total Estimate", `${totalFactorPct > 0 ? `+${totalFactorPct}%` : "0%"}`, formatPlain(totalCost)]],
        theme: "plain",
        styles: {
          font: "helvetica",
          fontSize: 9.5,
          cellPadding: { top: 8, bottom: 8, left: 10, right: 10 },
          textColor: textDark,
          lineColor: [230, 230, 230],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: brandNavy,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 8.5,
        },
        footStyles: {
          fillColor: [244, 248, 252],
          textColor: brandNavy,
          fontStyle: "bold",
          fontSize: 10,
        },
        columnStyles: {
          0: { cellWidth: pageWidth - marginX * 2 - 160 },
          1: { cellWidth: 70, halign: "center" },
          2: { cellWidth: 90, halign: "right" },
        },
        didParseCell: (data) => {
          if (data.column.index === 0 && data.section === "body") {
            data.cell.styles.fontStyle = "normal";
          }
        },
      });

      // ---------- Phase distribution ----------
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let afterTableY = (doc as any).lastAutoTable.finalY + 26;

      doc.setTextColor(...brandNavy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text("Estimated Phase Distribution", marginX, afterTableY);
      afterTableY += 16;

      autoTable(doc, {
        startY: afterTableY,
        margin: { left: marginX, right: marginX },
        head: [["Phase", "Description", "Share", "Estimated Cost"]],
        body: phases.map((p) => [
          p.title,
          p.description,
          `${Math.round(p.pct * 100)}%`,
          formatPlain(totalCost * p.pct),
        ]),
        theme: "striped",
        styles: {
          font: "helvetica",
          fontSize: 8.5,
          cellPadding: 7,
          textColor: textDark,
        },
        headStyles: {
          fillColor: [235, 240, 246],
          textColor: brandNavy,
          fontStyle: "bold",
          fontSize: 8,
        },
        alternateRowStyles: { fillColor: [249, 250, 252] },
        columnStyles: {
          2: { halign: "center", cellWidth: 55 },
          3: { halign: "right", cellWidth: 90 },
        },
      });

      // ---------- Footer disclaimer ----------
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setDrawColor(230, 230, 230);
      doc.line(marginX, pageHeight - 60, pageWidth - marginX, pageHeight - 60);

      doc.setTextColor(...textMuted);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.text(
        "This is a preliminary, computer-generated estimate based on 2026 construction rates in Sri Lanka. Final pricing",
        marginX,
        pageHeight - 44
      );
      doc.text(
        "may vary after a free site visit and detailed Bill of Quantities (BOQ). This document is not a formal contract.",
        marginX,
        pageHeight - 32
      );

      doc.setFont("helvetica", "normal");
      doc.text(
        "Capital Engineering Ceylon (Pvt) Ltd — Licensed, bonded, and fully insured",
        marginX,
        pageHeight - 16
      );

      const fileSafeName = (contact.name || "estimate").replace(/[^a-zA-Z0-9]+/g, "-");
      doc.save(`Capital-Engineering-Estimate-${fileSafeName}.pdf`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-[2.2rem]">
          Estimated Construction Cost
        </h1>
        <p className="text-sm text-slate-400">
          Generated for 2026 construction rates in Sri Lanka.
        </p>
      </div>

      {/* Main Total Callout */}
      <div className="p-6 sm:p-8 rounded-[22px] border border-white/10 bg-gradient-to-br from-[#172e48]/40 to-[#121212] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <div className="absolute top-0 right-0 h-40 w-40 bg-[#4d87c8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid gap-4 sm:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8ec3ff]">
              Total Estimated Cost
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {format(totalCost)}
            </div>
            <div className="mt-1 text-sm text-slate-400">
              Avg. Rate: <span className="text-slate-200 font-semibold">{format(perSqftCost)}</span> per sq.ft
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6 text-sm text-slate-400 space-y-2">
            <div>
              Project: <span className="text-slate-200 font-medium">{activeProjType.title}</span>
            </div>
            <div>
              Client: <span className="text-slate-200 font-medium">{contact.name}</span> ({contact.phone})
            </div>
            <div>
              Email: <span className="text-slate-200 font-medium">{contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Cards */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
          Estimated Phase Distribution
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.title}
              className="p-4 rounded-xl border border-white/8 bg-white/3 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 block">{p.title}</span>
                <span className="text-xs text-slate-500 block leading-tight mt-1">{p.description}</span>
              </div>
              <div className="mt-4">
                <span className="text-lg font-bold text-slate-200 block">{format(totalCost * p.pct)}</span>
                <span className="text-[10px] text-[#8ec3ff] font-semibold block">{Math.round(p.pct * 100)}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adjustments & Calculation Table */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300/80">
          Detailed Estimate Breakdown
        </h2>
        <div className="overflow-x-auto rounded-[16px] border border-white/10 bg-white/1.5 p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Cost Item / Options</th>
                <th className="pb-3 text-center">Factor</th>
                <th className="pb-3 text-right pr-2">Calculated Cost</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-white/5">
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Base Construction Area
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {sqftVal.toLocaleString()} Sq.Ft @ {format(activeBudget.rate)} / sq.ft ({activeBudget.title})
                  </span>
                </td>
                <td className="py-3.5 text-center text-slate-400">-</td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {format(baseCost)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Soil Condition Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeSoil.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeSoil.factor > 0 ? `+${activeSoil.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {soilCost > 0 ? `+${format(soilCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Design Complexity Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeDesign.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeDesign.factor > 0 ? `+${activeDesign.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {designCost > 0 ? `+${format(designCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Stories (Floors) Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeStory.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeStory.factor > 0 ? `+${activeStory.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {storyCost > 0 ? `+${format(storyCost)}` : format(0)}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 pl-2 font-medium">
                  Roof Design Adjustment
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {activeRoof.title}
                  </span>
                </td>
                <td className="py-3.5 text-center font-semibold text-slate-400">
                  {activeRoof.factor > 0 ? `+${activeRoof.factor * 100}%` : "0%"}
                </td>
                <td className="py-3.5 text-right pr-2 font-semibold text-slate-200">
                  {roofCost > 0 ? `+${format(roofCost)}` : format(0)}
                </td>
              </tr>
              <tr className="bg-white/2">
                <td className="py-4 pl-2 font-bold text-white text-base">Total Estimate</td>
                <td className="py-4 text-center text-slate-300 font-bold">
                  {totalFactorPct > 0 ? `+${totalFactorPct}%` : "0%"}
                </td>
                <td className="py-4 text-right pr-2 font-extrabold text-[#8ec3ff] text-base">
                  {format(totalCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-transparent px-6 text-[0.95rem] font-medium text-slate-100 hover:border-white/20 hover:bg-white/4"
        >
          ← Adjust Details
        </button>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:bg-[#203f66] hover:text-white hover:border-[#3c76b8]">
            Free Site Visit & BOQ
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 text-[0.95rem] font-medium text-slate-300/80 transition duration-150 hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGeneratingPdf ? "Generating..." : "Download PDF Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
