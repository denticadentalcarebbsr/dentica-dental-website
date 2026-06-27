import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_title, meta_description, excerpt, cover_image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div style={{ paddingTop: 100, paddingBottom: 80, minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {post.cover_image_url && (
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: 360, marginBottom: 40 }}>
              <img src={post.cover_image_url} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <div className="section-tag" style={{ marginBottom: 12 }}>
            {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", { dateStyle: "long" })}
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>{post.title}</h1>
          {post.excerpt && (
            <p style={{ fontSize: "1.1rem", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--gray-200)" }}>
              {post.excerpt}
            </p>
          )}
          <div
            style={{ fontSize: ".98rem", color: "var(--gray-800)", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
