"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", dob: "", gender: "", address: "", medical_history: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/patients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to register"); setLoading(false); return; }
    router.push(`/admin/patients`);
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/patients" style={{ color: "var(--gray-600)", fontSize: ".85rem" }}>← Back to Patients</Link>
        <h1 style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", color: "var(--dark)", marginTop: 8 }}>Register New Patient</h1>
      </div>

      <form onSubmit={submit} style={{ background: "#fff", borderRadius: "var(--radius)", padding: 32, boxShadow: "var(--shadow-sm)" }}>
        {error && <div className="alert-error" style={{ marginBottom: 20 }}>{error}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-control" value={form.name} onChange={e => set("name", e.target.value)} required placeholder="Patient full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-control" value={form.phone} onChange={e => set("phone", e.target.value)} required placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="optional" />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input className="form-control" type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="form-label">Gender</label>
          <select className="form-control" value={form.gender} onChange={e => set("gender", e.target.value)}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Address</label>
          <input className="form-control" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Patient address" />
        </div>

        <div className="form-group" style={{ marginBottom: 28 }}>
          <label className="form-label">Medical History / Notes</label>
          <textarea className="form-control" value={form.medical_history} onChange={e => set("medical_history", e.target.value)} rows={3} placeholder="Allergies, existing conditions, medications…" />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Registering…" : "Register Patient"}</button>
          <Link href="/admin/patients" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
