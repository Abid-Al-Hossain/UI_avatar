"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "@/components/shared/input/SizeControl";
import ColorControl from "@/components/shared/color/ColorControl";
import InputControl from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";

export default function StyleSection(props: {
  borderWidth: number;
  setBorderWidth: (v: number) => void;
  borderColor: string;
  setBorderColor: (v: string) => void;
  borderStyle: "solid" | "dashed" | "dotted";
  setBorderStyle: (v: "solid" | "dashed" | "dotted") => void;
  borderOffset: number;
  setBorderOffset: (v: number) => void;
  shadow: string;
  setShadow: (v: string) => void;
  initialsBg: string;
  setInitialsBg: (v: string) => void;
  initialsColor: string;
  setInitialsColor: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Border" subtitle="Outline styling for the avatar.">
        <div className="space-y-4">
          <SizeControl
            label="Width (px)"
            value={props.borderWidth}
            onChange={(v) => props.setBorderWidth(v)}
            min={0}
            max={20}
            step={1}
          />

          <ColorControl
            label="Color"
            value={props.borderColor}
            onChange={props.setBorderColor}
          />

          <SizeControl
            label="Border Offset (px)"
            value={props.borderOffset}
            onChange={(v) => props.setBorderOffset(v)}
            min={0}
            max={24}
            step={1}
          />

          <LabeledField label="Style">
            <Segmented
              value={props.borderStyle}
              onChange={(v) =>
                props.setBorderStyle(v as "solid" | "dashed" | "dotted")
              }
              items={[
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Fallback / Initials"
        subtitle="Colors when image is missing."
      >
        <div className="space-y-4">
          <ColorControl
            label="Background Color"
            value={props.initialsBg}
            onChange={props.setInitialsBg}
          />
          <ColorControl
            label="Text Color"
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
                {
                  value: "ui-rounded, sans-serif",
                  label: "Rounded",
                },
              ]}
            />
          </LabeledField>
          <LabeledField label="Shadow">
            <InputControl
              value={props.shadow}
              onChange={(e) => props.setShadow(e.target.value)}
              placeholder="0 18px 40px rgba(15,23,42,0.18)"
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
