"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Patient {
  id: string; patient_id: string; name: string; phone: string;
  email?: string; dob?: string; gender?: string; address?: string;
  medical_history?: string; created_at: string;
}
interface Invoice {
  id: string; invoice_number: string; total: number; status: string; created_at: string;
}

const statusColor: Record<string, string> = { unpaid: "#F59E0B", paid: "#10B981", cancelled: "#EF4444" };

export default function PatientDetailPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/patients/${id}`).then(r => r.json()),
      fetch(`/api/invoices`).then(r => r.json()),
    ]).then(([p, allInvoices]) => {
      setPatient(p);
      setInvoices((allInvoices as (Invoice & { patient: { id: string } })[]).filter(i => i.patient?.id === id));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>Loading…</div>;
  if (!patient) return <div style={{ padding: 40 }}>Patient not found</div>;

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/patients" style={{ color: "var(--gray-600)", fontSize: ".85rem" }}>← Back to Patients</Link>
      </div>

      {/* Patient header */}
      <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 28, boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "1.2rem", flexShrink: 0 }}>
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontFamily: "'Playfair Display',serif", color: "var(--dark)", marginBottom: 2 }}>{patient.name}</h1>
              <span style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--primary)", background: "rgba(27,58,139,.08)", padding: "2px 10px", borderRadius: 20 }}>{patient.patient_id}</span>
            </div>
          </div>
          <Link href={`/admin/invoices/new?patient=${patient.id}`} className="btn btn-primary" style={{ fontSize: ".82rem", padding: "8px 18px" }}>
            + New Invoice
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Phone", value: patient.phone },
            { label: "Email", value: patient.email || "—" },
            { label: "Date of Birth", value: patient.dob || "—" },
            { label: "Gender", value: patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : "—" },
            { label: "Registered", value: new Date(patient.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: ".9rem", color: "var(--gray-800)" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {patient.address && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--gray-100)" }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>Address</div>
            <div style={{ fontSize: ".9rem", color: "var(--gray-800)" }}>{patient.address}</div>
          </div>
        )}

        {patient.medical_history && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--gray-100)" }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Medical History / Notes</div>
            <div style={{ fontSize: ".88rem", color: "var(--gray-700)", background: "var(--gray-50)", padding: "12px 14px", borderRadius: 8, lineHeight: 1.6 }}>{patient.medical_history}</div>
          </div>
        )}
      </div>

      {/* Invoice history */}
      <div style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)" }}>Invoice History</h2>
          <span style={{ fontSize: ".8rem", color: "var(--gray-400)" }}>{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</span>
        </div>
        {invoices.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "var(--gray-400)", fontSize: ".9rem" }}>
            No invoices yet — <Link href={`/admin/invoices/new?patient=${patient.id}`} style={{ color: "var(--primary)", fontWeight: 600 }}>create one</Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--gray-50)" }}>
                {["Invoice #","Amount","Status","Date",""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: ".72rem", fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: ".85rem", color: "var(--primary)" }}>{inv.invoice_number}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: ".9rem" }}>₹{Number(inv.total).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: ".78rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${statusColor[inv.status]}18`, color: statusColor[inv.status] }}>
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: ".85rem", color: "var(--gray-600)" }}>{new Date(inv.created_at).toLocaleDateString("en-IN")}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Link href={`/admin/invoices/${inv.id}`} style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>View →</Link>
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
