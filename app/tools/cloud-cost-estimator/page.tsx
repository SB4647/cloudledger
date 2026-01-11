export default function CloudCostEstimator() {
  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1>Cloud Cost Estimator</h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
        A simple calculator for forecasting monthly cloud spend. Start with a
        rough baseline — accuracy improves as you add real usage drivers.
      </p>

      <div
        style={{
          margin: "2rem 0",
          padding: "1rem 1.25rem",
          border: "1px solid #333",
          borderRadius: 8,
        }}
      >
        <strong>Coming next:</strong>
        <ul style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <li>Compute (VM / App Service / AKS) baseline inputs</li>
          <li>Storage growth + backup retention</li>
          <li>Log ingestion + retention (the silent killer)</li>
          <li>Exportable monthly estimate</li>
        </ul>
      </div>

      <p>
        For now, this tool is a placeholder while we wire up the first working
        version.
      </p>
    </main>
  );
}
