/** Upload validation — mirrors Store.saveDataUrl: allowlist + size + magic bytes. */

export type AllowedKind = "photo" | "signature" | "proof" | "gallery" | "cv" | "library";

const LIMITS: Record<AllowedKind, { bytes: number; mimes: string[] }> = {
  photo: { bytes: 600 * 1024, mimes: ["image/jpeg", "image/png", "image/webp"] },
  signature: { bytes: 400 * 1024, mimes: ["image/jpeg", "image/png", "image/webp"] },
  proof: { bytes: 2 * 1024 * 1024, mimes: ["image/jpeg", "image/png", "application/pdf"] },
  gallery: { bytes: 3 * 1024 * 1024, mimes: ["image/jpeg", "image/png", "image/webp"] },
  cv: { bytes: 2.5 * 1024 * 1024, mimes: ["application/pdf"] },
  library: { bytes: 10 * 1024 * 1024, mimes: ["application/pdf", "image/jpeg", "image/png"] },
};

async function magicOk(file: File): Promise<boolean> {
  const buf = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isPdf = buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;
  const isWebp = buf[0] === 0x52 && buf[1] === 0x49 && buf[8] === 0x57 && buf[9] === 0x45;
  return isJpg || isPng || isPdf || isWebp;
}

export async function validateUpload(
  file: File,
  kind: AllowedKind
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const lim = LIMITS[kind];
  if (!lim.mimes.includes(file.type)) return { ok: false, reason: `Type ${file.type || "unknown"} not allowed` };
  if (file.size > lim.bytes) return { ok: false, reason: `Over ${Math.round(lim.bytes / 1024)}KB limit` };
  if (!(await magicOk(file))) return { ok: false, reason: "File signature mismatch" };
  return { ok: true };
}
