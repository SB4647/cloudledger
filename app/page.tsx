import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{ padding: "4rem", fontFamily: "system-ui", maxWidth: "960px" }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Stop burning money on cloud infrastructure.
      </h1>

      <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 }}>
        Practical systems for developers, founders, and small teams to reduce
        AWS & Azure costs — without slowing delivery.
      </p>

      <ul style={{ lineHeight: "1.8", marginBottom: "3rem" }}>
        <li>Find where your cloud bill is leaking</li>
        <li>Enforce budgets automatically</li>
        <li>Forecast costs with confidence</li>
      </ul>

      <div
        style={{
          margin: "2rem 0",
          padding: "1.25rem 1.5rem",
          border: "1px solid #333",
          borderRadius: 10,
          background: "#0d0d0d",
        }}
      >
        <strong>Start here:</strong>
        <p style={{ margin: "0.5rem 0 0 0" }}>
          Read{" "}
          <a href="/guides/reduce-azure-costs" style={{ fontWeight: 600 }}>
            How to Reduce Azure Costs for Small Teams
          </a>{" "}
          or jump straight into the{" "}
          <a href="/tools/cloud-cost-estimator" style={{ fontWeight: 600 }}>
            Cloud Cost Estimator
          </a>
          .
        </p>
      </div>

      <nav style={{ display: "flex", gap: "2rem", fontSize: "1.1rem" }}>
        <a href="/guides">Guides</a>
        <a href="/tools">Tools</a>
        <a href="/cases">Case Studies</a>
        <a href="/resources">Resources</a>
      </nav>
    </main>
  );
}
