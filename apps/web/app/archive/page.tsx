"use client";
import { useMemo, useState } from "react";

const RECORDS = [
  { t: "58th Engineers' Day celebration", d: "2026-09-15", c: "Flagship" },
  { t: "Technical seminar: AI in maintenance", d: "2026-06-02", c: "Technical" },
  { t: "Family Day + walkathon", d: "2026-02-14", c: "Community" },
  { t: "YEC site visit: substation", d: "2025-11-20", c: "YEC" },
];

/** Archive — category + text search over previous-site records (Portal VIEWS.archive). */
export default function ArchivePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return RECORDS.filter((r) => (cat === "all" || r.c === cat) && (!s || `${r.t} ${r.d}`.toLowerCase().includes(s)));
  }, [q, cat]);
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Archive</div>
        <span className="eyebrow">From the archive</span><h1>71 records since 2010</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 900 }}>
        <div className="filters">{["all", "Flagship", "Technical", "Community", "YEC"].map((c) => (<button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>))}</div>
        <input type="search" placeholder="Search the archive…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search archive" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--line)", maxWidth: 420 }} />
        {rows.length === 0 ? <div className="empty">Nothing found.</div> :
          <table className="tbl"><thead><tr><th>Event</th><th>Date</th><th>Category</th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.t}><td>{r.t}</td><td>{r.d}</td><td>{r.c}</td></tr>))}</tbody></table>}
      </div></section>
    </>
  );
}
