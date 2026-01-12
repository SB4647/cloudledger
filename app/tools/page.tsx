import { CSSProperties } from "react";

export default function Tools() {
  const cardStyle: CSSProperties = {
    border: "1px solid #222",
    borderRadius: 12,
    padding: "1.25rem",
    background: "rgba(255,255,255,0.02)",
  };

  const linkStyle: CSSProperties = {
    fontWeight: 700,
    textDecoration: "underline",
  };

  const descStyle: CSSProperties = {
    marginTop: "0.35rem",
    opacity: 0.85,
    maxWidth: "70ch",
  };

  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Tools</h1>
      <p style={{ opacity: 0.9, marginTop: 0 }}>
        Interactive utilities for forecasting and controlling cloud spend.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.75rem" }}>
        <div style={cardStyle}>
          <a href="/tools/cloud-cost-estimator" style={linkStyle}>
            Cloud Cost Estimator
          </a>
          <p style={descStyle}>
            Enter your monthly spend by category and get a baseline, buffers,
            and a quick “what to fix first” hint.
          </p>
        </div>

        <div style={cardStyle}>
          <a href="/guides/forecast-cloud-costs" style={linkStyle}>
            How to Forecast Cloud Costs (Without Lying to Yourself)
          </a>
          <p style={descStyle}>
            Build forecasts that stay accurate by separating baseline spend from
            growth drivers and scenario changes.
          </p>
        </div>
      </div>
    </main>
  );
}
