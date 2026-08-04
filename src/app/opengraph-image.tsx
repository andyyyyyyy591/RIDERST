import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "trackingrt — Seguimiento de envíos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Truck icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 .001M13 16l2-7h4l2 7M13 16H9" />
          </svg>
        </div>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
          <span style={{ fontSize: 64, fontWeight: 900, color: "#111827", letterSpacing: "-2px" }}>
            tracking
          </span>
          <span style={{ fontSize: 64, fontWeight: 900, color: "#1d4ed8", letterSpacing: "-2px" }}>
            rt
          </span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 28, color: "#6b7280", margin: 0, fontWeight: 400 }}>
          Seguimiento de envíos en tiempo real
        </p>

        {/* Domain */}
        <div
          style={{
            marginTop: 40,
            padding: "10px 28px",
            background: "#f3f4f6",
            borderRadius: 999,
            fontSize: 22,
            color: "#374151",
            fontWeight: 600,
          }}
        >
          trackingrt.online
        </div>
      </div>
    ),
    { ...size }
  );
}
