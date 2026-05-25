"use client";

import React from "react";
import { SectionCard as Section } from "./ui";
import { LabeledField as ControlGroup } from "./ui";
import InputControl from "@/components/shared/input/Input";

type Props = {
  objectPosition: string;
  setObjectPosition: (v: string) => void;
};

const POSITION_PRESETS = [
  { label: "Center", value: "center center" },
  { label: "Top", value: "center top" },
  { label: "Bottom", value: "center bottom" },
  { label: "Left", value: "left center" },
  { label: "Right", value: "right center" },
  { label: "Top Left", value: "left top" },
  { label: "Top Right", value: "right top" },
  { label: "Bottom Left", value: "left bottom" },
  { label: "Bottom Right", value: "right bottom" },
] as const;

function presetButtonStyle(active: boolean): React.CSSProperties {
  return {
    borderColor: active ? "var(--primary)" : "var(--border)",
    background: active
      ? "color-mix(in oklab, var(--primary) 18%, var(--surface))"
      : "color-mix(in oklab, var(--surface) 70%, transparent)",
    color: "var(--text)",
  };
}

export default function FramingSection({
  objectPosition,
  setObjectPosition,
}: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Object Position"
        subtitle="Anchor the image or initials within the avatar frame."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {POSITION_PRESETS.map((preset) => {
              const active = objectPosition === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setObjectPosition(preset.value)}
                  className="rounded-xl border px-3 py-2 text-sm font-semibold transition"
                  style={presetButtonStyle(active)}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <ControlGroup label="Custom Position">
            <InputControl
              value={objectPosition}
              onChange={(event) => setObjectPosition(event.target.value)}
              placeholder="center center"
            />
          </ControlGroup>
        </div>
      </Section>

    </div>
  );
}
