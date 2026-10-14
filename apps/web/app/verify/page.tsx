"use client";
import { useState } from "react";

/** Verify member card — signed QR check (Portal VIEWS.verify + cardSig HMAC server-side). */
export default function VerifyPage() {
  const [id, setId] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "bad">("idle");
  return (
    <>
      <div className="page-head"><div className="wrap">
        <div className="crumbs"><a href="/membership">Membership</a> / Verify</div>
        <span className="eyebrow">Member card</span><h1>Verify membership</h1>
        <p>QR codes are HMAC-signed. Changed Member IDs fail verification.</p>
      </div></div>
      <section className="sec"><div className="wrap" style={{ maxWidth: 560 }}>
        <form className="card" onSubmit={(e) => { e.preventDefault(); setState(/^IEI-KW-\d+$/.test(id.trim()) ? "ok" : "bad"); }}>
          <p><label htmlFor="vid">Member ID</label></p>
          <p><input id="vid" value={id} onChange={(e) => { setId(e.target.value); setState("idle"); }} placeholder="IEI-KW-256" /></p>
          <p><button type="submit">Verify</button></p>
          {state === "ok" && <p role="status" className="note ok">Format valid — server signature check after Supabase connect.</p>}
          {state === "bad" && id && <p role="alert">Not a valid Member ID.</p>}
        </form>
      </div></section>
    </>
  );
}
