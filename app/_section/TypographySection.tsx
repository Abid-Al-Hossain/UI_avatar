"use client";

import React from "react";
import { SectionCard, LabeledField } from "./ui";
import ColorControl from "@/components/shared/color/ColorControl";
import Select from "@/components/shared/input/Select";

export default function TypographySection(props: {
  initialsBg: string;
  setInitialsBg: (v: string) => void;
  initialsColor: string;
  setInitialsColor: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
}) {
  return (
    <SectionCard
      title="Typography"
      subtitle="Fallback initials palette and type treatment."
    >
      <div className="space-y-4">
        <ColorControl
          label="Fallback Background"
          value={props.initialsBg}
          onChange={props.setInitialsBg}
        />
        <ColorControl
          label="Initials Color"
          value={props.initialsColor}
          onChange={props.setInitialsColor}
        />
        <LabeledField label="Font Family">
          <Select
            value={props.fontFamily}
            onChange={props.setFontFamily}
            options={[
              { value: "sans-serif", label: "System Sans" },
              { value: "serif", label: "Serif" },
              { value: "monospace", label: "Mono" },
              { value: "ui-rounded, sans-serif", label: "Rounded" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
