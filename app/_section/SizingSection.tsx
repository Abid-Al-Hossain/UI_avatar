"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "@/components/shared/input/SizeControl";
import InputControl from "@/components/shared/input/Input";

export default function SizingSection(props: {
  size: string;
  setSize: (v: string) => void;
  aspectRatio: string;
  setAspectRatio: (v: string) => void;
  radiusMode: "circle" | "rounded" | "square" | "custom";
  setRadiusMode: (v: "circle" | "rounded" | "square" | "custom") => void;
  radiusValue: number;
  setRadiusValue: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Dimensions" subtitle="Size of the avatar component.">
      <div className="space-y-4">
        <SizeControl
          label="Size (px)"
          value={parseInt(props.size) || 96}
          onChange={(v) => props.setSize(v + "px")}
          min={16}
          max={256}
          step={4}
        />
        <div className="mt-4">
          <LabeledField label="Aspect Ratio">
            <InputControl
              value={props.aspectRatio}
              onChange={(e) => props.setAspectRatio(e.target.value)}
              placeholder="1 / 1"
            />
          </LabeledField>
        </div>
      </div>
    </SectionCard>

      <SectionCard title="Shape" subtitle="Corner radius configuration.">
        <div className="space-y-4">
          <Segmented
            value={props.radiusMode}
            onChange={(v) =>
              props.setRadiusMode(v as "circle" | "rounded" | "square" | "custom")
            }
            items={[
              { value: "circle", label: "Circle" },
              { value: "rounded", label: "Rounded" },
              { value: "square", label: "Square" },
              { value: "custom", label: "Custom" },
            ]}
          />

          {props.radiusMode === "custom" && (
            <SizeControl
              label="Radius (px)"
              value={props.radiusValue}
              onChange={(v) => props.setRadiusValue(v)}
              min={0}
              max={128}
              step={1}
            />
          )}
        </div>
      </SectionCard>
    </div>
  );
}
