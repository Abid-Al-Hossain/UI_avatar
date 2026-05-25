import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";

export default function StatusSection(props: {
  status: "none" | "online" | "offline" | "busy" | "away";
  setStatus: (v: "none" | "online" | "offline" | "busy" | "away") => void;
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  setStatusPosition: (
    v: "top-right" | "bottom-right" | "bottom-left" | "top-left",
  ) => void;
  statusAnimation: "none" | "pulse";
  setStatusAnimation: (v: "none" | "pulse") => void;
  badgeCount: string;
  setBadgeCount: (v: string) => void;
  accessoryType: "none" | "crown" | "halo-cyber" | "orb-float";
  setAccessoryType: (v: "none" | "crown" | "halo-cyber" | "orb-float") => void;
  accessoryColor: string;
  setAccessoryColor: (v: string) => void;
  use3DBadge: "none" | "sphere" | "cube" | "star";
  setUse3DBadge: (v: "none" | "sphere" | "cube" | "star") => void;
  use3DStatus: "none" | "ring" | "halo";
  setUse3DStatus: (v: "none" | "ring" | "halo") => void;
  badgeAnimate: boolean;
  setBadgeAnimate: (v: boolean) => void;
}) {
  type PresencePreset =
    | "status-only"
    | "badge-only"
    | "leader"
    | "cyber"
    | "pairing";

  const applyPresencePreset = (
    preset: PresencePreset,
  ) => {
    if (preset === "status-only") {
      props.setStatus("online");
      props.setBadgeCount("");
      props.setAccessoryType("none");
      props.setUse3DBadge("none");
      props.setUse3DStatus("ring");
      props.setBadgeAnimate(true);
      return;
    }
    if (preset === "badge-only") {
      props.setStatus("none");
      props.setBadgeCount("9+");
      props.setAccessoryType("none");
      props.setUse3DBadge("sphere");
      props.setUse3DStatus("none");
      props.setBadgeAnimate(true);
      return;
    }
    if (preset === "leader") {
      props.setStatus("away");
      props.setBadgeCount("12");
      props.setAccessoryType("crown");
      props.setAccessoryColor("#fbbf24");
      props.setUse3DBadge("star");
      props.setUse3DStatus("ring");
      props.setBadgeAnimate(true);
      return;
    }
    if (preset === "cyber") {
      props.setStatus("busy");
      props.setBadgeCount("");
      props.setAccessoryType("halo-cyber");
      props.setAccessoryColor("#22d3ee");
      props.setUse3DBadge("cube");
      props.setUse3DStatus("halo");
      props.setBadgeAnimate(false);
      return;
    }
    props.setStatus("online");
    props.setBadgeCount("3");
    props.setAccessoryType("orb-float");
    props.setAccessoryColor("#a78bfa");
    props.setUse3DBadge("sphere");
    props.setUse3DStatus("ring");
    props.setBadgeAnimate(true);
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Presence & Badge"
        subtitle="Show availability and notification count."
      >
        <div className="space-y-4">
          <LabeledField label="Status">
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
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={props.badgeCount}
                onChange={(e) => props.setBadgeCount(e.target.value)}
                placeholder="e.g. 1, 99+, New"
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--primary)] text-[var(--text)]"
                style={{ borderColor: "var(--border)" }}
              />
              <p className="text-xs text-[var(--muted)]">
                Adding text turns the dot into a circular or pill badge.
              </p>
            </div>
          </LabeledField>

          <LabeledField label="Position">
            <Segmented
              value={props.statusPosition}
              onChange={(v) =>
                props.setStatusPosition(
                  v as "top-right" | "bottom-right" | "bottom-left" | "top-left",
                )
              }
              items={[
                { value: "top-left", label: "TL" },
                { value: "top-right", label: "TR" },
                { value: "bottom-left", label: "BL" },
                { value: "bottom-right", label: "BR" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Animation">
            <Segmented
              value={props.statusAnimation}
              onChange={(v) => props.setStatusAnimation(v as "none" | "pulse")}
              items={[
                { value: "none", label: "None" },
                { value: "pulse", label: "Pulse" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Presence Profiles"
        subtitle="Bundle badges, accessories, and status into richer editor presets."
      >
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { value: "status-only", label: "Status Only" },
            { value: "badge-only", label: "Badge Only" },
            { value: "leader", label: "Leader" },
            { value: "cyber", label: "Cyber" },
            { value: "pairing", label: "Pairing" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                applyPresencePreset(item.value as PresencePreset)
              }
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5" style={{ color: "var(--muted)" }}>
          These presets intentionally combine status, badge, and accessory states so the preview and export stay visually aligned when the avatar carries more than one signal.
        </p>
      </SectionCard>
    </div>
  );
}
