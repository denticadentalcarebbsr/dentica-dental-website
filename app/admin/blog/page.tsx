import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const supabase = createAdminClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, status, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--dark)", marginBottom: 4 }}>Blog Posts</h1>
          <p style={{ color: "var(--gray-600)", fontSize: ".9rem" }}>{posts?.length || 0} posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">+ New Post</Link>
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
        {!posts?.length ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>No blog posts yet. Create your first one!</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".88rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--gray-200)", background: "var(--gray-50)" }}>
                {["Title", "Slug", "Status", "Date", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "var(--gray-600)", fontWeight: 600, fontSize: ".78rem", textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                  <td style={{ padding: "14px 16px", color: "var(--dark)", fontWeight: 600 }}>{post.title}</td>
                  <td style={{ padding: "14px 16px", color: "var(--gray-400)", fontSize: ".8rem", fontFamily: "monospace" }}>{post.slug}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={post.status === "published" ? "badge-published" : "badge-draft"}>{post.status}</span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--gray-400)", fontSize: ".8rem" }}>
                    {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/admin/blog/${post.id}/edit`} className="btn btn-outline" style={{ padding: "5px 12px", fontSize: ".8rem" }}>Edit</Link>
                      {post.status === "published" && (
                        <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-primary" style={{ padding: "5px 12px", fontSize: ".8rem" }}>View</Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
