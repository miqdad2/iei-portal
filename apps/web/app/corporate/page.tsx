/** Corporate tie-ups (Portal VIEWS.corporate). */
export default function CorporatePage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Corporate</div>
        <span className="eyebrow">Partners</span><h1>Corporate tie-ups</h1>
        <p>Site visits, hiring partnerships, seminar hosting — write to the EC.</p>
      </div></div>
      <section className="sec"><div className="wrap split">
        <div className="card"><h3>Hiring partners</h3><p>Post vacancies free in the <a href="/jobs">job portal</a>; approved employers search the résumé bank.</p></div>
        <div className="card"><h3>Enquire</h3><p><a className="btn pri" href="/contact">Contact the office</a></p></div>
      </div></section>
    </>
  );
}
