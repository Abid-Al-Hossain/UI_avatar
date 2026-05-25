"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import ColorControl from "@/components/shared/color/ColorControl";
import InputControl from "@/components/shared/input/Input";
import SizeControl from "@/components/shared/input/SizeControl";

export default function SurfaceSection(props: {
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
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Border" subtitle="Outline styling and ring spacing.">
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

      <SectionCard title="Shadow" subtitle="Outer elevation for framed avatars.">
        <LabeledField label="Shadow">
          <InputControl
            value={props.shadow}
            onChange={(e) => props.setShadow(e.target.value)}
            placeholder="0 18px 40px rgba(15,23,42,0.18)"
          />
        </LabeledField>
      </SectionCard>
    </div>
  );
}
