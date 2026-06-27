import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import { tier1Treatments } from "@/lib/treatments-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published");

  const blogEntries: MetadataRoute.Sitemap = (posts || []).map(post => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const treatmentEntries: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/treatments`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...tier1Treatments.map(t => ({
      url: `${siteConfig.url}/treatments/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...treatmentEntries,
    ...blogEntries,
  ];
}
