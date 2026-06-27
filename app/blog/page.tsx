import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Dental Health Blog",
  description: "Expert dental health tips, treatment guides, and oral care advice from the specialists at Dentica Bhubaneswar.",
};

export const revalidate = 0;

export default async function BlogListing() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at, created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "var(--gray-50)", minHeight: "100vh" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-tag">From Our Experts</div>
            <h1 className="section-title">Dental Health Blog</h1>
            <p className="section-subtitle text-center">Tips, guides, and insights from our specialists to help you maintain a healthy smile.</p>
          </div>

          {!posts?.length ? (
            <div style={{ textAlign: "center", color: "var(--gray-400)", padding: "60px 0" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>📝</div>
              <p>No posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="blog-card">
                    <div className="blog-card-img">
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", background: "linear-gradient(135deg,var(--primary),var(--primary-light))" }} />
                      )}
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-meta">
                        {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </div>
                      <div className="blog-card-title">{post.title}</div>
                      {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
