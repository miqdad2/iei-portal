import { getBrowserSupabase } from "../../../lib/supabase";
import { seedEvents, seedJobs } from "../../../lib/seed";

const TITLES: Record<string, string> = {
  apps: "Applications queue (new → gs → approved → active)",
  renewals: "Renewals to confirm",
  members: "Member register",
  checkin: "Event check-in",
  content: "Events + notices + committee",
  library: "Knowledge library",
  polls: "Polls",
  jobs: "Vacancies pending/live",
  employers: "Employer approvals",
  talent: "Résumé bank (audited)",
  requests: "Blood / mentor requests",
  exports: "CSV exports (11)",
  users: "EC users (admin only)",
};

/** CMS queue per tab — Supabase live with seed fallback; role enforcement server-side. */
export default async function DeskTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  const title = TITLES[tab] ?? "Queue";
  const sb = getBrowserSupabase();

  let count: string = sb ? "live query" : "preview seed";
  try {
    if (sb && tab === "jobs") {
      const { count: c } = await sb.from("jobs").select("*", { count: "exact", head: true }).eq("status", "pending");
      count = `${c ?? 0} pending`;
    } else if (sb && tab === "apps") {
      const { count: c } = await sb.from("applications").select("*", { count: "exact", head: true }).eq("stage", "new");
      count = `${c ?? 0} new`;
    } else if (!sb && tab === "content") {
      count = `${seedEvents.length} events (seed)`;
    } else if (!sb && tab === "jobs") {
      count = `${seedJobs.length} jobs (seed)`;
    }
  } catch { count = "unavailable"; }

  return (
    <section className="grid">
      <div className="card">
        <strong>EC Desk · {tab}</strong>
        <p>{title} — {count}. Roles enforced server-side (gs/chairman/treasurer/editor/careers/admin).</p>
        {tab === "checkin" && <p>Camera scan posts member verify + attendance insert.</p>}
        {tab === "exports" && <p>CSVs: members/applications/renewals/attendance/jobs/employers/talent/requests/inbox/registers/rsvps.</p>}
      </div>
    </section>
  );
}
