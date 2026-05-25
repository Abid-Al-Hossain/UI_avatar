"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
import dynamic from "next/dynamic";
import AppShell from "@/components/shared/layout/AppShell";
import PreviewDownloadPanel, {
} from "@/components/shared/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/components/shared/layout/PreviewPanel";
import { PlaygroundLayout } from "@/components/shared/layout/PlaygroundLayout";

import { buildAvatarExport } from "./_utils/exportUtils";
import { PREVIEW_SRC_DOC } from "./_utils/avatarPreviewDoc";
import { useHistoryState } from "@/components/hooks/useHistoryState";
import UndoRedoButtons from "@/components/shared/layout/UndoRedoButtons";
import SectionSelector from "@/components/shared/layout/SectionSelector";

// New Sections
const ThreeAvatarSection = dynamic(
  () => import("./_section/ThreeAvatarSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full animate-pulse rounded-xl bg-slate-900/50" />
    ),
  },
);
const MotionSection = dynamic(() => import("./_section/MotionSection"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-xl bg-slate-900/50" />
  ),
});

import AvatarLivePreview from "./_section/AvatarLivePreview";
import {
  resolveAvatarBoxShadow,
  resolveAvatarFilterString,
  resolveAvatarImageStyle,
  resolveAvatarRadiusStyle,
  resolveAvatarRootStyle,
  resolveAvatarTransform,
} from "./_utils/avatarRenderUtils";
import {
  INITIAL_STATE,
  type AvatarState,
} from "./types";
import BasicsSection from "./_section/BasicsSection";
import MetadataSection from "./_section/MetadataSection";
import FramingSection from "./_section/FramingSection";
import SizingSection from "./_section/SizingSection";
import SurfaceSection from "./_section/SurfaceSection";
import TypographySection from "./_section/TypographySection";
import StatePreviewSection from "./_section/StatePreviewSection";
import StatusSection from "./_section/StatusSection";
import EffectsSection from "./_section/EffectsSection";
import GroupPreviewSection from "./_section/GroupPreviewSection";
import AccessibilitySection from "./_section/AccessibilitySection";
import PresetsSection from "./_section/PresetsSection";

import useHydrated from "@/components/hooks/useHydrated";

