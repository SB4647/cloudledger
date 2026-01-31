export type PlanId = "starter" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceId?: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceId: process.env.STRIPE_PRICE_STARTER || undefined,
    description: "For solo builders and small teams getting costs under control.",
    features: [
      "Cloud cost estimator",
      "Save 5 forecasts",
      "Export CSV",
      "Email support",
    ],
    cta: "Start Starter",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    priceId: process.env.STRIPE_PRICE_PRO || undefined,
    description: "For teams that need ongoing forecasting and reporting.",
    features: [
      "Everything in Starter",
      "Unlimited forecasts",
      "Advanced scenarios",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
];

export function getPlan(planId: string): Plan | undefined {
  return plans.find((plan) => plan.id === planId);
}

export function getPlanByPriceId(priceId: string): Plan | undefined {
  return plans.find((plan) => plan.priceId === priceId);
}
