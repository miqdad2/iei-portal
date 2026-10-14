const board = ["Chairman", "Vice Chairman", "General Secretary", "Treasurer", "Membership Chair"];
const members = ["Technical Chair", "SHE Wing Lead", "YEC Lead", "AMIE Coordinator", "Sponsorship Lead", "Media Lead", "Cultural Lead", "Sports Lead", "Blood Donors Lead", "Mentors Lead", "Webmaster", "Auditor"];
const past: [string, string][] = [["2024–26", "Previous committee"], ["2022–24", "Previous committee"], ["2020–22", "Previous committee"]];

/** Committee — board + members + ex-officio + past (Portal VIEWS.committee). */
export default function CommitteePage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Committee</div>
        <span className="eyebrow">Executive Committee 2026–27</span>
        <h1>Together for a stronger chapter</h1>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 40 }}>
        <div><h2>Office bearers</h2><div className="people" style={{ marginTop: 16 }}>
          {board.map((n) => (<div key={n} className="person"><div className="ph"><span className="ini">{n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span></div><div><b>{n}</b><span>Photos added in EC Desk → content</span></div></div>))}
        </div></div>
        <div><h2>Committee members</h2><div className="people" style={{ marginTop: 16 }}>
          {members.map((n) => (<div key={n} className="person"><div className="ph"><span className="ini">{n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span></div><div><b>{n}</b></div></div>))}
        </div></div>
        <div><h2>Past committees</h2>
          <table className="tbl"><thead><tr><th>Term</th><th>Note</th></tr></thead>
          <tbody>{past.map(([t, n]) => (<tr key={t}><td>{t}</td><td>{n}</td></tr>))}</tbody></table>
        </div>
      </div></section>
    </>
  );
}
