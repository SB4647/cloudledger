import { CSSProperties } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { getPlan, getPlanByPriceId } from "@/lib/billing/plans";
import { prisma } from "@/lib/db/prisma";
import ManageBillingButton from "./ManageBillingButton";

const cardStyle: CSSProperties = {
  border: "1px solid #222",
  borderRadius: 16,
  padding: "2rem",
  background: "#0b0b0b",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main style={{ padding: "4rem 0" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Account</h1>
        <p style={{ maxWidth: 560, opacity: 0.85, lineHeight: 1.6 }}>
          Sign in to manage your subscription and billing details.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link
            href="/api/auth/signin"
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: 8,
              background: "#fff",
              color: "#000",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const plan = subscription?.planId
    ? getPlan(subscription.planId)
    : subscription?.stripePriceId
      ? getPlanByPriceId(subscription.stripePriceId)
      : undefined;

  const status = subscription?.status ?? "inactive";
  const periodEnd = subscription?.currentPeriodEnd
    ? subscription.currentPeriodEnd.toLocaleDateString("en-US")
    : null;
  const hasCustomer =
    Boolean(subscription?.stripeCustomerId) ||
    Boolean(session.user.stripeCustomerId);

  return (
    <main style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Account</h1>
      <p style={{ maxWidth: 640, opacity: 0.85, lineHeight: 1.6 }}>
        Manage your subscription, billing, and plan details.
      </p>

      <section style={{ ...cardStyle, marginTop: "2rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>Subscription</h2>
        <div style={{ display: "grid", gap: "0.5rem", maxWidth: 520 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.8 }}>Plan</span>
            <strong>{plan?.name ?? "Free"}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.8 }}>Status</span>
            <strong style={{ textTransform: "capitalize" }}>{status}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.8 }}>Renews</span>
            <strong>{periodEnd ?? "-"}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.8 }}>Email</span>
            <strong>{session.user.email ?? "-"}</strong>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <ManageBillingButton disabled={!hasCustomer} />
        </div>

        {!subscription && (
          <p style={{ marginTop: "1rem", opacity: 0.8 }}>
            No active subscription yet. Visit{" "}
            <Link href="/pricing" style={{ color: "#fff" }}>
              pricing
            </Link>{" "}
            to get started.
          </p>
        )}
      </section>

      <section style={{ ...cardStyle, marginTop: "1.5rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Need help?</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Reply to any invoice email or reach out at hello@cloudledger.dev.
        </p>
      </section>
    </main>
  );
}
