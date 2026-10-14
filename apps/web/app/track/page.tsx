"use client";
import { useState } from "react";
import { getBrowserSupabase } from "../../lib/supabase";

/** Track application — ref + mobile knowledge factor (mirrors GET /api/applications/{ref}?mobile=). */
export default function TrackPage() {
  const [ref, setRef] = useState("");
  const [mobile, setMobile] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const sb = getBrowserSupabase();
    if (!sb) { setMsg("Preview only — connect Supabase to look up. Timeline: new → gs → approved → active."); return; }
    const { data, error } = await sb.from("applications").select("ref,stage,member_id").eq("ref", ref.trim()).eq("mobile", mobile.trim()).maybeSingle();
    if (error) { setMsg(`Lookup failed: ${error.message}`); return; }
    if (!data) { setMsg("No match for that reference + mobile."); return; }
    setMsg(`Stage: ${(data as { stage: string }).stage}${(data as { member_id?: string }).member_id ? ` · Member ${(data as { member_id: string }).member_id}` : ""}`);
  }

  return (
    <section className="grid">
      <form className="card" onSubmit={lookup} aria-label="Track application">
        <strong>Track application</strong>
        <p><label>Reference <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="APP-2026-XXXXXX" /></label></p>
        <p><label>Mobile <input value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="numeric" /></label></p>
        <p><button type="submit">Check status</button></p>
        {msg && <p role="status">{msg}</p>}
      </form>
    </section>
  );
}
