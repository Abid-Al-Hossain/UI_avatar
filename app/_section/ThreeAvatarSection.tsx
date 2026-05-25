"use client";

import React from "react";
import {
  Segmented,
  SectionCard,
  LabeledField,
  ExportWarningBadge,
} from "@/components/shared/layout/ui";
import ColorControl from "@/components/shared/color/ColorControl";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";

export type ThreeDBadgeMode = "none" | "sphere" | "cube" | "star";
export type ThreeDStatusMode = "none" | "ring" | "halo";
export type AvatarAccessoryType = "none" | "crown" | "halo-cyber" | "orb-float";

export default function ThreeAvatarSection(props: {
  use3DBadge: ThreeDBadgeMode;
  setUse3DBadge: (v: ThreeDBadgeMode) => void;
  badgeAnimate: boolean;
  setBadgeAnimate: (v: boolean) => void;

  use3DStatus: ThreeDStatusMode;
  setUse3DStatus: (v: ThreeDStatusMode) => void;

  // New
  accessoryType: AvatarAccessoryType;
  setAccessoryType: (v: AvatarAccessoryType) => void;
  accessoryColor: string;
  setAccessoryColor: (v: string) => void;
  orbitSpeed: string;
  setOrbitSpeed: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="3D Badge (Requires React)"
        subtitle="Floating geometry badge."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Badge Type <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.use3DBadge}
              onChange={(v) => props.setUse3DBadge(v as ThreeDBadgeMode)}
              items={[
                { value: "none", label: "None" },
                { value: "sphere", label: "Sphere" },
                { value: "cube", label: "Cube" },
                { value: "star", label: "Star" },
              ]}
            />
          </LabeledField>

          {props.use3DBadge !== "none" && (
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Animate (Spin)
              </span>
              <input
                type="checkbox"
                checked={props.badgeAnimate}
                onChange={(e) => props.setBadgeAnimate(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="3D Status Ring" subtitle="Glowing torus ring.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Ring Style <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.use3DStatus}
              onChange={(v) => props.setUse3DStatus(v as ThreeDStatusMode)}
              items={[
                { value: "none", label: "None" },
                { value: "ring", label: "Torus" },
                { value: "halo", label: "Halo" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* --- ACCESSORIES --- */}
      <SectionCard title="3D Accessories" subtitle="Premium floating elements.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Type <ExportWarningBadge />
              </div>
            }
          >
            <Select
              value={props.accessoryType}
              onChange={(v) => props.setAccessoryType(v as AvatarAccessoryType)}
              options={[
                { value: "none", label: "None" },
                { value: "crown", label: "Floating Crown" },
                { value: "halo-cyber", label: "Cyber Halo" },
                { value: "neural-link", label: "Neural Link (NodeNet)" },
                { value: "orb-float", label: "Floating Orbs" },
              ]}
            />
          </LabeledField>
          {props.accessoryType !== "none" && (
            <>
              {/* ColorControl handles Color */}
              <ColorControl
                label="Color"
                value={props.accessoryColor}
                onChange={props.setAccessoryColor}
              />
              <LabeledField label="Animation Speed">
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={props.orbitSpeed}
                  onChange={props.setOrbitSpeed}
                />
              </LabeledField>
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
