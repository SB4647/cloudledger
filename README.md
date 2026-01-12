# CloudLedger

**CloudLedger** is a modern engineering platform for understanding, forecasting, and reducing cloud infrastructure costs.  
It combines long-form technical thinking with lightweight, purpose-built tools for developers, founders, and small teams running on **AWS** and **Azure**.

The goal is deliberately simple:

> Make cloud costs predictable, transparent, and controllable — without slowing product development or engineering velocity.

CloudLedger is designed to feel calm, boring (in the good way), and trustworthy.  
If your cloud spend behaves erratically, CloudLedger helps you understand _why_ — and what to fix first.

---

## What This Is (and What It Isn’t)

CloudLedger is **not**:

- a generic SaaS billing dashboard
- a FinOps buzzword factory
- a pile of charts disconnected from engineering reality

CloudLedger **is**:

- an engineering workbench
- a thinking aid for cloud cost systems
- a place where cost becomes something you can reason about

It focuses on:

- causal explanations (what _creates_ spend)
- systems thinking (baselines, growth drivers, feedback loops)
- small tools that answer real questions quickly

This project is built to **compound quietly over time**.

---

## Core Concepts

CloudLedger is built around a few foundational ideas:

### 1. Cloud Spend Is a System

Cloud bills are not static invoices — they are the output of:

- architecture decisions
- usage patterns
- automation rules
- human behavior

Forecasting and control only work when you model those inputs explicitly.

### 2. Baseline vs Growth Costs

Reliable forecasting requires separating:

- **baseline costs** (keep-the-lights-on)
- **growth costs** (usage, scale, experiments)
- **waste** (idle, misconfigured, unowned resources)

Most teams fail because they mix these together.

### 3. Guardrails Beat Vigilance

Manual cost control does not scale.
CloudLedger emphasizes:

- defaults
- automation
- feedback loops
  that make the _cheap path_ the easy path.

---

## Current Features

### 📘 Guides

Long-form, practical engineering guides:

- **How to Reduce Azure Costs for Small Teams**  
  A pillar guide covering:

  - common cost leak patterns
  - how Azure bills in practice
  - ownership, tagging, and guardrails
  - what to fix first for maximum ROI

- **How to Forecast Cloud Costs (Without Lying to Yourself)**  
  A forecasting guide focused on:
  - baselines vs growth drivers
  - scenario modeling
  - communicating cost to non-engineers
  - connecting forecasts to real controls

Guides are written to be read end-to-end or referenced selectively.

---

### 🧮 Tools

#### Cloud Cost Estimator

A small, fast, client-side tool for sanity-checking cloud spend:

- category-based monthly inputs
- live total calculation
- 10% and 20% buffer scenarios
- waste-reduction slider
- projected monthly and yearly savings

It is intentionally simple:

- no accounts
- no data storage
- no vendor lock-in

The estimator is meant to support thinking — not replace it.

---

## Technology Stack

CloudLedger is built with modern, boring, well-understood tools:

- **Next.js (App Router)** — routing, rendering, and structure
- **React** — UI composition
- **TypeScript** — correctness and long-term maintainability
- **Vercel** — hosting, preview deployments, CI/CD
- **Cloudflare** — DNS and edge delivery

### UI Philosophy

- minimal styling
- fast page loads
- low cognitive overhead

Most styling is currently done inline for speed and clarity while the platform evolves.  
This may be refactored later once patterns stabilize.

---

## Project Structure

Key directories and files:

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

---

## Getting Started

### Local Development

Install dependencies:

```bash
npm install

npm run dev

npm run build
npm start

Available Scripts

dev — start local dev server

build — production build

start — run production server

lint — run ESLint

Deployment

CloudLedger is designed for deployment on Vercel.

Typical workflow:

Push to main

Vercel builds and deploys automatically

Live site updates immediately

Preview deployments are created for non-main branches if enabled.

Roadmap (Near-Term)

Planned additions include:

deeper waste-reduction modeling in the estimator

scenario comparison (baseline vs growth cases)

first real, anonymized case study

additional small planning tools

clearer onboarding paths from guides → tools

The roadmap is intentionally short and flexible.

Contributing

This project currently prioritizes clarity over scale.

If contributing:

keep changes small and explicit

prefer readability over abstraction

avoid adding dependencies unless necessary

treat cost logic as product logic (not just UI)

Run npm run lint before pushing.

Philosophy

CloudLedger is designed to grow:

slowly

deliberately

visibly

No hype.
No dashboards for the sake of dashboards.
No pretending cloud costs are simpler than they are.

Just calm, practical systems for understanding where money goes — and how to make it behave.

Last updated: 2026-01-12
```
