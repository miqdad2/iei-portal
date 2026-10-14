"use client";
import { useState } from "react";
import { getBrowserSupabase } from "../../lib/supabase";

type Mode = "login" | "register" | "talent";

/** Employers — register / login / résumé bank tabs (Portal employers view). */
export default function EmployersPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [msg, setMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ company: "", contact: "", email: "", password: "" });

  async function register(e: React.FormEvent) {
    e.preventDefault();
    const sb = getBrowserSupabase();
    if (!sb) { setMsg("Preview only — EC approval (1 year) after Supabase connect."); return; }
    const { error } = await sb.from("employers").insert({ company: form.company, contact: form.contact, email: form.email });
    setMsg(error ? `Failed: ${error.message}` : "Registered — EC approval pending.");
  }

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/jobs">Jobs</a> / Employers</div>
        <span className="eyebrow">Employers · résumé bank</span><h1>Hire engineers already in Kuwait</h1>
        <p>Register free — search CVs once the EC approves your account.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 640 }}>
        <div className="tabs" role="tablist">
          {(["login", "register", "talent"] as Mode[]).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setMsg(null); }}>
              {m === "login" ? "Sign in" : m === "register" ? "Register company" : "Résumé bank"}</button>))}
        </div>
        {mode === "register" && (
          <form className="card" onSubmit={register}>
            <p><input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></p>
            <p><input placeholder="Contact person" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></p>
            <p><input placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></p>
            <p><button type="submit">Register</button></p>{msg && <p role="status">{msg}</p>}
          </form>)}
        {mode === "login" && <div className="card"><strong>Employer sign in</strong><p className="muted">Email + password. Approval lasts one year.</p></div>}
        {mode === "talent" && <div className="card"><strong>Résumé bank</strong><p className="muted">Approved employers only. Every search + CV view is audit-logged; members see view counts.</p></div>}
      </div></section>
    </>
  );
}
