"use client";

import { CSSProperties, useMemo, useState } from "react";

export default function CloudCostEstimator() {
  const [compute, setCompute] = useState(0);
  const [storage, setStorage] = useState(0);
  const [logs, setLogs] = useState(0);
  const [bandwidth, setBandwidth] = useState(0);
  const [other, setOther] = useState(0);

  // Scenario
  const [reduction, setReduction] = useState(15);

  const total = compute + storage + logs + bandwidth + other;
  const buffer10 = total * 1.1;
  const buffer20 = total * 1.2;

  const reducedTotal = total * (1 - reduction / 100);
  const monthlySavings = total - reducedTotal;
  const yearlySavings = monthlySavings * 12;

  const pageStyle: CSSProperties = {
    padding: "4rem",
    maxWidth: "1100px",
    margin: "0 auto",
    lineHeight: 1.7,
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "1fr",
    marginTop: "2rem",
  };

  const leftColStyle: CSSProperties = {
    display: "grid",
    gap: "1.25rem",
    alignContent: "start",
  };

  const rightColStyle: CSSProperties = {
    display: "grid",
    gap: "1.25rem",
    alignContent: "start",
  };

  const cardStyle: CSSProperties = {
    padding: "1.5rem",
    border: "1px solid #333",
    borderRadius: 12,
    background: "#0d0d0d",
  };

  const cardTitleStyle: CSSProperties = {
    marginTop: 0,
    marginBottom: "0.75rem",
    fontSize: "1.15rem",
  };

  const inputStyle: CSSProperties = {
    padding: "0.6rem 0.7rem",
    borderRadius: 8,
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
  };

  const fields: Array<{
    label: string;
    value: number;
    set: (v: number) => void;
  }> = [
    { label: "Compute", value: compute, set: setCompute },
    { label: "Storage", value: storage, set: setStorage },
    { label: "Logs & Telemetry", value: logs, set: setLogs },
    { label: "Bandwidth", value: bandwidth, set: setBandwidth },
    { label: "Other", value: other, set: setOther },
  ];

  const breakdown = useMemo(
    () => [
      { name: "Compute", value: compute },
      { name: "Storage", value: storage },
      { name: "Logs & Telemetry", value: logs },
      { name: "Bandwidth", value: bandwidth },
      { name: "Other", value: other },
    ],
    [compute, storage, logs, bandwidth, other]
  );

  const top = useMemo(() => {
    const sorted = [...breakdown].sort((a, b) => b.value - a.value);
    return sorted[0];
  }, [breakdown]);

  const topHint = useMemo(() => {
    switch (top.name) {
      case "Compute":
        return "Start here: find idle VMs/AKS nodes, oversized App Service plans, and anything non-prod that can auto-shutdown off-hours.";
      case "Storage":
        return "Start here: snapshot/backup sprawl + default premium tiers. Add lifecycle rules and review retention.";
      case "Logs & Telemetry":
        return "Start here: noisy logs + long retention. Tune sampling, reduce chatty apps, and cap retention (especially non-prod).";
      case "Bandwidth":
        return "Start here: egress + cross-region traffic. Small routing/region choices can multiply spend.";
      default:
        return "Start here: orphaned resources (disks/public IPs), old environments, and anything without an owner/tag.";
    }
  }, [top.name]);

  return (
    <main style={pageStyle}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>Cloud Cost Estimator</h1>
        <p style={{ opacity: 0.9, marginTop: 0, maxWidth: "72ch" }}>
          Rough monthly estimate. Enter your current or expected spend by
          category. You’ll get a baseline, buffers, and a quick “fix-first”
          recommendation.
        </p>
      </header>

      {/* Responsive desktop grid without Tailwind */}
      <div
        style={{
          ...gridStyle,
        }}
      >
        {/* Desktop media query via inline style trick (supported by Next/React) */}
        <style>
          {`
            @media (min-width: 900px) {
              .cc-grid { grid-template-columns: 1fr 1fr; }
            }
          `}
        </style>

        <div className="cc-grid" style={gridStyle}>
          {/* LEFT: Inputs + Estimate */}
          <div style={leftColStyle}>
            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>Inputs</h2>

              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  maxWidth: "520px",
                }}
              >
                {fields.map((f) => (
                  <label
                    key={f.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{f.label} ($)</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      value={f.value}
                      onChange={(e) => f.set(Number(e.target.value) || 0)}
                      style={inputStyle}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>Estimate</h2>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Total:</strong> ${total.toFixed(2)}
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>With 10% buffer:</strong> ${buffer10.toFixed(2)}
              </p>
              <p style={{ margin: "0.25rem 0 0 0" }}>
                <strong>With 20% buffer:</strong> ${buffer20.toFixed(2)}
              </p>
            </div>
          </div>

          {/* RIGHT: Insights + Scenario */}
          <div style={rightColStyle}>
            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>Insights</h2>

              {total <= 0 ? (
                <p style={{ opacity: 0.9, marginBottom: 0 }}>
                  Add a few numbers and I’ll flag the biggest driver + what to
                  fix first.
                </p>
              ) : (
                <>
                  <p style={{ marginTop: 0, marginBottom: "0.75rem" }}>
                    Your biggest cost driver is <strong>{top.name}</strong>.
                  </p>

                  <p style={{ opacity: 0.9, marginTop: 0 }}>{topHint}</p>

                  <p style={{ marginTop: "1rem", marginBottom: 0 }}>
                    Next: read{" "}
                    <a
                      href="/guides/reduce-azure-costs"
                      style={{ fontWeight: 700, textDecoration: "underline" }}
                    >
                      How to Reduce Azure Costs for Small Teams
                    </a>{" "}
                    and apply the top 2 fixes for your highest category.
                  </p>
                </>
              )}
            </div>

            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>Savings Scenario</h2>

              <div style={{ marginTop: "0.75rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Estimated waste reduction: <strong>{reduction}%</strong>
                </label>

                <input
                  type="range"
                  min={0}
                  max={40}
                  value={reduction}
                  onChange={(e) => setReduction(Number(e.target.value))}
                  style={{ width: "100%" }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    opacity: 0.8,
                    marginTop: "0.35rem",
                  }}
                >
                  <span>0%</span>
                  <span>40%</span>
                </div>
              </div>

              <hr style={{ margin: "1rem 0", borderColor: "#333" }} />

              <p style={{ margin: "0.25rem 0" }}>
                <strong>Projected new total:</strong> ${reducedTotal.toFixed(2)}
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Monthly savings:</strong> ${monthlySavings.toFixed(2)}
              </p>
              <p style={{ margin: "0.25rem 0 0 0" }}>
                <strong>Yearly savings:</strong> ${yearlySavings.toFixed(2)}
              </p>

              <p style={{ marginTop: "1rem", opacity: 0.85 }}>
                Rule of thumb: 10–30% reduction is achievable in 30–90 days once
                you add ownership + guardrails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