export default function AvatarPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

  // --- Unified State Management ---
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<AvatarState>(INITIAL_STATE);

  // Destructure state for easier access
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
    initialsBg,
    initialsColor,
    fontFamily,
    opacity,
    filterGrayscale,
    filterBlur,
    filterSepia,
    filterBrightness,
    filterContrast,
    status,
    statusPosition,
    statusAnimation,
    badgeCount,
    showGroup,
    groupSpacing,
    groupLimit,
    groupDirection,
    hoverZoom,
    hoverGrayscale,
    imageRotation,
    imageScale,
    effect3D,
    loadingState,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    ariaLabel,
    ariaRole,
    ariaHidden,
  } = state;

  // -- Proxy Setters for Backward Compatibility --
  type Updater<T> = T | ((prev: T) => T);
  const makeSetter =
    <K extends keyof AvatarState>(key: K) =>
    (value: Updater<AvatarState[K]>) =>
      updateState((s) => ({
        ...s,
        [key]:
          typeof value === "function"
            ? (value as (prev: AvatarState[K]) => AvatarState[K])(s[key])
            : value,
      }));

  const setSrc = makeSetter("src");
  const setSrcSet = makeSetter("srcSet");
  const setAlt = makeSetter("alt");
  const setTitle = makeSetter("title");
  const setInitials = makeSetter("initials");
  const setFallbackPriority = makeSetter("fallbackPriority");
  const setObjectFit = makeSetter("objectFit");
  const setObjectPosition = makeSetter("objectPosition");
  const setSize = makeSetter("size");
  const setAspectRatio = makeSetter("aspectRatio");
  const setRadiusMode = makeSetter("radiusMode");
  const setRadiusValue = makeSetter("radiusValue");
  const setBorderWidth = makeSetter("borderWidth");
  const setBorderColor = makeSetter("borderColor");
  const setBorderStyle = makeSetter("borderStyle");
  const setBorderOffset = makeSetter("borderOffset");
  const setShadow = makeSetter("shadow");
  const setInitialsBg = makeSetter("initialsBg");
  const setInitialsColor = makeSetter("initialsColor");
  const setFontFamily = makeSetter("fontFamily");
  const setOpacity = makeSetter("opacity");
  const setFilterGrayscale = makeSetter("filterGrayscale");
  const setFilterBlur = makeSetter("filterBlur");
  const setFilterSepia = makeSetter("filterSepia");
  const setFilterBrightness = makeSetter("filterBrightness");
  const setFilterContrast = makeSetter("filterContrast");
  const setStatus = makeSetter("status");
  const setStatusPosition = makeSetter("statusPosition");
  const setStatusAnimation = makeSetter("statusAnimation");
  const setBadgeCount = makeSetter("badgeCount");
  const setShowGroup = makeSetter("showGroup");
  const setGroupSpacing = makeSetter("groupSpacing");
  const setGroupLimit = makeSetter("groupLimit");
  const setGroupDirection = makeSetter("groupDirection");
  const setHoverZoom = makeSetter("hoverZoom");
  const setHoverGrayscale = makeSetter("hoverGrayscale");
  const setImageRotation = makeSetter("imageRotation");
  const setImageScale = makeSetter("imageScale");
  const setEffect3D = makeSetter("effect3D");
  const setUse3DBadge = makeSetter("use3DBadge");
  const setBadgeAnimate = makeSetter("badgeAnimate");
  const setUse3DStatus = makeSetter("use3DStatus");
  const setEntranceAnimation = makeSetter("entranceAnimation");
  const setHoverEffect = makeSetter("hoverEffect");
  const setAccessoryType = makeSetter("accessoryType");
  const setAccessoryColor = makeSetter("accessoryColor");
  const setOrbitSpeed = makeSetter("orbitSpeed");
  const setTextureEffect = makeSetter("textureEffect");
  const setBorderEffect = makeSetter("borderEffect");
  const setAriaLabel = makeSetter("ariaLabel");
  const setAriaRole = makeSetter("ariaRole");
  const setAriaHidden = makeSetter("ariaHidden");
  const setLoadingState = makeSetter("loadingState");
  const applyPreset = (presetState: Partial<AvatarState>) => {
    updateState(() => ({ ...INITIAL_STATE, ...presetState }));
    setPreviewResetKey((value) => value + 1);
  };

  // Export
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadName, setDownloadName] = useState("my-avatar");

  // --- Tabs ---
  const sections = [
    { id: "presets", label: "Presets" },
    { id: "basics", label: "Basics" },
    { id: "state-preview", label: "State Preview" },
    { id: "metadata", label: "Metadata" },
    { id: "framing", label: "Framing" },
    { id: "sizing", label: "Sizing" },
    { id: "surface", label: "Surface" },
    { id: "typography", label: "Typography" },
    { id: "effects", label: "Effects" },
    { id: "accessories", label: "Accessories" },
    { id: "motion", label: "Motion" },
    { id: "status", label: "Status" },
    { id: "grouping", label: "Grouping" },
    { id: "accessibility", label: "Accessibility" },
  ];

  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

  // --- Preview Logic (PostMessage) ---
  const getPreviewPayload = () => {
    // Helpers
    const radiusStyle = resolveAvatarRadiusStyle(radiusMode, radiusValue);
    const filters = resolveAvatarFilterString({
      filterGrayscale,
      filterBlur,
      filterSepia,
      filterBrightness,
      filterContrast,
    });

    return {
      src,
      srcSet,
      alt,
      title,
      initials,
      fallbackPriority,
      size,
      aspectRatio,
      radiusStyle,
      initialsBg,
      initialsColor,
      fontFamily,
      borderWidth,
      borderStyle,
      borderColor,
      borderOffset,
      shadow,
      objectFit,
      objectPosition,
      opacity,
      filters,
      status,
      statusPosition,
      statusAnimation,
      hoverZoom,
      hoverGrayscale,
      groupSpacing,
      groupLimit,
      groupDirection,
      showGroup,
      imageRotation,
      imageScale,
      effect3D,
      loadingState,
      ariaLabel,
      ariaRole,
      ariaHidden,
    };
  };

  const previewPayload = getPreviewPayload();

  // Initial Load Only
  const initialSrcDoc = PREVIEW_SRC_DOC;

  // Live Updates via PostMessage
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(previewPayload, "*");
    }
  }, [previewPayload]);

  // --- Export Handler ---
  const exportPayload = useMemo(() => {
    return {
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
      groupSpacing,
      groupLimit,
      groupDirection,
      showGroup,
      imageRotation,
      imageScale,
      effect3D,
      use3DBadge,
      badgeAnimate,
      use3DStatus,
      accessoryType,
      accessoryColor,
      orbitSpeed,
      entranceAnimation,
      hoverEffect,
      textureEffect,
      borderEffect,
      loadingState,
      ariaLabel,
      ariaRole,
      ariaHidden,
      downloadName: downloadName || "",
    };
  }, [
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
    groupSpacing,
    groupLimit,
    groupDirection,
    showGroup,
    imageRotation,
    imageScale,
    effect3D,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    loadingState,
    ariaLabel,
    ariaRole,
    ariaHidden,
    downloadName,
  ]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildAvatarExport(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { filename, content } = buildAvatarExport(exportPayload);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

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
  const containerStyle = resolveAvatarRootStyle({
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

  // --- Section Renderer ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "presets":
        return <PresetsSection state={state} applyPreset={applyPreset} />;
      case "basics":
        return (
          <BasicsSection
            src={src}
            setSrc={setSrc}
            srcSet={srcSet}
            setSrcSet={setSrcSet}
            initials={initials}
            setInitials={setInitials}
            objectFit={objectFit}
            setObjectFit={setObjectFit}
          />
        );
      case "state-preview":
        return (
          <StatePreviewSection
            loadingState={loadingState}
            setLoadingState={setLoadingState}
            fallbackPriority={fallbackPriority}
            setFallbackPriority={setFallbackPriority}
            status={status}
            setStatus={setStatus}
            badgeCount={badgeCount}
            setBadgeCount={setBadgeCount}
            showGroup={showGroup}
            setShowGroup={setShowGroup}
          />
        );
      case "metadata":
        return (
          <MetadataSection
            alt={alt}
            setAlt={setAlt}
            title={title}
            setTitle={setTitle}
            ariaLabel={ariaLabel}
            setAriaLabel={setAriaLabel}
            ariaRole={ariaRole}
            setAriaRole={setAriaRole}
            ariaHidden={ariaHidden}
            setAriaHidden={setAriaHidden}
          />
        );
      case "framing":
        return (
          <FramingSection
            objectPosition={objectPosition}
            setObjectPosition={setObjectPosition}
          />
        );
      case "sizing":
        return (
          <SizingSection
            size={size}
            setSize={setSize}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            radiusMode={radiusMode}
            setRadiusMode={setRadiusMode}
            radiusValue={radiusValue}
            setRadiusValue={setRadiusValue}
          />
        );
      case "surface":
        return (
          <SurfaceSection
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderStyle={borderStyle}
            setBorderStyle={setBorderStyle}
            borderOffset={borderOffset}
            setBorderOffset={setBorderOffset}
            shadow={shadow}
            setShadow={setShadow}
          />
        );
      case "typography":
        return (
          <TypographySection
            initialsBg={initialsBg}
            setInitialsBg={setInitialsBg}
            initialsColor={initialsColor}
            setInitialsColor={setInitialsColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
        );
      case "effects":
        return (
          <EffectsSection
            opacity={opacity}
            setOpacity={setOpacity}
            filterGrayscale={filterGrayscale}
            setFilterGrayscale={setFilterGrayscale}
            filterBlur={filterBlur}
            setFilterBlur={setFilterBlur}
            filterSepia={filterSepia}
            setFilterSepia={setFilterSepia}
            filterBrightness={filterBrightness}
            setFilterBrightness={setFilterBrightness}
            filterContrast={filterContrast}
            setFilterContrast={setFilterContrast}
            imageRotation={imageRotation}
            setImageRotation={setImageRotation}
            imageScale={imageScale}
            setImageScale={setImageScale}
            hoverZoom={hoverZoom}
            setHoverZoom={setHoverZoom}
            hoverGrayscale={hoverGrayscale}
            setHoverGrayscale={setHoverGrayscale}
            effect3D={effect3D}
            setEffect3D={setEffect3D}
          />
        );
      case "accessories":
        return (
          <ThreeAvatarSection
            use3DBadge={use3DBadge}
            setUse3DBadge={setUse3DBadge}
            badgeAnimate={badgeAnimate}
            setBadgeAnimate={setBadgeAnimate}
            use3DStatus={use3DStatus}
            setUse3DStatus={setUse3DStatus}
            accessoryType={accessoryType}
            setAccessoryType={setAccessoryType}
            accessoryColor={accessoryColor}
            setAccessoryColor={setAccessoryColor}
            orbitSpeed={orbitSpeed}
            setOrbitSpeed={setOrbitSpeed}
          />
        );
      case "motion":
        return (
          <MotionSection
            entranceAnimation={entranceAnimation}
            setEntranceAnimation={setEntranceAnimation}
            hoverEffect={hoverEffect}
            setHoverEffect={setHoverEffect}
            textureEffect={textureEffect}
            setTextureEffect={setTextureEffect}
            borderEffect={borderEffect}
            setBorderEffect={setBorderEffect}
          />
        );
      case "status":
        return (
          <StatusSection
            status={status}
            setStatus={setStatus}
            statusPosition={statusPosition}
            setStatusPosition={setStatusPosition}
            statusAnimation={statusAnimation}
            setStatusAnimation={setStatusAnimation}
            badgeCount={badgeCount}
            setBadgeCount={setBadgeCount}
            accessoryType={accessoryType}
            setAccessoryType={setAccessoryType}
            accessoryColor={accessoryColor}
            setAccessoryColor={setAccessoryColor}
            use3DBadge={use3DBadge}
            setUse3DBadge={setUse3DBadge}
            use3DStatus={use3DStatus}
            setUse3DStatus={setUse3DStatus}
            badgeAnimate={badgeAnimate}
            setBadgeAnimate={setBadgeAnimate}
          />
        );
      case "grouping":
        return (
          <GroupPreviewSection
            showGroup={showGroup}
            setShowGroup={setShowGroup}
            groupSpacing={groupSpacing}
            setGroupSpacing={setGroupSpacing}
            groupLimit={groupLimit}
            setGroupLimit={setGroupLimit}
            groupDirection={groupDirection}
            setGroupDirection={setGroupDirection}
          />
        );
      case "accessibility":
        return (
          <AccessibilitySection
            alt={alt}
            ariaLabel={ariaLabel}
            ariaRole={ariaRole}
            ariaHidden={ariaHidden}
          />
        );
      default:
        return null;
    }
  };

  const livePreviewNode = (
    <AvatarLivePreview
      key={previewResetKey}
      src={src}
      srcSet={srcSet}
      alt={alt}
      title={title}
      initials={initials}
      fallbackPriority={fallbackPriority}
      objectFit={objectFit}
      objectPosition={objectPosition}
      loadingState={loadingState}
      size={size}
      aspectRatio={aspectRatio}
      radiusMode={radiusMode}
      radiusValue={radiusValue}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderOffset={borderOffset}
      shadow={shadow}
      opacity={opacity}
      filterGrayscale={filterGrayscale}
      filterBlur={filterBlur}
      filterSepia={filterSepia}
      filterBrightness={filterBrightness}
      filterContrast={filterContrast}
      initialsBg={initialsBg}
      initialsColor={initialsColor}
      fontFamily={fontFamily}
      status={status}
      statusPosition={statusPosition}
      statusAnimation={statusAnimation}
      badgeCount={badgeCount}
      showGroup={showGroup}
      groupSpacing={groupSpacing}
      groupLimit={groupLimit}
      groupDirection={groupDirection}
      hoverZoom={hoverZoom}
      hoverGrayscale={hoverGrayscale}
      imageRotation={imageRotation}
      imageScale={imageScale}
      effect3D={effect3D}
      use3DBadge={use3DBadge}
      badgeAnimate={badgeAnimate}
      use3DStatus={use3DStatus}
      accessoryType={accessoryType}
      accessoryColor={accessoryColor}
      orbitSpeed={orbitSpeed}
      entranceAnimation={entranceAnimation}
      hoverEffect={hoverEffect}
      textureEffect={textureEffect}
      borderEffect={borderEffect}
      filters={filters}
      containerStyle={containerStyle}
      imageStyle={imageStyle}
      ariaLabel={ariaLabel}
      ariaRole={ariaRole}
      ariaHidden={ariaHidden}
    />
  );

  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  const controls = (
    <>
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {activeSection === "presets" ? (
        <PresetsSection state={state} applyPreset={applyPreset} />
      ) : (
        renderActiveSection()
      )}
    </>
  );

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc={initialSrcDoc}
      iframeRef={iframeRef}
      handleIframeLoad={() => {
        // Send initial sync when iframe loads
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(previewPayload, "*");
        }
      }}
      downloadFormat="react"
      setDownloadFormat={() => {}}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownload}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={livePreviewNode}
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Avatar Playground"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
