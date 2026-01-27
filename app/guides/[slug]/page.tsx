import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/lib/content/guides";

const GUIDE_SEQUENCE = ["reduce-azure-costs", "forecast-cloud-costs"] as const;

const GUIDE_MODULES = {
  "reduce-azure-costs": () => import("@/content/guides/reduce-azure-costs.mdx"),
  "forecast-cloud-costs": () =>
    import("@/content/guides/forecast-cloud-costs.mdx"),
} as const;

export function generateStaticParams() {
  const params = GUIDE_SEQUENCE.map((slug) => ({ slug }));

  return params;
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await Promise.resolve(params);

  const guide = getGuideBySlug(slug);

  if (!guide) {
    return notFound();
  }

  const loader = GUIDE_MODULES[slug as keyof typeof GUIDE_MODULES];

  if (!loader) {
    return notFound();
  }

  const GuideContent = (await loader()).default;

  // ✅ sequence-based “next guide”
  const idx = GUIDE_SEQUENCE.indexOf(slug as (typeof GUIDE_SEQUENCE)[number]);

  const nextSlug =
    idx >= 0 && idx < GUIDE_SEQUENCE.length - 1
      ? GUIDE_SEQUENCE[idx + 1]
      : GUIDE_SEQUENCE[0];

  const nextGuide = getGuideBySlug(nextSlug);

  return (
    <main
      style={{
        padding: "4rem",
        maxWidth: "900px",
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "0.75rem" }}>{guide.meta.title}</h1>

      <p style={{ opacity: 0.85, maxWidth: "70ch", marginTop: 0 }}>
        {guide.meta.description}
      </p>

      <div style={{ marginTop: "0.75rem", opacity: 0.75, fontSize: "0.9rem" }}>
        <span>{guide.meta.readingMinutes} min read</span>
        {" · "}
        <span>{guide.meta.publishedAt}</span>
        {guide.meta.tags?.length ? (
          <>
            {" · "}
            <span>{guide.meta.tags.join(", ")}</span>
          </>
        ) : null}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <GuideContent />
      </div>

      <div
        style={{
          marginTop: "3rem",
          borderTop: "1px solid #222",
          paddingTop: "1.5rem",
        }}
      >
        <div
          style={{ opacity: 0.75, fontSize: "0.9rem", marginBottom: "0.75rem" }}
        >
          Next steps
        </div>

        <ul style={{ paddingLeft: "1rem", margin: 0 }}>
          <li>
            <a
              href="/tools/cloud-cost-estimator"
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                color: "inherit",
              }}
            >
              Use the Cloud Cost Estimator
            </a>{" "}
            <span style={{ opacity: 0.8 }}>— model baseline + scenarios.</span>
          </li>

          <li style={{ marginTop: "0.5rem" }}>
            <a
              href={`/guides/${nextSlug}`}
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                color: "inherit",
              }}
            >
              {nextGuide?.meta.title ?? "Next guide"}
            </a>{" "}
            <span style={{ opacity: 0.8 }}>— continue the sequence.</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
