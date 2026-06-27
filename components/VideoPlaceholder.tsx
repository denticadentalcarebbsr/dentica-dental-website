"use client";

import { useState } from "react";

interface VideoPlaceholderProps {
  videoId: string;
  title?: string;
  height?: string;
  className?: string;
}

export default function VideoPlaceholder({
  videoId,
  title = "Watch Video",
  height = "320px",
  className = "",
}: VideoPlaceholderProps) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div
        className={`video-placeholder ${className}`}
        style={{ height, borderRadius: "var(--radius-lg)" }}
      >
        <div className="video-play-btn" style={{ opacity: 0.5 }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="12" />
            <line x1="9" y1="12" x2="15" y2="15" />
            <line x1="15" y1="15" x2="15" y2="9" />
          </svg>
        </div>
        <span style={{ fontSize: ".85rem", fontWeight: 600 }}>Video Coming Soon</span>
      </div>
    );
  }

  if (playing) {
    return (
      <div style={{ height, borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div
      className={`video-placeholder ${className}`}
      style={{ height, borderRadius: "var(--radius-lg)" }}
      onClick={() => setPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
    >
      {/* YouTube thumbnail as background */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
        }}
      />
      <div className="video-play-btn" style={{ position: "relative", zIndex: 1 }}>
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <span style={{ position: "relative", zIndex: 1, fontSize: ".85rem", fontWeight: 600 }}>
        {title}
      </span>
    </div>
  );
}
