"use client";
import { useState } from "react";
import { civilId } from "@iei/validations";

type Mode = "login" | "activate" | "reset" | "home";
const KPIS: [string, string, string][] = [
  ["0", "Requests you can help with", "Blood / mentor matches"],
  ["0", "Employer requests", "Intros to answer"],
  ["0", "Polls to answer", "One vote each"],
  ["0", "Events attended", "CPD history"],
];

/** Members area — Civil-ID auth + overview KPIs + card (Portal VIEWS.my). */
export default function MyPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = civilId.safeParse(id.trim());
    if (!r.success) { setMsg("Civil ID must be 12 digits"); return; }
    setMsg(mode === "login" ? "Preview only — Supabase Auth next." : mode === "activate" ? "Preview — needs Member ID + mobile too." : "Preview — enter 72-h code from GS/Treasurer.");
  }

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Members</div>
        <span className="eyebrow">Members&apos; area</span><h1>Sign in with your Civil ID</h1>
      </div></div>
      <section className="sec"><div className="wrap split">
        <div style={{ display: "grid", gap: 16 }}>
          <div className="tabs" role="tablist">
            {(["login", "activate", "reset", "home"] as Mode[]).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setMsg(null); }}>
                {m === "login" ? "Sign in" : m === "activate" ? "First time here?" : m === "reset" ? "Reset code" : "Overview"}</button>))}
          </div>
          <form className="card" onSubmit={submit} noValidate>
            <p><label htmlFor="cid">Civil ID (12 digits)</label></p>
            <p><input id="cid" inputMode="numeric" value={id} onChange={(e) => setId(e.target.value)} placeholder="200012345678" /></p>
            <p><button type="submit">{mode === "login" ? "Sign in" : mode === "activate" ? "Activate" : mode === "reset" ? "Set new password" : "Open"}</button></p>
            {msg && <p role="status">{msg}</p>}
          </form>
          <div className="kpis">{KPIS.map(([n, l, s]) => (<div key={l} className="kpi"><b>{n}</b><span>{l}</span><br /><small className="muted">{s}</small></div>))}</div>
        </div>
        <div className="mcard"><div className="top"><small>INSTITUTION OF ENGINEERS (INDIA)<br />KUWAIT CHAPTER</small></div>
          <div className="who"><div className="av">IN</div><div><b>Your digital card</b><span>QR check-in at the door</span></div></div>
          <div className="kv"><div><small>GRADE</small><b className="gold">MIE</b></div><div><small>ID</small><b>IEI-KW-···</b></div><div><small>VALID</small><b>1 yr</b></div></div>
        </div>
      </div></section>
    </>
  );
}
