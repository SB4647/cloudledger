# CloudLedger

**CloudLedger** is a modern engineering platform for understanding, forecasting, and reducing cloud infrastructure costs.

It combines long-form technical thinking with lightweight, purpose-built tools for developers, founders, and small teams running on **AWS** and **Azure**.

The goal is deliberately simple:

> Make cloud costs predictable, transparent, and controllable — without slowing product development or engineering velocity.

CloudLedger is designed to feel calm, boring (in the good way), and trustworthy.  
If your cloud spend behaves erratically, CloudLedger helps you understand **why** — and what to fix first.

---

## What This Is (and What It Isn’t)

CloudLedger is **not**:

- a generic SaaS billing dashboard
- a FinOps buzzword factory
- a pile of charts disconnected from engineering reality

CloudLedger **is**:

- an engineering workbench
- a thinking aid for cloud cost systems
- a place where cloud spend becomes something you can reason about

It focuses on:

- causal explanations (what _creates_ spend)
- systems thinking (baselines, growth drivers, feedback loops)
- small tools that answer real questions quickly

This project is built to **compound quietly over time**.

---

## Core Concepts

CloudLedger is built around a few foundational ideas.

### 1. Cloud Spend Is a System

Cloud bills are not static invoices.  
They are the output of:

- architecture decisions
- usage patterns
- automation rules
- human behavior

Forecasting and control only work when those inputs are modeled explicitly.

### 2. Baseline vs Growth Costs

Reliable forecasting requires separating:

- **baseline costs** — keep-the-lights-on infrastructure
- **growth costs** — usage, scale, experiments
- **waste** — idle, misconfigured, or unowned resources

Most teams fail because they mix these together.

### 3. Guardrails Beat Vigilance

Manual cost control does not scale.

CloudLedger emphasizes:

- defaults
- automation
- feedback loops that make the _cheap path_ the easy path

---

## Current Features

### Guides

Long-form, practical engineering guides designed to be read end-to-end or referenced selectively.

**How to Reduce Azure Costs for Small Teams**

A pillar guide covering:

- common Azure cost leak patterns
- how Azure billing works in practice
- ownership, tagging, and guardrails
- what to fix first for maximum ROI

**How to Forecast Cloud Costs (Without Lying to Yourself)**

A forecasting guide focused on:

- baselines vs growth drivers
- scenario modeling
- communicating cost to non-engineers
- connecting forecasts to real controls

---

### Tools

**Cloud Cost Estimator**

A fast, client-side tool for sanity-checking cloud spend:

- category-based monthly inputs
- live total calculation
- 10% and 20% buffer scenarios
- waste-reduction slider
- projected monthly and yearly savings
- insight into the largest cost driver

The estimator is intentionally simple:

- no accounts
- no data storage
- no vendor lock-in

It is designed to support thinking — not replace it.

---

## Technology Stack

CloudLedger is built with modern, boring, well-understood tools:

- Next.js (App Router)
- React
- TypeScript
- Next.js API routes (Node.js)
- Vercel (hosting, preview deployments, CI/CD)
- Cloudflare (DNS and edge delivery)

### Backend / API

CloudLedger uses **Next.js built-in API routes**:

app/api/\*

These run as serverless functions on Vercel and can be used for:

- calculations
- validation
- hiding secrets
- calling third-party APIs
- database access (when needed)

At the moment:

- most logic runs client-side
- no database is used
- no user data is stored

This keeps the system simple and flexible while direction solidifies.

---

## Project Structure

Key directories and files:

```
app/
├─ page.tsx # Home page
├─ layout.tsx # Root layout, metadata, navigation
├─ guides/
│ ├─ page.tsx # Guides index
│ ├─ reduce-azure-costs/
│ │ └─ page.tsx # Pillar guide
│ └─ forecast-cloud-costs/
│ └─ page.tsx # Forecasting guide
├─ tools/
│ ├─ page.tsx # Tools index
│ └─ cloud-cost-estimator/
│ └─ page.tsx # Cloud Cost Estimator
├─ cases/
│ └─ page.tsx # Case studies (placeholder)
├─ resources/
│ └─ page.tsx # Resources (placeholder)
```

---

## Getting Started

Install dependencies and run locally:

npm install
npm run dev

Build for production and run locally:

```bash
npm run build
npm start
```

### Available Scripts

- `dev` — start local dev server
- `build` — production build
- `start` — run production server
- `lint` — run ESLint

## Deployment

CloudLedger is designed for deployment on Vercel.

Typical workflow:

- push to `main`
- Vercel builds and deploys automatically
- live site updates immediately
- preview deployments for non-main branches (if enabled)

## Roadmap (Near-Term)

Planned additions include:

- deeper waste-reduction modeling in the estimator
- currency awareness and conversion clarity
- scenario comparison (baseline vs growth cases)
- first real, anonymized case study
- additional small planning tools
- clearer onboarding paths from guides → tools

The roadmap is intentionally short and flexible.

## Contributing

This project currently prioritizes **clarity over scale**.

If contributing:

- keep changes small and explicit
- prefer readability over abstraction
- avoid adding dependencies unless necessary
- treat cost logic as product logic (not just UI)

Run `npm run lint` before pushing.

## Philosophy

CloudLedger is designed to grow:

- slowly
- deliberately
- visibly

No hype.  
No dashboards for the sake of dashboards.  
No pretending cloud costs are simpler than they are.

Just calm, practical systems for understanding where money goes — and how to make it behave.

Last updated: 2026-01-13
