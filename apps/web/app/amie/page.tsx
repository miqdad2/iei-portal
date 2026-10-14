/** AMIE — Sections A/B examinations (Portal VIEWS.amie). */
export default function AmiePage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / AMIE</div>
        <span className="eyebrow">Academic</span><h1>AMIE examinations in Kuwait</h1>
        <p>Sections A &amp; B for diploma and non-diploma students, under IEI Kolkata, supervised by the Embassy of India.</p>
      </div></div>
      <section className="sec"><div className="wrap split">
        <div className="card"><h3>Section A</h3><p>Foundation subjects. Winter + summer sessions — dates announced in <a href="/news">notices</a>.</p></div>
        <div className="card"><h3>Section B</h3><p>Discipline papers. Centre details shared with registered candidates by the AMIE coordinator.</p></div>
      </div></section>
    </>
  );
}
