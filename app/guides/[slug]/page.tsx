import { notFound } from "next/navigation";
import { getGuideBySlug, getGuideSlugs } from "@/lib/content/guides";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuideBySlug(params.slug);

  console.log(params);

  if (!guide) {
    return notFound();
  }

  const Guide = (await import(`@/content/guides/${params.slug}.mdx`)).default;

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

      <div style={{ marginTop: "2rem" }}>
        <Guide />
      </div>
    </main>
  );
}
