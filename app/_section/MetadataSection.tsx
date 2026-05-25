"use client";

import React from "react";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/components/shared/layout/LabeledField";
import InputControl from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";

type Props = {
  alt: string;
  setAlt: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  ariaLabel: string;
  setAriaLabel: (v: string) => void;
  ariaRole: "img" | "figure" | "presentation" | "none";
  setAriaRole: (v: "img" | "figure" | "presentation" | "none") => void;
  ariaHidden: boolean;
  setAriaHidden: (v: boolean) => void;
};

export default function MetadataSection({
  alt,
  setAlt,
  title,
  setTitle,
  ariaLabel,
  setAriaLabel,
  ariaRole,
  setAriaRole,
  ariaHidden,
  setAriaHidden,
}: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Metadata"
        subtitle="Native descriptive fields for the avatar image and fallback."
      >
        <div className="space-y-4">
          <ControlGroup label="Title">
            <InputControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tooltip / title text"
            />
          </ControlGroup>

          <ControlGroup label="Alt Text">
            <InputControl
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the avatar"
            />
          </ControlGroup>

          <ControlGroup label="ARIA Label">
            <InputControl
              value={ariaLabel}
              onChange={(e) => setAriaLabel(e.target.value)}
              placeholder="e.g. User profile picture"
            />
          </ControlGroup>
        </div>
      </Section>

      <Section
        title="Semantic Role"
        subtitle="How assistive technologies should interpret the avatar."
      >
        <div className="space-y-4">
          <ControlGroup label="Role">
            <Select
              value={ariaRole}
              onChange={(v) => setAriaRole(v as Props["ariaRole"])}
              options={[
                { value: "img", label: "img - Profile image" },
                { value: "figure", label: "figure - Illustrative content" },
                { value: "presentation", label: "presentation - Decorative" },
                { value: "none", label: "none - No semantic meaning" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Hide from Assistive Tech">
            <Select
              value={ariaHidden ? "true" : "false"}
              onChange={(v) => setAriaHidden(v === "true")}
              options={[
                { value: "false", label: "No - Expose the avatar" },
                { value: "true", label: "Yes - Hide from screen readers" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>
    </div>
  );
}
