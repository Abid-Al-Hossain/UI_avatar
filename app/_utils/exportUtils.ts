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
    use3DStatus,
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
    `import { motion } from "framer-motion";`,
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

export default function Avatar() {
  const loadingState = ${q(loadingState)} as const;
  const hasSrc = ${src ? "true" : "false"};
  const [imgLoaded, setImgLoaded] = React.useState(loadingState !== "loading");
  const [imgError, setImgError] = React.useState(loadingState === "error");
  const [isHovered, setIsHovered] = React.useState(false);
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        ...rootStyle,
        transform: rootStyle.transform,
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

      ${is3D ? `<div style={{ position: "absolute", inset: -20, pointerEvents: "none" }}><Canvas><ambientLight intensity={0.5} /><pointLight position={[5, 5, 5]} /><Float speed={2} rotationIntensity={1} floatIntensity={1}><mesh position={[1.2, 1.2, 0]}><sphereGeometry args={[0.25, 24, 24]} /><meshStandardMaterial color="${accessoryColor}" /></mesh></Float></Canvas></div>` : ""}
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
