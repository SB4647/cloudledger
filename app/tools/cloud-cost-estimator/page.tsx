"use client";

import { useState } from "react";

export default function CloudCostEstimator() {
  const [compute, setCompute] = useState(0);
  const [storage, setStorage] = useState(0);
  const [logs, setLogs] = useState(0);
  const [bandwidth, setBandwidth] = useState(0);
  const [other, setOther] = useState(0);

  const total = compute + storage + logs + bandwidth + other;
  const buffer10 = total * 1.1;
  const buffer20 = total * 1.2;

  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1>Cloud Cost Estimator</h1>
      <p>
        Rough monthly estimate. Enter your current or expected spend by
        category.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "400px",
          marginTop: "2rem",
        }}
      >
        <label>
          Compute ($)
          <input
            type="number"
            value={compute}
            onChange={(e) => setCompute(+e.target.value)}
          />
        </label>

        <label>
          Storage ($)
          <input
            type="number"
            value={storage}
            onChange={(e) => setStorage(+e.target.value)}
          />
        </label>

        <label>
          Logs & Telemetry ($)
          <input
            type="number"
            value={logs}
            onChange={(e) => setLogs(+e.target.value)}
          />
        </label>

        <label>
          Bandwidth ($)
          <input
            type="number"
            value={bandwidth}
            onChange={(e) => setBandwidth(+e.target.value)}
          />
        </label>

        <label>
          Other ($)
          <input
            type="number"
            value={other}
            onChange={(e) => setOther(+e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Estimate</h2>
        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>
        <p>
          <strong>With 10% buffer:</strong> ${buffer10.toFixed(2)}
        </p>
        <p>
          <strong>With 20% buffer:</strong> ${buffer20.toFixed(2)}
        </p>
      </div>
    </main>
  );
}
