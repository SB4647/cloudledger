"use client";

import { CSSProperties, useMemo, useState } from "react";

type FieldKey = "compute" | "storage" | "logs" | "bandwidth" | "other";

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

  const formatCurrency = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD" });

  const fields: Array<{
    key: FieldKey;
    label: string;
    value: number;
    set: (v: number) => void;
    help: string;
  }> = [
    {
      key: "compute",
      label: "Compute",
      value: compute,
      set: setCompute,
      help: "VMs, app service plans, containers, AKS nodes.",
    },
    {
      key: "storage",
      label: "Storage",
      value: storage,
      set: setStorage,
      help: "Blob, disks, snapshots, backups.",
    },
    {
      key: "logs",
      label: "Logs & Telemetry",
      value: logs,
      set: setLogs,
      help: "Log Analytics, App Insights ingestion/retention.",
    },
    {
      key: "bandwidth",
      label: "Bandwidth",
      value: bandwidth,
      set: setBandwidth,
      help: "Egress, cross-region traffic, CDN.",
    },
    {
      key: "other",
      label: "Other",
      value: other,
      set: setOther,
      help: "Anything not covered above.",
    },
  ];

  const breakdown = useMemo(() => {
    const rows = [
      { key: "compute" as const, label: "Compute", value: compute },
      { key: "storage" as const, label: "Storage", value: storage },
      { key: "logs" as const, label: "Logs & Telemetry", value: logs },
      { key: "bandwidth" as const, label: "Bandwidth", value: bandwidth },
      { key: "other" as const, label: "Other", value: other },
    ].sort((a, b) => b.value - a.value);

    const top = rows[0];
    const second = rows[1];
    const third = rows[2];

    return { rows, top, second, third };
  }, [compute, storage, logs, bandwidth, other]);

  const totalSafe = total <= 0 ? 1 : total;
  const topPct = Math.round((breakdown.top.value / totalSafe) * 100);

  const insightText =
    total <= 0
      ? "Add a few numbers on the left and I’ll highlight the biggest cost driver and what to fix first."
      : `Your biggest cost driver is ${breakdown.top.label} (~${topPct}% of total). Start by optimizing that category first, then review ${breakdown.second.label} and ${breakdown.third.label}.`;

  const pageStyle: CSSProperties = {
    padding: "4rem 0",
    lineHeight: 1.7,
  };

  const headerStyle: CSSProperties = {
    maxWidth: "72ch",
    marginBottom: "2rem",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "1.25rem",
    gridTemplateColumns: "1fr",
    alignItems: "start",
  };

  // Basic responsive tweak without Tailwind: use a media query via inline is not possible,
  // so we use a simple maxWidth container and let cards stack. If your layout container is wide
  // enough, this still reads well. If you want true two-column, convert this to CSS classes.
  const twoColHintStyle: CSSProperties = {
    display: "grid",
    gap: "1.25rem",
    gridTemplateColumns: "minmax(320px, 420px) 1fr",
    alignItems: "start",
  };

  const useTwoCol = true; // keep on; if it looks cramped, set to false.

  const cardStyle: CSSProperties = {
    padding: "1.25rem",
    border: "1px solid #222",
    borderRadius: 12,
    background: "rgba(255,255,255,0.02)",
  };

  const sectionTitleStyle: CSSProperties = {
    marginTop: 0,
    marginBottom: "0.75rem",
    fontSize: "1.05rem",
  };

  const inputWrapStyle: CSSProperties = {
    display: "grid",
    gap: "0.9rem",
  };

  const labelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  };

  const labelRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const helpStyle: CSSProperties = {
    fontSize: "0.9rem",
    opacity: 0.75,
    marginTop: "0.15rem",
  };

  const inputStyle: CSSProperties = {
    padding: "0.6rem 0.75rem",
    borderRadius: 10,
    border: "1px solid #333",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
  };

  const strongValueStyle: CSSProperties = {
    fontSize: "1.6rem",
    fontWeight: 800,
    letterSpacing: "0.2px",
    margin: 0,
  };

  const mutedStyle: CSSProperties = {
    opacity: 0.85,
    marginTop: "0.25rem",
  };

  const hrStyle: CSSProperties = {
    margin: "1rem 0",
    border: 0,
    borderTop: "1px solid #222",
  };

  const pillRowStyle: CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginTop: "0.75rem",
  };

  const pillStyle: CSSProperties = {
    border: "1px solid #222",
    borderRadius: 999,
    padding: "0.25rem 0.6rem",
    fontSize: "0.9rem",
    opacity: 0.9,
    background: "rgba(255,255,255,0.02)",
  };

  const sliderStyle: CSSProperties = {
    width: "100%",
    marginTop: "0.25rem",
  };

  const sliderMetaStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    opacity: 0.75,
    fontSize: "0.9rem",
    marginTop: "0.2rem",
  };

  const buttonRowStyle: CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.6rem 0.85rem",
    borderRadius: 10,
    border: "1px solid #222",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };

  const buttonPrimaryStyle: CSSProperties = {
    ...buttonStyle,
    background: "#fff",
    color: "#000",
    borderColor: "#fff",
  };

  const shareBoxStyle: CSSProperties = {
    marginTop: "0.75rem",
    padding: "0.9rem",
    borderRadius: 12,
    border: "1px solid #222",
    background: "rgba(0,0,0,0.35)",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.9rem",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
  };

  const shareText = `CloudLedger — Cloud Cost Estimator
Total: ${formatCurrency(total)}
10% buffer: ${formatCurrency(buffer10)}
20% buffer: ${formatCurrency(buffer20)}

Waste reduction: ${reduction}%
Projected new total: ${formatCurrency(reducedTotal)}
Monthly savings: ${formatCurrency(monthlySavings)}
Yearly savings: ${formatCurrency(yearlySavings)}

Biggest driver: ${breakdown.top.label}`;

  const [copied, setCopied] = useState(false);

  const reset = () => {
    setCompute(0);
    setStorage(0);
    setLogs(0);
    setBandwidth(0);
    setOther(0);
    setReduction(15);
    setCopied(false);
  };

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // If clipboard fails (some browsers), do nothing.
      setCopied(false);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ marginBottom: "0.5rem" }}>Cloud Cost Estimator</h1>
        <p style={{ marginTop: 0, opacity: 0.9, maxWidth: "70ch" }}>
          Rough monthly estimate. Enter your current or expected spend by
          category. You’ll get a baseline, buffers, a savings scenario, and a
          quick “what to fix first” hint.
        </p>
      </div>

      <div style={useTwoCol ? twoColHintStyle : gridStyle}>
        {/* LEFT: Inputs */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Inputs</h2>

          <div style={inputWrapStyle}>
            {fields.map((f) => (
              <label key={f.key} style={labelStyle}>
                <div style={labelRowStyle}>
                  <span style={{ fontWeight: 700 }}>{f.label}</span>
                  <span style={{ opacity: 0.75 }}>$ / month</span>
                </div>

                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={f.value}
                  onChange={(e) => f.set(Number(e.target.value) || 0)}
                  style={inputStyle}
                />

                <span style={helpStyle}>{f.help}</span>
              </label>
            ))}
          </div>

          <div style={buttonRowStyle}>
            <button style={buttonPrimaryStyle} onClick={copyShare}>
              {copied ? "Copied!" : "Copy summary"}
            </button>
            <button style={buttonStyle} onClick={reset}>
              Reset
            </button>
          </div>
        </section>

        {/* RIGHT: Outputs */}
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {/* Estimate */}
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Estimate</h2>
            <p style={strongValueStyle}>{formatCurrency(total)}</p>
            <p style={mutedStyle}>
              This is your estimated baseline monthly spend across categories.
            </p>

            <div style={pillRowStyle}>
              <span style={pillStyle}>
                10% buffer: {formatCurrency(buffer10)}
              </span>
              <span style={pillStyle}>
                20% buffer: {formatCurrency(buffer20)}
              </span>
            </div>

            <hr style={hrStyle} />

            <div style={{ display: "grid", gap: "0.35rem" }}>
              {breakdown.rows.map((r) => (
                <div
                  key={r.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    opacity: r.value > 0 ? 0.95 : 0.65,
                  }}
                >
                  <span>{r.label}</span>
                  <span style={{ fontWeight: 700 }}>
                    {formatCurrency(r.value)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Insights */}
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Insights</h2>
            <p style={{ margin: 0, opacity: 0.9, maxWidth: "75ch" }}>
              {insightText}
            </p>

            {total > 0 && (
              <>
                <hr style={hrStyle} />
                <p style={{ margin: 0, opacity: 0.85 }}>
                  Quick rule: optimize the top category first because it has the
                  highest ROI and usually reveals other waste (oversized SKUs,
                  always-on environments, noisy logs, egress surprises).
                </p>
              </>
            )}
          </section>

          {/* Savings scenario */}
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Savings scenario</h2>

            <div style={{ marginTop: "0.75rem", maxWidth: "560px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.85 }}>Estimated waste reduction</span>
                <strong>{reduction}%</strong>
              </div>

              <input
                type="range"
                min={0}
                max={40}
                value={reduction}
                onChange={(e) => setReduction(Number(e.target.value))}
                style={sliderStyle}
              />
              <div style={sliderMetaStyle}>
                <span>0%</span>
                <span>40%</span>
              </div>
            </div>

            <hr style={hrStyle} />

            <div style={{ display: "grid", gap: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.85 }}>Projected new total</span>
                <strong>{formatCurrency(reducedTotal)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.85 }}>Monthly savings</span>
                <strong>{formatCurrency(monthlySavings)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.85 }}>Yearly savings</span>
                <strong>{formatCurrency(yearlySavings)}</strong>
              </div>
            </div>

            <div style={shareBoxStyle}>{shareText}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
