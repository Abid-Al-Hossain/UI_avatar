"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import Switch from "@/components/shared/input/Switch";
import InputControl from "@/components/shared/input/Input";

export default function StatePreviewSection(props: {
  loadingState: "default" | "loading" | "error";
  setLoadingState: (v: "default" | "loading" | "error") => void;
  fallbackPriority: "auto" | "initials" | "image" | "status";
  setFallbackPriority: (v: "auto" | "initials" | "image" | "status") => void;
  status: "none" | "online" | "offline" | "busy" | "away";
  setStatus: (v: "none" | "online" | "offline" | "busy" | "away") => void;
  badgeCount: string;
  setBadgeCount: (v: string) => void;
  showGroup: boolean;
  setShowGroup: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="State Preview"
        subtitle="Force loading, fallback, presence, and grouped states in one place."
      >
        <div className="space-y-4">
          <LabeledField label="Loading State">
            <Segmented
              value={props.loadingState}
              onChange={(v) =>
                props.setLoadingState(v as "default" | "loading" | "error")
              }
              items={[
                { value: "default", label: "Default" },
                { value: "loading", label: "Loading" },
                { value: "error", label: "Error" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Fallback Priority">
            <Segmented
              value={props.fallbackPriority}
              onChange={(value) =>
                props.setFallbackPriority(
                  value as "auto" | "initials" | "image" | "status",
                )
              }
              items={[
                { value: "auto", label: "Auto" },
                { value: "image", label: "Image First" },
                { value: "initials", label: "Initials First" },
                { value: "status", label: "Status First" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Presence State">
            <Segmented
              value={props.status}
              onChange={(v) =>
                props.setStatus(
                  v as "none" | "online" | "offline" | "busy" | "away",
                )
              }
              items={[
                { value: "none", label: "None" },
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
                { value: "busy", label: "Busy" },
                { value: "away", label: "Away" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Badge Label">
            <InputControl
              value={props.badgeCount}
              onChange={(e) => props.setBadgeCount(e.target.value)}
              placeholder="e.g. 3, 9+, New"
            />
          </LabeledField>

          <Switch
            label="Group Preview"
            checked={props.showGroup}
            onChange={props.setShowGroup}
          />
        </div>
      </SectionCard>
    </div>
  );
}
