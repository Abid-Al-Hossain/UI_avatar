"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import ColorControl from "@/components/shared/color/ColorControl";
import SizeControl from "@/components/shared/input/SizeControl";

export default function StatesSection(props: {
  focusRingEnabled: boolean;
  setFocusRingEnabled: (v: boolean) => void;
  focusRingWidth: number;
  setFocusRingWidth: (v: number) => void;
  focusRingOffset: number;
  setFocusRingOffset: (v: number) => void;
  focusRingColor: string;
  setFocusRingColor: (v: string) => void;
  transitionDuration: number;
  setTransitionDuration: (v: number) => void;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  setTransitionEasing: (
    v: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear",
  ) => void;
  disabled: boolean;
  setDisabled: (v: boolean) => void;
  disabledOpacity: number;
  setDisabledOpacity: (v: number) => void;
  disabledCursor: "not-allowed" | "default" | "pointer";
  setDisabledCursor: (v: "not-allowed" | "default" | "pointer") => void;
  hoverBorderColor: string;
  setHoverBorderColor: (v: string) => void;
  hoverOpacity: number;
  setHoverOpacity: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Focus Ring" subtitle="Keyboard focus indicator when the avatar is interactive/clickable.">
        <div className="space-y-4">
          <LabeledField label="Enabled">
            <Segmented
              value={props.focusRingEnabled ? "true" : "false"}
              onChange={(v) => props.setFocusRingEnabled(v === "true")}
              items={[{ value: "false", label: "Off" }, { value: "true", label: "On" }]}
            />
          </LabeledField>
          <ColorControl label="Ring Color" value={props.focusRingColor} onChange={props.setFocusRingColor} />
          <SizeControl label="Ring Width" value={props.focusRingWidth} onChange={props.setFocusRingWidth} min={1} max={6} step={1} />
          <SizeControl label="Ring Offset" value={props.focusRingOffset} onChange={props.setFocusRingOffset} min={0} max={8} step={1} />
        </div>
      </SectionCard>

      <SectionCard title="Transitions" subtitle="Timing for hover/disabled/opacity changes.">
        <div className="space-y-4">
          <LabeledField label="Easing">
            <Segmented
              value={props.transitionEasing}
              onChange={(v) => props.setTransitionEasing(v as typeof props.transitionEasing)}
              items={[
                { value: "ease", label: "Ease" },
                { value: "ease-in", label: "In" },
                { value: "ease-out", label: "Out" },
                { value: "ease-in-out", label: "In-Out" },
                { value: "linear", label: "Linear" },
              ]}
            />
          </LabeledField>
          <SizeControl label="Duration (ms)" value={props.transitionDuration} onChange={props.setTransitionDuration} min={0} max={1000} step={10} />
        </div>
      </SectionCard>

      <SectionCard title="Disabled State" subtitle="Greyed-out, non-interactive avatar.">
        <div className="space-y-4">
          <LabeledField label="Disabled">
            <Segmented
              value={props.disabled ? "true" : "false"}
              onChange={(v) => props.setDisabled(v === "true")}
              items={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]}
            />
          </LabeledField>
          <SizeControl label="Disabled Opacity" value={props.disabledOpacity} onChange={props.setDisabledOpacity} min={0.1} max={1} step={0.05} />
          <LabeledField label="Cursor">
            <Segmented
              value={props.disabledCursor}
              onChange={(v) => props.setDisabledCursor(v as typeof props.disabledCursor)}
              items={[
                { value: "not-allowed", label: "Not Allowed" },
                { value: "default", label: "Default" },
                { value: "pointer", label: "Pointer" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard title="Hover State" subtitle="Border color / opacity swap on hover, beyond the zoom/grayscale toggles.">
        <div className="space-y-4">
          <ColorControl label="Hover Border Color" value={props.hoverBorderColor} onChange={props.setHoverBorderColor} />
          <SizeControl label="Hover Opacity" value={props.hoverOpacity} onChange={props.setHoverOpacity} min={0.1} max={1} step={0.05} />
        </div>
      </SectionCard>
    </div>
  );
}
