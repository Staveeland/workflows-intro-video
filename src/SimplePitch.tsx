import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

// Workflows brand colors
const BRAND_GREEN = "#BFDE42";
const DARK_BG = "#0a0a0a";
const TEXT_WHITE = "#ffffff";
const TEXT_GRAY = "#888888";

// Fade in/out helper
const useFade = (frame: number, startFrame: number, duration: number) => {
  const fadeIn = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [startFrame + duration - 20, startFrame + duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isVisible = frame >= startFrame && frame < startFrame + duration;
  return { opacity: Math.min(fadeIn, fadeOut), isVisible };
};

// Icon components
const IconQuestion: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = BRAND_GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M9 9a3 3 0 114 2.83V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill={color} />
  </svg>
);

const IconChat: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = BRAND_GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="12" cy="12" r="1" fill={color} />
    <circle cx="8" cy="12" r="1" fill={color} />
    <circle cx="16" cy="12" r="1" fill={color} />
  </svg>
);

const IconAutomation: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = BRAND_GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconInsight: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = BRAND_GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 14l4-4 3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="8" r="2" fill={color} />
  </svg>
);

const IconArrow: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = TEXT_GRAY,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconShield: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = BRAND_GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" />
  </svg>
);

const IconNorway: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 22 16" fill="none">
    <rect width="22" height="16" rx="2" fill="#BA0C2F" />
    <rect x="6" width="4" height="16" fill="#fff" />
    <rect y="6" width="22" height="4" fill="#fff" />
    <rect x="7" width="2" height="16" fill="#00205B" />
    <rect y="7" width="22" height="2" fill="#00205B" />
  </svg>
);

// Section 1: Problem/Hook (0-6s, frames 0-180)
const Section1_Problem: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const { opacity, isVisible } = useFade(frame, 0, 180);

  // Smooth slide up + fade for main text
  const text1Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 25, stiffness: 120, mass: 1 },
  });
  const text1Y = interpolate(text1Progress, [0, 1], [60, 0]);

  // Slight scale + fade for subtitle, delayed
  const text2Progress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 20, stiffness: 100, mass: 1.2 },
  });
  const text2Scale = interpolate(text2Progress, [0, 1], [0.9, 1]);

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 50 }}>
      <h1
        style={{
          fontSize: 90,
          fontWeight: 300,
          color: TEXT_WHITE,
          margin: 0,
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: text1Progress,
          transform: `translateY(${text1Y}px)`,
          maxWidth: 1600,
        }}
      >
        AI kan transformere bedriften din
      </h1>
      <p
        style={{
          fontSize: 64,
          fontWeight: 300,
          color: BRAND_GREEN,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: text2Progress,
          transform: `scale(${text2Scale})`,
        }}
      >
        Men hvor starter man?
      </p>
    </AbsoluteFill>
  );
};

// Section 2: We are Workflows (6-12s, frames 180-360)
const Section2_Identity: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const startFrame = 180;
  const { opacity, isVisible } = useFade(frame, startFrame, 180);

  // Logo scales up smoothly
  const logoProgress = spring({
    frame: frame - startFrame - 15,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.8 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Tagline slides in from right
  const taglineProgress = spring({
    frame: frame - startFrame - 50,
    fps,
    config: { damping: 22, stiffness: 90, mass: 1 },
  });
  const taglineX = interpolate(taglineProgress, [0, 1], [80, 0]);

  // Description fades up
  const descProgress = spring({
    frame: frame - startFrame - 85,
    fps,
    config: { damping: 25, stiffness: 80, mass: 1.1 },
  });
  const descY = interpolate(descProgress, [0, 1], [40, 0]);

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 50 }}>
      <div style={{ transform: `scale(${logoScale})`, opacity: logoProgress }}>
        <Img src={staticFile("logo.png")} style={{ width: 550, height: "auto" }} />
      </div>
      <h2
        style={{
          fontSize: 72,
          fontWeight: 400,
          color: TEXT_WHITE,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: taglineProgress,
          transform: `translateX(${taglineX}px)`,
        }}
      >
        Din lokale AI-partner
      </h2>
      <p
        style={{
          fontSize: 44,
          fontWeight: 300,
          color: TEXT_GRAY,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: descProgress,
          transform: `translateY(${descY}px)`,
          textAlign: "center",
          maxWidth: 1200,
        }}
      >
        Vi hjelper bedrifter på Vestlandet med å ta i bruk AI — på en trygg og effektiv måte
      </p>
    </AbsoluteFill>
  );
};

