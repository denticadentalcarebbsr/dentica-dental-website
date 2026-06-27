import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ count: totalInquiries }, { count: newInquiries }, { count: totalPosts }, { count: publishedPosts }] =
    await Promise.all([
      supabase.from("inquiries").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    ]);

  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select("id, name, phone, service, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total Inquiries", value: totalInquiries ?? 0, color: "var(--primary)" },
    { label: "New (Unread)", value: newInquiries ?? 0, color: "#D97706" },
    { label: "Blog Posts", value: totalPosts ?? 0, color: "var(--accent)" },
    { label: "Published Posts", value: publishedPosts ?? 0, color: "var(--accent-light)" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--dark)", marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "var(--gray-600)", marginBottom: 32, fontSize: ".9rem" }}>Welcome back to the Dentica admin panel.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 40 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "var(--radius)", padding: "24px 20px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 700, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
            <div style={{ fontSize: ".82rem", color: "var(--gray-600)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--dark)", marginBottom: 20 }}>Recent Inquiries</h2>
        {recentInquiries && recentInquiries.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".88rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--gray-200)" }}>
                {["Name", "Phone", "Service", "Status", "Date"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "var(--gray-600)", fontWeight: 600, fontSize: ".78rem", textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map(inq => (
                <tr key={inq.id} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                  <td style={{ padding: "12px", color: "var(--dark)", fontWeight: 600 }}>{inq.name}</td>
                  <td style={{ padding: "12px", color: "var(--gray-600)" }}>{inq.phone}</td>
                  <td style={{ padding: "12px", color: "var(--gray-600)" }}>{inq.service || "–"}</td>
                  <td style={{ padding: "12px" }}>
                    <span className={`badge-${inq.status}`}>{inq.status}</span>
                  </td>
                  <td style={{ padding: "12px", color: "var(--gray-400)", fontSize: ".8rem" }}>
                    {new Date(inq.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "var(--gray-400)", fontSize: ".9rem" }}>No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}
