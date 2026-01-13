import { CSSProperties } from "react";

export default function ForecastCloudCosts() {
  const paragraphStyle: CSSProperties = {
    marginTop: "1.1rem",
    opacity: 0.9,
  };

  const sectionStyle: CSSProperties = { marginTop: "3rem" };

  const h2Style: CSSProperties = {
    marginTop: 0,
    paddingLeft: "0.75rem",
    borderLeft: "3px solid #222",
    letterSpacing: "0.3px",
  };

  const dividerStyle: CSSProperties = {
    height: "1px",
    background: "#222",
    margin: "0.75rem 0 1.25rem 0",
  };

  const listWrapStyle: CSSProperties = {
    paddingLeft: "1rem",
    marginTop: "0.75rem",
  };

  const calloutStyle: CSSProperties = {
    background: "#0e0e0e",
    borderLeft: "3px solid #444",
    padding: "0.75rem 1rem",
    margin: "1.5rem 0",
    fontStyle: "italic",
    borderRadius: 8,
  };

  const leadBoxStyle: CSSProperties = {
    background: "#0b0b0b",
    padding: "1.75rem 2rem",
    borderRadius: 12,
    margin: "1.5rem 0 2.5rem 0",
    border: "1px solid #222",
  };

  const strongLinkStyle: CSSProperties = {
    fontWeight: 600,
    textDecoration: "underline",
  };

  return (
    <main
      style={{
        padding: "4rem",
        maxWidth: "900px",
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      <h1>How to Forecast Cloud Costs (Without Lying to Yourself)</h1>

      <div style={leadBoxStyle}>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginTop: 0 }}>
          Most cloud forecasts fail because they treat costs like a fixed bill
          instead of a living system. This guide shows how small teams can build
          forecasts that stay accurate as their infrastructure evolves.
        </p>

        <p style={{ marginTop: "1.25rem" }}>
          If you&apos;re starting from a messy subscription, read{" "}
          <a href="/guides/reduce-azure-costs" style={strongLinkStyle}>
            How to Reduce Azure Costs for Small Teams
          </a>{" "}
          first. It shows where to reclaim the biggest savings before you
          forecast.
        </p>

        <div style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "1.25rem" }}>
          This guide is structured as a progression — skim the headings, then
          read deeply where it matters.
        </div>
      </div>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why most cloud forecasts fail</h2>
        <div style={dividerStyle} />

        <p style={paragraphStyle}>
          Cloud forecasts usually fail for one simple reason: they treat cloud
          spend as a fixed monthly bill instead of a system driven by usage,
          behavior, and constant change.
        </p>

        <p style={paragraphStyle}>
          Traditional budgeting assumes stable inputs. Cloud infrastructure has
          the opposite properties:
        </p>

        <div style={listWrapStyle}>
          <ul>
            <li>workloads scale automatically</li>
            <li>engineers provision resources continuously</li>
            <li>pricing changes over time</li>
            <li>usage patterns evolve as the product grows</li>
          </ul>
        </div>

        <div style={calloutStyle}>
          Forecasting works when you model behavior, not invoices.
        </div>

        <p style={paragraphStyle}>
          When teams try to forecast cloud costs using static spreadsheets, they
          are effectively pretending this complexity does not exist.
        </p>

        <p style={paragraphStyle}>
          Reliable forecasts begin when you stop asking “What will our bill be?”
          and start asking “What behaviors and systems create our bill?”
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Understanding your baseline costs</h2>
        <div style={dividerStyle} />

        <p style={paragraphStyle}>
          Your baseline cost is the minimum amount you pay each month simply to
          keep the system alive.
        </p>

        <p style={paragraphStyle}>It includes:</p>

        <div style={listWrapStyle}>
          <ul>
            <li>production compute</li>
            <li>core databases and storage</li>
            <li>essential networking and security services</li>
            <li>monitoring, logging, and backups</li>
          </ul>
        </div>

        <div style={calloutStyle}>
          A stable baseline is boring. If it isn’t boring, it isn’t baseline.
        </div>

        <p style={paragraphStyle}>
          The key mistake teams make is mixing baseline costs with experimental
          or growth-driven costs. When you separate them, forecasting becomes
          radically more stable.
        </p>

        <p style={paragraphStyle}>
          A healthy baseline is predictable and slow-changing. If yours swings
          wildly month to month, you don’t have a forecast problem — you have an
          architecture problem.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Growth drivers that actually move the bill</h2>
        <div style={dividerStyle} />

        <p>
          Most cloud forecasts fail because teams model growth using vague ideas
          like “more users” or “higher traffic.” Cloud bills do not respond to
          abstract growth — they respond to very specific technical drivers.
        </p>

        <p>
          A useful forecast starts by identifying which parts of your system
          scale automatically, which scale manually, and which do not scale at
          all.
        </p>

        <p>
          In practice, almost all cloud spend growth comes from a short list of
          drivers:
        </p>

        <div style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
          <ul>
            <li>request volume (API calls, background jobs, queue depth)</li>
            <li>data growth (rows, objects, backups, retention)</li>
            <li>compute concurrency (autoscaling ceilings, burst capacity)</li>
            <li>cross-service chatter (logs, metrics, egress)</li>
          </ul>
        </div>

        <p>
          Importantly, these drivers are often decoupled from business metrics.
          A 2× increase in users does not necessarily mean a 2× increase in cost
          — unless your architecture allows it to.
        </p>

        <p>
          The goal of forecasting is not to predict usage perfectly. It is to
          identify which drivers have the power to move the bill, and which are
          noise.
        </p>

        <p>
          If you cannot name the top three technical mechanisms that cause your
          cloud bill to grow, you do not yet have a forecast — only a guess.
        </p>

        <p style={paragraphStyle}>
          Most cloud costs are “driven” by a small set of variables. If you
          can’t name your drivers, you don’t have a forecast — you have a guess.
        </p>

        <div style={listWrapStyle}>
          <ul>
            <li>
              <strong>Traffic / requests:</strong> more requests usually means
              more compute, more data transfer, more cache pressure.
            </li>
            <li>
              <strong>Data volume:</strong> storage growth, backups, replicas,
              and retention accumulate quietly.
            </li>
            <li>
              <strong>Observability:</strong> logs, metrics, and traces scale
              with “chatty” apps and long retention.
            </li>
            <li>
              <strong>Team behavior:</strong> environments, experiments, and
              “temporary” resources that become permanent.
            </li>
          </ul>
        </div>

        <div style={calloutStyle}>
          Forecast accuracy comes from tracking 3–5 drivers, not 300 line items.
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>
          Scenario modeling: best case, expected, worst case
        </h2>
        <div style={dividerStyle} />

        <p>
          Once you understand your baseline and growth drivers, forecasting
          becomes a modeling exercise rather than a budgeting one.
        </p>

        <p>Instead of asking for a single number, build three scenarios:</p>

        <div style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
          <ul>
            <li>
              <strong>Best case:</strong> growth occurs, but efficiency
              improvements and guardrails absorb most of the impact.
            </li>
            <li>
              <strong>Expected case:</strong> growth follows current patterns
              with minor optimizations applied.
            </li>
            <li>
              <strong>Worst case:</strong> growth accelerates and hidden
              coupling causes costs to scale faster than expected.
            </li>
          </ul>
        </div>

        <p>
          The mistake most teams make is treating the worst case as “unlikely.”
          In cloud systems, worst cases are not rare — they are usually just
          unobserved until traffic arrives.
        </p>

        <p>
          A good forecast treats the worst case as a design constraint. If the
          worst case is financially unacceptable, the solution is not a better
          spreadsheet — it is a change in architecture, limits, or defaults.
        </p>

        <p>
          This is why forecasts should always connect to real controls:
          autoscaling caps, budget alerts, retention limits, and service-level
          ownership.
        </p>

        <p>
          Forecasting without enforcement is accounting. Forecasting with
          controls is engineering.
        </p>

        <p style={paragraphStyle}>
          A single number forecast is fragile. A scenario forecast survives
          reality.
        </p>

        <div style={listWrapStyle}>
          <ul>
            <li>
              <strong>Best case:</strong> optimizations land, traffic grows
              slower, usage stays efficient.
            </li>
            <li>
              <strong>Expected:</strong> normal growth, normal waste, planned
              changes happen on schedule.
            </li>
            <li>
              <strong>Worst case:</strong> spikes, incidents, new environments,
              high ingestion, delayed cleanup.
            </li>
          </ul>
        </div>

        <div style={calloutStyle}>
          The goal isn’t perfect prediction — it’s preventing surprise.
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to communicate forecasts to non-engineers</h2>
        <div style={dividerStyle} />

        <p style={paragraphStyle}>
          Non-engineers don’t want service-by-service detail. They want:
          predictability, risk, and what levers exist.
        </p>

        <div style={listWrapStyle}>
          <ul>
            <li>
              <strong>Baseline:</strong> “We spend ~$X/month to operate.”
            </li>
            <li>
              <strong>Drivers:</strong> “Costs change when traffic, data, or
              logging changes.”
            </li>
            <li>
              <strong>Scenarios:</strong> “We expect $Y, worst case is $Z.”
            </li>
            <li>
              <strong>Levers:</strong> “We can reduce spend by doing A/B/C.”
            </li>
          </ul>
        </div>

        <div style={calloutStyle}>
          If you can’t explain the forecast in 30 seconds, it’s not usable.
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Connecting forecasts to real controls</h2>
        <div style={dividerStyle} />

        <p style={paragraphStyle}>
          Forecasts become real when they connect to actual controls: budgets,
          alerts, policies, and engineering habits.
        </p>

        <p style={paragraphStyle}>
          Use the{" "}
          <a href="/tools/cloud-cost-estimator" style={strongLinkStyle}>
            Cloud Cost Estimator
          </a>{" "}
          to model your current baseline and test scenarios before committing to
          changes.
        </p>
      </section>

      <div style={{ marginTop: "3rem", opacity: 0.85 }}>
        Next:{" "}
        <a href="/guides/reduce-azure-costs" style={strongLinkStyle}>
          Reduce Azure Costs for Small Teams
        </a>
      </div>
    </main>
  );
}
