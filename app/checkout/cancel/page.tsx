import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <main style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Checkout canceled.
      </h1>
      <p style={{ maxWidth: 560, opacity: 0.85, lineHeight: 1.6 }}>
        No worries. Your card was not charged. If you want to try again or have
        questions about plans, head back to pricing.
      </p>
      <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
        <Link
          href="/pricing"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Return to pricing
        </Link>
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Home
        </Link>
      </div>
    </main>
  );
}
