import { CSSProperties } from "react";
import CheckoutButton from "./CheckoutButton";
import { plans } from "@/lib/billing/plans";

const cardBaseStyle: CSSProperties = {
  border: "1px solid #222",
  borderRadius: 16,
  padding: "2rem",
  background: "#0b0b0b",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const highlightStyle: CSSProperties = {
  borderColor: "#fff",
  boxShadow: "0 0 0 1px #fff",
  background: "#111",
};

export default function PricingPage() {
  return (
    <main style={{ padding: "3rem 0 4rem" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.75rem", color: "#888" }}>
          Pricing
        </p>
        <h1 style={{ fontSize: "2.75rem", marginBottom: "0.75rem" }}>
          Calm, predictable pricing for cloud cost control.
        </h1>
        <p style={{ maxWidth: 640, opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.6 }}>
          Start small, upgrade when you need deeper forecasting and exports. All plans are billed monthly.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...cardBaseStyle,
              ...(plan.highlight ? highlightStyle : {}),
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "0.35rem" }}>{plan.name}</h2>
              <p style={{ opacity: 0.8, marginBottom: "0.75rem" }}>{plan.description}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 700 }}>${plan.priceMonthly}</span>
                <span style={{ color: "#aaa" }}>/ month</span>
              </div>
            </div>

            <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7 }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <CheckoutButton planId={plan.id} label={plan.cta} />
          </div>
        ))}
      </section>

      <footer style={{ marginTop: "2.5rem", opacity: 0.75 }}>
        <p>Need annual billing or team onboarding? Email hello@cloudledger.dev.</p>
      </footer>
    </main>
  );
}
