import Link from "next/link";

type CheckoutSuccessProps = {
  searchParams: { session_id?: string };
};

export default function CheckoutSuccess({ searchParams }: CheckoutSuccessProps) {
  const sessionId = searchParams?.session_id;

  return (
    <main style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        You are all set.
      </h1>
      <p style={{ maxWidth: 560, opacity: 0.85, lineHeight: 1.6 }}>
        Thanks for upgrading. You will receive a receipt by email shortly. If you
        need help, just reply to the receipt or contact support.
      </p>
      {sessionId ? (
        <p style={{ marginTop: "1.5rem", color: "#888" }}>
          Session: {sessionId}
        </p>
      ) : null}
      <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
        <Link
          href="/tools/cloud-cost-estimator"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Go to estimator
        </Link>
        <Link
          href="/account"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          View account
        </Link>
        <Link
          href="/pricing"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Back to pricing
        </Link>
      </div>
    </main>
  );
}
