import { CSSProperties } from "react";

export default function Guides() {
  const containerStyle: CSSProperties = {
    padding: "4rem 0",
    maxWidth: "900px",
    lineHeight: 1.7,
    margin: "0 auto",
  };

  const divider: CSSProperties = {
    height: "1px",
    background: "#222",
    margin: "0.75rem 0 1.25rem 0",
  };

  const linkStyle: CSSProperties = {
    fontWeight: 600,
    textDecoration: "underline",
  };

  const sectionTitle: CSSProperties = {
    marginTop: "2.5rem",
  };

  const card: CSSProperties = {
    marginTop: "1.25rem",
    padding: "1.25rem 1.25rem",
    border: "1px solid #222",
    borderRadius: 10,
    background: "#0b0b0b",
  };

  const badge: CSSProperties = {
    display: "inline-block",
    fontSize: "0.75rem",
    padding: "0.15rem 0.5rem",
    border: "1px solid #333",
    borderRadius: 999,
    opacity: 0.9,
    marginLeft: "0.6rem",
    transform: "translateY(-2px)",
  };

  const small: CSSProperties = { opacity: 0.85, marginTop: "0.35rem" };

  return (
    <main style={containerStyle}>
      <h1>Guides</h1>
      <p style={{ opacity: 0.9, marginTop: "0.5rem" }}>
        Deep, practical engineering guides for reducing cloud costs — written as
        systems, not blog posts.
      </p>

      <section style={sectionTitle}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 0 }}>Start here</h2>
        <div style={divider} />

        <p style={{ maxWidth: 760 }}>
          If your cloud spend feels unpredictable or out of control, begin with
          this guide. It focuses on reclaiming waste, assigning ownership, and
          stabilizing your infrastructure before attempting forecasting or
          optimization.
        </p>

        <div style={card}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="/guides/reduce-azure-costs" style={linkStyle}>
              How to Reduce Azure Costs for Small Teams
            </a>
            <span style={badge}>Foundational</span>
          </div>
          <p style={small}>
            The highest ROI fixes first: idle compute, log ingestion, data
            transfer, storage sprawl, and orphaned resources.
          </p>
        </div>
      </section>

      <section style={sectionTitle}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 0 }}>Then read</h2>
        <div style={divider} />

        <p style={{ maxWidth: 760 }}>
          Once your baseline spend is stable, this guide shows how to forecast
          cloud costs realistically by separating baseline costs from growth
          drivers and modeling real-world scenarios.
        </p>

        <div style={card}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="/guides/forecast-cloud-costs" style={linkStyle}>
              How to Forecast Cloud Costs (Without Lying to Yourself)
            </a>
            <span style={badge}>Forecasting</span>
          </div>
          <p style={small}>
            A practical model: baseline + growth drivers + buffers — so your
            forecast stays honest as infrastructure changes.
          </p>
        </div>
      </section>

      <section style={sectionTitle}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 0 }}>
          More guides coming
        </h2>
        <div style={divider} />

        <ul style={{ marginTop: "1rem", paddingLeft: "1.1rem", opacity: 0.9 }}>
          <li>Common Azure cost traps</li>
          <li>FinOps models for startups</li>
          <li>Real-world cloud cost breakdowns</li>
        </ul>
      </section>
    </main>
  );
}
