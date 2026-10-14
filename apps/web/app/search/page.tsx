"use client";
import { useState } from "react";
import { seedEvents, seedJobs } from "../../lib/seed";

/** Site search — pages + events + jobs + archive (Portal search view). */
export default function SearchPage() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const ev = s ? seedEvents.filter((e) => e.title.toLowerCase().includes(s)) : [];
  const jb = s ? seedJobs.filter((j) => `${j.title} ${j.company}`.toLowerCase().includes(s)) : [];
  const pages = s ? ["about", "events", "jobs", "membership", "news", "library"].filter((p) => p.includes(s)) : [];
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Search</div>
        <span className="eyebrow">Search</span><h1>Find anything</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 860 }}>
        <input type="search" placeholder="Topic, event, job…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--line)", maxWidth: 420 }} />
        {!s ? <div className="empty">Type to search pages, events, jobs.</div> :
          (ev.length + jb.length + pages.length === 0 ? <div className="empty">No hits for “{q}”.</div> :
            <div className="notices">
              {pages.map((p) => (<a key={p} className="notice" href={`/${p}`}><strong>Page: {p}</strong></a>))}
              {ev.map((e) => (<a key={e.id} className="notice" href="/events"><strong>Event: {e.title}</strong><br /><small>{e.day}</small></a>))}
              {jb.map((j) => (<a key={j.id} className="notice" href="/jobs"><strong>Job: {j.title}</strong><br /><small>{j.company}</small></a>))}
            </div>)}
      </div></section>
    </>
  );
}
