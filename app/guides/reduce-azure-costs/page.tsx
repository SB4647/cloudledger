export default function ReduceAzureCosts() {
  return (
    <main style={{ padding: "4rem", maxWidth: "900px", lineHeight: 1.7 }}>
      <h1 style={{ marginBottom: "0.75rem" }}>
        How to Reduce Azure Costs for Small Teams
      </h1>

      <p style={{ fontSize: "1.1rem", marginTop: 0, opacity: 0.9 }}>
        Azure costs don’t blow out because teams are sloppy. They blow out
        because spending is distributed across services, environments, and
        owners — and the feedback loop is weak. This guide is a practical system
        for getting control without slowing delivery.
      </p>

      <div
        style={{
          margin: "2rem 0",
          padding: "1rem 1.25rem",
          border: "1px solid #333",
          borderRadius: 8,
        }}
      >
        <strong>Who this is for:</strong>
        <ul style={{ marginTop: "0.75rem" }}>
          <li>Small dev teams (1–20) running Azure workloads</li>
          <li>Founders / CTOs who need predictability, not surprises</li>
          <li>Anyone inheriting a messy subscription</li>
        </ul>

        <strong>What you’ll walk away with:</strong>
        <ul style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <li>A short list of the biggest cost leaks to hunt first</li>
          <li>A measurement approach that matches how Azure actually bills</li>
          <li>
            Guardrails: budgets, alerts, and policies that don’t annoy engineers
          </li>
        </ul>
      </div>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>Why cloud costs explode</h2>
        <p>
          Most Azure “bill shock” comes from a few repeatable patterns:
          <ul>
            <li>
              <strong>Sprawl:</strong> multiple environments, regions, and
              resource groups with no ownership map
            </li>
            <li>
              <strong>Always-on:</strong> dev/test resources left running 24/7
              because turning things off is manual
            </li>
            <li>
              <strong>Hidden multipliers:</strong> data egress, log ingestion,
              backups, and “small per-GB” charges that stack up
            </li>
            <li>
              <strong>Wrong defaults:</strong> over-provisioned SKUs chosen
              early and never revisited
            </li>
          </ul>
        </p>
        <p>
          The fix is not “be careful.” The fix is: make cost visible, assign
          ownership, then enforce guardrails automatically.
        </p>
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>The five biggest cost leaks in Azure</h2>
        <ol>
          <li>
            <strong>Idle compute:</strong> VMs, AKS node pools, App Service
            plans that are oversized or always-on
          </li>
          <li>
            <strong>Log & telemetry ingestion:</strong> Log Analytics / App
            Insights costs scale fast with chatty apps
          </li>
          <li>
            <strong>Data transfer:</strong> egress + cross-region traffic + CDN
            misconfigurations
          </li>
          <li>
            <strong>Storage & backups:</strong> snapshot sprawl, retained
            backups, premium tiers used by default
          </li>
          <li>
            <strong>Unowned resources:</strong> orphaned disks, public IPs, old
            environments, “temporary” resource groups
          </li>
        </ol>
        <p>
          Small teams should attack these in order because they’re the highest
          ROI and usually the easiest to fix.
        </p>
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>How to measure your real spend</h2>
        <p>A practical measurement loop looks like this:</p>
        <ol>
          <li>
            <strong>Start with the Azure Cost Analysis view</strong> for the
            subscription, grouped by Service and Resource.
          </li>
          <li>
            <strong>Tag ownership</strong> (team, environment, app) and track
            “untagged” as a first-class problem.
          </li>
          <li>
            <strong>Measure weekly deltas</strong> — not just monthly totals —
            so you catch changes quickly.
          </li>
          <li>
            <strong>Separate baseline from experiments</strong> (e.g., new
            features, load tests) so changes have context.
          </li>
        </ol>
        <p>Your first win is usually reducing “unknown spend” to near zero.</p>
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>Enforcing budgets without killing velocity</h2>
        <p>Guardrails that work (and don’t annoy engineers) are:</p>
        <ul>
          <li>
            <strong>Budgets + alerts:</strong> notify early (50/75/90%) instead
            of only screaming at 100%
          </li>
          <li>
            <strong>Policy:</strong> prevent obviously wasteful SKUs, regions,
            or public exposure
          </li>
          <li>
            <strong>Auto-shutdown:</strong> dev/test resources off-hours, with
            an escape hatch for urgent work
          </li>
          <li>
            <strong>Ownership:</strong> every resource group has a responsible
            human/team
          </li>
        </ul>
        <p>The trick is making the default path the cheap path.</p>
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>Forecasting and alerts that actually work</h2>
        <p>Forecasting becomes reliable when you track:</p>
        <ul>
          <li>
            <strong>Baseline costs:</strong> the predictable “keep the lights
            on” portion
          </li>
          <li>
            <strong>Usage drivers:</strong> requests, active users, GB ingested,
            node count, storage growth
          </li>
          <li>
            <strong>Planned changes:</strong> releases, migrations, new
            environments
          </li>
        </ul>
        <p>
          Alerts should fire on <em>change</em>, not just “high spend” — e.g.
          sudden log ingestion spikes or a new service entering the top 5.
        </p>
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <h2>Monthly cost control checklist</h2>
        <ul>
          <li>Review top 10 services by cost (and the delta vs last month)</li>
          <li>Find and fix untagged / unowned resources</li>
          <li>Check idle compute (VMs, node pools, app plans)</li>
          <li>Audit log ingestion volumes and retention</li>
          <li>Review storage tiers, snapshots, and backups</li>
          <li>Confirm budgets/alerts/policies still match reality</li>
        </ul>

        <p style={{ marginTop: "1.5rem", opacity: 0.9 }}>
          Next: we’ll turn this into a real “tool-backed” guide by adding a
          simple calculator and linking it from this page.
        </p>
      </section>
    </main>
  );
}
