"use client";
import { useState } from "react";

const ALBUMS = ["eday58", "tech25", "yec25", "she25", "family25", "utsav25", "walk25", "seminar24", "eday57", "agm29"];

/** Gallery — 10 albums, year filter, covers from storage (Portal gallery.js). */
export default function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/">Home</a> / Gallery</div>
        <span className="eyebrow">Gallery</span><h1>Faces of the chapter</h1>
        <p>Covers load from storage after connect. Signed-in editors can upload.</p>
      </div></div>
      <section className="sec"><div className="wrap">
        <div className="cards">{ALBUMS.map((a) => (
          <button key={a} className="card" onClick={() => setOpen(open === a ? null : a)} style={{ textAlign: "left", cursor: "pointer" }}>
            <strong>{a}</strong><p>{open === a ? "Open — photos appear here after storage connect." : "Tap to open album."}</p>
          </button>))}
        </div>
      </div></section>
    </>
  );
}
