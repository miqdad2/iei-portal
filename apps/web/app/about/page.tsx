const facts: [string, string][] = [
  ["1920", "IEI established; HQ at 8 Gokhale Road, Kolkata"],
  ["1935", "Royal Charter granted by King George V"],
  ["1995", "Kuwait Chapter established, November"],
  ["1996", "Affiliated with the Embassy of India in Kuwait"],
  ["2001", "Chapter website launched, June"],
  ["MoU", "With the Kuwait Society of Engineers"],
];

/** About — sticky tabs + 1995 portrait + prose (Portal VIEWS.about). */
export default function AboutPage() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / About</div>
        <span className="eyebrow">About the chapter</span>
        <h1>Thirty years of Indian engineering in Kuwait</h1>
        <p>Established in November 1995 for members residing and practising the engineering profession in Kuwait.</p>
      </div></div>
      <section className="sec"><div className="wrap split">
        <div className="portrait"><div className="grid-bg" />
          <span className="eyebrow" style={{ color: "var(--brass-hi)", position: "relative" }}>At a glance</span>
          <span className="big" style={{ position: "relative" }}>1995</span>
          <ul className="facts" style={{ position: "relative" }}>
            {facts.map(([b, s]) => (<li key={b + s}><b>{b}</b><span>{s}</span></li>))}
          </ul>
        </div>
        <div className="prose">
          <span className="eyebrow">The Kuwait Chapter</span>
          <h2>A professional home for engineers in Kuwait</h2>
          <p>The Institution of Engineers (India) was established in 1920 and the Royal Charter was granted to it in 1935. Its headquarters is in Kolkata, India.</p>
          <p>The Kuwait Chapter was established in November 1995 for members residing and practising the engineering profession in Kuwait. It has a Memorandum of Understanding with the Kuwait Society of Engineers to promote engineering knowledge, and bilateral agreements with local professional bodies.</p>
          <p>The chapter conducts the AMIE examination under headquarters guidelines, supervised by the Indian Embassy, and has been affiliated with the Embassy of India in Kuwait since 1996.</p>
          <h3>Engineers&apos; Day — 15 September</h3>
          <p>Held every year in honour of Bharat Ratna Sir M. Visvesvaraya, with a Chief Guest and H.E. the Ambassador of India.</p>
        </div>
      </div></section>
    </>
  );
}
