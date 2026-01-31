import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/auth";
import { getPlan } from "@/lib/billing/plans";
import { getStripe } from "@/lib/billing/stripe";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

type CheckoutPayload = { planId?: string };

export async function POST(request: Request) {
  const authSession = (await getServerSession(authOptions)) as Session | null;

  if (!authSession?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: CheckoutPayload;
  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload.planId) {
    return NextResponse.json({ error: "Missing planId." }, { status: 400 });
  }

  const plan = getPlan(payload.planId);
  if (!plan)
    return NextResponse.json({ error: "Unknown plan." }, { status: 404 });
  if (!plan.priceId) {
    return NextResponse.json(
      { error: "Missing Stripe price id for this plan." },
      { status: 500 },
    );
  }

  const siteUrl =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const stripe = getStripe();

  const user = await prisma.user.findUnique({
    where: { id: authSession.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  // Avoid double-customer race
  const customerId = await prisma.$transaction(async (tx: typeof prisma) => {
    const fresh = await tx.user.findUnique({ where: { id: user.id } });
    if (fresh?.stripeCustomerId) return fresh.stripeCustomerId;

    const customer = await stripe.customers.create({
      email: user.email || undefined,
      name: user.name || undefined,
      metadata: { userId: user.id },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: plan.priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    customer: customerId,
    client_reference_id: user.id,
    metadata: { planId: plan.id },
    subscription_data: {
      metadata: { planId: plan.id, userId: user.id },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      { error: "Failed to create a checkout session." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: checkoutSession.url });
}
