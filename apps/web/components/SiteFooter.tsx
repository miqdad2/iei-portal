/** Professional title-block footer — Portal preview spec: 3 columns + office + bottom bar. */
export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div>
          <img src="/img/seal.webp" alt="IEI seal" width={56} height={56} />
          <p className="brandline"><b>IEI Kuwait</b><small>KUWAIT CHAPTER · ESTD. 1995</small></p>
          <p className="muted">The Institution of Engineers (India), Kuwait Chapter — seminars, Engineers&apos; Day, AMIE, community.</p>
        </div>
        <div>
          <h5>Members</h5>
          <a href="/apply">Apply for membership</a><a href="/renew">Renew · KD 20</a>
          <a href="/membership">Grades &amp; benefits</a><a href="/my">Members&apos; area</a>
          <a href="/jobs">Job portal</a><a href="/library">Knowledge library</a>
        </div>
        <div>
          <h5>Chapter</h5>
          <a href="/about">About</a><a href="/committee">Committee</a><a href="/events">Events</a>
          <a href="/news">News &amp; notices</a><a href="/archive">Archive</a><a href="/gallery">Gallery</a>
        </div>
        <div>
          <h5>Partners</h5>
          <a href="/sponsor">Sponsorship</a><a href="/corporate">Corporate tie-ups</a>
          <a href="/employers">Employers · résumé bank</a><a href="/contact">Contact the office</a><a href="/desk">EC Desk</a>
        </div>
      </div>
      <div className="wrap foot-base">
        <span>© 2026 IEI Kuwait Chapter · 8 Gokhale Road, Kolkata (HQ)</span>
        <span className="muted">Office hours · +965 · Kuwait</span>
      </div>
    </footer>
  );
}
