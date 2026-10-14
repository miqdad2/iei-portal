const tiers = [
  { t: "Title Partner", d: "Flagship billing across the term — Engineers' Day + 4 seminars." },
  { t: "Flagship Event", d: "Engineers' Day / Family Day / IEI Utsav naming + stage time." },
  { t: "Technical Seminar", d: "Host a quarterly seminar + site visit + hiring slot." },
  { t: "Supporter", d: "Logo wall + programme mentions across 50+ events." },
];

/** Sponsorship — tiers + slots (Portal VIEWS.sponsor). Amounts indicative. */
export default function SponsorPage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Sponsorship</div>
        <span className="eyebrow">Sponsorship</span><h1>Put your company in front of Kuwait&apos;s engineers</h1>
        <p>Amounts are indicative — confirm with the EC before publishing.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ display: "grid", gap: 24 }}>
        <div className="tiers">{tiers.map((t) => (<div key={t.t} className="tier"><h3>{t.t}</h3><p>{t.d}</p></div>))}</div>
        <div className="ctas"><a className="btn pri" href="/contact">Enquire — sponsor</a><a className="btn ghost" href="/corporate">Corporate tie-ups</a></div>
      </div></section>
    </>
  );
}
