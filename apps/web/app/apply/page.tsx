"use client";
import { useEffect, useState } from "react";
import { applicationSchema } from "@iei/validations";
import { getBrowserSupabase } from "../../lib/supabase";
import { validateUpload } from "../../lib/upload";

const STEPS = ["Personal", "Qualifications", "IEI status", "Family & community", "Photo & declaration", "Review"] as const;
const DRAFT_KEY = "iei-apply-draft";

function randomRef() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
  return `APP-2026-${s}`;
}

/** Membership application — full 6-step Portal flow; draft + validated photo + Supabase. */
export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", civilId: "", mobile: "", email: "", discipline: "", grade: "", ieiNo: "", family: "" });
  const [agreed, setAgreed] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(DRAFT_KEY); if (raw) setForm((f) => ({ ...f, ...JSON.parse(raw) })); } catch { /* ignore */ }
  }, []);
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(form)); } catch { /* ignore */ } }, [form]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = await validateUpload(f, "photo");
    setMsg(r.ok ? `Photo OK: ${f.name} — attaches on submit after storage connect.` : `Photo rejected: ${(r as { reason: string }).reason}`);
  }

  async function submit() {
    const r = applicationSchema.safeParse({ name: form.name, civilId: form.civilId, mobile: form.mobile, email: form.email, discipline: form.discipline || "General", grade: form.grade || "MIE" });
    if (!r.success) { setMsg(r.error.issues[0]?.message ?? "Check fields"); setStep(0); return; }
    if (!agreed) { setMsg("Tick the declaration to submit."); setStep(4); return; }
    const sb = getBrowserSupabase();
    if (!sb) { setMsg(`Preview only — reference would be ${randomRef()}. Connect Supabase to save.`); return; }
    const ref = randomRef();
    const { error } = await sb.from("applications").insert({ ref, ...r.data, stage: "new" });
    if (error) { setMsg(`Save failed: ${error.message}`); return; }
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    setMsg(`Received. Reference ${ref} — track at /track with your mobile.`);
  }

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/membership">Membership</a> / Apply</div>
        <span className="eyebrow">Membership application</span><h1>Apply in six steps</h1>
        <p>Draft autosaves on this device. Documents upload on submit.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ maxWidth: 720, display: "grid", gap: 16 }}>
        <div className="tabs" role="tablist" aria-label="Steps">
          {STEPS.map((s, i) => (<button key={s} role="tab" aria-selected={step === i} onClick={() => setStep(i)}>{i + 1}. {s}</button>))}
        </div>
        <div className="card">
          {step === 0 && (<>
            <p><label>Name <input value={form.name} onChange={set("name")} /></label></p>
            <p><label>Civil ID (12 digits) <input value={form.civilId} onChange={set("civilId")} inputMode="numeric" /></label></p>
            <p><label>Mobile (8 digits) <input value={form.mobile} onChange={set("mobile")} inputMode="numeric" /></label></p>
            <p><label>Email <input value={form.email} onChange={set("email")} /></label></p>
          </>)}
          {step === 1 && (<>
            <p><label>Discipline <input value={form.discipline} onChange={set("discipline")} placeholder="Mechanical Engineering" /></label></p>
            <p><label>Grade <input value={form.grade} onChange={set("grade")} placeholder="MIE" /></label></p>
          </>)}
          {step === 2 && <p><label>Existing IEI number (if any) <input value={form.ieiNo} onChange={set("ieiNo")} /></label></p>}
          {step === 3 && <p><label>Family &amp; community notes <input value={form.family} onChange={set("family")} /></label></p>}
          {step === 4 && (<>
            <p><label>Photo (JPG/PNG ≤600KB) <input type="file" accept="image/*" onChange={onPhoto} /></label></p>
            <p><label><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ width: "auto" }} /> I declare details are true.</label></p>
          </>)}
          {step === 5 && <p>Review: <strong>{form.name || "—"}</strong> · {form.discipline || "—"} · {form.mobile || "—"}</p>}
          <p>
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}{" "}
            {step < STEPS.length - 1
              ? <button type="button" onClick={() => setStep(step + 1)}>Next</button>
              : <button type="button" onClick={submit}>Submit application</button>}
          </p>
          {msg && <p role="status">{msg}</p>}
        </div>
      </div></section>
    </>
  );
}
