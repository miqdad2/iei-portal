"use client";
import { useState } from "react";
import { getBrowserSupabase } from "../../lib/supabase";
import { audit } from "@iei/api-client/src/audit";

/** Contact — office info + inbox form (Portal contact view). */
export default function ContactPage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", mobile: "", text: "" });
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) { setMsg("Enter your name"); return; }
    if (!/^\d{8}$/.test(form.mobile.trim())) { setMsg("8-digit mobile"); return; }
    const sb = getBrowserSupabase();
    if (!sb) { setMsg("Preview only — message reaches EC inbox after Supabase connect."); return; }
    await audit(sb, "inbox", "contact", form.mobile, form.name);
    setMsg("Sent to the EC inbox.");
  }
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Contact</div>
        <span className="eyebrow">Contact</span><h1>Talk to the office</h1>
      </div></div>
      <section className="sec"><div className="wrap split">
        <div className="card"><h3>Chapter office</h3><p>Kuwait · Office hours as announced · See notices for phone/email.</p></div>
        <form className="card" onSubmit={submit}>
          <p><input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Name" /></p>
          <p><input placeholder="Mobile (8 digits)" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} aria-label="Mobile" /></p>
          <p><input placeholder="Message" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} aria-label="Message" /></p>
          <p><button type="submit">Send</button></p>{msg && <p role="status">{msg}</p>}
        </form>
      </div></section>
    </>
  );
}
