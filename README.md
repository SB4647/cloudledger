# CloudLedger

CloudLedger is a modern engineering platform for understanding and reducing cloud infrastructure costs.  
It combines practical technical guides with lightweight, purpose-built tools for developers, founders, and small teams running on AWS and Azure.

The goal is simple:  
make cloud costs predictable, transparent, and controllable — without slowing product development.

---

## What This Is

CloudLedger is not a blog.  
It is an engineering workbench:

- long-form technical guides
- interactive cost tools
- case studies and field notes
- systems that turn cloud spend into something you can reason about

It is built to compound quietly over time.

---

## Technology

- Next.js (App Router)
- React
- TypeScript
- Vercel (hosting & CI/CD)
- Cloudflare (DNS & edge delivery)

UI is intentionally minimal and fast.  
Most styling is done inline for speed and clarity while the platform evolves.

---

## Getting Started

Install dependencies and run the dev server:

    npm install
    npm run dev

Build for production:

    npm run build
    npm start

Available scripts: dev, build, start, lint

---

## Project Structure

Key files and directories:

- app/page.tsx — Home page
- app/layout.tsx — Root layout and global styles
- app/guides/page.tsx — Guides index
- app/guides/reduce-azure-costs/page.tsx — First pillar guide
- app/tools/page.tsx — Tools index
- app/tools/cloud-cost-estimator/page.tsx — Cloud Cost Estimator tool
- app/cases/page.tsx — Case studies index (placeholder)
- app/resources/page.tsx — Resources index (placeholder)

---

## Current Features

- Pillar guide: How to Reduce Azure Costs for Small Teams
- Tool: Cloud Cost Estimator
  - category-based inputs
  - live totals
  - 10% and 20% buffer scenarios
- Fully connected internal navigation between guides and tools

---

## Near-Term Roadmap

- Add waste-reduction scenarios to estimator
- Add cloud cost forecasting guide
- Add first real case study
- Add additional small planning tools

---

## Philosophy

CloudLedger is designed to grow slowly, deliberately, and visibly.  
No hype. No noise. No dashboards for the sake of dashboards.

Just calm, practical systems for understanding where money goes — and how to make it behave.

---

Last updated: 2026-01-12
