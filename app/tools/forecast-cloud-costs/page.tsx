"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Scenario = "Best" | "Expected" | "Worst";

function clamp0(n: number) {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export default function ForecastCloudCostsTool() {
  const [baseline, setBaseline] = useState(2500);
  const [requestsPerMonth, setRequestsPerMonth] = useState(5_000_000);
  const [costPerMillionRequests, setCostPerMillionRequests] = useState(3.5);

  const [dataGbStored, setDataGbStored] = useState(500);
  const [costPerGbStored, setCostPerGbStored] = useState(0.12);

  const [logsGbIngested, setLogsGbIngested] = useState(200);
  const [costPerGbLogs, setCostPerGbLogs] = useState(0.6);

  const [growthPct, setGrowthPct] = useState(15); // monthly growth
  const [months, setMonths] = useState(6);

  const scenarioMultipliers: Record<Scenario, number> = {
    Best: 0.9,
    Expected: 1.0,
    Worst: 1.25,
  };

  const model = useMemo(() => {
    const base = clamp0(baseline);

    const req =
      (clamp0(requestsPerMonth) / 1_000_000) * clamp0(costPerMillionRequests);
    const storage = clamp0(dataGbStored) * clamp0(costPerGbStored);
    const logs = clamp0(logsGbIngested) * clamp0(costPerGbLogs);

    const driverNow = req + storage + logs;

    const g = clamp0(growthPct) / 100;
    const m = Math.max(1, Math.min(36, Math.floor(months)));

    const rows = Array.from({ length: m }, (_, i) => {
      const month = i + 1;
      const growthFactor = Math.pow(1 + g, i);

      const byScenario = (scenario: Scenario) => {
        const driver = driverNow * growthFactor * scenarioMultipliers[scenario];
        const total = base + driver;
        return { driver, total };
      };

      return {
        month,
        Best: byScenario("Best"),
        Expected: byScenario("Expected"),
        Worst: byScenario("Worst"),
      };
    });

    return { req, storage, logs, driverNow, rows };
  }, [
    baseline,
    requestsPerMonth,
    costPerMillionRequests,
    dataGbStored,
    costPerGbStored,
    logsGbIngested,
    costPerGbLogs,
    growthPct,
    months,
    scenarioMultipliers,
  ]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.55rem 0.7rem",
    borderRadius: 10,
    border: "1px solid #222",
    background: "#0b0b0b",
    color: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    opacity: 0.8,
    marginBottom: "0.35rem",
  };
  const cardStyle: React.CSSProperties = {
    border: "1px solid #222",
    borderRadius: 12,
    background: "rgba(255,255,255,0.02)",
    padding: "1.25rem",
  };

  const fmt = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <main
      style={{
        padding: "4rem",
        maxWidth: 1000,
        margin: "0 auto",
        lineHeight: 1.7,
      }}
    >
      <h1 style={{ marginBottom: "0.75rem" }}>Forecast Cloud Costs</h1>
      <p style={{ opacity: 0.85, maxWidth: "75ch", marginTop: 0 }}>
        A simple forecasting model:{" "}
        <strong>baseline + growth drivers + scenarios</strong>. Start rough,
        then tighten the inputs as you learn what actually moves your bill.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginTop: "2rem",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Baseline</h2>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>Baseline monthly cost</div>
            <input
              style={inputStyle}
              type="number"
              value={baseline}
              onChange={(e) => setBaseline(Number(e.target.value))}
            />
            <div
              style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.5rem" }}
            >
              “Keep the lights on” spend: core compute, DB, networking,
              monitoring you won’t turn off.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Growth</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.9rem",
              marginTop: "0.9rem",
            }}
          >
            <div>
              <div style={labelStyle}>Monthly growth %</div>
              <input
                style={inputStyle}
                type="number"
                value={growthPct}
                onChange={(e) => setGrowthPct(Number(e.target.value))}
              />
            </div>
            <div>
              <div style={labelStyle}>Months</div>
              <input
                style={inputStyle}
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>
          </div>
          <div
            style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.6rem" }}
          >
            This applies to the drivers below. Baseline stays boring (as it
            should).
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1.25rem",
          marginTop: "1.25rem",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Requests</h2>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>Requests / month</div>
            <input
              style={inputStyle}
              type="number"
              value={requestsPerMonth}
              onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>$ per 1M requests</div>
            <input
              style={inputStyle}
              type="number"
              value={costPerMillionRequests}
              step="0.1"
              onChange={(e) =>
                setCostPerMillionRequests(Number(e.target.value))
              }
            />
          </div>
          <div style={{ marginTop: "0.75rem", opacity: 0.8 }}>
            Now: <strong>{fmt(model.req)}</strong>/mo
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Storage</h2>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>GB stored</div>
            <input
              style={inputStyle}
              type="number"
              value={dataGbStored}
              onChange={(e) => setDataGbStored(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>$ per GB-month</div>
            <input
              style={inputStyle}
              type="number"
              value={costPerGbStored}
              step="0.01"
              onChange={(e) => setCostPerGbStored(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "0.75rem", opacity: 0.8 }}>
            Now: <strong>{fmt(model.storage)}</strong>/mo
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Logs</h2>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>GB ingested / month</div>
            <input
              style={inputStyle}
              type="number"
              value={logsGbIngested}
              onChange={(e) => setLogsGbIngested(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "0.9rem" }}>
            <div style={labelStyle}>$ per GB ingested</div>
            <input
              style={inputStyle}
              type="number"
              value={costPerGbLogs}
              step="0.05"
              onChange={(e) => setCostPerGbLogs(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "0.75rem", opacity: 0.8 }}>
            Now: <strong>{fmt(model.logs)}</strong>/mo
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          borderTop: "1px solid #222",
          paddingTop: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Scenario forecast</h2>

        <div style={{ overflowX: "auto", marginTop: "0.75rem" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}
          >
            <thead style={{ opacity: 0.8 }}>
              <tr>
                <th style={{ textAlign: "left", padding: "0.6rem 0.4rem" }}>
                  Month
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.4rem" }}>
                  Best
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.4rem" }}>
                  Expected
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.4rem" }}>
                  Worst
                </th>
              </tr>
            </thead>
            <tbody>
              {model.rows.map((r) => (
                <tr key={r.month} style={{ borderTop: "1px solid #222" }}>
                  <td style={{ padding: "0.6rem 0.4rem", opacity: 0.85 }}>
                    {r.month}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem" }}>
                    {fmt(r.Best.total)}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem" }}>
                    {fmt(r.Expected.total)}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem" }}>
                    {fmt(r.Worst.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1rem", opacity: 0.8 }}>
          This is intentionally simple. The point is to identify the 3–5 drivers
          that can move the bill, then add guardrails so worst-case stays
          survivable.
        </p>

        <p style={{ marginTop: "0.25rem", opacity: 0.8 }}>
          Related:{" "}
          <Link
            href="/guides/forecast-cloud-costs"
            style={{
              fontWeight: 600,
              textDecoration: "underline",
              color: "inherit",
            }}
          >
            Read the forecasting guide
          </Link>
        </p>
      </div>
    </main>
  );
}
