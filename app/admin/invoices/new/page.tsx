"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Patient { id: string; patient_id: string; name: string; phone: string; }
interface LineItem { description: string; qty: number; rate: number; amount: number; }

export default function NewInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState<LineItem[]>([{ description: "", qty: 1, rate: 0, amount: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPatients = useCallback(async (q: string) => {
    const res = await fetch(`/api/patients?q=${encodeURIComponent(q)}`);
    setPatients(await res.json());
  }, []);

  useEffect(() => {
    const pid = searchParams.get("patient");
    if (pid) {
      fetch(`/api/patients?q=`).then(r => r.json()).then((all: Patient[]) => {
        const p = all.find(x => x.id === pid);
        if (p) { setSelectedPatient(p); setPatientSearch(p.name); }
      });
    }
    searchPatients("");
  }, [searchParams, searchPatients]);

  const updateItem = (i: number, k: keyof LineItem, v: string | number) => {
    setItems(items => items.map((item, idx) => {
      if (idx !== i) return item;
      const updated = { ...item, [k]: v };
      updated.amount = Number(updated.qty) * Number(updated.rate);
      return updated;
    }));
  };

  const addItem = () => setItems(i => [...i, { description: "", qty: 1, rate: 0, amount: 0 }]);
  const removeItem = (i: number) => setItems(items => items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const total = Math.max(0, subtotal - discount);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) { setError("Please select a patient"); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_id: selectedPatient.id, items, subtotal, discount, tax: 0, total, notes, invoice_number: "" }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to create invoice"); setLoading(false); return; }
    router.push(`/admin/invoices/${data.id}`);
  };

  return (
    <div style={{ maxWidth: 780 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/invoices" style={{ color: "var(--gray-600)", fontSize: ".85rem" }}>← Back to Invoices</Link>
        <h1 style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", color: "var(--dark)", marginTop: 8 }}>New Invoice</h1>
      </div>

      <form onSubmit={submit}>
        {error && <div className="alert-error" style={{ marginBottom: 20 }}>{error}</div>}

        {/* Patient Search */}
        <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 16 }}>Select Patient *</h3>
          <div style={{ position: "relative" }}>
            <input
              className="form-control"
              placeholder="Search by name, phone or patient ID…"
              value={patientSearch}
              onChange={e => { setPatientSearch(e.target.value); setSelectedPatient(null); searchPatients(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              autoComplete="off"
            />
            {showDropdown && patients.length > 0 && !selectedPatient && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid var(--gray-200)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", zIndex: 50, maxHeight: 240, overflowY: "auto", marginTop: 4 }}>
                {patients.map(p => (
                  <button key={p.id} type="button" onClick={() => { setSelectedPatient(p); setPatientSearch(`${p.name} (${p.patient_id})`); setShowDropdown(false); }}
                    style={{ width: "100%", padding: "12px 16px", textAlign: "left", border: "none", background: "none", cursor: "pointer", borderBottom: "1px solid var(--gray-100)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--gray-50)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                  >
                    <div style={{ fontWeight: 600, fontSize: ".9rem" }}>{p.name}</div>
                    <div style={{ fontSize: ".78rem", color: "var(--gray-400)" }}>{p.patient_id} · {p.phone}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedPatient && (
            <div style={{ marginTop: 12, padding: "10px 16px", background: "rgba(27,58,139,.05)", borderRadius: 8, border: "1px solid rgba(27,58,139,.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>{selectedPatient.name}</span>
                <span style={{ marginLeft: 10, fontSize: ".8rem", color: "var(--gray-600)" }}>{selectedPatient.patient_id} · {selectedPatient.phone}</span>
              </div>
              <button type="button" onClick={() => { setSelectedPatient(null); setPatientSearch(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.1rem" }}>×</button>
            </div>
          )}
          {!selectedPatient && (
            <p style={{ marginTop: 10, fontSize: ".8rem", color: "var(--gray-400)" }}>
              Patient not registered? <Link href="/admin/patients/new" style={{ color: "var(--primary)", fontWeight: 600 }}>Register first →</Link>
            </p>
          )}
        </div>

        {/* Line Items */}
        <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 16 }}>Treatment / Services</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr style={{ background: "var(--gray-50)" }}>
                {["Description","Qty","Rate (₹)","Amount (₹)",""].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: ".75rem", fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                  <td style={{ padding: "8px 4px" }}>
                    <input className="form-control" value={item.description} onChange={e => updateItem(i, "description", e.target.value)} placeholder="Treatment / service name" style={{ fontSize: ".85rem" }} />
                  </td>
                  <td style={{ padding: "8px 4px", width: 72 }}>
                    <input className="form-control" type="number" min={1} value={item.qty} onChange={e => updateItem(i, "qty", Number(e.target.value))} style={{ fontSize: ".85rem" }} />
                  </td>
                  <td style={{ padding: "8px 4px", width: 120 }}>
                    <input className="form-control" type="number" min={0} value={item.rate} onChange={e => updateItem(i, "rate", Number(e.target.value))} style={{ fontSize: ".85rem" }} />
                  </td>
                  <td style={{ padding: "8px 12px", fontWeight: 700, fontSize: ".9rem", width: 120 }}>₹{item.amount.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "8px 4px", width: 36 }}>
                    {items.length > 1 && <button type="button" onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.2rem", lineHeight: 1 }}>×</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addItem} style={{ background: "none", border: "1px dashed var(--gray-300)", borderRadius: 8, padding: "8px 20px", cursor: "pointer", color: "var(--gray-600)", fontSize: ".85rem", fontWeight: 600 }}>
            + Add Line Item
          </button>

          {/* Totals */}
          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: 280 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--gray-100)", fontSize: ".9rem" }}>
                <span style={{ color: "var(--gray-600)" }}>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--gray-100)", fontSize: ".9rem" }}>
                <span style={{ color: "var(--gray-600)" }}>Discount (₹)</span>
                <input type="number" min={0} value={discount} onChange={e => setDiscount(Number(e.target.value))} style={{ width: 100, textAlign: "right", border: "1px solid var(--gray-200)", borderRadius: 6, padding: "4px 8px", fontSize: ".9rem" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: "1.05rem", fontWeight: 700, color: "var(--primary)" }}>
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow-sm)", marginBottom: 24 }}>
          <label className="form-label">Notes (optional)</label>
          <textarea className="form-control" value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Payment due date, follow-up instructions, etc." />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creating…" : "Create Invoice"}</button>
          <Link href="/admin/invoices" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
