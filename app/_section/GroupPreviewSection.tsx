import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "@/components/shared/input/SizeControl";

type GroupPreviewSectionProps = {
  showGroup: boolean;
  setShowGroup: (v: boolean) => void;
  groupSpacing: number;
  setGroupSpacing: (v: number) => void;
  groupLimit: number;
  setGroupLimit: (v: number) => void;
  groupDirection: "row" | "column";
  setGroupDirection: (v: "row" | "column") => void;
};

export default function GroupPreviewSection({
  showGroup,
  setShowGroup,
  groupSpacing,
  setGroupSpacing,
  groupLimit,
  setGroupLimit,
  groupDirection,
  setGroupDirection,
}: GroupPreviewSectionProps) {
  const applyGroupPreset = (
    preset: "stack" | "tight" | "spread" | "column",
  ) => {
    setShowGroup(true);
    if (preset === "stack") {
      setGroupSpacing(-16);
      setGroupLimit(5);
      setGroupDirection("row");
      return;
    }
    if (preset === "tight") {
      setGroupSpacing(-8);
      setGroupLimit(4);
      setGroupDirection("row");
      return;
    }
    if (preset === "spread") {
      setGroupSpacing(6);
      setGroupLimit(5);
      setGroupDirection("row");
      return;
    }
    setGroupSpacing(-10);
    setGroupLimit(5);
    setGroupDirection("column");
  };

  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-between rounded-xl border p-4 shadow-sm"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <span className="text-sm font-medium">Enable Group Mode</span>
        <input
          type="checkbox"
          checked={showGroup}
          onChange={(e) => setShowGroup(e.target.checked)}
          className="h-5 w-5 accent-[var(--primary)]"
        />
      </div>

      <SectionCard
        title="Group Profiles"
        subtitle="Jump between common overflow styles and stack behaviors."
      >
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { value: "stack", label: "Stack" },
            { value: "tight", label: "Tight" },
            { value: "spread", label: "Spread" },
            { value: "column", label: "Column" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                applyGroupPreset(
                  item.value as "stack" | "tight" | "spread" | "column",
                )
              }
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Group Spacing">
        <div className="space-y-4">
          <SizeControl
            label="Spacing (px)"
            value={groupSpacing}
            onChange={(v) => setGroupSpacing(v)}
            min={-50}
            max={50}
            step={1}
          />
          <p className="text-xs text-[var(--muted)]">
            Negative values create the stacked overlap effect.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Limit & Layout">
        <div className="space-y-4">
          <SizeControl
            label="Max Items"
            value={groupLimit}
            onChange={(v) => setGroupLimit(v)}
            min={1}
            max={10}
            step={1}
          />

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Direction
            </label>
            <div
              className="mt-2 flex rounded-lg border p-1"
              style={{ borderColor: "var(--border)" }}
            >
              {(["row", "column"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setGroupDirection(dir)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    groupDirection === dir
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text)] hover:bg-[color-mix(in_oklab,var(--text)_5%,transparent)]"
                  }`}
                >
                  {dir.charAt(0).toUpperCase() + dir.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-600 dark:text-blue-400">
        <strong>Preview Note:</strong> Check the preview panel to see the group
        layout update with these settings.
      </div>
    </div>
  );
}
