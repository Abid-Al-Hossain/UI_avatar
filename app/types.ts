import type {
  MotionEntrance,
  MotionHover,
} from "./_section/MotionSection";
import type {
  ThreeDBadgeMode,
  ThreeDStatusMode,
} from "./_section/ThreeAvatarSection";

export type AvatarObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type AvatarRadiusMode = "circle" | "rounded" | "square" | "custom";
export type AvatarBorderStyle = "solid" | "dashed" | "dotted";
export type AvatarLoadingState = "default" | "loading" | "error";
export type AvatarStatus = "none" | "online" | "offline" | "busy" | "away";
export type AvatarStatusPosition =
  | "top-right"
  | "bottom-right"
  | "bottom-left"
  | "top-left";
export type AvatarStatusAnimation = "none" | "pulse";
export type AvatarGroupDirection = "row" | "column";
export type AvatarAccessoryType = "none" | "crown" | "halo-cyber" | "orb-float";
export type AvatarTextureEffect = "none" | "glitch" | "fluid" | "glass";
export type AvatarBorderEffect = "none" | "snake" | "heartbeat" | "glow-pulse";
export type AvatarAriaRole = "img" | "figure" | "presentation" | "none";
export type AvatarFallbackPriority = "auto" | "initials" | "image" | "status";

export interface AvatarState {
  src: string;
  srcSet: string;
  alt: string;
  title: string;
  initials: string;
  fallbackPriority: AvatarFallbackPriority;
  objectFit: AvatarObjectFit;
  objectPosition: string;
  loadingState: AvatarLoadingState;
  size: string;
  aspectRatio: string;
  radiusMode: AvatarRadiusMode;
  radiusValue: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: AvatarBorderStyle;
  borderOffset: number;
  shadow: string;
  initialsBg: string;
  initialsColor: string;
  fontFamily: string;
  opacity: number;
  filterGrayscale: number;
  filterBlur: number;
  filterSepia: number;
  filterBrightness: number;
  filterContrast: number;
  status: AvatarStatus;
  statusPosition: AvatarStatusPosition;
  statusAnimation: AvatarStatusAnimation;
  badgeCount: string;
  showGroup: boolean;
  groupSpacing: number;
  groupLimit: number;
  groupDirection: AvatarGroupDirection;
  hoverZoom: boolean;
  hoverGrayscale: boolean;
  imageRotation: number;
  imageScale: number;
  effect3D: "none" | "tilt" | "glitch" | "pulse";
  use3DBadge: ThreeDBadgeMode;
  badgeAnimate: boolean;
  use3DStatus: ThreeDStatusMode;
  accessoryType: AvatarAccessoryType;
  accessoryColor: string;
  orbitSpeed: string;
  entranceAnimation: MotionEntrance;
  hoverEffect: MotionHover;
  textureEffect: AvatarTextureEffect;
  borderEffect: AvatarBorderEffect;
  ariaLabel: string;
  ariaRole: AvatarAriaRole;
  ariaHidden: boolean;
}

export const INITIAL_STATE: AvatarState = {
  src: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
  srcSet: "",
  alt: "User Avatar",
  title: "User Avatar",
  initials: "JD",
  fallbackPriority: "auto",
  objectFit: "cover",
  objectPosition: "center",
  loadingState: "default",
  size: "128px",
  aspectRatio: "1/1",
  radiusMode: "circle",
  radiusValue: 64,
  borderWidth: 0,
  borderColor: "#e2e8f0",
  borderStyle: "solid",
  borderOffset: 0,
  shadow: "",
  initialsBg: "#e2e8f0",
  initialsColor: "#64748b",
  fontFamily: "sans-serif",
  opacity: 100,
  filterGrayscale: 0,
  filterBlur: 0,
  filterSepia: 0,
  filterBrightness: 100,
  filterContrast: 100,
  status: "none",
  statusPosition: "bottom-right",
  statusAnimation: "none",
  badgeCount: "",
  showGroup: false,
  groupSpacing: -12,
  groupLimit: 5,
  groupDirection: "row",
  hoverZoom: false,
  hoverGrayscale: false,
  imageRotation: 0,
  imageScale: 1,
  effect3D: "none",
  use3DBadge: "none",
  badgeAnimate: true,
  use3DStatus: "none",
  accessoryType: "none",
  accessoryColor: "#facc15",
  orbitSpeed: "1",
  entranceAnimation: "none",
  hoverEffect: "none",
  textureEffect: "none",
  borderEffect: "none",
  ariaLabel: "",
  ariaRole: "img",
  ariaHidden: false,
};

export type AvatarPreset = {
  id: string;
  label: string;
  description: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags?: string[];
  state: Partial<AvatarState>;
};
