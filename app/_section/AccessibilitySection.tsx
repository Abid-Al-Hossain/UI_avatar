import React from "react";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
type Props = {
  alt: string;
  ariaLabel: string;
  ariaRole: "img" | "figure" | "presentation" | "none";
  ariaHidden: boolean;
};

export default function AccessibilitySection({
  alt,
  ariaLabel,
  ariaRole,
  ariaHidden,
}: Props) {
  return (
    <div className="space-y-6">
      <Section title="Accessibility Review" subtitle="Check the metadata and semantics together.">
        <div
          className="rounded-xl border p-4 text-sm leading-6"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--muted)" }}
        >
          Metadata fields live in the dedicated <strong>Metadata</strong> section so the same task is not edited in two different places.
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={!!alt && alt.length > 0}
            label="Has descriptive alt text"
          />
          <AccessibilityCheck
            passed={!!ariaLabel && ariaLabel.length > 0}
            label="Has aria-label for context"
          />
          <AccessibilityCheck
            passed={ariaHidden || ariaRole === "img" || ariaRole === "figure"}
            label="Has semantic ARIA role or is hidden"
          />
        </div>
      </Section>
    </div>
  );
}

function AccessibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "OK" : "X"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
