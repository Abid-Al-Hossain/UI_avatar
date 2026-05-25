"use client";

import React from "react";
import {
  Segmented,
  SectionCard,
  LabeledField,
  ExportWarningBadge,
} from "@/components/shared/layout/ui";

export type MotionEntrance = "none" | "fade" | "scale" | "slide";
export type MotionHover = "none" | "layout" | "scale" | "holo-card" | "float-y";
export type AvatarTextureEffect = "none" | "glitch" | "fluid" | "glass";
export type AvatarBorderEffect = "none" | "snake" | "heartbeat" | "glow-pulse";

export default function MotionSection(props: {
  entranceAnimation: MotionEntrance;
  setEntranceAnimation: (v: MotionEntrance) => void;

  hoverEffect: MotionHover;
  setHoverEffect: (v: MotionHover) => void;

  // New
  textureEffect: AvatarTextureEffect;
  setTextureEffect: (v: AvatarTextureEffect) => void;
  borderEffect: AvatarBorderEffect;
  setBorderEffect: (v: AvatarBorderEffect) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Entrance Animation (Framer Tech)"
        subtitle="Animate avatars when they mount."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Type <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.entranceAnimation}
              onChange={(v) => props.setEntranceAnimation(v as MotionEntrance)}
              items={[
                { value: "none", label: "None" },
                { value: "fade", label: "Fade" },
                { value: "scale", label: "Scale" },
                { value: "slide", label: "Slide" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard title="Motion Hover" subtitle="Smooth layout transitions.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Hover Interaction <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.hoverEffect}
              onChange={(v) => props.setHoverEffect(v as MotionHover)}
              items={[
                { value: "none", label: "None" },
                { value: "layout", label: "Layout Id" },
                { value: "scale", label: "Spring Scale" },
                { value: "holo-card", label: "Holo Card" },
                { value: "float-y", label: "Levitate" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* --- TEXTURES & BORDERS --- */}
      <SectionCard
        title="Motion Textures"
        subtitle="Cinematic overlay effects."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Texture <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.textureEffect}
              onChange={(v) =>
                props.setTextureEffect(v as AvatarTextureEffect)
              }
              items={[
                { value: "none", label: "None" },
                { value: "glitch", label: "Glitch" },
                { value: "fluid", label: "Fluid" },
                { value: "glass", label: "Glass" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard title="Active Borders" subtitle="Animated border chases.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Border FX <ExportWarningBadge />
              </div>
            }
          >
            <select
              className="w-full h-8 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              value={props.borderEffect}
              onChange={(e) =>
                props.setBorderEffect(e.target.value as AvatarBorderEffect)
              }
            >
              <option value="none">None</option>
              <option value="snake">Snake Line Chase</option>
              <option value="heartbeat">Heartbeat Pulse</option>
              <option value="glow-pulse">Glow Pulse</option>
            </select>
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
