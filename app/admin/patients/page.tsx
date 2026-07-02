"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Patient {
  id: string; patient_id: string; name: string; phone: string;
  email?: string; gender?: string; dob?: string; created_at: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async (q = "") => {
    setLoading(true);
    const res = await fetch(`/api/patients?q=${encodeURIComponent(q)}`);
    setPatients(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", color: "var(--dark)", marginBottom: 4 }}>Patients</h1>
          <p style={{ color: "var(--gray-600)", fontSize: ".9rem" }}>Register and manage patient records</p>
        </div>
        <Link href="/admin/patients/new" className="btn btn-primary" style={{ fontSize: ".85rem", padding: "10px 20px" }}>
          + Register Patient
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow-sm)", marginBottom: 24 }}>
        <input
          className="form-control"
          placeholder="Search by name, phone or patient ID…"
          value={search}
          onChange={e => { setSearch(e.target.value); load(e.target.value); }}
          style={{ maxWidth: 380 }}
        />
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--gray-50)", borderBottom: "1px solid var(--gray-200)" }}>
              {["Patient ID","Name","Phone","Gender","DOB","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: ".75rem", fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>Loading…</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "var(--gray-400)" }}>No patients found</td></tr>
            ) : patients.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--gray-100)", cursor: "pointer" }}
                onClick={() => window.location.href = `/admin/patients/${p.id}`}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--gray-50)")}
                onMouseLeave={e => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "14px 16px", fontSize: ".85rem", fontWeight: 700, color: "var(--primary)" }}>{p.patient_id}</td>
                <td style={{ padding: "14px 16px", fontSize: ".9rem", fontWeight: 600, color: "var(--primary)", textDecoration: "underline", textDecorationColor: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecorationColor = "var(--primary)")}
                  onMouseLeave={e => (e.currentTarget.style.textDecorationColor = "transparent")}
                >{p.name}</td>
                <td style={{ padding: "14px 16px", fontSize: ".85rem" }}>{p.phone}</td>
                <td style={{ padding: "14px 16px", fontSize: ".85rem", textTransform: "capitalize" }}>{p.gender || "—"}</td>
                <td style={{ padding: "14px 16px", fontSize: ".85rem" }}>{p.dob || "—"}</td>
                <td style={{ padding: "14px 16px" }} onClick={e => e.stopPropagation()}>
                  <Link href={`/admin/invoices/new?patient=${p.id}`} style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--accent-dark)", background: "rgba(182,134,44,.08)", padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(182,134,44,.2)", textDecoration: "none" }}>
                    + Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
