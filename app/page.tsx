export default function Home() {
  return (
    <main style={{ padding: "4rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Stop burning money on cloud infrastructure.
      </h1>

      <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 }}>
        Practical systems for developers, founders, and small teams to reduce
        AWS & Azure costs — without slowing delivery.
      </p>

      <ul style={{ lineHeight: "1.8", marginBottom: "2.5rem" }}>
        <li>Find where your cloud bill is leaking</li>
        <li>Enforce budgets automatically</li>
        <li>Forecast costs with confidence</li>
      </ul>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
        <a
          href="/guides/reduce-azure-costs"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Start here
        </a>

        <a
          href="/tools/cloud-cost-estimator"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Try the estimator
        </a>
      </div>

      <div
        style={{
          borderTop: "1px solid #222",
          paddingTop: "1.5rem",
          opacity: 0.85,
        }}
      >
        <p>
          Built for teams who want control of their infrastructure spend without
          sacrificing delivery speed or engineering autonomy.
        </p>
      </div>
    </main>
  );
}
