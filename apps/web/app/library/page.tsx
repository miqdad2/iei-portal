"use client";
import { useMemo, useState } from "react";
import { validateUpload, type AllowedKind } from "../../lib/upload";

const SEED = [
  { id: "l1", title: "Engineers' Day keynote slides", kind: "slides", meta: "2026 · Main hall" },
  { id: "l2", title: "AMIE Section A guide", kind: "paper", meta: "Academic" },
  { id: "l3", title: "Site safety talk recording", kind: "recording", meta: "SHE wing" },
];

/** Library — search + kind filter + validated upload (Portal VIEWS.library). */
export default function LibraryPage() {
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? SEED.filter((l) => `${l.title} ${l.meta}`.toLowerCase().includes(s)) : SEED;
  }, [q]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = await validateUpload(f, "library" as AllowedKind);
    setMsg(r.ok ? `OK: ${f.name} — uploads to private storage after connect.` : `Rejected: ${(r as { reason: string }).reason}`);
  }

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Library</div>
        <span className="eyebrow">Knowledge library</span><h1>Slides, recordings, papers</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 980 }}>
        <input type="search" placeholder="Topic, speaker or event…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the library" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--line)", maxWidth: 420 }} />
        <div className="lib">{rows.map((l) => (<div key={l.id} className="librow"><span className="chip">{l.kind}</span><div><b>{l.title}</b><span className="muted">{l.meta}</span></div></div>))}</div>
        <div className="card"><label>Upload slides/recordings (PDF/image ≤10MB) <input type="file" onChange={onFile} /></label>{msg && <p role="status">{msg}</p>}</div>
      </div></section>
    </>
  );
}
