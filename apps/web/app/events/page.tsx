"use client";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBrowserSupabase } from "../../lib/supabase";
import { seedEvents, type SeedEvent } from "../../lib/seed";

type Ev = SeedEvent & { wing?: string; seats_taken?: number };
const WINGS = ["all", "chapter", "SHE", "YEC"] as const;

async function fetchEvents(): Promise<{ rows: Ev[]; live: boolean }> {
  const sb = getBrowserSupabase();
  if (!sb) return { rows: seedEvents.map((e, i) => ({ ...e, wing: i === 1 ? "SHE" : i === 2 ? "YEC" : "chapter" })), live: false };
  const { data, error } = await sb.from("events").select("*").eq("hidden", false).order("day");
  if (error || !data) return { rows: seedEvents, live: false };
  return { rows: data as Ev[], live: true };
}

/** Events — 2026–27 calendar, wing filter, upcoming-only, RSVP links (Portal VIEWS.events). */
export default function EventsPage() {
  const qc = useQueryClient();
  const [wing, setWing] = useState<(typeof WINGS)[number]>("all");
  const [upcoming, setUpcoming] = useState(true);
  const { data, isLoading } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    const ch = sb.channel("realtime:events")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => { setFlash(true); qc.invalidateQueries({ queryKey: ["events"] }); })
      .subscribe();
    return () => { sb.removeChannel(ch); };
  }, [qc]);

  const rows = useMemo(() => {
    let r = data?.rows ?? [];
    if (wing !== "all") r = r.filter((e) => (e.wing ?? "chapter") === wing);
    if (upcoming) { const t = new Date().toISOString().slice(0, 10); r = r.filter((e) => e.day >= t); }
    return r;
  }, [data, wing, upcoming]);

  if (isLoading) return <section className="sec"><div className="wrap">Loading calendar…</div></section>;

  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Events</div>
        <span className="eyebrow">2026–27 calendar</span><h1>On the programme</h1>
        <p>{data?.live ? "Live from EC Desk." : "Preview seed — EC publishes here."}{flash ? " Updated just now." : ""}</p>
      </div></div>
      <section className="sec"><div className="wrap">
        <div className="filters" role="group" aria-label="Wing filter">
          {WINGS.map((w) => (<button key={w} aria-pressed={wing === w} onClick={() => setWing(w)}>{w === "all" ? "All wings" : w}</button>))}
          <button aria-pressed={upcoming} onClick={() => setUpcoming(!upcoming)}>{upcoming ? "Upcoming only ✓" : "Include past"}</button>
        </div>
        {rows.length === 0 ? <div className="empty">No events match. Try another wing.</div> :
          <div className="cards">{rows.map((e) => (
            <article key={e.id} className="card">
              <span className="chip">{e.wing ?? "chapter"}</span>
              <strong>{e.title}</strong>
              <p>{e.day} · {e.venue}{e.cpd ? ` · ${e.cpd} CPD` : ""}</p>
              <a href={`/events/${e.id}`}>Details + RSVP</a>
            </article>))}
          </div>}
      </div></section>
    </>
  );
}
