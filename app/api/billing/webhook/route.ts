import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPlanByPriceId } from "@/lib/billing/plans";
import { getStripe } from "@/lib/billing/stripe";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET env var." },
      { status: 500 },
    );
  }

  const signature = headers().get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const upsertSubscription = async (subscription: Stripe.Subscription) => {
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer?.id;

    if (!customerId) {
      console.warn("Stripe subscription missing customer id.");
      return;
    }

    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!user) {
      console.warn(`No user found for Stripe customer ${customerId}.`);
      return;
    }

    const priceId = subscription.items.data[0]?.price?.id;
    const plan = priceId ? getPlanByPriceId(priceId) : undefined;
    const currentPeriodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null;

    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId ?? null,
        planId: plan?.id,
        status: subscription.status,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
      },
      update: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId ?? null,
        planId: plan?.id,
        status: subscription.status,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
      },
    });
  };

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        if (session.client_reference_id && customerId) {
          await prisma.user.updateMany({
            where: { id: session.client_reference_id },
            data: { stripeCustomerId: customerId },
          });
        }

        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await upsertSubscription(subscription);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(subscription);
        break;
      }
      case "invoice.payment_succeeded":
        console.log(`Stripe invoice paid: ${event.id}`);
        break;
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }
  } catch (error) {
    console.error("Stripe webhook handler error", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
