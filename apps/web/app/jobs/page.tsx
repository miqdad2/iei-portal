"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrowserSupabase } from "../../lib/supabase";
import { seedJobs } from "../../lib/seed";

type Job = { id: string; title: string; company: string; location?: string };

async function fetchJobs(): Promise<{ rows: Job[]; live: boolean }> {
  const sb = getBrowserSupabase();
  if (!sb) return { rows: seedJobs, live: false };
  const { data, error } = await sb.from("jobs").select("*").eq("status", "live").order("created_at", { ascending: false });
  if (error || !data) return { rows: seedJobs, live: false };
  return { rows: data as Job[], live: true };
}

/** Jobs — search + live list, one-click apply for paid members (Portal VIEWS.jobs). */
export default function JobsPage() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const rows = useMemo(() => {
    const r = data?.rows ?? [];
    const s = q.trim().toLowerCase();
    return s ? r.filter((j) => `${j.title} ${j.company}`.toLowerCase().includes(s)) : r;
  }, [data, q]);

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Jobs</div>
        <span className="eyebrow">Job portal</span><h1>Engineering jobs in Kuwait</h1>
        <p>{data?.live ? "Live vacancies, checked by the EC." : "Preview seed."} Members apply in one click with profile + CV.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16 }}>
        <input type="search" placeholder="Search title or company…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search jobs" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--line)", maxWidth: 420 }} />
        {isLoading ? <div className="empty">Loading…</div> : rows.length === 0 ? <div className="empty">No vacancies match.</div> :
          <div className="cards">{rows.map((j) => (<article key={j.id} className="card"><strong>{j.title}</strong><p>{j.company}{j.location ? ` · ${j.location}` : ""}</p><a href={`/jobs/${j.id}`}>View + apply</a></article>))}</div>}
        <div className="card"><strong>Hiring?</strong><p><a href="/employers">Register your company</a> — post free, EC approves.</p></div>
      </div></section>
    </>
  );
}