// Section 3: What we deliver (12-20s, frames 360-600)
const Section3_WhatWeDo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const startFrame = 360;
  const { opacity, isVisible } = useFade(frame, startFrame, 240);

  const examples = [
    { icon: IconChat, title: "Smarte assistenter", desc: "som svarer kunder døgnet rundt" },
    { icon: IconAutomation, title: "Automatisering", desc: "som frigjør tid til viktigere arbeid" },
    { icon: IconInsight, title: "Innsikt", desc: "som hjelper deg ta bedre beslutninger" },
  ];

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 70 }}>
      <h2
        style={{
          fontSize: 72,
          fontWeight: 300,
          color: TEXT_WHITE,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: spring({ frame: frame - startFrame - 10, fps, config: { damping: 20 } }),
        }}
      >
        Løsninger som faktisk fungerer
      </h2>
      <div style={{ display: "flex", gap: 140, marginTop: 30 }}>
        {examples.map((item, i) => {
          const delay = startFrame + 50 + i * 30;
          const itemOpacity = spring({ frame: frame - delay, fps, config: { damping: 15 } });
          const itemY = interpolate(itemOpacity, [0, 1], [40, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  border: `2px solid ${BRAND_GREEN}40`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: `${BRAND_GREEN}10`,
                }}
              >
                <item.icon size={80} />
              </div>
              <span style={{ fontSize: 42, color: TEXT_WHITE, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif" }}>
                {item.title}
              </span>
              <span style={{ fontSize: 32, color: TEXT_GRAY, fontWeight: 300, fontFamily: "Inter, system-ui, sans-serif", textAlign: "center", maxWidth: 350 }}>
                {item.desc}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Section 4: Process (20-26s, frames 600-780)
const Section4_Process: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const startFrame = 600;
  const { opacity, isVisible } = useFade(frame, startFrame, 180);

  const steps = [
    { num: "01", label: "Vi lytter", desc: "Forstår dine behov" },
    { num: "02", label: "Vi bygger", desc: "Skreddersydd løsning" },
    { num: "03", label: "Vi leverer", desc: "Opplæring inkludert" },
  ];

  // Title slides down
  const titleProgress = spring({ frame: frame - startFrame - 10, fps, config: { damping: 22, stiffness: 100 } });
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 70 }}>
      <h2
        style={{
          fontSize: 72,
          fontWeight: 300,
          color: TEXT_WHITE,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: titleProgress,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Enkelt å komme i gang
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 30 }}>
        {steps.map((step, i) => {
          const delay = startFrame + 40 + i * 35;
          const itemProgress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 90 } });
          // Each step slides in from left with stagger
          const itemX = interpolate(itemProgress, [0, 1], [-50, 0]);

          return (
            <React.Fragment key={i}>
              <div style={{ 
                opacity: itemProgress, 
                transform: `translateX(${itemX}px)`,
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: 20 
              }}>
                <span style={{ fontSize: 72, fontWeight: 200, color: BRAND_GREEN, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {step.num}
                </span>
                <span style={{ fontSize: 40, color: TEXT_WHITE, fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {step.label}
                </span>
                <span style={{ fontSize: 30, color: TEXT_GRAY, fontWeight: 300, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {step.desc}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ opacity: spring({ frame: frame - delay - 15, fps, config: { damping: 15 } }) }}>
                  <IconArrow size={50} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Section 5: Trust (26-32s, frames 780-960)
const Section5_Trust: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const startFrame = 780;
  const { opacity, isVisible } = useFade(frame, startFrame, 180);

  // Shield scales up smoothly
  const shieldProgress = spring({ frame: frame - startFrame - 20, fps, config: { damping: 18, stiffness: 100 } });
  const shieldScale = interpolate(shieldProgress, [0, 1], [0.7, 1]);

  // Title slides up
  const titleProgress = spring({ frame: frame - startFrame - 40, fps, config: { damping: 22, stiffness: 90 } });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Items fade in with stagger
  const item1Progress = spring({ frame: frame - startFrame - 70, fps, config: { damping: 20 } });
  const item2Progress = spring({ frame: frame - startFrame - 85, fps, config: { damping: 20 } });
  const item3Progress = spring({ frame: frame - startFrame - 100, fps, config: { damping: 20 } });

  const footerProgress = spring({ frame: frame - startFrame - 115, fps, config: { damping: 22 } });
  const footerY = interpolate(footerProgress, [0, 1], [20, 0]);

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 50 }}>
      <div style={{ transform: `scale(${shieldScale})`, opacity: shieldProgress }}>
        <IconShield size={140} />
      </div>
      <h2
        style={{
          fontSize: 72,
          fontWeight: 300,
          color: TEXT_WHITE,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: titleProgress,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Trygghet i fokus
      </h2>
      <div style={{ display: "flex", gap: 80, marginTop: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: item1Progress }}>
          <IconNorway size={50} />
          <span style={{ fontSize: 36, color: TEXT_WHITE, fontFamily: "Inter, system-ui, sans-serif" }}>Norsk team</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: item2Progress }}>
          <Img src={staticFile("azure-logo.svg")} style={{ height: 50, width: "auto" }} />
          <span style={{ fontSize: 36, color: TEXT_WHITE, fontFamily: "Inter, system-ui, sans-serif" }}>Microsoft Azure</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: item3Progress }}>
          <span style={{ fontSize: 36, color: BRAND_GREEN, fontFamily: "Inter, system-ui, sans-serif" }}>✓</span>
          <span style={{ fontSize: 36, color: TEXT_WHITE, fontFamily: "Inter, system-ui, sans-serif" }}>GDPR-compliant</span>
        </div>
      </div>
      <p
        style={{
          fontSize: 36,
          color: TEXT_GRAY,
          margin: 0,
          marginTop: 20,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: footerProgress,
          transform: `translateY(${footerY}px)`,
        }}
      >
        Dine data forblir i Europa — alltid
      </p>
    </AbsoluteFill>
  );
};

// Section 6: CTA (32-38s, frames 960-1140)
const Section6_CTA: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const startFrame = 960;
  const { opacity, isVisible } = useFade(frame, startFrame, 180);

  // Logo scales up smoothly
  const logoProgress = spring({ frame: frame - startFrame - 15, fps, config: { damping: 16, stiffness: 90 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1]);

  // Text slides up
  const textProgress = spring({ frame: frame - startFrame - 45, fps, config: { damping: 22, stiffness: 85 } });
  const textY = interpolate(textProgress, [0, 1], [35, 0]);

  // Description fades in
  const descProgress = spring({ frame: frame - startFrame - 70, fps, config: { damping: 20 } });

  // URL scales up slightly for emphasis
  const urlProgress = spring({ frame: frame - startFrame - 95, fps, config: { damping: 18, stiffness: 100 } });
  const urlScale = interpolate(urlProgress, [0, 1], [0.95, 1]);

  if (!isVisible) return null;

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 50 }}>
      <div style={{ transform: `scale(${logoScale})`, opacity: logoProgress }}>
        <Img src={staticFile("logo.png")} style={{ width: 500, height: "auto" }} />
      </div>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 300,
          color: TEXT_WHITE,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: textProgress,
          transform: `translateY(${textY}px)`,
        }}
      >
        La oss ta en prat
      </h2>
      <p
        style={{
          fontSize: 40,
          color: TEXT_GRAY,
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: descProgress,
        }}
      >
        Uforpliktende samtale om hvordan AI kan hjelpe din bedrift
      </p>
      <span
        style={{
          fontSize: 52,
          color: BRAND_GREEN,
          fontWeight: 500,
          fontFamily: "Inter, system-ui, sans-serif",
          opacity: urlProgress,
          transform: `scale(${urlScale})`,
          marginTop: 20,
        }}
      >
        workflows.no
      </span>
    </AbsoluteFill>
  );
};

export const SimplePitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_BG, fontFamily: "Inter, system-ui, sans-serif" }}>
      <Section1_Problem frame={frame} fps={fps} />
      <Section2_Identity frame={frame} fps={fps} />
      <Section3_WhatWeDo frame={frame} fps={fps} />
      <Section4_Process frame={frame} fps={fps} />
      <Section5_Trust frame={frame} fps={fps} />
      <Section6_CTA frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
