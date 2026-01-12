"use client";

import { CSSProperties, useState } from "react";

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

  const inputStyle: CSSProperties = {
    padding: "0.5rem 0.6rem",
    borderRadius: 6,
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    fontSize: "1rem",
    width: "100%",
  };

  const cardStyle: CSSProperties = {
    padding: "1.5rem",
    border: "1px solid #333",
    borderRadius: 10,
    background: "#0d0d0d",
    marginTop: "2rem",
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

  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1>Cloud Cost Estimator</h1>
      <p style={{ opacity: 0.9 }}>
        Rough monthly estimate. Enter your current or expected spend by
        category.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "420px",
          marginTop: "2rem",
        }}
      >
        {fields.map((f) => (
          <label
            key={f.label}
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            {f.label} ($)
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

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Estimate</h2>
        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>
        <p>
          <strong>With 10% buffer:</strong> ${buffer10.toFixed(2)}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>With 20% buffer:</strong> ${buffer20.toFixed(2)}
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Savings Scenario</h2>

        <div style={{ marginTop: "1rem", maxWidth: "520px" }}>
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
            }}
          >
            <span>0%</span>
            <span>40%</span>
          </div>
        </div>

        <hr style={{ margin: "1rem 0", borderColor: "#333" }} />

        <p>
          <strong>Projected new total:</strong> ${reducedTotal.toFixed(2)}
        </p>
        <p>
          <strong>Monthly savings:</strong> ${monthlySavings.toFixed(2)}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Yearly savings:</strong> ${yearlySavings.toFixed(2)}
        </p>
      </div>
    </main>
  );
}
