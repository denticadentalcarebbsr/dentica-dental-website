"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Invoice {
  id: string; invoice_number: string; total: number; status: string; created_at: string;
  patient: { name: string; patient_id: string; phone: string };
}

const statusColor: Record<string, string> = {
  unpaid: "#F59E0B", paid: "#10B981", cancelled: "#EF4444",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/invoices").then(r => r.json()).then(d => { setInvoices(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", color: "var(--dark)", marginBottom: 4 }}>Invoices</h1>
          <p style={{ color: "var(--gray-600)", fontSize: ".9rem" }}>Create invoices by selecting a registered patient</p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn-primary" style={{ fontSize: ".85rem", padding: "10px 20px" }}>
          + New Invoice
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--gray-200)" }}>
              {["Invoice #","Patient","Phone","Amount","Status","Date","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: ".75rem", fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>Loading…</td></tr>
            ) : invoices.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>No invoices yet — <Link href="/admin/invoices/new" style={{ color: "var(--primary)" }}>create one</Link></td></tr>
            ) : invoices.map(inv => (
              <tr key={inv.id} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                <td style={{ padding: "14px 16px", fontSize: ".85rem", fontWeight: 700, color: "var(--primary)" }}>{inv.invoice_number}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: ".9rem", fontWeight: 600 }}>{inv.patient?.name}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--gray-400)" }}>{inv.patient?.patient_id}</div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: ".85rem" }}>{inv.patient?.phone}</td>
                <td style={{ padding: "14px 16px", fontSize: ".9rem", fontWeight: 700 }}>₹{inv.total.toLocaleString("en-IN")}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: ".78rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${statusColor[inv.status]}20`, color: statusColor[inv.status] }}>
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: ".85rem", color: "var(--gray-600)" }}>{new Date(inv.created_at).toLocaleDateString("en-IN")}</td>
                <td style={{ padding: "14px 16px" }}>
                  <Link href={`/admin/invoices/${inv.id}`} style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
