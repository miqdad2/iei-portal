/** Seed fallback — defaults ported from Portal data.js CAL/JOBS when Supabase env is absent. */
export type SeedEvent = { id: string; title: string; day: string; venue: string; cpd?: number };
export type SeedJob = { id: string; title: string; company: string; location: string };

export const seedEvents: SeedEvent[] = [
  { id: "eday58", title: "Engineers' Day 2026", day: "2026-09-15", venue: "Kuwait", cpd: 4 },
  { id: "tech-talk-01", title: "Technical Talk: AI in Maintenance", day: "2026-11-02", venue: "KSE Office", cpd: 2 },
  { id: "amie-winter", title: "AMIE Winter Session", day: "2026-12-01", venue: "Centre, Kuwait", cpd: 0 },
];

export const seedJobs: SeedJob[] = [
  { id: "J-SAMPLE-1", title: "Site Engineer (Mechanical)", company: "Gulf Process Engineering", location: "Ahmadi" },
  { id: "J-SAMPLE-2", title: "Maintenance Supervisor", company: "RECAFCO", location: "Shuwaikh" },
];
