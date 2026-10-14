import { seedEvents } from "../lib/seed";

/**
 * Homepage — faithful rebuild of Portal preview VIEWS.home:
 * hero + stats + programme + pillars + membership steps + board + sponsor + archive.
 * Data: live /events when Supabase connected, else seed preview.
 */
const pillars = [
  { n: "TECHNICAL", h: "Seminars & conferences", p: "Four quarterly seminars, webinars and podcasts, and an international conference with the Kuwait Society of Engineers. Free to the wider engineering community." },
  { n: "15 SEPTEMBER", h: "Engineers' Day", p: "Held in honour of Bharat Ratna Sir M. Visvesvaraya, with a Chief Guest and H.E. the Ambassador of India." },
  { n: "ACADEMIC", h: "AMIE examinations", p: "Sections A & B conducted in Kuwait for diploma and non-diploma students, under IEI Kolkata and supervised by the Embassy of India." },
  { n: "FAMILIES", h: "Community", p: "Family Day, IEI Utsav, health seminars, walkathons, blood donors and mentors — a chapter that looks after its own." },
  { n: "WINGS", h: "SHE & YEC", p: "The Women's Empowerment Wing and the Young Engineers Club, carrying forward the Ladies Wing and Science Club." },
];

const steps = [
  { h: "Apply", p: "Personal, qualification and family details, photo and signature." },
  { h: "Review", p: "General Secretary checks and recommends to the Chairman." },
  { h: "Pay KD 20", p: "Bank transfer with receipt, or cash at the KSE office." },
  { h: "Welcome", p: "Member ID, e-receipt and your membership card." },
];

const board = [
  { n: "Chairman", r: "Executive Committee" },
  { n: "General Secretary", r: "Executive Committee" },
  { n: "Treasurer", r: "Executive Committee" },
  { n: "Membership", r: "Executive Committee" },
  { n: "Technical", r: "Executive Committee" },
];

export default function Home() {
  const up = seedEvents.slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap hero-in">
          <div>
            <div className="dim">EST. NOV 1995 · KUWAIT · 29.37°N 47.99°E</div>
            <h1>Engineering excellence, <em>bridging India &amp; Kuwait</em> for thirty years.</h1>
            <p className="lede">The Kuwait Chapter of The Institution of Engineers (India) brings together engineers living and practising in Kuwait — for technical seminars, Engineers&apos; Day, AMIE examinations, and a community that looks after its families.</p>
            <div className="ctas">
              <a className="btn pri" href="/apply">Apply for membership →</a>
              <a className="btn on-navy" href="/events">See the 2026–27 programme</a>
              <a className="btn on-navy" href="/sponsor">Partner with us</a>
            </div>
          </div>
          <div className="badge" aria-label="IEI Kuwait Chapter — celebrating 30 years">
            <span className="badge-ring">KNOWLEDGE · COLLABORATION · PROGRESS · INDIA ⇄ KUWAIT ·</span>
            <span className="badge-core">30<span>years</span></span>
          </div>
        </div>
        <div className="hero-stats">
          <div className="wrap">
            <div className="s"><b>1995</b><span>Chapter founded, November</span></div>
            <div className="s"><b>240+</b><span>Engineers in the membership</span></div>
            <div className="s"><b>50+</b><span>Programmes on the 2026–27 calendar</span></div>
            <div className="s"><b>KD 20</b><span>A year — from date of payment</span></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head row">
            <div><span className="eyebrow">Next up</span><h2>On the programme</h2></div>
            <a className="btn ghost" href="/events">Full 2026–27 calendar →</a>
          </div>
          <div className="cards">
            {up.map((e) => (
              <article key={e.id} className="card">
                <strong>{e.title}</strong>
                <p>{e.day} · {e.venue}{e.cpd ? ` · ${e.cpd} CPD` : ""}</p>
                <a href="/events">Details + RSVP</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">What the chapter does</span><h2>Five commitments, every year since 1995</h2></div>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.n} className="pillar"><span className="n">{p.n}</span><h4>{p.h}</h4><p>{p.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Membership</span>
            <h2>Join in four steps, entirely online</h2>
            <p className="lede">The paper form is now a guided application. Your details reach the General Secretary the moment you submit, and you can follow the decision from this site.</p>
            <div className="steps">
              {steps.map((s) => (<div key={s.h} className="step"><h4>{s.h}</h4><p>{s.p}</p></div>))}
            </div>
            <div className="ctas"><a className="btn pri" href="/apply">Start your application</a><a className="btn ghost" href="/renew">Renew a membership</a></div>
          </div>
          <div className="mcard" aria-label="Membership card preview">
            <div className="top"><small>INSTITUTION OF ENGINEERS (INDIA)<br />KUWAIT CHAPTER · 2026–27</small></div>
            <div className="who"><div className="av">EN</div><div><b>Engr. Your Name</b><span>Mechanical Engineering · Member since 2026</span></div></div>
            <div className="kv"><div><small>GRADE</small><b className="gold">MIE</b></div><div><small>MEMBER ID</small><b>IEI-KW-···</b></div><div><small>BLOOD</small><b>O+</b></div></div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="sec-head row">
            <div><span className="eyebrow">Executive Committee 2026–27</span><h2>Together for a stronger chapter</h2></div>
            <a className="btn ghost" href="/committee">Meet the full committee →</a>
          </div>
          <div className="people">{board.map((p) => (<div key={p.n} className="person"><div className="ph"><span className="ini">{p.n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span></div><div><b>{p.n}</b><span>{p.r}</span></div></div>))}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band">
            <span className="eyebrow">Sponsorship &amp; corporate tie-ups</span>
            <h2>Put your company in front of Kuwait&apos;s Indian engineering community.</h2>
            <p>Title partnerships, flagship-event sponsorship, technical seminar hosting, site visits and hiring partnerships — across 50+ programmes this term.</p>
            <div className="ctas"><a className="btn pri" href="/sponsor">Sponsorship options</a><a className="btn on-navy" href="/corporate">Corporate tie-ups</a></div>
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="wrap split">
          <a className="card hubc" href="/jobs"><span className="chip">Job portal</span><h3>Engineering jobs in Kuwait</h3><p>Vacancies checked by the EC. Members apply in one click with their profile and CV.</p></a>
          <a className="card hubc" href="/my"><span className="chip">Members</span><h3>Members&apos; area</h3><p>Directory, blood-donor and mentor requests, CPD certificates and your digital card — sign in with your Civil ID.</p></a>
        </div>
      </section>
    </>
  );
}
