"use client";

import React from "react";

import { SectionCard, LabeledField, Segmented } from "./ui";
import InputControl from "@/components/shared/input/Input";

export default function BasicsSection(props: {
  src: string;
  setSrc: (v: string) => void;
  srcSet: string;
  setSrcSet: (v: string) => void;
  initials: string;
  setInitials: (v: string) => void;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  setObjectFit: (
    v: "cover" | "contain" | "fill" | "none" | "scale-down",
  ) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Image Source" subtitle="The main avatar image URL.">
        <LabeledField label="URL">
          <InputControl
            value={props.src}
            onChange={(e) => props.setSrc(e.target.value)}
            placeholder="https://..."
          />
        </LabeledField>
      </SectionCard>

      <SectionCard
        title="Responsive Sources"
        subtitle="Optional srcSet for responsive image rendering."
      >
        <LabeledField label="srcSet">
          <InputControl
            value={props.srcSet}
            onChange={(e) => props.setSrcSet(e.target.value)}
            placeholder="image-1x.jpg 1x, image-2x.jpg 2x"
          />
        </LabeledField>
      </SectionCard>

      <SectionCard
        title="Fallback Content"
        subtitle="Shown when the avatar image is unavailable."
      >
        <div className="space-y-4">
          <LabeledField label="Initials">
            <input
              type="text"
              value={props.initials}
              onChange={(e) => props.setInitials(e.target.value)}
              maxLength={3}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Object Fit"
        subtitle="How the image scales within containers."
      >
        <Segmented
          value={props.objectFit}
          onChange={(v) =>
            props.setObjectFit(
              v as "cover" | "contain" | "fill" | "none" | "scale-down",
            )
          }
          items={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "scale-down", label: "Scale Down" },
          ]}
        />
      </SectionCard>
    </div>
  );
}
