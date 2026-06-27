"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  preferred_window: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

const statuses = ["new", "contacted", "closed"] as const;

export default function InquiriesClient({
  inquiries: initial,
  currentStatus,
}: {
  inquiries: Inquiry[];
  currentStatus?: string;
}) {
  const [inquiries, setInquiries] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase.from("inquiries").update({ status }).eq("id", id);
    setInquiries(prev =>
      prev.map(i => (i.id === id ? { ...i, status: status as Inquiry["status"] } : i))
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--dark)", marginBottom: 4 }}>Inquiries</h1>
          <p style={{ color: "var(--gray-600)", fontSize: ".9rem" }}>{inquiries.length} {currentStatus || "total"} inquiries</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className={`btn ${!currentStatus ? "btn-primary" : "btn-outline"}`} style={{ padding: "8px 16px", fontSize: ".85rem" }} onClick={() => router.push("/admin/inquiries")}>All</button>
          {statuses.map(s => (
            <button key={s} className={`btn ${currentStatus === s ? "btn-primary" : "btn-outline"}`} style={{ padding: "8px 16px", fontSize: ".85rem", textTransform: "capitalize" }} onClick={() => router.push(`/admin/inquiries?status=${s}`)}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {inquiries.length === 0 && (
          <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 32, textAlign: "center", color: "var(--gray-400)", border: "1px solid var(--gray-200)" }}>No inquiries found.</div>
        )}
        {inquiries.map(inq => (
          <div key={inq.id} style={{ background: "#fff", borderRadius: "var(--radius)", padding: 20, boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "var(--dark)", fontSize: ".95rem" }}>{inq.name}</span>
                  <span className={`badge-${inq.status}`}>{inq.status}</span>
                </div>
                <div style={{ fontSize: ".83rem", color: "var(--gray-600)" }}>
                  📞 {inq.phone}
                  {inq.email && <span> · 📧 {inq.email}</span>}
                  {inq.service && <span> · {inq.service}</span>}
                  <span> · {new Date(inq.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: ".8rem" }} onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}>
                  {expanded === inq.id ? "Hide" : "Details"}
                </button>
                {statuses.filter(s => s !== inq.status).map(s => (
                  <button key={s} className="btn btn-primary" style={{ padding: "6px 12px", fontSize: ".8rem", textTransform: "capitalize", background: s === "contacted" ? "#D97706" : s === "closed" ? "var(--accent)" : "var(--primary)" }} onClick={() => updateStatus(inq.id, s)}>
                    → {s}
                  </button>
                ))}
              </div>
            </div>
            {expanded === inq.id && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--gray-200)", fontSize: ".88rem", color: "var(--gray-600)", display: "flex", flexDirection: "column", gap: 6 }}>
                {inq.preferred_window && <div><strong>Preferred time:</strong> {inq.preferred_window}</div>}
                {inq.message && <div><strong>Message:</strong> {inq.message}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
