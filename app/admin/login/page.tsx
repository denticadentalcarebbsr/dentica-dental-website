"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      router.push("/admin");
    }
  };

  const handleMagic = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/admin/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) { setErrorMsg(error.message); setStatus("error"); }
    else { setStatus("sent"); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: "var(--primary)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#fff", fontSize: "1.4rem", fontWeight: 700 }}>D</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--dark)", marginBottom: 4 }}>Admin Login</h1>
          <p style={{ fontSize: ".85rem", color: "var(--gray-600)" }}>Dentica Admin Panel</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", background: "var(--gray-100)", borderRadius: 8, padding: 4, marginBottom: 24, gap: 4 }}>
          {(["password", "magic"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setStatus("idle"); setErrorMsg(""); }}
              style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: ".82rem", fontWeight: 600, transition: "all .2s",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "var(--primary)" : "var(--gray-600)",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,.1)" : "none",
              }}>
              {m === "password" ? "Password" : "Magic Link"}
            </button>
          ))}
        </div>

        {status === "sent" ? (
          <div className="alert-success" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>📧</div>
            <strong>Check your inbox!</strong><br />
            <span style={{ fontSize: ".9rem" }}>Magic link sent to <strong>{email}</strong></span>
          </div>
        ) : (
          <form onSubmit={mode === "password" ? handlePassword : handleMagic}>
            {status === "error" && (
              <div className="alert-error" style={{ marginBottom: 16, fontSize: ".85rem" }}>{errorMsg}</div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-control" type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="denticadentalcarebbsr@gmail.com" required autoFocus />
            </div>
            {mode === "password" && (
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-full" disabled={status === "loading"}>
              {status === "loading" ? "Please wait…" : mode === "password" ? "Sign In" : "Send Magic Link"}
            </button>
          </form>
        )}

        <p style={{ marginTop: 20, fontSize: ".78rem", color: "var(--gray-500)", textAlign: "center" }}>
          Use your Supabase account credentials (jayantarout79@gmail.com)
        </p>
      </div>
    </div>
  );
}
