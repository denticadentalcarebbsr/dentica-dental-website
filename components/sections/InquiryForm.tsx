"use client";

import { useState } from "react";
import { type InquiryInput } from "@/lib/validation";
import { tier1Treatments } from "@/lib/treatments-data";

const services = [
  ...tier1Treatments.map(t => t.name),
  "Other / Not Sure",
];

const windows = [
  "Morning (9AM – 1PM)",
  "Afternoon (2PM – 5PM)",
  "Evening (5PM – 7PM)",
  "Any time",
];

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferred_window: "",
    message: "",
    consent: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: string, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!form.name || form.name.length < 2) { setErrors({ name: "Name is required" }); return; }
    if (!form.phone || form.phone.length < 10) { setErrors({ phone: "Valid phone number required" }); return; }
    if (!form.consent) { setErrors({ consent: "Please consent to be contacted" }); return; }

    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", service: "", preferred_window: "", message: "", consent: false, honeypot: "" });
      } else {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
        else setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="booking-section">
        <div className="container">
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", color: "#fff" }}>
            <div style={{ width: 80, height: 80, background: "rgba(255,255,255,.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="section-title" style={{ color: "#fff" }}>Inquiry Received!</h2>
            <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 24 }}>Thank you! We'll get back to you within a few hours to confirm your appointment.</p>
            <button className="btn btn-white" onClick={() => setStatus("idle")}>Submit Another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-section">
      <div className="container">
        <div className="booking-grid">
          <div>
            <div className="booking-header">
              <div className="section-tag">Easy Scheduling</div>
              <h2 className="section-title">Book Your Visit in Minutes</h2>
              <p className="section-subtitle">Hassle-free appointment request — fill in your details and we'll confirm your slot within a few hours.</p>
            </div>
            <div className="booking-features">
              {[
                { title: "Confirmed Quickly", desc: "We respond within 2–4 hours on clinic days.", icon: <path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
                { title: "Flexible Timings", desc: "Morning and evening slots available, Mon–Sat.", icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/> },
                { title: "Choose Your Specialist", desc: "Book directly with Dr. Sambarta Das or Dr. Anand Garabadu.", icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
              ].map(f => (
                <div key={f.title} className="booking-feat">
                  <div className="booking-feat-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">{f.icon}</svg>
                  </div>
                  <div className="booking-feat-text">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-form-card">
            <div className="quick-booking-title">Request an Appointment</div>
            {status === "error" && (
              <div className="alert-error" style={{ marginBottom: 18 }}>Something went wrong. Please try again or call us directly.</div>
            )}
            <form onSubmit={submit}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={form.honeypot}
                onChange={e => set("honeypot", e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-control" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" required />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-control" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 97772 31262" required />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Service</label>
                  <select className="form-control" value={form.service} onChange={e => set("service", e.target.value)}>
                    <option value="">Select service</option>
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <select className="form-control" value={form.preferred_window} onChange={e => set("preferred_window", e.target.value)}>
                    <option value="">Any time</option>
                    {windows.map(w => <option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" value={form.message} onChange={e => set("message", e.target.value)} rows={3} placeholder="Describe your concern or any questions..." style={{ resize: "vertical" }} />
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <input type="checkbox" id="consent" checked={form.consent} onChange={e => set("consent", e.target.checked)} style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--primary)" }} />
                <label htmlFor="consent" style={{ fontSize: ".82rem", color: "var(--gray-600)", lineHeight: 1.5, cursor: "pointer" }}>
                  I consent to Dentica contacting me regarding my inquiry. *
                </label>
              </div>
              {errors.consent && <div className="form-error" style={{ marginTop: -12, marginBottom: 12 }}>{errors.consent}</div>}

              <button type="submit" className="btn btn-primary btn-full" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Request Appointment"}
                {status !== "loading" && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
