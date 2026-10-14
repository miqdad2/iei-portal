const tabs: [string, string][] = [
  ["apps", "Applications"], ["renewals", "Renewals"], ["members", "Members"], ["checkin", "Check-in"],
  ["content", "Content"], ["library", "Library"], ["polls", "Polls"],
  ["jobs", "Jobs"], ["employers", "Employers"], ["talent", "Talent"], ["requests", "Requests"],
  ["exports", "Exports"], ["users", "Users"],
];

/** EC Desk — KPIs + grouped queues (Portal desk.js + 4-desk.js). Server role checks required. */
export default function DeskPage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / EC Desk</div>
        <span className="eyebrow">Office bearers</span><h1>EC Desk</h1>
        <p>Sign in required. Roles: gs · chairman · treasurer · editor · careers · admin.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 20 }}>
        <div className="kpis">
          <a className="kpi" href="/desk/apps"><b>—</b><span>Open applications</span></a>
          <a className="kpi" href="/desk/renewals"><b>—</b><span>Payments to confirm</span></a>
          <a className="kpi" href="/desk/requests"><b>—</b><span>Open requests</span></a>
          <a className="kpi" href="/desk/jobs"><b>—</b><span>Jobs to review</span></a>
        </div>
        <div><h2>Membership</h2><div className="cards" style={{ marginTop: 12 }}>
          {tabs.slice(0, 4).map(([t, l]) => (<a key={t} className="card" href={`/desk/${t}`}><strong>{l}</strong></a>))}
        </div></div>
        <div><h2>Website</h2><div className="cards" style={{ marginTop: 12 }}>
          {tabs.slice(4, 7).map(([t, l]) => (<a key={t} className="card" href={`/desk/${t}`}><strong>{l}</strong></a>))}
        </div></div>
        <div><h2>Careers &amp; community</h2><div className="cards" style={{ marginTop: 12 }}>
          {tabs.slice(7, 11).map(([t, l]) => (<a key={t} className="card" href={`/desk/${t}`}><strong>{l}</strong></a>))}
        </div></div>
        <div><h2>Admin</h2><div className="cards" style={{ marginTop: 12 }}>
          {tabs.slice(11).map(([t, l]) => (<a key={t} className="card" href={`/desk/${t}`}><strong>{l}</strong></a>))}
        </div></div>
      </div></section>
    </>
  );
}
