const grades: [string, string, string][] = [
  ["AMIE / Engineer", "Technician & diploma holders", "Full technical programme"],
  ["AMIE / MIE", "Graduate engineers", "Vote + hold office"],
  ["FIE", "Senior engineers (experience)", "Fellow grade"],
];

/** Membership — grades, KD 20 fee, benefits (Portal VIEWS.membership). */
export default function MembershipPage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Membership</div>
        <span className="eyebrow">Membership</span>
        <h1>One chapter, every discipline</h1>
        <p>KD 20 a year — one year from date of payment. Apply online, track the decision, download card and e-receipt.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 32 }}>
        <table className="tbl"><thead><tr><th>Grade</th><th>Who</th><th>Gets</th></tr></thead>
          <tbody>{grades.map(([g, w, v]) => (<tr key={g}><td><strong>{g}</strong></td><td>{w}</td><td>{v}</td></tr>))}</tbody></table>
        <div className="ctas"><a className="btn pri" href="/apply">Apply for membership</a><a className="btn ghost" href="/track">Track application</a><a className="btn ghost" href="/renew">Renew · KD 20</a><a className="btn ghost" href="/my">Members&apos; area</a></div>
        <div className="note">Members get: digital QR card · directory · blood/mentor requests · job portal · library · polls · CPD certificates.</div>
      </div></section>
    </>
  );
}
