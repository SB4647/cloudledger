export default function Cases() {
  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1>Case Studies</h1>

      <p style={{ opacity: 0.9, maxWidth: "70ch" }}>
        Real-world examples of cloud cost reduction, forecasting, and
        infrastructure cleanup. These document what actually worked — not
        theory.
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.25rem",
          border: "1px solid #222",
          borderRadius: 12,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <strong>Coming first:</strong>
        <ul style={{ marginTop: "0.75rem" }}>
          <li>How a small team cut cloud spend by ~30% in 60 days</li>
          <li>Stopping runaway log ingestion without losing visibility</li>
          <li>Turning unpredictable cloud bills into stable forecasts</li>
        </ul>

        <p style={{ marginTop: "1rem", opacity: 0.8 }}>
          These will be published as real examples as CloudLedger evolves.
        </p>
      </div>
    </main>
  );
}
