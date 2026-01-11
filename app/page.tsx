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

      <nav style={{ display: "flex", gap: "2rem", fontSize: "1.1rem" }}>
        <a href="/guides">Guides</a>
        <a href="/tools">Tools</a>
        <a href="/cases">Case Studies</a>
        <a href="/resources">Resources</a>
      </nav>
    </main>
  );
}
