"use client";

import type { CSSProperties } from "react";
import type { AvatarExportInput } from "./exportTypes";

export function resolveAvatarRadiusStyle(
  radiusMode: AvatarExportInput["radiusMode"],
  radiusValue: number,
): string {
  if (radiusMode === "circle") return "9999px";
  if (radiusMode === "square") return "0px";
  return `${radiusValue}px`;
}

export function resolveAvatarAspectRatio(aspectRatio: string): string {
  return aspectRatio || "1 / 1";
}

export function resolveAvatarFilterString(params: {
  filterGrayscale: number;
  filterBlur: number;
  filterSepia: number;
  filterBrightness: number;
  filterContrast: number;
}): string {
  const filters = [
    params.filterGrayscale > 0 ? `grayscale(${params.filterGrayscale}%)` : "",
    params.filterBlur > 0 ? `blur(${params.filterBlur}px)` : "",
    params.filterSepia > 0 ? `sepia(${params.filterSepia}%)` : "",
    params.filterBrightness !== 100
      ? `brightness(${params.filterBrightness}%)`
      : "",
    params.filterContrast !== 100 ? `contrast(${params.filterContrast}%)` : "",
  ].filter(Boolean);

  return filters.length ? filters.join(" ") : "none";
}

export function resolveAvatarTransform(params: {
  imageRotation: number;
  imageScale: number;
}): string {
  const rotation = params.imageRotation || 0;
  const scale = params.imageScale || 1;
  return rotation || scale !== 1
    ? `rotate(${rotation}deg) scale(${scale})`
    : "none";
}

export function resolveAvatarBoxShadow(params: {
  borderOffset: number;
  borderColor: string;
  shadow: string;
}): string {
  const shadows = [];
  if (params.borderOffset > 0) {
    shadows.push(`0 0 0 ${params.borderOffset}px ${params.borderColor}`);
  }
  if (params.shadow && params.shadow.trim()) {
    shadows.push(params.shadow.trim());
  }
  return shadows.length ? shadows.join(", ") : "none";
}

export function resolveAvatarRootStyle(params: {
  size: string;
  aspectRatio: string;
  radiusStyle: string;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
  opacity: number;
  fontFamily: string;
  initialsBg: string;
  initialsColor: string;
  boxShadow: string;
  transform: string;
}): CSSProperties {
  return {
    position: "relative",
    width: params.size,
    height: params.size,
    aspectRatio: resolveAvatarAspectRatio(params.aspectRatio),
    borderRadius: params.radiusStyle,
    borderWidth: `${params.borderWidth}px`,
    borderStyle: params.borderStyle as CSSProperties["borderStyle"],
    borderColor: params.borderColor,
    boxSizing: "border-box",
    backgroundColor: params.initialsBg,
    color: params.initialsColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: params.fontFamily,
    opacity: params.opacity / 100,
    boxShadow: params.boxShadow,
    transition: "all 0.3s ease",
    cursor: "default",
    userSelect: "none",
    transform: params.transform,
  };
}

export function resolveAvatarImageStyle(params: {
  objectFit: React.CSSProperties["objectFit"];
  objectPosition: string;
  radiusStyle: string;
  filters: string;
}): CSSProperties {
  return {
    width: "100%",
    height: "100%",
    objectFit: params.objectFit,
    objectPosition: params.objectPosition,
    borderRadius: params.radiusStyle,
    filter: params.filters,
    transition: "all 0.3s ease",
    display: "block",
  };
}

export function resolveAvatarGroupGap(
  groupDirection: "row" | "column",
  groupSpacing: number,
): CSSProperties {
  return groupDirection === "column"
    ? { marginTop: `${groupSpacing}px` }
    : { marginLeft: `${groupSpacing}px` };
}

