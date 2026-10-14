const hubs: [string, string, string, string][] = [
  ["Directory", "Find engineers by discipline, area, blood group.", "/my", "Members"],
  ["Blood & mentors", "Requests with automatic matching.", "/my", "Requests"],
  ["Jobs", "Vacancies checked by the EC.", "/jobs", "Job portal"],
  ["Résumé bank", "Opt-in CV sharing with approved employers.", "/employers", "Employers"],
  ["Library", "Slides, recordings, papers.", "/library", "Learn"],
  ["CPD", "Attendance history + certificates.", "/my", "Learning"],
  ["News", "Public + members-only notices.", "/news", "Notices"],
  ["Events", "50+ programmes, RSVP + check-in.", "/events", "Calendar"],
];

/** Community hub — 8 cards + member band (Portal VIEWS.community). */
export default function CommunityPage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Community</div>
        <span className="eyebrow">Community hub</span><h1>One chapter, every need</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 16 }}>
        <div className="cards">{hubs.map(([t, d, h, c]) => (<a key={t} className="card hubc" href={h}><span className="chip">{c}</span><h3>{t}</h3><p>{d}</p></a>))}</div>
        <div className="ctas"><a className="btn pri" href="/my">Open my account</a><a className="btn ghost" href="/apply">Become a member</a></div>
      </div></section>
    </>
  );
}
