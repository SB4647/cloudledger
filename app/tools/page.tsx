import { CSSProperties } from "react";

type ToolCard = {
  title: string;
  href?: string;
  description: string;
  status?: "live" | "coming-soon";
};

export default function Tools() {
  const pageStyle: CSSProperties = {
    padding: "4rem 0",
    maxWidth: "900px",
    lineHeight: 1.7,
    margin: "0 auto",
  };

  const kickerStyle: CSSProperties = {
    opacity: 0.9,
    marginTop: 0,
    maxWidth: "70ch",
  };

  const stripStyle: CSSProperties = {
    marginTop: "1.75rem",
    padding: "1.25rem 1.25rem",
    border: "1px solid #222",
    borderRadius: 12,
    background: "rgba(255,255,255,0.02)",
  };

  const stripTitleStyle: CSSProperties = {
    marginTop: 0,
    marginBottom: "0.5rem",
    fontSize: "1rem",
    opacity: 0.95,
  };

  const stripTextStyle: CSSProperties = {
    margin: 0,
    opacity: 0.85,
    maxWidth: "80ch",
  };

  const linkStyle: CSSProperties = {
    fontWeight: 700,
    textDecoration: "underline",
    color: "inherit",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "1rem",
    marginTop: "1.25rem",
  };

  const cardStyle: CSSProperties = {
    border: "1px solid #222",
    borderRadius: 12,
    padding: "1.25rem",
    background: "rgba(255,255,255,0.02)",
  };

  const titleRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const badgeBaseStyle: CSSProperties = {
    fontSize: "0.75rem",
    padding: "0.25rem 0.55rem",
    borderRadius: 999,
    border: "1px solid #333",
    opacity: 0.9,
    whiteSpace: "nowrap",
  };

  const descStyle: CSSProperties = {
    marginTop: "0.55rem",
    opacity: 0.85,
    maxWidth: "80ch",
  };

  const noteStyle: CSSProperties = {
    marginTop: "0.6rem",
    fontSize: "0.95rem",
    opacity: 0.8,
    maxWidth: "80ch",
  };

  const sectionTitleStyle: CSSProperties = {
    marginTop: "2.25rem",
    marginBottom: "0.75rem",
    fontSize: "1rem",
    opacity: 0.9,
  };

  const dividerStyle: CSSProperties = {
    height: "1px",
    background: "#222",
    margin: "0.75rem 0 1.25rem 0",
  };

  const tools: ToolCard[] = [
    {
      title: "Cloud Cost Estimator",
      href: "/tools/cloud-cost-estimator",
      description:
        "Enter your monthly spend by category and get a baseline, buffers, and a quick “what to fix first” hint.",
      status: "live",
    },
    {
      title: "How to Forecast Cloud Costs (Without Lying to Yourself)",
      href: "/guides/forecast-cloud-costs",
      description:
        "Build forecasts that stay accurate by separating baseline spend from growth drivers and scenario changes.",
      status: "live",
    },
  ];

  const roadmap: ToolCard[] = [
    {
      title: "Log Ingestion Cost Estimator",
      description:
        "Quickly estimate Log Analytics / App Insights ingestion + retention costs and identify noisy services.",
      status: "coming-soon",
    },
    {
      title: "Egress Cost Quick Check",
      description:
        "Model data transfer costs (egress + cross-region) and spot the hidden multipliers that cause bill shock.",
      status: "coming-soon",
    },
    {
      title: "Idle Compute Checklist",
      description:
        "A simple interactive checklist to hunt the most common “always-on” leaks across VMs, AKS, and App Service.",
      status: "coming-soon",
    },
  ];

  return (
    <main style={pageStyle}>
      <h1 style={{ marginBottom: "0.5rem" }}>Tools</h1>
      <p style={kickerStyle}>
        Interactive utilities for forecasting and controlling cloud spend —
        fast, practical, and focused on the biggest ROI fixes.
      </p>

      <div style={stripStyle}>
        <h2 style={stripTitleStyle}>Start here</h2>
        <p style={stripTextStyle}>
          Use the{" "}
          <a href="/tools/cloud-cost-estimator" style={linkStyle}>
            Cloud Cost Estimator
          </a>{" "}
          to get a baseline. Then read{" "}
          <a href="/guides/reduce-azure-costs" style={linkStyle}>
            How to Reduce Azure Costs for Small Teams
          </a>{" "}
          to find the fastest cost wins (idle compute, logs, storage, egress).
        </p>
      </div>

      <div style={sectionTitleStyle}>Live tools</div>
      <div style={dividerStyle} />

      <div style={gridStyle}>
        {tools.map((t) => {
          const badgeStyle: CSSProperties = {
            ...badgeBaseStyle,
            borderColor: t.status === "live" ? "#2b2b2b" : "#333",
          };

          return (
            <div key={t.title} style={cardStyle}>
              <div style={titleRowStyle}>
                {t.href ? (
                  <a href={t.href} style={linkStyle}>
                    {t.title}
                  </a>
                ) : (
                  <span style={{ fontWeight: 700 }}>{t.title}</span>
                )}

                {t.status === "live" ? (
                  <span style={badgeStyle}>LIVE</span>
                ) : null}
              </div>

              <p style={descStyle}>{t.description}</p>

              {t.title === "Cloud Cost Estimator" ? (
                <p style={noteStyle}>
                  Use this before any forecasting work — unstable baselines
                  invalidate projections.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div style={sectionTitleStyle}>Roadmap</div>
      <div style={dividerStyle} />

      <div style={gridStyle}>
        {roadmap.map((t) => {
          const badgeStyle: CSSProperties = {
            ...badgeBaseStyle,
            borderColor: "#333",
            opacity: 0.75,
          };

          return (
            <div key={t.title} style={cardStyle}>
              <div style={titleRowStyle}>
                <span style={{ fontWeight: 700 }}>{t.title}</span>
                <span style={badgeStyle}>COMING SOON</span>
              </div>

              <p style={descStyle}>{t.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
