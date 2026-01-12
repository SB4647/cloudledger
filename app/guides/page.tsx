export default function Guides() {
  return (
    <main
      style={{
        padding: "4rem",
        maxWidth: "900px",
        lineHeight: 1.7,
      }}
    >
      <h1>Guides</h1>

      <p style={{ opacity: 0.9 }}>
        Deep, practical engineering guides for reducing cloud costs — written as
        systems, not blog posts.
      </p>

      {/* Start here */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Start here</h2>
        <div
          style={{
            height: "1px",
            background: "#222",
            margin: "0.75rem 0 1.25rem 0",
          }}
        />

        <p>
          If your cloud spend feels unpredictable or out of control, begin with
          this guide. It focuses on reclaiming waste, assigning ownership, and
          stabilizing your infrastructure before attempting forecasting or
          optimization.
        </p>

        <p style={{ marginTop: "1rem" }}>
          <a
            href="/guides/reduce-azure-costs"
            style={{ fontWeight: 600, textDecoration: "underline" }}
          >
            How to Reduce Azure Costs for Small Teams
          </a>
        </p>
      </section>

      {/* Then read */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Then read</h2>
        <div
          style={{
            height: "1px",
            background: "#222",
            margin: "0.75rem 0 1.25rem 0",
          }}
        />

        <p>
          Once your baseline spend is stable, this guide shows how to forecast
          cloud costs realistically by separating baseline costs from growth
          drivers and modeling real-world scenarios.
        </p>

        <p style={{ marginTop: "1rem" }}>
          <a
            href="/guides/forecast-cloud-costs"
            style={{ fontWeight: 600, textDecoration: "underline" }}
          >
            How to Forecast Cloud Costs (Without Lying to Yourself)
          </a>
        </p>
      </section>

      {/* Coming soon */}
      <section style={{ marginTop: "3rem", opacity: 0.75 }}>
        <h2>More guides coming</h2>
        <div
          style={{
            height: "1px",
            background: "#222",
            margin: "0.75rem 0 1.25rem 0",
          }}
        />

        <ul>
          <li>Common Azure cost traps</li>
          <li>FinOps models for startups</li>
          <li>Real-world cloud cost breakdowns</li>
        </ul>
      </section>
    </main>
  );
}
