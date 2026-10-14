"use client";
import { useState } from "react";
import { renewalSchema } from "@iei/validations";
import { getBrowserSupabase } from "../../lib/supabase";

/** Renew KD 20 — bank/cash declaration; Treasurer confirms in Desk. */
export default function RenewPage() {
  const [form, setForm] = useState({ memberId: "", mobile: "", method: "bank" });
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = renewalSchema.safeParse(form);
    if (!r.success) { setMsg(r.error.issues[0]?.message ?? "Check fields"); return; }
    const sb = getBrowserSupabase();
    if (!sb) { setMsg("Preview only — Treasurer confirms and issues e-receipt after Supabase connect."); return; }
    const { error } = await sb.from("renewals").insert({ member_id: r.data.memberId, mobile: r.data.mobile, method: r.data.method });
    setMsg(error ? `Save failed: ${error.message}` : "Declared. Show this page after Treasurer confirms to download e-receipt.");
  }

  return (
    <section className="grid">
      <form className="card" onSubmit={submit} aria-label="Renew membership">
        <strong>Renew · KD 20</strong>
        <p><label>Member ID <input value={form.memberId} onChange={(e) => setForm({ ...form, memberId: e.target.value })} placeholder="IEI-KW-256" /></label></p>
        <p><label>Mobile <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} inputMode="numeric" /></label></p>
        <p><label>Method <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}><option value="bank">Bank transfer</option><option value="cash">Cash at office</option></select></label></p>
        <p><button type="submit">Declare payment</button></p>
        {msg && <p role="status">{msg}</p>}
      </form>
    </section>
  );
}
