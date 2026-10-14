"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrowserSupabase } from "../../lib/supabase";

const KINDS = ["all", "general", "event", "urgent"] as const;
async function fetchNews() {
  const sb = getBrowserSupabase();
  if (!sb) return { rows: [{ id: "seed-1", title: "Welcome to the new portal", body: "EC publishes notices here.", kind: "general" }], live: false };
  const { data } = await sb.from("notices").select("*").order("created_at", { ascending: false }).limit(20);
  return { rows: (data as { id: string; title: string; body?: string; kind?: string }[] | null) ?? [], live: true };
}

/** News & notices — kind filter, members-only lock note (Portal VIEWS.news). */
export default function NewsPage() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const { data, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNews });
  const rows = (data?.rows ?? []).filter((n) => kind === "all" || (n.kind ?? "general") === kind);
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / News</div>
        <span className="eyebrow">News &amp; notices</span><h1>From the chapter</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 900 }}>
        <div className="filters">{KINDS.map((k) => (<button key={k} aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>))}</div>
        {isLoading ? <div className="empty">Loading…</div> : rows.length === 0 ? <div className="empty">No notices.</div> :
          <div className="notices">{rows.map((n) => (<div key={n.id} className="notice"><small>{n.kind ?? "general"}</small><br /><strong>{n.title}</strong>{n.body && <p>{n.body}</p>}</div>))}</div>}
        {!data?.live && <div className="note">Preview seed. Members-only notices appear after member sign-in.</div>}
      </div></section>
    </>
  );
}
