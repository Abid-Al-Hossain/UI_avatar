import { AvatarExportInput } from "./exportTypes";
import {
  resolveAvatarBoxShadow,
  resolveAvatarFilterString,
  resolveAvatarGroupGap,
  resolveAvatarImageStyle,
  resolveAvatarRadiusStyle,
  resolveAvatarRootStyle,
  resolveAvatarTransform,
} from "./avatarRenderUtils";

type AvatarExportParams = AvatarExportInput & {
  downloadName: string;
};

const q = (value: unknown) => JSON.stringify(value);

export function buildAvatarExport(params: AvatarExportParams) {
  const {
    src,
    srcSet,
    alt,
    title,
    initials,
    fallbackPriority,
    objectFit,
    objectPosition,
    size,
    aspectRatio,
    radiusMode,
    radiusValue,
    borderWidth,
    borderColor,
    borderStyle,
    borderOffset,
    shadow,
    opacity,
    initialsBg,
    initialsColor,
    fontFamily,
    filterGrayscale,
    filterBlur,
    filterBrightness,
    filterContrast,
    filterSepia,
    status,
    statusPosition,
    statusAnimation,
    badgeCount,
    hoverZoom,
    hoverGrayscale,
    imageRotation,
    imageScale,
    loadingState,
    showGroup,
    groupSpacing,
    groupLimit,
    groupDirection,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    orbitSpeed,
    accessoryType,
    accessoryColor,
    ariaLabel,
    ariaRole,
    ariaHidden,
    downloadName,
  } = params;

  const filenameBase = downloadName || "avatar";
  const filename = `${filenameBase}.tsx`;

  const radiusStyle = resolveAvatarRadiusStyle(radiusMode, radiusValue);
  const filters = resolveAvatarFilterString({
    filterGrayscale,
    filterBlur,
    filterSepia,
    filterBrightness,
    filterContrast,
  });
  const transform = resolveAvatarTransform({
    imageRotation,
    imageScale,
  });
  const boxShadow = resolveAvatarBoxShadow({
    borderOffset,
    borderColor,
    shadow,
  });
  const rootStyle = resolveAvatarRootStyle({
    size,
    aspectRatio,
    radiusStyle,
    borderWidth,
    borderColor,
    borderStyle,
    opacity,
    fontFamily,
    initialsBg,
    initialsColor,
    boxShadow,
    transform,
  });
  const imageStyle = resolveAvatarImageStyle({
    objectFit,
    objectPosition,
    radiusStyle,
    filters,
  });
  const groupGap = resolveAvatarGroupGap(groupDirection, groupSpacing);
  const hoverTransform = hoverZoom ? "scale(1.08)" : "none";
  const hoverFilter = hoverGrayscale
    ? filters === "none"
      ? "grayscale(100%)"
      : `grayscale(100%) ${filters}`
    : filters;
  const statusColor =
    status === "online"
      ? "#22c55e"
      : status === "offline"
        ? "#94a3b8"
        : status === "busy"
          ? "#ef4444"
          : status === "away"
            ? "#eab308"
            : badgeCount && badgeCount.trim()
              ? "#ef4444"
              : "transparent";
  const is3D = use3DBadge !== "none" || use3DStatus !== "none" || accessoryType !== "none";

  const imports = [
    `import React from "react";`,
    hoverEffect === "holo-card"
      ? `import { motion, useMotionValue, useTransform } from "framer-motion";`
      : `import { motion } from "framer-motion";`,
    is3D
      ? `import { Canvas } from "@react-three/fiber";\nimport { Float, MeshDistortMaterial } from "@react-three/drei";`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const content = `
${imports}

const rootStyle: React.CSSProperties = ${JSON.stringify(rootStyle, null, 2)};
const imageStyle: React.CSSProperties = ${JSON.stringify(imageStyle, null, 2)};
const hoverTransform = ${q(hoverTransform)};
const hoverFilter = ${q(hoverFilter)};
const groupGap = ${JSON.stringify(groupGap, null, 2)};
const badgeCount = ${q(badgeCount)};
const fallbackPriority = ${q(fallbackPriority)};
const ENTRANCE = ${q(entranceAnimation)};
const HOVER_EFFECT = ${q(hoverEffect)};
const TEXTURE_EFFECT = ${q(textureEffect)};
const BORDER_EFFECT = ${q(borderEffect)};
const BADGE_ANIMATE = ${badgeAnimate ? "true" : "false"};
const ORBIT_SPEED = ${Number(orbitSpeed) || 1};

export default function Avatar() {
  const loadingState = ${q(loadingState)} as const;
  const hasSrc = ${src ? "true" : "false"};
  const [imgLoaded, setImgLoaded] = React.useState(loadingState !== "loading");
  const [imgError, setImgError] = React.useState(loadingState === "error");
  const [isHovered, setIsHovered] = React.useState(false);
  const variants = {
    hidden: { opacity: ENTRANCE === "fade" ? 0 : 1, scale: ENTRANCE === "scale" ? 0 : 1, x: ENTRANCE === "slide" ? -50 : 0 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
    hover: { scale: HOVER_EFFECT === "scale" ? 1.1 : 1 },
  };
  ${hoverEffect === "holo-card" ? `const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };` : ""}
  const showImage = hasSrc && !imgError && loadingState !== "error" && loadingState !== "loading";
  const showLoading =
    loadingState === "loading" ||
    (hasSrc && !imgLoaded && !imgError && loadingState === "default");
  const hasBadge = Boolean(badgeCount && badgeCount.trim());
  const showStatus = ${status !== "none" || !!badgeCount.trim() ? "true" : "false"};
  const preferStatusFallback = fallbackPriority === "status";
  const fallbackContent = preferStatusFallback && showStatus ? (badgeCount || ${q(initials)}) : ${q(initials)};
  const statusStyle: React.CSSProperties = {
    position: "absolute",
    minWidth: hasBadge ? 18 : 12,
    minHeight: hasBadge ? 18 : 12,
    padding: hasBadge ? "0 5px" : 0,
    borderRadius: hasBadge ? 999 : "50%",
    border: "2px solid white",
    display: showStatus ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    backgroundColor:
      ${q(statusColor)},
    color: "white",
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1,
    zIndex: 20,
  };
  const statusPositionStyle: React.CSSProperties =
    ${q(statusPosition)} === "top-left"
      ? { top: -2, left: -2 }
      : ${q(statusPosition)} === "top-right"
        ? { top: -2, right: -2 }
        : ${q(statusPosition)} === "bottom-left"
          ? { bottom: -2, left: -2 }
          : { bottom: -2, right: -2 };
  const baseMotion = {
    initial: "hidden",
    animate: "visible",
    whileHover: "hover",
  } as const;

  const card = (
    <motion.div
      {...baseMotion}
      variants={variants}
      layoutId={HOVER_EFFECT === "layout" ? "avatar" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      ${hoverEffect === "holo-card" ? "onMouseMove={handleMouseMove}" : ""}
      style={{
        ...rootStyle,
        transform: rootStyle.transform,
        transformStyle: "preserve-3d",
        ${hoverEffect === "holo-card" ? "rotateX, rotateY," : ""}
      }}
      title={${q(title || alt || undefined)}}
      role={${ariaHidden ? "undefined" : `${q(ariaRole)} === "none" ? undefined : ${q(ariaRole)}`}}
      aria-hidden={${ariaHidden ? "true" : "undefined"}}
      aria-label={${ariaHidden ? "undefined" : q(ariaLabel || alt)}}
    >
      <div
        className="flex items-center justify-center text-xl font-bold"
        style={{
          ...imageStyle,
          position: "absolute",
          inset: 0,
          filter: isHovered ? hoverFilter : imageStyle.filter,
          transform: isHovered && hoverZoom ? hoverTransform : "none",
        }}
      >
        {fallbackContent}
      </div>

      {hasSrc && showLoading && (
        <motion.div
          className="absolute inset-0 bg-slate-800 animate-pulse"
          style={{ borderRadius: imageStyle.borderRadius }}
        />
      )}

      {hasSrc && showImage && (
        <img
          src={${q(src)}}
          srcSet={${q(srcSet)} || undefined}
          alt={${q(alt)}}
          title={${q(title || undefined)}}
          style={{
            ...imageStyle,
            position: "absolute",
            inset: 0,
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
            transform: isHovered && ${hoverZoom ? "true" : "false"} ? ${q(hoverTransform)} : "none",
          }}
          onLoad={() => {
            setImgLoaded(true);
            setImgError(false);
          }}
          onError={() => {
            setImgLoaded(false);
            setImgError(true);
          }}
        />
      )}

      {showStatus && (
        ${statusAnimation === "pulse"
          ? `<motion.span
              style={{ ...statusStyle, ...statusPositionStyle }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {hasBadge ? badgeCount : ""}
            </motion.span>`
          : `<span style={{ ...statusStyle, ...statusPositionStyle }}>
              {hasBadge ? badgeCount : ""}
            </span>`}
      )}

      ${is3D ? `<div style={{ position: "absolute", inset: -20, pointerEvents: "none" }}><Canvas><ambientLight intensity={0.5} /><pointLight position={[5, 5, 5]} />${use3DBadge !== "none" ? `<Float speed={BADGE_ANIMATE ? ORBIT_SPEED : 0} rotationIntensity={BADGE_ANIMATE ? 1 : 0} floatIntensity={BADGE_ANIMATE ? 1 : 0}><mesh position={[1.2, 1.2, 0]}>${use3DBadge === "cube" ? `<boxGeometry args={[0.22, 0.22, 0.22]} />` : use3DBadge === "star" ? `<torusGeometry args={[0.15, 0.06, 8, 16]} />` : `<sphereGeometry args={[0.25, 24, 24]} />`}<meshStandardMaterial color="${accessoryColor}" /></mesh></Float>` : ""}${accessoryType !== "none" ? `<Float speed={ORBIT_SPEED} rotationIntensity={1} floatIntensity={0.5}><mesh position={[0, 1.4, 0]}><torusGeometry args={[0.5, 0.06, 8, 32]} /><meshStandardMaterial color="${accessoryColor}" /></mesh></Float>` : ""}</Canvas></div>` : ""}

      {TEXTURE_EFFECT === "glitch" && (
        <motion.div
          style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", mixBlendMode: "overlay", background: "rgba(255,0,255,0.25)", borderRadius: "inherit" }}
          animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 0.12, repeat: Infinity, ease: "linear" }}
        />
      )}
      {TEXTURE_EFFECT === "fluid" && (
        <motion.div
          style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", mixBlendMode: "color-dodge", background: "conic-gradient(from 0deg, #f0f, #0ff, #0f0, #f0f)", borderRadius: "inherit" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {BORDER_EFFECT === "snake" && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          <motion.rect
            x="0" y="0" width="100%" height="100%"
            fill="none" stroke="#6366f1" strokeWidth={2}
            strokeDasharray="50 150" pathLength={200}
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      )}
      {BORDER_EFFECT === "heartbeat" && (
        <motion.div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", border: "2px solid #6366f1" }}
          animate={{ scale: [1, 1.06, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );

  if (${showGroup ? "true" : "false"}) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: ${q(groupDirection)} }}>
        {Array.from({ length: ${Number(groupLimit)} }).map((_, index) => (
          <div key={index} style={index > 0 ? groupGap : undefined}>
            {card}
          </div>
        ))}
      </div>
    );
  }

  return card;
}
`;

  return { content, filename };
}
