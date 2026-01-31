import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/auth";
import { getStripe } from "@/lib/billing/stripe";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function POST() {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No Stripe customer found for this user." },
      { status: 404 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const stripe = getStripe();

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${siteUrl}/account`,
  });

  return NextResponse.json({ url: portalSession.url });
}
