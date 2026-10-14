"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Committee", "/committee"],
  ["Events", "/events"],
  ["Membership", "/membership"],
  ["Jobs", "/jobs"],
  ["Community", "/community"],
];

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(href + "/");
}

/** Professional site header — Portal preview spec: strip + seal brand + nav + CTAs + mobile drawer. */
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="strip">
        <span>IEI Kuwait · Estd. Nov 1995</span>
        <span className="strip-r">Office hours · +965 · Kuwait</span>
      </div>
      <header className="site">
        <a href="/" className="brand" aria-label="IEI Kuwait — home">
          <img src="/img/seal.webp" alt="IEI seal" width={46} height={46} />
          <span className="wm"><b>IEI Kuwait</b><small>KUWAIT CHAPTER</small></span>
        </a>
        <nav className="main" aria-label="Main">
          {nav.map(([l, h]) => (
            <a key={h} href={h} aria-current={isActive(path, h) ? "page" : undefined}>{l}</a>
          ))}
        </nav>
        <span className="hdr-actions">
          <a className="iconbtn" href="/search" aria-label="Search">⌕</a>
          <a className="btn ghost sm" href="/my">Member login</a>
          <a className="btn pri sm" href="/apply">Become a member</a>
          <button className="iconbtn menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>☰</button>
        </span>
      </header>
      {open && (
        <div className="drawer" onClick={() => setOpen(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            {nav.map(([l, h]) => (
              <a key={h} href={h} aria-current={isActive(path, h) ? "page" : undefined} onClick={() => setOpen(false)}>{l}</a>
            ))}
            <a href="/my" onClick={() => setOpen(false)}>Member login</a>
            <a href="/apply" onClick={() => setOpen(false)}>Become a member</a>
          </div>
        </div>
      )}
    </>
  );
}
