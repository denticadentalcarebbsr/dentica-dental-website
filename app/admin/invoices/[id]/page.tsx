"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

interface Invoice {
  id: string; invoice_number: string; items: { description: string; qty: number; rate: number; amount: number }[];
  subtotal: number; discount: number; total: number; notes?: string; status: string; created_at: string;
  patient: { name: string; patient_id: string; phone: string; email?: string; address?: string };
}

const statusColor: Record<string, string> = { unpaid: "#F59E0B", paid: "#10B981", cancelled: "#EF4444" };

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [inv, setInv] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/invoices/${id}`).then(r => r.json()).then(d => { setInv(d); setLoading(false); });
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    const res = await fetch(`/api/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const data = await res.json();
    setInv(i => i ? { ...i, status: data.status } : i);
    setUpdating(false);
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>Loading…</div>;
  if (!inv) return <div style={{ padding: 40 }}>Invoice not found</div>;

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <Link href="/admin/invoices" style={{ color: "var(--gray-600)", fontSize: ".85rem" }}>← Invoices</Link>
        <div style={{ display: "flex", gap: 10 }}>
          {inv.status === "unpaid" && (
            <button onClick={() => updateStatus("paid")} disabled={updating} className="btn btn-primary" style={{ fontSize: ".82rem", padding: "8px 18px", background: "#10B981" }}>
              Mark as Paid
            </button>
          )}
          <button onClick={() => window.print()} className="btn btn-outline" style={{ fontSize: ".82rem", padding: "8px 18px" }}>
            🖨 Print / PDF
          </button>
        </div>
      </div>

      {/* Printable Invoice */}
      <div id="invoice-print" style={{ background: "#fff", borderRadius: "var(--radius)", padding: "40px 48px", boxShadow: "var(--shadow-sm)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--dark)" }}>Dentica</div>
            <div style={{ fontSize: ".8rem", color: "var(--gray-600)", marginTop: 4, lineHeight: 1.6 }}>
              {siteConfig.address.line1}<br />
              {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.pincode}<br />
              {siteConfig.phoneDisplay} · {siteConfig.email}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>{inv.invoice_number}</div>
            <div style={{ fontSize: ".8rem", color: "var(--gray-600)", marginTop: 4 }}>
              {new Date(inv.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div style={{ marginTop: 8, display: "inline-block", fontSize: ".78rem", fontWeight: 700, padding: "3px 12px", borderRadius: 20, background: `${statusColor[inv.status]}18`, color: statusColor[inv.status] }}>
              {inv.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--gray-200)", marginBottom: 28 }} />

        {/* Patient */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Bill To</div>
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>{inv.patient.name}</div>
          <div style={{ fontSize: ".85rem", color: "var(--gray-600)", lineHeight: 1.6 }}>
            {inv.patient.patient_id} · {inv.patient.phone}
            {inv.patient.email && <><br />{inv.patient.email}</>}
            {inv.patient.address && <><br />{inv.patient.address}</>}
          </div>
        </div>

        {/* Line items */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
          <thead>
            <tr style={{ background: "var(--gray-50)" }}>
              {["Description","Qty","Rate","Amount"].map((h, i) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: i > 0 ? "right" : "left", fontSize: ".75rem", fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inv.items.map((item, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                <td style={{ padding: "12px 14px", fontSize: ".9rem" }}>{item.description}</td>
                <td style={{ padding: "12px 14px", textAlign: "right", fontSize: ".9rem" }}>{item.qty}</td>
                <td style={{ padding: "12px 14px", textAlign: "right", fontSize: ".9rem" }}>₹{Number(item.rate).toLocaleString("en-IN")}</td>
                <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, fontSize: ".9rem" }}>₹{Number(item.amount).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: ".9rem", borderBottom: "1px solid var(--gray-100)" }}>
              <span style={{ color: "var(--gray-600)" }}>Subtotal</span><span>₹{Number(inv.subtotal).toLocaleString("en-IN")}</span>
            </div>
            {inv.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: ".9rem", borderBottom: "1px solid var(--gray-100)", color: "#10B981" }}>
                <span>Discount</span><span>− ₹{Number(inv.discount).toLocaleString("en-IN")}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>
              <span>Total</span><span>₹{Number(inv.total).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {inv.notes && (
          <div style={{ marginTop: 24, padding: "14px 18px", background: "var(--gray-50)", borderRadius: 8, fontSize: ".85rem", color: "var(--gray-600)" }}>
            <strong>Notes:</strong> {inv.notes}
          </div>
        )}

        <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--gray-200)", textAlign: "center", fontSize: ".78rem", color: "var(--gray-400)" }}>
          Thank you for choosing Dentica – An Advanced Oral Care Centre
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print, #invoice-print * { visibility: visible; }
          #invoice-print { position: fixed; top: 0; left: 0; width: 100%; padding: 32px 48px; box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
