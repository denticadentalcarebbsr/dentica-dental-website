"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  meta_title: string;
  meta_description: string;
  status: "draft" | "published";
}

const empty: BlogPost = {
  title: "", slug: "", excerpt: "", content: "",
  cover_image_url: "", meta_title: "", meta_description: "", status: "draft",
};

export default function BlogEditor({ post }: { post?: BlogPost }) {
  const [form, setForm] = useState<BlogPost>(post || empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const set = (k: keyof BlogPost, v: string) => setForm(f => ({ ...f, [k]: v }));

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

  const save = async (status: "draft" | "published") => {
    if (!form.title || !form.slug || !form.content) {
      setError("Title, slug, and content are required.");
      return;
    }
    setSaving(true);
    setError("");
    const supabase = createClient();
    const payload = {
      ...form,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (form.id) {
      result = await supabase.from("blog_posts").update(payload).eq("id", form.id);
    } else {
      result = await supabase.from("blog_posts").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--dark)" }}>
          {form.id ? "Edit Post" : "New Post"}
        </h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" onClick={() => save("draft")} disabled={saving}>Save Draft</button>
          <button className="btn btn-primary" onClick={() => save("published")} disabled={saving}>
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: 20 }}>{error}</div>}

      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: 32, boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)" }}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-control" value={form.title} onChange={e => { set("title", e.target.value); if (!form.id) set("slug", autoSlug(e.target.value)); }} placeholder="Post title" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Slug *</label>
            <input className="form-control" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="post-url-slug" style={{ fontFamily: "monospace" }} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={form.status} onChange={e => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <textarea className="form-control" value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={2} placeholder="Short summary shown in listings..." />
        </div>

        <div className="form-group">
          <label className="form-label">Content * (Markdown supported)</label>
          <textarea className="form-control" value={form.content} onChange={e => set("content", e.target.value)} rows={16} placeholder="Write your post content here..." style={{ fontFamily: "monospace", fontSize: ".9rem" }} />
        </div>

        <div className="form-group">
          <label className="form-label">Cover Image URL</label>
          <input className="form-control" value={form.cover_image_url} onChange={e => set("cover_image_url", e.target.value)} placeholder="https://..." />
        </div>

        <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: 24, marginTop: 8 }}>
          <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-600)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 16 }}>SEO</div>
          <div className="form-group">
            <label className="form-label">Meta Title</label>
            <input className="form-control" value={form.meta_title} onChange={e => set("meta_title", e.target.value)} placeholder="Defaults to post title" />
          </div>
          <div className="form-group">
            <label className="form-label">Meta Description</label>
            <textarea className="form-control" value={form.meta_description} onChange={e => set("meta_description", e.target.value)} rows={2} placeholder="Shown in search results (160 chars)" />
          </div>
        </div>
      </div>
    </div>
  );
}
